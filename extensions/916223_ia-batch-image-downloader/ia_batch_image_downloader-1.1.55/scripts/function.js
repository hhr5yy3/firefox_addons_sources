/**
 * ImageAssistant
 * Project Home: http://www.pullywood.com/ImageAssistant/
 * Author: 睡虫子(Joey)
 * Copyright (C) 2013-2020 普利坞(Pullywood.com)
**/
"use strict";

window._o_numberSeed = "0123456789";

window._o_hexSeed = "0123456789abcdef";

window._o_charSeed = "0123456789abcdefghijklmnopqrstuvwxyz";

window._o_ajax_request_timeout = 8e3;

window._o_multiURLExtDefURL = _o_urlAddFinger("http://www.pullywood.com/ImageAssistant/blank.html");

window._o_SSL_multiURLExtDefURL = _o_urlAddFinger("https://www.pullywood.com/ImageAssistant/blank.html");

window._o_extStatisticURL = "http://www.pullywood.com/ImageAssistant/images/IAnalytic.png";

window._o_resourceListURL = "http://www.pullywood.com/publish/imageassistant-resource-list";

window._o_remoteRuleURL = _o_urlAddFinger("http://www.pullywood.com/ImageAssistant/defaultRegexpUrlRule.properties");

window._o_checkClientURL = _o_urlAddFinger("http://localhost:61257/check");

window._o_collectionSaveURL = _o_urlAddFinger("http://localhost:61257/collection/save");

window._o_dynamicConfigURL = _o_urlAddFinger("http://www.pullywood.com/ImageAssistant/dynamic_config.json");

window._o_background_ajax_seted = false;

window._o_background_ajax_hash_mapper = {};

window._o_preRenderSize = 512;

window._o_atomPngSrc = "./images/loading.gif";

window._o_Base64 = {
    _keyStr: "bFf2YMpEZLT6OBqN/DCtJlnc9G154W=wP+h3Rrk8xadIzjQoHmv7sAS0yeUiKVugX",
    encode: function(e) {
        let t = "";
        let n, r, i, s, o, u, a;
        let f = 0;
        e = _o_Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64;
            } else if (isNaN(i)) {
                a = 64;
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
        }
        return t;
    },
    decode: function(e) {
        let t = "";
        let n, r, i;
        let s, o, u, a;
        let f = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r);
            }
            if (a != 64) {
                t = t + String.fromCharCode(i);
            }
        }
        t = _o_Base64._utf8_decode(t);
        return t;
    },
    _utf8_encode: function(e) {
        e = e.replace(/\r\n/g, "\n");
        let t = "";
        for (let n = 0; n < e.length; n++) {
            let r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128);
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128);
            }
        }
        return t;
    },
    _utf8_decode: function(e) {
        let t = "";
        let n = 0;
        let r = 0, c1 = 0, c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++;
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2;
            } else {
                c2 = e.charCodeAt(n + 1);
                var c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3;
            }
        }
        return t;
    }
};

if (!Object.entries) {
    Object.entries = function(obj) {
        var ownProps = Object.keys(obj), i = ownProps.length, resArray = new Array(i);
        while (i--) {
            resArray[i] = [ ownProps[i], obj[ownProps[i]] ];
        }
        return resArray;
    };
}

if (!Object.values) {
    Object.values = function(obj) {
        return Object.keys(obj).map((function(key) {
            return obj[key];
        }));
    };
}

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        let _w_subjectString = this.toString();
        if (typeof position !== "number" || !isFinite(position) || Math.floor(position) !== position || position > _w_subjectString.length) {
            position = _w_subjectString.length;
        }
        position -= searchString.length;
        let _w_lastIndex = _w_subjectString.indexOf(searchString, position);
        return _w_lastIndex !== -1 && _w_lastIndex === position;
    };
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}

if (!Number.parseInt) Number.parseInt = parseInt;

if (!window.URL) {
    window.URL = function(url) {
        if (url.indexOf("://") < 0) throw new TypeError("Invalid URL");
        this.url = url;
        this.link = document.createElement("a");
        this.link.href = url;
        this.href = this.link.href;
        this.protocol = this.link.protocol;
        this.host = this.link.host;
        this.hostname = this.link.hostname;
        this.port = this.link.port;
        this.pathname = this.link.pathname;
        this.search = this.link.search;
        this.hash = this.link.hash;
        this.username = this.link.username;
        this.password = this.link.password;
        this.origin = this.link.origin;
    };
}

$.ajaxSetup({
    timeout: window._o_ajax_request_timeout,
    headers: {
        Accept: "*/*; charset=UTF-8",
        "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0, post-check=0, pre-check=0",
        Pragma: "no-cache",
        Expires: "0"
    }
});

(function($) {
    let _w_xhrPool = [];
    $(document).ajaxSend((function(e, jqXHR, options) {
        _w_xhrPool.push(jqXHR);
    }));
    $(document).ajaxComplete((function(e, jqXHR, options) {
        _w_xhrPool = $.grep(_w_xhrPool, (function(x) {
            return x != jqXHR;
        }));
    }));
    let _w_abort = function() {
        $.each(_w_xhrPool, (function(idx, jqXHR) {
            jqXHR.abort();
        }));
    };
    let _w_oldBeforeUnLoad = window.onbeforeunload;
    window.abortAjaxRequest = function() {
        _w_abort();
    };
    window.onbeforeunload = function() {
        let _w_r = _w_oldBeforeUnLoad ? _w_oldBeforeUnLoad() : undefined;
        if (_w_r == undefined) {
            _w_abort();
        }
        return _w_r;
    };
})(jQuery);

function _o_urlAddFinger(url) {
    if (typeof url != "string") return url;
    let _w_parameter = "version=".concat(chrome.runtime.getManifest().version).concat("&finger=").concat(localStorage[chrome.runtime.id]);
    if (url.indexOf("?") >= 0) {
        return url.concat("&").concat(_w_parameter);
    } else {
        return url.concat("?").concat(_w_parameter);
    }
}

function _o_urlProtocolFollowPage(url) {
    let _w_regexPattern = /^https?:(\/\/.*?)$/;
    let _w_pageUrlMatcher = window.location.href ? window.location.href.match(_w_regexPattern) : null;
    let _w_inputUrlMatcher = url ? url.match(_w_regexPattern) : null;
    if (_w_pageUrlMatcher && _w_inputUrlMatcher) {
        return _w_inputUrlMatcher[1];
    }
    return url;
}

function _o_isFunction(taskFun) {
    return taskFun && typeof taskFun == "function";
}

function _o_isTargetInput(e) {
    if (e.target && [ "INPUT", "TEXTAREA" ].indexOf(e.target.tagName) >= 0 || e.target.contentEditable == "true") return true;
    return false;
}

function _o_createTaskExecutePool(_w_maxConCurrent) {
    let _w_task_list = [];
    let _w_task_processing = 0;
    let _w_task_pre_processing = 0;
    let _w_task_max = _w_maxConCurrent;
    setInterval((function fetchAndExecTask() {
        if (_w_task_processing < _w_task_max && _w_task_pre_processing < _w_task_max && _w_task_list.length > 0) {
            _w_task_pre_processing++;
            let _w_taskFun = _w_task_list.shift();
            _w_taskFun && typeof _w_taskFun == "function" && _w_taskFun((function() {
                _w_task_processing++;
            }), (function() {
                _w_task_processing--;
            }), (function() {
                return [ _w_task_processing, _w_task_list.length ];
            }));
            _w_task_pre_processing--;
        }
    }), 10);
    return {
        setMax: function(max) {
            _w_task_max = max;
        },
        getProcessingNum: function() {
            return _w_task_processing;
        },
        getTaskNum: function() {
            return _w_task_list.length;
        },
        addTaskToLast: function(taskFun) {
            _w_task_list.push(taskFun);
        },
        addTaskToFirst: function(taskFun) {
            _w_task_list.unshift(taskFun);
        },
        addTask: function(taskFun) {
            _w_task_list.push(taskFun);
        }
    };
}

function _o_hexToRgb(hex) {
    let _w_shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(_w_shorthandRegex, (function(m, r, g, b) {
        return r + r + g + g + b + b;
    }));
    let _w_result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return _w_result ? {
        r: parseInt(_w_result[1], 16),
        g: parseInt(_w_result[2], 16),
        b: parseInt(_w_result[3], 16)
    } : null;
}

function _o_showDefaultFolder() {
    chrome.downloads.showDefaultFolder();
}

function _o_blockImageLoad() {
    if (window._o_blockImageLoadObserverInited) {
        return;
    } else {
        window._o_blockImageLoadObserverInited = true;
    }
    new MutationObserver((function(_w_mutations) {
        _w_mutations.forEach((function(_w_mutation) {
            for (let i = 0; i < _w_mutation.addedNodes.length; ++i) {
                let _w_addedNode = _w_mutation.addedNodes.item(i);
                if (_w_addedNode.tagName == "IMG") {
                    _w_addedNode.removeAttribute("src");
                } else if (typeof _w_addedNode.getElementsByTagName !== "function") {
                    return;
                } else {
                    let _w_imgs = _w_addedNode.getElementsByTagName("img");
                    for (let j = 0; j < _w_imgs.length; ++j) _w_imgs[j].removeAttribute("src");
                }
            }
        }));
    })).observe(document.body, {
        childList: true,
        subtree: true
    });
}

function _MSG_(key) {
    return chrome.i18n.getMessage(key);
}

function _o_decodeUrl(url) {
    url || (url = "");
    try {
        url = decodeURIComponent(url);
    } catch (e) {}
    return url;
}

function _o_getBackground() {
    if (typeof chrome != "undefined" && typeof chrome.extension != "undefined" && typeof chrome.extension.getBackgroundPage != "undefined") {
        return chrome.extension.getBackgroundPage();
    }
    return null;
}

