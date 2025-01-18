/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 196:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// https://github.com/bfred-it/webext-detect-page
Object.defineProperty(exports, "__esModule", ({ value: true }));
function isBackgroundPage() {
    return location.pathname === '/_generated_background_page.html' &&
        !location.protocol.startsWith('http') &&
        Boolean(typeof chrome === 'object' && chrome.runtime);
}
exports.isBackgroundPage = isBackgroundPage;
function isContentScript() {
    return location.protocol.startsWith('http') &&
        Boolean(typeof chrome === 'object' && chrome.runtime);
}
exports.isContentScript = isContentScript;
function isOptionsPage() {
    if (typeof chrome !== 'object' || !chrome.runtime) {
        return false;
    }
    const { options_ui } = chrome.runtime.getManifest();
    if (typeof options_ui !== 'object' || typeof options_ui.page !== 'string') {
        return false;
    }
    const url = new URL(options_ui.page, location.origin);
    return url.pathname === location.pathname &&
        url.origin === location.origin;
}
exports.isOptionsPage = isOptionsPage;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 525:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const webext_detect_page_1 = __webpack_require__(196);
class OptionsSync {
    /**
    @constructor Returns an instance linked to the chosen storage.
    @param options - Configuration to determine where options are stored.
    */
    constructor(options) {
        const fullOptions = {
            // https://github.com/bfred-it/webext-options-sync/pull/21#issuecomment-500314074
            // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
            defaults: {},
            storageName: 'options',
            migrations: [],
            logging: true,
            ...options
        };
        this.storageName = fullOptions.storageName;
        this.defaults = fullOptions.defaults;
        if (fullOptions.logging === false) {
            this._log = () => { };
        }
        if (webext_detect_page_1.isBackgroundPage()) {
            chrome.management.getSelf(({ installType }) => {
                // Chrome doesn't run `onInstalled` when launching the browser with a pre-loaded development extension #25
                if (installType === 'development') {
                    this._applyDefinition(fullOptions);
                }
                else {
                    chrome.runtime.onInstalled.addListener(() => this._applyDefinition(fullOptions));
                }
            });
        }
        this._handleFormUpdatesDebounced = this._handleFormUpdatesDebounced.bind(this);
    }
    _log(method, ...args) {
        console[method](...args);
    }
    async _applyDefinition(defs) {
        const options = { ...defs.defaults, ...await this.getAll() };
        this._log('group', 'Appling definitions');
        this._log('info', 'Current options:', options);
        if (defs.migrations && defs.migrations.length > 0) {
            this._log('info', 'Running', defs.migrations.length, 'migrations');
            defs.migrations.forEach(migrate => migrate(options, defs.defaults));
        }
        this._log('info', 'Migrated options:', options);
        this._log('groupEnd');
        this.setAll(options);
    }
    _parseNumbers(options) {
        for (const name of Object.keys(options)) {
            if (options[name] === String(Number(options[name]))) {
                // @ts-ignore it will be dropped in #13
                options[name] = Number(options[name]);
            }
        }
        return options;
    }
    /**
    Retrieves all the options stored.

    @returns Promise that will resolve with **all** the options stored, as an object.

    @example

    new OptionsSync().getAll().then(options => {
        console.log('The user’s options are', options);
        if (options.color) {
            document.body.style.color = color;
        }
    });
    */
    async getAll() {
        const keys = await new Promise((resolve, reject) => {
            chrome.storage.sync.get({
                [this.storageName]: this.defaults
            }, result => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                }
                else {
                    resolve(result);
                }
            });
        });
        return this._parseNumbers(keys[this.storageName]);
    }
    /**
    Overrides **all** the options stored with your `options`.

    @param newOptions - A map of default options as strings or booleans. The keys will have to match the form fields' `name` attributes.
    */
    async setAll(newOptions) {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set({
                [this.storageName]: newOptions
            }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                }
                else {
                    resolve();
                }
            });
        });
    }
    /**
    Merges new options with the existing stored options.

    @param newOptions - A map of default options as strings or booleans. The keys will have to match the form fields' `name` attributes.
    */
    async set(newOptions) {
        return this.setAll({ ...await this.getAll(), ...newOptions });
    }
    /**
    Any defaults or saved options will be loaded into the `<form>` and any change will automatically be saved via `chrome.storage.sync`.

    @param selector - The `<form>` that needs to be synchronized or a CSS selector (one element).
    The form fields' `name` attributes will have to match the option names.
    */
    async syncForm(form) {
        const element = form instanceof HTMLFormElement ?
            form :
            document.querySelector(form);
        element.addEventListener('input', this._handleFormUpdatesDebounced);
        element.addEventListener('change', this._handleFormUpdatesDebounced);
        chrome.storage.onChanged.addListener((changes, namespace) => {
            if (namespace === 'sync' &&
                changes[this.storageName] &&
                !element.contains(document.activeElement) // Avoid applying changes while the user is editing a field
            ) {
                this._applyToForm(changes[this.storageName].newValue, element);
            }
        });
        this._applyToForm(await this.getAll(), element);
    }
    _applyToForm(options, form) {
        this._log('group', 'Updating form');
        for (const name of Object.keys(options)) {
            const els = form.querySelectorAll(`[name="${CSS.escape(name)}"]`);
            const [field] = els;
            if (field) {
                this._log('info', name, ':', options[name]);
                switch (field.type) {
                    case 'checkbox':
                        field.checked = options[name];
                        break;
                    case 'radio': {
                        const [selected] = [...els].filter(el => el.value === options[name]);
                        if (selected) {
                            selected.checked = true;
                        }
                        break;
                    }
                    default:
                        field.value = options[name];
                        break;
                }
                field.dispatchEvent(new InputEvent('input'));
            }
            else {
                this._log('warn', 'Stored option {', name, ':', options[name], '} was not found on the page');
            }
        }
        this._log('groupEnd');
    }
    _handleFormUpdatesDebounced({ target }) {
        if (this._timer) {
            clearTimeout(this._timer);
        }
        this._timer = setTimeout(() => {
            this._handleFormUpdates(target);
            this._timer = undefined;
        }, 600);
    }
    _handleFormUpdates(el) {
        const { name } = el;
        let { value } = el;
        if (!name || !el.validity.valid) {
            return;
        }
        switch (el.type) {
            case 'select-one':
                value = el.options[el.selectedIndex].value;
                break;
            case 'checkbox':
                value = el.checked;
                break;
            default: break;
        }
        this._log('info', 'Saving option', el.name, 'to', value);
        // @ts-ignore `name` should be a keyof TOptions but it's a plain string, so it fails
        this.set({
            [name]: value
        });
    }
}
OptionsSync.migrations = {
    /**
    Helper method that removes any option that isn't defined in the defaults. It's useful to avoid leaving old options taking up space.
    */
    removeUnused(options, defaults) {
        for (const key of Object.keys(options)) {
            if (!(key in defaults)) {
                delete options[key];
            }
        }
    }
};
module.exports = OptionsSync;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var mod; }
})(this, function (module) {
  /* webextension-polyfill - v0.4.0 - Wed Feb 06 2019 11:58:31 */
  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */
  /* vim: set sts=2 sw=2 et tw=80: */
  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (typeof browser === "undefined" || Object.getPrototypeOf(browser) !== Object.prototype) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
    const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)";

    // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.
    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getBrowserInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };

      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }

      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */
      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }

        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }

          return super.get(key);
        }
      }

      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */
      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };

      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.rejection
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {integer} metadata.maxResolvedArgs
       *        The maximum number of arguments which may be passed to the
       *        callback created by the wrapped async function.
       *
       * @returns {function}
       *        The generated callback function.
       */
      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(extensionAPIs.runtime.lastError);
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };

      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";

      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxResolvedArgs
       *        The maximum number of arguments which may be passed to the
       *        callback created by the wrapped async function.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */
      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }

          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }

          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({ resolve, reject }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);

                target[name](...args);

                // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.
                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;

                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({ resolve, reject }, metadata));
            }
          });
        };
      };

      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */
      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }
        });
      };

      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);

      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */
      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return prop in target || prop in cache;
          },

          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }

            if (!(prop in target)) {
              return undefined;
            }

            let value = target[prop];

            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.

              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,
                get() {
                  return target[prop];
                },
                set(value) {
                  target[prop] = value;
                }
              });

              return value;
            }

            cache[prop] = value;
            return value;
          },

          set(proxyTarget, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }
            return true;
          },

          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },

          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }
        };

        // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        //
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.
        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };

      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */
      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },

        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },

        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }
      });

      // Keep track if the deprecation warning has been logged at least once.
      let loggedSendResponseDeprecationWarning = false;

      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }

        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */
        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;

          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              if (!loggedSendResponseDeprecationWarning) {
                console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
                loggedSendResponseDeprecationWarning = true;
              }
              didCallSendResponse = true;
              resolve(response);
            };
          });

          let result;
          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }

          const isResultThenable = result !== true && isThenable(result);

          // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.
          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          }

          // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).
          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;
              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }

              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          };

          // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.
          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          }

          // Let Chrome know that the listener is replying.
          return true;
        };
      });

      const wrappedSendMessageCallback = ({ reject, resolve }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(extensionAPIs.runtime.lastError);
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };

      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }

        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }

        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, { resolve, reject });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };

      const staticWrappers = {
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", { minArgs: 1, maxArgs: 3 })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", { minArgs: 2, maxArgs: 3 })
        }
      };
      const settingMetadata = {
        clear: { minArgs: 1, maxArgs: 1 },
        get: { minArgs: 1, maxArgs: 1 },
        set: { minArgs: 1, maxArgs: 1 }
      };
      apiMetadata.privacy = {
        network: {
          networkPredictionEnabled: settingMetadata,
          webRTCIPHandlingPolicy: settingMetadata
        },
        services: {
          passwordSavingEnabled: settingMetadata
        },
        websites: {
          hyperlinkAuditingEnabled: settingMetadata,
          referrersEnabled: settingMetadata
        }
      };

      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    };

    // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.
    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = browser;
  }
});
//# sourceMappingURL=browser-polyfill.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/webextension-polyfill/dist/browser-polyfill.js
var browser_polyfill = __webpack_require__(150);
var browser_polyfill_default = /*#__PURE__*/__webpack_require__.n(browser_polyfill);
;// CONCATENATED MODULE: ./source/helpers.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var helpers_log = function log() {
  var _console;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return  false && 0;
};
var extractDomain = function extractDomain(url) {
  return url.split('/')[~url.indexOf("://") ? 2 : 0].split(':')[0].split('#')[0].split('?')[0];
};
var extractBaseDomain = function extractBaseDomain(url) {
  var domainParts = extractDomain(url).split('.').reverse();
  return "".concat(domainParts[1] ? domainParts[1] + '.' : '').concat(domainParts[0]);
};
var createAndResolvePromise = function createAndResolvePromise(data) {
  return new Promise(function (resolve) {
    resolve(data);
  });
};
var helpers_createEl = function createEl(tag, className) {
  var attributes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var el = document.createElement(tag);
  className && el.classList.add(className);
  Object.keys(attributes).forEach(function (k) {
    return el[k] = attributes[k];
  });
  return el;
};
var isSafari = function isSafari() {
  return browser_polyfill_default().runtime.getURL('frame.html').includes('safari-web-extension://');
};
var isFF = function isFF() {
  return browser_polyfill_default().runtime.getURL('frame.html').includes('moz-extension://');
};
var injectNimbleAgent = function injectNimbleAgent() {
  var NimbleAgentFrame = document.createElement('iframe');
  NimbleAgentFrame.src = browser_polyfill_default().runtime.getURL('nimble-agent-frame.html');
  [['position', 'fixed'], ['top', '-10000px'], ['left', '-10000px'], ['width', '1px'], ['hegiht', '1px'], ['opacity', '0']].forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        p = _ref2[0],
        v = _ref2[1];

    return NimbleAgentFrame.style[p] = v;
  });
  window.document.body.appendChild(NimbleAgentFrame);
};
var parsersPattenrs = [{
  parser: 'facebook',
  patterns: [new RegExp('^(?:http:\/\/|https:\/\/)?(?:.+)?facebook\.com\/(.[^\/]+)(\/?(.[^\/]+))\/?$', 'i'), new RegExp('^(?:http://|https://)?(?:.+)?facebook\\.com/[^/\\?]+\\?(.*ref)=(.+)$', 'i'), new RegExp('^(?:http://|https://)?(?:.+)?facebook\\.com/profile\\.php\\?id=[0-9]*', 'i'), new RegExp('^(?:http://|https://)?(?:.+)?facebook\\.com/people/(.*)', 'i')]
}, {
  parser: 'angellist',
  patterns: [new RegExp('^(?:http://|https://)?(?:www\\.)?angel\\.co/(.[^/]+)$', 'i'), new RegExp('^(?:http://|https://)?(?:www\\.)?angel\\.co/company/(.[^/]+)$', 'i')]
}, {
  parser: 'crunchbase',
  patterns: [/^(?:http:\/\/|https:\/\/)?(?:www\.)?crunchbase\.com\/(organization|person)\/[\w\-]+.*$/i]
}, {
  parser: 'foursquare',
  patterns: [new RegExp('^(?:http://|https://)?(?:.+)?foursquare\\.com/user/[0-9]+(#.+)?$', 'i'), new RegExp('^(?:http://|https://)?(?:.+)?foursquare\\.com/(\\w+)(#.+)?$', 'i')]
}, {
  parser: 'gmail',
  patterns: [new RegExp('^(?:https://)?(?:.+)?google\\.com/mail/u/[0-9]/(.+)/[a-z0-9]{16}', 'i'), new RegExp('^https\:\/\/.*\.(google\.com\/mail)', 'i')]
}, {
  parser: 'googlecalendar',
  patterns: [new RegExp('^(?:https://)?(?:.+)?google\\.com/calendar(.+)render(.+)', 'i'), new RegExp('^(?:https://)?(?:.+)?calendar\\.google\\.com/(.+)', 'i')]
}, {
  parser: 'instagram',
  patterns: [new RegExp('^(?:http://|https://)?(?:www\\.)?instagram\\.com/(.+)/?$', 'i')]
}, {
  parser: 'intercom',
  patterns: [new RegExp('^(?:http://|https://)?app.intercom\\.io/(\\w+/)?apps/(\\w+)/users/(\\w+)', 'i'), new RegExp('^(?:http://|https://)?app.intercom\\.io/(\\w+/)?apps/(\\w+)/companies/(\\w+)/users', 'i')]
}, {
  parser: 'klout',
  patterns: [new RegExp('^(?:http://|https://)?(?:\\w+\\.)?klout\\.com/user/(.[^/]+)$', 'i'), new RegExp('^(?:http://|https://)?(?:\\w+\\.)?klout\\.com/(.[^/]+)$', 'i'), new RegExp('^(?:http://|https://)?(?:\\w+\\.)?klout\\.com/#/(.[^/]+)$', 'i'), new RegExp('^(?:http://|https://)?(?:\\w+\\.)?klout\\.com/#/user/(.[^/]+)$', 'i')]
}, {
  parser: 'salesforce',
  patterns: [new RegExp('^(?:http://|https://)?(?:\\w+\\.)?salesforce\\.com/(\\w+)$', 'i')]
}, {
  parser: 'twitter',
  patterns: [new RegExp('^(?:http://|https://)?(?:www\\.)?twitter\\.com/@?(\\w+)(/\\w*)?(\\?[\\w|=|%]*)?$', 'i'), new RegExp('^@(\\w){1,15}$', 'i')]
}, {
  parser: 'pitneybowes',
  patterns: [new RegExp('^(?:http://|https://)?(?:www\\.)?(sending\\.us\\.)?pitneybowes\\.com/addressbook?$', 'i'), new RegExp('^@(\\w){1,15}$', 'i')]
}, {
  parser: 'outlook',
  patterns: [new RegExp('^(?:http://|https://)?outlook\.(office|office365|live)\.com\/(.+)$', 'i')]
}, {
  parser: 'msdynamicscrm',
  patterns: [new RegExp('^(?:http://|https://)?(.*)?\\.dynamics\\.com/(.+)$', 'i')]
}, {
  parser: 'skype',
  patterns: [new RegExp('^(?:http://|https://)?web\.skype\.com(.+)$', 'i')]
}, {
  parser: 'employersindeed',
  patterns: [new RegExp('^(?:http://|https://)?employers.indeed.com/c#candidates/view\\?id=(.*)$', 'i')]
}, {
  parser: 'linkedin',
  patterns: [new RegExp('^(?:http://|https://)?www.linkedin.com/in/(.*)$', 'i'), new RegExp('^(?:http://|https://)?www.linkedin.com/company/(.*)$', 'i')]
}];
var findParser = function findParser(url) {
  var parser = parsersPattenrs.find(function (item) {
    return item.patterns.some(function (pattern) {
      return pattern.test(url);
    });
  });
  return parser ? parser.parser : null;
};
var ajax = function () {
  var xmlRe = /^(?:application|text)\/xml/;
  var jsonRe = /^application\/json/;

  var getData = function getData(accepts, xhr) {
    if (accepts == null) accepts = xhr.getResponseHeader('content-type');

    if (xmlRe.test(accepts)) {
      return xhr.responseXML;
    } else if (jsonRe.test(accepts) && xhr.responseText !== '') {
      return JSON.parse(xhr.responseText);
    }

    return xhr.responseText;
  };

  var isValid = function isValid(xhr) {
    return xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 || xhr.status === 0 && window.location.protocol === 'file:';
  };

  var proxyPromise = function proxyPromise(xhr, promise) {
    if (!promise) return;
    var props = ['readyState', 'status', 'statusText', 'responseText', 'responseXML', 'setRequestHeader', 'getAllResponseHeaders', 'getResponseHeader', 'statusCode', 'abort'];

    for (var i = 0; i < props.length; i++) {
      var prop = props[i];

      try {
        promise[prop] = typeof xhr[prop] === 'function' ? xhr[prop].bind(xhr) : xhr[prop];
      } catch (e) {
        console.log(e);
      }
    }

    return promise;
  };

  var end = function end(xhr, options, promise, resolve, reject) {
    return function () {
      proxyPromise(xhr, promise);
      if (xhr.readyState !== 4) return;
      var status = xhr.status;
      var data = getData(options.headers && options.headers.Accept, xhr); // Check for validity.

      if (isValid(xhr)) {
        if (options.success) options.success(data);
        if (resolve) resolve(data);
      } else {
        if (jsonRe.test(xhr.getResponseHeader('Content-Type'))) {
          try {
            xhr.responseJSON = JSON.parse(xhr.responseText);
          } catch (e) {
            xhr.responseJSON = {};
            console.error('Error when parsing JSON, set responseJSON to {}', e);
          }
        }

        var error = new Error("Server responded with a status of ".concat(status));
        if (options.error) options.error(xhr, status, error);
        if (reject) reject(xhr);
      }
    };
  };

  return function (setOptions) {
    if (setOptions == null) throw new Error('You must provide options');

    var options = _objectSpread({}, setOptions);

    if (options.type == null) options.type = 'GET';
    options.method && (options.type = options.method); // Need for old api support. Must be changed to application/json.

    if (options.headers == null) options.headers = {};
    options.headers['Content-Type'] = options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
    var resolve;
    var reject;
    var xhr = new XMLHttpRequest();
    var PromiseFn = ajax.Promise || typeof Promise !== 'undefined' && Promise;
    var promise = PromiseFn && new PromiseFn(function (res, rej) {
      resolve = res;
      reject = rej;
    });

    var getUrlEncodedQuery = function getUrlEncodedQuery() {
      var query = '';

      var stringifyKeyValuePair = function stringifyKeyValuePair(key, value) {
        return value == null ? '' : "&".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(value));
      };

      Object.keys(options.data).forEach(function (key) {
        query += stringifyKeyValuePair(key, options.data[key]);
      });
      return query.substring(1);
    }; // Stringify GET query params.


    if (options.type === 'GET' && _typeof(options.data) === 'object') {
      var query = getUrlEncodedQuery();

      if (query) {
        var sep = options.url.indexOf('?') === -1 ? '?' : '&';
        options.url += sep + query;
      }
    }

    if (options.type === 'POST' && _typeof(options.data) === 'object' && options.headers['Content-Type'] === 'application/x-www-form-urlencoded; charset=UTF-8') {
      options.data = getUrlEncodedQuery();
    }

    xhr.onreadystatechange = end(xhr, options, promise, resolve, reject); // eslint-disable-next-line security/detect-non-literal-fs-filename

    xhr.open(options.type, options.url, options.async !== false);

    if (!(options.headers && options.headers.Accept)) {
      var allTypes = '*/'.concat('*');
      var xhrAccepts = {
        '*': allTypes,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript'
      };
      xhr.setRequestHeader('Accept', options.dataType && xhrAccepts[options.dataType] ? xhrAccepts[options.dataType] + (options.dataType !== '*' ? ", ".concat(allTypes, "; q=0.01") : '') : xhrAccepts['*']);
    }

    if (options.headers) {
      Object.keys(options.headers).forEach(function (key) {
        return xhr.setRequestHeader(key, options.headers[key]);
      });
    }

    if (options.beforeSend) options.beforeSend(xhr);
    xhr.send(options.data);
    options.originalXhr = xhr;
    proxyPromise(xhr, promise);
    return promise || xhr;
  };
}();
// EXTERNAL MODULE: ./node_modules/webext-options-sync/index.js
var webext_options_sync = __webpack_require__(525);
var webext_options_sync_default = /*#__PURE__*/__webpack_require__.n(webext_options_sync);
;// CONCATENATED MODULE: ./source/options-storage.js

