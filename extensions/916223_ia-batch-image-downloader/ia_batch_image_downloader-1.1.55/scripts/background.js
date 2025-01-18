/**
 * ImageAssistant
 * Project Home: http://www.pullywood.com/ImageAssistant/
 * Author: 睡虫子(Joey)
 * Copyright (C) 2013-2020 普利坞(Pullywood.com)
**/
"use strict";

window._o_acceptLanguages = [ "zh_CN", "zh", "en_US", "en" ];

window._o_defaultRegexpUrlRule = "";

window._o_regexpUrlRules = [];

window._o_tabs = {};

window._o_tabIdMapper = {};

window._o_extract_serial_id = 1;

window._o_background_serial_id = 1e11;

window._o_ajax_request_task_executor = _o_createTaskExecutePool(4);

window._o_ajaxPool = _o_createBatchAjaxPool(1);

window._o_ajaxPool.ajaxGet(_o_remoteRuleURL, null, null, (function(data) {
    localStorage["_pullywood_RegexpUrlRule"] = data;
    _o_loadRegexpUrlRules();
}), null, null);

window._o_ajaxPool.ajaxGet("/defaultRegexpUrlRule.properties", null, null, (function(data) {
    window._o_defaultRegexpUrlRule = data;
    _o_loadRegexpUrlRules();
}), null, null);

chrome.i18n.getAcceptLanguages((function(data) {
    window._o_acceptLanguages = data;
}));

chrome.runtime.onInstalled.addListener((function(details) {
    if (details.reason == "install") {
        chrome.tabs.create({
            url: _o_resourceListURL
        });
    } else if (details.reason == "update") {}
}));

function _o_getAcceptLanguages() {
    return window._o_acceptLanguages;
}

function _o_resetTabIdMapper(_o_tabId) {
    if (typeof _o_tabId == "undefined") console.trace("tabId is undefined.");
    window._o_tabIdMapper[_o_tabId] = {
        tabId: _o_tabId
    };
    window._o_tabIdMapper[_o_tabId]._w_imageMap = [];
    window._o_tabIdMapper[_o_tabId]._w_refererMap = {};
    window._o_tabIdMapper[_o_tabId]._w_redirectMap = {};
    window._o_tabIdMapper[_o_tabId]._w_pageInfoMap = {};
    window._o_tabIdMapper[_o_tabId].extractorHash = _o_randomHex(32);
    window._o_tabIdMapper[_o_tabId].url = window._o_tabs[_o_tabId] ? window._o_tabs[_o_tabId].url : "";
    let _o_moment = moment();
    window._o_tabIdMapper[_o_tabId].timeStamp = _o_moment;
    window._o_tabIdMapper[_o_tabId].timeStamp.YYYYMMDD = _o_moment.format("YYYY-MM-DD");
    window._o_tabIdMapper[_o_tabId].timeStamp.HHmmss = _o_moment.format("HH-mm-ss");
}

function _o_initTabIdMapper(_o_tabId) {
    window._o_tabs[_o_tabId] && !window._o_tabIdMapper[_o_tabId] && _o_resetTabIdMapper(_o_tabId);
    return window._o_tabIdMapper[_o_tabId];
}

function _o_registerSecondHashForTab(_o_tabId, _w_extractHash) {
    let _w_mapedTab = window._o_tabIdMapper[_o_tabId];
    if (_w_mapedTab) {
        _w_mapedTab["extractorHash_2"] = _w_extractHash;
        let _o_arrayObj = _o_getTabImageMap(_o_tabId);
        let _o_imageMap = {};
        _o_arrayObj.forEach(item => _o_imageMap[item] = _o_arrayObj[item]);
        _o_tuiTiQuDeTupianNa(_o_imageMap, _w_extractHash);
    }
}

function _o_getTabImageMap(_o_tabId) {
    let _o_imageMap = null;
    if (_o_initTabIdMapper(_o_tabId)) {
        _o_imageMap = window._o_tabIdMapper[_o_tabId]._w_imageMap;
    }
    return _o_imageMap;
}

function _o_getTabByExtractorHash(_w_extractorHash) {
    for (let _o_tabId in window._o_tabIdMapper) {
        if (window._o_tabIdMapper[_o_tabId].extractorHash == _w_extractorHash) {
            return window._o_tabIdMapper[_o_tabId];
        }
    }
    return null;
}

function _o_getImageMapByExtractorHash(_w_extractorHash) {
    let _o_imageMap = null;
    let _o_tab = _o_getTabByExtractorHash(_w_extractorHash);
    if (_o_tab) _o_imageMap = _o_tab._w_imageMap;
    return _o_imageMap;
}

function _o_getTabPageInfoMap(_o_tabId) {
    let _o_pageInfoMap = null;
    if (_o_initTabIdMapper(_o_tabId)) {
        _o_pageInfoMap = window._o_tabIdMapper[_o_tabId]._w_pageInfoMap;
    }
    return _o_pageInfoMap;
}

function _o_getPageInfoMapByExtractorHash(_w_extractorHash) {
    let _o_pageInfoMap = null;
    let _o_tab = _o_getTabByExtractorHash(_w_extractorHash);
    if (_o_tab) _o_pageInfoMap = _o_tab._w_pageInfoMap;
    return _o_pageInfoMap;
}

function _o_getTabRefererMap(_o_tabId) {
    let _o_refererMapper = null;
    if (_o_initTabIdMapper(_o_tabId)) {
        _o_refererMapper = window._o_tabIdMapper[_o_tabId]._w_refererMap;
    }
    return _o_refererMapper;
}

function _o_getTabRedirectMap(_o_tabId) {
    let _o_redirectMapper = null;
    if (_o_initTabIdMapper(_o_tabId)) {
        _o_redirectMapper = window._o_tabIdMapper[_o_tabId]._w_redirectMap;
    }
    return _o_redirectMapper;
}

function _o_getTabExtractorHash(_o_tabId) {
    let _o_extractorHash = null;
    if (_o_initTabIdMapper(_o_tabId)) {
        _o_extractorHash = window._o_tabIdMapper[_o_tabId].extractorHash;
    }
    return _o_extractorHash;
}

function _o_getTabExtractorHash_2(_o_tabId) {
    let _o_extractorHash = null;
    if (_o_initTabIdMapper(_o_tabId)) {
        _o_extractorHash = window._o_tabIdMapper[_o_tabId].extractorHash_2;
    }
    return _o_extractorHash;
}

function _o_getTabIdWithExtractorHash(_w_extractorHash) {
    let _o_tabId = null;
    let _o_tab = _o_getTabByExtractorHash(_w_extractorHash);
    if (_o_tab) _o_tabId = _o_tab.tabId;
    return _o_tabId;
}

