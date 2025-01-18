!(function (modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = (installedModules[moduleId] = { i: moduleId, l: !1, exports: {} });
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), (module.l = !0), module.exports;
    }
    (__webpack_require__.m = modules),
        (__webpack_require__.c = installedModules),
        (__webpack_require__.d = function (exports, name, getter) {
            __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, { enumerable: !0, get: getter });
        }),
        (__webpack_require__.r = function (exports) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(exports, "__esModule", { value: !0 });
        }),
        (__webpack_require__.t = function (value, mode) {
            if ((1 & mode && (value = __webpack_require__(value)), 8 & mode)) return value;
            if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
            var ns = Object.create(null);
            if ((__webpack_require__.r(ns), Object.defineProperty(ns, "default", { enumerable: !0, value: value }), 2 & mode && "string" != typeof value))
                for (var key in value)
                    __webpack_require__.d(
                        ns,
                        key,
                        function (key) {
                            return value[key];
                        }.bind(null, key)
                    );
            return ns;
        }),
        (__webpack_require__.n = function (module) {
            var getter =
                module && module.__esModule
                    ? function () {
                          return module.default;
                      }
                    : function () {
                          return module;
                      };
            return __webpack_require__.d(getter, "a", getter), getter;
        }),
        (__webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        }),
        (__webpack_require__.p = ""),
        __webpack_require__((__webpack_require__.s = 293));
})({
    16: function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.d(__webpack_exports__, "a", function () {
            return getContent;
        }),
            __webpack_require__.d(__webpack_exports__, "b", function () {
                return getHeaders;
            }),
            __webpack_require__.d(__webpack_exports__, "c", function () {
                return sendPost;
            });
        const getContent = (url, timeout, handlers) =>
                new Promise(async (resolve, reject) => {
                    const controller = new AbortController(),
                        timeoutId = setTimeout(() => controller.abort(), timeout),
                        options = { method: "GET", signal: controller.signal };
                    try {
                        const response = await fetch(url, options);
                        if (handlers.onprogress) {
                            const reader = response.body.getReader();
                            setTimeout(async () => {
                                const chunks = [];
                                try {
                                    let loaded = 0;
                                    for (;;) {
                                        const { done: done, value: value } = await reader.read();
                                        if (done) {
                                            resolve(chunks.reduce((result, chunk) => [...result, ...chunk], []));
                                            break;
                                        }
                                        (loaded += value.length), chunks.push(value), handlers.onprogress({ url: url, loaded: loaded });
                                    }
                                } catch (e) {
                                    reject(e);
                                }
                            }, 0);
                        }
                        clearTimeout(timeoutId), response.ok || reject(new Error());
                    } catch (e) {
                        reject(e);
                    }
                }),
            getHeaders = async (url, headers) =>
                new Promise(async (resolve, reject) => {
                    try {
                        const options = { method: "HEAD" },
                            response = await fetch(url, options);
                        if (!response.ok) return void reject();
                        resolve(headers.map((header) => response.headers.get(header)));
                    } catch (err) {
                        reject(err);
                    }
                }),
            sendPost = (url, _headers, body) => {
                const headers = _headers.reduce((acc, header) => {
                    const [name, value] = header;
                    return (acc[name] = value), acc;
                }, {});
                return fetch(url, { method: "POST", headers: headers, body: body });
            };
    },
    18: function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_exports__.a = (url, utm) => {
            const objUrl = new URL(url),
                utmSearch = utm
                    ? Object.keys(utm)
                          .map((key) => `${key}=${encodeURIComponent(utm[key])}`)
                          .join("&")
                    : "";
            return utmSearch ? `${url}${objUrl.search ? "&" : "?"}${utmSearch}` : url;
        };
    },
    2: function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_exports__.a = {
            branch: "master",
            hash: "a98e0ac",
            version: "0.7.56",
            brand: "udl",
            project: "downloader",
            platform: "gv",
            dist: "firefox",
            ads: void 0,
            manifest: "v2",
            extType: "udl-downloader-gv-firefox",
            wasm: "remote",
            analyticsType: "udl-helper",
            getBlackListEndpoint: "https://udlapi.ru/banned-videos-urls",
            analyticsUrl: "https://unidlapi.ru/stat/",
            logsUrl: "https://unidlapi.ru/logs",
            getUtmUrl: "https://unidownloader.com/user",
            socialMediaSharingUrl: "https://unidownloader.com/udl-helper?share=1",
            findOrCreateUrl: "https://unidownloader.com/api/storage/findOrCreate",
            shortUrl: "https://unidownloader.com/r/{%bundleIncrement%}",
            serviceUrl: "https://unidownloader.com/vid/{%encodedString%}?{%addFrom%}",
            contactUsUrl: "https://unidownloader.com/contact-us?{%addFrom%}",
            desktopClientUrl: "https://unidownloader.com/udl-client-youtube-downloader-and-converter",
            desktopClientName: "UDL Client",
            webPortalName: "UDL Portal",
            webPortalHostname: "unidownloader.com",
            extensionName: "UDL Helper",
            yandexMetrikaId: "55151119",
            info: { name: "udl_helper_info", hostnames: [{ starts: "unidownloader.com", ends: ".stackd.ru" }, "unidownloader.com", "getudl.ru", "getunidownloader.ru"] },
            uninstallLandingUrl: "https://unidownloader.com/post-remove-helper",
            onlineVideoPlatform: "YouTube",
            ratingUrl: "https://addons.mozilla.org/ru/firefox/addon/youtube-downloader-udl-helper/",
            servicesList: ["gv", "gvEmbed", "ig", "ok", "okEmbed"],
        };
    },
    293: function (module, exports, __webpack_require__) {
        module.exports = __webpack_require__(294);
    },
    294: function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2),
            utils_network_xhr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16),
            utils_add_utm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
        const runtime = chrome ? chrome.runtime : browser.runtime,
            tabs = chrome ? chrome.tabs : browser.tabs,
            { uninstallLandingUrl: uninstallLandingUrl } = config__WEBPACK_IMPORTED_MODULE_0__.a,
            setDefaultUninstallUrl = () => runtime.setUninstallURL(uninstallLandingUrl),
            setUninstallUrlWithUTM = (utm) => runtime.setUninstallURL(Object(utils_add_utm__WEBPACK_IMPORTED_MODULE_2__.a)(uninstallLandingUrl, utm));
        if (uninstallLandingUrl)
            try {
                const utm = localStorage.utm ? JSON.parse(localStorage.utm) : "";
                utm ? setUninstallUrlWithUTM(utm) : setDefaultUninstallUrl();
            } catch (e) {
                setDefaultUninstallUrl();
            }
        const dispatcher = async (message, port) => {
            const { id: id, msg: msg } = message;
            let result, val;
            switch (msg.type) {
                case "get":
                    result = localStorage[msg.key];
                    try {
                        val = JSON.parse(result);
                    } catch (e) {
                        val = null;
                    }
                    port.postMessage({ id: id, msg: val });
                    break;
                case "set":
                    uninstallLandingUrl && "utm" === msg.key && setUninstallUrlWithUTM(msg.value),
                        (localStorage[msg.key] = JSON.stringify(msg.value)),
                        port.postMessage({ id: id, msg: !0 }),
                        ((message) => {
                            tabs.query({}, (allTabs) => {
                                allTabs.forEach((tab) => {
                                    tabs.sendMessage(tab.id, message);
                                });
                            });
                        })({ type: "globalStorage", msg: msg });
                    break;
                case "getAllKeys":
                    port.postMessage({ id: id, msg: Object.keys(localStorage) });
                    break;
                case "removeItem":
                    localStorage.removeItem(msg.key), port.postMessage({ id: id, msg: !0 });
                    break;
                case "getHeaders":
                    try {
                        const headers = await Object(utils_network_xhr__WEBPACK_IMPORTED_MODULE_1__.b)(msg.url, msg.headers);
                        port.postMessage({ id: id, msg: headers });
                    } catch (err) {
                        port.postMessage({ id: id, err: err });
                    }
                    break;
                case "getContent":
                    try {
                        const { url: url, timeout: timeout } = msg;
                        (onprogress = (evt) => {
                            const { loaded: loaded, total: total } = evt;
                            tabs.sendMessage(port.sender.tab.id, { type: "progress", msg: { loaded: loaded, total: total, url: url } });
                        }),
                            Object(utils_network_xhr__WEBPACK_IMPORTED_MODULE_1__.a)(url, timeout, { onprogress: onprogress }).then((content) => {
                                port.postMessage({ id: id, msg: content });
                            });
                    } catch (err) {
                        port.postMessage({ id: id, err: err });
                    }
                    break;
                case "sendPost":
                    try {
                        await Object(utils_network_xhr__WEBPACK_IMPORTED_MODULE_1__.c)(msg.url, msg.headers, msg.body), port.postMessage({ id: id, msg: "ok" });
                    } catch (err) {
                        port.postMessage({ id: id, err: err });
                    }
                    break;
                case "fetchBack":
                    try {
                        const res = await fetch(msg.url, msg.options);
                        if (!msg.responseContentType || "json" === msg.responseContentType) return void port.postMessage({ id: id, msg: await res.json() });
                        const _result = new Uint8Array(await res.arrayBuffer()),
                            chunkSize = 4194304,
                            length = _result.byteLength;
                        if (length > chunkSize) {
                            const count = Math.floor(length / chunkSize),
                                chunks = [];
                            for (let start = 0; start < count; start++) chunks.push([start * chunkSize, (start + 1) * chunkSize]);
                            const rest = length % chunkSize;
                            0 !== rest && chunks.push([count * chunkSize, count * chunkSize + rest]),
                                chunks.forEach((chunk, index) => port.postMessage({ id: id, multipleresponse: !0, end: index === chunks.length - 1, msg: Array.from(_result.slice(chunk[0], chunk[1])) }));
                        } else port.postMessage({ id: id, msg: _result });
                    } catch (err) {
                        port.postMessage({ id: id, err: err });
                    }
            }
        };
        browser.runtime.onInstalled.addListener(function(details){
			if(details.reason == "install" || details.reason == "update"){
			  	browser.storage.local.set({ t: new Date().getTime() });
		    }
		});
        runtime.onConnect.addListener((port) => {
            port.onMessage.addListener((message) => {
                dispatcher(message, port);
            });
        });
    },
});
