export type TransformMode = 'PROFESSIONAL' | 'KIND' | 'TECHNICAL' | 'LACONIC';
export type Language = 'RU' | 'EN' | 'JP';

const RESPONSE_MAPPING: Record<Language, Record<string, Record<TransformMode, string>>> = {
    RU: {
        "почему ничего не готово?": {
            PROFESSIONAL: "Подскажите, пожалуйста, какой сейчас статус по задачам и когда мы можем ожидать завершения основных этапов?",
            KIND: "Подскажите, пожалуйста, как сейчас продвигаются дела по проекту? Очень жду новостей и готов помочь, если возникли какие-то сложности!",
            TECHNICAL: "Запрос статуса выполнения. Требуется обновление дорожной карты и уточнение ETD по открытым репозиториям.",
            LACONIC: "Когда ожидать готовность?"
        },
        "заказчик ругается почему упал продакшен!?": {
            PROFESSIONAL: "Коллеги, зафиксирована критическая ситуация на продуктовой среде. Прошу оперативно предоставить отчет о причинах сбоя и план восстановления сервисов.",
            KIND: "Ребята, на продакшене возникли некоторые сложности, и заказчик очень обеспокоен. Давайте вместе разберемся и всё оперативно починим!",
            TECHNICAL: "Обнаружена деградация сервисов в Production. Требуется немедленный анализ логов инстансов и запуск процедуры восстановления.",
            LACONIC: "Прод упал, нужен статус восстановления."
        },
        "почему эффективность команды низкая?!": {
            PROFESSIONAL: "Нам необходимо оптимизировать внутренние коммуникации для более оперативного решения текущих вопросов. Предлагаю пересмотреть регламенты взаимодействия.",
            KIND: "Мне кажется, наше взаимодействие станет более эффективным, если мы будем чуть оперативнее согласовывать вопросы в общих чатах. Что думаете?",
            TECHNICAL: "Выявлены задержки в процедурах межличностных коммуникаций. Рекомендуется оптимизация синхронных каналов связи для снижения TTM.",
            LACONIC: "Нужно ускорить решение вопросов в чатах."
        },
        "опять переделывать? вы вообще умеете читать тз?": {
            PROFESSIONAL: "Кажется, возникло недопонимание исходных требований. Давайте еще раз сверимся с ТЗ, чтобы исключить необходимость повторных правок.",
            KIND: "Похоже, мы немного разошлись в видении задачи. Давайте вместе пройдемся по ТЗ, чтобы следующая итерация была идеальной!",
            TECHNICAL: "Несоответствие реализации спецификации (RS). Требуется повторный анализ требований и корректировка логики модулей.",
            LACONIC: "Требуется сверка с техзаданием."
        },
        "если к завтра к утру не будет готово, я подниму вопрос о компетенции.": {
            PROFESSIONAL: "Данная ошибка является критической и требует немедленного устранения. Прошу приоритизировать эту задачу, так как задержка несет репутационные риски.",
            KIND: "Ситуация с этим багом очень серьезная, и нам очень нужно исправить его к утру. Я верю в твой профессионализм и готов помочь всем необходимым!",
            TECHNICAL: "Критический дефект (P0). Срок устранения: до 09:00 следующего рабочего дня. Риск эскалации при превышении лимита времени.",
            LACONIC: "Критический баг, исправить до утра."
        },
        "давайте уже работать, а не болтать.": {
            PROFESSIONAL: "Предлагаю оптимизировать длительность наших встреч и сфокусироваться исключительно на принятии решений по пунктам повестки.",
            KIND: "Давайте постараемся сделать наши созвоны более быстрыми и продуктивными, чтобы у всех осталось больше времени на саму работу!",
            TECHNICAL: "Высокие накладные расходы на коммуникацию. Рекомендуется переход к асинхронному формату обсуждения для повышения КПД.",
            LACONIC: "Нужно сократить время созвонов."
        }
    },
    EN: {
        "why is nothing ready yet?": {
            PROFESSIONAL: "Could you please provide a status update on the current tasks and let us know when we can expect the main phases to be completed?",
            KIND: "Could you let me know how things are going with the project? I'm looking forward to updates and am here to help if you've run into any difficulties!",
            TECHNICAL: "Execution status request. Roadmap update and ETD clarification for open repositories required.",
            LACONIC: "When can we expect it to be ready?"
        },
        "the client is angry why is production down!?": {
            PROFESSIONAL: "Team, a critical situation has been identified in the production environment. Please provide a root cause analysis and a service recovery plan immediately.",
            KIND: "Hey everyone, some issues have come up on production, and the client is quite concerned. Let's work together to fix this as quickly as possible!",
            TECHNICAL: "Service degradation detected in Production. Immediate log analysis and instance recovery procedures required.",
            LACONIC: "Production is down, recovery status needed."
        },
        "why is team efficiency so low?!": {
            PROFESSIONAL: "We need to optimize our internal communications to resolve current issues more promptly. I suggest reviewing our interaction protocols.",
            KIND: "I think our collaboration would be more effective if we could align on issues in the shared channels a bit faster. What do you think?",
            TECHNICAL: "Delays identified in interpersonal communication procedures. Optimization of synchronous communication channels recommended to reduce TTM.",
            LACONIC: "Let's speed up issue resolution in chats."
        },
        "redoing it again? can you even read the specs?": {
            PROFESSIONAL: "It seems there was a misunderstanding of the initial requirements. Let's review the specs again to avoid further revisions.",
            KIND: "It looks like we're slightly misaligned on the task vision. Let's go through the specs together so the next iteration is perfect!",
            TECHNICAL: "Implementation misalignment with Specification (RS). Requirement re-analysis and module logic adjustments required.",
            LACONIC: "Alignment with specifications required."
        },
        "if this isn't fixed by morning, i'll report your competence.": {
            PROFESSIONAL: "This error is critical and requires immediate attention. Please prioritize this task, as any delay carries reputational risks.",
            KIND: "The situation with this bug is very serious, and we really need it fixed by morning. I believe in your professionalism and am here to help in any way!",
            TECHNICAL: "Critical defect (P0). Resolution deadline: 09:00 next business day. Escalation risk if time limit is exceeded.",
            LACONIC: "Critical bug, fix by morning."
        },
        "let's just work and stop talking.": {
            PROFESSIONAL: "I suggest optimizing the duration of our meetings and focusing solely on decision-making based on the agenda items.",
            KIND: "Let's try to make our calls faster and more productive, so everyone has more time for actual work!",
            TECHNICAL: "High communication overhead detected. Transition to asynchronous discussion format recommended for improved efficiency.",
            LACONIC: "Let's reduce meeting time."
        }
    },
    JP: {
        "なぜまだ何も終わっていないのですか？": {
            PROFESSIONAL: "現在のタスクの進捗状況を教えていただけますか？また、主要なフェーズがいつ完了する予定かについても教えてください。",
            KIND: "プロジェクトの進捗はいかがでしょうか？アップデートを楽しみにしています。何か困難があれば、いつでもサポートしますよ！",
            TECHNICAL: "実行ステータスの要求。ロードマップの更新と、オープンリポジトリのETDの明確化が必要です。",
            LACONIC: "いつ完了予定ですか？"
        },
        "顧客が怒っています！なぜ本番環境が落ちているのですか！？": {
            PROFESSIONAL: "チームの皆さん、本番環境で重大な問題が発生しました。至急、原因分析とサービス復旧計画を提出してください。",
            KIND: "皆さん、本番環境でいくつか問題が発生しており、お客様が非常に心配されています。協力して早急に解決しましょう！",
            TECHNICAL: "本番環境でのサービス低下を検出。即時のログ分析とインスタンス復旧手順が必要です。",
            LACONIC: "本番環境ダウン。復旧状況を教えてください。"
        },
        "なぜチームの効率がこんなに低いのですか！？": {
            PROFESSIONAL: "現在の問題をより迅速に解決するために、内部コミュニケーションを最適化する必要があります。やり取りのプロトコルを見直しましょう。",
            KIND: "共有チャンネルでもう少し早く連携できれば、コラボレーションがより効果的になると思います。どう思われますか？",
            TECHNICAL: "対人コミュニケーション手順の遅延を確認。TTM短縮のため、同期型コミュニケーションチャネルの最適化を推奨します。",
            LACONIC: "チャットでの問題解決を迅速化しましょう。"
        },
        "またやり直しですか？仕様書を読めますか？": {
            PROFESSIONAL: "当初の要件に誤解があったようです。修正を避けるため、もう一度仕様書を確認しましょう。",
            KIND: "タスクのビジョンに少しズレがあるようです。次は完璧に仕上げるために、一緒に仕様書を確認しましょう！",
            TECHNICAL: "仕様書（RS）と実装の不一致。要件の再分析とモジュールロジックの調整が必要です。",
            LACONIC: "仕様書との整合性確認が必要です。"
        },
        "明日の朝までに修正されない場合、進退を問います。": {
            PROFESSIONAL: "このエラーは非常に重大であり、即時の対応が必要です。遅延はレピュテーションリスクを伴うため、このタスクを最優先してください。",
            KIND: "このバグの状況は非常に深刻で、明日の朝までに修正する必要があります。あなたのプロフェッショナリズムを信頼しています。全力でサポートします！",
            TECHNICAL: "重大な欠陥（P0）。解決期限：翌営業日の09:00。制限時間を超えた場合、エスカレーションのリスクがあります。",
            LACONIC: "重大なバグ。明朝までに修正を。"
        },
        "おしゃべりはやめて、仕事をしましょう。": {
            PROFESSIONAL: "会議の時間を最適化し、アジェンダ項目に基づいた意思決定のみに集中することを提案します。",
            KIND: "通話をより迅速かつ生産的にして、全員が実際の業務に割ける時間を増やしましょう！",
            TECHNICAL: "高いコミュニケーションオーバーヘッドを検出。効率向上のため、非同期のディスカッション形式への移行を推奨します。",
            LACONIC: "会議時間を短縮しましょう。"
        }
    }
};