window._o_request_monitor = function() {
    let _o_request_sts = {};
    let _o_request_sts_options = {
        urls: [ "<all_urls>" ]
    };
    let _o_request_update_tabIds = {};
    let _o_request_sts_handle = function(details) {
        if (!/^https?:\/\/.*$/gi.test(details.url)) return;
        let _w_inner_log = function(error, statusCode) {
            let _w_timeCost = _o_request_sts[details.requestId] ? parseInt(details.timeStamp - _o_request_sts[details.requestId].timeStamp) : -1;
            let _o_target_item = _o_request_update_tabIds[details.tabId];
            if (_o_target_item) {
                let _w_extractorTabId = _o_target_item["extractorTabId"];
                let _w_taskTabId = _o_target_item["tabId"];
                let _w_extractorTabReferMap = _o_getTabRefererMap(_w_extractorTabId);
                let _w_taskTabReferMap = _o_getTabRefererMap(_w_taskTabId);
                let _w_referer = _w_extractorTabReferMap && _w_extractorTabReferMap[details.url] ? _w_extractorTabReferMap[details.url] : _w_taskTabReferMap && _w_taskTabReferMap[details.url] ? _w_taskTabReferMap[details.url] : null;
                if (typeof _o_target_item["lastRequest"] != "undefined") {
                    _o_target_item["lastRequest"] = (new Date).getTime();
                }
                if (_o_target_item["requestLog"]) {
                    _o_target_item["requestLog"][details.url] = {
                        referer: _w_referer,
                        error: error,
                        timeCost: _w_timeCost
                    };
                }
            }
            delete _o_request_sts[details.requestId];
        };
        if (details.error) {
            _w_inner_log(details.error, null);
        } else if (details.statusCode) {
            _w_inner_log(null, details.statusCode);
        } else {
            _o_request_sts[details.requestId] = {
                requestId: details.requestId,
                timeStamp: details.timeStamp,
                tabId: details.tabId,
                url: details.url,
                type: details.type
            };
        }
    };
    chrome.webRequest.onBeforeRequest.addListener(_o_request_sts_handle, _o_request_sts_options, []);
    chrome.webRequest.onCompleted.addListener(_o_request_sts_handle, _o_request_sts_options);
    chrome.webRequest.onErrorOccurred.addListener(_o_request_sts_handle, _o_request_sts_options);
    let _w_requestNum = function(tabIds) {
        if (Number.isInteger(tabIds)) {
            tabIds = [ tabIds ];
        }
        if (Array.isArray(tabIds)) {
            return Object.values(_o_request_sts).map((function(item) {
                return item.tabId;
            })).filter((function(item) {
                return tabIds.indexOf(item) >= 0;
            })).length;
        } else {
            Object.keys(_o_request_sts).length;
        }
    };
    let _w_unRegisterTab = function(tabId) {
        delete _o_request_update_tabIds[tabId];
    };
    let _o_pushImageEventHandle = function(tabId) {
        let _o_target_item = _o_request_update_tabIds[tabId];
        if (_o_target_item) {
            if (typeof _o_target_item["lastPushImage"] != "undefined") {
                _o_target_item["lastPushImage"] = (new Date).getTime();
            }
        }
    };
    let _o_pushFullScrollEventHandle = function(tabId) {
        let _o_target_item = _o_request_update_tabIds[tabId];
        if (_o_target_item) {
            if (typeof _o_target_item["lastFullScroll"] != "undefined") {
                _o_target_item["lastFullScroll"] = (new Date).getTime();
            }
        }
    };
    let _o_notifyRemoveTab = function(tabId) {
        _w_unRegisterTab(tabId);
        Object.keys(_o_request_sts).forEach((function(requestId) {
            if (_o_request_sts[requestId].tabId == tabId) {
                delete _o_request_sts[requestId];
            }
        }));
    };
    return {
        requestNum: _w_requestNum,
        registerTab: function(tabId, item) {
            item["requestNum"] = function(tabIds) {
                if (typeof tabIds == "undefined") {
                    return _w_requestNum([ tabId ]);
                } else {
                    return _w_requestNum(tabIds);
                }
            };
            _o_request_update_tabIds[tabId] = item;
        },
        unRegisterTab: _w_unRegisterTab,
        notifyPushImage: _o_pushImageEventHandle,
        notifyFullScroll: _o_pushFullScrollEventHandle,
        notifyRemoveTab: _o_notifyRemoveTab
    };
}();

function _o_onCreatedListener(tab) {
    if (chrome.runtime.lastError) return;
    window._o_tabs[tab.id] = tab;
    _o_initTabIdMapper(tab.id);
}

function _o_onUpdatedListener(_o_tabId, changeInfo, tab) {
    window._o_tabs[tab.id] = tab;
    _o_initTabIdMapper(tab.id);
    if (changeInfo.url) {
        let _w_newUrl = _o_extractUrlWithoutHash(changeInfo.url);
        if (_w_newUrl != window._o_tabIdMapper[_o_tabId].url) {
            _o_resetTabIdMapper(_o_tabId);
            window._o_tabIdMapper[_o_tabId].url = _w_newUrl;
        }
    }
}

function _o_onRemovedListener(_o_tabId) {
    _o_request_monitor.notifyRemoveTab(_o_tabId);
    delete window._o_tabs[_o_tabId];
    delete window._o_tabIdMapper[_o_tabId];
}

chrome.tabs.onCreated.addListener(_o_onCreatedListener);

chrome.tabs.onUpdated.addListener(_o_onUpdatedListener);

chrome.tabs.onRemoved.addListener(_o_onRemovedListener);

(function() {
    function _o_updateTabsInfo() {
        chrome.tabs.query({}, (function(results) {
            results.forEach((function(tab) {
                if (!window._o_tabs[tab.id]) {
                    window._o_tabs[tab.id] = tab;
                    _o_initTabIdMapper(tab.id);
                }
            }));
        }));
    }
    function _o_clearSpamTabInfo() {
        let _w_tabIds = Object.keys(window._o_tabs);
        let _w_otherIds = Object.keys(window._o_tabIdMapper);
        for (let idx in _w_otherIds) if (_w_tabIds.indexOf(_w_otherIds[idx]) < 0) _w_tabIds.push(_w_otherIds[idx]);
        _w_tabIds.forEach((function(tabId) {
            tabId = parseInt(tabId);
            chrome.tabs.get(tabId, (function(tab) {
                if (chrome.runtime.lastError) {
                    _o_onRemovedListener(tabId);
                }
            }));
        }));
    }
    setInterval(_o_updateTabsInfo, 4e3);
    setInterval(_o_clearSpamTabInfo, 4e3);
    _o_initHeadListener();
    _o_loadRegexpUrlRules();
})();

