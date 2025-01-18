(function(){
    var exports = window;
    var $ = exports.TMExt_$;
    
    window.browser.storage.local.get('locale', (data) => { 
        var currentLanguage = LocalUtil.ParamFromURL.Locale();

        if(currentLanguage === "default"){
            currentLanguage = data.locale
        }

        if (currentLanguage) {
            var csses = {
                0 : {
                    css : '/_locales/' + currentLanguage + '/privacy_scanner/local_page/css/l10n.css',
                    callback : function(){
                        //final
                    }
                }
            };
            
            var jses = {
                0 : {
                    script : "/_locales/" + "en" + "/privacy_scanner/local_page/PSLocalization.js",
                    callback : function(){
                        exports.FullPSLocalization = exports.PSLocalization;
                        syncLoadJS(jses["5_2"].script, jses["5_2"].callback);
                    }
                },
                "5_2" : {
                    script : "/_locales/" + currentLanguage + "/privacy_scanner/local_page/PSLocalization.js",
                    callback : function(){
                        $.extend(exports.FullPSLocalization, exports.PSLocalization);
                        syncLoadJS(jses[1].script, jses[1].callback);
                    }
                },
                1 : {
                    script : "js/L10NReader.js",
                    callback : function(){
                        syncLoadJS(jses[2].script, jses[2].callback);
                    }
                },
                2 : {
                    script : "../content_script/PSEngine/PUtil.js",
                    callback : function(){
                        syncLoadJS(jses["2_1"].script, jses["2_1"].callback);
                    }
                },
                "2_1" : {
                    script : "js/InitL10N.js",
                    callback : function(){
                        syncLoadJS(jses[3].script, jses[3].callback);
                    }
                },
                3 : {
                    script : "../content_script/CommunicatorEngine/LocalCommunicatorWrapper.js",
                    callback : function(){
                        syncLoadJS(jses[4].script, jses[4].callback);
                    }
                },
                4 : {
                    script : "../content_script/CommunicatorEngine/LocalCommunicator.js",
                    callback : function(){
                        syncLoadJS(jses[6].script, jses[6].callback);
                    }
                },
                6 : {
                    script : "../content_script/PSPattern/Facebook/Constants.js",
                    callback : function(){
                        syncLoadJS(jses[7].script, jses[7].callback);
                    }
                },
                7 : {
                    script : "../content_script/PSPattern/Facebook/ScannerHelper.js",
                    callback : function(){
                        syncLoadJS(jses[8].script, jses[8].callback);
                    }
                },
                8 : {
                    script : "../content_script/PSPattern/Facebook/Scanner.js",
                    callback : function(){
                        syncLoadJS(jses[9].script, jses[9].callback);
                    }
                },
                9 : {
                    script : "../content_script/PSPattern/Facebook/FixerHelper.js",
                    callback : function(){
                        syncLoadJS(jses[10].script, jses[10].callback);
                    }
                },
                10 : {
                    script : "../content_script/PSPattern/Facebook/Fixer.js",
                    callback : function(){
                        syncLoadJS(jses[11].script, jses[11].callback);
                    }
                },
                11 : {
                    script : "../content_script/PSPattern/Twitter/Constants.js",
                    callback : function(){
                        syncLoadJS(jses[12].script, jses[12].callback);
                    }
                },
                12 : {
                    script : "../content_script/PSPattern/Twitter/ScannerHelper.js",
                    callback : function(){
                        syncLoadJS(jses[13].script, jses[13].callback);
                    }
                },
                13 : {
                    script : "../content_script/PSPattern/Twitter/Scanner.js",
                    callback : function(){
                        syncLoadJS(jses['13_0'].script, jses['13_0'].callback);
                    }
                },
                "13_0" : {
                    script : "../content_script/PSPattern/GooglePlus/Constants.js",
                    callback : function(){
                        syncLoadJS(jses['13_1'].script, jses['13_1'].callback);
                    }
                },
                "13_1" : {
                    script : "../content_script/PSPattern/Linkedin/Constants.js",
                    callback : function(){
                        syncLoadJS(jses['13_2'].script, jses['13_2'].callback);
                    }
                },
                "13_2" : {
                    script : "../content_script/PSPattern/Linkedin/ScannerHelper.js",
                    callback : function(){
                        syncLoadJS(jses['13_3'].script, jses['13_3'].callback);
                    }
                },
                "13_3" : {
                    script : "../content_script/PSPattern/Linkedin/Scanner.js",
                    callback : function(){
                        syncLoadJS(jses[14].script, jses[14].callback);
                    }
                },
                14 : {
                    script : "../content_script/LocalPageEngine/BaseScannerHelper.js",
                    callback : function(){
                        syncLoadJS(jses[15].script, jses[15].callback);
                    }
                },
                15 : {
                    script : "../content_script/LocalPageEngine/WebsiteHelper.js",
                    callback : function(){
                        syncLoadJS(jses[16].script, jses[16].callback);
                    }
                },
                16 : {
                    script : "../content_script/LocalPageEngine/BrowserHelper.js",
                    callback : function(){
                        syncLoadJS(jses["16_1"].script, jses["16_1"].callback);
                    }
                },
                "16_1" : {
                    script : "../content_script/LocalPageEngine/ScannerHelper.js",
                    callback : function(){
                        syncLoadJS(jses[17].script, jses[17].callback);
                    }
                },
                17 : {
                    script : "../content_script/LocalPageEngine/dom_constructor.js",
                    callback : function(){
                        syncLoadJS(jses[18].script, jses[18].callback);
                    }
                },
                18 : {
                    script : "../content_script/LocalPageEngine/extension_helper.js",
                    callback : function(){
                        syncLoadJS(jses[19].script, jses[19].callback);
                    }
                },
                19 : {
                    script : "../content_script/LocalPageEngine/UI_helper.js",
                    callback : function(){
                        syncLoadJS(jses[20].script, jses[20].callback);
                    }
                },
                20 : {
                    script : "../content_script/LocalPageEngine/trigger.js",
                    callback : function(){
                        //final
                    }
                }
            };
            
            var syncLoadCSS = function(css, callback){
                var node = document.createElement('link');
                node.href    = css;
                node.rel     = 'stylesheet';
                node.type    = 'text/css';
                node.onload  = callback;
                node.onerror = callback;
                $('head')[0].appendChild(node);
            };
            
            var syncLoadJS = function(script, callback){
                var node     = document.createElement('script');
                node.src     = script;
                node.type    = 'text/javascript';
                node.onload  = callback;
                node.onerror = callback;
                $('head')[0].appendChild(node);
            };
            
            syncLoadCSS(csses[0].css, csses[0].callback);
            syncLoadJS(jses[0].script, jses[0].callback);
        }

    })
})();
