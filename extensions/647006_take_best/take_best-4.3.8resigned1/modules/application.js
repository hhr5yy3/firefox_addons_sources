var tn;
(function (tn) {
    var app;
    (function (app) {
        var Extension = (function () {
            function Extension(browserApi, _api, _utils, _installer, _ga, _plugModule) {
                this._api = _api;
                this._utils = _utils;
                this._installer = _installer;
                this._ga = _ga;
                this._plugModule = _plugModule;
                this._textLengthLimit = 1024;
                this._sendMessage = function (type, data) {
                    var msg = {
                        type: type,
                    };
                    if (typeof (data) !== "undefined" &&
                        typeof (data.result) !== "undefined") {
                        msg["data"] = data.result;
                    }
                    this._apiUtils.sendMessage(msg);
                };
                this.yandexTester = /^.*(?:yandex\.(?:ru|mobi|com|ua|by|asia)|ya\.ru)$/i;
                this.marketTester = /^.*(?:market\.yandex\.(?:ru|mobi|com|ua|by|asia)|market\.ya\.ru)$/i;
                this._storage = browserApi.storage;
                this._tabs = browserApi.tabs;
                this._apiUtils = browserApi.utils;
                this._ajax = browserApi.ajax;
                this._browserBase = browserApi.browserBase;
                this._setTimeout = browserApi._setTimeout;
            }
            Extension.prototype.turnOff = function () {
                this._storage.set("turnOffDate", Date.now());
                console.log("Extension is switching off for 24 hours");
            };
            Extension.prototype.turnOn = function () {
                this._storage.remove("turnOffDate");
            };
            Extension.prototype.isOff = function () {
                var date = this._storage.get("turnOffDate");
                if (!date) {
                    return false;
                }
                return !this._isExpired(date, "day");
            };
            Extension.prototype.getClassIFrame = function () {
                var className = this._storage.get("IFrameClass");
                if (!className) {
                    className = this._utils.generatedRandomID(8);
                    this._storage.set("IFrameClass", className);
                }
                return className;
            };
            Extension.prototype._isExpired = function (date, interval) {
                if (interval === void 0) { interval = "day"; }
                if (interval === "day") {
                    interval = 24 * 60 * 60 * 1000;
                }
                if (interval === "month") {
                    interval = 30 * 24 * 60 * 60 * 1000;
                }
                var now = Date.now();
                return date && (now - date) >= interval;
            };
            Extension.prototype.run = function () {
                var _this = this;
                if (!this._installer.isInstalled()) {
                    this._ga.trackInstall(this._installer._version);
                    this._installer.install(function () { return _this.startup(); });
                    return;
                }
                this._api.setup();
                if (this._installer.isSameVersion()) {
                    this._plugModule.init(true);
                    this.startup();
                    return;
                }
                this._installer.update(function (version) {
                    _this._installer.setNewVersion();
                    _this.startup(true);
                    _this._ga.trackUpdate(version);
                });
            };
            Extension.prototype.get_region = function () {
                var _this = this;
                if (this._storage.get("region_auto") === false) {
                    return;
                }
                this._api.getRegionCode(function (code) {
                    _this._storage.set("regionCode", code);
                });
            };
            Extension.prototype.startup = function (skipUpdate) {
                var _this = this;
                if (skipUpdate === void 0) { skipUpdate = false; }
                this.get_region();
                this._tabs.onTabLoad(function (tab) {
                    if (!_this.isOff()) {
                        _this.getServersApi();
                        _this.doReferrerCheck(tab);
                    }
                    _this.checkClid(tab.url);
                    _this.checkAviahotel(tab.url);
                    _this.checkUsaShop(tab.url);
                });
                this._tabs.onExtensionMessage(this.processMessage.bind(this));
                this.checkFistRun(skipUpdate);
                this.checkFistRun(skipUpdate, false, "month");
                this.trackBrowserName();
            };
            Extension.prototype.checkFistRun = function (skipUpdate, devIgnore, period) {
                if (skipUpdate === void 0) { skipUpdate = false; }
                if (devIgnore === void 0) { devIgnore = false; }
                if (period === void 0) { period = "day"; }
                var storageFiled = "lastRun" + (period !== "day" ? period : "");
                var lastRun = this._storage.get(storageFiled) || 1356998400000;
                var lastUpdate = this._storage.get('lastUpdate') || 1356998400000;
                var dev = this._storage.get("mode");
                dev = (dev === "dev" && !devIgnore);
                if (!skipUpdate || dev) {
                    this._installer.update(undefined, dev);
                }
                if (!this._isExpired(lastRun, period) && !dev) {
                    return;
                }
                if (period === "day")
                    this._ga.trackFirstRunToday(this._installer._version);
                if (period === "day" && this._storage.get("statistic_disable"))
                    this._ga.trackUserStat("off");
                if (period === "month")
                    this._ga.trackFirstRunMonth(this._installer._version);
                this._storage.set(storageFiled, Date.now());
            };
            Extension.prototype.trackBrowserName = function () {
                var lastRunBrowser = this._storage.get("lastRunBrowser") || 1356998400000;
                if (!this._isExpired(lastRunBrowser)) {
                    return;
                }
                this._ga.trackBrowserName(this.getBrowserName());
                this._storage.set("lastRunBrowser", Date.now());
            };
            Extension.prototype.getBrowserName = function () {
                return this._utils.getBrowser() || this._browserBase;
            };
            Extension.prototype.isValidUrl = function (url) {
                if (url.indexOf("chrome:") === -1 &&
                    url.indexOf("chrome-extension:") === -1 &&
                    url.indexOf("chrome-devtools:") === -1 &&
                    url.indexOf("javascript:") === -1 &&
                    url.indexOf("//chrome.google.com/webstore/") === -1) {
                    return true;
                }
                return false;
            };
            Extension.prototype.getServersApi = function () {
                var _this = this;
                var lastUpdate = this._storage.get("servers_api_update") || 1;
                if (this._isExpired(lastUpdate, 60 * 15 * 1000)) {
                    this._api.getServersApi(function (data) {
                        _this._storage.remove("api_failure");
                        _this._storage.set("servers_api", data.result.all);
                        _this._storage.set("servers_api_update", Date.now());
                    });
                }
            };
            Extension.prototype.doReferrerCheck = function (tab) {
                var _this = this;
                if (!this.checkStopList(tab.url) && tab.url !== "" && this.isValidUrl(tab.url)) {
                    this._tabs.attachScripts({
                        scripts: ["jquery.min.js", "inspector.js"],
                        tab: tab
                    }, function (worker) {
                        _this._tabs.sendMessageToTab(tab, { status: "checkReferrer" }, worker);
                    });
                }
                else {
                    console.log("url not valid");
                }
            };
            Extension.prototype.checkStopList = function (_url) {
                var url = this._utils.parseUri(_url);
                var url_host = url.host.split(".");
                var stopList = [
                    "vk.com",
                    "mail.ru",
                    "youtube.com",
                    "ok.ru",
                    "wikipedia.org",
                    "odnoklassniki.ru",
                    "gmail.com",
                    "yandex.ru",
                    "kremlin.ru",
                    "gov.ru",
                    "fb.com",
                    "facebook.com",
                    "twitter.com",
                    "instagram.com",
                    "livejournal.com",
                    "habrahabr.ru"
                ];
                if (stopList.indexOf(url_host[url_host.length - 2] + "." + url_host[url_host.length - 1]) > 1) {
                    console.log("Site in stop list");
                    return true;
                }
                return false;
            };
            Extension.prototype.doPageCheck = function (tab) {
                var _this = this;
                this.checkFistRun(false, true);
                this.checkFistRun(false, true, "month");
                this._plugModule.init();
                var url = this._utils.parseUri(tab.url);
                console.log("got url: ", url);
                var host = url.host;
                var skipTest = false;
                if (host.slice(0, 4) === "www.") {
                    host = host.slice(4);
                }
                if (host.indexOf("yandex.ru") > 0) {
                    console.log("It\"s yandex site.");
                    return;
                }
                var rule = this.getRule(host);
                if (!rule) {
                    this.injectNotShop(tab);
                    console.log("not a shop");
                    return;
                }
                console.log("it's a shop");
                this._ga.trackDoShopping(tab.url);
                if (!this.isTabAProductPage(url, rule.productPage)) {
                    console.log("not a product page");
                    return;
                }
                console.log("it's a product page");
                var productNameExtractor = rule.productName || "$(\"title\").text()";
                this._tabs.attachScripts({
                    scripts: ["jquery.min.js", "inspector.js"],
                    tab: tab
                }, function (worker) {
                    _this.sendCheckUrl(tab, productNameExtractor, tab.url, worker, skipTest);
                    console.log("url check");
                });
            };
            Extension.prototype._getRuleInternal = function (host) {
                if (host === "google.ru" && this._utils.getBrowser() === "Yandex") {
                    return {
                        price: "",
                        productName: {
                            expertReq: {
                                0: {
                                    "else": { query: "", link: 1 },
                                    id: 0,
                                    "if": { query: "div[class*=\"commercial-unit\"] g-scrolling-carousel" },
                                    "then": { query: "div[class*=\"commercial-unit\"] > div > :last-child div.pla-unit:nth-child(1) div.pla-unit-title > a" }
                                },
                                1: {
                                    parent: { id: 0, label: "else" },
                                    "else": { query: "", link: 2 },
                                    id: 1,
                                    "if": { query: "div[class*=\"commercial-unit\"] .top-pla-group-inner" },
                                    "then": { query: "div[class*=\"commercial-unit\"] > div > :last-child div.pla-unit:nth-child(1) div.pla-unit-title > a" }
                                },
                                2: {
                                    parent: { id: 1, label: "else" },
                                    "else": { query: "" },
                                    id: 2,
                                    "if": { query: "div#rhs_block" },
                                    "then": { query: "div[class*=\"commercial-unit\"] > div > :last-child div.pla-unit:nth-child(1) div.pla-unit-title > a > span:eq(0)" }
                                }
                            },
                            mode: {
                                isDifficult: true
                            },
                            replaceCondition: {
                                0: {
                                    id: 0,
                                    target: "\\.+",
                                    text: ""
                                }
                            },
                            simpleReq: []
                        },
                        productPage: "\/.*",
                        subs: false,
                        cssBeforeShow: {
                            0: {
                                css: "top",
                                id: 0,
                                path: "#searchform",
                                scroll: false,
                                value: "49px"
                            },
                            1: {
                                css: "margin-top",
                                id: 1,
                                path: "body",
                                scroll: false,
                                value: "30px"
                            },
                            2: {
                                css: "top",
                                id: 2,
                                path: "#viewport",
                                scroll: false,
                                value: "30px"
                            }
                        }
                    };
                }
                var hash1 = this._utils.crc32(host);
                if (this._storage.exist("rule_" + hash1)) {
                    var data = this._storage.get("rule_" + hash1);
                    var json = this._utils.decode(host, data);
                    return JSON.parse(json);
                }
                return undefined;
            };
            Extension.prototype.getRule = function (host) {
                if (host.slice(0, 4) === "www.") {
                    host = host.slice(4);
                }
                var parts = host.split(".");
                while (parts.length >= 2) {
                    var rule = this._getRuleInternal(parts.join("."));
                    if (rule) {
                        if (typeof (rule.productName_v2) !== "undefined" && Object.keys(rule.productName_v2).length > 0) {
                            rule.productName = rule.productName_v2;
                        }
                        return rule;
                    }
                    parts.shift();
                }
                return undefined;
            };
            Extension.prototype.checkIntersection = function (name, interval) {
                var time = this._storage.get("intersection_" + name);
                var now = Date.now();
                if (time > 0 && (now - interval) <= time) {
                    var fixed = this._storage.get("fix_intersection_" + name);
                    if (!fixed) {
                        this._storage.set("fix_intersection_" + name, true);
                        return true;
                    }
                }
                else if (time > 0) {
                    this._storage.set("fix_intersection_" + name, false);
                }
                return false;
            };
            Extension.prototype.checkBlock = function (tab) {
                var _this = this;
                var callback = function () {
                    _this._tabs.sendMessageToTab(tab, {
                        status: "checkBlock",
                        classFrame: _this.getClassIFrame()
                    });
                };
                this._setTimeout(callback, 3000);
            };
            Extension.prototype.setIntersection = function (name, interval) {
                var time = this._storage.get("intersection_" + name);
                time = time || 0;
                var now = Date.now();
                if ((now - interval) > time) {
                    this._storage.set("intersection_" + name, Date.now());
                }
            };
            Extension.prototype.isTabAProductPage = function (url, regexp) {
                if (!regexp) {
                    console.warn("Regexp for " + url.host + "is not defined");
                    return true;
                }
                var checkUrl = url.path;
                if (url.query) {
                    checkUrl += "?" + url.query;
                }
                console.log("page pattern:" + regexp + " path: " + checkUrl);
                var pattern = regexp.replace(/\//g, "\\/").replace(/\\d/g, "\\\\d");
                return new RegExp(pattern).test(checkUrl) || new RegExp(regexp).test(checkUrl);
            };
            Extension.prototype.makeEmptyIfTooLong = function (text) {
                return text && text.length <= this._textLengthLimit ? text : "";
            };
            Extension.prototype.processMessage = function (message, tab) {
                var _this = this;
                if (message.type === "popupClicked") {
                    tab = message["tab"];
                    var url = this._utils.parseUri(tab.url);
                    var rule = this.getRule(url.host) || { "productName": "" };
                    this._tabs.sendMessageToTab(tab, {
                        status: "getProductForPopup",
                        tab: tab,
                        rule: rule.productName
                    }, "");
                }
                if (message.type === "getProductForPopupResp") {
                    if (typeof message.data.product !== "undefined" && message.data.product) {
                        this._api.searchProductsPopup({
                            url: message.data.tab.url,
                            title: message.data.title || "",
                            product: message.data.product,
                            price: "",
                            set_tpl: "window",
                            regionCode: this._storage.get("regionCode"),
                            version: this._apiUtils.getExtensionVersion()
                        }, function (data) {
                            if (typeof (data.result.modelName) !== "undefined") {
                                _this._sendMessage("modelFound", data);
                            }
                            else {
                                _this._sendMessage("modelNotFound");
                            }
                        });
                    }
                    else {
                        var globalRules = this._storage.get("globalRules");
                        if (typeof (globalRules) !== "undefined" && globalRules.length !== 0) {
                            var msg = {
                                status: "tryGlobalRules",
                                tab: tab,
                                rules: globalRules
                            };
                            this._tabs.sendMessageToTab(tab, msg, "");
                        }
                        else {
                            this._sendMessage("modelNotFound");
                        }
                    }
                }
                if (message.type === "globalRuleResponse") {
                    if (typeof (message.data.productName) !== "undefined" && message.data.code !== 404) {
                        var searchParams = {
                            url: message.data.tab.url,
                            title: message.data.title,
                            product: this.makeEmptyIfTooLong(message.data.productName),
                            price: "",
                            set_tpl: "window",
                            regionCode: this._storage.get("regionCode"),
                            version: this._apiUtils.getExtensionVersion()
                        };
                        this._api.searchProductsPopup(searchParams, function (data) {
                            if (typeof (data.result.modelName) !== "undefined") {
                                console.log("server responded: ", data);
                                _this._sendMessage("modelFound", data);
                            }
                            else {
                                _this._sendMessage("modelNotFound");
                            }
                        });
                    }
                }
                if (message.type === "pageData") {
                    console.log("query search api");
                    console.log(tab.id);
                    var searchParams_1 = {
                        url: tab.url,
                        title: this.makeEmptyIfTooLong(message.data.title),
                        product: this.makeEmptyIfTooLong(message.data.product),
                        price: message.data.price,
                        regionCode: this._storage.get("regionCode"),
                        version: this._apiUtils.getExtensionVersion(),
                    };
                    if (message.data.dynamicUrl === 1) {
                        searchParams_1["dynamic_url"] = 1;
                    }
                    if (this._storage.exist("sort")) {
                        var sort = this._storage.get("sort");
                        if (sort !== "optimal") {
                            searchParams_1["sort"] = sort;
                        }
                    }
                    if (this._storage.exist("show_auto")) {
                        searchParams_1["show_auto"] = this._storage.get("show_auto");
                    }
                    if (this._storage.exist("quiet_mode")) {
                        searchParams_1["quiet_mode"] = this._storage.get("quiet_mode");
                    }
                    if (this._storage.exist("found_sovetnik")) {
                        searchParams_1["found_sovetnik"] = this._storage.get("found_sovetnik");
                    }
                    console.log("ask server for: ", message.data);
                    this._api.searchProducts(searchParams_1, function (data) {
                        console.log("server responded: ", data);
                        if (null != data && data.result.code === 200) {
                            var host = _this._utils.parseUri(tab.url).host;
                            if (host.slice(0, 4) === "www.") {
                                host = host.slice(4);
                            }
                            var rule = _this.getRule(host);
                            if (typeof (rule["cssBeforeShow"]) !== "undefined") {
                                data["result"]["cssBeforeShow"] = rule["cssBeforeShow"];
                            }
                            _this.injectViewer(tab, data);
                            _this._ga.trackFound(data.result.modelName, host);
                        }
                        else {
                            _this.injectNotFound(tab);
                            _this._ga.trackNotFound(tab.url);
                        }
                    });
                }
                if (message.type === "closeForDay") {
                    this.turnOff();
                }
                if (message.type === "changeCity") {
                    this._storage.set("regionCode", message.data);
                    this._storage.set("region_auto", false);
                    console.log("Set new region code", message.data);
                }
                if (message.type === "getCityList") {
                    this._api.getRegionList({ query: message.data["query"], lang: message.data["lang"] }, function (resp) {
                        _this._tabs.attachScripts({
                            scripts: ["jquery.min.js", "inspector.js", "viewer.js"],
                            tab: tab
                        }, function (worker) {
                            var msg = {
                                status: 'passRegionList',
                                data: resp
                            };
                            _this._tabs.sendMessageToTab(tab, msg, worker);
                        });
                    });
                }
                if (message.type === "changeLang") {
                    this._api.setLocale(function () {
                    }, message.data);
                    console.log("Set interface language", message.data);
                }
                if (message.type === "changeSetting") {
                    if (typeof message.data["key"] !== "undefined") {
                        switch (message.data["key"]) {
                            case "show_auto":
                                this._storage.set("show_auto", message.data["value"]);
                                console.log("Set setting show_auto", message.data);
                                break;
                            case "region_auto":
                                this._storage.set("region_auto", message.data["value"]);
                                this.get_region();
                                console.log("Set setting region_auto", message.data);
                                break;
                            case "quiet_mode":
                                this._storage.set("quiet_mode", message.data["value"]);
                                console.log("Set setting quiet_mode", message.data);
                                break;
                            case "sort":
                                this._storage.set("sort", message.data["value"]);
                                console.log("Set setting sort", message.data);
                                break;
                            default:
                                break;
                        }
                    }
                }
                if (message.type === "getSettings") {
                    this._tabs.attachScripts({
                        scripts: ["jquery.min.js", "inspector.js", "viewer.js"],
                        tab: tab
                    }, function (worker) {
                        _this._ajax.setCredentials();
                        _this._ajax.getText(message.data.url, {}, function (html) {
                            if (html) {
                                var msg = {
                                    status: 'passSettings',
                                    data: {
                                        content: html,
                                        position: message.data.pos,
                                        region_auto: _this._storage.get("region_auto"),
                                        show_auto: _this._storage.get("show_auto"),
                                        sort: _this._storage.get("sort"),
                                        quiet_mode: _this._storage.get("quiet_mode")
                                    }
                                };
                                _this._tabs.sendMessageToTab(tab, msg, worker);
                            }
                            else {
                                console.warn("Empty panel template");
                            }
                        });
                    });
                }
                if (message.type === "foundBlock") {
                    var host = message.data;
                    if (host.length > 0) {
                        this._ga.trackBlock(host);
                    }
                }
                if (message.type === "referrer") {
                    var referrer = message.data;
                    if (!this.checkStopRefersList(referrer, tab)) {
                        this.doPageCheck(tab);
                    }
                    else {
                        console.log("Referrer in stop list. Skipped.");
                    }
                }
                if (message.type === "checkUrl") {
                    if (typeof (message.data.product) !== "undefined") {
                        var searchParams_2 = {
                            url: message.data.url,
                            product: this.makeEmptyIfTooLong(message.data.product),
                        };
                        if (message.data.dynamicUrl === 1) {
                            searchParams_2["dynamic_url"] = 1;
                        }
                        if (this._storage.exist("found_sovetnik")) {
                            searchParams_2["found_sovetnik"] = this._storage.get("found_sovetnik");
                        }
                        if (!(typeof (message.data.skipShowPanel) !== "undefined" &&
                            message.data.skipShowPanel === true)) {
                            this._api.checkUrl(searchParams_2.url, searchParams_2, function (modelId, result) {
                                var dev = _this._storage.get("mode");
                                if (modelId === -1) {
                                    _this.injectNotFound(tab);
                                    _this._ga.trackNotFound(searchParams_2.url);
                                    return;
                                }
                                var url = _this._utils.parseUri(searchParams_2.url);
                                console.log("got url: ", url);
                                var host = url.host;
                                if (host.slice(0, 4) === "www.") {
                                    host = host.slice(4);
                                }
                                var rule = _this.getRule(host);
                                if (modelId && result && dev !== "dev") {
                                    if (_this.checkIntersection("yandex", 60 * 60 * 24 * 1000)) {
                                        _this._ga.trackIntersection("yandex");
                                    }
                                    if (typeof (rule["cssBeforeShow"]) !== "undefined") {
                                        result["cssBeforeShow"] = rule["cssBeforeShow"];
                                    }
                                    _this.injectViewer(tab, { result: result });
                                    _this._ga.trackFound(result.modelName, host);
                                    return;
                                }
                                if (rule) {
                                    var productNameExtractor = rule.productName || "$('title').text()";
                                    var priceExtractor = rule.price || "0";
                                    _this._tabs.attachScripts({
                                        scripts: ["jquery.min.js", "inspector.js"],
                                        tab: tab
                                    }, function (worker) {
                                        _this.sendRuleData(tab, productNameExtractor, priceExtractor, worker);
                                        console.log("run text search");
                                    });
                                }
                            });
                        }
                    }
                }
                if (message.type === "foundSovetnik") {
                    this._ga.trackIntersection("sovetnik");
                    this._storage.set("found_sovetnik", Math.floor(Date.now() / 1000));
                }
                if (message.type === "listUrlRules") {
                    if (typeof (message.data) === "object") {
                        if (typeof (message.data["link"]) !== "undefined" &&
                            typeof (message.data["product"]) !== "undefined") {
                            this.setListUrlRules(message.data["link"], message.data["product"]);
                        }
                    }
                }
            };
            Extension.prototype.setListUrlRules = function (link, product) {
                var listUrlRules = this.getListUrlRules();
                listUrlRules.push({
                    "link": link,
                    "product": product
                });
                listUrlRules = this._storage.set("listUrlRules", listUrlRules);
            };
            Extension.prototype.getListUrlRules = function () {
                var listUrlRules = this._storage.get("listUrlRules");
                if (typeof listUrlRules === "undefined") {
                    listUrlRules = [];
                }
                return listUrlRules;
            };
            Extension.prototype.checkIssueUrlInListUrlRules = function (link, flag_rm) {
                if (flag_rm === void 0) { flag_rm = false; }
                var listUrlRules = this.getListUrlRules();
                var res = false;
                var _tmp_link = this._utils.parseUri(link);
                link = _tmp_link.host + _tmp_link.path;
                for (var i = 1; i <= listUrlRules.length; i++) {
                    _tmp_link = this._utils.parseUri(listUrlRules[i - 1].link);
                    if (_tmp_link.host + _tmp_link.path === link) {
                        res = listUrlRules[i - 1];
                        if (flag_rm) {
                            listUrlRules = this._storage.set("listUrlRules", listUrlRules.splice(i - 1, 1));
                        }
                        return res;
                    }
                }
                return false;
            };
            Extension.prototype.injectViewer = function (tab, data) {
                var _this = this;
                console.log("prepare inject view");
                this._tabs.attachScripts({
                    scripts: ["jquery.min.js", "viewer.js"],
                    tab: tab
                }, function (worker) {
                    var __this = _this;
                    _this.sendFrameData(tab, data, worker);
                });
                console.log("script injected");
            };
            Extension.prototype.injectNotFound = function (tab) {
                var _this = this;
                this._tabs.attachScripts({
                    scripts: ["jquery.min.js", "viewer.js"],
                    tab: tab
                }, function (worker) {
                    var message = {
                        status: "notFound"
                    };
                    _this._tabs.sendMessageToTab(tab, message, worker);
                });
                console.log("script injected");
            };
            Extension.prototype.injectNotShop = function (tab) {
                var _this = this;
                this._tabs.attachScripts({
                    scripts: ["jquery.min.js", "viewer.js"],
                    tab: tab
                }, function (worker) {
                    var message = {
                        status: "notShop"
                    };
                    _this._tabs.sendMessageToTab(tab, message, worker);
                });
            };
            Extension.prototype.sendRuleData = function (tab, product, price, worker, urlRules) {
                if (urlRules === void 0) { urlRules = false; }
                console.log("sending rule to inspector: " + product);
                var message = {
                    status: "ruleData",
                    data: {
                        "product": product,
                        "price": price,
                        "urlRules": urlRules
                    }
                };
                this._tabs.sendMessageToTab(tab, message, worker);
            };
            Extension.prototype.sendCheckUrl = function (tab, product, url, worker, skipTest) {
                if (skipTest === void 0) { skipTest = false; }
                console.log("sending check url to inspector: " + product);
                var message = {
                    status: "checkUrl",
                    data: {
                        "product": product,
                        "url": url,
                        "skipTest": skipTest
                    }
                };
                this._tabs.sendMessageToTab(tab, message, worker);
            };
            Extension.prototype.sendFrameData = function (tab, data, worker) {
                var message = {
                    status: "frameData",
                    data: data.result,
                    classFrame: this.getClassIFrame()
                };
                this._tabs.sendMessageToTab(tab, message, worker);
                this.checkBlock(tab);
            };
            Extension.prototype.checkStopRefersList = function (url_referrer, tab) {
                var stopRefersList = this._storage.get("stopReferrers");
                var host = this._utils.parseUri(url_referrer).host;
                var main_host = host.split(".").slice(-2).join(".");
                for (var key in stopRefersList) {
                    if ((stopRefersList[key] === main_host) || (stopRefersList[key] === host)) {
                        return true;
                    }
                }
                if (typeof tab.url === "undefined")
                    return;
                var url = this._utils.parseUri(tab.url);
                var urlCleared = url.host.split(".").slice(-2).join(".");
                var checkYaParams = (main_host !== "" && main_host !== urlCleared);
                console.log("Status referrer check:", checkYaParams);
                console.log("Ref Host:", main_host);
                if ("yclid" in url.queryKey && url.queryKey["yclid"].length > 0 && checkYaParams) {
                    console.log("Site in stop list, found get parametr yclid");
                    return true;
                }
                if ("ymclid" in url.queryKey && url.queryKey["ymclid"].length > 0 && checkYaParams) {
                    console.log("Site in stop list, found get parametr ymclid");
                    return true;
                }
                return;
            };
            Extension.prototype.checkClid = function (url_raw) {
                var url = this._utils.parseUri(url_raw);
                if (this.marketTester.test(url.host)) {
                    this.setIntersection("yandex", 60 * 60 * 24 * 100);
                }
                if (!this.yandexTester.test(url.host)) {
                    return;
                }
                console.log("It is a Yandex site.");
                var clid = url.queryKey.clid;
                var oldClid = this._storage.get("currentClid");
                if (!oldClid && clid) {
                    this._storage.set("currentClid", clid);
                    return;
                }
                if (!clid) {
                    return;
                }
                if (clid !== oldClid) {
                    this._storage.set("currentClid", clid);
                    console.log("CLID has been changed ", oldClid, "->", clid);
                    this._ga.trackClidChanged(oldClid, clid);
                }
            };
            Extension.prototype.checkAviahotel = function (url_raw) {
                this.checkShopByList(url_raw, "aviahotelShops", "aviahotelStats", this._ga.trackAviahotelVisitor.bind(this._ga), this._ga.trackAviahotelPageView.bind(this._ga));
            };
            Extension.prototype.checkUsaShop = function (url_raw) {
                this.checkShopByList(url_raw, "usaShops", "usaStats", this._ga.trackUsaShopVisitor.bind(this._ga), this._ga.trackUsaShopPageView.bind(this._ga));
            };
            Extension.prototype.checkShopByList = function (url, listKey, statKey, visitorCallback, pageViewCallback) {
                var host = this._utils.parseUri(url).host;
                var main_host = host.split(".").slice(-2).join(".");
                var _host = false;
                if (host.slice(0, 4) === "www.") {
                    host = host.slice(4);
                }
                var shops = this._storage.get(listKey) || [];
                var shopStats = this._storage.get(statKey) || {};
                if (shops.indexOf(host) > -1) {
                    _host = host;
                }
                if (shops.indexOf(main_host) > -1) {
                    _host = main_host;
                }
                if (_host) {
                    var ts = shopStats[_host];
                    if (!ts || (ts && this._isExpired(ts))) {
                        visitorCallback(_host);
                        shopStats[_host] = Date.now();
                        this._storage.set(statKey, shopStats);
                    }
                    else {
                        pageViewCallback(_host);
                    }
                }
            };
            return Extension;
        }());
        app.Extension = Extension;
    })(app = tn.app || (tn.app = {}));
})(tn || (tn = {}));
exports.tn = tn;