function _o_executeFunWhenTabNotPending(_w_tabId, _w_func) {
    (function observeStatus() {
        setTimeout(() => {
            chrome.tabs.get(_w_tabId, (function(_w_observedtab) {
                if (!_w_observedtab.pendingUrl) {
                    typeof _w_func == "function" && _w_func(_w_observedtab);
                } else {
                    observeStatus();
                }
            }));
        }, 250);
    })();
}

function _o_executeFunWhenTabComplete(_w_tabId, _w_func) {
    (function observeStatus() {
        setTimeout(() => {
            chrome.tabs.get(_w_tabId, (function(_w_observedtab) {
                if (_w_observedtab.status == "complete") {
                    typeof _w_func == "function" && _w_func(_w_observedtab);
                } else {
                    observeStatus();
                }
            }));
        }, 250);
    })();
}

function _o_getQueryString(_w_name) {
    if (location.href.indexOf("?") == -1 || location.href.indexOf(_w_name + "=") == -1) {
        return "";
    }
    let _w_queryString = location.href.substring(location.href.indexOf("?") + 1);
    if (_w_queryString.indexOf("#") > -1) {
        _w_queryString = _w_queryString.substring(0, _w_queryString.indexOf("#"));
    }
    let _w_parameters = _w_queryString.split("&");
    let _w_pos, paraName, paraValue;
    for (let i = 0; i < _w_parameters.length; i++) {
        _w_pos = _w_parameters[i].indexOf("=");
        if (_w_pos == -1) {
            continue;
        }
        paraName = _w_parameters[i].substring(0, _w_pos);
        paraValue = _w_parameters[i].substring(_w_pos + 1);
        if (paraName == _w_name) {
            return unescape(paraValue.replace(/\+/g, " "));
        }
    }
    return "";
}

function _o_extracHostname(url) {
    let _w_matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    if (_w_matches) {
        return _w_matches[1];
    }
    return "";
}

