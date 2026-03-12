<script lang="ts">
    import {
        simulateStreamingResponse,
        type TransformMode,
    } from "$lib/simulation";
    import { fade, slide } from "svelte/transition";

    type Language = "RU" | "EN" | "JP";
    let currentLang = $state<Language>("RU");

    const t = $derived({
        RU: {
            appTitle: "ToneWave AI",
            appDesc: "AI-редактор коммуникаций",
            heroTitle: "ToneWave",
            heroSub: "Conceptual Demo",
            heroBody: "Превратите любые искренние эмоции в дипломатичный и конструктивный диалог. Решайте конфликты профессионально.",
            startBtn: "Начать работу",
            backBtn: "Назад",
            templates: "Шаблоны",
            originalMsg: "Оригинальное сообщение",
            placeholder: "Выберите шаблон...",
            styleTitle: "Стиль трансформации",
            transformBtn: "ТРАНСФОРМИРОВАТЬ",
            processing: "Обработка...",
            resultTitle: "Результат",
            copyBtn: "Копировать результат",
            copied: "Скопировано!",
            error: "⚠️ Возникла ошибка при трансформации сообщения.",
            emptyResult: "Здесь появится исправленный текст после запуска трансформации",
            roadmapBtn: "Для инвесторов",
            roadmapTitle: "Стратегия развития ToneWave AI",
            roadmapIntro: "ToneWave AI — это не просто демо, а фундамент для мощной экосистемы коммуникаций. Ниже представлен план масштабирования проекта для потенциальных инвесторов.",
            phase1Title: "Фаза 1: Продакшн-инфраструктура",
            phase1Desc: "Переход от симуляции к реальным LLM (GPT-4o, Claude 3.5). Настройка отказоустойчивых серверов и оптимизация задержек (Latency).",
            phase2Title: "Фаза 2: Пользовательское ядро",
            phase2Desc: "Внедрение системы авторизации, облачного хранения истории сообщений и персональных настроек стиля для каждого пользователя.",
            phase3Title: "Фаза 3: Экспансия экосистемы",
            phase3Desc: "Разработка расширений для браузеров (Chrome, Edge), плагинов для Outlook/Gmail и интеграция с корпоративными мессенджерами (Slack, Discord).",
            phase4Title: "Фаза 4: Бизнес и монетизация",
            phase4Desc: "Запуск модели подписок (Freemium), предоставление API для корпоративных клиентов и возможность White-label лицензирования.",
            contactUs: "Связаться для инвестиций",
        },
        EN: {
            appTitle: "ToneWave AI",
            appDesc: "AI Communication Editor",
            heroTitle: "ToneWave",
            heroSub: "Conceptual Demo",
            heroBody: "Turn any sincere emotions into diplomatic and constructive dialogue. Resolve conflicts professionally.",
            startBtn: "Get Started",
            backBtn: "Back",
            templates: "Templates",
            originalMsg: "Original Message",
            placeholder: "Select a template...",
            styleTitle: "Transformation Style",
            transformBtn: "TRANSFORM",
            processing: "Processing...",
            resultTitle: "Result",
            copyBtn: "Copy Result",
            copied: "Copied!",
            error: "⚠️ An error occurred during transformation.",
            emptyResult: "Corrected text will appear here after transformation",
            roadmapBtn: "For Investors",
            roadmapTitle: "ToneWave AI Growth Strategy",
            roadmapIntro: "ToneWave AI is not just a demo, but the foundation for a powerful communication ecosystem. Below is the scaling plan for potential investors.",
            phase1Title: "Phase 1: Production Infrastructure",
            phase1Desc: "Transition from simulation to real LLMs (GPT-4o, Claude 3.5). Setting up high-availability servers and latency optimization.",
            phase2Title: "Phase 2: User Core",
            phase2Desc: "Implementing authentication, cloud-based message history storage, and personalized style settings for every user.",
            phase3Title: "Phase 3: Ecosystem Expansion",
            phase3Desc: "Developing browser extensions (Chrome, Edge), plugins for Outlook/Gmail, and integrations with corporate messengers (Slack, Discord).",
            phase4Title: "Phase 4: Business & Revenue",
            phase4Desc: "Launching subscription models (Freemium), providing API access for corporate clients, and White-label licensing options.",
            contactUs: "Contact for Investment",
        },
        JP: {
            appTitle: "ToneWave AI",
            appDesc: "AI コミュニケーションエディタ",
            heroTitle: "ToneWave",
            heroSub: "Conceptual Demo",
            heroBody: "どんな感情も、外交的で建設的な対話に変えましょう。プロフェッショナルに紛争を解決します。",
            startBtn: "使ってみる",
            backBtn: "戻る",
            templates: "テンプレート",
            originalMsg: "元のメッセージ",
            placeholder: "テンプレートを選択してください...",
            styleTitle: "変換スタイル",
            transformBtn: "変換する",
            processing: "処理中...",
            resultTitle: "結果",
            copyBtn: "結果をコピー",
            copied: "コピーしました！",
            error: "⚠️ 変換中にエラーが発生しました。",
            emptyResult: "変換後にここに修正されたテキストが表示されます",
            roadmapBtn: "投資家向け",
            roadmapTitle: "ToneWave AI 成長戦略",
            roadmapIntro: "ToneWave AIは単なるデモではなく、強力なコミュニケーションエコシステムの基盤です。以下は潜在的な投資家向けののスケーリングプランです。",
            phase1Title: "フェーズ1: 本番インフラストラクチャ",
            phase1Desc: "シミュレーションからリアルなLLM（GPT-4o、Claude 3.5）への移行。高可用性サーバーの構築と遅延の最適化。",
            phase2Title: "フェーズ2: ユーザーコア",
            phase2Desc: "認証システム、クラウドベースのメッセージ履歴保存、ユーザーごとのパーソナライズされたスタイル設定の実装。",
            phase3Title: "フェーズ3: エコシステムの拡大",
            phase3Desc: "ブラウザ拡張機能（Chrome, Edge）、Outlook/Gmail用プラグインの開発、およびSlack/Discordとの連携。",
            phase4Title: "フェーズ4: ビジネスと収益",
            phase4Desc: "サブスクリプションモデル（Freemium）の開始、企業向けAPIの提供、およびホワイトラベルライセンスのオプション。",
            contactUs: "投資に関するお問い合わせ",
        },
    }[currentLang]);

    const modes: {
        id: TransformMode;
        icon: string;
        labels: Record<Language, { title: string; desc: string }>;
    }[] = [
        {
            id: "PROFESSIONAL",
            icon: "👔",
            labels: {
                RU: { title: "Professional", desc: "Деловой стиль" },
                EN: { title: "Professional", desc: "Business style" },
                JP: { title: "プロフェッショナル", desc: "ビジネススタイル" },
            },
        },
        {
            id: "KIND",
            icon: "💖",
            labels: {
                RU: { title: "Kind", desc: "Эмпатия" },
                EN: { title: "Kind", desc: "Empathy" },
                JP: { title: "親切", desc: "共感" },
            },
        },
        {
            id: "TECHNICAL",
            icon: "⚙️",
            labels: {
                RU: { title: "Technical", desc: "Аналитика" },
                EN: { title: "Technical", desc: "Analytic" },
                JP: { title: "テクニカル", desc: "分析的" },
            },
        },
        {
            id: "LACONIC",
            icon: "⚡",
            labels: {
                RU: { title: "Laconic", desc: "Коротко" },
                EN: { title: "Laconic", desc: "Concise" },
                JP: { title: "簡潔", desc: "短文" },
            },
        },
    ];

    const allTemplates: Record<Language, { title: string; text: string; icon: string; desc: string }[]> = {
        RU: [
            { title: "Гневный крик", text: "ПОЧЕМУ НИЧЕГО НЕ ГОТОВО?", icon: "🤬", desc: "Эмоциональный запрос" },
            { title: "Паника", text: "ЗАКАЗЧИК РУГАЕТСЯ ПОЧЕМУ УПАЛ ПРОДАКШЕН!?", icon: "🚨", desc: "Сообщение о сбое" },
            { title: "Агрессия", text: "ПОЧЕМУ ЭФФЕКТИВНОСТЬ КОМАНДЫ НИЗКАЯ?!", icon: "😤", desc: "Прямая претензия" },
            { title: "Сарказм", text: "Опять переделывать? Вы вообще умеете читать ТЗ?", icon: "😒", desc: "Недовольство качеством" },
            { title: "Ультиматум", text: "Если к завтра к утру не будет готово, я подниму вопрос о компетенции.", icon: "😠", desc: "Жесткое требование" },
            { title: "Раздражение", text: "Давайте уже работать, а не болтать.", icon: "🙄", desc: "Усталость от созвонов" },
        ],
        EN: [
            { title: "Angry Shout", text: "WHY IS NOTHING READY YET?", icon: "🤬", desc: "Emotional request" },
            { title: "Panic", text: "THE CLIENT IS ANGRY WHY IS PRODUCTION DOWN!?", icon: "🚨", desc: "Outage report" },
            { title: "Aggression", text: "WHY IS TEAM EFFICIENCY SO LOW?!", icon: "😤", desc: "Direct complaint" },
            { title: "Sarcasm", text: "Redoing it again? Can you even read the specs?", icon: "😒", desc: "Quality dissatisfaction" },
            { title: "Ultimatum", text: "If this isn't fixed by morning, I'll report your competence.", icon: "😠", desc: "Hard deadline" },
            { title: "Irritation", text: "Let's just work and stop talking.", icon: "🙄", desc: "Meeting fatigue" },
        ],
        JP: [
            { title: "怒りの叫び", text: "なぜまだ何も終わっていないのですか？", icon: "🤬", desc: "感情的な要求" },
            { title: "パニック", text: "顧客が怒っています！なぜ本番環境が落ちているのですか！？", icon: "🚨", desc: "障害報告" },
            { title: "攻撃性", text: "なぜチームの効率がこんなに低いのですか！？", icon: "😤", desc: "直接的な不満" },
            { title: "皮肉", text: "またやり直しですか？仕様書を読めますか？", icon: "😒", desc: "品質への不満" },
            { title: "最後通牒", text: "明日の朝までに修正されない場合、進退を問います。", icon: "😠", desc: "厳しい要求" },
            { title: "苛立ち", text: "おしゃべりはやめて、仕事をしましょう。", icon: "🙄", desc: "会議疲れ" },
        ],
    };

    const templates = $derived(allTemplates[currentLang]);

    let showApp = $state(false);
    let rawText = $state("");
    let selectedMode = $state<TransformMode>("PROFESSIONAL");
    let selectedTemplateIndex = $state<number | null>(null);
    let resultText = $state("");
    let isProcessing = $state(false);
    let copied = $state(false);
    let isRoadmapOpen = $state(false);

    async function handleCopy() {
        if (!resultText) return;
        try {
            await navigator.clipboard.writeText(resultText);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    }

    async function handleTransform() {
        if (!rawText.trim() || isProcessing) return;

        isProcessing = true;
        resultText = "";

        try {
            const stream = simulateStreamingResponse(rawText, selectedMode, currentLang);
            for await (const chunk of stream) {
                resultText += chunk;
            }
        } catch (err) {
            console.error(err);
            resultText = t.error;
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

    <!-- Desktop Controls (Top Right) -->
    <div class="fixed top-6 right-8 z-50 flex flex-col items-end gap-3">
        <!-- Language Switcher -->
        <div class="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-md">
            {#each ["RU", "EN", "JP"] as lang}
                <button
                    onclick={() => (currentLang = lang as Language)}
                    class="px-3 py-1 rounded-full text-[10px] font-black tracking-widest transition-all
                        {currentLang === lang 
                            ? 'bg-[#2DD4BF] text-[#050A08] shadow-[0_0_15px_rgba(45,212,191,0.3)]' 
                            : 'text-white/30 hover:text-white/60'}"
                >
                    {lang}
                </button>
            {/each}
        </div>

        <!-- Investment Badge (Stubtle but visible) -->
        <button
            onclick={() => (isRoadmapOpen = true)}
            class="group flex items-center gap-2 px-3 py-1.5 text-[10px] font-black tracking-[0.2em] text-white/40 hover:text-[#2DD4BF] transition-all uppercase bg-white/5 border border-white/5 rounded-full hover:border-[#2DD4BF]/30"
        >
            <span class="w-1 h-1 rounded-full bg-[#2DD4BF] animate-pulse"></span>
            {t.roadmapBtn}
        </button>
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
                        >{t.appDesc}</span
                    >
                </div>

                <h1
                    class="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight py-4"
                >
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-br from-white via-teal-100 to-teal-800"
                        style="padding-bottom: 0.1em;">{t.heroTitle}</span
                    >
                    <span
                        class="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] to-teal-400"
                        style="padding-bottom: 0.1em;">AI</span
                    >
                    <span
                        class="block text-[10px] uppercase tracking-[0.4em] text-white/30 font-medium mt-2"
                    >
                        {t.heroSub}
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
                    {t.heroBody}
                </p>

                <button
                    onclick={() => (showApp = true)}
                    class="group relative overflow-hidden bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-2xl text-white font-bold text-lg md:text-xl py-5 px-14 rounded-[32px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(45,212,191,0.2)] hover:border-[#2DD4BF]/50 active:scale-95"
                >
                    <span class="relative z-10 flex items-center gap-3">
                        {t.startBtn}
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
                        {t.backBtn}
                    </button>

                    <h1 class="text-3xl font-black tracking-tight text-center">
                        <span
                            class="text-transparent bg-clip-text bg-gradient-to-r from-white to-teal-200"
                            >{t.appTitle}</span
                        >
                        <div class="flex flex-col items-center mt-2 gap-1">
                            <span
                                class="text-[10px] uppercase tracking-[0.4em] text-white/20 font-medium"
                                >{t.heroSub}</span
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
                                {t.templates}
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
                                {t.originalMsg}
                            </label>
                            <textarea
                                id="message"
                                bind:value={rawText}
                                readonly
                                placeholder={t.placeholder}
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
                                {t.styleTitle}
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
                                            >{mode.labels[currentLang].title}</span
                                        >
                                        <span
                                            class="text-[12px] text-teal-100/30 uppercase tracking-tighter"
                                            >{mode.labels[currentLang].desc}</span
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
                                        <span>{t.processing}</span>
                                    {:else}
                                        <span class="opacity-80">✨</span>
                                        <span>{t.transformBtn}</span>
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
                                    {t.resultTitle}
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
                                            {t.emptyResult}
                                        </p>
                                    </div>
                                {/if}
                            </div>

                            {#if resultText && !isProcessing}
                                <button
                                    onclick={handleCopy}
                                    class="mt-5 w-full py-5 rounded-[20px] border transition-all font-black uppercase tracking-widest flex items-center justify-center gap-3
                                        {copied
                                            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                                            : 'bg-white/5 border-white/10 text-teal-100/60 hover:bg-white/10 hover:border-white/20'}"
                                >
                                    {#if copied}
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
                                        {t.copied}
                                    {:else}
                                        {t.copyBtn}
                                    {/if}
                                </button>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>

    <!-- Roadmap Modal -->
    {#if isRoadmapOpen}
        <div 
            class="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10"
            in:fade={{ duration: 300 }}
            out:fade={{ duration: 200 }}
        >
            <!-- Backdrop -->
            <button 
                class="absolute inset-0 bg-[#050A08]/90 backdrop-blur-2xl cursor-default"
                onclick={() => (isRoadmapOpen = false)}
                aria-label="Close modal"
            ></button>

            <!-- Modal Content -->
            <div 
                class="relative w-full max-w-5xl bg-[#0A120E] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                in:fade={{ duration: 400, delay: 100 }}
            >
                <div class="absolute top-8 right-8 z-10">
                    <button 
                        onclick={() => (isRoadmapOpen = false)}
                        class="p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                        aria-label="Close roadmap"
                    >
                        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="p-10 sm:p-16 overflow-y-auto custom-scrollbar">
                    <div class="max-w-3xl">
                        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 text-[#2DD4BF] text-[10px] font-black tracking-widest uppercase mb-6">
                            Investment Roadmap
                        </div>
                        <h2 class="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
                            {t.roadmapTitle}
                        </h2>
                        <p class="text-xl text-teal-100/60 leading-relaxed mb-12">
                            {t.roadmapIntro}
                        </p>

                        <div class="space-y-8">
                            <!-- Phase cards -->
                            {#each [
                                { title: t.phase1Title, desc: t.phase1Desc, phase: "01", icon: "🚀" },
                                { title: t.phase2Title, desc: t.phase2Desc, phase: "02", icon: "💎" },
                                { title: t.phase3Title, desc: t.phase3Desc, phase: "03", icon: "🌐" },
                                { title: t.phase4Title, desc: t.phase4Desc, phase: "04", icon: "💰" }
                            ] as phase}
                                <div class="group relative flex gap-8 p-8 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-[#2DD4BF]/30 transition-all duration-500">
                                    <div class="flex-shrink-0 w-16 h-16 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
                                        {phase.icon}
                                    </div>
                                    <div>
                                        <div class="flex items-center gap-4 mb-2">
                                            <span class="text-[#2DD4BF] font-black tracking-widest text-xs uppercase opacity-40">Phase {phase.phase}</span>
                                            <div class="h-px flex-grow bg-white/5"></div>
                                        </div>
                                        <h3 class="text-2xl font-black text-white mb-3 tracking-tight uppercase">{phase.title}</h3>
                                        <p class="text-teal-100/40 leading-relaxed text-lg group-hover:text-teal-100/60 transition-colors">
                                            {phase.desc}
                                        </p>
                                    </div>
                                </div>
                            {/each}
                        </div>

                        <div class="mt-16 flex items-center gap-8 p-8 rounded-[32px] bg-gradient-to-r from-[#2DD4BF]/10 to-transparent border border-[#2DD4BF]/20">
                            <div class="flex-grow">
                                <h4 class="text-xl font-bold text-white mb-2">{t.contactUs}</h4>
                                <p class="text-teal-100/40 text-sm">piruytko.invest@tonewave.ai</p>
                            </div>
                            <button class="px-8 py-4 bg-[#2DD4BF] text-[#050A08] font-black text-sm tracking-widest uppercase rounded-2xl hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all active:scale-95">
                                Join Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</main>

<style>
    .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(45, 212, 191, 0.1);
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(45, 212, 191, 0.3);
    }
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
