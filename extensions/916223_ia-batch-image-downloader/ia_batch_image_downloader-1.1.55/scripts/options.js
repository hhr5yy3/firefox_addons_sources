/**
 * ImageAssistant
 * Project Home: http://www.pullywood.com/ImageAssistant/
 * Author: 睡虫子(Joey)
 * Copyright (C) 2013-2020 普利坞(Pullywood.com)
**/
"use strict";

$((function() {
    document.title = _MSG_("opt_doc_title");
    $("#header_link_container").append($("<a />", {
        class: "navbar-brand",
        text: _MSG_("opt_brand_text")
    }).prepend($("<img />", {
        src: "./images/icon128.png",
        id: "brand_text"
    })));
    $("#navbar").append($("<ul />", {
        class: "nav navbar-nav navbar-right"
    }).append($("<li />").append($("<a />", {
        target: "_pullywood_",
        href: "http://www.pullywood.com/",
        text: _MSG_("opt_navbar_item_pwd_home")
    }).prepend($("<span />", {
        class: "glyphicon glyphicon-home"
    })))).append($("<li />").append($("<a />", {
        id: "_cxyz_fav_",
        target: "_imageAssistant_favorite",
        href: "./favorite.html",
        text: _MSG_("pop_menu_item_ext_favorite")
    }).prepend($("<span />", {
        class: "glyphicon glyphicon-folder-open"
    })))));
    $("#sideNavbar").append($("<ul />", {
        class: "nav nav-sidebar"
    }).append($("<li />").append($("<a />", {
        class: "sidbarItem",
        href: "#",
        contentId: "extOption",
        text: _MSG_("opt_sidebar_item_ext_option")
    }).prepend($("<span />", {
        class: "glyphicon glyphicon-wrench"
    })))).append($("<li />").append($("<a />", {
        class: "sidbarItem",
        href: "#",
        contentId: "aboutExt",
        text: _MSG_("opt_sidebar_item_about")
    }).prepend($("<span />", {
        class: "glyphicon glyphicon-copyright-mark"
    })))));
    $("#defSizeOptTle").append(_MSG_("opt_main_funnel_title"));
    $("#defSizeOptAlert").append(_MSG_("opt_main_funnel_warning"));
    $("#sizeOptionTle").append(_MSG_("opt_main_size_option_title"));
    $("#defautlOperation").append($("<div />", {
        class: "btn btn-primary",
        id: "selectAllButton",
        text: _MSG_("opt_main_size_option_select_all")
    })).append($("<div />", {
        class: "btn btn-primary",
        id: "selectNoneButton",
        text: _MSG_("opt_main_size_option_select_none")
    }));
    $("#customSizeOption").append(_MSG_("opt_main_size_option_custom_title"));
    $("#newItemWidth").attr("placeHolder", _MSG_("opt_main_size_option_custom_width"));
    $("#newItemHeight").attr("placeHolder", _MSG_("opt_main_size_option_custom_height"));
    $("#newItemButton").append(_MSG_("opt_main_size_option_custom_add"));
    $("#aboutExTle").append(_MSG_("opt_main_about_title"));
    $("#aboutExtCnt").append($("<h4 />", {
        class: "media-heading",
        text: _MSG_("opt_main_about_ext_name")
    })).append($("<p />", {
        text: _MSG_("opt_main_about_ext_description")
    })).append($("<p />", {
        html: _MSG_("opt_main_about_ext_feture")
    })).append($("<div />", {
        class: "pwd-callout pwd-callout-info"
    }).append($("<h4 />", {
        class: "page-header",
        text: _MSG_("opt_main_about_addon")
    })).append($("<p />").append(_MSG_("opt_main_about_label_version")).append($("<a />", {
        target: "_pullywood_",
        href: "http://www.pullywood.com/ImageAssistant/#docs-download",
        text: chrome.runtime.getManifest().version
    }).append($("<span />", {
        id: "newVersion",
        text: "Latest: " + localStorage["version"]
    })))).append($("<p />").append(_MSG_("opt_main_about_label_store")).append($("<a />", {
        target: "_chromeAppStore_",
        href: "https://chrome.google.com/webstore/detail/dbjbempljhcmhlfpfacalomonjpalpko",
        text: "https://chrome.google.com/webstore/detail/dbjbempljhcmhlfpfacalomonjpalpko"
    }))).append($("<p />").append(_MSG_("opt_main_about_label_edge_store")).append($("<a />", {
        target: "_edgeAppStore_",
        href: "https://microsoftedge.microsoft.com/addons/detail/odphnbhiddhdpoccbialllejaajemdio",
        text: "https://microsoftedge.microsoft.com/addons/detail/odphnbhiddhdpoccbialllejaajemdio"
    }))).append($("<p />").append(_MSG_("opt_main_about_label_firefox_store")).append($("<a />", {
        target: "_firefoxAppStore_",
        href: "https://addons.mozilla.org/zh-CN/firefox/addon/ia-batch-image-downloader/",
        text: "https://addons.mozilla.org/zh-CN/firefox/addon/ia-batch-image-downloader/"
    }))).append($("<p />").append(_MSG_("opt_main_about_label_source_list")).append($("<a />", {
        target: "_source_list_",
        href: "http://www.pullywood.com/publish/imageassistant-resource-list",
        text: "http://www.pullywood.com/publish/imageassistant-resource-list"
    }))).append($("<p />").append(_MSG_("opt_main_about_label_ext_home")).append($("<a />", {
        target: "_pullywood_",
        href: "https://www.pullywood.com/ImageAssistant/",
        text: _MSG_("opt_main_about_label_ext_name")
    }))).append($("<p />").append(_MSG_("opt_main_about_label_developer")).append($("<a />", {
        target: "_pullywood_",
        href: "https://www.pullywood.com/publish/",
        text: _MSG_("opt_main_about_label_developer_joey")
    }))).append($("<p />").append("Twitter: ").append($("<a />", {
        target: "_twitter_",
        href: "https://twitter.com/pullywood",
        text: "https://twitter.com/pullywood"
    }))).append($("<p />").append($("<img />", {
        height: 128,
        src: "./images/wechat_offical.jpg"
    })).append($("<img />", {
        height: 128,
        src: "./images/wechat.jpg"
    })))).append($("<p />").append(_MSG_("opt_main_about_label_copyright")).append(" &copy; 2013 - 2019 ").append($("<a />", {
        target: "_pullywood_",
        href: "http://www.pullywood.com/",
        text: _MSG_("opt_main_about_label_site_name")
    })).append($("<span> | </span>").append($("<a />", {
        target: "_privacy_",
        href: _MSG_("_w_soot"),
        text: _MSG_("_w_gambol")
    }))));
    $("#extClickAct").bootstrapSwitch({
        labelText: _MSG_("opt_main_config_click_event_action"),
        onText: _MSG_("opt_main_config_click_event_action_select"),
        offText: _MSG_("opt_main_config_click_event_action_preview"),
        labelWidth: 100,
        state: "true" == _o_getBackground()._o_getExtClickAct(),
        onSwitchChange: function(event, state) {
            _o_getBackground()._o_setExtClickAct(state);
        }
    });
    $("#dyLoadSize").prop("value", _o_getBackground()._o_getDyLoadSize()).on("change", (function() {
        let _w_dyLoadSize = $(this).prop("value");
        _o_getBackground()._o_setDyLoadSize(_w_dyLoadSize);
        $(this).prop("value", _o_getBackground()._o_getDyLoadSize());
    }));
    $("#extMaxLoad").prop("value", _o_getBackground()._o_getExtMaxLoad()).on("change", (function() {
        let _w_extMaxLoad = $(this).prop("value");
        _o_getBackground()._o_setExtMaxLoad(_w_extMaxLoad);
        $(this).prop("value", _o_getBackground()._o_getExtMaxLoad());
    }));
    $("#regexpUrlRule").html(_o_getBackground()._o_getRegexpUrlRule()).on("blur", (function() {
        let _w_regexpUrlRule = $(this).text();
        let _w_invalidRegexpRules = _o_getBackground()._o_setRegexpUrlRule(_w_regexpUrlRule);
        let _w_newRules = _o_getBackground()._o_getRegexpUrlRule();
        for (let idx in _w_invalidRegexpRules) {
            _w_newRules = _w_newRules.replace(_w_invalidRegexpRules[idx], "<crule>" + _w_invalidRegexpRules[idx] + "</crule>");
        }
        $(this).html(_w_newRules);
    })).trigger("blur");
    $("#resetRegexpUrlRule").on("click", (function() {
        $("#regexpUrlRule").html("").trigger("blur");
    }));
    $("#regexpUrlTestInput").on("blur", (function() {
        let $_w_output = $("#regexpUrlTestOutput");
        $_w_output.html("");
        $("#regexpUrlRule").trigger("blur");
        let _w_originUrl = $(this).prop("value");
        if (!_w_originUrl || _w_originUrl.trim("").length == 0) {
            $_w_output.html("");
            return;
        } else if (!_w_originUrl.startsWith("http://") && !_w_originUrl.startsWith("https://")) {
            $_w_output.html(_MSG_("opt_main_config_illegal_test_URL"));
            return;
        }
        let _w_matchedRules = _o_getBackground()._o_regexpUrlMatchRule(_w_originUrl);
        if (!Array.isArray(_w_matchedRules) || _w_matchedRules.length == 0) {
            $_w_output.html(_MSG_("opt_main_config_no_rule_matched"));
            return;
        } else {
            _w_matchedRules.forEach((function(matchedRule) {
                $("#regexpUrlRule").html($("#regexpUrlRule").html().replace(matchedRule, "<mrule>" + matchedRule + "</mrule>"));
            }));
        }
        let _w_matchedUrls = _o_getBackground()._o_regexpUrlReplace(_w_originUrl, 1);
        $_w_output.append(_MSG_("opt_main_config_origin_address") + _w_originUrl + "\n");
        let $_w_originImageInfo = $("<span />", {
            text: _MSG_("opt_main_config_origin_image_resolution")
        });
        $_w_output.append($_w_originImageInfo).append("\n");
        let _w_originImage = new Image;
        _w_originImage.onload = function() {
            $_w_originImageInfo.append(this.width + " x " + this.height);
        };
        _w_originImage.onerror = function() {
            _w_originImage.onerror = null;
            $_w_originImageInfo.append("N/A");
        };
        _w_originImage.src = _w_originUrl;
        _w_matchedUrls.forEach((function(matchedUrl) {
            console.log(matchedUrl);
            $_w_output.append("<hr />" + _MSG_("opt_main_config_replace_address") + matchedUrl + "\n");
            let $_w_matchedImageInfo = $("<span />", {
                text: _MSG_("opt_main_config_target_image_resolution")
            });
            $_w_output.append($_w_matchedImageInfo).append("\n");
            let _w_matchedImage = new Image;
            _w_matchedImage.onload = function() {
                $_w_matchedImageInfo.append(this.width + " x " + this.height);
            };
            _w_matchedImage.onerror = function() {
                _w_matchedImage.onerror = null;
                $_w_matchedImageInfo.append("N/A");
            };
            _w_matchedImage.src = matchedUrl;
        }));
    }));
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
    if (localStorage["version"] && localStorage["version"] > chrome.runtime.getManifest().version) {
        $("#newVersion").show();
    }
    let _w_showMsg = _o_getQueryString("showMsg");
    if (_w_showMsg != null && _w_showMsg == "about") {
        $("#aboutExt").slideDown().siblings().slideUp();
        let $_w_item = $(".sidbarItem[contentId=aboutExt]").parent();
        $_w_item.addClass("btn-pwd active");
    } else {
        $("#extOption").slideDown().siblings().slideUp();
        let $_w_item = $(".sidbarItem[contentId=extOption]").parent();
        $_w_item.addClass("btn-pwd active");
    }
    let _o_minRect = _o_getBackground()._o_getFunnelSize();
    $("#defaultFunnelWidth").val(_o_minRect.width);
    $("#defaultFunnelHeight").val(_o_minRect.height);
    $(".defaultFunnelSize").on("input", (function() {
        _o_minRect.width = $("#defaultFunnelWidth").val();
        _o_minRect.height = $("#defaultFunnelHeight").val();
        _o_getBackground()._o_setFunnelSize(_o_minRect.width, _o_minRect.height);
    }));
    let _o_image_size = _o_getBackground()._o_huoquTupianOptions();
    let _o_image_size_default = _o_getBackground()._o_getDefaultImageSizeOptions();
    _o_renderImageSizeConfigure(_o_image_size, _o_image_size_default);
    $("#extClickActOptTle").html(_MSG_("opt_main_config_selector_page_click_behavior"));
    $("#extClickActOptDesc").html(_MSG_("opt_main_config_selector_page_click_behavior_desc"));
    $("#dyLoadSizeOptTle").html(_MSG_("opt_main_config_selector_page_dynamic_load_limit"));
    $("#i18n_dynamic_load_desc").html(_MSG_("opt_main_config_selector_page_dynamic_load_desc"));
    $("#i18n_dynamic_load_desc_1").html(_MSG_("opt_main_config_selector_page_dynamic_load_desc_1"));
    $("#extMaxLoadOptTle").html(_MSG_("opt_main_config_selector_page_max_load_image"));
    $("#i18n_selector_page_max_load_image_desc").html(_MSG_("opt_main_config_selector_page_max_load_image_desc"));
    $("#regexpUrlRuleOptTle").html(_MSG_("opt_main_config_image_url_regexp_replace_expression"));
    $("#i18n_image_url_regexp_replace_expression_desc").html(_MSG_("opt_main_config_image_url_regexp_replace_expression_desc"));
    $("#i18n_btn_default_rule").html(_MSG_("opt_main_config_image_url_regexp_replace_expression_btn_default_rule"));
    $("#i18n_test_url").html(_MSG_("opt_main_config_image_url_regexp_replace_expression_title_test_url"));
}));

