/**
 * ImageAssistant
 * Project Home: http://www.pullywood.com/ImageAssistant/
 * Author: 睡虫子(Joey)
 * Copyright (C) 2013-2020 普利坞(Pullywood.com)
**/
"use strict";

window._o_tabId = parseInt(_o_getQueryString("tabId"));

window._o_fetchLevel = parseInt(_o_getQueryString("fetchLevel"));

window._o_image_size = _o_getBackground()._o_huoquTupianOptions();

window._o_minRect = _o_getBackground()._o_getFunnelSize();

window._o_extractorHash = null;

window._o_iterator = 0;

window._o_imageMap = [];

window._o_refererSplitArrayMap = {};

window._o_sameSerialSizeInfo = {};

window._o_loadedMark = false;

window._o_currentTabId = null;

window._o_tabTitle = null;

window._o_tabUrl = null;

window._o_loading = 0;

window._o_max_loading = 8;

window._o_max_loaded = _o_getBackground()._o_getExtMaxLoad();

window._o_load_timer = null;

window._o_img_load_analyzer = _o_createImageLoadTimeoutSiteAnalyzer(8e3, 16);

window._o_img_load_failed_set = {};

window._o_url_check_task_executor = _o_createTaskExecutePool(4);

chrome.tabs.get(_o_tabId, (function(tab) {
    if (!tab) return;
    window._o_tabTitle = tab.title;
    window._o_tabUrl = tab.url;
    let _w__static_title = function() {
        return _o_tabTitle + " - " + _o_tabTitle;
    };
    setInterval((function() {
        document.title = "[" + _o_loading + "/" + _o_iterator + "/" + _o_imageMap.length + "-retry:" + _o_url_check_task_executor.getProcessingNum() + "/" + _o_url_check_task_executor.getTaskNum() + "]/" + _w__static_title();
    }), 100);
}));

chrome.tabs.getCurrent((function(tab) {
    window._o_currentTabId = tab.id;
    $((function() {
        _o_executeFunWhenTabNotPending(_o_tabId, _o_initExtractorPage);
    }));
}));

chrome.runtime.onMessage.addListener((function(message, sender, callback) {
    message && message.type == "_o_selectExtractor" && _o_extractorHash && _o_extractorHash.length > 0 && message.extractorHash.length && message.extractorHash == _o_extractorHash && callback({
        tabId: _o_currentTabId
    });
    message && message.type == "_o_updateTupian" && _o_extractorHash && _o_extractorHash.length > 0 && message.extractorHash.length && message.extractorHash == _o_extractorHash && _o_showImages(_o_imageMap);
    message && message.type == "_o_updateTupianItem" && _o_extractorHash && _o_extractorHash.length > 0 && message.extractorHash.length && message.extractorHash == _o_extractorHash && _o_updateImages(message.ItemIdxMap);
}));

function _o_initExtractorPage(_w_observedTab) {
    if (!_o_tabId || _o_tabId.length == 0) {
        $("#ext_main").html(_MSG_("ext_msg_dest_not_exist"));
        return;
    } else if (_o_tabId == _o_currentTabId) {
        $("#ext_main").html(_MSG_("ext_msg_can_ext_itself"));
        return;
    } else if (!_o_getBackground()._o_tabs[_o_tabId]) {
        $("#ext_main").html(_MSG_("ext_msg_dest_not_exist"));
        return;
    } else {
        try {
            let _w_tabUrl = new URL(_w_observedTab.url);
            if (!_o_isAccessibleUrl(_w_tabUrl.href) && !_o_isMultiExtUrl(_w_tabUrl.href)) {
                $("#ext_main").html(_MSG_("ext_msg_url_limited"));
                return;
            }
        } catch (e) {
            console.log("parse url error." + _w_observedTab.url);
            return;
        }
    }
    window._o_extractorHash = _o_getBackground()._o_getTabExtractorHash(_o_tabId);
    if (!_o_extractorHash || _o_extractorHash.length == 0) {
        $("#ext_main").html(_MSG_("ext_msg_dest_not_exist"));
        return;
    } else {
        let _o_tabIdMapper = _o_getBackground()._o_tabIdMapper;
        let _o_checkPositionInterval = setInterval((function updateTabPosition() {
            if (!_o_tabIdMapper[_o_tabId]) {
                clearInterval(_o_checkPositionInterval);
            } else if (_o_tabIdMapper[_o_tabId].extractorHash == _o_extractorHash) {
                chrome.tabs.get(_o_tabId, (function(tab) {
                    chrome.tabs.getCurrent((function(currentTab) {
                        if (currentTab.windowId != tab.windowId || currentTab.index != tab.index + 1) {
                            let _w_destWindowId = tab.windowId;
                            let _w_destIndex = tab.index + 1;
                            if (_w_destWindowId == currentTab.windowId && currentTab.index < tab.index) _w_destIndex = tab.index;
                            try {
                                chrome.tabs.move(currentTab.id, {
                                    windowId: _w_destWindowId,
                                    index: _w_destIndex
                                }, (function() {}));
                            } catch (exception) {}
                        }
                    }));
                }));
            }
        }), 512);
    }
    let _w_tabUrl = new URL(_o_getBackground()._o_tabs[_o_tabId].url);
    if (!_o_isMultiExtUrl(_w_tabUrl.href)) {
        _o_getBackground()._o_extractScriptInject(_o_tabId, _o_fetchLevel);
    }
    let _w_timer = setTimeout((function() {
        _o_imageMap = _o_getBackground()._o_getImageMapByExtractorHash(_o_extractorHash);
        _o_showImages(_o_imageMap);
    }), 512);
    _o_getBackground()._o_selectExtractor(_o_extractorHash, (function callback(data) {
        if (data && data.tabId && data.tabId != _o_currentTabId) {
            clearTimeout(_w_timer);
            chrome.tabs.update(data.tabId, {
                active: true
            }, (function(tab) {
                chrome.windows.update(tab.windowId, {
                    focused: true,
                    drawAttention: true
                }, (function(window) {
                    chrome.tabs.remove(_o_currentTabId, (function() {}));
                }));
            }));
        }
    }));
}

