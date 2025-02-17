(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "Nhận trợ giúp",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=VI-VN&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "Không thể kết nối Internet. Kiểm tra kết nối của bạn và thử lại.",
        PROMOTE_TITANIUM_CONTENT : "Nhận bảo vệ từ Trend Micro để bảo vệ tính riêng tư của bạn trên Facebook, X và LinkedIn.",
        PROMOTE_TITANIUM_URL : "http://vn.trendmicro.com/vn/",
        OVERLAY_OK : "OK",
        OVERLAY_SCAN : "Quét",
        OVERLAY_SIGN_IN : "Đăng nhập",
        OVERLAY_CANCEL : "Hủy",
        OVERLAY_REMOVE : "Xóa",
        
        OVERLAY_CHECKNOW : "Kiểm tra ngay",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Bạn dường như đã chuyển sang tài khoản Facebook khác. Bạn có muốn kiểm tra tài khoản này thay thế không?",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Có vẻ như bạn đã đổi sang một tài khoản X khác. Thay vào đó, bạn có muốn kiểm tra tài khoản này không?",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Bạn dường như đã chuyển sang tài khoản Google+ khác. Bạn có muốn kiểm tra tài khoản này thay thế không?",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "Có vẻ bạn đã thay đổi sang tài khoản LinkedIn khác. Bạn có muốn chọn tài khoản này thay thế không?",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "Bây giờ bạn đã xác nhận mật khẩu của mình, nhấp vào nút để xem kết quả.",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "Bây giờ, bạn đã đăng nhập, nhấp vào OK để thấy kết quả.",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Bây giờ bạn đã đăng nhập vào đúng tài khoản, nhấp vào nút bên dưới.",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Bây giờ bạn đã đăng nhập vào đúng tài khoản, nhấp vào nút bên dưới.",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Bây giờ bạn đã đăng nhập vào đúng tài khoản, nhấp vào nút bên dưới.",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "Bây giờ bạn đã đăng nhập vào đúng tài khoản, nhấp vào nút bên dưới.",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "Khi trang web Facebook tự động mở lại, vui lòng để nguyên để quét cài đặt.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "Khi trang X tự động mở lại, vui lòng để nguyên để quét cài đặt.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "Khi trang web Google+ tự động mở lại, vui lòng để nguyên để quét cài đặt.",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "Khi trang web LinkedIn tự động mở lại, vui lòng để nguyên để quét cài đặt.",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "Không thể kết nối với Internet. Kiểm tra kết nối của bạn và thử lại.",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "Để được bảo vệ, bây giờ bạn phải cung cấp lại mật khẩu X để xác nhận những thay đổi này. Nhấp vào nút để tiếp tục.",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "Không hiển thị lại thông báo này",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "Bây giờ, bạn phải đăng nhập lại vào LinkedIn để xác nhận các thay đổi này cho bạn được bảo vệ. Nhấp vào nút để tiếp tục.",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "Không phải là tài khoản của bạn?",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "Đăng nhập vào đúng tài khoản.",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "Bạn có %d quan ngại về tính riêng tư.",
        CONCERN_TITLE_ONE_CONCERN : "Bạn có %d quan ngại về tính riêng tư.",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "Khắc phục tất cả",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "Giúp bạn bè bảo vệ sự riêng tư của họ",
        SHARE_TOOTHERS_SNS_TITLE : "Trình quét riêng tư Trend Micro giúp bảo vệ sự riêng tư của tôi trên các mạng xã hội. Hãy dùng thử!",
        SHARE_TOOTHERS_BROWSER_TITLE : "Trình quét riêng tư Trend Micro giúp làm trình duyệt web của tôi an toàn hơn. Hãy dùng thử!",
        SHARE_TOOTHERS_LINK : "http://vn.trendmicro.com/vn/",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(thêm thông tin)",
        SETTING_ITEM_RECOMMENDED : "(Được khuyến cáo)",
        SETTING_ITEM_ON : "Bật",
        SETTING_ITEM_OFF : "Tắt",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "Mọi người có thể thấy thông tin cá nhân của bạn",
        CATEGORY_Strangers_can_easily_track_you : "Người lạ có thể dễ dàng theo dõi bạn",
        CATEGORY_You_can_be_tagged_without_your_permission : "Bạn có thể bị gắn thẻ trái phép",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "Những người bên ngoài Facebook có thể thấy thông tin của bạn",
        CATEGORY_People_can_see_where_you_were : "Mọi người có thể thấy bạn đã ở đâu",
        CATEGORY_People_can_download_your_photos : "Mọi người có thể tải xuống ảnh của bạn",
        CATEGORY_Advertizers_can_learn_more_about_you : "Nhà quảng cáo có thể tìm hiểu thêm về bạn",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "Những người bên ngoài LinkedIn có thể thấy thông tin của bạn",
        CATEGORY_Strangers_could_monitor_your_connection : "Người lạ có thể theo dõi kết nối của bạn",
        CATEGORY_Browser_phishing_protect : "Chống lừa đảo",
        CATEGORY_Application_access : "Mọi người có thể xem %NUM% ứng dụng và bài đăng của các ứng dụng đó",
        CATEGORY_Application_access_plural : "Mọi người có thể xem %NUM% ứng dụng và bài đăng của các ứng dụng đó",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "Những thay đổi đã được thực hiện:",
        SAVE_CHANGES_BUTTON_TITLE : "Lưu Thay đổi",
        SAVE_CHANGES_TWITTER_HINT : "Khi sẵn sàng thực hiện thay đổi, nhấp vào nút và xác nhận mật khẩu X của bạn.",
        SAVE_CHANGES_FIRSTTIME_HINT : "Nhấp vào đây khi đã sẵn sàng lưu bất kỳ thay đổi nào bên dưới.",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "Rất tốt! Bạn không có bất kỳ quan ngại về tính riêng tư nào, nhưng bạn bè của bạn có thể cần trợ giúp...",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "Khắc phục tất cả",
        QUICKFIX_DESCRIPTION : "Để giúp bảo vệ sự riêng tư của bạn, những thay đổi sau sẽ được thực hiện cho cài đặt của bạn.",
        QUICKFIX_SETTING : "Cài đặt",
        QUICKFIX_CHANGES : "Thay đổi",
        QUICKFIX_CURRENT : "Hiện tại",
        QUICKFIX_NEW : "Mới",
        QUICKFIX_FIXALL_BUTTON : "Sửa",
        QUICKFIX_FIXALL_CANCEL : "Hủy",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "Trình quét riêng tư",
        HTML_TITLE_FACEBOOK : "Facebook",
        HTML_TITLE_TWITTER : "X",
        HTML_TITLE_GOOGLEPLUS : "Google+",
        HTML_TITLE_LINKEDIN : "LinkedIn",
        HTML_TITLE_CHROME : "Google Chrome",
        HTML_TITLE_FIREFOX : "Firefox",
        HTML_TITLE_INTERNET_EXPLORER : "Internet Explorer",
        HTML_CONCERNS_UNKNOWN : "?",
        HTML_FOOTER_TREND_DOT_COM : "Trend Micro",
        HTML_FOOTER_TREND_DOT_COM_LINK : "http://vn.trendmicro.com/vn/",
        HTML_FOOTER_COPYRIGHT : "Bản quyền © 2023 Trend Micro Incorporated. Mọi quyền được bảo lưu.",
        
        SNS_AREA_TITLE : "Trang web mạng xã hội",
        BROWSERS_AREA_TITLE : "Trình duyệt",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "Chúng tôi rất tiếc về sự bất tiện này, nhưng chúng tôi phải thực hiện một vài cải tiến tại đây để bắt kịp các thay đổi gần đây cho mạng xã hội này. Trong thời gian chờ đợi, bạn có thể kiểm tra một trong các tài khoản khác thay thế.",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "Bật Trend Micro Toolbar để kiểm tra sự riêng tư của bạn.",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=VI-VN",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "Đăng nhập để kiểm tra sự riêng tư của bạn.",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "Để kiểm tra tính riêng tư của bạn, vui lòng đăng ký trước tiên và nhớ đánh dấu hộp kiểm \"Giữ tôi đăng nhập\".",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "Để khắc phục quan ngại về tính riêng tư được tìm thấy, vui lòng đăng ký trước tiên và nhớ đánh dấu hộp kiểm \"Giữ tôi đăng nhập\".",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "Tìm hiểu thêm.",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "Có lỗi nào đó. Vui lòng thử lại sau.",
        ALERT_SIGN_IN_TO_FIX_TITLE : "Vui lòng đăng nhập để khắc phục quan ngại về tính riêng tư.",
        ALERT_SIGN_IN_BUTTON : "Đăng nhập",
        ALERT_TRY_AGAIN_BUTTON : "Thử Lại",
        GET_MORE_HELP : "Nhấp vào đây để nhận thêm trợ giúp.",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "Nếu bạn vẫn gặp thông báo này, nhấp vào đây để nhận trợ giúp.",
        ALERT_BUY_TITANIUM_BUTTON : "Mua ngay",
        ALERT_RESTART_BUTTON : "Khởi động lại",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "Trình quét riêng tư Trend Micro đã gặp sự cố với Google Chrome.",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "Nhấp vào đây để xem hướng dẫn dễ dàng giúp khắc phục vấn đề.",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "Khởi động lại Google Chrome để áp dụng các thay đổi.",
        FIREFOX_RESTART_TITLE : "Khởi động lại Firefox để áp dụng các thay đổi.",
        INTERNET_EXPLORER_RESTART_TITLE : "Khởi động lại Internet explorer để áp dụng các thay đổi.",
        
        CHROME_STOP_TITLE : "Google Chrome phải đóng ngay bây giờ để áp dụng các thay đổi.",
        FIREFOX_STOP_TITLE : "Firefox phải đóng ngay bây giờ để áp dụng các thay đổi.",
        INTERNET_EXPLORER_STOP_TITLE : "Internet Explorer phải đóng ngay bây giờ để áp dụng các thay đổi.",
        
        ALERT_APPLY_CLOSE_BUTTON : "Áp dụng ngay",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "Áp dụng Sau",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "Khởi động lại Google Chrome để áp dụng các thay đổi.",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "Khởi động lại Firefox để áp dụng các thay đổi.",
        RESTART_IE_LATER_OR_NOT_TITLE : "Khởi động lại Internet Explorer để áp dụng các thay đổi.",
        ALERT_RESTART_NOW : "Khởi động lại ngay",
        ALERT_RESTART_LATER : "Khởi động lại Sau",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "Để các thay đổi có hiệu lực, bạn phải đóng Google Chrome. Bạn có thực hiện điều đó bây giờ hoặc chờ sau.",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "Để các thay đổi có hiệu lực, bạn phải đóng Firefox. Bạn có thực hiện điều đó bây giờ hoặc chờ sau.",
        CLOSE_IE_LATER_OR_NOT_TITLE : "Để các thay đổi có hiệu lực, bạn phải đóng Internet Explorer. Bạn có thực hiện điều đó bây giờ hoặc chờ sau.",
        ALERT_CLOSE_NOW : "Thay đổi Ngay",
        ALERT_CLOSE_LATER : "Thay đổi Sau",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "Bạn phải khởi chạy phần mềm bảo mật Trend Micro để quét Internet Explorer.",
        ERROR_CHROME_LAUNCH_TI_FIRST : "Bạn phải khởi chạy phần mềm bảo mật Trend Micro để quét Google Chrome.",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "Bạn phải khởi chạy phần mềm bảo mật Trend Micro để quét Firefox.",
        
        ERROR_IE_VERSION_TOO_LOW : "Vui lòng nâng cấp lên phiên bản Microsoft Internet Explorer mới nhất trước khi nhấp vào nút bên dưới.",
        
        ERROR_DEFAULT_TITLE : "Đã xảy ra sự cố. Vui lòng thử lại sau.",
        ERROR_DEFAULT_LEARN_MORE : "Tìm hiểu thêm",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "Vui lòng nâng cấp lên phiên bản Microsoft Internet Explorer mới nhất.",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "Gửi yêu cầu 'Không Theo dõi' với lưu lượng truy cập duyệt của bạn.",
        cr_do_not_track_DESC : "Không phải tất cả trang web sẽ đều thực hiện yêu cầu của bạn để tránh theo dõi những gì bạn thực hiện trực tuyến.",
        cr_do_not_track_value_0_POSSIBLEVALUE : "Bật",
        cr_do_not_track_value_1_POSSIBLEVALUE : "Tắt",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "Đề nghị lưu mật khẩu, tôi truy cập trên web.",
        cr_remember_sign_on_DESC : "Các trang web và phần mềm độc hại có thể tận dụng thông tin cá nhân được lưu trong Google Chrome.",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "Bật",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "Tắt",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "Bật bảo vệ khỏi lừa đảo và phần mềm độc hại.",
        cr_phishing_protect_DESC : "Trước khi mở trang web, Google Chrome sẽ đảm bảo trang web không xuất hiện trong danh sách địa chỉ có liên quan đến phần mềm độc hại hoặc lừa đảo trực tuyến.",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "Bật",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "Tắt",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "Trình duyệt phản hồi như thế nào khi trang web cố gắng theo dõi bạn?",
        ff_do_not_track_DESC : "Không phải tất cả trang web sẽ đều thực hiện yêu cầu của bạn để tránh theo dõi những gì bạn thực hiện trực tuyến.",
        ff_do_not_track_value_0_POSSIBLEVALUE : "Ngăn theo dõi",
        ff_do_not_track_value_1_POSSIBLEVALUE : "Cho phép theo dõi",
        ff_do_not_track_value_2_POSSIBLEVALUE : "Không thể hiện sự ưu tiên",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "Nhớ mật khẩu cho trang web",
        ff_remember_sign_on_DESC : "Các trang web và phần mềm độc hại có thể tận dụng thông tin cá nhân được lưu trong FireFox.",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "Bật",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "Tắt",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "Chặn các trang web tấn công đã báo cáo",
        ff_block_attack_sites_DESC : "Trước khi mở trang web, FireFox sẽ đảm bảo trang web không xuất hiện trong danh sách địa chỉ có liên quan đến phần mềm độc hại và hacker.",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "Bật",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "Tắt",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "Chặn việc giả mạo trang web đã báo cáo",
        ff_block_web_forgeries_DESC : "Trước khi mở trang web, FireFox sẽ đảm bảo trang web không xuất hiện trong danh sách địa chỉ có liên quan đến gian lận trực tuyến.",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "Bật",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "Tắt",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "Gửi yêu cầu Không Theo dõi đến các trang web mà bạn truy cập trong Internet Explorer",
        ie_do_not_track_DESC : "Không phải tất cả trang web sẽ đều thực hiện yêu cầu của bạn để tránh theo dõi những gì bạn thực hiện trực tuyến.",
        ie_do_not_track_value_0_POSSIBLEVALUE : "Tắt",
        ie_do_not_track_value_1_POSSIBLEVALUE : "Bật",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "Bật Bộ lọc SmartScreen",
        ie_phishing_protect_DESC : "Trước khi mở trang web, Internet Explorer sẽ đảm bảo trang web không xuất hiện trong danh sách địa chỉ có liên quan đến gian lận trực tuyến.",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "Tắt",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "Bật",
        
        // ie_remember_password
        ie_remember_password_TITLE : "Sử dụng AutoComplete để tên người dùng và mật khẩu luôn được bảo vệ",
        ie_remember_password_DESC : "Các trang web và phần mềm độc hại có thể tận dụng thông tin cá nhân được lưu trong Internet Explorer.",
        ie_remember_password_value_0_POSSIBLEVALUE : "Tắt",
        ie_remember_password_value_1_POSSIBLEVALUE : "Bật",
        
        // ie_private_mode
        ie_private_mode_TITLE : "Vô hiệu các thanh công cụ và tiện ích mở rộng khi Duyệt InPrivate khởi động",
        ie_private_mode_DESC : "Việc tắt các tính năng phụ này sẽ giúp đảm bảo rằng không có dấu vết hoạt động trực tuyến của bạn được lưu lại khi bạn sử dụng Duyệt InPrivate.",
        ie_private_mode_value_0_POSSIBLEVALUE : "Tắt",
        ie_private_mode_value_1_POSSIBLEVALUE : "Bật",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "Khả năng hiển thị ứng dụng và đối tượng xem bài đăng",
        fb_app_titleArea_radio_wording_apply_all: "ai có thể xem %NUM% ứng dụng và bài đăng của các ứng dụng đó?",
        fb_app_titleArea_radio_wording_apply_all_singular: "ai có thể xem 1 ứng dụng và bài đăng của các ứng dụng đó?",
        fb_app_titleArea_radio_wording_apply_individ:"ai có thể xem từng ứng dụng và bài đăng của ứng dụng đó?",
        fb_app_titleArea_title_wording_detail_tooltip:"Cài đặt này kiểm soát những ai trên Facebook có thể thấy bạn sử dụng ứng dụng này. Cài đặt cũng cho phép bạn lựa chọn đối tượng xem cho bài đăng mà ứng dụng thực hiện thay cho bạn.",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"Thao tác này sẽ xóa ứng dụng khỏi tài khoản Facebook của bạn. Ứng dụng sẽ không còn trong các trang đánh dấu của bạn hay trong danh sách ứng dụng bạn sử dụng (tìm thấy trong cài đặt của bạn). <a href='https://www.facebook.com/help/234899866630865' target='_blank'>Tìm hiểu thêm</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"Bạn bè",
        fb_app_level_FriendsOfFriends_wording:"Bạn của bạn bè",
        fb_app_level_public_wording:"Công khai",
        fb_app_level_onlyme_wording:"Chỉ mình tôi",
        fb_app_extend_wording:"Hiển thị nhiều hơn",
        fb_app_unextend_wording:"Hiển thị ít hơn",
        fb_app_remove_tooltip:"Xóa ứng dụng khỏi Facebook",
        fb_app_remove_title:"Xóa %APPNAME% khỏi Facebook?",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"Google+ không hỗ trợ Internet Explorer 8. Vui lòng mở Google+ trên một trình duyệt khác hoặc nâng cấp lên phiên bản Microsoft Internet Explorer mới nhất.",
        fb_twitter_on_IE9:"X không hỗ trợ Internet Explorer 9 về trước. Vui lòng mở X bằng trình duyệt khác hoặc nâng cấp lên phiên bản Microsoft Internet Explorer mới nhất.",

        // Twitter wordings
        tw_str_fix_pop1:"Để tiếp tục, hãy vào tab X hiển thị trên cửa sổ trình duyệt và nhập mật khẩu X của bạn.", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"Sau khi xác nhận mật khẩu, bạn hãy nhấp vào OK để khắc phục sự cố."
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
