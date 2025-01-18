/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 7:
/***/ ((module) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ 172:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Component: () => (/* binding */ p),
/* harmony export */   Fragment: () => (/* binding */ y),
/* harmony export */   cloneElement: () => (/* binding */ S),
/* harmony export */   createContext: () => (/* binding */ q),
/* harmony export */   createElement: () => (/* binding */ a),
/* harmony export */   createRef: () => (/* binding */ h),
/* harmony export */   h: () => (/* binding */ a),
/* harmony export */   hydrate: () => (/* binding */ O),
/* harmony export */   isValidElement: () => (/* binding */ l),
/* harmony export */   options: () => (/* binding */ n),
/* harmony export */   render: () => (/* binding */ N),
/* harmony export */   toChildArray: () => (/* binding */ w)
/* harmony export */ });
var n,l,u,i,t,o,r={},f=[],e=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(n,l){for(var u in l)n[u]=l[u];return n}function s(n){var l=n.parentNode;l&&l.removeChild(n)}function a(n,l,u){var i,t,o,r=arguments,f={};for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);if(null!=u&&(f.children=u),"function"==typeof n&&null!=n.defaultProps)for(o in n.defaultProps)void 0===f[o]&&(f[o]=n.defaultProps[o]);return v(n,f,i,t,null)}function v(l,u,i,t,o){var r={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:null==o?++n.__v:o};return null!=n.vnode&&n.vnode(r),r}function h(){return{current:null}}function y(n){return n.children}function p(n,l){this.props=n,this.context=l}function d(n,l){if(null==l)return n.__?d(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return"function"==typeof n.type?d(n):null}function _(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return _(n)}}function k(l){(!l.__d&&(l.__d=!0)&&u.push(l)&&!b.__r++||t!==n.debounceRendering)&&((t=n.debounceRendering)||i)(b)}function b(){for(var n;b.__r=u.length;)n=u.sort(function(n,l){return n.__v.__b-l.__v.__b}),u=[],n.some(function(n){var l,u,i,t,o,r;n.__d&&(o=(t=(l=n).__v).__e,(r=l.__P)&&(u=[],(i=c({},t)).__v=t.__v+1,I(r,t,i,l.__n,void 0!==r.ownerSVGElement,null!=t.__h?[o]:null,u,null==o?d(t):o,t.__h),T(u,t),t.__e!=o&&_(t)))})}function m(n,l,u,i,t,o,e,c,s,a){var h,p,_,k,b,m,w,A=i&&i.__k||f,P=A.length;for(u.__k=[],h=0;h<l.length;h++)if(null!=(k=u.__k[h]=null==(k=l[h])||"boolean"==typeof k?null:"string"==typeof k||"number"==typeof k||"bigint"==typeof k?v(null,k,null,null,k):Array.isArray(k)?v(y,{children:k},null,null,null):k.__b>0?v(k.type,k.props,k.key,null,k.__v):k)){if(k.__=u,k.__b=u.__b+1,null===(_=A[h])||_&&k.key==_.key&&k.type===_.type)A[h]=void 0;else for(p=0;p<P;p++){if((_=A[p])&&k.key==_.key&&k.type===_.type){A[p]=void 0;break}_=null}I(n,k,_=_||r,t,o,e,c,s,a),b=k.__e,(p=k.ref)&&_.ref!=p&&(w||(w=[]),_.ref&&w.push(_.ref,null,k),w.push(p,k.__c||b,k)),null!=b?(null==m&&(m=b),"function"==typeof k.type&&null!=k.__k&&k.__k===_.__k?k.__d=s=g(k,s,n):s=x(n,k,_,A,b,s),a||"option"!==u.type?"function"==typeof u.type&&(u.__d=s):n.value=""):s&&_.__e==s&&s.parentNode!=n&&(s=d(_))}for(u.__e=m,h=P;h--;)null!=A[h]&&("function"==typeof u.type&&null!=A[h].__e&&A[h].__e==u.__d&&(u.__d=d(i,h+1)),L(A[h],A[h]));if(w)for(h=0;h<w.length;h++)z(w[h],w[++h],w[++h])}function g(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,l="function"==typeof t.type?g(t,l,u):x(u,t,t,n.__k,t.__e,l));return l}function w(n,l){return l=l||[],null==n||"boolean"==typeof n||(Array.isArray(n)?n.some(function(n){w(n,l)}):l.push(n)),l}function x(n,l,u,i,t,o){var r,f,e;if(void 0!==l.__d)r=l.__d,l.__d=void 0;else if(null==u||t!=o||null==t.parentNode)n:if(null==o||o.parentNode!==n)n.appendChild(t),r=null;else{for(f=o,e=0;(f=f.nextSibling)&&e<i.length;e+=2)if(f==t)break n;n.insertBefore(t,o),r=o}return void 0!==r?r:t.nextSibling}function A(n,l,u,i,t){var o;for(o in u)"children"===o||"key"===o||o in l||C(n,o,null,u[o],i);for(o in l)t&&"function"!=typeof l[o]||"children"===o||"key"===o||"value"===o||"checked"===o||u[o]===l[o]||C(n,o,l[o],u[o],i)}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]=null==u?"":"number"!=typeof u||e.test(l)?u:u+"px"}function C(n,l,u,i,t){var o;n:if("style"===l)if("string"==typeof u)n.style.cssText=u;else{if("string"==typeof i&&(n.style.cssText=i=""),i)for(l in i)u&&l in u||P(n.style,l,"");if(u)for(l in u)i&&u[l]===i[l]||P(n.style,l,u[l])}else if("o"===l[0]&&"n"===l[1])o=l!==(l=l.replace(/Capture$/,"")),l=l.toLowerCase()in n?l.toLowerCase().slice(2):l.slice(2),n.l||(n.l={}),n.l[l+o]=u,u?i||n.addEventListener(l,o?H:$,o):n.removeEventListener(l,o?H:$,o);else if("dangerouslySetInnerHTML"!==l){if(t)l=l.replace(/xlink[H:h]/,"h").replace(/sName$/,"s");else if("href"!==l&&"list"!==l&&"form"!==l&&"tabIndex"!==l&&"download"!==l&&l in n)try{n[l]=null==u?"":u;break n}catch(n){}"function"==typeof u||(null!=u&&(!1!==u||"a"===l[0]&&"r"===l[1])?n.setAttribute(l,u):n.removeAttribute(l))}}function $(l){this.l[l.type+!1](n.event?n.event(l):l)}function H(l){this.l[l.type+!0](n.event?n.event(l):l)}function I(l,u,i,t,o,r,f,e,s){var a,v,h,d,_,k,b,g,w,x,A,P=u.type;if(void 0!==u.constructor)return null;null!=i.__h&&(s=i.__h,e=u.__e=i.__e,u.__h=null,r=[e]),(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(g=u.props,w=(a=P.contextType)&&t[a.__c],x=a?w?w.props.value:a.__:t,i.__c?b=(v=u.__c=i.__c).__=v.__E:("prototype"in P&&P.prototype.render?u.__c=v=new P(g,x):(u.__c=v=new p(g,x),v.constructor=P,v.render=M),w&&w.sub(v),v.props=g,v.state||(v.state={}),v.context=x,v.__n=t,h=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=P.getDerivedStateFromProps&&(v.__s==v.state&&(v.__s=c({},v.__s)),c(v.__s,P.getDerivedStateFromProps(g,v.__s))),d=v.props,_=v.state,h)null==P.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&v.__h.push(v.componentDidMount);else{if(null==P.getDerivedStateFromProps&&g!==d&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(g,x),!v.__e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(g,v.__s,x)||u.__v===i.__v){v.props=g,v.state=v.__s,u.__v!==i.__v&&(v.__d=!1),v.__v=u,u.__e=i.__e,u.__k=i.__k,u.__k.forEach(function(n){n&&(n.__=u)}),v.__h.length&&f.push(v);break n}null!=v.componentWillUpdate&&v.componentWillUpdate(g,v.__s,x),null!=v.componentDidUpdate&&v.__h.push(function(){v.componentDidUpdate(d,_,k)})}v.context=x,v.props=g,v.state=v.__s,(a=n.__r)&&a(u),v.__d=!1,v.__v=u,v.__P=l,a=v.render(v.props,v.state,v.context),v.state=v.__s,null!=v.getChildContext&&(t=c(c({},t),v.getChildContext())),h||null==v.getSnapshotBeforeUpdate||(k=v.getSnapshotBeforeUpdate(d,_)),A=null!=a&&a.type===y&&null==a.key?a.props.children:a,m(l,Array.isArray(A)?A:[A],u,i,t,o,r,f,e,s),v.base=u.__e,u.__h=null,v.__h.length&&f.push(v),b&&(v.__E=v.__=null),v.__e=!1}else null==r&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=j(i.__e,u,i,t,o,r,f,s);(a=n.diffed)&&a(u)}catch(l){u.__v=null,(s||null!=r)&&(u.__e=e,u.__h=!!s,r[r.indexOf(e)]=null),n.__e(l,u,i)}}function T(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u)})}catch(l){n.__e(l,u.__v)}})}function j(n,l,u,i,t,o,e,c){var a,v,h,y,p=u.props,d=l.props,_=l.type,k=0;if("svg"===_&&(t=!0),null!=o)for(;k<o.length;k++)if((a=o[k])&&(a===n||(_?a.localName==_:3==a.nodeType))){n=a,o[k]=null;break}if(null==n){if(null===_)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",_):document.createElement(_,d.is&&d),o=null,c=!1}if(null===_)p===d||c&&n.data===d||(n.data=d);else{if(o=o&&f.slice.call(n.childNodes),v=(p=u.props||r).dangerouslySetInnerHTML,h=d.dangerouslySetInnerHTML,!c){if(null!=o)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(h||v)&&(h&&(v&&h.__html==v.__html||h.__html===n.innerHTML)||(n.innerHTML=h&&h.__html||""))}if(A(n,d,p,t,c),h)l.__k=[];else if(k=l.props.children,m(n,Array.isArray(k)?k:[k],l,u,i,t&&"foreignObject"!==_,o,e,n.firstChild,c),null!=o)for(k=o.length;k--;)null!=o[k]&&s(o[k]);c||("value"in d&&void 0!==(k=d.value)&&(k!==n.value||"progress"===_&&!k)&&C(n,"value",k,p.value,!1),"checked"in d&&void 0!==(k=d.checked)&&k!==n.checked&&C(n,"checked",k,p.checked,!1))}return n}function z(l,u,i){try{"function"==typeof l?l(u):l.current=u}catch(l){n.__e(l,i)}}function L(l,u,i){var t,o,r;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||z(t,null,u)),i||"function"==typeof l.type||(i=null!=(o=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount()}catch(l){n.__e(l,u)}t.base=t.__P=null}if(t=l.__k)for(r=0;r<t.length;r++)t[r]&&L(t[r],u,i);null!=o&&s(o)}function M(n,l,u){return this.constructor(n,u)}function N(l,u,i){var t,o,e;n.__&&n.__(l,u),o=(t="function"==typeof i)?null:i&&i.__k||u.__k,e=[],I(u,l=(!t&&i||u).__k=a(y,null,[l]),o||r,r,void 0!==u.ownerSVGElement,!t&&i?[i]:o?null:u.firstChild?f.slice.call(u.childNodes):null,e,!t&&i?i:o?o.__e:u.firstChild,t),T(e,l)}function O(n,l){N(n,l,O)}function S(n,l,u){var i,t,o,r=arguments,f=c({},n.props);for(o in l)"key"==o?i=l[o]:"ref"==o?t=l[o]:f[o]=l[o];if(arguments.length>3)for(u=[u],o=3;o<arguments.length;o++)u.push(r[o]);return null!=u&&(f.children=u),v(n.type,f,i||n.key,t||n.ref,null)}function q(n,l){var u={__c:l="__cC"+o++,__:n,Consumer:function(n,l){return n.children(l)},Provider:function(n){var u,i;return this.getChildContext||(u=[],(i={})[l]=this,this.getChildContext=function(){return i},this.shouldComponentUpdate=function(n){this.props.value!==n.value&&u.some(k)},this.sub=function(n){u.push(n);var l=n.componentWillUnmount;n.componentWillUnmount=function(){u.splice(u.indexOf(n),1),l&&l.call(n)}}),n.children}};return u.Provider.__=u.Consumer.contextType=u}n={__e:function(n,l){for(var u,i,t;l=l.__;)if((u=l.__c)&&!u.__)try{if((i=u.constructor)&&null!=i.getDerivedStateFromError&&(u.setState(i.getDerivedStateFromError(n)),t=u.__d),null!=u.componentDidCatch&&(u.componentDidCatch(n),t=u.__d),t)return u.__E=u}catch(l){n=l}throw n},__v:0},l=function(n){return null!=n&&void 0===n.constructor},p.prototype.setState=function(n,l){var u;u=null!=this.__s&&this.__s!==this.state?this.__s:this.__s=c({},this.state),"function"==typeof n&&(n=n(c({},u),this.props)),n&&c(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),k(this))},p.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),k(this))},p.prototype.render=y,u=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,b.__r=0,o=0;
//# sourceMappingURL=preact.module.js.map


/***/ }),

