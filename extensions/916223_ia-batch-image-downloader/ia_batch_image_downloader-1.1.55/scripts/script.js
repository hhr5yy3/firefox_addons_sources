/**
 * ImageAssistant
 * Project Home: http://www.pullywood.com/ImageAssistant/
 * Author: 睡虫子(Joey)
 * Copyright (C) 2013-2020 普利坞(Pullywood.com)
**/
"use strict";

!window._o_ext_serial_id && (window._o_ext_serial_id = 0);

!window.prefetchForImage && (window.prefetchForImage = false);

!window.prefetchForDomImage && (window.prefetchForDomImage = false);

!window.extractorHash && (window.extractorHash = "");

!window._o_attr_sniffed_container && (window._o_attr_sniffed_container = {});

!window._o_attr_sniff_task_executor && (window._o_attr_sniff_task_executor = _o_createTaskExecutePool(8));

function _o_refererLocation(_o_referer) {
    if (_o_referer) {
        return _o_extractUrlWithoutHash(_o_referer);
    } else {
        return _o_extractUrlWithoutHash(window.location.href);
    }
}

function _o_ext_referer(_w_element) {
    let $_w_item;
    if (_w_element instanceof jQuery) {
        $_w_item = _w_element;
    } else {
        $_w_item = $(_w_element);
    }
    return $_w_item.attr("data-referer");
}

function _o_addPageObserver() {
    let _o_imgLoadEventHandle = function() {
        let _o_imageMap = {};
        let _w_image = $(this).get(0);
        let _o_referer = _o_ext_referer(_w_image) ? _o_ext_referer(_w_image) : _o_refererLocation();
        _o_imageMap[_w_image.src] = {
            title: _w_image.title,
            alt: _w_image.alt,
            serial: window._o_ext_serial_id++,
            referer: _o_referer
        };
        _o_pushImages(_o_imageMap);
    };
    $("img").on("load", _o_imgLoadEventHandle);
    let _w_callback = function(_w_records) {
        _w_records.map((function(_w_record) {
            if (_w_record.addedNodes) {
                let _o_imageMap = {};
                for (let i = 0; i < _w_record.addedNodes.length; ++i) {
                    let _w_dom = _w_record.addedNodes.item(i);
                    let _w_links = $(_w_dom).find("a").toArray();
                    $(_w_dom).is("A") && _w_links.push(_w_dom);
                    for (let j = 0; j < _w_links.length; ++j) {
                        let _w_link = _w_links[j];
                        let _w_extractedMap = _o_extractImageFromLink(_w_link, _o_refererLocation());
                        for (let imgUrl in _w_extractedMap) {
                            _o_imageMap[imgUrl] = _w_extractedMap[imgUrl];
                        }
                        _o_digElement(_w_link, _o_refererLocation());
                    }
                    let _w_images = $(_w_dom).find("img").toArray();
                    $(_w_dom).is("IMG") && _w_images.push(_w_dom);
                    let _w_serial_id_mark_0 = 0;
                    window._o_ext_serial_id = (_w_serial_id_mark_0 = window._o_ext_serial_id) + _w_images.length;
                    $(_w_images).on("load", _o_imgLoadEventHandle);
                    for (let j = 0; j < _w_images.length; ++j) {
                        let _w_image = _w_images[j];
                        let _o_referer = null;
                        if (_w_image.src) {
                            _o_referer = _o_ext_referer(_w_image) ? _o_ext_referer(_w_image) : _o_refererLocation();
                            _o_imageMap[_w_image.src] = {
                                title: _w_image.title,
                                alt: _w_image.alt,
                                serial: _w_serial_id_mark_0++,
                                referer: _o_referer
                            };
                        }
                        _o_digElement(_w_image, _o_referer);
                    }
                    let _w_elements = $(_w_dom).find("*").toArray();
                    _w_elements.push(_w_dom);
                    let _w_serial_id_mark_1 = 0;
                    window._o_ext_serial_id = (_w_serial_id_mark_1 = window._o_ext_serial_id) + _w_elements.length;
                    for (let j = 0; j < _w_elements.length; ++j) {
                        let _w_imageSrc = _o_extractBackground(_w_elements[j]);
                        if (_w_imageSrc && _w_imageSrc.length > 0) {
                            _o_imageMap[_w_imageSrc] = {
                                title: "",
                                alt: "",
                                serial: _w_serial_id_mark_1++,
                                referer: _o_refererLocation()
                            };
                        }
                    }
                    $(_w_elements).trigger("mouseover");
                    for (let j = 0; j < _w_links.length; ++j) {
                        let _w_link = _w_links[j];
                        _o_prefetchExtract(_w_link);
                    }
                }
                _o_pushImages(_o_imageMap);
            }
        }));
    };
    let _w_observer = new MutationObserver(_w_callback);
    let _w_target = document.body;
    let _w_options = {
        childList: true,
        subtree: true
    };
    _w_observer.observe(_w_target, _w_options);
    $("*").trigger("mouseover");
}

