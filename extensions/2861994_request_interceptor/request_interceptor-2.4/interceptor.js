import { Rules } from './rules.js';

export const Core = {
    isInterceptEnabled: false,
    init() {
        browser.storage.local.get('isInterceptEnabled').then((result) => {
            this.isInterceptEnabled = result.isInterceptEnabled || false;
            this.updateIcon();
        });
    },
    updateIcon() {
        browser.browserAction.setIcon({
            path: this.isInterceptEnabled ? "icon-on.png" : "icon-off.png"
        });
    },
    toggleIntercept() {
        this.isInterceptEnabled = !this.isInterceptEnabled;
        browser.storage.local.set({ isInterceptEnabled: this.isInterceptEnabled });
        this.updateIcon();
        return this.isInterceptEnabled;
    },
    sendMessage(message) {
        return browser.runtime.sendMessage(message);
    },
    sendRepeaterRequest(request) {
        return this.sendMessage({
            action: "sendRepeaterRequest",
            request: request
        });
    }
};

export const Storage = {
    interceptedRequests: new Map(),
    requestOrder: [],

    addRequest(request, newRequestId) {
        console.log("Adding request to storage:", request);
        
        if (this.interceptedRequests.has(newRequestId)) {
            let existingRequest = this.interceptedRequests.get(newRequestId);
            Object.assign(existingRequest, request);
            this.interceptedRequests.set(newRequestId, existingRequest);
        } else {
            request.requestId = newRequestId;
            request.interceptOrder = this.requestOrder.length + 1;
            
            if (request.requestBody) {
                if (request.requestBody.raw) {
                    request.requestBodyContent = request.requestBody.raw[0].bytes;
                } else if (request.requestBody.formData) {
                    request.requestBodyContent = request.requestBody.formData;
                }
            }
            
            this.interceptedRequests.set(newRequestId, request);
            this.requestOrder.push(newRequestId);
        }
        
        console.log(`Added/Updated request. ID: ${newRequestId}`);
        return newRequestId;
    },

    updateRequestHeaders(requestId, headers) {
        console.log("Updating request headers:", requestId, headers);
        if (this.interceptedRequests.has(requestId)) {
            let request = this.interceptedRequests.get(requestId);
            request.requestHeaders = headers;
            this.interceptedRequests.set(requestId, request);
        } else {
            console.warn("Attempt to update headers for non-existent request:", requestId);
        }
    },
	
	updateRequest(requestId, updates) {
    console.log("Updating request:", requestId, updates);
    if (this.interceptedRequests.has(requestId)) {
        let request = this.interceptedRequests.get(requestId);
        Object.assign(request, updates);
        this.interceptedRequests.set(requestId, request);
    } else {
        console.warn("Attempt to update non-existent request:", requestId);
    }
},

    updateResponseHeaders(requestId, { headers, statusCode, statusLine }) {
        console.log("Updating response headers:", requestId, headers);
        if (this.interceptedRequests.has(requestId)) {
            let request = this.interceptedRequests.get(requestId);
            request.responseHeaders = headers;
            request.statusCode = statusCode;
            request.statusLine = statusLine;
            this.interceptedRequests.set(requestId, request);
        } else {
            console.warn("Attempt to update response headers for non-existent request:", requestId);
        }
    },

    updateResponse(requestId, response) {
        console.log("Updating response:", requestId, response);
        if (this.interceptedRequests.has(requestId)) {
            let request = this.interceptedRequests.get(requestId);
            request.response = response;
            this.interceptedRequests.set(requestId, request);
        } else {
            console.warn("Attempt to update response for non-existent request:", requestId);
        }
    },

    getFilteredSortedRequests(filter, inverseFilter, sort, page, itemsPerPage) {
        console.log("Getting filtered, sorted requests:", filter, inverseFilter, sort, page, itemsPerPage);
        let requests = this.requestOrder.map(id => this.interceptedRequests.get(id));

        if (filter) {
            requests = requests.filter(request => 
                request.url.toLowerCase().includes(filter) || 
                request.method.toLowerCase().includes(filter)
            );
        }

        if (inverseFilter) {
            const inverseFilters = inverseFilter.split(',').map(s => s.trim());
            requests = requests.filter(request => 
                !inverseFilters.some(exclude => request.url.toLowerCase().includes(exclude))
            );
        }
        
        if (sort === 'newest') {
            requests.sort((a, b) => b.interceptOrder - a.interceptOrder);
        } else {
            requests.sort((a, b) => a.interceptOrder - b.interceptOrder);
        }
        
        const totalRequests = requests.length;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        return {
            requests: requests.slice(start, end),
            totalRequests: totalRequests
        };
    },

    clearRequests() {
        console.log("Clearing all requests");
        this.interceptedRequests.clear();
        this.requestOrder = [];
    }
};

