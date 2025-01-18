(function () {
    'use strict';

    // ================================================
    // SendDataConstructor
    // ================================================
    var ScanResultsTemplate = MTwitterScanResultsTemplate;




    /*
     * i18n regx pattern
     */
    var i18n_regx_pattern = {
        // ID 10: Display media that may contain sensitive content
        "10": {
            "title": {
                "en": "b940417929(.*)a1022106303",
                "zh_cn": "n.b1663854980(.*)b1975547046",
                "zh_tw": "a569296006(.*)a1658385040",
                "fr": "a385392922(.*)a60379260",
                "de": "b1228496817(.*)a1507656167",
                "ja": "a511758853(.*)b916344079",
                "es": "b1978149892(.*)a1498283482"
            }
        }, // ID 11: Protect my tweets
        "11": {
            "title": {
                "en": "a1012176678(.*)a8530520",
                "zh_cn": "a742493953(.*)a72454493",
                "zh_tw": "a199787703(.*)b1915545241",
                "fr": "b1333059677(.*)b986830341",
                "de": "b602520498(.*)b694614480",
                "ja": "a87152344(.*)b716530202",
                "es": "a677142913(.*)a1707036381"
            },
            "desc": {
                "en": "a8530520(.*)b2091600085",
                "zh_cn": "a72454493(.*)a282865836",
                "zh_tw": "b1915545241(.*)a1634682806",
                "fr": "b986830341(.*)a885929546",
                "de": "b694614480(.*)a1452941823",
                "ja": "b716530202(.*)b839267659",
                "es": "a1707036381(.*)a1971727916"
            }
        }, // ID 12: Let others find me by my email address
        "12": {
            "title": {
                "en": "a775393476(.*)a1514770429",
                "zh_cn": "a2020565599(.*)b246178046",
                "zh_tw": "b1367110763(.*)a337278732",
                "fr": "b1987056255(.*)a2118395808",
                "de": "a864645100(.*)a824912853",
                "ja": "a243801846(.*)a527790987",
                "es": "b846375713(.*)a1601002626"
            }
        }, // ID 13: Let others find me by my phone number
        "13": {
            "title": {
                "en": "a1514770429(.*)b709845759",
                "zh_cn": "b246178046(.*)b976224250",
                "zh_tw": "a337278732(.*)b1003913200",
                "fr": "a2118395808(.*)a1905950884",
                "de": "a824912853(.*)b1858627367",
                "ja": "a527790987(.*)a576600207",
                "es": "a1601002626(.*)a2118106502"
            }
        }, // ID 14: Add location information to my Tweets
        "14": {
            "title": {
                "en": "b1028205895(.*)b371294122",
                "zh_cn": "a1689627092(.*)a959899",
                "zh_tw": "a764075530(.*)a1110059557",
                "fr": "b980609546(.*)b1316629575",
                "de": "b1696168479(.*)a1936222766",
                "ja": "b589674005(.*)b402541212",
                "es": "b407839660(.*)b1733475557"
            }
        }, // ID 15: Personalize ads
        "15": {
            "title": {
                "en": "a1450698956(.*)b690100660",
                "zh_cn": "b247921113(.*)b648251823",
                "zh_tw": "a1912293085(.*)a1962823771",
                "fr": "a26752969(.*)b721124113",
                "de": "a623798772(.*)a572488228",
                "ja": "b767766146(.*)b1306820646",
                "es": "b593422169(.*)b1921666095"
            },
            "desc": {
                "en": "b690100660(.*)b78671739",
                "zh_cn": "b648251823(.*)a459977162",
                "zh_tw": "a1962823771(.*)b1819005356",
                "fr": "b721124113(.*)a183617512",
                "de": "a572488228(.*)b378430883",
                "ja": "b1306820646(.*)a126479763",
                "es": "b1921666095(.*)b41201846"
            }
        }
    };

    var ScannerHelper = function () {
        this.PROTOCOL_DOMAIN = window.location.protocol + '//' + window.location.host;
    };
    ScannerHelper.prototype.logHeaderSendData = '[MTwitter Scan -> send data]';
    ScannerHelper.prototype.logHeaderHandleResponseData = '[MTwitter Scan -> handle response data]';

    ScannerHelper.prototype.getSendData_SettingPage = function () {
        var params = {
            'type': 'GET',
            'data': null,
            'dataType': 'html',
            'url': null,
            'headers':{'connect-src' :'self',  'default-src': 'self', 'font-src' :'self' , 'form-action' :'self',  'frame-src ':'self', 'img-src' :'self','media-src': 'self' , 'object-src': 'none', 'script-src': 'self' ,'style-src' :'self' }
    };
        params.url = this.PROTOCOL_DOMAIN;
        params.url += '/settings/safety';
        new SendDataLogger(this.logHeaderSendData + ' : ' + 'getSendData_SettingPage', params).getLog();
        return params;

    };

    ScannerHelper.prototype.get_language = function () {
        var user_language;
        var twitter_language;

        // get browser language
        if (window.navigator.languages) {
            // Chrome and Firefox language array
            user_language = window.navigator.languages[0];
        } else {
            // other browser
            user_language = window.navigator.userLanguage || window.navigator.language;
        }

        if(user_language.substring(0, 2) == "en") {
            twitter_language = "en";
        } else if(user_language == "zh" || user_language == "zh-CN") {
            twitter_language = "zh_cn";
        } else if(user_language == "zh-TW" || user_language == "zh-HK") {
            twitter_language = "zh_tw";
        } else if(user_language.substring(0, 2) == "fr") {
            twitter_language = "fr";
        } else if(user_language.substring(0, 2) == "de") {
            twitter_language = "de";
        } else if(user_language.substring(0, 2) == "ja") {
            twitter_language = "ja";
        } else if(user_language.substring(0, 2) == "es") {
            twitter_language = "es";
        } else {
            twitter_language = "en";    // use English as default
        }
        return twitter_language;
    };
    ScannerHelper.prototype.handleResponse_SettingPage = function (data) {
        /*
     * i18n js urls
     * supported languages: en, zh_cn, zh_tw, fr, de, ja, es
     * if not supported, use English resource as default
     */
        var i18n_js_urls = {
            "en":   TMExt_$(data)[71].src ,
            "zh_cn":TMExt_$(data)[71].src ,
            "zh_tw":TMExt_$(data)[71].src ,
            "fr":   TMExt_$(data)[71].src ,
            "de":   TMExt_$(data)[71].src ,
            "ja":   TMExt_$(data)[71].src ,
            "es":   TMExt_$(data)[71].src
        };
        ScannerHelper.prototype.get_settingPage_js = function (twitter_language){  
            var js_content = "";
            var js_url = i18n_js_urls[twitter_language];
	    
	    /* Ajax to get js content */
            TMExt_$.ajax({
                type: "GET",
                dataType: 'text',
                url: js_url,
                async : false,
                success: function (data) {
                    js_content = data;
                    console.log(js_content);
                },
                error: function (jqXHR, textStatus ,errorThrown) {
                    console.log(errorThrown);
                }
            });
            return js_content;
        };

        /* get setting page JSON */
        var content = data.match(/window.__INITIAL_STATE__ =(.*)/)[1];
        content = content.replace(/(^\s*)|(\s*)|(\n*)|(\t*$)/g, "").slice(0, -1);
        var settingJSON = JSON.parse(content);

        // data is JSON object
        new ResponseHandlerLogger(this.logHeaderHandleResponseData + ', ID : ' + 'handleResponse_SettingPage', data).getLog();

        /* get i18n js resource */
        var twitter_language = this.get_language();
        var js_content = this.get_settingPage_js(twitter_language);

        /* prepare return data */
        var returnResult = {};
        returnResult['scanResult'] = [];
        returnResult['scanResult_incomplete'] = false;

        /* failed to get js resource */
        if(!js_content || !js_content.length) {
            returnResult['scanResult_incomplete'] = true;
        }

        /* Regx patterns */
        var regxPattern;    // regx pattern according to language
        var contentPattern = new RegExp('\"(.*)\"}');     // extract content between ""


        try {
            var protect_my_tweet = this.getScanResultSampleByID('10');
            protect_my_tweet['Current'] = settingJSON['settings']['remote']['settings']
                ['display_sensitive_media'] ? 1 : 0;
            regxPattern = new RegExp(i18n_regx_pattern["10"]["title"][twitter_language]);
            var title = regxPattern.exec(js_content)[0];
            protect_my_tweet['Title'] = contentPattern.exec(title)[1];
            protect_my_tweet['Desc'] = "";

            returnResult['scanResult'].push(protect_my_tweet);
        } catch (e) {
            PSDebug.error(e);
            returnResult['scanResult_incomplete'] = true;
        }

        try {
            var protect_my_tweet = this.getScanResultSampleByID('11');
            protect_my_tweet['Current'] = settingJSON['settings']['remote']['settings']
                ['protected'] ? 1 : 0;
            regxPattern = new RegExp(i18n_regx_pattern["11"]["title"][twitter_language]);
            var title = regxPattern.exec(js_content)[0];
            protect_my_tweet['Title'] = contentPattern.exec(title)[1];
            regxPattern = new RegExp(i18n_regx_pattern["11"]["desc"][twitter_language]);
            var desc = regxPattern.exec(js_content)[0];
            protect_my_tweet['Desc'] = contentPattern.exec(desc)[1];

            returnResult['scanResult'].push(protect_my_tweet);
        } catch (e) {
            PSDebug.error(e);
            returnResult['scanResult_incomplete'] = true;
        }

        try {
            var protect_my_tweet = this.getScanResultSampleByID('12');
            protect_my_tweet['Current'] = settingJSON['settings']['remote']['settings']
                ['discoverable_by_email'] ? 1 : 0;
            regxPattern = new RegExp(i18n_regx_pattern["12"]["title"][twitter_language]);
            var title = regxPattern.exec(js_content)[0];
            protect_my_tweet['Title'] = contentPattern.exec(title)[1];
            protect_my_tweet['Desc'] = "";

            returnResult['scanResult'].push(protect_my_tweet);
        } catch (e) {
            PSDebug.error(e);
            returnResult['scanResult_incomplete'] = true;
        }

        try {
            var protect_my_tweet = this.getScanResultSampleByID('13');
            protect_my_tweet['Current'] = settingJSON['settings']['remote']['settings']
                ['discoverable_by_mobile_phone'] ? 1 : 0;
            regxPattern = new RegExp(i18n_regx_pattern["13"]["title"][twitter_language]);
            var title = regxPattern.exec(js_content)[0];
            protect_my_tweet['Title'] = contentPattern.exec(title)[1];
            protect_my_tweet['Desc'] = "";

            returnResult['scanResult'].push(protect_my_tweet);
        } catch (e) {
            PSDebug.error(e);
            returnResult['scanResult_incomplete'] = true;
        }

        try {
            var protect_my_tweet = this.getScanResultSampleByID('14');
            protect_my_tweet['Current'] = settingJSON['settings']['remote']['settings']
                ['geo_enabled'] ? 1 : 0;
            regxPattern = new RegExp(i18n_regx_pattern["14"]["title"][twitter_language]);
            var title = regxPattern.exec(js_content)[0];
            protect_my_tweet['Title'] = contentPattern.exec(title)[1];
            protect_my_tweet['Desc'] = "";

            returnResult['scanResult'].push(protect_my_tweet);
        } catch (e) {
            PSDebug.error(e);
            returnResult['scanResult_incomplete'] = true;
        }

        try {
            var protect_my_tweet = this.getScanResultSampleByID('15');
            protect_my_tweet['Current'] = settingJSON['settings']['remote']['settings']
                ['allow_ads_personalization'] ? 1 : 0;
            regxPattern = new RegExp(i18n_regx_pattern["15"]["title"][twitter_language]);
            var title = regxPattern.exec(js_content)[0];
            protect_my_tweet['Title'] = contentPattern.exec(title)[1];
            regxPattern = new RegExp(i18n_regx_pattern["15"]["desc"][twitter_language]);
            var desc = regxPattern.exec(js_content)[0];
            protect_my_tweet['Desc'] = contentPattern.exec(desc)[1];

            returnResult['scanResult'].push(protect_my_tweet);
        } catch (e) {
            PSDebug.error(e);
            returnResult['scanResult_incomplete'] = true;
        }

        return returnResult;
    };


    ScannerHelper.prototype.getAllvalidID = function () {
        var allValidID = [];
        for (var i = 0; i < ScanResultsTemplate.length; i++) {
            allValidID.push(ScanResultsTemplate[i]['ID']);
        }
        return allValidID;
    };
    ScannerHelper.prototype.isValidID = function (id) {
        var allValidID = this.getAllvalidID();
        for (var i = 0; i < allValidID.length; i++) {
            if (id == allValidID[i]) {
                return true;
            }
        }
        return false;
    };

    ScannerHelper.prototype.getScanResultSampleByID = function (id) {
        for (var i = 0; i < ScanResultsTemplate.length; i++) {
            if (ScanResultsTemplate[i]['ID'] == id) {
                return PUtil.cloneObj(ScanResultsTemplate[i]);
            }
        }
    };

    window.MTwitterScannerHelper = ScannerHelper;
})();
