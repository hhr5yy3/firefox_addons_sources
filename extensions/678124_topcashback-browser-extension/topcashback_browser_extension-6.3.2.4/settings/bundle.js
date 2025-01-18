/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9740:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// EXTERNAL MODULE: ./node_modules/rollbar/dist/rollbar.umd.min.js
var rollbar_umd_min = __webpack_require__(7662);
var rollbar_umd_min_default = /*#__PURE__*/__webpack_require__.n(rollbar_umd_min);
// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(144);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/settings/components/app.vue?vue&type=template&id=a8125c40&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _vm.dataReady ? _c('div', {
    staticClass: "card"
  }, [_c('div', [_c('div', {
    staticClass: "card__logo"
  }), _vm._v(" "), _c('div', {
    staticClass: "card__title"
  }, [_vm._v(_vm._s(_vm.$i18next.t('settings.components.app.setting_title')))]), _vm._v(" "), _c('Checkbox', {
    attrs: {
      "text": this.$i18next.t('settings.components.app.checkbox_text'),
      "name": 'isAnalyticsEnabled',
      "checked": _vm.settings.isAnalyticsEnabled
    },
    on: {
      "update": _vm.update
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "muted-merchant"
  }, [_vm.mutedMerchants.length > 0 ? _c('div', {
    staticClass: "muted-merchant__title"
  }, [_vm._v(_vm._s(_vm.$i18next.t('settings.components.app.muted_merchants')))]) : _vm._e(), _vm._v(" "), _vm._l(_vm.mutedMerchants, function (el, index) {
    return _c('div', {
      key: index,
      staticClass: "elements"
    }, [_c('span', {
      staticClass: "elements__element"
    }, [_vm._v(_vm._s(el.name))]), _vm._v(" "), _c('span', {
      staticClass: "elements__remove",
      on: {
        "click": function click($event) {
          return _vm.remove(index);
        }
      }
    }, [_vm._v(" " + _vm._s(_vm.$i18next.t('settings.components.app.muted_merchants_remove')) + " ")])]);
  })], 2)], 1), _vm._v(" "), _c('div', {
    staticClass: "card__footer"
  }, [_c('hr'), _vm._v(" "), _c('div', {
    staticClass: "footer-links"
  }, [_c('a', {
    attrs: {
      "href": _vm.rate,
      "target": "_blank"
    }
  }, [_vm._v(_vm._s(_vm.$i18next.t('settings.components.app.rate')))]), _vm._v(" "), _c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.terms)
    }
  })])])]) : _vm._e();
};
var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
var toConsumableArray = __webpack_require__(9062);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(5861);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4687);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
// EXTERNAL MODULE: ./node_modules/dompurify/dist/purify.js
var purify = __webpack_require__(7856);
;// CONCATENATED MODULE: ./source/bg/core/utils.js

var getStorageData = function getStorageData(keys) {
  var promise = new Promise(function (resolve, reject) {
    chrome.storage.local.get(keys, function (items) {
      if (chrome.runtime.lastError) {
        reject(new Error("Error in storage.get: ".concat(chrome.runtime.lastError)));
      } else {
        resolve(items);
      }
    });
  });
  return promise;
};
var setStorageData = function setStorageData(items) {
  chrome.storage.local.set(items);
};
var sendContentMessage = function sendContentMessage(params) {
  var promise = new Promise(function (resolve) {
    chrome.runtime.sendMessage(params, function (response) {
      resolve(response);
    });
  });
  return promise;
};
var sendBackgroundMessage = function sendBackgroundMessage(tabId, params) {
  var promise = new Promise(function (resolve) {
    chrome.tabs.sendMessage(tabId, params, function (response) {
      resolve(response);
    });
  });
  return promise;
};
var getActiveTab = function getActiveTab() {
  var promise = new Promise(function (resolve) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
        tab = _ref2[0];
      return resolve(tab);
    });
  });
  return promise;
};
var getAllTabs = function getAllTabs() {
  var promise = new Promise(function (resolve) {
    return chrome.tabs.query({}, function (tabs) {
      return resolve(tabs);
    });
  });
  return promise;
};
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(4942);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/settings/components/checkbox.vue?vue&type=template&id=374e8c2e&

var checkboxvue_type_template_id_374e8c2e_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('label', {
    staticClass: "checkbox"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.isChecked,
      expression: "isChecked"
    }],
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.isChecked) ? _vm._i(_vm.isChecked, null) > -1 : _vm.isChecked
    },
    on: {
      "change": [function ($event) {
        var $$a = _vm.isChecked,
          $$el = $event.target,
          $$c = $$el.checked ? true : false;
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.isChecked = $$a.concat([$$v]));
          } else {
            $$i > -1 && (_vm.isChecked = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
          }
        } else {
          _vm.isChecked = $$c;
        }
      }, function ($event) {
        return _vm.$emit('update', (0,defineProperty/* default */.Z)({}, _vm.name, _vm.isChecked));
      }]
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "checkbox__mark"
  }), _vm._v(" "), _c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.sanitizedText)
    }
  })]);
};
var checkboxvue_type_template_id_374e8c2e_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/settings/components/checkbox.vue?vue&type=script&lang=js&

/* harmony default export */ const checkboxvue_type_script_lang_js_ = ({
  props: {
    text: String,
    name: String,
    checked: Boolean,
    action: Function
  },
  data: function data() {
    return {
      isChecked: this.checked
    };
  },
  computed: {
    sanitizedText: function sanitizedText() {
      return purify.sanitize(this.text);
    }
  },
  methods: {
    setAction: function setAction() {
      var _this = this;
      var actionButton = this.$el.querySelector('a');
      if (actionButton && this.action) {
        this.$on('action', this.action);
        actionButton.addEventListener('click', function (e) {
          e.preventDefault();
          _this.$emit('action');
        });
      }
    }
  },
  mounted: function mounted() {
    this.setAction();
  }
});
;// CONCATENATED MODULE: ./source/settings/components/checkbox.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_checkboxvue_type_script_lang_js_ = (checkboxvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/settings/components/checkbox.vue?vue&type=style&index=0&id=374e8c2e&prod&lang=less&
var checkboxvue_type_style_index_0_id_374e8c2e_prod_lang_less_ = __webpack_require__(8843);
;// CONCATENATED MODULE: ./source/settings/components/checkbox.vue?vue&type=style&index=0&id=374e8c2e&prod&lang=less&

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1900);
;// CONCATENATED MODULE: ./source/settings/components/checkbox.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  components_checkboxvue_type_script_lang_js_,
  checkboxvue_type_template_id_374e8c2e_render,
  checkboxvue_type_template_id_374e8c2e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const components_checkbox = (component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/rating.vue?vue&type=template&id=1a60eb82&scoped=true&
var ratingvue_type_template_id_1a60eb82_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "rating"
  }, [_c('div', {
    staticClass: "rating__title"
  }, [_vm._v("\n    " + _vm._s(_vm.$i18next.t('shared_components.rating.title')) + "\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "rating__stars"
  }, _vm._l(_vm.maxRating, function (rating) {
    return _c('div', {
      key: rating,
      staticClass: "rating__star",
      on: {
        "click": function click($event) {
          return _vm.rate();
        }
      }
    });
  }), 0)]);
};
var ratingvue_type_template_id_1a60eb82_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./source/constants/general.js
/* eslint-disable import/no-mutable-exports */
// eslint-disable-next-line import/no-cycle

var IS_TEST_VERSION = false;
var REGION = "uk";
var IS_CONFIG_TESTING = false;
var BROWSER = "firefox";
var VERSION = chrome.runtime.getManifest().version;
var CAA_VERSION = '2.3.0';
if (BROWSER === 'safari') {
  VERSION = "".concat(VERSION, ".0");
}
var LANGUAGE = 'en-UK';
var SLEEK_ACTIVE = true;
if (REGION === 'us') {
  LANGUAGE = 'en-US';
} else if (REGION === 'de') {
  LANGUAGE = 'de-DE';
  SLEEK_ACTIVE = false;
} else if (REGION === 'au') {
  LANGUAGE = 'en-AU';
  SLEEK_ACTIVE = false;
} else if (REGION === 'fr') {
  LANGUAGE = 'fr-FR';
  SLEEK_ACTIVE = false;
}

// en-US shows datetime like american
// en-GB shows datetime like europeans
var EXPIRE_FORMAT = REGION === 'us' ? 'en-US' : 'en-GB';
var REMOVE_ACTIVATION_FROM_LIST_DELAY = (/* unused pure expression or super */ null && (60 * 1000));
var REMOVE_SUPPRESSION_FROM_LIST_DELAY = (/* unused pure expression or super */ null && (40 * 1000));
var REMOVE_COMPETITOR_ACTIVATION_FROM_LIST_DELAY = (/* unused pure expression or super */ null && (30 * 1000));
var CONFIRMATION_NOTIFICATION_DELAY_TIMESTAMP = (/* unused pure expression or super */ null && (15 * 1000));
var DELAY_NOTIFICATION_ACTIVATING_CASHBACK = (/* unused pure expression or super */ null && (90 * 1000));
var DELAY_SECOND_NOTIFIER_TIMESTAMP = (/* unused pure expression or super */ null && (10 * 60 * 1000));
var ICONS = {
  16: 'icon-32.png',
  32: 'icon-32.png'
};
var ICONS_ACTIVE = {
  16: 'icon-32-active.png',
  32: 'icon-32-active.png'
};
var NO_CODE_PATTERNS = (/* unused pure expression or super */ null && (['N/A', 'n/a', 'no code needed', 'No code required', 'No code required.', 'no code required', 'no code required.', 'NO_CODE_NEEDED']));
var INIT_CAA_EVENTS = {
  init: 'Show',
  success: 'Success',
  fail: 'Fail'
};
var CLOSE_CAA_EVENTS = {
  init: 'Close',
  process: 'Stop'
};
var COUPON_COPIED_ANIMATION_TIMER = 5000;
var DELAY_NOTIFICATION_ACIVATED_CASHBACK = (/* unused pure expression or super */ null && (4 * 1000));
var MAX_ZINDEXES = (/* unused pure expression or super */ null && ([2147483647, '2147483647', '2147483647 !important', '2147483647!important']));
var MERCHANTS_UPDATE_DELAY = (/* unused pure expression or super */ null && (10 * 60 * 1000));
var CONFIGS_UPDATE_DELAY = (/* unused pure expression or super */ null && (4 * 60 * 60 * 1000));
var FLAGS_REDIRECT_UPDATE_DELAY = (/* unused pure expression or super */ null && (15 * 60 * 1000));
if (IS_CONFIG_TESTING) {
  MERCHANTS_UPDATE_DELAY = 10 * 1000;
  CONFIGS_UPDATE_DELAY = 10 * 1000;
}

// Delay in minutes
var ACTIVATION_RESET_TIMER = 30;
var RE_ACTIVATION_RESET_TIMER = 30;
var SUPRESSION_RESET_TIMER = 30;
var DISMISSAL_RESET_TIMER = 30;
var UPDATE_SINGLE_MERCHANT_INTERVAL = (/* unused pure expression or super */ null && (10 * 60 * 1000));
var UPDATE_SINGLE_MERCHANT_TIMEOUT = (/* unused pure expression or super */ null && (30 * 1000));

;// CONCATENATED MODULE: ./source/constants/urls.js
/* eslint-disable import/no-mutable-exports */

