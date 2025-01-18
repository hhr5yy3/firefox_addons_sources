(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
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

      {
        typeOfVal = miniKindOf(val);
      }

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
        throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.');
      }

      if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
        enhancer = preloadedState;
        preloadedState = undefined;
      }

      if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
          throw new Error("Expected the enhancer to be a function. Instead, received: '" + kindOf(enhancer) + "'");
        }

        return enhancer(createStore)(reducer, preloadedState);
      }

      if (typeof reducer !== 'function') {
        throw new Error("Expected the root reducer to be a function. Instead, received: '" + kindOf(reducer) + "'");
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
          throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
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
          throw new Error("Expected the listener to be a function. Instead, received: '" + kindOf(listener) + "'");
        }

        if (isDispatching) {
          throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
        }

        var isSubscribed = true;
        ensureCanMutateNextListeners();
        nextListeners.push(listener);
        return function unsubscribe() {
          if (!isSubscribed) {
            return;
          }

          if (isDispatching) {
            throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
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
          throw new Error("Actions must be plain objects. Instead, the actual type was: '" + kindOf(action) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
        }

        if (typeof action.type === 'undefined') {
          throw new Error('Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
        }

        if (isDispatching) {
          throw new Error('Reducers may not dispatch actions.');
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
          throw new Error("Expected the nextReducer to be a function. Instead, received: '" + kindOf(nextReducer));
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
              throw new Error("Expected the observer to be an object. Instead, received: '" + kindOf(observer) + "'");
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
          throw new Error("The slice reducer for key \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
        }

        if (typeof reducer(undefined, {
          type: ActionTypes.PROBE_UNKNOWN_ACTION()
        }) === 'undefined') {
          throw new Error("The slice reducer for key \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle '" + ActionTypes.INIT + "' or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
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

        {
          if (typeof reducers[key] === 'undefined') {
            warning("No reducer provided for key \"" + key + "\"");
          }
        }

        if (typeof reducers[key] === 'function') {
          finalReducers[key] = reducers[key];
        }
      }

      var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
      // keys multiple times.

      var unexpectedKeyCache;

      {
        unexpectedKeyCache = {};
      }

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

        {
          var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

          if (warningMessage) {
            warning(warningMessage);
          }
        }

        var hasChanged = false;
        var nextState = {};

        for (var _i = 0; _i < finalReducerKeys.length; _i++) {
          var _key = finalReducerKeys[_i];
          var reducer = finalReducers[_key];
          var previousStateForKey = state[_key];
          var nextStateForKey = reducer(previousStateForKey, action);

          if (typeof nextStateForKey === 'undefined') {
            var actionType = action && action.type;
            throw new Error("When called with an action of type " + (actionType ? "\"" + String(actionType) + "\"" : '(unknown type)') + ", the slice reducer for key \"" + _key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.");
          }

          nextState[_key] = nextStateForKey;
          hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }

        hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
        return hasChanged ? nextState : state;
      };
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
            throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
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

    /*
     * This is a dummy function to check if the function name has been altered by minification.
     * If the function has been minified and NODE_ENV !== 'production', warn the user.
     */

    function isCrushed() {}

    if (typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
      warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
    }

    var Effect;
    (function (Effect) {
        function all(...effects) {
            return (store) => {
                const actionEffects = effects.map((eff) => eff(store));
                return (action) => {
                    actionEffects.forEach((eff) => {
                        eff(action);
                    });
                };
            };
        }
        Effect.all = all;
    })(Effect || (Effect = {}));
    const effectsMiddleware = (rootEffect) => (store) => {
        const eff = rootEffect(store);
        return (next) => (action) => {
            next(action);
            eff(action);
        };
    };

    var BackgroundActionType;
    (function (BackgroundActionType) {
        BackgroundActionType["QUOTES_SHOW_TOGGLE"] = "QUOTES_SHOW_TOGGLE";
        BackgroundActionType["QUOTES_BUILTIN_TOGGLE"] = "QUOTES_BUILTIN_TOGGLE";
        BackgroundActionType["QUOTE_HIDE"] = "QUOTE_HIDE";
        BackgroundActionType["QUOTE_SHOW"] = "QUOTE_SHOW";
        BackgroundActionType["QUOTE_HIDDEN_RESET"] = "QUOTE_HIDDEN_RESET";
        BackgroundActionType["QUOTE_DELETE"] = "QUOTE_DELETE";
        BackgroundActionType["QUOTE_ADD"] = "QUOTE_ADD";
        BackgroundActionType["FEATURE_INCREMENT"] = "FEATURE_INCREMENT";
        BackgroundActionType["SETTINGS_LOAD"] = "SETTINGS_LOAD";
        BackgroundActionType["SETTINGS_LOADED"] = "SETTINGS_LOADED";
        BackgroundActionType["PERMISSIONS_CHECK"] = "permissions/check";
        BackgroundActionType["PERMISSIONS_UPDATE"] = "permissions/update";
        BackgroundActionType["SITES_SET_STATE"] = "sites/set_state";
        BackgroundActionType["CONTENT_SCRIPTS_REGISTER"] = "content_scripts/register";
    })(BackgroundActionType || (BackgroundActionType = {}));

    function getBrowser() {
        var _a;
        if (typeof browser !== 'undefined') {
            return browser;
        }
        else if (typeof chrome !== 'undefined') {
            // Chrome uses callbacks instead of promises, so we promisify everything
            return {
                runtime: {
                    openOptionsPage: () => new Promise((resolve) => chrome.runtime.openOptionsPage(resolve)),
                    sendMessage: (m) => new Promise((resolve) => chrome.runtime.sendMessage(undefined, m, undefined, resolve)),
                    connect: chrome.runtime.connect.bind(chrome.runtime),
                    onConnect: chrome.runtime.onConnect,
                },
                action: chrome.action,
                permissions: {
                    getAll: () => new Promise((resolve) => { var _a; return (_a = chrome.permissions) === null || _a === void 0 ? void 0 : _a.getAll(resolve); }),
                    request: (p) => new Promise((resolve) => { var _a; return (_a = chrome.permissions) === null || _a === void 0 ? void 0 : _a.request(p, resolve); }),
                    remove: (p) => new Promise((resolve) => { var _a; return (_a = chrome.permissions) === null || _a === void 0 ? void 0 : _a.remove(p, resolve); }),
                },
                tabs: {
                    onUpdated: (_a = chrome.tabs) === null || _a === void 0 ? void 0 : _a.onUpdated,
                },
                scripting: chrome.scripting,
                storage: {
                    sync: {
                        get: (key) => new Promise((resolve) => {
                            chrome.storage.sync.get(key, resolve);
                        }),
                        set: chrome.storage.sync.set.bind(chrome.storage.sync),
                    },
                },
            };
        }
        else {
            throw new Error('Could not find WebExtension API');
        }
    }

    var MessageType;
    (function (MessageType) {
        MessageType[MessageType["OPTIONS_PAGE_OPEN"] = 0] = "OPTIONS_PAGE_OPEN";
        MessageType[MessageType["SETTINGS_ACTION"] = 1] = "SETTINGS_ACTION";
        MessageType[MessageType["SETTINGS_CHANGED"] = 2] = "SETTINGS_CHANGED";
    })(MessageType || (MessageType = {}));

    var instagramCss = "/* Instagram feed, stories, recommended accounts */\nhtml:not([data-nfe-enabled='false']) main > :not(#nfe-container) {\n\tdisplay: none;\n}\n\nhtml:not([data-nfe-enabled='false']) main > #nfe-container {\n\twidth: 100%;\n\tfont-size: 24px;\n\tpadding: 128px;\n}\n";

    var twitterCss = "/* Twitter */\nhtml:not([data-nfe-enabled='false'])\n\tdiv[data-testid='primaryColumn']\n\t> div:last-child\n\t> div:nth-child(4)\n\t> #nfe-container {\n\tpadding: 16px;\n}\n\nhtml:not([data-nfe-enabled='false']) div[aria-label*='Timeline'],\nhtml:not([data-nfe-enabled='false']) div[data-testid=\"primaryColumn\"] > div:last-child > div:last-child\n{\n\topacity: 0 !important;\n\tpointer-events: none !important;\n}\n\n/* \"What's Happening\" section on Twitter */\n[data-testid='sidebarColumn'] [role='region'] {\n\topacity: 0 !important;\n\tpointer-events: none !important;\n\theight: 0 !important;\n}\n";

    var githubCss = "/* GitHub Home (feed, footer links, change log ,explore repo) */\n\nhtml:not([data-nfe-enabled='false'])\n\taside[aria-label='Account']\n\t+ div\n\tdiv[role='contentinfo'],\nhtml:not([data-nfe-enabled='false'])\n\taside[aria-label='Account']\n\t+ div\n\taside[aria-label='Explore'] {\n\topacity: 0 !important;\n\tpointer-events: none !important;\n\theight: 0 !important;\n\toverflow-y: hidden !important;\n}\n\nhtml:not([data-nfe-enabled='false'])\n\taside[aria-label='Account']\n\t+ div\n\t#dashboard-feed-frame\n\t> :not(#nfe-container) {\n\tdisplay: none;\n\t/* fix Chrome not overflow:hidden with way above*/\n}\n\n/* addtional: stretch quote full width */\nhtml:not([data-nfe-enabled='false'])\n\taside[aria-label='Account']\n\t+ div\n\taside[aria-label='Explore'] {\n\twidth: 0 !important;\n}\n\nhtml:not([data-nfe-enabled='false'])\n\taside[aria-label='Account']\n\t+ div\n\t> [class*='d-'][class*='-flex']\n\t> :first-child {\n\twidth: 100% !important;\n}\n";

    const Sites = {
        facebook: {
            label: 'Facebook',
            domain: 'facebook.com',
            paths: [
                '/',
                '/home.php',
                '/watch',
                '/marketplace/',
                '/groups/feed/',
                '/gaming/feed/',
            ],
            origins: [
                'http://www.facebook.com/*',
                'https://www.facebook.com/*',
                'http://web.facebook.com/*',
                'https://web.facebook.com/*',
            ],
        },
        instagram: {
            label: 'Instagram',
            domain: 'instagram.com',
            paths: ['/'],
            origins: ['http://www.instagram.com/*', 'https://www.instagram.com/*'],
            css: instagramCss,
        },
        twitter: {
            label: 'Twitter/X',
            domain: 'x.com',
            paths: ['/home', '/compose/tweet'],
            origins: [
                'http://twitter.com/*',
                'https://twitter.com/*',
                'http://x.com/*',
                'https://x.com/*',
            ],
            css: twitterCss,
        },
        youtube: {
            label: 'YouTube',
            domain: 'youtube.com',
            paths: ['/', '/feed/trending'],
            origins: ['https://www.youtube.com/*'],
        },
        linkedin: {
            label: 'LinkedIn',
            domain: 'linkedin.com',
            paths: ['/', '/feed/'],
            origins: ['http://www.linkedin.com/*', 'https://www.linkedin.com/*'],
        },
        reddit: {
            label: 'Reddit',
            domain: 'reddit.com',
            paths: ['/', '/r/all/', '/r/popular/']
                .map((i) => [
                i + '',
                i + 'home/',
                i + 'hot/',
                i + 'new/',
                i + 'top/',
                i + 'rising/',
            ])
                .reduce((i, j) => i.concat(j)),
            origins: [
                'https://www.reddit.com/*',
                'http://www.reddit.com/*',
                'https://old.reddit.com/*',
                'http://old.reddit.com/*',
            ],
        },
        hackernews: {
            label: 'Y Combinator News (HN)',
            domain: 'news.ycombinator.com',
            paths: ['/', '/news'],
            origins: ['https://news.ycombinator.com/*'],
        },
        github: {
            label: 'Github',
            domain: 'github.com',
            paths: ['/', '/dashboard'],
            origins: ['https://github.com/*'],
            css: githubCss,
        },
    };

    var Settings;
    (function (Settings) {
        const defaults = {
            version: 1,
            showQuotes: true,
            builtinQuotesEnabled: true,
            featureIncrement: 0,
            hiddenBuiltinQuotes: [],
            customQuotes: [],
            sites: {},
        };
        Settings.defaultSites = () => {
            const sites = {};
            for (const siteId of Object.keys(Sites)) {
                sites[siteId] = { type: SiteStateTag.CHECK_PERMISSIONS };
            }
            return sites;
        };
        let SiteStateTag;
        (function (SiteStateTag) {
            SiteStateTag["ENABLED"] = "enabled";
            SiteStateTag["CHECK_PERMISSIONS"] = "check_permissions";
            SiteStateTag["DISABLED"] = "disabled";
            SiteStateTag["DISABLED_TEMPORARILY"] = "disabled_temporarily";
        })(SiteStateTag = Settings.SiteStateTag || (Settings.SiteStateTag = {}));
        function load() {
            return __awaiter(this, void 0, void 0, function* () {
                return getBrowser()
                    .storage.sync.get(null)
                    .then((settings) => (Object.assign(Object.assign({}, defaults), settings)));
            });
        }
        Settings.load = load;
        function save(settings) {
            return __awaiter(this, void 0, void 0, function* () {
                return getBrowser().storage.sync.set(Object.assign(Object.assign({}, defaults), settings));
            });
        }
        Settings.save = save;
    })(Settings || (Settings = {}));

    var config = {
        newFeatureIncrement: 1,
    };

    const getPermissions = () => __awaiter(void 0, void 0, void 0, function* () {
        return getBrowser().permissions.getAll();
    });
    const checkPermissions = (store) => (action) => __awaiter(void 0, void 0, void 0, function* () {
        if (action.type === BackgroundActionType.PERMISSIONS_CHECK) {
            const permissions = yield getPermissions();
            store.dispatch({
                type: BackgroundActionType.PERMISSIONS_UPDATE,
                permissions,
            });
        }
    });
    const sitesEffect = Effect.all(checkPermissions);

    var SiteStatusTag;
    (function (SiteStatusTag) {
        SiteStatusTag[SiteStatusTag["ENABLED"] = 0] = "ENABLED";
        SiteStatusTag[SiteStatusTag["NEEDS_NEW_PERMISSIONS"] = 1] = "NEEDS_NEW_PERMISSIONS";
        SiteStatusTag[SiteStatusTag["DISABLED"] = 2] = "DISABLED";
        SiteStatusTag[SiteStatusTag["DISABLED_TEMPORARILY"] = 3] = "DISABLED_TEMPORARILY";
    })(SiteStatusTag || (SiteStatusTag = {}));
    function getSettingsHealth(state) {
        let atLeastOneSiteEnabled = false;
        let sitesNeedingPermissions = 0;
        const siteStatus = getSiteStatus(state);
        Object.keys(siteStatus).forEach((id) => {
            const s = siteStatus[id];
            if (s.type === SiteStatusTag.NEEDS_NEW_PERMISSIONS ||
                s.type === SiteStatusTag.DISABLED_TEMPORARILY ||
                s.type === SiteStatusTag.ENABLED) {
                atLeastOneSiteEnabled = true;
            }
            if (s.type === SiteStatusTag.NEEDS_NEW_PERMISSIONS) {
                sitesNeedingPermissions += 1;
            }
        });
        return {
            noSitesEnabled: !atLeastOneSiteEnabled,
            sitesNeedingPermissions,
        };
    }
    var Record;
    (function (Record) {
        function map(record, mapper) {
            const out = {};
            for (const key of Object.keys(record)) {
                out[key] = mapper(key, record[key]);
            }
            return out;
        }
        Record.map = map;
    })(Record || (Record = {}));
    /*
     * Combines the explicit user settings with the granted permissions to work
     * out whether anything needs updating
     */
    function getSiteStatus(state) {
        return Record.map(state.sites, (key, siteState) => {
            if (siteState.type === Settings.SiteStateTag.DISABLED) {
                return { type: SiteStatusTag.DISABLED };
            }
            // How many origins do we have permission for?
            const site = Sites[key];
            const { origins } = state.permissions;
            const grantedOrigins = site.origins.filter((origin) => origins.indexOf(origin) !== -1);
            switch (siteState.type) {
                case Settings.SiteStateTag.ENABLED:
                    // Explicitly enabled - make sure permissions are there
                    if (grantedOrigins.length === site.origins.length) {
                        return { type: SiteStatusTag.ENABLED };
                    }
                    return { type: SiteStatusTag.NEEDS_NEW_PERMISSIONS };
                case Settings.SiteStateTag.CHECK_PERMISSIONS:
                    // Not explicitly set, check the permissions instead to determine if enabled
                    if (grantedOrigins.length === site.origins.length) {
                        return { type: SiteStatusTag.ENABLED };
                    }
                    else if (grantedOrigins.length > 0) {
                        return { type: SiteStatusTag.NEEDS_NEW_PERMISSIONS };
                    }
                    return { type: SiteStatusTag.DISABLED };
                case Settings.SiteStateTag.DISABLED_TEMPORARILY:
                    // Disable temporarily only - make sure permissions are there
                    if (grantedOrigins.length === site.origins.length) {
                        if (siteState.disabled_until > Date.now()) {
                            return {
                                type: SiteStatusTag.DISABLED_TEMPORARILY,
                                until: siteState.disabled_until,
                            };
                        }
                        else {
                            return { type: SiteStatusTag.ENABLED };
                        }
                    }
                    return { type: SiteStatusTag.NEEDS_NEW_PERMISSIONS };
            }
        });
    }

    const getSettings = (state) => {
        return {
            version: 1,
            showQuotes: state.showQuotes,
            builtinQuotesEnabled: state.builtinQuotesEnabled,
            featureIncrement: state.featureIncrement,
            hiddenBuiltinQuotes: state.hiddenBuiltinQuotes,
            customQuotes: state.customQuotes,
            sites: state.sites,
        };
    };
    /**
     * Listen for content scripts
     */
    const listen = (store) => {
        const browser = getBrowser();
        let pages = [];
        browser.runtime.onConnect.addListener((port) => {
            pages.push(port);
            const state = store.getState();
            // Send the new client the latest settings
            if (state.ready === true) {
                const settings = state.settings;
                port.postMessage({ t: MessageType.SETTINGS_CHANGED, settings });
            }
            // Remove the port when it closes
            port.onDisconnect.addListener(() => (pages = pages.filter((p) => p !== port)));
            port.onMessage.addListener((msg) => {
                if (msg.t === MessageType.SETTINGS_ACTION) {
                    store.dispatch(msg.action);
                }
                if (msg.t === MessageType.OPTIONS_PAGE_OPEN) {
                    browser.runtime.openOptionsPage().catch((e) => console.error(e));
                }
            });
        });
        // Then, after every store action we save the settings and
        // let all the clients know the new settings
        return () => {
            const state = store.getState();
            // Send the new client the latest settings
            if (state.ready === true) {
                const settings = state.settings;
                Settings.save(getSettings(state.settings));
                pages.forEach((port) => port.postMessage({ t: MessageType.SETTINGS_CHANGED, settings }));
            }
        };
    };
    function areNewFeaturesAvailable(state) {
        return config.newFeatureIncrement > state.featureIncrement;
    }
    const loadSettings = (store) => (action) => __awaiter(void 0, void 0, void 0, function* () {
        if (action.type === BackgroundActionType.SETTINGS_LOAD) {
            const [settings, permissions] = yield Promise.all([
                Settings.load(),
                getPermissions(),
            ]);
            const sites = {};
            // For any sites that don't yet exist in the settings,
            // add a note to look at the permissions as the source of
            // truth instead
            for (const key of Object.keys(Sites)) {
                sites[key] =
                    settings.sites[key] != null
                        ? settings.sites[key]
                        : { type: Settings.SiteStateTag.CHECK_PERMISSIONS };
            }
            const state = {
                showQuotes: settings.showQuotes,
                builtinQuotesEnabled: settings.builtinQuotesEnabled,
                featureIncrement: settings.featureIncrement,
                hiddenBuiltinQuotes: settings.hiddenBuiltinQuotes,
                customQuotes: settings.customQuotes,
                sites,
                permissions,
            };
            store.dispatch({
                type: BackgroundActionType.SETTINGS_LOADED,
                settings: state,
            });
            const newFeaturesAvailable = areNewFeaturesAvailable(state);
            const settingsHealth = getSettingsHealth(state);
            // Show the options page at startup if something needs addressing
            if (settingsHealth.noSitesEnabled ||
                settingsHealth.sitesNeedingPermissions >= 1 ||
                newFeaturesAvailable) {
                getBrowser().runtime.openOptionsPage();
            }
            store.dispatch({ type: BackgroundActionType.CONTENT_SCRIPTS_REGISTER });
        }
    });
    const registerContentScripts = (store) => (action) => __awaiter(void 0, void 0, void 0, function* () {
        if (action.type === BackgroundActionType.CONTENT_SCRIPTS_REGISTER) {
            const browser = getBrowser();
            yield browser.scripting.unregisterContentScripts();
            browser.scripting.registerContentScripts([{
                    id: 'intercept',
                    js: ['intercept.js'],
                    css: ['eradicate.css'],
                    matches: ['https://news.ycombinator.com/*'],
                    runAt: 'document_start',
                }]);
        }
    });
    const logAction = (store) => (action) => __awaiter(void 0, void 0, void 0, function* () {
        console.info(action);
    });
    const rootEffect = Effect.all(listen, loadSettings, sitesEffect, registerContentScripts, logAction);

    function showQuotes(state = true, action) {
        switch (action.type) {
            case BackgroundActionType.QUOTES_SHOW_TOGGLE:
                return !state;
        }
        return state;
    }
    function builtinQuotesEnabled(state = true, action) {
        switch (action.type) {
            case BackgroundActionType.QUOTES_BUILTIN_TOGGLE:
                return !state;
        }
        return state;
    }
    function featureIncrement(state = 0, action) {
        switch (action.type) {
            case BackgroundActionType.FEATURE_INCREMENT:
                return config.newFeatureIncrement;
        }
        return state;
    }
    function hiddenBuiltinQuotes(state = [], action) {
        switch (action.type) {
            case BackgroundActionType.QUOTE_SHOW:
                if (action.id == null)
                    return state;
                if (typeof action.id !== 'number')
                    throw new Error('id must be numeric');
                return state.filter((q) => q !== action.id);
            case BackgroundActionType.QUOTE_HIDE:
                if (action.id == null)
                    return state;
                if (typeof action.id !== 'number')
                    throw new Error('id must be numeric');
                return state.concat([action.id]);
            case BackgroundActionType.QUOTE_HIDDEN_RESET:
                return [];
        }
        return state;
    }
    function customQuotes(state = [], action) {
        switch (action.type) {
            case BackgroundActionType.QUOTE_ADD:
                return state.concat([
                    {
                        id: action.id,
                        text: action.text,
                        source: action.source,
                    },
                ]);
            case BackgroundActionType.QUOTE_DELETE:
                if (action.id == null)
                    return state;
                return state.filter((quote) => quote.id !== action.id);
        }
        return state;
    }
    function permissions(state, action) {
        switch (action.type) {
            case BackgroundActionType.PERMISSIONS_UPDATE:
                return action.permissions;
        }
        return state || { permissions: [], origins: [] };
    }
    function sites(state = Settings.defaultSites(), action) {
        switch (action.type) {
            case BackgroundActionType.SITES_SET_STATE:
                return Object.assign(Object.assign({}, state), { [action.siteId]: action.state });
        }
        return state || {};
    }
    const settingsReducer = combineReducers({
        showQuotes,
        builtinQuotesEnabled,
        featureIncrement,
        hiddenBuiltinQuotes,
        customQuotes,
        sites,
        permissions,
    });
    var rootReducer = (state, action) => {
        // We can't do anything until the initial settings have been loaded,
        if (action.type === BackgroundActionType.SETTINGS_LOADED) {
            return { ready: true, settings: action.settings };
        }
        else if (state == null || state.ready === false) {
            return { ready: false };
        }
        else if (state.ready === true) {
            return {
                ready: true,
                settings: settingsReducer(state.settings, action),
            };
        }
        return state;
    };

    function createBackgroundStore() {
        const store = createStore(rootReducer, { ready: false }, applyMiddleware(effectsMiddleware(rootEffect)));
        store.dispatch({ type: BackgroundActionType.SETTINGS_LOAD });
        return store;
    }

    createBackgroundStore();
    const browser$1 = getBrowser();
    browser$1.action.onClicked.addListener(() => {
        browser$1.runtime.openOptionsPage();
    });
    const onTabChange = (tabId) => __awaiter(void 0, void 0, void 0, function* () {
        // // Ensures we're only running this listener once per tab simultaneously
        // if (tabMutex.has(tabId)) return;
        // tabMutex.add(tabId);
        //
        // try {
        // 	// Check first if the script has already been injected
        // 	const injectInfo = await (getBrowser().scripting.executeScript({
        // 		target: { tabId },
        // 		func: () => ({ host: window.location.host, loaded: document['nfeScriptsInjected'] || false }),
        // 		injectImmediately: true,
        // 	}) as Promise<{ result: { host: string; loaded: boolean } }[]>);
        //
        // 	console.info(injectInfo);
        //
        // 	if (
        // 		injectInfo != null &&
        // 		injectInfo[0] != null &&
        // 		injectInfo[0].result.loaded !== true
        // 	) {
        // 		// Inject them scripts (and CSS)
        // 		browser.scripting.insertCSS({
        // 			target: { tabId },
        // 			files: ['eradicate.css'],
        // 		});
        //
        // 		// Site specific CSS
        // 		for (let siteKey in Sites) {
        // 			const site = Sites[siteKey];
        // 			if (injectInfo[0].result.host.endsWith(site.domain)) {
        // 				const css = site.css;
        // 				if (css != null) {
        // 					browser.scripting.insertCSS({
        // 						target: { tabId },
        // 						css
        // 					});
        // 				}
        // 			}
        // 		}
        //
        // 		browser.scripting.executeScript({ target: { tabId }, files: ['intercept.js'], injectImmediately: true });
        // 		await browser.scripting.executeScript({
        // 			target: { tabId },
        // 			func: () => { document['nfeScriptsInjected'] = true },
        // 			injectImmediately: true,
        // 		});
        // 	} else {
        // 		// already injected or unavailable
        // 	}
        // } finally {
        // 	tabMutex.delete(tabId);
        // }
    });
    browser$1.tabs.onUpdated.addListener(onTabChange);

})();
