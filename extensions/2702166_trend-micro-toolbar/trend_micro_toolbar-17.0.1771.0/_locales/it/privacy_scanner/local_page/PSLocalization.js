(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "Assistenza",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=IT-IT&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "Impossibile connettersi a Internet. Controllare la connessione e riprovare.",
        PROMOTE_TITANIUM_CONTENT : "La protezione Trend Micro per salvaguardare la tua privacy su Facebook, X e LinkedIn.",
        PROMOTE_TITANIUM_URL : "http://it.trendmicro.com/it/home/",
        OVERLAY_OK : "OK",
        OVERLAY_SCAN : "Scansione",
        OVERLAY_SIGN_IN : "Accedi",
        OVERLAY_CANCEL : "Annulla",
        OVERLAY_REMOVE : "Rimuovi",
        
        OVERLAY_CHECKNOW : "Verifica ora",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Sembra che si sia passati a un altro account Facebook. Verificare questo invece?",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Sembra che tu sia passato a un altro account X. Vuoi verificare quest’altro account?",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Sembra che si sia passati a un altro account Google+. Verificare questo invece?",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Sembra che si stia usando un account LinkedIn diverso. Si desidera verificare questo invece?",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "La password è stata confermata, fare clic sul pulsante per visualizzare i risultati.",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "Ora che l'accesso è stato effettuato, fare clic su OK per visualizzare i risultati.",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "È stato eseguito l'accesso all'account corretto, fare clic sul pulsante sotto.",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "È stato eseguito l'accesso all'account corretto, fare clic sul pulsante sotto.",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "È stato eseguito l'accesso all'account corretto, fare clic sul pulsante sotto.",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "È stato eseguito l'accesso all'account corretto, fare clic sul pulsante sotto.",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "Quando il sito Facebook si apre di nuovo automaticamente, lasciare che si apra per eseguire la scansione delle impostazioni.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "Quando il sito X si apre di nuovo automaticamente, lascialo aperto per eseguire la scansione delle impostazioni.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "Quando il sito Google+ si apre di nuovo automaticamente, lasciare che si apra per eseguire la scansione delle impostazioni.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "Quando il sito LinkedIn si apre di nuovo automaticamente, lasciare che si apra per eseguire la scansione delle impostazioni.",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "Impossibile connettersi a Internet. Controllare la connessione e riprovare.",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "Per ragioni di protezione, è necessario fornire di nuovo la password X per confermare le modifiche. Fai clic sul pulsante per procedere.",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "Non ripeterlo più",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "Per la propria protezione, ora è necessario accedere di nuovo a LinkedIn per confermare le modifiche. Fare clic sul pulsante per continuare.",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "Non è l'account corretto?",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "Accedere con quello corretto.",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "Sono presenti %d problemi relativi alla privacy.",
        CONCERN_TITLE_ONE_CONCERN : "È presente %d problema relativo alla privacy.",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "Correggi tutto",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "È possibile aiutare i propri amici a proteggere la loro privacy",
        SHARE_TOOTHERS_SNS_TITLE : "Trend Micro Privacy Scanner consente di proteggere la privacy sui social network. Provalo!",
        SHARE_TOOTHERS_BROWSER_TITLE : "Trend Micro Privacy Scanner consente di rendere il browser Web più sicuro. Provalo!",
        SHARE_TOOTHERS_LINK : "http://it.trendmicro.com/it/home/",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(ulteriori informazioni)",
        SETTING_ITEM_RECOMMENDED : "(Consigliato)",
        SETTING_ITEM_ON : "Attivata",
        SETTING_ITEM_OFF : "Disattivata",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "Le persone possono vedere le informazioni personali dell'utente",
        CATEGORY_Strangers_can_easily_track_you : "Gli estranei possono facilmente tenere traccia delle attività dell'utente",
        CATEGORY_You_can_be_tagged_without_your_permission : "Le persone possono inserire tag senza l'autorizzazione dell'utente",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "Persone all'esterno di Facebook possono vedere le informazioni dell'utente",
        CATEGORY_People_can_see_where_you_were : "Le persone possono vedere dove si trova l'utente",
        CATEGORY_People_can_download_your_photos : "Le persone possono scaricare le foto dell'utente",
        CATEGORY_Advertizers_can_learn_more_about_you : "Coloro che pubblicano pubblicità possono conoscere più informazioni sull'utente",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "Le persone all'esterno di LinkedIn possono vedere le informazioni dell'utente",
        CATEGORY_Strangers_could_monitor_your_connection : "Gli estranei possono monitorare la tua connessione",
        CATEGORY_Browser_phishing_protect : "Anti-phishing",
        CATEGORY_Application_access : "Gli utenti possono visualizzare %NUM% app e i relativi post",
        CATEGORY_Application_access_plural : "Gli utenti possono visualizzare %NUM% app e i relativi post",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "Modifiche effettuate:",
        SAVE_CHANGES_BUTTON_TITLE : "Salva le modifiche",
        SAVE_CHANGES_TWITTER_HINT : "Quando sei pronto a effettuare le modifiche, fai clic sul pulsante e conferma la password per X.",
        SAVE_CHANGES_FIRSTTIME_HINT : "Fare clic qui quando pronti per salvare le modifiche seguenti",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "Ottimo! Non sono più presenti problemi relativi alla privacy, ma gli amici potrebbero avere bisogno di assistenza...",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "Correggi tutto",
        QUICKFIX_DESCRIPTION : "Per proteggere la privacy dell'utente, saranno apportate le seguenti modifiche alle impostazioni.",
        QUICKFIX_SETTING : "Impostazioni",
        QUICKFIX_CHANGES : "Modifiche",
        QUICKFIX_CURRENT : "Corrente",
        QUICKFIX_NEW : "Nuova",
        QUICKFIX_FIXALL_BUTTON : "Correggi",
        QUICKFIX_FIXALL_CANCEL : "Annulla",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "Privacy Scanner",
        HTML_TITLE_FACEBOOK : "Facebook",
        HTML_TITLE_TWITTER : "X",
        HTML_TITLE_GOOGLEPLUS : "Google+",
        HTML_TITLE_LINKEDIN : "LinkedIn",
        HTML_TITLE_CHROME : "Google Chrome",
        HTML_TITLE_FIREFOX : "Firefox",
        HTML_TITLE_INTERNET_EXPLORER : "Internet Explorer",
        HTML_CONCERNS_UNKNOWN : "?",
        HTML_FOOTER_TREND_DOT_COM : "Trend Micro",
        HTML_FOOTER_TREND_DOT_COM_LINK : "http://it.trendmicro.com/it/home/",
        HTML_FOOTER_COPYRIGHT : "Copyright © 2023 Trend Micro Incorporated. Tutti i diritti riservati.",
        
        SNS_AREA_TITLE : "Siti delle reti sociali",
        BROWSERS_AREA_TITLE : "Browser",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "Ci scusiamo per l'inconveniente, ma abbiamo apportato alcuni miglioramenti qui allo scopo di adeguare il servizio alle recenti modifiche di questo social network. Nel frattempo, è possibile verificare un altro account.",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "Attivare la Trend Micro Toolbar per verificare le impostazioni per la privacy.",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=IT-IT",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "Accedere per verificare le impostazioni per la privacy.",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "Per controllare la propria privacy, accedere e contrassegnare la casella di controllo \"Keep me logged in\".",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "Per risolvere i problemi relativi alla privacy, accedere e contrassegnare la casella di controllo \"Keep me logged in\".",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "Ulteriori informazioni.",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "Si è verificato un errore. Riprovare più tardi.",
        ALERT_SIGN_IN_TO_FIX_TITLE : "Accedere per correggere i problemi sulla privacy.",
        ALERT_SIGN_IN_BUTTON : "Accedi",
        ALERT_TRY_AGAIN_BUTTON : "Riprova",
        GET_MORE_HELP : "Fare clic qui per ulteriore assistenza.",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "Se questo messaggio viene nuovamente visualizzato, fare clic qui per ottenere aiuto.",
        ALERT_BUY_TITANIUM_BUTTON : "Acquista ora",
        ALERT_RESTART_BUTTON : "Riavvia",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "Si è verificato un problema nell'esecuzione di Trend Micro PrivacyScanner con Google Chrome.",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "Fare clic qui per alcune semplici istruzioni per risolvere il problema.",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "Riavviare Google Chrome per applicare le modifiche.",
        FIREFOX_RESTART_TITLE : "Riavviare Firefox per applicare le modifiche.",
        INTERNET_EXPLORER_RESTART_TITLE : "Riavviare Internet Explorer per applicare le modifiche.",
        
        CHROME_STOP_TITLE : "Ora è necessario chiudere Google Chrome per applicare le modifiche.",
        FIREFOX_STOP_TITLE : "Ora è necessario chiudere Firefox per applicare le modifiche.",
        INTERNET_EXPLORER_STOP_TITLE : "Ora è necessario chiudere Internet Explorer per applicare le modifiche.",
        
        ALERT_APPLY_CLOSE_BUTTON : "Applica ora",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "Applica in seguito",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "Riavviare Google Chrome per applicare le modifiche.",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "Riavviare Firefox per applicare le modifiche.",
        RESTART_IE_LATER_OR_NOT_TITLE : "Riavviare Internet Explorer per applicare le modifiche.",
        ALERT_RESTART_NOW : "Riavvia ora",
        ALERT_RESTART_LATER : "Riavvia in seguito",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "Per applicare le modifiche, è necessario chiudere Google Chrome. È possibile farlo ora o in seguito.",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "Per applicare le modifiche, è necessario chiudere Firefox. È possibile farlo ora o in seguito.",
        CLOSE_IE_LATER_OR_NOT_TITLE : "Per applicare le modifiche, è necessario chiudere Internet Explorer. È possibile farlo ora o in seguito.",
        ALERT_CLOSE_NOW : "Cambia ora",
        ALERT_CLOSE_LATER : "Cambia in seguito",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "È necessario avviare il software di sicurezza Trend Micro per eseguire la scansione di Internet Explorer.",
        ERROR_CHROME_LAUNCH_TI_FIRST : "È necessario avviare il software di sicurezza Trend Micro per eseguire la scansione di Google Chrome.",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "È necessario avviare il software di sicurezza Trend Micro per eseguire la scansione di Firefox.",
        
        ERROR_IE_VERSION_TOO_LOW : "Effettuare l'aggiornamento alla versione più recente di Microsoft Internet Explorer prima di fare clic sul pulsante seguente.",
        
        ERROR_DEFAULT_TITLE : "Si è verificato un errore. Riprovare in seguito.",
        ERROR_DEFAULT_LEARN_MORE : "Ulteriori informazioni",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "Effettuare l'aggiornamento alla versione più recente di Microsoft Internet Explorer.",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "Invia una richiesta 'Non tracciare' con il traffico del browser.",
        cr_do_not_track_DESC : "Non tutti i siti Web rispetteranno questa richiesta di non tracciare le attività online dell'utente.",
        cr_do_not_track_value_0_POSSIBLEVALUE : "Attivato",
        cr_do_not_track_value_1_POSSIBLEVALUE : "Disattivato",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "Chiede di salvare le password immesse dall'utente in Internet.",
        cr_remember_sign_on_DESC : "Software e siti Web dannosi possono sfruttare le informazioni personali salvate in Google Chrome.",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "Attivato",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "Disattivato",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "Attiva la protezione da phishing e malware.",
        cr_phishing_protect_DESC : "Prima di aprire un sito Web, Google Chrome verifica che questo non sia presente in un elenco di indirizzi associati con software dannoso e frodi online.",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "Attivato",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "Disattivato",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "Come dovrebbe rispondere il browser quando i siti Web tentano di tenere traccia delle azioni dell'utente?",
        ff_do_not_track_DESC : "Non tutti i siti Web rispetteranno questa richiesta di non tracciare le attività online dell'utente.",
        ff_do_not_track_value_0_POSSIBLEVALUE : "Impedisci tracciabilità",
        ff_do_not_track_value_1_POSSIBLEVALUE : "Consenti tracciabilità",
        ff_do_not_track_value_2_POSSIBLEVALUE : "Non esprimere alcuna preferenza",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "Ricorda le password per i siti",
        ff_remember_sign_on_DESC : "Software e siti Web dannosi possono sfruttare le informazioni personali salvate in FireFox.",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "Attivato",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "Disattivato",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "Blocca siti per i quali sono stati riportati attacchi",
        ff_block_attack_sites_DESC : "Prima di aprire un sito Web, FireFox verifica che questo non sia presente in un elenco di indirizzi associati con software dannoso e hacker.",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "Attivato",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "Disattivato",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "Blocca siti Web segnalati come falsi",
        ff_block_web_forgeries_DESC : "Prima di aprire un sito Web, FireFox verifica che questo non sia presente in un elenco di indirizzi associati con frodi online.",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "Attivato",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "Disattivato",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "Invia richieste di Non tracciare ai siti visitati in Internet Explorer",
        ie_do_not_track_DESC : "Non tutti i siti Web rispetteranno questa richiesta di non tracciare le attività online dell'utente.",
        ie_do_not_track_value_0_POSSIBLEVALUE : "Disattivato",
        ie_do_not_track_value_1_POSSIBLEVALUE : "Attivato",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "Attiva Filtro SmartScreen",
        ie_phishing_protect_DESC : "Prima di aprire un sito Web, Internet Explorer verifica che questo non sia presente in un elenco di indirizzi associati con frodi online.",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "Disattivato",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "Attivato",
        
        // ie_remember_password
        ie_remember_password_TITLE : "Usa il completamento automatico per nomi utente e password nei moduli",
        ie_remember_password_DESC : "Software e siti Web dannosi possono sfruttare le informazioni personali salvate in Internet Explorer.",
        ie_remember_password_value_0_POSSIBLEVALUE : "Disattivato",
        ie_remember_password_value_1_POSSIBLEVALUE : "Attivato",
        
        // ie_private_mode
        ie_private_mode_TITLE : "Disattiva barre degli strumenti ed estensioni all'avvio di InPrivate Browsing",
        ie_private_mode_DESC : "La disattivazione di queste funzioni aggiuntive aiuta a garantire che non rimanga traccia delle attività online dell'utente quando si usa InPrivate Browsing.",
        ie_private_mode_value_0_POSSIBLEVALUE : "Disattivato",
        ie_private_mode_value_1_POSSIBLEVALUE : "Attivato",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "Visibilità dell'app e utenza del post",
        fb_app_titleArea_radio_wording_apply_all: "chi può visualizzare %NUM% app e i relativi post?",
        fb_app_titleArea_radio_wording_apply_all_singular: "chi può visualizzare 1 app e i relativi post?",
        fb_app_titleArea_radio_wording_apply_individ:"chi può visualizzare ogni app e i relativi post?",
        fb_app_titleArea_title_wording_detail_tooltip:"Questa impostazione controlla chi può vedere su Facebook che utilizzi questa app. Inoltre consente di scegliere l'utenza per i post creati dall'app per tuo conto.",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"Questa opzione rimuove l'app dall'account Facebook. L'app non sarà più presente tra i segnalibri o nell'elenco di app utilizzate (riportate nelle impostazioni personali). <a href='https://www.facebook.com/help/234899866630865' target='_blank'>Ulteriori informazioni</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"Amici",
        fb_app_level_FriendsOfFriends_wording:"Amici di amici",
        fb_app_level_public_wording:"Pubblica",
        fb_app_level_onlyme_wording:"Solo io",
        fb_app_extend_wording:"Mostra dettagli",
        fb_app_unextend_wording:"Nascondi dettagli",
        fb_app_remove_tooltip:"Rimuovi app da Facebook",
        fb_app_remove_title:"Rimuovere %APPNAME% da Facebook?",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"Google+ non supporta Internet Explorer 8. Aprire Google+ in un altro browser oppure aggiornare Microsoft Internet Explorer all'ultima versione.",
        fb_twitter_on_IE9:"X non supporta Internet Explorer 9 e versioni precedenti. Apri X in un altro browser oppure effettua l'aggiornamento alla versione più recente di Microsoft Internet Explorer.",

        // Twitter wordings
        tw_str_fix_pop1:"Per continuare, accedi alla scheda X visualizzata nella finestra del browser e fornisci la password di X.", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"Una volta confermata la password, fare clic su OK per risolvere il problema."
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
