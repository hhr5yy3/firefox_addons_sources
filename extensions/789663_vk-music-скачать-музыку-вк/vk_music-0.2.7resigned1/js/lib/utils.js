!function(global, factory) {
    if ("function" == typeof define && define.amd) {
        define([ "exports", "./ua" ], factory);
    } else if ("undefined" != typeof exports) {
        factory(exports, require("./ua"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.ua);
        global.utils = mod.exports;
    }
}(this, function(exports, _ua) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.getLoc = exports.ONE_DAY = exports.ONE_HOUR = exports.ONE_MINUTE = void 0;
    exports.rand = rand;
    exports.irand = function irand(mi, ma) {
        return Math.floor(rand(mi, ma));
    };
    exports.isUndefined = function isUndefined(obj) {
        return void 0 === obj;
    };
    exports.isFunction = isFunction;
    exports.isArray = function isArray(obj) {
        return "[object Array]" === Object.prototype.toString.call(obj);
    };
    exports.isString = isString;
    exports.isObject = isObject;
    exports.isEmpty = function isEmpty(o) {
        if ("[object Object]" !== Object.prototype.toString.call(o)) {
            return !1;
        }
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                return !1;
            }
        }
        return !0;
    };
    exports.Now = function Now() {
        return +new Date();
    };
    exports.newImage = function newImage() {
        return window.Image ? new Image() : ce("img");
    };
    exports.trim = trim;
    exports.stripHTML = function stripHTML(text) {
        return text ? text.replace(/<(?:.|\s)*?>/g, "") : "";
    };
    exports.escapeRE = function escapeRE(s) {
        return s ? s.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : "";
    };
    exports.intval = intval;
    exports.floatval = function floatval(value) {
        return !0 === value ? 1 : parseFloat(value) || 0;
    };
    exports.positive = function positive(value) {
        return (value = intval(value)) < 0 ? 0 : value;
    };
    exports.isNumeric = function isNumeric(value) {
        return !isNaN(value);
    };
    exports.replaceEntities = replaceEntities;
    exports.clean = function clean(str) {
        return str ? str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : "";
    };
    exports.eStr = function eStr(str) {
        var r = [], i = 0;
        each(str.split(""), function() {
            r.push(this.charCodeAt(0) - i), i = this.charCodeAt(0);
        });
        return r;
    };
    exports.dStr = function dStr(arr) {
        var r = "", i = 0;
        if (isString(arr)) {
            arr = arr.split(",");
        }
        each(arr, function() {
            i += Number(this), r += String.fromCharCode(i);
        });
        return r;
    };
    exports.stripTags = function stripTags(str) {
        return se("<div>" + str + "</div>").innerText.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'");
    };
    exports.unclean = function unclean(str) {
        return replaceEntities(str.replace(/\t/g, "\n"));
    };
    exports.ce = ce;
    exports.ge = ge;
    exports.geByTag = geByTag;
    exports.geByTag1 = function geByTag1(searchTag, node) {
        return (node = ge(node) || document).querySelector && node.querySelector(searchTag) || geByTag(searchTag, node)[0];
    };
    exports.geByClass = geByClass;
    exports.geByClass1 = geByClass1;
    exports.gpeByClass = gpeByClass;
    exports.domQuery = domQuery;
    exports.domQuery1 = function domQuery1(selector) {
        var parent = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
        return domQuery(selector, parent)[0];
    };
    exports.domReplaceEl = function domReplaceEl(oldEl, newEl) {
        if (isString(newEl)) {
            newEl = se(newEl);
        }
        domPN(oldEl).replaceChild(newEl, oldEl);
        return newEl;
    };
    exports.domEL = domEL;
    exports.domNS = domNS;
    exports.domPS = function domPS() {
        return domEL((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).previousSibling, 1);
    };
    exports.domFC = domFC;
    exports.domLC = function domLC() {
        return domEL((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).lastChild, 1);
    };
    exports.domPN = domPN;
    exports.domChildren = function domChildren(_ref) {
        var childNodes = _ref.childNodes;
        var chidlren = [];
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].tagName) {
                chidlren.push(childNodes[i]);
            }
        }
        return chidlren;
    };
    exports.domInsertBefore = function domInsertBefore(el, before) {
        var parent = domPN(before);
        return parent && parent.insertBefore(el, before);
    };
    exports.domInsertAfter = function domInsertAfter(el, after) {
        var parent = domPN(after);
        return parent && parent.insertBefore(el, domNS(after));
    };
    exports.domByClass = function domByClass(el, searchClass) {
        if (!el) {
            return el;
        }
        return geByClass1(searchClass, el);
    };
    exports.domClosest = function domClosest(className, elem) {
        if (hasClass(elem, className)) {
            return elem;
        }
        return gpeByClass(className, elem);
    };
    exports.domData = function domData(el, name, value) {
        if (!el) {
            return null;
        }
        if (void 0 !== value) {
            if (null === value) {
                el.removeAttribute("data-" + name);
            } else {
                el.setAttribute("data-" + name, value);
            }
            return value;
        } else {
            return el.getAttribute("data-" + name);
        }
    };
    exports.se = se;
    exports.isNode = function isNode(o) {
        return "object" === ("undefined" == typeof Node ? "undefined" : _typeof(Node)) ? o instanceof Node : o && "object" === (void 0 === o ? "undefined" : _typeof(o)) && "number" == typeof o.nodeType && "string" == typeof o.nodeName;
    };
    exports.isElement = function isElement(o) {
        return "object" === ("undefined" == typeof HTMLElement ? "undefined" : _typeof(HTMLElement)) ? o instanceof HTMLElement : o && "object" === (void 0 === o ? "undefined" : _typeof(o)) && null !== o && 1 === o.nodeType && "string" == typeof o.nodeName;
    };
    exports.hasClass = hasClass;
    exports.addClass = addClass;
    exports.addClassDelayed = addClassDelayed;
    exports.removeClass = removeClass;
    exports.removeClassDelayed = removeClassDelayed;
    exports.toggleClass = function toggleClass(obj, name, v) {
        if (void 0 === v) {
            v = !hasClass(obj, name);
        }
        (v ? addClass : removeClass)(obj, name);
        return v;
    };
    exports.toggleClassDelayed = function toggleClassDelayed(obj, name, v) {
        if (void 0 === v) {
            v = !hasClass(obj, name);
        }
        (v ? addClassDelayed : removeClassDelayed)(obj, name);
        return v;
    };
    exports.replaceClass = function replaceClass(obj, oldName, newName) {
        removeClass(obj, oldName);
        addClass(obj, newName);
    };
    exports.attr = attr;
    exports.removeAttr = function removeAttr(el) {
        for (var i = 0, l = arguments.length; i < l; ++i) {
            var n = arguments[i];
            if (void 0 === el[n]) {
                continue;
            }
            try {
                delete el[n];
            } catch (e) {
                try {
                    el.removeAttribute(n);
                } catch (e) {}
            }
        }
    };
    exports.each = each;
    exports.map = function map(object, callback) {
        if (!isObject(object) && void 0 !== object.length) {
            for (var i = 0, length = object.length; i < length; i++) {
                object[i] = callback.call(object[i], i, object[i]);
            }
        } else {
            for (var name in object) {
                if (!Object.prototype.hasOwnProperty.call(object, name)) {
                    continue;
                }
                object[name] = callback.call(object[name], name, object[name]);
            }
        }
        return object;
    };
    exports.indexOf = indexOf;
    exports.inArray = function inArray(value, arr) {
        return ~indexOf(arr, value);
    };
    exports.clone = function clone(obj, req) {
        var newObj = !isObject(obj) && void 0 !== obj.length ? [] : {};
        for (var i in obj) {
            if ((0, _ua.testUA)(/webkit/i) && ("layerX" == i || "layerY" == i || "webkitMovementX" == i || "webkitMovementY" == i)) {
                continue;
            }
            if (req && "object" === _typeof(obj[i]) && "prototype" !== i && null !== obj[i]) {
                newObj[i] = clone(obj[i]);
            } else {
                newObj[i] = obj[i];
            }
        }
        return newObj;
    };
    exports.arrayKeyDiff = function arrayKeyDiff(a) {
        var arr_dif = {}, argc = arguments.length, argv = arguments, key = void 0, found = void 0, i = void 0;
        for (key in a) {
            found = !1;
            for (i = 1; i < argc; i++) {
                if (argv[i][key] && argv[i][key] == a[key]) {
                    found = !0;
                }
            }
            if (!found) {
                arr_dif[key] = a[key];
            }
        }
        return arr_dif;
    };
    exports.objectDiff = function objectDiff(obj) {
        for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            objs[_key - 1] = arguments[_key];
        }
        var cb = objs[objs.length - 1] instanceof Function ? objs.pop() : function() {};
        each(obj, function(key, val) {
            var newVal = null;
            each(objs, function() {
                if (isObject(this) && this.hasOwnProperty(key) && this[key] !== val) {
                    newVal = this[key];
                }
            });
            null !== newVal && cb(key, newVal, val);
        });
    };
    exports.entries = entries;
    exports.extend = extend;
    exports.parseURL = parseURL;
    exports.isset = function isset(matches, url) {
        return !!matches.filter(function(match) {
            if (0 === match.indexOf("<") && match.indexOf(">") === match.length - 1) {
                var symbol = match.substr(1, match.length - 2);
                if ("all_urls" === symbol) {
                    return !0;
                }
                return ~url.host.indexOf(symbol);
            }
            var parsed = parseURL(match), result = [];
            for (var key in parsed) {
                var value = parsed[key];
                var piece = key in url ? url[key] : value;
                switch (key) {
                  case "host":
                    result.push(value === piece || 0 === value.indexOf("*.") && ~piece.indexOf(value.split("*.")[1]));
                    break;

                  case "path":
                    result.push("/*" === value || value === piece || value.indexOf("*") > 0 && ~piece.indexOf(value.split("*")[0]));
                }
                result.push(!0);
            }
            return result = !result.some(function(v) {
                return !1 === Boolean(v);
            });
        }).length;
    };
    exports.useHelper = function useHelper(onload) {
        var timeout = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e4;
        return new Promise(function(resolve, reject) {
            var timeoutTimer = setTimeout(reject, timeout);
            var img = ce("img", {
                class: "helper-data",
                src: chrome.runtime.getURL("icons/32.png")
            });
            attr(img, "onload", onload);
            img.addEventListener("load", function(e) {
                clearTimeout(timeoutTimer);
                try {
                    var data = attr(img, "data");
                    if (data) {
                        resolve(data);
                    } else {
                        resolve(null);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        });
    };
    exports.prepareParams = function prepareParams(params) {
        return entries(params).reduce(function(collect, _ref2) {
            var _ref3 = _slicedToArray(_ref2, 2), name = _ref3[0], value = _ref3[1];
            return collect.push(name + "=" + encodeURIComponent(value)), collect;
        }, []).join("&");
    };
    exports.cancelEvent = function cancelEvent() {
        var event = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.event;
        if (!event) {
            return !1;
        }
        for (;event.originalEvent; ) {
            event = event.originalEvent;
        }
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        if (event.stopImmediatePropagation) {
            event.stopImmediatePropagation();
        }
        event.cancelBubble = !0;
        event.returnValue = !1;
        return !1;
    };
    exports.stopEvent = function stopEvent() {
        var event = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.event;
        if (!event) {
            return !1;
        }
        for (;event.originalEvent; ) {
            event = event.originalEvent;
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        event.cancelBubble = !0;
        return !1;
    };
    exports.getStorage = getStorage;
    exports.storageGet = function storageGet(keys) {
        var type = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "sync";
        return new Promise(function(resolve) {
            getStorage(type).get(keys, resolve);
        });
    };
    exports.storageSet = function storageSet(obj) {
        var type = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "sync";
        return new Promise(function(resolve) {
            getStorage(type).set(obj, resolve);
        });
    };
    var _slicedToArray = function() {
        return function(arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return function sliceIterator(arr, i) {
                    var _arr = [];
                    var _n = !0;
                    var _d = !1;
                    var _e = void 0;
                    try {
                        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = !0) {
                            _arr.push(_s.value);
                            if (i && _arr.length === i) {
                                break;
                            }
                        }
                    } catch (err) {
                        _d = !0;
                        _e = err;
                    } finally {
                        try {
                            if (!_n && _i.return) {
                                _i.return();
                            }
                        } finally {
                            if (_d) {
                                throw _e;
                            }
                        }
                    }
                    return _arr;
                }(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();
    var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var ONE_MINUTE = exports.ONE_MINUTE = 6e4;
    var ONE_HOUR = exports.ONE_HOUR = 60 * ONE_MINUTE;
    exports.ONE_DAY = 24 * ONE_HOUR;
    Function.prototype.pbind = function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(window);
        return this.bind.apply(this, args);
    };
    Function.prototype.rpbind = function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(window);
        return this.rbind.apply(this, args);
    };
    Function.prototype.rbind = function() {
        var _arguments = arguments;
        var func = this;
        var args = Array.prototype.slice.call(arguments);
        var obj = args.shift();
        var result = args.shift();
        return function() {
            var curArgs = Array.prototype.slice.call(_arguments);
            func.apply(obj, args.concat(curArgs));
            return result;
        };
    };
    if (!Function.prototype.bind) {
        Function.prototype.bind = function() {
            var _arguments2 = arguments;
            var func = this, args = Array.prototype.slice.call(arguments);
            var obj = args.shift();
            return function() {
                var curArgs = Array.prototype.slice.call(_arguments2);
                return func.apply(obj, args.concat(curArgs));
            };
        };
    }
    function rand(mi, ma) {
        return Math.random() * (ma - mi + 1) + mi;
    }
    function isFunction(obj) {
        return obj && "[object Function]" === Object.prototype.toString.call(obj);
    }
    function isString(obj) {
        return "string" == typeof obj;
    }
    function isObject(obj) {
        return "[object Object]" === Object.prototype.toString.call(obj);
    }
    function trim(text) {
        return (text || "").replace(/^\s+|\s+$/g, "");
    }
    function intval(value) {
        return !0 === value ? 1 : parseInt(value) || 0;
    }
    function replaceEntities(str) {
        return se("<textarea>" + (str || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;") + "</textarea>").value;
    }
    function ce(tagName, attr, style) {
        var el = document.createElement(tagName);
        if (attr) {
            extend(el, attr);
        }
        return el;
    }
    function ge(el) {
        return "string" == typeof el || "number" == typeof el ? document.getElementById(el) : el;
    }
    function geByTag(searchTag, node) {
        return (node = ge(node) || document).getElementsByTagName(searchTag);
    }
    function geByClass(searchClass, node, tag) {
        node = ge(node) || document;
        tag = tag || "*";
        var classElements = [];
        if (node.querySelectorAll && "*" !== tag) {
            return node.querySelectorAll(tag + "." + searchClass);
        }
        if (node.getElementsByClassName) {
            var nodes = node.getElementsByClassName(searchClass);
            if ("*" !== tag) {
                tag = tag.toUpperCase();
                for (var i = 0, l = nodes.length; i < l; ++i) {
                    if (nodes[i].tagName.toUpperCase() === tag) {
                        classElements.push(nodes[i]);
                    }
                }
            } else {
                classElements = Array.prototype.slice.call(nodes);
            }
            return classElements;
        }
        var els = geByTag(tag, node);
        var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
        for (var _i = 0, _l = els.length; _i < _l; ++_i) {
            if (pattern.test(els[_i].className)) {
                classElements.push(els[_i]);
            }
        }
        return classElements;
    }
    function geByClass1(searchClass) {
        var node = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document;
        var tag = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "*";
        return (node = ge(node)).querySelector && node.querySelector(tag + "." + searchClass) || geByClass(searchClass, node, tag)[0];
    }
    function gpeByClass(className, elem, stopElement) {
        if (!(elem = ge(elem))) {
            return null;
        }
        for (;stopElement !== elem && (elem = elem.parentNode); ) {
            if (hasClass(elem, className)) {
                return elem;
            }
        }
        return null;
    }
    function domQuery(selectors) {
        return (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document).querySelectorAll(selectors);
    }
    function domEL(el, p) {
        p = p ? "previousSibling" : "nextSibling";
        for (;el && !el.tagName; ) {
            el = el[p];
        }
        return el;
    }
    function domNS() {
        return domEL((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).nextSibling);
    }
    function domFC() {
        return domEL((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).firstChild);
    }
    function domPN() {
        return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).parentNode;
    }
    function se(html) {
        return domFC(ce("div", {
            innerHTML: html
        }));
    }
    function hasClass(obj, name) {
        return (obj = ge(obj)) && 1 === obj.nodeType && ~(" " + obj.className + " ").replace(/[\t\r\n\f]/g, " ").indexOf(" " + name + " ");
    }
    function addClass(obj, name) {
        if ((obj = ge(obj)) && !hasClass(obj, name)) {
            obj.className = (obj.className ? obj.className + " " : "") + name;
        }
    }
    function addClassDelayed(obj, name) {
        return setTimeout(addClass.pbind(obj, name), 0);
    }
    function removeClass(obj, name) {
        if (obj = ge(obj)) {
            obj.className = trim((obj.className || "").replace(new RegExp("(\\s|^)" + name + "(\\s|$)"), " "));
        }
    }
    function removeClassDelayed(obj, name) {
        return setTimeout(removeClass.pbind(obj, name), 0);
    }
    function attr(el, attrName, value) {
        el = ge(el);
        if (void 0 === value) {
            return el.getAttribute(attrName);
        } else {
            el.setAttribute(attrName, value);
            return value;
        }
    }
    function each(object, callback) {
        if (!isObject(object) && void 0 !== object.length) {
            for (var i = 0, length = object.length; i < length; i++) {
                var value = object[i];
                if (!1 === callback.call(value, i, value)) {
                    break;
                }
            }
        } else {
            for (var name in object) {
                if (!Object.prototype.hasOwnProperty.call(object, name)) {
                    continue;
                }
                if (!1 === callback.call(object[name], name, object[name])) {
                    break;
                }
            }
        }
        return object;
    }
    function indexOf(arr, value, from) {
        for (var i = from || 0, l = (arr || []).length; i < l; i++) {
            if (arr[i] == value) {
                return i;
            }
        }
        return -1;
    }
    function entries(object) {
        var collect = [];
        each(object, function(key, value) {
            return collect.push([ key, value ]);
        });
        return collect;
    }
    function extend() {
        var a = arguments, target = a[0] || {}, i = 1, l = a.length, deep = !1, options = void 0;
        if ("boolean" == typeof target) {
            deep = target;
            target = a[1] || {};
            i = 2;
        }
        if ("object" !== (void 0 === target ? "undefined" : _typeof(target)) && !isFunction(target)) {
            target = {};
        }
        for (;i < l; ++i) {
            if (null != (options = a[i])) {
                for (var name in options) {
                    var src = target[name], copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && copy && "object" === (void 0 === copy ? "undefined" : _typeof(copy)) && !copy.nodeType) {
                        target[name] = extend(deep, src || (null != copy.length ? [] : {}), copy);
                    } else if (void 0 !== copy) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    }
    function parseURL(str) {
        var o = {
            strictMode: !1,
            key: [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ],
            q: {
                name: "queryKey",
                parser: /(?:^|&)([^&=]*)=?([^&]*)/g
            },
            parser: {
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            }
        };
        var m = o.parser[o.strictMode ? "strict" : "loose"].exec(str), uri = {}, i = 14;
        for (;i--; ) {
            uri[o.key[i]] = m[i] || "";
        }
        var retArr = {};
        if ("" !== uri.protocol) {
            retArr.scheme = uri.protocol;
        }
        if ("" !== uri.host) {
            retArr.host = uri.host;
        }
        if ("" !== uri.port) {
            retArr.port = uri.port;
        }
        if ("" !== uri.user) {
            retArr.user = uri.user;
        }
        if ("" !== uri.password) {
            retArr.pass = uri.password;
        }
        if ("" !== uri.path) {
            retArr.path = uri.path;
        }
        if ("" !== uri.query) {
            retArr.query = uri.query;
        }
        if ("" !== uri.anchor) {
            retArr.fragment = uri.anchor;
        }
        return retArr;
    }
    exports.getLoc = function getLoc() {
        var loc = {};
        each(document.location, function(key, value) {
            if ("string" == typeof value) {
                loc[key] = value;
            }
        });
        return loc;
    };
    function getStorage() {
        arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return chrome.storage.sync || chrome.storage.local;
    }
});