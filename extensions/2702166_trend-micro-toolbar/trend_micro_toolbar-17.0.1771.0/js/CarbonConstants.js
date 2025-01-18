// constant define
// Regarding Times
var SECONDS = 1000;
var MINUTES = 60 * SECONDS;
var HOURS = 60 * MINUTES;
var DAYS = 24 * HOURS;

var CARBON_MODE = {
    STANDALONE: "Standalone",
    COEXIST: "Toolbar",
    PROMOTER: "Promoter"
}

var CONST_WAIT_BACKGROUND_TIME_OUT = 500;
var CONST_RATING_TIME_OUT = 500;

// action name, used in communication between content and background
var TB_ACTIONS =  {
    OPEN_HELP: 'tbb_open_help',
    OPEN_SETTINGS: 'tbb_open_settings',
    PRELOAD : "tbb_pre_load",
    INJECTRESOURCES:"tbb_inject_resources",
    RATINGURLS:"tbb_ratingURLS",
    RATINGSINGLEURL:"tbb_ratingSingleURL",
    RATINGOUTERSOURCEURLS:"tbb_ratingOuterSourceURLs",
    RATINGCREATETABS:"tbb_ratingCreatTabs",
    INSERTRATINGRESULT:"tbc_insertRatingResult",
    INSERTSINGLERESULT: "tbc_insertSingleRatingResult",
    FEEDBACK_UNTESTED_URL: "tbc_feedback_untested_url",
    FEEDBACK_NAVIGATION_DURATION:"tbc_feedback_navigation_duration",
    OPEN_FBPS_HELP: 'tbb_open_fbps_help',
    FEEDBACK_2_SITESAFETY: "tbb_feedback_2_sitesafety",
    SEND_MAIL_2_TMPLUGIN_TOOLBAR: "tbb_send_mail_2_tmplugin_toolbar",
    FORCE_REFRESH_PAGE: "tbb_force_refresh_page",
    UPDATE_GLOBAL_VARIABLES: "tbb_update_global_variables",
    SHOW_LOG_COLLECTION_RESULT: "tbb_show_log_collection_result",
    OPEN_PAYGURAD:"tbb_open_paygurad",
    SHOW_PAYGURAD_TUTORIAL:"tbb_show_paygurad_tutorial",
    SEND_PAYGURAD_UBM:"tbb_send_paygurad_ubm",
    GET_PRODUCT_SETTINGS:"tbb_get_product_settings",
    OPEN_LOGIN_PAGE: "tbb_open_login_page",
    FEED_UBM:"feedbackUBM",
    SEND_UNTEST_URL_UBM:"send_untested_url_ubm",
    GET_INFORMATION: 'tbb_get_information',
    GET_FRAUD_BUSTER_SECRET: 'tbb_get_fraud_buster_secret',
    POPUP_IN_TAB: 'tbc_popup_in_tab',
    OPEN_NEW_TAB_WITH_URL: 'tbb_open_new_tab_with_url',
    CAN_FRAUD_BUSTER_WORK: 'tbb_can_fraud_buster_work',
    FRAUD_BUSTER_GET_PRODUCT_INFO: 'tbb_getProductInfoForFraudBuster',
    GET_USER_FRAUD_BUSTER_SETTING: 'tbb_getUserFraudBusterSetting',
    SET_USER_FRAUD_BUSTER_SETTING: 'tbb_setUserFraudBusterSetting',
    GET_FRAUD_BUSTER_IDENTITY: 'tbb_getFraudBusterIdentity',
    ENABLED_FRAUD_BUSTER: 'tbb_enabledFraudBuster',
    DISABLED_FRAUD_BUSTER: 'tbb_disabledFraudBuster',
    WRITE_PRODUCT_EVENT_LOG: 'tbb_writeProductEventLog',
    SEND_UBM: 'tbb_sendUBM',
    UPDATE_PRODUCT_INFO: 'tbb_updateProductInfo',
    NOTIFY_PRODUCT_INFO_CHANGE: 'tbb_notifyProductInfoChange',
    UPDATE_EMAIL_SCANNED_COUNT: 'tbb_updateEmailScannedCount',
    NOTIFY_SIGN_IN: 'NOTIFY_SIGN_IN',
    GET_BANKING_LIST: 'tbb_get_banking_list',
    SAL_SCAN: 'tbb_sal_scan',
    OPEN_TI_WTP_EXCEPTION_PAGE: 'openTiWtpExceptionPage',
    SHOW_NOTIFICSTION: 'SHOW_NOTIFICSTION',
    SHOW_SALBLOCKINGPAGE: 'SHOW_SALBLOCKINGPAGE',
    CLOSE_SALBLOCKINGPAGE: 'CLOSE_SALBLOCKINGPAGE',
    PS_LOCAL_PAGE_MESSAGE: 'tbb_ps_local_page_message',
    PS_CONTENT_MESSAGE: 'tbb_ps_content_message',
    PS_CAN_PROMOTE: 'tbb_ps_can_promote',
    PS_GET_PROMOTION_STATUS: 'tbb_ps_get_promotion_status',
    PS_SET_PROMOTION_STATUS: 'tbb_ps_set_promotion_status',
    PS_CHECK_PRIVACY: 'tbb_ps_check_privacy',
    PS_SHOW_PROMOTION_LEARNMORE: 'tbb_ps_show_promtion_learn_more',
    PS_GET_SETTINGS: 'tbb_ps_get_settings',
    PS_SET_SETTINGS: 'tbb_ps_set_settings',
    PS_DATA_COLLECTION: 'tbb_ps_data_collection',
    PS_FEEDBACK_2FA_STATUS: 'tbb_ps_feedback_2fa_status',
    PS_REGISTER_CONTENT_PAGE: 'tbb_ps_register_content_page',
    PS_REGISTER_LOCAL_PAGE: 'tbb_ps_register_local_page',
    PS_OPEN_HELP_PAGE: 'tbb_ps_open_help_page',
    PS_BROWSER_SCAN: 'tbb_ps_browser_scan',
    PS_WEBSITE_SCAN: 'tbb_ps_website_scan'
};

