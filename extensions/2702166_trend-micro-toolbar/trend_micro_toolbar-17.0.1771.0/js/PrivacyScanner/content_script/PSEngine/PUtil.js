(function() {'use strict';
    
    window.substringBetween = function(startStr, endStr, str) {

        if (str == null) {
            return null;
        }
        var start = str.indexOf(startStr);
        if (start == -1) {
            return null;
        }

        var end = str.indexOf(endStr, start + startStr.length);
        if (end == -1) {
            return null;
        }

        return str.substring(start + startStr.length, end);
    };
    
    /*
     setting
     */
    window.SettingConstants = {
        is_first_savechange: 'IsFirstSaveChanges',
        is_first_fixtwitter: 'IsFirstFixTwitter',
        is_first_fixlinkedin: 'IsFirstFixLinkedIn',
        is_console_log_enabled: 'IsConsoleLogEnabled',
        is_file_log_enabled: 'IsFileLogEnabled'
    };
    window.PrivacyScannerGlobalSettings = {};

    /* PSDebug */
    var PSDebug = (function() {
        var LOGLEVEL = {
            VERBOSE: 1,
            INFO: 2,
            WARNING: 3,
            ERROR: 4,
            DISABLED: 5
        };

        var THRESHOLD = LOGLEVEL.WARNING;

        var noop = function() {
        };

        var final_debug = function(msg) {
            try {
                //IE && Chrome console
                if (console && console.log) {
                    console.log(msg);
                    return;
                }

                //Firefox sonsole
                if (window.console && window.console.info) {
                    window.console.info.apply(console, arguments);
                    return;
                }
            }catch (e) {
            }
        };
        
        var get_right_msg = function(prefix, message) {
            var string_msg;
            try {
                string_msg = JSON.stringify(message);
            }catch (e) {
                string_msg = message;
            }
            return prefix + string_msg;
        };

        return {
            log: THRESHOLD > LOGLEVEL.VERBOSE ? noop : function(message) {
                var string_msg = get_right_msg('[LOG]', message);
                var console_log_enabled = window.PrivacyScannerGlobalSettings[SettingConstants.is_console_log_enabled];
                if (typeof (console_log_enabled) == 'undefined' || console_log_enabled) {
                    if (typeof (console) != 'undefined' && typeof (console.debug) != 'undefined') {
                        console.debug(message);
                    } else {
                        final_debug(string_msg);
                    }
                }
            },
            info: THRESHOLD > LOGLEVEL.INFO ? noop : function(message) {
                var string_msg = get_right_msg('[INFO]', message);
                var console_log_enabled = window.PrivacyScannerGlobalSettings[SettingConstants.is_console_log_enabled];
                if (typeof (console_log_enabled) == 'undefined' || console_log_enabled) {
                    if (typeof (console) != 'undefined' && typeof (console.info) != 'undefined') {
                        console.info(message);
                    } else {
                        final_debug(string_msg);
                    }
                }
            },
            warn: THRESHOLD > LOGLEVEL.WARNING ? noop : function(message) {
                var string_msg = get_right_msg('[WARN]', message);
                var console_log_enabled = window.PrivacyScannerGlobalSettings[SettingConstants.is_console_log_enabled];
                if (typeof (console_log_enabled) == 'undefined' || console_log_enabled) {
                    if (typeof (console) != 'undefined' && typeof (console.warn) != 'undefined') {
                        console.warn(message);
                    } else {
                        final_debug(string_msg);
                    }
                }
            },
            error: THRESHOLD > LOGLEVEL.ERROR ? noop : function(message) {
                var string_msg = get_right_msg('[ERROR]', message);
                var console_log_enabled = window.PrivacyScannerGlobalSettings[SettingConstants.is_console_log_enabled];
                if (typeof (console_log_enabled) == 'undefined' || console_log_enabled) {
                    if (typeof (console) != 'undefined' && typeof (console.error) != 'undefined') {
                        console.error(message);
                    } else {
                        final_debug(string_msg);
                    }
                }
            }
        };
    })();

    /* PUtil */
    var PUtil = {};

    PUtil.cloneObj = function(obj) {
        return JSON.parse(JSON.stringify(obj));
    };
    
    PUtil.checkPage = {
        InDomain: function(domain) {
            if (window.location.host.indexOf(domain) != -1) {
                return true;
            }
            return false;
        },
        IsFacebook: function(){
            return PUtil.checkPage.InDomain('facebook.com');
        },
        IsTwitter: function(){
            return PUtil.checkPage.InDomain('twitter.com');
        },
        IsGooglePlus: function(){
            return PUtil.checkPage.InDomain('google.com');
        },
        IsLinkedIn: function(){
            return PUtil.checkPage.InDomain('linkedin.com');
        }
    };
    
    PUtil.checkBrowser = {
        IsSafari: function() {
            return typeof (safari) !== 'undefined';
        },
        IsEdgeNext: function() {
            return (typeof (chrome) !== 'undefined') && (navigator.userAgent.indexOf("Edg") != -1);
        },
        IsChrome: function() {
            return (typeof (safari) === 'undefined') && (typeof (chrome) !== 'undefined') && (navigator.userAgent.indexOf("Edg") == -1);
        },
        IsFirefox: function() {
            return navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
        },
        IsIE: function() {
            var isIE = false;
            try {
                isIE = (typeof (ActiveXObject) != 'undefined') || (typeof (new ActiveXObject("Microsoft.XMLHTTP")) != 'undefined');
            } catch(e){
            }
            return isIE;
        },
        IsIELowerThan_8: function() {
            if (PUtil.checkBrowser.IsIE()) {
                try {
                    if (typeof (TMExt_$.browser) != 'undefined' &&
                        typeof (TMExt_$.browser.version) != 'undefined' &&
                        parseFloat(TMExt_$.browser.version) < 8) {
                        return true;
                    }
                }catch(e){
                    return false;
                }
            }
            return false;
        },
        IsIE_8: function() {
            if (PUtil.checkBrowser.IsIE()) {
                try {
                    if (typeof (TMExt_$.browser) != 'undefined' &&
                        typeof (TMExt_$.browser.version) != 'undefined' &&
                        parseInt(TMExt_$.browser.version) == 8) {
                        return true;
                    }
                }catch(e){
                    return false;
                }
            }
            return false;
        },
		IsIELowerThan_9: function() {
            if (PUtil.checkBrowser.IsIE()) {
                try {
                    if (typeof (TMExt_$.browser) != 'undefined' &&
                        typeof (TMExt_$.browser.version) != 'undefined' &&
                        parseFloat(TMExt_$.browser.version) < 9) {
                        return true;
                    }
                }catch(e){
                    return false;
                }
            }
            return false;
        },
        IsIE_9: function() {
            if (PUtil.checkBrowser.IsIE()) {
                try {
                    if (typeof (TMExt_$.browser) != 'undefined' &&
                        typeof (TMExt_$.browser.version) != 'undefined' &&
                        parseInt(TMExt_$.browser.version) == 9) {
                        return true;
                    }
                }catch(e){
                    return false;
                }
            }
            return false;
        }
    };
    
    PUtil.GetIEObject = function(useActiveX) {
        if (!PUtil.checkBrowser.IsIE()) {
            return false;
        }
        
        var _GetActiveXObject = function() {
            if (!window.g_oTMIEObject){
                try {
                    window.g_oTMIEObject = new ActiveXObject('ProToolbarIMRatingActiveX.ToolbarCB');
                } catch (e) {
                    window.g_oTMIEObject = null;
                }
            }
            
            if (window.g_oTMIEObject &&
                typeof (window.g_oTMIEObject.ToolbarInvoke) != 'undefined' &&
                window.g_oTMIEObject.ToolbarInvoke({'test_key':'test_value'}) != false) {
                return window.g_oTMIEObject;
            }
            
            return null;
        }
        
        var _GetExternalObject = function() {
            if (typeof (window.external.ToolbarInvoke) != 'undefined') {
                return window.external;
            }
            return null;
        }
        return useActiveX ? _GetActiveXObject() : _GetExternalObject();
    }
    
    var ReturnCodeEnum = {
        OK: {
            code: '0',
            description: 'ok'
        },
        UNKNOWN_EXCEPTION: {
            code: '90000000',
            description: 'unknown exception'
        },
        NETWORK_ERROR: {
            code: '90000001',
            description: 'network error'
        },
        WEBRESPONSE_PARSE_ERROR: {
            code: '90000002',
            description: 'for scan single, it means parse error. for scan, it means all setting are parsed error.'
            /*
                for scan single, it means parse error.
                for scan, it means all setting are parsed error.
            */
        },
        NOT_LOGGED_IN: {
            code: '90000003',
            description: "user didn't logged in"
        },
        INVALID_ID: {
            code: '90000004',
            description: 'invalid ID'
        },
        INVALID_FIX_VALUE: {
            code: '90000005',
            description: 'invalid fix value'
        },
        WEBRESPONSE_PARSE_ERROR_COULD_USE_PARTLY: {
            code: '90000006',
            description: 'web response parse error, not all of the settings could be got. but the result which could be handled will be stored into response'
            /*
                Only used in scan, it means not all settings could be got.
            */
        },
        PERFORM_CLICK_FAIL: {
            code: '90000007',
            description: 'perform click fail'
        }
    };

    var APIResponseHelper = function(header, returnCode, description, dataContent) {
    /*
            sample
            {
                "FPFixSingleResponse": {
                    "ReturnCode": "0",
                    "Description": "ok",
                    "Response": {
                        "id": 20,
                        "value": 2
                     }
                }
            }
    */

        if (!header) {
            PSDebug.error('header must be non-null:' + header);
            return;
        }
        this.header = header;

        this.Response = {
        };

        this.Response[header] = {};
        this.Response[header]['ReturnCode'] = returnCode;
        this.Response[header]['Description'] = description ? description : '';
        this.Response[header]['Response'] = dataContent ? dataContent : '';
    };

    APIResponseHelper.prototype.setResponseItem = function(key, value) {
        this.Response[this.header][key] = value;
    };

    APIResponseHelper.prototype.getResponse = function() {
        return this.Response;
    };

// ================================================
// SendDataConstructor
// ================================================
    var SendDataLogger = function(logHeader, params) {
        if (!logHeader) {
            this.logHeader = 'default logHeader';
        }else {
            this.logHeader = logHeader;
        }

        if (!params) {
            PSDebug.error(this.logHeader + ": params shouldn't be null");
            return;
        }

        this.params = params;
    };

    SendDataLogger.prototype.getLog = function() {
        PSDebug.log(this.logHeader);
        PSDebug.log(this.params);
    };

// ================================================
// ResponseHandler
// ================================================
    var ResponseHandlerLogger = function(logHeader, data) {
        // data: the data needed to be parsed
        // parser: function used to parse the data
        if (!logHeader) {
            this.logHeader = 'default logHeader';
        }else {
            this.logHeader = logHeader;
        }

        if (!data) {
            PSDebug.error(this.logHeader + ": data shouldn't be null");
            return;
        }

        this.data = data;
    };

    ResponseHandlerLogger.prototype.getLog = function() {
        PSDebug.log(this.logHeader);
        PSDebug.log(this.data);
    };

    var CookieUtil = {
        get: function(name) {
            var cookieName = encodeURIComponent(name) + '=',
                cookieStart = document.cookie.indexOf(cookieName),
                cookieValue = null;

            if (cookieStart >= 0) {
                var cookieEnd = document.cookie.indexOf(';', cookieStart);
                if (cookieEnd == -1) {
                    cookieEnd = document.cookie.length;
                }
                cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
            }
            return cookieValue;
        }
    };

    window.CookieUtil = CookieUtil;
    window.PUtil = PUtil;

    window.SendDataLogger = SendDataLogger;
    window.ResponseHandlerLogger = ResponseHandlerLogger;

    window.ReturnCodeEnum = ReturnCodeEnum;
    window.APIResponseHelper = APIResponseHelper;
    window.PSDebug = PSDebug;
    
})();
