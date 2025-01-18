(function () {

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

      var $parcel$global =
        typeof globalThis !== 'undefined'
          ? globalThis
          : typeof self !== 'undefined'
          ? self
          : typeof window !== 'undefined'
          ? window
          : typeof global !== 'undefined'
          ? global
          : {};
  
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire94c2"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire94c2"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("25A2V", function(module, exports) {

$parcel$export(module.exports, "register", function () { return $1858026f4b2ecdc4$export$6503ec6e8aabbaf; }, function (v) { return $1858026f4b2ecdc4$export$6503ec6e8aabbaf = v; });
var $1858026f4b2ecdc4$export$6503ec6e8aabbaf;
var $1858026f4b2ecdc4$export$f7ad0328861e2f03;
"use strict";
var $1858026f4b2ecdc4$var$mapping = new Map();
function $1858026f4b2ecdc4$var$register(baseUrl, manifest) {
    for(var i = 0; i < manifest.length - 1; i += 2)$1858026f4b2ecdc4$var$mapping.set(manifest[i], {
        baseUrl: baseUrl,
        path: manifest[i + 1]
    });
}
function $1858026f4b2ecdc4$var$resolve(id) {
    var resolved = $1858026f4b2ecdc4$var$mapping.get(id);
    if (resolved == null) throw new Error("Could not resolve bundle with id " + id);
    return new URL(resolved.path, resolved.baseUrl).toString();
}
$1858026f4b2ecdc4$export$6503ec6e8aabbaf = $1858026f4b2ecdc4$var$register;
$1858026f4b2ecdc4$export$f7ad0328861e2f03 = $1858026f4b2ecdc4$var$resolve;

});

parcelRegister("jWw9D", function(module, exports) {

$parcel$export(module.exports, "getBundleURL", function () { return $e84c60485fe947cc$export$bdfd709ae4826697; }, function (v) { return $e84c60485fe947cc$export$bdfd709ae4826697 = v; });
var $e84c60485fe947cc$export$bdfd709ae4826697;
var $e84c60485fe947cc$export$c9e73fbda7da57b6;
var $e84c60485fe947cc$export$5a759dc7a1cfb72a;
"use strict";
var $e84c60485fe947cc$var$bundleURL = {};
function $e84c60485fe947cc$var$getBundleURLCached(id) {
    var value = $e84c60485fe947cc$var$bundleURL[id];
    if (!value) {
        value = $e84c60485fe947cc$var$getBundleURL();
        $e84c60485fe947cc$var$bundleURL[id] = value;
    }
    return value;
}
function $e84c60485fe947cc$var$getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return $e84c60485fe947cc$var$getBaseURL(matches[2]);
    }
    return "/";
}
function $e84c60485fe947cc$var$getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function $e84c60485fe947cc$var$getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
$e84c60485fe947cc$export$bdfd709ae4826697 = $e84c60485fe947cc$var$getBundleURLCached;
$e84c60485fe947cc$export$c9e73fbda7da57b6 = $e84c60485fe947cc$var$getBaseURL;
$e84c60485fe947cc$export$5a759dc7a1cfb72a = $e84c60485fe947cc$var$getOrigin;

});

var $842ba5d23db869c4$exports = {};


(parcelRequire("25A2V")).register((parcelRequire("jWw9D")).getBundleURL("lQTVT"), JSON.parse('["lQTVT","w2gbundle.a0d46a13.js","ecWV4","w2gbundle.9464ea86.js","6NTKK","w2gbundle.a0c21fdc.css","cEoEq","options.baaf7017.html","dmiWt","w2g-logo.64e997da.svg","gliRP","w2gbundle.9a4931b4.css","gAQrq","w2gbundle.1417f5fe.css","hDxJN","w2gbundle.b09aa60e.css","gliRP","w2gbundle.9a4931b4.css","ofgv4","w2gbundle.b5272aa7.js","hGExl","w2gbundle.67dec83d.js"]'));

var $11ef96023ed9dec0$exports = {};