function _o_showImage(_o_idx, _w_isUpdate) {
    if (_w_isUpdate && $("a[data-idx=" + _o_idx + "]").length == 0) return;
    _o_img_load_failed_set[_o_idx] = true;
    let _o_loadMonitor = null;
    let _w_onloadFun = function() {
        _o_loading--;
        _o_loadMonitor && _o_loadMonitor.loaded();
        delete _o_img_load_failed_set[_o_idx];
        this.onload = null;
        this.onabort = null;
        this.onerror = null;
        let _o_originalSrc = this.src;
        let _o_imageItem = _o_imageMap[_o_originalSrc];
        let _o_imageReferer = _o_imageItem.referer;
        if (this.width < _o_minRect.width || this.height < _o_minRect.height) return;
        let _w_pathname = new URL(_o_originalSrc).pathname;
        let _w_filename = _w_pathname.substring(_w_pathname.lastIndexOf("/") + 1);
        let _w_extension = _w_filename.lastIndexOf(".") > -1 ? _w_filename.substring(_w_filename.lastIndexOf(".") + 1) : "";
        _w_extension = _w_extension.toLowerCase();
        _w_extension = _o_suffix_type_mapper[_w_extension] ? _o_suffix_type_mapper[_w_extension] : "other";
        this.title = _MSG_("ext_cb_resolution") + this.width + "x" + this.height + " / " + _MSG_("ext_cb_type") + _w_extension.toUpperCase();
        _o_imageItem.title && _o_imageItem.title.length > 0 && (this.title += " / Title: " + _o_escapeHtml(_o_imageItem.title));
        _o_imageItem.alt && _o_imageItem.alt.length > 0 && _o_imageItem.title != _o_imageItem.alt && (this.title += " / Alt: " + _o_escapeHtml(_o_imageItem.alt));
        this.title = this.title;
        this.setAttribute("data-idx", _o_idx);
        let _w_link = document.createElement("a");
        _w_link.setAttribute("class", "imageItem");
        _w_link.setAttribute("data-width", this.width);
        _w_link.setAttribute("data-height", this.height);
        _w_link.setAttribute("data-size", this.width * this.height);
        _w_link.setAttribute("data-resolution", this.width + "x" + this.height);
        _w_link.setAttribute("data-id", (new Date).getTime() + _o_randomNumber(4));
        _w_link.setAttribute("data-serial", _o_imageItem.serial);
        _w_link.setAttribute("data-title", _o_imageItem.title);
        _w_link.setAttribute("data-alt", _o_imageItem.alt);
        _w_link.setAttribute("data-idx", _o_idx);
        _w_link.href = _o_originalSrc;
        _w_link.title = this.title;
        _w_link.setAttribute("data-imageType", _w_extension.toLowerCase());
        _w_link.setAttribute("data-referer", _o_imageReferer);
        this.setAttribute("data-referer", _o_imageReferer);
        let _w_refererSplitArray = _o_imageReferer ? _o_imageReferer.match(/([\d]+|[^\d]+)/g) : [];
        for (let arrIdx in _w_refererSplitArray) if (!isNaN(_w_refererSplitArray[arrIdx])) _w_refererSplitArray[arrIdx] = _o_numberToFixedLengthStr(_w_refererSplitArray[arrIdx], 128);
        _o_refererSplitArrayMap[_o_idx] = _w_refererSplitArray;
        _w_link.setAttribute("data-maxRange", "other");
        for (let i in _o_image_size) {
            if (isNaN(i)) continue;
            let _w_name = _o_image_size[i];
            let _w_item = _o_image_size[_w_name];
            this.width - _w_item.width >= 0 && this.height - _w_item.height >= 0 && _w_link.setAttribute("data-maxRange", _w_name);
        }
        this.setAttribute("data-src", _o_originalSrc);
        _w_link.setAttribute("data-src", _o_originalSrc);
        _w_link.appendChild(this);
        $(_w_link).append($("<div />", {
            class: "imageItemResolution",
            text: this.width + "x" + this.height
        }));
        let _o_selected = false;
        let _o_image_acreage = this.width * this.height;
        let _o_stored_image_acreage = window._o_sameSerialSizeInfo["serial_" + _o_imageItem.serial];
        if (_o_stored_image_acreage && _o_stored_image_acreage > _o_image_acreage) {
            return;
        } else if ($("a[data-serial=" + _o_imageItem.serial + "][data-idx!=" + _o_idx + "]").length > 0) {
            let $_w_selectedItem = $("a[data-serial=" + _o_imageItem.serial + "][data-idx!=" + _o_idx + "]");
            if ($_w_selectedItem.is(".selected")) _o_selected = true;
            $_w_selectedItem.remove();
        }
        window._o_sameSerialSizeInfo["serial_" + _o_imageItem.serial] = _o_image_acreage;
        {
            let $_w_oldLink = $("a[data-idx=" + _o_idx + "]");
            if ($_w_oldLink.length > 0) {
                if ($_w_oldLink.is(".selected")) _o_selected = true;
                if (_o_selected) _w_link.classList.add("selected");
                $_w_oldLink.replaceWith(_w_link);
            } else {
                $("#empty").remove();
                $("#ext_main").append(_w_link);
            }
        }
        _w_link.style.width = _w_link.getBoundingClientRect().width + "px";
        _w_link.style.height = _w_link.getBoundingClientRect().height + "px";
        this.style.maxWidth = this.getBoundingClientRect().width + "px";
        this.style.maxHeight = this.getBoundingClientRect().height + "px";
        _w_link.style.lineHeight = this.getBoundingClientRect().height - 4 + "px";
        $(_w_link).colorbox({
            rel: "imageItem",
            photo: true,
            maxWidth: "99%",
            slideshow: true,
            slideshowAuto: false,
            slideshowSpeed: 5e3,
            maxHeight: function() {
                return localStorage["verticalViewMode"] != "fullView" ? "99%" : "";
            },
            href: function() {
                let _w_aHref = $(this).attr("href");
                let _w_imgSrc = $(this).children(":first-child").attr("data-src");
                return _o_isAccessibleUrl(_w_imgSrc) ? _w_imgSrc : _w_aHref;
            },
            onOpen: function(event) {
                let $_w_clickedElement = $.colorbox.element();
                if ($_w_clickedElement.hasClass("preview_ignore_configure")) {
                    $("#colorbox").show();
                } else if ("true" == _o_getBackground()._o_getExtClickAct()) {
                    $_w_clickedElement.hasClass("selected") ? $_w_clickedElement.removeClass("selected") : $_w_clickedElement.addClass("selected");
                    _o_dynamicRender("#ext_main>.imageItem", true, false);
                    $.colorbox.close();
                    $("#colorbox").hide();
                } else {
                    $("#colorbox").show();
                }
                $_w_clickedElement.removeClass("preview_ignore_configure");
                let $_w_styleSheet = $("<style />", {
                    id: "hideScrollBarStyle",
                    type: "text/css",
                    text: "body::-webkit-scrollbar {display: none;}"
                });
                $("head").append($_w_styleSheet);
            },
            onCleanup: function() {
                $("#hideScrollBarStyle").remove();
            },
            onComplete: function() {
                $("#cboxTitle").each((function() {
                    $("#cboxTitle").attr("style", "width:" + ($(this).parent().width() - 90) + "px; white-space:nowrap; overflow:hidden;");
                    $("#cboxContent").attr("title", _MSG_("ext_cb_tips"));
                }));
                _o_checkViewing();
            }
        });
        if (!_o_isVisible(this) && $("#ext_main>.imageItem:visible").length > _o_getBackground()._o_getDyLoadSize()) {
            this.src = _o_atomPngSrc;
        }
        _o_sortElements("#ext_main>.imageItem");
        $("#image_amount").html($(".imageItem").length);
    };
    let _o_imageSrc = _o_imageMap[_o_idx];
    let _o_imageReferer = _o_imageMap[_o_imageSrc].referer;
    {
        let _o_imageRefererMapper = {};
        _o_imageRefererMapper[_o_imageSrc] = _o_imageReferer;
        _o_getBackground()._o_updateRefererData(_o_imageRefererMapper, _o_currentTabId, true);
    }
    let _w_loadCounter = 4;
    let _w_image = new Image;
    _w_image.onload = _w_onloadFun;
    _w_image.onerror = function() {
        _o_loading--;
        if (!_o_loadMonitor.isTimeout() && _w_loadCounter-- > 0) {
            let _w_imgSrc = _w_image.src;
            let _w_reloadImg = function() {
                setTimeout((function() {
                    _o_loading++;
                    _w_image.src = _w_imgSrc;
                }), 2e3);
            };
            _o_url_check_task_executor.addTask((function(_w_beginFun, _w_endFun) {
                _w_beginFun();
                function clearReferer(_w_imageSrc) {
                    let _o_imageRefererMapper = {};
                    _o_imageRefererMapper[_w_imageSrc] = null;
                    _o_getBackground()._o_updateRefererData(_o_imageRefererMapper, _o_currentTabId, true);
                }
                $.ajax({
                    method: "get",
                    timeout: _o_ajax_request_timeout,
                    headers: {
                        Accept: "*/*; charset=UTF-8",
                        "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0, post-check=0, pre-check=0",
                        Pragma: "no-cache",
                        Expires: "0"
                    },
                    url: _w_imgSrc
                }).done((function(data, status, xhr) {
                    _o_loadMonitor && _o_loadMonitor.loaded();
                    _w_loadCounter = -1;
                    if (xhr.status == 200 && data.match && data.match(/(html|script|style|head|body)/i) != null) {
                        clearReferer(_w_imgSrc);
                    }
                    _w_reloadImg();
                })).fail((function(xhr) {
                    _o_loadMonitor && _o_loadMonitor.loaded();
                    _w_loadCounter = -1;
                    if (xhr.status == 404) {
                        delete _o_img_load_failed_set[_o_idx];
                    } else if (xhr.status == 403) {
                        clearReferer(_w_imgSrc);
                        _w_reloadImg();
                    } else {
                        _w_reloadImg();
                    }
                })).always(_w_endFun);
            }));
        }
    };
    _w_image.onabort = _w_image.onerror;
    if (_o_img_load_analyzer.bypassUrl(_o_imageSrc)) {
        _o_loading++;
        _o_loadMonitor = _o_img_load_analyzer.directSetImgSrc(_w_image, _o_imageSrc);
    } else {
        _o_loading++;
        _o_loadMonitor = _o_img_load_analyzer.setImgSrc(_w_image, _o_imageSrc);
    }
}

function _o_showImages(_o_imageMap) {
    for (;_o_iterator < _o_imageMap.length; ) {
        if (_o_loading >= _o_max_loading) {
            break;
        } else if ($("a.imageItem").length >= _o_max_loaded - _o_loading) {
            break;
        } else {
            _o_showImage(_o_iterator++, false);
        }
    }
}

setInterval((function() {
    _o_showImages(_o_imageMap);
}), 50);