var PROJECT = 'TOPUK';
var DOMAIN = 'www.topcashback.co.uk';
var TEST_DOMAIN = 'ukq-www.tcb.systems';
var urls_HOME_PAGE = "https://".concat(IS_TEST_VERSION ? TEST_DOMAIN : DOMAIN);
var MERCHANTS_URL_BACKUP = 'https://ukp.tcb-cdn.com/toolbarfeed/production/merchants';
var PAYMENT_DETAILS_URL = "".concat(urls_HOME_PAGE, "/account/paymentdetails");
var EBAY_URL = 'ebay.co.uk';
var IGNORED_ULRS = ['news.sky.com'];
var CONFIG_TOOL_URL = 'https://caa-tool.topcashback.com/api/configs/export?configType=caa&project=TOPUK';
var STORE_URLS = {
  chrome: 'https://chrome.google.com/webstore/detail/cashback-notifier-topcash/ekeeeebmbhkkjcaoicinbdjmklipppkj',
  firefox: 'https://addons.mozilla.org/en-US/firefox/addon/topcashback-browser-extension/',
  safari: 'https://apps.apple.com/gb/app/topcashback-browser-extension/id6446206868',
  edge: 'https://microsoftedge.microsoft.com/addons/detail/topcashback-uk-get-cashba/benodbbgadflkhbjfmmfemepmjekbjbf'
};
var GA_ID = 'G-DRB9MYYD1N';
var GA_API_SECRET = 'rpEBrsCdQo--7pYRjEXlHA';
var CURRENCY = 'GBP';
var ALLOW_GA = true;
var CAA_ANALYTICS_URL = 'https://caa-analytics.topcashback.com/api/v1/activity/TOPUK';
if (REGION === 'us') {
  PROJECT = 'top';
  DOMAIN = 'www.topcashback.com';
  TEST_DOMAIN = 'usq-www.tcb.systems';
  urls_HOME_PAGE = "https://".concat(IS_TEST_VERSION ? TEST_DOMAIN : DOMAIN);
  MERCHANTS_URL_BACKUP = 'https://usp.tcb-cdn.com/toolbarfeed/production-feed';
  CONFIG_TOOL_URL = 'https://caa-tool.topcashback.com/api/configs/export?configType=caa&project=top';
  STORE_URLS = {
    chrome: 'https://chrome.google.com/webstore/detail/lkmpdpkkkeeoiodlnmlichcmfmdjbjic',
    firefox: 'https://addons.mozilla.org/en-US/firefox/addon/topcashback-cashback-coupons/',
    safari: 'https://apps.apple.com/us/app/topcashback-browser-extension/id6446206796',
    edge: 'https://microsoftedge.microsoft.com/addons/detail/topcashback-usa-get-cash-/nceaphojbbjgmdcakkmkobpmhfkbjepi'
  };
  PAYMENT_DETAILS_URL = 'not a valid url'; // because bacs isn't and us feature
  EBAY_URL = 'ebay.com';
  GA_ID = 'G-PSP7WDJ333';
  GA_API_SECRET = '-VlgZIaqQ0O0_thFqZVZCw ';
  CURRENCY = 'USD';
  CAA_ANALYTICS_URL = 'https://caa-analytics.topcashback.com/api/v1/activity/top';
}
if (REGION === 'de') {
  // PROJECT = 'TOPUK';
  PROJECT = 'TOPDE';
  DOMAIN = 'www.topcashback.de';
  TEST_DOMAIN = 'deq-www.tcb.systems';
  // TEST_DOMAIN = 'deq-www.tcb.systems';
  urls_HOME_PAGE = "https://".concat(IS_TEST_VERSION ? TEST_DOMAIN : DOMAIN);
  MERCHANTS_URL_BACKUP = 'https://dep.tcb-cdn.com/toolbarfeed/production/merchants';
  PAYMENT_DETAILS_URL = "".concat(urls_HOME_PAGE, "/konto/auszahlungsinformationen/"); // feature about bacs need to ask
  EBAY_URL = 'ebay.de';
  CONFIG_TOOL_URL = 'https://caa-tool.topcashback.com/api/configs/export?configType=caa&project=TOPDE';
  STORE_URLS = {
    chrome: 'https://chrome.google.com/webstore/detail/topcashback-de-erhalte-ca/jhkkakmmnkdjfgplbnbiiflbilijdmap',
    firefox: 'https://addons.mozilla.org/en-US/firefox/addon/topcashback-de/',
    safari: 'https://apps.apple.com/de/app/topcashback-extension/id6446207113',
    edge: 'https://microsoftedge.microsoft.com/addons/detail/topcashback-de-erhalte-ca/jbidblpifeiflplikpebbjiocnfobncn'
  };
  GA_ID = 'G-0XTBPXNTHF';
  GA_API_SECRET = '4oxp9DwLT7-C5ZEHIXiMzA';
  CURRENCY = 'EUR';
  ALLOW_GA = false;
  CAA_ANALYTICS_URL = 'https://caa-analytics.topcashback.com/api/v1/activity/TOPDE';
}
if (REGION === 'au') {
  PROJECT = 'TOPAU';
  DOMAIN = 'www.topcashback.com.au';
  TEST_DOMAIN = 'auq-www.tcb.systems';
  urls_HOME_PAGE = "https://".concat(IS_TEST_VERSION ? TEST_DOMAIN : DOMAIN);
  MERCHANTS_URL_BACKUP = 'https://aup.tcb-cdn.com/toolbarfeed/production-feed';
  CONFIG_TOOL_URL = 'https://caa-tool.topcashback.com/api/configs/export?configType=caa&project=TOPAU';
  STORE_URLS = {
    chrome: 'https://chromewebstore.google.com/detail/topcashback-browser-exten/opokhjaclibdclfeckdodnjmhblhdfnn',
    firefox: 'https://addons.mozilla.org/en-US/firefox/addon/topcashback-australia/',
    safari: '',
    edge: 'https://microsoftedge.microsoft.com/addons/detail/topcashback-browser-exten/eakcmopghkilnkoelielcckjiidkhkee'
  };
  PAYMENT_DETAILS_URL = 'not a valid url'; // Need to see in the future what to use here.
  EBAY_URL = 'ebay.com.au';

  // Currently on a test GA platform, need to update in the future.

  GA_ID = '';
  GA_API_SECRET = '';
  ALLOW_GA = false;
  CAA_ANALYTICS_URL = 'https://caa-analytics.topcashback.com/api/v1/activity/TOPAU';
}
if (REGION === 'fr') {
  PROJECT = 'TOPFR';
  DOMAIN = 'www.topcashback.fr';
  TEST_DOMAIN = 'frq-www.tcb.systems';
  urls_HOME_PAGE = "https://".concat(IS_TEST_VERSION ? TEST_DOMAIN : DOMAIN);
  MERCHANTS_URL_BACKUP = 'https://frp.tcb-cdn.com/toolbarfeed/production-feed';
  CONFIG_TOOL_URL = 'https://caa-tool.topcashback.com/api/configs/export?configType=caa&project=TOPFR';
  STORE_URLS = {
    chrome: 'https://chromewebstore.google.com/detail/extension-de-navigateur-t/pgkgjnjmbjbnhjeinemkfomhagmchcfg',
    firefox: 'https://addons.mozilla.org/fr/firefox/addon/extension-topcashback/',
    safari: '',
    edge: 'https://microsoftedge.microsoft.com/addons/detail/extension-de-navigateur-t/ikagofjkkffpcchihogchohdkkccgaao'
  };
  PAYMENT_DETAILS_URL = 'not a valid url'; // Need to see in the future what to use here.
  EBAY_URL = 'ebay.fr';

  // Currently on a test GA platform, need to update in the future.

  GA_ID = '';
  GA_API_SECRET = '';
  ALLOW_GA = false;
  CAA_ANALYTICS_URL = 'https://caa-analytics.topcashback.com/api/v1/activity/TOPFR';
}
var APP_ACTIVATION_PATTERN = '=[^&=?]+TcbApp';
// const APP_ACTIVATION_PATTERN = 'clickref=[^&=?]+TcbApp';
var ACTIVATION_PATTERNS = ["".concat(IS_TEST_VERSION ? TEST_DOMAIN : DOMAIN, "/redirect.aspx"), APP_ACTIVATION_PATTERN];
var AFTER_INSTALL_URL = "".concat(urls_HOME_PAGE, "/toolbar/install/?ihr=browserextension");
var AFTER_INSTALL_URL_MOBILE = "".concat(urls_HOME_PAGE, "/toolbar/enabledmobile/?ihr=browserextension");
var AFTER_UNINSTALL_URL = "".concat(urls_HOME_PAGE, "/toolbar/uninstall/");
var LOGIN_PAGE_URL = "".concat(urls_HOME_PAGE, "/connect?action=login");
var JOIN_PAGE_URL = "".concat(urls_HOME_PAGE, "/nologin/");
var ACCOUNT_PAGE_URL = "".concat(urls_HOME_PAGE, "/account/overview/");
var TELL_A_FRIEND_PAGE_URL = "".concat(urls_HOME_PAGE, "/account/tell-a-friend");
var HELP_URL = "".concat(urls_HOME_PAGE, "/newhelp/");
var PRIVACY_POLICY = "".concat(urls_HOME_PAGE, "/dyn/browser-ex-privacy/");
var COOKIE_POLICY = "".concat(urls_HOME_PAGE, "/dyn/browser-ex-cookie-policy/");
var PERMISSIONS = "".concat(urls_HOME_PAGE, "/toolbar/permissions");
var PERMISSIONS_MOBILE = "".concat(urls_HOME_PAGE, "/toolbar/mobilepermissions");
if (REGION === 'us') {
  COOKIE_POLICY = "".concat(urls_HOME_PAGE, "/cookie-policy/");
}
if (REGION === 'de') {
  AFTER_INSTALL_URL = "".concat(urls_HOME_PAGE, "/toolbar/installieren/?ihr=browserextension");
  AFTER_UNINSTALL_URL = "".concat(urls_HOME_PAGE, "/toolbar/deinstallieren/");
  LOGIN_PAGE_URL = "".concat(urls_HOME_PAGE, "/keine-anmeldung/");
  JOIN_PAGE_URL = "".concat(urls_HOME_PAGE, "/keine-anmeldung/");
  ACCOUNT_PAGE_URL = "".concat(urls_HOME_PAGE, "/konto/uebersicht/");
  TELL_A_FRIEND_PAGE_URL = "".concat(urls_HOME_PAGE, "/konto/freunde-werben-freunde/");
  HELP_URL = "".concat(urls_HOME_PAGE, "/hilfe/");
  PRIVACY_POLICY = "".concat(urls_HOME_PAGE, "/dyn/browser-erweiterung-datenschutz/");
  COOKIE_POLICY = "".concat(urls_HOME_PAGE, "/cookie-richtlinie/");
}
if (REGION === 'fr') {
  AFTER_INSTALL_URL = "".concat(urls_HOME_PAGE, "/barre-doutils/installer/?ihr=browserextension");
  AFTER_UNINSTALL_URL = "".concat(urls_HOME_PAGE, "/barre-doutils/desinstaller");
  LOGIN_PAGE_URL = "".concat(urls_HOME_PAGE, "/se-connecter/");
  JOIN_PAGE_URL = "".concat(urls_HOME_PAGE, "/aucune-connexion/");
  PRIVACY_POLICY = "".concat(urls_HOME_PAGE, "/dyn/politique-confidentialite-extension/");
  COOKIE_POLICY = "".concat(urls_HOME_PAGE, "/dyn/politique-des-cookies-extension-navigateur/");
  ACCOUNT_PAGE_URL = "".concat(urls_HOME_PAGE, "/mon-compte/tableau-de-bord/");
}
var API_VERSION = 'v3.0';
if (BROWSER === 'safari') {
  API_VERSION = 'v4.0';
}
var MERCHANTS_URL = "".concat(urls_HOME_PAGE, "/toolbar/api/").concat(API_VERSION, "/feed/merchants/slim/");
var MERCHANTS_URL_NO_HTTP = "".concat(DOMAIN, "/toolbar/api/").concat(API_VERSION, "/feed/merchants/slim/");
var TOP_OFFERS_URL = "".concat(urls_HOME_PAGE, "/toolbar/api/").concat(API_VERSION, "/feed/homepage/");
var USER_INFO_URL = "".concat(urls_HOME_PAGE, "/toolbar/api/v3.0/user");
var FLAG_REDIRECT_URL = "".concat(urls_HOME_PAGE, "/toolbar/api/v3.0/redirect");
var CONFIGS_URL = "".concat(urls_HOME_PAGE, "/toolbar/api/").concat(API_VERSION, "/couponautoapplier/config");
var MERCHANTS_URL_DETAIL = '';
if (IS_CONFIG_TESTING) {
  MERCHANTS_URL = 'http://0.0.0.0/merchants.json';
  // CONFIGS_URL = 'http://localhost/configs.json';
  // MERCHANTS_URL_DETAIL = 'http://localhost/merchant';
  // USER_INFO_URL = 'http://localhost/users.json';
  ALLOW_GA = false;
}
var TCB_WRAPPER = "tcb-extension-".concat(REGION, "-wrapper").concat(IS_TEST_VERSION ? '-qa' : '');

// For testing purposes
// GA_ID = 'G-J5F14H174Y';
// GA_API_SECRET = 'wZ6YeRUxRc-MiaIxfQNsZQ';


