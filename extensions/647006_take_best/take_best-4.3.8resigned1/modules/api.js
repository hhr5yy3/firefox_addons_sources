var tn;
(function (tn) {
    var Api = (function () {
        function Api(browserApi) {
            this._host = "https://api.supermegabest.com/1";
            this._counter = 0;
            this._ajax = browserApi.ajax;
            this._storage = browserApi.storage;
            this._apiUtils = browserApi.utils;
            this._setTimeout = browserApi._setTimeout;
        }
        Api.prototype.__getServerHost = function () {
            var servers_api = this._storage.get("servers_api") || [];
            var failureStats = this._storage.get("api_failure") || {};
            if (servers_api && servers_api.length > 0) {
                var __servers_api = servers_api.slice();
                servers_api = [];
                for (var i in __servers_api) {
                    var _h = __servers_api[i];
                    if (typeof (failureStats[_h]) === "undefined") {
                        servers_api.push(_h);
                    }
                }
                if (servers_api.length > 0) {
                    this._counter = this._counter + 1;
                    if (this._counter > servers_api.length - 1) {
                        this._counter = 0;
                    }
                    return servers_api[this._counter];
                }
            }
            return this._host;
        };
        Api.prototype.__sendRequest = function (method, path, data, callback) {
            var _this = this;
            var onError = function () {
                var failureStats = _this._storage.get("api_failure") || {};
                failureStats[host] = (failureStats[host] || 0) + 1;
                _this._storage.set("api_failure", failureStats);
            };
            var onSuccess = function () {
                var arg = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    arg[_i - 0] = arguments[_i];
                }
                var failureStats = _this._storage.get("api_failure") || {};
                if (failureStats && Object.keys(failureStats).length > 0) {
                    if (typeof (failureStats[host]) !== "undefined" &&
                        failureStats[host] > 0) {
                        delete failureStats[host];
                        _this._storage.set("api_failure", failureStats);
                    }
                }
                callback.apply(_this, arg);
            };
            var host = this.__getServerHost();
            if (method === "post") {
                this._ajax.post(host + path, data, onSuccess, onError);
            }
            else {
                this._ajax.get(host + path, data, onSuccess, onError);
            }
        };
        Api.prototype.setup = function () {
            this._ajax.setHeader("User-Id", this._storage.get("user_id"));
            var provider = this._storage.get("provider");
            if (provider) {
                this._ajax.setHeader("Provider", provider);
            }
        };
        Api.prototype.getCountryCode = function (callback) {
            this.__sendRequest("get", "/my_country", {}, function (data) {
                callback(data.country);
            });
        };
        Api.prototype.setLocale = function (callback, code) {
            this.__sendRequest("get", "/set_local", { locale: code }, function (data) {
                callback(data.result);
            });
        };
        Api.prototype.getPlugModules = function (lastUpdate, callback) {
            this.__sendRequest("get", "/rules/plug_modules", { lastUpdate: lastUpdate }, callback);
        };
        Api.prototype.getGlobalRules = function (callback) {
            this.__sendRequest("get", "/rules/global", "", callback);
        };
        Api.prototype.getServersApi = function (callback) {
            this.__sendRequest("get", "/rules/servers_api", {}, callback);
        };
        Api.prototype.searchProducts = function (msg, callback) {
            this.__sendRequest("post", "/search/deffer", msg, callback);
        };
        Api.prototype.searchProductsPopup = function (msg, callback) {
            this.__sendRequest("post", "/search/deffer_free", msg, callback);
        };
        Api.prototype.getLocalRules = function (callback) {
            return this._ajax.getLocalFile("rules.json", callback);
        };
        Api.prototype.getLocalStopRefers = function (callback) {
            return this._ajax.getLocalFile("stopRefers.json", callback);
        };
        Api.prototype.getProvider = function (callback) {
            this.__sendRequest("get", "/install/get_provider", {}, function (data) {
                callback(data.provider);
            });
        };
        Api.prototype.installPageFlag = function (callback) {
            this.__sendRequest("get", "/install/start_page", {}, function (data) {
                callback(data.start_page);
            });
        };
        Api.prototype.getUpdates = function (lastUpdate, dev, callback) {
            var minLastTime = new Date('2000-01-01').getTime();
            if (isNaN(lastUpdate - 0) || lastUpdate < minLastTime) {
                lastUpdate = minLastTime;
            }
            lastUpdate = new Date(lastUpdate);
            lastUpdate = lastUpdate.getFullYear() + '-' +
                ('0' + (lastUpdate.getMonth() + 1)).slice(-2) + '-' +
                ('0' + lastUpdate.getDate()).slice(-2);
            this.__sendRequest("get", "/install/get_updates", { lastUpdate: lastUpdate, "dev": dev }, callback);
        };
        Api.prototype.getRegionCode = function (callback) {
            var _this = this;
            var attempts = 10;
            var interval = 1000;
            var defaultCode = 213;
            var wrongCodes = [9999, 21944];
            var doRequest = function () {
                _this._ajax.getText("https://tune.yandex.ru/region/", null, function (text) {
                    attempts -= 1;
                    try {
                        var code = text.match(/<span.+checkbox.+auto.+id\&quot;:(\d+),&quot;/);
                        if (typeof (code) !== "undefined" && Object.keys(code).length > 0) {
                            code = code[1];
                        }
                        else {
                            code = defaultCode;
                        }
                    }
                    catch (e) {
                        var code = defaultCode;
                    }
                    if (attempts > 0 && !code) {
                        _setTimeout(doRequest, interval);
                    }
                    else {
                        var parsedCode = parseInt(code) || defaultCode;
                        if (wrongCodes.indexOf(parsedCode) > -1) {
                            parsedCode = defaultCode;
                        }
                        callback(parsedCode);
                    }
                });
            };
            doRequest();
        };
        Api.prototype.getRegionList = function (data, callback) {
            this._ajax.getJSON('https://tune.yandex.ru/api/search/3/search.xml?', { lang: data.lang, part: data.query }, function (response) {
                var suggestions = response[1].map(function (i) {
                    return {
                        name: i[0],
                        id: i[1],
                        region: i[2][0]
                    };
                });
                callback(suggestions);
            });
        };
        Api.prototype.checkUrl = function (url, searchParams, callback) {
            var data = {
                url: url,
                geo_id: this._storage.get("regionCode"),
                version: this._apiUtils.getExtensionVersion()
            };
            if (this._storage.exist("show_auto")) {
                data["show_auto"] = this._storage.get("show_auto");
            }
            if (this._storage.exist("quiet_mode")) {
                data["quiet_mode"] = this._storage.get("quiet_mode");
            }
            if (this._storage.exist("found_sovetnik")) {
                data["found_sovetnik"] = this._storage.get("found_sovetnik");
            }
            if (this._storage.exist("sort")) {
                var sort = this._storage.get("sort");
                if (sort !== "optimal") {
                    data["sort"] = sort;
                }
            }
            if ((typeof (searchParams["dynamic_url"]) !== "undefined") && searchParams["dynamic_url"] === 1) {
                data["dynamic_url"] = 1;
            }
            if ((typeof (searchParams["skipCheckActive"]) !== "undefined") && searchParams["skipCheckActive"] === 2) {
                data["skipCheckActive"] = 2;
            }
            if ((typeof (searchParams["set_tpl"]) !== "undefined") && searchParams["set_tpl"].length > 0) {
                data["set_tpl"] = searchParams["set_tpl"];
            }
            this.__sendRequest("post", "/search/check_url_with_result", data, function (data) { return callback(data.modelId, data.result); });
        };
        return Api;
    }());
    tn.Api = Api;
})(tn || (tn = {}));
exports.tn = tn;