/***/ 994:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCallback: () => (/* binding */ A),
/* harmony export */   useContext: () => (/* binding */ F),
/* harmony export */   useDebugValue: () => (/* binding */ T),
/* harmony export */   useEffect: () => (/* binding */ y),
/* harmony export */   useErrorBoundary: () => (/* binding */ q),
/* harmony export */   useImperativeHandle: () => (/* binding */ _),
/* harmony export */   useLayoutEffect: () => (/* binding */ h),
/* harmony export */   useMemo: () => (/* binding */ d),
/* harmony export */   useReducer: () => (/* binding */ p),
/* harmony export */   useRef: () => (/* binding */ s),
/* harmony export */   useState: () => (/* binding */ l)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(172);
var t,u,r,o=0,i=[],c=preact__WEBPACK_IMPORTED_MODULE_0__.options.__b,f=preact__WEBPACK_IMPORTED_MODULE_0__.options.__r,e=preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed,a=preact__WEBPACK_IMPORTED_MODULE_0__.options.__c,v=preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount;function m(t,r){preact__WEBPACK_IMPORTED_MODULE_0__.options.__h&&preact__WEBPACK_IMPORTED_MODULE_0__.options.__h(u,t,o||r),o=0;var i=u.__H||(u.__H={__:[],__h:[]});return t>=i.__.length&&i.__.push({}),i.__[t]}function l(n){return o=1,p(w,n)}function p(n,r,o){var i=m(t++,2);return i.t=n,i.__c||(i.__=[o?o(r):w(void 0,r),function(n){var t=i.t(i.__[0],n);i.__[0]!==t&&(i.__=[t,i.__[1]],i.__c.setState({}))}],i.__c=u),i.__}function y(r,o){var i=m(t++,3);!preact__WEBPACK_IMPORTED_MODULE_0__.options.__s&&k(i.__H,o)&&(i.__=r,i.__H=o,u.__H.__h.push(i))}function h(r,o){var i=m(t++,4);!preact__WEBPACK_IMPORTED_MODULE_0__.options.__s&&k(i.__H,o)&&(i.__=r,i.__H=o,u.__h.push(i))}function s(n){return o=5,d(function(){return{current:n}},[])}function _(n,t,u){o=6,h(function(){"function"==typeof n?n(t()):n&&(n.current=t())},null==u?u:u.concat(n))}function d(n,u){var r=m(t++,7);return k(r.__H,u)&&(r.__=n(),r.__H=u,r.__h=n),r.__}function A(n,t){return o=8,d(function(){return n},t)}function F(n){var r=u.context[n.__c],o=m(t++,9);return o.__c=n,r?(null==o.__&&(o.__=!0,r.sub(u)),r.props.value):n.__}function T(t,u){preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue&&preact__WEBPACK_IMPORTED_MODULE_0__.options.useDebugValue(u?u(t):t)}function q(n){var r=m(t++,10),o=l();return r.__=n,u.componentDidCatch||(u.componentDidCatch=function(n){r.__&&r.__(n),o[1](n)}),[o[0],function(){o[1](void 0)}]}function x(){i.forEach(function(t){if(t.__P)try{t.__H.__h.forEach(g),t.__H.__h.forEach(j),t.__H.__h=[]}catch(u){t.__H.__h=[],preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(u,t.__v)}}),i=[]}preact__WEBPACK_IMPORTED_MODULE_0__.options.__b=function(n){u=null,c&&c(n)},preact__WEBPACK_IMPORTED_MODULE_0__.options.__r=function(n){f&&f(n),t=0;var r=(u=n.__c).__H;r&&(r.__h.forEach(g),r.__h.forEach(j),r.__h=[])},preact__WEBPACK_IMPORTED_MODULE_0__.options.diffed=function(t){e&&e(t);var o=t.__c;o&&o.__H&&o.__H.__h.length&&(1!==i.push(o)&&r===preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame||((r=preact__WEBPACK_IMPORTED_MODULE_0__.options.requestAnimationFrame)||function(n){var t,u=function(){clearTimeout(r),b&&cancelAnimationFrame(t),setTimeout(n)},r=setTimeout(u,100);b&&(t=requestAnimationFrame(u))})(x)),u=void 0},preact__WEBPACK_IMPORTED_MODULE_0__.options.__c=function(t,u){u.some(function(t){try{t.__h.forEach(g),t.__h=t.__h.filter(function(n){return!n.__||j(n)})}catch(r){u.some(function(n){n.__h&&(n.__h=[])}),u=[],preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(r,t.__v)}}),a&&a(t,u)},preact__WEBPACK_IMPORTED_MODULE_0__.options.unmount=function(t){v&&v(t);var u=t.__c;if(u&&u.__H)try{u.__H.__.forEach(g)}catch(t){preact__WEBPACK_IMPORTED_MODULE_0__.options.__e(t,u.__v)}};var b="function"==typeof requestAnimationFrame;function g(n){var t=u;"function"==typeof n.__c&&n.__c(),u=t}function j(n){var t=u;n.__c=n.__(),u=t}function k(n,t){return!n||n.length!==t.length||t.some(function(t,u){return t!==n[u]})}function w(n,t){return"function"==typeof t?t(n):t}
//# sourceMappingURL=hooks.module.js.map


