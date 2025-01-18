(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "Dapatkan Bantuan",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=ID-ID&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "Tidak dapat menyambungkan ke Internet. Periksa koneksi Anda, kemudian coba lagi.",
        PROMOTE_TITANIUM_CONTENT : "Dapatkan proteksi dari Trend Micro untuk menjaga privasi Anda di Facebook, X, dan LinkedIn.",
        PROMOTE_TITANIUM_URL : "http://www.trendmicro.co.id/id/",
        OVERLAY_OK : "OK",
        OVERLAY_SCAN : "Pindai",
        OVERLAY_SIGN_IN : "Masuk",
        OVERLAY_CANCEL : "Batal",
        OVERLAY_REMOVE : "Hapus",
        
        OVERLAY_CHECKNOW : "Periksa Sekarang",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Sepertinya Anda telah mengubah ke akun Facebook yang berbeda. Apakah Anda ingin memeriksa yang satu ini?",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Sepertinya Anda telah beralih ke akun X lain. Apakah Anda ingin mengecek akun ini saja?",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Sepertinya Anda telah mengubah ke akun Google+ yang berbeda. Apakah Anda ingin memeriksa yang satu ini?",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Sepertinya Anda telah berganti ke akun LinkedIn yang berbeda. Cek akun yang ini saja?",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "Sekarang Anda telah mengonfirmasi kata sandi Anda, klik tombol untuk melihat hasilnya.",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "Sekarang Anda telah masuk, klik OK untuk melihat hasilnya.",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Sekarang Anda telah masuk ke akun yang benar, klik tombol di bawah.",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Sekarang Anda telah masuk ke akun yang benar, klik tombol di bawah.",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Sekarang Anda telah masuk ke akun yang benar, klik tombol di bawah.",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Sekarang Anda telah masuk ke akun yang benar, klik tombol di bawah.",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "Setelah situs Facebook membuka kembali secara otomatis, biarkan terbuka untuk memindai pengaturan.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "Ketika situs X terbuka kembali secara otomatis, biarkan situs itu terbuka untuk memindai pengaturannya.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "Ketika situs Google+ membuka kembali secara otomatis, biarkan terbuka untuk memindai pengaturan.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "Begitu situs LinkedIn kembali terbuka secara otomatis, biarkan terbuka untuk memindai pengaturan.",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "Tidak dapat menyambungkan ke Internet. Periksa koneksi Anda, kemudian coba lagi.",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "Untuk proteksi Anda, masukkan kata sandi X Anda lagi untuk mengonfirmasikan perubahan ini. Klik tombol untuk melanjutkan.",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "Janga'n sebutkan hal ini kembali.",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "Untuk perlindungan Anda, sekarang Anda harus masuk ke LinkedIn lagi untuk mengonfirmasikan perubahan ini. Klik tombol untuk melanjutkan.",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "Bukan Akun Anda?",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "Masuk dengan yang benar.",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "Anda memiliki %d masalah privasi.",
        CONCERN_TITLE_ONE_CONCERN : "Anda memiliki %d masalah privasi.",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "Perbaiki Semua",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "Bantu teman Anda melindungi privasi mereka",
        SHARE_TOOTHERS_SNS_TITLE : "Pemindai Privasi Trend Micro membantu melindungi privasi saya di jaringan sosial. Cobalah!",
        SHARE_TOOTHERS_BROWSER_TITLE : "Pemindai Privasi Trend Micro membantu agar browser web saya lebih aman. Cobalah!",
        SHARE_TOOTHERS_LINK : "http://www.trendmicro.co.id/id/",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(info lebih lanjut)",
        SETTING_ITEM_RECOMMENDED : "(Direkomendasikan)",
        SETTING_ITEM_ON : "Hidup",
        SETTING_ITEM_OFF : "Mati",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "Orang dapat melihat informasi pribadi Anda",
        CATEGORY_Strangers_can_easily_track_you : "Orang asing dapat dengan mudah melacak Anda",
        CATEGORY_You_can_be_tagged_without_your_permission : "Anda dapat ditandai tanpa izin",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "Orang di luar Facebook dapat melihat informasi Anda",
        CATEGORY_People_can_see_where_you_were : "Orang dapat melihat keberadaan Anda",
        CATEGORY_People_can_download_your_photos : "Orang dapat mengunduh foto Anda",
        CATEGORY_Advertizers_can_learn_more_about_you : "Pengiklan bisa pelajari Anda lebih jauh",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "Siapapun non-member LinkedIn dapat melihat info Anda",
        CATEGORY_Strangers_could_monitor_your_connection : "Non-member dapat memonitor koneksi Anda",
        CATEGORY_Browser_phishing_protect : "Anti-fising",
        CATEGORY_Application_access : "Orang dapat melihat %NUM% aplikasi dan kirimannya.",
        CATEGORY_Application_access_plural : "Orang dapat melihat %NUM% aplikasi dan kirimannya.",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "Perubahan dibuat:",
        SAVE_CHANGES_BUTTON_TITLE : "Simpan Perubahan",
        SAVE_CHANGES_TWITTER_HINT : "Saat Anda siap membuat perubahan, klik tombol dan konfirmasi kata sandi X Anda.",
        SAVE_CHANGES_FIRSTTIME_HINT : "Klik di sini saat Anda sudah siap menyimpan perubahan di bawah ini",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "Bagus! Tak ada masalah apapun dalam privasi Anda, tetapi teman Anda mungkin perlu bantuan soal ini...",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "Perbaiki Semua",
        QUICKFIX_DESCRIPTION : "Untuk membantu melindungi privasi Anda, perubahan berikut akan dibuat ke pengaturan Anda.",
        QUICKFIX_SETTING : "Pengaturan",
        QUICKFIX_CHANGES : "Perubahan",
        QUICKFIX_CURRENT : "Saat ini",
        QUICKFIX_NEW : "Baru",
        QUICKFIX_FIXALL_BUTTON : "Perbaiki",
        QUICKFIX_FIXALL_CANCEL : "Batal",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "Pemindai Privasi",
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
        HTML_FOOTER_COPYRIGHT : "Hak Cipta © 2023 Trend Micro Incorporated. Semua hak dilindungi undang-undang.",
        
        SNS_AREA_TITLE : "Situs Jejaring Sosial",
        BROWSERS_AREA_TITLE : "Browser",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "Maaf atas ketidaknyamanan ini, namun kami harus membuat beberapa peningkatan di sini untuk tetap mengikuti perubahan yang sedang berjalan pada jejaring sosial ini. Sementara itu, Anda dapat memeriksa salah satu dari akun Anda yang lain.",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "Aktifkan Trend Micro Toolbar untuk memeriksa privasi Anda.",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=ID-ID",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "Masuk untuk memeriksa privasi Anda.",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "Untuk memeriksa privasi Anda, silakan masuk terlebih dahulu dan ingatlah untuk menandai kotak centang \"Biarkan saya tetap masuk\".",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "Untuk memperbaiki masalah privasi yang ditemukan, silakan masuk terlebih dahulu dan ingatlah untuk menandai kotak centang \"Biarkan saya tetap masuk\".",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "Pelajari lebih lanjut.",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "Ada sesuatu yang salah. Silakan coba lagi nanti.",
        ALERT_SIGN_IN_TO_FIX_TITLE : "Silakan masuk untuk memperbaiki masalah privasi.",
        ALERT_SIGN_IN_BUTTON : "Masuk",
        ALERT_TRY_AGAIN_BUTTON : "Coba Lagi",
        GET_MORE_HELP : "Klik di sini untuk mendapatkan bantuan lainnya.",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "Jika Anda terus melihat pesan ini, klik di sini untuk mendapatkan bantuan.",
        ALERT_BUY_TITANIUM_BUTTON : "Beli Sekarang",
        ALERT_RESTART_BUTTON : "Nyalakan ulang",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "Pemindai Privasi Trend Micro bermasalah dengan Google Chrome.",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "Klik di sini untuk petunjuk mudah untuk mengatasi masalah ini.",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "Nyalakan Ulang Google Chrome untuk menerapkan perubahan.",
        FIREFOX_RESTART_TITLE : "Nyalakan Ulang Firefox untuk menerapkan perubahan.",
        INTERNET_EXPLORER_RESTART_TITLE : "Nyalakan Ulang Internet explorer untuk menerapkan perubahan.",
        
        CHROME_STOP_TITLE : "Google Chrome harus ditutup sekarang untuk menerapkan perubahan.",
        FIREFOX_STOP_TITLE : "Firefox harus ditutup sekarang untuk menerapkan perubahan.",
        INTERNET_EXPLORER_STOP_TITLE : "Internet Explorer harus ditutup sekarang untuk menerapkan perubahan.",
        
        ALERT_APPLY_CLOSE_BUTTON : "Terapkan Sekarang",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "Terapkan Nanti",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "Nyalakan Ulang Google Chrome untuk menerapkan perubahan.",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "Nyalakan Ulang Firefox untuk menerapkan perubahan.",
        RESTART_IE_LATER_OR_NOT_TITLE : "Nyalakan Ulang Internet Explorer untuk menerapkan perubahan.",
        ALERT_RESTART_NOW : "Nyalakan Ulang Sekarang",
        ALERT_RESTART_LATER : "Nyalakan Ulang Nanti",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "Agar perubahan tersebut berdampak, tutup Google Chrome. Lakukan sekarang atau tunggu sampai nanti.",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "Agar perubahan tersebut berdampak, tutup Firefox. Lakukan sekarang atau tunggu sampai nanti.",
        CLOSE_IE_LATER_OR_NOT_TITLE : "Agar perubahan tersebut berdampak, tutup Internet Explorer. Lakukan sekarang atau tunggu sampai nanti.",
        ALERT_CLOSE_NOW : "Ubah Sekarang",
        ALERT_CLOSE_LATER : "Ubah Nanti",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "Anda harus menjalankan perangkat lunak keamanan Trend Micro untuk memindai Internet Explorer.",
        ERROR_CHROME_LAUNCH_TI_FIRST : "Anda harus menjalankan perangkat lunak keamanan Trend Micro untuk memindai Google Chrome.",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "Anda harus menjalankan perangkat lunak keamanan Trend Micro untuk memindai Firefox.",
        
        ERROR_IE_VERSION_TOO_LOW : "Silakan mutakhirkan ke versi terbaru Microsoft Internet Explorer sebelum mengklik tombol di bawah ini.",
        
        ERROR_DEFAULT_TITLE : "Ada sesuatu yang salah. Silakan coba lagi nanti.",
        ERROR_DEFAULT_LEARN_MORE : "Pelajari lebih lanjut",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "Harap memutakhirkan ke versi terbaru Microsoft Internet Explorer.",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "Kirim permintaan 'Jangan Lacak' bersama dengan trafik browsing Anda.",
        cr_do_not_track_DESC : "Tidak semua situs web akan menerima permintaan guna mencegah pelacakan atas aktivitas online Anda.",
        cr_do_not_track_value_0_POSSIBLEVALUE : "Hidup",
        cr_do_not_track_value_1_POSSIBLEVALUE : "Mati",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "Tawarkan untuk simpan kata sandi yang diisikan di web.",
        cr_remember_sign_on_DESC : "Situs web dan perangkat lunak yang berbahaya bisa memanfaatkan informasi pribadi yang tersimpan di Google Chrome.",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "Hidup",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "Mati",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "Aktifkan proteksi fising dan malware.",
        cr_phishing_protect_DESC : "Sebelum membuka sebuah situs, Google Chrome akan memastikannya tidak termasuk dalam daftar alamat terkait perangkat lunak berbahaya dan penipuan online.",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "Hidup",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "Mati",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "Bagaimana respons browser setiap kali situs web mencoba melacak Anda?",
        ff_do_not_track_DESC : "Tidak semua situs web akan menerima permintaan guna mencegah pelacakan atas aktivitas online Anda.",
        ff_do_not_track_value_0_POSSIBLEVALUE : "Jangan lacak",
        ff_do_not_track_value_1_POSSIBLEVALUE : "Izinkan pelacakan",
        ff_do_not_track_value_2_POSSIBLEVALUE : "Nyatakan tidak memilih",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "Ingat kata sandi untuk tiap situs",
        ff_remember_sign_on_DESC : "Situs web dan perangkat lunak yang berbahaya bisa memanfaatkan informasi pribadi yang tersimpan di FireFox.",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "Hidup",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "Mati",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "Blokir situs penyerang terlapor",
        ff_block_attack_sites_DESC : "Sebelum membuka sebuah situs, FireFox akan memastikannya tidak termasuk dalam daftar alamat terkait perangkat lunak berbahaya dan penipuan online.",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "Hidup",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "Mati",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "Blokir pemalsuan web terlapor",
        ff_block_web_forgeries_DESC : "Sebelum membuka sebuah situs, FireFox akan memastikannya tidak termasuk dalam daftar alamat terkait pemalsuan online.",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "Hidup",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "Mati",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "Kirim permintaan Jangan Lacak ke setiap situs yang Anda kunjungi di Internet Explorer",
        ie_do_not_track_DESC : "Tidak semua situs web akan menerima permintaan guna mencegah pelacakan atas aktivitas online Anda.",
        ie_do_not_track_value_0_POSSIBLEVALUE : "Mati",
        ie_do_not_track_value_1_POSSIBLEVALUE : "Hidup",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "Aktifkan Filter SmartScreen",
        ie_phishing_protect_DESC : "Sebelum membuka sebuah situs, Internet Explorer akan memastikannya tidak termasuk dalam daftar alamat terkait pemalsuan online.",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "Mati",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "Hidup",
        
        // ie_remember_password
        ie_remember_password_TITLE : "Gunakan Lengkapi Otomatis untuk nama pengguna dan kata sandi di formulir",
        ie_remember_password_DESC : "Situs web dan perangkat lunak yang berbahaya bisa memanfaatkan informasi pribadi yang tersimpan di Internet Explorer.",
        ie_remember_password_value_0_POSSIBLEVALUE : "Mati",
        ie_remember_password_value_1_POSSIBLEVALUE : "Hidup",
        
        // ie_private_mode
        ie_private_mode_TITLE : "Nonaktifkan toolbar dan ekstensi saat mulai browsing InPrivate",
        ie_private_mode_DESC : "Dengan mematikan semua fitur ekstra ini dipastikan tak ada lagi pelacakan terhadap aktivitas online Anda saat menggunakan browsing InPrivate.",
        ie_private_mode_value_0_POSSIBLEVALUE : "Mati",
        ie_private_mode_value_1_POSSIBLEVALUE : "Hidup",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "Visibilitas aplikasi dan kiriman pembaca",
        fb_app_titleArea_radio_wording_apply_all: "siapa saja yang dapat melihat %NUM% aplikasi dan kirimannya?",
        fb_app_titleArea_radio_wording_apply_all_singular: "siapa saja yang dapat melihat 1 aplikasi dan kirimannya?",
        fb_app_titleArea_radio_wording_apply_individ:"siapa yang dapat setiap aplikasi dan kirimannya?",
        fb_app_titleArea_title_wording_detail_tooltip:"Pengaturan ini mengontrol siapa saja dalam Facebook yang dapat melihat bahwa Anda menggunakan aplikasi ini. Ini juga memungkinkan Anda untuk memilih pembaca untuk kiriman yang dibuat aplikasi atas nama Anda.",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"Ini menghapus aplikasi dari akun Facebook Anda. Aplikasi tidak akan lagi berada dalam marka buku atau daftar aplikasi yang Anda gunakan (temukan dalam pengaturan Anda). <a href='https://www.facebook.com/help/234899866630865' target='_blank'>Pelajari lebih lanjut</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"Teman",
        fb_app_level_FriendsOfFriends_wording:"Teman dari Teman",
        fb_app_level_public_wording:"Umum",
        fb_app_level_onlyme_wording:"Hanya saya",
        fb_app_extend_wording:"Tampilkan lebih banyak",
        fb_app_unextend_wording:"Tampilkan lebih sedikit",
        fb_app_remove_tooltip:"Hapus aplikasi dari Facebook",
        fb_app_remove_title:"Hapus %APPNAME% dari Facebook?",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"Google+ tidak mendukung Internet Explorer 8. Silakan buka Google+ pada browser yang lain atau mutakhirkan Microsoft Internet Explorer ke versi terbaru.",
        fb_twitter_on_IE9:"X tidak mendukung Internet Explorer 9 dan versi sebelumnya. Buka X dengan browser lain atau mutakhirkan Microsoft Internet Explorer ke versi terbaru.",

        // Twitter wordings
        tw_str_fix_pop1:"Untuk melanjutkan, masuk ke tab X yang muncul di jendela browser Anda, lalu masukkan kata sandi X Anda.", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"Setelah mengonfirmasi kata sandi, klik OK untuk memperbaiki masalahnya."
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
