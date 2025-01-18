/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 729:
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ 679:
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ 296);

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ 103:
/*!***************************************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/cjs/react-is.production.min.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;
exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isAsyncMode=function(a){return A(a)||z(a)===l};exports.isConcurrentMode=A;exports.isContextConsumer=function(a){return z(a)===k};exports.isContextProvider=function(a){return z(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return z(a)===n};exports.isFragment=function(a){return z(a)===e};exports.isLazy=function(a){return z(a)===t};
exports.isMemo=function(a){return z(a)===r};exports.isPortal=function(a){return z(a)===d};exports.isProfiler=function(a){return z(a)===g};exports.isStrictMode=function(a){return z(a)===f};exports.isSuspense=function(a){return z(a)===p};
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};exports.typeOf=z;


/***/ }),

/***/ 296:
/*!*****************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/node_modules/react-is/index.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(/*! ./cjs/react-is.production.min.js */ 103);
} else {}


/***/ }),

/***/ 448:
/*!****************************************************************!*\
  !*** ./node_modules/react-dom/cjs/react-dom.production.min.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(/*! react */ 294),ca=__webpack_require__(/*! scheduler */ 840);function p(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var da=new Set,ea={};function fa(a,b){ha(a,b);ha(a+"Capture",b)}
function ha(a,b){ea[a]=b;for(a=0;a<b.length;a++)da.add(b[a])}
var ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ja=Object.prototype.hasOwnProperty,ka=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,la=
{},ma={};function oa(a){if(ja.call(ma,a))return!0;if(ja.call(la,a))return!1;if(ka.test(a))return ma[a]=!0;la[a]=!0;return!1}function pa(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function qa(a,b,c,d){if(null===b||"undefined"===typeof b||pa(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function v(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}var z={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){z[a]=new v(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];z[b]=new v(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){z[a]=new v(a,2,!1,a.toLowerCase(),null,!1,!1)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){z[a]=new v(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){z[a]=new v(a,3,!1,a.toLowerCase(),null,!1,!1)});
["checked","multiple","muted","selected"].forEach(function(a){z[a]=new v(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){z[a]=new v(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){z[a]=new v(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){z[a]=new v(a,5,!1,a.toLowerCase(),null,!1,!1)});var ra=/[\-:]([a-z])/g;function sa(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(ra,
sa);z[b]=new v(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!1,!1)});
z.xlinkHref=new v("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!0,!0)});
function ta(a,b,c,d){var e=z.hasOwnProperty(b)?z[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])qa(b,c,e,d)&&(c=null),d||null===e?oa(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)))}
var ua=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,va=Symbol.for("react.element"),wa=Symbol.for("react.portal"),ya=Symbol.for("react.fragment"),za=Symbol.for("react.strict_mode"),Aa=Symbol.for("react.profiler"),Ba=Symbol.for("react.provider"),Ca=Symbol.for("react.context"),Da=Symbol.for("react.forward_ref"),Ea=Symbol.for("react.suspense"),Fa=Symbol.for("react.suspense_list"),Ga=Symbol.for("react.memo"),Ha=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");
var Ia=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var Ja=Symbol.iterator;function Ka(a){if(null===a||"object"!==typeof a)return null;a=Ja&&a[Ja]||a["@@iterator"];return"function"===typeof a?a:null}var A=Object.assign,La;function Ma(a){if(void 0===La)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);La=b&&b[1]||""}return"\n"+La+a}var Na=!1;
function Oa(a,b){if(!a||Na)return"";Na=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(l){var d=l}Reflect.construct(a,[],b)}else{try{b.call()}catch(l){d=l}a.call(b.prototype)}else{try{throw Error();}catch(l){d=l}a()}}catch(l){if(l&&d&&"string"===typeof l.stack){for(var e=l.stack.split("\n"),
f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{Na=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?Ma(a):""}
function Pa(a){switch(a.tag){case 5:return Ma(a.type);case 16:return Ma("Lazy");case 13:return Ma("Suspense");case 19:return Ma("SuspenseList");case 0:case 2:case 15:return a=Oa(a.type,!1),a;case 11:return a=Oa(a.type.render,!1),a;case 1:return a=Oa(a.type,!0),a;default:return""}}
function Qa(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ya:return"Fragment";case wa:return"Portal";case Aa:return"Profiler";case za:return"StrictMode";case Ea:return"Suspense";case Fa:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case Ca:return(a.displayName||"Context")+".Consumer";case Ba:return(a._context.displayName||"Context")+".Provider";case Da:var b=a.render;a=a.displayName;a||(a=b.displayName||
b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case Ga:return b=a.displayName||null,null!==b?b:Qa(a.type)||"Memo";case Ha:b=a._payload;a=a._init;try{return Qa(a(b))}catch(c){}}return null}
function Ra(a){var b=a.type;switch(a.tag){case 24:return"Cache";case 9:return(b.displayName||"Context")+".Consumer";case 10:return(b._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return b;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Qa(b);case 8:return b===za?"StrictMode":"Mode";case 22:return"Offscreen";
case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return""}}
function Ta(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a))}function Wa(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
function Ya(a,b){var c=b.checked;return A({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function ab(a,b){b=b.checked;null!=b&&ta(a,"checked",b,!1)}
function bb(a,b){ab(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?cb(a,b.type,c):b.hasOwnProperty("defaultValue")&&cb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function db(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
function cb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}var eb=Array.isArray;
function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(p(91));return A({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(p(92));if(eb(c)){if(1<c.length)throw Error(p(93));c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Sa(c)}}
function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}function kb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
function lb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?kb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var mb,nb=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else{mb=mb||document.createElement("div");mb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=mb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function ob(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var pb={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,
zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qb=["Webkit","ms","Moz","O"];Object.keys(pb).forEach(function(a){qb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);pb[b]=pb[a]})});function rb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||pb.hasOwnProperty(a)&&pb[a]?(""+b).trim():b+"px"}
function sb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var tb=A({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function ub(a,b){if(b){if(tb[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(p(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(p(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(p(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(p(62));}}
function vb(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var wb=null;function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(p(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b))}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a])}}function Gb(a,b){return a(b)}function Hb(){}var Ib=!1;function Jb(a,b,c){if(Ib)return a(b,c);Ib=!0;try{return Gb(a,b,c)}finally{if(Ib=!1,null!==zb||null!==Ab)Hb(),Fb()}}
function Kb(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==
typeof c)throw Error(p(231,b,typeof c));return c}var Lb=!1;if(ia)try{var Mb={};Object.defineProperty(Mb,"passive",{get:function(){Lb=!0}});window.addEventListener("test",Mb,Mb);window.removeEventListener("test",Mb,Mb)}catch(a){Lb=!1}function Nb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(m){this.onError(m)}}var Ob=!1,Pb=null,Qb=!1,Rb=null,Sb={onError:function(a){Ob=!0;Pb=a}};function Tb(a,b,c,d,e,f,g,h,k){Ob=!1;Pb=null;Nb.apply(Sb,arguments)}
function Ub(a,b,c,d,e,f,g,h,k){Tb.apply(this,arguments);if(Ob){if(Ob){var l=Pb;Ob=!1;Pb=null}else throw Error(p(198));Qb||(Qb=!0,Rb=l)}}function Vb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function Wb(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Xb(a){if(Vb(a)!==a)throw Error(p(188));}
function Yb(a){var b=a.alternate;if(!b){b=Vb(a);if(null===b)throw Error(p(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Xb(e),a;if(f===d)return Xb(e),b;f=f.sibling}throw Error(p(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(p(189));}}if(c.alternate!==d)throw Error(p(190));}if(3!==c.tag)throw Error(p(188));return c.stateNode.current===c?a:b}function Zb(a){a=Yb(a);return null!==a?$b(a):null}function $b(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=$b(a);if(null!==b)return b;a=a.sibling}return null}
var ac=ca.unstable_scheduleCallback,bc=ca.unstable_cancelCallback,cc=ca.unstable_shouldYield,dc=ca.unstable_requestPaint,B=ca.unstable_now,ec=ca.unstable_getCurrentPriorityLevel,fc=ca.unstable_ImmediatePriority,gc=ca.unstable_UserBlockingPriority,hc=ca.unstable_NormalPriority,ic=ca.unstable_LowPriority,jc=ca.unstable_IdlePriority,kc=null,lc=null;function mc(a){if(lc&&"function"===typeof lc.onCommitFiberRoot)try{lc.onCommitFiberRoot(kc,a,void 0,128===(a.current.flags&128))}catch(b){}}
var oc=Math.clz32?Math.clz32:nc,pc=Math.log,qc=Math.LN2;function nc(a){a>>>=0;return 0===a?32:31-(pc(a)/qc|0)|0}var rc=64,sc=4194304;
function tc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;
default:return a}}function uc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=tc(h):(f&=g,0!==f&&(d=tc(f)))}else g=c&~e,0!==g?d=tc(g):0!==f&&(d=tc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-oc(b),e=1<<c,d|=a[c],b&=~e;return d}
function vc(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}
function wc(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-oc(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=vc(h,b)}else k<=b&&(a.expiredLanes|=h);f&=~h}}function xc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function yc(){var a=rc;rc<<=1;0===(rc&4194240)&&(rc=64);return a}function zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
function Ac(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-oc(b);a[b]=c}function Bc(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-oc(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f}}
function Cc(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-oc(c),e=1<<d;e&b|a[d]&b&&(a[d]|=b);c&=~e}}var C=0;function Dc(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}var Ec,Fc,Gc,Hc,Ic,Jc=!1,Kc=[],Lc=null,Mc=null,Nc=null,Oc=new Map,Pc=new Map,Qc=[],Rc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a,b){switch(a){case "focusin":case "focusout":Lc=null;break;case "dragenter":case "dragleave":Mc=null;break;case "mouseover":case "mouseout":Nc=null;break;case "pointerover":case "pointerout":Oc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":Pc.delete(b.pointerId)}}
function Tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,nativeEvent:f,targetContainers:[e]},null!==b&&(b=Cb(b),null!==b&&Fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
function Uc(a,b,c,d,e){switch(b){case "focusin":return Lc=Tc(Lc,a,b,c,d,e),!0;case "dragenter":return Mc=Tc(Mc,a,b,c,d,e),!0;case "mouseover":return Nc=Tc(Nc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;Oc.set(f,Tc(Oc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,Pc.set(f,Tc(Pc.get(f)||null,a,b,c,d,e)),!0}return!1}
function Vc(a){var b=Wc(a.target);if(null!==b){var c=Vb(b);if(null!==c)if(b=c.tag,13===b){if(b=Wb(c),null!==b){a.blockedOn=b;Ic(a.priority,function(){Gc(c)});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}
function Xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=Yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;var d=new c.constructor(c.type,c);wb=d;c.target.dispatchEvent(d);wb=null}else return b=Cb(c),null!==b&&Fc(b),a.blockedOn=c,!1;b.shift()}return!0}function Zc(a,b,c){Xc(a)&&c.delete(b)}function $c(){Jc=!1;null!==Lc&&Xc(Lc)&&(Lc=null);null!==Mc&&Xc(Mc)&&(Mc=null);null!==Nc&&Xc(Nc)&&(Nc=null);Oc.forEach(Zc);Pc.forEach(Zc)}
function ad(a,b){a.blockedOn===b&&(a.blockedOn=null,Jc||(Jc=!0,ca.unstable_scheduleCallback(ca.unstable_NormalPriority,$c)))}
function bd(a){function b(b){return ad(b,a)}if(0<Kc.length){ad(Kc[0],a);for(var c=1;c<Kc.length;c++){var d=Kc[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==Lc&&ad(Lc,a);null!==Mc&&ad(Mc,a);null!==Nc&&ad(Nc,a);Oc.forEach(b);Pc.forEach(b);for(c=0;c<Qc.length;c++)d=Qc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<Qc.length&&(c=Qc[0],null===c.blockedOn);)Vc(c),null===c.blockedOn&&Qc.shift()}var cd=ua.ReactCurrentBatchConfig,dd=!0;
function ed(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=1,fd(a,b,c,d)}finally{C=e,cd.transition=f}}function gd(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=4,fd(a,b,c,d)}finally{C=e,cd.transition=f}}
function fd(a,b,c,d){if(dd){var e=Yc(a,b,c,d);if(null===e)hd(a,b,d,id,c),Sc(a,d);else if(Uc(e,a,b,c,d))d.stopPropagation();else if(Sc(a,d),b&4&&-1<Rc.indexOf(a)){for(;null!==e;){var f=Cb(e);null!==f&&Ec(f);f=Yc(a,b,c,d);null===f&&hd(a,b,d,id,c);if(f===e)break;e=f}null!==e&&d.stopPropagation()}else hd(a,b,d,null,c)}}var id=null;
function Yc(a,b,c,d){id=null;a=xb(d);a=Wc(a);if(null!==a)if(b=Vb(a),null===b)a=null;else if(c=b.tag,13===c){a=Wb(b);if(null!==a)return a;a=null}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===b.tag?b.stateNode.containerInfo:null;a=null}else b!==a&&(a=null);id=a;return null}
function jd(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;
case "message":switch(ec()){case fc:return 1;case gc:return 4;case hc:case ic:return 16;case jc:return 536870912;default:return 16}default:return 16}}var kd=null,ld=null,md=null;function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}
function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return!0}function qd(){return!1}
function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}A(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
(a.returnValue=!1),this.isDefaultPrevented=pd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd)},persist:function(){},isPersistent:pd});return b}
var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=A({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=A({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return"movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=A({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=A({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=A({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=A({},sd,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=A({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
var Qd=A({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return"keypress"===a.type?od(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=A({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=A({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=A({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=A({},Ad,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=ia&&"CompositionEvent"in window,be=null;ia&&"documentMode"in document&&(be=document.documentMode);var ce=ia&&"TextEvent"in window&&!be,de=ia&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
function ge(a,b){switch(a){case "keyup":return-1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function he(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
function ke(a,b){if(ie)return"compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}))}var pe=null,qe=null;function re(a){se(a,0)}function te(a){var b=ue(a);if(Wa(b))return a}
function ve(a,b){if("change"===a)return b}var we=!1;if(ia){var xe;if(ia){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput}xe=ye}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode)}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null)}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));Jb(re,b)}}
function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae()}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge;
function Ie(a,b){if(He(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var e=c[d];if(!ja.call(b,e)||!He(a[e],b[e]))return!1}return!0}function Je(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Ke(a,b){var c=Je(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Je(c)}}function Le(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Le(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
function Me(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=Xa(a.document)}return b}function Ne(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
function Oe(a){var b=Me(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&Le(c.ownerDocument.documentElement,c)){if(null!==d&&Ne(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=Ke(c,f);var g=Ke(c,
d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),a.addRange(b)))}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}
var Pe=ia&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Ne(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Ie(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)))}
function Ve(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var We={animationend:Ve("Animation","AnimationEnd"),animationiteration:Ve("Animation","AnimationIteration"),animationstart:Ve("Animation","AnimationStart"),transitionend:Ve("Transition","TransitionEnd")},Xe={},Ye={};
ia&&(Ye=document.createElement("div").style,"AnimationEvent"in window||(delete We.animationend.animation,delete We.animationiteration.animation,delete We.animationstart.animation),"TransitionEvent"in window||delete We.transitionend.transition);function Ze(a){if(Xe[a])return Xe[a];if(!We[a])return a;var b=We[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Ye)return Xe[a]=b[c];return a}var $e=Ze("animationend"),af=Ze("animationiteration"),bf=Ze("animationstart"),cf=Ze("transitionend"),df=new Map,ef="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a,b){df.set(a,b);fa(b,[a])}for(var gf=0;gf<ef.length;gf++){var hf=ef[gf],jf=hf.toLowerCase(),kf=hf[0].toUpperCase()+hf.slice(1);ff(jf,"on"+kf)}ff($e,"onAnimationEnd");ff(af,"onAnimationIteration");ff(bf,"onAnimationStart");ff("dblclick","onDoubleClick");ff("focusin","onFocus");ff("focusout","onBlur");ff(cf,"onTransitionEnd");ha("onMouseEnter",["mouseout","mouseover"]);ha("onMouseLeave",["mouseout","mouseover"]);ha("onPointerEnter",["pointerout","pointerover"]);
ha("onPointerLeave",["pointerout","pointerover"]);fa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fa("onBeforeInput",["compositionend","keypress","textInput","paste"]);fa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lf="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mf=new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Ub(d,b,void 0,a);a.currentTarget=null}
function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k}}}if(Qb)throw a=Rb,Qb=!1,Rb=null,a;}
function D(a,b){var c=b[of];void 0===c&&(c=b[of]=new Set);var d=a+"__bubble";c.has(d)||(pf(b,a,2,!1),c.add(d))}function qf(a,b,c){var d=0;b&&(d|=4);pf(c,a,d,b)}var rf="_reactListening"+Math.random().toString(36).slice(2);function sf(a){if(!a[rf]){a[rf]=!0;da.forEach(function(b){"selectionchange"!==b&&(mf.has(b)||qf(b,!1,a),qf(b,!0,a))});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[rf]||(b[rf]=!0,qf("selectionchange",!1,b))}}
function pf(a,b,c,d){switch(jd(b)){case 1:var e=ed;break;case 4:e=gd;break;default:e=fd}c=e.bind(null,b,c,a);e=void 0;!Lb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}
function hd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=Wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}Jb(function(){var d=f,e=xb(c),g=[];
a:{var h=df.get(a);if(void 0!==h){var k=td,n=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":n="focus";k=Fd;break;case "focusout":n="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case $e:case af:case bf:k=Hd;break;case cf:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td}var t=0!==(b&4),J=!t&&"scroll"===a,x=t?null!==h?h+"Capture":null:h;t=[];for(var w=d,u;null!==
w;){u=w;var F=u.stateNode;5===u.tag&&null!==F&&(u=F,null!==x&&(F=Kb(w,x),null!=F&&t.push(tf(w,F,u))));if(J)break;w=w.return}0<t.length&&(h=new k(h,n,null,c,e),g.push({event:h,listeners:t}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&c!==wb&&(n=c.relatedTarget||c.fromElement)&&(Wc(n)||n[uf]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(n=c.relatedTarget||c.toElement,k=d,n=n?Wc(n):null,null!==
n&&(J=Vb(n),n!==J||5!==n.tag&&6!==n.tag))n=null}else k=null,n=d;if(k!==n){t=Bd;F="onMouseLeave";x="onMouseEnter";w="mouse";if("pointerout"===a||"pointerover"===a)t=Td,F="onPointerLeave",x="onPointerEnter",w="pointer";J=null==k?h:ue(k);u=null==n?h:ue(n);h=new t(F,w+"leave",k,c,e);h.target=J;h.relatedTarget=u;F=null;Wc(e)===d&&(t=new t(x,w+"enter",n,c,e),t.target=u,t.relatedTarget=J,F=t);J=F;if(k&&n)b:{t=k;x=n;w=0;for(u=t;u;u=vf(u))w++;u=0;for(F=x;F;F=vf(F))u++;for(;0<w-u;)t=vf(t),w--;for(;0<u-w;)x=
vf(x),u--;for(;w--;){if(t===x||null!==x&&t===x.alternate)break b;t=vf(t);x=vf(x)}t=null}else t=null;null!==k&&wf(g,h,k,t,!1);null!==n&&null!==J&&wf(g,J,n,t,!0)}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var na=ve;else if(me(h))if(we)na=Fe;else{na=De;var xa=Ce}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(na=Ee);if(na&&(na=na(a,d))){ne(g,na,c,e);break a}xa&&xa(a,h,d);"focusout"===a&&(xa=h._wrapperState)&&
xa.controlled&&"number"===h.type&&cb(h,"number",h.value)}xa=d?ue(d):window;switch(a){case "focusin":if(me(xa)||"true"===xa.contentEditable)Qe=xa,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e)}var $a;if(ae)b:{switch(a){case "compositionstart":var ba="onCompositionStart";break b;case "compositionend":ba="onCompositionEnd";
break b;case "compositionupdate":ba="onCompositionUpdate";break b}ba=void 0}else ie?ge(a,c)&&(ba="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(ba="onCompositionStart");ba&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==ba?"onCompositionEnd"===ba&&ie&&($a=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),xa=oe(d,ba),0<xa.length&&(ba=new Ld(ba,a,null,c,e),g.push({event:ba,listeners:xa}),$a?ba.data=$a:($a=he(c),null!==$a&&(ba.data=$a))));if($a=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),
0<d.length&&(e=new Ld("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=$a)}se(g,b)})}function tf(a,b,c){return{instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Kb(a,c),null!=f&&d.unshift(tf(a,f,e)),f=Kb(a,b),null!=f&&d.push(tf(a,f,e)));a=a.return}return d}function vf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
function wf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Kb(c,f),null!=k&&g.unshift(tf(c,k,h))):e||(k=Kb(c,f),null!=k&&g.push(tf(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}var xf=/\r\n?/g,yf=/\u0000|\uFFFD/g;function zf(a){return("string"===typeof a?a:""+a).replace(xf,"\n").replace(yf,"")}function Af(a,b,c){b=zf(b);if(zf(a)!==b&&c)throw Error(p(425));}function Bf(){}
var Cf=null,Df=null;function Ef(a,b){return"textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}
var Ff="function"===typeof setTimeout?setTimeout:void 0,Gf="function"===typeof clearTimeout?clearTimeout:void 0,Hf="function"===typeof Promise?Promise:void 0,Jf="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof Hf?function(a){return Hf.resolve(null).then(a).catch(If)}:Ff;function If(a){setTimeout(function(){throw a;})}
function Kf(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=e.data,"/$"===c){if(0===d){a.removeChild(e);bd(b);return}d--}else"$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e}while(c);bd(b)}function Lf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}
function Mf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}var Nf=Math.random().toString(36).slice(2),Of="__reactFiber$"+Nf,Pf="__reactProps$"+Nf,uf="__reactContainer$"+Nf,of="__reactEvents$"+Nf,Qf="__reactListeners$"+Nf,Rf="__reactHandles$"+Nf;
function Wc(a){var b=a[Of];if(b)return b;for(var c=a.parentNode;c;){if(b=c[uf]||c[Of]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=Mf(a);null!==a;){if(c=a[Of])return c;a=Mf(a)}return b}a=c;c=a.parentNode}return null}function Cb(a){a=a[Of]||a[uf];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(p(33));}function Db(a){return a[Pf]||null}var Sf=[],Tf=-1;function Uf(a){return{current:a}}
function E(a){0>Tf||(a.current=Sf[Tf],Sf[Tf]=null,Tf--)}function G(a,b){Tf++;Sf[Tf]=a.current;a.current=b}var Vf={},H=Uf(Vf),Wf=Uf(!1),Xf=Vf;function Yf(a,b){var c=a.type.contextTypes;if(!c)return Vf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}
function Zf(a){a=a.childContextTypes;return null!==a&&void 0!==a}function $f(){E(Wf);E(H)}function ag(a,b,c){if(H.current!==Vf)throw Error(p(168));G(H,b);G(Wf,c)}function bg(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(p(108,Ra(a)||"Unknown",e));return A({},c,d)}
function cg(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Vf;Xf=H.current;G(H,a);G(Wf,Wf.current);return!0}function dg(a,b,c){var d=a.stateNode;if(!d)throw Error(p(169));c?(a=bg(a,b,Xf),d.__reactInternalMemoizedMergedChildContext=a,E(Wf),E(H),G(H,a)):E(Wf);G(Wf,c)}var eg=null,fg=!1,gg=!1;function hg(a){null===eg?eg=[a]:eg.push(a)}function ig(a){fg=!0;hg(a)}
function jg(){if(!gg&&null!==eg){gg=!0;var a=0,b=C;try{var c=eg;for(C=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}eg=null;fg=!1}catch(e){throw null!==eg&&(eg=eg.slice(a+1)),ac(fc,jg),e;}finally{C=b,gg=!1}}return null}var kg=[],lg=0,mg=null,ng=0,og=[],pg=0,qg=null,rg=1,sg="";function tg(a,b){kg[lg++]=ng;kg[lg++]=mg;mg=a;ng=b}
function ug(a,b,c){og[pg++]=rg;og[pg++]=sg;og[pg++]=qg;qg=a;var d=rg;a=sg;var e=32-oc(d)-1;d&=~(1<<e);c+=1;var f=32-oc(b)+e;if(30<f){var g=e-e%5;f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;rg=1<<32-oc(b)+e|c<<e|d;sg=f+a}else rg=1<<f|c<<e|d,sg=a}function vg(a){null!==a.return&&(tg(a,1),ug(a,1,0))}function wg(a){for(;a===mg;)mg=kg[--lg],kg[lg]=null,ng=kg[--lg],kg[lg]=null;for(;a===qg;)qg=og[--pg],og[pg]=null,sg=og[--pg],og[pg]=null,rg=og[--pg],og[pg]=null}var xg=null,yg=null,I=!1,zg=null;
function Ag(a,b){var c=Bg(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c)}
function Cg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,xg=a,yg=Lf(b.firstChild),!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,xg=a,yg=null,!0):!1;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==qg?{id:rg,overflow:sg}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=Bg(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,xg=a,yg=
null,!0):!1;default:return!1}}function Dg(a){return 0!==(a.mode&1)&&0===(a.flags&128)}function Eg(a){if(I){var b=yg;if(b){var c=b;if(!Cg(a,b)){if(Dg(a))throw Error(p(418));b=Lf(c.nextSibling);var d=xg;b&&Cg(a,b)?Ag(d,c):(a.flags=a.flags&-4097|2,I=!1,xg=a)}}else{if(Dg(a))throw Error(p(418));a.flags=a.flags&-4097|2;I=!1;xg=a}}}function Fg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;xg=a}
function Gg(a){if(a!==xg)return!1;if(!I)return Fg(a),I=!0,!1;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Ef(a.type,a.memoizedProps));if(b&&(b=yg)){if(Dg(a))throw Hg(),Error(p(418));for(;b;)Ag(a,b),b=Lf(b.nextSibling)}Fg(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(p(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){yg=Lf(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}yg=
null}}else yg=xg?Lf(a.stateNode.nextSibling):null;return!0}function Hg(){for(var a=yg;a;)a=Lf(a.nextSibling)}function Ig(){yg=xg=null;I=!1}function Jg(a){null===zg?zg=[a]:zg.push(a)}var Kg=ua.ReactCurrentBatchConfig;function Lg(a,b){if(a&&a.defaultProps){b=A({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}var Mg=Uf(null),Ng=null,Og=null,Pg=null;function Qg(){Pg=Og=Ng=null}function Rg(a){var b=Mg.current;E(Mg);a._currentValue=b}
function Sg(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return}}function Tg(a,b){Ng=a;Pg=Og=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(Ug=!0),a.firstContext=null)}
function Vg(a){var b=a._currentValue;if(Pg!==a)if(a={context:a,memoizedValue:b,next:null},null===Og){if(null===Ng)throw Error(p(308));Og=a;Ng.dependencies={lanes:0,firstContext:a}}else Og=Og.next=a;return b}var Wg=null;function Xg(a){null===Wg?Wg=[a]:Wg.push(a)}function Yg(a,b,c,d){var e=b.interleaved;null===e?(c.next=c,Xg(b)):(c.next=e.next,e.next=c);b.interleaved=c;return Zg(a,d)}
function Zg(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}var $g=!1;function ah(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}
function bh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function ch(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}
function dh(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(K&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return Zg(a,c)}e=d.interleaved;null===e?(b.next=b,Xg(d)):(b.next=e.next,e.next=b);d.interleaved=b;return Zg(a,c)}function eh(a,b,c){b=b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c)}}
function fh(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
b;c.lastBaseUpdate=b}
function gh(a,b,c,d){var e=a.updateQueue;$g=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var m=a.alternate;null!==m&&(m=m.updateQueue,h=m.lastBaseUpdate,h!==g&&(null===h?m.firstBaseUpdate=l:h.next=l,m.lastBaseUpdate=k))}if(null!==f){var q=e.baseState;g=0;m=l=k=null;h=f;do{var r=h.lane,y=h.eventTime;if((d&r)===r){null!==m&&(m=m.next={eventTime:y,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,
next:null});a:{var n=a,t=h;r=b;y=c;switch(t.tag){case 1:n=t.payload;if("function"===typeof n){q=n.call(y,q,r);break a}q=n;break a;case 3:n.flags=n.flags&-65537|128;case 0:n=t.payload;r="function"===typeof n?n.call(y,q,r):n;if(null===r||void 0===r)break a;q=A({},q,r);break a;case 2:$g=!0}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=[h]:r.push(h))}else y={eventTime:y,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===m?(l=m=y,k=q):m=m.next=y,g|=r;
h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null}while(1);null===m&&(k=q);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=m;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);hh|=g;a.lanes=g;a.memoizedState=q}}
function ih(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(p(191,e));e.call(d)}}}var jh=(new aa.Component).refs;function kh(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:A({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}
var nh={isMounted:function(a){return(a=a._reactInternals)?Vb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=L(),e=lh(a),f=ch(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=dh(a,f,e);null!==b&&(mh(b,a,e,d),eh(b,a,e))},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=L(),e=lh(a),f=ch(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=dh(a,f,e);null!==b&&(mh(b,a,e,d),eh(b,a,e))},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=L(),d=
lh(a),e=ch(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=dh(a,e,d);null!==b&&(mh(b,a,d,c),eh(b,a,d))}};function oh(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Ie(c,d)||!Ie(e,f):!0}
function ph(a,b,c){var d=!1,e=Vf;var f=b.contextType;"object"===typeof f&&null!==f?f=Vg(f):(e=Zf(b)?Xf:H.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Yf(a,e):Vf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=nh;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function qh(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&nh.enqueueReplaceState(b,b.state,null)}
function rh(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=jh;ah(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=Vg(f):(f=Zf(b)?Xf:H.current,e.context=Yf(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(kh(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,
"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&nh.enqueueReplaceState(e,e.state,null),gh(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308)}
function sh(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(p(309));var d=c.stateNode}if(!d)throw Error(p(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;b===jh&&(b=e.refs={});null===a?delete b[f]:b[f]=a};b._stringRef=f;return b}if("string"!==typeof a)throw Error(p(284));if(!c._owner)throw Error(p(290,a));}return a}
function th(a,b){a=Object.prototype.toString.call(b);throw Error(p(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function uh(a){var b=a._init;return b(a._payload)}
function vh(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c)}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=wh(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&
null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=xh(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===ya)return m(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ha&&uh(f)===b.type))return d=e(b,c.props),d.ref=sh(a,b,c),d.return=a,d;d=yh(c.type,c.key,c.props,null,a.mode,d);d.ref=sh(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||
b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=zh(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=Ah(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function q(a,b,c){if("string"===typeof b&&""!==b||"number"===typeof b)return b=xh(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case va:return c=yh(b.type,b.key,b.props,null,a.mode,c),
c.ref=sh(a,null,b),c.return=a,c;case wa:return b=zh(b,a.mode,c),b.return=a,b;case Ha:var d=b._init;return q(a,d(b._payload),c)}if(eb(b)||Ka(b))return b=Ah(b,a.mode,c,null),b.return=a,b;th(a,b)}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case va:return c.key===e?k(a,b,c,d):null;case wa:return c.key===e?l(a,b,c,d):null;case Ha:return e=c._init,r(a,
b,e(c._payload),d)}if(eb(c)||Ka(c))return null!==e?null:m(a,b,c,d,null);th(a,c)}return null}function y(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case va:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,e);case wa:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e);case Ha:var f=d._init;return y(a,b,c,f(d._payload),e)}if(eb(d)||Ka(d))return a=a.get(c)||null,m(b,a,d,e,null);th(b,d)}return null}
function n(e,g,h,k){for(var l=null,m=null,u=g,w=g=0,x=null;null!==u&&w<h.length;w++){u.index>w?(x=u,u=null):x=u.sibling;var n=r(e,u,h[w],k);if(null===n){null===u&&(u=x);break}a&&u&&null===n.alternate&&b(e,u);g=f(n,g,w);null===m?l=n:m.sibling=n;m=n;u=x}if(w===h.length)return c(e,u),I&&tg(e,w),l;if(null===u){for(;w<h.length;w++)u=q(e,h[w],k),null!==u&&(g=f(u,g,w),null===m?l=u:m.sibling=u,m=u);I&&tg(e,w);return l}for(u=d(e,u);w<h.length;w++)x=y(u,e,w,h[w],k),null!==x&&(a&&null!==x.alternate&&u.delete(null===
x.key?w:x.key),g=f(x,g,w),null===m?l=x:m.sibling=x,m=x);a&&u.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function t(e,g,h,k){var l=Ka(h);if("function"!==typeof l)throw Error(p(150));h=l.call(h);if(null==h)throw Error(p(151));for(var u=l=null,m=g,w=g=0,x=null,n=h.next();null!==m&&!n.done;w++,n=h.next()){m.index>w?(x=m,m=null):x=m.sibling;var t=r(e,m,n.value,k);if(null===t){null===m&&(m=x);break}a&&m&&null===t.alternate&&b(e,m);g=f(t,g,w);null===u?l=t:u.sibling=t;u=t;m=x}if(n.done)return c(e,
m),I&&tg(e,w),l;if(null===m){for(;!n.done;w++,n=h.next())n=q(e,n.value,k),null!==n&&(g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);I&&tg(e,w);return l}for(m=d(e,m);!n.done;w++,n=h.next())n=y(m,e,w,n.value,k),null!==n&&(a&&null!==n.alternate&&m.delete(null===n.key?w:n.key),g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);a&&m.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function J(a,d,f,h){"object"===typeof f&&null!==f&&f.type===ya&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case va:a:{for(var k=
f.key,l=d;null!==l;){if(l.key===k){k=f.type;if(k===ya){if(7===l.tag){c(a,l.sibling);d=e(l,f.props.children);d.return=a;a=d;break a}}else if(l.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ha&&uh(k)===l.type){c(a,l.sibling);d=e(l,f.props);d.ref=sh(a,l,f);d.return=a;a=d;break a}c(a,l);break}else b(a,l);l=l.sibling}f.type===ya?(d=Ah(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=yh(f.type,f.key,f.props,null,a.mode,h),h.ref=sh(a,d,f),h.return=a,a=h)}return g(a);case wa:a:{for(l=f.key;null!==
d;){if(d.key===l)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=zh(f,a.mode,h);d.return=a;a=d}return g(a);case Ha:return l=f._init,J(a,d,l(f._payload),h)}if(eb(f))return n(a,d,f,h);if(Ka(f))return t(a,d,f,h);th(a,f)}return"string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):
(c(a,d),d=xh(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return J}var Bh=vh(!0),Ch=vh(!1),Dh={},Eh=Uf(Dh),Fh=Uf(Dh),Gh=Uf(Dh);function Hh(a){if(a===Dh)throw Error(p(174));return a}function Ih(a,b){G(Gh,b);G(Fh,a);G(Eh,Dh);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:lb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=lb(b,a)}E(Eh);G(Eh,b)}function Jh(){E(Eh);E(Fh);E(Gh)}
function Kh(a){Hh(Gh.current);var b=Hh(Eh.current);var c=lb(b,a.type);b!==c&&(G(Fh,a),G(Eh,c))}function Lh(a){Fh.current===a&&(E(Eh),E(Fh))}var M=Uf(0);
function Mh(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}var Nh=[];
function Oh(){for(var a=0;a<Nh.length;a++)Nh[a]._workInProgressVersionPrimary=null;Nh.length=0}var Ph=ua.ReactCurrentDispatcher,Qh=ua.ReactCurrentBatchConfig,Rh=0,N=null,O=null,P=null,Sh=!1,Th=!1,Uh=0,Vh=0;function Q(){throw Error(p(321));}function Wh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return!1;return!0}
function Xh(a,b,c,d,e,f){Rh=f;N=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;Ph.current=null===a||null===a.memoizedState?Yh:Zh;a=c(d,e);if(Th){f=0;do{Th=!1;Uh=0;if(25<=f)throw Error(p(301));f+=1;P=O=null;b.updateQueue=null;Ph.current=$h;a=c(d,e)}while(Th)}Ph.current=ai;b=null!==O&&null!==O.next;Rh=0;P=O=N=null;Sh=!1;if(b)throw Error(p(300));return a}function bi(){var a=0!==Uh;Uh=0;return a}
function ci(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===P?N.memoizedState=P=a:P=P.next=a;return P}function di(){if(null===O){var a=N.alternate;a=null!==a?a.memoizedState:null}else a=O.next;var b=null===P?N.memoizedState:P.next;if(null!==b)P=b,O=a;else{if(null===a)throw Error(p(310));O=a;a={memoizedState:O.memoizedState,baseState:O.baseState,baseQueue:O.baseQueue,queue:O.queue,next:null};null===P?N.memoizedState=P=a:P=P.next=a}return P}
function ei(a,b){return"function"===typeof b?b(a):b}
function fi(a){var b=di(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=O,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,l=f;do{var m=l.lane;if((Rh&m)===m)null!==k&&(k=k.next={lane:0,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),d=l.hasEagerState?l.eagerState:a(d,l.action);else{var q={lane:m,action:l.action,hasEagerState:l.hasEagerState,
eagerState:l.eagerState,next:null};null===k?(h=k=q,g=d):k=k.next=q;N.lanes|=m;hh|=m}l=l.next}while(null!==l&&l!==f);null===k?g=d:k.next=h;He(d,b.memoizedState)||(Ug=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d}a=c.interleaved;if(null!==a){e=a;do f=e.lane,N.lanes|=f,hh|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return[b.memoizedState,c.dispatch]}
function gi(a){var b=di(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(Ug=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}function hi(){}
function ii(a,b){var c=N,d=di(),e=b(),f=!He(d.memoizedState,e);f&&(d.memoizedState=e,Ug=!0);d=d.queue;ji(ki.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==P&&P.memoizedState.tag&1){c.flags|=2048;li(9,mi.bind(null,c,d,e,b),void 0,null);if(null===R)throw Error(p(349));0!==(Rh&30)||ni(c,b,e)}return e}function ni(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=N.updateQueue;null===b?(b={lastEffect:null,stores:null},N.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a))}
function mi(a,b,c,d){b.value=c;b.getSnapshot=d;oi(b)&&pi(a)}function ki(a,b,c){return c(function(){oi(b)&&pi(a)})}function oi(a){var b=a.getSnapshot;a=a.value;try{var c=b();return!He(a,c)}catch(d){return!0}}function pi(a){var b=Zg(a,1);null!==b&&mh(b,a,1,-1)}
function qi(a){var b=ci();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ei,lastRenderedState:a};b.queue=a;a=a.dispatch=ri.bind(null,N,a);return[b.memoizedState,a]}
function li(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=N.updateQueue;null===b?(b={lastEffect:null,stores:null},N.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function si(){return di().memoizedState}function ti(a,b,c,d){var e=ci();N.flags|=a;e.memoizedState=li(1|b,c,void 0,void 0===d?null:d)}
function ui(a,b,c,d){var e=di();d=void 0===d?null:d;var f=void 0;if(null!==O){var g=O.memoizedState;f=g.destroy;if(null!==d&&Wh(d,g.deps)){e.memoizedState=li(b,c,f,d);return}}N.flags|=a;e.memoizedState=li(1|b,c,f,d)}function vi(a,b){return ti(8390656,8,a,b)}function ji(a,b){return ui(2048,8,a,b)}function wi(a,b){return ui(4,2,a,b)}function xi(a,b){return ui(4,4,a,b)}
function yi(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function zi(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return ui(4,4,yi.bind(null,b,a),c)}function Ai(){}function Bi(a,b){var c=di();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Wh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
function Ci(a,b){var c=di();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Wh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function Di(a,b,c){if(0===(Rh&21))return a.baseState&&(a.baseState=!1,Ug=!0),a.memoizedState=c;He(c,b)||(c=yc(),N.lanes|=c,hh|=c,a.baseState=!0);return b}function Ei(a,b){var c=C;C=0!==c&&4>c?c:4;a(!0);var d=Qh.transition;Qh.transition={};try{a(!1),b()}finally{C=c,Qh.transition=d}}function Fi(){return di().memoizedState}
function Gi(a,b,c){var d=lh(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(Hi(a))Ii(b,c);else if(c=Yg(a,b,c,d),null!==c){var e=L();mh(c,a,d,e);Ji(c,b,d)}}
function ri(a,b,c){var d=lh(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(Hi(a))Ii(b,e);else{var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(He(h,g)){var k=b.interleaved;null===k?(e.next=e,Xg(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(l){}finally{}c=Yg(a,b,e,d);null!==c&&(e=L(),mh(c,a,d,e),Ji(c,b,d))}}
function Hi(a){var b=a.alternate;return a===N||null!==b&&b===N}function Ii(a,b){Th=Sh=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}function Ji(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c)}}
var ai={readContext:Vg,useCallback:Q,useContext:Q,useEffect:Q,useImperativeHandle:Q,useInsertionEffect:Q,useLayoutEffect:Q,useMemo:Q,useReducer:Q,useRef:Q,useState:Q,useDebugValue:Q,useDeferredValue:Q,useTransition:Q,useMutableSource:Q,useSyncExternalStore:Q,useId:Q,unstable_isNewReconciler:!1},Yh={readContext:Vg,useCallback:function(a,b){ci().memoizedState=[a,void 0===b?null:b];return a},useContext:Vg,useEffect:vi,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return ti(4194308,
4,yi.bind(null,b,a),c)},useLayoutEffect:function(a,b){return ti(4194308,4,a,b)},useInsertionEffect:function(a,b){return ti(4,2,a,b)},useMemo:function(a,b){var c=ci();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=ci();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=Gi.bind(null,N,a);return[d.memoizedState,a]},useRef:function(a){var b=
ci();a={current:a};return b.memoizedState=a},useState:qi,useDebugValue:Ai,useDeferredValue:function(a){return ci().memoizedState=a},useTransition:function(){var a=qi(!1),b=a[0];a=Ei.bind(null,a[1]);ci().memoizedState=a;return[b,a]},useMutableSource:function(){},useSyncExternalStore:function(a,b,c){var d=N,e=ci();if(I){if(void 0===c)throw Error(p(407));c=c()}else{c=b();if(null===R)throw Error(p(349));0!==(Rh&30)||ni(d,b,c)}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;vi(ki.bind(null,d,
f,a),[a]);d.flags|=2048;li(9,mi.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=ci(),b=R.identifierPrefix;if(I){var c=sg;var d=rg;c=(d&~(1<<32-oc(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Uh++;0<c&&(b+="H"+c.toString(32));b+=":"}else c=Vh++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},Zh={readContext:Vg,useCallback:Bi,useContext:Vg,useEffect:ji,useImperativeHandle:zi,useInsertionEffect:wi,useLayoutEffect:xi,useMemo:Ci,useReducer:fi,useRef:si,useState:function(){return fi(ei)},
useDebugValue:Ai,useDeferredValue:function(a){var b=di();return Di(b,O.memoizedState,a)},useTransition:function(){var a=fi(ei)[0],b=di().memoizedState;return[a,b]},useMutableSource:hi,useSyncExternalStore:ii,useId:Fi,unstable_isNewReconciler:!1},$h={readContext:Vg,useCallback:Bi,useContext:Vg,useEffect:ji,useImperativeHandle:zi,useInsertionEffect:wi,useLayoutEffect:xi,useMemo:Ci,useReducer:gi,useRef:si,useState:function(){return gi(ei)},useDebugValue:Ai,useDeferredValue:function(a){var b=di();return null===
O?b.memoizedState=a:Di(b,O.memoizedState,a)},useTransition:function(){var a=gi(ei)[0],b=di().memoizedState;return[a,b]},useMutableSource:hi,useSyncExternalStore:ii,useId:Fi,unstable_isNewReconciler:!1};function Ki(a,b){try{var c="",d=b;do c+=Pa(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack}return{value:a,source:b,stack:e,digest:null}}function Li(a,b,c){return{value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}
function Mi(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}var Ni="function"===typeof WeakMap?WeakMap:Map;function Oi(a,b,c){c=ch(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Pi||(Pi=!0,Qi=d);Mi(a,b)};return c}
function Ri(a,b,c){c=ch(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};c.callback=function(){Mi(a,b)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){Mi(a,b);"function"!==typeof d&&(null===Si?Si=new Set([this]):Si.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}
function Ti(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new Ni;var e=new Set;d.set(b,e)}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=Ui.bind(null,a,b,c),b.then(a,a))}function Vi(a){do{var b;if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return}while(null!==a);return null}
function Wi(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=ch(-1,1),b.tag=2,dh(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}var Xi=ua.ReactCurrentOwner,Ug=!1;function Yi(a,b,c,d){b.child=null===a?Ch(b,null,c,d):Bh(b,a.child,c,d)}
function Zi(a,b,c,d,e){c=c.render;var f=b.ref;Tg(b,e);d=Xh(a,b,c,d,f,e);c=bi();if(null!==a&&!Ug)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,$i(a,b,e);I&&c&&vg(b);b.flags|=1;Yi(a,b,d,e);return b.child}
function aj(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!bj(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,cj(a,b,f,d,e);a=yh(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:Ie;if(c(g,d)&&a.ref===b.ref)return $i(a,b,e)}b.flags|=1;a=wh(f,d);a.ref=b.ref;a.return=b;return b.child=a}
function cj(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(Ie(f,d)&&a.ref===b.ref)if(Ug=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(Ug=!0);else return b.lanes=a.lanes,$i(a,b,e)}return dj(a,b,c,d,e)}
function ej(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},G(fj,gj),gj|=c;else{if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,G(fj,gj),gj|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;G(fj,gj);gj|=d}else null!==
f?(d=f.baseLanes|c,b.memoizedState=null):d=c,G(fj,gj),gj|=d;Yi(a,b,e,c);return b.child}function hj(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152}function dj(a,b,c,d,e){var f=Zf(c)?Xf:H.current;f=Yf(b,f);Tg(b,e);c=Xh(a,b,c,d,f,e);d=bi();if(null!==a&&!Ug)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,$i(a,b,e);I&&d&&vg(b);b.flags|=1;Yi(a,b,c,e);return b.child}
function ij(a,b,c,d,e){if(Zf(c)){var f=!0;cg(b)}else f=!1;Tg(b,e);if(null===b.stateNode)jj(a,b),ph(b,c,d),rh(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=Vg(l):(l=Zf(c)?Xf:H.current,l=Yf(b,l));var m=c.getDerivedStateFromProps,q="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;q||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||
(h!==d||k!==l)&&qh(b,g,d,l);$g=!1;var r=b.memoizedState;g.state=r;gh(b,d,g,e);k=b.memoizedState;h!==d||r!==k||Wf.current||$g?("function"===typeof m&&(kh(b,c,m,d),k=b.memoizedState),(h=$g||oh(b,c,h,d,r,k,l))?(q||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):
("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1)}else{g=b.stateNode;bh(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:Lg(b.type,h);g.props=l;q=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=Vg(k):(k=Zf(c)?Xf:H.current,k=Yf(b,k));var y=c.getDerivedStateFromProps;(m="function"===typeof y||"function"===typeof g.getSnapshotBeforeUpdate)||
"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==q||r!==k)&&qh(b,g,d,k);$g=!1;r=b.memoizedState;g.state=r;gh(b,d,g,e);var n=b.memoizedState;h!==q||r!==n||Wf.current||$g?("function"===typeof y&&(kh(b,c,y,d),n=b.memoizedState),(l=$g||oh(b,c,l,d,r,n,k)||!1)?(m||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,n,k),"function"===typeof g.UNSAFE_componentWillUpdate&&
g.UNSAFE_componentWillUpdate(d,n,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=n),g.props=d,g.state=n,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===
a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=!1)}return kj(a,b,c,d,f,e)}
function kj(a,b,c,d,e,f){hj(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&dg(b,c,!1),$i(a,b,f);d=b.stateNode;Xi.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Bh(b,a.child,null,f),b.child=Bh(b,null,h,f)):Yi(a,b,h,f);b.memoizedState=d.state;e&&dg(b,c,!0);return b.child}function lj(a){var b=a.stateNode;b.pendingContext?ag(a,b.pendingContext,b.pendingContext!==b.context):b.context&&ag(a,b.context,!1);Ih(a,b.containerInfo)}
function mj(a,b,c,d,e){Ig();Jg(e);b.flags|=256;Yi(a,b,c,d);return b.child}var nj={dehydrated:null,treeContext:null,retryLane:0};function oj(a){return{baseLanes:a,cachePool:null,transitions:null}}
function pj(a,b,c){var d=b.pendingProps,e=M.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;G(M,e&1);if(null===a){Eg(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==f?(f.childLanes=0,f.pendingProps=
g):f=qj(g,d,0,null),a=Ah(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=oj(c),b.memoizedState=nj,a):rj(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return sj(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=wh(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=wh(h,f):(f=Ah(f,g,c,null),f.flags|=2);f.return=
b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?oj(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=nj;return d}f=a.child;a=f.sibling;d=wh(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
function rj(a,b){b=qj({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function tj(a,b,c,d){null!==d&&Jg(d);Bh(b,a.child,null,c);a=rj(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}
function sj(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=Li(Error(p(422))),tj(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=qj({mode:"visible",children:d.children},e,0,null);f=Ah(f,e,g,null);f.flags|=2;d.return=b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Bh(b,a.child,null,g);b.child.memoizedState=oj(g);b.memoizedState=nj;return f}if(0===(b.mode&1))return tj(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;
if(d)var h=d.dgst;d=h;f=Error(p(419));d=Li(f,d,void 0);return tj(a,b,g,d)}h=0!==(g&a.childLanes);if(Ug||h){d=R;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=32;break;case 536870912:e=268435456;break;default:e=0}e=0!==(e&(d.suspendedLanes|g))?0:e;
0!==e&&e!==f.retryLane&&(f.retryLane=e,Zg(a,e),mh(d,a,e,-1))}uj();d=Li(Error(p(421)));return tj(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=vj.bind(null,a),e._reactRetry=b,null;a=f.treeContext;yg=Lf(e.nextSibling);xg=b;I=!0;zg=null;null!==a&&(og[pg++]=rg,og[pg++]=sg,og[pg++]=qg,rg=a.id,sg=a.overflow,qg=b);b=rj(b,d.children);b.flags|=4096;return b}function wj(a,b,c){a.lanes|=b;var d=a.alternate;null!==d&&(d.lanes|=b);Sg(a.return,b,c)}
function xj(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e)}
function yj(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;Yi(a,b,d.children,c);d=M.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else{if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&wj(a,c,b);else if(19===a.tag)wj(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}G(M,d);if(0===(b.mode&1))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===Mh(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);xj(b,!1,e,c,f);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===Mh(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}xj(b,!0,c,null,f);break;case "together":xj(b,!1,null,null,void 0);break;default:b.memoizedState=null}return b.child}
function jj(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2)}function $i(a,b,c){null!==a&&(b.dependencies=a.dependencies);hh|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(p(153));if(null!==b.child){a=b.child;c=wh(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=wh(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}
function zj(a,b,c){switch(b.tag){case 3:lj(b);Ig();break;case 5:Kh(b);break;case 1:Zf(b.type)&&cg(b);break;case 4:Ih(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;G(Mg,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return G(M,M.current&1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return pj(a,b,c);G(M,M.current&1);a=$i(a,b,c);return null!==a?a.sibling:null}G(M,M.current&1);break;case 19:d=0!==(c&
b.childLanes);if(0!==(a.flags&128)){if(d)return yj(a,b,c);b.flags|=128}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);G(M,M.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,ej(a,b,c)}return $i(a,b,c)}var Aj,Bj,Cj,Dj;
Aj=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};Bj=function(){};
Cj=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;Hh(Eh.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "select":e=A({},e,{value:void 0});d=A({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=Bf)}ub(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&
(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ea.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||(c={}),c[g]=k[g])}else c||(f||(f=[]),f.push(l,
c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ea.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&D("scroll",a),f||h===k||(f=[])):(f=f||[]).push(l,k))}c&&(f=f||[]).push("style",c);var l=f;if(b.updateQueue=l)b.flags|=4}};Dj=function(a,b,c,d){c!==d&&(b.flags|=4)};
function Ej(a,b){if(!I)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function S(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}
function Fj(a,b,c){var d=b.pendingProps;wg(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return S(b),null;case 1:return Zf(b.type)&&$f(),S(b),null;case 3:d=b.stateNode;Jh();E(Wf);E(H);Oh();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)Gg(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&256)||(b.flags|=1024,null!==zg&&(Gj(zg),zg=null));Bj(a,b);S(b);return null;case 5:Lh(b);var e=Hh(Gh.current);
c=b.type;if(null!==a&&null!=b.stateNode)Cj(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else{if(!d){if(null===b.stateNode)throw Error(p(166));S(b);return null}a=Hh(Eh.current);if(Gg(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Of]=b;d[Pf]=f;a=0!==(b.mode&1);switch(c){case "dialog":D("cancel",d);D("close",d);break;case "iframe":case "object":case "embed":D("load",d);break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],d);break;case "source":D("error",d);break;case "img":case "image":case "link":D("error",
d);D("load",d);break;case "details":D("toggle",d);break;case "input":Za(d,f);D("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};D("invalid",d);break;case "textarea":hb(d,f),D("invalid",d)}ub(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,
h,a),e=["children",""+h]):ea.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&D("scroll",d)}switch(c){case "input":Va(d);db(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=Bf)}d=e;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===a&&(a=kb(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):
"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Of]=b;a[Pf]=d;Aj(a,b,!1,!1);b.stateNode=a;a:{g=vb(c,d);switch(c){case "dialog":D("cancel",a);D("close",a);e=d;break;case "iframe":case "object":case "embed":D("load",a);e=d;break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],a);e=d;break;case "source":D("error",a);e=d;break;case "img":case "image":case "link":D("error",
a);D("load",a);e=d;break;case "details":D("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);D("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=A({},d,{value:void 0});D("invalid",a);break;case "textarea":hb(a,d);e=gb(a,d);D("invalid",a);break;default:e=d}ub(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?sb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&nb(a,k)):"children"===f?"string"===typeof k?("textarea"!==
c||""!==k)&&ob(a,k):"number"===typeof k&&ob(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ea.hasOwnProperty(f)?null!=k&&"onScroll"===f&&D("scroll",a):null!=k&&ta(a,f,k,g))}switch(c){case "input":Va(a);db(a,d,!1);break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,
!0);break;default:"function"===typeof e.onClick&&(a.onclick=Bf)}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=!0;break a;default:d=!1}}d&&(b.flags|=4)}null!==b.ref&&(b.flags|=512,b.flags|=2097152)}S(b);return null;case 6:if(a&&null!=b.stateNode)Dj(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===b.stateNode)throw Error(p(166));c=Hh(Gh.current);Hh(Eh.current);if(Gg(b)){d=b.stateNode;c=b.memoizedProps;d[Of]=b;if(f=d.nodeValue!==c)if(a=
xg,null!==a)switch(a.tag){case 3:Af(d.nodeValue,c,0!==(a.mode&1));break;case 5:!0!==a.memoizedProps.suppressHydrationWarning&&Af(d.nodeValue,c,0!==(a.mode&1))}f&&(b.flags|=4)}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Of]=b,b.stateNode=d}S(b);return null;case 13:E(M);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(I&&null!==yg&&0!==(b.mode&1)&&0===(b.flags&128))Hg(),Ig(),b.flags|=98560,f=!1;else if(f=Gg(b),null!==d&&null!==d.dehydrated){if(null===
a){if(!f)throw Error(p(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(p(317));f[Of]=b}else Ig(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;S(b);f=!1}else null!==zg&&(Gj(zg),zg=null),f=!0;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(M.current&1)?0===T&&(T=3):uj()));null!==b.updateQueue&&(b.flags|=4);S(b);return null;case 4:return Jh(),
Bj(a,b),null===a&&sf(b.stateNode.containerInfo),S(b),null;case 10:return Rg(b.type._context),S(b),null;case 17:return Zf(b.type)&&$f(),S(b),null;case 19:E(M);f=b.memoizedState;if(null===f)return S(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Ej(f,!1);else{if(0!==T||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=Mh(a);if(null!==g){b.flags|=128;Ej(f,!1);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,
g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;G(M,M.current&1|2);return b.child}a=
a.sibling}null!==f.tail&&B()>Hj&&(b.flags|=128,d=!0,Ej(f,!1),b.lanes=4194304)}else{if(!d)if(a=Mh(g),null!==a){if(b.flags|=128,d=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Ej(f,!0),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!I)return S(b),null}else 2*B()-f.renderingStartTime>Hj&&1073741824!==c&&(b.flags|=128,d=!0,Ej(f,!1),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g)}if(null!==f.tail)return b=f.tail,f.rendering=
b,f.tail=b.sibling,f.renderingStartTime=B(),b.sibling=null,c=M.current,G(M,d?c&1|2:c&1),b;S(b);return null;case 22:case 23:return Ij(),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(gj&1073741824)&&(S(b),b.subtreeFlags&6&&(b.flags|=8192)):S(b),null;case 24:return null;case 25:return null}throw Error(p(156,b.tag));}
function Jj(a,b){wg(b);switch(b.tag){case 1:return Zf(b.type)&&$f(),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return Jh(),E(Wf),E(H),Oh(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return Lh(b),null;case 13:E(M);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(p(340));Ig()}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return E(M),null;case 4:return Jh(),null;case 10:return Rg(b.type._context),null;case 22:case 23:return Ij(),
null;case 24:return null;default:return null}}var Kj=!1,U=!1,Lj="function"===typeof WeakSet?WeakSet:Set,V=null;function Mj(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(d){W(a,b,d)}else c.current=null}function Nj(a,b,c){try{c()}catch(d){W(a,b,d)}}var Oj=!1;
function Pj(a,b){Cf=dd;a=Me();if(Ne(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType}catch(F){c=null;break a}var g=0,h=-1,k=-1,l=0,m=0,q=a,r=null;b:for(;;){for(var y;;){q!==c||0!==e&&3!==q.nodeType||(h=g+e);q!==f||0!==d&&3!==q.nodeType||(k=g+d);3===q.nodeType&&(g+=
q.nodeValue.length);if(null===(y=q.firstChild))break;r=q;q=y}for(;;){if(q===a)break b;r===c&&++l===e&&(h=g);r===f&&++m===d&&(k=g);if(null!==(y=q.nextSibling))break;q=r;r=q.parentNode}q=y}c=-1===h||-1===k?null:{start:h,end:k}}else c=null}c=c||{start:0,end:0}}else c=null;Df={focusedElem:a,selectionRange:c};dd=!1;for(V=b;null!==V;)if(b=V,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,V=a;else for(;null!==V;){b=V;try{var n=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;
case 1:if(null!==n){var t=n.memoizedProps,J=n.memoizedState,x=b.stateNode,w=x.getSnapshotBeforeUpdate(b.elementType===b.type?t:Lg(b.type,t),J);x.__reactInternalSnapshotBeforeUpdate=w}break;case 3:var u=b.stateNode.containerInfo;1===u.nodeType?u.textContent="":9===u.nodeType&&u.documentElement&&u.removeChild(u.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(p(163));}}catch(F){W(b,b.return,F)}a=b.sibling;if(null!==a){a.return=b.return;V=a;break}V=b.return}n=Oj;Oj=!1;return n}
function Qj(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&Nj(b,c,f)}e=e.next}while(e!==d)}}function Rj(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}function Sj(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c}"function"===typeof b?b(a):b.current=a}}
function Tj(a){var b=a.alternate;null!==b&&(a.alternate=null,Tj(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Of],delete b[Pf],delete b[of],delete b[Qf],delete b[Rf]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null}function Uj(a){return 5===a.tag||3===a.tag||4===a.tag}
function Vj(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Uj(a.return))return null;a=a.return}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child}if(!(a.flags&2))return a.stateNode}}
function Wj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=Bf));else if(4!==d&&(a=a.child,null!==a))for(Wj(a,b,c),a=a.sibling;null!==a;)Wj(a,b,c),a=a.sibling}
function Xj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(Xj(a,b,c),a=a.sibling;null!==a;)Xj(a,b,c),a=a.sibling}var X=null,Yj=!1;function Zj(a,b,c){for(c=c.child;null!==c;)ak(a,b,c),c=c.sibling}
function ak(a,b,c){if(lc&&"function"===typeof lc.onCommitFiberUnmount)try{lc.onCommitFiberUnmount(kc,c)}catch(h){}switch(c.tag){case 5:U||Mj(c,b);case 6:var d=X,e=Yj;X=null;Zj(a,b,c);X=d;Yj=e;null!==X&&(Yj?(a=X,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):X.removeChild(c.stateNode));break;case 18:null!==X&&(Yj?(a=X,c=c.stateNode,8===a.nodeType?Kf(a.parentNode,c):1===a.nodeType&&Kf(a,c),bd(a)):Kf(X,c.stateNode));break;case 4:d=X;e=Yj;X=c.stateNode.containerInfo;Yj=!0;
Zj(a,b,c);X=d;Yj=e;break;case 0:case 11:case 14:case 15:if(!U&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?Nj(c,b,g):0!==(f&4)&&Nj(c,b,g));e=e.next}while(e!==d)}Zj(a,b,c);break;case 1:if(!U&&(Mj(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(h){W(c,b,h)}Zj(a,b,c);break;case 21:Zj(a,b,c);break;case 22:c.mode&1?(U=(d=U)||null!==
c.memoizedState,Zj(a,b,c),U=d):Zj(a,b,c);break;default:Zj(a,b,c)}}function bk(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Lj);b.forEach(function(b){var d=ck.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
function dk(a,b){var c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:X=h.stateNode;Yj=!1;break a;case 3:X=h.stateNode.containerInfo;Yj=!0;break a;case 4:X=h.stateNode.containerInfo;Yj=!0;break a}h=h.return}if(null===X)throw Error(p(160));ak(f,g,e);X=null;Yj=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null}catch(l){W(e,b,l)}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)ek(b,a),b=b.sibling}
function ek(a,b){var c=a.alternate,d=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:dk(b,a);fk(a);if(d&4){try{Qj(3,a,a.return),Rj(3,a)}catch(t){W(a,a.return,t)}try{Qj(5,a,a.return)}catch(t){W(a,a.return,t)}}break;case 1:dk(b,a);fk(a);d&512&&null!==c&&Mj(c,c.return);break;case 5:dk(b,a);fk(a);d&512&&null!==c&&Mj(c,c.return);if(a.flags&32){var e=a.stateNode;try{ob(e,"")}catch(t){W(a,a.return,t)}}if(d&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==c?c.memoizedProps:f,h=a.type,k=a.updateQueue;
a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&ab(e,f);vb(h,g);var l=vb(h,f);for(g=0;g<k.length;g+=2){var m=k[g],q=k[g+1];"style"===m?sb(e,q):"dangerouslySetInnerHTML"===m?nb(e,q):"children"===m?ob(e,q):ta(e,m,q,l)}switch(h){case "input":bb(e,f);break;case "textarea":ib(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var y=f.value;null!=y?fb(e,!!f.multiple,y,!1):r!==!!f.multiple&&(null!=f.defaultValue?fb(e,!!f.multiple,
f.defaultValue,!0):fb(e,!!f.multiple,f.multiple?[]:"",!1))}e[Pf]=f}catch(t){W(a,a.return,t)}}break;case 6:dk(b,a);fk(a);if(d&4){if(null===a.stateNode)throw Error(p(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f}catch(t){W(a,a.return,t)}}break;case 3:dk(b,a);fk(a);if(d&4&&null!==c&&c.memoizedState.isDehydrated)try{bd(b.containerInfo)}catch(t){W(a,a.return,t)}break;case 4:dk(b,a);fk(a);break;case 13:dk(b,a);fk(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||
null!==e.alternate&&null!==e.alternate.memoizedState||(gk=B()));d&4&&bk(a);break;case 22:m=null!==c&&null!==c.memoizedState;a.mode&1?(U=(l=U)||m,dk(b,a),U=l):dk(b,a);fk(a);if(d&8192){l=null!==a.memoizedState;if((a.stateNode.isHidden=l)&&!m&&0!==(a.mode&1))for(V=a,m=a.child;null!==m;){for(q=V=m;null!==V;){r=V;y=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Qj(4,r,r.return);break;case 1:Mj(r,r.return);var n=r.stateNode;if("function"===typeof n.componentWillUnmount){d=r;c=r.return;try{b=d,n.props=
b.memoizedProps,n.state=b.memoizedState,n.componentWillUnmount()}catch(t){W(d,c,t)}}break;case 5:Mj(r,r.return);break;case 22:if(null!==r.memoizedState){hk(q);continue}}null!==y?(y.return=r,V=y):hk(q)}m=m.sibling}a:for(m=null,q=a;;){if(5===q.tag){if(null===m){m=q;try{e=q.stateNode,l?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=q.stateNode,k=q.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=
rb("display",g))}catch(t){W(a,a.return,t)}}}else if(6===q.tag){if(null===m)try{q.stateNode.nodeValue=l?"":q.memoizedProps}catch(t){W(a,a.return,t)}}else if((22!==q.tag&&23!==q.tag||null===q.memoizedState||q===a)&&null!==q.child){q.child.return=q;q=q.child;continue}if(q===a)break a;for(;null===q.sibling;){if(null===q.return||q.return===a)break a;m===q&&(m=null);q=q.return}m===q&&(m=null);q.sibling.return=q.return;q=q.sibling}}break;case 19:dk(b,a);fk(a);d&4&&bk(a);break;case 21:break;default:dk(b,
a),fk(a)}}function fk(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Uj(c)){var d=c;break a}c=c.return}throw Error(p(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(ob(e,""),d.flags&=-33);var f=Vj(a);Xj(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Vj(a);Wj(a,h,g);break;default:throw Error(p(161));}}catch(k){W(a,a.return,k)}a.flags&=-3}b&4096&&(a.flags&=-4097)}function ik(a,b,c){V=a;jk(a,b,c)}
function jk(a,b,c){for(var d=0!==(a.mode&1);null!==V;){var e=V,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Kj;if(!g){var h=e.alternate,k=null!==h&&null!==h.memoizedState||U;h=Kj;var l=U;Kj=g;if((U=k)&&!l)for(V=e;null!==V;)g=V,k=g.child,22===g.tag&&null!==g.memoizedState?kk(e):null!==k?(k.return=g,V=k):kk(e);for(;null!==f;)V=f,jk(f,b,c),f=f.sibling;V=e;Kj=h;U=l}lk(a,b,c)}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,V=f):lk(a,b,c)}}
function lk(a){for(;null!==V;){var b=V;if(0!==(b.flags&8772)){var c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:U||Rj(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!U)if(null===c)d.componentDidMount();else{var e=b.elementType===b.type?c.memoizedProps:Lg(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var f=b.updateQueue;null!==f&&ih(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=
b.child.stateNode;break;case 1:c=b.child.stateNode}ih(b,g,c)}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&c.focus();break;case "img":k.src&&(c.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var l=b.alternate;if(null!==l){var m=l.memoizedState;if(null!==m){var q=m.dehydrated;null!==q&&bd(q)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;
default:throw Error(p(163));}U||b.flags&512&&Sj(b)}catch(r){W(b,b.return,r)}}if(b===a){V=null;break}c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return}}function hk(a){for(;null!==V;){var b=V;if(b===a){V=null;break}var c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return}}
function kk(a){for(;null!==V;){var b=V;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Rj(4,b)}catch(k){W(b,c,k)}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount()}catch(k){W(b,e,k)}}var f=b.return;try{Sj(b)}catch(k){W(b,f,k)}break;case 5:var g=b.return;try{Sj(b)}catch(k){W(b,g,k)}}}catch(k){W(b,b.return,k)}if(b===a){V=null;break}var h=b.sibling;if(null!==h){h.return=b.return;V=h;break}V=b.return}}
var mk=Math.ceil,nk=ua.ReactCurrentDispatcher,ok=ua.ReactCurrentOwner,pk=ua.ReactCurrentBatchConfig,K=0,R=null,Y=null,Z=0,gj=0,fj=Uf(0),T=0,qk=null,hh=0,rk=0,sk=0,tk=null,uk=null,gk=0,Hj=Infinity,vk=null,Pi=!1,Qi=null,Si=null,wk=!1,xk=null,yk=0,zk=0,Ak=null,Bk=-1,Ck=0;function L(){return 0!==(K&6)?B():-1!==Bk?Bk:Bk=B()}
function lh(a){if(0===(a.mode&1))return 1;if(0!==(K&2)&&0!==Z)return Z&-Z;if(null!==Kg.transition)return 0===Ck&&(Ck=yc()),Ck;a=C;if(0!==a)return a;a=window.event;a=void 0===a?16:jd(a.type);return a}function mh(a,b,c,d){if(50<zk)throw zk=0,Ak=null,Error(p(185));Ac(a,c,d);if(0===(K&2)||a!==R)a===R&&(0===(K&2)&&(rk|=c),4===T&&Dk(a,Z)),Ek(a,d),1===c&&0===K&&0===(b.mode&1)&&(Hj=B()+500,fg&&jg())}
function Ek(a,b){var c=a.callbackNode;wc(a,b);var d=uc(a,a===R?Z:0);if(0===d)null!==c&&bc(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&bc(c);if(1===b)0===a.tag?ig(Fk.bind(null,a)):hg(Fk.bind(null,a)),Jf(function(){0===(K&6)&&jg()}),c=null;else{switch(Dc(d)){case 1:c=fc;break;case 4:c=gc;break;case 16:c=hc;break;case 536870912:c=jc;break;default:c=hc}c=Gk(c,Hk.bind(null,a))}a.callbackPriority=b;a.callbackNode=c}}
function Hk(a,b){Bk=-1;Ck=0;if(0!==(K&6))throw Error(p(327));var c=a.callbackNode;if(Ik()&&a.callbackNode!==c)return null;var d=uc(a,a===R?Z:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Jk(a,d);else{b=d;var e=K;K|=2;var f=Kk();if(R!==a||Z!==b)vk=null,Hj=B()+500,Lk(a,b);do try{Mk();break}catch(h){Nk(a,h)}while(1);Qg();nk.current=f;K=e;null!==Y?b=0:(R=null,Z=0,b=T)}if(0!==b){2===b&&(e=xc(a),0!==e&&(d=e,b=Ok(a,e)));if(1===b)throw c=qk,Lk(a,0),Dk(a,d),Ek(a,B()),c;if(6===b)Dk(a,d);
else{e=a.current.alternate;if(0===(d&30)&&!Pk(e)&&(b=Jk(a,d),2===b&&(f=xc(a),0!==f&&(d=f,b=Ok(a,f))),1===b))throw c=qk,Lk(a,0),Dk(a,d),Ek(a,B()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(p(345));case 2:Qk(a,uk,vk);break;case 3:Dk(a,d);if((d&130023424)===d&&(b=gk+500-B(),10<b)){if(0!==uc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){L();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Ff(Qk.bind(null,a,uk,vk),b);break}Qk(a,uk,vk);break;case 4:Dk(a,d);if((d&4194240)===
d)break;b=a.eventTimes;for(e=-1;0<d;){var g=31-oc(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f}d=e;d=B()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*mk(d/1960))-d;if(10<d){a.timeoutHandle=Ff(Qk.bind(null,a,uk,vk),d);break}Qk(a,uk,vk);break;case 5:Qk(a,uk,vk);break;default:throw Error(p(329));}}}Ek(a,B());return a.callbackNode===c?Hk.bind(null,a):null}
function Ok(a,b){var c=tk;a.current.memoizedState.isDehydrated&&(Lk(a,b).flags|=256);a=Jk(a,b);2!==a&&(b=uk,uk=c,null!==b&&Gj(b));return a}function Gj(a){null===uk?uk=a:uk.push.apply(uk,a)}
function Pk(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!He(f(),e))return!1}catch(g){return!1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else{if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return!0;b=b.return}b.sibling.return=b.return;b=b.sibling}}return!0}
function Dk(a,b){b&=~sk;b&=~rk;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-oc(b),d=1<<c;a[c]=-1;b&=~d}}function Fk(a){if(0!==(K&6))throw Error(p(327));Ik();var b=uc(a,0);if(0===(b&1))return Ek(a,B()),null;var c=Jk(a,b);if(0!==a.tag&&2===c){var d=xc(a);0!==d&&(b=d,c=Ok(a,d))}if(1===c)throw c=qk,Lk(a,0),Dk(a,b),Ek(a,B()),c;if(6===c)throw Error(p(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;Qk(a,uk,vk);Ek(a,B());return null}
function Rk(a,b){var c=K;K|=1;try{return a(b)}finally{K=c,0===K&&(Hj=B()+500,fg&&jg())}}function Sk(a){null!==xk&&0===xk.tag&&0===(K&6)&&Ik();var b=K;K|=1;var c=pk.transition,d=C;try{if(pk.transition=null,C=1,a)return a()}finally{C=d,pk.transition=c,K=b,0===(K&6)&&jg()}}function Ij(){gj=fj.current;E(fj)}
function Lk(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Gf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;wg(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&$f();break;case 3:Jh();E(Wf);E(H);Oh();break;case 5:Lh(d);break;case 4:Jh();break;case 13:E(M);break;case 19:E(M);break;case 10:Rg(d.type._context);break;case 22:case 23:Ij()}c=c.return}R=a;Y=a=wh(a.current,null);Z=gj=b;T=0;qk=null;sk=rk=hh=0;uk=tk=null;if(null!==Wg){for(b=
0;b<Wg.length;b++)if(c=Wg[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g}c.pending=d}Wg=null}return a}
function Nk(a,b){do{var c=Y;try{Qg();Ph.current=ai;if(Sh){for(var d=N.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}Sh=!1}Rh=0;P=O=N=null;Th=!1;Uh=0;ok.current=null;if(null===c||null===c.return){T=1;qk=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=Z;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k,m=h,q=m.tag;if(0===(m.mode&1)&&(0===q||11===q||15===q)){var r=m.alternate;r?(m.updateQueue=r.updateQueue,m.memoizedState=r.memoizedState,
m.lanes=r.lanes):(m.updateQueue=null,m.memoizedState=null)}var y=Vi(g);if(null!==y){y.flags&=-257;Wi(y,g,h,f,b);y.mode&1&&Ti(f,l,b);b=y;k=l;var n=b.updateQueue;if(null===n){var t=new Set;t.add(k);b.updateQueue=t}else n.add(k);break a}else{if(0===(b&1)){Ti(f,l,b);uj();break a}k=Error(p(426))}}else if(I&&h.mode&1){var J=Vi(g);if(null!==J){0===(J.flags&65536)&&(J.flags|=256);Wi(J,g,h,f,b);Jg(Ki(k,h));break a}}f=k=Ki(k,h);4!==T&&(T=2);null===tk?tk=[f]:tk.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;
b&=-b;f.lanes|=b;var x=Oi(f,k,b);fh(f,x);break a;case 1:h=k;var w=f.type,u=f.stateNode;if(0===(f.flags&128)&&("function"===typeof w.getDerivedStateFromError||null!==u&&"function"===typeof u.componentDidCatch&&(null===Si||!Si.has(u)))){f.flags|=65536;b&=-b;f.lanes|=b;var F=Ri(f,h,b);fh(f,F);break a}}f=f.return}while(null!==f)}Tk(c)}catch(na){b=na;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}function Kk(){var a=nk.current;nk.current=ai;return null===a?ai:a}
function uj(){if(0===T||3===T||2===T)T=4;null===R||0===(hh&268435455)&&0===(rk&268435455)||Dk(R,Z)}function Jk(a,b){var c=K;K|=2;var d=Kk();if(R!==a||Z!==b)vk=null,Lk(a,b);do try{Uk();break}catch(e){Nk(a,e)}while(1);Qg();K=c;nk.current=d;if(null!==Y)throw Error(p(261));R=null;Z=0;return T}function Uk(){for(;null!==Y;)Vk(Y)}function Mk(){for(;null!==Y&&!cc();)Vk(Y)}function Vk(a){var b=Wk(a.alternate,a,gj);a.memoizedProps=a.pendingProps;null===b?Tk(a):Y=b;ok.current=null}
function Tk(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=Fj(c,b,gj),null!==c){Y=c;return}}else{c=Jj(c,b);if(null!==c){c.flags&=32767;Y=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;else{T=6;Y=null;return}}b=b.sibling;if(null!==b){Y=b;return}Y=b=a}while(null!==b);0===T&&(T=5)}function Qk(a,b,c){var d=C,e=pk.transition;try{pk.transition=null,C=1,Xk(a,b,c,d)}finally{pk.transition=e,C=d}return null}
function Xk(a,b,c,d){do Ik();while(null!==xk);if(0!==(K&6))throw Error(p(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(p(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;Bc(a,f);a===R&&(Y=R=null,Z=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||wk||(wk=!0,Gk(hc,function(){Ik();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=pk.transition;pk.transition=null;
var g=C;C=1;var h=K;K|=4;ok.current=null;Pj(a,c);ek(c,a);Oe(Df);dd=!!Cf;Df=Cf=null;a.current=c;ik(c,a,e);dc();K=h;C=g;pk.transition=f}else a.current=c;wk&&(wk=!1,xk=a,yk=e);f=a.pendingLanes;0===f&&(Si=null);mc(c.stateNode,d);Ek(a,B());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Pi)throw Pi=!1,a=Qi,Qi=null,a;0!==(yk&1)&&0!==a.tag&&Ik();f=a.pendingLanes;0!==(f&1)?a===Ak?zk++:(zk=0,Ak=a):zk=0;jg();return null}
function Ik(){if(null!==xk){var a=Dc(yk),b=pk.transition,c=C;try{pk.transition=null;C=16>a?16:a;if(null===xk)var d=!1;else{a=xk;xk=null;yk=0;if(0!==(K&6))throw Error(p(331));var e=K;K|=4;for(V=a.current;null!==V;){var f=V,g=f.child;if(0!==(V.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var l=h[k];for(V=l;null!==V;){var m=V;switch(m.tag){case 0:case 11:case 15:Qj(8,m,f)}var q=m.child;if(null!==q)q.return=m,V=q;else for(;null!==V;){m=V;var r=m.sibling,y=m.return;Tj(m);if(m===
l){V=null;break}if(null!==r){r.return=y;V=r;break}V=y}}}var n=f.alternate;if(null!==n){var t=n.child;if(null!==t){n.child=null;do{var J=t.sibling;t.sibling=null;t=J}while(null!==t)}}V=f}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,V=g;else b:for(;null!==V;){f=V;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Qj(9,f,f.return)}var x=f.sibling;if(null!==x){x.return=f.return;V=x;break b}V=f.return}}var w=a.current;for(V=w;null!==V;){g=V;var u=g.child;if(0!==(g.subtreeFlags&2064)&&null!==
u)u.return=g,V=u;else b:for(g=w;null!==V;){h=V;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Rj(9,h)}}catch(na){W(h,h.return,na)}if(h===g){V=null;break b}var F=h.sibling;if(null!==F){F.return=h.return;V=F;break b}V=h.return}}K=e;jg();if(lc&&"function"===typeof lc.onPostCommitFiberRoot)try{lc.onPostCommitFiberRoot(kc,a)}catch(na){}d=!0}return d}finally{C=c,pk.transition=b}}return!1}function Yk(a,b,c){b=Ki(c,b);b=Oi(a,b,1);a=dh(a,b,1);b=L();null!==a&&(Ac(a,1,b),Ek(a,b))}
function W(a,b,c){if(3===a.tag)Yk(a,a,c);else for(;null!==b;){if(3===b.tag){Yk(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Si||!Si.has(d))){a=Ki(c,a);a=Ri(b,a,1);b=dh(b,a,1);a=L();null!==b&&(Ac(b,1,a),Ek(b,a));break}}b=b.return}}
function Ui(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=L();a.pingedLanes|=a.suspendedLanes&c;R===a&&(Z&c)===c&&(4===T||3===T&&(Z&130023424)===Z&&500>B()-gk?Lk(a,0):sk|=c);Ek(a,b)}function Zk(a,b){0===b&&(0===(a.mode&1)?b=1:(b=sc,sc<<=1,0===(sc&130023424)&&(sc=4194304)));var c=L();a=Zg(a,b);null!==a&&(Ac(a,b,c),Ek(a,c))}function vj(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Zk(a,c)}
function ck(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);break;case 19:d=a.stateNode;break;default:throw Error(p(314));}null!==d&&d.delete(b);Zk(a,c)}var Wk;
Wk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||Wf.current)Ug=!0;else{if(0===(a.lanes&c)&&0===(b.flags&128))return Ug=!1,zj(a,b,c);Ug=0!==(a.flags&131072)?!0:!1}else Ug=!1,I&&0!==(b.flags&1048576)&&ug(b,ng,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;jj(a,b);a=b.pendingProps;var e=Yf(b,H.current);Tg(b,c);e=Xh(null,b,d,a,e,c);var f=bi();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=
null,Zf(d)?(f=!0,cg(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,ah(b),e.updater=nh,b.stateNode=e,e._reactInternals=b,rh(b,d,a,c),b=kj(null,b,d,!0,f,c)):(b.tag=0,I&&f&&vg(b),Yi(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{jj(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=$k(d);a=Lg(d,a);switch(e){case 0:b=dj(null,b,d,a,c);break a;case 1:b=ij(null,b,d,a,c);break a;case 11:b=Zi(null,b,d,a,c);break a;case 14:b=aj(null,b,d,Lg(d.type,a),c);break a}throw Error(p(306,
d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Lg(d,e),dj(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Lg(d,e),ij(a,b,d,e,c);case 3:a:{lj(b);if(null===a)throw Error(p(387));d=b.pendingProps;f=b.memoizedState;e=f.element;bh(a,b);gh(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=
f,b.memoizedState=f,b.flags&256){e=Ki(Error(p(423)),b);b=mj(a,b,d,c,e);break a}else if(d!==e){e=Ki(Error(p(424)),b);b=mj(a,b,d,c,e);break a}else for(yg=Lf(b.stateNode.containerInfo.firstChild),xg=b,I=!0,zg=null,c=Ch(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{Ig();if(d===e){b=$i(a,b,c);break a}Yi(a,b,d,c)}b=b.child}return b;case 5:return Kh(b),null===a&&Eg(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Ef(d,e)?g=null:null!==f&&Ef(d,f)&&(b.flags|=32),
hj(a,b),Yi(a,b,g,c),b.child;case 6:return null===a&&Eg(b),null;case 13:return pj(a,b,c);case 4:return Ih(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Bh(b,null,d,c):Yi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Lg(d,e),Zi(a,b,d,e,c);case 7:return Yi(a,b,b.pendingProps,c),b.child;case 8:return Yi(a,b,b.pendingProps.children,c),b.child;case 12:return Yi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;
g=e.value;G(Mg,d._currentValue);d._currentValue=g;if(null!==f)if(He(f.value,g)){if(f.children===e.children&&!Wf.current){b=$i(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=ch(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var m=l.pending;null===m?k.next=k:(k.next=m.next,m.next=k);l.pending=k}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);Sg(f.return,
c,b);h.lanes|=c;break}k=k.next}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===f.tag){g=f.return;if(null===g)throw Error(p(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);Sg(g,c,b);g=f.sibling}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return}f=g}Yi(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,d=b.pendingProps.children,Tg(b,c),e=Vg(e),d=d(e),b.flags|=1,Yi(a,b,d,c),
b.child;case 14:return d=b.type,e=Lg(d,b.pendingProps),e=Lg(d.type,e),aj(a,b,d,e,c);case 15:return cj(a,b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Lg(d,e),jj(a,b),b.tag=1,Zf(d)?(a=!0,cg(b)):a=!1,Tg(b,c),ph(b,d,e),rh(b,d,e,c),kj(null,b,d,!0,a,c);case 19:return yj(a,b,c);case 22:return ej(a,b,c)}throw Error(p(156,b.tag));};function Gk(a,b){return ac(a,b)}
function al(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null}function Bg(a,b,c,d){return new al(a,b,c,d)}function bj(a){a=a.prototype;return!(!a||!a.isReactComponent)}
function $k(a){if("function"===typeof a)return bj(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Da)return 11;if(a===Ga)return 14}return 2}
function wh(a,b){var c=a.alternate;null===c?(c=Bg(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function yh(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)bj(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ya:return Ah(c.children,e,f,b);case za:g=8;e|=8;break;case Aa:return a=Bg(12,c,b,e|2),a.elementType=Aa,a.lanes=f,a;case Ea:return a=Bg(13,c,b,e),a.elementType=Ea,a.lanes=f,a;case Fa:return a=Bg(19,c,b,e),a.elementType=Fa,a.lanes=f,a;case Ia:return qj(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case Ba:g=10;break a;case Ca:g=9;break a;case Da:g=11;
break a;case Ga:g=14;break a;case Ha:g=16;d=null;break a}throw Error(p(130,null==a?a:typeof a,""));}b=Bg(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Ah(a,b,c,d){a=Bg(7,a,d,b);a.lanes=c;return a}function qj(a,b,c,d){a=Bg(22,a,d,b);a.elementType=Ia;a.lanes=c;a.stateNode={isHidden:!1};return a}function xh(a,b,c){a=Bg(6,a,null,b);a.lanes=c;return a}
function zh(a,b,c){b=Bg(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function bl(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=0;this.eventTimes=zc(0);this.expirationTimes=zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=zc(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=
null}function cl(a,b,c,d,e,f,g,h,k){a=new bl(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=Bg(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,pendingSuspenseBoundaries:null};ah(f);return a}function dl(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:wa,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
function el(a){if(!a)return Vf;a=a._reactInternals;a:{if(Vb(a)!==a||1!==a.tag)throw Error(p(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(Zf(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return}while(null!==b);throw Error(p(171));}if(1===a.tag){var c=a.type;if(Zf(c))return bg(a,c,b)}return b}
function fl(a,b,c,d,e,f,g,h,k){a=cl(c,d,!0,a,e,f,g,h,k);a.context=el(null);c=a.current;d=L();e=lh(c);f=ch(d,e);f.callback=void 0!==b&&null!==b?b:null;dh(c,f,e);a.current.lanes=e;Ac(a,e,d);Ek(a,d);return a}function gl(a,b,c,d){var e=b.current,f=L(),g=lh(e);c=el(c);null===b.context?b.context=c:b.pendingContext=c;b=ch(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=dh(e,b,g);null!==a&&(mh(a,e,g,f),eh(a,e,g));return g}
function hl(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function il(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function jl(a,b){il(a,b);(a=a.alternate)&&il(a,b)}function kl(){return null}var ll="function"===typeof reportError?reportError:function(a){console.error(a)};function ml(a){this._internalRoot=a}
nl.prototype.render=ml.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(p(409));gl(a,b,null,null)};nl.prototype.unmount=ml.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;Sk(function(){gl(null,a,null,null)});b[uf]=null}};function nl(a){this._internalRoot=a}
nl.prototype.unstable_scheduleHydration=function(a){if(a){var b=Hc();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Qc.length&&0!==b&&b<Qc[c].priority;c++);Qc.splice(c,0,a);0===c&&Vc(a)}};function ol(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType)}function pl(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function ql(){}
function rl(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=hl(g);f.call(a)}}var g=fl(b,d,a,0,null,!1,!1,"",ql);a._reactRootContainer=g;a[uf]=g.current;sf(8===a.nodeType?a.parentNode:a);Sk();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=hl(k);h.call(a)}}var k=cl(a,0,!1,null,null,!1,!1,"",ql);a._reactRootContainer=k;a[uf]=k.current;sf(8===a.nodeType?a.parentNode:a);Sk(function(){gl(b,k,c,d)});return k}
function sl(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=hl(g);h.call(a)}}gl(b,g,a,e)}else g=rl(c,b,a,e,d);return hl(g)}Ec=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=tc(b.pendingLanes);0!==c&&(Cc(b,c|1),Ek(b,B()),0===(K&6)&&(Hj=B()+500,jg()))}break;case 13:Sk(function(){var b=Zg(a,1);if(null!==b){var c=L();mh(b,a,1,c)}}),jl(a,1)}};
Fc=function(a){if(13===a.tag){var b=Zg(a,134217728);if(null!==b){var c=L();mh(b,a,134217728,c)}jl(a,134217728)}};Gc=function(a){if(13===a.tag){var b=lh(a),c=Zg(a,b);if(null!==c){var d=L();mh(c,a,b,d)}jl(a,b)}};Hc=function(){return C};Ic=function(a,b){var c=C;try{return C=a,b()}finally{C=c}};
yb=function(a,b,c){switch(b){case "input":bb(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(p(90));Wa(d);bb(d,e)}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1)}};Gb=Rk;Hb=Sk;
var tl={usingClientEntryPoint:!1,Events:[Cb,ue,Db,Eb,Fb,Rk]},ul={findFiberByHostInstance:Wc,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"};
var vl={bundleType:ul.bundleType,version:ul.version,rendererPackageName:ul.rendererPackageName,rendererConfig:ul.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ua.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=Zb(a);return null===a?null:a.stateNode},findFiberByHostInstance:ul.findFiberByHostInstance||
kl,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var wl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!wl.isDisabled&&wl.supportsFiber)try{kc=wl.inject(vl),lc=wl}catch(a){}}exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=tl;
exports.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!ol(b))throw Error(p(200));return dl(a,b,null,c)};exports.createRoot=function(a,b){if(!ol(a))throw Error(p(299));var c=!1,d="",e=ll;null!==b&&void 0!==b&&(!0===b.unstable_strictMode&&(c=!0),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=cl(a,1,!1,null,null,c,!1,d,e);a[uf]=b.current;sf(8===a.nodeType?a.parentNode:a);return new ml(b)};
exports.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(p(188));a=Object.keys(a).join(",");throw Error(p(268,a));}a=Zb(b);a=null===a?null:a.stateNode;return a};exports.flushSync=function(a){return Sk(a)};exports.hydrate=function(a,b,c){if(!pl(b))throw Error(p(200));return sl(null,a,b,!0,c)};
exports.hydrateRoot=function(a,b,c){if(!ol(a))throw Error(p(405));var d=null!=c&&c.hydratedSources||null,e=!1,f="",g=ll;null!==c&&void 0!==c&&(!0===c.unstable_strictMode&&(e=!0),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=fl(b,null,a,1,null!=c?c:null,e,!1,f,g);a[uf]=b.current;sf(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,
e);return new nl(b)};exports.render=function(a,b,c){if(!pl(b))throw Error(p(200));return sl(null,a,b,!1,c)};exports.unmountComponentAtNode=function(a){if(!pl(a))throw Error(p(40));return a._reactRootContainer?(Sk(function(){sl(null,null,a,!1,function(){a._reactRootContainer=null;a[uf]=null})}),!0):!1};exports.unstable_batchedUpdates=Rk;
exports.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!pl(c))throw Error(p(200));if(null==a||void 0===a._reactInternals)throw Error(p(38));return sl(a,b,c,!1,d)};exports.version="18.2.0-next-9e3b772b8-20220608";


/***/ }),

/***/ 745:
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


var m = __webpack_require__(/*! react-dom */ 935);
if (true) {
  exports.s = m.createRoot;
  __webpack_unused_export__ = m.hydrateRoot;
} else { var i; }


/***/ }),

/***/ 935:
/*!*****************************************!*\
  !*** ./node_modules/react-dom/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(/*! ./cjs/react-dom.production.min.js */ 448);
} else {}


/***/ }),

/***/ 921:
/*!**************************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.production.min.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b=Symbol.for("react.element"),c=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),e=Symbol.for("react.strict_mode"),f=Symbol.for("react.profiler"),g=Symbol.for("react.provider"),h=Symbol.for("react.context"),k=Symbol.for("react.server_context"),l=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),n=Symbol.for("react.suspense_list"),p=Symbol.for("react.memo"),q=Symbol.for("react.lazy"),t=Symbol.for("react.offscreen"),u;u=Symbol.for("react.module.reference");
function v(a){if("object"===typeof a&&null!==a){var r=a.$$typeof;switch(r){case b:switch(a=a.type,a){case d:case f:case e:case m:case n:return a;default:switch(a=a&&a.$$typeof,a){case k:case h:case l:case q:case p:case g:return a;default:return r}}case c:return r}}}__webpack_unused_export__=h;__webpack_unused_export__=g;__webpack_unused_export__=b;__webpack_unused_export__=l;__webpack_unused_export__=d;__webpack_unused_export__=q;__webpack_unused_export__=p;__webpack_unused_export__=c;__webpack_unused_export__=f;__webpack_unused_export__=e;__webpack_unused_export__=m;
__webpack_unused_export__=n;__webpack_unused_export__=function(){return!1};__webpack_unused_export__=function(){return!1};__webpack_unused_export__=function(a){return v(a)===h};__webpack_unused_export__=function(a){return v(a)===g};__webpack_unused_export__=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===b};__webpack_unused_export__=function(a){return v(a)===l};__webpack_unused_export__=function(a){return v(a)===d};__webpack_unused_export__=function(a){return v(a)===q};__webpack_unused_export__=function(a){return v(a)===p};
__webpack_unused_export__=function(a){return v(a)===c};__webpack_unused_export__=function(a){return v(a)===f};__webpack_unused_export__=function(a){return v(a)===e};__webpack_unused_export__=function(a){return v(a)===m};__webpack_unused_export__=function(a){return v(a)===n};
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===d||a===f||a===e||a===m||a===n||a===t||"object"===typeof a&&null!==a&&(a.$$typeof===q||a.$$typeof===p||a.$$typeof===g||a.$$typeof===h||a.$$typeof===l||a.$$typeof===u||void 0!==a.getModuleId)?!0:!1};exports.typeOf=v;


/***/ }),

/***/ 864:
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(/*! ./cjs/react-is.production.min.js */ 921);
} else {}


/***/ }),

/***/ 408:
/*!********************************************************!*\
  !*** ./node_modules/react/cjs/react.production.min.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l=Symbol.for("react.element"),n=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),q=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),t=Symbol.for("react.provider"),u=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),z=Symbol.iterator;function A(a){if(null===a||"object"!==typeof a)return null;a=z&&a[z]||a["@@iterator"];return"function"===typeof a?a:null}
var B={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,D={};function E(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}E.prototype.isReactComponent={};
E.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function F(){}F.prototype=E.prototype;function G(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}var H=G.prototype=new F;
H.constructor=G;C(H,E.prototype);H.isPureReactComponent=!0;var I=Array.isArray,J=Object.prototype.hasOwnProperty,K={current:null},L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,e){var d,c={},k=null,h=null;if(null!=b)for(d in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)J.call(b,d)&&!L.hasOwnProperty(d)&&(c[d]=b[d]);var g=arguments.length-2;if(1===g)c.children=e;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];c.children=f}if(a&&a.defaultProps)for(d in g=a.defaultProps,g)void 0===c[d]&&(c[d]=g[d]);return{$$typeof:l,type:a,key:k,ref:h,props:c,_owner:K.current}}
function N(a,b){return{$$typeof:l,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===l}function escape(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g;function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function R(a,b,e,d,c){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case l:case n:h=!0}}if(h)return h=a,c=c(h),a=""===d?"."+Q(h,0):d,I(c)?(e="",null!=a&&(e=a.replace(P,"$&/")+"/"),R(c,b,e,"",function(a){return a})):null!=c&&(O(c)&&(c=N(c,e+(!c.key||h&&h.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+a)),b.push(c)),1;h=0;d=""===d?".":d+":";if(I(a))for(var g=0;g<a.length;g++){k=
a[g];var f=d+Q(k,g);h+=R(k,b,e,f,c)}else if(f=A(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=d+Q(k,g++),h+=R(k,b,e,f,c);else if("object"===k)throw b=String(a),Error("Objects are not valid as a React child (found: "+("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}
function S(a,b,e){if(null==a)return a;var d=[],c=0;R(a,d,"","",function(a){return b.call(e,a,c++)});return d}function T(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}
var U={current:null},V={transition:null},W={ReactCurrentDispatcher:U,ReactCurrentBatchConfig:V,ReactCurrentOwner:K};exports.Children={map:S,forEach:function(a,b,e){S(a,function(){b.apply(this,arguments)},e)},count:function(a){var b=0;S(a,function(){b++});return b},toArray:function(a){return S(a,function(a){return a})||[]},only:function(a){if(!O(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};exports.Component=E;exports.Fragment=p;
exports.Profiler=r;exports.PureComponent=G;exports.StrictMode=q;exports.Suspense=w;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W;
exports.cloneElement=function(a,b,e){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var d=C({},a.props),c=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=K.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)J.call(b,f)&&!L.hasOwnProperty(f)&&(d[f]=void 0===b[f]&&void 0!==g?g[f]:b[f])}var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){g=Array(f);
for(var m=0;m<f;m++)g[m]=arguments[m+2];d.children=g}return{$$typeof:l,type:a.type,key:c,ref:k,props:d,_owner:h}};exports.createContext=function(a){a={$$typeof:u,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:t,_context:a};return a.Consumer=a};exports.createElement=M;exports.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};
exports.forwardRef=function(a){return{$$typeof:v,render:a}};exports.isValidElement=O;exports.lazy=function(a){return{$$typeof:y,_payload:{_status:-1,_result:a},_init:T}};exports.memo=function(a,b){return{$$typeof:x,type:a,compare:void 0===b?null:b}};exports.startTransition=function(a){var b=V.transition;V.transition={};try{a()}finally{V.transition=b}};exports.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.");};
exports.useCallback=function(a,b){return U.current.useCallback(a,b)};exports.useContext=function(a){return U.current.useContext(a)};exports.useDebugValue=function(){};exports.useDeferredValue=function(a){return U.current.useDeferredValue(a)};exports.useEffect=function(a,b){return U.current.useEffect(a,b)};exports.useId=function(){return U.current.useId()};exports.useImperativeHandle=function(a,b,e){return U.current.useImperativeHandle(a,b,e)};
exports.useInsertionEffect=function(a,b){return U.current.useInsertionEffect(a,b)};exports.useLayoutEffect=function(a,b){return U.current.useLayoutEffect(a,b)};exports.useMemo=function(a,b){return U.current.useMemo(a,b)};exports.useReducer=function(a,b,e){return U.current.useReducer(a,b,e)};exports.useRef=function(a){return U.current.useRef(a)};exports.useState=function(a){return U.current.useState(a)};exports.useSyncExternalStore=function(a,b,e){return U.current.useSyncExternalStore(a,b,e)};
exports.useTransition=function(){return U.current.useTransition()};exports.version="18.2.0";


/***/ }),

/***/ 294:
/*!*************************************!*\
  !*** ./node_modules/react/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(/*! ./cjs/react.production.min.js */ 408);
} else {}


/***/ }),

/***/ 53:
/*!****************************************************************!*\
  !*** ./node_modules/scheduler/cjs/scheduler.production.min.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function f(a,b){var c=a.length;a.push(b);a:for(;0<c;){var d=c-1>>>1,e=a[d];if(0<g(e,b))a[d]=b,a[c]=e,c=d;else break a}}function h(a){return 0===a.length?null:a[0]}function k(a){if(0===a.length)return null;var b=a[0],c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length,w=e>>>1;d<w;){var m=2*(d+1)-1,C=a[m],n=m+1,x=a[n];if(0>g(C,c))n<e&&0>g(x,C)?(a[d]=x,a[n]=c,d=n):(a[d]=C,a[m]=c,d=m);else if(n<e&&0>g(x,c))a[d]=x,a[n]=c,d=n;else break a}}return b}
function g(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()}}else{var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q}}var r=[],t=[],u=1,v=null,y=3,z=!1,A=!1,B=!1,D="function"===typeof setTimeout?setTimeout:null,E="function"===typeof clearTimeout?clearTimeout:null,F="undefined"!==typeof setImmediate?setImmediate:null;
"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function G(a){for(var b=h(t);null!==b;){if(null===b.callback)k(t);else if(b.startTime<=a)k(t),b.sortIndex=b.expirationTime,f(r,b);else break;b=h(t)}}function H(a){B=!1;G(a);if(!A)if(null!==h(r))A=!0,I(J);else{var b=h(t);null!==b&&K(H,b.startTime-a)}}
function J(a,b){A=!1;B&&(B=!1,E(L),L=-1);z=!0;var c=y;try{G(b);for(v=h(r);null!==v&&(!(v.expirationTime>b)||a&&!M());){var d=v.callback;if("function"===typeof d){v.callback=null;y=v.priorityLevel;var e=d(v.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?v.callback=e:v===h(r)&&k(r);G(b)}else k(r);v=h(r)}if(null!==v)var w=!0;else{var m=h(t);null!==m&&K(H,m.startTime-b);w=!1}return w}finally{v=null,y=c,z=!1}}var N=!1,O=null,L=-1,P=5,Q=-1;
function M(){return exports.unstable_now()-Q<P?!1:!0}function R(){if(null!==O){var a=exports.unstable_now();Q=a;var b=!0;try{b=O(!0,a)}finally{b?S():(N=!1,O=null)}}else N=!1}var S;if("function"===typeof F)S=function(){F(R)};else if("undefined"!==typeof MessageChannel){var T=new MessageChannel,U=T.port2;T.port1.onmessage=R;S=function(){U.postMessage(null)}}else S=function(){D(R,0)};function I(a){O=a;N||(N=!0,S())}function K(a,b){L=D(function(){a(exports.unstable_now())},b)}
exports.unstable_IdlePriority=5;exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){A||z||(A=!0,I(J))};
exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<a?Math.floor(1E3/a):5};exports.unstable_getCurrentPriorityLevel=function(){return y};exports.unstable_getFirstCallbackNode=function(){return h(r)};exports.unstable_next=function(a){switch(y){case 1:case 2:case 3:var b=3;break;default:b=y}var c=y;y=b;try{return a()}finally{y=c}};exports.unstable_pauseExecution=function(){};
exports.unstable_requestPaint=function(){};exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=y;y=a;try{return b()}finally{y=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3}e=c+e;a={id:u++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,f(t,a),null===h(r)&&a===h(t)&&(B?(E(L),L=-1):B=!0,K(H,c-d))):(a.sortIndex=e,f(r,a),A||z||(A=!0,I(J)));return a};
exports.unstable_shouldYield=M;exports.unstable_wrapCallback=function(a){var b=y;return function(){var c=y;y=b;try{return a.apply(this,arguments)}finally{y=c}}};


/***/ }),

/***/ 840:
/*!*****************************************!*\
  !*** ./node_modules/scheduler/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(/*! ./cjs/scheduler.production.min.js */ 53);
} else {}


/***/ }),

/***/ 774:
/*!********************************************!*\
  !*** ./node_modules/shallowequal/index.js ***!
  \********************************************/
/***/ ((module) => {

//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};


/***/ }),

/***/ 250:
/*!*************************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.min.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e=__webpack_require__(/*! react */ 294);function h(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var k="function"===typeof Object.is?Object.is:h,l=e.useState,m=e.useEffect,n=e.useLayoutEffect,p=e.useDebugValue;function q(a,b){var d=b(),f=l({inst:{value:d,getSnapshot:b}}),c=f[0].inst,g=f[1];n(function(){c.value=d;c.getSnapshot=b;r(c)&&g({inst:c})},[a,d,b]);m(function(){r(c)&&g({inst:c});return a(function(){r(c)&&g({inst:c})})},[a]);p(d);return d}
function r(a){var b=a.getSnapshot;a=a.value;try{var d=b();return!k(a,d)}catch(f){return!0}}function t(a,b){return b()}var u="undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement?t:q;exports.useSyncExternalStore=void 0!==e.useSyncExternalStore?e.useSyncExternalStore:u;


/***/ }),

/***/ 139:
/*!***************************************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.min.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h=__webpack_require__(/*! react */ 294),n=__webpack_require__(/*! use-sync-external-store/shim */ 688);function p(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var q="function"===typeof Object.is?Object.is:p,r=n.useSyncExternalStore,t=h.useRef,u=h.useEffect,v=h.useMemo,w=h.useDebugValue;
exports.useSyncExternalStoreWithSelector=function(a,b,e,l,g){var c=t(null);if(null===c.current){var f={hasValue:!1,value:null};c.current=f}else f=c.current;c=v(function(){function a(a){if(!c){c=!0;d=a;a=l(a);if(void 0!==g&&f.hasValue){var b=f.value;if(g(b,a))return k=b}return k=a}b=k;if(q(d,a))return b;var e=l(a);if(void 0!==g&&g(b,e))return b;d=a;return k=e}var c=!1,d,k,m=void 0===e?null:e;return[function(){return a(b())},null===m?void 0:function(){return a(m())}]},[b,e,l,g]);var d=r(a,c[0],c[1]);
u(function(){f.hasValue=!0;f.value=d},[d]);w(d);return d};


/***/ }),

/***/ 688:
/*!************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/index.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim.production.min.js */ 250);
} else {}


/***/ }),

/***/ 798:
/*!********************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/with-selector.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim/with-selector.production.min.js */ 139);
} else {}


/***/ }),

/***/ 739:
/*!*********************************************!*\
  !*** ./node_modules/void-elements/index.js ***!
  \*********************************************/
/***/ ((module) => {

/**
 * This file automatically generated from `pre-publish.js`.
 * Do not manually edit.
 */

module.exports = {
  "area": true,
  "base": true,
  "br": true,
  "col": true,
  "embed": true,
  "hr": true,
  "img": true,
  "input": true,
  "link": true,
  "meta": true,
  "param": true,
  "source": true,
  "track": true,
  "wbr": true
};


/***/ }),

/***/ 878:
/*!******************************!*\
  !*** ./src/themes/dark.json ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"dark","globals":{"color":"#909090","background":"#181818","border":"#737373","shadow":"rgba(152,150,150,0.20)"},"button_tiny":{"border":"#fafafa","hover_border":"#8e8e8e"},"button_glow_border":{"border":"#909090","background":"#f5f5f5","color":"#444444","hover_border":"#605f5f","hover_background":"#f8f8f8","hover_box_shadow":"0px 1px 1px rgba(255,255,255,0.1)","hover_color":"#222222","active_border":"#c6c6c6","active_background":"#f6f6f6","active_box_shadow":"0px 0px 1px 2px rgba(255,255,255,0.1)","active_color":"#333333"},"button_solid":{"background":"#f5f5f5","color":"#444444","hover_background":"#f8f8f8","hover_color":"#222222"},"icon_button":{"color":"#aeaeae","hover":"#537dfb"},"radio_button":{"color":"#909090","background":"rgba(0,0,0,0)","border":"#e8e6e6","checkmark":"#e8e6e6"},"checkbox":{"color":"#909090","background":"rgba(0,0,0,0)","border":"#e8e6e6","checkmark":"#e8e6e6"},"switch":{"color":"#909090","background":"#FFFFFF40","backgroundActive":"#FFFFFF40","border":"#FFFFFF40","checkmark":"#B5B5B5","checkmarkActive":"#FFFFFF"},"spinner":"#537dfb","modal_notification":{"background":"#1f1f1f","border":"#4f4d4d","header_border":"#575757","close_button":"#d6d6d6","notification_icon":"#919191","notification_message":"#ffffff","notification_description":"#ffffff","modal_title":"#ffffff","modal_icon_color":"#ffffff","modal_icon_color2":"#8a8a8a","modal_icon_color3":"#ffffff","modal_body":"#ffffff","modal_body2":"#ffffff","button_underline":{"color":"#919191","hover":"#d6d6d6"}},"tooltip":{"color":"#ffffff","background":"rgba(24,24,24,0.95)","border":"#737373"},"scrollbar":{"background":"#181818","background_firefox":"#2c2c2c","border":"#737373","thumb":"#a8a8a8"},"progress_bar":{"background":"#808080","progress":"#84b082","cancel":"#fd7171"},"accordion":{"header":{"background":"#636775","color":"#ffffff"},"content":{"background":"#4c4d51","color":"#ffffff","hyperlink":{"color":"#ffffff","hover":"rgba(255,255,255,0.5)"}}},"header":"#f1f1f1","footer_border_top":"#3e3e3e","formats_table":{"color":"#b8b5b5","row_border":"#3e3e3e","row_hover_background":"rgba(255,255,255,0.1)","media_type_icon":"#ffa200","video_icon":"#a8a8a8","service_icon":{"color":"#5a80ee","hover":"#537dfb"}},"qr_code":{"color":"#f1f1f1","error":"#ff6675"},"social_media_sharing":{"title_color":"#f1f1f1","color":"#aeaeae","num_color":"#ffffff","figure":"#696969","figure_border":"#3b3b3b","figure_num_color":"#ffffff","button_cancel":{"color":"#aeaeae","hover":"#f1f1f1"}}}');

/***/ }),

/***/ 929:
/*!*******************************!*\
  !*** ./src/themes/light.json ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"light","globals":{"color":"#909090","background":"#ffffff","border":"rgba(144,144,144,0.15)","shadow":"rgba(0,0,0,0.32)"},"button_tiny":{"border":"#262626","hover_border":"#8e8e8e"},"button_glow_border":{"border":"#dcdcdc","background":"#f5f5f5","color":"#444;","hover_border":"#c6c6c6","hover_background":"#f8f8f8","hover_box_shadow":"0px 1px 1px rgba(0,0,0,0.1)","hover_color":"#222","active_border":"#c6c6c6","active_background":"#f6f6f6","active_box_shadow":"0px 0px 1px 2px rgba(0,0,0,0.1)","active_color":"#333"},"button_solid":{"background":"#7492e7","color":"#ffffff","hover_background":"#4f70d0","hover_color":"#ffffff"},"icon_button":{"color":"#909090","hover":"#fcb63b"},"radio_button":{"color":"#909090","background":"rgba(0,0,0,0)","border":"#797878","checkmark":"#797878"},"checkbox":{"color":"#909090","background":"rgba(0,0,0,0)","border":"#797878","checkmark":"#797878"},"switch":{"color":"#909090","background":"#3C3C3C40","backgroundActive":"#4F70D040","checkmark":"#8A8A8A","checkmarkActive":"#4F70D0"},"spinner":"#537dfb","modal_notification":{"background":"#ffffff","border":"#4f4d4d","header_border":"#d3d2d2","close_button":"#6f6e6e","notification_icon":"#ffba7d","notification_message":"#1f1f1f","notification_description":"#000000","modal_title":"#000000","modal_icon_color":"#ff7900","modal_icon_color2":"#ffba7d","modal_icon_color3":"#ffb800","modal_body":"#000000","modal_body2":"#7492e7","button_underline":{"color":"#4f4d4d","hover":"#1f1f1f"}},"tooltip":{"color":"#7f7f7f","background":"rgba(255,255,255,0.9)","border":"rgba(144,144,144,0.95)"},"scrollbar":{"background":"#ffffff","background_firefox":"#e6ecfc","border":"#c5c5c5","thumb":"#a8a8a8"},"progress_bar":{"background":"#808080","progress":"#84b082","cancel":"#fd7171"},"accordion":{"header":{"background":"#e6ecfc","color":"#6f91f0"},"content":{"background":"#f9fafe","color":"#909090","hyperlink":{"color":"#909090","hover":"#6f91f0"}}},"header":"#585656","footer_border_top":"#cdcdcd","formats_table":{"color":"#797878","row_border":"#cdcdcd","row_hover_background":"rgba(255,162,0,0.1)","media_type_icon":"#ffa200","video_icon":"#a8a8a8","service_icon":{"color":"#87a5fc","hover":"#537dfb"}},"qr_code":{"color":"#585656","error":"#ff6675"},"social_media_sharing":{"title_color":"#7492e7","color":"#000000","num_color":"#7492e7","figure":"#d4e2fc","figure_border":"#dfe9fd","figure_num_color":"#7492e7","button_cancel":{"color":"#a8a8a8","hover":"#797878"}}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************************************************!*\
  !*** ./src/content-script/index-ext.js + 281 modules ***!
  \*******************************************************/

// NAMESPACE OBJECT: ./src/content-script/services/gv-embed-screenshot/index.js
var gv_embed_screenshot_namespaceObject = {};
__webpack_require__.r(gv_embed_screenshot_namespaceObject);
__webpack_require__.d(gv_embed_screenshot_namespaceObject, {
  Service: () => (Service),
  Widget: () => (normal_screenshot),
  getDir: () => (getDir),
  getLang: () => (getLang),
  getMediaId: () => (get_media_id),
  getMediaInfo: () => (get_media_info),
  getTheme: () => (getTheme),
  isServiceMediaUrl: () => (isServiceMediaUrl),
  isServiceUrl: () => (isServiceUrl),
  makeCanonicalUrl: () => (make_canonical_url),
  snap: () => (snap),
  startDirObserver: () => (startDirObserver),
  startLangObserver: () => (startLangObserver)
});

// NAMESPACE OBJECT: ./src/content-script/services/gv-screenshot/index.js
var gv_screenshot_namespaceObject = {};
__webpack_require__.r(gv_screenshot_namespaceObject);
__webpack_require__.d(gv_screenshot_namespaceObject, {
  Service: () => (gv_screenshot_service_Service),
  Widget: () => (normal_screenshot),
  getDir: () => (getDir),
  getLang: () => (getLang),
  getMediaId: () => (get_media_id),
  getMediaInfo: () => (gv_screenshot_get_media_info),
  getTheme: () => (theme_detect_getTheme),
  isServiceMediaUrl: () => (url_checker_isServiceMediaUrl),
  isServiceUrl: () => (url_checker_isServiceUrl),
  makeCanonicalUrl: () => (make_canonical_url),
  snap: () => (snap),
  startDirObserver: () => (startDirObserver),
  startLangObserver: () => (startLangObserver),
  startThemeObserver: () => (startThemeObserver)
});

// NAMESPACE OBJECT: ./src/content-script/services/ok-embed-screenshot/index.js
var ok_embed_screenshot_namespaceObject = {};
__webpack_require__.r(ok_embed_screenshot_namespaceObject);
__webpack_require__.d(ok_embed_screenshot_namespaceObject, {
  Service: () => (ok_embed_screenshot_service_Service),
  Widget: () => (normal_screenshot),
  getLang: () => (lang_detect_getLang),
  getMediaId: () => (ok_generic_get_media_id),
  getMediaInfo: () => (ok_embed_screenshot_get_media_info),
  getTheme: () => (ok_embed_screenshot_getTheme),
  isServiceMediaUrl: () => (ok_embed_generic_url_checker_isServiceMediaUrl),
  isServiceUrl: () => (ok_embed_generic_url_checker_isServiceUrl),
  makeCanonicalUrl: () => (ok_generic_make_canonical_url),
  snap: () => (ok_generic_snap),
  startLangObserver: () => (lang_detect_startLangObserver)
});

// NAMESPACE OBJECT: ./src/content-script/services/ok-screenshot/index.js
var ok_screenshot_namespaceObject = {};
__webpack_require__.r(ok_screenshot_namespaceObject);
__webpack_require__.d(ok_screenshot_namespaceObject, {
  Service: () => (ok_screenshot_service_Service),
  Widget: () => (normal_screenshot),
  appButtonAlign: () => (appButtonAlign),
  getLang: () => (lang_detect_getLang),
  getMediaId: () => (ok_generic_get_media_id),
  getMediaInfo: () => (ok_screenshot_get_media_info),
  getScrollContainer: () => (getScrollContainer),
  isServiceMediaUrl: () => (ok_generic_url_checker_isServiceMediaUrl),
  isServiceUrl: () => (ok_generic_url_checker_isServiceUrl),
  makeCanonicalUrl: () => (ok_generic_make_canonical_url),
  snap: () => (ok_generic_snap),
  startLangObserver: () => (lang_detect_startLangObserver)
});

;// CONCATENATED MODULE: ./src/config.js
// generated file, don't try modify it! see /configs/src-generation/config.js

/* harmony default export */ const config = ({
  branch: "master",
  hash: "67f9107d",
  version: "0.7.66.5",
  mode: "production",
  brand: "idl",
  project: "screenshot",
  platform: "gv",
  dist: "firefox",
  extType: "idl-screenshot-gv-firefox",
  analyticsType: "idl-helper",
  include: "*Screenshot",
  manifest: "v2",
  wasmFFmpegCacheName: "ffmpeg-0.12.6.wasm",
  wasm: null,
  analyticsUrl: "https://api.videodlservice.com/stat/",
  logsUrl: "https://api.videodlservice.com/logs",
  getUtmUrl: "https://instaloader.net/user",
  socialMediaSharingUrl: "https://instaloader.net/idl-helper?share=1",
  findOrCreateUrl: "https://unidownloader.com/api/storage/findOrCreate",
  shortUrl: "https://unidownloader.com/r/{%bundleIncrement%}",
  serviceUrl: "https://instaloader.net/vid/{%encodedString%}?{%addFrom%}",
  contactUsUrl: "https://instaloader.net/contact-us?{%addFrom%}",
  desktopClientUrl: "https://instaloader.net/idl-client-instagram-downloader-and-converter",
  desktopClientName: "IDL Client",
  webPortalName: "IDL Portal",
  webPortalHostname: "instaloader.net",
  info: {
    name: "idl_helper_info",
    hostnames: [
      "instaloader.net"
    ]
  },
  extensionName: "Screenshot YouTube Video",
  onlineVideoPlatform: "YouTube",
  ratingUrl: "https://addons.mozilla.org/ru/firefox/addon/screenshot-youtube-video/",
  privacyUrl: "https://instaloader.net/privacy-helper",
  eulaUrl: "https://instaloader.net/eula-helper",
  removeHelperUrl: "https://instaloader.net/remove-helper",
  modules: [
    {
      path: "gv-embed-screenshot",
      name: "gvEmbedScreenshot"
    },
    {
      path: "gv-screenshot",
      name: "gvScreenshot"
    },
    {
      path: "ok-embed-screenshot",
      name: "okEmbedScreenshot"
    },
    {
      path: "ok-screenshot",
      name: "okScreenshot"
    }
  ],
  languages: [
    "bg",
    "cs",
    "da",
    "de",
    "en",
    "es",
    "fi",
    "fil",
    "fr",
    "ga",
    "hi",
    "id",
    "it",
    "ja",
    "kk",
    "ko",
    "lt",
    "my",
    "nl",
    "pl",
    "pt_BR",
    "ro",
    "ru",
    "sv",
    "th",
    "tr",
    "uk",
    "vi",
    "zh"
  ],
  ratingIntervals: {
    sinceInstalled: 259200000,
    sinceLastNotNowIntervals: [
      172800000,
      1209600000,
      2592000000,
      5184000000
    ],
    downloadedInRowAim: 3,
    screenshotedAim: 3
  },
});
;// CONCATENATED MODULE: ./src/content-script/utils/check-if-injected.js
const markAsInjected = () => {
  const k = Math.floor(Math.random() * 100);
  const num = k * (2e13 - 1) + (2e7 - 1);
  const tag = btoa(`${num}`);
  const style = document.createElement("style");
  style.id = tag;
  document.head.appendChild(style);
};

const checkIfInjected = () => {
  const keys = Array.from(document.querySelectorAll("head style")).map(element => element.id).filter(id => id);
  const injected = keys.some((key) => {
    try {
      const str = atob(key);
      const num = parseInt(str, 10);
      const decision = num % (2e13 - 1) === 2e7 - 1;
      return decision;
    } catch (e) {
      return false;
    }
  });
  if (!injected) {
    markAsInjected();
  }
  return injected;
};

/* harmony default export */ const check_if_injected = (checkIfInjected);

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js


function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}

;// CONCATENATED MODULE: ./node_modules/redux/es/redux.js


/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
}

// Inlined version of the `symbol-observable` polyfill
var $$observable = (function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
})();

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

// Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
function miniKindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  var type = typeof val;

  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'symbol':
    case 'function':
      {
        return type;
      }
  }

  if (Array.isArray(val)) return 'array';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  var constructorName = ctorName(val);

  switch (constructorName) {
    case 'Symbol':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
    case 'Map':
    case 'Set':
      return constructorName;
  } // other


  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}

function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}

function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}

function kindOf(val) {
  var typeOfVal = typeof val;

  if (false) {}

  return typeOfVal;
}

/**
 * @deprecated
 *
 * **We recommend using the `configureStore` method
 * of the `@reduxjs/toolkit` package**, which replaces `createStore`.
 *
 * Redux Toolkit is our recommended approach for writing Redux logic today,
 * including store setup, reducers, data fetching, and more.
 *
 * **For more details, please read this Redux docs page:**
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * `configureStore` from Redux Toolkit is an improved version of `createStore` that
 * simplifies setup and helps avoid common bugs.
 *
 * You should not be using the `redux` core package by itself today, except for learning purposes.
 * The `createStore` method from the core `redux` package will not be removed, but we encourage
 * all users to migrate to using Redux Toolkit for all Redux code.
 *
 * If you want to use `createStore` without this visual deprecation warning, use
 * the `legacy_createStore` import instead:
 *
 * `import { legacy_createStore as createStore} from 'redux'`
 *
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error( true ? formatProdErrorMessage(0) : 0);
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error( true ? formatProdErrorMessage(1) : 0);
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error( true ? formatProdErrorMessage(2) : 0);
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(3) : 0);
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error( true ? formatProdErrorMessage(4) : 0);
    }

    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(5) : 0);
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error( true ? formatProdErrorMessage(6) : 0);
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error( true ? formatProdErrorMessage(7) : 0);
    }

    if (typeof action.type === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(8) : 0);
    }

    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(9) : 0);
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error( true ? formatProdErrorMessage(10) : 0);
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new Error( true ? formatProdErrorMessage(11) : 0);
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}
/**
 * Creates a Redux store that holds the state tree.
 *
 * **We recommend using `configureStore` from the
 * `@reduxjs/toolkit` package**, which replaces `createStore`:
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

var legacy_createStore = (/* unused pure expression or super */ null && (createStore));

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(12) : 0);
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(13) : 0);
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (false) {}

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if (false) {}

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (false) { var warningMessage; }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var actionType = action && action.type;
        throw new Error( true ? formatProdErrorMessage(14) : 0);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error( true ? formatProdErrorMessage(16) : 0);
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error( true ? formatProdErrorMessage(15) : 0);
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2(_objectSpread2({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}



;// CONCATENATED MODULE: ./node_modules/redux-thunk/es/index.js
/** A function that accepts a potential "extra argument" value to be injected later,
 * and returns an instance of the thunk middleware that uses that value
 */
function createThunkMiddleware(extraArgument) {
  // Standard Redux middleware definition pattern:
  // See: https://redux.js.org/tutorials/fundamentals/part-4-store#writing-custom-middleware
  var middleware = function middleware(_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        // The thunk middleware looks for any functions that were passed to `store.dispatch`.
        // If this "action" is really a function, call it and return the result.
        if (typeof action === 'function') {
          // Inject the store's `dispatch` and `getState` methods, as well as any "extra arg"
          return action(dispatch, getState, extraArgument);
        } // Otherwise, pass the action down the middleware chain as usual


        return next(action);
      };
    };
  };

  return middleware;
}

var thunk = createThunkMiddleware(); // Attach the factory function so users can create a customized version
// with whatever "extra arg" they want to inject into their thunks

thunk.withExtraArgument = createThunkMiddleware;
/* harmony default export */ const es = (thunk);
;// CONCATENATED MODULE: ./src/utils/add-utm.js
const addUtm = (url, utm) => {
  const objUrl = new URL(url);
  const utmSearch = utm ? Object.keys(utm).map(key => `${key}=${encodeURIComponent(utm[key])}`).join("&") : "";
  return utmSearch ? `${url}${objUrl.search ? "&" : "?"}${utmSearch}` : url;
};

/* harmony default export */ const add_utm = (addUtm);

;// CONCATENATED MODULE: ./src/utils/detectors/get-browser.js
const getBrowser = () => {
  // eslint-disable-next-line no-undef
  if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0) return "opera";
  if (typeof InstallTrigger !== "undefined") return "firefox";
  // eslint-disable-next-line
  if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window["safari"] || (typeof safari !== "undefined" && window["safari"].pushNotification))) return "safari";
  const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  if (isChrome && (navigator.userAgent.indexOf("Edg") !== -1)) return "edge";
  if (isChrome) return "chrome";
  return "unknown";
};

/* harmony default export */ const get_browser = (getBrowser);

;// CONCATENATED MODULE: ./src/utils/detectors/get-os.js
const getOS = () => {
  if (window.navigator.userAgent.indexOf("Windows") !== -1) return "windows";
  if (window.navigator.userAgent.indexOf("Mac") !== -1) return "mac-ios";
  if (window.navigator.userAgent.indexOf("X11") !== -1) return "unix";
  if (window.navigator.userAgent.indexOf("Linux") !== -1) return "linux";
  return "unknown";
};

/* harmony default export */ const get_os = (getOS);

;// CONCATENATED MODULE: ./src/utils/background/dispatcher.js
// https://www.goodday.work/t/HPziBH

const oneTimeListeners = {};
const permanentListeners = {};
const multi = {};

const subscribesDispatcher = async (message) => {
  const {
    msg,
    type,
  } = message;
  if (permanentListeners[type]) {
    permanentListeners[type](msg);
  }
};

const messagesDispatcher = async (message) => {
  const {
    err,
    id,
    msg,
  } = message;

  if (oneTimeListeners[id]) {
    if (!err) {
      if (message.multipleresponse) {
        if (!multi[id]) multi[id] = [];
        multi[id].push(message.msg);
        if (message.end) {
          oneTimeListeners[id].resolve(new Uint8Array([].concat(...multi[id])).buffer);
        }
      } else {
        oneTimeListeners[id].resolve(msg);
      }
    } else {
      oneTimeListeners[id].reject(err);
    }
    if (!message.multipleresponse || (message.multipleresponse && message.end)) {
      delete oneTimeListeners[id];
    }
  }
};

const addListener = (event, listener) => {
  permanentListeners[event] = listener;
};



;// CONCATENATED MODULE: ./src/utils/background/index-v2.js
// https://www.goodday.work/t/HPziBH


/* eslint-disable no-undef */
const index_v2_runtime = window.chrome ? window.chrome.runtime : browser.runtime;
/* eslint-enable no-undef */

let port;
const isContentScript = !index_v2_runtime.getBackgroundPage;

if (isContentScript) {
  const connect = () => {
    port = index_v2_runtime.connect();
    port.onDisconnect.addListener(connect);
    port.onMessage.addListener(messagesDispatcher);
  };
  connect();
  index_v2_runtime.onMessage.addListener(subscribesDispatcher);
}

let currentId = 0;
const index_v2_sendMessage = (msg) => {
  currentId++;
  return new Promise((resolve, reject) => {
    oneTimeListeners[currentId] = { reject, resolve };
    port.postMessage({ id: currentId, msg });
  });
};



;// CONCATENATED MODULE: ./node_modules/async-mutex/index.mjs
const E_TIMEOUT = new Error('timeout while waiting for mutex to become available');
const E_ALREADY_LOCKED = new Error('mutex already locked');
const E_CANCELED = new Error('request for lock canceled');

var __awaiter$2 = ( false) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Semaphore {
    constructor(_value, _cancelError = E_CANCELED) {
        this._value = _value;
        this._cancelError = _cancelError;
        this._weightedQueues = [];
        this._weightedWaiters = [];
    }
    acquire(weight = 1) {
        if (weight <= 0)
            throw new Error(`invalid weight ${weight}: must be positive`);
        return new Promise((resolve, reject) => {
            if (!this._weightedQueues[weight - 1])
                this._weightedQueues[weight - 1] = [];
            this._weightedQueues[weight - 1].push({ resolve, reject });
            this._dispatch();
        });
    }
    runExclusive(callback, weight = 1) {
        return __awaiter$2(this, void 0, void 0, function* () {
            const [value, release] = yield this.acquire(weight);
            try {
                return yield callback(value);
            }
            finally {
                release();
            }
        });
    }
    waitForUnlock(weight = 1) {
        if (weight <= 0)
            throw new Error(`invalid weight ${weight}: must be positive`);
        return new Promise((resolve) => {
            if (!this._weightedWaiters[weight - 1])
                this._weightedWaiters[weight - 1] = [];
            this._weightedWaiters[weight - 1].push(resolve);
            this._dispatch();
        });
    }
    isLocked() {
        return this._value <= 0;
    }
    getValue() {
        return this._value;
    }
    setValue(value) {
        this._value = value;
        this._dispatch();
    }
    release(weight = 1) {
        if (weight <= 0)
            throw new Error(`invalid weight ${weight}: must be positive`);
        this._value += weight;
        this._dispatch();
    }
    cancel() {
        this._weightedQueues.forEach((queue) => queue.forEach((entry) => entry.reject(this._cancelError)));
        this._weightedQueues = [];
    }
    _dispatch() {
        var _a;
        for (let weight = this._value; weight > 0; weight--) {
            const queueEntry = (_a = this._weightedQueues[weight - 1]) === null || _a === void 0 ? void 0 : _a.shift();
            if (!queueEntry)
                continue;
            const previousValue = this._value;
            const previousWeight = weight;
            this._value -= weight;
            weight = this._value + 1;
            queueEntry.resolve([previousValue, this._newReleaser(previousWeight)]);
        }
        this._drainUnlockWaiters();
    }
    _newReleaser(weight) {
        let called = false;
        return () => {
            if (called)
                return;
            called = true;
            this.release(weight);
        };
    }
    _drainUnlockWaiters() {
        for (let weight = this._value; weight > 0; weight--) {
            if (!this._weightedWaiters[weight - 1])
                continue;
            this._weightedWaiters[weight - 1].forEach((waiter) => waiter());
            this._weightedWaiters[weight - 1] = [];
        }
    }
}

var __awaiter$1 = ( false) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Mutex {
    constructor(cancelError) {
        this._semaphore = new Semaphore(1, cancelError);
    }
    acquire() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const [, releaser] = yield this._semaphore.acquire();
            return releaser;
        });
    }
    runExclusive(callback) {
        return this._semaphore.runExclusive(() => callback());
    }
    isLocked() {
        return this._semaphore.isLocked();
    }
    waitForUnlock() {
        return this._semaphore.waitForUnlock();
    }
    release() {
        if (this._semaphore.isLocked())
            this._semaphore.release();
    }
    cancel() {
        return this._semaphore.cancel();
    }
}

var __awaiter = ( false) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function withTimeout(sync, timeout, timeoutError = E_TIMEOUT) {
    return {
        acquire: (weight) => {
            if (weight !== undefined && weight <= 0) {
                throw new Error(`invalid weight ${weight}: must be positive`);
            }
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let isTimeout = false;
                const handle = setTimeout(() => {
                    isTimeout = true;
                    reject(timeoutError);
                }, timeout);
                try {
                    const ticket = yield sync.acquire(weight);
                    if (isTimeout) {
                        const release = Array.isArray(ticket) ? ticket[1] : ticket;
                        release();
                    }
                    else {
                        clearTimeout(handle);
                        resolve(ticket);
                    }
                }
                catch (e) {
                    if (!isTimeout) {
                        clearTimeout(handle);
                        reject(e);
                    }
                }
            }));
        },
        runExclusive(callback, weight) {
            return __awaiter(this, void 0, void 0, function* () {
                let release = () => undefined;
                try {
                    const ticket = yield this.acquire(weight);
                    if (Array.isArray(ticket)) {
                        release = ticket[1];
                        return yield callback(ticket[0]);
                    }
                    else {
                        release = ticket;
                        return yield callback();
                    }
                }
                finally {
                    release();
                }
            });
        },
        release(weight) {
            sync.release(weight);
        },
        cancel() {
            return sync.cancel();
        },
        waitForUnlock: (weight) => {
            if (weight !== undefined && weight <= 0) {
                throw new Error(`invalid weight ${weight}: must be positive`);
            }
            return new Promise((resolve, reject) => {
                sync.waitForUnlock(weight).then(resolve);
                setTimeout(() => reject(timeoutError), timeout);
            });
        },
        isLocked: () => sync.isLocked(),
        getValue: () => sync.getValue(),
        setValue: (value) => sync.setValue(value),
    };
}

// eslint-disable-next-lisne @typescript-eslint/explicit-module-boundary-types
function tryAcquire(sync, alreadyAcquiredError = E_ALREADY_LOCKED) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return withTimeout(sync, 0, alreadyAcquiredError);
}



;// CONCATENATED MODULE: ./src/utils/global-storage/index-ext.js



const mutex = new Mutex();

const observers = {};
const globalStorageListener = (msg) => {
  if (msg.key in observers) {
    observers[msg.key].forEach(listener => listener(msg.value));
  }
};
addListener("globalStorage", globalStorageListener);

const get = async key => mutex.runExclusive(async () => index_v2_sendMessage({ key, type: "get" }));

const set = async (key, value) => mutex.runExclusive(async () => index_v2_sendMessage({
  key, type: "set", value,
}));

const getAllKeys = async () => mutex.runExclusive(async () => index_v2_sendMessage({ type: "getAllKeys" }));

const removeItem = async key => mutex.runExclusive(async () => index_v2_sendMessage({ key, type: "removeItem" }));

const observe = (key, listener) => {
  if (!observers[key]) {
    observers[key] = [];
  }
  observers[key].push(listener);
};

/* harmony default export */ const index_ext = ({
  get,
  getAllKeys,
  observe,
  removeItem,
  set,
});

;// CONCATENATED MODULE: ./src/utils/uint8-to-base64.js
const { fromCharCode } = String;
const encode = function encode(uint8array) {
  const { length } = uint8array;
  const output = new Array(length);

  for (let i = 0; i < length; i++) {
    output[i] = fromCharCode(uint8array[i]);
  }

  return btoa(output.join(""));
};

const asCharCode = function asCharCode(c) {
  return c.charCodeAt(0);
};

const uint8_to_base64_decode = function decode(chars) {
  return Uint8Array.from(atob(chars), asCharCode);
};



;// CONCATENATED MODULE: ./src/utils/runtime-ext.js
/* eslint-disable no-undef */
/* harmony default export */ const runtime_ext = (window.chrome ? window.chrome.runtime : browser.runtime);
/* eslint-enable no-undef */

;// CONCATENATED MODULE: ./src/utils/network/utils.js




const getHeaders = (url, headers) => sendMessage({
  headers, type: "getHeaders", url,
});
const sendPost = (url, headers, body) => index_v2_sendMessage({
  body,
  headers,
  type: "sendPost",
  url,
});

const getContent = async (url, options) => {
  const { abortController, timeout } = options;

  const port = runtime.connect();
  const buffer = { chunk: null };
  const downloading = { done: false };
  const onMsg = (({
    done, err, value,
  }) => {
    if (err) buffer.err = new Error();
    if (done) downloading.done = true;
    if (value) buffer.chunk = decode(value);
    buffer.pump();
  });
  port.onMessage.addListener(onMsg);
  port.postMessage({
    timeout,
    type: "getContent",
    url,
  });

  const stream = new ReadableStream({
    cancel() {},
    start(controller) {
      const pump = () => {
        try {
          if (buffer.err) {
            controller.error(buffer.err);
          }
          if (buffer.chunk) {
            controller.enqueue(buffer.chunk);
            buffer.chunk = null;
          }
          if (downloading.done) {
            controller.close();
            port.onMessage.removeListener(onMsg);
          }
        } catch (e) {}
      };
      buffer.pump = pump;
    },
  });
  if (abortController) {
    /* eslint-disable-next-line func-names */
    abortController.signal.onabort = function () {
      port.postMessage({ type: "abort" });
    };
  }
  return stream;
};

const fetchBack = (url, options, responseContentType) => index_v2_sendMessage({
  options,
  responseContentType,
  type: "fetchBack",
  url,
});


;// CONCATENATED MODULE: ./src/utils/network/xhr.js
const xhr_getContent = (url, options) => (
  /* eslint-disable-next-line no-async-promise-executor */
  new Promise(async (resolve, reject) => {
    const { abortController, timeout } = options;
    const abort = () => {
      if (abortController) {
        abortController.abort();
      }
      reject(new Error("timeout"));
    };
    let abortTimeoutId;
    if (timeout) {
      abortTimeoutId = setTimeout(abort, timeout);
    }
    const fetchOptions = {
      method: "GET",
      signal: abortController ? abortController.signal : undefined,
    };
    try {
      const response = await fetch(url, fetchOptions);
      if (abortTimeoutId) clearTimeout(abortTimeoutId);
      if (!response.ok) {
        reject(new Error());
        return;
      }
      resolve(response.body);
    } catch (e) {
      reject(e);
    }
  })
);

const xhr_getHeaders = async (url, headers) => (
  /* eslint-disable-next-line no-async-promise-executor */
  new Promise(async (resolve, reject) => {
    try {
      const options = { method: "HEAD" };
      const response = await fetch(url, options);
      if (!response.ok) {
        reject();
        return;
      }
      const result = headers.map(header => response.headers.get(header));
      resolve(result);
    } catch (err) {
      reject(err);
    }
  })
);

const xhr_fetchBack = async (url, options) => {
  const response = await fetch(url, options);
  /* eslint-disable-next-line no-return-await */
  return await response.json();
};

const xhr_sendPost = (url, _headers, body) => {
  const headers = _headers.reduce((acc, header) => {
    const [name, value] = header;
    acc[name] = value;
    return acc;
  }, {});
  return fetch(url, {
    body,
    headers,
    method: "POST",
  });
};



;// CONCATENATED MODULE: ./src/utils/cache.js


const cacheId = id => `cache2_${id}`;

const removeKey = key => index_ext.removeItem(key);

const validateKey = async (key) => {
  const value = await index_ext.get(key);
  if (value) {
    if (value.expires && Date.now() / 1000 > value.expires) {
      index_ext.removeItem(key);
      return false;
    }
    return value;
  }
  return false;
};

const cache_checkCache = async (id) => {
  const info = validateKey(cacheId(id));
  // const info = await globalStorage.get(cacheId(id));
  return info ? info.data : undefined;
};

let lastValidated;

const validateCache = async () => {
  if (lastValidated && (Date.now() - lastValidated) < 5 * 60 * 1000) {
    return;
  }
  const keys = await index_ext.getAllKeys();
  // TODO move this to migrations
  keys.filter(key => key.startsWith("cache_")).forEach(key => setTimeout(() => removeKey(key), 0));
  keys.filter(key => key.startsWith("cache2_")).forEach(key => setTimeout(() => validateKey(key), 0));
  lastValidated = Date.now();
};

const cache_updateCache = (id, data, expires) => {
  index_ext.set(cacheId(id), { data, expires: expires || (Date.now() / 1000 + 6 * 60 * 60) });
  validateCache();
};



;// CONCATENATED MODULE: ./src/utils/network/index.js





/* eslint-disable no-confusing-arrow */
const network_getHeaders = (url, headers, back) => back ? backGetHeaders(url, headers) : xhrGetHeaders(url, headers);
const makeGetContent = back => back ? backGetContent : xhrGetContent;
const network_sendPost = (url, headers, body, back) => back ? sendPost(url, headers, body) : xhr_sendPost(url, headers, body);
/* eslint-enable no-confusing-arrow */

const getContentLength = async (url, back) => {
  const cached = await checkCache(`content_length_${url}`);
  if (Number.isInteger(cached)) return cached;
  const [contentLengthStr] = await network_getHeaders(url, ["Content-Length"], back);
  const contentLength = parseInt(contentLengthStr, 10);
  if (!Number.isNaN(contentLength)) {
    updateCache(`content_length_${url}`, contentLength);
  }
  return contentLength;
};

const checkDirectDownload = async (url, back) => {
  const [contentDisposition] = await network_getHeaders(url, ["content-disposition"], back);
  if (contentDisposition) {
    return contentDisposition;
  }
  throw (new Error("no content disposition"));
};



;// CONCATENATED MODULE: ./src/utils/analytics/get-send-log.js
// local imports
// config


// utils






const isRestrictedLogType = (log) => {
  const { options } = log;
  return !!options;
};

const checkIfSended = async (data, throttle) => {
  const logsSent = await index_ext.get("logsSent") || [];
  const mediaSource = window.location.href;
  const dataType = data.type;
  const date = Date.now();

  const decision = logsSent.some((log) => {
    if (isRestrictedLogType(log)) return false;
    if (log.mediaSource !== mediaSource) return false;
    if (log.dataType !== dataType) return false;
    if (date - log.date < throttle) return false;
    return true;
  });
  return decision;
};

const needsToBeSend = async (data, options) => {
  let decision;
  if (options) {
    const { probability, throttle } = options;
    if (probability) {
      const coinFlip = Math.random();
      decision = coinFlip <= probability;
    } else if (throttle) {
      decision = await checkIfSended(data, throttle);
    }
  } else {
    decision = await checkIfSended(data, 6 * 60 * 60 * 1000);
  }
  return decision;
};

const needsToBeRemembered = (data, options) => {
  if (options && options.probability) return false;
  return true;
};

const send = (data, store) => {
  const {
    hid,
    utm,
  } = store.getState();
  const {
    branch,
    hash,
    logsUrl,
    type,
    version,
  } = config;
  const mediaSource = window.location.href;
  const { userAgent } = navigator;
  const defData = {
    mediaSource,
    userAgent,
  };

  console.log("SendLog ->", { ...defData, ...data });

  let url = `${logsUrl}?project=down&type=ext`;
  url += `&ext_type=${type}&branch=${encodeURIComponent(branch)}&version=${version}&hash=${hash}`;
  url += `&hid=${hid}&browser=${get_browser()}&os=${get_os()}`;
  url = add_utm(url, utm);
  try {
    const headers = [["Content-Type", "text/plain"]];
    const body = JSON.stringify({ ...defData, ...data });
    network_sendPost(url, headers, body, true);
  } catch (e) { }
};

const remember = async (data, options) => {
  const dataType = data.type;
  const logsSent = await index_ext.get("logsSent") || [];
  const date = Date.now();
  const mediaSource = window.location.href;

  const updatedLogs = logsSent.filter((log) => {
    if (isRestrictedLogType(log)) {
      if (log.dataType !== dataType) return true;
      const { throttle } = options;
      if (throttle) return date - log.date < throttle;
    } else if (date - log.date < 6 * 60 * 60 * 1000) {
      return (log.mediaSource === mediaSource && log.dataType === dataType);
    }
    return false;
  });

  updatedLogs.push({
    dataType,
    date,
    mediaSource,
    options,
  });
  index_ext.set("logsSent", updatedLogs);
};

const getSendLog = store => (
  async (data, options) => {
    const dataType = data.type;
    if (!dataType) {
      console.error("LOGS wrong data: type field is required");
      return;
    }
    if (await needsToBeSend(data, options)) {
      send(data, store);
    } else if (data && !data.probability) {
      console.log(`SendLog: "${dataType}" has already sent recently`);
    }
    if (needsToBeRemembered(data, options)) {
      remember(data, options);
    }
  }
);

/* harmony default export */ const get_send_log = (getSendLog);

;// CONCATENATED MODULE: ./src/utils/analytics/get-send-log-ff.js


const get_send_log_ff_getSendLog = store => (
  async (data, options) => {
    const {
      agreeWithProcessingTechnicalData,
      userAcceptedTerms,
    } = store.getState();
    if (!userAcceptedTerms || !agreeWithProcessingTechnicalData) {
      return;
    }
    const sendLogGeneral = get_send_log(store);
    sendLogGeneral(data, options);
  }
);

/* harmony default export */ const get_send_log_ff = (get_send_log_ff_getSendLog);

;// CONCATENATED MODULE: ./src/content-script/store/actions.js
const actionsTypes = { SET_ALL: "SET_ALL" };

const actions = {
  setAll(all) {
    return { type: actionsTypes.SET_ALL, value: all };
  },
};



;// CONCATENATED MODULE: ./src/content-script/store/globals/get-sync-action.js


/* harmony default export */ const get_sync_action = ((name, setter, callback) => (
  async (dispatch) => {
    const storedValue = await index_ext.get(name);
    dispatch(setter(storedValue));
    if (callback) callback(storedValue);
  }
));

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/agree-with-license.js



const defaultValue = true;
const agree_with_license_name = "agreeWithLicense";

const migrations = {
  name: agree_with_license_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "boolean") {
          return storage.set(agree_with_license_name, defaultValue);
        }
        return null;
      },
    },
  ],
};

/* REDUX */
const agree_with_license_actionsTypes = {
  SET_AGREE_WITH_LICENSE: "SET_AGREE_WITH_LICENSE",
};

const agree_with_license_actions = {
  _setAgreeWithLicense(agree) {
    return { type: agree_with_license_actionsTypes.SET_AGREE_WITH_LICENSE, value: agree };
  },
  syncAgreeWithLicense:
    () => get_sync_action(agree_with_license_name, agree_with_license_actions._setAgreeWithLicense),
  setAgreeWithLicense(agree) {
    return async (dispatch) => {
      index_ext.set(agree_with_license_name, agree);
      dispatch(agree_with_license_actions._setAgreeWithLicense(agree));
    };
  },
};

const reducers = {
  [agree_with_license_actionsTypes.SET_AGREE_WITH_LICENSE]: (state, action) => ({ ...state, agreeWithLicense: action.value }),
};

const getSlice = (store) => {
  const dispatch = store.dispatch.bind(store);

  index_ext.observe(agree_with_license_name, () => store.dispatch(agree_with_license_actions.syncAgreeWithLicense()));
  store.dispatch(agree_with_license_actions.syncAgreeWithLicense());

  return {
    setAgreeWithLicense: value => dispatch(agree_with_license_actions.setAgreeWithLicense(value)),
  };
};

/* harmony default export */ const agree_with_license = ({
  migrations,
  actionsTypes: agree_with_license_actionsTypes,
  actions: agree_with_license_actions,
  reducers,
  getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/agree-with-processing-statistical-data.js



const agree_with_processing_statistical_data_defaultValue = true;
const agree_with_processing_statistical_data_name = "agreeWithProcessingStatisticalData";

const agree_with_processing_statistical_data_migrations = {
  name: agree_with_processing_statistical_data_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "boolean") {
          return storage.set(agree_with_processing_statistical_data_name, agree_with_processing_statistical_data_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* REDUX */
const agree_with_processing_statistical_data_actionsTypes = {
  SET_AGREE_WITH_PROCESSING_STATISTICAL_DATA: "SET_AGREE_WITH_PROCESSING_STATISTICAL_DATA",
};

const agree_with_processing_statistical_data_actions = {
  _setAgreeWithProcessingStatisticalData(agree) {
    return { type: agree_with_processing_statistical_data_actionsTypes.SET_AGREE_WITH_PROCESSING_STATISTICAL_DATA, value: agree };
  },
  syncAgreeWithProcessingStatisticalData:
    () => get_sync_action(agree_with_processing_statistical_data_name, agree_with_processing_statistical_data_actions._setAgreeWithProcessingStatisticalData),
  setAgreeWithProcessingStatisticalData(agree) {
    return async (dispatch) => {
      index_ext.set(agree_with_processing_statistical_data_name, agree);
      dispatch(agree_with_processing_statistical_data_actions._setAgreeWithProcessingStatisticalData(agree));
    };
  },
};

const agree_with_processing_statistical_data_reducers = {
  [agree_with_processing_statistical_data_actionsTypes.SET_AGREE_WITH_PROCESSING_STATISTICAL_DATA]: (state, action) => ({ ...state, agreeWithProcessingStatisticalData: action.value }),
};

const agree_with_processing_statistical_data_getSlice = (store) => {
  const dispatch = store.dispatch.bind(store);

  index_ext.observe(agree_with_processing_statistical_data_name, () => store.dispatch(agree_with_processing_statistical_data_actions.syncAgreeWithProcessingStatisticalData()));
  store.dispatch(agree_with_processing_statistical_data_actions.syncAgreeWithProcessingStatisticalData());

  return {
    setAgreeWithProcessingStatisticalData: value => dispatch(agree_with_processing_statistical_data_actions.setAgreeWithProcessingStatisticalData(value)),
  };
};

/* harmony default export */ const agree_with_processing_statistical_data = ({
  migrations: agree_with_processing_statistical_data_migrations,
  actionsTypes: agree_with_processing_statistical_data_actionsTypes,
  actions: agree_with_processing_statistical_data_actions,
  reducers: agree_with_processing_statistical_data_reducers,
  getSlice: agree_with_processing_statistical_data_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/agree-with-processing-technical-data.js



const agree_with_processing_technical_data_defaultValue = true;
const agree_with_processing_technical_data_name = "agreeWithProcessingTechnicalData";

const agree_with_processing_technical_data_migrations = {
  name: agree_with_processing_technical_data_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "boolean") {
          return storage.set(agree_with_processing_technical_data_name, agree_with_processing_technical_data_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* REDUX */
const agree_with_processing_technical_data_actionsTypes = {
  SET_AGREE_WITH_PROCESSING_TECHNICAL_DATA: "SET_AGREE_WITH_PROCESSING_TECHNICAL_DATA",
};

const agree_with_processing_technical_data_actions = {
  _setAgreeWithProcessingTechnicalData(agree) {
    return { type: agree_with_processing_technical_data_actionsTypes.SET_AGREE_WITH_PROCESSING_TECHNICAL_DATA, value: agree };
  },
  syncAgreeWithProcessingTechnicalData:
    () => get_sync_action(agree_with_processing_technical_data_name, agree_with_processing_technical_data_actions._setAgreeWithProcessingTechnicalData),
  setAgreeWithProcessingTechnicalData(agree) {
    return async (dispatch) => {
      index_ext.set(agree_with_processing_technical_data_name, agree);
      dispatch(agree_with_processing_technical_data_actions._setAgreeWithProcessingTechnicalData(agree));
    };
  },
};

const agree_with_processing_technical_data_reducers = {
  [agree_with_processing_technical_data_actionsTypes.SET_AGREE_WITH_PROCESSING_TECHNICAL_DATA]: (state, action) => ({ ...state, agreeWithProcessingTechnicalData: action.value }),
};

const agree_with_processing_technical_data_getSlice = (store) => {
  const dispatch = store.dispatch.bind(store);

  index_ext.observe(agree_with_processing_technical_data_name, () => store.dispatch(agree_with_processing_technical_data_actions.syncAgreeWithProcessingTechnicalData()));
  store.dispatch(agree_with_processing_technical_data_actions.syncAgreeWithProcessingTechnicalData());

  return {
    setAgreeWithProcessingTechnicalData: value => dispatch(agree_with_processing_technical_data_actions.setAgreeWithProcessingTechnicalData(value)),
  };
};

/* harmony default export */ const agree_with_processing_technical_data = ({
  migrations: agree_with_processing_technical_data_migrations,
  actionsTypes: agree_with_processing_technical_data_actionsTypes,
  actions: agree_with_processing_technical_data_actions,
  reducers: agree_with_processing_technical_data_reducers,
  getSlice: agree_with_processing_technical_data_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/show-gdpr-modal.js



const show_gdpr_modal_defaultValue = false;
const show_gdpr_modal_name = "showGDPRModal";

const show_gdpr_modal_migrations = {
  name: show_gdpr_modal_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "boolean") {
          return storage.set(show_gdpr_modal_name, show_gdpr_modal_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* REDUX */
const show_gdpr_modal_actionsTypes = {
  SET_SHOW_GDPR_MODAL: "SET_SHOW_GDPR_MODAL",
};

const show_gdpr_modal_actions = {
  _setShowGDPRModal(show) {
    return { type: show_gdpr_modal_actionsTypes.SET_SHOW_GDPR_MODAL, value: show };
  },
  syncShowGDPRModal:
    () => get_sync_action(show_gdpr_modal_name, show_gdpr_modal_actions._setShowGDPRModal),
  setShowGDPRModal(show) {
    return async (dispatch) => {
      index_ext.set(show_gdpr_modal_name, show);
      dispatch(show_gdpr_modal_actions._setShowGDPRModal(show));
    };
  },
};

const show_gdpr_modal_reducers = {
  [show_gdpr_modal_actionsTypes.SET_SHOW_GDPR_MODAL]: (state, action) => ({ ...state, showGDPRModal: action.value }),
};

const show_gdpr_modal_getSlice = (store) => {
  const dispatch = store.dispatch.bind(store);

  index_ext.observe(show_gdpr_modal_name, () => store.dispatch(show_gdpr_modal_actions.syncShowGDPRModal()));
  store.dispatch(show_gdpr_modal_actions.syncShowGDPRModal());

  return {
    setShowGDPRModal: value => dispatch(show_gdpr_modal_actions.setShowGDPRModal(value)),
  };
};

/* harmony default export */ const show_gdpr_modal = ({
  migrations: show_gdpr_modal_migrations,
  actionsTypes: show_gdpr_modal_actionsTypes,
  actions: show_gdpr_modal_actions,
  reducers: show_gdpr_modal_reducers,
  getSlice: show_gdpr_modal_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/user-accepted-terms.js



const user_accepted_terms_defaultValue = false;
const user_accepted_terms_name = "userAcceptedTerms";

const user_accepted_terms_migrations = {
  name: user_accepted_terms_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "boolean") {
          return storage.set(user_accepted_terms_name, user_accepted_terms_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* REDUX */
const user_accepted_terms_actionsTypes = {
  SET_USER_ACCEPTED_TERMS: "SET_USER_ACCEPTED_TERMS",
};

const user_accepted_terms_actions = {
  _setUserAcceptedTerms(accepted) {
    return { type: user_accepted_terms_actionsTypes.SET_USER_ACCEPTED_TERMS, value: accepted };
  },
  syncUserAcceptedTerms:
    () => get_sync_action(user_accepted_terms_name, user_accepted_terms_actions._setUserAcceptedTerms),
  setUserAcceptedTerms(accepted) {
    return async (dispatch) => {
      index_ext.set(user_accepted_terms_name, accepted);
      dispatch(user_accepted_terms_actions._setUserAcceptedTerms(accepted));
    };
  },
};

const user_accepted_terms_reducers = {
  [user_accepted_terms_actionsTypes.SET_USER_ACCEPTED_TERMS]: (state, action) => ({ ...state, userAcceptedTerms: action.value }),
};

const user_accepted_terms_getSlice = (store) => {
  const dispatch = store.dispatch.bind(store);

  index_ext.observe(user_accepted_terms_name, () => store.dispatch(user_accepted_terms_actions.syncUserAcceptedTerms()));
  store.dispatch(user_accepted_terms_actions.syncUserAcceptedTerms());

  return {
    setUserAcceptedTerms: value => dispatch(user_accepted_terms_actions.setUserAcceptedTerms(value)),
  };
};

/* harmony default export */ const user_accepted_terms = ({
  migrations: user_accepted_terms_migrations,
  actionsTypes: user_accepted_terms_actionsTypes,
  actions: user_accepted_terms_actions,
  reducers: user_accepted_terms_reducers,
  getSlice: user_accepted_terms_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/extension-installed-stamp.js
const extension_installed_stamp_defaultValue = Date.now();
const extension_installed_stamp_name = "extensionInstalledStamp";

const extension_installed_stamp_migrations = {
  name: extension_installed_stamp_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "number") {
          return storage.set(extension_installed_stamp_name, extension_installed_stamp_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* harmony default export */ const extension_installed_stamp = ({
  migrations: extension_installed_stamp_migrations,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/extension-loaded.js
const extension_loaded_defaultValue = Date.now() - 25 * 60 * 60 * 1000;
const extension_loaded_name = "extensionLoaded";

const extension_loaded_migrations = {
  name: extension_loaded_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "number") {
          return storage.set(extension_loaded_name, extension_loaded_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* harmony default export */ const extension_loaded = ({
  migrations: extension_loaded_migrations,
});

;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/native.js
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const esm_browser_native = ({
  randomUUID
});
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const esm_browser_stringify = ((/* unused pure expression or super */ null && (stringify)));
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v4.js




function v4(options, buf, offset) {
  if (esm_browser_native.randomUUID && !buf && !options) {
    return esm_browser_native.randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return unsafeStringify(rnds);
}

/* harmony default export */ const esm_browser_v4 = (v4);
;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/hid.js




const hid_defaultValue = esm_browser_v4();
const hid_name = "hid";

const hid_migrations = {
  name: hid_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "string") {
          return storage.set(hid_name, hid_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* REDUX */
const hid_actionsTypes = {
  SET_HID: "SET_HID",
};

const hid_actions = {
  setHid: hid => ({ type: hid_actionsTypes.SET_HID, value: hid }),
  syncHid: () => get_sync_action(hid_name, hid_actions.setHid),
};

const hid_reducers = {
  [hid_actionsTypes.SET_HID]: (state, action) => ({ ...state, hid: action.value }),
};

const hid_getSlice = (store) => {
  index_ext.observe(hid_name, () => store.dispatch(hid_actions.syncHid()));
  store.dispatch(hid_actions.syncHid());

  return {};
};

/* harmony default export */ const hid = ({
  migrations: hid_migrations,
  actionsTypes: hid_actionsTypes,
  actions: hid_actions,
  reducers: hid_reducers,
  getSlice: hid_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/install-reported.js
const install_reported_defaultValue = false;
const install_reported_name = "installReported";

const install_reported_migrations = {
  name: install_reported_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "boolean") {
          return storage.set(install_reported_name, install_reported_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* harmony default export */ const install_reported = ({
  migrations: install_reported_migrations,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/lang.js



const lang_defaultValue = "autoDetect";
const lang_name = "lang";

const lang_migrations = {
  name: lang_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "string") {
          return storage.set(lang_name, lang_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* REDUX */
const lang_actionsTypes = {
  SET_LANG: "SET_LANG",
};

const lang_actions = {
  _setLang: value => ({ type: lang_actionsTypes.SET_LANG, value }),
  syncLang: () => get_sync_action(lang_name, lang_actions.setLang),
  setLang(lang) {
    return async (dispatch, getState) => {
      const { module, i18n } = getState();
      const storedLang = await index_ext.get(lang_name);
      if (storedLang !== lang) {
        index_ext.set(lang_name, lang);
      }
      if (i18n) {
        if (lang === "autoDetect") {
          if (module && module.getLang) {
            const pageLang = module.getLang();
            i18n.changeLanguage(pageLang);
          } else {
            i18n.changeLanguage();
          }
        } else {
          i18n.changeLanguage(lang);
        }
      }
      dispatch(lang_actions._setLang(lang));
    };
  },
};

const lang_reducers = {
  [lang_actionsTypes.SET_LANG]: (state, action) => ({ ...state, lang: action.value }),
};

const lang_getSlice = (store) => {
  const dispatch = store.dispatch.bind(store);

  index_ext.observe(lang_name, () => store.dispatch(lang_actions.syncLang()));
  store.dispatch(lang_actions.syncLang());

  return {
    setLang: value => dispatch(lang_actions.setLang(value)),
  };
};

/* harmony default export */ const lang = ({
  migrations: lang_migrations,
  actionsTypes: lang_actionsTypes,
  actions: lang_actions,
  reducers: lang_reducers,
  getSlice: lang_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/last-success-screenshot.js


// TODO !!! rename to snapshot
const last_success_screenshot_defaultValue = 0;
const last_success_screenshot_name = "lastSuccessScreenshot";

const last_success_screenshot_migrations = {
  name: last_success_screenshot_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "number") {
          return storage.set(last_success_screenshot_name, last_success_screenshot_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* REDUX */
const last_success_screenshot_actionsTypes = {
  SET_LAST_SUCCESS_SCREENSHOT: "SET_LAST_SUCCESS_SCREENSHOT", // snapshot
};

const last_success_screenshot_actions = {
  _setLastSuccessScreenshot: stamp => ({ type: last_success_screenshot_actionsTypes.SET_LAST_SUCCESS_SCREENSHOT, value: stamp }),
  syncLastSuccessScreenshot: () => get_sync_action(last_success_screenshot_name, last_success_screenshot_actions._setLastSuccessScreenshot),
  setLastSuccessScreenshot(stamp) {
    return async (dispatch) => {
      index_ext.set(last_success_screenshot_name, stamp);
      dispatch(last_success_screenshot_actions._setLastSuccessScreenshot(stamp));
    };
  },
};

const last_success_screenshot_reducers = {
  [last_success_screenshot_actionsTypes.SET_LAST_SUCCESS_SCREENSHOT]: (state, action) => ({ ...state, lastSuccessScreenshot: action.value }),
};

const last_success_screenshot_getSlice = (store) => {
  const dispatch = store.dispatch.bind(store);

  index_ext.observe(last_success_screenshot_name, () => store.dispatch(last_success_screenshot_actions.syncLastSuccessScreenshot()));
  store.dispatch(last_success_screenshot_actions.syncLastSuccessScreenshot());

  return {
    setLastSuccessScreenshot: stamp => dispatch(last_success_screenshot_actions.setLastSuccessScreenshot(stamp)),
  };
};

/* harmony default export */ const last_success_screenshot = ({
  migrations: last_success_screenshot_migrations,
  actionsTypes: last_success_screenshot_actionsTypes,
  actions: last_success_screenshot_actions,
  reducers: last_success_screenshot_reducers,
  getSlice: last_success_screenshot_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/rating-modal-last-check.js



const rating_modal_last_check_defaultValue = Date.now();
const rating_modal_last_check_name = "ratingModalLastCheck";

const rating_modal_last_check_migrations = {
  name: rating_modal_last_check_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "number") {
          return storage.set(rating_modal_last_check_name, rating_modal_last_check_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* REDUX */
const rating_modal_last_check_actionsTypes = {
  SET_RATING_MODAL_LAST_CHECK: "SET_RATING_MODAL_LAST_CHECK",
};

const rating_modal_last_check_actions = {
  _setRatingModalLastCheck: stamp => ({ type: rating_modal_last_check_actionsTypes.SET_RATING_MODAL_LAST_CHECK, value: stamp }),
  syncRatingModalLastCheck: () => get_sync_action(rating_modal_last_check_name, rating_modal_last_check_actions._setRatingModalLastCheck),
  setRatingModalLastCheck(stamp) {
    return async (dispatch) => {
      index_ext.set(rating_modal_last_check_name, stamp);
      dispatch(rating_modal_last_check_actions._setRatingModalLastCheck(stamp));
    };
  },
};

const rating_modal_last_check_reducers = {
  [rating_modal_last_check_actionsTypes.SET_RATING_MODAL_LAST_CHECK]: (state, action) => ({ ...state, ratingModalLastCheck: action.value }),
};

const rating_modal_last_check_getSlice = (store) => {
  const dispatch = store.dispatch.bind(store);

  index_ext.observe(rating_modal_last_check_name, () => store.dispatch(rating_modal_last_check_actions.syncRatingModalLastCheck()));
  store.dispatch(rating_modal_last_check_actions.syncRatingModalLastCheck());

  return {
    setRatingModalLastCheck: value => dispatch(rating_modal_last_check_actions.setRatingModalLastCheck(value)),
  };
};

/* harmony default export */ const rating_modal_last_check = ({
  migrations: rating_modal_last_check_migrations,
  actionsTypes: rating_modal_last_check_actionsTypes,
  actions: rating_modal_last_check_actions,
  reducers: rating_modal_last_check_reducers,
  getSlice: rating_modal_last_check_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/rating-modal-last-not-now.js



const rating_modal_last_not_now_defaultValue = 0;
const rating_modal_last_not_now_name = "ratingModalLastNotNow";

const rating_modal_last_not_now_migrations = {
  name: rating_modal_last_not_now_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "number") {
          return storage.set(rating_modal_last_not_now_name, rating_modal_last_not_now_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* REDUX */
const rating_modal_last_not_now_actionsTypes = {
  SET_RATING_MODAL_LAST_NOT_NOW: "SET_RATING_MODAL_LAST_NOT_NOW",
};

const rating_modal_last_not_now_actions = {
  _setRatingModalLastNotNow(stamp) {
    return { type: rating_modal_last_not_now_actionsTypes.SET_RATING_MODAL_LAST_NOT_NOW, value: stamp };
  },
  syncRatingModalLastNotNow:
    () => get_sync_action(rating_modal_last_not_now_name, rating_modal_last_not_now_actions._setRatingModalLastNotNow),
  setRatingModalLastNotNow(stamp) {
    return async (dispatch) => {
      index_ext.set(rating_modal_last_not_now_name, stamp);
      dispatch(rating_modal_last_not_now_actions._setRatingModalLastNotNow(stamp));
    };
  },
};

const rating_modal_last_not_now_reducers = {
  [rating_modal_last_not_now_actionsTypes.SET_RATING_MODAL_LAST_NOT_NOW]: (state, action) => ({ ...state, ratingModalLastNotNow: action.value }),
};

const rating_modal_last_not_now_getSlice = (store) => {
  const dispatch = store.dispatch.bind(store);

  index_ext.observe(rating_modal_last_not_now_name, () => store.dispatch(rating_modal_last_not_now_actions.syncRatingModalLastNotNow()));
  store.dispatch(rating_modal_last_not_now_actions.syncRatingModalLastNotNow());

  return {
    setRatingModalLastNotNow: value => dispatch(rating_modal_last_not_now_actions.setRatingModalLastNotNow(value)),
  };
};

/* harmony default export */ const rating_modal_last_not_now = ({
  migrations: rating_modal_last_not_now_migrations,
  actionsTypes: rating_modal_last_not_now_actionsTypes,
  actions: rating_modal_last_not_now_actions,
  reducers: rating_modal_last_not_now_reducers,
  getSlice: rating_modal_last_not_now_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/rating-modal-never-show.js



const rating_modal_never_show_defaultValue = false;
const rating_modal_never_show_name = "ratingModalNeverShow";

const rating_modal_never_show_migrations = {
  name: rating_modal_never_show_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "boolean") {
          return storage.set(rating_modal_never_show_name, rating_modal_never_show_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* REDUX */
const rating_modal_never_show_actionsTypes = {
  SET_RATING_MODAL_NEVER_SHOW: "SET_RATING_MODAL_NEVER_SHOW",
};

const rating_modal_never_show_actions = {
  _setRatingModalNeverShow: value => ({ type: rating_modal_never_show_actionsTypes.SET_RATING_MODAL_NEVER_SHOW, value }),
  syncRatingModalNeverShow: () => get_sync_action(rating_modal_never_show_name, rating_modal_never_show_actions._setRatingModalNeverShow),
  setRatingModalNeverShow(stamp) {
    return async (dispatch) => {
      index_ext.set(rating_modal_never_show_name, stamp);
      dispatch(rating_modal_never_show_actions._setRatingModalNeverShow(stamp));
    };
  },
};

const rating_modal_never_show_reducers = {
  [rating_modal_never_show_actionsTypes.SET_RATING_MODAL_NEVER_SHOW]: (state, action) => ({ ...state, ratingModalNeverShow: action.value }),
};

const rating_modal_never_show_getSlice = (store) => {
  const dispatch = store.dispatch.bind(store);

  index_ext.observe(rating_modal_never_show_name, () => store.dispatch(rating_modal_never_show_actions.syncRatingModalNeverShow()));
  store.dispatch(rating_modal_never_show_actions.syncRatingModalNeverShow());

  return {
    setRatingModalNeverShow: value => dispatch(rating_modal_never_show_actions.setRatingModalNeverShow(value)),
  };
};

/* harmony default export */ const rating_modal_never_show = ({
  migrations: rating_modal_never_show_migrations,
  actionsTypes: rating_modal_never_show_actionsTypes,
  actions: rating_modal_never_show_actions,
  reducers: rating_modal_never_show_reducers,
  getSlice: rating_modal_never_show_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/rating-modal-shown-count.js



const rating_modal_shown_count_defaultValue = 0;
const rating_modal_shown_count_name = "ratingModalShownCount";

const rating_modal_shown_count_migrations = {
  name: rating_modal_shown_count_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "number") {
          return storage.set(rating_modal_shown_count_name, rating_modal_shown_count_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* REDUX */
const rating_modal_shown_count_actionsTypes = {
  SET_RATING_MODAL_SHOWN_COUNT: "SET_RATING_MODAL_SHOWN_COUNT",
};

const rating_modal_shown_count_actions = {
  _setRatingModalShownCount(count) {
    return { type: rating_modal_shown_count_actionsTypes.SET_RATING_MODAL_SHOWN_COUNT, value: count };
  },
  syncRatingModalShownCount: () => get_sync_action(rating_modal_shown_count_name, rating_modal_shown_count_actions._setRatingModalShownCount),
  incrementRatingModalShownCount() {
    return async (dispatch, getState) => {
      let { ratingModalShownCount } = getState();
      ratingModalShownCount++;
      index_ext.set(rating_modal_shown_count_name, ratingModalShownCount);
      dispatch(rating_modal_shown_count_actions._setRatingModalShownCount(ratingModalShownCount));
    };
  },
};

const rating_modal_shown_count_reducers = {
  [rating_modal_shown_count_actionsTypes.SET_RATING_MODAL_SHOWN_COUNT]: (state, action) => ({ ...state, ratingModalShownCount: action.value }),
};

const rating_modal_shown_count_getSlice = (store) => {
  const dispatch = store.dispatch.bind(store);

  index_ext.observe(rating_modal_shown_count_name, () => store.dispatch(rating_modal_shown_count_actions.syncRatingModalShownCount()));
  store.dispatch(rating_modal_shown_count_actions.syncRatingModalShownCount());

  return {
    incrementRatingModalShownCount: () => dispatch(rating_modal_shown_count_actions.incrementRatingModalShownCount()),
  };
};

/* harmony default export */ const rating_modal_shown_count = ({
  migrations: rating_modal_shown_count_migrations,
  actionsTypes: rating_modal_shown_count_actionsTypes,
  actions: rating_modal_shown_count_actions,
  reducers: rating_modal_shown_count_reducers,
  getSlice: rating_modal_shown_count_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/screenshots-count.js



const screenshots_count_defaultValue = 0;
const screenshots_count_name = "screenshotsCount";

const screenshots_count_migrations = {
  name: screenshots_count_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "number") {
          return storage.set(screenshots_count_name, screenshots_count_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* REDUX */
const screenshots_count_actionsTypes = {
  SET_SCREENSHOTS_COUNT: "SET_SCREENSHOTS_COUNT",
};

const screenshots_count_actions = {
  _setScreenshotsCount: count => ({ type: screenshots_count_actionsTypes.SET_SCREENSHOTS_COUNT, value: count }),
  syncScreenshots: () => get_sync_action(screenshots_count_name, screenshots_count_actions._setScreenshotsCount),
  incrementScreenshots() {
    return async (dispatch, getState) => {
      let { screenshotsCount } = getState();
      screenshotsCount++;
      index_ext.set(screenshots_count_name, screenshotsCount);
      dispatch(screenshots_count_actions._setScreenshotsCount(screenshotsCount));
    };
  },
};

const screenshots_count_reducers = {
  [screenshots_count_actionsTypes.SET_SCREENSHOTS_COUNT]: (state, action) => ({ ...state, screenshotsCount: action.value }),
};

const screenshots_count_getSlice = (store) => {
  const dispatch = store.dispatch.bind(store);

  index_ext.observe(screenshots_count_name, () => store.dispatch(screenshots_count_actions.syncScreenshots()));
  store.dispatch(screenshots_count_actions.syncScreenshots());

  return {
    screenshotsCount: 0,
    incrementScreenshots: () => dispatch(screenshots_count_actions.incrementScreenshots()),
  };
};

/* harmony default export */ const screenshots_count = ({
  migrations: screenshots_count_migrations,
  actionsTypes: screenshots_count_actionsTypes,
  actions: screenshots_count_actions,
  reducers: screenshots_count_reducers,
  getSlice: screenshots_count_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/show-snapshot-button.js



const show_snapshot_button_defaultValue = true;
const show_snapshot_button_name = "showSnapshotButton";

const show_snapshot_button_migrations = {
  name: show_snapshot_button_name,
  ups: [
    {
      v: 1,
      up: (storage, currentValue) => {
        if (typeof currentValue !== "boolean") {
          return storage.set(show_snapshot_button_name, show_snapshot_button_defaultValue);
        }
        return null;
      },
    },
  ],
};

/* REDUX */
const show_snapshot_button_actionsTypes = {
  SET_SHOW_SNAPSHOT_BUTTON: "SET_SHOW_SNAPSHOT_BUTTON",
};

const show_snapshot_button_actions = {
  _setShowSnapshotButton(value) {
    return { type: show_snapshot_button_actionsTypes.SET_SHOW_SNAPSHOT_BUTTON, value };
  },
  syncShowSnapshotButton:
    () => get_sync_action(show_snapshot_button_name, show_snapshot_button_actions._setShowSnapshotButton),
  setShowSnapshotButton(value) {
    return async (dispatch) => {
      index_ext.set(show_snapshot_button_name, value);
      dispatch(show_snapshot_button_actions._setShowSnapshotButton(value));
    };
  },
};

const show_snapshot_button_reducers = {
  [show_snapshot_button_actionsTypes.SET_SHOW_SNAPSHOT_BUTTON]: (state, action) => ({ ...state, showSnapshotButton: action.value }),
};

const show_snapshot_button_getSlice = (store) => {
  const dispatch = store.dispatch.bind(store);

  index_ext.observe(show_snapshot_button_name, () => store.dispatch(show_snapshot_button_actions.syncShowSnapshotButton()));
  store.dispatch(show_snapshot_button_actions.syncShowSnapshotButton());

  return {
    setShowSnapshotButton: value => dispatch(show_snapshot_button_actions.setShowSnapshotButton(value)),
  };
};

/* harmony default export */ const show_snapshot_button = ({
  migrations: show_snapshot_button_migrations,
  actionsTypes: show_snapshot_button_actionsTypes,
  actions: show_snapshot_button_actions,
  reducers: show_snapshot_button_reducers,
  getSlice: show_snapshot_button_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/keys/utm.js




// TODO make api class and move it there

const utm_name = "utm";
const utm_defaultValue = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
};

const fetchUtm = async () => {
  const res = await fetch(config.getUtmUrl, { credentials: "include", mode: "cors" });
  if (res.status === 200) {
    return res.json();
  }
  throw new Error("fetching utm failed");
};

const utm_migrations = {
  name: utm_name,
  ups: [
    {
      v: 1,
      up: async (storage, currentValue) => {
        if (typeof currentValue !== "object" ||
            currentValue === null ||
            !("utm_term" in currentValue && "utm_content" in currentValue)
        ) {
          let utm;
          try {
            utm = await fetchUtm();
          } catch (e) {
            utm = utm_defaultValue;
          }
          return storage.set(utm_name, utm);
        }
        return null;
      },
    },
  ],
};

/* REDUX */
const utm_actionsTypes = {
  SET_UTM: "SET_UTM",
};

const utm_actions = {
  setUtm: utm => ({ type: utm_actionsTypes.SET_UTM, value: utm }),
  syncUtm: () => get_sync_action(utm_name, utm_actions.setUtm),
};

const utm_reducers = {
  [utm_actionsTypes.SET_UTM]: (state, action) => ({ ...state, utm: action.value }),
};

const utm_getSlice = (store) => {
  index_ext.observe(utm_name, () => store.dispatch(utm_actions.syncUtm()));
  store.dispatch(utm_actions.syncUtm());

  return {};
};

/* harmony default export */ const utm = ({
  migrations: utm_migrations,
  actionsTypes: utm_actionsTypes,
  actions: utm_actions,
  reducers: utm_reducers,
  getSlice: utm_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/globals/globals-list.js
// It's generated code, don't try to change it, see /configs/src-generation/store.js instead




















/* harmony default export */ const globals_list = ([
  agree_with_license,
  agree_with_processing_statistical_data,
  agree_with_processing_technical_data,
  show_gdpr_modal,
  user_accepted_terms,
  extension_installed_stamp,
  extension_loaded,
  hid,
  install_reported,
  lang,
  last_success_screenshot,
  rating_modal_last_check,
  rating_modal_last_not_now,
  rating_modal_never_show,
  rating_modal_shown_count,
  screenshots_count,
  show_snapshot_button,
  utm,
]);

;// CONCATENATED MODULE: ./src/content-script/store/globals/index.js
// local imports
// store



const globals_actionsTypes = (
  globals_list.map(module => module.actionsTypes)
    .filter(_actionsTypes => !!_actionsTypes)
    .reduce((acc, _actionsTypes) => ({ ...acc, ..._actionsTypes }), {})
);

const globals_actions = (
  globals_list.map(module => module.actions)
    .filter(_actions => !!_actions)
    .reduce((acc, _actions) => ({ ...acc, ..._actions }), {})
);

const globals_reducers = (
  globals_list.map(module => module.reducers)
    .filter(_reducers => !!_reducers)
    .reduce((acc, _reducers) => ({ ...acc, ..._reducers }), {})
);

const slices = (
  globals_list.map(module => module.getSlice)
    .filter(_getSlice => !!_getSlice)
);

const selectors = (
  globals_list.map(module => module.selectors)
    .filter(_selectors => !!_selectors)
    .reduce((acc, _selectors) => ({ ...acc, ..._selectors }), {})
);

const afterEffects = (
  globals_list.map(module => module.after)
    .filter(_after => !!_after)
);



;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/body-scroll-width.js
/* REDUX */
const body_scroll_width_actionsTypes = {
  SET_BODY_SCROLLBAR_WIDTH: "SET_BODY_SCROLLBAR_WIDTH",
};

const body_scroll_width_actions = {
  setBodyScrollbarWidth: bodyScrollbarWidth => ({ type: body_scroll_width_actionsTypes.SET_BODY_SCROLLBAR_WIDTH, value: bodyScrollbarWidth }),
};

const body_scroll_width_reducers = {
  [body_scroll_width_actionsTypes.SET_BODY_SCROLLBAR_WIDTH]: (state, action) => ({ ...state, bodyScrollbarWidth: action.value }),
};

const body_scroll_width_getSlice = store => ({
  setBodyScrollbarWidth: value => store.dispatch(body_scroll_width_actions.setBodyScrollbarWidth(value)),
});

/* harmony default export */ const body_scroll_width = ({
  actionsTypes: body_scroll_width_actionsTypes,
  actions: body_scroll_width_actions,
  reducers: body_scroll_width_reducers,
  getSlice: body_scroll_width_getSlice,
});

;// CONCATENATED MODULE: ./node_modules/reselect/es/defaultMemoize.js
// Cache implementation based on Erik Rasmussen's `lru-memoize`:
// https://github.com/erikras/lru-memoize
var NOT_FOUND = 'NOT_FOUND';

function createSingletonCache(equals) {
  var entry;
  return {
    get: function get(key) {
      if (entry && equals(entry.key, key)) {
        return entry.value;
      }

      return NOT_FOUND;
    },
    put: function put(key, value) {
      entry = {
        key: key,
        value: value
      };
    },
    getEntries: function getEntries() {
      return entry ? [entry] : [];
    },
    clear: function clear() {
      entry = undefined;
    }
  };
}

function createLruCache(maxSize, equals) {
  var entries = [];

  function get(key) {
    var cacheIndex = entries.findIndex(function (entry) {
      return equals(key, entry.key);
    }); // We found a cached entry

    if (cacheIndex > -1) {
      var entry = entries[cacheIndex]; // Cached entry not at top of cache, move it to the top

      if (cacheIndex > 0) {
        entries.splice(cacheIndex, 1);
        entries.unshift(entry);
      }

      return entry.value;
    } // No entry found in cache, return sentinel


    return NOT_FOUND;
  }

  function put(key, value) {
    if (get(key) === NOT_FOUND) {
      // TODO Is unshift slow?
      entries.unshift({
        key: key,
        value: value
      });

      if (entries.length > maxSize) {
        entries.pop();
      }
    }
  }

  function getEntries() {
    return entries;
  }

  function clear() {
    entries = [];
  }

  return {
    get: get,
    put: put,
    getEntries: getEntries,
    clear: clear
  };
}

var defaultEqualityCheck = function defaultEqualityCheck(a, b) {
  return a === b;
};
function createCacheKeyComparator(equalityCheck) {
  return function areArgumentsShallowlyEqual(prev, next) {
    if (prev === null || next === null || prev.length !== next.length) {
      return false;
    } // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.


    var length = prev.length;

    for (var i = 0; i < length; i++) {
      if (!equalityCheck(prev[i], next[i])) {
        return false;
      }
    }

    return true;
  };
}
// defaultMemoize now supports a configurable cache size with LRU behavior,
// and optional comparison of the result value with existing values
function defaultMemoize(func, equalityCheckOrOptions) {
  var providedOptions = typeof equalityCheckOrOptions === 'object' ? equalityCheckOrOptions : {
    equalityCheck: equalityCheckOrOptions
  };
  var _providedOptions$equa = providedOptions.equalityCheck,
      equalityCheck = _providedOptions$equa === void 0 ? defaultEqualityCheck : _providedOptions$equa,
      _providedOptions$maxS = providedOptions.maxSize,
      maxSize = _providedOptions$maxS === void 0 ? 1 : _providedOptions$maxS,
      resultEqualityCheck = providedOptions.resultEqualityCheck;
  var comparator = createCacheKeyComparator(equalityCheck);
  var cache = maxSize === 1 ? createSingletonCache(comparator) : createLruCache(maxSize, comparator); // we reference arguments instead of spreading them for performance reasons

  function memoized() {
    var value = cache.get(arguments);

    if (value === NOT_FOUND) {
      // @ts-ignore
      value = func.apply(null, arguments);

      if (resultEqualityCheck) {
        var entries = cache.getEntries();
        var matchingEntry = entries.find(function (entry) {
          return resultEqualityCheck(entry.value, value);
        });

        if (matchingEntry) {
          value = matchingEntry.value;
        }
      }

      cache.put(arguments, value);
    }

    return value;
  }

  memoized.clearCache = function () {
    return cache.clear();
  };

  return memoized;
}
;// CONCATENATED MODULE: ./node_modules/reselect/es/index.js



function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep === 'function' ? "function " + (dep.name || 'unnamed') + "()" : typeof dep;
    }).join(', ');
    throw new Error("createSelector expects all input-selectors to be functions, but received the following types: [" + dependencyTypes + "]");
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len = arguments.length, memoizeOptionsFromArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptionsFromArgs[_key - 1] = arguments[_key];
  }

  var createSelector = function createSelector() {
    for (var _len2 = arguments.length, funcs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    var _recomputations = 0;

    var _lastResult; // Due to the intricacies of rest params, we can't do an optional arg after `...funcs`.
    // So, start by declaring the default value here.
    // (And yes, the words 'memoize' and 'options' appear too many times in this next sequence.)


    var directlyPassedOptions = {
      memoizeOptions: undefined
    }; // Normally, the result func or "output selector" is the last arg

    var resultFunc = funcs.pop(); // If the result func is actually an _object_, assume it's our options object

    if (typeof resultFunc === 'object') {
      directlyPassedOptions = resultFunc; // and pop the real result func off

      resultFunc = funcs.pop();
    }

    if (typeof resultFunc !== 'function') {
      throw new Error("createSelector expects an output function after the inputs, but received: [" + typeof resultFunc + "]");
    } // Determine which set of options we're using. Prefer options passed directly,
    // but fall back to options given to createSelectorCreator.


    var _directlyPassedOption = directlyPassedOptions,
        _directlyPassedOption2 = _directlyPassedOption.memoizeOptions,
        memoizeOptions = _directlyPassedOption2 === void 0 ? memoizeOptionsFromArgs : _directlyPassedOption2; // Simplifying assumption: it's unlikely that the first options arg of the provided memoizer
    // is an array. In most libs I've looked at, it's an equality function or options object.
    // Based on that, if `memoizeOptions` _is_ an array, we assume it's a full
    // user-provided array of options. Otherwise, it must be just the _first_ arg, and so
    // we wrap it in an array so we can apply it.

    var finalMemoizeOptions = Array.isArray(memoizeOptions) ? memoizeOptions : [memoizeOptions];
    var dependencies = getDependencies(funcs);
    var memoizedResultFunc = memoize.apply(void 0, [function recomputationWrapper() {
      _recomputations++; // apply arguments instead of spreading for performance.

      return resultFunc.apply(null, arguments);
    }].concat(finalMemoizeOptions)); // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.

    var selector = memoize(function dependenciesChecker() {
      var params = [];
      var length = dependencies.length;

      for (var i = 0; i < length; i++) {
        // apply arguments instead of spreading and mutate a local list of params for performance.
        // @ts-ignore
        params.push(dependencies[i].apply(null, arguments));
      } // apply arguments instead of spreading for performance.


      _lastResult = memoizedResultFunc.apply(null, params);
      return _lastResult;
    });
    Object.assign(selector, {
      resultFunc: resultFunc,
      memoizedResultFunc: memoizedResultFunc,
      dependencies: dependencies,
      lastResult: function lastResult() {
        return _lastResult;
      },
      recomputations: function recomputations() {
        return _recomputations;
      },
      resetRecomputations: function resetRecomputations() {
        return _recomputations = 0;
      }
    });
    return selector;
  }; // @ts-ignore


  return createSelector;
}
var createSelector = /* #__PURE__ */createSelectorCreator(defaultMemoize);
// Manual definition of state and output arguments
var createStructuredSelector = function createStructuredSelector(selectors, selectorCreator) {
  if (selectorCreator === void 0) {
    selectorCreator = createSelector;
  }

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ("where each property is a selector, instead received a " + typeof selectors));
  }

  var objectKeys = Object.keys(selectors);
  var resultSelector = selectorCreator( // @ts-ignore
  objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len3 = arguments.length, values = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      values[_key3] = arguments[_key3];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
  return resultSelector;
};
;// CONCATENATED MODULE: ./src/utils/media-checkers.js
const isVideoMp4 = item => item.mimeType.includes("video/mp4");
const isVideoWebm = item => item.mimeType.includes("video/webm");

const isAudioMp4 = item => item.mimeType.includes("audio/mp4");
const isAudioWebm = item => item.mimeType.includes("audio/webm");
const isAudioMp3 = item => item.mimeType.includes("audio/mp3");

const isWebm = item => isVideoWebm(item) || isAudioWebm(item);

const isVideo = item => item.mimeType && item.mimeType.includes("video");
const isAudio = item => item.mimeType && item.mimeType.includes("audio");
const isMuxable = item => isVideo(item) && item.audio && isAudio(item.audio);
const needsConversionAudio = item => isAudio(item) && item.conversionRequired;
const isStream = item => isVideo(item) && !isMuxable(item);

const isVideo60fps = item => isVideo(item) && item.fps === 60;
const isVideoHD = item => isVideo(item) && item.height >= 720 && item.height < 1080;
const isVideoFullHD = item => isVideo(item) && item.height >= 1080 && item.height < 1440;
const isVideo2k = item => isVideo(item) && item.height >= 1440 && item.height < 2160;
const isVideo4k = item => isVideo(item) && item.height >= 2160 && item.height < 4320;
const isVideo8k = item => isVideo(item) && item.height >= 4320;

const willBeVideoWebm = item => isVideo(item) && item.type && item.type === "webm";
const willBeVideoMp4 = item => isVideo(item) && item.type && item.type === "mp4";



;// CONCATENATED MODULE: ./src/utils/media-content-length.js
/* harmony default export */ const media_content_length = (media => media.contentLength + (media.audio ? media.audio.contentLength : 0));

;// CONCATENATED MODULE: ./src/utils/get-list/audio.js


const hasMp3 = list => list.some(isAudioMp3);
// sort
const byBitrate = (audio1, audio2) => audio1.bitrate - audio2.bitrate;
// filter
const byOptions = options => (audio) => {
  const {
    contentLimit,
    showFormatsAvailableViaDesktopClient,
    showFormatsRequiredOnlineConversion,
  } = options;
  /* eslint-disable no-param-reassign */
  if (contentLimit && audio.contentLength > contentLimit) {
    if (!showFormatsAvailableViaDesktopClient) return false;
    audio.availableInDesktopClient = true;
    return true;
  }
  audio.availableInDesktopClient = false;
  /* eslint-enable no-param-reassign */
  if (!showFormatsRequiredOnlineConversion) {
    if (needsConversionAudio(audio)) return false;
  }
  return true;
};

const getBestMp3 = audioInfo => audioInfo.filter(isAudioMp3).sort(byBitrate).slice(0, 1);
const getBestMp4 = audioInfo => audioInfo.filter(isAudioMp4).sort(byBitrate).slice(0, 1);
const getBestWebm = audioInfo => audioInfo.filter(isAudioWebm).sort(byBitrate).slice(0, 1);

const addMp3 = (audioInfo, options) => {
  const { showFormatsAvailableViaDesktopClient } = options;
  if (!showFormatsAvailableViaDesktopClient) return audioInfo;

  if (!hasMp3(audioInfo)) {
    return [
      ...audioInfo,
      {
        availableInDesktopClient: true, id: "availableInDesktopClient", mimeType: "audio/mp3",
      },
    ];
  }
  return audioInfo;
};

/* harmony default export */ const get_list_audio = ((audioInfo, options) => {
  const audioList = audioInfo.filter(byOptions(options));
  if (!audioList.length) return [];
  if (audioList.length === 1) return addMp3(audioList, options);

  const resultList = [...getBestMp3(audioList), ...(getBestMp4(audioList) || getBestWebm(audioList))];
  return addMp3(resultList, options);
});

;// CONCATENATED MODULE: ./src/utils/get-list/index.js





const get_list_byOptions = options => (video) => {
  const {
    contentLimit,
    showFormatsAvailableViaDesktopClient,
    showFormatsRequiredOnlineConversion,
    showWebmVideos,
  } = options;
  if (!showFormatsRequiredOnlineConversion) {
    if (isMuxable(video)) return false;
  }
  if (!showWebmVideos) {
    if (willBeVideoWebm(video)) {
      return false;
    }
  }

  const videoContentLength = media_content_length(video);
  /* eslint-disable no-param-reassign */
  if (isMuxable(video) && contentLimit && videoContentLength > contentLimit) {
    if (!showFormatsAvailableViaDesktopClient) return false;
    video.availableInDesktopClient = true;
    return true;
  }
  video.availableInDesktopClient = false;

  return true;
};

/* eslint-disable no-confusing-arrow */
const byQuality = (rec1, rec2) => {
  if (rec1.height !== rec2.height) return rec2.height - rec1.height;
  if (rec1.fps !== rec2.fps) return rec2.fps - rec1.fps;
  return rec1.contentLength - rec2.contentLength;
};

const fullContentLength = item => item.contentLength + item.audio ? item.audio.contentLength : 0;
/* eslint-enable no-confusing-arrow */

// const byContentLength = (rec1, rec2) => rec2.contentLength - rec1.contentLength;
// const byThisContentLength = origin => candidate => fullContentLength(origin) >= fullContentLength(candidate);

const noWorseThan = quality => rec => quality <= parseInt(rec.quality, 10);
const notNull = item => !!item;
const kind = rec1 => (rec2) => {
  if (!rec2) return false;
  if (rec1.type !== rec2.type) return false;
  if (rec1.height !== rec2.height) return false;
  if (rec1.fps !== rec2.fps) return false;
  return true;
};

const pickBetter = (a, b) => {
  if (!a.audio && b.audio) return a;
  if (a.audio && !b.audio) return b;
  if (fullContentLength(a) <= fullContentLength(b)) return a;
  return b;
};

// list has to be of one kind
const getTheBest = list => list.reduce(pickBetter);

const hasBetterKind = (rec, list) => {
  if (list.length < 2) return false;
  const theBest = getTheBest(list.filter(kind(rec)));
  return rec !== theBest;
};

const onlyUniques = (rec, i, list) => !hasBetterKind(rec, list, i);

const notIncludes = list => rec => !list.includes(rec);
const getSpoiler = (videos, shortList) => videos.filter(notIncludes(shortList)).sort(byQuality);

/* eslint-disable-next-line no-confusing-arrow */
const getNextTo = quality => (video, acc) => Math.abs(video.height - quality) < Math.abs(acc.height - quality) ? video : acc;

const getPromos = (list) => {
  if (!list.length) return [];
  let v4k = list.filter(isVideo4k).sort(byQuality).pop();
  let hd = list.filter(noWorseThan(1080)).sort(byQuality).pop();
  if (!v4k) {
    v4k = list.reduce(getNextTo((1440 + (2160 - 1440) / 2)));
  }
  if (!hd) {
    hd = list.reduce(getNextTo((720 + (1080 - 720) / 2)));
  }
  const equal = hd === v4k;
  return (equal ? [hd] : [hd, v4k]).filter(notNull);
};

const getShortList = (videos) => {
  const promos = getPromos(videos.filter(willBeVideoMp4));
  const filters = [
    notIncludes(promos),
    isStream,
    noWorseThan(360),
    willBeVideoMp4,
  ];
  let select = [];
  for (let i = 0; i < filters.length; i++) {
    const currentSet = filters.slice(0, filters.length - i);
    select = videos.filter(video => currentSet.every(filter => filter(video)));
    if (select.length) break;
  }
  return select.slice(0, 2).sort(byQuality);
};

const _getItemsList = (info, options) => {
  if (!info) return [];
  const {
    audio,
    streams,
    video,
  } = info;

  if (!video && !streams && !audio) return { list: [], listHasSpoier: false };

  const _streams = streams || [];
  const _video = video || [];
  const _audio = audio || [];

  const { listMode } = options;
  const videos = [..._streams, ..._video].filter(get_list_byOptions(options)).filter(onlyUniques);
  const promos = getPromos(videos.filter(willBeVideoMp4));
  const audioList = get_list_audio(_audio, options);

  const list = getShortList(videos);
  const spoiler = getSpoiler(videos, [...promos, ...list]);
  const listHasSpoiler = spoiler.length > 2;

  if (listMode === "short") {
    const finalList = [
      ...promos,
      ...list,
      ...audioList,
      // если спойлер меньше 3 позиций - спойлер убираем, содержимое в основном окне
      ...(listHasSpoiler ? [] : spoiler),
    ];
    return { list: finalList, listHasSpoiler };
  }

  if (listMode === "full") {
    const finalList = [
      ...promos,
      ...list,
      ...audioList,
      ...(listHasSpoiler ? spoiler : []),
    ];
    return { list: finalList, listHasSpoiler: false };
  }

  if (listMode === "embed") {
    const finalList = [
      ...promos,
      ...list,
      ...audioList,
    ];
    return { list: finalList, listHasSpoiler };
  }

  return [];
};

/* harmony default export */ const get_list = ((info, options) => {
  if (!info) {
    return {
      itemsList: [],
      listHasSpoiler: false,
    };
  }
  const { list, listHasSpoiler } = _getItemsList(info, options);
  return {
    itemsList: list,
    listHasSpoiler,
  };
});

;// CONCATENATED MODULE: ./src/content-script/store/auxiliary-selectors/options-for-calculate-list.js
const optionsForCalculateList = (state) => {
  const {
    contentLimit,
    downloaderStatus,
    listMode,
    showFormatsAvailableViaDesktopClient,
    showFormatsRequiredOnlineConversion,
    showWebmVideos,
  } = state;
  const options = {
    contentLimit,
    listMode,
    showFormatsAvailableViaDesktopClient,
    showFormatsRequiredOnlineConversion: showFormatsRequiredOnlineConversion && downloaderStatus === "ready",
    showWebmVideos,
  };
  return options;
};

/* harmony default export */ const options_for_calculate_list = (optionsForCalculateList);

;// CONCATENATED MODULE: ./src/content-script/store/auxiliary-selectors/info.js
const info = state => state.info;

/* harmony default export */ const auxiliary_selectors_info = (info);

;// CONCATENATED MODULE: ./src/content-script/store/auxiliary-selectors/default-item.js
const defaultItem = state => state.defaultItem;

/* harmony default export */ const default_item = (defaultItem);

;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/default-item.js








/* REDUX */
const default_item_actionsTypes = {
  SET_DEFAULT_ITEM: "SET_DEFAULT_ITEM",
};

const default_item_actions = {
  setDefaultItem: info => ({ type: default_item_actionsTypes.SET_DEFAULT_ITEM, value: info }),
};

const default_item_reducers = {
  [default_item_actionsTypes.SET_DEFAULT_ITEM]: (state, action) => ({ ...state, defaultItem: action.value }),
};

const default_item_getSlice = store => ({
  setDefaultItem: item => store.dispatch(default_item_actions.setDefaultItem(item)),
});

/* reselect */
const defaultItemSmartSelector = createSelector(
  [options_for_calculate_list, auxiliary_selectors_info, default_item],
  (options, info, defaultItem) => {
    const { itemsList } = get_list(info, options);
    return (itemsList.includes(defaultItem)) ? defaultItem : itemsList[0];
  },
);

const default_item_selectors = {
  defaultItem: defaultItemSmartSelector,
};

/* harmony default export */ const keys_default_item = ({
  actionsTypes: default_item_actionsTypes,
  actions: default_item_actions,
  reducers: default_item_reducers,
  getSlice: default_item_getSlice,
  selectors: default_item_selectors,
});

;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/dir.js
/* REDUX */
const dir_actionsTypes = {
  SET_DIR: "SET_DIR",
};

const dir_actions = {
  setDir: dir => ({ type: dir_actionsTypes.SET_DIR, value: dir }),
};

const dir_reducers = {
  [dir_actionsTypes.SET_DIR]: (state, action) => ({ ...state, dir: action.value }),
};

const dir_getSlice = store => ({
  setDir: dir => store.dispatch(dir_actions.setDir(dir)),
});

/* harmony default export */ const dir = ({
  actionsTypes: dir_actionsTypes,
  actions: dir_actions,
  reducers: dir_reducers,
  getSlice: dir_getSlice,
});

// EXTERNAL MODULE: ./node_modules/eventemitter3/index.js
var eventemitter3 = __webpack_require__(729);
var eventemitter3_default = /*#__PURE__*/__webpack_require__.n(eventemitter3);
;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/event-router.js


/* REDUX */
const event_router_getSlice = () => ({
  eventRouter: new (eventemitter3_default())(),
});

/* harmony default export */ const event_router = ({
  getSlice: event_router_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/help-state.js
/* REDUX */
const help_state_actionsTypes = {
  SET_HELP_STATE: "SET_HELP_STATE",
};

const help_state_actions = {
  setHelpState: state => ({ type: help_state_actionsTypes.SET_HELP_STATE, value: state }),
};

const help_state_reducers = {
  [help_state_actionsTypes.SET_HELP_STATE]: (state, action) => ({ ...state, helpState: action.value }),
};

const help_state_getSlice = store => ({
  setHelpState: helpState => store.dispatch(help_state_actions.setHelpState(helpState)),
});

/* harmony default export */ const help_state = ({
  actionsTypes: help_state_actionsTypes,
  actions: help_state_actions,
  reducers: help_state_reducers,
  getSlice: help_state_getSlice,
});

;// CONCATENATED MODULE: ./node_modules/i18next/dist/esm/i18next.js
const consoleLogger = {
  type: 'logger',
  log(args) {
    this.output('log', args);
  },
  warn(args) {
    this.output('warn', args);
  },
  error(args) {
    this.output('error', args);
  },
  output(type, args) {
    if (console && console[type]) console[type].apply(console, args);
  }
};
class Logger {
  constructor(concreteLogger) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.init(concreteLogger, options);
  }
  init(concreteLogger) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.prefix = options.prefix || 'i18next:';
    this.logger = concreteLogger || consoleLogger;
    this.options = options;
    this.debug = options.debug;
  }
  log() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return this.forward(args, 'log', '', true);
  }
  warn() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return this.forward(args, 'warn', '', true);
  }
  error() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return this.forward(args, 'error', '');
  }
  deprecate() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
  }
  forward(args, lvl, prefix, debugOnly) {
    if (debugOnly && !this.debug) return null;
    if (typeof args[0] === 'string') args[0] = `${prefix}${this.prefix} ${args[0]}`;
    return this.logger[lvl](args);
  }
  create(moduleName) {
    return new Logger(this.logger, {
      ...{
        prefix: `${this.prefix}:${moduleName}:`
      },
      ...this.options
    });
  }
  clone(options) {
    options = options || this.options;
    options.prefix = options.prefix || this.prefix;
    return new Logger(this.logger, options);
  }
}
var baseLogger = new Logger();

class EventEmitter {
  constructor() {
    this.observers = {};
  }
  on(events, listener) {
    events.split(' ').forEach(event => {
      this.observers[event] = this.observers[event] || [];
      this.observers[event].push(listener);
    });
    return this;
  }
  off(event, listener) {
    if (!this.observers[event]) return;
    if (!listener) {
      delete this.observers[event];
      return;
    }
    this.observers[event] = this.observers[event].filter(l => l !== listener);
  }
  emit(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (this.observers[event]) {
      const cloned = [].concat(this.observers[event]);
      cloned.forEach(observer => {
        observer(...args);
      });
    }
    if (this.observers['*']) {
      const cloned = [].concat(this.observers['*']);
      cloned.forEach(observer => {
        observer.apply(observer, [event, ...args]);
      });
    }
  }
}

function defer() {
  let res;
  let rej;
  const promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
}
function makeString(object) {
  if (object == null) return '';
  return '' + object;
}
function copy(a, s, t) {
  a.forEach(m => {
    if (s[m]) t[m] = s[m];
  });
}
function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
  }
  function canNotTraverseDeeper() {
    return !object || typeof object === 'string';
  }
  const stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
  while (stack.length > 1) {
    if (canNotTraverseDeeper()) return {};
    const key = cleanKey(stack.shift());
    if (!object[key] && Empty) object[key] = new Empty();
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      object = object[key];
    } else {
      object = {};
    }
  }
  if (canNotTraverseDeeper()) return {};
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}
function setPath(object, path, newValue) {
  const {
    obj,
    k
  } = getLastOfPath(object, path, Object);
  obj[k] = newValue;
}
function pushPath(object, path, newValue, concat) {
  const {
    obj,
    k
  } = getLastOfPath(object, path, Object);
  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}
function getPath(object, path) {
  const {
    obj,
    k
  } = getLastOfPath(object, path);
  if (!obj) return undefined;
  return obj[k];
}
function getPathWithDefaults(data, defaultData, key) {
  const value = getPath(data, key);
  if (value !== undefined) {
    return value;
  }
  return getPath(defaultData, key);
}
function deepExtend(target, source, overwrite) {
  for (const prop in source) {
    if (prop !== '__proto__' && prop !== 'constructor') {
      if (prop in target) {
        if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
          if (overwrite) target[prop] = source[prop];
        } else {
          deepExtend(target[prop], source[prop], overwrite);
        }
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
}
function regexEscape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
var _entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};
function i18next_escape(data) {
  if (typeof data === 'string') {
    return data.replace(/[&<>"'\/]/g, s => _entityMap[s]);
  }
  return data;
}
const chars = [' ', ',', '?', '!', ';'];
function looksLikeObjectPath(key, nsSeparator, keySeparator) {
  nsSeparator = nsSeparator || '';
  keySeparator = keySeparator || '';
  const possibleChars = chars.filter(c => nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0);
  if (possibleChars.length === 0) return true;
  const r = new RegExp(`(${possibleChars.map(c => c === '?' ? '\\?' : c).join('|')})`);
  let matched = !r.test(key);
  if (!matched) {
    const ki = key.indexOf(keySeparator);
    if (ki > 0 && !r.test(key.substring(0, ki))) {
      matched = true;
    }
  }
  return matched;
}
function deepFind(obj, path) {
  let keySeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
  if (!obj) return undefined;
  if (obj[path]) return obj[path];
  const paths = path.split(keySeparator);
  let current = obj;
  for (let i = 0; i < paths.length; ++i) {
    if (!current) return undefined;
    if (typeof current[paths[i]] === 'string' && i + 1 < paths.length) {
      return undefined;
    }
    if (current[paths[i]] === undefined) {
      let j = 2;
      let p = paths.slice(i, i + j).join(keySeparator);
      let mix = current[p];
      while (mix === undefined && paths.length > i + j) {
        j++;
        p = paths.slice(i, i + j).join(keySeparator);
        mix = current[p];
      }
      if (mix === undefined) return undefined;
      if (mix === null) return null;
      if (path.endsWith(p)) {
        if (typeof mix === 'string') return mix;
        if (p && typeof mix[p] === 'string') return mix[p];
      }
      const joinedPath = paths.slice(i + j).join(keySeparator);
      if (joinedPath) return deepFind(mix, joinedPath, keySeparator);
      return undefined;
    }
    current = current[paths[i]];
  }
  return current;
}
function getCleanedCode(code) {
  if (code && code.indexOf('_') > 0) return code.replace('_', '-');
  return code;
}

class ResourceStore extends EventEmitter {
  constructor(data) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      ns: ['translation'],
      defaultNS: 'translation'
    };
    super();
    this.data = data || {};
    this.options = options;
    if (this.options.keySeparator === undefined) {
      this.options.keySeparator = '.';
    }
    if (this.options.ignoreJSONStructure === undefined) {
      this.options.ignoreJSONStructure = true;
    }
  }
  addNamespaces(ns) {
    if (this.options.ns.indexOf(ns) < 0) {
      this.options.ns.push(ns);
    }
  }
  removeNamespaces(ns) {
    const index = this.options.ns.indexOf(ns);
    if (index > -1) {
      this.options.ns.splice(index, 1);
    }
  }
  getResource(lng, ns, key) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    const ignoreJSONStructure = options.ignoreJSONStructure !== undefined ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let path = [lng, ns];
    if (key && typeof key !== 'string') path = path.concat(key);
    if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
    }
    const result = getPath(this.data, path);
    if (result || !ignoreJSONStructure || typeof key !== 'string') return result;
    return deepFind(this.data && this.data[lng] && this.data[lng][ns], key, keySeparator);
  }
  addResource(lng, ns, key, value) {
    let options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
      silent: false
    };
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    let path = [lng, ns];
    if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      value = ns;
      ns = path[1];
    }
    this.addNamespaces(ns);
    setPath(this.data, path, value);
    if (!options.silent) this.emit('added', lng, ns, key, value);
  }
  addResources(lng, ns, resources) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
      silent: false
    };
    for (const m in resources) {
      if (typeof resources[m] === 'string' || Object.prototype.toString.apply(resources[m]) === '[object Array]') this.addResource(lng, ns, m, resources[m], {
        silent: true
      });
    }
    if (!options.silent) this.emit('added', lng, ns, resources);
  }
  addResourceBundle(lng, ns, resources, deep, overwrite) {
    let options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
      silent: false
    };
    let path = [lng, ns];
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      deep = resources;
      resources = ns;
      ns = path[1];
    }
    this.addNamespaces(ns);
    let pack = getPath(this.data, path) || {};
    if (deep) {
      deepExtend(pack, resources, overwrite);
    } else {
      pack = {
        ...pack,
        ...resources
      };
    }
    setPath(this.data, path, pack);
    if (!options.silent) this.emit('added', lng, ns, resources);
  }
  removeResourceBundle(lng, ns) {
    if (this.hasResourceBundle(lng, ns)) {
      delete this.data[lng][ns];
    }
    this.removeNamespaces(ns);
    this.emit('removed', lng, ns);
  }
  hasResourceBundle(lng, ns) {
    return this.getResource(lng, ns) !== undefined;
  }
  getResourceBundle(lng, ns) {
    if (!ns) ns = this.options.defaultNS;
    if (this.options.compatibilityAPI === 'v1') return {
      ...{},
      ...this.getResource(lng, ns)
    };
    return this.getResource(lng, ns);
  }
  getDataByLanguage(lng) {
    return this.data[lng];
  }
  hasLanguageSomeTranslations(lng) {
    const data = this.getDataByLanguage(lng);
    const n = data && Object.keys(data) || [];
    return !!n.find(v => data[v] && Object.keys(data[v]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}

var postProcessor = {
  processors: {},
  addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle(processors, value, key, options, translator) {
    processors.forEach(processor => {
      if (this.processors[processor]) value = this.processors[processor].process(value, key, options, translator);
    });
    return value;
  }
};

const checkedLoadedFor = {};
class Translator extends EventEmitter {
  constructor(services) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super();
    copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat', 'utils'], services, this);
    this.options = options;
    if (this.options.keySeparator === undefined) {
      this.options.keySeparator = '.';
    }
    this.logger = baseLogger.create('translator');
  }
  changeLanguage(lng) {
    if (lng) this.language = lng;
  }
  exists(key) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      interpolation: {}
    };
    if (key === undefined || key === null) {
      return false;
    }
    const resolved = this.resolve(key, options);
    return resolved && resolved.res !== undefined;
  }
  extractFromKey(key, options) {
    let nsSeparator = options.nsSeparator !== undefined ? options.nsSeparator : this.options.nsSeparator;
    if (nsSeparator === undefined) nsSeparator = ':';
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    let namespaces = options.ns || this.options.defaultNS || [];
    const wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
    const seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !options.keySeparator && !this.options.userDefinedNsSeparator && !options.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
    if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
      const m = key.match(this.interpolator.nestingRegexp);
      if (m && m.length > 0) {
        return {
          key,
          namespaces
        };
      }
      const parts = key.split(nsSeparator);
      if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
      key = parts.join(keySeparator);
    }
    if (typeof namespaces === 'string') namespaces = [namespaces];
    return {
      key,
      namespaces
    };
  }
  translate(keys, options, lastKey) {
    if (typeof options !== 'object' && this.options.overloadTranslationOptionHandler) {
      options = this.options.overloadTranslationOptionHandler(arguments);
    }
    if (typeof options === 'object') options = {
      ...options
    };
    if (!options) options = {};
    if (keys === undefined || keys === null) return '';
    if (!Array.isArray(keys)) keys = [String(keys)];
    const returnDetails = options.returnDetails !== undefined ? options.returnDetails : this.options.returnDetails;
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    const {
      key,
      namespaces
    } = this.extractFromKey(keys[keys.length - 1], options);
    const namespace = namespaces[namespaces.length - 1];
    const lng = options.lng || this.language;
    const appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (lng && lng.toLowerCase() === 'cimode') {
      if (appendNamespaceToCIMode) {
        const nsSeparator = options.nsSeparator || this.options.nsSeparator;
        if (returnDetails) {
          return {
            res: `${namespace}${nsSeparator}${key}`,
            usedKey: key,
            exactUsedKey: key,
            usedLng: lng,
            usedNS: namespace
          };
        }
        return `${namespace}${nsSeparator}${key}`;
      }
      if (returnDetails) {
        return {
          res: key,
          usedKey: key,
          exactUsedKey: key,
          usedLng: lng,
          usedNS: namespace
        };
      }
      return key;
    }
    const resolved = this.resolve(keys, options);
    let res = resolved && resolved.res;
    const resUsedKey = resolved && resolved.usedKey || key;
    const resExactUsedKey = resolved && resolved.exactUsedKey || key;
    const resType = Object.prototype.toString.apply(res);
    const noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
    const joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
    const handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
    const handleAsObject = typeof res !== 'string' && typeof res !== 'boolean' && typeof res !== 'number';
    if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === 'string' && resType === '[object Array]')) {
      if (!options.returnObjects && !this.options.returnObjects) {
        if (!this.options.returnedObjectHandler) {
          this.logger.warn('accessing an object - but returnObjects options is not enabled!');
        }
        const r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, {
          ...options,
          ns: namespaces
        }) : `key '${key} (${this.language})' returned an object instead of string.`;
        if (returnDetails) {
          resolved.res = r;
          return resolved;
        }
        return r;
      }
      if (keySeparator) {
        const resTypeIsArray = resType === '[object Array]';
        const copy = resTypeIsArray ? [] : {};
        const newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
        for (const m in res) {
          if (Object.prototype.hasOwnProperty.call(res, m)) {
            const deepKey = `${newKeyToUse}${keySeparator}${m}`;
            copy[m] = this.translate(deepKey, {
              ...options,
              ...{
                joinArrays: false,
                ns: namespaces
              }
            });
            if (copy[m] === deepKey) copy[m] = res[m];
          }
        }
        res = copy;
      }
    } else if (handleAsObjectInI18nFormat && typeof joinArrays === 'string' && resType === '[object Array]') {
      res = res.join(joinArrays);
      if (res) res = this.extendTranslation(res, keys, options, lastKey);
    } else {
      let usedDefault = false;
      let usedKey = false;
      const needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
      const hasDefaultValue = Translator.hasDefaultValue(options);
      const defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, options) : '';
      const defaultValueSuffixOrdinalFallback = options.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, {
        ordinal: false
      }) : '';
      const defaultValue = options[`defaultValue${defaultValueSuffix}`] || options[`defaultValue${defaultValueSuffixOrdinalFallback}`] || options.defaultValue;
      if (!this.isValidLookup(res) && hasDefaultValue) {
        usedDefault = true;
        res = defaultValue;
      }
      if (!this.isValidLookup(res)) {
        usedKey = true;
        res = key;
      }
      const missingKeyNoValueFallbackToKey = options.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
      const resForMissing = missingKeyNoValueFallbackToKey && usedKey ? undefined : res;
      const updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
      if (usedKey || usedDefault || updateMissing) {
        this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? defaultValue : res);
        if (keySeparator) {
          const fk = this.resolve(key, {
            ...options,
            keySeparator: false
          });
          if (fk && fk.res) this.logger.warn('Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.');
        }
        let lngs = [];
        const fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
        if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
          for (let i = 0; i < fallbackLngs.length; i++) {
            lngs.push(fallbackLngs[i]);
          }
        } else if (this.options.saveMissingTo === 'all') {
          lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
        } else {
          lngs.push(options.lng || this.language);
        }
        const send = (l, k, specificDefaultValue) => {
          const defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
          if (this.options.missingKeyHandler) {
            this.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, options);
          } else if (this.backendConnector && this.backendConnector.saveMissing) {
            this.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, options);
          }
          this.emit('missingKey', l, namespace, k, res);
        };
        if (this.options.saveMissing) {
          if (this.options.saveMissingPlurals && needsPluralHandling) {
            lngs.forEach(language => {
              this.pluralResolver.getSuffixes(language, options).forEach(suffix => {
                send([language], key + suffix, options[`defaultValue${suffix}`] || defaultValue);
              });
            });
          } else {
            send(lngs, key, defaultValue);
          }
        }
      }
      res = this.extendTranslation(res, keys, options, resolved, lastKey);
      if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = `${namespace}:${key}`;
      if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
        if (this.options.compatibilityAPI !== 'v1') {
          res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${namespace}:${key}` : key, usedDefault ? res : undefined);
        } else {
          res = this.options.parseMissingKeyHandler(res);
        }
      }
    }
    if (returnDetails) {
      resolved.res = res;
      return resolved;
    }
    return res;
  }
  extendTranslation(res, key, options, resolved, lastKey) {
    var _this = this;
    if (this.i18nFormat && this.i18nFormat.parse) {
      res = this.i18nFormat.parse(res, {
        ...this.options.interpolation.defaultVariables,
        ...options
      }, options.lng || this.language || resolved.usedLng, resolved.usedNS, resolved.usedKey, {
        resolved
      });
    } else if (!options.skipInterpolation) {
      if (options.interpolation) this.interpolator.init({
        ...options,
        ...{
          interpolation: {
            ...this.options.interpolation,
            ...options.interpolation
          }
        }
      });
      const skipOnVariables = typeof res === 'string' && (options && options.interpolation && options.interpolation.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let nestBef;
      if (skipOnVariables) {
        const nb = res.match(this.interpolator.nestingRegexp);
        nestBef = nb && nb.length;
      }
      let data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
      if (this.options.interpolation.defaultVariables) data = {
        ...this.options.interpolation.defaultVariables,
        ...data
      };
      res = this.interpolator.interpolate(res, data, options.lng || this.language, options);
      if (skipOnVariables) {
        const na = res.match(this.interpolator.nestingRegexp);
        const nestAft = na && na.length;
        if (nestBef < nestAft) options.nest = false;
      }
      if (!options.lng && this.options.compatibilityAPI !== 'v1' && resolved && resolved.res) options.lng = resolved.usedLng;
      if (options.nest !== false) res = this.interpolator.nest(res, function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (lastKey && lastKey[0] === args[0] && !options.context) {
          _this.logger.warn(`It seems you are nesting recursively key: ${args[0]} in key: ${key[0]}`);
          return null;
        }
        return _this.translate(...args, key);
      }, options);
      if (options.interpolation) this.interpolator.reset();
    }
    const postProcess = options.postProcess || this.options.postProcess;
    const postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;
    if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
      res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? {
        i18nResolved: resolved,
        ...options
      } : options, this);
    }
    return res;
  }
  resolve(keys) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let found;
    let usedKey;
    let exactUsedKey;
    let usedLng;
    let usedNS;
    if (typeof keys === 'string') keys = [keys];
    keys.forEach(k => {
      if (this.isValidLookup(found)) return;
      const extracted = this.extractFromKey(k, options);
      const key = extracted.key;
      usedKey = key;
      let namespaces = extracted.namespaces;
      if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);
      const needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
      const needsZeroSuffixLookup = needsPluralHandling && !options.ordinal && options.count === 0 && this.pluralResolver.shouldUseIntlApi();
      const needsContextHandling = options.context !== undefined && (typeof options.context === 'string' || typeof options.context === 'number') && options.context !== '';
      const codes = options.lngs ? options.lngs : this.languageUtils.toResolveHierarchy(options.lng || this.language, options.fallbackLng);
      namespaces.forEach(ns => {
        if (this.isValidLookup(found)) return;
        usedNS = ns;
        if (!checkedLoadedFor[`${codes[0]}-${ns}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(usedNS)) {
          checkedLoadedFor[`${codes[0]}-${ns}`] = true;
          this.logger.warn(`key "${usedKey}" for languages "${codes.join(', ')}" won't get resolved as namespace "${usedNS}" was not yet loaded`, 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
        }
        codes.forEach(code => {
          if (this.isValidLookup(found)) return;
          usedLng = code;
          const finalKeys = [key];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys) {
            this.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
          } else {
            let pluralSuffix;
            if (needsPluralHandling) pluralSuffix = this.pluralResolver.getSuffix(code, options.count, options);
            const zeroSuffix = `${this.options.pluralSeparator}zero`;
            const ordinalPrefix = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (needsPluralHandling) {
              finalKeys.push(key + pluralSuffix);
              if (options.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                finalKeys.push(key + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
              }
              if (needsZeroSuffixLookup) {
                finalKeys.push(key + zeroSuffix);
              }
            }
            if (needsContextHandling) {
              const contextKey = `${key}${this.options.contextSeparator}${options.context}`;
              finalKeys.push(contextKey);
              if (needsPluralHandling) {
                finalKeys.push(contextKey + pluralSuffix);
                if (options.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                  finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
                }
                if (needsZeroSuffixLookup) {
                  finalKeys.push(contextKey + zeroSuffix);
                }
              }
            }
          }
          let possibleKey;
          while (possibleKey = finalKeys.pop()) {
            if (!this.isValidLookup(found)) {
              exactUsedKey = possibleKey;
              found = this.getResource(code, ns, possibleKey, options);
            }
          }
        });
      });
    });
    return {
      res: found,
      usedKey,
      exactUsedKey,
      usedLng,
      usedNS
    };
  }
  isValidLookup(res) {
    return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
  }
  getResource(code, ns, key) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
    return this.resourceStore.getResource(code, ns, key, options);
  }
  static hasDefaultValue(options) {
    const prefix = 'defaultValue';
    for (const option in options) {
      if (Object.prototype.hasOwnProperty.call(options, option) && prefix === option.substring(0, prefix.length) && undefined !== options[option]) {
        return true;
      }
    }
    return false;
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
class LanguageUtil {
  constructor(options) {
    this.options = options;
    this.supportedLngs = this.options.supportedLngs || false;
    this.logger = baseLogger.create('languageUtils');
  }
  getScriptPartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf('-') < 0) return null;
    const p = code.split('-');
    if (p.length === 2) return null;
    p.pop();
    if (p[p.length - 1].toLowerCase() === 'x') return null;
    return this.formatLanguageCode(p.join('-'));
  }
  getLanguagePartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf('-') < 0) return code;
    const p = code.split('-');
    return this.formatLanguageCode(p[0]);
  }
  formatLanguageCode(code) {
    if (typeof code === 'string' && code.indexOf('-') > -1) {
      const specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
      let p = code.split('-');
      if (this.options.lowerCaseLng) {
        p = p.map(part => part.toLowerCase());
      } else if (p.length === 2) {
        p[0] = p[0].toLowerCase();
        p[1] = p[1].toUpperCase();
        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
      } else if (p.length === 3) {
        p[0] = p[0].toLowerCase();
        if (p[1].length === 2) p[1] = p[1].toUpperCase();
        if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();
        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
        if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
      }
      return p.join('-');
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
  }
  isSupportedCode(code) {
    if (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) {
      code = this.getLanguagePartFromCode(code);
    }
    return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
  }
  getBestMatchFromCodes(codes) {
    if (!codes) return null;
    let found;
    codes.forEach(code => {
      if (found) return;
      const cleanedLng = this.formatLanguageCode(code);
      if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng)) found = cleanedLng;
    });
    if (!found && this.options.supportedLngs) {
      codes.forEach(code => {
        if (found) return;
        const lngOnly = this.getLanguagePartFromCode(code);
        if (this.isSupportedCode(lngOnly)) return found = lngOnly;
        found = this.options.supportedLngs.find(supportedLng => {
          if (supportedLng === lngOnly) return supportedLng;
          if (supportedLng.indexOf('-') < 0 && lngOnly.indexOf('-') < 0) return;
          if (supportedLng.indexOf(lngOnly) === 0) return supportedLng;
        });
      });
    }
    if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
    return found;
  }
  getFallbackCodes(fallbacks, code) {
    if (!fallbacks) return [];
    if (typeof fallbacks === 'function') fallbacks = fallbacks(code);
    if (typeof fallbacks === 'string') fallbacks = [fallbacks];
    if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;
    if (!code) return fallbacks.default || [];
    let found = fallbacks[code];
    if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
    if (!found) found = fallbacks[this.formatLanguageCode(code)];
    if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
    if (!found) found = fallbacks.default;
    return found || [];
  }
  toResolveHierarchy(code, fallbackCode) {
    const fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
    const codes = [];
    const addCode = c => {
      if (!c) return;
      if (this.isSupportedCode(c)) {
        codes.push(c);
      } else {
        this.logger.warn(`rejecting language code not found in supportedLngs: ${c}`);
      }
    };
    if (typeof code === 'string' && (code.indexOf('-') > -1 || code.indexOf('_') > -1)) {
      if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
      if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
      if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
    } else if (typeof code === 'string') {
      addCode(this.formatLanguageCode(code));
    }
    fallbackCodes.forEach(fc => {
      if (codes.indexOf(fc) < 0) addCode(this.formatLanguageCode(fc));
    });
    return codes;
  }
}

let sets = [{
  lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'tl', 'ti', 'tr', 'uz', 'wa'],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'hi', 'hu', 'hy', 'ia', 'it', 'kk', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ['ay', 'bo', 'cgg', 'fa', 'ht', 'id', 'ja', 'jbo', 'ka', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'],
  nr: [1],
  fc: 3
}, {
  lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ['ar'],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ['cs', 'sk'],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ['csb', 'pl'],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ['cy'],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ['fr'],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ['ga'],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ['gd'],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ['is'],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ['jv'],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ['kw'],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ['lt'],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ['lv'],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ['mk'],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ['mnk'],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ['mt'],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ['or'],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ['ro'],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ['sl'],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ['he', 'iw'],
  nr: [1, 2, 20, 21],
  fc: 22
}];
let _rulesPluralsTypes = {
  1: function (n) {
    return Number(n > 1);
  },
  2: function (n) {
    return Number(n != 1);
  },
  3: function (n) {
    return 0;
  },
  4: function (n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  5: function (n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
  },
  6: function (n) {
    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
  },
  7: function (n) {
    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  8: function (n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
  },
  9: function (n) {
    return Number(n >= 2);
  },
  10: function (n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
  },
  11: function (n) {
    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
  },
  12: function (n) {
    return Number(n % 10 != 1 || n % 100 == 11);
  },
  13: function (n) {
    return Number(n !== 0);
  },
  14: function (n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
  },
  15: function (n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  16: function (n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
  },
  17: function (n) {
    return Number(n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1);
  },
  18: function (n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
  },
  19: function (n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
  },
  20: function (n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
  },
  21: function (n) {
    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
  },
  22: function (n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3);
  }
};
const nonIntlVersions = ['v1', 'v2', 'v3'];
const intlVersions = ['v4'];
const suffixesOrder = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function createRules() {
  const rules = {};
  sets.forEach(set => {
    set.lngs.forEach(l => {
      rules[l] = {
        numbers: set.nr,
        plurals: _rulesPluralsTypes[set.fc]
      };
    });
  });
  return rules;
}
class PluralResolver {
  constructor(languageUtils) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.languageUtils = languageUtils;
    this.options = options;
    this.logger = baseLogger.create('pluralResolver');
    if ((!this.options.compatibilityJSON || intlVersions.includes(this.options.compatibilityJSON)) && (typeof Intl === 'undefined' || !Intl.PluralRules)) {
      this.options.compatibilityJSON = 'v3';
      this.logger.error('Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.');
    }
    this.rules = createRules();
  }
  addRule(lng, obj) {
    this.rules[lng] = obj;
  }
  getRule(code) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (this.shouldUseIntlApi()) {
      try {
        return new Intl.PluralRules(getCleanedCode(code), {
          type: options.ordinal ? 'ordinal' : 'cardinal'
        });
      } catch {
        return;
      }
    }
    return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
  }
  needsPlural(code) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const rule = this.getRule(code, options);
    if (this.shouldUseIntlApi()) {
      return rule && rule.resolvedOptions().pluralCategories.length > 1;
    }
    return rule && rule.numbers.length > 1;
  }
  getPluralFormsOfKey(code, key) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return this.getSuffixes(code, options).map(suffix => `${key}${suffix}`);
  }
  getSuffixes(code) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const rule = this.getRule(code, options);
    if (!rule) {
      return [];
    }
    if (this.shouldUseIntlApi()) {
      return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map(pluralCategory => `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ''}${pluralCategory}`);
    }
    return rule.numbers.map(number => this.getSuffix(code, number, options));
  }
  getSuffix(code, count) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const rule = this.getRule(code, options);
    if (rule) {
      if (this.shouldUseIntlApi()) {
        return `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ''}${rule.select(count)}`;
      }
      return this.getSuffixRetroCompatible(rule, count);
    }
    this.logger.warn(`no plural rule found for: ${code}`);
    return '';
  }
  getSuffixRetroCompatible(rule, count) {
    const idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
    let suffix = rule.numbers[idx];
    if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
      if (suffix === 2) {
        suffix = 'plural';
      } else if (suffix === 1) {
        suffix = '';
      }
    }
    const returnSuffix = () => this.options.prepend && suffix.toString() ? this.options.prepend + suffix.toString() : suffix.toString();
    if (this.options.compatibilityJSON === 'v1') {
      if (suffix === 1) return '';
      if (typeof suffix === 'number') return `_plural_${suffix.toString()}`;
      return returnSuffix();
    } else if (this.options.compatibilityJSON === 'v2') {
      return returnSuffix();
    } else if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
      return returnSuffix();
    }
    return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
  }
  shouldUseIntlApi() {
    return !nonIntlVersions.includes(this.options.compatibilityJSON);
  }
}

function deepFindWithDefaults(data, defaultData, key) {
  let keySeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';
  let ignoreJSONStructure = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  let path = getPathWithDefaults(data, defaultData, key);
  if (!path && ignoreJSONStructure && typeof key === 'string') {
    path = deepFind(data, key, keySeparator);
    if (path === undefined) path = deepFind(defaultData, key, keySeparator);
  }
  return path;
}
class Interpolator {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.logger = baseLogger.create('interpolator');
    this.options = options;
    this.format = options.interpolation && options.interpolation.format || (value => value);
    this.init(options);
  }
  init() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (!options.interpolation) options.interpolation = {
      escapeValue: true
    };
    const iOpts = options.interpolation;
    this.escape = iOpts.escape !== undefined ? iOpts.escape : i18next_escape;
    this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;
    this.useRawValueToEscape = iOpts.useRawValueToEscape !== undefined ? iOpts.useRawValueToEscape : false;
    this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
    this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
    this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
    this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
    this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';
    this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape('$t(');
    this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(')');
    this.nestingOptionsSeparator = iOpts.nestingOptionsSeparator ? iOpts.nestingOptionsSeparator : iOpts.nestingOptionsSeparator || ',';
    this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;
    this.alwaysFormat = iOpts.alwaysFormat !== undefined ? iOpts.alwaysFormat : false;
    this.resetRegExp();
  }
  reset() {
    if (this.options) this.init(this.options);
  }
  resetRegExp() {
    const regexpStr = `${this.prefix}(.+?)${this.suffix}`;
    this.regexp = new RegExp(regexpStr, 'g');
    const regexpUnescapeStr = `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`;
    this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');
    const nestingRegexpStr = `${this.nestingPrefix}(.+?)${this.nestingSuffix}`;
    this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
  }
  interpolate(str, data, lng, options) {
    let match;
    let value;
    let replaces;
    const defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    function regexSafe(val) {
      return val.replace(/\$/g, '$$$$');
    }
    const handleFormat = key => {
      if (key.indexOf(this.formatSeparator) < 0) {
        const path = deepFindWithDefaults(data, defaultData, key, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(path, undefined, lng, {
          ...options,
          ...data,
          interpolationkey: key
        }) : path;
      }
      const p = key.split(this.formatSeparator);
      const k = p.shift().trim();
      const f = p.join(this.formatSeparator).trim();
      return this.format(deepFindWithDefaults(data, defaultData, k, this.options.keySeparator, this.options.ignoreJSONStructure), f, lng, {
        ...options,
        ...data,
        interpolationkey: k
      });
    };
    this.resetRegExp();
    const missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;
    const skipOnVariables = options && options.interpolation && options.interpolation.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    const todos = [{
      regex: this.regexpUnescape,
      safeValue: val => regexSafe(val)
    }, {
      regex: this.regexp,
      safeValue: val => this.escapeValue ? regexSafe(this.escape(val)) : regexSafe(val)
    }];
    todos.forEach(todo => {
      replaces = 0;
      while (match = todo.regex.exec(str)) {
        const matchedVar = match[1].trim();
        value = handleFormat(matchedVar);
        if (value === undefined) {
          if (typeof missingInterpolationHandler === 'function') {
            const temp = missingInterpolationHandler(str, match, options);
            value = typeof temp === 'string' ? temp : '';
          } else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) {
            value = '';
          } else if (skipOnVariables) {
            value = match[0];
            continue;
          } else {
            this.logger.warn(`missed to pass in variable ${matchedVar} for interpolating ${str}`);
            value = '';
          }
        } else if (typeof value !== 'string' && !this.useRawValueToEscape) {
          value = makeString(value);
        }
        const safeValue = todo.safeValue(value);
        str = str.replace(match[0], safeValue);
        if (skipOnVariables) {
          todo.regex.lastIndex += value.length;
          todo.regex.lastIndex -= match[0].length;
        } else {
          todo.regex.lastIndex = 0;
        }
        replaces++;
        if (replaces >= this.maxReplaces) {
          break;
        }
      }
    });
    return str;
  }
  nest(str, fc) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let match;
    let value;
    let clonedOptions;
    function handleHasOptions(key, inheritedOptions) {
      const sep = this.nestingOptionsSeparator;
      if (key.indexOf(sep) < 0) return key;
      const c = key.split(new RegExp(`${sep}[ ]*{`));
      let optionsString = `{${c[1]}`;
      key = c[0];
      optionsString = this.interpolate(optionsString, clonedOptions);
      const matchedSingleQuotes = optionsString.match(/'/g);
      const matchedDoubleQuotes = optionsString.match(/"/g);
      if (matchedSingleQuotes && matchedSingleQuotes.length % 2 === 0 && !matchedDoubleQuotes || matchedDoubleQuotes.length % 2 !== 0) {
        optionsString = optionsString.replace(/'/g, '"');
      }
      try {
        clonedOptions = JSON.parse(optionsString);
        if (inheritedOptions) clonedOptions = {
          ...inheritedOptions,
          ...clonedOptions
        };
      } catch (e) {
        this.logger.warn(`failed parsing options string in nesting for key ${key}`, e);
        return `${key}${sep}${optionsString}`;
      }
      delete clonedOptions.defaultValue;
      return key;
    }
    while (match = this.nestingRegexp.exec(str)) {
      let formatters = [];
      clonedOptions = {
        ...options
      };
      clonedOptions = clonedOptions.replace && typeof clonedOptions.replace !== 'string' ? clonedOptions.replace : clonedOptions;
      clonedOptions.applyPostProcessor = false;
      delete clonedOptions.defaultValue;
      let doReduce = false;
      if (match[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(match[1])) {
        const r = match[1].split(this.formatSeparator).map(elem => elem.trim());
        match[1] = r.shift();
        formatters = r;
        doReduce = true;
      }
      value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
      if (value && match[0] === str && typeof value !== 'string') return value;
      if (typeof value !== 'string') value = makeString(value);
      if (!value) {
        this.logger.warn(`missed to resolve ${match[1]} for nesting ${str}`);
        value = '';
      }
      if (doReduce) {
        value = formatters.reduce((v, f) => this.format(v, f, options.lng, {
          ...options,
          interpolationkey: match[1].trim()
        }), value.trim());
      }
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
    }
    return str;
  }
}

function parseFormatStr(formatStr) {
  let formatName = formatStr.toLowerCase().trim();
  const formatOptions = {};
  if (formatStr.indexOf('(') > -1) {
    const p = formatStr.split('(');
    formatName = p[0].toLowerCase().trim();
    const optStr = p[1].substring(0, p[1].length - 1);
    if (formatName === 'currency' && optStr.indexOf(':') < 0) {
      if (!formatOptions.currency) formatOptions.currency = optStr.trim();
    } else if (formatName === 'relativetime' && optStr.indexOf(':') < 0) {
      if (!formatOptions.range) formatOptions.range = optStr.trim();
    } else {
      const opts = optStr.split(';');
      opts.forEach(opt => {
        if (!opt) return;
        const [key, ...rest] = opt.split(':');
        const val = rest.join(':').trim().replace(/^'+|'+$/g, '');
        if (!formatOptions[key.trim()]) formatOptions[key.trim()] = val;
        if (val === 'false') formatOptions[key.trim()] = false;
        if (val === 'true') formatOptions[key.trim()] = true;
        if (!isNaN(val)) formatOptions[key.trim()] = parseInt(val, 10);
      });
    }
  }
  return {
    formatName,
    formatOptions
  };
}
function createCachedFormatter(fn) {
  const cache = {};
  return function invokeFormatter(val, lng, options) {
    const key = lng + JSON.stringify(options);
    let formatter = cache[key];
    if (!formatter) {
      formatter = fn(getCleanedCode(lng), options);
      cache[key] = formatter;
    }
    return formatter(val);
  };
}
class Formatter {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.logger = baseLogger.create('formatter');
    this.options = options;
    this.formats = {
      number: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt
        });
        return val => formatter.format(val);
      }),
      currency: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt,
          style: 'currency'
        });
        return val => formatter.format(val);
      }),
      datetime: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.DateTimeFormat(lng, {
          ...opt
        });
        return val => formatter.format(val);
      }),
      relativetime: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.RelativeTimeFormat(lng, {
          ...opt
        });
        return val => formatter.format(val, opt.range || 'day');
      }),
      list: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.ListFormat(lng, {
          ...opt
        });
        return val => formatter.format(val);
      })
    };
    this.init(options);
  }
  init(services) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      interpolation: {}
    };
    const iOpts = options.interpolation;
    this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
  }
  add(name, fc) {
    this.formats[name.toLowerCase().trim()] = fc;
  }
  addCached(name, fc) {
    this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
  }
  format(value, format, lng) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const formats = format.split(this.formatSeparator);
    const result = formats.reduce((mem, f) => {
      const {
        formatName,
        formatOptions
      } = parseFormatStr(f);
      if (this.formats[formatName]) {
        let formatted = mem;
        try {
          const valOptions = options && options.formatParams && options.formatParams[options.interpolationkey] || {};
          const l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
          formatted = this.formats[formatName](mem, l, {
            ...formatOptions,
            ...options,
            ...valOptions
          });
        } catch (error) {
          this.logger.warn(error);
        }
        return formatted;
      } else {
        this.logger.warn(`there was no format function for ${formatName}`);
      }
      return mem;
    }, value);
    return result;
  }
}

function removePending(q, name) {
  if (q.pending[name] !== undefined) {
    delete q.pending[name];
    q.pendingCount--;
  }
}
class Connector extends EventEmitter {
  constructor(backend, store, services) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    super();
    this.backend = backend;
    this.store = store;
    this.services = services;
    this.languageUtils = services.languageUtils;
    this.options = options;
    this.logger = baseLogger.create('backendConnector');
    this.waitingReads = [];
    this.maxParallelReads = options.maxParallelReads || 10;
    this.readingCalls = 0;
    this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
    this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
    this.state = {};
    this.queue = [];
    if (this.backend && this.backend.init) {
      this.backend.init(services, options.backend, options);
    }
  }
  queueLoad(languages, namespaces, options, callback) {
    const toLoad = {};
    const pending = {};
    const toLoadLanguages = {};
    const toLoadNamespaces = {};
    languages.forEach(lng => {
      let hasAllNamespaces = true;
      namespaces.forEach(ns => {
        const name = `${lng}|${ns}`;
        if (!options.reload && this.store.hasResourceBundle(lng, ns)) {
          this.state[name] = 2;
        } else if (this.state[name] < 0) ; else if (this.state[name] === 1) {
          if (pending[name] === undefined) pending[name] = true;
        } else {
          this.state[name] = 1;
          hasAllNamespaces = false;
          if (pending[name] === undefined) pending[name] = true;
          if (toLoad[name] === undefined) toLoad[name] = true;
          if (toLoadNamespaces[ns] === undefined) toLoadNamespaces[ns] = true;
        }
      });
      if (!hasAllNamespaces) toLoadLanguages[lng] = true;
    });
    if (Object.keys(toLoad).length || Object.keys(pending).length) {
      this.queue.push({
        pending,
        pendingCount: Object.keys(pending).length,
        loaded: {},
        errors: [],
        callback
      });
    }
    return {
      toLoad: Object.keys(toLoad),
      pending: Object.keys(pending),
      toLoadLanguages: Object.keys(toLoadLanguages),
      toLoadNamespaces: Object.keys(toLoadNamespaces)
    };
  }
  loaded(name, err, data) {
    const s = name.split('|');
    const lng = s[0];
    const ns = s[1];
    if (err) this.emit('failedLoading', lng, ns, err);
    if (data) {
      this.store.addResourceBundle(lng, ns, data);
    }
    this.state[name] = err ? -1 : 2;
    const loaded = {};
    this.queue.forEach(q => {
      pushPath(q.loaded, [lng], ns);
      removePending(q, name);
      if (err) q.errors.push(err);
      if (q.pendingCount === 0 && !q.done) {
        Object.keys(q.loaded).forEach(l => {
          if (!loaded[l]) loaded[l] = {};
          const loadedKeys = q.loaded[l];
          if (loadedKeys.length) {
            loadedKeys.forEach(n => {
              if (loaded[l][n] === undefined) loaded[l][n] = true;
            });
          }
        });
        q.done = true;
        if (q.errors.length) {
          q.callback(q.errors);
        } else {
          q.callback();
        }
      }
    });
    this.emit('loaded', loaded);
    this.queue = this.queue.filter(q => !q.done);
  }
  read(lng, ns, fcName) {
    let tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    let wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.retryTimeout;
    let callback = arguments.length > 5 ? arguments[5] : undefined;
    if (!lng.length) return callback(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng,
        ns,
        fcName,
        tried,
        wait,
        callback
      });
      return;
    }
    this.readingCalls++;
    const resolver = (err, data) => {
      this.readingCalls--;
      if (this.waitingReads.length > 0) {
        const next = this.waitingReads.shift();
        this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
      }
      if (err && data && tried < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, lng, ns, fcName, tried + 1, wait * 2, callback);
        }, wait);
        return;
      }
      callback(err, data);
    };
    const fc = this.backend[fcName].bind(this.backend);
    if (fc.length === 2) {
      try {
        const r = fc(lng, ns);
        if (r && typeof r.then === 'function') {
          r.then(data => resolver(null, data)).catch(resolver);
        } else {
          resolver(null, r);
        }
      } catch (err) {
        resolver(err);
      }
      return;
    }
    return fc(lng, ns, resolver);
  }
  prepareLoading(languages, namespaces) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let callback = arguments.length > 3 ? arguments[3] : undefined;
    if (!this.backend) {
      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
      return callback && callback();
    }
    if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
    if (typeof namespaces === 'string') namespaces = [namespaces];
    const toLoad = this.queueLoad(languages, namespaces, options, callback);
    if (!toLoad.toLoad.length) {
      if (!toLoad.pending.length) callback();
      return null;
    }
    toLoad.toLoad.forEach(name => {
      this.loadOne(name);
    });
  }
  load(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {}, callback);
  }
  reload(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {
      reload: true
    }, callback);
  }
  loadOne(name) {
    let prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    const s = name.split('|');
    const lng = s[0];
    const ns = s[1];
    this.read(lng, ns, 'read', undefined, undefined, (err, data) => {
      if (err) this.logger.warn(`${prefix}loading namespace ${ns} for language ${lng} failed`, err);
      if (!err && data) this.logger.log(`${prefix}loaded namespace ${ns} for language ${lng}`, data);
      this.loaded(name, err, data);
    });
  }
  saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
    let options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    let clb = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : () => {};
    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(namespace)) {
      this.logger.warn(`did not save key "${key}" as the namespace "${namespace}" was not yet loaded`, 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
      return;
    }
    if (key === undefined || key === null || key === '') return;
    if (this.backend && this.backend.create) {
      const opts = {
        ...options,
        isUpdate
      };
      const fc = this.backend.create.bind(this.backend);
      if (fc.length < 6) {
        try {
          let r;
          if (fc.length === 5) {
            r = fc(languages, namespace, key, fallbackValue, opts);
          } else {
            r = fc(languages, namespace, key, fallbackValue);
          }
          if (r && typeof r.then === 'function') {
            r.then(data => clb(null, data)).catch(clb);
          } else {
            clb(null, r);
          }
        } catch (err) {
          clb(err);
        }
      } else {
        fc(languages, namespace, key, fallbackValue, clb, opts);
      }
    }
    if (!languages || !languages[0]) return;
    this.store.addResource(languages[0], namespace, key, fallbackValue);
  }
}

function i18next_get() {
  return {
    debug: false,
    initImmediate: true,
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false,
    supportedLngs: false,
    nonExplicitSupportedLngs: false,
    load: 'all',
    preload: false,
    simplifyPluralSuffix: true,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',
    partialBundledLanguages: false,
    saveMissing: false,
    updateMissing: false,
    saveMissingTo: 'fallback',
    saveMissingPlurals: true,
    missingKeyHandler: false,
    missingInterpolationHandler: false,
    postProcess: false,
    postProcessPassResolved: false,
    returnNull: false,
    returnEmptyString: true,
    returnObjects: false,
    joinArrays: false,
    returnedObjectHandler: false,
    parseMissingKeyHandler: false,
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: function handle(args) {
      let ret = {};
      if (typeof args[1] === 'object') ret = args[1];
      if (typeof args[1] === 'string') ret.defaultValue = args[1];
      if (typeof args[2] === 'string') ret.tDescription = args[2];
      if (typeof args[2] === 'object' || typeof args[3] === 'object') {
        const options = args[3] || args[2];
        Object.keys(options).forEach(key => {
          ret[key] = options[key];
        });
      }
      return ret;
    },
    interpolation: {
      escapeValue: true,
      format: (value, format, lng, options) => value,
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      unescapePrefix: '-',
      nestingPrefix: '$t(',
      nestingSuffix: ')',
      nestingOptionsSeparator: ',',
      maxReplaces: 1000,
      skipOnVariables: true
    }
  };
}
function transformOptions(options) {
  if (typeof options.ns === 'string') options.ns = [options.ns];
  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];
  if (options.supportedLngs && options.supportedLngs.indexOf('cimode') < 0) {
    options.supportedLngs = options.supportedLngs.concat(['cimode']);
  }
  return options;
}

function noop() {}
function bindMemberFunctions(inst) {
  const mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
  mems.forEach(mem => {
    if (typeof inst[mem] === 'function') {
      inst[mem] = inst[mem].bind(inst);
    }
  });
}
class I18n extends EventEmitter {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let callback = arguments.length > 1 ? arguments[1] : undefined;
    super();
    this.options = transformOptions(options);
    this.services = {};
    this.logger = baseLogger;
    this.modules = {
      external: []
    };
    bindMemberFunctions(this);
    if (callback && !this.isInitialized && !options.isClone) {
      if (!this.options.initImmediate) {
        this.init(options, callback);
        return this;
      }
      setTimeout(() => {
        this.init(options, callback);
      }, 0);
    }
  }
  init() {
    var _this = this;
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let callback = arguments.length > 1 ? arguments[1] : undefined;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!options.defaultNS && options.defaultNS !== false && options.ns) {
      if (typeof options.ns === 'string') {
        options.defaultNS = options.ns;
      } else if (options.ns.indexOf('translation') < 0) {
        options.defaultNS = options.ns[0];
      }
    }
    const defOpts = i18next_get();
    this.options = {
      ...defOpts,
      ...this.options,
      ...transformOptions(options)
    };
    if (this.options.compatibilityAPI !== 'v1') {
      this.options.interpolation = {
        ...defOpts.interpolation,
        ...this.options.interpolation
      };
    }
    if (options.keySeparator !== undefined) {
      this.options.userDefinedKeySeparator = options.keySeparator;
    }
    if (options.nsSeparator !== undefined) {
      this.options.userDefinedNsSeparator = options.nsSeparator;
    }
    function createClassOnDemand(ClassOrObject) {
      if (!ClassOrObject) return null;
      if (typeof ClassOrObject === 'function') return new ClassOrObject();
      return ClassOrObject;
    }
    if (!this.options.isClone) {
      if (this.modules.logger) {
        baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
      } else {
        baseLogger.init(null, this.options);
      }
      let formatter;
      if (this.modules.formatter) {
        formatter = this.modules.formatter;
      } else if (typeof Intl !== 'undefined') {
        formatter = Formatter;
      }
      const lu = new LanguageUtil(this.options);
      this.store = new ResourceStore(this.options.resources, this.options);
      const s = this.services;
      s.logger = baseLogger;
      s.resourceStore = this.store;
      s.languageUtils = lu;
      s.pluralResolver = new PluralResolver(lu, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      });
      if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
        s.formatter = createClassOnDemand(formatter);
        s.formatter.init(s, this.options);
        this.options.interpolation.format = s.formatter.format.bind(s.formatter);
      }
      s.interpolator = new Interpolator(this.options);
      s.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      };
      s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
      s.backendConnector.on('*', function (event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        _this.emit(event, ...args);
      });
      if (this.modules.languageDetector) {
        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
        if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
      }
      if (this.modules.i18nFormat) {
        s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
        if (s.i18nFormat.init) s.i18nFormat.init(this);
      }
      this.translator = new Translator(this.services, this.options);
      this.translator.on('*', function (event) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        _this.emit(event, ...args);
      });
      this.modules.external.forEach(m => {
        if (m.init) m.init(this);
      });
    }
    this.format = this.options.interpolation.format;
    if (!callback) callback = noop;
    if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      if (codes.length > 0 && codes[0] !== 'dev') this.options.lng = codes[0];
    }
    if (!this.services.languageDetector && !this.options.lng) {
      this.logger.warn('init: no languageDetector is used and no lng is defined');
    }
    const storeApi = ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
    storeApi.forEach(fcName => {
      this[fcName] = function () {
        return _this.store[fcName](...arguments);
      };
    });
    const storeApiChained = ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'];
    storeApiChained.forEach(fcName => {
      this[fcName] = function () {
        _this.store[fcName](...arguments);
        return _this;
      };
    });
    const deferred = defer();
    const load = () => {
      const finish = (err, t) => {
        if (this.isInitialized && !this.initializedStoreOnce) this.logger.warn('init: i18next is already initialized. You should call init just once!');
        this.isInitialized = true;
        if (!this.options.isClone) this.logger.log('initialized', this.options);
        this.emit('initialized', this.options);
        deferred.resolve(t);
        callback(err, t);
      };
      if (this.languages && this.options.compatibilityAPI !== 'v1' && !this.isInitialized) return finish(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, finish);
    };
    if (this.options.resources || !this.options.initImmediate) {
      load();
    } else {
      setTimeout(load, 0);
    }
    return deferred;
  }
  loadResources(language) {
    let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    let usedCallback = callback;
    const usedLng = typeof language === 'string' ? language : this.language;
    if (typeof language === 'function') usedCallback = language;
    if (!this.options.resources || this.options.partialBundledLanguages) {
      if (usedLng && usedLng.toLowerCase() === 'cimode' && (!this.options.preload || this.options.preload.length === 0)) return usedCallback();
      const toLoad = [];
      const append = lng => {
        if (!lng) return;
        if (lng === 'cimode') return;
        const lngs = this.services.languageUtils.toResolveHierarchy(lng);
        lngs.forEach(l => {
          if (l === 'cimode') return;
          if (toLoad.indexOf(l) < 0) toLoad.push(l);
        });
      };
      if (!usedLng) {
        const fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        fallbacks.forEach(l => append(l));
      } else {
        append(usedLng);
      }
      if (this.options.preload) {
        this.options.preload.forEach(l => append(l));
      }
      this.services.backendConnector.load(toLoad, this.options.ns, e => {
        if (!e && !this.resolvedLanguage && this.language) this.setResolvedLanguage(this.language);
        usedCallback(e);
      });
    } else {
      usedCallback(null);
    }
  }
  reloadResources(lngs, ns, callback) {
    const deferred = defer();
    if (!lngs) lngs = this.languages;
    if (!ns) ns = this.options.ns;
    if (!callback) callback = noop;
    this.services.backendConnector.reload(lngs, ns, err => {
      deferred.resolve();
      callback(err);
    });
    return deferred;
  }
  use(module) {
    if (!module) throw new Error('You are passing an undefined module! Please check the object you are passing to i18next.use()');
    if (!module.type) throw new Error('You are passing a wrong module! Please check the object you are passing to i18next.use()');
    if (module.type === 'backend') {
      this.modules.backend = module;
    }
    if (module.type === 'logger' || module.log && module.warn && module.error) {
      this.modules.logger = module;
    }
    if (module.type === 'languageDetector') {
      this.modules.languageDetector = module;
    }
    if (module.type === 'i18nFormat') {
      this.modules.i18nFormat = module;
    }
    if (module.type === 'postProcessor') {
      postProcessor.addPostProcessor(module);
    }
    if (module.type === 'formatter') {
      this.modules.formatter = module;
    }
    if (module.type === '3rdParty') {
      this.modules.external.push(module);
    }
    return this;
  }
  setResolvedLanguage(l) {
    if (!l || !this.languages) return;
    if (['cimode', 'dev'].indexOf(l) > -1) return;
    for (let li = 0; li < this.languages.length; li++) {
      const lngInLngs = this.languages[li];
      if (['cimode', 'dev'].indexOf(lngInLngs) > -1) continue;
      if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
        this.resolvedLanguage = lngInLngs;
        break;
      }
    }
  }
  changeLanguage(lng, callback) {
    var _this2 = this;
    this.isLanguageChangingTo = lng;
    const deferred = defer();
    this.emit('languageChanging', lng);
    const setLngProps = l => {
      this.language = l;
      this.languages = this.services.languageUtils.toResolveHierarchy(l);
      this.resolvedLanguage = undefined;
      this.setResolvedLanguage(l);
    };
    const done = (err, l) => {
      if (l) {
        setLngProps(l);
        this.translator.changeLanguage(l);
        this.isLanguageChangingTo = undefined;
        this.emit('languageChanged', l);
        this.logger.log('languageChanged', l);
      } else {
        this.isLanguageChangingTo = undefined;
      }
      deferred.resolve(function () {
        return _this2.t(...arguments);
      });
      if (callback) callback(err, function () {
        return _this2.t(...arguments);
      });
    };
    const setLng = lngs => {
      if (!lng && !lngs && this.services.languageDetector) lngs = [];
      const l = typeof lngs === 'string' ? lngs : this.services.languageUtils.getBestMatchFromCodes(lngs);
      if (l) {
        if (!this.language) {
          setLngProps(l);
        }
        if (!this.translator.language) this.translator.changeLanguage(l);
        if (this.services.languageDetector && this.services.languageDetector.cacheUserLanguage) this.services.languageDetector.cacheUserLanguage(l);
      }
      this.loadResources(l, err => {
        done(err, l);
      });
    };
    if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
      setLng(this.services.languageDetector.detect());
    } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
      if (this.services.languageDetector.detect.length === 0) {
        this.services.languageDetector.detect().then(setLng);
      } else {
        this.services.languageDetector.detect(setLng);
      }
    } else {
      setLng(lng);
    }
    return deferred;
  }
  getFixedT(lng, ns, keyPrefix) {
    var _this3 = this;
    const fixedT = function (key, opts) {
      let options;
      if (typeof opts !== 'object') {
        for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
          rest[_key3 - 2] = arguments[_key3];
        }
        options = _this3.options.overloadTranslationOptionHandler([key, opts].concat(rest));
      } else {
        options = {
          ...opts
        };
      }
      options.lng = options.lng || fixedT.lng;
      options.lngs = options.lngs || fixedT.lngs;
      options.ns = options.ns || fixedT.ns;
      options.keyPrefix = options.keyPrefix || keyPrefix || fixedT.keyPrefix;
      const keySeparator = _this3.options.keySeparator || '.';
      let resultKey;
      if (options.keyPrefix && Array.isArray(key)) {
        resultKey = key.map(k => `${options.keyPrefix}${keySeparator}${k}`);
      } else {
        resultKey = options.keyPrefix ? `${options.keyPrefix}${keySeparator}${key}` : key;
      }
      return _this3.t(resultKey, options);
    };
    if (typeof lng === 'string') {
      fixedT.lng = lng;
    } else {
      fixedT.lngs = lng;
    }
    fixedT.ns = ns;
    fixedT.keyPrefix = keyPrefix;
    return fixedT;
  }
  t() {
    return this.translator && this.translator.translate(...arguments);
  }
  exists() {
    return this.translator && this.translator.exists(...arguments);
  }
  setDefaultNamespace(ns) {
    this.options.defaultNS = ns;
  }
  hasLoadedNamespace(ns) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!this.isInitialized) {
      this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages);
      return false;
    }
    if (!this.languages || !this.languages.length) {
      this.logger.warn('hasLoadedNamespace: i18n.languages were undefined or empty', this.languages);
      return false;
    }
    const lng = options.lng || this.resolvedLanguage || this.languages[0];
    const fallbackLng = this.options ? this.options.fallbackLng : false;
    const lastLng = this.languages[this.languages.length - 1];
    if (lng.toLowerCase() === 'cimode') return true;
    const loadNotPending = (l, n) => {
      const loadState = this.services.backendConnector.state[`${l}|${n}`];
      return loadState === -1 || loadState === 2;
    };
    if (options.precheck) {
      const preResult = options.precheck(this, loadNotPending);
      if (preResult !== undefined) return preResult;
    }
    if (this.hasResourceBundle(lng, ns)) return true;
    if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
    if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
    return false;
  }
  loadNamespaces(ns, callback) {
    const deferred = defer();
    if (!this.options.ns) {
      if (callback) callback();
      return Promise.resolve();
    }
    if (typeof ns === 'string') ns = [ns];
    ns.forEach(n => {
      if (this.options.ns.indexOf(n) < 0) this.options.ns.push(n);
    });
    this.loadResources(err => {
      deferred.resolve();
      if (callback) callback(err);
    });
    return deferred;
  }
  loadLanguages(lngs, callback) {
    const deferred = defer();
    if (typeof lngs === 'string') lngs = [lngs];
    const preloaded = this.options.preload || [];
    const newLngs = lngs.filter(lng => preloaded.indexOf(lng) < 0);
    if (!newLngs.length) {
      if (callback) callback();
      return Promise.resolve();
    }
    this.options.preload = preloaded.concat(newLngs);
    this.loadResources(err => {
      deferred.resolve();
      if (callback) callback(err);
    });
    return deferred;
  }
  dir(lng) {
    if (!lng) lng = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language);
    if (!lng) return 'rtl';
    const rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ug', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam', 'ckb'];
    const languageUtils = this.services && this.services.languageUtils || new LanguageUtil(i18next_get());
    return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf('-arab') > 1 ? 'rtl' : 'ltr';
  }
  static createInstance() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let callback = arguments.length > 1 ? arguments[1] : undefined;
    return new I18n(options, callback);
  }
  cloneInstance() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
    const forkResourceStore = options.forkResourceStore;
    if (forkResourceStore) delete options.forkResourceStore;
    const mergedOptions = {
      ...this.options,
      ...options,
      ...{
        isClone: true
      }
    };
    const clone = new I18n(mergedOptions);
    if (options.debug !== undefined || options.prefix !== undefined) {
      clone.logger = clone.logger.clone(options);
    }
    const membersToCopy = ['store', 'services', 'language'];
    membersToCopy.forEach(m => {
      clone[m] = this[m];
    });
    clone.services = {
      ...this.services
    };
    clone.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    if (forkResourceStore) {
      clone.store = new ResourceStore(this.store.data, mergedOptions);
      clone.services.resourceStore = clone.store;
    }
    clone.translator = new Translator(clone.services, mergedOptions);
    clone.translator.on('*', function (event) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      clone.emit(event, ...args);
    });
    clone.init(mergedOptions, callback);
    clone.translator.options = mergedOptions;
    clone.translator.backendConnector.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    return clone;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const instance = I18n.createInstance();
instance.createInstance = I18n.createInstance;

const createInstance = instance.createInstance;
const i18next_dir = instance.dir;
const init = instance.init;
const loadResources = instance.loadResources;
const reloadResources = instance.reloadResources;
const use = instance.use;
const changeLanguage = instance.changeLanguage;
const getFixedT = instance.getFixedT;
const t = instance.t;
const exists = instance.exists;
const setDefaultNamespace = instance.setDefaultNamespace;
const hasLoadedNamespace = instance.hasLoadedNamespace;
const loadNamespaces = instance.loadNamespaces;
const loadLanguages = instance.loadLanguages;



// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(294);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function extends_extends() {
  return extends_extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, extends_extends.apply(null, arguments);
}

// EXTERNAL MODULE: ./node_modules/void-elements/index.js
var void_elements = __webpack_require__(739);
var void_elements_default = /*#__PURE__*/__webpack_require__.n(void_elements);
;// CONCATENATED MODULE: ./node_modules/html-parse-stringify/dist/html-parse-stringify.module.js
var html_parse_stringify_module_t=/\s([^'"/\s><]+?)[\s/>]|([^\s=]+)=\s?(".*?"|'.*?')/g;function n(n){var r={type:"tag",name:"",voidElement:!1,attrs:{},children:[]},i=n.match(/<\/?([^\s]+?)[/\s>]/);if(i&&(r.name=i[1],((void_elements_default())[i[1]]||"/"===n.charAt(n.length-2))&&(r.voidElement=!0),r.name.startsWith("!--"))){var s=n.indexOf("--\x3e");return{type:"comment",comment:-1!==s?n.slice(4,s):""}}for(var a=new RegExp(html_parse_stringify_module_t),c=null;null!==(c=a.exec(n));)if(c[0].trim())if(c[1]){var o=c[1].trim(),l=[o,""];o.indexOf("=")>-1&&(l=o.split("=")),r.attrs[l[0]]=l[1],a.lastIndex--}else c[2]&&(r.attrs[c[2]]=c[3].trim().substring(1,c[3].length-1));return r}var html_parse_stringify_module_r=/<[a-zA-Z0-9\-\!\/](?:"[^"]*"|'[^']*'|[^'">])*>/g,html_parse_stringify_module_i=/^\s*$/,html_parse_stringify_module_s=Object.create(null);function a(e,t){switch(t.type){case"text":return e+t.content;case"tag":return e+="<"+t.name+(t.attrs?function(e){var t=[];for(var n in e)t.push(n+'="'+e[n]+'"');return t.length?" "+t.join(" "):""}(t.attrs):"")+(t.voidElement?"/>":">"),t.voidElement?e:e+t.children.reduce(a,"")+"</"+t.name+">";case"comment":return e+"\x3c!--"+t.comment+"--\x3e"}}var html_parse_stringify_module_c={parse:function(e,t){t||(t={}),t.components||(t.components=html_parse_stringify_module_s);var a,c=[],o=[],l=-1,m=!1;if(0!==e.indexOf("<")){var u=e.indexOf("<");c.push({type:"text",content:-1===u?e:e.substring(0,u)})}return e.replace(html_parse_stringify_module_r,function(r,s){if(m){if(r!=="</"+a.name+">")return;m=!1}var u,f="/"!==r.charAt(1),h=r.startsWith("\x3c!--"),p=s+r.length,d=e.charAt(p);if(h){var v=n(r);return l<0?(c.push(v),c):((u=o[l]).children.push(v),c)}if(f&&(l++,"tag"===(a=n(r)).type&&t.components[a.name]&&(a.type="component",m=!0),a.voidElement||m||!d||"<"===d||a.children.push({type:"text",content:e.slice(p,e.indexOf("<",p))}),0===l&&c.push(a),(u=o[l-1])&&u.children.push(a),o[l]=a),(!f||a.voidElement)&&(l>-1&&(a.voidElement||a.name===r.slice(2,-1))&&(l--,a=-1===l?c:o[l]),!m&&"<"!==d&&d)){u=-1===l?c:o[l].children;var x=e.indexOf("<",p),g=e.slice(p,-1===x?void 0:x);html_parse_stringify_module_i.test(g)&&(g=" "),(x>-1&&l+u.length>=0||" "!==g)&&u.push({type:"text",content:g})}}),c},stringify:function(e){return e.reduce(function(e,t){return e+a("",t)},"")}};/* harmony default export */ const html_parse_stringify_module = (html_parse_stringify_module_c);
//# sourceMappingURL=html-parse-stringify.module.js.map

;// CONCATENATED MODULE: ./node_modules/react-i18next/dist/es/utils.js
function warn() {
  if (console && console.warn) {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (typeof args[0] === 'string') args[0] = `react-i18next:: ${args[0]}`;
    console.warn(...args);
  }
}
const alreadyWarned = {};
function warnOnce() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  if (typeof args[0] === 'string' && alreadyWarned[args[0]]) return;
  if (typeof args[0] === 'string') alreadyWarned[args[0]] = new Date();
  warn(...args);
}
const loadedClb = (i18n, cb) => () => {
  if (i18n.isInitialized) {
    cb();
  } else {
    const initialized = () => {
      setTimeout(() => {
        i18n.off('initialized', initialized);
      }, 0);
      cb();
    };
    i18n.on('initialized', initialized);
  }
};
function utils_loadNamespaces(i18n, ns, cb) {
  i18n.loadNamespaces(ns, loadedClb(i18n, cb));
}
function utils_loadLanguages(i18n, lng, ns, cb) {
  if (typeof ns === 'string') ns = [ns];
  ns.forEach(n => {
    if (i18n.options.ns.indexOf(n) < 0) i18n.options.ns.push(n);
  });
  i18n.loadLanguages(lng, loadedClb(i18n, cb));
}
function oldI18nextHasLoadedNamespace(ns, i18n) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const lng = i18n.languages[0];
  const fallbackLng = i18n.options ? i18n.options.fallbackLng : false;
  const lastLng = i18n.languages[i18n.languages.length - 1];
  if (lng.toLowerCase() === 'cimode') return true;
  const loadNotPending = (l, n) => {
    const loadState = i18n.services.backendConnector.state[`${l}|${n}`];
    return loadState === -1 || loadState === 2;
  };
  if (options.bindI18n && options.bindI18n.indexOf('languageChanging') > -1 && i18n.services.backendConnector.backend && i18n.isLanguageChangingTo && !loadNotPending(i18n.isLanguageChangingTo, ns)) return false;
  if (i18n.hasResourceBundle(lng, ns)) return true;
  if (!i18n.services.backendConnector.backend || i18n.options.resources && !i18n.options.partialBundledLanguages) return true;
  if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
  return false;
}
function utils_hasLoadedNamespace(ns, i18n) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!i18n.languages || !i18n.languages.length) {
    warnOnce('i18n.languages were undefined or empty', i18n.languages);
    return true;
  }
  const isNewerI18next = i18n.options.ignoreJSONStructure !== undefined;
  if (!isNewerI18next) {
    return oldI18nextHasLoadedNamespace(ns, i18n, options);
  }
  return i18n.hasLoadedNamespace(ns, {
    lng: options.lng,
    precheck: (i18nInstance, loadNotPending) => {
      if (options.bindI18n && options.bindI18n.indexOf('languageChanging') > -1 && i18nInstance.services.backendConnector.backend && i18nInstance.isLanguageChangingTo && !loadNotPending(i18nInstance.isLanguageChangingTo, ns)) return false;
    }
  });
}
function utils_getDisplayName(Component) {
  return Component.displayName || Component.name || (typeof Component === 'string' && Component.length > 0 ? Component : 'Unknown');
}
;// CONCATENATED MODULE: ./node_modules/react-i18next/dist/es/unescape.js
const matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
const htmlEntities = {
  '&amp;': '&',
  '&#38;': '&',
  '&lt;': '<',
  '&#60;': '<',
  '&gt;': '>',
  '&#62;': '>',
  '&apos;': "'",
  '&#39;': "'",
  '&quot;': '"',
  '&#34;': '"',
  '&nbsp;': ' ',
  '&#160;': ' ',
  '&copy;': '©',
  '&#169;': '©',
  '&reg;': '®',
  '&#174;': '®',
  '&hellip;': '…',
  '&#8230;': '…',
  '&#x2F;': '/',
  '&#47;': '/'
};
const unescapeHtmlEntity = m => htmlEntities[m];
const unescape_unescape = text => text.replace(matchHtmlEntity, unescapeHtmlEntity);
;// CONCATENATED MODULE: ./node_modules/react-i18next/dist/es/defaults.js

let defaultOptions = {
  bindI18n: 'languageChanged',
  bindI18nStore: '',
  transEmptyNodeValue: '',
  transSupportBasicHtmlNodes: true,
  transWrapTextNodes: '',
  transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
  useSuspense: true,
  unescape: unescape_unescape
};
function setDefaults() {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  defaultOptions = {
    ...defaultOptions,
    ...options
  };
}
function getDefaults() {
  return defaultOptions;
}
;// CONCATENATED MODULE: ./node_modules/react-i18next/dist/es/i18nInstance.js
let i18nInstance;
function setI18n(instance) {
  i18nInstance = instance;
}
function i18nInstance_getI18n() {
  return i18nInstance;
}
;// CONCATENATED MODULE: ./node_modules/react-i18next/dist/es/TransWithoutContext.js






function hasChildren(node, checkLength) {
  if (!node) return false;
  const base = node.props ? node.props.children : node.children;
  if (checkLength) return base.length > 0;
  return !!base;
}
function getChildren(node) {
  if (!node) return [];
  const children = node.props ? node.props.children : node.children;
  return node.props && node.props.i18nIsDynamicList ? getAsArray(children) : children;
}
function hasValidReactChildren(children) {
  if (Object.prototype.toString.call(children) !== '[object Array]') return false;
  return children.every(child => (0,react.isValidElement)(child));
}
function getAsArray(data) {
  return Array.isArray(data) ? data : [data];
}
function mergeProps(source, target) {
  const newTarget = {
    ...target
  };
  newTarget.props = Object.assign(source.props, target.props);
  return newTarget;
}
function nodesToString(children, i18nOptions) {
  if (!children) return '';
  let stringNode = '';
  const childrenArray = getAsArray(children);
  const keepArray = i18nOptions.transSupportBasicHtmlNodes && i18nOptions.transKeepBasicHtmlNodesFor ? i18nOptions.transKeepBasicHtmlNodesFor : [];
  childrenArray.forEach((child, childIndex) => {
    if (typeof child === 'string') {
      stringNode += `${child}`;
    } else if ((0,react.isValidElement)(child)) {
      const childPropsCount = Object.keys(child.props).length;
      const shouldKeepChild = keepArray.indexOf(child.type) > -1;
      const childChildren = child.props.children;
      if (!childChildren && shouldKeepChild && childPropsCount === 0) {
        stringNode += `<${child.type}/>`;
      } else if (!childChildren && (!shouldKeepChild || childPropsCount !== 0)) {
        stringNode += `<${childIndex}></${childIndex}>`;
      } else if (child.props.i18nIsDynamicList) {
        stringNode += `<${childIndex}></${childIndex}>`;
      } else if (shouldKeepChild && childPropsCount === 1 && typeof childChildren === 'string') {
        stringNode += `<${child.type}>${childChildren}</${child.type}>`;
      } else {
        const content = nodesToString(childChildren, i18nOptions);
        stringNode += `<${childIndex}>${content}</${childIndex}>`;
      }
    } else if (child === null) {
      warn(`Trans: the passed in value is invalid - seems you passed in a null child.`);
    } else if (typeof child === 'object') {
      const {
        format,
        ...clone
      } = child;
      const keys = Object.keys(clone);
      if (keys.length === 1) {
        const value = format ? `${keys[0]}, ${format}` : keys[0];
        stringNode += `{{${value}}}`;
      } else {
        warn(`react-i18next: the passed in object contained more than one variable - the object should look like {{ value, format }} where format is optional.`, child);
      }
    } else {
      warn(`Trans: the passed in value is invalid - seems you passed in a variable like {number} - please pass in variables for interpolation as full objects like {{number}}.`, child);
    }
  });
  return stringNode;
}
function renderNodes(children, targetString, i18n, i18nOptions, combinedTOpts, shouldUnescape) {
  if (targetString === '') return [];
  const keepArray = i18nOptions.transKeepBasicHtmlNodesFor || [];
  const emptyChildrenButNeedsHandling = targetString && new RegExp(keepArray.map(keep => `<${keep}`).join('|')).test(targetString);
  if (!children && !emptyChildrenButNeedsHandling && !shouldUnescape) return [targetString];
  const data = {};
  function getData(childs) {
    const childrenArray = getAsArray(childs);
    childrenArray.forEach(child => {
      if (typeof child === 'string') return;
      if (hasChildren(child)) getData(getChildren(child));else if (typeof child === 'object' && !(0,react.isValidElement)(child)) Object.assign(data, child);
    });
  }
  getData(children);
  const ast = html_parse_stringify_module.parse(`<0>${targetString}</0>`);
  const opts = {
    ...data,
    ...combinedTOpts
  };
  function renderInner(child, node, rootReactNode) {
    const childs = getChildren(child);
    const mappedChildren = mapAST(childs, node.children, rootReactNode);
    return hasValidReactChildren(childs) && mappedChildren.length === 0 || child.props && child.props.i18nIsDynamicList ? childs : mappedChildren;
  }
  function pushTranslatedJSX(child, inner, mem, i, isVoid) {
    if (child.dummy) {
      child.children = inner;
      mem.push((0,react.cloneElement)(child, {
        key: i
      }, isVoid ? undefined : inner));
    } else {
      mem.push(...react.Children.map([child], c => {
        const props = {
          ...c.props
        };
        delete props.i18nIsDynamicList;
        return react.createElement(c.type, extends_extends({}, props, {
          key: i,
          ref: c.ref
        }, isVoid ? {} : {
          children: inner
        }));
      }));
    }
  }
  function mapAST(reactNode, astNode, rootReactNode) {
    const reactNodes = getAsArray(reactNode);
    const astNodes = getAsArray(astNode);
    return astNodes.reduce((mem, node, i) => {
      const translationContent = node.children && node.children[0] && node.children[0].content && i18n.services.interpolator.interpolate(node.children[0].content, opts, i18n.language);
      if (node.type === 'tag') {
        let tmp = reactNodes[parseInt(node.name, 10)];
        if (rootReactNode.length === 1 && !tmp) tmp = rootReactNode[0][node.name];
        if (!tmp) tmp = {};
        const child = Object.keys(node.attrs).length !== 0 ? mergeProps({
          props: node.attrs
        }, tmp) : tmp;
        const isElement = (0,react.isValidElement)(child);
        const isValidTranslationWithChildren = isElement && hasChildren(node, true) && !node.voidElement;
        const isEmptyTransWithHTML = emptyChildrenButNeedsHandling && typeof child === 'object' && child.dummy && !isElement;
        const isKnownComponent = typeof children === 'object' && children !== null && Object.hasOwnProperty.call(children, node.name);
        if (typeof child === 'string') {
          const value = i18n.services.interpolator.interpolate(child, opts, i18n.language);
          mem.push(value);
        } else if (hasChildren(child) || isValidTranslationWithChildren) {
          const inner = renderInner(child, node, rootReactNode);
          pushTranslatedJSX(child, inner, mem, i);
        } else if (isEmptyTransWithHTML) {
          const inner = mapAST(reactNodes, node.children, rootReactNode);
          pushTranslatedJSX(child, inner, mem, i);
        } else if (Number.isNaN(parseFloat(node.name))) {
          if (isKnownComponent) {
            const inner = renderInner(child, node, rootReactNode);
            pushTranslatedJSX(child, inner, mem, i, node.voidElement);
          } else if (i18nOptions.transSupportBasicHtmlNodes && keepArray.indexOf(node.name) > -1) {
            if (node.voidElement) {
              mem.push((0,react.createElement)(node.name, {
                key: `${node.name}-${i}`
              }));
            } else {
              const inner = mapAST(reactNodes, node.children, rootReactNode);
              mem.push((0,react.createElement)(node.name, {
                key: `${node.name}-${i}`
              }, inner));
            }
          } else if (node.voidElement) {
            mem.push(`<${node.name} />`);
          } else {
            const inner = mapAST(reactNodes, node.children, rootReactNode);
            mem.push(`<${node.name}>${inner}</${node.name}>`);
          }
        } else if (typeof child === 'object' && !isElement) {
          const content = node.children[0] ? translationContent : null;
          if (content) mem.push(content);
        } else {
          pushTranslatedJSX(child, translationContent, mem, i, node.children.length !== 1 || !translationContent);
        }
      } else if (node.type === 'text') {
        const wrapTextNodes = i18nOptions.transWrapTextNodes;
        const content = shouldUnescape ? i18nOptions.unescape(i18n.services.interpolator.interpolate(node.content, opts, i18n.language)) : i18n.services.interpolator.interpolate(node.content, opts, i18n.language);
        if (wrapTextNodes) {
          mem.push((0,react.createElement)(wrapTextNodes, {
            key: `${node.name}-${i}`
          }, content));
        } else {
          mem.push(content);
        }
      }
      return mem;
    }, []);
  }
  const result = mapAST([{
    dummy: true,
    children: children || []
  }], ast, getAsArray(children || []));
  return getChildren(result[0]);
}
function Trans(_ref) {
  let {
    children,
    count,
    parent,
    i18nKey,
    context,
    tOptions = {},
    values,
    defaults,
    components,
    ns,
    i18n: i18nFromProps,
    t: tFromProps,
    shouldUnescape,
    ...additionalProps
  } = _ref;
  const i18n = i18nFromProps || i18nInstance_getI18n();
  if (!i18n) {
    warnOnce('You will need to pass in an i18next instance by using i18nextReactModule');
    return children;
  }
  const t = tFromProps || i18n.t.bind(i18n) || (k => k);
  if (context) tOptions.context = context;
  const reactI18nextOptions = {
    ...getDefaults(),
    ...(i18n.options && i18n.options.react)
  };
  let namespaces = ns || t.ns || i18n.options && i18n.options.defaultNS;
  namespaces = typeof namespaces === 'string' ? [namespaces] : namespaces || ['translation'];
  const nodeAsString = nodesToString(children, reactI18nextOptions);
  const defaultValue = defaults || nodeAsString || reactI18nextOptions.transEmptyNodeValue || i18nKey;
  const {
    hashTransKey
  } = reactI18nextOptions;
  const key = i18nKey || (hashTransKey ? hashTransKey(nodeAsString || defaultValue) : nodeAsString || defaultValue);
  const interpolationOverride = values ? tOptions.interpolation : {
    interpolation: {
      ...tOptions.interpolation,
      prefix: '#$?',
      suffix: '?$#'
    }
  };
  const combinedTOpts = {
    ...tOptions,
    count,
    ...values,
    ...interpolationOverride,
    defaultValue,
    ns: namespaces
  };
  const translation = key ? t(key, combinedTOpts) : defaultValue;
  const content = renderNodes(components || children, translation, i18n, reactI18nextOptions, combinedTOpts, shouldUnescape);
  const useAsParent = parent !== undefined ? parent : reactI18nextOptions.defaultTransParent;
  return useAsParent ? (0,react.createElement)(useAsParent, additionalProps, content) : content;
}
;// CONCATENATED MODULE: ./node_modules/react-i18next/dist/es/initReactI18next.js


const initReactI18next = {
  type: '3rdParty',
  init(instance) {
    setDefaults(instance.options.react);
    setI18n(instance);
  }
};
;// CONCATENATED MODULE: ./node_modules/react-i18next/dist/es/context.js





const context_I18nContext = (0,react.createContext)();
class ReportNamespaces {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(namespaces) {
    namespaces.forEach(ns => {
      if (!this.usedNamespaces[ns]) this.usedNamespaces[ns] = true;
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
function context_composeInitialProps(ForComponent) {
  return ctx => new Promise(resolve => {
    const i18nInitialProps = getInitialProps();
    if (ForComponent.getInitialProps) {
      ForComponent.getInitialProps(ctx).then(componentsInitialProps => {
        resolve({
          ...componentsInitialProps,
          ...i18nInitialProps
        });
      });
    } else {
      resolve(i18nInitialProps);
    }
  });
}
function getInitialProps() {
  const i18n = getI18n();
  const namespaces = i18n.reportNamespaces ? i18n.reportNamespaces.getUsedNamespaces() : [];
  const ret = {};
  const initialI18nStore = {};
  i18n.languages.forEach(l => {
    initialI18nStore[l] = {};
    namespaces.forEach(ns => {
      initialI18nStore[l][ns] = i18n.getResourceBundle(l, ns) || {};
    });
  });
  ret.initialI18nStore = initialI18nStore;
  ret.initialLanguage = i18n.language;
  return ret;
}
;// CONCATENATED MODULE: ./node_modules/react-i18next/dist/es/Trans.js




function Trans_Trans(_ref) {
  let {
    children,
    count,
    parent,
    i18nKey,
    context,
    tOptions = {},
    values,
    defaults,
    components,
    ns,
    i18n: i18nFromProps,
    t: tFromProps,
    shouldUnescape,
    ...additionalProps
  } = _ref;
  const {
    i18n: i18nFromContext,
    defaultNS: defaultNSFromContext
  } = (0,react.useContext)(context_I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || i18nInstance_getI18n();
  const t = tFromProps || i18n && i18n.t.bind(i18n);
  return Trans({
    children,
    count,
    parent,
    i18nKey,
    context,
    tOptions,
    values,
    defaults,
    components,
    ns: ns || t && t.ns || defaultNSFromContext || i18n && i18n.options && i18n.options.defaultNS,
    i18n,
    t: tFromProps,
    shouldUnescape,
    ...additionalProps
  });
}
;// CONCATENATED MODULE: ./node_modules/react-i18next/dist/es/useTranslation.js



const usePrevious = (value, ignore) => {
  const ref = (0,react.useRef)();
  (0,react.useEffect)(() => {
    ref.current = ignore ? ref.current : value;
  }, [value, ignore]);
  return ref.current;
};
function useTranslation_useTranslation(ns) {
  let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    i18n: i18nFromProps
  } = props;
  const {
    i18n: i18nFromContext,
    defaultNS: defaultNSFromContext
  } = (0,react.useContext)(context_I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || i18nInstance_getI18n();
  if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new ReportNamespaces();
  if (!i18n) {
    warnOnce('You will need to pass in an i18next instance by using initReactI18next');
    const notReadyT = (k, optsOrDefaultValue) => {
      if (typeof optsOrDefaultValue === 'string') return optsOrDefaultValue;
      if (optsOrDefaultValue && typeof optsOrDefaultValue === 'object' && typeof optsOrDefaultValue.defaultValue === 'string') return optsOrDefaultValue.defaultValue;
      return Array.isArray(k) ? k[k.length - 1] : k;
    };
    const retNotReady = [notReadyT, {}, false];
    retNotReady.t = notReadyT;
    retNotReady.i18n = {};
    retNotReady.ready = false;
    return retNotReady;
  }
  if (i18n.options.react && i18n.options.react.wait !== undefined) warnOnce('It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.');
  const i18nOptions = {
    ...getDefaults(),
    ...i18n.options.react,
    ...props
  };
  const {
    useSuspense,
    keyPrefix
  } = i18nOptions;
  let namespaces = ns || defaultNSFromContext || i18n.options && i18n.options.defaultNS;
  namespaces = typeof namespaces === 'string' ? [namespaces] : namespaces || ['translation'];
  if (i18n.reportNamespaces.addUsedNamespaces) i18n.reportNamespaces.addUsedNamespaces(namespaces);
  const ready = (i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every(n => utils_hasLoadedNamespace(n, i18n, i18nOptions));
  function getT() {
    return i18n.getFixedT(props.lng || null, i18nOptions.nsMode === 'fallback' ? namespaces : namespaces[0], keyPrefix);
  }
  const [t, setT] = (0,react.useState)(getT);
  let joinedNS = namespaces.join();
  if (props.lng) joinedNS = `${props.lng}${joinedNS}`;
  const previousJoinedNS = usePrevious(joinedNS);
  const isMounted = (0,react.useRef)(true);
  (0,react.useEffect)(() => {
    const {
      bindI18n,
      bindI18nStore
    } = i18nOptions;
    isMounted.current = true;
    if (!ready && !useSuspense) {
      if (props.lng) {
        utils_loadLanguages(i18n, props.lng, namespaces, () => {
          if (isMounted.current) setT(getT);
        });
      } else {
        utils_loadNamespaces(i18n, namespaces, () => {
          if (isMounted.current) setT(getT);
        });
      }
    }
    if (ready && previousJoinedNS && previousJoinedNS !== joinedNS && isMounted.current) {
      setT(getT);
    }
    function boundReset() {
      if (isMounted.current) setT(getT);
    }
    if (bindI18n && i18n) i18n.on(bindI18n, boundReset);
    if (bindI18nStore && i18n) i18n.store.on(bindI18nStore, boundReset);
    return () => {
      isMounted.current = false;
      if (bindI18n && i18n) bindI18n.split(' ').forEach(e => i18n.off(e, boundReset));
      if (bindI18nStore && i18n) bindI18nStore.split(' ').forEach(e => i18n.store.off(e, boundReset));
    };
  }, [i18n, joinedNS]);
  const isInitial = (0,react.useRef)(true);
  (0,react.useEffect)(() => {
    if (isMounted.current && !isInitial.current) {
      setT(getT);
    }
    isInitial.current = false;
  }, [i18n, keyPrefix]);
  const ret = [t, i18n, ready];
  ret.t = t;
  ret.i18n = i18n;
  ret.ready = ready;
  if (ready) return ret;
  if (!ready && !useSuspense) return ret;
  throw new Promise(resolve => {
    if (props.lng) {
      utils_loadLanguages(i18n, props.lng, namespaces, () => resolve());
    } else {
      utils_loadNamespaces(i18n, namespaces, () => resolve());
    }
  });
}
;// CONCATENATED MODULE: ./node_modules/react-i18next/dist/es/withTranslation.js



function withTranslation(ns) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function Extend(WrappedComponent) {
    function I18nextWithTranslation(_ref) {
      let {
        forwardedRef,
        ...rest
      } = _ref;
      const [t, i18n, ready] = useTranslation(ns, {
        ...rest,
        keyPrefix: options.keyPrefix
      });
      const passDownProps = {
        ...rest,
        t,
        i18n,
        tReady: ready
      };
      if (options.withRef && forwardedRef) {
        passDownProps.ref = forwardedRef;
      } else if (!options.withRef && forwardedRef) {
        passDownProps.forwardedRef = forwardedRef;
      }
      return createElement(WrappedComponent, passDownProps);
    }
    I18nextWithTranslation.displayName = `withI18nextTranslation(${getDisplayName(WrappedComponent)})`;
    I18nextWithTranslation.WrappedComponent = WrappedComponent;
    const forwardRef = (props, ref) => createElement(I18nextWithTranslation, Object.assign({}, props, {
      forwardedRef: ref
    }));
    return options.withRef ? forwardRefReact(forwardRef) : I18nextWithTranslation;
  };
}
;// CONCATENATED MODULE: ./node_modules/react-i18next/dist/es/Translation.js

function Translation(props) {
  const {
    ns,
    children,
    ...options
  } = props;
  const [t, i18n, ready] = useTranslation(ns, options);
  return children(t, {
    i18n,
    lng: i18n.language
  }, ready);
}
;// CONCATENATED MODULE: ./node_modules/react-i18next/dist/es/I18nextProvider.js


function I18nextProvider(_ref) {
  let {
    i18n,
    defaultNS,
    children
  } = _ref;
  const value = useMemo(() => ({
    i18n,
    defaultNS
  }), [i18n, defaultNS]);
  return createElement(I18nContext.Provider, {
    value
  }, children);
}
;// CONCATENATED MODULE: ./node_modules/react-i18next/dist/es/useSSR.js


function useSSR_useSSR(initialI18nStore, initialLanguage) {
  let props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const {
    i18n: i18nFromProps
  } = props;
  const {
    i18n: i18nFromContext
  } = useContext(I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || getI18n();
  if (i18n.options && i18n.options.isClone) return;
  if (initialI18nStore && !i18n.initializedStoreOnce) {
    i18n.services.resourceStore.data = initialI18nStore;
    i18n.options.ns = Object.values(initialI18nStore).reduce((mem, lngResources) => {
      Object.keys(lngResources).forEach(ns => {
        if (mem.indexOf(ns) < 0) mem.push(ns);
      });
      return mem;
    }, i18n.options.ns);
    i18n.initializedStoreOnce = true;
    i18n.isInitialized = true;
  }
  if (initialLanguage && !i18n.initializedLanguageOnce) {
    i18n.changeLanguage(initialLanguage);
    i18n.initializedLanguageOnce = true;
  }
}
;// CONCATENATED MODULE: ./node_modules/react-i18next/dist/es/withSSR.js




function withSSR() {
  return function Extend(WrappedComponent) {
    function I18nextWithSSR(_ref) {
      let {
        initialI18nStore,
        initialLanguage,
        ...rest
      } = _ref;
      useSSR(initialI18nStore, initialLanguage);
      return createElement(WrappedComponent, {
        ...rest
      });
    }
    I18nextWithSSR.getInitialProps = composeInitialProps(WrappedComponent);
    I18nextWithSSR.displayName = `withI18nextSSR(${getDisplayName(WrappedComponent)})`;
    I18nextWithSSR.WrappedComponent = WrappedComponent;
    return I18nextWithSSR;
  };
}
;// CONCATENATED MODULE: ./node_modules/react-i18next/dist/es/index.js












const date = () => '';
const time = () => '';
const number = () => '';
const es_select = () => '';
const plural = () => '';
const selectOrdinal = () => '';
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}

;// CONCATENATED MODULE: ./node_modules/i18next-browser-languagedetector/dist/esm/i18nextBrowserLanguageDetector.js



var arr = [];
var each = arr.forEach;
var slice = arr.slice;
function defaults(obj) {
  each.call(slice.call(arguments, 1), function (source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

// eslint-disable-next-line no-control-regex
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
var serializeCookie = function serializeCookie(name, val, options) {
  var opt = options || {};
  opt.path = opt.path || '/';
  var value = encodeURIComponent(val);
  var str = "".concat(name, "=").concat(value);
  if (opt.maxAge > 0) {
    var maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge)) throw new Error('maxAge should be a Number');
    str += "; Max-Age=".concat(Math.floor(maxAge));
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }
    str += "; Domain=".concat(opt.domain);
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }
    str += "; Path=".concat(opt.path);
  }
  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }
    str += "; Expires=".concat(opt.expires.toUTCString());
  }
  if (opt.httpOnly) str += '; HttpOnly';
  if (opt.secure) str += '; Secure';
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }
  return str;
};
var cookie = {
  create: function create(name, value, minutes, domain) {
    var cookieOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
      path: '/',
      sameSite: 'strict'
    };
    if (minutes) {
      cookieOptions.expires = new Date();
      cookieOptions.expires.setTime(cookieOptions.expires.getTime() + minutes * 60 * 1000);
    }
    if (domain) cookieOptions.domain = domain;
    document.cookie = serializeCookie(name, encodeURIComponent(value), cookieOptions);
  },
  read: function read(name) {
    var nameEQ = "".concat(name, "=");
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  remove: function remove(name) {
    this.create(name, '', -1);
  }
};
var cookie$1 = {
  name: 'cookie',
  lookup: function lookup(options) {
    var found;
    if (options.lookupCookie && typeof document !== 'undefined') {
      var c = cookie.read(options.lookupCookie);
      if (c) found = c;
    }
    return found;
  },
  cacheUserLanguage: function cacheUserLanguage(lng, options) {
    if (options.lookupCookie && typeof document !== 'undefined') {
      cookie.create(options.lookupCookie, lng, options.cookieMinutes, options.cookieDomain, options.cookieOptions);
    }
  }
};

var querystring = {
  name: 'querystring',
  lookup: function lookup(options) {
    var found;
    if (typeof window !== 'undefined') {
      var search = window.location.search;
      if (!window.location.search && window.location.hash && window.location.hash.indexOf('?') > -1) {
        search = window.location.hash.substring(window.location.hash.indexOf('?'));
      }
      var query = search.substring(1);
      var params = query.split('&');
      for (var i = 0; i < params.length; i++) {
        var pos = params[i].indexOf('=');
        if (pos > 0) {
          var key = params[i].substring(0, pos);
          if (key === options.lookupQuerystring) {
            found = params[i].substring(pos + 1);
          }
        }
      }
    }
    return found;
  }
};

var hasLocalStorageSupport = null;
var localStorageAvailable = function localStorageAvailable() {
  if (hasLocalStorageSupport !== null) return hasLocalStorageSupport;
  try {
    hasLocalStorageSupport = window !== 'undefined' && window.localStorage !== null;
    var testKey = 'i18next.translate.boo';
    window.localStorage.setItem(testKey, 'foo');
    window.localStorage.removeItem(testKey);
  } catch (e) {
    hasLocalStorageSupport = false;
  }
  return hasLocalStorageSupport;
};
var localStorage = {
  name: 'localStorage',
  lookup: function lookup(options) {
    var found;
    if (options.lookupLocalStorage && localStorageAvailable()) {
      var lng = window.localStorage.getItem(options.lookupLocalStorage);
      if (lng) found = lng;
    }
    return found;
  },
  cacheUserLanguage: function cacheUserLanguage(lng, options) {
    if (options.lookupLocalStorage && localStorageAvailable()) {
      window.localStorage.setItem(options.lookupLocalStorage, lng);
    }
  }
};

var hasSessionStorageSupport = null;
var sessionStorageAvailable = function sessionStorageAvailable() {
  if (hasSessionStorageSupport !== null) return hasSessionStorageSupport;
  try {
    hasSessionStorageSupport = window !== 'undefined' && window.sessionStorage !== null;
    var testKey = 'i18next.translate.boo';
    window.sessionStorage.setItem(testKey, 'foo');
    window.sessionStorage.removeItem(testKey);
  } catch (e) {
    hasSessionStorageSupport = false;
  }
  return hasSessionStorageSupport;
};
var sessionStorage = {
  name: 'sessionStorage',
  lookup: function lookup(options) {
    var found;
    if (options.lookupSessionStorage && sessionStorageAvailable()) {
      var lng = window.sessionStorage.getItem(options.lookupSessionStorage);
      if (lng) found = lng;
    }
    return found;
  },
  cacheUserLanguage: function cacheUserLanguage(lng, options) {
    if (options.lookupSessionStorage && sessionStorageAvailable()) {
      window.sessionStorage.setItem(options.lookupSessionStorage, lng);
    }
  }
};

var navigator$1 = {
  name: 'navigator',
  lookup: function lookup(options) {
    var found = [];
    if (typeof navigator !== 'undefined') {
      if (navigator.languages) {
        // chrome only; not an array, so can't use .push.apply instead of iterating
        for (var i = 0; i < navigator.languages.length; i++) {
          found.push(navigator.languages[i]);
        }
      }
      if (navigator.userLanguage) {
        found.push(navigator.userLanguage);
      }
      if (navigator.language) {
        found.push(navigator.language);
      }
    }
    return found.length > 0 ? found : undefined;
  }
};

var htmlTag = {
  name: 'htmlTag',
  lookup: function lookup(options) {
    var found;
    var htmlTag = options.htmlTag || (typeof document !== 'undefined' ? document.documentElement : null);
    if (htmlTag && typeof htmlTag.getAttribute === 'function') {
      found = htmlTag.getAttribute('lang');
    }
    return found;
  }
};

var path = {
  name: 'path',
  lookup: function lookup(options) {
    var found;
    if (typeof window !== 'undefined') {
      var language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
      if (language instanceof Array) {
        if (typeof options.lookupFromPathIndex === 'number') {
          if (typeof language[options.lookupFromPathIndex] !== 'string') {
            return undefined;
          }
          found = language[options.lookupFromPathIndex].replace('/', '');
        } else {
          found = language[0].replace('/', '');
        }
      }
    }
    return found;
  }
};

var subdomain = {
  name: 'subdomain',
  lookup: function lookup(options) {
    // If given get the subdomain index else 1
    var lookupFromSubdomainIndex = typeof options.lookupFromSubdomainIndex === 'number' ? options.lookupFromSubdomainIndex + 1 : 1;
    // get all matches if window.location. is existing
    // first item of match is the match itself and the second is the first group macht which sould be the first subdomain match
    // is the hostname no public domain get the or option of localhost
    var language = typeof window !== 'undefined' && window.location && window.location.hostname && window.location.hostname.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);

    // if there is no match (null) return undefined
    if (!language) return undefined;
    // return the given group match
    return language[lookupFromSubdomainIndex];
  }
};

function i18nextBrowserLanguageDetector_getDefaults() {
  return {
    order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupSessionStorage: 'i18nextLng',
    // cache user language
    caches: ['localStorage'],
    excludeCacheFor: ['cimode'],
    // cookieMinutes: 10,
    // cookieDomain: 'myDomain'

    convertDetectedLanguage: function convertDetectedLanguage(l) {
      return l;
    }
  };
}
var Browser = /*#__PURE__*/function () {
  function Browser(services) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Browser);
    this.type = 'languageDetector';
    this.detectors = {};
    this.init(services, options);
  }
  _createClass(Browser, [{
    key: "init",
    value: function init(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var i18nOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.services = services || {
        languageUtils: {}
      }; // this way the language detector can be used without i18next
      this.options = defaults(options, this.options || {}, i18nextBrowserLanguageDetector_getDefaults());
      if (typeof this.options.convertDetectedLanguage === 'string' && this.options.convertDetectedLanguage.indexOf('15897') > -1) {
        this.options.convertDetectedLanguage = function (l) {
          return l.replace('-', '_');
        };
      }

      // backwards compatibility
      if (this.options.lookupFromUrlIndex) this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex;
      this.i18nOptions = i18nOptions;
      this.addDetector(cookie$1);
      this.addDetector(querystring);
      this.addDetector(localStorage);
      this.addDetector(sessionStorage);
      this.addDetector(navigator$1);
      this.addDetector(htmlTag);
      this.addDetector(path);
      this.addDetector(subdomain);
    }
  }, {
    key: "addDetector",
    value: function addDetector(detector) {
      this.detectors[detector.name] = detector;
    }
  }, {
    key: "detect",
    value: function detect(detectionOrder) {
      var _this = this;
      if (!detectionOrder) detectionOrder = this.options.order;
      var detected = [];
      detectionOrder.forEach(function (detectorName) {
        if (_this.detectors[detectorName]) {
          var lookup = _this.detectors[detectorName].lookup(_this.options);
          if (lookup && typeof lookup === 'string') lookup = [lookup];
          if (lookup) detected = detected.concat(lookup);
        }
      });
      detected = detected.map(function (d) {
        return _this.options.convertDetectedLanguage(d);
      });
      if (this.services.languageUtils.getBestMatchFromCodes) return detected; // new i18next v19.5.0
      return detected.length > 0 ? detected[0] : null; // a little backward compatibility
    }
  }, {
    key: "cacheUserLanguage",
    value: function cacheUserLanguage(lng, caches) {
      var _this2 = this;
      if (!caches) caches = this.options.caches;
      if (!caches) return;
      if (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(lng) > -1) return;
      caches.forEach(function (cacheName) {
        if (_this2.detectors[cacheName]) _this2.detectors[cacheName].cacheUserLanguage(lng, _this2.options);
      });
    }
  }]);
  return Browser;
}();
Browser.type = 'languageDetector';



;// CONCATENATED MODULE: ./src/i18n/bg/translation.json
const translation_namespaceObject = JSON.parse('{"help_articles":[{"title":"Как да изтеглите?","article":"Можете да изтеглите формата по подразбиране, като щракнете върху бутона <b>{{extensionName}}</b> под видеоклипа. Също така можете да изберете желания формат от падащия списък."},{"article":"Най-доброто качество е налично в <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> и <b>8K (4320p)</b>. Общата препоръка е, че колкото по-висока е разделителната способност на екрана ви, толкова по-добро трябва да бъде качеството на видеото. Трябва обаче да имате предвид и други фактори: скорост на изтегляне, количество свободно пространство и производителност на устройството по време на възпроизвеждане.","title":"Кой видео формат да избера?"},{"title":"Защо браузър/компютър замръзва по време на изтегляне?","article":"Браузърът/компютърът не трябва да замръзва напълно! Ако това се случи, моля, съобщете го чрез формата за обратна връзка, като посочите връзката към видеото. За съжаление, някои видео формати не могат да бъдат изтеглени директно от {{onlineVideoPlatform}}. Затова добавихме възможност за конвертиране на малки видеоклипове онлайн в желания формат в <b>{{extensionName}}</b>. В някои случаи този процес използва компютърните ресурси твърде активно."},{"title":"Защо не мога да изтегля директно видеоклип в желания формат?","article":"Някои видео файлови формати не могат да бъдат изтеглени директно поради определени технически характеристики на {{onlineVideoPlatform}}. Следователно <b>{{extensionName}}</b> има допълнителна функция за конвертиране на кратки онлайн видеоклипове в желания формат. Големите видеоклипове (по-дълги и/или с високо качество) изискват много ресурси за онлайн конвертиране, което понякога може да замрази вашия браузър/компютър. Затова се препоръчва да качите тези видеоклипове през <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} за Windows</a></b>."},{"title":"Как мога да получа връзка за изтегляне на видео/аудио?","article":"Връзката за директно изтегляне е достъпна само за онези формати, които не изискват конвертиране. За да направите това, щракнете върху иконата&nbsp;<!--[img-copy]--> в ред със съответната опция за изтегляне и след това я поставете като текст, където е необходимо."},{"title":"Как да изтегля видео с 60 fps?","article":"Достатъчно е да изберете съответната опция за изтегляне, която можете да идентифицирате по иконата&nbsp;<!--[img-fps-60]-->. Такива опции обаче не винаги са налични. Първо, оригиналното видео трябва да има поне 60 FPS. Освен това трябва да е наличен за гледане в плейъра {{onlineVideoPlatform}} с честота 60 FPS."},{"title":"Как да изтегля аудио запис (музика) в MP3?","article":"За съжаление в момента не е възможно директно изтегляне на MP3 формат. {{onlineVideoPlatform}} не го поддържа и необходимото онлайн преобразуване е нестабилно. Използвайте нашия <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} за Windows</a></b>, който може да конвертира видео файлове в MP3. Или изберете друг аудио формат от списъка (обозначен с иконата&nbsp;<!--[img-sound-on]-->)."},{"title":"Как да направя екранна снимка?","article":"Уверете се, че в <a data-webext-page=\\"settings\\">настройките</a> има квадратче за отметка срещу елемента <b>„Показване на бутона за моментна снимка на видео“</b>. В долния десен ъгъл на плейъра вляво от иконата <b>„Настройки“</b>, иконата <b>„Направете екранна снимка“</b>&nbsp;<!--[img-camera]--> трябва да се появи, като щракнете върху който текущият кадър от видеото ще бъде записан на вашия компютър в jpeg формат.","services":["gv","ok"]},{"title":"Как да покажа интерфейса при щракване върху бутона за изтегляне, а не при задържане на курсора на мишката върху него?","article":"Можете да изберете стил на бутон в <a data-webext-page=\\"settings\\">настройките</a>: <ul><li><b>модерен</b> (интерфейсът се появява при преминаване на мишката)</li ><li><b>класически</b> (интерфейсът се появява при щракване)</li></ul>"},{"title":"Защо имате нужда от QR кодове?","article":"С помощта на QR кодове можете да получите директна връзка към видео или аудио на всяко устройство с камера. Уверете се, че елементът <b>„Показване на QR кодове“</b> е активиран в <a data-webext-page=\\"settings\\">настройките на {{extensionName}}</a>. Някои опции за изтегляне ще имат икона „Вземете QR код“&nbsp;<!--[img-qr-code]-->, като щракнете върху която ще видите QR код и инструкции за вашия телефон или таблет.","services":["gv","gvOk"]}],"social_media_sharing":{"message":"<0>С нашето разширение за браузър {{already}} сте изтеглили <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1> За да запазим {{extensionName}} безплатно, имаме нужда от вашата помощ - разкажете за нас в социалните мрежи или месинджърите!</1>","mediafile":"медиен файл","mediafile_plural":"медийни файлове","button_cancel_rate":"Не сега","screenshot":"снимка на екрана","screenshot_plural":"снимки на екрана","title":"Един момент, моля!","already_moreThanOneMediafile":"вече","button_ok":"Сподели с приятели","button_cancel":"Не сега","asking_for_review_by_downloads":"Успешно изтеглихте {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> Ще бъдем благодарни за прегледа и <7>5 звезди</7> ;)<9 />Наистина е важно за разработката .","asking_for_review_by_screenshots":"Успешно направихте {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 /> Ще бъдем благодарни за прегледа и <7>5 звезди</7> ;)<9 />Наистина е важно за разработката .","button_rate":"Оценете","help_extension_to_get_better":"Помогнете на {{extensionName}} да стане по-добър!"},"language":"Език","conversion_time":"преобразуване ~{{conversionTime}}","download_via_web_portal":"Изтеглете необходимия формат чрез {{webPortalHostname}}","download_via_web_portal_tooltip":"Изтегляне чрез {{webPortalHostname}}","download_using_desktop_client":"Изтеглете необходимия формат чрез {{desktopClientName}}","download_using_desktop_client_tooltip":"Изтегляне чрез {{desktopClientName}}","data_consents":{"checkbox_statistics_hint":"Статистика за изтеглянията (характеристики на съдържанието, избрани формати), данни за взаимодействие с интерфейсни елементи, показатели за ефективността на разширението и отделните му модули","title":"Формуляр за съгласие за събиране и обработка на данни","description":"Молба за разрешение","checkbox_statistics":"Съгласен съм със съхранението и обработката на статистически данни","checkbox_eula":"Съгласен съм с <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">лицензионното споразумение</a>","checkbox_settings":"Съгласен съм с <a data-webext-page=\\"data-consents-settings\\">настройките за поверителност</a>","checkbox_technical":"Съгласен съм със съхранението и обработката на технически данни","checkbox_technical_hint":"Анонимизирани данни за грешки, възпроизведено съдържание, версии на използвани модули, продължителност и ефективност на извършените операции, конфигурация на потребителското устройство","disagree":"Отказвам (премахване на {{extensionName}})","agree":"Съгласен съм, продължете","description_request":"Нуждаем се от вашето разрешение да събираме следните данни, за да поддържаме {{extensionName}}:","description_browsing":"<strong>данни за активността при сърфиране</strong>: URL адреси на онлайн видео плейъри, идентификатори на инсталации;","description_technical":"<strong>технически данни</strong>: фамилия и версия на браузъра, метод за извличане на медия (специфично за видео услуга).","button_disablestats":"Нищо не споделете","button_techstats":"Споделяйте тех. данни","button_fullstats":"Споделяне на технически данни и данни за активността при сърфиране"},"languageName":"Български","selectLanguage":"Изберете език","changeLanguage":"промяна","auto_detect":"Автоматично откриване","download":"Изтегли","live_stream":"Поток на живо","live_stream_tooltip":"Все още не можете да изтегляте потоци на живо, но работим върху това :)","protected":"Защитен","protected_tooltip":"Не можете да изтеглите този видеоклип, той е защитен с авторски права.","premiere":"Премиера","premiere_tooltip":"Все още няма нищо за сваляне :)","video":"Видео","audio":"Аудио","music":"Музика","selectFormat":"Изберете подходящия формат","return_to_the_previous_screen":"Обратно","settings":{"title":"Настройки","show_formats_available_via_desktop_client":"Показване на формати, налични чрез {{desktopClientName}}","show_formats_required_online_conversion":"Показване на необходимите формати онлайн конвертиране","show_webm":"Показване на видео във формат WebM","show_snapshot_button":"Покажете бутона за моментна снимка на видео","warn_before_converting":"Предупреждавайте преди конвертиране","title_app_button_style":"Стил на бутоните","app_button_style_modern":"Модерен (интерфейсът се появява при поставяне на мишката върху)","app_button_style_classic":"Класически (интерфейсът се появява при щракване)","display_qr_codes":"Показване на QR кодове","privacy":"Отворете настройките за поверителност на {{extensionName}}"},"confirm_conversion_title":"Избраният файлов формат изисква конвертиране!","confirm_conversion_message":"Преобразуването използва активно хардуерни ресурси, това може да доведе до временно намаляване на скоростта на браузъра, включително в други раздели.","do_not_show_on_load":"Не показвай при зареждане","cancel":"Отказ","continue":"Продължи","formats_for_download":"Формати за изтегляне","all_formats_for_download":"Всички формати за изтегляне","more_formats":"Още формати","conversion_required":"необходимо е преобразуване","qr_code_tooltip":"Вземете QR код","copy_link_to_clipboard_tooltip":"Копиране на връзката в клипборда","copy_link_to_clipboard_notification_message":"Връзката е копирана в клипборда","active_download_warning_notification_message":"Всичко е под контрол!","active_download_warning_notification_description":"Напуснахте страницата с активно изтегляне, то ще продължи във фонов режим.","cancel_download":"Отказ от изтегляне/преобразуване","take_screenshot_tooltip":"Направи снимка на екрана","drop_us_a_line":"Не намерихте отговор? Пишете ни ;)","help":"Помогне","qr_code_title":"QR код за мобилно устройство","qr_code_description":"Лесно е да изпратите директната връзка за изтегляне на вашия смартфон или таблет - просто стартирайте скенер за QR код и задръжте курсора на мишката върху изображението по-горе.","qr_code_error":"Услугата за QR код засега не е достъпна. Моля, опитайте отново по-късно.","show_yandex_market_adviser":"Показване на Yandex.Market Adviser - джаджа за сравнение на цени за най-добри сделки","warning":"Внимание!","yandex_market_adviser_notification_description":"Промените ще влязат в сила след презареждане на страницата с приспособлението Yandex.Market Adviser.","direct_links_unavailable":"Директните връзки временно не са достъпни. Опитайте да <a data-webext-function=\\"reload\\">презаредите страницата</a> (клавиш F5)","day":"д","hour":"ч","minute":"мин","second":"сек","reset":"Нулиране","download_error":"Възникна грешка по време на изтеглянето на файла. За да се върнете към списъка с файлови формати, налични за изтегляне, щракнете върху бутона Нулиране.","conflict_extensions":"Открито е разширение <b>{{competitorsDetection}}</b> за изтегляне на мултимедийни файлове. Изпълнението на няколко разширения на браузъра едновременно може да доведе до <b>срив</b> на браузъра ви.","active_download_warning_on_leave":"Желаете ли наистина да затворите?","competitors":{"i_understand_risks":"Съзнавам рисковете","how_to_solve_this_problem":"Как да разреша този проблем?"}}');
;// CONCATENATED MODULE: ./src/i18n/cs/translation.json
const cs_translation_namespaceObject = JSON.parse('{"live_stream":"Přímý přenos","live_stream_tooltip":"Živé přenosy zatím stahovat nemůžete, ale pracujeme na tom :)","protected":"Chráněné stránky","protected_tooltip":"Toto video nelze stáhnout, je chráněno autorskými právy.","premiere":"Premiéra","settings":{"display_qr_codes":"Zobrazení kódů QR","privacy":"Otevřít {{extensionName}} Nastavení soukromí","title":"Nastavení","show_formats_available_via_desktop_client":"Přehlídkové formáty jsou k dispozici prostřednictvím {{desktopClientName}}","show_formats_required_online_conversion":"Zobrazit formáty vyžadované pro online konverzi","show_webm":"Zobrazení videa ve formátu WebM","show_snapshot_button":"Tlačítko Zobrazit snímek videa","warn_before_converting":"Upozornění před převodem","title_app_button_style":"Styl tlačítek","app_button_style_modern":"Moderní (rozhraní se zobrazí po najetí myší)","app_button_style_classic":"Klasický (rozhraní se zobrazí po kliknutí)"},"confirm_conversion_title":"Vybraný formát souboru vyžaduje konverzi!","cancel":"Zrušit","qr_code_tooltip":"Získat kód QR","copy_link_to_clipboard_tooltip":"Kopírování odkazu do schránky","copy_link_to_clipboard_notification_message":"Odkaz zkopírovaný do schránky","help_articles":[{"title":"Jak stáhnout?","article":"Výchozí formát si můžete stáhnout kliknutím na tlačítko <b>{{extensionName}}</b> pod videem. V rozevíracím seznamu můžete také vybrat požadovaný formát."},{"title":"Jaký formát videa mám zvolit?","article":"Nejlepší kvalita je k dispozici v rozlišeních <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> a <b>8K (4320p)</b>. Obecně se doporučuje, že čím vyšší je rozlišení obrazovky, tím lepší by měla být kvalita videa. Musíte však vzít v úvahu i další faktory: rychlost stahování, množství volného místa a výkon zařízení během přehrávání."},{"title":"Proč prohlížeč/počítač při stahování zamrzá?","article":"Prohlížeč/počítač by neměl zcela zamrznout! Pokud se tak stane, nahlaste to prosím prostřednictvím formuláře zpětné vazby a uveďte odkaz na video. Některé formáty videa bohužel nelze stáhnout přímo z {{onlineVideoPlatform}}. Proto jsme do <b>{{extensionName}}</b> přidali možnost převést malá videa online do požadovaného formátu. V některých případech tento proces příliš aktivně využívá prostředky počítače."},{"title":"Proč nemohu stáhnout video v požadovaném formátu přímo?","article":"Některé formáty video souborů nelze stáhnout přímo kvůli určitým technickým vlastnostem {{onlineVideoPlatform}}. Proto má <b>{{extensionName}}</b> další funkci pro převod krátkých online videí do požadovaného formátu. Velká videa (delší a/nebo ve vysoké kvalitě) vyžadují pro převod online mnoho prostředků, což někdy může vést k zamrznutí prohlížeče/počítače. Proto doporučujeme tato videa nahrávat prostřednictvím <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} pro Windows</a></b>."},{"title":"Jak mohu získat odkaz na stažení videa/audia?","article":"Přímý odkaz ke stažení je k dispozici pouze pro formáty, které nevyžadují konverzi. Chcete-li tak učinit, klikněte na ikonu&nbsp;<!--[img-copy]--> v řádku s příslušnou možností stahování a poté ji v případě potřeby vložte jako text."},{"title":"Jak stáhnout video s 60 fps?","article":"Stačí zvolit odpovídající možnost stahování, kterou poznáte podle ikony&nbsp;<!--[img-fps-60]-->. Tyto možnosti však nejsou vždy k dispozici. Především musí mít původní video alespoň 60 FPS. Také musí být k dispozici pro zobrazení v přehrávači {{onlineVideoPlatform}} s rychlostí 60 FPS."},{"title":"Jak stáhnout zvukovou stopu (hudbu) ve formátu MP3?","article":"V současné době bohužel není možné stáhnout přímo formát MP3. {{onlineVideoPlatform}} jej nepodporuje a požadovaný online převod je nestabilní. Použijte náš <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} pro Windows</a></b>, který umí převádět video soubory do formátu MP3. Nebo vyberte jakýkoli jiný zvukový formát ze seznamu (označený ikonou&nbsp;<!--[img-sound-on]-->)."},{"title":"Jak pořídit snímek obrazovky?","article":"Ujistěte se, že v <a data-webext-page=\\"settings\\">nastavení</a> je zaškrtávací políčko naproti položce <b>\\"Zobrazit tlačítko snímku videa\\"</b>. V pravém dolním rohu přehrávače vlevo od ikony <b>\\"Nastavení\\"</b> by se měla objevit ikona <b>\\"Pořídit snímek\\"</b>&nbsp;<!--[img-camera]-->, po jejímž kliknutí se aktuální snímek z videa uloží do počítače ve formátu jpeg.","services":["gv","ok"]},{"title":"Jak zobrazit rozhraní po kliknutí na tlačítko pro stažení, nikoliv po najetí myší na něj?","article":"Styl tlačítka můžete zvolit v <a data-webext-page=\\"settings\\">nastavení</a>: <ul><li><b>moderní</b> (rozhraní se zobrazí po najetí myší)</li><li><b>klasické</b> (rozhraní se zobrazí po kliknutí)</li></ul>"},{"services":["gv","gvOk"],"title":"Proč potřebujete QR kódy?","article":"Pomocí kódů QR můžete získat přímý odkaz na video nebo zvuk v jakémkoli zařízení s kamerou. Ujistěte se, že je v nastavení <a data-webext-page=\\"settings\\">{{extensionName}}</a> povolena položka <b>\\"Display QR Codes\\"</b>. Některé možnosti stahování budou mít ikonu \\"Získat QR kód\\" icon&nbsp;<!--[img-qr-code]-->, po jejímž kliknutí se zobrazí QR kód a pokyny pro váš telefon nebo tablet."}],"qr_code_title":"QR kód pro mobilní zařízení","qr_code_description":"Přímý odkaz ke stažení lze snadno odeslat do chytrého telefonu nebo tabletu - stačí spustit čtečku QR kódů a najet na obrázek výše.","qr_code_error":"Služba QR-kódů je prozatím nedostupná. Zkuste to prosím později.","show_yandex_market_adviser":"Zobrazit widget pro porovnání cen Yandex.Market Adviser - nejlepší nabídky","yandex_market_adviser_notification_description":"Změny se projeví po opětovném načtení stránky s widgetem Yandex.Market Adviser.","social_media_sharing":{"title":"Moment, prosím!","already_moreThanOneMediafile":"již","button_ok":"Sdílet s přáteli","button_cancel":"Teď ne","mediafile_0":"mediální soubor","mediafile_1":"mediální soubory","mediafile_2":"mediální soubory","message":"<0>S naším rozšířením prohlížeče máte k dispozici {{already}} stáhli <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1>Pro zachování {{extensionName}} zdarma, potřebujeme vaši pomoc - řekněte o nás na sociálních sítích nebo messengerech!</1>","asking_for_review_by_downloads":"Úspěšně jste stáhli {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> Budeme vděční za hodnocení a <7>5 hvězdiček</7> ;)<9 />Pro vývoj je to opravdu důležité.","asking_for_review_by_screenshots":"Úspěšně jste {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 /> Budeme vděční za hodnocení a <7>5 hvězdiček</7> ;)<9 />Pro vývoj je to opravdu důležité.","button_cancel_rate":"Teď ne","button_rate":"Hodnotit","help_extension_to_get_better":"Nápověda {{extensionName}} abyste se zlepšili!","screenshot_0":"snímek obrazovky","screenshot_1":"snímky obrazovky","screenshot_2":"snímky obrazovky"},"data_consents":{"button_techstats":"Sdílet pouze technické údaje","button_fullstats":"Sdílení technických údajů a údajů o aktivitách při procházení","disagree":"Odmítám (odstranit {{extensionName}})","agree":"Souhlasím, pokračujte","title":"Formulář souhlasu se shromažďováním a zpracováním údajů","description":"Žádost o povolení","description_request":"Potřebujeme vaše svolení ke shromažďování následujících údajů, abychom mohli udržovat. {{extensionName}}:","description_browsing":"<strong>data o aktivitě při prohlížení</strong>: URL online přehrávačů videa, ID instalace;","description_technical":"<strong>technické údaje</strong>: rodina a verze prohlížeče, způsob extrakce médií (specifický pro službu videa).","button_disablestats":"Nic nesdílejte","checkbox_settings":"Souhlasím s <a data-webext-page=\\"data-consents-settings\\">nastavením ochrany osobních údajů</a>","checkbox_statistics":"Souhlasím s ukládáním a zpracováním statistických údajů","checkbox_technical":"Souhlasím s ukládáním a zpracováním technických údajů","checkbox_technical_hint":"Anonymizované údaje o chybách, přehrávaném obsahu, verzích použitých modulů, délce trvání a účinnosti provedených operací, konfiguraci uživatelského zařízení","checkbox_eula":"Souhlasím s <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">licenční smlouvou</a>","checkbox_statistics_hint":"Statistiky stahování (charakteristiky obsahu, vybrané formáty), údaje o interakci s prvky rozhraní, metriky výkonu rozšíření a jeho jednotlivých modulů"},"conflict_extensions":"Rozšíření <b>{{competitorsDetection}}</b> pro stahování multimediálních souborů. Spuštění několika rozšíření prohlížeče současně může způsobit <b>selhání</b> prohlížeče.","language":"Jazyk","languageName":"Česky","selectLanguage":"Výběr jazyka","changeLanguage":"změna","auto_detect":"Automatická detekce","download":"Stáhnout","premiere_tooltip":"Zatím není nic ke stažení :)","video":"Video","audio":"Zvuk","music":"Hudba","selectFormat":"Zvolte vhodný formát","return_to_the_previous_screen":"Zpět","confirm_conversion_message":"Konverze aktivně využívá hardwarové prostředky, což může způsobit dočasné snížení rychlosti prohlížeče, a to i na jiných kartách.","do_not_show_on_load":"Nezobrazí se při načítání","continue":"Pokračovat","formats_for_download":"Formáty ke stažení","all_formats_for_download":"Všechny formáty ke stažení","more_formats":"Další formáty","conversion_required":"požadovaná konverze","conversion_time":"spřevod ~{{conversionTime}}","download_via_web_portal":"Stáhněte si požadovaný formát prostřednictvím {{webPortalHostname}}","download_via_web_portal_tooltip":"Stáhnout přes {{webPortalHostname}}","download_using_desktop_client":"Stáhněte si požadovaný formát pomocí {{desktopClientName}}","download_using_desktop_client_tooltip":"Stáhnout pomocí {{desktopClientName}}","active_download_warning_notification_message":"Všechno je pod kontrolou!","active_download_warning_notification_description":"Pokud jste opustili stránku s aktivním stahováním, bude pokračovat na pozadí.","cancel_download":"Zrušit stahování/konverzi","take_screenshot_tooltip":"Pořídit snímek obrazovky","drop_us_a_line":"Nenašli jste odpověď? Napište nám ;)","help":"Nápověda","warning":"Pozor!","day":"d","hour":"h","minute":"min","second":"sec","reset":"Obnovení","download_error":"Při stahování souboru došlo k chybě. Chcete-li se vrátit na seznam formátů souborů dostupných ke stažení, klikněte na tlačítko Obnovit.","direct_links_unavailable":"Přímé odkazy jsou dočasně nedostupné. Zkuste <a data-webext-function=\\"reload\\">znovu načíst stránku</a> (klávesa F5)","competitors":{"i_understand_risks":"Rozumím rizikům","how_to_solve_this_problem":"Jak tento problém vyřešit?"},"active_download_warning_on_leave":"Opravdu chcete zavřít?"}');
;// CONCATENATED MODULE: ./src/i18n/da/translation.json
const da_translation_namespaceObject = JSON.parse('{"language":"Sprog","languageName":"Dansk","selectLanguage":"Vælg et sprog","changeLanguage":"lave om","auto_detect":"Finde pr. automatik","download_via_web_portal":"Hent det påkrævede format via {{webPortalHostname}}","social_media_sharing":{"mediafile":"Mediefil","mediafile_plural":"Mediefiler","screenshot":"skærmbillede","screenshot_plural":"skærmbilleder","title":"Bare et øjeblik!","already_moreThanOneMediafile":"allerede","message":"<0>Med vores browserudvidelse har du {{already}} downloadet <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1> For at holde {{extensionName}} fri, har vi brug for din hjælp - fortæl om os på sociale netværk eller messengers!</1>","button_ok":"Del med venner","button_cancel":"Ikke nu","asking_for_review_by_downloads":"Du har med succes downloadet {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> Vi ville være taknemmelige for anmeldelsen og <7>5 stjerner</7> ;)<9 />Det er virkelig vigtigt for udviklingen .","asking_for_review_by_screenshots":"Du har med succes tjent {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 /> Vi ville være taknemmelige for anmeldelsen og <7>5 stjerner</7> ;)<9 />Det er virkelig vigtigt for udviklingen .","button_cancel_rate":"Ikke nu","button_rate":"Sats","help_extension_to_get_better":"Hjælp {{extensionName}} med at blive bedre!"},"data_consents":{"disagree":"Jeg afslår (fjern {{extensionName}})","title":"Samtykkeformular til dataindsamling og behandling","description":"Anmodning om tilladelse","description_request":"Vi har brug for din tilladelse til at indsamle følgende data for at vedligeholde {{extensionName}}:","description_browsing":"<strong>browseraktivitetsdata</strong>: URL\'er på online videoafspillere, installations-ID\'er;","description_technical":"<strong>tekniske data</strong>: browserfamilie og version, metode til medieudtrækning (specifik for en videotjeneste).","checkbox_eula":"Jeg accepterer <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">licensaftalen</a>","checkbox_settings":"Jeg accepterer <a data-webext-page=\\"data-consents-settings\\">privatlivsindstillingerne</a>","checkbox_statistics":"Jeg accepterer opbevaring og behandling af statistiske data","checkbox_statistics_hint":"Statistik over downloads (indholdskarakteristika, udvalgte formater), data om interaktion med grænsefladeelementer, målinger for ydeevnen af udvidelsen og dens individuelle moduler","checkbox_technical":"Jeg accepterer opbevaring og behandling af tekniske data","checkbox_technical_hint":"Anonymiserede data om fejl, afspillet indhold, versioner af brugte moduler, varighed og effektivitet af udførte operationer, brugerens enhedskonfiguration","button_disablestats":"Del ikke noget","button_techstats":"Del kun tekniske data","button_fullstats":"Del tekniske data og browsingaktivitetsdata","agree":"Jeg er enig, fortsæt"},"download":"Hent","live_stream":"Live stream","live_stream_tooltip":"Du kan ikke downloade livestreams endnu, men vi arbejder på det :)","protected":"Beskyttet","protected_tooltip":"Du kan ikke downloade denne video, den er beskyttet af ophavsret.","premiere":"Premiere","premiere_tooltip":"Der er ikke noget at downloade endnu :)","video":"Video","audio":"Lyd","music":"Musik","selectFormat":"Vælg det passende format","return_to_the_previous_screen":"Tilbage","settings":{"title":"Indstillinger","show_formats_available_via_desktop_client":"Vis formater tilgængelige via {{desktopClientName}}","show_formats_required_online_conversion":"Vis formater påkrævet online konvertering","show_webm":"Vis video i WebM-format","show_snapshot_button":"Vis knappen til videosnapshot","warn_before_converting":"Advar før konvertering","title_app_button_style":"Knap stil","app_button_style_modern":"Moderne (grænseflade vises på musen over)","app_button_style_classic":"Klassisk (grænseflade vises ved klik)","display_qr_codes":"Vis QR-koder","privacy":"Åbn privatlivsindstillingerne for {{extensionName}}"},"confirm_conversion_title":"Det valgte filformat kræver konvertering!","confirm_conversion_message":"Konvertering bruger aktivt hardwareressourcer, dette kan forårsage et midlertidigt fald i browserens hastighed, herunder i andre faner.","do_not_show_on_load":"Vis ikke ved indlæsning","cancel":"Afbestille","continue":"Blive ved","formats_for_download":"Formater til download","all_formats_for_download":"Alle formater til download","more_formats":"Flere formater","conversion_required":"Konvertering påkrævet","conversion_time":"konvertering ~{{conversionTime}}","download_via_web_portal_tooltip":"Hent via {{webPortalHostname}}","download_using_desktop_client":"Hent det påkrævede format ved hjælp af {{desktopClientName}}","download_using_desktop_client_tooltip":"Hent med {{desktopClientName}}","qr_code_tooltip":"Hent QR-kode","copy_link_to_clipboard_tooltip":"Kopier link til udklipsholder","copy_link_to_clipboard_notification_message":"Linket er kopieret til udklipsholderen","active_download_warning_notification_message":"Alt er under kontrol!","active_download_warning_notification_description":"Du har forladt siden med en aktiv download, den fortsætter i baggrunden.","cancel_download":"Annuller download/konvertering","take_screenshot_tooltip":"Tag et skærmbillede","drop_us_a_line":"Fandt du ikke et svar? Skriv til os ;)","help":"Hjælp","help_articles":[{"title":"Hvordan downloader man?","article":"Du kan downloade standardformatet ved at klikke på knappen <b>{{extensionName}}</b> under videoen. Du kan også vælge det ønskede format i rullelisten."},{"title":"Hvilket videoformat skal jeg vælge?","article":"Den bedste kvalitet er tilgængelig i <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> og <b>8K (4320p)</b>. Den generelle anbefaling er, at jo højere din skærmopløsning, jo bedre skal videokvaliteten være. Du skal dog også overveje andre faktorer: downloadhastighed, mængden af ledig plads og enhedens ydeevne under afspilning."},{"title":"Hvorfor fryser en browser/computer under download?","article":"Browseren/computeren må ikke fryse helt! Hvis dette sker, bedes du rapportere det via feedbackformularen med angivelse af videolinket. Nogle videoformater kan desværre ikke downloades direkte fra {{onlineVideoPlatform}}. Derfor har vi tilføjet muligheden for at konvertere små videoer online til det ønskede format i <b>{{extensionName}}</b>. I nogle tilfælde bruger denne proces computerressourcer for aktivt."},{"title":"Hvorfor kan jeg ikke downloade en video i det ønskede format direkte?","article":"Nogle videofilformater kan ikke downloades direkte på grund af visse tekniske egenskaber ved {{onlineVideoPlatform}}. Derfor har <b>{{extensionName}}</b> en ekstra funktion til at konvertere korte onlinevideoer til det ønskede format. Store videoer (længere og/eller høj kvalitet) kræver mange ressourcer til online konvertering, hvilket nogle gange kan fryse din browser/computer. Derfor foreslås det at uploade disse videoer gennem <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} til Windows</a></b>."},{"title":"Hvordan kan jeg få et video-/lyddownloadlink?","article":"Direkte downloadlink er kun tilgængeligt for de formater, der ikke kræver konvertering. For at gøre det skal du klikke på ikonet&nbsp;<!--[img-copy]--> på en linje med passende downloadmulighed, og derefter indsætte det som tekst, hvor det er nødvendigt."},{"title":"Hvordan downloader man 60 fps video?","article":"Det er nok at vælge den tilsvarende downloadmulighed, som kan identificeres ved ikonet&nbsp;<!--[img-fps-60]-->. Sådanne muligheder er dog ikke altid tilgængelige. Først og fremmest skal den originale video have mindst 60 FPS. Den skal også være tilgængelig til visning i {{onlineVideoPlatform}}-afspilleren med en hastighed på 60 FPS."},{"title":"Hvordan downloader man et lydspor (musik) i MP3?","article":"Desværre er det ikke muligt at downloade MP3-format direkte i øjeblikket. {{onlineVideoPlatform}} understøtter det ikke, og den påkrævede onlinekonvertering er ustabil. Brug vores <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} til Windows</a></b>, der kan konvertere videofiler til MP3. Eller vælg et andet lydformat fra listen (angivet med ikonet&nbsp;<!--[img-sound-on]-->)."},{"title":"Hvordan tager man et skærmbillede?","article":"Sørg for, at der i <a data-webext-page=\\"settings\\">indstillingerne</a> er et afkrydsningsfelt ud for punktet <b>\\"Vis videosnapshot-knappen\\"</b>. I nederste højre hjørne af afspilleren til venstre for <b>\\"Indstillinger\\"</b>-ikonet, <b>\\"Tag skærmbillede\\"</b>-ikonet&nbsp;<!--[img-camera]--> skal vises, ved at klikke på hvilken den aktuelle frame fra videoen vil blive gemt på din computer i jpeg-format.","services":["gv","ok"]},{"title":"Hvordan får man vist grænsefladen ved at klikke på download-knappen, ikke ved at holde markøren over den?","article":"Du kan vælge en knapstil i <a data-webext-page=\\"settings\\">indstillingerne</a>: <ul><li><b>moderne</b> (grænsefladen vises med musen over)</li><li><b>klassisk</b> (grænseflade vises ved klik)</li></ul>"},{"title":"Hvorfor har du brug for QR-koder?","article":"Ved hjælp af QR-koder kan du få et direkte link til video eller lyd på enhver enhed med et kamera. Sørg for, at punktet <b>\\"Vis QR-koder\\"</b> er aktiveret i indstillingerne <a data-webext-page=\\"settings\\">{{extensionName}}</a>. Nogle downloadmuligheder vil have et \\"Hent QR-kode\\"-ikon&nbsp;<!--[img-qr-code]-->, ved at klikke på hvilket du vil se en QR-kode og instruktioner til din telefon eller tablet.","services":["gv","gvOk"]}],"qr_code_title":"QR-kode til mobilenhed","qr_code_description":"Det er nemt at sende det direkte downloadlink til din smartphone eller tablet - bare start en QR-kodescanner og svæv over billedet ovenfor.","qr_code_error":"QR-kodetjenesten er ikke tilgængelig i øjeblikket. Prøv igen senere.","show_yandex_market_adviser":"Vis Yandex.Market Adviser - prissammenligningswidget til bedste tilbud","warning":"Advarsel!","yandex_market_adviser_notification_description":"Ændringer træder i kraft efter genindlæsning af siden med Yandex.Market Adviser-widgetten.","direct_links_unavailable":"Direkte links er midlertidigt utilgængelige. Prøv at <a data-webext-function=\\"reload\\">genindlæse siden</a> (F5-tast)","day":"d","hour":"h","minute":"min","second":"sek","reset":"Nulstil","download_error":"Der opstod en fejl under download af filen. For at vende tilbage til listen over filformater, der er tilgængelige for download, skal du klikke på knappen Nulstil.","conflict_extensions":"En udvidelse <b>{{competitorsDetection}}</b> til download af multimediefiler er blevet fundet. Hvis du kører flere browserudvidelser på samme tid, kan det få din browser til at <b>gå ned</b>.","active_download_warning_on_leave":"Ønsker du virkelig at lukke?","competitors":{"i_understand_risks":"Jeg forstår risiciene","how_to_solve_this_problem":"Hvordan løser man dette problem?"}}');
;// CONCATENATED MODULE: ./src/i18n/de/translation.json
const de_translation_namespaceObject = JSON.parse('{"download_via_web_portal":"Laden Sie das gewünschte Format über {{webPortalHostname}} herunter","take_screenshot_tooltip":"Bildschirmfoto erstellen","cancel_download":"Download/Konvertierung abbrechen","active_download_warning_notification_description":"Sie haben die Seite mit einem aktiven Download verlassen, dieser wird im Hintergrund fortgesetzt.","active_download_warning_notification_message":"Alles unter Kontrolle!","copy_link_to_clipboard_notification_message":"Der Link wurde in die Zwischenablage kopiert","copy_link_to_clipboard_tooltip":"Link in Zwischenablage kopieren","qr_code_tooltip":"QR-Code erhalten","download_using_desktop_client_tooltip":"Herunterladen mit {{desktopClientName}}","download_using_desktop_client":"Laden das gewünschte Format mit {{desktopClientName}} herunter","download_via_web_portal_tooltip":"Herunterladen über {{webPortalHostname}}","conversion_time":"Konvertierung ~{{conversionTime}}","conversion_required":"Konvertierung erforderlich","more_formats":"Mehr Formate","formats_for_download":"Formate zum Herunterladen","all_formats_for_download":"Alle Formate zum Herunterladen","continue":"Weiter","cancel":"Abbrechen","do_not_show_on_load":"Beim Laden nicht anzeigen","confirm_conversion_message":"Die Konvertierung nutzt aktiv Hardwareressourcen. Dies kann zu einer vorübergehenden Verringerung der Geschwindigkeit des Browsers führen, auch in anderen Registerkarten.","confirm_conversion_title":"Das ausgewählte Dateiformat muss konvertiert werden!","settings":{"privacy":"Öffnen Sie die Datenschutzeinstellungen von {{extensionName}}","display_qr_codes":"QR-Codes anzeigen","app_button_style_classic":"Klassisch (Schnittstelle erscheint bei Klick)","app_button_style_modern":"Modern (Schnittstelle erscheint bei Mouseover)","title_app_button_style":"Stil der Schaltfläche","show_snapshot_button":"Anzeigen \\"Schnappschuss\\" Schaltfläche","show_formats_required_online_conversion":"Anzeige von Formaten, die eine Online-Konvertierung erfordern","warn_before_converting":"Warnung bei Konvertierung","show_webm":"Videos im WebM-Format anzeigen","show_formats_available_via_desktop_client":"Über {{desktopClientName}} verfügbare Formate anzeigen","title":"Einstellungen"},"return_to_the_previous_screen":"Zurück","premiere_tooltip":"Es gibt noch nichts zum Herunterladen :)","video":"Video","audio":"Audio","music":"Musik","selectFormat":"Wählen Sie das gewünschte Format","protected_tooltip":"Sie können dieses Video nicht herunterladen, es ist urheberrechtlich geschützt.","protected":"Geschützt","live_stream_tooltip":"Sie können noch keine Live-Streams herunterladen, aber wir arbeiten daran :)","live_stream":"Live-Stream","download":"Herunterladen","auto_detect":"Auto-Erkennung","language":"Sprache","languageName":"Deutsch","help_articles":[{"title":"Wie kann ich sie herunterladen?","article":"Sie können das Standardformat herunterladen, indem Sie einfach auf die Schaltfläche <b>{{extensionName}}</b> unterhalb des Videos klicken. Oder wählen Sie das gewünschte Format aus der Dropdown-Liste."},{"title":"Welches Videoformat soll ich wählen?","article":"Die beste Qualität bieten die Formate <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> und <b>8K (4320p)</b>. Die allgemeine Empfehlung lautet: Je höher die Auflösung Ihres Bildschirms, desto höher sollte die Videoqualität sein. Es sollten jedoch auch andere Faktoren berücksichtigt werden: die Download-Geschwindigkeit, der freie Speicherplatz und die Leistung des Geräts während der Wiedergabe."},{"title":"Warum friert der Browser/Computer während des Downloads ein?","article":"Der Browser/Computer darf nicht komplett abstürzen! Sollte dies der Fall sein, melden Sie den Vorfall bitte über das Formular für Vorfälle und geben Sie dabei den Link zum Video an. Leider können einige Videoformate nicht direkt auf {{onlineVideoPlatform}} heruntergeladen werden. Deshalb haben wir in <b>{{extensionName}}</b> einen Konverter hinzugefügt, mit dem Sie kleine Videos online in das richtige Format umwandeln können. In manchen Fällen verbraucht der Konverter eine Menge Computerressourcen."},{"article":"Dateien mit bestimmten Formaten können aufgrund der technischen Eigenschaften von {{onlineVideoPlatform}} nicht direkt heruntergeladen werden. Deshalb hat <b>{{extensionName}}</b> eine zusätzliche Funktion, um kurze Videos online in das gewünschte Format zu konvertieren. Große Videos (lang und/oder in hoher Qualität) benötigen zu viele Ressourcen für die Online-Konvertierung und führen manchmal zum Absturz des Browsers/Computers. Aus diesem Grund bieten wir sie über <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} für Windows</a></b> zum Herunterladen.","title":"Warum kann ich das Video nicht direkt in dem gewählten Format herunterladen?"},{"title":"Wie kann ich einen Video-/Audio-Download-Link erhalten?","article":"Ein direkter Download-Link ist nur für die Formate verfügbar, die nicht konvertiert werden müssen. Um den Link zu erhalten, klicken Sie auf das Symbol &nbsp;<!--[img-copy]--> in der Zeile mit der entsprechenden Download-Option. Fügen Sie dann den Link als Text ein, wo es nötig ist."},{"article":"Es genügt, die entsprechende Download-Option zu wählen, die mit dem Symbol&nbsp;<!--[img-fps-60]--> gekennzeichnet ist. Diese Möglichkeit ist jedoch nicht immer gegeben. Das Originalvideo selbst muss eine Bildrate von mindestens 60 BpS haben und im Player angezeigt werden können. {{onlineVideoPlatform}} mit 60 BpS.","title":"Wie kann ich ein Video mit 60 BpSekunde herunterladen?"},{"article":"Leider ist es derzeit nicht möglich, MP3-Dateien direkt herunterzuladen. {{onlineVideoPlatform}} wird nicht unterstützt, und die Online-Konvertierung ist instabil. Sie können <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} für Windows</a></b> verwenden, der die Umwandlung von Videos in das MP3-Format unterstützt. Oder wählen Sie ein anderes Audioformat aus der Liste (Symbol&nbsp;<!--[img-sound-on]-->).","title":"Wie kann ich einen MP3-Audio-Track (Musik) herunterladen?"},{"title":"Wie kann ich einen Screenshot machen?","article":"Vergewissern Sie sich, dass die Schaltfläche <b>\\"Schnappschuss Schaltfläche anzeigen\\"</b> in den <a data-webext-page=\\"settings\\">Einstellungen</a> aktiviert ist. In der unteren rechten Ecke des Players, links neben dem Symbol <b>\\"Einstellungen\\"</b>, erscheint das <b>\\"Screenshot machen\\"</b> Symbol&nbsp;<!--[img-camera]-->. Wenn Sie auf das Symbol klicken, wird der Screenshot im jpeg-Format auf Ihrem Computer gespeichert.","services":["gv","ok"]},{"article":"Sie können das Schaltflächen-Stil in den <a data-webext-page=\\"settings\\">Einstellungen</a> wählen: <ul><li><b>modern</b> (Interface erscheint, wenn Sie den Mauszeiger über die Schaltfläche bewegen) </li><li><b>klassisch</b> (Interface erscheint, wenn die Schaltfläche gedrückt wird)</li></ul>","title":"Wie kann das Interface angezeigt werden, wenn man auf die Herunterladen-Schaltfläche klickt und nicht, wenn man mit der Maus darüber fährt?"},{"article":"Mithilfe von QR-Codes können Sie auf jedem Gerät mit Kamera einen direkten Link zu Video- oder Audiodateien erhalten. Stellen Sie sicher, dass die Häkchen <b>\\"QR-Codes anzeigen\\"</b> in den <a data-webext-page=\\"settings\\">Einstellungen von {{extensionName}}</a> aktiviert ist. Einige Download-Optionen sind mit dem Symbol icon&nbsp;<!--[img-qr-code]-->. Wenn Sie auf das Symbol klicken, sehen Sie einen QR-Code und Anweisungen für Ihr Handy oder Tablet.","title":"Wozu sind QR-Codes gut?","services":["gv","gvOk"]}],"social_media_sharing":{"asking_for_review_by_screenshots":"Sie haben {{screenshotsCount}} $t(social_media_sharing.screenshot) erfolgreich durchgeführt.<5 />Wir freuen uns über Ihr Feedback und <7>5 Sterne</7> ;)<9 />Dies ist sehr wichtig für die Entwicklung.","title":"Achtung, bitte!","mediafile":"Mediendatei","mediafile_plural":"Mediendateien","message":"<0>Mit unserer Browser-Erweiterung haben Sie {{already}} heruntergeladen <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1>Um {{extensionName}} kostenlos zu halten, brauchen wir Ihre Hilfe - erzählen Sie in sozialen Netzwerken oder Messaging-Apps von uns!</1>","already_moreThanOneMediafile":"bereits","button_ok":"Mit Freunden teilen","button_cancel":"Nicht jetzt","asking_for_review_by_downloads":"Sie haben {{downloadsCount}} $t(social_media_sharing.mediafile) erfolgreich heruntergeladen.<5 />Wir freuen uns über Ihr Feedback und <7>5 Sterne</7> ;)<9 />Dies ist sehr wichtig für die Entwicklung.","screenshot":"Bildschirmfoto","screenshot_plural":"Bildschirmfotos","button_cancel_rate":"Nicht jetzt","button_rate":"Bewerten","help_extension_to_get_better":"Helfen Sie {{extensionName}}, besser zu werden!","already_oneMediafile":""},"reset":"Zurücksetzen","premiere":"Premiere","download_error":"Beim letzten Dateidownload ist ein Fehler aufgetreten. Um zur Liste der Download-Formate zurückzukehren, drücken Sie die Schaltfläche \\"Zurücksetzen\\".","data_consents":{"title":"Ermächtigung zur Erhebung und Verarbeitung von Daten","description":"Beantragung der Genehmigung zum Datenabruf","checkbox_eula":"Ich akzeptiere die <a href=\\"{{eulaUrl}}\\" target=\\"_blank\\">Lizenzvereinbarung</a>","checkbox_settings":"Ich akzeptiere die <a data-webext-page=\\"data-consents-settings\\">Datenschutzeinstellungen</a>","checkbox_statistics_hint":"Download-Statistiken (Inhaltsmerkmale, ausgewählte Formate), Daten über die Interaktion mit Schnittstellenelementen, Leistungsmetriken der Erweiterung und ihrer einzelnen Module","checkbox_technical":"Ich bin mit Speicherung und Verarbeitung der technischen Daten einverstanden","checkbox_statistics":"Ich bin mit Speicherung und Verarbeitung der statistischen Daten einverstanden","checkbox_technical_hint":"Anonymisierte Daten zu Fehlern, abgespielten Inhalten, Versionen der verwendeten Module, Dauer und Erfolg der durchgeführten Vorgänge, Konfiguration des Nutzergeräts","disagree":"Ablehnung ({{extensionName}} entfernen)","agree":"Ich stimme zu, fahren Sie fort","description_browsing":"<strong>Browsing-Aktivitätsdaten</strong>: URLs von Online-Videoplayern, Installations-IDs;","description_technical":"<strong>Technische Daten</strong>: Browserfamilie und -version, Methode der Medienextraktion (speziell für einen Videodienst).","button_disablestats":"Nichts teilen","button_techstats":"Technische Daten teilen","description_request":"Wir benötigen Ihre Erlaubnis, die folgenden Daten zu sammeln, um {{extensionName}} zu pflegen:","button_fullstats":"Teilen von technischen und Browsing-Aktivitätsdaten"},"drop_us_a_line":"Sie haben die Antwort nicht gefunden? Schreiben Sie uns ;)","help":"Hilfe","qr_code_title":"QR-Code für Mobiltelefone","qr_code_description":"Es ist ganz einfach, den Download-Link direkt an Ihr Handy oder Tablet zu senden - öffnen Sie einfach einen QR-Code-Reader und scannen Sie das obige Bild.","qr_code_error":"Der QR-Code-Dienst ist vorübergehend nicht verfügbar. Bitte versuchen Sie es später noch einmal.","show_yandex_market_adviser":"Berater Yandex.Market anzeigen - Widget zum Preis- und Angebotsvergleich","warning":"Warnung!","yandex_market_adviser_notification_description":"Die Änderungen werden wirksam, wenn Sie die Seite mit dem Yandex.Market-Widget neu starten.","direct_links_unavailable":"Direkte Links sind vorübergehend nicht verfügbar. Versuchen Sie, die Seite <a data-webext-function=\\"reload\\">neu zu starten</a> (Taste F5)","day":"T","hour":"Std","minute":"Min","second":"Sek","conflict_extensions":"Es wurde eine Erweiterung <b>{{competitorsDetection}}</b> zum Herunterladen von Mediendateien gefunden. Die gleichzeitige Verwendung mehrerer Browser-Erweiterungen kann bei Ihrem Browser <b>zu Fehlfunktionen führen</b>.","selectLanguage":"Sprache auswählen","changeLanguage":"ändern","active_download_warning_on_leave":"Wollen Sie wirklich abschließen?","competitors":{"i_understand_risks":"Ich verstehe die Risiken","how_to_solve_this_problem":"Wie ist dieses Problem zu lösen?"}}');
;// CONCATENATED MODULE: ./src/i18n/en/translation.json
const en_translation_namespaceObject = JSON.parse('{"language":"Language","languageName":"English","selectLanguage":"Select a language","changeLanguage":"change","auto_detect":"Auto Detect","download":"Download","live_stream":"Live Stream","live_stream_tooltip":"You can\'t download Live Streams yet, but we are working on it :)","protected":"Protected","protected_tooltip":"You can\'t download this video, it\'s protected by copyright.","premiere":"Premiere","premiere_tooltip":"There is nothing to download yet :)","video":"Video","audio":"Audio","music":"Music","selectFormat":"Select the appropriate format","return_to_the_previous_screen":"Back","settings":{"title":"Settings","show_formats_available_via_desktop_client":"Show formats available via {{desktopClientName}}","show_formats_required_online_conversion":"Show formats required online conversion","show_webm":"Show video in WebM format","show_snapshot_button":"Show the video ​snapshot button","warn_before_converting":"Warn before converting","title_app_button_style":"Button style","app_button_style_modern":"Modern (interface appears on mouse over)","app_button_style_classic":"Classic (interface appears on click)","display_qr_codes":"Display QR Codes","privacy":"Open {{extensionName}}\'s privacy settings"},"confirm_conversion_title":"The selected file format requires conversion!","confirm_conversion_message":"Conversion actively uses hardware resources, this may cause a temporary decrease in the speed of the browser, including in other tabs.","do_not_show_on_load":"Don\'t show on load","cancel":"Cancel","continue":"Continue","formats_for_download":"Formats for download","all_formats_for_download":"All formats for download","more_formats":"More formats","conversion_required":"сonversion required","conversion_time":"сonversion ~{{conversionTime}}","download_via_web_portal":"Download the required format via {{webPortalHostname}}","download_via_web_portal_tooltip":"Download via {{webPortalHostname}}","download_using_desktop_client":"Download the required format using {{desktopClientName}}","download_using_desktop_client_tooltip":"Download using {{desktopClientName}}","qr_code_tooltip":"Get QR Code","copy_link_to_clipboard_tooltip":"Copy link to clipboard","copy_link_to_clipboard_notification_message":"Link copied to clipboard","active_download_warning_notification_message":"Everything\'s under control!","active_download_warning_notification_description":"You have left the page with an active download, it will continue in the background.","active_download_warning_on_leave":"Do you really want to close?","cancel_download":"Cancel download/conversion","take_screenshot_tooltip":"Take screenshot","drop_us_a_line":"Didn\'t find an answer? Drop us a line ;)","help":"Help","help_articles":[{"title":"How to download?","article":"You can download the default format by clicking on the <b>{{extensionName}}</b> button below the video. Also you can choose the desired format in the drop-down list."},{"title":"Which video format should I choose?","article":"The best quality is available in <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> and <b>8K (4320p)</b>. The general recommendation is that the higher your screen resolution the better the video quality should be. However, you have to consider other factors as well: download speed, amount of free space, and the device performance during playback."},{"title":"Why does a browser/computer freezes while downloading?","article":"The browser/computer should not completely freeze! If this happens please report it through the feedback form, indicating the video link. Unfortunately, some video formats cannot be downloaded from {{onlineVideoPlatform}} directly. Therefore, we have added the possibility to convert small videos online to the desired format in <b>{{extensionName}}</b>. In some cases this process uses computer resources too actively."},{"title":"Why I can\'t download a video in the desired format directly?","article":"Some video file formats can not be downloaded directly due to certain technical properties of {{onlineVideoPlatform}}. Hence, the <b>{{extensionName}}</b> has an additional feature to convert online short videos into the desired format. Large videos (longer and/or high quality) require many resources for online conversion, which sometimes can freeze your browser/computer. Therefore, it is suggested to upload these videos through the <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} for Windows</a></b>."},{"title":"How can I get a video/audio download link?","article":"Direct download link is available only for those formats that do not require conversion. To do so, click on the icon&nbsp;<!--[img-copy]--> in a line with appropriate download option, and then paste it as text where necessary."},{"title":"How to download 60 fps video?","article":"It\'s enough to choose corresponding download option, which can be identified by the icon&nbsp;<!--[img-fps-60]-->. However, such options are not always available. First of all, the original video must have at least 60 FPS. Also, it must be available for viewing in the {{onlineVideoPlatform}} player with 60 FPS rate."},{"title":"How to download an audio track (music) in MP3?","article":"Unfortunately, it\'s not possible to download MP3 format directly at the moment. {{onlineVideoPlatform}} does not support it, and the required online conversion is unstable. Use our <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} for Windows</a></b> that can convert video files to MP3. Or select any other audio format from the list (indicated by the icon&nbsp;<!--[img-sound-on]-->)."},{"title":"How to take a screenshot?","article":"Make sure that in the <a data-webext-page=\\"settings\\">settings</a> there is a checkbox opposite the item <b>\\"Show the video ​snapshot button\\"</b>. In the lower right corner of the player to the left of the <b>\\"Settings\\"</b> icon, the <b>\\"Take screenshot\\"</b> icon&nbsp;<!--[img-camera]--> should appear, by clicking on which the current frame from the video will be saved to your computer in jpeg format.","services":["gv","ok"]},{"title":"How to display the interface on click the download button, not on hover over it?","article":"You can choose a button style in the <a data-webext-page=\\"settings\\">settings</a>: <ul><li><b>modern</b> (interface appears on mouse over)</li><li><b>classic</b> (interface appears on click)</li></ul>"},{"title":"Why you need QR codes?","article":"Using QR codes you can get a direct link to video or audio on any device with a camera. Make sure the <b>\\"Display QR Codes\\"</b> item is enabled in the <a data-webext-page=\\"settings\\">{{extensionName}} settings</a>. Some download options will have a \\"Get QR Code\\" icon&nbsp;<!--[img-qr-code]-->, by clicking on which you will see a QR code and instructions for your phone or tablet.","services":["gv","gvOk"]}],"qr_code_title":"QR code for mobile device","qr_code_description":"It\'s easy to send the direct download link to your smartphone or tablet - just launch a QR code scanner and hover over the image above.","qr_code_error":"QR-code service is unavailabel for now. Please try again later.","show_yandex_market_adviser":"Show Yandex.Market Adviser - best deals price comparison widget","warning":"Warning!","yandex_market_adviser_notification_description":"Changes will take effect after reloading the page with the Yandex.Market Adviser widget.","social_media_sharing":{"title":"Just a moment please!","mediafile":"mediafile","mediafile_plural":"mediafiles","already_oneMediafile":"","already_moreThanOneMediafile":"already","message":"<0>With our browser extension you have {{already}} downloaded <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1>To keep {{extensionName}} free we need your help - tell about us on social networks or messengers!</1>","button_ok":"Share with friends","button_cancel":"Not now","asking_for_review_by_downloads":"You\'ve successfully downloaded {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> We would be grateful for the review and <7>5 stars</7> ;)<9 />It\'s really important for development.","screenshot":"screenshot","screenshot_plural":"screenshots","asking_for_review_by_screenshots":"You\'ve successfully made {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 /> We would be grateful for the review and <7>5 stars</7> ;)<9 />It\'s really important for development.","button_cancel_rate":"Not now","button_rate":"Rate","help_extension_to_get_better":"Help {{extensionName}} to get better!"},"direct_links_unavailable":"Direct links are temporarily unavailable. Try to <a data-webext-function=\\"reload\\">reload the page</a> (F5 key)","day":"d","hour":"h","minute":"min","second":"sec","reset":"Reset","download_error":"An error occurred during the file download. To return to the list of file formats available for download, click the Reset button.","data_consents":{"title":"Data collection and processing consent form","description":"Permission request","description_request":"We need your permission to collect the following data to maintain {{extensionName}}:","description_browsing":"<strong>browsing activity data</strong>: URLs of online video players, installation IDs;","description_technical":"<strong>technical data</strong>: browser family and version, method of media extraction (specific to a video service).","checkbox_eula":"I agree to the <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">license agreement</a>","checkbox_settings":"I agree to the <a data-webext-page=\\"data-consents-settings\\">privacy settings</a>","checkbox_statistics":"I agree to the storage and processing of statistical data","checkbox_statistics_hint":"Statistics on downloads (content characteristics, selected formats), data on interaction with interface elements, metrics on the performance of the extension and its individual modules","checkbox_technical":"I agree to the storage and processing of technical data","checkbox_technical_hint":"Anonymized data on errors, played content, versions of used modules, duration and efficiency of performed operations, user device configuration","button_disablestats":"Do not share anything","button_techstats":"Share technical data only","button_fullstats":"Share technical and browsing activity data","disagree":"I decline (remove {{extensionName}})","agree":"I agree, continue"},"conflict_extensions":"An extension <b>{{competitorsDetection}}</b> for downloading multimedia files has been detected. Running several browser extensions at the same time can cause your browser <b>to crash</b>.","competitors":{"i_understand_risks":"I understand the risks","how_to_solve_this_problem":"How can I solve this problem?"}}');
;// CONCATENATED MODULE: ./src/i18n/es/translation.json
const es_translation_namespaceObject = JSON.parse('{"language":"Idioma","languageName":"Español","auto_detect":"Detección automática","download":"Descargar","live_stream":"Transmisión en vivo","live_stream_tooltip":"Aún no se puede descargar transmisiones en vivo, pero estamos trabajando en ello :)","premiere":"Estreno","premiere_tooltip":"Aún no hay nada que descargar :)","video":"Vídeo","audio":"Audio","music":"Música","selectFormat":"Seleccione el formato apropiado","return_to_the_previous_screen":"Atrás","settings":{"title":"Ajustes","show_formats_available_via_desktop_client":"Mostrar formatos disponibles en {{desktopClientName}}","show_formats_required_online_conversion":"Mostrar formatos que requiren conversión en línea","show_webm":"Mostrar videos en formato WebM","show_snapshot_button":"Mostrar el botón de instantánea","warn_before_converting":"Avisar antes de convertir","title_app_button_style":"Diseño del botón","app_button_style_modern":"Moderno (interfaz aparece al pasar el ratón)","app_button_style_classic":"Clásico (interfaz aparece al hacer clic)","display_qr_codes":"Mostrar códigos QR","privacy":"Abrir la configuración de privacidad de {{extensionName}}"},"confirm_conversion_title":"¡El formato elegido requiere conversión!","confirm_conversion_message":"Conversión utiliza activamente los recursos de hardware, lo que puede causar una disminución temporal de la velocidad del navegador, incluidas otras pestañas abiertas.","do_not_show_on_load":"No mostrar durante la descarga","cancel":"Cancelar","continue":"Continuar","formats_for_download":"Formatos para descarga","all_formats_for_download":"Todos los formatos disponibles","more_formats":"Más formatos","conversion_required":"Se requiere conversión","conversion_time":"conversión ~{{conversionTime}}","download_via_web_portal":"Descargar en el formato con {{webPortalHostname}}","download_via_web_portal_tooltip":"Descargar con {{webPortalHostname}}","download_using_desktop_client":"Descargar en el formato con {{desktopClientName}}","download_using_desktop_client_tooltip":"Descargar con {{desktopClientName}}","qr_code_tooltip":"Obtener código QR","copy_link_to_clipboard_tooltip":"Copiar enlace al portapapeles","copy_link_to_clipboard_notification_message":"El enlace fue copiado en el portapapeles","active_download_warning_notification_message":"¡Todo bajo control!","active_download_warning_notification_description":"Usted abandonó la página con una descarga activa. La descarga continuará en segundo plano.","cancel_download":"Cancelar la descarga/conversión","take_screenshot_tooltip":"Tomar una captura de pantalla","drop_us_a_line":"¿No encontró la respuesta? Escríbanos ;)","help":"Ayuda","help_articles":[{"title":"¿Cómo descargar?","article":"Puede descargar el formato predeterminado simplemente haciendo clic en el botón <b>{{extensionName}}</b> debajo del vídeo. O elija el formato deseado en la lista desplegable."},{"title":"¿Qué formato de video escoger?","article":"La mejor calidad tienen los formatos <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> и <b>8K (4320p)</b>. La recomendación general es que cuanto mayor sea la resolución de su pantalla, más alta tiene que ser la calidad del video. Sin embargo, también hay que tener en cuenta otros factores: la velocidad de descarga, la cantidad de espacio libre y el rendimiento del dispositivo durante la reproducción."},{"title":"¿Por qué se congela el navegador/ordenador durante la descarga?","article":"¡El navegador/ordenador no deben bloquearse por completo! Si esto ocurrió, por favor, informe de la incidencia a través del formulario de incidencias mencionando el enlace del video. Por desgracia, algunos formatos de video no se puede descargar directamente en {{onlineVideoPlatform}}. Por eso añadimos a <b>{{extensionName}}</b> un convertidor que permite convertir videos pequeños al formato correcto en línea. En algunos casos, el convertidor consume muchos recursos del ordenador."},{"title":"¿Por qué no puedo descargar el video en formato elegido directamente?","article":"Archivos con algunos formatos no se puede descargar directamente por las propiedades técnicas de {{onlineVideoPlatform}}. Por lo tanto, el <b>{{extensionName}}</b> tiene una función adicional para convertir videos cortos en el formato deseado en línea . Los videos grandes (largos y/o en alta calidad) requieren demasiados recursos para la conversión en línea y a veces provocan un bloqueo del navegador/ordenador. Por eso, se ofrece descargarlos con <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} para Windows</a></b>."},{"title":"¿Cómo puedo obtener un enlace de descarga de video/audio?","article":"Enlace de descarga directa está disponible solo para aquellos formatos que no requieren conversión. Para obtener el enlace, haga clic en el ícono &nbsp;<!--[img-copy]--> de la línea con la opción de descarga adecuada. Luego pegue el enlace como texto donde sea necesario."},{"title":"¿Cómo descargar un video con 60 fps?","article":"Es suficiente con elegir la opción de descarga correspondiente, marcada con el ícono&nbsp;<!--[img-fps-60]-->. Sin embargo, esta opción no siempre está disponible. E vídeo original en sí debe tener el frame rate de al menos 60 FPS y estar disponible para ver en el reproductor. {{onlineVideoPlatform}} con 60 FPS."},{"title":"¿Cómo descargar una pista de audio (música) en MP3?","article":"Por desgracia, actualmente no es posible descargar MP3 directamente. No es compatible con {{onlineVideoPlatform}}, y la conversión en línea es inestable. Puede utilizar el <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} para Windows</a></b> que admite la conversión de video a formato MP3. O seleccione un formato de audio alternativo de la lista (ícono&nbsp;<!--[img-sound-on]-->)."},{"title":"¿Cómo hacer una captura de pantalla?","article":"Asegúrese de que en los <a data-webext-page=\\"settings\\">ajustes</a> está marcado <b>\\"Mostrar el botón de instantánea\\"</b>. En la esquina inferior derecha del reproductor, al lado izquierdo del ícono <b>\\"Ajustes\\"</b> aparecerá el ícono&nbsp;<!--[img-camera]-->. SI hace clic en el ícono, la captura de pantalla se guardará en su ordenador en formato jpeg.","services":["gv","ok"]},{"title":"¿Cómo mostrar la interfaz al pulsar el botón de descarga y no al pasar el cursor por encima?","article":"Puede elegir el diseño del botón en los <a data-webext-page=\\"settings\\">ajustes</a>: <ul><li><b>moderno</b> (la interfaz aparece al pasar el cursor por encima)</li><li><b>clásico</b> (la interfaz aparece al pulsar el botón)</li></ul>"},{"title":"¿Para qué son los códigos QR?","article":"Al utilizar códigos QR, se puede obtener un enlace directo a video o audio en cualquier dispositivo con cámara. Asegúrese de que el botón <b>“Mostrar códigos QR”</b> está habilitado en los <a data-webext-page=\\"settings\\">ajustes de {{extensionName}}</a>. Algunas opciones de descarga tendrán el ícono &nbsp;<!--[img-qr-code]-->. Si hace clic en el ícono, verá un código QR y las instrucciones para su móvil o tablet.","services":["gv","gvOk"]}],"qr_code_title":"Código QR para celular","qr_code_description":"Es fácil enviar el enlace de descarga directa a su móvil o tablet — solo tiene que abrir un lector  de códigos QR y escanear la imagen de arriba.","qr_code_error":"El servicio de código QR no está disponible temporalmente. Inténtelo de nuevo más tarde.","show_yandex_market_adviser":"Mostrar asesor Yandex.Market - comparador de precios y ofertas","warning":"¡Atención!","yandex_market_adviser_notification_description":"Los cambios surtirán efecto al reiniciar la página con el widget Yandex.Market.","social_media_sharing":{"title":"¡Atención, por favor!","mediafile":"mediafile","mediafile_plural":"mediafiles","already_oneMediafile":"","already_moreThanOneMediafile":"ya","message":"<0>Con nuestra extensión de navegador usted {{already}} descargó <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1>Para que {{extensionName}} siga siendo gratis, necesitamos su ayuda – cuente de nosotros en redes sociales o aplicaciones de mensajería!</1>","button_ok":"Compartir con amigos","button_cancel":"Ahora no","asking_for_review_by_downloads":"Ha descargado con éxito {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> Agradecemos sus comentarios y <7>5 estrellas</7> ;)<9 />Esto es realmente importante para el desarrollo.","asking_for_review_by_screenshots":"Ha realizado con éxito {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 /> Agradecemos sus comentarios y <7>5 estrellas</7> ;)<9 />Esto es realmente importante para el desarrollo.","screenshot":"captura de pantalla","screenshot_plural":"capturas de pantalla","button_cancel_rate":"Ahora no","button_rate":"Valorar","help_extension_to_get_better":"¡Ayuda a {{extensionName}} a mejorar!"},"direct_links_unavailable":"Los enlaces directos no están disponibles temporalmente. Intente <a data-webext-function=\\"reload\\">reiniciar la página </a> (tecla F5)","day":"d","hour":"h","minute":"min","second":"seg","conflict_extensions":"Se ha detectado una extensión <b>{{competitorsDetection}}</b> para descargar archivos multimedia. La ejecución simultánea de varias extensiones del navegador puede provocar <b>fallos</b> de funcionamiento de su navegador.","protected":"Protegido","protected_tooltip":"No puede descargar este vídeo, está protegido por derechos de autor.","data_consents":{"checkbox_eula":"Acepto el <a href=\\"{{eulaUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">Acuerdo de licencia</a>","checkbox_settings":"Acepto la <a data-webext-page=\\"data-consents-settings\\">configuración de privacidad</a>","checkbox_statistics":"Estoy de acuerdo con el almacenamiento y tratamiento de datos estadísticos","checkbox_statistics_hint":"Las estadísticas de descarga (características del contenido, formatos seleccionados), los datos sobre la interacción con los elementos de la interfaz, las métricas de rendimiento de la extensión y sus módulos individuales","checkbox_technical":"Estoy de acuerdo con el almacenamiento y tratamiento de datos técnicos","checkbox_technical_hint":"Los datos anónimos sobre errores, el contenido reproducido, las versiones de los módulos utilizados, duración y éxito de las operaciones realizadas, la configuración del dispositivo del usuario","title":"Autorización para la recogida y el tratamiento de datos","description":"Solicitud de permiso de obtener datos","disagree":"Rechazo (eliminar el {{extensionName}})","agree":"Estoy de acuerdo, continuar","description_request":"Necesitamos su permiso para recopilar los siguientes datos para mantener {{extensionName}}:","description_browsing":"<strong>datos de actividad de navegación</strong>: URL de reproductores de vídeo en línea, ID de instalación;","description_technical":"<strong>datos técnicos</strong>: familia y versión del navegador, método de extracción de medios (específico de un servicio de vídeo).","button_disablestats":"No compartir nada","button_techstats":"Compartir datos técnicos","button_fullstats":"Compartir datos técnicos y de navegación"},"reset":"Restablecer","download_error":"Se ha producido un error durante la última descarga de archivo. Para volver a la lista de formatos de descarga, pulse el botón “Reiniciar”.","selectLanguage":"Seleccionar un idioma","changeLanguage":"cambiar","active_download_warning_on_leave":"¿De verdad quieres cerrar?","competitors":{"i_understand_risks":"Comprendo los riesgos","how_to_solve_this_problem":"¿Cómo resolver este problema?"}}');
;// CONCATENATED MODULE: ./src/i18n/fi/translation.json
const fi_translation_namespaceObject = JSON.parse('{"data_consents":{"checkbox_statistics_hint":"Tilastotiedot latauksista (sisällön ominaisuudet, valitut formaatit), tiedot vuorovaikutuksesta käyttöliittymäelementtien kanssa, laajennuksen ja sen yksittäisten moduulien suorituskykyä koskevat mittarit","checkbox_statistics":"Hyväksyn tilastotietojen tallentamisen ja käsittelyn","checkbox_settings":"Hyväksyn <a data-webext-page=\\"data-consents-settings\\">tietosuoja-asetukset</a>","checkbox_technical_hint":"Anonymisoidut tiedot virheistä, toistetusta sisällöstä, käytettyjen moduulien versioista, suoritettujen operaatioiden kestosta ja tehokkuudesta, käyttäjän laitekonfiguraatiosta","checkbox_technical":"Hyväksyn teknisten tietojen tallentamisen ja käsittelyn","checkbox_eula":"Hyväksyn <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">lisenssisopimuksen</a>","description":"Lupapyyntö","button_fullstats":"Jaa teknisiä ja selaustoimintatietoja","button_techstats":"Jaa vain teknisiä tietoja","button_disablestats":"Älä jaa mitään","description_technical":"<strong>tekniset tiedot</strong>: selainperhe ja -versio, median purkutapa (videopalvelukohtainen).","description_browsing":"<strong>selaustoimintatiedot</strong>: online-videosoittimien URL-osoitteet, asennustunnukset;","description_request":"Tarvitsemme lupasi kerätä seuraavat tiedot ylläpitääksemme {{extensionName}}:","agree":"Olen samaa mieltä, jatka","disagree":"Kieltäydyn (poista {{extensionName}})","title":"Tietojen keräämisen ja käsittelyn suostumuslomake"},"direct_links_unavailable":"Suorat linkit eivät ole tilapäisesti käytettävissä. Yritä <a data-webext-function=\\"reload\\">ladata sivu uudelleen</a> (F5-näppäin)","social_media_sharing":{"message":"<0> Selainlaajennuksellamme sinulla on seuraavat ominaisuudet. {{already}} ladannut <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1>Pidäksesi {{extensionName}} ilmaisena tarvitsemme apuasi - kerro meistä sosiaalisissa verkostoissa tai viestimissä!</1>","screenshot":"kuvakaappaus","screenshot_plural":"kuvakaappauksia","mediafile":"mediatiedosto","mediafile_plural":"mediatiedostoja","button_ok":"Jaa ystävien kanssa","already_moreThanOneMediafile":"jo","title":"Hetkinen vain!","help_extension_to_get_better":"Apua {{extensionName}} parantua!","button_rate":"Arvioi","button_cancel_rate":"Ei nyt","asking_for_review_by_screenshots":"Olet menestyksekkäästi tehnyt {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 /> Olisimme kiitollisia arvostelusta ja <7>5 tähteä</7> ;)<9 />Se on todella tärkeää kehityksen kannalta.","asking_for_review_by_downloads":"Olet onnistuneesti ladannut {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> Olisimme kiitollisia arvostelusta ja <7>5 tähteä</7> ;)<9 />Se on todella tärkeää kehityksen kannalta.","button_cancel":"Ei nyt"},"help_articles":[{"article":"Voit ladata oletusmuodon napsauttamalla videon alla olevaa <b>{{extensionName}}</b>-painiketta. Voit myös valita haluamasi formaatin avattavasta luettelosta.","title":"Miten ladata?"},{"article":"Paras laatu on saatavilla <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> ja <b>8K (4320p)</b>. Yleinen suositus on, että mitä suurempi näytön resoluutio on, sitä parempi videon laadun pitäisi olla. Sinun on kuitenkin otettava huomioon myös muita tekijöitä: latausnopeus, vapaan tilan määrä ja laitteen suorituskyky toiston aikana.","title":"Mikä videoformaatti minun pitäisi valita?"},{"article":"Selaimen/tietokoneen ei pitäisi jäätyä kokonaan! Jos näin tapahtuu, ilmoita siitä palautelomakkeella ja ilmoita videolinkki. Valitettavasti joitakin videoformaatteja ei voi ladata suoraan {{onlineVideoPlatform}}:sta. Siksi olemme lisänneet mahdollisuuden muuntaa pieniä videoita verkossa haluttuun muotoon <b>{{extensionName}}</b>. Joissakin tapauksissa tämä prosessi käyttää tietokoneen resursseja liian aktiivisesti.","title":"Miksi selain/tietokone jäätyy latauksen aikana?"},{"article":"Joitakin videotiedostomuotoja ei voi ladata suoraan {{onlineVideoPlatform}}:n tiettyjen teknisten ominaisuuksien vuoksi. Näin ollen <b>{{extensionName}}</b>:ssä on lisäominaisuus, jonka avulla online-lyhytvideot voidaan muuntaa haluttuun muotoon. Suuret videot (pidemmät ja/tai korkealaatuiset) vaativat paljon resursseja verkkomuunnokseen, mikä voi joskus jäädyttää selaimen/tietokoneen. Siksi on suositeltavaa ladata nämä videot <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} Windowsille</a></b> kautta.","title":"Miksi en voi ladata videota haluamassani muodossa suoraan?"},{"article":"Suora latauslinkki on käytettävissä vain niille formaateille, jotka eivät vaadi muuntamista. Napsauta sitä varten kuvaketta&nbsp;<!--[img-copy]--> rivillä, jossa on sopiva latausvaihtoehto, ja liitä se sitten tarvittaessa tekstinä.","title":"Miten saan videon/audion latauslinkin?"},{"article":"Riittää, että valitset vastaavan latausvaihtoehdon, joka voidaan tunnistaa kuvakkeesta&nbsp;<!--[img-fps-60]-->. Tällaiset vaihtoehdot eivät kuitenkaan ole aina käytettävissä. Ensinnäkin alkuperäisen videon on oltava vähintään 60 FPS. Lisäksi sen on oltava katsottavissa {{onlineVideoPlatform}}-soittimessa 60 FPS:n nopeudella.","title":"Miten ladata 60 fps-videota?"},{"article":"Valitettavasti tällä hetkellä ei ole mahdollista ladata suoraan MP3-muodossa. {{onlineVideoPlatform}} ei tue sitä, ja tarvittava verkkomuunnos on epävakaa. Käytä <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} Windowsille</a></b>, joka voi muuntaa videotiedostot MP3-muotoon. Tai valitse jokin muu ääniformaatti luettelosta (merkitty kuvakkeella&nbsp;<!--[img-sound-on]-->).","title":"Miten ladata ääniraita (musiikki) MP3-muodossa?"},{"services":["gv","ok"],"article":"Varmista, että kohdassa <a data-webext-page=\\"settings\\">asetukset</a> on valintaruutu kohtaa <b>\\"Show the video snapshot button\\"</b> vastapäätä. Soittimen oikeassa alakulmassa <b>\\"Asetukset\\"</b> -kuvakkeen vasemmalla puolella pitäisi näkyä <b>\\"Ota kuvakaappaus\\"</b> -kuvake&nbsp;<!--[img-camera]-->, jota napsauttamalla videon kulloinenkin ruutu tallentuu tietokoneelle jpeg-muodossa.","title":"Kuinka ottaa kuvakaappaus?"},{"article":"Voit valita painikkeen tyylin <a data-webext-page=\\"settings\\">asetuksissa</a>: <ul><li><b>moderni</b> (käyttöliittymä tulee näkyviin hiiren painalluksen yhteydessä)</li><li><b>klassinen</b> (käyttöliittymä tulee näkyviin klikkauksen yhteydessä)</li></ul>","title":"Miten käyttöliittymä näytetään, kun napsautetaan latauspainiketta, ei kun sen yli leijuu?"},{"article":"QR-koodien avulla saat suoran linkin videoon tai ääneen millä tahansa laitteella, jossa on kamera. Varmista, että <b>\\"Display QR Codes\\"</b>-kohta on käytössä <a data-webext-page=\\"settings\\">{{extensionName}} asetukset</a>. Joissakin latausvaihtoehdoissa on \\"Get QR Code\\" icon&nbsp;<!--[img-qr-code]-->, jota napsauttamalla näet QR-koodin ja ohjeet puhelimellesi tai tabletillesi.","services":["gv","gvOk"],"title":"Miksi tarvitset QR-koodeja?"}],"yandex_market_adviser_notification_description":"Muutokset tulevat voimaan sen jälkeen, kun sivu on ladattu uudelleen Yandex.Market Adviser -widgetin avulla.","warning":"Varoitus!","show_yandex_market_adviser":"Näytä Yandex.Market Adviser - parhaat tarjoukset hintavertailuvidgetti","qr_code_error":"QR-koodipalvelu ei ole toistaiseksi käytettävissä. Yritä myöhemmin uudelleen.","qr_code_description":"Suoran latauslinkin lähettäminen älypuhelimeen tai tablettiin on helppoa - käynnistä QR-koodinlukija ja siirry yllä olevan kuvan päälle.","qr_code_title":"QR-koodi mobiililaitteelle","help":"Apua","drop_us_a_line":"Etkö löytänyt vastausta? Pistä meille viestiä ;)","take_screenshot_tooltip":"Ota kuvakaappaus","cancel_download":"Peruuta lataus/muunnos","active_download_warning_notification_description":"Jos olet poistunut sivulta, jolla on aktiivinen lataus, se jatkuu taustalla.","active_download_warning_notification_message":"Kaikki on hallinnassa!","copy_link_to_clipboard_notification_message":"Linkki kopioitu leikepöydälle","copy_link_to_clipboard_tooltip":"Kopioi linkki leikepöydälle","qr_code_tooltip":"Hanki QR-koodi","download_using_desktop_client_tooltip":"Lataa käyttämällä {{desktopClientName}}","download_using_desktop_client":"Lataa tarvittava tiedostomuoto käyttämällä {{desktopClientName}}","download_via_web_portal_tooltip":"Lataa kautta {{webPortalHostname}}","download_via_web_portal":"Lataa tarvittava muoto osoitteesta {{webPortalHostname}}","conversion_time":"muunnos ~{{conversionTime}}","conversion_required":"vaadittu muunnos","more_formats":"Lisää formaatteja","all_formats_for_download":"Kaikki ladattavat formaatit","formats_for_download":"Ladattavat muodot","continue":"Jatka","cancel":"Peruuta","do_not_show_on_load":"Älä näytä latauksessa","confirm_conversion_message":"Muunnos käyttää aktiivisesti laitteiston resursseja, mikä voi aiheuttaa selaimen nopeuden tilapäistä laskua, myös muissa välilehdissä.","confirm_conversion_title":"Valittu tiedostomuoto vaatii muuntamista!","settings":{"privacy":"Avaa {{extensionName}}:n yksityisyysasetukset","display_qr_codes":"Näytä QR-koodit","app_button_style_classic":"Classic (käyttöliittymä tulee näkyviin napsauttamalla)","app_button_style_modern":"Moderni (käyttöliittymä ilmestyy hiiren painalluksella)","title_app_button_style":"Nappityyli","warn_before_converting":"Varoitus ennen muuntamista","show_snapshot_button":"Näytä videon tilannekuvapainike","show_webm":"Näytä video WebM-muodossa","show_formats_required_online_conversion":"Näytä vaaditut formaatit online-muunnos","show_formats_available_via_desktop_client":"Näytösmuodot saatavilla osoitteessa {{desktopClientName}}","title":"Asetukset"},"return_to_the_previous_screen":"Takaisin","premiere_tooltip":"Vielä ei ole mitään ladattavaa :)","video":"Video","audio":"Audio","music":"Musiikki","selectFormat":"Valitse sopiva muoto","premiere":"Premiere","protected_tooltip":"Tätä videota ei voi ladata, sillä se on tekijänoikeussuojattu.","protected":"Suojattu","live_stream_tooltip":"Et voi vielä ladata live-striimejä, mutta työstämme sitä :)","live_stream":"Suora lähetys","download":"Lataa","auto_detect":"Automaattinen tunnistus","changeLanguage":"muutos","selectLanguage":"Valitse kieli","languageName":"Suomi","language":"Kieli","conflict_extensions":"Laajennus <b>{{competitorsDetection}}</b> multimediatiedostojen lataamiseen on havaittu. Useiden selainlaajennusten käyttäminen samanaikaisesti voi aiheuttaa selaimen <b>kaatumisia</b>.","download_error":"Tiedoston latauksessa tapahtui virhe. Voit palata ladattavissa olevien tiedostomuotojen luetteloon napsauttamalla Nollaa-painiketta.","reset":"Nollaa","second":"sec","minute":"min","hour":"h","day":"d","active_download_warning_on_leave":"Haluatko todella sulkea?","competitors":{"i_understand_risks":"Ymmärrän riskit","how_to_solve_this_problem":"Miten tämä ongelma ratkaistaan?"}}');
;// CONCATENATED MODULE: ./src/i18n/fil/translation.json
const fil_translation_namespaceObject = JSON.parse('{"settings":{"privacy":"Buksan ang mga setting ng privacy ni {{extensionName}}","display_qr_codes":"Ipakita ang mga QR Code","app_button_style_classic":"Classic (lumalabas ang interface sa pag-click)","app_button_style_modern":"Moderno (lumalabas ang interface sa ibabaw ng mouse)","title_app_button_style":"Estilo ng pindutan","warn_before_converting":"Magbabala bago mag-convert","show_snapshot_button":"Ipakita ang pindutan ng snapshot ng video","show_webm":"Ipakita ang video sa WebM na format","show_formats_required_online_conversion":"Ipakita ang mga format na kinakailangang online na conversion","show_formats_available_via_desktop_client":"Ipakita ang mga format na available sa pamamagitan ng {{desktopClientName}}","title":"Mga setting"},"data_consents":{"checkbox_eula":"Sumasang-ayon ako sa <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">kasunduan sa lisensya</a>","agree":"Sumasang-ayon ako, magpatuloy","disagree":"Tumanggi ako (alisin ang {{extensionName}})","button_fullstats":"Ibahagi ang data ng aktibidad sa teknikal at pagba-browse","button_techstats":"Ibahagi ang teknikal na data","button_disablestats":"Huwag magbahagi ng kahit ano","checkbox_technical_hint":"Anonymized na data sa mga error, nilalaro na content, bersyon ng mga ginamit na module, tagal at kahusayan ng mga isinagawang operasyon, configuration ng device ng user","checkbox_technical":"Sumasang-ayon ako sa pag-iimbak at pagproseso ng teknikal na data","checkbox_statistics_hint":"Mga istatistika sa mga pag-download (mga katangian ng nilalaman, mga napiling format), data sa pakikipag-ugnayan sa mga elemento ng interface, mga sukatan sa pagganap ng extension at mga indibidwal na module nito","checkbox_statistics":"Sumasang-ayon ako sa pag-iimbak at pagproseso ng istatistikal na data","checkbox_settings":"Sumasang-ayon ako sa <a data-webext-page=\\"data-consents-settings\\">mga setting ng privacy</a>","description_technical":"<strong>teknikal na data</strong>: pamilya at bersyon ng browser, paraan ng pagkuha ng media (partikular sa isang serbisyo ng video).","description_browsing":"<strong>data ng aktibidad sa pagba-browse</strong>: Mga URL ng mga online na video player, mga installation ID;","description_request":"Kailangan namin ang iyong pahintulot na kolektahin ang sumusunod na data upang mapanatili ang {{extensionName}}:","description":"Kahilingan ng pahintulot","title":"Form ng pahintulot sa pangongolekta at pagproseso ng data"},"social_media_sharing":{"screenshot":"screenshot","screenshot_plural":"mga screenshot","mediafile":"mediafile","mediafile_plural":"mediafiles","help_extension_to_get_better":"Tulungan ang {{extensionName}} na maging mas mahusay!","button_rate":"Rate","button_cancel_rate":"Hindi ngayon","asking_for_review_by_screenshots":"Matagumpay mong nagawa ang {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 /> Kami ay magpapasalamat sa pagsusuri at <7>5 star</7> ;)<9 />Ito ay talagang mahalaga para sa pag-unlad .","asking_for_review_by_downloads":"Matagumpay mong na-download ang {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> Kami ay magpapasalamat para sa pagsusuri at <7>5 bituin</7> ;)<9 />Ito ay talagang mahalaga para sa pag-unlad .","button_cancel":"Hindi ngayon","button_ok":"Ibahagi sa mga kaibigan","message":"<0>Sa aming extension ng browser {{already}} mo na-download ang <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1> Upang panatilihing libre ang {{extensionName}} kailangan namin ang iyong tulong - sabihin ang tungkol sa amin sa mga social network o messenger!</1>","already_moreThanOneMediafile":"na","title":"Sandali lang po muna!"},"conflict_extensions":"May nakitang extension na <b>{{competitorsDetection}}</b> para sa pag-download ng mga multimedia file. Ang pagpapatakbo ng ilang extension ng browser nang sabay-sabay ay maaaring maging sanhi ng <b>pag-crash</b> ng iyong browser.","download_error":"Nagkaroon ng error habang nagda-download ng file. Upang bumalik sa listahan ng mga format ng file na magagamit para sa pag-download, i-click ang pindutang I-reset.","reset":"I-reset","second":"sec","minute":"min","hour":"h","day":"d","direct_links_unavailable":"Pansamantalang hindi magagamit ang mga direktang link. Subukang <a data-webext-function=\\"reload\\">reload ang page</a> (F5 key)","yandex_market_adviser_notification_description":"Magkakabisa ang mga pagbabago pagkatapos i-reload ang page gamit ang Yandex.Market Adviser widget.","warning":"Babala!","show_yandex_market_adviser":"Ipakita ang Yandex.Market Adviser - widget ng paghahambing ng presyo ng pinakamahusay na deal","qr_code_error":"Ang serbisyo ng QR-code ay hindi magagamit sa ngayon. Subukang muli mamaya.","qr_code_description":"Madaling ipadala ang direktang link sa pag-download sa iyong smartphone o tablet - maglunsad lang ng QR code scanner at mag-hover sa larawan sa itaas.","qr_code_title":"QR code para sa mobile device","help_articles":[{"article":"Maaari mong i-download ang default na format sa pamamagitan ng pag-click sa button na <b>{{extensionName}}</b> sa ibaba ng video. Maaari mo ring piliin ang nais na format sa drop-down na listahan.","title":"Paano mag-download?"},{"article":"Available ang pinakamagandang kalidad sa <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> at <b>8K (4320p)</b>. Ang pangkalahatang rekomendasyon ay kung mas mataas ang resolution ng iyong screen, mas maganda dapat ang kalidad ng video. Gayunpaman, kailangan mong isaalang-alang ang iba pang mga kadahilanan: bilis ng pag-download, dami ng libreng espasyo, at ang pagganap ng device sa panahon ng pag-playback.","title":"Aling format ng video ang dapat kong piliin?"},{"article":"Ang browser/computer ay hindi dapat ganap na mag-freeze! Kung mangyari ito mangyaring iulat ito sa pamamagitan ng form ng feedback, na nagsasaad ng link ng video. Sa kasamaang palad, ang ilang mga format ng video ay hindi maaaring ma-download mula sa {{onlineVideoPlatform}} nang direkta. Samakatuwid, idinagdag namin ang posibilidad na mag-convert ng maliliit na video online sa nais na format sa <b>{{extensionName}}</b>. Sa ilang mga kaso, ang prosesong ito ay masyadong aktibong gumagamit ng mga mapagkukunan ng computer.","title":"Bakit nag-freeze ang browser/computer habang nagda-download?"},{"article":"Ang ilang format ng video file ay hindi direktang ma-download dahil sa ilang teknikal na katangian ng {{onlineVideoPlatform}}. Samakatuwid, ang <b>{{extensionName}}</b> ay may karagdagang tampok upang i-convert ang mga online na maikling video sa nais na format. Ang malalaking video (mas mahaba at/o mataas na kalidad) ay nangangailangan ng maraming mapagkukunan para sa online na conversion, na kung minsan ay maaaring mag-freeze ng iyong browser/computer. Samakatuwid, iminumungkahi na i-upload ang mga video na ito sa pamamagitan ng <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} para sa Windows</a></b>.","title":"Bakit hindi ako direktang makapag-download ng video sa gustong format?"},{"article":"Ang direktang link sa pag-download ay magagamit lamang para sa mga format na hindi nangangailangan ng conversion. Upang gawin ito, mag-click sa icon&nbsp;<!--[img-copy]--> sa isang linya na may naaangkop na opsyon sa pag-download, at pagkatapos ay i-paste ito bilang teksto kung saan kinakailangan.","title":"Paano ako makakakuha ng link sa pag-download ng video/audio?"},{"article":"Sapat na ang pumili ng kaukulang opsyon sa pag-download, na maaaring matukoy ng icon&nbsp;<!--[img-fps-60]-->. Gayunpaman, ang gayong mga pagpipilian ay hindi palaging magagamit. Una sa lahat, ang orihinal na video ay dapat na may hindi bababa sa 60 FPS. Gayundin, dapat itong maging available para sa panonood sa {{onlineVideoPlatform}} player na may 60 FPS rate.","title":"Paano mag-download ng 60 fps na video?"},{"article":"Sa kasamaang palad, hindi posibleng direktang mag-download ng MP3 format sa ngayon. Hindi ito sinusuportahan ng {{onlineVideoPlatform}}, at hindi matatag ang kinakailangang online na conversion. Gamitin ang aming <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} para sa Windows</a></b> na maaaring mag-convert ng mga video file sa MP3. O pumili ng anumang ibang format ng audio mula sa listahan (ipinahiwatig ng icon&nbsp;<!--[img-sound-on]-->).","title":"Paano mag-download ng audio track (musika) sa MP3?"},{"services":["gv","ok"],"article":"Siguraduhin na sa <a data-webext-page=\\"settings\\">mga setting</a> ay may checkbox sa tapat ng item na <b>\\"Ipakita ang video ​snapshot button\\"</b>. Sa kanang sulok sa ibaba ng player sa kaliwa ng icon ng <b>\\"Mga Setting\\"</b>, ang icon na <b>\\"Kumuha ng screenshot\\"</b>&nbsp;<!--[img-camera]--> dapat lumitaw, sa pamamagitan ng pag-click kung saan ang kasalukuyang frame mula sa video ay ise-save sa iyong computer sa jpeg na format.","title":"Paano kumuha ng screenshot?"},{"article":"Maaari kang pumili ng istilo ng button sa <a data-webext-page=\\"settings\\">mga setting</a>: <ul><li><b>moderno</b> (lumalabas ang interface sa ibabaw ng mouse)</li><li><b>classic</b> (lumalabas ang interface sa pag-click)</li></ul>","title":"Paano ipakita ang interface sa pag-click sa pindutan ng pag-download, hindi sa pag-hover sa ibabaw nito?"},{"services":["gv","gvOk"],"article":"Gamit ang mga QR code maaari kang makakuha ng direktang link sa video o audio sa anumang device na may camera. Tiyaking naka-enable ang <b>\\"Ipakita ang mga QR Code\\"</b> sa mga setting ng <a data-webext-page=\\"settings\\">{{extensionName}}</a>. Ang ilang mga opsyon sa pag-download ay magkakaroon ng icon na \\"Kumuha ng QR Code\\"&nbsp;<!--[img-qr-code]-->, sa pamamagitan ng pag-click kung saan makakakita ka ng QR code at mga tagubilin para sa iyong telepono o tablet.","title":"Bakit kailangan mo ng mga QR code?"}],"help":"Tulong","drop_us_a_line":"Hindi nakahanap ng sagot? Mag-drop sa amin ng isang linya ;)","take_screenshot_tooltip":"Kumuha ng screenshot","cancel_download":"Kanselahin ang pag-download/pag-convert","active_download_warning_notification_description":"Iniwan mo ang pahina na may aktibong pag-download, magpapatuloy ito sa background.","active_download_warning_notification_message":"Ang lahat ay nasa ilalim ng kontrol!","copy_link_to_clipboard_notification_message":"Nakopya ang link sa clipboard","copy_link_to_clipboard_tooltip":"Kopyahin ang link sa clipboard","qr_code_tooltip":"Kunin ang QR Code","download_using_desktop_client_tooltip":"Mag-download gamit ang {{desktopClientName}}","download_using_desktop_client":"I-download ang kinakailangang format gamit ang {{desktopClientName}}","download_via_web_portal_tooltip":"I-download sa pamamagitan ng {{webPortalHostname}}","download_via_web_portal":"I-download ang kinakailangang format sa pamamagitan ng {{webPortalHostname}}","conversion_time":"сconvert ~{{conversionTime}}","conversion_required":"kailangan ng conversion","more_formats":"Higit pang mga format","all_formats_for_download":"Lahat ng mga format para sa pag-download","formats_for_download":"Mga format para sa pag-download","continue":"Magpatuloy","cancel":"Kanselahin","do_not_show_on_load":"Huwag ipakita sa load","confirm_conversion_message":"Ang conversion ay aktibong gumagamit ng mga mapagkukunan ng hardware, maaari itong magsanhi ng pansamantalang pagbaba sa bilis ng browser, kabilang ang sa iba pang mga tab.","confirm_conversion_title":"Ang napiling format ng file ay nangangailangan ng conversion!","return_to_the_previous_screen":"Bumalik","premiere_tooltip":"Wala pang madadownload :)","video":"Video","audio":"Audio","music":"Musika","selectFormat":"Piliin ang naaangkop na format","premiere":"Premiere","protected_tooltip":"Hindi mo mada-download ang video na ito, protektado ito ng copyright.","protected":"Pinoprotektahan","live_stream_tooltip":"Hindi ka pa makakapag-download ng Mga Live Stream, ngunit ginagawa namin ito :)","live_stream":"Live Stream","download":"I-download","auto_detect":"Auto Detect","changeLanguage":"pagbabago","selectLanguage":"Pumili ng wika","languageName":"Filipino","language":"Wika","active_download_warning_on_leave":"Gusto mo ba talagang isara?","competitors":{"i_understand_risks":"Unawain ang mga panganib","how_to_solve_this_problem":"Paano malutas ang problema?"}}');
;// CONCATENATED MODULE: ./src/i18n/fr/translation.json
const fr_translation_namespaceObject = JSON.parse('{"language":"Langage","languageName":"Français","auto_detect":"Détection Automatique","download":"Télécharger","live_stream":"Flux en Direct","live_stream_tooltip":"Vous ne pouvez pas encore télécharger les Diffusions en Direct, mais nous y travaillons :)","premiere":"Première","premiere_tooltip":"Il n\'y a encore rien à télécharger :)","video":"Vidéo","audio":"Audio","music":"Musique","selectFormat":"Sélectionnez le format approprié","return_to_the_previous_screen":"Précédent","settings":{"title":"Paramètres","show_formats_available_via_desktop_client":"Afficher les formats disponibles via {{desktopClientName}}","show_formats_required_online_conversion":"Afficher les formats nécessitant une conversion en ligne","show_webm":"Afficher la vidéo au format WebM","show_snapshot_button":"Afficher le bouton de capture d\'instantanés de vidéo","warn_before_converting":"Avertir avant de convertir","title_app_button_style":"Style de bouton","app_button_style_modern":"Moderne (l\'interface apparaît au survol de la souris)","app_button_style_classic":"Classique (l\'interface apparaît au clic)","display_qr_codes":"Afficher les QR codes","privacy":"Ouvrir les paramètres de confidentialité de {{extensionName}}"},"confirm_conversion_title":"Le format de fichier choisi nécessite une conversion !","confirm_conversion_message":"La conversion utilise activement les ressources matérielles, ce qui peut devenir la raison d\'une diminution temporaire de la vitesse du navigateur, y compris dans les autres onglets.","do_not_show_on_load":"Ne pas afficher au chargement","cancel":"Annuler","continue":"Continuer","formats_for_download":"Formats pour télécharger","all_formats_for_download":"Tous les formats pour le téléchargement","more_formats":"Plus de formats","conversion_required":"besoin d\'une conversion","conversion_time":"conversion ~{{conversionTime}}","download_via_web_portal":"Télécharger le format requis via {{webPortalHostname}}","download_via_web_portal_tooltip":"Télécharger via {{webPortalHostname}}","download_using_desktop_client":"Télécharger le format requis en utilisant {{desktopClientName}}","download_using_desktop_client_tooltip":"Télécharger en utilisant {{desktopClientName}}","qr_code_tooltip":"Obtenir le QR Code","copy_link_to_clipboard_tooltip":"Copier le lien","copy_link_to_clipboard_notification_message":"Le lien est copié dans le presse-papiers","active_download_warning_notification_message":"Tout est sous contrôle !","active_download_warning_notification_description":"Vous avez quitté la page avec un téléchargement actif, il se poursuivra en arrière-plan.","cancel_download":"Annuler le téléchargement/la conversion","take_screenshot_tooltip":"Effectuer une capture d\'écran","drop_us_a_line":"Vous n\'avez pas trouvé de réponse ? Envoyez-nous un message ;)","help":"Aide","help_articles":[{"title":"Comment télécharger ?","article":"Vous pouvez télécharger le format par défaut en cliquant sur le bouton <b>{{extensionName}}</b> sous la vidéo. Vous pouvez également choisir le format souhaité dans la liste déroulante."},{"title":"Quel format vidéo dois-je choisir ?","article":"La meilleure qualité est disponible dans <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> et <b>8K (4320p)</b>. La recommandation générale est que plus la résolution de votre écran est élevée, plus la qualité de la vidéo devrait être bonne. Toutefois, vous devez également tenir compte d\'autres facteurs : la vitesse de téléchargement, quantité d\'espace libre et performances de l\'appareil pendant la lecture."},{"title":"Pourquoi un navigateur/ordinateur se bloque-t-il pendant le téléchargement ?","article":"Le navigateur/ordinateur ne doit pas se figer complètement ! Si cela s\'est produit, veuillez le signaler via le formulaire de commentaires, en indiquant le lien vers la vidéo. Malheureusement, certains formats vidéo ne peuvent pas être téléchargés de {{onlineVideoPlatform}} directement. C\'est pourquoi nous avons ajouté la possibilité de convertir les petites vidéos en format souhaité dans <b>{{extensionName}}</b> en ligne. Dans certains cas, ce processus utilise les ressources de l\'ordinateur trop activement."},{"title":"Pourquoi je ne peux pas télécharger une vidéo directement dans le format souhaité ?","article":"Certains formats de fichiers vidéo ne peuvent pas être téléchargés directement en raison de certaines propriétés techniques de {{onlineVideoPlatform}}. Par conséquent, le <b>{{extensionName}}</b> a une fonctionnalité supplémentaire pour convertir les vidéos courtes dans le format souhaité en ligne.Les large vidéos (plus longues et/ou de haute qualité) nécessitent de nombreuses ressources pour la conversion en ligne, ce que peut parfois geler votre navigateur/ordinateur. Donc on est suggéré de télécharger telles vidéos en utilisant le <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} pour Windows</a></b>."},{"title":"Comment puis-je obtenir un lien de téléchargement de vidéo/audio ?","article":"Le lien de téléchargement direct est disponible pour les formats qui ne nécessitent pas de conversion.Pour ce faire, cliquez sur l\'icône&nbsp;<!--[img-copy]--> dans une ligne avec l\'option de téléchargement appropriée, puis collez-la comme texte là où c\'est nécessaire."},{"title":"Comment télécharger une vidéo en 60 fps ?","article":"Il suffit de choisir l\'option de téléchargement correspondante, qui peut être identifiée par l\'icône&nbsp;<!--[img-fps-60]-->. Toutefois, ces options ne sont pas toujours disponibles. Surtout, la vidéo originale doit avoir au moins 60 FPS. En plus, elle doit pouvoir être visionné dans le lecteur de {{onlineVideoPlatform}} à 60 FPS."},{"title":"Comment télécharger une piste audio (musique) en MP3 ?","article":"Malheureusement, ce n\'est pas possible de télécharger directement le format MP3 pour le moment. {{onlineVideoPlatform}} ne le prend pas en charge, et la conversion en ligne nécessaire est instable. Utilisez notre <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} pour Windows</a></b>, qui peut convertir des fichiers vidéo en MP3. Ou sélectionnez l\'un des autre formats audio dans la liste (indiqué par l\'icône&nbsp;<!--[img-sound-on]-->)."},{"title":"Comment faire une capture d\'écran ?","article":"Assurez-vous que dans les <a data-webext-page=\\"settings\\">paramètres</a> il y a une case à cocher en face de l\'élément <b>\\"Afficher le bouton de capture le vidéo\\"</b>. Dans le coin inférieur droit du lecteur, à gauche de l\'icône <b>\\"Paramètres\\"</b> l\'icône <b>\\"Prendre une capture d\'écran\\"</b>&nbsp;<!--[img-camera]--> devrait apparaître, en cliquant dessus, l\'image actuelle de la vidéo sera enregistrée sur votre ordinateur au format jpeg.","services":["gv","ok"]},{"title":"Comment afficher l\'interface en cliquant sur le bouton de téléchargement et non en le survolant ?","article":"Vous pouvez choisir un style de bouton dans les <a data-webext-page=\\"settings\\">paramètres</a> : <ul><li><b>moderne</b> (l\'interface apparaît au pointé la souris)</li><li><b>classique</b> (l\'interface apparaît au clic)</li></ul>"},{"title":"Pourquoi avez-vous besoin de codes QR ?","article":"En utilisant des codes QR, vous pouvez obtenir un lien direct vers une vidéo ou un fichier audio sur tout appareil doté d\'une caméra. Assurez-vous quel\'élément <b>\\"Afficher les codes QR\\"</b> est activé dans les paramètres <a data-webext-page=\\"settings\\">de {{extensionName}}</a> . Certaines options de téléchargement comporteront une \\"Obtenir un code QR\\" icône&nbsp;<!--[img-qr-code]-->, en cliquant sur lequel vous verrez un code QR et des instructions pour votre téléphone ou votre tablette.","services":["gv","gvOk"]}],"qr_code_title":"Code QR pour appareil mobile","qr_code_description":"C\'est facile d\'envoyer le lien de téléchargement direct sur votre smartphone ou votre tablette - c\'est que lancer le scanner de code QR et le survoler l\'image ci-dessus.","qr_code_error":"Le service de code QR n\'est pas disponible pour le moment. Veuillez réessayer plus tard.","show_yandex_market_adviser":"Afficher Yandex.Market Adviser - widget de comparaison de prix des meilleures offres","warning":"Attention !","yandex_market_adviser_notification_description":"Les changements prendront effet après le rechargement de la page avec le widget Yandex.Advisor.","social_media_sharing":{"title":"Un moment s\'il vous plaît !","mediafile":"multimédia","mediafile_plural":"multimédias","already_oneMediafile":"","already_moreThanOneMediafile":"déjà","message":"<0>Avec notre extension de navigateur, vous avez {{already}}téléchargé <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1>Pour que {{extensionName}}reste gratuit, nous avons besoin de votre aide - parlez de nous sur les réseaux sociaux ou les messageries !</1>","button_ok":"Partager avec des amis","button_cancel":"Annuler, pas maintenant","help_extension_to_get_better":"Aidez-nous à améliorer {{extensionName}} !","button_rate":"Évaluer","button_cancel_rate":"Pas maintenant","asking_for_review_by_screenshots":"Vous avez réussi à faire {{screenshotsCount}}. $t(social_media_sharing.screenshot).<5 /> Nous serions reconnaissants pour la revue et <7>5 étoiles</7> ;)<9 />C\'est vraiment important pour le développement.","screenshot_plural":"captures d\'écran","screenshot":"capture d\'écran","asking_for_review_by_downloads":"Vous avez téléchargé avec succès {{downloadsCount}}. $t(social_media_sharing.mediafile).<5 /> Nous serions reconnaissants pour la critique et <7>5 étoiles</7> ;)<9 />C\'est vraiment important pour le développement."},"direct_links_unavailable":"Les liens directs sont temporairement indisponibles. Essayez de <a data-webext-function=\\"reload\\">recharger la page</a> (La touche de fonction F5)","day":"j","hour":"h","minute":"min","second":"sec","reset":"Annuler","download_error":"Une erreur est apparue pendant le téléchargement du fichier. Pour revenir à la liste des formats de fichiers disponibles pour le téléchargement, cliquez sur le bouton Annuler.","protected_tooltip":"Vous ne pouvez pas télécharger cette vidéo, elle est protégée par le droit d\'auteur.","protected":"Protégé","data_consents":{"checkbox_eula":"Je suis d\'accord avec <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">l\'accord de licence</a>","checkbox_statistics":"Je suis d\'accord avec le stockage et le traitement des données statistiques","checkbox_statistics_hint":"Statistiques sur les téléchargements (caractéristiques du contenu, formats sélectionnés), données sur l\'interaction avec les éléments de l\'interface, métriques sur les performances de l\'extension et de ses modules individuels","checkbox_technical":"Je suis d\'accord avec le stockage et le traitement des données techniques","checkbox_technical_hint":"Données anonymisées sur les erreurs, le contenu joué, les versions des modules utilisés, la durée et le succès des opérations effectuées, la configuration du dispositif de l\'utilisateur","disagree":"Je refuse (supprimer {{extensionName}})","agree":"Je suis d\'accord, continuez","checkbox_settings":"Je suis d\'accord avec <a data-webext-page=\\"data-consents-settings\\">les paramètres de confidentialité</a>","title":"Consentement à la collecte et au traitement des données","description":"Requête de permission pour obtenir des données","description_request":"Il faut nous donner la permission de collecter les données suivantes pour maintenir {{extensionName}} :","description_browsing":"<strong>données d\'activité du navigateur</strong> : URL de lecteurs vidéo en ligne, ID d\'installation ;","description_technical":"<strong>données techniques</strong> : famille et version du navigateur, méthode d\'extraction des médias (spécifique à un service vidéo).","button_disablestats":"Ne partager rien","button_techstats":"Partager les données tech.","button_fullstats":"Partager les données techniques et sur les activités de navigation"},"conflict_extensions":"Une extension <b>{{competitorsDetection}}</b> pour le téléchargement de fichiers multimédia a été détectée. Le lancement de plusieurs extensions de navigateur en même temps peut provoquer <b>une erreur</b> de votre navigateur.","selectLanguage":"Choisir une langue","changeLanguage":"changer","active_download_warning_on_leave":"Voulez-vous vraiment fermer ?","competitors":{"i_understand_risks":"Je comprends les risques","how_to_solve_this_problem":"Comment résoudre ce problème ?"}}');
;// CONCATENATED MODULE: ./src/i18n/ga/translation.json
const ga_translation_namespaceObject = JSON.parse('{"help":"Cabhrú","help_articles":[{"title":"Conas a íoslódáil?","article":"Is féidir leat an fhormáid réamhshocraithe a íoslódáil ach cliceáil ar an gcnaipe <b>{{extensionName}}</b> faoin bhfíseán. Chomh maith leis sin is féidir leat an fhormáid atá ag teastáil a roghnú sa liosta anuas."},{"title":"Cén fhormáid físeáin ba cheart dom a roghnú?","article":"Tá an caighdeán is fearr ar fáil i <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> agus <b>8K (4320p)</b>. Is é an moladh ginearálta ná dá airde taifeach do scáileáin is amhlaidh is fearr an caighdeán físeáin. Mar sin féin, caithfidh tú fachtóirí eile a mheas freisin: luas íoslódála, méid an spáis saor in aisce, agus feidhmíocht an fheiste le linn athsheinm."},{"title":"Cén fáth a reoiteann brabhsálaí/ríomhaire agus é á íoslódáil?","article":"Níor cheart don bhrabhsálaí/ríomhaire reoite go hiomlán! Má tharlaíonn sé seo, cuir in iúl é tríd an bhfoirm aiseolais, ag léiriú an nasc físe. Ar an drochuair, ní féidir roinnt formáidí físeáin a íoslódáil ó {{onlineVideoPlatform}} go díreach. Mar sin, tá an deis againn físeáin bheaga a thiontú ar líne go dtí an fhormáid a theastaíonn i <b>{{extensionName}}</b>. I gcásanna áirithe úsáideann an próiseas seo acmhainní ríomhaireachta ró-ghníomhach."},{"title":"Cén fáth nach féidir liom físeán a íoslódáil go díreach san fhormáid inmhianaithe?","article":"Ní féidir roinnt formáidí comhaid físe a íoslódáil go díreach mar gheall ar airíonna teicniúla áirithe {{onlineVideoPlatform}}. Mar sin, tá gné bhreise ag <b>{{extensionName}}</b> chun físeáin ghearra ar líne a thiontú san fhormáid atá uait. Teastaíonn go leor acmhainní ó fhíseáin mhóra (ar chaighdeán níos faide agus/nó ar ardchaighdeán) le haghaidh tiontaithe ar líne, ar féidir leo do bhrabhsálaí/ríomhaire a reoiteáil uaireanta. Mar sin, moltar na físeáin seo a uaslódáil tríd an <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} le haghaidh Windows</a></b>."},{"title":"Conas is féidir liom nasc íoslódála físe/fuaime a fháil?","article":"Tá nasc íoslódála díreach ar fáil ach amháin do na formáidí sin nach gá a chomhshó. Chun é sin a dhéanamh, cliceáil ar an deilbhín&nbsp;<!--[img-copy]--> i líne leis an rogha íoslódála chuí, agus ansin é a ghreamú mar théacs nuair is gá."},{"title":"Conas físeáin a íoslódáil 60 fss?","article":"Is leor an rogha íoslódála chomhfhreagrach a roghnú, ar féidir é a aithint leis an deilbhín&nbsp;<!--[img-fps-60]-->. Mar sin féin, níl roghanna den sórt sin ar fáil i gcónaí. Ar an gcéad dul síos, ní mór go mbeadh 60 FPS ar a laghad ag an bhfíseán bunaidh. Chomh maith leis sin, caithfidh sé a bheith ar fáil le féachaint air san imreoir {{onlineVideoPlatform}} le ráta 60 FPS."},{"title":"Conas a íoslódáil rian fuaime (ceol) i MP3?","article":"Ar an drochuair, ní féidir formáid MP3 a íoslódáil go díreach faoi láthair. Ní thacaíonn {{onlineVideoPlatform}} leis, agus tá an tiontú ar líne riachtanach éagobhsaí. Úsáid ár <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} le haghaidh Windows</a></b> ar féidir leo comhaid físe a thiontú go MP3. Nó roghnaigh aon fhormáid fuaime eile ón liosta (arna léiriú ag an deilbhín&nbsp; <!--[img-sound-on]-->)."},{"title":"Conas screenshot a ghlacadh?","services":["gv","ok"],"article":"Cinntigh go bhfuil ticbhosca sna <a data-webext-page=\\"settings\\">socruithe</a> os comhair na míre <b>\\"Taispeáin an cnaipe seat físeáin\\"</b>. Sa chúinne íochtarach ar dheis den imreoir ar thaobh na láimhe clé den deilbhín <b>\\"Socruithe\\"</b>, tá an deilbhín <b>\\"Tóg seat\\"</b>&nbsp;<!--[img-camera]--> le feiceáil, trí chliceáil ar a mbeidh an fráma reatha ón físeán a shábháil ar do ríomhaire i bhformáid jpeg."},{"title":"Conas an comhéadan a thaispeáint ar an gcnaipe íoslódála a chliceáil, ní ar hover thairis air?","article":"Is féidir leat stíl cnaipe a roghnú sna <a data-webext-page=\\"settings\\">socruithe</a>: <ul><li><b>nua-aimseartha</b> (tá comhéadan le feiceáil ar an luch thall)</li><li><b>clasaiceach</b> (tá an comhéadan le feiceáil ar chliceáil)</li></ul>"},{"services":["gv","gvOk"],"title":"Cén fáth a bhfuil cóid QR uait?","article":"Ag baint úsáide as cóid QR is féidir leat nasc díreach a fháil le físeán nó fuaime ar aon fheiste le ceamara. Cinntigh go bhfuil an mhír <b>\\"Taispeáin Cóid QR\\"</b> cumasaithe sna <a data-webext-page=\\"settings\\">socruithe {{extensionName}}</a>. Beidh deilbhín “Faigh Cód QR” i roinnt roghanna íoslódála&nbsp;<!--[img-qr-code]-->, trí chliceáil ar a bhfeicfidh tú cód QR agus treoracha do ghuthán nó do táibléad."}],"qr_code_description":"Tá sé éasca an nasc íoslódála díreach a sheoladh chuig d’fhón cliste nó do thaibléad - níl le déanamh ach scanóir cód QR a sheoladh agus ainliú thar an íomhá thuas.","qr_code_error":"Níl an tseirbhís cód QR ar fáil faoi láthair. Bain triail eile as ar ball.","show_yandex_market_adviser":"Taispeáin Comhairleoir Yandex.Market - giuirléid comparáide praghsanna na margaí is fearr","warning":"Rabhadh!","social_media_sharing":{"title":"Nóiméad le do thoil!","mediafile_0":"meánchomhad","mediafile_1":"chomhaid meán","mediafile_2":"chomhaid meán","mediafile_3":"chomhaid meán","mediafile_4":"chomhaid meán","message":"<0>Le ár n-eisínteacht brabhsálaí tá {{already}} íoslódáilte <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1> Teastaíonn do chabhair uainn chun {{extensionName}} a choinneáil saor - inis fúinn ar líonraí sóisialta nó ar theachtairí!</1>","button_cancel_rate":"Ní anois","screenshot_0":"scléip","screenshot_1":"scáileáin","screenshot_2":"scáileáin","screenshot_3":"scáileáin","screenshot_4":"scáileáin","button_rate":"Ráta","already_moreThanOneMediafile":"cheana","button_ok":"Roinn le cairde","button_cancel":"Ní anois","asking_for_review_by_downloads":"D\'éirigh leat {{downloadsCount}} $t(social_media_sharing.mediafile) a íoslódáil.<5 /> Bheimis buíoch as an léirmheas agus <7>5 réalta</7> ;)<9 />Tá sé fíorthábhachtach don fhorbairt .","asking_for_review_by_screenshots":"D\'éirigh leat {{screenshotsCount}} $t(social_media_sharing.screenshot) a dhéanamh.<5 /> Bheimis buíoch as an léirmheas agus <7>5 réalta</7> ;)<9 />Tá sé fíorthábhachtach don fhorbairt .","help_extension_to_get_better":"Cabhraigh le {{extensionName}} feabhsú!"},"language":"Teanga","languageName":"Gaeilge","selectLanguage":"Roghnaigh teanga","changeLanguage":"athrú","auto_detect":"Braith Uathoibríoch","download":"Íosluchtaigh","live_stream":"Sruth Beo","live_stream_tooltip":"Ní féidir leat Sruthanna Beo a íoslódáil go fóill, ach táimid ag obair air :)","settings":{"show_formats_available_via_desktop_client":"Taispeáin formáidí atá ar fáil trí {{desktopClientName}}","title":"Socruithe","show_formats_required_online_conversion":"Taispeáin formáidí a theastaíonn tiontú ar líne","show_webm":"Taispeáin físeáin i bhformáid WebM","show_snapshot_button":"Taispeáin an cnaipe seat físe","warn_before_converting":"Tabhair rabhadh roimh thiontú","title_app_button_style":"Stíl cnaipe","app_button_style_modern":"Nua-aimseartha (comhéadan le feiceáil ar an luch os a chionn)","app_button_style_classic":"Clasaiceach (comhéadan le feiceáil ar cliceáil)","display_qr_codes":"Taispeáin Cóid QR","privacy":"Oscail socruithe príobháideachais {{extensionName}}"},"protected":"Cosanta","protected_tooltip":"Ní féidir leat an físeán seo a íoslódáil, tá sé cosanta ag cóipcheart.","premiere":"Taibhiú","premiere_tooltip":"Níl aon rud le híoslódáil go fóill :)","selectFormat":"Memilih format yang sesuai","video":"Físeán","audio":"Fuaime","music":"Ceol","return_to_the_previous_screen":"Ar ais","confirm_conversion_title":"Éilíonn an fhormáid comhaid roghnaithe comhshó!","confirm_conversion_message":"Úsáideann comhshó acmhainní crua-earraí go gníomhach, d\'fhéadfadh sé seo a bheith ina chúis le laghdú sealadach ar luas an bhrabhsálaí, lena n-áirítear i gcluaisíní eile.","do_not_show_on_load":"Ná taispeáin ar ualach","cancel":"Cealaigh","continue":"Leanúint ar aghaidh","formats_for_download":"Formáidí le haghaidh íoslódáil","all_formats_for_download":"Gach formáidí íoslódáil","more_formats":"Tuilleadh formáidí","conversion_required":"comhshó de dhíth","conversion_time":"comhshó ~{{conversionTime}}","download_via_web_portal":"Íoslódáil an fhormáid riachtanach trí {{webPortalHostname}}","download_via_web_portal_tooltip":"Íoslódáil trí {{webPortalHostname}}","download_using_desktop_client":"Íoslódáil an fhormáid riachtanach le {{desktopClientName}}","download_using_desktop_client_tooltip":"Íoslódáil ag baint úsáide as {{desktopClientName}}","qr_code_tooltip":"Faigh cód QR","copy_link_to_clipboard_tooltip":"Cóipeáil an nasc chuig an ngearrthaisce","copy_link_to_clipboard_notification_message":"Cóipeáladh an nasc chuig an ngearrthaisce","active_download_warning_notification_message":"Tá gach rud faoi smacht!","active_download_warning_notification_description":"D\'fhág tú an leathanach le híoslódáil gníomhach, leanfaidh sé ar aghaidh sa chúlra.","active_download_warning_on_leave":"Ar mhaith leat a dhúnadh i ndáiríre?","cancel_download":"Cealaigh íoslódáil/tiontú","take_screenshot_tooltip":"Tóg screenshot","drop_us_a_line":"Nár aimsigh tú freagra? Buail líne chugainn ;)","qr_code_title":"Cód QR le haghaidh gléas soghluaiste","yandex_market_adviser_notification_description":"Tiocfaidh athruithe i bhfeidhm tar éis an leathanach a athlódáil leis an ghiuirléid Yandex.Market Adviser.","direct_links_unavailable":"Níl naisc dhíreacha ar fáil go sealadach. Déan iarracht <a data-webext-function=\\"athlódáil\\">an leathanach a athlódáil</a> (eochair F5)","day":"d","hour":"h","minute":"nóim","second":"soic","reset":"Athshocraigh","download_error":"Tharla earráid le linn íosluchtaithe an chomhaid. Chun filleadh ar an liosta formáidí comhaid atá ar fáil le híoslódáil, cliceáil ar an gcnaipe Athshocraigh.","data_consents":{"title":"Foirm toilithe le haghaidh bailiú agus próiseáil sonraí","description":"Iarratas ar chead","description_request":"Teastaíonn do chead uainn chun na sonraí seo a leanas a bhailiú chun {{extensionName}} a chothabháil:","description_browsing":"<strong>sonraí gníomhaíochta brabhsála</strong>: URLanna na n-imreoirí físe ar líne, aitheantais suiteála;","description_technical":"<strong>sonraí teicniúla</strong>: teaghlach brabhsálaí agus leagan, modh asbhainte meán (go sonrach do sheirbhís físeáin).","checkbox_eula":"Aontaím leis an <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">comhaontú ceadúnais</a>","checkbox_settings":"Aontaím leis na <a data-webext-page=\\"data-consents-settings\\">socruithe príobháideachais</a>","checkbox_statistics":"Aontaím le stóráil agus próiseáil sonraí staidrimh","checkbox_statistics_hint":"Staitisticí ar íoslódálacha (saintréithe an ábhair, formáidí roghnaithe), sonraí ar idirghníomhaíocht le heilimintí comhéadain, méadracht ar fheidhmíocht an tsínidh agus a modúil aonair","checkbox_technical":"Aontaím le stóráil agus próiseáil sonraí teicniúla","checkbox_technical_hint":"Sonraí gan ainm ar earráidí, ábhar seinnte, leaganacha de mhodúil úsáidte, fad agus éifeachtúlacht na n-oibríochtaí a dhéantar, cumraíocht gléis úsáideora","button_disablestats":"Ná roinn rud ar bith","button_techstats":"Roinn sonraí teicniúla amháin","button_fullstats":"Comhroinn sonraí gníomhaíochta teicniúla agus brabhsála","disagree":"Diúltaím (bain {{extensionName}})","agree":"Aontaím, lean ar aghaidh"},"conflict_extensions":"Braitheadh iarmhír <b>{{competitorsDetection}}</b> chun comhaid ilmheán a íoslódáil. Má ritheann tú roinnt breiseán brabhsálaí ag an am céanna is féidir <b>do bhrabhsálaí a thuairteáil</b>.","competitors":{"i_understand_risks":"Tuigim na rioscaí","how_to_solve_this_problem":"Conas is féidir liom an fhadhb seo a réiteach?"}}');
;// CONCATENATED MODULE: ./src/i18n/hi/translation.json
const hi_translation_namespaceObject = JSON.parse('{"conflict_extensions":"मीडिया फ़ाइलों को लोड करने के लिए एक्सटेंशन <b>{{competitorsDetection}}</b> का पता लगाया गया। एक ही समय में अनेक ब्राउज़र एक्सटेंशन चलाने से आपका ब्राउज़र <b>क्रैश</b> हो सकता है।","data_consents":{"agree":"मैं सहमत हूं, जारी रखें","disagree":"मैं अस्वीकार करता हूं ({{extensionName}} हटाएं)","checkbox_technical_hint":"त्रुटियों पर अज्ञात डेटा, खेली गई सामग्री, उपयोग किए गए मॉड्यूल के संस्करण, प्रदर्शन किए गए संचालन की अवधि और दक्षता, उपयोगकर्ता डिवाइस कॉन्फ़िगरेशन","checkbox_technical":"मैं तकनीकी डेटा के भंडारण और प्रसंस्करण के लिए सहमत हूं","checkbox_statistics_hint":"डाउनलोड पर सांख्यिकी (सामग्री विशेषताएँ, चयनित प्रारूप), इंटरफ़ेस तत्वों के साथ सहभागिता पर डेटा, एक्सटेंशन के प्रदर्शन पर मेट्रिक्स और इसके अलग-अलग मॉड्यूल","checkbox_statistics":"मैं सांख्यिकीय डेटा के भंडारण और प्रसंस्करण के लिए सहमत हूं","checkbox_settings":"मैं <a data-webext-page=\\"data-consents-settings\\">गोपनीयता सेटिंग</a> से सहमत हूं","checkbox_eula":"मैं <a href=\\"{{eulaUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">लाइसेंस अनुबंध</a> से सहमत हूं","description":"अनुमति निवेदन","title":"डेटा संग्रह और प्रसंस्करण सहमति प्रपत्र","description_request":"हमें निम्न डाटा को जमा करने के लिए अपनी अनुमति जरूरत है {{extensionName}}:","description_browsing":"<strong>ब्राउज़िंग क्रिया डाटा </strong>: ऑनलाइन वीडियो प्लेयर के यूआरएल, संस्थापन आईडी","description_technical":"<strong>तकनीक डाटा </strong>: ब्राउजर परिवार तथा संस्करण, मीडिया निकालन का विधि (वीडियो सेवा के लिए विशिष्ट)।","button_fullstats":"तकनीकी और ब्राउज़िंग क्रिया डाटा साझा करें","button_disablestats":"कुछ भी साझा नहीं करें","button_techstats":"सिर्फ तकनीकी डाटा साझा करें"},"download_error":"फ़ाइल डाउनलोड के दौरान एक त्रुटि हुई। डाउनलोड के लिए उपलब्ध फ़ाइल स्वरूपों की सूची पर लौटने के लिए, रीसेट बटन पर क्लिक करें।","reset":"रीसेट","second":"सेक","minute":"मिन","hour":"घ","day":"द","direct_links_unavailable":"प्रत्यक्ष लिंक अस्थायी रूप से अनुपलब्ध हैं। <a data-webext-function=\\"reload\\">पेज को फिर से लोड करने की कोशिश करें</a> (F5 कुंजी)","social_media_sharing":{"help_extension_to_get_better":"बेहतर बनने के लिए {{extensionName}} की मदद करें!","button_rate":"रेट","button_cancel_rate":"अभी नहीं","asking_for_review_by_screenshots":"आपने {{screenshotsCount}} $t(social_media_sharing.screenshot) सफलतापूर्वक बना लिया है।<5 /> हम समीक्षा के लिए आभारी होंगे और <7>5 स्टार</7> ;)<9 />विकास के लिए यह वास्तव में महत्वपूर्ण है।","screenshot":"स्क्रीनशॉट","screenshot_plural":"स्क्रीनशॉट","asking_for_review_by_downloads":"आपने {{downloadsCount}} $t(social_media_sharing.mediafile) को सफलतापूर्वक डाउनलोड कर लिया है। <5 /> हम समीक्षा के लिए आभारी होंगे और <7>5 स्टार</7> ;)<9 />यह वास्तव में विकास के लिए महत्वपूर्ण है।","button_cancel":"मेरे लिए अब यह करना मुश्किल है","button_ok":"दोस्तों के साथ बांटे","message":"<0>हमारे ब्राउज़र एक्सटेंशन का उपयोग करके, आपने {{already}} <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1 डाउनलोड कर लिया है। > {{extensionName}} को निःशुल्क रखने के लिए, हमें आपकी सहायता की आवश्यकता है — हमें हमारे बारे में सामाजिक नेटवर्क या तत्काल दूतों पर बताएं!</1>","already_moreThanOneMediafile":"पहले से","mediafile":"मीडिया फ़ाइल","mediafile_plural":"मीडिया फ़ाइलें","title":"बस एक क्षण्ा!"},"yandex_market_adviser_notification_description":"पृष्ठ को Yandex.Market सलाहकार विजेट के साथ पुनः लोड करने के बाद परिवर्तन प्रभावी होंगे।","warning":"चेतावनी!","show_yandex_market_adviser":"Yandex.Market सलाहकार दिखाएं - सर्वोत्तम सौदे मूल्य तुलना विजिट","qr_code_error":"QR - Code सेवा अभी के लिए उपलब्ध नहीं है। कृपया बाद में पुन: प्रयास करें।","qr_code_description":"अपने स्मार्टफोन या टैबलेट पर सीधा डाउनलोड लिंक भेजना आसान है - बस एक QR Code स्कैनर लॉन्च करें और ऊपर की छवि पर होवर करें।","qr_code_title":"मोबाइल डिवाइस के लिए QR Code।","help_articles":[{"article":"आप वीडियो के नीचे <b>{{extensionName}}</b> बटन पर क्लिक करके डिफ़ॉल्ट प्रारूप डाउनलोड कर सकते हैं। साथ ही आप ड्रॉप-डाउन सूची में वांछित प्रारूप चुन सकते हैं।","title":"कैसे डाउनलोड करें?"},{"article":"सबसे अच्छी क्वालिटी <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> और <b>8K (4320p)</b>में उपलब्ध है। सामान्य अनुशंसा यह है कि आपका स्क्रीन रिज़ॉल्यूशन जितना अधिक होगा, वीडियो की गुणवत्ता उतनी ही बेहतर होनी चाहिए। हालाँकि, आपको अन्य कारकों पर भी विचार करना होगा: डाउनलोड गति, खाली स्थान की मात्रा और प्लेबैक के दौरान डिवाइस का प्रदर्शन।","title":"मुझे कौन सा वीडियो प्रारूप चुनना चाहिए?"},{"article":"ब्राउज़र/कंप्यूटर पूरी तरह से जमना नहीं चाहिए! यदि ऐसा होता है तो कृपया वीडियो लिंक का संकेत देते हुए फीडबैक फॉर्म के माध्यम से इसकी रिपोर्ट करें। दुर्भाग्य से, कुछ वीडियो प्रारूप सीधे {{onlineVideoPlatform}} से डाउनलोड नहीं किए जा सकते। इसलिए, हमने छोटे वीडियो को <b>{{extensionName}}</b> में वांछित प्रारूप में ऑनलाइन परिवर्तित करने की संभावना जोड़ी है। कुछ मामलों में यह प्रक्रिया कंप्यूटर संसाधनों का भी सक्रिय रूप से उपयोग करती है।","title":"डाउनलोड करते समय ब्राउजर/कंप्यूटर फ्रीज क्यों हो जाता है?"},{"article":"{{onlineVideoPlatform}} के कुछ तकनीकी गुणों के कारण कुछ वीडियो फ़ाइल प्रारूपों को सीधे डाउनलोड नहीं किया जा सकता है। इसलिए, <b>{{extensionName}}</b> में ऑनलाइन लघु वीडियो को वांछित प्रारूप में बदलने के लिए एक अतिरिक्त विशेषता है। बड़े वीडियो (लंबे और/या उच्च गुणवत्ता वाले) को ऑनलाइन रूपांतरण के लिए कई संसाधनों की आवश्यकता होती है, जो कभी-कभी आपके ब्राउज़र/कंप्यूटर को फ्रीज कर सकते हैं। इसलिए, इन वीडियो को विंडोज के लिए <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}}</a></b> के जरिए अपलोड करने का सुझाव दिया गया है।","title":"मैं सीधे वांछित प्रारूप में वीडियो डाउनलोड क्यों नहीं कर सकता?"},{"article":"डायरेक्ट डाउनलोड लिंक केवल उन प्रारूपों के लिए उपलब्ध है जिन्हें रूपांतरण की आवश्यकता नहीं है। ऐसा करने के लिए, उचित डाउनलोड विकल्प के साथ एक पंक्ति में आइकन&nbsp;<!--[img-copy]--> पर क्लिक करें, और फिर इसे टेक्स्ट के रूप में जहां आवश्यक हो, पेस्ट करें।","title":"वीडियो/ऑडियो का लिंक कैसे प्राप्त करें?"},{"article":"संबंधित डाउनलोड विकल्प चुनना पर्याप्त है, जिसे आइकन&nbsp;<!--[img-fps-60]--> द्वारा पहचाना जा सकता है। हालाँकि, ऐसे विकल्प हमेशा उपलब्ध नहीं होते हैं। सबसे पहले, मूल वीडियो में कम से कम 60 FPS होना चाहिए। साथ ही, यह {{onlineVideoPlatform}} प्लेयर में देखने के लिए 60 FPS दर के साथ उपलब्ध होना चाहिए।","title":"60 FPS वीडियो कैसे डाउनलोड करें?"},{"article":"दुर्भाग्य से, इस समय MP3 प्रारूप को सीधे डाउनलोड करना संभव नहीं है। {{onlineVideoPlatform}} इसका समर्थन नहीं करता है, और आवश्यक ऑनलाइन रूपांतरण अस्थिर है। विंडोज़ के लिए हमारे <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}} का इस्तेमाल करें</a></b> जो वीडियो फ़ाइलों को एमपी3 में बदल सकता है। या सूची से किसी अन्य ऑडियो प्रारूप का चयन करें (आइकन&nbsp;<!--[img-sound-on]--> द्वारा दर्शाया गया है)।","title":"MP3 में ऑडियो ट्रैक (म्यूजिक) कैसे डाउनलोड करें?"},{"services":["gv","ok"],"article":"सुनिश्चित करें कि <a data-webext-page=\\"settings\\">सेटिंग्स</a> में <b>\\"वीडियो स्नैपशॉट बटन दिखाएं\\"</b> आइटम के सामने एक चेकबॉक्स है। <b>\\"सेटिंग्स\\"</b> आइकन के बाईं ओर प्लेयर के निचले दाएं कोने में, <b>\\"स्क्रीनशॉट लें\\"</b> आइकन&nbsp;<!--[img-camera]--> प्रकट होना चाहिए, जिस पर क्लिक करने से वीडियो का वर्तमान फ्रेम आपके कंप्यूटर में jpeg प्रारूप में सहेजा जाएगा।","title":"स्क्रीनशॉट कैसे लें?"},{"article":"आप <a data-webext-page=\\"settings\\">सेटिंग्स</a> में एक बटन शैली चुन सकते हैं: <ul><li><b>आधुनिक</b> (माउस ओवर पर इंटरफ़ेस दिखाई देता है)</li><li><b>क्लासिक</b> (क्लिक करने पर इंटरफ़ेस दिखाई देता है)</li></ul>","title":"डाउनलोड बटन पर क्लिक करने पर इंटरफ़ेस कैसे प्रदर्शित करें, उस पर होवर करने पर नहीं?"},{"services":["gv","gvOk"],"article":"QR Codes का उपयोग करके आप कैमरे के साथ किसी भी डिवाइस पर वीडियो या ऑडियो का सीधा लिंक प्राप्त कर सकते हैं। सुनिश्चित करें कि <b>\\"QR Code प्रदर्शित करें\\"</b> आइटम <a data-webext-page=\\"settings\\">{{extensionName}} सेटिंग</a> में सक्षम है। कुछ डाउनलोड विकल्पों में \\"QR Code प्राप्त करें\\" आइकन&nbsp;<!--[img-qr-code]--> होगा, जिस पर क्लिक करके आप अपने फोन या टैबलेट के लिए एक QR Code और निर्देश देखेंगे।","title":"QR Codes के आवश्यकता क्यों हैं?"}],"help":"मदद","drop_us_a_line":"उत्तर नहीं मिला? हमें एक पंक्ति मे छोडो ;)","take_screenshot_tooltip":"स्क्रीनशॉट लेना","cancel_download":"डाउनलोड/रूपांतरण रद्द करें","active_download_warning_notification_description":"आपने पृष्ठ को एक सक्रिय डाउनलोड के साथ छोड़ दिया है, यह पृष्ठभूमि में जारी रहेगा।","active_download_warning_notification_message":"सब कुछ नियंत्रण में है!","copy_link_to_clipboard_notification_message":"लिंक को क्लिपबोर्ड पर कॉपी किया गया","copy_link_to_clipboard_tooltip":"लिंक को क्लिपबोर्ड पर कॉपी करें","qr_code_tooltip":"QR Code प्राप्त करें","download_using_desktop_client_tooltip":"{{desktopClientName}} का उपयोग करके डाउनलोड करें","download_using_desktop_client":"{{desktopClientName}} का उपयोग करके आवश्यक प्रारूप डाउनलोड करें","download_via_web_portal_tooltip":"{{webPortalHostname}} के माध्यम डाउनलोड करें","download_via_web_portal":"{{webPortalHostname}} के माध्यम से आवश्यक प्रारूप डाउनलोड करें","conversion_time":"रूपांतरण ~{{conversionTime}}","conversion_required":"रूपांतरण की आवश्यकता है","more_formats":"अधिक प्रारूप","all_formats_for_download":"डाउनलोड के लिए सभी प्रारूप","formats_for_download":"डाउनलोड के लिए प्रारूपों","continue":"जारी रखना","cancel":"रद्द करना","do_not_show_on_load":"लोड पर मत दिखाओ","confirm_conversion_message":"रूपांतरण सक्रिय रूप से हार्डवेयर संसाधनों का उपयोग करता है, इससे अन्य टैब सहित ब्राउज़र की गति में अस्थायी कमी हो सकती है।","confirm_conversion_title":"चयनित फ़ाइल स्वरूप को रूपांतरण की आवश्यकता है!","settings":{"privacy":"{{extensionName}} की गोपनीयता सेटिंग खोलें","display_qr_codes":"QR Code प्रदर्शित करें","app_button_style_classic":"क्लासिक (इंटरफ़ेस क्लिक पर प्रकट होता है)","app_button_style_modern":"आधुनिक (माउस ओवर पर इंटरफ़ेस दिखाई देता है)","title_app_button_style":"बटन शैली","warn_before_converting":"कनवर्ट करने से पहले चेतावनी दें","show_snapshot_button":"स्क्रीनशॉट बटन दिखाएं","show_webm":"WebM प्रारूप में वीडियो दिखाएं","show_formats_required_online_conversion":"ऑनलाइन रूपांतरण के लिए आवश्यक प्रारूप दिखाएं","show_formats_available_via_desktop_client":"{{desktopClientName}} के माध्यम से उपलब्ध प्रदर्शन प्रारूप","title":"सेटिंग्स"},"return_to_the_previous_screen":"बैक","premiere_tooltip":"अभी डाउनलोड करने के लिए कुछ नहीं है :)","video":"वीडियो","audio":"ऑडियो","music":"संगीत","selectFormat":"उपयुक्त प्रारूप का चयन करें","premiere":"प्रीमियर","protected_tooltip":"आरेटिंगप इस वीडियो को डाउनलोड नहीं कर सकते, यह कॉपीराइट द्वारा सुरक्षित है।","protected":"संरक्षित","live_stream_tooltip":"आप अभी लाइव स्ट्रीम डाउनलोड नहीं कर सकते, लेकिन हम इस पर काम कर रहे हैं :)","live_stream":"लाइव स्ट्रीम","download":"डाउनलोड","auto_detect":"ऑटो का पता लगाने","changeLanguage":"बदलना","selectLanguage":"भाषा चुनें","languageName":"हिन्दी","language":"भाषा","active_download_warning_on_leave":"क्या आप सचमुच बंद करना चाहते हैं?","competitors":{"i_understand_risks":"मैं जोखिम समझता हूँ","how_to_solve_this_problem":"इस समस्या को हल कैसे करें?"}}');
;// CONCATENATED MODULE: ./src/i18n/id/translation.json
const id_translation_namespaceObject = JSON.parse('{"conversion_required":"diperlukan konversi","more_formats":"Lebih banyak format","all_formats_for_download":"Semua format untuk diunduh","formats_for_download":"Format untuk diunduh","continue":"Terus","cancel":"Membatalkan","do_not_show_on_load":"Jangan tampilkan pada beban","confirm_conversion_message":"Konversi secara aktif menggunakan sumber daya perangkat keras, ini dapat menyebabkan penurunan sementara dalam kecepatan browser, termasuk di tab lain.","confirm_conversion_title":"Format file yang dipilih membutuhkan konversi!","settings":{"privacy":"Buka {{extensionName}} pengaturan privasi","display_qr_codes":"Tampilkan Kode QR","app_button_style_classic":"Klasik (antarmuka ditampilkan saat diklik)","app_button_style_modern":"Modern (antarmuka ditampilkan saat melayang)","title_app_button_style":"Gaya kancing","warn_before_converting":"Peringatkan sebelum mengkonversi","show_snapshot_button":"Tampilkan tombol tangkapan video","show_webm":"Tampilkan video dalam format WebM","show_formats_required_online_conversion":"Tampilkan format yang memerlukan konversi online","show_formats_available_via_desktop_client":"Tampilkan format yang tersedia melalui {{desktopClientName}}","title":"Setelan"},"return_to_the_previous_screen":"Kembali","premiere_tooltip":"Belum ada yang mengunduh :)","video":"Video","audio":"Audio","music":"Musik","selectFormat":"Pilih format yang sesuai","premiere":"Premiere","protected_tooltip":"Anda tidak dapat mengunduh video ini, dilindungi oleh hak cipta.","protected":"Dilindungi","live_stream_tooltip":"Anda belum dapat mengunduh Siaran Langsung, tetapi kami sedang mengusahakannya :)","live_stream":"Siaran Langsung","download":"Unduh","auto_detect":"Deteksi Otomatis","changeLanguage":"perubahan","selectLanguage":"Pilih bahasa","languageName":"Bahasa Indonesia","language":"Bahasa","conflict_extensions":"Ekstensi <b>{{competitorsDetection}}</b> untuk mengunduh file multimedia telah terdeteksi. Menjalankan beberapa ekstensi browser secara bersamaan dapat menyebabkan browser Anda <b>macet</b>.","data_consents":{"agree":"Saya setuju, lanjutkan","disagree":"Saya menolak ( hapus {{extensionName}} )","checkbox_technical_hint":"Data anonim tentang kesalahan, konten yang diputar, versi modul yang digunakan, durasi dan efisiensi operasi yang dilakukan, konfigurasi perangkat pengguna","checkbox_technical":"Saya setuju untuk penyimpanan dan pemrosesan data teknis","checkbox_statistics_hint":"Statistik unduhan ( karakteristik konten, format yang dipilih ), data interaksi dengan elemen antarmuka, metrik kinerja ekstensi, dan modul individualnya","checkbox_statistics":"Saya setuju untuk penyimpanan dan pemrosesan data statistik","checkbox_settings":"Saya setuju dengan <a data-webext-page=\\"data-consents-settings\\">pengaturan privasi</a>","checkbox_eula":"Saya setuju dengan <a href=\\"{{eulaUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">perjanjian lisensi</a>","description":"Permintaan izin","title":"Pengumpulan data dan formulir persetujuan pemrosesan","description_request":"Kami memerlukan izin Anda untuk mengumpulkan data berikut ini untuk memelihara {{extensionName}}:","description_browsing":"<strong>data aktivitas penjelajahan</strong>: URL pemutar video online, ID penginstalan;","description_technical":"<strong>data teknis</strong>: keluarga dan versi peramban, metode ekstraksi media (khusus untuk layanan video).","button_techstats":"Membagikan data teknis","button_disablestats":"Jangan bagikan apa pun","button_fullstats":"Berbagi data aktivitas teknis dan penelusuran"},"download_error":"Terjadi kesalahan selama unduhan file. Untuk kembali ke daftar format file yang tersedia untuk diunduh, klik tombol \\"Atur ulang\\".","reset":"Atur ulang","second":"ked","minute":"men","day":"j","hour":"h","direct_links_unavailable":"Tautan langsung sementara tidak tersedia. Coba <a data-webext-function=\\"reload\\">muat ulang halaman</a> ( Kunci F5 )","social_media_sharing":{"help_extension_to_get_better":"Bantu {{extensionName}} untuk menjadi lebih baik!","button_rate":"Menilai","button_cancel_rate":"Tidak sekarang","asking_for_review_by_screenshots":"Anda telah berhasil membuat {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 />Kami akan berterima kasih atas ulasannya dan <7>5 bintang</7> ;)<9 />Ini sangat penting untuk pengembangan.","screenshot":"tangkapan layar","asking_for_review_by_downloads":"Anda telah berhasil mengunduh {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> Kami akan berterima kasih atas ulasannya dan <7>5 bintang</7> ;)<9 />Ini sangat penting untuk pengembangan.","button_cancel":"Tidak sekarang","button_ok":"Bagikan dengan teman","message":"<0> Dengan ekstensi browser kami, Anda memiliki {{already}} diunduh <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1> Untuk menjaga {{extensionName}} gratis, kami membutuhkan bantuan Anda - ceritakan tentang kami di jejaring sosial atau kurir!</1>","already_moreThanOneMediafile":"sudah","mediafile":"file media","title":"Tolong tunggu sebentar!"},"yandex_market_adviser_notification_description":"Perubahan akan berlaku setelah memuat ulang halaman dengan widget Penasihat Yandex.Market.","warning":"Peringatan!","show_yandex_market_adviser":"Tampilkan Yandex.Market Advisor - widget perbandingan harga penawaran terbaik","qr_code_error":"Layanan kode QR tidak tersedia untuk saat ini. Silakan coba lagi nanti.","qr_code_description":"Sangat mudah untuk mengirim tautan unduhan langsung ke ponsel cerdas atau tablet Anda - cukup luncurkan pemindai kode QR dan arahkan kursor ke gambar di atas.","qr_code_title":"Kode QR untuk perangkat seluler","help_articles":[{"article":"Anda dapat mengunduh format default dengan mengklik tombol <b>{{extensionName}}</b> di bawah video. Anda juga dapat memilih format yang diinginkan dalam daftar drop-down.","title":"Bagaimana cara mengunduh?"},{"article":"Kualitas terbaik tersedia dalam <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b>, dan <b>8K (4320p)</b>. Rekomendasi umum adalah bahwa semakin tinggi resolusi layar Anda, semakin baik kualitas video seharusnya. Namun, Anda harus mempertimbangkan faktor-faktor lain juga: kecepatan unduh, jumlah ruang kosong, dan kinerja perangkat selama pemutaran.","title":"Format video mana yang harus saya pilih?"},{"article":"Browser/komputer seharusnya tidak sepenuhnya membeku! Jika ini terjadi, harap laporkan melalui formulir umpan balik, yang menunjukkan tautan video. Sayangnya, beberapa format video tidak dapat diunduh dari {{onlineVideoPlatform}} secara langsung. Oleh karena itu, kami telah menambahkan kemungkinan untuk mengkonversi video kecil secara online ke format yang diinginkan dalam <b>{{extensionName}}</b>. Dalam beberapa kasus proses ini menggunakan sumber daya komputer terlalu aktif.","title":"Mengapa browser / komputer membeku saat mengunduh?"},{"article":"Beberapa format file video tidak dapat diunduh secara langsung karena properti teknis tertentu {{onlineVideoPlatform}}. Oleh karena itu, <b>{{extensionName}}</b> memiliki fitur tambahan untuk mengubah video pendek online ke dalam format yang diinginkan. Video besar ( lebih lama dan/atau berkualitas tinggi ) membutuhkan banyak sumber daya untuk konversi online, yang terkadang dapat membekukan browser/komputer Anda. Oleh karena itu, disarankan untuk mengunggah video ini melalui <b><a href=\\"{{desktopClientUrl}}\\"target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}} untuk Windows</a></b>.","title":"Mengapa saya tidak dapat mengunduh video dalam format yang diinginkan secara langsung?"},{"article":"Tautan unduhan langsung hanya tersedia untuk format yang tidak memerlukan konversi. Untuk melakukannya, klik ikon&nbsp;<!--[img-copy]--> dalam satu baris dengan opsi unduhan yang sesuai, dan kemudian tempelkan sebagai teks jika perlu.","title":"Bagaimana saya bisa mendapatkan tautan unduhan video / audio?"},{"article":"Sudah cukup untuk memilih opsi unduhan yang sesuai, yang dapat diidentifikasi oleh ikon&nbsp;<!--[img-fps-60]-->. Namun, opsi seperti itu tidak selalu tersedia. Pertama-tama, video asli harus memiliki setidaknya 60 FPS. Juga, itu harus tersedia untuk dilihat di pemutar {{onlineVideoPlatform}} dengan tingkat 60 FPS.","title":"Bagaimana cara mengunduh video 60 FPS?"},{"article":"Sayangnya, tidak mungkin mengunduh format MP3 secara langsung saat ini. {{onlineVideoPlatform}} tidak mendukungnya, dan konversi online yang diperlukan tidak stabil. Gunakan <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} kami untuk Windows</a></b> yang dapat mengonversi file video ke MP3. Atau pilih format audio lain dari daftar ( yang ditunjukkan oleh ikon&nbsp;<!--[img-sound-on]--> ).","title":"Bagaimana cara mengunduh trek audio ( musik ) di MP3?"},{"services":["gv","ok"],"article":"Pastikan bahwa di <a data-webext-page=\\"settings\\">pengaturan</a> terdapat kotak centang di seberang item <b>\\"Tampilkan tombol tangkapan video\\"</b>. Di sudut kanan bawah pemutar di sebelah kiri ikon <b>\\"Pengaturan\\"</b>, ikon <b>\\"Ambil tangkapan layar\\"</b> akan muncul, dengan mengekliknya, frame saat ini dari video akan disimpan ke komputer Anda dalam format jpeg.","title":"Bagaimana cara mengambil tangkapan layar?"},{"article":"Anda dapat memilih gaya tombol di <a data-webext-page=\\"settings\\">setelan</a>: <ul><li><b>modern</b> ( antarmuka muncul saat mouse di atas )</li><li><b>klasik</b> ( antarmuka muncul saat diklik )</li></ul>","title":"Bagaimana cara menampilkan antarmuka pada klik tombol unduh, bukan pada melayang di atasnya?"},{"services":["gv","gvOk"],"article":"Menggunakan kode QR Anda bisa mendapatkan tautan langsung ke video atau audio di perangkat apa pun dengan kamera. Pastikan item <b>\\"Tampilkan Kode QR\\"</b> diaktifkan di <a data-webext-page=\\"settings\\">{{extensionName}} setelan</a>. Beberapa opsi unduhan akan memiliki ikon&nbsp;<!--[img-qr-code]--> \\"Dapatkan Kode QR\\", dengan mengklik di mana Anda akan melihat kode QR dan instruksi untuk ponsel atau tablet Anda.","title":"Mengapa Anda membutuhkan kode QR?"}],"help":"Tolong","drop_us_a_line":"Tidak menemukan jawaban? Kirimkan surat kepada kami;)","take_screenshot_tooltip":"Ambil tangkapan layar","cancel_download":"Batalkan unduhan / konversi","active_download_warning_notification_description":"Anda telah meninggalkan halaman dengan unduhan aktif, itu akan berlanjut di latar belakang.","active_download_warning_notification_message":"Semuanya terkendali!","copy_link_to_clipboard_notification_message":"Tautan disalin ke clipboard","copy_link_to_clipboard_tooltip":"Salin tautan ke clipboard","qr_code_tooltip":"Dapatkan Kode QR","download_using_desktop_client_tooltip":"Unduh menggunakan {{desktopClientName}}","download_using_desktop_client":"Unduh format yang diperlukan menggunakan {{desktopClientName}}","download_via_web_portal_tooltip":"Unduh melalui {{webPortalHostname}}","download_via_web_portal":"Unduh format yang diperlukan melalui {{webPortalHostname}}","conversion_time":"konversi ~{{conversionTime}}","active_download_warning_on_leave":"Apakah Anda benar-benar ingin menutupnya?","competitors":{"i_understand_risks":"Saya memahami risiko","how_to_solve_this_problem":"Bagaimana mengatasi masalah ini?"}}');
;// CONCATENATED MODULE: ./src/i18n/it/translation.json
const it_translation_namespaceObject = JSON.parse('{"conflict_extensions":"È stata rilevata un\'estensione <b>{{competitorsDetection}}</b> per il download di file multimediali. Il funzionamento simultaneo di diverse estensioni può <b>bloccare</b> il tuo browser.","data_consents":{"agree":"Sono d\'accordo, continuare","disagree":"Mi rifiuto di (cancellare {{extensionName}})","checkbox_technical_hint":"Dati anonimizzati su errori, contenuti riprodotti, versioni dei moduli utilizzati, durata e successo delle operazioni eseguite, configurazione del dispositivo dell\'utente","checkbox_technical":"Autorizzo la memorizzazione e il trattamento dei dati tecnici","checkbox_statistics_hint":"Statistiche di download (caratteristiche dei contenuti, formati selezionati), dati sull\'interazione con gli elementi dell\'interfaccia, metriche di performance dell\'estensione e dei suoi singoli moduli","checkbox_statistics":"Autorizzo la memorizzazione e l\'elaborazione dei dati statistici","checkbox_settings":"Accetto le <a data-webext-page=\\"data-consents-settings\\">impostazioni sulla privacy</a>","checkbox_eula":"Accetto il <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">contratto di licenza</a>","description":"Richiesta di permesso","title":"Consenso alla raccolta e al trattamento dei dati","description_browsing":"<strong>dati sulle attività di navigazione</strong>: URL di lettori video online, ID di installazione;","button_disablestats":"Non condividere nulla","button_techstats":"Condividere dati tecnici","button_fullstats":"Condividere i dati tecnici e di navigazione","description_request":"Abbiamo bisogno del tuo permesso per raccogliere i seguenti dati per mantenere {{extensionName}}:","description_technical":"<strong>dati tecnici</strong>: famiglia e versione del browser, metodo di estrazione dei media (specifico per un servizio video)."},"download_error":"Si è verificato un errore durante l\'ultimo caricamento di file. Per tornare all\'elenco dei formati di download, fare clic sul pulsante «Reset».","reset":"Resettare","second":"sec","minute":"min","hour":"h","day":"g","direct_links_unavailable":"I link diretti non sono temporaneamente disponibili. Prova <a data-webext-function=\\"reload\\">ricaricare la pagina</a> (tasto F5)","social_media_sharing":{"help_extension_to_get_better":"Aiuta a {{extensionName}} diventare una persona migliore!","button_rate":"Valutare","button_cancel_rate":"Non ora","asking_for_review_by_screenshots":"Hai realizzato con successo {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 />Apprezzeremmo molto il feedback e le <7>5 stelle</7> ;)<9 />È davvero importante per lo sviluppo.","screenshot":"screenshot","screenshot_plural":"screenshot","asking_for_review_by_downloads":"Hai scaricato con successo {{downloadsCount}} $t(social_media_sharing.mediafile).<5 />Apprezzeremmo molto i feedback e le <7>5 stelle</7> ;)<9 />È davvero importante per lo sviluppo.","button_cancel":"E\' difficile per me farlo in questo momento","button_ok":"Condividere con gli amici","message":"<0>Con la nostra estensione per browser hai scaricato {{already}} <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1>Per far sì che {{extensionName}} rimanga gratuito, abbiamo bisogno del tuo aiuto: raccontaci di noi sui social media o sui messenger!</1>","already_moreThanOneMediafile":"già","mediafile":"file multimediale","mediafile_plural":"file multimediali","title":"Un attimo di attenzione!"},"yandex_market_adviser_notification_description":"Le modifiche diventano attive dopo aver ricaricato la pagina con il widget Yandex.Advisor.","warning":"Attenzione!","show_yandex_market_adviser":"Visualizzare Yandex.Advisor - widget di confronto prezzi per acquisti vantaggiosi","qr_code_error":"Il servizio di codice QR non è disponibile al momento. Riprovare più tardi.","qr_code_description":"Trasferire il link diretto per il download sul vostro smartphone o tablet è semplicissimo: accendete lo scanner del codice QR e passate sopra l\'immagine.","qr_code_title":"Codice QR per dispositivo mobile","help_articles":[{"article":"È possibile utilizzare il formato predefinito facendo semplicemente clic sul pulsante <b>{{extensionName}}</b> sotto il video. Oppure cliccando sul formato desiderato nell\'elenco dei download disponibili.","title":"Come si fa a scaricare qui?"},{"article":"I formati di migliore qualità sono <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> и <b>8K (4320p)</b>. In linea di massima, più alta è la risoluzione dello schermo, migliore dovrebbe essere la qualità del video. Tuttavia, è necessario considerare anche altri fattori: la velocità di download, la quantità di spazio libero e le capacità del dispositivo durante la riproduzione.","title":"Quale formato video scegliere?"},{"article":"Il browser/il computer non dovrebbe bloccarsi completamente! Se ciò accade, si prega di segnalarlo tramite il modulo di feedback con un link al video. Sfortunatamente, non è possibile scaricare video in alcuni formati {{onlineVideoPlatform}} direttamente. Per questo motivo abbiamo aggiunto a <b>{{extensionName}}</b> la possibilità di convertire online i video di piccole dimensioni nel formato desiderato. In alcuni casi questo processo utilizza troppe risorse del computer.","title":"Perché il browser/computer si blocca durante il caricamento?"},{"article":"A causa di alle caratteristiche tecniche {{onlineVideoPlatform}}, i video in alcuni formati non possono essere scaricati direttamente. Per questo motivo, <b>{{extensionName}}</b> aggiunge la possibilità di convertire online piccoli video nel formato desiderato. I video di grandi dimensioni (lunghi e/o di alta qualità) richiedono troppe risorse per la conversione online, causando a volte il blocco del browser/computer. Pertanto, si consiglia di scaricarli tramite <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\”_blank\\\\\\\\\\">{{desktopClientName}} per Windows</a></b>.","title":"Perché non posso scaricare direttamente il video nel formato corretto?"},{"article":"Il collegamento diretto al file è disponibile solo per i formati che non richiedono conversione. Per farlo, fai clic sull\'icona&nbsp;<!--[img-copy]--> nella riga con l\'opzione di download appropriata. Quindi incollarlo come testo nel punto in cui è necessario.","title":"Come posso ottenere un link per il video/audio?"},{"article":"È sufficiente selezionare l\'opzione di download appropriata, identificabile dall\'icona&nbsp;<!--[img-fps-60]-->. Tuttavia, queste opzioni non sono sempre disponibili. Innanzitutto, il video di partenza deve avere una frequenza di immagini di almeno 60. Inoltre, deve essere visualizzabile in una finestra di dialogo. E deve essere visualizzabile nel lettore {{onlineVideoPlatform}} a 60 FPS.","title":"Come scaricare un video a 60 FPS?"},{"article":"Purtroppo, al momento non è possibile scaricare direttamente in formato MP3 — {{onlineVideoPlatform}} non lo supporta e la conversione online richiesta non funziona correttamente. Utilizza il nostro <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}} per Windows</a></b>, che supporta la conversione di video in formato MP3. Oppure seleziona uno dei formati audio alternativi dall\'elenco (indicato dall\'icona&nbsp;<!--[img-sound-on]-->).","title":"Come si scarica una traccia audio (musica) in MP3?"},{"services":["gv","ok"],"article":"Assicurati che in <a data-webext-page=\\"settings\\">impostazioni</a> è segnato un elemento <b> «Visualizzare il tasto per salvare lo screenshot dal video»</b>. Nell\'angolo in basso a destra del lettore, a sinistra dell’icona <b>«Impostazioni»</b> dovrebbe apparire un\'icona&nbsp;<!--[img-camera]-->, facendo clic su di esso, la immagine corrente del video verrà salvata sul computer in formato jpeg.","title":"Come si salva una immagine da un video?"},{"article":"In <a data-webext-page=\\"settings\\">impostazioni</a> è possibile selezionare l\'aspetto del tasto: <ul><li><b>moderno</b> (l\'interfaccia viene visualizzata al passaggio del mouse)</li><li><b>classico</b> (l\'interfaccia viene visualizzata quando si fa clic)</li></ul>","title":"Come visualizzare l\'interfaccia quando si fa clic sul tasto di download anziché passarci sopra?"},{"services":["gv","gvOk"],"article":"Con i codici QR è possibile ottenere un collegamento diretto a video o audio su qualsiasi dispositivo dotato di fotocamera. Assicurateti che su <a data-webext-page=\\"settings\\">impostazioni {{extensionName}}</a>è incluso elemento <b>«Visualizzare i codici QR»</b>. Alcune opzioni di download presentano un\'icona&nbsp;<!--[img-qr-code]-->,facendo clic su di esso, viene visualizzato un codice QR e le istruzioni per il telefono o il tablet.","title":"Perché i codici QR sono necessari?"}],"help":"Aiuto","drop_us_a_line":"Nessuna risposta? Mandaci un\'email ;)","take_screenshot_tooltip":"Salva immagine","cancel_download":"Interrompere il download/la conversione","active_download_warning_notification_description":"Hai lasciato la pagina con un download attivo, che continuerà in modalità background.","active_download_warning_notification_message":"Tutto è sotto controllo!","copy_link_to_clipboard_notification_message":"Link copiato negli appunti","copy_link_to_clipboard_tooltip":"Copiare il link","qr_code_tooltip":"Ottenere il codice QR","download_using_desktop_client_tooltip":"Scaricare con {{desktopClientName}}","download_using_desktop_client":"Scaricare il formato desiderato tramite {{desktopClientName}}","download_via_web_portal_tooltip":"Scaricare tramite {{webPortalHostname}}","download_via_web_portal":"Scaricare il formato desiderato tramite {{webPortalHostname}}","conversion_time":"conversione ~{{conversionTime}}","conversion_required":"necessaria una conversione","more_formats":"Più formati","all_formats_for_download":"Tutti i formati disponibili","formats_for_download":"Opzioni di caricamento","continue":"Continuare","cancel":"Cancellazione","do_not_show_on_load":"Non visualizzare all\'avvio","confirm_conversion_message":"La conversione utilizza attivamente le risorse del computer, e ciò può causare un temporaneo rallentamento della velocità del browser, anche in altre schede.","confirm_conversion_title":"Il formato di file selezionato richiede una conversione!","settings":{"privacy":"Aprire le impostazioni sulla privacy {{extensionName}}","display_qr_codes":"Visualizzare i codici QR","app_button_style_classic":"Classico (l\'interfaccia viene visualizzata al clic)","app_button_style_modern":"Moderno (l\'interfaccia viene visualizzata al passaggio del mouse)","title_app_button_style":"Aspetto del tasto","warn_before_converting":"Avvisare durante la conversione","show_snapshot_button":"Visualizzare il tasto per salvare lo screenshot da un video","show_webm":"Visualizzare il video in formato WebM","show_formats_required_online_conversion":"Visualizzare i formati che richiedono la conversione online","show_formats_available_via_desktop_client":"Formati di visualizzazione disponibili tramite {{desktopClientName}}","title":"Impostazioni"},"return_to_the_previous_screen":"Indietro","premiere_tooltip":"Per ora non c\'è nulla da scaricare :)","video":"Video","audio":"Audio","music":"Musica","selectFormat":"Selezionare il formato desiderato","premiere":"Prima","protected_tooltip":"Non è possibile scaricare questo video, è protetto da copyright.","protected":"Protetto","live_stream_tooltip":"Le dirette ancora non possono essere scaricate, ma stiamo già lavorando per questo :)","live_stream":"Diretta","download":"Scaricare","auto_detect":"Riconoscimento automatico","changeLanguage":"cambiare","selectLanguage":"Selezionare la lingua","languageName":"Italiano","language":"Lingua","active_download_warning_on_leave":"Vuoi davvero chiudere?","competitors":{"i_understand_risks":"Comprendo i rischi","how_to_solve_this_problem":"Come risolvere il problema?"}}');
;// CONCATENATED MODULE: ./src/i18n/ja/translation.json
const ja_translation_namespaceObject = JSON.parse('{"language":"言語","languageName":"日本語","selectLanguage":"言語を選択","changeLanguage":"変更","auto_detect":"自動検出","download":"ダウンロード","live_stream":"ライブストリーム","live_stream_tooltip":"ライブストリームはまだダウンロードできませんが、今取り込んでいます：）","protected":"保護された","protected_tooltip":"このビデオは著作権保護のため、ダウンロードできません。","premiere":"プレミア","premiere_tooltip":"ダウンロードできるものはまだありません：）","video":"ビデオ","audio":"オーディオ","music":"音楽","selectFormat":"適切なフォーマットを選択する","return_to_the_previous_screen":"戻る","settings":{"title":"設定","show_formats_available_via_desktop_client":"{{desktopClientName}}で利用可能なフォーマットを表示する","show_formats_required_online_conversion":"オンライン変換が必要なフォーマットを表示する","show_webm":"WebMフォーマットでビデオを表示する","show_snapshot_button":"ビデオスナップショットボタンを表示する","warn_before_converting":"変換前に警告する","title_app_button_style":"ボタンの外観","app_button_style_classic":"クラシック（インターフェイスは、クリックすると表示される）","display_qr_codes":"QRコードを表示する","privacy":"{{extensionName}}のプライバシー設定を開く","app_button_style_modern":"モダン（インターフェイスは、ホバーすると表示される）"},"do_not_show_on_load":"ロード時に表示しない","cancel":"キャンセル","continue":"続ける","formats_for_download":"ダウンロードフォーマット","all_formats_for_download":"全ての利用可能なフォーマット","more_formats":"他のフォーマット","conversion_required":"変換が必要","conversion_time":"変換~{{conversionTime}}","download_via_web_portal":"{{webPortalHostname}}で必要なフォーマットでダウンロードする","download_via_web_portal_tooltip":"{{webPortalHostname}}でダウンロードする","download_using_desktop_client":"{{desktopClientName}}で必要なフォーマットでダウンロードする","download_using_desktop_client_tooltip":"{{desktopClientName}}を使用してダウンロードする","qr_code_tooltip":"QRコードを取得する","copy_link_to_clipboard_notification_message":"リンクはクリップボードにコピーされた","active_download_warning_notification_message":"心配無用です！","cancel_download":"ダウンロード／変換をキャンセル","take_screenshot_tooltip":"スクリーンショットを撮る","drop_us_a_line":"答えが見つかりませんでしたか？ご連絡ください；）","help":"ヘルプ","help_articles":[{"title":"ここでのダウンロード方法は何ですか？","article":"ただビデオの下にある<b>{{extensionName}}</b>ボタンをクリックすると、デフォルトのフォーマットを使用できます。又は、ダウンロードのために利用可能なフォーマットリストで必要なフォーマットを選択できます。"},{"title":"どのビデオフォーマットを選択すればよいですか？","article":"<b>FullHD (1080p)</b>、<b>2K (1440p)</b>、<b>4K (2160p)</b>、<b>8K (4320p)</b>フォーマットは最高の画質があります。一般的な推薦は、画面の解像度が高いほど、ビデオの品質が向上することです。ただし、ダウンロード速度、空き容量、再生時のデバイスパフォーマンスなど、他の要因も考慮する必要があります。"},{"title":"ブラウザー／コンピューターがダウンロード中にフリーズするのはなぜですか？","article":"ブラウザー／コンピュータが完全にフリーズすることはありません！これが発生した場合は、ビデオのリンクを示して、フィードバックフォームを使用して報告してください。残念ながら、一部のフォーマットがあるビデオは{{onlineVideoPlatform}}から直接ダウンロードできません。そのため、<b>{{extensionName}}</b>に小さなビデオをオンラインで必要なフォーマットに変換する機能を追加しました。場合によっては、このプロセスがコンピューターリソースを積極的に使用することがあります。"},{"title":"ビデオを必要なフォーマットで直接ダウンロードできないのはなぜですか？","article":"{{onlineVideoPlatform}}の技術的特性により、一部のフォーマットがあるビデオは直接ダウンロードできません。そのため、<b>{{extensionName}}</b>には、小さなビデオをオンラインで必要なフォーマットに変換する機能が追加されました。サイズの大きな（より長い及び／又は高品質の）ビデオは、オンライン変換のために多くのリソースを必要とするため、ブラウザー／コンピューターがフリーズすることがあります。したがって、<b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}}のWindows用の方法</a></b>を使用してこれらのビデオをダウンロードすることをお勧めします。"},{"title":"ビデオ／オーディオのダウンロードリンクを取得するためにはどうすればよいですか？","article":"ファイルへの直接ダウンロードリンクは、変換を必要としないフォーマットでのみ利用できます。このためには、適切なダウンロードオプションの行にある&nbsp;<!--[img-copy]-->アイコンをクリックします。その後、必要に応じてテキストとして貼り付けます。"},{"title":"60 fpsのビデオをダウンロードするためにはどうすればよいですか？","article":"<!--[img-fps-60]-->アイコンで確認できるダウンロードオプションを選択すれば十分です。ただし、そのようなオプションは常に利用できる意味ではありません。先ず、元のビデオのフレームレートは少なくとも60が必要です。また、60 FPSの{{onlineVideoPlatform}}プレーヤーで再生できる必要があります。"},{"title":"MP3のオーディオトラック（音楽）をダウンロードする方法は何ですか？","article":"残念ながら、{{onlineVideoPlatform}}がサポートされておらず、必要なオンライン変換が不安定なので、現時点ではMP3フォーマットを直接ダウンロードできません。ビデオをMP3に変換することをサポートする<b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}}のWindows用の方法</a></b>を使用できます。又は、リストから他のオーディオフォーマット（<!--[img-sound-on]-->アイコンで示されている。）を選択できます。"},{"title":"スクリーンショットを撮る方法はなんですか？","services":["gv","ok"],"article":"<a data-webext-page=\\"settings\\">設定</a>で<b>「ビデオスナップショットボタンを表示する」</b>項目のチェックボックスがチェックされていることを確認してください。<b>「設定」</b>アイコンの左側にあるプレーヤーの右下隅には、クリックするとビデオの現在のフレームがコンピューターにjpegフォーマットで保存される&nbsp;<!--[img-camera]-->アイコンが表示されます。"},{"title":"ダウンロードボタンをホバーではなく、クリックする方法でインターフェイスを表示するにはどうすればよいですか？","article":"<a data-webext-page=\\"settings\\">設定</a>で選択できるボタンの外観：<ul><li><b>モダン</b>（インターフェイスは、ホバーすると表示される）</li><li><b>クラシック</b>（インターフェイスは、クリックすると表示される）</li></ul>"},{"title":"QRコードが必要なのはなぜですか？","services":["gv","gvOk"],"article":"QRコードを使用することにより、カメラ付きの任意のデバイスでビデオ又はオーディオへの直接リンクを取得できます。<a data-webext-page=\\"settings\\">{{extensionName}}設定</a>で<b>「QRコードを表示する」</b>項目が有効になっていることを確認してください。一部のダウンロードオプションには、クリックするとQRコード及び、携帯電話又はタブレットの説明書が見える&nbsp;<!--[img-qr-code]-->アイコンが表示されます。"}],"qr_code_title":"モバイルデバイス用QRコード","qr_code_description":"直接ダウンロードリンクをスマートフォンやタブレットに送信するのは、QRコードスキャナーを起動して、上の画像にカーソルを重ね合わせているほど簡単です。","qr_code_error":"現在、QRコードサービスはご利用いただけません。後でもう一度お試しください。","show_yandex_market_adviser":"ヤンデックス・アドバイザーというお得な価格比較ウィジェットを表示する","social_media_sharing":{"title":"ちょっと待ってください！","mediafile":"メディアファイル","already_moreThanOneMediafile":"すでに","button_ok":"友人たちとシェアする","button_cancel":"今はやることができない","asking_for_review_by_downloads":"{{downloadsCount}} $t(social_media_sharing.mediafile)のダウンロードは成功です。<5 />レビューと<7>5つ星</7>をいただければ幸いです；）<9 />これは開発に本当に重要なものです。","screenshot":"スクリーンショット","button_cancel_rate":"今ではない","button_rate":"評価する","help_extension_to_get_better":"{{extensionName}} が良くなるのを手伝ってください！","message":"<0>私たちのブラウザー拡張機能を使用することにより、あなたは{{already}} <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile)をダウンロードしました：）</0><1> {{extensionName}}を無料に保つためには、あなたの助けが必要で、ソーシャルネットワークやメッセンジャーで私たちについて教えてください！</1>","asking_for_review_by_screenshots":"{{screenshotsCount}} $t(social_media_sharing.screenshot)は成功です。<5 />レビューと<7>5つ星</7>をいただければ幸いです；）<9 />これは発展に本当に重要なものです。"},"direct_links_unavailable":"直接リンクは一時的に利用できません。<a data-webext-function=\\"reload\\">ページをリロードしてみてください</a>(F5キー)","day":"日","hour":"時","minute":"分","second":"秒","reset":"リセット","download_error":"最近のファイルダウンロード中にエラーが発生しました。ダウンロードフォーマットリストに戻るには、「リセット」ボタンをクリックします。","data_consents":{"title":"データ収集及び処理同意書","checkbox_eula":"私は<a href=\\"{{eulaUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">ライセンス契約</a>に同意します","checkbox_settings":"<a data-webext-page=\\"data-consents-settings\\">プライバシー設定</a>に同意します","checkbox_statistics":"私は統計データの保存及び処理に同意します","checkbox_technical":"私は技術データの保存及び処理に同意します","checkbox_technical_hint":"エラー、再生されたコンテンツ、使用されたモジュールのバージョン、実行された操作の期間と効率、ユーザーデバイスの構成に関する匿名データ","disagree":"私は断ります（{{extensionName}} を削除する）","agree":"私は同意し、続けましょう","description":"許可要求","checkbox_statistics_hint":"ダウンロードに関する統計データ（コンテンツの特性、選択されたフォーマット）、インターフェース要素との相互作用に関するデータ、拡張機能及びその個々のモジュールのパフォーマンスに関するメトリクス","description_request":"{{extensionName}} を維持するために、以下のデータを収集する許可が必要です：","description_browsing":"<strong>ブラウジング活動データ</strong>： オンラインビデオプレーヤーのURL、インストールID；","description_technical":"<strong>技術データ</strong>：ブラウザのファミリーとバージョン、メディア抽出の方法（ビデオサービスに特有のもの）。","button_disablestats":"何も共有しないこと","button_techstats":"技術データのみ共有","button_fullstats":"技術データおよび閲覧アクティビティ・データの共有"},"conflict_extensions":"マルチメディアファイルをダウンロードするための<b>{{competitorsDetection}}</b>拡張機能が検出されました。複数のブラウザー拡張機能の同時実行により、ブラウザーが<b>誤動作する</b>場合があります。","confirm_conversion_title":"選択したファイルフォーマットは変換が必要です！","confirm_conversion_message":"変換はコンピューターリソースを積極的に使用することにより、他のタブを含み、ブラウザー速度が一時的に低下する場合があります。","copy_link_to_clipboard_tooltip":"リンクをコピーする","active_download_warning_notification_description":"ダウンロードしているままでページを離れてしまったため、ダウンロードはバックグラウンドで続行されます。","warning":"注意！","yandex_market_adviser_notification_description":"変更は、ヤンデックス・アドバイザーのウィジェット付きのページをリロードしてから有効になります。","active_download_warning_on_leave":"本当に閉店したいのか？","competitors":{"how_to_solve_this_problem":"この問題を解決するには？","i_understand_risks":"リスクを理解している"}}');
;// CONCATENATED MODULE: ./src/i18n/kk/translation.json
const kk_translation_namespaceObject = JSON.parse('{"data_consents":{"checkbox_settings":"Мен <a data-webext-page=\\"data-consents-settings\\">құпиялық параметрлерімен</a> келісемін","agree":"Келісемін, жалғастырыңыз","disagree":"Мен бас тартамын ({{extensionName}} жою)","button_fullstats":"Техникалық және шолу әрекеті деректерін бөлісіңіз","button_techstats":"Тек техникалық деректерді бөлісіңіз","button_disablestats":"Ештеңені бөліспеңіз","checkbox_technical_hint":"Қателер, ойнатылатын мазмұн, пайдаланылған модульдердің нұсқалары, орындалған әрекеттердің ұзақтығы мен тиімділігі, пайдаланушы құрылғысының конфигурациясы туралы анонимді деректер","checkbox_technical":"Техникалық деректерді сақтауға және өңдеуге келісемін","checkbox_statistics_hint":"Жүктеп алу статистикасы (мазмұн сипаттамалары, таңдалған форматтар), интерфейс элементтерімен өзара әрекеттесу деректері, кеңейтім мен оның жеке модульдерінің өнімділігі бойынша көрсеткіштер","checkbox_statistics":"Мен статистикалық деректерді сақтауға және өңдеуге келісемін","checkbox_eula":"Мен <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">лицензиялық келісімге</a> келісемін","description_technical":"<strong>техникалық деректер</strong>: браузер тобы және нұсқасы, мультимедианы шығару әдісі (бейне қызметіне тән).","description_browsing":"<strong>шолу әрекеті деректері</strong>: желідегі бейне ойнатқыштардың URL мекенжайлары, орнату идентификаторлары;","description_request":"{{extensionName}} қызметін қолдау үшін бізге келесі деректерді жинауға рұқсатыңыз қажет:","description":"Рұқсат сұрауы","title":"Деректерді жинауға және өңдеуге келісім нысаны"},"download_via_web_portal":"Қажетті пішімді {{webPortalHostname}} арқылы жүктеп алыңыз","social_media_sharing":{"screenshot":"скриншот","screenshot_plural":"скриншоттар","mediafile":"медиафайл","mediafile_plural":"медиафайлдар","help_extension_to_get_better":"{{extensionName}} қолданбасының жақсаруына көмектесіңіз!","button_rate":"Бағалау","button_cancel_rate":"Қазір емес","asking_for_review_by_screenshots":"Сіз {{screenshotsCount}} $t(social_media_sharing.screenshot) сәтті жасадыңыз.<5/> Пікір және <7>5 жұлдыз</7> үшін алғысымызды білдіреміз ;)<9/>Бұл әзірлеу үшін өте маңызды .","asking_for_review_by_downloads":"Сіз {{downloadsCount}} $t(social_media_sharing.mediafile) файлын сәтті жүктеп алдыңыз.<5/> Біз шолу және <7>5 жұлдыз</7> үшін алғысымызды білдіреміз ;)<9/>Бұл даму үшін өте маңызды .","button_cancel":"Қазір емес","button_ok":"Достармен бөлісіңіз","message":"<0>Біздің шолғыш кеңейтімімен сіз {{already}} жүктеп алдыңыз <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1> {{extensionName}} қолданбасын тегін ұстау үшін бізге сіздің көмегіңіз қажет – әлеуметтік желілерде немесе мессенджерлерде біз туралы айтыңыз!</1>","already_moreThanOneMediafile":"қазірдің өзінде","title":"Бір минут, өтінемін!"},"conflict_extensions":"Мультимедиалық файлдарды жүктеп алуға арналған <b>{{competitorsDetection}}</b> кеңейтімі анықталды. Бірнеше шолғыш кеңейтімдерін бір уақытта іске қосу браузеріңіздің <b>бұзылуына</b> әкелуі мүмкін.","download_error":"Файлды жүктеп алу кезінде қате орын алды. Жүктеп алуға болатын файл пішімдерінің тізіміне оралу үшін Қалпына келтіру түймесін басыңыз.","reset":"Қалпына келтіру","second":"сек","minute":"мин","hour":"h","day":"г","direct_links_unavailable":"Тікелей сілтемелер уақытша қолжетімсіз. <a data-webext-function=\\"reload\\">бетті қайта жүктеп</a> көріңіз (F5 пернесі)","yandex_market_adviser_notification_description":"Өзгерістер Yandex.Market Adviser виджетімен бетті қайта жүктегеннен кейін күшіне енеді.","warning":"Ескерту!","show_yandex_market_adviser":"Яндекс.Маркет кеңесшісін көрсету - ең жақсы мәмілелер бағасын салыстыру виджеті","qr_code_error":"QR-код қызметі әзірге қолжетімсіз. Тағы жасауды сәл кейінірек көріңізді өтінеміз.","qr_code_description":"Тікелей жүктеп алу сілтемесін смартфонға немесе планшетке жіберу оңай - жай ғана QR-код сканерін іске қосып, меңзерді жоғарыдағы суреттің үстіне апарыңыз.","qr_code_title":"Мобильді құрылғыға арналған QR коды","help_articles":[{"article":"Бейненің астындағы <b>{{extensionName}}</b> түймесін басу арқылы әдепкі пішімін жүктеп алуға болады. Сондай-ақ ашылмалы тізімнен қажетті пішімді таңдауға болады.","title":"Қалай жүктеп алуға болады?"},{"article":"Ең жақсы сапа форматында қолжетімді <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> және <b>8K (4320p)</b>. Жалпы ұсыныс: экран ажыратымдылығы неғұрлым жоғары болса, бейне сапасы соғұрлым жақсы болуы керек. Дегенмен, сіз басқа факторларды да ескеруіңіз керек: жүктеу жылдамдығы, бос орын көлемі және ойнату кезінде құрылғының өнімділігі.","title":"Қандай бейне пішімін таңдауым керек?"},{"article":"Браузер/компьютер толығымен қатып қалмауы керек! Бұл орын алса, бейне сілтемесін көрсете отырып, кері байланыс нысаны арқылы хабарлаңыз. Өкінішке орай, кейбір бейне пішімдерін {{onlineVideoPlatform}} сайтынан тікелей жүктеп алу мүмкін емес. Сондықтан біз <b>{{extensionName}}</b> ішінде шағын бейнелерді онлайн режимінде қажетті пішімге түрлендіру мүмкіндігін қостық. Кейбір жағдайларда бұл процесс компьютер ресурстарын тым белсенді пайдаланады.","title":"Жүктеп алу кезінде браузер/компьютер неге қатып қалады?"},{"article":"Кейбір бейне файл пішімдерін {{onlineVideoPlatform}} кейбір техникалық қасиеттеріне байланысты тікелей жүктеп алу мүмкін емес. Демек, <b>{{extensionName}}}</b> онлайн қысқа бейнелерді қажетті пішімге түрлендіруге арналған қосымша мүмкіндікке ие. Үлкен бейнелер (ұзынырақ және/немесе жоғары сапалы) онлайн түрлендіру үшін көптеген ресурстарды қажет етеді, бұл кейде браузерді/компьютерді қатып қалуы мүмкін. Сондықтан бұл бейнелерді <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} Windows жүйесіне арналған</a></b> арқылы жүктеп салу ұсынылады.","title":"Неліктен мен қалаған форматтағы бейнені тікелей жүктей алмаймын?"},{"article":"Тікелей жүктеу сілтемесі түрлендіруді қажет етпейтін пішімдерге ғана қолжетімді. Ол үшін тиісті жүктеп алу опциясы бар жолдағы&nbsp;<!--[img-copy]--> белгішесін басыңыз, содан кейін оны қажет жерде мәтін ретінде қойыңыз.","title":"Бейне/аудио жүктеу сілтемесін қалай алуға болады?"},{"article":"Сәйкес жүктеу опциясын таңдау жеткілікті, оны&nbsp;<!--[img-fps-60]--> белгішесі арқылы анықтауға болады. Дегенмен, мұндай опциялар әрқашан қол жетімді емес. Ең алдымен, түпнұсқа бейнеде кемінде 60 FPS болуы керек. Сондай-ақ, ол 60 FPS жылдамдығымен {{onlineVideoPlatform}} ойнатқышында көруге қолжетімді болуы керек.","title":"60 кадр/с бейнені қалай жүктеп алуға болады?"},{"article":"Өкінішке орай, қазір MP3 пішімін тікелей жүктеп алу мүмкін емес. {{onlineVideoPlatform}} оны қолдамайды және қажетті онлайн түрлендіру тұрақсыз. Бейне файлдарды MP3 форматына түрлендіруге болатын <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} Windows жүйесін</a></b> пайдаланыңыз. Немесе тізімнен кез келген басқа аудио пішімін таңдаңыз (белгішесі&nbsp;<!--[img-sound-on]-->).","title":"MP3 форматындағы аудио тректі (музыканы) қалай жүктеуге болады?"},{"services":["gv","ok"],"article":"<a data-webext-page=\\"settings\\">параметрлерде</a> <b>\\"Бейне суретін көрсету түймесі\\"</b> элементіне қарама-қарсы құсбелгі бар екеніне көз жеткізіңіз. Ойнатқыштың төменгі оң жақ бұрышындағы <b>\\"Параметрлер\\"</b> белгішесінің сол жағындағы <b>\\"Скриншот түсіру\\"</b> белгішесі&nbsp;<!--[img-camera]--> пайда болуы керек, оны басу арқылы бейнедегі ағымдағы кадр сіздің компьютеріңізге jpeg пішімінде сақталады.","title":"Скриншотты қалай түсіруге болады?"},{"article":"Түйме мәнерін <a data-webext-page=\\"settings\\">параметрлерден</a> таңдауға болады: <ul><li><b>заманауи</b> (интерфейс тінтуірдің үстінде пайда болады)</li><li><b>классикалық</b> (интерфейс басқанда пайда болады)</li></ul>","title":"Интерфейсті оның үстіне апарғанда емес, жүктеу түймесін басқанда қалай көрсетуге болады?"},{"services":["gv","gvOk"],"article":"QR кодтарын пайдалану арқылы камерасы бар кез келген құрылғыдағы бейнеге немесе аудиоға тікелей сілтеме алуға болады. <a data-webext-page=\\"settings\\">{{extensionName}} параметрлерінде</a> <b>\\"QR кодтарын көрсету\\"</b> элементінің қосылғанын тексеріңіз. Кейбір жүктеп алу опцияларында \\"QR кодын алу\\" белгішесі&nbsp;<!--[img-qr-code]--> болады, оны басу арқылы телефон немесе планшет үшін QR кодын және нұсқауларды көресіз.","title":"Сізге QR кодтары не үшін қажет?"}],"help":"Көмектесіңдер","drop_us_a_line":"Жауап таппадың ба? Бізге желіні қалдырыңыз ;)","take_screenshot_tooltip":"Скриншот түсіріңіз","cancel_download":"Жүктеп алудан/түрлендіруден бас тарту","active_download_warning_notification_description":"Сіз белсенді жүктеп алынған бетті қалдырдыңыз, ол фондық режимде жалғасады.","active_download_warning_notification_message":"Барлығы бақылауда!","copy_link_to_clipboard_notification_message":"Сілтеме алмасу буферіне көшірілді","copy_link_to_clipboard_tooltip":"Сілтемені алмасу буферіне көшіріңіз","qr_code_tooltip":"QR кодын алыңыз","download_using_desktop_client_tooltip":"{{desktopClientName}} арқылы жүктеп алу","download_using_desktop_client":"{{desktopClientName}} арқылы қажетті пішімді жүктеп алыңыз","download_via_web_portal_tooltip":"{{webPortalHostname}} арқылы жүктеп алу","conversion_time":"сonversion ~{{conversionTime}}","conversion_required":"түрлендіру қажет","more_formats":"Қосымша форматтар","all_formats_for_download":"Жүктеп алу үшін барлық форматтар","formats_for_download":"Жүктеп алуға арналған форматтар","continue":"Жалғастыру","cancel":"Болдырмау","do_not_show_on_load":"Жүктемеде көрсетпеңіз","confirm_conversion_message":"Түрлендіру аппараттық ресурстарды белсенді түрде пайдаланады, бұл басқа қойындыларды қоса, шолғыш жылдамдығының уақытша төмендеуіне әкелуі мүмкін.","confirm_conversion_title":"Таңдалған файл пішімі түрлендіруді қажет етеді!","settings":{"privacy":"{{extensionName}} құпиялылық параметрлерін ашыңыз","display_qr_codes":"QR кодтарын көрсету","app_button_style_classic":"Классикалық (интерфейс басқанда пайда болады)","app_button_style_modern":"Заманауи (интерфейс тінтуірдің үстінде пайда болады)","title_app_button_style":"Түйме стилі","warn_before_converting":"Түрлендіру алдында ескертіңіз","show_snapshot_button":"Бейне суреті түймесін көрсетіңіз","show_webm":"Бейнені WebM пішімінде көрсету","show_formats_required_online_conversion":"Онлайн түрлендіруге қажетті пішімдерді көрсету","show_formats_available_via_desktop_client":"{{desktopClientName}} арқылы қолжетімді пішімдерді көрсету","title":"Параметрлер"},"return_to_the_previous_screen":"Артқа","premiere_tooltip":"Әлі жүктеп алатын ештеңе жоқ :)","video":"Бейне","audio":"Аудио","music":"Музыка","selectFormat":"Сәйкес пішімді таңдаңыз","premiere":"Премьера","protected_tooltip":"Бұл бейнені жүктеп алу мүмкін емес, ол авторлық құқықпен қорғалған.","protected":"Қорғалған","live_stream_tooltip":"Сіз әлі тікелей ағындарды жүктеп ала алмайсыз, бірақ біз онымен жұмыс істеп жатырмыз :)","live_stream":"Тікелей трансляция","download":"Жүктеп алу","auto_detect":"Автоматты анықтау","changeLanguage":"өзгерту","selectLanguage":"Тілді таңдаңыз","languageName":"Қазақ Тілі","language":"Тіл","active_download_warning_on_leave":"Сіз шынымен жабылғыңыз келе ме?","competitors":{"i_understand_risks":"Тәуекелдерді түсіну","how_to_solve_this_problem":"Бұл мәселені қалай шешу керек?"}}');
;// CONCATENATED MODULE: ./src/i18n/ko/translation.json
const ko_translation_namespaceObject = JSON.parse('{"premiere":"프리미어","protected_tooltip":"이 비디오를 다운로드할 수 없다. 저작권이 있다.","protected":"보호됨","live_stream_tooltip":"라이브 스트림은 아직 다운로드할 수 없지만 이미 손질하는 중 :)","live_stream":"라이브 스트림","download":"다운로드","auto_detect":"자동 감지","changeLanguage":"바꾸다","selectLanguage":"언어 선택","languageName":"한국어","language":"언어","premiere_tooltip":"아직 다운로드할 것이 없음 :)","video":"비디오","audio":"오디오","music":"음악","selectFormat":"관심 있는 형식을 선택하세요","return_to_the_previous_screen":"뒤로","settings":{"title":"설정","show_formats_available_via_desktop_client":"{{desktopClientName}} 에서 사용할 수 있는 형식을 표시하기","show_formats_required_online_conversion":"온라인 환산이 필요한 형식 보이기","show_webm":"비디오를 WebM 형식으로 표시하기","show_snapshot_button":"비디오에 스크린숏 저장 버튼 보이기","warn_before_converting":"환산할 때 경고","title_app_button_style":"버튼 모습","app_button_style_modern":"현대적 (움직일 때 인터페이스 나타남)","app_button_style_classic":"고전적 (클릭할 때 인터페이스 나타남)","display_qr_codes":"QR 코드 보이기","privacy":"개인 정보 보호 설정 {{extensionName}} 열기"},"confirm_conversion_title":"선택한 파일 형식은 환산이 필요한다!","confirm_conversion_message":"환산은 컴퓨터 리소스를 적극적으로 사용하므로 다른 탭을 포함하여 브라우저의 속도가 일시적으로 저하될 수 있다.","do_not_show_on_load":"다운로드할 때 보이지 않기","cancel":"취소","continue":"다음","all_formats_for_download":"모든 사용 가능한 형식","more_formats":"더 많은 형식","conversion_required":"환산 필요","conversion_time":"환산하는 중 ~{{conversionTime}}","download_via_web_portal_tooltip":"{{webPortalHostname}} 로 다운로드하기","download_using_desktop_client":"{{desktopClientName}}를 통해 올바른 형식으로 다운로드하기","download_using_desktop_client_tooltip":"{{desktopClientName}} 로 다운로드하기","qr_code_tooltip":"QR 코드 받기","copy_link_to_clipboard_notification_message":"클립보드에 링크를 복사했다","active_download_warning_notification_message":"모든 것이 통제되고 있음!","cancel_download":"다운로드/ 환산 중지","take_screenshot_tooltip":"화면 저장","drop_us_a_line":"답을 못 찾아셨어요? 연락하십시오;)","help":"도움","help_articles":[{"title":"여기서 어떻게 다운받는가?","article":"동영상 아래에 있는 <b> {{extensionName}} </b> 버튼을 누르면 기본 형식을 사용할 수 있다. 또는 다운로드 가능한 목록에서 원하는 형식을 클릭한다."},{"title":"어떤 비디오 형식을 선택해야 하는가?","article":"최고 화질 형식은 <b>풀HD(1080p)</b>, <b>2K(1440p)</b>, <b>4K(2160p)</b> 및 <b>8K(4320p)</b>이다. 일반적인 권장 사항은 화면 해상도가 높을수록 비디오 화질이 향상되어야 한다는 것이다. 그러나 다운로드 속도, 사용 가능한 공간 및 재생 중인 장치의 성능 등 다른 요인도 고려해야 한다."},{"title":"다운로드 중에 브라우저/ 컴퓨터가 프리징 이유는 무엇인가?","article":"브라우저/ 컴퓨터가 완전히 프리징하면 안 된다! 그런 경우 피드백 양식을 통해 이 문제를 보고하고 비디오 링크를 지정하십시오. 일부 형식의 동영상은 {{onlineVideoPlatform}} 에서 직접 다운로드할 수 없다. 그래서 우리는 <b>{{extensionName}}</b> 에서 작은 비디오를 원하는 형식으로 온라인 변환하는 기능을 추가했다. 때에 따라서는 이 과정이 컴퓨터 리소스를 너무 많이 사용한다."},{"title":"동영상을 직접 다운로드할 수 없는 이유는 무엇인가?","article":"{{onlineVideoPlatform}} 의 기술적 특성 때문에 일부 비디오 형식은 직접 다운로드할 수 없다. 따라서 <b>{{extensionName}}</b> 에서 작은 비디오를 원하는 형식으로 온라인 환산하는 기능을 추가했다. 대형 비디오(지속적 및/또는 고화질)는 온라인 환산에 너무 많은 리소스를 필요로 하며 때로는 브라우저/컴퓨터가 프리징되기도 한다. <b>따라서 Windows을 위해서 <a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}}를</a></b> 통해 다운로드할 수 있다."},{"title":"어떻게 비디오/오디오 링크를 받을 수 있인가?","article":"파일에 대한 직접 링크는 환산이 필요하지 않은 형식에서만 사용할 수 있다. 이렇게 하려면 올바른 다운로드 옵션이 있는 줄의 파비콘 &nbsp;<!--[img-copy]-->을 클릭한다. 그런 다음 필요한 곳에 텍스트로 붙여넣는다."},{"title":"60 FPS 비디오를 다운로드하려면 어떻게 해야 하는가?","article":"적절한 다운로드 옵션을 선택하면 그만이다. 파비콘 &nbsp;<!--[img-fps-60]-->에서 확인할 수 있다. 그러나 항상 그러한 선택권이 있는 것은 아니다. 우선 원본 비디오 자체는 프레임률이 60개 이상이어야 한다. 그리고 60 FPS가 있는 {{onlineVideoPlatform}} 플레이어에서 사용할 수 있어야 한다."},{"title":"오디오 트랙(음악)을 MP3로 다운로드하려면 어떻게 해야 하는가?","article":"안타깝게도 지금 MP3로 직접 다운로드할 수 없다. {{onlineVideoPlatform}}는 이 형식을 다운로드할 수 없다. 왜냐하면 필요한 온라인 환산이 불안정하기 때문이다. 비디오를 MP3로 환산할 수 있는 <b>Windows을 위한 <a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}}를</a></b> 사용한다. 또는 목록에 있는 대체 오디오 형식 중 하나를 선택한다 (파비콘&nbsp;<!--[img-sound-on]-->)."},{"title":"동영상에서 화면을 어떻게 저장하는가?","services":["gv","ok"],"article":"<a data-webext-page=\\"settings\\">설정</a>에서 <b>\\"동영상 스크린숏 저장 버튼 보이기\\"</b> 를 선택했는지 확인하는다. 플레이어의 오른쪽 모서리 아래, 버튼 <b>«설정»</b> 왼쪽 아래에 &nbsp;<!--[img-camera]--> 파비콘이 나타나야 한다. 이 버튼을 누르면 현재 동영상의 화면을 jpeg 파일로 저장한다."},{"title":"움직일 때 대신 클릭할 때 인터페이스를 어떻게 나타낼 수 있는가?","article":"<a data-webext-page=\\"settings\\">설정</a>에서 버튼의 외관을 선택할 수 있다: <ul><li><b>현대적</b> (움직일 때 인터페이스 나타남) </li><li><b>고전적</b> (클릭할 때 인터페이스 나타남)</li></ul>"},{"title":"QR코드가 필요한 이유는 무엇인가?","services":["gv","gvOk"],"article":"QR코드를 사용하면 카메라가 있는 모든 장치에서 비디오나 오디오에 대한 직접 링크를 얻을 수 있다. <a data-webext-page=\\"settings\\">설정 {{extensionName}}</a>에서 <b>\\"QR코드 보기\\"</b>를 사용하도록 설정했는지 확인한다. 일부 다운로드 옵션에는 &nbsp;<!--[img-qr-code]--> 파비콘이 있다. 클릭하시면 QR코드와 휴대폰나 태블릿을 위한 설명서를 보실 수 있다."}],"qr_code_title":"모바일 장치의 QR 코드","qr_code_description":"스마트폰이나 태블릿에 다운로드하기 위해 직접 링크를 전송하기는 이제 쉽다. QR 코드 스캐너를 실행하고 위의 이미지를 본다.","qr_code_error":"QR코드 서비스를 사용할 수 없다. 나중에 다시 해 보십시오.","show_yandex_market_adviser":"Yandex.Market Adviser - 좋은 쇼핑을 위한 가격 비교 위젯 보이기","warning":"주의!","yandex_market_adviser_notification_description":"변경 사항은 Yandex.Market Adviser 위젯 페이지를 다시 시작한 후 적용된다.","social_media_sharing":{"title":"잠깐!","mediafile":"미디어 파일","already_moreThanOneMediafile":"벌써","button_ok":"친구들과 공유하기","button_cancel":"지금 그것을 하기가 어렵다","asking_for_review_by_downloads":"{{downloadsCount}} $t(social_media_sharing.mediafile)를 성공적으로 다운로드했다. <5 />리뷰와 <7>별 다섯 개도</7> 감사드릴 건다;)<9 />발전을 위해 정말 중요한다.","screenshot":"스크린숏","asking_for_review_by_screenshots":"{{screenshotsCount}} $t(social_media_sharing.screenshot)를 성공적으로 수행했다. <5 />리뷰와 <7>별 다섯 개도</7> 감사드릴 건다;)<9 />발전을 위해 정말 중요한다.","button_cancel_rate":"지금은 아니다","button_rate":"평하기","help_extension_to_get_better":"{{extensionName}}가 더 나아질 수 있도록 도와주세요!","message":"우리의 브라우저 확장을 통해서 {{already}} <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0>를 다운받았다. <1>{{extensionName}} 를 무료로 유지하려면 SNS 또는 메신저에서 우리에 대해 이야기하십시오!</1>"},"direct_links_unavailable":"임시로 직접 링크를 사용할 수 없다. <a data-webext-function=\\"reload\\">페이지를 다시 시작해본다</a> (건반 F5)","day":"일","hour":"시","minute":"분","second":"초","data_consents":{"title":"데이터수집 및 처리동의","checkbox_eula":"<a href=\\"{{eulaUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">라이센스 계약을</a> 수락하기","checkbox_settings":"<a data-webext-page=\\"data-consents-settings\\">개인 정보 보호 설정에</a> 동의하기","checkbox_statistics":"통계 데이터를 저장하고 처리할 수 있는 권한을 부여하기","checkbox_statistics_hint":"다운로드 통계(콘텐츠 특성, 선택한 형식), 인터페이스 요소와의 상호 작용 데이터, 확장 성능 메트릭 및 개별 모듈","checkbox_technical":"기술 데이터 보관 및 처리를 허가하기","disagree":"거절하기({{extensionName}} 삭제)","agree":"동의하고 다음","description":"권한 요청","checkbox_technical_hint":"오류, 재생된 콘텐츠, 사용된 모듈의 버전, 수행된 작업의 기간 및 효율성, 사용자 장치 구성에 대한 익명화된 데이터","description_request":"{{extensionName}}를 지원하기 위해 다음 데이터를 수집하려면 귀하의 허가가 필요합니다:","description_browsing":"<strong>브라우징 활동 데이터</strong>: 온라인 동영상 플레이어의 URL, 설치 ID;","description_technical":"<strong>기술 데이터</strong>: 브라우저 유형 및 버전, 미디어 추출 방법(동영상 서비스만 해당).","button_disablestats":"아무것도 공유하지 않기","button_techstats":"기술 데이터만 공유","button_fullstats":"기술 및 검색 활동 데이터 공유"},"conflict_extensions":"미디어 파일을 다운로드하기 위한 확장자 <b>{{competitorsDetection}}</b>가 발견되었다. 여러 브라우저 확장이 동시에 작동하면 당신의 브라우저에 <b>장애가</b> 발생할 수 있다.","formats_for_download":"다운로드 형식","download_via_web_portal":"{{webPortalHostname}}를 통해 올바른 형식으로 다운로드하기","copy_link_to_clipboard_tooltip":"링크 주소 복사","active_download_warning_notification_description":"활성 다운로드 페이지를 떠났으며 백그라운드에서 계속된다.","reset":"초기화","download_error":"마지막 파일을 다운로드하는 중 오류가 발생했다. 다운로드 목록으로 돌아가고 \\"초기화\\" 버튼을 클릭한다.","active_download_warning_on_leave":"정말 닫으시겠습니까?","competitors":{"how_to_solve_this_problem":"이 문제를 해결하는 방법?","i_understand_risks":"위험을 이해합니다"}}');
;// CONCATENATED MODULE: ./src/i18n/lt/translation.json
const lt_translation_namespaceObject = JSON.parse('{"help_articles":[{"article":"Numatytąjį formatą galite atsisiųsti spustelėję po vaizdo įrašu esantį mygtuką <b>{{extensionName}}</b>. Taip pat išskleidžiamajame sąraše galite pasirinkti norimą formatą.","title":"Kaip parsisiųsti?"},{"article":"Geriausia kokybė pasiekiama <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> ir <b>8K (4320p)</b>. Bendra rekomendacija yra ta, kad kuo didesnė ekrano skiriamoji geba, tuo geresnė vaizdo kokybė. Tačiau turite atsižvelgti ir į kitus veiksnius: atsisiuntimo greitį, laisvos vietos kiekį ir įrenginio našumą atkūrimo metu.","title":"Kokį vaizdo įrašo formatą turėčiau pasirinkti?"},{"article":"Naršyklė/kompiuteris neturėtų visiškai užšalti! Jei taip atsitiks, praneškite apie tai naudodami atsiliepimų formą, nurodydami vaizdo įrašo nuorodą. Deja, kai kurių vaizdo įrašų formatų negalima atsisiųsti tiesiogiai iš {{onlineVideoPlatform}}. Todėl įtraukėme galimybę konvertuoti mažus vaizdo įrašus internete į norimą formatą <b>{{extensionName}}</b>. Kai kuriais atvejais šis procesas pernelyg aktyviai naudoja kompiuterio išteklius.","title":"Kodėl atsisiunčiant užstringa naršyklė / kompiuteris?"},{"article":"Kai kurių vaizdo įrašų failų formatų negalima atsisiųsti tiesiogiai dėl tam tikrų techninių {{onlineVideoPlatform}} savybių. Taigi, <b>{{extensionName}}</b> turi papildomą funkciją, leidžiančią konvertuoti internetinius trumpus vaizdo įrašus į norimą formatą. Dideliems vaizdo įrašams (ilgesniems ir (arba) aukštos kokybės) reikia daug išteklių, kad būtų galima konvertuoti internetu, todėl kartais gali užšalti naršyklė/kompiuteris. Todėl šiuos vaizdo įrašus siūloma įkelti naudojant <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}}, skirtą „Windows“</a></b>.","title":"Kodėl negaliu tiesiogiai atsisiųsti vaizdo įrašo norimu formatu?"},{"article":"Tiesioginio atsisiuntimo nuoroda galima tik tiems formatams, kuriems nereikia konvertuoti. Norėdami tai padaryti, spustelėkite piktogramą&nbsp;<!--[img-copy]--> eilutėje su atitinkama atsisiuntimo parinktimi, tada įklijuokite ją kaip tekstą, kur reikia.","title":"Kaip gauti vaizdo/garso atsisiuntimo nuorodą?"},{"title":"Kaip atsisiųsti 60 kadrų per sekundę vaizdo įrašą?","article":"Pakanka pasirinkti atitinkamą atsisiuntimo parinktį, kurią galima atpažinti pagal piktogramą&nbsp;<!--[img-fps-60]-->. Tačiau tokios galimybės ne visada prieinamos. Visų pirma, originalus vaizdo įrašas turi turėti bent 60 FPS. Be to, jį turi būti galima peržiūrėti naudojant {{onlineVideoPlatform}} grotuvą su 60 FPS sparta."},{"article":"Deja, šiuo metu neįmanoma atsisiųsti MP3 formato tiesiogiai. {{onlineVideoPlatform}} jo nepalaiko, o reikalinga internetinė konversija yra nestabili. Naudokite mūsų <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}}, skirtą Windows</a></b>, kuri gali konvertuoti vaizdo failus į MP3. Arba iš sąrašo pasirinkite bet kurį kitą garso formatą (nurodoma piktograma&nbsp;<!--[img-sound-on]-->).","title":"Kaip atsisiųsti garso takelį (muziką) MP3 formatu?"},{"services":["gv","ok"],"article":"Įsitikinkite, kad <a data-webext-page=\\"settings\\">nustatymuose</a> yra žymimasis laukelis priešais elementą <b>„Rodyti vaizdo įrašo momentinės nuotraukos mygtuką“</b>. Apatiniame dešiniajame grotuvo kampe, kairėje nuo piktogramos <b>Nustatymai</b>, piktograma <b>Padaryti ekrano kopiją</b>&nbsp;<!--[img-camera]--> turėtų pasirodyti, kurį spustelėjus dabartinis vaizdo įrašo kadras bus išsaugotas jūsų kompiuteryje jpeg formatu.","title":"Kaip padaryti ekrano kopiją?"},{"article":"Mygtuko stilių galite pasirinkti <a data-webext-page=\\"settings\\">nustatymuose</a>: <ul><li><b>modernus</b> (sąsaja rodoma ant pelės žymeklio)</li><li><b>klasikinė</b> (paspaudus atsiranda sąsaja)</li></ul>","title":"Kaip parodyti sąsają spustelėjus atsisiuntimo mygtuką, o ne užvedus pelės žymeklį ant jo?"},{"services":["gv","gvOk"],"article":"Naudodami QR kodus galite gauti tiesioginę nuorodą į vaizdo ar garso įrašą bet kuriame įrenginyje su kamera. Įsitikinkite, kad <a data-webext-page=\\"settings\\">{{extensionName}} nustatymuose</a> įgalintas elementas <b>„Rodyti QR kodus“</b>. Kai kuriose atsisiuntimo parinktyse bus piktograma „Gauti QR kodą“&nbsp;<!--[img-qr-code]-->, kurią spustelėję pamatysite QR kodą ir telefono ar planšetinio kompiuterio instrukcijas.","title":"Kodėl jums reikia QR kodų?"}],"social_media_sharing":{"screenshot_0":"ekrano kopija","screenshot_1":"ekrano nuotraukos","screenshot_2":"ekrano nuotraukos","mediafile_0":"laikmenos failą","mediafile_1":"medijos failai","mediafile_2":"medijos failai","help_extension_to_get_better":"Padėkite {{extensionName}} tobulėti!","button_rate":"Įvertink","button_cancel_rate":"Ne dabar","asking_for_review_by_screenshots":"Sėkmingai padarėte {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 /> Būtume dėkingi už apžvalgą ir <7>5 žvaigždutes</7> ;)<9 />Tai tikrai svarbu plėtrai.","asking_for_review_by_downloads":"Sėkmingai atsisiuntėte {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> Būtume dėkingi už apžvalgą ir <7>5 žvaigždutes</7> ;)<9 />Tai tikrai svarbu plėtrai.","button_cancel":"Ne dabar","button_ok":"Pasidalink su draugais","message":"<0>Naudodami naršyklės plėtinį atsisiuntėte {{already}} <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1> Kad {{extensionName}} būtų nemokamas, mums reikia jūsų pagalbos – papasakokite apie mus socialiniuose tinkluose arba pasiuntiniuose!</1>","already_moreThanOneMediafile":"jau","title":"Tik akimirka Prašome!"},"competitors":{"how_to_solve_this_problem":"Kaip galiu išspręsti šią problemą?","i_understand_risks":"Suprantu rizikas"},"conflict_extensions":"Aptiktas plėtinys <b>{{competitorsDetection}}</b>, skirtas atsisiųsti daugialypės terpės failus. Vienu metu paleidus kelis naršyklės plėtinius, naršyklė gali <b>užstrigti</b>.","data_consents":{"agree":"Sutinku, tęsk","disagree":"Aš atsisakau (pašalinti {{extensionName}})","button_fullstats":"Bendrinkite techninius ir naršymo veiklos duomenis","button_techstats":"Bendrinkite tik techninius duomenis","button_disablestats":"Nieko nesidalinkite","checkbox_technical_hint":"Anonimizuoti duomenys apie klaidas, grojamą turinį, naudotų modulių versijas, atliktų operacijų trukmę ir efektyvumą, vartotojo įrenginio konfigūraciją","checkbox_technical":"Sutinku su techninių duomenų saugojimu ir tvarkymu","checkbox_statistics_hint":"Atsisiuntimų statistika (turinio charakteristikos, pasirinkti formatai), duomenys apie sąveiką su sąsajos elementais, plėtinio ir jo atskirų modulių našumo metrika","checkbox_statistics":"Sutinku, kad būtų saugomi ir tvarkomi statistiniai duomenys","checkbox_settings":"Sutinku su <a data-webext-page=\\"data-consents-settings\\">privatumo nustatymais</a>","checkbox_eula":"Sutinku su <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">licencijos sutartimi</a>","description_technical":"<strong>techniniai duomenys</strong>: naršyklės šeima ir versija, medijos išgavimo būdas (skirtinga vaizdo įrašų paslaugai).","description_browsing":"<strong>naršymo veiklos duomenys</strong>: internetinių vaizdo įrašų grotuvų URL, diegimo ID;","description_request":"Mums reikia jūsų leidimo rinkti šiuos duomenis, kad galėtume prižiūrėti {{extensionName}}:","description":"Leidimo prašymas","title":"Duomenų rinkimo ir tvarkymo sutikimo forma"},"download_error":"Atsisiunčiant failą įvyko klaida. Norėdami grįžti į failų formatų, kuriuos galima atsisiųsti, sąrašą, spustelėkite mygtuką Atstatyti.","reset":"Nustatyti iš naujo","second":"sek","minute":"min","hour":"h","day":"d","direct_links_unavailable":"Tiesioginės nuorodos laikinai nepasiekiamos. Pabandykite <a data-webext-function=\\"reload\\">iš naujo įkelti puslapį</a> (F5 klavišas)","yandex_market_adviser_notification_description":"Pakeitimai įsigalios iš naujo įkėlus puslapį su „Yandex.Market Adviser“ valdikliu.","warning":"Įspėjimas!","show_yandex_market_adviser":"Rodyti Yandex.Market Adviser – geriausių pasiūlymų kainų palyginimo valdiklis","qr_code_error":"QR kodo paslauga šiuo metu nepasiekiama. Pabandykite dar kartą vėliau.","qr_code_description":"Tiesioginio atsisiuntimo nuorodą į savo išmanųjį telefoną ar planšetinį kompiuterį lengva nusiųsti – tiesiog paleiskite QR kodo skaitytuvą ir užveskite pelės žymeklį virš paveikslėlio.","qr_code_title":"QR kodas mobiliajam įrenginiui","help":"Pagalba","drop_us_a_line":"Neradote atsakymo? Parašyk mums ;)","take_screenshot_tooltip":"Padaryti ekrano nuotrauką","cancel_download":"Atšaukti atsisiuntimą/konvertavimą","active_download_warning_on_leave":"Ar tikrai norite uždaryti?","active_download_warning_notification_description":"Išėjote iš puslapio su aktyviu atsisiuntimu, jis bus tęsiamas fone.","active_download_warning_notification_message":"Viskas kontroliuojama!","copy_link_to_clipboard_notification_message":"Nuoroda nukopijuota į mainų sritį","copy_link_to_clipboard_tooltip":"Nukopijuoti nuorodą į mainų sritį","qr_code_tooltip":"Gaukite QR kodą","download_using_desktop_client_tooltip":"Atsisiųskite naudodami {{desktopClientName}}","download_using_desktop_client":"Atsisiųskite reikiamą formatą naudodami {{desktopClientName}}","download_via_web_portal_tooltip":"Atsisiųskite per {{webPortalHostname}}","download_via_web_portal":"Atsisiųskite reikiamą formatą per {{webPortalHostname}}","conversion_time":"konversija ~{{conversionTime}}","conversion_required":"reikalingas konvertavimas","more_formats":"Daugiau formatų","all_formats_for_download":"Visi formatai atsisiųsti","formats_for_download":"Formatai atsisiųsti","continue":"Tęsti","cancel":"Atšaukti","do_not_show_on_load":"Nerodyti pakrovus","confirm_conversion_message":"Konvertavimas aktyviai naudoja aparatūros išteklius, todėl gali laikinai sumažėti naršyklės greitis, įskaitant kituose skirtukuose.","confirm_conversion_title":"Pasirinktas failo formatas reikalauja konvertavimo!","settings":{"privacy":"Atidarykite {{extensionName}} privatumo nustatymus","display_qr_codes":"Rodyti QR kodus","app_button_style_classic":"Klasikinė (sąsaja pasirodo spustelėjus)","app_button_style_modern":"Modernus (sąsaja rodoma ant pelės žymeklio)","title_app_button_style":"Mygtukų stilius","warn_before_converting":"Įspėkite prieš konvertuodami","show_snapshot_button":"Rodyti vaizdo įrašo momentinės nuotraukos mygtuką","show_webm":"Rodyti vaizdo įrašą WebM formatu","show_formats_required_online_conversion":"Rodyti formatus, kurių reikia konvertuoti internetu","show_formats_available_via_desktop_client":"Rodyti formatus, pasiekiamus naudojant {{desktopClientName}}","title":"Nustatymai"},"return_to_the_previous_screen":"Atgal","premiere_tooltip":"Dar nėra ką parsisiųsti :)","video":"Vaizdo įrašas","audio":"Garsas","music":"Mūzika","selectFormat":"Pasirinkite jus dominantį formatą","premiere":"Premjera","protected_tooltip":"Negalite atsisiųsti šio vaizdo įrašo, jis saugomas autorių teisių.","protected":"Apsaugotas","live_stream_tooltip":"Dar negalite atsisiųsti tiesioginių srautų, bet mes ties tuo dirbame :)","live_stream":"Tiesiogiai","download":"Parsisiųsti","auto_detect":"Automatiškai aptikti","changeLanguage":"pakeisti","selectLanguage":"Pasirinkite kalbą","languageName":"Lietuvių","language":"Kalba"}');
;// CONCATENATED MODULE: ./src/i18n/my/translation.json
const my_translation_namespaceObject = JSON.parse('{"data_consents":{"agree":"သဘောတူတယ်၊ ဆက်လုပ်ပါ","button_fullstats":"နည်းပညာပိုင်းဆိုင်ရာနှင့် ရှာဖွေမှုလုပ်ဆောင်ချက်ဒေတာကို မျှဝေပါ","button_techstats":"နည်းပညာဆိုင်ရာ အချက်အလက်များကိုသာ မျှဝေပါ","button_disablestats":"ဘာမှ မမျှဝေပါနဲ့","checkbox_technical":"နည်းပညာဒေတာ သိမ်းဆည်းခြင်းနှင့် လုပ်ဆောင်ခြင်းတို့ကို သဘောတူပါသည်","checkbox_statistics":"ကိန်းဂဏန်းအချက်အလက် သိမ်းဆည်းခြင်းနှင့် စီမံဆောင်ရွက်ခြင်းတို့ကို သဘောတူပါသည်","checkbox_settings":"<a data-webext-page=\\"data-consents-settings\\">ကိုယ်ရေးကိုယ်တာဆက်တင်များ</a> ကို ကျွန်ုပ်သဘောတူပါသည်","description_request":"{{extensionName}} ကို ထိန်းသိမ်းထားရန် အောက်ပါအချက်အလက်များကို စုဆောင်းရန် သင့်ခွင့်ပြုချက် လိုအပ်ပါသည်:","description":"ခွင့်ပြုချက်တောင်းခံခြင်း","disagree":"ငြင်းဆိုပါသည် ({{extensionName}} ကို ဖယ်ရှားရန်)","checkbox_technical_hint":"အမှားအယွင်းများရှိ အမည်ဝှက်ထားသော ဒေတာ၊ ဖွင့်ထားသော အကြောင်းအရာ၊ အသုံးပြုထားသော မော်ဂျူးများ၏ ဗားရှင်းများ၊ လုပ်ဆောင်ခဲ့သည့် လုပ်ဆောင်ချက်များ၏ ကြာချိန်နှင့် ထိရောက်မှု၊ အသုံးပြုသူ စက်ပစ္စည်းဖွဲ့စည်းပုံ","checkbox_statistics_hint":"ဒေါင်းလုဒ်များဆိုင်ရာ စာရင်းအင်းများ (အကြောင်းအရာဝိသေသလက္ခဏာများ၊ ရွေးချယ်ထားသော ဖော်မတ်များ)၊ အင်တာဖေ့စ်ဒြပ်စင်များနှင့် အပြန်အလှန်တုံ့ပြန်မှုဆိုင်ရာ ဒေတာ၊ တိုးချဲ့မှု၏စွမ်းဆောင်ရည်နှင့် ၎င်း၏တစ်ဦးချင်းစီ modules ဆိုင်ရာ မက်ထရစ်များ","checkbox_eula":"<a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">လိုင်စင်သဘောတူညီချက်</a> ကို သဘောတူပါသည်","description_technical":"<strong>နည်းပညာဆိုင်ရာဒေတာ</strong>- ဘရောက်ဆာမိသားစုနှင့် ဗားရှင်း၊ မီဒီယာထုတ်ယူမှုနည်းလမ်း (ဗီဒီယိုဝန်ဆောင်မှုအတွက် သီးသန့်)။","description_browsing":"<strong>အသုံးပြုမှုဒေတာ</strong>- အွန်လိုင်းဗီဒီယိုဖွင့်စက်များ၏ URL များ၊ တပ်ဆင်မှု ID များ၊","title":"ဒေတာစုဆောင်းခြင်းနှင့် လုပ်ဆောင်ခြင်းဆိုင်ရာ သဘောတူညီချက်ပုံစံ"},"reset":"ပြန်လည်သတ်မှတ်ပါ","social_media_sharing":{"button_ok":"သူငယ်ချင်းများနှင့်မျှဝေပါ","already_moreThanOneMediafile":"ပြီးပြီ","screenshot":"ဖန်သားပြင်ဓာတ်ပုံများ","mediafile":"မီဒီယာဖိုင်များ","help_extension_to_get_better":"ပိုကောင်းလာစေရန် {{extensionName}} ကိုကူညီပါ။","button_rate":"နှုန်းထား","button_cancel_rate":"ယခုမဟုတ်ပါ","asking_for_review_by_screenshots":"သင်သည် {{screenshotsCount}} $t(social_media_sharing.screenshot) ကို အောင်မြင်စွာ ပြုလုပ်နိုင်ခဲ့ပါသည်။<5 /> သုံးသပ်ချက်နှင့် <7>ကြယ် 5 ပွင့်</7> အတွက် ကျေးဇူးတင်ရှိပါသည် ;)<9 />၎င်းသည် ဖွံ့ဖြိုးတိုးတက်မှုအတွက် အမှန်တကယ် အရေးကြီးပါသည်။ .","asking_for_review_by_downloads":"သင်သည် {{downloadsCount}} $t(social_media_sharing.mediafile) ကို အောင်မြင်စွာ ဒေါင်းလုဒ်ဆွဲပြီးပါပြီ။<5 /> သုံးသပ်ချက်နှင့် <7>ကြယ် 5 ပွင့်</7> ကို ကျေးဇူးတင်ပါသည် ;)<9 />၎င်းသည် ဖွံ့ဖြိုးတိုးတက်မှုအတွက် အမှန်တကယ် အရေးကြီးပါသည်။ .","button_cancel":"ယခုမဟုတ်ပါ","message":"<0>ကျွန်ုပ်တို့၏ဘရောက်ဆာ extension ဖြင့် သင် {{already}} ဒေါင်းလုဒ်လုပ်ထားသည် <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1> {{extensionName}} ကို အခမဲ့ထားရန် ကျွန်ုပ်တို့သည် သင့်အကူအညီကို လိုအပ်သည် - လူမှုကွန်ရက်များ သို့မဟုတ် မက်ဆေ့ချ်များတွင် ကျွန်ုပ်တို့အကြောင်း ပြောပြပါ။</1>","title":"ကျေးဇူးပြုပြီးခဏစောင့်ပါ!"},"warning":"သတိပေးချက်!","take_screenshot_tooltip":"ဖန်သားပြင်ဓာတ်ပုံရိုက်ပါ","cancel_download":"ဒေါင်းလုဒ်/ကူးပြောင်းခြင်းကို ပယ်ဖျက်ပါ","copy_link_to_clipboard_notification_message":"လင့်ခ်ကို ကလစ်ဘုတ်သို့ ကူးယူထားသည်","copy_link_to_clipboard_tooltip":"လင့်ခ်ကို ကလစ်ဘုတ်သို့ ကူးယူပါ","qr_code_tooltip":"QR ကုဒ်ကိုရယူပါ","conversion_required":"ပြောင်းလဲခြင်း လိုအပ်သည်","settings":{"privacy":"{{extensionName}} ၏ ကိုယ်ရေးကိုယ်တာဆက်တင်များကို ဖွင့်ပါ","display_qr_codes":"QR ကုဒ်များကိုပြသပါ","warn_before_converting":"မပြောင်းမီ သတိပေးပါ","show_snapshot_button":"ဗီဒီယို လျှပ်တစ်ပြက် ခလုတ်ကို ပြပါ","show_webm":"ဗီဒီယိုကို WebM ဖော်မတ်ဖြင့် ပြသပါ","show_formats_required_online_conversion":"လိုအပ်သော အွန်လိုင်းကူးပြောင်းမှုပုံစံများကို ပြပါ","app_button_style_classic":"ဂန္တဝင် (ကလစ်ပေါ်တွင် မျက်နှာပြင် ပေါ်လာသည်)","app_button_style_modern":"ခေတ်မီသည် (မောက်စ်ဖြင့် မျက်နှာပြင်ပေါ်တွင် ပေါ်လာသည်)","title_app_button_style":"ခလုတ်စတိုင်","show_formats_available_via_desktop_client":"{{desktopClientName}} မှတစ်ဆင့် ရရှိနိုင်သော ဖော်မတ်များကို ပြပါ","title":"ဆက်တင်များ"},"protected":"ကာကွယ်ထားသည်","download":"ဒေါင်းလုဒ်လုပ်ပါ","auto_detect":"အလိုအလျောက် ထောက်လှမ်းခြင်း","selectLanguage":"ဘာသာစကားတစ်ခုကို ရွေးပါ","conflict_extensions":"မာလ်တီမီဒီယာဖိုင်များကို ဒေါင်းလုဒ်လုပ်ရန်အတွက် တိုးချဲ့မှု <b>{{competitorsDetection}}</b> ကို တွေ့ရှိခဲ့သည်။ တစ်ချိန်တည်းတွင် ဘရောက်ဆာ extension အများအပြားကို လုပ်ဆောင်ခြင်းသည် သင့်ဘရောက်ဆာ <b>ပျက်စီးသွားသည်</b> ကို ဖြစ်စေနိုင်သည်။","download_error":"ဖိုင်ဒေါင်းလုဒ်လုပ်နေစဉ်တွင် အမှားအယွင်းတစ်ခု ဖြစ်ပေါ်ခဲ့သည်။ ဒေါင်းလုဒ်လုပ်နိုင်သော ဖိုင်ဖော်မတ်စာရင်းသို့ ပြန်သွားရန်၊ ပြန်လည်သတ်မှတ်ရန် ခလုတ်ကို နှိပ်ပါ။","second":"စက္ကန့်","minute":"မိ","hour":"ဇ","day":"ဃ","direct_links_unavailable":"တိုက်ရိုက်လင့်ခ်များကို ယာယီ မရနိုင်ပါ။ <a data-webext-function=\\"reload\\">စာမျက်နှာကို ပြန်လည်စတင်ရန် ကြိုးစားပါ</a> (F5 သော့)","yandex_market_adviser_notification_description":"Yandex.Market Adviser widget ဖြင့် စာမျက်နှာကို ပြန်လည်စတင်ပြီးနောက် အပြောင်းအလဲများသည် အကျိုးသက်ရောက်မည်ဖြစ်သည်။","show_yandex_market_adviser":"Yandex.Market Adviser ကို ပြပါ - အကောင်းဆုံး စျေးနှုန်းများ နှိုင်းယှဉ်မှု ဝစ်ဂျက်","qr_code_error":"QR-ကုဒ်ဝန်ဆောင်မှုသည် ယခုအချိန်တွင် မရနိုင်ပါ။ နောက်မှ ထပ်စမ်းကြည့်ပါ။","qr_code_description":"သင့်စမတ်ဖုန်း သို့မဟုတ် တက်ဘလက်သို့ တိုက်ရိုက်ဒေါင်းလုဒ်လင့်ခ်ကို ပေးပို့ရန် လွယ်ကူသည် - QR ကုဒ်စကင်နာကို ဖွင့်ပြီး အပေါ်မှ ပုံပေါ်တွင် ဖိထားလိုက်ပါ။","qr_code_title":"မိုဘိုင်းကိရိယာအတွက် QR ကုဒ်","help_articles":[{"article":"ဗီဒီယိုအောက်ရှိ <b>{{extensionName}}</b> ခလုတ်ကို နှိပ်ခြင်းဖြင့် မူရင်းဖော်မတ်ကို ဒေါင်းလုဒ်လုပ်နိုင်ပါသည်။ ထို့အပြင် drop-down list တွင်သင်အလိုရှိသော ပုံစံ ကိုရွေးချယ်နိုင်သည်။","title":"ဘယ်လိုဒေါင်းလုဒ်လုပ်ရမလဲ။"},{"article":"အကောင်းဆုံးအရည်အသွေးကို <b>FullHD (1080p)</b>၊ <b>2K (1440p)</b>၊ <b>4K (2160p)</b> နှင့် <b>8K (4320p)</b>။ ယေဘူယျအကြံပြုချက်မှာ သင့်မျက်နှာပြင် ရုပ်ထွက်ပိုမြင့်လေ ဗီဒီယိုအရည်အသွေး ပိုကောင်းလေ ဖြစ်သင့်သည်။ သို့သော်၊ သင်သည် အခြားအချက်များကိုလည်း ထည့်သွင်းစဉ်းစားရန် လိုအပ်သည်- ဒေါင်းလုဒ်အမြန်နှုန်း၊ နေရာလွတ်ပမာဏနှင့် ပြန်ဖွင့်နေစဉ်အတွင်း စက်စွမ်းဆောင်ရည်။","title":"ဘယ်ဗီဒီယို ဖော်မတ်ကို ရွေးရမလဲ။"},{"article":"ဘရောက်ဆာ/ကွန်ပြူတာ လုံးဝ အေးခဲမသွားသင့်ပါ။ ဒီလိုဖြစ်သွားရင် ဗီဒီယိုလင့်ခ်ကို ညွှန်ပြပြီး တုံ့ပြန်ချက်ဖောင်ကနေတစ်ဆင့် တိုင်ကြားပါ။ ကံမကောင်းစွာဖြင့်၊ အချို့သောဗီဒီယိုဖော်မတ်များကို {{onlineVideoPlatform}} မှ တိုက်ရိုက်ဒေါင်းလုဒ်လုပ်၍မရပါ။ ထို့ကြောင့်၊ ကျွန်ုပ်တို့သည် <b>{{extensionName}}</b> တွင် အလိုရှိသော ဖော်မတ်သို့ အွန်လိုင်းမှ ဗီဒီယိုငယ်များကို ပြောင်းရန် ဖြစ်နိုင်ချေကို ထည့်ထားပါသည်။ အချို့ကိစ္စများတွင် ဤလုပ်ငန်းစဉ်သည် ကွန်ပျူတာအရင်းအမြစ်များကို အလွန်တက်ကြွစွာ အသုံးပြုပါသည်။","title":"ဒေါင်းလုဒ်လုပ်နေချိန်မှာ ဘရောက်ဆာ/ကွန်ပြူတာ ဘာကြောင့် ရပ်တန့်သွားတာလဲ။"},{"article":"အချို့သော နည်းပညာဆိုင်ရာ ဂုဏ်သတ္တိများကြောင့် {{onlineVideoPlatform}} ၏ အချို့သော ဗီဒီယိုဖိုင်ဖော်မတ်များကို တိုက်ရိုက်ဒေါင်းလုဒ်လုပ်၍မရပါ။ ထို့ကြောင့်၊ <b>{{extensionName}}</b> တွင် အွန်လိုင်းတိုတောင်းသော ဗီဒီယိုများကို အလိုရှိသော ဖော်မတ်သို့ ပြောင်းရန် နောက်ထပ်အင်္ဂါရပ်တစ်ခု ပါရှိသည်။ ကြီးမားသော ဗီဒီယိုများ (ရှည်လျားပြီး/သို့မဟုတ် အရည်အသွေးမြင့်) သည် တစ်ခါတစ်ရံတွင် သင့်ဘရောက်ဆာ/ကွန်ပျူတာကို အေးခဲသွားစေနိုင်သည့် အွန်လိုင်းပြောင်းလဲခြင်းအတွက် အရင်းအမြစ်များစွာ လိုအပ်ပါသည်။ ထို့ကြောင့်၊ ဤဗီဒီယိုများကို <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} for Windows</a></b> မှတဆင့် အပ်လုဒ်လုပ်ရန် အကြံပြုအပ်ပါသည်။","title":"အဘယ်ကြောင့် ကျွန်ုပ်အလိုရှိသော ဖော်မတ်ဖြင့် ဗီဒီယိုကို တိုက်ရိုက်ဒေါင်းလုဒ် မလုပ်နိုင်သနည်း။"},{"article":"တိုက်ရိုက်ဒေါင်းလုဒ်လင့်ခ်သည် ပြောင်းလဲခြင်းမလိုအပ်သော ဖော်မတ်များအတွက်သာ ရရှိနိုင်ပါသည်။ ထိုသို့ပြုလုပ်ရန်၊ သင့်လျော်သောဒေါင်းလုဒ်ရွေးချယ်မှုပါရှိသည့် စာကြောင်းတစ်ခုရှိ အိုင်ကွန်&nbsp;<!--[img-copy]--> ကိုနှိပ်ပါ၊ ထို့နောက် လိုအပ်သည့်နေရာတွင် စာသားအဖြစ် ကူးထည့်ပါ။","title":"ဗီဒီယို/အသံဒေါင်းလုဒ်လင့်ခ်ကို ဘယ်လိုရနိုင်မလဲ။"},{"article":"အိုင်ကွန်ဖြင့် ခွဲခြားသတ်မှတ်နိုင်သည့် သက်ဆိုင်ရာ ဒေါင်းလုဒ်ရွေးချယ်မှုကို ရွေးချယ်ရန် လုံလောက်ပြီ&nbsp;<!--[img-fps-60]-->။ သို့သော်၊ ထိုသို့သောရွေးချယ်မှုများသည် အမြဲတမ်းမရနိုင်ပါ။ ပထမဦးစွာ၊ မူရင်းဗီဒီယိုတွင် အနည်းဆုံး 60 FPS ရှိရပါမည်။ ထို့အပြင်၊ ၎င်းကို 60 FPS နှုန်းဖြင့် {{onlineVideoPlatform}} ပလေယာတွင် ကြည့်ရှုနိုင်ရပါမည်။","title":"60 fps ဗီဒီယိုကို ဘယ်လိုဒေါင်းလုဒ်လုပ်မလဲ။"},{"article":"ကံမကောင်းစွာဖြင့်၊ လောလောဆယ်တွင် MP3 ဖော်မတ်ကို တိုက်ရိုက်ဒေါင်းလုဒ်လုပ်ရန် မဖြစ်နိုင်ပါ။ {{onlineVideoPlatform}} သည် ၎င်းကို မပံ့ပိုးပါ၊ လိုအပ်သော အွန်လိုင်းပြောင်းလဲခြင်းမှာ မတည်ငြိမ်ပါ။ ဗီဒီယိုဖိုင်များကို MP3 သို့ ပြောင်းပေးနိုင်သည့် ကျွန်ုပ်တို့၏ <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} for Windows</a></b> ကို အသုံးပြုပါ။ သို့မဟုတ် စာရင်းထဲမှ အခြားအသံဖော်မတ်ကို ရွေးပါ (အိုင်ကွန်မှပြထားသည့်<!--[img-sound-on]-->)။","title":"အသံဖိုင် (တေးဂီတ) ကို MP3 တွင် မည်သို့ဒေါင်းလုဒ်လုပ်မည်နည်း။"},{"services":["gv","ok"],"article":"<a data-webext-page=\\"settings\\">ဆက်တင်များ</a> တွင် <b>“ဗီဒီယိုမှ ဖန်သားပြင်ဓာတ်ပုံကို သိမ်းဆည်းရန် ပြကွက်ခလုတ်”</b> ကို အမှန်ခြစ်ထားကြောင်း သေချာပါစေ။ <b>“ဆက်တင်များ”</b> အိုင်ကွန်၏ ဘယ်ဘက်ရှိ ပလေယာ၏အောက်ညာဘက်ထောင့်တွင်၊ အိုင်ကွန်တစ်ခု&nbsp;<!--[img-camera]--> ပေါ်လာမည်ဖြစ်ပြီး လက်ရှိကို သိမ်းဆည်းမည့်အပေါ်ကို နှိပ်ပါ။ ဗီဒီယိုမှ သင့်ကွန်ပြူတာသို့ jpeg ဖော်မတ်ဖြင့်ဘောင်သွင်းပါ။","title":"ဖန်သားပြင်ဓာတ်ပုံရိုက်နည်း။"},{"article":"<a data-webext-page=\\"settings\\">settings</a> တွင် ခလုတ်ပုံစံကို သင်ရွေးချယ်နိုင်သည်- <ul><li><b>ခေတ်မီ</b> (မျက်နှာပြင်ကို မောက်စ်ပေါ်မှ ပေါ်နေပါသည်)</li><li><b>ဂန္ထဝင်</b> (ကလစ်ပေါ်တွင် မျက်နှာပြင်ပေါ်လာသည်)</li></ul>","title":"ဒေါင်းလုဒ်ခလုတ်ကို ကလစ်နှိပ်၍ ၎င်းကို အပေါ်မှ ပြေးမတက်ဘဲ မျက်နှာပြင်ကို မည်သို့ပြသရမည်နည်း။"},{"services":["gv","gvOk"],"article":"QR ကုဒ်များကို အသုံးပြု၍ ကင်မရာဖြင့် မည်သည့်စက်ပစ္စည်းတွင်မဆို ဗီဒီယို သို့မဟုတ် အသံထံသို့ တိုက်ရိုက်လင့်ခ်ကို သင်ရနိုင်သည်။ <b>\\"Display QR Codes\\"</b> ကို <a data-webext-page=\\"settings\\">{{extensionName}} ဆက်တင်များ</a> တွင် ဖွင့်ထားကြောင်း သေချာပါစေ။ အချို့သော ဒေါင်းလုဒ်ရွေးချယ်မှုများတွင် \\"Get QR Code\\" သင်္ကေတ<!--[img-qr-code]--> ကိုနှိပ်ခြင်းဖြင့် သင့်ဖုန်း သို့မဟုတ် တက်ဘလက်အတွက် QR ကုဒ်နှင့် ညွှန်ကြားချက်များကို တွေ့ရမည်ဖြစ်ပါသည်။","title":"ဘာကြောင့် QR ကုဒ်တွေ လိုအပ်တာလဲ။"}],"help":"ကူညီကြပါ","drop_us_a_line":"အဖြေမတွေ့ဘူးလား။ ကျွန်တော်တို့ကို လိုင်းချပေးပါ ;)","active_download_warning_notification_description":"အသက်ဝင်သော ဒေါင်းလုဒ်တစ်ခုဖြင့် စာမျက်နှာမှ သင်ထွက်ခွာသွားပါပြီ၊ ၎င်းသည် နောက်ခံတွင် ဆက်လက်ရှိနေမည်ဖြစ်သည်။","active_download_warning_notification_message":"အရာအားလုံးကို ထိန်းချုပ်ထားသည်။","download_using_desktop_client_tooltip":"{{desktopClientName}} ကို အသုံးပြု၍ ဒေါင်းလုဒ်လုပ်ပါ","download_using_desktop_client":"{{desktopClientName}} ဖြင့် လိုအပ်သော ဖော်မတ်ကို ဒေါင်းလုဒ်ဆွဲပါ","download_via_web_portal_tooltip":"{{webPortalHostname}} မှတစ်ဆင့် ဒေါင်းလုဒ်လုပ်ပါ","download_via_web_portal":"လိုအပ်သောပုံစံကို {{webPortalHostname}} မှတစ်ဆင့် ဒေါင်းလုဒ်လုပ်ပါ","conversion_time":"ကူးပြောင်းမှု ~{{conversionTime}}","more_formats":"နောက်ထပ်ပုံစံများ","all_formats_for_download":"ဒေါင်းလုဒ်လုပ်ရန် ဖော်မတ်အားလုံး","formats_for_download":"ဒေါင်းလုဒ်လုပ်ရန် ဖော်မတ်များ","continue":"ဆက်လက်","cancel":"မလုပ်တော့","do_not_show_on_load":"Load တွင်မပြပါနှင့်","confirm_conversion_message":"ပြောင်းလဲခြင်းသည် ဟာ့ဒ်ဝဲအရင်းအမြစ်များကို တက်ကြွစွာအသုံးပြုသည်၊ ၎င်းသည် အခြားတက်ဘ်များအပါအဝင် ဘရောက်ဆာ၏အမြန်နှုန်းကို ယာယီကျဆင်းစေနိုင်သည်။","confirm_conversion_title":"ရွေးချယ်ထားသော ဖိုင်ဖော်မတ်သည် ပြောင်းလဲခြင်း လိုအပ်သည်။","return_to_the_previous_screen":"ကျော","premiere_tooltip":"ဒေါင်းလုဒ်လုပ်ရန်ဘာမှမရှိသေးပါ :)","video":"ဗီဒီယို","audio":"အသံ","music":"ဂီတ","selectFormat":"သင့်လျော်သောပုံစံကိုရွေးချယ်ပါ။","premiere":"ပရီမီယာ","protected_tooltip":"သင်သည် ဤဗီဒီယိုကို ဒေါင်းလုဒ်လုပ်၍မရပါ၊ ၎င်းကို မူပိုင်ခွင့်ဖြင့် ကာကွယ်ထားသည်။","live_stream_tooltip":"Live Stream များကို သင် ဒေါင်းလုဒ် မလုပ်နိုင်သေးသော်လည်း ၎င်းကို ကျွန်ုပ်တို့ လုပ်ဆောင်နေပါသည် :)","live_stream":"တိုက်ရိုက်ထုတ်လွှင့်ခြင်း","changeLanguage":"ပြောင်းလဲမှု","languageName":"ဗမာ","language":"ဘာသာစကား","active_download_warning_on_leave":"မင်းတကယ်ပိတ်ချင်တာလား။","competitors":{"i_understand_risks":"အန္တရာယ်များကို နားလည်ပါ","how_to_solve_this_problem":"ဒီပြဿနာကို ဘယ်လိုဖြေရှင်းမလဲ။"}}');
;// CONCATENATED MODULE: ./src/i18n/nl/translation.json
const nl_translation_namespaceObject = JSON.parse('{"help_articles":[{"title":"Hoe kan ik hier downloaden?","article":"Je kunt het standaardformaat gebruiken door simpelweg op de <b>{{extensionName}}</b> knop onder de video te klikken. Of klik op het gewenste formaat in de lijst met beschikbare formaten om te downloaden."},{"title":"Welk videoformaat moet ik kiezen?","article":"De beste kwaliteitsformaten zijn <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> и <b>8K (4320p)</b>. De algemene aanbeveling is dat hoe hoger de resolutie van je scherm is, hoe beter de videokwaliteit zou moeten zijn. Je moet echter ook rekening houden met andere factoren: downloadsnelheid, hoeveelheid vrije ruimte en de prestaties van je apparaat tijdens het afspelen."},{"title":"Waarom bevriest de browser/computer tijdens het laden?","article":"De browser/computer mag niet volledig bevriezen! Als dit gebeurt, meld dit dan via het feedbackformulier met een link naar de video. Helaas kunnen video\'s in sommige formaten niet rechtstreeks worden gedownload van {{onlineVideoPlatform}}. Daarom hebben we aan <b>{{extensionName}}</b> de mogelijkheid toegevoegd om kleine video\'s online te converteren naar het gewenste formaat. In sommige gevallen gebruikt dit proces te veel computerbronnen."},{"title":"Waarom kan ik de video niet direct in het juiste formaat downloaden?","article":"Vanwege de technische aspecten van {{onlineVideoPlatform}} kunnen video\'s in sommige formaten niet rechtstreeks worden gedownload. Daarom voegt <b>{{extensionName}}</b> de mogelijkheid toe om kleine video\'s online te converteren naar het gewenste formaat. Grote video\'s (lang en/of hoge kwaliteit) vereisen te veel bronnen voor online conversie, waardoor de browser/computer soms bevriest. Daarom wordt aangeraden ze te downloaden via <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} voor Windows</a></b>."},{"title":"Hoe krijg ik een link naar een video/audio?","article":"Een directe link naar het bestand is alleen beschikbaar voor formaten die geen conversie vereisen. Klik hiervoor op het pictogram&nbsp;<!--[img-copy]--> in de lijn met de juiste downloadoptie. En plak het dan als tekst waar je het nodig hebt."},{"title":"Hoe kan ik video met 60 FPS downloaden?","article":"Het is voldoende om de juiste downloadoptie te selecteren - je kunt deze herkennen aan het pictogram&nbsp;<!--[img-fps-60]-->. Deze opties zijn echter niet altijd beschikbaar. Ten eerste moet de bronvideo zelf een beeldsnelheid van minstens 60 hebben. En het moet bekeken kunnen worden in de {{onlineVideoPlatform}} speler met 60 FPS."},{"title":"Hoe download ik een audiotrack (muziek) naar MP3?","article":"Helaas kun je op dit moment niet direct downloaden in MP3-formaat - {{onlineVideoPlatform}} ondersteunt dit niet en de benodigde online conversie is instabiel. Gebruik onze <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} voor Windows</a></b> die ondersteuning biedt voor het converteren van video\'s naar MP3-formaat. Of selecteer een van de alternatieve audioformaten uit de lijst (aangegeven door het pictogram&nbsp;<!--[img-sound-on]-->)."},{"services":["gv","ok"],"title":"Hoe sla ik een frame van een video op?","article":"Zorg ervoor dat <b>\\"Knop weergeven om schermopname van video op te slaan\\"</b> is aangevinkt in <a data-webext-page=\\"settings\\">de instellingen</a>. Er moet een pictogram&nbsp;<!--[img-camera]--> verschijnen in de rechterbenedenhoek van de speler, links van het pictogram <b>\\"Instellingen\\"</b>, als je erop klikt wordt het huidige frame van de video opgeslagen op je computer in jpeg-formaat."},{"title":"Hoe kan ik de interface weergeven als ik op de downloadknop klik in plaats van erover te zweven?","article":"In <a data-webext-page=\\"settings\\"> de instellingen</a> kun je het uiterlijk van de knop kiezen: <ul><li><b>moderne</b> (de interface wordt weergegeven als je er met de muis overheen gaat)</li><li><b>klassieke</b> (de interface wordt weergegeven als je erop klikt)</li></ul>"},{"article":"Met QR-codes kun je een directe link krijgen naar video of audio op elk apparaat met een camera. Zorg ervoor dat <b>\\"QR-codes weergeven\\"</b> is ingeschakeld in de <a data-webext-page=\\"settings\\">instellingen van {{extensionName}}</a>. Sommige downloadopties hebben een pictogram&nbsp;<!--[img-qr-code]--> dat, als je erop klikt, de QR-code en instructies voor je telefoon of tablet toont.","title":"Waarom zijn QR codes nodig?","services":["gv","gvOk"]}],"social_media_sharing":{"title":"Een ogenblik, alstublieft!","mediafile":"mediabestand","mediafile_plural":"mediabestanden","screenshot":"schermopname","screenshot_plural":"schermopnamen","asking_for_review_by_screenshots":"Je hebt met succes {{screenshotsCount}} $t(social_media_sharing.screenshot) gemaakt.<5 />We waarderen de beoordeling en <7>5 sterren</7> ;)<9 />Het is echt belangrijk voor de ontwikkeling.","button_cancel_rate":"Niet meteen","button_rate":"Evalueer","help_extension_to_get_better":"Help {{extensionName}} om een nog beter te worden!","already_moreThanOneMediafile":"al","message":"<0>Met onze browserextensie heb je downloaden {{already}} <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1>Om {{extensionName}} gratis te houden, hebben we je hulp nodig - vertel het door via sociale media of messengers! </1>","button_ok":"Delen met vrienden","button_cancel":"Ik vind het moeilijk om dit nu te doen","asking_for_review_by_downloads":"Je hebt succesvol gedownload {{downloadsCount}} $t(social_media_sharing.mediafile).<5 />We waarderen de beoordeling en <7>5 sterren</7> ;)<9 />Het is echt belangrijk voor de ontwikkeling."},"data_consents":{"description":"Verzoek om toestemming","checkbox_eula":"Ik accepteer de <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">licentieovereenkomst</a>","disagree":"Ik weiger (verwijder {{extensionName}})","title":"Toestemming voor gegevensverzameling en -verwerking","checkbox_settings":"Ik ga akkoord met <a data-webext-page=\\"data-consents-settings\\">privacyinstellingen</a>","checkbox_statistics":"Ik geef toestemming voor het opslaan en verwerken van statistische gegevens","checkbox_technical":"Ik geef toestemming voor het opslaan en verwerken van technische gegevens","checkbox_technical_hint":"Geanonimiseerde gegevens over fouten, afgespeelde inhoud, gebruikte versies van modules, duur en succes van uitgevoerde bewerkingen, configuratie van het apparaat van de gebruiker","agree":"Ik ga akkoord, om door te gaan","checkbox_statistics_hint":"Downloadstatistieken (inhoudskenmerken, geselecteerde formaten), gegevens over interactie met interface-elementen, prestatiecijfers van de extensie en de afzonderlijke modules","description_request":"We hebben je toestemming nodig om de volgende gegevens te verzamelen om {{extensionName}} te onderhouden:","description_browsing":"<strong>browseractiviteitgegevens</strong>: URL\'s van online videospelers, installatie-ID\'s;","description_technical":"<strong>technische gegevens</strong>: browserfamilie en -versie, methode voor media-extractie (specifiek voor een videodienst).","button_disablestats":"Niets delen","button_techstats":"Technische gegevens delen","button_fullstats":"Technische en browsinggegevens delen"},"language":"Taal","download_via_web_portal_tooltip":"Download via {{webPortalHostname}}","download_using_desktop_client":"Download in het gewenste formaat via {{desktopClientName}}","qr_code_tooltip":"QR-code ophalen","direct_links_unavailable":"Directe links zijn tijdelijk niet beschikbaar. Probeer <a data-webext-function=\\"reload\\">pagina opnieuw laden</a> (F5-toets)","day":"d","languageName":"Nederlands","selectLanguage":"Selecteer een taal","changeLanguage":"wijzigen","auto_detect":"Autodetect","download":"Downloaden","live_stream":"Broadcast","live_stream_tooltip":"Broadcasts kunnen nog niet worden gedownload, maar we werken eraan :)","protected":"Beschermd","protected_tooltip":"Je kunt deze video niet downloaden, er zit auteursrecht op.","premiere":"Première","premiere_tooltip":"Nog niets om te downloaden :)","video":"Video","audio":"Audio","music":"Muziek","selectFormat":"Selecteer het juiste formaat","return_to_the_previous_screen":"Vorige","settings":{"title":"Instellingen","show_formats_available_via_desktop_client":"Formaten weergeven die beschikbaar zijn via {{desktopClientName}}","show_formats_required_online_conversion":"Formaten weergeven die online conversie vereisen","show_webm":"Video in WebM-formaat weergeven","show_snapshot_button":"Een knop om een schermopname van een video op te slaan weergeven","warn_before_converting":"Waarschuwen bij conversie","title_app_button_style":"Knop uiterlijk","app_button_style_modern":"Moderne (interface wordt weergegeven wanneer je er met de muis overheen gaat)","app_button_style_classic":"Klassiek (interface wordt weergegeven wanneer je erop klikt)","display_qr_codes":"QR-codes weergeven","privacy":"Open privacyinstellingen {{extensionName}}"},"confirm_conversion_message":"Conversie gebruikt actief computerbronnen, wat een tijdelijke vertraging van de browsersnelheid kan veroorzaken, ook in andere tabbladen.","confirm_conversion_title":"Het geselecteerde bestandsformaat moet geconverteerd worden!","do_not_show_on_load":"Niet weergeven bij laden","cancel":"Annulering","continue":"Verder","formats_for_download":"Downloadopties","all_formats_for_download":"Alle beschikbare formaten","more_formats":"Meer formaten","conversion_required":"conversie nodig","conversion_time":"conversie ~{{conversionTime}}","download_via_web_portal":"Download in het gewenste formaat via {{webPortalHostname}}","download_using_desktop_client_tooltip":"Download via {{desktopClientName}}","copy_link_to_clipboard_tooltip":"Link kopiëren","copy_link_to_clipboard_notification_message":"Link is aan klembord gekopieerd","active_download_warning_notification_message":"Alles is onder controle!","active_download_warning_notification_description":"Je hebt de pagina verlaten met een actieve download, deze zal doorgaan op de achtergrond.","cancel_download":"Stoppen met downloaden/converteren","take_screenshot_tooltip":"Frame opslaan","drop_us_a_line":"Geen antwoord gevonden? Stuur een e-mail naar ons ;)","help":"Hulp","qr_code_title":"QR-code voor mobiel apparaat","qr_code_description":"Een directe downloadlink overbrengen naar je smartphone of tablet is nu eenvoudig - start de QR-codescanner en beweeg over de afbeelding hierboven.","qr_code_error":"De QR code service is momenteel niet beschikbaar. Probeer alstublieft nog eens later.","show_yandex_market_adviser":"Yandex.Advisor weergeven - prijsvergelijkingswidget voor voordelige aankopen","warning":"Let op!","yandex_market_adviser_notification_description":"De wijzigingen worden van kracht nadat de pagina met de Yandex.Advisor-widget opnieuw is geladen.","hour":"u","minute":"min","second":"sec","reset":"Opnieuw instellen","download_error":"Er is een fout opgetreden tijdens de laatste bestandsupload. Klik op de knop \\"Opnieuw instellen\\" om terug te keren naar de lijst met downloadformaten.","conflict_extensions":"De <b>{{competitorsDetection}}</b> extensie voor het uploaden van multimediabestanden is ontdekt. Gelijktijdige werking van meerdere browserextensies kan <b>storingen</b> in uw browser veroorzaken.","active_download_warning_on_leave":"Wil je echt sluiten?","competitors":{"how_to_solve_this_problem":"Hoe los ik dit probleem op?","i_understand_risks":"Ik begrijp de risico\'s"}}');
;// CONCATENATED MODULE: ./src/i18n/pl/translation.json
const pl_translation_namespaceObject = JSON.parse('{"conflict_extensions":"Wykryto rozszerzenie <b>{{competitorsDetection}}</b> do pobierania plików multimedialnych. Jednoczesne działanie wielu rozszerzeń przeglądarki może spowodować <b>błąd</b> w przeglądarce.","data_consents":{"agree":"Zgadzam się, Kontynuuj","disagree":"Odmawiam (Usuń {{extensionName}})","checkbox_technical_hint":"Bezosobowe dane o błędach, odtwarzanej zawartości, wersjach używanych modułów, czasie trwania i powodzeniu wykonywanych operacji, konfiguracji urządzenia użytkownika","checkbox_technical":"Udzielam zezwolenia na przechowywanie i przetwarzanie danych technicznych","checkbox_statistics_hint":"Statystyki pobierania (charakterystyka treści, wybrane formaty), dane dotyczące interakcji z elementami interfejsu, wskaźniki kondycji rozszerzenia i jego poszczególnych modułów","checkbox_statistics":"Udzielam zezwolenia na przechowywanie i przetwarzanie danych statystycznych","checkbox_settings":"Zgadzam się z <a data-webext-page=\\"data-consents-settings\\">ustawieniami prywatności</a>","checkbox_eula":"Akceptuję <a href=\\"{{eulaUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">umowe licencyjną</a>","description":"Prośba o zezwolenie","title":"Zgoda na gromadzenie i przetwarzanie danych","description_request":"Potrzebujemy Twojej zgody na zbieranie następujących danych w celu utrzymania {{extensionName}}:","description_browsing":"<strong>dane o aktywności przeglądania</strong>: Adresy URL odtwarzaczy wideo online, identyfikatory instalacji;","description_technical":"<strong>dane techniczne</strong>: typ i wersja przeglądarki, metoda ekstrakcji multimediów (specyficzna dla usługi wideo).","button_disablestats":"Nie wysyłaj niczego","button_techstats":"Wysłać dane techniczne","button_fullstats":"Wysłać dane techniczne i o aktywności przeglądarki"},"download_error":"Wystąpił błąd podczas ostatniego pobrania pliku. Aby powrócić do listy formatów pobierania, naciśnij przycisk \\"Resetuj\\".","reset":"Zresetuj","second":"sek","minute":"min","hour":"g","day":"d","direct_links_unavailable":"Linki bezpośrednie są chwilowo niedostępne. Spróbuj <a data-webext-function=\\"reload\\">przeładować stronę</a> (klawisz F5)","social_media_sharing":{"help_extension_to_get_better":"Pomóż nam {{extensionName}} stać lepszym!","button_rate":"Ocenić","button_cancel_rate":"Nie teraz","asking_for_review_by_screenshots":"Wy pomyślnie zrobiliście {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 /> będziemy wdzięczni za opinię i <7>5 gwiazdek</7> ;)<9 />to naprawdę ważne dla rozwoju.","screenshot_0":"rzut ekranu","screenshot_1":"zrzuty ekranu","screenshot_2":"zrzutów ekranu","asking_for_review_by_downloads":"Wy pomyślnie pobraliście {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> będziemy wdzięczni za opinię i <7> 5 gwiazdek</7> ;)<9 />to naprawdę ważne dla rozwoju.","button_cancel":"Trudno mi to teraz zrobić","button_ok":"Podziel się z przyjaciółmi","message":"<0>Za pomocą naszego rozszerzenia przeglądarki pobrałeś {{already}} <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1>Aby {{extensionName}} pozostało bezpłatne, potrzebujemy Twojej pomocy — opowiedz o nas w mediach społecznościowych lub komunikatorach!</1>","already_moreThanOneMediafile":"już","mediafile_0":"plik multimedialny","mediafile_1":"pliki multimedialne","mediafile_2":"plików multimedialnych","title":"Chwila uwagi!"},"yandex_market_adviser_notification_description":"Zmiany zaczną obowiązywać po ponownym załadowaniu strony za pomocą widżetu Yandex.Doradca.","warning":"Uwaga!","show_yandex_market_adviser":"Wyświetlać Yandex.Doradca — widget porównywania cen dla korzystnych zakupów","qr_code_error":"Usługa kodów QR jest teraz niedostępna. Spróbuj później.","qr_code_description":"Przekazanie bezpośredniego linku do pobrania na smartfon lub tablet jest teraz proste — Uruchom skaner kodów QR i wskaż powyższy obraz.","qr_code_title":"Kod QR dla urządzenia mobilnego","help_articles":[{"article":"Możesz użyć domyślnego formatu, klikając przycisk <b>{{extensionName}}</b> pod filmem. Lub kliknij żądany format na liście dostępnych do pobrania.","title":"Jak tutaj pobrać?"},{"article":"Najlepszą jakość mają formaty <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> i <b>8K (4320p)</b>. Ogólne zalecenie jest takie, że im większa rozdzielczość ekranu, tym lepsza powinna być jakość wideo. Należy jednak wziąć pod uwagę inne czynniki: szybkość pobierania, ilość wolnego miejsca, a także wydajność urządzenia podczas odtwarzania.","title":"Jaki format wideo wybrać?"},{"article":"Przeglądarka/komputer nie powinien całkowicie się zawiesić! Jeśli tak się stanie, zgłoś to za pośrednictwem formularza opinii, podając link do filmu. Niestety filmów w niektórych formatach nie można pobrać bezpośrednio z {{onlineVideoPlatform}}. Dlatego dodaliśmy do <b>{{extensionName}}</b> możliwość konwersji małych filmów online do żądanego formatu. W niektórych przypadkach proces ten zbyt aktywnie wykorzystuje zasoby komputera.","title":"Dlaczego przeglądarka/komputer zawiesza się podczas pobierania?"},{"article":"Ze względu na cechy techniczne {{onlineVideoPlatform}}, filmów w niektórych formatach nie można pobrać bezpośrednio. Dlatego w <b>{{extensionName}}</b> dodano możliwość konwersji małych filmów online do żądanego formatu. Duże filmy (długie i/lub wysokiej jakości) wymagają zbyt wielu zasobów do konwersji online, co czasami powoduje zawieszenie przeglądarki/komputera. Dlatego zaleca się ich pobranie przez <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}} dla Windows</a></b>.","title":"Dlaczego nie mogę bezpośrednio pobrać wideo w odpowiednim formacie?"},{"article":"Bezpośredni link do pliku jest dostępny tylko dla formatów, które nie wymagają konwersji. Aby to zrobić, kliknij na ikonę&nbsp;<!--[img-copy]--> w linii z odpowiednią opcją pobierania. A następnie wklej go jako tekst tam, gdzie jest to konieczne.","title":"Jak uzyskać link do wideo/audio?"},{"article":"Wystarczy wybrać odpowiednią opcję pobierania — możesz ją określić za pomocą ikony&nbsp;<!--[img-fps-60]-->. Jednak takie opcje nie zawsze są dostępne. Przede wszystkim sam oryginalny film powinien mieć co najmniej 60 klatek na sekundę. I powinien być dostępny do oglądania w odtwarzaczu {{onlineVideoPlatform}} z 60 FPS.","title":"Jak pobierać filmy z 60 FPS?"},{"article":"Niestety w tej chwili nie można pobrać bezpośrednio w formacie MP3 — {{onlineVideoPlatform}} go nie obsługuje, a wymagana konwersja online jest niestabilna. Skorzystaj z naszego <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}} dla Windows</a></b>, który obsługuje konwersję wideo do formatu MP3. Lub wybierz z listy jeden z alternatywnych formatów audio (oznaczonych ikoną&nbsp;<!--[img-sound-on]-->).","title":"Jak pobrać ścieżkę audio (muzykę) w formacie MP3?"},{"services":["gv","ok"],"article":"Upewnij się, że w <a data-webext-page=\\"settings\\">ustawieniach</a> zaznaczona jest pozycja <b>\\"wyświetl przycisk zapisywania zrzutu ekranu z filmu\\"</b>. W prawym dolnym rogu odtwarzacza po lewej stronie ikony <b>\\"Ustawienia\\"</b> powinna pojawić się ikona&nbsp;<!--[img-camera]-->, po kliknięciu którego bieżąca ramka z filmu zostanie zapisana na komputerze w formacie jpeg.","title":"Jak zapisać rzut z filmu?"},{"article":"W <a data-webext-page=\\"settings\\">ustawieniach</a> możesz wybrać wygląd przycisku: <ul><li><b>nowoczesny</b> (Interfejs jest wyświetlany po najechaniu kursorem)</li><li><b>klasyczny</b> (Interfejs jest wyświetlany po kliknięciu)</li></ul>","title":"Jak wyświetlić interfejs po kliknięciu przycisku pobierania, a nie po najechaniu na niego?"},{"services":["gv","gvOk"],"article":"Dzięki kodom QR możesz uzyskać bezpośredni link do wideo lub audio na dowolnym urządzeniu z aparatem. Upewnij się, że w <a data-webext-page=\\"settings\\">Ustawieniach {{extensionName}}</a> włączona jest pozycja <b>\\"Wyświetl kody QR\\"</b>. Niektóre opcje pobierania będą miały ikonę&nbsp;<!--[img-qr-code]-->, po kliknięciu zobaczysz kod QR i instrukcje dotyczące telefonu lub tabletu.","title":"Dlaczego potrzebne są kody QR?"}],"help":"Pomoc","drop_us_a_line":"Nie znalazłeś odpowiedzi? Napisz do nas ;)","take_screenshot_tooltip":"Wykonać zrzut ekranu","cancel_download":"Przestać pobierać/konwertować","settings":{"app_button_style_classic":"Klasyczny (interfejs jest wyświetlany po kliknięciu)","app_button_style_modern":"Nowoczesny (interfejs wyświetlany po najechaniu kursorem)","title_app_button_style":"Wygląd przycisku","warn_before_converting":"Ostrzegać podczas konwersji","show_snapshot_button":"Wyświetlać przycisk zapisywania zrzutu ekranu z wideo","show_webm":"Wyświetlać filmy w formacie WebM","show_formats_required_online_conversion":"Wyświetlać formaty, wymagające konwersji online","show_formats_available_via_desktop_client":"Wyświetlać formaty, dostępne za pośrednictwem {{desktopClientName}}","title":"Konfiguracja","privacy":"Otworzyć ustawienia prywatności {{extensionName}}","display_qr_codes":"Wyświetlać kody QR"},"return_to_the_previous_screen":"Wstecz","premiere_tooltip":"Nie ma jeszcze nic do pobrania :)","video":"Wideo","audio":"Audio","music":"Muzyka","selectFormat":"Wybierz odpowiedni format","premiere":"Premiera","protected_tooltip":"Nie możesz pobrać tego filmu, jest chroniony prawem autorskim.","protected":"Chroniony","live_stream_tooltip":"Transmisji jeszcze nie można pobrać, ale już nad tym pracujemy :)","live_stream":"Transmisja na źywo","download":"Pobrać","auto_detect":"Automatyczne wykrywanie","changeLanguage":"zmienić","selectLanguage":"Wybierz język","languageName":"Polski","language":"Język","active_download_warning_notification_description":"Opuściłeś stronę z aktywnym pobieraniem, będzie ona kontynuowana w tle.","active_download_warning_notification_message":"Wszystko pod kontrolą!","copy_link_to_clipboard_notification_message":"Link skopiowany do schowka","copy_link_to_clipboard_tooltip":"Kopiuj link","qr_code_tooltip":"Uzyskać kod QR","download_using_desktop_client_tooltip":"Pobierz za pomocą {{desktopClientName}}","download_using_desktop_client":"Pobierz w żądanym formacie przez {{desktopClientName}}","download_via_web_portal_tooltip":"Pobierz przez {{webPortalHostname}}","download_via_web_portal":"Pobierz w żądanym formacie przez {{webPortalHostname}}","conversion_time":"konwersja ~{{conversionTime}}","conversion_required":"potrzebna konwersja","more_formats":"Więcej formatów","all_formats_for_download":"Wszystkie dostępne formaty","formats_for_download":"Opcje pobierania","continue":"Kontynuuj","cancel":"Anuluj","do_not_show_on_load":"Nie pokazywać podczas ładowania","confirm_conversion_message":"Konwersja aktywnie wykorzystuje zasoby komputera, co może spowodować tymczasowe zmniejszenie szybkości przeglądarki, w tym i w innych wkładkach.","confirm_conversion_title":"Wybrany format pliku wymaga konwersji!","competitors":{"i_understand_risks":"Rozumiem ryzyko","how_to_solve_this_problem":"Jak rozwiązać ten problem?"},"active_download_warning_on_leave":"Czy naprawdę chcesz się zamknąć?"}');
;// CONCATENATED MODULE: ./src/i18n/pt_BR/translation.json
const pt_BR_translation_namespaceObject = JSON.parse('{"language":"Idioma","languageName":"Português (Brasil)","selectLanguage":"Selecione seu idioma","auto_detect":"Detecção automática","download":"Baixar","live_stream":"Transmissão","live_stream_tooltip":"As transmissões ainda não podem ser baixadas, mas estamos trabalhando para isso :)","protected":"Protegido","protected_tooltip":"Você não pode baixar este vídeo, é protegido por direitos autorais.","premiere":"Estreia","premiere_tooltip":"Não há nada para baixar ainda :)","video":"Vídeo","audio":"Áudio","music":"Música","selectFormat":"Escolha o formato apropriado","return_to_the_previous_screen":"Voltar","settings":{"title":"Configurações","show_formats_available_via_desktop_client":"Mostrar formatos disponíveis via {{desktopClientName}}}","show_formats_required_online_conversion":"Mostrar formatos necessários para conversão on-line","show_webm":"Mostrar vídeo em formato WebM","show_snapshot_button":"Mostrar o botão para salvar a captura de tela do vídeo","warn_before_converting":"Adverter antes da conversão","title_app_button_style":"Estilo do botão","app_button_style_modern":"Moderno (a interface aparece em cima do mouse)","app_button_style_classic":"Clássico (a interface aparece em um clique)","display_qr_codes":"Exibir Códigos QR","privacy":"Abrir as configurações de privacidade do {{extensionName}}"},"confirm_conversion_title":"O formato de arquivo selecionado requer conversão!","confirm_conversion_message":"A conversão utiliza ativamente recursos de hardware, o que pode causar uma diminuição temporária na velocidade do navegador, inclusive em outras guias.","do_not_show_on_load":"Não mostrar na carga","continue":"Continuar","formats_for_download":"Formatos para download","all_formats_for_download":"Todos os formatos para download","more_formats":"Mais formatos","conversion_time":"conversão ~{{conversionTime}}","download_via_web_portal":"Baixar no formato necessário via {{webPortalHostname}}","download_via_web_portal_tooltip":"Baixar via {{webPortalHostname}}","download_using_desktop_client_tooltip":"Baixar usando {{desktopClientName}}","qr_code_tooltip":"Obter código QR","copy_link_to_clipboard_tooltip":"Copiar o Link","copy_link_to_clipboard_notification_message":"Link copiado para a área de transferência","active_download_warning_notification_message":"Está tudo sob controle!","cancel_download":"Parar download/converter","take_screenshot_tooltip":"Salvar quadro","drop_us_a_line":"Não encontrou uma resposta? Escreva-nós ;)","help":"Ajuda","help_articles":[{"title":"Como baixar aqui?","article":"Você pode usar o formato padrão simplesmente clicando no botão <b>{{extensionName}}</b> abaixo do vídeo. Ou clique no formato desejado na lista de disponíveis para download."},{"title":"Qual formato de vídeo escolher?","article":"A melhor qualidade é <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> e <b>8K (4320p)</b>. A recomendação geral é que quanto maior a resolução da tela, melhor deve ser a qualidade do vídeo. No entanto, você deve levar em consideração outros fatores: velocidade de download, quantidade de espaço livre, além do desempenho do dispositivo durante a reprodução."},{"title":"Por que o navegador/computador congela ao baixar?","article":"O navegador/computador não deve congelar completamente! Se isso aconteceu, denuncie através do formulário de feedback, indicando o link para o vídeo. Infelizmente, vídeos em alguns formatos não podem ser baixados diretamente de {{onlineVideoPlatform}}. É por isso que adicionamos a <b>{{extensionName}}</b> a capacidade de converter pequenos vídeos online para o formato desejado. Em alguns casos, esse processo usa muitos recursos do computador."},{"title":"Por que não consigo baixar o vídeo no formato certo diretamente?","article":"Alguns formatos de arquivo de vídeo não podem ser baixados diretamente devido a certas propriedades técnicas de {{onlineVideoPlatform}}. Portanto, o <b>{{extensionName}}</b> possui um recurso adicional para converter vídeos curtos online no formato desejado. Vídeos grandes (mais longos e/ou de alta qualidade) requerem muitos recursos para conversão online, que às vezes podem travar seu navegador/computador. Portanto, sugere-se enviar esses vídeos por meio do <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}} para Windows</a></b> ."},{"title":"Como obter um link para um vídeo/áudio?","article":"Um link direto para o arquivo está disponível apenas para formatos que não requerem conversão. Para fazer isso, clique no ícone &nbsp;<!--[img-copy]--> na linha com a opção de download apropriada. E cole-o como texto onde quiser."},{"title":"Como baixar vídeo de 60 FPS?","article":"Basta selecionar a opção de download apropriada - você pode identificá-la pelo ícone &nbsp;<!--[img-fps-60]-->. No entanto, essas opções nem sempre estão disponíveis. Em primeiro lugar, o próprio vídeo original deve ter uma taxa de quadros de pelo menos 60. E deve ser visualizado no player {{onlineVideoPlatform}} com 60 FPS."},{"title":"Como baixar a faixa de áudio (música) para MP3?","article":"Infelizmente, no momento não é possível fazer o download diretamente em formato MP3 — {{onlineVideoPlatform}} não o suporta, e a conversão on-line necessária é instável. Use nosso <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}} para Windows</a></b>, que suporta a conversão de vídeo para o formato MP3. Ou selecione um dos formatos alternativos de áudio da lista (indicado pelo ícone&nbsp;<!--[img-sound-on]-->)."},{"title":"Como salvar um quadro de um vídeo?","article":"Certifique-se que nas <a data-webext-page=\\"settings\\">configurações</a> está marcado <b>«Mostrar o botão para salvar uma captura de tela do vídeo»</b>. No canto inferior direito do jogador, à esquerda do ícone <b>«Configuraçoes»</b> deve aparecer o ícone&nbsp;<!--[img-camera]-->, clique em qual quadro de vídeo atual será salvo em seu computador no formato jpeg.","services":["gv","ok"]},{"title":"Como a interface pode ser exibida ao clicar no botão de download em vez de pairar sobre ela?","article":"Nas <a data-webext-page=\\"settings\\">Configurações</a> você pode escolher a aparência do botão: <ul><li><b>moderno</b> (a interface é exibida ao pairar)</li><li><b>clássiko</b> (a interface é exibida ao clicar)</li></ul>"},{"title":"Por que são os códigos QR?","services":["gv","gvOk"],"article":"Com os códigos QR, você pode obter um link direto para um vídeo ou áudio em qualquer dispositivo com câmera. Certifique-se de que <b>\\"Exibir códigos QR\\"</b> esteja ativado nas configurações de <a data-webext-page=\\"settings\\">{{extensionName}}</a>. Algumas opções de download terão um ícone &nbsp;<!--[img-qr-code]-->, ao clicar no qual você verá um código QR e instruções para seu telefone ou tablet."}],"qr_code_title":"Código QR para dispositivo móvel","qr_code_description":"Transferir um link direto de download para seu smartphone ou tablet agora é fácil - execute o scanner de código QR e passe o mouse sobre a imagem acima.","qr_code_error":"O serviço de código QR não está disponível no momento. Por favor, tente novamente mais tarde.","show_yandex_market_adviser":"Mostrar Yandex.Adviser - widget de comparação de preços para compras de barganha","warning":"Atenção!","yandex_market_adviser_notification_description":"As mudanças entrarão em vigor após o recarregamento da página do widget Yandex.Adviser.","social_media_sharing":{"title":"Só um momento, por favor!","mediafile":"arquivo de mídia","mediafile_plural":"arquivos de mídia","already_moreThanOneMediafile":"já","button_ok":"Compartilhar com amigos","button_cancel":"É difícil para mim fazer isso agora","screenshot":"screenshot","screenshot_plural":"screenshots","asking_for_review_by_screenshots":"Concluiu com sucesso {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 /> Obrigado pelo seu feedback e <7>5 estrelas</7> ;)<9 />Isso é muito importante para o nosso desenvolvimento.","button_cancel_rate":"Agora não","button_rate":"Avaliar","help_extension_to_get_better":"Ajude melhorar o {{extensionName}} !","message":"<0>Com a extensão de nosso navegador você baixou {{already}} <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1>Para manter {{extensionName}} gratuito, precisamos de sua ajuda - espalhe a notícia nas mídias sociais ou mensageiros!</1>","asking_for_review_by_downloads":"Você baixou {{downloadsCount}} $t(social_media_sharing.mediafile) com sucesso.<5 /> Obrigado por seu feedback e <7>5 estrelas</7> ;)<9 />Isso é muito importante para o nosso desenvolvimento."},"direct_links_unavailable":"Os links diretos estão temporariamente indisponíveis. Tente <a data-webext-function=\\"reload\\">recarregar a página</a> (tecla F5)","day":"d","hour":"h","minute":"min","second":"seg","reset":"Redefinir","data_consents":{"title":"Consentimento para coleta e processamento de dados","checkbox_eula":"Eu aceito o <a href=\\"{{eulaUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">Acordo de Licença</a>","checkbox_settings":"Eu aceito as <a data-webext-page=\\"data-consents-settings\\">configurações de privacidade</a>","checkbox_statistics":"Eu concordo com o armazenamento e processamento de dados estatísticos","checkbox_statistics_hint":"Estatísticas de download (características de conteúdo, formatos selecionados), dados sobre interação com elementos de interface, métricas de desempenho para a extensão e seus módulos individuais","checkbox_technical":"Eu concordo com o armazenamento e processamento de dados técnicos","disagree":"Recuso-me (remover {{extensionName}})","agree":"Aceito, continuar","description":"Solicitação de permissão","checkbox_technical_hint":"Dados anônimos sobre erros, conteúdo reproduzido, versões dos módulos utilizados, duração e sucesso das operações realizadas, configuração do dispositivo do usuário","description_request":"Precisamos de sua permissão para coletar os seguintes dados para manter {{extensionName}}:","description_browsing":"<strong>dados de atividade de navegação</strong>: URLs de players de vídeo on-line, IDs de instalação;","description_technical":"<strong>dados técnicos</strong>: família e versão do navegador, método de extração de mídia (específico para um serviço de vídeo).","button_disablestats":"Nada compartilhar","button_techstats":"Compartilhe dados técnicos","button_fullstats":"Compartilhar dados técnicos e de atividade de navegação"},"conflict_extensions":"Extensão detectada <b>{{competitorsDetection}}</b> para carregar arquivos de mídia. A execução de várias extensões de navegador ao mesmo tempo pode <b>travar</b> seu navegador.","cancel":"Cancelar","download_error":"Ocorreu um erro durante o último download do arquivo. Para retornar à lista de formatos de download, pressione o botão \\"Reset\\".","conversion_required":"necessária a conversão","download_using_desktop_client":"Baixe no formato necessário via {{desktopClientName}}","active_download_warning_notification_description":"Você saiu de uma página com um download ativo, ele continuará em segundo plano.","changeLanguage":"alterar","competitors":{"i_understand_risks":"Eu entendo os riscos","how_to_solve_this_problem":"Como resolver esse problema?"},"active_download_warning_on_leave":"Você realmente quer fechar?"}');
;// CONCATENATED MODULE: ./src/i18n/ro/translation.json
const ro_translation_namespaceObject = JSON.parse('{"settings":{"app_button_style_modern":"Modern (interfața apare la trecerea mouse-ului)","title":"Setări","show_formats_available_via_desktop_client":"Formate de afișare disponibile prin {{desktopClientName}}","show_formats_required_online_conversion":"Formate de afișare care necesită conversie online","show_webm":"Afișați video în format WebM","show_snapshot_button":"Afișați butonul pentru a salva o captură de ecran dintr-un video","warn_before_converting":"Avertizați la conversie","title_app_button_style":"Aspectul butonului","app_button_style_classic":"Clasic (interfața apare când faceți clic)","display_qr_codes":"Afișează codurile QR","privacy":"Deschideți setările de Confidențialitate {{extensionName}}"},"help_articles":[{"title":"Cum se descarcă aici?","article":"Puteți utiliza formatul implicit apăsând pe butonul <b>{{extensionName}}</b> sub video. Sau faceți clic pe formatul dorit din lista disponibilă pentru descărcare."},{"title":"Ce format video ar trebui să aleg?","article":"Cele mai bune formate de calitate sunt <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> și <b>8K (4320p)</b>. Recomandarea generală este că, cu cât rezoluția ecranului este mai mare, cu atât ar trebui să fie mai bună calitatea video. Cu toate acestea, ar trebui să luați în considerare și alți factori: viteza de descărcare, cantitatea de spațiu liber, precum și performanța dispozitivului la redare."},{"title":"De ce se blochează un browser/computer în timpul descărcării?","article":"Browserul/computerul nu trebuie să blochează complet! Dacă s-a întâmplat acest lucru, vă rugăm să îl raportați prin formularul de feedback, specificând linkul către video. Din păcate, video în unele formate nu pot fi descărcate de pe {{onlineVideoPlatform}} direct. Prin urmare, am adăugat la <b>{{extensionName}}</b> capacitatea de a converti video mici online în formatul dorit. În unele cazuri, acest proces folosește prea mult resursele computerului."},{"title":"De ce nu pot descărca direct video în formatul dorit?","article":"Datorită caracteristicilor tehnice {{onlineVideoPlatform}}, video în unele formate nu pot fi descărcate direct. Prin urmare, în <b>{{extensionName}}</b> s-a adăugat posibilitatea de a converti video mici online în formatul dorit. Video mari (de lungă durată și/sau de înaltă calitate) necesită prea multe resurse pentru conversia online, ceea ce duce uneori la blocarea browserului/computerului. Prin urmare, li se sugerează să fie descărcate prin <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}} pentru Windows</a></b>."},{"title":"Cum obțin un link video/audio?","article":"Linkul direct către fișier este disponibil numai pentru formatele care nu necesită conversie. Pentru a face acest lucru, apăsați pe pictograma&nbsp;<!--[img-copy]--> în rândul cu opțiunea de descărcare corespunzătoare. Și apoi lipiți-l sub formă de text acolo unde este necesar."},{"title":"Cum să descărcați un video cu 60 FPS?","article":"Este suficient să selectați opțiunea de descărcare corespunzătoare – o puteți determina prin pictograma&nbsp;<!--[img-fps-60]-->. Cu toate acestea, astfel de opțiuni nu sunt întotdeauna disponibile. În primul rând, video sursă în sine trebuie să aibă o rată de cadre de cel puțin 60. Și ar trebui să fie disponibil pentru vizualizare în player {{onlineVideoPlatform}} cu 60 FPS."},{"title":"Cum descarc o piesă audio (muzică) în MP3?","article":"Din păcate, momentan nu este posibil să descărcați direct în format MP3 — {{onlineVideoPlatform}} nu o acceptă, iar conversia online necesară este instabilă. Utilizați <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}} nostru pentru Windows</a></b>, care acceptă conversia video în format MP3. Sau selectați unul dintre formatele audio alternative din listă (indicat de pictograma&nbsp;<!--[img-sound-on]-->)."},{"title":"Cum salvez un cadru dintr-un video?","article":"Asigurați-vă că <b>„Afișați butonul de salvare a capturii de ecran din video”</b> este bifat în <a data-webext-page=\\"settings\\">setări</a>. În colțul din dreapta jos al playerului, în stânga pictogramei&nbsp;<!--[img-camera]--> <b>„Setări”</b> ar trebui să apară, apăsând pe care cadrul actual al video va fi salvat pe computerul dumneavoastră în format jpeg.","services":["gv","ok"]},{"title":"Cum afișez interfața apăsând pe butonul de descărcare și nu trecând peste ea?","article":"În <a data-webext-page=\\"settings\\">setări</a> puteți alege aspectul butonului: <ul><li><b>modern</b> (interfața apare la trecerea mouse-ului)</li><li><b>clasic</b> (interfața apare când faceți clic)</li></ul>"},{"title":"De ce am nevoie de coduri QR?","services":["gv","gvOk"],"article":"Cu codurile QR, puteți obține un link direct către video sau audio pe orice dispozitiv cu o cameră foto. Asigurați-vă că în <a data-webext-page=\\"settings\\">setări {{extensionName}}</a> opțiunea <b>„Afișați codurile QR”</b> este pornită. Unele opțiuni de descărcare vor avea o pictogramă&nbsp;<!--[img-qr-code]-->, apăsând pe care veți vedea un cod QR și instrucțiuni pentru telefon sau tabletă."}],"social_media_sharing":{"mediafile_0":"fișier media","mediafile_1":"fișiere media","mediafile_2":"fișiere media","button_ok":"Împărtășește cu prietenii","screenshot_0":"captură de ecran","screenshot_1":"capturi de ecran","screenshot_2":"capturi de ecran","title":"Doar o clipă, vă rog!","already_moreThanOneMediafile":"deja","message":"<0>Folosind extensia noastră de browser, ați descărcat {{already}} <3><0>{{downloadsCount}}</0> </3> $t(social_media_sharing.mediafile) :)</0><1> Pentru a {{extensionName}} a rămas gratuit, avem nevoie de ajutorul dvs. — spuneți-ne despre noi pe rețelele sociale sau mesageri!</1>","button_cancel":"Mi-e greu să o fac acum","asking_for_review_by_screenshots":"Ați făcut cu succes {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 /> Vom fi recunoscători pentru feedback și <7>5 stele</7> ;)<9 /> Acest lucru este foarte important pentru dezvoltare.","button_cancel_rate":"Nu acum","button_rate":"Evalua","help_extension_to_get_better":"Ajută-ne {{extensionName}} să devenim mai buni!","asking_for_review_by_downloads":"Ați descărcat cu succes {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> vom fi recunoscători pentru feedback și <7>5 stele</7> ;)<9 /> Acest lucru este foarte important pentru dezvoltare."},"day":"d","data_consents":{"agree":"Sunt de acord să continui","title":"Consimțământul pentru colectarea și prelucrarea datelor","description":"Cerere de permisiune","checkbox_eula":"Accept <a href=\\"{{eulaUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">Acord de Licență</a>","checkbox_settings":"Sunt de acord cu <a data-webext-page=\\"data-consents-settings\\">setări de Confidențialitate</a>","checkbox_statistics":"Acord permisiunea pentru stocarea și prelucrarea datelor statistice","checkbox_statistics_hint":"Descărcați statistici (caracteristici de conținut, formate selectate), date despre interacțiunea cu elementele interfeței, valori ale funcționalității extensiei și modulele sale individuale","checkbox_technical":"Acord permisiunea pentru stocarea și prelucrarea datelor tehnice","checkbox_technical_hint":"Date depersonalizate despre erori, conținut reproductibil, versiuni ale modulelor utilizate, durata și succesul operațiunilor efectuate, configurarea dispozitivului utilizatorului","disagree":"Eu refuz (eliminați {{extensionName}})","description_request":"Avem nevoie de permisiunea dvs. pentru a colecta următoarele date pentru a menține {{extensionName}}:","description_browsing":"<strong> date despre activitatea de navigare</strong>: URL-uri de playere video online, ID-uri de instalare;","description_technical":"<strong>date tehnice</strong>: familia și versiunea browserului, metoda de extragere a mediilor (specifică unui serviciu video).","button_disablestats":"Nu împărtășiți nimic","button_techstats":"Partajați date tehnice","button_fullstats":"Partajați datele tehnice și de activitate de navigare"},"language":"Limbă","languageName":"Română","selectLanguage":"Alegeți limba","changeLanguage":"schimbați","auto_detect":"Autodetecție","download":"Descărcați","live_stream":"Transmiterea","live_stream_tooltip":"Nu puteți descărca încă transmiterile, dar lucrăm deja la asta :)","protected":"Protejat","protected_tooltip":"Nu puteți descărca acest video, este protejat prin drepturi de autor.","premiere":"Premieră","premiere_tooltip":"Nu este nimic de descărcat încă :)","video":"Video","audio":"Audio","music":"Muzică","selectFormat":"Selectați formatul care vă interesează","return_to_the_previous_screen":"Înapoi","confirm_conversion_title":"Formatul de fișier selectat necesită conversie!","confirm_conversion_message":"Conversia utilizează în mod activ resursele computerului, ceea ce poate provoca o scădere temporară a vitezei browserului, inclusiv în alte file.","do_not_show_on_load":"Nu se afișează la încărcare","cancel":"Anulează","continue":"Continuă","formats_for_download":"Opțiuni de descărcare","all_formats_for_download":"Toate formatele pentru descărcare","more_formats":"Mai multe formate","conversion_required":"nevoie de conversie","conversion_time":"conversie ~{{conversionTime}}","download_via_web_portal":"Descărcați în formatul necesar prin {{webPortalHostname}}","download_via_web_portal_tooltip":"Descărcați prin {{webPortalHostname}}","download_using_desktop_client":"Descărcați în formatul necesar prin {{desktopClientName}}","download_using_desktop_client_tooltip":"Descărcați folosind {{desktopClientName}}","qr_code_tooltip":"Obțineți un cod QR","copy_link_to_clipboard_tooltip":"Copiați linkul","copy_link_to_clipboard_notification_message":"Link-ul a fost copiat în clipboard","active_download_warning_notification_message":"Totul este sub control!","active_download_warning_notification_description":"Ați părăsit pagina cu descărcarea activă, aceasta va continua în fundal.","cancel_download":"Opriți descărcarea/conversia","take_screenshot_tooltip":"Salvați cadrul","drop_us_a_line":"Nu ai găsit răspunsul? Scrie-ne ;)","help":"Ajutor","qr_code_title":"Cod QR pentru un dispozitiv mobil","qr_code_description":"Acum este ușor să trimiteți un link de descărcare directă către smartphone sau tabletă — lansați scanerul de cod QR și plasați cursorul peste imaginea de mai sus.","qr_code_error":"Serviciul de cod QR este momentan indisponibil. Vă rugăm să încercați din nou mai târziu.","show_yandex_market_adviser":"Afișează Yandex. Sfătuitor este un widget de comparație a prețurilor pentru achiziții profitabile","warning":"Atenție!","yandex_market_adviser_notification_description":"Modificările vor intra în vigoare după ce pagina cu widgetul Yandex este reîncărcată. Sfătuitor.","direct_links_unavailable":"Linkurile directe sunt temporar indisponibile. Încercați <a data-webext-function=\\"reload\\">pentru a reîncărca pagina</a> (tasta F5)","hour":"h","minute":"mine","second":"s","reset":"Resetare","download_error":"A apărut o eroare în timpul ultimei încărcări a fișierului. Pentru a reveni la lista formatelor de descărcare, apăsați pe butonul „Resetare”.","conflict_extensions":"A fost detectată o extensie <b>{{competitorsDetection}}</b> pentru a descărca fișiere multimedia. Funcționarea simultană a mai multor extensii de browser poate provoca <b>blocări</b> în browserul dvs.","competitors":{"i_understand_risks":"Înțeleg riscurile","how_to_solve_this_problem":"Cum să rezolvăm această problemă?"},"active_download_warning_on_leave":"Chiar vrei să închizi?"}');
;// CONCATENATED MODULE: ./src/i18n/ru/translation.json
const ru_translation_namespaceObject = JSON.parse('{"language":"Язык","languageName":"Русский","changeLanguage":"изменить","auto_detect":"Автоопределение","download":"Скачать","live_stream":"Трансляция","live_stream_tooltip":"Трансляции скачивать ещё нельзя, но мы уже работаем над этим :)","premiere":"Премьера","premiere_tooltip":"Пока что нечего скачивать :)","video":"Видео","audio":"Аудио","music":"Музыка","selectFormat":"Выберите интересующий вас формат","return_to_the_previous_screen":"Назад","settings":{"title":"Настройки","show_formats_available_via_desktop_client":"Отображать форматы, доступные через {{desktopClientName}}","show_formats_required_online_conversion":"Отображать форматы, требующие онлайн-конвертации","show_webm":"Отображать видео в формате WebM","show_snapshot_button":"Отображать кнопку сохранения скриншота из видео","warn_before_converting":"Предупреждать при конвертации","title_app_button_style":"Внешний вид кнопки","app_button_style_modern":"Современный (интерфейс выводится при наведении)","app_button_style_classic":"Классический (интерфейс выводится при клике)","display_qr_codes":"Отображать QR-коды","privacy":"Открыть настройки конфиденциальности {{extensionName}}"},"confirm_conversion_title":"Выбранный формат файла требует конвертации!","confirm_conversion_message":"Конвертация активно использует ресурсы компьютера, что может вызвать временное снижение скорости работы браузера, в том числе и в других вкладках.","do_not_show_on_load":"Не показывать при загрузке","cancel":"Отмена","continue":"Продолжить","formats_for_download":"Варианты загрузки","all_formats_for_download":"Все доступные форматы","more_formats":"Больше форматов","conversion_required":"нужна конвертация","conversion_time":"конвертация ~{{conversionTime}}","download_via_web_portal":"Скачать в нужном формате через {{webPortalHostname}}","download_via_web_portal_tooltip":"Скачать через {{webPortalHostname}}","download_using_desktop_client":"Скачать в нужном формате через {{desktopClientName}}","download_using_desktop_client_tooltip":"Cкачать c помощью {{desktopClientName}}","qr_code_tooltip":"Получить QR-код","copy_link_to_clipboard_tooltip":"Копировать ссылку","copy_link_to_clipboard_notification_message":"Ссылка скопирована в буфер обмена","active_download_warning_notification_message":"Всё под контролем!","active_download_warning_notification_description":"Вы ушли со страницы с активным скачиванием, оно продолжится в фоновом режиме.","active_download_warning_on_leave":"Вы действительно хотите закрыть вкладку?","cancel_download":"Прекратить скачивание/конвертацию","take_screenshot_tooltip":"Сохранить кадр","drop_us_a_line":"Не нашли ответа? Напишите нам ;)","help":"Помощь","help_articles":[{"title":"Как здесь качать?","article":"Вы можете использовать формат по умолчанию, просто нажав по кнопке <b>{{extensionName}}</b> под видео. Или кликните на нужный формат в списке доступных для скачивания."},{"title":"Какой формат видео выбрать?","article":"Наилучшее качество имеют форматы <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> и <b>8K (4320p)</b>. Общая рекомендация состоит в том, что чем больше разрешение вашего экрана, тем лучше должно быть качество видео. Однако вам следует учесть и другие факторы: скорость скачивания, количество свободного места, а также производительность устройства при проигрывании."},{"title":"Почему браузер/компьютер зависает при загрузке?","article":"Полностью зависать браузер/компьютер не должен! Если это произошло, просьба сообщить об этом через форму обратной связи, указав ссылку на видео. К сожалению, видео в некоторых форматах нельзя скачать с {{onlineVideoPlatform}} напрямую. Поэтому мы добавили в <b>{{extensionName}}</b> возможность онлайн-конвертации небольших видео в нужный формат. В отдельных случаях этот процесс слишком активно использует ресурсы компьютера."},{"title":"Почему я не могу скачать видео в нужном формате напрямую?","article":"В силу технических особенностей {{onlineVideoPlatform}}, видео в некоторых форматах нельзя скачать напрямую. Поэтому в <b>{{extensionName}}</b> добавлена возможность онлайн-конвертации небольших видео в нужный формат. Большие видео (продолжительные и/или высокого качества) требуют для онлайн-конвертации слишком много ресурсов, что порой приводит к зависанию браузера/компьютера. Поэтому их предлагается скачивать через <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} для Windows</a></b>."},{"title":"Как получить ссылку на видео/аудио?","article":"Прямая ссылка на файл доступна только для форматов, которые не требуют конвертации. Для этого нажмите на иконку&nbsp;<!--[img-copy]--> в строке с подходящим вариантом скачивания. А затем вставьте её в виде текста туда, где необходимо."},{"title":"Как скачать видео с 60 FPS?","article":"Достаточно выбрать соответствующий вариант скачивания — определить его можно по иконке&nbsp;<!--[img-fps-60]-->. Однако не всегда такие варианты имеются. Прежде всего, само исходное видео должно иметь частоту кадров не меньше, чем 60. И оно должно быть доступно к просмотру в плеере {{onlineVideoPlatform}} с 60 FPS."},{"title":"Как скачать аудиодорожку (музыку) в MP3?","article":"К сожалению, в данный момент нельзя скачать в формате MP3 напрямую — {{onlineVideoPlatform}} его не поддерживает, а необходимая онлайн-конвертация работает нестабильно. Воспользуйтесь нашим <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} для Windows</a></b>, который поддерживает конвертацию видео в формат MP3. Или выберите в списке один из альтернативных аудиоформатов (обозначены иконкой&nbsp;<!--[img-sound-on]-->)."},{"title":"Как сохранить кадр из видео?","article":"Убедитесь, что в <a data-webext-page=\\"settings\\">настройках</a> отмечен пункт <b>«Отображать кнопку сохранения скриншота из видео»</b>. В правом нижнем углу плеера левее иконки <b>«Настройки»</b> должна появиться иконка&nbsp;<!--[img-camera]-->, по нажатию на которую текущий кадр из видео будет сохранён на ваш компьютер в формате jpeg.","services":["gv","ok"]},{"title":"Как отображать интерфейс по клику на кнопку скачивания, а не при наведении на неё?","article":"В <a data-webext-page=\\"settings\\">настройках</a> вы можете выбрать внешний вид кнопки: <ul><li><b>современный</b> (интерфейс выводится при наведении)</li><li><b>классический</b> (интерфейс выводится при клике)</li></ul>"},{"title":"Зачем нужны QR-коды?","article":"С помощью QR-кодов вы можете получить прямую ссылку на видео или аудио на любом устройстве с камерой. Убедитесь, что в <a data-webext-page=\\"settings\\">настройках {{extensionName}}</a> включен пункт <b>«Отображать QR-коды»</b>. У некоторых вариантов загрузки появится иконка&nbsp;<!--[img-qr-code]-->, по нажатию на которую вы увидите QR-код и инструкцию для телефона или планшета.","services":["gv","gvOk"]}],"qr_code_title":"QR-код для мобильного устройства","qr_code_description":"Передать прямую ссылку для загрузки на ваш смартфон или планшет теперь просто — запустите сканер QR-кодов и наведите на изображение выше.","qr_code_error":"Сервис QR-кодов сейчас недоступен. Пожалуйста, попробуйте позже.","show_yandex_market_adviser":"Отображать Яндекс.Советник — виджет сравнения цен для выгодных покупок","warning":"Внимание!","yandex_market_adviser_notification_description":"Изменения вступят в силу после перезагрузки страницы с виджетом Яндекс.Советника.","social_media_sharing":{"title":"Минуточку внимания!","mediafile_0":"медиафайл","mediafile_1":"медиафайлы","mediafile_2":"медиафайлов","already_oneMediafile":"","already_moreThanOneMediafile":"уже","message":"<0>С помощью нашего браузерного расширения вы загрузили {{already}} <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1>Для того, чтобы {{extensionName}} оставался бесплатным, нам нужна ваша помощь — расскажите о нас в социальных сетях или месенджерах!</1>","button_ok":"Поделиться с друзьями","button_cancel":"Мне сложно это сделать сейчас","asking_for_review_by_downloads":"Вы успешно скачали {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> Будем благодарны за отзыв и <7>5 звёздочек</7> ;)<9 />Это действительно важно для развития.","screenshot_0":"скриншот","screenshot_1":"скриншоты","screenshot_2":"скриншотов","asking_for_review_by_screenshots":"Вы успешно сделали {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 /> Будем благодарны за отзыв и <7>5 звёздочек</7> ;)<9 />Это действительно важно для развития.","button_cancel_rate":"Не сейчас","button_rate":"Оценить","help_extension_to_get_better":"Помогите {{extensionName}} стать лучше!","screenshot_plural":"скриншоты","mediafile_plural":"медиафайлы"},"direct_links_unavailable":"Прямые ссылки временно недоступны. Попробуйте <a data-webext-function=\\"reload\\">перезагрузить страницу</a> (клавиша F5)","day":"д","hour":"ч","minute":"мин","second":"сек","reset":"Сбросить","download_error":"Во время последней загрузки файла произошла ошибка. Для возврата к списку форматов загрузки нажмите на кнопку «Сбросить».","protected_tooltip":"Вы не можете скачать это видео, оно защищено авторским правом.","protected":"Защищено","data_consents":{"title":"Согласие со сбором и обработкой данных","description":"Запрос разрешения на получение данных","checkbox_eula":"Я принимаю <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">лицензионное соглашение</a>","checkbox_settings":"Я согласен с <a data-webext-page=\\"data-consents-settings\\">настройками конфиденциальности</a>","checkbox_statistics":"Даю разрешение на хранение и обработку статистических данных","checkbox_statistics_hint":"Статистика скачиваний (характеристики контента, выбранные форматы), данные о взаимодействии с элементами интерфейса, метрики работоспособности расширения и его отдельных модулей","checkbox_technical":"Даю разрешение на хранение и обработку технических данных","checkbox_technical_hint":"Обезличенные данные об ошибках, воспроизводимом контенте, версиях используемых модулей, длительности и успешности выполняемых операций, конфигурации устройства пользователя","disagree":"Я отказываюсь (удалить {{extensionName}})","agree":"Я согласен, продолжить","description_browsing":"<strong>данные о браузерной активности</strong>: URL-адреса онлайн-видеоплееров, идентификаторы установок;","description_request":"Необходимо ваше разрешение на сбор следующих данных для обслуживания {{extensionName}}:","button_disablestats":"Ничего не отправлять","button_techstats":"Отправлять тех. данные","button_fullstats":"Отправлять технические данные и данные о браузерной активности","description_technical":"<strong>технические данные</strong>: тип и версия браузера, метод извлечения медиафайлов (характерно для видеосервисов)."},"conflict_extensions":"Обнаружено расширение <b>{{competitorsDetection}}</b> для загрузки мультимедиа файлов. Одновременная работа нескольких браузерных расширений может привести <b>к сбоям</b> в работе вашего браузера.","competitors":{"i_understand_risks":"Я понимаю риск","how_to_solve_this_problem":"Как исправить эту проблему?"},"selectLanguage":"Выберите язык"}');
;// CONCATENATED MODULE: ./src/i18n/sv/translation.json
const sv_translation_namespaceObject = JSON.parse('{"language":"Språk","copy_link_to_clipboard_notification_message":"Länk kopierad till urklipp","active_download_warning_notification_message":"Allt är under kontroll!","social_media_sharing":{"title":"Ett ögonblick bara!","already_moreThanOneMediafile":"redan","mediafile":"mediafil","mediafile_plural":"mediafiler","message":"<0>Med vårt webbläsartillägg som du har {{already}} laddat ner <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1>För att hålla {{extensionName}} gratis behöver vi din hjälp - berätta om oss på sociala nätverk eller messengers!</1>","button_ok":"Dela med vänner","button_cancel":"Inte nu","asking_for_review_by_downloads":"Du har laddat ner {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> Vi skulle vara tacksamma för recensionen och <7>5 stjärnor</7> ;)<9 />Det är verkligen viktigt för utvecklingen.","button_cancel_rate":"Inte nu","button_rate":"Pris","help_extension_to_get_better":"Hjälp {{extensionName}} att bli bättre!","asking_for_review_by_screenshots":"Du har framgångsrikt gjort {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 /> Vi skulle vara tacksamma för recensionen och <7>5 stjärnor</7> ;)<9 />Det är verkligen viktigt för utvecklingen.","screenshot":"skärmdump","screenshot_plural":"skärmdumpar"},"data_consents":{"checkbox_statistics":"Jag samtycker till lagring och bearbetning av statistiska uppgifter","checkbox_settings":"Jag godkänner <a data-webext-page=\\"data-consents-settings\\">inställningarna för skydd av personuppgifter</a>","checkbox_eula":"Jag godkänner <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">licensavtalet</a>","title":"Formulär för samtycke till insamling och behandling av uppgifter","checkbox_statistics_hint":"Statistik över nedladdningar (innehållsegenskaper, valda format), data om interaktion med gränssnittselement, mätvärden för prestanda för tillägget och dess enskilda moduler","checkbox_technical":"Jag samtycker till lagring och bearbetning av tekniska data","checkbox_technical_hint":"Anonymiserade data om fel, spelat innehåll, versioner av använda moduler, varaktighet och effektivitet för utförda operationer, användarens enhetskonfiguration","disagree":"Jag avböjer (ta bort {{extensionName}})","description":"Begäran om tillstånd","agree":"Jag håller med, fortsätt","description_request":"Vi behöver din tillåtelse att samla in följande uppgifter för att underhålla {{extensionName}}:","description_browsing":"<strong>Surfaktivitetsdata</strong>: URL:er till videospelare online, installations-ID:n;","description_technical":"<strong>tekniska data</strong>: webbläsarfamilj och version, metod för medieutvinning (specifik för en videotjänst).","button_disablestats":"Dela inte någonting","button_techstats":"Dela endast tekniska data","button_fullstats":"Dela uppgifter om tekniska data och surfaktivitet"},"languageName":"Svenska","selectLanguage":"Välj ett språk","changeLanguage":"förändring","auto_detect":"Automatisk detektering","download":"Nedladdning","live_stream":"Direktsändning","live_stream_tooltip":"Du kan inte ladda ner Live Streams ännu, men vi arbetar på det :)","protected":"Skyddad","protected_tooltip":"Du kan inte ladda ner den här videon, den är skyddad av upphovsrätt.","premiere":"Premiär","premiere_tooltip":"Det finns inget att ladda ner ännu :)","video":"Video","audio":"Audio","music":"Musik","selectFormat":"Välj lämpligt format","return_to_the_previous_screen":"Tillbaka","settings":{"title":"Inställningar","show_formats_required_online_conversion":"Visa format som kräver online-konvertering","show_webm":"Visa video i WebM-format","show_snapshot_button":"Visa knappen för ögonblicksbild av video","warn_before_converting":"Varning före konvertering","title_app_button_style":"Knappmodell","app_button_style_modern":"Modern (gränssnittet visas vid muspekning)","app_button_style_classic":"Klassisk (gränssnittet visas vid klick)","display_qr_codes":"Visa QR-koder","show_formats_available_via_desktop_client":"Visa format tillgängliga via {{desktopClientName}}","privacy":"Öppna {{extensionName}} sekretessinställningar"},"confirm_conversion_title":"Det valda filformatet kräver konvertering!","confirm_conversion_message":"Konvertering använder aktivt hårdvaruresurser, vilket kan orsaka en tillfällig minskning av webbläsarens hastighet, inklusive i andra flikar.","cancel":"Avbryt","continue":"Fortsätta","formats_for_download":"Format för nedladdning","all_formats_for_download":"Alla format för nedladdning","more_formats":"Fler format","conversion_required":"сonvertering krävs","do_not_show_on_load":"Visa inte på last","conversion_time":"сonversion ~{{conversionTime}}","download_via_web_portal":"Ladda ner det nödvändiga formatet via {{webPortalHostname}}","download_via_web_portal_tooltip":"Ladda ner via {{webPortalHostname}}","download_using_desktop_client_tooltip":"Ladda ner med {{desktopClientName}}","copy_link_to_clipboard_tooltip":"Kopiera länk till urklipp","active_download_warning_notification_description":"Du har lämnat sidan med en aktiv nedladdning, den kommer att fortsätta i bakgrunden.","cancel_download":"Avbryt nedladdning/konvertering","take_screenshot_tooltip":"Ta skärmdump","drop_us_a_line":"Hittade du inte svaret? Skriv till oss ;)","help":"Hjälp","help_articles":[{"title":"Hur laddar man ner?","article":"Du kan ladda ner standardformatet genom att klicka på knappen <b>{{extensionName}}</b> nedanför videon. Du kan också välja önskat format i rullgardinsmenyn."},{"title":"Vilket videoformat ska jag välja?","article":"Den bästa kvaliteten finns tillgänglig i <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> och <b>8K (4320p)</b>. Den allmänna rekommendationen är att ju högre skärmupplösning du har desto bättre videokvalitet bör du få. Men du måste också ta hänsyn till andra faktorer: nedladdningshastighet, ledigt utrymme och enhetens prestanda under uppspelning."},{"title":"Varför fryser en webbläsare/dator under nedladdning?","article":"Webbläsaren/datorn får inte frysa helt! Om detta händer, vänligen rapportera det via feedbackformuläret, med angivande av videolänken. Tyvärr kan vissa videoformat inte laddas ner direkt från {{onlineVideoPlatform}}. Därför har vi lagt till möjligheten att konvertera små videor online till önskat format i <b>{{extensionName}}</b>. I vissa fall använder denna process datorresurser för aktivt."},{"title":"Varför kan jag inte ladda ner en video i önskat format direkt?","article":"Vissa videofilformat kan inte laddas ner direkt på grund av vissa tekniska egenskaper hos {{onlineVideoPlatform}}. Därför har <b>{{extensionName}}</b> en extra funktion för att konvertera korta onlinevideor till önskat format. Stora videor (längre och/eller av hög kvalitet) kräver många resurser för onlinekonvertering, vilket ibland kan frysa din webbläsare/dator. Därför rekommenderas att du laddar upp dessa videor via <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} för Windows</a></b>."},{"title":"Hur kan jag få en länk för nedladdning av video/audio?","article":"Direkt nedladdningslänk är endast tillgänglig för de format som inte kräver konvertering. Klicka på ikonen&nbsp;<!--[img-copy]--> i en rad med lämpligt nedladdningsalternativ och klistra sedan in den som text där det behövs."},{"title":"Hur laddar jag ner video med 60 fps?","article":"Det räcker med att välja motsvarande nedladdningsalternativ, som kan identifieras med ikonen&nbsp;<!--[img-fps-60]-->. Sådana alternativ är dock inte alltid tillgängliga. Först och främst måste originalvideon ha minst 60 FPS. Dessutom måste den vara tillgänglig för visning i {{onlineVideoPlatform}}-spelaren med 60 FPS-hastighet."},{"title":"Hur laddar jag ner ett ljudspår (musik) i MP3?","article":"Tyvärr är det inte möjligt att ladda ner MP3-format direkt för tillfället. {{onlineVideoPlatform}} stöder inte det, och den onlinekonvertering som krävs är instabil. Använd vår <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}} för Windows</a></b> som kan konvertera videofiler till MP3. Du kan också välja något annat ljudformat i listan (markeras med ikonen&nbsp;<!--[img-sound-on]-->)."},{"title":"Hur tar man en skärmdump?","services":["gv","ok"],"article":"Kontrollera att det i <a data-webext-page=\\"settings\\">inställningar</a> finns en kryssruta mitt emot <b>\\"Visa knappen för ögonblicksbild av video\\"</b>. I spelarens nedre högra hörn till vänster om ikonen <b>\\"Inställningar\\"</b> visas ikonen <b>\\"Ta skärmdump\\"</b>&nbsp;<!--[img-camera]-->, genom att klicka på denna sparas den aktuella bildrutan från videon till din dator i jpeg-format."},{"title":"Hur visar man gränssnittet när man klickar på nedladdningsknappen, inte när man håller muspekaren över den?","article":"Du kan välja en knappstil i <a data-webext-page=\\"settings\\">inställningar</a>: <ul><li><b>modern</b> (gränssnittet visas när musen förs över)</li><li><b>klassisk</b> (gränssnittet visas när du klickar)</li></ul>"},{"title":"Varför behöver du QR-koder?","services":["gv","gvOk"],"article":"Med QR-koder kan du få en direktlänk till video eller ljud på alla enheter med en kamera. Kontrollera att <b>\\"Visa QR-koder\\"</b> är aktiverat i <a data-webext-page=\\"settings\\">{{extensionName}}-inställningarna</a>. Vissa nedladdningsalternativ har en ikon \\"Få QR-kod\\"&nbsp;<!--[img-qr-code]-->, om du klickar på denna ser du en QR-kod och instruktioner för din telefon eller surfplatta."}],"download_using_desktop_client":"Ladda ner det format som krävs med {{desktopClientName}}","qr_code_tooltip":"Få QR-kod","qr_code_title":"QR-kod för mobil enhet","qr_code_description":"Det är enkelt att skicka den direkta nedladdningslänken till din smartphone eller surfplatta - starta bara en QR-kodsläsare och håll muspekaren över bilden ovan.","qr_code_error":"QR-kod tjänsten är inte tillgänglig för tillfället. Vänligen försök igen senare.","show_yandex_market_adviser":"Visa Yandex.Market Adviser - widget för prisjämförelse av bästa erbjudanden","warning":"Varning!","yandex_market_adviser_notification_description":"Ändringar träder i kraft efter omlastning av sidan med Yandex.Market Adviser-widgeten.","day":"d","hour":"h","minute":"min","second":"sek","reset":"Återställ","download_error":"Ett fel uppstod under filnedladdningen. Klicka på knappen Återställ för att återgå till listan över filformat som kan laddas ner.","conflict_extensions":"Ett tillägg <b>{{competitorsDetection}}</b> för nedladdning av multimediafiler har upptäckts. Om du kör flera webbläsartillägg samtidigt kan din webbläsare <b>krascha</b>.","direct_links_unavailable":"Direktlänkar är tillfälligt otillgängliga. Försök att <a data-webext-function=\\"reload\\">ladda om sidan</a> (tangent F5)","active_download_warning_on_leave":"Vill du verkligen stänga?","competitors":{"i_understand_risks":"Jag förstår riskerna","how_to_solve_this_problem":"Hur löser man detta problem?"}}');
;// CONCATENATED MODULE: ./src/i18n/th/translation.json
const th_translation_namespaceObject = JSON.parse('{"help_articles":[{"article":"คุณสามารถดาวน์โหลดรูปแบบเริ่มต้นได้โดยคลิกที่ปุ่ม <b>{{extensionName}}</b> ด้านล่างวิดีโอ คุณยังสามารถเลือกรูปแบบที่ต้องการได้โดยเลื่อนลง","title":"ดาวน์โหลดได้อย่างไร?"},{"title":"ฉันควรเลือกรูปแบบวิดีโอใด?","article":"คุณภาพที่ดีที่สุดมีให้บริการใน <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> และ <b>8K (4320p)</b>. คำแนะนำทั่วไปคือ ยิ่งความละเอียดหน้าจอของคุณสูง คุณภาพวิดีโอก็ควรจะดีขึ้นด้วย อย่างไรก็ตาม คุณต้องพิจารณาปัจจัยอื่น ๆ ด้วย: ความเร็วในการดาวน์โหลด จำนวนพื้นที่ว่าง และประสิทธิภาพของอุปกรณ์ระหว่างการเล่น"},{"title":"เหตุใดเบราว์เซอร์/คอมพิวเตอร์จึงค้างขณะดาวน์โหลด?","article":"เบราว์เซอร์/คอมพิวเตอร์ไม่ควรค้างขณะทำงาน! หากเกิดเหตุการณ์เช่นนี้ โปรดรายงานผ่านแบบฟอร์มแสดงความคิดเห็นซึ่งระบุลิงก์วิดีโอ ขออภัย ไม่สามารถดาวน์โหลดรูปแบบวิดีโอบางรูปแบบจาก {{onlineVideoPlatform}} ได้โดยตรง ดังนั้นเราจึงเพิ่มความเป็นไปได้ในการแปลงวิดีโอขนาดเล็กทางออนไลน์เป็นรูปแบบที่ต้องการใน <b>{{extensionName}}</b> ในบางกรณีกระบวนการนี้มีการใช้ทรัพยากรคอมพิวเตอร์มากเกินไป"},{"title":"เหตุใดฉันจึงไม่สามารถดาวน์โหลดวิดีโอในรูปแบบที่ต้องการได้โดยตรง?","article":"ไฟล์วิดีโอบางรูปแบบไม่สามารถดาวน์โหลดได้โดยตรงเนื่องจากคุณสมบัติทางเทคนิคบางประการของ {{onlineVideoPlatform}} ดังนั้น <b>{{extensionName}}</b> จึงมีคุณลักษณะเพิ่มเติมในการแปลงวิดีโอสั้นออนไลน์ให้อยู่ในรูปแบบที่ต้องการ วิดีโอขนาดใหญ่ (ยาวกว่าและ/หรือมีคุณภาพสูง) ต้องใช้ทรัพยากรจำนวนมากสำหรับการแปลงออนไลน์ ซึ่งบางครั้งอาจทำให้เบราว์เซอร์/คอมพิวเตอร์ของคุณค้างได้ ดังนั้นจึงแนะนำให้อัปโหลดวิดีโอเหล่านี้ผ่าน <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} สำหรับ Windows</a></b>"},{"title":"ฉันจะเอาลิงค์ดาวน์โหลดวิดีโอ/เสียง ได้อย่างไร?","article":"ลิงก์ดาวน์โหลดโดยตรงมีเฉพาะในรูปแบบที่ไม่ต้องการการแปลงเท่านั้น โดยคลิกที่ icon&nbsp;<!--[img-copy]--> ในบรรทัดที่มีตัวเลือกการดาวน์โหลดที่เหมาะสม จากนั้นวางเป็นข้อความตามที่จำเป็น"},{"article":"การเลือกตัวเลือกการดาวน์โหลดที่เกี่ยวข้องก็เพียงพอแล้ว ซึ่งสามารถระบุได้ด้วย icon&nbsp;<!--[img-fps-60]--> อย่างไรก็ตาม ตัวเลือกดังกล่าวอาจไม่สามารถใช้ได้เสมอไป ก่อนอื่น วิดีโอต้นฉบับต้องมีอย่างน้อย 60 FPS นอกจากนี้ จะต้องพร้อมสำหรับการดูในโปรแกรมเล่น {{onlineVideoPlatform}} ที่มีอัตรา 60 FPS","title":"จะดาวน์โหลดวิดีโอ 60 fps ได้อย่างไร?"},{"article":"ขออภัย ไม่สามารถดาวน์โหลดรูปแบบ MP3 ได้โดยตรงในขณะนี้ {{onlineVideoPlatform}} ไม่รองรับ และการแปลงออนไลน์ที่ไม่เสถียร ใช้ <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} สำหรับ Windows</a></b> ที่สามารถแปลงไฟล์วิดีโอเป็น MP3 หรือเลือกรูปแบบเสียงอื่นๆ จากรายการ (ระบุด้วย icon&nbsp;<!--[img-sound-on]-->)","title":"จะดาวน์โหลดแทร็กเสียง (เพลง) ในรูปแบบ MP3 ได้อย่างไร?"},{"article":"ตรวจสอบให้แน่ใจว่าใน <a data-webext-page=\\"settings\\">การตั้งค่า</a> มีช่องทำเครื่องหมายตรงข้ามรายการ <b>\\"แสดงปุ่มสแนปชอตวิดีโอ\\"</b> ที่มุมขวาล่างของโปรแกรมเล่นทางด้านซ้ายของ <b>\\"การตั้งค่า\\"</b> icon, <b>\\"ถ่ายภาพหน้าจอ\\"</b> icon&nbsp;<!--[img-camera]--> ควรปรากฏขึ้นโดยคลิกที่เฟรมปัจจุบันจากวิดีโอจะถูกบันทึกลงในคอมพิวเตอร์ของคุณในรูปแบบ JPEG","services":["gv","ok"],"title":"จะจับภาพหน้าจอได้อย่างไร?"},{"article":"คุณสามารถเลือกรูปแบบปุ่มได้ใน <a data-webext-page=\\"settings\\">การตั้งค่า</a>: <ul><li><b>โมเดิร์น</b> (อินเทอร์เฟซปรากฏบนเมาส์)</li><li><b>คลาสสิก</b> (อินเทอร์เฟซปรากฏขึ้นเมื่อคลิก)</li></ul>","title":"จะแสดงอินเทอร์เฟซอย่างไรเมื่อคลิกปุ่มดาวน์โหลด โดยไม่วางเมาส์เหนือมัน"},{"services":["gv","gvOk"],"article":"การใช้รหัส QR จะทำให้คุณได้รับลิงก์โดยตรงไปยังวิดีโอหรือเสียงบนอุปกรณ์ใดๆ ที่มีกล้อง ตรวจสอบให้แน่ใจว่ารายการ <b>\\"แสดงรหัส QR\\"</b> ถูกเปิดใช้งานใน <a data-webext-page=\\"settings\\">การตั้งค่า {{extensionName}}</a> ตัวเลือกการดาวน์โหลดบางตัวจะมี \\"รับ QR Code\\" icon&nbsp;<!--[img-qr-code]--> เมื่อคลิกแล้วคุณจะเห็นโค้ด QR และคำแนะนำสำหรับโทรศัพท์หรือแท็บเล็ตของคุณ","title":"ทำไมคุณต้องมีรหัส QR?"}],"live_stream":"ถ่ายทอดสด","social_media_sharing":{"screenshot":"ภาพหน้าจอ","mediafile":"มีเดียไฟล์","help_extension_to_get_better":"ช่วยให้ {{extensionName}} ดีขึ้น!","button_rate":"เรท","button_cancel_rate":"ไม่ใช่ตอนนี้","asking_for_review_by_screenshots":"คุณสร้างสำเร็จแล้ว {{screenshotsCount}} $t(social_media_sharing.screenshot)<5 /> เราจะขอบคุณสำหรับการรีวิวและ <7>5 ดาว</7> ;)<9 />มันสำคัญมากสำหรับการพัฒนา .","asking_for_review_by_downloads":"คุณดาวน์โหลดสำเร็จแล้ว {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> เราจะขอบคุณสำหรับการตรวจสอบและ <7>5 ดาว</7> ;)<9 />มันสำคัญมากสำหรับการพัฒนา","button_cancel":"ตอนนี้ฉันไม่สามารถติดตามได้","button_ok":"แชร์ไปให้เพื่อน","message":"<0>ด้วยส่วนขยายเบราว์เซอร์ของเรา คุณได้ดาวน์โหลดแล้ว {{already}} ดาวน์โหลด <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1> เพื่อให้ {{extensionName}} ฟรี เราต้องการความช่วยเหลือจากคุณ - บอกเกี่ยวกับเราบนโซเชียลเน็ตเวิร์กหรือผู้ส่งสาร!</1>","already_moreThanOneMediafile":"เรียบร้อยแล้ว","title":"กรุณารอสักครู่!"},"conflict_extensions":"ตรวจพบส่วนขยาย <b>{{competitorsDetection}}</b> สำหรับการดาวน์โหลดไฟล์มัลติมีเดีย การเรียกใช้ส่วนขยายเบราว์เซอร์หลายรายการพร้อมกันอาจทำให้เบราว์เซอร์ของคุณ<b>ขัดข้อง</b>","data_consents":{"agree":"ฉันเห็นด้วยดำเนินการต่อ","disagree":"ฉันปฏิเสธ (ลบ {{extensionName}})","button_fullstats":"แบ่งปันข้อมูลทางเทคนิคและกิจกรรมการสืบค้น","button_techstats":"แชร์ข้อมูลด้านเทคนิค","button_disablestats":"อย่าแชร์อะไรเลย","checkbox_technical_hint":"ข้อมูลที่ไม่ระบุชื่อเกี่ยวกับข้อผิดพลาด เนื้อหาที่เล่น เวอร์ชันของโมดูลที่ใช้ ระยะเวลาและประสิทธิภาพของการดำเนินการที่ดำเนินการ การกำหนดค่าอุปกรณ์ของผู้ใช้","checkbox_technical":"ฉันยินยอมให้จัดเก็บและประมวลผลข้อมูลทางเทคนิค","checkbox_statistics_hint":"สถิติการดาวน์โหลด (ลักษณะเนื้อหา รูปแบบที่เลือก) ข้อมูลการโต้ตอบกับองค์ประกอบอินเทอร์เฟซ ตัวชี้วัดประสิทธิภาพของส่วนขยายและแต่ละโมดูล","checkbox_statistics":"ฉันให้ความยินยอมในการจัดเก็บและประมวลผลข้อมูลทางสถิติ","checkbox_settings":"ฉันยอมรับ<a data-webext-page=\\"data-consents-settings\\">การตั้งค่าความเป็นส่วนตัว</a>","checkbox_eula":"ฉันยอมรับ<a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">ข้อตกลงใบอนุญาต</a>","description_technical":"<strong>ข้อมูลทางเทคนิค</strong>: ประเภทและเวอร์ชันของเบราว์เซอร์ วิธีการดึงข้อมูลสื่อ (เฉพาะบริการวิดีโอ)","description_browsing":"<strong>ข้อมูลกิจกรรมการเรียกดู</strong>: URL ของเครื่องเล่นวิดีโอออนไลน์ รหัสการติดตั้ง","description_request":"เราต้องการการอนุญาตจากคุณในการรวบรวมข้อมูลต่อไปนี้เพื่อรักษา {{extensionName}}:","description":"ขออนุญาติรับข้อมูล","title":"แบบฟอร์มยินยอมในการเก็บรวบรวมและประมวลผลข้อมูล"},"download_error":"เกิดข้อผิดพลาดระหว่างการดาวน์โหลดไฟล์ หากต้องการกลับไปยังรายการรูปแบบไฟล์ที่สามารถดาวน์โหลดได้ ให้คลิกปุ่มรีเซ็ต","reset":"รีเซ็ต","second":"วินาที","minute":"นาที","hour":"ชม.","day":"วัน","direct_links_unavailable":"ลิงก์โดยตรงไม่สามารถใช้งานได้ชั่วคราว ลอง <a data-webext-function=\\"reload\\">โหลดหน้าซ้ำ</a> (ปุ่ม F5)","yandex_market_adviser_notification_description":"การเปลี่ยนแปลงจะมีผลหลังจากโหลดหน้าใหม่ด้วยวิดเจ็ต Yandex.Market Adviser","warning":"คำเตือน!","show_yandex_market_adviser":"แสดง Yandex.Market Adviser - วิดเจ็ตเปรียบเทียบราคาข้อเสนอที่ดีที่สุด","qr_code_error":"บริการรหัส QR ไม่สามารถใช้งานได้ในขณะนี้ กรุณาลองใหม่อีกครั้งในภายหลัง.","qr_code_description":"การส่งลิงก์ดาวน์โหลดโดยตรงไปยังสมาร์ทโฟนหรือแท็บเล็ตของคุณเป็นเรื่องง่าย เพียงเปิดเครื่องสแกนโค้ด QR แล้วเลื่อนเมาส์ไปเหนือรูปภาพด้านบน","qr_code_title":"รหัส QR สำหรับอุปกรณ์มือถือ","help":"ช่วยเหลือ","drop_us_a_line":"ไม่พบคำตอบใช่ไหม ส่งข้อความหาเราสิ ;)","take_screenshot_tooltip":"จับภาพหน้าจอ","cancel_download":"ยกเลิกการดาวน์โหลด/แปลง","active_download_warning_notification_description":"คุณได้ออกจากเพจที่มีการดาวน์โหลดอยู่ โดยจะดำเนินการต่อในเบื้องหลัง","active_download_warning_notification_message":"ทุกอย่างอยู่ภายใต้การควบคุม!","copy_link_to_clipboard_notification_message":"คัดลอกลิงก์ไปยังคลิปบอร์ดแล้ว","copy_link_to_clipboard_tooltip":"คัดลอกลิงก์ไปยังคลิปบอร์ด","qr_code_tooltip":"รับรหัส QR","download_using_desktop_client_tooltip":"ดาวน์โหลดโดยใช้ {{desktopClientName}}","download_using_desktop_client":"ดาวน์โหลดรูปแบบที่ต้องการโดยใช้ {{desktopClientName}}","download_via_web_portal_tooltip":"ดาวน์โหลดผ่าน {{webPortalHostname}}","download_via_web_portal":"ดาวน์โหลดรูปแบบที่ต้องการผ่าน {{webPortalHostname}}","conversion_time":"การแปลง ~{{conversionTime}}","conversion_required":"จำเป็นต้องมีการแปลง","more_formats":"รูปแบบเพิ่มเติม","all_formats_for_download":"ทุกรูปแบบสำหรับการดาวน์โหลด","formats_for_download":"รูปแบบสำหรับการดาวน์โหลด","continue":"ดำเนินการต่อ","cancel":"ยกเลิก","do_not_show_on_load":"อย่าแสดงขณะโหลด","confirm_conversion_message":"มีการแปลงใช้ทรัพยากรฮาร์ดแวร์อย่างจริงจัง ซึ่งอาจทำให้ความเร็วของเบราว์เซอร์ลดลงชั่วคราว รวมถึงในแท็บอื่นๆ","confirm_conversion_title":"รูปแบบไฟล์ที่เลือกต้องมีการแปลง!","settings":{"privacy":"เปิดการตั้งค่าความเป็นส่วนตัวของ {{extensionName}}","display_qr_codes":"แสดงรหัส QR","app_button_style_classic":"คลาสสิก (อินเทอร์เฟซปรากฏขึ้นเมื่อคลิก)","app_button_style_modern":"โมเดิร์น (อินเทอร์เฟซปรากฏอยู่บนเมาส์)","title_app_button_style":"สไตล์ปุ่ม","warn_before_converting":"เตือนก่อนแปลง","show_snapshot_button":"แสดงปุ่มสแนปชอตวิดีโอ","show_webm":"แสดงวิดีโอในรูปแบบ WebM","show_formats_required_online_conversion":"แสดงรูปแบบที่ต้องการการแปลงออนไลน์","show_formats_available_via_desktop_client":"แสดงรูปแบบที่ใช้ได้ผ่านทาง {{desktopClientName}}","title":"ตั้งค่า"},"return_to_the_previous_screen":"กลับ","premiere_tooltip":"ไม่มีอะไรให้ดาวน์โหลดเลย :)","video":"วีดีโอ","audio":"เสียง","music":"เพลง","selectFormat":"เลือกรูปแบบที่คุณต้องการ","premiere":"ปฐมทัศน์","protected_tooltip":"คุณไม่สามารถดาวน์โหลดวิดีโอนี้ได้ เนื่องจากได้รับการคุ้มครองลิขสิทธิ์","protected":"มีการป้องกัน","live_stream_tooltip":"ยังไม่สามารถดาวน์โหลด Live Streams ได้ เรากำลังดำเนินการอยู่ :)","download":"ดาวน์โหลด","auto_detect":"ตรวจจับอัตโนมัติ","changeLanguage":"เปลี่ยน","selectLanguage":"เลือกภาษา","languageName":"ภาษาไทย","language":"ภาษา","competitors":{"i_understand_risks":"ฉันเข้าใจถึงความเสี่ยง","how_to_solve_this_problem":"ฉันจะแก้ไขปัญหานี้ได้อย่างไร?"},"active_download_warning_on_leave":"อยากปิดจริงๆเหรอ?"}');
;// CONCATENATED MODULE: ./src/i18n/tr/translation.json
const tr_translation_namespaceObject = JSON.parse('{"language":"Dil","languageName":"Türkçe","selectLanguage":"Bir dil seçin","changeLanguage":"değiştir","settings":{"warn_before_converting":"Dönüştürürken uyar","title_app_button_style":"Düğme görünümü","app_button_style_modern":"Modern (arayüz üzerine gelindiğinde görüntülenir)","title":"Ayarlar","show_formats_available_via_desktop_client":"Tasvir etmek formatları şu yolla kullanılabilir {{desktopClientName}}","show_webm":"Tasvir etmek videoları WebM formatında","show_snapshot_button":"Bir videodan ekran görüntüsünü kaydetmek için bir düğme görüntüleyin","app_button_style_classic":"Klasik (arayüz tıklandığında görüntülenir)","display_qr_codes":"QR kodlarını görüntüleme","privacy":"Gizlilik ayarlarını açın {{extensionName}}","show_formats_required_online_conversion":"Tasvir etmek Çevrimiçi dönüştürme gerektiren formatları"},"help_articles":[{"title":"Nasıl indirilir?","article":"Videonun altındaki <b>{{extensionName}}</b> düğmesine tıklayarak varsayılan formatı indirebilirsiniz. Ayrıca açılır listeden istediğiniz formatı seçebilirsiniz."},{"title":"Hangi video formatını seçmeliyim?","article":"En iyi kalite <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> ve <b>8K (4320p)</b>olarak mevcuttur. Genel öneri, ekran çözünürlüğünüz ne kadar yüksek olursa video kalitesinin de o kadar iyi olması gerektiğidir. Ancak diğer faktörleri de göz önünde bulundurmanız gerekir: indirme hızı, boş alan miktarı ve oynatma sırasında cihazın performansı."},{"title":"Bir tarayıcı/bilgisayar indirme sırasında neden donar?","article":"Tarayıcı/bilgisayar tamamen donmamalıdır! Böyle bir durumla karşılaşırsanız lütfen video bağlantısını belirterek geri bildirim formunu kullanarak durumu bildirin. Maalesef bazı video formatları doğrudan {{onlineVideoPlatform}}\'dan indirilemez. Bu nedenle, <b>{{extensionName}}</b> dosyasına küçük videoları çevrimiçi olarak istenen formata dönüştürme olanağını ekledik. Bazı durumlarda bu işlem bilgisayar kaynaklarını çok aktif olarak kullanır."},{"title":"Bir videoyu neden doğrudan istediğim formatta indiremiyorum?","article":"Bazı video dosyası formatları, belirli teknik özellikleri nedeniyle doğrudan indirilemez {{onlineVideoPlatform}}. Bu nedenle,<b>{{extensionName}}</b> çevrimiçi kısa videoları istenen formata dönüştürmek için ek bir özelliğe sahiptir. Büyük videolar (daha uzun ve/veya yüksek kaliteli) çevrimiçi dönüştürme için çok fazla kaynak gerektirir ve bu da bazen tarayıcınızı/bilgisayarınızı dondurabilir. Bu nedenle, bu videoları <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}} for Windows</a></b>."},{"title":"Video/ses indirme bağlantısını nasıl alabilirim?","article":"Doğrudan indirme bağlantısı yalnızca dönüştürme gerektirmeyen formatlar için mevcuttur. Bunu yapmak için, uygun indirme seçeneğine sahip bir satırdaki&nbsp;<!--[img-copy]--> simgesine tıklayın ve ardından gereken yere metin olarak yapıştırın."},{"title":"60 fps video nasıl indirilir?","article":"Simge ile tanımlanabilen ilgili indirme seçeneğini seçmek yeterlidir&nbsp;<!--[img-fps-60]-->. Ancak, bu tür seçenekler her zaman mevcut değildir. Her şeyden önce, orijinal video en az 60 FPS\'ye sahip olmalıdır. Ayrıca, {{onlineVideoPlatform}} oynatıcısında 60 FPS hızıyla görüntülenebilir olmalıdır."},{"title":"MP3 olarak bir ses parçası (müzik) nasıl indirilir?","article":"Ne yazık ki şu anda MP3 formatını doğrudan indirmek mümkün değil. {{onlineVideoPlatform}} bunu desteklemiyor ve gerekli çevrimiçi dönüşüm kararsız. Video dosyalarını MP3\'e dönüştürebilen <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">{{desktopClientName}}</a></b> ürünümüzü kullanın. Veya listeden başka bir ses formatını seçin (indicated by the icon&nbsp;<!--[img-sound-on]-->)."},{"services":["gv","ok"],"title":"Ekran görüntüsü nasıl alınır?","article":"<a data-webext-page=\\"settings\\">ayarlarda</a> <b>“Videodan ekran görüntüsünü kaydetmek için görüntüle düğmesi”</b> seçeneğinin işaretlendiğinden emin olun. Oynatıcının sağ alt köşesinde, <b>\\"Ayarlar\\"</b> simgesinin solunda,&nbsp;<!--[img-camera]--> bir simge görünmelidir ve bu simgeye tıklandığında mevcut görüntü kaydedilir çerçeveyi videodan bilgisayarınıza jpeg formatında aktarın."},{"title":"Arayüz, üzerine gelindiğinde değil, indirme düğmesine tıklandığında nasıl görüntülenir?","article":"<a data-webext-page=\\"settings\\">ayarlarda</a> bir düğme stili seçebilirsiniz: <ul><li><b>modern</b> (fareyle üzerine gelindiğinde arayüz görünür)</li ><li><b>klasik</b> (tıklandığında arayüz görünür)</li></ul>"},{"title":"QR kodlarına neden ihtiyacınız var?","article":"QR kodlarını kullanarak, kamerası olan herhangi bir cihazdaki video veya sese doğrudan bağlantı alabilirsiniz. <a data-webext-page=\\"settings\\">{{extensionName}} ayarlarında</a> <b>\\"QR Kodlarını Görüntüle\\"</b> öğesinin etkinleştirildiğinden emin olun. Bazı indirme seçeneklerinde \\"QR Kodunu Al\\" simgesi&nbsp;<!--[img-qr-code]--> bulunur; bu simgeyi tıkladığınızda telefonunuz veya tabletiniz için bir QR kodu ve talimatlar görürsünüz.","services":["gv","gvOk"]}],"social_media_sharing":{"mediafile":"mediaafile","mediafile_plural":"mediaafiles","screenshot":"ekran görüntüsü","screenshot_plural":"ekran görüntüleri","title":"Bir dakika lütfen!","already_moreThanOneMediafile":"zaten","button_ok":"Arkadaşlarınızla paylaşın","asking_for_review_by_downloads":"{{downloadsCount}} $t(social_media_sharing.mediafile) dosyasını başarıyla indirdiniz.<5 /> İnceleme için minnettar oluruz ve <7>5 yıldız</7> ;)<9 />Geliştirme açısından gerçekten önemli .","asking_for_review_by_screenshots":"Başarıyla {{screenshotsCount}} $t(social_media_sharing.screenshot) kazandınız.<5 /> İnceleme ve <7>5 yıldız</7> için minnettar oluruz;)<9 />Geliştirme açısından gerçekten önemli .","button_rate":"Değerlendirme","help_extension_to_get_better":"{{extensionName}} Adlı kişinin daha iyi olmasına yardım edin!","button_cancel_rate":"Şimdi olmaz","message":"<0>Tarayıcı uzantımızla {{already}} <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :) Indirdiniz</0><1> {{extensionName}}\'ı özgür tutmak için yardımınıza ihtiyacımız var; sosyal ağlarda veya mesajlaşma programlarında bizden bahsedin!</1>","button_cancel":"Şimdi olmaz"},"auto_detect":"Otomatik Algılama","download":"İndir","live_stream":"Canlı Yayın","live_stream_tooltip":"Canlı Yayınları henüz indiremezsiniz, ancak üzerinde çalışıyoruz :)","protected":"Korumalı","protected_tooltip":"Bu videoyu indiremezsiniz, telif hakkı ile korunmaktadır.","premiere":"Premiere","premiere_tooltip":"Henüz indirilecek bir şey yok :)","video":"Video","audio":"Audio","music":"Müzik","selectFormat":"Uygun formatı seçin","return_to_the_previous_screen":"Geri","confirm_conversion_title":"Seçilen dosya formatı dönüştürme gerektiriyor!","confirm_conversion_message":"Dönüşüm, bilgisayar kaynaklarını aktif olarak kullanır ve bu da diğer sekmeler de dahil olmak üzere tarayıcı hızında geçici bir yavaşlamaya neden olabilir.","do_not_show_on_load":"Açılışta gösterme","cancel":"İptal","continue":"Devam et","formats_for_download":"Yükleme seçenekleri","all_formats_for_download":"Mevcut tüm formatlar","more_formats":"Daha fazla format","conversion_required":"сdönüşüm gerekli","conversion_time":"сdönüşüm ~{{conversionTime}}","download_via_web_portal":"Gerekli formatı şu adresten indirin {{webPortalHostname}}","download_via_web_portal_tooltip":"Üzerinden indirin {{webPortalHostname}}","download_using_desktop_client_tooltip":"Kullanarak indirin {{desktopClientName}}","qr_code_tooltip":"QR Kodu Alın","copy_link_to_clipboard_tooltip":"Bağlantıyı panoya kopyala","copy_link_to_clipboard_notification_message":"Panoya kopyalanan bağlantı","active_download_warning_notification_message":"Her şey kontrol altında!","active_download_warning_notification_description":"Sayfayı aktif bir indirme ile terk ettiniz, arka planda devam edecektir.","cancel_download":"İndirme/dönüştürmeyi iptal et","take_screenshot_tooltip":"Ekran görüntüsü alın","drop_us_a_line":"Bir cevap bulamadınız mı? Bize bir satır bırakın ;)","help":"Yardım","download_using_desktop_client":"Gerekli formatı şu adresten indirin {{desktopClientName}}","qr_code_title":"Mobil cihaz için QR kodu","qr_code_description":"Doğrudan indirme bağlantısını akıllı telefonunuza veya tabletinize göndermek kolaydır - sadece bir QR kod tarayıcısı başlatın ve yukarıdaki resmin üzerine gelin.","qr_code_error":"QR kodu hizmeti şu an için kullanılamıyor. Lütfen daha sonra tekrar deneyin.","show_yandex_market_adviser":"Göster Yandex.Market Adviser - en iyi fırsatlar fiyat karşılaştırma widget\'ını göster","warning":"Dikkat!","yandex_market_adviser_notification_description":"Değişiklikler, sayfa Yandex.Market Adviser widget\'ı ile yeniden yüklendikten sonra geçerli olacaktır.","direct_links_unavailable":"Doğrudan bağlantılar geçici olarak kullanılamıyor. <a data-webext-function=\\"reload\\">Sayfayı yeniden yüklemeyi</a> deneyin (F5 tuşu)","day":"g","hour":"s","minute":"dak","second":"san","reset":"Sıfırla","download_error":"Dosya indirme sırasında bir hata oluştu. İndirilebilecek dosya biçimleri listesine geri dönmek için Sıfırla düğmesine tıklayın.","data_consents":{"title":"Veri toplama ve işleme onay formu","description":"İzin talebi","checkbox_eula":"<a href=\\"{{eulaUrl}}\\" target=\\\\\\\\\\"_blank\\\\\\\\\\">Lisans sözleşmesini</a> kabul ediyorum","checkbox_settings":"<a data-webext-page=\\"data-consents-settings\\">gizlilik ayarlarını</a> kabul ediyorum","checkbox_statistics":"İstatistiksel verilerin saklanmasını ve işlenmesini kabul ediyorum","checkbox_statistics_hint":"İndirmelerle ilgili istatistikler (içerik özellikleri, seçilen formatlar), arayüz öğeleriyle etkileşime ilişkin veriler, uzantının ve bireysel modüllerinin performansına ilişkin ölçümler","checkbox_technical":"Teknik verilerin saklanmasını ve işlenmesini kabul ediyorum","checkbox_technical_hint":"Hatalar, oynatılan içerik, kullanılan modüllerin sürümleri, gerçekleştirilen işlemlerin süresi ve verimliliği, kullanıcı cihazı yapılandırması hakkında anonimleştirilmiş veriler","disagree":"Reddediyorum ({{extensionName}} öğesini kaldırın)","agree":"Katılıyorum, devam et","description_technical":"<strong>teknik veriler</strong>: tarayıcı ailesi ve sürümü, medya çıkarma yöntemi (bir video hizmetine özgü).","description_browsing":"<strong>tarama etkinliği verileri</strong>: Çevrimiçi video oynatıcıların URL\'leri, kurulum kimlikleri;","button_disablestats":"Hiçbir şey paylaşmayın","button_techstats":"Teknik verileri paylaşın","button_fullstats":"Teknik ve gezinme etkinliği verilerini paylaşın","description_request":"{{extensionName}}\'nı desteklemek amacıyla aşağıdaki verileri toplamak için izninize ihtiyacımız var:"},"conflict_extensions":"Multimedya dosyalarını indirmeye yönelik bir <b>{{competitorsDetection}}</b> uzantısı algılandı. Aynı anda birden fazla tarayıcı uzantısını çalıştırmak tarayıcınızın <b>kilitlenmesine</b> neden olabilir.","active_download_warning_on_leave":"Gerçekten kapatmak istiyor musun?","competitors":{"i_understand_risks":"Risklerin farkındayım","how_to_solve_this_problem":"Bu sorunu nasıl çözebilirim?"}}');
;// CONCATENATED MODULE: ./src/i18n/uk/translation.json
const uk_translation_namespaceObject = JSON.parse('{"help_articles":[{"article":"Ви можете скачати формат за замовчуванням натиснувши кнопку <b>{{extensionName}}</b> під відео. Або обрати будь-який інший формат зі списку.","title":"Як тут скачати?"},{"article":"Найкраща якість доступна в <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> та <b>8K (4320p)</b>. Загальна рекомендація така: що вища роздільна здатність екрана, то кращою має бути якість відео. Однак ви також повинні враховувати інші фактори: швидкість скачування, кількість вільного місця та продуктивність пристрою під час відтворення.","title":"Який формат мені обрати?"},{"article":"Браузер/комп\'ютер не повинен повністю зависати! Якщо таке трапиться, повідомте про це через форму зворотного зв\'язку, вказавши посилання на відео. На жаль, деякі формати відео не можна завантажити безпосередньо з {{onlineVideoPlatform}}. Тому ми додали можливість конвертувати невеликі онлайн-відео в потрібний формат у <b>{{extensionName}}</b>. У деяких випадках цей процес занадто активно використовує ресурси комп\'ютера.","title":"Чому браузер/комп\'ютер зависає під час скачування?"},{"article":"Через технічні особливості {{onlineVideoPlatform}}, відео в деяких форматах не можна скачати безпосередньо. Тому <b>{{extensionName}}</b> додана можливість онлайн-конвертації невеликих відео в потрібний формат. Великі відео (тривалі та/або високої якості) вимагають для онлайн-конвертації занадто багато ресурсів, що часом призводить до зависання браузера/комп\'ютера. Тому їх пропонується скачувати через <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} для Windows</a></b>.","title":"Чому я не можу скачати відео безпосередньо в потрібному форматі?"},{"article":"Пряме посилання для завантаження доступне лише для тих форматів, які не потребують конвертації. Для цього клікніть піктограму&nbsp;<!--[img-copy]--> у рядку з відповідним параметром завантаження, а потім вставте його як текст, де потрібно.","title":"Як отримати посилання для завантаження відео/аудіо?"},{"article":"Досить обрати відповідний варіант завантаження, який можна визначити за значком&nbsp;<!--[img-fps-60]-->. Однак такі варіанти доступні не завжди. По-перше, вихідне відео повинно мати принаймні 60 FPS. Також воно має бути доступним для перегляду в плеєрі {{onlineVideoPlatform}} із частотою 60 FPS.","title":"Як скачати відео із 60 fps?"},{"article":"На жаль, зараз неможливо скачати безпосередньо формат MP3. {{onlineVideoPlatform}} не підтримує його, і необхідна онлайн-конверсія нестабільна. Використовуйте наш <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} для Windows</a></b>, який може конвертувати відеофайли в MP3. Або виберіть будь-який інший аудіоформат зі списку (позначений піктограмою&nbsp;<!--[img-sound-on]-->).","title":"Як скачати звукову доріжку (музику) в MP3?"},{"article":"Переконайтеся, що в <a data-webext-page=\\"settings\\">налаштуваннях</a> є прапорець навпроти пункту <b>\\"Показувати кнопку скріншоту для відео\\"</b>. У нижньому правому куті плеєра ліворуч від значка <b>\\"Налаштування\\"</b>, має з’явитися значок <b>\\"Зробити знімок екрана\\"</b> &nbsp;<!--[img-camera]-->, за кліком на який на ваш комп’ютер буде збережено поточний кадр із відео у форматі jpeg.","services":["gv","ok"],"title":"Як зробити скріншот?"},{"article":"Ви можете обрати стиль кнопки в <a data-webext-page=\\"settings\\">налаштуваннях</a>: <ul><li><b>сучасний</b> (інтерфейс з’являється при наведенні курсора)</li ><li><b>класичний</b> (інтерфейс з’являється при натисканні)</li></ul>","title":"Як відображати інтерфейс при натисканні кнопки завантаження, а не при наведенні на неї курсора?"},{"services":["gv","gvOk"],"article":"За допомогою QR-кодів ви можете отримати пряме посилання на відео чи аудіо з будь-якого пристрою з камерою. Переконайтеся, що в <a data-webext-page=\\"settings\\">налаштуваннях {{extensionName}}</a> увімкнено пункт <b>\\"Відображати QR-коди\\"</b>. Деякі параметри завантаження матимуть піктограму «Отримати QR-код»&nbsp;<!--[img-qr-code]-->, натиснувши яку, ви побачите QR-код та інструкції для свого телефону чи планшета.","title":"Навіщо потрібні QR-коди?"}],"modal_asking_for_review":"Будемо вдячні за відгук і <b>5 зірок</b> ;)<br>Це дійсно важливо для розвитку.","second":"сек","minute":"хв","hour":"г","day":"д","direct_links_unavailable":"Прямі посилання тимчасово недоступні. Спробуйте <a data-webext-function=\\"reload\\">оновити сторінку</a> (клавіша F5)","plural_video":"відеоролик,відеоролика,відеороликів","already":"вже","yandex_market_adviser_notification_description":"Зміни набудуть чинності після перезавантаження сторінки з віджетом Яндекс.Радника.","warning":"Увага!","show_yandex_market_adviser":"Відображати Яндекс.Радник - віджет порівняння цін для вигідних покупок","qr_code_error":"Сервіс QR-кодів наразі недоступний. Будь-ласка спробуйте пізніше.","qr_code_description":"Легко надіслати пряме посилання для завантаження на свій смартфон або планшет – просто запустіть сканер QR-коду та наведіть його на зображення вище.","qr_code_title":"QR-код для мобільного пристрою","help":"Допомога","drop_us_a_line":"Не знайшли відповіді? Напишіть нам ;)","take_screenshot_tooltip":"Зробити скріншот","cancel_download":"Відмінити завантаження/конвертацію","active_download_warning_notification_description":"Ви залишили сторінку з активним завантаженням, воно триватиме у фоновому режимі.","active_download_warning_notification_message":"Все під контролем!","copy_link_to_clipboard_notification_message":"Посилання скопійоване до буфера обміну","copy_link_to_clipboard_tooltip":"Копіювати посилання","qr_code_tooltip":"Отримати QR-код","download_using_desktop_client_tooltip":"Скачати за допомогою {{desktopClientName}}","download_using_desktop_client":"Скачати бажаний формат за допомогою {{desktopClientName}}","download_via_web_portal_tooltip":"Скачати через {{webPortalHostname}}","download_via_web_portal":"Скачати бажаний формат через {{webPortalHostname}}","conversion_time":"конвертація ~{{conversionTime}}","conversion_required":"потребує конвертації","more_formats":"Більше форматів","all_formats_for_download":"Всі доступні формати","formats_for_download":"Формати для завантаження","continue":"Продовжити","cancel":"Відміна","do_not_show_on_load":"Не показувати під час скачування","confirm_conversion_message":"Конвертація активно використовує ресурси комп\'ютера, що може спричинити тимчасове зниження швидкості роботи браузера, у тому числі й у інших вкладках.","confirm_conversion_title":"Обраний формат файлу потребує конвертації!","settings":{"title":"Налаштування","show_formats_available_via_desktop_client":"Показати формати, доступні за допомогою {{desktopClientName}}","show_formats_required_online_conversion":"Показати формати, які потребують онлайн-конверсії","show_webm":"Відображати відео у форматі WebM","show_snapshot_button":"Відображати кнопку скріншоту відео","warn_before_converting":"Попереджати перед конвертацією","title_app_button_style":"Стиль кнопки","app_button_style_modern":"Сучасний (інтерфейс з\'являється при наведенні)","app_button_style_classic":"Класичний (інтерфейс з\'являється при натисканні)","display_qr_codes":"Відображати QR-коди","privacy":"Відкрити налаштування конфіденційності {{extensionName}}"},"return_to_the_previous_screen":"Назад","premiere_tooltip":"Поки що нічого завантажувати :)","video":"Відео","audio":"Аудіо","music":"Музика","selectFormat":"Оберіть потрібний формат","premiere":"Прем\'єра","live_stream_tooltip":"Ви поки що не можете скачувати прямі трансляції, але ми працюємо над цим :)","live_stream":"Пряма трансляція","download":"Завантажити","auto_detect":"Автовизначення","language":"Мова","languageName":"Українська","social_media_sharing":{"asking_for_review_by_screenshots":"Ви успішно зробили {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 /> Ми будемо вдячні за відгук і <7>5 зірочок</7> ;)<9 />Це дуже важливо для розвитку.","help_extension_to_get_better":"Допоможіть {{extensionName}} стати краще!","button_rate":"Оцінити","button_cancel_rate":"Не зараз","screenshot_plural":"скріншоти","screenshot_0":"скріншот","screenshot_1":"скріншоти","screenshot_2":"скріншотів","asking_for_review_by_downloads":"Ви успішно скачали {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> Ми будемо вдячні за відгук і <7>5 зірок</7> ;)<9 />Це дуже важливо для розробки .","button_cancel":"Не зараз","button_ok":"Поділитися з друзями","message":"<0>За допомогою нашого розширення для браузера ви {{already}} скачали <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1> Щоб {{extensionName}} залишався безкоштовним, нам потрібна ваша допомога – розкажіть про нас у соціальних мережах або месенджерах!</1>","already_moreThanOneMediafile":"вже","mediafile_plural":"медіафайли","mediafile_0":"медіафайл","mediafile_1":"медіафайли","mediafile_2":"медіафайлів","title":"Хвилинку уваги!","already_oneMediafile":""},"download_error":"Під час завантаження файлу сталася помилка. Щоб повернутися до списку форматів файлів, доступних для завантаження, натисніть кнопку \\"Скинути\\".","reset":"Скинути","protected_tooltip":"Ви не можете скачати це відео, воно захищено авторським правом.","protected":"Захищено","data_consents":{"description":"Запит дозволу на отримання даних","checkbox_eula":"Я згоден з <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">ліцензійною угодою</a>","checkbox_settings":"Я згоден з <a data-webext-page=\\"data-consents-settings\\">парамертами конфіденційності</a>","checkbox_statistics":"Я згоден зі зберіганням та обробкою статистичних даних","checkbox_statistics_hint":"Статистика завантажень (характеристики контенту, вибрані формати), дані про взаємодію з елементами інтерфейсу, метрики працездатності розширення та його окремих модулів","checkbox_technical":"Я згоден зі зберіганням та обробкою технічних даних","checkbox_technical_hint":"Знеособлені дані про помилки, відтворюваний контент, версії модулів що використовуються, тривалість та успішність виконуваних операцій, конфігурацію пристрою користувача","disagree":"Я відмовляюся (видалити {{extensionName}})","agree":"Я згоден, продовжити","title":"Згода зі збором та обробкою даних","description_request":"Нам потрібен ваш дозвіл на збір наступних даних для підтримки {{extensionName}}:","description_browsing":"<strong>дані про браузерну активність</strong>: URL-адреси онлайн-відеоплеєрів, ідентифікатори інсталяцій;","description_technical":"<strong>технічні дані</strong>: тип і версія браузера, спосіб отримання медія (специфічний для відеосервісу).","button_techstats":"Надавати технічні дані","button_disablestats":"Нічого не надавати","button_fullstats":"Надавати технічні дані та дані про браузерну активність"},"conflict_extensions":"Виявлено розширення <b>{{competitorsDetection}}</b> для завантаження мультимедійних файлів. Одночасна робота кількох браузерних розширень може призвести <b>до збоїв</b> у роботі вашого браузера.","selectLanguage":"Оберіть мову","changeLanguage":"змінити","active_download_warning_on_leave":"Ви дійсно хочете закрити вкладку?","competitors":{"how_to_solve_this_problem":"Як я можу вирішити цю проблему?","i_understand_risks":"Я усвідомлюю ризики"}}');
;// CONCATENATED MODULE: ./src/i18n/vi/translation.json
const vi_translation_namespaceObject = JSON.parse('{"help":"Cứu giúp","qr_code_title":"MÃ QR cho thiết bị di động","social_media_sharing":{"mediafile":"Tập tin phương tiện","button_ok":"Chia sẻ với bạn bè","screenshot":"Ảnh chụp màn hình","title":"Một khoảnh khắc của sự chú ý!","already_moreThanOneMediafile":"đã","message":"<0>Sử dụng tiện ích mở rộng trình duyệt của chúng tôi, bạn đã tải xuống {{already}} <3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1>để {{extensionName}} được tự do, chúng tôi cần sự giúp đỡ của bạn — hãy cho chúng tôi biết về chúng tôi trên mạng xã hội hoặc sứ giả!</1>","button_cancel":"Thật khó cho tôi để làm điều đó bây giờ","button_cancel_rate":"Không phải bây giờ","button_rate":"Ước tính","help_extension_to_get_better":"Giúp {{extensionName}} trở nên tốt hơn!","asking_for_review_by_downloads":"Bạn đã tải xuống thành công {{downloadsCount}} $t(social_media_sharing.mediafile).<5 /> Chúng Tôi sẽ biết ơn phản hồi và <7> 5 sao</7> ;)<9 />Điều này thực sự quan trọng đối với sự phát triển.","asking_for_review_by_screenshots":"Bạn đã Thực hiện thành công {{screenshotsCount}} $t(social_media_sharing.screenshot).<5 /> Chúng Tôi sẽ biết ơn phản hồi và < 7 > 5 sao</7> ;)<9 />Điều này thực sự quan trọng đối với sự phát triển."},"language":"Ngôn ngữ","languageName":"Tiếng Việt","selectLanguage":"Chọn ngôn ngữ","changeLanguage":"để thay đổi","auto_detect":"Tự động phát hiện","download":"Tải về","live_stream":"Phát sóng","live_stream_tooltip":"Chương trình phát sóng chưa thể được tải xuống, nhưng chúng tôi đã làm việc với nó :)","protected":"Bảo vệ","protected_tooltip":"Bạn không thể tải xuống video này, nó có bản quyền.","premiere":"Ra mắt","premiere_tooltip":"Cho đến nay, không có gì để tải xuống :)","video":"Video","audio":"Âm thanh","music":"Âm nhạc","selectFormat":"Chọn định dạng phù hợp","return_to_the_previous_screen":"Trở lại","settings":{"title":"Cài đặt","show_formats_available_via_desktop_client":"Định dạng hiển thị có sẵn thông qua {{desktopClientName}}","show_formats_required_online_conversion":"Các định dạng hiển thị yêu cầu chuyển đổi trực tuyến","show_webm":"Hiển thị video ở định dạng WebM","show_snapshot_button":"Hiển thị nút để lưu ảnh chụp màn hình từ video","warn_before_converting":"Cảnh báo khi chuyển đổi","title_app_button_style":"Xuất hiện nút","app_button_style_modern":"Hiện đại (giao diện được hiển thị khi di chuột)","app_button_style_classic":"Cổ điển (giao diện được hiển thị khi nhấp vào)","display_qr_codes":"Hiển THỊ MÃ QR","privacy":"Mở Cài Đặt Quyền Riêng tư {{extensionName}}"},"confirm_conversion_title":"Định dạng tệp đã chọn yêu cầu chuyển đổi!","confirm_conversion_message":"Chuyển đổi tích cực sử dụng tài nguyên máy tính, có thể làm giảm tạm thời tốc độ của trình duyệt, bao gồm cả trong các tab khác.","do_not_show_on_load":"Không hiển thị khi tải","cancel":"Hủy bỏ","continue":"Tiếp tục","formats_for_download":"Tùy Chọn Tải Xuống","all_formats_for_download":"Tất cả các định dạng có sẵn","more_formats":"Nhiều định dạng hơn","conversion_required":"cần chuyển đổi","conversion_time":"chuyển đổi ~ {{conversionTime}}","download_via_web_portal":"Tải xuống ở định dạng mong muốn thông qua {{webPortalHost name}}","download_via_web_portal_tooltip":"Tải về thông qua {{webPortalHostname}}","download_using_desktop_client":"Tải xuống ở định dạng mong muốn thông qua {{desktopClientName}}","download_using_desktop_client_tooltip":"Tải về sử dụng {{desktopClientName}}","qr_code_tooltip":"Nhận mã QR","copy_link_to_clipboard_tooltip":"Sao Chép Liên Kết","copy_link_to_clipboard_notification_message":"Liên kết được sao chép vào khay nhớ tạm","active_download_warning_notification_message":"Mọi thứ đều được kiểm soát!","active_download_warning_notification_description":"Bạn đã rời khỏi trang với một tải xuống đang hoạt động, nó sẽ tiếp tục trong nền.","cancel_download":"Ngừng tải xuống/chuyển đổi","take_screenshot_tooltip":"Lưu Khung","drop_us_a_line":"Không tìm thấy câu trả lời? Viết thư cho chúng tôi ;)","help_articles":[{"title":"Làm thế nào để tải về ở đây?","article":"Bạn có thể sử dụng định dạng mặc định bằng cách nhấp vào <b>{{extensionName}}</b> trong video. Hoặc nhấp vào định dạng mong muốn trong danh sách có sẵn để tải xuống."},{"title":"Tôi nên chọn định dạng video nào?","article":"Các định dạng chất lượng tốt nhất là <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> và <b>8K (4320p)</b>. Khuyến nghị chung là độ phân giải màn hình của bạn càng cao thì chất lượng video càng tốt. Tuy nhiên, bạn cũng nên xem xét các yếu tố khác: tốc độ tải xuống, dung lượng trống, cũng như hiệu suất của thiết bị khi chơi."},{"title":"Tại sao trình duyệt/máy tính bị đóng băng khi tải?","article":"Trình duyệt/máy tính không nên đóng băng hoàn toàn! Nếu điều này đã xảy ra, vui lòng báo cáo thông qua biểu mẫu phản hồi, chỉ định liên kết đến video. Thật không may, video ở một số định dạng không thể được tải xuống trực tiếp từ {{onlineVideoPlatform}}. Do đó, chúng tôi đã thêm vào <b>{{extensionName}}</b> khả năng chuyển đổi video nhỏ trực tuyến sang định dạng mong muốn. Trong một số trường hợp, quá trình này sử dụng tài nguyên máy tính quá tích cực."},{"title":"Tại sao tôi không thể tải xuống video ở định dạng mong muốn trực tiếp?","article":"Do các tính năng kỹ thuật của {{onlineVideoPlatform}}, video ở một số định dạng không thể được tải xuống trực tiếp. Do đó, trong <b>{{extensionName}}</b>, khả năng chuyển đổi video nhỏ trực tuyến sang định dạng mong muốn đã được thêm vào. Video lớn (dài và/hoặc chất lượng cao) yêu cầu quá nhiều tài nguyên để chuyển đổi trực tuyến, đôi khi dẫn đến đóng băng trình duyệt/máy tính. Do đó, bạn nên tải chúng xuống qua <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} cho Windows</a></b>."},{"title":"Làm cách nào để có được liên kết video/âm thanh?","article":"Một liên kết trực tiếp đến tệp chỉ khả dụng cho các định dạng không yêu cầu chuyển đổi. Để thực hiện việc này, hãy nhấp vào biểu tượng&nbsp;<!--[img-copy]--> trong dòng với tùy chọn tải xuống thích hợp. Và sau đó dán nó dưới dạng văn bản khi cần thiết."},{"title":"Làm thế nào để tải xuống video với 60 KHUNG hình / GIÂY?","article":"Chỉ cần chọn tùy chọn tải xuống thích hợp là đủ — bạn có thể xác định nó bằng biểu tượng&nbsp;<!--[img-fps-60]-->. Tuy nhiên, các tùy chọn như vậy không phải lúc nào cũng có sẵn. Trước hết, bản thân video nguồn phải có tốc độ khung hình ít nhất là 60. Và nó sẽ có sẵn để xem trong trình phát {{onlineVideoPlatform}} với 60 KHUNG hình / GIÂY."},{"title":"Làm cách nào để tải bản âm thanh (nhạc) xuống MP3?","article":"Thật không may, hiện tại không thể tải xuống trực tiếp ở định dạng MP3 — {{onlineVideoPlatform}} không hỗ trợ và chuyển đổi trực tuyến cần thiết là không ổn định. Sử dụng <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} cho Windows</a></b>, hỗ trợ chuyển đổi video sang định dạng MP3. Hoặc chọn một trong các định dạng âm thanh thay thế từ danh sách (được biểu thị bằng biểu tượng&nbsp;<!--[img-sound-on]-->)."},{"title":"Làm cách nào để lưu khung hình từ video?","services":["gv","ok"],"article":"Đảm bảo rằng trong <a data-webext-page=\\"settings\\">cài đặt</a>, mục <b>\\"Hiển thị nút để lưu ảnh chụp màn hình từ video\\"</b> được đánh dấu. Ở góc dưới bên phải của trình phát ở bên trái biểu tượng <b>\\"Cài đặt\\"</b>, một biểu tượng sẽ xuất hiện&nbsp;<!--[img-camera]-->, bằng cách nhấp vào khung hình hiện tại từ video sẽ được lưu vào máy tính của bạn ở định dạng jpeg."},{"title":"Làm cách nào để hiển thị giao diện bằng cách nhấp vào nút tải xuống chứ không phải bằng cách di chuột qua nó?","article":"Trong <a data-webext-page=\\"settings\\">Cài đặt</a> bạn có thể chọn giao diện của nút: <ul><li><b>Hiện đại</b> (giao diện được hiển thị khi di chuột)</li><li><b>Cổ điển</b> (giao diện được hiển thị khi nhấp vào)</li></ul>"},{"title":"Tại sao tôi cần MÃ QR?","services":["gv","gvOk"],"article":"Với MÃ QR, bạn có thể nhận được một liên kết trực tiếp đến video hoặc âm thanh trên bất kỳ thiết bị nào có camera. Đảm bảo rằng trong <a data-webext-page=\\"settings\\">cài đặt {{extensionName}}</a>, mục <b>\\"Hiển thị MÃ QR\\"</b> được bật. Một số tùy chọn tải xuống sẽ có biểu tượng&nbsp;<!--[img-qr-code]-->, bằng cách nhấp vào đó bạn sẽ thấy mã QR và hướng dẫn cho điện thoại hoặc máy tính bảng của mình."}],"qr_code_description":"Giờ đây, thật dễ dàng để gửi liên kết tải xuống trực tiếp đến điện thoại thông minh hoặc máy tính bảng của bạn — khởi chạy TRÌNH quét mã QR và di chuột qua hình ảnh ở trên.","qr_code_error":"DỊCH vụ MÃ QR hiện không khả dụng. Hãy thử lại sau.","show_yandex_market_adviser":"Hiển thị Yandex.Expert Advisor-tiện ích so sánh giá để mua hàng có lợi nhuận","warning":"Chú ý!","yandex_market_adviser_notification_description":"Các thay đổi sẽ có hiệu lực sau khi trang có tiện ích Yandex được tải lại.Cố vấn.","day":"ngày","hour":"giờ","minute":"phút","second":"thứ hai","reset":"Đặt lại","download_error":"Một lỗi xảy ra trong quá trình tải lên tệp cuối cùng. Để quay lại danh sách các định dạng tải xuống, nhấp vào nút \\"Đặt lại\\".","data_consents":{"title":"Đồng ý thu thập và xử lý dữ liệu","description":"Yêu cầu quyền","checkbox_statistics":"Tôi cho phép lưu trữ và xử lý dữ liệu thống kê","checkbox_statistics_hint":"Thống kê tải xuống (đặc điểm nội dung, định dạng đã chọn), dữ liệu về tương tác với các phần tử giao diện, số liệu về chức năng của tiện ích mở rộng và các mô-đun riêng lẻ của nó","checkbox_technical":"Tôi cho phép lưu trữ và xử lý dữ liệu kỹ thuật","checkbox_technical_hint":"Dữ liệu lỗi ẩn danh, nội dung có thể tái tạo, phiên bản mô-đun được sử dụng, thời lượng và thành công của các hoạt động được thực hiện, cấu hình thiết bị người dùng","disagree":"Tôi từ chối (xóa {{extensionName}})","agree":"Tôi đồng ý tiếp tục","checkbox_settings":"Tôi đồng ý với <a data-webext-page=\\"data-consents-settings\\">cài đặt quyền riêng tư</a>","checkbox_eula":"Tôi chấp nhận <a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">thỏa thuận cấp phép</a>","description_request":"Chúng tôi cần sự cho phép của bạn để thu thập dữ liệu sau đây để duy trì {{extensionName}}:","description_browsing":"<strong>Duyệt dữ liệu hoạt động</strong>: URL của trình phát video trực tuyến, ID cài đặt;","description_technical":"<strong>Dữ liệu kỹ thuật</strong>: Loạt và phiên bản trình duyệt, phương pháp trích xuất phương tiện (cụ thể cho dịch vụ video).","button_disablestats":"Không gửi gì cả","button_techstats":"Gửi dữ liệu kỹ thuật","button_fullstats":"Gửi dữ liệu hoạt động kỹ thuật và duyệt web"},"direct_links_unavailable":"Liên kết trực tiếp tạm thời không có sẵn. Hãy thử <a data-webext-function=\\"reload\\">để tải lại trang</a> (phím F5)","conflict_extensions":"Tìm thấy phần mở rộng <b>{{competitorsDetection}}</b> để tải xuống các tệp đa phương tiện. Hoạt động đồng thời của một số tiện ích mở rộng trình duyệt có thể <b>gây ra sự cố</b> trong trình duyệt của bạn.","active_download_warning_on_leave":"Bạn có thật sự muốn đóng cửa không?","competitors":{"i_understand_risks":"Tôi hiểu những rủi ro","how_to_solve_this_problem":"Làm sao giải quyết vấn đề này?"}}');
;// CONCATENATED MODULE: ./src/i18n/zh/translation.json
const zh_translation_namespaceObject = JSON.parse('{"language":"语言","languageName":"中文","auto_detect":"自动检测","download":"下载","live_stream":"流直播","live_stream_tooltip":"您还不能下载流直播，但我们正在努力 :)","premiere":"首播","premiere_tooltip":"还没有什么可以下载的 :)","video":"视频","audio":"音频","music":"音乐","selectFormat":"选择您感兴趣的格式","return_to_the_previous_screen":"上一页","settings":{"title":"设置","show_formats_available_via_desktop_client":"显示格式可使用通过 {{desktopClientName}}","show_formats_required_online_conversion":"显示需要在线转换的格式","show_webm":"显示以 WebM 格式的视频","show_snapshot_button":"显示视频截图按键","warn_before_converting":"转换前警告","title_app_button_style":"按键样式","app_button_style_modern":"现代（界面是通过鼠标悬停出现的）","app_button_style_classic":"经典（界面是在点击出现的）","display_qr_codes":"显示二维码","privacy":"打开 {{extensionName}} 的隐私设置"},"confirm_conversion_title":"选择的文件格式需要转换！","confirm_conversion_message":"转换使用硬件资源，这能导致暂时下降浏览器的速度，包括在其他标签中。","do_not_show_on_load":"加载时不要显示出来","cancel":"取消","continue":"继续","formats_for_download":"下载格式","all_formats_for_download":"所有下载格式","more_formats":"更多格式","conversion_required":"需要转换","conversion_time":"转换 ~{{conversionTime}}","download_via_web_portal":"通过 {{webPortalHostname}} 下载所需的格式","download_via_web_portal_tooltip":"通过 {{webPortalHostname}} 下载","download_using_desktop_client":"使用 {{desktopClientName}} 下载所需的格式","download_using_desktop_client_tooltip":"使用 {{desktopClientName}} 下载","qr_code_tooltip":"获取二维码","copy_link_to_clipboard_tooltip":"复制链接到剪贴板","copy_link_to_clipboard_notification_message":"将链接复制了到剪贴板","active_download_warning_notification_message":"一切按计划进行！","active_download_warning_notification_description":"您已离开活动下载的页面，它将在后台继续。","cancel_download":"取消下载/转换","take_screenshot_tooltip":"截图","drop_us_a_line":"没有找到答案？ 给我们留言 ;)","help":"帮助","help_articles":[{"title":"如何下载？","article":"您通过点击视频下方的 <b>{{extensionName}}</b> 按键能下载默认格式。还您可以在下拉列表中选择所需的格式。"},{"title":"我应该选择哪种视频格式？","article":"最高品质有下面的格式： <b>FullHD (1080p)</b>, <b>2K (1440p)</b>, <b>4K (2160p)</b> и <b>8K (4320p)</b>。一般建议是屏幕分辨率越高，就视频质量您需要好。 但是，您还要注意其他因素：下载速度、可用空间量以及机器设备性能。"},{"title":"为什么下载时浏览器/电脑会卡机？","article":"浏览器/电脑不应死机！如果发生这种情况，请通过反馈表跟我们留言，并注明视频链接。正可惜，某些视频格式无法直接从 {{onlineVideoPlatform}} 下载。因此，我们在 <b>{{extensionName}}</b> 中添加了可能性将小视频在线转换为所需格式。在某些情况下，此过程积极地使用电脑资源。"},{"title":"为什么我不能直接下载所需格式的视频？","article":"由于 {{onlineVideoPlatform}} 的某些技术特性，有些视频文件格式无法直接下载。因此，<b>{{extensionName}}</b> 有在线转换视频为所需格式的附加功能。大型视频（更长和/或最高清的）需要许多资源为在线转换，这有时会卡机您的浏览器/电脑。因此，建议通过 <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} 对 Windows</a></b> 下载这种的视频。"},{"title":"如何我能获得视频/音频下载链接？","article":"直接下载链接才适用于不需要转换的格式。 为此，请单击在适当下载选项的行中的图标&nbsp;<!--[img-copy]-->，然后在必要粘贴为文本。"},{"title":"如何下载 60帧的视频？","article":"选择相应的下载选项就行了，能识别通过图标&nbsp;<!--[img-fps-60]-->。 然而，这种选择并不总是可用的。首先，原始视频必须至少有 60帧的帧数。此外，它必须可以在{{onlineVideoPlatform}}播放器中以60帧速率观看。"},{"title":"如何下载MP3格式的音轨（音乐）？","article":"不幸的是，目前不可能直接下载MP3格式。{{onlineVideoPlatform}}不支持，而且所需的在线转换也不稳定。 使用我们的 <b><a href=\\"{{desktopClientUrl}}\\" target=\\\\\\"_blank\\\\\\">{{desktopClientName}} 为 Windows</a></b>，可以将视频文件转换为 MP3。或者从列表中选择任何其他音频格式（用图标&nbsp;<!--[img-sound-on]-->表示）。"},{"title":"如何进行屏幕截图？","article":"确保在<a data-webext-page=\\"settings\\">设置</a>中，在<b>\\"显示视频截图按键\\"</b>对面有一个复选框。在播放器右下角的<b>“设置”</b>图标左侧，应该出现<b>\\"截图\\"</b>图标&nbsp;<!--[img-camera]-->，通过单击它，视频中的当前帧将以jpeg格式保存到您的电脑上。","services":["gv","ok"]},{"title":"如何能在下载按键单击显示界面，而不是在悬停它上面？","article":"您可以在 <a data-webext-page=\\"settings\\">设置</a> 中选择一种按键风格：<ul><li><b>现代</b>（界面在鼠标悬停出现）</li ><li><b>经典</b>（界面在点击出现）</li></ul>"},{"title":"为什么您需要二维码？","article":"使用二维码，您可以在任何有照相机的设备上获得视频或音频的直接链接。 确保在<a data-webext-page=\\"settings\\">{{extensionName}}设置</a>中<b>“显示二维码”</b>项目是启用的。有些下载选项会有一个 \\"获取QR码 \\"的图标&nbsp;<!--[img-qr-code]-->，点击后您会看到一个二维码和为手机或平板电脑的说明。","services":["gv","gvOk"]}],"qr_code_title":"移动设备使用的二维码","qr_code_description":"将直接的下载链接发送到您的智能手机或平板电脑上很容易—只需将二维码扫描器启动而悬停在上面的图片上。","qr_code_error":"二维码服务暂时无法使用。请稍后再试。","show_yandex_market_adviser":"显示Yandex.Market Adviser - 是比较最优惠价格的小部件","warning":"注意！","yandex_market_adviser_notification_description":"这些变化将在重新加载Yandex.Market Adviser小部件页面后生效。","social_media_sharing":{"title":"请稍等片刻！","already_oneMediafile":"","already_moreThanOneMediafile":"已经","message":"<0>通过我们的浏览器扩展，您{{already}}下载了<3><0>{{downloadsCount}}</0></3> $t(social_media_sharing.mediafile) :)</0><1>为了保持{{extensionName}}的免费性，我们需要您的帮助—在社交网络或信使上介绍我们吧!</1>","button_ok":"与朋友分享","button_cancel":"不是现在","help_extension_to_get_better":"帮助{{extensionName}}变得更好！","button_rate":"打分","button_cancel_rate":"不要现在","asking_for_review_by_screenshots":"您已成功制作 {{screenshotsCount}} $t(social_media_sharing.screenshot)。<5 /> 我们将感谢您的评论和 <7>5 颗星</7> ;)<9 />这对开发非常重要 。","screenshot_plural":"截图","screenshot":"截图","asking_for_review_by_downloads":"您已成功下载 {{downloadsCount}} $t(social_media_sharing.mediafile)。<5 /> 感谢您的评价和 <7>5 颗星</7> ;)<9 />这对开发非常重要 。","mediafile_plural":"媒体文件","mediafile":"媒体文件"},"direct_links_unavailable":"直接的链接暂时不可用。 尝试<a data-webext-function=\\"reload\\">重新加载页面</a>（F5 键）","day":"天","hour":"小时","minute":"分钟","second":"秒","download_error":"文件下载过程中发生错误。 要返回可供下载的文件格式列表，请单击“重置”按钮。","reset":"重置","protected":"受保护","protected_tooltip":"您不能下载这个视频，它受版权保护。","data_consents":{"title":"数据收集和处理同意书","description":"接收数据的权限请求","checkbox_eula":"我同意<a href=\\"{{eulaUrl}}\\" target=\\\\\\"_blank\\\\\\">许可协议</a>条件","checkbox_settings":"我同意<a data-webext-page=\\"data-consents-settings\\">隐私设置</a>","checkbox_statistics":"我同意统计数据的存储和处理","checkbox_statistics_hint":"下载统计数据（内容特征、选择的格式）、与界面元素交互的数据、扩展及其各个模块的健康指标","checkbox_technical":"我同意技术数据的存储和处理","checkbox_technical_hint":"有关错误、正在播放的内容、使用的模块版本、执行操作的持续时间和有没有成功、用户设备配置的匿名数据","disagree":"我拒绝（删除 {{extensionName}}）","agree":"我同意，继续","description_request":"我们需要您的许可才能收集以下数据以维护 {{extensionName}}：","description_browsing":"<strong>浏览活动数据</strong>：在线视频播放器的URL、安装ID；","description_technical":"<strong>技术数据</strong>：浏览器系列和版本、媒体提取方法（特定于视频服务）。","button_disablestats":"不共享任何数据","button_techstats":"仅共享技术数据","button_fullstats":"共享技术和浏览活动的数据"},"conflict_extensions":"已检测到用于下载媒体文件的<b>{{competitorsDetection}}</b>扩展。 同时运行多个浏览器扩展会导致浏览器<b>出现故障</b>。","selectLanguage":"选择语言","changeLanguage":"改变","active_download_warning_on_leave":"您真的想关闭吗？","competitors":{"i_understand_risks":"我了解其中的风险","how_to_solve_this_problem":"如何解决这个问题呢？"}}');
;// CONCATENATED MODULE: ./src/i18n/resources.js
// It's generated code, don't try to change it, see /configs/src-generation/locales.js instead
/* eslint-disable camelcase */






























/* harmony default export */ const resources = ({

  bg: {
    translation: translation_namespaceObject,
  },

  cs: {
    translation: cs_translation_namespaceObject,
  },

  da: {
    translation: da_translation_namespaceObject,
  },

  de: {
    translation: de_translation_namespaceObject,
  },

  en: {
    translation: en_translation_namespaceObject,
  },

  es: {
    translation: es_translation_namespaceObject,
  },

  fi: {
    translation: fi_translation_namespaceObject,
  },

  fil: {
    translation: fil_translation_namespaceObject,
  },

  fr: {
    translation: fr_translation_namespaceObject,
  },

  ga: {
    translation: ga_translation_namespaceObject,
  },

  hi: {
    translation: hi_translation_namespaceObject,
  },

  id: {
    translation: id_translation_namespaceObject,
  },

  it: {
    translation: it_translation_namespaceObject,
  },

  ja: {
    translation: ja_translation_namespaceObject,
  },

  kk: {
    translation: kk_translation_namespaceObject,
  },

  ko: {
    translation: ko_translation_namespaceObject,
  },

  lt: {
    translation: lt_translation_namespaceObject,
  },

  my: {
    translation: my_translation_namespaceObject,
  },

  nl: {
    translation: nl_translation_namespaceObject,
  },

  pl: {
    translation: pl_translation_namespaceObject,
  },

  pt_BR: {
    translation: pt_BR_translation_namespaceObject,
  },

  ro: {
    translation: ro_translation_namespaceObject,
  },

  ru: {
    translation: ru_translation_namespaceObject,
  },

  sv: {
    translation: sv_translation_namespaceObject,
  },

  th: {
    translation: th_translation_namespaceObject,
  },

  tr: {
    translation: tr_translation_namespaceObject,
  },

  uk: {
    translation: uk_translation_namespaceObject,
  },

  vi: {
    translation: vi_translation_namespaceObject,
  },

  zh: {
    translation: zh_translation_namespaceObject,
  },

});
/* eslint-enable camelcase */

;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/i18n.js







/* REDUX */
const i18n_actionsTypes = {
  SET_I18N: "SET_I18N",
};

const i18n_actions = {
  setI18N: _i18n => ({ type: i18n_actionsTypes.SET_I18N, value: _i18n }),
};

const i18n_reducers = {
  [i18n_actionsTypes.SET_I18N]: (state, action) => ({ ...state, i18n: action.value }), // dependencies
};

const i18n_getSlice = store => ({
  setI18N: _i18n => store.dispatch(i18n_actions.setI18N(_i18n)),
});

const after = (store) => {
  const {
    module,
    lang,
    setI18N,
  } = store.getState();

  const { languages } = config;
  instance.use(initReactI18next) // passes i18n down to react-i18next
    .use(Browser)
    .init({
      compatibilityJSON: "v3",
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ["b", "br"],
      resources: resources,
      fallbackLng: "en",
      lng: lang === "autoDetect" && module && module.getLang ? module.getLang() : lang || "en", // TODO fix global options sync
      preload: languages,
      keySeparator: ".", // we use keys in form messages.welcome

      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });

  setI18N(instance);
};

/* harmony default export */ const i18n = ({
  actionsTypes: i18n_actionsTypes,
  actions: i18n_actions,
  reducers: i18n_reducers,
  getSlice: i18n_getSlice,
  after,
});

;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/info.js
/* REDUX */
const info_actionsTypes = {
  SET_INFO: "SET_INFO",
};

const info_actions = {
  setInfo: info => ({ type: info_actionsTypes.SET_INFO, value: info }),
};

const info_reducers = {
  [info_actionsTypes.SET_INFO]: (state, action) => /* recalculateList */ ({ ...state, info: action.value }), // TODO
};

const info_getSlice = store => ({
  setInfo: info => store.dispatch(info_actions.setInfo(info)),
});

/* harmony default export */ const keys_info = ({
  actionsTypes: info_actionsTypes,
  actions: info_actions,
  reducers: info_reducers,
  getSlice: info_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/is-webext-destroyed.js
/* REDUX */
const is_webext_destroyed_actionsTypes = {
  SET_IS_WEBEXT_DESTROYED: "SET_IS_WEBEXT_DESTROYED",
};

const is_webext_destroyed_actions = {
  setIsWebextDestroyed: isWebextDestroyed => ({ type: is_webext_destroyed_actionsTypes.SET_IS_WEBEXT_DESTROYED, value: isWebextDestroyed }),
};

const is_webext_destroyed_reducers = {
  [is_webext_destroyed_actionsTypes.SET_IS_WEBEXT_DESTROYED]: (state, action) => ({ ...state, isWebextDestroyed: action.value }),
};

const is_webext_destroyed_getSlice = store => ({
  setIsWebextDestroyed: value => store.dispatch(is_webext_destroyed_actions.setIsWebextDestroyed(value)),
});

/* harmony default export */ const is_webext_destroyed = ({
  actionsTypes: is_webext_destroyed_actionsTypes,
  actions: is_webext_destroyed_actions,
  reducers: is_webext_destroyed_reducers,
  getSlice: is_webext_destroyed_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/modals.js
/* REDUX */
const modals_actionsTypes = {
  ADD_MODAL: "ADD_MODAL",
  REMOVE_MODAL: "REMOVE_MODAL",
};

const modals_actions = {
  addModal: modal => ({
    type: modals_actionsTypes.ADD_MODAL,
    value: {
      ...modal,
      id: Math.random(),
    },
  }),
  removeModal: index => ({ type: modals_actionsTypes.REMOVE_MODAL, value: index }),
};

const modals_reducers = {
  [modals_actionsTypes.ADD_MODAL]: (state, action) => ({ ...state, modals: [action.value, ...state.modals] }),
  [modals_actionsTypes.REMOVE_MODAL]:
    (state, action) => ({ ...state, modals: state.modals.filter(modal => modal.id !== action.value) }),
};

const modals_getSlice = store => ({
  modals: [],
  addModal: value => store.dispatch(modals_actions.addModal(value)),
  removeModal: value => store.dispatch(modals_actions.removeModal(value)),
});

/* harmony default export */ const modals = ({
  actionsTypes: modals_actionsTypes,
  actions: modals_actions,
  reducers: modals_reducers,
  getSlice: modals_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/module.js
/* REDUX */
const module_actionsTypes = {
  SET_MODULE: "SET_MODULE",
};

const module_actions = {
  setModule: module => ({ type: module_actionsTypes.SET_MODULE, value: module }),
};

const module_reducers = {
  [module_actionsTypes.SET_MODULE]: (state, action) => ({ ...state, module: action.value }),
};

const module_getSlice = store => ({
  setModule: (module) => {
    store.dispatch(module_actions.setModule(module));

    const {
      i18n,
      setDir,
      setTheme,
      eventRouter,
    } = store.getState();

    const setLang = (...argv) => {
      try {
        i18n.changeLanguage(...argv);
      } catch (e) {
        // DO NOTHINHG
      }
    };
    const getLang = () => {
      /* eslint-disable no-shadow */
      const { lang } = store.getState();
      /* eslint-enable no-shadow */
      return lang;
    };
    if (module.startLangObserver) {
      module.startLangObserver(getLang, setLang);
    }

    const baseDir = module.getDir ? module.getDir() : "ltr";
    setDir(getLang() === "ar" ? "rtl" : baseDir);
    if (module.startDirObserver) {
      module.startDirObserver(setDir);
    }
    const _setTheme = () => {
      setTheme(module.getTheme ? module.getTheme() : "default");
      eventRouter.emit("themeChanged");
    };
    _setTheme();
    if (module.startThemeObserver) {
      module.startThemeObserver(_setTheme);
    }
  },
});

/* harmony default export */ const keys_module = ({
  actionsTypes: module_actionsTypes,
  actions: module_actions,
  reducers: module_reducers,
  getSlice: module_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/public-ids.js
/* REDUX */
const public_ids_actionsTypes = {
  ADD_PUBLIC_ID: "ADD_PUBLIC_ID",
};

const public_ids_actions = {
  addPublicId: id => ({ type: public_ids_actionsTypes.ADD_PUBLIC_ID, value: id }),
};

const public_ids_reducers = {
  [public_ids_actionsTypes.ADD_PUBLIC_ID]: (state, action) => ({ ...state, publicIds: { ...state.publicIds, [action.value.name]: action.value.id } }),
};

const public_ids_getSlice = store => ({
  publicIds: {},
  addPublicId: id => store.dispatch(public_ids_actions.addPublicId(id)),
});

/* harmony default export */ const public_ids = ({
  actionsTypes: public_ids_actionsTypes,
  actions: public_ids_actions,
  reducers: public_ids_reducers,
  getSlice: public_ids_getSlice,
});

;// CONCATENATED MODULE: ./src/utils/analytics/get-send-event.js



const getSendEvent = store => (
  async (data) => {
    const {
      defaultItem,
      hid,
      serviceName,
      utm,
    } = store.getState();
    const defData = {
      branch: config.branch,
      hash: config.hash,
      hid,
      project: config.extType,
      type: config.analyticsType,
      version: config.version,
      ...utm,
      format: defaultItem ? defaultItem.quality : "",
      media_source: window.location.href,
      service: serviceName,
      // format_high: "MAX_QUALITY"
    };
    try {
      const headers = [["Content-Type", "application/json; charset=utf-8"]];
      const body = JSON.stringify({ ...defData, ...data });
      network_sendPost(config.analyticsUrl, headers, body, true);
    } catch (e) {}
  }
);

/* harmony default export */ const get_send_event = (getSendEvent);

;// CONCATENATED MODULE: ./src/utils/analytics/get-send-event-ff.js


const get_send_event_ff_getSendEvent = store => (
  async (data) => {
    const {
      agreeWithProcessingStatisticalData,
      agreeWithProcessingTechnicalData,
      userAcceptedTerms,
    } = store.getState();

    if (!userAcceptedTerms) return;

    const { action } = data;

    if (!["updateInfo_failure", "download_error", "insert_snapshot_failure"].includes(action)) {
      if (!agreeWithProcessingStatisticalData) return;
    } else if (!agreeWithProcessingTechnicalData) return;

    const sendEventGeneral = get_send_event(store);
    sendEventGeneral(data);
  }
);

/* harmony default export */ const get_send_event_ff = (get_send_event_ff_getSendEvent);

;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/send-event.js
// TODO remove it fron redux store and use it only in event-listeners


/* REDUX */
const send_event_getSlice = store => ({
  sendEvent: get_send_event_ff(store),
});

/* harmony default export */ const send_event = ({
  getSlice: send_event_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/service-name.js
/* REDUX */
const service_name_actionsTypes = {
  SET_SERVICE_NAME: "SET_SERVICE_NAME",
};

const service_name_actions = {
  setServiceName: serviceName => ({ type: service_name_actionsTypes.SET_SERVICE_NAME, value: serviceName }),
};

const service_name_reducers = {
  [service_name_actionsTypes.SET_SERVICE_NAME]: (state, action) => ({ ...state, serviceName: action.value }),
};

const service_name_getSlice = store => ({
  setServiceName: serviceName => store.dispatch(service_name_actions.setServiceName(serviceName)),
});

/* harmony default export */ const service_name = ({
  actionsTypes: service_name_actionsTypes,
  actions: service_name_actions,
  reducers: service_name_reducers,
  getSlice: service_name_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/status.js
/* REDUX */
const status_actionsTypes = {
  SET_STATUS: "SET_STATUS",
};

const status_actions = {
  setStatus: status => ({ type: status_actionsTypes.SET_STATUS, value: status }),
};

const status_reducers = {
  [status_actionsTypes.SET_STATUS]: (state, action) => ({ ...state, status: action.value }),
};

const status_getSlice = store => ({
  status: "gettingInfo",
  setStatus: (status) => {
    const { eventRouter, status: oldValue } = store.getState();
    store.dispatch(status_actions.setStatus(status));
    eventRouter.emit("statusChanged", oldValue, status);
  },
});

/* harmony default export */ const keys_status = ({
  actionsTypes: status_actionsTypes,
  actions: status_actions,
  reducers: status_reducers,
  getSlice: status_getSlice,
});

;// CONCATENATED MODULE: ./src/themes/index.js
// const light = require("./debug.json");
const light = __webpack_require__(/*! ./light.json */ 929);

const dark = __webpack_require__(/*! ./dark.json */ 878);

const themes = {
  dark,
  default: light,
  light,
};
/* harmony default export */ const src_themes = (themes);

;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/theme.js

// const defaultValue = ???;
// const name = "theme";

/* REDUX */
const theme_actionsTypes = {
  SET_THEME: "SET_THEME",
};

const theme_actions = {
  setTheme: theme => ({ type: theme_actionsTypes.SET_THEME, value: theme }),
};

const theme_reducers = {
  [theme_actionsTypes.SET_THEME]: (state, action) => ({ ...state, theme: action.value }),
};

const theme_getSlice = store => ({
  setTheme: (theme) => {
    const { settingsTheme } = store.getState();
    if (!settingsTheme || settingsTheme.name !== theme) {
      store.dispatch(theme_actions.setTheme({
        name: theme,
        ...src_themes[theme],
      }));
    }
  },
});

/* harmony default export */ const theme = ({
  actionsTypes: theme_actionsTypes,
  actions: theme_actions,
  reducers: theme_reducers,
  getSlice: theme_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/locals/keys/title.js
/* REDUX */
const title_actionsTypes = {
  SET_TITLE: "SET_TITLE",
};

const title_actions = {
  setTitle: title => ({ type: title_actionsTypes.SET_TITLE, value: title }),
};

const title_reducers = {
  [title_actionsTypes.SET_TITLE]: (state, action) => ({ ...state, title: action.value }),
};

const title_getSlice = store => ({
  setTitle: title => store.dispatch(title_actions.setTitle(title)),
});

/* harmony default export */ const title = ({
  actionsTypes: title_actionsTypes,
  actions: title_actions,
  reducers: title_reducers,
  getSlice: title_getSlice,
});

;// CONCATENATED MODULE: ./src/content-script/store/locals/locals-list.js
// It's generated code, don't try to change it, see /configs/src-generation/store.js instead


















/* harmony default export */ const locals_list = ([
  body_scroll_width,
  keys_default_item,
  dir,
  event_router,
  help_state,
  i18n,
  keys_info,
  is_webext_destroyed,
  modals,
  keys_module,
  public_ids,
  send_event,
  service_name,
  keys_status,
  theme,
  title,
]);

;// CONCATENATED MODULE: ./src/content-script/store/locals/index.js


const locals_actionsTypes = (
  locals_list.map(module => module.actionsTypes)
    .filter(_actionsTypes => !!_actionsTypes)
    .reduce((acc, _actionsTypes) => ({ ...acc, ..._actionsTypes }), {})
);

const locals_actions = (
  locals_list.map(module => module.actions)
    .filter(_actions => !!_actions)
    .reduce((acc, _actions) => ({ ...acc, ..._actions }), {})
);

const locals_reducers = (
  locals_list.map(module => module.reducers)
    .filter(_reducers => !!_reducers)
    .reduce((acc, _reducers) => ({ ...acc, ..._reducers }), {})
);

const locals_slices = (
  locals_list.map(module => module.getSlice)
    .filter(_getSlice => !!_getSlice)
);

const locals_selectors = (
  locals_list.map(module => module.selectors)
    .filter(_selectors => !!_selectors)
    .reduce((acc, _selectors) => ({ ...acc, ..._selectors }), {})
);

const locals_afterEffects = (
  locals_list.map(module => module.after)
    .filter(_after => !!_after)
);



;// CONCATENATED MODULE: ./src/content-script/store/after-effects.js
// local imports
// store



const after_effects_afterEffects = [
  ...afterEffects,
  ...locals_afterEffects,
];

/* harmony default export */ const after_effects = (after_effects_afterEffects);

;// CONCATENATED MODULE: ./src/content-script/store/get-setters.js
// local imports
// store



const getSetters = (store) => {
  const globalSlice = slices.map(getSlice => getSlice(store)).reduce((slice, key) => ({ ...slice, ...key }), {});
  const localSlice = locals_slices.map(getSlice => getSlice(store)).reduce((slice, key) => ({ ...slice, ...key }), {});
  return {
    ...globalSlice,
    ...localSlice,
  };
};

/* harmony default export */ const get_setters = (getSetters);

;// CONCATENATED MODULE: ./src/content-script/store/reducers.js
// local imports
// store




const initialState = {};

const reducers_reducers = {
  ...globals_reducers,
  ...locals_reducers,
  [actionsTypes.SET_ALL]: (state, action) => ({ ...state, ...action.value }),
};

const reducer = (state, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }
  return action.type in reducers_reducers ? reducers_reducers[action.type](state, action) : state;
};

/* harmony default export */ const store_reducers = (reducer);

;// CONCATENATED MODULE: ./src/content-script/store/globals/migrations/index.js




const migrationsList = globals_list.map(module => module.migrations).filter(module => !!module);

const migrate = async (migrations, appliedMigrations) => {
  const keys = migrations.map(migration => migration.name);
  const appliedThisTime = {};
  /* eslint-disable no-restricted-syntax, no-await-in-loop */
  for (const name of keys) {
    let migrationsToApply;
    if (name.toString() in appliedMigrations) {
      migrationsToApply = migrations.find(migration => migration.name === name).ups.filter(migration => migration.v > appliedMigrations[name]);
    } else {
      migrationsToApply = migrations.find(migration => migration.name === name).ups;
    }
    migrationsToApply.sort((migration1, migration2) => migration1.v - migration2.v);

    for (const migration of migrationsToApply) {
      if (migration.up) {
        if (typeof name === "string") {
          await migration.up(index_ext, await index_ext.get(name));
          appliedThisTime[name] = migration.v;
        }
        if (name instanceof RegExp) {
          const allKeys = await index_ext.getAllKeys();
          const allPromises = allKeys.map(async (storageKey) => {
            if (name.test(storageKey)) {
              return migration.up(index_ext, storageKey);
            }
            return null;
          });
          await Promise.all(allPromises);
          appliedThisTime[name.toString()] = migration.v;
        }
      }
    }
  }
  /* eslint-enable no-restricted-syntax, no-await-in-loop */
  return appliedThisTime;
};

let singleton = null;

const whileCurrentTabIsActive = () => new Promise((resolve) => {
  const keepWaiting = () => {
    if (document.hidden) setTimeout(() => keepWaiting(), 500);
    else resolve();
  };
  keepWaiting();
});

const runMigrations = async () => {
  await whileCurrentTabIsActive();
  let appliedMigrations = await index_ext.get("appliedMigrations");
  if (!appliedMigrations) {
    appliedMigrations = {};
  }

  const appliedThisTime = await migrate(migrationsList, appliedMigrations);
  if (!Object.keys(appliedThisTime).length) return;
  index_ext.set("appliedMigrations", { ...appliedMigrations, ...appliedThisTime });
};

const dispatcher = () => {
  if (singleton) return singleton;
  singleton = runMigrations();
  return singleton;
};

/* harmony default export */ const globals_migrations = (dispatcher);

;// CONCATENATED MODULE: ./src/content-script/ui/widget/check-rating-modal.js
// local imports
// config


// utils


const { ratingIntervals } = config;
const {
  downloadedInRowAim,
  screenshotedAim,
  sinceInstalled,
  sinceLastNotNowIntervals,
} = ratingIntervals;

const minute = 60 * 1000;

const sinceLastNotNow = (ratingModalShownCount) => {
  const { length } = sinceLastNotNowIntervals;
  const index = ratingModalShownCount < length ? ratingModalShownCount : length - 1;
  return sinceLastNotNowIntervals[index];
};

// RESPONSES
const dontShow = "dontShow";
const showDownloads = "showDownloads";
const showScreenshots = "showScreenshots";

const getDecision = async (store) => {
  const {
    downloadedInRow,
    lastSuccessDownload,
    lastSuccessScreenshot,
    ratingModalLastCheck,
    ratingModalLastNotNow,
    ratingModalNeverShow,
    ratingModalShownCount,
    screenshotsCount,
    setRatingModalLastCheck,
  } = store.getState();
  if (ratingModalNeverShow) {
    return dontShow;
  }

  const now = Date.now();
  if (now - ratingModalLastCheck < minute) {
    return dontShow;
  }
  setRatingModalLastCheck(now);
  const extensionInstalledStamp = await index_ext.get("extensionInstalledStamp");
  if (now - extensionInstalledStamp < sinceInstalled) {
    return dontShow;
  }

  // https://www.goodday.work/t/81ZDor
  if (ratingModalLastNotNow && (
    (now - ratingModalLastNotNow < sinceLastNotNow(ratingModalShownCount)) ||
    (lastSuccessDownload !== 0 && ratingModalLastNotNow > lastSuccessDownload) ||
    (lastSuccessScreenshot !== 0 && ratingModalLastNotNow > lastSuccessScreenshot)
  )) {
    return dontShow;
  }

  if (downloadedInRow >= downloadedInRowAim && (ratingModalLastNotNow < lastSuccessDownload)) {
    return showDownloads;
  }
  if (screenshotsCount >= screenshotedAim && (ratingModalLastNotNow < lastSuccessScreenshot)) {
    return showScreenshots;
  }
  return dontShow;
};

const isUserscript = type => type === "userscript";

const checkRatingModal = async (store) => {
  const {
    addModal,
    eventRouter,
  } = store.getState();
  if (isUserscript(config.dist)) {
    return;
  }
  const decision = await getDecision(store);
  if (decision === "dontShow") {
    return;
  }
  if (decision === "showDownloads") {
    const modalType = "askingForReviewByDownloads";
    addModal({ modalType, type: "modal" });
    eventRouter.emit("showModal", modalType);
  }
  if (decision === "showScreenshots") {
    const modalType = "askingForReviewByScreenshots";
    addModal({ modalType, type: "modal" });
    eventRouter.emit("showModal", modalType);
  }
};

/* harmony default export */ const check_rating_modal = (checkRatingModal);

;// CONCATENATED MODULE: ./src/content-script/integration/check-if-protected.js
// local imports
// utils


const isEqualUrl = url => target => url === target;

const checkIfProtected = async (url, module) => {
  const blackList = await index_ext.get("blackList");
  if (!blackList) return false;
  return blackList.some(isEqualUrl(module.makeCanonicalUrl(await module.getMediaId(url))));
};

/* harmony default export */ const check_if_protected = (checkIfProtected);

;// CONCATENATED MODULE: ./src/content-script/integration/get-update-media-info.js
// local imports
// utils


// integration


let timeoutHandler;
const resetTimeoutHandler = () => {
  if (timeoutHandler) {
    clearTimeout(timeoutHandler);
    timeoutHandler = null;
  }
};

const getUpdateMediaInfo = (store) => {
  /* eslint-disable-next-line func-names */
  const updateMediaInfo = async function (id) {
    const {
      eventRouter,
      module,
      serviceName,
    } = store.getState();

    const { getMediaInfo } = module;
    if (!getMediaInfo) { // TODO!!!
      return;
    }

    // youtube links with index param changes after refresh, so we can't use them as id
    // see second part of token verifying in set-media-info
    const { getMediaId, makeCanonicalUrl } = module;
    let mediaId = id;
    if (!id) {
      mediaId = await getMediaId(window.location.href);
      if (!mediaId) {
        eventRouter.emit("mediaIdUndefined");
        return;
      }
    }
    const token = makeCanonicalUrl(mediaId);
    const isProtectedByLaw = await check_if_protected(token, module);
    console.log("PROTECTED!!!!", token, isProtectedByLaw);
    if (isProtectedByLaw) {
      eventRouter.emit("protectedByLaw");
      return;
    }

    const timeoutError = () => {
      eventRouter.emit("updateInfo_failure", token);
    };

    resetTimeoutHandler();
    timeoutHandler = setTimeout(timeoutError, 30 * 1000); // TODO!!!
    const emitMediaInfo = (info) => {
      resetTimeoutHandler();
      const {
        canBeCached,
        error,
        mediaInfo,
        raw,
      } = info;
      if (error) {
        eventRouter.emit("updateInfo_failure", token);
        return;
      }
      if (raw) {
        eventRouter.emit("rawMediaInfo", { raw, serviceName });
      } else {
        eventRouter.emit("mediaInfo", mediaInfo, token, canBeCached);
      }
    };
    const cached = await cache_checkCache(token);
    if (cached) {
      emitMediaInfo({ mediaInfo: cached });
      return;
    }
    getMediaInfo(token, emitMediaInfo, mediaId);
  };
  return updateMediaInfo;
};

/* harmony default export */ const get_update_media_info = (getUpdateMediaInfo);

;// CONCATENATED MODULE: ./src/utils/get-default-status.js
const isImagesOnly = (mediaInfo) => {
  const {
    audio,
    imgs,
    streams,
    video,
  } = mediaInfo;
  if (video && video.length) return false;
  if (streams && streams.length) return false;
  if (audio && audio.length) return false;
  if (imgs && imgs.length) return true;
  return false;
};

const thereIsOnlyOneOption = (mediaInfo) => {
  const {
    audio,
    streams,
    video,
  } = mediaInfo;

  if (video && video.length) return false;
  if (audio && audio.length) return false;

  if (streams && streams.length === 1) return true;
  return false;
};

const isLiveStream = (mediaInfo) => {
  const { isLiveStream: liveStream } = mediaInfo;
  if (liveStream === "true" || liveStream === true ||
    (typeof liveStream === "object" &&
     liveStream.liveStreamabilityRenderer &&
     (!("displayEndscreen" in liveStream.liveStreamabilityRenderer) || liveStream.liveStreamabilityRenderer.displayEndscreen === false))
  ) return true;
  return false;
};

const isPremiere = (mediaInfo) => {
  const { isPremiere: premiere } = mediaInfo;
  return !!premiere;
};

const isDecentVideos = (mediaInfo) => {
  const { streams, video } = mediaInfo;
  return (streams && streams.length) || (video && video.length);
};

/* harmony default export */ const get_default_status = ((mediaInfo) => {
  if (isImagesOnly(mediaInfo)) return "imgDownloading";
  if (thereIsOnlyOneOption(mediaInfo)) return "theOnlyStreamDownloading";
  if (isLiveStream(mediaInfo)) return "liveStream";
  if (isPremiere(mediaInfo)) return "premiere";
  if (isDecentVideos(mediaInfo)) return "idle";
  return "error";
});

;// CONCATENATED MODULE: ./src/content-script/integration/set-media-info.js
// local imports
// utils



// widget


const setMediaInfo = async (store, token, mediaInfo, canBeCached) => {
  check_rating_modal(store);

  const {
    info,
    listMode,
    sendEvent,
    setDefaultItem,
    setImgs,
    setInfo,
    setListMode,
    setTitle,
  } = store.getState();

  if (canBeCached) cache_updateCache(token, mediaInfo);

  const { canonicalUrl, title } = mediaInfo;
  setTitle(title);
  const refining = info && canonicalUrl === info.canonicalUrl;

  const status = get_default_status(mediaInfo);
  if (status === "imgDownloading") {
    setImgs(mediaInfo.imgs);
    const imgMax = Math.max(...mediaInfo.imgs.map(img => img.height));
    if (imgMax) {
      const defaultImg = mediaInfo.imgs.find(img => img.height === imgMax);
      setDefaultItem(defaultImg);
    }
    if (!refining) sendEvent({ action: "button_img" });
  }

  if (status === "theOnlyStreamDownloading") {
    setDefaultItem(mediaInfo.streams[0]);
  }

  if (status === "liveStream") {
    if (!refining) sendEvent({ action: "button_liveStream" });
  }
  if (status === "premiere") {
    if (!refining) sendEvent({ action: "button_premiere" });
  }

  setInfo(mediaInfo);

  if (status === "idle") {
    setListMode(["short", "full"].includes(listMode) ? "short" : "embed");
    if (!refining) sendEvent({ action: "button_normal" });
  }
  if (!refining) sendEvent({ action: "updateInfo_success" });
};

/* harmony default export */ const set_media_info = (setMediaInfo);

// EXTERNAL MODULE: ./node_modules/use-sync-external-store/shim/index.js
var shim = __webpack_require__(688);
// EXTERNAL MODULE: ./node_modules/use-sync-external-store/shim/with-selector.js
var with_selector = __webpack_require__(798);
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(935);
;// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/reactBatchedUpdates.js

;// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/batch.js
// Default to a dummy "batch" implementation that just runs the callback
function defaultNoopBatch(callback) {
  callback();
}

let batch = defaultNoopBatch; // Allow injecting another batching function later

const setBatch = newBatch => batch = newBatch; // Supply a getter just to skip dealing with ESM bindings

const getBatch = () => batch;
;// CONCATENATED MODULE: ./node_modules/react-redux/es/components/Context.js

const Context_ReactReduxContext = /*#__PURE__*/(0,react.createContext)(null);

if (false) {}

/* harmony default export */ const Context = ((/* unused pure expression or super */ null && (Context_ReactReduxContext)));
;// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useReduxContext.js



/**
 * A hook to access the value of the `ReactReduxContext`. This is a low-level
 * hook that you should usually not need to call directly.
 *
 * @returns {any} the value of the `ReactReduxContext`
 *
 * @example
 *
 * import React from 'react'
 * import { useReduxContext } from 'react-redux'
 *
 * export const CounterComponent = () => {
 *   const { store } = useReduxContext()
 *   return <div>{store.getState()}</div>
 * }
 */
function useReduxContext_useReduxContext() {
  const contextValue = (0,react.useContext)(Context_ReactReduxContext);

  if (false) {}

  return contextValue;
}
;// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/useSyncExternalStore.js
const useSyncExternalStore_notInitialized = () => {
  throw new Error('uSES not initialized!');
};
;// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useSelector.js




let useSyncExternalStoreWithSelector = useSyncExternalStore_notInitialized;
const initializeUseSelector = fn => {
  useSyncExternalStoreWithSelector = fn;
};

const refEquality = (a, b) => a === b;
/**
 * Hook factory, which creates a `useSelector` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useSelector` hook bound to the specified context.
 */


function createSelectorHook(context = Context_ReactReduxContext) {
  const useReduxContext = context === Context_ReactReduxContext ? useReduxContext_useReduxContext : () => (0,react.useContext)(context);
  return function useSelector(selector, equalityFn = refEquality) {
    if (false) {}

    const {
      store,
      subscription,
      getServerState
    } = useReduxContext();
    const selectedState = useSyncExternalStoreWithSelector(subscription.addNestedSub, store.getState, getServerState || store.getState, selector, equalityFn);
    (0,react.useDebugValue)(selectedState);
    return selectedState;
  };
}
/**
 * A hook to access the redux store's state. This hook takes a selector function
 * as an argument. The selector is called with the store state.
 *
 * This hook takes an optional equality comparison function as the second parameter
 * that allows you to customize the way the selected state is compared to determine
 * whether the component needs to be re-rendered.
 *
 * @param {Function} selector the selector function
 * @param {Function=} equalityFn the function that will be used to determine equality
 *
 * @returns {any} the selected state
 *
 * @example
 *
 * import React from 'react'
 * import { useSelector } from 'react-redux'
 *
 * export const CounterComponent = () => {
 *   const counter = useSelector(state => state.counter)
 *   return <div>{counter}</div>
 * }
 */

const useSelector = /*#__PURE__*/createSelectorHook();
// EXTERNAL MODULE: ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__(679);
var hoist_non_react_statics_cjs_default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics_cjs);
// EXTERNAL MODULE: ./node_modules/react-is/index.js
var react_is = __webpack_require__(864);
;// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/Subscription.js
 // encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

function createListenerCollection() {
  const batch = getBatch();
  let first = null;
  let last = null;
  return {
    clear() {
      first = null;
      last = null;
    },

    notify() {
      batch(() => {
        let listener = first;

        while (listener) {
          listener.callback();
          listener = listener.next;
        }
      });
    },

    get() {
      let listeners = [];
      let listener = first;

      while (listener) {
        listeners.push(listener);
        listener = listener.next;
      }

      return listeners;
    },

    subscribe(callback) {
      let isSubscribed = true;
      let listener = last = {
        callback,
        next: null,
        prev: last
      };

      if (listener.prev) {
        listener.prev.next = listener;
      } else {
        first = listener;
      }

      return function unsubscribe() {
        if (!isSubscribed || first === null) return;
        isSubscribed = false;

        if (listener.next) {
          listener.next.prev = listener.prev;
        } else {
          last = listener.prev;
        }

        if (listener.prev) {
          listener.prev.next = listener.next;
        } else {
          first = listener.next;
        }
      };
    }

  };
}

const nullListeners = {
  notify() {},

  get: () => []
};
function Subscription_createSubscription(store, parentSub) {
  let unsubscribe;
  let listeners = nullListeners;

  function addNestedSub(listener) {
    trySubscribe();
    return listeners.subscribe(listener);
  }

  function notifyNestedSubs() {
    listeners.notify();
  }

  function handleChangeWrapper() {
    if (subscription.onStateChange) {
      subscription.onStateChange();
    }
  }

  function isSubscribed() {
    return Boolean(unsubscribe);
  }

  function trySubscribe() {
    if (!unsubscribe) {
      unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store.subscribe(handleChangeWrapper);
      listeners = createListenerCollection();
    }
  }

  function tryUnsubscribe() {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = undefined;
      listeners.clear();
      listeners = nullListeners;
    }
  }

  const subscription = {
    addNestedSub,
    notifyNestedSubs,
    handleChangeWrapper,
    isSubscribed,
    trySubscribe,
    tryUnsubscribe,
    getListeners: () => listeners
  };
  return subscription;
}
;// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/useIsomorphicLayoutEffect.js
 // React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect to ensure the store
// subscription callback always has the selector from the latest render commit
// available, otherwise a store update may happen between render and the effect,
// which may cause missed updates; we also must ensure the store subscription
// is created synchronously, otherwise a store update may occur before the
// subscription is created and an inconsistent state may be observed
// Matches logic in React's `shared/ExecutionEnvironment` file

const canUseDOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined');
const useIsomorphicLayoutEffect_useIsomorphicLayoutEffect = canUseDOM ? react.useLayoutEffect : react.useEffect;
;// CONCATENATED MODULE: ./node_modules/react-redux/es/components/connect.js


const _excluded = (/* unused pure expression or super */ null && (["reactReduxForwardedRef"]));

/* eslint-disable valid-jsdoc, @typescript-eslint/no-unused-vars */













let useSyncExternalStore = (/* unused pure expression or super */ null && (notInitialized));
const initializeConnect = fn => {
  useSyncExternalStore = fn;
}; // Define some constant arrays just to avoid re-creating these

const EMPTY_ARRAY = (/* unused pure expression or super */ null && ([null, 0]));
const NO_SUBSCRIPTION_ARRAY = (/* unused pure expression or super */ null && ([null, null])); // Attempts to stringify whatever not-really-a-component value we were given
// for logging in an error message

const stringifyComponent = Comp => {
  try {
    return JSON.stringify(Comp);
  } catch (err) {
    return String(Comp);
  }
};

// This is "just" a `useLayoutEffect`, but with two modifications:
// - we need to fall back to `useEffect` in SSR to avoid annoying warnings
// - we extract this to a separate function to avoid closing over values
//   and causing memory leaks
function useIsomorphicLayoutEffectWithArgs(effectFunc, effectArgs, dependencies) {
  useIsomorphicLayoutEffect(() => effectFunc(...effectArgs), dependencies);
} // Effect callback, extracted: assign the latest props values to refs for later usage


function captureWrapperProps(lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, // actualChildProps: unknown,
childPropsFromStoreUpdate, notifyNestedSubs) {
  // We want to capture the wrapper props and child props we used for later comparisons
  lastWrapperProps.current = wrapperProps;
  renderIsScheduled.current = false; // If the render was from a store update, clear out that reference and cascade the subscriber update

  if (childPropsFromStoreUpdate.current) {
    childPropsFromStoreUpdate.current = null;
    notifyNestedSubs();
  }
} // Effect callback, extracted: subscribe to the Redux store or nearest connected ancestor,
// check for updates after dispatched actions, and trigger re-renders.


function subscribeUpdates(shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, isMounted, childPropsFromStoreUpdate, notifyNestedSubs, // forceComponentUpdateDispatch: React.Dispatch<any>,
additionalSubscribeListener) {
  // If we're not subscribed to the store, nothing to do here
  if (!shouldHandleStateChanges) return () => {}; // Capture values for checking if and when this component unmounts

  let didUnsubscribe = false;
  let lastThrownError = null; // We'll run this callback every time a store subscription update propagates to this component

  const checkForUpdates = () => {
    if (didUnsubscribe || !isMounted.current) {
      // Don't run stale listeners.
      // Redux doesn't guarantee unsubscriptions happen until next dispatch.
      return;
    } // TODO We're currently calling getState ourselves here, rather than letting `uSES` do it


    const latestStoreState = store.getState();
    let newChildProps, error;

    try {
      // Actually run the selector with the most recent store state and wrapper props
      // to determine what the child props should be
      newChildProps = childPropsSelector(latestStoreState, lastWrapperProps.current);
    } catch (e) {
      error = e;
      lastThrownError = e;
    }

    if (!error) {
      lastThrownError = null;
    } // If the child props haven't changed, nothing to do here - cascade the subscription update


    if (newChildProps === lastChildProps.current) {
      if (!renderIsScheduled.current) {
        notifyNestedSubs();
      }
    } else {
      // Save references to the new child props.  Note that we track the "child props from store update"
      // as a ref instead of a useState/useReducer because we need a way to determine if that value has
      // been processed.  If this went into useState/useReducer, we couldn't clear out the value without
      // forcing another re-render, which we don't want.
      lastChildProps.current = newChildProps;
      childPropsFromStoreUpdate.current = newChildProps;
      renderIsScheduled.current = true; // TODO This is hacky and not how `uSES` is meant to be used
      // Trigger the React `useSyncExternalStore` subscriber

      additionalSubscribeListener();
    }
  }; // Actually subscribe to the nearest connected ancestor (or store)


  subscription.onStateChange = checkForUpdates;
  subscription.trySubscribe(); // Pull data from the store after first render in case the store has
  // changed since we began.

  checkForUpdates();

  const unsubscribeWrapper = () => {
    didUnsubscribe = true;
    subscription.tryUnsubscribe();
    subscription.onStateChange = null;

    if (lastThrownError) {
      // It's possible that we caught an error due to a bad mapState function, but the
      // parent re-rendered without this component and we're about to unmount.
      // This shouldn't happen as long as we do top-down subscriptions correctly, but
      // if we ever do those wrong, this throw will surface the error in our tests.
      // In that case, throw the error from here so it doesn't get lost.
      throw lastThrownError;
    }
  };

  return unsubscribeWrapper;
} // Reducer initial state creation for our update reducer


const initStateUpdates = () => EMPTY_ARRAY;

function strictEqual(a, b) {
  return a === b;
}
/**
 * Infers the type of props that a connector will inject into a component.
 */


let hasWarnedAboutDeprecatedPureOption = false;
/**
 * Connects a React component to a Redux store.
 *
 * - Without arguments, just wraps the component, without changing the behavior / props
 *
 * - If 2 params are passed (3rd param, mergeProps, is skipped), default behavior
 * is to override ownProps (as stated in the docs), so what remains is everything that's
 * not a state or dispatch prop
 *
 * - When 3rd param is passed, we don't know if ownProps propagate and whether they
 * should be valid component props, because it depends on mergeProps implementation.
 * As such, it is the user's responsibility to extend ownProps interface from state or
 * dispatch props or both when applicable
 *
 * @param mapStateToProps A function that extracts values from state
 * @param mapDispatchToProps Setup for dispatching actions
 * @param mergeProps Optional callback to merge state and dispatch props together
 * @param options Options for configuring the connection
 *
 */

function connect(mapStateToProps, mapDispatchToProps, mergeProps, {
  // The `pure` option has been removed, so TS doesn't like us destructuring this to check its existence.
  // @ts-ignore
  pure,
  areStatesEqual = strictEqual,
  areOwnPropsEqual = shallowEqual,
  areStatePropsEqual = shallowEqual,
  areMergedPropsEqual = shallowEqual,
  // use React's forwardRef to expose a ref of the wrapped component
  forwardRef = false,
  // the context consumer to use
  context = ReactReduxContext
} = {}) {
  if (false) {}

  const Context = context;
  const initMapStateToProps = mapStateToPropsFactory(mapStateToProps);
  const initMapDispatchToProps = mapDispatchToPropsFactory(mapDispatchToProps);
  const initMergeProps = mergePropsFactory(mergeProps);
  const shouldHandleStateChanges = Boolean(mapStateToProps);

  const wrapWithConnect = WrappedComponent => {
    if (false) {}

    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    const displayName = `Connect(${wrappedComponentName})`;
    const selectorFactoryOptions = {
      shouldHandleStateChanges,
      displayName,
      wrappedComponentName,
      WrappedComponent,
      // @ts-ignore
      initMapStateToProps,
      // @ts-ignore
      initMapDispatchToProps,
      initMergeProps,
      areStatesEqual,
      areStatePropsEqual,
      areOwnPropsEqual,
      areMergedPropsEqual
    };

    function ConnectFunction(props) {
      const [propsContext, reactReduxForwardedRef, wrapperProps] = useMemo(() => {
        // Distinguish between actual "data" props that were passed to the wrapper component,
        // and values needed to control behavior (forwarded refs, alternate context instances).
        // To maintain the wrapperProps object reference, memoize this destructuring.
        const {
          reactReduxForwardedRef
        } = props,
              wrapperProps = _objectWithoutPropertiesLoose(props, _excluded);

        return [props.context, reactReduxForwardedRef, wrapperProps];
      }, [props]);
      const ContextToUse = useMemo(() => {
        // Users may optionally pass in a custom context instance to use instead of our ReactReduxContext.
        // Memoize the check that determines which context instance we should use.
        return propsContext && propsContext.Consumer && // @ts-ignore
        isContextConsumer( /*#__PURE__*/React.createElement(propsContext.Consumer, null)) ? propsContext : Context;
      }, [propsContext, Context]); // Retrieve the store and ancestor subscription via context, if available

      const contextValue = useContext(ContextToUse); // The store _must_ exist as either a prop or in context.
      // We'll check to see if it _looks_ like a Redux store first.
      // This allows us to pass through a `store` prop that is just a plain value.

      const didStoreComeFromProps = Boolean(props.store) && Boolean(props.store.getState) && Boolean(props.store.dispatch);
      const didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);

      if (false) {} // Based on the previous check, one of these must be true


      const store = didStoreComeFromProps ? props.store : contextValue.store;
      const getServerState = didStoreComeFromContext ? contextValue.getServerState : store.getState;
      const childPropsSelector = useMemo(() => {
        // The child props selector needs the store reference as an input.
        // Re-create this selector whenever the store changes.
        return defaultSelectorFactory(store.dispatch, selectorFactoryOptions);
      }, [store]);
      const [subscription, notifyNestedSubs] = useMemo(() => {
        if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY; // This Subscription's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.

        const subscription = createSubscription(store, didStoreComeFromProps ? undefined : contextValue.subscription); // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
        // the middle of the notification loop, where `subscription` will then be null. This can
        // probably be avoided if Subscription's listeners logic is changed to not call listeners
        // that have been unsubscribed in the  middle of the notification loop.

        const notifyNestedSubs = subscription.notifyNestedSubs.bind(subscription);
        return [subscription, notifyNestedSubs];
      }, [store, didStoreComeFromProps, contextValue]); // Determine what {store, subscription} value should be put into nested context, if necessary,
      // and memoize that value to avoid unnecessary context updates.

      const overriddenContextValue = useMemo(() => {
        if (didStoreComeFromProps) {
          // This component is directly subscribed to a store from props.
          // We don't want descendants reading from this store - pass down whatever
          // the existing context value is from the nearest connected ancestor.
          return contextValue;
        } // Otherwise, put this component's subscription instance into context, so that
        // connected descendants won't update until after this component is done


        return _extends({}, contextValue, {
          subscription
        });
      }, [didStoreComeFromProps, contextValue, subscription]); // Set up refs to coordinate values between the subscription effect and the render logic

      const lastChildProps = useRef();
      const lastWrapperProps = useRef(wrapperProps);
      const childPropsFromStoreUpdate = useRef();
      const renderIsScheduled = useRef(false);
      const isProcessingDispatch = useRef(false);
      const isMounted = useRef(false);
      const latestSubscriptionCallbackError = useRef();
      useIsomorphicLayoutEffect(() => {
        isMounted.current = true;
        return () => {
          isMounted.current = false;
        };
      }, []);
      const actualChildPropsSelector = useMemo(() => {
        const selector = () => {
          // Tricky logic here:
          // - This render may have been triggered by a Redux store update that produced new child props
          // - However, we may have gotten new wrapper props after that
          // If we have new child props, and the same wrapper props, we know we should use the new child props as-is.
          // But, if we have new wrapper props, those might change the child props, so we have to recalculate things.
          // So, we'll use the child props from store update only if the wrapper props are the same as last time.
          if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
            return childPropsFromStoreUpdate.current;
          } // TODO We're reading the store directly in render() here. Bad idea?
          // This will likely cause Bad Things (TM) to happen in Concurrent Mode.
          // Note that we do this because on renders _not_ caused by store updates, we need the latest store state
          // to determine what the child props should be.


          return childPropsSelector(store.getState(), wrapperProps);
        };

        return selector;
      }, [store, wrapperProps]); // We need this to execute synchronously every time we re-render. However, React warns
      // about useLayoutEffect in SSR, so we try to detect environment and fall back to
      // just useEffect instead to avoid the warning, since neither will run anyway.

      const subscribeForReact = useMemo(() => {
        const subscribe = reactListener => {
          if (!subscription) {
            return () => {};
          }

          return subscribeUpdates(shouldHandleStateChanges, store, subscription, // @ts-ignore
          childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, isMounted, childPropsFromStoreUpdate, notifyNestedSubs, reactListener);
        };

        return subscribe;
      }, [subscription]);
      useIsomorphicLayoutEffectWithArgs(captureWrapperProps, [lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, childPropsFromStoreUpdate, notifyNestedSubs]);
      let actualChildProps;

      try {
        actualChildProps = useSyncExternalStore( // TODO We're passing through a big wrapper that does a bunch of extra side effects besides subscribing
        subscribeForReact, // TODO This is incredibly hacky. We've already processed the store update and calculated new child props,
        // TODO and we're just passing that through so it triggers a re-render for us rather than relying on `uSES`.
        actualChildPropsSelector, getServerState ? () => childPropsSelector(getServerState(), wrapperProps) : actualChildPropsSelector);
      } catch (err) {
        if (latestSubscriptionCallbackError.current) {
          ;
          err.message += `\nThe error may be correlated with this previous error:\n${latestSubscriptionCallbackError.current.stack}\n\n`;
        }

        throw err;
      }

      useIsomorphicLayoutEffect(() => {
        latestSubscriptionCallbackError.current = undefined;
        childPropsFromStoreUpdate.current = undefined;
        lastChildProps.current = actualChildProps;
      }); // Now that all that's done, we can finally try to actually render the child component.
      // We memoize the elements for the rendered child component as an optimization.

      const renderedWrappedComponent = useMemo(() => {
        return (
          /*#__PURE__*/
          // @ts-ignore
          React.createElement(WrappedComponent, _extends({}, actualChildProps, {
            ref: reactReduxForwardedRef
          }))
        );
      }, [reactReduxForwardedRef, WrappedComponent, actualChildProps]); // If React sees the exact same element reference as last time, it bails out of re-rendering
      // that child, same as if it was wrapped in React.memo() or returned false from shouldComponentUpdate.

      const renderedChild = useMemo(() => {
        if (shouldHandleStateChanges) {
          // If this component is subscribed to store updates, we need to pass its own
          // subscription instance down to our descendants. That means rendering the same
          // Context instance, and putting a different value into the context.
          return /*#__PURE__*/React.createElement(ContextToUse.Provider, {
            value: overriddenContextValue
          }, renderedWrappedComponent);
        }

        return renderedWrappedComponent;
      }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);
      return renderedChild;
    }

    const _Connect = React.memo(ConnectFunction);

    // Add a hacky cast to get the right output type
    const Connect = _Connect;
    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = ConnectFunction.displayName = displayName;

    if (forwardRef) {
      const _forwarded = React.forwardRef(function forwardConnectRef(props, ref) {
        // @ts-ignore
        return /*#__PURE__*/React.createElement(Connect, _extends({}, props, {
          reactReduxForwardedRef: ref
        }));
      });

      const forwarded = _forwarded;
      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComponent;
      return hoistStatics(forwarded, WrappedComponent);
    }

    return hoistStatics(Connect, WrappedComponent);
  };

  return wrapWithConnect;
}

/* harmony default export */ const components_connect = ((/* unused pure expression or super */ null && (connect)));
;// CONCATENATED MODULE: ./node_modules/react-redux/es/components/Provider.js





function Provider({
  store,
  context,
  children,
  serverState
}) {
  const contextValue = (0,react.useMemo)(() => {
    const subscription = Subscription_createSubscription(store);
    return {
      store,
      subscription,
      getServerState: serverState ? () => serverState : undefined
    };
  }, [store, serverState]);
  const previousState = (0,react.useMemo)(() => store.getState(), [store]);
  useIsomorphicLayoutEffect_useIsomorphicLayoutEffect(() => {
    const {
      subscription
    } = contextValue;
    subscription.onStateChange = subscription.notifyNestedSubs;
    subscription.trySubscribe();

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }

    return () => {
      subscription.tryUnsubscribe();
      subscription.onStateChange = undefined;
    };
  }, [contextValue, previousState]);
  const Context = context || Context_ReactReduxContext; // @ts-ignore 'AnyAction' is assignable to the constraint of type 'A', but 'A' could be instantiated with a different subtype

  return /*#__PURE__*/react.createElement(Context.Provider, {
    value: contextValue
  }, children);
}

/* harmony default export */ const components_Provider = (Provider);
;// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useStore.js



/**
 * Hook factory, which creates a `useStore` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useStore` hook bound to the specified context.
 */

function useStore_createStoreHook(context = ReactReduxContext) {
  const useReduxContext = // @ts-ignore
  context === ReactReduxContext ? useDefaultReduxContext : () => useContext(context);
  return function useStore() {
    const {
      store
    } = useReduxContext(); // @ts-ignore

    return store;
  };
}
/**
 * A hook to access the redux store.
 *
 * @returns {any} the redux store
 *
 * @example
 *
 * import React from 'react'
 * import { useStore } from 'react-redux'
 *
 * export const ExampleComponent = () => {
 *   const store = useStore()
 *   return <div>{store.getState()}</div>
 * }
 */

const useStore = /*#__PURE__*/(/* unused pure expression or super */ null && (useStore_createStoreHook()));
;// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useDispatch.js


/**
 * Hook factory, which creates a `useDispatch` hook bound to a given context.
 *
 * @param {React.Context} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useDispatch` hook bound to the specified context.
 */

function createDispatchHook(context = ReactReduxContext) {
  const useStore = // @ts-ignore
  context === ReactReduxContext ? useDefaultStore : createStoreHook(context);
  return function useDispatch() {
    const store = useStore(); // @ts-ignore

    return store.dispatch;
  };
}
/**
 * A hook to access the redux `dispatch` function.
 *
 * @returns {any|function} redux store's `dispatch` function
 *
 * @example
 *
 * import React, { useCallback } from 'react'
 * import { useDispatch } from 'react-redux'
 *
 * export const CounterComponent = ({ value }) => {
 *   const dispatch = useDispatch()
 *   const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
 *   return (
 *     <div>
 *       <span>{value}</span>
 *       <button onClick={increaseCounter}>Increase counter</button>
 *     </div>
 *   )
 * }
 */

const useDispatch = /*#__PURE__*/(/* unused pure expression or super */ null && (createDispatchHook()));
;// CONCATENATED MODULE: ./node_modules/react-redux/es/exports.js









;// CONCATENATED MODULE: ./node_modules/react-redux/es/index.js
// The primary entry point assumes we're working with standard ReactDOM/RN, but
// older versions that do not include `useSyncExternalStore` (React 16.9 - 17.x).
// Because of that, the useSyncExternalStore compat shim is needed.






initializeUseSelector(with_selector.useSyncExternalStoreWithSelector);
initializeConnect(shim.useSyncExternalStore); // Enable batched updates in our subscriptions for use
// with standard React renderers (ReactDOM, React Native)

setBatch(react_dom.unstable_batchedUpdates);


;// CONCATENATED MODULE: ./src/content-script/store/selectors.js
// local imports
// store



const selectors_selectors = {
  ...selectors,
  ...locals_selectors,
};

/* harmony default export */ const store_selectors = (selectors_selectors);

;// CONCATENATED MODULE: ./src/content-script/ui/hooks/useAppState.jsx
// react imports


// local imports
// store

const useAppState = keys => {
  const getStateProps = state => {
    const result = {};
    keys.forEach(key => {
      result[key] = store_selectors[key] ? store_selectors[key](state) : state[key];
    });
    return result;
  };
  return useSelector(getStateProps);
};
/* harmony default export */ const hooks_useAppState = (useAppState);
;// CONCATENATED MODULE: ./src/content-script/ui/hooks/useGDPRModal.jsx
// react imports


// local imports
// config


// hooks

const useGDPRModal = () => {
  const {
    eulaUrl,
    privacyUrl
  } = config;
  const {
    addModal,
    eventRouter,
    setShowGDPRModal,
    setShowUI,
    userAcceptedTerms
  } = hooks_useAppState(["addModal", "eventRouter", "setShowGDPRModal", "setShowUI", "userAcceptedTerms"]);
  return (0,react.useEffect)(() => {
    if (!setShowGDPRModal) return;
    if (privacyUrl && eulaUrl && userAcceptedTerms === false) {
      setShowUI(false);
      const modalType = "gdprConsent";
      addModal({
        modalType,
        type: "modal"
      });
      setShowGDPRModal(true);
      eventRouter.emit("showModal", modalType);
    } else {
      setShowGDPRModal(false);
    }
  }, [addModal, eventRouter, privacyUrl, eulaUrl, userAcceptedTerms, setShowGDPRModal, setShowUI]);
};
/* harmony default export */ const hooks_useGDPRModal = (useGDPRModal);
;// CONCATENATED MODULE: ./src/content-script/ui/components/svg-icons/shining-star.jsx

const IconShiningStar = ({
  style,
  color,
  className,
  onClick
}) => /*#__PURE__*/react.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "49px",
  height: "47px",
  viewBox: "0 0 49 47",
  style: style,
  className: className,
  onClick: onClick
}, /*#__PURE__*/react.createElement("path", {
  fill: color,
  d: "M40.7,17.9c0.7-0.7,0.9-1.7,0.6-2.6c-0.3-0.9-1-1.6-2-1.7l-8.2-1.2c-0.3-0.1-0.6-0.3-0.8-0.6l-3.7-7.7 c-0.4-0.9-1.2-1.4-2.2-1.4c-0.9,0-1.8,0.5-2.2,1.4l-3.7,7.7c-0.2,0.3-0.5,0.6-0.8,0.6l-8.2,1.2c-0.9,0.1-1.7,0.8-2,1.7 c-0.3,0.9-0.1,1.9,0.6,2.6l5.9,6c0.3,0.3,0.4,0.6,0.3,1l-1.4,8.4c-0.1,0.7,0.1,1.5,0.5,2c0.7,0.9,2,1.2,3,0.6l7.3-4 c0.3-0.2,0.7-0.2,1,0l7.3,4c0.4,0.2,0.7,0.3,1.1,0.3c0.7,0,1.4-0.3,1.9-0.9c0.5-0.6,0.7-1.3,0.5-2l-1.4-8.4c-0.1-0.4,0.1-0.7,0.3-1 L40.7,17.9z"
}), /*#__PURE__*/react.createElement("path", {
  fill: color,
  d: "M24.6,46.8c-0.5,0-0.9-0.4-0.9-1v-7.8c0-0.5,0.4-1,0.9-1c0.5,0,0.9,0.4,0.9,1v7.8 C25.5,46.4,25.1,46.8,24.6,46.8z"
}), /*#__PURE__*/react.createElement("path", {
  fill: color,
  d: "M47.7,29.8c-0.1,0-0.2,0-0.3,0l-7.3-2.4c-0.5-0.2-0.8-0.7-0.6-1.2c0.2-0.5,0.7-0.8,1.2-0.6l7.3,2.4 c0.5,0.2,0.8,0.7,0.6,1.2C48.5,29.5,48.1,29.8,47.7,29.8z"
}), /*#__PURE__*/react.createElement("path", {
  fill: color,
  d: "M34.4,8.5c-0.2,0-0.4-0.1-0.6-0.2C33.4,8,33.3,7.4,33.6,7l4.5-6.3c0.3-0.4,0.9-0.5,1.3-0.2 c0.4,0.3,0.5,0.9,0.2,1.3l-4.5,6.3C34.9,8.4,34.7,8.5,34.4,8.5z"
}), /*#__PURE__*/react.createElement("path", {
  fill: color,
  d: "M14.8,8.5c-0.3,0-0.6-0.1-0.8-0.4L9.5,1.8c-0.3-0.4-0.2-1,0.2-1.3c0.4-0.3,1-0.2,1.3,0.2L15.5,7 c0.3,0.4,0.2,1-0.2,1.3C15.2,8.5,15,8.5,14.8,8.5z"
}), /*#__PURE__*/react.createElement("path", {
  fill: color,
  d: "M1.4,29.8c-0.4,0-0.8-0.3-0.9-0.7c-0.2-0.5,0.1-1,0.6-1.2l7.3-2.4c0.5-0.2,1,0.1,1.2,0.6c0.2,0.5-0.1,1-0.6,1.2 l-7.3,2.4C1.6,29.8,1.5,29.8,1.4,29.8z"
}));
/* harmony default export */ const shining_star = (IconShiningStar);
;// CONCATENATED MODULE: ./src/content-script/ui/components/svg-icons/shining-star-outline.jsx

const IconShiningStarOutline = ({
  style,
  color,
  color2,
  className,
  onClick
}) => /*#__PURE__*/react.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "83px",
  height: "86px",
  viewBox: "0 0 83 86",
  style: style,
  className: className,
  onClick: onClick
}, /*#__PURE__*/react.createElement("path", {
  fill: color,
  d: "M44.6489 1.28087L44.6488 1.28097L44.658 1.28505C46.8002 2.23641 48.4365 4.18381 49.1497 6.4284L49.1507 6.43158C50.0338 9.14796 50.9058 11.86 51.778 14.5727C52.5665 17.0251 53.3552 19.4782 54.1525 21.9356C54.5045 23.1155 55.6311 24.0572 56.9371 24.0106C59.0616 24.0119 61.1859 24.0127 63.3101 24.0135C66.5021 24.0148 69.694 24.016 72.8861 24.019L72.8911 24.019C74.4923 24.0045 76.0911 24.3584 77.4423 25.1659L77.4423 25.166L77.4511 25.171C79.8428 26.5357 81.4115 29.1815 81.5974 31.9327L81.5977 31.9358C81.7526 34.031 81.0554 36.1795 79.7005 37.7826L79.7004 37.7826L79.6939 37.7906C79.1336 38.482 78.4257 39.0499 77.6671 39.6181C76.111 40.7524 74.5554 41.891 73.0004 43.0291C71.7457 43.9474 70.4914 44.8655 69.2374 45.7808L69.2318 45.785C68.4134 46.4002 67.2614 46.5339 66.3452 46.1034L66.3453 46.1033L66.3349 46.0987C65.2935 45.6377 64.5918 44.4961 64.6695 43.3651L64.67 43.3571L64.6703 43.349C64.7012 42.497 65.17 41.6764 65.8761 41.1617L65.8785 41.1599C67.334 40.0858 68.7949 39.0189 70.257 37.951L70.3394 37.8908C71.8269 36.8045 73.3155 35.7171 74.7989 34.6216C75.8141 33.9127 76.1641 32.5101 75.6827 31.4038C75.2618 30.3542 74.1654 29.6715 73.0441 29.7361C70.4444 29.7394 67.8451 29.7377 65.2451 29.7361C62.6416 29.7344 60.0374 29.7327 57.4328 29.736C56.4763 29.7242 55.569 29.6927 54.7135 29.4582L54.7135 29.4581L54.704 29.4557C52.2174 28.8261 50.0766 26.9712 49.0718 24.6083L49.0711 24.6064C48.7631 23.8901 48.5294 23.1565 48.2875 22.3969C48.194 22.1035 48.0993 21.8061 47.9986 21.5044C47.0728 18.6026 46.1378 15.7037 45.2032 12.806C44.7984 11.5509 44.3937 10.2961 43.9898 9.04141L43.9895 9.04038C43.9621 8.95581 43.9337 8.86269 43.9037 8.7643C43.8169 8.47935 43.7166 8.15011 43.5866 7.85568C43.4056 7.4459 43.1384 7.02597 42.6842 6.72905C41.9649 6.18785 41.0386 6.11256 40.2528 6.36133C39.4628 6.61143 38.7464 7.21154 38.4951 8.10054C37.691 10.5655 36.9037 13.0226 36.1168 15.4784C35.2397 18.2157 34.3631 20.9514 33.4645 23.6942C32.9417 25.2897 31.9997 26.7459 30.7109 27.7978L30.7109 27.7978L30.7056 27.8022C29.1829 29.0803 27.1841 29.7454 25.1849 29.7327L25.1806 29.7327C22.4958 29.7388 19.824 29.7368 17.1515 29.7348C14.6265 29.733 12.1008 29.7311 9.56305 29.7361V29.7359L9.5512 29.7362C9.50232 29.7375 9.45025 29.7382 9.39549 29.739C8.94029 29.7453 8.29952 29.7542 7.76108 30.0908C6.61762 30.7251 6.08608 32.2179 6.57124 33.4329C6.79441 34.1024 7.34193 34.5328 7.75389 34.8339L7.75405 34.834C11.1156 37.289 14.4727 39.7483 17.8302 42.2078C18.6712 42.8238 19.5122 43.4399 20.3534 44.0559C21.3518 44.7963 22.2475 45.639 22.8657 46.6631L22.8657 46.6632L22.8701 46.6703C24.1753 48.7522 24.4805 51.412 23.7265 53.7547L23.7259 53.7567C22.521 57.5549 21.2973 61.3472 20.0734 65.1401C19.6301 66.5138 19.1868 67.8877 18.7444 69.2618C18.4311 70.1174 18.477 1.1963 19.15 71.9727C19.984 73.089 21.7162 73.4195 22.8716 72.5325C25.4581 70.6424 28.0384 68.7413 30.6176 66.8411C31.7386 66.0153 32.8594 65.1896 33.9803 64.3651C34.2748 64.1528 34.5591 63.9401 34.8392 63.7306C35.5578 63.1931 36.2482 62.6767 37.0098 62.2424C39.1536 61.03 41.8538 60.8607 44.1443 61.7684L44.1443 61.7685L44.1544 61.7722C44.9396 62.064 45.6608 62.5268 46.3936 63.0396C48.3368 64.4434 50.2829 65.8549 52.2294 67.2666C54.3162 68.7801 56.4035 70.2939 58.4879 71.7988C58.5586 71.8499 58.6348 71.9069 58.7152 71.9671C58.9632 72.1527 59.2514 72.3684 59.5457 72.5341C59.949 72.7612 60.4313 72.9385 60.9931 72.8873C61.8609 72.8662 62.617 72.3862 63.0871 71.7383C63.5614 71.0847 63.7827 70.2072 63.4997 69.3615C62.8522 67.3901 62.188 65.4161 61.5245 63.444C60.9999 61.885 60.4758 60.3273 59.9606 58.7729L59.9607 58.7728L59.9576 58.7641C59.6079 57.771 59.8294 56.6027 60.542 55.8465L60.542 55.8465L60.5491 55.8387C61.3423 54.9606 62.73 54.6806 63.8026 55.1822L63.81 55.1856L63.8174 55.1888C64.5716 55.5122 65.1448 56.2117 65.4039 57.0302L65.4038 57.0302L65.4067 57.0386C65.6332 57.7124 65.8599 58.3859 66.0866 59.0595C67.0165 61.822 67.9459 64.5834 68.8624 67.3504C69.4705 69.2003 69.5154 71.2395 68.8313 73.0418L68.8312 73.0418L68.8283 73.0499C67.8655 75.7249 65.4346 77.8042 62.6568 78.4184L62.6519 78.4196C60.7265 78.8658 58.6409 78.5513 56.9039 77.598C56.1493 77.1726 55.4583 76.6695 54.7411 76.1474C54.4824 75.959 54.2203 75.7682 53.9506 75.5777C51.9947 74.1503 50.0277 72.7273 48.0617 71.305C46.3603 70.0741 44.6596 68.8437 42.9672 67.6113C42.3967 67.1867 41.6166 66.8044 40.7584 66.9337C40.2799 66.9897 39.8733 67.1836 39.5256 67.401C39.2928 67.5465 39.0567 67.7235 38.8459 67.8816C38.7548 67.9499 38.6684 68.0146 38.589 68.0718L38.5846 68.0751C34.9466 70.7573 31.307 73.4346 27.667 76.112L27.667 76.112L27.6606 76.1169C26.298 77.1535 24.9513 78.1221 23.3812 78.4959L23.3725 78.4979L23.3638 78.5003C20.7934 79.2107 17.9173 78.4917 15.8828 76.7605L15.8829 76.7604L15.8742 76.7533C13.8522 75.1097 12.6746 72.4693 12.8561 69.8712L12.8562 69.8712L12.8567 69.8614C12.9157 68.6853 13.2827 67.558 13.67 66.3682C13.7078 66.252 13.7459 66.1351 13.7838 66.0176L13.784 66.0171C14.2361 64.6124 14.6886 63.2075 15.1411 61.8026C16.1189 58.7671 17.0968 55.731 18.0716 52.6943C18.0718 52.6934 18.0721 52.6926 18.0724 52.6918L18.0769 52.6781C18.2804 52.0664 18.558 51.2315 18.3134 50.3932C18.1104 49.6191 17.542 49.0696 17.0095 48.6874C13.2008 45.903 9.3921 43.117 5.58686 40.3278C5.44612 40.2242 5.30608 40.1222 5.16716 40.0211C4.23971 39.3458 3.36224 38.7069 2.66023 37.8807L2.66029 37.8807L2.65469 37.8743C0.917045 35.8983 0.259183 33.0395 0.918984 30.4889L0.919119 30.489L0.921802 30.4775C1.48974 28.0471 3.18453 25.8924 5.44671 24.8481L5.44675 24.8481L5.45534 24.844C6.65972 24.2599 8.01902 24.0206 9.38656 24.019L9.38742 24.019C12.9307 24.0087 16.4734 24.0116 20.0171 24.0146C21.6832 24.0159 23.3496 24.0173 25.0164 24.0173C25.7102 24.0329 26.5233 23.8833 27.1314 23.3268C27.7831 22.7649 28.0421 21.9341 28.2406 21.2975C28.2615 21.2305 28.2817 21.1656 28.3017 21.1035L28.3017 21.1033C28.987 18.9643 29.6759 16.8242 30.3649 14.6837C31.22 12.0272 32.0753 9.36989 32.9244 6.71306C33.3377 5.42622 33.949 4.21407 34.8416 3.24453L34.8417 3.24459L34.8479 3.23763C36.3533 1.54028 38.602 0.576921 40.8834 0.5H41.3643C42.514 0.583957 43.6373 0.807018 44.6489 1.28087Z"
}), /*#__PURE__*/react.createElement("path", {
  fill: color2 || color,
  d: "M16.6264 7.46813L16.6264 7.46817L16.6329 7.4666C17.6752 7.21274 18.8402 7.61865 19.512 8.45877C19.9584 9.0171 20.3854 9.57941 20.8166 10.1472C21.0832 10.4984 21.3515 10.8516 21.6269 11.2073L21.6269 11.2073L21.6284 11.2092C22.0952 11.8062 22.369 12.5298 22.3164 13.2376L22.3157 13.2472L22.3154 13.2568C22.2757 14.3715 21.4932 15.4248 20.4382 15.7845L20.4313 15.7868L20.4244 15.7894C19.3263 16.2001 17.9806 15.8102 17.2519 14.8837L17.2519 14.8837L17.2492 14.8803C16.8022 14.322 16.3747 13.759 15.9425 13.1898C15.6779 12.8413 15.4115 12.4905 15.1378 12.137L15.1373 12.1364C14.6687 11.5332 14.3869 10.8155 14.443 10.1147L14.4441 10.102L14.4444 10.0892C14.4796 8.86833 15.4279 7.74316 16.6264 7.46813Z"
}), /*#__PURE__*/react.createElement("path", {
  fill: color2 || color,
  d: "M64.6584 7.47646L64.6712 7.47395L64.6839 7.47077C65.7803 7.19524 67.0243 7.67777 67.6625 8.61588L67.6624 8.61597L67.6701 8.62671C68.342 9.56036 68.3425 10.9288 67.6706 11.8648C67.1785 12.5423 66.6694 13.2017 66.155 13.868C65.9334 14.155 65.7108 14.4433 65.4882 14.7348L65.4882 14.7348L65.4844 14.7398C64.993 15.4004 64.246 15.8552 63.4521 15.9295L63.4421 15.9305L63.4322 15.9318C62.3998 16.0705 61.3106 15.5317 60.7467 14.64L60.7468 14.64L60.743 14.6342C60.1509 13.7261 60.1469 12.4689 60.7458 11.575C61.0844 11.0732 61.4415 10.6149 61.8101 10.1419C62.045 9.84035 62.2846 9.53285 62.5271 9.2043L62.5315 9.19836L62.5357 9.19231C63.1218 8.34694 63.7881 7.64753 64.6584 7.47646Z"
}), /*#__PURE__*/react.createElement("path", {
  fill: color2 || color,
  d: "M9.1035 52.7146L9.10339 52.7146L9.10959 52.7242C9.61976 53.5086 9.69969 54.5556 9.31215 55.4074L9.31203 55.4073L9.3075 55.4179C8.99412 56.151 8.32607 56.7223 7.54436 56.9868L7.54435 56.9867L7.53882 56.9887C7.25069 57.0899 6.96386 57.1915 6.67775 57.2929C5.85252 57.5851 5.03327 57.8753 4.20585 58.1494C2.88406 58.5805 1.28928 57.8557 0.73953 56.5805L0.739568 56.5805L0.736959 56.5746C0.298212 55.5917 0.479602 54.364 1.19027 53.5627L1.19686 53.5553L1.20314 53.5476C1.6916 52.9508 2.45793 52.6934 3.3518 52.3949C3.72626 52.2778 4.10085 52.1416 4.46252 52.0101C4.60186 51.9594 4.73929 51.9095 4.87405 51.8616C5.36653 51.6865 5.84197 51.5316 6.32524 51.4321C7.39124 51.2688 8.53599 51.797 9.1035 52.7146Z"
}), /*#__PURE__*/react.createElement("path", {
  fill: color2 || color,
  d: "M74.917 52.321L74.9261 52.319L74.935 52.3166C75.4253 52.1861 75.9225 52.2375 76.4623 52.3842C76.7328 52.4577 77.0055 52.5526 77.2898 52.656C77.3509 52.6782 77.413 52.701 77.4757 52.724C77.6946 52.8043 77.9217 52.8877 78.1459 52.9614C78.406 53.0611 78.6797 53.1532 78.9413 53.2412C79.0731 53.2856 79.2019 53.3289 79.3243 53.3717C79.7068 53.5052 80.0617 53.6439 80.3896 53.8238C81.4328 54.4164 82.0027 55.7415 81.7105 56.9034L81.708 56.9133L81.7059 56.9232C81.4692 58.0575 80.4067 58.9696 79.2397 59.0825L79.2232 59.0841L79.2068 59.0868C78.7908 59.1551 78.3721 59.0838 77.9091 58.9398C77.6798 58.8685 77.4506 58.7831 77.2069 58.6922L77.1977 58.6888C76.9612 58.6007 76.7104 58.5074 76.4561 58.4291C76.1741 58.3188 75.8615 58.216 75.566 58.1188C75.3822 58.0584 75.205 58.0001 75.0459 57.9435C74.5929 57.7825 74.1892 57.6064 73.8393 57.3535C72.9483 56.7004 72.5215 55.4683 72.8144 54.4013L72.8166 54.3932L72.8186 54.3849C73.0576 53.3821 73.9076 52.5499 74.917 52.321Z"
}), /*#__PURE__*/react.createElement("path", {
  fill: color2 || color,
  d: "M40.6913 76.2998L40.7 76.2986L40.7087 76.2972C41.8584 76.1015 43.0985 76.7128 43.6408 77.7436L43.6442 77.7501L43.6478 77.7564C43.8887 78.1837 43.9758 78.6685 43.9993 79.2212C44.011 79.4979 44.0067 79.7806 44.0013 80.078C44.001 80.0907 44.0008 80.1034 44.0006 80.1161C43.9955 80.3921 43.9902 80.6816 43.9997 80.9678C43.9933 81.2159 43.9971 81.4678 44.0007 81.7092C44.0012 81.7428 44.0017 81.7763 44.0021 81.8095C44.0061 82.0909 44.008 82.359 43.9943 82.6204C43.9668 83.1429 43.8781 83.6015 43.6475 84.005L43.6436 84.0118L43.64 84.0188C43.2053 84.838 42.3245 85.3877 41.3742 85.5H40.9201C39.9328 85.3909 39.019 84.7947 38.5953 83.9235L38.5917 83.9163L38.588 83.9092C38.4024 83.5568 38.323 83.1608 38.2935 82.7141C38.2738 82.416 38.2767 82.1323 38.2798 81.8311C38.2816 81.6608 38.2834 81.4849 38.2812 81.2976C38.2886 80.9548 38.2844 80.6321 38.2803 80.3199C38.2728 79.7459 38.2657 79.2076 38.3326 78.6457C38.4936 77.468 39.5115 76.4581 40.6913 76.2998Z"
}));
/* harmony default export */ const shining_star_outline = (IconShiningStarOutline);
;// CONCATENATED MODULE: ./src/content-script/ui/components/svg-icons/star.jsx

const IconStar = ({
  style,
  color,
  className,
  onClick
}) => /*#__PURE__*/react.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "34px",
  height: "35px",
  viewBox: "0 0 34 35",
  style: style,
  className: className,
  onClick: onClick
}, /*#__PURE__*/react.createElement("path", {
  fill: color,
  d: "M33.1,15.9c0.7-0.7,0.9-1.7,0.6-2.6c-0.3-0.9-1-1.6-2-1.7l-8.2-1.2c-0.3-0.1-0.6-0.3-0.8-0.6l-3.7-7.7 c-0.4-0.9-1.2-1.4-2.2-1.4c-0.9,0-1.8,0.5-2.2,1.4l-3.7,7.7c-0.2,0.3-0.5,0.6-0.8,0.6l-8.2,1.2c-0.9,0.1-1.7,0.8-2,1.7 c-0.3,0.9-0.1,1.9,0.6,2.6l5.9,6c0.3,0.3,0.4,0.6,0.3,1l-1.4,8.4c-0.1,0.7,0.1,1.5,0.5,2c0.7,0.9,2,1.2,3,0.6l7.3-4 c0.3-0.2,0.7-0.2,1,0l7.3,4c0.4,0.2,0.7,0.3,1.1,0.3c0.7,0,1.4-0.3,1.9-0.9c0.5-0.6,0.7-1.3,0.5-2l-1.4-8.4c-0.1-0.4,0.1-0.7,0.3-1 L33.1,15.9z"
}));
/* harmony default export */ const star = (IconStar);
// EXTERNAL MODULE: ./node_modules/shallowequal/index.js
var shallowequal = __webpack_require__(774);
var shallowequal_default = /*#__PURE__*/__webpack_require__.n(shallowequal);
;// CONCATENATED MODULE: ./node_modules/@emotion/stylis/dist/stylis.browser.esm.js
function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

/* harmony default export */ const stylis_browser_esm = (stylis_min);

;// CONCATENATED MODULE: ./node_modules/@emotion/unitless/dist/unitless.browser.esm.js
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ const unitless_browser_esm = (unitlessKeys);

;// CONCATENATED MODULE: ./node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function memoize(fn) {
  var cache = Object.create(null);
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}



;// CONCATENATED MODULE: ./node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js


// eslint-disable-next-line no-undef
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var isPropValid = /* #__PURE__ */memoize(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);



;// CONCATENATED MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
function v(){return(v=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var g=function(e,t){for(var n=[e[0]],r=0,o=t.length;r<o;r+=1)n.push(t[r],e[r+1]);return n},S=function(t){return null!==t&&"object"==typeof t&&"[object Object]"===(t.toString?t.toString():Object.prototype.toString.call(t))&&!(0,react_is.typeOf)(t)},w=Object.freeze([]),E=Object.freeze({});function b(e){return"function"==typeof e}function _(e){return false||e.displayName||e.name||"Component"}function N(e){return e&&"string"==typeof e.styledComponentId}var A="undefined"!=typeof process&&void 0!==process.env&&(process.env.REACT_APP_SC_ATTR||process.env.SC_ATTR)||"data-styled",C="5.3.9",I="undefined"!=typeof window&&"HTMLElement"in window,P=Boolean("boolean"==typeof SC_DISABLE_SPEEDY?SC_DISABLE_SPEEDY:"undefined"!=typeof process&&void 0!==process.env&&(void 0!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&""!==process.env.REACT_APP_SC_DISABLE_SPEEDY?"false"!==process.env.REACT_APP_SC_DISABLE_SPEEDY&&process.env.REACT_APP_SC_DISABLE_SPEEDY:void 0!==process.env.SC_DISABLE_SPEEDY&&""!==process.env.SC_DISABLE_SPEEDY?"false"!==process.env.SC_DISABLE_SPEEDY&&process.env.SC_DISABLE_SPEEDY:"production"!=="production")),O={},R= false?0:{};function D(){for(var e=arguments.length<=0?void 0:arguments[0],t=[],n=1,r=arguments.length;n<r;n+=1)t.push(n<0||arguments.length<=n?void 0:arguments[n]);return t.forEach((function(t){e=e.replace(/%[a-z]/,t)})),e}function j(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];throw true?new Error("An error occurred. See https://git.io/JUIaE#"+e+" for more information."+(n.length>0?" Args: "+n.join(", "):"")):0}var T=function(){function e(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e}var t=e.prototype;return t.indexOfGroup=function(e){for(var t=0,n=0;n<e;n++)t+=this.groupSizes[n];return t},t.insertRules=function(e,t){if(e>=this.groupSizes.length){for(var n=this.groupSizes,r=n.length,o=r;e>=o;)(o<<=1)<0&&j(16,""+e);this.groupSizes=new Uint32Array(o),this.groupSizes.set(n),this.length=o;for(var s=r;s<o;s++)this.groupSizes[s]=0}for(var i=this.indexOfGroup(e+1),a=0,c=t.length;a<c;a++)this.tag.insertRule(i,t[a])&&(this.groupSizes[e]++,i++)},t.clearGroup=function(e){if(e<this.length){var t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(var o=n;o<r;o++)this.tag.deleteRule(n)}},t.getGroup=function(e){var t="";if(e>=this.length||0===this.groupSizes[e])return t;for(var n=this.groupSizes[e],r=this.indexOfGroup(e),o=r+n,s=r;s<o;s++)t+=this.tag.getRule(s)+"/*!sc*/\n";return t},e}(),x=new Map,k=new Map,V=1,B=function(e){if(x.has(e))return x.get(e);for(;k.has(V);)V++;var t=V++;return false&&0,x.set(e,t),k.set(t,e),t},z=function(e){return k.get(e)},M=function(e,t){t>=V&&(V=t+1),x.set(e,t),k.set(t,e)},G="style["+A+'][data-styled-version="5.3.9"]',L=new RegExp("^"+A+'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),F=function(e,t,n){for(var r,o=n.split(","),s=0,i=o.length;s<i;s++)(r=o[s])&&e.registerName(t,r)},Y=function(e,t){for(var n=(t.textContent||"").split("/*!sc*/\n"),r=[],o=0,s=n.length;o<s;o++){var i=n[o].trim();if(i){var a=i.match(L);if(a){var c=0|parseInt(a[1],10),u=a[2];0!==c&&(M(u,c),F(e,u,a[3]),e.getTag().insertRules(c,r)),r.length=0}else r.push(i)}}},q=function(){return true?__webpack_require__.nc:0},H=function(e){var t=document.head,n=e||t,r=document.createElement("style"),o=function(e){for(var t=e.childNodes,n=t.length;n>=0;n--){var r=t[n];if(r&&1===r.nodeType&&r.hasAttribute(A))return r}}(n),s=void 0!==o?o.nextSibling:null;r.setAttribute(A,"active"),r.setAttribute("data-styled-version","5.3.9");var i=q();return i&&r.setAttribute("nonce",i),n.insertBefore(r,s),r},$=function(){function e(e){var t=this.element=H(e);t.appendChild(document.createTextNode("")),this.sheet=function(e){if(e.sheet)return e.sheet;for(var t=document.styleSheets,n=0,r=t.length;n<r;n++){var o=t[n];if(o.ownerNode===e)return o}j(17)}(t),this.length=0}var t=e.prototype;return t.insertRule=function(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch(e){return!1}},t.deleteRule=function(e){this.sheet.deleteRule(e),this.length--},t.getRule=function(e){var t=this.sheet.cssRules[e];return void 0!==t&&"string"==typeof t.cssText?t.cssText:""},e}(),W=function(){function e(e){var t=this.element=H(e);this.nodes=t.childNodes,this.length=0}var t=e.prototype;return t.insertRule=function(e,t){if(e<=this.length&&e>=0){var n=document.createTextNode(t),r=this.nodes[e];return this.element.insertBefore(n,r||null),this.length++,!0}return!1},t.deleteRule=function(e){this.element.removeChild(this.nodes[e]),this.length--},t.getRule=function(e){return e<this.length?this.nodes[e].textContent:""},e}(),U=function(){function e(e){this.rules=[],this.length=0}var t=e.prototype;return t.insertRule=function(e,t){return e<=this.length&&(this.rules.splice(e,0,t),this.length++,!0)},t.deleteRule=function(e){this.rules.splice(e,1),this.length--},t.getRule=function(e){return e<this.length?this.rules[e]:""},e}(),J=I,X={isServer:!I,useCSSOMInjection:!P},Z=function(){function e(e,t,n){void 0===e&&(e=E),void 0===t&&(t={}),this.options=v({},X,{},e),this.gs=t,this.names=new Map(n),this.server=!!e.isServer,!this.server&&I&&J&&(J=!1,function(e){for(var t=document.querySelectorAll(G),n=0,r=t.length;n<r;n++){var o=t[n];o&&"active"!==o.getAttribute(A)&&(Y(e,o),o.parentNode&&o.parentNode.removeChild(o))}}(this))}e.registerId=function(e){return B(e)};var t=e.prototype;return t.reconstructWithOptions=function(t,n){return void 0===n&&(n=!0),new e(v({},this.options,{},t),this.gs,n&&this.names||void 0)},t.allocateGSInstance=function(e){return this.gs[e]=(this.gs[e]||0)+1},t.getTag=function(){return this.tag||(this.tag=(n=(t=this.options).isServer,r=t.useCSSOMInjection,o=t.target,e=n?new U(o):r?new $(o):new W(o),new T(e)));var e,t,n,r,o},t.hasNameForId=function(e,t){return this.names.has(e)&&this.names.get(e).has(t)},t.registerName=function(e,t){if(B(e),this.names.has(e))this.names.get(e).add(t);else{var n=new Set;n.add(t),this.names.set(e,n)}},t.insertRules=function(e,t,n){this.registerName(e,t),this.getTag().insertRules(B(e),n)},t.clearNames=function(e){this.names.has(e)&&this.names.get(e).clear()},t.clearRules=function(e){this.getTag().clearGroup(B(e)),this.clearNames(e)},t.clearTag=function(){this.tag=void 0},t.toString=function(){return function(e){for(var t=e.getTag(),n=t.length,r="",o=0;o<n;o++){var s=z(o);if(void 0!==s){var i=e.names.get(s),a=t.getGroup(o);if(i&&a&&i.size){var c=A+".g"+o+'[id="'+s+'"]',u="";void 0!==i&&i.forEach((function(e){e.length>0&&(u+=e+",")})),r+=""+a+c+'{content:"'+u+'"}/*!sc*/\n'}}}return r}(this)},e}(),K=/(a)(d)/gi,Q=function(e){return String.fromCharCode(e+(e>25?39:97))};function ee(e){var t,n="";for(t=Math.abs(e);t>52;t=t/52|0)n=Q(t%52)+n;return(Q(t%52)+n).replace(K,"$1-$2")}var te=function(e,t){for(var n=t.length;n;)e=33*e^t.charCodeAt(--n);return e},ne=function(e){return te(5381,e)};function re(e){for(var t=0;t<e.length;t+=1){var n=e[t];if(b(n)&&!N(n))return!1}return!0}var oe=ne("5.3.9"),se=function(){function e(e,t,n){this.rules=e,this.staticRulesId="",this.isStatic= true&&(void 0===n||n.isStatic)&&re(e),this.componentId=t,this.baseHash=te(oe,t),this.baseStyle=n,Z.registerId(t)}return e.prototype.generateAndInjectStyles=function(e,t,n){var r=this.componentId,o=[];if(this.baseStyle&&o.push(this.baseStyle.generateAndInjectStyles(e,t,n)),this.isStatic&&!n.hash)if(this.staticRulesId&&t.hasNameForId(r,this.staticRulesId))o.push(this.staticRulesId);else{var s=Ne(this.rules,e,t,n).join(""),i=ee(te(this.baseHash,s)>>>0);if(!t.hasNameForId(r,i)){var a=n(s,"."+i,void 0,r);t.insertRules(r,i,a)}o.push(i),this.staticRulesId=i}else{for(var c=this.rules.length,u=te(this.baseHash,n.hash),l="",d=0;d<c;d++){var h=this.rules[d];if("string"==typeof h)l+=h, false&&(0);else if(h){var p=Ne(h,e,t,n),f=Array.isArray(p)?p.join(""):p;u=te(u,f+d),l+=f}}if(l){var m=ee(u>>>0);if(!t.hasNameForId(r,m)){var y=n(l,"."+m,void 0,r);t.insertRules(r,m,y)}o.push(m)}}return o.join(" ")},e}(),ie=/^\s*\/\/.*$/gm,ae=[":","[",".","#"];function ce(e){var t,n,r,o,s=void 0===e?E:e,i=s.options,a=void 0===i?E:i,c=s.plugins,u=void 0===c?w:c,l=new stylis_browser_esm(a),d=[],h=function(e){function t(t){if(t)try{e(t+"}")}catch(e){}}return function(n,r,o,s,i,a,c,u,l,d){switch(n){case 1:if(0===l&&64===r.charCodeAt(0))return e(r+";"),"";break;case 2:if(0===u)return r+"/*|*/";break;case 3:switch(u){case 102:case 112:return e(o[0]+r),"";default:return r+(0===d?"/*|*/":"")}case-2:r.split("/*|*/}").forEach(t)}}}((function(e){d.push(e)})),f=function(e,r,s){return 0===r&&-1!==ae.indexOf(s[n.length])||s.match(o)?e:"."+t};function m(e,s,i,a){void 0===a&&(a="&");var c=e.replace(ie,""),u=s&&i?i+" "+s+" { "+c+" }":c;return t=a,n=s,r=new RegExp("\\"+n+"\\b","g"),o=new RegExp("(\\"+n+"\\b){2,}"),l(i||!s?"":s,u)}return l.use([].concat(u,[function(e,t,o){2===e&&o.length&&o[0].lastIndexOf(n)>0&&(o[0]=o[0].replace(r,f))},h,function(e){if(-2===e){var t=d;return d=[],t}}])),m.hash=u.length?u.reduce((function(e,t){return t.name||j(15),te(e,t.name)}),5381).toString():"",m}var ue=react.createContext(),le=ue.Consumer,de=react.createContext(),he=(de.Consumer,new Z),pe=ce();function fe(){return (0,react.useContext)(ue)||he}function me(){return (0,react.useContext)(de)||pe}function ye(e){var t=(0,react.useState)(e.stylisPlugins),n=t[0],s=t[1],c=fe(),u=(0,react.useMemo)((function(){var t=c;return e.sheet?t=e.sheet:e.target&&(t=t.reconstructWithOptions({target:e.target},!1)),e.disableCSSOMInjection&&(t=t.reconstructWithOptions({useCSSOMInjection:!1})),t}),[e.disableCSSOMInjection,e.sheet,e.target]),l=(0,react.useMemo)((function(){return ce({options:{prefix:!e.disableVendorPrefixes},plugins:n})}),[e.disableVendorPrefixes,n]);return (0,react.useEffect)((function(){shallowequal_default()(n,e.stylisPlugins)||s(e.stylisPlugins)}),[e.stylisPlugins]),react.createElement(ue.Provider,{value:u},react.createElement(de.Provider,{value:l}, false?0:e.children))}var ve=function(){function e(e,t){var n=this;this.inject=function(e,t){void 0===t&&(t=pe);var r=n.name+t.hash;e.hasNameForId(n.id,r)||e.insertRules(n.id,r,t(n.rules,r,"@keyframes"))},this.toString=function(){return j(12,String(n.name))},this.name=e,this.id="sc-keyframes-"+e,this.rules=t}return e.prototype.getName=function(e){return void 0===e&&(e=pe),this.name+e.hash},e}(),ge=/([A-Z])/,Se=/([A-Z])/g,we=/^ms-/,Ee=function(e){return"-"+e.toLowerCase()};function be(e){return ge.test(e)?e.replace(Se,Ee).replace(we,"-ms-"):e}var _e=function(e){return null==e||!1===e||""===e};function Ne(e,n,r,o){if(Array.isArray(e)){for(var s,i=[],a=0,c=e.length;a<c;a+=1)""!==(s=Ne(e[a],n,r,o))&&(Array.isArray(s)?i.push.apply(i,s):i.push(s));return i}if(_e(e))return"";if(N(e))return"."+e.styledComponentId;if(b(e)){if("function"!=typeof(l=e)||l.prototype&&l.prototype.isReactComponent||!n)return e;var u=e(n);return false&&0,Ne(u,n,r,o)}var l;return e instanceof ve?r?(e.inject(r,o),e.getName(o)):e:S(e)?function e(t,n){var r,o,s=[];for(var i in t)t.hasOwnProperty(i)&&!_e(t[i])&&(Array.isArray(t[i])&&t[i].isCss||b(t[i])?s.push(be(i)+":",t[i],";"):S(t[i])?s.push.apply(s,e(t[i],i)):s.push(be(i)+": "+(r=i,null==(o=t[i])||"boolean"==typeof o||""===o?"":"number"!=typeof o||0===o||r in unitless_browser_esm?String(o).trim():o+"px")+";"));return n?[n+" {"].concat(s,["}"]):s}(e):e.toString()}var Ae=function(e){return Array.isArray(e)&&(e.isCss=!0),e};function Ce(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return b(e)||S(e)?Ae(Ne(g(w,[e].concat(n)))):0===n.length&&1===e.length&&"string"==typeof e[0]?e:Ae(Ne(g(e,n)))}var Ie=/invalid hook call/i,Pe=new Set,Oe=function(e,t){if(false){ var o, n, r; }},Re=function(e,t,n){return void 0===n&&(n=E),e.theme!==n.theme&&e.theme||t||n.theme},De=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,je=/(^-|-$)/g;function Te(e){return e.replace(De,"-").replace(je,"")}var xe=function(e){return ee(ne(e)>>>0)};function ke(e){return"string"==typeof e&&( true||0)}var Ve=function(e){return"function"==typeof e||"object"==typeof e&&null!==e&&!Array.isArray(e)},Be=function(e){return"__proto__"!==e&&"constructor"!==e&&"prototype"!==e};function ze(e,t,n){var r=e[n];Ve(t)&&Ve(r)?Me(r,t):e[n]=t}function Me(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var o=0,s=n;o<s.length;o++){var i=s[o];if(Ve(i))for(var a in i)Be(a)&&ze(e,i[a],a)}return e}var Ge=react.createContext(),Le=Ge.Consumer;function Fe(e){var t=s(Ge),n=i((function(){return function(e,t){if(!e)return j(14);if(b(e)){var n=e(t);return true?n:0}return Array.isArray(e)||"object"!=typeof e?j(8):t?v({},t,{},e):e}(e.theme,t)}),[e.theme,t]);return e.children?r.createElement(Ge.Provider,{value:n},e.children):null}var Ye={};function qe(e,t,n){var o=N(e),i=!ke(e),a=t.attrs,c=void 0===a?w:a,d=t.componentId,h=void 0===d?function(e,t){var n="string"!=typeof e?"sc":Te(e);Ye[n]=(Ye[n]||0)+1;var r=n+"-"+xe("5.3.9"+n+Ye[n]);return t?t+"-"+r:r}(t.displayName,t.parentComponentId):d,p=t.displayName,f=void 0===p?function(e){return ke(e)?"styled."+e:"Styled("+_(e)+")"}(e):p,g=t.displayName&&t.componentId?Te(t.displayName)+"-"+t.componentId:t.componentId||h,S=o&&e.attrs?Array.prototype.concat(e.attrs,c).filter(Boolean):c,A=t.shouldForwardProp;o&&e.shouldForwardProp&&(A=t.shouldForwardProp?function(n,r,o){return e.shouldForwardProp(n,r,o)&&t.shouldForwardProp(n,r,o)}:e.shouldForwardProp);var C,I=new se(n,g,o?e.componentStyle:void 0),P=I.isStatic&&0===c.length,O=function(e,t){return function(e,t,n,r){var o=e.attrs,i=e.componentStyle,a=e.defaultProps,c=e.foldedComponentIds,d=e.shouldForwardProp,h=e.styledComponentId,p=e.target; false&&0;var f=function(e,t,n){void 0===e&&(e=E);var r=v({},t,{theme:e}),o={};return n.forEach((function(e){var t,n,s,i=e;for(t in b(i)&&(i=i(r)),i)r[t]=o[t]="className"===t?(n=o[t],s=i[t],n&&s?n+" "+s:n||s):i[t]})),[r,o]}(Re(t,(0,react.useContext)(Ge),a)||E,t,o),y=f[0],g=f[1],S=function(e,t,n,r){var o=fe(),s=me(),i=t?e.generateAndInjectStyles(E,o,s):e.generateAndInjectStyles(n,o,s);return false&&0, false&&0,i}(i,r,y, false?0:void 0),w=n,_=g.$as||t.$as||g.as||t.as||p,N=ke(_),A=g!==t?v({},t,{},g):t,C={};for(var I in A)"$"!==I[0]&&"as"!==I&&("forwardedAs"===I?C.as=A[I]:(d?d(I,isPropValid,_):!N||isPropValid(I))&&(C[I]=A[I]));return t.style&&g.style!==t.style&&(C.style=v({},t.style,{},g.style)),C.className=Array.prototype.concat(c,h,S!==h?S:null,t.className,g.className).filter(Boolean).join(" "),C.ref=w,(0,react.createElement)(_,C)}(C,e,t,P)};return O.displayName=f,(C=react.forwardRef(O)).attrs=S,C.componentStyle=I,C.displayName=f,C.shouldForwardProp=A,C.foldedComponentIds=o?Array.prototype.concat(e.foldedComponentIds,e.styledComponentId):w,C.styledComponentId=g,C.target=o?e.target:e,C.withComponent=function(e){var r=t.componentId,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(t,["componentId"]),s=r&&r+"-"+(ke(e)?e:Te(_(e)));return qe(e,v({},o,{attrs:S,componentId:s}),n)},Object.defineProperty(C,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(t){this._foldedDefaultProps=o?Me({},e.defaultProps,t):t}}), false&&(0),Object.defineProperty(C,"toString",{value:function(){return"."+C.styledComponentId}}),i&&hoist_non_react_statics_cjs_default()(C,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0,withComponent:!0}),C}var He=function(e){return function e(t,r,o){if(void 0===o&&(o=E),!(0,react_is.isValidElementType)(r))return j(1,String(r));var s=function(){return t(r,o,Ce.apply(void 0,arguments))};return s.withConfig=function(n){return e(t,r,v({},o,{},n))},s.attrs=function(n){return e(t,r,v({},o,{attrs:Array.prototype.concat(o.attrs,n).filter(Boolean)}))},s}(qe,e)};["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","textPath","tspan"].forEach((function(e){He[e]=He(e)}));var $e=function(){function e(e,t){this.rules=e,this.componentId=t,this.isStatic=re(e),Z.registerId(this.componentId+1)}var t=e.prototype;return t.createStyles=function(e,t,n,r){var o=r(Ne(this.rules,t,n,r).join(""),""),s=this.componentId+e;n.insertRules(s,s,o)},t.removeStyles=function(e,t){t.clearRules(this.componentId+e)},t.renderStyles=function(e,t,n,r){e>2&&Z.registerId(this.componentId+e),this.removeStyles(e,n),this.createStyles(e,t,n,r)},e}();function We(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];var i=Ce.apply(void 0,[e].concat(n)),a="sc-global-"+xe(JSON.stringify(i)),u=new $e(i,a);function l(e){var t=fe(),n=me(),o=s(Ge),l=c(t.allocateGSInstance(a)).current;return false&&0, false&&0,t.server&&h(l,e,t,o,n),d((function(){if(!t.server)return h(l,e,t,o,n),function(){return u.removeStyles(l,t)}}),[l,e,t,o,n]),null}function h(e,t,n,r,o){if(u.isStatic)u.renderStyles(e,O,n,o);else{var s=v({},t,{theme:Re(t,r,l.defaultProps)});u.renderStyles(e,s,n,o)}}return false&&0,r.memo(l)}function Ue(e){ false&&0;for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var o=Ce.apply(void 0,[e].concat(n)).join(""),s=xe(o);return new ve(s,o)}var Je=function(){function e(){var e=this;this._emitSheetCSS=function(){var t=e.instance.toString();if(!t)return"";var n=q();return"<style "+[n&&'nonce="'+n+'"',A+'="true"','data-styled-version="5.3.9"'].filter(Boolean).join(" ")+">"+t+"</style>"},this.getStyleTags=function(){return e.sealed?j(2):e._emitSheetCSS()},this.getStyleElement=function(){var t;if(e.sealed)return j(2);var n=((t={})[A]="",t["data-styled-version"]="5.3.9",t.dangerouslySetInnerHTML={__html:e.instance.toString()},t),o=q();return o&&(n.nonce=o),[react.createElement("style",v({},n,{key:"sc-0-0"}))]},this.seal=function(){e.sealed=!0},this.instance=new Z({isServer:!0}),this.sealed=!1}var t=e.prototype;return t.collectStyles=function(e){return this.sealed?j(2):react.createElement(ye,{sheet:this.instance},e)},t.interleaveWithNodeStream=function(e){return j(3)},e}(),Xe=function(e){var t=r.forwardRef((function(t,n){var o=s(Ge),i=e.defaultProps,a=Re(t,o,i);return false&&0,r.createElement(e,v({},t,{theme:a,ref:n}))}));return y(t,e),t.displayName="WithTheme("+_(e)+")",t},Ze=function(){return s(Ge)},Ke={StyleSheet:Z,masterSheet:he}; false&&0, false&&(0);/* harmony default export */ const styled_components_browser_esm = (He);
//# sourceMappingURL=styled-components.browser.esm.js.map

;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/AskingForReviewByDownloadsModalComponent/Body/style.jsx
// vendor imports

const BodyContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__BodyContainer",
  componentId: "sc-12yzoir-0"
})`@media screen and (max-width:1023px){max-width:478px;}display:flex;flex-direction:row;padding-top:9px;${props => props.isMobile && Ce`flex-direction:column;justify-content:center;align-items:center;`};`;
const BodyColumn = styled_components_browser_esm.div.withConfig({
  displayName: "style__BodyColumn",
  componentId: "sc-12yzoir-1"
})`${props => !props.isMobile && Ce`min-width:390px`};${props => props.dir === "rtl" ? "margin-right: 10px;" : "margin-left: 10px;"}`;
const BodyText = styled_components_browser_esm.span.withConfig({
  displayName: "style__BodyText",
  componentId: "sc-12yzoir-2"
})`font-size:17px;line-height:30px;color:${props => props.color};& b{font-weight:bold;color:${props => props.color2};}`;
const StarsContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__StarsContainer",
  componentId: "sc-12yzoir-3"
})`display:flex;flex-direction:row;align-items:center;justify-content:center;padding:7px 0;& svg{&:not(:last-child){margin:0 9px;}&:last-child{transform:translateY(4px);margin:0 2px;}& path{fill:${props => props.iconColor};}}`;

;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/AskingForReviewByDownloadsModalComponent/Body/index.jsx
// react imports



// local imports
// hooks


// config


// images




// components

const Body = ({
  close
}) => {
  const {
    dir,
    downloadsCount,
    eventRouter,
    isMobile,
    theme
  } = hooks_useAppState(["dir", "downloadsCount", "eventRouter", "isMobile", "theme"]);
  const {
    t
  } = useTranslation_useTranslation();
  const modalNotificationStyles = theme && theme.modal_notification;
  const iconColor = modalNotificationStyles && modalNotificationStyles.modal_icon_color;
  const iconColor2 = modalNotificationStyles && modalNotificationStyles.modal_icon_color2;
  const iconColor3 = modalNotificationStyles && modalNotificationStyles.modal_icon_color3;
  const bodyColor = modalNotificationStyles && modalNotificationStyles.modal_body;
  const bodyColor2 = modalNotificationStyles && modalNotificationStyles.modal_body2;
  const redirectToStore = (0,react.useCallback)(() => {
    window.open(config.ratingUrl, "_blank").focus();
    eventRouter.emit("userRedirectedToStore", "askingForReviewByDownloads");
    close();
  }, [eventRouter, close]);
  return /*#__PURE__*/react.createElement(BodyContainer, {
    isMobile: isMobile
  }, /*#__PURE__*/react.createElement(shining_star_outline, {
    color: iconColor,
    color2: iconColor2,
    style: {
      margin: "10px 8px"
    }
  }), /*#__PURE__*/react.createElement(BodyColumn, {
    dir: dir,
    isMobile: isMobile
  }, /*#__PURE__*/react.createElement(BodyText, {
    color: bodyColor,
    color2: bodyColor2
  }, /*#__PURE__*/react.createElement(Trans_Trans, {
    count: {
      downloadsCount
    },
    i18nKey: "social_media_sharing.asking_for_review_by_downloads",
    values: {
      downloadsCount
    }
  }, "You've successfully downloaded ", {
    downloadsCount
  }, " ", t("social_media_sharing.mediafile"), ".", /*#__PURE__*/react.createElement("br", null), "We would be grateful for the review and ", /*#__PURE__*/react.createElement("b", null, "5 stars"), " ;)", /*#__PURE__*/react.createElement("br", null), "It's really important for development.")), /*#__PURE__*/react.createElement(StarsContainer, {
    iconColor: iconColor3
  }, /*#__PURE__*/react.createElement(star, {
    onClick: redirectToStore
  }), /*#__PURE__*/react.createElement(star, {
    onClick: redirectToStore
  }), /*#__PURE__*/react.createElement(star, {
    onClick: redirectToStore
  }), /*#__PURE__*/react.createElement(star, {
    onClick: redirectToStore
  }), /*#__PURE__*/react.createElement(shining_star, {
    onClick: redirectToStore
  }))));
};
/* harmony default export */ const AskingForReviewByDownloadsModalComponent_Body = (Body);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/AskingForReviewByDownloadsModalComponent/Footer/style.jsx
// vendor imports

const FooterContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__FooterContainer",
  componentId: "sc-1phnkhg-0"
})`@media screen and (max-width:1023px){max-width:478px;}display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding-top:14px;& button{margin:0;&:first-child{padding:16px 28px;}&:last-child{padding:16px 60px;& span{font-weight:bold;}}}`;
const ButtonUnderline = styled_components_browser_esm.button.withConfig({
  displayName: "style__ButtonUnderline",
  componentId: "sc-1phnkhg-1"
})`outline:none;border:none;padding:6px 8px;margin:0 auto 24px;display:block;cursor:pointer;font-size:16px;text-decoration:underline;background-color:transparent;color:${props => props.color};&:hover{color:${props => props.hover};}`;

;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ButtonComponent/style.jsx
// vendor imports

const Button = styled_components_browser_esm.button.withConfig({
  displayName: "style__Button",
  componentId: "sc-4lybw9-0"
})`outline:none;padding:6px 8px;display:inline-flex;align-items:center;vertical-align:middle;background-color:${props => props.background};color:${props => props.color};border-radius:2px;border:${props => {
  if (props.styleName === "glowBorder") {
    return `1px solid ${props.border || "black"}`;
  }
  return "none";
}};& svg{fill:${props => props.color};${props => props.dir === "rtl" && "transform: scaleX(-1);"} & + span{${props => props.dir === "rtl" ? "margin-right: 6px;" : "margin-left: 6px;"}}}&:not(:disabled){cursor:pointer;&:hover{${props => props.styleName === "glowBorder" && `
        border-color: ${props.hoverBorder};
        box-shadow: ${props.hoverBoxShadow};
      `} background-color:${props => props.hoverBackground};color:${props => props.hoverColor};& svg{fill:${props => props.hoverColor};}}${props => props.styleName === "glowBorder" && `
      &:active {
        border-color: ${props.activerBorder};
        box-shadow: ${props.activeBoxShadow};
        background-color: ${props.activeBackground};
        color: ${props.activeColor};
        & svg { fill: ${props.activeColor}; }
      }
    `}}&:disabled{opacity:0.5;}`;
const Text = styled_components_browser_esm.span.withConfig({
  displayName: "style__Text",
  componentId: "sc-4lybw9-1"
})`font-family:Arial,Helvetica,sans-serif;font-weight:500;font-size:16px;`;

;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ButtonComponent/index.jsx
// react imports


// local imports
// hooks


// components

const ButtonComponent = ({
  disabled,
  icon,
  onClick,
  styleName,
  text,
  type
}) => {
  const {
    dir,
    theme
  } = hooks_useAppState(["dir", "theme"]);
  const buttonStyles = theme && (styleName === "glowBorder" ? theme.button_glow_border : theme.button_solid);
  const border = buttonStyles && buttonStyles.border;
  const background = buttonStyles && buttonStyles.background;
  const color = buttonStyles && buttonStyles.color;
  const hoverBorder = buttonStyles && buttonStyles.hover_border;
  const hoverBackground = buttonStyles && buttonStyles.hover_background;
  const hoverBoxShadow = buttonStyles && buttonStyles.hover_box_shadow;
  const hoverColor = buttonStyles && buttonStyles.hover_color;
  const activeBorder = buttonStyles && buttonStyles.active_border;
  const activeBackground = buttonStyles && buttonStyles.active_background;
  const activeBoxShadow = buttonStyles && buttonStyles.active_box_shadow;
  const activeColor = buttonStyles && buttonStyles.active_color;
  return /*#__PURE__*/react.createElement(Button, {
    activeBackground: activeBackground,
    activeBorder: activeBorder,
    activeBoxShadow: activeBoxShadow,
    activeColor: activeColor,
    background: background,
    border: border,
    color: color,
    dir: dir,
    disabled: disabled,
    hoverBackground: hoverBackground,
    hoverBorder: hoverBorder,
    hoverBoxShadow: hoverBoxShadow,
    hoverColor: hoverColor,
    onClick: onClick,
    styleName: styleName,
    type: type
  }, icon ? /*#__PURE__*/react.createElement(icon) : null, text ? /*#__PURE__*/react.createElement(Text, null, text) : null);
};
/* harmony default export */ const common_ButtonComponent = (ButtonComponent);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/AskingForReviewByDownloadsModalComponent/Footer/index.jsx
// react imports



// local imports
// hooks


// config


// components


const Footer = ({
  close
}) => {
  const {
    eventRouter,
    incrementRatingModalShownCount,
    setRatingModalLastNotNow,
    theme
  } = hooks_useAppState(["eventRouter", "incrementRatingModalShownCount", "setRatingModalLastNotNow", "theme"]);
  const {
    t
  } = useTranslation_useTranslation();
  const modalNotificationStyles = theme && theme.modal_notification;
  const buttonUnderline = modalNotificationStyles && modalNotificationStyles.button_underline;
  const color = buttonUnderline && buttonUnderline.color;
  const hover = buttonUnderline && buttonUnderline.hover;
  const redirectToStore = (0,react.useCallback)(() => {
    window.open(config.ratingUrl, "_blank").focus();
    eventRouter.emit("userRedirectedToStore", "askingForReviewByDownloads");
    close();
  }, [eventRouter, close]);
  const onNotNow = (0,react.useCallback)(() => {
    setRatingModalLastNotNow(Date.now());
    incrementRatingModalShownCount();
    close();
  }, [setRatingModalLastNotNow, incrementRatingModalShownCount, close]);
  return /*#__PURE__*/react.createElement(FooterContainer, null, /*#__PURE__*/react.createElement(ButtonUnderline, {
    color: color,
    hover: hover,
    onClick: onNotNow
  }, t("social_media_sharing.button_cancel_rate")), /*#__PURE__*/react.createElement(common_ButtonComponent, {
    onClick: redirectToStore,
    text: t("social_media_sharing.button_rate")
  }));
};
/* harmony default export */ const AskingForReviewByDownloadsModalComponent_Footer = (Footer);
;// CONCATENATED MODULE: ./src/content-script/ui/components/svg-icons/like.jsx

const IconLike = ({
  style,
  className
}) => /*#__PURE__*/react.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "22px",
  height: "22px",
  viewBox: "0 0 22 22",
  style: style,
  className: className
}, /*#__PURE__*/react.createElement("path", {
  fill: "#ff7e92",
  d: "M19.2,0.9H2.8c-0.8,0-1.6,0.4-2.1,1L0.4,3.7V14c0,1.6,0.8,2.8,2.4,2.8h3.8c0.3,0,0.6,0.5,0.8,0.7l3.3,3.3 l0.7,0.1c0,0,0.1-0.1,0.1-0.1l3.3-3.3c0.2-0.2,0.5-0.3,0.8-0.3h3.5c1.6,0,2.8-1.3,2.8-2.8V3.7C22,2.2,20.7,0.9,19.2,0.9z"
}), /*#__PURE__*/react.createElement("path", {
  fill: "#ff5f7a",
  d: "M7.1,17.5l3.3,3.3c0.3,0.3,0.8,0.3,1.1,0.1L7.6,17c-0.3-0.3-0.8-0.5-1.3-0.5H2.8c-1.2,0-2.1-1-2.1-2.1V1.8 C0.3,2.3,0,3,0,3.7v10.6c0,1.6,1.3,2.8,2.8,2.8h3.5C6.6,17.2,6.9,17.3,7.1,17.5z"
}), /*#__PURE__*/react.createElement("path", {
  fill: "#ffffff",
  d: "M16.7,7.6c-0.2-1.5-1.5-2.7-3-2.8c-0.9-0.1-1.8,0.3-2.4,0.9c-0.1,0.1-0.3,0.1-0.5,0c-0.6-0.6-1.5-0.9-2.4-0.9 C8,4.8,7.6,4.9,7.3,5.1c-1,0.4-1.7,2.6-1.7,2.6c-0.4,3.2,4,5.9,5.3,6.6l0.9,0C13.4,13.2,17,10.6,16.7,7.6z"
}), /*#__PURE__*/react.createElement("path", {
  fill: "#ffd8de",
  d: "M6.1,7.2c0.1-0.9,0.5-1.6,1.2-2.1c-1,0.5-1.8,1.4-1.9,2.6c-0.4,3.2,4,6.1,5.3,6.9c0.2,0.1,0.5,0.1,0.7,0 c0.1-0.1,0.3-0.2,0.4-0.3C10.9,13.8,5.7,10.7,6.1,7.2z"
}));
/* harmony default export */ const like = (IconLike);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/AskingForReviewByDownloadsModalComponent/Header/style.jsx
// vendor imports

const HeaderContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__HeaderContainer",
  componentId: "sc-ej2m1g-0"
})`@media screen and (max-width:1023px){max-width:478px;}display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding-bottom:8px;border-bottom:1px solid ${props => props.headerBorder};`;
const TitleContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__TitleContainer",
  componentId: "sc-ej2m1g-1"
})`display:flex;align-items:center;flex-direction:row;${props => !props.isMobile && Ce`&::after{content:" ";width:54px;}`}`;
const Title = styled_components_browser_esm.span.withConfig({
  displayName: "style__Title",
  componentId: "sc-ej2m1g-2"
})`font-size:16px;color:${props => props.color};${props => props.dir === "rtl" ? "margin-right: 8px;" : "margin-left: 8px;"}`;
const ButtonClose = styled_components_browser_esm.button.withConfig({
  displayName: "style__ButtonClose",
  componentId: "sc-ej2m1g-3"
})`background-color:transparent;outline:none;border:none;cursor:pointer;position:relative;width:21px;height:21px;box-sizing:border-box;&::before,&::after{content:" ";display:block;position:absolute;width:18px;height:1px;top:9px;left:1px;background-color:${props => props.border || "black"};}&::before{transform:rotate(-45deg);}&::after{transform:rotate(45deg);}`;

;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/AskingForReviewByDownloadsModalComponent/Header/index.jsx
// react imports



// local imports
// hooks


// config


// images


// components

const Header = ({
  close
}) => {
  const {
    extensionName
  } = config;
  const {
    t
  } = useTranslation_useTranslation();
  const {
    dir,
    incrementRatingModalShownCount,
    isMobile,
    setRatingModalLastNotNow,
    theme
  } = hooks_useAppState(["dir", "incrementRatingModalShownCount", "isMobile", "setRatingModalLastNotNow", "theme"]);
  const modalNotificationStyles = theme && theme.modal_notification;
  const headerBorder = modalNotificationStyles && modalNotificationStyles.header_border;
  const titleColor = modalNotificationStyles && modalNotificationStyles.modal_title;
  const closeButtonBorder = modalNotificationStyles && modalNotificationStyles.close_button;
  const onNotNow = (0,react.useCallback)(() => {
    setRatingModalLastNotNow(Date.now());
    incrementRatingModalShownCount();
    close();
  }, [setRatingModalLastNotNow, incrementRatingModalShownCount, close]);
  return /*#__PURE__*/react.createElement(HeaderContainer, {
    headerBorder: headerBorder
  }, /*#__PURE__*/react.createElement(TitleContainer, {
    isMobile: isMobile
  }, /*#__PURE__*/react.createElement(like, null), /*#__PURE__*/react.createElement(Title, {
    color: titleColor,
    dir: dir
  }, t("social_media_sharing.help_extension_to_get_better", {
    extensionName
  }))), /*#__PURE__*/react.createElement(ButtonClose, {
    border: closeButtonBorder,
    onClick: onNotNow
  }));
};
/* harmony default export */ const AskingForReviewByDownloadsModalComponent_Header = (Header);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/ModalComponent/style.jsx
// vendor imports

const Container = styled_components_browser_esm.div.withConfig({
  displayName: "style__Container",
  componentId: "sc-scse35-0"
})`${props => props.dir === "rtl" ? `margin-right: ${props.scrollbarWidth};` : `margin-left: ${props.scrollbarWidth};`} position:absolute;top:${props => props.top || 0};right:${props => props.right || 0};bottom:${props => props.bottom || 0};left:${props => props.left || 0};margin-right:${props => props.marginRight || "0px"};margin-bottom:${props => props.marginBottom || "0px"};display:flex;justify-content:center;align-items:center;`;
const Modal = styled_components_browser_esm.div.withConfig({
  displayName: "style__Modal",
  componentId: "sc-scse35-1"
})`background-color:${props => props.background || "white"};border-width:1px;border-style:solid;border-color:${props => props.border};border-radius:3px;padding:10px 10px;transition:opacity 0.25s ease-in-out;opacity:${props => props.opacity};box-sizing:border-box;position:relative;font-family:Arial,Helvetica,sans-serif;font-weight:500;${props => props.isMobile && Ce`max-width:95dvw;`};`;
const Overlay = styled_components_browser_esm.div.withConfig({
  displayName: "style__Overlay",
  componentId: "sc-scse35-2"
})`background-color:rgba(0,0,0,0.75);position:absolute;border-radius:3px;top:-1px;right:-1px;bottom:-1px;left:-1px;display:${props => props.theLast ? "none" : "block"};`;

;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/ModalComponent/index.jsx
// react imports


// local imports
// hooks


// components

const ModalComponent = props => {
  const {
    bottom,
    children,
    close,
    left,
    marginBottom,
    marginRight,
    nonBlocking,
    right,
    theLast,
    top
  } = props;
  const {
    bodyScrollbarWidth,
    dir,
    isMobile,
    publicIds,
    theme
  } = hooks_useAppState(["bodyScrollbarWidth", "dir", "isMobile", "publicIds", "theme"]);
  const {
    modal,
    modalBodyClassName
  } = publicIds;
  const [isActive, setIsActive] = (0,react.useState)(false);
  const [opacity, setOpacity] = (0,react.useState)(0);
  const modalNotificationStyles = theme && theme.modal_notification;
  const background = modalNotificationStyles && modalNotificationStyles.background;
  const border = modalNotificationStyles && modalNotificationStyles.border;
  (0,react.useEffect)(() => {
    if (!isActive && opacity === 0) {
      setTimeout(() => {
        setOpacity(1);
      }, 0);
    }
  }, [isActive, opacity]);
  (0,react.useEffect)(() => {
    if (nonBlocking) {
      setTimeout(() => {
        document.body.classList.remove(modalBodyClassName);
        const modalContainer = document.getElementById(modal);
        if (modalContainer) {
          modalContainer.style.backgroundColor = "rgba(0,0,0,0)";
          modalContainer.style.position = "fixed";
          modalContainer.style.bottom = "0";
          modalContainer.style.right = "0";
          modalContainer.style.top = "auto";
          modalContainer.style.height = "auto";
        }
      }, 0);
    }
  });
  const onTransitionEnd = (0,react.useCallback)(() => {
    if (!isActive) {
      setIsActive(true);
    } else if (opacity === 0) {
      //
      //
      //
      //
      // popModalTmp(); // TODO: remove this https://www.goodday.work/t/g5PDlw
      //
      //
      //
      //
    }
  }, [isActive, setIsActive, opacity]);
  if (close) {
    // close(() => setOpacity(0));
  }
  return /*#__PURE__*/react.createElement(Container, {
    bottom: bottom,
    dir: dir,
    left: left,
    marginBottom: marginBottom,
    marginRight: marginRight,
    right: right,
    scrollbarWidth: `${bodyScrollbarWidth || 0}px`,
    top: top
  }, /*#__PURE__*/react.createElement(Modal, {
    background: background,
    border: border,
    isMobile: isMobile,
    onTransitionEnd: onTransitionEnd,
    opacity: opacity
  }, children, /*#__PURE__*/react.createElement(Overlay, {
    theLast: theLast
  })));
};
/* harmony default export */ const ModalsComponent_ModalComponent = (ModalComponent);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/AskingForReviewByDownloadsModalComponent/index.jsx
// react imports


// local imports
// hooks


// components




const AskingForReviewByDownloadsModalComponent = ({
  close,
  theLast
}) => {
  const {
    incrementRatingModalShownCount,
    setRatingModalLastNotNow
  } = hooks_useAppState(["incrementRatingModalShownCount", "setRatingModalLastNotNow"]);
  const onNotNow = (0,react.useCallback)(() => {
    setRatingModalLastNotNow(Date.now());
    incrementRatingModalShownCount();
    close();
  }, [setRatingModalLastNotNow, incrementRatingModalShownCount, close]);
  return /*#__PURE__*/react.createElement(ModalsComponent_ModalComponent, {
    close: onNotNow,
    theLast: theLast
  }, /*#__PURE__*/react.createElement(AskingForReviewByDownloadsModalComponent_Header, {
    close: close
  }), /*#__PURE__*/react.createElement(AskingForReviewByDownloadsModalComponent_Body, {
    close: close
  }), /*#__PURE__*/react.createElement(AskingForReviewByDownloadsModalComponent_Footer, {
    close: close
  }));
};
/* harmony default export */ const ModalsComponent_AskingForReviewByDownloadsModalComponent = (AskingForReviewByDownloadsModalComponent);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/AskingForReviewByScreenshotsModalComponent/Body/style.jsx
// vendor imports

const style_BodyContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__BodyContainer",
  componentId: "sc-d4x9b0-0"
})`@media screen and (max-width:1023px){max-width:478px;}display:flex;flex-direction:row;padding-top:9px;`;
const style_BodyColumn = styled_components_browser_esm.div.withConfig({
  displayName: "style__BodyColumn",
  componentId: "sc-d4x9b0-1"
})`min-width:390px;${props => props.dir === "rtl" ? "margin-right: 10px;" : "margin-left: 10px;"}`;
const style_BodyText = styled_components_browser_esm.span.withConfig({
  displayName: "style__BodyText",
  componentId: "sc-d4x9b0-2"
})`font-size:17px;line-height:30px;color:${props => props.color};& b{font-weight:bold;color:${props => props.color2};}`;
const style_StarsContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__StarsContainer",
  componentId: "sc-d4x9b0-3"
})`display:flex;flex-direction:row;align-items:center;justify-content:center;padding:7px 0;& svg{&:not(:last-child){margin:0 9px;}&:last-child{transform:translateY(4px);margin:0 2px;}& path{fill:${props => props.iconColor};}}`;

;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/AskingForReviewByScreenshotsModalComponent/Body/index.jsx
// react imports



// local imports
// hooks


// config


// images




// components

const Body_Body = ({
  close
}) => {
  const {
    t
  } = useTranslation_useTranslation();
  const {
    dir,
    eventRouter,
    screenshotsCount,
    theme
  } = hooks_useAppState(["dir", "theme", "screenshotsCount", "eventRouter"]);
  const modalNotificationStyles = theme && theme.modal_notification;
  const iconColor = modalNotificationStyles && modalNotificationStyles.modal_icon_color;
  const iconColor2 = modalNotificationStyles && modalNotificationStyles.modal_icon_color2;
  const iconColor3 = modalNotificationStyles && modalNotificationStyles.modal_icon_color3;
  const bodyColor = modalNotificationStyles && modalNotificationStyles.modal_body;
  const bodyColor2 = modalNotificationStyles && modalNotificationStyles.modal_body2;
  const redirectToStore = (0,react.useCallback)(() => {
    window.open(config.ratingUrl, "_blank").focus();
    eventRouter.emit("userRedirectedToStore", "askingForReviewByScreenshots");
    close();
  }, [eventRouter, close]);
  return /*#__PURE__*/react.createElement(style_BodyContainer, null, /*#__PURE__*/react.createElement(shining_star_outline, {
    color: iconColor,
    color2: iconColor2,
    style: {
      margin: "10px 8px"
    }
  }), /*#__PURE__*/react.createElement(style_BodyColumn, {
    dir: dir
  }, /*#__PURE__*/react.createElement(style_BodyText, {
    color: bodyColor,
    color2: bodyColor2
  }, /*#__PURE__*/react.createElement(Trans_Trans, {
    count: {
      screenshotsCount
    },
    i18nKey: "social_media_sharing.asking_for_review_by_screenshots",
    values: {
      screenshotsCount
    }
  }, "You've successfully made ", {
    screenshotsCount
  }, " ", t("social_media_sharing.screenshot"), ".", /*#__PURE__*/react.createElement("br", null), "We would be grateful for the review and ", /*#__PURE__*/react.createElement("b", null, "5 stars"), " ;)", /*#__PURE__*/react.createElement("br", null), "It's really important for development.")), /*#__PURE__*/react.createElement(style_StarsContainer, {
    iconColor: iconColor3
  }, /*#__PURE__*/react.createElement(star, {
    onClick: redirectToStore
  }), /*#__PURE__*/react.createElement(star, {
    onClick: redirectToStore
  }), /*#__PURE__*/react.createElement(star, {
    onClick: redirectToStore
  }), /*#__PURE__*/react.createElement(star, {
    onClick: redirectToStore
  }), /*#__PURE__*/react.createElement(shining_star, {
    onClick: redirectToStore
  }))));
};
/* harmony default export */ const AskingForReviewByScreenshotsModalComponent_Body = (Body_Body);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/AskingForReviewByScreenshotsModalComponent/Footer/style.jsx
// vendor imports

const style_FooterContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__FooterContainer",
  componentId: "sc-uypfsb-0"
})`@media screen and (max-width:1023px){max-width:478px;}display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding-top:14px;& button{margin:0;&:first-child{padding:16px 28px;}&:last-child{padding:16px 60px;& span{font-weight:bold;}}}`;
const style_ButtonUnderline = styled_components_browser_esm.button.withConfig({
  displayName: "style__ButtonUnderline",
  componentId: "sc-uypfsb-1"
})`outline:none;border:none;padding:6px 8px;margin:0 auto 24px;display:block;cursor:pointer;font-size:16px;text-decoration:underline;background-color:transparent;color:${props => props.color};&:hover{color:${props => props.hover};}`;

;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/AskingForReviewByScreenshotsModalComponent/Footer/index.jsx
// react imports



// local imports
// hooks


// config


// components


const Footer_Footer = ({
  close
}) => {
  const {
    eventRouter,
    incrementRatingModalShownCount,
    setRatingModalLastNotNow,
    theme
  } = hooks_useAppState(["eventRouter", "incrementRatingModalShownCount", "setRatingModalLastNotNow", "theme"]);
  const {
    t
  } = useTranslation_useTranslation();
  const modalNotificationStyles = theme && theme.modal_notification;
  const buttonUnderline = modalNotificationStyles && modalNotificationStyles.button_underline;
  const color = buttonUnderline && buttonUnderline.color;
  const hover = buttonUnderline && buttonUnderline.hover;
  const redirectToStore = (0,react.useCallback)(() => {
    window.open(config.ratingUrl, "_blank").focus();
    eventRouter.emit("userRedirectedToStore", "askingForReviewByScreenshots");
    close();
  }, [eventRouter, close]);
  const onNotNow = (0,react.useCallback)(() => {
    setRatingModalLastNotNow(Date.now());
    incrementRatingModalShownCount();
    close();
  }, [setRatingModalLastNotNow, incrementRatingModalShownCount, close]);
  return /*#__PURE__*/react.createElement(style_FooterContainer, null, /*#__PURE__*/react.createElement(style_ButtonUnderline, {
    color: color,
    hover: hover,
    onClick: onNotNow
  }, t("social_media_sharing.button_cancel_rate")), /*#__PURE__*/react.createElement(common_ButtonComponent, {
    onClick: redirectToStore,
    text: t("social_media_sharing.button_rate")
  }));
};
/* harmony default export */ const AskingForReviewByScreenshotsModalComponent_Footer = (Footer_Footer);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/AskingForReviewByScreenshotsModalComponent/Header/style.jsx
// vendor imports

const style_HeaderContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__HeaderContainer",
  componentId: "sc-5tsifr-0"
})`@media screen and (max-width:1023px){max-width:478px;}display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding-bottom:8px;border-bottom:1px solid ${props => props.headerBorder};`;
const style_TitleContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__TitleContainer",
  componentId: "sc-5tsifr-1"
})`display:flex;align-items:center;flex-direction:row;&::after{content:" ";width:54px;}`;
const style_Title = styled_components_browser_esm.span.withConfig({
  displayName: "style__Title",
  componentId: "sc-5tsifr-2"
})`font-size:16px;color:${props => props.color};${props => props.dir === "rtl" ? "margin-right: 8px;" : "margin-left: 8px;"}`;
const style_ButtonClose = styled_components_browser_esm.button.withConfig({
  displayName: "style__ButtonClose",
  componentId: "sc-5tsifr-3"
})`background-color:transparent;outline:none;border:none;cursor:pointer;position:relative;width:21px;height:21px;box-sizing:border-box;&::before,&::after{content:" ";display:block;position:absolute;width:18px;height:1px;top:9px;left:1px;background-color:${props => props.border || "black"};}&::before{transform:rotate(-45deg);}&::after{transform:rotate(45deg);}`;

;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/AskingForReviewByScreenshotsModalComponent/Header/index.jsx
// react imports



// local imports
// hooks


// config


// images


// components

const Header_Header = ({
  close
}) => {
  const {
    extensionName
  } = config;
  const {
    t
  } = useTranslation_useTranslation();
  const {
    dir,
    incrementRatingModalShownCount,
    setRatingModalLastNotNow,
    theme
  } = hooks_useAppState(["dir", "incrementRatingModalShownCount", "setRatingModalLastNotNow", "theme"]);
  const modalNotificationStyles = theme && theme.modal_notification;
  const headerBorder = modalNotificationStyles && modalNotificationStyles.header_border;
  const titleColor = modalNotificationStyles && modalNotificationStyles.modal_title;
  const closeButtonBorder = modalNotificationStyles && modalNotificationStyles.close_button;
  const onNotNow = (0,react.useCallback)(() => {
    setRatingModalLastNotNow(Date.now());
    incrementRatingModalShownCount();
    close();
  }, [setRatingModalLastNotNow, incrementRatingModalShownCount, close]);
  return /*#__PURE__*/react.createElement(style_HeaderContainer, {
    headerBorder: headerBorder
  }, /*#__PURE__*/react.createElement(style_TitleContainer, null, /*#__PURE__*/react.createElement(like, null), /*#__PURE__*/react.createElement(style_Title, {
    color: titleColor,
    dir: dir
  }, t("social_media_sharing.help_extension_to_get_better", {
    extensionName
  }))), /*#__PURE__*/react.createElement(style_ButtonClose, {
    border: closeButtonBorder,
    onClick: onNotNow
  }));
};
/* harmony default export */ const AskingForReviewByScreenshotsModalComponent_Header = (Header_Header);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/AskingForReviewByScreenshotsModalComponent/index.jsx
// react imports


// local imports
// hooks


// components




const AskingForReviewByScreenshotsModalComponent = ({
  close,
  theLast
}) => {
  const {
    incrementRatingModalShownCount,
    setRatingModalLastNotNow
  } = hooks_useAppState(["incrementRatingModalShownCount", "setRatingModalLastNotNow"]);
  const onNotNow = (0,react.useCallback)(() => {
    setRatingModalLastNotNow(Date.now());
    incrementRatingModalShownCount();
    close();
  }, [setRatingModalLastNotNow, incrementRatingModalShownCount, close]);
  return /*#__PURE__*/react.createElement(ModalsComponent_ModalComponent, {
    close: onNotNow,
    theLast: theLast
  }, /*#__PURE__*/react.createElement(AskingForReviewByScreenshotsModalComponent_Header, {
    close: close
  }), /*#__PURE__*/react.createElement(AskingForReviewByScreenshotsModalComponent_Body, {
    close: close
  }), /*#__PURE__*/react.createElement(AskingForReviewByScreenshotsModalComponent_Footer, {
    close: close
  }));
};
/* harmony default export */ const ModalsComponent_AskingForReviewByScreenshotsModalComponent = (AskingForReviewByScreenshotsModalComponent);
;// CONCATENATED MODULE: ./src/content-script/ui/components/svg-icons/lock.jsx

const IconLock = ({
  style,
  color,
  color2,
  className,
  onClick
}) => /*#__PURE__*/react.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "78px",
  height: "78px",
  viewBox: "0 0 78 78",
  style: style,
  className: className,
  onClick: onClick
}, /*#__PURE__*/react.createElement("path", {
  fill: color,
  d: "M38.5,26.3h0.9c2.1,0.1,4.1,1,5.5,2.5c1.5,1.5,2.4,3.6,2.4,5.8c0,1.6,0,3.3,0,4.9c0,0.6-0.5,1.2-1.2,1.2 c-0.6,0-1.2-0.5-1.2-1.1c0-1.7,0-3.4,0-5.1c-0.1-2.1-1.3-4.1-3.2-5.1c-1.4-0.7-3.1-0.9-4.6-0.4c-1.1,0.4-2.1,1.1-2.8,2 c-0.8,1-1.3,2.4-1.3,3.7c0,1.7,0,3.3,0,5c0,0.6-0.6,1.2-1.2,1.2c-0.6,0-1.2-0.5-1.2-1.2c0-1.7,0-3.4,0-5.1c0-2.3,1.1-4.6,2.8-6.1 C34.8,27.1,36.7,26.4,38.5,26.3z"
}), /*#__PURE__*/react.createElement("path", {
  fill: color,
  d: "M26.2,45c0.6-1.2,1.9-2,3.2-2c6.4,0,12.7,0,19.1,0c1.5,0,2.9,0.9,3.4,2.3c0.2,0.5,0.2,0.9,0.2,1.4 c0,3.8,0,7.6,0,11.4c0,0.3,0,0.7,0,1c-0.1,0.8-0.5,1.5-1,2c-0.6,0.6-1.5,1-2.3,1.1H29.3c-1.5-0.1-2.9-1.1-3.3-2.6 c-0.1-0.4-0.1-0.8-0.1-1.3c0-3.9,0-7.8,0-11.6C25.8,46.1,26,45.5,26.2,45z M29.3,45.5c-0.6,0.1-1,0.6-1,1.2c0,4,0,8,0,12 c0,0.6,0.6,1.2,1.2,1.2c6.3,0,12.7,0,19,0c0.2,0,0.5,0,0.7-0.2c0.4-0.2,0.6-0.7,0.6-1.1c0-4,0-8,0-11.9c0-0.4-0.3-0.9-0.7-1.1 c-0.4-0.2-0.8-0.1-1.3-0.1c-3.5,0-6.9,0-10.4,0C34.7,45.5,32,45.4,29.3,45.5z"
}), /*#__PURE__*/react.createElement("path", {
  fill: color,
  d: "M38.6,50.4c0.7-0.3,1.5,0.3,1.6,1c0,0.8,0,1.6,0,2.5c0,0.6-0.5,1.1-1.1,1.2c-0.6,0.1-1.2-0.5-1.3-1.1 c0-0.7,0-1.4,0-2.1c0-0.2,0-0.5,0.1-0.7C38,50.8,38.3,50.5,38.6,50.4z"
}), /*#__PURE__*/react.createElement("path", {
  fill: color2 || color,
  d: "M76.5,66.3C76.5,66.3,76.5,66.3,76.5,66.3L43.8,6.4c-0.9-1.7-2.7-2.8-4.6-2.8s-3.7,1-4.6,2.8L1.8,66.2 c0,0,0,0,0,0c-1.8,3.5,0.7,7.7,4.7,7.7h4c1,0,1.8-0.8,1.8-1.8c0-1-0.8-1.8-1.8-1.8h-4c-1.3,0-2.1-1.4-1.6-2.5L37.6,8.1 c0.4-0.8,1.1-0.9,1.6-0.9c0.5,0,1.1,0.2,1.6,0.9l32.7,59.8c0.5,1-0.3,2.4-1.6,2.4H24.5c-1,0-1.8,0.8-1.8,1.8c0,1,0.8,1.8,1.8,1.8 h47.3C75.8,73.9,78.2,69.6,76.5,66.3z"
}), /*#__PURE__*/react.createElement("path", {
  fill: color2 || color,
  d: "M17.5,70.4c-1,0-1.8,0.8-1.8,1.8c0,1,0.8,1.8,1.8,1.8c1,0,1.8-0.8,1.8-1.8S18.5,70.4,17.5,70.4z"
}));
/* harmony default export */ const lock = (IconLock);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/GDPRConsentModalComponent/Body/style.jsx
// vendor imports

const Body_style_BodyContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__BodyContainer",
  componentId: "sc-bhdjsr-0"
})`@media screen and (max-width:1023px){max-width:500px;}@media screen and (min-width:1024px){max-width:640px;}padding-top:12px;padding-left:5px;padding-right:5px;text-align:${props => props.dir === "rtl" ? "right" : "left"};color:${props => props.color};& a{color:${props => props.color};&[data-webext-page]{cursor:pointer;border-bottom:1px dashed ${props => props.color};}}& .icon-lock{float:${props => props.dir === "rtl" ? "right" : "left"};margin-top:4px;${props => props.dir === "rtl" ? "margin-left: 18px;" : "margin-right: 18px;"}}& button{background-color:transparent;border:0;margin:${props => props.dir === "rtl" ? "0 18px 0 0" : "0 0 0 18px"};;padding:0;height:22px;cursor:pointer;& .gear-filled{min-width:22px;}}`;
const Body_style_BodyText = styled_components_browser_esm.div.withConfig({
  displayName: "style__BodyText",
  componentId: "sc-bhdjsr-1"
})`@media screen and (max-width:1023px){max-width:500px;}@media screen and (min-width:1024px){max-width:640px;}min-height:8px;font-size:14px;line-height:30px;text-align:justify;`;
const Form = styled_components_browser_esm.form.withConfig({
  displayName: "style__Form",
  componentId: "sc-bhdjsr-2"
})`padding-top:8px;min-width:500px;`;
const CheckboxItem = styled_components_browser_esm.div.withConfig({
  displayName: "style__CheckboxItem",
  componentId: "sc-bhdjsr-3"
})`display:flex;& label{top:8px;}`;
const CheckboxText = styled_components_browser_esm.span.withConfig({
  displayName: "style__CheckboxText",
  componentId: "sc-bhdjsr-4"
})`margin-left:5px;font-size:16px;line-height:36px;font-weight:bold;align-items:center;`;

;// CONCATENATED MODULE: ./src/utils/random-name-generator.js
/* harmony default export */ const random_name_generator = ((length) => {
  const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
});

;// CONCATENATED MODULE: ./src/content-script/ui/components/common/CheckboxComponent/style.jsx
// vendor imports

const Input = styled_components_browser_esm.input.withConfig({
  displayName: "style__Input",
  componentId: "sc-1ql1lpx-0"
})`display:none;&:not(:checked) + label::after{opacity:0;}&:checked + label::after{opacity:1;}&:not(:disabled) + label{cursor:pointer;}&:disabled + label{opacity:0.5;}`;
const Label = styled_components_browser_esm.label.withConfig({
  displayName: "style__Label",
  componentId: "sc-1ql1lpx-1"
})`position:relative;display:block;font-size:14px;line-height:18px;${props => props.dir === "rtl" ? "padding-right: 25px;" : "padding-left: 25px;"} color:${props => props.color};&::before,&::after{content:" ";display:block;position:absolute;}&::before{top:0;${props => props.dir === "rtl" ? "right: 0;" : "left: 0;"} width:18px;height:18px;border-radius:3px;box-sizing:border-box;border:2px solid  ${props => props.border};background-color:${props => props.background};}&::after{width:3px;height:7px;top:3px;${props => props.dir === "rtl" ? "right: 7px;" : "left: 7px;"} border-right:2px solid ${props => props.checkmark};border-bottom:2px solid ${props => props.checkmark};transform:rotate(45deg);}`;

;// CONCATENATED MODULE: ./src/content-script/ui/components/common/CheckboxComponent/index.jsx
// react imports


// local imports
// hooks


// utilities


// components

const checkboxNamePrefix = random_name_generator(12);
const CheckboxComponent = ({
  checked,
  disabled,
  id,
  label,
  name,
  onChange
}) => {
  const {
    dir,
    theme
  } = hooks_useAppState(["dir", "theme"]);
  const checkboxId = id && `${checkboxNamePrefix}-checkbox-${id}`;
  const checkboxName = name && `${checkboxNamePrefix}-checkbox-${name}`;
  const checkboxStyles = theme && theme.checkbox;
  const color = checkboxStyles && checkboxStyles.color;
  const background = checkboxStyles && checkboxStyles.background;
  const border = checkboxStyles && checkboxStyles.border;
  const checkmark = checkboxStyles && checkboxStyles.checkmark;
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(Input, {
    checked: checked,
    disabled: !!id && disabled,
    id: checkboxId,
    name: checkboxName,
    onChange: onChange,
    type: "checkbox"
  }), /*#__PURE__*/react.createElement(Label, {
    background: background,
    border: border,
    checkmark: checkmark,
    color: color,
    dir: dir,
    htmlFor: checkboxId
  }, label));
};
/* harmony default export */ const common_CheckboxComponent = (CheckboxComponent);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/GDPRConsentModalComponent/Body/index.jsx
// react imports



// local imports
// hooks


// config


// images


// components


const GDPRConsentModalComponent_Body_Body = () => {
  const {
    agreeWithLicense,
    dir,
    setAgreeWithLicense,
    theme,
    userAcceptedTerms
  } = hooks_useAppState(["agreeWithLicense", "dir", "setAgreeWithLicense", "theme", "userAcceptedTerms"]);
  const {
    t
  } = useTranslation_useTranslation();
  const modalNotificationStyles = theme && theme.modal_notification;
  const iconColor = modalNotificationStyles && modalNotificationStyles.modal_icon_color;
  const iconColor2 = modalNotificationStyles && modalNotificationStyles.modal_icon_color2;
  const bodyColor = modalNotificationStyles && modalNotificationStyles.modal_body;
  const {
    eulaUrl,
    extensionName,
    privacyUrl
  } = config;
  const replacements = {
    eulaUrl,
    extensionName,
    privacyUrl
  };
  return /*#__PURE__*/react.createElement(Body_style_BodyContainer, {
    color: bodyColor,
    dir: dir
  }, /*#__PURE__*/react.createElement(lock, {
    className: "icon-lock",
    color: iconColor,
    color2: iconColor2
  }), /*#__PURE__*/react.createElement(Body_style_BodyText, {
    dangerouslySetInnerHTML: {
      __html: t("data_consents.description_request", replacements)
    }
  }), /*#__PURE__*/react.createElement(Body_style_BodyText, {
    dangerouslySetInnerHTML: {
      __html: t("data_consents.description_browsing", replacements)
    }
  }), /*#__PURE__*/react.createElement(Body_style_BodyText, {
    dangerouslySetInnerHTML: {
      __html: t("data_consents.description_technical", replacements)
    }
  }), /*#__PURE__*/react.createElement(Form, null, !userAcceptedTerms && /*#__PURE__*/react.createElement(CheckboxItem, null, /*#__PURE__*/react.createElement(common_CheckboxComponent, {
    checked: agreeWithLicense,
    id: "dataConsentsCheckboxEula",
    onChange: () => setAgreeWithLicense(!agreeWithLicense)
  }), /*#__PURE__*/react.createElement(CheckboxText, {
    dangerouslySetInnerHTML: {
      __html: t("data_consents.checkbox_eula", replacements)
    }
  }))));
};
/* harmony default export */ const GDPRConsentModalComponent_Body = (GDPRConsentModalComponent_Body_Body);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/GDPRConsentModalComponent/Footer/style.jsx
// vendor imports

const Footer_style_FooterContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__FooterContainer",
  componentId: "sc-mnmoo0-0"
})`@media screen and (max-width:1023px){max-width:500px;}@media screen and (min-width:1024px){max-width:640px;}display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding-top:14px;padding-left:5px;padding-right:5px;& button{margin:4px;}`;
/* harmony default export */ const style = (Footer_style_FooterContainer);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/GDPRConsentModalComponent/Footer/index.jsx
// react imports



// local imports
// hooks


// components


const GDPRConsentModalComponent_Footer_Footer = ({
  close,
  isAgreeButtonDisabled
}) => {
  const {
    setAgreeWithProcessingStatisticalData,
    setAgreeWithProcessingTechnicalData,
    setUserAcceptedTerms
  } = hooks_useAppState(["setAgreeWithProcessingStatisticalData", "setAgreeWithProcessingTechnicalData", "setUserAcceptedTerms"]);
  const {
    t
  } = useTranslation_useTranslation();
  const onUserAcceptedTerms = () => {
    setUserAcceptedTerms(true);
    setAgreeWithProcessingStatisticalData(true);
    setAgreeWithProcessingTechnicalData(true);
    close();
  };
  return /*#__PURE__*/react.createElement(style, null, /*#__PURE__*/react.createElement(common_ButtonComponent, {
    disabled: isAgreeButtonDisabled,
    onClick: onUserAcceptedTerms,
    text: t("data_consents.button_disablestats")
  }), /*#__PURE__*/react.createElement(common_ButtonComponent, {
    disabled: isAgreeButtonDisabled,
    onClick: onUserAcceptedTerms,
    text: t("data_consents.button_techstats")
  }), /*#__PURE__*/react.createElement(common_ButtonComponent, {
    disabled: isAgreeButtonDisabled,
    onClick: onUserAcceptedTerms,
    text: t("data_consents.button_fullstats")
  }));
};
/* harmony default export */ const GDPRConsentModalComponent_Footer = (GDPRConsentModalComponent_Footer_Footer);
;// CONCATENATED MODULE: ./projects/idl/screenshot/build-logo.jsx


const IconContainer = styled_components_browser_esm.div.withConfig({
  displayName: "build-logo__IconContainer",
  componentId: "sc-82kl2z-0"
})`display:flex;justify-content:center;align-items:center;width:18px;height:18px;border-radius:2px;& svg{display:block;width:18px;fill:white;}`;
const BuildLogo = ({
  style,
  className,
  onClick
}) => /*#__PURE__*/react.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "78px",
  height: "78px",
  viewBox: "0 0 1060 1060",
  style: style,
  className: className,
  onClick: onClick,
  fill: "none"
}, /*#__PURE__*/react.createElement("rect", {
  width: "1060",
  height: "1060",
  rx: "150",
  fill: "url(#paint0_linear_8200_962)"
}), /*#__PURE__*/react.createElement("path", {
  d: "M422.205 271.491C467.334 271.044 512.481 271.408 557.611 271.309C569.092 271.077 580.474 276.842 587.002 286.302C595.004 297.369 595.6 313.175 588.41 324.789C582.147 335.491 569.937 342.234 557.561 341.969C514.502 342.019 471.46 341.936 428.401 342.002C417.052 341.721 406.73 347.867 399.474 356.217C384.182 370.714 370.812 387.778 352.256 398.365C336.203 407.676 317.697 412.663 299.124 412.663C279.26 412.729 259.395 412.597 239.531 412.713C225.415 412.663 211.963 422.106 207.059 435.311C204.11 442.484 204.723 450.387 204.689 457.958C204.756 572.854 204.59 687.75 204.772 802.646C204.822 821.516 222.334 837.719 241.088 836.808C405.72 836.775 570.368 836.841 735 836.775C753.439 837.156 770.073 820.953 770.123 802.497C770.288 723.569 770.156 644.625 770.189 565.697C770.321 557.861 769.427 549.726 772.227 542.221C776.302 530.508 786.972 521.346 799.232 519.292C811.276 516.972 824.315 521.594 832.251 530.938C838.199 537.665 841.131 546.711 840.883 555.641C840.866 637.385 840.899 719.146 840.883 800.906C840.982 822.411 834.454 843.932 822.112 861.56C805.743 885.467 779.251 902.233 750.523 906.309C738.744 908.082 726.799 907.336 714.953 907.485C556.484 907.485 397.999 907.518 239.531 907.469C202.006 907.701 165.64 885.931 147.482 853.21C138.552 837.338 133.913 819.131 134.012 800.939C133.996 683.293 133.996 565.647 134.012 448.001C133.88 420.317 145.162 392.749 164.911 373.315C183.864 353.898 210.621 342.466 237.725 342.036C258.203 341.886 278.68 342.085 299.158 341.953C306.696 341.92 314.234 339.501 320.248 334.911C339.268 318.675 354.112 297.303 376.312 284.96C390.312 277.058 406.134 272.386 422.205 271.491Z",
  fill: "white"
}), /*#__PURE__*/react.createElement("path", {
  d: "M465.827 449.344C505.539 444.423 546.892 453.353 580.805 474.675C617.005 497.108 644.574 533.076 656.701 573.915C669.79 617.173 665.449 665.417 644.59 705.544C624.13 745.521 587.88 777.099 545.401 791.695C513.293 802.861 477.921 804.485 444.952 796.234C397.138 784.687 355.073 751.9 331.878 708.576C311.318 670.851 305.536 625.523 315.51 583.772C324.555 545.236 347.137 510.13 378.317 485.759C403.45 465.977 434.05 453.171 465.827 449.344ZM467.368 520.6C424.971 528.255 389.583 564.289 382.906 606.901C378.864 630.642 383.105 655.725 395.001 676.7C409.63 702.744 435.724 722.128 464.965 728.357C490.595 733.941 518.313 729.683 540.894 716.263C564.553 702.462 582.545 679.201 589.702 652.743C596.512 627.842 594.01 600.39 582.23 577.361C570.119 553.04 548.383 533.589 522.67 524.709C505.026 518.48 485.741 517.121 467.368 520.6Z",
  fill: "white"
}), /*#__PURE__*/react.createElement("path", {
  d: "M664.045 140.604C664.048 133.882 670.762 129.832 676.556 133.222C761.092 182.248 845.75 231.091 930.335 280.068C940.288 285.978 950.424 291.583 960.424 297.412C967.552 301.568 967.388 311.754 960.25 315.893C867.074 369.925 773.69 423.607 680.562 477.706C673.25 481.953 664.082 476.688 664.057 468.22C664.015 453.924 664.004 439.624 664.127 425.334C664.145 423.16 664.776 420.936 666.635 419.815C667.948 419.023 669.422 418.4 670.655 417.551C691.278 405.74 711.767 393.709 732.402 381.922C738.401 379.167 744.071 375.815 749.753 372.463C787.209 350.895 824.521 329.061 862.049 307.611C862.315 307.459 862.499 307.215 862.559 306.915C862.648 306.469 862.446 306 862.053 305.773C796.948 268.185 731.903 230.464 666.786 192.877C665.927 192.239 664.533 191.716 664.138 190.676C663.915 190.088 664.06 189.428 664.059 188.798C664.032 172.733 664.04 156.669 664.045 140.604Z",
  fill: "white"
}), /*#__PURE__*/react.createElement("path", {
  d: "M664.044 242.536C664.055 234.148 673.043 228.881 680.305 233.054C691.815 239.668 703.263 246.392 714.761 253.02C718.181 254.992 720.295 258.641 720.292 262.594C720.274 291.756 720.274 320.919 720.292 350.081C720.295 354.032 718.183 357.68 714.765 359.65C703.275 366.275 691.83 372.981 680.333 379.591C673.063 383.771 664.055 378.502 664.044 370.104C663.985 327.586 663.985 285.061 664.044 242.536Z",
  fill: "white"
}), /*#__PURE__*/react.createElement("defs", null, /*#__PURE__*/react.createElement("linearGradient", {
  id: "paint0_linear_8200_962",
  x1: "530",
  y1: "0",
  x2: "530",
  y2: "1060",
  gradientUnits: "userSpaceOnUse"
}, /*#__PURE__*/react.createElement("stop", {
  stopColor: "#5065C8"
}), /*#__PURE__*/react.createElement("stop", {
  offset: "1",
  stopColor: "#5A50C8"
}))));
const IconBuildLogo = () => /*#__PURE__*/react.createElement(IconContainer, null, /*#__PURE__*/react.createElement(BuildLogo, null));
/* harmony default export */ const build_logo = (IconBuildLogo);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/GDPRConsentModalComponent/Header/style.jsx
// vendor imports

const Header_style_HeaderContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__HeaderContainer",
  componentId: "sc-17aehtp-0"
})`@media screen and (max-width:1023px){max-width:500px;}@media screen and (min-width:1024px){max-width:640px;}display:flex;flex-direction:row;align-items:center;justify-content:space-between;padding-left:5px;padding-right:5px;padding-bottom:12px;border-bottom:1px solid ${props => props.headerBorder};`;
const Header_style_TitleContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__TitleContainer",
  componentId: "sc-17aehtp-1"
})`display:flex;align-items:center;flex-direction:row;&::after{content:" ";width:54px;}`;
const Header_style_Title = styled_components_browser_esm.span.withConfig({
  displayName: "style__Title",
  componentId: "sc-17aehtp-2"
})`@media screen and (max-width:1023px){letter-spacing:-0.02em;}font-size:16px;color:${props => props.color};${props => props.dir === "rtl" ? "margin-right: 16px;" : "margin-left: 16px;"}`;
const Header_style_ButtonClose = styled_components_browser_esm.button.withConfig({
  displayName: "style__ButtonClose",
  componentId: "sc-17aehtp-3"
})`background-color:transparent;border:1px solid #d6d6d6;cursor:pointer;position:relative;width:21px;height:21px;box-sizing:border-box;&::before,&::after{content:" ";display:block;position:absolute;width:18px;height:1px;top:9px;left:1px;background-color:${props => props.border || "black"};}&::before{transform:rotate(-45deg);}&::after{transform:rotate(45deg);}`;

;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/GDPRConsentModalComponent/Header/index.jsx
// react imports



// local imports
// hooks


// config


// images


// components

const GDPRConsentModalComponent_Header_Header = ({
  close
}) => {
  const {
    extensionName
  } = config;
  const {
    t
  } = useTranslation_useTranslation();
  const {
    dir,
    theme
  } = hooks_useAppState(["dir", "theme"]);
  const modalNotificationStyles = theme && theme.modal_notification;
  const headerBorder = modalNotificationStyles && modalNotificationStyles.header_border;
  const titleColor = modalNotificationStyles && modalNotificationStyles.modal_title;
  const closeButtonBorder = modalNotificationStyles && modalNotificationStyles.close_button;
  return /*#__PURE__*/react.createElement(Header_style_HeaderContainer, {
    headerBorder: headerBorder
  }, /*#__PURE__*/react.createElement(Header_style_TitleContainer, null, /*#__PURE__*/react.createElement(build_logo, {
    color: "white"
  }), /*#__PURE__*/react.createElement(Header_style_Title, {
    color: titleColor,
    dir: dir
  }, t("data_consents.title", {
    extensionName
  }))), /*#__PURE__*/react.createElement(Header_style_ButtonClose, {
    border: closeButtonBorder,
    onClick: close
  }));
};
/* harmony default export */ const GDPRConsentModalComponent_Header = (GDPRConsentModalComponent_Header_Header);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/GDPRConsentModalComponent/index.jsx
// react imports


// local imports
// hooks


// components




const GDPRConsentModalComponent = ({
  close,
  theLast
}) => {
  const {
    agreeWithLicense,
    agreeWithProcessingStatisticalData,
    agreeWithProcessingTechnicalData,
    setShowGDPRModal,
    showGDPRModal
  } = hooks_useAppState(["agreeWithLicense", "agreeWithProcessingStatisticalData", "agreeWithProcessingTechnicalData", "setShowGDPRModal", "showGDPRModal"]);
  const [isAgreeButtonDisabled, setIsAgreeButtonDisabled] = (0,react.useState)(true);
  (0,react.useEffect)(() => {
    if (!showGDPRModal) {
      close();
      return;
    }
    const enabled = agreeWithLicense && agreeWithProcessingStatisticalData && agreeWithProcessingTechnicalData;
    if (enabled) {
      setIsAgreeButtonDisabled(false);
      return;
    }
    if (!agreeWithLicense) {
      setIsAgreeButtonDisabled(true);
      return;
    }
    setTimeout(() => setIsAgreeButtonDisabled(false), 400);
  }, [agreeWithLicense, agreeWithProcessingStatisticalData, agreeWithProcessingTechnicalData, close, showGDPRModal]);
  if (!showGDPRModal) return null;
  const closeAllModals = () => {
    setShowGDPRModal(false);
    close();
  };
  return /*#__PURE__*/react.createElement(ModalsComponent_ModalComponent, {
    close: closeAllModals,
    left: "auto",
    marginBottom: "25px",
    marginRight: "25px",
    nonBlocking: "true",
    theLast: theLast,
    top: "auto"
  }, /*#__PURE__*/react.createElement(GDPRConsentModalComponent_Header, {
    close: closeAllModals
  }), /*#__PURE__*/react.createElement(GDPRConsentModalComponent_Body, null), /*#__PURE__*/react.createElement(GDPRConsentModalComponent_Footer, {
    close: closeAllModals,
    isAgreeButtonDisabled: isAgreeButtonDisabled
  }));
};
/* harmony default export */ const ModalsComponent_GDPRConsentModalComponent = (GDPRConsentModalComponent);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/ModalsListComponent/ModalInstanceComponent/index.jsx
// react imports


// local imports
// hooks

const ModalInstanceComponent = ({
  item,
  Modal,
  theLast
}) => {
  const {
    publicIds,
    removeModal
  } = hooks_useAppState(["publicIds", "removeModal"]);
  const {
    modal,
    modalBodyClassName
  } = publicIds;
  const close = (0,react.useCallback)(() => {
    document.body.classList.remove(modalBodyClassName);
    setTimeout(() => {
      const modalContainer = document.getElementById(modal);
      if (modalContainer) {
        modalContainer.setAttribute("style", "");
      }
    }, 0);
    removeModal(item.id);
  }, [removeModal, item.id, modal, modalBodyClassName]);
  return /*#__PURE__*/react.createElement(Modal, {
    close: close,
    id: item.id,
    key: item.id,
    theLast: theLast
  });
};
/* harmony default export */ const ModalsListComponent_ModalInstanceComponent = (ModalInstanceComponent);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/ModalsListComponent/index.jsx
// react imports



// local imports
// hooks


// components




const modalsComponents = {
  askingForReviewByDownloads: ModalsComponent_AskingForReviewByDownloadsModalComponent,
  askingForReviewByScreenshots: ModalsComponent_AskingForReviewByScreenshotsModalComponent,
  gdprConsent: ModalsComponent_GDPRConsentModalComponent
};
const ModalsListComponent = ({
  modals
}) => {
  const {
    publicIds
  } = hooks_useAppState(["publicIds"]);
  const {
    modal: modalId,
    modalBodyClassName
  } = publicIds;
  const modalHolder = document.getElementById(modalId);
  (0,react.useEffect)(() => {
    const termsModalShown = modals.filter(modal => modal.modalType === "gdprConsent").length > 0;
    if (termsModalShown) return () => {};
    if (modals.length) {
      const {
        pageYOffset
      } = window;
      document.body.classList.add(modalBodyClassName);
      document.body.style.marginTop = `${-pageYOffset}px`;
      return () => {
        document.body.style.marginTop = "";
        document.body.classList.remove(modalBodyClassName);
        window.scrollTo(0, pageYOffset);
      };
    }
    return () => {};
  }, [modalId, modalBodyClassName, modals]);
  if (modalHolder && modals.length) {
    const dom = modals.reduce((result, item, index) => {
      const Modal = modalsComponents[item.modalType];
      if (Modal) {
        result.push( /*#__PURE__*/react.createElement(ModalsListComponent_ModalInstanceComponent, {
          Modal: Modal,
          item: item,
          key: item,
          theLast: index === modals.length - 1
        }));
      }
      return result;
    }, []);
    return /*#__PURE__*/(0,react_dom.createPortal)(dom, modalHolder);
  }
  return modalHolder ? /*#__PURE__*/(0,react_dom.createPortal)(null, modalHolder) : null;
};
/* harmony default export */ const ModalsComponent_ModalsListComponent = (ModalsListComponent);
;// CONCATENATED MODULE: ./projects/idl/extension-logo.jsx

/* harmony default export */ const extension_logo = (({
  style,
  color,
  className
}) =>
/*#__PURE__*/
/* eslint-disable react/no-unknown-property */
react.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "17.7px",
  height: "20px",
  viewBox: "0 0 917 1059",
  style: style,
  className: className
}, /*#__PURE__*/react.createElement("path", {
  fill: color || "#paint1_linear_6320_292"
  // eslint-disable-next-line max-len
  ,
  d: "M0.137498 34.1029C0.142083 18.1186 16.3065 8.18827 30.0422 16.3631C32.3242 17.7213 34.608 19.0778 36.9021 20.4177C285.347 164.235 534.149 307.516 782.736 451.191C816.85 471.412 851.699 490.416 885.786 510.664C899.986 519.099 899.624 539.513 885.331 547.789C601.492 712.135 316.967 875.337 33.2795 1039.89C18.638 1048.39 0.282384 1037.86 0.225412 1020.94C0.0608112 972.033 -0.0415143 923.105 0.401208 874.216C0.440549 869.872 1.64147 865.425 5.14642 862.858C9.54939 859.633 15.0945 857.571 19.5596 854.502C80.1689 819.853 140.385 784.56 201.03 749.982C218.658 741.901 235.322 732.067 252.02 722.234C362.103 658.964 471.759 594.912 582.05 531.989C582.831 531.544 583.371 530.829 583.548 529.947C583.809 528.64 583.217 527.264 582.062 526.598C390.724 416.333 199.563 305.679 8.18864 195.416C5.44101 193.378 0.827552 191.741 0.170517 188.109C-0.0535536 186.871 0.177784 185.593 0.175683 184.335C0.0920525 134.258 0.123135 84.1803 0.137498 34.1029Z"
}), /*#__PURE__*/react.createElement("path", {
  fill: color || "#paint1_linear_6320_292"
  // eslint-disable-next-line max-len
  ,
  d: "M0.153432 323.627C0.178571 306.861 18.1861 296.315 32.7564 304.61C73.4342 327.767 113.779 351.521 154.362 374.825C161.214 378.76 165.447 386.055 165.442 393.956C165.382 483.487 165.382 573.018 165.442 662.548C165.447 670.446 161.219 677.738 154.371 681.672C113.804 704.977 73.4444 728.666 32.8075 751.838C18.2259 760.153 0.178452 749.605 0.15329 732.819C-0.0511439 596.438 -0.0510968 460.034 0.153432 323.627Z"
}), /*#__PURE__*/react.createElement("defs", null, /*#__PURE__*/react.createElement("linearGradient", {
  id: "paint0_linear_6320_292",
  x1: "458.402",
  y1: "0",
  x2: "458.402",
  y2: "1059",
  gradientUnits: "userSpaceOnUse"
}, /*#__PURE__*/react.createElement("stop", {
  "stop-color": "#FFA701"
}), /*#__PURE__*/react.createElement("stop", {
  offset: "1",
  "stop-color": "#FF6B00"
})), /*#__PURE__*/react.createElement("linearGradient", {
  id: "paint1_linear_6320_292",
  x1: "82.7254",
  y1: "286.276",
  x2: "82.7254",
  y2: "770.257",
  gradientUnits: "userSpaceOnUse"
}, /*#__PURE__*/react.createElement("stop", {
  "stop-color": "#FFA701"
}), /*#__PURE__*/react.createElement("stop", {
  offset: "1",
  "stop-color": "#FF6B00"
})))));
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/NotificationsListComponent/NotificationComponent/style.jsx
// vendor imports

const Holder = styled_components_browser_esm.div.withConfig({
  displayName: "style__Holder",
  componentId: "sc-h608bi-0"
})`transition:${props => props.transition};margin:${props => props.margin};max-height:${props => props.maxHeight};`;

// const Container = styled.div`
//   background-color: ${props => props.background || "white"};
//   user-select: none;
//   border-radius: 2px;
//   border: 1px solid ${props => props.border};
//   padding: 8px;
//   transition: transform 0.25s ease-in-out;
//   transform: ${props => props.transform};
//   font-family: Arial, Helvetica, sans-serif;
//   font-weight: 500;
//   /* transform: ${props => `scale(${props.scale})`}; */
//   ${props => `& .${props.iconClassName} {
//     fill: ${props.iconColor};
//   }`}
// `;

const NotificationComponent_style_HeaderContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__HeaderContainer",
  componentId: "sc-h608bi-1"
})`display:flex;flex-direction:row;align-items:center;justify-content:space-between;`;
const style_Header = styled_components_browser_esm.div.withConfig({
  displayName: "style__Header",
  componentId: "sc-h608bi-2"
})`display:flex;align-items:center;flex-direction:row;&::after{content:" ";width:54px;}`;
const style_IconContainer = styled_components_browser_esm.div.withConfig({
  displayName: "style__IconContainer",
  componentId: "sc-h608bi-3"
})`background-color:#ff7a0f;background-image:linear-gradient(#ff7a0f,#ffa70d);display:flex;justify-content:center;align-items:center;width:18px;height:18px;border-radius:2px;& svg{display:block;width:13px;fill:white;}`;
const Message = styled_components_browser_esm.span.withConfig({
  displayName: "style__Message",
  componentId: "sc-h608bi-4"
})`font-size:16px;color:${props => props.color};${props => props.dir === "rtl" ? "margin-right: 10px;" : "margin-left: 10px;"}`;
const NotificationComponent_style_ButtonClose = styled_components_browser_esm.button.withConfig({
  displayName: "style__ButtonClose",
  componentId: "sc-h608bi-5"
})`background-color:transparent;outline:none;cursor:pointer;position:relative;width:21px;height:21px;box-sizing:border-box;border:1px solid ${props => props.border};&::before,&::after{content:" ";display:block;position:absolute;width:13px;height:1px;top:9px;left:3px;background-color:${props => props.border || "black"};}&::before{transform:rotate(-45deg);}&::after{transform:rotate(45deg);}`;
const Content = styled_components_browser_esm.div.withConfig({
  displayName: "style__Content",
  componentId: "sc-h608bi-6"
})`display:flex;flex-direction:row;align-items:center;justify-content:space-between;margin-top:6px;border-top:1px solid ${props => props.headerBorder};padding:20px 0;`;
const Description = styled_components_browser_esm.span.withConfig({
  displayName: "style__Description",
  componentId: "sc-h608bi-7"
})`display:inline-block;font-size:14px;color:${props => props.color};line-height:28px;max-width:320px;${props => props.dir === "rtl" ? "margin-right: 20px;" : "margin-left: 20px;"}`;

;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/NotificationsListComponent/NotificationComponent/index.jsx
// react imports



// local imports
// hooks


// utilities


// images


// components

const iconClassName = random_name_generator(12);
const NotificationComponent_Container = styled_components_browser_esm.div.withConfig({
  displayName: "NotificationComponent__Container",
  componentId: "sc-1jke4zw-0"
})`background-color:${props => props.background || "white"};user-select:none;border-radius:2px;border:1px solid ${props => props.border};padding:8px;transition:transform 0.25s ease-in-out;transform:${props => props.transform};font-family:Arial,Helvetica,sans-serif;font-weight:500;& .${iconClassName}{fill:${props => props.iconColor};}`;
const NotificationComponent = ({
  bottomContent,
  close,
  description,
  duration,
  icon,
  id,
  message,
  onClose,
  theOnly
}) => {
  const {
    dir,
    removeModal,
    theme
  } = hooks_useAppState(["dir", "removeModal", "theme"]);
  const [transition, setTransition] = (0,react.useState)(`all ${theOnly ? 0.01 : 0.25}s ease-in-out`);
  const [margin, setMargin] = (0,react.useState)(0);
  const [maxHeight, setMaxHeight] = (0,react.useState)(0);
  const [isLoaded, setIsLoaded] = (0,react.useState)(false);
  const transformRTL = "translateX(100%) translateX(30px)";
  const transformLTR = "translateX(-100%) translateX(-30px)";
  const [transform, setTransform] = (0,react.useState)(dir === "rtl" ? transformRTL : transformLTR);
  const [isClosed, setIsClosed] = (0,react.useState)(false);
  (0,react.useEffect)(() => {
    if (isLoaded) {
      setTimeout(() => setTransform("none"), 0);
    } else {
      setMargin("0 30px 30px");
    }
  }, [isLoaded]);
  (0,react.useEffect)(() => {
    let timeout;
    if (isClosed) {
      setTransform(dir === "rtl" ? transformRTL : transformLTR);
    } else if (duration !== -1) {
      timeout = setTimeout(() => {
        setIsClosed(true);
      }, duration || 4500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [isClosed, dir, duration]);
  if (close) {
    close(() => setIsClosed(true));
  }
  const Icon = () => icon && /*#__PURE__*/(0,react.cloneElement)(icon, {
    className: iconClassName
  });
  const modalNotificationStyles = theme && theme.modal_notification;
  const background = modalNotificationStyles && modalNotificationStyles.background;
  const border = modalNotificationStyles && modalNotificationStyles.border;
  const headerBorder = modalNotificationStyles && modalNotificationStyles.header_border;
  const closeButtonBorder = modalNotificationStyles && modalNotificationStyles.close_button;
  const iconColor = modalNotificationStyles && modalNotificationStyles.notification_icon;
  const messageColor = modalNotificationStyles && modalNotificationStyles.notification_message;
  const descriptionColor = modalNotificationStyles && modalNotificationStyles.notification_description;
  const refCallback = (0,react.useCallback)(node => {
    if (node && !isClosed) {
      const nodeRect = node.getBoundingClientRect();
      const nodeHeight = Math.round(nodeRect.height);
      setMaxHeight(`${nodeHeight}px`);
    }
  }, [isClosed]);
  const holderOnTransitionEnd = (0,react.useCallback)(() => {
    if (transition !== "all 0s ease 0s") {
      setTransition("all 0s ease 0s");
      if (!isLoaded) {
        setIsLoaded(true);
      } else if (isClosed) {
        if (onClose) onClose();
        removeModal(id);
      }
    }
  }, [isLoaded, isClosed, id, onClose, removeModal, transition]);
  const containerOnTransitionEnd = (0,react.useCallback)(() => {
    if (transform !== "none") {
      setTransition("all 0.25s ease-in-out");
      setTimeout(() => {
        setMargin(0);
        setMaxHeight(0);
      }, 0);
    }
  }, [transform]);
  const onClick = (0,react.useCallback)(evt => {
    evt.preventDefault();
    evt.stopPropagation();
    setIsClosed(true);
  }, []);
  return /*#__PURE__*/react.createElement(Holder, {
    margin: margin,
    maxHeight: maxHeight,
    onTransitionEnd: holderOnTransitionEnd,
    transition: transition
  }, /*#__PURE__*/react.createElement(NotificationComponent_Container, {
    background: background,
    border: border
    // iconClassName={iconClassName}
    ,
    iconColor: iconColor,
    onTransitionEnd: containerOnTransitionEnd,
    ref: refCallback,
    transform: transform
  }, /*#__PURE__*/react.createElement(NotificationComponent_style_HeaderContainer, null, /*#__PURE__*/react.createElement(style_Header, null, description || !icon ? /*#__PURE__*/react.createElement(style_IconContainer, null, /*#__PURE__*/react.createElement(extension_logo, null)) : /*#__PURE__*/react.createElement(Icon, null), message ? /*#__PURE__*/react.createElement(Message, {
    color: messageColor,
    dir: dir
  }, message) : null), /*#__PURE__*/react.createElement(NotificationComponent_style_ButtonClose, {
    border: closeButtonBorder,
    onClick: onClick
  })), description ? /*#__PURE__*/react.createElement(Content, {
    headerBorder: headerBorder
  }, /*#__PURE__*/react.createElement(Icon, null), /*#__PURE__*/react.createElement(Description, {
    color: descriptionColor,
    dangerouslySetInnerHTML: {
      __html: description
    },
    dir: dir
  })) : null, bottomContent));
};
/* harmony default export */ const NotificationsListComponent_NotificationComponent = (NotificationComponent);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/NotificationsListComponent/index.jsx
function NotificationsListComponent_extends() { return NotificationsListComponent_extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, NotificationsListComponent_extends.apply(null, arguments); }
// react imports



// local imports
// hooks


// components

const NotificationsListComponent = ({
  notifications
}) => {
  const {
    publicIds
  } = hooks_useAppState(["publicIds"]);
  const {
    notifications: notificationsId
  } = publicIds;
  const notificationsHolder = document.getElementById(notificationsId);
  if (notificationsHolder) {
    const dom = notifications.map((notification, index) => /*#__PURE__*/react.createElement(NotificationsListComponent_NotificationComponent, NotificationsListComponent_extends({}, notification.props, {
      id: notification.id,
      index: index,
      key: notification.id,
      theOnly: notifications.length === 1
    })));
    return /*#__PURE__*/(0,react_dom.createPortal)(dom, notificationsHolder);
  }
  return null;
};
/* harmony default export */ const ModalsComponent_NotificationsListComponent = (NotificationsListComponent);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/ModalsComponent/index.jsx
// react imports


// local imports
// hooks


// components


const ModalsComponent = () => {
  const {
    modals
  } = hooks_useAppState(["modals"]);
  const notifications = modals.filter(rec => rec.type === "notification");
  const modalsList = modals.filter(rec => rec.type === "modal");
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(ModalsComponent_NotificationsListComponent, {
    notifications: notifications
  }), /*#__PURE__*/react.createElement(ModalsComponent_ModalsListComponent, {
    modals: modalsList
  }));
};
/* harmony default export */ const common_ModalsComponent = (ModalsComponent);
;// CONCATENATED MODULE: ./src/utils/dom/in-iframe.js
const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

/* harmony default export */ const in_iframe = (inIframe);

;// CONCATENATED MODULE: ./src/utils/save-file.js



const sign = `${config.extType}:${config.version}`;

const createDataUrlFromArrayBuffer = (data) => {
  const base64url = URL.createObjectURL(new Blob([data], { type: "application/octet-binary" }));
  return base64url;
};

const saveByUrl = (url, fileName) => {
  if (in_iframe()) {
    window.top.postMessage({
      fileName, receiver: sign, url,
    }, "*");
    return;
  }
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;

  if (document.createEvent) {
    const event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    a.dispatchEvent(event);
  } else {
    a.click();
  }
  URL.revokeObjectURL(url);
};

let saving = false;
const saveFile = (file, fileName) => {
  if (typeof file === "string") {
    saveByUrl(file, fileName);
    return;
  }
  // file is not a string so it's either ArrayBuffer or ReadableStream
  if (in_iframe()) {
    window.top.postMessage({
      file, fileName, receiver: sign,
    }, "*", [file]); // we're moving file without copying
    return;
  }
  // we are on the top, so no one can help us and we have the file to save
  if (!saving) {
    try {
      const url = createDataUrlFromArrayBuffer(file); // TODO file can be ReadableStream
      saving = true;
      saveByUrl(url, fileName);
    } catch {}
  }
  saving = false;
};

/* harmony default export */ const save_file = (saveFile);

;// CONCATENATED MODULE: ./src/content-script/ui/components/svg-icons/camera.jsx

const IconCamera = ({
  style,
  color,
  className
}) => /*#__PURE__*/react.createElement("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "22px",
  height: "18px",
  viewBox: "0 0 22 18",
  style: style,
  className: className
}, /*#__PURE__*/react.createElement("path", {
  fill: color,
  d: "M 22 4.9 Q 22 3.8 21.2 3.05 20.4 2.25 19.3 2.25 L 16.4 2.25 16 1.3 Q 15.65 0.5 14.9 0.2 14.55 0.05 14.25 0 L 7.75 0 Q 7.45 0.05 7.1 0.2 6.35 0.5 6 1.3 L 5.6 2.25 2.7 2.25 Q 1.6 2.25 0.85 3.05 0.05 3.8 0 4.9 L 0 15.3 Q 0.05 16.4 0.85 17.15 1.6 17.95 2.7 18 L 19.3 18 Q 20.4 17.95 21.2 17.15 22 16.4 22 15.3 L 22 4.9 M 11 4.9 Q 13.15 4.9 14.7 6.4 16.2 7.95 16.2 10.1 16.2 12.3 14.7 13.8 13.15 15.3 11 15.3 8.85 15.3 7.35 13.8 5.8 12.3 5.8 10.1 5.8 7.95 7.35 6.4 8.85 4.9 11 4.9 M 13.4 7.75 Q 12.4 6.75 11 6.75 9.6 6.75 8.6 7.75 7.65 8.7 7.65 10.1 7.65 11.5 8.6 12.5 9.6 13.5 11 13.5 12.4 13.5 13.4 12.5 14.35 11.5 14.35 10.1 14.35 8.7 13.4 7.75 Z"
}));
/* harmony default export */ const camera = (IconCamera);
;// CONCATENATED MODULE: ./src/content-script/ui/widget/normal/SnapshotButtonComponent/style.jsx
// vendor imports

const style_Container = styled_components_browser_esm.div.withConfig({
  displayName: "style__Container",
  componentId: "sc-17mv9yd-0"
})`position:absolute;width:100%;height:100%;`;
const style_Button = styled_components_browser_esm.button.withConfig({
  displayName: "style__Button",
  componentId: "sc-17mv9yd-1"
})`background-color:transparent;width:100%;height:100%;outline:none;flex:1;display:flex;align-items:center;justify-content:center;border:none;padding:0;cursor:pointer;`;

;// CONCATENATED MODULE: ./src/content-script/ui/components/common/TooltipComponent/HintComponent/style.jsx
// vendor imports

const StHint = styled_components_browser_esm.div.withConfig({
  displayName: "style__StHint",
  componentId: "sc-gev13l-0"
})`${props => props.theme && `
    color: ${props.theme.color};
    background-color: ${props.theme.background};
    border: 1px solid ${props.theme.border};
  `} border-radius:2px;position:absolute;top:${props => props.posY}px;left:${props => props.posX}px;max-width:250px;padding:6px 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;user-select:none;box-sizing:border-box;opacity:${props => props.opacity};transition:opacity 0.2s ease-in-out;&::before{content:" ";position:absolute;top:-3px;right:-1px;bottom:-3px;left:-1px;}`;
/* harmony default export */ const HintComponent_style = (StHint);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/TooltipComponent/HintComponent/index.jsx
// react imports



// local imports
// hooks


// components

const HintComponent = ({
  element,
  isElementMouseOver,
  title
}) => {
  const {
    module,
    publicIds,
    theme
  } = hooks_useAppState(["module", "publicIds", "theme"]);
  const {
    tooltip: tooltipId
  } = publicIds;
  const tooltip = document.getElementById(tooltipId);
  const [isTooltip, setIsTooltip] = (0,react.useState)(false);
  const [isTooltipMouseOver, setIsTooltipMouseOver] = (0,react.useState)(false);
  const [posX, setPosX] = (0,react.useState)(0);
  const [posY, setPosY] = (0,react.useState)(0);
  const [opacity, setOpacity] = (0,react.useState)(0);
  const onTransitionEnd = (0,react.useCallback)(() => {
    if (!isElementMouseOver && !isTooltipMouseOver) {
      setIsTooltip(false);
    }
  }, [isElementMouseOver, isTooltipMouseOver]);
  const onMouseEnter = (0,react.useCallback)(() => {
    setIsTooltipMouseOver(true);
  }, []);
  const onMouseLeave = (0,react.useCallback)(() => {
    setIsTooltipMouseOver(false);
  }, []);
  const refCallback = (0,react.useCallback)(node => {
    if (node) {
      const elementRect = element.getBoundingClientRect();
      if (elementRect) {
        const nodeRect = node.getBoundingClientRect();
        if (nodeRect) {
          const margin = 2;
          const {
            getScrollContainer
          } = module;
          const moduleScrollContainer = getScrollContainer && getScrollContainer();
          const scrollTop = moduleScrollContainer ? moduleScrollContainer.scrollTop : window.pageYOffset;
          const elementTop = elementRect.top;
          const nodeHeight = nodeRect.height;
          const newNodeTop = elementTop - nodeHeight - margin;
          if (newNodeTop - margin > 0) {
            setPosY(scrollTop + newNodeTop);
          } else {
            setPosY(scrollTop + elementRect.bottom + margin);
          }
          const elementCenter = elementRect.left + elementRect.width / 2;
          const nodeWidth = nodeRect.width;
          const {
            clientWidth
          } = document.body;
          if (elementCenter - nodeWidth / 2 < margin) {
            setPosX(margin);
          } else if (elementCenter + nodeWidth / 2 > clientWidth - margin) {
            setPosX(clientWidth - margin - nodeWidth);
          } else {
            setPosX(elementCenter - nodeWidth / 2);
          }
        }
      }
    }
  }, [element, module]);
  if (!isTooltip && tooltip && element && isElementMouseOver && !opacity) {
    setIsTooltip(true);
  }
  const computedOpacity = isTooltip && (isElementMouseOver || isTooltipMouseOver) ? 1 : 0;
  if (computedOpacity !== opacity) {
    setOpacity(computedOpacity);
  }
  if (isTooltip) {
    return /*#__PURE__*/(0,react_dom.createPortal)( /*#__PURE__*/react.createElement(HintComponent_style, {
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onTransitionEnd: onTransitionEnd,
      opacity: opacity,
      posX: posX,
      posY: posY,
      ref: refCallback,
      theme: theme ? theme.tooltip : null
    }, title), tooltip);
  }
  return tooltip ? /*#__PURE__*/(0,react_dom.createPortal)(null, tooltip) : null;
};
/* harmony default export */ const TooltipComponent_HintComponent = (HintComponent);
;// CONCATENATED MODULE: ./src/content-script/ui/components/common/TooltipComponent/index.jsx
// react imports


// local imports
// components

const TooltipComponent = ({
  children,
  title
}) => {
  const [element, setElement] = (0,react.useState)();
  const [isMouseOver, setIsMouseOver] = (0,react.useState)(false);
  const [isElementMouseOver, setIsElementMouseOver] = (0,react.useState)(false);
  const [isTimeout, setIsTimeout] = (0,react.useState)(false);
  const computedElementIsMouseOver = !isTimeout && isMouseOver;
  if (isElementMouseOver !== computedElementIsMouseOver) {
    setIsElementMouseOver(computedElementIsMouseOver);
  }
  const onMouseEnter = (0,react.useCallback)(() => {
    setIsMouseOver(true);
    setIsTimeout(true);
    setTimeout(() => {
      setIsTimeout(false);
    }, 200);
  }, []);
  const onMouseLeave = (0,react.useCallback)(() => {
    setIsElementMouseOver(false);
    setIsMouseOver(false);
  }, []);
  const refCallback = (0,react.useCallback)(node => {
    if (node) setElement(node);
  }, []);
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/(0,react.cloneElement)(children, {
    onMouseEnter,
    onMouseLeave,
    ref: refCallback
  }), /*#__PURE__*/react.createElement(TooltipComponent_HintComponent, {
    element: element,
    isElementMouseOver: isElementMouseOver,
    title: title
  }));
};
/* harmony default export */ const common_TooltipComponent = (TooltipComponent);
;// CONCATENATED MODULE: ./src/content-script/ui/widget/normal/SnapshotButtonComponent/index.jsx
// TODO: move to independent widget - https://www.goodday.work/t/pxQKH0
// reacr imports




// local imports
// hooks


// utilities


// images


// components


const SnapshotButtonComponent = () => {
  const {
    eventRouter,
    info,
    module,
    publicIds,
    showSnapshotButton
  } = hooks_useAppState(["eventRouter", "info", "module", "publicIds", "showSnapshotButton"]);
  const {
    t
  } = useTranslation_useTranslation();
  const {
    snapshot: snapshotId
  } = publicIds;
  const snapshot = document.getElementById(snapshotId);
  const handleClick = (0,react.useCallback)(async evt => {
    evt.stopPropagation();
    if (info) {
      const {
        title
      } = info;
      const file = await module.snap();
      save_file(await file.arrayBuffer(), `${title || "screenshot"}.jpeg`);
      eventRouter.emit("screenshoted");
    }
  }, [info, eventRouter, module]);
  (0,react.useEffect)(() => {
    if (snapshot && !snapshot.armed) {
      snapshot.armed = true;
      snapshot.addEventListener("click", handleClick); // ok hack
      if (showSnapshotButton && info) {
        snapshot.setAttribute("style", "");
      } else {
        snapshot.setAttribute("style", "display:none");
      }
      return () => {
        if (snapshot) {
          snapshot.armed = false;
          snapshot.removeEventListener("click", handleClick);
        }
      };
    }
    return () => {};
  }, [showSnapshotButton, snapshot, info, handleClick]);
  if (!snapshot) {
    return null;
  }
  const snapshotButton = /*#__PURE__*/react.createElement(common_TooltipComponent, {
    title: t("take_screenshot_tooltip")
  }, /*#__PURE__*/react.createElement(style_Container, null, /*#__PURE__*/react.createElement(style_Button, null, /*#__PURE__*/react.createElement(camera, {
    color: "white"
  }))));
  return /*#__PURE__*/(0,react_dom.createPortal)(showSnapshotButton ? snapshotButton : null, snapshot);
};
/* harmony default export */ const normal_SnapshotButtonComponent = (SnapshotButtonComponent);
;// CONCATENATED MODULE: ./src/content-script/ui/widget/normal-screenshot/index.jsx
// react imports


// local imports
// hooks



// components


const Widget = () => {
  const {
    module
  } = hooks_useAppState(["module"]);
  hooks_useGDPRModal();
  if (module.snap) {
    return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(normal_SnapshotButtonComponent, null), /*#__PURE__*/react.createElement(common_ModalsComponent, null));
  }
  return null;
};
/* harmony default export */ const normal_screenshot = (Widget);
;// CONCATENATED MODULE: ./src/utils/dom/snapshot.js
// takes snapshot from video element
/* harmony default export */ const snapshot = ((video, callback) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const w = video.videoWidth;
  const h = video.videoHeight;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.fillRect(0, 0, w, h);
  context.drawImage(video, 0, 0, w, h);
  canvas.toBlob(callback, "image/jpeg", 1.0);
});

;// CONCATENATED MODULE: ./src/content-script/services/gv-generic/snap.js


/* harmony default export */ const snap = (() => new Promise((resolve) => {
  const video = document.querySelector("video");
  snapshot(video, resolve);
}));

;// CONCATENATED MODULE: ./src/content-script/services/gv-generic/dir-detect.js
const getDir = () => {
  const body = document.querySelector("body");
  const dir = body.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
  return dir;
};

const startDirObserver = (setDir) => {
  const body = document.querySelector("body");
  const dirObserver = new MutationObserver((mutations) => {
    mutations.some((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "dir") {
        setDir(getDir());
        return true;
      }
      return false;
    });
  });
  dirObserver.observe(body, { attributes: true });
};



;// CONCATENATED MODULE: ./src/utils/find-language.js


const findLanguage = () => {
  const html = document.querySelector("html[lang],body[lang]");
  const htmlLocale = html.getAttribute("lang") || "";
  const { languages } = config;
  if (languages.indexOf(htmlLocale) > -1) {
    return htmlLocale;
  }
  const baseLang = htmlLocale.split("-")[0];
  if (languages.indexOf(baseLang) > -1) {
    return baseLang;
  }
  const cisLocales = ["ru-RU", "uk-UA", "be-BY", "kk-KZ", "ky-KG", "hy-AM", "ka-GE", "az-Latn-AZ"];
  const cisLangs = ["ru", "uk", "be", "kk", "ky", "hy", "ka", "az", "az-Latn"];
  if ((cisLangs.indexOf(baseLang) > -1) || (cisLocales.indexOf(htmlLocale) > -1)) {
    return "ru";
  }
  return "en";
};

/* harmony default export */ const find_language = (findLanguage);

;// CONCATENATED MODULE: ./src/content-script/services/gv-generic/lang-detect.js


const getLang = () => find_language();

const startLangObserver = (getLangFromSettings, setLang) => {
  const html = document.querySelector("html");
  const localeObserver = new MutationObserver((mutations) => {
    mutations.some((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "lang") {
        if (getLangFromSettings() === "autoDetect") {
          setLang(getLang());
        }
        return true;
      }
      return false;
    });
  });
  localeObserver.observe(html, { attributes: true });
};



;// CONCATENATED MODULE: ./src/utils/regexp.js
/* harmony default export */ const regexp = ((regexps, target) => regexps.some(regexp => (new RegExp(regexp)).test(target)));

;// CONCATENATED MODULE: ./src/content-script/services/gv-generic/is-embed.js


const gvEmbedUrls = [
  "^https?://www\\.youtube\\.com/embed",
  "^https?://www\\.youtu\\.be/embed",
  "^https?://www\\.youtube-nocookie\\.com/embed",
];

/* harmony default export */ const is_embed = (url => regexp(gvEmbedUrls, url));

;// CONCATENATED MODULE: ./src/content-script/services/gv-embed-generic/url-checker.js



const mediaUrls = [
  "^https?://(?:www\\.)?(?:youtu\\.be)|(youtube\\.com)|(youtube-nocookie\\.com)/embed/[a-zA-Z0-9_-]+",
];

const isServiceUrl = is_embed;
const isServiceMediaUrl = url => regexp(mediaUrls, url);

;// CONCATENATED MODULE: ./src/content-script/services/gv-generic/make-canonical-url.js
/* harmony default export */ const make_canonical_url = (mediaId => `https://www.youtube.com/watch?v=${mediaId}`);

;// CONCATENATED MODULE: ./src/content-script/services/gv-generic/get-media-id.js


const context = {
  counts: 0,
};

const getMediaId = (_url, resolve, reject) => {
  if (context.counts > 5) reject();

  let url = _url;

  if (is_embed(url)) {
    const nextRound = () => {
      context.counts++;
      setTimeout(() => getMediaId(_url, resolve, reject), 100);
    };
    const urlObj = new URL(url);
    const id = urlObj.pathname.split("/").pop();
    if (!id) {
      try {
        const maybeContainer = document.querySelector("div.ytp-title a");
        if (maybeContainer) {
          const maybe = maybeContainer.getAttribute("href");
          if (maybe && maybe !== url) {
            getMediaId(maybe, resolve, reject);
            return;
          }
        }
        const anotherMaybeContainer = document.querySelector("a.ytp-share-panel-link");
        if (!anotherMaybeContainer) {
          nextRound();
          return;
        }
        const anotherMaybe = anotherMaybeContainer.getAttribute("href");
        if (!anotherMaybe) {
          nextRound();
          return;
        }
        url = anotherMaybe;
      } catch (e) {
        context.counts = 0;
        reject(e);
        return;
      }
    } else {
      context.counts = 0;
      resolve(id);
      return;
    }
  }

  const urlObj = new URL(url);
  if ((/^https?:\/\/(www\.)?(m\.)?(youtube\.com)\/shorts/.test(url))) {
    const id = urlObj.pathname.split("/").pop();
    context.counts = 0;
    resolve(id);
    return;
  }
  if (/^https?:\/\/(www\.)?(youtu\.be)\/[a-zA-Z0-9_-]+/.test(url)) {
    const id = urlObj.pathname.split("/")[1];
    context.counts = 0;
    resolve(id);
    return;
  }
  const id = new URLSearchParams(urlObj.search).get("v");
  context.counts = 0;
  resolve(id);
};
/* eslint-disable-next-line no-promise-executor-return */
/* harmony default export */ const get_media_id = (url => new Promise((resolve, reject) => getMediaId(url, resolve, reject)));

;// CONCATENATED MODULE: ./src/content-script/services/gv-embed-screenshot/get-media-info.js



let prevTitle;

/* harmony default export */ const get_media_info = (async (url, setMediaInfo) => {
  const getTitle = async () => {
    const title = document.title.split("-").slice(0, -1).join("-").trim();
    if (!title || title === prevTitle) {
      setTimeout(getTitle, 500);
      return;
    }
    prevTitle = title;
    const mediaInfo = {
      id: make_canonical_url(await get_media_id(url)),
      title,
      expires: Math.floor(Date.now() / 1000) + 6 * 60 * 60,
      streams: [],
      video: [],
      audio: [],
    };
    setMediaInfo({ mediaInfo });
  };
  setTimeout(getTitle, 1500);
});

;// CONCATENATED MODULE: ./src/utils/minify.js
const minify = css => (
  css.replace(/\s\s+/g, "")
    .replace(/ {/g, "{")
    .replace(/;}/g, "}")
    .replace(/: /g, ":")
);

/* harmony default export */ const utils_minify = (minify);

;// CONCATENATED MODULE: ./src/content-script/services/common.js


class Common {
  constructor(eventRouter) {
    this.eventRouter = eventRouter;
    // { selector, required, tracked }
    // where selector is string or array of strings
    this.selectors = {};
  }

  isVisible(element) {
    const cs = window.getComputedStyle(element, null);
    const display = cs.getPropertyValue("display");
    const height = cs.getPropertyValue("height");
    const width = cs.getPropertyValue("width");
    return display !== "none" && height !== "0px" && width !== "0px";
  }

  selectVisibleOnly(selectorName) {
    const _targets = this.querySelectorAll(selectorName);
    const targets = Array.from(_targets).filter(this.isVisible.bind(this));
    if (targets.length) return targets[0];
    return null;
  }

  waitForElement(selectorName, element, timeout) {
    return new Promise((resolve, reject) => {
      let timeoutId;
      if (timeout) {
        timeoutId = setTimeout(reject, timeout);
      }
      const check = () => {
        const result = this.querySelector(selectorName, element);
        if (result) {
          if (timeoutId) clearInterval(timeoutId);
          resolve(result);
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  }

  querySelector(selectorName, element) {
    if (!this.selectors[selectorName]) return null;
    if (this.selectors[selectorName].visible) {
      return this.selectVisibleOnly(selectorName);
    }
    if (Array.isArray(this.selectors[selectorName].selector)) {
      return (element || document).querySelector(this.selectors[selectorName].selector.join(", "));
    }
    return (element || document).querySelector(this.selectors[selectorName].selector);
  }

  querySelectorAll(selectorName, element) {
    if (!this.selectors[selectorName]) return null;
    if (Array.isArray(this.selectors[selectorName].selector)) {
      return (element || document).querySelectorAll(this.selectors[selectorName].selector.join(", "));
    }
    return (element || document).querySelectorAll(this.selectors[selectorName].selector);
  }

  firstParentMatchesSelector(selectorName, element) {
    if (!this.selectors[selectorName]) return null;
    if (!element) return null;
    if (element === document) return null;

    const result = this.querySelector(selectorName, element);
    if (result) return result;
    if (element.parentElement) return this.firstParentMatchesSelector(selectorName, element.parentElement);
    return null;
  }

  emit(...argv) {
    // TODO: if eventRouter not initialized yet - remember events and throw them later https://www.goodday.work/t/Djb3Dw
    if (this.eventRouter) {
      this.eventRouter.emit(...argv);
    }
  }

  checkLocation() {
    if (this.location !== window.location.href) {
      this.location = window.location.href;
      if (this.onLocationChanged) {
        this.onLocationChanged();
      }
      if (this.exactMatch()) {
        this.emit("locationChanged", this.widgetContainer);
        if (!this.doNotEmitUpdateInfoRequest) this.emit("updateMediaInfoRequest");
      }
    }
    setTimeout(this.checkLocation.bind(this), 200);
  }

  generatePublicId(name) {
    const id = random_name_generator(12);
    this.emit("newPublicId", { name, id });
    return id;
  }

  inserted(_widget) {
    const widget = _widget || this.widgetContainer;
    if (!widget) {
      return false;
    }
    return document.body.contains(widget);
  }

  insertContainer(name, parentContainer, neighbour, place = "before", element = "div", holder = null) {
    let success = false;
    const id = this.generatePublicId(name);
    const container = typeof element === "string" ? document.createElement(element) : element;
    if (holder) {
      holder.setAttribute("id", id);
    } else {
      container.setAttribute("id", id);
    }
    if (!neighbour) {
      parentContainer.appendChild(container);
      success = true;
    }
    if (place === "before") {
      parentContainer.insertBefore(container, neighbour);
      success = true;
    }
    if (place === "after") {
      if (neighbour.nextElementSibling) {
        parentContainer.insertBefore(container, neighbour.nextElementSibling);
      } else {
        parentContainer.appendChild(container);
      }
      success = true;
    }
    if (success) {
      return container;
    }

    throw new Error(`failed to add a new container with name ${name}`);
  }

  addStyle(css) {
    const head = document.head || document.getElementsByTagName("head")[0];
    const style = document.createElement("style");
    head.appendChild(style);
    style.appendChild(document.createTextNode(css));
    return style;
  }

  async addButton() {
    if (this.inProgress) return;
    this.inProgress = true;
    try {
      const inserted = await this.insertWidgetContainer();
      if (inserted) {
        this.emit("renderWidgetRequest", this.widgetContainer);
      }
    } catch (e) {
      console.log("error in addButton: ", e);
    }
    this.inProgress = false;
  }

  onLoad(callback) {
    if (this.exactMatch()) {
      this.checkLayout(callback);
    } else {
      setTimeout(this.onLoad.bind(this, callback), 1000);
    }
  }

  checkLayout(callback) {
    if (this.layoutIsReady()) {
      callback();
      this.checkLocation();
    } else {
      setTimeout(this.checkLayout.bind(this, callback), 1000);
    }
  }

  start() {
    this.onLoad(this.addButton.bind(this));
  }

  layoutIsReady() {
    const selectors = Object.keys(this.selectors)
      .filter(selectorName => this.selectors[selectorName].required);
    const decision = selectors.every(selector => this.querySelector(selector));
    return decision;
  }
}

/* harmony default export */ const common = (Common);

;// CONCATENATED MODULE: ./src/content-script/services/gv-generic/url-checker.js



const serviceUrls = ["^https?://(?:www\\.)?(m\\.)?(?:youtube\\.com|youtu\\.be)"];
const mobileServiceUrls = ["^https?://(?:www\\.)?(?:m\\.youtube\\.com|youtu\\.be)"];
const mobileShortsMediaUrls = (/* unused pure expression or super */ null && (["^https?://(?:www\\.)?(m\\.)?(?:youtube\\.com|youtu\\.be)/shorts/?"]));
const url_checker_mediaUrls = [
  "^https?://(?:www\\.)?(m\\.)?(?:youtube\\.com|youtu\\.be)/shorts/?",
  "^https?://(?:www\\.)?(m\\.)?(?:youtube\\.com|youtu\\.be)/watch\\?",
  "^https?://(?:www\\.)?(?:youtu\\.be)/[a-zA-Z0-9_-]+",
];

const url_checker_isServiceUrl = url => regexp(serviceUrls, url) && !is_embed(url);
const isMobileServiceUrl = url => regexp(mobileServiceUrls, url) && !is_embed(url);
const isMobileShortsMediaUrl = url => any(mobileShortsMediaUrls, url) && !isEmbed(url);
const url_checker_isServiceMediaUrl = url => regexp(url_checker_mediaUrls, url);

;// CONCATENATED MODULE: ./src/content-script/services/gv-generic/service.js




class service_Service extends common {
  constructor(eventRouter) {
    super(eventRouter);
    this.selectors.subscribeButtonContainer = {
       selector: [
        "#columns #primary #primary-inner #subscribe-button.style-scope",
        ".slim-owner-subscribe-button",
       ]
       };
    this.selectors.rightControls = {
      selector: ".ytp-right-controls",
      required: !isMobileServiceUrl(window.location.href),
      visible: true
    };
    this.selectors.subscribeButton = {
      selector: [
        "ytd-subscribe-button-renderer tp-yt-paper-button",
        "ytd-button-renderer tp-yt-paper-button",
        "ytd-button-renderer yt-button-shape",
        "ytd-button-renderer .yt-simple-endpoint",
      ],
    };
    this.selectors.subscribeButtonText = {
      selector: [
        "yt-formatted-string",
        ".yt-core-attributed-string",
      ],
    };
    this.selectors.roundedButton = {
      selector: "#button-shape button.yt-spec-button-shape-next",
      visible: true,
    };
    this.selectors.subscribeNotification = { selector: "#notification-preference-button" };
    this.selectors.settingsButton = {
      selector: [
        "div.ytp-chrome-controls div.ytp-right-controls [data-tooltip-target-id=ytp-settings-button]",
        "div.ytp-right-controls [data-tooltip-target-id=ytp-settings-button]",
      ],
      required: !isMobileServiceUrl(window.location.href),
      visible: true,
    };
  }

  exactMatch() {
    const exact = url_checker_isServiceMediaUrl(window.location.href);
    return exact;
  }

  _insertSnapshot() {
    if (this.snapshot) {
      this.snapshot.remove();
      delete this.snapshot;
    }
    const rightControls = this._getRightControls();
    const settingsButton = this._getSettingsButton();
    const snapshot = this.insertContainer("snapshot", rightControls, settingsButton);
    if (!snapshot) {
      this.emit("insertSnapshotFailure");
      return false;
    }
    this.snapshot = snapshot;
    snapshot.setAttribute("style", "display:none");
    const css = utils_minify(`
      #${snapshot.id} {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 100%;
      }
    `);
    this.addStyle(css);
    return snapshot;
  }

  _insertModal() {
    const modal = this.insertContainer("modal", document.body);
    const modalBodyClassName = this.generatePublicId("modalBodyClassName");
    const css = utils_minify(`
      #${modal.id} {
        position: fixed;
        z-index: 9999;
        top: 0;
        width: 100%;
      }
      body.${modalBodyClassName} {
        position: fixed;
        width: 100%;
        height: 100%;
      }
      body.${modalBodyClassName} #${modal.id} {
        height: 100%;
      }
      body.${modalBodyClassName} #${modal.id},
      body.${modalBodyClassName}::-webkit-scrollbar {
        background-color: rgba(0,0,0,0.75);
      }
    `);
    this.addStyle(css);
  }

  _insertTooltip(container) {
    const tooltip = this.insertContainer("tooltip", container || document.body);
    const css = utils_minify(`
      #${tooltip.id} {
        position: absolute;
        top: ${this.serviceName.includes("Embed") ? 8 : 0}px;
        width: 100%;
        z-index: 99999 !important;
      }
    `);
    this.addStyle(css);
    return tooltip;
  }

  /* DOM getters */
  _getSubscribeButtonContainer() {
    return this.querySelector("subscribeButtonContainer");
  }

  _getSubscribeButton() {
    return this.querySelector("subscribeButton");
  }

  _getSubscribeButtonText(subscribeButton) {
    return this.querySelector("subscribeButtonText", subscribeButton);
  }

  _getSettingsButton() {
    return this.querySelector("settingsButton");
  }

  _getRightControls() {
    return this.querySelector("rightControls");
  }

  _getNotificationPreferenceButton() {
    const subscribeButtonContainer = this._getSubscribeButtonContainer();
    if (subscribeButtonContainer) {
      return this.querySelector("subscribeNotification", subscribeButtonContainer);
    }
    return null;
  }
  /* end of DOM getters */
}

;// CONCATENATED MODULE: ./src/content-script/services/gv-embed-generic/service.js



class gv_embed_generic_service_Service extends service_Service {
  constructor(eventRouter) {
    super(eventRouter);
    this.hidden = false;
    this.selectors.player = {
      selector: [
        "#player #movie_player .ytp-chrome-top.ytp-show-cards-title .ytp-chrome-top-buttons",
        "#movie_player .ytp-chrome-top.ytp-show-cards-title .ytp-chrome-top-buttons",
      ],
    };
    this.selectors.moviePlayer = { selector: "#movie_player", required: true };
  }

  exactMatch() {
    return isServiceMediaUrl(window.location.href);
  }

  _getPlayer() {
    return this.querySelector("player");
  }
}

;// CONCATENATED MODULE: ./src/content-script/services/gv-embed-screenshot/service.js


class Service extends gv_embed_generic_service_Service {
  constructor(eventRouter) {
    super(eventRouter);
    this.serviceName = "gvEmbedScreenshot";
  }

  _insertAppButton(moviePlayer) {
    const appButton = this.insertContainer("appButton", moviePlayer);
    this.widgetContainer = appButton;
  }

  async insertWidgetContainer() {
    if (this.inserted()) {
      return false;
    }

    const snapshot = this._insertSnapshot();
    if (!snapshot) return false;

    const moviePlayer = this.querySelector("moviePlayer");
    if (!moviePlayer) {
      return false;
    }
    this._insertAppButton(moviePlayer);
    this._insertTooltip(moviePlayer);

    return true;
  }
}

;// CONCATENATED MODULE: ./src/content-script/services/gv-embed-screenshot/index.js











const getTheme = () => "dark";



;// CONCATENATED MODULE: ./src/content-script/services/gv-generic/theme-detect.js


const theme_detect_getTheme = () => {
  const html = document.querySelector("html");

  const isMobile = isMobileServiceUrl(window.location.href);
  if (isMobile) {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? "dark" : "default";
  }
  
  const theme = html.getAttribute("dark") === null ? "default" : "dark";
  return theme;
};

const startThemeObserver = (setTheme) => {
  const html = document.querySelector("html");
  const themeObserver = new MutationObserver((mutations) => {
    mutations.some((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "dark") {
        setTheme(theme_detect_getTheme());
        return true;
      }
      return false;
    });
  });

  themeObserver.observe(html, { attributes: true });
};



;// CONCATENATED MODULE: ./src/content-script/services/gv-screenshot/get-media-info.js



let get_media_info_prevTitle;

/* harmony default export */ const gv_screenshot_get_media_info = (async (url, setMediaInfo) => {
  const getTitle = async () => {
    const title = document.title.split("-").slice(0, -1).join("-").trim();
    if (!title || title === get_media_info_prevTitle) {
      setTimeout(getTitle, 500);
      return;
    }
    get_media_info_prevTitle = title;
    const mediaInfo = {
      id: make_canonical_url(await get_media_id(url)),
      title,
      expires: Math.floor(Date.now() / 1000) + 6 * 60 * 60,
      streams: [],
      video: [],
      audio: [],
    };
    setMediaInfo({ mediaInfo });
  };
  setTimeout(getTitle, 500);
});

;// CONCATENATED MODULE: ./src/content-script/services/gv-screenshot/service.js


class gv_screenshot_service_Service extends service_Service {
  constructor(eventRouter) {
    super(eventRouter);
    this.serviceName = "gvScreenshot";
  }

  _insertAppButton() {
    const appButton = this.insertContainer("appButton", document.body);
    this.widgetContainer = appButton;
    return true;
  }

  async insertWidgetContainer() {
    if (this.inserted()) {
      return false;
    }

    const appButton = this._insertAppButton();
    if (!appButton) return false;

    const snapshot = this._insertSnapshot();
    if (!snapshot) return false;

    this._insertTooltip();
    this._insertModal();

    return true;
  }
}

;// CONCATENATED MODULE: ./src/content-script/services/gv-screenshot/index.js















;// CONCATENATED MODULE: ./src/content-script/services/ok-generic/snap.js


/* harmony default export */ const ok_generic_snap = (() => new Promise((resolve) => {
  const video = document.querySelector("video");
  snapshot(video, resolve);
}));

;// CONCATENATED MODULE: ./src/content-script/services/ok-generic/lang-detect.js
const lang_detect_getLang = () => {
  const html = document.querySelector("html");
  const htmlAttrLang = html.getAttribute("lang");
  const cisLangs = ["ru", "be", "uk", "kk", "uz", "az", "tt", "mo", "ka", "hy"];
  const lng = cisLangs.indexOf(htmlAttrLang) !== -1 ? "ru" : "en";
  return lng;
};

const lang_detect_startLangObserver = (getLangFromSettings, setLang) => {
  const html = document.querySelector("html");
  const localeObserver = new MutationObserver((mutations) => {
    mutations.some((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "lang") {
        if (getLangFromSettings() === "autoDetect") {
          setLang(lang_detect_getLang());
        }
        return true;
      }
      return false;
    });
  });
  localeObserver.observe(html, { attributes: true });
};



;// CONCATENATED MODULE: ./src/content-script/services/ok-embed-generic/url-checker.js


const url_checker_serviceUrls = [
  "^https:\\/\\/connect\\.ok\\.ru",
  "^https:\\/\\/ok\\.ru\\/videoembed",
];
const ok_embed_generic_url_checker_mediaUrls = [
  "^https:\\/\\/connect\\.ok\\.ru",
  "^https:\\/\\/ok\\.ru\\/videoembed",
];

const ok_embed_generic_url_checker_isServiceUrl = url => regexp(url_checker_serviceUrls, url);
const ok_embed_generic_url_checker_isServiceMediaUrl = url => regexp(ok_embed_generic_url_checker_mediaUrls, url);

;// CONCATENATED MODULE: ./src/content-script/services/ok-generic/get-media-id.js
/* harmony default export */ const ok_generic_get_media_id = (async (url) => {
  const urlObj = new URL(url);
  const id = urlObj.pathname.split("/").pop();
  return id;
});

;// CONCATENATED MODULE: ./src/content-script/services/ok-generic/make-canonical-url.js
/* harmony default export */ const ok_generic_make_canonical_url = (mediaId => `https://ok.ru/video/${mediaId}`);

;// CONCATENATED MODULE: ./src/content-script/services/ok-embed-screenshot/get-media-info.js



/* harmony default export */ const ok_embed_screenshot_get_media_info = (async (url, setMediaInfo) => {
  const getTitle = async () => {
    const container = document.querySelector("span.vid-card_n");
    if (!container) {
      setTimeout(getTitle, 500);
      return;
    }
    const title = container.innerText.trim();
    const mediaInfo = {
      id: ok_generic_make_canonical_url(await ok_generic_get_media_id(url)),
      title,
      expires: Math.floor(Date.now() / 1000) + 6 * 60 * 60,
      streams: [],
      video: [],
      audio: [],
    };

    setMediaInfo({ mediaInfo });
  };
  getTitle();
});

;// CONCATENATED MODULE: ./src/content-script/services/ok-generic/url-checker.js


// extension
const ok_generic_url_checker_mediaUrls = [
  "^https?:\\/\\/(m\\.)?ok\\.ru\\/video\\/[0-9]+",
  "^https?:\\/\\/(m\\.)?ok\\.ru\\/live\\/[0-9]+",
];

const exclude = [
  /^https:\/\/ok\.ru\/web/,
  /^https:\/\/ok\.ru\/videoembed/,
];

const ok_generic_url_checker_isServiceMediaUrl = url => regexp(ok_generic_url_checker_mediaUrls, url);
const ok_generic_url_checker_isServiceUrl = (url) => {
  const urlObj = new URL(url);
  const { hostname } = urlObj;
  const decision = /ok\.ru/.test(hostname) && !exclude.some(regexp => regexp.test(url));
  return decision;
};

// mobile app
const subDomains = "www|m|mobile";
const domains = "odnoklassniki|ok";
const pathsArray = [
  "video/",
  "web-api/video/moviePlayer/",
  "live/",
  "group/",
  "dk?.*?st\\.mvId=",
  "dk?.*?_cl\\.id=",
];
const paths = pathsArray.join("|");
const ending = "((?:[0-9]+)|(?:/topic/[0-9]+))";

// eslint-disable-next-line max-len
const mobileMediaUrlWithId = "^https?://(?:(?:www|m|mobile)\\.)?(?:odnoklassniki|ok)\\.ru/(?:video/|web-api/video/moviePlayer/|live/|dk?.*?st\\.mvId=)(?<id>[0-9]+)";
const mobileMediaUrl = `^https?://(?:(?:${subDomains})\\.)?(?:${domains})\\.ru/(?:${paths})${ending}`;

const isMobileServiceMediaUrlWithId = url => any([mobileMediaUrlWithId], url);
const isMobileServiceMediaUrl = url => any([mobileMediaUrl], url);



;// CONCATENATED MODULE: ./src/content-script/services/ok-generic/service.js




const extractData = (holder) => {
  const rawData = holder.getAttribute("data-options");
  // console.log("raw data:", rawData);
  try {
    const data = JSON.parse(rawData);
    // console.log("parsed data:", data);
    if (data.flashvars.metadata) {
      data.flashvars.metadata = JSON.parse(data.flashvars.metadata);
    }
    return data;
  } catch (e) {
  }
  return null;
};

const getScrollContainer = () => document.querySelector(".media-layer.__active");

class ok_generic_service_Service extends common {
  constructor(eventRouter) {
    super(eventRouter);
    this.styles = [];
    this.selectors.controls = { selector: ".html5-vpl_panel_right", required: true };
    this.selectors.gvEmbed = { selector: "iframe[src^=\"https://www.youtube\"]" };
    this.selectors.scrollContainer = { selector: ".media-layer.__active" };
    this.selectors.infoContainer = { selector: "div[data-module='OKVideo']", required: true };
  }

  _getControls() {
    return this.querySelector("controls");
  }

  _getScrollContainer() {
    return this.querySelector("scrollContainer");
  }

  _isGvEmbed() {
    return !!this.querySelector("gvEmbed");
  }

  waitForSnapContainer() {
    return new Promise((resolve, reject) => {
      const rejectByTimeout = () => {
        const adv = document.querySelector(".html5-vpl_adv:not(.al-hide)"); // ADVERTISING
        if (adv) {
          this.rejectTimeout = setTimeout(rejectByTimeout, 10000);
        } else reject();
      };
      this.rejectTimeout = setTimeout(rejectByTimeout, 10000);
      const insert = () => {
        const controls = this._getControls();
        if (controls) {
          const video = document.querySelector("video");
          if (video && video.videoWidth && video.videoHeight) {
            const snapshot = this.insertContainer("snapshot", controls, controls.firstChild);
            clearTimeout(this.rejectTimeout);
            this.rejectTimeout = undefined;
            resolve(snapshot);
            return;
          }
        }
        setTimeout(insert, 50);
      };
      insert();
    });
  }

  getInfoContainer() {
    const holders = this.querySelectorAll("infoContainer");
    const id = window.location.href.split("/").pop();
    const records = Array.from(holders).map(extractData);
    const isItCurrentVideo = i => (
      records[i] &&
      records[i].flashvars &&
      records[i].flashvars.metadata &&
      records[i].flashvars.metadata.movie &&
      records[i].flashvars.metadata.movie.id === id
    );
    const sources = Array.from(holders).filter((holder, i) => isItCurrentVideo(i));
    if (sources.length) return sources[0];
    return null;
  }

  exactMatch() {
    const url = window.location.href;
    return ok_generic_url_checker_isServiceMediaUrl(url);
  }

  layoutIsReady() {
    const isDataReady = this.getInfoContainer() !== null;
    if (this._isGvEmbed()) {
      return isDataReady;
    }
    const controls = this._getControls();
    return isDataReady && !!controls;
  }

  async _insertSnapshot() {
    let snapshot = { id: "fake_id" };
    if (!this._isGvEmbed()) {
      try {
        snapshot = await this.waitForSnapContainer();
      } catch (e) {
        this.emit("insertSnapshotFailure");
        return false;
      }
    }
    this.snapshot = snapshot;
    if (!this.shapshotObserver) {
      this.snapshotObserver = new MutationObserver(() => {
        if (!document.body.contains(this.snapshot)) {
          this.addButton();
        }
      });
      this.snapshotObserver.observe(
        document.body,
        {
          attributes: false,
          childList: true,
          characterData: false,
          subtree: true,
        },
      );
    }

    const css = utils_minify(`
      #${snapshot.id} {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        width: 40px;
        height: 40px;
      }
      #${snapshot.id}:hover svg path {
        fill: #ee8208;
      }
    `);
    const style = this.addStyle(css);
    this.styles.push({ css, style });
    return true;
  }

  _insertModal() {
    const modal = this.insertContainer("modal", document.body);
    const modalBodyClassName = this.generatePublicId("modalBodyClassName");
    const css = utils_minify(`
      #${modal.id} {
        position: fixed;
        z-index: 9999;
        top: 0;
        width: 100%;
        text-align: left;
      }
      body.${modalBodyClassName} {
        position: fixed;
        width: 100%;
        height: 100%;
      }
      body.${modalBodyClassName} #${modal.id} {
        height: 100%;
      }
      body.${modalBodyClassName} #${modal.id},
      body.${modalBodyClassName}::-webkit-scrollbar {
        background-color: rgba(0,0,0,0.75);
      }
    `);
    const style = this.addStyle(css);
    this.styles.push({ css, style });
  }

  _insertTooltip() {
    const scrollContainerNode = (this._getScrollContainer() || document.body);
    const tooltip = this.insertContainer("tooltip", scrollContainerNode);
    const css = utils_minify(`
      #${tooltip.id} {
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 99999;
        text-align: left;
      }
    `);
    const style = this.addStyle(css);
    this.styles.push({ css, style });
  }

  _observeStyles() {
    if (this.stylesObserver) return;
    const head = document.head || document.getElementsByTagName("head")[0];
    this.stylesObserver = new MutationObserver(() => {
      this.styles.forEach((pair) => {
        const { css, style } = pair;
        if (!head.contains(style)) {
          /* eslint-disable-next-line no-param-reassign */
          pair.style = this.addStyle(css);
        }
      });
    });
    this.stylesObserver.observe(
      head,
      {
        attributes: false,
        childList: true,
        characterData: false,
        subtree: true,
      },
    );
  }
}

;// CONCATENATED MODULE: ./src/content-script/services/ok-embed-generic/service.js






class ok_embed_generic_service_Service extends ok_generic_service_Service {
  constructor(eventRouter) {
    super(eventRouter);
    this.hidden = false;
    this.selectors.vidCard = { selector: ".vid-card" };
    this.selectors.rightPanel = { selector: ".html5-vpl_panel_right" };
  }

  _getMediaContainer() {
    return this.querySelector("vidCard");
  }

  _getRightPanel() {
    return this.querySelector("rightPanel");
  }

  exactMatch() {
    const url = window.location.href;
    return ok_embed_generic_url_checker_isServiceMediaUrl(url);
  }

  start() {
    this.checkLocation();
    const addButton = this.addButton.bind(this);
    const callback = this.onLoad.bind(this, addButton);
    callback();
  }

  waitForSnapContainer(snapshotId) {
    const vidCard = this._getMediaContainer();
    const vidCardObserver = new MutationObserver(() => {
      const html5VplPanelRight = this._getRightPanel();
      if (html5VplPanelRight) {
        vidCardObserver.disconnect();
        const snapshot = document.getElementById(snapshotId);
        html5VplPanelRight.insertBefore(snapshot, html5VplPanelRight.firstChild);
        const styleSnapshot = document.querySelector(`[data-${snapshotId}]`);
        if (styleSnapshot) {
          styleSnapshot.remove();
        }
      }
    });
    vidCardObserver.observe(
      vidCard,
      {
        attributes: false,
        childList: true,
        characterData: false,
        subtree: true,
      },
    );
  }

  _insertSnapshot() {
    const snapshot = this.insertContainer("snapshot", document.body);
    snapshot.setAttribute("style", "display:none");
    const cssSnapshot = utils_minify(`
      #${snapshot.id} {
        display:none !important;
      }
    `);
    const styleSnapshot = this.addStyle(cssSnapshot);
    styleSnapshot.setAttribute(`data-${snapshot.id}`, "true");

    const css = utils_minify(`
      #${snapshot.id} {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        width: 40px;
        height: 40px;
      }
      #${snapshot.id}:hover svg path {
        fill: #ee8208;
      }
    `);

    this.addStyle(css);

    this.waitForSnapContainer(snapshot.id);
  }

  _insertTooltip() {
    const tooltip = this.insertContainer("tooltip", document.body);
    const css = utils_minify(`
      #${tooltip.id} {
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 99999;
        text-align: left;
      }
    `);

    this.addStyle(css);
  }
}

;// CONCATENATED MODULE: ./src/content-script/services/ok-embed-screenshot/service.js


class ok_embed_screenshot_service_Service extends ok_embed_generic_service_Service {
  constructor(eventRouter) {
    super(eventRouter);
    this.serviceName = "okEmbedScreenshot";
  }

  _insertAppButton() {
    const appButton = this.insertContainer("appButton", document.body);
    this.widgetContainer = appButton;
  }

  async insertWidgetContainer() {
    if (this.inserted()) {
      return false;
    }

    this._insertAppButton();

    this._insertSnapshot();
    this._insertTooltip();

    return true;
  }
}

;// CONCATENATED MODULE: ./src/content-script/services/ok-embed-screenshot/index.js











const ok_embed_screenshot_getTheme = () => "dark";



;// CONCATENATED MODULE: ./src/content-script/services/ok-screenshot/get-media-info.js



/* harmony default export */ const ok_screenshot_get_media_info = (async (url, setMediaInfo) => {
  const getTitle = async () => {
    const container = document.querySelector(".vp-layer-info_h.textWrap");
    if (!container) {
      setTimeout(getTitle, 500);
      return;
    }

    const title = container.innerText.trim();

    const mediaInfo = {
      id: ok_generic_make_canonical_url(await ok_generic_get_media_id(url)),
      title,
      expires: Math.floor(Date.now() / 1000) + 6 * 60 * 60,
      streams: [],
      video: [],
      audio: [],
    };

    setMediaInfo({ mediaInfo });
  };
  getTitle();
});

;// CONCATENATED MODULE: ./src/content-script/services/ok-screenshot/service.js


class ok_screenshot_service_Service extends ok_generic_service_Service {
  constructor(eventRouter) {
    super(eventRouter);
    this.serviceName = "okScreenshot";
  }

  _insertAppButton() {
    const appButton = this.insertContainer("appButton", document.body);
    this.widgetContainer = appButton;
  }

  async insertWidgetContainer() {
    if (this.inserted() && this.snapshot && this.inserted(this.snapshot)) {
      return false;
    }
    if (this.inserting) return false;
    this.inserting = true;

    if (!this.inserted()) this._insertAppButton();

    if (!this.snapshot || !this.inserted(this.snapshot)) {
      await this._insertSnapshot();
      this._insertTooltip();
      this._insertModal();
      this._observeStyles();
    }
    this.inserting = false;

    return true;
  }
}

;// CONCATENATED MODULE: ./src/content-script/services/ok-screenshot/index.js












const appButtonAlign = "left";



;// CONCATENATED MODULE: ./src/content-script/integration/modules.js
// It's generated code, don't try to change it, see /configs/src-generation/modules-list.js instead





/* harmony default export */ const integration_modules = (() => ({
  gvEmbedScreenshot: gv_embed_screenshot_namespaceObject,
  gvScreenshot: gv_screenshot_namespaceObject,
  okEmbedScreenshot: ok_embed_screenshot_namespaceObject,
  okScreenshot: ok_screenshot_namespaceObject,
}));

;// CONCATENATED MODULE: ./src/utils/human-readable-intervals.js
const human_readable_intervals_minute = 60 * 1000;
const minutes = num => num * human_readable_intervals_minute;
const hour = 60 * human_readable_intervals_minute;
const hours = num => num * hour;
const day = 24 * hour;
const days = num => num * day;
const week = 7 * day;
const weeks = num => num * week;



;// CONCATENATED MODULE: ./src/utils/update-black-list.js
// local imports
// config


// integration


// utils




const modules = integration_modules();

const checkers = Object.keys(modules).map((moduleName) => {
  const {
    getMediaId, isServiceMediaUrl, makeCanonicalUrl,
  } = modules[moduleName];
  return {
    getMediaId, isServiceMediaUrl, makeCanonicalUrl,
  };
});

const onlyRecognisable = url => checkers.some(checker => checker.isServiceMediaUrl && checker.isServiceMediaUrl(url));

const makeCanonical = async (url) => {
  const targetChecker = checkers.find(checker => checker.isServiceMediaUrl && checker.isServiceMediaUrl(url));
  return targetChecker && targetChecker.makeCanonicalUrl(await targetChecker.getMediaId(url));
};

const update_black_list_onlyUniques = (value, index, self) => self.indexOf(value) === index;

const addUrlsToBlackList = async (urls) => {
  const blackList = await index_ext.get("blackList");
  const canonicalUrls = await Promise.all(urls
    .filter(onlyRecognisable)
    .map(makeCanonical));
  const newList = [...blackList, ...canonicalUrls].filter(update_black_list_onlyUniques);
  await index_ext.set("blackList", newList);
};

/* harmony default export */ const update_black_list = (() => (
  /* eslint-disable-next-line no-async-promise-executor */
  new Promise(async (resolve, reject) => {
    const lastUpdated = await index_ext.get("blackListLastUpdated");
    if (lastUpdated + hours(6) > Date.now()) {
      resolve();
      return;
    }
    const getPage = (pageNum) => {
      const options = { method: "GET" };
      const url = `${config.getBlackListEndpoint}/?page=${pageNum}`;
      fetchBack(url, options)
        .then((response) => {
          const { totalPages, urls } = response;
          addUrlsToBlackList(urls)
            .then(() => {
              if (totalPages > pageNum) getPage(pageNum + 1);
              else {
                index_ext.set("blackListLastUpdated", Date.now());
                resolve();
              }
            });
        })
        .catch(reject);
    };
    getPage(1);
  })
));

;// CONCATENATED MODULE: ./src/content-script/store/event-listeners/get-state.js
const getState = {
  handler: (store, eventRouter) => () => {
    const state = store.getState();
    eventRouter.emit("state", state);
  },
  name: "getState",
};
/* harmony default export */ const get_state = (getState);

;// CONCATENATED MODULE: ./src/content-script/store/event-listeners/insert-snapshot-failure.js
const insertSnapshotFailure = {
  handler: store => () => {
    const { sendEvent } = store.getState();
    sendEvent({ action: "insert_snapshot_failure" });
  },
  name: "insertSnapshotFailure",
};

/* harmony default export */ const insert_snapshot_failure = (insertSnapshotFailure);

;// CONCATENATED MODULE: ./src/content-script/store/event-listeners/landing-opened.js
const landingOpened = {
  handler: store => (options) => {
    const {
      incrementLandingOpenedCount,
      sendEvent,
    } = store.getState();
    incrementLandingOpenedCount();
    sendEvent(options);
  },
  name: "landingOpened",
};

/* harmony default export */ const landing_opened = (landingOpened);

;// CONCATENATED MODULE: ./src/content-script/store/event-listeners/location-changed.js
const locationChanged = {
  handler: (store, eventRouter) => (widgetContainer) => {
    if (widgetContainer && !document.body.contains(widgetContainer)) {
      eventRouter.emit("renderWidgetRequest", widgetContainer);
    }
  },
  name: "locationChanged",
};

/* harmony default export */ const location_changed = (locationChanged);

;// CONCATENATED MODULE: ./src/content-script/store/event-listeners/media-id-undefined.js
const mediaIdUndefined = {
  handler: store => () => {
    const { sendEvent, setStatus } = store.getState();
    sendEvent({ action: "mediaIdUndefined" });
    window.sendLog({
      topUrl: window.top.location.href, type: "mediaIdUndefined", url: window.location.href,
    });
    setStatus("error");
  },
  name: "mediaIdUndefined",
};

/* harmony default export */ const media_id_undefined = (mediaIdUndefined);

;// CONCATENATED MODULE: ./src/content-script/store/event-listeners/new-public-id.js
const newPublicId = {
  handler: store => (desc) => {
    const {
      addPublicId,
      publicIds,
    } = store.getState();

    addPublicId(desc);
    setTimeout(() => {
      if (publicIds[desc.name]) {
        const elem = document.getElementById(publicIds[desc.name]);
        if (elem) elem.remove();
      }
    }, 0);
  },
  name: "newPublicId",
};

/* harmony default export */ const new_public_id = (newPublicId);

;// CONCATENATED MODULE: ./src/content-script/store/event-listeners/protected-by-law.js
const protectedByLaw = {
  handler: store => () => {
    const { setStatus } = store.getState();
    setStatus("protected");
  },
  name: "protectedByLaw",
};

/* harmony default export */ const protected_by_law = (protectedByLaw);

;// CONCATENATED MODULE: ./src/utils/send-mk-data.js



const getField = (obj, fieldPath, relative = {}) => {
  const relativeKey = keyName => ((keyName || "").match(/^%(.+)%$/) || [])[1];
  const path = fieldPath.split(".");

  let key = path.shift();
  const rel = relativeKey(key);
  let result = rel ? relative[rel] : obj[key];
  // eslint-disable-next-line no-cond-assign
  while (result && (key = path.shift()) && (result = result[key])) {}
  return result;
};

const helpers = {
  filterObj: (obj, cb) => Object.entries(obj).reduce((result, [key, val]) => {
    // eslint-disable-next-line no-param-reassign
    if (cb(key, val)) result[key] = val;
    return result;
  }, {}),
  gv: {
    maxThumb: (list) => {
      if (list.url) return list.url;
      if (Array.isArray(list)) {
        list.filter(t => !!t.url).sort((a, b) => {
          const as = Math.max(a.height || 0, a.width || 0);
          const bs = Math.max(b.height || 0, b.width || 0);
          if (as > bs) return -1;
          if (as < bs) return 1;
          return 0;
        });
        const thumb = list.shift();
        // return thumb?.url; // "ecmaVersion": 2020,
        return (thumb || {}).url;
      }
      return list;
    },
    strs: {
      flyoutCta: "playerOverlay.instreamAdPlayerOverlayRenderer.flyoutCtaRenderer.flyoutCtaRenderer",
      microformatRender: "%_playerVars%.player_response.microformat.playerMicroformatRenderer",
    },
    trgUrl: (url) => {
      // actionButtonUrl => https://.../pagead/aclk? ... adurl=
      const sp = url.split("?").pop();
      const p = new URLSearchParams(sp);
      return p.get("adurl") || url;
    },
  },
};

const preprocess = {
  flatten: (parsed) => {
    const canFlaten = a => Array.isArray(a) && a.every(i => Array.isArray(i));
    const flaten = arr => ((canFlaten(arr) ? [].concat(...arr) : arr).map(i => (canFlaten(i) ? flaten(i) : i)));
    return flaten(parsed);
  },
  handleData: (type, data) => {
    try {
      switch (type) {
      case "gv": return preprocess.parsers.gv.parseInitial(data);
      default: return null;
      }
    } catch (e) {
      return { error: "preprocess", type };
    }
  },
  matchSchemas: (obj, type) => {
    const available = preprocess.schemas[type];
    return Object.entries(available).map(([key, schema]) => {
      const val = schema._path ? getField(obj, schema._path) : obj[key];
      if (!val) return false;
      const target = schema._get ? schema._get(val) : val; // TODO: move / check to parse
      return { schema, target };
    }).filter(r => r);
  },
  parse: (obj, type = "gv") => {
    const getPath = rule => (typeof rule === "string" ? rule : rule.path);
    const schemas = preprocess.matchSchemas(obj, type);
    return schemas.map(({ schema: _schema, target }) => {
      const {
        _get,
        _path,
        _type,
        ...schema
      } = _schema;
      const result = { type: _type };
      const getValue = (rule) => {
        const path = getPath(rule);
        if (!path) return undefined;
        let val = getField(target, path, result);
        if (val && rule.get) {
          val = rule.get(val);
        }
        return val;
      };
      // filter object
      if (Object.keys(schema).length < 1 && (target || {}).parsed) {
        return {
          items: target.parsed,
          type: _type,
        };
      }
      Object
        .entries(schema)
        .forEach(([key, rule]) => {
          result[key] = getValue(rule);
        });

      return helpers.filterObj(result, key => /^[^_]/.test(key)); // remove `_*` keys
    });
  },
  parsers: {
    gv: {
      parseInitial: ({ adPlacements }) => {
        if (!adPlacements) return null;
        const ads = adPlacements.map((adPlacement) => {
          const parsed = preprocess.parse(adPlacement, "gv");
          return parsed;
        }).filter(a => a.length > 0);
        return preprocess.flatten(ads);
      },
    },
  },
  schemas: {
    gv: {
      actionCompanionAdRenderer: {
        _path: "adPlacementRenderer.renderer.actionCompanionAdRenderer",
        _type: "act-companion",
        actionButton: "actionButton.buttonRenderer.text.simpleText", // "Try Now"
        actionButtonUrl: {
          get: helpers.gv.trgUrl,
          path: "actionButton.buttonRenderer.navigationEndpoint.urlEndpoint.url",
        },
        bannerImage: {
          get: helpers.gv.maxThumb,
          path: "bannerImage.thumbnail.thumbnails",
        },
        description: "description.text",
        iconImage: {
          get: helpers.gv.maxThumb,
          path: "iconImage.thumbnail.thumbnails",
        },
        title: "headline.text",
        url: {
          get: helpers.gv.trgUrl,
          path: "navigationEndpoint.urlEndpoint.url",
        },
        videoId: "adVideoId", // "OT1bV6AVt9A"
      },
      adActionInterstitialRenderer: {
        _type: "act-interstitial",
        actionButton: "actionButton.buttonRenderer.text.simpleText",
        actionButtonUrl: {
          get: helpers.gv.trgUrl,
          path: "actionButton.buttonRenderer.navigationEndpoint.urlEndpoint.url",
        },
        background: {
          get: helpers.gv.maxThumb,
          path: "background.thumbnail.thumbnails",
        },
        backgroundImage: {
          get: helpers.gv.maxThumb,
          path: "backgroundImage.thumbnail.thumbnails",
        },
        description: "description.text",
        image: {
          get: helpers.gv.maxThumb,
          path: "image.thumbnail.thumbnails",
        },
        skipButton: "skipButton.skipButtonRenderer.message.text",
        title: "headline.text",
        url: {
          get: helpers.gv.trgUrl,
          path: "navigationEndpoint.urlEndpoint.url",
        },
      },
      instreamVideoAdRenderer: {
        _playerVars: {
          get: (raw) => {
            const p = new URLSearchParams(raw);
            const obj = {};
            // eslint-disable-next-line no-restricted-syntax
            for (const [key, value] of p.entries()) {
              obj[key] = value;
            }
            obj.player_response = JSON.parse(obj.player_response || "{}");
            return obj;
          },
          path: "playerVars",
        },
        _type: "instream-video",
        adDescription: `${helpers.gv.strs.flyoutCta}.description.text`,
        adImage: {
          get: helpers.gv.maxThumb,
          path: `${helpers.gv.strs.flyoutCta}.image.thumbnail.thumbnails`,
        },
        adTitle: `${helpers.gv.strs.flyoutCta}.headline.text`,
        category: `${helpers.gv.strs.microformatRender}.category`,
        description: `${helpers.gv.strs.microformatRender}.description.simpleText`,
        image: {
          get: helpers.gv.maxThumb,
          path: `${helpers.gv.strs.microformatRender}.thumbnail.thumbnails`,
        },
        owner: `${helpers.gv.strs.microformatRender}.ownerChannelName`,
        ownerUrl: `${helpers.gv.strs.microformatRender}.ownerProfileUrl`,
        title: `${helpers.gv.strs.microformatRender}.title.simpleText`,
        uploadDate: `${helpers.gv.strs.microformatRender}.uploadDate`,
        url: {
          get: helpers.gv.trgUrl,
          path: `${helpers.gv.strs.flyoutCta}.actionButton.buttonRenderer.navigationEndpoint.urlEndpoint.url`,
        },
        videoId: "%_playerVars%.video_id",
        videoUrl: `${helpers.gv.strs.microformatRender}.embed.flashSecureUrl`,
      },
      linearAdSequenceRenderer: {
        _get: (list) => {
          const parsed = list.map(ad => preprocess.parse(ad, "gv"));
          return { parsed: preprocess.flatten(parsed) };
        },
        _path: "adPlacementRenderer.renderer.linearAdSequenceRenderer.linearAds",
        _type: "linear-sequence",
      },
    },
  },
};

const sendMkData = async ({ raw, serviceName }, store) => {
  const {
    agreeWithProcessingTechnicalData,
    hid,
    userAcceptedTerms,
    utm,
  } = store.getState();

  if ((!userAcceptedTerms) || (!agreeWithProcessingTechnicalData)) return;

  const defData = {
    action: "mk-data",
    branch: config.branch,
    hash: config.hash,
    hid,
    project: config.type,
    type: config.analyticsType,
    version: config.version,
    ...utm,
    service: serviceName,
    // media_source: window.location.href,
  };
  const processed = preprocess.handleData(serviceName, raw);
  if (!processed || processed.length < 1) return;
  try {
    const headers = [["Content-Type", "application/json; charset=utf-8"]];
    const body = JSON.stringify({ ...defData, info: processed });
    network_sendPost(config.analyticsUrl, headers, body, true);
  } catch (e) {}
};

/* harmony default export */ const send_mk_data = (sendMkData);

;// CONCATENATED MODULE: ./src/content-script/store/event-listeners/raw-media-info.js
// local imports
// utils


const rawMediaInfo = {
  handler: store => mediaInfo => send_mk_data(mediaInfo, store),
  name: "rawMediaInfo",
};

/* harmony default export */ const raw_media_info = (rawMediaInfo);

// EXTERNAL MODULE: ./node_modules/react-dom/client.js
var client = __webpack_require__(745);
;// CONCATENATED MODULE: ./src/content-script/ui/widget/render-widget.jsx
// vendor imports


// react imports



const getRenderWidget = store => {
  let lastRoot;
  return async (Widget, widgetContainer) => {
    const foundContainers = [];
    const domObserver = new MutationObserver((mutationList, observer) => {
      /* eslint-disable-next-line no-restricted-syntax */
      for (const mutation of mutationList) {
        if (mutation.type === "childList" && mutation.removedNodes && mutation.removedNodes.length) {
          /* eslint-disable-next-line no-restricted-syntax */
          for (const currentNode of mutation.removedNodes) {
            if (currentNode === widgetContainer || currentNode.contains(widgetContainer)) {
              foundContainers.push(widgetContainer);
            }
          }
        }
      }
      if (foundContainers.length) {
        observer.disconnect();
        foundContainers.forEach(container => document.body.appendChild(container));
        (0,react_dom.unmountComponentAtNode)(widgetContainer);
        foundContainers.forEach(container => container.remove());
      }
    });
    domObserver.observe(document, {
      attributes: false,
      characterData: false,
      childList: true,
      subtree: true
    });
    if (!document.body.contains(widgetContainer)) return;
    if (lastRoot) {
      lastRoot.unmount();
    }
    const root = (0,client/* createRoot */.s)(widgetContainer);
    lastRoot = root;
    root.render( /*#__PURE__*/react.createElement(components_Provider, {
      store: store
    }, /*#__PURE__*/react.createElement(Widget, null)));
  };
};
/* harmony default export */ const render_widget = (getRenderWidget);
;// CONCATENATED MODULE: ./src/content-script/store/event-listeners/render-widget-request.js
// local imports
// widget


const renderWidgetRequest = {
  handler: (store) => {
    const renderWidget = render_widget(store);
    return (widgetContainer) => {
      const {
        sendEvent,
        setBodyScrollbarWidth,
        setHelpState,
        setShowUI,
        showUI,
      } = store.getState();
      console.log("renderWidgetRequest!!!", widgetContainer, store.getState().module);

      if (showUI) setShowUI(false);
      const bodyScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      setBodyScrollbarWidth(bodyScrollbarWidth);
      setHelpState(undefined); // Сброс helpState при переинициализации виджета (фикс для help-скроллов в ig)
      sendEvent({ action: "insertWidget" });

      const { module } = store.getState();
      const { Widget } = module;
      renderWidget(Widget, widgetContainer);
    };
  },
  name: "renderWidgetRequest",
};

/* harmony default export */ const render_widget_request = (renderWidgetRequest);

;// CONCATENATED MODULE: ./src/content-script/store/event-listeners/screenshoted.js
// local imports
// widget


const screenshoted = {
  handler: store => () => {
    const {
      incrementScreenshots,
      sendEvent,
      setLastSuccessScreenshot,
    } = store.getState();
    sendEvent({ action: "snap" });
    incrementScreenshots();
    setLastSuccessScreenshot(Date.now());
    check_rating_modal(store);
  },
  name: "screenshoted",
};

/* harmony default export */ const event_listeners_screenshoted = (screenshoted);

;// CONCATENATED MODULE: ./src/content-script/store/event-listeners/show-modal.js
const showModal = {
  handler: store => (format) => {
    const {
      sendEvent,
      setRatingModalLastNotNow,
    } = store.getState();
    sendEvent({ action: "showModal", format });
    setRatingModalLastNotNow(Date.now());
  },
  name: "showModal",
};

/* harmony default export */ const show_modal = (showModal);

;// CONCATENATED MODULE: ./src/content-script/store/event-listeners/user-redirected-to-store.js
const userRedirectedToStore = {
  handler: store => (format) => {
    const {
      sendEvent,
      setRatingModalNeverShow,
    } = store.getState();
    sendEvent({ action: "redirectedToStore", format });
    setRatingModalNeverShow(true);
  },
  name: "userRedirectedToStore",
};

/* harmony default export */ const user_redirected_to_store = (userRedirectedToStore);

;// CONCATENATED MODULE: ./src/content-script/store/event-listeners/index.js
// local imports
// store













const listeners = [
  raw_media_info,
  location_changed,
  get_state,
  media_id_undefined,
  protected_by_law,
  insert_snapshot_failure,
  new_public_id,
  user_redirected_to_store,
  landing_opened,
  event_listeners_screenshoted,
  show_modal,
  render_widget_request,
];

/* harmony default export */ const event_listeners = (listeners);

;// CONCATENATED MODULE: ./src/content-script/store/set-events-listeners.js
// local imports
// widget


// integration



// utils



// store


const setEventsListeners = (eventRouter, store) => {
  const registerListener = (desc) => {
    const {
      handler,
      name,
    } = desc;
    eventRouter.on(name, handler(store, eventRouter));
  };
  const updateMediaInfo = get_update_media_info(store);

  event_listeners.forEach((listener) => {
    if (Array.isArray(listener)) {
      listener.forEach(registerListener);
    } else registerListener(listener);
  });

  const { setIsWebextDestroyed } = store.getState();
  eventRouter.on("webextIsDestroyed", () => setIsWebextDestroyed(true));
  eventRouter.on("webextIsCreated", () => setIsWebextDestroyed(false));

  const context = {
    currentMediaId: undefined,
    oldStatus: undefined,
  };

  eventRouter.on("updateMediaInfoRequest", (id) => {
    const {
      downloader,
      initDownloader,
      serviceName,
      setDefaultItem,
      setInfo,
      setStatus,
      setTitle,
      status,
    } = store.getState();
    console.log("updateMediaInfoRequest!!!", id, serviceName);
    if (!downloader && initDownloader) {
      initDownloader();
    }
    setStatus("gettingInfo");
    setInfo(null);
    setDefaultItem(null);
    setTitle(null);

    context.oldStatus = status;
    update_black_list();
    updateMediaInfo(id);
  });

  eventRouter.on("useDownloadButtonStyle", (buttonStyle) => {
    const { setDownloadButtonStyle } = store.getState();
    setDownloadButtonStyle(buttonStyle);
  });

  eventRouter.on("resetIsMobileConfigs", () => {
    const { resetIsMobileConfigs } = store.getState();
    resetIsMobileConfigs();
  });

  eventRouter.on("currentMediaId", (mediaId) => {
    context.currentMediaId = mediaId;
  });

  eventRouter.on("mediaInfo", async (mediaInfo, token, canBeCached) => {
    const {
      module,
      setIsPreviousDownloading,
      setStatus,
    } = store.getState();
    console.log("MEDIA INFO EVENT!!!", mediaInfo, context, token);
    let guard;
    const { getMediaId, makeCanonicalUrl } = module;
    if (
      (token !== makeCanonicalUrl(await getMediaId(window.location.href))) &&
      (token !== makeCanonicalUrl(context.currentMediaId))
    ) {
      return;
    }

    set_media_info(store, token, mediaInfo, canBeCached);
    if (context.oldStatus && context.oldStatus === "downloading") {
      setIsPreviousDownloading(true);
      setStatus(context.oldStatus);
    } else {
      setStatus(get_default_status(mediaInfo));
    }
    const { expires } = mediaInfo;
    if (expires && Number.isInteger(expires)) {
      const timestamp = Math.floor(Date.now() / 1000);
      if (expires > timestamp) {
        console.log(`video info will be updated after ${((expires - timestamp) / 60).toFixed(1)} minutes`);
        const delta = (expires - timestamp) * 1000;
        if (guard) clearTimeout(guard);
        guard = setTimeout(() => eventRouter.emit("updateMediaInfoRequest"), delta);
      } else {
        guard = setTimeout(() => eventRouter.emit("updateMediaInfoRequest"), 6 * 60 * 60 * 1000);
      }
    }
  });

  eventRouter.on("updateInfo_failure", () => {
    console.log("UPDATE INFO FAILURE!!!");
    const { sendEvent, setStatus } = store.getState();
    sendEvent({ action: "updateInfo_failure" });
    sendEvent({ action: "button_limited" });
    setStatus("error");
    // setMediaInfo(store, token, {});
  });

  const restoreStatus = () => {
    const {
      info,
      resetProgress,
      setIsPreviousDownloading,
      setStatus,
    } = store.getState();
    context.oldStatus = undefined;
    if (info) {
      setStatus(get_default_status(info));
    }
    resetProgress();
    setIsPreviousDownloading(false);
  };

  eventRouter.on("fileSaved", () => {
    const {
      incrementDownloadedInRow,
      incrementDownloads,
      setLastSuccessDownload,
    } = store.getState();
    incrementDownloads();
    incrementDownloadedInRow();
    setLastSuccessDownload(Date.now());
    check_rating_modal(store);
    restoreStatus();
  });

  eventRouter.on("cancelDownloading", () => {
    const { sendEvent } = store.getState();
    sendEvent({ action: "download_canceled" });
    const { incrementCancelCount } = store.getState();
    incrementCancelCount();
  });

  eventRouter.on("downloadError", () => {
    const {
      resetDownloadedInRow,
      resetProgress,
      sendEvent,
      setStatus,
    } = store.getState();
    resetProgress();
    resetDownloadedInRow();
    setStatus("downloadError");
    sendEvent({ action: "download_error" });
  });
};

/* harmony default export */ const set_events_listeners = (setEventsListeners);

;// CONCATENATED MODULE: ./src/content-script/store/index.js
// vendor imports



// local imports
// utils


// store







const stores = {};

const Store = async (moduleName) => {
  if (stores[moduleName]) return stores[moduleName];

  await globals_migrations();
  const store = createStore(store_reducers, applyMiddleware(es));

  const setters = get_setters(store);
  store.dispatch(actions.setAll(setters));

  after_effects.forEach(afterEffect => afterEffect(store));

  const { eventRouter } = store.getState();
  set_events_listeners(eventRouter, store);

  window.sendLog = get_send_log_ff(store); // TODO
  stores[moduleName] = store;
  return store;
};

/* harmony default export */ const content_script_store = (Store);

;// CONCATENATED MODULE: ./src/assets/inject-scripts/do-xhr-request.js
const do_xhr_request_namespaceObject = "/* it's for instagramm only yet! */\n(() => {\n  const container = document.currentScript;\n  try {\n    const {\n      url,\n      method,\n      headers,\n      body,\n    } = JSON.parse(container.getAttribute(\"data-params\"));\n    const xhr = new XMLHttpRequest();\n    xhr.open(method, url, true);\n    Object.keys(headers).forEach(headerName => xhr.setRequestHeader(headerName, headers[headerName]));\n\n    xhr.onload = () => {\n      if (xhr.status === 200 || xhr.status === 206) {\n        container.setAttribute(\"data-response\", JSON.stringify(xhr.response));\n        container.setAttribute(\"data-status\", \"fulfilled\");\n      } else {\n        container.setAttribute(\"data-response\", \"no content\");\n        container.setAttribute(\"data-status\", \"rejected\");\n      }\n    };\n    xhr.onerror = (e) => {\n      container.setAttribute(\"data-response\", JSON.stringify(e));\n      container.setAttribute(\"data-status\", \"rejected\");\n    };\n    xhr.ontimeout = () => {\n      container.setAttribute(\"data-response\", \"timeout\");\n      container.setAttribute(\"data-status\", \"rejected\");\n    };\n\n    if (body) {\n      xhr.send(body);\n    } else {\n      xhr.send();\n    }\n  } catch (e) {\n    console.log(\"ERROR!!!\", e);\n    container.setAttribute(\"data-response\", JSON.stringify(e));\n    container.setAttribute(\"data-status\", \"rejected\");\n  }\n})();\n";
;// CONCATENATED MODULE: ./src/assets/inject-scripts/get-globals.js
const get_globals_namespaceObject = "(() => {\n  const container = document.currentScript;\n  const getGlobals = () => {\n    const isObject = (item) => {\n      if (typeof item === \"undefined\") return false;\n      if (item === null) return false;\n      if (typeof item === \"object\") return true;\n      return false;\n    };\n\n    const resolveName = (name) => {\n      const tokens = name.split(\".\");\n      /* eslint-disable-next-line no-confusing-arrow */\n      const res = tokens.reduce(((result, token) => isObject(result) ? result[token] : undefined), window);\n      return res;\n    };\n\n    try {\n      const { names, wait } = JSON.parse(container.getAttribute(\"data-params\"));\n      const result = names.map(resolveName);\n      if (wait && result.some(value => value === undefined)) {\n        setTimeout(getGlobals, 500);\n        return;\n      }\n      // console.log(names, \" => \", result);\n      container.setAttribute(\"data-response\", JSON.stringify(result));\n      container.setAttribute(\"data-status\", \"fulfilled\");\n    } catch (e) {\n      console.log(\"ERROR!!!\", e);\n      container.setAttribute(\"data-response\", JSON.stringify(e));\n      container.setAttribute(\"data-status\", \"rejected\");\n    }\n  };\n  getGlobals();\n})();\n";
;// CONCATENATED MODULE: ./src/assets/inject-scripts/parse-throttled-url.js
const parse_throttled_url_namespaceObject = "(() => {\n  const container = document.currentScript;\n\n  try {\n    const { url } = JSON.parse(container.getAttribute(\"data-params\"));\n\n    // Find method for calc new 'n'\n    const [fData] = Object.entries(window._yt_player).filter(([, f]) => f?.prototype?.get && f.length > 1 && /\\.url/.test(f.toString()));\n    const [name1] = fData;\n\n    const holder = new window._yt_player[name1](url, true);\n    if (holder) {\n      const newN = holder.get(\"n\");\n      container.setAttribute(\"data-response\", JSON.stringify({ n: newN }));\n      container.setAttribute(\"data-status\", \"fulfilled\");\n    } else {\n      container.setAttribute(\"data-response\", new Error(`${name1} not found`));\n      container.setAttribute(\"data-status\", \"rejected\");\n    }\n  } catch (e) {\n    container.setAttribute(\"data-response\", JSON.stringify(e));\n    container.setAttribute(\"data-status\", \"rejected\");\n  }\n})();\n";
;// CONCATENATED MODULE: ./src/assets/inject-scripts/patch-fetch.js
const patch_fetch_namespaceObject = "(() => {\n  const patchFetch = (container) => {\n    const x = window.fetch;\n    if (!x.patched) {\n      window.fetch = (...rest) => {\n        const request = x.apply(this, rest);\n        try {\n          const { pattern } = JSON.parse(container.getAttribute(\"data-params\"));\n          const re = new RegExp(pattern);\n          if (re.test(rest[0].url)) {\n            window.lastResponse = {\n              request,\n            };\n            // eslint-disable-next-line func-names\n            const waitForResponse = async function () {\n              const response = await window.lastResponse.request;\n              window.lastResponse.body = response.clone();\n            };\n            waitForResponse();\n          }\n        } catch (e) {\n          // TODO https://www.goodday.work/t/Fpw0tY\n        }\n        return request;\n      };\n      window.fetch.patched = true;\n    }\n  };\n\n  const container = document.currentScript;\n  try {\n    patchFetch(container);\n    container.setAttribute(\"data-response\", JSON.stringify(\"ok\"));\n    container.setAttribute(\"data-status\", \"fulfilled\");\n  } catch (e) {\n    container.setAttribute(\"data-response\", JSON.stringify(e));\n    container.setAttribute(\"data-status\", \"rejected\");\n  }\n})();\n";
;// CONCATENATED MODULE: ./src/assets/inject-scripts/patch-xhr.js
const patch_xhr_namespaceObject = "(() => {\n  const patchXHR = () => {\n    ((xhr) => {\n      // console.log(\"we are in main page!!!\");\n      function mock(xhrInstance) {\n        if (window.__stopWatching) return;\n        if (!window.__jsons) {\n          window.__jsons = [];\n        }\n        // console.log(xhrInstance.responseText);\n        if (xhrInstance.responseType === \"\" || xhrInstance.responseType === \"text\") {\n          const response = xhrInstance.responseText;\n\n          if (response.length) {\n            let resolved;\n            for (let i = 0; i < 20; i++) {\n              try {\n                const s = response.substring(i);\n                resolved = (s.startsWith(\"for (;;);\")) ? JSON.parse(s.substring(9)) : JSON.parse(s);\n                break;\n              } catch (e) {\n              }\n            }\n            if (resolved) {\n              window.__jsons.push(resolved);\n            }\n          }\n        }\n        if (xhrInstance.responseType === \"json\" && xhrInstance.responseJSON) {\n          window.__jsons.push(xhrInstance.responseJSON);\n        }\n\n        if (window.__jsons.length > 1000) {\n          window.__jsons = window.__jsons.slice(1);\n        }\n        // console.log(e);\n      }\n      const { open } = xhr;\n      /* eslint-disable-next-line no-param-reassign, func-names */\n      xhr.open = function () {\n        /* eslint-disable-next-line prefer-rest-params */\n        const openArguments = arguments;\n        const { setRequestHeader, send } = this;\n\n        /* eslint-disable-next-line func-names */\n        this.setRequestHeader = function (...args) {\n          if (args[0].toLowerCase() === \"x-ig-app-id\") {\n            /* eslint-disable-next-line prefer-destructuring */\n            window[\"X-IG-App-ID\"] = args[1]; // seems like we don't use it\n          }\n          setRequestHeader.apply(this, args);\n        };\n\n        /* eslint-disable-next-line func-names */\n        this.send = function (data, ...args) {\n          if (openArguments[0].toLowerCase() === \"post\" && openArguments[1].includes(\"/ajax/bulk-route-definitions/\")) {\n            const resolveParams = {};\n            const bodyParams = new URLSearchParams(data);\n            /* eslint-disable-next-line no-restricted-syntax */\n            for (const key of bodyParams.keys()) {\n              resolveParams[key] = bodyParams.get(key);\n            }\n            window.resolveParams = resolveParams;\n          }\n          const { onload } = this;\n          // Apply monkey-patch\n          /* eslint-disable-next-line func-names, consistent-return */\n          this.onload = function (...xhrArgs) {\n            mock(this);\n            if (onload) {\n              return onload.apply(this, xhrArgs);\n            }\n          };\n          return send.apply(this, [data, ...args]);\n        };\n        /* eslint-disable-next-line prefer-rest-params */\n        return open.apply(this, arguments);\n      };\n    })(XMLHttpRequest.prototype);\n  };\n  patchXHR();\n}\n)();\n";
;// CONCATENATED MODULE: ./src/assets/inject-scripts/set-global.js
const set_global_namespaceObject = "(() => {\n  const isObject = (item) => {\n    if (typeof item === \"undefined\") return false;\n    if (item === null) return false;\n    if (typeof item === \"object\") return true;\n    return false;\n  };\n\n  const container = document.currentScript;\n\n  try {\n    const { name, value } = JSON.parse(container.getAttribute(\"data-params\"));\n    const tokens = name.split(\".\");\n    const pointer = tokens.pop();\n    /* eslint-disable-next-line no-confusing-arrow */\n    const holder = tokens.reduce(((result, token) => isObject(result) ? result[token] : undefined), window);\n    if (holder) {\n      holder[pointer] = value;\n      container.setAttribute(\"data-response\", JSON.stringify(true));\n      container.setAttribute(\"data-status\", \"fulfilled\");\n    } else {\n      container.setAttribute(\"data-response\", new Error(`${name} not found`));\n      container.setAttribute(\"data-status\", \"rejected\");\n    }\n  } catch (e) {\n    container.setAttribute(\"data-response\", JSON.stringify(e));\n    container.setAttribute(\"data-status\", \"rejected\");\n  }\n})();\n";
;// CONCATENATED MODULE: ./src/utils/inject-script/add-src-tm.js
/* using raw-loader, see webpack config */






// TODO: use web-acessible scripts from background like in v3 version https://www.goodday.work/t/wBYXqj

const funcs = {
  "do-xhr-request.js": do_xhr_request_namespaceObject,
  "get-globals.js": get_globals_namespaceObject,
  "parse-throttled-url.js": parse_throttled_url_namespaceObject,
  "patch-fetch.js": patch_fetch_namespaceObject,
  "patch-xhr.js": patch_xhr_namespaceObject,
  "set-global.js": set_global_namespaceObject,
};

/* harmony default export */ const add_src_tm = ((script, scriptPath) => {
  if (!funcs[scriptPath]) {
    throw new Error(`script with path ${scriptPath} doesn't declared in hashes table`);
  }

  const blob = new Blob([funcs[scriptPath]], { type: "text/javascript" });
  let url = URL.createObjectURL(blob);

  // todo: подкостылил для того, чтобы пофиксить вставку скриптов. В tm ушли не все ошибки, в rn форматы парсятся и даже качаются с помощью vpn
  if (window.trustedTypes && window.trustedTypes.createPolicy) {
    // eslint-disable-next-line no-undef
    const scriptPolicy = trustedTypes.createPolicy("script-url-policy", { createScriptURL: input => input });
    url = scriptPolicy.createScriptURL(url);
  }

  /* eslint-disable-next-line no-param-reassign */
  script.src = url;
  // script.text = funcs[scriptPath];
});

;// CONCATENATED MODULE: ./src/utils/inject-script/index.js


const isDocumentReady = () => !!(document.head || document.documentElement);

const injectScript = (scriptElement) => {
  if (isDocumentReady()) {
    (document.head || document.documentElement).appendChild(scriptElement);
  } else setTimeout(() => injectScript(scriptElement), 50);
};

/* harmony default export */ const inject_script = ((document, scriptPath, params) => {
  const { MutationObserver } = document.defaultView;

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.defer = true;
    script.async = true;
    add_src_tm(script, scriptPath);
    script.setAttribute("data-params", JSON.stringify(params));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName && mutation.attributeName === "data-status") {
          const status = mutation.target.getAttribute("data-status");
          const response = mutation.target.getAttribute("data-response");
          const result = response === "undefined" ? undefined : JSON.parse(response);
          const type = mutation.target.getAttribute("data-type");

          script.parentElement.removeChild(script);
          switch (status) {
          case "fulfilled":
            resolve(result);
            break;
          case "rejected":
            if (!type || type !== "error") {
              reject(result);
            } else {
              const err = new Error();
              reject(Object.assign(err, result));
            }
            break;
          default:
            reject(new Error("injectScript: unknown response"));
          }
        }
        observer.disconnect();
      });
    });
    observer.observe(script, { attributes: true });
    injectScript(script);
  });
});

;// CONCATENATED MODULE: ./src/utils/analytics/send-daily.js


/* harmony default export */ const send_daily = (async (sendEvent) => {
  const lastLoaded = await index_ext.get("extensionLoaded");
  if (!lastLoaded || (Date.now() - lastLoaded > 24 * 60 * 60 * 1000)) {
    index_ext.set("extensionLoaded", Date.now());
    sendEvent({ action: "extension_daily" });
  }
});

;// CONCATENATED MODULE: ./src/content-script/utils/check-services.js
// local imports
// store


// integration


// utils




const checkServices = async () => {
  console.log("check services");

  inject_script(document, "patch-xhr.js", {});
  const timeoutId = setTimeout(() => {
    try {
      inject_script(document, "set-global.js", { name: "__stopWatching", value: true });
      inject_script(document, "set-global.js", { name: "__jsons", value: [] });
    } catch {}
  }, 5000);

  const modules = integration_modules();
  const modulesNames = Object.keys(modules);
  let uninstallObserver;

  /* eslint-disable no-await-in-loop */
  for (let i = 0; i < modulesNames.length; i++) {
    const moduleName = modulesNames[i];
    const module = modules[moduleName];
    const { isServiceUrl, Service } = module;
    if (isServiceUrl(window.location.href)) {
      if (!uninstallObserver) {
        uninstallObserver = true;
        const uninstallSelf = () => window.location.reload();
        addListener("uninstallSelf", uninstallSelf);
      }
      console.log("We've got a hit!!!", moduleName);
      clearTimeout(timeoutId);
      const store = await content_script_store(moduleName);

      const {
        eventRouter,
        setModule,
        setServiceName,
      } = store.getState();

      setModule(module);

      const service = new Service(eventRouter);
      setServiceName(service.serviceName);
      service.start();
    }
  }
  /* eslint-enable no-await-in-loop */
  // send daily even if there is no module to engage
  const defaultStore = await content_script_store("defaultService");
  const { sendEvent } = defaultStore.getState();
  send_daily(sendEvent);
};

/* harmony default export */ const check_services = (checkServices);

;// CONCATENATED MODULE: ./src/content-script/utils/default-service.js
// local imports
// config


// utils


const default_service_sign = `${config.extType}:${config.version}`;

class DefaultService {
  start() {
    window.addEventListener("message", (event) => {
      if (event?.data?.receiver !== default_service_sign) return;
      const {
        file, // ArrayBuffer
        fileName,
        url, // direct url
      } = event.data;
      if (fileName) {
        if (file) { // save by ObjectURL to Blob(ArrayBuffer)
          save_file(file, fileName);
        } else if (url) { // save by direct url
          save_file(url, fileName);
        }
      }
    });
  }
}

/* harmony default export */ const default_service = (new DefaultService());

;// CONCATENATED MODULE: ./src/utils/unsafe-window.js


/* harmony default export */ const unsafe_window = ({
  async get(path) {
    const [res] = await inject_script(document, "get-globals.js", { names: [path] });
    return res;
  },
  set(name, value) {
    return inject_script(document, "set-global.js", { name, value });
  },
});

;// CONCATENATED MODULE: ./src/content-script/utils/set-info.js
// local imports
// config


// utils


const setInfo = () => {
  const { info } = config;
  if (info) {
    const { hostname } = window.location;
    const shouldBeSet = info.hostnames.some((item) => {
      const { ends, starts } = item;
      return (
        (starts && ends && hostname.startsWith(starts) && hostname.endsWith(ends)) ||
        (typeof item === "string" && hostname === item)
      );
    });
    if (shouldBeSet) {
      const { name } = info;
      const {
        hash, type, version,
      } = config;
      const data = {
        hash, type, version,
      };
      unsafe_window.set(name, data);
      console.log(`window.${name}:`, data);
    }
  }
};

/* harmony default export */ const set_info = (setInfo);

;// CONCATENATED MODULE: ./src/content-script/index-ext.js
// local imports
// config


// utils






const {
  dist,
  platform,
  project,
} = config;

console.log(`content-script-dev: ${project}-${platform}-${dist}`);

const start = async () => {
  if (!in_iframe()) {
    set_info();
  }

  // start default service anyway
  default_service.start();

  const onContentLoaded = () => {
    const alreadyStarted = check_if_injected();
    if (alreadyStarted) return;
    check_services();
  };
  if (document.readyState !== "loading") {
    onContentLoaded();
  } else {
    document.addEventListener("DOMContentLoaded", () => {
      onContentLoaded();
    }, false);
  }
};

start();

})();

/******/ })()
;