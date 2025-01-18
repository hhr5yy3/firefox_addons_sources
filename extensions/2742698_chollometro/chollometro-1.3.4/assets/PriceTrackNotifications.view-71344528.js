import { R as React, r as reactExports, c as commonjsGlobal } from "./index-3da6bb4f.js";
import { r as reactDomExports, a as jsxs, j as jsx, F as Fragment } from "./index-3699c331.js";
import { h as hooks, t as takeEvery$1, q as querySimpleLoginSaga, Q as Q_SIMPLE_LOGIN, d as answerSimpleLoginSaga, A as A_SIMPLE_LOGIN, e as logOutSaga, L as LOGOUT, w as watchBackgroundSaga, f as all, g as call, a as settingsAPIHandler, p as put, i as setMenuOpen, j as isBrowserActionPage, k as querySimpleLogin, m as createSlice, n as addExtensionUTMParamsToLink, o as sagaMiddlewareFactory, r as combineReducers, u as createStore, v as compose, x as applyMiddleware, y as debugReducer, z as appReducer$1, R as Reducer$2, P as ProductStatsReducer, B as account, C as postedOfferReducer, s as setLoginStatus, D as closeView, E as priceTrackAPI, F as metricAlertsApi, G as priceTrackNotificationsAPI, N as NotificationStatus, H as disableMarker } from "./metricsAlerts.api-6ae7940f.js";
import { r as require$$0, c as classNames, B as Button, L as Loader } from "./Button-e5b90d65.js";
import { O as ObservableAPIStore, b as browser, U as UserData, l as logger, a as logger$1 } from "./urlAccess-93f11c64.js";
var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      return;
    }
    var err = new Error(
      "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
    );
    err.name = "Invariant Violation";
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
{
  factoryWithThrowingShims();
}
var ReactReduxContext = /* @__PURE__ */ React.createContext(null);
function defaultNoopBatch(callback) {
  callback();
}
var batch = defaultNoopBatch;
var setBatch = function setBatch2(newBatch) {
  return batch = newBatch;
};
var getBatch = function getBatch2() {
  return batch;
};
function createListenerCollection() {
  var batch2 = getBatch();
  var first = null;
  var last = null;
  return {
    clear: function clear() {
      first = null;
      last = null;
    },
    notify: function notify2() {
      batch2(function() {
        var listener = first;
        while (listener) {
          listener.callback();
          listener = listener.next;
        }
      });
    },
    get: function get2() {
      var listeners = [];
      var listener = first;
      while (listener) {
        listeners.push(listener);
        listener = listener.next;
      }
      return listeners;
    },
    subscribe: function subscribe(callback) {
      var isSubscribed = true;
      var listener = last = {
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
        if (!isSubscribed || first === null)
          return;
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
var nullListeners = {
  notify: function notify() {
  },
  get: function get() {
    return [];
  }
};
function createSubscription(store2, parentSub) {
  var unsubscribe;
  var listeners = nullListeners;
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
      unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store2.subscribe(handleChangeWrapper);
      listeners = createListenerCollection();
    }
  }
  function tryUnsubscribe() {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = void 0;
      listeners.clear();
      listeners = nullListeners;
    }
  }
  var subscription = {
    addNestedSub,
    notifyNestedSubs,
    handleChangeWrapper,
    isSubscribed,
    trySubscribe,
    tryUnsubscribe,
    getListeners: function getListeners() {
      return listeners;
    }
  };
  return subscription;
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
function Provider(_ref) {
  var store2 = _ref.store, context = _ref.context, children = _ref.children;
  var contextValue = reactExports.useMemo(function() {
    var subscription = createSubscription(store2);
    subscription.onStateChange = subscription.notifyNestedSubs;
    return {
      store: store2,
      subscription
    };
  }, [store2]);
  var previousState = reactExports.useMemo(function() {
    return store2.getState();
  }, [store2]);
  useIsomorphicLayoutEffect(function() {
    var subscription = contextValue.subscription;
    subscription.trySubscribe();
    if (previousState !== store2.getState()) {
      subscription.notifyNestedSubs();
    }
    return function() {
      subscription.tryUnsubscribe();
      subscription.onStateChange = null;
    };
  }, [contextValue, previousState]);
  var Context = context || ReactReduxContext;
  return /* @__PURE__ */ React.createElement(Context.Provider, {
    value: contextValue
  }, children);
}
var reactIsExports = {};
var reactIs$1 = {
  get exports() {
    return reactIsExports;
  },
  set exports(v2) {
    reactIsExports = v2;
  }
};
var reactIs_production_min = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = "function" === typeof Symbol && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
function z(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;
    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;
              default:
                return u;
            }
        }
      case d:
        return u;
    }
  }
}
function A(a) {
  return z(a) === m;
}
reactIs_production_min.AsyncMode = l;
reactIs_production_min.ConcurrentMode = m;
reactIs_production_min.ContextConsumer = k;
reactIs_production_min.ContextProvider = h;
reactIs_production_min.Element = c;
reactIs_production_min.ForwardRef = n;
reactIs_production_min.Fragment = e;
reactIs_production_min.Lazy = t;
reactIs_production_min.Memo = r;
reactIs_production_min.Portal = d;
reactIs_production_min.Profiler = g;
reactIs_production_min.StrictMode = f;
reactIs_production_min.Suspense = p;
reactIs_production_min.isAsyncMode = function(a) {
  return A(a) || z(a) === l;
};
reactIs_production_min.isConcurrentMode = A;
reactIs_production_min.isContextConsumer = function(a) {
  return z(a) === k;
};
reactIs_production_min.isContextProvider = function(a) {
  return z(a) === h;
};
reactIs_production_min.isElement = function(a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};
reactIs_production_min.isForwardRef = function(a) {
  return z(a) === n;
};
reactIs_production_min.isFragment = function(a) {
  return z(a) === e;
};
reactIs_production_min.isLazy = function(a) {
  return z(a) === t;
};
reactIs_production_min.isMemo = function(a) {
  return z(a) === r;
};
reactIs_production_min.isPortal = function(a) {
  return z(a) === d;
};
reactIs_production_min.isProfiler = function(a) {
  return z(a) === g;
};
reactIs_production_min.isStrictMode = function(a) {
  return z(a) === f;
};
reactIs_production_min.isSuspense = function(a) {
  return z(a) === p;
};
reactIs_production_min.isValidElementType = function(a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};
reactIs_production_min.typeOf = z;
(function(module) {
  {
    module.exports = reactIs_production_min;
  }
})(reactIs$1);
var reactIs = reactIsExports;
var FORWARD_REF_STATICS = {
  "$$typeof": true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  "$$typeof": true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
function useReduxContext() {
  var contextValue = reactExports.useContext(ReactReduxContext);
  return contextValue;
}
function createStoreHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }
  var useReduxContext$1 = context === ReactReduxContext ? useReduxContext : function() {
    return reactExports.useContext(context);
  };
  return function useStore2() {
    var _useReduxContext = useReduxContext$1(), store2 = _useReduxContext.store;
    return store2;
  };
}
var useStore = /* @__PURE__ */ createStoreHook();
function createDispatchHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }
  var useStore$1 = context === ReactReduxContext ? useStore : createStoreHook(context);
  return function useDispatch2() {
    var store2 = useStore$1();
    return store2.dispatch;
  };
}
var useDispatch = /* @__PURE__ */ createDispatchHook();
var refEquality = function refEquality2(a, b2) {
  return a === b2;
};
function useSelectorWithStoreAndSubscription(selector, equalityFn, store2, contextSub) {
  var _useReducer = reactExports.useReducer(function(s) {
    return s + 1;
  }, 0), forceRender = _useReducer[1];
  var subscription = reactExports.useMemo(function() {
    return createSubscription(store2, contextSub);
  }, [store2, contextSub]);
  var latestSubscriptionCallbackError = reactExports.useRef();
  var latestSelector = reactExports.useRef();
  var latestStoreState = reactExports.useRef();
  var latestSelectedState = reactExports.useRef();
  var storeState = store2.getState();
  var selectedState;
  try {
    if (selector !== latestSelector.current || storeState !== latestStoreState.current || latestSubscriptionCallbackError.current) {
      var newSelectedState = selector(storeState);
      if (latestSelectedState.current === void 0 || !equalityFn(newSelectedState, latestSelectedState.current)) {
        selectedState = newSelectedState;
      } else {
        selectedState = latestSelectedState.current;
      }
    } else {
      selectedState = latestSelectedState.current;
    }
  } catch (err) {
    if (latestSubscriptionCallbackError.current) {
      err.message += "\nThe error may be correlated with this previous error:\n" + latestSubscriptionCallbackError.current.stack + "\n\n";
    }
    throw err;
  }
  useIsomorphicLayoutEffect(function() {
    latestSelector.current = selector;
    latestStoreState.current = storeState;
    latestSelectedState.current = selectedState;
    latestSubscriptionCallbackError.current = void 0;
  });
  useIsomorphicLayoutEffect(function() {
    function checkForUpdates() {
      try {
        var newStoreState = store2.getState();
        if (newStoreState === latestStoreState.current) {
          return;
        }
        var _newSelectedState = latestSelector.current(newStoreState);
        if (equalityFn(_newSelectedState, latestSelectedState.current)) {
          return;
        }
        latestSelectedState.current = _newSelectedState;
        latestStoreState.current = newStoreState;
      } catch (err) {
        latestSubscriptionCallbackError.current = err;
      }
      forceRender();
    }
    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe();
    checkForUpdates();
    return function() {
      return subscription.tryUnsubscribe();
    };
  }, [store2, subscription]);
  return selectedState;
}
function createSelectorHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }
  var useReduxContext$1 = context === ReactReduxContext ? useReduxContext : function() {
    return reactExports.useContext(context);
  };
  return function useSelector2(selector, equalityFn) {
    if (equalityFn === void 0) {
      equalityFn = refEquality;
    }
    var _useReduxContext = useReduxContext$1(), store2 = _useReduxContext.store, contextSub = _useReduxContext.subscription;
    var selectedState = useSelectorWithStoreAndSubscription(selector, equalityFn, store2, contextSub);
    reactExports.useDebugValue(selectedState);
    return selectedState;
  };
}
var useSelector = /* @__PURE__ */ createSelectorHook();
setBatch(reactDomExports.unstable_batchedUpdates);
function useAPIResource(apiHandler, { syncError = false } = {}) {
  const obAPI = ObservableAPIStore.get(apiHandler);
  const [data, setData] = reactExports.useState(() => obAPI.readSync());
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const valueSub = obAPI.onUpdate$.subscribe({
      next(data2) {
        setData(data2);
      }
    });
    const isLoadingSub = obAPI.isLoading$.subscribe({ next: setIsLoading });
    return () => {
      valueSub.unsubscribe();
      isLoadingSub.unsubscribe();
    };
  }, []);
  return [
    obAPI.readSync(),
    obAPI,
    { isLoading }
    // subject as IAPIObservable<TResource>
  ];
}
function useAPI(apiHandler) {
  const obAPI = ObservableAPIStore.get(apiHandler);
  const [data, setData] = reactExports.useState(() => {
    try {
      return obAPI.readSync();
    } catch (e2) {
      return null;
    }
  });
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const valueDisp = obAPI.onUpdate$.subscribe({ next: setData });
    const isLoadingDisp = obAPI.isLoading$.subscribe({ next: setIsLoading });
    return () => {
      valueDisp.unsubscribe();
      isLoadingDisp.unsubscribe();
    };
  }, []);
  return [data, isLoading, obAPI];
}
const container$h = "_container_kyf5r_1";
const styles$k = {
  container: container$h
};
const container$g = "_container_6oko0_1";
const selected = "_selected_6oko0_10";
const actualIcon = "_actualIcon_6oko0_14";
const icon$1 = "_icon_6oko0_18";
const thermometer = "_thermometer_6oko0_22";
const text = "_text_6oko0_22";
const counter = "_counter_6oko0_27";
const marker = "_marker_6oko0_44";
const markerSelected = "_markerSelected_6oko0_51";
const markerSelectedLight = "_markerSelectedLight_6oko0_54";
const styles$j = {
  container: container$g,
  selected,
  actualIcon,
  icon: icon$1,
  thermometer,
  text,
  counter,
  marker,
  markerSelected,
  markerSelectedLight
};
const container$f = "_container_udr6t_1";
const customCheck = "_customCheck_udr6t_14";
const placeholder = "_placeholder_udr6t_24";
const styles$i = {
  container: container$f,
  customCheck,
  placeholder
};
const SvgAshamedinline = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", width: "1em", height: "1em", viewBox: "0 0 100 115", ...props }, /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("linearGradient", { id: "a", x1: 0.555, y1: -0.098, x2: 0.464, y2: 0.703, gradientUnits: "objectBoundingBox" }, /* @__PURE__ */ reactExports.createElement("stop", { offset: 0, stopColor: "#ff9500" }), /* @__PURE__ */ reactExports.createElement("stop", { offset: 1, stopColor: "#ffc500" }))), /* @__PURE__ */ reactExports.createElement("g", { transform: "translate(-4.997 -31.01)" }, /* @__PURE__ */ reactExports.createElement("path", { d: "M18.737,30.935l.224-.158c7.8-5.448,19.765-7.972,21.741-15.99.988-4.019-.31-9.579-4.085-14.777,11.1,3.933,17.538,9.639,19.145,14.3,2.6,7.576-.856,16.055,2.536,16.813,3.281.738,5.58-4.921,4.954-10.172C74.012,31.363,80.976,43.143,81.542,62.328c.066.936.1,1.871.1,2.813A40.821,40.821,0,0,1,0,65.141,40.357,40.357,0,0,1,2.866,50.146a36.542,36.542,0,0,1,5.547-9.718,41.054,41.054,0,0,1,10.324-9.487Z", transform: "translate(6.517 31)", fillRule: "evenodd", fill: "url(#a)" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M71.131,149.912a.882.882,0,0,1-.81-.646,1.1,1.1,0,0,1,.481-1.344l13.427-6.443a.832.832,0,0,1,1.14.567,1.114,1.114,0,0,1-.488,1.344l-13.427,6.443a.735.735,0,0,1-.329.079Zm7.741.349a1.028,1.028,0,0,1-.25-2.023l8.644-2.26a1.029,1.029,0,0,1,.527,1.99l-8.657,2.266a.9.9,0,0,1-.264.033ZM6.033,147.824A1.038,1.038,0,0,1,5.7,145.8l8.716-2.833a1.033,1.033,0,0,1,.646,1.963l-8.71,2.833a1.146,1.146,0,0,1-.329.053Zm3.031,3.6a1.026,1.026,0,0,1-.955-.639,1.036,1.036,0,0,1,.573-1.344l15.858-6.443a1.033,1.033,0,1,1,.784,1.911L9.446,151.342a1.37,1.37,0,0,1-.382.066Z", transform: "translate(0 -37.663)", fill: "#ff7902", fillRule: "evenodd" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M58.92,164.6c.988-2.273,2.787-6.114,6.97-6.114s5.85,4.282,7.445,8.578", transform: "translate(-18.397 -43.494)", fill: "none", stroke: "#873500", strokeLinecap: "round", strokeWidth: 4, fillRule: "evenodd" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M40.589,108.9c6.476-1,10.791-3.314,13.176-7.853.922-1.733,3.782-.415,3.123,1.693-2.174,6.937-9.685,9.342-15.634,8.815-1.878-.158-2-2.438-.672-2.648Zm25.048-3.426c2.451,4.164,8.775,4.711,12.07,4.856s2.227,2.286.132,3.031c-2.009.725-11.6,1.186-15.127-5.831-1.449-2.879,1.944-3.709,2.919-2.062Z", transform: "translate(-11.84 -23.622)", fill: "#b55500", fillRule: "evenodd" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M24.152,139.492c-.685-2.2,8.143-.046,9.395,2.108,1.252,2.135,2.833,9.158.922,12.386s-5.752,2.306-7.629,6.766a6.4,6.4,0,0,0,.145,4.967A38.082,38.082,0,0,1,16.9,155.192c-.9-1.351,1.621-7.181,4.381-8.018,3.867-1.16,3.544-5.481,2.859-7.682Zm52.64.3c-.685,2.2-1.937,5.929,2.583,7.754s4.908,9.856,4.2,10.739c-3.031,3.755-8.96,9.092-13.46,10.9,1.911-2.543,3.841-5.455,2.6-8.433-1.864-4.454-5.027-3.544-6.931-6.76s-1.476-9.619-.461-12.386,12.155-4.019,11.463-1.818Z", transform: "translate(-4 -36.697)", fill: "#cde9ff", fillRule: "evenodd" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M48.924,133.293c-.817,1.3-4.368,5.027-7.194,5.844-7.524,2.194-15.482-.31-18.684-2.655-2.056-1.515-2.306-4.941,1.252-3.525s5.2,2.635,9.171,2.846c5.9.316,9.8-1.4,13.374-5.422,1.621-1.805,3.531.573,2.075,2.912Zm9.026,0c.8,1.3,4.348,5.027,7.181,5.844,7.524,2.194,15.482-.31,18.684-2.655,2.056-1.515,2.253-4.875-1.3-3.452s-5.159,2.569-9.131,2.767c-5.9.329-9.8-1.4-13.374-5.416-1.614-1.805-3.768.184-2.075,2.912Z", transform: "translate(-5.647 -33.667)", fill: "#7c3a00", fillRule: "evenodd" })));
const SvgConfusedinline = (props) => /* @__PURE__ */ reactExports.createElement("svg", { width: 92, height: 133, viewBox: "0 0 92 133", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M18.9396 45.0972L19.1464 44.9512C26.4812 39.7894 37.7256 37.4113 39.5849 29.8168C40.5145 26.0198 39.2973 20.7561 35.746 15.8411C46.1958 19.569 52.2495 24.9609 53.7565 29.3762C56.2036 36.5446 52.9601 44.5613 56.1437 45.28C59.2301 45.9773 61.3888 40.6208 60.8006 35.6556C70.9162 45.4936 77.4727 56.6448 77.9985 74.798C78.0579 75.6739 78.0887 76.5578 78.0887 77.4488C78.0887 98.6802 60.8893 115.918 39.7044 115.918C18.5196 115.918 1.32031 98.6802 1.32031 77.4488C1.32031 72.442 2.27682 67.6572 4.01663 63.2683C5.3578 59.7355 7.1492 56.7098 9.22947 54.0686C11.9232 50.5487 15.2099 47.5081 18.9396 45.0972Z", fill: "url(#paint0_linear_244_2049)" }), /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M27.4866 60.7321C22.705 60.7725 17.5465 59.2129 17.5465 59.2129C17.5465 59.2129 16.497 59.0099 16.2081 59.7423C15.9192 60.4747 16.7155 61.1494 16.7155 61.1494C16.7155 61.1494 22.7807 64.7581 27.7226 64.4472C36.3654 63.9035 36.0692 56.4482 36.1605 56.4452C36.1605 56.4452 36.3902 55.3864 35.4862 55.07C34.5822 54.7535 34.1703 55.6819 34.1703 55.6819C34.1703 55.6819 31.3509 60.6993 27.4866 60.7321ZM52.8456 53.1779C44.677 52.8961 42.6656 59.9826 42.5809 59.9419C42.5809 59.9419 42.2656 60.4737 42.9508 61.0147C43.636 61.5557 44.4058 60.991 44.4058 60.991C44.4058 60.991 47.6724 56.3745 52.5649 56.9055C56.9626 57.3827 60.174 60.0098 61.6818 60.8781C62.0756 61.1048 62.7733 61.2884 63.118 60.9654C63.4521 60.6523 63.442 59.8411 63.2757 59.5001C62.7061 58.3321 58.9759 53.3893 52.8456 53.1779Z", fill: "#B75500" }), /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M25.2523 67.0343C20.4579 66.8559 16.0015 71.7385 15.4849 78.0736C14.9686 84.4087 17.1821 89.7307 22.6982 89.9362C29.3316 90.1828 31.8047 85.1161 32.321 78.781C32.8372 72.4459 30.0471 67.2126 25.2523 67.0343Z", fill: "#FFE5CD" }), /* @__PURE__ */ reactExports.createElement("mask", { id: "mask0_244_2049", style: {
  maskType: "alpha"
}, maskUnits: "userSpaceOnUse", x: 15, y: 67, width: 18, height: 23 }, /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M25.2523 67.0343C20.4579 66.8559 16.0015 71.7385 15.4849 78.0736C14.9686 84.4087 17.1821 89.7307 22.6982 89.9362C29.3316 90.1828 31.8047 85.1161 32.321 78.781C32.8372 72.4459 30.0471 67.2126 25.2523 67.0343Z", fill: "white" })), /* @__PURE__ */ reactExports.createElement("g", { mask: "url(#mask0_244_2049)" }, /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M28.0964 66.6274C32.2809 66.6274 33.2765 70.1339 33.2765 74.4532C33.2765 78.7722 31.3445 82.2786 28.0964 82.2786C23.9905 82.2786 22.916 78.7722 22.916 74.4532C22.916 70.1339 25.2374 66.6274 28.0964 66.6274Z", fill: "#5B2A00" }), /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M22.1637 70.5717C23.2729 69.9487 24.8312 69.8249 25.617 69.8441C28.8054 69.9221 27.5735 71.8696 26.1475 72.0487C25.3083 72.1542 23.0369 72.8769 22.2661 73.1015C20.3174 73.6694 20.1179 71.7206 22.1637 70.5717Z", fill: "white" })), /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M54.5687 67.0343C49.7743 66.8559 45.3179 71.7385 44.8013 78.0736C44.285 84.4087 46.4985 89.7307 52.0146 89.9362C58.648 90.1828 61.1211 85.1161 61.6374 78.781C62.1537 72.4459 59.3635 67.2126 54.5687 67.0343Z", fill: "#FFE5CD" }), /* @__PURE__ */ reactExports.createElement("mask", { id: "mask1_244_2049", style: {
  maskType: "alpha"
}, maskUnits: "userSpaceOnUse", x: 44, y: 67, width: 18, height: 23 }, /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M54.5687 67.0343C49.7743 66.8559 45.3179 71.7385 44.8013 78.0736C44.285 84.4087 46.4985 89.7307 52.0146 89.9362C58.648 90.1828 61.1211 85.1161 61.6374 78.781C62.1537 72.4459 59.3635 67.2126 54.5687 67.0343Z", fill: "white" })), /* @__PURE__ */ reactExports.createElement("g", { mask: "url(#mask1_244_2049)" }, /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M57.4128 66.6274C61.5974 66.6274 62.5929 70.1339 62.5929 74.4532C62.5929 78.7722 60.6609 82.2786 57.4128 82.2786C53.3069 82.2786 52.2324 78.7722 52.2324 74.4532C52.2324 70.1339 54.5538 66.6274 57.4128 66.6274Z", fill: "#5B2A00" }), /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M50.82 70.5717C51.9292 69.9487 53.4874 69.8249 54.2732 69.8441C57.4617 69.9221 56.2297 71.8696 54.8038 72.0487C53.9645 72.1542 51.6931 72.8769 50.9223 73.1015C48.9737 73.6694 48.7742 71.7206 50.82 70.5717Z", fill: "white" })), /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M78.047 41.3677C79.1701 41.5255 80.1223 40.6515 80.4342 39.556L80.6591 38.7989C85.0133 38.4468 88.7354 36.6913 89.5023 31.234L89.5144 31.1481C90.3176 25.433 86.9692 21.7197 81.3924 20.936C77.9843 20.457 75.2205 21.2955 72.9022 22.8978C72.1145 23.4443 71.6839 24.2602 71.5691 25.0767C71.3397 26.7095 72.3857 28.2588 73.8574 28.4656C74.5157 28.5581 75.1776 28.3444 75.6967 28.023C77.254 27.0587 78.7654 26.7015 80.4307 26.9355C82.6769 27.2512 83.8367 28.5535 83.5649 30.4872L83.5528 30.5731C83.2569 32.6787 81.5447 33.6212 78.109 33.6204C76.8455 33.6181 75.9708 34.503 75.9652 35.9482L75.9418 38.9247C75.9336 40.1066 76.6141 41.1663 77.7372 41.3241L78.047 41.3677ZM73.456 47.3392L73.4439 47.4251C73.154 49.4877 74.3635 51.279 76.2999 51.5512C78.2363 51.8233 79.8926 50.4348 80.1825 48.3722L80.1946 48.2862C80.4845 46.2237 79.275 44.4324 77.3386 44.1602C75.4022 43.8881 73.7458 45.2766 73.456 47.3392Z", fill: "#FF7800" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M35.3728 98.5313C35.6751 98.5891 36.0793 98.7159 36.6639 98.9366C36.9475 99.0437 38.2522 99.5611 38.6202 99.7012C43.6897 101.632 47.935 101.883 53.1394 99.4637C53.1394 99.4637 54.5922 98.7072 53.8517 97.5964C53.1113 96.4856 51.3423 96.9498 51.3423 96.9498C47.3171 98.8208 44.26 98.6404 40.1573 97.0776C39.8254 96.9512 38.5133 96.431 38.1898 96.3088C37.4004 96.0108 36.7976 95.8217 36.2028 95.708C32.6454 95.0281 30.2863 95.2116 27.2072 96.4201C27.2072 96.4201 25.4034 97.044 26.2164 98.3801C27.0294 99.7163 28.7821 99.029 28.7821 99.029C31.0978 98.1202 32.6072 98.0027 35.3728 98.5313Z", fill: "#7E3A00" }), /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("linearGradient", { id: "paint0_linear_244_2049", x1: 13.1845, y1: 1.39684, x2: 1.31818, y2: 80.9159, gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ reactExports.createElement("stop", { stopColor: "#FF9500" }), /* @__PURE__ */ reactExports.createElement("stop", { offset: 1, stopColor: "#FFC500" }))));
const SvgEmbarrassedinline = (props) => /* @__PURE__ */ reactExports.createElement("svg", { width: 83, height: 107, viewBox: "0 0 83 107", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ reactExports.createElement("g", { clipPath: "url(#clip0_244_2082)" }, /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M19.7129 31.4498L19.9332 31.2952C27.7485 25.8277 39.7294 23.3088 41.7105 15.2646C42.7009 11.2428 41.4041 5.66742 37.6202 0.46138C48.7544 4.4101 55.2046 10.1212 56.8104 14.798C59.4178 22.3908 55.9618 30.8822 59.3539 31.6434C62.6425 32.382 64.9427 26.7083 64.3159 21.4491C75.0941 31.8696 82.08 43.6811 82.6403 62.9092C82.7037 63.837 82.7364 64.7732 82.7364 65.7169C82.7364 88.2055 64.4104 106.463 41.8378 106.463C19.2654 106.463 0.939453 88.2055 0.939453 65.7169C0.939453 60.4136 1.95861 55.3456 3.81239 50.6968C5.24141 46.9548 7.15016 43.75 9.36669 40.9523C12.2368 37.224 15.7389 34.0034 19.7129 31.4498Z", fill: "url(#paint0_linear_244_2082)" }), /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15.0645 67.8027C15.0649 63.0532 17.151 51.7189 25.1209 52.4806C32.0989 53.1476 31.4954 65.4581 31.301 68.2032C31.1968 69.6748 28.5744 70.1184 28.5514 68.6377C28.5287 67.1718 28.486 56.7482 24.7312 56.3474C18.6598 55.6993 17.4112 66.1768 17.277 67.8353C17.1428 69.4939 15.0643 69.0657 15.0645 67.8027Z", fill: "#663000" }), /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M49.6162 67.8386C49.1859 64.8487 49.9651 52.6134 58.2226 52.3206C65.9099 52.048 67.6368 63.8606 67.8153 67.1812C67.9488 69.6666 64.9516 70.805 64.602 68.4471C64.271 66.2187 63.0612 55.731 57.9557 56.4743C54.2209 57.0181 52.4785 62.294 52.4349 67.7971C52.4185 69.8758 50.0281 70.701 49.6162 67.8386Z", fill: "#663000" }), /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M20.9938 48.3989C26.7039 47.5099 30.5063 45.4666 32.6099 41.4537C33.414 39.9202 35.7365 40.5872 35.1572 42.4495C33.2492 48.5836 26.6227 50.7079 21.3826 50.2476C19.7273 50.1018 19.8265 48.581 20.9938 48.3989Z", fill: "#B55500" }), /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M47.9247 42.7026C50.0882 46.3862 55.6585 46.8696 58.5637 46.999C61.4684 47.1285 60.5301 49.0197 58.6788 49.6825C56.9173 50.3133 48.4616 50.7279 45.357 44.5244C44.0823 41.9771 47.0688 41.2448 47.9247 42.7026Z", fill: "#B55500" }), /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M13.3072 71.7606C17.9207 72.3018 21.3899 75.0792 21.0495 77.9591C20.7092 80.8391 16.6874 82.7378 12.0739 82.1966C7.46051 81.6555 3.99132 78.878 4.33164 75.9981C4.67201 73.1181 8.69385 71.2194 13.3072 71.7606Z", fill: "#FF7800" }), /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M69.4432 71.4007C73.8586 70.2492 78.0586 71.6561 78.8164 74.5405C79.5741 77.4249 76.6044 80.7015 72.189 81.8529C67.773 83.0044 63.573 81.5975 62.8153 78.7131C62.0576 75.8287 65.0272 72.5521 69.4432 71.4007Z", fill: "#FF7800" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M12.2461 80.4212L20.8781 75.2214", stroke: "#B55500", strokeWidth: 1.32009, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M62.082 78.5988L70.4588 72.4959", stroke: "#B55500", strokeWidth: 1.32009, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M66.3984 80.2862L77.3409 73.3481", stroke: "#B55500", strokeWidth: 1.32009, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M7.31445 80.3193L18.3218 72.7876", stroke: "#B55500", strokeWidth: 1.32009, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M11.5194 72.5862L5.67383 76.8375", stroke: "#B55500", strokeWidth: 1.32009, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M73.4785 79.469L78.2784 75.5331", stroke: "#B55500", strokeWidth: 1.32009, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M24.3028 81.2889C27.5499 79.135 30.9541 82.49 39.4529 83.4481C47.9517 84.406 52.0915 78.4422 53.8133 76.9677C57.1795 74.0842 62.0126 80.4734 59.0472 86.131C56.0817 91.7886 47.5991 95.8177 40.1869 95.5114C32.7747 95.2051 26.824 92.3149 24.156 89.1978C21.488 86.0806 22.2629 82.6421 24.3028 81.2889Z", fill: "#F2F2F2" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M34.9441 82.8099L32.1621 93.4666", stroke: "#6E819C", strokeWidth: 1.19135, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M46.4785 82.5774L49.7048 93.4372", stroke: "#6E819C", strokeWidth: 1.19135, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ reactExports.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M24.3028 81.2889C27.5499 79.135 30.9541 82.49 39.4529 83.4481C47.9517 84.406 51.2756 78.6828 53.1334 77.3828C57.2835 74.4788 62.0126 80.4734 59.0472 86.131C56.0817 91.7886 47.5991 95.8177 40.1869 95.5114C32.7747 95.2052 26.824 92.3149 24.156 89.1978C21.488 86.0806 22.2629 82.6421 24.3028 81.2889Z", stroke: "#7C3A00", strokeWidth: 1.57823, strokeLinecap: "round", strokeLinejoin: "round" })), /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("linearGradient", { id: "paint0_linear_244_2082", x1: 13.5808, y1: -14.8381, x2: 1.08288, y2: 69.4109, gradientUnits: "userSpaceOnUse" }, /* @__PURE__ */ reactExports.createElement("stop", { stopColor: "#FF9500" }), /* @__PURE__ */ reactExports.createElement("stop", { offset: 1, stopColor: "#FFC500" })), /* @__PURE__ */ reactExports.createElement("clipPath", { id: "clip0_244_2082" }, /* @__PURE__ */ reactExports.createElement("rect", { width: 83, height: 107, fill: "white" }))));
const SvgRelievedinline = (props) => /* @__PURE__ */ reactExports.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", xmlnsXlink: "http://www.w3.org/1999/xlink", viewBox: "0 0 100 115", width: "1em", height: "1em", ...props }, /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("clipPath", { id: "a" }, /* @__PURE__ */ reactExports.createElement("rect", { width: 105.8, height: 105.8, transform: "translate(0.75 0.5)", fill: "#fff" }))), /* @__PURE__ */ reactExports.createElement("g", { transform: "translate(-0.75 -0.5)", clipPath: "url(#a)" }, /* @__PURE__ */ reactExports.createElement("path", { d: "M45.633.514a.382.382,0,0,0-.406.156.394.394,0,0,0-.015.435c4.55,7.462,3.7,14.041.66,16.3-6.18,4.6-18.945,11.732-25.347,18.14A40.948,40.948,0,0,0,8.419,64.571c0,22.951,19.085,41.584,42.593,41.584,22.087,0,40.27-16.45,42.386-37.475,1.493-14.819-3.681-33.025-14.621-42.391a.393.393,0,0,0-.637.38c1.113,5.458-.561,8.845-4.456,9.383-2.243.311-6.586-.771-4.312-9.85C70.56,21.462,72.959,8.017,45.633.514Z", transform: "translate(-1.191 0)", fill: "#ffbe00", fillRule: "evenodd" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M95.834,40.578c1.22,1.332,3.883,21.241,4.386,28.542.487,7.057,8.243,7.819,11.871,3.115C116.91,65.989,111.808,47.821,95.834,40.578Z", transform: "translate(-14.766 -6.224)", fill: "#9ac8f9", fillRule: "evenodd" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M95.934,40.1a.438.438,0,0,0-.5.694,4.676,4.676,0,0,1,.45,1.446c.351,1.53.72,3.969,1.1,6.8.421,3.095.834,6.66,1.209,10.033.441,3.962.836,7.661.983,10.027.268,4.026,2.634,6.245,5.42,6.844a8.32,8.32,0,0,0,8.194-3.192c1.462-1.9,2.141-4.8,1.888-8.185a27.074,27.074,0,0,0-3.819-11.511A31.644,31.644,0,0,0,95.934,40.1Zm.72,1.352c.108.318.22.691.331,1.111.558,2.09,1.238,5.43,1.87,9.122.481,2.8.94,5.8,1.313,8.607.456,3.44.775,6.581.933,8.681.209,2.944,1.868,4.621,3.905,5.053a6.356,6.356,0,0,0,6.22-2.474c1.225-1.583,1.694-4.021,1.5-6.842A26.282,26.282,0,0,0,109.3,53.959a31.814,31.814,0,0,0-7.268-8.848A31.36,31.36,0,0,0,96.654,41.452Z", transform: "translate(-14.685 -6.143)", fill: "#4582c3", fillRule: "evenodd" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M109.8,76.854c.806.514,2.16-.167,3.023-1.521s.911-2.869.106-3.383-2.16.167-3.024,1.521S108.992,76.34,109.8,76.854Z", transform: "translate(-16.845 -11.069)", fill: "#fff" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M81.1,97.511a3.189,3.189,0,0,0-1.032-3.053,5.1,5.1,0,0,0-3.594-1.271c-9.97.2-32.06.776-41.917,1.032a5.053,5.053,0,0,0-3.508,1.446,3.183,3.183,0,0,0-.849,3.1c2.773,9.348,13.779,16.145,26.216,15.823C68.817,114.268,78.919,106.964,81.1,97.511Z", transform: "translate(-4.555 -14.393)", fill: "#5f2c00", fillRule: "evenodd" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M44.8,113.212c.263-6.282,9.428-10.8,17.527-10.959,6.256-.121,14.191,1.4,17.431,4.067C75.3,111.946,67.592,115.766,58.7,116A31.465,31.465,0,0,1,44.8,113.212Z", transform: "translate(-6.84 -15.8)", fill: "#cf4324", fillRule: "evenodd" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M52.152,110.806a8.894,8.894,0,0,1,2.886-2.24,1.207,1.207,0,0,0-1.1-2.151,11.047,11.047,0,0,0-3.734,2.962,1.207,1.207,0,0,0,1.947,1.428Z", transform: "translate(-7.643 -16.427)", fill: "rgba(255,255,255,0.46)", fillRule: "evenodd" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M59,107.357c.352-.072.719-.132,1.105-.173a1.208,1.208,0,0,0-.269-2.4c-.461.052-.9.124-1.324.21A1.207,1.207,0,0,0,59,107.357Z", transform: "translate(-8.82 -16.193)", fill: "rgba(255,255,255,0.46)", fillRule: "evenodd" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M31.326,49.174a10.519,10.519,0,0,1,5.922-3.111A7.248,7.248,0,0,1,39,46.081a9.821,9.821,0,0,1,1.146.177,9.2,9.2,0,0,1,1.787.54,11.033,11.033,0,0,1,1.24.578,1.18,1.18,0,1,0,1.6-1.734,9.375,9.375,0,0,0-1.8-1.849,7.126,7.126,0,0,0-1.556-.9,6.535,6.535,0,0,0-1.468-.448,6.624,6.624,0,0,0-1.541-.1,8.546,8.546,0,0,0-3.282.806,13.433,13.433,0,0,0-5.264,4.786.956.956,0,1,0,1.462,1.234Z", transform: "translate(-4.486 -6.497)", fill: "#e18b00", fillRule: "evenodd" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M84.006,47.746a12.411,12.411,0,0,0-5.564-4.788,8.872,8.872,0,0,0-3.376-.679,6.52,6.52,0,0,0-1.6.18,6.11,6.11,0,0,0-1.534.592,5.673,5.673,0,0,0-1.22.856,6.411,6.411,0,0,0-1.763,2.839A1.181,1.181,0,1,0,71.064,47.8a5.21,5.21,0,0,1,2.465-1.523,6.829,6.829,0,0,1,1.093-.24,7.191,7.191,0,0,1,1.793-.086,9.833,9.833,0,0,1,6.1,3,.957.957,0,0,0,1.488-1.2Z", transform: "translate(-10.571 -6.488)", fill: "#e18b00", fillRule: "evenodd" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M28.816,79.532a41.668,41.668,0,0,1,2.816-12.041c1.056-2.337,2.328-3.673,4.3-3.531a2.221,2.221,0,0,1,1.7,1.017,10.345,10.345,0,0,1,1.486,2.955A41.22,41.22,0,0,1,40.9,79.391a1.228,1.228,0,0,0,2.454.089,49.759,49.759,0,0,0,.183-8.773,21.919,21.919,0,0,0-1.258-6.055c-1.21-3.127-3.364-4.977-6.151-5.173a7.622,7.622,0,0,0-7.193,4.236A16.878,16.878,0,0,0,27.2,68.5a51.234,51.234,0,0,0-.837,10.9,1.228,1.228,0,0,0,2.452.13Z", transform: "translate(-3.977 -9.158)", fill: "#5f2c00", fillRule: "evenodd" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M69.992,79.892c.278-1.786.964-7.673,3.1-11.888,1-1.972,2.3-3.618,4.5-3.483,1.988.007,3.044,1.62,3.8,3.527a28.534,28.534,0,0,1,1.547,11.237,1.228,1.228,0,0,0,2.43.357,32.737,32.737,0,0,0,.6-7.648,21.682,21.682,0,0,0-.809-5.241c-1.125-3.8-3.591-6.465-7.417-6.713a8.041,8.041,0,0,0-7.178,4.083,18.694,18.694,0,0,0-2.289,6.28,54.473,54.473,0,0,0-.73,9.259,1.228,1.228,0,0,0,2.445.231Z", transform: "translate(-10.372 -9.246)", fill: "#5f2c00", fillRule: "evenodd" })));
const errorDisplayWrapper = "_errorDisplayWrapper_tueaz_1";
const iconWrapper = "_iconWrapper_tueaz_7";
const dialogContent = "_dialogContent_tueaz_16";
const iconText = "_iconText_tueaz_20";
const facialComment = "_facialComment_tueaz_26";
const similar = "_similar_tueaz_38";
const fatalError = "_fatalError_tueaz_45";
const footerError = "_footerError_tueaz_60";
const styles$h = {
  errorDisplayWrapper,
  iconWrapper,
  dialogContent,
  iconText,
  facialComment,
  similar,
  fatalError,
  footerError
};
const FooterErrorPresenter = ({ icon: icon2, message: text2 }) => {
  return /* @__PURE__ */ jsxs("div", { className: styles$h.footerError, children: [
    icon2,
    " ",
    /* @__PURE__ */ jsx("p", { children: text2 })
  ] });
};
const MainErrorPresenter = ({
  icon: icon2,
  message,
  userAction,
  facialComment: facialComment2
}) => {
  return /* @__PURE__ */ jsxs("div", { className: styles$h.errorDisplayWrapper, children: [
    /* @__PURE__ */ jsx("div", { className: styles$h.iconWrapper, children: icon2 }),
    /* @__PURE__ */ jsx(TextDisplay, { iconText: message, userText: userAction, facialComment: facialComment2 })
  ] });
};
const TextDisplay = ({
  iconText: iconText2,
  userText,
  facialComment: facialComment2
}) => {
  return /* @__PURE__ */ jsxs("div", { className: styles$h.dialogContent, children: [
    /* @__PURE__ */ jsx("p", { className: styles$h.facialComment, children: facialComment2 }),
    /* @__PURE__ */ jsx("p", { className: styles$h.iconText, children: iconText2 }),
    typeof userText === "string" ? /* @__PURE__ */ jsx("p", { children: userText }) : userText
  ] });
};
function getErrorMessage(errorType) {
  switch (errorType) {
    case "no_down_price":
      return "Al parecer, ninguna de tus alertas ha bajado de precio aún";
    case "no_alert":
      return "Parece que aún no has creado ninguna alerta...";
    case "no_history_price":
      return "Aún no tenemos este artículo en nuestra base de datos, Trataremos de añadirlo lo antes posible";
    case "no_product":
      return "Parece que todavía no contamos con este producto en nuestra base de datos. Trataremos de añadirlo lo antes posible";
    case "no_pepper":
      return "Parece que no tenemos datos disponibles para esta tienda.";
    case "unknown":
      return "parece que ha habido un error";
  }
}
function getErrorUserAction(errorType) {
  switch (errorType) {
    case "no_down_price":
      return "Prueba a crear alertas de ese producto en otras tiendas o edita el precio de la alerta";
    case "no_alert":
      return "Prueba a crear alertas de tus productos favoritos y recibirás avisos cuando bajen de precio";
    case "no_history_price":
      return "En similares podrás encontrar productos que pueden adecuarse a tus preferencias";
    case "no_product":
    case "no_pepper":
      return "Puedes seguir navegando y encontrar productos similares que se adecuen a tus preferencias.";
    case "unknown":
      return "Inténtalo en otro momento";
  }
}
function getFacialComment(errorType) {
  switch (errorType) {
    case "no_down_price":
    default:
      return "¡vaya!";
    case "no_alert":
      return "¡hey!";
  }
}
function getFaceExpression(faceExpression) {
  switch (faceExpression) {
    case "relieved":
      return /* @__PURE__ */ jsx(SvgRelievedinline, {});
    case "confused":
      return /* @__PURE__ */ jsx(SvgConfusedinline, {});
    case "embarrased":
      return /* @__PURE__ */ jsx(SvgEmbarrassedinline, {});
    case "ashame":
    default:
      return /* @__PURE__ */ jsx(SvgAshamedinline, {});
  }
}
function getErrorIcon(errorType, faceExpression) {
  if (faceExpression)
    return getFaceExpression(faceExpression);
  switch (errorType) {
    case "no_alert":
      return getFaceExpression("confused");
    case "no_product":
      return getFaceExpression("embarrased");
    case "no_down_price":
    case "no_history_price":
    case "no_pepper":
    case "unknown":
      return getFaceExpression("ashame");
  }
}
const ErrorDisplay = (props) => {
  const { mode = "main" } = props;
  const innerProps = {
    dialog: props.dialog,
    icon: getErrorIcon(props.dialog, props.faceExpression),
    message: getErrorMessage(props.dialog),
    userAction: getErrorUserAction(props.dialog),
    facialComment: getFacialComment(props.dialog)
  };
  switch (mode) {
    case "footer":
      return /* @__PURE__ */ jsx(FooterErrorPresenter, { ...innerProps });
    case "main":
    default:
      return /* @__PURE__ */ jsx(MainErrorPresenter, { ...innerProps });
  }
};
var GenIcon$2 = require$$0.GenIcon;
var FaHeartbeat_1 = function FaHeartbeat(props) {
  return GenIcon$2({ "tag": "svg", "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M320.2 243.8l-49.7 99.4c-6 12.1-23.4 11.7-28.9-.6l-56.9-126.3-30 71.7H60.6l182.5 186.5c7.1 7.3 18.6 7.3 25.7 0L451.4 288H342.3l-22.1-44.2zM473.7 73.9l-2.4-2.5c-51.5-52.6-135.8-52.6-187.4 0L256 100l-27.9-28.5c-51.5-52.7-135.9-52.7-187.4 0l-2.4 2.4C-10.4 123.7-12.5 203 31 256h102.4l35.9-86.2c5.4-12.9 23.6-13.2 29.4-.4l58.2 129.3 49-97.9c5.9-11.8 22.7-11.8 28.6 0l27.6 55.2H481c43.5-53 41.4-132.3-7.3-182.1z" } }] })(props);
};
var GenIcon$1 = require$$0.GenIcon;
var FaRegClock_1 = function FaRegClock(props) {
  return GenIcon$1({ "tag": "svg", "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" } }] })(props);
};
const container$e = "_container_6vy4p_1";
const styles$g = {
  container: container$e
};
const Icon = ({ icon: icon2 }) => {
  switch (icon2) {
    case "clock":
      return /* @__PURE__ */ jsx(FaRegClock_1, {});
    case "heartbeat":
      return /* @__PURE__ */ jsx(FaHeartbeat_1, {});
  }
};
const anHour = 1e3 * 60 * 60;
const IconTime = ({ time, label, icon: icon2 = "clock" }) => {
  hooks.locale("es");
  const currentTime = hooks();
  const inputTime = hooks.unix(time);
  const delta = currentTime.diff(inputTime);
  const labelledFormat = label ? `${label} ` : "";
  let text2 = `${labelledFormat}${inputTime.format(`DD MMM`).substring(0, 6)}`;
  if (delta < anHour) {
    text2 = hooks.utc(delta).format(`[${labelledFormat}][hace] [0h], m[m]`);
  } else if (delta < anHour * 24) {
    text2 = hooks.utc(delta).format(`[${labelledFormat}][hace] h[h], m[m]`);
  }
  return /* @__PURE__ */ jsxs("div", { className: styles$g.container, children: [
    /* @__PURE__ */ jsx(Icon, { icon: icon2 }),
    /* @__PURE__ */ jsx("span", { children: text2 })
  ] });
};
const container$d = "_container_mz548_1";
const imageWrapper = "_imageWrapper_mz548_15";
const styles$f = {
  container: container$d,
  imageWrapper
};
const ImageBox = ({ imageUrl }) => /* @__PURE__ */ jsx("div", { className: styles$f.container, children: /* @__PURE__ */ jsx("div", { className: styles$f.imageWrapper, children: /* @__PURE__ */ jsx("img", { src: imageUrl, alt: "" }) }) });
const SvgCrossinline = (props) => /* @__PURE__ */ reactExports.createElement("svg", { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ reactExports.createElement("path", { d: "M19.5899 6.39005C20.1367 5.84329 20.1367 4.95682 19.5899 4.41007C19.0432 3.86331 18.1567 3.86331 17.6099 4.41007L12 10.02L6.39006 4.41007C5.84331 3.86331 4.95684 3.86331 4.41008 4.41007C3.86333 4.95683 3.86333 5.84329 4.41008 6.39005L10.02 12L4.41007 17.6099C3.86331 18.1567 3.86331 19.0432 4.41007 19.5899C4.95682 20.1367 5.84329 20.1367 6.39005 19.5899L12 13.98L17.61 19.5899C18.1567 20.1367 19.0432 20.1367 19.5899 19.5899C20.1367 19.0432 20.1367 18.1567 19.5899 17.61L13.98 12L19.5899 6.39005Z", fill: "#35373B" }));
const container$c = "_container_1pm73_1";
const footer = "_footer_1pm73_18";
const header$1 = "_header_1pm73_29";
const headerShadow = "_headerShadow_1pm73_41";
const icon = "_icon_1pm73_44";
const brandmark = "_brandmark_1pm73_50";
const title$2 = "_title_1pm73_53";
const closeButton = "_closeButton_1pm73_60";
const content$2 = "_content_1pm73_73";
const noContent = "_noContent_1pm73_88";
const styles$e = {
  container: container$c,
  footer,
  header: header$1,
  headerShadow,
  icon,
  brandmark,
  title: title$2,
  closeButton,
  content: content$2,
  noContent
};
function NoContent() {
  return /* @__PURE__ */ jsx("div", { className: styles$e.noContent, children: "No hay datos que mostrar" });
}
function InfoWrapper({
  footer: footer2 = null,
  title: title2,
  iconSVG: Icon2,
  onClose,
  children = null,
  isLogo = false
}) {
  const [isScrolling, setIsScrolling] = reactExports.useState(false);
  return /* @__PURE__ */ jsxs("div", { className: styles$e.container, children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: styles$e.content,
        onScroll: (event) => {
          if (event.target.scrollTop > 0) {
            setIsScrolling(true);
          } else {
            setIsScrolling(false);
          }
        },
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: classNames(styles$e.header, {
                [styles$e.headerShadow]: isScrolling
              }),
              id: void 0,
              children: [
                /* @__PURE__ */ jsx("div", { className: styles$e.icon, children: Icon2 ? /* @__PURE__ */ jsx(Icon2, {}) : null }),
                /* @__PURE__ */ jsx("span", { className: styles$e.title, children: title2 }),
                " ",
                onClose && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: styles$e.closeButton,
                    id: void 0,
                    onClick: onClose,
                    children: /* @__PURE__ */ jsx(SvgCrossinline, {})
                  }
                )
              ]
            }
          ),
          children || /* @__PURE__ */ jsx(NoContent, {})
        ]
      }
    ),
    footer2 && /* @__PURE__ */ jsx("div", { className: styles$e.footer, children: footer2 })
  ] });
}
const container$b = "_container_rriso_1";
const slot = "_slot_rriso_29";
const slotCancel = "_slotCancel_rriso_33";
const containerCancel = "_containerCancel_rriso_43";
const styles$d = {
  container: container$b,
  slot,
  slotCancel,
  containerCancel
};
const InlineOkCancel = ({
  onOk,
  onCancel,
  children,
  okLabel,
  okButtonStyle,
  okLoading,
  cancelLabel,
  cancelButtonStyle
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: classNames(styles$d.container, {
        [styles$d.containerCancel]: okLabel === "Eliminar"
      }),
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: classNames(styles$d.slot, {
              [styles$d.slotCancel]: okLabel === "Eliminar"
            }),
            children
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            text: cancelLabel,
            size: "m",
            radius: true,
            buttonStyle: cancelButtonStyle,
            variant: "secondary",
            onClick: onCancel
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            text: okLabel,
            size: "m",
            radius: true,
            buttonStyle: okButtonStyle,
            variant: "primary",
            onClick: onOk,
            loading: okLoading
          }
        )
      ]
    }
  );
};
const container$a = "_container_13oc3_1";
const priceTheme = "_priceTheme_13oc3_12";
const inputElement = "_inputElement_13oc3_15";
const containerFocus = "_containerFocus_13oc3_34";
const invalid = "_invalid_13oc3_37";
const required = "_required_13oc3_41";
const styles$c = {
  container: container$a,
  priceTheme,
  inputElement,
  containerFocus,
  invalid,
  required
};
function InputInner(props) {
  const [focused, setFocused] = reactExports.useState(props.locked && props.focused || false);
  const textInput = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (props.focused) {
      textInput.current?.focus();
    }
  }, []);
  const {
    id,
    onChange = () => {
    },
    onKeyUpEnter,
    value,
    placeholder: placeholder2 = "",
    label,
    footerNode,
    type = "text",
    required: required2,
    step,
    onKeyDown,
    data,
    invalid: invalid2
  } = props;
  const showLabel = !!label;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: classNames({
        [styles$c.container]: true,
        [styles$c.containerFocus]: focused,
        [styles$c.invalid]: invalid2
      }),
      onClick: () => !focused && textInput?.current?.focus(),
      children: [
        showLabel && /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: id,
            className: classNames({
              [styles$c.priceTheme]: type === "price"
            }),
            children: label
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            onKeyDown,
            "data-input": data,
            step,
            className: classNames(styles$c.inputElement, {
              [styles$c.priceTheme]: type === "price"
            }),
            required: required2,
            ref: textInput,
            id,
            type,
            value,
            onFocus: () => setFocused(true),
            onBlur: () => setFocused(false),
            onChange: (e2) => e2?.target && onChange(e2.target.value, id),
            placeholder: placeholder2 && placeholder2
          }
        ),
        type === "password" && /* @__PURE__ */ jsx("span", {}),
        footerNode ? footerNode : null
      ]
    }
  );
}
var GenIcon = require$$0.GenIcon;
var FaComment_1 = function FaComment(props) {
  return GenIcon({ "tag": "svg", "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "d": "M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z" } }] })(props);
};
function currencyToCurrencySign(currency) {
  switch (currency) {
    case "EUR":
      return "€";
  }
}
const container$9 = "_container_11qrr_1";
const price = "_price_11qrr_11";
const oldPrice = "_oldPrice_11qrr_19";
const discount = "_discount_11qrr_23";
const shop = "_shop_11qrr_26";
const comments = "_comments_11qrr_32";
const styles$b = {
  container: container$9,
  price,
  oldPrice,
  discount,
  shop,
  comments
};
function PriceShopSpec(props) {
  const { comments: comments2, shop: shop2, lastPrice, price: price2 } = props;
  const currencySign = props.currency ? currencyToCurrencySign(props.currency) : props.currencySign;
  return /* @__PURE__ */ jsxs("div", { className: styles$b.container, children: [
    /* @__PURE__ */ jsx("span", { className: styles$b.price, children: price2 > 0 ? `${price2.toFixed(2)}${currencySign}` : "GRATIS" }),
    typeof lastPrice !== "number" ? null : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("span", { className: styles$b.oldPrice, children: /* @__PURE__ */ jsxs("span", { children: [
        lastPrice.toFixed(2),
        currencySign
      ] }) }),
      /* @__PURE__ */ jsxs("span", { className: styles$b.discount, children: [
        "(-",
        (100 * (1 - price2 / lastPrice)).toFixed(0),
        "%)"
      ] })
    ] }),
    /* @__PURE__ */ jsx("span", { className: styles$b.shop, children: shop2 }),
    comments2 === void 0 ? null : /* @__PURE__ */ jsxs("span", { className: styles$b.comments, children: [
      /* @__PURE__ */ jsx(FaComment_1, {}),
      comments2
    ] })
  ] });
}
const container$8 = "_container_6bh4z_1";
const styles$a = {
  container: container$8
};
const container$7 = "_container_vqpy4_1";
const content$1 = "_content_vqpy4_16";
const navContainer = "_navContainer_vqpy4_29";
const item$1 = "_item_vqpy4_51";
const itemSelected = "_itemSelected_vqpy4_67";
const styles$9 = {
  container: container$7,
  content: content$1,
  navContainer,
  item: item$1,
  itemSelected
};
const SvgLogo = (props) => /* @__PURE__ */ reactExports.createElement("svg", { width: "1em", height: "1em", viewBox: "0 0 94 123", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ reactExports.createElement("title", null, "\n		brandmark\n	"), /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("linearGradient", { x1: "34.734%", y1: "13.959%", x2: "91.954%", y2: "127.968%", id: "a" }, /* @__PURE__ */ reactExports.createElement("stop", { stopColor: "#FFA02F", offset: "0%" }), /* @__PURE__ */ reactExports.createElement("stop", { stopColor: "#E00034", offset: "100%" })), /* @__PURE__ */ reactExports.createElement("linearGradient", { x1: "69.347%", y1: "93.279%", x2: "20.389%", y2: "-44.264%", id: "b" }, /* @__PURE__ */ reactExports.createElement("stop", { stopColor: "#FFA02F", offset: "0%" }), /* @__PURE__ */ reactExports.createElement("stop", { stopColor: "#E00034", offset: "100%" }))), /* @__PURE__ */ reactExports.createElement("g", { fill: "none", fillRule: "evenodd" }, /* @__PURE__ */ reactExports.createElement("path", { d: "M46.16 4.922c0-1.672.34-3.25.844-4.748-7.301 4.391-22.466 15.549-22.466 32.546 0 27.913 21.339 29.739 21.339 45.983 0 6.86-4.908 10.611-11.382 10.611-10.661 0-23.508-16.426-15.645-37.494.003 0-18.492 8.583-18.492 27.234 0 23.636 20.22 40.679 45.165 40.679 24.947 0 45.168-19.161 45.168-42.798 0-36.137-33.597-50.97-41.674-63.3-1.777-2.457-2.856-5.452-2.856-8.713z", fill: "url(#a)", transform: "translate(1.100000, 1.000000)" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M2.608 92.4c8.229 18.537 33.222 24.09 45.448 12.089 10.034-9.853 3.8-24.44-5.84-36.412 2.19 3.033 3.686 6.323 3.686 10.622 0 6.885-4.917 10.649-11.405 10.649-10.681 0-23.554-16.483-15.677-37.625 0 0-14.46 6.733-17.828 21.21a758.675 758.675 0 0 1-.647 8.234A38.72 38.72 0 0 0 2.608 92.4z", fill: "url(#b)", transform: "translate(1.100000, 1.000000)" })));
const logo$1 = "/assets/logo-6d0c5170.svg";
function* authSaga() {
  yield takeEvery$1(Q_SIMPLE_LOGIN, querySimpleLoginSaga);
  yield takeEvery$1(A_SIMPLE_LOGIN, answerSimpleLoginSaga);
  yield takeEvery$1(LOGOUT, logOutSaga);
}
function* bootSaga() {
  const settings = yield call(settingsAPIHandler.read);
  yield put(setMenuOpen(!settings.initWithCompactMenu));
  if (isBrowserActionPage()) {
    return;
  }
  yield put(querySimpleLogin());
}
function* appSaga() {
  const systemSagas = [bootSaga(), authSaga(), watchBackgroundSaga()];
  yield all(systemSagas);
}
var reduxLoggerExports = {};
var reduxLogger = {
  get exports() {
    return reduxLoggerExports;
  },
  set exports(v2) {
    reduxLoggerExports = v2;
  }
};
(function(module, exports) {
  !function(e2, t2) {
    t2(exports);
  }(commonjsGlobal, function(e2) {
    function t2(e3, t3) {
      e3.super_ = t3, e3.prototype = Object.create(t3.prototype, { constructor: { value: e3, enumerable: false, writable: true, configurable: true } });
    }
    function r2(e3, t3) {
      Object.defineProperty(this, "kind", { value: e3, enumerable: true }), t3 && t3.length && Object.defineProperty(this, "path", { value: t3, enumerable: true });
    }
    function n2(e3, t3, r3) {
      n2.super_.call(this, "E", e3), Object.defineProperty(this, "lhs", { value: t3, enumerable: true }), Object.defineProperty(this, "rhs", { value: r3, enumerable: true });
    }
    function o(e3, t3) {
      o.super_.call(this, "N", e3), Object.defineProperty(this, "rhs", { value: t3, enumerable: true });
    }
    function i(e3, t3) {
      i.super_.call(this, "D", e3), Object.defineProperty(this, "lhs", { value: t3, enumerable: true });
    }
    function a(e3, t3, r3) {
      a.super_.call(this, "A", e3), Object.defineProperty(this, "index", { value: t3, enumerable: true }), Object.defineProperty(this, "item", { value: r3, enumerable: true });
    }
    function f2(e3, t3, r3) {
      var n3 = e3.slice((r3 || t3) + 1 || e3.length);
      return e3.length = t3 < 0 ? e3.length + t3 : t3, e3.push.apply(e3, n3), e3;
    }
    function u(e3) {
      var t3 = "undefined" == typeof e3 ? "undefined" : N(e3);
      return "object" !== t3 ? t3 : e3 === Math ? "math" : null === e3 ? "null" : Array.isArray(e3) ? "array" : "[object Date]" === Object.prototype.toString.call(e3) ? "date" : "function" == typeof e3.toString && /^\/.*\//.test(e3.toString()) ? "regexp" : "object";
    }
    function l2(e3, t3, r3, c3, s2, d3, p3) {
      s2 = s2 || [], p3 = p3 || [];
      var g3 = s2.slice(0);
      if ("undefined" != typeof d3) {
        if (c3) {
          if ("function" == typeof c3 && c3(g3, d3))
            return;
          if ("object" === ("undefined" == typeof c3 ? "undefined" : N(c3))) {
            if (c3.prefilter && c3.prefilter(g3, d3))
              return;
            if (c3.normalize) {
              var h3 = c3.normalize(g3, d3, e3, t3);
              h3 && (e3 = h3[0], t3 = h3[1]);
            }
          }
        }
        g3.push(d3);
      }
      "regexp" === u(e3) && "regexp" === u(t3) && (e3 = e3.toString(), t3 = t3.toString());
      var y3 = "undefined" == typeof e3 ? "undefined" : N(e3), v3 = "undefined" == typeof t3 ? "undefined" : N(t3), b3 = "undefined" !== y3 || p3 && p3[p3.length - 1].lhs && p3[p3.length - 1].lhs.hasOwnProperty(d3), m3 = "undefined" !== v3 || p3 && p3[p3.length - 1].rhs && p3[p3.length - 1].rhs.hasOwnProperty(d3);
      if (!b3 && m3)
        r3(new o(g3, t3));
      else if (!m3 && b3)
        r3(new i(g3, e3));
      else if (u(e3) !== u(t3))
        r3(new n2(g3, e3, t3));
      else if ("date" === u(e3) && e3 - t3 !== 0)
        r3(new n2(g3, e3, t3));
      else if ("object" === y3 && null !== e3 && null !== t3)
        if (p3.filter(function(t4) {
          return t4.lhs === e3;
        }).length)
          e3 !== t3 && r3(new n2(g3, e3, t3));
        else {
          if (p3.push({ lhs: e3, rhs: t3 }), Array.isArray(e3)) {
            var w3;
            e3.length;
            for (w3 = 0; w3 < e3.length; w3++)
              w3 >= t3.length ? r3(new a(g3, w3, new i(void 0, e3[w3]))) : l2(e3[w3], t3[w3], r3, c3, g3, w3, p3);
            for (; w3 < t3.length; )
              r3(new a(g3, w3, new o(void 0, t3[w3++])));
          } else {
            var x3 = Object.keys(e3), S2 = Object.keys(t3);
            x3.forEach(function(n3, o2) {
              var i2 = S2.indexOf(n3);
              i2 >= 0 ? (l2(e3[n3], t3[n3], r3, c3, g3, n3, p3), S2 = f2(S2, i2)) : l2(e3[n3], void 0, r3, c3, g3, n3, p3);
            }), S2.forEach(function(e4) {
              l2(void 0, t3[e4], r3, c3, g3, e4, p3);
            });
          }
          p3.length = p3.length - 1;
        }
      else
        e3 !== t3 && ("number" === y3 && isNaN(e3) && isNaN(t3) || r3(new n2(g3, e3, t3)));
    }
    function c2(e3, t3, r3, n3) {
      return n3 = n3 || [], l2(e3, t3, function(e4) {
        e4 && n3.push(e4);
      }, r3), n3.length ? n3 : void 0;
    }
    function s(e3, t3, r3) {
      if (r3.path && r3.path.length) {
        var n3, o2 = e3[t3], i2 = r3.path.length - 1;
        for (n3 = 0; n3 < i2; n3++)
          o2 = o2[r3.path[n3]];
        switch (r3.kind) {
          case "A":
            s(o2[r3.path[n3]], r3.index, r3.item);
            break;
          case "D":
            delete o2[r3.path[n3]];
            break;
          case "E":
          case "N":
            o2[r3.path[n3]] = r3.rhs;
        }
      } else
        switch (r3.kind) {
          case "A":
            s(e3[t3], r3.index, r3.item);
            break;
          case "D":
            e3 = f2(e3, t3);
            break;
          case "E":
          case "N":
            e3[t3] = r3.rhs;
        }
      return e3;
    }
    function d2(e3, t3, r3) {
      if (e3 && t3 && r3 && r3.kind) {
        for (var n3 = e3, o2 = -1, i2 = r3.path ? r3.path.length - 1 : 0; ++o2 < i2; )
          "undefined" == typeof n3[r3.path[o2]] && (n3[r3.path[o2]] = "number" == typeof r3.path[o2] ? [] : {}), n3 = n3[r3.path[o2]];
        switch (r3.kind) {
          case "A":
            s(r3.path ? n3[r3.path[o2]] : n3, r3.index, r3.item);
            break;
          case "D":
            delete n3[r3.path[o2]];
            break;
          case "E":
          case "N":
            n3[r3.path[o2]] = r3.rhs;
        }
      }
    }
    function p2(e3, t3, r3) {
      if (r3.path && r3.path.length) {
        var n3, o2 = e3[t3], i2 = r3.path.length - 1;
        for (n3 = 0; n3 < i2; n3++)
          o2 = o2[r3.path[n3]];
        switch (r3.kind) {
          case "A":
            p2(o2[r3.path[n3]], r3.index, r3.item);
            break;
          case "D":
            o2[r3.path[n3]] = r3.lhs;
            break;
          case "E":
            o2[r3.path[n3]] = r3.lhs;
            break;
          case "N":
            delete o2[r3.path[n3]];
        }
      } else
        switch (r3.kind) {
          case "A":
            p2(e3[t3], r3.index, r3.item);
            break;
          case "D":
            e3[t3] = r3.lhs;
            break;
          case "E":
            e3[t3] = r3.lhs;
            break;
          case "N":
            e3 = f2(e3, t3);
        }
      return e3;
    }
    function g2(e3, t3, r3) {
      if (e3 && t3 && r3 && r3.kind) {
        var n3, o2, i2 = e3;
        for (o2 = r3.path.length - 1, n3 = 0; n3 < o2; n3++)
          "undefined" == typeof i2[r3.path[n3]] && (i2[r3.path[n3]] = {}), i2 = i2[r3.path[n3]];
        switch (r3.kind) {
          case "A":
            p2(i2[r3.path[n3]], r3.index, r3.item);
            break;
          case "D":
            i2[r3.path[n3]] = r3.lhs;
            break;
          case "E":
            i2[r3.path[n3]] = r3.lhs;
            break;
          case "N":
            delete i2[r3.path[n3]];
        }
      }
    }
    function h2(e3, t3, r3) {
      if (e3 && t3) {
        var n3 = function(n4) {
          r3 && !r3(e3, t3, n4) || d2(e3, t3, n4);
        };
        l2(e3, t3, n3);
      }
    }
    function y2(e3) {
      return "color: " + F[e3].color + "; font-weight: bold";
    }
    function v2(e3) {
      var t3 = e3.kind, r3 = e3.path, n3 = e3.lhs, o2 = e3.rhs, i2 = e3.index, a2 = e3.item;
      switch (t3) {
        case "E":
          return [r3.join("."), n3, "→", o2];
        case "N":
          return [r3.join("."), o2];
        case "D":
          return [r3.join(".")];
        case "A":
          return [r3.join(".") + "[" + i2 + "]", a2];
        default:
          return [];
      }
    }
    function b2(e3, t3, r3, n3) {
      var o2 = c2(e3, t3);
      try {
        n3 ? r3.groupCollapsed("diff") : r3.group("diff");
      } catch (e4) {
        r3.log("diff");
      }
      o2 ? o2.forEach(function(e4) {
        var t4 = e4.kind, n4 = v2(e4);
        r3.log.apply(r3, ["%c " + F[t4].text, y2(t4)].concat(P(n4)));
      }) : r3.log("—— no diff ——");
      try {
        r3.groupEnd();
      } catch (e4) {
        r3.log("—— diff end —— ");
      }
    }
    function m2(e3, t3, r3, n3) {
      switch ("undefined" == typeof e3 ? "undefined" : N(e3)) {
        case "object":
          return "function" == typeof e3[n3] ? e3[n3].apply(e3, P(r3)) : e3[n3];
        case "function":
          return e3(t3);
        default:
          return e3;
      }
    }
    function w2(e3) {
      var t3 = e3.timestamp, r3 = e3.duration;
      return function(e4, n3, o2) {
        var i2 = ["action"];
        return i2.push("%c" + String(e4.type)), t3 && i2.push("%c@ " + n3), r3 && i2.push("%c(in " + o2.toFixed(2) + " ms)"), i2.join(" ");
      };
    }
    function x2(e3, t3) {
      var r3 = t3.logger, n3 = t3.actionTransformer, o2 = t3.titleFormatter, i2 = void 0 === o2 ? w2(t3) : o2, a2 = t3.collapsed, f3 = t3.colors, u2 = t3.level, l3 = t3.diff, c3 = "undefined" == typeof t3.titleFormatter;
      e3.forEach(function(o3, s2) {
        var d3 = o3.started, p3 = o3.startedTime, g3 = o3.action, h3 = o3.prevState, y3 = o3.error, v3 = o3.took, w3 = o3.nextState, x3 = e3[s2 + 1];
        x3 && (w3 = x3.prevState, v3 = x3.started - d3);
        var S2 = n3(g3), k3 = "function" == typeof a2 ? a2(function() {
          return w3;
        }, g3, o3) : a2, j2 = D(p3), E2 = f3.title ? "color: " + f3.title(S2) + ";" : "", A3 = ["color: gray; font-weight: lighter;"];
        A3.push(E2), t3.timestamp && A3.push("color: gray; font-weight: lighter;"), t3.duration && A3.push("color: gray; font-weight: lighter;");
        var O2 = i2(S2, j2, v3);
        try {
          k3 ? f3.title && c3 ? r3.groupCollapsed.apply(r3, ["%c " + O2].concat(A3)) : r3.groupCollapsed(O2) : f3.title && c3 ? r3.group.apply(r3, ["%c " + O2].concat(A3)) : r3.group(O2);
        } catch (e4) {
          r3.log(O2);
        }
        var N2 = m2(u2, S2, [h3], "prevState"), P2 = m2(u2, S2, [S2], "action"), C2 = m2(u2, S2, [y3, h3], "error"), F2 = m2(u2, S2, [w3], "nextState");
        if (N2)
          if (f3.prevState) {
            var L2 = "color: " + f3.prevState(h3) + "; font-weight: bold";
            r3[N2]("%c prev state", L2, h3);
          } else
            r3[N2]("prev state", h3);
        if (P2)
          if (f3.action) {
            var T2 = "color: " + f3.action(S2) + "; font-weight: bold";
            r3[P2]("%c action    ", T2, S2);
          } else
            r3[P2]("action    ", S2);
        if (y3 && C2)
          if (f3.error) {
            var M = "color: " + f3.error(y3, h3) + "; font-weight: bold;";
            r3[C2]("%c error     ", M, y3);
          } else
            r3[C2]("error     ", y3);
        if (F2)
          if (f3.nextState) {
            var _ = "color: " + f3.nextState(w3) + "; font-weight: bold";
            r3[F2]("%c next state", _, w3);
          } else
            r3[F2]("next state", w3);
        l3 && b2(h3, w3, r3, k3);
        try {
          r3.groupEnd();
        } catch (e4) {
          r3.log("—— log end ——");
        }
      });
    }
    function S() {
      var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t3 = Object.assign({}, L, e3), r3 = t3.logger, n3 = t3.stateTransformer, o2 = t3.errorTransformer, i2 = t3.predicate, a2 = t3.logErrors, f3 = t3.diffPredicate;
      if ("undefined" == typeof r3)
        return function() {
          return function(e4) {
            return function(t4) {
              return e4(t4);
            };
          };
        };
      if (e3.getState && e3.dispatch)
        return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"), function() {
          return function(e4) {
            return function(t4) {
              return e4(t4);
            };
          };
        };
      var u2 = [];
      return function(e4) {
        var r4 = e4.getState;
        return function(e5) {
          return function(l3) {
            if ("function" == typeof i2 && !i2(r4, l3))
              return e5(l3);
            var c3 = {};
            u2.push(c3), c3.started = O.now(), c3.startedTime = new Date(), c3.prevState = n3(r4()), c3.action = l3;
            var s2 = void 0;
            if (a2)
              try {
                s2 = e5(l3);
              } catch (e6) {
                c3.error = o2(e6);
              }
            else
              s2 = e5(l3);
            c3.took = O.now() - c3.started, c3.nextState = n3(r4());
            var d3 = t3.diff && "function" == typeof f3 ? f3(r4, l3) : t3.diff;
            if (x2(u2, Object.assign({}, t3, { diff: d3 })), u2.length = 0, c3.error)
              throw c3.error;
            return s2;
          };
        };
      };
    }
    var k2, j, E = function(e3, t3) {
      return new Array(t3 + 1).join(e3);
    }, A2 = function(e3, t3) {
      return E("0", t3 - e3.toString().length) + e3;
    }, D = function(e3) {
      return A2(e3.getHours(), 2) + ":" + A2(e3.getMinutes(), 2) + ":" + A2(e3.getSeconds(), 2) + "." + A2(e3.getMilliseconds(), 3);
    }, O = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance : Date, N = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
      return typeof e3;
    } : function(e3) {
      return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
    }, P = function(e3) {
      if (Array.isArray(e3)) {
        for (var t3 = 0, r3 = Array(e3.length); t3 < e3.length; t3++)
          r3[t3] = e3[t3];
        return r3;
      }
      return Array.from(e3);
    }, C = [];
    k2 = "object" === ("undefined" == typeof commonjsGlobal ? "undefined" : N(commonjsGlobal)) && commonjsGlobal ? commonjsGlobal : "undefined" != typeof window ? window : {}, j = k2.DeepDiff, j && C.push(function() {
      "undefined" != typeof j && k2.DeepDiff === c2 && (k2.DeepDiff = j, j = void 0);
    }), t2(n2, r2), t2(o, r2), t2(i, r2), t2(a, r2), Object.defineProperties(c2, { diff: { value: c2, enumerable: true }, observableDiff: { value: l2, enumerable: true }, applyDiff: { value: h2, enumerable: true }, applyChange: { value: d2, enumerable: true }, revertChange: { value: g2, enumerable: true }, isConflict: { value: function() {
      return "undefined" != typeof j;
    }, enumerable: true }, noConflict: { value: function() {
      return C && (C.forEach(function(e3) {
        e3();
      }), C = null), c2;
    }, enumerable: true } });
    var F = { E: { color: "#2196F3", text: "CHANGED:" }, N: { color: "#4CAF50", text: "ADDED:" }, D: { color: "#F44336", text: "DELETED:" }, A: { color: "#2196F3", text: "ARRAY:" } }, L = { level: "log", logger: console, logErrors: true, collapsed: void 0, predicate: void 0, duration: false, timestamp: true, stateTransformer: function(e3) {
      return e3;
    }, actionTransformer: function(e3) {
      return e3;
    }, errorTransformer: function(e3) {
      return e3;
    }, colors: { title: function() {
      return "inherit";
    }, prevState: function() {
      return "#9E9E9E";
    }, action: function() {
      return "#03A9F4";
    }, nextState: function() {
      return "#4CAF50";
    }, error: function() {
      return "#F20404";
    } }, diff: false, diffPredicate: void 0, transformer: void 0 }, T = function() {
      var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t3 = e3.dispatch, r3 = e3.getState;
      return "function" == typeof t3 || "function" == typeof r3 ? S()({ dispatch: t3, getState: r3 }) : void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n");
    };
    e2.defaults = L, e2.createLogger = S, e2.logger = T, e2.default = T, Object.defineProperty(e2, "__esModule", { value: true });
  });
})(reduxLogger, reduxLoggerExports);
const initialState$2 = {
  offers: [],
  shop: ""
};
const offerSlice = createSlice({
  name: "offer",
  initialState: initialState$2,
  reducers: {
    setOffers(state, { payload }) {
      payload.offers?.forEach((o) => {
        o.url = addExtensionUTMParamsToLink(o.url, "extension_ofertas");
      });
      return payload;
    }
  }
});
const Reducer$1 = offerSlice.reducer;
const initialState$1 = {
  offers: []
};
const similarSlice = createSlice({
  name: "similar",
  initialState: initialState$1,
  reducers: {
    setSimilar(state, action) {
      action.payload?.forEach((o) => {
        o.url = addExtensionUTMParamsToLink(o.url, "extension_similares");
      });
      state.offers = action.payload;
    }
  }
});
const Reducer = similarSlice.reducer;
const sagaMiddleware = sagaMiddlewareFactory();
const reducerObject = {
  app: appReducer$1,
  voucher: Reducer$2,
  offer: Reducer$1,
  similar: Reducer,
  productStats: ProductStatsReducer,
  alertas: account,
  postedOffer: postedOfferReducer
};
const middlewares = [sagaMiddleware];
const preEnhancers = [];
const postEnhancers = [];
{
  reducerObject.debug = debugReducer;
}
const appReducer = combineReducers(reducerObject);
const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    return appReducer(void 0, action);
  }
  return appReducer(state, action);
};
window.onload = function() {
  let oldHref = document.location.href;
  const bodyList = document.querySelector("body");
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        store.dispatch({ type: "RESET_STORE" });
      }
    });
  });
  const config = {
    childList: true,
    subtree: true
  };
  observer.observe(bodyList, config);
};
const store = createStore(
  rootReducer,
  compose(...preEnhancers, applyMiddleware(...middlewares), ...postEnhancers)
);
sagaMiddleware.run(appSaga);
browser.runtime.onMessage.addListener(function backToFront(m2) {
  store.dispatch(m2);
});
function useAppDispatch(actionCreator) {
  const dispatch = useDispatch();
  if (actionCreator === void 0)
    return dispatch;
  return reactExports.useCallback((payload) => void dispatch(actionCreator(payload)), [dispatch]);
}
const useAppSelector = useSelector;
const disclaimer$1 = "_disclaimer_j2x0m_1";
const styles$8 = {
  disclaimer: disclaimer$1
};
const Disclaimer = ({ text: text2 }) => {
  return /* @__PURE__ */ jsx("p", { className: styles$8.disclaimer, dangerouslySetInnerHTML: { __html: text2 } });
};
function createPriceInputProps(props) {
  const { onChange, onKeyUpEnter } = props;
  const onlyNumbersR = /^\d+((\.|\,)(\d{1,2})?)?$/g;
  return {
    ...props,
    onChange(value, id) {
      if (onlyNumbersR.test(value)) {
        if (value.length > 2) {
          if (value[0] === "0" && value[1] !== "." && value[1] !== ",") {
            onChange?.(value.slice(1, value.length), id);
            return;
          }
        }
        onChange?.(value, id);
      }
    },
    onKeyDown(e2) {
      const { value, id } = props;
      if (e2.key === "Backspace" && value?.length === 1) {
        onChange?.("", id);
      }
      if (e2.key === "Backspace" && (value?.endsWith(".") || value?.endsWith(","))) {
        const decimalSeparationDel = value?.slice(0, value?.length - 2);
        onChange?.(decimalSeparationDel, id);
        e2.preventDefault();
      }
      if (e2.key === "Enter" && onlyNumbersR.test(value)) {
        onKeyUpEnter(e2);
      }
    }
  };
}
function InputField(props) {
  const { type } = props;
  if (type === "price")
    return /* @__PURE__ */ jsx(InputInner, { ...createPriceInputProps(props) });
  return /* @__PURE__ */ jsx(InputInner, { ...props });
}
const container$6 = "_container_1wvf2_1";
const formWrapper = "_formWrapper_1wvf2_7";
const header = "_header_1wvf2_12";
const disclaimer = "_disclaimer_1wvf2_17";
const loginWrapper = "_loginWrapper_1wvf2_23";
const logoWrapper$1 = "_logoWrapper_1wvf2_27";
const logo = "_logo_1wvf2_27";
const lineSplit = "_lineSplit_1wvf2_38";
const loginForm = "_loginForm_1wvf2_46";
const buttonWrapper = "_buttonWrapper_1wvf2_52";
const socials = "_socials_1wvf2_62";
const socialsTitle = "_socialsTitle_1wvf2_66";
const socialsIcons = "_socialsIcons_1wvf2_69";
const socialsJoinNow = "_socialsJoinNow_1wvf2_79";
const socialsRegister = "_socialsRegister_1wvf2_84";
const standardLogin = "_standardLogin_1wvf2_88";
const passRecall = "_passRecall_1wvf2_95";
const description = "_description_1wvf2_113";
const requiredAsterisk = "_requiredAsterisk_1wvf2_117";
const loginFormContainer = "_loginFormContainer_1wvf2_126";
const feedBackWrapper = "_feedBackWrapper_1wvf2_130";
const passwordSupport = "_passwordSupport_1wvf2_140";
const userRecall = "_userRecall_1wvf2_147";
const spacer = "_spacer_1wvf2_155";
const styles$7 = {
  container: container$6,
  formWrapper,
  header,
  disclaimer,
  loginWrapper,
  logoWrapper: logoWrapper$1,
  logo,
  lineSplit,
  loginForm,
  buttonWrapper,
  socials,
  socialsTitle,
  socialsIcons,
  socialsJoinNow,
  socialsRegister,
  standardLogin,
  passRecall,
  description,
  requiredAsterisk,
  loginFormContainer,
  feedBackWrapper,
  passwordSupport,
  userRecall,
  spacer
};
function LoginView({ loggedIn, loginLoader }) {
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loginTries, setLoginTries] = reactExports.useState(0);
  const doSimpleLogin = useAppDispatch(querySimpleLogin);
  const userFeedBack = () => {
    return loginTries > 0 && !loggedIn && !loginLoader && /* @__PURE__ */ jsx("div", { className: styles$7.feedBackWrapper, children: /* @__PURE__ */ jsx("span", { children: "Usuario o contraseña incorrectos" }) });
  };
  return /* @__PURE__ */ jsxs("div", { className: styles$7.container, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$7.formWrapper, children: [
      /* @__PURE__ */ jsx("h1", { className: styles$7.header, children: "Inicia sesión en Chollometro" }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          className: styles$7.loginForm,
          onSubmit: (e2) => {
            e2.preventDefault();
            doSimpleLogin({ username, password });
            setLoginTries(loginTries + 1);
          },
          children: [
            /* @__PURE__ */ jsxs("div", { className: styles$7.standardLogin, children: [
              /* @__PURE__ */ jsx(
                InputField,
                {
                  id: "email",
                  label: "Nombre de usuario o email",
                  type: "text",
                  onChange: setUsername,
                  value: username,
                  required: true,
                  invalid: loginTries > 0 && !loggedIn && !loginLoader
                }
              ),
              /* @__PURE__ */ jsx(
                InputField,
                {
                  id: "password",
                  label: "Contraseña",
                  type: "password",
                  onChange: setPassword,
                  value: password,
                  required: true,
                  invalid: loginTries > 0 && !loggedIn && !loginLoader
                }
              ),
              userFeedBack(),
              /* @__PURE__ */ jsxs("div", { className: styles$7.passRecall, children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://www.chollometro.com/password/reset",
                    target: "_blank",
                    rel: "noopener",
                    children: "¿Has olvidado tu contraseña?"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://www.chollometro.com/agregar-contrasena",
                    target: "_blank",
                    rel: "noopener",
                    children: "¿Inicias sesión con Google, Facebook o Apple?"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: styles$7.buttonWrapper, children: [
              loginLoader ? /* @__PURE__ */ jsx(Button, { type: "submit", text: "Iniciar sesión", size: "m", loading: true }) : /* @__PURE__ */ jsx(Button, { type: "submit", text: "Iniciar sesión", size: void 0 }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  buttonStyle: "cold",
                  text: "¡Regístrate en Chollometro!",
                  size: void 0,
                  onClick: () => {
                    const registerPageUrl = "https://www.chollometro.com/register";
                    window.open(registerPageUrl, "_blank", "noopener");
                  }
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$7.disclaimer, children: /* @__PURE__ */ jsx(Disclaimer, { text: 'Al interactuar con nuestra extensión, en ocasiones podemos abrir enlaces monetizados en segundo plano, así es cómo se financia Chollometro.<a href="https://www.chollometro.com/faqs#dinero" target="blank"> Más info</a>.' }) })
  ] });
}
const container$5 = "_container_t896n_1";
const clicked = "_clicked_t896n_22";
const links = "_links_t896n_35";
const logOut = "_logOut_t896n_45";
const sidebar = "_sidebar_t896n_52";
const logoWrapper = "_logoWrapper_t896n_57";
const userAvatar = "_userAvatar_t896n_60";
const profileScreen = "_profileScreen_t896n_89";
const profileSetting = "_profileSetting_t896n_99";
const profileConfig = "_profileConfig_t896n_100";
const screenTitle = "_screenTitle_t896n_112";
const warning = "_warning_t896n_124";
const size = "_size_t896n_127";
const theme = "_theme_t896n_128";
const warningSelect = "_warningSelect_t896n_129";
const advice = "_advice_t896n_140";
const styles$6 = {
  container: container$5,
  clicked,
  links,
  logOut,
  sidebar,
  logoWrapper,
  userAvatar,
  profileScreen,
  profileSetting,
  profileConfig,
  screenTitle,
  warning,
  size,
  theme,
  warningSelect,
  advice
};
function LoginPlaceHolderView({
  PlaceHolderView,
  autoClose
}) {
  const { loginStatus, loginLoader } = useAppSelector((state) => ({
    loginStatus: state.alertas.loginStatus,
    loginLoader: state.alertas.logInLoader
  }));
  const [popUpLoading, setPopupLoading] = reactExports.useState(true);
  const onClose = useAppDispatch(closeView);
  const { loggedIn } = loginStatus;
  const dispatch = useDispatch();
  reactExports.useEffect(() => {
    UserData.get().then((userData) => {
      if (userData?.userId) {
        dispatch(setLoginStatus({ ...userData, loggedIn: true }));
      } else {
        dispatch(setLoginStatus({ ...userData, loggedIn: false }));
      }
      setPopupLoading(false);
    });
  }, []);
  if (isBrowserActionPage() && popUpLoading) {
    return /* @__PURE__ */ jsx("div", { className: styles$6.container, children: /* @__PURE__ */ jsx(Loader, {}) });
  }
  return loggedIn ? /* @__PURE__ */ jsx(PlaceHolderView, {}) : /* @__PURE__ */ jsx(
    InfoWrapper,
    {
      title: "Chollometro",
      iconSVG: () => /* @__PURE__ */ jsx(SvgLogo, { className: styles$e.brandmark }),
      onClose: autoClose && onClose,
      children: /* @__PURE__ */ jsx(LoginView, { loggedIn, loginLoader })
    }
  );
}
function _setPrototypeOf(o, p2) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p3) {
    o2.__proto__ = p3;
    return o2;
  };
  return _setPrototypeOf(o, p2);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
var changedArray = function changedArray2(a, b2) {
  if (a === void 0) {
    a = [];
  }
  if (b2 === void 0) {
    b2 = [];
  }
  return a.length !== b2.length || a.some(function(item2, index) {
    return !Object.is(item2, b2[index]);
  });
};
var initialState = {
  error: null
};
var ErrorBoundary = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(ErrorBoundary2, _React$Component);
  function ErrorBoundary2() {
    var _this;
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;
    _this.state = initialState;
    _this.updatedWithError = false;
    _this.resetErrorBoundary = function() {
      var _this$props;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      _this.props.onReset == null ? void 0 : (_this$props = _this.props).onReset.apply(_this$props, args);
      _this.reset();
    };
    return _this;
  }
  ErrorBoundary2.getDerivedStateFromError = function getDerivedStateFromError(error) {
    return {
      error
    };
  };
  var _proto = ErrorBoundary2.prototype;
  _proto.reset = function reset() {
    this.updatedWithError = false;
    this.setState(initialState);
  };
  _proto.componentDidCatch = function componentDidCatch(error, info) {
    var _this$props$onError, _this$props2;
    (_this$props$onError = (_this$props2 = this.props).onError) == null ? void 0 : _this$props$onError.call(_this$props2, error, info);
  };
  _proto.componentDidMount = function componentDidMount() {
    var error = this.state.error;
    if (error !== null) {
      this.updatedWithError = true;
    }
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var error = this.state.error;
    var resetKeys = this.props.resetKeys;
    if (error !== null && !this.updatedWithError) {
      this.updatedWithError = true;
      return;
    }
    if (error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
      var _this$props$onResetKe, _this$props3;
      (_this$props$onResetKe = (_this$props3 = this.props).onResetKeysChange) == null ? void 0 : _this$props$onResetKe.call(_this$props3, prevProps.resetKeys, resetKeys);
      this.reset();
    }
  };
  _proto.render = function render() {
    var error = this.state.error;
    var _this$props4 = this.props, fallbackRender = _this$props4.fallbackRender, FallbackComponent = _this$props4.FallbackComponent, fallback = _this$props4.fallback;
    if (error !== null) {
      var _props = {
        error,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (/* @__PURE__ */ reactExports.isValidElement(fallback)) {
        return fallback;
      } else if (typeof fallbackRender === "function") {
        return fallbackRender(_props);
      } else if (FallbackComponent) {
        return /* @__PURE__ */ reactExports.createElement(FallbackComponent, _props);
      } else {
        throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop");
      }
    }
    return this.props.children;
  };
  return ErrorBoundary2;
}(reactExports.Component);
const base = "_base_1rj3o_1";
const col = "_col_1rj3o_15";
const row = "_row_1rj3o_22";
const styles$5 = {
  base,
  col,
  row
};
const OptionSelect = ({
  options,
  onChange,
  value,
  label,
  layout = "ROW"
}) => {
  return /* @__PURE__ */ jsxs("div", { className: styles$5.base + " " + (layout === "ROW" ? styles$5.row : styles$5.col), children: [
    label && /* @__PURE__ */ jsx("label", { children: label }),
    /* @__PURE__ */ jsx(
      "select",
      {
        value,
        onChange: (e2) => onChange(
          e2.target.value,
          e2.target.selectedIndex,
          options[e2.target.selectedIndex]
        ),
        children: options.map((elm, idx) => {
          return /* @__PURE__ */ jsx("option", { value: elm.value, children: elm.label }, elm.value);
        })
      }
    )
  ] });
};
const rightTimeRange = (days, options) => {
  for (const opt of options.reverse()) {
    if (days >= opt.value) {
      return opt.value;
    }
  }
  return options[options.length - 1].value;
};
const TimeSelect = ({ onChange, value, label }) => {
  let validValue;
  const monthDays = 30;
  const options = [
    { label: "1 mes", value: monthDays },
    { label: "3 meses", value: monthDays * 3 },
    { label: "6 meses", value: monthDays * 6 },
    { label: "1 año", value: monthDays * 12 },
    { label: "2 años", value: monthDays * 24 }
  ];
  validValue = rightTimeRange(+value, options);
  return /* @__PURE__ */ jsx(OptionSelect, { options, onChange, value: validValue, label });
};
const container$4 = "_container_12c0y_2";
const wrappSelector = "_wrappSelector_12c0y_8";
const timeSelect = "_timeSelect_12c0y_16";
const timeSelectStart = "_timeSelectStart_12c0y_20";
const inputWrapper = "_inputWrapper_12c0y_24";
const inputControls = "_inputControls_12c0y_45";
const styles$4 = {
  container: container$4,
  wrappSelector,
  timeSelect,
  timeSelectStart,
  inputWrapper,
  inputControls
};
const PriceTrackInput = (props) => {
  const {
    mode = "CREATE",
    expirationDays,
    onConfirm,
    onCancel,
    focus,
    confirmLabel,
    cancelLabel,
    loading,
    trackingPrice,
    trackingStartMs,
    isLoading
  } = props;
  const initialPrice = mode === "CREATE" ? trackingPrice * 0.95 : trackingPrice;
  const [timeSelectValue, setTimeSelectValue] = reactExports.useState(expirationDays || 360);
  const [price2, setPrice] = reactExports.useState(initialPrice.toFixed(2));
  const priceToNumberUtil = (price22) => {
    return parseFloat(price22.replace(",", "."));
  };
  return /* @__PURE__ */ jsxs("div", { className: styles$4.container, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$4.wrappSelector, children: [
      mode === "UPDATE" && !!trackingStartMs && /* @__PURE__ */ jsx(
        IconTime,
        {
          time: Math.round(trackingStartMs / 1e3),
          icon: "clock",
          label: "En seguimiento desde"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: classNames(styles$4.timeSelect, {
            [styles$4.timeSelectStart]: !trackingStartMs
          }),
          children: /* @__PURE__ */ jsx(
            TimeSelect,
            {
              label: "Seguir durante:",
              onChange: (v2) => setTimeSelectValue(+v2),
              value: timeSelectValue
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$4.inputControls, children: /* @__PURE__ */ jsx(
      InlineOkCancel,
      {
        cancelLabel,
        onCancel,
        okLabel: confirmLabel,
        onOk: () => {
          onConfirm(priceToNumberUtil(price2), timeSelectValue);
        },
        okButtonStyle: "normal",
        cancelButtonStyle: "normal",
        okLoading: isLoading,
        children: /* @__PURE__ */ jsx("div", { className: styles$4.inputWrapper, children: /* @__PURE__ */ jsx(
          InputField,
          {
            id: "newPrice",
            label: "Precio inferior a",
            onChange: setPrice,
            value: "" + price2,
            onKeyUpEnter: (e2) => {
              onConfirm(priceToNumberUtil(price2), timeSelectValue);
            },
            type: "price",
            focused: focus
          }
        ) })
      }
    ) })
  ] });
};
const SvgTrashinline = (props) => /* @__PURE__ */ reactExports.createElement("svg", { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ reactExports.createElement("path", { d: "M10 15L10 12", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M14 15L14 12", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M3 7H21V7C20.0681 7 19.6022 7 19.2346 7.15224C18.7446 7.35523 18.3552 7.74458 18.1522 8.23463C18 8.60218 18 9.06812 18 10V16C18 17.8856 18 18.8284 17.4142 19.4142C16.8284 20 15.8856 20 14 20H10C8.11438 20 7.17157 20 6.58579 19.4142C6 18.8284 6 17.8856 6 16V10C6 9.06812 6 8.60218 5.84776 8.23463C5.64477 7.74458 5.25542 7.35523 4.76537 7.15224C4.39782 7 3.93188 7 3 7V7Z", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" }));
const SvgPeninline = (props) => /* @__PURE__ */ reactExports.createElement("svg", { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ reactExports.createElement("mask", { id: "path-1-outside-1_46_2147", maskUnits: "userSpaceOnUse", x: 3, y: 4, width: 17, height: 17, fill: "black" }, /* @__PURE__ */ reactExports.createElement("rect", { fill: "white", x: 3, y: 4, width: 17, height: 17 }), /* @__PURE__ */ reactExports.createElement("path", { d: "M13.5858 7.41421L6.39171 14.6083C6.19706 14.8029 6.09974 14.9003 6.03276 15.0186C5.96579 15.1368 5.93241 15.2704 5.86564 15.5374L5.20211 18.1915C5.11186 18.5526 5.06673 18.7331 5.16682 18.8332C5.2669 18.9333 5.44742 18.8881 5.80844 18.7979L5.80845 18.7979L8.46257 18.1344C8.72963 18.0676 8.86316 18.0342 8.98145 17.9672C9.09974 17.9003 9.19706 17.8029 9.39171 17.6083L16.5858 10.4142L16.5858 10.4142C17.2525 9.74755 17.5858 9.41421 17.5858 9C17.5858 8.58579 17.2525 8.25245 16.5858 7.58579L16.4142 7.41421C15.7475 6.74755 15.4142 6.41421 15 6.41421C14.5858 6.41421 14.2525 6.74755 13.5858 7.41421Z" })), /* @__PURE__ */ reactExports.createElement("path", { d: "M6.39171 14.6083L7.80593 16.0225L7.80593 16.0225L6.39171 14.6083ZM13.5858 7.41421L12.1716 6L12.1716 6L13.5858 7.41421ZM16.4142 7.41421L15 8.82843L15 8.82843L16.4142 7.41421ZM16.5858 7.58579L18 6.17157L18 6.17157L16.5858 7.58579ZM16.5858 10.4142L18 11.8284L16.5858 10.4142ZM9.39171 17.6083L7.9775 16.1941L7.9775 16.1941L9.39171 17.6083ZM5.86564 15.5374L7.80593 16.0225L7.80593 16.0225L5.86564 15.5374ZM5.20211 18.1915L3.26183 17.7065H3.26183L5.20211 18.1915ZM5.80845 18.7979L5.32338 16.8576L5.23624 16.8794L5.15141 16.9089L5.80845 18.7979ZM8.46257 18.1344L7.97751 16.1941L7.9775 16.1941L8.46257 18.1344ZM5.16682 18.8332L6.58103 17.419L6.58103 17.419L5.16682 18.8332ZM5.80844 18.7979L6.29351 20.7382L6.38065 20.7164L6.46549 20.6869L5.80844 18.7979ZM8.98145 17.9672L7.99605 16.2268L7.99605 16.2268L8.98145 17.9672ZM16.5858 10.4142L18 11.8284L18 11.8284L16.5858 10.4142ZM6.03276 15.0186L4.29236 14.0332L4.29236 14.0332L6.03276 15.0186ZM7.80593 16.0225L15 8.82843L12.1716 6L4.9775 13.1941L7.80593 16.0225ZM15 8.82843L15.1716 9L18 6.17157L17.8284 6L15 8.82843ZM15.1716 9L7.9775 16.1941L10.8059 19.0225L18 11.8284L15.1716 9ZM3.92536 15.0524L3.26183 17.7065L7.1424 18.6766L7.80593 16.0225L3.92536 15.0524ZM6.29352 20.7382L8.94764 20.0746L7.9775 16.1941L5.32338 16.8576L6.29352 20.7382ZM3.26183 17.7065C3.233 17.8218 3.15055 18.1296 3.12259 18.4155C3.0922 18.7261 3.06509 19.5599 3.7526 20.2474L6.58103 17.419C6.84671 17.6847 6.99914 18.0005 7.06644 18.2928C7.12513 18.5478 7.10965 18.7429 7.10358 18.8049C7.09699 18.8724 7.08792 18.904 7.097 18.8631C7.10537 18.8253 7.11788 18.7747 7.1424 18.6766L3.26183 17.7065ZM5.15141 16.9089L5.1514 16.9089L6.46549 20.6869L6.46549 20.6869L5.15141 16.9089ZM5.32338 16.8576C5.22531 16.8821 5.17467 16.8946 5.13694 16.903C5.09595 16.9121 5.12762 16.903 5.19506 16.8964C5.25712 16.8903 5.45223 16.8749 5.70717 16.9336C5.99955 17.0009 6.31535 17.1533 6.58103 17.419L3.7526 20.2474C4.44011 20.9349 5.27387 20.9078 5.58449 20.8774C5.87039 20.8494 6.17822 20.767 6.29351 20.7382L5.32338 16.8576ZM7.9775 16.1941C7.95279 16.2188 7.9317 16.2399 7.91214 16.2593C7.89271 16.2787 7.87671 16.2945 7.86293 16.308C7.84916 16.3215 7.83911 16.3312 7.83172 16.3382C7.82812 16.3416 7.82545 16.3441 7.8236 16.3458C7.82176 16.3475 7.8209 16.3483 7.82092 16.3482C7.82094 16.3482 7.82198 16.3473 7.82395 16.3456C7.82592 16.3439 7.82893 16.3413 7.83291 16.338C7.84086 16.3314 7.85292 16.3216 7.86866 16.3098C7.88455 16.2979 7.90362 16.2843 7.92564 16.2699C7.94776 16.2553 7.97131 16.2408 7.99605 16.2268L9.96684 19.7076C10.376 19.476 10.6864 19.1421 10.8059 19.0225L7.9775 16.1941ZM8.94764 20.0746C9.11169 20.0336 9.55771 19.9393 9.96685 19.7076L7.99605 16.2268C8.02079 16.2128 8.0453 16.2001 8.06917 16.1886C8.09292 16.1772 8.11438 16.1678 8.13277 16.1603C8.15098 16.1529 8.16553 16.1475 8.17529 16.1441C8.18017 16.1424 8.18394 16.1412 8.18642 16.1404C8.1889 16.1395 8.19024 16.1391 8.19026 16.1391C8.19028 16.1391 8.18918 16.1395 8.18677 16.1402C8.18435 16.1409 8.18084 16.1419 8.17606 16.1432C8.16625 16.1459 8.15278 16.1496 8.13414 16.1544C8.11548 16.1593 8.09368 16.1649 8.0671 16.1716C8.04034 16.1784 8.0114 16.1856 7.97751 16.1941L8.94764 20.0746ZM15.1716 9C15.3435 9.17192 15.4698 9.29842 15.5738 9.40785C15.6786 9.518 15.7263 9.57518 15.7457 9.60073C15.7644 9.62524 15.7226 9.57638 15.6774 9.46782C15.6254 9.34332 15.5858 9.18102 15.5858 9H19.5858C19.5858 8.17978 19.2282 7.57075 18.9258 7.1744C18.6586 6.82421 18.2934 6.46493 18 6.17157L15.1716 9ZM18 11.8284L18 11.8284L15.1716 8.99999L15.1716 9L18 11.8284ZM18 11.8284C18.2934 11.5351 18.6586 11.1758 18.9258 10.8256C19.2282 10.4292 19.5858 9.82022 19.5858 9H15.5858C15.5858 8.81898 15.6254 8.65668 15.6774 8.53218C15.7226 8.42362 15.7644 8.37476 15.7457 8.39927C15.7263 8.42482 15.6786 8.482 15.5738 8.59215C15.4698 8.70157 15.3435 8.82807 15.1716 9L18 11.8284ZM15 8.82843C15.1719 8.6565 15.2984 8.53019 15.4078 8.42615C15.518 8.32142 15.5752 8.27375 15.6007 8.25426C15.6252 8.23555 15.5764 8.27736 15.4678 8.32264C15.3433 8.37455 15.181 8.41421 15 8.41421V4.41421C14.1798 4.41421 13.5707 4.77177 13.1744 5.07417C12.8242 5.34136 12.4649 5.70664 12.1716 6L15 8.82843ZM17.8284 6C17.5351 5.70665 17.1758 5.34136 16.8256 5.07417C16.4293 4.77177 15.8202 4.41421 15 4.41421V8.41421C14.819 8.41421 14.6567 8.37455 14.5322 8.32264C14.4236 8.27736 14.3748 8.23555 14.3993 8.25426C14.4248 8.27375 14.482 8.32142 14.5922 8.42615C14.7016 8.53019 14.8281 8.6565 15 8.82843L17.8284 6ZM4.9775 13.1941C4.85793 13.3136 4.52401 13.624 4.29236 14.0332L7.77316 16.0039C7.75915 16.0287 7.7447 16.0522 7.73014 16.0744C7.71565 16.0964 7.70207 16.1155 7.69016 16.1313C7.67837 16.1471 7.66863 16.1591 7.66202 16.1671C7.65871 16.1711 7.65613 16.1741 7.65442 16.1761C7.65271 16.178 7.65178 16.1791 7.65176 16.1791C7.65174 16.1791 7.65252 16.1782 7.65422 16.1764C7.65593 16.1745 7.65842 16.1719 7.66184 16.1683C7.66884 16.1609 7.67852 16.1508 7.692 16.1371C7.7055 16.1233 7.72132 16.1073 7.74066 16.0879C7.76013 16.0683 7.78122 16.0472 7.80593 16.0225L4.9775 13.1941ZM7.80593 16.0225C7.8144 15.9886 7.82164 15.9597 7.82839 15.9329C7.8351 15.9063 7.84068 15.8845 7.84556 15.8659C7.85043 15.8472 7.85407 15.8337 7.8568 15.8239C7.85813 15.8192 7.85914 15.8157 7.85984 15.8132C7.86054 15.8108 7.86088 15.8097 7.86088 15.8097C7.86087 15.8098 7.86046 15.8111 7.85965 15.8136C7.85884 15.8161 7.85758 15.8198 7.85588 15.8247C7.85246 15.8345 7.84713 15.849 7.8397 15.8672C7.8322 15.8856 7.82284 15.9071 7.81141 15.9308C7.79993 15.9547 7.78717 15.9792 7.77316 16.0039L4.29236 14.0332C4.06071 14.4423 3.96637 14.8883 3.92536 15.0524L7.80593 16.0225Z", fill: "#FF7900", mask: "url(#path-1-outside-1_46_2147)" }), /* @__PURE__ */ reactExports.createElement("path", { d: "M12.5 7.5L15.5 5.5L18.5 8.5L16.5 11.5L12.5 7.5Z", fill: "#FF7900" }));
const line = "_line_8pjcn_1";
const container$3 = "_container_8pjcn_6";
const controls = "_controls_8pjcn_23";
const editWrapper = "_editWrapper_8pjcn_27";
const item = "_item_8pjcn_31";
const title$1 = "_title_8pjcn_41";
const editBox = "_editBox_8pjcn_52";
const edit = "_edit_8pjcn_27";
const trashContainer = "_trashContainer_8pjcn_72";
const active = "_active_8pjcn_92";
const styles$3 = {
  line,
  container: container$3,
  controls,
  editWrapper,
  item,
  title: title$1,
  editBox,
  edit,
  trashContainer,
  active
};
var defaultInstanceSettings = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: "normal",
  autoplay: true,
  timelineOffset: 0
};
var defaultTweenSettings = {
  duration: 1e3,
  delay: 0,
  endDelay: 0,
  easing: "easeOutElastic(1, .5)",
  round: 0
};
var validTransforms = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"];
var cache = {
  CSS: {},
  springs: {}
};
function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
function stringContains(str, text2) {
  return str.indexOf(text2) > -1;
}
function applyArguments(func, args) {
  return func.apply(null, args);
}
var is = {
  arr: function(a) {
    return Array.isArray(a);
  },
  obj: function(a) {
    return stringContains(Object.prototype.toString.call(a), "Object");
  },
  pth: function(a) {
    return is.obj(a) && a.hasOwnProperty("totalLength");
  },
  svg: function(a) {
    return a instanceof SVGElement;
  },
  inp: function(a) {
    return a instanceof HTMLInputElement;
  },
  dom: function(a) {
    return a.nodeType || is.svg(a);
  },
  str: function(a) {
    return typeof a === "string";
  },
  fnc: function(a) {
    return typeof a === "function";
  },
  und: function(a) {
    return typeof a === "undefined";
  },
  nil: function(a) {
    return is.und(a) || a === null;
  },
  hex: function(a) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
  },
  rgb: function(a) {
    return /^rgb/.test(a);
  },
  hsl: function(a) {
    return /^hsl/.test(a);
  },
  col: function(a) {
    return is.hex(a) || is.rgb(a) || is.hsl(a);
  },
  key: function(a) {
    return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== "targets" && a !== "keyframes";
  }
};
function parseEasingParameters(string) {
  var match = /\(([^)]+)\)/.exec(string);
  return match ? match[1].split(",").map(function(p2) {
    return parseFloat(p2);
  }) : [];
}
function spring(string, duration) {
  var params = parseEasingParameters(string);
  var mass = minMax(is.und(params[0]) ? 1 : params[0], 0.1, 100);
  var stiffness = minMax(is.und(params[1]) ? 100 : params[1], 0.1, 100);
  var damping = minMax(is.und(params[2]) ? 10 : params[2], 0.1, 100);
  var velocity = minMax(is.und(params[3]) ? 0 : params[3], 0.1, 100);
  var w0 = Math.sqrt(stiffness / mass);
  var zeta = damping / (2 * Math.sqrt(stiffness * mass));
  var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  var a = 1;
  var b2 = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;
  function solver(t2) {
    var progress = duration ? duration * t2 / 1e3 : t2;
    if (zeta < 1) {
      progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b2 * Math.sin(wd * progress));
    } else {
      progress = (a + b2 * progress) * Math.exp(-progress * w0);
    }
    if (t2 === 0 || t2 === 1) {
      return t2;
    }
    return 1 - progress;
  }
  function getDuration() {
    var cached = cache.springs[string];
    if (cached) {
      return cached;
    }
    var frame = 1 / 6;
    var elapsed = 0;
    var rest = 0;
    while (true) {
      elapsed += frame;
      if (solver(elapsed) === 1) {
        rest++;
        if (rest >= 16) {
          break;
        }
      } else {
        rest = 0;
      }
    }
    var duration2 = elapsed * frame * 1e3;
    cache.springs[string] = duration2;
    return duration2;
  }
  return duration ? solver : getDuration;
}
function steps(steps2) {
  if (steps2 === void 0)
    steps2 = 10;
  return function(t2) {
    return Math.ceil(minMax(t2, 1e-6, 1) * steps2) * (1 / steps2);
  };
}
var bezier = function() {
  var kSplineTableSize = 11;
  var kSampleStepSize = 1 / (kSplineTableSize - 1);
  function A2(aA1, aA2) {
    return 1 - 3 * aA2 + 3 * aA1;
  }
  function B(aA1, aA2) {
    return 3 * aA2 - 6 * aA1;
  }
  function C(aA1) {
    return 3 * aA1;
  }
  function calcBezier(aT, aA1, aA2) {
    return ((A2(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  }
  function getSlope(aT, aA1, aA2) {
    return 3 * A2(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
  }
  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;
    do {
      currentT = aA + (aB - aA) / 2;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > 1e-7 && ++i < 10);
    return currentT;
  }
  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < 4; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0) {
        return aGuessT;
      }
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }
  function bezier2(mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
      return;
    }
    var sampleValues = new Float32Array(kSplineTableSize);
    if (mX1 !== mY1 || mX2 !== mY2) {
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }
    function getTForX(aX) {
      var intervalStart = 0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;
      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;
      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;
      var initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= 1e-3) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }
    }
    return function(x2) {
      if (mX1 === mY1 && mX2 === mY2) {
        return x2;
      }
      if (x2 === 0 || x2 === 1) {
        return x2;
      }
      return calcBezier(getTForX(x2), mY1, mY2);
    };
  }
  return bezier2;
}();
var penner = function() {
  var eases = { linear: function() {
    return function(t2) {
      return t2;
    };
  } };
  var functionEasings = {
    Sine: function() {
      return function(t2) {
        return 1 - Math.cos(t2 * Math.PI / 2);
      };
    },
    Circ: function() {
      return function(t2) {
        return 1 - Math.sqrt(1 - t2 * t2);
      };
    },
    Back: function() {
      return function(t2) {
        return t2 * t2 * (3 * t2 - 2);
      };
    },
    Bounce: function() {
      return function(t2) {
        var pow2, b2 = 4;
        while (t2 < ((pow2 = Math.pow(2, --b2)) - 1) / 11) {
        }
        return 1 / Math.pow(4, 3 - b2) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t2, 2);
      };
    },
    Elastic: function(amplitude, period) {
      if (amplitude === void 0)
        amplitude = 1;
      if (period === void 0)
        period = 0.5;
      var a = minMax(amplitude, 1, 10);
      var p2 = minMax(period, 0.1, 2);
      return function(t2) {
        return t2 === 0 || t2 === 1 ? t2 : -a * Math.pow(2, 10 * (t2 - 1)) * Math.sin((t2 - 1 - p2 / (Math.PI * 2) * Math.asin(1 / a)) * (Math.PI * 2) / p2);
      };
    }
  };
  var baseEasings = ["Quad", "Cubic", "Quart", "Quint", "Expo"];
  baseEasings.forEach(function(name, i) {
    functionEasings[name] = function() {
      return function(t2) {
        return Math.pow(t2, i + 2);
      };
    };
  });
  Object.keys(functionEasings).forEach(function(name) {
    var easeIn = functionEasings[name];
    eases["easeIn" + name] = easeIn;
    eases["easeOut" + name] = function(a, b2) {
      return function(t2) {
        return 1 - easeIn(a, b2)(1 - t2);
      };
    };
    eases["easeInOut" + name] = function(a, b2) {
      return function(t2) {
        return t2 < 0.5 ? easeIn(a, b2)(t2 * 2) / 2 : 1 - easeIn(a, b2)(t2 * -2 + 2) / 2;
      };
    };
    eases["easeOutIn" + name] = function(a, b2) {
      return function(t2) {
        return t2 < 0.5 ? (1 - easeIn(a, b2)(1 - t2 * 2)) / 2 : (easeIn(a, b2)(t2 * 2 - 1) + 1) / 2;
      };
    };
  });
  return eases;
}();
function parseEasings(easing, duration) {
  if (is.fnc(easing)) {
    return easing;
  }
  var name = easing.split("(")[0];
  var ease = penner[name];
  var args = parseEasingParameters(easing);
  switch (name) {
    case "spring":
      return spring(easing, duration);
    case "cubicBezier":
      return applyArguments(bezier, args);
    case "steps":
      return applyArguments(steps, args);
    default:
      return applyArguments(ease, args);
  }
}
function selectString(str) {
  try {
    var nodes = document.querySelectorAll(str);
    return nodes;
  } catch (e2) {
    return;
  }
}
function filterArray(arr, callback) {
  var len = arr.length;
  var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  var result = [];
  for (var i = 0; i < len; i++) {
    if (i in arr) {
      var val = arr[i];
      if (callback.call(thisArg, val, i, arr)) {
        result.push(val);
      }
    }
  }
  return result;
}
function flattenArray(arr) {
  return arr.reduce(function(a, b2) {
    return a.concat(is.arr(b2) ? flattenArray(b2) : b2);
  }, []);
}
function toArray(o) {
  if (is.arr(o)) {
    return o;
  }
  if (is.str(o)) {
    o = selectString(o) || o;
  }
  if (o instanceof NodeList || o instanceof HTMLCollection) {
    return [].slice.call(o);
  }
  return [o];
}
function arrayContains(arr, val) {
  return arr.some(function(a) {
    return a === val;
  });
}
function cloneObject(o) {
  var clone = {};
  for (var p2 in o) {
    clone[p2] = o[p2];
  }
  return clone;
}
function replaceObjectProps(o1, o2) {
  var o = cloneObject(o1);
  for (var p2 in o1) {
    o[p2] = o2.hasOwnProperty(p2) ? o2[p2] : o1[p2];
  }
  return o;
}
function mergeObjects(o1, o2) {
  var o = cloneObject(o1);
  for (var p2 in o2) {
    o[p2] = is.und(o1[p2]) ? o2[p2] : o1[p2];
  }
  return o;
}
function rgbToRgba(rgbValue) {
  var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
  return rgb ? "rgba(" + rgb[1] + ",1)" : rgbValue;
}
function hexToRgba(hexValue) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function(m2, r3, g3, b3) {
    return r3 + r3 + g3 + g3 + b3 + b3;
  });
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r2 = parseInt(rgb[1], 16);
  var g2 = parseInt(rgb[2], 16);
  var b2 = parseInt(rgb[3], 16);
  return "rgba(" + r2 + "," + g2 + "," + b2 + ",1)";
}
function hslToRgba(hslValue) {
  var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
  var h2 = parseInt(hsl[1], 10) / 360;
  var s = parseInt(hsl[2], 10) / 100;
  var l2 = parseInt(hsl[3], 10) / 100;
  var a = hsl[4] || 1;
  function hue2rgb(p3, q3, t2) {
    if (t2 < 0) {
      t2 += 1;
    }
    if (t2 > 1) {
      t2 -= 1;
    }
    if (t2 < 1 / 6) {
      return p3 + (q3 - p3) * 6 * t2;
    }
    if (t2 < 1 / 2) {
      return q3;
    }
    if (t2 < 2 / 3) {
      return p3 + (q3 - p3) * (2 / 3 - t2) * 6;
    }
    return p3;
  }
  var r2, g2, b2;
  if (s == 0) {
    r2 = g2 = b2 = l2;
  } else {
    var q2 = l2 < 0.5 ? l2 * (1 + s) : l2 + s - l2 * s;
    var p2 = 2 * l2 - q2;
    r2 = hue2rgb(p2, q2, h2 + 1 / 3);
    g2 = hue2rgb(p2, q2, h2);
    b2 = hue2rgb(p2, q2, h2 - 1 / 3);
  }
  return "rgba(" + r2 * 255 + "," + g2 * 255 + "," + b2 * 255 + "," + a + ")";
}
function colorToRgb(val) {
  if (is.rgb(val)) {
    return rgbToRgba(val);
  }
  if (is.hex(val)) {
    return hexToRgba(val);
  }
  if (is.hsl(val)) {
    return hslToRgba(val);
  }
}
function getUnit(val) {
  var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
  if (split) {
    return split[1];
  }
}
function getTransformUnit(propName) {
  if (stringContains(propName, "translate") || propName === "perspective") {
    return "px";
  }
  if (stringContains(propName, "rotate") || stringContains(propName, "skew")) {
    return "deg";
  }
}
function getFunctionValue(val, animatable) {
  if (!is.fnc(val)) {
    return val;
  }
  return val(animatable.target, animatable.id, animatable.total);
}
function getAttribute(el, prop) {
  return el.getAttribute(prop);
}
function convertPxToUnit(el, value, unit) {
  var valueUnit = getUnit(value);
  if (arrayContains([unit, "deg", "rad", "turn"], valueUnit)) {
    return value;
  }
  var cached = cache.CSS[value + unit];
  if (!is.und(cached)) {
    return cached;
  }
  var baseline = 100;
  var tempEl = document.createElement(el.tagName);
  var parentEl = el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
  parentEl.appendChild(tempEl);
  tempEl.style.position = "absolute";
  tempEl.style.width = baseline + unit;
  var factor = baseline / tempEl.offsetWidth;
  parentEl.removeChild(tempEl);
  var convertedUnit = factor * parseFloat(value);
  cache.CSS[value + unit] = convertedUnit;
  return convertedUnit;
}
function getCSSValue(el, prop, unit) {
  if (prop in el.style) {
    var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || "0";
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
}
function getAnimationType(el, prop) {
  if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || is.svg(el) && el[prop])) {
    return "attribute";
  }
  if (is.dom(el) && arrayContains(validTransforms, prop)) {
    return "transform";
  }
  if (is.dom(el) && (prop !== "transform" && getCSSValue(el, prop))) {
    return "css";
  }
  if (el[prop] != null) {
    return "object";
  }
}
function getElementTransforms(el) {
  if (!is.dom(el)) {
    return;
  }
  var str = el.style.transform || "";
  var reg = /(\w+)\(([^)]*)\)/g;
  var transforms = /* @__PURE__ */ new Map();
  var m2;
  while (m2 = reg.exec(str)) {
    transforms.set(m2[1], m2[2]);
  }
  return transforms;
}
function getTransformValue(el, propName, animatable, unit) {
  var defaultVal = stringContains(propName, "scale") ? 1 : 0 + getTransformUnit(propName);
  var value = getElementTransforms(el).get(propName) || defaultVal;
  if (animatable) {
    animatable.transforms.list.set(propName, value);
    animatable.transforms["last"] = propName;
  }
  return unit ? convertPxToUnit(el, value, unit) : value;
}
function getOriginalTargetValue(target, propName, unit, animatable) {
  switch (getAnimationType(target, propName)) {
    case "transform":
      return getTransformValue(target, propName, animatable, unit);
    case "css":
      return getCSSValue(target, propName, unit);
    case "attribute":
      return getAttribute(target, propName);
    default:
      return target[propName] || 0;
  }
}
function getRelativeValue(to, from) {
  var operator = /^(\*=|\+=|-=)/.exec(to);
  if (!operator) {
    return to;
  }
  var u = getUnit(to) || 0;
  var x2 = parseFloat(from);
  var y2 = parseFloat(to.replace(operator[0], ""));
  switch (operator[0][0]) {
    case "+":
      return x2 + y2 + u;
    case "-":
      return x2 - y2 + u;
    case "*":
      return x2 * y2 + u;
  }
}
function validateValue(val, unit) {
  if (is.col(val)) {
    return colorToRgb(val);
  }
  if (/\s/g.test(val)) {
    return val;
  }
  var originalUnit = getUnit(val);
  var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
  if (unit) {
    return unitLess + unit;
  }
  return unitLess;
}
function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
function getCircleLength(el) {
  return Math.PI * 2 * getAttribute(el, "r");
}
function getRectLength(el) {
  return getAttribute(el, "width") * 2 + getAttribute(el, "height") * 2;
}
function getLineLength(el) {
  return getDistance(
    { x: getAttribute(el, "x1"), y: getAttribute(el, "y1") },
    { x: getAttribute(el, "x2"), y: getAttribute(el, "y2") }
  );
}
function getPolylineLength(el) {
  var points = el.points;
  var totalLength = 0;
  var previousPos;
  for (var i = 0; i < points.numberOfItems; i++) {
    var currentPos = points.getItem(i);
    if (i > 0) {
      totalLength += getDistance(previousPos, currentPos);
    }
    previousPos = currentPos;
  }
  return totalLength;
}
function getPolygonLength(el) {
  var points = el.points;
  return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
}
function getTotalLength(el) {
  if (el.getTotalLength) {
    return el.getTotalLength();
  }
  switch (el.tagName.toLowerCase()) {
    case "circle":
      return getCircleLength(el);
    case "rect":
      return getRectLength(el);
    case "line":
      return getLineLength(el);
    case "polyline":
      return getPolylineLength(el);
    case "polygon":
      return getPolygonLength(el);
  }
}
function setDashoffset(el) {
  var pathLength = getTotalLength(el);
  el.setAttribute("stroke-dasharray", pathLength);
  return pathLength;
}
function getParentSvgEl(el) {
  var parentEl = el.parentNode;
  while (is.svg(parentEl)) {
    if (!is.svg(parentEl.parentNode)) {
      break;
    }
    parentEl = parentEl.parentNode;
  }
  return parentEl;
}
function getParentSvg(pathEl, svgData) {
  var svg = svgData || {};
  var parentSvgEl = svg.el || getParentSvgEl(pathEl);
  var rect = parentSvgEl.getBoundingClientRect();
  var viewBoxAttr = getAttribute(parentSvgEl, "viewBox");
  var width = rect.width;
  var height = rect.height;
  var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(" ") : [0, 0, width, height]);
  return {
    el: parentSvgEl,
    viewBox,
    x: viewBox[0] / 1,
    y: viewBox[1] / 1,
    w: width,
    h: height,
    vW: viewBox[2],
    vH: viewBox[3]
  };
}
function getPath(path, percent) {
  var pathEl = is.str(path) ? selectString(path)[0] : path;
  var p2 = percent || 100;
  return function(property) {
    return {
      property,
      el: pathEl,
      svg: getParentSvg(pathEl),
      totalLength: getTotalLength(pathEl) * (p2 / 100)
    };
  };
}
function getPathProgress(path, progress, isPathTargetInsideSVG) {
  function point(offset) {
    if (offset === void 0)
      offset = 0;
    var l2 = progress + offset >= 1 ? progress + offset : 0;
    return path.el.getPointAtLength(l2);
  }
  var svg = getParentSvg(path.el, path.svg);
  var p2 = point();
  var p0 = point(-1);
  var p1 = point(1);
  var scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW;
  var scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;
  switch (path.property) {
    case "x":
      return (p2.x - svg.x) * scaleX;
    case "y":
      return (p2.y - svg.y) * scaleY;
    case "angle":
      return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
  }
}
function decomposeValue(val, unit) {
  var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
  var value = validateValue(is.pth(val) ? val.totalLength : val, unit) + "";
  return {
    original: value,
    numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
    strings: is.str(val) || unit ? value.split(rgx) : []
  };
}
function parseTargets(targets) {
  var targetsArray = targets ? flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets)) : [];
  return filterArray(targetsArray, function(item2, pos, self) {
    return self.indexOf(item2) === pos;
  });
}
function getAnimatables(targets) {
  var parsed = parseTargets(targets);
  return parsed.map(function(t2, i) {
    return { target: t2, id: i, total: parsed.length, transforms: { list: getElementTransforms(t2) } };
  });
}
function normalizePropertyTweens(prop, tweenSettings) {
  var settings = cloneObject(tweenSettings);
  if (/^spring/.test(settings.easing)) {
    settings.duration = spring(settings.easing);
  }
  if (is.arr(prop)) {
    var l2 = prop.length;
    var isFromTo = l2 === 2 && !is.obj(prop[0]);
    if (!isFromTo) {
      if (!is.fnc(tweenSettings.duration)) {
        settings.duration = tweenSettings.duration / l2;
      }
    } else {
      prop = { value: prop };
    }
  }
  var propArray = is.arr(prop) ? prop : [prop];
  return propArray.map(function(v2, i) {
    var obj = is.obj(v2) && !is.pth(v2) ? v2 : { value: v2 };
    if (is.und(obj.delay)) {
      obj.delay = !i ? tweenSettings.delay : 0;
    }
    if (is.und(obj.endDelay)) {
      obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0;
    }
    return obj;
  }).map(function(k2) {
    return mergeObjects(k2, settings);
  });
}
function flattenKeyframes(keyframes) {
  var propertyNames = filterArray(flattenArray(keyframes.map(function(key) {
    return Object.keys(key);
  })), function(p2) {
    return is.key(p2);
  }).reduce(function(a, b2) {
    if (a.indexOf(b2) < 0) {
      a.push(b2);
    }
    return a;
  }, []);
  var properties = {};
  var loop = function(i2) {
    var propName = propertyNames[i2];
    properties[propName] = keyframes.map(function(key) {
      var newKey = {};
      for (var p2 in key) {
        if (is.key(p2)) {
          if (p2 == propName) {
            newKey.value = key[p2];
          }
        } else {
          newKey[p2] = key[p2];
        }
      }
      return newKey;
    });
  };
  for (var i = 0; i < propertyNames.length; i++)
    loop(i);
  return properties;
}
function getProperties(tweenSettings, params) {
  var properties = [];
  var keyframes = params.keyframes;
  if (keyframes) {
    params = mergeObjects(flattenKeyframes(keyframes), params);
  }
  for (var p2 in params) {
    if (is.key(p2)) {
      properties.push({
        name: p2,
        tweens: normalizePropertyTweens(params[p2], tweenSettings)
      });
    }
  }
  return properties;
}
function normalizeTweenValues(tween, animatable) {
  var t2 = {};
  for (var p2 in tween) {
    var value = getFunctionValue(tween[p2], animatable);
    if (is.arr(value)) {
      value = value.map(function(v2) {
        return getFunctionValue(v2, animatable);
      });
      if (value.length === 1) {
        value = value[0];
      }
    }
    t2[p2] = value;
  }
  t2.duration = parseFloat(t2.duration);
  t2.delay = parseFloat(t2.delay);
  return t2;
}
function normalizeTweens(prop, animatable) {
  var previousTween;
  return prop.tweens.map(function(t2) {
    var tween = normalizeTweenValues(t2, animatable);
    var tweenValue = tween.value;
    var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
    var toUnit = getUnit(to);
    var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
    var previousValue = previousTween ? previousTween.to.original : originalValue;
    var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
    var fromUnit = getUnit(from) || getUnit(originalValue);
    var unit = toUnit || fromUnit;
    if (is.und(to)) {
      to = previousValue;
    }
    tween.from = decomposeValue(from, unit);
    tween.to = decomposeValue(getRelativeValue(to, from), unit);
    tween.start = previousTween ? previousTween.end : 0;
    tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
    tween.easing = parseEasings(tween.easing, tween.duration);
    tween.isPath = is.pth(tweenValue);
    tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
    tween.isColor = is.col(tween.from.original);
    if (tween.isColor) {
      tween.round = 1;
    }
    previousTween = tween;
    return tween;
  });
}
var setProgressValue = {
  css: function(t2, p2, v2) {
    return t2.style[p2] = v2;
  },
  attribute: function(t2, p2, v2) {
    return t2.setAttribute(p2, v2);
  },
  object: function(t2, p2, v2) {
    return t2[p2] = v2;
  },
  transform: function(t2, p2, v2, transforms, manual) {
    transforms.list.set(p2, v2);
    if (p2 === transforms.last || manual) {
      var str = "";
      transforms.list.forEach(function(value, prop) {
        str += prop + "(" + value + ") ";
      });
      t2.style.transform = str;
    }
  }
};
function setTargetsValue(targets, properties) {
  var animatables = getAnimatables(targets);
  animatables.forEach(function(animatable) {
    for (var property in properties) {
      var value = getFunctionValue(properties[property], animatable);
      var target = animatable.target;
      var valueUnit = getUnit(value);
      var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
      var unit = valueUnit || getUnit(originalValue);
      var to = getRelativeValue(validateValue(value, unit), originalValue);
      var animType = getAnimationType(target, property);
      setProgressValue[animType](target, property, to, animatable.transforms, true);
    }
  });
}
function createAnimation(animatable, prop) {
  var animType = getAnimationType(animatable.target, prop.name);
  if (animType) {
    var tweens = normalizeTweens(prop, animatable);
    var lastTween = tweens[tweens.length - 1];
    return {
      type: animType,
      property: prop.name,
      animatable,
      tweens,
      duration: lastTween.end,
      delay: tweens[0].delay,
      endDelay: lastTween.endDelay
    };
  }
}
function getAnimations(animatables, properties) {
  return filterArray(flattenArray(animatables.map(function(animatable) {
    return properties.map(function(prop) {
      return createAnimation(animatable, prop);
    });
  })), function(a) {
    return !is.und(a);
  });
}
function getInstanceTimings(animations, tweenSettings) {
  var animLength = animations.length;
  var getTlOffset = function(anim) {
    return anim.timelineOffset ? anim.timelineOffset : 0;
  };
  var timings = {};
  timings.duration = animLength ? Math.max.apply(Math, animations.map(function(anim) {
    return getTlOffset(anim) + anim.duration;
  })) : tweenSettings.duration;
  timings.delay = animLength ? Math.min.apply(Math, animations.map(function(anim) {
    return getTlOffset(anim) + anim.delay;
  })) : tweenSettings.delay;
  timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function(anim) {
    return getTlOffset(anim) + anim.duration - anim.endDelay;
  })) : tweenSettings.endDelay;
  return timings;
}
var instanceID = 0;
function createNewInstance(params) {
  var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
  var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
  var properties = getProperties(tweenSettings, params);
  var animatables = getAnimatables(params.targets);
  var animations = getAnimations(animatables, properties);
  var timings = getInstanceTimings(animations, tweenSettings);
  var id = instanceID;
  instanceID++;
  return mergeObjects(instanceSettings, {
    id,
    children: [],
    animatables,
    animations,
    duration: timings.duration,
    delay: timings.delay,
    endDelay: timings.endDelay
  });
}
var activeInstances = [];
var engine = function() {
  var raf;
  function play() {
    if (!raf && (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) && activeInstances.length > 0) {
      raf = requestAnimationFrame(step);
    }
  }
  function step(t2) {
    var activeInstancesLength = activeInstances.length;
    var i = 0;
    while (i < activeInstancesLength) {
      var activeInstance = activeInstances[i];
      if (!activeInstance.paused) {
        activeInstance.tick(t2);
        i++;
      } else {
        activeInstances.splice(i, 1);
        activeInstancesLength--;
      }
    }
    raf = i > 0 ? requestAnimationFrame(step) : void 0;
  }
  function handleVisibilityChange() {
    if (!anime.suspendWhenDocumentHidden) {
      return;
    }
    if (isDocumentHidden()) {
      raf = cancelAnimationFrame(raf);
    } else {
      activeInstances.forEach(
        function(instance) {
          return instance._onDocumentVisibility();
        }
      );
      engine();
    }
  }
  if (typeof document !== "undefined") {
    document.addEventListener("visibilitychange", handleVisibilityChange);
  }
  return play;
}();
function isDocumentHidden() {
  return !!document && document.hidden;
}
function anime(params) {
  if (params === void 0)
    params = {};
  var startTime = 0, lastTime = 0, now = 0;
  var children, childrenLength = 0;
  var resolve = null;
  function makePromise(instance2) {
    var promise = window.Promise && new Promise(function(_resolve) {
      return resolve = _resolve;
    });
    instance2.finished = promise;
    return promise;
  }
  var instance = createNewInstance(params);
  makePromise(instance);
  function toggleInstanceDirection() {
    var direction = instance.direction;
    if (direction !== "alternate") {
      instance.direction = direction !== "normal" ? "normal" : "reverse";
    }
    instance.reversed = !instance.reversed;
    children.forEach(function(child) {
      return child.reversed = instance.reversed;
    });
  }
  function adjustTime(time) {
    return instance.reversed ? instance.duration - time : time;
  }
  function resetTime() {
    startTime = 0;
    lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
  }
  function seekChild(time, child) {
    if (child) {
      child.seek(time - child.timelineOffset);
    }
  }
  function syncInstanceChildren(time) {
    if (!instance.reversePlayback) {
      for (var i = 0; i < childrenLength; i++) {
        seekChild(time, children[i]);
      }
    } else {
      for (var i$1 = childrenLength; i$1--; ) {
        seekChild(time, children[i$1]);
      }
    }
  }
  function setAnimationsProgress(insTime) {
    var i = 0;
    var animations = instance.animations;
    var animationsLength = animations.length;
    while (i < animationsLength) {
      var anim = animations[i];
      var animatable = anim.animatable;
      var tweens = anim.tweens;
      var tweenLength = tweens.length - 1;
      var tween = tweens[tweenLength];
      if (tweenLength) {
        tween = filterArray(tweens, function(t2) {
          return insTime < t2.end;
        })[0] || tween;
      }
      var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
      var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
      var strings = tween.to.strings;
      var round = tween.round;
      var numbers = [];
      var toNumbersLength = tween.to.numbers.length;
      var progress = void 0;
      for (var n2 = 0; n2 < toNumbersLength; n2++) {
        var value = void 0;
        var toNumber = tween.to.numbers[n2];
        var fromNumber = tween.from.numbers[n2] || 0;
        if (!tween.isPath) {
          value = fromNumber + eased * (toNumber - fromNumber);
        } else {
          value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG);
        }
        if (round) {
          if (!(tween.isColor && n2 > 2)) {
            value = Math.round(value * round) / round;
          }
        }
        numbers.push(value);
      }
      var stringsLength = strings.length;
      if (!stringsLength) {
        progress = numbers[0];
      } else {
        progress = strings[0];
        for (var s = 0; s < stringsLength; s++) {
          strings[s];
          var b2 = strings[s + 1];
          var n$1 = numbers[s];
          if (!isNaN(n$1)) {
            if (!b2) {
              progress += n$1 + " ";
            } else {
              progress += n$1 + b2;
            }
          }
        }
      }
      setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
      anim.currentValue = progress;
      i++;
    }
  }
  function setCallback(cb) {
    if (instance[cb] && !instance.passThrough) {
      instance[cb](instance);
    }
  }
  function countIteration() {
    if (instance.remaining && instance.remaining !== true) {
      instance.remaining--;
    }
  }
  function setInstanceProgress(engineTime) {
    var insDuration = instance.duration;
    var insDelay = instance.delay;
    var insEndDelay = insDuration - instance.endDelay;
    var insTime = adjustTime(engineTime);
    instance.progress = minMax(insTime / insDuration * 100, 0, 100);
    instance.reversePlayback = insTime < instance.currentTime;
    if (children) {
      syncInstanceChildren(insTime);
    }
    if (!instance.began && instance.currentTime > 0) {
      instance.began = true;
      setCallback("begin");
    }
    if (!instance.loopBegan && instance.currentTime > 0) {
      instance.loopBegan = true;
      setCallback("loopBegin");
    }
    if (insTime <= insDelay && instance.currentTime !== 0) {
      setAnimationsProgress(0);
    }
    if (insTime >= insEndDelay && instance.currentTime !== insDuration || !insDuration) {
      setAnimationsProgress(insDuration);
    }
    if (insTime > insDelay && insTime < insEndDelay) {
      if (!instance.changeBegan) {
        instance.changeBegan = true;
        instance.changeCompleted = false;
        setCallback("changeBegin");
      }
      setCallback("change");
      setAnimationsProgress(insTime);
    } else {
      if (instance.changeBegan) {
        instance.changeCompleted = true;
        instance.changeBegan = false;
        setCallback("changeComplete");
      }
    }
    instance.currentTime = minMax(insTime, 0, insDuration);
    if (instance.began) {
      setCallback("update");
    }
    if (engineTime >= insDuration) {
      lastTime = 0;
      countIteration();
      if (!instance.remaining) {
        instance.paused = true;
        if (!instance.completed) {
          instance.completed = true;
          setCallback("loopComplete");
          setCallback("complete");
          if (!instance.passThrough && "Promise" in window) {
            resolve();
            makePromise(instance);
          }
        }
      } else {
        startTime = now;
        setCallback("loopComplete");
        instance.loopBegan = false;
        if (instance.direction === "alternate") {
          toggleInstanceDirection();
        }
      }
    }
  }
  instance.reset = function() {
    var direction = instance.direction;
    instance.passThrough = false;
    instance.currentTime = 0;
    instance.progress = 0;
    instance.paused = true;
    instance.began = false;
    instance.loopBegan = false;
    instance.changeBegan = false;
    instance.completed = false;
    instance.changeCompleted = false;
    instance.reversePlayback = false;
    instance.reversed = direction === "reverse";
    instance.remaining = instance.loop;
    children = instance.children;
    childrenLength = children.length;
    for (var i = childrenLength; i--; ) {
      instance.children[i].reset();
    }
    if (instance.reversed && instance.loop !== true || direction === "alternate" && instance.loop === 1) {
      instance.remaining++;
    }
    setAnimationsProgress(instance.reversed ? instance.duration : 0);
  };
  instance._onDocumentVisibility = resetTime;
  instance.set = function(targets, properties) {
    setTargetsValue(targets, properties);
    return instance;
  };
  instance.tick = function(t2) {
    now = t2;
    if (!startTime) {
      startTime = now;
    }
    setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
  };
  instance.seek = function(time) {
    setInstanceProgress(adjustTime(time));
  };
  instance.pause = function() {
    instance.paused = true;
    resetTime();
  };
  instance.play = function() {
    if (!instance.paused) {
      return;
    }
    if (instance.completed) {
      instance.reset();
    }
    instance.paused = false;
    activeInstances.push(instance);
    resetTime();
    engine();
  };
  instance.reverse = function() {
    toggleInstanceDirection();
    instance.completed = instance.reversed ? false : true;
    resetTime();
  };
  instance.restart = function() {
    instance.reset();
    instance.play();
  };
  instance.remove = function(targets) {
    var targetsArray = parseTargets(targets);
    removeTargetsFromInstance(targetsArray, instance);
  };
  instance.reset();
  if (instance.autoplay) {
    instance.play();
  }
  return instance;
}
function removeTargetsFromAnimations(targetsArray, animations) {
  for (var a = animations.length; a--; ) {
    if (arrayContains(targetsArray, animations[a].animatable.target)) {
      animations.splice(a, 1);
    }
  }
}
function removeTargetsFromInstance(targetsArray, instance) {
  var animations = instance.animations;
  var children = instance.children;
  removeTargetsFromAnimations(targetsArray, animations);
  for (var c2 = children.length; c2--; ) {
    var child = children[c2];
    var childAnimations = child.animations;
    removeTargetsFromAnimations(targetsArray, childAnimations);
    if (!childAnimations.length && !child.children.length) {
      children.splice(c2, 1);
    }
  }
  if (!animations.length && !children.length) {
    instance.pause();
  }
}
function removeTargetsFromActiveInstances(targets) {
  var targetsArray = parseTargets(targets);
  for (var i = activeInstances.length; i--; ) {
    var instance = activeInstances[i];
    removeTargetsFromInstance(targetsArray, instance);
  }
}
function stagger(val, params) {
  if (params === void 0)
    params = {};
  var direction = params.direction || "normal";
  var easing = params.easing ? parseEasings(params.easing) : null;
  var grid = params.grid;
  var axis = params.axis;
  var fromIndex = params.from || 0;
  var fromFirst = fromIndex === "first";
  var fromCenter = fromIndex === "center";
  var fromLast = fromIndex === "last";
  var isRange = is.arr(val);
  var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
  var val2 = isRange ? parseFloat(val[1]) : 0;
  var unit = getUnit(isRange ? val[1] : val) || 0;
  var start = params.start || 0 + (isRange ? val1 : 0);
  var values = [];
  var maxValue = 0;
  return function(el, i, t2) {
    if (fromFirst) {
      fromIndex = 0;
    }
    if (fromCenter) {
      fromIndex = (t2 - 1) / 2;
    }
    if (fromLast) {
      fromIndex = t2 - 1;
    }
    if (!values.length) {
      for (var index = 0; index < t2; index++) {
        if (!grid) {
          values.push(Math.abs(fromIndex - index));
        } else {
          var fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
          var fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
          var toX = index % grid[0];
          var toY = Math.floor(index / grid[0]);
          var distanceX = fromX - toX;
          var distanceY = fromY - toY;
          var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === "x") {
            value = -distanceX;
          }
          if (axis === "y") {
            value = -distanceY;
          }
          values.push(value);
        }
        maxValue = Math.max.apply(Math, values);
      }
      if (easing) {
        values = values.map(function(val3) {
          return easing(val3 / maxValue) * maxValue;
        });
      }
      if (direction === "reverse") {
        values = values.map(function(val3) {
          return axis ? val3 < 0 ? val3 * -1 : -val3 : Math.abs(maxValue - val3);
        });
      }
    }
    var spacing = isRange ? (val2 - val1) / maxValue : val1;
    return start + spacing * (Math.round(values[i] * 100) / 100) + unit;
  };
}
function timeline(params) {
  if (params === void 0)
    params = {};
  var tl = anime(params);
  tl.duration = 0;
  tl.add = function(instanceParams, timelineOffset) {
    var tlIndex = activeInstances.indexOf(tl);
    var children = tl.children;
    if (tlIndex > -1) {
      activeInstances.splice(tlIndex, 1);
    }
    function passThrough(ins2) {
      ins2.passThrough = true;
    }
    for (var i = 0; i < children.length; i++) {
      passThrough(children[i]);
    }
    var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
    insParams.targets = insParams.targets || params.targets;
    var tlDuration = tl.duration;
    insParams.autoplay = false;
    insParams.direction = tl.direction;
    insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
    passThrough(tl);
    tl.seek(insParams.timelineOffset);
    var ins = anime(insParams);
    passThrough(ins);
    children.push(ins);
    var timings = getInstanceTimings(children, params);
    tl.delay = timings.delay;
    tl.endDelay = timings.endDelay;
    tl.duration = timings.duration;
    tl.seek(0);
    tl.reset();
    if (tl.autoplay) {
      tl.play();
    }
    return tl;
  };
  return tl;
}
anime.version = "3.2.1";
anime.speed = 1;
anime.suspendWhenDocumentHidden = true;
anime.running = activeInstances;
anime.remove = removeTargetsFromActiveInstances;
anime.get = getOriginalTargetValue;
anime.set = setTargetsValue;
anime.convertPx = convertPxToUnit;
anime.path = getPath;
anime.setDashoffset = setDashoffset;
anime.stagger = stagger;
anime.timeline = timeline;
anime.easing = parseEasings;
anime.penner = penner;
anime.random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const PriceTrackItem = ({ priceTrack, deletePT }) => {
  const [mode, setModeRaw] = reactExports.useState("VIEW");
  const [loading, setLoading] = reactExports.useState(false);
  const [updatePrice, setUpdatePrice] = reactExports.useState(priceTrack.expectedPrice);
  const alertPickerRef = reactExports.useRef();
  const delButtonRef = reactExports.useRef();
  const alertItemRef = reactExports.useRef();
  const animPropsRef = reactExports.useRef();
  reactExports.useEffect(() => {
    animPropsRef.current = {
      alertPickerNode: alertPickerRef.current,
      get editHeight() {
        return this.alertPickerNode.clientHeight;
      },
      alertItemNode: alertItemRef.current,
      get inputNode() {
        return this.alertPickerNode.querySelector("#newPrice");
      },
      get alertItemHeight() {
        return this.alertItemNode.clientHeight;
      },
      delButtonNode: delButtonRef.current,
      get alertContainer() {
        return this.alertItemNode.parentElement?.parentElement;
      },
      get scrollTopHeight() {
        return this.alertPickerNode.getBoundingClientRect().y;
      }
    };
    const { alertPickerNode, editHeight } = animPropsRef.current;
    if (alertPickerNode) {
      alertPickerNode.style.marginTop = `${-editHeight}px`;
    }
  }, [priceTrack, mode]);
  const delTimeLIne = anime.timeline({
    easing: "easeOutExpo",
    duration: 750
  });
  const setMode = reactExports.useCallback(
    (newMode) => {
      setModeRaw(newMode === mode ? "VIEW" : newMode);
    },
    [mode]
  );
  const onConfirm = async (price2, expirationDays) => {
    try {
      setLoading(true);
      await priceTrackAPI.methods.update({
        ...priceTrack,
        expectedPrice: price2,
        expirationDays: expirationDays.toString()
      });
      metricAlertsApi.methods.metricAlerts({
        name: "ext-event-price-track-edit",
        data: {
          productTitle: priceTrack.product.title,
          productImageUrl: priceTrack.product.imageUrl,
          productUrl: priceTrack.product.url,
          merchantDomain: new URL(priceTrack.product.url).host.replace(/^w+\./, "")
        }
      });
      setLoading(false);
      setUpdatePrice(price2);
      setMode("VIEW");
    } catch (error) {
    }
  };
  const onDelete = async () => {
    try {
      deletePT({ id: priceTrack.id });
      await priceTrackAPI.methods.remove(priceTrack);
      metricAlertsApi.methods.metricAlerts({
        name: "ext-event-price-track-delete",
        data: {
          productTitle: priceTrack.product.title,
          productImageUrl: priceTrack.product.imageUrl,
          productUrl: priceTrack.product.url,
          merchantDomain: new URL(priceTrack.product.url).host.replace(/^w+\./, "")
        }
      });
      logger.log("alerta borrada correctamente");
    } catch (error) {
      logger.error("Something went wrong removing the priceTrack", error);
      throw error;
    }
  };
  return /* @__PURE__ */ jsxs("div", { ref: alertItemRef, className: styles$3.container, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$3.item, children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: `https://chollometrocextension.digidip.net/visit?url=${encodeURI(
            priceTrack.product.url
          )}`,
          target: "_blank",
          children: /* @__PURE__ */ jsx(ImageBox, { imageUrl: priceTrack.product.imageUrl })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: styles$3.description, children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: styles$3.title,
            onClick: () => {
              const urlTracking = `https://chollometrocextension.digidip.net/visit?url=${encodeURI(
                priceTrack.product.url
              )}`;
              window.open(urlTracking, "_blank", "noopener");
            },
            title: priceTrack.product.title,
            children: priceTrack.product.title
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: styles$3.editBox, children: [
          /* @__PURE__ */ jsx(
            PriceShopSpec,
            {
              price: updatePrice,
              shop: priceTrack.shop,
              currencySign: "€"
            }
          ),
          mode == "VIEW" && /* @__PURE__ */ jsx(
            "a",
            {
              onClick: () => {
                setMode("EDIT");
                const { alertPickerNode, inputNode, alertItemNode } = animPropsRef.current;
                anime({
                  targets: alertPickerNode,
                  marginTop: 0,
                  complete(anim) {
                    alertItemNode.scrollIntoView({
                      behavior: "smooth",
                      block: "end"
                    });
                    setTimeout(() => {
                      inputNode.focus();
                    }, 500);
                  }
                });
              },
              className: classNames(styles$3.edit),
              children: /* @__PURE__ */ jsx(SvgPeninline, {})
            }
          ),
          mode === "VIEW" && /* @__PURE__ */ jsx(
            "div",
            {
              ref: delButtonRef,
              className: styles$3.trashContainer,
              onClick: () => {
                const { delButtonNode, alertItemNode, alertItemHeight } = animPropsRef.current;
                delTimeLIne.add({
                  targets: delButtonNode,
                  width: "100%"
                }).add({
                  targets: alertItemNode,
                  keyframes: [
                    { opacity: 0 },
                    { marginTop: `-${alertItemHeight}px` }
                  ],
                  complete(anim) {
                    onDelete();
                  }
                });
              },
              children: /* @__PURE__ */ jsx(SvgTrashinline, {})
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$3.controls, children: /* @__PURE__ */ jsx("div", { id: "edit", ref: alertPickerRef, className: styles$3.editWrapper, children: /* @__PURE__ */ jsx(
      PriceTrackInput,
      {
        onConfirm,
        onCancel: () => {
          const { alertPickerNode, editHeight } = animPropsRef.current;
          anime({
            targets: alertPickerNode,
            marginTop: `${-editHeight}px`
          });
          setMode("VIEW");
        },
        confirmLabel: "Guardar",
        cancelLabel: "Cancelar",
        mode: "UPDATE",
        trackingPrice: priceTrack.expectedPrice,
        expirationDays: priceTrack.expirationDays,
        trackingStartMs: priceTrack.createdAt,
        isLoading: loading
      }
    ) }) })
  ] }, priceTrack.id);
};
const container$2 = "_container_1h08c_1";
const content = "_content_1h08c_16";
const notification = "_notification_1h08c_25";
const timeAgo$1 = "_timeAgo_1h08c_28";
const title = "_title_1h08c_36";
const timeAgoTrash = "_timeAgoTrash_1h08c_47";
const priceWrapper = "_priceWrapper_1h08c_52";
const trash = "_trash_1h08c_56";
const productInfo = "_productInfo_1h08c_78";
const warningWrapper = "_warningWrapper_1h08c_82";
const styles$2 = {
  container: container$2,
  content,
  notification,
  timeAgo: timeAgo$1,
  title,
  timeAgoTrash,
  priceWrapper,
  trash,
  productInfo,
  warningWrapper
};
//! moment.js locale configuration
var monthsShortDot = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split(
  "_"
), monthsShort = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), monthsParse = [
  /^ene/i,
  /^feb/i,
  /^mar/i,
  /^abr/i,
  /^may/i,
  /^jun/i,
  /^jul/i,
  /^ago/i,
  /^sep/i,
  /^oct/i,
  /^nov/i,
  /^dic/i
], monthsRegex = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
const esLocale = hooks.defineLocale("es", {
  months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split(
    "_"
  ),
  monthsShort: function(m2, format) {
    if (!m2) {
      return monthsShortDot;
    } else if (/-MMM-/.test(format)) {
      return monthsShort[m2.month()];
    } else {
      return monthsShortDot[m2.month()];
    }
  },
  monthsRegex,
  monthsShortRegex: monthsRegex,
  monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
  monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
  monthsParse,
  longMonthsParse: monthsParse,
  shortMonthsParse: monthsParse,
  weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
  weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
  weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "H:mm",
    LTS: "H:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D [de] MMMM [de] YYYY",
    LLL: "D [de] MMMM [de] YYYY H:mm",
    LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
  },
  calendar: {
    sameDay: function() {
      return "[hoy a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
    },
    nextDay: function() {
      return "[mañana a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
    },
    nextWeek: function() {
      return "dddd [a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
    },
    lastDay: function() {
      return "[ayer a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
    },
    lastWeek: function() {
      return "[el] dddd [pasado a la" + (this.hours() !== 1 ? "s" : "") + "] LT";
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "en %s",
    past: "hace %s",
    s: "unos segundos",
    ss: "%d segundos",
    m: "un minuto",
    mm: "%d minutos",
    h: "una hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    w: "una semana",
    ww: "%d semanas",
    M: "un mes",
    MM: "%d meses",
    y: "un año",
    yy: "%d años"
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: "%dº",
  week: {
    dow: 1,
    // Monday is the first day of the week.
    doy: 4
    // The week that contains Jan 4th is the first week of the year.
  },
  invalidDate: "Fecha inválida"
});
hooks.locale("es", [esLocale]);
function timeAgo(date) {
  return hooks(date).fromNow();
}
function PriceTrackNotificationItem({
  notification: notification2,
  deleteNoti
}) {
  const [showDialog, setIshowDialog] = reactExports.useState(false);
  const delButtonRef = reactExports.useRef();
  const notificationItemRef = reactExports.useRef();
  const animPropsRef = reactExports.useRef();
  reactExports.useEffect(() => {
    animPropsRef.current = {
      notiItemNode: notificationItemRef.current,
      get notiItemHeight() {
        return this.notiItemNode.clientHeight;
      },
      delButtonNode: delButtonRef.current
    };
  }, [notification2]);
  const delTimeLIne = anime.timeline({
    easing: "easeOutExpo",
    duration: 750
  });
  hooks.locale("es");
  const fromPrice = Math.max(
    notification2.creationPrice,
    notification2.expectedPrice,
    notification2.product.lastPrice || 0
  );
  const toPrice = notification2.product.price;
  return /* @__PURE__ */ jsx("div", { ref: notificationItemRef, className: styles$2.container, children: /* @__PURE__ */ jsxs(
    "div",
    {
      className: styles$2.content,
      onClick: () => {
        const urlTracking = `https://chollometrocextension.digidip.net/visit?url=${encodeURI(
          notification2.product.url
        )}`;
        window.open(urlTracking, "_blank", "noopener");
      },
      children: [
        /* @__PURE__ */ jsx(ImageBox, { imageUrl: notification2.product.imageUrl }),
        /* @__PURE__ */ jsxs("div", { className: styles$2.notification, children: [
          /* @__PURE__ */ jsx("div", { className: styles$2.timeAgoTrash, children: /* @__PURE__ */ jsx("div", { className: styles$2.timeAgo, children: timeAgo(notification2.notifiedAt ?? notification2.createdAt) }) }),
          /* @__PURE__ */ jsx("div", { className: styles$2.title, title: notification2.product.title, children: notification2.product.title }),
          /* @__PURE__ */ jsxs("div", { className: styles$2.priceWrapper, children: [
            /* @__PURE__ */ jsx(
              PriceShopSpec,
              {
                price: toPrice,
                shop: notification2.product.shop,
                lastPrice: fromPrice,
                currencySign: "€"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                ref: delButtonRef,
                className: classNames("item", styles$2.trash, {
                  [styles$2.trashSelected]: showDialog
                }),
                onClick: (e2) => {
                  e2.stopPropagation();
                  const { delButtonNode, notiItemNode, notiItemHeight } = animPropsRef.current;
                  delTimeLIne.add({
                    targets: delButtonNode,
                    width: "100%"
                  }).add({
                    targets: notiItemNode,
                    keyframes: [
                      { opacity: 0 },
                      { marginTop: `-${notiItemHeight}px` }
                    ],
                    complete(anim) {
                      deleteNoti(notification2.priceTrackNotificationId);
                    }
                  });
                },
                children: /* @__PURE__ */ jsx(SvgTrashinline, {})
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
const container$1 = "_container_4yq71_5";
const animated = "_animated_4yq71_9";
const styles$1 = {
  container: container$1,
  animated
};
const FetchStatus = ({ Component: Component2, net }) => {
  if (net.status === "pending") {
    throw net.result;
  }
  if (net.status === "error") {
    throw net.result;
  }
  return /* @__PURE__ */ jsx(Component2, {});
};
function WithSuspense({
  api,
  component,
  ...props
}) {
  api.connect();
  const net = {
    status: "pending",
    result: null
  };
  const apiPromise = api.read();
  net.result = apiPromise;
  apiPromise.then((data) => {
    net.status = "fullfilled";
    net.result = data;
  }).catch((error) => {
    net.status = "error";
    net.result = error;
  });
  return /* @__PURE__ */ jsx(FetchStatus, { net, Component: () => component({ data: net.result, api, ...props }) });
}
const PriceTrackConfigView = ({ data }) => {
  const [priceTracks, setPriceTracks] = reactExports.useState(data);
  const deletePT = ({ id }) => {
    setPriceTracks(priceTracks.filter((elm) => elm.id !== id));
  };
  if (priceTracks.length === 0) {
    return /* @__PURE__ */ jsx(ErrorDisplay, { faceExpression: "relieved", dialog: "no_alert" });
  }
  priceTracks.sort((elmA, elmB) => {
    const {
      product: { title: titleA }
    } = elmA;
    const {
      product: { title: titleB }
    } = elmB;
    return titleA.localeCompare(titleB);
  });
  return /* @__PURE__ */ jsx("div", { className: styles$1.container, children: priceTracks.map((pT, index) => {
    return /* @__PURE__ */ jsx(PriceTrackItem, { priceTrack: pT, deletePT }, pT.id);
  }) });
};
const PriceTrackConfigView$1 = () => {
  return /* @__PURE__ */ jsx(
    ErrorBoundary,
    {
      fallbackRender: () => {
        return /* @__PURE__ */ jsx(ErrorDisplay, { dialog: "unknown" });
      },
      children: /* @__PURE__ */ jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsx(Loader, {}), children: /* @__PURE__ */ jsx(WithSuspense, { api: priceTrackAPI, component: PriceTrackConfigView }) })
    }
  );
};
const container = "_container_1mmdi_1";
const styles = {
  container
};
const noNotificationsError = "NO_NOTIFICATIONS_ERROR";
const noPriceTracksError = "NO_PRICE_TRACKS";
const PriceTrackNotifications = ({
  data
}) => {
  const [notifications, setNotifications] = reactExports.useState(data);
  const [priceTracks] = useAPIResource(priceTrackAPI);
  const dispatch = useDispatch();
  const isPinfoOn = JSON.parse("true");
  const deleteNoti = (id) => {
    setNotifications(notifications.filter((noti) => noti.priceTrackNotificationId !== id));
    priceTrackNotificationsAPI.methods.remove(id);
  };
  reactExports.useEffect(() => {
    notifications.forEach((noti) => noti.status = 0);
    if (isPinfoOn && notifications.some((n2) => n2.status !== NotificationStatus.Read)) {
      dispatch(disableMarker());
    }
  }, []);
  if (notifications.length === 0) {
    if (priceTracks.length > 0) {
      throw new Error(noNotificationsError);
    }
    throw new Error(noPriceTracksError);
  }
  notifications.sort((a, b2) => {
    if (a.notifiedAt === null || b2.notifiedAt === null)
      return 1;
    return a.notifiedAt > b2.notifiedAt ? -1 : 1;
  });
  return /* @__PURE__ */ jsx("div", { className: styles.container, children: notifications.map((n2) => /* @__PURE__ */ jsx(
    PriceTrackNotificationItem,
    {
      notification: n2,
      deleteNoti
    },
    n2.priceTrackNotificationId
  )) });
};
const PriceTrackNotificationsView = () => /* @__PURE__ */ jsx(
  ErrorBoundary,
  {
    fallbackRender: ({ error }) => {
      logger$1.error(error.message, error.stack);
      switch (error.message) {
        case noNotificationsError:
          return /* @__PURE__ */ jsx(ErrorDisplay, { dialog: "no_down_price", faceExpression: "ashame" });
        case noPriceTracksError:
          return /* @__PURE__ */ jsx(ErrorDisplay, { dialog: "no_alert", faceExpression: "ashame" });
      }
      return /* @__PURE__ */ jsx(ErrorDisplay, { dialog: "unknown" });
    },
    children: /* @__PURE__ */ jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsx(Loader, {}), children: /* @__PURE__ */ jsx(WithSuspense, { api: priceTrackNotificationsAPI, component: PriceTrackNotifications }) })
  }
);
export {
  Disclaimer as D,
  ErrorBoundary as E,
  InfoWrapper as I,
  LoginPlaceHolderView as L,
  OptionSelect as O,
  PriceTrackConfigView$1 as P,
  SvgLogo as S,
  WithSuspense as W,
  PriceTrackNotificationsView as a,
  ErrorDisplay as b,
  useAppSelector as c,
  useDispatch as d,
  SvgConfusedinline as e,
  Provider as f,
  store as g,
  useAPI as h,
  styles$k as i,
  styles$j as j,
  styles$9 as k,
  logo$1 as l,
  useAppDispatch as m,
  ImageBox as n,
  IconTime as o,
  PriceShopSpec as p,
  SvgTrashinline as q,
  InlineOkCancel as r,
  styles$6 as s,
  PriceTrackInput as t,
  useAPIResource as u
};