/***/ }),

/***/ 201:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fragment: () => (/* reexport safe */ preact__WEBPACK_IMPORTED_MODULE_0__.Fragment),
/* harmony export */   jsx: () => (/* binding */ o),
/* harmony export */   jsxDEV: () => (/* binding */ o),
/* harmony export */   jsxs: () => (/* binding */ o)
/* harmony export */ });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(172);
function o(_,o,e,n,t){var f={};for(var l in o)"ref"!=l&&(f[l]=o[l]);var s,u,a={type:_,props:f,key:e,ref:o&&o.ref,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:++preact__WEBPACK_IMPORTED_MODULE_0__.options.__v,__source:n,__self:t};if("function"==typeof _&&(s=_.defaultProps))for(u in s)void 0===f[u]&&(f[u]=s[u]);return preact__WEBPACK_IMPORTED_MODULE_0__.options.vnode&&preact__WEBPACK_IMPORTED_MODULE_0__.options.vnode(a),a}
//# sourceMappingURL=jsxRuntime.module.js.map


/***/ }),

/***/ 101:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypedEmitter = __webpack_require__(7).EventEmitter;


/***/ }),

/***/ 901:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BackendConnectionState = void 0;
var BackendConnectionState;
(function (BackendConnectionState) {
    BackendConnectionState["Initializing"] = "Initializing";
    BackendConnectionState["ReadyToConnect"] = "ReadyToConnect";
    BackendConnectionState["Connecting"] = "Connecting";
    BackendConnectionState["Connected"] = "Connected";
    BackendConnectionState["Error"] = "Error";
})(BackendConnectionState = exports.BackendConnectionState || (exports.BackendConnectionState = {}));