/* harmony default export */ const options_storage = (new (webext_options_sync_default())({
  defaults: {
    gmailSidebarEnabled: false,
    // gmailIntegrationEnabled: false,
    endpoint: 'https://app.nimble.com'
  },
  migrations: [(webext_options_sync_default()).migrations.removeUnused],
  logging: true
}));
;// CONCATENATED MODULE: ./source/gmail/index.js
function gmail_slicedToArray(arr, i) { return gmail_arrayWithHoles(arr) || gmail_iterableToArrayLimit(arr, i) || gmail_unsupportedIterableToArray(arr, i) || gmail_nonIterableRest(); }

function gmail_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function gmail_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function gmail_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || gmail_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function gmail_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return gmail_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return gmail_arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return gmail_arrayLikeToArray(arr); }

function gmail_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var INBOX_SDK_ID = 'sdk_nimble_8977b8da60';

var sendMessageToExtension = function sendMessageToExtension(eventName, eventData, eventSource) {
  return browser_polyfill_default().runtime.sendMessage({
    eventName: eventName,
    eventData: eventData,
    eventSource: eventSource
  });
};

var nimbleAgentRequest = function nimbleAgentRequest(eventName, eventData) {
  return sendMessageToExtension('NIMBLE_AGENT_REQUEST', {
    eventName: eventName,
    eventData: eventData
  });
};