function _o_initHeadListener() {
    let _o_version_matcher = /Chrome\/([0-9]+)/.exec(navigator.userAgent);
    let _o_browserMainVersion = _o_version_matcher ? parseInt(_o_version_matcher[1]) : -1;
    chrome.webRequest.onHeadersReceived.addListener((function(details) {
        if (details.tabId < 0) {
            return;
        }
        let _w_headers = details.responseHeaders;
        for (let i = 0; i < _w_headers.length; ++i) {
            _w_headers[_w_headers[i].name] = _w_headers[i].value;
        }
        let _w_contentType = _w_headers["Content-Type"];
        if (_w_contentType) _w_contentType = _w_contentType.toLowerCase();
        if (details.type && details.type == "image" || _w_contentType && _w_contentType.startsWith("image/")) {
            let _w_item = {};
            let _w_currentTab = window._o_tabs[details.tabId];
            if ("undefined" == typeof curentTab) {
                chrome.tabs.get(details.tabId, _o_onCreatedListener);
            } else {
                let _w_pageURL = new URL(_w_currentTab.url);
                _w_item.pageTitle = _w_currentTab.title;
                _w_item.pageURL = _w_pageURL.origin + _w_pageURL.pathname + _w_pageURL.search;
                _w_item.pageDomain = _w_pageURL.hostname;
                _w_item.pageHash = _w_pageURL.hash;
            }
            let _w_itemURL = new URL(details.url);
            _w_item.url = _w_itemURL.origin + _w_itemURL.pathname + _w_itemURL.search;
            _w_item.domain = _w_itemURL.hostname;
            _w_item.contentType = details.type;
            _w_item.size = null;
            _w_item.resolution = null;
            _w_item.filename = null;
            let _w_lenStr = null;
            if (_w_headers["Content-Length"]) {
                if (_w_headers["Content-Length"] >= 1024 * 1024 * 1024) {
                    _w_lenStr = (_w_headers["Content-Length"] / 1024 / 1024 / 1024).toFixed(2) + "GB";
                } else if (_w_headers["Content-Length"] >= 1024 * 1024) {
                    _w_lenStr = (_w_headers["Content-Length"] / 1024 / 1024).toFixed(2) + "MB";
                } else {
                    _w_lenStr = (_w_headers["Content-Length"] / 1024).toFixed(2) + "KB";
                }
                _w_item.size = _w_lenStr;
            }
            _w_item.filename = _w_itemURL.pathname.substring(_w_itemURL.pathname.lastIndexOf("/") + 1);
            let _w_extractedImage = {};
            let _o_refererMap = _o_getTabRefererMap(details.tabId);
            let _o_request_referer;
            let _w_redirectMap = _o_getTabRedirectMap(details.tabId);
            let _w_extUrl = details.url;
            if (_w_redirectMap) {
                while (_w_redirectMap[_w_extUrl] && _w_extUrl != _w_redirectMap[_w_extUrl]) {
                    _w_extUrl = _w_redirectMap[_w_extUrl];
                    if (_w_extUrl == details.url) {
                        break;
                    }
                }
            }
            _o_refererMap && (_o_request_referer = _o_refererMap[_w_extUrl]);
            _w_extractedImage[_w_extUrl] = {
                title: "",
                alt: "",
                serial: _o_background_serial_id++,
                referer: _o_request_referer
            };
            let _w_tabImageMap = _o_getTabImageMap(details.tabId);
            if (_w_tabImageMap && !_w_tabImageMap[_w_extUrl]) {
                let _o_tabExtractorHash = _o_getTabExtractorHash(details.tabId);
                _o_tuiTiQuDeTupianNa(_w_extractedImage, _o_tabExtractorHash);
            }
        } else if (details.type && details.type == "media" || _w_contentType && _w_contentType.indexOf("video/") > -1 || _w_contentType && _w_contentType.indexOf("audio/") > -1) {}
    }), {
        urls: [ "<all_urls>" ]
    }, [ "blocking", "responseHeaders" ]);
    chrome.webRequest.onBeforeRedirect.addListener((function(details) {
        if (details.redirectUrl == details.url) return;
        if (!window._o_tabs[details.tabId]) {
            return;
        }
        let _w_tabId = details.tabId;
        let _w_tabUrl = window._o_tabs[_w_tabId].url;
        if (_o_isServiceSite(_w_tabUrl) || /^[a-z]+-extension:\/\//gi.test(_w_tabUrl)) {
            let _w_refererMap = _o_getTabRefererMap(_w_tabId);
            if (_w_refererMap && _w_refererMap[details.url] && !_w_refererMap[details.redirectUrl]) {
                _w_refererMap[details.redirectUrl] = _w_refererMap[details.url];
            }
        }
        let _w_redirectMap = _o_getTabRedirectMap(_w_tabId);
        if (_w_redirectMap) {
            let _w_originalUrl = details.url;
            let _w_shouldAddToRedirectMapper = true;
            while (_w_redirectMap[_w_originalUrl] && _w_originalUrl != _w_redirectMap[_w_originalUrl]) {
                _w_originalUrl = _w_redirectMap[_w_originalUrl];
                if (_w_originalUrl == details.redirectUrl) {
                    _w_shouldAddToRedirectMapper = false;
                    break;
                }
            }
            if (_w_shouldAddToRedirectMapper) _w_redirectMap[details.redirectUrl] = details.url;
        }
    }), {
        urls: [ "<all_urls>" ]
    }, [ "responseHeaders" ]);
    let _w_opt_extraInfoSpec_bf_send_headers = [ "blocking", "requestHeaders" ];
    if (_o_browserMainVersion >= 72) _w_opt_extraInfoSpec_bf_send_headers.push("extraHeaders");
    chrome.webRequest.onBeforeSendHeaders.addListener((function(details) {
        let _w_withReferer = false;
        let _w_withIAEtag = false;
        let _w_removeIdx = [];
        if (details.tabId == -1) {
            return _o_specialPageRefererConfig(details);
        }
        for (let i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === "Referer") {
                _w_withReferer = true;
                _w_removeIdx.push(i);
                let _w_refererMap = _o_getTabRefererMap(details.tabId);
                if (_w_refererMap && _w_refererMap[details.url]) {
                    details.requestHeaders[i].value = _w_refererMap[details.url];
                } else if (_w_refererMap) {
                    _w_refererMap[details.url] = details.requestHeaders[i].value;
                }
                let _w_referer = details.requestHeaders[i].value;
                if (_w_referer == _o_multiURLExtDefURL || _w_referer == _o_SSL_multiURLExtDefURL || _w_referer == null) {
                    _w_withIAEtag = true;
                }
            } else if (details.requestHeaders[i].name === "IA-Tag") {
                _w_removeIdx.push(i);
                _w_withIAEtag = true;
            }
        }
        if (_w_withIAEtag && _w_removeIdx.length > 0) {
            _w_removeIdx.reverse();
            for (let idx in _w_removeIdx) {
                details.requestHeaders.splice(_w_removeIdx[idx], 1);
            }
        }
        if (!_w_withReferer) {
            let _w_refererMap = _o_getTabRefererMap(details.tabId);
            if (_w_refererMap && _w_refererMap[details.url] && _w_refererMap[details.url] != _o_multiURLExtDefURL && _w_refererMap[details.url] != _o_SSL_multiURLExtDefURL) {
                details.requestHeaders.push({
                    name: "Referer",
                    value: _w_refererMap[details.url]
                });
            }
        }
        return {
            requestHeaders: details.requestHeaders
        };
    }), {
        urls: [ "<all_urls>" ]
    }, _w_opt_extraInfoSpec_bf_send_headers);
}

function _o_getPageTitle(_o_extractorHash, url) {
    let _o_title = "{origin.title}";
    let _w_pageInfoMap = _o_getPageInfoMapByExtractorHash(_o_extractorHash);
    if (_w_pageInfoMap) {
        url = _o_extractUrlWithoutHash(url);
        let _w_pageInfo = _w_pageInfoMap[url];
        if (_w_pageInfo && _w_pageInfo.title && _w_pageInfo.title.length > 0) {
            _o_title = _w_pageInfo.title;
        }
    }
    return _o_title;
}

function _o_getExtTimeStamp(_w_extractorHash) {
    let _o_momentTimeStamp = {
        YYYYMMDD: "YYYY-MM-DD",
        HHmmss: "HH-mm-ss"
    };
    let _o_tab = _o_getTabByExtractorHash(_w_extractorHash);
    if (_o_tab) _o_momentTimeStamp = _o_tab.timeStamp;
    return _o_momentTimeStamp;
}

function _o_specialPageRefererConfig(details) {
    let _w_withReferer = false;
    let _w_withUserAgent = false;
    let _w_headerRefererIdx = -1;
    let _w_newReferer = undefined;
    for (let i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === "Referer") {
            _w_withReferer = true;
            _w_headerRefererIdx = i;
        }
    }
    Object.values(_o_tabIdMapper).forEach((function(tab) {
        if (tab._w_refererMap && tab._w_refererMap[details.url] && tab._w_refererMap[details.url] != _o_multiURLExtDefURL && tab._w_refererMap[details.url] != _o_SSL_multiURLExtDefURL) {
            _w_newReferer = tab._w_refererMap[details.url];
        }
    }));
    if (_w_newReferer && _w_withReferer) {
        details.requestHeaders[_w_headerRefererIdx].value = _w_newReferer;
    } else if (_w_newReferer) {
        details.requestHeaders.push({
            name: "Referer",
            value: _w_newReferer
        });
    }
    return {
        requestHeaders: details.requestHeaders
    };
}

_o_randomFingerChar();