function _o_extractBackground(_w_elem) {
    let _w_imageSrcs = [];
    try {
        let _w_bgImg = $(_w_elem).css("background-image");
        if (_w_bgImg && _w_bgImg.match(/url\((['"]?)(.*?)\1\)/gi)) {
            let _w_matches = _w_bgImg.match(/url\((['"]?)(.*?)\1\)/gi);
            for (let idx in _w_matches) {
                let _w_match = /url\((['"]?)(.*?)\1\)/gi.exec(_w_matches[idx]);
                _w_imageSrcs.push(_w_match[2]);
            }
        }
    } catch (exception) {}
    return _w_imageSrcs;
}

function _o_extractImageFromLink(_w_link, _o_referer) {
    let _o_imageMap = {};
    if (!_w_link || !_w_link.href) {
        return _o_imageMap;
    }
    let _w_aHref = _o_pathConvert(_o_referer, _w_link.getAttribute("href"));
    let _o_referer0 = _o_ext_referer(_w_link) ? _o_ext_referer(_w_link) : _o_referer;
    if (_o_image_extension.indexOf(_w_link.pathname.substring(_w_link.pathname.lastIndexOf(".") + 1).toLowerCase()) != -1) {
        _o_imageMap[_w_aHref] = {
            title: _w_link.title,
            alt: "",
            serial: window._o_ext_serial_id++,
            referer: _o_referer0
        };
    }
    let _o_referer1 = _o_ext_referer(_w_link) ? _o_ext_referer(_w_link) : _w_aHref;
    let _w_imgUrlArray = _o_extImageUrlFromURLSearch(_w_link.search);
    if (_w_imgUrlArray && _w_imgUrlArray.length > 0) {
        let _w_serial_id_mark_2 = 0;
        window._o_ext_serial_id = (_w_serial_id_mark_2 = window._o_ext_serial_id) + _w_imgUrlArray.length;
        let _w_packExtractedImagesFun = function(_w_judgedReferer) {
            let _o_prefetchedRefererImageMap = {};
            for (let idx in _w_imgUrlArray) {
                let _w_imgUrl = _w_imgUrlArray[idx];
                if (_o_imageMap[_w_imgUrl]) continue;
                _o_prefetchedRefererImageMap[_w_imgUrl] = {
                    title: "",
                    alt: "",
                    serial: _w_serial_id_mark_2++,
                    referer: _w_judgedReferer
                };
            }
            _o_pushImages(_o_prefetchedRefererImageMap);
        };
        let _o_PrefetchedDataHandle = function(_w_data, _w_status, _w_xhr) {
            if (_w_status == "success") {
                let _w_contentType = _w_xhr.getResponseHeader("Content-Type");
                if (_w_contentType && _w_contentType.indexOf("html") < 0) {
                    _w_packExtractedImagesFun(_o_referer);
                } else {
                    let _w_parseHTMLDocument = document.implementation.createHTMLDocument("parseHTMLDocument");
                    let _w__html = _w_parseHTMLDocument.createElement("html");
                    _w__html.innerHTML = DOMPurify.sanitize(_w_data);
                    let $_w_doc = $(_w__html);
                    _o_transferPageInfo(_o_referer1, $_w_doc);
                    if ($_w_doc.find("a").length > 0 || $_w_doc.find("img").length > 0) {
                        _w_packExtractedImagesFun(_o_referer1);
                    } else {
                        _w_packExtractedImagesFun(_o_referer);
                    }
                }
            } else {
                _w_packExtractedImagesFun(_o_referer);
            }
        };
        let _w_ajaxParam = {
            method: "get",
            url: _o_referer1,
            headers: {
                Accept: "*/*; charset=UTF-8",
                "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0, post-check=0, pre-check=0",
                Pragma: "no-cache",
                Expires: "0",
                "IA-Tag": window.extractorHash
            }
        };
        _o_ajaxCallback(_w_ajaxParam, _o_PrefetchedDataHandle);
    }
    return _o_imageMap;
}

function _o_extImageUrlFromURLSearch(_w_urlSearch) {
    let _w_imageSrcArr = [];
    if (_w_urlSearch && _w_urlSearch.length > 4) {
        let _w_paramArr = _w_urlSearch.substring(1).split("&");
        for (let j = 0; j < _w_paramArr.length; ++j) {
            if (_w_paramArr[j].length > 0 && _w_paramArr[j].split("=").length == 2) {
                let _w_paramValue = _w_paramArr[j].split("=")[1];
                _w_paramValue = _o_decodeUrl(_w_paramValue);
                if (_o_isAccessibleUrl(_w_paramValue)) {
                    let _w_paramLink = new URL(_w_paramValue);
                    if (_o_image_extension.indexOf(_w_paramLink.pathname.substring(_w_paramLink.pathname.lastIndexOf(".") + 1).toLowerCase()) != -1) {
                        if (_w_imageSrcArr.indexOf(_w_paramLink.href) < 0) _w_imageSrcArr.push(_w_paramLink.href);
                    }
                }
            }
        }
    }
    return _w_imageSrcArr;
}

function _o_extractImage(_o_fetchLevel, _w_extHash) {
    chrome.runtime.sendMessage(chrome.runtime.id, {
        type: "_o_qingQiuWeiYiID"
    }, (function callback(_w_serialId) {
        window._o_ext_serial_id = _w_serialId * 1e8;
        _o_extractImage_do(_o_fetchLevel, _w_extHash);
    }));
}

function _o_transferPageInfo(_w_url, $_w_body) {
    let _o_pageInfo = {};
    _o_pageInfo["url"] = _w_url;
    _o_pageInfo["title"] = $_w_body.find("title").text();
    chrome.runtime.sendMessage(chrome.runtime.id, {
        type: "_o_gengxiYeMXinxi",
        extractorHash: extractorHash,
        pageInfo: _o_pageInfo
    });
}

function _o_continousUpdatePageInfo() {
    let _w_intervalFun = () => {
        let $_w_body = $("html");
        _o_transferPageInfo(window.location.href, $_w_body);
    };
    setInterval(_w_intervalFun, 2e3);
    _w_intervalFun();
}

function _o_extractImage_do(_o_fetchLevel, _w_extHash) {
    if (window._o_imageExtracted) return;
    window._o_imageExtracted = (new Date).getTime();
    _w_extHash = _w_extHash.substr(0, 32);
    if ((_o_fetchLevel & 1) > 0) {
        window.prefetchForImage = true;
    }
    if ((_o_fetchLevel & 2) > 0) {
        window.prefetchForDomImage = true;
    }
    (!window.extractorHash || window.extractorHash.length == 0) && (window.extractorHash = _w_extHash);
    _o_continousUpdatePageInfo();
    _o_addPageObserver();
    let _o_imageMap = {};
    let _w_images = document.images;
    let _w_serial_id_mark_x = 0;
    window._o_ext_serial_id = (_w_serial_id_mark_x = window._o_ext_serial_id) + _w_images.length;
    for (let i = 0; i < _w_images.length; ++i) {
        let _w_image = _w_images[i];
        if (_w_image.src) {
            let _o_referer = _o_ext_referer(_w_image) ? _o_ext_referer(_w_image) : _o_refererLocation();
            _o_imageMap[_w_image.src] = {
                title: _w_image.title,
                alt: _w_image.alt,
                serial: _w_serial_id_mark_x++,
                referer: _o_referer
            };
        }
        _o_digElement(_w_image, _o_refererLocation());
    }
    let _w_elements = $("*");
    let _w_serial_id_mark_e = 0;
    window._o_ext_serial_id = (_w_serial_id_mark_e = window._o_ext_serial_id) + _w_elements.length;
    for (let i = 0; i < _w_elements.length; ++i) {
        let _w_imageSrcs = _o_extractBackground(_w_elements[i]);
        for (let idx in _w_imageSrcs) {
            let _w_imageSrc = _w_imageSrcs[idx];
            if (_w_imageSrc && _w_imageSrc.length > 0) {
                _o_imageMap[_w_imageSrc] = {
                    title: "",
                    alt: "",
                    serial: _w_serial_id_mark_e++,
                    referer: _o_refererLocation()
                };
            }
        }
    }
    let _w_linkArray = new Array;
    let _w_links = document.links;
    for (let i = 0; i < _w_links.length; ++i) {
        let _w_link = _w_links[i];
        if (_w_link && _w_link.href && _w_linkArray.indexOf(_w_link.href) == -1) {
            _w_linkArray.push(_w_link);
        }
    }
    for (let i = 0; i < _w_linkArray.length; ++i) {
        let _w_link = _w_linkArray[i];
        let _w_extractedMap = _o_extractImageFromLink(_w_link, _o_refererLocation());
        for (let imgUrl in _w_extractedMap) {
            _o_imageMap[imgUrl] = _w_extractedMap[imgUrl];
        }
        _o_digElement(_w_link, _o_refererLocation());
    }
    _o_pushImages(_o_imageMap);
    for (let i = 0; i < _w_linkArray.length; ++i) {
        let _w_link = _w_linkArray[i];
        _o_prefetchExtract(_w_link);
    }
}

function _o_prefetchExtract(_w_link) {
    let _w_url;
    try {
        _w_url = new URL(_w_link);
    } catch (exception) {
        return;
    }
    let _o_referer = _o_ext_referer(_w_link) ? _o_ext_referer(_w_link) : _o_refererLocation();
    if (_w_url.protocol != "http:" && _w_url.protocol != "https:") return;
    if (_o_isServiceSite(window.location.href)) {
        return;
    }
    let _w_image = new Image;
    let _w_prefetchUrlStr = _w_url.href;
    let _w_imageOnLoadFun = function() {
        let _o_imageMap = {};
        _o_imageMap[this.src] = {
            title: "",
            alt: "",
            serial: window._o_ext_serial_id++,
            referer: _o_refererLocation()
        };
        _o_pushImages(_o_imageMap);
    };
    let _w_prefetchForDomFun = function() {
        let _o_PrefetchedDataHandle = function(_w_data, _w_status, _w_xhr) {
            if (_w_status != "success") return;
            let _w_parseHTMLDocument = document.implementation.createHTMLDocument("parseHTMLDocument");
            let _w__html = _w_parseHTMLDocument.createElement("html");
            _w__html.innerHTML = DOMPurify.sanitize(_w_data);
            let $_w_prefetchDoc = $(_w__html);
            _o_transferPageInfo(_w_prefetchUrlStr, $_w_prefetchDoc);
            let $_w_images = $_w_prefetchDoc.find("img");
            let $_w_links = $_w_prefetchDoc.find("a");
            if (_o_isServiceSite(_w_prefetchUrlStr)) {
                $_w_images.each((function() {
                    if ($(this).attr("data-src")) $(this).attr("src", $(this).attr("data-src"));
                }));
                $_w_links.each((function() {
                    if ($(this).attr("data-src")) $(this).attr("href", $(this).attr("data-src"));
                }));
            }
            let _o_imageMap = {};
            let _w_serial_id_mark_x_i = 0;
            window._o_ext_serial_id = (_w_serial_id_mark_x_i = window._o_ext_serial_id) + $_w_images.length;
            for (let i = 0; i < $_w_images.length; ++i) {
                let _w_image = $_w_images[i];
                let _w_imageSrc = _w_image.getAttribute("src");
                if (_w_imageSrc) {
                    _w_imageSrc = _o_pathConvert(_w_prefetchUrlStr, _w_imageSrc);
                    _o_imageMap[_w_imageSrc] = {
                        title: _w_image.title,
                        alt: _w_image.alt,
                        serial: _w_serial_id_mark_x_i++,
                        referer: _o_refererLocation(_w_prefetchUrlStr)
                    };
                }
                _o_digElement(_w_image, _w_prefetchUrlStr);
            }
            for (let j = 0; j < $_w_links.length; ++j) {
                let _w_link = $_w_links[j];
                let _w_extractedMap = _o_extractImageFromLink(_w_link, _w_prefetchUrlStr);
                for (let imgUrl in _w_extractedMap) {
                    _o_imageMap[imgUrl] = _w_extractedMap[imgUrl];
                }
                _o_digElement(_w_link, _w_prefetchUrlStr);
            }
            _o_pushImages(_o_imageMap);
        };
        let _w_ajaxParam = {
            method: "get",
            url: _w_prefetchUrlStr,
            headers: {
                Accept: "*/*; charset=UTF-8",
                "Cache-Control": "no-cache, no-store, must-revalidate, max-age=0, post-check=0, pre-check=0",
                Pragma: "no-cache",
                Expires: "0",
                "IA-Tag": window.extractorHash
            }
        };
        _o_ajaxCallback(_w_ajaxParam, _o_PrefetchedDataHandle);
        _o_isFunction(window._o_prefetch_extend_fun) && window._o_prefetch_extend_fun(_w_link);
    };
    if (prefetchForImage) {
        _w_image.onload = _w_imageOnLoadFun;
        if (prefetchForDomImage) {
            _w_image.onerror = _w_prefetchForDomFun;
            _w_image.onabort = _w_image.onerror;
        }
        _w_image.src = _w_prefetchUrlStr;
    } else if (prefetchForDomImage) {
        _w_prefetchForDomFun();
    }
}

function _o_pushImages(_o_imageMap) {
    if (!_o_imageMap || Object.keys(_o_imageMap).length == 0) return;
    for (let imgSrc in _o_imageMap) {
        if (_o_isServiceSite(window.location.href)) {
            break;
        }
        try {
            let _w_url = new URL(imgSrc);
            let _w_pathname = decodeURIComponent(_w_url.pathname);
            if (_w_pathname.indexOf("http://") >= 0 || _w_pathname.indexOf("https://") >= 0) {
                let _w_urlArray = /https?:\/\/.*/.exec(_w_pathname);
                if (_w_urlArray && _w_urlArray.length > 0 && !_o_imageMap[_w_urlArray[0]]) {
                    let _w_newInfoObj = {};
                    let _w_originalInfoObj = _o_imageMap[imgSrc];
                    let _w_objKeys = Object.keys(_w_originalInfoObj);
                    for (let oIdx in _w_objKeys) {
                        let _w_objKey = _w_objKeys[oIdx];
                        if (typeof _w_objKey != "undefined" && _w_objKey != null) {
                            _w_newInfoObj[_w_objKey] = _w_originalInfoObj[_w_objKey];
                        }
                    }
                    _o_imageMap[_w_urlArray[0]] = _w_newInfoObj;
                }
            }
            let _w_imgUrlArray = _o_extImageUrlFromURLSearch(_w_url.search);
            let _w_serial_id_mark_xxx = 0;
            window._o_ext_serial_id = (_w_serial_id_mark_xxx = window._o_ext_serial_id) + _w_imgUrlArray.length;
            for (let idx in _w_imgUrlArray) {
                let _w_imgUrl = _w_imgUrlArray[idx];
                if (!_o_imageMap[_w_imgUrl]) {
                    let _w_newInfoObj = {};
                    let _w_originalInfoObj = _o_imageMap[imgSrc];
                    let _w_objKeys = Object.keys(_w_originalInfoObj);
                    for (let oIdx in _w_objKeys) {
                        let _w_objKey = _w_objKeys[oIdx];
                        if (typeof _w_objKey != "undefined" && _w_objKey != null) {
                            _w_newInfoObj[_w_objKey] = _w_originalInfoObj[_w_objKey];
                        }
                    }
                    _o_imageMap[_w_imgUrl] = _w_newInfoObj;
                }
            }
        } catch (exception) {}
    }
    chrome.runtime.sendMessage(chrome.runtime.id, {
        type: "_o_pushExtractedImage",
        extractorHash: extractorHash,
        images: _o_imageMap
    });
}

function _o_digElement(_w_element, _o_refererLoc) {
    if (_o_isServiceSite(window.location.href) || _o_isServiceSite(_o_refererLoc)) {
        return;
    }
    let _o_referer = _o_ext_referer(_w_element) ? _o_ext_referer(_w_element) : _o_refererLocation(_o_refererLoc);
    let _w_attributes = _w_element.attributes;
    let _w_length = _w_attributes.length;
    for (let idx = 0; idx < _w_length; ++idx) {
        let _w_attribute = _w_attributes[idx];
        if (_w_attribute.specified && _w_attribute.name != "href" && _w_attribute.name != "src") {
            let _w_regexPattern0 = /^[^'"\s]+?\.(apng|bmp|gif|ico|cur|jpg|jpeg|jfif|pjpeg|pjp|png|svg|tif|tiff|webp)(\?.+)?$/i;
            let _w_regexPattern1 = /^https?:\/\/[^'"\s]+\/[^'"\s]+$/i;
            let _w_regexPattern2 = /(https?:\/\/[^'"\s]+\.(apng|bmp|gif|ico|cur|jpg|jpeg|jfif|pjpeg|pjp|png|svg|tif|tiff|webp))(\?[^'"\s]+)?/gi;
            if (_w_regexPattern0.test(_w_attribute.value) || _w_regexPattern1.test(_w_attribute.value)) {
                let _o_src = _o_pathConvert(_o_refererLoc, _w_attribute.value);
                if (_o_attr_sniffed_container[_o_src]) {
                    continue;
                } else {
                    _o_attr_sniffed_container[_o_src] = true;
                }
                _o_attr_sniff_task_executor.addTask((function(_w_beginFun, _w_endFun) {
                    let _o_pushSniffedImage = function() {
                        let _o_imageMap = {};
                        _o_imageMap[_o_src] = {
                            title: _w_element.title,
                            alt: _w_element.alt,
                            serial: window._o_ext_serial_id++,
                            referer: _o_referer
                        };
                        _o_pushImages(_o_imageMap);
                    };
                    let _w_image = new Image;
                    _w_image.onerror = _w_endFun;
                    _w_image.onabort = _w_image.onerror;
                    _w_image.onload = function() {
                        _w_endFun();
                        _o_pushSniffedImage();
                    };
                    _w_beginFun();
                    _w_image.src = _o_src;
                }));
            } else {
                let _o_imageMap = {};
                let _o_match_result = _w_attribute.value.match(_w_regexPattern2);
                _o_match_result && _o_match_result.forEach((function(_o_src) {
                    _o_imageMap[_o_src] = {
                        title: _w_element.title,
                        alt: _w_element.alt,
                        serial: window._o_ext_serial_id++,
                        referer: _o_referer
                    };
                }));
                if (Object.keys(_o_imageMap).length > 0) {
                    _o_pushImages(_o_imageMap);
                }
            }
        }
    }
}

!window._o_content_and_xhr_sniffer && (window._o_content_and_xhr_sniffer = function() {
    let _o_content_src_list = [];
    let _o_url_container = {};
    setInterval((function() {
        if (!window._o_imageExtracted) return;
        try {
            let _o_com_key = "_o_dbjbempljhcmhlfpfacalomonjpalpko";
            let _w_aInput = document.getElementById(_o_com_key);
            if (_w_aInput) {
                if (_w_aInput.value.length > 0 && _w_aInput.value != _o_com_key) {
                    let _o_parsed_urls = JSON.parse(_w_aInput.value);
                    _o_parsed_urls.forEach((function(_w_src) {
                        if (!_o_url_container[_w_src]) {
                            _o_url_container[_w_src] = true;
                            _o_content_src_list.push(_w_src);
                        }
                    }));
                }
                _w_aInput.value = _o_com_key;
            }
        } catch (ex) {}
        while (_o_content_src_list.length > 0) {
            let _o_src = _o_content_src_list.pop();
            _o_attr_sniff_task_executor.addTask((function(_w_beginFun, _w_endFun) {
                let _w_image = new Image;
                _w_image.onerror = _w_endFun;
                _w_image.onabort = _w_image.onerror;
                _w_image.onload = _w_endFun;
                _w_beginFun();
                _w_image.src = _o_src;
            }));
        }
    }), 512);
    return {
        _o_getLeftUrl: function() {
            return _o_content_src_list.length;
        }
    };
}());