;// CONCATENATED MODULE: ./source/constants/serp.js
var SERP_PATTERNS = (/* unused pure expression or super */ null && (['ebay.com', 'ebay.de']));
var SERP_CONFIG = [{
  name: 'yahoo',
  domain: 'search.yahoo.com',
  rx: '^https?://(?:www.|encrypted.|uk.)?search.yahoo\\.[a-z.]{2,6}',
  links: 'h3 a, .tad-title a',
  blocks: 'div#web li > .dd:not(.bingrelqa), section#main-algo .dd:not(.bingrelqa)',
  secondaryLinks: '.compList a.td-n'
}, {
  name: 'bing',
  domain: 'bing.com',
  rx: '^https?://(?:www.|encrypted.)?bing\\.[a-z.]{2,6}',
  links: 'h2 a, div[class=\'sb_tlst\'] * a, div[class=\'b_algoheader\'] a',
  secondaryUrl: 'div > cite',
  // fix edge problem when opening new tab
  blocks: '#b_results>.b_algo',
  secondaryLinks: '.b_vlist2col h3 a' // sublink of main link
}, {
  name: 'google',
  domain: 'google.',
  rx: '^https?://(?:www.|encrypted.)?google\\.[a-z.]{2,6}',
  links: 'a',
  blocks: 'div.MjjYud',
  secondaryLinks: '.nrgt a.l'
}, {
  domain: 'yandex',
  rx: '^https?://(?:www.|encrypted.)?yandex\\.[a-z.]{2,6}',
  blocks: 'li.serp-item h2',
  links: 'li.serp-item h2>a'
}, {
  domain: 'rambler',
  rx: '^https?://(?:www.|nova.)?rambler\\.[a-z.]{2,6}',
  blocks: 'div.b-serp-item h2',
  links: 'div.b-serp-item h2>a'
}];
var SERP_REACTION_THRESHOLD = 100;

;// CONCATENATED MODULE: ./source/constants/merchants.js
/* eslint-disable import/no-mutable-exports */
// eslint-disable-next-line import/no-cycle

var CAMPAIGN_ID_RX = /(ebay\/.*)(campid=[\d]+)/;
var CAMPAIGN_ID_EBAY = 5337714585;

// rakuten uses htto:// to activation

var COMPETITORS_ACTIVATION_NETWORKS = [{
  network: 'awin',
  regex: 'www.awin1.com/cread.php',
  required_params: ['affid']
}, {
  network: 'awin',
  regex: 'www.awin1.com/awclick.php',
  required_params: ['affid']
}, {
  network: 'awin',
  regex: 'awin1.com'
}, {
  network: 'avantlink',
  regex: 'www.avantlink.com/click.php?',
  required_params: ['ctc']
}, {
  network: 'avantlink',
  regex: 'classic.avantlink.com/click.php?',
  required_params: ['ctc']
}, {
  network: 'ascend',
  regex: 'c.pepperjamnetwork.com/click?',
  required_params: ['action', 'sid']
}, {
  network: 'shareasale',
  regex: 'shareasale.com/r.cfm?',
  required_params: ['afftrack']
}, {
  network: 'shareasale',
  regex: 'shareasale-analytics.com/r.cfm?',
  required_params: ['afftrack']
}, {
  network: 'webgains',
  regex: 'track.webgains.com/click.html?',
  required_params: ['wgcampaignid', 'wgprogramid']
}, {
  network: 'affiliatefuture',
  regex: 'scripts.affiliatefuture.com/AFClick.asp?',
  required_params: ['affiliateID']
}, {
  network: 'partnerize',
  regex: 'prf.hn/click/camref'
}, {
  network: 'amazon',
  regex: /amazon\.com\.au\/.*&tag\b(?!=topcashbackau)/
}, {
  network: 'ebay AU',
  regex: /ebay\.com\.au\/.*&customid\b(?!=.*tb&)/
}, {
  network: 'ebay FR',
  regex: /ebay\.fr\/.*&customid\b(?!=.*tb&)/
}, {
  network: 'cj',
  regex: 'cj.dotomi.com/'
}, {
  network: 'cj',
  regex: 'www.jdoqocy.com/'
}, {
  network: 'cj',
  regex: 'www.emjcd.com/'
}, {
  network: 'rakuten',
  regex: 'click.linksynergy.com/deeplink?',
  required_params: ['id']
}, {
  network: 'rakuten',
  regex: 'click.linksynergy.com/fs-bin/click?',
  required_params: ['id']
}, {
  network: 'rakuten',
  regex: 'www.kqzyfj.com/'
}, {
  network: 'impact',
  regex: 'bbgqo9.net'
}, {
  network: 'impact',
  regex: 'svj.io'
}, {
  network: 'impact',
  regex: 'tm7559.net'
}, {
  network: 'impact',
  regex: 'ojrq.net'
}, {
  network: 'impact',
  regex: 'pxf.io'
}, {
  network: 'impact',
  regex: '7cnq.net'
}, {
  network: 'impact',
  regex: 'rrmo.net'
}, {
  network: 'impact',
  regex: 'oaccss.net'
}, {
  network: 'impact',
  regex: 'clarity.ms'
}, {
  network: 'impact',
  regex: 'akstat.io'
}, {
  network: 'impact',
  regex: 'ngi2ba.net'
}, {
  network: 'tradedoubler',
  regex: 'clkuk.tradedoubler.com/click?'
}, {
  network: 'tradedoubler',
  regex: 'clk.tradedoubler.com/click?'
}, {
  network: 'Commission Factory',
  regex: 't.cfjump.com'
}, {
  network: 'Commission Factory',
  regex: 'cfjump.com'
}, {
  network: 'kwanko',
  regex: 'metaffiliation.com/trk.php'
}, {
  network: 'befrugal',
  regex: 'https://r.befrugal.com/?',
  competitor: true
}, {
  network: 'quidco',
  regex: /www\.quidco\.com\/visit\/.*\/.*\/cashback/,
  competitor: true
}, {
  network: 'coupert',
  regex: 'https://www.coupert.com/api/v2/out/',
  competitor: true
}, {
  network: 'coupert',
  regex: 'https://www.coupertsh.com/api/v2/out/',
  competitor: true
}, {
  network: 'coupert',
  regex: 'https://r.coupert.com/?',
  competitor: true
}, {
  network: 'capital_one',
  regex: 'https://capitaloneshopping.com/api/v1/redirectV2',
  competitor: true
}, {
  network: 'honey',
  regex: /o\.honey\.io\/store\/.*\/(offer_claim|extension_links)?/,
  competitor: true
}, {
  network: 'rakuten campid for ebay.com',
  regex: 'https://www.rakuten.com/ebay_3993',
  competitor: true
}, {
  network: 'KickBack',
  regex: 'kickback.com.au/conversion/merchants/',
  competitor: true
}, {
  network: 'CashRewards',
  regex: 'cashrewards.com.au/go',
  competitor: true
}, {
  network: 'ShopBack',
  regex: 'shopback.com.au/redirect',
  competitor: true
}];
var DISABLE_PATTERNS = (/* unused pure expression or super */ null && (['compare-broadband.topcashback']));
var SUPPRESSION_PATTERNS = (/* unused pure expression or super */ null && (['www.expedia.com/amex', 'px.owneriq.net', /(?<!login\.)dotomi\.com/, 'eden-park.fr/fr_fr/?utm_campaign=', 'www.1-2-3.fr', 'cm_mmc=Linkshare', 'PartnerID=LINKSHARE', 'action.metaffiliation.com', 'track.webgains.com', 'track.effiliation.com', 'clk.tradedoubler.com', 'www.jacadi.fr/?utm_source=', 'ftjcfx.com', 'commission-junction.com', 'rover.ebay.com', 'partners.hotwire.com', 'www.pjtra.com', '.7eer.', 'clickserver.com', '.r.bat.bing.com', 'www.pntrs.com', 'partners.wantable.co', 'cc-dt.com', '.ojrq.net', 'goto.orientaltrading.com', 'www.dpbolvw.net', 'goto.target.com', 'www.pntra.com', '.evyy.net', 'www.anrdoezrs.net', 'www.tkqlhce.com', 'linksynergy.walmart.com', 'www.anrdoezrs.net', 'emjcd.com', 'partners.jawbone.com', 'shareasale.com', 'www.awin1.com', 'linksynergy.walmart.com', 'gan.doubleclick.net', 'tracking.groupon.com', 'www.pepperjamnetwork.com', 'rcm-ca.amazon.ca', 'www.shareasale.com', 'www.jdoqocy.com', 'alitems.com', 'www.kqzyfj.com', 'goto.orientaltrading.com', 'affiliates.babiesrus.com', 'lduhtrp.net', 'ad.admitad.com', 'prf.hn', '.r.msn.com', 'apmebf.com', 'goto.target.com', 'www.intactearnings.com', 'click.linksynergy.com', 'partners.hostgator.com', '.avantlink.com', 'tqlkg.com', 'partners.wantable.co', 'go.redirectingat.com', 'www.pntrac.com', /(?<!tags\.rd\.)linksynergy.com/, 'www.qksrv.net', 'www.gopjn.com', 'affiliates.abebooks.com', 'www.pjatr.com', 'afscr=1', 'afsrc=1', 'affsrc=1', 'riffrid=mdp.hcom.US', 'riffrid=sem.hcom.us', 'rffrid=aff.hcom.us', 'riffrid=eml.hcom.US', 'riffrid=eml.hcom.CA', 'riffrid=eml.hcom.CF', 'riffrid=eml.hcom.U2', 'ranEAID', 'ranSiteID', /.*ebay\..*\/?(mkevt|mkcid|campid).*/, 'magicfreebiesuk.co.uk', 'itsadoddle.co.uk', /shepherdsfriendly\.co\.uk.*utm_medium=km/, /www\.quidco\.com\/visit\/.*\/.*\/cashback/]));
var GOOGLE_SUPPRESSION_PATTERNS = (/* unused pure expression or super */ null && ([/aclk\?sa=/, 'ohost=www.google.com', /(?<!td\.)(?<!fls\.)doubleclick\.net/
// 'cp=\\d+-[\\w-]+',
// 'gclid=[\\w-]+',
// 'gclsrc=aw\\.ds',
// 'kwd=\\d+-\\d+',
]));

var AVIOS_MERCHANTS = (/* unused pure expression or super */ null && (['tkmaxx.com']));
var REQUIRED_BACS_ACTIVE = true;
if (REGION === 'us') {
  CAMPAIGN_ID_EBAY = 5337592760;
  AVIOS_MERCHANTS = [];
  REQUIRED_BACS_ACTIVE = false;
}
if (REGION === 'de') {
  CAMPAIGN_ID_EBAY = 5338621410;
  AVIOS_MERCHANTS = [];
}

;// CONCATENATED MODULE: ./source/constants/rollbar.js
/* eslint-disable import/no-mutable-exports */

