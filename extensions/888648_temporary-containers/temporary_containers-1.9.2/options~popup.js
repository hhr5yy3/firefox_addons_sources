(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mixin = void 0;
const vue_1 = __importDefault(__webpack_require__(1));
exports.mixin = vue_1.default.extend({
    methods: {
        t: browser.i18n.getMessage,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        clone: (input) => JSON.parse(JSON.stringify(input)),
    },
});


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.formatBytes = exports.REDIRECTOR_DOMAINS_DEFAULT = exports.IGNORED_DOMAINS_DEFAULT = exports.TOOLBAR_ICON_COLORS = exports.CONTAINER_ICONS = exports.CONTAINER_COLORS = exports.getPermissions = void 0;
exports.getPermissions = async () => {
    const { permissions } = await browser.permissions.getAll();
    if (!permissions) {
        throw new Error('permissions.getAll didnt return permissions');
    }
    return {
        bookmarks: permissions.includes('bookmarks'),
        downloads: permissions.includes('downloads'),
        history: permissions.includes('history'),
        notifications: permissions.includes('notifications'),
        webNavigation: permissions.includes('webNavigation'),
    };
};
exports.CONTAINER_COLORS = [
    'blue',
    'turquoise',
    'green',
    'yellow',
    'orange',
    'red',
    'pink',
    'purple',
    'toolbar',
];
exports.CONTAINER_ICONS = [
    'fingerprint',
    'briefcase',
    'dollar',
    'cart',
    'circle',
    'gift',
    'vacation',
    'food',
    'fruit',
    'pet',
    'tree',
    'chill',
    'fence',
];
exports.TOOLBAR_ICON_COLORS = [
    'default',
    'black-simple',
    'blue-simple',
    'red-simple',
    'white-simple',
];
exports.IGNORED_DOMAINS_DEFAULT = ['getpocket.com', 'addons.mozilla.org'];
exports.REDIRECTOR_DOMAINS_DEFAULT = [
    't.co',
    'outgoing.prod.mozaws.net',
    'slack-redir.net',
];
exports.formatBytes = (bytes, decimals = 2) => {
    // https://stackoverflow.com/a/18650828
    if (bytes == 0) {
        return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + sizes[i];
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _domainpattern_vue_vue_type_template_id_0efbd1e5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67);
/* harmony import */ var _domainpattern_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _domainpattern_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _domainpattern_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _domainpattern_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _domainpattern_vue_vue_type_template_id_0efbd1e5___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _domainpattern_vue_vue_type_template_id_0efbd1e5___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/domainpattern.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_global_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_global_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_global_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_global_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_global_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_global_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_typed_mixins_1 = __importDefault(__webpack_require__(2));
const mixin_1 = __webpack_require__(3);
const domainpattern_vue_1 = __importDefault(__webpack_require__(6));
const settings_vue_1 = __importDefault(__webpack_require__(75));
exports.default = vue_typed_mixins_1.default(mixin_1.mixin).extend({
    components: {
        DomainPattern: domainpattern_vue_1.default,
        Settings: settings_vue_1.default,
    },
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            preferences: this.app.preferences,
            storage: this.app.storage,
            popup: this.app.popup,
            show: false,
            excludeDomainPattern: '',
        };
    },
    async mounted() {
        this.$nextTick(() => {
            $('#isolationGlobal .ui.accordion').accordion({
                ...(this.popup
                    ? {
                        animateChildren: false,
                        duration: 0,
                    }
                    : {}),
                exclusive: false,
            });
            $('#isolationGlobal .ui.dropdown').dropdown();
            $('#isolationGlobal .ui.checkbox').checkbox();
            $('#isolationGlobalAccordion').accordion('open', 0);
            if (this.preferences.isolation.global.mouseClick.middle.action !==
                'never' ||
                this.preferences.isolation.global.mouseClick.ctrlleft.action !==
                    'never' ||
                this.preferences.isolation.global.mouseClick.left.action !== 'never') {
                $('#isolationGlobalAccordion').accordion('open', 1);
            }
            if (Object.keys(this.preferences.isolation.global.excludedContainers).length) {
                $('#isolationGlobalAccordion').accordion('open', 2);
            }
            if (Object.keys(this.preferences.isolation.global.excluded).length) {
                $('#isolationGlobalAccordion').accordion('open', 3);
            }
            this.show = true;
        });
        const excludeContainers = [];
        const containers = await browser.contextualIdentities.query({});
        containers.map((container) => {
            if (this.storage.tempContainers[container.cookieStoreId]) {
                return;
            }
            excludeContainers.push({
                name: container.name,
                value: container.cookieStoreId,
                selected: !!this.preferences.isolation.global.excludedContainers[container.cookieStoreId],
            });
        });
        $('#isolationGlobalExcludeContainers').dropdown({
            placeholder: !this.popup
                ? this.t('optionsIsolationGlobalSelectExclusionContainers')
                : this.t('optionsIsolationGlobalExclusionPermanentContainers'),
            values: excludeContainers,
            onAdd: (addedContainer) => {
                if (this.preferences.isolation.global.excludedContainers[addedContainer]) {
                    return;
                }
                this.$set(this.preferences.isolation.global.excludedContainers, addedContainer, {});
            },
            onRemove: (removedContainer) => {
                this.$delete(this.preferences.isolation.global.excludedContainers, removedContainer);
            },
        });
        $('#isolationGlobalExcludeDomainsForm').form({
            fields: {
                isolationGlobalExcludeDomainPattern: 'empty',
            },
            onSuccess: (event) => {
                event.preventDefault();
                this.$set(this.preferences.isolation.global.excluded, this.excludeDomainPattern, {});
                this.excludeDomainPattern = '';
            },
        });
    },
    methods: {
        removeExcludedDomain(excludedDomainPattern) {
            this.$delete(this.preferences.isolation.global.excluded, excludedDomainPattern);
        },
    },
});


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_domainpattern_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_domainpattern_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_domainpattern_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_domainpattern_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_domainpattern_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_domainpattern_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_typed_mixins_1 = __importDefault(__webpack_require__(2));
const mixin_1 = __webpack_require__(3);
exports.default = vue_typed_mixins_1.default(mixin_1.mixin).extend({
    props: {
        id: {
            type: String,
            required: true,
        },
        tooltip: {
            type: Object,
            default: () => ({
                hidden: false,
                position: 'bottom left',
            }),
        },
        domainPattern: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        exclusion: {
            type: Boolean,
            default: false,
        },
        glossary: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        domainPattern(newDomainPattern) {
            this.$emit('update:domainPattern', newDomainPattern);
        },
    },
});


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_settings_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_settings_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_settings_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_settings_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_settings_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_settings_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_typed_mixins_1 = __importDefault(__webpack_require__(2));
const mixin_1 = __webpack_require__(3);
exports.default = vue_typed_mixins_1.default(mixin_1.mixin).extend({
    props: {
        action: {
            type: String,
            required: true,
        },
        glossary: {
            type: String,
            default: '',
        },
        glossaryLabel: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        perdomain: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        action(newAction) {
            this.$emit('update:action', newAction);
        },
    },
});


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_perdomain_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_perdomain_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_perdomain_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_perdomain_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_perdomain_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_perdomain_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vuedraggable_1 = __importDefault(__webpack_require__(125));
const vue_typed_mixins_1 = __importDefault(__webpack_require__(2));
const domainpattern_vue_1 = __importDefault(__webpack_require__(6));
const settings_vue_1 = __importDefault(__webpack_require__(75));
const mixin_1 = __webpack_require__(3);
const domainDefaults = {
    pattern: '',
    always: {
        action: 'disabled',
        allowedInPermanent: false,
        allowedInTemporary: false,
    },
    navigation: {
        action: 'global',
    },
    mouseClick: {
        middle: {
            action: 'global',
        },
        ctrlleft: {
            action: 'global',
        },
        left: {
            action: 'global',
        },
    },
    excluded: {},
};
exports.default = vue_typed_mixins_1.default(mixin_1.mixin).extend({
    components: {
        DomainPattern: domainpattern_vue_1.default,
        Settings: settings_vue_1.default,
        Draggable: vuedraggable_1.default,
    },
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            preferences: this.app.preferences,
            popup: this.app.popup,
            domain: this.clone(domainDefaults),
            excludeDomainPattern: '',
            isolationDomainFilter: '',
            editing: false,
            show: false,
            saved: false,
            empty: true,
            editClicked: false,
        };
    },
    computed: {
        isolationDomains: {
            get() {
                return this.preferences.isolation.domain.reduce((accumulator, isolated, index) => {
                    if (!isolated.pattern.includes(this.isolationDomainFilter)) {
                        return accumulator;
                    }
                    accumulator.push({ ...isolated, _index: index });
                    return accumulator;
                }, []);
            },
            set() {
                // suppress warning about missing setter
            },
        },
    },
    watch: {
        domain: {
            handler(domain) {
                if (this.editing && !domain.pattern.trim()) {
                    this.editing = false;
                    this.domain = this.clone(domain);
                    const domainIndex = this.preferences.isolation.domain.findIndex((isolatedDomain) => !isolatedDomain.pattern.trim());
                    this.$delete(this.preferences.isolation.domain, domainIndex);
                }
                else if (!this.editing &&
                    this.preferences.isolation.domain.find((_domain) => _domain.pattern === domain.pattern)) {
                    $('#isolationDomainForm').form('validate form');
                }
                else if (this.editing) {
                    if (this.editClicked) {
                        this.editClicked = false;
                    }
                    else {
                        this.saved = true;
                        setTimeout(() => {
                            this.saved = false;
                        }, 1500);
                    }
                }
                this.empty = false;
            },
            deep: true,
        },
    },
    async mounted() {
        var _a;
        this.$nextTick(() => {
            $('#isolationDomain .ui.accordion').accordion({
                ...(this.popup
                    ? {
                        animateChildren: false,
                        duration: 0,
                    }
                    : {}),
                exclusive: false,
            });
            $('#isolationDomain .ui.dropdown').dropdown();
            $('#isolationDomain .ui.checkbox').checkbox();
            this.show = true;
        });
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $(document).form.settings.rules.domainPattern = (value) => {
            if (this.editing) {
                this.reset();
                return true;
            }
            else {
                return !this.preferences.isolation.domain.find((domain) => domain.pattern === value);
            }
        };
        $('#isolationDomainForm').form({
            inline: true,
            fields: {
                isolationDomainPattern: {
                    rules: [
                        {
                            type: 'empty',
                            prompt: this.t('optionsIsolationPerDomainPatternNoEmpty'),
                        },
                        {
                            type: 'domainPattern',
                            prompt: this.t('optionsIsolationPerDomainPatternExists'),
                        },
                    ],
                },
            },
            onSuccess: (event) => {
                if (event) {
                    event.preventDefault();
                }
                if (this.editing) {
                    this.reset();
                    this.editing = false;
                }
                else {
                    this.domain.pattern = this.domain.pattern.trim();
                    this.preferences.isolation.domain.push(this.clone(this.domain));
                    this.reset();
                }
            },
        });
        $('#isolationDomainExcludeDomainsForm').form({
            fields: {
                isolationDomainExcludeDomainPattern: 'empty',
            },
            onSuccess: (event) => {
                event.preventDefault();
                this.$set(this.domain.excluded, this.excludeDomainPattern, {});
                this.excludeDomainPattern = '';
            },
        });
        if (this.popup) {
            if (!((_a = this.app.activeTab) === null || _a === void 0 ? void 0 : _a.url.startsWith('http'))) {
                return;
            }
            const isolationDomainIndex = this.preferences.isolation.domain.findIndex((domain) => { var _a; return domain.pattern === ((_a = this.app.activeTab) === null || _a === void 0 ? void 0 : _a.parsedUrl.hostname); });
            if (isolationDomainIndex >= 0) {
                this.edit(isolationDomainIndex);
            }
            else {
                this.domain.pattern = this.app.activeTab.parsedUrl.hostname;
            }
        }
    },
    methods: {
        reset() {
            this.domain = this.clone(domainDefaults);
            this.domain.pattern = '';
            this.$nextTick(() => {
                this.empty = true;
            });
            if (!this.preferences.ui.expandPreferences) {
                $('#isolationPerDomainAccordion').accordion('close', 0);
                $('#isolationPerDomainAccordion').accordion('close', 1);
                $('#isolationPerDomainAccordion').accordion('close', 2);
                $('#isolationPerDomainAccordion').accordion('close', 3);
            }
            this.resetDropdowns();
        },
        resetDropdowns() {
            $('#isolationDomain .ui.dropdown').dropdown('destroy');
            this.$nextTick(() => {
                $('#isolationDomain .ui.dropdown').dropdown();
            });
        },
        edit(index) {
            this.editClicked = true;
            this.editing = true;
            this.domain = this.preferences.isolation.domain[index];
            this.resetDropdowns();
            if (!this.preferences.ui.expandPreferences) {
                this.domain.always.action === domainDefaults.always.action
                    ? $('#isolationPerDomainAccordion').accordion('close', 0)
                    : $('#isolationPerDomainAccordion').accordion('open', 0);
                this.domain.navigation.action === domainDefaults.navigation.action
                    ? $('#isolationPerDomainAccordion').accordion('close', 1)
                    : $('#isolationPerDomainAccordion').accordion('open', 1);
                this.domain.mouseClick.middle.action ===
                    domainDefaults.mouseClick.middle.action &&
                    this.domain.mouseClick.ctrlleft.action ===
                        domainDefaults.mouseClick.ctrlleft.action &&
                    this.domain.mouseClick.left.action ===
                        domainDefaults.mouseClick.left.action
                    ? $('#isolationPerDomainAccordion').accordion('close', 2)
                    : $('#isolationPerDomainAccordion').accordion('open', 2);
                !Object.keys(this.domain.excluded).length
                    ? $('#isolationPerDomainAccordion').accordion('close', 3)
                    : $('#isolationPerDomainAccordion').accordion('open', 3);
            }
        },
        remove(index, pattern) {
            if (window.confirm(this.t('optionsIsolationPerDomainRemoveConfirmation', pattern))) {
                this.$delete(this.preferences.isolation.domain, index);
                if (this.editing && this.domain.pattern === pattern) {
                    this.reset();
                    this.editing = false;
                }
            }
        },
        removeExcludedDomain(excludedDomainPattern) {
            this.$delete(this.domain.excluded, excludedDomainPattern);
        },
        expandIsolationDomainFilter(event) {
            if (!this.popup) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            if ($('#isolationDomainsAccordion > div > div.title').hasClass('active')) {
                return;
            }
            setTimeout(() => {
                $('#isolationDomainsAccordion').accordion('open', 0);
            }, 200);
        },
        move(event) {
            if (event.moved) {
                this.preferences.isolation.domain.move(this.isolationDomains[event.moved.oldIndex]._index, this.isolationDomains[event.moved.newIndex]._index);
            }
        },
        focusIsolationDomainFilter(event) {
            event.preventDefault();
            event.stopPropagation();
            this.$refs.isolationDomainFilter.focus();
        },
    },
});


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(127);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(8).default
var update = add("57c84705", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_statistics_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_statistics_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_statistics_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_statistics_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_statistics_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_statistics_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(__webpack_require__(1));
const shared_1 = __webpack_require__(5);
exports.default = vue_1.default.extend({
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            preferences: this.app.preferences,
            permissions: this.app.permissions,
            statistics: this.app.storage.statistics,
            popup: this.app.popup,
            formatBytes: shared_1.formatBytes,
        };
    },
    async mounted() {
        $('#statistics .ui.checkbox').checkbox();
        if (!this.popup) {
            $('#deletesHistoryStatisticsField').popup({
                html: `
          <div style="width:500px;">
          The overall statistics include all Temporary Containers already<br>
          This will show and collect separate statistics about how many "Deletes History<br>
          Temporary Container" plus cookies and URLs with them got deleted.</div>
        `,
                inline: true,
                position: 'bottom left',
            });
        }
    },
    methods: {
        async resetStatistics() {
            if (!window.confirm(`
        Reset statistics?
      `)) {
                return;
            }
            await browser.runtime.sendMessage({
                method: 'resetStatistics',
            });
            this.$root.$emit('initialize', {
                showMessage: 'Statistics have been reset.',
            });
        },
    },
});