chrome.runtime.onMessage.addListener((function(message, sender, callback) {
    message && message.type == "_o_guanbiTab" && chrome.tabs.remove(sender.tab.id);
    message && message.type == "_o_extractScriptInject" && _o_extractScriptInject(message._o_tabId, message._o_fetchLevel);
    message && message.type == "_o_zhuruJSYongHash" && _o_zhuruJSYongHash(message._o_tabId, message._o_fetchLevel, message._o_extHash);
    message && message.type == "_o_pushExtractedImage" && _o_tuiTiQuDeTupianNa(message.images, message.extractorHash);
    message && message.type == "_o_notifyGunDong" && window._o_request_monitor && window._o_request_monitor.notifyFullScroll(sender.tab.id);
    message && message.type == "_o_refererShujuUpdated" && _o_updateRefererData(message._w_refererMap, sender.tab.id, true);
    message && message.type == "_o_gengxiYeMXinxi" && _o_gengxiYeMXinxiWithHash(message.pageInfo, message.extractorHash);
    message && message.type == "_o_qingQiuWeiYiID" && callback(_o_generateExtractId());
    message && message.type == "_o_chuli3rdXinxi" && _o_chuli3rdXinxi(message.url, message.action, sender.tab.id, message.createNewTab);
    message && message.type == "_o_extractImageFromTab" && _o_extractImageFromTab(sender.tab.id, message.fetchLevel);
    message && message.type == "_o_houtaiQingqiu" && window._o_ajax_request_task_executor.addTask((function(beginFun, endFun) {
        _o_ajaxRequestMessageBack(message.requestParam, message.requestHash, sender.tab.id, beginFun, endFun);
    }));
    message && message.type == "_o_biaojiMuLu" && (localStorage["folderMark"] = message.folderMark);
    message && message.type == "_o_huoquTupianOptions" && callback(_o_huoquTupianOptions());
}));

function _o_selectExtractor(_o_extractorHash, callback) {
    chrome.runtime.sendMessage(_o_getExtensionId(), {
        type: "_o_selectExtractor",
        extractorHash: _o_extractorHash
    }, callback);
}

function _o_multiUrlExtract(_o_extTab, _o_closePage) {
    !_o_closePage && (_o_closePage = false);
    let _o_doMultExt = function(_o_tab) {
        _o_executeFunWhenTabNotPending(_o_tab.id, (function(observedTab) {
            let _w_originalUrl = observedTab.url;
            let _w_msgChannel = _o_randomChar(32);
            let _w_imageExtractorUrl = "multiUrlExtractor.html?msgChannel=" + _w_msgChannel;
            if (_o_isAccessibleUrl(_w_originalUrl)) {
                _w_imageExtractorUrl += "&originalUrl=" + encodeURIComponent(_w_originalUrl);
            }
            chrome.tabs.create({
                url: _w_imageExtractorUrl,
                active: true
            }, (function(newTab) {
                if (_o_isAccessibleUrl(observedTab.url)) {
                    _o_charactisticExtScriptInject(observedTab.id, newTab.id, _w_msgChannel, _o_closePage);
                }
            }));
        }));
    };
    if (_o_extTab) {
        _o_doMultExt(_o_extTab);
    } else {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (function(tabArray) {
            if (!tabArray || tabArray.length === 0) return;
            let _w_selectedTab = tabArray[0];
            _o_doMultExt(_w_selectedTab);
        }));
    }
}

function _o_extractImageFromSelectedPage(_o_fetchLevel) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (function(tabArray) {
        if (!tabArray || tabArray.length == 0) return;
        let _w_selectedTab = tabArray[0];
        _o_extractImageFromTab(_w_selectedTab.id, _o_fetchLevel);
    }));
}

function _o_extractImageFromURL(url, _o_fetchLevel) {
    chrome.tabs.create({
        url: url,
        active: false
    }, (function(tab) {
        chrome.tabs.onUpdated.addListener((function updatedFun(tabId, changeInfo, updatedTab) {
            if (tabId == tab.id && changeInfo.url) {
                chrome.tabs.onUpdated.removeListener(updatedFun);
                _o_extractImageFromTab(tabId, _o_fetchLevel);
            }
        }));
    }));
}

function _o_multiExtractImageFromURL(url) {
    chrome.tabs.create({
        url: url,
        active: true
    }, (function(tab) {
        chrome.tabs.onUpdated.addListener((function updatedFun(tabId, changeInfo, updatedTab) {
            if (tabId == tab.id && changeInfo.url) {
                chrome.tabs.onUpdated.removeListener(updatedFun);
                _o_multiUrlExtract(tab, true);
            }
        }));
    }));
}

function _o_extractImageFromTab(_o_tabId, _o_fetchLevel) {
    _o_tiQuTupianaHaha(_o_tabId, _o_fetchLevel, true);
}

function _o_tiQuTupianaHaha(_o_tabId, _o_fetchLevel, _o_activeView) {
    chrome.tabs.get(_o_tabId, (function(tab) {
        if (_o_isAccessibleUrl(tab.url) || _o_isMultiExtUrl(tab.url)) {
            let _w_timer = setTimeout((function() {
                chrome.tabs.create({
                    index: tab.index + 1,
                    url: "imageExtractor.html?tabId=" + tab.id + "&fetchLevel=" + _o_fetchLevel,
                    active: _o_activeView ? true : false
                });
            }), 512);
            _o_selectExtractor(_o_getTabExtractorHash(tab.id), (function callback(data) {
                if (!chrome.runtime.lastError && data) {
                    clearTimeout(_w_timer);
                    chrome.tabs.update(data.tabId, {
                        active: true
                    }, (function(tab) {
                        chrome.windows.update(tab.windowId, {
                            focused: true,
                            drawAttention: false
                        });
                    }));
                }
            }));
        } else {
            chrome.notifications.create("", {
                type: "basic",
                iconUrl: "./images/icon512.png",
                title: _MSG_("bg_warning_ntfy_title"),
                message: _MSG_("bg_warning_ntfy_msg")
            });
        }
    }));
}

function _o_extractScriptInject(_o_tabId, _o_fetchLevel) {
    let _o_extHash = _o_getTabExtractorHash(_o_tabId) + _o_randomFingerChar();
    _o_zhuruJSYongHash(_o_tabId, _o_fetchLevel, _o_extHash);
}

function _o_zhuruJSYongHash(_o_tabId, _o_fetchLevel, _o_extHash) {
    _o_executeScripts(_o_tabId, [ {
        file: "libs/jquery/3.4.1/jquery-3.4.1.min.js",
        runAt: "document_end",
        allFrames: true
    }, {
        file: "libs/DOMPurify/2.0.8/purify.min.js",
        runAt: "document_end",
        allFrames: true
    }, {
        file: "scripts/function.js",
        runAt: "document_end",
        allFrames: true
    }, {
        file: "scripts/mime.js",
        runAt: "document_end",
        allFrames: true
    }, {
        file: "scripts/script.js",
        runAt: "document_end",
        allFrames: true
    }, {
        code: "_o_extractImage(" + _o_fetchLevel + ', "' + _o_extHash + '");',
        runAt: "document_end",
        allFrames: true
    } ]);
}

function _o_charactisticExtScriptInject(_o_pageTabId, _o_multiExtTabId, _o_msgChannel, _o_closePage) {
    _o_executeScripts(_o_pageTabId, [ {
        file: "libs/jquery/3.4.1/jquery-3.4.1.min.js",
        runAt: "document_end",
        allFrames: false
    }, {
        file: "scripts/function.js",
        runAt: "document_end",
        allFrames: false
    }, {
        file: "scripts/mime.js",
        runAt: "document_end",
        allFrames: false
    }, {
        file: "scripts/characteristicUrlExtract.js",
        runAt: "document_end",
        allFrames: false
    }, {
        code: '_o_characteristicExtract(_o_spliterSplit, "' + _o_msgChannel + '", ' + _o_closePage + ");",
        runAt: "document_end",
        allFrames: false
    } ]);
}

