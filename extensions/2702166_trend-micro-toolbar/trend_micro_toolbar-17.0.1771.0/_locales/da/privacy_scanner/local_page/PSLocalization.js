(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "Få hjælp",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=DA-DK&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "Kunne ikke oprette forbindelse til internettet. Kontrollér forbindelsen, og prøv igen.",
        PROMOTE_TITANIUM_CONTENT : "Få beskyttelse fra Trend Micro for at sikre dine personlige oplysninger på Facebook, X og LinkedIn.",
        PROMOTE_TITANIUM_URL : "http://emea.trendmicro.com/emea/home/",
        OVERLAY_OK : "OK",
        OVERLAY_SCAN : "Scan",
        OVERLAY_SIGN_IN : "Log på",
        OVERLAY_CANCEL : "Annuller",
        OVERLAY_REMOVE : "Fjern",
        
        OVERLAY_CHECKNOW : "Kontroller nu",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Du har tilsyneladende skiftet til en anden Facebook-konto. Vil du kontrollere denne i stedet?",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Det lader til at du har skiftet til en anden X-konto. Vil du tjekke denne i stedet?",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Du har tilsyneladende skiftet til en anden Google+ konto. Vil du kontrollere denne i stedet?",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Du ser ud til at have skiftet til en anden LinkedIn-konto. Vil du kontrollere denne i stedet?",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "Nu hvor du har bekræftet adgangskoden, skal du klikke på knappen for at se resultaterne.",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "Nu hvor du er tilmeldt, skal du klikke på OK for at se resultaterne.",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nu hvor du har logget på den rigtige konto, skal du klikke på knappen nedenfor.",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nu hvor du har logget på den rigtige konto, skal du klikke på knappen nedenfor.",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nu hvor du har logget på den rigtige konto, skal du klikke på knappen nedenfor.",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nu hvor du har logget på den rigtige konto, skal du klikke på knappen nedenfor.",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "Når webstedet for Facebook åbnes igen automatisk, skal det holdes åbent for at scanne indstillingerne.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "Når webstedet for X åbnes igen automatisk, skal det holdes åbent for at scanne indstillingerne.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "Når webstedet for Google+ åbnes igen automatisk, skal det holdes åbent for at scanne indstillingerne.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "Når webstedet for LinkedIn åbnes igen automatisk, skal det holdes åbent for at scanne indstillingerne.",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "Kunne ikke oprette forbindelse til internettet. Kontrollér forbindelsen, og prøv igen.",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "Af hensyn til din beskyttelse skal du nu angive din adgangskode til X igen for at bekræfte disse ændringer. Klik på knappen for at fortsætte.",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "Nævn ikke dette igen",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "Af sikkerhedshensyn skal du nu logge på LinkedIn igen for at bekræfte disse ændringer. Klik på knappen for at fortsætte.",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "Ikke din konto?",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "Log på med den rigtige konto.",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "Du har %d problemer med beskyttelsen af dine personlige oplysninger.",
        CONCERN_TITLE_ONE_CONCERN : "Du har %d problem med beskyttelsen af dine personlige oplysninger.",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "Løs alle",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "Hjælp dine venner med at beskytte deres personlige oplysninger",
        SHARE_TOOTHERS_SNS_TITLE : "Trend Micro Scanner til beskyttelse af personlige oplysninger hjælper mig med at beskytte min personlige integritet på sociale netværk. Prøv det!",
        SHARE_TOOTHERS_BROWSER_TITLE : "Trend Micro Scanner til beskyttelse af personlige oplysninger hjælper med at gøre min webbrowser mere sikker. Prøv det!",
        SHARE_TOOTHERS_LINK : "http://emea.trendmicro.com/emea/home/",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(flere oplysninger)",
        SETTING_ITEM_RECOMMENDED : "(Anbefalet)",
        SETTING_ITEM_ON : "Til",
        SETTING_ITEM_OFF : "Fra",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "Andre kan se dine personlige oplysninger",
        CATEGORY_Strangers_can_easily_track_you : "Ukendte personer kan let spore dig",
        CATEGORY_You_can_be_tagged_without_your_permission : "Du kan blive tagget uden din tilladelse",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "Personer uden for Facebook kan se dine oplysninger",
        CATEGORY_People_can_see_where_you_were : "Andre kan se, hvor du har været",
        CATEGORY_People_can_download_your_photos : "Andre kan hente dine billeder",
        CATEGORY_Advertizers_can_learn_more_about_you : "Annoncører kan lære mere om dig",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "Personer uden for LinkedIn kan se dine oplysninger",
        CATEGORY_Strangers_could_monitor_your_connection : "Fremmede kan overvåge din forbindelse",
        CATEGORY_Browser_phishing_protect : "Antiphishing",
        CATEGORY_Application_access : "Man kan se %NUM%-app og dens poster",
        CATEGORY_Application_access_plural : "Man kan se %NUM% apps og deres poster",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "Udførte ændringer:",
        SAVE_CHANGES_BUTTON_TITLE : "Gem ændringer",
        SAVE_CHANGES_TWITTER_HINT : "Når du er klar til at foretage ændringerne, skal du klikke på knappen og bekræfte din adgangskode til X.",
        SAVE_CHANGES_FIRSTTIME_HINT : "Klik her, når du er klar til at gemme ændringerne nedenfor.",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "Godt gået! Du har ingen problemer med beskyttelse af personlige oplysninger, men dine venner har måske brug for hjælp...",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "Løs alle",
        QUICKFIX_DESCRIPTION : "Følgende ændringer af dine indstillinger vil blive foretaget for at hjælpe med at beskytte dine personlige oplysninger.",
        QUICKFIX_SETTING : "Indstillinger",
        QUICKFIX_CHANGES : "Ændringer",
        QUICKFIX_CURRENT : "Aktuel",
        QUICKFIX_NEW : "Ny",
        QUICKFIX_FIXALL_BUTTON : "Løs",
        QUICKFIX_FIXALL_CANCEL : "Annuller",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "Scanner til beskyttelse af personlige oplysninger",
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
        HTML_FOOTER_COPYRIGHT : "Copyright © 2023 Trend Micro Incorporated. Alle rettigheder forbeholdes.",
        
        SNS_AREA_TITLE : "Sociale netværkssteder",
        BROWSERS_AREA_TITLE : "Browsere",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "Vi undskylder ulejligheden, men vi er nødt til at foretage et par forbedringer her for at være opdateret med de nyeste ændringer på dette sociale netværk. I mellemtiden kan du kontrollere en af dine andre konti i stedet.",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "Slå værktøjslinjen Trend Micro Toolbar til for at kontrollere beskyttelsen af dine personlige oplysninger.",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=DA-DK",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "Log på for at kontrollere beskyttelsen af dine personlige oplysninger.",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "Hvis du vil kontrollere beskyttelsen af dine personlige oplysninger, skal du først logge på og huske at markere afkrydsningsfeltet \"Log mig ikke af\".",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "Hvis du vil løse problemer med beskyttelsen af dine personlige oplysninger, skal du først logge på og huske at markere afkrydsningsfeltet \"Log mig ikke af\".",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "Få mere at vide.",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "Der gik noget galt. Prøv igen senere.",
        ALERT_SIGN_IN_TO_FIX_TITLE : "Log på for at løse problemer med beskyttelsen af dine personlige oplysninger.",
        ALERT_SIGN_IN_BUTTON : "Log på",
        ALERT_TRY_AGAIN_BUTTON : "Prøv igen",
        GET_MORE_HELP : "Klik her for at få mere hjælp.",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "Hvis du fortsat ser denne meddelelse, kan du få hjælp her.",
        ALERT_BUY_TITANIUM_BUTTON : "Køb nu",
        ALERT_RESTART_BUTTON : "Genstart",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "Trend Micro PrivacyScanner stødte på et problem med Google Chrome.",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "Klik her for nemme instruktioner om, hvordan du løser problemet.",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "Genstart Google Chrome for at få ændringerne til at træde i kraft.",
        FIREFOX_RESTART_TITLE : "Genstart Firefox for at få ændringerne til at træde i kraft.",
        INTERNET_EXPLORER_RESTART_TITLE : "Genstart Internet Explorer for at få ændringerne til at træde i kraft.",
        
        CHROME_STOP_TITLE : "Google Chrome skal afsluttes nu for at få ændringerne til at træde i kraft.",
        FIREFOX_STOP_TITLE : "Firefox skal afsluttes nu for at få ændringerne til at træde i kraft.",
        INTERNET_EXPLORER_STOP_TITLE : "Internet Explorer skal afsluttes nu for at få ændringerne til at træde i kraft.",
        
        ALERT_APPLY_CLOSE_BUTTON : "Anvend nu",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "Anvend senere",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "Genstart Google Chrome for at få ændringerne til at træde i kraft.",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "Genstart Firefox for at få ændringerne til at træde i kraft.",
        RESTART_IE_LATER_OR_NOT_TITLE : "Genstart Internet Explorer for at få ændringerne til at træde i kraft.",
        ALERT_RESTART_NOW : "Genstart nu",
        ALERT_RESTART_LATER : "Genstart senere",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "Du skal lukke Google Chrome for at få ændringerne til at træde i kraft. Du kan gøre det nu eller vente til senere.",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "Du skal lukke Firefox for at få ændringerne til at træde i kraft. Du kan gøre det nu eller vente til senere.",
        CLOSE_IE_LATER_OR_NOT_TITLE : "Du skal lukke Internet Explorer for at få ændringerne til at træde i kraft. Du kan gøre det nu eller vente til senere.",
        ALERT_CLOSE_NOW : "Skift nu",
        ALERT_CLOSE_LATER : "Skift senere",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "Du skal starte din Trend Micro-sikkerhedssoftware for at scanne Internet Explorer.",
        ERROR_CHROME_LAUNCH_TI_FIRST : "Du skal starter din Trend Micro-sikkerhedssoftware for at scanne Google Chrome.",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "Du skal starter din Trend Micro-sikkerhedssoftware for at scanne Firefox.",
        
        ERROR_IE_VERSION_TOO_LOW : "Du skal opgradere til den nyeste version af Microsoft Internet Explorer, før du klikker på knappen nedenfor.",
        
        ERROR_DEFAULT_TITLE : "Noget gik galt. Prøv igen senere.",
        ERROR_DEFAULT_LEARN_MORE : "Få mere at vide",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "Du skal opgradere til den nyeste version af Microsoft Internet Explorer.",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "Send en 'Spor ikke'-anmodning med din browsertrafik.",
        cr_do_not_track_DESC : "Ikke alle websteder efterkommer din anmodning om ikke at spore, hvad du foretager dig på internettet.",
        cr_do_not_track_value_0_POSSIBLEVALUE : "Til",
        cr_do_not_track_value_1_POSSIBLEVALUE : "Fra",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "Tilbyd at gemme adgangskoder, jeg angiver på internettet.",
        cr_remember_sign_on_DESC : "Skadelige websteder og skadelig software kan misbruge personlige oplysninger, der er gemt i Google Chrome.",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "Til",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "Fra",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "Aktiver beskyttelse mod phishing og malware.",
        cr_phishing_protect_DESC : "Inden du åbner et websted, sikrer Google Chrome, at det ikke står på en liste over adresser med forbindelse til skadelig software og onlinesvindel.",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "Til",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "Fra",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "Hvordan skal browseren reagere, når websteder forsøger at holde øje med dig?",
        ff_do_not_track_DESC : "Ikke alle websteder efterkommer din anmodning om ikke at spore, hvad du foretager dig på internettet.",
        ff_do_not_track_value_0_POSSIBLEVALUE : "Forhindre sporing",
        ff_do_not_track_value_1_POSSIBLEVALUE : "Tillade sporing",
        ff_do_not_track_value_2_POSSIBLEVALUE : "Har ikke nogen mening",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "Husk adgangskoder for websteder",
        ff_remember_sign_on_DESC : "Skadelige websteder og skadelig software kan misbruge personlige oplysninger, der er gemt i FireFox.",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "Til",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "Fra",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "Bloker indberettede websteder, der angribes fra",
        ff_block_attack_sites_DESC : "Inden du åbner et websted, sikrer FireFox, at det ikke står på en liste over adresser med forbindelse til skadelig software og hackere.",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "Til",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "Fra",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "Bloker indberettet onlinesvindel",
        ff_block_web_forgeries_DESC : "Inden du åbner et websted, sikrer FireFox, at det ikke står på en liste over adresser med forbindelse til onlinesvindel.",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "Til",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "Fra",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "Send Spor ikke-anmodninger til websteder, du besøger i Internet Explorer",
        ie_do_not_track_DESC : "Ikke alle websteder efterkommer din anmodning om ikke at spore, hvad du foretager dig på internettet.",
        ie_do_not_track_value_0_POSSIBLEVALUE : "Fra",
        ie_do_not_track_value_1_POSSIBLEVALUE : "Til",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "Aktiver SmartScreen-filter",
        ie_phishing_protect_DESC : "Inden du åbner et websted, sikrer Internet Explorer, at det ikke står på en liste over adresser med forbindelse til onlinesvindel.",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "Fra",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "Til",
        
        // ie_remember_password
        ie_remember_password_TITLE : "Brug Autofuldførelse til brugernavne og adgangskoder i forummer",
        ie_remember_password_DESC : "Skadelige websteder og skadelig software kan misbruge personlige oplysninger, der er gemt i Internet Explorer.",
        ie_remember_password_value_0_POSSIBLEVALUE : "Fra",
        ie_remember_password_value_1_POSSIBLEVALUE : "Til",
        
        // ie_private_mode
        ie_private_mode_TITLE : "Deaktiver værktøjslinjer og udvidelser, når InPrivate Browsing starter",
        ie_private_mode_DESC : "Hvis du slår disse ekstrafunktioner fra, sikres det, at der ikke efterlades spor af dine onlineaktiviteter, når du bruger InPrivate Browsing.",
        ie_private_mode_value_0_POSSIBLEVALUE : "Fra",
        ie_private_mode_value_1_POSSIBLEVALUE : "Til",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "App-synlighed og postmodtagere",
        fb_app_titleArea_radio_wording_apply_all: "hvem kan se %NUM% apps og deres poster?",
        fb_app_titleArea_radio_wording_apply_all_singular: "hvem kan se 1 app og dens poster?",
        fb_app_titleArea_radio_wording_apply_individ:"hvem kan se hver app og dens poster?",
        fb_app_titleArea_title_wording_detail_tooltip:"Denne indstilling kontrollerer, hvem på Facebook der kan se, at du bruger denne app. Det giver dig mulighed for at vælge modtagerne af de poster, appen laver på dine vegne.",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"Dette fjerner appen fra din Facebook-konto. Denne app vil ikke længere være i dine bogmærker eller på listen over apps, du anvender (findes i dine indstillinger). <a href='https://www.facebook.com/help/234899866630865' target='_blank'>Få mere at vide</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"Venner",
        fb_app_level_FriendsOfFriends_wording:"Venners venner",
        fb_app_level_public_wording:"Offentlig",
        fb_app_level_onlyme_wording:"Kun mig",
        fb_app_extend_wording:"Vis mere",
        fb_app_unextend_wording:"Vis mindre",
        fb_app_remove_tooltip:"Fjern app fra Facebook",
        fb_app_remove_title:"Fjern %APPNAME% fra Facebook?",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"Google+ understøtter ikke Internet Explorer 8. Åben venligst Google+ i en anden browser eller opgrader til den seneste version af Microsoft Internet Explorer.",
        fb_twitter_on_IE9:"X understøtter ikke Internet Explorer 9 og tidligere. Åbn X i en anden browser, eller opgrader til den nyeste version af Microsoft Internet Explorer.",

        // Twitter wordings
        tw_str_fix_pop1:"Fortsæt ved at gå til den X-fane, der vises i browser-vinduet, og angive din adgangskode til X.", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"Klik på OK for at løse problemet, når du har bekræftet adgangskoden."
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