var ROLLBAR_ACTIVE = true;
var ROLLBAR_KEY_BG = '';
var ROLLBAR_KEY_POPUP = '';
var ROLLBAR_KEY_CONTENT = '';
var ROLLBAR_KEY_SETTINGS = '';
if (BROWSER === 'firefox') {
  ROLLBAR_ACTIVE = false;
} else if (REGION === 'uk') {
  ROLLBAR_KEY_BG = '45dbe44ada6b422dafa5e42fa65c5a39';
  ROLLBAR_KEY_POPUP = '9ce93cd0b22c4970a8f86bfa94c9ed96';
  ROLLBAR_KEY_CONTENT = '6205c038ab9247189824611ca9c72c0b';
  ROLLBAR_KEY_SETTINGS = 'f54e5fb884074be0a5138d3d4a68e18f';
  if (BROWSER === 'safari') {
    ROLLBAR_KEY_BG = '2f9fd3dfe5cd4252b145d4bd93c2889c';
    ROLLBAR_KEY_POPUP = '78ff7d9f46fb41e2ad2552a3ae9270cd';
    ROLLBAR_KEY_CONTENT = 'a53981d6697b421cb4964d0eab3b878c';
    ROLLBAR_KEY_SETTINGS = '25af5730bae340fb83787b934c188740';
  }
  if (IS_TEST_VERSION) {
    ROLLBAR_KEY_BG = '76f05ff3c96d4fad8eadc87c31eda128';
    ROLLBAR_KEY_POPUP = '76f05ff3c96d4fad8eadc87c31eda128';
    ROLLBAR_KEY_CONTENT = '76f05ff3c96d4fad8eadc87c31eda128';
    ROLLBAR_KEY_SETTINGS = '76f05ff3c96d4fad8eadc87c31eda128';
  }
} else if (REGION === 'us') {
  ROLLBAR_KEY_BG = '9e182ed609c541bbac73be72b838e7e6';
  ROLLBAR_KEY_POPUP = 'ddbefe591ae34a3eabc237060e8cf915';
  ROLLBAR_KEY_CONTENT = 'b4c9d156c25949dc8162345495cd1a30';
  ROLLBAR_KEY_SETTINGS = 'befe7412952a480a964fcb3653db52e1';
  if (BROWSER === 'safari') {
    ROLLBAR_KEY_BG = '4c1f00dec73946d3b1cb4245a90a308a';
    ROLLBAR_KEY_POPUP = 'f8e2cdf2498b44b285c62f9cecfd6d8f';
    ROLLBAR_KEY_CONTENT = '2b7e55db917b4a7baef494fcc8d8e0dd';
    ROLLBAR_KEY_SETTINGS = 'e8d02d51b11d409dbd8953bda3e383ca';
  }
  if (IS_TEST_VERSION) {
    ROLLBAR_KEY_BG = '189fe00b94234d4db6b24506b8cad613';
    ROLLBAR_KEY_POPUP = '189fe00b94234d4db6b24506b8cad613';
    ROLLBAR_KEY_CONTENT = '189fe00b94234d4db6b24506b8cad613';
    ROLLBAR_KEY_SETTINGS = '189fe00b94234d4db6b24506b8cad613';
  }
} else if (REGION === 'de') {
  ROLLBAR_KEY_BG = '3702c076a7204bcaaa66a5c0fcfce290';
  ROLLBAR_KEY_POPUP = 'fed18edc05a8447f8b6e67b00acaa054';
  ROLLBAR_KEY_CONTENT = '78802aacae964ae6ab655094a5420917';
  ROLLBAR_KEY_SETTINGS = '505a3e97296d4063b30543563f888336';
  if (BROWSER === 'safari') {
    ROLLBAR_KEY_BG = 'ab15cb698800441dbf0d50741475dc40';
    ROLLBAR_KEY_POPUP = '441424e12fcb4955863d4b818c962744';
    ROLLBAR_KEY_CONTENT = 'b1dbd89311934a689dfa13d2509de4a3';
    ROLLBAR_KEY_SETTINGS = 'fbc68eb2c80043ff8077fc647ef1ca0c';
  }
  if (IS_TEST_VERSION) {
    ROLLBAR_KEY_BG = '615a18b4b63f4bf6b581584ce0ceb1e1';
    ROLLBAR_KEY_POPUP = '615a18b4b63f4bf6b581584ce0ceb1e1';
    ROLLBAR_KEY_CONTENT = '615a18b4b63f4bf6b581584ce0ceb1e1';
    ROLLBAR_KEY_SETTINGS = '615a18b4b63f4bf6b581584ce0ceb1e1';
  }
} else if (REGION === 'au') {
  ROLLBAR_KEY_BG = 'cb989931a0184a1e8a25c9383fe0fe39';
  ROLLBAR_KEY_POPUP = '62c49720b7054d62816b7553dd8047f4';
  ROLLBAR_KEY_CONTENT = 'f9b4cacef8864a7d91aa15bb21876050';
  ROLLBAR_KEY_SETTINGS = 'fce3825d2fca4121a1ea8058cf523f18';
  if (BROWSER === 'safari') {
    ROLLBAR_KEY_BG = '2b9e173b124444a5973295ab2a37db19';
    ROLLBAR_KEY_POPUP = 'd43a351888384b1da60f15aef40a2f40';
    ROLLBAR_KEY_CONTENT = 'd8821c333db743e29185414dbd4c49a4';
    ROLLBAR_KEY_SETTINGS = 'c7366b99cf2f45c089433d1d60511891';
  }
  if (IS_TEST_VERSION) {
    ROLLBAR_KEY_BG = 'f8044d8b93c440598df6dd4bcb3ec562';
    ROLLBAR_KEY_POPUP = 'b18c9d72664b41f699806836f63a96c3';
    ROLLBAR_KEY_CONTENT = '430c9b471fdd4c378c38772269400b6c';
    ROLLBAR_KEY_SETTINGS = 'd9cf57e0ccab4089b9ab936406241c6e';
  }
} else if (REGION === 'fr') {
  ROLLBAR_KEY_BG = '4cc5a57571784bc3a58e70886e999c76';
  ROLLBAR_KEY_POPUP = 'e82f355a13c34bcfa611cd3ea7078b97';
  ROLLBAR_KEY_CONTENT = '08563c29ecc04ce79dec5ea28d84d96c';
  ROLLBAR_KEY_SETTINGS = 'e5a819e4f7814042ba16f75c7fa1be99';
  if (BROWSER === 'safari') {
    ROLLBAR_KEY_BG = '0ae6156a50384a74886aee520cff32a9';
    ROLLBAR_KEY_POPUP = '1f293688284c4f5189cb6a244ad0920e';
    ROLLBAR_KEY_CONTENT = '1c5646afee1a46eeb239ad04d6bf4e26';
    ROLLBAR_KEY_SETTINGS = 'e62e811d82594196a06fd85b4d1f7fe5';
  }
  if (IS_TEST_VERSION) {
    ROLLBAR_KEY_BG = '2c36d7762a6445039da2785aa44a395e';
    ROLLBAR_KEY_POPUP = '26028b611d494b6b9db80a539abe72f3';
    ROLLBAR_KEY_CONTENT = '7388053b19c8463485525e7b315f6b46';
    ROLLBAR_KEY_SETTINGS = '65aa3d3acdc44027af76b2aabeda2432';
  }
}
var ROLLBAR_ENVIRONMENT = IS_TEST_VERSION ? 'qa_testing' : 'production';
// if (ROLLBAR_ENVIRONMENT === 'qa_testing') {
//   ROLLBAR_ACTIVE = true;
// }
if (IS_CONFIG_TESTING) {
  ROLLBAR_ENVIRONMENT = 'config_testing';
  // ROLLBAR_ACTIVE = true;
}

if (false) {}

// test account
// ROLLBAR_KEY_BG = '4188fdab8c0644fd9fe3932424db5c73';
// ROLLBAR_KEY_POPUP = 'abb975881a864ed189a112ea0d915ca9';
// ROLLBAR_KEY_CONTENT = '7aca3e56b4cd41809e9bff3937f1d348';
// ROLLBAR_KEY_SETTINGS = 'eb2fc46bdc91498ebaac75159146d306';
// ROLLBAR_ACTIVE = true;


;// CONCATENATED MODULE: ./source/constants.js
// eslint-disable-next-line import/no-cycle






;// CONCATENATED MODULE: ./source/utils.js


function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

/* eslint-disable */

var promiseWrapper = function promiseWrapper(parent, method) {
  return function () {
    var newArguments = Array.prototype.slice.call(arguments);
    return new Promise(function (resolve) {
      newArguments.push(function () {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        }
        return resolve.apply(void 0, arguments);
      });
      parent[method].apply(parent, newArguments);
    });
  };
};
/* eslint-enable */

var getTabs = promiseWrapper(chrome.tabs, 'query');
var removeTabs = promiseWrapper(chrome.tabs, 'remove');
var getCurrentWindow = promiseWrapper(chrome.windows, 'getCurrent');
var getCookies = promiseWrapper(chrome.cookies, 'getAll');
var utils_getStorageData = promiseWrapper(chrome.storage.local, 'get');
var utils_setStorageData = promiseWrapper(chrome.storage.local, 'set');
var createTab = promiseWrapper(chrome.tabs, 'create');
var updateTab = promiseWrapper(chrome.tabs, 'update');
var asyncTimeout = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(t) {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (r) {
            return setTimeout(function () {
              return r(true);
            }, t);
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function asyncTimeout(_x) {
    return _ref.apply(this, arguments);
  };
}()));

/* eslint-disable */
var uuidv4 = function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};
/* eslint-enable */

var copyToClipBoard = function copyToClipBoard(string) {
  var clipboardData = window.clipboardData || navigator.clipboard;
  clipboardData.writeText(string);
};