function _o_chuli3rdXinxi(_w_url, _w_action, _w_originalTabId, _w_createNewTab) {
    let _w_execFun = function(execTab) {
        if (!_w_action || _w_action.trim() == "") return;
        chrome.tabs.onUpdated.addListener((function updatedFun(tabId, changeInfo) {
            if (tabId == execTab.id && changeInfo.url) {
                chrome.tabs.onUpdated.removeListener(updatedFun);
                _o_executeScripts(tabId, [ {
                    file: "libs/jquery/3.4.1/jquery-3.4.1.min.js",
                    runAt: "document_end",
                    allFrames: true
                }, {
                    file: "scripts/function.js",
                    runAt: "document_start",
                    allFrames: true
                }, {
                    file: "scripts/scriptForthirdPartPage.js",
                    runAt: "document_start",
                    allFrames: true
                }, {
                    code: _w_action + "();",
                    runAt: "document_start",
                    allFrames: true
                } ]);
            }
        }));
    };
    if (_w_createNewTab) {
        chrome.tabs.create({
            url: _w_url,
            active: true
        }, _w_execFun);
    } else {
        chrome.tabs.update(_w_originalTabId, {
            url: _w_url,
            active: true
        }, _w_execFun);
    }
}

window._o_regexpUrlMatchThrough = true;

function _o_regexpUrlMatchRule(url) {
    let _w_rules = [];
    for (let idx in window._o_regexpUrlRules) {
        let _w_urlRegexp = window._o_regexpUrlRules[idx]["urlRegexp"];
        if (_w_urlRegexp.test(url)) {
            _w_rules.push(window._o_regexpUrlRules[idx]["urlRuleStr"]);
            if (!window._o_regexpUrlMatchThrough) break;
        }
    }
    return _w_rules;
}

function _o_regexpUrlReplace(url, deepth) {
    let _w_urls = {};
    if (!Number.isInteger(deepth)) {
        deepth = 4;
    } else if (deepth <= 0) {
        return Object.keys(_w_urls);
    } else {
        deepth--;
    }
    for (let idx in window._o_regexpUrlRules) {
        let _w_urlRegexp = window._o_regexpUrlRules[idx]["urlRegexp"];
        let _w_urlReplace = window._o_regexpUrlRules[idx]["urlReplace"];
        if (_w_urlRegexp.test(url)) {
            let _w_replaced_url = url.replace(_w_urlRegexp, _w_urlReplace);
            if (_w_replaced_url != url) {
                _w_urls[_w_replaced_url] = true;
                let _w_subReplaceResult = _o_regexpUrlReplace(_w_replaced_url, deepth);
                _w_subReplaceResult.forEach((function(result_url) {
                    _w_urls[result_url] = true;
                }));
                if (!window._o_regexpUrlMatchThrough) break;
            }
        }
    }
    return Object.keys(_w_urls);
}

function _o_gengxiYeMXinxiWithHash(_o_pageInfo, _o_extractorHash) {
    let _w_tabId = _o_getTabIdWithExtractorHash(_o_extractorHash);
    let _o_extractorHash_2 = _o_getTabExtractorHash_2(_w_tabId);
    if (_o_extractorHash_2) {
        _o_gengxiYeMXinxi(_o_pageInfo, _o_getTabIdWithExtractorHash(_o_extractorHash_2));
    }
    _o_gengxiYeMXinxi(_o_pageInfo, _o_getTabIdWithExtractorHash(_o_extractorHash));
}

function _o_gengxiYeMXinxi(_o_pageInfo, _o_tabId) {
    if (!_o_tabId) {
        return;
    }
    let _w_tabPageInfoMap = _o_getTabPageInfoMap(_o_tabId);
    let _w_pageUrl = _o_extractUrlWithoutHash(_o_pageInfo["url"]);
    _o_pageInfo["url"] = _w_pageUrl;
    _w_tabPageInfoMap[_w_pageUrl] = _o_pageInfo;
}

function _o_tuiTiQuDeTupianNa(_o_imageMap, _o_extractorHash) {
    let _w_tabId = _o_getTabIdWithExtractorHash(_o_extractorHash);
    let _o_extractorHash_2 = _o_getTabExtractorHash_2(_w_tabId);
    if (_o_extractorHash_2) {
        _o_pushExtractedImage(_o_imageMap, _o_getTabIdWithExtractorHash(_o_extractorHash_2));
    }
    _o_pushExtractedImage(_o_imageMap, _o_getTabIdWithExtractorHash(_o_extractorHash));
}

function _o_pushExtractedImage(_o_imageMap, _o_tabId) {
    if (!_o_tabId) {
        return;
    }
    if (window._o_request_monitor) {
        window._o_request_monitor.notifyPushImage(_o_tabId);
    }
    let _w_tabImageMap = _o_getTabImageMap(_o_tabId);
    let _w_tabIsServiceSite = _o_isServiceSite(window._o_tabs[_o_tabId].url);
    let _w_saveExtItem = function(item, _w_newImageItem, _w_updateItemMap) {
        if (_o_isExcludeURL(item)) {} else if (!_w_tabImageMap[item]) {
            _w_tabImageMap[item] = _w_newImageItem;
            _w_tabImageMap.push(item);
        } else {
            let _w_updateSets = 0;
            if (_w_newImageItem.title && _w_newImageItem.title.length > 0 && _w_tabImageMap[item].title != _w_newImageItem.title) {
                _w_tabImageMap[item].title = _w_newImageItem.title;
                _w_updateSets |= 1;
            }
            if (_w_newImageItem.alt && _w_newImageItem.alt.length > 0 && _w_tabImageMap[item].alt != _w_newImageItem.alt) {
                _w_tabImageMap[item].alt = _w_newImageItem.alt;
                _w_updateSets |= 2;
            }
            if (_w_newImageItem.referer && _w_newImageItem.referer.length > 0 && _w_tabImageMap[item].referer != _w_newImageItem.referer) {
                _w_tabImageMap[item].referer = _w_newImageItem.referer;
                _w_updateSets |= 4;
            }
            if (_w_newImageItem.serial && _w_newImageItem.serial < _w_tabImageMap[item].serial && _w_tabImageMap[item].serial != _w_newImageItem.serial) {
                _w_tabImageMap[item].serial = _w_newImageItem.serial;
                _w_updateSets |= 8;
            }
            if (_w_updateSets > 0) _w_updateItemMap[_w_tabImageMap.indexOf(item)] = _w_updateSets;
        }
    };
    let _w_updateItemMap = {};
    for (let item in _o_imageMap) {
        try {
            let _w_newImageItem = _o_imageMap[item];
            item = _o_formatURL(item);
            _w_newImageItem.referer = _o_formatURL(_w_newImageItem.referer);
            if (_w_tabIsServiceSite) item = _o_RestoreUrlFromServiceSite(item);
            try {
                let _w_replaced_result = _o_regexpUrlReplace(item);
                for (let ridx in _w_replaced_result) {
                    _w_saveExtItem(_w_replaced_result[ridx], _w_newImageItem, _w_updateItemMap);
                }
            } catch (exception) {}
            _w_saveExtItem(item, _w_newImageItem, _w_updateItemMap);
        } catch (exception) {}
    }
    chrome.runtime.sendMessage(_o_getExtensionId(), {
        type: "_o_updateTupian",
        extractorHash: _o_getTabExtractorHash(_o_tabId)
    });
    if (Object.keys(_w_updateItemMap).length > 0) {
        chrome.runtime.sendMessage(_o_getExtensionId(), {
            type: "_o_updateTupianItem",
            extractorHash: _o_getTabExtractorHash(_o_tabId),
            ItemIdxMap: _w_updateItemMap
        });
    }
}

