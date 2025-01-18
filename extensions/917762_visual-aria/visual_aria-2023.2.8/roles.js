/*!
Visual ARIA Bookmarklet (CSS: 08/06/2018), JS last modified 02/26/2019
Copyright 2019 Bryan Garaventa
https://github.com/accdc/visual-aria
Part of the ARIA Role Conformance Matrices, distributed under the terms of the Open Source Initiative OSI - MIT License
*/

// Visual ARIA

(function () {
    var useOffline = true,
        basePath = "css/",
        msInterval = 2000;

    /*!
     * @overview es6-promise - a tiny implementation of Promises/A+.
     * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
     * @license   Licensed under MIT license
     *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
     * @version   v4.2.4+314e4831
     */

    (function (global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ?
            (module.exports = factory()) :
            typeof define === "function" && define.amd ?
            define(factory) :
            (global.ES6Promise = factory());
    })(this, function () {
        "use strict";

        function objectOrFunction(x) {
            var type = typeof x;
            return x !== null && (type === "object" || type === "function");
        }

        function isFunction(x) {
            return typeof x === "function";
        }

        var _isArray = void 0;
        if (Array.isArray) {
            _isArray = Array.isArray;
        } else {
            _isArray = function (x) {
                return Object.prototype.toString.call(x) === "[object Array]";
            };
        }

        var isArray = _isArray;

        var len = 0;
        var vertxNext = void 0;
        var customSchedulerFn = void 0;

        var asap = function asap(callback, arg) {
            queue[len] = callback;
            queue[len + 1] = arg;
            len += 2;
            if (len === 2) {
                // If len is 2, that means that we need to schedule an async flush.
                // If additional callbacks are queued before the queue is flushed, they
                // will be processed by this flush that we are scheduling.
                if (customSchedulerFn) {
                    customSchedulerFn(flush);
                } else {
                    scheduleFlush();
                }
            }
        };

        function setScheduler(scheduleFn) {
            customSchedulerFn = scheduleFn;
        }

        function setAsap(asapFn) {
            asap = asapFn;
        }

        var browserWindow = typeof window !== "undefined" ? window : undefined;
        var browserGlobal = browserWindow || {};
        var BrowserMutationObserver =
            browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
        var isNode =
            typeof self === "undefined" &&
            typeof process !== "undefined" && {}.toString.call(process) === "[object process]";

        // test for web worker but not in IE10
        var isWorker =
            typeof Uint8ClampedArray !== "undefined" &&
            typeof importScripts !== "undefined" &&
            typeof MessageChannel !== "undefined";

        // node
        function useNextTick() {
            // node version 0.10.x displays a deprecation warning when nextTick is used recursively
            // see https://github.com/cujojs/when/issues/410 for details
            return function () {
                return process.nextTick(flush);
            };
        }

        // vertx
        function useVertxTimer() {
            if (typeof vertxNext !== "undefined") {
                return function () {
                    vertxNext(flush);
                };
            }

            return useSetTimeout();
        }

        function useMutationObserver() {
            var iterations = 0;
            var observer = new BrowserMutationObserver(flush);
            var node = document.createTextNode("");
            observer.observe(node, {
                characterData: true
            });

            return function () {
                node.data = iterations = ++iterations % 2;
            };
        }

        // web worker
        function useMessageChannel() {
            var channel = new MessageChannel();
            channel.port1.onmessage = flush;
            return function () {
                return channel.port2.postMessage(0);
            };
        }

        function useSetTimeout() {
            // Store setTimeout reference so es6-promise will be unaffected by
            // other code modifying setTimeout (like sinon.useFakeTimers())
            var globalSetTimeout = setTimeout;
            return function () {
                return globalSetTimeout(flush, 1);
            };
        }

        var queue = new Array(1000);

        function flush() {
            for (var i = 0; i < len; i += 2) {
                var callback = queue[i];
                var arg = queue[i + 1];

                callback(arg);

                queue[i] = undefined;
                queue[i + 1] = undefined;
            }

            len = 0;
        }

        function attemptVertx() {
            try {
                var vertx = Function("return this")().require("vertx");
                vertxNext = vertx.runOnLoop || vertx.runOnContext;
                return useVertxTimer();
            } catch (e) {
                return useSetTimeout();
            }
        }

        var scheduleFlush = void 0;
        // Decide what async method to use to triggering processing of queued callbacks:
        if (isNode) {
            scheduleFlush = useNextTick();
        } else if (BrowserMutationObserver) {
            scheduleFlush = useMutationObserver();
        } else if (isWorker) {
            scheduleFlush = useMessageChannel();
        } else if (browserWindow === undefined && typeof require === "function") {
            scheduleFlush = attemptVertx();
        } else {
            scheduleFlush = useSetTimeout();
        }

        function then(onFulfillment, onRejection) {
            var parent = this;

            var child = new this.constructor(noop);

            if (child[PROMISE_ID] === undefined) {
                makePromise(child);
            }

            var _state = parent._state;

            if (_state) {
                var callback = arguments[_state - 1];
                asap(function () {
                    return invokeCallback(_state, child, callback, parent._result);
                });
            } else {
                subscribe(parent, child, onFulfillment, onRejection);
            }

            return child;
        }

        function resolve$1(object) {
            /*jshint validthis:true */
            var Constructor = this;

            if (
                object &&
                typeof object === "object" &&
                object.constructor === Constructor
            ) {
                return object;
            }

            var promise = new Constructor(noop);
            resolve(promise, object);
            return promise;
        }

        var PROMISE_ID = Math.random()
            .toString(36)
            .substring(2);

        function noop() {}

        var PENDING = void 0;
        var FULFILLED = 1;
        var REJECTED = 2;

        var TRY_CATCH_ERROR = {
            error: null
        };

        function selfFulfillment() {
            return new TypeError("You cannot resolve a promise with itself");
        }

        function cannotReturnOwn() {
            return new TypeError(
                "A promises callback cannot return that same promise."
            );
        }

        function getThen(promise) {
            try {
                return promise.then;
            } catch (error) {
                TRY_CATCH_ERROR.error = error;
                return TRY_CATCH_ERROR;
            }
        }

        function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
            try {
                then$$1.call(value, fulfillmentHandler, rejectionHandler);
            } catch (e) {
                return e;
            }
        }

        function handleForeignThenable(promise, thenable, then$$1) {
            asap(function (promise) {
                var sealed = false;
                var error = tryThen(
                    then$$1,
                    thenable,
                    function (value) {
                        if (sealed) {
                            return;
                        }
                        sealed = true;
                        if (thenable !== value) {
                            resolve(promise, value);
                        } else {
                            fulfill(promise, value);
                        }
                    },
                    function (reason) {
                        if (sealed) {
                            return;
                        }
                        sealed = true;

                        reject(promise, reason);
                    },
                    "Settle: " + (promise._label || " unknown promise")
                );

                if (!sealed && error) {
                    sealed = true;
                    reject(promise, error);
                }
            }, promise);
        }

        function handleOwnThenable(promise, thenable) {
            if (thenable._state === FULFILLED) {
                fulfill(promise, thenable._result);
            } else if (thenable._state === REJECTED) {
                reject(promise, thenable._result);
            } else {
                subscribe(
                    thenable,
                    undefined,
                    function (value) {
                        return resolve(promise, value);
                    },
                    function (reason) {
                        return reject(promise, reason);
                    }
                );
            }
        }

        function handleMaybeThenable(promise, maybeThenable, then$$1) {
            if (
                maybeThenable.constructor === promise.constructor &&
                then$$1 === then &&
                maybeThenable.constructor.resolve === resolve$1
            ) {
                handleOwnThenable(promise, maybeThenable);
            } else {
                if (then$$1 === TRY_CATCH_ERROR) {
                    reject(promise, TRY_CATCH_ERROR.error);
                    TRY_CATCH_ERROR.error = null;
                } else if (then$$1 === undefined) {
                    fulfill(promise, maybeThenable);
                } else if (isFunction(then$$1)) {
                    handleForeignThenable(promise, maybeThenable, then$$1);
                } else {
                    fulfill(promise, maybeThenable);
                }
            }
        }

        function resolve(promise, value) {
            if (promise === value) {
                reject(promise, selfFulfillment());
            } else if (objectOrFunction(value)) {
                handleMaybeThenable(promise, value, getThen(value));
            } else {
                fulfill(promise, value);
            }
        }

        function publishRejection(promise) {
            if (promise._onerror) {
                promise._onerror(promise._result);
            }

            publish(promise);
        }

        function fulfill(promise, value) {
            if (promise._state !== PENDING) {
                return;
            }

            promise._result = value;
            promise._state = FULFILLED;

            if (promise._subscribers.length !== 0) {
                asap(publish, promise);
            }
        }

        function reject(promise, reason) {
            if (promise._state !== PENDING) {
                return;
            }
            promise._state = REJECTED;
            promise._result = reason;

            asap(publishRejection, promise);
        }

        function subscribe(parent, child, onFulfillment, onRejection) {
            var _subscribers = parent._subscribers;
            var length = _subscribers.length;

            parent._onerror = null;

            _subscribers[length] = child;
            _subscribers[length + FULFILLED] = onFulfillment;
            _subscribers[length + REJECTED] = onRejection;

            if (length === 0 && parent._state) {
                asap(publish, parent);
            }
        }

        function publish(promise) {
            var subscribers = promise._subscribers;
            var settled = promise._state;

            if (subscribers.length === 0) {
                return;
            }

            var child = void 0,
                callback = void 0,
                detail = promise._result;

            for (var i = 0; i < subscribers.length; i += 3) {
                child = subscribers[i];
                callback = subscribers[i + settled];

                if (child) {
                    invokeCallback(settled, child, callback, detail);
                } else {
                    callback(detail);
                }
            }

            promise._subscribers.length = 0;
        }

        function tryCatch(callback, detail) {
            try {
                return callback(detail);
            } catch (e) {
                TRY_CATCH_ERROR.error = e;
                return TRY_CATCH_ERROR;
            }
        }

        function invokeCallback(settled, promise, callback, detail) {
            var hasCallback = isFunction(callback),
                value = void 0,
                error = void 0,
                succeeded = void 0,
                failed = void 0;

            if (hasCallback) {
                value = tryCatch(callback, detail);

                if (value === TRY_CATCH_ERROR) {
                    failed = true;
                    error = value.error;
                    value.error = null;
                } else {
                    succeeded = true;
                }

                if (promise === value) {
                    reject(promise, cannotReturnOwn());
                    return;
                }
            } else {
                value = detail;
                succeeded = true;
            }

            if (promise._state !== PENDING) {
                // noop
            } else if (hasCallback && succeeded) {
                resolve(promise, value);
            } else if (failed) {
                reject(promise, error);
            } else if (settled === FULFILLED) {
                fulfill(promise, value);
            } else if (settled === REJECTED) {
                reject(promise, value);
            }
        }

        function initializePromise(promise, resolver) {
            try {
                resolver(
                    function resolvePromise(value) {
                        resolve(promise, value);
                    },
                    function rejectPromise(reason) {
                        reject(promise, reason);
                    }
                );
            } catch (e) {
                reject(promise, e);
            }
        }

        var id = 0;

        function nextId() {
            return id++;
        }

        function makePromise(promise) {
            promise[PROMISE_ID] = id++;
            promise._state = undefined;
            promise._result = undefined;
            promise._subscribers = [];
        }

        function validationError() {
            return new Error("Array Methods must be provided an Array");
        }

        var Enumerator = (function () {
            function Enumerator(Constructor, input) {
                this._instanceConstructor = Constructor;
                this.promise = new Constructor(noop);

                if (!this.promise[PROMISE_ID]) {
                    makePromise(this.promise);
                }

                if (isArray(input)) {
                    this.length = input.length;
                    this._remaining = input.length;

                    this._result = new Array(this.length);

                    if (this.length === 0) {
                        fulfill(this.promise, this._result);
                    } else {
                        this.length = this.length || 0;
                        this._enumerate(input);
                        if (this._remaining === 0) {
                            fulfill(this.promise, this._result);
                        }
                    }
                } else {
                    reject(this.promise, validationError());
                }
            }

            Enumerator.prototype._enumerate = function _enumerate(input) {
                for (var i = 0; this._state === PENDING && i < input.length; i++) {
                    this._eachEntry(input[i], i);
                }
            };

            Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
                var c = this._instanceConstructor;
                var resolve$$1 = c.resolve;

                if (resolve$$1 === resolve$1) {
                    var _then = getThen(entry);

                    if (_then === then && entry._state !== PENDING) {
                        this._settledAt(entry._state, i, entry._result);
                    } else if (typeof _then !== "function") {
                        this._remaining--;
                        this._result[i] = entry;
                    } else if (c === Promise$2) {
                        var promise = new c(noop);
                        handleMaybeThenable(promise, entry, _then);
                        this._willSettleAt(promise, i);
                    } else {
                        this._willSettleAt(
                            new c(function (resolve$$1) {
                                return resolve$$1(entry);
                            }),
                            i
                        );
                    }
                } else {
                    this._willSettleAt(resolve$$1(entry), i);
                }
            };

            Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
                var promise = this.promise;

                if (promise._state === PENDING) {
                    this._remaining--;

                    if (state === REJECTED) {
                        reject(promise, value);
                    } else {
                        this._result[i] = value;
                    }
                }

                if (this._remaining === 0) {
                    fulfill(promise, this._result);
                }
            };

            Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
                var enumerator = this;

                subscribe(
                    promise,
                    undefined,
                    function (value) {
                        return enumerator._settledAt(FULFILLED, i, value);
                    },
                    function (reason) {
                        return enumerator._settledAt(REJECTED, i, reason);
                    }
                );
            };

            return Enumerator;
        })();

        function all(entries) {
            return new Enumerator(this, entries).promise;
        }

        function race(entries) {
            /*jshint validthis:true */
            var Constructor = this;

            if (!isArray(entries)) {
                return new Constructor(function (_, reject) {
                    return reject(new TypeError("You must pass an array to race."));
                });
            } else {
                return new Constructor(function (resolve, reject) {
                    var length = entries.length;
                    for (var i = 0; i < length; i++) {
                        Constructor.resolve(entries[i]).then(resolve, reject);
                    }
                });
            }
        }

        function reject$1(reason) {
            /*jshint validthis:true */
            var Constructor = this;
            var promise = new Constructor(noop);
            reject(promise, reason);
            return promise;
        }

        function needsResolver() {
            throw new TypeError(
                "You must pass a resolver function as the first argument to the promise constructor"
            );
        }

        function needsNew() {
            throw new TypeError(
                "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
            );
        }

        var Promise$2 = (function () {
            function Promise(resolver) {
                this[PROMISE_ID] = nextId();
                this._result = this._state = undefined;
                this._subscribers = [];

                if (noop !== resolver) {
                    typeof resolver !== "function" && needsResolver();
                    this instanceof Promise
                        ?
                        initializePromise(this, resolver) :
                        needsNew();
                }
            }

            Promise.prototype.catch = function _catch(onRejection) {
                return this.then(null, onRejection);
            };

            Promise.prototype.finally = function _finally(callback) {
                var promise = this;
                var constructor = promise.constructor;

                return promise.then(
                    function (value) {
                        return constructor.resolve(callback()).then(function () {
                            return value;
                        });
                    },
                    function (reason) {
                        return constructor.resolve(callback()).then(function () {
                            throw reason;
                        });
                    }
                );
            };

            return Promise;
        })();

        Promise$2.prototype.then = then;
        Promise$2.all = all;
        Promise$2.race = race;
        Promise$2.resolve = resolve$1;
        Promise$2.reject = reject$1;
        Promise$2._setScheduler = setScheduler;
        Promise$2._setAsap = setAsap;
        Promise$2._asap = asap;

        /*global self*/
        function polyfill() {
            var local = void 0;

            if (typeof global !== "undefined") {
                local = global;
            } else if (typeof self !== "undefined") {
                local = self;
            } else {
                try {
                    local = Function("return this")();
                } catch (e) {
                    throw new Error(
                        "polyfill failed because global object is unavailable in this environment"
                    );
                }
            }

            var P = local.Promise;

            if (P) {
                var promiseToString = null;
                try {
                    promiseToString = Object.prototype.toString.call(P.resolve());
                } catch (e) {
                    // silently ignored
                }

                if (promiseToString === "[object Promise]" && !P.cast) {
                    return;
                }
            }

            local.Promise = Promise$2;
        }

        // Strange compat..
        Promise$2.polyfill = polyfill;
        Promise$2.Promise = Promise$2;

        Promise$2.polyfill();

        return Promise$2;
    });


    window.VisualARIA = {};

    window.top.VisualARIA.IsVisualARIALoaded = true;

    var WSBMInit = function (
        isTop,
        useOffline,
        basePath,
        msInterval,
        document,
        attrs,
        isNested,
        check,
        loaded
    ) {
        var loader = this;

        var bind = function (obj, type, fn) {
                if (obj.attachEvent) {
                    obj["e" + type + fn] = fn;

                    obj[type + fn] = function () {
                        obj["e" + type + fn](window.event);
                    };

                    obj.attachEvent("on" + type, obj[type + fn]);
                } else if (obj.addEventListener) {
                    obj.addEventListener(type, fn, false);
                }

                return obj;
            },
            trim = function (str) {
                if (typeof str !== "string") return "";

                return str.replace(/^\s+|\s+$/g, "");
            },
            activeObj = null,
            activeDObj = null;

        attrs = "aria-disabled,aria-readonly,aria-haspopup,aria-orientation,aria-label,aria-labelledby,aria-describedby,aria-pressed,aria-checked,aria-valuemin,aria-valuemax,aria-valuenow,aria-valuetext,aria-controls,aria-autocomplete,aria-expanded,aria-owns,aria-activedescendant,aria-posinset,aria-setsize,aria-level,role,alt".split(
            ","
        );
        isNested = function (start, role) {
            while (start) {
                start = start.parentNode;

                if (start.getAttribute("role") === role) return "true";
            }

            return "false";
        };

        check = function (
            nodes,
            obj,
            frames,
            focused,
            pNode,
            focusHidden,
            isSelfRef,
            isDefTerm
        ) {
            if (!window.top.VisualARIA.IsVisualARIALoaded) {
                if (loader.cssLinks && loader.cssLinks.length) {
                    for (var i = 0; i < loader.cssLinks.length; i++) {
                        loader.cssLinks[i].parentNode.removeChild(loader.cssLinks[i]);
                    }
                    loader.cssLinks = [];
                    loaded = {
                        init: false,
                        landmarks: false,
                        structural: false,
                        dialogs: false,
                        liveRegions: false,
                        simpleWidgets: false,
                        comboboxListbox: false,
                        menuMenubar: false,
                        radiogroup: false,
                        tablist: false,
                        tree: false,
                        treegridGridTable: false
                    };
                }
            } else {
                if (loaded && loaded.init) {
                    if (
                        !loaded.comboboxListbox &&
                        !document.getElementById("ws-visual-aria-7") &&
                        document.querySelectorAll(
                            '*[role="combobox"], *[role="listbox"], *[role="option"]'
                        ).length
                    ) {
                        loaded.comboboxListbox = true;
                        loadCSS("7combobox-listbox.css", "7");
                    }

                    if (
                        !loaded.menuMenubar &&
                        !document.getElementById("ws-visual-aria-8") &&
                        document.querySelectorAll(
                            '*[role="menu"], *[role="menubar"], *[role="menuitem"], *[role="menuitemradio"], *[role="menuitemcheckbox"]'
                        ).length
                    ) {
                        loaded.menuMenubar = true;
                        loadCSS("8menu-menubar.css", "8");
                    }

                    if (
                        !loaded.radiogroup &&
                        !document.getElementById("ws-visual-aria-9") &&
                        document.querySelectorAll('*[role="radiogroup"], *[role="radio"]')
                        .length
                    ) {
                        loaded.radiogroup = true;
                        loadCSS("9radiogroup.css", "9");
                    }

                    if (
                        !loaded.tablist &&
                        !document.getElementById("ws-visual-aria-10") &&
                        document.querySelectorAll(
                            '*[role="tablist"], *[role="tab"], *[role="tabpanel"]'
                        ).length
                    ) {
                        loaded.tablist = true;
                        loadCSS("10tablist.css", "10");
                    }

                    if (
                        !loaded.tree &&
                        !document.getElementById("ws-visual-aria-11") &&
                        document.querySelectorAll('*[role="tree"], *[role="treeitem"]')
                        .length
                    ) {
                        loaded.tree = true;
                        loadCSS("11tree.css", "11");
                    }

                    if (
                        !loaded.treegridGridTable &&
                        !document.getElementById("ws-visual-aria-12") &&
                        document.querySelectorAll(
                            '*[role="treegrid"], *[role="grid"], *[role="table"], *[role="rowgroup"], *[role="row"], *[role="columnheader"], *[role="rowheader"], *[role="gridcell"], *[role="cell"]'
                        ).length
                    ) {
                        loaded.treegridGridTable = true;
                        loadCSS("12treegrid-grid-table.css", "12");
                    }
                }

                if (loaded && !loaded.init) {
                    loaded.init = true;
                    loadCSS("1roles.css", "1");
                    loaded.landmarks = true;
                    loadCSS("2landmarks.css", "2");
                    loaded.structural = true;
                    loadCSS("3structural.css", "3");
                    loaded.dialogs = true;
                    loadCSS("4dialogs.css", "4");
                    loaded.liveRegions = true;
                    loadCSS("5live-regions.css", "5");
                    loaded.simpleWidgets = true;
                    loadCSS("6simple-widgets.css", "6");
                }

                // BG:12/18/2017: Added the AREA and HR elements to check for improper usage of aria-owns as well.
                nodes = document.querySelectorAll(
                    "input[aria-owns], img[aria-owns], area[aria-owns], hr[aria-owns]"
                );

                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].setAttribute("data-ws-bm-aria-owns-invalid", "true");
                    nodes[i].parentNode.setAttribute(
                        "data-ws-bm-aria-owns-invalid",
                        nodes[i].nodeName.toUpperCase()
                    );
                }

                nodes = document.querySelectorAll(
                    "div:not([role])[aria-label],div:not([role])[aria-labelledby],span:not([role])[aria-labelledby],span:not([role])[aria-label],[role=caption][aria-labelledby],[role=code][aria-labelledby],[role=deletion][aria-labelledby],[role=emphasis][aria-labelledby],[role=generic][aria-labelledby],[role=insertion][aria-labelledby],[role=paragraph][aria-labelledby],[role=presentation][aria-labelledby],[role=strong][aria-labelledby],[role=subscript][aria-labelledby],[role=superscript][aria-labelledby],[role=caption][aria-label],[role=code][aria-label],[role=deletion][aria-label],[role=\"emphasis\"][aria-label],[role=\"generic\"][aria-label],[role=\"insertion\"][aria-label],[role=\"paragraph\"][aria-label],[role=presentation][aria-label], [role=none][aria-label],[role=strong][aria-label],[role=subscript][aria-label],[role=superscript][aria-label]"
                );

                for (let n = 0; n < nodes.length; n++) {
                    const currentNode = nodes[n];
                    const role = currentNode.getAttribute('role');
                    currentNode.setAttribute("data-ws-name-prohibited-aria", role);
                }

                nodes = document.querySelectorAll(
                    "div:not([role])[aria-labelledby], span:not([role])[aria-labelledby], caption:not([role])[aria-labelledby], figcaption:not([role])[aria-labelledby], code:not([role])[aria-labelledby], del:not([role])[aria-labelledby], em:not([role])[aria-labelledby], ins:not([role])[aria-labelledby], p:not([role])[aria-labelledby], strong:not([role])[aria-labelledby], sub:not([role])[aria-labelledby], sup:not([role])[aria-labelledby], div:not([role])[aria-label], span:not([role])[aria-label], caption:not([role])[aria-label], figcaption:not([role])[aria-label], code:not([role])[aria-label], del:not([role])[aria-label], em:not([role])[aria-label], ins:not([role])[aria-label], p:not([role])[aria-label], strong:not([role])[aria-label], sub:not([role])[aria-label], sup:not([role])[aria-label]"
                );

                for (var n = 0; n < nodes.length; n++) {
                    nodes[n].setAttribute("data-ws-name-prohibited-html", nodes[n].nodeName);
                }

                nodes = document.querySelectorAll("input, *[role], img, progress");

                obj = {};

                isSelfRef = function (node, role, ids) {
                    if (
                        !node ||
                        node.nodeType !== 1 ||
                        !trim(role) ||
                        !trim(ids) ||
                        " application banner complementary contentinfo form main navigation region search article directory document list note table toolbar feed log status combobox grid listbox menu menubar radiogroup tablist tabpanel tree group treegrid ".indexOf(
                            " " + role + " "
                        ) === -1
                    )
                        return false;

                    var isF = false,
                        a = ids.split(" ");

                    for (var i = 0; i < a.length; i++) {
                        if (document.getElementById(a[i]) === node) isF = true;
                    }

                    if (isF) node.setAttribute("data-ws-bm-self-ref", "true");
                    return isF;
                };

                isDefTerm = function (ids) {
                    var isT = true,
                        a = ids.split(" ");

                    for (var i = 0; i < a.length; i++) {
                        var o = document.getElementById(a[i]);

                        if (o && o.nodeType === 1 && o.getAttribute("role") !== "term") {
                            o.setAttribute("data-ws-bm-dtr-missing", "true");
                            isT = false;
                        }
                    }
                    return isT;
                };

                for (var i = 0; i < nodes.length; i++) {
                    for (var j = 0; j < attrs.length; j++)
                        obj[attrs[j]] = nodes[i].getAttribute(attrs[j]) || null;
                    obj["node-name"] = nodes[i].nodeName.toLowerCase();
                    obj.tabindex = nodes[i].getAttribute("tabindex");
                    obj["input-type"] =
                        obj["node-name"] === "input" ? nodes[i].getAttribute("type") : null;

                    if (obj.role === "radio")
                        obj["role-nested"] = isNested(nodes[i], "radiogroup");
                    else if (obj.role === "tab")
                        obj["role-nested"] = isNested(nodes[i], "tablist");
                    else if (obj.role === "treeitem")
                        obj["role-nested"] = isNested(nodes[i], "tree");

                    isSelfRef(nodes[i], obj.role, obj["aria-labelledby"]);

                    if (obj.role === "definition" && obj["aria-labelledby"])
                        isDefTerm(obj["aria-labelledby"]);

                    if (
                        " input img progress ".indexOf(" " + obj["node-name"] + " ") !== -1
                    ) {
                        if (pNode !== nodes[i].parentNode) {
                            pNode = nodes[i].parentNode;

                            for (var a in obj) {
                                if (obj[a] || !isNaN(parseInt(obj[a])))
                                    pNode.setAttribute("data-ws-bm-" + a, obj[a]);
                                else pNode.removeAttribute("data-ws-bm-" + a);
                            }
                        }
                    }
                }

                focused = document.querySelectorAll("*[aria-describedby]:focus");

                if (focused.length) {
                    var dbs = focused[0].getAttribute("aria-describedby").split(" ");

                    for (var d = 0; d < dbs.length; d++) {
                        var t = document.getElementById(dbs[d]);

                        if (t && t.nodeType === 1)
                            t.setAttribute("data-ws-bm-db-match", dbs[d]);
                    }
                }

                focused = document.querySelectorAll("*[aria-activedescendant]:focus");
                var fO = null;

                if (focused.length)
                    fO = document.getElementById(
                        focused[0].getAttribute("aria-activedescendant")
                    );

                if (
                    (!focused.length ||
                        !fO ||
                        focused[0] !== activeObj ||
                        fO !== activeDObj) &&
                    activeDObj &&
                    activeDObj.nodeType === 1 &&
                    activeDObj.getAttribute("data-ws-bm-ad-match")
                ) {
                    activeDObj.removeAttribute("data-ws-bm-ad-match");
                    activeDObj.removeAttribute("data-ws-bm-ad-invalid");
                    activeDObj = null;
                }

                if (fO && fO.nodeType === 1) {
                    activeObj = focused[0];
                    activeDObj = fO;
                    var nn = fO.nodeName.toLowerCase(),
                        href = fO.getAttribute("href"),
                        rl = fO.getAttribute("role");

                    if (!rl && nn === "a" && href) rl = "link";
                    else if (!rl && nn === "button") rl = "button";
                    fO.setAttribute("data-ws-bm-ad-match", rl);

                    if (!rl) fO.setAttribute("data-ws-bm-ad-invalid", "true");
                }

                focusHidden = document.querySelectorAll('*[hidefocus="true"]');

                for (var h = 0; h < focusHidden.length; h++)
                    focusHidden[h].removeAttribute("hidefocus");

                frames = document.querySelectorAll("frame, iframe");

                for (var f = 0; f < frames.length; f++) {
                    try {
                        if (
                            frames[f].contentDocument &&
                            frames[f].contentDocument.head &&
                            !frames[f].contentDocument.WSBMInit
                        ) {
                            frames[f].contentDocument.WSBMInit = WSBMInit;
                            frames[f].contentDocument.WSBMInit(
                                false,
                                useOffline,
                                basePath,
                                msInterval,
                                frames[f].contentDocument
                            );
                        }
                    } catch (e) {}
                }

                var presentational = document.querySelectorAll(
                    '*[role="presentation"], *[role="none"]'
                );

                for (var p = 0; p < presentational.length; p++) {
                    var pO = presentational[p],
                        oR = pO.getAttribute("role"),
                        oN = pO.nodeName.toUpperCase(),
                        aN =
                        oR === "none" ? "data-ws-role-none" : "data-ws-role-presentation";

                    if (
                        " input textarea img progress ".indexOf(
                            " " + oN.toLowerCase() + " "
                        ) !== -1
                    )
                        pO.parentNode.setAttribute(aN, oN);
                    else pO.setAttribute(aN, oN);
                }
            }

            setTimeout(check, msInterval);
        };

        var checkNames = function () {
            if (window.getAccName && typeof window.getAccName === "function") {
                var accNames = document.querySelectorAll(
                    "a[href], area[href], article, aside, button, dialog, datalist, details, fieldset, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hr, iframe, img, input, ul, ol, li, main, math, menu, nav, output, progress, section, select, summary, table, th, textarea, *[role]"
                );

                for (var aN = 0; aN < accNames.length; aN++) {
                    window.getAccName(
                        accNames[aN],
                        function (props, node) {
                            if (
                                " datalist iframe img input progress select textarea ".indexOf(
                                    " " + node.nodeName.toLowerCase() + " "
                                ) !== -1
                            ) {
                                node.parentNode.setAttribute(
                                    "data-ws-bm-name-prop",
                                    props.name
                                );

                                node.parentNode.setAttribute(
                                    "data-ws-bm-desc-prop",
                                    props.desc
                                );
                            } else {
                                node.setAttribute("data-ws-bm-name-prop", props.name);

                                node.setAttribute("data-ws-bm-desc-prop", props.desc);
                            }
                        },
                        true
                    );
                }
            }

            setTimeout(checkNames, 5000);
        };

        setTimeout(checkNames, 5000);

        if (!useOffline) {
            loaded = {
                init: false,
                landmarks: false,
                structural: false,
                dialogs: false,
                liveRegions: false,
                simpleWidgets: false,
                comboboxListbox: false,
                menuMenubar: false,
                radiogroup: false,
                tablist: false,
                tree: false,
                treegridGridTable: false
            };

            var load = (function () {
                function _load() {
                    return function (url, id) {
                        return new Promise(function (resolve, reject) {
                            var t = document.createElement("link");
                            t.type = "text/css";
                            t.rel = "stylesheet";
                            t.id = id;
                            t.onload = function () {
                                resolve(url);
                            };
                            t.onerror = function () {
                                // reject(url);
                            };
                            t.href = url;
                            loader.cssLinks.push(t);
                            document.head.appendChild(t);
                        });
                    };
                }
                return {
                    css: _load()
                };
            })();

            var loadCSS = function (file, i) {
                if (!loader.cssLinks) loader.cssLinks = [];
                Promise.all([load.css(basePath + file, "ws-visual-aria-" + i)]);
            };
        }

        check();

        bind(document.body, "mousedown", function (ev) {
            if (ev.shiftKey && ev.ctrlKey) {
                var targ = null;

                if (ev.target) targ = ev.target;
                else if (ev.srcElement) targ = ev.srcElement;

                if (targ.nodeType === 3) targ = targ.parentNode;
                var getClosestRole = function (o) {
                    while (o) {
                        var r = o.getAttribute("role");

                        if (
                            r &&
                            " rowgroup row columnheader rowheader ".indexOf(" " + r + " ") ===
                            -1
                        ) {
                            if (r === "cell") r = "table";
                            else if (r === "gridcell") r = "grid";
                            else if (
                                r === "menuitem" ||
                                r === "menuitemcheckbox" ||
                                r === "menuitemradio"
                            )
                                r = "menu";
                            else if (r === "option") r = "listbox";
                            else if (r === "radio") r = "radiogroup";
                            else if (r === "tab" || r === "tabpanel") r = "tablist";
                            else if (r === "treeitem") r = "tree";
                            return r;
                        }
                        o = o.parentNode;
                    }
                    return "";
                };
                var role = getClosestRole(targ);
                window.VisualARIA.VisualARIAMatrices.href =
                    "http://whatsock.com/training/matrices/#" + role;
                window.VisualARIA.VisualARIAMatrices.click();
            }
        });

        (function () {
            var a = document.createElement("script");
            a.type = "text/javascript";
            a.async = true;
            //a.src = accNamePrototype;
            document.head.appendChild(a);
        })();
    };

    setTimeout(function () {
        WSBMInit(true, useOffline, basePath, msInterval, document);
    }, 3000);



    document.addEventListener('click', function (event) {
        if (!event.target.classList.contains('toggle-ws-bm-aria-matrices')) return;
        event.preventDefault();

        var content = document.getElementById("ws-bm-aria-matrices-lnk");
        if (!content) return;

        toggle(content);

    }, false);



})();