export const Interception = {
    requestIdMap: new Map(),

    init() {
        browser.webRequest.onBeforeRequest.addListener(
            this.handleBeforeRequest,
            { urls: ["<all_urls>"] },
            ["blocking", "requestBody"]
        );
        browser.webRequest.onBeforeSendHeaders.addListener(
            this.handleBeforeSendHeaders,
            { urls: ["<all_urls>"] },
            ["blocking", "requestHeaders"]
        );
        browser.webRequest.onHeadersReceived.addListener(
            this.handleResponseHeaders,
            { urls: ["<all_urls>"] },
            ["responseHeaders"]
        );
        browser.webRequest.onCompleted.addListener(
            this.handleResponse,
            { urls: ["<all_urls>"] }
        );
        console.log("Interception module initialized");
    },


handleBeforeRequest(details) {
    // Check for matching rules regardless of interception state
    const rule = Rules.matchRule(details.url, details.method);
    if (rule) {
        const ruleResult = Rules.applyRule(rule, details);
        
        // Store request info only if interception is enabled
        if (Core.isInterceptEnabled) {
            const isRedirect = details.type === 'main_frame' && details.url !== details.originUrl;
            let newRequestId = isRedirect ? 
                `${details.requestId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : 
                details.requestId;
            
            Storage.addRequest({
                ...details,
                timeStamp: Date.now(),
                isRedirect: isRedirect,
                appliedRule: {
                    type: rule.action,
                    details: rule
                }
            }, newRequestId);
            
            Interception.requestIdMap.set(details.requestId, newRequestId);
        }

        if (Object.keys(ruleResult).length > 0) {
            return ruleResult;
        }
    }
    
    // If interception is enabled, store the request even if no rules matched
    if (Core.isInterceptEnabled) {
        const isRedirect = details.type === 'main_frame' && details.url !== details.originUrl;
        let newRequestId = isRedirect ? 
            `${details.requestId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : 
            details.requestId;
        
        Storage.addRequest({
            ...details,
            timeStamp: Date.now(),
            isRedirect: isRedirect
        }, newRequestId);
        
        Interception.requestIdMap.set(details.requestId, newRequestId);
    }
    
    return {};
},

handleBeforeSendHeaders(details) {
    if (!Core.isInterceptEnabled) return {};

    console.log("Request headers intercepted:", details);
    const newRequestId = Interception.requestIdMap.get(details.requestId) || details.requestId;
    
    // Store headers first
    Storage.updateRequestHeaders(newRequestId, details.requestHeaders);

    // Check for matching rules that modify headers
    const rule = Rules.matchRule(details.url, details.method);
    if (rule && rule.action === 'modify' && rule.modifyHeaders) {
        const result = Rules.applyRule(rule, details);
        if (result.requestHeaders) {
            // Store the modified headers
            Storage.updateRequestHeaders(newRequestId, result.requestHeaders);
            return { requestHeaders: result.requestHeaders };
        }
    }

    return {};
},

    handleResponseHeaders(details) {
        if (!Core.isInterceptEnabled) return {};
        console.log("Response headers intercepted:", details);
        const newRequestId = Interception.requestIdMap.get(details.requestId) || details.requestId;
        Storage.updateResponseHeaders(newRequestId, {
            headers: details.responseHeaders,
            statusCode: details.statusCode,
            statusLine: details.statusLine
        });
        return {};
    },

    handleResponse(details) {
        if (!Core.isInterceptEnabled) return;
        console.log("Response intercepted:", details);
        const newRequestId = Interception.requestIdMap.get(details.requestId) || details.requestId;
        Storage.updateResponse(newRequestId, {
            timeStamp: details.timeStamp
        });
        Interception.requestIdMap.delete(details.requestId);
    }
};

// Initialize modules
Core.init();
Interception.init();