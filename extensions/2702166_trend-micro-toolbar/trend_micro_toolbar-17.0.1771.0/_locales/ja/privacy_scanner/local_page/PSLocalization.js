(function() {

    /////////////L10N string start////////////////
    var PSLocalization = {
        HEADER_GETHELP : "ヘルプの表示",
        /*
         IE uses the hard code Help URL
         */
        HEADER_GETHELP_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?PID=TEG0&Locale=JA-JP&SP=F&VID=&Target=OLH&FunID=100002",
        /*
         overlay area
         */
        NETWORK_ERROR_CONTENT : "インターネットに接続できません。接続を確認してからやりなおしてください。",
        PROMOTE_TITANIUM_CONTENT : "Facebook、X (旧Twitter)、LinkedInのプライバシー保護を強化します。",
        PROMOTE_TITANIUM_URL : "http://www.go-tm.jp/vb",
        OVERLAY_OK : "OK",
        OVERLAY_SCAN : "スキャン",
        OVERLAY_SIGN_IN : "ログイン",
        OVERLAY_CANCEL : "キャンセル",
        OVERLAY_REMOVE : "削除",
        
        OVERLAY_CHECKNOW : "今すぐチェック",
        OVERLAY_FACEBOOK_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "他のFacebookアカウントでログインしています。このアカウントのプライバシー設定を確認しますか?",
        OVERLAY_TWITTER_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "他のX (旧Twitter) アカウントを選択しています。このアカウントのプライバシー設定を確認しますか?",
        OVERLAY_GOOGLEPLUS_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "他のGoogle+アカウントを選択しています。このアカウントのプライバシー設定を確認しますか?",
        OVERLAY_LINKEDIN_FIND_ANOTHER_ACCOUNT_SUDDENDLY : "他のLinkedInアカウントを選択しています。このアカウントのプライバシー設定を確認しますか?",
        
        OVERLAY_TWITTER_CONFIRM_PASSWORD : "パスワードを認証しました。結果を表示するには、次のボタンをクリックします。",
        OVERLAY_LINKEDIN_CONFIRM_PASSWORD : "ログインしました。[OK] をクリックして結果を表示します。",

        OVERLAY_FACEBOOK_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "お使いのアカウントにログインしています。",
        OVERLAY_TWITTER_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "お使いのアカウントにログインしています。",
        OVERLAY_GOOGLEPLUS_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "お使いのアカウントにログインしています。",
        OVERLAY_LINKEDIN_HAVE_SIGN_IN_ANOTHER_ACCOUNT : "お使いのアカウントにログインしています。",

        OVERLAY_DO_NOT_CLOSE_THE_TAB_FACEBOOK_SCAN : "FacebookのWebサイトが自動的に開いたら、そのままの状態で設定をスキャンしてください。",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_TWITTER_SCAN : "X (旧Twitter) のWebサイトが自動的に開いたら、そのままの状態で設定をスキャンしてください。",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_GOOGLEPLUS_SCAN : "Google+のWebサイトが自動的に開いたら、そのままの状態で設定をスキャンしてください。",
        OVERLAY_DO_NOT_CLOSE_THE_TAB_LINKEDIN_SCAN : "LinkedInのWebサイトが自動的に開いたら、そのままの状態で設定をスキャンしてください。",

        OVERLAY_TIMEOUT_FROM_EXTENSION : "インターネットに接続できません。接続を確認してからやりなおしてください。",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD : "変更内容を確認するにはX (旧Twitter) パスワードを入力します。続行するには次のボタンをクリックしてください。",
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_CHECKBOX_TITLE : "今後表示しない",
        
        OVERLAY_PROMOTE_USER_INPUT_PASSWORD_LINKEDIN : "変更内容を確認するには、LinkedInにもう一度ログインします。続行するには次のボタンをクリックしてください。",
        
        /*
         User account area
         */
        WRONGACCOUNT_NOT_USER : "お使いのアカウントが表示されていない場合",
        WRONGACCOUNT_SIGN_IN_WITH_THE_RIGHT_ONE : "異なるアカウントが表示されている場合は、ここをクリックしてログインをやりなおしてください。",

        /*
         Concern area
         */
        
        CONCERN_TITLE : "確認が必要なプライバシー設定: %d件",
        CONCERN_TITLE_ONE_CONCERN : "確認が必要なプライバシー設定: %d件",

        /*
         Fix all area
         */
        FIX_ALL_TITLE : "すべて変更",

        /*
         Share area
         */
        SHARE_DESCRIPTION : "プライバシーチェッカーについて共有",
        SHARE_TOOTHERS_SNS_TITLE : "ウイルスバスターのプライバシー設定チェックは、SNSサイトのプライバシー設定をチェックしてくれます。ぜひ試してみてください。",
        SHARE_TOOTHERS_BROWSER_TITLE : "ウイルスバスターのプライバシー設定チェックは、Webブラウザのプライバシー設定をチェックしてくれます。ぜひ試してみてください。",
        SHARE_TOOTHERS_LINK : "http://www.trendmicro.com",

        /*
         Setting area
         */
        SETTING_ITEM_MOREINFO : "(詳細の表示)",
        SETTING_ITEM_RECOMMENDED : "(推奨)",
        SETTING_ITEM_ON : "オン",
        SETTING_ITEM_OFF : "オフ",

        /*
         Setting category
         */
        CATEGORY_People_can_see_your_personal_info : "個人的な情報を利用される可能性",
        CATEGORY_Strangers_can_easily_track_you : "個人の特定に利用される可能性",
        CATEGORY_You_can_be_tagged_without_your_permission : "許可なく写真を利用される可能性",
        CATEGORY_People_outside_of_Facebook_can_see_your_info : "Facebookの利用者以外に個人情報を閲覧される可能性",
        CATEGORY_People_can_see_where_you_were : "居場所の特定などに利用される可能性",
        CATEGORY_People_can_download_your_photos : "写真をダウンロードされる可能性",
        CATEGORY_Advertizers_can_learn_more_about_you : "広告主に個人情報を知られる可能性",
        CATEGORY_People_outside_of_Linkedin_can_see_your_info : "LinkedInの利用者以外に個人情報を閲覧される可能性",
        CATEGORY_Strangers_could_monitor_your_connection : "第三者に接続を監視される可能性",
        CATEGORY_Browser_phishing_protect : "フィッシング対策",
        CATEGORY_Application_access : "%NUM%件のアプリとその投稿が公開される可能性",
        CATEGORY_Application_access_plural : "%NUM%件のアプリとその投稿が公開される可能性",

        /*
         SAVE_CHANGES
         */

        SAVE_CHANGES_CHANGES_MADE : "行われた変更:",
        SAVE_CHANGES_BUTTON_TITLE : "変更の保存",
        SAVE_CHANGES_TWITTER_HINT : "変更するには、次のボタンをクリックしてX (旧Twitter) のパスワードを入力してください。",
        SAVE_CHANGES_FIRSTTIME_HINT : "変更を保存するには、ここをクリックします。",

        /*
         No concerns page
         */
        NO_CONCERN_DESCRIPTION : "推奨されるプライバシー設定が適用されています。",

        /*
         quick fix
         */
        QUICKFIX_TITLE : "すべて変更",
        QUICKFIX_DESCRIPTION : "個人情報を守るために、次の設定を変更します。",
        QUICKFIX_SETTING : "設定",
        QUICKFIX_CHANGES : "変更後の設定",
        QUICKFIX_CURRENT : "現在の設定",
        QUICKFIX_NEW : "変更後の設定",
        QUICKFIX_FIXALL_BUTTON : "変更",
        QUICKFIX_FIXALL_CANCEL : "キャンセル",

        /*
         load to html dom
         */
        HTML_PAGE_TITLE : "プライバシー設定チェック",
        HTML_TITLE_FACEBOOK : "Facebook",
        HTML_TITLE_TWITTER : "X (旧Twitter)",
        HTML_TITLE_GOOGLEPLUS : "Google+",
        HTML_TITLE_LINKEDIN : "LinkedIn",
        HTML_TITLE_CHROME : "Google Chrome",
        HTML_TITLE_FIREFOX : "Firefox",
        HTML_TITLE_INTERNET_EXPLORER : "Internet Explorer",
        HTML_CONCERNS_UNKNOWN : "?",
        HTML_FOOTER_TREND_DOT_COM : "トレンドマイクロ",
        HTML_FOOTER_TREND_DOT_COM_LINK : "http://www.trendmicro.com/",
        HTML_FOOTER_COPYRIGHT : "Copyright © 2023 Trend Micro Incorporated. All rights reserved.",
        
        SNS_AREA_TITLE : "SNSサイト",
        BROWSERS_AREA_TITLE : "ブラウザ",
        
        /*
         busy fixing
         */
        BUSY_FIXING_HINT : "このSNSの最新の仕様に対応中のため、現在ご利用いただけません。他のSNSではプライバシー設定の確認ができます。",

        /*
         enable toolbar
         */
        ENABLE_TOOLBAR_HINT : "プライバシー設定をチェックするには、Trend ツールバーを有効にしてください。",
        ENABLE_TOOLBAR_LINK : "http://gr.trendmicro.com/GREntry/NonPayment?TARGET=iKB&FunID=Privacy_Scan_2&Locale=JA-JP",
        
        /*
         alert message in tab content
         */
        ALERT_LOG_IN_TITLE : "プライバシー設定をチェックするには、SNSにログインしてください。",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_SCAN : "プライバシー設定をチェックするには、SNSログイン画面に [ログインしたままにする] などのチェックボックスがある場合、オンにしてログインします。",
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_WHEN_FIX : "検出されたプライバシー設定の問題を解決するには、SNSログイン画面に [ログインしたままにする] などのチェックボックスがある場合、オンにしてログインします。",
        
        ALERT_LOG_IN_SAFAFI_NEED_CHECKED_LEARN_MORE : "詳細の表示",
        
        ALERT_SOMETHING_WENT_WRONG_TITLE : "問題が発生しました。しばらくしてからやりなおしてください。",
        ALERT_SIGN_IN_TO_FIX_TITLE : "プライバシー設定を変更するには、SNSにログインしてください。",
        ALERT_SIGN_IN_BUTTON : "ログイン",
        ALERT_TRY_AGAIN_BUTTON : "やりなおす",
        GET_MORE_HELP : "詳細の表示",
        ALERT_UNABLE_TO_OPEN_SETTING_PAGE_LEARN_MORE : "このメッセージが何度も表示される場合",
        ALERT_BUY_TITANIUM_BUTTON : "今すぐ購入",
        ALERT_RESTART_BUTTON : "再起動",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE : "プライバシー設定をチェックできません。",
        ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE : "本機能をご利用いただくには、Google Chromeからログアウトしてください。",
        
        /*
            remind user to restart/shutdown first.
        */
        CHROME_RESTART_TITLE : "Google Chromeを再起動して変更を適用してください。",
        FIREFOX_RESTART_TITLE : "Firefoxを再起動して変更を適用してください。",
        INTERNET_EXPLORER_RESTART_TITLE : "Internet Explorerを再起動して変更を適用してください。",
        
        CHROME_STOP_TITLE : "Google Chromeを再起動して変更を適用してください。",
        FIREFOX_STOP_TITLE : "Firefoxを閉じて変更を適用してください。",
        INTERNET_EXPLORER_STOP_TITLE : "Internet Explorerを閉じて変更を適用してください。",
        
        ALERT_APPLY_CLOSE_BUTTON : "今すぐ適用",
        ALERT_APPLY_CLOSE__LATER_BUTTON : "後で適用",
        
        
        /*
            fix first, then remind user to restart/shutdown later
        */
        RESTART_CHROME_LATER_OR_NOT_TITLE : "Google Chromeを再起動して変更を適用してください。",
        RESTART_FIREFOX_LATER_OR_NOT_TITLE : "Firefoxを再起動して変更を適用してください。",
        RESTART_IE_LATER_OR_NOT_TITLE : "Internet Explorerを再起動して変更を適用してください。",
        ALERT_RESTART_NOW : "今すぐ再起動",
        ALERT_RESTART_LATER : "後で再起動",
        
        CLOSE_CHROME_LATER_OR_NOT_TITLE : "変更を有効にするにはGoogle Chromeを閉じる必要があります。後で画面を閉じることもできます。",
        CLOSE_FIREFOX_LATER_OR_NOT_TITLE : "変更を有効にするにはFirefoxを閉じる必要があります。後で画面を閉じることもできます。",
        CLOSE_IE_LATER_OR_NOT_TITLE : "変更を有効にするにはInternet Explorerを閉じる必要があります。後で画面を閉じることもできます。",
        ALERT_CLOSE_NOW : "今すぐ変更",
        ALERT_CLOSE_LATER : "後で変更",
        
        // BPS error handle
        ERROR_IE_LAUNCH_TI_FIRST : "Internet Explorerをスキャンするには、ウイルスバスターを起動する必要があります。",
        ERROR_CHROME_LAUNCH_TI_FIRST : "Google Chromeをスキャンするには、ウイルスバスターを起動する必要があります。",
        ERROR_FIREFOX_LAUNCH_TI_FIRST : "Firefoxをスキャンするには、ウイルスバスターを起動する必要があります。",
        
        ERROR_IE_VERSION_TOO_LOW : "以下のボタンをクリックする前に、Internet Explorerを最新バージョンにアップグレードしてください。",
        
        ERROR_DEFAULT_TITLE : "問題が発生しました。しばらくしてからやりなおしてください。",
        ERROR_DEFAULT_LEARN_MORE : "詳細の表示",
        
        /*
            IE6/7 error message
        */
        UPDATE_TO_LATEST_IE : "Internet Explorerの最新バージョンにアップデートしてください。",
        
        
        /*
            browser privacy scanner wording
        */
       
        /*
            [BPS] Chrome
        */
        // cr_do_not_track
        cr_do_not_track_TITLE : "閲覧トラフィックと一緒に「トラッキング拒否」リクエストを送信",
        cr_do_not_track_DESC : "すべてのWebサイトで「トラッキング拒否」リクエストが受け入れられるわけではありません。",
        cr_do_not_track_value_0_POSSIBLEVALUE : "有効",
        cr_do_not_track_value_1_POSSIBLEVALUE : "無効",
        
        // cr_remember_sign_on
        cr_remember_sign_on_TITLE : "Web上で入力したパスワードを保存できるようにする",
        cr_remember_sign_on_DESC : "Google Chromeに保存した個人情報が有害なWeb脅威やソフトウェアによって利用される可能性があります。",
        cr_remember_sign_on_value_0_POSSIBLEVALUE : "有効",
        cr_remember_sign_on_value_1_POSSIBLEVALUE : "無効",
        
        // cr_phishing_protect
        cr_phishing_protect_TITLE : "フィッシングや不正なソフトウェアからの保護を有効にする",
        cr_phishing_protect_DESC : "Webサイトを開く前に、Google Chromeで不正なソフトウェアやオンライン詐欺に関連するアドレスのリストがチェックされます。",
        cr_phishing_protect_value_0_POSSIBLEVALUE : "有効",
        cr_phishing_protect_value_1_POSSIBLEVALUE : "無効",
        
        
        /*
            [BPS] Firefox
        */
        // ff_do_not_track
        ff_do_not_track_TITLE : "トラッキング",
        ff_do_not_track_DESC : "すべてのWebサイトで「トラッキング拒否」リクエストが受け入れられるわけではありません。",
        ff_do_not_track_value_0_POSSIBLEVALUE : "トラッキングの拒否をサイトに通知する",
        ff_do_not_track_value_1_POSSIBLEVALUE : "トラッキングの許可をサイトに通知する",
        ff_do_not_track_value_2_POSSIBLEVALUE : "トラッキングに関する設定は一切サイトに通知しない",
        
        // ff_remember_sign_on
        ff_remember_sign_on_TITLE : "サイトのパスワードを保存する",
        ff_remember_sign_on_DESC : "FireFoxに保存した個人情報が有害なWeb脅威やソフトウェアによって利用される可能性があります。",
        ff_remember_sign_on_value_0_POSSIBLEVALUE : "有効",
        ff_remember_sign_on_value_1_POSSIBLEVALUE : "無効",
        
        // ff_block_attack_sites
        ff_block_attack_sites_TITLE : "攻撃サイトとして報告されているサイトをブロックする",
        ff_block_attack_sites_DESC : "Webサイトを開く前に、FireFoxで不正なソフトウェアやハッカーに関連するアドレスのリストがチェックされます。",
        ff_block_attack_sites_value_0_POSSIBLEVALUE : "有効",
        ff_block_attack_sites_value_1_POSSIBLEVALUE : "無効",
        
        // ff_block_web_forgeries
        ff_block_web_forgeries_TITLE : "偽装サイトとして報告されているサイトをブロックする",
        ff_block_web_forgeries_DESC : "Webサイトを開く前に、FireFoxでオンライン詐欺に関連するアドレスのリストがチェックされます。",
        ff_block_web_forgeries_value_0_POSSIBLEVALUE : "有効",
        ff_block_web_forgeries_value_1_POSSIBLEVALUE : "無効",
        
        
        /*
            [BPS] IE
        */
        // ie_do_not_track
        ie_do_not_track_TITLE : "常に Do Not Track ヘッダーを送信する",
        ie_do_not_track_DESC : "すべてのWebサイトで「トラッキング拒否」リクエストが受け入れられるわけではありません。",
        ie_do_not_track_value_0_POSSIBLEVALUE : "無効",
        ie_do_not_track_value_1_POSSIBLEVALUE : "有効",
        
        // ie_phishing_protect
        ie_phishing_protect_TITLE : "SmartScreen フィルター機能を有効にする",
        ie_phishing_protect_DESC : "Webサイトを開く前に、Internet Explorerでオンライン詐欺に関連するアドレスのリストがチェックされます。",
        ie_phishing_protect_value_0_POSSIBLEVALUE : "無効",
        ie_phishing_protect_value_1_POSSIBLEVALUE : "有効",
        
        // ie_remember_password
        ie_remember_password_TITLE : "オートコンプリートの設定: フォームのユーザー名およびパスワード",
        ie_remember_password_DESC : "Internet Explorerに保存した個人情報が有害なWeb脅威やソフトウェアによって利用される可能性があります。",
        ie_remember_password_value_0_POSSIBLEVALUE : "無効",
        ie_remember_password_value_1_POSSIBLEVALUE : "有効",
        
        // ie_private_mode
        ie_private_mode_TITLE : "InPrivate ブラウズの開始時に、ツールバーと拡張機能を無効にする",
        ie_private_mode_DESC : "InPrivate ブラウズを使用すると、Internet Explorerに履歴や個人情報などを残さずにWebページを閲覧できます。",
        ie_private_mode_value_0_POSSIBLEVALUE : "無効",
        ie_private_mode_value_1_POSSIBLEVALUE : "有効",
        
        // facebook application settings
        fb_app_titleArea_title_wording_title: "アプリと投稿の公開",
        fb_app_titleArea_radio_wording_apply_all: "%NUM%件のアプリとその投稿の公開範囲",
        fb_app_titleArea_radio_wording_apply_all_singular: "1件のアプリとその投稿の公開範囲",
        fb_app_titleArea_radio_wording_apply_individ:"それぞれのアプリとその投稿の公開範囲",
        fb_app_titleArea_title_wording_detail_tooltip:"このアプリの利用についての公開範囲を設定できます。また、アプリによる投稿の公開範囲も選択できます。",
        OVERLAY_REMOVE_FACEBOOK_APPLICATION:"Facebookアカウントからアプリを削除します。アプリはブックマークにも、使用しているアプリの一覧にも表示されなくなります。<a href='https://www.facebook.com/help/234899866630865' target='_blank'>もっと見る</a>", //Please just translate the "Learn more", keep the html element.
        fb_app_level_friends_wording:"友達",
        fb_app_level_FriendsOfFriends_wording:"友達の友達",
        fb_app_level_public_wording:"公開",
        fb_app_level_onlyme_wording:"自分のみ",
        fb_app_extend_wording:"もっと表示",
        fb_app_unextend_wording:"一部を表示",
        fb_app_remove_tooltip:"Facebookからアプリを削除します",
        fb_app_remove_title:"Facebookから%APPNAME%を削除しますか?",  //%APPNAME% is param, will be replaced using code.
        fb_google_plus_on_IE8:"Google+はInternet Explorer 8をサポートしていません。他のブラウザで開くか、Internet Explorerの最新バージョンにアップデートしてください。",
        fb_twitter_on_IE9:"X (旧Twitter) はInternet Explorer 9以前をサポートしていません。他のブラウザを使用するか、Internet Explorer、またはMicrosoft Edgeの最新バージョンにアップデートしてください。",

        // Twitter wordings
        tw_str_fix_pop1:"変更の保存を続行するには、お使いのブラウザに表示されたX (旧Twitter) のタブに移動し、X (旧Twitter) のパスワードを入力してください。", //Please just translate the "Learn more", keep the html element.
        tw_str_fix_pop2:"パスワードの入力が完了したら、[OK] をクリックしてください。"
    };
    /////////////L10N string end//////////////////
    var exports = window;

    exports.PSLocalization = PSLocalization;
})();
