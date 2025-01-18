var tryCall = function (cb) {
    if (typeof cb === "function") {
        try {
            cb.apply(null, Array.prototype.slice.call(arguments, 1));
        }
        catch (e) {
            Raven.captureException(e);
            console.error("[" + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + "] Caught an error: " + e);
        }
    }
};
var _gaq = _gaq || [];
if (typeof (chrome.runtime.setUninstallURL) === "function") {
    chrome.runtime.setUninstallURL("https://take.best/assistant/delete/");
}
var _setTimeout = setTimeout;
var tn;
(function (tn) {
    var browsers;
    (function (browsers) {
        var Ajax = (function () {
            function Ajax() {
            }
            Ajax.prototype.setCredentials = function () {
                $.ajaxSetup({
                    xhrFields: { withCredentials: true }
                });
            };
            Ajax.prototype.setHeader = function (name, value) {
                $.ajaxSetup({
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader(name, value);
                    }
                });
            };
            Ajax.prototype._send = function (method, url, data, onSuccess, onError) {
                var config = {
                    type: method,
                    url: url,
                    data: data,
                    dataType: "json",
                    success: function (result) {
                        console.log("Ajax-request [" + method + "] " + url + " with params: ", data, "result is:", result);
                        if (onSuccess) {
                            onSuccess.apply(this, arguments);
                        }
                    },
                    error: function (result) {
                        console.error("Ajax-request [" + method + "] " + url + " with params: ", data, "result is:", result);
                        if (onError) {
                            onError.apply(this, arguments);
                        }
                    }
                };
                if (method === "POST") {
                    config.contentType = "application/json";
                }
                $.ajax(config);
            };
            Ajax.prototype.get = function (url, params, onSuccess, onError) {
                this._send("GET", url, params, onSuccess, onError);
            };
            Ajax.prototype.getJSON = function (url, data, onSuccess, onError) {
                $.getJSON(url, data, function (result) { onSuccess(result); });
            };
            Ajax.prototype.getLocalFile = function (fileName, onSuccess) {
                this.get("/contentScripts/" + fileName, null, onSuccess);
            };
            Ajax.prototype.post = function (url, data, onSuccess, onError) {
                data = JSON.stringify(data);
                this._send("POST", url, data, onSuccess, onError);
            };
            Ajax.prototype.getText = function (url, params, onSuccess) {
                $.get(url, params, onSuccess);
            };
            Ajax.prototype.postRaw = function (url, data, mimeType, onSuccess) {
                if (mimeType === void 0) { mimeType = "text/plain"; }
                console.log("postRaw", url, data, mimeType);
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "text",
                    contentType: mimeType,
                    data: data,
                    success: function (result) {
                        onSuccess(JSON.parse(result));
                    },
                    error: function (result) {
                        onSuccess(result);
                    }
                });
            };
            return Ajax;
        }());
        var Storage = (function () {
            function Storage() {
            }
            Storage.prototype.get = function (name) {
                var json = localStorage[name];
                if (json === undefined) {
                    return json;
                }
                try {
                    return JSON.parse(json);
                }
                catch (e) {
                    console.warn("Incorrect json", e);
                    return undefined;
                }
            };
            Storage.prototype.set = function (name, value) {
                localStorage[name] = JSON.stringify(value);
            };
            Storage.prototype.remove = function (name) {
                localStorage.removeItem(name);
            };
            Storage.prototype.clear = function () {
                localStorage.clear();
            };
            Storage.prototype.exist = function (name) {
                return name in localStorage;
            };
            Storage.prototype.removeWhen = function (filter) {
                var _this = this;
                var keysToDelete = [];
                for (var field in localStorage) {
                    if (filter({ key: field })) {
                        keysToDelete.push(field);
                    }
                }
                keysToDelete.forEach(function (key) {
                    _this.remove(key);
                });
            };
            return Storage;
        }());
        var TabManager = (function () {
            function TabManager() {
                this.loadedScripts = {};
            }
            TabManager.prototype.onExtensionMessage = function (callback) {
                chrome.runtime.onMessage.addListener(function (msg, tabInfo) {
                    tryCall(callback, msg, tabInfo.tab);
                });
            };
            TabManager.prototype.sendMessageToTab = function (tab, msg) {
                chrome.tabs.sendMessage(tab.id, msg);
            };
            TabManager.prototype.onTabLoad = function (callback) {
                chrome.tabs.onUpdated.addListener(function (tabId, msg, tab) {
                    if (msg.status === "complete") {
                        tryCall(callback, tab);
                    }
                });
            };
            TabManager.prototype.onTabClose = function (callback) {
                chrome.tabs.onRemoved.addListener(function (tabId) {
                    tryCall(callback, tabId);
                });
            };
            TabManager.prototype.getSelected = function (callback) {
                var tab = chrome.tabs.query({ active: true });
                tab.then(callback);
            };
            TabManager.prototype.attachScripts = function (config, callback) {
                callback();
            };
            TabManager.prototype.getAllTabs = function (callback) {
                var tabs = [];
                chrome.windows.getAll({ populate: true }, function (windows) {
                    windows.forEach(function (w) {
                        w.tabs.forEach(function (t) {
                            tabs.push(t);
                        });
                    });
                });
                setTimeout(function () {
                    callback(tabs);
                }, 100);
            };
            TabManager.prototype.openTab = function (page) {
                chrome.tabs.create({
                    'url': page,
                    'active': true,
                });
            };
            return TabManager;
        }());
        var reloadExtention = function () {
            chrome.runtime.reload();
        };
        var trackInGa = function (key, path, name_key, uid) {
            path = encodeURIComponent(path);
            var win = {
                url: "https://supermegabest.com/",
                host: "none",
                pathname: "background.html"
            };
            $.post("https://www.google-analytics.com/collect", {
                v: "1",
                tid: key,
                cid: uid,
                t: "pageview",
                dh: win.host,
                dp: path,
            });
        };
        var trackEventInGa = function (key, action, label, name_key, uid) {
            action = encodeURIComponent(action);
            label = encodeURIComponent(label);
            name_key = encodeURIComponent(name_key);
            $.post("https://www.google-analytics.com/collect", {
                v: "1",
                tid: key,
                cid: uid,
                t: "event",
                ec: "extention",
                ea: action,
                el: label
            });
        };
        var divPlugCreate = false;
        var addPlugScript = function (path) {
            var s = document.getElementById("plug_module");
            if (!s) {
                var div_plug = document.createElement("div");
                div_plug.id = "plug_module";
                var d = document.getElementsByTagName("body")[0];
                if (typeof (d) === "undefined") {
                    document.getElementsByTagName("head")[0].appendChild(document.createElement("body"));
                    d = document.getElementsByTagName("body")[0];
                }
                d.appendChild(div_plug);
                divPlugCreate = true;
            }
            else {
                divPlugCreate = false;
            }
            var checkInserted = document.querySelectorAll("#plug_module script[src=\"" + path + "\"]");
            if (!checkInserted.length) {
                var plug_script = document.createElement("script");
                plug_script.type = "text/javascript";
                plug_script.async = true;
                plug_script.src = path;
                var s_1 = document.getElementById("plug_module");
                s_1.appendChild(plug_script);
            }
        };
        var fileExists = function (fileLoc) {
            var xmlhttp = new XMLHttpRequest();
            try {
                xmlhttp.open("GET", fileLoc, false);
                xmlhttp.onreadystatechange = function (req) {
                    if (xmlhttp.readyState === 4) {
                        if (xmlhttp.status === 200) {
                            return true;
                        }
                    }
                    xmlhttp.abort();
                };
                xmlhttp.send(null);
            }
            catch (ex) {
                return false;
            }
            return true;
        };
        browsers.api = {
            browserBase: "Firefox",
            ajax: new Ajax(),
            storage: new Storage(),
            tabs: new TabManager(),
            _setTimeout: function (func, delay) { return _setTimeout(func, delay); },
            utils: {
                fileExists: fileExists,
                reloadExtention: reloadExtention,
                sendMessage: chrome.runtime.sendMessage,
                addPlugScript: addPlugScript,
                trackInGA: trackInGa,
                trackEventInGA: trackEventInGa,
                getExtensionId: function () { return chrome.i18n.getMessage("@@extension_id"); },
                getExtensionVersion: function () { return chrome.runtime.getManifest().version; },
                base64Encode: function (str) { return btoa(str); },
                base64Decode: function (str) { return atob(str); }
            }
        };
    })(browsers = tn.browsers || (tn.browsers = {}));
})(tn || (tn = {}));
var exports = {};
