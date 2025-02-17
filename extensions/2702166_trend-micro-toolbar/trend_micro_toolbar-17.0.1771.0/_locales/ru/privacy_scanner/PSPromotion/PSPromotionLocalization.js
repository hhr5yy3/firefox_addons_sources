var g_oPrivacyScannerString = {
    ScanButtonText: "Проверка конфиденциальности",
    WelcomeString: {
        Head : {
            FACEBOOK:    "Обеспокоены тем, кто может видеть ваши публикации в Facebook?",
            TWITTER:     "Обеспокоены тем, кто может видеть ваши публикации в X?",
            GOOGLEPLUS:  "Обеспокоены тем, кто может видеть ваши публикации в Google+?",
            LINKEDIN:    "Обеспокоены тем, кто может видеть ваши публикации в LinkedIn?"
        },
        Content:         "Запустите сканер конфиденциальности Trend Micro и убедитесь, что видеть ваши публикации могут только те, кто должен.",
        LearnMore:       "Подробнее",
        AskLater:        "Больше не показывать это окно"
    }
};

/*
    We will use another promotion dialog when enable auto-scan.
    Currently Facebook/X/LinkedIn will enable this feature.
*/
var g_oPrivacyScannerString_autoScan = {
    ScanButtonText: "Посмотреть результаты сканирования",
    WelcomeString: {
        Head : {
            SeveralConcern: "Обнаружено проблем конфиденциальности: %d",
            OneConcern: "Обнаружена %d проблема конфиденциальности"
        },
        Content: {
            FACEBOOK : "Щелкните кнопку ниже, чтобы приступить к улучшению настроек конфиденциальности в Facebook.",
            TWITTER : "Щелкните кнопку ниже, чтобы приступить к улучшению настроек конфиденциальности в X.",
            GOOGLEPLUS : "Щелкните кнопку ниже, чтобы приступить к улучшению настроек конфиденциальности в Google+.",
            LINKEDIN : "Щелкните кнопку ниже, чтобы приступить к улучшению настроек конфиденциальности в LinkedIn."
        },
        LearnMore: "Подробнее",
        AskLater: "Больше не показывать это окно"
    }
};