// eslint-disable-next-line arrow-body-style
var getUserTCBTBAuth = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var cookies, tcbtbauth;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return getCookies({
            url: HOME_PAGE
          });
        case 2:
          cookies = _context2.sent;
          tcbtbauth = cookies.find(function (_ref3) {
            var name = _ref3.name;
            return name === 'TCBTBAuth';
          });
          return _context2.abrupt("return", tcbtbauth === null || tcbtbauth === void 0 ? void 0 : tcbtbauth.value);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getUserTCBTBAuth() {
    return _ref2.apply(this, arguments);
  };
}()));
var checkUserLogin = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var loginCookie;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return getUserTCBTBAuth();
        case 2:
          loginCookie = _context3.sent;
          return _context3.abrupt("return", !!loginCookie);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function checkUserLogin() {
    return _ref4.apply(this, arguments);
  };
}()));
var getBrowser = function getBrowser() {
  if (navigator.userAgent.indexOf('Chrome') !== -1) {
    if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
      return 'opera';
    }
    if (navigator.userAgent.indexOf('Edg') !== -1) {
      return 'edge';
    }
    return 'chrome';
  }
  if (navigator.userAgent.indexOf('Firefox') !== -1) {
    return 'firefox';
  }
  if (navigator.userAgent.indexOf('Safari') !== -1) {
    return 'safari';
  }
  return null;
};
var utils_getActiveTab = function getActiveTab() {
  return getTabs({
    active: true,
    currentWindow: true
  }).then(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 1),
      tab = _ref6[0];
    return tab;
  });
};
var getActiveTabServiceWorker = function getActiveTabServiceWorker() {
  return getTabs({
    active: true
  }).then(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 1),
      tab = _ref8[0];
    return tab;
  });
};
var getDevice = function getDevice() {
  var regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  if (regex.test(navigator.userAgent)) {
    return 'mobile';
  }
  return 'desktop';
};
var checkYahoo = function checkYahoo(href) {
  var url = href;
  if (/^(https?:\/\/)?(r|(..))search\.yahoo\.com\//i.test(href)) {
    // hack for YAHOO
    url = decodeURIComponent(decodeURIComponent(href));
    if (href.indexOf('[^_]url=http') > 0) {
      url = encodeURI(href.match(/[^_]url=([^&]+)/).pop());
    } else if (href.indexOf('?q=http') > 0) {
      url = encodeURI(href.match(/\?q=([^&]+)/).pop());
    }
  }
  return url;
};
var checkPrivateMode = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
    var browser, tab;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          browser = getBrowser();
          if (!(browser === 'safari')) {
            _context4.next = 6;
            break;
          }
          _context4.next = 4;
          return utils_getActiveTab();
        case 4:
          tab = _context4.sent;
          return _context4.abrupt("return", tab.incognito);
        case 6:
          return _context4.abrupt("return", false);
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function checkPrivateMode() {
    return _ref9.apply(this, arguments);
  };
}()));
function sliceByValues(arr, count) {
  var result = [];
  var collected = 0;

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  var _iterator = _createForOfIteratorHelper(arr),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      if (collected >= count) break;
      if (collected + item.rates.length <= count) {
        collected += item.rates.length;
        result.push({
          name: item.name,
          rates: item.rates
        });
      } else {
        result.push({
          name: item.name,
          rates: item.rates.slice(0, count - collected)
        });
        collected = count;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return result;
}
// this function is used to decompressed a gzip response that has been previously compressed on the server
// compressedResponse -> is the response from fetch
// new Response(decompressedStream).blob() -> returns the decompressed blob
// JSON.parse(await blob.text() -> converts the blob to json that is the required data type for this scenarion
function decompressGzipBody(_x2) {
  return _decompressGzipBody.apply(this, arguments);
}
function _decompressGzipBody() {
  _decompressGzipBody = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(compressedResponse) {
    var ds, decompressedStream, blob, data;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          // eslint-disable-next-line no-undef
          ds = new DecompressionStream('gzip');
          decompressedStream = compressedResponse.body.pipeThrough(ds);
          _context5.next = 4;
          return new Response(decompressedStream).blob();
        case 4:
          blob = _context5.sent;
          _context5.t0 = JSON;
          _context5.next = 8;
          return blob.text();
        case 8:
          _context5.t1 = _context5.sent;
          data = _context5.t0.parse.call(_context5.t0, _context5.t1);
          return _context5.abrupt("return", data);
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _decompressGzipBody.apply(this, arguments);
}
function openNewTabCashback(flagRedirect, isRequiresBacs, userBacs) {
  if (!flagRedirect) {
    return false;
  }
  if (isRequiresBacs && !userBacs) {
    return false;
  }
  return true;
}
function consoleLog() {
  if (false) { var _len, args, _key; }
}

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/rating.vue?vue&type=script&lang=js&


/* harmony default export */ const ratingvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      maxRating: 5,
      finalRating: 0,
      currentRating: 0
    };
  },
  methods: {
    rate: function rate() {
      window.open(STORE_URLS[getBrowser()], '_blank');
    }
  }
});
;// CONCATENATED MODULE: ./source/shared_components/rating.vue?vue&type=script&lang=js&
 /* harmony default export */ const shared_components_ratingvue_type_script_lang_js_ = (ratingvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/rating.vue?vue&type=style&index=0&id=1a60eb82&prod&lang=less&scoped=true&
var ratingvue_type_style_index_0_id_1a60eb82_prod_lang_less_scoped_true_ = __webpack_require__(9800);
;// CONCATENATED MODULE: ./source/shared_components/rating.vue?vue&type=style&index=0&id=1a60eb82&prod&lang=less&scoped=true&

;// CONCATENATED MODULE: ./source/shared_components/rating.vue



;


/* normalize component */

var rating_component = (0,componentNormalizer/* default */.Z)(
  shared_components_ratingvue_type_script_lang_js_,
  ratingvue_type_template_id_1a60eb82_scoped_true_render,
  ratingvue_type_template_id_1a60eb82_scoped_true_staticRenderFns,
  false,
  null,
  "1a60eb82",
  null
  
)

/* harmony default export */ const rating = (rating_component.exports);
;// CONCATENATED MODULE: ./source/brodcastChannel.js
/* eslint-disable import/no-mutable-exports */
// import { BROWSER } from './constants';

var broadcastChannel = new BroadcastChannel('service_popup_channel');

// if (BROWSER === 'safari') {
//   broadcastChannel = new BroadcastChannel('service_popup_channel');
// } else {
//   // chrome firefox edge
//   broadcastChannel = new BroadcastChannel('service_popup_channel');
// }

/* harmony default export */ const brodcastChannel = (broadcastChannel);
// EXTERNAL MODULE: ./node_modules/i18next/dist/esm/i18next.js + 1 modules
var i18next = __webpack_require__(8752);
;// CONCATENATED MODULE: ./source/locales/en-UK.js
var localeEnUk = {
  general: {
    multiple_type: 'All Other {{merchantName}} <span style="font-weight: normal;">Cashback </span>',
    single_type: '{{merchantName}} <span style="font-weight: normal;">Cashback </span>',
    category_type: '{{ category }} <span style="font-weight: normal;">Cashback</span>',
    cashback: 'Cashback',
    coupon_one: 'Voucher',
    coupon_other: 'Vouchers',
    lowcase: {
      coupon_one: 'voucher',
      coupon_other: 'vouchers'
    },
    replace_up_to: 'Up to '
  },
  content: {
    components: {
      secondNotifier: {
        description: 'Don\'t miss out on {{ reward }} cashback, activate below.',
        button_title: 'Activate cashback'
      },
      caa: {
        description_with_vouchers: 'Don\'t miss out on {{ reward }} cashback and apply vouchers.',
        button_title_with_vouchers: 'Activate cashback & vouchers',
        button_title_with_vouchers_mobile: 'Get cashback & vouchers',
        notification_title: 'We found {{ n_coupons }} {{ coupons }}',
        apply_button: 'Apply {{ coupons }}',
        title: 'We are automatically testing {{ n_coupons }} {{ coupons }}',
        progress_info: 'Testing code {{ process_index }} of {{ n_coupons }}',
        success: 'Success',
        success_text: 'We applied the best {{ coupons }} code to this order: <b>{{ best_coupon }}</b>',
        saved: 'You have saved',
        savings: '£{{ amount }}',
        also_get: 'You will also receive {{ cashback_reward }} {{ cashback }}',
        reward: '{{ cashback_reward }} {{ cashback }}',
        continue_shopping: 'Continue',
        fail: 'Sorry!',
        fail_text: "Sorry, we couldn't find any working codes",
        fail_text_with_cashback: "Sorry, we couldn't find any working codes but you will still receive {{ cashback_reward }} {{ cashback }}"
      },
      ga_slider: {
        title: 'TopCashback Browser Extension consent to analytical cookies',
        description: ['To help us improve our extension we would like to set', 'cookies which allows us to recognise and count the number', 'of users and to see how users interact with our extension whilst they are using it.'],
        description2: 'The cookies collect information anonymously so that it does not directly identify anyone.',
        privacy: 'TopCashback Browser Extension Privacy Policy',
        accept: 'Accept',
        decline: 'Decline'
      },
      notification: {
        promoted_text: 'Cashback',
        title_activated: '{{ promotedText }} Activated',
        button_title: '{{ reward }} {{ promotedText }}',
        title_not_logged_in: '{{ reward }} {{ promotedText }}',
        button_title_not_logged_in: 'Join or Login',
        button_title_activating: 'Activating',
        more_details: 'More details',
        more_details_coupons_one: 'and <strong>{{ count }} voucher</strong>',
        more_details_coupons_other: 'and <strong>{{ count }} vouchers</strong>',
        // eslint-disable-next-line quotes
        dont_show_again: "Don‘t show on {{ name }} again. You can change this in the settings.",
        bacs_required: 'BACS details required',
        activate_now: 'Activate Now'
      },
      reactivation: {
        button_title: 'Re-activate',
        title: 'Re-activate Cashback',
        description: 'We have detected that you have visited a site recently, which may disable your cashback.'
      },
      store_terms: {
        text: {
          part1: 'Exclusions may apply. Please always check the ',
          link: 'TopCashback site',
          part2: ' for the latest terms and cashback rates.'
        },
        more_details: 'View website for more details'
      },
      serp: {
        cashback: 'Cashback'
      }
    }
  },
  shared_components: {
    rating: {
      title: 'How are you liking Topcashback?'
    },
    tiers: {
      category_title: 'All purchases',
      show_more: 'Show more'
    },
    offer: {
      get_deal: 'Get Deal',
      use: 'Use {{ coupon }}',
      copied: '{{ coupon }} copied'
    }
  },
  popup: {
    app: {
      store_title: 'Store Deals',
      offers_title: 'Best Deals',
      recent_title: 'Recently Visited Stores',
      timer: 'Closes in {{ time }} seconds'
    },
    components: {
      store_tab: {
        cashback_terms: '{{ cashback }} Terms',
        best_deals: 'Best Deals',
        no_deals: 'No available deals',
        best_deals_vouchers_one: '& {{ count }} voucher',
        best_deals_vouchers_other: '& {{ count }} vouchers'
      },
      store_terms: {
        text: {
          part1: 'Exclusions may apply. Please always check the ',
          link: 'TopCashback site',
          part2: ' for the latest terms and cashback rates.'
        },
        more_details_simple: 'More Details',
        important: 'Important Note: ',
        exclusions: 'Exclusions: '
      },
      account: {
        title: 'Account'
      },
      recent_tab: {
        no_recently_visited: 'No recently visited stores to display'
      },
      footer: {
        my_account: 'My Account',
        settings: 'Settings'
      },
      header: {
        cashback: 'Cashback',
        title: '{{ promotedText }} activated',
        bacs_required: 'BACS details required',
        activate: '{{ reward }} {{ promotedText }}'
      },
      offerTab: {
        best_deals: 'Best Deals'
      },
      refer: {
        title: 'Copy this link and send it to your friends',
        link: 'www.example.com',
        copy: 'Copy',
        or: 'or'
      },
      search: {
        search: 'Search',
        cashback: 'Cashback',
        no_matches: 'No matching stores'
      },
      welcome: {
        button: 'Join or Login',
        private_mode: 'Please try again on a non private window',
        text: 'To use the TopCashback extension, join for free or login to your account to start saving with just one click.'
      }
    }
  },
  settings: {
    components: {
      app: {
        setting_title: 'TopCashback Extension Settings',
        checkbox_text: 'Allow data collection. Sharing your usage data with TopCashback Extension helps us improve our products and services.',
        muted_merchants: 'Muted Merchants',
        muted_merchants_remove: 'remove',
        rate: 'Rate Topcashback Extension',
        privacy_cookie_policy: 'See our <a href="{{ privacyPolicy }}" target="_blank">Privacy Policy</a> & <a href="{{ cookiePolicy }}" target="_blank">Cookie Policy</a>'
      }
    }
  },
  filters: {
    expire: {
      today: 'Expires Today',
      tomorrow: 'Expires Tomorrow',
      days_left: '{{ number_days }} days left',
      no_date: 'No Expiry Date',
      msg: 'Exp. {{-date }}'
    }
  }
};
/* harmony default export */ const en_UK = (localeEnUk);
;// CONCATENATED MODULE: ./source/locales/en-US.js
var localeEnUs = {
  general: {
    multiple_type: 'All Other {{merchantName}} <span style="font-weight: normal;">Cash back </span>',
    single_type: '{{merchantName}} <span style="font-weight: normal;">Cash back </span>',
    category_type: '{{ category }} <span style="font-weight: normal;">Cash back</span>',
    cashback: 'Cash Back',
    coupon_one: 'Coupon',
    coupon_other: 'Coupons',
    lowcase: {
      coupon_one: 'coupon',
      coupon_other: 'coupons'
    },
    replace_up_to: 'Up to '
  },
  content: {
    components: {
      secondNotifier: {
        description: 'Don\'t miss out on {{ reward }} cash back, activate below.',
        button_title: 'Activate cash back'
      },
      caa: {
        description_with_vouchers: 'Don\'t miss out on {{ reward }} cash back and apply coupons.',
        button_title_with_vouchers: 'Activate cash back & coupons',
        button_title_with_vouchers_mobile: 'Get cash back & coupons',
        notification_title: 'We found {{ n_coupons }} {{ coupons }}',
        apply_button: 'Apply {{ coupons }}',
        title: 'We are automatically testing {{ n_coupons }} {{ coupons }}',
        progress_info: 'Testing code {{ process_index }} of {{ n_coupons }}',
        success: 'Success',
        success_text: 'We applied the best {{ coupons }} code to this order: <b>{{ best_coupon }}</b>',
        saved: 'You have saved',
        savings: '$ {{ amount }}',
        also_get: 'You will also receive {{ cashback_reward }} {{ cashback }}',
        reward: '{{ cashback_reward }} {{ cashback }}',
        continue_shopping: 'Continue',
        fail: 'Sorry!',
        fail_text: "Sorry, we couldn't find any working codes",
        fail_text_with_cashback: "Sorry, we couldn't find any working codes but you will still receive {{ cashback_reward }} {{ cashback }}"
      },
      ga_slider: {
        title: 'Navigation options',
        description: ['Help improve our extension by allowing to receive diagnostic and usage data.', 'Personal information will remain confidential.'],
        description2: '',
        privacy: 'Privacy Policy',
        accept: 'Accept',
        decline: 'Decline'
      },
      notification: {
        promoted_text: 'Cash Back',
        title_activated: '{{ promotedText }} Activated',
        button_title: '{{ reward }} {{ promotedText }}',
        title_not_logged_in: '{{ reward }} {{ promotedText }}',
        button_title_not_logged_in: 'Join or Login',
        button_title_activating: 'Activating',
        more_details: 'More details',
        more_details_coupons_one: 'and <strong>{{ count }} coupon</strong>',
        more_details_coupons_other: 'and <strong>{{ count }} coupons</strong>',
        // eslint-disable-next-line quotes
        dont_show_again: " Don‘t show on {{ name }} again. You can change this in the settings.",
        bacs_required: 'BACS details required',
        activate_now: 'Activate Now'
      },
      reactivation: {
        button_title: 'Reactivate',
        title: 'Reactivate Cash Back',
        description: 'We have detected that you have visited a site recently, which may disable your cash back.'
      },
      store_terms: {
        text: {
          part1: 'Exclusions may apply. Please always check the ',
          link: 'TopCashback site',
          part2: ' for the latest terms and cash back rates.'
        },
        more_details: 'View website for more details'
      },
      serp: {
        cashback: 'Cash Back'
      }
    }
  },
  shared_components: {
    rating: {
      title: 'How are you liking Topcashback?'
    },
    tiers: {
      category_title: 'All purchases',
      show_more: 'Show more'
    },
    offer: {
      get_deal: 'Get Deal',
      use: 'Use {{ coupon }}',
      copied: '{{ coupon }} copied'
    }
  },
  popup: {
    app: {
      store_title: 'Store Deals',
      offers_title: 'Best Deals',
      recent_title: 'Recently Visited Stores',
      timer: 'Closes in {{ time }} seconds'
    },
    components: {
      store_tab: {
        cashback_terms: '{{ cashback }} Terms',
        best_deals: 'Best Deals',
        best_deals_vouchers_one: '& {{ count }} coupon',
        best_deals_vouchers_other: '& {{ count }} coupons',
        no_deals: 'No available deals'
      },
      store_terms: {
        text: {
          part1: 'Exclusions may apply. Please always check the ',
          link: 'TopCashback site',
          part2: ' for the latest terms and cash back rates.'
        },
        more_details_simple: 'More Details',
        important: 'Important Note: ',
        exclusions: 'Exclusions: '
      },
      account: {
        title: 'Account'
      },
      recent_tab: {
        no_recently_visited: 'No recently visited stores to display'
      },
      footer: {
        my_account: 'My Account',
        settings: 'Settings'
      },
      header: {
        cashback: 'Cash Back',
        title: '{{ promotedText }} activated',
        bacs_required: 'BACS details required',
        activate: '{{ reward }} {{ promotedText }}'
      },
      offerTab: {
        best_deals: 'Best Deals'
      },
      refer: {
        title: 'Copy this link and send it to your friends',
        link: 'www.example.com',
        copy: 'Copy',
        or: 'or'
      },
      search: {
        search: 'Search',
        cashback: 'Cash Back',
        no_matches: 'No matching stores'
      },
      welcome: {
        button: 'Join or Login',
        private_mode: 'Please try again on a non private window',
        text: 'To use the TopCashback extension, join for free or login to your account to start saving with just one click.'
      }
    }
  },
  settings: {
    components: {
      app: {
        setting_title: 'TopCashback Extension Settings',
        checkbox_text: 'Allow data collection. Sharing your usage data with TopCashback Extension helps us improve our products and services.',
        muted_merchants: 'Muted Merchants',
        muted_merchants_remove: 'remove',
        rate: 'Rate Topcashback Extension',
        privacy_cookie_policy: 'See our <a href="{{ privacyPolicy }}" target="_blank">Privacy Policy</a> & <a href="{{ cookiePolicy }}" target="_blank">Cookie Policy</a>'
      }
    }
  },
  filters: {
    expire: {
      today: 'Expires Today',
      tomorrow: 'Expires Tomorrow',
      days_left: '{{ number_days }} days left',
      no_date: 'No Expiry Date',
      msg: 'Exp. {{-date }}'
    }
  }
};
/* harmony default export */ const en_US = (localeEnUs);
;// CONCATENATED MODULE: ./source/locales/de-DE.js
var localedeDe = {
  general: {
    multiple_type: '<span style="font-weight: normal;">Mehr Cashback von </span>{{ merchantName }}',
    single_type: '{{ merchantName }} <span style="font-weight: normal;">Cashback</span>',
    category_type: '{{ category }} <span style="font-weight: normal;">Cashack</span>',
    cashback: 'Cashback',
    coupon_one: 'Gutschein',
    coupon_other: 'Gutscheine',
    lowcase: {
      coupon_one: 'gutschein',
      coupon_other: 'gutscheine'
    },
    replace_up_to: 'Bis zu '
  },
  content: {
    components: {
      secondNotifier: {
        description: 'Verpasse nicht die Chance auf {{ reward }} Cashback. Jetzt unten aktivieren.',
        button_title: 'Cashback aktivieren'
      },
      caa: {
        description_with_vouchers: 'Verpasse nicht die Chance auf {{ reward }} Cashback und füge die Gutscheincodes hinzu.',
        button_title_with_vouchers: 'Cashback und Gutscheincodes aktivieren',
        button_title_with_vouchers_mobile: 'Cashback und Gutscheincodes aktivieren',
        notification_title: 'Wir haben einen {{ n_coupons }} {{ coupons }} gefunden',
        apply_button: '{{ coupons }} anwenden',
        title: 'Wir testen derzeit automatisch {{ n_coupons }} {{ coupons }}verwenden',
        progress_info: 'Prüfung des Codes {{ process_index }} von {{ n_coupons }}',
        success: 'Hurra- Es hat geklappt',
        success_text: 'Wir haben den besten {{ coupons }} für diese Bestellung angewendet: <b>{{ best_coupon }}</b>',
        saved: 'Du hast gespart',
        savings: '€{{ amount }}',
        also_get: 'Du erhältst zudem noch {{ cashback_reward }} {{ cashback }}',
        reward: '{{ cashback_reward }} {{ cashback }}',
        continue_shopping: 'Weiter',
        fail: 'Sorry!',
        fail_text: 'Leider konnten wir keine funktionierenden Gutscheincodes finden',
        fail_text_with_cashback: 'Leider konnten wir keine funktionierenden Gutscheincodes finden, Du erhältst jedoch bis zu {{ cashback_reward }} {{ cashback }}'
      },
      ga_slider: {
        title: 'TopCashback Browser Erweiterung - Einwiligung zu analytischen Cookies',
        description: ['Um uns dabei zu helfen unsere Browser-Erweiterung zu verbessern, würden wir gerne Cookies aktivieren.', 'Diese erlauben uns einzusehen, wie viele Mitglieder die Erweiterung benutzen und wie diese mit der Anwendung interagieren.'],
        description2: 'Die Informationen, welche die Cookies sammeln sind vollständig anonymisiert und können nicht auf bestimmte Nutzer zurückgeführt werden.',
        privacy: 'TopCashback Browser Erweiterung Datenschutzbestimmungen',
        accept: 'Akzeptieren',
        decline: 'Ablehnen'
      },
      notification: {
        promoted_text: 'Cashback',
        title_activated: '{{ promotedText }} wurde aktiviert',
        button_title: '{{ reward }} {{ promotedText }}',
        title_not_logged_in: '{{ reward }} {{ promotedText }}',
        button_title_not_logged_in: 'Registrieren oder Anmelden',
        button_title_activating: 'Aktivieren',
        more_details: 'Weitere Informationen',
        more_details_coupons_one: 'und <strong>{{ count }} Gutscheine</strong>',
        more_details_coupons_other: 'und <strong>{{ count }} Gutscheine</strong>',
        // eslint-disable-next-line quotes
        dont_show_again: "{{ name }} nicht mehr anzeigen. Du kannst diese Einstellungen jederzeit ändern.",
        bacs_required: 'SEPA-Angaben erforderlich',
        activate_now: 'Jetzt aktivieren'
      },
      reactivation: {
        button_title: 'Reaktivieren',
        title: 'Cashback reaktivieren',
        description: 'Wir haben festgestellt, dass Du vor Kurzem eine Website besucht hast, die eventuell Dein Cashback deaktiviert haben könnte.'
      },
      store_terms: {
        text: {
          part1: 'Ausnahmen können gelten. Bitte informiere Dich stets auf der ',
          link: 'TopCashback Seite',
          part2: ' über die aktuellen Bedingungen und Cashbackraten.'
        },
        more_details: 'Weitere Informationen findest Du auf der Webseite'
      },
      serp: {
        cashback: 'Cashback'
      }
    }
  },
  shared_components: {
    rating: {
      title: 'Wie gefällt Dir TopCashback?'
    },
    tiers: {
      category_title: 'Alle Einkäufe',
      show_more: 'Mehr anzeigen'
    },
    offer: {
      get_deal: 'Angebot nutzen',
      use: '{{ coupon }} benutzen',
      copied: '{{ coupon }} wurde kopiert'
    }
  },
  popup: {
    app: {
      store_title: 'Händler Angebote',
      offers_title: 'Beste Angebote',
      recent_title: 'Kürzlich besuchte Shops',
      timer: 'Schließt in {{ time }} Sekunden'
    },
    components: {
      store_tab: {
        cashback_terms: '{{ cashback }} Bedingungen',
        best_deals: 'Die besten Angebote',
        no_deals: 'Keine verfügbaren Angebote',
        best_deals_vouchers_one: '& {{ count }} Gutscheine',
        best_deals_vouchers_other: '& {{ count }} Gutscheine'
      },
      store_terms: {
        text: {
          part1: 'Ausnahmen können gelten. Bitte informiere Dich stets auf der ',
          link: 'TopCashback Seite',
          part2: ' über die aktuellen Bedingungen und Cashbackraten.'
        },
        more_details_simple: 'Mehr Details',
        important: 'Wichtiger Hinweis: ',
        exclusions: 'Ausnahmen: '
      },
      account: {
        title: 'Konto'
      },
      recent_tab: {
        no_recently_visited: 'Es gibt keine kürzlich besuchten Shops, die angezeigt werden können'
      },
      footer: {
        my_account: 'Mein Konto',
        settings: 'Einstellungen'
      },
      header: {
        cashback: 'Cashback',
        title: '{{ promotedText }} wurde aktiviert',
        bacs_required: 'SEPA Informationen werden benötigt',
        activate: '{{ reward }} {{ promotedText }}'
      },
      offerTab: {
        best_deals: 'Beste Angebote'
      },
      refer: {
        title: 'Kopiere diesen Link und sende ihn zu Deinen Freunden',
        link: 'www.beispiel.de',
        copy: 'Kopieren',
        or: 'oder'
      },
      search: {
        search: 'Suche',
        cashback: 'Cashback',
        no_matches: 'Keine passenden Geschäfte gefunden'
      },
      welcome: {
        button: 'Registrieren oder Anmelden',
        private_mode: 'Bitte versuche es erneut in einem nicht-privaten Fenster',
        text: 'Um die TopCashback-Erweiterung zu nutzen, melde Dich kostenlos an oder registriere Dich jetzt und beginne mit nur einem Klick zu sparen'
      }
    }
  },
  settings: {
    components: {
      app: {
        setting_title: 'Einstellungen für die TopCashback Browser Erweiterung',
        checkbox_text: 'Datenermittlung erlauben. Das Teilen Deiner Nutzungsdaten der TopCashback Browser Erweiterung hilft uns dabei, unsere Produkte und unseren Service zu verbessern.',
        muted_merchants: 'Stummgeschaltene Händler',
        muted_merchants_remove: 'entfernen',
        rate: 'TopCashback Browser Extension bewerten',
        privacy_cookie_policy: 'Lese unsere <a href="{{ privacyPolicy }}" target="_blank">Datenschutzerklärung</a> & <a href="{{ cookiePolicy }}" target="_blank">Cookie-Richtlinie</a>'
      }
    }
  },
  filters: {
    expire: {
      today: 'Läuft heute ab',
      tomorrow: 'Läuft morgen ab',
      days_left: 'Noch {{ number_days }} Tage gültig',
      no_date: 'Zeitlich unbegrenztes Angebot',
      msg: 'Bis {{-date }} gültig'
    }
  }
};
/* harmony default export */ const de_DE = (localedeDe);
;// CONCATENATED MODULE: ./source/locales/fr-FR.js
var localeFrFR = {
  general: {
    multiple_type: 'Tous les autres {{merchantName}} <span style=""font-weight: normal;"">Cashback</span>',
    single_type: '{{merchantName}} <span style=""font-weight: normal;"">Cashback</span>',
    category_type: '{{ category }} <span style=""font-weight: normal;"">Cashback</span>',
    cashback: 'Cashback',
    coupon_one: 'Coupon',
    coupon_other: 'Coupons',
    lowcase: {
      coupon_one: 'coupon',
      coupon_other: 'coupons'
    },
    replace_up_to: 'Jusqu\'à '
  },
  content: {
    components: {
      secondNotifier: {
        description: 'Ne manquez pas le cashback de {{ reward }} , activez ci-dessous.',
        button_title: 'Activer le cashback'
      },
      caa: {
        description_with_vouchers: 'Ne manquez pas le cashback de {{ reward }} et appliquez les bons.',
        button_title_with_vouchers: 'Activer cashback & coupons',
        button_title_with_vouchers_mobile: 'Gagner du cashback & des réductions',
        notification_title: 'Nous avons trouvé {{ n_coupons }} {{ coupons }}',
        apply_button: 'Appliquer {{ coupons }}',
        title: 'Nous testons automatiquement {{ n_coupons }} {{ coupons }}',
        progress_info: 'Test du code {{ process_index }} sur {{ n_coupons }}',
        success: 'Succès',
        success_text: 'Nous avons appliqué le meilleur code {{ coupons }} à cette commande : <b>{{ best_coupon }}</b>',
        saved: 'Vous avez économisé',
        savings: '€{{ amount }}',
        also_get: 'Vous recevrez également {{ cashback_reward }} {{ cashback }}',
        reward: '{{ cashback_reward }} {{ cashback }}',
        continue_shopping: 'Continuer',
        fail: 'Désolé !',
        fail_text: "Désolé, nous n'avons trouvé aucun code fonctionnel",
        fail_text_with_cashback: "Désolé, nous n'avons trouvé aucun code fonctionnel mais vous recevrez tout de même {{ cashback_reward }} {{ cashback }}"
      },
      ga_slider: {
        title: 'Consentement de l\'extension TopCashback Browser à l\'utilisation des cookies analytiques',
        description: ['Pour nous aider à améliorer notre extension, nous souhaiterions installer', 'des cookies nous permettant de reconnaître et de compter le nombre', 'd\'utilisateurs et de voir comment les utilisateurs interagissent avec notre extension lorsqu\'ils l\'utilisent.'],
        description2: 'Les cookies recueillent des informations de manière anonyme afin de ne pas identifier directement quiconque.',
        privacy: 'Politique de confidentialité de l\'extension TopCashback Browser',
        accept: 'Accepter',
        decline: 'Refuser'
      },
      notification: {
        promoted_text: 'Cashback',
        title_activated: '{{ reward }} {{ promotedText }} activé',
        button_title: '{{ reward }} {{ promotedText }}',
        title_not_logged_in: '{{ reward }} {{ promotedText }}',
        button_title_not_logged_in: 'S\'isncrire ou Se connecter',
        button_title_activating: 'Activer',
        more_details: 'Plus de détails',
        more_details_coupons_one: 'et <strong>{{ count }} code promo</strong>',
        more_details_coupons_other: 'et <strong>{{ count }} codes promo</strong>',
        // eslint-disable-next-line quotes
        dont_show_again: "Ne plus afficher sur {{ name }}. Vous pouvez changer cela dans les paramètres.",
        becs_required: 'Détails SEPA requis',
        activate_now: 'Activer maintenant'
      },
      reactivation: {
        button_title: 'Ré-activer',
        title: 'Ré-activer le Cashback',
        description: 'Nous avons détecté que vous avez récemment visité un site qui pourrait désactiver votre cashback.'
      },
      store_terms: {
        text: {
          part1: 'Des exclusions peuvent s\'appliquer. Veuillez toujours vérifier le ',
          link: 'site TopCashback',
          part2: ' pour les derniers termes et taux de cashback.'
        },
        more_details: 'Voir le site pour plus de détails'
      },
      serp: {
        cashback: 'Cashback'
      }
    }
  },
  shared_components: {
    rating: {
      title: 'Que pensez-vous de Topcashback ?'
    },
    tiers: {
      category_title: 'Tous les achats',
      show_more: 'Afficher plus'
    },
    offer: {
      get_deal: 'Profiter de l\'offre',
      use: 'Utiliser {{ coupon }}',
      copied: '{{ coupon }} copié'
    }
  },
  popup: {
    app: {
      store_title: 'Offres Magasin',
      offers_title: 'Meilleures Offres',
      recent_title: 'Magasins Visités Récemment',
      timer: 'Fermeture dans {{ time }} secondes'
    },
    components: {
      store_tab: {
        cashback_terms: 'Conditions du {{ cashback }}',
        best_deals: 'Meilleures Offres',
        best_deals_vouchers_one: '& {{ count }} code promo',
        best_deals_vouchers_other: '& {{ count }} codes promo',
        no_deals: 'Aucune offre disponible'
      },
      store_terms: {
        text: {
          part1: 'Des exclusions peuvent s\'appliquer. Veuillez toujours vérifier le ',
          link: 'site TopCashback',
          part2: ' pour les dernières conditions et taux de cashback.'
        },
        more_details_simple: 'Plus de Détails',
        important: 'Note Importante : ',
        exclusions: 'Exclusions : '
      },
      account: {
        title: 'Compte'
      },
      recent_tab: {
        no_recently_visited: 'Aucun magasin visité récemment'
      },
      footer: {
        my_account: 'Mon Compte',
        tell_friend: 'Parrainage',
        settings: 'Paramètres'
      },
      header: {
        cashback: 'Cashback',
        title: '{{ promotedText }} activé',
        becs_required: 'Détails SEPA requis',
        activate: 'Activer {{ reward }} {{ promotedText }}'
      },
      offerTab: {
        best_deals: 'Meilleures Offres'
      },
      refer: {
        title: 'Copiez ce lien et envoyez-le à vos amis',
        link: 'www.example.com',
        copy: 'Copier',
        or: 'ou'
      },
      search: {
        search: 'Rechercher',
        cashback: 'Cashback',
        no_matches: 'Aucun magasin correspondant'
      },
      welcome: {
        button: 'S\'isncrire ou Se connecter',
        private_mode: 'Veuillez réessayer dans une fenêtre non privée',
        text: 'Pour utiliser l\'extension TopCashback, inscrivez-vous gratuitement ou connectez-vous à votre compte pour commencer à économiser en un seul clic.'
      }
    }
  },
  settings: {
    components: {
      app: {
        muted_merchants: 'Marchands maqués',
        muted_merchants_remove: 'Enlever',
        rate: 'Notez l\'extension TopCashBack',
        privacy_cookie_policy: 'Voir notre <a href="{{ privacyPolicy }}" target="_blank">politique de confidentialité</a> et <a href="{{ cookiePolicy }}" target="_blank">politique en matière de cookies</a>',
        setting_title: 'Paramètres de l\'extension TopCashback',
        checkbox_text: 'Autoriser la collecte de données. Partager vos données d\'utilisation avec extension TopCashback nous aide à améliorer nos produits et services.'
      }
    }
  },
  filters: {
    expire: {
      today: 'Expire Aujourd\'hui',
      tomorrow: 'Expire Demain',
      days_left: '{{ number_days }} jours restants',
      no_date: 'Pas de Date d\'Expiration',
      msg: 'Exp. {{-date }}'
    }
  }
};
/* harmony default export */ const fr_FR = (localeFrFR);
;// CONCATENATED MODULE: ./source/locales/en-AU.js
var localeEnAu = {
  general: {
    multiple_type: 'All Other {{merchantName}} <span style="font-weight: normal;">Cashback </span>',
    single_type: '{{merchantName}} <span style="font-weight: normal;">Cashback </span>',
    category_type: '{{ category }} <span style="font-weight: normal;">Cashback</span>',
    cashback: 'Cashback',
    coupon_one: 'Coupon',
    coupon_other: 'Coupons',
    lowcase: {
      coupon_one: 'coupon',
      coupon_other: 'coupons'
    },
    replace_up_to: 'Up to '
  },
  content: {
    components: {
      secondNotifier: {
        description: 'Don\'t miss out on {{ reward }} cashback, activate below.',
        button_title: 'Activate cashback'
      },
      caa: {
        description_with_vouchers: 'Don\'t miss out on {{ reward }} cashback and apply coupons.',
        button_title_with_vouchers: 'Activate cashback & coupons',
        button_title_with_vouchers_mobile: 'Get cashback & coupons',
        notification_title: 'We found {{ n_coupons }} {{ coupons }}',
        apply_button: 'Apply {{ coupons }}',
        title: 'We are automatically testing {{ n_coupons }} {{ coupons }}',
        progress_info: 'Testing code {{ process_index }} of {{ n_coupons }}',
        success: 'Success',
        success_text: 'We applied the best {{ coupons }} code to this order: <b>{{ best_coupon }}</b>',
        saved: 'You have saved',
        savings: '$ {{ amount }}',
        also_get: 'You will also receive {{ cashback_reward }} {{ cashback }}',
        reward: '{{ cashback_reward }} {{ cashback }}',
        continue_shopping: 'Continue',
        fail: 'Sorry!',
        fail_text: "Sorry, we couldn't find any working codes",
        fail_text_with_cashback: "Sorry, we couldn't find any working codes but you will still receive {{ cashback_reward }} {{ cashback }}"
      },
      ga_slider: {
        title: 'TopCashback Browser Extension consent to analytical cookies',
        description: ['To help us improve our extension we would like to set', 'cookies which allows us to recognise and count the number', 'of users and to see how users interact with our extension whilst they are using it.'],
        description2: 'The cookies collect information anonymously so that it does not directly identify anyone.',
        privacy: 'TopCashback Browser Extension Privacy Policy',
        accept: 'Accept',
        decline: 'Decline'
      },
      notification: {
        promoted_text: 'Cashback',
        title_activated: '{{ reward }} {{ promotedText }} active',
        button_title: '{{ reward }} {{ promotedText }}',
        title_not_logged_in: '{{ reward }} {{ promotedText }}',
        button_title_not_logged_in: 'Join or Login',
        button_title_activating: 'Activating',
        more_details: 'More details',
        more_details_coupons_one: 'and <strong>{{ count }} coupon</strong>',
        more_details_coupons_other: 'and <strong>{{ count }} coupons</strong>',
        // eslint-disable-next-line quotes
        dont_show_again: "Don‘t show on {{ name }} again. You can change this in the settings.",
        bacs_required: 'BECS details required',
        activate_now: 'Activate Now'
      },
      reactivation: {
        button_title: 'Re-activate',
        title: 'Re-activate Cashback',
        description: 'We have detected that you have visited a site recently, which may disable your cashback.'
      },
      store_terms: {
        text: {
          part1: 'Exclusions may apply. Please always check the ',
          link: 'TopCashback site',
          part2: ' for the latest terms and cashback rates.'
        },
        more_details: 'View website for more details'
      },
      serp: {
        cashback: 'Cashback'
      }
    }
  },
  shared_components: {
    rating: {
      title: 'How are you liking Topcashback?'
    },
    tiers: {
      category_title: 'All purchases',
      show_more: 'Show more'
    },
    offer: {
      get_deal: 'Get Deal',
      use: 'Use {{ coupon }}',
      copied: '{{ coupon }} copied'
    }
  },
  popup: {
    app: {
      store_title: 'Store Deals',
      offers_title: 'Best Deals',
      recent_title: 'Recently Visited Stores',
      timer: 'Closes in {{ time }} seconds'
    },
    components: {
      store_tab: {
        cashback_terms: '{{ cashback }} Terms',
        best_deals: 'Best Deals',
        best_deals_vouchers_one: '& {{ count }} coupon',
        best_deals_vouchers_other: '& {{ count }} coupons',
        no_deals: 'No available deals'
      },
      store_terms: {
        text: {
          part1: 'Exclusions may apply. Please always check the ',
          link: 'TopCashback site',
          part2: ' for the latest terms and cashback rates.'
        },
        more_details_simple: 'More Details',
        important: 'Important Note: ',
        exclusions: 'Exclusions: '
      },
      account: {
        title: 'Account'
      },
      recent_tab: {
        no_recently_visited: 'No recently visited stores to display'
      },
      footer: {
        my_account: 'My Account',
        settings: 'Settings'
      },
      header: {
        cashback: 'Cashback',
        title: '{{ promotedText }} activated',
        bacs_required: 'BECS details required',
        activate: 'Activate {{ reward }} {{ promotedText }}'
      },
      offerTab: {
        best_deals: 'Best Deals'
      },
      refer: {
        title: 'Copy this link and send it to your friends',
        link: 'www.example.com',
        copy: 'Copy',
        or: 'or'
      },
      search: {
        search: 'Search',
        cashback: 'Cashback',
        no_matches: 'No matching stores'
      },
      welcome: {
        button: 'Join or Login',
        private_mode: 'Please try again on a non private window',
        text: 'To use the TopCashback extension, join for free or login to your account to start saving with just one click.'
      }
    }
  },
  settings: {
    components: {
      app: {
        muted_merchants: 'Muted Merchants',
        muted_merchants_remove: 'remove',
        rate: 'Rate Topcashback Extension',
        privacy_cookie_policy: 'See our <a href="{{ privacyPolicy }}" target="_blank">Privacy Policy</a> & <a href="{{ cookiePolicy }}" target="_blank">Cookie Policy</a>',
        setting_title: 'Settings for the TopCashback Extension',
        checkbox_text: 'Allow data collection. Sharing your usage data with TopCashback Extension helps us improve our products and services.'
      }
    }
  },
  filters: {
    expire: {
      today: 'Expires Today',
      tomorrow: 'Expires Tomorrow',
      days_left: '{{ number_days }} days left',
      no_date: 'No Expiry Date',
      msg: 'Exp. {{-date }}'
    }
  }
};
/* harmony default export */ const en_AU = (localeEnAu);
;// CONCATENATED MODULE: ./source/i18n.js







i18next/* default.init */.ZP.init({
  // debug: true,
  fallbackLng: 'en-UK',
  resources: {
    'en-UK': {
      translation: en_UK
    },
    'en-US': {
      translation: en_US
    },
    'de-DE': {
      translation: de_DE
    },
    'fr-FR': {
      translation: fr_FR
    },
    'en-AU': {
      translation: en_AU
    }
  }
});
i18next/* default.changeLanguage */.ZP.changeLanguage(LANGUAGE);
/* harmony default export */ const i18n = (i18next/* default */.ZP);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/settings/components/app.vue?vue&type=script&lang=js&











/* harmony default export */ const appvue_type_script_lang_js_ = ({
  components: {
    Checkbox: components_checkbox,
    Rating: rating
  },
  data: function data() {
    return {
      name: chrome.runtime.getManifest().name,
      mutedMerchants: [],
      settings: null,
      merchants: null,
      dataReady: false
    };
  },
  mounted: function mounted() {
    var _this = this;
    return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
      var _yield$getStorageData, _yield$getStorageData2, mutedMerchants, _yield$getStorageData3, settings, merchantsData;
      return regenerator_default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return utils_getStorageData('mutedMerchants');
          case 2:
            _yield$getStorageData = _context.sent;
            _yield$getStorageData2 = _yield$getStorageData.mutedMerchants;
            mutedMerchants = _yield$getStorageData2 === void 0 ? [] : _yield$getStorageData2;
            _context.next = 7;
            return utils_getStorageData('settings');
          case 7:
            _yield$getStorageData3 = _context.sent;
            settings = _yield$getStorageData3.settings;
            _this.settings = settings;
            _context.next = 12;
            return utils_getStorageData('merchants.data');
          case 12:
            merchantsData = _context.sent;
            _this.merchants = merchantsData['merchants.data'];
            _this.setMutedMerchantsByIds(mutedMerchants);
            _this.dataReady = true;
          case 16:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  computed: {
    rate: function rate() {
      return STORE_URLS[getBrowser()];
    },
    cookiePolicy: function cookiePolicy() {
      return COOKIE_POLICY;
    },
    privacyPolicy: function privacyPolicy() {
      return PRIVACY_POLICY;
    },
    terms: function terms() {
      return purify.sanitize(i18n.t('settings.components.app.privacy_cookie_policy', {
        privacyPolicy: PRIVACY_POLICY,
        cookiePolicy: COOKIE_POLICY
      }));
    }
  },
  methods: {
    update: function update(data) {
      // const { app } = chrome.extension.getBackgroundPage();
      // app.saveSettings(data);
      sendContentMessage({
        action: 'saveSettings',
        data: {
          data: data
        }
      });
    },
    setMutedMerchantsByIds: function setMutedMerchantsByIds(ids) {
      var _this2 = this;
      this.mutedMerchants = ids.map(function (muted) {
        return _this2.merchants.find(function (el) {
          return el.id === muted;
        });
      });
    },
    remove: function remove(index) {
      brodcastChannel.postMessage({
        type: 'analytics',
        dataGA: {
          ec: 'Settings',
          ea: 'Show Again',
          el: this.mutedMerchants[index].name
        }
      });
      sendContentMessage({
        action: 'updateMerchantState',
        data: {
          id: this.mutedMerchants[index].id,
          state: {
            showNotification: true
          }
        }
      });
      this.mutedMerchants.splice(index, 1);
      utils_setStorageData({
        mutedMerchants: (0,toConsumableArray/* default */.Z)(this.mutedMerchants.map(function (el) {
          return el.id;
        }))
      });
    }
  }
});
;// CONCATENATED MODULE: ./source/settings/components/app.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_appvue_type_script_lang_js_ = (appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/settings/components/app.vue?vue&type=style&index=0&id=a8125c40&prod&lang=less&
var appvue_type_style_index_0_id_a8125c40_prod_lang_less_ = __webpack_require__(6326);
;// CONCATENATED MODULE: ./source/settings/components/app.vue?vue&type=style&index=0&id=a8125c40&prod&lang=less&

;// CONCATENATED MODULE: ./source/settings/components/app.vue



;


/* normalize component */

var app_component = (0,componentNormalizer/* default */.Z)(
  components_appvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const app = (app_component.exports);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 1 modules
var slicedToArray = __webpack_require__(9439);
;// CONCATENATED MODULE: ./source/rollbarConfig.js






// Function to fetch and cache the merchant data
function fetchAndCacheMerchantData() {
  return _fetchAndCacheMerchantData.apply(this, arguments);
} //  Fetch and cache the merchant data during application startup
function _fetchAndCacheMerchantData() {
  _fetchAndCacheMerchantData = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
    var data;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return utils_getStorageData('merchants.data');
        case 3:
          data = _context.sent;
          return _context.abrupt("return", data['merchants.data']);
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", []);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _fetchAndCacheMerchantData.apply(this, arguments);
}
var cachedMerchantData = [];
fetchAndCacheMerchantData().then(function (data) {
  cachedMerchantData = data;
});
// .catch((error) => {
//   // eslint-disable-next-line no-console
//   // console.error('Error during fetching and caching:', error);
// });

// Synchronous version of getByUrl using the cached data
function getByUrl(url) {
  try {
    var _URL = new URL(url.toLowerCase()),
      host = _URL.host,
      pathname = _URL.pathname;
    var ignored = IGNORED_ULRS.find(function (ignoredUrl) {
      return host === ignoredUrl;
    });
    if (ignored) return null;
    var bestMatch = {
      len: 0,
      index: null
    };
    var filtered = cachedMerchantData.filter(function (_ref) {
      var domain = _ref.domain;
      var rx = new RegExp("(^|\\.)".concat(domain));
      return rx.test(host);
    });
    filtered.forEach(function (_ref2, index) {
      var mUrl = _ref2.url;
      var _URL2 = new URL(mUrl),
        mHost = _URL2.host,
        mPath = _URL2.pathname;
      var _ref3 = (host + pathname).match(mHost + mPath) || [],
        _ref4 = (0,slicedToArray/* default */.Z)(_ref3, 1),
        match = _ref4[0];
      if (match && match.length > bestMatch.len) {
        Object.assign(bestMatch, {
          len: match.length,
          index: index
        });
      }
    });
    if (typeof bestMatch.index === 'number') {
      return filtered[bestMatch.index];
    }
    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    // console.error('Error processing URL:', error);
    return null;
  }
}

// eslint-disable-next-line no-underscore-dangle, no-unused-vars
var _rollbarConfig = function _rollbarConfig(rollbarKey, bundle) {
  return {
    checkIgnore: function checkIgnore(isUncaught, args, payload) {
      var _payload$request, _payload$custom, _payload$body, _payload$custom2;
      var url = payload === null || payload === void 0 || (_payload$request = payload.request) === null || _payload$request === void 0 ? void 0 : _payload$request.url;
      var merchant = getByUrl(url);
      if ((payload === null || payload === void 0 || (_payload$custom = payload.custom) === null || _payload$custom === void 0 ? void 0 : _payload$custom.typeOfError) === 'config') {
        // eslint-disable-next-line no-param-reassign
        payload.merchantName = merchant === null || merchant === void 0 ? void 0 : merchant.id;
      }
      var isExternalError = (payload === null || payload === void 0 || (_payload$body = payload.body) === null || _payload$body === void 0 || (_payload$body = _payload$body.trace) === null || _payload$body === void 0 || (_payload$body = _payload$body.exception) === null || _payload$body === void 0 ? void 0 : _payload$body["class"]) === '(unknown)';

      // new way of ignoring errors
      if (isExternalError) {
        return true;
      }

      // old way of ignoring errors
      // if (args.length && BROWSER === 'chrome'
      //   && !(args[0]?.stack?.includes('chrome-extension://')
      //       || args[1]?.stack?.includes('chrome-extension://'))) {
      //   return true;
      // }

      // ignore rollbar errors
      // if (payload?.request?.url.includes('rollbar')) {
      //   return true;
      // }

      // ignore errors from merchants that are not in the list -> if in rollbar we get errors, there might be other sites
      // that are not in the list and we don't want to get errors from them
      if (merchant === null && (payload === null || payload === void 0 || (_payload$custom2 = payload.custom) === null || _payload$custom2 === void 0 ? void 0 : _payload$custom2.typeOfError) === 'config') {
        return true;
      }
      var ignoredErrors = [/timeout/, /Failed to fetch/, /Unexpected token '<'.* is not valid JSON/, /No tab with id:/, /Error in storage\.get/, /FILE_ERROR_NO_SPACE/, /The browser is shutting down/, /Could not establish connection\. Receiving end does not exist/];
      var trace = payload.body.trace;
      if (trace && trace.exception) {
        if (trace.exception.message && ignoredErrors.some(function (rx) {
          return rx.test(trace.exception.message);
        })) {
          return true;
        }
        if (trace.exception.description && ignoredErrors.some(function (rx) {
          return rx.test(trace.exception.description);
        })) {
          return true;
        }
      }
      try {
        if (trace && trace.frames) {
          var filename = trace.frames[0].filename;
          var m = filename.match(/(bg|content|settings|popup)\/bundle.js/);
          if (m === null) {
            return true;
          }
        }
        // eslint-disable-next-line no-empty
      } catch (error) {}
      return false;
    },
    transform: function transform(payload) {
      try {
        var trace = payload.body.trace;
        var locRegex = /^(chrome-extension):\/\/[a-zA-Z0-9._-]+(.*)/;
        if (BROWSER === 'safari') {
          locRegex = /^(safari-web-extension):\/\/[a-zA-Z0-9._-]+(.*)/;
        }
        if (trace && trace.frames) {
          // eslint-disable-next-line no-plusplus
          for (var i = 0; i < trace.frames.length; i++) {
            var filename = trace.frames[i].filename;
            if (filename) {
              try {
                var m = filename.match(locRegex);
                // Be sure that the minified_url when uploading includes 'dynamichost'
                trace.frames[i].filename = "".concat(m[1], "://dynamichost").concat(m[2]);
                // eslint-disable-next-line no-empty
              } catch (e) {}
            }
          }
        }
        // eslint-disable-next-line no-empty
      } catch (error) {}
    },
    accessToken: rollbarKey,
    captureUncaught: true,
    captureUnhandledRejections: true,
    error_sample_rates: 1,
    payload: {
      environment: ROLLBAR_ENVIRONMENT,
      client: {
        javascript: {
          source_map_enabled: true,
          // false by default

          // -- Add this into your configuration ---
          code_version: VERSION,
          // ---------------------------------------
          // Optionally have Rollbar guess which frames the error was
          // thrown from when the browser does not provide line
          // and column numbers.
          guess_uncaught_frames: true
        }
      },
      custom: {
        bundle: bundle
      }
    }
  };
};

// eslint-disable-next-line no-undef
/* harmony default export */ const rollbarConfig = (_rollbarConfig);
;// CONCATENATED MODULE: ./source/settings/app.js
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved







// eslint-disable-next-line no-underscore-dangle
if (ROLLBAR_ACTIVE) {
  rollbar_umd_min_default().init(rollbarConfig(ROLLBAR_KEY_SETTINGS, 'settings'));
}
vue_runtime_esm/* default */.ZP.prototype.$i18next = i18n;
window.settings = new vue_runtime_esm/* default */.ZP({
  el: '#app',
  render: function render(h) {
    return h(app);
  }
});

/***/ }),

/***/ 8521:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 6864:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 5849:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 6326:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8521);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("94bc7eba", content, true, {});

/***/ }),

/***/ 8843:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6864);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("64f82e82", content, true, {});

/***/ }),

/***/ 9800:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5849);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("6da4dec0", content, true, {});

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/runtimeId */
/******/ 	(() => {
/******/ 		__webpack_require__.j = 571;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			571: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkTopCashback"] = self["webpackChunkTopCashback"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [216], () => (__webpack_require__(9740)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map