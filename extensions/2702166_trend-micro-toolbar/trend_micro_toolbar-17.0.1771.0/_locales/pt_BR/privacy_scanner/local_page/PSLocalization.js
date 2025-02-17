(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "Obter ajuda",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=PT-BR&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "Não é possível conectar-se à Internet. Verifique sua conexão e tente novamente.",
        PROMOTE_TITANIUM_CONTENT : "Obtenha proteção da Trend Micro para proteger sua privacidade no Facebook, no X e no LinkedIn.",
        PROMOTE_TITANIUM_URL : "http://br.trendmicro.com",
        OVERLAY_OK : "OK",
        OVERLAY_SCAN : "Executar varredura",
        OVERLAY_SIGN_IN : "Entrar",
        OVERLAY_CANCEL : "Cancelar",
        OVERLAY_REMOVE : "Remover",
        
        OVERLAY_CHECKNOW : "Verificar Agora",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Você parece ter mudado para uma outra conta de Facebook. Você deseja verificar esta como alternativa?",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Parece que você mudou para uma conta do X diferente. Gostaria de verificar essa ao invés da anterior?",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Você parece ter mudado para uma outra conta de Google+. Você deseja verificar esta como alternativa?",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Você parece ter mudado para uma conta LinkedIn diferente. Deseja marcar esta?",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "Agora a senha foi confirmada, clique no botão para ver os resultados.",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "Agora que você se conectou, clique em OK para ver os resultados.",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Agora que você se conectou à conta correta, clique no botão abaixo.",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Agora que você se conectou à conta correta, clique no botão abaixo.",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Agora que você se conectou à conta correta, clique no botão abaixo.",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Agora que você se conectou à conta correta, clique no botão abaixo.",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "Quando o site do Facebook reabrir automaticamente, mantenha-o aberto para explorar as configurações.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "Quando o site do X reabrir automaticamente, mantenha-o aberto para explorar as configurações.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "Quando o site do Google+ reabrir automaticamente, mantenha-o aberto para explorar as configurações.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "Quando o site do LinkedIn reabrir automaticamente, mantenha-o aberto para explorar as configurações.",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "Não é possível conectar-se à Internet. Verifique sua conexão e tente novamente.",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "Para sua proteção, agora você deve fornecer sua senha do X para confirmar essas alterações. Clique no botão para prosseguir.",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "N'ão mencione isso novamente",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "Para a sua proteção, você deve entrar no LinkedIn novamente para confirmar essas alterações. Clique no botão para continuar.",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "Não é a sua conta?",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "Entre com a conta correta.",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "Você tem %d preocupações de privacidade.",
        CONCERN_TITLE_ONE_CONCERN : "Você tem %d preocupações de privacidade.",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "Reparar tudo",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "Ajude os amigos a protegerem a privacidade deles",
        SHARE_TOOTHERS_SNS_TITLE : "A Varredura de Privacidade Trend Micro ajuda a proteger minha privacidade em redes sociais. Experimente.",
        SHARE_TOOTHERS_BROWSER_TITLE : "A Varredura de Privacidade Trend Micro ajuda a tornar o meu navegador da Web mais seguro. Experimente.",
        SHARE_TOOTHERS_LINK : "http://br.trendmicro.com",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(mais informações)",
        SETTING_ITEM_RECOMMENDED : "(Recomendado)",
        SETTING_ITEM_ON : "Ativado",
        SETTING_ITEM_OFF : "Desativado",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "As pessoas podem ver suas informações pessoais",
        CATEGORY_Strangers_can_easily_track_you : "Pessoas estranhas podem facilmente rastrear você",
        CATEGORY_You_can_be_tagged_without_your_permission : "Você poderá ser marcado sem permissão",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "As pessoas de fora do Facebook poderão ver suas informações",
        CATEGORY_People_can_see_where_you_were : "As pessoas poderão ver onde você esteve",
        CATEGORY_People_can_download_your_photos : "As pessoas poderão baixar suas fotos",
        CATEGORY_Advertizers_can_learn_more_about_you : "Os anunciantes podem saber mais sobre você",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "As pessoas de fora do LinkedIn podem ver suas informações",
        CATEGORY_Strangers_could_monitor_your_connection : "Desconhecidos poderiam monitorar sua conexão",
        CATEGORY_Browser_phishing_protect : "Antiphishing",
        CATEGORY_Application_access : "As pessoas podem ver %NUM% aplicativo e os posts referentes a ele",
        CATEGORY_Application_access_plural : "As pessoas podem ver %NUM% aplicativos e os posts referentes a eles",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "Alterações feitas:",
        SAVE_CHANGES_BUTTON_TITLE : "Salvar alterações",
        SAVE_CHANGES_TWITTER_HINT : "Quando estiver pronto para fazer as alterações, clique no botão e confirme a senha do X.",
        SAVE_CHANGES_FIRSTTIME_HINT : "Clique aqui quando estiver pronto para salvar as alterações abaixo",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "Bom trabalho. Você não tem nenhuma preocupação de privacidade, mas seus amigos podem precisar de ajuda...",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "Reparar tudo",
        QUICKFIX_DESCRIPTION : "Para ajudar a proteger sua privacidade, serão feitas as seguintes alterações em suas configurações.",
        QUICKFIX_SETTING : "Configurações",
        QUICKFIX_CHANGES : "Alterações",
        QUICKFIX_CURRENT : "Atual",
        QUICKFIX_NEW : "Novo",
        QUICKFIX_FIXALL_BUTTON : "Reparar",
        QUICKFIX_FIXALL_CANCEL : "Cancelar",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "Varredura de privacidade",
        HTML_TITLE_FACEBOOK : "Facebook",
        HTML_TITLE_TWITTER : "X",
        HTML_TITLE_GOOGLEPLUS : "Google+",
        HTML_TITLE_LINKEDIN : "LinkedIn",
        HTML_TITLE_CHROME : "Google Chrome",
        HTML_TITLE_FIREFOX : "Firefox",
        HTML_TITLE_INTERNET_EXPLORER : "Internet Explorer",
        HTML_CONCERNS_UNKNOWN : "?",
        HTML_FOOTER_TREND_DOT_COM : "Trend Micro",
        HTML_FOOTER_TREND_DOT_COM_LINK : "http://br.trendmicro.com",
        HTML_FOOTER_COPYRIGHT : "Copyright © 2023 Trend Micro Incorporated. Todos os direitos reservados.",
        
        SNS_AREA_TITLE : "Sites de redes sociais",
        BROWSERS_AREA_TITLE : "Navegadores",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "Desculpe o transtorno, mas temos que fazer algumas melhorias aqui para acompanhar as mudanças recentes a esta rede social. Enquanto isso, você pode verificar em uma de suas outras contas como alternativa.",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "Ative a Trend Micro Toolbar para verificar sua privacidade.",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=PT-BR",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "Entre para verificar sua privacidade.",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "Para verificar a privacidade, registre-se primeiro e lembre-se de marcar a caixa de seleção \"Mantenha-me conectado\".",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "Para corrigir as preocupações de privacidade, registre-se primeiro e lembre-se de marcar a caixa de seleção \"Mantenha-me conectado\".",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "Saiba mais.",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "Ocorreu um problema. Tente novamente mais tarde.",
        ALERT_SIGN_IN_TO_FIX_TITLE : "Entre para corrigir preocupações de privacidade.",
        ALERT_SIGN_IN_BUTTON : "Entrar",
        ALERT_TRY_AGAIN_BUTTON : "Tentar novamente",
        GET_MORE_HELP : "Clique aqui para obter mais ajuda.",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "Se você continuar vendo esta mensagem, clique aqui para obter ajuda.",
        ALERT_BUY_TITANIUM_BUTTON : "Comprar Agora",
        ALERT_RESTART_BUTTON : "Reiniciar",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "Ocorreu um problema no Trend Micro PrivacyScanner com o Google Chrome.",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "Clique aqui para obter instruções fáceis sobre como resolver o problema.",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "Reinicie o Google Chrome para aplicar as alterações.",
        FIREFOX_RESTART_TITLE : "Reinicie o Firefox para aplicar as alterações.",
        INTERNET_EXPLORER_RESTART_TITLE : "Reinicie o Internet Explorer para aplicar as alterações.",
        
        CHROME_STOP_TITLE : "O Google Chrome deve ser fechado agora para aplicar as alterações.",
        FIREFOX_STOP_TITLE : "O Firefox deve ser fechado agora para aplicar as alterações.",
        INTERNET_EXPLORER_STOP_TITLE : "O Internet Explorer deve ser fechado agora para aplicar as alterações.",
        
        ALERT_APPLY_CLOSE_BUTTON : "Aplicar agora",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "Inscrever mais tarde",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "Reinicie o Google Chrome para aplicar todas as alterações.",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "Reinicie o Firefox para aplicar todas as alterações.",
        RESTART_IE_LATER_OR_NOT_TITLE : "Reinicie o Internet Explorer para aplicar todas as alterações.",
        ALERT_RESTART_NOW : "Reiniciar agora",
        ALERT_RESTART_LATER : "Reiniciar mais tarde",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "Para que as alterações tenham efeito, você deve fechar o Google Chrome. Você pode fazer isso agora ou esperar até mais tarde.",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "Para que as alterações tenham efeito, você deve fechar o Firefox. Você pode fazer isso agora ou esperar até mais tarde.",
        CLOSE_IE_LATER_OR_NOT_TITLE : "Para que as alterações tenham efeito, você deve fechar o Internet Explorer. Você pode fazer isso agora ou esperar até mais tarde.",
        ALERT_CLOSE_NOW : "Alterar agora",
        ALERT_CLOSE_LATER : "Alterar mais tarde",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "Você deve iniciar o software de segurança Trend Micro para examinar o Internet Explorer.",
        ERROR_CHROME_LAUNCH_TI_FIRST : "Você deve iniciar o software de segurança Trend Micro para examinar o Google Chrome.",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "Você deve iniciar o software de segurança Trend Micro para examinar o Firefox.",
        
        ERROR_IE_VERSION_TOO_LOW : "Atualize para a versão mais recente do Microsoft Internet Explorer antes de clicar no botão abaixo.",
        
        ERROR_DEFAULT_TITLE : "Algo deu errado. Tente novamente mais tarde.",
        ERROR_DEFAULT_LEARN_MORE : "Saiba mais",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "Por favor, atualize para a última versão do Microsoft Internet Explorer.",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "Enviar uma solicitação de 'Não rastrear' com seu tráfego de navegação.",
        cr_do_not_track_DESC : "Nem todos os sites honrarão a sua solicitação para evitar o rastreamento do que você faz on-line.",
        cr_do_not_track_value_0_POSSIBLEVALUE : "Ativado",
        cr_do_not_track_value_1_POSSIBLEVALUE : "Desativado",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "Oferecer para salvar senhas que eu acessar a Web.",
        cr_remember_sign_on_DESC : "Sites e softwares mal-intencionados podem tirar proveito das informações pessoais salvas no Google Chrome.",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "Ativado",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "Desativado",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "Ativar proteção contra phishing e malware.",
        cr_phishing_protect_DESC : "Antes de abrir um site, o Google Chrome verificará se ele não aparece em uma lista de endereços associados a softwares mal-intencionados e fraudes on-line.",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "Ativado",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "Desativado",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "Como o navegador deve responder quando sites tentam rastrear você?",
        ff_do_not_track_DESC : "Nem todos os sites honrarão a sua solicitação para evitar o rastreamento do que você faz on-line.",
        ff_do_not_track_value_0_POSSIBLEVALUE : "Impedir o rastreamento",
        ff_do_not_track_value_1_POSSIBLEVALUE : "Permitir o rastreamento",
        ff_do_not_track_value_2_POSSIBLEVALUE : "Não expressar preferência",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "Lembrar senhas de sites",
        ff_remember_sign_on_DESC : "Sites e softwares mal-intencionados podem tirar proveito das informações pessoais salvas no Firefox.",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "Ativado",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "Desativado",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "Bloquear sites de ataque relatado",
        ff_block_attack_sites_DESC : "Antes de abrir um site, o Firefox verificará se ele não aparece em uma lista de endereços associados a softwares mal-intencionados e hackers.",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "Ativado",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "Desativado",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "Bloquear falsificações da Web relatadas",
        ff_block_web_forgeries_DESC : "Antes de abrir um site, o Firefox verificará se ele não aparece em uma lista de endereços associados a fraude on-line.",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "Ativado",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "Desativado",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "Enviar solicitações de Não rastrear a sites que você visita no Internet Explorer",
        ie_do_not_track_DESC : "Nem todos os sites honrarão a sua solicitação para evitar o rastreamento do que você faz on-line.",
        ie_do_not_track_value_0_POSSIBLEVALUE : "Desativado",
        ie_do_not_track_value_1_POSSIBLEVALUE : "Ativado",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "Ativar filtro SmartScreen",
        ie_phishing_protect_DESC : "Antes de abrir um site, o Internet Explorer verificará se ele não aparece em uma lista de endereços associados a fraude on-line.",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "Desativado",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "Ativado",
        
        // ie_remember_password
        ie_remember_password_TITLE : "Usar preenchimento automático para nomes de usuários e senhas em formulários",
        ie_remember_password_DESC : "Sites e softwares mal-intencionados podem tirar proveito das informações pessoais salvas no Internet Explorer.",
        ie_remember_password_value_0_POSSIBLEVALUE : "Desativado",
        ie_remember_password_value_1_POSSIBLEVALUE : "Ativado",
        
        // ie_private_mode
        ie_private_mode_TITLE : "Desativar barras de ferramentas e extensões quando a navegação InPrivate é iniciada",
        ie_private_mode_DESC : "Desativar esses recursos extras ajuda a garantir que nenhum vestígio de suas atividades on-line permanecerá quando você usar a navegação InPrivate.",
        ie_private_mode_value_0_POSSIBLEVALUE : "Desativado",
        ie_private_mode_value_1_POSSIBLEVALUE : "Ativado",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "Visibilidade do aplicativo e público do post",
        fb_app_titleArea_radio_wording_apply_all: "quem pode ver os %NUM% aplicativos e os posts referentes a eles?",
        fb_app_titleArea_radio_wording_apply_all_singular: "quem pode ver um aplicativo e os posts referentes a ele?",
        fb_app_titleArea_radio_wording_apply_individ:"quem pode ver cada aplicativo e os posts referentes a eles?",
        fb_app_titleArea_title_wording_detail_tooltip:"Essa configuração controla quem no Facebook pode ver que você usa este aplicativo. Também permite que você escolha o público para os posts que o aplicativo faz no seu nome.",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"Isso remove o aplicativo da sua conta do Facebook. O aplicativo não estará mais nos seus marcadores ou na lista de aplicativos que você usa (encontrado nas suas configurações). <a href='https://www.facebook.com/help/234899866630865' target='_blank'>Saiba mais</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"Amigos",
        fb_app_level_FriendsOfFriends_wording:"Amigos de amigos",
        fb_app_level_public_wording:"Público",
        fb_app_level_onlyme_wording:"Somente eu",
        fb_app_extend_wording:"Mostrar mais",
        fb_app_unextend_wording:"Mostrar menos",
        fb_app_remove_tooltip:"Remover aplicativo do Facebook",
        fb_app_remove_title:"Remover %APPNAME% do Facebook",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"O Google+ não oferece suporte ao Internet Explorer 8. Abra o Google+ em outro navegador ou atualize para a versão mais recente do Microsoft Internet Explorer.",
        fb_twitter_on_IE9:"O X não suporta o Internet Explorer 9 e versões anteriores. Abra o X em outro navegador ou atualize para a última versão do Microsoft Internet Explorer.",

        // Twitter wordings
        tw_str_fix_pop1:"Para continuar, vá para a guia X que apareceu na janela do seu navegador e forneça sua senha do X.", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"Depois de confirmar sua senha, clique em OK para corrigir o problema."
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