/***/ }),
/* 37 */,
/* 38 */,
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_message_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(40);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_message_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_message_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_message_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_message_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_message_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(__webpack_require__(1));
exports.default = vue_1.default.extend({
    data() {
        return {
            message: false,
            error: false,
            initializeLoader: false,
            initializeError: false,
            initializeErrorMessage: null,
        };
    },
    mounted() {
        if (window.location.search.startsWith('?error')) {
            const searchParams = new window.URLSearchParams(document.location.search.substring(1));
            this.initializeErrorMessage = searchParams.get('error');
        }
        this.$root.$on('showMessage', (message, options = { close: true }) => {
            this.error = false;
            this.message = message;
            if (options.close) {
                setTimeout(() => {
                    this.message = false;
                }, 3000);
            }
        });
        this.$root.$on('hideMessage', () => {
            this.message = false;
        });
        this.$root.$on('showError', (message, options = { close: false }) => {
            this.error = true;
            this.message = message;
            if (options.close) {
                setTimeout(() => {
                    this.message = false;
                }, 5000);
            }
        });
        this.$root.$on('showInitializeLoader', () => {
            this.initializeLoader = true;
        });
        this.$root.$on('hideInitializeLoader', () => {
            this.initializeLoader = false;
        });
        this.$root.$on('showInitializeError', async () => {
            this.initializeError = true;
        });
    },
    methods: {
        reload() {
            browser.runtime.reload();
        },
        async uninstall() {
            if (!window.confirm(`
        Uninstall?
      `)) {
                return;
            }
            await browser.tabs.create({
                url: 'https://addons.mozilla.org/firefox/addon/temporary-containers',
            });
            browser.management.uninstallSelf();
        },
        debug() {
            browser.tabs.create({
                url: 'https://github.com/stoically/temporary-containers/issues',
            });
            browser.tabs.create({
                url: 'https://github.com/stoically/temporary-containers/wiki/Debug-Log',
            });
        },
    },
});


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(__webpack_require__(1));
const link_vue_1 = __importDefault(__webpack_require__(136));
const glossaryDefaults = () => ({
    origin: '',
    active: '',
    section: '',
    history: [],
    historyPosition: 0,
});
exports.default = vue_1.default.extend({
    components: {
        GlossaryLink: link_vue_1.default,
    },
    props: {
        app: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            createdElements: [],
            ...glossaryDefaults(),
        };
    },
    watch: {
        app(newApp) {
            if (!newApp.initialized) {
                this.cleanup();
                return;
            }
            this.$nextTick(() => {
                window.setTimeout(() => {
                    this.initialize();
                }, 100);
            });
        },
    },
    mounted() {
        this.$root.$on('show', (target) => {
            this.show(target);
        });
    },
    methods: {
        initialize() {
            $('[data-glossary]').each((idx, element) => {
                if (element.dataset.glossaryLabel !== '' && element.dataset.glossary) {
                    const infoText = document.createElement('span');
                    infoText.textContent =
                        element.dataset.glossaryLabel || element.dataset.glossary;
                    if (infoText.textContent) {
                        infoText.id = 'glossaryText';
                        element.appendChild(infoText);
                    }
                    this.createdElements.push(infoText);
                }
                const infoIcon = document.createElement('i');
                infoIcon.className =
                    'icon-info-circled opaque-info-circle glossary-help';
                element.appendChild(infoIcon);
                this.createdElements.push(infoIcon);
                let iconHovered = false;
                $(infoIcon).hover(() => {
                    iconHovered = true;
                    $(element).popup('show');
                }, () => {
                    iconHovered = false;
                });
                $(infoIcon).click((event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    $(element).popup('show');
                });
                $(element).popup({
                    popup: '.glossary.ui.popup',
                    hoverable: true,
                    position: 'bottom left',
                    onShow: (popupElement) => {
                        if (!iconHovered) {
                            return false;
                        }
                        const glossary = popupElement.dataset
                            .glossary;
                        if (!glossary) {
                            return;
                        }
                        this.origin = this.active = glossary;
                        const glossaryRef = this.$refs.glossary;
                        const glossaryContainer = this.$refs
                            .glossaryContainer;
                        if (['Automatic Mode', 'Toolbar Popup'].includes(this.origin)) {
                            glossaryRef.style.minHeight = 'unset';
                            glossaryRef.style.maxHeight = 'unset';
                            glossaryContainer.style.minWidth = '450px';
                            glossaryContainer.style.maxWidth = '450px';
                        }
                        else {
                            glossaryRef.style.minHeight = '';
                            glossaryRef.style.maxHeight = '';
                            glossaryContainer.style.minWidth = '';
                            glossaryContainer.style.maxWidth = '';
                        }
                    },
                    onVisible: () => {
                        if (['Global', 'Per Domain'].includes(this.origin)) {
                            this.section = this.origin;
                        }
                        else if (element.dataset.glossarySection) {
                            this.section = element.dataset.glossarySection;
                        }
                        this.history.push(this.origin);
                        this.$nextTick(() => {
                            $(element).popup('reposition');
                        });
                    },
                    onHidden: () => {
                        Object.assign(this.$data, glossaryDefaults());
                    },
                });
            });
        },
        show(target) {
            if (this.history.length - 1 > this.historyPosition) {
                this.history.splice(this.historyPosition + 1);
            }
            this.history.push(target);
            this.historyPosition = this.history.length - 1;
            this.active = target;
        },
        historyBack() {
            this.active = this.history[--this.historyPosition];
        },
        historyForward() {
            this.active = this.history[++this.historyPosition];
        },
        external(url) {
            browser.tabs.create({
                url,
            });
        },
        stop(event) {
            event.stopPropagation();
            event.preventDefault();
        },
        cleanup() {
            this.createdElements.map((created) => {
                created.remove();
            });
        },
    },
});


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_link_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_link_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_link_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_link_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_link_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_0_node_modules_vue_loader_lib_index_js_vue_loader_options_link_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(__webpack_require__(1));
exports.default = vue_1.default.extend({
    props: {
        to: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            default: '',
        },
    },
});


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(138);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(8).default
var update = add("656b377d", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/isolation/global.vue?vue&type=template&id=75e4b3fb&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        { name: "show", rawName: "v-show", value: _vm.show, expression: "show" }
      ],
      attrs: { id: "isolationGlobal" }
    },
    [
      _c("div", { staticClass: "ui form" }, [
        _c(
          "div",
          {
            staticClass: "ui accordion",
            attrs: { id: "isolationGlobalAccordion" }
          },
          [
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "title" }, [
                _c("h4", [
                  _c("i", { staticClass: "dropdown icon" }),
                  _vm._v(
                    "\n            " +
                      _vm._s(_vm.t("optionsIsolationNavigation")) +
                      "\n          "
                  )
                ])
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "content",
                  class: { "ui segment": !_vm.popup, "popup-margin": _vm.popup }
                },
                [
                  _c("settings", {
                    attrs: {
                      label: _vm.t("optionsIsolationTargetDomain"),
                      action: _vm.preferences.isolation.global.navigation.action
                    },
                    on: {
                      "update:action": function($event) {
                        return _vm.$set(
                          _vm.preferences.isolation.global.navigation,
                          "action",
                          $event
                        )
                      }
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "title" }, [
                _c("h4", [
                  _c("i", { staticClass: "dropdown icon" }),
                  _vm._v(
                    "\n            " +
                      _vm._s(_vm.t("optionsIsolationMouseClick")) +
                      "\n          "
                  )
                ])
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "content",
                  class: { "ui segment": !_vm.popup, "popup-margin": _vm.popup }
                },
                [
                  _c("settings", {
                    attrs: {
                      label: _vm.t("optionsIsolationMouseClickMiddleMouse"),
                      action:
                        _vm.preferences.isolation.global.mouseClick.middle
                          .action
                    },
                    on: {
                      "update:action": function($event) {
                        return _vm.$set(
                          _vm.preferences.isolation.global.mouseClick.middle,
                          "action",
                          $event
                        )
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("settings", {
                    attrs: {
                      label: _vm.t("optionsIsolationMouseClickCtrlLeftMouse"),
                      action:
                        _vm.preferences.isolation.global.mouseClick.ctrlleft
                          .action
                    },
                    on: {
                      "update:action": function($event) {
                        return _vm.$set(
                          _vm.preferences.isolation.global.mouseClick.ctrlleft,
                          "action",
                          $event
                        )
                      }
                    }
                  }),
                  _vm._v(" "),
                  _c("settings", {
                    attrs: {
                      label: _vm.t("optionsIsolationMouseClickLeftMouse"),
                      action:
                        _vm.preferences.isolation.global.mouseClick.left.action
                    },
                    on: {
                      "update:action": function($event) {
                        return _vm.$set(
                          _vm.preferences.isolation.global.mouseClick.left,
                          "action",
                          $event
                        )
                      }
                    }
                  })
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "title" }, [
                _c("h4", [
                  _c("i", { staticClass: "dropdown icon" }),
                  _vm._v(
                    "\n            " +
                      _vm._s(
                        _vm.t(
                          "optionsIsolationGlobalExcludePermanentContainers"
                        )
                      ) +
                      "\n          "
                  )
                ])
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "content",
                  class: { "ui segment": !_vm.popup, "popup-margin": _vm.popup }
                },
                [
                  _c("div", { staticClass: "field" }, [
                    _c(
                      "div",
                      {
                        staticClass: "ui dropdown fluid selection multiple",
                        style: _vm.popup ? "max-width: 280px" : "",
                        attrs: { id: "isolationGlobalExcludeContainers" }
                      },
                      [
                        _c("div", { staticClass: "text" }),
                        _vm._v(" "),
                        _c("i", { staticClass: "dropdown icon" })
                      ]
                    )
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "field" }, [
              _c("div", { staticClass: "title" }, [
                _c("h4", [
                  _c("i", { staticClass: "dropdown icon" }),
                  _vm._v(
                    "\n            " +
                      _vm._s(_vm.t("optionsIsolationExcludeTargetDomains")) +
                      "\n          "
                  )
                ])
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "content",
                  class: { "ui segment": !_vm.popup, "popup-margin": _vm.popup }
                },
                [
                  _c("div", { staticClass: "field" }, [
                    _c(
                      "form",
                      {
                        staticClass: "ui form",
                        attrs: { id: "isolationGlobalExcludeDomainsForm" }
                      },
                      [
                        _c("domain-pattern", {
                          attrs: {
                            id: "isolationGlobalExcludeDomainPattern",
                            tooltip: !_vm.popup
                              ? { position: "top left" }
                              : { hidden: true },
                            "domain-pattern": _vm.excludeDomainPattern,
                            exclusion: true
                          },
                          on: {
                            "update:domainPattern": function($event) {
                              _vm.excludeDomainPattern = $event
                            },
                            "update:domain-pattern": function($event) {
                              _vm.excludeDomainPattern = $event
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "field" }, [
                          _c("button", { staticClass: "ui button primary" }, [
                            _vm._v(
                              "\n                  " +
                                _vm._s(_vm.t("optionsIsolationExclude")) +
                                "\n                "
                            )
                          ])
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticStyle: { "margin-top": "20px" } }, [
                      !Object.keys(_vm.preferences.isolation.global.excluded)
                        .length
                        ? _c("div", [
                            _vm._v(
                              "\n                " +
                                _vm._s(
                                  _vm.t("optionsIsolationNoDomainsExcluded")
                                ) +
                                "\n              "
                            )
                          ])
                        : _c(
                            "div",
                            _vm._l(
                              _vm.preferences.isolation.global.excluded,
                              function(_, excludedDomainPattern) {
                                return _c(
                                  "div",
                                  { key: excludedDomainPattern },
                                  [
                                    _c("div", {
                                      staticStyle: { "margin-top": "5px" }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      {
                                        staticStyle: {
                                          color: "red",
                                          cursor: "pointer"
                                        },
                                        attrs: {
                                          "data-tooltip": _vm.t(
                                            "optionsIsolationPerDomainRemove",
                                            excludedDomainPattern
                                          ),
                                          "data-position": "right center"
                                        },
                                        on: {
                                          click: function($event) {
                                            return _vm.removeExcludedDomain(
                                              excludedDomainPattern
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _c("i", {
                                          staticClass: "icon-trash-empty"
                                        })
                                      ]
                                    ),
                                    _vm._v(
                                      "\n                  " +
                                        _vm._s(excludedDomainPattern) +
                                        "\n                "
                                    )
                                  ]
                                )
                              }
                            ),
                            0
                          )
                    ])
                  ])
                ]
              )
            ])
          ]
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/isolation/global.vue?vue&type=template&id=75e4b3fb&


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/isolation/perdomain.vue?vue&type=template&id=2c4166f9&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        { name: "show", rawName: "v-show", value: _vm.show, expression: "show" }
      ],
      attrs: { id: "isolationDomain" }
    },
    [
      _c("div", { staticClass: "ui form" }, [
        _c(
          "form",
          { attrs: { id: "isolationDomainForm" } },
          [
            _c("domain-pattern", {
              attrs: {
                id: "isolationDomainPattern",
                tooltip: !_vm.popup ? undefined : { hidden: true },
                "domain-pattern": _vm.domain.pattern
              },
              on: {
                "update:domainPattern": function($event) {
                  return _vm.$set(_vm.domain, "pattern", $event)
                },
                "update:domain-pattern": function($event) {
                  return _vm.$set(_vm.domain, "pattern", $event)
                }
              }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "ui accordion",
            staticStyle: { "margin-top": "15px" },
            style: _vm.empty ? "opacity: 0.3; pointer-events: none" : "",
            attrs: { id: "isolationPerDomainAccordion" }
          },
          [
            _c("div", { staticClass: "title" }, [
              _c("h4", [
                _c("i", { staticClass: "dropdown icon" }),
                _vm._v(
                  "\n          " +
                    _vm._s(_vm.t("optionsIsolationPerDomainAlwaysOpenIn")) +
                    "\n        "
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "content",
                class: { "ui segment": !_vm.popup, "popup-margin": _vm.popup }
              },
              [
                _c("div", [
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.domain.always.action,
                          expression: "domain.always.action"
                        }
                      ],
                      staticClass: "ui fluid dropdown",
                      attrs: { id: "isolationDomainAlways" },
                      on: {
                        change: function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.$set(
                            _vm.domain.always,
                            "action",
                            $event.target.multiple
                              ? $$selectedVal
                              : $$selectedVal[0]
                          )
                        }
                      }
                    },
                    [
                      _c("option", { attrs: { value: "disabled" } }, [
                        _vm._v(
                          "\n              " +
                            _vm._s(_vm.t("optionsIsolationDisabled")) +
                            "\n            "
                        )
                      ]),
                      _vm._v(" "),
                      _c("option", { attrs: { value: "enabled" } }, [
                        _vm._v(
                          "\n              " +
                            _vm._s(_vm.t("optionsIsolationEnabled")) +
                            "\n            "
                        )
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.domain.always.action === "enabled",
                          expression: "domain.always.action === 'enabled'"
                        }
                      ]
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "ui checkbox",
                          staticStyle: { "margin-top": "14px" }
                        },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.domain.always.allowedInPermanent,
                                expression: "domain.always.allowedInPermanent"
                              }
                            ],
                            attrs: { type: "checkbox" },
                            domProps: {
                              checked: Array.isArray(
                                _vm.domain.always.allowedInPermanent
                              )
                                ? _vm._i(
                                    _vm.domain.always.allowedInPermanent,
                                    null
                                  ) > -1
                                : _vm.domain.always.allowedInPermanent
                            },
                            on: {
                              change: function($event) {
                                var $$a = _vm.domain.always.allowedInPermanent,
                                  $$el = $event.target,
                                  $$c = $$el.checked ? true : false
                                if (Array.isArray($$a)) {
                                  var $$v = null,
                                    $$i = _vm._i($$a, $$v)
                                  if ($$el.checked) {
                                    $$i < 0 &&
                                      _vm.$set(
                                        _vm.domain.always,
                                        "allowedInPermanent",
                                        $$a.concat([$$v])
                                      )
                                  } else {
                                    $$i > -1 &&
                                      _vm.$set(
                                        _vm.domain.always,
                                        "allowedInPermanent",
                                        $$a
                                          .slice(0, $$i)
                                          .concat($$a.slice($$i + 1))
                                      )
                                  }
                                } else {
                                  _vm.$set(
                                    _vm.domain.always,
                                    "allowedInPermanent",
                                    $$c
                                  )
                                }
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", [
                            _vm._v(
                              "\n                " +
                                _vm._s(
                                  !_vm.popup
                                    ? _vm.t(
                                        "optionsIsolationPerDomainDisableIfNavPermContainer"
                                      )
                                    : _vm.t(
                                        "optionsIsolationPerDomainDisableIfPermContainer"
                                      )
                                ) +
                                "\n              "
                            )
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c("div"),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass: "ui checkbox",
                          staticStyle: { "margin-top": "14px" }
                        },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.domain.always.allowedInTemporary,
                                expression: "domain.always.allowedInTemporary"
                              }
                            ],
                            attrs: { type: "checkbox" },
                            domProps: {
                              checked: Array.isArray(
                                _vm.domain.always.allowedInTemporary
                              )
                                ? _vm._i(
                                    _vm.domain.always.allowedInTemporary,
                                    null
                                  ) > -1
                                : _vm.domain.always.allowedInTemporary
                            },
                            on: {
                              change: function($event) {
                                var $$a = _vm.domain.always.allowedInTemporary,
                                  $$el = $event.target,
                                  $$c = $$el.checked ? true : false
                                if (Array.isArray($$a)) {
                                  var $$v = null,
                                    $$i = _vm._i($$a, $$v)
                                  if ($$el.checked) {
                                    $$i < 0 &&
                                      _vm.$set(
                                        _vm.domain.always,
                                        "allowedInTemporary",
                                        $$a.concat([$$v])
                                      )
                                  } else {
                                    $$i > -1 &&
                                      _vm.$set(
                                        _vm.domain.always,
                                        "allowedInTemporary",
                                        $$a
                                          .slice(0, $$i)
                                          .concat($$a.slice($$i + 1))
                                      )
                                  }
                                } else {
                                  _vm.$set(
                                    _vm.domain.always,
                                    "allowedInTemporary",
                                    $$c
                                  )
                                }
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("label", [
                            _vm._v(
                              "\n                " +
                                _vm._s(
                                  !_vm.popup
                                    ? _vm.t(
                                        "optionsIsolationPerDomainDisableIfNavTempContainer"
                                      )
                                    : _vm.t(
                                        "optionsIsolationPerDomainDisableIfTempContainer"
                                      )
                                ) +
                                "\n              "
                            )
                          ])
                        ]
                      )
                    ]
                  )
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "title" }, [
              _c("h4", [
                _c("i", { staticClass: "dropdown icon" }),
                _vm._v(
                  "\n          " +
                    _vm._s(_vm.t("optionsIsolationNavigation")) +
                    "\n        "
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "content",
                class: { "ui segment": !_vm.popup, "popup-margin": _vm.popup }
              },
              [
                _c("settings", {
                  attrs: {
                    label: _vm.t("optionsIsolationTargetDomain"),
                    perdomain: true,
                    action: _vm.domain.navigation.action
                  },
                  on: {
                    "update:action": function($event) {
                      return _vm.$set(_vm.domain.navigation, "action", $event)
                    }
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "title" }, [
              _c("h4", [
                _c("i", { staticClass: "dropdown icon" }),
                _vm._v(
                  "\n          " +
                    _vm._s(_vm.t("optionsIsolationMouseClick")) +
                    "\n        "
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "content",
                class: { "ui segment": !_vm.popup, "popup-margin": _vm.popup }
              },
              [
                _c("settings", {
                  attrs: {
                    label: _vm.t("optionsIsolationMouseClickMiddleMouse"),
                    perdomain: true,
                    action: _vm.domain.mouseClick.middle.action
                  },
                  on: {
                    "update:action": function($event) {
                      return _vm.$set(
                        _vm.domain.mouseClick.middle,
                        "action",
                        $event
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _c("settings", {
                  attrs: {
                    label: _vm.t("optionsIsolationMouseClickCtrlLeftMouse"),
                    perdomain: true,
                    action: _vm.domain.mouseClick.ctrlleft.action
                  },
                  on: {
                    "update:action": function($event) {
                      return _vm.$set(
                        _vm.domain.mouseClick.ctrlleft,
                        "action",
                        $event
                      )
                    }
                  }
                }),
                _vm._v(" "),
                _c("settings", {
                  attrs: {
                    label: _vm.t("optionsIsolationMouseClickLeftMouse"),
                    perdomain: true,
                    action: _vm.domain.mouseClick.left.action
                  },
                  on: {
                    "update:action": function($event) {
                      return _vm.$set(
                        _vm.domain.mouseClick.left,
                        "action",
                        $event
                      )
                    }
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "title" }, [
              _c("h4", [
                _c("i", { staticClass: "dropdown icon" }),
                _vm._v(
                  "\n          " +
                    _vm._s(_vm.t("optionsIsolationExcludeTargetDomains")) +
                    "\n        "
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "content popup-exclude-margin",
                class: { "ui segment": !_vm.popup, "popup-margin": _vm.popup }
              },
              [
                _c("div", [
                  _c("div", { staticClass: "field" }, [
                    _c(
                      "form",
                      {
                        staticClass: "ui form",
                        attrs: { id: "isolationDomainExcludeDomainsForm" }
                      },
                      [
                        _c("domain-pattern", {
                          attrs: {
                            id: "isolationDomainExcludeDomainPattern",
                            tooltip: !_vm.popup
                              ? { position: "top left" }
                              : { hidden: true },
                            "domain-pattern": _vm.excludeDomainPattern,
                            exclusion: true
                          },
                          on: {
                            "update:domainPattern": function($event) {
                              _vm.excludeDomainPattern = $event
                            },
                            "update:domain-pattern": function($event) {
                              _vm.excludeDomainPattern = $event
                            }
                          }
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "field" }, [
                          _c("button", { staticClass: "ui button primary" }, [
                            _vm._v(
                              "\n                  " +
                                _vm._s(_vm.t("optionsIsolationExclude")) +
                                "\n                "
                            )
                          ])
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("div", { staticStyle: { "margin-top": "20px" } }, [
                      !Object.keys(_vm.domain.excluded).length
                        ? _c("div", [
                            _vm._v(
                              "\n                " +
                                _vm._s(
                                  _vm.t("optionsIsolationNoDomainsExcluded")
                                ) +
                                "\n              "
                            )
                          ])
                        : _c(
                            "div",
                            _vm._l(_vm.domain.excluded, function(
                              _,
                              excludedDomainPattern
                            ) {
                              return _c("div", { key: excludedDomainPattern }, [
                                _c("div", {
                                  staticStyle: { "margin-top": "5px" }
                                }),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    staticStyle: {
                                      "margin-top": "10px",
                                      color: "red",
                                      cursor: "pointer"
                                    },
                                    attrs: {
                                      "data-tooltip": _vm.t(
                                        "optionsIsolationPerDomainRemove",
                                        excludedDomainPattern
                                      )
                                    },
                                    on: {
                                      click: function($event) {
                                        return _vm.removeExcludedDomain(
                                          excludedDomainPattern
                                        )
                                      }
                                    }
                                  },
                                  [_c("i", { staticClass: "icon-trash-empty" })]
                                ),
                                _vm._v(
                                  "\n                  " +
                                    _vm._s(excludedDomainPattern) +
                                    "\n                "
                                )
                              ])
                            }),
                            0
                          )
                    ])
                  ])
                ])
              ]
            )
          ]
        )
      ]),
      _vm._v(" "),
      _c("br"),
      _vm._v(" "),
      _c("div", { staticClass: "field" }, [
        _c(
          "button",
          {
            staticClass: "ui button primary",
            attrs: {
              form: "isolationDomainForm",
              disabled: !_vm.domain.pattern.trim()
            }
          },
          [
            _vm.editing
              ? _c(
                  "span",
                  [
                    _c("transition", { attrs: { name: "fade" } }, [
                      _vm.saved
                        ? _c("span", [
                            _c("i", { staticClass: "check circle icon" }),
                            _vm._v("\n            Saved\n          ")
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.saved
                        ? _c("span", [
                            _vm._v(
                              "\n            " +
                                _vm._s(
                                  _vm.t(
                                    "optionsIsolationPerDomainDoneEditing",
                                    _vm.domain.pattern
                                  )
                                ) +
                                "\n          "
                            )
                          ])
                        : _vm._e()
                    ])
                  ],
                  1
                )
              : _c("span", [
                  _vm._v(
                    "\n        " +
                      _vm._s(
                        _vm.t(
                          "optionsIsolationPerDomainAdd",
                          _vm.domain.pattern
                        )
                      ) +
                      "\n      "
                  )
                ])
          ]
        )
      ]),
      _vm._v(" "),
      _c("br"),
      _vm._v(" "),
      _c(
        "div",
        {
          class: { "ui accordion": _vm.popup },
          attrs: { id: "isolationDomainsAccordion" }
        },
        [
          !Object.keys(_vm.isolationDomains).length &&
          !_vm.isolationDomainFilter
            ? _c(
                "div",
                {
                  class: { content: _vm.popup },
                  staticStyle: { "margin-top": "10px" }
                },
                [
                  _vm._v(
                    "\n      " +
                      _vm._s(
                        _vm.t("optionsIsolationPerDomainNoIsolatedDomainsAdded")
                      ) +
                      "\n    "
                  )
                ]
              )
            : _c("div", { class: { content: _vm.popup } }, [
                _c("div", { class: { title: _vm.popup } }, [
                  _vm.popup
                    ? _c("i", { staticClass: "dropdown icon" })
                    : _vm._e(),
                  _vm._v(" "),
                  Object.keys(_vm.isolationDomains).length > 1 ||
                  _vm.isolationDomainFilter
                    ? _c(
                        "span",
                        {
                          staticClass: "ui icon mini input",
                          staticStyle: { "margin-right": "10px" }
                        },
                        [
                          _c("input", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.isolationDomainFilter,
                                expression: "isolationDomainFilter"
                              }
                            ],
                            ref: "isolationDomainFilter",
                            attrs: {
                              type: "text",
                              size: "15",
                              placeholder: _vm.t(
                                "optionsIsolationPerDomainFilterIsolatedDomains"
                              )
                            },
                            domProps: { value: _vm.isolationDomainFilter },
                            on: {
                              focus: _vm.expandIsolationDomainFilter,
                              click: _vm.expandIsolationDomainFilter,
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.isolationDomainFilter = $event.target.value
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("i", {
                            staticClass: "circular search link icon",
                            on: { click: _vm.focusIsolationDomainFilter }
                          })
                        ]
                      )
                    : _c("span", [
                        _c("strong", [
                          _vm._v(
                            _vm._s(
                              _vm.t("optionsIsolationPerDomainIsolatedDomains")
                            )
                          )
                        ])
                      ])
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { class: { content: _vm.popup } },
                  [
                    _c("div", { staticStyle: { "margin-top": "5px" } }),
                    _vm._v(" "),
                    _c(
                      "draggable",
                      {
                        attrs: { group: "isolationDomains" },
                        on: { change: _vm.move },
                        model: {
                          value: _vm.isolationDomains,
                          callback: function($$v) {
                            _vm.isolationDomains = $$v
                          },
                          expression: "isolationDomains"
                        }
                      },
                      _vm._l(_vm.isolationDomains, function(isolatedDomain) {
                        return _c("div", { key: isolatedDomain.pattern }, [
                          _c(
                            "span",
                            {
                              staticStyle: { cursor: "pointer" },
                              attrs: {
                                "data-tooltip": _vm.t(
                                  "optionsIsolationPerDomainEdit",
                                  isolatedDomain.pattern
                                ),
                                "data-position": "right center"
                              },
                              on: {
                                click: function($event) {
                                  return _vm.edit(isolatedDomain._index)
                                }
                              }
                            },
                            [
                              _c("i", {
                                staticClass: "icon-pencil",
                                staticStyle: { color: "#2185d0" }
                              })
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticStyle: { color: "red", cursor: "pointer" },
                              attrs: {
                                "data-tooltip": _vm.t(
                                  "optionsIsolationPerDomainRemove",
                                  isolatedDomain.pattern
                                ),
                                "data-position": "right center"
                              },
                              on: {
                                click: function($event) {
                                  return _vm.remove(
                                    isolatedDomain._index,
                                    isolatedDomain.pattern
                                  )
                                }
                              }
                            },
                            [_c("i", { staticClass: "icon-trash-empty" })]
                          ),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              style:
                                _vm.isolationDomains.length > 1
                                  ? "cursor: grab"
                                  : "",
                              attrs: {
                                "data-tooltip":
                                  !_vm.popup && _vm.isolationDomains.length > 1
                                    ? _vm.t(
                                        "optionsIsolationPerDomainDragTooltip"
                                      )
                                    : undefined,
                                "data-position": "right center"
                              }
                            },
                            [
                              _vm.isolationDomains.length > 1
                                ? _c("i", {
                                    staticClass: "hand rock icon",
                                    staticStyle: {
                                      color: "#2185d0",
                                      "margin-left": "3px",
                                      opacity: "0.8"
                                    }
                                  })
                                : _vm._e()
                            ]
                          ),
                          _vm._v(
                            "\n            " +
                              _vm._s(isolatedDomain.pattern) +
                              "\n          "
                          )
                        ])
                      }),
                      0
                    )
                  ],
                  1
                )
              ])
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/isolation/perdomain.vue?vue&type=template&id=2c4166f9&


/***/ }),
/* 60 */,
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/statistics.vue?vue&type=template&id=24b4a24c&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { attrs: { id: "statistics" } }, [
    _c(
      "div",
      {
        staticClass: "ui",
        class: { "two column grid": !_vm.popup, "one column grid": _vm.popup }
      },
      [
        _c("div", { staticClass: "column" }, [
          _c("div", { staticClass: "ui raised segment" }, [
            _c("div", { staticClass: "ui green ribbon label" }, [
              _vm._v("\n          Deleted\n        ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "ui horizontal statistics" }, [
              _c("div", { staticClass: "ui green statistic" }, [
                _c(
                  "div",
                  { staticClass: "value", attrs: { id: "containersDeleted" } },
                  [
                    _vm._v(
                      "\n              " +
                        _vm._s(_vm.statistics.containersDeleted) +
                        "\n            "
                    )
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "label" }, [
                  _vm._v(
                    "\n              " +
                      _vm._s(!_vm.popup ? "Temporary Containers" : "tmp") +
                      "\n            "
                  )
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "ui green statistic" }, [
                _c(
                  "div",
                  { staticClass: "value", attrs: { id: "cookiesDeleted" } },
                  [
                    _vm._v(
                      "\n              " +
                        _vm._s(_vm.statistics.cookiesDeleted) +
                        "\n            "
                    )
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "label" }, [
                  _vm._v("\n              Cookies\n            ")
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "ui green statistic" }, [
                _c(
                  "div",
                  { staticClass: "value", attrs: { id: "cacheDeleted" } },
                  [
                    _vm._v(
                      "\n              " +
                        _vm._s(
                          _vm.formatBytes(_vm.statistics.cacheDeleted, 0)
                        ) +
                        "\n            "
                    )
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "label" }, [
                  _vm._v("\n              Cache\n            ")
                ])
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        !_vm.popup
          ? _c("div", { staticClass: "column" }, [
              _c(
                "div",
                {
                  staticClass: "ui inverted segment",
                  class: { hidden: !_vm.preferences.deletesHistory.statistics },
                  attrs: { id: "deletesHistoryStatistics" }
                },
                [
                  _c("div", { staticClass: "ui horizontal statistics" }, [
                    _c("div", { staticClass: "ui purple ribbon label" }, [
                      _vm._v("\n            Deleted\n          ")
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "ui purple inverted statistic" }, [
                      _c(
                        "div",
                        {
                          staticClass: "value",
                          attrs: { id: "deletesHistoryContainersDeleted" }
                        },
                        [
                          _vm._v(
                            "\n              " +
                              _vm._s(
                                _vm.statistics.deletesHistory.containersDeleted
                              ) +
                              "\n            "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "label" }, [
                        _vm._v(
                          "\n              Temporary Containers\n            "
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "ui purple inverted statistic" }, [
                      _c(
                        "div",
                        {
                          staticClass: "value",
                          attrs: { id: "deletesHistoryCookiesDeleted" }
                        },
                        [
                          _vm._v(
                            "\n              " +
                              _vm._s(
                                _vm.statistics.deletesHistory.cookiesDeleted
                              ) +
                              "\n            "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "label" }, [
                        _vm._v("\n              Cookies\n            ")
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "ui purple inverted statistic" }, [
                      _c(
                        "div",
                        {
                          staticClass: "value",
                          attrs: { id: "deletesHistoryUrlsDeleted" }
                        },
                        [
                          _vm._v(
                            "\n              " +
                              _vm._s(
                                _vm.statistics.deletesHistory.urlsDeleted
                              ) +
                              "\n            "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "label" }, [
                        _vm._v(
                          "\n              URLs from History\n            "
                        )
                      ])
                    ])
                  ])
                ]
              )
            ])
          : _vm._e()
      ]
    ),
    _vm._v(" "),
    _c("br"),
    _vm._v(" "),
    _c("div", { staticClass: "ui form" }, [
      _c("div", { staticClass: "field", attrs: { id: "statisticsField" } }, [
        _c("div", { staticClass: "ui checkbox" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.preferences.statistics,
                expression: "preferences.statistics"
              }
            ],
            attrs: { id: "statisticsCheckbox", type: "checkbox" },
            domProps: {
              checked: Array.isArray(_vm.preferences.statistics)
                ? _vm._i(_vm.preferences.statistics, null) > -1
                : _vm.preferences.statistics
            },
            on: {
              change: function($event) {
                var $$a = _vm.preferences.statistics,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false
                if (Array.isArray($$a)) {
                  var $$v = null,
                    $$i = _vm._i($$a, $$v)
                  if ($$el.checked) {
                    $$i < 0 &&
                      _vm.$set(_vm.preferences, "statistics", $$a.concat([$$v]))
                  } else {
                    $$i > -1 &&
                      _vm.$set(
                        _vm.preferences,
                        "statistics",
                        $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                      )
                  }
                } else {
                  _vm.$set(_vm.preferences, "statistics", $$c)
                }
              }
            }
          }),
          _vm._v(" "),
          _c("label", [
            _vm._v(
              "\n          " +
                _vm._s(
                  !_vm.popup
                    ? "Collect local statistics about Temporary Containers"
                    : "Collect local statistics"
                ) +
                "\n        "
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "field",
          class: { hidden: !_vm.permissions.history },
          attrs: { id: "deletesHistoryStatisticsField" }
        },
        [
          _c("div", { staticClass: "ui checkbox" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.preferences.deletesHistory.statistics,
                  expression: "preferences.deletesHistory.statistics"
                }
              ],
              attrs: {
                id: "deletesHistoryStatisticsCheckbox",
                type: "checkbox"
              },
              domProps: {
                checked: Array.isArray(
                  _vm.preferences.deletesHistory.statistics
                )
                  ? _vm._i(_vm.preferences.deletesHistory.statistics, null) > -1
                  : _vm.preferences.deletesHistory.statistics
              },
              on: {
                change: function($event) {
                  var $$a = _vm.preferences.deletesHistory.statistics,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v)
                    if ($$el.checked) {
                      $$i < 0 &&
                        _vm.$set(
                          _vm.preferences.deletesHistory,
                          "statistics",
                          $$a.concat([$$v])
                        )
                    } else {
                      $$i > -1 &&
                        _vm.$set(
                          _vm.preferences.deletesHistory,
                          "statistics",
                          $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                        )
                    }
                  } else {
                    _vm.$set(_vm.preferences.deletesHistory, "statistics", $$c)
                  }
                }
              }
            }),
            _vm._v(" "),
            _c("label", [
              _vm._v(
                "\n          " +
                  _vm._s(
                    !_vm.popup
                      ? 'Collect local statistics about "Deletes History Temporary Containers"'
                      : 'Collect local "Deletes History" statistics'
                  ) +
                  "\n        "
              )
            ])
          ])
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "field" }, [
        _c(
          "button",
          {
            staticClass: "ui button negative primary",
            attrs: { id: "resetStatistics" },
            on: { click: _vm.resetStatistics }
          },
          [_vm._v("\n        Reset Statistics\n      ")]
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/statistics.vue?vue&type=template&id=24b4a24c&


/***/ }),
/* 62 */,
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/message.vue?vue&type=template&id=5ea5c240&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.message
      ? _c(
          "div",
          {
            staticClass: "ui message",
            class: { positive: !_vm.error, negative: _vm.error },
            attrs: { id: "message" }
          },
          [_vm._v("\n    " + _vm._s(_vm.message) + "\n  ")]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.initializeLoader ? _c("div", [_vm._m(0)]) : _vm._e(),
    _vm._v(" "),
    _vm.initializeError
      ? _c("div", [
          _c("div", { staticClass: "ui negative message" }, [
            _c("h4", [
              _vm._v(
                "\n        Temporary Containers didn't initialize correctly. Sorry about that.\n      "
              )
            ]),
            _vm._v(" "),
            _c("div", { staticStyle: { "margin-top": "30px" } }, [
              _vm._v(
                "\n        Here are some things you could do now. Might also want to try\n        restarting Firefox.\n      "
              )
            ]),
            _vm._v(" "),
            _c("div", { staticStyle: { "margin-top": "15px" } }, [
              _c(
                "button",
                {
                  staticClass: "ui small primary button",
                  on: { click: _vm.reload }
                },
                [
                  _c("i", { staticClass: "redo icon" }),
                  _vm._v(
                    "\n          Reload Add-on and hope the best\n        "
                  )
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticStyle: { "margin-top": "15px" } }, [
              _c(
                "button",
                {
                  staticClass: "ui small primary button",
                  on: { click: _vm.debug }
                },
                [
                  _c("i", { staticClass: "bug icon" }),
                  _vm._v(
                    "\n          Open Debug-Log Instructions and GitHub Issues to help fix this error\n        "
                  )
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticStyle: { "margin-top": "15px" } }, [
              _c(
                "button",
                {
                  staticClass: "ui small primary button",
                  on: { click: _vm.uninstall }
                },
                [
                  _c("i", { staticClass: "icon-trash-empty" }),
                  _vm._v(
                    "\n          Uninstall Add-on and open it on addons.mozilla.org, where you could\n          try installing again\n        "
                  )
                ]
              )
            ]),
            _vm._v(" "),
            _vm.initializeErrorMessage
              ? _c("div", { staticStyle: { "margin-top": "30px" } }, [
                  _c("div", { staticClass: "ui divider" }),
                  _vm._v(
                    "\n        The following error message was observed:\n        "
                  ),
                  _c("div", { staticStyle: { "margin-top": "15px" } }, [
                    _vm._v(
                      "\n          " +
                        _vm._s(_vm.initializeErrorMessage) +
                        "\n        "
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticStyle: { "margin-top": "15px" } }, [
                    _c(
                      "a",
                      {
                        staticClass: "ui primary button",
                        attrs: {
                          href:
                            "https://github.com/stoically/temporary-containers/issues/new?title=Initializing+failed&body=" +
                            encodeURIComponent(_vm.initializeErrorMessage),
                          target: "_blank"
                        }
                      },
                      [
                        _vm._v(
                          "\n            Report Error Message as GitHub Issue\n          "
                        )
                      ]
                    )
                  ])
                ])
              : _vm._e()
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "ui icon compact message" }, [
      _c("i", { staticClass: "notched circle loading icon" }),
      _vm._v(" "),
      _c("div", { staticClass: "content" }, [
        _c("div", { staticClass: "header" }, [
          _vm._v("\n          Loading\n        ")
        ]),
        _vm._v(" "),
        _c("p", [
          _vm._v(
            "\n          You should never see this - and if you do, it'll probably result in\n          an error, but maybe you're lucky. Let's just wait about 30 seconds\n          to find out.\n        "
          )
        ])
      ])
    ])
  }
]
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/message.vue?vue&type=template&id=5ea5c240&


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/glossary/index.vue?vue&type=template&id=7bcbd0d8&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.app.initialized
    ? _c(
        "div",
        {
          ref: "glossary",
          staticClass: "ui popup glossary",
          staticStyle: { padding: "0" },
          on: { click: _vm.stop }
        },
        [
          _c(
            "div",
            { ref: "glossaryContainer", staticClass: "glossary-container" },
            [
              _c("div", { staticClass: "glossary-header" }, [
                _c("span", { staticClass: "glossary-header-title" }, [
                  _vm._v(_vm._s(_vm.active || _vm.origin))
                ]),
                _vm._v(" "),
                !["Automatic Mode", "Toolbar Popup"].includes(_vm.origin)
                  ? _c("span", [
                      _vm.historyPosition
                        ? _c("i", {
                            staticClass: "angle left icon glossary-history-btn",
                            on: { click: _vm.historyBack }
                          })
                        : _c("i", {
                            staticClass:
                              "angle left icon glossary-history-btn-inactive"
                          }),
                      _vm._v(" "),
                      _vm.history.length > 1 &&
                      _vm.historyPosition < _vm.history.length - 1
                        ? _c("i", {
                            staticClass:
                              "angle right icon glossary-history-btn",
                            on: { click: _vm.historyForward }
                          })
                        : _c("i", {
                            staticClass:
                              "angle right icon glossary-history-btn-inactive"
                          })
                    ])
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("div", {
                staticClass: "ui divider",
                staticStyle: { margin: "0" }
              }),
              _vm._v(" "),
              _c("div", { staticClass: "glossary-content" }, [
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Navigation",
                        expression: "active === 'Navigation'"
                      }
                    ]
                  },
                  [
                    _vm._v("\n        Opening "),
                    _c("glossary-link", {
                      attrs: { to: "Target Domain", text: "Target Domains" }
                    }),
                    _vm._v(
                      " in\n        tabs, or new tabs, through e.g. address bar or\n        "
                    ),
                    _c("glossary-link", { attrs: { to: "Mouse Click" } }),
                    _vm._v(" "),
                    _c("ul", [
                      _vm.section === "Per Domain"
                        ? _c(
                            "li",
                            [
                              _c("glossary-link", {
                                attrs: { to: "Use Global" }
                              })
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "li",
                        [_c("glossary-link", { attrs: { to: "Never" } })],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        [
                          _c("glossary-link", {
                            attrs: {
                              to: "Different from Tab Domain & Subdomains"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        [
                          _c("glossary-link", {
                            attrs: { to: "Different from Tab Domain" }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        [_c("glossary-link", { attrs: { to: "Always" } })],
                        1
                      )
                    ])
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Mouse Click",
                        expression: "active === 'Mouse Click'"
                      }
                    ]
                  },
                  [
                    _vm._v("\n        Clicking links on websites in "),
                    _c("glossary-link", { attrs: { to: "Current Tab" } }),
                    _vm._v(" which\n        result in "),
                    _c("glossary-link", { attrs: { to: "Navigation" } }),
                    _vm._v(" to\n        "),
                    _c("glossary-link", { attrs: { to: "Target Domain" } }),
                    _c("br"),
                    _vm._v(" "),
                    _c("ul", [
                      _vm.section === "Per Domain"
                        ? _c(
                            "li",
                            [
                              _c("glossary-link", {
                                attrs: { to: "Use Global" }
                              })
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "li",
                        [_c("glossary-link", { attrs: { to: "Never" } })],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        [
                          _c("glossary-link", {
                            attrs: {
                              to: "Different from Tab Domain & Subdomains"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        [
                          _c("glossary-link", {
                            attrs: { to: "Different from Tab Domain" }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        [_c("glossary-link", { attrs: { to: "Always" } })],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticStyle: { "font-size": "12px" } }, [
                      _vm._v(
                        "\n          Note: With Navigation Isolation configured, you don't need to\n          configure Mouse Click additionally. Also, not every Mouse Click can\n          get catched, since some websites execute arbitrary logic\n          (JavaScript) on Mouse Click\n        "
                      )
                    ])
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Current Tab",
                        expression: "active === 'Current Tab'"
                      }
                    ]
                  },
                  [_vm._v("\n        Active/Selected tab\n      ")]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Target Domain",
                        expression: "active === 'Target Domain'"
                      }
                    ]
                  },
                  [
                    _c("glossary-link", { attrs: { to: "Domain" } }),
                    _vm._v(" which a tab\n        "),
                    _c("glossary-link", {
                      attrs: { to: "Navigation", text: "navigates" }
                    }),
                    _vm._v(" to\n      ")
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Isolation",
                        expression: "active === 'Isolation'"
                      }
                    ]
                  },
                  [
                    _vm._v("\n        Cancel "),
                    _c("glossary-link", { attrs: { to: "Navigation" } }),
                    _vm._v(" and open\n        "),
                    _c("glossary-link", { attrs: { to: "Target Domain" } }),
                    _vm._v(" in new Temporay Container tab\n      ")
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Global",
                        expression: "active === 'Global'"
                      }
                    ]
                  },
                  [
                    _vm._v(
                      "\n        Configurations apply to all tabs and result in\n        "
                    ),
                    _c("glossary-link", { attrs: { to: "Isolation" } }),
                    _vm._v(" if they match\n        "),
                    _c("ul", [
                      _c(
                        "li",
                        [_c("glossary-link", { attrs: { to: "Navigation" } })],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        [_c("glossary-link", { attrs: { to: "Mouse Click" } })],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        [
                          _c("glossary-link", {
                            attrs: { to: "Exclude Permanent Containers" }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        [
                          _c("glossary-link", {
                            attrs: { to: "Exclude Target Domains" }
                          })
                        ],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        attrs: { href: "#" },
                        on: {
                          click: function($event) {
                            return _vm.external(
                              "https://github.com/stoically/temporary-containers/wiki/Global-Isolation"
                            )
                          }
                        }
                      },
                      [
                        _vm._v("\n          Learn more in the Wiki "),
                        _c("i", { staticClass: "linkify icon" })
                      ]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Per Domain",
                        expression: "active === 'Per Domain'"
                      }
                    ]
                  },
                  [
                    _vm._v(
                      "\n        Configurations that apply if the\n        "
                    ),
                    _c("glossary-link", { attrs: { to: "Target Domain" } }),
                    _vm._v(" matches the\n        "),
                    _c("glossary-link", { attrs: { to: "Domain Pattern" } }),
                    _vm._v(" "),
                    _c("ul", [
                      _c(
                        "li",
                        [
                          _c("glossary-link", {
                            attrs: { to: "Always open in" }
                          })
                        ],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(
                      "\n        Configurations that apply if the\n        "
                    ),
                    _c("glossary-link", { attrs: { to: "Tab Domain" } }),
                    _vm._v(" matches the\n        "),
                    _c("glossary-link", { attrs: { to: "Domain Pattern" } }),
                    _vm._v(" "),
                    _c("ul", [
                      _c(
                        "li",
                        [_c("glossary-link", { attrs: { to: "Navigation" } })],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        [_c("glossary-link", { attrs: { to: "Mouse Click" } })],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        [
                          _c("glossary-link", {
                            attrs: { to: "Exclude Target Domains" }
                          })
                        ],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        attrs: { href: "#" },
                        on: {
                          click: function($event) {
                            return _vm.external(
                              "https://github.com/stoically/temporary-containers/wiki/Per-Domain-Isolation"
                            )
                          }
                        }
                      },
                      [
                        _vm._v("\n          Learn more in the Wiki "),
                        _c("i", { staticClass: "linkify icon" })
                      ]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Domain",
                        expression: "active === 'Domain'"
                      }
                    ]
                  },
                  [
                    _vm._v(
                      '\n        "Web address", e.g. "example.com" or "www.example.com"\n      '
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Subdomain",
                        expression: "active === 'Subdomain'"
                      }
                    ]
                  },
                  [
                    _vm._v('\n        "Deeper levels" of a '),
                    _c("glossary-link", { attrs: { to: "Domain" } }),
                    _vm._v(
                      ', e.g.\n        "sub.example.com" or "foo.bar.example.com"\n      '
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Tab Domain",
                        expression: "active === 'Tab Domain'"
                      }
                    ]
                  },
                  [
                    _c("glossary-link", { attrs: { to: "Domain" } }),
                    _vm._v(" currently loaded in a tab\n      ")
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Never",
                        expression: "active === 'Never'"
                      }
                    ]
                  },
                  [
                    _vm._v(
                      "\n        Never matches and hence never results in\n        "
                    ),
                    _c("glossary-link", { attrs: { to: "Isolation" } })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value:
                          _vm.active ===
                          "Different from Tab Domain & Subdomains",
                        expression:
                          "active === 'Different from Tab Domain & Subdomains'"
                      }
                    ]
                  },
                  [
                    _c("glossary-link", { attrs: { to: "Target Domain" } }),
                    _vm._v(" is different from the\n        "),
                    _c("glossary-link", { attrs: { to: "Tab Domain" } }),
                    _vm._v(" and its\n        "),
                    _c("glossary-link", {
                      attrs: { to: "Subdomain", text: "Subdomains" }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Different from Tab Domain",
                        expression: "active === 'Different from Tab Domain'"
                      }
                    ]
                  },
                  [
                    _c("glossary-link", { attrs: { to: "Target Domain" } }),
                    _vm._v(" is different from the\n        "),
                    _c("glossary-link", { attrs: { to: "Tab Domain" } })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Always",
                        expression: "active === 'Always'"
                      }
                    ]
                  },
                  [
                    _vm._v("\n        Matches every "),
                    _c("glossary-link", { attrs: { to: "Navigation" } }),
                    _c("br"),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c("div", { staticStyle: { "font-size": "12px" } }, [
                      _vm._v(
                        "\n          Note: Not every on-website navigation is an actual navigation that\n          can be detected by the Add-on. This happens if websites load content\n          dynamically (with JavaScript), which is done often nowadays.\n        "
                      )
                    ])
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: ["Domain Pattern", "Exclusion Pattern"].includes(
                          _vm.active
                        ),
                        expression:
                          "['Domain Pattern', 'Exclusion Pattern'].includes(active)"
                      }
                    ]
                  },
                  [
                    _vm._v("\n        Can be one of "),
                    _c("glossary-link", { attrs: { to: "Domain" } }),
                    _vm._v(",\n        "),
                    _c("glossary-link", { attrs: { to: "Subdomain" } }),
                    _vm._v(",\n        "),
                    _c("glossary-link", { attrs: { to: "Glob/Wildcard" } }),
                    _vm._v(" or (advanced)\n        "),
                    _c("glossary-link", { attrs: { to: "RegExp" } })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Permanent Containers",
                        expression: "active === 'Permanent Containers'"
                      }
                    ]
                  },
                  [
                    _vm._v(
                      "\n        All containers that are neither Temporary nor the\n        "
                    ),
                    _c("glossary-link", { attrs: { to: "Default Container" } })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Default Container",
                        expression: "active === 'Default Container'"
                      }
                    ]
                  },
                  [_vm._v('\n        "No Container"\n      ')]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Use Global",
                        expression: "active === 'Use Global'"
                      }
                    ]
                  },
                  [
                    _vm._v(
                      "\n        Use the Global configuration accordingly\n      "
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Exclude Permanent Containers",
                        expression: "active === 'Exclude Permanent Containers'"
                      }
                    ]
                  },
                  [
                    _c("glossary-link", {
                      attrs: { to: "Navigation", text: "Navigations" }
                    }),
                    _vm._v(" in\n        "),
                    _c("glossary-link", {
                      attrs: { to: "Permanent Containers" }
                    }),
                    _vm._v(" added here will\n        "),
                    _c("glossary-link", { attrs: { to: "Never" } }),
                    _vm._v(" result in\n        "),
                    _c("glossary-link", { attrs: { to: "Isolation" } })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Exclude Target Domains",
                        expression: "active === 'Exclude Target Domains'"
                      }
                    ]
                  },
                  [
                    _c("glossary-link", {
                      attrs: { to: "Navigation", text: "Navigations" }
                    }),
                    _vm._v(" to\n        "),
                    _c("glossary-link", {
                      attrs: { to: "Target Domain", text: "Target Domains" }
                    }),
                    _vm._v(" matching\n        the\n        "),
                    _c("glossary-link", {
                      attrs: {
                        to: "Exclusion Pattern",
                        text: "Exclusion Patterns"
                      }
                    }),
                    _vm._v("\n        added here will "),
                    _c("glossary-link", { attrs: { to: "Never" } }),
                    _vm._v(" result in\n        "),
                    _c("glossary-link", { attrs: { to: "Isolation" } })
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Glob/Wildcard",
                        expression: "active === 'Glob/Wildcard'"
                      }
                    ]
                  },
                  [
                    _vm._v("\n        e.g. "),
                    _c("strong", [_vm._v("*.example.com")]),
                    _vm._v(" - means all example.com subdomains\n        "),
                    _c("br"),
                    _c("br"),
                    _vm._v(" "),
                    _c("strong", [_vm._v("*.example.com")]),
                    _vm._v(" would not match\n        "),
                    _c("strong", [_vm._v("example.com")]),
                    _vm._v(", so you might need two\n        "),
                    _c("glossary-link", {
                      attrs: { to: "Domain Pattern", text: "Domain Patterns" }
                    }),
                    _vm._v(".\n      ")
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "RegExp",
                        expression: "active === 'RegExp'"
                      }
                    ]
                  },
                  [
                    _vm._v("\n        Parsed as RegExp when"),
                    _c("br"),
                    _vm._v(" "),
                    _c("strong", [_vm._v("/pattern/flags")]),
                    _c("br"),
                    _vm._v(
                      "\n        is given and matches the full URL instead of just\n        "
                    ),
                    _c("glossary-link", { attrs: { to: "Domain" } }),
                    _vm._v(".\n      ")
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Always open in",
                        expression: "active === 'Always open in'"
                      }
                    ]
                  },
                  [
                    _c("strong", [_vm._v("Enabled:")]),
                    _vm._v(" "),
                    _c("glossary-link", {
                      attrs: { to: "Navigation", text: "Navigations" }
                    }),
                    _vm._v(
                      " where any of the\n        following matches will get\n        "
                    ),
                    _c("glossary-link", {
                      attrs: { to: "Isolation", text: "isolated" }
                    }),
                    _vm._v(" "),
                    _c("ul", [
                      _c("li", [_vm._v("Originates from a new tab")]),
                      _vm._v(" "),
                      _c(
                        "li",
                        [
                          _c("glossary-link", {
                            attrs: { to: "Target Domain" }
                          }),
                          _vm._v(
                            " doesn't match Domain Pattern\n            and is different from the\n            "
                          ),
                          _c("glossary-link", { attrs: { to: "Tab Domain" } })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        [
                          _vm._v("\n            Current container is "),
                          _c("glossary-link", {
                            attrs: { to: "Default Container" }
                          })
                        ],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c("strong", [_vm._v("Disabled:")]),
                    _vm._v(" No effect\n      ")
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Multi-Account Containers",
                        expression: "active === 'Multi-Account Containers'"
                      }
                    ]
                  },
                  [
                    _vm._v("\n        This applies to the\n        "),
                    _c(
                      "a",
                      {
                        attrs: { href: "#" },
                        on: {
                          click: function($event) {
                            return _vm.external(
                              "https://addons.mozilla.org/firefox/addon/multi-account-containers/"
                            )
                          }
                        }
                      },
                      [
                        _vm._v("\n          MAC Add-on "),
                        _c("i", { staticClass: "linkify icon" })
                      ]
                    ),
                    _vm._v(
                      ", which needs to be installed and configured for this to work. It's\n        not related to Per Domain Always open in.\n        "
                    ),
                    _c("br"),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c("strong", [_vm._v("Enabled:")]),
                    _vm._v(" "),
                    _c("glossary-link", {
                      attrs: { to: "Navigation", text: "Navigations" }
                    }),
                    _vm._v(" in\n        "),
                    _c("glossary-link", {
                      attrs: { to: "Permanent Containers" }
                    }),
                    _vm._v(" whose\n        "),
                    _c("glossary-link", { attrs: { to: "Target Domain" } }),
                    _vm._v(
                      ' isn\'t MAC-"Always open in"\n        assigned to that container get\n        '
                    ),
                    _c("glossary-link", {
                      attrs: { to: "Isolation", text: "isolated" }
                    }),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c("strong", [_vm._v("Disabled:")]),
                    _vm._v(" No effect\n        "),
                    _c("br"),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        attrs: { href: "#" },
                        on: {
                          click: function($event) {
                            return _vm.external(
                              "https://github.com/stoically/temporary-containers/wiki/Multi-Account-Containers-Isolation"
                            )
                          }
                        }
                      },
                      [
                        _vm._v("\n          Learn more in the Wiki "),
                        _c("i", { staticClass: "linkify icon" })
                      ]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Toolbar Popup",
                        expression: "active === 'Toolbar Popup'"
                      }
                    ]
                  },
                  [
                    _vm._v("\n        The popup lets you\n        "),
                    _c("ul", [
                      _c("li", [_vm._v("Open new Temporary Container")]),
                      _vm._v(" "),
                      _c("li", [_vm._v("Open Preferences/Options")]),
                      _vm._v(" "),
                      _c("li", [_vm._v("Configure Isolation")]),
                      _vm._v(" "),
                      _c("li", [_vm._v("Disable/Enable Isolation globally")]),
                      _vm._v(" "),
                      _c("li", [
                        _vm._v(
                          "Open current tab URL in new Temporary Container"
                        )
                      ]),
                      _vm._v(" "),
                      _c("li", [
                        _vm._v("Convert Temporary to Permanent Container")
                      ]),
                      _vm._v(" "),
                      _c("li", [
                        _vm._v("Convert Permanent to Temporary Container")
                      ]),
                      _vm._v(" "),
                      _c("li", [_vm._v("View Statistics")]),
                      _vm._v(" "),
                      _c(
                        "li",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.app.permissions.history,
                              expression: "app.permissions.history"
                            }
                          ]
                        },
                        [
                          _vm._v(
                            '\n            Open current tab URL in new "Deletes History Temporary Container"\n          '
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "li",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.app.permissions.history,
                              expression: "app.permissions.history"
                            }
                          ]
                        },
                        [
                          _vm._v(
                            '\n            Open new "Deletes History Temporary Container\n          '
                          )
                        ]
                      )
                    ]),
                    _vm._v(" "),
                    _c("span", { staticStyle: { "font-size": "13px" } }, [
                      _vm._v(
                        "\n          Note: You can change the default popup tab in the Advanced\n          preferences\n        "
                      )
                    ])
                  ]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.active === "Automatic Mode",
                        expression: "active === 'Automatic Mode'"
                      }
                    ]
                  },
                  [
                    _vm._v(
                      "\n        Automatically reopen tabs in new Temporary Containers when\n        "
                    ),
                    _vm._m(0),
                    _vm._v(" "),
                    _c("br"),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        attrs: { href: "#" },
                        on: {
                          click: function($event) {
                            return _vm.external(
                              "https://github.com/stoically/temporary-containers/wiki/Automatic-Mode"
                            )
                          }
                        }
                      },
                      [
                        _vm._v("\n          Learn more in the Wiki "),
                        _c("i", { staticClass: "linkify icon" })
                      ]
                    )
                  ]
                )
              ])
            ]
          )
        ]
      )
    : _vm._e()
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("ul", [
      _c("li", [_vm._v("Opening a new tab")]),
      _vm._v(" "),
      _c("li", [_vm._v("Tab tries to load a website in no container")]),
      _vm._v(" "),
      _c("li", [_vm._v("External program opens a link in the browser")])
    ])
  }
]
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/glossary/index.vue?vue&type=template&id=7bcbd0d8&


/***/ }),
/* 65 */,
/* 66 */,
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/domainpattern.vue?vue&type=template&id=0efbd1e5&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "div",
      staticClass: "field input",
      class: { disabled: _vm.disabled },
      attrs: { id: _vm.id + "Div" }
    },
    [
      _c("label", [
        !_vm.exclusion
          ? _c("span", [
              !_vm.glossary
                ? _c("span", [_vm._v(_vm._s(_vm.t("optionsDomainPattern")))])
                : _c("span", { attrs: { "data-glossary": "Domain Pattern" } })
            ])
          : _c("span", [
              _vm._v(
                "\n      " + _vm._s(_vm.t("optionsExclusionPattern")) + "\n    "
              )
            ])
      ]),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.domainPattern,
            expression: "domainPattern"
          }
        ],
        attrs: { id: _vm.id, type: "text" },
        domProps: { value: _vm.domainPattern },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.domainPattern = $event.target.value
          }
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/domainpattern.vue?vue&type=template&id=0efbd1e5&


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/isolation/settings.vue?vue&type=template&id=15a95c7b&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "field" }, [
    _c("label", [
      _vm.glossary
        ? _c("span", {
            attrs: {
              "data-glossary": _vm.glossary,
              "data-glossary-label": _vm.glossaryLabel,
              "data-glossary-section": _vm.perdomain ? "Per Domain" : "Global"
            }
          })
        : _c("span", [_vm._v("\n      " + _vm._s(_vm.label) + "\n    ")])
    ]),
    _vm._v(" "),
    _c(
      "select",
      {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.action,
            expression: "action"
          }
        ],
        staticClass: "ui fluid dropdown",
        on: {
          change: function($event) {
            var $$selectedVal = Array.prototype.filter
              .call($event.target.options, function(o) {
                return o.selected
              })
              .map(function(o) {
                var val = "_value" in o ? o._value : o.value
                return val
              })
            _vm.action = $event.target.multiple
              ? $$selectedVal
              : $$selectedVal[0]
          }
        }
      },
      [
        _vm.perdomain
          ? _c("option", { attrs: { value: "global" } }, [
              _vm._v(
                "\n      " +
                  _vm._s(_vm.t("optionsIsolationSettingsGlobal")) +
                  "\n    "
              )
            ])
          : _vm._e(),
        _vm._v(" "),
        _c("option", { attrs: { value: "never" } }, [
          _vm._v(
            "\n      " +
              _vm._s(_vm.t("optionsIsolationSettingsNever")) +
              "\n    "
          )
        ]),
        _vm._v(" "),
        _c("option", { attrs: { value: "notsamedomain" } }, [
          _vm._v(
            "\n      " +
              _vm._s(_vm.t("optionsIsolationSettingsNotSameDomain")) +
              "\n    "
          )
        ]),
        _vm._v(" "),
        _c("option", { attrs: { value: "notsamedomainexact" } }, [
          _vm._v(
            "\n      " +
              _vm._s(_vm.t("optionsIsolationSettingsNotSameDomainExact")) +
              "\n    "
          )
        ]),
        _vm._v(" "),
        _c("option", { attrs: { value: "always" } }, [
          _vm._v(
            "\n      " +
              _vm._s(_vm.t("optionsIsolationSettingsAlways")) +
              "\n    "
          )
        ])
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/isolation/settings.vue?vue&type=template&id=15a95c7b&


/***/ }),
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/ui/components/glossary/link.vue?vue&type=template&id=f310bd38&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    {
      staticClass: "glossary-link",
      on: {
        click: function($event) {
          return _vm.$root.$emit("show", _vm.to)
        }
      }
    },
    [_vm._v(_vm._s(_vm.text || _vm.to))]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/ui/components/glossary/link.vue?vue&type=template&id=f310bd38&


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global_vue_vue_type_template_id_75e4b3fb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);
/* harmony import */ var _global_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _global_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _global_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _global_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _global_vue_vue_type_template_id_75e4b3fb___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _global_vue_vue_type_template_id_75e4b3fb___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/isolation/global.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _settings_vue_vue_type_template_id_15a95c7b___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68);
/* harmony import */ var _settings_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _settings_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _settings_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _settings_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _settings_vue_vue_type_template_id_15a95c7b___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _settings_vue_vue_type_template_id_15a95c7b___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/isolation/settings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _perdomain_vue_vue_type_template_id_2c4166f9___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59);
/* harmony import */ var _perdomain_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _perdomain_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _perdomain_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _perdomain_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(126);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _perdomain_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _perdomain_vue_vue_type_template_id_2c4166f9___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _perdomain_vue_vue_type_template_id_2c4166f9___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/isolation/perdomain.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 77 */,
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _statistics_vue_vue_type_template_id_24b4a24c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61);
/* harmony import */ var _statistics_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _statistics_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _statistics_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _statistics_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _statistics_vue_vue_type_template_id_24b4a24c___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _statistics_vue_vue_type_template_id_24b4a24c___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/statistics.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _message_vue_vue_type_template_id_5ea5c240___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63);
/* harmony import */ var _message_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _message_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _message_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _message_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _message_vue_vue_type_template_id_5ea5c240___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _message_vue_vue_type_template_id_5ea5c240___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/message.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_7bcbd0d8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(64);
/* harmony import */ var _index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(137);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_7bcbd0d8___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _index_vue_vue_type_template_id_7bcbd0d8___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/glossary/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(__webpack_require__(141));
window.$ = window.jQuery = jquery_1.default;
__webpack_require__(142);
__webpack_require__(77);
__webpack_require__(143);
const vue_1 = __importDefault(__webpack_require__(1));
const shared_1 = __webpack_require__(5);
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};
exports.default = (App, { popup = false }) => {
    new vue_1.default({
        el: '#app',
        data() {
            return {
                app: {
                    initialized: false,
                    popup,
                },
                expandedPreferences: false,
            };
        },
        watch: {
            app: {
                async handler(app, oldApp) {
                    if (!app.initialized) {
                        return;
                    }
                    else if (!oldApp.preferences) {
                        this.maybeExpandPreferences(app);
                        return;
                    }
                    if (!popup) {
                        await this.checkPermissions(app);
                    }
                    try {
                        await browser.runtime.sendMessage({
                            method: 'savePreferences',
                            payload: {
                                preferences: app.preferences,
                            },
                        });
                    }
                    catch (error) {
                        console.error('error while saving preferences', error);
                        this.$root.$emit('showError', `Error while saving preferences: ${error.toString()}`);
                        window.setTimeout(() => {
                            this.$root.$emit('initialize');
                        }, 5000);
                    }
                    this.maybeExpandPreferences(app);
                },
                deep: true,
            },
        },
        mounted() {
            this.initialize();
            this.$root.$on('initialize', (options) => {
                this.app = {
                    initialized: false,
                    popup,
                };
                this.expandedPreferences = false;
                this.$nextTick(() => {
                    this.initialize(options);
                });
            });
        },
        methods: {
            async initialize(options = {}) {
                let pongError = false;
                let pongErrorMessage = false;
                let initializeLoader = false;
                if (window.location.search.startsWith('?error')) {
                    this.$root.$emit('showInitializeError');
                    return;
                }
                setTimeout(() => {
                    if (!this.app.initialized && !pongError) {
                        initializeLoader = true;
                        this.$root.$emit('showInitializeLoader');
                    }
                }, 500);
                try {
                    const pong = await browser.runtime.sendMessage({ method: 'ping' });
                    if (pong !== 'pong') {
                        pongError = true;
                    }
                }
                catch (error) {
                    pongError = true;
                    pongErrorMessage = error;
                }
                if (pongError) {
                    if (initializeLoader) {
                        this.$root.$emit('hideInitializeLoader');
                    }
                    this.$root.$emit('showInitializeError', pongErrorMessage);
                    return;
                }
                const permissions = await shared_1.getPermissions();
                let storage;
                try {
                    storage = (await browser.storage.local.get());
                    if (!storage.preferences ||
                        !Object.keys(storage.preferences).length) {
                        this.$root.$emit('showError', 'Loading preferences failed, please try again');
                        return;
                    }
                }
                catch (error) {
                    this.$root.$emit('showError', `Loading preferences failed, please try again. ${error.toString()}`);
                    return;
                }
                const currentTab = (await browser.tabs.getCurrent());
                const app = {
                    initialized: true,
                    popup,
                    storage,
                    preferences: storage.preferences,
                    permissions,
                    currentTab,
                };
                if (popup) {
                    const [tab] = (await browser.tabs.query({
                        currentWindow: true,
                        active: true,
                    }));
                    app.activeTab = {
                        ...tab,
                        parsedUrl: new URL(tab.url),
                    };
                }
                this.app = app;
                if (options.showMessage) {
                    this.$nextTick(() => {
                        this.$root.$emit('showMessage', options.showMessage);
                    });
                }
                else if (options.showError) {
                    this.$nextTick(() => {
                        this.$root.$emit('showError', options.showError);
                    });
                }
                else {
                    this.$root.$emit('hideMessage');
                }
                if (initializeLoader) {
                    this.$root.$emit('hideInitializeLoader');
                }
            },
            async checkPermissions(app) {
                if (app.preferences.notifications && !app.permissions.notifications) {
                    // eslint-disable-next-line require-atomic-updates
                    app.preferences.notifications = app.permissions.notifications = await browser.permissions.request({
                        permissions: ['notifications'],
                    });
                }
                if (app.preferences.contextMenuBookmarks &&
                    !app.permissions.bookmarks) {
                    // eslint-disable-next-line require-atomic-updates
                    app.preferences.contextMenuBookmarks = app.permissions.bookmarks = await browser.permissions.request({
                        permissions: ['bookmarks'],
                    });
                }
                if (app.preferences.deletesHistory.contextMenuBookmarks &&
                    !app.permissions.bookmarks) {
                    // eslint-disable-next-line require-atomic-updates
                    app.preferences.deletesHistory.contextMenuBookmarks = app.permissions.bookmarks = await browser.permissions.request({
                        permissions: ['bookmarks'],
                    });
                }
                if (app.preferences.deletesHistory.active && !app.permissions.history) {
                    // eslint-disable-next-line require-atomic-updates
                    app.preferences.deletesHistory.active = app.permissions.history = await browser.permissions.request({
                        permissions: ['history'],
                    });
                }
                if (app.preferences.scripts.active && !app.permissions.webNavigation) {
                    // eslint-disable-next-line require-atomic-updates
                    app.preferences.scripts.active = app.permissions.webNavigation = await browser.permissions.request({
                        permissions: ['webNavigation'],
                    });
                }
            },
            maybeExpandPreferences(app) {
                this.$nextTick(() => {
                    if (app.preferences.ui.expandPreferences &&
                        !this.expandedPreferences) {
                        Array.from(Array(15)).map((_, idx) => {
                            $('.ui.accordion:not(#glossaryAccordion)').accordion('open', idx);
                        });
                        this.expandedPreferences = true;
                    }
                    else if (!app.preferences.ui.expandPreferences &&
                        this.expandedPreferences) {
                        this.expandedPreferences = false;
                        this.$root.$emit('initialize');
                    }
                });
            },
        },
        render(h) {
            return h(App, {
                props: {
                    app: this.app,
                },
            });
        },
    });
};


/***/ }),
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_perdomain_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_perdomain_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_perdomain_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_perdomain_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(7);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.fade-enter-active,\n.fade-leave-active {\n  transition: opacity 0.5s;\n}\n.fade-enter,\n.fade-leave-to {\n  opacity: 0;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _link_vue_vue_type_template_id_f310bd38___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73);
/* harmony import */ var _link_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _link_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _link_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _link_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _link_vue_vue_type_template_id_f310bd38___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _link_vue_vue_type_template_id_f310bd38___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/ui/components/glossary/link.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45);
/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(7);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "\n.glossary {\n  min-height: 360px;\n  max-height: 360px;\n  cursor: auto;\n  user-select: text;\n}\n.glossary-container {\n  min-width: 320px;\n  max-width: 320px;\n}\n.glossary-help {\n  cursor: help;\n}\n.glossary-link {\n  cursor: pointer;\n  color: #2185d0;\n}\n.glossary-history-btn {\n  cursor: pointer;\n  opacity: 1 !important;\n}\n.glossary-history-btn-inactive {\n  opacity: 0.2 !important;\n}\n.glossary-header {\n  display: flex;\n  font-size: 12px;\n  padding: 10px 10px 5px 10px;\n}\n.glossary-header-title {\n  font-weight: bold;\n  flex-grow: 1;\n}\n.glossary-content {\n  padding: 10px;\n}\nul {\n  margin-left: 10px;\n  padding-left: 10px;\n}\n.opaque-info-circle {\n  color: #2185d0;\n  opacity: 0.6;\n}\n.opaque-info-circle:hover {\n  opacity: 1;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ })
]]);