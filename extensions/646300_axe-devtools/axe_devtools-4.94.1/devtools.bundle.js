(() => {
    var __webpack_modules__ = {
        6555: (__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {
            "use strict";
            var amplitude_esm = __webpack_require__(7793);
            var main = __webpack_require__(5981);
            const package_namespaceObject = {
                i8: "4.10.0"
            };
            const package_namespaceObject_0 = {
                i8: "4.94.1"
            };
            var src_browser = __webpack_require__(6292);
            var browser_default = __webpack_require__.n(src_browser);
            function ownKeys(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    r && (o = o.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable;
                    }))), t.push.apply(t, o);
                }
                return t;
            }
            function _objectSpread(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? ownKeys(Object(t), !0).forEach((function(r) {
                        _defineProperty(e, r, t[r]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach((function(r) {
                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
                    }));
                }
                return e;
            }
            function _defineProperty(e, r, t) {
                return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[r] = t, e;
            }
            function _toPropertyKey(t) {
                var i = _toPrimitive(t, "string");
                return "symbol" == typeof i ? i : i + "";
            }
            function _toPrimitive(t, r) {
                if ("object" != typeof t || !t) return t;
                var e = t[Symbol.toPrimitive];
                if (void 0 !== e) {
                    var i = e.call(t, r || "default");
                    if ("object" != typeof i) return i;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === r ? String : Number)(t);
            }
            const debug = browser_default()("bridge");
            const debugMessage = browser_default()("bridge:message");
            const debugResponse = browser_default()("bridge:response");
            const BridgeContext = {
                devtools: "devtools",
                content: "content-script",
                background: "background",
                unknown: "unknown"
            };
            const ERR_COULD_NOT_ESTABLISH_CONNECTION = "Could not establish connection. Receiving end does not exist.";
            class Bridge {
                constructor() {
                    _defineProperty(this, "listener", ((msg, sender) => {
                        const {origin, context, topic, message, options} = msg;
                        const {tab, frameId} = sender;
                        const tabId = tab && -1 !== tab.id ? tab.id : null === options || void 0 === options ? void 0 : options.tabId;
                        if (!origin) return;
                        if (this.context === BridgeContext.background && context === BridgeContext.content) return this.send(context, topic, message, {
                            tabId: options.tabId || tabId,
                            frameId: options.frameId,
                            allFrames: options.allFrames
                        });
                        const devtoolsContextMatchesTabId = this.context !== BridgeContext.devtools || browser.devtools.inspectedWindow.tabId === tabId;
                        if (context !== this.context || !devtoolsContextMatchesTabId) return;
                        debugMessage(`[${topic}] ${origin} → ${this.context}: %O`, "undefined" !== typeof message ? message : "");
                        const listeners = this.getListeners(topic);
                        const onError = ex => {
                            console.error(ex);
                        };
                        try {
                            for (var listener of listeners) {
                                const response = listener({
                                    context,
                                    topic,
                                    message,
                                    origin,
                                    tabId,
                                    frameId
                                });
                                if (!listener.isGlobal && "undefined" !== typeof response) return Promise.resolve(response).catch(onError);
                            }
                        } catch (ex) {
                            onError(ex);
                        }
                    }));
                    const {context: _context} = this;
                    this.messageListeners = new Map;
                    if (_context === BridgeContext.unknown) return;
                    if (!_context) throw new Error(`Unsupported bridge context: ${_context}`);
                    this.attachListener();
                }
                attachListener() {
                    const {context, listener} = this;
                    const hasListener = browser.runtime.onMessage.hasListener(listener);
                    if (!hasListener) {
                        debug("bridge initialized with context %s", context);
                        browser.runtime.onMessage.addListener(listener);
                    }
                    if (true) {
                        window.addEventListener("pageshow", (event => {
                            if (event.persisted && !browser.runtime.onMessage.hasListener(listener)) {
                                debug("bridge initialized with context %s (cached page)", context);
                                browser.runtime.onMessage.addListener(listener);
                            }
                        }));
                        window.addEventListener("beforeunload", (() => {
                            browser.runtime.onMessage.removeListener(listener);
                        }));
                    }
                }
                get context() {
                    if ("undefined" === typeof browser) return BridgeContext.unknown;
                    if (browser && browser.devtools) return BridgeContext.devtools;
                    if (browser && browser.tabs) return BridgeContext.background;
                    if (browser && browser.storage) return BridgeContext.content;
                }
                async send(context, topic, message, {tabId, frameId = 0, allFrames = false} = {}) {
                    if ("undefined" === typeof browser) return;
                    if (!tabId && this.context === BridgeContext.devtools) tabId = browser.devtools.inspectedWindow.tabId;
                    let sendMessage = browser.runtime.sendMessage;
                    if (context === BridgeContext.content && "undefined" !== typeof browser.tabs) {
                        const tabOptions = {
                            frameId: allFrames ? null : frameId
                        };
                        sendMessage = messageToSend => browser.tabs.sendMessage(tabId, _objectSpread(_objectSpread({}, messageToSend), {}, {
                            options: _objectSpread(_objectSpread({}, messageToSend.options), tabOptions)
                        }), tabOptions);
                    }
                    const origin = `${this.context}${this.context === BridgeContext.devtools ? `:${tabId}` : ""}`;
                    const destination = `${context}${[ context, this.context ].includes(BridgeContext.content) && tabId ? `:${tabId}` : ""}`;
                    debugMessage(`[${topic}] ${origin} → ${destination}: %O`, "undefined" !== typeof message ? message : "");
                    const args = {
                        origin,
                        context,
                        topic,
                        message,
                        options: context === BridgeContext.content ? {
                            tabId,
                            frameId,
                            allFrames
                        } : {
                            tabId
                        }
                    };
                    let response = null;
                    try {
                        response = await sendMessage(args);
                    } catch (ex) {
                        if (ex.message !== ERR_COULD_NOT_ESTABLISH_CONNECTION) throw ex;
                    }
                    if (null !== response) debugResponse(`[${topic}] ${destination} → ${origin}: %O`, response);
                    return response;
                }
                getListeners(topic) {
                    const {messageListeners} = this;
                    if (!topic || "*" === topic) return messageListeners.get("*") || [];
                    return [ ...messageListeners.get(topic) || [], ...messageListeners.get("*") || [] ];
                }
                listen(topic, handler) {
                    const {messageListeners} = this;
                    const listeners = messageListeners.get(topic) || [];
                    if ("function" === typeof topic) {
                        handler = topic;
                        topic = "*";
                    }
                    if ("*" === topic) handler.isGlobal = true;
                    if ("function" !== typeof handler) return;
                    if (!listeners.length) messageListeners.set(topic, [ handler ]); else messageListeners.set(topic, [ ...listeners, handler ]);
                }
                unlisten(topic, handler) {
                    const {messageListeners} = this;
                    if ("function" === typeof topic) {
                        handler = topic;
                        topic = "*";
                    }
                    if ("function" !== typeof handler) return;
                    const listeners = messageListeners.get(topic) || [];
                    const handlers = listeners.filter((fn => fn !== handler));
                    if (handlers.length) messageListeners.set(topic, handlers); else messageListeners.delete(topic);
                }
            }
            const bridge = new Bridge;
            const context = BridgeContext;
            var dist_browser = __webpack_require__(5741);
            var dist_browser_default = __webpack_require__.n(dist_browser);
            const isEdge = "false" === "true";
            const isFirefox = "true" === "true";
            const isCoconut = "false" === "true";
            const getBrowserType = () => {
                if (isEdge) return "edge";
                if (isFirefox) return "firefox";
                if (isCoconut) return "coconut";
                return "chrome";
            };
            let application;
            if (isCoconut) application = "coconut"; else application = isFirefox ? "AxeFirefox" : isEdge ? "AxeEdge" : "AxeChrome";
            const PRODUCT_NAME = "axe-devtools-html";
            const PRODUCT_COMPONENTS = {
                coconut: "extension-coconut",
                chrome: "extension-chrome",
                firefox: "extension-firefox",
                edge: "extension-edge"
            };
            let usageClient, cachedUsageServerURL;
            const usage_service_client_getUsageServiceClient = async (fresh = false, browserType) => {
                let {usageServerURL} = await browser.storage.local.get("usageServerURL");
                if (fresh || !usageClient || usageServerURL !== cachedUsageServerURL) {
                    cachedUsageServerURL = usageServerURL;
                    if ("default" === usageServerURL) usageServerURL = "https://usage.deque.com";
                    usageClient = new (dist_browser_default())(PRODUCT_NAME, PRODUCT_COMPONENTS[browserType || getBrowserType()]);
                    usageClient.url(usageServerURL);
                }
                return usageClient;
            };
            let logger = console;
            const isLoggingEnabled = () => {
                const val = {
                    NODE_ENV: "production",
                    COCONUT: "false",
                    EDGE: "false",
                    FIREFOX: "true",
                    IS_AXE_PRO: "false",
                    MANIFEST_VERSION: 2,
                    E2E: false,
                    DOCS_SITE_URL: "https://docs.deque.com/devtools-html",
                    ISSUES_URL: "https://docs.deque.com/issue-help/1.0.0/en",
                    AXE_CONFIG_URL: "https://docs.deque.com/devtools-server/4.0.0/en/axe-configuration",
                    MANUAL_ISSUE_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-manual-issue",
                    WHATS_LEFT_TO_TEST_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-whatslefttotest",
                    USER_FLOW_URL: "https://docs.deque.com/devtools-html/4.0.0/en/user-flow-analysis",
                    AXE_PRO_TRIAL_PATH: "/axe-devtools-pro/trial",
                    ENV: "production",
                    AXE_PRO_URL: "https://axe.deque.com",
                    USAGE_SERVICE_URL: "https://usage.deque.com",
                    AMPLITUDE_API_KEY: "a1ce09d0b14ddcc12ab7b508b6606a2f",
                    DATADOG_CLIENT_TOKEN: "puba2eb4ed47c6eb69ce20ef237db754ff8"
                }.LOGGING_ENABLED;
                return "1" === val || "true" === val;
            };
            const warn = (...args) => {
                if (!isLoggingEnabled()) return;
                logger.warn(...args);
            };
            const FREE = "free";
            const TRIALING = "trialing";
            const TRIAL_ENDED = "trial_ended";
            const TRIAL_PAYMENT_FAILED = "trial_payment_failed";
            const PAID = "paid";
            const PAID_PAYMENT_FAILED = "paid_payment_failed";
            const FREE_PAYMENT_FAILED = "free_payment_failed";
            var getDistinctId = __webpack_require__(8020);
            let cachedDistinctIdCookie;
            async function distinct_id_distinctId() {
                var _await$distinctIdCook;
                return null === (_await$distinctIdCook = await distinct_id_distinctIdCookie()) || void 0 === _await$distinctIdCook ? void 0 : _await$distinctIdCook.distinct_id;
            }
            const distinct_id_distinctIdCookie = async () => {
                if (cachedDistinctIdCookie) return cachedDistinctIdCookie;
                const {axeServerURL, session} = await browser.storage.local.get([ "axeServerURL", "session" ]);
                cachedDistinctIdCookie = await (0, getDistinctId.getDistinctIdCookie)({
                    host: "default" === axeServerURL ? "https://axe.deque.com" : axeServerURL,
                    origin: globalThis.location.origin,
                    token: session && session.access_token
                });
                return cachedDistinctIdCookie;
            };
            __webpack_require__(9906);
            function _objectWithoutProperties(e, t) {
                if (null == e) return {};
                var o, r, i = _objectWithoutPropertiesLoose(e, t);
                if (Object.getOwnPropertySymbols) {
                    var s = Object.getOwnPropertySymbols(e);
                    for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
                }
                return i;
            }
            function _objectWithoutPropertiesLoose(r, e) {
                if (null == r) return {};
                var t = {};
                for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
                    if (e.includes(n)) continue;
                    t[n] = r[n];
                }
                return t;
            }
            function analytics_ownKeys(e, r) {
                var t = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    r && (o = o.filter((function(r) {
                        return Object.getOwnPropertyDescriptor(e, r).enumerable;
                    }))), t.push.apply(t, o);
                }
                return t;
            }
            function analytics_objectSpread(e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = null != arguments[r] ? arguments[r] : {};
                    r % 2 ? analytics_ownKeys(Object(t), !0).forEach((function(r) {
                        analytics_defineProperty(e, r, t[r]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : analytics_ownKeys(Object(t)).forEach((function(r) {
                        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
                    }));
                }
                return e;
            }
            function analytics_defineProperty(e, r, t) {
                return (r = analytics_toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[r] = t, e;
            }
            function analytics_toPropertyKey(t) {
                var i = analytics_toPrimitive(t, "string");
                return "symbol" == typeof i ? i : i + "";
            }
            function analytics_toPrimitive(t, r) {
                if ("object" != typeof t || !t) return t;
                var e = t[Symbol.toPrimitive];
                if (void 0 !== e) {
                    var i = e.call(t, r || "default");
                    if ("object" != typeof i) return i;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return ("string" === r ? String : Number)(t);
            }
            const {AMPLITUDE_API_KEY, DATADOG_CLIENT_TOKEN, NODE_ENV} = {
                NODE_ENV: "production",
                COCONUT: "false",
                EDGE: "false",
                FIREFOX: "true",
                IS_AXE_PRO: "false",
                MANIFEST_VERSION: 2,
                E2E: false,
                DOCS_SITE_URL: "https://docs.deque.com/devtools-html",
                ISSUES_URL: "https://docs.deque.com/issue-help/1.0.0/en",
                AXE_CONFIG_URL: "https://docs.deque.com/devtools-server/4.0.0/en/axe-configuration",
                MANUAL_ISSUE_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-manual-issue",
                WHATS_LEFT_TO_TEST_URL: "https://docs.deque.com/devtools-html/4.0.0/en/devtools-whatslefttotest",
                USER_FLOW_URL: "https://docs.deque.com/devtools-html/4.0.0/en/user-flow-analysis",
                AXE_PRO_TRIAL_PATH: "/axe-devtools-pro/trial",
                ENV: "production",
                AXE_PRO_URL: "https://axe.deque.com",
                USAGE_SERVICE_URL: "https://usage.deque.com",
                AMPLITUDE_API_KEY: "a1ce09d0b14ddcc12ab7b508b6606a2f",
                DATADOG_CLIENT_TOKEN: "puba2eb4ed47c6eb69ce20ef237db754ff8"
            };
            const amplitude = amplitude_esm.Z.getInstance();
            const isAnalyticsEnabled = () => "true" !== "true";
            const USER_ROLE = "role";
            const USER_STATUS = "userStatus";
            const USER_GROUP = "organization";
            const LOGGED_IN = "loggedIn";
            const AXE_SETTINGS = "axeSettings";
            const POLICY_SETTINGS = "policySettings";
            const FIRST_VIEW = "firstView";
            const EXPORT_SCHEMA = "exportSchema";
            const events = {
                INSTALL: "conversion:install",
                UNINSTALL: "conversion:uninstall",
                LOGIN: "user:login",
                OPEN_EXTENSION: "user:open",
                ANALYZE: "analysis:analyze",
                RECORD_SAVE: "record:save",
                RECORD_DELETE: "record:delete",
                RECORD_RENAME: "record:rename",
                RECORD_SHARE: "record:share",
                GUIDE_START: "analysis:startGuide",
                GUIDE_SKIP: "analysis:skipGuide",
                GUIDE_CLEAR: "analysis:clearGuide",
                GUIDE_RESUME: "analysis:resumeGuide",
                GUIDE_FINISH: "analysis:complete",
                GUIDE_SAVE: "analysis:save",
                ISSUES_EXPORT: "issues:export",
                ISSUE_SHARE: "issue:share",
                ISSUE_VIEWED: "issue:viewed",
                ISSUE_INSPECTED: "issue:inspected",
                ISSUE_RELATED_INSPECTED: "issue:relatedInspected",
                ISSUE_TOGGLE_HIGHLIGHT: "issue:toggleHighlight",
                ISSUE_MORE_INFO: "issue:moreInfo",
                OUTBOUND_CLICK: "user:outboundClick",
                MOUSE_SELECTION: "usability:selectionMouse",
                SELECT_SELECTION: "usability:selectionSelect",
                SPACEBAR_SELECTION: "usability:selectionSpacebar",
                SPACEBAR_DELETION: "usability:deletionSpacebar",
                REMOVE_DELETION: "usability:deletionRemove",
                TRASH_DELETION: "usability:deletionTrash",
                ML_SUGGESTED_INTERACTIVE_ELEMENT: "ml:suggestedInteractiveElement",
                ML_SUGGESTED_INTERACTIVE_ELEMENT_REJECTED: "ml:suggestedInteractiveElementRejected",
                ML_MISSED_INTERACTIVE_ELEMENT: "ml:missedInteractiveElement",
                ML_SUGGESTED_ROLE: "ml:suggestedRole",
                ML_SUGGESTED_ROLE_ACCEPTED: "ml:suggestedRoleAccepted",
                ML_SUGGESTED_ROLE_REJECTED: "ml:suggestedRoleRejected",
                ML_SUGGESTED_TABLE_HEADER: "ml:suggestedTableHeader",
                ML_SUGGESTED_TABLE_HEADER_REJECTED: "ml:suggestedTableHeaderRejected",
                ML_SUGGESTED_NOT_DATA_CELL: "ml:suggestedNotDataCell",
                ML_SUGGESTED_NOT_DATA_CELL_ACCEPTED: "ml:suggestedNotDataCellAccepted",
                AUTO_COLOR_CONTRAST_START: "analysis:autoColorContrast:start",
                AUTO_COLOR_CONTRAST_COMPLETE: "analysis:autoColorContrast:complete",
                AUTO_COLOR_CONTRAST_ABORT: "analysis:autoColorContrast:abort",
                IGT_ELEMENT_SCOPE: "analysis:igtElementScope",
                TRIAL_EXPIRED_DIALOG: "conversion:trial_expired_dialog",
                TRIAL_EXPIRED_UPGRADE: "conversion:trial_expired_upgrade",
                TRIAL_EXPIRED_UPGRADE_IGNORED: "conversion:trial_expired_upgrade_ignored",
                AXE_CLEAN_UPGRADE: "conversion:axe_clean_upgrade",
                PERFORMANCE_SCAN_DURATION: "performance:scanDuration",
                PERFORMANCE_KEYBOARD_AUTO_TAB_DURATION: "performance:keyboardAutoTabDuration",
                PERFORMANCE_KEYBOARD_FOCUSED_SCREENSHOTTING: "performance:keyboardFocusedScreenshotting",
                PERFORMANCE_KEYBOARD_UNFOCUSED_SCREENSHOTTING: "performance:keyboardUnfocusedScreenshotting",
                PERFORMANCE_INTERACTIVE_ELEMENTS_ML: "performance:interactiveElementsML",
                PERFORMANCE_TABLE_ML: "performance:tableML",
                PERFORMANCE_FORMS_ML: "performance:formsML",
                PERFORMANCE_FORMS_TIMEOUT_ML: "performance:formsTimeoutML",
                PERFORMANCE_LOAD_SAVED_TESTS: "performance:loadSavedTests",
                PERFORMANCE_LOAD_SAVED_TEST: "performance:loadSavedTest",
                PERFORMANCE_SAVE_IGT: "performance:saveIGT",
                IGT_KEYBOARD_TAB_STOP_REPLAY: "igt:keyboardTabStopReplay",
                CONVERSION_CLICK_SCAN_PART: "conversion:click:scanPart",
                CONVERSION_CLICK_IGT_SPLASH: "conversion:click:igt:splash",
                CONVERSION_CLICK_SAVE_TEST: "conversion:click:saveTest",
                CONVERSION_CLICK_EXPORT: "conversion:click:export",
                CONVERSION_CLICK_SHARE_ISSUE: "conversion:click:shareIssue",
                MANUAL_ISSUE_CREATE_CLICK: "manualIssue:create:click",
                MANUAL_ISSUE_CREATE_SUBMIT: "manualIssue:create:submit",
                MANUAL_ISSUE_CREATE_CANCEL: "manualIssue:create:cancel",
                MANUAL_ISSUE_INVALID_DESCRIPTION_SUBMIT: "manualIssue:invalidDescription:submit",
                MANUAL_ISSUE_DESCRIPTION_SELECTION: "manualIssue:description:selection",
                MANUAL_ISSUE_ELEMENT_SELECTION: "manualIssue:element:selection",
                UFA_START: "analysis:startUFA",
                UFA_STOP: "analysis:stopUFA",
                UFA_CANCEL: "analysis:cancelUFA"
            };
            const getImpactCount = (violations = [], impactType) => violations.filter((({impact}) => impact === impactType)).reduce(((count, {nodes}) => count + ((null === nodes || void 0 === nodes ? void 0 : nodes.length) || 1)), 0);
            const isDevURL = u => {
                try {
                    const url = new URL(u);
                    return "localhost" === url.hostname || !!url.port || "file://" === url.origin;
                } catch (e) {
                    return false;
                }
            };
            const getIssueProperties = issues => {
                if ("undefined" === typeof issues) return;
                const failedRules = Array.from(new Set(issues.map((r => r.rule || r.id))));
                const issueData = {
                    failedRuleCount: failedRules.length,
                    failedRuleNames: failedRules,
                    criticalIssueCount: getImpactCount(issues, "critical"),
                    seriousIssueCount: getImpactCount(issues, "serious"),
                    moderateIssueCount: getImpactCount(issues, "moderate"),
                    minorIssueCount: getImpactCount(issues, "minor")
                };
                if (issues.length && Array.isArray(issues[0].nodes)) {
                    const sum = issues.reduce(((count, issue) => count + issue.nodes.length), 0);
                    issueData.failedItemCount = sum;
                }
                return issueData;
            };
            const postEvent = async value => {
                if (!isAnalyticsEnabled()) return;
                const usageClient = await usage_service_client_getUsageServiceClient();
                const {productName, productComponent} = usageClient;
                const data = analytics_objectSpread(analytics_objectSpread({}, value), {}, {
                    productName,
                    productComponent
                });
                try {
                    let {event: name} = data, eventData = _objectWithoutProperties(data, [ "event" ]);
                    analytics_event(name, eventData);
                } catch (error) {
                    warn("Analytics Data Error", {
                        error: error.message,
                        stack: error.stack
                    });
                }
                try {
                    usageClient.postEvent(data);
                } catch (error) {
                    warn("Usage Data Error", {
                        error: error.message,
                        stack: error.stack
                    });
                }
            };
            const getUserStatus = user => {
                let userStatus = "anonymous";
                switch (null === user || void 0 === user ? void 0 : user.status) {
                  case TRIALING:
                    userStatus = "trial";
                    break;

                  case PAID:
                  case PAID_PAYMENT_FAILED:
                  case TRIAL_ENDED:
                  case TRIAL_PAYMENT_FAILED:
                  case FREE:
                  case FREE_PAYMENT_FAILED:
                    userStatus = user.status;
                    break;
                }
                return userStatus;
            };
            const getDefaultUsageData = async (issues = []) => {
                let contentType, title, url, scoped;
                const isDevtools = "devtools" in browser;
                if (isDevtools) try {
                    ({contentType, title, url, scoped} = await bridge.send(context.content, "get-document-metadata"));
                } catch (ex) {
                    main.fy.logger.error("Unable to get document metadata", {
                        error: ex.message,
                        stack: ex.stack
                    });
                }
                const {usageOrganization, usageDepartment, usageApplication, user, cachedUserCompany, axeSettings, userJobRole, cachedUserEmail} = await browser.storage.local.get([ "usageOrganization", "usageDepartment", "usageApplication", "user", "cachedUserCompany", "axeSettings", "userJobRole", "cachedUserEmail" ]);
                const isAuthenticated = !!(user && user.id);
                return {
                    distinctId: await distinct_id_distinctId(),
                    organization: usageOrganization ? usageOrganization : (null === user || void 0 === user ? void 0 : user.company) || cachedUserCompany || "",
                    department: usageDepartment || "",
                    application: usageApplication || "",
                    userStatus: getUserStatus(user),
                    loggedIn: isAuthenticated,
                    devInstance: isDevURL(url),
                    keycloakId: user && user.id,
                    userId: user && user.username || cachedUserEmail,
                    userJobRole: userJobRole || "Anonymous",
                    productName: "axe-pro",
                    productComponent: "extension",
                    productComponentVersion: package_namespaceObject_0.i8,
                    applicationProperties: analytics_objectSpread({
                        engineVersion: package_namespaceObject.i8,
                        scoped,
                        target: url,
                        targetMedium: contentType,
                        targetState: title,
                        experimental: false,
                        rulesetName: (null === axeSettings || void 0 === axeSettings ? void 0 : axeSettings.ruleset) || "all",
                        bestPractices: !!axeSettings && !!axeSettings.enableBestPractices
                    }, getIssueProperties(issues))
                };
            };
            const identify = async (identifyProperties = {}) => {
                if (!isAnalyticsEnabled()) return;
                const {user, userJobRole = "", usageOrganization = "", cachedUserCompany, axeSettings, highlightTheme, theme, locale, policySettings, axeServerURL, firstView, exportFormat} = await browser.storage.local.get([ "user", "userJobRole", "usageOrganization", "cachedUserCompany", "axeSettings", "highlightTheme", "theme", "locale", "policySettings", "axeServerURL", "firstView", "exportFormat" ]);
                amplitude.setUserId(user && user.id);
                const isAuthenticated = user && user.id;
                const amplitudeIdentify = (new amplitude.Identify).set(USER_ROLE, userJobRole).set(USER_STATUS, getUserStatus(user)).set(LOGGED_IN, isAuthenticated).set(AXE_SETTINGS, analytics_objectSpread(analytics_objectSpread({
                    highlightTheme,
                    theme,
                    locale,
                    axeServerURL
                }, axeSettings), {}, {
                    ruleset: (null === axeSettings || void 0 === axeSettings ? void 0 : axeSettings.ruleset) || "all"
                })).set(POLICY_SETTINGS, policySettings).set(FIRST_VIEW, firstView).set(EXPORT_SCHEMA, exportFormat || "devtools");
                for (const [key, value] of Object.entries(identifyProperties)) isNaN(value) ? amplitudeIdentify.set(key, value) : amplitudeIdentify.add(key, value);
                amplitude.identify(amplitudeIdentify);
                amplitude.setGroup(USER_GROUP, usageOrganization ? usageOrganization : (null === user || void 0 === user ? void 0 : user.company) || cachedUserCompany);
            };
            const eventFactory = event => async function(issues, additionalApplicationProperties) {
                if (!isAnalyticsEnabled()) return;
                const defaultData = await getDefaultUsageData(issues);
                if (!additionalApplicationProperties) return postEvent(analytics_objectSpread(analytics_objectSpread({}, defaultData), {}, {
                    event
                }));
                postEvent(analytics_objectSpread(analytics_objectSpread({}, defaultData), {}, {
                    event,
                    applicationProperties: analytics_objectSpread(analytics_objectSpread({}, defaultData.applicationProperties), additionalApplicationProperties)
                }));
            };
            const issueEventFactory = eventName => additionalData => eventFactory(eventName)(void 0, additionalData);
            eventFactory(events.ISSUE_VIEWED);
            issueEventFactory(events.ISSUE_INSPECTED);
            issueEventFactory(events.ISSUE_RELATED_INSPECTED);
            issueEventFactory(events.ISSUE_TOGGLE_HIGHLIGHT);
            issueEventFactory(events.ISSUE_MORE_INFO);
            eventFactory(events.RECORD_DELETE);
            eventFactory(events.RECORD_RENAME);
            eventFactory(events.INSTALL);
            eventFactory(events.UNINSTALL);
            eventFactory(events.LOGIN);
            eventFactory(events.OPEN_EXTENSION);
            const mlEventFactory = (eventName, eventTool = "interactive-elements") => additionalData => eventFactory(eventName)(void 0, analytics_objectSpread({
                eventTool
            }, additionalData));
            mlEventFactory(events.ML_SUGGESTED_INTERACTIVE_ELEMENT);
            mlEventFactory(events.ML_SUGGESTED_INTERACTIVE_ELEMENT_REJECTED);
            mlEventFactory(events.ML_MISSED_INTERACTIVE_ELEMENT);
            mlEventFactory(events.ML_SUGGESTED_ROLE);
            mlEventFactory(events.ML_SUGGESTED_ROLE_ACCEPTED);
            mlEventFactory(events.ML_SUGGESTED_ROLE_REJECTED);
            mlEventFactory(events.ML_SUGGESTED_TABLE_HEADER, "table");
            mlEventFactory(events.ML_SUGGESTED_TABLE_HEADER_REJECTED, "table");
            mlEventFactory(events.ML_SUGGESTED_NOT_DATA_CELL, "table");
            mlEventFactory(events.ML_SUGGESTED_NOT_DATA_CELL_ACCEPTED, "table");
            eventFactory(events.CONVERSION_CLICK_SCAN_PART);
            eventFactory(events.CONVERSION_CLICK_SAVE_TEST);
            eventFactory(events.CONVERSION_CLICK_EXPORT);
            eventFactory(events.CONVERSION_CLICK_SHARE_ISSUE);
            eventFactory(events.UFA_START);
            let amplitudeInitialized = false;
            let datadogInitialized = false;
            const initializeAmplitude = async () => {
                if (amplitudeInitialized || !isAnalyticsEnabled()) return;
                const distinctId = await distinct_id_distinctId();
                amplitude.init(AMPLITUDE_API_KEY, void 0, {
                    deviceId: distinctId,
                    includeUtm: true,
                    saveParamsReferrerOncePerSession: false,
                    includeGclid: true,
                    includeReferrer: true,
                    secureCookie: true,
                    sameSiteCookie: "Lax"
                });
                amplitudeInitialized = true;
            };
            const initializeDatadog = async () => {
                const enableDatadog = "undefined" !== typeof globalThis.document && "undefined" !== typeof globalThis.XMLHttpRequest;
                if (!enableDatadog) return;
                if (datadogInitialized || !isAnalyticsEnabled()) return true;
                main.fy.init({
                    clientToken: DATADOG_CLIENT_TOKEN,
                    site: "datadoghq.com",
                    service: "axe-extension",
                    env: NODE_ENV,
                    version: package_namespaceObject_0.i8,
                    beforeSend: log => {
                        var _log$http;
                        if (0 === (null === log || void 0 === log ? void 0 : null === (_log$http = log.http) || void 0 === _log$http ? void 0 : _log$http.status_code)) return false;
                    }
                });
                datadogInitialized = true;
            };
            const initialize = async () => {
                await Promise.all([ initializeAmplitude(), initializeDatadog() ]);
            };
            const analytics_event = async (eventType, eventProperties = {}) => {
                if (!isAnalyticsEnabled()) return;
                await initialize();
                let identifyProperties = {};
                switch (eventType) {
                  case events.ANALYZE:
                    identifyProperties = {
                        analyze: 1
                    };
                    break;

                  case events.GUIDE_FINISH:
                    identifyProperties = {
                        complete: 1
                    };
                    break;

                  case events.ISSUES_EXPORT:
                    identifyProperties = {
                        export: 1
                    };
                    break;
                }
                await identify(identifyProperties);
                const {devInstance, productName, productComponent, productComponentVersion, engineVersion, applicationProperties} = eventProperties;
                const metadaata = analytics_objectSpread({
                    devInstance,
                    productName,
                    productComponent,
                    productComponentVersion,
                    engineVersion
                }, applicationProperties);
                amplitude.logEvent(eventType, metadaata);
            };
            const manifest = browser.runtime.getManifest();
            const devtools_name = manifest.name.split(" - ")[0];
            initialize();
            browser.devtools.panels.create(devtools_name, "", "panel.html").then((() => {
                bridge.send(context.content, "init", {
                    extension: manifest.name,
                    version: manifest.version
                });
            }));
        },
        6553: () => {}
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            id: moduleId,
            loaded: false,
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
    }
    __webpack_require__.m = __webpack_modules__;
    (() => {
        __webpack_require__.amdO = {};
    })();
    (() => {
        var deferred = [];
        __webpack_require__.O = (result, chunkIds, fn, priority) => {
            if (chunkIds) {
                priority = priority || 0;
                for (var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
                deferred[i] = [ chunkIds, fn, priority ];
                return;
            }
            var notFulfilled = 1 / 0;
            for (i = 0; i < deferred.length; i++) {
                var [chunkIds, fn, priority] = deferred[i];
                var fulfilled = true;
                for (var j = 0; j < chunkIds.length; j++) if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key => __webpack_require__.O[key](chunkIds[j])))) chunkIds.splice(j--, 1); else {
                    fulfilled = false;
                    if (priority < notFulfilled) notFulfilled = priority;
                }
                if (fulfilled) {
                    deferred.splice(i--, 1);
                    var r = fn();
                    if (void 0 !== r) result = r;
                }
            }
            return result;
        };
    })();
    (() => {
        __webpack_require__.n = module => {
            var getter = module && module.__esModule ? () => module["default"] : () => module;
            __webpack_require__.d(getter, {
                a: getter
            });
            return getter;
        };
    })();
    (() => {
        __webpack_require__.d = (exports, definition) => {
            for (var key in definition) if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) Object.defineProperty(exports, key, {
                enumerable: true,
                get: definition[key]
            });
        };
    })();
    (() => {
        __webpack_require__.g = function() {
            if ("object" === typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if ("object" === typeof window) return window;
            }
        }();
    })();
    (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();
    (() => {
        __webpack_require__.r = exports => {
            if ("undefined" !== typeof Symbol && Symbol.toStringTag) Object.defineProperty(exports, Symbol.toStringTag, {
                value: "Module"
            });
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
        };
    })();
    (() => {
        __webpack_require__.nmd = module => {
            module.paths = [];
            if (!module.children) module.children = [];
            return module;
        };
    })();
    (() => {
        __webpack_require__.j = 308;
    })();
    (() => {
        var installedChunks = {
            308: 0
        };
        __webpack_require__.O.j = chunkId => 0 === installedChunks[chunkId];
        var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
            var [chunkIds, moreModules, runtime] = data;
            var moduleId, chunkId, i = 0;
            if (chunkIds.some((id => 0 !== installedChunks[id]))) {
                for (moduleId in moreModules) if (__webpack_require__.o(moreModules, moduleId)) __webpack_require__.m[moduleId] = moreModules[moduleId];
                if (runtime) var result = runtime(__webpack_require__);
            }
            if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
            for (;i < chunkIds.length; i++) {
                chunkId = chunkIds[i];
                if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) installedChunks[chunkId][0]();
                installedChunks[chunkId] = 0;
            }
            return __webpack_require__.O(result);
        };
        var chunkLoadingGlobal = this["webpackChunk"] = this["webpackChunk"] || [];
        chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
        chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
    })();
    var __webpack_exports__ = __webpack_require__.O(void 0, [ 736 ], (() => __webpack_require__(6555)));
    __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
})();