var initSidebar = function initSidebar(SDK) {
  var NimbleIframe;

  var sendMessageToWidget = function sendMessageToWidget(eventName, eventData, eventSource) {
    // available messages sould be listed in ALLOWED_INCOMING_MESSAGES_LIST @ frame/index.js
    NimbleIframe && NimbleIframe.contentWindow && NimbleIframe.contentWindow.postMessage({
      eventName: 'NIMBLE_EXT__PROXY_TO_FRAME',
      eventData: {
        eventName: eventName,
        eventData: eventData,
        eventSource: eventSource
      }
    }, '*');
  }; // hover handling


  var tmout, lastEl;

  var hoverHandler = function hoverHandler(_ref) {
    var target = _ref.target;
    var el = target;

    if (el.tagName !== 'A') {
      el = el.closest('a');

      if (!el) {
        clearTimeout(tmout);
        lastEl = el;
        return;
      }
    }

    if (el !== lastEl) {
      clearTimeout(tmout);
      lastEl = el;
      tmout = setTimeout(function () {
        sendMessageToWidget('nimbleExtension.dataUpdate', {
          url: location.href,
          selection: el.innerText + ' ' + el.href,
          triggerType: 'hover'
        }, 'extension.chrome');
      }, 500);
    }
  };

  var insertSideBar = function insertSideBar(ThreadView) {
    var SidebarWidget = helpers_createEl('div', '__Nimble_Gmail_Sidebar');
    NimbleIframe = helpers_createEl('iframe', '__Nimble_Gmail_Sidebar__frame', {
      src: "".concat(browser_polyfill_default().runtime.getURL('frame.html'), "?inbox")
    });
    SidebarWidget.appendChild(NimbleIframe);
    var promises = [],
        emails = [];
    var messageViews = ThreadView.getMessageViews();
    messageViews.forEach(function (msg) {
      var _msg$getSender = msg.getSender(),
          name = _msg$getSender.name,
          emailAddress = _msg$getSender.emailAddress;

      emails.push(name ? {
        e: emailAddress,
        n: name
      } : {
        e: emailAddress
      });
      promises.push(msg.getRecipientsFull().then(function (contacts) {
        contacts.forEach(function (_ref2) {
          var name = _ref2.name,
              emailAddress = _ref2.emailAddress;
          return emails.push(name ? {
            e: emailAddress,
            n: name
          } : {
            e: emailAddress
          });
        });
        return contacts;
      }));
    });
    Promise.all(promises).then(function () {
      NimbleIframe.src = "".concat(browser_polyfill_default().runtime.getURL('frame.html'), "?inbox&data=").concat(encodeURIComponent(JSON.stringify(emails)));
    });
    ThreadView.addSidebarContentPanel({
      id: 'Nimble Prospector',
      el: SidebarWidget,
      title: 'Nimble Prospector',
      iconUrl: browser_polyfill_default().runtime.getURL('icons/icon.png'),
      hideTitleBar: true
    });
    var threadHoverTimeout;
    ThreadView.on('contactHover', function (e) {
      if (threadHoverTimeout) clearTimeout(threadHoverTimeout);
      threadHoverTimeout = setTimeout(function () {
        sendMessageToWidget('nimbleExtension.dataUpdate', {
          url: location.href,
          selection: "".concat(e.contact.name || '', " ").concat(e.contact.emailAddress || ''),
          triggerType: 'hover'
        });
      }, 500);
    });
    ThreadView.on('destroy', function () {
      NimbleIframe = null;
      window.document.removeEventListener('mouseover', hoverHandler);
    });
    window.document.addEventListener('mouseover', hoverHandler);
  };

  SDK.Conversations.registerThreadViewHandler(function (ThreadView) {
    return options_storage.getAll().then(function (_ref3) {
      var gmailSidebarEnabled = _ref3.gmailSidebarEnabled;
      gmailSidebarEnabled && insertSideBar(ThreadView);
    });
  });
};

