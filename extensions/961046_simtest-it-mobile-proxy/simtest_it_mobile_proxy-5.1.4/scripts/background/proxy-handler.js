
(function () {

    Debug.enable();

    var WapGlobal = {

        proxyRunning: false,

        proxyRegistered: false,
        
        parameters: {
            proxyHttp: "",
            proxyHttpPort: "",
            userAgentStr: "",
            browserLanguage: "",
            simtestProxyUrl: "",
            simtestProxyPort: "",
            username: "",
            password: "",
            simtestProxyConfirmationTimeout: 5000,
            simtestApiUrl: "https://api.simtest.it/v1",
            simtestApiUsername:  "",
            simtestApiPassword:  "",
            skipProxyFor : ["youtube.com","facebook.com","twitter.com","instagram.com","gmail.com"] //list of hosts
        },

        activeModem : null,

        fullUrl: null,


        getSkipProxyFor() {
            let retVal = {'app.simtest.it': 1, 'api.simtest.it' : 1, 'localhost': 1, "127.0.0.1" : 1, "::1" : 1}; //default skipable
            let skipProxise = WapGlobal.parameters.skipProxyFor;
            for(let skip in skipProxise) {
                retVal[skipProxise[skip]] = 1;
            }

            return retVal;
        },

        /**
         * Get Proxy full url protocol://baseUrl:port
         *
         * @returns {string}
         */
        getFullUrl: function () {
            // If already generated get it from variable
            if (this.fullUrl) {
                return this.fullUrl;
            }
            // TODO add protocol parameter for proxy in admin GUI and pass it trough toolbar.js
            if (this.parameters.proxyHttpPort == 80)
                return this.fullUrl = 'https://' + this.parameters.proxyHttp;
            else {
                return this.fullUrl = 'https://' + this.parameters.proxyHttp + ':' + this.parameters.proxyHttpPort;
            }
        },

        /**
         * Is url proxy based?
         *
         * @param url
         * @returns {boolean}
         */
        isProxyUrl: function (url) {
            return url.substring(0, this.getFullUrl().length) == this.getFullUrl();
        },

        getUserAgent: function () {
            var ua = this.parameters.userAgentStr;

            try {
                if (this.parameters.browserLanguage) {
                    ua = ua.replace('{browserLanguage}', this.parameters.browserLanguage);
                }
            } catch (e) {
            }

            return ua;
        },

        isSkippable: function (uri) {
            /*
            let retVal = uri.indexOf("modemreservations") > -1
                || uri.indexOf("reloadModemInformation") > -1
                || uri.indexOf("smsmanager") > -1
                || uri.indexOf("mmsmanager") > -1
                || uri.indexOf("wapbrowser") > -1
                || uri.indexOf("data:") == 0
                || uri.indexOf("about:") == 0
                || uri.indexOf("favicon.ico") > -1
                || uri.indexOf(".woff") > -1
                || uri.indexOf(".ttf") > -1;
            */
            let retVal = false; // uri.indexOf('complete/search?client') > -1; // for autocomplete in url search bar
            let parsed = Str.parseUrl(uri);
            if(parsed.hasOwnProperty('host')) {
                retVal = retVal || WapGlobal.parameters.skipProxyFor.indexOf(parsed['host']) > -1;
            }
            return retVal;
        },

        isInterceptable: function (requestDetails) {
            // Skip some requests
            if (this.isSkippable(requestDetails.url)) {
                return false;
            }

            return true;
        },
        
        setBrowserActionStatus: function () {
            if(WapGlobal.proxyRunning) {
                polyfill.browserActionSetIcon({
                    path: {
                        48: "icons/icon.png"
                    }
                });
                Debug.info("set icon RUNNING")
            } else {
                polyfill.browserActionSetIcon({
                    path: {
                        48: "icons/icon-inactive.png"
                    }
                });
                Debug.info("set icon STOP" )
            }
            polyfill.storageLocalSet({'proxyMode': (WapGlobal.proxyRunning) ? '1': '0'});

            
        },

        getContentOverride: function () {
            return {
                userAgent: WapGlobal.getUserAgent(),
                platform: null,
                appVersion: "5.0",
                product: "",
                productSub: "",
                vendor: "",
                vendorSub: "",
                language: WapGlobal.parameters.browserLanguage,
                languages: [WapGlobal.parameters.browserLanguage]
            };
        },

    };

    const webRequestProxyAuthentication = {
        pendingRequests: {},

        authFailedRequests: {},

        internal : {
            logMessage: function (message, requestDetails, additional) {
                Debug.log(`${requestDetails.tabId}-${requestDetails.requestId} >`, message, requestDetails.url, webRequestProxyAuthentication.pendingRequests, additional || "", requestDetails);
            }
        },

        startMonitor: function () {
            webRequestProxyAuthentication.pendingRequests = {};
            webRequestProxyAuthentication.authFailedRequests = {};
            browser.webRequest.onAuthRequired.addListener(webRequestProxyAuthentication.onAuthRequired,
                { urls: ["<all_urls>"] },
                ["blocking"]
            );

            browser.webRequest.onCompleted.addListener(
                webRequestProxyAuthentication.onRequestFinished,
                { urls: ["<all_urls>"] }
            );

            browser.webRequest.onErrorOccurred.addListener(
                webRequestProxyAuthentication.onRequestFinished,
                { urls: ["<all_urls>"] }
            );
        },

        onAuthRequired: function (requestDetails) {
            //webRequestProxyAuthentication.internal.logMessage("onAuthRequired",requestDetails)
            if(!WapGlobal.proxyRunning) {
                return;
            }
            if (
               // requestDetails.tabId < 0 ||  //XXX: commented out because of background requests of firefox (search bar, updates etc....)
                !requestDetails.isProxy) {
                return {};
            }
            webRequestProxyAuthentication.internal.logMessage("onAuthRequired",requestDetails)
            let applyAuthentication = WapGlobal.proxyRunning;

            if (applyAuthentication &&
                WapGlobal.isInterceptable(requestDetails)
                && WapGlobal.parameters.username
                && WapGlobal.parameters.password
                )
                applyAuthentication = true;
            else
                applyAuthentication = false;

            // check if authentication is required
            if (!applyAuthentication) {
                return {};
            }

            // check if authentication is already provided
            // BAD CREDENTIALS... will cancel request
            let counter = (webRequestProxyAuthentication.pendingRequests[requestDetails.requestId]) ? webRequestProxyAuthentication.pendingRequests[requestDetails.requestId] : 0;
            if (counter > 3) {
                //probably send notification to stop proxy and alert user that proxy is having some issues
                //requestDetails['simtest-auth-failed'] = 0;
                if(WapGlobal.activeModem != null) {
                    requestDetails['activeModem'] = WapGlobal.activeModem;
                }
                webRequestProxyAuthentication.authFailedRequests[requestDetails.requestId] = requestDetails;
                return { cancel: true };
            }
            webRequestProxyAuthentication.internal.logMessage("onAuthRequired requests " + Object.keys(webRequestProxyAuthentication.authFailedRequests).length,webRequestProxyAuthentication.authFailedRequests);
            if(Object.keys(webRequestProxyAuthentication.authFailedRequests).length > 3) {
                Debug.log("Stopping ext... to much auth failed requests", webRequestProxyAuthentication.authFailedRequests);
                notifyFailedRequests();
                WapGlobal.activeModem = null;
                polyfill.storageLocalSet({'selectedModem': null});
                ProxyAdapter.stop();
            }

            // add this request to pending list
            counter++;
            webRequestProxyAuthentication.pendingRequests[requestDetails.requestId] = counter;

            return {
                authCredentials: {
                    username: WapGlobal.parameters.username,
                    password: WapGlobal.parameters.password
                }
            };
        },
        onRequestFinished: function (requestDetails) {
            if(!WapGlobal.proxyRunning) {
                return;
            }
            webRequestProxyAuthentication.internal.logMessage("onRequestFinished",requestDetails)
            delete webRequestProxyAuthentication.pendingRequests[requestDetails.requestId];
            notifyFailedRequests();
        }
    };


    function notifyFailedRequests() {

        function convertFailedRequestsToArray(failedRequests) {
            let result = [];
            for(var k in failedRequests) {
                var val = failedRequests[k];
                result.push(val);
            }

            return result;
        }

        let authFailed = convertFailedRequestsToArray(webRequestProxyAuthentication.authFailedRequests);
        authFailed.forEach(function(item) {
            delete webRequestMonitor.failedRequests[item.requestId]; //remove duplicates in failed requests because they are auth failed
        });
        let requestsFailed = convertFailedRequestsToArray(webRequestMonitor.failedRequests);

        if(authFailed.length > 0 || requestsFailed.length > 0) {
            polyfill.runtimeSendMessage(
                {
                    'command': 'webRequestProxyFailedRequests',
                    'authFailed' : authFailed,
                    'requestsFailed' : requestsFailed
                },
                function(res) {},
                function(err) {}
            );
            if(authFailed.length > 0)
                polyfill.browserSetBadgeWarning();
            else
                polyfill.browserRemoveBadgeWarning();
        } else {
            polyfill.browserRemoveBadgeWarning();
        }
    };


    function applyUserAgentConfiguration() {
        return;
        /*
            polyfill.tabsQuery({active: true, currentWindow: true},
                function(tabs) {
                            for (let tab of tabs) {
                                browser.tabs.sendMessage(
                                    tab.id,
                                    JSON.stringify({
                                        command :"content-changeUaLang",
                                        navigatorDataSet : WapGlobal.getContentOverride()
                                    })
                                ).catch(Debug.exception);
                            }
                        },
                        Debug.exception
                )

         */
    }
    // update when the tab is updated
    browser.tabs.onUpdated.addListener(applyUserAgentConfiguration);
// update when the tab is activated
    browser.tabs.onActivated.addListener(applyUserAgentConfiguration);


    const webRequestMonitor = {
        verbose: false,
        requests: {},
        monitorCallback: null,

        failedRequests : [],

        startMonitor: function (callback) {

            if (webRequestMonitor.internal.isMonitoring)
                return;

            browser.webRequest.onBeforeRequest.addListener(webRequestMonitor.events.onBeforeRequest,
                { urls: ["<all_urls>"] }
            );
            browser.webRequest.onBeforeSendHeaders.addListener(webRequestMonitor.events.onBeforeSendHeaders,
                {urls: ["<all_urls>"]},
                ["blocking", "requestHeaders"]
            );

            browser.webRequest.onHeadersReceived.addListener(webRequestMonitor.events.onHeadersReceived,
                { urls: ["<all_urls>"] }
            );
            browser.webRequest.onBeforeRedirect.addListener(webRequestMonitor.events.onBeforeRedirect,
                { urls: ["<all_urls>"] }
            );
            browser.webRequest.onErrorOccurred.addListener(webRequestMonitor.events.onErrorOccurred,
                { urls: ["<all_urls>"] }
            );
            browser.webRequest.onCompleted.addListener(webRequestMonitor.events.onCompleted,
                { urls: ["<all_urls>"] }
            );

            webRequestMonitor.monitorCallback = callback;
            webRequestMonitor.failedRequests = [];
            webRequestMonitor.internal.isMonitoring = true;

        },

        internal: {
            requestTimeoutTime: 5000,
            isMonitoring: false,
            timer: null,
            timerTick: function () {

                let now = Date.now();
                let reqIds = Object.keys(webRequestMonitor.requests);
                let requestTimeoutTime = webRequestMonitor.internal.requestTimeoutTime;

                for (let i = reqIds.length - 1; i >= 0; i--) {
                    let reqId = reqIds[i];

                    if (reqId === undefined)
                        continue;

                    // get the request info
                    let req = webRequestMonitor.requests[reqId];
                    if (!req) continue;

                    if (now - req._startTime < requestTimeoutTime) {
                        continue;
                    } else {
                        req._isTimedOut = true;

                        // callback request-timeout
                        webRequestMonitor.events.raiseCallback(webRequestMonitor.eventTypes.requestTimeout, req);

                        if (webRequestMonitor.verbose)
                            webRequestMonitor.internal.logMessage(webRequestMonitor.eventTypes.requestTimeout, req);
                    }
                }
            },

            logMessage: function (message, requestDetails, additional) {
                Debug.log(`${requestDetails.tabId}-${requestDetails.requestId} >`, message, requestDetails.url, additional || "");
            }
        },
        eventTypes: {
            requestStart: "request-start",
            requestTimeout: "request-timeout",
            requestRevertTimeout: "request-revert-timeout",
            requestRedirected: "request-redirected",
            requestComplete: "request-complete",
            requestTimeoutAborted: "request-timeout-aborted",
            requestError: "request-error"
        },
        events: {
            raiseCallback: function () {
                if(!WapGlobal.proxyRunning ) {
                    return;
                }
                if (webRequestMonitor.monitorCallback)
                    webRequestMonitor.monitorCallback.apply(this, arguments);
            },
            onBeforeRequest: function (requestDetails) {
                if(!WapGlobal.proxyRunning) {
                    return;
                }

                if (requestDetails.tabId < 0) {
                    return;
                }
                if(!WapGlobal.isInterceptable(requestDetails)) {
                    return;
                }

                let reqInfo = requestDetails;
                reqInfo._startTime = new Date();
                reqInfo._isHealthy = false;

                // add to requests
                webRequestMonitor.requests[requestDetails.requestId] = requestDetails;

                if (!webRequestMonitor.internal.timer) {
                    webRequestMonitor.internal.timer = setInterval(webRequestMonitor.internal.timerTick, 1500);
                }

                // callback request-start
                webRequestMonitor.events.raiseCallback(webRequestMonitor.eventTypes.requestStart, requestDetails);

                if (webRequestMonitor.verbose)
                    webRequestMonitor.internal.logMessage(webRequestMonitor.eventTypes.requestStart, requestDetails);
            },
            onBeforeSendHeaders: function (requestDetails) {
                if(!WapGlobal.proxyRunning) {
                    return;
                }

                if (requestDetails.tabId < 0) {
                    return;
                }
                if(!WapGlobal.isInterceptable(requestDetails)) {
                    return;
                }
                if(WapGlobal.parameters.browserLanguage != "") {
                    for (var header of requestDetails.requestHeaders) {
                        if (header.name.toLowerCase() === "accept-language") {
                            header.value = WapGlobal.parameters.browserLanguage;
                        }

                    }
                }
                /*
                if(WapGlobal.parameters.userAgentStr != "") {
                    for (var header of requestDetails.requestHeaders) {
                        if(header.name.toLowerCase() === "user-agent") {
                            header.value = WapGlobal.parameters.userAgentStr;
                        }
                    }
                }
*/
                return {requestHeaders: requestDetails.requestHeaders};

            },
            onHeadersReceived: function (requestDetails) {
                if(!WapGlobal.proxyRunning) {
                    return;
                }
                if(!WapGlobal.isInterceptable(requestDetails)) {
                    return;
                }

                let req = webRequestMonitor.requests[requestDetails.requestId];
                if (!req)
                    return;

                req._isHealthy = true;

                if (req._isTimedOut) {
                    // call the callbacks indicating the request is healthy
                    // callback request-revert-from-timeout
                    webRequestMonitor.events.raiseCallback(webRequestMonitor.eventTypes.requestRevertTimeout, requestDetails);

                    delete webRequestMonitor.failedRequests[requestDetails.requestId];

                    if (webRequestMonitor.verbose)
                        webRequestMonitor.internal.logMessage(webRequestMonitor.eventTypes.requestRevertTimeout, requestDetails);
                }

            },
            onBeforeRedirect: function (requestDetails) {
                if(!WapGlobal.proxyRunning) {
                    return;
                }
                if(!WapGlobal.isInterceptable(requestDetails)) {
                    return;
                }
                let url = requestDetails.redirectUrl;
                if (!url)
                    return;

                // callback request-revert-from-timeout
                webRequestMonitor.events.raiseCallback(webRequestMonitor.eventTypes.requestRedirected, requestDetails);

                if (webRequestMonitor.verbose)
                    webRequestMonitor.internal.logMessage(webRequestMonitor.eventTypes.requestRedirected, requestDetails, "to> " + requestDetails.redirectUrl);

                // because 'requestId' doesn't change for redirects
                // the request is basicly is still the same
                // note that 'request-start' will happen after redirect

                if (url.indexOf("data:") === 0 || url.indexOf("about:") === 0) {

                    // request is completed when redirecting to local pages
                    webRequestMonitor.events.onCompleted(requestDetails);
                }
            },
            onCompleted: function (requestDetails) {
                if(!WapGlobal.proxyRunning) {
                    return;
                }
                if (requestDetails.tabId < 0) {
                    return;
                }
                if(!WapGlobal.isInterceptable(requestDetails)) {
                    return;
                }
                delete webRequestMonitor.requests[requestDetails.requestId];
                delete webRequestMonitor.failedRequests[requestDetails.requestId];

                // callback request-complete
                webRequestMonitor.events.raiseCallback(webRequestMonitor.eventTypes.requestComplete, requestDetails);

                if (webRequestMonitor.verbose)
                    webRequestMonitor.internal.logMessage(webRequestMonitor.eventTypes.requestComplete, requestDetails);
            },
            onErrorOccurred: function (requestDetails) {
                if(!WapGlobal.proxyRunning) {
                    return;
                }
                if(!WapGlobal.isInterceptable(requestDetails)) {
                    return;
                }
                let req = webRequestMonitor.requests[requestDetails.requestId];
                delete webRequestMonitor.requests[requestDetails.requestId];

                if (requestDetails.tabId < 0)
                    return;

                if (!req)
                    return;

                // details.error
                if (requestDetails.url.indexOf("file:") === 0) {
                    return;
                }
                if (requestDetails.url.indexOf("chrome") === 0) {
                    return;
                }
                if (requestDetails.url.indexOf("about:") === 0) {
                    return;
                }
                if (requestDetails.url.indexOf("moz-") === 0) {
                    return;
                }
                if (requestDetails.url.indexOf("://127.0.0.1") > 0) {
                    return;
                }
                if(WapGlobal.activeModem != null) {
                    requestDetails['activeModem'] = WapGlobal.activeModem;
                }
                webRequestMonitor.failedRequests[requestDetails.requestId] = requestDetails;

                if (requestDetails.error === "net::ERR_INCOMPLETE_CHUNKED_ENCODING") {
                    return;
                }
                if (requestDetails.error.indexOf("BLOCKED") >= 0) {
                    return;
                }
                if (requestDetails.error.indexOf("net::ERR_FILE_") === 0) {
                    return;
                }
                if (requestDetails.error.indexOf("NS_ERROR_ABORT") === 0) {
                    return;
                }

                if (requestDetails.error === "net::ERR_ABORTED") {
                    if (req.timeoutCalled && !req.noTimeout) {

                        // callback request-timeout-aborted
                        webRequestMonitor.events.raiseCallback(webRequestMonitor.eventTypes.requestTimeoutAborted, requestDetails);

                        // request is either aborted or timeout, doesn't matter
                        // it should not be considered as failed.
                        delete webRequestMonitor.failedRequests[requestDetails.requestId];

                        if (webRequestMonitor.verbose)
                            webRequestMonitor.internal.logMessage(webRequestMonitor.eventTypes.requestTimeoutAborted, requestDetails);

                    }
                    return;
                }

                // callback request-error
                webRequestMonitor.events.raiseCallback(webRequestMonitor.eventTypes.requestError, requestDetails);

                if (webRequestMonitor.verbose)
                    webRequestMonitor.internal.logMessage(webRequestMonitor.eventTypes.requestError, requestDetails);

            },
        }
    }


    const firefoxProxyEngine = {

        getResultProxyInfo: function () {
            let proxyData = {
                pac: {
                    host: WapGlobal.parameters.simtestProxyUrl,
                    port: WapGlobal.parameters.simtestProxyPort,
                    username: WapGlobal.parameters.username,
                    password: WapGlobal.parameters.password,
                    protocol: "HTTP",
                    proxyDNS: false,

                }
                , PROXY_RUNNING : WapGlobal.proxyRunning
                , skipProxyFor : WapGlobal.parameters.skipProxyFor
                , reset : false
            };
            if(proxyData.pac.port == 9090) {
                proxyData.pac.protocol = "SOCKS5";
            }
            Debug.info("getResultProxyInfo",proxyData );
            if(!proxyData.pac.host || !proxyData.pac.port) {
                return {type: "direct"};
            }

            switch (proxyData.pac.protocol) {
                case "SOCKS5":
                    // "socks" refers to the SOCKS5 protocol
                    return {
                        type: "socks",
                        host: proxyData.pac.host,
                        port: proxyData.pac.port,
                        proxyDNS: proxyData.pac.proxyDNS,
                        username: proxyData.pac.username,
                        password: proxyData.pac.password
                    };

                default:
                case "HTTP":
                case "HTTPS":
                case "SOCKS4":
                    return {
                        type: proxyData.pac.protocol,
                        host: proxyData.pac.host,
                        port: proxyData.pac.port,
                        proxyDNS: proxyData.pac.proxyDNS
                    };
            }
        },

        mustProxyHost: function(url) {
            if( !WapGlobal.proxyRunning ) {
                return false;
            }
            let hosts = Object.keys(WapGlobal.getSkipProxyFor());
            for(let hi in hosts) {
                if (url.indexOf(hosts[hi]) > -1) return false;
            }
            return true;
        },

        handleProxyRequest: function(requestDetails) {
            /* requestDetails->
                documentUrl: "http://socialshare.ir/admin/media-promote"
                frameAncestors: undefined
                frameId: 0
                fromCache: false
                method: "GET"
                originUrl: "http://socialshare.ir/admin/media-promote"
                parentFrameId: -1
                requestId: "2752"
                tabId: -1
                timeStamp: 1545452060641
                type: "speculative"
                url: "http://socialshare.ir/admin/media-promote"
                */

            let retVal = {type: "direct"};

            if (!requestDetails.url)
                retVal =  {type: "direct"};

            if(firefoxProxyEngine.mustProxyHost(requestDetails.url)) {
                retVal =  firefoxProxyEngine.getResultProxyInfo();
            }

            Debug.log("=== firefoxProxyEngine.handleProxyRequest", {details : requestDetails, returning : retVal});

            return retVal;
        }
    }


    const apiCheckerMonitor = {
        interval: null,
        started: false,


        startMonitor: function () {
            this.stopMonitor();
            this.interval = setInterval(apiCheckerMonitor.hasActiveModem, 60 * 1000); // 60 = 1 minute
            this.started = true;
        },

        stopMonitor: function () {
            if(this.interval) clearInterval(this.interval);
            this.started = false;
        },

        stopProxy: function () {
            WapGlobal.activeModem = null;
            polyfill.storageLocalSet({'selectedModem': null});
            Debug.log("Stoping proxy due to api checker")
            ProxyAdapter.stop();
            this.stopMonitor();
        },

        hasActiveModem: function() {

            ApiManager.initialize();
            Debug.log("hasActiveModem check ... ")
            ApiManager.readModemReservations(function (reservations) {
                if(reservations.length < 1) {
                    apiCheckerMonitor.stopProxy()
                }

                polyfill.storageLocalGet("selectedModem",
                    function (result) {
                        let selectedModem = null;
                        if (result.hasOwnProperty('selectedModem')) {
                            selectedModem = result['selectedModem'];
                            if (selectedModem != null) {
                                let found = reservations.find(res => res.id == selectedModem.id)

                                if (found == undefined) {
                                    selectedModem = null;
                                } else {
                                    selectedModem = found;
                                }
                            }
                        }
                        if (selectedModem == null) {
                            apiCheckerMonitor.stopProxy()
                        }
                    }
                );
            }, apiCheckerMonitor.stopProxy)
        }

    }


    const ProxyAdapter = {

        notifyProxyConfigChanged: function () {
            ProxyAdapter.service.updateChromeProxyConfig();
            ProxyAdapter.service.updateFirefoxProxyConfig();
        },


        start: function () {

            this.run();
            WapGlobal.proxyRunning = true;

            ProxyAdapter.notifyProxyConfigChanged();

            applyUserAgentConfiguration();
            WapGlobal.setBrowserActionStatus();
            Debug.log("PROXY START", WapGlobal);
        },

        run: function () {
            // Start proxy script
            ProxyAdapter.service.ff_register();

            // Log any errors from the proxy script
            polyfill.onProxyError().addListener(function (e) {
                Debug.error('PROXY ERROR:' + e.message, e);
            });

            // webRequestMonitor.verbose=true; //logger
            webRequestMonitor.startMonitor(null);

            webRequestProxyAuthentication.startMonitor();

            apiCheckerMonitor.startMonitor();
        },

        stop: function () {
            Debug.log("PROXY STOP");
            //reset proxy parameters

            polyfill.runtimeSendMessage(
                {
                    reset : true
                },
                function(success){  },
                function(error){ },
                {toProxyScript: true}
            );
            /*
            browser.webRequest.onBeforeRequest.removeListener(ProxyAdapter.service.interceptRequests);
            browser.webRequest.onAuthRequired.removeListener(ProxyAdapter.service.onAuthRequired);
            browser.webRequest.onCompleted.removeListener(ProxyAdapter.service.onCompleted);
            browser.webRequest.onBeforeSendHeaders.removeListener(ProxyAdapter.service.onBeforeSendHeaders);
            */
            /**
             * unregister not working... Just set var the proxy is not running
             */
            //browser.proxy.unregister();
            WapGlobal.proxyRunning = false;

            ProxyAdapter.notifyProxyConfigChanged();

            WapGlobal.setBrowserActionStatus();

            apiCheckerMonitor.stopMonitor();

            setTimeout(this.service.reloadPendingTabs, 2000 );
        },

        service: {

            reloadPendingTabs: function() {
                Debug.log("Pending requests: ", webRequestMonitor.requests)

                var tabs = {};
                for(var k in webRequestMonitor.requests) {
                    var val = webRequestMonitor.requests[k];
                    tabs[val.tabId] = parseInt(val.tabId);
                }

                if(Object.keys(tabs).length > 0) {
                    Debug.log("tabs to reload: ", Object.values(tabs))
                    for(var t in tabs) {
                        browser.tabs.reload(parseInt(t),{bypassCache: true});
                    }
                    webRequestMonitor.requests = {};
                }
            },

            reloadAllTabs: function() {

                let querying = browser.tabs.query({});
                querying.then(
                    function(tabsIn) {
                        var tabs = {};
                        for (let val of tabsIn) {
                            tabs[val.id] = parseInt(val.id);
                        }
                        if(Object.keys(tabs).length > 0) {
                            Debug.log("tabs to reload: ", Object.values(tabs))
                            for(var t in tabs) {
                                browser.tabs.reload(tabs[t],{bypassCache: true});
                            }
                        }
                    },

                    function(error) {
                        console.log(`Error: ${error}`);
                    }
                );
            },

            updateChromeProxyConfig: function () {

                // this code should run only in Chrome
                if (!environment.chrome)
                    return;

                let proxyInitData = {
                    pac: {
                        host: WapGlobal.parameters.simtestProxyUrl,
                        port: WapGlobal.parameters.simtestProxyPort,
                        protocol: "HTTP"
                    }
                    , PROXY_RUNNING : WapGlobal.proxyRunning
                    , skipProxyFor : WapGlobal.getSkipProxyFor()
                    , reset : true
                };

                if (WapGlobal.proxyRunning != true) {
                    // No need to generate PAC since this code does the job

                    let config = {
                        mode: "system"
                    };
                    chrome.proxy.settings.set(
                        { value: config, scope: "regular" },
                        function () {
                            if (chrome.runtime.lastError) {
                                Debug.error("updateChromeProxyConfig failed with ", chrome.runtime.lastError);
                            }
                        });
                    return;
                }

                // generate PAC script specific to Chrome
                let pacScript = chromeProxy.generateChromePacScript(proxyInitData);

                let config = {
                    mode: "pac_script",
                    pacScript: {
                        data: pacScript
                    }
                };
                chrome.proxy.settings.set(
                    { value: config, scope: "regular" },
                    function () {
                        if (chrome.runtime.lastError) {
                            Debug.error("updateChromeProxyConfig failed with ", chrome.runtime.lastError);
                        }
                    });

            },

            updateFirefoxProxyConfig: function() {
                if (environment.chrome)
                    return;


                let proxyInitData = {
                        pac: {
                            host: WapGlobal.parameters.simtestProxyUrl,
                            port: WapGlobal.parameters.simtestProxyPort,
                            protocol: "HTTP"
                        }
                        , PROXY_RUNNING : WapGlobal.proxyRunning
                        , skipProxyFor : WapGlobal.getSkipProxyFor()
                        , reset : true
                    };

                    let proxySettings = {
                        proxyType: "system" // possible values: none, autoDetect, system, manual, autoConfig
                    };

                    if(WapGlobal.proxyRunning) {
                        proxySettings.proxyType = "manual";
                        proxySettings.passthrough = Object.keys(WapGlobal.getSkipProxyFor()).join(',');
                        if( WapGlobal.parameters.simtestProxyPort == 9090 ) {
                            proxySettings.socks = WapGlobal.parameters.simtestProxyUrl + ":" + WapGlobal.parameters.simtestProxyPort;
                            proxySettings.socksVersion = 5;
                        }else {
                            proxySettings.http = 'http://' + WapGlobal.parameters.simtestProxyUrl + ":" + WapGlobal.parameters.simtestProxyPort;
                        }

                    }

                    polyfill.browserSetProxySettings(
                        {
                            value: proxySettings
                        },
                        function(){
                            polyfill.storageLocalSet({'firefox_newproxy' : true})
                            Debug.log("updateFirefoxProxyConfig OK to set proxy settings", proxySettings, JSON.stringify(arguments));
                        },
                        function () {
                            polyfill.storageLocalSet({'firefox_newproxy' : false})
                            Debug.log("updateFirefoxProxyConfig failed to set proxy settings", proxySettings, JSON.stringify(arguments));

                        });



            },

            ff_register : function () {

                if(!environment.chrome) {
                    //only Firefox

                    const proxyScriptURL = "scripts/proxy/proxy-script.js";

                    if (browser["proxy"] && browser.proxy["onRequest"]) {
                        // new Firefox proxy API
                        // onRequest is Used for HTTP and HTTPS protocols only (WSS included), source: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/RequestFilter
                        browser.proxy.onRequest.addListener(firefoxProxyEngine.handleProxyRequest,
                            {urls: ['*://*/*', 'ws://*/*', 'wss://*/*', 'ftp://*/*']});
                    }


                    // PAC script is used for Ftp and other protocols
                    let proxyInitData = {
                        pac: {
                            host: WapGlobal.parameters.simtestProxyUrl,
                            port: WapGlobal.parameters.simtestProxyPort,
                            protocol: "HTTP"
                        }
                        , PROXY_RUNNING : false
                        , skipProxyFor : WapGlobal.parameters.skipProxyFor
                        , reset : true
                    };

                    if(! WapGlobal.proxyRegistered ) {
                        if (browser.proxy["register"]){
                            browser.proxy.register(proxyScriptURL);
                        }
                        else if (browser.proxy["registerProxyScript"]) {
                            // support for older firefox versions
                            browser.proxy.registerProxyScript(proxyScriptURL);
                        }

                        else {
                            ProxyAdapter.notifyProxyConfigChanged();
                        }
                    } else {
                        polyfill.runtimeSendMessage(
                            proxyInitData,
                            function(success){  },
                            function(error){  },
                            {toProxyScript: true}
                        );
                        polyfill.runtimeSendMessage(
                            proxyInitData,
                            function(success){
                                polyfill.runtimeSendMessage(
                                    proxyInitData,
                                    function(success){

                                    },
                                    function(error){ },
                                    {toProxyScript: true}
                                )
                            },
                            function(error){
                                polyfill.runtimeSendMessage(
                                    proxyInitData,
                                    function(success){

                                    },
                                    function(error){ },
                                    {toProxyScript: true}
                                )
                            },
                            {toProxyScript: true}
                        )
                    }

                    function handleMessage(message, sender, sendResponse) {

                        // only handle messages from the proxy script
                        /*
                        if (sender.url != browser.extension.getURL(proxyScriptURL)) {
                            return;
                        }
                         */
                        if (message === "init") {
                            //WapGlobal.proxyRegistered = true;
                            var proxyInitData = {
                                pac: {
                                    host: WapGlobal.parameters.simtestProxyUrl,
                                    port: WapGlobal.parameters.simtestProxyPort
                                }
                                , skipProxyFor : WapGlobal.parameters.skipProxyFor
                                , reset : true
                            };
                            Debug.log('PROXY INIT', message, proxyInitData);

                                polyfill.runtimeSendMessage(
                                    proxyInitData,
                                    function(success){
                                        WapGlobal.proxyRegistered = true;
                                    },
                                    function(error){
                                        WapGlobal.proxyRegistered = false;
                                    },
                                    {toProxyScript: true}
                                )
                        } else {
                        //    Debug.log('MESSAGE FROM PROXY: ', message);
                        }

                    }

                    browser.runtime.onMessage.addListener(handleMessage);

                }

            }
        }
    };

    /*
    =====================================  STARTING POINT =======================================
     */
    browser.runtime.onMessage.addListener((inData, sender, sendResponse) => {

        if(sender.id != browser.runtime.id) {
            return;
        }
        Debug.log('PROXY HANDLER received: ', inData);
        if(inData.hasOwnProperty('message')) {
           // only handle messages from the app gui
            if (sender.url.indexOf('app.simtest.it') < 0) {
                return;
            }
            if (inData.message == "simtest-browsing-start" || inData.message == "simtest-browsing-import") {
                WapGlobal.parameters = Object.assign({}, WapGlobal.parameters, inData.simtestData)
                polyfill.storageLocalSet({'proxySettings': {
                    simtestProxyUrl: WapGlobal.parameters.simtestProxyUrl,
                    simtestProxyPort: WapGlobal.parameters.simtestProxyPort,
                    username:  WapGlobal.parameters.username,
                    password:  WapGlobal.parameters.password
                }
                });
                if(WapGlobal.parameters.simtestApiUsername == "") {
                    WapGlobal.parameters.simtestApiUsername = WapGlobal.parameters.username;
                }
                if(WapGlobal.parameters.simtestApiPassword == "") {
                    WapGlobal.parameters.simtestApiPassword = WapGlobal.parameters.password;
                }
                polyfill.storageLocalSet({'simtestApiSettings': {
                    simtestApiUrl: WapGlobal.parameters.simtestApiUrl,
                    simtestApiUsername:  WapGlobal.parameters.simtestApiUsername,
                    simtestApiPassword:  WapGlobal.parameters.simtestApiPassword
                }
                });

                if(inData.message == "simtest-browsing-start") {
                    ApiManager.readModemReservations(
                        function(reservations) {
                            if (reservations.length > 0) {
                                ProxyAdapter.start();
                            }
                        }
                    );

                }

            } else if(inData.message == "simtest-browsing-stop") {
                // WapGlobal.parameters = {};
                ProxyAdapter.stop();
            }
        }

        if(inData.hasOwnProperty('command')) {

            if(inData.command == "popup-login") {
                if(inData.hasOwnProperty('username')) {
                    WapGlobal.parameters.username = inData['username'];
                    WapGlobal.parameters.simtestApiUsername = inData['username'];
                }
                if(inData.hasOwnProperty('password')) {
                    WapGlobal.parameters.password = inData['password'];
                    WapGlobal.parameters.simtestApiPassword = inData['password'];
                }

                polyfill.storageLocalSet({ 'loginData': {'username': WapGlobal.parameters.username, 'password': WapGlobal.parameters.password} });

                WapGlobal.parameters.simtestProxyUrl = WapGlobal.parameters.simtestProxyUrl || '91.220.77.154';
                WapGlobal.parameters.simtestProxyPort = WapGlobal.parameters.simtestProxyPort || '9090';
                WapGlobal.parameters.skipProxyFor = WapGlobal.parameters.skipProxyFor || ["youtube.com","facebook.com","twitter.com","instagram.com","gmail.com"];

                var proxySettings = {
                    "simtestProxyUrl" : WapGlobal.parameters.simtestProxyUrl,
                    "simtestProxyPort" : WapGlobal.parameters.simtestProxyPort,
                    "username" : WapGlobal.parameters.username,
                    "password" : WapGlobal.parameters.password,
                    "skipProxyFor" : WapGlobal.parameters.skipProxyFor,
                }

                WapGlobal.parameters.simtestApiUrl = WapGlobal.parameters.simtestApiUrl || "http://api.simtest.it/v1";
                var simtestApiSettings = {
                    "simtestApiUrl" : WapGlobal.parameters.simtestApiUrl,
                    "simtestApiUsername" :   WapGlobal.parameters.simtestApiUsername,
                    "simtestApiPassword" :  WapGlobal.parameters.simtestApiPassword
                }

                polyfill.storageLocalSet({ 'proxySettings': proxySettings });
                polyfill.storageLocalSet({ 'simtestApiSettings': simtestApiSettings });
                if(sendResponse) {
                    sendResponse(true);
                }

            }
            else if(inData.command == "popup-logout") {

                WapGlobal.parameters.username = "";
                WapGlobal.parameters.password = "";
                WapGlobal.parameters.simtestApiUsername = "";
                WapGlobal.parameters.simtestApiPassword = "";

                var proxySettings = {
                    "simtestProxyUrl" : WapGlobal.parameters.simtestProxyUrl,
                    "simtestProxyPort" : WapGlobal.parameters.simtestProxyPort,
                    "username" : WapGlobal.parameters.username,
                    "password" : WapGlobal.parameters.password,
                    "skipProxyFor" : WapGlobal.parameters.skipProxyFor,
                }

                var simtestApiSettings = {
                    "simtestApiUrl" : WapGlobal.parameters.simtestApiUrl,
                    "simtestApiUsername" :   WapGlobal.parameters.simtestApiUsername,
                    "simtestApiPassword" :  WapGlobal.parameters.simtestApiPassword
                }

                polyfill.storageLocalSet({ 'proxySettings': proxySettings });
                polyfill.storageLocalSet({ 'simtestApiSettings': simtestApiSettings });
                polyfill.storageLocalSet({ 'userInfo': null });
                polyfill.storageLocalSet({'selectedModem': null});
                polyfill.storageLocalSet({'popup_activeTab': "home"});

                if(inData.hasOwnProperty('proxySettings')) {
                    WapGlobal.parameters = Object.assign({}, WapGlobal.parameters, proxySettings)
                }
                if(inData.hasOwnProperty('simtestApiSettings')) {
                    WapGlobal.parameters = Object.assign({}, WapGlobal.parameters, simtestApiSettings)
                }

                if(WapGlobal.proxyRunning) {
                    //send new data to proxy script
                    ProxyAdapter.stop();
                }
                if(sendResponse) {
                    sendResponse(true);
                }
            }

            else if(inData.command == "settings-SaveProxySettingsOptions") {

                if(inData.hasOwnProperty('proxySettings')) {
                    WapGlobal.parameters = Object.assign({}, WapGlobal.parameters, inData.proxySettings)
                }
                if(inData.hasOwnProperty('simtestApiSettings')) {
                    WapGlobal.parameters = Object.assign({}, WapGlobal.parameters, inData.simtestApiSettings)
                }
                if(WapGlobal.proxyRunning) {
                    //send new data to proxy script
                    ProxyAdapter.start();
                }
                if(sendResponse) {
                    sendResponse(true);
                }
            }  else if(inData.command == "popup-startProxy") {

                if (inData.hasOwnProperty('proxySettings')) {
                    WapGlobal.parameters = Object.assign({}, WapGlobal.parameters, inData.proxySettings)
                }
                if (inData.hasOwnProperty('simtestApiSettings')) {
                    WapGlobal.parameters = Object.assign({}, WapGlobal.parameters, inData.simtestApiSettings)
                }
                if (inData.hasOwnProperty('activeModem')) {
                    WapGlobal.activeModem = inData['activeModem'];
                }

                ProxyAdapter.start();
                if(sendResponse) {
                    sendResponse(true);
                }
            }  else if(inData.command == "popup-stopProxy") {
                ProxyAdapter.stop();
               // WapGlobal.activeModem = null;
            }  else if(inData.command == "popup-selectLanguage") {
                WapGlobal.parameters.browserLanguage = inData.language;
                applyUserAgentConfiguration();
            }   else if(inData.command == "popup-selectUserAgent") {
                WapGlobal.parameters.userAgentStr = inData.value;
                applyUserAgentConfiguration();
            }  else if(inData.command == 'webRequestProxyFailedRequests-Clear') {
                if(inData.type == 'authFailed') {
                    webRequestProxyAuthentication.authFailedRequests = [];
                } else if(inData.type == 'requestsFailed') {
                    webRequestMonitor.failedRequests = [];
                } else if(inData.type == 'all') {
                    webRequestProxyAuthentication.authFailedRequests = [];
                    webRequestMonitor.failedRequests = [];
                }

                polyfill.browserRemoveBadgeWarning();
                if(sendResponse) {
                    sendResponse(true);
                }
            }  else if(inData.command == 'webRequestProxyFailedRequests-Get') {
                let retVal = [];

                function convertFailedRequestsToArray(failedRequests) {
                    let result = [];
                    for(var k in failedRequests) {
                        var val = failedRequests[k];
                        result.push(val);
                    }
                    return result;
                }

                let authFailed = convertFailedRequestsToArray(webRequestProxyAuthentication.authFailedRequests);
                authFailed.forEach(function(item) {
                    delete webRequestMonitor.failedRequests[item.requestId]; //remove duplicates in failed requests because they are auth failed
                });

                let requestsFailed = convertFailedRequestsToArray(webRequestMonitor.failedRequests);


                if(inData.type == 'authFailed') {

                    retVal=authFailed;
                } else if(inData.type == 'requestsFailed') {
                    retVal=requestsFailed;
                } else if(inData.type == 'all') {
                    authFailed.forEach(function(item) {
                        retVal.push(item)
                    })
                    requestsFailed.forEach(function(item) {
                        retVal.push(item)
                    })
                }

                if(sendResponse) {
                    sendResponse(retVal);
                }

            }  else if(inData.command == "popup-activeModem") {
                WapGlobal.activeModem = inData.activeModem;
                if(sendResponse) {
                    sendResponse(true);
                }
            }
        }

    });

    WapGlobal.setBrowserActionStatus();

})();