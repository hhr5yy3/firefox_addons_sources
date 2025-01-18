var $,
    l10nStr = {},
    productName = 'Trend Micro Security',
    productShortName = '';

var blockedUrl = (function() {
    var url = '';
    var url_session_id = getUrlParam("url_session_id");
    //IE will use url_session_id to pass the URL
    if (url_session_id) {
        url = SendMailtoPlugToolbar('{"params":{"actionID":20009,"paramsIn":{"url_session_id":"' + url_session_id + '"}}}') || getUrlParam("url");
    } else {
        url = getUrlParam("url");
    }
    return decodeURIComponent(url);
})();

var blockScriptRedirectURL = (function() {
    var redirectUrl = getUrlParam("script_redirect") == null ? '' : getUrlParam("script_redirect") ;
    return redirectUrl;
})();

var pageType = (function() {
    var category = getUrlParam("category_group");
    if (category && category.split(':').indexOf('2B') !== -1) {
        return 'fake';
    } else {
        return 'malicious';
    }
})();

var STRINGS = {
    "address": blockedUrl,
    "lbl_title_bar": GetL10NString("lbl_title_bar").replace("%TiProductName%", decodeURI(getUrlParam("product_name_ti"))),
    "lbl_page_title": GetL10NString("lbl_page_title").replace("%TiProductName%", decodeURI(getUrlParam("product_name_ti"))),

    "lbl_status": GetL10NString("lbl_status_" + pageType),

    "lbl_address": GetL10NString("lbl_address"),

    "lbl_desc": GetL10NString("lbl_desc_" + pageType),

    "lbl_close_window_desc": GetL10NString("lbl_close_window_desc"),
    "lbl_handler_desc": GetL10NString("lbl_handler_desc"),

    "lbl_review": GetL10NString("lbl_review"),

    "lbl_siteowner": GetL10NString("lbl_siteowner"),
    "txt_email_placeholder": GetL10NString("txt_email_placeholder"),
    "lbl_validate_email": GetL10NString("lbl_validate_email"),
    "txt_description_placeholder": GetL10NString("txt_description_placeholder"),

    "lbl_add_approved_list": GetL10NString("lbl_add_approved_list"),
    "lbl_btn_view_anyway": GetL10NString("lbl_btn_view_anyway"),

    "lbl_copyright": GetL10NString("lbl_copyright"),

    "lnk_learn_more": GetL10NString("lnk_learn_more")
}

var CONFIG = {
    url: blockedUrl,
    url_continue: blockedUrl,
    lang: getUrlParam("locale")
};