/***/ }),

/***/ 109:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.needRequestPermissionsPerSite = exports.shortcutsCanBeEditedOnlyManually = exports.canEditShortcuts = exports.canUseOnlyAppConnection = exports.supportsUnicodeMenus = void 0;
const isSafari = location.origin.startsWith('safari');
const isFirefox = location.origin.startsWith('moz');
exports.supportsUnicodeMenus = !isSafari;
exports.canUseOnlyAppConnection = isSafari;
exports.canEditShortcuts = !isSafari;
exports.shortcutsCanBeEditedOnlyManually = isFirefox;
exports.needRequestPermissionsPerSite = isSafari;


/***/ }),

/***/ 157:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.noop = void 0;
function noop() {
    // intentionally left blank
}
exports.noop = noop;


/***/ }),

/***/ 935:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.App = void 0;
const jsx_runtime_1 = __webpack_require__(201);
const settings_model_1 = __webpack_require__(432);
const header_1 = __webpack_require__(539);
const main_block_1 = __webpack_require__(371);
const App = () => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(header_1.Header, {}), settings_model_1.model.loaded ? (0, jsx_runtime_1.jsx)(main_block_1.MainBlock, {}) : null] }));
};
exports.App = App;


/***/ }),

/***/ 355:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectMode = void 0;
const jsx_runtime_1 = __webpack_require__(201);
const utils_1 = __webpack_require__(144);
const settings_model_1 = __webpack_require__(432);
const ConnectMode = () => {
    const setUseNativeApp = (useNativeApp) => {
        settings_model_1.model.setUseNativeApp(useNativeApp);
    };
    const openKeeWebTab = (e) => {
        e.preventDefault();
        settings_model_1.model.openKeeWebTab();
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: (0, utils_1.res)('optionsConnectionMode') }), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "radio-connection-mode", value: "app", checked: settings_model_1.model.useNativeApp, onChange: () => setUseNativeApp(true) }), ' ', (0, utils_1.res)('optionsConnectionModeApp'), ' ', (0, jsx_runtime_1.jsx)("a", { href: "https://keeweb.info/", target: "_blank", rel: "noreferrer", children: (0, utils_1.res)('optionsConnectionModeAppDownloadLink') }), "."] }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "radio-connection-mode", value: "web", checked: settings_model_1.model.useWebApp, onChange: () => setUseNativeApp(false) }), ' ', (0, utils_1.res)('optionsConnectionModeWeb'), ' ', (0, jsx_runtime_1.jsx)("a", { target: "_blank", rel: "noreferrer", onClick: openKeeWebTab, children: (0, utils_1.res)('optionsConnectionModeWebLink') }), "."] }) })] })] }));
};
exports.ConnectMode = ConnectMode;


