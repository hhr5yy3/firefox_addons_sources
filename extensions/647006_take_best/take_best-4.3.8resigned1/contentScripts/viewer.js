var ff_self = self;
var viewer;
(function (viewer) {
    if (typeof window === "undefined")
        window = {};
    var isChrome = true;
    var isOpera = !!window.opera;
    var isInjected = false;
    var _opera_not_include = "";
    var minHeight = "40px";
    var maxHeight = "100%";
    var classIFrame = "tndFrame";
    var lastMessage;
    var foundSovetnik = false;
    function frameListener(msg) {
        if (!isInjected) {
            return;
        }
        var data;
        try {
            data = JSON.parse(msg.data);
        }
        catch (e) {
            return;
        }
        if (data.action === 0) {
            window.jQuery("#" + classIFrame).css("height", minHeight);
        }
        else if (data.action === 1) {
            window.jQuery("#" + classIFrame).css("height", maxHeight);
        }
        else if (typeof (data.action) === "object" && data.action.hasOwnProperty("action")) {
            var action = data.action.action;
            if (action === "setHeight") {
                var height = data.action.height;
                window.jQuery("#" + classIFrame).css("height", height);
            }
            if (action === "setMinHeight") {
                minHeight = data.action.height;
                window.jQuery("#" + classIFrame).parent().css("height", minHeight);
            }
        }
        else {
            sendMessageToExtension(data.action, data.data);
        }
    }
    function processMessage(message) {
        if (message.classFrame.length > 0) {
            classIFrame = message.classFrame;
        }
        var pos = message.data.position;
        if (window.jQuery("#" + classIFrame).length) {
            if (typeof (message.data["force"] !== "undefined") && message.data["force"] === true) {
                window.jQuery("#" + classIFrame).remove();
            }
            else {
                return;
            }
        }
        else {
            window.jQuery("<meta name=\"tndStatus\" content=\"found\"/>").appendTo("head");
            window.jQuery("<meta name=\"modelName\" content=\"" + message.data.modelName + "\"/>").appendTo("head");
            var cssFlag = false;
            if (typeof message.data.cssBeforeShow !== "undefined" &&
                pos !== "bottom") {
                var toScroll = [];
                for (var index_el in message.data.cssBeforeShow) {
                    if (typeof (message.data.cssBeforeShow[index_el]["path"]) === "string" &&
                        typeof (message.data.cssBeforeShow[index_el]["css"]) === "string" &&
                        typeof (message.data.cssBeforeShow[index_el]["value"]) === "string") {
                        cssFlag = true;
                        if (typeof (message.data.cssBeforeShow[index_el]["scroll"]) !== "undefined"
                            && message.data.cssBeforeShow[index_el]["scroll"]) {
                            toScroll.push(message.data.cssBeforeShow[index_el]);
                        }
                        else {
                            window.jQuery(message.data.cssBeforeShow[index_el]["path"]).css(message.data.cssBeforeShow[index_el]["css"], message.data.cssBeforeShow[index_el]["value"]);
                        }
                    }
                }
                if (toScroll.length > 0) {
                    var f_scroll = function () {
                        for (var item in toScroll) {
                            window.jQuery(toScroll[item]["path"]).css(toScroll[item]["css"], toScroll[item]["value"]);
                        }
                    };
                    window.jQuery(document).scroll(f_scroll);
                }
            }
            if (message.data.categoryID > 0) {
                sendMessageToModule("productInfo", {
                    "productName": message.data.modelName,
                    "catID": message.data.categoryID,
                    "catName": message.data.categoryName
                });
            }
        }
        sendMessageToExtension("getSettings", { url: message.data.responseUrl, pos: pos });
        isInjected = true;
        lastMessage = message;
        if (checkIssetSovetnik()) {
            sendFoundSovetnik("");
        }
        else {
            setListenSovetnik();
        }
    }
    function sendFoundSovetnik(message) {
        if (typeof (message) === "undefined") {
            message = "";
        }
        sendMessageToExtension("foundSovetnik", message);
    }
    function checkIssetSovetnik() {
        return !!$("html").attr("mbr-initial-margin-top");
    }
    function setListenSovetnik() {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var obj_html = document.querySelector("html");
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === "attributes" && (/mbr\-/.test(mutation.target.outerHTML)) && !foundSovetnik) {
                    sendFoundSovetnik("");
                }
            });
        });
        observer.observe(obj_html, {
            attributes: true
        });
    }
    function sendMessageToModule(_msg, data) {
        var msg = {
            status: _msg,
            data: data
        };
        if (isChrome) {
            this.chrome.runtime["sendMessage"](msg);
        }
        else if (isOpera) {
            opera.extension.postMessage(msg);
        }
        else {
            self.postMessage(msg, null, null);
        }
    }
    function sendMessageToExtension(type, data) {
        var msg = {
            type: type,
            data: data
        };
        if (isChrome) {
            this.chrome.runtime["sendMessage"](msg);
        }
        else if (isOpera) {
            opera.extension.postMessage(msg);
        }
        else {
            self.postMessage(msg, null, null);
        }
    }
    function onExtensionMessage(callback, statusFilter) {
        function callIfNeed(msg) {
            if (msg.status === statusFilter) {
                callback(msg);
            }
        }
        if (isChrome) {
            chrome.runtime.onMessage.addListener(callIfNeed);
        }
        else if (isOpera) {
            opera.extension.addEventListener("message", function (event) { return callIfNeed(event.data); });
        }
        else {
            ff_self["on"]("message", callIfNeed);
        }
    }
    onExtensionMessage(processMessage, "frameData");
    onExtensionMessage(function () {
        window.jQuery("<meta name=\"tndStatus\" content=\"notFound\"/>").appendTo("head");
    }, "notFound");
    onExtensionMessage(function () {
        window.jQuery("<meta name=\"tndStatus\" content=\"notShop\"/>").appendTo("head");
    }, "notShop");
    onExtensionMessage(function (message) {
        var html = message.data.content;
        if (html) {
            var check_option = function (val, def) {
                return (typeof (val) === "undefined") ? def : val;
            };
            var parent = document.createElement("DIV");
            parent.id = classIFrame;
            parent.dataset[classIFrame] = JSON.stringify({
                region_auto: check_option(message.data.region_auto, true),
                sort: message.data.sort || 'optimal',
                show_auto: check_option(message.data.show_auto, true),
                quiet_mode: message.data.quiet_mode || 'off',
            });
            document.body.appendChild(parent);
            $(parent).append(html);
            window.jQuery.each(parent.querySelectorAll("*"), function (k, elem) {
                if (elem.tagName !== "SCRIPT" && elem.tagName !== "STYLE" && elem.tagName !== "IMG") {
                    if (!elem.style.length) {
                        elem.style['all'] = 'initial';
                    }
                }
            });
        }
    }, "passSettings");
    onExtensionMessage(function (message) {
        window.postMessage({
            'status': "passRegionListTpl",
            'data': message.data
        }, '*');
    }, "passRegionList");
    window["addEventListener"]("message", frameListener, true);
})(viewer || (viewer = {}));
