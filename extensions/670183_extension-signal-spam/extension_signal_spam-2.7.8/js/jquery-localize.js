(function($) {
    var normaliseLang;
    var loadedLocale;
    normaliseLang = function(lang) {
        lang = lang.replace(/_/, '-').toLowerCase();
        if (lang.length > 3) {
            lang = lang.substring(0, 3) + lang.substring(3).toUpperCase();
        }
        return lang;
    };
    $.defaultLanguage = normaliseLang(navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage);
    $.getLoadedLocale = function() {
        return loadedLocale;
    };
    $.localize = function(pkg, options) {
        var defaultCallback, deferred, fileExtension, intermediateLangData, jsonCall, lang, loadLanguage, localizeElement, localizeForSpecialKeys, localizeImageElement, localizeInputElement, localizeOptgroupElement, notifyDelegateLanguageLoaded, regexify, setAttrFromValueForKey, setTextFromValueForKey, valueForKey, wrappedSet;
        if (options == null) {
            options = {};
        }
        wrappedSet = this;
        intermediateLangData = {};
        fileExtension = options.fileExtension || "json";
        deferred = $.Deferred();
        loadLanguage = function(pkg, lang, level, langIndex) {
            void 0;
            var file;
            if (level == null) {
                level = 1;
            }
            switch (level) {
                case 1:
                    intermediateLangData = {};
                    if (options.loadBase) {
                        file = pkg + ("." + fileExtension);
                        return jsonCall(file, pkg, lang, level, langIndex);
                    } else {
                        return loadLanguage(pkg, lang, 2, langIndex);
                    }
                    break;
                case 2:
                    if (lang.length >= 2) {
                        file = "" + pkg + "-" + (lang.substring(0, 2)) + "." + fileExtension;
                        return jsonCall(file, pkg, lang, level, langIndex, lang.substring(0, 2));
                    }
                    break;
                case 3:
                    if (lang.length >= 5) {
                        file = "" + pkg + "-" + (lang.substring(0, 5)) + "." + fileExtension;
                        return jsonCall(file, pkg, lang, level, langIndex, lang.substring(0, 5));
                    }
            }
        };
        jsonCall = function(file, pkg, lang, level, langIndex, languageFilePart) {
            var ajaxOptions, errorFunc, successFunc,getURL;
            if (options.pathPrefix != null) {
                file = "" + options.pathPrefix + "/" + file;
            }
            successFunc = function(d) {
                $.extend(intermediateLangData, d);
                notifyDelegateLanguageLoaded(intermediateLangData);
                loadedLocale=languageFilePart;
                return loadLanguage(pkg, lang, level + 1, langIndex);
            };
            if ('undefined' !== typeof safari)
                getURL=function(pathname) {
                    if (/^\//.test(pathname))
                        return safari.extension.baseURI.replace(/\/$/,'')+pathname;
                    else return safari.extension.baseURI+pathname;
                };
            else if (browser) getURL=browser.extension.getURL;
            else if (chrome)  getURL=chrome.extension.getURL;
            errorFunc = function() {
                if (options.fallback && options.fallback !== lang && level<3) {
                    if (navigator.languages && navigator.languages.length > langIndex+1)
                        return loadLanguage(pkg, navigator.languages[langIndex+1], null, langIndex+1);
                    else {
                        if (navigator.languages)
                            return loadLanguage(pkg, options.fallback, null, navigator.languages.length);
                        else return loadLanguage(pkg, options.fallback, navigator.language, null, langIndex+1);
                    }
                }
            };
            jQuery.support.cors = true;
            ajaxOptions = {
                url: getURL(file),
                dataType: "json",
                async: true,
                timeout: options.timeout != null ? options.timeout : 500,
                success: successFunc,
                error: errorFunc
            };
            if (/^http:/.test(file)===false) {
                ajaxOptions.error = function(xhr) {
                    if ("undefined"!==typeof xhr.responseText)
                        return successFunc($.parseJSON(xhr.responseText));
                    else return errorFunc();
                };
            }
            return $.ajax(ajaxOptions);
        };
        notifyDelegateLanguageLoaded = function(data) {
            if (options.callback != null) {
                return options.callback(data, defaultCallback);
            } else {
                return defaultCallback(data);
            }
        };
        defaultCallback = function(data) {
            $.localize.data[pkg] = data;
            return wrappedSet.each(function() {
                var elem, key, value;
                elem = $(this);
                key = elem.data("verifromlocalize");
                key || (key = elem.attr("rel").match(/verifromlocalize\[(.*?)\]/)[1]);
                value = valueForKey(key, data);
                if (value != null) {
                    return localizeElement(elem, key, value);
                }
            });
        };
        localizeElement = function(elem, key, value) {
            if (elem.is('input')) {
                localizeInputElement(elem, key, value);
            } else if (elem.is('textarea')) {
                localizeInputElement(elem, key, value);
            } else if (elem.is('img')) {
                localizeImageElement(elem, key, value);
            } else if (elem.is('optgroup')) {
                localizeOptgroupElement(elem, key, value);
            } else if (!$.isPlainObject(value)) {
                elem.html(value);
            }
            if ($.isPlainObject(value)) {
                return localizeForSpecialKeys(elem, value);
            }
        };
        localizeInputElement = function(elem, key, value) {
            var val;
            val = $.isPlainObject(value) ? value.value : value;
            if (elem.is("[placeholder]")) {
                return elem.attr("placeholder", val);
            } else {
                return elem.val(val);
            }
        };
        localizeForSpecialKeys = function(elem, value) {
            setAttrFromValueForKey(elem, "title", value);
            setAttrFromValueForKey(elem, "href", value);
            return setTextFromValueForKey(elem, "text", value);
        };
        localizeOptgroupElement = function(elem, key, value) {
            return elem.attr("label", value);
        };
        localizeImageElement = function(elem, key, value) {
            setAttrFromValueForKey(elem, "alt", value);
            return setAttrFromValueForKey(elem, "src", value);
        };
        valueForKey = function(key, data) {
            var keys, value, _i, _len;
            keys = key.split(/\./);
            value = data;
            for (_i = 0, _len = keys.length; _i < _len; _i++) {
                key = keys[_i];
                value = value != null ? value[key] : null;
            }
            return value;
        };
        setAttrFromValueForKey = function(elem, key, value) {
            value = valueForKey(key, value);
            if (value != null) {
                return elem.attr(key, value);
            }
        };
        setTextFromValueForKey = function(elem, key, value) {
            value = valueForKey(key, value);
            if (value != null) {
                return elem.text(value);
            }
        };
        regexify = function(string_or_regex_or_array) {
            var thing;
            if (typeof string_or_regex_or_array === "string") {
                return "^" + string_or_regex_or_array + "$";
            } else if (string_or_regex_or_array.length != null) {
                return ((function() {
                    var _i, _len, _results;
                    _results = [];
                    for (_i = 0, _len = string_or_regex_or_array.length; _i < _len; _i++) {
                        thing = string_or_regex_or_array[_i];
                        _results.push(regexify(thing));
                    }
                    return _results;
                })()).join("|");
            } else {
                return string_or_regex_or_array;
            }
        };
        lang = normaliseLang(options.language ? options.language : $.defaultLanguage);
        if ("object"===typeof options.languageData)
        {
            $.extend(intermediateLangData, options.languageData);
            notifyDelegateLanguageLoaded(intermediateLangData);
            loadedLocale=options.loadedLocale;
            deferred.resolve();
        }
        else
        {
            if (options.skipLanguage && lang.match(regexify(options.skipLanguage))) {
                deferred.resolve();
            } else {
                loadLanguage(pkg, lang, 1, 0);
            }
        }
        wrappedSet.localizePromise = deferred;
        return wrappedSet;
    };
    $.fn.localize = $.localize;
    $.fn.getLoadedLocale = $.getLoadedLocale;
    return $.localize.data = {};
})(jQuery);