/***/ }),

/***/ 619:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectState = void 0;
const jsx_runtime_1 = __webpack_require__(201);
const utils_1 = __webpack_require__(144);
const settings_model_1 = __webpack_require__(432);
const backend_connection_state_1 = __webpack_require__(901);
const features_1 = __webpack_require__(109);
const ConnectState = () => {
    const state = settings_model_1.model.backendConnectionState;
    const connectToKeeWeb = () => {
        settings_model_1.model.connectToKeeWeb();
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [features_1.canUseOnlyAppConnection ? ((0, jsx_runtime_1.jsxs)("p", { children: [(0, utils_1.res)('optionsConnectionModeAppOnly'), ' ', (0, jsx_runtime_1.jsx)("a", { href: "https://keeweb.info/", target: "_blank", rel: "noreferrer", children: (0, utils_1.res)('optionsConnectionModeAppDownloadLink') })] })) : null, (0, jsx_runtime_1.jsxs)("p", { children: [(0, utils_1.res)('optionsConnectionState'), ' ', state === backend_connection_state_1.BackendConnectionState.Error ? ((0, jsx_runtime_1.jsx)("span", { class: "error", children: (0, utils_1.res)('optionsConnectionStateError') })) : null, state === backend_connection_state_1.BackendConnectionState.ReadyToConnect ? ((0, jsx_runtime_1.jsx)("span", { children: (0, utils_1.res)('optionsConnectionStateReadyToConnect') })) : null, state === backend_connection_state_1.BackendConnectionState.Connecting ? ((0, jsx_runtime_1.jsxs)("span", { children: [(0, utils_1.res)('optionsConnectionStateConnecting'), "\u2026"] })) : null, state === backend_connection_state_1.BackendConnectionState.Connected ? ((0, jsx_runtime_1.jsx)("span", { class: "success", children: (0, utils_1.res)('optionsConnectionStateConnected') })) : null] }), state === backend_connection_state_1.BackendConnectionState.ReadyToConnect ||
                state === backend_connection_state_1.BackendConnectionState.Error ? ((0, jsx_runtime_1.jsxs)("div", { children: [settings_model_1.model.backendConnectionError ? ((0, jsx_runtime_1.jsx)("p", { class: "error", children: settings_model_1.model.backendConnectionError })) : null, (0, jsx_runtime_1.jsx)("button", { onClick: connectToKeeWeb, children: (0, utils_1.res)('optionsConnectButton') })] })) : null] }));
};
exports.ConnectState = ConnectState;


/***/ }),

/***/ 5:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionBlock = void 0;
const jsx_runtime_1 = __webpack_require__(201);
const utils_1 = __webpack_require__(144);
const settings_model_1 = __webpack_require__(432);
const connection_web_1 = __webpack_require__(588);
const connect_mode_1 = __webpack_require__(355);
const connect_state_1 = __webpack_require__(619);
const features_1 = __webpack_require__(109);
const ConnectionBlock = () => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { id: "connection", children: (0, utils_1.res)('optionsConnection') }), features_1.canUseOnlyAppConnection ? null : (0, jsx_runtime_1.jsx)(connect_mode_1.ConnectMode, {}), settings_model_1.model.useWebApp ? (0, jsx_runtime_1.jsx)(connection_web_1.ConnectionWeb, {}) : null, (0, jsx_runtime_1.jsx)(connect_state_1.ConnectState, {})] }));
};
exports.ConnectionBlock = ConnectionBlock;


