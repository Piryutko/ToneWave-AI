using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Добавляем CORS для SvelteKit (локально и на Netlify)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
                  "http://localhost:5173", 
                  "http://localhost:4173", 
                  "https://tonewave-ai.netlify.app"
              )
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();

app.UseCors();

app.MapPost("/api/transform", async (
    [FromBody] TransformRequest request, 
    HttpContext context,
    ILogger<Program> logger,
    IConfiguration config) =>
{
    // Настраиваем заголовки для Server-Sent Events (SSE)
    context.Response.Headers.Append("Content-Type", "text/event-stream");
    context.Response.Headers.Append("Cache-Control", "no-cache");
    context.Response.Headers.Append("Connection", "keep-alive");

    logger.LogInformation("Received transform request. Mode: {Mode}, Text Length: {Length}", request.Mode, request.Text.Length);

    var systemPrompt = request.Mode.ToUpper() switch
    {
        "PROFESSIONAL" => "Ты — эксперт по бизнес-коммуникациям. Твоя задача: превратить любое, даже самое агрессивное сообщение в безупречно вежливое и конструктивное, подходящее для переписки с руководством или клиентами. Сохрани суть претензии, но удали все оскорбления и эмоции.",
        "KIND" => "Ты — максимально эмпатичный помощник. Преврати сообщение в добрую и мягкую просьбу. Используй слова поддержки, делай акцент на сотрудничестве и общем благе. Текст должен звучать дружелюбно и тепло.",
        "TECHNICAL" => "Ты — системный аналитик. Удали из текста все эмоции, субъективные оценки и воду. Оставь только сухие факты, технические требования или описание проблемы. Текст должен быть коротким, четким и структурированным.",
        "LACONIC" => "Ты — мастер краткости. Твоя задача — сжать исходное сообщение до одной короткой, но емкой фразы (максимум 5-7 слов), сохранив главный посыл. Никаких лишних приветствий и вежливостей.",
        _ => "Ты — лингвистический переводчик."
    };

    var payload = new
    {
        model = "llama3.2",
        prompt = $"[SYSTEM]: {systemPrompt}\n\n[USER]: Текст для трансформации: \"{request.Text}\"\n\n[IMPORTANT]: Выдай только финальный вариант текста без комментариев, вступлений и объяснений. Если в тексте есть мат, нейтрализуй его, сохранив смысл жалобы.\n\n[RESULT]:",
        stream = true, // ВАЖНО: включаем стриминг от Ollama
        options = new { temperature = 0.5, num_predict = 150 }
    };

    using var httpClient = new HttpClient();
    var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
    
    var ollamaUrl = config["OllamaUrl"] ?? "http://localhost:11434/api/generate";
    using var requestMessage = new HttpRequestMessage(HttpMethod.Post, ollamaUrl);
    requestMessage.Content = content;

    try
    {
        // Отправляем запрос и читаем ответ потоково
        using var response = await httpClient.SendAsync(requestMessage, HttpCompletionOption.ResponseHeadersRead, context.RequestAborted);
        response.EnsureSuccessStatusCode();

        logger.LogInformation("Successfully connected to Ollama. Streaming response...");

        using var stream = await response.Content.ReadAsStreamAsync(context.RequestAborted);
        using var reader = new StreamReader(stream);

        while (!reader.EndOfStream && !context.RequestAborted.IsCancellationRequested)
        {
            var line = await reader.ReadLineAsync(context.RequestAborted);
            if (string.IsNullOrWhiteSpace(line)) continue;

            // Пересылаем каждый чанк от Ollama клиенту через SSE
            await context.Response.WriteAsync($"data: {line}\n\n", context.RequestAborted);
            await context.Response.Body.FlushAsync(context.RequestAborted);
        }
        
        logger.LogInformation("Successfully completed stream for request.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Failed to stream transformation response.");
        var errorPayload = JsonSerializer.Serialize(new { error = ex.Message });
        await context.Response.WriteAsync($"data: {errorPayload}\n\n", context.RequestAborted);
        await context.Response.Body.FlushAsync(context.RequestAborted);
    }
});

app.Run();

public class TransformRequest
{
    public string Text { get; set; } = string.Empty;
    public string Mode { get; set; } = "PROFESSIONAL";
}