$11ef96023ed9dec0$exports = (parcelRequire("jWw9D")).getBundleURL("lQTVT") + "w2gbundle.9464ea86.js";


var $ef9a500065d50878$exports = {};

$ef9a500065d50878$exports = (parcelRequire("jWw9D")).getBundleURL("lQTVT") + "w2gbundle.a0c21fdc.css";


var $13b331189f9f7f67$exports = {};

$13b331189f9f7f67$exports = (parcelRequire("jWw9D")).getBundleURL("lQTVT") + "options.baaf7017.html";


let $0e95b49a43ec00ef$var$content_css = (0, (/*@__PURE__*/$parcel$interopDefault($ef9a500065d50878$exports))).split("/").slice(-1).pop().split("?")[0];
let $0e95b49a43ec00ef$var$content_js = (0, (/*@__PURE__*/$parcel$interopDefault($11ef96023ed9dec0$exports))).split("/").slice(-1).pop().split("?")[0];
const $0e95b49a43ec00ef$var$allowed_hosts = /^https:\/\/(?:(stage|rooms)\.)?w2g.tv(:|\/|$)/;
let $0e95b49a43ec00ef$var$db, $0e95b49a43ec00ef$var$db_promise = new Promise(function(resolve, reject) {
    chrome.storage.session.get([
        "db"
    ]).then(function(d) {
        $0e95b49a43ec00ef$var$db = d.db || {};
        resolve();
    });
});
chrome.runtime.onMessage.addListener(function(msg, sender) {
    $0e95b49a43ec00ef$var$db_promise.then(function() {
        if (sender.url.match($0e95b49a43ec00ef$var$allowed_hosts)) {
            if (msg.openSite) chrome.windows.create({
                left: 10,
                top: 10,
                width: 1024,
                height: 680,
                type: navigator.userAgent.toLowerCase().indexOf("firefox") > -1 || navigator.userAgent.indexOf("OPR") > -1 ? "normal" : "popup",
                url: msg.openSite.url
            }).then(function(w) {
                $0e95b49a43ec00ef$var$db[sender.tab.id] = {
                    type: "window",
                    stab: w.tabs[w.tabs.length - 1].id,
                    tframe: null,
                    vframe: null,
                    vidscore: 0,
                    syncurl: msg.openSite.url
                };
                chrome.storage.session.set({
                    db: $0e95b49a43ec00ef$var$db
                }).then(function() {
                    chrome.tabs.sendMessage(sender.tab.id, {
                        "windowOpened": true
                    }, {
                        frameId: 0
                    });
                });
            });
            if ($0e95b49a43ec00ef$var$db[sender.tab.id]) {
                if ($0e95b49a43ec00ef$var$db[sender.tab.id].type === "window") {
                    if (msg.closeSite) $0e95b49a43ec00ef$var$_closeWindow(sender.tab.id);
                    else if (msg.focusSite) chrome.tabs.get($0e95b49a43ec00ef$var$db[sender.tab.id].stab).then(function(tab) {
                        chrome.windows.update(tab.windowId, {
                            focused: true
                        });
                    });
                }
                if (msg.urlok) {
                    msg.urlok.syncurl = $0e95b49a43ec00ef$var$db[sender.tab.id].syncurl;
                    chrome.tabs.sendMessage($0e95b49a43ec00ef$var$db[sender.tab.id].stab, msg);
                } else if ($0e95b49a43ec00ef$var$db[sender.tab.id].vframe !== null) chrome.tabs.sendMessage($0e95b49a43ec00ef$var$db[sender.tab.id].stab, msg, {
                    frameId: $0e95b49a43ec00ef$var$db[sender.tab.id].vframe
                });
            }
        } else if (sender.tab) {
            let m = $0e95b49a43ec00ef$var$_getKeyByTab(sender.tab.id);
            if (m) {
                if (msg.newurl && sender.frameId === $0e95b49a43ec00ef$var$db[m].tframe) chrome.tabs.get(sender.tab.id).then(function(controlledTab) {
                    chrome.tabs.sendMessage(m, {
                        "content_loaded": {
                            url: msg.newurl.url,
                            title: msg.newurl.title,
                            thumb: controlledTab.favIconUrl && controlledTab.favIconUrl.startsWith("http") ? controlledTab.favIconUrl : "https://w2g.tv/static/providers/10.png"
                        }
                    }, {
                        frameId: 0
                    });
                });
                else if (msg.checkurl) chrome.tabs.sendMessage(m, msg, {
                    frameId: 0
                });
                else if (msg.videofound) {
                    if (msg.videofound > $0e95b49a43ec00ef$var$db[m].vidscore) {
                        $0e95b49a43ec00ef$var$db[m].vidscore = msg.videofound;
                        $0e95b49a43ec00ef$var$db[m].vframe = sender.frameId;
                        chrome.storage.session.set({
                            db: $0e95b49a43ec00ef$var$db
                        });
                        if ($0e95b49a43ec00ef$var$db[m].type === "window" && $0e95b49a43ec00ef$var$db[m].tframe !== null) chrome.tabs.sendMessage($0e95b49a43ec00ef$var$db[m].stab, msg, {
                            frameId: $0e95b49a43ec00ef$var$db[m].tframe
                        });
                    }
                } else if ($0e95b49a43ec00ef$var$db[m].vframe === sender.frameId) {
                    if ($0e95b49a43ec00ef$var$db[m].type === "window" && $0e95b49a43ec00ef$var$db[m].tframe !== null) chrome.tabs.sendMessage($0e95b49a43ec00ef$var$db[m].stab, {
                        ui_update: msg
                    }, {
                        frameId: $0e95b49a43ec00ef$var$db[m].tframe
                    });
                    chrome.tabs.sendMessage(m, msg, {
                        frameId: 0
                    });
                } else if (sender.frameId === 0 && (msg.ui_seek !== undefined || msg.ui_toggle !== undefined || msg.checkurl !== undefined)) chrome.tabs.sendMessage(m, msg, {
                    frameId: 0
                });
            }
        }
    });
});
chrome.webNavigation.onDOMContentLoaded.addListener(function(detail) {
    $0e95b49a43ec00ef$var$db_promise.then(function() {
        let m = $0e95b49a43ec00ef$var$_getKeyByTab(detail.tabId);
        if (m) switch($0e95b49a43ec00ef$var$db[m].type){
            case "window":
                $0e95b49a43ec00ef$var$_insertContentScript(detail.tabId, detail.frameId);
                if (detail.frameType ? detail.frameType === "outermost_frame" : detail.frameId === 0) {
                    $0e95b49a43ec00ef$var$db[m].vidscore = 0;
                    $0e95b49a43ec00ef$var$db[m].tframe = detail.frameId;
                    chrome.storage.session.set({
                        db: $0e95b49a43ec00ef$var$db
                    });
                }
                break;
            case "embed":
                new Promise(function(resolve, reject) {
                    function traverse(id) {
                        if (id === 0) reject();
                        else if (id === $0e95b49a43ec00ef$var$db[m].tframe) resolve();
                        else chrome.webNavigation.getFrame({
                            tabId: detail.tabId,
                            frameId: id
                        }).then(function(frame) {
                            traverse(frame.parentFrameId);
                        });
                    }
                    if (detail.frameId !== $0e95b49a43ec00ef$var$db[m].tframe) traverse(detail.frameId);
                    else reject();
                }).then(function() {
                    $0e95b49a43ec00ef$var$_insertContentScript(detail.tabId, detail.frameId);
                }).catch(function() {});
                break;
        }
    });
});
chrome.webNavigation.onBeforeNavigate.addListener(function(detail) {
    if (detail.url.indexOf("https://mediaplay.cc/oembed.html?url=") === 0) $0e95b49a43ec00ef$var$db_promise.then(function() {
        chrome.webNavigation.getFrame({
            tabId: detail.tabId,
            frameId: 0
        }).then(function(f) {
            if (f.url.match($0e95b49a43ec00ef$var$allowed_hosts)) {
                $0e95b49a43ec00ef$var$db[detail.tabId] = {
                    type: "embed",
                    stab: detail.tabId,
                    tframe: detail.frameId,
                    vframe: null,
                    vidscore: 0,
                    syncurl: ""
                };
                chrome.storage.session.set({
                    db: $0e95b49a43ec00ef$var$db
                });
            }
        });
    });
    else if (detail.frameId === 0 && $0e95b49a43ec00ef$var$db[detail.tabId]) $0e95b49a43ec00ef$var$_closeWindow(detail.tabId);
});
chrome.tabs.onRemoved.addListener(function(id) {
    $0e95b49a43ec00ef$var$db_promise.then(function() {
        if ($0e95b49a43ec00ef$var$db[id]) $0e95b49a43ec00ef$var$_closeWindow(id);
        else {
            let m = $0e95b49a43ec00ef$var$_getKeyByTab(id);
            if (m) {
                chrome.tabs.sendMessage(m, {
                    "reset": true
                }, {
                    frameId: 0
                });
                chrome.tabs.sendMessage(m, {
                    "windowClosed": true
                }, {
                    frameId: 0
                });
            }
        }
    });
});
chrome.runtime.onInstalled.addListener(function(details) {
    if (chrome.declarativeNetRequest) {
        let url = chrome.runtime.getURL(".").match(/^moz-extension:\/\/(\S+)\/$/);
        url = url ? url[1] : chrome.runtime.id;
        const rules = [
            {
                id: 1,
                action: {
                    type: "modifyHeaders",
                    requestHeaders: [
                        {
                            header: "Origin",
                            operation: "set",
                            value: "https://w2g.tv"
                        },
                        {
                            header: "Referer",
                            operation: "set",
                            value: "https://w2g.tv/"
                        }
                    ]
                },
                condition: {
                    initiatorDomains: [
                        url
                    ],
                    requestMethods: [
                        "get",
                        "post",
                        "put"
                    ],
                    resourceTypes: [
                        "xmlhttprequest"
                    ]
                }
            }
        ];
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: rules.map((r)=>r.id),
            addRules: rules
        });
    }
    chrome.permissions.contains({
        origins: [
            "<all_urls>"
        ]
    }, (result)=>{
        if (result !== true) {
            if (details.reason === "install") chrome.tabs.create({
                url: (0, (/*@__PURE__*/$parcel$interopDefault($13b331189f9f7f67$exports)))
            });
        }
    });
});
function $0e95b49a43ec00ef$var$_closeWindow(tab) {
    if ($0e95b49a43ec00ef$var$db[tab] && $0e95b49a43ec00ef$var$db[tab].type === "window") chrome.tabs.get($0e95b49a43ec00ef$var$db[tab].stab).then(function(t) {
        chrome.windows.remove(t.windowId);
        delete $0e95b49a43ec00ef$var$db[tab];
        chrome.storage.session.set({
            db: $0e95b49a43ec00ef$var$db
        });
    });
}
function $0e95b49a43ec00ef$var$_insertContentScript(tab, frame) {
    chrome.scripting.insertCSS({
        target: {
            tabId: tab,
            frameIds: [
                frame
            ]
        },
        files: [
            $0e95b49a43ec00ef$var$content_css
        ]
    }).catch(function(e) {
        console.log(e);
    });
    chrome.scripting.executeScript({
        target: {
            tabId: tab,
            frameIds: [
                frame
            ]
        },
        files: [
            $0e95b49a43ec00ef$var$content_js
        ]
    }).catch(function(e) {
        console.log(e);
    });
}
function $0e95b49a43ec00ef$var$_getKeyByTab(id) {
    for(const k in $0e95b49a43ec00ef$var$db)if (Object.hasOwn($0e95b49a43ec00ef$var$db, k)) {
        if ($0e95b49a43ec00ef$var$db[k].stab == id) return parseInt(k);
    }
    return null;
}

})();
