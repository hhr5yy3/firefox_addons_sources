(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "取得協助",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=ZH-TW&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "無法連線到 Internet。請檢查您的連線，然後再試一次。",
        PROMOTE_TITANIUM_CONTENT : "從趨勢科技取得安全防護，以在 Facebook、X 和 LinkedIn 上保護您的隱私權。",
        PROMOTE_TITANIUM_URL : "http://tw.trendmicro.com/tw/home/",
        OVERLAY_OK : "確定",
        OVERLAY_SCAN : "掃瞄",
        OVERLAY_SIGN_IN : "登入",
        OVERLAY_CANCEL : "取消",
        OVERLAY_REMOVE : "移除",
        
        OVERLAY_CHECKNOW : "立即檢查",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "您似乎已改成使用其他 Facebook 帳號。是否要改為檢查此帳號？",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "您似乎已改成使用其他 X 帳號。是否要改為檢查此帳號？",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "您似乎已改成使用其他 Google+ 帳號。是否要改為檢查此帳號？",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "您似乎已變更至不同的 LinkedIn 帳號。您是否要改為檢查此帳號？",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "現在您已確認密碼，點選按鈕可查看結果。",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "現在您已登入，點選「確定」以查看結果。",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "現在您已登入正確的帳號，請點選下面的按鈕。",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "現在您已登入正確的帳號，請點選下面的按鈕。",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "現在您已登入正確的帳號，請點選下面的按鈕。",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "現在您已登入正確的帳號，請點選下面的按鈕。",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "Facebook 網站再次自動開啟後，請保持其開啟狀態，以掃瞄設定。",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "X 網站再次自動開啟後，請保持其開啟狀態，以掃瞄設定。",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "Google+ 網站再次自動開啟後，請保持其開啟狀態，以掃瞄設定。",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "LinkedIn 網站再次自動開啟後，請保持其開啟狀態，以掃瞄設定。",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "無法連線到 Internet。請檢查您的連線，然後再試一次。",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "為了保護您的安全，您現在必須再次提供您的 X 密碼，以確認這些變更。點選此按鈕以繼續。",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "不要再提及此項",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "為了您的安全，您必須現在再次登入 LinkedIn 以確認這些變更。請點選該按鈕以繼續。",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "不是您的帳號？",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "請使用正確的帳號登入。",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "您有 %d 個隱私權問題。",
        CONCERN_TITLE_ONE_CONCERN : "您有 %d 個隱私權問題。",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "全部修復",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "協助您的好友保護其隱私權",
        SHARE_TOOTHERS_SNS_TITLE : "趨勢科技社群隱私偵測可協助在社群網路上保護我的隱私權。歡迎您來試用！",
        SHARE_TOOTHERS_BROWSER_TITLE : "趨勢科技社群隱私偵測可讓我的 Web 瀏覽器更安全。歡迎您來試用！",
        SHARE_TOOTHERS_LINK : "http://tw.trendmicro.com/tw/home/",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(更多資訊)",
        SETTING_ITEM_RECOMMENDED : "(建議)",
        SETTING_ITEM_ON : "開啟",
        SETTING_ITEM_OFF : "關閉",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "他人可看到您的個人資訊",
        CATEGORY_Strangers_can_easily_track_you : "陌生人可輕易追蹤到您",
        CATEGORY_You_can_be_tagged_without_your_permission : "在未經您允許的情況下標記您",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "Facebook 以外的人員可以看到您的資訊",
        CATEGORY_People_can_see_where_you_were : "他人可看到您所處的位置",
        CATEGORY_People_can_download_your_photos : "他人可下載您的照片",
        CATEGORY_Advertizers_can_learn_more_about_you : "廣告客戶可以深入瞭解您",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "LinkedIn 以外的人員可以看到您的資訊",
        CATEGORY_Strangers_could_monitor_your_connection : "陌生人可以監控您的連線",
        CATEGORY_Browser_phishing_protect : "網路釣魚防護",
        CATEGORY_Application_access : "他人可看到 %NUM% 個應用程式及其貼文",
        CATEGORY_Application_access_plural : "他人可看到 %NUM% 個應用程式及其貼文",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "所做的變更：",
        SAVE_CHANGES_BUTTON_TITLE : "儲存變更",
        SAVE_CHANGES_TWITTER_HINT : "如果準備做出變更，請點選按鈕並確認您的 X 密碼。",
        SAVE_CHANGES_FIRSTTIME_HINT : "當您準備好儲存下面的任何變更時，請點選這裡",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "恭喜您! 您的隱私設定很安全。趕快分享給可能也需要的朋友………",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "全部修復",
        QUICKFIX_DESCRIPTION : "為協助保護您的隱私權，將對設定做出以下變更。",
        QUICKFIX_SETTING : "設定",
        QUICKFIX_CHANGES : "變更",
        QUICKFIX_CURRENT : "目前",
        QUICKFIX_NEW : "新增",
        QUICKFIX_FIXALL_BUTTON : "修復",
        QUICKFIX_FIXALL_CANCEL : "取消",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "社群隱私偵測",
        HTML_TITLE_FACEBOOK : "Facebook",
        HTML_TITLE_TWITTER : "X",
        HTML_TITLE_GOOGLEPLUS : "Google+",
        HTML_TITLE_LINKEDIN : "LinkedIn",
        HTML_TITLE_CHROME : "Google Chrome",
        HTML_TITLE_FIREFOX : "Firefox",
        HTML_TITLE_INTERNET_EXPLORER : "Internet Explorer",
        HTML_CONCERNS_UNKNOWN : "?",
        HTML_FOOTER_TREND_DOT_COM : "趨勢科技",
        HTML_FOOTER_TREND_DOT_COM_LINK : "http://tw.trendmicro.com/tw/home/",
        HTML_FOOTER_COPYRIGHT : "版權所有 © 2023 Trend Micro Incorporated / 趨勢科技股份有限公司。保留所有權利。",
        
        SNS_AREA_TITLE : "社群網路網站",
        BROWSERS_AREA_TITLE : "瀏覽器",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "對於造成的不便，我們深感抱歉。為了配合此社群網路最近的異動，我們必須在這裡進行幾項改進措施。在此同時，您可以改為查看其他任一帳號。",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "開啟趨勢科技工具列以檢查您的隱私權。",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=ZH-TW",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "登入以檢查您的隱私權。",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "如果要檢查您的隱私權，請先登入並記得選取「讓我保持登入」核取方塊。",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "如果要修復發現的隱私權問題，請先登入並記得選取「讓我保持登入」核取方塊。",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "深入瞭解。",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "發生錯誤。請稍後再試一次。",
        ALERT_SIGN_IN_TO_FIX_TITLE : "請登入以修復隱私權問題。",
        ALERT_SIGN_IN_BUTTON : "登入",
        ALERT_TRY_AGAIN_BUTTON : "再試一次",
        GET_MORE_HELP : "請點選這裡以取得其他說明。",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "如果持續看到此訊息，請點選這裡取得說明。",
        ALERT_BUY_TITANIUM_BUTTON : "立即購買",
        ALERT_RESTART_BUTTON : "重新啟動",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "趨勢科技社群隱私偵測在 Google Chrome 中運行時遇到問題。",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "請點選這裡以取得修正此問題的簡易指示。",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "重新啟動 Google Chrome 以套用變更。",
        FIREFOX_RESTART_TITLE : "重新啟動 Firefox 以套用變更。",
        INTERNET_EXPLORER_RESTART_TITLE : "重新啟動 Internet Explorer 以套用變更。",
        
        CHROME_STOP_TITLE : "必須立即關閉 Google Chrome，才能套用變更。",
        FIREFOX_STOP_TITLE : "必須立即關閉 Firefox，才能套用變更。",
        INTERNET_EXPLORER_STOP_TITLE : "必須立即關閉 Internet Explorer，才能套用變更。",
        
        ALERT_APPLY_CLOSE_BUTTON : "立即套用",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "稍後套用",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "重新啟動 Google Chrome 以套用變更。",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "重新啟動 Firefox 以套用變更。",
        RESTART_IE_LATER_OR_NOT_TITLE : "重新啟動 Internet Explorer 以套用變更。",
        ALERT_RESTART_NOW : "立即重新啟動",
        ALERT_RESTART_LATER : "稍後重新啟動",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "若要使變更生效，必須關閉 Google Chrome。您可以立即關閉或稍後再關閉。",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "若要使變更生效，必須關閉 Firefox。您可以立即關閉或稍後再關閉。",
        CLOSE_IE_LATER_OR_NOT_TITLE : "若要使變更生效，必須關閉 Internet Explorer。您可以立即關閉或稍後再關閉。",
        ALERT_CLOSE_NOW : "立即變更",
        ALERT_CLOSE_LATER : "稍後變更",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "您必須啟動趨勢科技安全防護軟體來掃瞄 Internet Explorer。",
        ERROR_CHROME_LAUNCH_TI_FIRST : "您必須啟動趨勢科技安全防護軟體來掃瞄 Google Chrome。",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "您必須啟動趨勢科技安全防護軟體來掃瞄 Firefox。",
        
        ERROR_IE_VERSION_TOO_LOW : "請先升級為最新版本的 Microsoft Internet Explorer，然後點選以下按鈕。",
        
        ERROR_DEFAULT_TITLE : "發生錯誤。請稍後再試一次。",
        ERROR_DEFAULT_LEARN_MORE : "深入瞭解",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "請升級為最新版本的 Microsoft Internet Explorer。",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "請透過瀏覽流量傳送「不要追蹤」要求。",
        cr_do_not_track_DESC : "並非所有的網站都會處理您想要避免追蹤您線上所執行一切動作的要求。",
        cr_do_not_track_value_0_POSSIBLEVALUE : "開啟",
        cr_do_not_track_value_1_POSSIBLEVALUE : "關閉",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "提供儲存我在網路上輸入的密碼服務。",
        cr_remember_sign_on_DESC : "惡意網站和軟體可能會利用儲存在 Google Chrome 中的個人資訊。",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "開啟",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "關閉",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "啟動網路釣魚和惡意程式防護。",
        cr_phishing_protect_DESC : "在開啟網站之前，Google Chrome 將會確定該網站未出現在與惡意軟體和線上詐騙相關的位址清單中。",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "開啟",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "關閉",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "當網站嘗試追蹤您時，瀏覽器應該如何回應？",
        ff_do_not_track_DESC : "並非所有的網站都會處理您想要避免追蹤您線上所執行一切動作的要求。",
        ff_do_not_track_value_0_POSSIBLEVALUE : "阻止追蹤",
        ff_do_not_track_value_1_POSSIBLEVALUE : "允許追蹤",
        ff_do_not_track_value_2_POSSIBLEVALUE : "Express 沒有喜好設定",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "記住網站的密碼",
        ff_remember_sign_on_DESC : "惡意網站和軟體可能會利用儲存在 FireFox 中的個人資訊。",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "開啟",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "關閉",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "封鎖報告的攻擊網站",
        ff_block_attack_sites_DESC : "在開啟網站之前，FireFox 將會確定該網站未出現在與惡意軟體和駭客相關的位址清單中。",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "開啟",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "關閉",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "封鎖報告的偽造網站",
        ff_block_web_forgeries_DESC : "在開啟網站之前，FireFox 將會確定該網站未出現在與線上詐騙郵件相關的位址清單中。",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "開啟",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "關閉",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "傳送「不要追蹤」要求至您要在 Internet Explorer 中瀏覽的網站",
        ie_do_not_track_DESC : "並非所有的網站都會處理您想要避免追蹤您線上所執行一切動作的要求。",
        ie_do_not_track_value_0_POSSIBLEVALUE : "關閉",
        ie_do_not_track_value_1_POSSIBLEVALUE : "開啟",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "啟動 SmartScreen 過濾",
        ie_phishing_protect_DESC : "在開啟網站之前，Internet Explorer 將會確定該網站未出現在與線上詐騙郵件相關的位址清單中。",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "關閉",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "開啟",
        
        // ie_remember_password
        ie_remember_password_TITLE : "為表單上的使用者名稱和密碼使用「自動完成」",
        ie_remember_password_DESC : "惡意網站和軟體可能會利用儲存在 Internet Explorer 中的個人資訊。",
        ie_remember_password_value_0_POSSIBLEVALUE : "關閉",
        ie_remember_password_value_1_POSSIBLEVALUE : "開啟",
        
        // ie_private_mode
        ie_private_mode_TITLE : "InPrivate 瀏覽啟動時停用工具列和延伸模組",
        ie_private_mode_DESC : "關閉這些額外的功能，可協助確保使用 InPrivate 瀏覽時，不會有任何程式再追蹤您的線上活動。",
        ie_private_mode_value_0_POSSIBLEVALUE : "關閉",
        ie_private_mode_value_1_POSSIBLEVALUE : "開啟",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "應用程式可見性和貼文對象",
        fb_app_titleArea_radio_wording_apply_all: "誰可以看到 %NUM% 個應用程式及其貼文？",
        fb_app_titleArea_radio_wording_apply_all_singular: "誰可以看到 1 個應用程式及其貼文？",
        fb_app_titleArea_radio_wording_apply_individ:"誰可以看到每個應用程式及其貼文？",
        fb_app_titleArea_title_wording_detail_tooltip:"此設定控制誰在 Facebook 上可看到您在使用此應用程式。它還允許您選擇可查看此應用程式代表您所發的貼文的對象。",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"這會從您的 Facebook 帳號移除應用程式。該應用程式不會再出現在您的書籤中或者您使用的應用程式清單 (可在您的設定中找到) 中。<a href='https://www.facebook.com/help/234899866630865' target='_blank'>深入瞭解</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"朋友",
        fb_app_level_FriendsOfFriends_wording:"朋友的朋友",
        fb_app_level_public_wording:"公開",
        fb_app_level_onlyme_wording:"只有我",
        fb_app_extend_wording:"顯示更多內容",
        fb_app_unextend_wording:"顯示較少內容",
        fb_app_remove_tooltip:"從 Facebook 移除應用程式",
        fb_app_remove_title:"是否從 Facebook 移除 %APPNAME%？",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"Google+ 不支援 Internet Explorer 8。請在其他瀏覽器中開啟 Google+ 或升級至最新版本的 Microsoft Internet Explorer。",
        fb_twitter_on_IE9:"X 不支援 Internet Explorer 9 和更早版本。請在其他瀏覽器中開啟 X 或升級至最新版本的 Microsoft Internet Explorer。",

        // Twitter wordings
        tw_str_fix_pop1:"若要繼續，請移至瀏覽器視窗中出現的「X」標籤，然後提供您的 X 密碼。", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"完成密碼輸入後，請點選「確定」來修正問題。"
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
