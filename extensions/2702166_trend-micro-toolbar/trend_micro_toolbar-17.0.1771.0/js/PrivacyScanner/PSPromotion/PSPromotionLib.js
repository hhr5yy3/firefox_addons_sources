(function() {
    var exports = window;

    window.PSPromotionResourcePath = null;
    window.PSPromotionProductName = null;
    window.PSPromotionIsAskLaterChecked = null;
    window.PSPromotionCheckPrivacyCallback = null;
    window.PSPromotionLearnMoreCallback = null;
    window.PSPromotionSetAskLater = null;

    window.initPSPromotionResource = function(msg) {
        window.PSPromotionResourcePath = msg['ResourcePath'];
        window.PSPromotionProductName = msg['ProductName'];
        window.PSPromotionIsAskLaterChecked = msg['IsAskLaterChecked'];
        window.PSPromotionCheckPrivacyCallback = msg['CheckPrivacyCallback'];
        window.PSPromotionLearnMoreCallback = msg['LearnMoreCallback'];
        window.PSPromotionSetAskLater = msg['SetAskLater'];
    };


    window.SetIEPSPromotionResourcePath_ProductName = function(resourcePath, productName){
        window.PSPromotionResourcePath = resourcePath;
        window.PSPromotionProductName = productName;
    };

    var IsAskLaterChecked = {
        'FACEBOOK':0,
        'TWITTER':0,
        'GOOGLEPLUS':0,
        'LINKEDIN':0
    };
    window.SetIEPSPromotionIsAskLaterChecked = function(facebookValue, twitterValue, googleplusValue, linkedinValue){
        IsAskLaterChecked['FACEBOOK'] = facebookValue;
        IsAskLaterChecked['TWITTER'] = twitterValue;
        IsAskLaterChecked['GOOGLEPLUS'] = googleplusValue;
        IsAskLaterChecked['LINKEDIN'] = linkedinValue;
    };

    var LearnMoreURL = null;
    window.SetIEPSPromotionLearnMoreURL = function(url){
        LearnMoreURL = url;
    };

    var PSPromotionIsAskLaterCheckedWrapper = function(Website){
        if (window.PSPromotionIsAskLaterChecked){
            return window.PSPromotionIsAskLaterChecked(Website);
        } else {
            return IsAskLaterChecked[Website] != 0;
        }
    };

    var PSPromotionCheckPrivacyCallbackWrapper = function(Website){
        if (window.PSPromotionCheckPrivacyCallback){
            window.PSPromotionCheckPrivacyCallback(Website);
        } else {
            window.external.ToolbarInvoke({Action: 14, HTMLDocument: document, Website: Website});
        }
    };

    var PSPromotionLearnMoreCallbackWrapper = function(Website){
        if (window.PSPromotionLearnMoreCallback){
            window.PSPromotionLearnMoreCallback(Website);
        } else {
            window.open(LearnMoreURL);
        }
    };

    var PSPromotionSetAskLaterWrapper = function(Website, value){
        if (window.PSPromotionSetAskLater){
            window.PSPromotionSetAskLater(Website, value);
        } else {
            window.external.ToolbarInvoke({Action: 6, HTMLDocument: document, Website: Website, Value: value});
        }
    };
    /*
     Util
     */
    var FACEBOOK = "FACEBOOK";
    var TWITTER = "TWITTER";
    var GOOGLEPLUS = "GOOGLEPLUS";
    var LINKEDIN = "LINKEDIN";

    window.get_siteInjectHelper = function(Website) {
        switch (Website) {
            case FACEBOOK:
                return new FACEBOOK_WebsiteInjectHelper();
            case TWITTER:
                return new TWITTER_WebsiteInjectHelper();
            case GOOGLEPLUS:
                return new GOOGLEPLUS_WebsiteInjectHelper();
            case LINKEDIN:
                return new LINKEDIN_WebsiteInjectHelper();
        }
        return new WebsiteInjectHelper();
    };

    window.PS_FLAG = (function(){
        // isScanning?
        var IS_SCANNING = false;

        var isScanning = function(){
            return IS_SCANNING;
        };
        var setScanning = function(isScanning){
            IS_SCANNING = isScanning;
        };

        // is set to not scan again?
        var IS_NOT_SCAN_AGAIN = false;

        var isSetToNotScanAgain = function(){
            return IS_NOT_SCAN_AGAIN;
        };
        var setNotScanAgain = function(notScan){
            IS_NOT_SCAN_AGAIN = notScan;
        };

        var isAutoScanEnabled = (function(){
            if(window.EnableAutoScan){
                // if this variable is defined, use this variable as configuration.
                return window.EnableAutoScan;
            }
            return true;
        })();

        return {
            isScanning : isScanning,
            setScanning : setScanning,
            isSetToNotScanAgain : isSetToNotScanAgain,
            setNotScanAgain : setNotScanAgain,
            isAutoScanEnabled : isAutoScanEnabled
        }
    })();

    var WebsiteInjectHelper = function(Website) {
        var that = this;
        this.getCurrentWebsite = function() {
            if (window.location.host.indexOf('facebook.com') != -1) {
                return FACEBOOK;
            } else if (window.location.host.indexOf('twitter.com') != -1) {
                return TWITTER;
            } else if (window.location.host.indexOf('plus.google.com') != -1) {
                return GOOGLEPLUS;
            } else if (window.location.host.indexOf('linkedin.com') != -1) {
                return LINKEDIN;
            }
            return null;
        };

        this.CheckAndInject = function(checker) {
            var that = this;
            if (that.isAlreadyHaveDialog()) {
                // return when already have dialog.
                return false;
            }

            if(!PS_FLAG.isAutoScanEnabled){
                // return false if this feature is diabled by other product(iTis)
                that.injectPromotionDialog({
                    hasScanResult: false
                });
                return false;
            }

            if(!that.isAutoScanEnabled){
                /*
                    show dialog and return directly if not enable auto scan
                    such as Google+ will not auto scan and will show default promotion dialog.
                */
                PSDebug.log("show promotion dialog");
                that.injectPromotionDialog({
                    hasScanResult: false
                });
                return false;
            }

            if(PS_FLAG.isSetToNotScanAgain()){
                // return if is set to not scan again.
                return false;
            }

            if(PS_FLAG.isScanning()){
                // return when scanning process is running.
                return false;
            }

            PS_FLAG.setScanning(true);
            // start scanning
            that.startScanning(function(counts){
                // scan success and have privacy concern.
                if(!checker()) {
                    PSDebug.log("catch block promotion dialog, as page changed");
                    return;
                }
                PSDebug.log("show promotion dialog");
                that.injectPromotionDialog({
                    hasScanResult: true,
                    result: {
                        count: counts
                    }
                });
                PS_FLAG.setScanning(false);
            }, function(counts){
                // scan fail or no privacy concern.
                PSDebug.log("do not show promotion dialog, and set to not auto scan again");
                PS_FLAG.setScanning(false);
                PS_FLAG.setNotScanAgain(true);
            })
        };

        this.injectPromotionDialog = function(data){
            var that = this;
            var nodeToInject = that.findNodeToInject();
            if (nodeToInject.length > 0) {
                if(that.Website == GOOGLEPLUS) {
                    that.ConstructPromotion(data).insertBefore(nodeToInject.eq(0))
                } else {
                    nodeToInject.eq(0).prepend(that.ConstructPromotion(data))
                }
                if(that.Website == TWITTER ) {
                    document.querySelector("div.TM_PS_Wrapper_headerArea").style="width:550px";
                } else if( that.Website==FACEBOOK) {
                    let width = TMExt_$("#browse_result_area").width();
                    if(width != null) {
                        TMExt_$(".TM_PS_Wrapper_facebook").width(width-47);
                    }
                }

                window.browser.runtime.sendMessage({
                    action: TB_ACTIONS.FEED_UBM, 
                    params: {
                        event: "SHOW_PRIVACY_SCANNER_PROMOTION",
                        value: that.Website
                    }
                });
            }
        };

        this.ConstructPromotion = function(data) {
            var div = TMExt_$('<div/>', {
                'id' : that.UniqueID()
            });
            div.append(this.ConstructContentWrapper(data));
            return div;
        };

        this.getNumConcernsFromList = function(response_list){
            var count = 0;
            for (var i = 0; i < response_list.length; i++) {
                if (response_list[i]['Risk'].indexOf(response_list[i]['Current']) != -1) {
                    if (response_list[i].appIDs) {
                        count += response_list[i].appIDs.length;
                    } else {
                        count++;
                    }
                }
            }
            return count;
        };

        this.getNumConcerns = function(data){
            var that = this;
            return that.getNumConcernsFromList(data[that.ScanResponse]["Response"]);
        };

        this.startScanning = function(successAndHaveConcern, failOrNoConcern){
            var that = this;
            this.scan(function(data){
                PSDebug.log("Get scan result:");
                PSDebug.log(data);

                var counts_concerns = that.getNumConcerns(data);
                PSDebug.log("concern counts: " + counts_concerns);

                if(counts_concerns > 0){
                    return successAndHaveConcern(counts_concerns);
                }else{
                    return failOrNoConcern(counts_concerns);
                }
            })
        };

        this.isAlreadyHaveDialog = function() {
            return TMExt_$('#' + that.UniqueID()).length > 0;
        };
        /*
         click event for each Website
         */

        this.clickClose = function() {
            that.closePromotionUI()
        };

        /*
            Even if user is in main page, he may not logged in. Such as Linkedin.
            So for Linkedin page, we need to override this method.
        */
        this.userNotLogedIn = function(){
            return false;
        };

        this.ConstructContentWrapper = function(data) {
            var wordingResource = data.hasScanResult ? g_oPrivacyScannerString_autoScan : g_oPrivacyScannerString;

            var that = this;
            var div_wrapper = TMExt_$('<div/>', {
                'class' : 'TM_PS_Wrapper ' + that.WrapClassName
            });

            var div_headerArea = TMExt_$('<div/>', {
                'class' : 'TM_PS_Wrapper_headerArea'
            });

            var div_headerAreaRight = TMExt_$('<div/>', {
                'class' : 'TM_PS_Wrapper_headerAreaRight'
            });
            div_headerAreaRight.css('background-image', 'url(' + PSPromotionResourcePath + 'ic_privacy_scanner.png' + ')').css('backgroundPosition', '0px 0px');

            div_headerArea.append(div_headerAreaRight);

            div_wrapper.append(div_headerArea);

            /*
             title
             */
            var div_title = TMExt_$('<div/>', {
                'class' : 'title',
                text : PSPromotionProductName
            });
            div_headerArea.append(div_title);

            /*
             close
             */
            var div_close = TMExt_$('<div/>', {
                'class' : 'close'
            });
            div_close.css('background-image', 'url(' + PSPromotionResourcePath + 'icon_close.png' + ')').css('backgroundPosition', '0px 0px');
            div_close.hover(function() {
                div_close.css('backgroundPosition', '0px 60px');
            }, function() {
                div_close.css('backgroundPosition', '0px 0px');
            });

            div_close.mousedown(function() {
                div_close.css('backgroundPosition', '0px 40px');
            });

            div_close.click(that.clickClose);

            div_wrapper.append(div_close);

            /*
             worryTitle
             */
            var div_worryTitle = TMExt_$('<div/>', {
                'class' : 'worryTitle',
                text : (function(){
                    if(data.hasScanResult){
                        var title = "";
                        if(data.result.count == 1){
                            title = wordingResource["WelcomeString"]["Head"]["OneConcern"];
                        }else{
                            title = wordingResource["WelcomeString"]["Head"]["SeveralConcern"];
                        }
                        title = title.replace("%d", data.result.count);
                        return title;
                    }else{
                        return wordingResource["WelcomeString"]["Head"][that.Website];
                    }
                })()
            });
            div_headerArea.append(div_worryTitle);

            /*
             worryRecommend
             */
            var div_worryRecommend = TMExt_$('<div/>', {
                'class' : 'worryRecommend',
                text : (function(){
                    if(data.hasScanResult){
                        return wordingResource["WelcomeString"]["Content"][that.Website];
                    }else{
                        return wordingResource["WelcomeString"]["Content"];
                    }
                })()
            });

            var learn_more = TMExt_$('<span/>', {
                'class' : 'learnMore',
                text : wordingResource["WelcomeString"]["LearnMore"]
            });
            learn_more.click(function() {
                PSPromotionLearnMoreCallbackWrapper(that.Website);
            });

            div_worryRecommend.append(learn_more);
            div_headerArea.append(div_worryRecommend);

            /*
             footer
             */
            var div_footer = TMExt_$('<div/>', {
                'class' : 'TM_footer'
            });

            var div_footer_checkMyPrivacy = TMExt_$('<button/>', {
                'class' : this.class_button_checkMyPrivacy() + ' ' + 'checkMyPrivacy',
                text : wordingResource["ScanButtonText"]
            });

            div_footer_checkMyPrivacy.css('background','linear-gradient(#' + that.CheckMyPrivacy_background_color_start + ', #' + that.CheckMyPrivacy_background_color_end + ')');
            div_footer_checkMyPrivacy.css('filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#' + that.CheckMyPrivacy_background_color_start + '\', endColorstr=\'#' + that.CheckMyPrivacy_background_color_end + '\')');
            div_footer_checkMyPrivacy.css('background','-webkit-gradient(linear, 0 0, 0 100%, from(#' + that.CheckMyPrivacy_background_color_start + '), to(#' + that.CheckMyPrivacy_background_color_end + '))');
            div_footer_checkMyPrivacy.css('background','-moz-linear-gradient(top,  #' + that.CheckMyPrivacy_background_color_start + ',  #' + that.CheckMyPrivacy_background_color_end + ')');
            div_footer_checkMyPrivacy.on('mouseenter', function() {
                div_footer_checkMyPrivacy.css('background','linear-gradient(#' + that.CheckMyPrivacy_background_color_hover_start + ', #' + that.CheckMyPrivacy_background_color_hover_end + ')');
                div_footer_checkMyPrivacy.css('filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#' + that.CheckMyPrivacy_background_color_hover_start + '\', endColorstr=\'#' + that.CheckMyPrivacy_background_color_hover_end + '\')');
                div_footer_checkMyPrivacy.css('background','-webkit-gradient(linear, 0 0, 0 100%, from(#' + that.CheckMyPrivacy_background_color_hover_start + '), to(#' + that.CheckMyPrivacy_background_color_hover_end + '))');
                div_footer_checkMyPrivacy.css('background','-moz-linear-gradient(top,  #' + that.CheckMyPrivacy_background_color_hover_start + ',  #' + that.CheckMyPrivacy_background_color_hover_end + ')')
            });

            div_footer_checkMyPrivacy.on('mouseleave', function() {
                div_footer_checkMyPrivacy.css('background','linear-gradient(#' + that.CheckMyPrivacy_background_color_start + ', #' + that.CheckMyPrivacy_background_color_end + ')');
                div_footer_checkMyPrivacy.css('filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#' + that.CheckMyPrivacy_background_color_start + '\', endColorstr=\'#' + that.CheckMyPrivacy_background_color_end + '\')');
                div_footer_checkMyPrivacy.css('background','-webkit-gradient(linear, 0 0, 0 100%, from(#' + that.CheckMyPrivacy_background_color_start + '), to(#' + that.CheckMyPrivacy_background_color_end + '))');
                div_footer_checkMyPrivacy.css('background','-moz-linear-gradient(top,  #' + that.CheckMyPrivacy_background_color_start + ',  #' + that.CheckMyPrivacy_background_color_end + ')')
            });

            div_footer_checkMyPrivacy.on('mousedown', function() {
                div_footer_checkMyPrivacy.css('background','linear-gradient(#' + that.CheckMyPrivacy_background_color_active_start + ', #' + that.CheckMyPrivacy_background_color_active_end + ')');
                div_footer_checkMyPrivacy.css('filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=\'#' + that.CheckMyPrivacy_background_color_active_start + '\', endColorstr=\'#' + that.CheckMyPrivacy_background_color_active_end + '\')');
                div_footer_checkMyPrivacy.css('background','-webkit-gradient(linear, 0 0, 0 100%, from(#' + that.CheckMyPrivacy_background_color_active_start + '), to(#' + that.CheckMyPrivacy_background_color_active_end + '))');
                div_footer_checkMyPrivacy.css('background','-moz-linear-gradient(top,  #' + that.CheckMyPrivacy_background_color_active_start + ',  #' + that.CheckMyPrivacy_background_color_active_end + ')')
            });

            div_footer_checkMyPrivacy.click(function() {
                PSPromotionCheckPrivacyCallbackWrapper(that.Website);
            });

            var div_footer_askLater_area = TMExt_$('<div/>', {
                'class' : 'askLater_area'
            });

            var askLater_wording = TMExt_$('<div/>', {
                'class' : 'askLater_area_wording',
                'text' : wordingResource["WelcomeString"]["AskLater"]
            });

            askLater_wording.click(function() {
                PSPromotionSetAskLaterWrapper(that.Website,false);
                that.closePromotionUI();
            });


            div_footer_askLater_area.append(askLater_wording);

            var div_footer_logo = TMExt_$('<div/>', {
                'class' : 'logo'
            });

            div_footer_logo.css('background-image', 'url(' + PSPromotionResourcePath + 'TM_logo.png' + ')');
            div_footer.append(div_footer_checkMyPrivacy).append(div_footer_askLater_area).append(div_footer_logo);

            div_wrapper.append(div_footer);

            return div_wrapper;
        }
    };

    var FACEBOOK_WebsiteInjectHelper = function() {
        var that = this;
        WebsiteInjectHelper.call(this);
        this.Website = FACEBOOK;

        this.isAutoScanEnabled = true;
        this.ScanSingleResponse = "FPScanSingleResponse";
        this.ScanResponse = "FPScanResponse";
        this.getNumConcerns = function(data){
            var that = this;

            var settingList = [];

            var categoryList = data[that.ScanResponse]["Response"];
            TMExt_$.each(categoryList['AppsAndWebsites']['Items'], function(index, item){
                settingList.push(item);
            });
            TMExt_$.each(categoryList['PrivacySetting']['Items'], function(index, item){
                settingList.push(item);
            });
            TMExt_$.each(categoryList['TimeLineAndTagging']['Items'], function(index, item){
                settingList.push(item);
            });

            return this.getNumConcernsFromList(settingList);
        };

        this.scan = function(callback){
            var ps = new FacebookPScanner();
            ps.scan(callback);
            ps.check2FA()
            .then(ret => {
                console.log('[PS][FACEBOOK_WebsiteInjectHelper] ret of check2FA = ' + ret);
                if(typeof(tbc_feedback_2fa_status) !== 'undefined') {
                    tbc_feedback_2fa_status(that.Website, ret);
                }
            });
        };

        this.UniqueID = function(){
            if(this.isInNormalFacebookPage()){
                return "TM_PS_FACEBOOK";
            }else{
                return "TM_PS_NEW_FACEBOOK";
            }
        };

        this.isInNormalFacebookPage = function(){
            if(TMExt_$('#contentArea').length > 0){
                return true;
            }
            return false;
        };

        this.isInFacebookSearchPage = function(){
            let url = document.location.href;
            if(url.indexOf("/search/")!=-1){
                return true;
            }
            return false;
        }

        this.findNodeToInject = function() {
            if(this.isInFacebookSearchPage()){
                return TMExt_$("#browse_result_area");
            }
            if(this.isInNormalFacebookPage()){
                return TMExt_$('#contentArea');
            }else{
                return TMExt_$('[role="main"] > div');
            }
        };

        this.isInMainPage = function() {
            if (TMExt_$('#pagelet_megaphone').length != 0) {
                return true;
            } else if (location.pathname == "/") {
                return true;
            }

            return false;
        };

        this.class_button_checkMyPrivacy = function(){
            if(this.isInNormalFacebookPage()){
                return "TM_PS_btn_facebook";
            }else{
                return "TM_PS_btn_new_facebook";
            }
        };

        this.closePromotionUI = function() {
            if(this.isInNormalFacebookPage()){
                TMExt_$('#TM_PS_FACEBOOK').hide();
            }else{
                TMExt_$('#TM_PS_NEW_FACEBOOK').hide();
            }
        };
        this.CheckMyPrivacy_background_color_start = "4f68a7";
        this.CheckMyPrivacy_background_color_end = "3d589e";
        this.CheckMyPrivacy_background_color_hover_start = "4f68a7";
        this.CheckMyPrivacy_background_color_hover_end = "4f68a7";
        this.CheckMyPrivacy_background_color_active_start = "3d589e";
        this.CheckMyPrivacy_background_color_active_end = "3d589e";

        this.WrapClassName = "TM_PS_Wrapper_facebook";
    };
    FACEBOOK_WebsiteInjectHelper.prototype = new WebsiteInjectHelper();

    var TWITTER_WebsiteInjectHelper = function() {
        var that = this;
        WebsiteInjectHelper.call(this);
        this.Website = TWITTER;

        this.isAutoScanEnabled = true;
        this.ScanSingleResponse = "TPScanSingleResponse";
        this.ScanResponse = "TPScanResponse";

        this.scan = function(callback){
            var ps = new TwitterPScanner();
            ps.scan(callback);
        };

        this.UniqueID = function(){
            return "TM_PS_TWITTER";
        };

        this.findNodeToInject = function() {
            let ret = TMExt_$('div[class~="content-main"]');
            if(ret.length!=0){
                return ret;
            }
            ret = TMExt_$("main[role='main']");
            return ret;
        };

        this.isInMainPage = function() {
            if(location.pathname == "/" || location.pathname == "/home"){
                return true;
            }

            return false;
        };

        this.class_button_checkMyPrivacy = function(){
            return "TM_PS_btn_twitter";
        };

        this.closePromotionUI = function() {
            TMExt_$('#TM_PS_TWITTER').hide()
        };
        this.CheckMyPrivacy_background_color_start = "5baaf4";
        this.CheckMyPrivacy_background_color_end = "57a1e8";
        this.CheckMyPrivacy_background_color_hover_start = "5baaf4";
        this.CheckMyPrivacy_background_color_hover_end = "5baaf4";
        this.CheckMyPrivacy_background_color_active_start = "57a1e8";
        this.CheckMyPrivacy_background_color_active_end = "57a1e8";

        this.WrapClassName = "TM_PS_Wrapper_twitter";
    };
    TWITTER_WebsiteInjectHelper.prototype = new WebsiteInjectHelper();

    var GOOGLEPLUS_WebsiteInjectHelper = function() {
       //not support googlePlus
    };
    GOOGLEPLUS_WebsiteInjectHelper.prototype = new WebsiteInjectHelper();


    var LINKEDIN_WebsiteInjectHelper = function() {
        var that = this;
        WebsiteInjectHelper.call(this);
        this.Website = LINKEDIN;

        this.isAutoScanEnabled = false;
        this.ScanSingleResponse = "LIPScanSingleResponse";
        this.ScanResponse = "LIPScanResponse";

        this.scan = function(callback){
            var ps = new LinkedinPScanner();
            ps.scan(callback);
        };

        this.UniqueID = function(){
            return "TM_PS_LINKEDIN";
        };

        this.findNodeToInject = function() {
            return TMExt_$('main.scaffold-layout__main');
        };

        this.isInMainPage = function() {
            if (location.pathname === "/feed/" || location.pathname === "/") {
                return true;
            }

            return false;
        };

        this.userNotLogedIn = function(){
            if(TMExt_$('#signin').length !== 0){
                // check whether this is log in or register page
                return true;
            }

            return false;
        };

        this.class_button_checkMyPrivacy = function(){
            return "TM_PS_btn_linkedin";
        };

        this.closePromotionUI = function() {
            TMExt_$('#TM_PS_LINKEDIN').hide();
        };

        this.CheckMyPrivacy_background_color_start = "f5e500";
        this.CheckMyPrivacy_background_color_end = "f7ca00";
        this.CheckMyPrivacy_background_color_hover_start = "f5e500";
        this.CheckMyPrivacy_background_color_hover_end = "f5e500";
        this.CheckMyPrivacy_background_color_active_start = "f7ca00";
        this.CheckMyPrivacy_background_color_active_end = "f7ca00";

        this.WrapClassName = "TM_PS_Wrapper_linkedin";
    };
    LINKEDIN_WebsiteInjectHelper.prototype = new WebsiteInjectHelper();

    /*
     Entry
     */
    window.doPromotion = function() {
        var Website = get_siteInjectHelper().getCurrentWebsite();
        if (!Website) {
            return;
        }

        var siteInjectHelper = get_siteInjectHelper(Website);
        if (!siteInjectHelper.isInMainPage()) {
            return;
        }

        if (siteInjectHelper.userNotLogedIn()) {
            return;
        }

        if (!PSPromotionIsAskLaterCheckedWrapper(Website)) {
            return;
        }

        siteInjectHelper.CheckAndInject(siteInjectHelper.isInMainPage);
    }
})();
