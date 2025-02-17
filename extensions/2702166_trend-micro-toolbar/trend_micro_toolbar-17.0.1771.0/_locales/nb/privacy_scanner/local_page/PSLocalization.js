(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "Få hjelp",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=NB-NO&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "Kan ikke koble til Internett. Kontroller tilkoblingen og prøv igjen.",
        PROMOTE_TITANIUM_CONTENT : "Få hjelp av Trend Micro til å beskytte personvernet på Facebook, X og LinkedIn.",
        PROMOTE_TITANIUM_URL : "http://emea.trendmicro.com/emea/home/",
        OVERLAY_OK : "OK",
        OVERLAY_SCAN : "Skann",
        OVERLAY_SIGN_IN : "Logg inn",
        OVERLAY_CANCEL : "Avbryt",
        OVERLAY_REMOVE : "Fjern",
        
        OVERLAY_CHECKNOW : "Kontroller nå",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Du har byttet til en annen Facebook-konto. Vil du kontrollere denne istedenfor?",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Det ser ut til at du har byttet til en annen X-konto. Vil du sjekke denne isteden?",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Du har byttet til en annen Google+-konto. Vil du kontrollere denne istedenfor?",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Det virker som du har byttet til en annen LinkedIn-konto. Vil du sjekke denne i stedet?",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "Nå som du har bekreftet passordet ditt, klikk på knappen for å se resultatene.",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "Nå som du har logget på, klikker du OK for å se resultatene.",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nå som du har logget deg på riktig konto, klikk på knappen nedenfor.",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nå som du har logget deg på riktig konto, klikk på knappen nedenfor.",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nå som du har logget deg på riktig konto, klikk på knappen nedenfor.",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nå som du har logget deg på riktig konto, klikk på knappen nedenfor.",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "Når Facebook-siden åpnes igjen automatisk, lar du den være åpen for å skanne innstillingene.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "Når X-siden åpnes igjen automatisk, lar du den være åpen for å skanne innstillingene.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "Når Google+-siden åpnes igjen automatisk, lar du den være åpen for å skanne innstillingene.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "Når LinkedIn-siden åpnes igjen automatisk, lar du den være åpen for å skanne innstillingene.",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "Kan ikke koble til Internett. Kontroller tilkoblingen og prøv igjen.",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "For å beskytte deg selv må du oppgi X-passordet ditt på nytt for å bekrefte disse endringene. Klikk på knappen for å fortsette.",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "Ikke nevn dette igjen",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "For din beskyttelse må du nå logge på LinkedIn på nytt for å bekrefte disse endringene. Klikk knappen for å fortsette.",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "Er det ikke kontoen din?",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "Logg inn på den rette.",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "Du har %d personvernadvarsler.",
        CONCERN_TITLE_ONE_CONCERN : "Du har %d personvernadvarsel.",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "Reparer alle",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "Hjelp vennene dine med å beskytte personvernet",
        SHARE_TOOTHERS_SNS_TITLE : "Trend Micro-personvernskanner bidrar til å beskytte personvernet på sosiale nettverk. Prøv det!",
        SHARE_TOOTHERS_BROWSER_TITLE : "Trend Micro-personvernskanner bidrar til å gjøre nettleseren tryggere. Prøv det!",
        SHARE_TOOTHERS_LINK : "http://emea.trendmicro.com/emea/home/",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(mer info)",
        SETTING_ITEM_RECOMMENDED : "(Anbefalt)",
        SETTING_ITEM_ON : "På",
        SETTING_ITEM_OFF : "Av",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "Folk kan se din personlige informasjon",
        CATEGORY_Strangers_can_easily_track_you : "Fremmede kan lett spore deg opp",
        CATEGORY_You_can_be_tagged_without_your_permission : "Du kan tagges uten tillatelse",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "Folk utenfor Facebook kan se informasjonen din",
        CATEGORY_People_can_see_where_you_were : "Folk kan se hvor du har vært",
        CATEGORY_People_can_download_your_photos : "Folk kan laste ned bildene dine",
        CATEGORY_Advertizers_can_learn_more_about_you : "Annonsører kan lære mer om deg",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "Folk utenfor LinkedIn kan se informasjonen din",
        CATEGORY_Strangers_could_monitor_your_connection : "Fremmede kan overvåke tilkoblingen din",
        CATEGORY_Browser_phishing_protect : "Antiphishing",
        CATEGORY_Application_access : "Folk kan se %NUM%-appen og dens innlegg",
        CATEGORY_Application_access_plural : "Folk kan se %NUM%-apper og deres innlegg",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "Endringer utført:",
        SAVE_CHANGES_BUTTON_TITLE : "Lagre endringer",
        SAVE_CHANGES_TWITTER_HINT : "Når du er klar til å gjøre endringer, klikk på knappen og bekreft X-passordet ditt.",
        SAVE_CHANGES_FIRSTTIME_HINT : "Klikk her når du er klar til å lagre endingene nedenfor",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "Godt jobbet! Du har ingen personvernproblemer, men dine venner trenger kanskje hjelp ...",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "Reparer alle",
        QUICKFIX_DESCRIPTION : "For å beskytte personvernet ditt, vil følgende endringer gjøres i innstillingene.",
        QUICKFIX_SETTING : "Innstillinger",
        QUICKFIX_CHANGES : "Endringer",
        QUICKFIX_CURRENT : "Gjeldende",
        QUICKFIX_NEW : "Ny",
        QUICKFIX_FIXALL_BUTTON : "Reparer",
        QUICKFIX_FIXALL_CANCEL : "Avbryt",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "Personvernskanner",
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
        HTML_FOOTER_COPYRIGHT : "Copyright © 2023 Trend Micro Incorporated. Med enerett.",
        
        SNS_AREA_TITLE : "Sider for sosiale nettverk",
        BROWSERS_AREA_TITLE : "Nettlesere",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "Vi beklager, men vi må gjennomføre noen forbedringer for å holde tritt med de nyeste endringene på dette sosiale nettverket. I mellomtiden kan du kontrollere en av de andre kontoene dine.",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "Slå på Trend Micro Toolbar for å sjekke personvernet ditt.",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=NB-NO",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "Logg inn for å sjekke personvernet.",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "For å kontrollere personvernet må du først logge deg på, og deretter huske å merke av for \"Forbli pålogget\".",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "For å rette opp i personvernsbekymringene du måtte ha må du først logge deg på, og deretter huske å merke av for \"Forbli pålogget\".",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "Les mer.",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "Det oppstod en feil. Prøv igjen senere.",
        ALERT_SIGN_IN_TO_FIX_TITLE : "Logg inn for å håndtere personvernsaker.",
        ALERT_SIGN_IN_BUTTON : "Logg inn",
        ALERT_TRY_AGAIN_BUTTON : "Prøv igjen",
        GET_MORE_HELP : "Klikk her for mer hjelp.",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "Hvis du stadig ser denne meldingen, klikk her for å få hjelp.",
        ALERT_BUY_TITANIUM_BUTTON : "Kjøp nå",
        ALERT_RESTART_BUTTON : "Start på nytt",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "Trend Micro PrivacyScanner fikk problemer med Google Chrome.",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "Klikk her for enkle instruksjoner for å korrigere problemet.",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "Start Google Chrome på nytt for å aktivere endringene.",
        FIREFOX_RESTART_TITLE : "Start Firefox på nytt for å aktivere endringene.",
        INTERNET_EXPLORER_RESTART_TITLE : "Start Internet Explorer på nytt for å aktivere endringene.",
        
        CHROME_STOP_TITLE : "Google Chrome må nå lukkes for å aktivere endringene.",
        FIREFOX_STOP_TITLE : "Firefox må nå lukkes for å aktivere endringene.",
        INTERNET_EXPLORER_STOP_TITLE : "Internet Explorer må nå lukkes for å aktivere endringene.",
        
        ALERT_APPLY_CLOSE_BUTTON : "Aktiver nå",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "Bruk senere",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "Start Google Chrome på nytt for å aktivere endringene.",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "Start Firefox på nytt for å aktivere endringene.",
        RESTART_IE_LATER_OR_NOT_TITLE : "Start Internet Explorer på nytt for å aktivere endringene.",
        ALERT_RESTART_NOW : "Start på nytt nå",
        ALERT_RESTART_LATER : "Start på nytt senere",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "Du må lukke Google Chrome for at endringene skal tre i kraft. Du kan gjøre dette nå eller vente til senere.",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "Du må lukke Firefox for at endringene skal tre i kraft. Du kan gjøre dette nå eller vente til senere.",
        CLOSE_IE_LATER_OR_NOT_TITLE : "Du må lukke Internet Explorer for at endringene skal tre i kraft. Du kan gjøre dette nå eller vente til senere.",
        ALERT_CLOSE_NOW : "Endre nå",
        ALERT_CLOSE_LATER : "Endre senere",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "Du må starte Trend Micro sikkerhetsprogramvaren din for å skanne Internet Explorer.",
        ERROR_CHROME_LAUNCH_TI_FIRST : "Du må starte Trend Micro sikkerhetsprogramvaren din for å skanne Google Chrome.",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "Du må starte Trend Micro sikkerhetsprogramvaren din for å skanne Firefox.",
        
        ERROR_IE_VERSION_TOO_LOW : "Oppgrader til den nyeste versjonen av Microsoft Internet Explorer før du klikker på knappen nedenfor.",
        
        ERROR_DEFAULT_TITLE : "Det skjedde en feil. Prøv igjen senere.",
        ERROR_DEFAULT_LEARN_MORE : "Les mer",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "Oppgrader til den nyeste versjonen av Microsoft Internet Explorer.",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "Send en \"Ingen sporing\"-forespørsel sammen med nettlesertrafikken.",
        cr_do_not_track_DESC : "Ikke alle nettsider vil overholde forespørselen om å unngå sporing av det du gjør på nettet.",
        cr_do_not_track_value_0_POSSIBLEVALUE : "På",
        cr_do_not_track_value_1_POSSIBLEVALUE : "Av",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "Tilby å lagre passord jeg skriver inn på nettet.",
        cr_remember_sign_on_DESC : "Skadelige nettsider og programvare kan dra nytte av personlige opplysninger lagret i Google Chrome.",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "På",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "Av",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "Aktiver beskyttelse mot phishing og skadelige programmer.",
        cr_phishing_protect_DESC : "Før en nettside åpnes, vil Google Chrome kontrollere at den ikke vises i en liste over adresser knyttet til skadelige programmer og svindel på nettet.",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "På",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "Av",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "Hvordan skal nettleseren reagere når nettsider prøver å spore deg?",
        ff_do_not_track_DESC : "Ikke alle nettsider vil overholde forespørselen om å unngå sporing av det du gjør på nettet.",
        ff_do_not_track_value_0_POSSIBLEVALUE : "Forhindre sporing",
        ff_do_not_track_value_1_POSSIBLEVALUE : "Tillat sporing",
        ff_do_not_track_value_2_POSSIBLEVALUE : "Uttrykk ingen preferanse",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "Husk passord for nettsider",
        ff_remember_sign_on_DESC : "Skadelige nettsider og programvare kan dra nytte av personlige opplysninger lagret i FireFox.",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "På",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "Av",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "Blokker nettsider med rapporterte angrep",
        ff_block_attack_sites_DESC : "Før en nettside åpnes, vil FireFox kontrollere at den ikke vises i en liste over adresser knyttet til skadelige programmer og hackere.",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "På",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "Av",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "Blokker rapportert nettsvindel",
        ff_block_web_forgeries_DESC : "Før en nettside åpnes, vil FireFox kontrollere at den ikke vises i en liste over adresser knyttet til svindel på nettet.",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "På",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "Av",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "Send \"Ingen sporing\"-forespørsler til nettsider du besøker i Internet Explorer",
        ie_do_not_track_DESC : "Ikke alle nettsider vil overholde forespørselen om å unngå sporing av det du gjør på nettet.",
        ie_do_not_track_value_0_POSSIBLEVALUE : "Av",
        ie_do_not_track_value_1_POSSIBLEVALUE : "På",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "Aktiver SmartScreen-filter",
        ie_phishing_protect_DESC : "Før en nettside åpnes, vil Internet Explorer kontrollere at den ikke vises i en liste over adresser knyttet til svindel på nettet.",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "Av",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "På",
        
        // ie_remember_password
        ie_remember_password_TITLE : "Bruk automatisk fullføring for brukernavn og passord på skjemaer",
        ie_remember_password_DESC : "Skadelige nettsider og programvare kan dra nytte av personlige opplysninger lagret i Internet Explorer.",
        ie_remember_password_value_0_POSSIBLEVALUE : "Av",
        ie_remember_password_value_1_POSSIBLEVALUE : "På",
        
        // ie_private_mode
        ie_private_mode_TITLE : "Deaktiver verktøylinjer og tillegg når InPrivate-surfing starter",
        ie_private_mode_DESC : "Ved å slå av disse ekstra funksjonene sørger du for at ingen spor av dine aktiviteter på nettet blir værende når du bruker InPrivate-surfing.",
        ie_private_mode_value_0_POSSIBLEVALUE : "Av",
        ie_private_mode_value_1_POSSIBLEVALUE : "På",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "Appens synlighet og målgruppe for post",
        fb_app_titleArea_radio_wording_apply_all: "hvem kan se %NUM%-apper og deres innlegg?",
        fb_app_titleArea_radio_wording_apply_all_singular: "folk kan se 1-appen og dens innlegg?",
        fb_app_titleArea_radio_wording_apply_individ:"folk kan se hver app og dens innlegg?",
        fb_app_titleArea_title_wording_detail_tooltip:"Denne innstillingen kontrollerer hvem på Facebook kan se at du bruker denne appen. Den lar deg også velge målgruppen for innleggene appen poster på dine vegne.",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"Dette fjerner appen fra Facebook-kontoen din. Appen vil ikke lenger være i dine bokmerker eller listen over apper du bruker (finnes i innstillingene). <a href='https://www.facebook.com/help/234899866630865' target='_blank'>Les mer</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"Venner",
        fb_app_level_FriendsOfFriends_wording:"Venner av venner",
        fb_app_level_public_wording:"Offentlig",
        fb_app_level_onlyme_wording:"Kun meg",
        fb_app_extend_wording:"Vis mer",
        fb_app_unextend_wording:"Vis mindre",
        fb_app_remove_tooltip:"Fjern app fra Facebook",
        fb_app_remove_title:"Fjerne %APPNAME% fra Facebook?",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"Google+ støtter ikke Internet Explorer 8. Åpne Google+ i en annen nettleser eller oppgrader til siste versjon av Microsoft Internet Explorer.",
        fb_twitter_on_IE9:"X støtter ikke Internet Explorer 9 og eldre. Åpne X i en annen nettleser, eller oppgrader til den nyeste versjonen av Microsoft Internet Explorer.",

        // Twitter wordings
        tw_str_fix_pop1:"For å fortsette må du gå til X-fanen som har dukket opp i nettleservinduet, og angi X-passordet ditt.", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"Etter å ha bekreftet passordet ditt klikker du OK for å fikse problemet."
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
