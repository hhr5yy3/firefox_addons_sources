/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 196:
/***/ ((__unused_webpack_module, exports) => {


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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

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
;// CONCATENATED MODULE: ./source/options/index.js


options_storage.syncForm('#options-form');
if (true) document.querySelector('#endpoint').remove();
})();

/******/ })()
;