const PERSPECTIVES: Record<Language, Record<TransformMode, string[]>> = {
    RU: {
        PROFESSIONAL: [
            "Я проанализировал ситуацию и предлагаю следующее решение: ",
            "Для достижения наших целей нам необходимо сфокусироваться на ",
            "Благодарю за обратную связь. Нам стоит проработать вопрос в части ",
            "Данный аспект требует детального обсуждения. Предлагаю назначить встречу по ",
            "Ваше замечание учтено. Я подготовлю обновленный план действий по "
        ],
        KIND: [
            "Мне очень хочется, чтобы мы все чувствовали себя комфортно, поэтому ",
            "Твои идеи по-настоящему важны для общего успеха! Давай попробуем ",
            "Не беспокойся, мы со всем справимся вместе. Если хочешь, давай обсудим ",
            "Огромное спасибо за твои старания! Было бы чудесно добавить еще немного ",
            "Я всегда готов поддержать тебя и твою инициативу в части "
        ],
        TECHNICAL: [
            "Анализ входного вектора завершен. Рекомендуемое состояние: ",
            "Система требует корректировки параметров в рамках процесса ",
            "Спецификация требует апгрейда в части алгоритмической сложности процесса ",
            "Логи фиксируют необходимость оптимизации транзакций внутри ",
            "Архитектурный стек демонстрирует необходимость масштабирования в области "
        ],
        LACONIC: [
            "Принято, работаем.",
            "Требуется статус.",
            "Поддерживаю решение.",
            "Нужен пересмотр.",
            "Запуск подтверждаю."
        ]
    },
    EN: {
        PROFESSIONAL: [
            "I have analyzed the situation and suggest the following solution: ",
            "To achieve our goals, we need to focus on ",
            "Thank you for the feedback. We should work on the issue regarding ",
            "This aspect requires detailed discussion. I suggest scheduling a meeting for ",
            "Your point is noted. I will prepare an updated action plan for "
        ],
        KIND: [
            "I really want us all to feel comfortable, so ",
            "Your ideas are truly important for our shared success! Let's try ",
            "Don't worry, we'll handle everything together. If you'd like, let's discuss ",
            "Thank you so much for your efforts! It would be wonderful to add some ",
            "I'm always ready to support you and your initiative regarding "
        ],
        TECHNICAL: [
            "Input vector analysis complete. Recommended state: ",
            "System requires parameter adjustment within the process ",
            "Specification requires upgrade in terms of algorithmic complexity for ",
            "Logs confirm the need for transaction optimization within ",
            "Architectural stack demonstrates the need for scaling in the area of "
        ],
        LACONIC: [
            "Acknowledged, on it.",
            "Status required.",
            "Supporting the decision.",
            "Revision needed.",
            "Launch confirmed."
        ]
    },
    JP: {
        PROFESSIONAL: [
            "状況を分析した結果、以下の解決策を提案します：",
            "目標を達成するために、次の点に集中する必要があります：",
            "フィードバックありがとうございます。次の問題に取り組むべきです：",
            "この側面については詳細な議論が必要です。会議を予約しましょう：",
            "ご意見を承りました。次のアクションプランを準備します："
        ],
        KIND: [
            "皆が心地よく過ごせるようにしたいので、",
            "あなたのアイデアは共通の成功のために本当に重要です！試してみましょう：",
            "心配しないでください、一緒に解決しましょう。よろしければお話ししましょう：",
            "ご尽力に感謝します！もう少し追加できると素晴らしいですね：",
            "あなたのイニシアチブをいつでもサポートする準備ができています："
        ],
        TECHNICAL: [
            "入力ベクトルの分析が完了しました。推奨される状態：",
            "プロセス内のパラメータ調整が必要です：",
            "アルゴリズムの複雑さの観点から、仕様のアップグレードが必要です：",
            "ログにより、内部のトランザクション最適化の必要性が確認されました：",
            "アーキテクチャスタックは、次の領域でのスケーリングの必要性を示しています："
        ],
        LACONIC: [
            "了解しました、作業中です。",
            "ステータスが必要です。",
            "決定を支持します。",
            "改訂が必要です。",
            "起動を確認しました。"
        ]
    }
};