function _o_updateRefererData(_o_refererMap, _o_tabId, _o_force) {
    let _w_refererMap = _o_getTabRefererMap(_o_tabId);
    for (let _o_url in _o_refererMap) {
        if (_o_url.indexOf(_o_multiURLExtDefURL) == 0 || _o_url.indexOf(_o_SSL_multiURLExtDefURL) == 0) {
            continue;
        }
        if (_w_refererMap && (!_w_refererMap[_o_url] || _w_refererMap[_o_url].length == 0 || _o_force)) {
            _w_refererMap[_o_url] = _o_refererMap[_o_url];
        }
    }
}

function _o_executeScripts(_o_tabId, _o_injectDetailsArray, _o_callback) {
    function createCallback(_o_tabId, injectDetails, innerCallback) {
        return function() {
            chrome.tabs.executeScript(_o_tabId, injectDetails, innerCallback);
        };
    }
    while (_o_injectDetailsArray.length > 0) {
        _o_callback = createCallback(_o_tabId, _o_injectDetailsArray.pop(), _o_callback);
    }
    if (_o_callback !== null) {
        _o_callback();
    }
}

function _o_injectStyles(_o_tabId, _o_injectDetailsArray, _o_callback) {
    function createCallback(_o_tabId, _o_injectDetails, _o_innerCallback) {
        return function() {
            chrome.tabs.insertCSS(_o_tabId, _o_injectDetails, _o_innerCallback);
        };
    }
    while (_o_injectDetailsArray.length > 0) {
        _o_callback = createCallback(_o_tabId, _o_injectDetailsArray.pop(), _o_callback);
    }
    if (_o_callback !== null) {
        _o_callback();
    }
}

chrome.commands.onCommand.addListener((function(command) {
    if (command == "command_extract_images") {
        _o_extractImageFromSelectedPage(0);
    } else if (command == "command_multi_extract_images") {
        _o_multiUrlExtract();
    }
}));

function _o_getFunnelSize() {
    let _o_minRect = {
        width: 10,
        height: 10
    };
    let _w_defaultFunnelWidth = Number.parseInt(_o_getConfigure("defaultFunnelWidth"));
    let _w_defaultFunnelHeight = Number.parseInt(_o_getConfigure("defaultFunnelHeight"));
    _w_defaultFunnelWidth && _w_defaultFunnelWidth > 0 && (_o_minRect.width = _w_defaultFunnelWidth);
    _w_defaultFunnelHeight && _w_defaultFunnelHeight > 0 && (_o_minRect.height = _w_defaultFunnelHeight);
    return _o_minRect;
}

function _o_setFunnelSize(width, height) {
    let _w_defaultFunnelWidth = Number.parseInt(width);
    let _w_defaultFunnelHeight = Number.parseInt(height);
    _w_defaultFunnelWidth && _o_setConfigure("defaultFunnelWidth", _w_defaultFunnelWidth);
    _w_defaultFunnelHeight && _o_setConfigure("defaultFunnelHeight", _w_defaultFunnelHeight);
}

function _o_huoquTupianOptions() {
    let _o_image_size;
    let _o_image_size_str = _o_getConfigure("image_size");
    _o_image_size_str ? _o_image_size = _o_sizeItemExt(_o_image_size_str.split(",")) : _o_image_size = _o_getDefaultImageSizeOptions();
    return _o_image_size;
}

function _o_getDefaultImageSizeOptions() {
    return _o_sizeItemExt(_o_image_size_default.slice(0));
}

function _o_resetImageSizeOptions() {
    let _o_image_size = _o_getDefaultImageSizeOptions();
    _o_setConfigure("image_size", _o_image_size);
}

function _o_addImageSizeOption(width, height) {
    let _w_imageWidth = Number.parseInt(width);
    let _w_imageHeight = Number.parseInt(height);
    let _w_newOptionStr = _w_imageWidth && _w_imageHeight ? _w_imageWidth + "x" + _w_imageHeight : null;
    let _o_image_size = _o_huoquTupianOptions();
    if (!_o_image_size[_w_newOptionStr]) {
        _o_image_size.push(_w_newOptionStr);
        _o_image_size = _o_sizeItemExt(_o_image_size);
        _o_image_size[_w_newOptionStr] = {
            width: _w_imageWidth,
            height: _w_imageHeight
        };
        _o_setConfigure("image_size", _o_image_size);
    }
}

function _o_removeImageSizeOption(width, height) {
    let _w_imageWidth = Number.parseInt(width);
    let _w_imageHeight = Number.parseInt(height);
    let _w_deleteOptionStr = _w_imageWidth && _w_imageHeight ? _w_imageWidth + "x" + _w_imageHeight : null;
    let _o_image_size = _o_huoquTupianOptions();
    if (_o_image_size[_w_deleteOptionStr]) {
        delete _o_image_size[_w_deleteOptionStr];
        let _w_idx = _o_image_size.indexOf(_w_deleteOptionStr);
        _w_idx > -1 && _o_image_size.splice(_w_idx, 1);
        _o_setConfigure("image_size", _o_image_size);
    }
}

function _o_getMenuStatus() {
    let _w_defaultStatus = 11;
    let _w_fullStatus = 15;
    let _w_status = Number.parseInt(_o_getConfigure("menu_status"));
    if (_w_status >= 0) {
        _w_defaultStatus = _w_fullStatus & _w_status;
    }
    return _w_defaultStatus;
}

function _o_setMenuStatus(status) {
    let _w_defaultStatus = 15;
    let _w_newStatus = Number.parseInt(status);
    if (_w_newStatus >= 0) {
        _w_newStatus = _w_newStatus & _w_defaultStatus;
        _o_setConfigure("menu_status", _w_newStatus);
    }
}

function _o_getClientFinger() {
    let _w_fingerKey = _o_getExtensionId();
    let _w_clientFinger = _o_getConfigure(_w_fingerKey);
    if (!_w_clientFinger || _w_clientFinger.length < 32) {
        _o_setConfigure(_w_fingerKey, _o_randomChar(32));
        _w_clientFinger = _o_getConfigure(_w_fingerKey);
    }
    return _w_clientFinger;
}

function _o_getDyLoadSize() {
    let _w_dyLoadSize = Number.parseInt(localStorage["dyLoadSize"]);
    if (!_w_dyLoadSize) {
        _w_dyLoadSize = 256;
        _o_setDyLoadSize(_w_dyLoadSize);
    }
    return _w_dyLoadSize;
}

function _o_setDyLoadSize(_o_dyLoadSize) {
    _o_dyLoadSize = Number.parseInt(_o_dyLoadSize);
    if (!_o_dyLoadSize) _o_dyLoadSize = 256; else if (_o_dyLoadSize < 64) _o_dyLoadSize = 64; else if (_o_dyLoadSize > 2048) _o_dyLoadSize = 2048;
    localStorage["dyLoadSize"] = _o_dyLoadSize;
}

function _o_getExtMaxLoad() {
    let _w_extMaxLoad = Number.parseInt(localStorage["extMaxLoad"]);
    if (!_w_extMaxLoad) {
        _w_extMaxLoad = 1024;
        _o_setExtMaxLoad(_w_extMaxLoad);
    }
    return _w_extMaxLoad;
}

function _o_setExtMaxLoad(_o_extMaxLoad) {
    _o_extMaxLoad = Number.parseInt(_o_extMaxLoad);
    if (!_o_extMaxLoad) _o_extMaxLoad = 1024; else if (_o_extMaxLoad < 1024) _o_extMaxLoad = 1024; else if (_o_extMaxLoad > 4096) _o_extMaxLoad = 4096;
    localStorage["extMaxLoad"] = _o_extMaxLoad;
}

function _o_getExtClickAct() {
    let _w_extClickAct = localStorage["extClickAct"];
    if (typeof _w_extClickAct == "undefined") {
        _w_extClickAct = false;
        _o_setExtClickAct(_w_extClickAct);
    }
    return _w_extClickAct;
}

