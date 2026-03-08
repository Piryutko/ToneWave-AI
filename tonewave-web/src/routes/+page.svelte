<script lang="ts">
    import { fade, slide } from "svelte/transition";

    let rawText = $state("");
    let selectedMode = $state("PROFESSIONAL");
    let resultText = $state("");
    let isProcessing = $state(false);

    const modes = [
        {
            id: "PROFESSIONAL",
            icon: "👔",
            label: "Professional",
            desc: "Деловой стиль и конструктив",
        },
        { id: "KIND", icon: "💖", label: "Kind", desc: "Эмпатия и поддержка" },
        {
            id: "TECHNICAL",
            icon: "⚙️",
            label: "Technical",
            desc: "Строгая аналитика",
        },
        {
            id: "LACONIC",
            icon: "⚡",
            label: "Laconic",
            desc: "Коротко и по делу",
        },
    ];

    async function handleTransform() {
        if (!rawText.trim() || isProcessing) return;

        isProcessing = true;
        resultText = "";

        try {
            const response = await fetch(
                "http://localhost:5000/api/transform",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        text: rawText,
                        mode: selectedMode,
                    }),
                },
            );

            if (!response.ok || !response.body) {
                throw new Error("Failed to connect to backend");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                // Parse SSE lines. Format: data: {"response":"..."}\n\n or just plain text from our backend.
                // Our backend sends `data: {line}\n\n`
                const lines = chunk.split("\n");
                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        const dataContent = line.substring(6);

                        try {
                            const parsed = JSON.parse(dataContent);
                            if (parsed.response) {
                                resultText += parsed.response;
                            } else if (parsed.error) {
                                resultText += `\nError: ${parsed.error}`;
                            }
                        } catch {
                            // If it's not JSON, it might just be the raw text depending on how Ollama streamed it
                            resultText += dataContent;
                        }
                    }
                }
            }
        } catch (err) {
            console.error(err);
            resultText = "⚠️ Возникла ошибка при трансформации сообщения.";
        } finally {
            isProcessing = false;
        }
    }
</script>

<svelte:head>
    <title>ToneWave AI</title>
</svelte:head>

<div class="w-full max-w-4xl mx-auto" in:fade={{ duration: 800 }}>
    <!-- Header Area -->
    <div class="text-center mb-12">
        <h1
            class="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center gap-4"
        >
            <span class="text-white">🌊</span> ToneWave AI
        </h1>
        <p class="text-lg md:text-xl text-slate-400 font-medium">
            Ваш личный дипломат в кармане
        </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        <!-- Left Column: Input and Controls -->
        <div class="lg:col-span-5 space-y-6">
            <div
                class="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl transition-all hover:bg-slate-800/80"
            >
                <label
                    for="message"
                    class="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider"
                    >Оригинальное сообщение</label
                >
                <textarea
                    id="message"
                    bind:value={rawText}
                    placeholder="Введите текст, который нужно смягчить (даже если там мат)..."
                    class="w-full bg-slate-900/50 text-slate-100 border border-slate-700 rounded-2xl p-4 min-h-[160px] focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none placeholder-slate-500"
                ></textarea>
            </div>

            <div
                class="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl"
            >
                <p
                    class="block text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider"
                >
                    Стиль общения
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {#each modes as mode}
                        <button
                            onclick={() => (selectedMode = mode.id)}
                            class="flex flex-col items-start p-3 rounded-xl border transition-all text-left group
                                {selectedMode === mode.id
                                ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                                : 'bg-slate-900/30 border-slate-700 hover:bg-slate-800'}"
                        >
                            <span class="flex items-center gap-2 mb-1">
                                <span class="text-xl">{mode.icon}</span>
                                <span class="font-semibold text-slate-200"
                                    >{mode.label}</span
                                >
                            </span>
                            <span
                                class="text-xs text-slate-400 group-hover:text-slate-300 transition-colors"
                                >{mode.desc}</span
                            >
                        </button>
                    {/each}
                </div>
            </div>

            <button
                onclick={handleTransform}
                disabled={isProcessing || !rawText.trim()}
                class="w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white rounded-2xl py-4 shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_10px_25px_rgba(37,99,235,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0 disabled:transform-none"
            >
                <span
                    class="relative z-10 flex items-center justify-center gap-2"
                >
                    {#if isProcessing}
                        <svg
                            class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                            ></circle>
                            <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Трансформация...
                    {:else}
                        <span class="text-xl">✨</span> Трансформировать
                    {/if}
                </span>
                <div
                    class="absolute inset-0 h-full w-full opacity-0 group-hover:opacity-20 transition-opacity bg-white"
                ></div>
            </button>
        </div>

        <!-- Right Column: Result Output -->
        <div class="lg:col-span-7">
            <div
                class="bg-slate-800/40 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-6 h-full min-h-[500px] shadow-2xl relative overflow-hidden flex flex-col"
            >
                <!-- Background ambient glow for result box -->
                <div
                    class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
                ></div>

                <div
                    class="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/50"
                >
                    <h2
                        class="text-lg font-bold text-slate-100 flex items-center gap-2"
                    >
                        <span
                            class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm"
                            >✓</span
                        >
                        Результат
                    </h2>
                    {#if resultText}
                        <button
                            class="text-xs font-semibold text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                        >
                            📋 Копировать
                        </button>
                    {/if}
                </div>

                <div
                    class="flex-grow rounded-2xl p-6 bg-slate-900/60 font-medium text-slate-200 leading-relaxed overflow-y-auto border border-slate-700/50 shadow-inner"
                >
                    {#if resultText}
                        <div in:fade={{ duration: 400 }}>
                            {resultText}
                            {#if isProcessing}
                                <span
                                    class="inline-block w-2 h-5 ml-1 bg-blue-400 animate-pulse align-middle"
                                ></span>
                            {/if}
                        </div>
                    {:else}
                        <div
                            class="h-full flex flex-col items-center justify-center text-slate-500 text-center gap-4"
                        >
                            <span class="text-6xl opacity-30">📨</span>
                            <p>
                                Здесь появится конструктивный ответ после того,<br
                                />как вы введете сообщение и нажмете кнопку.
                            </p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    /* Custom scrollbar for webkit */
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(51, 65, 85, 0.8);
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: rgba(71, 85, 105, 1);
    }
</style>