const SUFFIXES: Record<Language, string[]> = {
    RU: [
        " Это существенно повысит качество коммуникации.",
        " С нетерпением жду ваших комментариев по этому поводу.",
        " Надеюсь на продуктивное сотрудничество!",
        " Давайте двигаться в этом направлении.",
        " Готов детально проработать данный вопрос."
    ],
    EN: [
        " This will significantly improve the quality of communication.",
        " Looking forward to your comments on this.",
        " Looking forward to a productive collaboration!",
        " Let's move in this direction.",
        " I am ready to work through this issue in detail."
    ],
    JP: [
        " これにより、コミュニケーションの質が大幅に向上します。",
        " これに関するコメントをお待ちしております。",
        " 有意義なコラボレーションを楽しみにしています！",
        " この方向に進みましょう。",
        " この問題について詳細に取り組む準備ができています。"
    ]
};

function getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export async function* simulateStreamingResponse(text: string, mode: TransformMode, lang: Language = 'RU') {
    const lowerText = text.toLowerCase().trim();
    let baseResponse = "";

    // Check for specific mappings first in the current language
    if (RESPONSE_MAPPING[lang] && RESPONSE_MAPPING[lang][lowerText] && RESPONSE_MAPPING[lang][lowerText][mode]) {
        baseResponse = RESPONSE_MAPPING[lang][lowerText][mode];
    } else {
        baseResponse = getRandomElement(PERSPECTIVES[lang][mode]);
    }

    // In LACONIC mode or for direct mappings we don't always add suffixes
    const needsSuffix = mode !== 'LACONIC' && !(RESPONSE_MAPPING[lang] && RESPONSE_MAPPING[lang][lowerText]);
    const fullText = needsSuffix ? baseResponse + (text.length > 5 ? getRandomElement(SUFFIXES[lang]) : "") : baseResponse;
    
    // Simulate streaming by breaking text into chunks
    const words = lang === 'JP' ? fullText.split('') : fullText.split(' ');
    for (const word of words) {
        // Random delay between 30 and 100ms
        await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 70));
        yield lang === 'JP' ? word : word + ' ';
    }
}