var initComposeComponents = function initComposeComponents(SDK) {
  var rootClassName = '__Nimble_Gmail_Compose';
  var templatesRootClassName = "".concat(rootClassName, "__templates");
  var trackingRootClassName = "".concat(rootClassName, "__tracking");

  var insertTemplatesSelector = function insertTemplatesSelector(ComposeView, endpoint) {
    var rootClassName = templatesRootClassName;

    var createClassName = function createClassName(c) {
      return "".concat(rootClassName, "_").concat(c);
    }; // shortcut for creating el for templates


    var createTemplatesEl = function createTemplatesEl(className, attributes) {
      return createEl('div', createClassName(className), attributes);
    }; // outer link to have ability to close dropdown


    var templatesDropdownEl,
        isTemplatesReceived = false;
    var templatesLoading = createTemplatesEl('list_loading');
    var templatesDropdownContent = createTemplatesEl('list');
    var templatesPreview = createTemplatesEl('preview'); // insert templates dropdown clickable item

    var createTemplatesDropdownItem = function createTemplatesDropdownItem(tpl) {
      var el = createTemplatesEl('list_item', {
        innerText: tpl.name
      });
      el.addEventListener('mouseleave', function () {
        return updateTemplatesPreview(false);
      });
      el.addEventListener('mouseover', function () {
        return updateTemplatesPreview(true, "\n                <div class=\"".concat(createClassName('preview_subject'), "\">").concat(tpl.content.subject, "</div>\n                <div class=\"").concat(createClassName('preview_body'), "\">").concat(tpl.content.body, "</div>\n            "));
      });
      el.addEventListener('click', function () {
        return ComposeView.getTextContent().length > 10 ? confirm('The text in compose window will be replaced with selected template. Do you want to proceed?') && applyTemplate(tpl) : applyTemplate(tpl);
      });
      templatesDropdownContent.appendChild(el);
    }; // insert templates dropdown label


    var createTemplatesDropdownLabel = function createTemplatesDropdownLabel(label) {
      return templatesDropdownContent.appendChild(createTemplatesEl('list_label', {
        innerText: label
      }));
    }; // insert templates dropdown empty label


    var createTemplatesDropdownEmptyLabel = function createTemplatesDropdownEmptyLabel() {
      return templatesDropdownContent.appendChild(createTemplatesEl('list_empty', {
        innerHTML: "Your account does not have a template. <a href=\"".concat(endpoint, "/#app/settings/signature\" target=\"_blank\">Create one here</a>.")
      }));
    }; // insert templates dropdown group


    var insertTemplatesGroup = function insertTemplatesGroup(label, templates) {
      if (!templates.length) return;
      createTemplatesDropdownLabel(label);
      templates.forEach(function (tpl) {
        return createTemplatesDropdownItem(tpl);
      });
    }; // show/hide and update template preview content


    var updateTemplatesPreview = function updateTemplatesPreview(isVisible) {
      var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      templatesPreview.style.display = isVisible ? 'block' : 'none';
      templatesPreview.innerHTML = content;
    }; // apply template data to message


    var applyTemplate = function applyTemplate(tpl) {
      var updateMsg = function updateMsg(prop, fn) {
        return tpl.content[prop].length && ComposeView[fn](tpl.content[prop]);
      };

      updateMsg('cc', 'setCcRecipients');
      updateMsg('bcc', 'setBccRecipients');
      updateMsg('subject', 'setSubject');
      updateMsg('body', 'setBodyHTML');
      templatesDropdownEl && templatesDropdownEl.close();
    }; // add template selector button


    ComposeView.addButton({
      title: 'Select Nimble template',
      iconClass: createClassName('btn_icon'),
      iconUrl: browser.runtime.getURL('icons/create-white-18dp.svg'),
      hasDropdown: true,
      noOverflow: true,
      onClick: function onClick(_ref4) {
        var dropdown = _ref4.dropdown;
        if (!isTemplatesReceived) requestTemplates();
        templatesDropdownEl = dropdown;
        templatesDropdownEl.el.appendChild(templatesDropdownContent);
        templatesDropdownEl.el.appendChild(templatesPreview);
        templatesDropdownEl.setPlacementOptions({
          hAlign: 'right'
        });
      }
    });
    document.querySelector(".".concat(createClassName('btn_icon'))).parentNode.classList.add(createClassName('btn'));

    var requestTemplates = function requestTemplates() {
      templatesDropdownContent.innerHTML = '';
      templatesDropdownContent.appendChild(templatesLoading);
      nimbleAgentRequest('GET_TEMPLATES').then(function (templates) {
        templatesDropdownContent.innerHTML = '';

        if (!templates.length) {
          createTemplatesDropdownEmptyLabel();
        } else {
          isTemplatesReceived = true;
          insertTemplatesGroup('My templates', templates.filter(function (_ref5) {
            var is_shared = _ref5.is_shared;
            return !is_shared;
          }));
          insertTemplatesGroup('Team templates', templates.filter(function (_ref6) {
            var is_shared = _ref6.is_shared;
            return is_shared;
          }));
        }
      })["catch"](function (error) {
        templatesDropdownContent.innerHTML = '';
        templatesDropdownContent.appendChild(createEl('div', createClassName('error'), {
          innerText: error.message
        }));
      });
    }; // show loader while loading templates


    templatesDropdownContent.appendChild(templatesLoading);
    requestTemplates();
  };

  var insertTrackingWrapper = function insertTrackingWrapper(ComposeView) {
    var rootClassName = trackingRootClassName;

    var createClassName = function createClassName(c) {
      return "".concat(rootClassName, "_").concat(c);
    };

    var toggleBtnEl,
        sendBtnEl,
        _isSending = false,
        isTrackingEnabled = true;

    var isSending = function isSending() {
      return _isSending;
    };

    var setSending = function setSending(state) {
      _isSending = !!state;
      sendBtnEl.classList[state ? 'add' : 'remove']('__loading');
    };
    /*
     const getTooltip = () => `${isTrackingEnabled ? 'Disable' : 'Enable'} Nimble messages tracking`;
     ComposeView.addButton({
        title: getTooltip(),
        iconClass: createClassName('btn_icon'),
        iconUrl: browser.runtime.getURL('icons/swap_vert-white-18dp.svg'),
        hasDropdown: false,
        noOverflow: true,
        onClick: () => {
            isTrackingEnabled = !isTrackingEnabled;
            toggleBtnEl.classList[isTrackingEnabled ? 'add' : 'remove']('__active');
            toggleBtnEl.dataset.tooltip = getTooltip();
        }
    });
     toggleBtnEl = document.querySelector(`.${createClassName('btn_icon')}`).parentNode;
    toggleBtnEl.classList.add(createClassName('btn'));
    toggleBtnEl.classList.add('__active');
     */


    var prepareMessageData = function prepareMessageData(ComposeView) {
      var mapContact = function mapContact(contactData) {
        return {
          identifier: contactData.emailAddress,
          name: contactData.name,
          account_type: 'email'
        };
      };

      var recipients = [].concat(_toConsumableArray(ComposeView.getToRecipients()), _toConsumableArray(ComposeView.getCcRecipients()), _toConsumableArray(ComposeView.getBccRecipients())).map(mapContact);

      if (!recipients.length) {
        // calling send method to cause validation modal window displaying
        ComposeView.send();
        log('No recepients');
        return null;
      }

      return {
        recipients: recipients,
        sender: mapContact(ComposeView.getFromContact()),
        subject: ComposeView.getSubject(),
        body: ComposeView.getHTMLContent()
      };
    };

    var addTracking = function addTracking(msgData) {
      nimbleAgentRequest('ADD_TRACKING_ELEMENTS', msgData).then(function (data) {
        ComposeView.setBodyHTML(data.message.body);
        ComposeView.send();
        setSending(false);
      })["catch"](function (error) {
        setSending(false);
        alert(error.message);
      });
    };

    ComposeView.addButton({
      title: 'Send with Nimble tracking',
      iconClass: createClassName('send_btn_icon'),
      iconUrl: browser.runtime.getURL('icons/nimble-logo.svg'),
      hasDropdown: false,
      noOverflow: true,
      onClick: function onClick() {
        if (isSending()) return;
        var msgData = prepareMessageData(ComposeView);
        if (!msgData) return;
        log('Sending');
        setSending(true);
        sendBtnEl.classList.add('__loading');
        addTracking(msgData);
      }
    });
    var sendBtnIconEL = document.querySelector(".".concat(createClassName('send_btn_icon')));
    sendBtnIconEL.appendChild(createEl('span', null, {
      innerHTML: 'Send<br />and&nbsp;track'
    }));
    sendBtnEl = sendBtnIconEL.parentNode;
    sendBtnEl.classList.add(createClassName('send_btn'));
  };

  SDK.Compose.registerComposeViewHandler(function (ComposeView) {
    return optionsStorage.getAll().then(function (_ref7) {
      var endpoint = _ref7.endpoint,
          gmailIntegrationEnabled = _ref7.gmailIntegrationEnabled;

      if (gmailIntegrationEnabled) {
        insertTrackingWrapper(ComposeView);
        insertTemplatesSelector(ComposeView, endpoint); // wrap buttons

        var composeButtonsWrapper = document.querySelector('.inboxsdk__compose_actionToolbar');
        var sendBtn = document.querySelector(".".concat(trackingRootClassName, "_send_btn")); //const trackingBtn = document.querySelector(`.${trackingRootClassName}_btn`);

        var templatesBtn = document.querySelector(".".concat(templatesRootClassName, "_btn"));
        var nimbleButtonsWrapper = createEl('div', "".concat(rootClassName, "__wrapper"));
        composeButtonsWrapper.appendChild(nimbleButtonsWrapper);
        nimbleButtonsWrapper.appendChild(sendBtn); //nimbleButtonsWrapper.appendChild(trackingBtn);

        nimbleButtonsWrapper.appendChild(templatesBtn);
      }
    });
  });
};

