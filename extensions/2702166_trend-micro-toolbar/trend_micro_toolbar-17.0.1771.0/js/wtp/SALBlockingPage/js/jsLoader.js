(function() {
    var exports = window;
    var $ = exports.TMExt_$;

    exports.getUrlParam = function(key) {
        var paramsString = document.location.search;
        if (typeof(paramsString) == "string" && paramsString.length > 0) {
            paramsString = paramsString.substring(1)
            var paramsList = paramsString.split('&')
            for (var i = 0; i < paramsList.length; i++) {
                var keyAndValue = paramsList[i].split('=')
                if (keyAndValue[0] == key) {
                    return keyAndValue[1]
                }
            };
        }
        return null;
    }

    var currentLanguage = getUrlParam("locale");
    if (currentLanguage) {
        var csses = {
            0: {
                css: window.browser.runtime.getURL('_locales/' + currentLanguage + '/SALBlockingPage/css/l10n.css'),
                callback: function() {
                    //final
                }
            }
        };

        var jses = {
            0: {
                script: window.browser.runtime.getURL("_locales/" + "en" + "/SALBlockingPage/Localization.js"),
                callback: function() {
                    exports.FullLocalization = exports.Localization;
                    syncLoadJS(jses["5_2"].script, jses["5_2"].callback);
                }
            },
            "5_2": {
                script: window.browser.runtime.getURL("_locales/" + currentLanguage + "/SALBlockingPage/Localization.js"),
                callback: function() {
                    $.extend(exports.FullLocalization, exports.Localization);
                    syncLoadJS(jses[1].script, jses[1].callback);
                }
            },
            1: {
                script: "js/L10NReader.js",
                callback: function() {
                    syncLoadJS(jses[2].script, jses[2].callback);
                }
            },
            2: {
                script: window.browser.runtime.getURL("js/wtp/CREngine/TISProToolbarSendMailLib.js"),
                callback: function() {
                    syncLoadJS(jses[3].script, jses[3].callback);
                }
            },
            3: {
                script: "js/block.js",
                callback: function() {
                    if (typeof(safari) == 'undefined' && typeof(chrome) != 'undefined') {
                        syncLoadJS(jses[4].script, jses[4].callback);
                    }
                }
            },
            4: {
                script: window.browser.runtime.getURL("js/CarbonConstants.js"),
                callback: function() {
                    if (typeof(safari) == 'undefined' && typeof(chrome) != 'undefined') {
                        syncLoadJS(jses[5].script, jses[5].callback);
                    }
                }
            },
            5: {
                script: window.browser.runtime.getURL("js/CarbonLib.js"),
                callback: function() {}
            }
        };

        var syncLoadCSS = function(css, callback) {
            var node = document.createElement('link');
            node.href = css;
            node.rel = 'stylesheet';
            node.type = 'text/css';
            node.onload = callback;
            node.onerror = callback;
            $('head')[0].appendChild(node);
        };

        var syncLoadJS = function(script, callback) {
            var node = document.createElement('script');
            node.src = script;
            node.type = 'text/javascript';
            node.onload = node.onreadystatechange = callback;
            node.onerror = callback;
            $('head')[0].appendChild(node);
        };

        syncLoadCSS(csses[0].css, csses[0].callback);
        syncLoadJS(jses[0].script, jses[0].callback);
    }
})();