function _o_renderImageSizeConfigure(_o_image_size, _o_image_size_default) {
    let _w_compare_size_container = [];
    let _w_temp_size_container = [];
    function preDealContainer(_o_image_size, _w_temp_size_container, _w_compare_size_container) {
        for (let i = 0; i < _o_image_size.length; ++i) {
            let _w_sizeItem = _o_image_size[i];
            let _w_sizeObj = _o_image_size[_w_sizeItem];
            let _w_itemWidth = _w_sizeObj.width - _w_sizeObj.height > 0 ? _w_sizeObj.width : _w_sizeObj.height;
            let _w_itemHeight = _w_sizeObj.width - _w_sizeObj.height < 0 ? _w_sizeObj.width : _w_sizeObj.height;
            let _w_itemStr = _w_itemWidth + "x" + _w_itemHeight;
            _w_itemWidth && _w_itemHeight && _w_compare_size_container.indexOf(_w_itemStr) == -1 && _w_temp_size_container.indexOf(_w_itemStr) == -1 && _w_temp_size_container.push(_w_itemStr);
        }
    }
    preDealContainer(_o_image_size_default, _w_compare_size_container, _w_compare_size_container);
    preDealContainer(_o_image_size, _w_temp_size_container, _w_compare_size_container);
    _w_compare_size_container = _o_sizeItemExt(_w_compare_size_container);
    _w_temp_size_container = _o_sizeItemExt(_w_temp_size_container);
    function htmlContainerFill(_o_image_size, _w_size_container, $_w_html_container) {
        for (let i = 0; i < _w_size_container.length; ++i) {
            let $_w_itemBtnGrp = $("<div />", {
                class: "btn-group btn-group-sm"
            });
            let _w_sizeItem = _w_size_container[_w_size_container[i]];
            let _w_str0 = _w_sizeItem.width + "x" + _w_sizeItem.height;
            let $_w_select0 = $("<div />", {
                class: "btn btn-default sizeItemOption",
                value: _w_str0,
                text: _w_str0
            });
            _o_image_size.indexOf(_w_str0) > -1 && $_w_select0.addClass("btn-pwd active");
            let _w_str1 = _w_sizeItem.height + "x" + _w_sizeItem.width;
            let $_w_select1 = $("<div />", {
                class: "btn btn-default sizeItemOption",
                value: _w_str1,
                text: _w_str1
            });
            _o_image_size.indexOf(_w_str1) > -1 && $_w_select1.addClass("btn-pwd active");
            $_w_itemBtnGrp.append($_w_select0);
            _w_sizeItem.width - _w_sizeItem.height != 0 && $_w_itemBtnGrp.append($_w_select1);
            $_w_html_container.append($_w_itemBtnGrp);
        }
    }
    let $_w_container = $("#sizeConfigure");
    let $_w_container_ext = $("#sizeConfigurExt");
    htmlContainerFill(_o_image_size, _w_compare_size_container, $_w_container);
    htmlContainerFill(_o_image_size, _w_temp_size_container, $_w_container_ext);
    $("#selectAllButton").on("click", (function() {
        $("#sizeConfigure .sizeItemOption").each((function() {
            let _w_rect = $(this).attr("value").split("x");
            _w_rect[0] = parseInt(_w_rect[0]);
            _w_rect[1] = parseInt(_w_rect[1]);
            $(this).addClass("btn-pwd active");
            let _w_item = _o_image_size[$(this).attr("value")];
            _o_getBackground()._o_addImageSizeOption(_w_rect[0], _w_rect[1]);
        }));
    }));
    $("#selectNoneButton").on("click", (function() {
        $("#sizeConfigure .sizeItemOption").each((function() {
            let _w_rect = $(this).attr("value").split("x");
            _w_rect[0] = parseInt(_w_rect[0]);
            _w_rect[1] = parseInt(_w_rect[1]);
            $(this).removeClass("btn-pwd active");
            _o_getBackground()._o_removeImageSizeOption(_w_rect[0], _w_rect[1]);
        }));
    }));
    $(".sizeItemOption").on("click", (function() {
        let _w_rect = $(this).attr("value").split("x");
        _w_rect[0] = parseInt(_w_rect[0]);
        _w_rect[1] = parseInt(_w_rect[1]);
        if ($(this).is(".active")) {
            $(this).removeClass("btn-pwd active");
            _o_getBackground()._o_removeImageSizeOption(_w_rect[0], _w_rect[1]);
        } else {
            $(this).addClass("btn-pwd active");
            let _w_item = _o_image_size[$(this).attr("value")];
            _o_getBackground()._o_addImageSizeOption(_w_rect[0], _w_rect[1]);
        }
    }));
    $("#newItemButton").on("click", (function() {
        let _w_width = parseInt($("#newItemWidth").prop("value"));
        let _w_height = parseInt($("#newItemHeight").prop("value"));
        _w_width && _w_height && _w_width > 0 && _w_height > 0 && _o_getBackground()._o_addImageSizeOption(_w_width, _w_height);
        window.location.reload();
    }));
    $(".sidbarItem").on("click", (function() {
        $(this).parent().addClass("btn-pwd active").siblings().removeClass("btn-pwd active");
        $("#" + $(this).attr("contentId")).slideDown().siblings().slideUp();
    }));
}