import { R as React, j as jsx, a as jsxs, r as reactExports, b as ReactDOM, Z, c as classNames, D, i as i18n, L, u as up, h as ho, d as he, y as yh, z as zn, g as getValueWithPlaceholder, F, $ as $h, e as getFrontendServerUrl, f as useLingui, m as mh, k as LoginUiType, l as calculateTotp, n as DEFAULT_TOTP_PERIOD, o as DEFAULT_TOTP_DIGITS, p as DEFAULT_TOTP_ALGORITHM, q as getFrontendServerHost, T as Trans, s as be, I as Ih, S as Sh, _ as _h, t as initSentry, v as initUiLocale, w as I18nProvider, E as ExtDebugVisibleContextProvider, x as lh } from "./ExtDebugVisibleContext-6460380f.js";
import { f as filterLogins, a as addAchievement, u as useUnlock, b as useCopyToClipboard, c as copyToClipboardWithClear, g as getUnprotectedValueForContentLogin, d as debounce } from "./useUnlock-23c9a9eb.js";
import { d as debugConsole, V as VaultType, t as trackError, A as AuditlogEventType, a as Achievement, s as sendMessage, c as messageError, b as browser, m as makeMessageListener } from "./message-939596d6.js";
import { S as SvgHeyloginIcon, u as useCloseOnEscape } from "./useCloseOnEscape-1abcbbd4.js";
import { i as isEmptyValue } from "./isEmptyValue-338a5af1.js";
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class Semaphore {
  constructor(_maxConcurrency) {
    this._maxConcurrency = _maxConcurrency;
    this._queue = [];
    if (_maxConcurrency <= 0) {
      throw new Error("semaphore must be initialized to a positive value");
    }
    this._value = _maxConcurrency;
  }
  acquire() {
    const locked = this.isLocked();
    const ticket = new Promise((r) => this._queue.push(r));
    if (!locked)
      this._dispatch();
    return ticket;
  }
  runExclusive(callback) {
    return __awaiter(this, void 0, void 0, function* () {
      const [value, release] = yield this.acquire();
      try {
        return yield callback(value);
      } finally {
        release();
      }
    });
  }
  isLocked() {
    return this._value <= 0;
  }
  release() {
    if (this._maxConcurrency > 1) {
      throw new Error("this method is unavailabel on semaphores with concurrency > 1; use the scoped release returned by acquire instead");
    }
    if (this._currentReleaser) {
      this._currentReleaser();
      this._currentReleaser = void 0;
    }
  }
  _dispatch() {
    const nextConsumer = this._queue.shift();
    if (!nextConsumer)
      return;
    let released = false;
    this._currentReleaser = () => {
      if (released)
        return;
      released = true;
      this._value++;
      this._dispatch();
    };
    nextConsumer([this._value--, this._currentReleaser]);
  }
}
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class Mutex {
  constructor() {
    this._semaphore = new Semaphore(1);
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
  release() {
    this._semaphore.release();
  }
}
const PUBLISH = 0;
const SUBSCRIBE = 1;
const RESET = 2;
const VALUE = 4;
function compose(a, b) {
  return (arg) => a(b(arg));
}
function thrush(arg, proc) {
  return proc(arg);
}
function curry2to1(proc, arg1) {
  return (arg2) => proc(arg1, arg2);
}
function curry1to0(proc, arg) {
  return () => proc(arg);
}
function tap(arg, proc) {
  proc(arg);
  return arg;
}
function tup(...args) {
  return args;
}
function call(proc) {
  proc();
}
function always(value) {
  return () => value;
}
function joinProc(...procs) {
  return () => {
    procs.map(call);
  };
}
function isDefined(arg) {
  return arg !== void 0;
}
function noop() {
}
function subscribe(emitter, subscription) {
  return emitter(SUBSCRIBE, subscription);
}
function publish(publisher, value) {
  publisher(PUBLISH, value);
}
function reset(emitter) {
  emitter(RESET);
}
function getValue(depot) {
  return depot(VALUE);
}
function connect(emitter, publisher) {
  return subscribe(emitter, curry2to1(publisher, PUBLISH));
}
function handleNext(emitter, subscription) {
  const unsub = emitter(SUBSCRIBE, (value) => {
    unsub();
    subscription(value);
  });
  return unsub;
}
function stream() {
  const subscriptions = [];
  return (action, arg) => {
    switch (action) {
      case RESET:
        subscriptions.splice(0, subscriptions.length);
        return;
      case SUBSCRIBE:
        subscriptions.push(arg);
        return () => {
          const indexOf = subscriptions.indexOf(arg);
          if (indexOf > -1) {
            subscriptions.splice(indexOf, 1);
          }
        };
      case PUBLISH:
        subscriptions.slice().forEach((subscription) => {
          subscription(arg);
        });
        return;
      default:
        throw new Error(`unrecognized action ${action}`);
    }
  };
}
function statefulStream(initial) {
  let value = initial;
  const innerSubject = stream();
  return (action, arg) => {
    switch (action) {
      case SUBSCRIBE:
        const subscription = arg;
        subscription(value);
        break;
      case PUBLISH:
        value = arg;
        break;
      case VALUE:
        return value;
    }
    return innerSubject(action, arg);
  };
}
function eventHandler(emitter) {
  let unsub;
  let currentSubscription;
  const cleanup = () => unsub && unsub();
  return function(action, subscription) {
    switch (action) {
      case SUBSCRIBE:
        if (subscription) {
          if (currentSubscription === subscription) {
            return;
          }
          cleanup();
          currentSubscription = subscription;
          unsub = subscribe(emitter, subscription);
          return unsub;
        } else {
          cleanup();
          return noop;
        }
      case RESET:
        cleanup();
        currentSubscription = null;
        return;
      default:
        throw new Error(`unrecognized action ${action}`);
    }
  };
}
function streamFromEmitter(emitter) {
  return tap(stream(), (stream2) => connect(emitter, stream2));
}
function statefulStreamFromEmitter(emitter, initial) {
  return tap(statefulStream(initial), (stream2) => connect(emitter, stream2));
}
function combineOperators(...operators) {
  return (subscriber) => {
    return operators.reduceRight(thrush, subscriber);
  };
}
function pipe(source, ...operators) {
  const project = combineOperators(...operators);
  return (action, subscription) => {
    switch (action) {
      case SUBSCRIBE:
        return subscribe(source, project(subscription));
      case RESET:
        reset(source);
        return;
    }
  };
}
function defaultComparator(previous, next) {
  return previous === next;
}
function distinctUntilChanged(comparator = defaultComparator) {
  let current;
  return (done) => (next) => {
    if (!comparator(current, next)) {
      current = next;
      done(next);
    }
  };
}
function filter(predicate) {
  return (done) => (value) => {
    predicate(value) && done(value);
  };
}
function map(project) {
  return (done) => compose(done, project);
}
function mapTo(value) {
  return (done) => () => done(value);
}
function scan(scanner, initial) {
  return (done) => (value) => done(initial = scanner(initial, value));
}
function skip(times) {
  return (done) => (value) => {
    times > 0 ? times-- : done(value);
  };
}
function throttleTime(interval) {
  let currentValue = null;
  let timeout;
  return (done) => (value) => {
    currentValue = value;
    if (timeout) {
      return;
    }
    timeout = setTimeout(() => {
      timeout = void 0;
      done(currentValue);
    }, interval);
  };
}
function debounceTime(interval) {
  let currentValue;
  let timeout;
  return (done) => (value) => {
    currentValue = value;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      done(currentValue);
    }, interval);
  };
}
function withLatestFrom(...sources) {
  const values = new Array(sources.length);
  let called = 0;
  let pendingCall = null;
  const allCalled = Math.pow(2, sources.length) - 1;
  sources.forEach((source, index) => {
    const bit = Math.pow(2, index);
    subscribe(source, (value) => {
      const prevCalled = called;
      called = called | bit;
      values[index] = value;
      if (prevCalled !== allCalled && called === allCalled && pendingCall) {
        pendingCall();
        pendingCall = null;
      }
    });
  });
  return (done) => (value) => {
    const call2 = () => done([value].concat(values));
    if (called === allCalled) {
      call2();
    } else {
      pendingCall = call2;
    }
  };
}
function merge(...sources) {
  return function(action, subscription) {
    switch (action) {
      case SUBSCRIBE:
        return joinProc(...sources.map((source) => subscribe(source, subscription)));
      case RESET:
        return;
      default:
        throw new Error(`unrecognized action ${action}`);
    }
  };
}
function duc(source, comparator = defaultComparator) {
  return pipe(source, distinctUntilChanged(comparator));
}
function combineLatest(...emitters) {
  const innerSubject = stream();
  const values = new Array(emitters.length);
  let called = 0;
  const allCalled = Math.pow(2, emitters.length) - 1;
  emitters.forEach((source, index) => {
    const bit = Math.pow(2, index);
    subscribe(source, (value) => {
      values[index] = value;
      called = called | bit;
      if (called === allCalled) {
        publish(innerSubject, values);
      }
    });
  });
  return function(action, subscription) {
    switch (action) {
      case SUBSCRIBE:
        if (called === allCalled) {
          subscription(values);
        }
        return subscribe(innerSubject, subscription);
      case RESET:
        return reset(innerSubject);
      default:
        throw new Error(`unrecognized action ${action}`);
    }
  };
}
function system(constructor, dependencies = [], { singleton } = { singleton: true }) {
  return {
    id: id(),
    constructor,
    dependencies,
    singleton
  };
}
const id = () => Symbol();
function init(systemSpec) {
  const singletons = /* @__PURE__ */ new Map();
  const _init = ({ id: id2, constructor, dependencies, singleton }) => {
    if (singleton && singletons.has(id2)) {
      return singletons.get(id2);
    }
    const system2 = constructor(dependencies.map((e) => _init(e)));
    if (singleton) {
      singletons.set(id2, system2);
    }
    return system2;
  };
  return _init(systemSpec);
}
function omit(keys, obj) {
  const result = {};
  const index = {};
  let idx = 0;
  const len = keys.length;
  while (idx < len) {
    index[keys[idx]] = 1;
    idx += 1;
  }
  for (const prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }
  return result;
}
const useIsomorphicLayoutEffect$1 = typeof document !== "undefined" ? React.useLayoutEffect : React.useEffect;
function systemToComponent(systemSpec, map2, Root) {
  const requiredPropNames = Object.keys(map2.required || {});
  const optionalPropNames = Object.keys(map2.optional || {});
  const methodNames = Object.keys(map2.methods || {});
  const eventNames = Object.keys(map2.events || {});
  const Context = React.createContext({});
  function applyPropsToSystem(system2, props) {
    if (system2["propsReady"]) {
      publish(system2["propsReady"], false);
    }
    for (const requiredPropName of requiredPropNames) {
      const stream2 = system2[map2.required[requiredPropName]];
      publish(stream2, props[requiredPropName]);
    }
    for (const optionalPropName of optionalPropNames) {
      if (optionalPropName in props) {
        const stream2 = system2[map2.optional[optionalPropName]];
        publish(stream2, props[optionalPropName]);
      }
    }
    if (system2["propsReady"]) {
      publish(system2["propsReady"], true);
    }
  }
  function buildMethods(system2) {
    return methodNames.reduce((acc, methodName) => {
      acc[methodName] = (value) => {
        const stream2 = system2[map2.methods[methodName]];
        publish(stream2, value);
      };
      return acc;
    }, {});
  }
  function buildEventHandlers(system2) {
    return eventNames.reduce((handlers, eventName) => {
      handlers[eventName] = eventHandler(system2[map2.events[eventName]]);
      return handlers;
    }, {});
  }
  const Component = React.forwardRef((propsWithChildren, ref) => {
    const { children, ...props } = propsWithChildren;
    const [system2] = React.useState(() => {
      return tap(init(systemSpec), (system22) => applyPropsToSystem(system22, props));
    });
    const [handlers] = React.useState(curry1to0(buildEventHandlers, system2));
    useIsomorphicLayoutEffect$1(() => {
      for (const eventName of eventNames) {
        if (eventName in props) {
          subscribe(handlers[eventName], props[eventName]);
        }
      }
      return () => {
        Object.values(handlers).map(reset);
      };
    }, [props, handlers, system2]);
    useIsomorphicLayoutEffect$1(() => {
      applyPropsToSystem(system2, props);
    });
    React.useImperativeHandle(ref, always(buildMethods(system2)));
    const RootComponent = Root;
    return /* @__PURE__ */ jsx(Context.Provider, { value: system2, children: Root ? /* @__PURE__ */ jsx(RootComponent, { ...omit([...requiredPropNames, ...optionalPropNames, ...eventNames], props), children }) : children });
  });
  const usePublisher2 = (key) => {
    return React.useCallback(curry2to1(publish, React.useContext(Context)[key]), [key]);
  };
  const useEmitterValue18 = (key) => {
    const system2 = React.useContext(Context);
    const source = system2[key];
    const cb = React.useCallback(
      (c) => {
        return subscribe(source, c);
      },
      [source]
    );
    return React.useSyncExternalStore(
      cb,
      () => getValue(source),
      () => getValue(source)
    );
  };
  const useEmitterValueLegacy = (key) => {
    const system2 = React.useContext(Context);
    const source = system2[key];
    const [value, setValue] = React.useState(curry1to0(getValue, source));
    useIsomorphicLayoutEffect$1(
      () => subscribe(source, (next) => {
        if (next !== value) {
          setValue(always(next));
        }
      }),
      [source, value]
    );
    return value;
  };
  const useEmitterValue2 = React.version.startsWith("18") ? useEmitterValue18 : useEmitterValueLegacy;
  const useEmitter2 = (key, callback) => {
    const context = React.useContext(Context);
    const source = context[key];
    useIsomorphicLayoutEffect$1(() => subscribe(source, callback), [callback, source]);
  };
  return {
    Component,
    usePublisher: usePublisher2,
    useEmitterValue: useEmitterValue2,
    useEmitter: useEmitter2
  };
}
const useIsomorphicLayoutEffect = typeof document !== "undefined" ? React.useLayoutEffect : React.useEffect;
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["DEBUG"] = 0] = "DEBUG";
  LogLevel2[LogLevel2["INFO"] = 1] = "INFO";
  LogLevel2[LogLevel2["WARN"] = 2] = "WARN";
  LogLevel2[LogLevel2["ERROR"] = 3] = "ERROR";
  return LogLevel2;
})(LogLevel || {});
const CONSOLE_METHOD_MAP = {
  [
    0
    /* DEBUG */
  ]: "debug",
  [
    1
    /* INFO */
  ]: "log",
  [
    2
    /* WARN */
  ]: "warn",
  [
    3
    /* ERROR */
  ]: "error"
};
const getGlobalThis = () => typeof globalThis === "undefined" ? window : globalThis;
const loggerSystem = system(
  () => {
    const logLevel = statefulStream(
      3
      /* ERROR */
    );
    const log = statefulStream((label, message, level = 1) => {
      var _a;
      const currentLevel = (_a = getGlobalThis()["VIRTUOSO_LOG_LEVEL"]) != null ? _a : getValue(logLevel);
      if (level >= currentLevel) {
        console[CONSOLE_METHOD_MAP[level]](
          "%creact-virtuoso: %c%s %o",
          "color: #0253b3; font-weight: bold",
          "color: initial",
          label,
          message
        );
      }
    });
    return {
      log,
      logLevel
    };
  },
  [],
  { singleton: true }
);
function useSizeWithElRef(callback, enabled, skipAnimationFrame) {
  const ref = React.useRef(null);
  let callbackRef = (_el) => {
  };
  if (typeof ResizeObserver !== "undefined") {
    const observer = React.useMemo(() => {
      return new ResizeObserver((entries) => {
        const code = () => {
          const element = entries[0].target;
          if (element.offsetParent !== null) {
            callback(element);
          }
        };
        skipAnimationFrame ? code() : requestAnimationFrame(code);
      });
    }, [callback]);
    callbackRef = (elRef) => {
      if (elRef && enabled) {
        observer.observe(elRef);
        ref.current = elRef;
      } else {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
        ref.current = null;
      }
    };
  }
  return { ref, callbackRef };
}
function useSize(callback, enabled, skipAnimationFrame) {
  return useSizeWithElRef(callback, enabled, skipAnimationFrame).callbackRef;
}
function useChangedListContentsSizes(callback, itemSize, enabled, scrollContainerStateCallback, log, gap, customScrollParent, horizontalDirection, skipAnimationFrame) {
  const memoedCallback = React.useCallback(
    (el) => {
      const ranges = getChangedChildSizes(el.children, itemSize, horizontalDirection ? "offsetWidth" : "offsetHeight", log);
      let scrollableElement = el.parentElement;
      while (!scrollableElement.dataset["virtuosoScroller"]) {
        scrollableElement = scrollableElement.parentElement;
      }
      const windowScrolling = scrollableElement.lastElementChild.dataset["viewportType"] === "window";
      const scrollTop = customScrollParent ? horizontalDirection ? customScrollParent.scrollLeft : customScrollParent.scrollTop : windowScrolling ? horizontalDirection ? window.pageXOffset || document.documentElement.scrollLeft : window.pageYOffset || document.documentElement.scrollTop : horizontalDirection ? scrollableElement.scrollLeft : scrollableElement.scrollTop;
      const scrollHeight = customScrollParent ? horizontalDirection ? customScrollParent.scrollWidth : customScrollParent.scrollHeight : windowScrolling ? horizontalDirection ? document.documentElement.scrollWidth : document.documentElement.scrollHeight : horizontalDirection ? scrollableElement.scrollWidth : scrollableElement.scrollHeight;
      const viewportHeight = customScrollParent ? horizontalDirection ? customScrollParent.offsetWidth : customScrollParent.offsetHeight : windowScrolling ? horizontalDirection ? window.innerWidth : window.innerHeight : horizontalDirection ? scrollableElement.offsetWidth : scrollableElement.offsetHeight;
      scrollContainerStateCallback({
        scrollTop: Math.max(scrollTop, 0),
        scrollHeight,
        viewportHeight
      });
      gap == null ? void 0 : gap(
        horizontalDirection ? resolveGapValue$1("column-gap", getComputedStyle(el).columnGap, log) : resolveGapValue$1("row-gap", getComputedStyle(el).rowGap, log)
      );
      if (ranges !== null) {
        callback(ranges);
      }
    },
    [callback, itemSize, log, gap, customScrollParent, scrollContainerStateCallback]
  );
  return useSizeWithElRef(memoedCallback, enabled, skipAnimationFrame);
}
function getChangedChildSizes(children, itemSize, field, log) {
  const length = children.length;
  if (length === 0) {
    return null;
  }
  const results = [];
  for (let i = 0; i < length; i++) {
    const child = children.item(i);
    if (!child || child.dataset.index === void 0) {
      continue;
    }
    const index = parseInt(child.dataset.index);
    const knownSize = parseFloat(child.dataset.knownSize);
    const size = itemSize(child, field);
    if (size === 0) {
      log("Zero-sized element, this should not happen", { child }, LogLevel.ERROR);
    }
    if (size === knownSize) {
      continue;
    }
    const lastResult = results[results.length - 1];
    if (results.length === 0 || lastResult.size !== size || lastResult.endIndex !== index - 1) {
      results.push({ startIndex: index, endIndex: index, size });
    } else {
      results[results.length - 1].endIndex++;
    }
  }
  return results;
}
function resolveGapValue$1(property, value, log) {
  if (value !== "normal" && !(value == null ? void 0 : value.endsWith("px"))) {
    log(`${property} was not resolved to pixel value correctly`, value, LogLevel.WARN);
  }
  if (value === "normal") {
    return 0;
  }
  return parseInt(value != null ? value : "0", 10);
}
function correctItemSize(el, dimension) {
  return Math.round(el.getBoundingClientRect()[dimension]);
}
function approximatelyEqual(num1, num2) {
  return Math.abs(num1 - num2) < 1.01;
}
function useScrollTop(scrollContainerStateCallback, smoothScrollTargetReached, scrollerElement, scrollerRefCallback = noop, customScrollParent, horizontalDirection) {
  const scrollerRef = React.useRef(null);
  const scrollTopTarget = React.useRef(null);
  const timeoutRef = React.useRef(null);
  const handler = React.useCallback(
    (ev) => {
      const el = ev.target;
      const windowScroll = el === window || el === document;
      const scrollTop = horizontalDirection ? windowScroll ? window.pageXOffset || document.documentElement.scrollLeft : el.scrollLeft : windowScroll ? window.pageYOffset || document.documentElement.scrollTop : el.scrollTop;
      const scrollHeight = horizontalDirection ? windowScroll ? document.documentElement.scrollWidth : el.scrollWidth : windowScroll ? document.documentElement.scrollHeight : el.scrollHeight;
      const viewportHeight = horizontalDirection ? windowScroll ? window.innerWidth : el.offsetWidth : windowScroll ? window.innerHeight : el.offsetHeight;
      const call2 = () => {
        scrollContainerStateCallback({
          scrollTop: Math.max(scrollTop, 0),
          scrollHeight,
          viewportHeight
        });
      };
      if (ev.suppressFlushSync) {
        call2();
      } else {
        ReactDOM.flushSync(call2);
      }
      if (scrollTopTarget.current !== null) {
        if (scrollTop === scrollTopTarget.current || scrollTop <= 0 || scrollTop === scrollHeight - viewportHeight) {
          scrollTopTarget.current = null;
          smoothScrollTargetReached(true);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        }
      }
    },
    [scrollContainerStateCallback, smoothScrollTargetReached]
  );
  React.useEffect(() => {
    const localRef = customScrollParent ? customScrollParent : scrollerRef.current;
    scrollerRefCallback(customScrollParent ? customScrollParent : scrollerRef.current);
    handler({ target: localRef, suppressFlushSync: true });
    localRef.addEventListener("scroll", handler, { passive: true });
    return () => {
      scrollerRefCallback(null);
      localRef.removeEventListener("scroll", handler);
    };
  }, [scrollerRef, handler, scrollerElement, scrollerRefCallback, customScrollParent]);
  function scrollToCallback(location) {
    const scrollerElement2 = scrollerRef.current;
    if (!scrollerElement2 || (horizontalDirection ? "offsetWidth" in scrollerElement2 && scrollerElement2.offsetWidth === 0 : "offsetHeight" in scrollerElement2 && scrollerElement2.offsetHeight === 0)) {
      return;
    }
    const isSmooth = location.behavior === "smooth";
    let offsetHeight;
    let scrollHeight;
    let scrollTop;
    if (scrollerElement2 === window) {
      scrollHeight = Math.max(
        correctItemSize(document.documentElement, horizontalDirection ? "width" : "height"),
        horizontalDirection ? document.documentElement.scrollWidth : document.documentElement.scrollHeight
      );
      offsetHeight = horizontalDirection ? window.innerWidth : window.innerHeight;
      scrollTop = horizontalDirection ? document.documentElement.scrollLeft : document.documentElement.scrollTop;
    } else {
      scrollHeight = scrollerElement2[horizontalDirection ? "scrollWidth" : "scrollHeight"];
      offsetHeight = correctItemSize(scrollerElement2, horizontalDirection ? "width" : "height");
      scrollTop = scrollerElement2[horizontalDirection ? "scrollLeft" : "scrollTop"];
    }
    const maxScrollTop = scrollHeight - offsetHeight;
    location.top = Math.ceil(Math.max(Math.min(maxScrollTop, location.top), 0));
    if (approximatelyEqual(offsetHeight, scrollHeight) || location.top === scrollTop) {
      scrollContainerStateCallback({ scrollTop, scrollHeight, viewportHeight: offsetHeight });
      if (isSmooth) {
        smoothScrollTargetReached(true);
      }
      return;
    }
    if (isSmooth) {
      scrollTopTarget.current = location.top;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        scrollTopTarget.current = null;
        smoothScrollTargetReached(true);
      }, 1e3);
    } else {
      scrollTopTarget.current = null;
    }
    if (horizontalDirection) {
      location = { left: location.top, behavior: location.behavior };
    }
    scrollerElement2.scrollTo(location);
  }
  function scrollByCallback(location) {
    if (horizontalDirection) {
      location = { left: location.top, behavior: location.behavior };
    }
    scrollerRef.current.scrollBy(location);
  }
  return { scrollerRef, scrollByCallback, scrollToCallback };
}
const domIOSystem = system(
  () => {
    const scrollContainerState = stream();
    const scrollTop = stream();
    const deviation = statefulStream(0);
    const smoothScrollTargetReached = stream();
    const statefulScrollTop = statefulStream(0);
    const viewportHeight = stream();
    const scrollHeight = stream();
    const headerHeight = statefulStream(0);
    const fixedHeaderHeight = statefulStream(0);
    const fixedFooterHeight = statefulStream(0);
    const footerHeight = statefulStream(0);
    const scrollTo = stream();
    const scrollBy = stream();
    const scrollingInProgress = statefulStream(false);
    const horizontalDirection = statefulStream(false);
    const skipAnimationFrameInResizeObserver = statefulStream(false);
    connect(
      pipe(
        scrollContainerState,
        map(({ scrollTop: scrollTop2 }) => scrollTop2)
      ),
      scrollTop
    );
    connect(
      pipe(
        scrollContainerState,
        map(({ scrollHeight: scrollHeight2 }) => scrollHeight2)
      ),
      scrollHeight
    );
    connect(scrollTop, statefulScrollTop);
    return {
      // input
      scrollContainerState,
      scrollTop,
      viewportHeight,
      headerHeight,
      fixedHeaderHeight,
      fixedFooterHeight,
      footerHeight,
      scrollHeight,
      smoothScrollTargetReached,
      horizontalDirection,
      skipAnimationFrameInResizeObserver,
      // signals
      scrollTo,
      scrollBy,
      // state
      statefulScrollTop,
      deviation,
      scrollingInProgress
    };
  },
  [],
  { singleton: true }
);
const NIL_NODE = { lvl: 0 };
function newAANode(k, v, lvl, l = NIL_NODE, r = NIL_NODE) {
  return { k, v, lvl, l, r };
}
function empty(node) {
  return node === NIL_NODE;
}
function newTree() {
  return NIL_NODE;
}
function remove(node, key) {
  if (empty(node))
    return NIL_NODE;
  const { k, l, r } = node;
  if (key === k) {
    if (empty(l)) {
      return r;
    } else if (empty(r)) {
      return l;
    } else {
      const [lastKey, lastValue] = last$1(l);
      return adjust(clone(node, { k: lastKey, v: lastValue, l: deleteLast(l) }));
    }
  } else if (key < k) {
    return adjust(clone(node, { l: remove(l, key) }));
  } else {
    return adjust(clone(node, { r: remove(r, key) }));
  }
}
function find(node, key) {
  if (empty(node)) {
    return;
  }
  if (key === node.k) {
    return node.v;
  } else if (key < node.k) {
    return find(node.l, key);
  } else {
    return find(node.r, key);
  }
}
function findMaxKeyValue(node, value, field = "k") {
  if (empty(node)) {
    return [-Infinity, void 0];
  }
  if (Number(node[field]) === value) {
    return [node.k, node.v];
  }
  if (Number(node[field]) < value) {
    const r = findMaxKeyValue(node.r, value, field);
    if (r[0] === -Infinity) {
      return [node.k, node.v];
    } else {
      return r;
    }
  }
  return findMaxKeyValue(node.l, value, field);
}
function insert(node, k, v) {
  if (empty(node)) {
    return newAANode(k, v, 1);
  }
  if (k === node.k) {
    return clone(node, { k, v });
  } else if (k < node.k) {
    return rebalance(clone(node, { l: insert(node.l, k, v) }));
  } else {
    return rebalance(clone(node, { r: insert(node.r, k, v) }));
  }
}
function walkWithin(node, start, end) {
  if (empty(node)) {
    return [];
  }
  const { k, v, l, r } = node;
  let result = [];
  if (k > start) {
    result = result.concat(walkWithin(l, start, end));
  }
  if (k >= start && k <= end) {
    result.push({ k, v });
  }
  if (k <= end) {
    result = result.concat(walkWithin(r, start, end));
  }
  return result;
}
function walk(node) {
  if (empty(node)) {
    return [];
  }
  return [...walk(node.l), { k: node.k, v: node.v }, ...walk(node.r)];
}
function last$1(node) {
  return empty(node.r) ? [node.k, node.v] : last$1(node.r);
}
function deleteLast(node) {
  return empty(node.r) ? node.l : adjust(clone(node, { r: deleteLast(node.r) }));
}
function clone(node, args) {
  return newAANode(
    args.k !== void 0 ? args.k : node.k,
    args.v !== void 0 ? args.v : node.v,
    args.lvl !== void 0 ? args.lvl : node.lvl,
    args.l !== void 0 ? args.l : node.l,
    args.r !== void 0 ? args.r : node.r
  );
}
function isSingle(node) {
  return empty(node) || node.lvl > node.r.lvl;
}
function rebalance(node) {
  return split(skew(node));
}
function adjust(node) {
  const { l, r, lvl } = node;
  if (r.lvl >= lvl - 1 && l.lvl >= lvl - 1) {
    return node;
  } else if (lvl > r.lvl + 1) {
    if (isSingle(l)) {
      return skew(clone(node, { lvl: lvl - 1 }));
    } else {
      if (!empty(l) && !empty(l.r)) {
        return clone(l.r, {
          l: clone(l, { r: l.r.l }),
          r: clone(node, {
            l: l.r.r,
            lvl: lvl - 1
          }),
          lvl
        });
      } else {
        throw new Error("Unexpected empty nodes");
      }
    }
  } else {
    if (isSingle(node)) {
      return split(clone(node, { lvl: lvl - 1 }));
    } else {
      if (!empty(r) && !empty(r.l)) {
        const rl = r.l;
        const rlvl = isSingle(rl) ? r.lvl - 1 : r.lvl;
        return clone(rl, {
          l: clone(node, {
            r: rl.l,
            lvl: lvl - 1
          }),
          r: split(clone(r, { l: rl.r, lvl: rlvl })),
          lvl: rl.lvl + 1
        });
      } else {
        throw new Error("Unexpected empty nodes");
      }
    }
  }
}
function rangesWithin(node, startIndex, endIndex) {
  if (empty(node)) {
    return [];
  }
  const adjustedStart = findMaxKeyValue(node, startIndex)[0];
  return toRanges(walkWithin(node, adjustedStart, endIndex));
}
function arrayToRanges(items, parser) {
  const length = items.length;
  if (length === 0) {
    return [];
  }
  let { index: start, value } = parser(items[0]);
  const result = [];
  for (let i = 1; i < length; i++) {
    const { index: nextIndex, value: nextValue } = parser(items[i]);
    result.push({ start, end: nextIndex - 1, value });
    start = nextIndex;
    value = nextValue;
  }
  result.push({ start, end: Infinity, value });
  return result;
}
function toRanges(nodes) {
  return arrayToRanges(nodes, ({ k: index, v: value }) => ({ index, value }));
}
function split(node) {
  const { r, lvl } = node;
  return !empty(r) && !empty(r.r) && r.lvl === lvl && r.r.lvl === lvl ? clone(r, { l: clone(node, { r: r.l }), lvl: lvl + 1 }) : node;
}
function skew(node) {
  const { l } = node;
  return !empty(l) && l.lvl === node.lvl ? clone(l, { r: clone(node, { l: l.r }) }) : node;
}
function findIndexOfClosestSmallerOrEqual(items, value, comparator, start = 0) {
  let end = items.length - 1;
  while (start <= end) {
    const index = Math.floor((start + end) / 2);
    const item = items[index];
    const match = comparator(item, value);
    if (match === 0) {
      return index;
    }
    if (match === -1) {
      if (end - start < 2) {
        return index - 1;
      }
      end = index - 1;
    } else {
      if (end === start) {
        return index;
      }
      start = index + 1;
    }
  }
  throw new Error(`Failed binary finding record in array - ${items.join(",")}, searched for ${value}`);
}
function findClosestSmallerOrEqual(items, value, comparator) {
  return items[findIndexOfClosestSmallerOrEqual(items, value, comparator)];
}
function findRange(items, startValue, endValue, comparator) {
  const startIndex = findIndexOfClosestSmallerOrEqual(items, startValue, comparator);
  const endIndex = findIndexOfClosestSmallerOrEqual(items, endValue, comparator, startIndex);
  return items.slice(startIndex, endIndex + 1);
}
const recalcSystem = system(
  () => {
    const recalcInProgress = statefulStream(false);
    return { recalcInProgress };
  },
  [],
  { singleton: true }
);
function rangeIncludes(refRange) {
  const { size, startIndex, endIndex } = refRange;
  return (range) => {
    return range.start === startIndex && (range.end === endIndex || range.end === Infinity) && range.value === size;
  };
}
function affectedGroupCount(offset, groupIndices) {
  let recognizedOffsetItems = 0;
  let groupIndex = 0;
  while (recognizedOffsetItems < offset) {
    recognizedOffsetItems += groupIndices[groupIndex + 1] - groupIndices[groupIndex] - 1;
    groupIndex++;
  }
  const offsetIsExact = recognizedOffsetItems === offset;
  return groupIndex - (offsetIsExact ? 0 : 1);
}
function insertRanges(sizeTree, ranges) {
  let syncStart = empty(sizeTree) ? 0 : Infinity;
  for (const range of ranges) {
    const { size, startIndex, endIndex } = range;
    syncStart = Math.min(syncStart, startIndex);
    if (empty(sizeTree)) {
      sizeTree = insert(sizeTree, 0, size);
      continue;
    }
    const overlappingRanges = rangesWithin(sizeTree, startIndex - 1, endIndex + 1);
    if (overlappingRanges.some(rangeIncludes(range))) {
      continue;
    }
    let firstPassDone = false;
    let shouldInsert = false;
    for (const { start: rangeStart, end: rangeEnd, value: rangeValue } of overlappingRanges) {
      if (!firstPassDone) {
        shouldInsert = rangeValue !== size;
        firstPassDone = true;
      } else {
        if (endIndex >= rangeStart || size === rangeValue) {
          sizeTree = remove(sizeTree, rangeStart);
        }
      }
      if (rangeEnd > endIndex && endIndex >= rangeStart) {
        if (rangeValue !== size) {
          sizeTree = insert(sizeTree, endIndex + 1, rangeValue);
        }
      }
    }
    if (shouldInsert) {
      sizeTree = insert(sizeTree, startIndex, size);
    }
  }
  return [sizeTree, syncStart];
}
function initialSizeState() {
  return {
    offsetTree: [],
    sizeTree: newTree(),
    groupOffsetTree: newTree(),
    lastIndex: 0,
    lastOffset: 0,
    lastSize: 0,
    groupIndices: []
  };
}
function indexComparator({ index: itemIndex }, index) {
  return index === itemIndex ? 0 : index < itemIndex ? -1 : 1;
}
function offsetComparator({ offset: itemOffset }, offset) {
  return offset === itemOffset ? 0 : offset < itemOffset ? -1 : 1;
}
function offsetPointParser(point) {
  return { index: point.index, value: point };
}
function rangesWithinOffsets(tree, startOffset, endOffset, minStartIndex = 0) {
  if (minStartIndex > 0) {
    startOffset = Math.max(startOffset, findClosestSmallerOrEqual(tree, minStartIndex, indexComparator).offset);
  }
  return arrayToRanges(findRange(tree, startOffset, endOffset, offsetComparator), offsetPointParser);
}
function createOffsetTree(prevOffsetTree, syncStart, sizeTree, gap) {
  let offsetTree = prevOffsetTree;
  let prevIndex = 0;
  let prevSize = 0;
  let prevOffset = 0;
  let startIndex = 0;
  if (syncStart !== 0) {
    startIndex = findIndexOfClosestSmallerOrEqual(offsetTree, syncStart - 1, indexComparator);
    const offsetInfo = offsetTree[startIndex];
    prevOffset = offsetInfo.offset;
    const kv = findMaxKeyValue(sizeTree, syncStart - 1);
    prevIndex = kv[0];
    prevSize = kv[1];
    if (offsetTree.length && offsetTree[startIndex].size === findMaxKeyValue(sizeTree, syncStart)[1]) {
      startIndex -= 1;
    }
    offsetTree = offsetTree.slice(0, startIndex + 1);
  } else {
    offsetTree = [];
  }
  for (const { start: startIndex2, value } of rangesWithin(sizeTree, syncStart, Infinity)) {
    const indexOffset = startIndex2 - prevIndex;
    const aOffset = indexOffset * prevSize + prevOffset + indexOffset * gap;
    offsetTree.push({
      offset: aOffset,
      size: value,
      index: startIndex2
    });
    prevIndex = startIndex2;
    prevOffset = aOffset;
    prevSize = value;
  }
  return {
    offsetTree,
    lastIndex: prevIndex,
    lastOffset: prevOffset,
    lastSize: prevSize
  };
}
function sizeStateReducer(state, [ranges, groupIndices, log, gap]) {
  if (ranges.length > 0) {
    log("received item sizes", ranges, LogLevel.DEBUG);
  }
  const sizeTree = state.sizeTree;
  let newSizeTree = sizeTree;
  let syncStart = 0;
  if (groupIndices.length > 0 && empty(sizeTree) && ranges.length === 2) {
    const groupSize = ranges[0].size;
    const itemSize = ranges[1].size;
    newSizeTree = groupIndices.reduce((tree, groupIndex) => {
      return insert(insert(tree, groupIndex, groupSize), groupIndex + 1, itemSize);
    }, newSizeTree);
  } else {
    [newSizeTree, syncStart] = insertRanges(newSizeTree, ranges);
  }
  if (newSizeTree === sizeTree) {
    return state;
  }
  const { offsetTree: newOffsetTree, lastIndex, lastSize, lastOffset } = createOffsetTree(state.offsetTree, syncStart, newSizeTree, gap);
  return {
    sizeTree: newSizeTree,
    offsetTree: newOffsetTree,
    lastIndex,
    lastOffset,
    lastSize,
    groupOffsetTree: groupIndices.reduce((tree, index) => {
      return insert(tree, index, offsetOf(index, newOffsetTree, gap));
    }, newTree()),
    groupIndices
  };
}
function offsetOf(index, tree, gap) {
  if (tree.length === 0) {
    return 0;
  }
  const { offset, index: startIndex, size } = findClosestSmallerOrEqual(tree, index, indexComparator);
  const itemCount = index - startIndex;
  const top = size * itemCount + (itemCount - 1) * gap + offset;
  return top > 0 ? top + gap : top;
}
function isGroupLocation(location) {
  return typeof location.groupIndex !== "undefined";
}
function originalIndexFromLocation(location, sizes, lastIndex) {
  if (isGroupLocation(location)) {
    return sizes.groupIndices[location.groupIndex] + 1;
  } else {
    const numericIndex = location.index === "LAST" ? lastIndex : location.index;
    let result = originalIndexFromItemIndex(numericIndex, sizes);
    result = Math.max(0, result, Math.min(lastIndex, result));
    return result;
  }
}
function originalIndexFromItemIndex(itemIndex, sizes) {
  if (!hasGroups(sizes)) {
    return itemIndex;
  }
  let groupOffset = 0;
  while (sizes.groupIndices[groupOffset] <= itemIndex + groupOffset) {
    groupOffset++;
  }
  return itemIndex + groupOffset;
}
function hasGroups(sizes) {
  return !empty(sizes.groupOffsetTree);
}
function sizeTreeToRanges(sizeTree) {
  return walk(sizeTree).map(({ k: startIndex, v: size }, index, sizeArray) => {
    const nextSize = sizeArray[index + 1];
    const endIndex = nextSize ? nextSize.k - 1 : Infinity;
    return { startIndex, endIndex, size };
  });
}
const SIZE_MAP = {
  offsetHeight: "height",
  offsetWidth: "width"
};
const sizeSystem = system(
  ([{ log }, { recalcInProgress }]) => {
    const sizeRanges = stream();
    const totalCount = stream();
    const statefulTotalCount = statefulStreamFromEmitter(totalCount, 0);
    const unshiftWith = stream();
    const shiftWith = stream();
    const firstItemIndex = statefulStream(0);
    const groupIndices = statefulStream([]);
    const fixedItemSize = statefulStream(void 0);
    const defaultItemSize = statefulStream(void 0);
    const itemSize = statefulStream((el, field) => correctItemSize(el, SIZE_MAP[field]));
    const data = statefulStream(void 0);
    const gap = statefulStream(0);
    const initial = initialSizeState();
    const sizes = statefulStreamFromEmitter(
      pipe(sizeRanges, withLatestFrom(groupIndices, log, gap), scan(sizeStateReducer, initial), distinctUntilChanged()),
      initial
    );
    const prevGroupIndices = statefulStreamFromEmitter(
      pipe(
        groupIndices,
        distinctUntilChanged(),
        scan((prev, curr) => ({ prev: prev.current, current: curr }), {
          prev: [],
          current: []
        }),
        map(({ prev }) => prev)
      ),
      []
    );
    connect(
      pipe(
        groupIndices,
        filter((indexes) => indexes.length > 0),
        withLatestFrom(sizes, gap),
        map(([groupIndices2, sizes2, gap2]) => {
          const groupOffsetTree = groupIndices2.reduce((tree, index, idx) => {
            return insert(tree, index, offsetOf(index, sizes2.offsetTree, gap2) || idx);
          }, newTree());
          return {
            ...sizes2,
            groupIndices: groupIndices2,
            groupOffsetTree
          };
        })
      ),
      sizes
    );
    connect(
      pipe(
        totalCount,
        withLatestFrom(sizes),
        filter(([totalCount2, { lastIndex }]) => {
          return totalCount2 < lastIndex;
        }),
        map(([totalCount2, { lastIndex, lastSize }]) => {
          return [
            {
              startIndex: totalCount2,
              endIndex: lastIndex,
              size: lastSize
            }
          ];
        })
      ),
      sizeRanges
    );
    connect(fixedItemSize, defaultItemSize);
    const trackItemSizes = statefulStreamFromEmitter(
      pipe(
        fixedItemSize,
        map((size) => size === void 0)
      ),
      true
    );
    connect(
      pipe(
        defaultItemSize,
        filter((value) => {
          return value !== void 0 && empty(getValue(sizes).sizeTree);
        }),
        map((size) => [{ startIndex: 0, endIndex: 0, size }])
      ),
      sizeRanges
    );
    const listRefresh = streamFromEmitter(
      pipe(
        sizeRanges,
        withLatestFrom(sizes),
        scan(
          ({ sizes: oldSizes }, [_, newSizes]) => {
            return {
              changed: newSizes !== oldSizes,
              sizes: newSizes
            };
          },
          { changed: false, sizes: initial }
        ),
        map((value) => value.changed)
      )
    );
    subscribe(
      pipe(
        firstItemIndex,
        scan(
          (prev, next) => {
            return { diff: prev.prev - next, prev: next };
          },
          { diff: 0, prev: 0 }
        ),
        map((val) => val.diff)
      ),
      (offset) => {
        const { groupIndices: groupIndices2 } = getValue(sizes);
        if (offset > 0) {
          publish(recalcInProgress, true);
          publish(unshiftWith, offset + affectedGroupCount(offset, groupIndices2));
        } else if (offset < 0) {
          const prevGroupIndicesValue = getValue(prevGroupIndices);
          if (prevGroupIndicesValue.length > 0) {
            offset -= affectedGroupCount(-offset, prevGroupIndicesValue);
          }
          publish(shiftWith, offset);
        }
      }
    );
    subscribe(pipe(firstItemIndex, withLatestFrom(log)), ([index, log2]) => {
      if (index < 0) {
        log2(
          "`firstItemIndex` prop should not be set to less than zero. If you don't know the total count, just use a very high value",
          { firstItemIndex },
          LogLevel.ERROR
        );
      }
    });
    const beforeUnshiftWith = streamFromEmitter(unshiftWith);
    connect(
      pipe(
        unshiftWith,
        withLatestFrom(sizes),
        map(([unshiftWith2, sizes2]) => {
          const groupedMode = sizes2.groupIndices.length > 0;
          const initialRanges = [];
          const defaultSize = sizes2.lastSize;
          if (groupedMode) {
            const firstGroupSize = find(sizes2.sizeTree, 0);
            let prependedGroupItemsCount = 0;
            let groupIndex = 0;
            while (prependedGroupItemsCount < unshiftWith2) {
              const theGroupIndex = sizes2.groupIndices[groupIndex];
              const groupItemCount = sizes2.groupIndices.length === groupIndex + 1 ? Infinity : sizes2.groupIndices[groupIndex + 1] - theGroupIndex - 1;
              initialRanges.push({
                startIndex: theGroupIndex,
                endIndex: theGroupIndex,
                size: firstGroupSize
              });
              initialRanges.push({
                startIndex: theGroupIndex + 1,
                endIndex: theGroupIndex + 1 + groupItemCount - 1,
                size: defaultSize
              });
              groupIndex++;
              prependedGroupItemsCount += groupItemCount + 1;
            }
            const sizeTreeKV = walk(sizes2.sizeTree);
            const firstGroupIsExpanded = prependedGroupItemsCount !== unshiftWith2;
            if (firstGroupIsExpanded) {
              sizeTreeKV.shift();
            }
            return sizeTreeKV.reduce(
              (acc, { k: index, v: size }) => {
                let ranges = acc.ranges;
                if (acc.prevSize !== 0) {
                  ranges = [
                    ...acc.ranges,
                    {
                      startIndex: acc.prevIndex,
                      endIndex: index + unshiftWith2 - 1,
                      size: acc.prevSize
                    }
                  ];
                }
                return {
                  ranges,
                  prevIndex: index + unshiftWith2,
                  prevSize: size
                };
              },
              {
                ranges: initialRanges,
                prevIndex: unshiftWith2,
                prevSize: 0
              }
            ).ranges;
          }
          return walk(sizes2.sizeTree).reduce(
            (acc, { k: index, v: size }) => {
              return {
                ranges: [...acc.ranges, { startIndex: acc.prevIndex, endIndex: index + unshiftWith2 - 1, size: acc.prevSize }],
                prevIndex: index + unshiftWith2,
                prevSize: size
              };
            },
            {
              ranges: [],
              prevIndex: 0,
              prevSize: defaultSize
            }
          ).ranges;
        })
      ),
      sizeRanges
    );
    const shiftWithOffset = streamFromEmitter(
      pipe(
        shiftWith,
        withLatestFrom(sizes, gap),
        map(([shiftWith2, { offsetTree }, gap2]) => {
          const newFirstItemIndex = -shiftWith2;
          return offsetOf(newFirstItemIndex, offsetTree, gap2);
        })
      )
    );
    connect(
      pipe(
        shiftWith,
        withLatestFrom(sizes, gap),
        map(([shiftWith2, sizes2, gap2]) => {
          const groupedMode = sizes2.groupIndices.length > 0;
          if (groupedMode) {
            if (empty(sizes2.sizeTree)) {
              return sizes2;
            }
            let newSizeTree = newTree();
            const prevGroupIndicesValue = getValue(prevGroupIndices);
            let removedItemsCount = 0;
            let groupIndex = 0;
            let groupOffset = 0;
            while (removedItemsCount < -shiftWith2) {
              groupOffset = prevGroupIndicesValue[groupIndex];
              const groupItemCount = prevGroupIndicesValue[groupIndex + 1] - groupOffset - 1;
              groupIndex++;
              removedItemsCount += groupItemCount + 1;
            }
            newSizeTree = walk(sizes2.sizeTree).reduce((acc, { k, v }) => {
              return insert(acc, Math.max(0, k + shiftWith2), v);
            }, newSizeTree);
            const aGroupIsShrunk = removedItemsCount !== -shiftWith2;
            if (aGroupIsShrunk) {
              const firstGroupSize = find(sizes2.sizeTree, groupOffset);
              newSizeTree = insert(newSizeTree, 0, firstGroupSize);
              const nextItemSize = findMaxKeyValue(sizes2.sizeTree, -shiftWith2 + 1)[1];
              newSizeTree = insert(newSizeTree, 1, nextItemSize);
            }
            return {
              ...sizes2,
              sizeTree: newSizeTree,
              ...createOffsetTree(sizes2.offsetTree, 0, newSizeTree, gap2)
            };
          } else {
            const newSizeTree = walk(sizes2.sizeTree).reduce((acc, { k, v }) => {
              return insert(acc, Math.max(0, k + shiftWith2), v);
            }, newTree());
            return {
              ...sizes2,
              sizeTree: newSizeTree,
              ...createOffsetTree(sizes2.offsetTree, 0, newSizeTree, gap2)
            };
          }
        })
      ),
      sizes
    );
    return {
      // input
      data,
      totalCount,
      sizeRanges,
      groupIndices,
      defaultItemSize,
      fixedItemSize,
      unshiftWith,
      shiftWith,
      shiftWithOffset,
      beforeUnshiftWith,
      firstItemIndex,
      gap,
      // output
      sizes,
      listRefresh,
      statefulTotalCount,
      trackItemSizes,
      itemSize
    };
  },
  tup(loggerSystem, recalcSystem),
  { singleton: true }
);
const SUPPORTS_SCROLL_TO_OPTIONS = typeof document !== "undefined" && "scrollBehavior" in document.documentElement.style;
function normalizeIndexLocation(location) {
  const result = typeof location === "number" ? { index: location } : location;
  if (!result.align) {
    result.align = "start";
  }
  if (!result.behavior || !SUPPORTS_SCROLL_TO_OPTIONS) {
    result.behavior = "auto";
  }
  if (!result.offset) {
    result.offset = 0;
  }
  return result;
}
const scrollToIndexSystem = system(
  ([
    { sizes, totalCount, listRefresh, gap },
    {
      scrollingInProgress,
      viewportHeight,
      scrollTo,
      smoothScrollTargetReached,
      headerHeight,
      footerHeight,
      fixedHeaderHeight,
      fixedFooterHeight
    },
    { log }
  ]) => {
    const scrollToIndex = stream();
    const scrollTargetReached = stream();
    const topListHeight = statefulStream(0);
    let unsubscribeNextListRefresh = null;
    let cleartTimeoutRef = null;
    let unsubscribeListRefresh = null;
    function cleanup() {
      if (unsubscribeNextListRefresh) {
        unsubscribeNextListRefresh();
        unsubscribeNextListRefresh = null;
      }
      if (unsubscribeListRefresh) {
        unsubscribeListRefresh();
        unsubscribeListRefresh = null;
      }
      if (cleartTimeoutRef) {
        clearTimeout(cleartTimeoutRef);
        cleartTimeoutRef = null;
      }
      publish(scrollingInProgress, false);
    }
    connect(
      pipe(
        scrollToIndex,
        withLatestFrom(sizes, viewportHeight, totalCount, topListHeight, headerHeight, footerHeight, log),
        withLatestFrom(gap, fixedHeaderHeight, fixedFooterHeight),
        map(
          ([
            [location, sizes2, viewportHeight2, totalCount2, topListHeight2, headerHeight2, footerHeight2, log2],
            gap2,
            fixedHeaderHeight2,
            fixedFooterHeight2
          ]) => {
            const normalLocation = normalizeIndexLocation(location);
            const { align, behavior, offset } = normalLocation;
            const lastIndex = totalCount2 - 1;
            const index = originalIndexFromLocation(normalLocation, sizes2, lastIndex);
            let top = offsetOf(index, sizes2.offsetTree, gap2) + headerHeight2;
            if (align === "end") {
              top += fixedHeaderHeight2 + findMaxKeyValue(sizes2.sizeTree, index)[1] - viewportHeight2 + fixedFooterHeight2;
              if (index === lastIndex) {
                top += footerHeight2;
              }
            } else if (align === "center") {
              top += (fixedHeaderHeight2 + findMaxKeyValue(sizes2.sizeTree, index)[1] - viewportHeight2 + fixedFooterHeight2) / 2;
            } else {
              top -= topListHeight2;
            }
            if (offset) {
              top += offset;
            }
            const retry = (listChanged) => {
              cleanup();
              if (listChanged) {
                log2("retrying to scroll to", { location }, LogLevel.DEBUG);
                publish(scrollToIndex, location);
              } else {
                publish(scrollTargetReached, true);
                log2("list did not change, scroll successful", {}, LogLevel.DEBUG);
              }
            };
            cleanup();
            if (behavior === "smooth") {
              let listChanged = false;
              unsubscribeListRefresh = subscribe(listRefresh, (changed) => {
                listChanged = listChanged || changed;
              });
              unsubscribeNextListRefresh = handleNext(smoothScrollTargetReached, () => {
                retry(listChanged);
              });
            } else {
              unsubscribeNextListRefresh = handleNext(pipe(listRefresh, watchChangesFor(150)), retry);
            }
            cleartTimeoutRef = setTimeout(() => {
              cleanup();
            }, 1200);
            publish(scrollingInProgress, true);
            log2("scrolling from index to", { index, top, behavior }, LogLevel.DEBUG);
            return { top, behavior };
          }
        )
      ),
      scrollTo
    );
    return {
      scrollToIndex,
      scrollTargetReached,
      topListHeight
    };
  },
  tup(sizeSystem, domIOSystem, loggerSystem),
  { singleton: true }
);
function watchChangesFor(limit) {
  return (done) => {
    const timeoutRef = setTimeout(() => {
      done(false);
    }, limit);
    return (value) => {
      if (value) {
        done(true);
        clearTimeout(timeoutRef);
      }
    };
  };
}
const UP = "up";
const DOWN = "down";
const NONE$1 = "none";
const INITIAL_BOTTOM_STATE = {
  atBottom: false,
  notAtBottomBecause: "NOT_SHOWING_LAST_ITEM",
  state: {
    offsetBottom: 0,
    scrollTop: 0,
    viewportHeight: 0,
    scrollHeight: 0
  }
};
const DEFAULT_AT_TOP_THRESHOLD = 0;
const stateFlagsSystem = system(([{ scrollContainerState, scrollTop, viewportHeight, headerHeight, footerHeight, scrollBy }]) => {
  const isAtBottom = statefulStream(false);
  const isAtTop = statefulStream(true);
  const atBottomStateChange = stream();
  const atTopStateChange = stream();
  const atBottomThreshold = statefulStream(4);
  const atTopThreshold = statefulStream(DEFAULT_AT_TOP_THRESHOLD);
  const isScrolling = statefulStreamFromEmitter(
    pipe(
      merge(pipe(duc(scrollTop), skip(1), mapTo(true)), pipe(duc(scrollTop), skip(1), mapTo(false), debounceTime(100))),
      distinctUntilChanged()
    ),
    false
  );
  const isScrollingBy = statefulStreamFromEmitter(
    pipe(merge(pipe(scrollBy, mapTo(true)), pipe(scrollBy, mapTo(false), debounceTime(200))), distinctUntilChanged()),
    false
  );
  connect(
    pipe(
      combineLatest(duc(scrollTop), duc(atTopThreshold)),
      map(([top, atTopThreshold2]) => top <= atTopThreshold2),
      distinctUntilChanged()
    ),
    isAtTop
  );
  connect(pipe(isAtTop, throttleTime(50)), atTopStateChange);
  const atBottomState = streamFromEmitter(
    pipe(
      combineLatest(scrollContainerState, duc(viewportHeight), duc(headerHeight), duc(footerHeight), duc(atBottomThreshold)),
      scan((current, [{ scrollTop: scrollTop2, scrollHeight }, viewportHeight2, _headerHeight, _footerHeight, atBottomThreshold2]) => {
        const isAtBottom2 = scrollTop2 + viewportHeight2 - scrollHeight > -atBottomThreshold2;
        const state = {
          viewportHeight: viewportHeight2,
          scrollTop: scrollTop2,
          scrollHeight
        };
        if (isAtBottom2) {
          let atBottomBecause;
          let scrollTopDelta;
          if (scrollTop2 > current.state.scrollTop) {
            atBottomBecause = "SCROLLED_DOWN";
            scrollTopDelta = current.state.scrollTop - scrollTop2;
          } else {
            atBottomBecause = "SIZE_DECREASED";
            scrollTopDelta = current.state.scrollTop - scrollTop2 || current.scrollTopDelta;
          }
          return {
            atBottom: true,
            state,
            atBottomBecause,
            scrollTopDelta
          };
        }
        let notAtBottomBecause;
        if (state.scrollHeight > current.state.scrollHeight) {
          notAtBottomBecause = "SIZE_INCREASED";
        } else if (viewportHeight2 < current.state.viewportHeight) {
          notAtBottomBecause = "VIEWPORT_HEIGHT_DECREASING";
        } else if (scrollTop2 < current.state.scrollTop) {
          notAtBottomBecause = "SCROLLING_UPWARDS";
        } else {
          notAtBottomBecause = "NOT_FULLY_SCROLLED_TO_LAST_ITEM_BOTTOM";
        }
        return {
          atBottom: false,
          notAtBottomBecause,
          state
        };
      }, INITIAL_BOTTOM_STATE),
      distinctUntilChanged((prev, next) => {
        return prev && prev.atBottom === next.atBottom;
      })
    )
  );
  const lastJumpDueToItemResize = statefulStreamFromEmitter(
    pipe(
      scrollContainerState,
      scan(
        (current, { scrollTop: scrollTop2, scrollHeight, viewportHeight: viewportHeight2 }) => {
          if (!approximatelyEqual(current.scrollHeight, scrollHeight)) {
            const atBottom = scrollHeight - (scrollTop2 + viewportHeight2) < 1;
            if (current.scrollTop !== scrollTop2 && atBottom) {
              return {
                scrollHeight,
                scrollTop: scrollTop2,
                jump: current.scrollTop - scrollTop2,
                changed: true
              };
            } else {
              return {
                scrollHeight,
                scrollTop: scrollTop2,
                jump: 0,
                changed: true
              };
            }
          } else {
            return {
              scrollTop: scrollTop2,
              scrollHeight,
              jump: 0,
              changed: false
            };
          }
        },
        { scrollHeight: 0, jump: 0, scrollTop: 0, changed: false }
      ),
      filter((value) => value.changed),
      map((value) => value.jump)
    ),
    0
  );
  connect(
    pipe(
      atBottomState,
      map((state) => state.atBottom)
    ),
    isAtBottom
  );
  connect(pipe(isAtBottom, throttleTime(50)), atBottomStateChange);
  const scrollDirection = statefulStream(DOWN);
  connect(
    pipe(
      scrollContainerState,
      map(({ scrollTop: scrollTop2 }) => scrollTop2),
      distinctUntilChanged(),
      scan(
        (acc, scrollTop2) => {
          if (getValue(isScrollingBy)) {
            return { direction: acc.direction, prevScrollTop: scrollTop2 };
          }
          return { direction: scrollTop2 < acc.prevScrollTop ? UP : DOWN, prevScrollTop: scrollTop2 };
        },
        { direction: DOWN, prevScrollTop: 0 }
      ),
      map((value) => value.direction)
    ),
    scrollDirection
  );
  connect(pipe(scrollContainerState, throttleTime(50), mapTo(NONE$1)), scrollDirection);
  const scrollVelocity = statefulStream(0);
  connect(
    pipe(
      isScrolling,
      filter((value) => !value),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      mapTo(0)
    ),
    scrollVelocity
  );
  connect(
    pipe(
      scrollTop,
      throttleTime(100),
      withLatestFrom(isScrolling),
      filter(([_, isScrolling2]) => !!isScrolling2),
      scan(([_, prev], [next]) => [prev, next], [0, 0]),
      map(([prev, next]) => next - prev)
    ),
    scrollVelocity
  );
  return {
    isScrolling,
    isAtTop,
    isAtBottom,
    atBottomState,
    atTopStateChange,
    atBottomStateChange,
    scrollDirection,
    atBottomThreshold,
    atTopThreshold,
    scrollVelocity,
    lastJumpDueToItemResize
  };
}, tup(domIOSystem));
const propsReadySystem = system(
  ([{ log }]) => {
    const propsReady = statefulStream(false);
    const didMount = streamFromEmitter(
      pipe(
        propsReady,
        filter((ready) => ready),
        distinctUntilChanged()
      )
    );
    subscribe(propsReady, (value) => {
      value && getValue(log)("props updated", {}, LogLevel.DEBUG);
    });
    return { propsReady, didMount };
  },
  tup(loggerSystem),
  { singleton: true }
);
function skipFrames(frameCount, callback) {
  if (frameCount == 0) {
    callback();
  } else {
    requestAnimationFrame(() => skipFrames(frameCount - 1, callback));
  }
}
function getInitialTopMostItemIndexNumber(location, totalCount) {
  const lastIndex = totalCount - 1;
  const index = typeof location === "number" ? location : location.index === "LAST" ? lastIndex : location.index;
  return index;
}
const initialTopMostItemIndexSystem = system(
  ([{ sizes, listRefresh, defaultItemSize }, { scrollTop }, { scrollToIndex, scrollTargetReached }, { didMount }]) => {
    const scrolledToInitialItem = statefulStream(true);
    const initialTopMostItemIndex = statefulStream(0);
    const initialItemFinalLocationReached = statefulStream(true);
    connect(
      pipe(
        didMount,
        withLatestFrom(initialTopMostItemIndex),
        filter(([_, location]) => !!location),
        mapTo(false)
      ),
      scrolledToInitialItem
    );
    connect(
      pipe(
        didMount,
        withLatestFrom(initialTopMostItemIndex),
        filter(([_, location]) => !!location),
        mapTo(false)
      ),
      initialItemFinalLocationReached
    );
    subscribe(
      pipe(
        combineLatest(listRefresh, didMount),
        withLatestFrom(scrolledToInitialItem, sizes, defaultItemSize, initialItemFinalLocationReached),
        filter(([[, didMount2], scrolledToInitialItem2, { sizeTree }, defaultItemSize2, scrollScheduled]) => {
          return didMount2 && (!empty(sizeTree) || isDefined(defaultItemSize2)) && !scrolledToInitialItem2 && !scrollScheduled;
        }),
        withLatestFrom(initialTopMostItemIndex)
      ),
      ([, initialTopMostItemIndex2]) => {
        handleNext(scrollTargetReached, () => {
          publish(initialItemFinalLocationReached, true);
        });
        skipFrames(4, () => {
          handleNext(scrollTop, () => {
            publish(scrolledToInitialItem, true);
          });
          publish(scrollToIndex, initialTopMostItemIndex2);
        });
      }
    );
    return {
      scrolledToInitialItem,
      initialTopMostItemIndex,
      initialItemFinalLocationReached
    };
  },
  tup(sizeSystem, domIOSystem, scrollToIndexSystem, propsReadySystem),
  { singleton: true }
);
function normalizeFollowOutput(follow) {
  if (!follow) {
    return false;
  }
  return follow === "smooth" ? "smooth" : "auto";
}
const behaviorFromFollowOutput = (follow, isAtBottom) => {
  if (typeof follow === "function") {
    return normalizeFollowOutput(follow(isAtBottom));
  }
  return isAtBottom && normalizeFollowOutput(follow);
};
const followOutputSystem = system(
  ([
    { totalCount, listRefresh },
    { isAtBottom, atBottomState },
    { scrollToIndex },
    { scrolledToInitialItem },
    { propsReady, didMount },
    { log },
    { scrollingInProgress }
  ]) => {
    const followOutput = statefulStream(false);
    const autoscrollToBottom = stream();
    let pendingScrollHandle = null;
    function scrollToBottom(followOutputBehavior) {
      publish(scrollToIndex, {
        index: "LAST",
        align: "end",
        behavior: followOutputBehavior
      });
    }
    subscribe(
      pipe(
        combineLatest(pipe(duc(totalCount), skip(1)), didMount),
        withLatestFrom(duc(followOutput), isAtBottom, scrolledToInitialItem, scrollingInProgress),
        map(([[totalCount2, didMount2], followOutput2, isAtBottom2, scrolledToInitialItem2, scrollingInProgress2]) => {
          let shouldFollow = didMount2 && scrolledToInitialItem2;
          let followOutputBehavior = "auto";
          if (shouldFollow) {
            followOutputBehavior = behaviorFromFollowOutput(followOutput2, isAtBottom2 || scrollingInProgress2);
            shouldFollow = shouldFollow && !!followOutputBehavior;
          }
          return { totalCount: totalCount2, shouldFollow, followOutputBehavior };
        }),
        filter(({ shouldFollow }) => shouldFollow)
      ),
      ({ totalCount: totalCount2, followOutputBehavior }) => {
        if (pendingScrollHandle) {
          pendingScrollHandle();
          pendingScrollHandle = null;
        }
        pendingScrollHandle = handleNext(listRefresh, () => {
          getValue(log)("following output to ", { totalCount: totalCount2 }, LogLevel.DEBUG);
          scrollToBottom(followOutputBehavior);
          pendingScrollHandle = null;
        });
      }
    );
    function trapNextSizeIncrease(followOutput2) {
      const cancel = handleNext(atBottomState, (state) => {
        if (followOutput2 && !state.atBottom && state.notAtBottomBecause === "SIZE_INCREASED" && !pendingScrollHandle) {
          getValue(log)("scrolling to bottom due to increased size", {}, LogLevel.DEBUG);
          scrollToBottom("auto");
        }
      });
      setTimeout(cancel, 100);
    }
    subscribe(
      pipe(
        combineLatest(duc(followOutput), totalCount, propsReady),
        filter(([follow, , ready]) => follow && ready),
        scan(
          ({ value }, [, next]) => {
            return { refreshed: value === next, value: next };
          },
          { refreshed: false, value: 0 }
        ),
        filter(({ refreshed }) => refreshed),
        withLatestFrom(followOutput, totalCount)
      ),
      ([, followOutput2]) => {
        if (getValue(scrolledToInitialItem)) {
          trapNextSizeIncrease(followOutput2 !== false);
        }
      }
    );
    subscribe(autoscrollToBottom, () => {
      trapNextSizeIncrease(getValue(followOutput) !== false);
    });
    subscribe(combineLatest(duc(followOutput), atBottomState), ([followOutput2, state]) => {
      if (followOutput2 && !state.atBottom && state.notAtBottomBecause === "VIEWPORT_HEIGHT_DECREASING") {
        scrollToBottom("auto");
      }
    });
    return { followOutput, autoscrollToBottom };
  },
  tup(sizeSystem, stateFlagsSystem, scrollToIndexSystem, initialTopMostItemIndexSystem, propsReadySystem, loggerSystem, domIOSystem)
);
function groupCountsToIndicesAndCount(counts) {
  return counts.reduce(
    (acc, groupCount) => {
      acc.groupIndices.push(acc.totalCount);
      acc.totalCount += groupCount + 1;
      return acc;
    },
    {
      totalCount: 0,
      groupIndices: []
    }
  );
}
const groupedListSystem = system(([{ totalCount, groupIndices, sizes }, { scrollTop, headerHeight }]) => {
  const groupCounts = stream();
  const topItemsIndexes = stream();
  const groupIndicesAndCount = streamFromEmitter(pipe(groupCounts, map(groupCountsToIndicesAndCount)));
  connect(
    pipe(
      groupIndicesAndCount,
      map((value) => value.totalCount)
    ),
    totalCount
  );
  connect(
    pipe(
      groupIndicesAndCount,
      map((value) => value.groupIndices)
    ),
    groupIndices
  );
  connect(
    pipe(
      combineLatest(scrollTop, sizes, headerHeight),
      filter(([_, sizes2]) => hasGroups(sizes2)),
      map(([scrollTop2, state, headerHeight2]) => findMaxKeyValue(state.groupOffsetTree, Math.max(scrollTop2 - headerHeight2, 0), "v")[0]),
      distinctUntilChanged(),
      map((index) => [index])
    ),
    topItemsIndexes
  );
  return { groupCounts, topItemsIndexes };
}, tup(sizeSystem, domIOSystem));
function tupleComparator(prev, current) {
  return !!(prev && prev[0] === current[0] && prev[1] === current[1]);
}
function rangeComparator(prev, next) {
  return !!(prev && prev.startIndex === next.startIndex && prev.endIndex === next.endIndex);
}
const TOP = "top";
const BOTTOM = "bottom";
const NONE = "none";
function getOverscan(overscan, end, direction) {
  if (typeof overscan === "number") {
    return direction === UP && end === TOP || direction === DOWN && end === BOTTOM ? overscan : 0;
  } else {
    if (direction === UP) {
      return end === TOP ? overscan.main : overscan.reverse;
    } else {
      return end === BOTTOM ? overscan.main : overscan.reverse;
    }
  }
}
function getViewportIncrease(value, end) {
  return typeof value === "number" ? value : value[end] || 0;
}
const sizeRangeSystem = system(
  ([{ scrollTop, viewportHeight, deviation, headerHeight, fixedHeaderHeight }]) => {
    const listBoundary = stream();
    const topListHeight = statefulStream(0);
    const increaseViewportBy = statefulStream(0);
    const overscan = statefulStream(0);
    const visibleRange = statefulStreamFromEmitter(
      pipe(
        combineLatest(
          duc(scrollTop),
          duc(viewportHeight),
          duc(headerHeight),
          duc(listBoundary, tupleComparator),
          duc(overscan),
          duc(topListHeight),
          duc(fixedHeaderHeight),
          duc(deviation),
          duc(increaseViewportBy)
        ),
        map(
          ([
            scrollTop2,
            viewportHeight2,
            headerHeight2,
            [listTop, listBottom],
            overscan2,
            topListHeight2,
            fixedHeaderHeight2,
            deviation2,
            increaseViewportBy2
          ]) => {
            const top = scrollTop2 - deviation2;
            const stickyHeaderHeight = topListHeight2 + fixedHeaderHeight2;
            const headerVisible = Math.max(headerHeight2 - top, 0);
            let direction = NONE;
            const topViewportAddition = getViewportIncrease(increaseViewportBy2, TOP);
            const bottomViewportAddition = getViewportIncrease(increaseViewportBy2, BOTTOM);
            listTop -= deviation2;
            listTop += headerHeight2 + fixedHeaderHeight2;
            listBottom += headerHeight2 + fixedHeaderHeight2;
            listBottom -= deviation2;
            if (listTop > scrollTop2 + stickyHeaderHeight - topViewportAddition) {
              direction = UP;
            }
            if (listBottom < scrollTop2 - headerVisible + viewportHeight2 + bottomViewportAddition) {
              direction = DOWN;
            }
            if (direction !== NONE) {
              return [
                Math.max(top - headerHeight2 - getOverscan(overscan2, TOP, direction) - topViewportAddition, 0),
                top - headerVisible - fixedHeaderHeight2 + viewportHeight2 + getOverscan(overscan2, BOTTOM, direction) + bottomViewportAddition
              ];
            }
            return null;
          }
        ),
        filter((value) => value != null),
        distinctUntilChanged(tupleComparator)
      ),
      [0, 0]
    );
    return {
      // input
      listBoundary,
      overscan,
      topListHeight,
      increaseViewportBy,
      // output
      visibleRange
    };
  },
  tup(domIOSystem),
  { singleton: true }
);
function probeItemSet(index, sizes, data) {
  if (hasGroups(sizes)) {
    const itemIndex = originalIndexFromItemIndex(index, sizes);
    const groupIndex = findMaxKeyValue(sizes.groupOffsetTree, itemIndex)[0];
    return [
      { index: groupIndex, size: 0, offset: 0 },
      { index: itemIndex, size: 0, offset: 0, data: data && data[0] }
    ];
  }
  return [{ index, size: 0, offset: 0, data: data && data[0] }];
}
const EMPTY_LIST_STATE = {
  items: [],
  topItems: [],
  offsetTop: 0,
  offsetBottom: 0,
  top: 0,
  bottom: 0,
  topListHeight: 0,
  totalCount: 0,
  firstItemIndex: 0
};
function transposeItems(items, sizes, firstItemIndex) {
  if (items.length === 0) {
    return [];
  }
  if (!hasGroups(sizes)) {
    return items.map((item) => ({ ...item, index: item.index + firstItemIndex, originalIndex: item.index }));
  }
  const startIndex = items[0].index;
  const endIndex = items[items.length - 1].index;
  const transposedItems = [];
  const groupRanges = rangesWithin(sizes.groupOffsetTree, startIndex, endIndex);
  let currentRange = void 0;
  let currentGroupIndex = 0;
  for (const item of items) {
    if (!currentRange || currentRange.end < item.index) {
      currentRange = groupRanges.shift();
      currentGroupIndex = sizes.groupIndices.indexOf(currentRange.start);
    }
    let transposedItem;
    if (item.index === currentRange.start) {
      transposedItem = {
        type: "group",
        index: currentGroupIndex
      };
    } else {
      transposedItem = {
        index: item.index - (currentGroupIndex + 1) + firstItemIndex,
        groupIndex: currentGroupIndex
      };
    }
    transposedItems.push({
      ...transposedItem,
      size: item.size,
      offset: item.offset,
      originalIndex: item.index,
      data: item.data
    });
  }
  return transposedItems;
}
function buildListState(items, topItems, totalCount, gap, sizes, firstItemIndex) {
  const { lastSize, lastOffset, lastIndex } = sizes;
  let offsetTop = 0;
  let bottom = 0;
  if (items.length > 0) {
    offsetTop = items[0].offset;
    const lastItem = items[items.length - 1];
    bottom = lastItem.offset + lastItem.size;
  }
  const itemCount = totalCount - lastIndex;
  const total = lastOffset + itemCount * lastSize + (itemCount - 1) * gap;
  const top = offsetTop;
  const offsetBottom = total - bottom;
  return {
    items: transposeItems(items, sizes, firstItemIndex),
    topItems: transposeItems(topItems, sizes, firstItemIndex),
    topListHeight: topItems.reduce((height, item) => item.size + height, 0),
    offsetTop,
    offsetBottom,
    top,
    bottom,
    totalCount,
    firstItemIndex
  };
}
function buildListStateFromItemCount(itemCount, initialTopMostItemIndex, sizes, firstItemIndex, gap, data) {
  let includedGroupsCount = 0;
  if (sizes.groupIndices.length > 0) {
    for (const index of sizes.groupIndices) {
      if (index - includedGroupsCount >= itemCount) {
        break;
      }
      includedGroupsCount++;
    }
  }
  const adjustedCount = itemCount + includedGroupsCount;
  const initialTopMostItemIndexNumber = getInitialTopMostItemIndexNumber(initialTopMostItemIndex, adjustedCount);
  const items = Array.from({ length: adjustedCount }).map((_, index) => ({
    index: index + initialTopMostItemIndexNumber,
    size: 0,
    offset: 0,
    data: data[index + initialTopMostItemIndexNumber]
  }));
  return buildListState(items, [], adjustedCount, gap, sizes, firstItemIndex);
}
const listStateSystem = system(
  ([
    { sizes, totalCount, data, firstItemIndex, gap },
    groupedListSystem2,
    { visibleRange, listBoundary, topListHeight: rangeTopListHeight },
    { scrolledToInitialItem, initialTopMostItemIndex },
    { topListHeight },
    stateFlags,
    { didMount },
    { recalcInProgress }
  ]) => {
    const topItemsIndexes = statefulStream([]);
    const initialItemCount = statefulStream(0);
    const itemsRendered = stream();
    connect(groupedListSystem2.topItemsIndexes, topItemsIndexes);
    const listState = statefulStreamFromEmitter(
      pipe(
        combineLatest(
          didMount,
          recalcInProgress,
          duc(visibleRange, tupleComparator),
          duc(totalCount),
          duc(sizes),
          duc(initialTopMostItemIndex),
          scrolledToInitialItem,
          duc(topItemsIndexes),
          duc(firstItemIndex),
          duc(gap),
          data
        ),
        filter(([mount, recalcInProgress2, , totalCount2, , , , , , , data2]) => {
          const dataChangeInProgress = data2 && data2.length !== totalCount2;
          return mount && !recalcInProgress2 && !dataChangeInProgress;
        }),
        map(
          ([
            ,
            ,
            [startOffset, endOffset],
            totalCount2,
            sizes2,
            initialTopMostItemIndex2,
            scrolledToInitialItem2,
            topItemsIndexes2,
            firstItemIndex2,
            gap2,
            data2
          ]) => {
            const sizesValue = sizes2;
            const { sizeTree, offsetTree } = sizesValue;
            const initialItemCountValue = getValue(initialItemCount);
            if (totalCount2 === 0) {
              return { ...EMPTY_LIST_STATE, totalCount: totalCount2 };
            }
            if (startOffset === 0 && endOffset === 0) {
              if (initialItemCountValue === 0) {
                return { ...EMPTY_LIST_STATE, totalCount: totalCount2 };
              } else {
                return buildListStateFromItemCount(initialItemCountValue, initialTopMostItemIndex2, sizes2, firstItemIndex2, gap2, data2 || []);
              }
            }
            if (empty(sizeTree)) {
              if (initialItemCountValue > 0) {
                return null;
              }
              const state = buildListState(
                probeItemSet(getInitialTopMostItemIndexNumber(initialTopMostItemIndex2, totalCount2), sizesValue, data2),
                [],
                totalCount2,
                gap2,
                sizesValue,
                firstItemIndex2
              );
              return state;
            }
            const topItems = [];
            if (topItemsIndexes2.length > 0) {
              const startIndex = topItemsIndexes2[0];
              const endIndex = topItemsIndexes2[topItemsIndexes2.length - 1];
              let offset = 0;
              for (const range of rangesWithin(sizeTree, startIndex, endIndex)) {
                const size = range.value;
                const rangeStartIndex = Math.max(range.start, startIndex);
                const rangeEndIndex = Math.min(range.end, endIndex);
                for (let i = rangeStartIndex; i <= rangeEndIndex; i++) {
                  topItems.push({ index: i, size, offset, data: data2 && data2[i] });
                  offset += size;
                }
              }
            }
            if (!scrolledToInitialItem2) {
              return buildListState([], topItems, totalCount2, gap2, sizesValue, firstItemIndex2);
            }
            const minStartIndex = topItemsIndexes2.length > 0 ? topItemsIndexes2[topItemsIndexes2.length - 1] + 1 : 0;
            const offsetPointRanges = rangesWithinOffsets(offsetTree, startOffset, endOffset, minStartIndex);
            if (offsetPointRanges.length === 0) {
              return null;
            }
            const maxIndex = totalCount2 - 1;
            const items = tap([], (result) => {
              for (const range of offsetPointRanges) {
                const point = range.value;
                let offset = point.offset;
                let rangeStartIndex = range.start;
                const size = point.size;
                if (point.offset < startOffset) {
                  rangeStartIndex += Math.floor((startOffset - point.offset + gap2) / (size + gap2));
                  const itemCount = rangeStartIndex - range.start;
                  offset += itemCount * size + itemCount * gap2;
                }
                if (rangeStartIndex < minStartIndex) {
                  offset += (minStartIndex - rangeStartIndex) * size;
                  rangeStartIndex = minStartIndex;
                }
                const endIndex = Math.min(range.end, maxIndex);
                for (let i = rangeStartIndex; i <= endIndex; i++) {
                  if (offset >= endOffset) {
                    break;
                  }
                  result.push({ index: i, size, offset, data: data2 && data2[i] });
                  offset += size + gap2;
                }
              }
            });
            return buildListState(items, topItems, totalCount2, gap2, sizesValue, firstItemIndex2);
          }
        ),
        //@ts-expect-error filter needs to be fixed
        filter((value) => value !== null),
        distinctUntilChanged()
      ),
      EMPTY_LIST_STATE
    );
    connect(
      pipe(
        data,
        filter(isDefined),
        map((data2) => data2 == null ? void 0 : data2.length)
      ),
      totalCount
    );
    connect(
      pipe(
        listState,
        map((value) => value.topListHeight)
      ),
      topListHeight
    );
    connect(topListHeight, rangeTopListHeight);
    connect(
      pipe(
        listState,
        map((state) => [state.top, state.bottom])
      ),
      listBoundary
    );
    connect(
      pipe(
        listState,
        map((state) => state.items)
      ),
      itemsRendered
    );
    const endReached = streamFromEmitter(
      pipe(
        listState,
        filter(({ items }) => items.length > 0),
        withLatestFrom(totalCount, data),
        filter(([{ items }, totalCount2]) => items[items.length - 1].originalIndex === totalCount2 - 1),
        map(([, totalCount2, data2]) => [totalCount2 - 1, data2]),
        distinctUntilChanged(tupleComparator),
        map(([count]) => count)
      )
    );
    const startReached = streamFromEmitter(
      pipe(
        listState,
        throttleTime(200),
        filter(({ items, topItems }) => {
          return items.length > 0 && items[0].originalIndex === topItems.length;
        }),
        map(({ items }) => items[0].index),
        distinctUntilChanged()
      )
    );
    const rangeChanged = streamFromEmitter(
      pipe(
        listState,
        filter(({ items }) => items.length > 0),
        map(({ items }) => {
          let startIndex = 0;
          let endIndex = items.length - 1;
          while (items[startIndex].type === "group" && startIndex < endIndex) {
            startIndex++;
          }
          while (items[endIndex].type === "group" && endIndex > startIndex) {
            endIndex--;
          }
          return {
            startIndex: items[startIndex].index,
            endIndex: items[endIndex].index
          };
        }),
        distinctUntilChanged(rangeComparator)
      )
    );
    return { listState, topItemsIndexes, endReached, startReached, rangeChanged, itemsRendered, initialItemCount, ...stateFlags };
  },
  tup(
    sizeSystem,
    groupedListSystem,
    sizeRangeSystem,
    initialTopMostItemIndexSystem,
    scrollToIndexSystem,
    stateFlagsSystem,
    propsReadySystem,
    recalcSystem
  ),
  { singleton: true }
);
const initialItemCountSystem = system(
  ([{ sizes, firstItemIndex, data, gap }, { initialTopMostItemIndex }, { initialItemCount, listState }, { didMount }]) => {
    connect(
      pipe(
        didMount,
        withLatestFrom(initialItemCount),
        filter(([, count]) => count !== 0),
        withLatestFrom(initialTopMostItemIndex, sizes, firstItemIndex, gap, data),
        map(([[, count], initialTopMostItemIndexValue, sizes2, firstItemIndex2, gap2, data2 = []]) => {
          return buildListStateFromItemCount(count, initialTopMostItemIndexValue, sizes2, firstItemIndex2, gap2, data2);
        })
      ),
      listState
    );
    return {};
  },
  tup(sizeSystem, initialTopMostItemIndexSystem, listStateSystem, propsReadySystem),
  { singleton: true }
);
const scrollSeekSystem = system(
  ([{ scrollVelocity }]) => {
    const isSeeking = statefulStream(false);
    const rangeChanged = stream();
    const scrollSeekConfiguration = statefulStream(false);
    connect(
      pipe(
        scrollVelocity,
        withLatestFrom(scrollSeekConfiguration, isSeeking, rangeChanged),
        filter(([_, config]) => !!config),
        map(([speed, config, isSeeking2, range]) => {
          const { exit, enter } = config;
          if (isSeeking2) {
            if (exit(speed, range)) {
              return false;
            }
          } else {
            if (enter(speed, range)) {
              return true;
            }
          }
          return isSeeking2;
        }),
        distinctUntilChanged()
      ),
      isSeeking
    );
    subscribe(
      pipe(combineLatest(isSeeking, scrollVelocity, rangeChanged), withLatestFrom(scrollSeekConfiguration)),
      ([[isSeeking2, velocity, range], config]) => isSeeking2 && config && config.change && config.change(velocity, range)
    );
    return { isSeeking, scrollSeekConfiguration, scrollVelocity, scrollSeekRangeChanged: rangeChanged };
  },
  tup(stateFlagsSystem),
  { singleton: true }
);
const topItemCountSystem = system(([{ topItemsIndexes }]) => {
  const topItemCount = statefulStream(0);
  connect(
    pipe(
      topItemCount,
      filter((length) => length > 0),
      map((length) => Array.from({ length }).map((_, index) => index))
    ),
    topItemsIndexes
  );
  return { topItemCount };
}, tup(listStateSystem));
const totalListHeightSystem = system(
  ([{ footerHeight, headerHeight, fixedHeaderHeight, fixedFooterHeight }, { listState }]) => {
    const totalListHeightChanged = stream();
    const totalListHeight = statefulStreamFromEmitter(
      pipe(
        combineLatest(footerHeight, fixedFooterHeight, headerHeight, fixedHeaderHeight, listState),
        map(([footerHeight2, fixedFooterHeight2, headerHeight2, fixedHeaderHeight2, listState2]) => {
          return footerHeight2 + fixedFooterHeight2 + headerHeight2 + fixedHeaderHeight2 + listState2.offsetBottom + listState2.bottom;
        })
      ),
      0
    );
    connect(duc(totalListHeight), totalListHeightChanged);
    return { totalListHeight, totalListHeightChanged };
  },
  tup(domIOSystem, listStateSystem),
  { singleton: true }
);
function simpleMemoize(func) {
  let called = false;
  let result;
  return () => {
    if (!called) {
      called = true;
      result = func();
    }
    return result;
  };
}
const isMobileSafari = simpleMemoize(() => {
  return /iP(ad|od|hone)/i.test(navigator.userAgent) && /WebKit/i.test(navigator.userAgent);
});
const upwardScrollFixSystem = system(
  ([
    { scrollBy, scrollTop, deviation, scrollingInProgress },
    { isScrolling, isAtBottom, scrollDirection, lastJumpDueToItemResize },
    { listState },
    { beforeUnshiftWith, shiftWithOffset, sizes, gap },
    { log },
    { recalcInProgress }
  ]) => {
    const deviationOffset = streamFromEmitter(
      pipe(
        listState,
        withLatestFrom(lastJumpDueToItemResize),
        scan(
          ([, prevItems, prevTotalCount, prevTotalHeight], [{ items, totalCount, bottom, offsetBottom }, lastJumpDueToItemResize2]) => {
            const totalHeight = bottom + offsetBottom;
            let newDev = 0;
            if (prevTotalCount === totalCount) {
              if (prevItems.length > 0 && items.length > 0) {
                const atStart = items[0].originalIndex === 0 && prevItems[0].originalIndex === 0;
                if (!atStart) {
                  newDev = totalHeight - prevTotalHeight;
                  if (newDev !== 0) {
                    newDev += lastJumpDueToItemResize2;
                  }
                }
              }
            }
            return [newDev, items, totalCount, totalHeight];
          },
          [0, [], 0, 0]
        ),
        filter(([amount]) => amount !== 0),
        withLatestFrom(scrollTop, scrollDirection, scrollingInProgress, isAtBottom, log, recalcInProgress),
        filter(([, scrollTop2, scrollDirection2, scrollingInProgress2, , , recalcInProgress2]) => {
          return !recalcInProgress2 && !scrollingInProgress2 && scrollTop2 !== 0 && scrollDirection2 === UP;
        }),
        map(([[amount], , , , , log2]) => {
          log2("Upward scrolling compensation", { amount }, LogLevel.DEBUG);
          return amount;
        })
      )
    );
    function scrollByWith(offset) {
      if (offset > 0) {
        publish(scrollBy, { top: -offset, behavior: "auto" });
        publish(deviation, 0);
      } else {
        publish(deviation, 0);
        publish(scrollBy, { top: -offset, behavior: "auto" });
      }
    }
    subscribe(pipe(deviationOffset, withLatestFrom(deviation, isScrolling)), ([offset, deviationAmount, isScrolling2]) => {
      if (isScrolling2 && isMobileSafari()) {
        publish(deviation, deviationAmount - offset);
      } else {
        scrollByWith(-offset);
      }
    });
    subscribe(
      pipe(
        combineLatest(statefulStreamFromEmitter(isScrolling, false), deviation, recalcInProgress),
        filter(([is, deviation2, recalc]) => !is && !recalc && deviation2 !== 0),
        map(([_, deviation2]) => deviation2),
        throttleTime(1)
      ),
      scrollByWith
    );
    connect(
      pipe(
        shiftWithOffset,
        map((offset) => {
          return { top: -offset };
        })
      ),
      scrollBy
    );
    subscribe(
      pipe(
        beforeUnshiftWith,
        withLatestFrom(sizes, gap),
        map(([offset, { lastSize: defaultItemSize, groupIndices, sizeTree }, gap2]) => {
          function getItemOffset(itemCount) {
            return itemCount * (defaultItemSize + gap2);
          }
          if (groupIndices.length === 0) {
            return getItemOffset(offset);
          } else {
            let amount = 0;
            const defaultGroupSize = find(sizeTree, 0);
            let recognizedOffsetItems = 0;
            let groupIndex = 0;
            while (recognizedOffsetItems < offset) {
              recognizedOffsetItems++;
              amount += defaultGroupSize;
              let groupItemCount = groupIndices.length === groupIndex + 1 ? Infinity : groupIndices[groupIndex + 1] - groupIndices[groupIndex] - 1;
              if (recognizedOffsetItems + groupItemCount > offset) {
                amount -= defaultGroupSize;
                groupItemCount = offset - recognizedOffsetItems + 1;
              }
              recognizedOffsetItems += groupItemCount;
              amount += getItemOffset(groupItemCount);
              groupIndex++;
            }
            return amount;
          }
        })
      ),
      (offset) => {
        publish(deviation, offset);
        requestAnimationFrame(() => {
          publish(scrollBy, { top: offset });
          requestAnimationFrame(() => {
            publish(deviation, 0);
            publish(recalcInProgress, false);
          });
        });
      }
    );
    return { deviation };
  },
  tup(domIOSystem, stateFlagsSystem, listStateSystem, sizeSystem, loggerSystem, recalcSystem)
);
const initialScrollTopSystem = system(
  ([{ didMount }, { scrollTo }, { listState }]) => {
    const initialScrollTop = statefulStream(0);
    subscribe(
      pipe(
        didMount,
        withLatestFrom(initialScrollTop),
        filter(([, offset]) => offset !== 0),
        map(([, offset]) => ({ top: offset }))
      ),
      (location) => {
        handleNext(
          pipe(
            listState,
            skip(1),
            filter((state) => state.items.length > 1)
          ),
          () => {
            requestAnimationFrame(() => {
              publish(scrollTo, location);
            });
          }
        );
      }
    );
    return {
      initialScrollTop
    };
  },
  tup(propsReadySystem, domIOSystem, listStateSystem),
  { singleton: true }
);
const alignToBottomSystem = system(
  ([{ viewportHeight }, { totalListHeight }]) => {
    const alignToBottom = statefulStream(false);
    const paddingTopAddition = statefulStreamFromEmitter(
      pipe(
        combineLatest(alignToBottom, viewportHeight, totalListHeight),
        filter(([enabled]) => enabled),
        map(([, viewportHeight2, totalListHeight2]) => {
          return Math.max(0, viewportHeight2 - totalListHeight2);
        }),
        throttleTime(0),
        distinctUntilChanged()
      ),
      0
    );
    return { alignToBottom, paddingTopAddition };
  },
  tup(domIOSystem, totalListHeightSystem),
  { singleton: true }
);
const windowScrollerSystem = system(([{ scrollTo, scrollContainerState }]) => {
  const windowScrollContainerState = stream();
  const windowViewportRect = stream();
  const windowScrollTo = stream();
  const useWindowScroll = statefulStream(false);
  const customScrollParent = statefulStream(void 0);
  connect(
    pipe(
      combineLatest(windowScrollContainerState, windowViewportRect),
      map(([{ viewportHeight, scrollTop: windowScrollTop, scrollHeight }, { offsetTop }]) => {
        return {
          scrollTop: Math.max(0, windowScrollTop - offsetTop),
          scrollHeight,
          viewportHeight
        };
      })
    ),
    scrollContainerState
  );
  connect(
    pipe(
      scrollTo,
      withLatestFrom(windowViewportRect),
      map(([scrollTo2, { offsetTop }]) => {
        return {
          ...scrollTo2,
          top: scrollTo2.top + offsetTop
        };
      })
    ),
    windowScrollTo
  );
  return {
    // config
    useWindowScroll,
    customScrollParent,
    // input
    windowScrollContainerState,
    windowViewportRect,
    // signals
    windowScrollTo
  };
}, tup(domIOSystem));
const defaultCalculateViewLocation = ({
  itemTop: itemTop2,
  itemBottom,
  viewportTop,
  viewportBottom,
  locationParams: { behavior, align, ...rest }
}) => {
  if (itemTop2 < viewportTop) {
    return { ...rest, behavior, align: align != null ? align : "start" };
  }
  if (itemBottom > viewportBottom) {
    return { ...rest, behavior, align: align != null ? align : "end" };
  }
  return null;
};
const scrollIntoViewSystem = system(
  ([
    { sizes, totalCount, gap },
    { scrollTop, viewportHeight, headerHeight, fixedHeaderHeight, fixedFooterHeight, scrollingInProgress },
    { scrollToIndex }
  ]) => {
    const scrollIntoView = stream();
    connect(
      pipe(
        scrollIntoView,
        withLatestFrom(sizes, viewportHeight, totalCount, headerHeight, fixedHeaderHeight, fixedFooterHeight, scrollTop),
        withLatestFrom(gap),
        map(([[viewLocation, sizes2, viewportHeight2, totalCount2, headerHeight2, fixedHeaderHeight2, fixedFooterHeight2, scrollTop2], gap2]) => {
          const { done, behavior, align, calculateViewLocation = defaultCalculateViewLocation, ...rest } = viewLocation;
          const actualIndex = originalIndexFromLocation(viewLocation, sizes2, totalCount2 - 1);
          const itemTop2 = offsetOf(actualIndex, sizes2.offsetTree, gap2) + headerHeight2 + fixedHeaderHeight2;
          const itemBottom = itemTop2 + findMaxKeyValue(sizes2.sizeTree, actualIndex)[1];
          const viewportTop = scrollTop2 + fixedHeaderHeight2;
          const viewportBottom = scrollTop2 + viewportHeight2 - fixedFooterHeight2;
          const location = calculateViewLocation({
            itemTop: itemTop2,
            itemBottom,
            viewportTop,
            viewportBottom,
            locationParams: { behavior, align, ...rest }
          });
          if (location) {
            done && handleNext(
              pipe(
                scrollingInProgress,
                filter((value) => value === false),
                // skips the initial publish of false, and the cleanup call.
                // but if scrollingInProgress is true, we skip the initial publish.
                skip(getValue(scrollingInProgress) ? 1 : 2)
              ),
              done
            );
          } else {
            done && done();
          }
          return location;
        }),
        filter((value) => value !== null)
      ),
      scrollToIndex
    );
    return {
      scrollIntoView
    };
  },
  tup(sizeSystem, domIOSystem, scrollToIndexSystem, listStateSystem, loggerSystem),
  { singleton: true }
);
const stateLoadSystem = system(
  ([
    { sizes, sizeRanges },
    { scrollTop, headerHeight },
    { initialTopMostItemIndex },
    { didMount },
    { useWindowScroll, windowScrollContainerState, windowViewportRect }
  ]) => {
    const getState = stream();
    const restoreStateFrom = statefulStream(void 0);
    const statefulWindowScrollContainerState = statefulStream(null);
    const statefulWindowViewportRect = statefulStream(null);
    connect(windowScrollContainerState, statefulWindowScrollContainerState);
    connect(windowViewportRect, statefulWindowViewportRect);
    subscribe(
      pipe(
        getState,
        withLatestFrom(sizes, scrollTop, useWindowScroll, statefulWindowScrollContainerState, statefulWindowViewportRect, headerHeight)
      ),
      ([callback, sizes2, scrollTop2, useWindowScroll2, windowScrollContainerState2, windowViewportRect2, headerHeight2]) => {
        const ranges = sizeTreeToRanges(sizes2.sizeTree);
        if (useWindowScroll2 && windowScrollContainerState2 !== null && windowViewportRect2 !== null) {
          scrollTop2 = windowScrollContainerState2.scrollTop - windowViewportRect2.offsetTop;
        }
        scrollTop2 -= headerHeight2;
        callback({ ranges, scrollTop: scrollTop2 });
      }
    );
    connect(pipe(restoreStateFrom, filter(isDefined), map(locationFromSnapshot)), initialTopMostItemIndex);
    connect(
      pipe(
        didMount,
        withLatestFrom(restoreStateFrom),
        filter(([, state]) => state !== void 0),
        distinctUntilChanged(),
        map(([, snapshot]) => {
          return snapshot.ranges;
        })
      ),
      sizeRanges
    );
    return {
      getState,
      restoreStateFrom
    };
  },
  tup(sizeSystem, domIOSystem, initialTopMostItemIndexSystem, propsReadySystem, windowScrollerSystem)
);
function locationFromSnapshot(snapshot) {
  return { offset: snapshot.scrollTop, index: 0, align: "start" };
}
const featureGroup1System = system(
  ([
    sizeRange,
    initialItemCount,
    propsReady,
    scrollSeek,
    totalListHeight,
    initialScrollTopSystem2,
    alignToBottom,
    windowScroller,
    scrollIntoView,
    logger
  ]) => {
    return {
      ...sizeRange,
      ...initialItemCount,
      ...propsReady,
      ...scrollSeek,
      ...totalListHeight,
      ...initialScrollTopSystem2,
      ...alignToBottom,
      ...windowScroller,
      ...scrollIntoView,
      ...logger
    };
  },
  tup(
    sizeRangeSystem,
    initialItemCountSystem,
    propsReadySystem,
    scrollSeekSystem,
    totalListHeightSystem,
    initialScrollTopSystem,
    alignToBottomSystem,
    windowScrollerSystem,
    scrollIntoViewSystem,
    loggerSystem
  )
);
const listSystem = system(
  ([
    {
      totalCount,
      sizeRanges,
      fixedItemSize,
      defaultItemSize,
      trackItemSizes,
      itemSize,
      data,
      firstItemIndex,
      groupIndices,
      statefulTotalCount,
      gap,
      sizes
    },
    { initialTopMostItemIndex, scrolledToInitialItem, initialItemFinalLocationReached },
    domIO,
    stateLoad,
    followOutput,
    { listState, topItemsIndexes, ...flags },
    { scrollToIndex },
    _,
    { topItemCount },
    { groupCounts },
    featureGroup1
  ]) => {
    connect(flags.rangeChanged, featureGroup1.scrollSeekRangeChanged);
    connect(
      pipe(
        featureGroup1.windowViewportRect,
        map((value) => value.visibleHeight)
      ),
      domIO.viewportHeight
    );
    return {
      // input
      totalCount,
      data,
      firstItemIndex,
      sizeRanges,
      initialTopMostItemIndex,
      scrolledToInitialItem,
      initialItemFinalLocationReached,
      topItemsIndexes,
      topItemCount,
      groupCounts,
      fixedItemHeight: fixedItemSize,
      defaultItemHeight: defaultItemSize,
      gap,
      ...followOutput,
      // output
      statefulTotalCount,
      listState,
      scrollToIndex,
      trackItemSizes,
      itemSize,
      groupIndices,
      // exported from stateFlagsSystem
      ...flags,
      // the bag of IO from featureGroup1System
      ...featureGroup1,
      ...domIO,
      sizes,
      ...stateLoad
    };
  },
  tup(
    sizeSystem,
    initialTopMostItemIndexSystem,
    domIOSystem,
    stateLoadSystem,
    followOutputSystem,
    listStateSystem,
    scrollToIndexSystem,
    upwardScrollFixSystem,
    topItemCountSystem,
    groupedListSystem,
    featureGroup1System
  )
);
const WEBKIT_STICKY = "-webkit-sticky";
const STICKY = "sticky";
const positionStickyCssValue = simpleMemoize(() => {
  if (typeof document === "undefined") {
    return STICKY;
  }
  const node = document.createElement("div");
  node.style.position = WEBKIT_STICKY;
  return node.style.position === WEBKIT_STICKY ? WEBKIT_STICKY : STICKY;
});
function useWindowViewportRectRef(callback, customScrollParent, skipAnimationFrame) {
  const viewportInfo = React.useRef(null);
  const calculateInfo = React.useCallback(
    (element) => {
      if (element === null || !element.offsetParent) {
        return;
      }
      const rect = element.getBoundingClientRect();
      const visibleWidth = rect.width;
      let visibleHeight, offsetTop;
      if (customScrollParent) {
        const customScrollParentRect = customScrollParent.getBoundingClientRect();
        const deltaTop = rect.top - customScrollParentRect.top;
        visibleHeight = customScrollParentRect.height - Math.max(0, deltaTop);
        offsetTop = deltaTop + customScrollParent.scrollTop;
      } else {
        visibleHeight = window.innerHeight - Math.max(0, rect.top);
        offsetTop = rect.top + window.pageYOffset;
      }
      viewportInfo.current = {
        offsetTop,
        visibleHeight,
        visibleWidth
      };
      callback(viewportInfo.current);
    },
    [callback, customScrollParent]
  );
  const { callbackRef, ref } = useSizeWithElRef(calculateInfo, true, skipAnimationFrame);
  const scrollAndResizeEventHandler = React.useCallback(() => {
    calculateInfo(ref.current);
  }, [calculateInfo, ref]);
  React.useEffect(() => {
    if (customScrollParent) {
      customScrollParent.addEventListener("scroll", scrollAndResizeEventHandler);
      const observer = new ResizeObserver(() => {
        requestAnimationFrame(scrollAndResizeEventHandler);
      });
      observer.observe(customScrollParent);
      return () => {
        customScrollParent.removeEventListener("scroll", scrollAndResizeEventHandler);
        observer.unobserve(customScrollParent);
      };
    } else {
      window.addEventListener("scroll", scrollAndResizeEventHandler);
      window.addEventListener("resize", scrollAndResizeEventHandler);
      return () => {
        window.removeEventListener("scroll", scrollAndResizeEventHandler);
        window.removeEventListener("resize", scrollAndResizeEventHandler);
      };
    }
  }, [scrollAndResizeEventHandler, customScrollParent]);
  return callbackRef;
}
const VirtuosoMockContext = React.createContext(void 0);
const VirtuosoGridMockContext = React.createContext(void 0);
function identity(value) {
  return value;
}
const listComponentPropsSystem = /* @__PURE__ */ system(() => {
  const itemContent = statefulStream((index) => `Item ${index}`);
  const context = statefulStream(null);
  const groupContent = statefulStream((index) => `Group ${index}`);
  const components = statefulStream({});
  const computeItemKey = statefulStream(identity);
  const HeaderFooterTag = statefulStream("div");
  const scrollerRef = statefulStream(noop);
  const distinctProp = (propName, defaultValue = null) => {
    return statefulStreamFromEmitter(
      pipe(
        components,
        map((components2) => components2[propName]),
        distinctUntilChanged()
      ),
      defaultValue
    );
  };
  return {
    context,
    itemContent,
    groupContent,
    components,
    computeItemKey,
    HeaderFooterTag,
    scrollerRef,
    FooterComponent: distinctProp("Footer"),
    HeaderComponent: distinctProp("Header"),
    TopItemListComponent: distinctProp("TopItemList"),
    ListComponent: distinctProp("List", "div"),
    ItemComponent: distinctProp("Item", "div"),
    GroupComponent: distinctProp("Group", "div"),
    ScrollerComponent: distinctProp("Scroller", "div"),
    EmptyPlaceholder: distinctProp("EmptyPlaceholder"),
    ScrollSeekPlaceholder: distinctProp("ScrollSeekPlaceholder")
  };
});
const combinedSystem$2 = /* @__PURE__ */ system(([listSystem2, propsSystem]) => {
  return { ...listSystem2, ...propsSystem };
}, tup(listSystem, listComponentPropsSystem));
const DefaultScrollSeekPlaceholder$1 = ({ height }) => /* @__PURE__ */ jsx("div", { style: { height } });
const GROUP_STYLE = { position: positionStickyCssValue(), zIndex: 1, overflowAnchor: "none" };
const ITEM_STYLE$1 = { overflowAnchor: "none" };
const HORIZONTAL_ITEM_STYLE = { ...ITEM_STYLE$1, display: "inline-block", height: "100%" };
const Items$1 = /* @__PURE__ */ React.memo(function VirtuosoItems({ showTopList = false }) {
  const listState = useEmitterValue$2("listState");
  const sizeRanges = usePublisher$2("sizeRanges");
  const useWindowScroll = useEmitterValue$2("useWindowScroll");
  const customScrollParent = useEmitterValue$2("customScrollParent");
  const windowScrollContainerStateCallback = usePublisher$2("windowScrollContainerState");
  const _scrollContainerStateCallback = usePublisher$2("scrollContainerState");
  const scrollContainerStateCallback = customScrollParent || useWindowScroll ? windowScrollContainerStateCallback : _scrollContainerStateCallback;
  const itemContent = useEmitterValue$2("itemContent");
  const context = useEmitterValue$2("context");
  const groupContent = useEmitterValue$2("groupContent");
  const trackItemSizes = useEmitterValue$2("trackItemSizes");
  const itemSize = useEmitterValue$2("itemSize");
  const log = useEmitterValue$2("log");
  const listGap = usePublisher$2("gap");
  const horizontalDirection = useEmitterValue$2("horizontalDirection");
  const { callbackRef } = useChangedListContentsSizes(
    sizeRanges,
    itemSize,
    trackItemSizes,
    showTopList ? noop : scrollContainerStateCallback,
    log,
    listGap,
    customScrollParent,
    horizontalDirection,
    useEmitterValue$2("skipAnimationFrameInResizeObserver")
  );
  const [deviation, setDeviation] = React.useState(0);
  useEmitter$2("deviation", (value) => {
    if (deviation !== value) {
      setDeviation(value);
    }
  });
  const EmptyPlaceholder = useEmitterValue$2("EmptyPlaceholder");
  const ScrollSeekPlaceholder = useEmitterValue$2("ScrollSeekPlaceholder") || DefaultScrollSeekPlaceholder$1;
  const ListComponent = useEmitterValue$2("ListComponent");
  const ItemComponent = useEmitterValue$2("ItemComponent");
  const GroupComponent = useEmitterValue$2("GroupComponent");
  const computeItemKey = useEmitterValue$2("computeItemKey");
  const isSeeking = useEmitterValue$2("isSeeking");
  const hasGroups2 = useEmitterValue$2("groupIndices").length > 0;
  const alignToBottom = useEmitterValue$2("alignToBottom");
  const initialItemFinalLocationReached = useEmitterValue$2("initialItemFinalLocationReached");
  const containerStyle = showTopList ? {} : {
    boxSizing: "border-box",
    ...horizontalDirection ? {
      whiteSpace: "nowrap",
      display: "inline-block",
      height: "100%",
      paddingLeft: listState.offsetTop,
      paddingRight: listState.offsetBottom,
      marginLeft: deviation !== 0 ? deviation : alignToBottom ? "auto" : 0
    } : {
      marginTop: deviation !== 0 ? deviation : alignToBottom ? "auto" : 0,
      paddingTop: listState.offsetTop,
      paddingBottom: listState.offsetBottom
    },
    ...initialItemFinalLocationReached ? {} : { visibility: "hidden" }
  };
  if (!showTopList && listState.totalCount === 0 && EmptyPlaceholder) {
    return /* @__PURE__ */ jsx(EmptyPlaceholder, { ...contextPropIfNotDomElement(EmptyPlaceholder, context) });
  }
  return /* @__PURE__ */ jsx(
    ListComponent,
    {
      ...contextPropIfNotDomElement(ListComponent, context),
      ref: callbackRef,
      style: containerStyle,
      "data-testid": showTopList ? "virtuoso-top-item-list" : "virtuoso-item-list",
      children: (showTopList ? listState.topItems : listState.items).map((item) => {
        const index = item.originalIndex;
        const key = computeItemKey(index + listState.firstItemIndex, item.data, context);
        if (isSeeking) {
          return /* @__PURE__ */ reactExports.createElement(
            ScrollSeekPlaceholder,
            {
              ...contextPropIfNotDomElement(ScrollSeekPlaceholder, context),
              key,
              index: item.index,
              height: item.size,
              type: item.type || "item",
              ...item.type === "group" ? {} : { groupIndex: item.groupIndex }
            }
          );
        }
        if (item.type === "group") {
          return /* @__PURE__ */ reactExports.createElement(
            GroupComponent,
            {
              ...contextPropIfNotDomElement(GroupComponent, context),
              key,
              "data-index": index,
              "data-known-size": item.size,
              "data-item-index": item.index,
              style: GROUP_STYLE
            },
            groupContent(item.index, context)
          );
        } else {
          return /* @__PURE__ */ reactExports.createElement(
            ItemComponent,
            {
              ...contextPropIfNotDomElement(ItemComponent, context),
              ...itemPropIfNotDomElement(ItemComponent, item.data),
              key,
              "data-index": index,
              "data-known-size": item.size,
              "data-item-index": item.index,
              "data-item-group-index": item.groupIndex,
              style: horizontalDirection ? HORIZONTAL_ITEM_STYLE : ITEM_STYLE$1
            },
            hasGroups2 ? itemContent(item.index, item.groupIndex, item.data, context) : itemContent(item.index, item.data, context)
          );
        }
      })
    }
  );
});
const scrollerStyle = {
  height: "100%",
  outline: "none",
  overflowY: "auto",
  position: "relative",
  WebkitOverflowScrolling: "touch"
};
const horizontalScrollerStyle = {
  outline: "none",
  overflowX: "auto",
  position: "relative"
};
const viewportStyle = (alignToBottom) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: 0,
  ...alignToBottom ? { display: "flex", flexDirection: "column" } : {}
});
const topItemListStyle = {
  width: "100%",
  position: positionStickyCssValue(),
  top: 0,
  zIndex: 1
};
function contextPropIfNotDomElement(element, context) {
  if (typeof element === "string") {
    return void 0;
  }
  return { context };
}
function itemPropIfNotDomElement(element, item) {
  return { item: typeof element === "string" ? void 0 : item };
}
const Header$1 = /* @__PURE__ */ React.memo(function VirtuosoHeader() {
  const Header2 = useEmitterValue$2("HeaderComponent");
  const headerHeight = usePublisher$2("headerHeight");
  const HeaderFooterTag = useEmitterValue$2("HeaderFooterTag");
  const ref = useSize(
    React.useMemo(() => (el) => headerHeight(correctItemSize(el, "height")), [headerHeight]),
    true,
    useEmitterValue$2("skipAnimationFrameInResizeObserver")
  );
  const context = useEmitterValue$2("context");
  return Header2 ? /* @__PURE__ */ jsx(HeaderFooterTag, { ref, children: /* @__PURE__ */ jsx(Header2, { ...contextPropIfNotDomElement(Header2, context) }) }) : null;
});
const Footer$1 = /* @__PURE__ */ React.memo(function VirtuosoFooter() {
  const Footer2 = useEmitterValue$2("FooterComponent");
  const footerHeight = usePublisher$2("footerHeight");
  const HeaderFooterTag = useEmitterValue$2("HeaderFooterTag");
  const ref = useSize(
    React.useMemo(() => (el) => footerHeight(correctItemSize(el, "height")), [footerHeight]),
    true,
    useEmitterValue$2("skipAnimationFrameInResizeObserver")
  );
  const context = useEmitterValue$2("context");
  return Footer2 ? /* @__PURE__ */ jsx(HeaderFooterTag, { ref, children: /* @__PURE__ */ jsx(Footer2, { ...contextPropIfNotDomElement(Footer2, context) }) }) : null;
});
function buildScroller({ usePublisher: usePublisher2, useEmitter: useEmitter2, useEmitterValue: useEmitterValue2 }) {
  const Scroller2 = React.memo(function VirtuosoScroller({ style, children, ...props }) {
    const scrollContainerStateCallback = usePublisher2("scrollContainerState");
    const ScrollerComponent = useEmitterValue2("ScrollerComponent");
    const smoothScrollTargetReached = usePublisher2("smoothScrollTargetReached");
    const scrollerRefCallback = useEmitterValue2("scrollerRef");
    const context = useEmitterValue2("context");
    const horizontalDirection = useEmitterValue2("horizontalDirection") || false;
    const { scrollerRef, scrollByCallback, scrollToCallback } = useScrollTop(
      scrollContainerStateCallback,
      smoothScrollTargetReached,
      ScrollerComponent,
      scrollerRefCallback,
      void 0,
      horizontalDirection
    );
    useEmitter2("scrollTo", scrollToCallback);
    useEmitter2("scrollBy", scrollByCallback);
    const defaultStyle = horizontalDirection ? horizontalScrollerStyle : scrollerStyle;
    return /* @__PURE__ */ jsx(
      ScrollerComponent,
      {
        ref: scrollerRef,
        style: { ...defaultStyle, ...style },
        "data-testid": "virtuoso-scroller",
        "data-virtuoso-scroller": true,
        tabIndex: 0,
        ...props,
        ...contextPropIfNotDomElement(ScrollerComponent, context),
        children
      }
    );
  });
  return Scroller2;
}
function buildWindowScroller({ usePublisher: usePublisher2, useEmitter: useEmitter2, useEmitterValue: useEmitterValue2 }) {
  const Scroller2 = React.memo(function VirtuosoWindowScroller({ style, children, ...props }) {
    const scrollContainerStateCallback = usePublisher2("windowScrollContainerState");
    const ScrollerComponent = useEmitterValue2("ScrollerComponent");
    const smoothScrollTargetReached = usePublisher2("smoothScrollTargetReached");
    const totalListHeight = useEmitterValue2("totalListHeight");
    const deviation = useEmitterValue2("deviation");
    const customScrollParent = useEmitterValue2("customScrollParent");
    const context = useEmitterValue2("context");
    const { scrollerRef, scrollByCallback, scrollToCallback } = useScrollTop(
      scrollContainerStateCallback,
      smoothScrollTargetReached,
      ScrollerComponent,
      noop,
      customScrollParent
    );
    useIsomorphicLayoutEffect(() => {
      scrollerRef.current = customScrollParent ? customScrollParent : window;
      return () => {
        scrollerRef.current = null;
      };
    }, [scrollerRef, customScrollParent]);
    useEmitter2("windowScrollTo", scrollToCallback);
    useEmitter2("scrollBy", scrollByCallback);
    return /* @__PURE__ */ jsx(
      ScrollerComponent,
      {
        style: { position: "relative", ...style, ...totalListHeight !== 0 ? { height: totalListHeight + deviation } : {} },
        "data-virtuoso-scroller": true,
        ...props,
        ...contextPropIfNotDomElement(ScrollerComponent, context),
        children
      }
    );
  });
  return Scroller2;
}
const Viewport$2 = ({ children }) => {
  const ctx = React.useContext(VirtuosoMockContext);
  const viewportHeight = usePublisher$2("viewportHeight");
  const fixedItemHeight = usePublisher$2("fixedItemHeight");
  const alignToBottom = useEmitterValue$2("alignToBottom");
  const horizontalDirection = useEmitterValue$2("horizontalDirection");
  const viewportSizeCallbackMemo = React.useMemo(
    () => compose(viewportHeight, (el) => correctItemSize(el, horizontalDirection ? "width" : "height")),
    [viewportHeight, horizontalDirection]
  );
  const viewportRef = useSize(viewportSizeCallbackMemo, true, useEmitterValue$2("skipAnimationFrameInResizeObserver"));
  React.useEffect(() => {
    if (ctx) {
      viewportHeight(ctx.viewportHeight);
      fixedItemHeight(ctx.itemHeight);
    }
  }, [ctx, viewportHeight, fixedItemHeight]);
  return /* @__PURE__ */ jsx("div", { style: viewportStyle(alignToBottom), ref: viewportRef, "data-viewport-type": "element", children });
};
const WindowViewport$2 = ({ children }) => {
  const ctx = React.useContext(VirtuosoMockContext);
  const windowViewportRect = usePublisher$2("windowViewportRect");
  const fixedItemHeight = usePublisher$2("fixedItemHeight");
  const customScrollParent = useEmitterValue$2("customScrollParent");
  const viewportRef = useWindowViewportRectRef(
    windowViewportRect,
    customScrollParent,
    useEmitterValue$2("skipAnimationFrameInResizeObserver")
  );
  const alignToBottom = useEmitterValue$2("alignToBottom");
  React.useEffect(() => {
    if (ctx) {
      fixedItemHeight(ctx.itemHeight);
      windowViewportRect({ offsetTop: 0, visibleHeight: ctx.viewportHeight, visibleWidth: 100 });
    }
  }, [ctx, windowViewportRect, fixedItemHeight]);
  return /* @__PURE__ */ jsx("div", { ref: viewportRef, style: viewportStyle(alignToBottom), "data-viewport-type": "window", children });
};
const TopItemListContainer = ({ children }) => {
  const TopItemList = useEmitterValue$2("TopItemListComponent") || "div";
  const headerHeight = useEmitterValue$2("headerHeight");
  const style = { ...topItemListStyle, marginTop: `${headerHeight}px` };
  const context = useEmitterValue$2("context");
  return /* @__PURE__ */ jsx(TopItemList, { style, ...contextPropIfNotDomElement(TopItemList, context), children });
};
const ListRoot = /* @__PURE__ */ React.memo(function VirtuosoRoot(props) {
  const useWindowScroll = useEmitterValue$2("useWindowScroll");
  const showTopList = useEmitterValue$2("topItemsIndexes").length > 0;
  const customScrollParent = useEmitterValue$2("customScrollParent");
  const TheScroller = customScrollParent || useWindowScroll ? WindowScroller$2 : Scroller$2;
  const TheViewport = customScrollParent || useWindowScroll ? WindowViewport$2 : Viewport$2;
  return /* @__PURE__ */ jsxs(TheScroller, { ...props, children: [
    showTopList && /* @__PURE__ */ jsx(TopItemListContainer, { children: /* @__PURE__ */ jsx(Items$1, { showTopList: true }) }),
    /* @__PURE__ */ jsxs(TheViewport, { children: [
      /* @__PURE__ */ jsx(Header$1, {}),
      /* @__PURE__ */ jsx(Items$1, {}),
      /* @__PURE__ */ jsx(Footer$1, {})
    ] })
  ] });
});
const {
  Component: List,
  usePublisher: usePublisher$2,
  useEmitterValue: useEmitterValue$2,
  useEmitter: useEmitter$2
} = /* @__PURE__ */ systemToComponent(
  combinedSystem$2,
  {
    required: {},
    optional: {
      restoreStateFrom: "restoreStateFrom",
      context: "context",
      followOutput: "followOutput",
      itemContent: "itemContent",
      groupContent: "groupContent",
      overscan: "overscan",
      increaseViewportBy: "increaseViewportBy",
      totalCount: "totalCount",
      groupCounts: "groupCounts",
      topItemCount: "topItemCount",
      firstItemIndex: "firstItemIndex",
      initialTopMostItemIndex: "initialTopMostItemIndex",
      components: "components",
      atBottomThreshold: "atBottomThreshold",
      atTopThreshold: "atTopThreshold",
      computeItemKey: "computeItemKey",
      defaultItemHeight: "defaultItemHeight",
      fixedItemHeight: "fixedItemHeight",
      itemSize: "itemSize",
      scrollSeekConfiguration: "scrollSeekConfiguration",
      headerFooterTag: "HeaderFooterTag",
      data: "data",
      initialItemCount: "initialItemCount",
      initialScrollTop: "initialScrollTop",
      alignToBottom: "alignToBottom",
      useWindowScroll: "useWindowScroll",
      customScrollParent: "customScrollParent",
      scrollerRef: "scrollerRef",
      logLevel: "logLevel",
      horizontalDirection: "horizontalDirection",
      skipAnimationFrameInResizeObserver: "skipAnimationFrameInResizeObserver"
    },
    methods: {
      scrollToIndex: "scrollToIndex",
      scrollIntoView: "scrollIntoView",
      scrollTo: "scrollTo",
      scrollBy: "scrollBy",
      autoscrollToBottom: "autoscrollToBottom",
      getState: "getState"
    },
    events: {
      isScrolling: "isScrolling",
      endReached: "endReached",
      startReached: "startReached",
      rangeChanged: "rangeChanged",
      atBottomStateChange: "atBottomStateChange",
      atTopStateChange: "atTopStateChange",
      totalListHeightChanged: "totalListHeightChanged",
      itemsRendered: "itemsRendered",
      groupIndices: "groupIndices"
    }
  },
  ListRoot
);
const Scroller$2 = /* @__PURE__ */ buildScroller({ usePublisher: usePublisher$2, useEmitterValue: useEmitterValue$2, useEmitter: useEmitter$2 });
const WindowScroller$2 = /* @__PURE__ */ buildWindowScroller({ usePublisher: usePublisher$2, useEmitterValue: useEmitterValue$2, useEmitter: useEmitter$2 });
const Virtuoso = List;
const INITIAL_GRID_STATE = {
  items: [],
  offsetBottom: 0,
  offsetTop: 0,
  top: 0,
  bottom: 0,
  itemHeight: 0,
  itemWidth: 0
};
const PROBE_GRID_STATE = {
  items: [{ index: 0 }],
  offsetBottom: 0,
  offsetTop: 0,
  top: 0,
  bottom: 0,
  itemHeight: 0,
  itemWidth: 0
};
const { round, ceil, floor, min, max } = Math;
function buildProbeGridState(items) {
  return {
    ...PROBE_GRID_STATE,
    items
  };
}
function buildItems(startIndex, endIndex, data) {
  return Array.from({ length: endIndex - startIndex + 1 }).map((_, i) => {
    const dataItem = data === null ? null : data[i + startIndex];
    return { index: i + startIndex, data: dataItem };
  });
}
function gapComparator(prev, next) {
  return prev && prev.column === next.column && prev.row === next.row;
}
function dimensionComparator(prev, next) {
  return prev && prev.width === next.width && prev.height === next.height;
}
const gridSystem = /* @__PURE__ */ system(
  ([
    { overscan, visibleRange, listBoundary, increaseViewportBy },
    { scrollTop, viewportHeight, scrollBy, scrollTo, smoothScrollTargetReached, scrollContainerState, footerHeight, headerHeight },
    stateFlags,
    scrollSeek,
    { propsReady, didMount },
    { windowViewportRect, useWindowScroll, customScrollParent, windowScrollContainerState, windowScrollTo },
    log
  ]) => {
    const totalCount = statefulStream(0);
    const initialItemCount = statefulStream(0);
    const gridState = statefulStream(INITIAL_GRID_STATE);
    const viewportDimensions = statefulStream({ height: 0, width: 0 });
    const itemDimensions = statefulStream({ height: 0, width: 0 });
    const scrollToIndex = stream();
    const scrollHeight = stream();
    const deviation = statefulStream(0);
    const data = statefulStream(null);
    const gap = statefulStream({ row: 0, column: 0 });
    const stateChanged = stream();
    const restoreStateFrom = stream();
    const stateRestoreInProgress = statefulStream(false);
    const initialTopMostItemIndex = statefulStream(0);
    const scrolledToInitialItem = statefulStream(true);
    const scrollScheduled = statefulStream(false);
    const horizontalDirection = statefulStream(false);
    subscribe(
      pipe(
        didMount,
        withLatestFrom(initialTopMostItemIndex),
        filter(([_, location]) => !!location)
      ),
      () => {
        publish(scrolledToInitialItem, false);
      }
    );
    subscribe(
      pipe(
        combineLatest(didMount, scrolledToInitialItem, itemDimensions, viewportDimensions, initialTopMostItemIndex, scrollScheduled),
        filter(([didMount2, scrolledToInitialItem2, itemDimensions2, viewportDimensions2, , scrollScheduled2]) => {
          return didMount2 && !scrolledToInitialItem2 && itemDimensions2.height !== 0 && viewportDimensions2.height !== 0 && !scrollScheduled2;
        })
      ),
      ([, , , , initialTopMostItemIndex2]) => {
        publish(scrollScheduled, true);
        skipFrames(1, () => {
          publish(scrollToIndex, initialTopMostItemIndex2);
        });
        handleNext(pipe(scrollTop), () => {
          publish(listBoundary, [0, 0]);
          publish(scrolledToInitialItem, true);
        });
      }
    );
    connect(
      pipe(
        restoreStateFrom,
        filter((value) => value !== void 0 && value !== null && value.scrollTop > 0),
        mapTo(0)
      ),
      initialItemCount
    );
    subscribe(
      pipe(
        didMount,
        withLatestFrom(restoreStateFrom),
        filter(([, snapshot]) => snapshot !== void 0 && snapshot !== null)
      ),
      ([, snapshot]) => {
        if (!snapshot) {
          return;
        }
        publish(viewportDimensions, snapshot.viewport), publish(itemDimensions, snapshot == null ? void 0 : snapshot.item);
        publish(gap, snapshot.gap);
        if (snapshot.scrollTop > 0) {
          publish(stateRestoreInProgress, true);
          handleNext(pipe(scrollTop, skip(1)), (_value) => {
            publish(stateRestoreInProgress, false);
          });
          publish(scrollTo, { top: snapshot.scrollTop });
        }
      }
    );
    connect(
      pipe(
        viewportDimensions,
        map(({ height }) => height)
      ),
      viewportHeight
    );
    connect(
      pipe(
        combineLatest(
          duc(viewportDimensions, dimensionComparator),
          duc(itemDimensions, dimensionComparator),
          duc(gap, (prev, next) => prev && prev.column === next.column && prev.row === next.row),
          duc(scrollTop)
        ),
        map(([viewport, item, gap2, scrollTop2]) => ({
          viewport,
          item,
          gap: gap2,
          scrollTop: scrollTop2
        }))
      ),
      stateChanged
    );
    connect(
      pipe(
        combineLatest(
          duc(totalCount),
          visibleRange,
          duc(gap, gapComparator),
          duc(itemDimensions, dimensionComparator),
          duc(viewportDimensions, dimensionComparator),
          duc(data),
          duc(initialItemCount),
          duc(stateRestoreInProgress),
          duc(scrolledToInitialItem),
          duc(initialTopMostItemIndex)
        ),
        filter(([, , , , , , , stateRestoreInProgress2]) => {
          return !stateRestoreInProgress2;
        }),
        map(
          ([
            totalCount2,
            [startOffset, endOffset],
            gap2,
            item,
            viewport,
            data2,
            initialItemCount2,
            ,
            scrolledToInitialItem2,
            initialTopMostItemIndex2
          ]) => {
            const { row: rowGap, column: columnGap } = gap2;
            const { height: itemHeight, width: itemWidth } = item;
            const { width: viewportWidth } = viewport;
            if (initialItemCount2 === 0 && (totalCount2 === 0 || viewportWidth === 0)) {
              return INITIAL_GRID_STATE;
            }
            if (itemWidth === 0) {
              const startIndex2 = getInitialTopMostItemIndexNumber(initialTopMostItemIndex2, totalCount2);
              const endIndex2 = Math.max(startIndex2 + initialItemCount2 - 1, 0);
              return buildProbeGridState(buildItems(startIndex2, endIndex2, data2));
            }
            const perRow = itemsPerRow(viewportWidth, itemWidth, columnGap);
            let startIndex;
            let endIndex;
            if (!scrolledToInitialItem2) {
              startIndex = 0;
              endIndex = -1;
            } else if (startOffset === 0 && endOffset === 0 && initialItemCount2 > 0) {
              startIndex = 0;
              endIndex = initialItemCount2 - 1;
            } else {
              startIndex = perRow * floor((startOffset + rowGap) / (itemHeight + rowGap));
              endIndex = perRow * ceil((endOffset + rowGap) / (itemHeight + rowGap)) - 1;
              endIndex = min(totalCount2 - 1, max(endIndex, perRow - 1));
              startIndex = min(endIndex, max(0, startIndex));
            }
            const items = buildItems(startIndex, endIndex, data2);
            const { top, bottom } = gridLayout(viewport, gap2, item, items);
            const rowCount = ceil(totalCount2 / perRow);
            const totalHeight = rowCount * itemHeight + (rowCount - 1) * rowGap;
            const offsetBottom = totalHeight - bottom;
            return { items, offsetTop: top, offsetBottom, top, bottom, itemHeight, itemWidth };
          }
        )
      ),
      gridState
    );
    connect(
      pipe(
        data,
        filter((data2) => data2 !== null),
        map((data2) => data2.length)
      ),
      totalCount
    );
    connect(
      pipe(
        combineLatest(viewportDimensions, itemDimensions, gridState, gap),
        filter(([viewportDimensions2, itemDimensions2, { items }]) => {
          return items.length > 0 && itemDimensions2.height !== 0 && viewportDimensions2.height !== 0;
        }),
        map(([viewportDimensions2, itemDimensions2, { items }, gap2]) => {
          const { top, bottom } = gridLayout(viewportDimensions2, gap2, itemDimensions2, items);
          return [top, bottom];
        }),
        distinctUntilChanged(tupleComparator)
      ),
      listBoundary
    );
    const hasScrolled = statefulStream(false);
    connect(
      pipe(
        scrollTop,
        withLatestFrom(hasScrolled),
        map(([scrollTop2, hasScrolled2]) => {
          return hasScrolled2 || scrollTop2 !== 0;
        })
      ),
      hasScrolled
    );
    const endReached = streamFromEmitter(
      pipe(
        duc(gridState),
        filter(({ items }) => items.length > 0),
        withLatestFrom(totalCount, hasScrolled),
        filter(([{ items }, totalCount2, hasScrolled2]) => hasScrolled2 && items[items.length - 1].index === totalCount2 - 1),
        map(([, totalCount2]) => totalCount2 - 1),
        distinctUntilChanged()
      )
    );
    const startReached = streamFromEmitter(
      pipe(
        duc(gridState),
        filter(({ items }) => {
          return items.length > 0 && items[0].index === 0;
        }),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        mapTo(0),
        distinctUntilChanged()
      )
    );
    const rangeChanged = streamFromEmitter(
      pipe(
        duc(gridState),
        withLatestFrom(stateRestoreInProgress),
        filter(([{ items }, stateRestoreInProgress2]) => items.length > 0 && !stateRestoreInProgress2),
        map(([{ items }]) => {
          return {
            startIndex: items[0].index,
            endIndex: items[items.length - 1].index
          };
        }),
        distinctUntilChanged(rangeComparator),
        throttleTime(0)
      )
    );
    connect(rangeChanged, scrollSeek.scrollSeekRangeChanged);
    connect(
      pipe(
        scrollToIndex,
        withLatestFrom(viewportDimensions, itemDimensions, totalCount, gap),
        map(([location, viewportDimensions2, itemDimensions2, totalCount2, gap2]) => {
          const normalLocation = normalizeIndexLocation(location);
          const { align, behavior, offset } = normalLocation;
          let index = normalLocation.index;
          if (index === "LAST") {
            index = totalCount2 - 1;
          }
          index = max(0, index, min(totalCount2 - 1, index));
          let top = itemTop(viewportDimensions2, gap2, itemDimensions2, index);
          if (align === "end") {
            top = round(top - viewportDimensions2.height + itemDimensions2.height);
          } else if (align === "center") {
            top = round(top - viewportDimensions2.height / 2 + itemDimensions2.height / 2);
          }
          if (offset) {
            top += offset;
          }
          return { top, behavior };
        })
      ),
      scrollTo
    );
    const totalListHeight = statefulStreamFromEmitter(
      pipe(
        gridState,
        map((gridState2) => {
          return gridState2.offsetBottom + gridState2.bottom;
        })
      ),
      0
    );
    connect(
      pipe(
        windowViewportRect,
        map((viewportInfo) => ({ width: viewportInfo.visibleWidth, height: viewportInfo.visibleHeight }))
      ),
      viewportDimensions
    );
    return {
      // input
      data,
      totalCount,
      viewportDimensions,
      itemDimensions,
      scrollTop,
      scrollHeight,
      overscan,
      increaseViewportBy,
      scrollBy,
      scrollTo,
      scrollToIndex,
      smoothScrollTargetReached,
      windowViewportRect,
      windowScrollTo,
      useWindowScroll,
      customScrollParent,
      windowScrollContainerState,
      deviation,
      scrollContainerState,
      footerHeight,
      headerHeight,
      initialItemCount,
      gap,
      restoreStateFrom,
      ...scrollSeek,
      initialTopMostItemIndex,
      horizontalDirection,
      // output
      gridState,
      totalListHeight,
      ...stateFlags,
      startReached,
      endReached,
      rangeChanged,
      stateChanged,
      propsReady,
      stateRestoreInProgress,
      ...log
    };
  },
  tup(sizeRangeSystem, domIOSystem, stateFlagsSystem, scrollSeekSystem, propsReadySystem, windowScrollerSystem, loggerSystem)
);
function gridLayout(viewport, gap, item, items) {
  const { height: itemHeight } = item;
  if (itemHeight === void 0 || items.length === 0) {
    return { top: 0, bottom: 0 };
  }
  const top = itemTop(viewport, gap, item, items[0].index);
  const bottom = itemTop(viewport, gap, item, items[items.length - 1].index) + itemHeight;
  return { top, bottom };
}
function itemTop(viewport, gap, item, index) {
  const perRow = itemsPerRow(viewport.width, item.width, gap.column);
  const rowCount = floor(index / perRow);
  const top = rowCount * item.height + max(0, rowCount - 1) * gap.row;
  return top > 0 ? top + gap.row : top;
}
function itemsPerRow(viewportWidth, itemWidth, gap) {
  return max(1, floor((viewportWidth + gap) / (floor(itemWidth) + gap)));
}
const gridComponentPropsSystem = /* @__PURE__ */ system(() => {
  const itemContent = statefulStream((index) => `Item ${index}`);
  const components = statefulStream({});
  const context = statefulStream(null);
  const itemClassName = statefulStream("virtuoso-grid-item");
  const listClassName = statefulStream("virtuoso-grid-list");
  const computeItemKey = statefulStream(identity);
  const headerFooterTag = statefulStream("div");
  const scrollerRef = statefulStream(noop);
  const distinctProp = (propName, defaultValue = null) => {
    return statefulStreamFromEmitter(
      pipe(
        components,
        map((components2) => components2[propName]),
        distinctUntilChanged()
      ),
      defaultValue
    );
  };
  const readyStateChanged = statefulStream(false);
  const reportReadyState = statefulStream(false);
  connect(duc(reportReadyState), readyStateChanged);
  return {
    readyStateChanged,
    reportReadyState,
    context,
    itemContent,
    components,
    computeItemKey,
    itemClassName,
    listClassName,
    headerFooterTag,
    scrollerRef,
    FooterComponent: distinctProp("Footer"),
    HeaderComponent: distinctProp("Header"),
    ListComponent: distinctProp("List", "div"),
    ItemComponent: distinctProp("Item", "div"),
    ScrollerComponent: distinctProp("Scroller", "div"),
    ScrollSeekPlaceholder: distinctProp("ScrollSeekPlaceholder", "div")
  };
});
const combinedSystem$1 = /* @__PURE__ */ system(([gridSystem2, gridComponentPropsSystem2]) => {
  return { ...gridSystem2, ...gridComponentPropsSystem2 };
}, tup(gridSystem, gridComponentPropsSystem));
const GridItems = /* @__PURE__ */ React.memo(function GridItems2() {
  const gridState = useEmitterValue$1("gridState");
  const listClassName = useEmitterValue$1("listClassName");
  const itemClassName = useEmitterValue$1("itemClassName");
  const itemContent = useEmitterValue$1("itemContent");
  const computeItemKey = useEmitterValue$1("computeItemKey");
  const isSeeking = useEmitterValue$1("isSeeking");
  const scrollHeightCallback = usePublisher$1("scrollHeight");
  const ItemComponent = useEmitterValue$1("ItemComponent");
  const ListComponent = useEmitterValue$1("ListComponent");
  const ScrollSeekPlaceholder = useEmitterValue$1("ScrollSeekPlaceholder");
  const context = useEmitterValue$1("context");
  const itemDimensions = usePublisher$1("itemDimensions");
  const gridGap = usePublisher$1("gap");
  const log = useEmitterValue$1("log");
  const stateRestoreInProgress = useEmitterValue$1("stateRestoreInProgress");
  const reportReadyState = usePublisher$1("reportReadyState");
  const listRef = useSize(
    React.useMemo(
      () => (el) => {
        const scrollHeight = el.parentElement.parentElement.scrollHeight;
        scrollHeightCallback(scrollHeight);
        const firstItem = el.firstChild;
        if (firstItem) {
          const { width, height } = firstItem.getBoundingClientRect();
          itemDimensions({ width, height });
        }
        gridGap({
          row: resolveGapValue("row-gap", getComputedStyle(el).rowGap, log),
          column: resolveGapValue("column-gap", getComputedStyle(el).columnGap, log)
        });
      },
      [scrollHeightCallback, itemDimensions, gridGap, log]
    ),
    true,
    false
  );
  useIsomorphicLayoutEffect(() => {
    if (gridState.itemHeight > 0 && gridState.itemWidth > 0) {
      reportReadyState(true);
    }
  }, [gridState]);
  if (stateRestoreInProgress) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    ListComponent,
    {
      ref: listRef,
      className: listClassName,
      ...contextPropIfNotDomElement(ListComponent, context),
      style: { paddingTop: gridState.offsetTop, paddingBottom: gridState.offsetBottom },
      "data-testid": "virtuoso-item-list",
      children: gridState.items.map((item) => {
        const key = computeItemKey(item.index, item.data, context);
        return isSeeking ? /* @__PURE__ */ jsx(
          ScrollSeekPlaceholder,
          {
            ...contextPropIfNotDomElement(ScrollSeekPlaceholder, context),
            index: item.index,
            height: gridState.itemHeight,
            width: gridState.itemWidth
          },
          key
        ) : /* @__PURE__ */ reactExports.createElement(
          ItemComponent,
          {
            ...contextPropIfNotDomElement(ItemComponent, context),
            className: itemClassName,
            "data-index": item.index,
            key
          },
          itemContent(item.index, item.data, context)
        );
      })
    }
  );
});
const Header$2 = React.memo(function VirtuosoHeader2() {
  const Header2 = useEmitterValue$1("HeaderComponent");
  const headerHeight = usePublisher$1("headerHeight");
  const HeaderFooterTag = useEmitterValue$1("headerFooterTag");
  const ref = useSize(
    React.useMemo(() => (el) => headerHeight(correctItemSize(el, "height")), [headerHeight]),
    true,
    false
  );
  const context = useEmitterValue$1("context");
  return Header2 ? /* @__PURE__ */ jsx(HeaderFooterTag, { ref, children: /* @__PURE__ */ jsx(Header2, { ...contextPropIfNotDomElement(Header2, context) }) }) : null;
});
const Footer = React.memo(function VirtuosoGridFooter() {
  const Footer2 = useEmitterValue$1("FooterComponent");
  const footerHeight = usePublisher$1("footerHeight");
  const HeaderFooterTag = useEmitterValue$1("headerFooterTag");
  const ref = useSize(
    React.useMemo(() => (el) => footerHeight(correctItemSize(el, "height")), [footerHeight]),
    true,
    false
  );
  const context = useEmitterValue$1("context");
  return Footer2 ? /* @__PURE__ */ jsx(HeaderFooterTag, { ref, children: /* @__PURE__ */ jsx(Footer2, { ...contextPropIfNotDomElement(Footer2, context) }) }) : null;
});
const Viewport$1 = ({ children }) => {
  const ctx = React.useContext(VirtuosoGridMockContext);
  const itemDimensions = usePublisher$1("itemDimensions");
  const viewportDimensions = usePublisher$1("viewportDimensions");
  const viewportRef = useSize(
    React.useMemo(
      () => (el) => {
        viewportDimensions(el.getBoundingClientRect());
      },
      [viewportDimensions]
    ),
    true,
    false
  );
  React.useEffect(() => {
    if (ctx) {
      viewportDimensions({ height: ctx.viewportHeight, width: ctx.viewportWidth });
      itemDimensions({ height: ctx.itemHeight, width: ctx.itemWidth });
    }
  }, [ctx, viewportDimensions, itemDimensions]);
  return /* @__PURE__ */ jsx("div", { style: viewportStyle(false), ref: viewportRef, children });
};
const WindowViewport$1 = ({ children }) => {
  const ctx = React.useContext(VirtuosoGridMockContext);
  const windowViewportRect = usePublisher$1("windowViewportRect");
  const itemDimensions = usePublisher$1("itemDimensions");
  const customScrollParent = useEmitterValue$1("customScrollParent");
  const viewportRef = useWindowViewportRectRef(windowViewportRect, customScrollParent, false);
  React.useEffect(() => {
    if (ctx) {
      itemDimensions({ height: ctx.itemHeight, width: ctx.itemWidth });
      windowViewportRect({ offsetTop: 0, visibleHeight: ctx.viewportHeight, visibleWidth: ctx.viewportWidth });
    }
  }, [ctx, windowViewportRect, itemDimensions]);
  return /* @__PURE__ */ jsx("div", { ref: viewportRef, style: viewportStyle(false), children });
};
const GridRoot = /* @__PURE__ */ React.memo(function GridRoot2({ ...props }) {
  const useWindowScroll = useEmitterValue$1("useWindowScroll");
  const customScrollParent = useEmitterValue$1("customScrollParent");
  const TheScroller = customScrollParent || useWindowScroll ? WindowScroller$1 : Scroller$1;
  const TheViewport = customScrollParent || useWindowScroll ? WindowViewport$1 : Viewport$1;
  return /* @__PURE__ */ jsx(TheScroller, { ...props, children: /* @__PURE__ */ jsxs(TheViewport, { children: [
    /* @__PURE__ */ jsx(Header$2, {}),
    /* @__PURE__ */ jsx(GridItems, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
});
const {
  Component: Grid,
  usePublisher: usePublisher$1,
  useEmitterValue: useEmitterValue$1,
  useEmitter: useEmitter$1
} = /* @__PURE__ */ systemToComponent(
  combinedSystem$1,
  {
    optional: {
      context: "context",
      totalCount: "totalCount",
      overscan: "overscan",
      itemContent: "itemContent",
      components: "components",
      computeItemKey: "computeItemKey",
      data: "data",
      initialItemCount: "initialItemCount",
      scrollSeekConfiguration: "scrollSeekConfiguration",
      headerFooterTag: "headerFooterTag",
      listClassName: "listClassName",
      itemClassName: "itemClassName",
      useWindowScroll: "useWindowScroll",
      customScrollParent: "customScrollParent",
      scrollerRef: "scrollerRef",
      logLevel: "logLevel",
      restoreStateFrom: "restoreStateFrom",
      initialTopMostItemIndex: "initialTopMostItemIndex",
      increaseViewportBy: "increaseViewportBy"
    },
    methods: {
      scrollTo: "scrollTo",
      scrollBy: "scrollBy",
      scrollToIndex: "scrollToIndex"
    },
    events: {
      isScrolling: "isScrolling",
      endReached: "endReached",
      startReached: "startReached",
      rangeChanged: "rangeChanged",
      atBottomStateChange: "atBottomStateChange",
      atTopStateChange: "atTopStateChange",
      stateChanged: "stateChanged",
      readyStateChanged: "readyStateChanged"
    }
  },
  GridRoot
);
const Scroller$1 = /* @__PURE__ */ buildScroller({ usePublisher: usePublisher$1, useEmitterValue: useEmitterValue$1, useEmitter: useEmitter$1 });
const WindowScroller$1 = /* @__PURE__ */ buildWindowScroller({ usePublisher: usePublisher$1, useEmitterValue: useEmitterValue$1, useEmitter: useEmitter$1 });
function resolveGapValue(property, value, log) {
  if (value !== "normal" && !(value == null ? void 0 : value.endsWith("px"))) {
    log(`${property} was not resolved to pixel value correctly`, value, LogLevel.WARN);
  }
  if (value === "normal") {
    return 0;
  }
  return parseInt(value != null ? value : "0", 10);
}
const SvgHeyloginIconDark = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 236 236", style: {
  enableBackground: "new 0 0 236 236"
}, xmlSpace: "preserve", ...props }, /* @__PURE__ */ reactExports.createElement("path", { d: "M165.2 118.5c0-8.8-2.5-17.4-7.1-24.8l-57.3 68.4c7.1 2.9 14.8 3.9 22.5 3.1 7.6-.8 14.9-3.5 21.3-7.8s11.6-10.1 15.2-16.9c3.5-6.7 5.4-14.3 5.4-22z", style: {
  fill: "#999"
} }), /* @__PURE__ */ reactExports.createElement("path", { d: "M118.5 229.9c61.5 0 111.4-49.9 111.4-111.4S180 7.1 118.5 7.1 7.1 57 7.1 118.5 57 229.9 118.5 229.9z", style: {
  fill: "#fff",
  stroke: "#fff",
  strokeWidth: 11
} }), /* @__PURE__ */ reactExports.createElement("path", { d: "M118.3 222.9c21.4 0 42.2-6.6 59.7-18.9l-40.5-48.5c-5.3 2.8-11.2 4.4-17.2 4.6-6 .3-12-.7-17.6-3l-41 49c16.9 11 36.5 16.9 56.6 16.8z", style: {
  fill: "#3e48f8"
} }), /* @__PURE__ */ reactExports.createElement("path", { d: "m194.7 47.4-41 49c3.1 4.9 5.1 10.4 5.9 16.1.8 5.7.5 11.5-1 17.1-1.5 5.6-4.2 10.8-7.8 15.2-3.6 4.5-8.1 8.2-13.3 10.8l40.6 48.5c12.2-8.6 22.5-19.6 30-32.5 7.6-12.9 12.3-27.2 13.9-42 1.6-14.8 0-29.9-4.7-44-4.8-14.2-12.5-27.2-22.6-38.2z", style: {
  fill: "#00c8ff"
} }), /* @__PURE__ */ reactExports.createElement("path", { d: "M160 118.5c0-7.8-2.2-15.4-6.3-22l-50.9 60.8c6.3 2.5 13.2 3.5 20 2.8 6.8-.7 13.3-3.1 18.9-6.9 5.6-3.8 10.3-9 13.5-15 3.1-6.1 4.8-12.9 4.8-19.7z", style: {
  fill: "#00f500"
} }), /* @__PURE__ */ reactExports.createElement("path", { d: "m61.7 206.2 41-48.9c-6.1-2.5-11.5-6.3-15.9-11.3-4.3-5-7.4-10.9-9-17.3-1.6-6.4-1.7-13.1-.2-19.5s4.5-12.4 8.7-17.5 9.6-9 15.7-11.6 12.6-3.7 19.2-3.2 12.9 2.5 18.6 5.9c5.6 3.4 10.4 8.1 13.9 13.7l41-48.9c-10.1-10.9-22.3-19.5-35.9-25.2-13.6-5.8-28.3-8.5-43.1-8.2S86.3 17.9 73 24.4c-13.3 6.4-25.1 15.6-34.6 27C28.9 62.7 21.9 76 17.9 90.3s-4.9 29.2-2.7 43.9c2.2 14.6 7.5 28.7 15.5 41.1 8 12.3 18.6 22.9 31 30.9z", style: {
  fill: "#282846"
} }));
const GlobalSearch$1 = "_GlobalSearch_13eb2_1";
const HeyloginIcon = "_HeyloginIcon_13eb2_5";
const ResultsList$1 = "_ResultsList_13eb2_11";
const NoResultsHint = "_NoResultsHint_13eb2_25";
const ShortcutHints = "_ShortcutHints_13eb2_31";
const PermissionHint = "_PermissionHint_13eb2_45";
const styles$4 = {
  GlobalSearch: GlobalSearch$1,
  HeyloginIcon,
  ResultsList: ResultsList$1,
  NoResultsHint,
  ShortcutHints,
  PermissionHint
};
const GlobalSearchResultItem$1 = "_GlobalSearchResultItem_7ed62_1";
const last = "_last_7ed62_9";
const dark$1 = "_dark_7ed62_16";
const highlighted = "_highlighted_7ed62_20";
const defaultHighlighted = "_defaultHighlighted_7ed62_27";
const Header = "_Header_7ed62_37";
const withIcon = "_withIcon_7ed62_47";
const Icon = "_Icon_7ed62_51";
const Headline = "_Headline_7ed62_63";
const Subheadline = "_Subheadline_7ed62_73";
const monospace = "_monospace_7ed62_83";
const TotpTimeOffsetWarning = "_TotpTimeOffsetWarning_7ed62_87";
const ActionButtons = "_ActionButtons_7ed62_91";
const expanded = "_expanded_7ed62_105";
const ActionButtonsInner = "_ActionButtonsInner_7ed62_93";
const styles$3 = {
  GlobalSearchResultItem: GlobalSearchResultItem$1,
  last,
  dark: dark$1,
  highlighted,
  defaultHighlighted,
  Header,
  withIcon,
  Icon,
  Headline,
  Subheadline,
  monospace,
  TotpTimeOffsetWarning,
  ActionButtons,
  expanded,
  ActionButtonsInner
};
const SvgDragHandle = (props) => /* @__PURE__ */ reactExports.createElement("svg", { width: 288, height: 480, viewBox: "0 0 9 15", id: "svg1", "sodipodi:docname": "drag-handle1.svg", "inkscape:version": "1.3.2 (091e20e, 2023-11-25)", "xmlns:inkscape": "http://www.inkscape.org/namespaces/inkscape", "xmlns:sodipodi": "http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd", xmlns: "http://www.w3.org/2000/svg", "xmlns:svg": "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ reactExports.createElement("defs", { id: "defs1" }), /* @__PURE__ */ reactExports.createElement("sodipodi:namedview", { id: "namedview1", pagecolor: "#ffffff", bordercolor: "#666666", borderopacity: 1, "inkscape:showpageshadow": 2, "inkscape:pageopacity": 0, "inkscape:pagecheckerboard": 0, "inkscape:deskcolor": "#d1d1d1", "inkscape:zoom": 0.295, "inkscape:cx": 142.37288, "inkscape:cy": 245.76271, "inkscape:window-width": 720, "inkscape:window-height": 480, "inkscape:window-x": 800, "inkscape:window-y": 311, "inkscape:window-maximized": 0, "inkscape:current-layer": "svg1" }), /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M 1.5,3 C 2.3284,3 3,2.32843 3,1.5 3,0.67157 2.3284,0 1.5,0 0.67157,0 0,0.67157 0,1.5 0,2.32843 0.67157,3 1.5,3 Z m 0,6 C 2.3284,9 3,8.3284 3,7.5 3,6.6716 2.3284,6 1.5,6 0.67157,6 0,6.6716 0,7.5 0,8.3284 0.67157,9 1.5,9 Z M 3,13.5 C 3,14.3284 2.3284,15 1.5,15 0.67157,15 0,14.3284 0,13.5 0,12.6716 0.67157,12 1.5,12 2.3284,12 3,12.6716 3,13.5 Z M 7.5,3 C 8.3284,3 9,2.32843 9,1.5 9,0.67157 8.3284,0 7.5,0 6.6716,0 6,0.67157 6,1.5 6,2.32843 6.6716,3 7.5,3 Z M 9,7.5 C 9,8.3284 8.3284,9 7.5,9 6.6716,9 6,8.3284 6,7.5 6,6.6716 6.6716,6 7.5,6 8.3284,6 9,6.6716 9,7.5 Z M 7.5,15 C 8.3284,15 9,14.3284 9,13.5 9,12.6716 8.3284,12 7.5,12 6.6716,12 6,12.6716 6,13.5 6,14.3284 6.6716,15 7.5,15 Z", id: "path1" }));
const GlobalSearchShortcutInfo$1 = "_GlobalSearchShortcutInfo_1p7sb_1 _UnstyledButton_1w40h_18";
const descriptionButton = "_descriptionButton_1p7sb_15";
const dark = "_dark_1p7sb_20";
const Key = "_Key_1p7sb_24";
const light = "_light_1p7sb_40";
const success = "_success_1p7sb_40";
const Description = "_Description_1p7sb_49";
const DragHandleIcon = "_DragHandleIcon_1p7sb_60";
const DefaultText = "_DefaultText_1p7sb_72";
const SuccessText = "_SuccessText_1p7sb_81";
const styles$2 = {
  GlobalSearchShortcutInfo: GlobalSearchShortcutInfo$1,
  descriptionButton,
  dark,
  Key,
  light,
  success,
  Description,
  DragHandleIcon,
  DefaultText,
  SuccessText
};
function GlobalSearchShortcutInfo({
  element,
  keyLabels,
  success: success2,
  descriptionButtonStyle,
  description,
  successDescription,
  ...restProps
}) {
  const Element = element ?? "div";
  const uiMode = Z();
  return /* @__PURE__ */ jsxs(Element, { className: classNames(styles$2.GlobalSearchShortcutInfo, descriptionButtonStyle && styles$2.descriptionButton, styles$2[uiMode], success2 && styles$2.success), ...restProps, children: [
    keyLabels == null ? void 0 : keyLabels.map((k, i) => /* @__PURE__ */ jsx("span", { className: styles$2.Key, children: k }, i)),
    /* @__PURE__ */ jsxs("div", { className: classNames(styles$2.Description), children: [
      descriptionButtonStyle && restProps.draggable && /* @__PURE__ */ jsx(SvgDragHandle, { className: styles$2.DragHandleIcon }),
      /* @__PURE__ */ jsx("span", { className: classNames(styles$2.DefaultText), children: description }),
      /* @__PURE__ */ jsx("span", { className: classNames(styles$2.SuccessText), "aria-hidden": !success2, children: successDescription ?? description })
    ] })
  ] });
}
function GlobalSearchShortcutButton({
  shortcut,
  dragInfo,
  ...rest
}) {
  const keyLabels = reactExports.useMemo(() => {
    if (!shortcut) {
      return void 0;
    }
    const keys = [];
    if (D()) {
      if (shortcut.shiftKey) {
        keys.push("⇧");
      }
      if (shortcut.modifierKey) {
        keys.push("⌘");
      }
      if (shortcut.enterKey) {
        keys.push(`↵`);
      }
      if (shortcut.escKey) {
        keys.push(`⎋`);
      }
    } else {
      if (shortcut.modifierKey) {
        keys.push(i18n._(
          /*i18n*/
          {
            id: "F5QOVM"
          }
        ));
      }
      if (shortcut.shiftKey) {
        keys.push(i18n._(
          /*i18n*/
          {
            id: "PGetcZ"
          }
        ));
      }
      if (shortcut.enterKey) {
        keys.push(i18n._(
          /*i18n*/
          {
            id: "9Vnjc9"
          }
        ));
      }
      if (shortcut.escKey) {
        keys.push(i18n._(
          /*i18n*/
          {
            id: "zO1gmR"
          }
        ));
      }
    }
    if (shortcut.key) {
      keys.push(shortcut.key.toUpperCase());
    }
    return keys;
  }, [shortcut]);
  const dragHandlers = useDragHandlers(dragInfo);
  return /* @__PURE__ */ jsx(GlobalSearchShortcutInfo, { element: "button", type: "button", keyLabels, ...dragHandlers, ...rest });
}
const DRAG_COMPLETED_TIMEOUT_MS = 5e3;
function useDragHandlers(dragInfo) {
  const dragStatusRef = reactExports.useRef();
  reactExports.useEffect(() => {
    function handleBeforeUnload() {
      var _a;
      (_a = dragStatusRef.current) == null ? void 0 : _a.markDragCompleted();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  });
  const valueRef = reactExports.useRef();
  return reactExports.useMemo(() => {
    if (!dragInfo) {
      return {};
    }
    return {
      draggable: true,
      onMouseEnter: async () => {
        debugConsole.log("[GlobalSearchShortcutButton]", "mouse enter");
        const value = await dragInfo.getValue();
        valueRef.current = value;
      },
      onMouseLeave: () => {
        debugConsole.log("[GlobalSearchShortcutButton]", "mouse leave");
        valueRef.current = void 0;
      },
      onDragStart: async (e) => {
        debugConsole.log("[GlobalSearchShortcutButton]", "drag leave");
        if (dragStatusRef.current) {
          dragStatusRef.current.markDragCompleted();
          return;
        }
        const value = valueRef.current;
        valueRef.current = void 0;
        if (!value) {
          e.preventDefault();
          return;
        }
        e.dataTransfer.setData("text/plain", value);
        const cleanup = () => {
          window.clearTimeout(timeoutId);
          dragStatusRef.current = void 0;
        };
        const markDragCompleted = () => {
          cleanup();
          dragInfo.onCompleted();
        };
        const timeoutId = window.setTimeout(markDragCompleted, DRAG_COMPLETED_TIMEOUT_MS);
        dragStatusRef.current = {
          markDragCompleted,
          markDragCanceled: cleanup
        };
      },
      onDragEnd: (e) => {
        var _a, _b;
        if (e.dataTransfer.dropEffect === "none") {
          (_a = dragStatusRef.current) == null ? void 0 : _a.markDragCanceled();
        } else {
          (_b = dragStatusRef.current) == null ? void 0 : _b.markDragCompleted();
        }
      }
    };
  }, [dragInfo]);
}
function GlobalSearchResultItem({
  login,
  highlighted: highlighted2,
  defaultHighlighted: defaultHighlighted2,
  actions,
  copiedActionId,
  onClick,
  last: last2,
  checkTotpTimeOffset
}) {
  var _a, _b;
  const {
    headline,
    subheadline,
    subheadlineMonospace
  } = reactExports.useMemo(() => L(login), [login]);
  const uiMode = Z();
  const additionalClickTargetsRef = reactExports.useRef(null);
  const icon = ((_a = login.vaultMetadata) == null ? void 0 : _a.type) === VaultType.TEAM ? "team" : ((_b = login.vaultMetadata) == null ? void 0 : _b.type) === VaultType.INBOX ? "inbox" : void 0;
  return /* @__PURE__ */ jsxs("div", { className: classNames(styles$3.GlobalSearchResultItem, styles$3[uiMode], highlighted2 && styles$3.highlighted, defaultHighlighted2 && styles$3.defaultHighlighted, last2 && styles$3.last), onMouseDown: (e) => {
    var _a2;
    if (additionalClickTargetsRef.current !== e.target && e.target instanceof Node && ((_a2 = additionalClickTargetsRef.current) == null ? void 0 : _a2.contains(e.target))) {
      return;
    }
    onClick();
    e.preventDefault();
  }, children: [
    /* @__PURE__ */ jsxs("header", { className: classNames(styles$3.Header, icon && styles$3.withIcon), children: [
      icon && /* @__PURE__ */ jsx(up, { icon, className: styles$3.Icon }),
      /* @__PURE__ */ jsx("h3", { className: styles$3.Headline, children: headline }),
      /* @__PURE__ */ jsx("em", { className: classNames(styles$3.Subheadline, subheadlineMonospace && styles$3.monospace), children: subheadline })
    ] }),
    /* @__PURE__ */ jsxs("div", { ref: additionalClickTargetsRef, children: [
      /* @__PURE__ */ jsx(ho, { className: styles$3.TotpTimeOffsetWarning, hidden: !login.showTotpTimeOffsetWarning || !highlighted2 && !defaultHighlighted2, recheck: checkTotpTimeOffset }),
      /* @__PURE__ */ jsx(ActionsButtons, { actions, copiedActionId })
    ] })
  ] });
}
function ActionsButtons({
  actions,
  copiedActionId
}) {
  var _a;
  const [actionButtonsInnerRef, {
    height: actionButtonsHeight
  }] = he();
  const oldActionsRef = reactExports.useRef(actions);
  if (actions == null ? void 0 : actions.length) {
    oldActionsRef.current = actions;
  }
  return /* @__PURE__ */ jsx("div", { className: classNames(styles$3.ActionButtons, (actions == null ? void 0 : actions.length) && styles$3.expanded), style: {
    "--height": `${actionButtonsHeight}px`
  }, children: /* @__PURE__ */ jsx("div", { className: styles$3.ActionButtonsInner, ref: actionButtonsInnerRef, children: (_a = actions ?? oldActionsRef.current) == null ? void 0 : _a.map((a) => {
    return /* @__PURE__ */ jsx(GlobalSearchShortcutButton, { description: a.description, successDescription: a.successDescription, success: copiedActionId === a.id, onClick: () => {
      var _a2;
      (_a2 = a.perform()) == null ? void 0 : _a2.catch(trackError);
    }, dragInfo: a.dragInfo, descriptionButtonStyle: true }, a.id);
  }) }) });
}
function GlobalSearch({
  searchString,
  setSearchString,
  highlightedIndex,
  setHighlightedIndex,
  highlightedItemExpanded,
  setHighlightedItemExpanded,
  logins,
  close,
  onHeightChange,
  openUrl,
  checkTotpTimeOffset,
  globalSearchShortcut,
  copy,
  copied,
  getUnprotectedValueForContentLogin: getUnprotectedValueForContentLogin2
}) {
  const [sizeRootRef, contentSize] = he();
  reactExports.useEffect(() => {
    onHeightChange(contentSize.height);
  }, [contentSize.height, onHeightChange]);
  const searchInputRef = reactExports.useRef(null);
  useFocusInput(searchInputRef);
  const virtuosoHandleRef = reactExports.useRef(null);
  const results = reactExports.useMemo(() => {
    if (!logins) {
      return void 0;
    }
    if (!searchString) {
      return [];
    }
    return filterLogins(logins, searchString);
  }, [logins, searchString]);
  const resultCount = results ? results.length : void 0;
  const handleArrowKey = reactExports.useCallback((direction) => {
    var _a, _b;
    if (resultCount === void 0) {
      return;
    }
    const oldHighlightedIndex = highlightedIndex;
    let newHighlightedIndex;
    if (oldHighlightedIndex !== void 0) {
      newHighlightedIndex = oldHighlightedIndex + direction;
    } else if (direction === 1) {
      newHighlightedIndex = 1;
    }
    if (newHighlightedIndex !== void 0 && newHighlightedIndex < 0) {
      newHighlightedIndex = void 0;
    } else if (newHighlightedIndex !== void 0 && newHighlightedIndex >= resultCount) {
      newHighlightedIndex = resultCount - 1;
    }
    if (newHighlightedIndex !== oldHighlightedIndex) {
      setHighlightedIndex(newHighlightedIndex);
      setHighlightedItemExpanded(false);
    }
    const searchInput = searchInputRef.current;
    if (newHighlightedIndex === void 0) {
      if (oldHighlightedIndex === void 0) {
        if (searchInput) {
          searchInput.selectionStart = 0;
          searchInput.selectionEnd = 0;
        }
      } else {
        (_a = searchInputRef.current) == null ? void 0 : _a.select();
      }
    } else if (oldHighlightedIndex === void 0 && searchInput) {
      searchInput.selectionStart = searchInput.value.length;
      searchInput.selectionEnd = searchInput.value.length;
    }
    if (newHighlightedIndex !== void 0) {
      debugConsole.log("[GlobalSearch]", "scrolling into view", newHighlightedIndex);
      (_b = virtuosoHandleRef.current) == null ? void 0 : _b.scrollIntoView({
        index: newHighlightedIndex
      });
    }
  }, [highlightedIndex, resultCount, setHighlightedIndex, setHighlightedItemExpanded]);
  const loginForActions = results == null ? void 0 : results[highlightedIndex ?? 0];
  const globalActions = useGlobalActions({
    loginForActions,
    close,
    openUrl
  });
  const {
    loginActions,
    copiedActionId
  } = useLoginActions({
    login: loginForActions,
    openUrl,
    close,
    copy,
    copied,
    getUnprotectedValueForContentLogin: getUnprotectedValueForContentLogin2
  });
  const modifierKeyName = yh();
  reactExports.useEffect(() => {
    const handleKeyDown = (e) => {
      var _a;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const direction = e.key === "ArrowDown" ? 1 : -1;
        handleArrowKey(direction);
        e.preventDefault();
        return;
      }
      const actions = [...loginActions, ...globalActions];
      const action = actions == null ? void 0 : actions.find((a) => {
        var _a2;
        return !!a.shortcut.modifierKey === e[modifierKeyName] && !!a.shortcut.shiftKey === e.shiftKey && // Note: e.key is always lower case on mac, but can be upper case on linux when pressed
        // together with shift to we normalize to lower case
        (((_a2 = a.shortcut.key) == null ? void 0 : _a2.toLowerCase()) === e.key.toLowerCase() || a.shortcut.enterKey && e.key === "Enter" || a.shortcut.escKey && e.key === "Escape");
      });
      if (action) {
        e.preventDefault();
        (_a = action.perform()) == null ? void 0 : _a.catch(trackError);
        return;
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [close, highlightedIndex, handleArrowKey, searchString, loginActions, modifierKeyName, setSearchString, globalActions]);
  const permissionHint = loginForActions && zn({
    uiType: getValueWithPlaceholder(loginForActions.uiType),
    permissions: loginForActions.permissions,
    usePronoun: false
  });
  const actionsToShow = (loginActions == null ? void 0 : loginActions.length) ? loginActions : !searchString ? globalActions : void 0;
  const globalSearchShortcutKeyLabels = reactExports.useMemo(() => globalSearchShortcut !== void 0 ? F(globalSearchShortcut, D()) : void 0, [globalSearchShortcut]);
  const uiMode = Z();
  const HeyloginIcon2 = uiMode === "dark" ? SvgHeyloginIconDark : SvgHeyloginIcon;
  return /* @__PURE__ */ jsxs("div", { ref: sizeRootRef, className: styles$4.GlobalSearch, children: [
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx($h, { value: searchString, placeholder: i18n._(
        /*i18n*/
        {
          id: "ekAm3+"
        }
      ), ref: searchInputRef, onChange: (e) => {
        setHighlightedIndex(void 0);
        setSearchString(e.currentTarget.value);
      }, autoFocus: true, clear: () => setSearchString(""), inlineUi: /* @__PURE__ */ jsx(HeyloginIcon2, { className: styles$4.HeyloginIcon }) }),
      results !== void 0 && results.length > 0 ? /* @__PURE__ */ jsx(ResultsList, { results, highlightedIndex, virtuosoHandleRef, setHighlightedIndex, highlightedItemExpanded, setHighlightedItemExpanded, loginActions, copiedActionId, checkTotpTimeOffset }) : !!searchString && results !== void 0 && /* @__PURE__ */ jsx("em", { className: styles$4.NoResultsHint, children: "No results found" })
    ] }),
    !!(actionsToShow == null ? void 0 : actionsToShow.length) && /* @__PURE__ */ jsxs("section", { className: styles$4.ShortcutHints, children: [
      actionsToShow === globalActions && globalSearchShortcutKeyLabels && /* @__PURE__ */ jsx(GlobalSearchShortcutInfo, { keyLabels: globalSearchShortcutKeyLabels, description: i18n._(
        /*i18n*/
        {
          id: "Qf8ECA"
        }
      ) }),
      actionsToShow.map((a) => {
        return /* @__PURE__ */ jsx(GlobalSearchShortcutButton, { shortcut: a.shortcut, description: a.description, successDescription: a.successDescription, success: copiedActionId === a.id, onClick: () => {
          var _a;
          (_a = a.perform()) == null ? void 0 : _a.catch(trackError);
        }, dragInfo: a.dragInfo }, a.id);
      }),
      permissionHint && /* @__PURE__ */ jsx("div", { className: styles$4.PermissionHint, children: permissionHint })
    ] })
  ] });
}
function ResultsList({
  results,
  highlightedIndex,
  virtuosoHandleRef,
  setHighlightedIndex,
  highlightedItemExpanded,
  setHighlightedItemExpanded,
  loginActions,
  copiedActionId,
  checkTotpTimeOffset
}) {
  const initialHighlightedItemScrolledIntoViewRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!results || highlightedIndex === void 0 || initialHighlightedItemScrolledIntoViewRef.current || !virtuosoHandleRef.current) {
      return;
    }
    const tid = window.setTimeout(() => {
      var _a;
      initialHighlightedItemScrolledIntoViewRef.current = true;
      (_a = virtuosoHandleRef.current) == null ? void 0 : _a.scrollIntoView({
        index: highlightedIndex
      });
    }, 10);
    return () => window.clearTimeout(tid);
  }, [highlightedIndex, results, virtuosoHandleRef]);
  const [totalListHeight, setTotalListHeight] = reactExports.useState(0);
  return /* @__PURE__ */ jsx("div", { className: styles$4.ResultsList, style: {
    height: `${totalListHeight}px`
  }, children: /* @__PURE__ */ jsx(
    Virtuoso,
    {
      tabIndex: -1,
      increaseViewportBy: 2,
      totalCount: results.length,
      ref: virtuosoHandleRef,
      totalListHeightChanged: (h) => setTotalListHeight(h),
      alignToBottom: true,
      followOutput: true,
      itemContent: (index) => {
        const login = results[index];
        const highlighted2 = highlightedIndex === index;
        const expanded2 = highlighted2 && highlightedItemExpanded;
        return /* @__PURE__ */ jsx(GlobalSearchResultItem, { login, highlighted: highlighted2, defaultHighlighted: highlightedIndex === void 0 && index === 0, onClick: () => {
          var _a;
          setHighlightedIndex(index);
          setHighlightedItemExpanded(index === highlightedIndex ? !highlightedItemExpanded : true);
          (_a = virtuosoHandleRef.current) == null ? void 0 : _a.scrollIntoView({
            index,
            behavior: "smooth"
          });
        }, last: index === results.length - 1, actions: expanded2 ? loginActions : void 0, copiedActionId, checkTotpTimeOffset }, login.id);
      }
    }
  ) });
}
function useFocusInput(searchInputRef) {
  reactExports.useEffect(() => {
    const handleWindowFocus = () => {
      var _a;
      (_a = searchInputRef.current) == null ? void 0 : _a.focus();
    };
    window.addEventListener("focus", handleWindowFocus);
    return () => {
      window.removeEventListener("focus", handleWindowFocus);
    };
  });
}
function useGlobalActions({
  loginForActions,
  close,
  openUrl
}) {
  return reactExports.useMemo(() => {
    const actions = [];
    if (!loginForActions) {
      const frontendServerHost = getFrontendServerHost();
      actions.push({
        id: "openWebapp",
        shortcut: {
          enterKey: true
        },
        description: i18n._(
          /*i18n*/
          {
            id: "yaFLo0",
            values: {
              frontendServerHost
            }
          }
        ),
        perform: () => {
          openUrl(getFrontendServerUrl());
          close();
        }
      });
    }
    actions.push({
      id: "close",
      shortcut: {
        escKey: true
      },
      description: i18n._(
        /*i18n*/
        {
          id: "yz7wBu"
        }
      ),
      perform: close
    });
    return actions;
  }, [close, loginForActions, openUrl]);
}
function useLoginActions({
  login,
  openUrl,
  close,
  copied,
  copy,
  getUnprotectedValueForContentLogin: getUnprotectedValueForContentLogin2
}) {
  const [copiedActionId, setCopiedActionId] = reactExports.useState();
  const {
    i18n: i18n2
  } = useLingui();
  const {
    writeAuditlogEvent
  } = mh();
  const loginActions = reactExports.useMemo(() => {
    var _a;
    if (!login) {
      return [];
    }
    function makeCopyAction({
      field,
      loginId,
      name,
      getValue: getValue2,
      isProtected,
      auditlogEventType,
      auditlogEventCustomFieldId,
      ...rest
    }) {
      function writeAuditlog() {
        var _a2, _b;
        if ((login == null ? void 0 : login.organization) && auditlogEventType) {
          writeAuditlogEvent(login.organization.id, {
            type: auditlogEventType,
            loginId: login.id,
            vaultId: (_a2 = login.vaultMetadata) == null ? void 0 : _a2.id,
            customFieldId: auditlogEventCustomFieldId,
            loginRevisionId: (_b = login.history) == null ? void 0 : _b.currentRevisionId,
            loginEditTime: login.editTime
          });
        }
      }
      const id2 = `${loginId}-${field}`;
      const uppercaseName = name.length ? name[0].toLocaleUpperCase(i18n2.locale) + name.slice(1) : name;
      return {
        ...rest,
        id: id2,
        description: i18n2._(
          /*i18n*/
          {
            id: "mPl5nx",
            values: {
              name
            }
          }
        ),
        successDescription: i18n2._(
          /*i18n*/
          {
            id: "pgvip9",
            values: {
              uppercaseName
            }
          }
        ),
        perform: async () => {
          const valuePromise = getValue2();
          copy(valuePromise, isProtected);
          setCopiedActionId(id2);
          writeAuditlog();
        },
        dragInfo: {
          getValue: getValue2,
          onCompleted: () => {
            writeAuditlog();
          }
        }
      };
    }
    const actions = [];
    if (login.websites.length) {
      const website = login.websites[0];
      const attributes = (_a = login.websiteAttributes) == null ? void 0 : _a[website];
      const url = `${getValueWithPlaceholder(attributes == null ? void 0 : attributes.protocol) ?? "http"}://${website}`;
      actions.push({
        id: "open-website",
        description: i18n2._(
          /*i18n*/
          {
            id: "yxTdsJ"
          }
        ),
        shortcut: {
          enterKey: true
        },
        perform: () => {
          openUrl(url);
          close();
        }
      });
    }
    if (login.loginUrl) {
      const loginUrl = login.loginUrl;
      actions.push({
        id: "open-webapp",
        description: i18n2._(
          /*i18n*/
          {
            id: "+Gd0x/"
          }
        ),
        shortcut: {
          enterKey: true,
          shiftKey: true
        },
        perform: () => {
          openUrl(loginUrl);
          close();
        }
      });
    }
    if (login.uiType === LoginUiType.login) {
      if (login.username !== "") {
        actions.push(makeCopyAction({
          loginId: login.id,
          field: "username",
          shortcut: {
            modifierKey: true,
            key: "c"
          },
          name: i18n2._(
            /*i18n*/
            {
              id: "silO9A"
            }
          ),
          getValue: () => login.username
        }));
      }
      if (login.permissions.viewSecrets && !isEmptyValue(login.password)) {
        actions.push(makeCopyAction({
          loginId: login.id,
          field: "password",
          shortcut: {
            modifierKey: true,
            shiftKey: true,
            key: "c"
          },
          name: i18n2._(
            /*i18n*/
            {
              id: "OMcfn6"
            }
          ),
          getValue: () => getUnprotectedValueForContentLogin2(login, login.password),
          auditlogEventType: AuditlogEventType.LOGIN_R_PASSWORD_COPY,
          isProtected: true
        }));
      }
      if (login.totp !== void 0) {
        const protectedTotpSecret = login.totp;
        actions.push(makeCopyAction({
          loginId: login.id,
          field: "totp",
          shortcut: {
            modifierKey: true,
            key: "t"
          },
          name: i18n2._(
            /*i18n*/
            {
              id: "XMUTjs"
            }
          ),
          getValue: async () => {
            const totpSecret = await getUnprotectedValueForContentLogin2(login, protectedTotpSecret);
            if (!totpSecret) {
              return void 0;
            }
            const {
              totp
            } = calculateTotp(totpSecret.toUpperCase().trim(), getValueWithPlaceholder(login.totpAlgorithm) ?? DEFAULT_TOTP_ALGORITHM, login.totpDigits ?? DEFAULT_TOTP_DIGITS, login.totpPeriod ?? DEFAULT_TOTP_PERIOD);
            return totp;
          }
        }));
      }
    }
    if (login.uiType === LoginUiType.creditCard && login.creditCard) {
      const creditCard = login.creditCard;
      if (creditCard.number !== "") {
        actions.push(makeCopyAction({
          loginId: login.id,
          field: "number",
          shortcut: {
            modifierKey: true,
            key: "c"
          },
          name: i18n2._(
            /*i18n*/
            {
              id: "cQOi/5"
            }
          ),
          getValue: () => creditCard.number.replaceAll(" ", "")
        }));
      }
      if (creditCard.securityCode !== void 0 && login.permissions.viewSecrets && !isEmptyValue(creditCard.securityCode)) {
        const securityCode = creditCard.securityCode;
        actions.push(makeCopyAction({
          loginId: login.id,
          field: "securityCode",
          shortcut: {
            modifierKey: true,
            shiftKey: true,
            key: "c"
          },
          name: i18n2._(
            /*i18n*/
            {
              id: "3r06QJ"
            }
          ),
          getValue: () => getUnprotectedValueForContentLogin2(login, securityCode),
          auditlogEventType: AuditlogEventType.CREDIT_CARD_R_SECURITY_CODE_COPY,
          isProtected: true
        }));
      }
      if (creditCard.pin !== void 0 && login.permissions.viewSecrets) {
        const pin = creditCard.pin;
        actions.push(makeCopyAction({
          loginId: login.id,
          field: "pin",
          shortcut: {
            modifierKey: true,
            shiftKey: true,
            key: "p"
          },
          name: i18n2._(
            /*i18n*/
            {
              id: "sXULwc"
            }
          ),
          getValue: () => getUnprotectedValueForContentLogin2(login, pin),
          auditlogEventType: AuditlogEventType.CREDIT_CARD_R_PIN_COPY,
          isProtected: true
        }));
      }
      if (creditCard.expiration !== "") {
        actions.push(makeCopyAction({
          loginId: login.id,
          field: "expiration",
          shortcut: {
            modifierKey: true,
            shiftKey: true,
            key: "e"
          },
          name: i18n2._(
            /*i18n*/
            {
              id: "7lpQPT"
            }
          ),
          getValue: () => creditCard.expiration
        }));
      }
    }
    if (login.uiType === LoginUiType.note && login.note !== "") {
      actions.push(makeCopyAction({
        loginId: login.id,
        field: "note",
        shortcut: {
          modifierKey: true,
          key: "c"
        },
        name: i18n2._(
          /*i18n*/
          {
            id: "/hpEcX"
          }
        ),
        getValue: () => login.note
      }));
    }
    if (login.uiType === LoginUiType.wifi) {
      if (login.wifiSsid) {
        actions.push(makeCopyAction({
          loginId: login.id,
          field: "wifiSsid",
          shortcut: {
            modifierKey: true,
            key: "c"
          },
          name: i18n2._(
            /*i18n*/
            {
              id: "xgPaC3"
            }
          ),
          getValue: () => login.wifiSsid ?? ""
        }));
      }
      if (login.permissions.viewSecrets && !isEmptyValue(login.password)) {
        actions.push(makeCopyAction({
          loginId: login.id,
          field: "password",
          shortcut: {
            modifierKey: true,
            shiftKey: true,
            key: "c"
          },
          name: i18n2._(
            /*i18n*/
            {
              id: "OMcfn6"
            }
          ),
          getValue: () => getUnprotectedValueForContentLogin2(login, login.password),
          auditlogEventType: AuditlogEventType.LOGIN_R_PASSWORD_COPY,
          isProtected: true
        }));
      }
    }
    let customFieldIndex = 0;
    for (const cf of login.customFields) {
      if (customFieldIndex >= 9) {
        break;
      }
      if (cf.name.trim() === "") {
        continue;
      }
      const value = cf.value;
      if (cf.protected && (!login.permissions.viewSecrets || isEmptyValue(cf.value))) {
        continue;
      }
      actions.push(makeCopyAction({
        loginId: login.id,
        field: `customField${customFieldIndex}`,
        shortcut: {
          modifierKey: true,
          key: `${customFieldIndex + 1}`
        },
        name: cf.name,
        getValue: () => typeof value === "string" ? value : getUnprotectedValueForContentLogin2(login, value),
        auditlogEventType: AuditlogEventType.LOGIN_R_CUSTOM_FIELD_COPY,
        auditlogEventCustomFieldId: cf.id,
        isProtected: cf.protected
      }));
      customFieldIndex++;
    }
    return actions;
  }, [login, i18n2.locale, writeAuditlogEvent, copy, openUrl, close, getUnprotectedValueForContentLogin2]);
  return {
    loginActions,
    copiedActionId: copied ? copiedActionId : void 0
  };
}
const GlobalSearchNotPaired$1 = "_GlobalSearchNotPaired_ngbpv_1";
const WebappLink = "_WebappLink_ngbpv_15";
const WebappButton = "_WebappButton_ngbpv_20";
const styles$1 = {
  GlobalSearchNotPaired: GlobalSearchNotPaired$1,
  WebappLink,
  WebappButton
};
function GlobalSearchNotPaired({
  close,
  onHeightChange
}) {
  const [sizeRootRef, contentSize] = he();
  reactExports.useEffect(() => {
    onHeightChange(contentSize.height);
  }, [contentSize.height, onHeightChange]);
  useCloseOnEscape(close);
  return /* @__PURE__ */ jsxs("div", { ref: sizeRootRef, className: styles$1.GlobalSearchNotPaired, children: [
    /* @__PURE__ */ jsx("h1", { children: /* @__PURE__ */ jsx(Trans, { id: "Uqbot7" }) }),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(Trans, { id: "qdCXwe", values: {
      0: getFrontendServerHost()
    }, components: {
      0: /* @__PURE__ */ jsx("a", { className: styles$1.WebappLink, href: getFrontendServerUrl(), target: "_blank", rel: "noreferrer" })
    } }) }),
    /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(be, { buttonStyle: "primary", element: "a", href: getFrontendServerUrl(), target: "_blank", rel: "noreferrer", className: styles$1.WebappButton, children: /* @__PURE__ */ jsx(Trans, { id: "fYyARG" }) }) })
  ] });
}
function GlobalSearchUnlock({
  displayEmail,
  pushState,
  unlockDeviceType,
  requestUnlock,
  cancelLogin,
  close
}) {
  useCloseOnEscape(close);
  return /* @__PURE__ */ jsx(Ih, { state: pushState, unlockDeviceType, onRetry: requestUnlock, onCancel: cancelLogin, landscape: true, children: /* @__PURE__ */ jsx(Sh, { onClick: requestUnlock, size: "small", children: displayEmail || /* @__PURE__ */ jsx(Trans, { id: "VAOn4r" }) }) });
}
function GlobalSearchApp() {
  reactExports.useEffect(() => {
    addAchievement(Achievement.EXT_GLOBAL_SEARCH_OPEN);
  }, []);
  const initiallyUnlocked = reactExports.useMemo(() => {
    return new URLSearchParams(window.location.search).has("initiallyUnlocked");
  }, []);
  const {
    isUnlocked,
    pushState,
    requestUnlock,
    cancelLogin,
    unlockDeviceType
  } = useUnlock({
    achievement: Achievement.EXT_GLOBAL_SEARCH_UNLOCK,
    unlockOnInitialRender: true
  });
  const [searchString, setSearchString] = reactExports.useState(() => new URLSearchParams(window.location.search).get("searchString") ?? "");
  const [highlightedIndex, setHighlightedIndex] = reactExports.useState(() => {
    const parsedCandidate = Number(new URLSearchParams(window.location.search).get("highlightedIndex"));
    if (Number.isNaN(parsedCandidate)) {
      return void 0;
    }
    return parsedCandidate;
  });
  const [highlightedItemExpanded, setHighlightedItemExpanded] = reactExports.useState(() => {
    return new URLSearchParams(window.location.search).has("highlightedItemExpanded");
  });
  const saveState = reactExports.useCallback(() => {
    return sendMessage({
      type: "SaveGlobalSearchState",
      state: {
        lastUpdateTimestampMs: Date.now(),
        searchString,
        highlightedIndex,
        highlightedItemExpanded,
        top: window.screenTop,
        left: window.screenLeft,
        width: window.outerWidth,
        height: window.outerHeight
      }
    });
  }, [highlightedIndex, highlightedItemExpanded, searchString]);
  reactExports.useEffect(() => {
    function handler() {
      saveState().catch(trackError);
    }
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [saveState]);
  const {
    logins,
    pairing
  } = useClientCoreData();
  const globalSearchShortcut = useGlobalSearchShortcut();
  const close = reactExports.useCallback(() => {
    saveState().then(() => window.close()).catch(trackError);
  }, [saveState]);
  const openUrl = reactExports.useCallback((url) => {
    sendMessage({
      type: "GlobalSearchOpenUrl",
      url
    }).catch(trackError);
  }, []);
  const checkTotpTimeOffset = reactExports.useCallback(async () => {
    await sendMessage({
      type: "RequestSync"
    });
  }, []);
  const isLoading = logins === void 0 && pairing === void 0;
  const handleHeightChange = useAutoHeight(isLoading);
  const showLockedOverlay = !(isUnlocked ?? initiallyUnlocked);
  const [copied, copy] = useCopyToClipboard(copyToClipboardWithClear);
  return /* @__PURE__ */ jsx(_h, { writeAuditlogEvent: (organizationId, event) => {
    sendMessage({
      type: "WriteAuditlogEvent",
      organizationId,
      event
    }).catch(trackError);
  }, children: pairing !== void 0 && !pairing.paired ? /* @__PURE__ */ jsx(GlobalSearchNotPaired, { close, onHeightChange: handleHeightChange }) : showLockedOverlay ? /* @__PURE__ */ jsx(GlobalSearchUnlock, { displayEmail: pairing == null ? void 0 : pairing.displayEmail, pushState, unlockDeviceType, requestUnlock, cancelLogin, close }) : /* @__PURE__ */ jsx(GlobalSearch, { searchString, setSearchString, highlightedIndex, setHighlightedIndex, logins, close, onHeightChange: handleHeightChange, openUrl, highlightedItemExpanded, setHighlightedItemExpanded, checkTotpTimeOffset, globalSearchShortcut, copy, copied, getUnprotectedValueForContentLogin }) });
}
function useAutoHeight(isLoading) {
  const [contentHeight, setContentHeight] = reactExports.useState();
  const handleHeightChange = reactExports.useCallback((height) => {
    if (height === 0) {
      return;
    }
    setContentHeight(height);
  }, []);
  const windowHeightMutex = reactExports.useMemo(() => new Mutex(), []);
  const setWindowInnerHeight = reactExports.useCallback(async (height) => {
    await windowHeightMutex.runExclusive(async () => {
      const targetHeight = height + (window.outerHeight - window.innerHeight);
      if (window.outerHeight !== targetHeight) {
        await sendMessage({
          type: "SetGlobalSearchHeight",
          height: targetHeight
        });
      }
    });
  }, [windowHeightMutex]);
  reactExports.useEffect(() => {
    if (!contentHeight) {
      return;
    }
    if (isLoading) {
      return;
    }
    setWindowInnerHeight(contentHeight).catch(trackError);
    const interval = window.setInterval(() => {
      setWindowInnerHeight(contentHeight).catch(trackError);
    }, 200);
    return () => window.clearInterval(interval);
  }, [contentHeight, isLoading, setWindowInnerHeight]);
  return handleHeightChange;
}
function useClientCoreData() {
  const [clientCoreData, setClientCoreData] = reactExports.useState({});
  const updateState = reactExports.useCallback(() => {
    (async () => {
      const [loginsResponse, pairing] = await Promise.all([sendMessage({
        type: "GetLogins",
        all: true
      }), sendMessage({
        type: "GetUser"
      })]);
      setClientCoreData({
        logins: loginsResponse === messageError ? void 0 : loginsResponse == null ? void 0 : loginsResponse.logins,
        pairing: pairing === messageError ? void 0 : pairing.userId ? {
          paired: true,
          displayEmail: pairing.displayEmail
        } : {
          paired: false
        }
      });
    })().catch(trackError);
  }, []);
  const stateLoadedInitiallyRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (stateLoadedInitiallyRef.current) {
      return;
    }
    stateLoadedInitiallyRef.current = true;
    updateState();
  }, [updateState]);
  reactExports.useEffect(() => {
    const updateStateDebounced = debounce(100, updateState);
    const messageListener = makeMessageListener({
      DataUpdate: updateStateDebounced
    });
    browser.runtime.onMessage.addListener(messageListener);
    return () => browser.runtime.onMessage.removeListener(messageListener);
  }, [updateState]);
  return clientCoreData;
}
function useGlobalSearchShortcut() {
  const [globalSearchShortcut, setGlobalSearchShortcut] = reactExports.useState();
  const updateState = reactExports.useCallback(() => {
    (async () => {
      const response = await sendMessage({
        type: "GetGlobalSearchShortcut"
      });
      debugConsole.log("[GlobalSearchApp]", response);
      setGlobalSearchShortcut(response === messageError ? void 0 : response.globalSearchShortcut);
    })().catch(trackError);
  }, []);
  reactExports.useEffect(() => {
    updateState();
    const interval = window.setInterval(updateState, 1e3);
    return () => window.clearInterval(interval);
  }, [updateState]);
  return globalSearchShortcut;
}
const globalSearch = "_globalSearch_1w40h_1";
const UnstyledButton = "_UnstyledButton_1w40h_18";
const styles = {
  globalSearch,
  UnstyledButton
};
document.documentElement.classList.add(styles.globalSearch);
initSentry({
  entryPoint: "globalSearch"
});
initUiLocale();
ReactDOM.render(/* @__PURE__ */ jsx(I18nProvider, { i18n, children: /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(ExtDebugVisibleContextProvider, { children: /* @__PURE__ */ jsx(lh, { children: /* @__PURE__ */ jsx(GlobalSearchApp, {}) }) }) }) }), document.getElementById("root"));
//# sourceMappingURL=wrappedIndex-c824035f.js.map