function _o_updateImages(_w_ItemIdxMap) {
    for (let idx in _w_ItemIdxMap) {
        if (!_o_imageMap) continue;
        _o_showImage(idx, true);
    }
}

$((function() {
    document.title = _MSG_("ext_doc_title");
    $.extend($.colorbox.settings, {
        current: _MSG_("colorbox_current"),
        previous: _MSG_("colorbox_previous"),
        next: _MSG_("colorbox_next"),
        close: _MSG_("colorbox_close"),
        xhrError: _MSG_("colorbox_xhrError"),
        imgError: _MSG_("colorbox_imgError"),
        slideshowStart: _MSG_("colorbox_slideshowStart"),
        slideshowStop: _MSG_("colorbox_slideshowStop")
    });
}));

$((function() {
    $(window).bind("scroll resize", (function() {
        _o_dynamicRender("#ext_main>.imageItem", false, false);
    }));
}));

$((function() {}));

window.selectParam = {
    timeout: 128,
    lastExeTime: new Date,
    timer: null,
    updateStatics: true,
    delayAgain: false
};

$((function() {
    $("body").on("mousedown", (function dnFun(dnEvent) {
        if (dnEvent.button == 0) {
            let $_w_toElement = $(dnEvent.target);
            if (!$_w_toElement.is("#ext_main") && $_w_toElement.parents("#ext_main").length <= 0) {
                return;
            } else if ($(".modal-dialog").is(":visible") || $("#colorbox").is(":visible")) {
                return;
            }
            dnEvent.preventDefault();
            $(".selectorDiv").remove();
            $(this).off("mousemove");
            $(this).off("mouseup");
            let $_w_selector = $("<div />", {
                class: "selectorDiv"
            });
            $(this).append($_w_selector);
            let _w_upFun, mvFun, moveStep = 0;
            $(this).on("mousemove", mvFun = function(mvEvent) {
                let _w_coordinates = {};
                _w_coordinates.x1 = dnEvent.pageX <= mvEvent.pageX ? dnEvent.pageX : mvEvent.pageX;
                _w_coordinates.y1 = dnEvent.pageY <= mvEvent.pageY ? dnEvent.pageY : mvEvent.pageY;
                _w_coordinates.x2 = dnEvent.pageX >= mvEvent.pageX ? dnEvent.pageX : mvEvent.pageX;
                _w_coordinates.y2 = dnEvent.pageY >= mvEvent.pageY ? dnEvent.pageY : mvEvent.pageY;
                if (++moveStep == 1 || _w_coordinates.x2 - _w_coordinates.x1 < 4 && _w_coordinates.y2 - _w_coordinates.y1 < 4) return true;
                _o_throttle(selectParam, (function() {
                    $_w_selector.css("z-index", "1020").css("border", "2px solid #3399ff").css("background-color", "rgba(51, 153, 255, 0.2)").css("position", "absolute").css("left", _w_coordinates.x1 + "px").css("top", _w_coordinates.y1 + "px").css("width", _w_coordinates.x2 - _w_coordinates.x1 + "px").css("height", _w_coordinates.y2 - _w_coordinates.y1 + "px");
                    $(".imageItem").each((function() {
                        let _w_imageItem = $(this).get(0);
                        let _w_itemRect = {
                            x1: _w_imageItem.offsetLeft,
                            y1: _w_imageItem.offsetTop,
                            x2: _w_imageItem.offsetLeft + _w_imageItem.offsetWidth,
                            y2: _w_imageItem.offsetTop + _w_imageItem.offsetHeight
                        };
                        if (_w_itemRect.y2 < _w_coordinates.y1 || _w_itemRect.x2 < _w_coordinates.x1 || _w_itemRect.y1 > _w_coordinates.y2 || _w_itemRect.x1 > _w_coordinates.x2) {
                            $(this).removeClass("preSelect preUnSelect");
                        } else {
                            $(this).hasClass("selected") ? $(this).addClass("preUnSelect") : $(this).addClass("preSelect");
                        }
                    }));
                }), false);
            }).on("mouseup", _w_upFun = function(upEvent) {
                if (upEvent.button == 0) {
                    $(this).off("mousemove", mvFun);
                    $(this).off("mouseup", _w_upFun);
                    $_w_selector.remove();
                    $(".imageItem").removeClass("preSelect preUnSelect");
                    let _w_coordinates = {};
                    _w_coordinates.x1 = dnEvent.pageX <= upEvent.pageX ? dnEvent.pageX : upEvent.pageX;
                    _w_coordinates.y1 = dnEvent.pageY <= upEvent.pageY ? dnEvent.pageY : upEvent.pageY;
                    _w_coordinates.x2 = dnEvent.pageX >= upEvent.pageX ? dnEvent.pageX : upEvent.pageX;
                    _w_coordinates.y2 = dnEvent.pageY >= upEvent.pageY ? dnEvent.pageY : upEvent.pageY;
                    if (moveStep == 1 || _w_coordinates.x2 - _w_coordinates.x1 < 4 && _w_coordinates.y2 - _w_coordinates.y1 < 4) return true;
                    $(upEvent.target).one("click", (function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                    }));
                    _o_throttle(selectParam, (function() {
                        $(".imageItem").each((function() {
                            let _w_imageItem = $(this).get(0);
                            let _w_itemRect = {
                                x1: _w_imageItem.offsetLeft,
                                y1: _w_imageItem.offsetTop,
                                x2: _w_imageItem.offsetLeft + _w_imageItem.offsetWidth,
                                y2: _w_imageItem.offsetTop + _w_imageItem.offsetHeight
                            };
                            if (_w_itemRect.y2 < _w_coordinates.y1 || _w_itemRect.x2 < _w_coordinates.x1 || _w_itemRect.y1 > _w_coordinates.y2 || _w_itemRect.x1 > _w_coordinates.x2) {} else {
                                $(this).hasClass("selected") ? $(this).removeClass("selected") : $(this).addClass("selected");
                            }
                        }));
                        _o_dynamicRender("#ext_main>.imageItem", true, false);
                    }), false);
                }
            });
        }
    }));
}));

function _o_selectAll() {
    $(".imageItem:visible").addClass("selected");
    _o_checkViewing();
    _o_dynamicRender("#ext_main>.imageItem", true, true);
}

function _o_unSelectAll() {
    $(".imageItem:visible").removeClass("selected");
    _o_checkViewing();
    _o_dynamicRender("#ext_main>.imageItem", true, true);
}

function _o_reverseSelect() {
    let $_w_selected = $(".imageItem:visible.selected");
    let $_w_unSelected = $(".imageItem:visible:not(.selected)");
    $_w_selected.removeClass("selected");
    $_w_unSelected.addClass("selected");
    _o_checkViewing();
    _o_dynamicRender("#ext_main>.imageItem", true, true);
}

function _o_deleteSelected() {
    if ($("#cboxLoadedContent").length > 0) {
        let _w_imgUrl = $("#cboxLoadedContent img").attr("src");
        $.colorbox.element().remove();
        $.colorbox.next();
        $(".imageItem:visible").length == 0 && $.colorbox.close();
    } else {
        $(".selected:visible").remove();
        _o_checkViewing();
    }
    _o_dynamicRender("#ext_main>.imageItem", true, true);
}

function _o_deleteIvisible() {
    $(".imageItem:hidden").remove();
    _o_checkViewing();
    _o_dynamicRender("#ext_main>.imageItem", true, true);
}

function _o_keepSelected() {
    if ($(".selected:visible").length > 0) {
        $(".imageItem:not(.selected):visible").remove();
        _o_checkViewing();
        _o_dynamicRender("#ext_main>.imageItem", true, true);
    }
}

function _o_cleanSelectedAndSelectAllItems() {
    $(".imageItem.selected:visible").remove();
    $(".imageItem:visible").addClass("selected");
    let _w_itemArray = new Array;
    $(".imageItem.selected:visible").each((function() {
        _w_itemArray.push({
            name: "",
            url: $(this).attr("href"),
            referer: $(this).attr("data-referer")
        });
    }));
    return _w_itemArray;
}

function _o_downloadSelected() {
    let _w_itemArray = new Array;
    if ($("#cboxLoadedContent").length > 0) {
        _o_directDownload($("#cboxLoadedContent img").attr("src"), true);
    } else {
        $(".selected:visible").each((function() {
            _w_itemArray.push({
                name: "",
                url: $(this).attr("href"),
                referer: $(this).attr("data-referer"),
                serial: $(this).attr("data-serial")
            });
        }));
    }
    _o_download(_w_itemArray, _o_tabTitle, _o_cleanSelectedAndSelectAllItems);
}

