(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "Obtenir de l'aide",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=FR-CA&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "Connexion à Internet impossible. Veuillez vérifier votre connexion puis réessayer.",
        PROMOTE_TITANIUM_CONTENT : "Obtenez une protection de Trend Micro pour protéger votre confidentialité sur Facebook, X et LinkedIn.",
        PROMOTE_TITANIUM_URL : "http://fr.trendmicro.com/fr/home/",
        OVERLAY_OK : "OK",
        OVERLAY_SCAN : "Scan",
        OVERLAY_SIGN_IN : "Se connecter",
        OVERLAY_CANCEL : "Annuler",
        OVERLAY_REMOVE : "Supprimer",
        
        OVERLAY_CHECKNOW : "Vérifier",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Vous semblez avoir changé de compte Facebook. Voulez-vous vérifier celui-ci ?",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Vous semblez avoir changé de compte X. Voulez-vous vérifier celui-ci ?",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Vous semblez avoir changé de compte Google+. Voulez-vous vérifier celui-ci ?",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Vous semblez avoir changé pour un compte LinkedIn différent. Voulez-vous plutôt vérifier celui-ci ?",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "Votre mot de passe est désormais confirmé ; cliquez sur le bouton ci-dessous pour afficher les résultats.",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "Vous êtes désormais connecté ; cliquez sur OK pour afficher les résultats.",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Vous êtes désormais connecté(e) au compte correct ; cliquez sur le bouton ci-dessous.",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Vous êtes désormais connecté(e) au compte correct ; cliquez sur le bouton ci-dessous.",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Vous êtes désormais connecté(e) au compte correct ; cliquez sur le bouton ci-dessous.",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Vous êtes désormais connecté(e) au compte correct ; cliquez sur le bouton ci-dessous.",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "Une fois que le site Facebook s'est à nouveau ouvert automatiquement, laissez-le ouvert pour permettre le scan des paramètres.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "Une fois que le site X s'est à nouveau ouvert automatiquement, laissez-le ouvert pour permettre le scan des paramètres.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "Une fois que le site Google+ s'est à nouveau ouvert automatiquement, laissez-le ouvert pour permettre le scan des paramètres.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "Une fois que le site LinkedIn s'ouvre à nouveau automatiquement, laissez-le ouvert pour permettre le scan des paramètres.",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "Connexion à Internet impossible. Veuillez vérifier votre connexion puis réessayer.",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "Afin d'assurer votre protection, vous devez nous fournir à nouveau le mot de passe de votre compte X pour confirmer ces modifications. Cliquez sur le bouton pour continuer.",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "Ne plus afficher ce message",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "Pour assurer votre protection, vous devez vous connecter à nouveau à LinkedIn pour confirmer ces modifications. Cliquez sur le bouton pour continuer.",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "Il ne s'agit pas de votre compte ?",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "Connectez-vous à l'aide du compte correct.",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "Vous avez %d problèmes potentiels de confidentialité.",
        CONCERN_TITLE_ONE_CONCERN : "Vous avez %d problème potentiel de confidentialité.",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "Tout corriger",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "Aidez vos amis à protéger leur confidentialité",
        SHARE_TOOTHERS_SNS_TITLE : "Le scan de confidentialité Trend Micro contribue à protéger ma confidentialité sur les réseaux sociaux. Essayez-le !",
        SHARE_TOOTHERS_BROWSER_TITLE : "Scan de confidentialité Trend Micro contribue à rendre mon navigateur Web plus sûr. Essayez-le !",
        SHARE_TOOTHERS_LINK : "http://fr.trendmicro.com/fr/home/",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(plus d'informations)",
        SETTING_ITEM_RECOMMENDED : "(recommandé)",
        SETTING_ITEM_ON : "Activé",
        SETTING_ITEM_OFF : "Désactivé",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "Vos informations personnelles sont visibles",
        CATEGORY_Strangers_can_easily_track_you : "Des personnes que vous ne connaissez pas peuvent facilement vous retrouver",
        CATEGORY_You_can_be_tagged_without_your_permission : "Vous pouvez être marqué(e) dans des photos sans votre consentement",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "Vos informations sont visibles en dehors de Facebook",
        CATEGORY_People_can_see_where_you_were : "Vos informations de géolocalisation sont visibles",
        CATEGORY_People_can_download_your_photos : "Vos photos peuvent être téléchargées",
        CATEGORY_Advertizers_can_learn_more_about_you : "Les annonceurs peuvent apprendre beaucoup de choses à votre sujet",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "Vos informations sont visibles en dehors de LinkedIn",
        CATEGORY_Strangers_could_monitor_your_connection : "Des personnes que vous ne connaissez pas peuvent surveiller votre connexion",
        CATEGORY_Browser_phishing_protect : "Anti-phishing",
        CATEGORY_Application_access : "L'internaute peut voir %NUM% application et ses publications",
        CATEGORY_Application_access_plural : "L'internaute peut voir %NUM% applications et leurs publications",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "Modifications effectuées :",
        SAVE_CHANGES_BUTTON_TITLE : "Enregistrer les modifications",
        SAVE_CHANGES_TWITTER_HINT : "Lorsque vous êtes prêt(e) à appliquer les modifications, cliquez sur le bouton et confirmez votre mot de passe X.",
        SAVE_CHANGES_FIRSTTIME_HINT : "Cliquez ici lorsque vous êtes prêt(e) à enregistrer les modifications apportées ci-dessous",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "Bien joué ! Vous n'avez aucun problème potentiel de confidentialité, mais vos amis ont peut-être besoin d'aide...",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "Tout corriger",
        QUICKFIX_DESCRIPTION : "Pour contribuer à la protection de votre confidentialité, les modifications suivantes ont été apportées à vos paramètres.",
        QUICKFIX_SETTING : "Paramètres",
        QUICKFIX_CHANGES : "Modifications",
        QUICKFIX_CURRENT : "Actuellement",
        QUICKFIX_NEW : "Nouveau",
        QUICKFIX_FIXALL_BUTTON : "Corriger",
        QUICKFIX_FIXALL_CANCEL : "Annuler",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "Scan de confidentialité",
        HTML_TITLE_FACEBOOK : "Facebook",
        HTML_TITLE_TWITTER : "X",
        HTML_TITLE_GOOGLEPLUS : "Google+",
        HTML_TITLE_LINKEDIN : "LinkedIn",
        HTML_TITLE_CHROME : "Google Chrome",
        HTML_TITLE_FIREFOX : "Firefox",
        HTML_TITLE_INTERNET_EXPLORER : "Internet Explorer",
        HTML_CONCERNS_UNKNOWN : "?",
        HTML_FOOTER_TREND_DOT_COM : "Trend Micro",
        HTML_FOOTER_TREND_DOT_COM_LINK : "http://fr.trendmicro.com/fr/home/",
        HTML_FOOTER_COPYRIGHT : "Copyright ©️ 2023 Trend Micro Incorporated. Tous droits réservés.",
        
        SNS_AREA_TITLE : "Sites de réseaux sociaux",
        BROWSERS_AREA_TITLE : "Navigateurs",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "Nous avons quelques améliorations à effectuer afin de nous adapter aux changements apportés récemment sur ce réseau social. Veuillez nous excuser pour tout désagrément occasionné. En attendant, vous pouvez vérifier l'un de vos autres comptes.",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "Activez la barre d'outils Trend Micro Toolbar pour vérifier vos paramètres de confidentialité.",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=FR-CA",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "Connectez-vous pour vérifier vos paramètres de confidentialité.",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "Pour vérifier vos paramètres de confidentialité, connectez-vous tout d'abord et n'oubliez pas de cocher la case « Garder ma session ouverte ».",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "Pour corriger les soucis de confidentialité rencontrés, connectez-vous tout d'abord et n'oubliez pas de cocher la case « Garder ma session ouverte ».",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "En savoir plus.",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "Une erreur s'est produite. Réessayez ultérieurement.",
        ALERT_SIGN_IN_TO_FIX_TITLE : "Veuillez vous connecter pour corriger tout problème potentiel de confidentialité.",
        ALERT_SIGN_IN_BUTTON : "Se connecter",
        ALERT_TRY_AGAIN_BUTTON : "Réessayer",
        GET_MORE_HELP : "Cliquez ici pour obtenir de l'aide.",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "Si ce message s'affiche en continu, cliquez ici pour obtenir de l'aide.",
        ALERT_BUY_TITANIUM_BUTTON : "Acheter maintenant",
        ALERT_RESTART_BUTTON : "Redémarrer",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "Le scan de confidentialité Trend Micro a rencontré un problème dans Google Chrome.",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "Cliquez ici pour obtenir des instructions de dépannage rapide du problème.",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "Redémarrer Google Chrome pour appliquer les modifications.",
        FIREFOX_RESTART_TITLE : "Redémarrer Firefox pour appliquer les modifications.",
        INTERNET_EXPLORER_RESTART_TITLE : "Redémarrer Internet Explorer pour appliquer les modifications.",
        
        CHROME_STOP_TITLE : "Google Chrome doit maintenant être fermé pour appliquer les modifications.",
        FIREFOX_STOP_TITLE : "Firefox Chrome doit maintenant fermer pour appliquer les modifications.",
        INTERNET_EXPLORER_STOP_TITLE : "Internet Explorer doit maintenant fermer pour appliquer les modifications.",
        
        ALERT_APPLY_CLOSE_BUTTON : "Appliquer maintenant",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "Appliquer ultérieurement",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "Redémarrer Google Chrome pour appliquer les modifications.",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "Redémarrer Firefox pour appliquer les modifications.",
        RESTART_IE_LATER_OR_NOT_TITLE : "Redémarrer Internet Explorer pour appliquer les modifications.",
        ALERT_RESTART_NOW : "Redémarrer maintenant",
        ALERT_RESTART_LATER : "Redémarrer ultérieurement",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "Pour que les modifications prennent effet, vous devez fermer Google Chrome. Vous pouvez faire cela maintenant ou remettre à plus tard.",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "Pour que les modifications prennent effet, vous devez fermer Firefox. Vous pouvez faire cela maintenant ou remettre à plus tard.",
        CLOSE_IE_LATER_OR_NOT_TITLE : "Pour que les modifications prennent effet, vous devez fermer Internet Explorer. Vous pouvez faire cela maintenant ou remettre à plus tard.",
        ALERT_CLOSE_NOW : "Modifier maintenant",
        ALERT_CLOSE_LATER : "Modifier ultérieurement",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "Vous devez lancez le logiciel de sécurité Trend Micro pour scanner Internet Explorer.",
        ERROR_CHROME_LAUNCH_TI_FIRST : "Vous devez lancez le logiciel de sécurité Trend Micro pour scanner Google Chrome.",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "Vous devez lancez le logiciel de sécurité Trend Micro pour scanner Firefox.",
        
        ERROR_IE_VERSION_TOO_LOW : "Veuillez effectuer la mise à niveau vers la version la plus récente de Microsoft Internet Explorer avant de cliquer sur le bouton ci-dessous.",
        
        ERROR_DEFAULT_TITLE : "Une erreur s'est produite. Veuillez réessayer ultérieurement.",
        ERROR_DEFAULT_LEARN_MORE : "En savoir plus",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "Veuillez effectuer la mise à niveau vers la version la plus récente de Microsoft Internet Explorer.",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "Envoyer une demande 'Do Not Track' avec votre trafic de navigation.",
        cr_do_not_track_DESC : "Les sites Web ne respecteront pas tous votre demande d'éviter de suivre ce que vous faites en ligne.",
        cr_do_not_track_value_0_POSSIBLEVALUE : "Activé",
        cr_do_not_track_value_1_POSSIBLEVALUE : "Désactivé",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "Proposer d'enregistrer les mots de passe que je saisis sur le Web.",
        cr_remember_sign_on_DESC : "Les sites Web et les logiciels malveillants peuvent tirer parti des informations personnelles enregistrées dans Google Chrome.",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "Activé",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "Inactif",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "Activer la protection contre le phishing et les programmes malveillants.",
        cr_phishing_protect_DESC : "Avant d'ouvrir un site Web, Google Chrome s'assure qu'il n'apparaît pas dans une liste d'adresses associées à des logiciels malveillants et à la fraude en ligne.",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "Activé",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "Désactivé",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "Comment le navigateur doit-il répondre lorsque des sites Web essayent de garder un suivi de vos actions ?",
        ff_do_not_track_DESC : "Les sites Web ne respecteront pas tous votre demande d'éviter de suivre ce que vous faites en ligne.",
        ff_do_not_track_value_0_POSSIBLEVALUE : "Empêcher le suivi",
        ff_do_not_track_value_1_POSSIBLEVALUE : "Autoriser le suivi",
        ff_do_not_track_value_2_POSSIBLEVALUE : "N'exprimer aucune préférence",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "Se souvenir des mots de passe pour les sites",
        ff_remember_sign_on_DESC : "Les sites Web et les logiciels malveillants peuvent tirer parti des informations personnelles enregistrées dans Firefox.",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "Activé",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "Désactivé",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "Bloquer les sites pour lesquels des attaques ont été rapportées",
        ff_block_attack_sites_DESC : "Avant d'ouvrir un site Web, Firefox s'assure qu'il n'apparaît pas dans une liste d'adresses associées à des logiciels malveillants et à la fraude en ligne.",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "Activé",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "Désactivé",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "Bloquer les contrefaçons Web signalées",
        ff_block_web_forgeries_DESC : "Avant d'ouvrir un site Web, Firefox s'assure qu'il n'apparaît pas dans une liste d'adresses associées à la fraude en ligne.",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "Activé",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "Désactivé",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "Envoyer des demandes Do Not Track aux sites que vous visitez dans Internet Explorer",
        ie_do_not_track_DESC : "Les sites Web ne respecteront pas tous votre demande d'éviter de suivre ce que vous faites en ligne.",
        ie_do_not_track_value_0_POSSIBLEVALUE : "Désactivé",
        ie_do_not_track_value_1_POSSIBLEVALUE : "Activé",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "Activer le filtre SmartScreen",
        ie_phishing_protect_DESC : "Avant d'ouvrir un site Web, Internet Explorer s'assure qu'il n'apparaît pas dans une liste d'adresses associées à la fraude en ligne.",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "Désactivé",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "Activé",
        
        // ie_remember_password
        ie_remember_password_TITLE : "Utiliser AutoComplete pour les noms d'utilisateur et mot de passe sur les formulaires",
        ie_remember_password_DESC : "Les sites Web et les logiciels malveillants peuvent tirer parti des informations personnelles enregistrées dans Internet Explorer.",
        ie_remember_password_value_0_POSSIBLEVALUE : "Désactivé",
        ie_remember_password_value_1_POSSIBLEVALUE : "Activé",
        
        // ie_private_mode
        ie_private_mode_TITLE : "Désactiver les barres d'outils et les extensions au démarrage de la navigation InPrivate Browsing",
        ie_private_mode_DESC : "La désactivation de ces fonctions supplémentaires vous aide à garantir qu'aucune trace de vos activités en ligne ne subsistera lorsque vous utilisez InPrivate Browsing.",
        ie_private_mode_value_0_POSSIBLEVALUE : "Désactivé",
        ie_private_mode_value_1_POSSIBLEVALUE : "Activé",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "Visibilité des applications et audience des publications",
        fb_app_titleArea_radio_wording_apply_all: "qui peut voir les %NUM% applications et leurs publications ?",
        fb_app_titleArea_radio_wording_apply_all_singular: "qui peut voir l'application et ses publications ?",
        fb_app_titleArea_radio_wording_apply_individ:"qui peut voir chaque application et ses publications ?",
        fb_app_titleArea_title_wording_detail_tooltip:"Ce paramètre détermine les personnes sur Facebook qui peuvent voir que vous utilisez cette application. Il vous permet également de choisir l'audience des publications, que l'application effectue pour votre compte.",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"Cette opération supprime l'application de votre compte Facebook. L'application ne figurera plus dans vos signets ou dans la liste des applications que vous utilisez (située dans vos paramètres). <a href='https://www.facebook.com/help/234899866630865' target='_blank'>En savoir plus</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"Amis",
        fb_app_level_FriendsOfFriends_wording:"Amis et leurs amis",
        fb_app_level_public_wording:"Public",
        fb_app_level_onlyme_wording:"Moi uniquement",
        fb_app_extend_wording:"Afficher plus",
        fb_app_unextend_wording:"Afficher moins",
        fb_app_remove_tooltip:"Supprimer l'application de Facebook",
        fb_app_remove_title:"Supprimer %APPNAME% de Facebook ?",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"Google+ ne prend pas en charge Internet Explorer 8. Veuillez ouvrir Google+ dans un autre navigateur ou effectuer la mise à niveau vers la version la plus récente de Microsoft Internet Explorer.",
        fb_twitter_on_IE9:"X ne prend pas en charge Internet Explorer 9 et versions antérieures. Ouvrez X dans un autre navigateur ou mettez à niveau vers la version la plus récente de Microsoft Internet Explorer.",

        // Twitter wordings
        tw_str_fix_pop1:"Pour continuer, accédez à l'onglet X qui s'affiche dans la fenêtre de votre navigateur et indiquez votre mot de passe X.", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"Après avoir confirmé votre mot de passe, cliquez sur OK pour corriger le problème."
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
