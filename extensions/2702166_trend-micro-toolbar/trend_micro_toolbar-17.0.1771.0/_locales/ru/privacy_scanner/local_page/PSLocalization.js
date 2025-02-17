(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "Получить справку",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=RU-RU&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "Невозможно подключиться к Интернету. Проверьте подключение и повторите попытку.",
        PROMOTE_TITANIUM_CONTENT : "Воспользуйтесь защитой от Trend Micro, чтобы обеспечить конфиденциальность личных данных в социальных сетях Facebook, X и LinkedIn.",
        PROMOTE_TITANIUM_URL : "http://emea.trendmicro.com/emea/home/",
        OVERLAY_OK : "OK",
        OVERLAY_SCAN : "Сканировать",
        OVERLAY_SIGN_IN : "Войти",
        OVERLAY_CANCEL : "Отмена",
        OVERLAY_REMOVE : "Удалить",
        
        OVERLAY_CHECKNOW : "Начать проверку",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Вы сменили учетную запись Facebook. Проверить ее?",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Вы сменили учетную запись X. Проверить ее?",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Вы сменили учетную запись Google+. Проверить ее?",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Вы сменили учетную запись LinkedIn. Проверить ее?",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "Теперь, когда вы подтвердили свой пароль, нажмите кнопку для просмотра результатов.",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "Вход выполнен. Нажмите кнопку \"ОК\" для просмотра результатов.",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Теперь, когда вы вошли в правильную учетную запись, нажмите кнопку ниже.",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Теперь, когда вы вошли в правильную учетную запись, нажмите кнопку ниже.",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Теперь, когда вы вошли в правильную учетную запись, нажмите кнопку ниже.",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Теперь, когда вы вошли в правильную учетную запись, нажмите кнопку ниже.",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "При очередном автоматическом открытии сайта Facebook не закрывайте его, чтобы просканировать настройки.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "При очередном автоматическом открытии сайта X не закрывайте его, чтобы просканировать настройки.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "При очередном автоматическом открытии сайта Google+ не закрывайте его, чтобы просканировать настройки.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "При очередном автоматическом открытии сайта LinkedIn не закрывайте его, чтобы дать программе просканировать настройки.",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "Невозможно подключиться к Интернету. Проверьте подключение и повторите попытку.",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "В целях безопасности необходимо снова указать пароль X для подтверждения этих изменений. Нажмите кнопку для продолжения.",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "Не напоминать снова",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "В целях безопасности вы должны снова войти в учетную запись LinkedIn и подтвердить изменения. Нажмите кнопку для продолжения работы.",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "Не ваша учетная запись?",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "Войдите в правильную учетную запись.",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "Проблем конфиденциальности: %d",
        CONCERN_TITLE_ONE_CONCERN : "Проблем конфиденциальности: %d",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "Исправить все",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "Помогите друзьям защитить конфиденциальность",
        SHARE_TOOTHERS_SNS_TITLE : "Сканер Trend Micro обеспечивает конфиденциальность данных в социальных сетях. Попробуй!",
        SHARE_TOOTHERS_BROWSER_TITLE : "Сканер конфиденциальности Trend Micro позволяет мне безопасно пользоваться веб-браузером. Попробуйте и вы!",
        SHARE_TOOTHERS_LINK : "http://emea.trendmicro.com/emea/home/",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(дополнительные сведения)",
        SETTING_ITEM_RECOMMENDED : "(рекомендуется)",
        SETTING_ITEM_ON : "Вкл.",
        SETTING_ITEM_OFF : "Выкл.",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "Люди могут увидеть ваши личные данные",
        CATEGORY_Strangers_can_easily_track_you : "Посторонние могут легко выследить вас",
        CATEGORY_You_can_be_tagged_without_your_permission : "Вас могут без разрешения отметить на фотографиях",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "Люди, не являющиеся пользователями Facebook, могут увидеть ваши данные",
        CATEGORY_People_can_see_where_you_were : "Люди могут увидеть, где вы бывали",
        CATEGORY_People_can_download_your_photos : "Люди могут загружать ваши фотографии",
        CATEGORY_Advertizers_can_learn_more_about_you : "Рекламодатели могут получить доступ к сведениям о ваших предпочтениях",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "Люди, не являющиеся пользователями LinkedIn, могут видеть ваши личные данные",
        CATEGORY_Strangers_could_monitor_your_connection : "Незнакомые люди могут отслеживать ваше соединение",
        CATEGORY_Browser_phishing_protect : "Защита от фишинга",
        CATEGORY_Application_access : "Люди могут увидеть %NUM% приложение и записи в нем",
        CATEGORY_Application_access_plural : "Люди могут увидеть %NUM% прилож. и записи в них",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "Сделанные изменения:",
        SAVE_CHANGES_BUTTON_TITLE : "Сохранить изменения",
        SAVE_CHANGES_TWITTER_HINT : "Когда вы будете готовы вносить изменения, нажмите кнопку и подтвердите ваш пароль для X.",
        SAVE_CHANGES_FIRSTTIME_HINT : "Когда все будет готово, щелкните здесь, чтобы сохранить все изменения ниже.",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "Поздравляем! У вас нет проблем с конфиденциальностью. Однако вашим друзьям, возможно, нужна помощь.",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "Исправить все",
        QUICKFIX_DESCRIPTION : "Для защиты вашей конфиденциальности в настройки будут внесены следующие изменения.",
        QUICKFIX_SETTING : "Настройки",
        QUICKFIX_CHANGES : "Изменения",
        QUICKFIX_CURRENT : "Текущая",
        QUICKFIX_NEW : "Новая",
        QUICKFIX_FIXALL_BUTTON : "Исправить",
        QUICKFIX_FIXALL_CANCEL : "Отмена",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "Сканер конфиденциальности",
        HTML_TITLE_FACEBOOK : "Facebook",
        HTML_TITLE_TWITTER : "X",
        HTML_TITLE_GOOGLEPLUS : "Google+",
        HTML_TITLE_LINKEDIN : "LinkedIn",
        HTML_TITLE_CHROME : "Google Chrome",
        HTML_TITLE_FIREFOX : "Firefox",
        HTML_TITLE_INTERNET_EXPLORER : "Internet Explorer",
        HTML_CONCERNS_UNKNOWN : "?",
        HTML_FOOTER_TREND_DOT_COM : "Trend Micro",
        HTML_FOOTER_TREND_DOT_COM_LINK : "http://emea.trendmicro.com/emea/home/",
        HTML_FOOTER_COPYRIGHT : "© 2023 Trend Micro Incorporated. Все права защищены.",
        
        SNS_AREA_TITLE : "Социальные сети",
        BROWSERS_AREA_TITLE : "Браузеры",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "Приносим свои извинения за неудобства, но нам необходимо внести некоторые улучшения в эту программу, чтобы обеспечить соответствие последним изменениям в этой социальной сети. Тем временем вы можете проверить одну из других своих учетных записей.",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "Для проверки конфиденциальности включите панель управления Trend Micro Toolbar.",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=RU-RU",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "Войдите для проверки конфиденциальности.",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "Чтобы проверить конфиденциальность, войдите в систему и обязательно поставьте флажок \"Оставаться в системе\".",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "Чтобы устранить проблемы с конфиденциальностью, войдите в систему и обязательно поставьте флажок \"Оставаться в системе\".",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "Подробнее.",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "Ошибка. Повторите попытку позже.",
        ALERT_SIGN_IN_TO_FIX_TITLE : "Войдите, чтобы устранить проблемы конфиденциальности.",
        ALERT_SIGN_IN_BUTTON : "Войти",
        ALERT_TRY_AGAIN_BUTTON : "Повторите попытку",
        GET_MORE_HELP : "Щелкните здесь, чтобы получить дополнительную поддержку.",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "Если это сообщение продолжает отображаться, щелкните здесь для получения помощи.",
        ALERT_BUY_TITANIUM_BUTTON : "Приобрести сейчас",
        ALERT_RESTART_BUTTON : "Перезагрузить",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "При использовании сканера конфиденциальности Trend Micro в браузере Google Chrome произошла ошибка.",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "Нажмите здесь для получения инструкций по устранению проблемы.",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "Перезапустите Google Chrome, чтобы изменения вступили в силу.",
        FIREFOX_RESTART_TITLE : "Перезапустите Firefox, чтобы изменения вступили в силу.",
        INTERNET_EXPLORER_RESTART_TITLE : "Перезапустите Internet Explorer, чтобы изменения вступили в силу.",
        
        CHROME_STOP_TITLE : "Необходимо закрыть Google Chrome, чтобы изменения вступили в силу.",
        FIREFOX_STOP_TITLE : "Необходимо закрыть Firefox, чтобы изменения вступили в силу.",
        INTERNET_EXPLORER_STOP_TITLE : "Необходимо закрыть Internet Explorer, чтобы изменения вступили в силу.",
        
        ALERT_APPLY_CLOSE_BUTTON : "Применить сейчас",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "Применить позже",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "Перезагрузите Google Chrome, чтобы изменения вступили в силу.",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "Перезагрузите Firefox, чтобы все изменения вступили в силу.",
        RESTART_IE_LATER_OR_NOT_TITLE : "Перезагрузите Internet Explorer, чтобы все изменения вступили в силу.",
        ALERT_RESTART_NOW : "Выполнить перезагрузку сейчас",
        ALERT_RESTART_LATER : "Перезагрузить компьютер позже",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "Чтобы изменения вступили в силу, необходимо закрыть Google Chrome. Можно сделать это сейчас или позднее.",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "Чтобы изменения вступили в силу, необходимо закрыть Firefox. Можно сделать это сейчас или позднее.",
        CLOSE_IE_LATER_OR_NOT_TITLE : "Чтобы изменения вступили в силу, необходимо закрыть Internet Explorer. Можно сделать это сейчас или позднее.",
        ALERT_CLOSE_NOW : "Изменить сейчас",
        ALERT_CLOSE_LATER : "Изменить позднее",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "Следует запустить программу безопасности Trend Micro, чтобы просканировать браузер Internet Explorer.",
        ERROR_CHROME_LAUNCH_TI_FIRST : "Следует запустить программу безопасности Trend Micro, чтобы просканировать браузер Google Chrome.",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "Следует запустить программу безопасности Trend Micro, чтобы просканировать браузер Firefox.",
        
        ERROR_IE_VERSION_TOO_LOW : "Обновите Microsoft Internet Explorer до последней версии, щелкнув кнопку ниже.",
        
        ERROR_DEFAULT_TITLE : "Произошла ошибка. Повторите попытку позже.",
        ERROR_DEFAULT_LEARN_MORE : "Подробнее",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "Обновите Microsoft Internet Explorer до последней версии.",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "Отправка запроса 'Не отслеживать' для трафика в Интернете.",
        cr_do_not_track_DESC : "Не все веб-сайты выполняют запрос о предотвращении отслеживания деятельности в Интернете.",
        cr_do_not_track_value_0_POSSIBLEVALUE : "Вкл.",
        cr_do_not_track_value_1_POSSIBLEVALUE : "Выкл.",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "Запрос сохранения паролей, вводимых на веб-страницах.",
        cr_remember_sign_on_DESC : "Вредоносные веб-сайты и программы могут воспользоваться личными сведениями, сохраненными в Google Chrome.",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "Вкл.",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "Выкл.",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "Включение защиты от фишинга и вредоносных программ.",
        cr_phishing_protect_DESC : "Перед тем как открыть веб-сайт, Google Chrome производит проверку наличия этого сайта в списке адресов, связанных с вредоносными программами и мошенничеством в Интернете.",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "Вкл.",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "Выкл.",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "Как должен реагировать браузер на попытки веб-сайтов отслеживать деятельность в Интернете?",
        ff_do_not_track_DESC : "Не все веб-сайты выполняют запрос о предотвращении отслеживания деятельности в Интернете.",
        ff_do_not_track_value_0_POSSIBLEVALUE : "Предотвращение отслеживания",
        ff_do_not_track_value_1_POSSIBLEVALUE : "Разрешение отслеживания",
        ff_do_not_track_value_2_POSSIBLEVALUE : "Без предпочтений",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "Сохранение паролей для сайтов",
        ff_remember_sign_on_DESC : "Вредоносные веб-сайты и программы могут воспользоваться личными сведениями, сохраненными в FireFox.",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "Вкл.",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "Выкл.",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "Блокировка подтвержденных вредоносных сайтов",
        ff_block_attack_sites_DESC : "Перед тем как открыть веб-сайт, FireFox производит проверку наличия этого сайта в списке адресов, связанных с вредоносными программами и хакерами.",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "Вкл.",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "Выкл.",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "Блокировка подтвержденных фальшивых сайтов",
        ff_block_web_forgeries_DESC : "Перед тем как открыть веб-сайт, FireFox производит проверку наличия этого сайта в списке адресов, связанных с мошенничеством в Интернете.",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "Вкл.",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "Выкл.",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "Отправка запроса \"Не отслеживать\" сайтам, которые вы открываете в Internet Explorer",
        ie_do_not_track_DESC : "Не все веб-сайты выполняют запрос о предотвращении отслеживания деятельности в Интернете.",
        ie_do_not_track_value_0_POSSIBLEVALUE : "Выкл.",
        ie_do_not_track_value_1_POSSIBLEVALUE : "Вкл.",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "Включение фильтра SmartScreen",
        ie_phishing_protect_DESC : "Перед тем как открыть веб-сайт, Internet Explorer производит проверку наличия этого сайта в списке адресов, связанных с мошенничеством в Интернете.",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "Выкл.",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "Вкл.",
        
        // ie_remember_password
        ie_remember_password_TITLE : "Автозаполнение имен пользователей и паролей в формах",
        ie_remember_password_DESC : "Вредоносные веб-сайты и программы могут воспользоваться личными сведениями, сохраненными в Internet Explorer.",
        ie_remember_password_value_0_POSSIBLEVALUE : "Выкл.",
        ie_remember_password_value_1_POSSIBLEVALUE : "Вкл.",
        
        // ie_private_mode
        ie_private_mode_TITLE : "Отключение панелей инструментов и расширений при запуске просмотра InPrivate",
        ie_private_mode_DESC : "Выключение всех этих дополнительных функций обеспечивает отсутствие отслеживания вашей деятельности в Интернете при использовании просмотра InPrivate.",
        ie_private_mode_value_0_POSSIBLEVALUE : "Выкл.",
        ie_private_mode_value_1_POSSIBLEVALUE : "Вкл.",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "Видимость приложения и группа пользователей, которые могут просматривать записи в нем.",
        fb_app_titleArea_radio_wording_apply_all: "Кому открыт доступ к %NUM% прилож. и записям в них?",
        fb_app_titleArea_radio_wording_apply_all_singular: "Кому открыт доступ к 1 прилож. и записям в них?",
        fb_app_titleArea_radio_wording_apply_individ:"Кому открыт доступ к каждому из приложений и записям в них?",
        fb_app_titleArea_title_wording_detail_tooltip:"Эта настройка определяет, кто из пользователей Facebook будет видеть, что вы используете это приложение. Можно также выбрать пользователей, которые смогут просматривать записи, созданные вами в данном приложении.",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"Приложение будет удалено из учетной записи Facebook, закладок и списка используемых приложений, который можно найти в настройках. <a href='https://www.facebook.com/help/234899866630865' target='_blank'>Подробнее</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"Друзья",
        fb_app_level_FriendsOfFriends_wording:"Друзья друзей",
        fb_app_level_public_wording:"Общий доступ",
        fb_app_level_onlyme_wording:"Только я",
        fb_app_extend_wording:"Показать детали",
        fb_app_unextend_wording:"Скрыть детали",
        fb_app_remove_tooltip:"Удалить приложение со страницы в Facebook",
        fb_app_remove_title:"Удалить %APPNAME% со страницы в Facebook?",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"Google+ не поддерживает работу в Internet Explorer 8. Откройте Google+ в другом браузере или обновите браузер Microsoft Internet Explorer до последней версии.",
        fb_twitter_on_IE9:"X не поддерживает работу в Internet Explorer 9 и более ранних версиях. Откройте X в другом браузере или обновите Microsoft Internet Explorer до последней версии.",

        // Twitter wordings
        tw_str_fix_pop1:"Чтобы продолжить, перейдите на вкладку X, которая появится в окне браузера, и введите свой пароль для X.", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"После подтверждения пароля нажмите кнопку «ОК», чтобы устранить проблему."
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