function _o_downloadAll() {
    let _w_itemArray = new Array;
    $(".imageItem:visible").each((function() {
        _w_itemArray.push({
            name: "",
            url: $(this).attr("href"),
            referer: $(this).attr("data-referer"),
            serial: $(this).attr("data-serial")
        });
    }));
    _o_download(_w_itemArray, _o_tabTitle, _o_cleanSelectedAndSelectAllItems);
}

function _o_saveFavorite() {
    let _o_popMsg = function() {
        $("#pullywood_production").popover({
            title: "<span class='glyphicon glyphicon-info-sign'></span> " + _MSG_("ext_pop_msg_open_or_install_first"),
            content: _MSG_("ext_pop_msg_open_or_install_first_msg"),
            placement: "auto",
            html: true
        }).popover("show").next().on("click", (function() {
            $(this).popover("destroy");
        })).prev().on("mouseover", (function() {
            $(this).popover("destroy");
        }));
    };
    $.ajax({
        method: "get",
        url: _o_checkClientURL,
        dataType: "json",
        contentType: "application/json",
        mimeType: "application/json"
    }).done((function(data) {
        if (data && data.version) {
            _o_do_saveFavorite();
        } else if (data && !data.version) {
            alert(_MSG_("ext_pop_msg_server_error"));
        } else {
            _o_popMsg();
        }
    })).fail((function() {
        _o_popMsg();
    }));
}

function _o_do_saveFavorite() {
    let _w_itemArray = $(".imageItem.selected:visible").toArray();
    if (_w_itemArray.length <= 0) {
        alert(_MSG_("ext_favorite_select_image_first"));
        return;
    }
    let $_w_dialog = $("<div />", {
        id: "add_favorite_dlg",
        class: "modal fade",
        role: "dialog"
    });
    let $_w_modalDlg = $("<div />", {
        class: "modal-dialog"
    });
    let $_w_modalCnt = $("<div />", {
        class: "modal-content"
    });
    let $_w_modalHdr = $("<div />", {
        class: "modal-header"
    });
    let $_w_modalTle = $("<h4 />", {
        class: "modal-title"
    });
    let $_w_modalBdy = $("<div />", {
        class: "modal-body"
    });
    let $_w_modalFtr = $("<div />", {
        class: "modal-footer"
    });
    $_w_modalHdr.append($_w_modalTle);
    $_w_modalCnt.append($_w_modalHdr);
    $_w_modalCnt.append($_w_modalBdy);
    $_w_modalCnt.append($_w_modalFtr);
    $_w_modalDlg.append($_w_modalCnt);
    $_w_dialog.append($_w_modalDlg);
    $_w_modalTle.append($("<span />", {
        class: "glyphicon glyphicon-folder-open"
    })).append(_MSG_("ext_save_image_to_collection"));
    let $_w_msgContainer = $("<div />", {
        class: "alert alert-info",
        html: _MSG_("ext_save_image_selected") + _w_itemArray.length
    });
    $_w_modalBdy.append($_w_msgContainer);
    let $_w_continuousSwitch = $("<input />", {
        type: "checkbox",
        name: "continuousSwitch"
    });
    $_w_modalFtr.append($("<span />", {
        class: "continuousSwitchContainer"
    }).append($_w_continuousSwitch));
    $_w_continuousSwitch.bootstrapSwitch({
        labelText: _MSG_("ext_dynamic_save_all_image")
    });
    let $_w_addBtn = $("<button />", {
        class: "btn btn-primary",
        disabled: false,
        text: _MSG_("ext_dynamic_add_to_collection")
    });
    $_w_addBtn.prepend($("<span />", {
        class: "glyphicon glyphicon-floppy-open"
    }));
    $_w_addBtn.on("click", (function() {
        $_w_addBtn.attr("disabled", true);
        let _w_continuousFav = $_w_continuousSwitch.is(":checked");
        let _w_taskArray = _w_itemArray;
        _w_itemArray = new Array;
        let _w_data = [];
        _w_taskArray.forEach((function(taskItem) {
            _w_data.push({
                src: $(taskItem).attr("data-src"),
                referer: $(taskItem).attr("data-referer"),
                description: typeof $(taskItem).attr("title") != "undefined" ? $(taskItem).attr("title").replace(/分辨率:\s\d+x\d+\s\/\s类型:\s[a-zA-Z0-9]+(\s\/\s)?/gi, "") : "",
                width: $(taskItem).attr("data-width"),
                height: $(taskItem).attr("data-height"),
                extHash: _o_extractorHash,
                serial: $(taskItem).attr("data-serial")
            });
        }));
        $_w_msgContainer.text(_MSG_("ext_pushing_data"));
        if (!$_w_dialog.is(":visible")) {
            return;
        }
        $.ajax({
            method: "post",
            url: _o_collectionSaveURL,
            data: JSON.stringify(_w_data),
            dataType: "json",
            contentType: "application/json",
            mimeType: "application/json"
        }).done((function(result) {
            $_w_msgContainer.text(_MSG_("ext_msg_data_pushed_successfully"));
        })).fail((function(a, b, c) {
            console.log("fialed", a, b, c);
            _w_itemArray = _w_taskArray;
            let $_w_spanIcon = $_w_addBtn.children().first();
            $_w_addBtn.text(_MSG_("ext_pushing_data_retry")).prepend($_w_spanIcon).attr("disabled", _w_continuousFav ? true : false);
            $_w_msgContainer.text(_MSG_("ext_msg_data_pushed_failed"));
        })).always((function() {
            if (_w_continuousFav) {
                let _w_continuousTimeout = 500;
                if (_w_itemArray.length > 0) {
                    console.log(JSON.stringify(_w_itemArray));
                    $_w_msgContainer.text(_MSG_("ext_msg_data_pushed_failed_auto"));
                } else {
                    $(".imageItem.selected:visible").remove();
                    $_w_msgContainer.text(_MSG_("ext_msg_wait_for_available_data"));
                }
                let _w_intervalHandle = setInterval((function continuousAdd() {
                    if (_w_itemArray.length == 0) {
                        _o_selectAll();
                        _w_itemArray = $(".imageItem.selected:visible").toArray();
                    }
                    if (_w_itemArray && _w_itemArray.length > 0) {
                        clearInterval(_w_intervalHandle);
                        $_w_addBtn.click();
                    }
                }), _w_continuousTimeout);
            } else {
                $(this).remove();
            }
        }));
    }));
    $_w_modalFtr.append($_w_addBtn);
    let $_w_cancelBtn = $("<button />", {
        class: "btn btn-default",
        "data-dismiss": "modal",
        text: _MSG_("ext_btn_cancel")
    });
    $_w_cancelBtn.prepend($("<span />", {
        class: "glyphicon glyphicon-remove"
    }));
    $_w_cancelBtn.on("click", (function() {}));
    $_w_modalFtr.append($_w_cancelBtn);
    $_w_dialog.modal({
        backdrop: "static",
        keyboard: false
    }).on("hidden.bs.modal", (function() {
        $(this).remove();
    }));
}

function _o_selectViewing() {
    if ($("#cboxLoadedContent").length > 0) {
        $("#colorbox").addClass("colorboxSelect");
        $(".imageItem:not(.selected):visible[href='" + $("#cboxLoadedContent img").attr("src") + "']").addClass("selected");
    }
}

function _o_unSelectViewing() {
    if ($("#cboxLoadedContent").length > 0) {
        $("#colorbox").removeClass("colorboxSelect");
        $(".imageItem.selected:visible[href='" + $("#cboxLoadedContent img").attr("src") + "']").removeClass("selected");
    }
}

function _o_checkViewing() {
    if ($("#cboxLoadedContent").length > 0) {
        $("#colorbox").removeClass("colorboxSelect");
        $.colorbox.element().is(".selected:visible") && $("#colorbox").addClass("colorboxSelect");
    }
}

function _o_menuSwitchRoll() {
    let _w_statusMap = {
        0: 1,
        1: 3,
        3: 2,
        2: 0
    };
    let _w_menuStatus = _o_getBackground()._o_getMenuStatus();
    let _w_newStatus = _w_statusMap[_w_menuStatus];
    "undefined" == typeof _w_newStatus && (_w_newStatus = 3);
    _o_getBackground()._o_setMenuStatus(_w_newStatus);
    _o_dynamicRender("#ext_main>.imageItem", true, false);
}