/***/ }),

/***/ 588:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConnectionWeb = void 0;
const jsx_runtime_1 = __webpack_require__(201);
const utils_1 = __webpack_require__(144);
const settings_model_1 = __webpack_require__(432);
const hooks_1 = __webpack_require__(994);
const utils_2 = __webpack_require__(157);
const ConnectionWeb = () => {
    const askKeeWebTabPermission = () => {
        settings_model_1.model.askKeeWebTabPermission().catch(utils_2.noop);
    };
    const [inputKeeWebUrl, setInputKeeWebUrl] = (0, hooks_1.useState)('');
    const [inputKeeWebUrlError, setInputKeeWebUrlError] = (0, hooks_1.useState)('');
    const keeWebUrlChanged = ({ currentTarget }) => {
        setInputKeeWebUrlError('');
        setInputKeeWebUrl(currentTarget.value);
    };
    const changeKeeWebUrl = (e) => {
        e.preventDefault();
        try {
            const url = new URL(inputKeeWebUrl);
            if (url.protocol !== 'https:' && url.hostname !== 'localhost') {
                return setInputKeeWebUrlError((0, utils_1.res)('optionsWebConnectionKeeWebUrlNotHttps'));
            }
            setInputKeeWebUrl('');
            settings_model_1.model.setKeeWebUrl(url.toString());
        }
        catch (e) {
            const msg = e.message;
            setInputKeeWebUrlError(`${(0, utils_1.res)('optionsWebConnectionKeeWebUrlInvalid')}: ${msg}`);
        }
    };
    const cancelChangeKeeWebUrl = (e) => {
        e.preventDefault();
        setInputKeeWebUrl('');
    };
    const resetKeeWebUrl = (e) => {
        e.preventDefault();
        setInputKeeWebUrl('');
        settings_model_1.model.setKeeWebUrl(undefined);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: (0, utils_1.res)('optionsWebConnectionKeeWebUrl') }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: changeKeeWebUrl, children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: inputKeeWebUrl || (settings_model_1.model.keeWebUrlIsSet ? settings_model_1.model.keeWebUrl : ''), placeholder: settings_model_1.model.defaultKeeWebUrl, onInput: keeWebUrlChanged }), inputKeeWebUrl && inputKeeWebUrl !== settings_model_1.model.keeWebUrl ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { type: "submit", children: (0, utils_1.res)('optionsWebConnectionChangeKeeWebUrl') }), (0, jsx_runtime_1.jsx)("button", { class: "secondary", onClick: cancelChangeKeeWebUrl, children: (0, utils_1.res)('optionsCancel') })] })) : settings_model_1.model.keeWebUrlIsSet ? ((0, jsx_runtime_1.jsx)("button", { onClick: resetKeeWebUrl, class: "secondary", children: (0, utils_1.res)('optionsWebConnectionResetKeeWebUrl', 'app.keeweb.info') })) : null] }) }), (0, jsx_runtime_1.jsx)("div", { class: "error top-padding-small", children: inputKeeWebUrlError }), settings_model_1.model.canAccessKeeWebTab === false ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: (0, utils_1.res)('optionsWebConnectionTabPermission') }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", { onClick: askKeeWebTabPermission, children: (0, utils_1.res)('optionsWebConnectionTabPermissionButton') }) }), (0, jsx_runtime_1.jsx)("p", {})] })) : null] }));
};
exports.ConnectionWeb = ConnectionWeb;


/***/ }),

/***/ 561:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Footer = void 0;
const jsx_runtime_1 = __webpack_require__(201);
const utils_1 = __webpack_require__(144);
const Footer = () => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { id: "about", children: (0, utils_1.res)('optionsAbout') }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, utils_1.res)('optionsAboutContact'), ' ', (0, jsx_runtime_1.jsx)("a", { href: "https://github.com/keeweb/keeweb-connect", target: "_blank", rel: "noreferrer", children: "https://github.com/keeweb/keeweb-connect" })] }), (0, jsx_runtime_1.jsx)("p", { children: (0, utils_1.res)('optionsAboutLicense') }), (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("a", { href: "https://preactjs.com/", target: "_blank", rel: "noreferrer", children: "Preact" }), ", fast 3kB React alternative with the same modern API, \u00A9 2015-present Jason Miller"] }), (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("a", { href: "https://nodejs.org/en/", target: "_blank", rel: "noreferrer", children: "Node.js" }), ", JavaScript runtime, \u00A9 Node.js contributors"] }), (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("a", { href: "https://tweetnacl.js.org/", target: "_blank", rel: "noreferrer", children: "TweetNaCl.js" }), ", port of TweetNaCl cryptographic library to JavaScript, public domain"] })] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Copyright \u00A9 ", new Date().getFullYear(), " KeeWeb"] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:", ' '] }), (0, jsx_runtime_1.jsx)("p", { children: "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software." }), (0, jsx_runtime_1.jsx)("p", { children: "THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE." })] }));
};
exports.Footer = Footer;


/***/ }),

/***/ 539:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Header = void 0;
const jsx_runtime_1 = __webpack_require__(201);
const utils_1 = __webpack_require__(144);
const Header = () => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("h1", { id: "top", children: [(0, jsx_runtime_1.jsx)("img", { src: "../icons/icon128.png", alt: "KeeWeb", class: "logo-head" }), "KeeWeb Connect \u2013 ", (0, utils_1.res)('optionsTitle')] }), (0, jsx_runtime_1.jsx)("p", { children: (0, utils_1.res)('optionsIntro') })] }));
};
exports.Header = Header;


