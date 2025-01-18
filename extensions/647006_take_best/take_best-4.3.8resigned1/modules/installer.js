var tn;
(function (tn) {
    var Installer = (function () {
        function Installer(browserApi, _api, _uuid, _utils) {
            this._api = _api;
            this._uuid = _uuid;
            this._utils = _utils;
            this._updatesDate = 1356998400000;
            this._metka = 'webstore';
            this._install_page = 'https://api.supermegabest.com/1/start_page';
            this.isUpdating = false;
            this._storage = browserApi.storage;
            this._ajax = browserApi.ajax;
            this._tabs = browserApi.tabs;
            this._version = browserApi.utils.getExtensionVersion();
            console.log("extension version is", this._version);
        }
        Installer.prototype.isInstalled = function () {
            var userId = this._storage.get("user_id");
            if (userId) {
                console.log("already installed");
                return true;
            }
            return false;
        };
        Installer.prototype.setNewVersion = function () {
            this._storage.set("version", this._version);
        };
        Installer.prototype.install = function (callback) {
            var _this = this;
            var user_id = this._uuid.v1();
            this._storage.set("user_id", user_id);
            this._storage.set("version", this._version);
            this._storage.set("lastUpdate", this._updatesDate);
            if (this._metka === "webstore") {
                this._storage.set("show_auto", true);
            }
            this._api.installPageFlag(function (page) {
                if (page) {
                    _this._tabs.openTab(_this._install_page);
                }
            });
            this._api.setup();
            this._api.getLocalStopRefers(function (stopRefers) { return _this.resetRefers(stopRefers); });
            this.update(callback);
        };
        Installer.prototype.resetRefers = function (stopRefers) {
            this._storage.set("stopReferrers", stopRefers);
        };
        Installer.prototype.resetRules = function (rules) {
            this._storage.removeWhen(function (item) { return item.key.indexOf("rule_") === 0; });
            for (var key in rules) {
                if (rules.hasOwnProperty(key)) {
                    this._storage.set("rule_" + key, rules[key]);
                }
            }
        };
        Installer.prototype.isSameVersion = function () {
            var ver = this._storage.get("version");
            if (ver && ver === this._version) {
                console.log("extension is up to date");
                return true;
            }
            return false;
        };
        Installer.prototype.update = function (callback, force) {
            var _this = this;
            if (callback === void 0) { callback = undefined; }
            if (force === void 0) { force = false; }
            var lastUpdate = this._storage.get("lastUpdate");
            var dev = this._storage.get("mode");
            if (!this.isUpdating && (this._utils.isExpired(lastUpdate, 'day') || force)) {
                this.isUpdating = true;
                this._api.getGlobalRules(function (data) {
                    _this._storage.set("globalRules", data["rules"]);
                });
                this._api.getProvider(function (provider) {
                    _this._storage.set("provider", provider);
                    _this._ajax.setHeader("Provider", provider);
                });
                if (dev === "dev") {
                    dev = 2;
                }
                else {
                    dev = 0;
                }
                this._api.getUpdates(lastUpdate, dev, function (data) {
                    _this.isUpdating = false;
                    if (data.status === "noUpdates") {
                        return;
                    }
                    if (data.result.forced) {
                        _this.resetRules(data.result.all);
                    }
                    else {
                        _this.incrementalUpdateRules(data.result);
                    }
                    lastUpdate = new Date(data.result.date).getTime();
                    _this._storage.set("lastUpdate", lastUpdate);
                    _this._storage.set("aviahotelShops", data.result.aviahotel);
                    _this._storage.set("usaShops", data.result.usaShops);
                    if (typeof (data.result.stopReferrers) !== "undefined") {
                        if (data.result.stopReferrers.length > 0) {
                            _this._storage.set("stopReferrers", data.result.stopReferrers);
                        }
                    }
                });
                this._api.getCountryCode(function (code) {
                    _this._storage.set("country_code", code);
                });
            }
            if (callback) {
                callback(this._version);
            }
        };
        Installer.prototype.incrementalUpdateRules = function (rulesPatch) {
            for (var key in rulesPatch.removed) {
                this._storage.remove("rule_" + key);
            }
            for (var key in rulesPatch.new) {
                var value = rulesPatch.new[key];
                this._storage.set("rule_" + key, value);
            }
            for (var key in rulesPatch.modified) {
                var value = rulesPatch.modified[key];
                this._storage.set("rule_" + key, value);
            }
        };
        return Installer;
    }());
    tn.Installer = Installer;
})(tn || (tn = {}));
exports.tn = tn;