function _o_sortSwitchRoll() {
    let _w_newStatus = _o_getBackground()._o_getMenuStatus();
    if (_w_newStatus & 4) {
        _w_newStatus &= ~4;
    } else {
        _w_newStatus |= 4;
    }
    _o_getBackground()._o_setMenuStatus(_w_newStatus);
    _o_sortElements("#ext_main>.imageItem");
    _o_dynamicRender("#ext_main>.imageItem", true, false);
}

function _o_resolutionTleSwitchRoll() {
    let _w_newStatus = _o_getBackground()._o_getMenuStatus();
    if (_w_newStatus & 8) {
        _w_newStatus &= ~8;
    } else {
        _w_newStatus |= 8;
    }
    _o_getBackground()._o_setMenuStatus(_w_newStatus);
    _o_dynamicRender("#ext_main>.imageItem", true, false);
}

function _o_switchViewMode() {
    if ($("#colorbox").is(":visible")) {
        if (localStorage["verticalViewMode"] != "fullView") {
            localStorage["verticalViewMode"] = "fullView";
        } else {
            localStorage["verticalViewMode"] = "";
        }
        $.colorbox.element().colorbox({
            open: true
        });
    }
}

function _o_closeAllRelativePage() {
    chrome.tabs.get(_o_tabId, (function(tab) {
        if (tab && _o_tabUrl == tab.url) {
            chrome.tabs.remove(tab.id, (function() {
                window.close();
            }));
        } else {
            window.close();
        }
    }));
}

