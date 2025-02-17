(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "Obtener ayuda",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=ES-ES&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "No se puede conectar a Internet. Compruebe la conexión y vuelva a intentarlo.",
        PROMOTE_TITANIUM_CONTENT : "Obtenga la protección de Trend Micro para garantizar la privacidad en Facebook,X y LinkedIn.",
        PROMOTE_TITANIUM_URL : "http://es.trendmicro.com/es/home/",
        OVERLAY_OK : "Aceptar",
        OVERLAY_SCAN : "Explorar",
        OVERLAY_SIGN_IN : "Iniciar sesión",
        OVERLAY_CANCEL : "Cancelar",
        OVERLAY_REMOVE : "Eliminar",
        
        OVERLAY_CHECKNOW : "Comprobar ahora",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Parece que se ha cambiado a otra cuenta de Facebook. ¿Desea comprobar esta?",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Parece que ha cambiado a otra cuenta de X. ¿Quiere que se compruebe esta cuenta en lugar de la otra?",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Parece que se ha cambiado a otra cuenta de Google+. ¿Desea comprobar esta?",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Parece que ha cambiado a una cuenta de LinkedIn diferente. ¿Desea comprobarla?",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "Ahora que ha confirmado su contraseña, haga clic en el botón para ver los resultados.",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "Ahora que ha iniciado la sesión, haga clic en Aceptar para ver los resultados.",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Ahora que ha iniciado sesión en la cuenta correcta, haga clic en el botón que aparece a continuación.",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Ahora que ha iniciado sesión en la cuenta correcta, haga clic en el botón que aparece a continuación.",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Ahora que ha iniciado sesión en la cuenta correcta, haga clic en el botón que aparece a continuación.",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Ahora que ha iniciado sesión en la cuenta correcta, haga clic en el botón que aparece a continuación.",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "Una vez que el sitio Web de Facebook se vuelva a abrir de forma automática, manténgalo abierto para explorar la configuración.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "Una vez que el sitio Web de X se vuelva a abrir de forma automática, manténgalo abierto para explorar la configuración.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "Una vez que el sitio Web de Google+ se vuelva a abrir de forma automática, manténgalo abierto para explorar la configuración.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "Una vez que el sitio Web de LinkedIn se vuelva a abrir de forma automática, manténgalo abierto para explorar la configuración.",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "No se puede conectar a Internet. Compruebe la conexión y vuelva a intentarlo.",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "Para su seguridad, debe facilitar de nuevo su contraseña de X para confirmar estos cambios. Haga clic en el botón para continuar.",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "No volver a mencionar esto",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "Para su seguridad, debe volver a iniciar sesión en LinkedIn para confirmar estos cambios. Haga clic en el botón para continuar.",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "¿No es su cuenta?",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "Inicie sesión con la correcta.",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "Tiene %d problemas de privacidad.",
        CONCERN_TITLE_ONE_CONCERN : "Tiene %d problema de privacidad.",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "Solucionar todos",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "Ayude a sus amigos a proteger su privacidad",
        SHARE_TOOTHERS_SNS_TITLE : "El Explorador de privacidad de Trend Micro ayuda a proteger la privacidad en las redes sociales. Pruébelo.",
        SHARE_TOOTHERS_BROWSER_TITLE : "El Explorador de privacidad de Trend Micro ayuda a aumentar la seguridad del explorador Web. Pruébelo.",
        SHARE_TOOTHERS_LINK : "http://es.trendmicro.com/es/home/",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(más información)",
        SETTING_ITEM_RECOMMENDED : "(Recomendado)",
        SETTING_ITEM_ON : "Activado",
        SETTING_ITEM_OFF : "Desactivado",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "La gente puede ver su información personal",
        CATEGORY_Strangers_can_easily_track_you : "Personas desconocidas pueden seguirlo fácilmente",
        CATEGORY_You_can_be_tagged_without_your_permission : "Se le puede etiquetar sin su permiso",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "La gente que no está en Facebook puede ver su información",
        CATEGORY_People_can_see_where_you_were : "La gente puede ver dónde ha estado",
        CATEGORY_People_can_download_your_photos : "La gente puede descargar sus fotos",
        CATEGORY_Advertizers_can_learn_more_about_you : "Los anunciantes pueden obtener más información sobre usted",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "La gente que no está en LinkedIn puede ver su información",
        CATEGORY_Strangers_could_monitor_your_connection : "Personas extrañas pueden supervisar su conexión",
        CATEGORY_Browser_phishing_protect : "Protección contra phishing",
        CATEGORY_Application_access : "Los demás pueden ver %NUM% aplicación y sus publicaciones",
        CATEGORY_Application_access_plural : "Los demás pueden ver %NUM% aplicaciones y sus publicaciones",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "Cambios efectuados:",
        SAVE_CHANGES_BUTTON_TITLE : "Guardar cambios",
        SAVE_CHANGES_TWITTER_HINT : "Cuando esté preparado para realizar los cambios, haga clic en el botón y confirme su contraseña de X.",
        SAVE_CHANGES_FIRSTTIME_HINT : "Haga clic aquí cuando esté listo para guardar los cambios",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "Buen trabajo. No tiene ningún problema de privacidad, pero es posible que sus amigos necesiten ayuda...",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "Solucionar todos",
        QUICKFIX_DESCRIPTION : "Para ayudar a proteger su privacidad, se realizarán los siguientes cambios en la configuración.",
        QUICKFIX_SETTING : "Configuración",
        QUICKFIX_CHANGES : "Cambios",
        QUICKFIX_CURRENT : "Actual",
        QUICKFIX_NEW : "Nueva",
        QUICKFIX_FIXALL_BUTTON : "Solucionar",
        QUICKFIX_FIXALL_CANCEL : "Cancelar",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "Explorador de privacidad",
        HTML_TITLE_FACEBOOK : "Facebook",
        HTML_TITLE_TWITTER : "X",
        HTML_TITLE_GOOGLEPLUS : "Google+",
        HTML_TITLE_LINKEDIN : "LinkedIn",
        HTML_TITLE_CHROME : "Google Chrome",
        HTML_TITLE_FIREFOX : "Firefox",
        HTML_TITLE_INTERNET_EXPLORER : "Internet Explorer",
        HTML_CONCERNS_UNKNOWN : "?",
        HTML_FOOTER_TREND_DOT_COM : "Trend Micro",
        HTML_FOOTER_TREND_DOT_COM_LINK : "http://es.trendmicro.com/es/home/",
        HTML_FOOTER_COPYRIGHT : "Copyright © 2023 Trend Micro Incorporated. Reservados todos los derechos.",
        
        SNS_AREA_TITLE : "Sitios de redes sociales",
        BROWSERS_AREA_TITLE : "Exploradores",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "Sentimos las molestias, pero debemos hacer algunas mejoras para estar al día con los cambios recientes en esta red social. Mientras tanto, puede comprobar una de sus otras cuentas.",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "Active Trend Micro Toolbar para comprobar su privacidad.",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=ES-ES",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "Inicie sesión para comprobar su privacidad.",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "Para comprobar su privacidad, inicie sesión primero y recuerde marcar la casilla \"No cerrar sesión\".",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "Para resolver sus dudas sobre privacidad, inicie sesión primero y recuerde marcar la casilla \"No cerrar sesión\".",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "Más información.",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "Se ha producido un error. Vuelva a intentarlo más tarde.",
        ALERT_SIGN_IN_TO_FIX_TITLE : "Inicie sesión para solucionar problemas de privacidad.",
        ALERT_SIGN_IN_BUTTON : "Iniciar sesión",
        ALERT_TRY_AGAIN_BUTTON : "Volver a intentarlo",
        GET_MORE_HELP : "Haga clic aquí para obtener más ayuda.",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "Si sigue apareciendo este mensaje, haga clic aquí para obtener ayuda.",
        ALERT_BUY_TITANIUM_BUTTON : "Comprar ahora",
        ALERT_RESTART_BUTTON : "Reiniciar",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "Trend Micro PrivacyScanner ha tenido problemas con Google Chrome.",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "Haga clic aquí para obtener instrucciones sencillas para solucionar el problema.",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "Reinicie Google Chrome para aplicar los cambios.",
        FIREFOX_RESTART_TITLE : "Reinicie Firefox para aplicar los cambios.",
        INTERNET_EXPLORER_RESTART_TITLE : "Reinicie Internet Explorer para aplicar los cambios.",
        
        CHROME_STOP_TITLE : "Google Chrome debe cerrarse ahora para aplicar los cambios.",
        FIREFOX_STOP_TITLE : "Firefox debe cerrarse ahora para aplicar los cambios.",
        INTERNET_EXPLORER_STOP_TITLE : "Internet Explorer debe cerrarse ahora para aplicar los cambios.",
        
        ALERT_APPLY_CLOSE_BUTTON : "Aplicar ahora",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "Aplicar más tarde",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "Reinicie Google Chrome para aplicar los cambios.",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "Reinicie Firefox para aplicar los cambios.",
        RESTART_IE_LATER_OR_NOT_TITLE : "Reinicie Internet Explorer para aplicar los cambios.",
        ALERT_RESTART_NOW : "Reiniciar ahora",
        ALERT_RESTART_LATER : "Reiniciar más tarde",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "Debe cerrar Google Chrome para que los cambios surtan efecto. Puede hacerlo ahora o más tarde.",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "Debe cerrar Firefox para que los cambios surtan efecto. Puede hacerlo ahora o más tarde.",
        CLOSE_IE_LATER_OR_NOT_TITLE : "Debe cerrar Internet Explorer para que los cambios surtan efecto. Puede hacerlo ahora o más tarde.",
        ALERT_CLOSE_NOW : "Cambiar ahora",
        ALERT_CLOSE_LATER : "Cambiar luego",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "Debe iniciar su software de seguridad de Trend Micro para explorar Internet Explorer.",
        ERROR_CHROME_LAUNCH_TI_FIRST : "Debe iniciar su software de seguridad de Trend Micro para explorar Google Chrome.",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "Debe iniciar su software de seguridad de Trend Micro para explorar Firefox.",
        
        ERROR_IE_VERSION_TOO_LOW : "Actualícese a la última versión de Microsoft Internet Explorer antes de hacer clic en el botón que se muestra a continuación.",
        
        ERROR_DEFAULT_TITLE : "Se ha producido un error. Vuelva a intentarlo más tarde.",
        ERROR_DEFAULT_LEARN_MORE : "Más información",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "Actualice el explorador Microsoft Internet Explorer a la última versión.",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "Envíe una solicitud de no seguimiento con el tráfico de navegación.",
        cr_do_not_track_DESC : "No todos los sitios Web aceptarán su solicitud de no realizar un seguimiento de lo que hace en línea.",
        cr_do_not_track_value_0_POSSIBLEVALUE : "Activado",
        cr_do_not_track_value_1_POSSIBLEVALUE : "Desactivado",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "Preguntarme si deseo guardar las contraseñas que introduzco en Internet.",
        cr_remember_sign_on_DESC : "Los sitios Web y el software malicioso pueden sacar provecho de la información personal almacenada en Google Chrome.",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "Activado",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "Desactivado",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "Activar la protección contra phishing y malware.",
        cr_phishing_protect_DESC : "Antes de abrir un sitio Web, Google Chrome se asegurará de que este no aparece en ninguna lista de direcciones asociadas con software malicioso y fraude en línea.",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "Activado",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "Desactivado",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "¿Qué debe hacer el explorador si los sitios Web intentan realizar un seguimiento de lo que hace?",
        ff_do_not_track_DESC : "No todos los sitios Web aceptarán su solicitud de no realizar un seguimiento de lo que hace en línea.",
        ff_do_not_track_value_0_POSSIBLEVALUE : "Evitar seguimiento",
        ff_do_not_track_value_1_POSSIBLEVALUE : "Permitir seguimiento",
        ff_do_not_track_value_2_POSSIBLEVALUE : "No expresar ninguna preferencia",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "Recordar contraseñas",
        ff_remember_sign_on_DESC : "Los sitios Web y el software malicioso pueden sacar provecho de la información personal almacenada en FireFox.",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "Activado",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "Desactivado",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "Bloquear sitios de ataque notificados",
        ff_block_attack_sites_DESC : "Antes de abrir un sitio Web, Firefox se asegurará de que este no aparece en ninguna lista de direcciones asociadas con software malicioso y hackers.",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "Activado",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "Desactivado",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "Bloquear falsificaciones Web notificadas",
        ff_block_web_forgeries_DESC : "Antes de abrir un sitio Web, FireFox se asegurará de que este no aparece en ninguna lista de direcciones asociadas con el fraude en línea.",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "Activado",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "Desactivado",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "Enviar solicitudes de no seguimiento a los sitios que visite con Internet Explorer",
        ie_do_not_track_DESC : "No todos los sitios Web aceptarán su solicitud de no realizar un seguimiento de lo que hace en línea.",
        ie_do_not_track_value_0_POSSIBLEVALUE : "Desactivado",
        ie_do_not_track_value_1_POSSIBLEVALUE : "Activado",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "Activar filtro SmartScreen",
        ie_phishing_protect_DESC : "Antes de abrir un sitio Web, Internet Explorer se asegurará de que este no aparece en ninguna lista de direcciones asociadas con el fraude en línea.",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "Desactivado",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "Activado",
        
        // ie_remember_password
        ie_remember_password_TITLE : "Utilizar la función Autocompletar para nombres de usuario y contraseñas en formularios",
        ie_remember_password_DESC : "Los sitios Web y el software malicioso pueden sacar provecho de la información personal almacenada en Internet Explorer.",
        ie_remember_password_value_0_POSSIBLEVALUE : "Desactivado",
        ie_remember_password_value_1_POSSIBLEVALUE : "Activado",
        
        // ie_private_mode
        ie_private_mode_TITLE : "Desactivar las barras de herramientas y extensiones al iniciar la exploración de InPrivate",
        ie_private_mode_DESC : "Al desactivar estas funciones adicionales, se asegurará de que no se realiza ningún seguimiento de sus actividades en línea cuando utilice la exploración de InPrivate.",
        ie_private_mode_value_0_POSSIBLEVALUE : "Desactivado",
        ie_private_mode_value_1_POSSIBLEVALUE : "Activado",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "Visibilidad de la aplicación y audiencia de las publicaciones",
        fb_app_titleArea_radio_wording_apply_all: "¿Quién puede ver las %NUM% aplicaciones y sus publicaciones?",
        fb_app_titleArea_radio_wording_apply_all_singular: "¿Quién puede ver una aplicación y sus publicaciones?",
        fb_app_titleArea_radio_wording_apply_individ:"¿Quién puede ver cada aplicación y sus publicaciones?",
        fb_app_titleArea_title_wording_detail_tooltip:"Esta opción controla quién puede ver que usa esta aplicación en Facebook. También le permite elegir el público del contenido que publica la aplicación en su nombre.",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"Esto eliminará la aplicación de su cuenta de Facebook. La aplicación ya no aparecerá en los marcadores ni en la lista de aplicaciones que usa (se encuentra en la configuración). <a href='https://www.facebook.com/help/234899866630865' target='_blank'>Más información</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"Amigos",
        fb_app_level_FriendsOfFriends_wording:"Amigos de amigos",
        fb_app_level_public_wording:"Público",
        fb_app_level_onlyme_wording:"Solo yo",
        fb_app_extend_wording:"Mostrar más",
        fb_app_unextend_wording:"Mostrar menos",
        fb_app_remove_tooltip:"Eliminar aplicación de Facebook",
        fb_app_remove_title:"¿Desea eliminar %APPNAME% de Facebook?",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"Google+ no es compatible con Internet Explorer 8. Abra Google+ en otro explorador o actualice a la versión más reciente de Microsoft Internet Explorer.",
        fb_twitter_on_IE9:"X no es compatible con Explorer 9 ni con versiones anteriores. Abra X en otro navegador o actualice Microsoft Internet Explorer a la última versión.",

        // Twitter wordings
        tw_str_fix_pop1:"Para continuar, vaya a la pestaña de X que se ha abierto en la ventana del explorador y escriba su contraseña de X.", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"Cuando haya confirmado la contraseña, haga clic en Aceptar para solucionar el problema."
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
