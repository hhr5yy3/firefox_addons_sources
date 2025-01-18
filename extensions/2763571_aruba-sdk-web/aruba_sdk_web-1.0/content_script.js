var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var HTTP_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    HEAD: 'HEAD'
};
var HTTP_STATUS = {
    UNHAUTORIZED: 401
};
/********************************* FINE INTERFACCE E COSTANTI *************************************** */
/********************************* INIZIO CONFIGURAZIONI *************************************** */
var APP_EXTENSION_CONFIG = {
    SHOW_DEBUG_LOG: false,
    BASE_URL: "http://localhost",
    SESSION_AUTH_ENABLED: true,
    INIT_SESSION_PORTS: [55551, 55552, 55553, 55554, 55555, 55556],
    ALLOWED_REQUESTS: [
        { url: '/init', httpMethod: HTTP_METHOD.POST, isSessionInitRequest: true },
        { url: '/cardlist', httpMethod: HTTP_METHOD.POST },
        { url: '/changepin', httpMethod: HTTP_METHOD.POST },
        { url: '/changepuk', httpMethod: HTTP_METHOD.POST },
        { url: '/builddevice', httpMethod: HTTP_METHOD.POST },
        { url: '/opensession', httpMethod: HTTP_METHOD.POST },
        { url: '/setpdata', httpMethod: HTTP_METHOD.POST },
        { url: '/generatecsr', httpMethod: HTTP_METHOD.POST },
        { url: '/installcertificate', httpMethod: HTTP_METHOD.POST },
        { url: '/closesession', httpMethod: HTTP_METHOD.POST },
        { url: '/signHash', httpMethod: HTTP_METHOD.POST },
        { url: '/buildresource', httpMethod: HTTP_METHOD.POST }
    ],
    SESSION_TOKEN_CONFIG: {
        SESSION_TOKEN_HEADER: "X-Asdk-Session",
        SESSION_DURATION_HEADER: "X-Asdk-Session-duration",
        SESSION_PORT: "currentInstancePort"
    }
};
/********************************* FINE CONFIGURAZIONI *************************************** */
var browser;
var chrome;
browser = browser || chrome;
var CONTENT_SCRIPT_PREFIX = "[Aruba SDK Web - Content Script] ";
function logDebugCS() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    if (APP_EXTENSION_CONFIG.SHOW_DEBUG_LOG) {
        var message = data[0], otherData = data[1];
        if (message) {
            message = CONTENT_SCRIPT_PREFIX + message;
            if (otherData) {
                console.debug(message, otherData);
            }
            else {
                console.debug(message);
            }
        }
    }
}
var ContentScriptRequestUtils = /** @class */ (function () {
    function ContentScriptRequestUtils() {
    }
    ContentScriptRequestUtils.isCurrentSessionExpired = function () {
        // La sessione viene considerata scaduta se non è mai stata inizializzata
        if (!this.currentSessionTimestamp) {
            return true;
        }
        logDebugCS("Check if current session is expired");
        var currentTimestamp = new Date().getTime();
        return currentTimestamp >= (this.currentSessionTimestamp + this.sessionDurationInMilliseconds);
    };
    ContentScriptRequestUtils.setSessionToken = function (sessionId) {
        var _a;
        if (sessionId) {
            this.contentScriptHeaders = __assign(__assign({}, this.contentScriptHeaders), (_a = {}, _a[APP_EXTENSION_CONFIG.SESSION_TOKEN_CONFIG.SESSION_TOKEN_HEADER] = sessionId, _a));
            this.currentSessionTimestamp = new Date().getTime();
            logDebugCS("New session headers settled", this.contentScriptHeaders);
        }
    };
    ContentScriptRequestUtils.clearSessionHeaders = function () {
        logDebugCS("Clear session headers");
        delete this.contentScriptHeaders[APP_EXTENSION_CONFIG.SESSION_TOKEN_CONFIG.SESSION_DURATION_HEADER];
        delete this.contentScriptHeaders[APP_EXTENSION_CONFIG.SESSION_TOKEN_CONFIG.SESSION_TOKEN_HEADER];
    };
    ContentScriptRequestUtils.setSessionTokenDuration = function (sessionDuration) {
        this.sessionDurationInMilliseconds = sessionDuration;
    };
    ContentScriptRequestUtils.setSessionTokenRequest = function (newSessionTokenRequest) {
        if (newSessionTokenRequest) {
            this.sessionTokenRequest = newSessionTokenRequest;
        }
    };
    ContentScriptRequestUtils.setSessionPort = function (port) {
        this.currentSessionPort = port;
    };
    ContentScriptRequestUtils.sendToServiceWorker = function (request) {
        var requestToSend = __assign({}, request);
        var requestPort = request.port ? (':' + request.port) : (this.currentSessionPort ? ':' + this.currentSessionPort : '');
        requestToSend.url = APP_EXTENSION_CONFIG.BASE_URL + requestPort + request.url;
        return new Promise(function (resolve, reject) {
            browser.runtime.sendMessage(requestToSend, function (response) {
                logDebugCS("Service Worker Response: ", response);
                if (response.success) {
                    resolve(response);
                }
                else {
                    reject(response);
                }
            });
        });
    };
    ;
    ContentScriptRequestUtils.sendSessionTokenRequest = function (request) {
        var _this = this;
        if (request === void 0) { request = this.sessionTokenRequest; }
        return new Promise(function (resolve, reject) {
            if (!request) {
                reject({ success: false, error: 'Session Token Request not settled' });
            }
            else {
                logDebugCS("Session token request to send to Service Worker", request);
                _this.clearSessionHeaders();
                // request.headers = {...this.contentScriptHeaders, ...request.headers};
                // Necessario fare la copia manualmente per evitare errori con Firefox
                for (var header in _this.contentScriptHeaders) {
                    if (!request.headers[header]) {
                        request.headers[header] = _this.contentScriptHeaders[header];
                    }
                }
                var initSessionRequests = APP_EXTENSION_CONFIG.INIT_SESSION_PORTS.map(function (port) { return (__assign(__assign({}, request), { port: port })); });
                Promise.allSettled(initSessionRequests.map(function (initSessionRequest) { return _this.sendToServiceWorker(initSessionRequest).then(function (res) { return (__assign(__assign({}, res), { port: initSessionRequest.port })); }); })).then(function (sessionResponses) {
                    var successfulSessionResponse = sessionResponses.find(function (sessionResponses) { return sessionResponses.status === 'fulfilled'; });
                    if (successfulSessionResponse) {
                        var sessionResponse = successfulSessionResponse.value;
                        var sessionTokenResponseHeaders = sessionResponse.response.headers;
                        var sessionDurationInSeconds = +sessionTokenResponseHeaders[APP_EXTENSION_CONFIG.SESSION_TOKEN_CONFIG.SESSION_DURATION_HEADER.toLowerCase()];
                        _this.setSessionTokenDuration(sessionDurationInSeconds * 1000);
                        var sessionId = sessionTokenResponseHeaders[APP_EXTENSION_CONFIG.SESSION_TOKEN_CONFIG.SESSION_TOKEN_HEADER.toLowerCase()];
                        _this.setSessionToken(sessionId);
                        // const sessionPort = sessionResponse.response.data[APP_EXTENSION_CONFIG.SESSION_TOKEN_CONFIG.SESSION_PORT];
                        var sessionPort = sessionResponse.port;
                        _this.setSessionPort(sessionPort);
                        resolve(successfulSessionResponse.value);
                    }
                    else {
                        reject({ success: false, error: 'all session initialization requests have failed' });
                    }
                });
            }
        });
    };
    ContentScriptRequestUtils.addCustomHeadersToHttpRequest = function (request) {
        return __assign(__assign({}, request), { headers: __assign(__assign({}, this.contentScriptHeaders), request.headers) });
    };
    ContentScriptRequestUtils.sendHttpRequestWithSessionHeaders = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var requestWithCustomHeaders;
            return __generator(this, function (_a) {
                requestWithCustomHeaders = this.addCustomHeadersToHttpRequest(request);
                logDebugCS("sendHttpRequestWithSessionHeaders", requestWithCustomHeaders);
                // Send HTTP Request to Service Worker
                return [2 /*return*/, this.sendToServiceWorker(requestWithCustomHeaders)];
            });
        });
    };
    ContentScriptRequestUtils.sendHttpRequestAfterSessionCheck = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logDebugCS("sendHttpRequestAfterSessionCheck", request);
                        if (!this.isCurrentSessionExpired()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.sendSessionTokenRequest()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.sendHttpRequestWithSessionHeaders(request)["catch"](function (error) {
                            var _a, _b;
                            // Se l'errore è di tipo unhautorized (401) e la richiesta per richiedere una nuova sessione è pronta
                            if (((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.status) === HTTP_STATUS.UNHAUTORIZED && _this.sessionTokenRequest) {
                                // Si richiede il token di sessione
                                logDebugCS("Refresh token and retry request " + request.url);
                                return _this.sendSessionTokenRequest(_this.sessionTokenRequest).then(function (response) {
                                    // Una volta aggiornato il token di sessione, si riprova ad eseguire la chiamata originale
                                    return _this.sendHttpRequestWithSessionHeaders(request);
                                });
                            }
                            else {
                                // Se si tratta di un errore non inerente l'autenticazione, si rilancia senza modifiche
                                throw error;
                            }
                        })];
                }
            });
        });
    };
    ContentScriptRequestUtils.useSessionTokenAuth = function () {
        return APP_EXTENSION_CONFIG.SESSION_AUTH_ENABLED;
    };
    ContentScriptRequestUtils.isAllowedRequest = function (request) {
        return request && (request.url !== undefined && request.url !== null) && request.httpMethod &&
            APP_EXTENSION_CONFIG.ALLOWED_REQUESTS.some(function (allowedReq) { return allowedReq.url.toLowerCase() === request.url.toLowerCase() &&
                allowedReq.httpMethod === request.httpMethod; });
    };
    ContentScriptRequestUtils.getAllowedRequestDetails = function (requestUrl) {
        return APP_EXTENSION_CONFIG.ALLOWED_REQUESTS.find(function (req) { return req.url.toLowerCase() === requestUrl.toLowerCase(); });
    };
    ContentScriptRequestUtils.SEND_TO_BROWSER_EXTENSION_EVENT = 'SEND_TO_BROWSER_EXTENSION_EVENT';
    ContentScriptRequestUtils.EXECUTE_SESSION_TOKEN_REQUEST = "EXECUTE_SESSION_TOKEN_REQUEST";
    ContentScriptRequestUtils.SET_SESSION_TOKEN_REQUEST = "SET_SESSION_TOKEN_REQUEST";
    ContentScriptRequestUtils.DEFAULT_CONTENT_TYPE_HEADER = {
        "Content-Type": "application/json",
        "X-Asdk-Origin": location.hostname
    };
    ContentScriptRequestUtils.contentScriptHeaders = ContentScriptRequestUtils.DEFAULT_CONTENT_TYPE_HEADER;
    ContentScriptRequestUtils.sessionDurationInMilliseconds = 30 * 60 * 1000;
    ContentScriptRequestUtils.currentSessionTimestamp = null;
    return ContentScriptRequestUtils;
}());
logDebugCS("ready");
window.addEventListener("message", function (event) {
    var _a, _b;
    var messageType = (_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.type;
    if (messageType) {
        var request = event.data.request;
        if (request) {
            request.httpMethod = (_b = request.httpMethod) !== null && _b !== void 0 ? _b : HTTP_METHOD.GET;
            if (ContentScriptRequestUtils.isAllowedRequest(request)) {
                var isSessionInitRequest = ContentScriptRequestUtils.getAllowedRequestDetails(request.url).isSessionInitRequest || false;
                switch (messageType) {
                    case ContentScriptRequestUtils.SEND_TO_BROWSER_EXTENSION_EVENT:
                        {
                            logDebugCS("New event SEND_TO_BROWSER_EXTENSION_EVENT");
                            if (ContentScriptRequestUtils.useSessionTokenAuth() && !isSessionInitRequest) {
                                ContentScriptRequestUtils.sendHttpRequestAfterSessionCheck(request).then(function (res) {
                                    event.ports[0].postMessage(res);
                                })["catch"](function (error) {
                                    event.ports[0].postMessage(error);
                                });
                            }
                            else if (isSessionInitRequest) {
                                ContentScriptRequestUtils.sendSessionTokenRequest(request).then(function (res) {
                                    event.ports[0].postMessage(res);
                                })["catch"](function (error) {
                                    event.ports[0].postMessage(error);
                                });
                            }
                            else if (ContentScriptRequestUtils.useSessionTokenAuth()) {
                                ContentScriptRequestUtils.sendHttpRequestAfterSessionCheck(request).then(function (res) {
                                    event.ports[0].postMessage(res);
                                })["catch"](function (error) {
                                    event.ports[0].postMessage(error);
                                });
                            }
                            else {
                                ContentScriptRequestUtils.sendToServiceWorker(request).then(function (res) {
                                    event.ports[0].postMessage(res);
                                })["catch"](function (error) {
                                    event.ports[0].postMessage(error);
                                });
                            }
                            break;
                        }
                        ;
                    case ContentScriptRequestUtils.EXECUTE_SESSION_TOKEN_REQUEST: {
                        ContentScriptRequestUtils.sendSessionTokenRequest(request).then(function (res) {
                            event.ports[0].postMessage(res);
                        })["catch"](function (error) {
                            event.ports[0].postMessage(error);
                        });
                        break;
                    }
                    case ContentScriptRequestUtils.SET_SESSION_TOKEN_REQUEST: {
                        ContentScriptRequestUtils.setSessionTokenRequest(request);
                        event.ports[0].postMessage({ success: true });
                        break;
                    }
                }
            }
            else {
                event.ports[0].postMessage({
                    success: false,
                    error: 'Request \"' + (request === null || request === void 0 ? void 0 : request.url) + '\"' + ' [' + (request === null || request === void 0 ? void 0 : request.httpMethod) + '] is not allowed'
                });
            }
        }
    }
});