$((function() {
    let $_w_pwd_link = $("<div>", {
        class: "btn-group btn-group-xs"
    });
    let $_w_configureLink = $("<a />", {
        target: "_configure_",
        class: "btn btn-pwd",
        href: "options.html",
        text: _MSG_("ext_btn_ext_option")
    });
    $_w_configureLink.prepend($("<span />", {
        class: "glyphicon glyphicon-wrench"
    }));
    let $_w_aboutLink = $("<a />", {
        target: "_configure_",
        class: "btn btn-home",
        href: "options.html?showMsg=about",
        text: _MSG_("ext_btn_ext_about")
    });
    $_w_aboutLink.prepend($("<span />", {
        class: "glyphicon glyphicon-copyright-mark"
    }));
    let $_w_favoriteLink = $("<a />", {
        target: "_imageAssistant_favorite",
        id: "_cxyz_fav_",
        class: "btn btn-primary",
        href: "./favorite.html",
        text: _MSG_("pop_menu_item_ext_favorite")
    });
    $_w_favoriteLink.prepend($("<span />", {
        class: "glyphicon glyphicon-folder-open"
    }));
    let $_w_proLink = $("<a />", {
        target: "_pullywood_production_",
        class: "btn btn-home",
        href: "http://www.pullywood.com",
        text: _MSG_("ext_btn_pwd_home")
    });
    $_w_proLink.prepend($("<span />", {
        class: "glyphicon glyphicon-home"
    }));
    $_w_pwd_link.append($_w_configureLink).append($_w_aboutLink).append($_w_favoriteLink).append($_w_proLink);
    $("#pullywood_production").append($_w_pwd_link);
    let _w_data = [ {
        name: _MSG_("ext_menu_fun_btn_reset_page"),
        showText: true,
        className: "mainMenuItem",
        iconClass: "glyphicon glyphicon-refresh",
        fun: function() {
            $("#ext_main .imageItem").remove();
            _o_iterator = 0;
            _o_showImages(_o_imageMap);
        }
    }, {
        name: _MSG_("ext_menu_fun_btn_select_all"),
        showText: true,
        className: "mainMenuItem",
        iconClass: "glyphicon glyphicon-align-justify",
        fun: _o_selectAll
    }, {
        name: "",
        showText: false,
        className: "mainMenuItem",
        iconClass: "glyphicon glyphicon-collapse-down",
        fun: function() {},
        subMenu: [ {
            name: _MSG_("ext_menu_fun_btn_select_none"),
            showText: true,
            className: "mainMenuItem",
            iconClass: "glyphicon glyphicon-list",
            fun: _o_unSelectAll
        }, {
            name: _MSG_("ext_menu_fun_btn_select_reverse"),
            showText: true,
            className: "mainMenuItem",
            iconClass: "glyphicon glyphicon-retweet",
            fun: _o_reverseSelect
        } ]
    }, {
        name: _MSG_("ext_menu_fun_btn_delete_selected"),
        showText: true,
        className: "mainMenuItem",
        iconClass: "glyphicon glyphicon-trash",
        fun: _o_deleteSelected
    }, {
        name: "",
        showText: false,
        className: "mainMenuItem",
        iconClass: "glyphicon glyphicon-collapse-down",
        fun: function() {},
        subMenu: [ {
            name: _MSG_("ext_menu_fun_btn_delete_visible"),
            className: "mainMenuItem",
            iconClass: "glyphicon glyphicon-remove",
            fun: _o_deleteIvisible
        }, {
            name: _MSG_("ext_menu_fun_btn_keep_selected"),
            showText: true,
            className: "mainMenuItem",
            iconClass: "glyphicon glyphicon-log-in",
            fun: _o_keepSelected
        } ]
    }, {
        name: _MSG_("ext_menu_fun_btn_down_selected"),
        showText: true,
        className: "mainMenuItem",
        iconClass: "glyphicon glyphicon-cloud-download",
        fun: _o_downloadSelected
    }, {
        name: "",
        showText: false,
        className: "mainMenuItem",
        iconClass: "glyphicon glyphicon-collapse-down",
        fun: function() {},
        subMenu: [ {
            name: _MSG_("ext_menu_fun_btn_download_all"),
            showText: true,
            className: "mainMenuItem",
            iconClass: "glyphicon glyphicon-download",
            fun: _o_downloadAll
        } ]
    }, {
        name: _MSG_("ext_menu_item_open_download_folder"),
        showText: true,
        className: "mainMenuItem",
        iconClass: "glyphicon glyphicon-folder-open",
        fun: _o_showDefaultFolder
    }, {
        name: _MSG_("ext_menu_collect_selected"),
        showText: true,
        className: "mainMenuItem",
        iconClass: "glyphicon glyphicon-folder-open",
        fun: _o_saveFavorite
    } ];
    let $_w_selectMenu = $("#select_menu");
    $_w_selectMenu.addClass("container btn-group btn-group-sm");
    $_w_selectMenu.attr("role", "group");
    for (let i in _w_data) {
        if (isNaN(i)) continue;
        let _w_item = _w_data[i];
        if (_w_item.subMenu) {
            let $_w_menuGrp = $("<div />", {
                class: "btn-group btn-group-sm",
                role: "group"
            });
            let $_w_button = $("<button />", {
                type: "button",
                class: "btn btn-default dropdown-toggle",
                "data-toggle": "dropdown",
                "aria-expanded": "false"
            });
            $_w_button.append($("<span />", {
                class: "caret"
            }));
            $_w_menuGrp.append($_w_button);
            $_w_selectMenu.append($_w_menuGrp);
            let $_w_menu = $("<ul />", {
                class: "dropdown-menu dropdown-menu-right",
                role: "menu"
            });
            for (let j in _w_item.subMenu) {
                if (isNaN(j)) continue;
                let _w_subItem = _w_item.subMenu[j];
                let $_w_li = $("<li />");
                let $_w_link = $("<a />", {
                    href: "#"
                });
                $_w_link.append($("<span />", {
                    class: _w_subItem.iconClass,
                    "aria-hidden": true
                }));
                $_w_link.append(" " + _w_subItem.name);
                $_w_li.append($_w_link);
                $_w_menu.append($_w_li);
                $_w_link.on("click", _w_subItem.fun);
            }
            $_w_menuGrp.append($_w_menu);
            $_w_selectMenu.append($_w_menuGrp);
        } else {
            let $_w_button = $("<button />", {
                class: "btn btn-default"
            });
            $_w_button.append($("<span />", {
                class: _w_item.iconClass,
                "aria-hidden": true
            }));
            _w_item.showText && $_w_button.append(" " + _w_item.name);
            $_w_selectMenu.append($_w_button);
            $_w_button.on("click", _w_item.fun);
        }
    }
    $(document).on("keydown", (function(e) {
        if (_o_isTargetInput(e)) return;
        if ($("#download_confirm_dlg").length > 0) return true;
        e.which == 88 && e.shiftKey && e.altKey && _o_closeAllRelativePage();
        e.which == 86 && e.ctrlKey == false && e.altKey == false && _o_switchViewMode();
        e.which == 68 && e.ctrlKey && _o_downloadSelected() & e.preventDefault();
        e.which == 109 && !e.ctrlKey && _o_unSelectViewing() & e.preventDefault();
        e.which == 107 && !e.ctrlKey && _o_selectViewing() & e.preventDefault();
        (e.which == 46 || e.which == 110) && _o_deleteSelected() & e.preventDefault();
        if ($("#cboxOverlay, .modal-dialog").is(":visible")) return true;
        e.which == 65 && e.ctrlKey && _o_selectAll() & e.preventDefault();
        e.which == 90 && e.ctrlKey && _o_unSelectAll() & e.preventDefault();
        e.which == 82 && e.ctrlKey && _o_reverseSelect() & e.preventDefault();
        e.which == 83 && e.ctrlKey && _o_keepSelected() & e.preventDefault();
        e.which == 70 && e.ctrlKey && _o_saveFavorite() & e.preventDefault();
        e.which == 77 && e.altKey && _o_menuSwitchRoll() & e.preventDefault();
        e.which == 83 && e.altKey && _o_sortSwitchRoll() & e.preventDefault();
        e.which == 84 && e.altKey && _o_resolutionTleSwitchRoll() & e.preventDefault();
    }));
    let _w_thirdPartSearchMenuData = [ {
        name: _MSG_("ext_menu_preview"),
        showText: true,
        className: "imageContextMenuURL",
        iconClass: "glyphicon glyphicon-picture",
        fun: function() {
            let _w_itemId = $(this).attr("data-id");
            $(".imageItem[data-id='" + _w_itemId + "']").addClass("preview_ignore_configure").trigger("click");
        }
    }, {
        name: _MSG_("ext_menu_direct_download"),
        showText: true,
        className: "imageContextMenuURL",
        iconClass: "glyphicon glyphicon-download",
        fun: function() {
            let _w_imgUrl = $(this).attr("data-src");
            _o_directDownload(_w_imgUrl, true);
        }
    }, {
        name: _MSG_("ext_menu_generate_qrcode_for_image"),
        showText: true,
        className: "imageContextMenuURL",
        iconClass: "glyphicon glyphicon-qrcode",
        fun: function() {
            $(this).attr("data-src") && _o_createQRCode($(this).attr("data-src"), true);
        }
    }, {
        name: _MSG_("ext_menu_item_send_to_image_editor"),
        showText: true,
        className: "imageContextMenuURLE",
        iconClass: "glyphicon glyphicon-edit",
        fun: function() {
            $(this).attr("data-src") && _o_getBackground()._o_bianjiImage($(this).attr("data-src"), $(this).attr("data-referer"), -1);
        }
    }, {
        name: _MSG_("ext_menu_item_send_to_image_editor_as_watermark"),
        showText: true,
        className: "imageContextMenuURLE",
        iconClass: "glyphicon glyphicon-picture",
        fun: function() {
            $(this).attr("data-src") && _o_getBackground()._o_sendAsWatermark($(this).attr("data-src"), $(this).attr("data-referer"), -1);
        }
    }, {
        name: _MSG_("ext_menu_item_find_other_size_on_google"),
        showText: true,
        className: "imageContextMenuURL",
        iconClass: "fa fa-google fa-lg",
        fun: function() {
            $(this).attr("data-src") && _o_googleViewAllSize($(this).attr("data-src"));
        }
    }, {
        name: _MSG_("ext_menu_item_find_similar_image_on_google"),
        showText: true,
        className: "imageContextMenuURL",
        iconClass: "fa fa-google fa-lg",
        fun: function() {
            $(this).attr("data-src") && _o_googleViewAnalogous($(this).attr("data-src"));
        }
    }, {
        name: _MSG_("ext_menu_item_find_related_info_on_google"),
        showText: true,
        className: "imageContextMenuURL",
        iconClass: "fa fa-google fa-lg",
        fun: function() {
            $(this).attr("data-src") && _o_googleRelativeInfo($(this).attr("data-src"));
        }
    }, {
        name: _MSG_("ext_menu_item_find_other_size_on_sogou"),
        showText: true,
        className: "imageContextMenuURL",
        iconClass: "fa fa-paw",
        fun: function() {
            $(this).attr("data-src") && _o_sogouViewAllSize($(this).attr("data-src"));
        }
    }, {
        name: _MSG_("ext_menu_item_find_related_info_on_sogou"),
        showText: true,
        className: "imageContextMenuURL",
        iconClass: "fa fa-paw",
        fun: function() {
            $(this).attr("data-src") && _o_sogouRelativeInfo($(this).attr("data-src"));
        }
    } ];
    _w_data = _w_data.slice(0, 0).concat(_w_thirdPartSearchMenuData).concat(_w_data.slice(0));
    let $_w_ul = $("<ul />", {
        class: "dropdown-menu",
        role: "menu",
        style: "z-index:9999;"
    });
    for (let i in _w_data) {
        if (isNaN(i)) continue;
        let _w_item = _w_data[i];
        if (_w_item.subMenu) {
            let _w_subData = _w_item.subMenu;
            for (let j in _w_subData) {
                if (isNaN(j)) continue;
                let _w_subItem = _w_subData[j];
                let $_w_itemLi = $("<li />", {
                    role: "presentation"
                });
                let $_w_menuItem = $("<a />", {
                    role: "menuitem",
                    class: _w_subItem.className,
                    tabIndex: "-1",
                    href: "#"
                });
                $_w_menuItem.append($("<span />", {
                    class: _w_subItem.iconClass
                }));
                $_w_menuItem.append(" " + _w_subItem.name);
                $_w_itemLi.append($_w_menuItem);
                $_w_ul.append($_w_itemLi);
                $_w_menuItem.on("click", _w_subItem.fun);
            }
            continue;
        }
        let $_w_itemLi = $("<li />", {
            role: "presentation"
        });
        let $_w_menuItem = $("<a />", {
            role: "menuitem",
            class: _w_item.className,
            tabIndex: "-1",
            href: "#"
        });
        $_w_menuItem.append($("<span />", {
            class: _w_item.iconClass
        }));
        $_w_menuItem.append(" " + _w_item.name);
        $_w_itemLi.append($_w_menuItem);
        $_w_menuItem.on("click", _w_item.fun);
        $_w_ul.append($_w_itemLi);
    }
    $_w_ul.on("mousedown mousemove mouseup click", (function(e) {}));
    $("body").append($_w_ul);
    $_w_ul.dropdown();
    $_w_ul.hide();
    $(document).on("keydown scroll", (function(e) {
        (e.which == 27 || e.type == "scroll") && $_w_ul.fadeOut("fast");
    }));
    $("html").on("click", (function(e) {
        $_w_ul.fadeOut("fast");
    }));
    $_w_ul.on("click", (function(e) {
        $_w_ul.fadeOut("fast");
    }));
    $(document).on("contextmenu", (function(e) {
        $(".context_menu").hide();
        $_w_ul.hide();
        if ($(".modal-dialog").is(":visible") || $("#colorbox").is(":visible")) {
            return true;
        }
        let $_w_targetElement = $(e.target.parentElement);
        if ($_w_targetElement && $_w_targetElement.hasClass("imageItem")) {
            $(".imageContextMenuURLE").attr("data-src", $_w_targetElement.attr("data-src")).attr("data-id", $_w_targetElement.attr("data-id")).attr("data-referer", $_w_targetElement.attr("data-referer")).show();
            if ($_w_targetElement.attr("data-src").indexOf("data:") != 0) {
                $(".imageContextMenuURL").attr("data-src", $_w_targetElement.attr("data-src")).attr("data-id", $_w_targetElement.attr("data-id")).attr("data-referer", $_w_targetElement.attr("data-referer")).show();
            } else {
                $(".imageContextMenuURL").attr("data-src", "").hide();
            }
            $(".mainMenuItem").hide();
        } else {
            $(".imageContextMenuURLE").attr("data-src", "").hide();
            $(".imageContextMenuURL").attr("data-src", "").hide();
            $(".mainMenuItem").show();
        }
        $_w_ul.css("left", e.pageX + "px").css("top", e.pageY + "px");
        $_w_ul.fadeIn("fast");
        $_w_ul.offset().left + $_w_ul.outerWidth() >= window.scrollX + window.innerWidth && $_w_ul.css("left", e.pageX - $_w_ul.outerWidth() + "px");
        $_w_ul.offset().top + $_w_ul.outerHeight() >= window.scrollY + window.innerHeight && $_w_ul.css("top", e.pageY - $_w_ul.outerHeight() + "px");
        return false;
    }));
    let $_w_imageSummary = $("#image_summary");
    let $_w_imageAmount = $("<span />", {
        id: "image_amount",
        role: "presentation",
        class: "badge",
        text: "0"
    });
    let $_w_imageAmountLbl = $("<label />", {
        class: "col-md-4 col-sm-4"
    });
    $_w_imageAmountLbl.append(_MSG_("ext_header_summary_amount"));
    $_w_imageAmountLbl.append($_w_imageAmount);
    $_w_imageSummary.append($_w_imageAmountLbl);
    let $_w_visibleAmount = $("<span />", {
        id: "visible_amount",
        role: "presentation",
        class: "badge",
        text: "0"
    });
    let $_w_visibleAmountLbl = $("<label />", {
        class: "col-md-4 col-sm-4"
    });
    $_w_visibleAmountLbl.append(_MSG_("ext_header_summary_visible"));
    $_w_visibleAmountLbl.append($_w_visibleAmount);
    $_w_imageSummary.append($_w_visibleAmountLbl);
    let $_w_selectAmount = $("<span />", {
        id: "select_amount",
        role: "presentation",
        class: "badge",
        text: "0"
    });
    let $_w_selectAmountLbl = $("<label />", {
        class: "col-md-4 col-sm-4"
    });
    $_w_selectAmountLbl.append(_MSG_("ext_header_summary_selected"));
    $_w_selectAmountLbl.append($_w_selectAmount);
    $_w_imageSummary.append($_w_selectAmountLbl);
    let $_w_menuSwitch = $("#menu_switch");
    let $_w_menuSwitchGrp = $("<div />", {
        class: "btn-group btn-group-xs"
    });
    $_w_menuSwitch.append($_w_menuSwitchGrp);
    let $_w_filterSwitch = $("<div />", {
        class: "btn btn-default",
        id: "filter_switch",
        title: _MSG_("ext_menu_btn_filter_menu_switch")
    });
    let $_w_filterSwitchIcon = $("<span />", {
        class: "glyphicon glyphicon-filter"
    });
    $_w_filterSwitch.append($_w_filterSwitchIcon);
    $_w_filterSwitch.on("click", (function() {
        let _w_newStatus = _o_getBackground()._o_getMenuStatus();
        if ($(this).hasClass("active")) {
            _w_newStatus &= ~1;
        } else {
            _w_newStatus |= 1;
        }
        _o_getBackground()._o_setMenuStatus(_w_newStatus);
        _o_dynamicRender("#ext_main>.imageItem", true, false);
    }));
    $_w_menuSwitchGrp.append($_w_filterSwitch);
    let $_w_selectMenuSwitch = $("<div />", {
        class: "btn btn-default",
        id: "select_menu_switch",
        title: _MSG_("ext_menu_btn_operation_menu_switch")
    });
    let $_w_selectMenuSwitchIcon = $("<span />", {
        class: "glyphicon glyphicon-tasks"
    });
    $_w_selectMenuSwitch.append($_w_selectMenuSwitchIcon);
    $_w_selectMenuSwitch.on("click", (function() {
        let _w_newStatus = _o_getBackground()._o_getMenuStatus();
        if ($(this).hasClass("active")) {
            _w_newStatus &= ~2;
        } else {
            _w_newStatus |= 2;
        }
        _o_getBackground()._o_setMenuStatus(_w_newStatus);
        _o_dynamicRender("#ext_main>.imageItem", true, false);
    }));
    $_w_menuSwitchGrp.append($_w_selectMenuSwitch);
    let $_w_sortSwitch = $("<div />", {
        class: "btn btn-default",
        id: "sort_switch",
        title: _MSG_("ext_menu_btn_sort_switch")
    });
    let $_w_sortSwitchIcon = $("<span />", {
        class: "glyphicon glyphicon-sort-by-order-alt"
    });
    $_w_sortSwitch.append($_w_sortSwitchIcon);
    $_w_sortSwitch.on("click", _o_sortSwitchRoll);
    $_w_menuSwitchGrp.append($_w_sortSwitch);
    let $_w_resolutionTleSwitch = $("<div />", {
        class: "btn btn-default",
        id: "resolutionTle_switch",
        title: _MSG_("ext_menu_btn_resolution_show_switch")
    });
    let $_w_resolutionTleSwitchIcon = $("<span />", {
        class: "glyphicon glyphicon-text-background"
    });
    $_w_resolutionTleSwitch.append($_w_resolutionTleSwitchIcon);
    $_w_resolutionTleSwitch.on("click", _o_resolutionTleSwitchRoll);
    $_w_menuSwitchGrp.append($_w_resolutionTleSwitch);
    let $_w_activeExtractedPageBtn = $("<div />", {
        class: "btn btn-success",
        title: _MSG_("ext_menu_btn_switch_to_origin_page")
    });
    $_w_activeExtractedPageBtn.on("click", (function() {
        chrome.tabs.get(_o_tabId, (function(tab) {
            if (tab && _o_tabUrl == tab.url) {
                chrome.tabs.update(tab.id, {
                    active: true
                }, (function() {}));
            }
        }));
    }));
    $_w_activeExtractedPageBtn.append($("<span />", {
        class: "fa fa-exchange-alt"
    }));
    let $_w_closeAllRelativePageBtn = $("<div />", {
        class: "btn btn-danger",
        title: _MSG_("ext_menu_btn_close_origin_page")
    });
    $_w_closeAllRelativePageBtn.on("click", _o_closeAllRelativePage);
    $_w_closeAllRelativePageBtn.append($("<span />", {
        class: "glyphicon glyphicon-remove"
    }));
    $_w_menuSwitch.append($("<div />", {
        class: "btn-group btn-group-xs"
    }).append($_w_activeExtractedPageBtn).append($_w_closeAllRelativePageBtn));
    let $_w_filterMenuType = $("#filter_menu_type");
    $_w_filterMenuType.append($("<label />", {
        text: _MSG_("ext_menu_label_ext_type"),
        class: "col-md-2"
    }));
    let _w_filter_type = _o_filter_image_type.slice(0);
    _w_filter_type.unshift("all");
    _w_filter_type.push("other");
    let $_w_typeItemContainer = $("<div />", {
        class: "btn-toolbar",
        role: "toolbar"
    });
    for (let i in _w_filter_type) {
        if (isNaN(i)) continue;
        let $_w_typeButton = $("<div />", {
            class: "btn btn-default btn-xs imageType btn-pwd active",
            value: _w_filter_type[i],
            text: _w_filter_type[i].toUpperCase()
        });
        let $_w_counter = $("<span />", {
            id: "counter_" + _w_filter_type[i],
            role: "presentation",
            class: "badge",
            text: "0"
        });
        $_w_typeButton.append($_w_counter);
        if (_w_filter_type[i] != "all") $_w_typeButton.hide();
        $_w_typeItemContainer.append($_w_typeButton);
    }
    $_w_filterMenuType.append($_w_typeItemContainer);
    $("#filter_menu_type .imageType").click((function(e) {
        $(this).hasClass("active") ? $(this).removeClass("btn-pwd active") : $(this).addClass("btn-pwd active");
        if ($(this).attr("value") == "all") {
            $(this).hasClass("active") ? $(this).siblings().addClass("btn-pwd active") : $(this).siblings().removeClass("btn-pwd active");
        }
        $("#filter_menu_type .imageType[value!=all]:not(.active)").length > 0 ? $("#filter_menu_type .imageType[value=all]").removeClass("btn-pwd active") : $("#filter_menu_type .imageType[value=all]").addClass("btn-pwd active");
        _o_dynamicRender("#ext_main>.imageItem", true, false);
    }));
    let _w_size_select_type = [ {
        name: _MSG_("ext_menu_item_larger"),
        value: "larger",
        active: true
    }, {
        name: _MSG_("ext_menu_item_exact"),
        value: "exact"
    } ];
    let _o_image_size_ext = [];
    for (let item in _o_image_size) {
        _o_image_size_ext[item] = _o_image_size[item];
    }
    _o_image_size_ext.unshift("all");
    _o_image_size_ext["all"] = {
        width: 0,
        height: 0
    };
    _o_image_size_ext.push("other");
    _o_image_size_ext["other"] = {
        width: 0,
        height: 0
    };
    let $_w_filterMenuSize = $("#filter_menu_size");
    $_w_filterMenuSize.append($("<label />", {
        text: _MSG_("ext_menu_label_resolution"),
        class: "col-md-2 form-horizontal"
    }));
    let $_w_sizeOptionContainer_wrapper = $("<div />", {
        class: "col-md-offset-2"
    });
    let $_w_sizeOptionContainer = $("<div />", {
        class: "btn-toolbar",
        role: "toolbar"
    });
    for (let i in _w_size_select_type) {
        if (isNaN(i)) continue;
        let $_w_selectTypeButton = $("<div />", {
            class: "btn btn-default btn-xs selectType",
            value: _w_size_select_type[i].value,
            text: _w_size_select_type[i].name
        });
        _w_size_select_type[i].active && $_w_selectTypeButton.addClass("btn-pwd active");
        $_w_sizeOptionContainer.append($_w_selectTypeButton);
    }
    let _o_image_size_funnel = [];
    for (let item in _o_image_size) {
        _o_image_size_funnel[item] = _o_image_size[item];
    }
    let _w_optName = _o_minRect.width + "x" + _o_minRect.height + _MSG_("ext_menu_funnel_option_def");
    _o_image_size_funnel.unshift(_w_optName);
    _o_image_size_funnel[_w_optName] = {
        width: _o_minRect.width,
        height: _o_minRect.height
    };
    let _w_funnelOptionSelect = document.createElement("select");
    _w_funnelOptionSelect.setAttribute("id", "funnelOptionSelect");
    for (let i in _o_image_size_funnel) {
        if (isNaN(i)) continue;
        let _w_funnelOption = document.createElement("option");
        _w_funnelOption.value = _o_image_size_funnel[i];
        _w_funnelOption.text = _o_image_size_funnel[i];
        _w_funnelOptionSelect.appendChild(_w_funnelOption);
        i == 0 && (_w_funnelOption.selected = true);
    }
    let $_w_funnelOptionSelectLabel = $("<span />", {
        class: "ext_page_input"
    });
    $_w_funnelOptionSelectLabel.append($("<b />", {
        text: _MSG_("ext_menu_label_funnel")
    }));
    $_w_funnelOptionSelectLabel.append(_w_funnelOptionSelect);
    $_w_sizeOptionContainer.append($_w_funnelOptionSelectLabel);
    $(_w_funnelOptionSelect).on("change", (function() {
        let _w_selectedOptn = _o_image_size_funnel[_w_funnelOptionSelect.selectedOptions[0].value];
        _o_minRect.width = _w_selectedOptn.width;
        _o_minRect.height = _w_selectedOptn.height;
        let _w_removeList = [];
        $("#ext_main .imageItem").each((function() {
            if ($(this).attr("data-width") - _w_selectedOptn.width < 0 || $(this).attr("data-height") - _w_selectedOptn.height < 0) {
                $(this).remove();
            }
        }));
        $(this).blur();
        _o_dynamicRender("#ext_main>.imageItem", true, false);
    }));
    $_w_sizeOptionContainer_wrapper.append($_w_sizeOptionContainer);
    $_w_filterMenuSize.append($_w_sizeOptionContainer_wrapper);
    let $_w_sizeItemContainer_wrapper = $("<div />", {
        class: "col-md-offset-2"
    });
    let $_w_sizeItemContainer = $("<div />", {
        class: "btn-toolbar",
        role: "toolbar"
    });
    for (let i in _o_image_size_ext) {
        if (isNaN(i)) continue;
        let $_w_selectOptionButton = $("<div />", {
            class: "btn btn-default btn-xs selectOption btn-pwd active",
            value: _o_image_size_ext[i],
            text: _o_image_size_ext[i].toUpperCase()
        });
        if (_o_image_size_ext[i] != "all") $_w_selectOptionButton.hide();
        $_w_sizeItemContainer.append($_w_selectOptionButton);
    }
    $_w_sizeItemContainer_wrapper.append($_w_sizeItemContainer);
    $_w_filterMenuSize.append($_w_sizeItemContainer_wrapper);
    $("#filter_menu_size .selectType").click((function() {
        $(this).addClass("btn-pwd active").siblings().removeClass("btn-pwd active");
        $("#filter_menu_size .selectOption").addClass("btn-pwd active");
        _o_dynamicRender("#ext_main>.imageItem", true, false);
    }));
    $("#filter_menu_size .selectOption").click((function() {
        if ($("#filter_menu_size .selectType[value=larger]").hasClass("active")) {
            if ($(this).attr("value") == "all") {
                $(this).addClass("btn-pwd active").siblings().addClass("btn-pwd active");
            } else {
                $(this).addClass("btn-pwd active").siblings().removeClass("btn-pwd active");
            }
        } else if ($("#filter_menu_size .selectType[value=exact]").hasClass("active")) {
            $(this).hasClass("active") ? $(this).removeClass("btn-pwd active") : $(this).addClass("btn-pwd active");
            if ($(this).attr("value") == "all") {
                $(this).hasClass("active") ? $(this).siblings().addClass("btn-pwd active") : $(this).siblings().removeClass("btn-pwd active");
            } else {
                $("#filter_menu_size .selectOption[value!=all]:not(.active)").length > 0 ? $("#filter_menu_size .selectOption[value=all]").removeClass("btn-pwd active") : $("#filter_menu_size .selectOption[value=all]").addClass("btn-pwd active");
            }
        }
        _o_dynamicRender("#ext_main>.imageItem", true, false);
    }));
    let $_w_filterMenuRegexp = $("#filter_menu_regexp");
    $_w_filterMenuRegexp.append($("<label />", {
        text: _MSG_("ext_menu_label_regexp"),
        class: "col-md-2"
    }));
    let $_w_filterMenuRegexpContainer = $("<div />", {
        class: "col-md-offset-2 btn-toolbar",
        role: "toolbar"
    });
    let $_w_filterMenuRegexpInput = $("<input />", {
        id: "urlRegexpFilter",
        class: "ext_page_input",
        size: 64,
        placeHolder: "Input Regexp Expression to part/full match URL address."
    });
    $_w_filterMenuRegexpContainer.append($_w_filterMenuRegexpInput);
    $_w_filterMenuRegexp.append($_w_filterMenuRegexpContainer);
    $_w_filterMenuRegexpInput.on("change input", (function() {
        _o_dynamicRender("#ext_main>.imageItem", true, false);
    }));
    _o_dynamicRender("#ext_main>.imageItem", true, true);
    $.getJSON(_o_checkClientURL, (function(data) {
        let $_w_favLink = $("#_cxyz_fav_");
        if (data.shortName) {
            let _w_avatar = data.icon;
            let $_w_userInfo = $("<div />", {
                id: "popup_user_info"
            });
            let $_o_appName = $("<span />", {
                text: " [ " + data.shortName + " ] "
            });
            $_w_userInfo.append($_o_appName);
            $_w_favLink.attr("href", _o_checkClientURL);
            $_w_favLink.append($_w_userInfo);
        } else {}
    }));
}));