var closeDetailsPopupsListener = null;

var initMessageViewComponents = function initMessageViewComponents(SDK) {
  var rootClassName = '__Nimble_Gmail_MessageView'; // listen for click to close details dropdowns

  if (closeDetailsPopupsListener === null) {
    closeDetailsPopupsListener = function closeDetailsPopupsListener(_ref8) {
      var target = _ref8.target;
      return !target.closest("".concat(rootClassName, "__details_wrapper")) && document.querySelectorAll(".".concat(rootClassName, "__details_btn")).forEach(function (el) {
        return el.classList.remove('__active');
      });
    };
  }

  document.removeEventListener('click', closeDetailsPopupsListener);
  document.addEventListener('click', closeDetailsPopupsListener);

  var insertTrackingDetails = function insertTrackingDetails(MessageView, endpoint) {
    if (MessageView.getViewState() === 'EXPANDED' && MessageView.isLoaded()) {
      var msgBodyElOriginal = MessageView.getBodyElement();
      var msgBodyEl = msgBodyElOriginal.cloneNode(true);
      msgBodyEl.querySelectorAll('blockquote').forEach(function (el) {
        return el.remove();
      });
      var trackedIdEl = msgBodyEl.querySelector('[name=x-nimble-tracked-hidden-id]');
      var trackedId = trackedIdEl ? trackedIdEl.value : null;
      var trackingPixelEl = msgBodyEl.querySelector('img[src*="api/v1/messages/tracking/open"]');
      Promise.all([MessageView.getMessageIDAsync(), MessageView.getThreadView().getThreadIDAsync()]).then(function (result) {
        var _result = gmail_slicedToArray(result, 2),
            msgId = _result[0],
            threadId = _result[1]; // todo track email activity
        // http://docs.ninternal.com:8088/api/#api_v1_messages_record_email_client_activity_post

      });
      if (!trackingPixelEl || !trackedId) return;

      var _trackingPixelEl$src$ = trackingPixelEl.src.split('#'),
          _trackingPixelEl$src$2 = gmail_slicedToArray(_trackingPixelEl$src$, 2),
          trackingSrc = _trackingPixelEl$src$2[1];

      var trackingUserId = trackingSrc.split('/')[9];
      nimbleAgentRequest('GET_USER_ID').then(function (userId) {
        if (trackingUserId !== userId) return; // looking for message parent div

        var msgDiv = msgBodyElOriginal.closest('[role="listitem"]');
        if (!msgDiv) msgDiv = msgBodyElOriginal.closest('[data-message-id]');
        if (!msgDiv) return; // td

        var td = helpers_createEl('td', "".concat(rootClassName, "__details_td"));
        msgDiv.querySelector('.gE.iv.gt td.gF.gK').after(td); // wrapper

        var trackingDetailsWrapper = helpers_createEl('div', "".concat(rootClassName, "__details_wrapper"));
        trackingDetailsWrapper.addEventListener('click', function (e) {
          return e.stopPropagation();
        });
        td.appendChild(trackingDetailsWrapper); // button

        var detailsBtn = helpers_createEl('div', "".concat(rootClassName, "__details_btn"), {
          innerText: 'Tracking Details'
        });
        detailsBtn.addEventListener('click', function () {
          return detailsBtn.classList.toggle('__active');
        });
        trackingDetailsWrapper.appendChild(detailsBtn); // dropdown

        var detailsDropdown = helpers_createEl('div', "".concat(rootClassName, "__details_dropdown"));
        trackingDetailsWrapper.appendChild(detailsDropdown);
        return nimbleAgentRequest('GET_TRACKING_DETAILS', {
          trackedId: trackedId
        }).then(function (_ref9) {
          var stats = _ref9.stats,
              events = _ref9.events;
          detailsDropdown.innerHTML = '';
          var commonStat = helpers_createEl('div', "".concat(rootClassName, "__details_dropdown_stat"), {
            innerHTML: "\n                                    <div>Opens:<strong>".concat(stats.opensCount, "&nbsp;(").concat(stats.opensUnique, "&nbsp;unique)</strong></div>\n                                    <div>Clicks:<strong>").concat(stats.clicksCount, "&nbsp;(").concat(stats.clicksUnique, "&nbsp;unique)</strong></div>\n                                ")
          });
          detailsDropdown.appendChild(commonStat);
          events.forEach(function (e) {
            var className = "".concat(rootClassName, "__details_dropdown_item");
            var listItem = helpers_createEl('div', className);
            var avatarBackground = e.contactInfo.avatar_url ? "background-image: url('".concat(e.contactInfo.avatar_url, "')") : '';
            var action = e.type === 'clicks' ? "clicked on the link <a class=\"".concat(className, "__detail_link\" title=\"").concat(e.details.clicked_link_text, "\" target=\"_blank\" \n                                       rel=\"noreferrer noopener\" href=\"").concat(e.details.clicked_link, "\">").concat(e.details.clicked_link_text, "</a>") : "opened message";
            var client = [];
            e.location && client.push(e.location);
            e.client.client && client.push(e.client.client_hr);
            e.client.os && e.client.os !== 'other' && client.push(e.client.os_hr);
            listItem.innerHTML = "\n                                    <div class=\"".concat(className, "__avatar ").concat(e.contactInfo.contact_type === 'company' ? '__company' : '', "\"\n                                         style=\"").concat(avatarBackground, "\"></div>\n                                    <div class=\"").concat(className, "__detail\">\n                                        <a class=\"").concat(className, "__detail_contact\" href=\"").concat(endpoint).concat(e.contactInfo.id, "\">").concat(e.contactInfo.name, "</a>\n                                        ").concat(action, " ").concat(e.dateFromNow, "\n                                        <div class=\"").concat(className, "__detail_client\">").concat(client.join(' &middot; ') || 'Unknown client and location', "</div>\n                                    </div>\n                                ");
            detailsDropdown.appendChild(listItem);
          });
        });
      })["catch"](function (error) {
        return helpers_log('GET_USER_ID error', error);
      });
    }
  };

  SDK.Conversations.registerMessageViewHandler(function (MessageView) {
    return options_storage.getAll().then(function (_ref10) {
      var gmailIntegrationEnabled = _ref10.gmailIntegrationEnabled,
          endpoint = _ref10.endpoint;
      gmailIntegrationEnabled && insertTrackingDetails(MessageView, endpoint);
    });
  });
};

helpers_log('GMAIL INBOX');
InboxSDK.load(2, INBOX_SDK_ID).then(function (SDK) {
  initSidebar(SDK); // initComposeComponents(SDK);

  initMessageViewComponents(SDK);

  if (true) {
    ajax({
      url: 'https://monitoring.nimble.com:8443',
      contentType: 'multipart/form-data',
      type: 'POST',
      data: JSON.stringify({
        levelname: 'INBOXSDK',
        errorUserEmail: SDK.User.getEmailAddress(),
        errorBrowserName: isSafari() ? 'Safari' : isFF() ? 'Firefox' : 'Edge'
      }),
      cache: false
    });
  }
});
injectNimbleAgent();
})();

/******/ })()
;