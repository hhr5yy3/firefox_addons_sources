(function(){
    const init = () => {
        if(!window.browser || typeof(TB_ACTIONS) === 'undefined') {
            setTimeout(() => {
                init();
            }, 500);
            return;
        }

        window.browser.storage.local.get({
            'framework_status': false,
            'locale': 'en',
            'l10n_strings': {},
            'browser': '',
            'os': ''
        }, (data) => {
            // check if framework is ready
            if(!data.framework_status) {
                setTimeout(() => {
                    init();
                }, 500);
                return;
            }

            window.browser.runtime.sendMessage({
                'action': TB_ACTIONS.PS_CAN_PROMOTE
            }, (bCanPromote) => {
                if(!bCanPromote) {
                    logInfo('[PS][Promotion] PS promotion is disable');
                    return;
                }
        
                var param = {
                    scripts:[
                        "_locales/" + data.locale + "/privacy_scanner/PSPromotion/PSPromotionLocalization.js",
                        "js/PrivacyScanner/PSPromotion/PSPromotionLib.js"
                    ],
                    csses:[
                        "js/PrivacyScanner/PSPromotion/css/PSPromotion.css",
                        "_locales/" + data.locale + "/privacy_scanner/PSPromotion/css/l10n.css"
                    ]
                };
    
                window.browser.runtime.sendMessage({action: TB_ACTIONS.INJECTRESOURCES, parameters: param}, () => {
                    window.browser.runtime.sendMessage({action: TB_ACTIONS.PS_GET_PROMOTION_STATUS}, (settings) => {
                        let productName = '';
                        if(data.l10n_strings) {
                            if (data.browser === 'msedge') {
                                productName = data.l10n_strings.product_name;
                            } else {
                                productName = (data.os === 'cros') ? data.l10n_strings.product_name_chromebook : data.l10n_strings.product_name_chrome;
                            }
                        }
    
                        try {
                            initPSPromotionResource({
                                ResourcePath : window.browser.runtime.getURL('js/PrivacyScanner/PSPromotion/img') + '/',
                                ProductName : productName,
                                IsAskLaterChecked : function(Website) {
                                    let ret = false;
                                    switch (Website){
                                        case "FACEBOOK":
                                            ret = settings.FaceBookPromotion;
                                            break;
                                        case "TWITTER":
                                            ret = settings.TwitterPromotion;
                                            break;
                                        case "LINKEDIN":
                                            ret = settings.LinkedInPromotion;
                                            break;
                                        case "GOOGLEPLUS":
                                        default:
                                            ret = false;
                                    }
                                    return ret;
                                },
                                CheckPrivacyCallback : function(Website) {
                                    window.browser.runtime.sendMessage({action: TB_ACTIONS.PS_CHECK_PRIVACY, parameters: {WebSite: Website}});
                                    window.browser.runtime.sendMessage({
                                        action: TB_ACTIONS.FEED_UBM, 
                                        params: {
                                            event: "PRIVACY_SCANNER_PROMOTION_CHECK_CLICK",
                                            value: Website
                                        }
                                    });
                                },
                                LearnMoreCallback : function() {
                                    window.browser.runtime.sendMessage({action: TB_ACTIONS.PS_SHOW_PROMOTION_LEARNMORE});
                                    window.browser.runtime.sendMessage({
                                        action: TB_ACTIONS.FEED_UBM, 
                                        params: {
                                            event: "PRIVACY_SCANNER_PROMOTION_LEARN_MORE_CLICK",
                                            value: Website
                                        }
                                    });
                                },
                                SetAskLater : function(Website, value) {
                                    logInfo("SetAskLater: " + Website + " " + value);
                                    window.browser.runtime.sendMessage({action: TB_ACTIONS.PS_SET_PROMOTION_STATUS, parameters: {Website:Website, value:value}});
                                    window.browser.runtime.sendMessage({
                                        action: TB_ACTIONS.FEED_UBM, 
                                        params: {
                                            event: "PRIVACY_SCANNER_PROMOTION_DONT_SHOW_CLICK",
                                            value: Website
                                        }
                                    });
                                }
                            });
                            
                            doPromotion();
                            if (!window.doPromotionInterval){
                                window.doPromotionInterval = setInterval(function(){
                                    doPromotion();
                                }, 1000);
                            }
                        } catch (e) {
                            logError(e);
                        }
                    });
                });
            });
        });
    }
    
    init();
})();