/***/ }),

/***/ 371:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MainBlock = void 0;
const jsx_runtime_1 = __webpack_require__(201);
const connection_block_1 = __webpack_require__(5);
const shortcuts_1 = __webpack_require__(851);
const footer_1 = __webpack_require__(561);
const usage_1 = __webpack_require__(115);
const settings_model_1 = __webpack_require__(432);
const backend_connection_state_1 = __webpack_require__(901);
const MainBlock = () => {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(connection_block_1.ConnectionBlock, {}), settings_model_1.model.backendConnectionState === backend_connection_state_1.BackendConnectionState.Connected ? (0, jsx_runtime_1.jsx)(usage_1.Usage, {}) : null, (0, jsx_runtime_1.jsx)(shortcuts_1.Shortcuts, {}), (0, jsx_runtime_1.jsx)(footer_1.Footer, {})] }));
};
exports.MainBlock = MainBlock;


/***/ }),

/***/ 851:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Shortcuts = void 0;
const jsx_runtime_1 = __webpack_require__(201);
const utils_1 = __webpack_require__(144);
const settings_model_1 = __webpack_require__(432);
const features_1 = __webpack_require__(109);
const Shortcuts = () => {
    const openShortcuts = (e) => {
        e.preventDefault();
        chrome.tabs.create({ url: 'chrome://extensions/shortcuts', active: true });
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { id: "shortcuts", children: (0, utils_1.res)('optionsShortcuts') }), (0, jsx_runtime_1.jsx)("p", { children: features_1.canEditShortcuts
                    ? (0, utils_1.res)('optionsShortcutsDescription')
                    : (0, utils_1.res)('optionsShortcutsDescriptionNoChange') }), (0, jsx_runtime_1.jsx)("ul", { children: settings_model_1.model.shortcuts.map((command) => ((0, jsx_runtime_1.jsxs)("li", { children: [command.description, ": ", command.shortcut] }, command.name))) }), features_1.canEditShortcuts ? (features_1.shortcutsCanBeEditedOnlyManually ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: (0, utils_1.res)('optionsShortcutsManual') }), (0, jsx_runtime_1.jsx)("img", { srcset: "../img/shortcuts.png 2x", alt: "button" })] })) : ((0, jsx_runtime_1.jsx)("p", { children: (0, jsx_runtime_1.jsx)("a", { target: "_blank", rel: "noreferrer", onClick: openShortcuts, children: (0, utils_1.res)('optionsShortcutsLink') }) }))) : null] }));
};
exports.Shortcuts = Shortcuts;


/***/ }),

/***/ 115:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Usage = void 0;
const jsx_runtime_1 = __webpack_require__(201);
const utils_1 = __webpack_require__(144);
const features_1 = __webpack_require__(109);
const settings_model_1 = __webpack_require__(432);
const Usage = () => {
    const defaultShortcut = settings_model_1.model.shortcuts.find((cmd) => cmd.name === 'submit-auto')?.shortcut;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { id: "usage", children: (0, utils_1.res)('optionsUsage') }), (0, jsx_runtime_1.jsx)("p", { children: (0, utils_1.res)('optionsUsageIntro') }), (0, jsx_runtime_1.jsx)("p", { children: (0, utils_1.res)('optionsUsageButton') }), (0, jsx_runtime_1.jsx)("img", { srcset: "../img/button.png 2x", alt: "button" }), (0, jsx_runtime_1.jsx)("p", { children: features_1.canEditShortcuts
                    ? (0, utils_1.res)('optionsUsageShortcut')
                    : (0, utils_1.res)('optionsUsageShortcutNoChange', defaultShortcut || '') }), features_1.needRequestPermissionsPerSite ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: (0, utils_1.res)('optionsUsagePermissionsPerSite') }), (0, jsx_runtime_1.jsx)("img", { srcset: "../img/permissions.png 2x", alt: "button" })] })) : null, (0, jsx_runtime_1.jsx)("p", { children: (0, utils_1.res)('optionsUsageMenu') }), (0, jsx_runtime_1.jsx)("img", { srcset: "../img/menu.png 2x", alt: "button" })] }));
};
exports.Usage = Usage;


/***/ }),

