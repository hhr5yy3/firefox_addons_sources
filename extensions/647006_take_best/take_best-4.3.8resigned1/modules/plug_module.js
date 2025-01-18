var tn;
(function (tn) {
    var ManagementPlugModule = (function () {
        function ManagementPlugModule(browserApi, _api, _utils, isFF) {
            if (isFF === void 0) { isFF = false; }
            this._api = _api;
            this._utils = _utils;
            this._storage = browserApi.storage;
            this._ajax = browserApi.ajax;
            this.apiUtils = browserApi.utils;
            this.isFF = isFF;
            this.defPath = "../modules/plug/%__MODULE__%?" + Date.now();
        }
        ManagementPlugModule.prototype.init = function (initRules) {
            if (initRules === void 0) { initRules = false; }
            if (this._storage.exist("statistic_disable") && this._storage.get("statistic_disable")) {
                console.log("Disabled load statistic scripts");
            }
            else {
                this._checkRules(initRules);
            }
        };
        ManagementPlugModule.prototype._checkRules = function (initRules) {
            if (initRules === void 0) { initRules = false; }
            var lastUpdate = this._storage.get("ext_rules_update") || 1;
            if (this._isExpired(lastUpdate, 60 * 60 * 1000)) {
                this._updateRules(lastUpdate);
            }
            if (initRules) {
                this.initRules();
            }
        };
        ManagementPlugModule.prototype._updateRules = function (lastUpdate) {
            var _this = this;
            this._api.getPlugModules(lastUpdate, function (data) {
                var old_rules = _this._storage.get("ext_rules") || [];
                _this._storage.set("ext_rules", data.result.all);
                _this._storage.set("ext_rules_update", Date.now());
                var new_rules = _this._storage.get("ext_rules") || [];
                var reloadExt = false;
                if (Object.keys(old_rules).length) {
                    for (var old_rule in old_rules) {
                        if (typeof (new_rules[old_rule]) === "undefined" ||
                            new_rules[old_rule].path !== old_rules[old_rule].path ||
                            new_rules[old_rule].name !== old_rules[old_rule].name) {
                            reloadExt = true;
                        }
                    }
                }
                else {
                    reloadExt = true;
                }
                if (reloadExt) {
                    setTimeout(_this.apiUtils.reloadExtention, 10000);
                }
            });
        };
        ManagementPlugModule.prototype._sendUserIdToModule = function () {
            console.log("Send event for modules - userId");
            this.apiUtils.sendMessage({
                "status": "userID",
                "data": {
                    "userID": this._storage.get("user_id")
                }
            });
        };
        ManagementPlugModule.prototype._isExpired = function (date, interval) {
            if (interval === void 0) { interval = "day"; }
            if (interval === "day") {
                interval = 24 * 60 * 60 * 1000;
            }
            var now = Date.now();
            return date && (now - date) >= interval;
        };
        ManagementPlugModule.prototype.__getFullPath = function (modulePath) {
            return this.defPath.replace("%__MODULE__%", modulePath + ".js");
        };
        ManagementPlugModule.prototype.__checkExist = function (filePath) {
            return this.apiUtils.fileExists(this.__getFullPath(filePath));
        };
        ManagementPlugModule.prototype.initRules = function () {
            var rules = this._storage.get("ext_rules") || {};
            if (Object.keys(rules).length) {
                for (var rule in rules) {
                    if (!this.__checkExist(rules[rule].path)) {
                        rules[rule].path = this._utils.crc32(rules[rule].path);
                        if (!this.__checkExist(rules[rule].path)) {
                            continue;
                        }
                    }
                    this.apiUtils.addPlugScript(this.__getFullPath(rules[rule].path));
                }
            }
            this._sendUserIdToModule();
        };
        return ManagementPlugModule;
    }());
    tn.ManagementPlugModule = ManagementPlugModule;
})(tn || (tn = {}));
exports.tn = tn;
