(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "Hulp opvragen",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=NL-NL&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "Kan geen verbinding maken met het internet. Controleer uw verbinding en probeer het daarna opnieuw.",
        PROMOTE_TITANIUM_CONTENT : "Schaf bescherming van Trend Micro aan om uw privacy op Facebook, X en LinkedIn te waarborgen.",
        PROMOTE_TITANIUM_URL : "http://emea.trendmicro.com/emea/home/",
        OVERLAY_OK : "OK",
        OVERLAY_SCAN : "Scannen",
        OVERLAY_SIGN_IN : "Aanmelden",
        OVERLAY_CANCEL : "Annuleren",
        OVERLAY_REMOVE : "Verwijderen",
        
        OVERLAY_CHECKNOW : "Nu controleren",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Het lijkt erop dat u een ander Facebook-account bent gaan gebruiken. Wilt u deze nu controleren?",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Het lijkt erop dat u een andere X-account gebruikt. Wilt u in plaats daarvan deze controleren?",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Het lijkt erop dat u een ander Google+-account bent gaan gebruiken. Wilt u deze nu controleren?",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Het lijkt erop dat u een ander LinkedIn-account hebt. Wilt u deze nu controleren?",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "Nu u uw wachtwoord hebt bevestigd, klikt u op de knop om de resultaten weer te geven.",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "Nu u zich hebt aangemeld, klikt u op OK om het resultaat te zien.",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nu u zich op de juiste account hebt aangemeld, klikt u op de knop hieronder.",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nu u zich op de juiste account hebt aangemeld, klikt u op de knop hieronder.",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nu u zich op de juiste account hebt aangemeld, klikt u op de knop hieronder.",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Nu u zich op de juiste account hebt aangemeld, klikt u op de knop hieronder.",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "Zodra de Facebook-website opnieuw automatisch geopend wordt, moet u deze open houden om de instellingen te scannen.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "Zodra de X-website opnieuw automatisch geopend wordt, moet u deze open houden om de instellingen te scannen.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "Zodra de Google+-website opnieuw automatisch geopend wordt, moet u deze open houden om de instellingen te scannen.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "Zodra de LinkedIn-website opnieuw automatisch geopend wordt, moet u deze open houden om de instellingen te scannen.",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "Kan geen verbinding maken met het internet. Controleer uw verbinding en probeer het daarna opnieuw.",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "Uit veiligheidsredenen dient u nu uw X-wachtwoord opnieuw op te geven om deze wijzigingen te bevestigen. Klik op de knop om door te gaan.",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "Dit niet meer melden",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "Voor uw bescherming moet u zich nu nogmaals bij LinkedIn aanmelden om deze wijzigingen te bevestigen. Klik op de knop om door te gaan.",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "Niet uw account?",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "Meld u op de juiste aan.",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "U hebt %d privacykwesties.",
        CONCERN_TITLE_ONE_CONCERN : "U hebt %d privacykwestie.",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "Alles herstellen",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "Help uw vrienden om hun privacy te beschermen",
        SHARE_TOOTHERS_SNS_TITLE : "De Trend Micro Privacyscanner helpt mijn privacy op sociale netwerken te beschermen. Probeer het nu!",
        SHARE_TOOTHERS_BROWSER_TITLE : "De Trend Micro Privacyscanner helpt mijn webbrowser veiliger te maken. Probeer het nu!",
        SHARE_TOOTHERS_LINK : "http://emea.trendmicro.com/emea/home/",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(meer info)",
        SETTING_ITEM_RECOMMENDED : "(Aanbevolen)",
        SETTING_ITEM_ON : "Aan",
        SETTING_ITEM_OFF : "Uit",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "Mensen kunnen uw persoonlijke info zien",
        CATEGORY_Strangers_can_easily_track_you : "Vreemden kunnen u gemakkelijk traceren",
        CATEGORY_You_can_be_tagged_without_your_permission : "U kunt zonder uw toestemming worden getagd",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "Mensen buiten Facebook kunnen uw info zien",
        CATEGORY_People_can_see_where_you_were : "Mensen kunnen zien waar u bent",
        CATEGORY_People_can_download_your_photos : "Mensen kunnen uw foto's downloaden",
        CATEGORY_Advertizers_can_learn_more_about_you : "Adverteerders krijgen meer informatie over u",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "Mensen buiten LinkedIn kunnen uw info zien",
        CATEGORY_Strangers_could_monitor_your_connection : "Vreemden kunnen uw verbinding controleren",
        CATEGORY_Browser_phishing_protect : "Anti-phishing",
        CATEGORY_Application_access : "Mensen kunnen %NUM% app en de bijbehorende berichten zien",
        CATEGORY_Application_access_plural : "Mensen kunnen %NUM% apps en de bijbehorende berichten zien",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "Uitgevoerde wijzigingen:",
        SAVE_CHANGES_BUTTON_TITLE : "Wijzigingen opslaan",
        SAVE_CHANGES_TWITTER_HINT : "Wanneer u klaar bent met het uitvoeren van wijzigingen, klikt u op de knop en bevestigt u uw X-wachtwoord.",
        SAVE_CHANGES_FIRSTTIME_HINT : "Klik hier wanneer de onderstaande wijzigingen kunnen worden opgeslagen",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "Goed zo! U hebt geen problemen met uw privacy, maar misschien hebben uw vrienden hulp nodig...",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "Alles herstellen",
        QUICKFIX_DESCRIPTION : "Om u te helpen uw privacy te beschermen, worden aan uw instellingen de volgende wijzigingen uitgevoerd.",
        QUICKFIX_SETTING : "Instellingen",
        QUICKFIX_CHANGES : "Wijzigingen",
        QUICKFIX_CURRENT : "Huidige",
        QUICKFIX_NEW : "Nieuwe",
        QUICKFIX_FIXALL_BUTTON : "Herstellen",
        QUICKFIX_FIXALL_CANCEL : "Annuleren",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "Privacyscanner",
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
        HTML_FOOTER_COPYRIGHT : "Copyright © 2023 Trend Micro Incorporated. Alle rechten voorbehouden.",
        
        SNS_AREA_TITLE : "Sociale netwerksites",
        BROWSERS_AREA_TITLE : "Browsers",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "Sorry voor het ongemak, maar wij moeten hier enkele verbeteringen doorvoeren om up-to-date te blijven met recente wijzigingen van dit sociale netwerk. Ondertussen kunt u een van uw andere accounts controleren.",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "Schakel de Trend Micro Toolbar in om uw privacy te controleren.",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=NL-NL",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "Meld u aan om uw privacy te controleren.",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "Als u uw privacy wilt controleren, meldt u zich eerst aan en markeert u het selectievakje \"Keep me logged in\" (Mij aangemeld houden).",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "Als u de gevonden privacyproblemen wilt oplossen, meldt u zich eerst aan en markeert u het selectievakje \"Keep me logged in\" (Mij aangemeld houden).",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "Meer informatie.",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "Er is iets fout gegaan. Probeer het later opnieuw.",
        ALERT_SIGN_IN_TO_FIX_TITLE : "Meld u aan om privacyproblemen te verhelpen.",
        ALERT_SIGN_IN_BUTTON : "Aanmelden",
        ALERT_TRY_AGAIN_BUTTON : "Opnieuw proberen",
        GET_MORE_HELP : "Klik hier voor meer hulp.",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "Klik hier voor hulp als dit bericht steeds opnieuw wordt weergegeven.",
        ALERT_BUY_TITANIUM_BUTTON : "Nu kopen",
        ALERT_RESTART_BUTTON : "Opnieuw starten",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "Trend Micro PrivacyScanner heeft problemen ontdekt met Google Chrome.",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "Klik hier voor eenvoudige instructies om het probleem op te lossen.",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "Start Google Chrome opnieuw op om de wijzigingen toe te passen.",
        FIREFOX_RESTART_TITLE : "Start Firefox opnieuw op om de wijzigingen toe te passen.",
        INTERNET_EXPLORER_RESTART_TITLE : "Start Internet Explorer opnieuw op om de wijzigingen toe te passen.",
        
        CHROME_STOP_TITLE : "Sluit Google Chrome nu af om de wijzigingen toe te passen.",
        FIREFOX_STOP_TITLE : "Sluit Firefox nu af om de wijzigingen toe te passen.",
        INTERNET_EXPLORER_STOP_TITLE : "Sluit Internet Explorer nu af om de wijzigingen toe te passen.",
        
        ALERT_APPLY_CLOSE_BUTTON : "Nu toepassen",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "Later toepassen",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "Start Google Chrome opnieuw op om de wijzigingen toe te passen.",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "Start Firefox opnieuw op om de wijzigingen toe te passen.",
        RESTART_IE_LATER_OR_NOT_TITLE : "Start Internet Explorer opnieuw op om de wijzigingen toe te passen.",
        ALERT_RESTART_NOW : "Nu opnieuw starten",
        ALERT_RESTART_LATER : "Later opnieuw starten",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "De wijzigingen worden pas toegepast nadat u Google Chrome hebt afgesloten. U kunt dat nu of op een later moment doen.",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "De wijzigingen worden pas toegepast nadat u Firefox hebt afgesloten. U kunt dat nu of op een later moment doen.",
        CLOSE_IE_LATER_OR_NOT_TITLE : "De wijzigingen worden pas toegepast nadat u Internet Explorer hebt afgesloten. U kunt dat nu of op een later moment doen.",
        ALERT_CLOSE_NOW : "Nu wijzigen",
        ALERT_CLOSE_LATER : "Later wijzigen",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "U moet de beveiligingssoftware van Trend Micro opstarten om Internet Explorer te scannen.",
        ERROR_CHROME_LAUNCH_TI_FIRST : "U moet de beveiligingssoftware van Trend Micro opstarten om Google Chrome te scannen.",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "U moet de beveiligingssoftware van Trend Micro opstarten om Firefox te scannen.",
        
        ERROR_IE_VERSION_TOO_LOW : "Voer een upgrade uit naar de nieuwste versie van Microsoft Internet Explorer voordat u op de onderstaande knop klikt.",
        
        ERROR_DEFAULT_TITLE : "Er is iets misgegaan. Probeer het later opnieuw.",
        ERROR_DEFAULT_LEARN_MORE : "Meer informatie",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "Voer een upgrade uit naar de nieuwste versie van Microsoft Internet Explorer.",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "Stuur een 'Do Not Track'-verzoek wanneer u bladert.",
        cr_do_not_track_DESC : "Uw verzoek om uw onlineactiviteiten niet te traceren zal niet door alle websites worden gehonoreerd.",
        cr_do_not_track_value_0_POSSIBLEVALUE : "Aan",
        cr_do_not_track_value_1_POSSIBLEVALUE : "Uit",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "Vraag of ik wachtwoorden die ik op het web invoer wil opslaan.",
        cr_remember_sign_on_DESC : "Schadelijke websites en software kunnen misbruik maken van de privégegevens die u in Google Chrome opslaat.",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "Aan",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "Uit",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "Schakel bescherming tegen phishing en malware in.",
        cr_phishing_protect_DESC : "Voordat u een website opent, controleert Google Chrome of deze niet wordt weergegeven in een lijst met adressen die met schadelijke software en onlinefraude worden geassocieerd.",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "Aan",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "Uit",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "Hoe moet de browser reageren als websites u proberen te traceren?",
        ff_do_not_track_DESC : "Uw verzoek om uw onlineactiviteiten niet te traceren zal niet door alle websites worden gehonoreerd.",
        ff_do_not_track_value_0_POSSIBLEVALUE : "Traceren voorkomen",
        ff_do_not_track_value_1_POSSIBLEVALUE : "Traceren toestaan",
        ff_do_not_track_value_2_POSSIBLEVALUE : "Geen voorkeur aangeven",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "Wachtwoorden voor websites onthouden",
        ff_remember_sign_on_DESC : "Schadelijke websites en software kunnen misbruik maken van de privégegevens die u in Firefox opslaat.",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "Aan",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "Uit",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "Gerapporteerde aanvalsites blokkeren",
        ff_block_attack_sites_DESC : "Voordat u een website opent, controleert Firefox of deze niet wordt weergegeven in een lijst met adressen die met schadelijke software en onlinefraude worden geassocieerd.",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "Aan",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "Uit",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "Gerapporteerde webvervalsingen blokkeren",
        ff_block_web_forgeries_DESC : "Voordat u een website opent, controleert Firefox of deze niet wordt weergegeven in een lijst met adressen die met onlinefraude worden geassocieerd.",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "Aan",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "Uit",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "Do Not Track-verzoeken verzenden naar websites die u in Internet Explorer opent",
        ie_do_not_track_DESC : "Uw verzoek om uw onlineactiviteiten niet te traceren zal niet door alle websites worden gehonoreerd.",
        ie_do_not_track_value_0_POSSIBLEVALUE : "Uit",
        ie_do_not_track_value_1_POSSIBLEVALUE : "Aan",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "SmartScreen-filter inschakelen",
        ie_phishing_protect_DESC : "Voordat u een website opent, controleert Internet Explorer of deze niet wordt weergegeven in een lijst met adressen die met onlinefraude worden geassocieerd.",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "Uit",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "Aan",
        
        // ie_remember_password
        ie_remember_password_TITLE : "Automatisch aanvullen gebruiken voor gebruikersnamen en wachtwoorden in formulieren",
        ie_remember_password_DESC : "Schadelijke websites en software kunnen misbruik maken van de privégegevens die u in Internet Explorer opslaat.",
        ie_remember_password_value_0_POSSIBLEVALUE : "Uit",
        ie_remember_password_value_1_POSSIBLEVALUE : "Aan",
        
        // ie_private_mode
        ie_private_mode_TITLE : "Werkbalken en extensies uitschakelen als InPrivate Browsing start",
        ie_private_mode_DESC : "Als u deze extra functies uitschakelt, zorgt u ervoor dat er geen spoor van uw online-activiteiten achterblijft als u InPrivate Browsing gebruikt.",
        ie_private_mode_value_0_POSSIBLEVALUE : "Uit",
        ie_private_mode_value_1_POSSIBLEVALUE : "Aan",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "Zichtbaarheid van app en publiek voor berichten",
        fb_app_titleArea_radio_wording_apply_all: "wie kan de %NUM% apps en de bijbehorende berichten zien?",
        fb_app_titleArea_radio_wording_apply_all_singular: "wie kan de app en de bijbehorende berichten zien?",
        fb_app_titleArea_radio_wording_apply_individ:"wie kan elke app en de bijbehorende berichten zien?",
        fb_app_titleArea_title_wording_detail_tooltip:"Deze instelling bepaalt wie op Facebook kan zien dat u deze app gebruikt. Hiermee kunt u ook het publiek kiezen voor berichten die de app namens u plaatst.",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"Hiermee verwijdert u de app uit uw Facebook-account. De app is niet langer aanwezig in uw bladwijzers of de lijst met apps die u gebruikt (gevonden in uw instellingen). <a href='https://www.facebook.com/help/234899866630865' target='_blank'>Meer informatie</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"Vrienden",
        fb_app_level_FriendsOfFriends_wording:"Vrienden van vrienden",
        fb_app_level_public_wording:"Openbaar",
        fb_app_level_onlyme_wording:"Alleen ik",
        fb_app_extend_wording:"Meer weergeven",
        fb_app_unextend_wording:"Minder weergeven",
        fb_app_remove_tooltip:"App verwijderen van Facebook",
        fb_app_remove_title:"%APPNAME% verwijderen van Facebook?",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"Google+ ondersteunt Internet Explorer 8 niet. Open Google+ in een andere browser of upgrade naar de meest recente versie van Microsoft Internet Explorer.",
        fb_twitter_on_IE9:"X ondersteunt geen Internet Explorer 9 of eerdere versies. Open X in een andere browser of voer een upgrade uit naar de nieuwste versie van Microsoft Internet Explorer.",

        // Twitter wordings
        tw_str_fix_pop1:"Ga naar het X-tabblad dat in uw browservenster is geopend en geef uw X-wachtwoord op om verder te gaan.", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"Klik op OK om het probleem op te lossen nadat u uw wachtwoord hebt bevestigd."
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