if (typeof($) === "undefined") {
    $ = function(id) {
        return document.getElementById(id.replace(/#/ig, ""));
    };
}

function getStyle(el, styleProp) {
    var x = $("#" + el);
    if (x && x.currentStyle)
        var y = x.currentStyle[styleProp];
    else if (window.getComputedStyle)
        var y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
    return y;
}

function isExistTitanium(data) {
    return (data === 'Toolbar' || data === 'Coexist' || data === 'Promoter');
}

function bindClick(id, fn) {
    if ($(id)) {
        $(id).onclick = fn
    }
}

function init() {
    //set language for localized font setting
    document.getElementsByTagName("body")[0].className = CONFIG.lang;

    if (window.fillInBlockingContent) {
        window.fillInBlockingContent();
    }

    var statusText = $("#lbl_status"),
        statusIcon = $("#status_icon");

    if (pageType === 'fake') {
        statusText.className = statusText.className + " sign_warning";
        statusIcon.className = statusIcon.className + " sign_warning";
    } else {
        statusText.className = statusText.className + " sign_dangerous";
        statusIcon.className = statusIcon.className + " sign_dangerous";
    }


    localizePageContent(STRINGS);

    // active handler
    $("#btn_try_another").setAttribute("href", blockedUrl);
    // open page anyway
    $("#btn_try_another").onclick = takeAction;

    $("#lbl_handler_desc").onclick = toggleExtraOptions;

    $("#review").onclick = toggleFeedback;

    $("#chk_siteowner").onclick = toggleEmail;

    //uncheck the checkbox in default to prevent IE will keep the status after refresh
    $("#review").checked = $("#chk_siteowner").checked = $("#add_approved_list").checked = false;

    var email = $("#txt_email_placeholder");
    email.onfocus = focusEmailEvent;
    email.onblur = blurEmailEvent;
    email.className = email.className + " placeholder";
    email.value = email.getAttribute("placeholder");

    var desc = $("#txt_description_placeholder");
    desc.onfocus = focusDescEvent;
    desc.onblur = blurDescEvent;
    desc.className = desc.className + " placeholder";
    desc.value = desc.getAttribute("placeholder");

    // block select
    document.onselectstart = function() {
        return false;
    };

    window.browser.storage.local.get('license', data => {
        var isShowBuyNowButton = false;
        if (typeof data.license.TiBuyNowLink !== "undefined" && data.license.TiBuyNowLink !== "") {
            isShowBuyNowButton = true;
        }
        if (isShowBuyNowButton) {
		    localizeAdvertisementContent(l10nStr);
            $("#advertisement").className = $("#advertisement").className.replace(/hidden/ig, "");
            $("#buy_now").setAttribute("href", data.license.TiBuyNowLink);
            bindClick("#buy_now", () => {
                window.browser.runtime.sendMessage({
                    action: TB_ACTIONS.FEED_UBM,
                    params: {
                        event: "WTP_SAL_BLOCKING_BUTTON_BUYNOW",
                        value: JSON.stringify({
                            'click': 1
                        })
                    }
                });
            });
        }
    });

    window.browser.runtime.sendMessage({
        action: TB_ACTIONS.FEED_UBM,
        params: {
            event: "WTP_SAL_BLOCKING_PAGE_PAGEVIEW",
            value: JSON.stringify({
                'host': new URL(blockedUrl).hostname
            })
        }
    });
}

function localizePageContent(strObj) {
    for (var idx in strObj) {
        if (idx == "lbl_title_bar") {
            document.title = strObj["lbl_title_bar"];
        } else if (idx.substr(0, 4) == "alt_") {
            insertString(idx, strObj[idx], "alt");
        } else if (idx.substr(0, 4) == "ttl_") {
            insertString(idx, strObj[idx], "alt");
        } else if (idx.substr(0, 4) == "lnk_") {
            insertString(idx, strObj[idx], "href");
        } else if (idx.match(/txt_\w*_placeholder/)) {
            insertString(idx, strObj[idx], "placeholder");
        } else if (idx == "msg_for_submission") {
            break;
        } else {
            insertString(idx, strObj[idx]);
        }
    }
}

function localizeAdvertisementContent(strObj) {
    for (var idx in strObj) {
	    if (idx.indexOf("promotion_") === 0) {
            if (productShortName === "") {
                insertString(idx, strObj[idx].replace(/%TiShortProductName%/, productName));
            }
            else {
                insertString(idx, strObj[idx].replace(/%TiShortProductName%/, productShortName));
            }
        } else if (idx == "buy_now") {
	        insertString(idx, strObj[idx]);
	    }
    }
}

function insertString(elemID, strValue, attrName) {
    if (document.getElementById && $("#" + elemID)) {
        if (attrName === undefined) {
            $("#" + elemID).innerHTML = strValue;
        } else {
            $("#" + elemID).setAttribute(attrName, strValue);
        }
    }
}

function takeAction() {

    var addApproved = $("#add_approved_list").checked;
    var feedbackToReview = $("#review").checked;

    var actionUrl = CONFIG["url_continue"];
    var data = "";
    var urlParser = document.createElement("a")
    urlParser.href = actionUrl;

    if (!addApproved) {
        data = '{"params":{"actionID":20015,"paramsIn":{"url":"' + urlParser.href + '","hostname":"' + urlParser.hostname + '","port":' + (urlParser.port || 443) + ',"scriptRedirect":"' + blockScriptRedirectURL + '"}}}';
    } else {
        data = '{"params":{"actionID":20016,"paramsIn":{"url":"' + urlParser.href + '","hostname":"' + urlParser.hostname + '","port":' + (urlParser.port || 443) + ',"scriptRedirect":"' + blockScriptRedirectURL + '"}}}';
    }
    SendMailtoPlugToolbar(data);

    var MAX_EMAIL_LENGTH = 64;
    var MAX_TEXT_LENGTH = 1024;
    if (feedbackToReview) {
        var email = $("#txt_email_placeholder").value.substr(0, MAX_EMAIL_LENGTH - 1);
        var desc = $("#txt_description_placeholder").value.substr(0, MAX_TEXT_LENGTH - 1);
        data = '{"params":{"actionID":20012,"paramsIn":{"url":"' + urlParser.href + '","email":"' + email + '","desc":"' + desc + '"}}}';
        SendMailtoPlugToolbar(data);
    }

    // send UBM
    window.browser.runtime.sendMessage({
        action: TB_ACTIONS.FEED_UBM,
        params: {
            event: "WTP_SAL_BLOCKING_BUTTON_VIEW_ANYWAY",
            value: JSON.stringify({
                'addApproved': addApproved,
                'review': feedbackToReview,
                'host': new URL(blockedUrl).hostname
            })
        }
    });

    return false;
}

function toggleExtraOptions() {

    var moreAction = $("#more_actions");
    var handler = $("#handler");

    if (moreAction.className.indexOf("hidden") > -1) {
        moreAction.className = moreAction.className.replace(/hidden/ig, "");
        handler.className = handler.className.replace(/ico_collapse/ig, "ico_expand");
    } else {
        moreAction.className = moreAction.className + " hidden";
        handler.className = handler.className.replace(/ico_expand/ig, "ico_collapse");
    }

    return false;
}

function toggleFeedback() {

    var feedback = $("#feedback");

    if (this.checked) {
        feedback.className = feedback.className.replace(/hidden/ig, "");
    } else {
        feedback.className = feedback.className + " hidden";
    }

}

function toggleEmail() {

    var txtEmail = $("#txt_email_placeholder");
    var txtDesc = $("#txt_description_placeholder");
    var lblEmail = $("#lbl_validate_email");

    if (this.checked) {
        txtEmail.removeAttribute("disabled");
        txtDesc.removeAttribute("disabled");
    } else {
        txtEmail.setAttribute("disabled", "disabled");
        txtDesc.setAttribute("disabled", "disabled");
        lblEmail.className = lblEmail.className + " hidden";
    }

}

function focusEmailEvent() {

    var lblEmail = $("#lbl_validate_email");

    if (this.value === this.getAttribute("placeholder")) {
        this.value = "";
    }
    this.className = this.className.replace(/placeholder/ig, "");
    lblEmail.className = lblEmail.className + " hidden";

}

function blurEmailEvent() {

    var lblEmail = $("#lbl_validate_email");
    var txtEmail = $("#txt_email_placeholder");
    var email = txtEmail.value;
    var holder = txtEmail.getAttribute("placeholder");

    if (email === holder || email === "" || (email !== holder && !validateEmail(email))) {
        txtEmail.value = holder;
        txtEmail.className = txtEmail.className + " placeholder";
        lblEmail.className = lblEmail.className.replace(/hidden/ig, "");
        return false;
    }

}

function validateEmail(email) {

    return /^([a-zA-Z0-9_\-]+)([a-zA-Z0-9_\.\-]*)@([a-zA-Z0-9_\-]+)\.([a-zA-Z0-9_\.\-]*)([a-zA-Z]{2,})$/.test(email);

}

function focusDescEvent() {

    if (this.value === this.getAttribute("placeholder")) {
        this.value = "";
    }
    this.className = this.className.replace(/placeholder/ig, "");

}

function blurDescEvent() {

    if (this.value === "") {
        this.value = this.getAttribute("placeholder");
        this.className = this.className + " placeholder";
    }

}

function setCookie(key, value) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + 90);
    document.cookie = key + "=" + escape(value) + ";expires=" + exdate.toGMTString()
}

function getCookie(key) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(key + "=");
        if (c_start != -1) {
            c_start = c_start + key.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

(function () {
    window.browser.tabs.getCurrent(function (tab) {
        var currentTabId = tab.id;
        window.browser.storage.local.get(['titanium_name', 'titanium_shortname', 'mode', 'locale'], function (data) {
            if (isExistTitanium(data.mode)) {
                productName = data.titanium_name;
                productShortName = data.titanium_shortname;
	        };
            var localePath = "_locales/" + data.locale + "/urlfCredscore.json";
            fetch(window.browser.runtime.getURL(localePath))
            .then(response => response.json())
            .then(json => {
                l10nStr = json;
                init()
            });
        });
    });
})();