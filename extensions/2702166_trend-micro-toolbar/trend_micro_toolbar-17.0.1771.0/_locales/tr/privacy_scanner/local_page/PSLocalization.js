(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "Yardım Alın",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=TR-TR&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "Internet'e bağlanılamıyor. Bağlantınızı kontrol edin ve ardından yeniden deneyin.",
        PROMOTE_TITANIUM_CONTENT : "Facebook, X ve LinkedIn gizliliğinizi korumak için Trend Micro'dan koruma alın.",
        PROMOTE_TITANIUM_URL : "http://www.trendmicro.com/",
        OVERLAY_OK : "Tamam",
        OVERLAY_SCAN : "Tara",
        OVERLAY_SIGN_IN : "Oturum Aç",
        OVERLAY_CANCEL : "İptal",
        OVERLAY_REMOVE : "Kaldır",
        
        OVERLAY_CHECKNOW : "Şimdi Denetle",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Farklı bir Facebook hesabına geçmiş gibi görünüyorsunuz. Diğerinin yerine bunu denetlemek ister misiniz?",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Farklı bir X hesabına geçtiğiniz görülüyor. Yerine bunu kontrol etmek ister misiniz?",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Farklı bir Google+ hesabına geçmiş gibi görünüyorsunuz. Diğerinin yerine bunu denetlemek ister misiniz?",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Farklı bir LinkedIn hesabına geçiş yapmış görünüyorsunuz. Bu hesabı kontrol etmek ister misiniz?",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "Parolanızı onayladığınıza göre sonuçları görmek için düğmeyi tıklatın.",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "Oturum açtığınıza göre sonuçları görmek için Tamam'ı tıklatın.",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Doğru hesapta oturum açtığınıza göre aşağıdaki düğmeyi tıklatın.",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Doğru hesapta oturum açtığınıza göre aşağıdaki düğmeyi tıklatın.",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Doğru hesapta oturum açtığınıza göre aşağıdaki düğmeyi tıklatın.",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Doğru hesapta oturum açtığınıza göre aşağıdaki düğmeyi tıklatın.",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "Facebook sitesi tekrar otomatik olarak açıldığında, taramanın başlaması için açık bırakın.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "X sitesi tekrar otomatik olarak açıldığında, taramanın başlaması için açık bırakın.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "Google+ sitesi tekrar otomatik olarak açıldığında, taramanın başlaması için açık bırakın.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "LinkedIn sitesi tekrar otomatik olarak açıldığında, ayarları taramak için açık bırakın.",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "Internet'e bağlanılamıyor. Bağlantınızı kontrol edin ve ardından yeniden deneyin.",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "Korunmanız için, bu değişiklikleri onaylamak üzere X parolanızı şimdi tekrar girmelisiniz. Devam etmek için düğmeye tıklayın.",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "Bundan' bir daha bahsetme",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "Güvenliğiniz için bu değişiklikleri onaylamak üzere LinkedIn'de oturum açmanız gerekiyor. Devam etmek için düğmeyi tıklatın.",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "Sizin Hesabınız Değil mi?",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "Doğru hesap ile oturum açın.",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "%d gizlilik endişeniz var.",
        CONCERN_TITLE_ONE_CONCERN : "%d gizlilik endişeniz var.",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "Tümünü Düzelt",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "Arkadaşlarınızın gizliliğini korumasına yardımcı olun",
        SHARE_TOOTHERS_SNS_TITLE : "Trend Micro Gizlilik Tarayıcısı, sosyal ağlarda gizliliğimi korumakta yardımcı oluyor. Siz de deneyin!",
        SHARE_TOOTHERS_BROWSER_TITLE : "Trend Micro Gizlilik Tarayıcısı, web tarayıcımı daha güvenli hale getiriyor. Siz de deneyin!",
        SHARE_TOOTHERS_LINK : "http://www.trendmicro.com/",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(daha fazla bilgi)",
        SETTING_ITEM_RECOMMENDED : "(Önerilen)",
        SETTING_ITEM_ON : "Açık",
        SETTING_ITEM_OFF : "Kapalı",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "İnsanlar kişisel bilgilerinizi görebilir",
        CATEGORY_Strangers_can_easily_track_you : "Yabancılar kolaylıkla sizi izleyebilir",
        CATEGORY_You_can_be_tagged_without_your_permission : "İzniniz olmadan etiketlenebilirsiniz",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "Facebook hesabı olmayan kişiler bilgilerinizi görebilir",
        CATEGORY_People_can_see_where_you_were : "İnsanlar nerede bulunduğunuzu görebilirler",
        CATEGORY_People_can_download_your_photos : "İnsanlar fotoğraflarınızı indirebilirler",
        CATEGORY_Advertizers_can_learn_more_about_you : "Reklamcılar hakkınızda daha fazla bilgi edinebilir",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "LinkedIn hesabı olmayan kişiler bilgilerinizi görebilir",
        CATEGORY_Strangers_could_monitor_your_connection : "Yabancılar bağlantınızı izleyebilir",
        CATEGORY_Browser_phishing_protect : "Kimlik avından koruma",
        CATEGORY_Application_access : "Kişiler, %NUM% uygulama ve bununla ilgili gönderileri görebilir",
        CATEGORY_Application_access_plural : "Kişiler, %NUM% uygulama ve bununla ilgili gönderileri görebilir",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "Yapılan değişiklikler:",
        SAVE_CHANGES_BUTTON_TITLE : "Değişiklikleri Kaydet",
        SAVE_CHANGES_TWITTER_HINT : "Değişiklikleri yapmaya hazır olduğunuzda düğmeye tıklayın ve X parolanızı onaylayın.",
        SAVE_CHANGES_FIRSTTIME_HINT : "Aşağıdaki değişiklikleri kaydetmeye hazır olduğunuzda burayı tıklatın",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "Tebrikler! Sizin gizlilikle ilgili kaygılarınız olmayabilir ama yardıma ihtiyaç duyan arkadaşlarınız olabilir...",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "Tümünü Düzelt",
        QUICKFIX_DESCRIPTION : "Gizliliğinizi korumaya yardımcı olmak için ayarlarınızda aşağıdaki değişiklikler yapılacaktır.",
        QUICKFIX_SETTING : "Ayarlar",
        QUICKFIX_CHANGES : "Değişiklikler",
        QUICKFIX_CURRENT : "Geçerli",
        QUICKFIX_NEW : "Yeni",
        QUICKFIX_FIXALL_BUTTON : "Düzelt",
        QUICKFIX_FIXALL_CANCEL : "İptal",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "Gizlilik Tarayıcısı",
        HTML_TITLE_FACEBOOK : "Facebook",
        HTML_TITLE_TWITTER : "X",
        HTML_TITLE_GOOGLEPLUS : "Google+",
        HTML_TITLE_LINKEDIN : "LinkedIn",
        HTML_TITLE_CHROME : "Google Chrome",
        HTML_TITLE_FIREFOX : "Firefox",
        HTML_TITLE_INTERNET_EXPLORER : "Internet Explorer",
        HTML_CONCERNS_UNKNOWN : "?",
        HTML_FOOTER_TREND_DOT_COM : "Trend Micro",
        HTML_FOOTER_TREND_DOT_COM_LINK : "http://www.trendmicro.com/",
        HTML_FOOTER_COPYRIGHT : "Telif Hakkı © 2023 Trend Micro Incorporated. Tüm hakları saklıdır.",
        
        SNS_AREA_TITLE : "Sosyal Ağ Siteleri",
        BROWSERS_AREA_TITLE : "Tarayıcılar",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "Aksaklık için özür dileriz, ancak bu sosyal ağın en son değişikliklerine ayak uydurmak için burada bazı iyileştirmeler yapmak zorundayız. Bu sırada diğer hesaplarınızdan birini denetleyebilirsiniz.",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "Gizliliğinizi denetlemek için Trend Micro Toolbar'ı açın.",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=TR-TR",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "Gizliliğinizi denetlemek için oturum açın.",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "Gizliliğinizi kontrol etmek için, ilk önce oturum açın ve \"Oturumumu açık tut\" onay kutusunu işaretlemeyi unutmayın.",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "Bulunan gizlilik sorunlarını düzeltmek için, ilk önce oturum açın ve \"Oturumumu açık tut\" onay kutusunu işaretlemeyi unutmayın.",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "Daha fazla bilgi.",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "Bir terslik oldu. Lütfen, sonra tekrar deneyin.",
        ALERT_SIGN_IN_TO_FIX_TITLE : "Gizlilik endişelerini gidermek için lütfen oturum açın.",
        ALERT_SIGN_IN_BUTTON : "Oturum Aç",
        ALERT_TRY_AGAIN_BUTTON : "Yeniden Dene",
        GET_MORE_HELP : "Daha fazla yardım almak için burayı tıklatın.",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "Bu iletiyi sık sık görüyorsanız, yardım almak için burayı tıklatın.",
        ALERT_BUY_TITANIUM_BUTTON : "Şimdi Satın Al",
        ALERT_RESTART_BUTTON : "Yeniden başlatma",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "Trend Micro GizlilikTarayıcısı Google Chrome ile ilgili bir sorunla karşılaştı.",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "Sorunu gidermenizi sağlayacak basit yönergeler için burayı tıklayın.",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "Değişiklikleri uygulamak için Google Chrome'u yeniden başlatın.",
        FIREFOX_RESTART_TITLE : "Değişiklikleri uygulamak için Firefox'u yeniden başlatın.",
        INTERNET_EXPLORER_RESTART_TITLE : "Değişiklikleri uygulamak için Internet Explorer'ı yeniden başlatın.",
        
        CHROME_STOP_TITLE : "Değişikliklerin uygulanabilmesi için Google Chrome'un kapatılması gerekiyor.",
        FIREFOX_STOP_TITLE : "Değişikliklerin uygulanabilmesi için Firefox'un kapatılması gerekiyor.",
        INTERNET_EXPLORER_STOP_TITLE : "Değişikliklerin uygulanabilmesi için Internet Explorer'ın kapatılması gerekiyor.",
        
        ALERT_APPLY_CLOSE_BUTTON : "Şimdi Uygula",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "Daha Sonra Uygula",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "Değişiklikleri uygulamak için Google Chrome'u yeniden başlatın.",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "Değişiklikleri uygulamak için Firefox'u yeniden başlatın.",
        RESTART_IE_LATER_OR_NOT_TITLE : "Değişiklikleri uygulamak için Internet Explorer'ı yeniden başlatın.",
        ALERT_RESTART_NOW : "Şimdi Yeniden Başlat",
        ALERT_RESTART_LATER : "Daha Sonra Yeniden Başlat",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "Değişikliklerin etkinleştirilmesi için Google Chrome'u kapatmalısınız. Bunu şimdi veya daha sonra yapabilirsiniz.",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "Değişikliklerin etkinleştirilmesi için Firefox'u kapatmalısınız. Bunu şimdi veya daha sonra yapabilirsiniz.",
        CLOSE_IE_LATER_OR_NOT_TITLE : "Değişikliklerin etkinleştirilmesi için Internet Explorer'ı kapatmalısınız. Bunu şimdi veya daha sonra yapabilirsiniz.",
        ALERT_CLOSE_NOW : "Şimdi Değiştir",
        ALERT_CLOSE_LATER : "Daha Sonra Değiştir",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "Internet Explorer'ı taramak için Trend Micro güvenlik yazılımınızı başlatmalısınız.",
        ERROR_CHROME_LAUNCH_TI_FIRST : "Google Chrome'u taratmak için Trend Micro güvenlik yazılımını başlatmalısınız.",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "Firefox'u taratmak için Trend Micro güvenlik yazılımını başlatmalısınız.",
        
        ERROR_IE_VERSION_TOO_LOW : "Lütfen, aşağıdaki düğmeyi tıklatmadan önce Microsoft Internet Explorer'ı en son sürüme yükseltin.",
        
        ERROR_DEFAULT_TITLE : "Bir terslik oldu. Lütfen daha sonra yeniden deneyin.",
        ERROR_DEFAULT_LEARN_MORE : "Daha fazla bilgi",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "Lütfen Microsoft Internet Explorer'ı en son sürüme yükseltin.",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "Gözatma trafiğinizle birlikte bir 'Do Not Track' isteği gönderin.",
        cr_do_not_track_DESC : "Çevrimiçi eylemlerinizin izlenmemesi talebinizi kabul etmeyen web siteleri olacaktır.",
        cr_do_not_track_value_0_POSSIBLEVALUE : "Açık",
        cr_do_not_track_value_1_POSSIBLEVALUE : "Kapalı",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "Web'de girdiğim parolaları kaydetmeyi öner.",
        cr_remember_sign_on_DESC : "Kötü amaçlı web siteleri ve yazılımlar, Google Chrome'da kaydedilen kişisel bilgilerinize erişim sağlayabilir.",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "Açık",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "Kapalı",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "Kimlik avı ve kötü amaçlı yazılım korumasını etkinleştir.",
        cr_phishing_protect_DESC : "Google Chrome bir web sitesini açmadan önce adresin kötü amaçlı yazılımlar ve çevrimiçi dolandırıcılıkla ilişkilendirilen adreslerin listesinde olup olmadığını kontrol edecektir.",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "Açık",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "Kapalı",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "Web sitelerinin sizi izlediğini fark ettiğinde tarayıcı nasıl tepki vermelidir?",
        ff_do_not_track_DESC : "Çevrimiçi eylemlerinizin izlenmemesi talebinizi kabul etmeyen web siteleri olacaktır.",
        ff_do_not_track_value_0_POSSIBLEVALUE : "İzlemeyi engelle",
        ff_do_not_track_value_1_POSSIBLEVALUE : "İzlemeye izin ver",
        ff_do_not_track_value_2_POSSIBLEVALUE : "Tercih belirtme",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "Sitelerin parolalarını hatırla",
        ff_remember_sign_on_DESC : "Kötü amaçlı web siteleri ve yazılımlar, FireFox'da kaydedilen kişisel bilgilerinize erişim sağlayabilir.",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "Açık",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "Kapalı",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "Rapor edilmiş saldırı sitelerini engelle",
        ff_block_attack_sites_DESC : "FireFox bir web sitesini açmadan önce adresin kötü amaçlı yazılımlar ve çevrimiçi dolandırıcılıkla ilişkilendirilen adreslerin listesinde olup olmadığını kontrol edecektir.",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "Açık",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "Kapalı",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "Rapor edilmiş sahte siteleri engelle",
        ff_block_web_forgeries_DESC : "FireFox bir web sitesini açmadan önce adresin çevrimiçi dolandırıcılıkla ilişkilendirilen adreslerin listesinde olup olmadığını kontrol edecektir.",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "Açık",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "Kapalı",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "Internet Explorer'da ziyaret ettiğiniz sitelere Do Not Track isteği gönder",
        ie_do_not_track_DESC : "Çevrimiçi eylemlerinizin izlenmemesi talebinizi kabul etmeyen web siteleri olacaktır.",
        ie_do_not_track_value_0_POSSIBLEVALUE : "Kapalı",
        ie_do_not_track_value_1_POSSIBLEVALUE : "Açık",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "SmartScreen Filtresini etkinleştir",
        ie_phishing_protect_DESC : "Internet Explorer bir web sitesini açmadan önce adresin çevrimiçi dolandırıcılıkla ilişkilendirilen adreslerin listesinde olup olmadığını kontrol edecektir.",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "Kapalı",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "Açık",
        
        // ie_remember_password
        ie_remember_password_TITLE : "Formlarda kullanıcı adları ve parolalar için OtomatikTamamlama'yı kullan",
        ie_remember_password_DESC : "Kötü amaçlı web siteleri ve yazılımlar, Internet Explorer'da kaydedilen kişisel bilgilerinize erişim sağlayabilir.",
        ie_remember_password_value_0_POSSIBLEVALUE : "Kapalı",
        ie_remember_password_value_1_POSSIBLEVALUE : "Açık",
        
        // ie_private_mode
        ie_private_mode_TITLE : "Gizli Tarama başladığında araç çubukları ve uzantıları devre dışı bırak",
        ie_private_mode_DESC : "Bu ek özellikleri kapatmak, Gizli Tarama'yı kullandığınızda geride çevrimiçi etkinliğinize dair bir iz bırakılmamasını sağlar.",
        ie_private_mode_value_0_POSSIBLEVALUE : "Kapalı",
        ie_private_mode_value_1_POSSIBLEVALUE : "Açık",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "Uygulama görünürlüğü ve gönderi izleyicisi",
        fb_app_titleArea_radio_wording_apply_all: "%NUM% uygulamayı ve bununla ilgili gönderileri kimler görebilir?",
        fb_app_titleArea_radio_wording_apply_all_singular: "1 uygulamayı ve bununla ilgili gönderileri kimler görebilir?",
        fb_app_titleArea_radio_wording_apply_individ:"Her bir uygulamayı ve bununla ilgili gönderileri kimler görebilir?",
        fb_app_titleArea_title_wording_detail_tooltip:"Bu ayar Facebook'taki hangi kişilerin bu uygulamayı kullandığınızı görüp göremeyeceğini denetler. Ayrıca, uygulamanın sizin adınıza gerçekleştirdiği gönderileri izleyecek kişileri seçmenizi sağlar.",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"Bu, uygulamayı Facebook hesabınızdan kaldırır. Uygulama, artık yer imlerinizde ya da kullandığınız uygulama listesinde (ayarlarınızda bulunan) yer almayacak. <a href='https://www.facebook.com/help/234899866630865' target='_blank'>Daha fazla bilgi</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"Arkadaşlar",
        fb_app_level_FriendsOfFriends_wording:"Arkadaşların Arkadaşları",
        fb_app_level_public_wording:"Genel",
        fb_app_level_onlyme_wording:"Yalnızca ben",
        fb_app_extend_wording:"Daha fazlasını göster",
        fb_app_unextend_wording:"Daha azını göster",
        fb_app_remove_tooltip:"Facebook'tan uygulamayı kaldır",
        fb_app_remove_title:"Facebook'tan %APPNAME% uygulaması kaldırılsın mı?",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"Google+, Internet Explorer 8'i desteklemez. Lütfen Google+ uygulamasını başka bir tarayıcıda açın ya da Microsoft Internet Explorer'ın en son sürümüne yükseltme yapın.",
        fb_twitter_on_IE9:"X, Internet Explorer 9 ve daha önceki versiyonları desteklememektedir. Lütfen X sitesini başka bir tarayıcıda açın veya Microsoft Internet Explorer'ı en son sürüme yükseltin.",

        // Twitter wordings
        tw_str_fix_pop1:"Devam etmek için, tarayıcı pencerenize görünen X sekmesine gidin ve X parolanızı girin.", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"Parolanızı onayladıktan sonra, sorunu düzeltmek için TAMAM öğesine tıklayın."
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
