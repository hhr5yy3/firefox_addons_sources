(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "Hilfe anfordern",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=DE-DE&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "Die Verbindung mit dem Internet ist fehlgeschlagen. Überprüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
        PROMOTE_TITANIUM_CONTENT : "Schutz von Trend Micro erhalten, um Ihre Privatsphäre auf Facebook, X und LinkedIn zu schützen.",
        PROMOTE_TITANIUM_URL : "http://de.trendmicro.com/de/home/",
        OVERLAY_OK : "OK",
        OVERLAY_SCAN : "Durchsuchen",
        OVERLAY_SIGN_IN : "Anmelden",
        OVERLAY_CANCEL : "Abbrechen",
        OVERLAY_REMOVE : "Entfernen",
        
        OVERLAY_CHECKNOW : "Jetzt überprüfen",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Sie haben sich offensichtlich ein anderes Facebook-Konto zugelegt. Möchten Sie stattdessen dieses Konto überprüfen?",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Sie haben offenbar zu einem anderen X-Konto gewechselt. Möchten Sie dieses stattdessen überprüfen lassen?",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Anscheinend sind Sie zu einem anderen Google+-Konto gewechselt. Möchten Sie stattdessen dieses Konto überprüfen?",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Offensichtlich haben Sie zu einem anderen LinkedIn-Konto gewechselt. Möchten Sie stattdessen dieses prüfen?",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "Nachdem Sie Ihr Kennwort bestätigt haben, klicken Sie auf die Schaltfläche, um die Ergebnisse anzuzeigen.",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "Nachdem Sie sich angemeldet haben, klicken Sie auf 'OK', um die Ergebnisse anzuzeigen.",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nachdem Sie sich mit dem richtigen Konto angemeldet haben, klicken Sie auf die Schaltfläche unten.",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nachdem Sie sich mit dem richtigen Konto angemeldet haben, klicken Sie auf die Schaltfläche unten.",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nachdem Sie sich mit dem richtigen Konto angemeldet haben, klicken Sie auf die Schaltfläche unten.",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nachdem Sie sich mit dem richtigen Konto angemeldet haben, klicken Sie auf die Schaltfläche unten.",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "Sobald die Facebook-Website erneut automatisch geöffnet wird, sollte sie nicht geschlossen werden, damit die Einstellungen durchsucht werden können.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "Sobald die Website X erneut automatisch geöffnet wird, sollte sie nicht geschlossen werden, damit die Einstellungen durchsucht werden können.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "Sobald die Website Google+ erneut automatisch geöffnet wird, sollte sie nicht geschlossen werden, damit die Einstellungen durchsucht werden können.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "Sobald die LinkedIn-Website erneut automatisch geöffnet wird, sollte sie nicht geschlossen werden, damit die Einstellungen durchsucht werden können.",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "Die Verbindung mit dem Internet ist fehlgeschlagen. Überprüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "Zu Ihrem persönlichen Schutz müssen Sie nun Ihr X-Kennwort erneut eingeben, um diese Änderungen zu bestätigen. Klicken Sie auf die Schaltfläche, um den Vorgang fortzusetzen.",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "Dies nicht mehr erwähnen",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "Zu Ihrem persönlichen Schutz müssen Sie sich nun erneut bei LinkedIn anmelden, um diese Änderungen zu bestätigen. Klicken Sie auf die Schaltfläche, um den Vorgang fortzusetzen.",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "Nicht Ihr Konto?",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "Melden Sie sich mit dem richtigen an.",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "Es gibt %d Sicherheitsbedenken bezüglich des Datenschutzes.",
        CONCERN_TITLE_ONE_CONCERN : "Es gibt %d Sicherheitsbedenken bezüglich des Datenschutzes.",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "Alles beheben",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "Unterstützen Sie Ihre Freunde im Hinblick auf Datenschutz",
        SHARE_TOOTHERS_SNS_TITLE : "Mit dem Datenschutz-Scanner von Trend Micro schütze ich meine Privatsphäre in sozialen Netzwerken. Probier’s auch aus!",
        SHARE_TOOTHERS_BROWSER_TITLE : "Der Datenschutz-Scanner von Trend Micro hilft mir beim Schutz meines Webbrowsers. Jetzt ausprobieren!",
        SHARE_TOOTHERS_LINK : "http://de.trendmicro.com/de/home/",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(weitere Infos)",
        SETTING_ITEM_RECOMMENDED : "(Empfohlen)",
        SETTING_ITEM_ON : "Ein",
        SETTING_ITEM_OFF : "Aus",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "Ihre persönlichen Daten werden angezeigt",
        CATEGORY_Strangers_can_easily_track_you : "Sie können von Fremden leicht gefunden werden",
        CATEGORY_You_can_be_tagged_without_your_permission : "Sie können ohne Ihr Einverständnis markiert werden",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "Beliebige Personen außerhalb von Facebook können Ihre Daten sehen",
        CATEGORY_People_can_see_where_you_were : "Beliebige Personen können sehen, welche Websites Sie aufgerufen haben",
        CATEGORY_People_can_download_your_photos : "Beliebige Personen können Ihre Fotos herunterladen",
        CATEGORY_Advertizers_can_learn_more_about_you : "Werbetreibende können mehr über Sie erfahren",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "Beliebige Personen außerhalb von LinkedIn können Ihre Daten sehen",
        CATEGORY_Strangers_could_monitor_your_connection : "Fremde können Ihre Verbindungen überwachen",
        CATEGORY_Browser_phishing_protect : "Anti-phishing",
        CATEGORY_Application_access : "Beliebige Personen können %NUM% App und ihre Beiträge sehen",
        CATEGORY_Application_access_plural : "Beliebige Personen können %NUM% Apps und deren Beiträge sehen",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "Vorgenommene Änderungen:",
        SAVE_CHANGES_BUTTON_TITLE : "Änderungen speichern",
        SAVE_CHANGES_TWITTER_HINT : "Wenn Sie Änderungen vornehmen möchten, klicken Sie auf die Schaltfläche und bestätigen Sie Ihr X-Kennwort.",
        SAVE_CHANGES_FIRSTTIME_HINT : "Klicken Sie hier, wenn Sie die nachfolgenden Änderungen speichern möchten",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "Gut gemacht! Sie haben keine Bedenken wegen des Datenschutzes, aber Ihre Freunde brauchen möglicherweise etwas Hilfe...",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "Alles beheben",
        QUICKFIX_DESCRIPTION : "Um Ihre Privatsphäre zu schützen, werden die folgenden Änderungen an Ihren Einstellungen vorgenommen.",
        QUICKFIX_SETTING : "Einstellungen",
        QUICKFIX_CHANGES : "Änderungen",
        QUICKFIX_CURRENT : "Aktuell",
        QUICKFIX_NEW : "Neu",
        QUICKFIX_FIXALL_BUTTON : "Beheben",
        QUICKFIX_FIXALL_CANCEL : "Abbrechen",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "Datenschutz-Scanner",
        HTML_TITLE_FACEBOOK : "Facebook",
        HTML_TITLE_TWITTER : "X",
        HTML_TITLE_GOOGLEPLUS : "Google+",
        HTML_TITLE_LINKEDIN : "LinkedIn",
        HTML_TITLE_CHROME : "Google Chrome",
        HTML_TITLE_FIREFOX : "Firefox",
        HTML_TITLE_INTERNET_EXPLORER : "Internet Explorer",
        HTML_CONCERNS_UNKNOWN : "?",
        HTML_FOOTER_TREND_DOT_COM : "Trend Micro",
        HTML_FOOTER_TREND_DOT_COM_LINK : "http://de.trendmicro.com/de/home/",
        HTML_FOOTER_COPYRIGHT : "Copyright © 2023 Trend Micro Incorporated. Alle Rechte vorbehalten.",
        
        SNS_AREA_TITLE : "Sites von sozialen Netzwerken",
        BROWSERS_AREA_TITLE : "Browser",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "Wir müssen einige Verbesserungen vornehmen, um mit den jüngsten Änderungen in diesem sozialen Netzwerk Schritt zu halten. Wir bitten um Verständnis. In der Zwischenzeit können Sie stattdessen eines Ihrer anderen Konten überprüfen.",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "Blenden Sie die Trend Micro Toolbar ein, um Ihre Datenschutzeinstellungen zu überprüfen.",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=DE-DE",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "Melden Sie sich an, um Ihre Datenschutzeinstellungen zu überprüfen.",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "Um Ihre Datenschutzeinstellungen zu überprüfen, melden Sie sich zunächst an und aktivieren Sie unbedingt das Kontrollkästchen \"Angemeldet bleiben\".",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "Um festgestellte Bedenken zum Datenschutz zu beheben, melden Sie sich zunächst an und aktivieren Sie unbedingt das Kontrollkästchen \"Angemeldet bleiben\".",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "Weitere Informationen.",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "Da ist etwas schiefgelaufen. Versuchen Sie es später erneut.",
        ALERT_SIGN_IN_TO_FIX_TITLE : "Bitte melden Sie sich an, um Bedenken zum Datenschutz zu beheben.",
        ALERT_SIGN_IN_BUTTON : "Anmelden",
        ALERT_TRY_AGAIN_BUTTON : "Erneut versuchen",
        GET_MORE_HELP : "Klicken Sie hier, um weitere Hilfe zu erhalten.",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "Falls diese Meldung weiterhin angezeigt wird, klicken Sie hier, um weitere Hilfe zu erhalten.",
        ALERT_BUY_TITANIUM_BUTTON : "Jetzt kaufen",
        ALERT_RESTART_BUTTON : "Neustart",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "Bei Trend Micro PrivacyScanner sind Probleme mit Google Chrome aufgetreten.",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "Klicken Sie hier, um einfache Anweisungen zum Beheben des Problems anzuzeigen.",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "Starten Sie Google Chrome neu, um die Änderungen zu übernehmen.",
        FIREFOX_RESTART_TITLE : "Starten Sie Firefox neu, um die Änderungen zu übernehmen.",
        INTERNET_EXPLORER_RESTART_TITLE : "Starten Sie Internet Explorer neu, um die Änderungen zu übernehmen.",
        
        CHROME_STOP_TITLE : "Google Chrome muss nun geschlossen werden, um die Änderungen zu übernehmen.",
        FIREFOX_STOP_TITLE : "Firefox muss nun geschlossen werden, um die Änderungen zu übernehmen.",
        INTERNET_EXPLORER_STOP_TITLE : "Internet Explorer muss nun geschlossen werden, um die Änderungen zu übernehmen.",
        
        ALERT_APPLY_CLOSE_BUTTON : "Jetzt übernehmen",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "Später übernehmen",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "Starten Sie Google Chrome neu, um die Änderungen zu übernehmen.",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "Starten Sie Firefox neu, um die Änderungen zu übernehmen.",
        RESTART_IE_LATER_OR_NOT_TITLE : "Starten Sie Internet Explorer neu, um die Änderungen zu übernehmen.",
        ALERT_RESTART_NOW : "Jetzt neu starten",
        ALERT_RESTART_LATER : "Später neu starten",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "Sie müssen Google Chrome schließen, damit die Änderungen wirksam werden. Sie können dies entweder jetzt oder später machen.",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "Sie müssen Firefox schließen, damit die Änderungen wirksam werden. Sie können dies entweder jetzt oder später machen.",
        CLOSE_IE_LATER_OR_NOT_TITLE : "Sie müssen Internet Explorer schließen, damit die Änderungen wirksam werden. Sie können dies entweder jetzt oder später machen.",
        ALERT_CLOSE_NOW : "Jetzt ändern",
        ALERT_CLOSE_LATER : "Später ändern",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "Sie müssen die Trend Micro Sicherheitssoftware starten, um Internet Explorer zu durchsuchen.",
        ERROR_CHROME_LAUNCH_TI_FIRST : "Sie müssen die Trend Micro Sicherheitssoftware starten, um Google Chrome zu durchsuchen.",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "Sie müssen die Trend Micro Sicherheitssoftware starten, um Firefox zu durchsuchen.",
        
        ERROR_IE_VERSION_TOO_LOW : "Führen Sie ein Upgrade auf die neueste Version von Microsoft Internet Explorer durch, bevor Sie auf die Schaltfläche unten klicken.",
        
        ERROR_DEFAULT_TITLE : "Da ist etwas schiefgelaufen. Versuchen Sie es später erneut.",
        ERROR_DEFAULT_LEARN_MORE : "Weitere Informationen",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "Bitte führen Sie ein Upgrade auf die neueste Version von Microsoft Internet Explorer durch.",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "Senden Sie eine 'Do Not Track'-Anforderung zusammen mit Ihren Browser-Daten.",
        cr_do_not_track_DESC : "Nicht alle Websites nehmen Ihre Anforderung an, eine Überwachung Ihrer Online-Aktivitäten zu unterlassen.",
        cr_do_not_track_value_0_POSSIBLEVALUE : "Ein",
        cr_do_not_track_value_1_POSSIBLEVALUE : "Aus",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "Nachfrage, ob Kennwörter, die im Internet eingegeben werden, gespeichert werden sollen.",
        cr_remember_sign_on_DESC : "Bösartige Websites und Software können persönliche Daten nutzen, die in Google Chrome gespeichert sind.",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "Ein",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "Aus",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "Phishing- und Malware-Schutz aktivieren.",
        cr_phishing_protect_DESC : "Vor dem Öffnen einer Website stellt Google Chrome sicher, dass diese nicht in einer Liste von Adressen enthalten ist, die mit bösartiger Software und Online-Betrug in Verbindung gebracht wird.",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "Ein",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "Aus",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "Wie soll der Browser reagieren, wenn Websites versuchen, Sie zu überwachen?",
        ff_do_not_track_DESC : "Nicht alle Websites nehmen Ihre Anforderung an, eine Überwachung Ihrer Online-Aktivitäten zu unterlassen.",
        ff_do_not_track_value_0_POSSIBLEVALUE : "Überwachung verhindern",
        ff_do_not_track_value_1_POSSIBLEVALUE : "Überwachung zulassen",
        ff_do_not_track_value_2_POSSIBLEVALUE : "Keine Vorgaben",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "Kennwörter für Websites speichern",
        ff_remember_sign_on_DESC : "Bösartige Websites und Software können persönliche Daten nutzen, die in Firefox gespeichert sind.",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "Ein",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "Aus",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "Gemeldete Angriffsites sperren",
        ff_block_attack_sites_DESC : "Vor dem Öffnen einer Website stellt Firefox sicher, dass diese nicht in einer Liste von Adressen enthalten ist, die mit bösartiger Software und Hackern in Verbindung gebracht wird.",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "Ein",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "Aus",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "Gemeldete Web-Fälschungen sperren",
        ff_block_web_forgeries_DESC : "Vor dem Öffnen einer Website stellt Firefox sicher, dass diese nicht in einer Liste von Adressen enthalten ist, die mit Online-Betrug in Verbindung gebracht werden.",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "Ein",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "Aus",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "Do Not Track-Anforderungen an Websites senden, die Sie in Internet Explorer besuchen",
        ie_do_not_track_DESC : "Nicht alle Websites nehmen Ihre Anforderung an, eine Überwachung Ihrer Online-Aktivitäten zu unterlassen.",
        ie_do_not_track_value_0_POSSIBLEVALUE : "Aus",
        ie_do_not_track_value_1_POSSIBLEVALUE : "Ein",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "SmartScreen-Filter aktivieren",
        ie_phishing_protect_DESC : "Vor dem Öffnen einer Website stellt Internet Explorer sicher, dass diese nicht in einer Liste von Adressen enthalten ist, die mit Online-Betrug in Verbindung gebracht werden.",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "Aus",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "Ein",
        
        // ie_remember_password
        ie_remember_password_TITLE : "AutoVervollständigen für Benutzernamen und Kennwörter in Formularen verwenden",
        ie_remember_password_DESC : "Bösartige Websites und Software können persönliche Daten nutzen, die in Internet Explorer gespeichert sind.",
        ie_remember_password_value_0_POSSIBLEVALUE : "Aus",
        ie_remember_password_value_1_POSSIBLEVALUE : "Ein",
        
        // ie_private_mode
        ie_private_mode_TITLE : "Symbolleisten und Erweiterungen beim Start von InPrivate Browsing deaktivieren",
        ie_private_mode_DESC : "Das Deaktivieren dieser Zusatzfunktionen hilft dabei, sicherzustellen, dass keine Spuren Ihrer Online-Aktivitäten zurückbleiben, wenn Sie InPrivate Browsing verwenden.",
        ie_private_mode_value_0_POSSIBLEVALUE : "Aus",
        ie_private_mode_value_1_POSSIBLEVALUE : "Ein",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "App-Sichtbarkeit und Zielgruppe der Beiträge",
        fb_app_titleArea_radio_wording_apply_all: "Wer kann die %NUM% Apps und deren Beiträge sehen?",
        fb_app_titleArea_radio_wording_apply_all_singular: "Wer kann die 1 App und ihre Beiträge sehen?",
        fb_app_titleArea_radio_wording_apply_individ:"Wer kann jede App und ihre Beiträge sehen?",
        fb_app_titleArea_title_wording_detail_tooltip:"Mit dieser Einstellung wird festgelegt, welcher Facebook-Benutzer sehen kann, dass Sie diese App verwenden. Sie können mit ihr auch das Zielpublikum für Posts auswählen, die die App in Ihrem Namen veröffentlicht.",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"Dadurch wird die App aus Ihrem Facebook-Konto entfernt. Die App befindet sich nicht mehr in Ihren Lesezeichen oder in der Liste der von Ihnen verwendeten Apps (zu finden unter Einstellungen). <a href='https://www.facebook.com/help/234899866630865' target='_blank'>Weitere Informationen</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"Freunde",
        fb_app_level_FriendsOfFriends_wording:"Freunde von Freunden",
        fb_app_level_public_wording:"Öffentlich",
        fb_app_level_onlyme_wording:"Nur ich",
        fb_app_extend_wording:"Mehr anzeigen",
        fb_app_unextend_wording:"Weniger anzeigen",
        fb_app_remove_tooltip:"App aus Facebook entfernen",
        fb_app_remove_title:"%APPNAME% aus Facebook entfernen?",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"Google+ unterstützt nicht Internet Explorer 8. Öffnen Sie Google+ in einem anderen Browser oder führen Sie ein Upgrade auf die neueste Version von Microsoft Internet Explorer durch.",
        fb_twitter_on_IE9:"X unterstützt nicht den Internet Explorer der Versionen 9 und früher. Bitte öffnen Sie X in einem anderen Browser oder führen Sie ein Upgrade auf die neueste Version von Microsoft Internet Explorer durch.",

        // Twitter wordings
        tw_str_fix_pop1:"Um fortzufahren, navigieren Sie zur Registerkarte 'X' im Browserfenster und geben Sie Ihr X-Kennwort ein.", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"Klicken Sie nach dem Bestätigen des Kennworts auf OK, um das Problem zu beheben."
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
