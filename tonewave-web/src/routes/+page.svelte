<script lang="ts">
    import { fade, slide } from "svelte/transition";

    let showApp = $state(false);
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

{#if !showApp}
    <!-- Лэндинг -->
    <div
        class="flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto h-full px-4"
        in:fade={{ duration: 1000, delay: 100 }}
        out:fade={{ duration: 400 }}
    >
        <div
            class="inline-flex items-center gap-3 px-5 py-2.5 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl mb-10 shadow-inner shadow-white/5 saturate-150"
        >
            <span
                class="w-2.5 h-2.5 rounded-full bg-[#2DD4BF] animate-pulse shadow-[0_0_12px_#2DD4BF]"
            ></span>
            <span
                class="text-sm font-medium tracking-wide text-teal-50/80 uppercase"
                >AI-редактор коммуникаций</span
            >
        </div>

        <h1
            class="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight py-4"
        >
            <span
                class="text-transparent bg-clip-text bg-gradient-to-br from-white via-teal-100 to-teal-800"
                style="padding-bottom: 0.1em;">ToneWave</span
            >
            <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] to-teal-400"
                style="padding-bottom: 0.1em;">AI</span
            >
        </h1>

        <p
            class="text-lg md:text-2xl text-teal-100/60 font-medium max-w-2xl mb-14 leading-relaxed"
        >
            Превратите любые искренние эмоции в дипломатичный и конструктивный
            диалог. Решайте конфликты профессионально.
        </p>

        <button
            onclick={() => (showApp = true)}
            class="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-2xl text-white font-bold text-lg md:text-xl py-5 px-14 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(45,212,191,0.2)] hover:border-[#2DD4BF]/50 active:scale-95"
        >
            <span class="relative z-10 flex items-center gap-3">
                Войти в приложение
                <svg
                    class="w-6 h-6 transition-transform group-hover:translate-x-1 text-[#2DD4BF]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                </svg>
            </span>
            <div
                class="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            ></div>
        </button>
    </div>
{:else}
    <!-- Основной функционал -->
    <div
        class="w-full max-w-5xl mx-auto w-full pt-8"
        in:fade={{ duration: 600, delay: 200 }}
    >
        <!-- Header -->
        <div class="flex items-center justify-between mb-12">
            <button
                onclick={() => (showApp = false)}
                class="text-teal-500 hover:text-[#2DD4BF] transition-colors p-2 rounded-full hover:bg-white/5 flex items-center gap-2 text-sm font-semibold"
            >
                <svg
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                Назад
            </button>
            <h1
                class="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-200"
            >
                ToneWave AI
            </h1>
            <div class="w-20"></div>
            <!-- Spacer -->
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            <!-- Left Column: Input and Controls -->
            <div class="lg:col-span-5 space-y-6">
                <div
                    class="bg-white/5 backdrop-blur-2xl border border-white/10 saturate-150 rounded-[24px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all"
                >
                    <label
                        for="message"
                        class="block text-sm font-bold text-teal-100/70 mb-3 uppercase tracking-wider"
                    >
                        Оригинальное сообщение
                    </label>
                    <textarea
                        id="message"
                        bind:value={rawText}
                        placeholder="Введите текст, который нужно смягчить..."
                        class="w-full bg-[#0A120E]/50 text-teal-50 border border-white/10 rounded-[20px] p-5 min-h-[160px] focus:ring-2 focus:ring-[#2DD4BF]/50 focus:border-transparent transition resize-none placeholder-teal-700/50 outline-none saturate-100"
                    ></textarea>
                </div>

                <div
                    class="bg-white/5 backdrop-blur-2xl border border-white/10 saturate-150 rounded-[24px] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                >
                    <p
                        class="block text-sm font-bold text-teal-100/70 mb-4 uppercase tracking-wider"
                    >
                        Стиль общения
                    </p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {#each modes as mode}
                            <button
                                onclick={() => (selectedMode = mode.id)}
                                class="flex flex-col items-start p-4 rounded-[20px] border transition-all text-left group overflow-hidden relative
                                    {selectedMode === mode.id
                                    ? 'bg-[#2DD4BF]/10 border-[#2DD4BF]/50 shadow-[0_0_20px_rgba(45,212,191,0.15)] saturate-150'
                                    : 'bg-black/20 border-white/5 hover:bg-white/5'}"
                            >
                                <span
                                    class="flex items-center gap-2 mb-1 relative z-10"
                                >
                                    <span class="text-xl">{mode.icon}</span>
                                    <span class="font-bold text-slate-100"
                                        >{mode.label}</span
                                    >
                                </span>
                                <span
                                    class="text-xs text-teal-100/50 group-hover:text-teal-100/70 transition-colors relative z-10"
                                >
                                    {mode.desc}
                                </span>
                            </button>
                        {/each}
                    </div>
                </div>

                <button
                    onclick={handleTransform}
                    disabled={isProcessing || !rawText.trim()}
                    class="w-full relative overflow-hidden group bg-[#2DD4BF] text-[#0A120E] font-black tracking-wide text-lg rounded-[24px] py-5 shadow-[0_10px_30px_rgba(45,212,191,0.3)] hover:shadow-[0_10px_40px_rgba(45,212,191,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 active:translate-y-0 disabled:transform-none"
                >
                    <span
                        class="relative z-10 flex items-center justify-center gap-2"
                    >
                        {#if isProcessing}
                            <svg
                                class="animate-spin h-6 w-6 text-[#0A120E]"
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
                            <span class="text-2xl">✨</span> Трансформировать
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
                    class="bg-white/5 backdrop-blur-3xl border border-white/10 saturate-150 rounded-[32px] p-8 h-full min-h-[500px] shadow-[0_15px_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col"
                >
                    <!-- Subtle inner glow -->
                    <div
                        class="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#2DD4BF]/10 rounded-full blur-[80px] pointer-events-none"
                    ></div>

                    <div
                        class="flex items-center justify-between mb-8 pb-5 border-b border-white/10 relative z-10"
                    >
                        <h2
                            class="text-xl font-black text-teal-50 flex items-center gap-3"
                        >
                            <span
                                class="w-10 h-10 rounded-full bg-[#2DD4BF]/20 text-[#2DD4BF] flex items-center justify-center border border-[#2DD4BF]/30 shadow-[0_0_15px_rgba(45,212,191,0.2)]"
                            >
                                <svg
                                    class="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </span>
                            Результат
                        </h2>
                        {#if resultText}
                            <button
                                class="text-sm font-bold text-teal-100/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 px-4 py-2 rounded-[16px] transition-all flex items-center gap-2 shadow-sm"
                            >
                                <svg
                                    class="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                                Копировать
                            </button>
                        {/if}
                    </div>

                    <div
                        class="flex-grow rounded-[24px] p-7 bg-[#0A120E]/40 font-medium text-teal-50/90 leading-relaxed overflow-y-auto border border-white/5 shadow-inner relative z-10 text-lg"
                    >
                        {#if resultText}
                            <div in:fade={{ duration: 400 }}>
                                {resultText}
                                {#if isProcessing}
                                    <span
                                        class="inline-block w-2 h-5 ml-1 bg-[#2DD4BF] animate-pulse align-middle shadow-[0_0_8px_#2DD4BF]"
                                    ></span>
                                {/if}
                            </div>
                        {:else}
                            <div
                                class="h-full flex flex-col items-center justify-center text-teal-100/30 text-center gap-6"
                            >
                                <span
                                    class="text-7xl opacity-50 drop-shadow-2xl mix-blend-luminosity"
                                    >🌊</span
                                >
                                <p class="text-lg max-w-sm">
                                    Здесь появится конструктивный ответ после
                                    того, как вы введете сообщение.
                                </p>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    /* Custom scrollbar for webkit */
    ::-webkit-scrollbar {
        width: 6px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(45, 212, 191, 0.2);
        border-radius: 20px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: rgba(45, 212, 191, 0.4);
    }

    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
</style>
