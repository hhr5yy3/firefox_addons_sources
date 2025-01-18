/**
 * ImageAssistant
 * Project Home: http://www.pullywood.com/ImageAssistant/
 * Author: 睡虫子(Joey)
 * Copyright (C) 2013-2020 普利坞(Pullywood.com)
**/
"use strict";

function _o_imageRefererUpdate($_w_images) {
    let _w_refererMap = {};
    $_w_images.each((function() {
        let _w_dataSrc = $(this).attr("data-src");
        let _w_dataReferer = $(this).attr("data-referer");
        if (_w_dataSrc) {
            _w_refererMap[_w_dataSrc] = _w_dataReferer;
            $(this).attr("data-src", _w_dataSrc);
            _w_refererMap[_w_dataSrc] = _w_dataReferer;
        }
    }));
    if (Object.keys(_w_refererMap).length > 0) {
        chrome.runtime.sendMessage(chrome.runtime.id, {
            type: "_o_refererShujuUpdated",
            refererMap: _w_refererMap
        }, (function callback(data) {
            $_w_images.each((function() {
                $(this).on("error", (function() {
                    let _w_imgSrc = $(this).attr("data-src");
                    let $_w_img = $(this);
                    $.ajax({
                        method: "get",
                        timeout: _o_ajax_request_timeout,
                        url: _w_imgSrc
                    }).fail((function(xhr) {
                        if (xhr.status === 404) {
                            _w_imgSrc = _o_RestoreUrlFromServiceSite(_w_imgSrc);
                            $_w_img.attr("data-src", _w_imgSrc);
                        }
                    })).always((function() {
                        setTimeout((function() {
                            $_w_img.removeAttr("src").attr("src", _w_imgSrc);
                        }), 2e3);
                    }));
                }));
                if ($(this).attr("src").indexOf("/static/gallery/favorite/image/loading.gif") >= 0 || $(this).attr("src").indexOf("/static/gallery/favorite/image/folder_02.png") >= 0) {
                    $(this).attr("src", $(this).attr("data-src"));
                } else {
                    (new Image).src = $(this).attr("data-src");
                }
            }));
        }));
    }
}

(function() {
    _o_imageRefererUpdate($("img[data-src]"));
    let _w_observer = new MutationObserver((function(_w_records) {
        _w_records.map((function(record) {
            if (record.addedNodes) {
                let _o_imageMap = {};
                for (let i = 0; i < record.addedNodes.length; ++i) {
                    let _w_dom = record.addedNodes.item(i);
                    let _w_images = $(_w_dom).find("img").toArray();
                    $(_w_dom).is("IMG") && _w_images.push(_w_dom);
                    _o_imageRefererUpdate($(_w_images));
                }
            }
        }));
    }));
    let _w_target = document.body;
    let _w_options = {
        childList: true,
        subtree: true
    };
    _w_observer.observe(_w_target, _w_options);
    if ($(".cxyz_btn_edit_folder").length > 0) {
        let $_w_toobar = $(".callout_btn_menu");
        let $_w_folderMarkBtn = $("<button />", {
            class: "btn btn-success",
            title: " 标记收藏到此文件夹"
        }).prepend($("<span />", {
            class: "glyphicon glyphicon-map-marker"
        }));
        $_w_toobar.append($_w_folderMarkBtn);
        $_w_folderMarkBtn.on("click", (function() {
            let _w_folderMark = {};
            _w_folderMark.markTime = parseInt((new Date).getTime() / 1e3);
            _w_folderMark.categoryId = parseInt($(".cxyz_btn_edit_folder").attr("data-categoryId"));
            _w_folderMark.folderId = parseInt($(".cxyz_btn_edit_folder").attr("value"));
            chrome.runtime.sendMessage(chrome.runtime.id, {
                type: "_o_biaojiMuLu",
                folderMark: JSON.stringify(_w_folderMark)
            });
            let $_w_msg = $("<span>(标记成功！)</span>");
            $(this).append($_w_msg);
            setTimeout((function() {
                $_w_msg.remove();
            }), 2e3);
        }));
    }
    if ($("#rs_lt_list").length > 0 || $("#rs_eq_list").length > 0) {
        chrome.runtime.sendMessage(chrome.runtime.id, {
            type: "_o_huoquTupianOptions"
        }, (function(_o_image_size) {
            let $_w_rs_lt_list = $("#rs_lt_list");
            let $_w_rs_eq_list = $("#rs_eq_list");
            if (_o_image_size.length > 0) {
                if ($_w_rs_lt_list) $_w_rs_lt_list.append($("<li />", {
                    class: "divider",
                    role: "separator"
                }));
                if ($_w_rs_eq_list) $_w_rs_eq_list.append($("<li />", {
                    class: "divider",
                    role: "separator"
                }));
            }
            for (let i = 0; i < _o_image_size.length; ++i) {
                let _w_name = _o_image_size[i];
                let _w_resolution = _w_name.split("x");
                let _w_width = parseInt(_w_resolution[0]);
                let _w_height = parseInt(_w_resolution[1]);
                if ($_w_rs_lt_list) {
                    let $_w_ltItem = $("<a />", {
                        class: "rs_lt_item",
                        text: _w_name,
                        "data-width": _w_width,
                        "data-height": _w_height
                    });
                    $_w_rs_lt_list.append($("<li />").append($_w_ltItem));
                }
                if ($_w_rs_eq_list) {
                    let $_w_eqItem = $("<a />", {
                        class: "rs_eq_item",
                        text: _w_name,
                        "data-width": _w_width,
                        "data-height": _w_height
                    });
                    $_w_rs_eq_list.append($("<li />").append($_w_eqItem));
                }
            }
        }));
    }
})();