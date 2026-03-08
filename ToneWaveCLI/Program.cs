using Spectre.Console;
using System.Text;
using System.Text.Json;

// 1. Красивый заголовок
AnsiConsole.Write(new FigletText("ToneWave AI").Centered().Color(Color.Blue));
AnsiConsole.Write(new Rule("[yellow]Ваш личный дипломат в кармане[/]").RuleStyle("grey"));

while (true)
{
    // Главное меню
    var action = AnsiConsole.Prompt(
        new SelectionPrompt<string>()
            .Title("\n[bold cyan]ГЛАВНОЕ МЕНЮ:[/]")
            .PageSize(10)
            .AddChoices(new[] { "💬 Начать работу", "ℹ️ О программе", "❌ Выход" }));

    if (action == "❌ Выход")
        break;

    if (action == "ℹ️ О программе")
    {
        var infoPanel = new Panel(
            "ToneWave AI — это ваш личный ИИ-переводчик с эмоционального на конструктивный.\n\n" +
            "Программа использует локальные модели [bold yellow]Ollama[/] для преобразования\n" +
            "резких, жестких или нецензурных высказываний в вежливый текстовый формат,\n" +
            "полностью сохраняя изначальный смысл вашей претензии.\n\n" +
            "[bold cyan]Доступные режимы:[/]\n" +
            " - [bold]PROFESSIONAL[/]: Деловой стиль и конструктив\n" +
            " - [bold]KIND[/]: Максимальная эмпатия и поддержка\n" +
            " - [bold]TECHNICAL[/]: Строгая и сухая аналитика\n" +
            " - [bold]LACONIC[/]: Сжатие до одной мощной фразы")
            .Header("[bold blue]🎙 О программе ToneWave AI[/]")
            .Padding(2, 2, 2, 2)
            .Border(BoxBorder.Rounded);

        AnsiConsole.Write(infoPanel);
        continue;
    }

    // Режим "Начать работу" (Внутренний цикл)
    List<string> sessionHistory = new();

    while (true)
    {
        var rawText = AnsiConsole.Prompt(
            new TextPrompt<string>("[bold white]Введите ваше «эмоциональное» сообщение (или оставьте пустым для отмены):[/] ")
                .AllowEmpty());

        if (string.IsNullOrWhiteSpace(rawText))
            break; // Возврат в главное меню

        var mode = AnsiConsole.Prompt(
            new SelectionPrompt<string>()
                .Title("Выберите [bold blue]режим трансформации[/]:")
                .PageSize(10)
                .AddChoices(new[] { "PROFESSIONAL", "KIND", "TECHNICAL", "LACONIC", "ОТМЕНА" }));

        if (mode == "ОТМЕНА") 
            break;

        string result = "";

        // Индикатор загрузки (Spinning)
        await AnsiConsole.Status()
            .StartAsync("ToneWave AI подбирает слова...", async ctx => 
            {
                result = await CallOllamaAsync(rawText, mode);
            });

        // Вывод результата в красивой панели
        var panel = new Panel(result)
            .Header($"[bold green]Результат ({mode})[/]")
            .Padding(1, 1, 1, 1)
            .Border(BoxBorder.Rounded);
        
        AnsiConsole.Write(panel);

        // Добавляем результат в историю этой сессии
        sessionHistory.Add($"[ОРИГИНАЛ]: {rawText}\n[{mode}]: {result}\n-----------------------------------------");

        AnsiConsole.MarkupLine("\n[grey]Нажмите [white]Enter[/] чтобы продолжить накидывать сообщения, или [white]Esc[/] чтобы завершить...[/]");
        
        ConsoleKeyInfo keyInfo;
        do
        {
            keyInfo = Console.ReadKey(intercept: true);
        } while (keyInfo.Key != ConsoleKey.Enter && keyInfo.Key != ConsoleKey.Escape);

        if (keyInfo.Key == ConsoleKey.Escape)
        {
            AnsiConsole.WriteLine();
            if (sessionHistory.Count > 0)
            {
                if (AnsiConsole.Confirm($"Сохранить все накопленные фразы сессии ({sessionHistory.Count} шт.) в .txt файл?"))
                {
                    string fileName = $"wave_session_{DateTime.Now:yyyyMMdd_HHmmss}.txt";
                    await File.WriteAllLinesAsync(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, fileName), sessionHistory);
                    AnsiConsole.MarkupLine($"[grey]Файл сохранен как: {fileName}[/]\n");
                }
            }
            break;
        }

        AnsiConsole.WriteLine(); // Отступ перед следующим вводом
    }
}

// Метод для работы с Ollama
async Task<string> CallOllamaAsync(string text, string mode)
{
    try 
    {
        using var client = new HttpClient();
        client.Timeout = TimeSpan.FromSeconds(30);
        
        string systemPrompt = mode switch
        {
            "PROFESSIONAL" => 
                "Ты — эксперт по бизнес-коммуникациям. Твоя задача: превратить любое, даже самое агрессивное сообщение в безупречно вежливое и конструктивное, подходящее для переписки с руководством или клиентами. Сохрани суть претензии, но удали все оскорбления и эмоции.",
            "KIND" => 
                "Ты — максимально эмпатичный помощник. Преврати сообщение в добрую и мягкую просьбу. Используй слова поддержки, делай акцент на сотрудничестве и общем благе. Текст должен звучать дружелюбно и тепло.",
            "TECHNICAL" => 
                "Ты — системный аналитик. Удали из текста все эмоции, субъективные оценки и воду. Оставь только сухие факты, технические требования или описание проблемы. Текст должен быть коротким, четким и структурированным.",
            "LACONIC" => 
                "Ты — мастер краткости. Твоя задача — сжать исходное сообщение до одной короткой, но емкой фразы (максимум 5-7 слов), сохранив главный посыл. Никаких лишних приветствий и вежливостей.",
            _ => "Ты — лингвистический переводчик."
        };

        var payload = new
        {
            model = "llama3.2",
            prompt = $"[SYSTEM]: {systemPrompt}\n\n[USER]: Текст для трансформации: \"{text}\"\n\n[IMPORTANT]: Выдай только финальный вариант текста без комментариев, вступлений и объяснений. Если в тексте есть мат, нейтрализуй его, сохранив смысл жалобы.\n\n[RESULT]:",
            stream = false,
            options = new { temperature = 0.5, num_predict = 150 }
        };

        var response = await client.PostAsync("http://localhost:11434/api/generate", 
            new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json"));
        
        if (!response.IsSuccessStatusCode)
            return $" Ошибка Ollama: {response.StatusCode}. Убедитесь, что Ollama запущена.";

        var json = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(json);
        return doc.RootElement.GetProperty("response").GetString()?.Trim() ?? "Пустой ответ от модели";
    }
    catch (Exception ex)
    {
        return $"[red]Ошибка связи:[/] {ex.Message}. Проверьте, запущен ли сервер Ollama на порту 11434.";
    }
}