// WRS Rating Level
var WRS_RATING_LEVEL = {
    Nolink: 0,
    Safe: 1,
    Neutral: 2,
    Dangerous: 3,
    Suspicious: 4,
    Untested: 5,
    Trusted: 6,
    Blocked: 7,
    PCBlocked: 8,
    HighSuspicious: 9,
    Limited: 100
};

// Values of NeedTutorial of Pay Guard
var PG_NEED_TUTORIAL = {
    DISABLED: 0,
    ENABLED: 1,
    PWM_EXT_ENABLED: 2,
    ALREADY_IN_PAY_GUARD: 3,
    AUTO_OPEN: 4
};

var UBM_ID = {
    FRAMEWORK_READY: 'CARBON_FrameworkStatus_S1',
    LICENSE_TOKEN_UPDATE_FAIL: 'CARBON_License_Token_Update_Fail_S1',
    LICENSE_EC_RESULT: 'CARBON_License_EC_Result_S1',
    LICENSE_EC_FAIL_NO_TOKEN: 'CARBON_License_EC_Fail_No_Token_S1',
    LICENSE_EC_FAIL_NO_REFRESH_TOKEN: 'CARBON_License_EC_Fail_No_Refresh_Token_S1',
    LICENSE_EC_FAIL_NO_GUID: 'CARBON_License_EC_Fail_No_GUID_S1',
    CLOSE_INSTALL_TOOLBAR_PAGE: 'CARBON_Close_Install_Toolbar_Page_S1',
    INSTALL: 'CARBON_Install_S1',
    UPDATE: 'CARBON_Update_S1',
    RATING_URLS: 'CARBON_Rating_URLs_S1',
    RATING_URLS_DANGEROUS: 'CARBON_Rating_URLs_Dangerous_S1',
    RATING_URLS_MOUSEOVER_TOOLTIP: 'CARBON_Rating_URLs_Mouseover_Tooltip_S1',
    RATING_HOW_TURN_OFF_HIGHLIGHT_LINK: 'CARBON_How_Turn_Off_Highlight_link_C1',
    RATING_URLS_BROWSING_NOT_SUPPORT: 'CARBON_Rating_URLs_Browsing_Not_Support_S1',
    RATING_URLS_MAVEN_COUNT: 'CARBON_Rating_URLs_Maven_Count_S1',
    RATING_URLS_DANGEROUS_OUTER_SOURCE: 'CARBON_Rating_URLs_Dangerous_Outer_Source_S1',
    RATING_SETTING_POPUP_SHOW:'CARBON_Setting_Popup_S1',
    RATING_SETTING_POPUP_APPLY_BUTTON_CLICK: 'CARBON_Setting_Popup_Apply_Btn_C1',
    RATING_SETTING_POPUP_CLOSE_BUTTON_CLICK: 'CARBON_Setting_Popup_Close_Btn_C1',  
    RATING_SETTING_POPUP_APPLIED_CLOSE_BUTTON_CLICK: 'CARBON_Setting_Popup_Applied_Close_Btn_C1',
    RATING_SETTING_POPUP_REMIND_LATER_LINK: 'CARBON_Setting_Popup_Remind_Later_link_C1',
    RATING_SETTING_POPUP_EXPLAIN_HOW_TOOLBAR_WORKS_LINK: 'CARBON_Setting_Popup_Explain_How_Toolbar_Works_link_C1',
    RATING_SETTING_POPUP_SETTING_LINK: 'CARBON_Setting_Popup_Setting_link_C1',  
    PAY_GUARD_BANKING_SITE_MATCHED: 'PAY_GUARD_BANKING_SITE_MATCHED',
    PAY_GUARD_SET_UNSUPPORT: 'PAY_GUARD_Set_Unsupport',
    AD_BLOCK_UPDATE_RULE_SET_ERROR: 'CARBON_AD_Block_Update_Rule_Set_Error_S1',
    STATUS_ON_START: 'CARBON_Status_On_Start_S1',
    TI_CLOSE_SYNC_PAGE: 'CARBON_Ti_Close_Sync_Page_S1',
    TI_PRODUCT_INFORMATION: 'CARBON_Ti_Product_Information_S1',
    NOTIFICATION_SENDMESSAGE_ERROR: 'CARBON_Notification_SendMessage_Error_S1',
    PRIVACY_SCANNER_2FA_STATUS: 'CARBON_Privacy_Scanner_2FA_Status_S1',
    MBE_DETECTION: 'CARBON_MBE_Detection_S1',
    NAVIGATION_DURATION: 'CARBON_Navigation_Duration_S1'
};

var SESSOION_RULE_ID = {
    ALLOW_TABS: 1
}