function _o_extractUrlWithoutHash(url) {
    if (typeof url == "string") {
        return url.replace(/#.*$/gi, "");
    }
    return null;
}

function _o_getURLPath() {
    let _w_url = new URL(window.location.href);
    _w_url = _w_url.origin + _w_url.pathname;
    return _w_url;
}

function _o_canculateImageSize(_w_img, _w_maxWidth, _w_maxHeight) {
    let _w_rect = {
        width: 0,
        height: 0
    };
    if (_w_img && _w_maxWidth && _w_maxHeight) {
        try {
            let _w_width = _w_img.width;
            let _w_height = _w_img.height;
            if (_w_width <= _w_maxWidth && _w_height <= _w_maxHeight) {
                _w_rect.width = _w_width;
                _w_rect.height = _w_height;
            } else if (_w_width / _w_height >= _w_maxWidth / _w_maxHeight) {
                _w_rect.width = _w_maxWidth;
                _w_rect.height = _w_maxWidth / _w_width * _w_height;
            } else {
                _w_rect.width = _w_maxHeight / _w_height * _w_width;
                _w_rect.height = _w_maxHeight;
            }
        } catch (e) {}
    }
    return _w_rect;
}

function _o_isVisible(_w_domElem) {
    if (!_w_domElem.getBoundingClientRect) return false;
    let _w_rect = _w_domElem.getBoundingClientRect();
    if (_w_rect.bottom < 0 - _o_preRenderSize || _w_rect.right < 0 - _o_preRenderSize || _w_rect.top > window.innerHeight + _o_preRenderSize || _w_rect.left > window.innerWidth + _o_preRenderSize) {
        return false;
    } else {
        return true;
    }
}

window.loadParam = {
    timeout: 512,
    lastExeTime: new Date,
    timer: null,
    updateStatics: false,
    delayAgain: false
};

function _o_getExtensionId() {
    return chrome.runtime.id;
}

function _o_dynamicRender(_w_selector, _w_updateStatics, _w_tempDelay) {
    _w_updateStatics && (loadParam.updateStatics = _w_updateStatics);
    _o_throttle(loadParam, (function() {
        let _w_updateStatics = false;
        loadParam.updateStatics && (_w_updateStatics = loadParam.updateStatics, loadParam.updateStatics = false);
        if (_w_updateStatics) {
            let _w_menuStatus = _o_getBackground()._o_getMenuStatus();
            if (_w_menuStatus & 1) {
                $("#filter_switch").addClass("btn-pwd active");
                $("#filter_menu").slideDown("fast", _o_updateHeaderShadowHeight);
            } else {
                $("#filter_switch").removeClass("btn-pwd active");
                $("#filter_menu").slideUp("fast", _o_updateHeaderShadowHeight);
            }
            if (_w_menuStatus & 2) {
                $("#select_menu_switch").addClass("btn-pwd active");
                $("#select_menu").slideDown("fast", _o_updateHeaderShadowHeight);
            } else {
                $("#select_menu_switch").removeClass("btn-pwd active");
                $("#select_menu").slideUp("fast", _o_updateHeaderShadowHeight);
            }
            if (_w_menuStatus & 4) {
                $("#sort_switch").addClass("btn-pwd active");
            } else {
                $("#sort_switch").removeClass("btn-pwd active");
            }
            if (_w_menuStatus & 8) {
                $("#resolutionTle_switch").addClass("btn-pwd active");
                $(".imageItemResolution").show();
            } else {
                $("#resolutionTle_switch").removeClass("btn-pwd active");
                $(".imageItemResolution").hide();
            }
            if (_w_menuStatus & 3) {
                $("#menu").show();
            } else {
                $("#menu").hide();
            }
            let _w_selectedImageType = new Array;
            let _w_unSelectImageType = new Array;
            $("#filter_menu_type .imageType[value!=all][value!=other].active").each((function() {
                _w_selectedImageType.push($(this).attr("value"));
            }));
            $("#filter_menu_type .imageType[value!=all][value!=other]:not(.active)").each((function() {
                _w_unSelectImageType.push($(this).attr("value"));
            }));
            $("#filter_menu_type .imageType[value=all]").hasClass("active") ? $(_w_selector).show() : $("#filter_menu_type .imageType[value=other]").hasClass("active") ? $(_w_selector).each((function() {
                _w_unSelectImageType.indexOf($(this).attr("data-imageType")) > -1 ? $(this).hide() : $(this).show();
            })) : $(_w_selector).each((function() {
                _w_selectedImageType.indexOf($(this).attr("data-imageType")) > -1 ? $(this).show() : $(this).hide();
            }));
            let _w_filter_type = _o_filter_image_type.slice(0);
            _w_filter_type.push("other");
            $("#counter_all").html($(_w_selector).length);
            for (let i = 0; i < _w_filter_type.length; ++i) {
                let _w_count = $(_w_selector + "[data-imageType=" + _w_filter_type[i] + "]").length;
                $("#counter_" + _w_filter_type[i]).html(_w_count);
                _w_count != 0 ? $("#counter_" + _w_filter_type[i]).parent().show() : $("#counter_" + _w_filter_type[i]).parent().hide();
            }
            if ($("#filter_menu_size .selectType[value=larger]").hasClass("active")) {
                $("#filter_menu_size .selectOption[value!=all]").each((function() {
                    $(_w_selector + "[data-maxRange=" + $(this).attr("value") + "]").length > 0 ? $(this).show() : $(this).hide();
                }));
                if ($("#filter_menu_size .selectOption[value=all]").hasClass("active")) {} else if ($("#filter_menu_size .selectOption[value=other].active").length > 0) {
                    $(_w_selector + ":visible[data-maxRange!=other]").hide();
                } else {
                    let _w_item = $("#filter_menu_size .selectOption[value!=all][value!=other].active");
                    let _o_image_size = _o_getBackground()._o_huoquTupianOptions();
                    let _w_sizeItem = _o_image_size[_w_item.attr("value")];
                    $(_w_selector + ":visible").each((function() {
                        $(this).attr("data-width") - _w_sizeItem.width >= 0 && $(this).attr("data-height") - _w_sizeItem.height >= 0 ? $(this).show() : $(this).hide();
                    }));
                }
            } else if ($("#filter_menu_size .selectType[value=exact]").hasClass("active")) {
                let _w_selectAbleAmount = 0;
                $("#filter_menu_size .selectOption[value!=all][value!=other]").each((function() {
                    let _w_optionAmount = $(_w_selector + "[data-resolution=" + $(this).attr("value") + "]").length;
                    _w_optionAmount > 0 ? $(this).show() : $(this).hide();
                    _w_selectAbleAmount += _w_optionAmount;
                }));
                let $_w_otherOption = $("#filter_menu_size .selectOption[value=other]");
                _w_selectAbleAmount < $(_w_selector).length ? $_w_otherOption.show() : $_w_otherOption.hide();
                let _w_selectedImageSize = new Array;
                let _w_unSelectImageSize = new Array;
                $("#filter_menu_size .selectOption[value!=all][value!=other].active").each((function() {
                    _w_selectedImageSize.push($(this).attr("value"));
                }));
                $("#filter_menu_size .selectOption[value!=all][value!=other]:not(.active)").each((function() {
                    _w_unSelectImageSize.push($(this).attr("value"));
                }));
                $("#filter_menu_size .selectOption[value=all]").hasClass("active") ? true : $("#filter_menu_size .selectOption[value=other]").hasClass("active") ? $(_w_selector + ":visible").each((function() {
                    _w_unSelectImageSize.indexOf($(this).attr("data-resolution")) > -1 ? $(this).hide() : $(this).show();
                })) : $(_w_selector + ":visible").each((function() {
                    _w_selectedImageSize.indexOf($(this).attr("data-resolution")) > -1 ? $(this).show() : $(this).hide();
                }));
            } else {}
            let _w_regexpStr = $("#urlRegexpFilter").prop("value").trim();
            if (_w_regexpStr && _w_regexpStr.length > 0) {
                try {
                    let _w_matcher = new RegExp(_w_regexpStr);
                    $(_w_selector + ":visible").each((function() {
                        if (null != _w_matcher.exec($(this).attr("data-src"))) {
                            $(this).show();
                        } else {
                            $(this).hide();
                        }
                    }));
                    $("#urlRegexpFilter").removeClass("regexp_error");
                } catch (exception) {
                    $("#urlRegexpFilter").addClass("regexp_error");
                }
            } else {
                $("#urlRegexpFilter").removeClass("regexp_error");
            }
            $(_w_selector + ":visible").addClass("colorbox cboxElement");
            $(_w_selector + ":hidden").removeClass("colorbox cboxElement");
        }
        let _w_visibleImageItemLength = $(_w_selector + ":visible").length;
        $(_w_selector).each((function() {
            let _w_thisElem = $(this).get(0);
            if (!_o_isVisible(_w_thisElem)) {
                if (_w_visibleImageItemLength <= _o_getBackground()._o_getDyLoadSize()) return;
                let _w_img = $(this).find("img").get(0);
                _w_img && _w_img.src != _o_atomPngSrc && (_w_img.src = _o_atomPngSrc);
            } else if ($(this).is(":visible")) {
                let _w_img = $(this).find("img").get(0);
                _w_img && _w_img.src != _w_img.getAttribute("data-src") && (_w_img.src = _w_img.getAttribute("data-src"));
            } else {
                $(this).removeClass("selected");
            }
        }));
    }), _w_tempDelay);
    if (_w_updateStatics) {
        $("#image_amount").html($(_w_selector).length);
        $("#visible_amount").html($(_w_selector + ":visible").length);
        $("#select_amount").html($(_w_selector + ":visible.selected").length);
        if ($("#ext_main>.imageItem").length > 0) {
            $("#empty").remove();
            window._o_loadedMark = true;
        } else if (window._o_loadedMark) {
            $("#empty").length > 0 ? true : function() {
                let _w_empty = new Image;
                _w_empty.setAttribute("id", "empty");
                _w_empty.src = "./images/empty.png";
                $("#ext_main").append(_w_empty);
            }();
        }
        _o_updateHeaderShadowHeight();
        let $_w_ext_main = $("#ext_main");
        let _w_minOuterHeight = window.innerHeight - $("#header").outerHeight();
        if ($_w_ext_main.outerHeight() < _w_minOuterHeight) {
            let _w_difference = $_w_ext_main.outerHeight() - $_w_ext_main.height();
            $_w_ext_main.css("min-height", _w_minOuterHeight - _w_difference);
        }
    }
}

function _o_updateHeaderShadowHeight() {
    $("#ext_main").css("margin-top", $("#header").height());
}

window.sortParam = {
    timeout: 512,
    lastExeTime: new Date,
    timer: null,
    updateStatics: false,
    delayAgain: true
};

function _o_sortElements(_w_parameter) {
    _o_throttle(sortParam, (function() {
        let _w_list = null;
        if (typeof _w_parameter == "string") {
            _w_list = $(_w_parameter).toArray();
        } else {
            _w_list = _w_parameter;
        }
        let _w_menuStatus = _o_getBackground()._o_getMenuStatus();
        let _w_sortBySize = (_w_menuStatus & 4) > 0;
        _w_list.sort((function(a, b) {
            let _w_result = 0;
            if (_w_sortBySize) {
                _w_result = b.getAttribute("data-size") - a.getAttribute("data-size");
            } else {
                let _w_aRefererArray = _o_refererSplitArrayMap[a.getAttribute("data-idx")];
                let _w_bRefererArray = _o_refererSplitArrayMap[b.getAttribute("data-idx")];
                if (a.getAttribute("data-serial") && b.getAttribute("data-serial")) {
                    _w_result = a.getAttribute("data-serial") - b.getAttribute("data-serial");
                } else if (_w_aRefererArray && _w_bRefererArray && _w_aRefererArray > _w_bRefererArray) {
                    _w_result = -1;
                } else if (_w_aRefererArray && _w_bRefererArray && _w_aRefererArray < _w_bRefererArray) {
                    _w_result = 1;
                }
            }
            if (_w_result == 0) {
                return a.getAttribute("data-id") - b.getAttribute("data-id");
            }
            return _w_result;
        }));
        for (let i = 0; i < _w_list.length; ++i) {
            _w_list[i].parentNode.appendChild(_w_list[i]);
        }
        _o_dynamicRender(_w_parameter, true, true);
    }), false);
}

function _o_createSerial(url) {
    if (!window.fileDownloadCounter) {
        window.fileDownloadCounter = 10001;
    }
    if (!window.urlSerialMapper) {
        window.urlSerialMapper = {};
    }
    if (!window.urlSerialMapper[url]) {
        window.urlSerialMapper[url] = window.fileDownloadCounter++;
    }
    return window.urlSerialMapper[url];
}

function _o_directDownload(_w_url, _w_checkSaveAs) {
    blobUtil.imgSrcToBlob(_w_url).then((function(blob) {
        chrome.downloads.download({
            url: blobUtil.createObjectURL(blob),
            saveAs: _w_checkSaveAs ? _w_checkSaveAs : false,
            conflictAction: "uniquify"
        });
    }));
}

function _o_downloadPathEscape(_w_path) {
    if (_w_path) {
        return _w_path.replace(/[\\\/]+/gi, "/").replace(/[\.]+/gi, ".").replace(/^[\.]+/gi, "_").replace(/[\.]+$/gi, "_").replace(/\/[\.]+/gi, "/_").replace(/[\.]+\//gi, "_/");
    }
    return _w_path;
}

function _o_filenameEscape(_w_filename, _w_allowSlash) {
    if (_w_allowSlash) {
        return _w_filename.replace(/[\x00-\x1F\x7F\n\r\f\s\t\v\\:\*\?'"<>%&^`\!\$|  　]+/gi, "_");
    } else {
        return _w_filename.replace(/[\x00-\x1F\x7F\n\r\f\s\t\v\\:\*\?'"<>%&^`\!\$|  　\/]+/gi, "_");
    }
}

function _o_download(_o_itemArray, _o_origin_title, _o_cleanSelectedAndSelectAllItems) {
    if ($(".modal-dialog").is(":visible") || $("#colorbox").is(":visible")) {
        return;
    } else if (_o_itemArray == undefined || _o_itemArray.length == 0) {
        alert(_MSG_("ext_pop_empty_download_list"));
        return;
    }
    if (!_o_origin_title || _o_origin_title.length == 0) folder = (new Date).toJSON();
    _o_origin_title = _o_filenameEscape(_o_origin_title);
    let _w_pathOriginTitle = _o_origin_title.substr(0, 128);
    let $_w_dialog = $("<div />", {
        id: "download_confirm_dlg",
        class: "modal fade",
        role: "dialog"
    });
    let $_w_modalDlg = $("<div />", {
        class: "modal-dialog modal-xl"
    });
    let $_w_modalCnt = $("<div />", {
        class: "modal-content"
    });
    let $_w_modalHdr = $("<div />", {
        class: "modal-header"
    });
    let $_w_modalTle = $("<h4 />", {
        class: "modal-title",
        text: _MSG_("fn_download_modal_tle")
    });
    $_w_modalHdr.append($_w_modalTle);
    $_w_modalCnt.append($_w_modalHdr);
    let $_w_modalBdy = $("<div />", {
        class: "modal-body"
    });
    $_w_modalBdy.append(_MSG_("fn_download_modal_cnt"));
    let $_w_formContainer = $("<form />", {
        class: "form-horizontal"
    });
    $_w_formContainer.append($("<h4 />", {
        text: _MSG_("fn_download_modal_save_path")
    }));
    let $_w_downloadPathGrp = $("<div />", {
        class: "input-group"
    });
    let $_w_downloadDirPrefix = $("<span />", {
        class: "input-group-addon",
        text: _MSG_("manifest_ext_name") + " / "
    });
    $_w_downloadPathGrp.append($_w_downloadDirPrefix);
    let _w_defaultFilePath = "{page.host}/{YYYY-MM-DD}_{HH-mm-ss}/{page.title}";
    let $_w_downloadDir = $("<input />", {
        class: "form-control",
        type: "text",
        value: localStorage["filePath_format"] ? localStorage["filePath_format"] : _w_defaultFilePath
    }).on("change input", (function() {
        localStorage["filePath_format"] = $(this).prop("value");
    }));
    $_w_downloadPathGrp.append($_w_downloadDir);
    let $_w_filePathSwitchBtn = $("<div />", {
        class: "input-group-btn"
    });
    $_w_filePathSwitchBtn.append($("<button />", {
        type: "button",
        class: "btn btn-default dropdown-toggle",
        "data-toggle": "dropdown"
    }).append($("<span />", {
        class: "caret"
    })));
    let $_w_filePathSwitchMenu = $("<ul />", {
        class: "dropdown-menu dropdown-menu-right"
    });
    let $_w_switchRecommendFilePath = $("<a />", {
        href: "#",
        text: _w_defaultFilePath
    });
    $_w_switchRecommendFilePath.on("click", (function() {
        $_w_downloadDir.prop("value", $(this).text()).trigger("change");
    }));
    $_w_filePathSwitchMenu.append($("<li />").append($_w_switchRecommendFilePath));
    $_w_filePathSwitchBtn.append($_w_filePathSwitchMenu);
    $_w_downloadPathGrp.append($_w_filePathSwitchBtn);
    $_w_downloadPathGrp.append($("<span />", {
        class: "input-group-addon",
        text: "/"
    }));
    let $_w_downloadFileName = $("<input />", {
        type: "text",
        class: "form-control",
        value: localStorage["filename_format"] ? localStorage["filename_format"] : "ia_{origin_serial}"
    }).on("change input", (function() {
        localStorage["filename_format"] = $(this).prop("value");
    }));
    $_w_downloadPathGrp.append($_w_downloadFileName);
    let $_w_fileNameSwitchBtn = $("<div />", {
        class: "input-group-btn"
    });
    $_w_fileNameSwitchBtn.append($("<button />", {
        type: "button",
        class: "btn btn-default dropdown-toggle",
        "data-toggle": "dropdown"
    }).append($("<span />", {
        class: "caret"
    })));
    let $_w_fileNameSwitchMenu = $("<ul />", {
        class: "dropdown-menu dropdown-menu-right"
    });
    let $_w_switchOriginalFileName = $("<a />", {
        href: "#",
        text: "{filename}"
    });
    let $_w_switchOriginalSerialFileName = $("<a />", {
        href: "#",
        text: "ia_{origin_serial}"
    });
    let $_w_switchSerialFileName = $("<a />", {
        href: "#",
        text: "ia_{no.10001}"
    });
    $_w_switchOriginalFileName.on("click", (function() {
        $_w_downloadFileName.prop("value", $(this).text()).trigger("change");
    }));
    $_w_switchOriginalSerialFileName.on("click", (function() {
        $_w_downloadFileName.prop("value", $(this).text()).trigger("change");
    }));
    $_w_switchSerialFileName.on("click", (function() {
        $_w_downloadFileName.prop("value", $(this).text()).trigger("change");
    }));
    $_w_fileNameSwitchMenu.append($("<li />").append($_w_switchSerialFileName)).append($("<li />").append($_w_switchOriginalSerialFileName)).append($("<li />").append($_w_switchOriginalFileName));
    $_w_fileNameSwitchBtn.append($_w_fileNameSwitchMenu);
    $_w_downloadPathGrp.append($_w_fileNameSwitchBtn);
    $_w_downloadPathGrp.append($("<span />", {
        class: "input-group-addon",
        text: ".{suffix}"
    }));
    $_w_formContainer.append($("<div />", {
        class: "form-group"
    }).append($("<div />", {
        class: "col-md-12 col-sm-12"
    }).append($_w_downloadPathGrp)));
    $_w_modalBdy.append($_w_formContainer);
    $_w_modalCnt.append($_w_modalBdy);
    let $_w_modalFtr = $("<div />", {
        class: "modal-footer"
    });
    let $_w_curlScriptingBtn = $("<button />", {
        class: "btn btn-default unrelative_download",
        text: _MSG_("ext_pop_generate_curl_script")
    });
    $_w_curlScriptingBtn.prepend($("<span />", {
        class: "fa fa-terminal fa-lg"
    }));
    $_w_modalFtr.append($_w_curlScriptingBtn);
    let $_w_settingBtn = $("<button />", {
        class: "btn btn-default unrelative_download",
        text: _MSG_("fn_download_modal_btn_setting")
    });
    $_w_settingBtn.prepend($("<span />", {
        class: "glyphicon glyphicon-wrench"
    }));
    $_w_modalFtr.append($_w_settingBtn);
    let $_w_blobModeSwitch = $("<input />", {
        type: "checkbox",
        name: "blobModeSwitch"
    });
    $_w_modalFtr.append($("<span />", {
        class: "blobModeSwitchContainer",
        "data-toggle": "tooltip",
        "data-placement": "top",
        title: _MSG_("ext_pop_blob_download_tooltip")
    }).append($_w_blobModeSwitch).tooltip());
    $_w_blobModeSwitch.bootstrapSwitch({
        labelText: _MSG_("ext_pop_blob_download"),
        labelWidth: 100
    });
    let $_w_continuousSwitch = $("<input />", {
        type: "checkbox",
        name: "continuousSwitch"
    });
    $_w_modalFtr.append($("<span />", {
        class: "continuousSwitchContainer"
    }).append($_w_continuousSwitch));
    $_w_continuousSwitch.bootstrapSwitch({
        labelText: _MSG_("ext_pop_auto_download"),
        labelWidth: 100,
        onSwitchChange: function(event, state) {
            if (state == true) {
                $(".unrelative_download").hide();
            } else {
                $(".unrelative_download").show();
            }
        }
    });
    let $_w_continueBtn = $("<button />", {
        class: "btn btn-default",
        text: _MSG_("fn_download_modal_btn_continue")
    });
    $_w_continueBtn.prepend($("<span />", {
        class: "glyphicon glyphicon-download"
    }));
    $_w_modalFtr.append($_w_continueBtn);
    let $_w_cancelBtn = $("<button />", {
        class: "btn btn-default",
        "data-dismiss": "modal",
        text: _MSG_("fn_download_modal_btn_cancel")
    });
    $_w_cancelBtn.prepend($("<span />", {
        class: "glyphicon glyphicon-remove"
    }));
    $_w_modalFtr.append($_w_cancelBtn);
    $_w_modalCnt.append($_w_modalFtr);
    $_w_modalDlg.append($_w_modalCnt);
    $_w_dialog.append($_w_modalDlg);
    $_w_dialog.modal({
        backdrop: "static",
        keyboard: false
    }).on("hidden.bs.modal", (function() {
        $(this).remove();
    }));
    function dealTaskList(_w_itemArray, _w_downloadFun, _w_callback) {
        _w_itemArray.forEach(item => {
            item.order_serial = _o_createSerial(item.url);
            if (!item.serial) {
                if (item.origin_serial) {
                    item.serial = item.origin_serial;
                } else {
                    item.serial = item.order_serial;
                }
            }
            let _w_folder = $_w_downloadDir.prop("value");
            let _w_pageTitle = _o_getBackground()._o_getPageTitle(_o_extractorHash, item.referer);
            let _w_pathPageTitle = _o_filenameEscape(_w_pageTitle, false).substr(0, 128);
            let _w_momentTimeStamp = _o_getBackground()._o_getExtTimeStamp(_o_extractorHash);
            let _w_pageHost = _o_extracHostname(item.referer);
            _w_folder = _w_folder.replace(/\{page.title\}/g, _w_pathPageTitle).replace(/\{page.host\}/g, _w_pageHost).replace(/\{origin.title\}/g, _w_pathOriginTitle).replace(/\{YYYY-MM-DD\}/g, _w_momentTimeStamp.YYYYMMDD).replace(/\{HH-mm-ss\}/g, _w_momentTimeStamp.HHmmss).replace(/\{extractor_hash\}/g, _o_extractorHash);
            let _w_pathname = new URL(item.url).pathname;
            let _w_filename = null;
            let _w_pathFileName = null;
            let _w_suffix = null;
            if (item.url.indexOf("data:") == 0) {
                _w_filename = _o_randomChar(32);
                let _w_matches = item.url.match("data:(.*?)/(.*?);");
                if (_w_matches.length == 3) _w_suffix = "." + _w_matches[2];
            } else {
                _w_filename = _w_pathname.substring(_w_pathname.lastIndexOf("/") + 1);
                try {
                    _w_filename = decodeURIComponent(_w_filename);
                } catch (e) {}
                _w_filename = _o_filenameEscape(_w_filename);
                if (_w_filename.lastIndexOf(".") > 0) {
                    _w_suffix = _w_filename.substring(_w_filename.lastIndexOf(".") + 1);
                    if (_o_image_extension.indexOf(_w_suffix.toLowerCase()) > 0) {} else if (_w_suffix.length > 3 && _o_image_extension.indexOf(_w_suffix.slice(0, 3).toLowerCase()) > 0) {
                        _w_suffix = _w_suffix.slice(0, 3);
                    } else if (_w_suffix.length > 4 && _o_image_extension.indexOf(_w_suffix.slice(0, 4).toLowerCase()) > 0) {
                        _w_suffix = _w_suffix.slice(0, 4);
                    } else {
                        _w_suffix = "jpg";
                    }
                    _w_suffix = "." + _w_suffix;
                    _w_filename = _w_filename.substring(0, _w_filename.lastIndexOf("."));
                } else {
                    _w_suffix = ".jpg";
                }
                _w_pathFileName = _o_filenameEscape(_w_filename, false).substr(-64);
            }
            let _w_filenamePattern = $_w_downloadFileName.prop("value");
            if (_w_filenamePattern.indexOf("{filename}") > -1 || _w_filenamePattern.indexOf("{no.10001}") > -1 || _w_filenamePattern.indexOf("{origin_serial}") > -1 || _w_filenamePattern.indexOf("{page.title}") > -1 || _w_filenamePattern.indexOf("{page.host}") > -1 || _w_filenamePattern.indexOf("{origin.title}") > -1 || _w_filenamePattern.indexOf("{YYYY-MM-DD}") > -1 || _w_filenamePattern.indexOf("{HH-mm-ss}") > -1 || _w_filenamePattern.indexOf("{extractor_hash}") > -1) {
                _w_filename = _w_filenamePattern.replace(/\{filename\}/g, _w_pathFileName).replace(/\{no.10001\}/g, item.order_serial).replace(/\{origin_serial\}/g, item.serial).replace(/\{page.title\}/g, _w_pathPageTitle).replace(/\{origin.title\}/g, _w_pathOriginTitle).replace(/\{page.host\}/g, _w_pageHost).replace(/\{YYYY-MM-DD\}/g, _w_momentTimeStamp.YYYYMMDD).replace(/\{HH-mm-ss\}/g, _w_momentTimeStamp.HHmmss).replace(/\{extractor_hash\}/g, _o_extractorHash);
            }
            _w_filename += _w_suffix;
            _w_downloadFun({
                url: item.url,
                referer: item.referer,
                filename: _MSG_("manifest_ext_name") + "/" + _w_folder + "/" + _w_filename
            });
        });
        if (_w_callback) _w_callback();
    }
    $_w_curlScriptingBtn.on("click", (function() {
        let $_w_curlScriptContainer = $_w_formContainer.find("#curlScriptContainer");
        let $_w_scriptTypeOptionCMD = $_w_formContainer.find("#scriptTypeOptionCMD");
        let $_w_scriptTypeOptionShell = $_w_formContainer.find("#scriptTypeOptionShell");
        let _w_scriptTypeOptionCMD = "";
        let _w_scriptTypeOptionShell = "";
        let _w_isPlatformWindows = navigator.platform.toLocaleLowerCase().indexOf("win") == 0;
        if ($_w_curlScriptContainer.length == 0) {
            let $_w_curlScriptTle = $("<h4 />", {
                text: _MSG_("ext_pop_curl_script")
            });
            $_w_scriptTypeOptionCMD = $("<div />", {
                id: "scriptTypeOptionCMD",
                class: "btn btn-default " + (_w_isPlatformWindows ? "btn-primary" : ""),
                text: "CMD"
            });
            $_w_scriptTypeOptionShell = $("<div />", {
                id: "scriptTypeOptionShell",
                class: "btn btn-default " + (_w_isPlatformWindows ? "" : "btn-primary"),
                text: "Shell"
            });
            $_w_curlScriptTle.append($("<div />", {
                class: "btn-group btn-group-xs btn-group-vertical",
                "data-toggle": "buttons"
            }).append($_w_scriptTypeOptionCMD).append($_w_scriptTypeOptionShell));
            $_w_curlScriptContainer = $("<textarea />", {
                id: "curlScriptContainer",
                rows: 16,
                class: "form-control"
            });
            $_w_formContainer.append($("<div />", {
                class: "unrelative_download"
            }).append($_w_curlScriptTle).append($("<div />", {
                class: "form-group"
            }).append($("<div />", {
                class: "col-md-12 col-sm-12"
            }).append($_w_curlScriptContainer))));
            $($_w_scriptTypeOptionCMD).on("click", (function() {
                $(this).addClass("btn-primary");
                $_w_scriptTypeOptionShell.removeClass("btn-primary");
                $_w_curlScriptContainer.prop("value", _w_scriptTypeOptionCMD);
            }));
            $($_w_scriptTypeOptionShell).on("click", (function() {
                $(this).addClass("btn-primary");
                $_w_scriptTypeOptionCMD.removeClass("btn-primary");
                $_w_curlScriptContainer.prop("value", _w_scriptTypeOptionShell);
            }));
        } else {
            _w_scriptTypeOptionCMD = "";
            _w_scriptTypeOptionShell = "";
            $_w_curlScriptContainer.prop("value", "");
        }
        dealTaskList(_o_itemArray, (function(_w_task) {
            if (!_o_isAccessibleUrl(_w_task.url)) return;
            let _w_taskReferer = encodeURI(decodeURI(_w_task.referer));
            let _w_acceptedLanguage = navigator.languages ? navigator.languages.toString() : navigator.language.toString();
            let _w_userAgent = navigator.userAgent;
            _w_scriptTypeOptionCMD += "\n";
            _w_scriptTypeOptionCMD += 'curl -L "' + _w_task.url + '" -o "' + _w_task.filename.replace(/\//g, "\\") + '" --create-dirs -H "Accept: image/*,*/*;q=0.8" -H "Connection: keep-alive" -H "Accept-Encoding: gzip, deflate, sdch" -H "Referer: ' + _w_taskReferer + '" -H "Accept-Language: ' + _w_acceptedLanguage + ';q=0.8" -H "User-Agent: ' + _w_userAgent + '" -k --retry 4';
            _w_scriptTypeOptionCMD += "\n";
            _w_scriptTypeOptionShell += "\n";
            _w_scriptTypeOptionShell += 'curl -L "' + _w_task.url + '" -o "' + _w_task.filename.replace(/\//g, "/") + '" --create-dirs -H "Accept: image/*,*/*;q=0.8" -H "Connection: keep-alive" -H "Accept-Encoding: gzip, deflate, sdch" -H "Referer: ' + _w_taskReferer + '" -H "Accept-Language: ' + _w_acceptedLanguage + ';q=0.8" -H "User-Agent: ' + _w_userAgent + '" -k --retry 4';
            _w_scriptTypeOptionShell += "\n";
            $_w_curlScriptContainer.prop("value", $_w_scriptTypeOptionCMD.hasClass("btn-primary") ? _w_scriptTypeOptionCMD : _w_scriptTypeOptionShell);
        }), null);
    }));
    $_w_settingBtn.on("click", (function() {
        chrome.tabs.create({
            url: "chrome://settings/?search=" + _MSG_("fn_download_modal_download_setting_search")
        });
    }));
    $_w_continueBtn.on("click", (function() {
        let _w_doBlobModeDownload = $_w_blobModeSwitch.is(":checked");
        let _w_doContinuousDownload = $_w_continuousSwitch.is(":checked");
        if (_w_doContinuousDownload) {
            $(this).prop("disabled", true);
            $_w_formContainer.find("input,select, button").prop("disabled", true);
            $_w_continuousSwitch.bootstrapSwitch("disabled", true);
        }
        let _w_downloadFun = function(_w_task) {
            function doDownloadUrl(_w_downloadUrl) {
                chrome.downloads.download({
                    url: _w_downloadUrl,
                    filename: _o_downloadPathEscape(_w_task.filename),
                    saveAs: false,
                    conflictAction: "uniquify"
                });
            }
            if (_w_doBlobModeDownload) {
                blobUtil.imgSrcToBlob(_w_task.url).then((function(_w_blob) {
                    doDownloadUrl(blobUtil.createObjectURL(_w_blob));
                }));
            } else {
                doDownloadUrl(_w_task.url);
            }
        };
        if (_w_doContinuousDownload) {
            (function continueDownloadFun(_w_itemArray) {
                dealTaskList(_w_itemArray, _w_downloadFun, (function() {
                    if ($_w_dialog.is(":visible")) {
                        let _w__continuous_itemArray = _o_cleanSelectedAndSelectAllItems();
                        setTimeout(() => {
                            continueDownloadFun(_w__continuous_itemArray);
                        }, 2e3);
                    }
                }));
            })(_o_itemArray);
            chrome.notifications.create("", {
                type: "basic",
                iconUrl: "./images/icon512.png",
                title: _MSG_("ext_pop_auto_downloading"),
                message: _MSG_("ext_pop_auto_download_msg")
            });
        } else {
            dealTaskList(_o_itemArray, _w_downloadFun, null);
            $_w_dialog.modal("hide");
            chrome.notifications.create("", {
                type: "basic",
                iconUrl: "./images/icon512.png",
                title: _MSG_("fn_notification_download_done_title"),
                message: _MSG_("fn_notification_download_done_msg")
            });
        }
    }));
    $_w_cancelBtn.on("click", (function() {}));
    if (!chrome.downloads || !chrome.downloads.download) {
        $_w_settingBtn.attr("disabled", true);
        $_w_continueBtn.attr("disabled", true);
        chrome.notifications.create("", {
            type: "basic",
            iconUrl: "./images/icon512.png",
            title: _MSG_("ext_pop_download_api_not_found"),
            message: _MSG_("ext_pop_download_api_not_found_msg")
        }, (function(notificationId) {}));
    }
}

function _o_throttle(_w_param, _w_fun, _w_tempDelay) {
    function execMe() {
        _w_param.lastExeTime = new Date;
        _w_fun();
    }
    _w_param.timer && clearTimeout(_w_param.timer);
    if ((new Date).getTime() - _w_param.lastExeTime.getTime() > _w_param.timeout) {
        execMe();
    } else {
        _w_param.timer = setTimeout(execMe, _w_param.timeout);
        (_w_param.delayAgain || _w_tempDelay) && (_w_param.lastExeTime = new Date);
    }
}

function _o_sizeItemExt(_o_image_size, _w_addReverseItem) {
    for (let i = 0; i < _o_image_size.length; ++i) {
        let _w_name = _o_image_size[i];
        let _w_value = _w_name.split("x");
        _o_image_size[_w_name] = {
            width: _w_value[0],
            height: _w_value[1]
        };
        let _w_reverse_name = _o_image_size[_w_name].height + "x" + _o_image_size[_w_name].width;
        if (_w_addReverseItem && _o_image_size.indexOf(_w_reverse_name) == -1) {
            _o_image_size.push(_w_reverse_name);
            _o_image_size[_w_reverse_name] = {
                width: _o_image_size[_w_name].height,
                height: _o_image_size[_w_name].width
            };
        }
    }
    return _o_sizeItemSort(_o_image_size);
}

function _o_sizeItemSort(_o_image_size) {
    _o_image_size.sort((function(a, b) {
        let _w_elem_a = _o_image_size[a];
        let _w_elem_b = _o_image_size[b];
        return _w_elem_a.width - _w_elem_b.width > 0 ? 1 : _w_elem_a.width - _w_elem_b.width < 0 ? -1 : _w_elem_a.height - _w_elem_b.height > 0 ? 1 : _w_elem_a.height - _w_elem_b.height < 0 ? -1 : 0;
    }));
    return _o_image_size;
}

function _o_randomFingerChar() {
    let _w_clientFinger = _o_getBackground()._o_getClientFinger();
    let _w_key = _o_randomCharSerial();
    _w_clientFinger = _w_key + _o_pwdEncrypt(_w_key, _o_getExtensionId() + _w_clientFinger);
    return _w_clientFinger;
}

function _o_pwdEncrypt(_w_key, _w_originalStr) {
    let _w_n = _w_key.indexOf("0") % 16 + 1;
    for (;_w_n > 0; --_w_n) {
        _w_originalStr = _o_offsetEncrypt(_w_key, _w_originalStr);
    }
    return _w_originalStr;
}

function _o_pwdDecrypt(_w_key, _w_originalStr) {
    let _w_n = _w_key.indexOf("0") % 16 + 1;
    for (;_w_n > 0; --_w_n) {
        _w_originalStr = _o_offsetDecrypt(_w_key, _w_originalStr);
    }
    return _w_originalStr;
}

function _o_offsetEncrypt(_w_key, _w_originalStr) {
    let _w_keyArray = _w_key.toLowerCase().split("");
    let _w_originalArray = _w_originalStr.toLowerCase().split("");
    let _w_sampleArray = _o_charSeed.toLowerCase().split("");
    let _w_offsetedArray = new Array;
    for (let i = 0; i < _w_originalArray.length; ++i) {
        _w_offsetedArray.push(_w_keyArray[_w_sampleArray.indexOf(_w_originalArray[i])]);
    }
    return _w_offsetedArray.join("");
}

function _o_offsetDecrypt(_w_key, _w_originalStr) {
    let _w_keyArray = _w_key.toLowerCase().split("");
    let _w_originalArray = _w_originalStr.toLowerCase().split("");
    let _w_sampleArray = _o_charSeed.toLowerCase().split("");
    let _w_offsetedArray = new Array;
    for (let i = 0; i < _w_originalArray.length; ++i) {
        _w_offsetedArray.push(_w_sampleArray[_w_keyArray.indexOf(_w_originalArray[i])]);
    }
    return _w_offsetedArray.join("");
}

function _o_randomMax(l) {
    if (isNaN(l)) {
        l = 0;
    }
    return parseInt(Math.random() * l);
}

function _o_randomChar(l) {
    let _w_x = _o_charSeed;
    let _w_tmp = "";
    for (let i = 0; i < l; ++i) {
        _w_tmp += _w_x.charAt(Math.ceil(Math.random() * 1e8) % _w_x.length);
    }
    return _w_tmp;
}

function _o_randomCharSerial() {
    let _w_x = _o_charSeed.split("");
    let _w_serial = "";
    while (_w_x.length > 0) {
        let _w_fPos = Math.ceil(Math.random() * 1e8) % _w_x.length;
        _w_serial += _w_x.splice(_w_fPos, 1)[0];
    }
    return _w_serial;
}

function _o_randomHex(l) {
    let _w_x = _o_hexSeed;
    let _w_tmp = "";
    for (let i = 0; i < l; ++i) {
        _w_tmp += _w_x.charAt(Math.ceil(Math.random() * 1e8) % _w_x.length);
    }
    return _w_tmp;
}

function _o_randomNumber(l) {
    let _w_x = _o_numberSeed;
    let _w_tmp = "";
    for (let i = 0; i < l; ++i) {
        _w_tmp += _w_x.charAt(Math.ceil(Math.random() * 1e8) % _w_x.length);
    }
    return _w_tmp;
}

Number.parseInt = function(data) {
    return parseInt(data);
};

function _o_pathConvert(_w_baseURI, _w_relativePath) {
    if (!_w_relativePath || _w_relativePath == "") {
        if (!_w_baseURI || _w_baseURI == "") {
            return "";
        } else {
            return _w_baseURI;
        }
    } else if (_o_isAccessibleUrl(_w_relativePath)) {
        let _w_url = new URL(_w_relativePath);
        return _w_url.href;
    }
    let _w_baseURL = null;
    try {
        _w_baseURL = new URL(_w_baseURI);
    } catch (exception) {
        return _w_relativePath;
    }
    if (_w_relativePath.startsWith("//")) {
        return _w_baseURL.protocol + _w_relativePath;
    }
    let _w_baseURIHost = "";
    let _w_baseURIPath = "";
    _w_baseURIHost += _w_baseURL.protocol + "//";
    if (_w_baseURL.username) {
        _w_baseURIHost += _w_baseURL.username;
        if (_w_baseURL.password) {
            _w_baseURIHost += ":" + _w_baseURL.password;
        }
        _w_baseURIHost += "@";
    }
    _w_baseURIHost += _w_baseURL.host;
    _w_baseURIPath = _w_baseURIHost + _w_baseURL.pathname;
    if (_w_baseURIPath[_w_baseURIPath.length - 1] != "/") {
        _w_baseURIPath = _w_baseURIPath.substring(0, _w_baseURIPath.lastIndexOf("/") + 1);
    }
    if (_w_relativePath[0] == "/") {
        let _w_url = new URL(_w_baseURIHost + _w_relativePath);
        return _w_url.href;
    } else {
        let _w_url = new URL(_w_baseURIPath + _w_relativePath);
        return _w_url.href;
    }
}

function _o_timeSeed() {
    return "0." + ((new Date).getTime() / 1e3 / 3600 / 24 / 7).toFixed(0);
}

function _o_randomRequestURL(_w_url, _w_randStr) {
    if (!_w_url) {
        return "";
    } else if (_w_url.indexOf("data:") == 0) {
        return _w_url;
    }
    if (_w_url.indexOf("#") > 0) {
        _w_url = _w_url.substring(0, _w_url.indexOf("#"));
    }
    if (!_w_randStr || _w_randStr.trim() == "") _w_randStr = Math.random();
    if (_w_url.indexOf("?") > 0) {
        _w_url += "&" + _w_randStr;
    } else {
        _w_url += "?" + _w_randStr;
    }
    return _w_url;
}

function _o_sendThirdPartHandleMsg(url, action) {
    let _w_message = {
        type: "_o_chuli3rdXinxi",
        url: url,
        action: action,
        createNewTab: true
    };
    chrome.runtime.sendMessage(_o_getExtensionId(), _w_message);
    return _w_message;
}

function _o_sendMsgToCloseTab() {
    chrome.runtime.sendMessage(chrome.runtime.id, {
        type: "_o_guanbiTab"
    });
}

function _o_getQueryLanguange() {
    let _w_acceptedLanguages = [ "en-US", "zh-CN", "zh-TW" ];
    let _w_queryLanguange = navigator.language;
    if (_w_acceptedLanguages.indexOf(_w_queryLanguange) < 0) _w_queryLanguange = _w_acceptedLanguages[0];
    return _w_queryLanguange;
}

function _o_googleRelativeInfo(url) {
    let _w_googleRequestUrl = "https://www.google.com/searchbyimage?hl=" + _o_getQueryLanguange() + "&image_url=" + encodeURIComponent(decodeURI(url));
    return _o_sendThirdPartHandleMsg(_w_googleRequestUrl);
}

function _o_googleViewAllSize(url) {
    let _w_googleRequestUrl = "https://www.google.com/searchbyimage?hl=" + _o_getQueryLanguange() + "&image_url=" + encodeURIComponent(decodeURI(url));
    return _o_sendThirdPartHandleMsg(_w_googleRequestUrl, "_o_googleViewAllSize_");
}

function _o_googleViewAnalogous(url) {
    let _w_googleRequestUrl = "https://www.google.com/searchbyimage?hl=" + _o_getQueryLanguange() + "&image_url=" + encodeURIComponent(decodeURI(url));
    return _o_sendThirdPartHandleMsg(_w_googleRequestUrl, "_o_googleViewAnalogous_");
}

function _o_sogouRelativeInfo(url) {
    let _w_sogouRequestUrl = "https://image.sogou.com/ris/result?scope=ss&query=" + encodeURIComponent(decodeURI(url));
    return _o_sendThirdPartHandleMsg(_w_sogouRequestUrl);
}

function _o_sogouViewAllSize(url) {
    let _w_sogouRequestUrl = "https://image.sogou.com/ris/result?flag=0&scope=ris&dm=0&query=" + encodeURIComponent(decodeURI(url));
    return _o_sendThirdPartHandleMsg(_w_sogouRequestUrl, "_o_extThisPage");
}

function _o_googleImageSearchKeyword(keyword) {
    let _w_googleRequestUrl = "https://www.google.com/search?tbm=isch&hl=" + navigator.language + "&q=" + encodeURIComponent(keyword);
    return _o_sendThirdPartHandleMsg(_w_googleRequestUrl, "_o_extThisPage");
}

function _o_baiduImageSearchKeyword(keword) {
    let _w_baiduRequestUrl = "http://image.baidu.com/search/index?tn=baiduimage&word=" + encodeURIComponent(keword);
    return _o_sendThirdPartHandleMsg(_w_baiduRequestUrl, "_o_extThisPage");
}

function _o_ajaxCallback(ajaxParam, _o_PrefetchedDataHandle) {
    let _o_callbackProxyFun = function(data, status, xhr) {
        _o_PrefetchedDataHandle(data, status, xhr);
    };
    if (window.location.protocol == "http:" || window.location.protocol == "https:") {
        _o_backgroundAjax(ajaxParam, _o_callbackProxyFun);
    } else {
        if (!window.funExecutePool) {
            window.funExecutePool = _o_createTaskExecutePool(4);
        }
        window.funExecutePool.addTask((function(beginFun, endFun) {
            beginFun();
            $.ajax(ajaxParam).always(endFun).always(_o_callbackProxyFun);
        }));
    }
}

function _o_backgroundAjax(requestParam, callbackFun) {
    if (!requestParam || !requestParam.url) {
        callbackFun();
        return;
    }
    requestParam.url = _o_pathConvert(window.location.href, requestParam.url);
    let _w_requestHash = _o_randomChar(64);
    if (!window._o_background_ajax_seted) {
        chrome.runtime.onMessage.addListener((function _o_bgAjxRespFun(message, sender, callback) {
            if (message && message.type == "_o_backgroundAjaxResponse") {
                if (message.status == "success") {
                    message.xhr.getResponseHeader = function(headerName) {
                        return message.xhr.responseHeaders[headerName];
                    };
                }
                if (_o_background_ajax_hash_mapper[message.requestHash]) {
                    let _w_dealFun = _o_background_ajax_hash_mapper[message.requestHash];
                    delete _o_background_ajax_hash_mapper[message.requestHash];
                    _w_dealFun = _w_dealFun(message.data, message.status, message.xhr);
                }
            }
        }));
        window._o_background_ajax_seted = true;
    }
    _o_background_ajax_hash_mapper[_w_requestHash] = callbackFun;
    chrome.runtime.sendMessage(chrome.runtime.id, {
        type: "_o_houtaiQingqiu",
        requestParam: requestParam,
        requestHash: _w_requestHash
    });
}

function _o_isServiceSite(url) {
    try {
        let _w_url = new URL(_w_url);
        if (_w_url.href.startsWith(_o_multiURLExtDefURL)) {
            return false;
        } else if (_w_url.hostname.endsWith("cxyz.info") || _w_url.hostname.endsWith("pullywood.com")) {
            return true;
        } else {
            return false;
        }
    } catch (exception) {
        return false;
    }
}

function _o_isExtensionPage(url) {
    try {
        let _w_url = new URL(_w_url);
        if (_w_url.host == chrome.runtime.id) {
            return true;
        } else {
            return false;
        }
    } catch (exception) {
        return false;
    }
}

function _o_RestoreUrlFromServiceSite(url) {
    if (url.indexOf("#") > 0) url = url.substring(0, url.indexOf("#"));
    if (/^.*?([\?&]0\.\d{4,6})+$/.test(url)) {
        return url.replace(/([\?&]0\.\d{4,6})+$/, "");
    } else {
        return url;
    }
}

window._o_isAllowedFileSchemeAccess = function() {
    let _o_isAllowed = false;
    if (typeof chrome != "undefined" && typeof chrome.extension != "undefined" && typeof chrome.extension.isAllowedFileSchemeAccess != "undefined") {
        chrome.extension.isAllowedFileSchemeAccess((function(isAllowed) {
            _o_isAllowed = isAllowed;
        }));
    }
    return function() {
        return _o_isAllowed;
    };
}();

function _o_isMultiExtUrl(url) {
    return new URL(url).pathname == "/multiUrlExtractor.html" || new URL(url).pathname == "/blank.html";
}

function _o_isAccessibleUrl(url) {
    let _w_accessibleProtocols = [ "http:", "https:", "ftp:", "data:", "about:" ];
    let _w_localFileProtocol = "file:";
    if (_o_isAllowedFileSchemeAccess() || _o_getBackground && _o_getBackground() && _o_getBackground()._o_isAllowedFileSchemeAccess()) {
        _w_accessibleProtocols.push(_w_localFileProtocol);
    }
    try {
        url = new URL(url);
        return _w_accessibleProtocols.indexOf(url.protocol) >= 0;
    } catch (exception) {
        return false;
    }
}

function _o_formatURL(url) {
    if (!url || url == "") return url;
    if (url.indexOf("#") >= 0) url = url.substring(0, url.indexOf("#"));
    return url.trim();
}

chrome.runtime.onMessage.addListener((function(message, sender, callback) {
    if (message && message.type == "_o_createQRCode") {
        _o_createQRCode(message.text, true);
    }
}));

function _o_createQRCode(text, showTitle) {
    let _o_qrCodeDialogId = "_o_qrCodeDialogId";
    let _w_scrollInfo = {};
    _w_scrollInfo.scrollX = window.scrollX;
    _w_scrollInfo.scrollY = window.scrollY;
    let $_w_bootstrapCssTag = $("<link />", {
        rel: "stylesheet",
        type: "text/css",
        href: chrome.extension.getURL("libs/bootstrap/3.4.1/css/bootstrap.min.css")
    });
    $("head").append($_w_bootstrapCssTag);
    let $_w_qrCodeModal = $("#" + _o_qrCodeDialogId);
    if ($_w_qrCodeModal.length > 0) $_w_qrCodeModal.modal("hide");
    $_w_qrCodeModal = $("<div />", {
        id: _o_qrCodeDialogId,
        class: "modal fade",
        style: "z-index:999999999",
        role: "dialog"
    });
    let $_w_modalDlg = $("<div />", {
        class: "modal-dialog"
    });
    let $_w_modalCnt = $("<div />", {
        class: "modal-content"
    });
    let $_w_modalHdr = $("<div />", {
        class: "modal-header",
        style: "overflow:hidden; word-wrap: break-word; word-break: break-all;"
    });
    let $_w_modalHdrCloseBtn = $("<button />", {
        class: "close",
        "data-dismiss": "modal",
        text: "x"
    });
    $_w_modalHdr.append($_w_modalHdrCloseBtn);
    if (showTitle) {
        let $_w_modalTle = $("<h4 />", {
            class: "modal-title",
            style: "overflow:hidden; word-wrap: break-word; word-break: break-all;",
            text: text.trim()
        });
        $_w_modalHdr.append($_w_modalTle);
    }
    $_w_modalCnt.append($_w_modalHdr);
    let $_w_modalBdy = $("<div />", {
        class: "modal-body",
        style: "overflow:hidden; word-wrap: break-word; word-break: break-all;"
    });
    $_w_modalCnt.append($_w_modalBdy);
    let $_w_modalFtr = $("<div />", {
        class: "modal-footer",
        style: "overflow:hidden; word-wrap: break-word; word-break: break-all;"
    });
    $_w_modalFtr.append('Generated By <a target="_pullywood_" href="http://www.pullywood.com/ImageAssistant/">' + _MSG_("opt_brand_text") + "</a>");
    $_w_modalCnt.append($_w_modalFtr);
    $_w_modalDlg.append($_w_modalCnt);
    $_w_qrCodeModal.append($_w_modalDlg);
    $_w_qrCodeModal.modal({
        keyboard: true
    }).on("shown.bs.modal", (function(e) {
        function dynamicSizeQRCode(qrCodeSize) {
            $_w_modalBdy.html("");
            if (!qrCodeSize) {
                let _w_maxWidth = $_w_modalBdy.width() - 30;
                let _w_maxHeight = $_w_modalBdy[0].getBoundingClientRect ? window.innerHeight - $_w_modalBdy[0].getBoundingClientRect().top - 30 : _w_maxWidth;
                qrCodeSize = _w_maxWidth > _w_maxHeight ? _w_maxHeight : _w_maxWidth;
            }
            let _w_qrCode = null;
            let _w_correctLevels = [ QRCode.CorrectLevel.L, QRCode.CorrectLevel.M, QRCode.CorrectLevel.Q, QRCode.CorrectLevel.H ];
            while (!_w_qrCode && _w_correctLevels.length > 0) {
                try {
                    let _w_qrCodeLevel = _w_correctLevels.pop();
                    _w_qrCode = new QRCode($_w_modalBdy.get(0), {
                        text: text.trim(),
                        width: qrCodeSize,
                        height: qrCodeSize,
                        colorDark: "#000000",
                        colorLight: "#ffffff",
                        correctLevel: _w_qrCodeLevel
                    });
                } catch (exception) {
                    $_w_modalBdy.html("");
                }
            }
            _w_qrCode = undefined;
        }
        $(window).on("resize", (function() {
            dynamicSizeQRCode();
        })).resize();
    })).on("hidden.bs.modal", (function(e) {
        $_w_bootstrapCssTag.remove();
        $(this).remove();
        window.scrollTo(_w_scrollInfo.scrollX, _w_scrollInfo.scrollY);
    }));
}

function _o_Qrcd(_w_text, _w_qrCodeSize, _w_fgColor, _w_bgColor) {
    let _w_container = document.createElement("div");
    let _w_qrCode = null;
    let _w_correctLevels = [ QRCode.CorrectLevel.L, QRCode.CorrectLevel.M, QRCode.CorrectLevel.Q, QRCode.CorrectLevel.H ];
    while (!_w_qrCode && _w_correctLevels.length > 0) {
        try {
            let _w_qrCodeLevel = _w_correctLevels.pop();
            _w_qrCode = new QRCode(_w_container, {
                text: _w_text.trim(),
                width: _w_qrCodeSize,
                height: _w_qrCodeSize,
                colorDark: _w_fgColor,
                colorLight: _w_bgColor,
                correctLevel: _w_qrCodeLevel
            });
        } catch (exception) {}
    }
    _w_qrCode = undefined;
    let _w_images = _w_container.getElementsByTagName("img");
    if (_w_images && _w_images.length > 0) {
        return _w_images[0];
    }
}

function _o_numberToFixedLengthStr(_w_numValue, _w_length) {
    let _w_sampleStr = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    if (typeof _w_numValue == "undefined" || typeof _w_length == "undefined" || isNaN(_w_length)) return "";
    _w_length = Number.parseInt(_w_length);
    if (_w_length > 128) _w_length = 128;
    _w_numValue = _w_numValue.toString();
    if (_w_numValue.length < _w_length) {
        _w_length -= _w_numValue.length;
        _w_numValue = _w_sampleStr.substr(0, _w_length) + _w_numValue;
    }
    return _w_numValue;
}

function _o_escapeHtml(_w_string) {
    return String(_w_string).replace(/[&<>"'\/]/g, (function(s) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;"
        }[s];
    }));
}

function _o_escapeRegexp(string) {
    return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function _o_isExcludeURL(url) {
    if (!url) {
        return true;
    } else if (url.indexOf(_o_extStatisticURL) == 0 || url.indexOf(_o_extStatisticURL.replace("http://", "https://")) == 0) {
        return true;
    } else if (url.match(/^https?:\/\/(img|image|)\d*\.cxyz\.info\/.*/i)) {
        return true;
    }
    return false;
}

function _o_rewriteBrowserPopup() {
    window.alert = function(alert) {
        console.log("window.alert: " + alert);
    };
    window.confirm = function(confirm) {
        console.log("window.confirm: " + confirm, ", return true");
        return true;
    };
    window.prompt = function(prompt) {
        console.log("window.prompt: " + prompt, ', return ""');
        return "";
    };
}

function _o_continuousScrollToBottom() {
    if (typeof window._o_continuousScrollToBottomSwitch == "undefined") {
        window._o_continuousScrollToBottomSwitch = true;
        setInterval((function() {
            if (!window._o_currentPageYOffset) {
                window._o_currentPageYOffset = 0;
            }
            let _w_minScroll = window.innerHeight > 100 ? window.innerHeight : 100;
            if (window.pageYOffset - window._o_currentPageYOffset >= _w_minScroll / 2) {
                chrome.runtime.sendMessage(_o_getExtensionId(), {
                    type: "_o_notifyGunDong"
                });
            }
            window._o_currentPageYOffset = window.pageYOffset;
        }), 100);
        setInterval((function() {
            window.scrollBy(0, window.innerHeight);
        }), 500);
    }
}

function _o_init_set() {
    let _o_container = {};
    return {
        add: function(item) {
            _o_container[item] = true;
        },
        has: function(item) {
            if (_o_container[item]) {
                return true;
            } else {
                return false;
            }
        },
        size: function() {
            return Object.keys(_o_container).length;
        }
    };
}

function _o_extracHostname(url) {
    let _w_host = "";
    try {
        _w_host = new URL(url).host;
    } catch (exception) {}
    return _w_host;
}

function _o_createImageLoadTimeoutSiteAnalyzer(_w_timeout, _w_count) {
    let _w_loadTimeout = _w_timeout;
    let _w_bypassThreshold = _w_count;
    let _w_analysis = {};
    let _w_counterFun = function(host, inTime, outOfTime) {
        if (typeof _w_analysis[host] == "undefined") {
            _w_analysis[host] = [ 0, 0 ];
        }
        inTime && _w_analysis[host][0]++;
        outOfTime && _w_analysis[host][1]++;
    };
    let _w_isBypassHost = function(host) {
        if (_w_analysis[host] && _w_analysis[host][0] == 0 && _w_analysis[host][1] >= _w_bypassThreshold) {
            return true;
        } else {
            return false;
        }
    };
    return {
        setImgSrc: function(img, src) {
            let _w_host = _o_extracHostname(src);
            let _w_loadTimeout = false;
            let _w_timer = setTimeout((function() {
                if (!img.complete) {
                    _w_loadTimeout = true;
                    _w_counterFun(_w_host, false, true);
                } else if (img.src == src) {
                    _w_counterFun(_w_host, true, false);
                } else {}
            }), _w_timeout);
            img.src = src;
            return {
                isTimeout: function() {
                    return _w_loadTimeout;
                },
                loaded: function() {
                    clearTimeout(_w_timer);
                    _w_counterFun(_w_host, true, false);
                }
            };
        },
        directSetImgSrc: function(img, src) {
            img.src = src;
            return {
                isTimeout: function() {
                    return false;
                },
                loaded: function() {}
            };
        },
        bypassUrl: function(url) {
            if (typeof url == "undefined") {
                return true;
            }
            let _w_host = _o_extracHostname(url);
            if (_w_host == "") {
                return true;
            }
            return _w_isBypassHost(_w_host);
        },
        getStatus: function() {
            return JSON.stringify(_w_analysis);
        },
        getBypassSite: function() {
            let _w_arr = [];
            Object.keys(_w_analysis).forEach((function(host) {
                if (_w_isBypassHost(host)) {
                    _w_arr.push(host);
                }
            }));
            return _w_arr;
        }
    };
}

function _o_downloadText(_w_filename, _w_content) {
    let _w_a = document.createElement("a");
    let _w_blob = new Blob([ _w_content ], {
        type: "text/plain;charset=UTF-8"
    });
    _w_a.href = window.URL.createObjectURL(_w_blob);
    _w_a.download = _w_filename;
    _w_a.style.display = "none";
    document.body.appendChild(_w_a);
    _w_a.click();
    _w_a = undefined;
}

function _o_createBatchAjaxPool(_w_taskExecutePool) {
    let _w_executePool = null;
    if (typeof _w_taskExecutePool == "number") {
        _w_executePool = _o_createTaskExecutePool(_w_taskExecutePool);
    } else if (_w_taskExecutePool.addTask && typeof _w_taskExecutePool.addTask == "function" && _w_taskExecutePool.setMax && typeof _w_taskExecutePool.setMax == "function") {
        _w_executePool = _w_taskExecutePool;
    } else {
        _w_executePool = _o_createTaskExecutePool(8);
    }
    let _w_ajaxFun = function(_w_method, _w_url, _w_headers, _w_data, _w_doneFun, _w_failFun, _w_alwaysFun) {
        _w_executePool.addTask((function(beginFun, endFun) {
            let _w_payload = null;
            try {
                _w_payload = JSON.stringify(_w_data);
            } catch (exception) {}
            beginFun();
            $.ajax({
                method: _w_method,
                url: _w_url,
                timeout: _o_ajax_request_timeout,
                headers: _w_headers,
                data: _w_payload,
                contentType: "application/json"
            }).always(endFun).done(_w_doneFun).fail(_w_failFun).always(_w_alwaysFun);
        }));
    };
    return {
        ajaxGet: function(_w_url, _w_headers, _w_data, _w_doneFun, _w_failFun, _w_alwaysFun) {
            _w_ajaxFun("GET", _w_url, _w_headers, _w_data, _w_doneFun, _w_failFun, _w_alwaysFun);
        },
        ajaxPost: function(_w_url, _w_headers, _w_data, _w_doneFun, _w_failFun, _w_alwaysFun) {
            _w_ajaxFun("POST", _w_url, _w_headers, _w_data, _w_doneFun, _w_failFun, _w_alwaysFun);
        },
        setMax: function(max) {
            _w_executePool.setMax(max);
        },
        getProcessingNum: function() {
            return _w_executePool.getProcessingNum();
        },
        getTaskNum: function() {
            return _w_executePool.getTaskNum();
        }
    };
}

function _o_commonUrlComplete(_w_urls, _w_regexp, _w_tIdx, _w_pIdx) {
    let _w_characteristicArray = [];
    let _w_characteristicFormat = null;
    let _w_emptyFirst = false;
    _w_urls.forEach((function(url) {
        let _w_regResult = _w_regexp.exec(url);
        if (_w_regResult) {
            _w_characteristicFormat = _w_regResult;
            _w_characteristicArray.push([ _w_characteristicFormat[_w_tIdx], parseInt(_w_characteristicFormat[_w_pIdx] ? _w_characteristicFormat[_w_pIdx] : 1) ]);
            if (_w_characteristicFormat[_w_pIdx] == "") {
                _w_emptyFirst = true;
            }
        }
    }));
    _w_characteristicArray.sort((function(a, b) {
        let _w_result = a[0].localeCompare(b[0]);
        if (_w_result == 0) {
            _w_result = a[1] - b[1];
        }
        return _w_result;
    }));
    let _w_outputs_0 = Array.from(_w_urls);
    let _w_outputs_1 = [];
    function createUrlByCharacteristic(_w_characteristicFormat, _w_tIdx, _w_pIdx, _w_tId, _w_pId, _w_emptyFirst) {
        let _w_newUrl = "";
        if (_w_emptyFirst && _w_pId == 1) {
            _w_pId = "";
        }
        for (let k = 1; k < _w_characteristicFormat.length; ++k) {
            if (k == _w_tIdx) {
                _w_newUrl = _w_newUrl.concat(_w_tId);
            } else if (k == _w_pIdx) {
                _w_newUrl = _w_newUrl.concat(_w_pId);
            } else if (k == _w_pIdx - 1 && _w_pId == "" && _w_characteristicFormat[k].length > 0 && (_w_characteristicFormat[k].substr(-1) == "_" || _w_characteristicFormat[k].substr(-1) == "_")) {
                _w_newUrl.concat(_w_characteristicFormat[k].slice(0, -1));
            } else {
                _w_newUrl = _w_newUrl.concat(_w_characteristicFormat[k]);
            }
        }
        return _w_newUrl;
    }
    for (let i = 0; i < _w_characteristicArray.length; ++i) {
        let _w_maxIdx = _w_characteristicArray.length - 1;
        let _w_doPush = function() {
            _w_outputs_1.push(createUrlByCharacteristic(_w_characteristicFormat, _w_tIdx, _w_pIdx, _w_characteristicArray[i][0], _w_characteristicArray[i][1], _w_emptyFirst));
        };
        if (_w_characteristicArray.length == 1) {
            _w_doPush();
        } else if (i == 0) {
            item.serial;
            if (_w_characteristicArray[i][0] != _w_characteristicArray[i + 1][0]) {
                _w_doPush();
            }
        } else if (i == _w_maxIdx) {
            if (_w_characteristicArray[i - 1][0] != _w_characteristicArray[i][0]) {
                _w_doPush();
            }
        } else if (_w_characteristicArray[i - 1][0] != _w_characteristicArray[i][0] && _w_characteristicArray[i][0] != _w_characteristicArray[i + 1][0]) {
            _w_doPush();
        }
        if (i == _w_maxIdx) {
            continue;
        }
        if (_w_characteristicArray[i][0] == _w_characteristicArray[i + 1][0] && _w_characteristicArray[i + 1][1] - _w_characteristicArray[i][1] > 1) {
            for (let j = _w_characteristicArray[i][1] + 1; j < _w_characteristicArray[i + 1][1]; ++j) {
                let _w_newUrl = createUrlByCharacteristic(_w_characteristicFormat, _w_tIdx, _w_pIdx, _w_characteristicArray[i][0], j);
                _w_outputs_0.push(_w_newUrl);
            }
        }
    }
    console.log("old urls length: " + _w_urls.length + ", new Urls length: " + _w_outputs_0.length + ", single Urls length: " + _w_outputs_1.length);
    return [ Array.from(new Set(_w_outputs_0)), Array.from(new Set(_w_outputs_1)) ];
}

