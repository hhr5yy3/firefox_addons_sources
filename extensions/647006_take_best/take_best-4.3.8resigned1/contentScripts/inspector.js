var _this = this;
(function () {
    var isChrome = !!_this.chrome;
    var isOpera = !!_this.opera;
    var global = _this;
    var isDevToolsOpen = function () {
        return window.outerHeight - window.innerHeight > 160;
    };
    if (isDevToolsOpen()) {
        return false;
    }
    if (global.smbInspectorInitialized) {
        return;
    }
    global.smbInspectorInitialized = true;
    function getName(data, id) {
        var adFields = "";
        var res = "";
        if (isOpera) {
            this["$"] = window["$"];
        }
        if (id < 1) {
            id = 0;
        }
        if (typeof data["mode"] === "undefined")
            return res;
        if (data["mode"]["isDifficult"] && Object.keys(data["expertReq"]).length > 0 && data["expertReq"][id]["if"]["query"]) {
            if (global["$"](data["expertReq"][id]["if"]["query"]).size()) {
                if (typeof (data["expertReq"][id]["then"]["link"]) !== "undefined" &&
                    typeof (data["expertReq"][data["expertReq"][id]["then"]["link"]]) !== "undefined" &&
                    data["expertReq"][id]["then"]["link"] > id) {
                    res = getName(data, data["expertReq"][id]["then"]["link"]);
                }
                else {
                    res = "";
                    adFields = "";
                    if (typeof (data["expertReq"][id]["then"]["query"]) !== "undefined" &&
                        data["expertReq"][id]["then"]["query"].length) {
                        for (var i in data["expertReq"][id]["then"]["adFields"]) {
                            adFields += " " + global["$"](data["expertReq"][id]["then"]["adFields"][i]["query"]).text().trim();
                        }
                        res = global["$"](data["expertReq"][id]["then"]["query"]).text().trim() + adFields;
                    }
                }
            }
            else {
                if (typeof (data["expertReq"][id]["else"]["link"]) !== "undefined" &&
                    typeof (data["expertReq"][data["expertReq"][id]["else"]["link"]]) !== "undefined" &&
                    data["expertReq"][id]["else"]["link"] > id) {
                    res = getName(data, data["expertReq"][id]["else"]["link"]);
                }
                else {
                    res = "";
                    adFields = "";
                    if (typeof (data["expertReq"][id]["else"]["query"]) !== "undefined" &&
                        data["expertReq"][id]["else"]["query"].length) {
                        for (var i in data["expertReq"][id]["else"]["adFields"]) {
                            adFields += " " + global["$"](data["expertReq"][id]["else"]["adFields"][i]["query"]).text().trim();
                        }
                        res = global["$"](data["expertReq"][id]["else"]["query"]).text().trim() + adFields;
                    }
                }
            }
        }
        else if (!data["mode"]["isDifficult"]) {
            for (var index_el in data["simpleReq"]) {
                res = res + " " + global["$"](data["simpleReq"][index_el]["name"]).text().trim();
            }
        }
        return res;
    }
    function replaceInName(data, res) {
        if (typeof (data["replaceCondition"]) !== "undefined" &&
            typeof (res) === "string") {
            for (var index_el in data["replaceCondition"]) {
                if (typeof (data["replaceCondition"][index_el]["target"]) === "string" &&
                    typeof (data["replaceCondition"][index_el]["text"]) === "string") {
                    res = res.replace(new RegExp(data["replaceCondition"][index_el]["target"], "g"), data["replaceCondition"][index_el]["text"]);
                }
            }
        }
        else {
            res = "";
        }
        return res.trim();
    }
    function processMessage(message) {
        if (message.status === "getProductForPopup") {
            var name_1 = getName(message.rule, 0);
            sendMessageToExtension("getProductForPopupResp", {
                tab: message.tab,
                title: global["$"]("title").text(),
                product: name_1,
            });
        }
        if (message.status === "ruleData") {
            var skipCheckActive = 0;
            var price = 0;
            var product;
            var title = global["$"]("title").text();
            var dynamicUrl = 0;
            if (typeof (message.data.urlRules) !== "undefined" && message.data.urlRules === true) {
                product = message.data.product;
                price = message.data.price;
                skipCheckActive = 2;
            }
            else {
                if (typeof (message.data.product) !== "undefined" &&
                    Object.keys(message.data.product).length > 0) {
                    product = replaceInName(message.data.product, getName(message.data.product, 0));
                }
                else {
                    console.log("Not extract name product, new method.");
                }
            }
            if (window.location.host === "www.google.ru") {
                title = global["$"]("#gbqfq").val();
            }
            if (window.location.protocol !== "https:") {
                dynamicUrl = 1;
            }
            if (product) {
                console.log("product name is: " + product);
                sendMessageToExtension("pageData", {
                    product: product,
                    price: price,
                    title: title,
                    dynamicUrl: dynamicUrl,
                    skipCheckActive: skipCheckActive
                });
            }
            else {
                console.warn("product name isn`t found!");
            }
        }
        else if (message.status === "checkReferrer") {
            sendMessageToExtension("referrer", global.document.referrer);
        }
        else if (message.status === "checkBlock") {
            if (!global["$"]("#" + message.classFrame).length) {
                sendMessageToExtension("foundBlock", global.document.location.host);
            }
        }
        else if (message.status === "checkUrl") {
            var dynamicUrl = 0;
            if (window.location.protocol !== "https:") {
                dynamicUrl = 1;
            }
            if (typeof (message.data.skipTest) === "undefined") {
                message.data["skipTest"] = false;
            }
            if (message.data.skipTest) {
                sendMessageToExtension("checkUrl", {
                    product: message.data.product,
                    url: message.data.url,
                    dynamicUrl: dynamicUrl,
                    urlRule: true
                });
                return;
            }
            var product = replaceInName(message.data.product, getName(message.data.product, 0));
            if (product) {
                console.log("product name is: " + product);
                sendMessageToExtension("checkUrl", {
                    product: product,
                    url: message.data.url,
                    dynamicUrl: dynamicUrl
                });
            }
            else {
                console.warn("product name isn`t found!");
            }
        }
        else if (message.status === "tryGlobalRules") {
            function tryGlobalRules() {
                for (rule in message.rules) {
                    var r = tryRule(message.rules[rule]);
                    if (r.length > 0) {
                        return r;
                    }
                }
            }
            function tryRule(rule) {
                return global["$"](rule).text();
            }
            var rule = tryGlobalRules();
            var msg = {
                productName: rule,
                title: global["$"]("title").text(),
                tab: message.tab
            };
            sendMessageToExtension("globalRuleResponse", msg);
        }
        else if (message.status === "pingInspector") {
            var msg = {
                tab: message.tab
            };
            sendMessageToExtension("pongInspector", msg);
        }
    }
    function inspectorListener(msg) {
        var data = {};
        try {
            data = JSON.parse(msg.data);
        }
        catch (e) {
            return;
        }
        if (typeof data['action'] !== "undefined") {
            sendMessageToExtension(data['action'], data['data']);
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
    if (isChrome) {
        _this.chrome.runtime["onMessage"].addListener(processMessage);
    }
    else if (isOpera) {
        opera.extension.addEventListener("message", function (event) {
            processMessage(event.data);
        });
    }
    else {
        self["on"]("message", processMessage);
    }
    window.addEventListener("message", inspectorListener, true);
    console.log("inspector registered");
})();
