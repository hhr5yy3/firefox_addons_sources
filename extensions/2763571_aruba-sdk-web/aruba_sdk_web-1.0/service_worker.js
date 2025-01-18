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
var SHOW_DEBUG_LOG = false;
var SERVICE_WORKER_PREFIX = "[Aruba SDK Web - Service Worker] ";
function logDebugSW() {
    var data = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        data[_i] = arguments[_i];
    }
    if (SHOW_DEBUG_LOG) {
        var message = data[0], otherData = data[1];
        if (message) {
            message = SERVICE_WORKER_PREFIX + message;
            if (otherData) {
                console.debug(message, otherData);
            }
            else {
                console.debug(message);
            }
        }
    }
}
var chrome;
var browser = browser || chrome;
var ServiceWorkerRequestUtils = /** @class */ (function () {
    function ServiceWorkerRequestUtils() {
    }
    ServiceWorkerRequestUtils.executeHttpRequest = function (url, httpMethod, data, customHeaders) {
        if (httpMethod === void 0) { httpMethod = ServiceWorkerRequestUtils.HTTP_METHOD.GET; }
        if (data === void 0) { data = {}; }
        if (customHeaders === void 0) { customHeaders = ServiceWorkerRequestUtils.DEFAULT_HTTP_HEADER; }
        logDebugSW("Execute HTTP Request:", url);
        switch (httpMethod) {
            case ServiceWorkerRequestUtils.HTTP_METHOD.GET:
                {
                    return this.executeGetHttpRequest(url, customHeaders);
                }
                ;
            case ServiceWorkerRequestUtils.HTTP_METHOD.POST:
                {
                    return this.executePostHttpRequest(url, data, customHeaders);
                }
                ;
            case ServiceWorkerRequestUtils.HTTP_METHOD.HEAD:
                {
                    return this.executeHeadHttpRequest(url, customHeaders);
                }
                ;
            default: {
                throw new Error("Method \"" + httpMethod + "\" not supported!");
            }
        }
    };
    ServiceWorkerRequestUtils.executePostHttpRequest = function (url, data, customHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            var httpRequestData, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        httpRequestData = this.buildHttpDefaultRequest(customHeaders);
                        httpRequestData.body = JSON.stringify(data);
                        httpRequestData.method = this.HTTP_METHOD.POST;
                        logDebugSW("Fetch request " + url, httpRequestData);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch(url, httpRequestData)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, this.parseHttpResponse(response, httpRequestData.headers["Content-Type"])];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("Error in executing fetch request");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServiceWorkerRequestUtils.executeHeadHttpRequest = function (url, customHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            var httpRequestData, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        httpRequestData = this.buildHttpDefaultRequest(customHeaders);
                        httpRequestData.method = this.HTTP_METHOD.HEAD;
                        logDebugSW("Fetch request " + url, httpRequestData);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch(url, httpRequestData)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, this.parseHttpResponse(response, httpRequestData.headers["Content-Type"])];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Error in executing fetch request");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServiceWorkerRequestUtils.executeGetHttpRequest = function (url, customHeaders) {
        return __awaiter(this, void 0, void 0, function () {
            var httpRequestData, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        httpRequestData = this.buildHttpDefaultRequest(customHeaders);
                        return [4 /*yield*/, fetch(url, httpRequestData)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.parseHttpResponse(response, httpRequestData.headers["Content-Type"])];
                }
            });
        });
    };
    ServiceWorkerRequestUtils.parseHttpResponse = function (httpResponse, requestContentType) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var responseData, responseHeaders, localHttpResponseData, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        responseData = undefined;
                        responseHeaders = {};
                        (_a = httpResponse.headers) === null || _a === void 0 ? void 0 : _a.forEach(function (value, key) {
                            responseHeaders[key] = value;
                        });
                        localHttpResponseData = {
                            headers: responseHeaders
                        };
                        if (!httpResponse.ok) return [3 /*break*/, 7];
                        _b = requestContentType;
                        switch (_b) {
                            case ServiceWorkerRequestUtils.HTTP_MEDIA_TYPE.JSON: return [3 /*break*/, 1];
                            case ServiceWorkerRequestUtils.HTTP_MEDIA_TYPE.TEXT_PLAIN: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, httpResponse.json()];
                    case 2:
                        responseData = _c.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, httpResponse.text()];
                    case 4:
                        responseData = _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        {
                            responseData = httpResponse;
                        }
                        _c.label = 6;
                    case 6:
                        localHttpResponseData.data = responseData;
                        return [2 /*return*/, localHttpResponseData];
                    case 7:
                        localHttpResponseData.data = {
                            status: httpResponse.status,
                            statusText: httpResponse.statusText
                        };
                        throw localHttpResponseData;
                }
            });
        });
    };
    ServiceWorkerRequestUtils.buildHttpDefaultRequest = function (customHeaders) {
        if (customHeaders === void 0) { customHeaders = ServiceWorkerRequestUtils.DEFAULT_HTTP_HEADER; }
        return {
            credentials: 'same-origin',
            referrerPolicy: 'strict-origin-when-cross-origin',
            headers: customHeaders,
            body: undefined
        };
    };
    ServiceWorkerRequestUtils.HTTP_METHOD = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
        HEAD: 'HEAD'
    };
    ServiceWorkerRequestUtils.HTTP_MEDIA_TYPE = {
        JSON: 'application/json',
        TEXT_PLAIN: 'text/plain'
    };
    ServiceWorkerRequestUtils.DEFAULT_HTTP_HEADER = {
        "Content-Type": ServiceWorkerRequestUtils.HTTP_MEDIA_TYPE.JSON
    };
    return ServiceWorkerRequestUtils;
}());
logDebugSW("ready");
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    logDebugSW("Request: ", request);
    if (!request) {
        sendResponse({ success: false, error: 'Required Param "Request" is undefined' });
    }
    else if (!request.url) {
        sendResponse({ success: false, error: 'Required Param "Request.url" is undefined' });
    }
    else {
        var url = request.url, httpMethod = request.httpMethod, data = request.data, headers = request.headers;
        ServiceWorkerRequestUtils.executeHttpRequest(url, httpMethod, data, headers)
            .then(function (res) {
            logDebugSW("Sending response to content script", res);
            sendResponse({ success: true, response: res });
        })["catch"](function (errorResponse) {
            var _a, _b;
            sendResponse({ success: false, response: errorResponse, error: (_b = (_a = errorResponse.data) === null || _a === void 0 ? void 0 : _a.statusText) !== null && _b !== void 0 ? _b : 'Generic Error' });
        });
        return true; // Si ritorna true per mantenere il message channel aperto
    }
});
