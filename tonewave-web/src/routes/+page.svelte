<script lang="ts">
    import {
        simulateStreamingResponse,
        type TransformMode,
    } from "$lib/simulation";
    import { fade, slide } from "svelte/transition";

    type Language = "RU" | "EN" | "JP";
    let currentLang = $state<Language>("RU");

    const t = $derived(
        {
            RU: {
                appTitle: "ToneWave AI",
                appDesc: "AI-редактор коммуникаций",
                heroTitle: "ToneWave",
                heroSub: "Conceptual Demo",
                heroBody:
                    "Превратите любые искренние эмоции в дипломатичный и конструктивный диалог. Решайте конфликты профессионально.",
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
                emptyResult:
                    "Здесь появится исправленный текст после запуска трансформации",
                roadmapBtn: "Инвестиционный план",
                roadmapTitle: "Стратегия развития ToneWave AI",
                roadmapIntro:
                    "ToneWave AI — это не просто демо, а фундамент для мощной экосистемы коммуникаций. Ниже представлен план масштабирования проекта для потенциальных инвесторов.",
                phase1Title: "Фаза 1: Продакшн-инфраструктура",
                phase1Desc:
                    "Переход от симуляции к реальным LLM (GPT-4o, Claude 3.5). Настройка отказоустойчивых серверов и оптимизация задержек (Latency).",
                phase2Title: "Фаза 2: Пользовательское ядро",
                phase2Desc:
                    "Внедрение системы авторизации, облачного хранения истории сообщений и персональных настроек стиля для каждого пользователя.",
                phase3Title: "Фаза 3: Экспансия экосистемы",
                phase3Desc:
                    "Разработка расширений для браузеров (Chrome, Edge), плагинов для Outlook/Gmail и интеграция с корпоративными мессенджерами (Slack, Discord).",
                phase4Title: "Фаза 4: Бизнес и монетизация",
                phase4Desc:
                    "Запуск модели подписок (Freemium), предоставление API для корпоративных клиентов и возможность White-label лицензирования.",
                contactUs: "Связаться для инвестиций",
                phaseLabel: "Фаза",
                joinBtn: "Присоединиться",
                joinCopied: "Почта скопирована!",
                sendTo: "Отправить в",
                selectPlatform: "Выберите платформу",
                selectTarget: "Куда отправить?",
                workspace: "Рабочее пространство",
                server: "Сервер",
                channel: "Канал",
                chat: "Чат",
                sendBtn: "ОТПРАВИТЬ",
                sending: "Отправка...",
                sent: "Сообщение отправлено!",
                backToPlatforms: "К выбору платформы",
                revenueTitle: "Прогноз выручки (ARR)",
                pocLabel: "Текущий POC",
                b2cLabel: "B2C Запуск",
                b2bLabel: "Enterprise B2B",
                customLabel: "Custom",
                customSetupTitle: "Настройка подключения",
                webhookUrl: "Webhook URL",
                platformName: "Название сервиса",
                authToken: "Токен (Optional)",
                testConnection: "ПРОВЕРИТЬ СВЯЗЬ",
                connectionEstablished: "Связь установлена!",
                connecting: "Синхронизация...",
                customPlaceholder: "Моя CRM/Чат",
                disconnect: "ОТКЛЮЧИТЬ",
            },
            EN: {
                appTitle: "ToneWave AI",
                appDesc: "AI Communication Editor",
                heroTitle: "ToneWave",
                heroSub: "Conceptual Demo",
                heroBody:
                    "Turn any sincere emotions into diplomatic and constructive dialogue. Resolve conflicts professionally.",
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
                emptyResult:
                    "Corrected text will appear here after transformation",
                roadmapBtn: "Investment Roadmap",
                roadmapTitle: "ToneWave AI Growth Strategy",
                roadmapIntro:
                    "ToneWave AI is not just a demo, but the foundation for a powerful communication ecosystem. Below is the scaling plan for potential investors.",
                phase1Title: "Phase 1: Production Infrastructure",
                phase1Desc:
                    "Transition from simulation to real LLMs (GPT-4o, Claude 3.5). Setting up high-availability servers and latency optimization.",
                phase2Title: "Phase 2: User Core",
                phase2Desc:
                    "Implementing authentication, cloud-based message history storage, and personalized style settings for every user.",
                phase3Title: "Phase 3: Ecosystem Expansion",
                phase3Desc:
                    "Developing browser extensions (Chrome, Edge), plugins for Outlook/Gmail, and integrations with corporate messengers (Slack, Discord).",
                phase4Title: "Phase 4: Business & Revenue",
                phase4Desc:
                    "Launching subscription models (Freemium), providing API access for corporate clients, and White-label licensing options.",
                contactUs: "Contact for Investment",
                phaseLabel: "Phase",
                joinBtn: "Join Now",
                joinCopied: "Email Copied!",
                sendTo: "Send to",
                selectPlatform: "Select platform",
                selectTarget: "Where to send?",
                workspace: "Workspace",
                server: "Server",
                channel: "Channel",
                chat: "Chat",
                sendBtn: "SEND",
                sending: "Sending...",
                sent: "Message sent!",
                backToPlatforms: "Back to platforms",
                revenueTitle: "Revenue Forecast (ARR)",
                pocLabel: "Current POC",
                b2cLabel: "B2C Launch",
                b2bLabel: "Enterprise B2B",
                customLabel: "Custom",
                customSetupTitle: "Setup Integration",
                webhookUrl: "Webhook URL",
                platformName: "Service Name",
                authToken: "Auth Token (Optional)",
                testConnection: "TEST CONNECTION",
                connectionEstablished: "Link Established!",
                connecting: "Connecting...",
                customPlaceholder: "My CRM/Chat",
                disconnect: "DISCONNECT",
            },
            JP: {
                appTitle: "ToneWave AI",
                appDesc: "AI コミュニケーションエディタ",
                heroTitle: "ToneWave",
                heroSub: "Conceptual Demo",
                heroBody:
                    "どんな感情も、外交的で建設的な対話に変えましょう。プロフェッショナルに紛争を解決します。",
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
                roadmapBtn: "投資ロードマップ",
                roadmapTitle: "ToneWave AI 成長戦略",
                roadmapIntro:
                    "ToneWave AIは単なるデモではなく、強力なコミュニケーションエコシステムの基盤です。以下は潜在的な投資家向けののスケーリングプランです。",
                phase1Title: "フェーズ1: 本番インフラストラクチャ",
                phase1Desc:
                    "シミュレーションからリアルなLLM（GPT-4o、Claude 3.5）への移行。高可用性サーバーの構築と遅延の最適化。",
                phase2Title: "フェーズ2: ユーザーコア",
                phase2Desc:
                    "認証システム、クラウドベースのメッセージ履歴保存、ユーザーごとのパーソナライズされたスタイル設定の実装。",
                phase3Title: "フェーズ3: エコシステムの拡大",
                phase3Desc:
                    "ブラウザ拡張機能（Chrome, Edge）、Outlook/Gmail用プラグインの開発、およびSlack/Discordとの連携。",
                phase4Title: "フェーズ4: ビジネスと収益",
                phase4Desc:
                    "サブスクリプションモデル（Freemium）の開始、企業向けAPIの提供、およびホワイトラベルライセンスのオプション。",
                contactUs: "投資に関するお問い合わせ",
                phaseLabel: "フェーズ",
                joinBtn: "参加する",
                joinCopied: "メールをコピーしました！",
                sendTo: "送信先",
                selectPlatform: "プラットフォームを選択",
                selectTarget: "どこに送信しますか？",
                workspace: "ワークスペース",
                server: "サーバー",
                channel: "チャンネル",
                chat: "チャット",
                sendBtn: "送信",
                sending: "送信中...",
                sent: "メッセージが送信されました！",
                backToPlatforms: "プラットフォーム選択に戻る",
                revenueTitle: "収益予測 (ARR)",
                pocLabel: "現在のPOC",
                b2cLabel: "B2Cローンチ",
                b2bLabel: "エンタープライズB2B",
                customLabel: "Custom",
                customSetupTitle: "カスタム統合設定",
                webhookUrl: "Webhook URL",
                platformName: "サービス名",
                authToken: "認証トークン (任意)",
                testConnection: "接続テスト",
                connectionEstablished: "接続完了！",
                connecting: "接続中...",
                customPlaceholder: "マイCRM/チャット",
                disconnect: "連携解除",
            },
        }[currentLang],
    );

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

    const allTemplates: Record<
        Language,
        { title: string; text: string; icon: string; desc: string }[]
    > = {
        RU: [
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
                text: "ПОЧЕМУ ЭФФЕКТИВНОСТЬ КОМАНДЫ НИЗКАЯ?!",
                icon: "😤",
                desc: "Прямая претензия",
            },
            {
                title: "Сарказм",
                text: "Опять переделывать? Вы вообще умеете читать ТЗ?",
                icon: "😒",
                desc: "Недовольство качеством",
            },
            {
                title: "Ультиматум",
                text: "Если к завтра к утру не будет готово, я подниму вопрос о компетенции.",
                icon: "😠",
                desc: "Жесткое требование",
            },
            {
                title: "Раздражение",
                text: "Давайте уже работать, а не болтать.",
                icon: "🙄",
                desc: "Усталость от созвонов",
            },
        ],
        EN: [
            {
                title: "Angry Shout",
                text: "WHY IS NOTHING READY YET?",
                icon: "🤬",
                desc: "Emotional request",
            },
            {
                title: "Panic",
                text: "THE CLIENT IS ANGRY WHY IS PRODUCTION DOWN!?",
                icon: "🚨",
                desc: "Outage report",
            },
            {
                title: "Aggression",
                text: "WHY IS TEAM EFFICIENCY SO LOW?!",
                icon: "😤",
                desc: "Direct complaint",
            },
            {
                title: "Sarcasm",
                text: "Redoing it again? Can you even read the specs?",
                icon: "😒",
                desc: "Quality dissatisfaction",
            },
            {
                title: "Ultimatum",
                text: "If this isn't fixed by morning, I'll report your competence.",
                icon: "😠",
                desc: "Hard deadline",
            },
            {
                title: "Irritation",
                text: "Let's just work and stop talking.",
                icon: "🙄",
                desc: "Meeting fatigue",
            },
        ],
        JP: [
            {
                title: "怒りの叫び",
                text: "なぜまだ何も終わっていないのですか？",
                icon: "🤬",
                desc: "感情的な要求",
            },
            {
                title: "パニック",
                text: "顧客が怒っています！なぜ本番環境が落ちているのですか！？",
                icon: "🚨",
                desc: "障害報告",
            },
            {
                title: "攻撃性",
                text: "なぜチームの効率がこんなに低いのですか！？",
                icon: "😤",
                desc: "直接的な不満",
            },
            {
                title: "皮肉",
                text: "またやり直しですか？仕様書を読めますか？",
                icon: "😒",
                desc: "品質への不満",
            },
            {
                title: "最後通牒",
                text: "明日の朝までに修正されない場合、進退を問います。",
                icon: "😠",
                desc: "厳しい要求",
            },
            {
                title: "苛立ち",
                text: "おしゃべりはやめて、仕事をしましょう。",
                icon: "🙄",
                desc: "会議疲れ",
            },
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
    let joinEmailCopied = $state(false);

    // Messenger Simulation State
    let selectedPlatform = $state<string | null>(null);
    let selectedTarget1 = $state<string | null>(null); // Workspace/Server
    let selectedTarget2 = $state<string | null>(null); // Channel/Chat
    let isSendingMessage = $state(false);
    let messageSent = $state(false);

    // Custom Integration States
    let customPlatformConnected = $state(false);
    let customPlatformName = $state("");
    let customPlatformEndpoint = $state("");
    let isTestingConnection = $state(false);
    let connectionTestSuccess = $state(false);

    const platformData: Record<string, { 
        targets1: string[], 
        targets2: string[],
        label1: keyof typeof t,
        label2: keyof typeof t
    }> = {
        slack: { 
            targets1: ["ToneWave Dev", "Internal AI", "Partners"], 
            targets2: ["#general", "#feedback", "#deployments"],
            label1: "workspace",
            label2: "channel"
        },
        telegram: { 
            targets1: ["Personal", "Work Groups", "Saved Messages"], 
            targets2: ["AI Team", "Project Manager", "Main Bot"],
            label1: "chat",
            label2: "chat"
        },
        discord: { 
            targets1: ["Wave Community", "Dev Lab", "Beta Testers"], 
            targets2: ["#main", "#support", "#ai-logs"],
            label1: "server",
            label2: "channel"
        },
        teams: { 
            targets1: ["Global Operations", "AI Engineering"], 
            targets2: ["General", "Daily Standup", "Critical Alerts"],
            label1: "workspace",
            label2: "channel"
        },
        custom: {
            targets1: ["Default Endpoint", "Dev Proxy", "Debug Hook"],
            targets2: ["Production", "Staging", "Local"],
            label1: "workspace",
            label2: "channel"
        }
    };

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

    async function handleJoinCopy() {
        try {
            await navigator.clipboard.writeText("maximpiryutko@gmail.com");
            joinEmailCopied = true;
            setTimeout(() => (joinEmailCopied = false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    }

    async function handleSendMessage() {
        if (!selectedPlatform || !selectedTarget1 || !selectedTarget2 || isSendingMessage) return;
        
        isSendingMessage = true;
        await new Promise(resolve => setTimeout(resolve, 1500));
        isSendingMessage = false;
        messageSent = true;
        setTimeout(() => {
            messageSent = false;
            selectedPlatform = null;
            selectedTarget1 = "";
            selectedTarget2 = "";
        }, 3000);
    }

    async function handleTestConnection() {
        if (!customPlatformEndpoint) return;
        isTestingConnection = true;
        connectionTestSuccess = false;
        await new Promise(r => setTimeout(r, 2000));
        isTestingConnection = false;
        connectionTestSuccess = true;
    }

    function handleConnectCustom() {
        if (!connectionTestSuccess) return;
        customPlatformConnected = true;
    }

    function handleDisconnectCustom() {
        customPlatformConnected = false;
        customPlatformName = "";
        customPlatformEndpoint = "";
        connectionTestSuccess = false;
        selectedPlatform = null;
    }

    async function handleTransform() {
        if (!rawText.trim() || isProcessing) return;

        isProcessing = true;
        resultText = "";

        try {
            const stream = simulateStreamingResponse(
                rawText,
                selectedMode,
                currentLang,
            );
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
        <div
            class="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-md"
        >
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

        <!-- Investment Badge (Subtle Link) -->
        <button
            onclick={() => (isRoadmapOpen = true)}
            class="group flex items-center gap-2 px-3 py-1.5 text-[11px] font-black tracking-[0.2em] text-white/30 hover:text-[#2DD4BF]/60 transition-all uppercase"
        >
            <span class="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] opacity-40 group-hover:opacity-100 group-hover:shadow-[0_0_8px_#2DD4BF] transition-all"></span>
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
                        <div class="border border-white/10 rounded-[20px] p-4">
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
                                            >{mode.labels[currentLang]
                                                .title}</span
                                        >
                                        <span
                                            class="text-[12px] text-teal-100/30 uppercase tracking-tighter"
                                            >{mode.labels[currentLang]
                                                .desc}</span
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
                                class="flex-grow min-h-0 rounded-[24px] p-6 bg-black/40 font-medium text-teal-50/90 leading-relaxed overflow-y-auto border border-white/5 relative z-10 text-[18px]"
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
                                <div class="mt-6 h-[280px] flex flex-col justify-end" in:fade>
                                    {#if messageSent}
                                        <div class="h-full flex items-center justify-center">
                                            <div class="w-full py-8 rounded-[32px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black uppercase tracking-[0.2em] flex flex-col items-center justify-center gap-4 transition-all">
                                                <div class="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                    <svg class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span class="text-xs">{t.sent}</span>
                                            </div>
                                        </div>
                                    {:else if !selectedPlatform}
                                        <!-- Platform Selection -->
                                        <div class="space-y-6">
                                            <p class="text-[9px] font-black text-white/50 uppercase tracking-[0.3em] text-center">
                                                {t.sendTo}
                                            </p>
                                            <div class="grid grid-cols-3 gap-3 max-w-[360px] mx-auto">
                                                {#each ['slack', 'telegram', 'teams', 'discord', 'custom'] as platform}
                                                    <button
                                                        onclick={() => {
                                                            selectedPlatform = platform;
                                                            if (platform !== 'custom' || customPlatformConnected) {
                                                                selectedTarget1 = platformData[platform].targets1[0];
                                                                selectedTarget2 = platformData[platform].targets2[0];
                                                            }
                                                        }}
                                                        class="h-20 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center gap-2 hover:bg-[#2DD4BF]/10 hover:border-[#2DD4BF]/30 transition-all group {platform === 'custom' && !customPlatformConnected ? 'border-dashed' : ''}"
                                                        title={platform}
                                                    >
                                                        {#if platform === 'slack'}<svg class="w-7 h-7 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor"><path d="M6 15a2 2 0 1 0-2 2h2v-2zm1.5 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-1.5a2 2 0 1 0-2-2 2 2 0 0 0 2 2zM9 15V9a2 2 0 1 0-2 2H9v4a2 2 0 1 0 4 0v-2a2 2 0 1 0-2-2v4zm1.5-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1.5a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm2.5-1.5v6a2 2 0 1 0 2-2h-2v-4a2 2 0 1 0-4 0v2a2 2 0 1 0 2 2v-4zm1.5 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-1.5a2 2 0 1 0-2-2 2 2 0 0 0 2 2zM15 9h6a2 2 0 1 0-2-2v2a2 2 0 1 0 0 4h-2a2 2 0 1 0-2-2V9z"/></svg>{/if}
                                                        {#if platform === 'telegram'}<svg class="w-7 h-7 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.52-.46-.01-1.33-.26-1.98-.48-.8-.27-1.43-.42-1.37-.89.03-.25.38-.51 1.03-.78 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.88 5.17-1.89.11 0 .37.03.54.17.14.11.18.26.2.38z"/></svg>{/if}
                                                        {#if platform === 'teams'}<svg class="w-7 h-7 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor"><path d="M11 7h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2zm-7 0h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2zm14 0h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2zM4 14h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2zm7 0h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2zm7 0h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2z"/></svg>{/if}
                                                        {#if platform === 'discord'}<svg class="w-7 h-7 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor"><path d="M19.27 4.58C17.81 3.91 16.24 3.42 14.59 3.15l-.32.73c-1.82-.27-3.66-.27-5.46 0l-.32-.73c-1.65.27-3.22.76-4.68 1.43-2.93 4.38-3.73 8.66-2.58 12.86 1.95 1.43 3.8 2.3 5.58 2.85l1.31-1.6c-1.18-.35-2.31-.83-3.37-1.44l.28-.2c1.1.56 2.27 1.01 3.49 1.34 1.25.34 2.54.51 3.81.51 1.27 0 2.56-.17 3.81-.51 1.22-.33 2.39-.78 3.49-1.34l.28.2c-1.06.61-2.19 1.09-3.37 1.44l1.31 1.6c1.78-.55 3.63-1.42 5.58-2.85 1.41-5.11.23-9.39-2.58-12.86zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12z"/></svg>{/if}
                                                        {#if platform === 'custom'}
                                                            {#if customPlatformConnected}
                                                                <div class="relative">
                                                                    <svg class="w-7 h-7 text-[#2DD4BF]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                                                                    <div class="absolute -top-1 -right-1 w-2 h-2 bg-[#2DD4BF] rounded-full animate-ping"></div>
                                                                </div>
                                                            {:else}
                                                                <svg class="w-7 h-7 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
                                                            {/if}
                                                        {/if}
                                                        <span class="text-[8px] font-black uppercase tracking-widest text-white/60 group-hover:text-[#2DD4BF] transition-colors">
                                                            {platform === 'custom' && customPlatformConnected ? (customPlatformName || 'Custom App') : (platform === 'custom' ? t.customLabel : platform)}
                                                        </span>
                                                    </button>
                                                {/each}
                                            </div>
                                            <!-- Standard Copy Utility -->
                                            <button 
                                                onclick={handleCopy}
                                                class="w-full flex items-center justify-center gap-2 text-[9px] text-white/40 hover:text-white/80 transition-colors py-2 font-black uppercase tracking-widest border-t border-white/[0.05] mt-2"
                                            >
                                                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                                {copied ? t.copied : t.copyBtn}
                                            </button>
                                        </div>
                                    {:else if selectedPlatform === 'custom' && !customPlatformConnected}
                                        <!-- Custom Setup Form (Step 2.1) -->
                                        <div class="p-6 rounded-[32px] bg-white/[0.03] border border-white/10 flex flex-col gap-5" in:slide>
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center gap-3">
                                                    <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                                                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
                                                    </div>
                                                    <span class="text-xs font-black uppercase tracking-widest text-white/60">{t.customSetupTitle}</span>
                                                </div>
                                                <button 
                                                    onclick={() => selectedPlatform = null}
                                                    class="text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white/40 transition-colors"
                                                >
                                                    {t.backBtn}
                                                </button>
                                            </div>

                                            <div class="space-y-4">
                                                <div class="space-y-2">
                                                    <label for="customName" class="text-[9px] font-black uppercase tracking-widest text-white/20 px-1">{t.platformName}</label>
                                                    <input 
                                                        id="customName"
                                                        type="text" 
                                                        bind:value={customPlatformName}
                                                        placeholder={t.customPlaceholder}
                                                        class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#2DD4BF]/50"
                                                    />
                                                </div>
                                                <div class="space-y-2">
                                                    <label for="customEndpoint" class="text-[9px] font-black uppercase tracking-widest text-white/20 px-1">{t.webhookUrl}</label>
                                                    <input 
                                                        id="customEndpoint"
                                                        type="text" 
                                                        bind:value={customPlatformEndpoint}
                                                        placeholder="https://api.yourdomain.com/hook"
                                                        class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#2DD4BF]/50"
                                                    />
                                                </div>
                                            </div>

                                            <div class="flex gap-3">
                                                <button
                                                    onclick={handleTestConnection}
                                                    disabled={isTestingConnection || !customPlatformEndpoint}
                                                    class="flex-1 py-3 bg-white/5 border border-white/10 text-white/60 font-black text-[10px] tracking-widest rounded-xl hover:bg-white/10 transition-all disabled:opacity-30"
                                                >
                                                    {#if isTestingConnection}
                                                        <span class="animate-pulse">{t.connecting}</span>
                                                    {:else if connectionTestSuccess}
                                                        <span class="text-emerald-400">{t.connectionEstablished}</span>
                                                    {:else}
                                                        {t.testConnection}
                                                    {/if}
                                                </button>
                                                {#if connectionTestSuccess}
                                                    <button
                                                        onclick={() => {
                                                            handleConnectCustom();
                                                            selectedTarget1 = platformData.custom.targets1[0];
                                                            selectedTarget2 = platformData.custom.targets2[0];
                                                        }}
                                                        class="px-6 py-3 bg-[#2DD4BF] text-[#050A08] font-black text-[10px] tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                                                        in:fade
                                                    >
                                                        {t.joinBtn}
                                                    </button>
                                                {/if}
                                            </div>
                                        </div>
                                    {:else}
                                        <!-- Target Selection (Step 2) -->
                                        <div class="p-6 rounded-[32px] bg-white/[0.03] border border-white/10 flex flex-col gap-5" in:slide>
                                            <div class="flex items-center justify-between">
                                                <div class="flex items-center gap-3">
                                                    <div class="w-8 h-8 rounded-full bg-[#2DD4BF]/10 flex items-center justify-center text-[#2DD4BF]">
                                                        {#if selectedPlatform === 'slack'}<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6 15a2 2 0 1 0-2 2h2v-2zm1.5 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-1.5a2 2 0 1 0-2-2 2 2 0 0 0 2 2zM9 15V9a2 2 0 1 0-2 2H9v4a2 2 0 1 0 4 0v-2a2 2 0 1 0-2-2v4zm1.5-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1.5a2 2 0 1 0 2 2 2 2 0 0 0-2-2zm2.5-1.5v6a2 2 0 1 0 2-2h-2v-4a2 2 0 1 0-4 0v2a2 2 0 1 0 2 2v-4zm1.5 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0-1.5a2 2 0 1 0-2-2 2 2 0 0 0 2 2zM15 9h6a2 2 0 1 0-2-2v2a2 2 0 1 0 0 4h-2a2 2 0 1 0-2-2V9z"/></svg>{/if}
                                                        {#if selectedPlatform === 'telegram'}<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.53-1.39.52-.46-.01-1.33-.26-1.98-.48-.8-.27-1.43-.42-1.37-.89.03-.25.38-.51 1.03-.78 4.04-1.76 6.74-2.92 8.09-3.48 3.85-1.6 4.64-1.88 5.17-1.89.11 0 .37.03.54.17.14.11.18.26.2.38z"/></svg>{/if}
                                                        {#if selectedPlatform === 'discord'}<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.27 4.58C17.81 3.91 16.24 3.42 14.59 3.15l-.32.73c-1.82-.27-3.66-.27-5.46 0l-.32-.73c-1.65.27-3.22.76-4.68 1.43-2.93 4.38-3.73 8.66-2.58 12.86 1.95 1.43 3.8 2.3 5.58 2.85l1.31-1.6c-1.18-.35-2.31-.83-3.37-1.44l.28-.2c1.1.56 2.27 1.01 3.49 1.34 1.25.34 2.54.51 3.81.51 1.27 0 2.56-.17 3.81-.51 1.22-.33 2.39-.78 3.49-1.34l.28.2c-1.06.61-2.19 1.09-3.37 1.44l1.31 1.6c1.78-.55 3.63-1.42 5.58-2.85 1.41-5.11.23-9.39-2.58-12.86zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12 0 1.17-.84 2.12-1.89 2.12z"/></svg>{/if}
                                                        {#if selectedPlatform === 'teams'}<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11 7h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2zm-7 0h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2zm14 0h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2zM4 14h2c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2zm17 0h-2c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2z"/></svg>{/if}
                                                        {#if selectedPlatform === 'custom'}<svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>{/if}
                                                    </div>
                                                    <span class="text-xs font-black uppercase tracking-widest text-white/60">
                                                        {selectedPlatform === 'custom' ? (customPlatformName || 'Custom App') : selectedPlatform}
                                                    </span>
                                                </div>
                                                <div class="flex items-center gap-4">
                                                    {#if selectedPlatform === 'custom'}
                                                        <button 
                                                            onclick={handleDisconnectCustom}
                                                            class="text-[9px] font-black uppercase tracking-widest text-red-400/40 hover:text-red-400 transition-colors"
                                                        >
                                                            {t.disconnect}
                                                        </button>
                                                    {/if}
                                                    <button 
                                                        onclick={() => selectedPlatform = null}
                                                        class="text-[9px] font-black uppercase tracking-widest text-[#2DD4BF]/40 hover:text-[#2DD4BF] transition-colors"
                                                    >
                                                        {t.backToPlatforms}
                                                    </button>
                                                </div>
                                            </div>

                                            <div class="grid grid-cols-2 gap-4">
                                                <div class="space-y-2">
                                                    <label for="target1" class="text-[9px] font-black uppercase tracking-widest text-white/20 px-1">{t[platformData[selectedPlatform].label1]}</label>
                                                    <select 
                                                        id="target1"
                                                        bind:value={selectedTarget1}
                                                        class="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#2DD4BF]/50 appearance-none"
                                                    >
                                                        {#each platformData[selectedPlatform].targets1 as target}
                                                            <option value={target}>{target}</option>
                                                        {/each}
                                                    </select>
                                                </div>
                                                <div class="space-y-2">
                                                    <label for="target2" class="text-[9px] font-black uppercase tracking-widest text-white/20 px-1">{t[platformData[selectedPlatform].label2]}</label>
                                                    <select 
                                                        id="target2"
                                                        bind:value={selectedTarget2}
                                                        class="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#2DD4BF]/50 appearance-none"
                                                    >
                                                        {#each platformData[selectedPlatform].targets2 as target}
                                                            <option value={target}>{target}</option>
                                                        {/each}
                                                    </select>
                                                </div>
                                            </div>

                                            <button
                                                onclick={handleSendMessage}
                                                disabled={isSendingMessage}
                                                class="w-full py-4 bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] text-[#050A08] font-black text-[11px] tracking-[0.2em] rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
                                            >
                                                {#if isSendingMessage}
                                                    <div class="flex items-center justify-center gap-2">
                                                        <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                        {t.sending}
                                                    </div>
                                                {:else}
                                                    {t.sendBtn}
                                                {/if}
                                            </button>
                                        </div>
                                    {/if}
                                </div>
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
                            {t.roadmapBtn}
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
                                            <span class="text-[#2DD4BF] font-black tracking-widest text-xs uppercase opacity-40">{t.phaseLabel} {phase.phase}</span>
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

                        <!-- Infographic Section -->
                        <div class="mt-16 p-10 rounded-[48px] bg-white/[0.02] border border-white/5 relative overflow-hidden group/info">
                            <!-- Background Accent -->
                            <div class="absolute inset-0 bg-gradient-to-br from-[#2DD4BF]/5 to-transparent opacity-0 group-hover/info:opacity-100 transition-opacity duration-1000"></div>

                            <h4 class="relative z-10 text-[10px] font-black uppercase tracking-[0.4em] text-[#2DD4BF]/60 mb-14 text-center">{t.revenueTitle}</h4>
                            
                            <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4">
                                <!-- Tier 1: POC -->
                                <div class="flex flex-col items-center gap-6 flex-1 w-full">
                                    <div class="w-16 h-16 rounded-[24px] bg-white/[0.03] border border-white/10 flex items-center justify-center text-2xl group-hover:bg-white/5 transition-all shadow-xl">🌱</div>
                                    <div class="text-center">
                                        <p class="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">{t.pocLabel}</p>
                                        <div class="px-4 py-1 rounded-full bg-white/5 border border-white/5">
                                            <p class="text-xl font-black text-white/90">$0</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Connector 1 -->
                                <div class="hidden md:block flex-shrink-0 w-8">
                                    <svg class="w-full text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4" /></svg>
                                </div>

                                <!-- Tier 2: B2C (Featured) -->
                                <div class="flex flex-col items-center gap-8 flex-1 w-full px-4">
                                    <div class="relative">
                                        <div class="absolute inset-0 bg-[#2DD4BF]/20 blur-2xl rounded-full animate-pulse"></div>
                                        <div class="relative w-24 h-24 rounded-[32px] bg-gradient-to-br from-[#2DD4BF]/20 to-[#0D9488]/10 border border-[#2DD4BF]/40 flex items-center justify-center text-4xl shadow-[0_0_50px_rgba(45,212,191,0.2)] hover:scale-105 transition-transform duration-500 cursor-default">
                                            🚀
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <p class="text-[11px] font-black uppercase tracking-[0.2em] text-[#2DD4BF] mb-2">{t.b2cLabel}</p>
                                        <div class="px-6 py-2 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 shadow-inner">
                                            <p class="text-3xl font-black text-white">$850K</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Connector 2 -->
                                <div class="hidden md:block flex-shrink-0 w-8">
                                    <svg class="w-full text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4" /></svg>
                                </div>

                                <!-- Tier 3: B2B -->
                                <div class="flex flex-col items-center gap-6 flex-1 w-full">
                                    <div class="w-16 h-16 rounded-[24px] bg-white/[0.03] border border-white/10 flex items-center justify-center text-2xl group-hover:bg-white/5 transition-all shadow-xl">🏢</div>
                                    <div class="text-center">
                                        <p class="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">{t.b2bLabel}</p>
                                        <div class="px-4 py-1 rounded-full bg-white/5 border border-white/5">
                                            <p class="text-xl font-black text-white/90">$6.5M</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-14 flex items-center gap-8 p-8 rounded-[32px] bg-gradient-to-r from-[#2DD4BF]/10 to-transparent border border-[#2DD4BF]/20">
                            <div class="flex-grow">
                                <h4 class="text-xl font-bold text-white mb-2">{t.contactUs}</h4>
                                <p class="text-teal-100/40 text-sm">maximpiryutko@gmail.com</p>
                            </div>
                            <button 
                                onclick={handleJoinCopy}
                                class="min-w-[200px] px-8 py-4 {joinEmailCopied ? 'bg-emerald-500 text-white' : 'bg-[#2DD4BF] text-[#050A08]'} font-black text-sm tracking-widest uppercase rounded-2xl hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                {#if joinEmailCopied}
                                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {t.joinCopied}
                                {:else}
                                    {t.joinBtn}
                                {/if}
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