function _o_setExtClickAct(_o_extClickAct) {
    if (_o_extClickAct) {
        _o_extClickAct = true;
    } else {
        _o_extClickAct = false;
    }
    localStorage["extClickAct"] = _o_extClickAct;
}

function _o_getRegexpUrlRule() {
    let _w_regexpUrlRule = localStorage["regexpUrlRule"];
    if (!_w_regexpUrlRule || _w_regexpUrlRule.trim().length == 0) {
        _w_regexpUrlRule = window._o_defaultRegexpUrlRule;
        setTimeout((function() {
            _o_setRegexpUrlRule(_w_regexpUrlRule);
        }), 2e3);
    }
    return _w_regexpUrlRule;
}

function _o_setRegexpUrlRule(_o_regexpUrlRule) {
    localStorage["regexpUrlRule"] = _o_regexpUrlRule;
    return _o_loadRegexpUrlRules();
}

function _o_loadRegexpUrlRules() {
    let _o_storedUrlRules = [];
    let _o_invalidRegexpRules = [];
    let _o_pullywood_RegexpUrlRule = localStorage["_pullywood_RegexpUrlRule"];
    if (!_o_pullywood_RegexpUrlRule) {
        _o_pullywood_RegexpUrlRule = "";
    }
    let _w_storedUrlRuleStrs = _o_getRegexpUrlRule().concat("\n\r").concat(window._o_defaultRegexpUrlRule).concat("\n\r").concat(_o_pullywood_RegexpUrlRule).split(/[\n\r]+/);
    window._o_urlRulesSet = _o_init_set();
    for (let idx in _w_storedUrlRuleStrs) {
        let _w_urlRuleStr = _w_storedUrlRuleStrs[idx].trim();
        if (_w_urlRuleStr.length == 0 || _w_urlRuleStr.startsWith("//") || _w_urlRuleStr.split("{#^_^#}").length != 2) {
            continue;
        } else {
            if (window._o_urlRulesSet.has(_w_urlRuleStr)) continue;
            window._o_urlRulesSet.add(_w_urlRuleStr);
            let _w_params = _w_urlRuleStr.split("{#^_^#}");
            let _w_urlRegexp = _w_params[0];
            let _w_urlReplace = _w_params[1];
            try {
                _w_urlRegexp = new RegExp(_w_urlRegexp);
                _o_storedUrlRules.push({
                    urlRegexp: _w_urlRegexp,
                    urlReplace: _w_urlReplace,
                    urlRuleStr: _w_urlRuleStr
                });
            } catch (exception) {
                _o_invalidRegexpRules.push(_w_urlRegexp);
            }
        }
    }
    window._o_regexpUrlRules = _o_storedUrlRules;
    return _o_invalidRegexpRules;
}

function _o_getConfigure(_o_keyStr) {
    if (!_o_keyStr || _o_keyStr.length == 0) return;
    let _w_valueStr = localStorage[_o_keyStr];
    chrome.storage.sync.get(_o_keyStr, (function(data) {
        let _w_valueStrSync = data[_o_keyStr];
        if ((!_w_valueStrSync || _w_valueStrSync.length == 0) && _w_valueStr && _w_valueStr.length > 0) {
            _o_setConfigure(_o_keyStr, _w_valueStr);
        } else if (_w_valueStrSync && _w_valueStr != _w_valueStrSync && _w_valueStrSync.length > 0) {
            localStorage[_o_keyStr] = _w_valueStrSync;
        }
    }));
    return _w_valueStr;
}

function _o_setConfigure(keyStr, valueStr) {
    valueStr = String(valueStr);
    if (!keyStr || keyStr.length == 0 || !valueStr || valueStr.length == 0) return;
    if (keyStr == _o_getExtensionId()) {
        chrome.storage.sync.get(keyStr, (function(data) {
            let _w_valueStrSync = data[keyStr];
            if ((!_w_valueStrSync || _w_valueStrSync.length != 32) && valueStr.length == 32) {
                let _w_storeObj = {};
                _w_storeObj[keyStr] = valueStr;
                chrome.storage.sync.set(_w_storeObj, (function() {}));
                localStorage[keyStr] = valueStr;
            } else {
                localStorage[keyStr] = _w_valueStrSync;
            }
        }));
        return;
    }
    let _w_storeObj = {};
    _w_storeObj[keyStr] = valueStr;
    chrome.storage.sync.set(_w_storeObj, (function() {}));
    localStorage[keyStr] = valueStr;
}

chrome.storage.onChanged.addListener((function(changes, namespace) {
    for (let key in changes) {
        let _w_storageChange = changes[key];
        localStorage[key] = _w_storageChange.newValue;
    }
}));

$.ajax({
    method: "get",
    url: "http://www.pullywood.com/ImageAssistant/version.json?" + Math.random(),
    contentType: "application/json",
    mimeType: "application/json"
}).done((function(data) {
    if (data && data.version) {
        localStorage["version"] = data.version;
    }
})).always((function() {
    if (localStorage["version"] && localStorage["version"] > chrome.runtime.getManifest().version) {
        chrome.browserAction.setBadgeText({
            text: "new"
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: "#ff3f3f"
        });
    }
}));

function _o_generateExtractId() {
    return window._o_extract_serial_id++;
}

function _o_ajaxRequestMessageBack(_o_requestParam, _o_requestHash, tabId, _o_beginFun, _o_endFun) {
    _o_beginFun();
    _o_requestParam["timeout"] = _o_ajax_request_timeout;
    _o_requestParam["headers"]["Accept"] = "*/*; charset=UTF-8";
    _o_requestParam["headers"]["Cache-Control"] = "no-cache, no-store, must-revalidate, max-age=0, post-check=0, pre-check=0";
    _o_requestParam["headers"]["Pragma"] = "no-cache";
    _o_requestParam["headers"]["Expires"] = "0";
    $.ajax(_o_requestParam).always((function(data, status, xhr) {
        _o_endFun();
        if (status == "success") {
            let _w_responseHeaders = {};
            if (xhr.getAllResponseHeaders) {
                let _w_headerLines = xhr.getAllResponseHeaders().split("\n");
                for (let idx in _w_headerLines) {
                    let _w_headerLine = _w_headerLines[idx];
                    let _w_splitIdx = _w_headerLine.indexOf(":");
                    let _w_headerName = _w_headerLine.slice(0, _w_splitIdx).trim();
                    let _w_headerValue = _w_headerLine.slice(_w_splitIdx + 1).trim();
                    if (_w_headerName.length == 0 || _w_headerValue.length == 0) {
                        continue;
                    } else if (!_w_responseHeaders[_w_headerName]) {
                        _w_responseHeaders[_w_headerName] = _w_headerValue;
                    } else if (typeof _w_responseHeaders[_w_headerName] == "string") {
                        let _w_headerValues = [];
                        _w_headerValues.push(_w_responseHeaders[_w_headerName]);
                        _w_headerValues.push(_w_headerValue);
                        _w_responseHeaders[_w_headerName] = _w_headerValues;
                    } else if (_w_responseHeaders[_w_headerName].push) {
                        _w_responseHeaders[_w_headerName].push(_w_headerValue);
                    }
                }
            }
            xhr["responseHeaders"] = _w_responseHeaders;
        }
        chrome.tabs.sendMessage(tabId, {
            type: "_o_backgroundAjaxResponse",
            data: data,
            status: status,
            xhr: xhr,
            requestHash: _o_requestHash
        });
    }));
}