function _o_dump_imageMap() {
    let _w_now = new Date;
    let _w_filename = "".concat(_w_now.getFullYear()).concat(_w_now.getDate()).concat(_w_now.getMonth() + 1).concat(_w_now.getHours()).concat(_w_now.getMinutes()).concat(_w_now.getSeconds()).concat(".js");
    let _w_content = "let _o_iterator = ".concat(_o_iterator).concat(";\nlet _o_max_loading = 0;\n").concat("let entityData = ").concat(JSON.stringify(Object.entries(_o_imageMap).filter((function(item) {
        if (isNaN(item[0])) {
            return item;
        }
    })))).concat(";\n");
    _o_downloadText(_w_filename, _w_content);
}

function _o_load_imageMap(_w_entityData) {
    let _w_imageMap = [];
    _w_entityData.forEach((function(item) {
        if (typeof item[0] != "number") {
            _w_imageMap.push(item[0]);
            _w_imageMap[item[0]] = item[1];
        }
    }));
    _o_imageMap = _w_imageMap;
}

function _o_retryFaildImages(_w_bypassFun) {
    if (!_o_img_load_failed_set) return;
    let _w_tasks = Object.keys(_o_img_load_failed_set);
    let _w_intervalTimer = null;
    _w_intervalTimer = setInterval((function() {
        if (_o_loading >= _o_max_loading || $("a.imageItem").length >= _o_max_loaded - _o_loading) {
            return;
        } else {
            if (_w_tasks.length <= 0) {
                clearInterval(_w_intervalTimer);
                return;
            }
            let _w_taskIdx = _w_tasks.shift();
            if (_o_isFunction(_w_bypassFun) && _w_bypassFun(_o_imageMap[_w_taskIdx])) {
                delete _o_img_load_failed_set[_w_taskIdx];
                return;
            }
            _o_showImage(_w_taskIdx, false);
        }
    }), 50);
}

