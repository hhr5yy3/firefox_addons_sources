(function(Export){
    Export.D_TSRToolTipTitleString = "Оценка страниц Trend Micro";


    Export.g_oRatingLevelToolTipString = {
        LevelString: {
            Nolink: "Не отвечает",
            Safe: "Безопасно",
            Neutral: "Безопасно",
            Dangerous: "Опасные",
            Suspicious: "Подозрительные",
            Untested: "Не проверено",
            Trusted: "Разрешено",
            Blocked: "Заблокировано",
            PCBlocked:"Заблокировано",
            Limited:"Этот веб-сайт безопасный?"
        },
        HelpString: {
            Nolink: "Trend Micro не может отобразить рейтинг для этой страницы. Если причиной проблемы является нестабильное подключение, обновление страницы может помочь устранить эту проблему.",
            Safe: "Эту страницу можно свободно открывать.",
            Neutral: "Эта страница содержала опасные элементы в прошлом, но сейчас она безопасна по критериям Trend Micro.",
            Dangerous: "Посещение данной страницы может быть опасным. Установленные настройки защиты заблокируют ее открытие.",
            Suspicious: "Эта страница может представлять угрозу для безопасности. Установленные настройки защиты могут заблокировать ее открытие.",
            Untested: "Система Trend Micro еще не проверила данную страницу, поэтому не может отобразить рейтинг для нее. ",
            Trusted: "Данная страница добавлена в список исключений как разрешенная, но компания Trend Micro не подтвердила эту оценку.",
            Blocked: "Адрес данной страницы содержится в вашем списке заблокированных веб-сайтов.",
            PCBlocked:"Функцией родительского контроля на этом компьютере запрещен доступ к этой странице.",
            Limited: "Обновите __productName__ для проверки безопасности веб-сайта, чтобы безопасно просматривать страницы в Интернете."
        },
        CheckUrlString: "<span id='TSRCheckUrl'>Попросить Trend Micro</span> пересмотреть степень риска.",
        ToogleBgIkbString: "Как отключить выделение ссылок с рейтингом?",
        SiteSafetyReportString: {
            Title: "Попросить Trend Micro пересмотреть степень риска для этого сайта.",
            Address: "Адрес:",
            SiteOwnerCheckBox: "Я являюсь владельцем сайта",
            EmailAddressDefault: "Адрес электронной почты",
            AddDescriptionDefault: "Добавить описание",
            SendButton: "Отправить",
            CancelButton: "Отмена",
			ReceivedReviewTitle:"Запрос получен",
			Description:"Компания Trend Micro пересмотрит степень риска для этого сайта и предоставит оценку по завершению проверки. Проверьте еще раз позднее.",
			OKButton:"OK"
        }
    };

    Export.g_oRatingSetPopupString = {
        Title: "Наши ​рейтинги ​страниц сейчас выглядят по-новому!",
        DarkTitle: "Рейтинги страниц теперь оптимизированы для темного режима!",
        Desc: "Выберите стиль, подходящий именно вам.",
        RadioHightlignt: "Выделять ссылки ",
        RadioNotHightlight: "Не выделять ссылки",
        Safe: "Безопасно",
        Dangerous: "Опасно",
        HowDoWorkLink: "Как работают рейтинги страниц?",
        RemindLater: "Напомнить позже",
        ApplyButton: "Применить",
        AppliedTitle:"Стиль применен.",
        ChangeSettingDesc:"Это можно изменить в любое время в разделе <a href='#' id='how_update_pagerating_link'>Настройки</a>."
    };

    Export.g_oToolTipString = {
        ShareToFriend: {
            ShareMsg: "Предупредите друга об этой публикации.",
            ShareString: "Программа обеспечения безопасности Trend Micro™ отнесла эту ссылку к разряду опасных. Ее можно удалить и просканировать компьютер. https://www.facebook.com/Trendmicro/app_366801130018338"
        }
    };

    Export.g_oDirectPassPromotionString = {
        recommendDP: "",
        learnMore: "Подробнее",
        donotAsk: "Больше на спрашивать"
    };

    Export.g_oSafeSearchingString = {
        warnUserTitle: "Другой пользователь считает, что вам не следует просматривать это изображение.",
        reallyNeedToSee: "Если вам действительно необходимо увидеть его, <span class='provide_password'>введите пароль</span>, а затем отключите защиту",
        reallyNeedToSeeUntilRestart: "Если вам действительно необходимо увидеть его, <a class='provide_password'>введите пароль</a>, а затем отключите защиту до перезагрузки компьютера.",
        productName: "Оценка страниц Trend Micro"
    };
}(window));