chrome.contextMenus.create({
    title: _MSG_("opt_brand_text"),
    id: "_o_globalContextMenuRoot",
    contexts: [ "all" ]
}, (function() {
    chrome.contextMenus.create({
        title: _MSG_("global_pop_menu_ext_image_from_link"),
        id: "_o_extCurrentLink",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "link" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("global_pop_menu_multi_ext_image_from_link"),
        id: "_o_multiExtCurrentLink",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "link" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("ext_menu_item_find_other_size_on_google"),
        id: "_o_googleViewAllSize",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "image" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("ext_menu_item_find_similar_image_on_google"),
        id: "_o_googleViewAnalogous",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "image" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("ext_menu_item_find_related_info_on_google"),
        id: "_o_googleRelativeInfo",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "image" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("ext_menu_item_find_other_size_on_sogou"),
        id: "_o_sogouViewAllSize",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "image" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("ext_menu_item_find_related_info_on_sogou"),
        id: "_o_sogouRelativeInfo",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "image" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("global_pop_menu_generate_qrcode_for_image"),
        id: "_o_qrCodeImage",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "image" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("global_pop_menu_search_keyword_on_google"),
        id: "_o_googleImageSearch",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "selection" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("global_pop_menu_search_keyword_on_baidu"),
        id: "_o_baiduImageSearch",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "selection" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("global_pop_menu_generate_qrcode_for_selected_text"),
        id: "_o_qrCodeSelection",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "selection" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("pop_menu_item_ext_cur_page").trim(),
        id: "_o_extCurrentPage",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "page", "frame" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("pop_menu_item_prefetch_link").trim(),
        id: "_o_extPrefetchLink",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "page", "frame" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("pop_menu_item_analyze_prefetch").trim(),
        id: "_o_extAnalyzeLink",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "page", "frame" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("global_pop_menu_multi_ext_image_from_page").trim(),
        id: "_o_multiExtLink",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "page", "frame" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("global_pop_menu_generate_qrcode_for_current_page"),
        id: "_o_qrCodeLocation",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "page", "frame" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("global_pop_menu_generate_qrcode_for_link"),
        id: "_o_qrCodeLink",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "link" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("ext_menu_item_send_to_image_editor"),
        id: "_o_bianjiImage",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "image" ]
    }, (function() {}));
    chrome.contextMenus.create({
        title: _MSG_("ext_menu_item_send_to_image_editor_as_watermark"),
        id: "_o_sendAsWatermark",
        parentId: "_o_globalContextMenuRoot",
        contexts: [ "image" ]
    }, (function() {}));
}));

chrome.contextMenus.onClicked.addListener((function(info, tab) {
    let _w_message = null;
    if (info.menuItemId == "_o_bianjiImage") {
        _w_message = _o_bianjiImage(info.srcUrl, info.pageUrl, tab.id);
    } else if (info.menuItemId == "_o_sendAsWatermark") {
        _w_message = _o_sendAsWatermark(info.srcUrl, info.pageUrl, tab.id);
    } else if (info.menuItemId == "_o_googleViewAllSize") {
        _w_message = _o_googleViewAllSize(info.srcUrl);
    } else if (info.menuItemId == "_o_googleViewAnalogous") {
        _w_message = _o_googleViewAnalogous(info.srcUrl);
    } else if (info.menuItemId == "_o_googleRelativeInfo") {
        _w_message = _o_googleRelativeInfo(info.srcUrl);
    } else if (info.menuItemId == "_o_sogouViewAllSize") {
        _w_message = _o_sogouViewAllSize(info.srcUrl);
    } else if (info.menuItemId == "_o_sogouRelativeInfo") {
        _w_message = _o_sogouRelativeInfo(info.srcUrl);
    } else if (info.menuItemId == "_o_googleImageSearch") {
        _w_message = _o_googleImageSearchKeyword(info.selectionText);
    } else if (info.menuItemId == "_o_baiduImageSearch") {
        _w_message = _o_baiduImageSearchKeyword(info.selectionText);
    } else if (info.menuItemId == "_o_extCurrentLink") {
        _o_extractImageFromURL(info.linkUrl, 0);
    } else if (info.menuItemId == "_o_multiExtCurrentLink") {
        _o_multiExtractImageFromURL(info.linkUrl);
    } else if (info.menuItemId == "_o_extCurrentPage") {
        _o_extractImageFromTab(tab.id, 0);
    } else if (info.menuItemId == "_o_extPrefetchLink") {
        _o_extractImageFromTab(tab.id, 1);
    } else if (info.menuItemId == "_o_extAnalyzeLink") {
        _o_extractImageFromTab(tab.id, 3);
    } else if (info.menuItemId == "_o_multiExtLink") {
        _o_multiUrlExtract();
    } else if (info.menuItemId == "_o_qrCodeSelection") {
        _o_qrCodeTextAtTab(tab.id, info.selectionText);
    } else if (info.menuItemId == "_o_qrCodeImage") {
        _o_qrCodeTextAtTab(tab.id, info.srcUrl);
    } else if (info.menuItemId == "_o_qrCodeLink") {
        _o_qrCodeTextAtTab(tab.id, info.linkUrl);
    } else if (info.menuItemId == "_o_qrCodeLocation") {
        _o_qrCodeTextAtTab(tab.id, info.pageUrl);
    } else {
        return;
    }
    if (_w_message) {
        if (_o_isServiceSite(info.pageUrl)) _w_message.url = _o_RestoreUrlFromServiceSite(_w_message.url);
        _o_chuli3rdXinxi(_w_message.url, _w_message.action, tab.id, _w_message.createNewTab);
    }
}));

function _o_bianjiImage(_o_url, _o_referer, _o_tabId) {
    if (!_o_url) {
        return;
    } else if (!_o_url.startsWith("data:image") && _o_isServiceSite(_o_referer)) {
        let _w_refererMap = _o_getTabRefererMap(_o_tabId);
        if (_w_refererMap[_o_url]) {
            _o_referer = _w_refererMap[_o_url];
        }
    }
    chrome.tabs.create({
        url: "imageEditor.html",
        active: true
    }, (function(tab) {
        _o_executeFunWhenTabComplete(tab.id, (function(_o_observedTab) {
            chrome.tabs.sendMessage(_o_observedTab.id, {
                type: "_o_bianjiImage",
                _o_imageUrl: _o_url,
                _o_referer: _o_referer
            });
        }));
    }));
}

function _o_sendAsWatermark(_o_url, _o_referer, _o_tabId) {
    if (!_o_url.startsWith("data:image") && _o_isServiceSite(_o_referer)) {
        let _w_refererMap = _o_getTabRefererMap(_o_tabId);
        if (_w_refererMap[_o_url]) {
            _o_referer = _w_refererMap[_o_url];
        }
    }
    chrome.runtime.sendMessage(chrome.runtime.id, {
        type: "_o_shuiyin",
        _o_imageUrl: _o_url,
        _o_referer: _o_referer
    });
}

function _o_qrCodeTextAtTab(_o_tabId, _o_text) {
    if (!_o_tabId) return;
    chrome.tabs.get(_o_tabId, (function(tab) {
        let _w_url = new URL(tab.url);
        if (_o_isExtensionPage(_w_url.href)) {
            chrome.runtime.sendMessage(_o_getExtensionId(), {
                type: "_o_createQRCode",
                text: _o_text
            });
        } else if (_w_url.protocol == "http:" || _w_url.protocol == "https:") {
            _o_executeScripts(_o_tabId, [ {
                file: "libs/jquery/3.4.1/jquery-3.4.1.min.js",
                allFrames: false
            }, {
                file: "libs/qrcode/dist/qrcode.js",
                allFrames: false
            }, {
                file: "libs/bootstrap/3.4.1/js/bootstrap.min.js",
                allFrames: false
            }, {
                file: "scripts/function.js",
                allFrames: false
            }, {
                code: "_o_createQRCode(" + JSON.stringify(_o_text) + ", true);",
                allFrames: false
            } ]);
        } else {
            chrome.notifications.create("", {
                type: "basic",
                iconUrl: "./images/icon512.png",
                title: _MSG_("bg_warning_ntfy_title"),
                message: _MSG_("global_notify_qrcode_generate_limit")
            });
        }
    }));
}