/***/ 432:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.model = void 0;
const tiny_typed_emitter_1 = __webpack_require__(101);
const backend_connection_state_1 = __webpack_require__(901);
const utils_1 = __webpack_require__(157);
class SettingsModel extends tiny_typed_emitter_1.TypedEmitter {
    constructor() {
        super(...arguments);
        this.defaultKeeWebUrl = 'https://app.keeweb.info/';
        this._loaded = false;
        this._backendConnectionState = backend_connection_state_1.BackendConnectionState.Initializing;
    }
    async init() {
        await this.loadStorageConfig();
        await this.checkPermissions();
        await this.connectToBackgroundPage();
        await this.getShortcuts();
        this.initComplete();
    }
    loadStorageConfig() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['useNativeApp', 'keeWebUrl'], (result) => {
                this._useNativeApp = (result.useNativeApp ?? true);
                this._keeWebUrl = result.keeWebUrl;
                resolve();
            });
        });
    }
    checkPermissions() {
        return new Promise((resolve) => {
            chrome.permissions.contains({
                permissions: ['tabs'],
                origins: [this.keeWebUrl]
            }, (canAccessKeeWebTab) => {
                this._canAccessKeeWebTab = canAccessKeeWebTab;
                resolve();
            });
        });
    }
    connectToBackgroundPage() {
        return new Promise((resolve) => {
            this._backgroundPagePort = chrome.runtime.connect({ name: 'options' });
            this._backgroundPagePort.onMessage.addListener((message) => this.handleMessageFromBackgroundPage(message));
            resolve();
        });
    }
    getShortcuts() {
        return new Promise((resolve) => {
            chrome.commands.getAll((commands) => {
                if (Array.isArray(commands)) {
                    this._chromeCommands = commands;
                }
                else if (chrome.runtime.id.startsWith('net.antelle.keeweb-connect.extension')) {
                    // Safari returns an empty object {} instead of commands. Why?..
                    const manifestCommands = chrome.runtime.getManifest().commands || {};
                    this._chromeCommands = Object.entries(manifestCommands).map(([name, cmd]) => {
                        let shortcut = cmd.suggested_key?.mac ?? cmd.suggested_key?.default;
                        if (shortcut) {
                            shortcut = shortcut
                                .replace(/Ctrl|Command/g, '⌘')
                                .replace(/Alt/g, '⌥')
                                .replace(/Shift/g, '⇧')
                                .replace(/\+/g, '');
                        }
                        return {
                            name,
                            shortcut,
                            description: cmd.description
                        };
                    });
                }
                resolve();
            });
        });
    }
    initComplete() {
        this._loaded = true;
        this.emit('change');
    }
    get loaded() {
        return this._loaded;
    }
    get useNativeApp() {
        return this._useNativeApp;
    }
    setUseNativeApp(useNativeApp) {
        this._useNativeApp = useNativeApp;
        chrome.storage.local.set({ useNativeApp }, () => this.emit('change'));
    }
    get useWebApp() {
        return !this._useNativeApp;
    }
    get keeWebUrl() {
        return this._keeWebUrl || this.defaultKeeWebUrl;
    }
    setKeeWebUrl(keeWebUrl) {
        if (keeWebUrl === this.defaultKeeWebUrl) {
            keeWebUrl = undefined;
        }
        this._keeWebUrl = keeWebUrl;
        this._canAccessKeeWebTab = undefined;
        (async () => {
            await new Promise((resolve) => {
                if (keeWebUrl) {
                    chrome.storage.local.set({ keeWebUrl }, () => resolve());
                }
                else {
                    chrome.storage.local.remove(['keeWebUrl'], () => resolve());
                }
            });
            this.emit('change');
            await this.checkPermissions();
            this.emit('change');
        })().catch(utils_1.noop);
    }
    get keeWebUrlIsSet() {
        return !!this._keeWebUrl;
    }
    get canAccessKeeWebTab() {
        return this._canAccessKeeWebTab;
    }
    askKeeWebTabPermission() {
        return new Promise((resolve) => {
            chrome.permissions.request({
                permissions: ['tabs'],
                origins: [this.keeWebUrl]
            }, (granted) => {
                if (granted) {
                    this._canAccessKeeWebTab = true;
                    this.emit('change');
                }
                resolve(granted);
            });
        });
    }
    get shortcuts() {
        return (this._chromeCommands || []).filter((cmd) => cmd.shortcut);
    }
    handleMessageFromBackgroundPage(message) {
        if (message.backendConnectionState) {
            this._backendConnectionState = message.backendConnectionState;
            this._backendConnectionError = message.backendConnectionError;
            this.emit('change');
        }
    }
    get backendConnectionState() {
        return this._backendConnectionState;
    }
    get backendConnectionError() {
        return this._backendConnectionError;
    }
    connectToKeeWeb() {
        chrome.tabs.getCurrent((tab) => {
            if (tab?.id) {
                const message = {
                    action: 'connect-to-keeweb',
                    activeTabId: tab.id
                };
                this._backgroundPagePort?.postMessage(message);
            }
        });
    }
    openKeeWebTab() {
        const message = {
            action: 'open-tab',
            url: this.keeWebUrl
        };
        this._backgroundPagePort?.postMessage(message);
    }
}
const model = new SettingsModel();
exports.model = model;


/***/ }),

/***/ 144:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.res = void 0;
function res(name, ...substitutions) {
    return chrome.i18n.getMessage(name, substitutions.length ? substitutions : undefined) || name;
}
exports.res = res;


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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const jsx_runtime_1 = __webpack_require__(201);
const preact_1 = __webpack_require__(172);
const utils_1 = __webpack_require__(144);
const settings_model_1 = __webpack_require__(432);
const app_1 = __webpack_require__(935);
const utils_2 = __webpack_require__(157);
document.title = `KeeWeb Connect - ${(0, utils_1.res)('optionsTitle')}`;
settings_model_1.model.on('change', renderApp);
settings_model_1.model.init().catch(utils_2.noop);
renderApp();
function renderApp() {
    (0, preact_1.render)((0, jsx_runtime_1.jsx)(app_1.App, {}), document.body);
}

})();

/******/ })()
;