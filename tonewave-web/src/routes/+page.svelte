<script lang="ts">
    import {
        simulateStreamingResponse,
        type TransformMode,
    } from "$lib/simulation";
    import { fade, slide } from "svelte/transition";

    let showApp = $state(false);
    let rawText = $state("");
    let selectedMode = $state<TransformMode>("PROFESSIONAL");
    let selectedTemplateIndex = $state<number | null>(null);
    let resultText = $state("");
    let isProcessing = $state(false);

    const modes: {
        id: TransformMode;
        icon: string;
        label: string;
        desc: string;
    }[] = [
        {
            id: "PROFESSIONAL",
            icon: "👔",
            label: "Professional",
            desc: "Деловой стиль",
        },
        { id: "KIND", icon: "💖", label: "Kind", desc: "Эмпатия" },
        {
            id: "TECHNICAL",
            icon: "⚙️",
            label: "Technical",
            desc: "Аналитика",
        },
        {
            id: "LACONIC",
            icon: "⚡",
            label: "Laconic",
            desc: "Коротко",
        },
    ];

    const templates = [
        {
            title: "Гневный крик",
            text: "ПОЧЕМУ НИЧЕГО НЕ ГОТОВО?",
            icon: "🤬",
            desc: "Эмоциональный запрос",
        },
        {
            title: "Паника",
            text: "ЗАКАЗЧИК РУГАЕТСЯ ПОЧЕМУ УПАЛ ПРОДАКШЕН!?",
            icon: "🚨",
            desc: "Сообщение о сбое",
        },
        {
            title: "Агрессия",
            text: "ПОЧЕМУ ЭФФЕКТИВНОСТЬ КОМАНДЫ НИЗКАЯ?! ВЫ ЧТО НЕ МОЖЕТЕ СПИСАТЬСЯ И ЗА ТРИ МИНУТЫ РЕШИТ ВОПРОС??",
            icon: "😤",
            desc: "Прямая претензия к команде",
        },
        {
            title: "Сарказм",
            text: "Опять переделывать? Вы вообще умеете читать ТЗ с первого раза?",
            icon: "😒",
            desc: "Недовльство качеством работы",
        },
        {
            title: "Ультиматум",
            text: "Если к завтрашнему утру баг не будет исправлен, я буду вынужден поднять вопрос о вашей компетенции.",
            icon: "😠",
            desc: "Жесткое требование правок",
        },
        {
            title: "Раздражение",
            text: "Сколько можно обсуждать одно и то же на созвонах? Давайте уже работать, а не болтать.",
            icon: "🙄",
            desc: "Усталость от совещаний",
        },
    ];

    async function handleTransform() {
        if (!rawText.trim() || isProcessing) return;

        isProcessing = true;
        resultText = "";

        try {
            const stream = simulateStreamingResponse(rawText, selectedMode);
            for await (const chunk of stream) {
                resultText += chunk;
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

<main
    class="relative w-full h-screen overflow-hidden bg-[#0A120E] text-teal-50 font-sans selection:bg-[#2DD4BF]/30"
>
    <!-- Background Glows -->
    <div class="fixed inset-0 pointer-events-none">
        <div
            class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-900/20 rounded-full blur-[120px] animate-pulse"
        ></div>
        <div
            class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-800/10 rounded-full blur-[120px] animate-pulse"
            style="animation-delay: 2s"
        ></div>
    </div>

    <div class="grid grid-cols-1 grid-rows-1 h-full w-full">
        {#if !showApp}
            <!-- Лэндинг -->
            <div
                class="col-start-1 row-start-1 flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto h-full px-4 z-10"
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
                    <span
                        class="block text-[10px] uppercase tracking-[0.4em] text-white/30 font-medium mt-2"
                    >
                        Conceptual Demo
                    </span>
                    <a
                        href="https://github.com/Piryutko"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="block text-[9px] uppercase tracking-[0.2em] text-[#2DD4BF]/40 hover:text-[#2DD4BF] transition-colors font-bold mt-4"
                    >
                        github.com/Piryutko
                    </a>
                </h1>

                <p
                    class="text-lg md:text-2xl text-teal-100/60 font-medium max-w-2xl mb-14 leading-relaxed"
                >
                    Превратите любые искренние эмоции в дипломатичный и
                    конструктивный диалог. Решайте конфликты профессионально.
                </p>

                <button
                    onclick={() => (showApp = true)}
                    class="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-2xl text-white font-bold text-lg md:text-xl py-5 px-14 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(45,212,191,0.2)] hover:border-[#2DD4BF]/50 active:scale-95"
                >
                    <span class="relative z-10 flex items-center gap-3">
                        Начать работу
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
                class="col-start-1 row-start-1 w-full max-w-[1700px] mx-auto px-10 py-10 min-h-screen flex flex-col justify-center z-20"
                in:fade={{ duration: 600, delay: 200 }}
            >
                <!-- Header enriched, similar to landing but more compact -->
                <div class="flex flex-col items-center mb-10 relative">
                    <button
                        onclick={() => (showApp = false)}
                        class="absolute left-0 top-2 text-teal-500 hover:text-[#2DD4BF] transition-colors p-2 rounded-full hover:bg-white/5 flex items-center gap-2 text-sm font-semibold"
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

                    <h1 class="text-3xl font-black tracking-tight text-center">
                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-200"
                            >ToneWave AI</span
                        >
                        <div class="flex flex-col items-center mt-2 gap-1">
                            <span
                                class="text-[10px] uppercase tracking-[0.4em] text-white/20 font-medium"
                                >Conceptual Demo</span
                            >
                            <a
                                href="https://github.com/Piryutko"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-[9px] uppercase tracking-[0.2em] text-[#2DD4BF]/30 hover:text-[#2DD4BF] transition-colors font-bold"
                            >
                                github.com/Piryutko
                            </a>
                        </div>
                    </h1>
                </div>

                <!-- 3-Column Layout -->
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
                    <!-- Col 1: Templates -->
                    <div class="lg:col-span-3 lg:h-[640px] flex flex-col">
                        <div
                            class="border border-white/10 rounded-[28px] p-6 h-full flex flex-col"
                        >
                            <p
                                class="text-[12px] font-black text-teal-100/40 mb-5 uppercase tracking-[0.2em] px-1"
                            >
                                Шаблоны
                            </p>
                            <div
                                class="space-y-2 overflow-y-auto pr-1 flex-grow"
                            >
                                {#each templates as template, i}
                                    <button
                                        onclick={() => {
                                            rawText = template.text;
                                            selectedTemplateIndex = i;
                                        }}
                                        class="w-full flex items-center gap-3 p-3 rounded-[16px] border transition-[background-color,border-color,transform] duration-200 text-left group active:scale-[0.98]
                                            {selectedTemplateIndex === i
                                            ? 'bg-[#2DD4BF]/20 border-[#2DD4BF]/50 shadow-[0_0_15px_rgba(45,212,191,0.1)] saturate-150'
                                            : 'bg-black/30 border-white/5 hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF]/20'}"
                                    >
                                        <span
                                            class="text-2xl group-hover:scale-110 transition-transform"
                                            >{template.icon}</span
                                        >
                                        <div class="min-w-0">
                                            <p
                                                class="font-bold text-slate-100 text-[15px] leading-tight uppercase tracking-tight truncate"
                                            >
                                                {template.title}
                                            </p>
                                            <p
                                                class="text-[12px] text-teal-100/40 line-clamp-1 group-hover:text-teal-100/60"
                                            >
                                                {template.desc}
                                            </p>
                                        </div>
                                    </button>
                                {/each}
                            </div>
                        </div>
                    </div>

                    <!-- Col 2: Workspace Core -->
                    <div class="lg:col-span-4 flex flex-col gap-3">
                        <!-- Input Area -->
                        <div
                            class="border border-white/10 rounded-[20px] p-4"
                        >
                            <label
                                for="message"
                                class="block text-[12px] font-black text-teal-100/40 mb-4 uppercase tracking-[0.2em] px-1"
                            >
                                Оригинальное сообщение
                            </label>
                            <textarea
                                id="message"
                                bind:value={rawText}
                                readonly
                                placeholder="Выберите шаблон..."
                                class="w-full bg-black/40 text-teal-50/90 border border-white/5 rounded-[20px] p-5 h-[140px] focus:ring-1 focus:ring-[#2DD4BF]/30 transition resize-none placeholder-teal-800/40 outline-none text-lg cursor-default"
                            ></textarea>
                        </div>

                        <!-- Style Selection -->
                        <div
                            class="border border-white/10 rounded-[20px] p-4 flex flex-col"
                        >
                            <p
                                class="text-[12px] font-black text-teal-100/40 mb-4 uppercase tracking-[0.2em] px-1"
                            >
                                Стиль трансформации
                            </p>
                            <div class="grid grid-cols-2 gap-4 mb-5">
                                {#each modes as mode}
                                    <button
                                        onclick={() => (selectedMode = mode.id)}
                                        class="flex flex-col items-center justify-center p-5 rounded-[20px] border transition-[background-color,border-color,box-shadow,transform] duration-200 text-center gap-2.5
                                            {selectedMode === mode.id
                                            ? 'bg-[#2DD4BF]/20 border-[#2DD4BF]/50 shadow-[0_0_15px_rgba(45,212,191,0.1)] saturate-150'
                                            : 'bg-black/40 border-white/5 hover:bg-white/5'}"
                                    >
                                        <span class="text-3xl">{mode.icon}</span
                                        >
                                        <span
                                            class="font-bold text-slate-100 text-[15px]"
                                            >{mode.label}</span
                                        >
                                        <span
                                            class="text-[12px] text-teal-100/30 uppercase tracking-tighter"
                                            >{mode.desc}</span
                                        >
                                    </button>
                                {/each}
                            </div>

                            <!-- Action Button -->
                            <button
                                onclick={handleTransform}
                                disabled={isProcessing || !rawText.trim()}
                                class="w-full h-11 relative overflow-hidden group bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] text-[#050A08] font-black tracking-[0.15em] text-[10px] rounded-[14px] shadow-[0_0_20px_rgba(45,212,191,0.2)] transition-all duration-300 disabled:opacity-30 disabled:saturate-50 active:scale-[0.97] uppercase"
                            >
                                <span
                                    class="relative z-10 flex items-center justify-center gap-2"
                                >
                                    {#if isProcessing}
                                        <svg
                                            class="animate-spin h-4 w-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
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
                                        <span>Обработка...</span>
                                    {:else}
                                        <span class="opacity-80">✨</span>
                                        <span>ТРАНСФОРМИРОВАТЬ</span>
                                    {/if}
                                </span>

                                <!-- Hover Glow -->
                                <div
                                    class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                ></div>
                            </button>
                        </div>
                    </div>

                    <!-- Col 3: Results -->
                    <div class="lg:col-span-5 lg:h-[640px] flex flex-col">
                        <div
                            class="border border-white/10 rounded-[32px] p-8 h-full relative overflow-hidden flex flex-col"
                        >
                            <div
                                class="flex items-center justify-between mb-5 pb-5 border-b border-white/5"
                            >
                                <h2
                                    class="text-base font-black text-teal-50 flex items-center gap-4 uppercase tracking-widest"
                                >
                                    <span
                                        class="w-10 h-10 rounded-full bg-[#2DD4BF]/10 text-[#2DD4BF] flex items-center justify-center border border-[#2DD4BF]/20"
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
                            </div>

                            <div
                                class="flex-grow rounded-[24px] p-6 bg-black/40 font-medium text-teal-50/90 leading-relaxed overflow-y-auto border border-white/5 relative z-10 text-[18px]"
                            >
                                {#if resultText}
                                    <div in:fade={{ duration: 400 }}>
                                        {resultText}
                                        {#if isProcessing}
                                            <span
                                                class="inline-block w-2.5 h-6 ml-1 bg-[#2DD4BF] animate-pulse"
                                            ></span>
                                        {/if}
                                    </div>
                                {:else}
                                    <div
                                        class="h-full flex flex-col items-center justify-center text-teal-100/20 text-center gap-5"
                                    >
                                        <span class="text-7xl opacity-30"
                                            >🌊</span
                                        >
                                        <p class="text-[15px] max-w-[260px]">
                                            Здесь появится исправленный текст
                                            после запуска трансформации
                                        </p>
                                    </div>
                                {/if}
                            </div>

                            {#if resultText && !isProcessing}
                                <button
                                    class="mt-5 w-full py-5 rounded-[20px] bg-white/5 border border-white/10 text-base font-bold text-teal-100/60 hover:bg-white/10 transition-all font-black uppercase tracking-widest"
                                >
                                    Копировать результат
                                </button>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</main>

<style>
    ::-webkit-scrollbar {
        width: 4px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(45, 212, 191, 0.2);
        border-radius: 10px;
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
