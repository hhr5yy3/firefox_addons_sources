(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "Få hjälp",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=SV-SE&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "Det gick inte att ansluta till Internet. Kontrollera din anslutning och försök igen.",
        PROMOTE_TITANIUM_CONTENT : "Skaffa skydd från Trend Micro och skydda din sekretess på Facebook, X och LinkedIn.",
        PROMOTE_TITANIUM_URL : "http://emea.trendmicro.com/emea/home/",
        OVERLAY_OK : "OK",
        OVERLAY_SCAN : "Sök",
        OVERLAY_SIGN_IN : "Logga in",
        OVERLAY_CANCEL : "Avbryt",
        OVERLAY_REMOVE : "Ta bort",
        
        OVERLAY_CHECKNOW : "Kontrollera nu",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Det verkar som att du har bytt till ett annat Facebook-konto. Vill du kontrollera det här i stället?",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Du verkar ha bytt till ett annat X-konto. Vill du kolla in detta istället?",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Det verkar som att du har bytt till ett annat Google+-konto. Vill du kontrollera det här i stället?",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Du verkar ha bytt till ett annat LinkedIn-konto. Vill du kontrollera det här istället?",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "Nu när du har bekräftat ditt lösenord kan du klicka på knappen för att se resultaten.",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "Nu när du har loggat in klickar du på OK för att se resultaten.",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nu när du har loggat in på rätt konto kan du klicka på knappen nedan.",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nu när du har loggat in på rätt konto kan du klicka på knappen nedan.",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nu när du har loggat in på rätt konto kan du klicka på knappen nedan.",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nu när du har loggat in på rätt konto kan du klicka på knappen nedan.",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "När Facebook-webbplatsen har öppnats igen automatiskt håller du den öppen för att söka igenom inställningarna.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "När X-webbplatsen har öppnats igen automatiskt håller du den öppen för att söka igenom inställningarna.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "När Google+-webbplatsen har öppnats igen automatiskt håller du den öppen för att söka igenom inställningarna.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "När LinkedIns webbplats har öppnats igen automatiskt håller du den öppen för att söka igenom inställningarna.",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "Det gick inte att ansluta till Internet. Kontrollera din anslutning och försök igen.",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "För din egen säkerhet måste du nu ange ditt X-lösenord igen för att bekräfta ändringarna. Klicka på knappen för att fortsätta.",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "Visa inte det här igen",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "För att garantera säkerheten måste du logga in på LinkedIn igen för att bekräfta de här ändringarna. Klicka på knappen för att fortsätta.",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "Inte ditt konto?",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "Logga in med rätt konto.",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "Du har %d sekretessproblem.",
        CONCERN_TITLE_ONE_CONCERN : "Du har %d sekretessproblem.",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "Åtgärda alla",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "Hjälp dina vänner att skydda sin sekretess",
        SHARE_TOOTHERS_SNS_TITLE : "Trend Micro sekretesskanner hjälper till att skydda min integritet på sociala nätverk. Testa den!",
        SHARE_TOOTHERS_BROWSER_TITLE : "Trend Micro sekretesskanner gör min webbläsare säkrare. Testa den!",
        SHARE_TOOTHERS_LINK : "http://emea.trendmicro.com/emea/home/",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(mer information)",
        SETTING_ITEM_RECOMMENDED : "(Rekommenderas)",
        SETTING_ITEM_ON : "På",
        SETTING_ITEM_OFF : "Av",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "Andra kan se din personliga information",
        CATEGORY_Strangers_can_easily_track_you : "Okända personer kan enkelt spåra dig",
        CATEGORY_You_can_be_tagged_without_your_permission : "Du kan taggas utan din tillåtelse",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "Personer utanför Facebook kan se din information",
        CATEGORY_People_can_see_where_you_were : "Andra kan se var du befinner dig",
        CATEGORY_People_can_download_your_photos : "Andra kan ladda ned dina foton",
        CATEGORY_Advertizers_can_learn_more_about_you : "Annonser kan lära sig mer om dig.",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "Personer utanför LinkedIn kan se din information",
        CATEGORY_Strangers_could_monitor_your_connection : "Personer du inte känner kan bevaka din anslutning",
        CATEGORY_Browser_phishing_protect : "Skydd mot nätfiske",
        CATEGORY_Application_access : "%NUM% app och dess inlägg är synlig",
        CATEGORY_Application_access_plural : "%NUM% appar och deras inlägg är synliga",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "Utförda ändringar:",
        SAVE_CHANGES_BUTTON_TITLE : "Spara ändringar",
        SAVE_CHANGES_TWITTER_HINT : "När du är redo att göra ändringarna klickar du på knappen och bekräftar ditt X-lösenord.",
        SAVE_CHANGES_FIRSTTIME_HINT : "Klicka här när du vill spara ändringarna nedan",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "Bra jobbat! Du verkar inte har några sekretessproblem, men dina vänner kan behöva hjälp...",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "Åtgärda alla",
        QUICKFIX_DESCRIPTION : "För att förbättra din sekretess kommer följande ändringar av dina inställningar att göras.",
        QUICKFIX_SETTING : "Inställningar",
        QUICKFIX_CHANGES : "Ändringar",
        QUICKFIX_CURRENT : "Nuvarande",
        QUICKFIX_NEW : "Nytt",
        QUICKFIX_FIXALL_BUTTON : "Åtgärda",
        QUICKFIX_FIXALL_CANCEL : "Avbryt",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "Sekretesskanner",
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
        HTML_FOOTER_COPYRIGHT : "Copyright © 2023 Trend Micro Incorporated. Alla rättigheter förbehålles.",
        
        SNS_AREA_TITLE : "Webbplatser för sociala nätverk",
        BROWSERS_AREA_TITLE : "Webbläsare",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "Vi ber om ursäkt för besväret men vi måste göra en del förbättringar här på grund av ändringar som nyligen har gjorts i det sociala nätverket. Under tiden kan du kontrollera något av dina andra konton i stället.",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "Aktivera Trend Micro Toolbar för att kontrollera din sekretess.",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=SV-SE",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "Logga in för att kontrollera din sekretess.",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "Innan du kontrollerar din sekretess loggar du in och glöm inte att markera kryssrutan \"Fortsätt vara inloggad\".",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "Innan du åtgärdar upptäckta sekretessproblem loggar du in och glöm inte att markera kryssrutan \"Fortsätt vara inloggad\".",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "Mer information.",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "Något blev fel. Försök igen senare.",
        ALERT_SIGN_IN_TO_FIX_TITLE : "Logga in för att åtgärda sekretessproblem.",
        ALERT_SIGN_IN_BUTTON : "Logga in",
        ALERT_TRY_AGAIN_BUTTON : "Försök igen",
        GET_MORE_HELP : "Klicka här om du vill ha mer hjälp.",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "Om meddelandet fortsätter att visas kan du klicka här för hjälp.",
        ALERT_BUY_TITANIUM_BUTTON : "Köp nu",
        ALERT_RESTART_BUTTON : "Starta om",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "Trend Micro PrivacyScanner stötte på problem med Google Chrome.",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "Klicka här för att få enkla instruktioner om hur du åtgärdar problemet.",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "Starta om Google Chrome för att verkställa ändringarna.",
        FIREFOX_RESTART_TITLE : "Starta om Firefox för att verkställa ändringarna.",
        INTERNET_EXPLORER_RESTART_TITLE : "Starta om Internet Explorer för att verkställa ändringarna.",
        
        CHROME_STOP_TITLE : "Google Chrome måste nu stängas för att alla ändringar ska verkställas.",
        FIREFOX_STOP_TITLE : "Firefox måste nu stängas för att alla ändringar ska verkställas.",
        INTERNET_EXPLORER_STOP_TITLE : "Internet Explorer måste nu stängas för att alla ändringar ska verkställas.",
        
        ALERT_APPLY_CLOSE_BUTTON : "Verkställ nu",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "Verkställ senare",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "Starta om Google Chrome för att verkställa ändringarna.",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "Starta om Firefox för att verkställa ändringarna.",
        RESTART_IE_LATER_OR_NOT_TITLE : "Starta om Internet Explorer för att verkställa ändringarna.",
        ALERT_RESTART_NOW : "Starta om nu",
        ALERT_RESTART_LATER : "Starta om senare",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "För att ändringarna ska verkställas måste du stänga Google Chrome. Du kan göra det nu eller vänta till senare.",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "För att ändringarna ska verkställas måste du stänga Firefox. Du kan göra det nu eller vänta till senare.",
        CLOSE_IE_LATER_OR_NOT_TITLE : "För att ändringarna ska verkställas måste du stänga Internet Explorer. Du kan göra det nu eller vänta till senare.",
        ALERT_CLOSE_NOW : "Ändra nu",
        ALERT_CLOSE_LATER : "Ändra senare",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "Du måste starta Trend Micro-säkerhetsprogrammet för att skanna Internet Explorer.",
        ERROR_CHROME_LAUNCH_TI_FIRST : "Du måste starta Trend Micro-säkerhetsprogrammet för att skanna Google Chrome.",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "Du måste starta Trend Micro-säkerhetsprogrammet för att skanna Firefox.",
        
        ERROR_IE_VERSION_TOO_LOW : "Uppgradera till den senaste versionen av Microsoft Internet Explorer innan du klickar på knappen nedan.",
        
        ERROR_DEFAULT_TITLE : "Något gick fel. Försök igen senare.",
        ERROR_DEFAULT_LEARN_MORE : "Mer information",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "Uppgradera till den senaste versionen av Microsoft Internet Explorer.",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "Skicka förfrågan Do Not Track med din webbläsartrafik.",
        cr_do_not_track_DESC : "Alla webbplatser kommer inte att bevilja din förfrågan och undgå att spåra vad du gör online.",
        cr_do_not_track_value_0_POSSIBLEVALUE : "På",
        cr_do_not_track_value_1_POSSIBLEVALUE : "Av",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "Erbjud möjlighet att spara lösenord jag anger på internet.",
        cr_remember_sign_on_DESC : "Skadliga webbplatser och program kan utnyttja personlig information som sparats i Google Chrome.",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "På",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "Av",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "Aktivera skydd mot nätfiske och skadliga program.",
        cr_phishing_protect_DESC : "Innan du öppnar en webbplats kommer Google Chrome att se till att den inte står på en lista över adresser som har anknytning till skadliga program och onlinebedrägerier.",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "På",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "Av",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "Hur bör webbläsaren svara när webbplatser försöker bevaka dig?",
        ff_do_not_track_DESC : "Alla webbplatser kommer inte att bevilja din förfrågan och undgå att spåra vad du gör online.",
        ff_do_not_track_value_0_POSSIBLEVALUE : "Förebygg spårning",
        ff_do_not_track_value_1_POSSIBLEVALUE : "Tillåt spårning",
        ff_do_not_track_value_2_POSSIBLEVALUE : "Ange ingen preferens",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "Kom ihåg lösenord för platser",
        ff_remember_sign_on_DESC : "Skadliga webbplatser och program kan utnyttja personlig information som sparats i Firefox.",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "På",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "Av",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "Blockera anmälda attackplatser",
        ff_block_attack_sites_DESC : "Innan du öppnar en webbplats kommer Firefox att se till att den inte står på en lista över adresser som har anknytning till skadliga program och hackare.",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "På",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "Av",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "Blockera anmälda webbförfalskare",
        ff_block_web_forgeries_DESC : "Innan du öppnar en webbplats kommer Firefox att se till att den inte står på en lista över adresser som har anknytning till skadliga program och onlinebedrägerier.",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "På",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "Av",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "Skicka förfrågan Do Not Track till platser som du besöker i Internet Explorer",
        ie_do_not_track_DESC : "Alla webbplatser kommer inte att bevilja din förfrågan och undgå att spåra vad du gör online.",
        ie_do_not_track_value_0_POSSIBLEVALUE : "Av",
        ie_do_not_track_value_1_POSSIBLEVALUE : "På",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "Aktivera SmartScreen-filter",
        ie_phishing_protect_DESC : "Innan du öppnar en webbplats kommer Internet Explorer att se till att den inte står på en lista över adresser som har anknytning till skadliga program och onlinebedrägerier.",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "Av",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "På",
        
        // ie_remember_password
        ie_remember_password_TITLE : "Använd Komplettera automatiskt för användarnamn och lösenord i formulär",
        ie_remember_password_DESC : "Skadliga webbplatser och program kan utnyttja personlig information som sparats i Internet Explorer.",
        ie_remember_password_value_0_POSSIBLEVALUE : "Av",
        ie_remember_password_value_1_POSSIBLEVALUE : "På",
        
        // ie_private_mode
        ie_private_mode_TITLE : "Inaktivera verktygsfält och tillägg när privat surf startar",
        ie_private_mode_DESC : "Att stänga av de här extrafunktionerna gör det lättare att se till att inga spår av dina onlineaktiviteter finns kvar när du använder privat surf",
        ie_private_mode_value_0_POSSIBLEVALUE : "Av",
        ie_private_mode_value_1_POSSIBLEVALUE : "På",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "Appsynlighet och inläggspublik",
        fb_app_titleArea_radio_wording_apply_all: "vem kan se de %NUM% apparna och deras inlägg?",
        fb_app_titleArea_radio_wording_apply_all_singular: "vem kan se 1 app och dess inlägg?",
        fb_app_titleArea_radio_wording_apply_individ:"vem kan se varje app och dess inlägg?",
        fb_app_titleArea_title_wording_detail_tooltip:"Den här inställningen styr vem på Facebook som kan se att du använder den här appen. Den gör det även möjligt att välja publik för inläggen som appen gör åt dig.",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"Det här tar bort appen från ditt Facebook-konto. Appen kommer inte längre att finnas bland dina bokmärken eller i listan över appar som du använder (finns i dina inställningar). <a href='https://www.facebook.com/help/234899866630865' target='_blank'>Mer information</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"Vänner",
        fb_app_level_FriendsOfFriends_wording:"Vänners vänner",
        fb_app_level_public_wording:"Offentligt",
        fb_app_level_onlyme_wording:"Bara jag",
        fb_app_extend_wording:"Visa mer",
        fb_app_unextend_wording:"Visa mindre",
        fb_app_remove_tooltip:"Ta bort appen från Facebook",
        fb_app_remove_title:"Ta bort %APPNAME% från Facebook?",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"Google+ stöder inte Internet Explorer 8. Öppna Google+ i en annan webbläsare eller uppgradera till den senaste versionen av Microsoft Internet Explorer.",
        fb_twitter_on_IE9:"X stöder inte Internet Explorer 9 och tidigare versioner. Öppna X i en annan webbläsare eller uppgradera till den senaste versionen av Microsoft Internet Explorer.",

        // Twitter wordings
        tw_str_fix_pop1:"För att fortsätta, gå till X-tabben som visade sig på ditt webbläsarfönster och skapa ditt X-lösenord.", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"Efter att du har bekräftat ditt lösenord, klicka på OK för att lösa ditt problem."
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
