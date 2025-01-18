/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 3301:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// UNUSED EXPORTS: default

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(5861);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__(5671);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__(3144);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(7326);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js + 1 modules
var inherits = __webpack_require__(9340);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(2963);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(1120);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(4942);
// EXTERNAL MODULE: ./node_modules/lodash/uniqBy.js
var uniqBy = __webpack_require__(5578);
var uniqBy_default = /*#__PURE__*/__webpack_require__.n(uniqBy);
// EXTERNAL MODULE: ./node_modules/lodash/filter.js
var filter = __webpack_require__(3105);
var filter_default = /*#__PURE__*/__webpack_require__.n(filter);
// EXTERNAL MODULE: ./node_modules/lodash/isEmpty.js
var isEmpty = __webpack_require__(1609);
var isEmpty_default = /*#__PURE__*/__webpack_require__.n(isEmpty);
// EXTERNAL MODULE: ./node_modules/lodash/isNumber.js
var isNumber = __webpack_require__(1763);
var isNumber_default = /*#__PURE__*/__webpack_require__.n(isNumber);
// EXTERNAL MODULE: ./node_modules/lodash/findKey.js
var findKey = __webpack_require__(894);
var findKey_default = /*#__PURE__*/__webpack_require__.n(findKey);
// EXTERNAL MODULE: ./node_modules/lodash/merge.js
var merge = __webpack_require__(3857);
var merge_default = /*#__PURE__*/__webpack_require__.n(merge);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4687);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
// EXTERNAL MODULE: ./node_modules/@sleek/web-ext-coupon-sdk/dist/index.mjs
var dist = __webpack_require__(430);
// EXTERNAL MODULE: ./node_modules/rollbar/dist/rollbar.umd.min.js
var rollbar_umd_min = __webpack_require__(7662);
var rollbar_umd_min_default = /*#__PURE__*/__webpack_require__.n(rollbar_umd_min);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 1 modules
var slicedToArray = __webpack_require__(9439);
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
var REMOVE_ACTIVATION_FROM_LIST_DELAY = 60 * 1000;
var REMOVE_SUPPRESSION_FROM_LIST_DELAY = 40 * 1000;
var REMOVE_COMPETITOR_ACTIVATION_FROM_LIST_DELAY = 30 * 1000;
var CONFIRMATION_NOTIFICATION_DELAY_TIMESTAMP = 15 * 1000;
var DELAY_NOTIFICATION_ACTIVATING_CASHBACK = (/* unused pure expression or super */ null && (90 * 1000));
var DELAY_SECOND_NOTIFIER_TIMESTAMP = 10 * 60 * 1000;
var ICONS = {
  16: 'icon-32.png',
  32: 'icon-32.png'
};
var ICONS_ACTIVE = {
  16: 'icon-32-active.png',
  32: 'icon-32-active.png'
};
var NO_CODE_PATTERNS = ['N/A', 'n/a', 'no code needed', 'No code required', 'No code required.', 'no code required', 'no code required.', 'NO_CODE_NEEDED'];
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
var MERCHANTS_UPDATE_DELAY = 10 * 60 * 1000;
var CONFIGS_UPDATE_DELAY = 4 * 60 * 60 * 1000;
var FLAGS_REDIRECT_UPDATE_DELAY = 15 * 60 * 1000;
if (IS_CONFIG_TESTING) {
  MERCHANTS_UPDATE_DELAY = 10 * 1000;
  CONFIGS_UPDATE_DELAY = 10 * 1000;
}

// Delay in minutes
var ACTIVATION_RESET_TIMER = 30;
var RE_ACTIVATION_RESET_TIMER = 30;
var SUPRESSION_RESET_TIMER = 30;
var DISMISSAL_RESET_TIMER = 30;
var UPDATE_SINGLE_MERCHANT_INTERVAL = 10 * 60 * 1000;
var UPDATE_SINGLE_MERCHANT_TIMEOUT = 30 * 1000;

;// CONCATENATED MODULE: ./source/constants/urls.js
/* eslint-disable import/no-mutable-exports */

var PROJECT = 'TOPUK';
var DOMAIN = 'www.topcashback.co.uk';
var TEST_DOMAIN = 'ukq-www.tcb.systems';
var HOME_PAGE = "https://".concat(IS_TEST_VERSION ? TEST_DOMAIN : DOMAIN);
var MERCHANTS_URL_BACKUP = 'https://ukp.tcb-cdn.com/toolbarfeed/production/merchants';
var PAYMENT_DETAILS_URL = "".concat(HOME_PAGE, "/account/paymentdetails");
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
  HOME_PAGE = "https://".concat(IS_TEST_VERSION ? TEST_DOMAIN : DOMAIN);
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
  HOME_PAGE = "https://".concat(IS_TEST_VERSION ? TEST_DOMAIN : DOMAIN);
  MERCHANTS_URL_BACKUP = 'https://dep.tcb-cdn.com/toolbarfeed/production/merchants';
  PAYMENT_DETAILS_URL = "".concat(HOME_PAGE, "/konto/auszahlungsinformationen/"); // feature about bacs need to ask
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
  HOME_PAGE = "https://".concat(IS_TEST_VERSION ? TEST_DOMAIN : DOMAIN);
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
  HOME_PAGE = "https://".concat(IS_TEST_VERSION ? TEST_DOMAIN : DOMAIN);
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
var AFTER_INSTALL_URL = "".concat(HOME_PAGE, "/toolbar/install/?ihr=browserextension");
var AFTER_INSTALL_URL_MOBILE = "".concat(HOME_PAGE, "/toolbar/enabledmobile/?ihr=browserextension");
var AFTER_UNINSTALL_URL = "".concat(HOME_PAGE, "/toolbar/uninstall/");
var LOGIN_PAGE_URL = "".concat(HOME_PAGE, "/connect?action=login");
var JOIN_PAGE_URL = "".concat(HOME_PAGE, "/nologin/");
var ACCOUNT_PAGE_URL = "".concat(HOME_PAGE, "/account/overview/");
var TELL_A_FRIEND_PAGE_URL = "".concat(HOME_PAGE, "/account/tell-a-friend");
var HELP_URL = "".concat(HOME_PAGE, "/newhelp/");
var PRIVACY_POLICY = "".concat(HOME_PAGE, "/dyn/browser-ex-privacy/");
var COOKIE_POLICY = "".concat(HOME_PAGE, "/dyn/browser-ex-cookie-policy/");
var PERMISSIONS = "".concat(HOME_PAGE, "/toolbar/permissions");
var PERMISSIONS_MOBILE = "".concat(HOME_PAGE, "/toolbar/mobilepermissions");
if (REGION === 'us') {
  COOKIE_POLICY = "".concat(HOME_PAGE, "/cookie-policy/");
}
if (REGION === 'de') {
  AFTER_INSTALL_URL = "".concat(HOME_PAGE, "/toolbar/installieren/?ihr=browserextension");
  AFTER_UNINSTALL_URL = "".concat(HOME_PAGE, "/toolbar/deinstallieren/");
  LOGIN_PAGE_URL = "".concat(HOME_PAGE, "/keine-anmeldung/");
  JOIN_PAGE_URL = "".concat(HOME_PAGE, "/keine-anmeldung/");
  ACCOUNT_PAGE_URL = "".concat(HOME_PAGE, "/konto/uebersicht/");
  TELL_A_FRIEND_PAGE_URL = "".concat(HOME_PAGE, "/konto/freunde-werben-freunde/");
  HELP_URL = "".concat(HOME_PAGE, "/hilfe/");
  PRIVACY_POLICY = "".concat(HOME_PAGE, "/dyn/browser-erweiterung-datenschutz/");
  COOKIE_POLICY = "".concat(HOME_PAGE, "/cookie-richtlinie/");
}
if (REGION === 'fr') {
  AFTER_INSTALL_URL = "".concat(HOME_PAGE, "/barre-doutils/installer/?ihr=browserextension");
  AFTER_UNINSTALL_URL = "".concat(HOME_PAGE, "/barre-doutils/desinstaller");
  LOGIN_PAGE_URL = "".concat(HOME_PAGE, "/se-connecter/");
  JOIN_PAGE_URL = "".concat(HOME_PAGE, "/aucune-connexion/");
  PRIVACY_POLICY = "".concat(HOME_PAGE, "/dyn/politique-confidentialite-extension/");
  COOKIE_POLICY = "".concat(HOME_PAGE, "/dyn/politique-des-cookies-extension-navigateur/");
  ACCOUNT_PAGE_URL = "".concat(HOME_PAGE, "/mon-compte/tableau-de-bord/");
}
var API_VERSION = 'v3.0';
if (BROWSER === 'safari') {
  API_VERSION = 'v4.0';
}
var MERCHANTS_URL = "".concat(HOME_PAGE, "/toolbar/api/").concat(API_VERSION, "/feed/merchants/slim/");
var MERCHANTS_URL_NO_HTTP = "".concat(DOMAIN, "/toolbar/api/").concat(API_VERSION, "/feed/merchants/slim/");
var TOP_OFFERS_URL = "".concat(HOME_PAGE, "/toolbar/api/").concat(API_VERSION, "/feed/homepage/");
var USER_INFO_URL = "".concat(HOME_PAGE, "/toolbar/api/v3.0/user");
var FLAG_REDIRECT_URL = "".concat(HOME_PAGE, "/toolbar/api/v3.0/redirect");
var CONFIGS_URL = "".concat(HOME_PAGE, "/toolbar/api/").concat(API_VERSION, "/couponautoapplier/config");
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
var DISABLE_PATTERNS = ['compare-broadband.topcashback'];
var SUPPRESSION_PATTERNS = ['www.expedia.com/amex', 'px.owneriq.net', /(?<!login\.)dotomi\.com/, 'eden-park.fr/fr_fr/?utm_campaign=', 'www.1-2-3.fr', 'cm_mmc=Linkshare', 'PartnerID=LINKSHARE', 'action.metaffiliation.com', 'track.webgains.com', 'track.effiliation.com', 'clk.tradedoubler.com', 'www.jacadi.fr/?utm_source=', 'ftjcfx.com', 'commission-junction.com', 'rover.ebay.com', 'partners.hotwire.com', 'www.pjtra.com', '.7eer.', 'clickserver.com', '.r.bat.bing.com', 'www.pntrs.com', 'partners.wantable.co', 'cc-dt.com', '.ojrq.net', 'goto.orientaltrading.com', 'www.dpbolvw.net', 'goto.target.com', 'www.pntra.com', '.evyy.net', 'www.anrdoezrs.net', 'www.tkqlhce.com', 'linksynergy.walmart.com', 'www.anrdoezrs.net', 'emjcd.com', 'partners.jawbone.com', 'shareasale.com', 'www.awin1.com', 'linksynergy.walmart.com', 'gan.doubleclick.net', 'tracking.groupon.com', 'www.pepperjamnetwork.com', 'rcm-ca.amazon.ca', 'www.shareasale.com', 'www.jdoqocy.com', 'alitems.com', 'www.kqzyfj.com', 'goto.orientaltrading.com', 'affiliates.babiesrus.com', 'lduhtrp.net', 'ad.admitad.com', 'prf.hn', '.r.msn.com', 'apmebf.com', 'goto.target.com', 'www.intactearnings.com', 'click.linksynergy.com', 'partners.hostgator.com', '.avantlink.com', 'tqlkg.com', 'partners.wantable.co', 'go.redirectingat.com', 'www.pntrac.com', /(?<!tags\.rd\.)linksynergy.com/, 'www.qksrv.net', 'www.gopjn.com', 'affiliates.abebooks.com', 'www.pjatr.com', 'afscr=1', 'afsrc=1', 'affsrc=1', 'riffrid=mdp.hcom.US', 'riffrid=sem.hcom.us', 'rffrid=aff.hcom.us', 'riffrid=eml.hcom.US', 'riffrid=eml.hcom.CA', 'riffrid=eml.hcom.CF', 'riffrid=eml.hcom.U2', 'ranEAID', 'ranSiteID', /.*ebay\..*\/?(mkevt|mkcid|campid).*/, 'magicfreebiesuk.co.uk', 'itsadoddle.co.uk', /shepherdsfriendly\.co\.uk.*utm_medium=km/, /www\.quidco\.com\/visit\/.*\/.*\/cashback/];
var GOOGLE_SUPPRESSION_PATTERNS = [/aclk\?sa=/, 'ohost=www.google.com', /(?<!td\.)(?<!fls\.)doubleclick\.net/
// 'cp=\\d+-[\\w-]+',
// 'gclid=[\\w-]+',
// 'gclsrc=aw\\.ds',
// 'kwd=\\d+-\\d+',
];

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

var rollbar_ROLLBAR_ACTIVE = true;
var ROLLBAR_KEY_BG = '';
var ROLLBAR_KEY_POPUP = '';
var ROLLBAR_KEY_CONTENT = '';
var ROLLBAR_KEY_SETTINGS = '';
if (BROWSER === 'firefox') {
  rollbar_ROLLBAR_ACTIVE = false;
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
var getStorageData = promiseWrapper(chrome.storage.local, 'get');
var setStorageData = promiseWrapper(chrome.storage.local, 'set');
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
var getUserTCBTBAuth = /*#__PURE__*/function () {
  var _ref2 = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee2() {
    var cookies, tcbtbauth;
    return regenerator_default().wrap(function _callee2$(_context2) {
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
}();
var checkUserLogin = /*#__PURE__*/function () {
  var _ref4 = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee3() {
    var loginCookie;
    return regenerator_default().wrap(function _callee3$(_context3) {
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
}();
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
var getActiveTab = function getActiveTab() {
  return getTabs({
    active: true,
    currentWindow: true
  }).then(function (_ref5) {
    var _ref6 = (0,slicedToArray/* default */.Z)(_ref5, 1),
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
          return getActiveTab();
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
  _decompressGzipBody = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee5(compressedResponse) {
    var ds, decompressedStream, blob, data;
    return regenerator_default().wrap(function _callee5$(_context5) {
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
          return getStorageData('merchants.data');
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
;// CONCATENATED MODULE: ./source/bg/core/utils.js

var utils_getStorageData = function getStorageData(keys) {
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
var utils_setStorageData = function setStorageData(items) {
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
var utils_getActiveTab = function getActiveTab() {
  var promise = new Promise(function (resolve) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (_ref) {
      var _ref2 = (0,slicedToArray/* default */.Z)(_ref, 1),
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
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js
var toConsumableArray = __webpack_require__(9062);
// EXTERNAL MODULE: ./node_modules/lodash/groupBy.js
var groupBy = __webpack_require__(7739);
var groupBy_default = /*#__PURE__*/__webpack_require__.n(groupBy);
;// CONCATENATED MODULE: ./source/RollbarHelper.js

// eslint-disable-next-line import/no-unresolved


function rollbarAnalyse(response, tag, extra) {
  if (ROLLBAR_ACTIVE) {
    if (response.ok === false) {
      rollbar.error(new Error("Failed response from ".concat(response.url, " with code ").concat(response.status)), {
        fetchTag: tag,
        MoreInfo: extra === null || extra === void 0 ? void 0 : extra.extraData,
        typeOfError: extra === null || extra === void 0 ? void 0 : extra.typeOfError,
        extraInformation: tag
      });
    }
  }
}
function rollbarCaptureError(error, tag) {
  var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (rollbar_ROLLBAR_ACTIVE) {
    var extraErrors = {};
    // eslint-disable-next-line no-restricted-syntax
    for (var _i = 0, _Object$entries = Object.entries(extra); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = (0,slicedToArray/* default */.Z)(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      extraErrors[key] = value;
    }
    try {
      throw new Error(error);
    } catch (e) {
      rollbar_umd_min_default().error(e, {
        typeOfError: extra === null || extra === void 0 ? void 0 : extra.typeOfError,
        storeID: extra === null || extra === void 0 ? void 0 : extra.storeID,
        error: error,
        cause: error === null || error === void 0 ? void 0 : error.cause,
        extraInformation: tag,
        extraErrors: extraErrors
      });
    }
  }
}
;// CONCATENATED MODULE: ./source/parses.js



/* eslint-disable no-prototype-builtins */



// const getMerchantId = (url) => {
//   const searchParams = new URL(url).searchParams;
//   return searchParams.get('mpid');
// };

var parseDomain = function parseDomain(url) {
  try {
    return new URL(url).host.replace('www.', '');
  } catch (e) {
    rollbarCaptureError(e, 'error_parseDomain', {
      url: url
    });
    return url;
  }
};
var checkDomain = function checkDomain(url) {
  if (!/^https?:\/\//.test(url) && url != null) {
    return "".concat(HOME_PAGE).concat(url);
  }
  return url;
};
var parseUrl = function parseUrl(url) {
  try {
    return url.replace(/\/$/, '').replace('www.', '');
  } catch (e) {
    rollbarCaptureError(e, 'error_parseUrl', {
      url: url
    });
    return url;
  }
};

// parseMerchant
var parseOffer = function parseOffer(offer, merchant) {
  return {
    activationUrl: checkDomain(offer.ClickThroughUrl),
    code: offer.Code,
    description: offer.Title,
    expiration: offer.ExpiryDate,
    logo: merchant.SquareLogoUrl
  };
};
var parseTopOffer = function parseTopOffer(offer) {
  return {
    name: offer.Name,
    activationUrl: checkDomain(offer.ClickThroughUrl) || checkDomain(offer.NavigateUrl),
    reward: offer.CashbackRate,
    description: offer.Description,
    banner: checkDomain(offer.ImageUrl),
    logo: checkDomain(offer.SquareLogoUrl),
    startDate: offer.StartDateUtc,
    endDate: offer.ExpiryDateUtc
  };
};
var parseTiers = function parseTiers(tier) {
  return {
    name: tier.Title,
    reward: tier.CashbackRate.replace('.00', ''),
    expiration: tier.ExpiryDate,
    url: checkDomain(tier.ClickThroughUrl),
    categoryName: tier.Category ? tier.Category.Name : 'no_category',
    labelType: tier.Category ? 'category_type' : 'single_type',
    sortOrder: tier.Category ? parseInt(tier.Category.SortOrder, 10) : Number.MAX_VALUE
  };
};
var groupByTiers = function groupByTiers(tiers) {
  // parse tiers from json to an array
  var parsedTiers = tiers.map(parseTiers);
  // group parsed array by category and returns an object hash
  var groupedTiers = groupBy_default()(parsedTiers, 'categoryName');
  var organizedTiers = [];
  if (Object.keys(groupedTiers).length > 1 && groupedTiers.hasOwnProperty('no_category')) {
    // eslint-disable-next-line no-return-assign, no-param-reassign
    groupedTiers.no_category.forEach(function (tier) {
      return tier.labelType = 'multiple_type';
    });
  }
  Object.entries(groupedTiers).forEach(function (_ref) {
    var _ref2 = (0,slicedToArray/* default */.Z)(_ref, 2),
      category = _ref2[0],
      items = _ref2[1];
    organizedTiers.push({
      name: category,
      rates: items,
      sortOrder: items['0'].sortOrder
    });
  });
  var sortedTiers = organizedTiers.sort(function (a, b) {
    return a.sortOrder - b.sortOrder;
  });
  return sortedTiers;
};
var parseMerchantSettings = function parseMerchantSettings(settings) {
  return {
    isNotificationEnabled: settings.DisplayAlerts,
    isSerpEnabled: settings.IncludeInSearchEngineResults === 'Any',
    suppressionKind: settings.IncludeInSearchEngineResults
  };
};
var parseMerchantInfo = function parseMerchantInfo(info) {
  return {
    important: info && info.Important,
    exclusions: info && info.Exclusions
  };
};
var parseSlimMerchant = function parseSlimMerchant(merchant) {
  return {
    id: "".concat(merchant.MerchantId),
    name: merchant.Name,
    logo: checkDomain(merchant.SquareLogoUrl),
    domain: parseDomain(merchant.MerchantDomain),
    activationUrl: checkDomain(merchant.ClickThroughUrl),
    url: parseUrl(merchant.MerchantDomain).toLowerCase(),
    reward: merchant.CashbackRate,
    settings: parseMerchantSettings(merchant.DisplaySettings),
    info: parseMerchantInfo(merchant.AdditionalInformation),
    topCashbackUrl: checkDomain(merchant.TopCashbackUrl),
    couponsAmount: merchant.TotalDiscountCodes,
    offers_length: 1,
    isRequiresBacs: REQUIRED_BACS_ACTIVE ? merchant.RequiresBacs : false,
    lastModifiedSince: ''
  };
};
var parseMerchant = function parseMerchant(merchant) {
  return {
    id: "".concat(merchant.MerchantId),
    name: merchant.Name,
    logo: checkDomain(merchant.SquareLogoUrl),
    domain: parseDomain(merchant.MerchantDomain),
    activationUrl: checkDomain(merchant.ClickThroughUrl),
    url: parseUrl(merchant.MerchantDomain).toLowerCase(),
    reward: merchant.CashbackRate,
    offers: [].concat((0,toConsumableArray/* default */.Z)(merchant.Deals), (0,toConsumableArray/* default */.Z)(merchant.DiscountCodes)).map(function (offer) {
      return parseOffer(offer, merchant);
    }),
    couponsAmount: (merchant.DiscountCodes || []).length,
    dealsAmount: (merchant.Deals || []).length,
    settings: parseMerchantSettings(merchant.DisplaySettings),
    tiers: groupByTiers(merchant.Offers),
    offers_length: merchant.Offers.length,
    info: parseMerchantInfo(merchant.AdditionalInformation),
    topCashbackUrl: checkDomain(merchant.TopCashbackUrl),
    isRequiresBacs: REQUIRED_BACS_ACTIVE ? merchant.RequiresBacs : false
  };
};
var parseSlimMerchants = function parseSlimMerchants(data) {
  return data.filter(function (_ref3) {
    var domain = _ref3.MerchantDomain;
    return domain && domain.toLowerCase().indexOf('topcashback') === -1;
  }).filter(function (_ref4) {
    var domain = _ref4.MerchantDomain;
    return domain !== 'http://www.';
  }).map(parseSlimMerchant);
};
var parseUserInfo = function parseUserInfo(userInfo) {
  return {
    isLoggedIn: userInfo.IsLoggedIn,
    isPlus: userInfo.Membership === 'Plus',
    hasBacs: userInfo.HasBacsDetailsSaved || false
  };
};

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/get.js
var get = __webpack_require__(8301);
// EXTERNAL MODULE: ./node_modules/lodash/includes.js
var includes = __webpack_require__(4721);
var includes_default = /*#__PURE__*/__webpack_require__.n(includes);
// EXTERNAL MODULE: ./node_modules/lodash/each.js
var each = __webpack_require__(6073);
var each_default = /*#__PURE__*/__webpack_require__.n(each);
// EXTERNAL MODULE: ./node_modules/lodash/find.js
var find = __webpack_require__(3311);
var find_default = /*#__PURE__*/__webpack_require__.n(find);
;// CONCATENATED MODULE: ./source/bg/core/fetcher.js





/* eslint class-methods-use-this: ["error", { "exceptMethods": ["parse"] }] */
var DynamicFetcher = /*#__PURE__*/function () {
  function DynamicFetcher(args) {
    (0,classCallCheck/* default */.Z)(this, DynamicFetcher);
    var name = args.name,
      url = args.url,
      options = args.options,
      updateDelay = args.updateDelay,
      errorDelay = args.errorDelay;
    if (!name || !url) {
      throw new Error('name or url parameter is undefined');
    }
    this.name = name;
    this.url = url;
    this.options = options || {};
    this.updateDelay = updateDelay || 4 * 60 * 60 * 1000;
    this.errorDelay = errorDelay || this.updateDelay / 10;
    this.data = null;
  }
  (0,createClass/* default */.Z)(DynamicFetcher, [{
    key: "parse",
    value: function parse(data) {
      return data;
    }
  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x, _x2) {
        return _fetch.apply(this, arguments);
      }
      fetch.toString = function () {
        return _fetch.toString();
      };
      return fetch;
    }(function (url, options) {
      var params = options ? merge_default()(this.options, options) : this.options;
      return fetch(url || this.url, params).then(function (response) {
        return response.json();
      });
    })
  }, {
    key: "update",
    value: function update(force) {
      var _this = this;
      clearInterval(this.updateInterval);
      return utils_getStorageData(["".concat(this.name, ".lastUpdate"), "".concat(this.name, ".data")]).then(function (items) {
        var lastUpdate = items["".concat(_this.name, ".lastUpdate")];
        var cashedData = items["".concat(_this.name, ".data")];
        var now = new Date().getTime();
        if (lastUpdate + _this.updateDelay >= now && cashedData && !force) {
          _this.data = cashedData;
          var nextUpdate = lastUpdate + _this.updateDelay - now;
          _this.updateInterval = setInterval(function () {
            return _this.update();
          }, nextUpdate);
          return _this.data;
        }
        return _this.fetch().then(function (data) {
          return _this.parse(data);
        }).then(function (data) {
          if (data) {
            _this.data = data;
            var cash = {};
            cash["".concat(_this.name, ".data")] = data;
            cash["".concat(_this.name, ".lastUpdate")] = now;
            utils_setStorageData(cash);
            _this.updateInterval = setInterval(function () {
              return _this.update();
            }, _this.updateDelay);
          } else {
            var errorUpdate = _this.data ? _this.errorDelay : _this.errorDelay / 10;
            _this.updateInterval = setInterval(function () {
              return _this.update(true);
            }, errorUpdate);
          }
          return _this.data;
        })["catch"](function (e) {
          consoleLog(e);
          var errorUpdate = _this.data ? _this.errorDelay : _this.errorDelay / 10;
          _this.updateInterval = setInterval(function () {
            return _this.update(true);
          }, errorUpdate);
        });
      });
    }
  }]);
  return DynamicFetcher;
}();

;// CONCATENATED MODULE: ./source/bg/core/baseMerchant.js















function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,getPrototypeOf/* default */.Z)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,getPrototypeOf/* default */.Z)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,possibleConstructorReturn/* default */.Z)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }


var BaseMerchants = /*#__PURE__*/function (_DynamicFetcher) {
  (0,inherits/* default */.Z)(BaseMerchants, _DynamicFetcher);
  var _super = _createSuper(BaseMerchants);
  function BaseMerchants(_args) {
    var _this;
    (0,classCallCheck/* default */.Z)(this, BaseMerchants);
    _this = _super.call(this, _args);
    (0,defineProperty/* default */.Z)((0,assertThisInitialized/* default */.Z)(_this), "resetStates", /*#__PURE__*/(0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
      var resetedStates;
      return regenerator_default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (_this.isReady) {
              _context.next = 3;
              break;
            }
            _context.next = 3;
            return _this.initStates();
          case 3:
            resetedStates = [];
            _this.states.forEach(function (state) {
              resetedStates.push(merge_default()({
                id: state.id
              }, BaseMerchants.defaultState()));
            });
            _this.states = [].concat(resetedStates);
            utils_setStorageData({
              states: _this.states
            });
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
    (0,defineProperty/* default */.Z)((0,assertThisInitialized/* default */.Z)(_this), "updateStates", /*#__PURE__*/(0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee2() {
      return regenerator_default().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (_this.isReady) {
              _context2.next = 3;
              break;
            }
            _context2.next = 3;
            return _this.initStates();
          case 3:
            each_default()(_this.data, function (m) {
              if (!find_default()(_this.states, function (s) {
                return s.id === m.id;
              })) {
                _this.states.push(merge_default()({
                  id: m.id
                }, BaseMerchants.defaultState()));
              }
            });
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    })));
    (0,defineProperty/* default */.Z)((0,assertThisInitialized/* default */.Z)(_this), "setState", /*#__PURE__*/function () {
      var _ref3 = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee3(args) {
        var url, id, data, tabId, sid, merchant, state;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              url = args.url, id = args.id, data = args.data, tabId = args.tabId;
              sid = id;
              if (id === undefined || id === '' || id === null) {
                merchant = _this.getBy('url', url);
                sid = merchant && merchant.id;
              }
              if (!(sid === undefined || sid === '' || sid === null)) {
                _context3.next = 5;
                break;
              }
              return _context3.abrupt("return", false);
            case 5:
              state = find_default()(_this.states, function (s) {
                return s.id === sid.toString() || s.id === sid;
              });
              merge_default()(state, data);
              utils_setStorageData({
                states: _this.states
              });
              BaseMerchants.updateContentState({
                data: {
                  merchant: merge_default()({
                    id: sid
                  }, state)
                },
                excludedTabId: tabId
              });
              return _context3.abrupt("return", state);
            case 10:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());
    _this.states = [];
    _this.isReady = false;
    _this.initStates();
    return _this;
  }
  (0,createClass/* default */.Z)(BaseMerchants, [{
    key: "initStates",
    value: function () {
      var _initStates = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee4() {
        var _yield$getStorageData, states;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return utils_getStorageData('states');
            case 2:
              _yield$getStorageData = _context4.sent;
              states = _yield$getStorageData.states;
              merge_default()(this.states, states);
              this.isReady = true;
              // inspired on settings.js (getStates to allow sync to be in place)
            case 6:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function initStates() {
        return _initStates.apply(this, arguments);
      }
      return initStates;
    }()
  }, {
    key: "update",
    value: function update(force) {
      return (0,get/* default */.Z)((0,getPrototypeOf/* default */.Z)(BaseMerchants.prototype), "update", this).call(this, force).then(this.updateStates.bind(this));
    }
  }, {
    key: "refreshStates",
    value:
    // Use this method if user will be signed out
    function refreshStates() {
      each_default()(this.states, function (state) {
        merge_default()(state, BaseMerchants.defaultState());
      });
    }
  }, {
    key: "getBy",
    value: function getBy(method, data) {
      switch (method) {
        case 'url':
          return this.getByUrl(data);
        case 'activationUrl':
          return this.getByActivationUrl(data);
        case 'id':
          return this.getById(data);
        case 'name':
          return this.getByName(data);
        default:
          return null;
      }
    }
  }, {
    key: "getByUrl",
    value: function getByUrl(url) {
      if (!url) {
        return null;
      }
      try {
        var host = new URL(url).host;
        return find_default()(this.data, function (_ref4) {
          var domain = _ref4.domain;
          return host.match(domain);
        });
      } catch (e) {
        return null;
      }
    }
  }, {
    key: "getByActivationUrl",
    value: function getByActivationUrl(url) {
      if (!url) {
        return null;
      }
      try {
        return find_default()(this.data, function (_ref5) {
          var activationUrl = _ref5.activationUrl;
          var match = includes_default()(url, activationUrl);
          return match;
        });
      } catch (e) {
        return null;
      }
    }
  }, {
    key: "getByName",
    value: function getByName(_ref6) {
      var name = _ref6.name,
        value = _ref6.value;
      return find_default()(this.data, function (merchant) {
        return merchant[name] === value;
      });
    }
  }, {
    key: "getById",
    value: function getById(id) {
      return find_default()(this.data, function (merchant) {
        return merchant.id === id;
      });
    }
  }], [{
    key: "defaultState",
    value: function defaultState() {
      return {
        activated: false,
        showNotification: true
      };
    }
  }, {
    key: "updateContentState",
    value: function updateContentState(_ref7) {
      var data = _ref7.data,
        excludedTabId = _ref7.excludedTabId;
      return getAllTabs().then(function (tabs) {
        var promises = [];
        var filtered = filter_default()(tabs, function (tab) {
          return tab.id !== excludedTabId;
        });
        each_default()(filtered, function (tab) {
          promises.push(sendBackgroundMessage(tab.id, {
            action: 'silentUpdate',
            data: data
          }));
        });
        return Promise.all(promises);
      });
    }
  }]);
  return BaseMerchants;
}(DynamicFetcher);

;// CONCATENATED MODULE: ./source/bg/merchants.js








function merchants_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = merchants_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function merchants_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return merchants_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return merchants_arrayLikeToArray(o, minLen); }
function merchants_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function merchants_createSuper(Derived) { var hasNativeReflectConstruct = merchants_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,getPrototypeOf/* default */.Z)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,getPrototypeOf/* default */.Z)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,possibleConstructorReturn/* default */.Z)(this, result); }; }
function merchants_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






/* eslint class-methods-use-this: ["error", { "exceptMethods": ["parse", "parseMerchant"] }] */
var Merchants = /*#__PURE__*/function (_BaseMerchants) {
  (0,inherits/* default */.Z)(Merchants, _BaseMerchants);
  var _super = merchants_createSuper(Merchants);
  function Merchants() {
    var _this;
    (0,classCallCheck/* default */.Z)(this, Merchants);
    _this = _super.call(this, {
      name: 'merchants',
      url: MERCHANTS_URL,
      updateDelay: MERCHANTS_UPDATE_DELAY,
      errorDelay: 0
    });
    _this.redirectCounter = 0;
    _this.modified = {};
    _this.lastModifiedMerchants = '';
    _this.previosIsPlus = false;
    _this.analytics = null;
    _this.setRedirectListeners();
    _this.setAlarmListenersMerchants();
    _this.setInitialValues();
    return _this;
  }
  (0,createClass/* default */.Z)(Merchants, [{
    key: "setInitialValues",
    value: function () {
      var _setInitialValues = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var _yield$getStorageData, lastModifiedMerchants, _yield$getStorageData2, previosIsPlus, data, modified;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return utils_getStorageData('lastModifiedMerchants');
            case 2:
              _yield$getStorageData = _context.sent;
              lastModifiedMerchants = _yield$getStorageData.lastModifiedMerchants;
              _context.next = 6;
              return utils_getStorageData('previosIsPlus');
            case 6:
              _yield$getStorageData2 = _context.sent;
              previosIsPlus = _yield$getStorageData2.previosIsPlus;
              this.lastModifiedMerchants = lastModifiedMerchants;
              this.previosIsPlus = previosIsPlus;
              _context.next = 12;
              return utils_getStorageData('merchants.data');
            case 12:
              data = _context.sent;
              this.data = data['merchants.data'];
              _context.next = 16;
              return utils_getStorageData('merchants.modified');
            case 16:
              modified = _context.sent;
              this.modified = !modified['merchants.modified'] ? {} : modified['merchants.modified'];
            case 18:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function setInitialValues() {
        return _setInitialValues.apply(this, arguments);
      }
      return setInitialValues;
    }() // eslint-disable-next-line class-methods-use-this
  }, {
    key: "updateRule",
    value: function updateRule(actionType) {
      chrome.declarativeNetRequest.updateDynamicRules({
        addRules: [{
          id: 1,
          priority: 1,
          action: {
            type: actionType
          },
          condition: {
            urlFilter: "*://".concat(MERCHANTS_URL_NO_HTTP, "*"),
            resourceTypes: ['xmlhttprequest']
          }
        }, {
          id: 2,
          priority: 1,
          action: {
            type: actionType
          },
          condition: {
            urlFilter: "".concat(MERCHANTS_URL_BACKUP, "*"),
            resourceTypes: ['xmlhttprequest']
          }
        }],
        removeRuleIds: [1, 2]
      });
    }
  }, {
    key: "setRedirectListeners",
    value: function setRedirectListeners() {
      var _this2 = this;
      // eslint-disable-next-line
      // chrome.webRequest.onBeforeRequest.addListener((details) => {
      //   if (this.redirectCounter > 8) return { cancel: true };
      // }, {
      //   urls: [
      //     `*://${MERCHANTS_URL_NO_HTTP}*`,
      //     `${MERCHANTS_URL_BACKUP}*`,
      //   ],
      //   types: ['xmlhttprequest'],
      // }, ['blocking']);
      if (BROWSER === 'chrome') {
        chrome.webRequest.onBeforeRedirect.addListener(function (details) {
          if (details.statusCode === 301 || details.statusCode === 302) {
            _this2.redirectCounter += 1;
            if (_this2.redirectCounter >= 8) {
              _this2.updateRule('block');
            }
          }
          if (details.statusCode === 200 || details.statusCode === 304) {
            _this2.redirectCounter = 0;
            _this2.updateRule('allow');
          }
        }, {
          urls: ["*://".concat(MERCHANTS_URL_NO_HTTP, "*"), "".concat(MERCHANTS_URL_BACKUP, "*")],
          types: ['xmlhttprequest']
        });
        chrome.webRequest.onCompleted.addListener(function () {
          _this2.redirectCounter = 0;
          _this2.updateRule('allow');
        }, {
          urls: ["*://".concat(MERCHANTS_URL_NO_HTTP, "*"), "".concat(MERCHANTS_URL_BACKUP, "*")],
          types: ['xmlhttprequest']
        });
        chrome.webRequest.onErrorOccurred.addListener(function () {
          _this2.redirectCounter = 0;
          _this2.updateRule('allow');
        }, {
          urls: ["*://".concat(MERCHANTS_URL_NO_HTTP, "*"), "".concat(MERCHANTS_URL_BACKUP, "*")],
          types: ['xmlhttprequest']
        });
      }
    }
  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch() {
        return _fetch.apply(this, arguments);
      }
      fetch.toString = function () {
        return _fetch.toString();
      };
      return fetch;
    }( /*#__PURE__*/(0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee2() {
      var userData, user, isPlus, isLoggedIn, _yield$getStorageData3, settings, browser, device, response, isResponseCompressed, _iterator, _step, header, data;
      return regenerator_default().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return utils_getStorageData('user.data');
          case 2:
            userData = _context2.sent;
            user = userData['user.data'];
            isPlus = user && user.isPlus;
            isLoggedIn = user && user.isLoggedIn;
            _context2.next = 8;
            return utils_getStorageData('settings');
          case 8:
            _yield$getStorageData3 = _context2.sent;
            settings = _yield$getStorageData3.settings;
            browser = getBrowser();
            device = getDevice();
            this.url = "".concat(MERCHANTS_URL, "listing/").concat(isPlus ? 'plus' : 'classic', "?").concat(isLoggedIn ? 'loggedin' : 'loggedout');
            if (IS_CONFIG_TESTING) {
              this.url = "".concat(MERCHANTS_URL);
            }
            if (this.previosIsPlus !== isPlus) {
              this.lastModifiedMerchants = '';
              this.previosIsPlus = isPlus;
              utils_setStorageData({
                previosIsPlus: this.previosIsPlus
              });
            }

            // only for testing check this back later
            _context2.next = 17;
            return fetch(this.url, {
              headers: {
                'If-Modified-Since': IS_CONFIG_TESTING ? '' : this.lastModifiedMerchants,
                'Toolbar-Version': VERSION,
                'Toolbar-Fingerprint': settings.analyticsClientId,
                'Browser-Type': "".concat(browser, "_").concat(device)
              },
              cache: IS_CONFIG_TESTING ? 'no-cache' : 'default'
            });
          case 17:
            response = _context2.sent;
            if (!(response.status === 304)) {
              _context2.next = 20;
              break;
            }
            return _context2.abrupt("return", {
              local: true,
              data: this.data
            });
          case 20:
            if (!(!response.ok || response.status !== 200)) {
              _context2.next = 22;
              break;
            }
            return _context2.abrupt("return", {
              local: true,
              data: this.data
            });
          case 22:
            isResponseCompressed = false; // eslint-disable-next-line no-restricted-syntax
            _iterator = merchants_createForOfIteratorHelper(response.headers.entries());
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                header = _step.value;
                if (header[0] === 'date') {
                  this.lastModifiedMerchants = header[1];
                  utils_setStorageData({
                    lastModifiedMerchants: this.lastModifiedMerchants
                  });
                }
                if (header[0] === 'content-type') {
                  if (header[1] === 'application/x-gzip') {
                    isResponseCompressed = true;
                  }
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            this.modified = {};
            utils_setStorageData({
              'merchants.modified': this.modified
            });
            data = [];
            if (!(isResponseCompressed && BROWSER !== 'safari')) {
              _context2.next = 34;
              break;
            }
            _context2.next = 31;
            return decompressGzipBody(response);
          case 31:
            data = _context2.sent;
            _context2.next = 37;
            break;
          case 34:
            _context2.next = 36;
            return response.json();
          case 36:
            data = _context2.sent;
          case 37:
            return _context2.abrupt("return", {
              local: false,
              data: data
            });
          case 38:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    })))
  }, {
    key: "setAlarmListenersMerchants",
    value: function setAlarmListenersMerchants() {
      var _this3 = this;
      chrome.alarms.onAlarm.addListener(function (event) {
        if (event.name === _this3.name) {
          _this3.update();
        } else if (event.name === "".concat(_this3.name, "_force")) {
          _this3.update(true);
        }
      });
    }
  }, {
    key: "update",
    value: function update(force) {
      var _this4 = this;
      return utils_getStorageData(["".concat(this.name, ".lastUpdate"), "".concat(this.name, ".data")]).then(function (items) {
        var lastUpdate = items["".concat(_this4.name, ".lastUpdate")];
        var cashedData = items["".concat(_this4.name, ".data")];
        var now = new Date().getTime();
        if (lastUpdate + _this4.updateDelay >= now && cashedData && !force) {
          _this4.data = cashedData;
          var nextUpdate = lastUpdate + _this4.updateDelay;
          chrome.alarms.create(_this4.name, {
            when: nextUpdate
          });
          return _this4.data;
        }
        return _this4.fetch().then(function (data) {
          return _this4.parse(data);
        }).then(function (data) {
          if (data) {
            _this4.errorDelay = 0;
            _this4.data = data;
            var cash = {};
            cash["".concat(_this4.name, ".data")] = data;
            cash["".concat(_this4.name, ".lastUpdate")] = now;
            utils_setStorageData(cash);
            chrome.alarms.create(_this4.name, {
              when: _this4.updateDelay + now
            });
          } else {
            _this4.handleError();
          }
          return _this4.data;
        })["catch"](function (e) {
          rollbarCaptureError(e, 'error_merchantsUpdate');
          _this4.handleError();
        });
      }).then(this.updateStates.bind(this));
    }
  }, {
    key: "handleError",
    value: function handleError() {
      if (this.errorDelay < 24 * 60 * 60 * 1000) {
        this.errorDelay += 15 * 60 * 1000 + Math.floor(Math.random() * 180) * 1000;
      }
      var now = new Date().getTime();
      chrome.alarms.create("".concat(this.name, "_force"), {
        when: this.errorDelay + now
      });
    }
  }, {
    key: "parse",
    value: function parse(_ref2) {
      var local = _ref2.local,
        data = _ref2.data;
      if (local) {
        return data;
      }
      return parseSlimMerchants(data);
    }
  }, {
    key: "getMerchantAndState",
    value: function () {
      var _getMerchantAndState = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee3(_ref3) {
        var url, _ref3$updateSingleMer, updateSingleMerchant, merchant, state;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              url = _ref3.url, _ref3$updateSingleMer = _ref3.updateSingleMerchant, updateSingleMerchant = _ref3$updateSingleMer === void 0 ? true : _ref3$updateSingleMer;
              merchant = this.getByUrl(url);
              if (!(merchant && updateSingleMerchant)) {
                _context3.next = 6;
                break;
              }
              _context3.next = 5;
              return this.updateSingleMerchant(merchant);
            case 5:
              merchant = _context3.sent;
            case 6:
              state = merchant && this.states.find(function (s) {
                return s.id === merchant.id;
              });
              return _context3.abrupt("return", {
                merchant: merchant,
                state: state
              });
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getMerchantAndState(_x) {
        return _getMerchantAndState.apply(this, arguments);
      }
      return getMerchantAndState;
    }()
  }, {
    key: "updateModified",
    value: function updateModified(_ref4) {
      var merchantId = _ref4.merchantId,
        _ref4$updateRequestDa = _ref4.updateRequestDate,
        updateRequestDate = _ref4$updateRequestDa === void 0 ? false : _ref4$updateRequestDa,
        _ref4$updateLastDate = _ref4.updateLastDate,
        updateLastDate = _ref4$updateLastDate === void 0 ? false : _ref4$updateLastDate;
      if (updateRequestDate) {
        if (this.modified[merchantId]) {
          this.modified[merchantId].requestDate = Date.now() + UPDATE_SINGLE_MERCHANT_TIMEOUT;
          utils_setStorageData({
            'merchants.modified': this.modified
          });
        } else {
          this.modified[merchantId] = {
            requestDate: Date.now() + UPDATE_SINGLE_MERCHANT_TIMEOUT
          };
          utils_setStorageData({
            'merchants.modified': this.modified
          });
        }
      }
      if (updateLastDate) {
        this.modified[merchantId] = {
          lastDate: Date.now() + UPDATE_SINGLE_MERCHANT_INTERVAL,
          requestDate: null
        };
        utils_setStorageData({
          'merchants.modified': this.modified
        });
      }
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "updateSingleMerchant",
    value: function () {
      var _updateSingleMerchant = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee4(merchant) {
        var userData, user, isPlus, url, _yield$getStorageData4, settings, browser, device, response, lastModifiedSince, _iterator2, _step2, header, data;
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!this.modified[merchant.id]) {
                _context4.next = 5;
                break;
              }
              if (!(this.modified[merchant.id].lastDate > Date.now() && merchant.lastModifiedSince !== '')) {
                _context4.next = 3;
                break;
              }
              return _context4.abrupt("return", merchant);
            case 3:
              if (!(this.modified[merchant.id].requestDate > Date.now())) {
                _context4.next = 5;
                break;
              }
              return _context4.abrupt("return", merchant);
            case 5:
              this.updateModified({
                merchantId: merchant.id,
                updateRequestDate: true
              });
              _context4.next = 8;
              return utils_getStorageData('user.data');
            case 8:
              userData = _context4.sent;
              user = userData['user.data'];
              isPlus = user && user.isPlus;
              url = "".concat(MERCHANTS_URL).concat(isPlus ? 'plus' : 'classic', "/").concat(merchant.id); // if (IS_CONFIG_TESTING) {
              //   url = `${MERCHANTS_URL_DETAIL}_${merchant.id}.json`;
              // }
              _context4.next = 14;
              return utils_getStorageData('settings');
            case 14:
              _yield$getStorageData4 = _context4.sent;
              settings = _yield$getStorageData4.settings;
              browser = getBrowser();
              device = getDevice();
              _context4.next = 20;
              return fetch(url, {
                headers: {
                  'If-Modified-Since': merchant.lastModifiedSince,
                  'Toolbar-Version': VERSION,
                  'Toolbar-Fingerprint': settings.analyticsClientId,
                  'Browser-Type': "".concat(browser, "_").concat(device)
                }
              });
            case 20:
              response = _context4.sent;
              if (!(response.status === 304)) {
                _context4.next = 24;
                break;
              }
              this.updateModified({
                merchantId: merchant.id,
                updateLastDate: true
              });
              return _context4.abrupt("return", merchant);
            case 24:
              if (!(!response.ok || response.status !== 200)) {
                _context4.next = 26;
                break;
              }
              return _context4.abrupt("return", merchant);
            case 26:
              lastModifiedSince = merchant.lastModifiedSince; // eslint-disable-next-line no-restricted-syntax
              _iterator2 = merchants_createForOfIteratorHelper(response.headers.entries());
              _context4.prev = 28;
              _iterator2.s();
            case 30:
              if ((_step2 = _iterator2.n()).done) {
                _context4.next = 37;
                break;
              }
              header = _step2.value;
              if (!(header[0] === 'date')) {
                _context4.next = 35;
                break;
              }
              lastModifiedSince = header[1];
              return _context4.abrupt("break", 37);
            case 35:
              _context4.next = 30;
              break;
            case 37:
              _context4.next = 42;
              break;
            case 39:
              _context4.prev = 39;
              _context4.t0 = _context4["catch"](28);
              _iterator2.e(_context4.t0);
            case 42:
              _context4.prev = 42;
              _iterator2.f();
              return _context4.finish(42);
            case 45:
              _context4.prev = 45;
              _context4.next = 48;
              return response.json();
            case 48:
              data = _context4.sent;
              _context4.next = 55;
              break;
            case 51:
              _context4.prev = 51;
              _context4.t1 = _context4["catch"](45);
              consoleLog('updateSingleMerchant', _context4.t1);
              return _context4.abrupt("return", merchant);
            case 55:
              this.updateModified({
                merchantId: merchant.id,
                updateLastDate: true
              });
              data = parseMerchant(data);
              _context4.next = 59;
              return merge_default()(data, {
                lastModifiedSince: lastModifiedSince
              });
            case 59:
              _context4.next = 61;
              return this.updateMerchants(data);
            case 61:
              return _context4.abrupt("return", data);
            case 62:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[28, 39, 42, 45], [45, 51]]);
      }));
      function updateSingleMerchant(_x2) {
        return _updateSingleMerchant.apply(this, arguments);
      }
      return updateSingleMerchant;
    }()
  }, {
    key: "updateMerchants",
    value: function () {
      var _updateMerchants = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee5(updatedMerchant) {
        var merchantIndex;
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              merchantIndex = this.data.findIndex(function (merchant) {
                return merchant.id === updatedMerchant.id;
              });
              this.data[merchantIndex] = updatedMerchant;
              _context5.next = 4;
              return utils_setStorageData({
                'merchants.data': this.data
              });
            case 4:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function updateMerchants(_x3) {
        return _updateMerchants.apply(this, arguments);
      }
      return updateMerchants;
    }()
  }, {
    key: "getByUrl",
    value: function getByUrl(url) {
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
        var filtered = this.data.filter(function (_ref5) {
          var domain = _ref5.domain;
          var rx = new RegExp("(^|\\.)".concat(domain));
          return rx.test(host);
        });
        filtered.forEach(function (_ref6, index) {
          var mUrl = _ref6.url;
          try {
            var _URL2 = new URL(mUrl),
              mHost = _URL2.host,
              mPath = _URL2.pathname;
            var _ref7 = (host + pathname).match(mHost + mPath) || [],
              _ref8 = (0,slicedToArray/* default */.Z)(_ref7, 1),
              match = _ref8[0];
            if (match && match.length > bestMatch.len) {
              Object.assign(bestMatch, {
                len: match.length,
                index: index
              });
            }
          } catch (_unused) {
            var message = "Url error! Domain: ".concat(mUrl);
            consoleLog(message);
          }
        });
        if (typeof bestMatch.index === 'number') {
          return filtered[bestMatch.index];
        }
        return null;
      } catch (e) {
        // no merchant matching url
        return null;
      }
    }
  }]);
  return Merchants;
}(BaseMerchants);

;// CONCATENATED MODULE: ./source/bg/customFetcher.js







function customFetcher_createSuper(Derived) { var hasNativeReflectConstruct = customFetcher_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,getPrototypeOf/* default */.Z)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,getPrototypeOf/* default */.Z)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,possibleConstructorReturn/* default */.Z)(this, result); }; }
function customFetcher_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var CustomFetcher = /*#__PURE__*/function (_DynamicFetcher) {
  (0,inherits/* default */.Z)(CustomFetcher, _DynamicFetcher);
  var _super = customFetcher_createSuper(CustomFetcher);
  function CustomFetcher() {
    var _this;
    (0,classCallCheck/* default */.Z)(this, CustomFetcher);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.setAlarmListenersCustomFetcher();
    _this.setInitialValues();
    return _this;
  }
  (0,createClass/* default */.Z)(CustomFetcher, [{
    key: "setInitialValues",
    value: function () {
      var _setInitialValues = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var data;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return utils_getStorageData("".concat(this.name, ".data"));
            case 2:
              data = _context.sent;
              this.data = data["".concat(this.name, ".data")];
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function setInitialValues() {
        return _setInitialValues.apply(this, arguments);
      }
      return setInitialValues;
    }()
  }, {
    key: "setAlarmListenersCustomFetcher",
    value: function setAlarmListenersCustomFetcher() {
      var _this2 = this;
      chrome.alarms.onAlarm.addListener(function (event) {
        if (event.name === _this2.name) {
          _this2.update();
        } else if (event.name === "".concat(_this2.name, "_force")) {
          _this2.update(true);
        }
      });
    }
  }, {
    key: "update",
    value: function update(force) {
      var _this3 = this;
      this.errorDelay = 20 * 60 * 1000 + Math.floor(Math.random() * 600) * 1000;
      return utils_getStorageData(["".concat(this.name, ".lastUpdate"), "".concat(this.name, ".data")]).then(function (items) {
        var lastUpdate = items["".concat(_this3.name, ".lastUpdate")];
        var cashedData = items["".concat(_this3.name, ".data")];
        var now = new Date().getTime();
        if (lastUpdate + _this3.updateDelay >= now && cashedData && !force) {
          _this3.data = cashedData;
          var nextUpdate = lastUpdate + _this3.updateDelay;
          chrome.alarms.create(_this3.name, {
            when: nextUpdate
          });
          return _this3.data;
        }
        return _this3.fetch().then(function (data) {
          return _this3.parse(data);
        }).then(function (data) {
          if (data || _this3.name.includes('flag') && data !== null) {
            _this3.data = data;
            var cash = {};
            cash["".concat(_this3.name, ".data")] = data;
            cash["".concat(_this3.name, ".lastUpdate")] = now;
            utils_setStorageData(cash);
            chrome.alarms.create(_this3.name, {
              when: _this3.updateDelay + now
            });
          } else {
            var errorUpdate = _this3.errorDelay + now;
            chrome.alarms.create("".concat(_this3.name, "_force"), {
              when: errorUpdate
            });
          }
          return _this3.data;
        })["catch"](function (e) {
          rollbarCaptureError(e, 'error_CustomFetcher', {
            name: _this3.name
          });
          var errorUpdate = _this3.errorDelay + now;
          chrome.alarms.create("".concat(_this3.name, "_force"), {
            when: errorUpdate
          });
        });
      });
    }
  }]);
  return CustomFetcher;
}(DynamicFetcher);

;// CONCATENATED MODULE: ./source/bg/configs.js








function configs_createSuper(Derived) { var hasNativeReflectConstruct = configs_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,getPrototypeOf/* default */.Z)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,getPrototypeOf/* default */.Z)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,possibleConstructorReturn/* default */.Z)(this, result); }; }
function configs_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var Configs = /*#__PURE__*/function (_CustomFetcher) {
  (0,inherits/* default */.Z)(Configs, _CustomFetcher);
  var _super = configs_createSuper(Configs);
  function Configs() {
    (0,classCallCheck/* default */.Z)(this, Configs);
    return _super.call(this, {
      name: 'configs',
      url: CONFIGS_URL,
      updateDelay: CONFIGS_UPDATE_DELAY,
      errorDelay: 10 * 60 * 1000
    });
  }
  (0,createClass/* default */.Z)(Configs, [{
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x, _x2) {
        return _fetch.apply(this, arguments);
      }
      fetch.toString = function () {
        return _fetch.toString();
      };
      return fetch;
    }(function (url, options) {
      var browser = getBrowser();
      var device = getDevice();
      var prodOptions = {
        headers: {
          'Toolbar-Version': VERSION,
          // eslint-disable-next-line no-undef
          'Toolbar-Fingerprint': app.settings.data.analyticsClientId,
          'Browser-Type': "".concat(browser, "_").concat(device)
        },
        cache: IS_CONFIG_TESTING ? 'no-cache' : 'default'
      };
      var params = options ? merge_default()(this.options, options, prodOptions) : merge_default()(this.options, prodOptions);
      return fetch(url || this.url, params).then(function (response) {
        return response.json();
      });
    })
  }, {
    key: "forceUpdate",
    value: function () {
      var _forceUpdate = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this.url = CONFIG_TOOL_URL;
              _context.next = 3;
              return this.update(true);
            case 3:
              this.url = CONFIGS_URL;
              this.options = {};
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function forceUpdate() {
        return _forceUpdate.apply(this, arguments);
      }
      return forceUpdate;
    }()
  }]);
  return Configs;
}(CustomFetcher);

;// CONCATENATED MODULE: ./source/bg/flags/redirect.js








function redirect_createSuper(Derived) { var hasNativeReflectConstruct = redirect_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,getPrototypeOf/* default */.Z)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,getPrototypeOf/* default */.Z)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,possibleConstructorReturn/* default */.Z)(this, result); }; }
function redirect_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




var Redirect = /*#__PURE__*/function (_CustomFetcher) {
  (0,inherits/* default */.Z)(Redirect, _CustomFetcher);
  var _super = redirect_createSuper(Redirect);
  function Redirect() {
    (0,classCallCheck/* default */.Z)(this, Redirect);
    return _super.call(this, {
      name: 'flagRedirect',
      url: FLAG_REDIRECT_URL,
      updateDelay: FLAGS_REDIRECT_UPDATE_DELAY,
      errorDelay: 10 * 60 * 1000
    });
  }
  (0,createClass/* default */.Z)(Redirect, [{
    key: "setInitialValues",
    value: function () {
      var _setInitialValues = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var data;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return utils_getStorageData("".concat(this.name, ".data"));
            case 2:
              data = _context.sent;
              if (data) {
                this.data = data["".concat(this.name, ".data")];
              } else {
                this.data = false;
              }
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function setInitialValues() {
        return _setInitialValues.apply(this, arguments);
      }
      return setInitialValues;
    }()
  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x, _x2) {
        return _fetch.apply(this, arguments);
      }
      fetch.toString = function () {
        return _fetch.toString();
      };
      return fetch;
    }(function (url, options) {
      var browser = getBrowser();
      var device = getDevice();
      var prodOptions = {
        headers: {
          'Toolbar-Version': VERSION,
          // eslint-disable-next-line no-undef
          'Toolbar-Fingerprint': app.settings.data.analyticsClientId,
          'Browser-Type': "".concat(browser, "_").concat(device)
        },
        cache: 'default'
      };
      var params = options ? merge_default()(this.options, options, prodOptions) : merge_default()(this.options, prodOptions);
      return fetch(url || this.url, params).then(function (response) {
        return response.json();
      });
    })
  }]);
  return Redirect;
}(CustomFetcher);

// EXTERNAL MODULE: ./node_modules/lodash/remove.js
var remove = __webpack_require__(2729);
var remove_default = /*#__PURE__*/__webpack_require__.n(remove);
;// CONCATENATED MODULE: ./source/bg/core/cashback.js











var CashbackBase = /*#__PURE__*/function () {
  function CashbackBase(_ref) {
    var suppressionPatterns = _ref.suppressionPatterns,
      activationPatterns = _ref.activationPatterns,
      googleSuppressionPatterns = _ref.googleSuppressionPatterns,
      disableSuppressionPatterns = _ref.disableSuppressionPatterns;
    (0,classCallCheck/* default */.Z)(this, CashbackBase);
    this.suppressionPatterns = suppressionPatterns;
    this.disableSuppressionPatterns = disableSuppressionPatterns;
    this.activationPatterns = activationPatterns;
    this.googleSuppressionPatterns = googleSuppressionPatterns;
    this.suppressions = [];
    this.activations = [];
    this.competitorsActivations = [];
    this.initActivationSuppressions();
    this.setAlarmListenersActivationsSuppressions();
  }
  (0,createClass/* default */.Z)(CashbackBase, [{
    key: "initActivationSuppressions",
    value: function () {
      var _initActivationSuppressions = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var _yield$getStorageData, activations, _yield$getStorageData2, competitorsActivations, _yield$getStorageData3, suppressions;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return utils_getStorageData('activations');
            case 2:
              _yield$getStorageData = _context.sent;
              activations = _yield$getStorageData.activations;
              merge_default()(this.activations, activations);
              _context.next = 7;
              return utils_getStorageData('competitorsActivations');
            case 7:
              _yield$getStorageData2 = _context.sent;
              competitorsActivations = _yield$getStorageData2.competitorsActivations;
              merge_default()(this.competitorsActivations, competitorsActivations);
              _context.next = 12;
              return utils_getStorageData('suppressions');
            case 12:
              _yield$getStorageData3 = _context.sent;
              suppressions = _yield$getStorageData3.suppressions;
              merge_default()(this.suppressions, suppressions);
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function initActivationSuppressions() {
        return _initActivationSuppressions.apply(this, arguments);
      }
      return initActivationSuppressions;
    }()
  }, {
    key: "checkActivation",
    value: function checkActivation(_ref2) {
      var url = _ref2.url,
        tabId = _ref2.tabId;
      var patterns = this.activationPatterns;
      var isActivationUrl = find_default()(patterns, function (p) {
        return url && p && url.match(p);
      });
      if (isActivationUrl) {
        this.setActivation({
          url: url,
          tabId: tabId
        });
      }
    }
  }, {
    key: "checkCompetitorsActivation",
    value: function () {
      var _checkCompetitorsActivation = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee2(_ref3) {
        var url, tabId, patterns, isActivationUrl, _yield$chrome$tabs$ge, windowId, parentTab, competitorActivation, activation;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              url = _ref3.url, tabId = _ref3.tabId;
              patterns = this.activationPatterns;
              isActivationUrl = find_default()(patterns, function (p) {
                return url && p && url.match(p);
              });
              if (!(tabId > 0 && !isActivationUrl)) {
                _context2.next = 14;
                break;
              }
              _context2.next = 6;
              return chrome.tabs.get(tabId);
            case 6:
              _yield$chrome$tabs$ge = _context2.sent;
              windowId = _yield$chrome$tabs$ge.windowId;
              _context2.next = 10;
              return getTabs({
                active: true,
                windowId: windowId
              }).then(function (_ref4) {
                var _ref5 = (0,slicedToArray/* default */.Z)(_ref4, 1),
                  tab = _ref5[0];
                return tab;
              });
            case 10:
              parentTab = _context2.sent;
              competitorActivation = find_default()(COMPETITORS_ACTIVATION_NETWORKS, function (pattern) {
                try {
                  return url.search(pattern.regex) > -1;
                } catch (e) {
                  return url.indexOf(pattern.regex) > 0;
                }
              });
              activation = this.findActivation(tabId); // the competitorActivation.competitor is needed because it can happen to
              // make a competitors activation while our activation is still on the array
              if (competitorActivation && (!activation || competitorActivation.competitor)) {
                this.setCompetitorsActivation({
                  tabId: tabId,
                  parentTab: parentTab === null || parentTab === void 0 ? void 0 : parentTab.id
                });
              }
            case 14:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function checkCompetitorsActivation(_x) {
        return _checkCompetitorsActivation.apply(this, arguments);
      }
      return checkCompetitorsActivation;
    }()
  }, {
    key: "checkSuppression",
    value: function checkSuppression(_ref6) {
      var url = _ref6.url,
        tabId = _ref6.tabId;
      if (!url) {
        return false;
      }
      var activation = find_default()(this.activations, function (a) {
        return a.tabId === tabId;
      });
      if (activation) {
        return false;
      }
      var isSuppression = find_default()(this.suppressionPatterns, function (pattern) {
        try {
          return url.search(pattern) > -1;
        } catch (e) {
          return url.indexOf(pattern) > 0;
        }
      });
      var isGoogleSuppression = find_default()(this.googleSuppressionPatterns, function (pattern) {
        try {
          return url.search(pattern) > -1;
        } catch (e) {
          return url.indexOf(pattern) > 0;
        }
      });
      var isDisableSuppression = find_default()(this.disableSuppressionPatterns, function (pattern) {
        try {
          return url.search(pattern) > -1;
        } catch (e) {
          return url.indexOf(pattern) > 0;
        }
      });
      if (isGoogleSuppression) {
        this.setSuppression({
          url: url,
          tabId: tabId,
          suppressionKind: 'googleSuppression'
        });
        return true;
      }
      if (isSuppression) {
        this.setSuppression({
          url: url,
          tabId: tabId,
          suppressionKind: 'suppression'
        });
        return true;
      }
      if (isDisableSuppression) {
        this.setSuppression({
          url: url,
          tabId: tabId,
          suppressionKind: 'disableSuppression'
        });
      }
      return false;
    }
  }, {
    key: "setSuppression",
    value: function setSuppression(_ref7) {
      var tabId = _ref7.tabId,
        suppressionKind = _ref7.suppressionKind;
      var suppression = find_default()(this.suppressions, function (s) {
        return s.tabId === tabId;
      });
      if (!suppression) {
        suppression = {
          tabId: tabId,
          suppressionKind: suppressionKind
        };
        this.suppressions.push(suppression);
      }
      // clearTimeout(suppression.timer);
      chrome.alarms.create("suppressions_".concat(tabId), {
        when: Date.now() + REMOVE_SUPPRESSION_FROM_LIST_DELAY
      });
      setStorageData({
        suppressions: this.suppressions
      });
    }
  }, {
    key: "setAlarmListenersActivationsSuppressions",
    value: function setAlarmListenersActivationsSuppressions() {
      var _this = this;
      chrome.alarms.onAlarm.addListener(function (event) {
        var eventName = event.name.split('_')[0];
        var tabId = parseInt(event.name.split('_')[1], 10);
        if (eventName === 'suppressions') {
          remove_default()(_this.suppressions, function (s) {
            return s.tabId === tabId;
          });
          setStorageData({
            suppressions: _this.suppressions
          });
        } else if (eventName === 'activations') {
          remove_default()(_this.activations, function (s) {
            return s.tabId === tabId;
          });
          setStorageData({
            activations: _this.activations
          });
        } else if (eventName === 'competitorsActivations') {
          remove_default()(_this.competitorsActivations, function (s) {
            return s.tabId === tabId;
          });
          setStorageData({
            competitorsActivations: _this.competitorsActivations
          });
        }
      });
    }
  }, {
    key: "setActivation",
    value: function setActivation(_ref8) {
      var tabId = _ref8.tabId,
        currentTabId = _ref8.currentTabId,
        deeplink = _ref8.deeplink;
      var activation = find_default()(this.activations, function (a) {
        return a.tabId === tabId;
      });
      if (!activation) {
        activation = {
          tabId: tabId,
          currentTabId: currentTabId
        };
        this.activations.push(activation);
      }
      activation.deeplink = activation.deeplink || deeplink;
      chrome.alarms.create("activations_".concat(tabId), {
        when: Date.now() + REMOVE_ACTIVATION_FROM_LIST_DELAY
      });
      setStorageData({
        activations: this.activations
      });
    }
  }, {
    key: "setCompetitorsActivation",
    value: function setCompetitorsActivation(_ref9) {
      var tabId = _ref9.tabId,
        parentTab = _ref9.parentTab;
      var competitorsActivations = find_default()(this.competitorsActivations, function (a) {
        return a.tabId === tabId;
      });
      if (!competitorsActivations) {
        competitorsActivations = {
          tabId: tabId,
          associatedTabs: [parentTab]
        };
        this.competitorsActivations.push(competitorsActivations);
      } else {
        competitorsActivations.associatedTabs.push(parentTab);
      }
      chrome.alarms.create("competitorsActivations_".concat(tabId), {
        when: Date.now() + REMOVE_COMPETITOR_ACTIVATION_FROM_LIST_DELAY
      });
      setStorageData({
        competitorsActivations: this.competitorsActivations
      });
    }
  }]);
  return CashbackBase;
}();

;// CONCATENATED MODULE: ./source/bg/cashback.js








function cashback_createSuper(Derived) { var hasNativeReflectConstruct = cashback_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,getPrototypeOf/* default */.Z)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,getPrototypeOf/* default */.Z)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,possibleConstructorReturn/* default */.Z)(this, result); }; }
function cashback_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




/* eslint class-methods-use-this:
["error", { "exceptMethods": ["checkUserLogin", "checkBasc"] }] */
var Cashback = /*#__PURE__*/function (_CashbackBase) {
  (0,inherits/* default */.Z)(Cashback, _CashbackBase);
  var _super = cashback_createSuper(Cashback);
  function Cashback() {
    var _this;
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0,classCallCheck/* default */.Z)(this, Cashback);
    _this = _super.call(this, args);
    _this.setAlarmListenersResetTimers();
    return _this;
  }
  /**
   * passes to checkURL
   * @param {*} args
   */
  (0,createClass/* default */.Z)(Cashback, [{
    key: "check",
    value: function check(args) {
      this.checkURL(args);
    }

    /**
     * Where Activation and Suppression are checked
     * args.url args.tabId are the only required/used
     * @param {*} args
     * @returns {Boolean}
     */
  }, {
    key: "checkURL",
    value: function checkURL(args) {
      this.checkCompetitorsActivation({
        url: args.url,
        tabId: args.tabId
      });
      this.checkActivation(args);
      this.checkSuppression(args);
      var matchCampId = args.url.match(CAMPAIGN_ID_RX);
      if (!matchCampId) return false;
      if (matchCampId[2].includes('campid') && !matchCampId[2].includes(CAMPAIGN_ID_EBAY)) {
        this.setSuppression({
          tabId: args.tabId
        });
        this.defineIcon({
          tabId: args.tabId
        });
        utils_setStorageData({
          ebayTimestamp: Date.now() + 1000 * 60 * 60 * 24 // 24 hours
        });
      }

      return true;
    }
  }, {
    key: "checkActivationByActivationUrl",
    value: function checkActivationByActivationUrl(_ref) {
      var url = _ref.url,
        tabId = _ref.tabId;
      var merchant = this.merchants.getByActivationUrl(url);
      if (merchant) {
        this.setActivation({
          url: url,
          tabId: tabId
        });
        return true;
      }
      return false;
    }

    /**
     * Wrapper to check Bacs
     *
     * @returns true if isn'nt requiredBacs or isRequiredBacs and user has Bacs
     */
  }, {
    key: "checkBasc",
    value: function checkBasc(_ref2) {
      var isRequiresBacs = _ref2.isRequiresBacs,
        userBacs = _ref2.userBacs;
      return !isRequiresBacs || isRequiresBacs && userBacs;
    }
  }, {
    key: "setAlarmListenersResetTimers",
    value: function setAlarmListenersResetTimers() {
      var _this2 = this;
      chrome.alarms.onAlarm.addListener(function (event) {
        var eventName = event.name.split('_')[0];
        var merchantId = parseInt(event.name.split('_')[1], 10);
        if (eventName === 'resetTimers') {
          _this2.merchants.setState({
            id: merchantId,
            data: {
              activated: false,
              showNotification: true,
              suppressed: false,
              suppressedKind: '',
              showReactivation: false,
              competitorActivationTab: null,
              showSecondNotifier: false,
              showSecondNotifierTimestamp: null
            }
          });
        }
        if (eventName === 'resetActivations') {
          _this2.merchants.setState({
            id: merchantId,
            data: {
              topcashbackActivationTab: null
            }
          });
        }
      });
    }

    /**
    * is only called on chrome.tabs.onUpdated event
    * is used to check ativations or suppression in case any of those exist
    *
    * @param url - current url
    * @param tabId - unique tab identifier
    * @param userBacs - userBacs
    * @returns {Boolean}
    */
  }, {
    key: "checkMerchantStatus",
    value: function () {
      var _checkMerchantStatus = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee(_ref3) {
        var _suppression, _suppression2;
        var url, tabId, userBacs, checkActivation, merchant, activation, competitorActivation, suppression, state, topcashbackActivationTab, confirmationTimestamp, sameTab, activationTabIds, competitorActivationTab, activated, showReactivation, activatingCashback, data;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              url = _ref3.url, tabId = _ref3.tabId, userBacs = _ref3.userBacs, checkActivation = _ref3.checkActivation;
              // get merchant using url given
              merchant = this.merchants.getByUrl(url);
              if (merchant) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return", false);
            case 4:
              // find activation on the activation array \ activation lasts 30s
              activation = this.findActivation(tabId);
              competitorActivation = this.findCompetitorsActivation(tabId); // find supression on the supression array \ supression lasts 40s
              suppression = this.findSuppression(tabId); // if suppression exists and is googleSuppression and merchant is serpEnabled Any then it will not be suppresssed and suppression will be null
              // the same if merchant is serpEnabled None
              // eslint-disable-next-line operator-linebreak
              if (suppression && suppression.suppressionKind === 'googleSuppression' && merchant.settings.suppressionKind === 'Any') {
                suppression = null;
              }
              if (!(!suppression && !activation && !competitorActivation)) {
                _context.next = 10;
                break;
              }
              return _context.abrupt("return", false);
            case 10:
              // find the merchant state
              state = this.findState(merchant.id);
              topcashbackActivationTab = state.topcashbackActivationTab;
              confirmationTimestamp = state.confirmation_timestamp;
              if (!(checkActivation && activation)) {
                _context.next = 25;
                break;
              }
              sameTab = tabId === activation.currentTabId || !activation.currentTabId;
              activationTabIds = [tabId, activation.currentTabId];
              if (sameTab) {
                activationTabIds = [tabId];
              }
              if (!confirmationTimestamp || Date.now() > confirmationTimestamp + REMOVE_ACTIVATION_FROM_LIST_DELAY) {
                confirmationTimestamp = Date.now() + CONFIRMATION_NOTIFICATION_DELAY_TIMESTAMP;
              }
              // add tabId to array of tabids where topcashback activated this merchant
              topcashbackActivationTab = state.topcashbackActivationTab ? state.topcashbackActivationTab.concat(activationTabIds) : activationTabIds;
              // when activation is done it needs to pass through this
              // keeps the merchant active for 30 minutes
              chrome.alarms.create("resetTimers_".concat(merchant.id), {
                delayInMinutes: ACTIVATION_RESET_TIMER
              });
              chrome.alarms.create("resetActivations_".concat(merchant.id), {
                delayInMinutes: ACTIVATION_RESET_TIMER
              });
              if (sameTab) {
                _context.next = 25;
                break;
              }
              _context.next = 24;
              return updateTab(activation.currentTabId, {
                active: true
              });
            case 24:
              setTimeout(function () {
                removeTabs(tabId);
              }, 5 * 1000);
            case 25:
              competitorActivationTab = state.competitorActivationTab;
              if (competitorActivation) {
                competitorActivationTab = competitorActivationTab ? competitorActivationTab.concat([tabId].concat(competitorActivation.associatedTabs)) : [tabId].concat(competitorActivation.associatedTabs);
                confirmationTimestamp = null;
                remove_default()(topcashbackActivationTab, function (i) {
                  return i === tabId;
                });
                if (!state.activated && !activation) {
                  // case of competitor activation but our merchant isn't active
                  // update tabs where competitors are present
                  this.merchants.setState({
                    id: merchant.id,
                    data: {
                      showNotification: !suppression,
                      suppressed: !!suppression,
                      competitorActivationTab: competitorActivationTab,
                      topcashbackActivationTab: topcashbackActivationTab
                    },
                    tabId: null
                  });
                  // return false;
                }
              }
              activated = checkActivation && !!activation && this.checkBasc({
                isRequiresBacs: merchant.isRequiresBacs,
                userBacs: userBacs
              }) && !competitorActivation;
              showReactivation = !!competitorActivation || state.showReactivation && !activated;
              activatingCashback = false;
              if (!checkActivation && activation && !merchant.activated) {
                activatingCashback = true;
              } else if (!checkActivation) {
                activatingCashback = merchant.activatingCashback;
              }
              data = {
                // affects the text on the icon and the showCaa on content/app.vue
                suppressed: !!suppression,
                suppressedKind: (_suppression = suppression) === null || _suppression === void 0 ? void 0 : _suppression.suppressionKind,
                // marks the merchant as active
                // activation exists and checkBasc just checks if the merchant can be activated for the user
                activated: activated,
                // used to enforce the confirmation notification delay
                confirmation_timestamp: confirmationTimestamp,
                // affects the show of notifications
                // (doesn't exist suppression or activation exists) and checkConfirmation
                showNotification: !!(!suppression || checkActivation && activation) && this.checkConfirmation(confirmationTimestamp) && !showReactivation,
                // the second part is to ensure that if the navigation redirects to the user itself it can be reactivated also
                showReactivation: showReactivation && !(((_suppression2 = suppression) === null || _suppression2 === void 0 ? void 0 : _suppression2.suppressionKind) === 'disableSuppression'),
                competitorActivationTab: showReactivation ? competitorActivationTab : null,
                topcashbackActivationTab: topcashbackActivationTab,
                activatingCashback: activatingCashback
              }; // updates the state with new information
              this.merchants.setState({
                id: merchant.id,
                data: data,
                tabId: null
              });
              consoleLog('checkMerchantStatus - data', data);
              // removes suppression after updating state
              if (suppression) {
                chrome.alarms.create("resetTimers_".concat(merchant.id), {
                  delayInMinutes: SUPRESSION_RESET_TIMER
                });
                // when suppression is done it needs to pass through this
                // keeps the merchant suppressed for 30 minutes
                chrome.alarms.clear("suppressions_".concat(tabId));
                remove_default()(this.suppressions, function (i) {
                  return i.tabId === tabId;
                });
                utils_setStorageData({
                  suppressions: this.suppressions
                });
              }
              if (competitorActivation) {
                chrome.alarms.create("resetTimers_".concat(merchant.id), {
                  delayInMinutes: RE_ACTIVATION_RESET_TIMER
                });
                chrome.alarms.clear("competitorsActivations_".concat(tabId));
                // remove competitorActivation after deactivation merchant
                remove_default()(this.competitorsActivations, function (i) {
                  return i.tabId === tabId;
                });
                utils_setStorageData({
                  competitorsActivations: this.competitorsActivations
                });
              }
              return _context.abrupt("return", true);
            case 37:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function checkMerchantStatus(_x) {
        return _checkMerchantStatus.apply(this, arguments);
      }
      return checkMerchantStatus;
    }()
  }, {
    key: "checkDeeplink",
    value: function () {
      var _checkDeeplink = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee2(_ref4) {
        var _this3 = this;
        var url, tabId, activation, _yield$this$merchants, merchant, state;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              url = _ref4.url, tabId = _ref4.tabId;
              activation = this.findActivation(tabId);
              if (!(!activation || !activation.deeplink)) {
                _context2.next = 4;
                break;
              }
              return _context2.abrupt("return", false);
            case 4:
              _context2.next = 6;
              return this.merchants.getMerchantAndState({
                url: url
              });
            case 6:
              _yield$this$merchants = _context2.sent;
              merchant = _yield$this$merchants.merchant;
              state = _yield$this$merchants.state;
              if (merchant) {
                _context2.next = 11;
                break;
              }
              return _context2.abrupt("return", false);
            case 11:
              if (!(state.activated && merchant.domain.indexOf('booking.com') === 0)) {
                _context2.next = 14;
                break;
              }
              delete activation.deeplink;
              return _context2.abrupt("return", false);
            case 14:
              if (state.activated) {
                // if we have an activation redirects to where the user clicked activate
                // await updateTab(tabId, { url: activation.deeplink });
                delete activation.deeplink;
              }
              if (activation) {
                setTimeout(function () {
                  _this3.activations = _this3.activations.filter(function (i) {
                    return i.tabId !== tabId;
                  });
                }, 2 * 1000);
              }
              utils_setStorageData({
                activations: this.activations
              });
              return _context2.abrupt("return", true);
            case 18:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function checkDeeplink(_x2) {
        return _checkDeeplink.apply(this, arguments);
      }
      return checkDeeplink;
    }()
  }, {
    key: "activate",
    value: function () {
      var _activate = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee3(_ref5) {
        var data, sender, device, tab, url, deeplink, dataAction, newTab, merchantId, isLogged, tabId, currentTabId, useNewTab, oldRedirectOverride, resultTab, _resultTab;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              data = _ref5.data, sender = _ref5.sender, device = _ref5.device;
              tab = sender.tab;
              url = data.activationUrl;
              deeplink = data.deeplink, dataAction = data.dataAction, newTab = data.newTab, merchantId = data.merchantId; // gets the value reactivation or null
              if (dataAction === 'reactivation') {
                url = url.replace('ref=tb', 'ref=tbCookieChecker');
              } else if (dataAction === 'secondNotifier') {
                if (BROWSER === 'chrome' && (REGION === 'us' || REGION === 'uk')) {
                  if (this.secondNotifierTimer === 10 * 60 * 1000) {
                    url = url.replace('ref=tb', 'ref=tbSN10');
                  } else {
                    url = url.replace('ref=tb', 'ref=tbSN5');
                  }
                } else {
                  url = url.replace('ref=tb', 'ref=tbSN10');
                }
              } else if (dataAction === 'CouponApplier') {
                url = url.replace('ref=tb', 'ref=tbCAA');
              }
              if (device === 'mobile') {
                url = url.replace('ref=tb', 'ref=mtb');
              }
              _context3.next = 8;
              return checkUserLogin();
            case 8:
              isLogged = _context3.sent;
              useNewTab = newTab;
              oldRedirectOverride = [];
              if (REGION === 'uk') {
                oldRedirectOverride = ['24811',
                // Compare the Market Travel Insurance
                '6428',
                // Very
                '16813',
                // Disney Store
                '23570',
                // Sephora
                '25978',
                // Domino's Pizza
                '11349',
                // Debenhams
                '18533',
                // Holland & Barrett
                '24393',
                // Online home shop
                '27969',
                // Superdrug
                '23139',
                // Pro:Direct Soccer
                '21157',
                // COS
                '26143',
                // Go.Compare Travel Insurance
                '23209',
                // Joma Jewellery
                '23786',
                // H Samuel
                '10943',
                // Liz Earle
                '14448',
                // BoohooMAN
                '20272',
                // TUI
                '5773',
                // Simply Be
                '26218',
                // White Stuff
                '23263' // ProCook
                ];
              }

              if (oldRedirectOverride.includes(merchantId)) {
                useNewTab = false;
              }
              if (merchantId) {
                this.merchants.setState({
                  id: merchantId,
                  data: {
                    showNotification: true,
                    activatingCashback: true
                  }
                });
              }
              if (tab) {
                _context3.next = 18;
                break;
              }
              _context3.next = 17;
              return utils_getActiveTab();
            case 17:
              tab = _context3.sent;
            case 18:
              if (!useNewTab) {
                _context3.next = 27;
                break;
              }
              _context3.next = 21;
              return createTab({
                url: url,
                active: false
              });
            case 21:
              resultTab = _context3.sent;
              tabId = resultTab.id;
              currentTabId = tab.id;
              this.setActivation({
                tabId: tabId,
                currentTabId: currentTabId,
                deeplink: deeplink
              });
              _context3.next = 32;
              break;
            case 27:
              _context3.next = 29;
              return updateTab(tab.id, {
                url: url
              });
            case 29:
              _resultTab = _context3.sent;
              tabId = _resultTab.id;
              if (isLogged) {
                this.setActivation({
                  tabId: tabId,
                  currentTabId: currentTabId,
                  deeplink: deeplink
                });
              }
            case 32:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function activate(_x3) {
        return _activate.apply(this, arguments);
      }
      return activate;
    }()
  }, {
    key: "findActivation",
    value: function findActivation(tabId) {
      return this.activations.find(function (a) {
        return a.tabId === tabId;
      });
    }
  }, {
    key: "findCompetitorsActivation",
    value: function findCompetitorsActivation(tabId) {
      return this.competitorsActivations.find(function (a) {
        return a.tabId === tabId;
      });
    }
  }, {
    key: "findSuppression",
    value: function findSuppression(tabId) {
      return this.suppressions.find(function (s) {
        return s.tabId === tabId;
      });
    }
  }, {
    key: "findState",
    value: function findState(merchantId) {
      return this.merchants.states.find(function (s) {
        return s.id === merchantId;
      });
    }
  }, {
    key: "resetSuprressionActivation",
    value: function resetSuprressionActivation() {
      this.suppressions = [];
      this.activations = [];
      utils_setStorageData({
        suppressions: this.suppressions
      });
      utils_setStorageData({
        activations: this.activations
      });
    }

    /**
     * verifies conditions to check if showNotification can be set as true
     * @param {*} state
     * @returns {Boolean} true if doens't exist state.confirmation_timestamp or state.confirmation_timestamp is in the future
    */

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "checkConfirmation",
    value: function checkConfirmation(confirmationTimestamp) {
      return !confirmationTimestamp || confirmationTimestamp > Date.now();
    }
  }]);
  return Cashback;
}(CashbackBase);

;// CONCATENATED MODULE: ./source/bg/settings.js








/* eslint class-methods-use-this: ["error", { "exceptMethods": ["parse"] }] */
var Settings = /*#__PURE__*/function () {
  function Settings() {
    var _this = this;
    (0,classCallCheck/* default */.Z)(this, Settings);
    (0,defineProperty/* default */.Z)(this, "getSettings", /*#__PURE__*/(0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
      return regenerator_default().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!_this.isReady) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return", _this.data);
          case 2:
            _context.next = 4;
            return _this.init();
          case 4:
            return _context.abrupt("return", _this.data);
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
    (0,defineProperty/* default */.Z)(this, "setSettings", /*#__PURE__*/function () {
      var _ref2 = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee2(data) {
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              merge_default()(_this.data, data);
              _context2.next = 3;
              return setStorageData({
                settings: _this.data
              });
            case 3:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
    this.isFirefox = getBrowser() === 'firefox';
    this.data = {
      isAnalyticsEnabled: !(this.isFirefox || REGION === 'uk' || REGION === 'fr' || REGION === 'au'),
      analyticsClientId: null,
      isNotificationEnabled: true,
      showGa: this.isFirefox || REGION === 'uk' || REGION === 'fr' || REGION === 'au'
    };
    this.isReady = false;
    this.init();
  }
  (0,createClass/* default */.Z)(Settings, [{
    key: "init",
    value: function () {
      var _init = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee3() {
        var _yield$getStorageData, settings;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return getStorageData('settings');
            case 2:
              _yield$getStorageData = _context3.sent;
              settings = _yield$getStorageData.settings;
              merge_default()(this.data, settings);
              this.isReady = true;
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }]);
  return Settings;
}();

;// CONCATENATED MODULE: ./source/bg/icon.js




// import { map } from 'lodash';

var Icon = /*#__PURE__*/function () {
  function Icon() {
    (0,classCallCheck/* default */.Z)(this, Icon);
    this.state = {};
    this.images = {};
    this.defaultState = {
      color: '#1c7153',
      // '#F60859',
      step: 2.5,
      endStep: 0.5,
      repeats: 5
    };
    this.init();
  }
  (0,createClass/* default */.Z)(Icon, [{
    key: "init",
    value: function init() {
      this.state = Object.assign({}, this.defaultState);
    }
  }, {
    key: "animatorLoop",
    value: function animatorLoop(counter) {
      var img = counter % 27;
      this.setIcon({
        path: "icon_loop/".concat(img, ".png")
      });
      return this;
    }
  }, {
    key: "setIcon",
    value: function setIcon(_ref) {
      var path = _ref.path;
      if (path) {
        chrome.action.setIcon({
          path: path
        });
      }
      return this;
    }
  }, {
    key: "timeout",
    value: function () {
      var _timeout = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee(ms) {
        var _this = this;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this.clearTimeout();
              this.timerPromise = new Promise(function (resolve) {
                _this.timer = setTimeout(function () {
                  return resolve(true);
                }, ms);
              });
              return _context.abrupt("return", this.timerPromise);
            case 3:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function timeout(_x) {
        return _timeout.apply(this, arguments);
      }
      return timeout;
    }()
  }, {
    key: "clearTimeout",
    value: function (_clearTimeout) {
      function clearTimeout() {
        return _clearTimeout.apply(this, arguments);
      }
      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };
      return clearTimeout;
    }(function () {
      clearTimeout(this.timer);
      this.timerPromise = null;
    })
  }, {
    key: "animate",
    value: function () {
      var _animate = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        var step,
          counter,
          frameRate,
          _args2 = arguments;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              step = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 2.5;
              counter = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 0;
              frameRate = 800 / 60;
              this.animatorLoop(counter);
              //   .setIcon({ path: ICONS });
              if (!(step >= 1 && !this.stopProcess)) {
                _context2.next = 10;
                break;
              }
              _context2.next = 7;
              return this.timeout(frameRate);
            case 7:
              _context2.next = 9;
              return this.animate(step - 0.04, counter + 1);
            case 9:
              return _context2.abrupt("return", true);
            case 10:
              return _context2.abrupt("return", true);
            case 11:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function animate() {
        return _animate.apply(this, arguments);
      }
      return animate;
    }()
  }, {
    key: "process",
    value: function () {
      var _process = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee3() {
        var repeats, _i, _repeats, repeat;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              repeats = [1, 2, 3];
              /* eslint-disable */
              _i = 0, _repeats = repeats;
            case 2:
              if (!(_i < _repeats.length)) {
                _context3.next = 12;
                break;
              }
              repeat = _repeats[_i];
              if (!this.stopProcess) {
                _context3.next = 7;
                break;
              }
              this.stopProcess = false;
              return _context3.abrupt("break", 12);
            case 7:
              _context3.next = 9;
              return this.animate();
            case 9:
              _i++;
              _context3.next = 2;
              break;
            case 12:
              this.setIcon({
                path: ICONS_ACTIVE
              });
              /* eslint-enable */
            case 13:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function process() {
        return _process.apply(this, arguments);
      }
      return process;
    }()
  }, {
    key: "stop",
    value: function () {
      var _stop = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee4() {
        return regenerator_default().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              this.clearTimeout();
              this.stopProcess = true;
              _context4.next = 4;
              return this.timeout(20);
            case 4:
              this.stopProcess = false;
            case 5:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function stop() {
        return _stop.apply(this, arguments);
      }
      return stop;
    }()
  }, {
    key: "merchant",
    value: function () {
      var _merchant = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee5() {
        return regenerator_default().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.stop();
            case 2:
              // await this.clear().process();
              this.setIcon({
                path: ICONS
              });
            case 3:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function merchant() {
        return _merchant.apply(this, arguments);
      }
      return merchant;
    }()
  }, {
    key: "nonMerchant",
    value: function () {
      var _nonMerchant = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee6() {
        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.stop();
            case 2:
              this.setIcon({
                path: ICONS
              });
            case 3:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function nonMerchant() {
        return _nonMerchant.apply(this, arguments);
      }
      return nonMerchant;
    }()
  }, {
    key: "activatedMerchant",
    value: function () {
      var _activatedMerchant = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee7() {
        return regenerator_default().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              this.state = {
                color: '#5ab091'
              };
              _context7.next = 3;
              return this.stop();
            case 3:
              _context7.next = 5;
              return this.process();
            case 5:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this);
      }));
      function activatedMerchant() {
        return _activatedMerchant.apply(this, arguments);
      }
      return activatedMerchant;
    }()
  }]);
  return Icon;
}();

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__(5987);
;// CONCATENATED MODULE: ./source/bg/analytics.js





var _excluded = ["ea"];



var SmartAnalytics = /*#__PURE__*/function () {
  function SmartAnalytics(_ref) {
    var getSettings = _ref.getSettings,
      setSettings = _ref.setSettings;
    (0,classCallCheck/* default */.Z)(this, SmartAnalytics);
    this.getSettings = getSettings;
    this.setSettings = setSettings;
    this.isReady = false;
    this.init();
  }
  (0,createClass/* default */.Z)(SmartAnalytics, [{
    key: "init",
    value: function () {
      var _init = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var _yield$this$getSettin, analyticsClientId;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.getSettings();
            case 2:
              _yield$this$getSettin = _context.sent;
              analyticsClientId = _yield$this$getSettin.analyticsClientId;
              if (analyticsClientId) {
                _context.next = 8;
                break;
              }
              this.analyticsClientId = uuidv4();
              _context.next = 8;
              return this.setSettings({
                analyticsClientId: this.analyticsClientId
              });
            case 8:
              this.isReady = true;
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function init() {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee2(params) {
        var ea, otherParams, _chrome$runtime$getMa, version, browser, device, ABTestingParams, _yield$getStorageData, secondNotifierTimer, settings, analyticsBody, pinned, pinnedValue;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!ALLOW_GA) {
                _context2.next = 30;
                break;
              }
              ea = params.ea, otherParams = (0,objectWithoutProperties/* default */.Z)(params, _excluded);
              _chrome$runtime$getMa = chrome.runtime.getManifest(), version = _chrome$runtime$getMa.version;
              browser = getBrowser();
              device = getDevice();
              otherParams.appVersion = version;
              otherParams.device = "".concat(browser, "_").concat(device);
              otherParams.browser = browser;
              otherParams.deviceCategory = device;

              // eslint-disable-next-line camelcase
              ABTestingParams = otherParams;
              if (!(BROWSER === 'chrome' && (REGION === 'us' || REGION === 'uk'))) {
                _context2.next = 16;
                break;
              }
              _context2.next = 13;
              return getStorageData('secondNotifierTimer');
            case 13:
              _yield$getStorageData = _context2.sent;
              secondNotifierTimer = _yield$getStorageData.secondNotifierTimer;
              ABTestingParams = merge_default()(otherParams, {
                ab_delay_timer: secondNotifierTimer / (60 * 1000)
              });
            case 16:
              ABTestingParams = merge_default()(ABTestingParams, {
                sleek: 'true'
              });
              _context2.next = 19;
              return this.getSettings();
            case 19:
              settings = _context2.sent;
              if (settings.isAnalyticsEnabled) {
                _context2.next = 22;
                break;
              }
              return _context2.abrupt("return", null);
            case 22:
              analyticsBody = {
                client_id: settings.analyticsClientId,
                events: [{
                  name: ea.replace(/[^a-z0-9]/gi, '_'),
                  params: ABTestingParams
                }]
              };
              if (!['chrome', 'firefox'].includes(BROWSER)) {
                _context2.next = 29;
                break;
              }
              _context2.next = 26;
              return chrome.action.getUserSettings();
            case 26:
              pinned = _context2.sent;
              pinnedValue = pinned.isOnToolbar ? 'Pinned' : 'Not Pinned';
              analyticsBody = merge_default()(analyticsBody, {
                user_properties: {
                  isPinned: {
                    value: pinnedValue
                  }
                }
              });
            case 29:
              return _context2.abrupt("return", fetch("https://www.google-analytics.com/mp/collect?measurement_id=".concat(GA_ID, "&api_secret=").concat(GA_API_SECRET), {
                method: 'POST',
                body: JSON.stringify(analyticsBody)
              }));
            case 30:
              return _context2.abrupt("return", null);
            case 31:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function send(_x) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }, {
    key: "sendSelectPromotion",
    value: function () {
      var _sendSelectPromotion = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee3(eventType, merchantName, coupon, sessionId, cartTotalBefore, cartTotalAfter) {
        var _sleekInfo, _chrome$runtime$getMa2, version, settings, browser, device, price, sleekInfo, _sleekInfo2, discount;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!ALLOW_GA) {
                _context3.next = 18;
                break;
              }
              _chrome$runtime$getMa2 = chrome.runtime.getManifest(), version = _chrome$runtime$getMa2.version;
              _context3.next = 4;
              return this.getSettings();
            case 4:
              settings = _context3.sent;
              if (settings.isAnalyticsEnabled) {
                _context3.next = 7;
                break;
              }
              return _context3.abrupt("return", null);
            case 7:
              browser = getBrowser();
              device = getDevice();
              price = cartTotalBefore;
              _context3.next = 12;
              return getStorageData('sleekInfo');
            case 12:
              sleekInfo = _context3.sent;
              sleekInfo = (_sleekInfo = sleekInfo) === null || _sleekInfo === void 0 ? void 0 : _sleekInfo.sleekInfo;
              if (!price && sleekInfo && sleekInfo.sessionId === sessionId) {
                price = (_sleekInfo2 = sleekInfo) === null || _sleekInfo2 === void 0 ? void 0 : _sleekInfo2.cartTotalBefore;
              }
              discount = 0;
              if (price && cartTotalAfter) {
                discount = price - cartTotalAfter;
              }
              return _context3.abrupt("return", fetch("https://www.google-analytics.com/mp/collect?measurement_id=".concat(GA_ID, "&api_secret=").concat(GA_API_SECRET), {
                method: 'POST',
                body: JSON.stringify({
                  client_id: settings.analyticsClientId,
                  events: [{
                    name: 'begin_checkout',
                    params: {
                      appVersion: version,
                      device: "".concat(browser, "_").concat(device),
                      browser: browser,
                      deviceCategory: device,
                      currency: CURRENCY,
                      promotion_name: 'CAA SLEEK',
                      value: price,
                      coupon: coupon,
                      items: [{
                        item_id: sessionId,
                        item_name: "checkout_".concat(sessionId),
                        coupon: coupon,
                        discount: discount,
                        item_brand: merchantName,
                        price: price,
                        item_list_id: eventType,
                        affiliation: 'sleek',
                        quantity: 1
                      }]
                    }
                  }]
                })
              }));
            case 18:
              return _context3.abrupt("return", null);
            case 19:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function sendSelectPromotion(_x2, _x3, _x4, _x5, _x6, _x7) {
        return _sendSelectPromotion.apply(this, arguments);
      }
      return sendSelectPromotion;
    }()
  }]);
  return SmartAnalytics;
}();

;// CONCATENATED MODULE: ./source/bg/user.js








function user_createSuper(Derived) { var hasNativeReflectConstruct = user_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,getPrototypeOf/* default */.Z)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,getPrototypeOf/* default */.Z)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,possibleConstructorReturn/* default */.Z)(this, result); }; }
function user_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




/* eslint class-methods-use-this: ["error", { "exceptMethods": ["parse"] }] */
var User = /*#__PURE__*/function (_CustomFetcher) {
  (0,inherits/* default */.Z)(User, _CustomFetcher);
  var _super = user_createSuper(User);
  function User() {
    var _this;
    (0,classCallCheck/* default */.Z)(this, User);
    _this = _super.call(this, {
      name: 'user',
      url: USER_INFO_URL,
      updateDelay: 4 * 60 * 60 * 1000,
      errorDelay: 10 * 60 * 1000
    });
    _this.data = {
      isLoggedIn: false,
      isPlus: false,
      hasBacs: false
    };
    return _this;
  }
  (0,createClass/* default */.Z)(User, [{
    key: "parse",
    value: function parse(data) {
      return parseUserInfo(data);
    }
  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x, _x2) {
        return _fetch.apply(this, arguments);
      }
      fetch.toString = function () {
        return _fetch.toString();
      };
      return fetch;
    }( /*#__PURE__*/function () {
      var _ref = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee(url, options) {
        var TCBTBAuth, browser, device, headers, params;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getUserTCBTBAuth();
            case 2:
              TCBTBAuth = _context.sent;
              browser = getBrowser();
              device = getDevice();
              headers = {
                'Toolbar-Version': VERSION,
                // eslint-disable-next-line no-undef
                'Toolbar-Fingerprint': app.settings.data.analyticsClientId,
                'Browser-Type': "".concat(browser, "_").concat(device)
              };
              if (TCBTBAuth) {
                headers = merge_default()(headers, {
                  'Browser-Cookie': TCBTBAuth
                });
              }
              this.options = {
                headers: headers
              };
              params = options ? merge_default()(this.options, options) : this.options;
              return _context.abrupt("return", fetch(url || this.url, params).then(function (response) {
                return response.json();
              }));
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      return function (_x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }())
  }]);
  return User;
}(CustomFetcher);

;// CONCATENATED MODULE: ./source/bg/migrations.js




var parseVersion = function parseVersion(version) {
  var parsed = '0.0.0.0';
  if (version) {
    parsed = version;
  }
  return parsed;
};
/* harmony default export */ const migrations = (/*#__PURE__*/(function () {
  var _ref = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee(app) {
    var beforeVersion, newVersion, oldVersion;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getStorageData('version');
        case 2:
          beforeVersion = _context.sent;
          newVersion = parseVersion(VERSION);
          oldVersion = parseVersion(beforeVersion.version);
          if (!(newVersion === oldVersion)) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return");
        case 7:
          if (oldVersion < '6.1.0.0') {
            setStorageData({
              recentStores: []
            });
            setStorageData({
              'merchants.data': []
            });
            setStorageData({
              'merchants.lastUpdate': ''
            });
            setStorageData({
              'merchants.modified': {}
            });
            setStorageData({
              lastModifiedMerchants: ''
            });
            app.updateUserAndMerchants();
          }
          setStorageData({
            version: newVersion
          });
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());
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
;// CONCATENATED MODULE: ./source/bg/app.js














/* eslint-disable object-curly-newline */
function app_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = app_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function app_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return app_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return app_arrayLikeToArray(o, minLen); }
function app_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function app_createSuper(Derived) { var hasNativeReflectConstruct = app_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,getPrototypeOf/* default */.Z)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,getPrototypeOf/* default */.Z)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,possibleConstructorReturn/* default */.Z)(this, result); }; }
function app_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
// eslint-disable-next-line import/no-extraneous-dependencies


// eslint-disable-next-line import/no-extraneous-dependencies

















/* eslint class-methods-use-this:
["error", { "exceptMethods": [
  "checkUserLogin", "getCurrentMerchant", "getTopOffers", "navigate"
] }] */

// eslint-disable-next-line no-underscore-dangle
if (rollbar_ROLLBAR_ACTIVE) {
  rollbar_umd_min_default().init(rollbarConfig(ROLLBAR_KEY_BG, 'bg'));
}
var App = /*#__PURE__*/function (_Cashback) {
  (0,inherits/* default */.Z)(App, _Cashback);
  var _super = app_createSuper(App);
  function App() {
    var _this;
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0,classCallCheck/* default */.Z)(this, App);
    _this = _super.call(this, args);
    (0,defineProperty/* default */.Z)((0,assertThisInitialized/* default */.Z)(_this), "handleEbayTabs", function () {
      _this.ebayCounter = 2;
      chrome.tabs.onRemoved.addListener(function () {
        chrome.tabs.query({}, function (tabs) {
          var result = tabs.find(function (tab) {
            return _this.merchants.getByUrl(tab.url);
          });
          if (!result) {
            _this.ebayCounter = 2;
          }
        });
      });
    });
    _this.deviceModel = '';
    _this.device = '';
    _this.iconType = '';
    _this.loadStorageVariables();
    _this.homepage = {};
    _this.settings = new Settings();
    _this.merchants = new Merchants();
    _this.configs = new Configs();
    _this.flagRedirect = new Redirect();
    _this.user = new User();
    _this.lastModifiedTopOffers = '';
    _this.loadTopOffers();
    _this.resetTimers = {};
    _this.secondNotifierTimer = DELAY_SECOND_NOTIFIER_TIMESTAMP;
    _this.analytics = new SmartAnalytics({
      getSettings: _this.settings.getSettings,
      setSettings: _this.settings.setSettings
    });
    if (SLEEK_ACTIVE) {
      (0,dist/* initializeSleekSdk */.qA)('4390910ebc51724bfc30630f06f9a1024f714719f9391b15', {
        enableDebug: false,
        disableLogs: true,
        addedAnalyticsProperties: {
          geography: REGION.toUpperCase()
        }
      });
    }
    _this.merchants.analytics = _this.analytics;
    _this.updateUserAndMerchants();
    _this.configs.update();
    _this.flagRedirect.update();
    _this.setEventListeners();
    _this.setMessagesListener();
    _this.setEventListenersServiceWorker();
    _this.broadcastChannel = brodcastChannel;
    _this.setEventListenersBroadcastChannel();
    // can be mac ipad iphone
    _this.handleEbayTabs();
    chrome.action.setBadgeBackgroundColor({
      color: '#ED1C5C'
    });
    _this.setContentStyles();
    _this.icon = new Icon();
    _this.canInitContentSafari = false;
    _this.loadSecondNotifierTimer();
    return _this;
  }
  (0,createClass/* default */.Z)(App, [{
    key: "loadSecondNotifierTimer",
    value: function () {
      var _loadSecondNotifierTimer = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var _yield$getStorageData, secondNotifierTimer, zeroOrOne;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(BROWSER === 'chrome' && (REGION === 'us' || REGION === 'uk'))) {
                _context.next = 15;
                break;
              }
              _context.next = 3;
              return getStorageData('secondNotifierTimer');
            case 3:
              _yield$getStorageData = _context.sent;
              secondNotifierTimer = _yield$getStorageData.secondNotifierTimer;
              if (secondNotifierTimer) {
                _context.next = 14;
                break;
              }
              // secondNotifierTimer isn't set on local storage
              // random 50% chance to be 5 minutes or 10 minutes
              zeroOrOne = Math.floor(Math.random() * 2);
              if (zeroOrOne === 0) {
                secondNotifierTimer = 10 * 60 * 1000;
              } else {
                secondNotifierTimer = 5 * 60 * 1000;
              }
              this.secondNotifierTimer = secondNotifierTimer;
              _context.next = 11;
              return setStorageData({
                secondNotifierTimer: secondNotifierTimer
              });
            case 11:
              this.sendAnalytics({
                data: {
                  ec: 'Extension',
                  ea: 'RegisterTimer'
                }
              });
              _context.next = 15;
              break;
            case 14:
              this.secondNotifierTimer = secondNotifierTimer;
            case 15:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function loadSecondNotifierTimer() {
        return _loadSecondNotifierTimer.apply(this, arguments);
      }
      return loadSecondNotifierTimer;
    }()
  }, {
    key: "loadStorageVariables",
    value: function () {
      var _loadStorageVariables = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee2() {
        var _this2 = this;
        var _yield$getStorageData2, iconType, _yield$getStorageData3, device, _yield$getStorageData4, deviceModel, settings;
        return regenerator_default().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return getStorageData('iconType');
            case 2:
              _yield$getStorageData2 = _context2.sent;
              iconType = _yield$getStorageData2.iconType;
              this.iconType = iconType;
              _context2.next = 7;
              return getStorageData('device');
            case 7:
              _yield$getStorageData3 = _context2.sent;
              device = _yield$getStorageData3.device;
              this.device = device;
              _context2.next = 12;
              return getStorageData('deviceModel');
            case 12:
              _yield$getStorageData4 = _context2.sent;
              deviceModel = _yield$getStorageData4.deviceModel;
              this.deviceModel = deviceModel;
              _context2.next = 17;
              return this.settings.getSettings();
            case 17:
              settings = _context2.sent;
              // if load properly device value
              if (this.device !== 'mobile' && this.device !== 'desktop' && this.deviceModel !== 'iphone' && this.deviceModel !== 'ipad' && this.deviceModel !== 'mac') {
                if (BROWSER === 'safari') {
                  browser.runtime.sendNativeMessage('application.id', {
                    message: 'device',
                    client_id: settings.analyticsClientId
                  }, function (response) {
                    // check if message came from the right place
                    if (response.response.message === 'device') {
                      _this2.deviceModel = response.deviceModel;
                      _this2.device = response.result;
                      setStorageData({
                        device: response.result
                      });
                      setStorageData({
                        deviceModel: response.deviceModel
                      });
                    } else {
                      _this2.device = 'desktop';
                      _this2.deviceModel = 'mac';
                      setStorageData({
                        device: 'desktop'
                      });
                      setStorageData({
                        deviceModel: 'mac'
                      });
                    }
                  });
                } else {
                  this.device = 'desktop';
                  setStorageData({
                    device: 'desktop'
                  });
                  this.deviceModel = 'mac';
                  setStorageData({
                    deviceModel: 'mac'
                  });
                }
              }

              // send information to ios about permissions enabled or not
              if (BROWSER === 'safari' && this.device === 'mobile') {
                chrome.permissions.getAll().then(function (result) {
                  var permissions = result.origins.includes('*://*/*');
                  if (permissions) {
                    chrome.runtime.sendNativeMessage('application.id', {
                      message: 'permissions_enabled',
                      client_id: settings.analyticsClientId
                    });
                  } else {
                    chrome.runtime.sendNativeMessage('application.id', {
                      message: 'reset',
                      client_id: settings.analyticsClientId
                    });
                  }
                });
              }
            case 20:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function loadStorageVariables() {
        return _loadStorageVariables.apply(this, arguments);
      }
      return loadStorageVariables;
    }()
  }, {
    key: "loadTopOffers",
    value: function () {
      var _loadTopOffers = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee3() {
        var _yield$getStorageData5, homepage;
        return regenerator_default().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return getStorageData('lastModifiedTopOffers');
            case 2:
              this.lastModifiedTopOffers = _context3.sent;
              _context3.next = 5;
              return getStorageData('homepage');
            case 5:
              _yield$getStorageData5 = _context3.sent;
              homepage = _yield$getStorageData5.homepage;
              merge_default()(this.homepage, homepage);
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function loadTopOffers() {
        return _loadTopOffers.apply(this, arguments);
      }
      return loadTopOffers;
    }() // eslint-disable-next-line class-methods-use-this
  }, {
    key: "setEventListenersServiceWorker",
    value: function setEventListenersServiceWorker() {
      var _this3 = this;
      // eslint-disable-next-line no-restricted-globals
      self.addEventListener('message', /*#__PURE__*/function () {
        var _ref = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee4(event) {
          var dataGA;
          return regenerator_default().wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
              case 0:
                if (event.data && event.data.type === 'analytics') {
                  dataGA = event.data.dataGA;
                  _this3.analytics.send(dataGA);
                } else if (event.data && event.data.type === 'activate') {
                  _this3.activate({
                    data: event.data.dataActivate,
                    sender: event.data.sender,
                    device: _this3.device
                  });
                } else if (event.data && event.data.type === 'applyCoupons') {
                  _this3.applyCoupons({
                    sender: event.data.sender
                  });
                } else if (event.data && event.data.type === 'stopCoupons') {
                  _this3.stopCoupons({
                    sender: event.data.sender
                  });
                }
              case 1:
              case "end":
                return _context4.stop();
            }
          }, _callee4);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "setEventListenersBroadcastChannel",
    value: function setEventListenersBroadcastChannel() {
      var _this4 = this;
      // eslint-disable-next-line no-restricted-globals
      this.broadcastChannel.onmessage = /*#__PURE__*/function () {
        var _ref2 = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee5(event) {
          var dataGA;
          return regenerator_default().wrap(function _callee5$(_context5) {
            while (1) switch (_context5.prev = _context5.next) {
              case 0:
                if (event.data && event.data.type === 'analytics') {
                  dataGA = event.data.dataGA;
                  _this4.analytics.send(dataGA);
                } else if (event.data && event.data.type === 'activate') {
                  _this4.activate({
                    data: event.data.dataActivate,
                    sender: event.data.sender,
                    device: _this4.device
                  });
                } else if (event.data && event.data.type === 'applyCoupons') {
                  _this4.applyCoupons({
                    sender: event.data.sender
                  });
                } else if (event.data && event.data.type === 'stopCoupons') {
                  _this4.stopCoupons({
                    sender: event.data.sender
                  });
                }
              case 1:
              case "end":
                return _context5.stop();
            }
          }, _callee5);
        }));
        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }();
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "applyCoupons",
    value: function () {
      var _applyCoupons = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee6(_ref3) {
        var sender;
        return regenerator_default().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              sender = _ref3.sender;
              if (!SLEEK_ACTIVE) {
                _context6.next = 5;
                break;
              }
              _context6.next = 4;
              return setStorageData({
                sleekPreviousCoupon: {}
              });
            case 4:
              (0,dist/* getSdkInstance */.Xp)().fillCouponsOnTab(sender.tab.id);
            case 5:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function applyCoupons(_x3) {
        return _applyCoupons.apply(this, arguments);
      }
      return applyCoupons;
    }() // eslint-disable-next-line class-methods-use-this
  }, {
    key: "stopCoupons",
    value: function () {
      var _stopCoupons = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee7(_ref4) {
        var sender;
        return regenerator_default().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              sender = _ref4.sender;
              if (!SLEEK_ACTIVE) {
                _context7.next = 5;
                break;
              }
              _context7.next = 4;
              return setStorageData({
                sleekPreviousCoupon: {}
              });
            case 4:
              (0,dist/* getSdkInstance */.Xp)().cancelCouponsOnTab(sender.tab.id);
            case 5:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function stopCoupons(_x4) {
        return _stopCoupons.apply(this, arguments);
      }
      return stopCoupons;
    }()
  }, {
    key: "installRedirect",
    value: function () {
      var _installRedirect = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee8() {
        var redirect,
          settings,
          url,
          tab,
          _args8 = arguments;
        return regenerator_default().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              redirect = _args8.length > 0 && _args8[0] !== undefined ? _args8[0] : false;
              _context8.next = 3;
              return this.settings.getSettings();
            case 3:
              settings = _context8.sent;
              url = "".concat(AFTER_INSTALL_URL, "&fingerprint=").concat(settings.analyticsClientId, "&version=").concat(VERSION);
              if (this.device === 'mobile') {
                url = "".concat(AFTER_INSTALL_URL_MOBILE, "&fingerprint=").concat(settings.analyticsClientId, "&version=").concat(VERSION);
              }
              if (BROWSER === 'safari') {
                browser.runtime.sendNativeMessage('application.id', {
                  message: 'installed',
                  client_id: settings.analyticsClientId
                });
              }
              if (!redirect) {
                _context8.next = 14;
                break;
              }
              _context8.next = 10;
              return getActiveTab();
            case 10:
              tab = _context8.sent;
              chrome.tabs.update(tab.id, {
                url: url
              });
              _context8.next = 15;
              break;
            case 14:
              chrome.tabs.create({
                url: url
              });
            case 15:
              this.analytics.send({
                ec: 'Extension',
                ea: 'Install'
              });
            case 16:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function installRedirect() {
        return _installRedirect.apply(this, arguments);
      }
      return installRedirect;
    }() // when this function is called this refers to serviceWorker this.app refers this class/file
  }, {
    key: "handleAdded",
    value: function () {
      var _handleAdded = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee9(permissions) {
        var hasPermissions, settings;
        return regenerator_default().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              // check permissions browser.permissions.getAll() -> promise -> origins must be "*://*/*"
              hasPermissions = permissions.origins.includes('*://*/*');
              _context9.next = 3;
              return this.app.settings.getSettings();
            case 3:
              settings = _context9.sent;
              if (hasPermissions) {
                this.app.installRedirect(true);
                chrome.permissions.onAdded.removeListener(this.app.handleAdded);
                // communicate with web extension handler
                browser.runtime.sendNativeMessage('application.id', {
                  message: 'permissions_enabled',
                  client_id: settings.analyticsClientId
                }, function (response) {
                  consoleLog('Received sendNativeMessage response:');
                  consoleLog(response);
                });
              }
            case 5:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function handleAdded(_x5) {
        return _handleAdded.apply(this, arguments);
      }
      return handleAdded;
    }()
  }, {
    key: "checkPermissions",
    value: function () {
      var _checkPermissions = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee10(url) {
        var settings, _yield$chrome$permiss, origins, originsHasPermissions, tab, urlInstall;
        return regenerator_default().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return this.settings.getSettings();
            case 2:
              settings = _context10.sent;
              if (!(new RegExp(HOME_PAGE).test(url) || url === '')) {
                _context10.next = 18;
                break;
              }
              _context10.next = 6;
              return chrome.permissions.getAll();
            case 6:
              _yield$chrome$permiss = _context10.sent;
              origins = _yield$chrome$permiss.origins;
              originsHasPermissions = origins.includes('*://*/*');
              if (!originsHasPermissions) {
                chrome.runtime.sendNativeMessage('application.id', {
                  message: 'reset',
                  client_id: settings.analyticsClientId
                });
              }
              if (!(new RegExp(PERMISSIONS).test(url) || new RegExp(PERMISSIONS_MOBILE).test(url))) {
                _context10.next = 18;
                break;
              }
              if (!originsHasPermissions) {
                _context10.next = 18;
                break;
              }
              chrome.runtime.sendNativeMessage('application.id', {
                message: 'permissions_enabled',
                client_id: settings.analyticsClientId
              });
              _context10.next = 15;
              return getActiveTab();
            case 15:
              tab = _context10.sent;
              urlInstall = "".concat(AFTER_INSTALL_URL_MOBILE, "&fingerprint=").concat(settings.analyticsClientId, "&version=").concat(VERSION);
              chrome.tabs.update(tab.id, {
                url: urlInstall
              });
            case 18:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function checkPermissions(_x6) {
        return _checkPermissions.apply(this, arguments);
      }
      return checkPermissions;
    }()
  }, {
    key: "couponProvider",
    value: function couponProvider(website) {
      var merchant = this.merchants.getByUrl(website);
      try {
        var coupons = uniqBy_default()(filter_default()(merchant.offers, function (_ref5) {
          var code = _ref5.code;
          return code && !NO_CODE_PATTERNS.find(function (pattern) {
            return code.includes(pattern);
          });
        }), 'code');
        return coupons.map(function (offer) {
          return {
            id: offer.activationUrl,
            code: offer.code
          };
        });
      } catch (error) {
        consoleLog('SLEEK COUPON ERROR', error);
        return [];
      }
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this5 = this;
      chrome.runtime.onStartup.addListener( /*#__PURE__*/(0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee11() {
        return regenerator_default().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _this5.merchants.resetStates();
            case 2:
              _this5.resetSuprressionActivation();
              chrome.alarms.getAll(function (alarms) {
                alarms.forEach(function (alarm) {
                  if (alarm.name.startsWith('suppressions_') || alarm.name.startsWith('resetTimers_') || alarm.name.startsWith('activations_')) {
                    chrome.alarms.clear(alarm.name);
                  }
                });
              });
            case 4:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      })));
      chrome.runtime.onInstalled.addListener( /*#__PURE__*/function () {
        var _ref8 = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee12(_ref7) {
          var reason, _yield$chrome$permiss2, origins, originsHasPermissions, beforeVersion, settings;
          return regenerator_default().wrap(function _callee12$(_context12) {
            while (1) switch (_context12.prev = _context12.next) {
              case 0:
                reason = _ref7.reason;
                if (_this5.analytics.isReady) {
                  _context12.next = 4;
                  break;
                }
                _context12.next = 4;
                return _this5.analytics.init();
              case 4:
                if (!(reason === 'install')) {
                  _context12.next = 25;
                  break;
                }
                if (!(BROWSER !== 'safari')) {
                  _context12.next = 9;
                  break;
                }
                _this5.installRedirect(false);
                _context12.next = 19;
                break;
              case 9:
                if (!(BROWSER === 'safari')) {
                  _context12.next = 19;
                  break;
                }
                if (!(_this5.deviceModel === '')) {
                  _context12.next = 13;
                  break;
                }
                _context12.next = 13;
                return _this5.loadStorageVariables();
              case 13:
                _context12.next = 15;
                return chrome.permissions.getAll();
              case 15:
                _yield$chrome$permiss2 = _context12.sent;
                origins = _yield$chrome$permiss2.origins;
                originsHasPermissions = origins.includes('*://*/*');
                if (originsHasPermissions) {
                  _this5.installRedirect(false);
                } else {
                  if (_this5.deviceModel === 'iphone') {
                    chrome.tabs.create({
                      url: "".concat(PERMISSIONS_MOBILE)
                    });
                  } else {
                    chrome.tabs.create({
                      url: "".concat(PERMISSIONS)
                    });
                  }
                  chrome.permissions.onAdded.addListener(_this5.handleAdded);
                }
              case 19:
                _context12.next = 21;
                return getStorageData('version');
              case 21:
                beforeVersion = _context12.sent;
                if (!beforeVersion.version) {
                  setStorageData({
                    version: VERSION
                  });
                }
                _context12.next = 26;
                break;
              case 25:
                if (reason === 'update') {
                  migrations(_this5);
                }
              case 26:
                _context12.next = 28;
                return _this5.settings.getSettings();
              case 28:
                settings = _context12.sent;
                chrome.runtime.setUninstallURL("".concat(AFTER_UNINSTALL_URL, "?fingerprint=").concat(settings.analyticsClientId, "&version=").concat(VERSION));
              case 30:
              case "end":
                return _context12.stop();
            }
          }, _callee12);
        }));
        return function (_x7) {
          return _ref8.apply(this, arguments);
        };
      }());
      if (BROWSER === 'chrome') {
        chrome.webRequest.onBeforeRequest.addListener(function (details) {
          if (details.frameId === 0 && details.url) {
            _this5.check(details);
          }
        }, {
          urls: ['<all_urls>'],
          types: ['main_frame']
        });
      }
      chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, _ref9) {
        var url = _ref9.url;
        chrome.tabs.get(tabId, function () {
          if (chrome.runtime.lastError) {
            return;
          }
          sendBackgroundMessage(tabId, {
            action: 'BG_URL',
            data: {
              url: url
            }
          });
          _this5.check({
            url: url,
            tabId: tabId
          });
          if (changeInfo.status === 'loading') {
            if (BROWSER === 'safari') {
              _this5.canInitContentSafari = false;
            }
            _this5.checkMerchantStatus({
              url: url,
              tabId: tabId,
              userBacs: _this5.user.data && _this5.user.data.hasBacs,
              checkActivation: false
            });
          } else if (changeInfo.status === 'complete') {
            if (BROWSER === 'safari') {
              if (_this5.device === 'mobile') {
                _this5.checkPermissions(url);
              }
              _this5.checkMerchantStatus({
                url: url,
                tabId: tabId,
                userBacs: _this5.user.data && _this5.user.data.hasBacs,
                checkActivation: true
              });
              _this5.canInitContentSafari = true;
            } else {
              _this5.checkMerchantStatus({
                url: url,
                tabId: tabId,
                userBacs: _this5.user.data && _this5.user.data.hasBacs,
                checkActivation: true
              });
            }
            if (url.includes(JOIN_PAGE_URL)) {
              updateTab(tabId, {
                active: true
              });
            }
            _this5.checkDeeplink({
              url: url,
              tabId: tabId
            });
            _this5.checkRecentStore(url);
            _this5.updateBacs(url);
          }
          _this5.updateIcon(tabId);
        });
      });
      chrome.tabs.onActivated.addListener(function (_ref10) {
        var tabId = _ref10.tabId;
        return _this5.updateIcon(tabId);
      });
      chrome.action.onClicked.addListener(function (tab) {
        return _this5.iconClicked(tab);
      });

      // using web navigation instead of webrequest to maintain compatibility with safari
      // TODO: future improvement is to change every webRequest to webNavigation
      chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
        if (details.url !== 'about:blank') {
          _this5.check({
            url: details.url,
            tabId: details.tabId
          });
        }
      });
      if (SLEEK_ACTIVE) {
        (0,dist/* getSdkInstance */.Xp)().registerCouponProvider(function (website) {
          return _this5.couponProvider(website);
        });
        (0,dist/* getSdkInstance */.Xp)().registerEventListener( /*#__PURE__*/function () {
          var _ref11 = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee13(event, tabId, tabDetails) {
            var _event$data;
            var previousCoupon, _event$data2, merchant, _event$data$bestCoupo, _event$data$coupon;
            return regenerator_default().wrap(function _callee13$(_context13) {
              while (1) switch (_context13.prev = _context13.next) {
                case 0:
                  _context13.next = 2;
                  return getStorageData('sleekPreviousCoupon');
                case 2:
                  previousCoupon = _context13.sent;
                  if (!(event.type === dist/* EventType */.tw.COUPON_SESSION_STARTED || event.type === dist/* EventType */.tw.COUPON_SESSION_COMPLETED)) {
                    _context13.next = 9;
                    break;
                  }
                  _context13.next = 6;
                  return setStorageData({
                    sleekPreviousCoupon: {}
                  });
                case 6:
                  previousCoupon = {};
                  _context13.next = 12;
                  break;
                case 9:
                  if (!((_event$data = event.data) !== null && _event$data !== void 0 && _event$data.coupon)) {
                    _context13.next = 12;
                    break;
                  }
                  _context13.next = 12;
                  return setStorageData({
                    sleekPreviousCoupon: event.data
                  });
                case 12:
                  _context13.prev = 12;
                  if (!((_event$data2 = event.data) !== null && _event$data2 !== void 0 && _event$data2.cartTotalBefore)) {
                    _context13.next = 16;
                    break;
                  }
                  _context13.next = 16;
                  return setStorageData({
                    sleekInfo: {
                      sessionId: event.data.sessionId,
                      cartTotalBefore: event.data.cartTotalBefore
                    }
                  });
                case 16:
                  merchant = _this5.merchants.getByUrl(tabDetails.url);
                  _this5.analytics.send({
                    ec: 'Sleek Events',
                    ea: event.type,
                    el: merchant.name
                  });
                  if (event.type === dist/* EventType */.tw.COUPON_ENTRY_COMPLETED || event.type === dist/* EventType */.tw.COUPON_ENTRY_FAILED || event.type === dist/* EventType */.tw.COUPON_SESSION_COMPLETED) {
                    _this5.analytics.sendSelectPromotion(event.type, merchant.name, event.type === dist/* EventType */.tw.COUPON_SESSION_COMPLETED ? (_event$data$bestCoupo = event.data.bestCoupon) === null || _event$data$bestCoupo === void 0 ? void 0 : _event$data$bestCoupo.code : (_event$data$coupon = event.data.coupon) === null || _event$data$coupon === void 0 ? void 0 : _event$data$coupon.code, event.data.sessionId, event.data.cartTotalBefore, event.data.cartTotalAfter);
                  }
                  _context13.next = 24;
                  break;
                case 21:
                  _context13.prev = 21;
                  _context13.t0 = _context13["catch"](12);
                  consoleLog('SLEEK ERROR', _context13.t0);
                case 24:
                  consoleLog('SLEEK', event);
                  sendBackgroundMessage(tabId, {
                    action: "SLEEK_".concat(event.type),
                    data: {
                      current: event.data,
                      currentTabDetails: tabDetails,
                      previousCoupon: previousCoupon.sleekPreviousCoupon
                    }
                  });
                case 26:
                case "end":
                  return _context13.stop();
              }
            }, _callee13, null, [[12, 21]]);
          }));
          return function (_x8, _x9, _x10) {
            return _ref11.apply(this, arguments);
          };
        }());
      }
    }

    // maybe join this 2 function for content styles instead of storing data on app variable
  }, {
    key: "setContentStyles",
    value: function () {
      var _setContentStyles = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee14() {
        var req, styles;
        return regenerator_default().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              _context14.next = 3;
              return fetch(chrome.runtime.getURL('content/styles.css'));
            case 3:
              req = _context14.sent;
              _context14.next = 6;
              return req.text();
            case 6:
              styles = _context14.sent;
              this.contentStyles = styles;
              _context14.next = 13;
              break;
            case 10:
              _context14.prev = 10;
              _context14.t0 = _context14["catch"](0);
              rollbarCaptureError(_context14.t0, 'error_setContentStyles');
            case 13:
            case "end":
              return _context14.stop();
          }
        }, _callee14, this, [[0, 10]]);
      }));
      function setContentStyles() {
        return _setContentStyles.apply(this, arguments);
      }
      return setContentStyles;
    }()
  }, {
    key: "getContentStyles",
    value: function () {
      var _getContentStyles = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee15(_ref12) {
        var sendResponse;
        return regenerator_default().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              sendResponse = _ref12.sendResponse;
              sendResponse(this.contentStyles);
            case 2:
            case "end":
              return _context15.stop();
          }
        }, _callee15, this);
      }));
      function getContentStyles(_x11) {
        return _getContentStyles.apply(this, arguments);
      }
      return getContentStyles;
    }()
  }, {
    key: "setMessagesListener",
    value: function setMessagesListener() {
      var _this6 = this;
      chrome.runtime.onMessage.addListener(function (_ref13, sender, sendResponse) {
        var module = _ref13.module,
          action = _ref13.action,
          data = _ref13.data,
          device = _ref13.device;
        var executor = module ? _this6[module] : _this6;
        if (executor && typeof executor[action] === 'function') {
          executor[action].call(executor, {
            data: data,
            sender: sender,
            device: device,
            sendResponse: sendResponse
          });
        } else {
          sendResponse(null);
        }
        return true;
      });
    }

    // Only being called on FF
  }, {
    key: "toggleGa",
    value: function toggleGa(_ref14) {
      var data = _ref14.data,
        sendResponse = _ref14.sendResponse;
      var isEnabled = data.isEnabled;
      this.settings.setSettings({
        isAnalyticsEnabled: isEnabled
      });
      if (this.settings.data.isAnalyticsEnabled) {
        this.sendAnalytics({
          data: {
            ec: 'Extension',
            ea: 'Install'
          }
        });
      }
      sendResponse(null);
    }
  }, {
    key: "updateUserAndMerchants",
    value: function () {
      var _updateUserAndMerchants = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee16() {
        return regenerator_default().wrap(function _callee16$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              if (this.analytics.isReady) {
                _context16.next = 3;
                break;
              }
              _context16.next = 3;
              return this.analytics.init();
            case 3:
              _context16.next = 5;
              return this.user.update();
            case 5:
              this.merchants.update();
            case 6:
            case "end":
              return _context16.stop();
          }
        }, _callee16, this);
      }));
      function updateUserAndMerchants() {
        return _updateUserAndMerchants.apply(this, arguments);
      }
      return updateUserAndMerchants;
    }()
  }, {
    key: "updateBacs",
    value: function updateBacs(url) {
      if (url.includes(PAYMENT_DETAILS_URL)) this.user.update(true);
    }
  }, {
    key: "hideGaPopup",
    value: function hideGaPopup(_ref15) {
      var sendResponse = _ref15.sendResponse;
      this.settings.setSettings({
        showGa: false
      });
      sendResponse(null);
    }
  }, {
    key: "sendAnalytics",
    value: function sendAnalytics(_ref16) {
      var data = _ref16.data,
        sendResponse = _ref16.sendResponse;
      if (this.settings.data.isAnalyticsEnabled) {
        this.analytics.send(data);
      }
      // this is needed because when we call this function inside the service_worker context we won't have the sendResponse obj
      if (sendResponse) {
        sendResponse(null);
      }
    }
  }, {
    key: "sendCaaAnalytics",
    value: function sendCaaAnalytics(_ref17) {
      var data = _ref17.data,
        sendResponse = _ref17.sendResponse;
      if (this.settings.data.isAnalyticsEnabled) {
        this.analytics.send(data.ga);
        if (data.caaAnalytics) {
          fetch(CAA_ANALYTICS_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.caaAnalytics)
          })["catch"](function () {});
        }
      }
      sendResponse(null);
    }

    // eslint-disable-next-line consistent-return
  }, {
    key: "updateIcon",
    value: function () {
      var _updateIcon = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee17(tabId) {
        var _this7 = this;
        var _ref18, id, url, _yield$this$merchants, merchant, state, canShowOnTab, wasActivatedBefore, canShowBadgeText, type;
        return regenerator_default().wrap(function _callee17$(_context17) {
          while (1) switch (_context17.prev = _context17.next) {
            case 0:
              _context17.prev = 0;
              _context17.next = 3;
              return getActiveTab();
            case 3:
              _context17.t0 = _context17.sent;
              if (_context17.t0) {
                _context17.next = 6;
                break;
              }
              _context17.t0 = {};
            case 6:
              _ref18 = _context17.t0;
              id = _ref18.id;
              url = _ref18.url;
              if (!(isNumber_default()(tabId) && id !== tabId)) {
                _context17.next = 11;
                break;
              }
              return _context17.abrupt("return", false);
            case 11:
              _context17.next = 13;
              return this.merchants.getMerchantAndState({
                url: url
              });
            case 13:
              _yield$this$merchants = _context17.sent;
              merchant = _yield$this$merchants.merchant;
              state = _yield$this$merchants.state;
              canShowOnTab = state && state.competitorActivationTab ? !state.competitorActivationTab.includes(tabId) : true;
              wasActivatedBefore = state && state.topcashbackActivationTab ? state.topcashbackActivationTab.includes(tabId) : false;
              canShowBadgeText = state && state.showReactivation && (canShowOnTab || wasActivatedBefore);
              chrome.action.setBadgeText({
                text: state && (!state.suppressed || canShowBadgeText || !!state.activated) ? "".concat(merchant.offers_length) : ''
              });
              type = findKey_default()({
                activatedMerchant: state && state.activated,
                merchant: state,
                nonMerchant: !state
              }, function (validType) {
                return validType;
              });
              if (!(type === this.iconType)) {
                _context17.next = 23;
                break;
              }
              return _context17.abrupt("return", false);
            case 23:
              this.iconType = type;
              _context17.next = 26;
              return setStorageData({
                iconType: this.iconType
              });
            case 26:
              return _context17.abrupt("return", this.icon[type]());
            case 29:
              _context17.prev = 29;
              _context17.t1 = _context17["catch"](0);
              setTimeout(function () {
                _this7.updateIcon(tabId);
              }, 100);
            case 32:
            case "end":
              return _context17.stop();
          }
        }, _callee17, this, [[0, 29]]);
      }));
      function updateIcon(_x12) {
        return _updateIcon.apply(this, arguments);
      }
      return updateIcon;
    }()
  }, {
    key: "updateMerchantState",
    value: function updateMerchantState(_ref19) {
      var data = _ref19.data,
        _ref19$sender = _ref19.sender,
        sender = _ref19$sender === void 0 ? {} : _ref19$sender,
        sendResponse = _ref19.sendResponse;
      this.merchants.setState({
        url: sender.url,
        id: data.id,
        data: data.state
      });
      if (data.reset === true) {
        // this should only be triggered for notification dismissal right now
        chrome.alarms.create("resetTimers_".concat(data.id), {
          delayInMinutes: 30
        });
      }
      this.updateIcon();
      sendResponse(null);
    }
  }, {
    key: "checkRecentStore",
    value: function () {
      var _checkRecentStore = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee18(url) {
        var merchant, _yield$getStorageData6, _yield$getStorageData7, recentStores, findById, index;
        return regenerator_default().wrap(function _callee18$(_context18) {
          while (1) switch (_context18.prev = _context18.next) {
            case 0:
              merchant = this.merchants.getBy('url', url);
              if (!merchant) {
                _context18.next = 14;
                break;
              }
              _context18.next = 4;
              return getStorageData('recentStores');
            case 4:
              _yield$getStorageData6 = _context18.sent;
              _yield$getStorageData7 = _yield$getStorageData6.recentStores;
              recentStores = _yield$getStorageData7 === void 0 ? [] : _yield$getStorageData7;
              findById = function findById(element) {
                return element.id === merchant.id;
              };
              index = recentStores.findIndex(findById);
              if (index > -1) {
                recentStores.splice(index, 1);
              }
              recentStores.unshift({
                id: merchant.id,
                logo: merchant.logo
              });
              recentStores.slice(0, 50);
              _context18.next = 14;
              return setStorageData({
                recentStores: recentStores
              });
            case 14:
              return _context18.abrupt("return", false);
            case 15:
            case "end":
              return _context18.stop();
          }
        }, _callee18, this);
      }));
      function checkRecentStore(_x13) {
        return _checkRecentStore.apply(this, arguments);
      }
      return checkRecentStore;
    }()
  }, {
    key: "getCurrentMerchant",
    value: function () {
      var _getCurrentMerchant = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee19() {
        var _yield$getActiveTab, url, _yield$this$merchants2, merchant, state;
        return regenerator_default().wrap(function _callee19$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return getActiveTab();
            case 2:
              _yield$getActiveTab = _context19.sent;
              url = _yield$getActiveTab.url;
              _context19.next = 6;
              return this.merchants.getMerchantAndState({
                url: url
              });
            case 6:
              _yield$this$merchants2 = _context19.sent;
              merchant = _yield$this$merchants2.merchant;
              state = _yield$this$merchants2.state;
              return _context19.abrupt("return", merchant ? merge_default()({}, state, merchant) : null);
            case 10:
            case "end":
              return _context19.stop();
          }
        }, _callee19, this);
      }));
      function getCurrentMerchant() {
        return _getCurrentMerchant.apply(this, arguments);
      }
      return getCurrentMerchant;
    }() // called by serp
  }, {
    key: "getMerchant",
    value: function () {
      var _getMerchant = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee20(_ref20) {
        var data, sendResponse, _yield$this$merchants3, merchant, state, secondaryUrlData;
        return regenerator_default().wrap(function _callee20$(_context20) {
          while (1) switch (_context20.prev = _context20.next) {
            case 0:
              data = _ref20.data, sendResponse = _ref20.sendResponse;
              _context20.next = 3;
              return this.merchants.getMerchantAndState({
                url: data.url,
                updateSingleMerchant: false
              });
            case 3:
              _yield$this$merchants3 = _context20.sent;
              merchant = _yield$this$merchants3.merchant;
              state = _yield$this$merchants3.state;
              if (!(data.secondary_url && data.secondary_url !== '' && !merchant)) {
                _context20.next = 12;
                break;
              }
              _context20.next = 9;
              return this.merchants.getMerchantAndState({
                url: data.secondary_url,
                updateSingleMerchant: false
              });
            case 9:
              secondaryUrlData = _context20.sent;
              merchant = secondaryUrlData.merchant;
              state = secondaryUrlData.state;
            case 12:
              sendResponse(merchant ? merge_default()({}, merchant, state) : null);
            case 13:
            case "end":
              return _context20.stop();
          }
        }, _callee20, this);
      }));
      function getMerchant(_x14) {
        return _getMerchant.apply(this, arguments);
      }
      return getMerchant;
    }()
  }, {
    key: "initContent",
    value: function () {
      var _initContent = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee21(_ref21) {
        var _sender$tab;
        var sender, sendResponse, url, _yield$getStorageData8, _yield$getStorageData9, mutedMerchants, isLogged, showGa, index, _yield$this$merchants4, merchant, state, isEbay, _yield$getStorageData10, _yield$getStorageData11, ebayTimestamp, response;
        return regenerator_default().wrap(function _callee21$(_context21) {
          while (1) switch (_context21.prev = _context21.next) {
            case 0:
              sender = _ref21.sender, sendResponse = _ref21.sendResponse;
              url = sender.url;
              _context21.next = 4;
              return getStorageData('mutedMerchants');
            case 4:
              _yield$getStorageData8 = _context21.sent;
              _yield$getStorageData9 = _yield$getStorageData8.mutedMerchants;
              mutedMerchants = _yield$getStorageData9 === void 0 ? [] : _yield$getStorageData9;
              _context21.next = 9;
              return checkUserLogin();
            case 9:
              isLogged = _context21.sent;
              if (!url.includes(HOME_PAGE)) {
                _context21.next = 13;
                break;
              }
              _context21.next = 13;
              return this.updateUserInfo(isLogged);
            case 13:
              showGa = this.settings.data.showGa && !this.settings.data.isAnalyticsEnabled && new RegExp(HOME_PAGE).test(url);
              if (!(BROWSER === 'safari')) {
                _context21.next = 26;
                break;
              }
              index = 0;
            case 16:
              if (!(index < 40)) {
                _context21.next = 26;
                break;
              }
              if (this.canInitContentSafari) {
                _context21.next = 22;
                break;
              }
              _context21.next = 20;
              return new Promise(function (res) {
                setTimeout(function () {
                  return res('waited');
                }, 100);
              });
            case 20:
              _context21.next = 23;
              break;
            case 22:
              return _context21.abrupt("break", 26);
            case 23:
              index += 1;
              _context21.next = 16;
              break;
            case 26:
              _context21.next = 28;
              return this.merchants.getMerchantAndState({
                url: url
              });
            case 28:
              _yield$this$merchants4 = _context21.sent;
              merchant = _yield$this$merchants4.merchant;
              state = _yield$this$merchants4.state;
              isEbay = merchant && merchant.domain === EBAY_URL;
              _context21.next = 34;
              return getStorageData(['ebayTimestamp']);
            case 34:
              _yield$getStorageData10 = _context21.sent;
              _yield$getStorageData11 = _yield$getStorageData10.ebayTimestamp;
              ebayTimestamp = _yield$getStorageData11 === void 0 ? 0 : _yield$getStorageData11;
              if (merchant && merchant.name.includes('eBay')) {
                if (ebayTimestamp < Date.now()) {
                  setStorageData({
                    ebayTimestamp: 0
                  });
                }
              }
              response = {
                settings: this.settings,
                merchant: isEbay ? merge_default()({}, state, merchant, {
                  showEbay: this.ebayCounter > 0
                }) : merge_default()({}, state, merchant),
                user: this.user.data,
                mutedMerchants: mutedMerchants,
                configs: this.configs.data,
                flagRedirect: this.flagRedirect.data,
                isLogged: isLogged,
                showGa: showGa,
                tabId: sender === null || sender === void 0 || (_sender$tab = sender.tab) === null || _sender$tab === void 0 ? void 0 : _sender$tab.id,
                secondNotifierTimer: this.secondNotifierTimer
              };
              sendResponse(response);
              if (isEbay) {
                this.ebayCounter -= 1;
              }
              return _context21.abrupt("return", true);
            case 42:
            case "end":
              return _context21.stop();
          }
        }, _callee21, this);
      }));
      function initContent(_x15) {
        return _initContent.apply(this, arguments);
      }
      return initContent;
    }()
  }, {
    key: "getStorePopupInfo",
    value: function () {
      var _getStorePopupInfo = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee22(_ref22) {
        var _state, _state2;
        var data, sendResponse, user, merchants, index, _yield$this$merchants5, merchant, state, _yield$this$getTopOff, banners, topOffers, _yield$getStorageData12, _yield$getStorageData13, recentStores, validRecentStores, errorParsing, _iterator, _step, _loop, response;
        return regenerator_default().wrap(function _callee22$(_context23) {
          while (1) switch (_context23.prev = _context23.next) {
            case 0:
              data = _ref22.data, sendResponse = _ref22.sendResponse;
              user = this.user.data;
              merchants = null;
              merchants = this.merchants.data;
              index = 0;
            case 5:
              if (!(index < 40)) {
                _context23.next = 17;
                break;
              }
              if (!(!user || !merchants)) {
                _context23.next = 13;
                break;
              }
              if (!user) {
                user = this.user.data;
              }
              if (!merchants) {
                merchants = this.merchants.data;
              }
              // eslint-disable-next-line no-await-in-loop
              _context23.next = 11;
              return new Promise(function (res) {
                setTimeout(function () {
                  return res('waited');
                }, 100);
              });
            case 11:
              _context23.next = 14;
              break;
            case 13:
              return _context23.abrupt("break", 17);
            case 14:
              index += 1;
              _context23.next = 5;
              break;
            case 17:
              _context23.next = 19;
              return this.merchants.getMerchantAndState({
                url: data.url
              });
            case 19:
              _yield$this$merchants5 = _context23.sent;
              merchant = _yield$this$merchants5.merchant;
              state = _yield$this$merchants5.state;
              if ((_state = state) !== null && _state !== void 0 && _state.suppressed && ((_state2 = state) === null || _state2 === void 0 ? void 0 : _state2.suppressedKind) === 'disableSuppression') {
                merchant = null;
                state = null;
              }
              _context23.next = 25;
              return this.getTopOffers();
            case 25:
              _yield$this$getTopOff = _context23.sent;
              banners = _yield$this$getTopOff.banners;
              topOffers = _yield$this$getTopOff.topOffers;
              _context23.next = 30;
              return getStorageData('recentStores');
            case 30:
              _yield$getStorageData12 = _context23.sent;
              _yield$getStorageData13 = _yield$getStorageData12.recentStores;
              recentStores = _yield$getStorageData13 === void 0 ? [] : _yield$getStorageData13;
              if (!(!merchant && this.device === 'desktop' && this.deviceModel !== 'iphone')) {
                _context23.next = 53;
                break;
              }
              validRecentStores = [];
              errorParsing = false; // eslint-disable-next-line no-restricted-syntax, guard-for-in
              _iterator = app_createForOfIteratorHelper(recentStores);
              _context23.prev = 37;
              _loop = /*#__PURE__*/regenerator_default().mark(function _loop() {
                var elem, recentMerchant;
                return regenerator_default().wrap(function _loop$(_context22) {
                  while (1) switch (_context22.prev = _context22.next) {
                    case 0:
                      elem = _step.value;
                      try {
                        recentMerchant = merchants.find(function (el) {
                          return el.id === elem.id;
                        }); // eslint-disable-next-line no-await-in-loop
                        elem.name = recentMerchant.name;
                        elem.reward = recentMerchant.reward;
                        elem.activationUrl = recentMerchant.activationUrl;
                        validRecentStores.push(elem);
                      } catch (error) {
                        errorParsing = true;
                      }
                    case 2:
                    case "end":
                      return _context22.stop();
                  }
                }, _loop);
              });
              _iterator.s();
            case 40:
              if ((_step = _iterator.n()).done) {
                _context23.next = 44;
                break;
              }
              return _context23.delegateYield(_loop(), "t0", 42);
            case 42:
              _context23.next = 40;
              break;
            case 44:
              _context23.next = 49;
              break;
            case 46:
              _context23.prev = 46;
              _context23.t1 = _context23["catch"](37);
              _iterator.e(_context23.t1);
            case 49:
              _context23.prev = 49;
              _iterator.f();
              return _context23.finish(49);
            case 52:
              if (errorParsing) {
                recentStores = validRecentStores;
                setStorageData({
                  recentStores: recentStores
                });
              }
              // update variable after updateSingleMerchant
            case 53:
              response = {
                user: user,
                merchants: merchants,
                banners: banners,
                topOffers: topOffers,
                flagRedirect: this.flagRedirect.data,
                merchant: merchant ? merge_default()({}, state, merchant) : null,
                recentStores: recentStores
              };
              sendResponse(response);
            case 55:
            case "end":
              return _context23.stop();
          }
        }, _callee22, this, [[37, 46, 49, 52]]);
      }));
      function getStorePopupInfo(_x16) {
        return _getStorePopupInfo.apply(this, arguments);
      }
      return getStorePopupInfo;
    }()
  }, {
    key: "getDeviceInfo",
    value: function () {
      var _getDeviceInfo = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee23(_ref23) {
        var sendResponse, response;
        return regenerator_default().wrap(function _callee23$(_context24) {
          while (1) switch (_context24.prev = _context24.next) {
            case 0:
              sendResponse = _ref23.sendResponse;
              if (!(this.device === '' || this.deviceModel === '')) {
                _context24.next = 4;
                break;
              }
              _context24.next = 4;
              return this.loadStorageVariables();
            case 4:
              response = {
                device: this.device,
                deviceModel: this.deviceModel
              };
              sendResponse(response);
            case 6:
            case "end":
              return _context24.stop();
          }
        }, _callee23, this);
      }));
      function getDeviceInfo(_x17) {
        return _getDeviceInfo.apply(this, arguments);
      }
      return getDeviceInfo;
    }()
  }, {
    key: "saveSettings",
    value: function saveSettings(_ref24) {
      var data = _ref24.data,
        sendResponse = _ref24.sendResponse;
      this.settings.setSettings(JSON.parse(JSON.stringify(data.data)));
      sendResponse(null);
    }
  }, {
    key: "updateUserInfo",
    value: function () {
      var _updateUserInfo = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee24(isLogged) {
        var userData;
        return regenerator_default().wrap(function _callee24$(_context25) {
          while (1) switch (_context25.prev = _context25.next) {
            case 0:
              if (!(this.user.data.isLoggedIn === isLogged)) {
                _context25.next = 2;
                break;
              }
              return _context25.abrupt("return");
            case 2:
              this.user.data.isLoggedIn = isLogged;
              _context25.next = 5;
              return this.user.update(true);
            case 5:
              userData = _context25.sent;
              if (userData) {
                _context25.next = 8;
                break;
              }
              return _context25.abrupt("return");
            case 8:
              _context25.next = 10;
              return this.merchants.update(true);
            case 10:
            case "end":
              return _context25.stop();
          }
        }, _callee24, this);
      }));
      function updateUserInfo(_x18) {
        return _updateUserInfo.apply(this, arguments);
      }
      return updateUserInfo;
    }()
  }, {
    key: "navigate",
    value: function () {
      var _navigate = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee25(_ref25) {
        var data, sendResponse, url, isNewTab, tab;
        return regenerator_default().wrap(function _callee25$(_context26) {
          while (1) switch (_context26.prev = _context26.next) {
            case 0:
              data = _ref25.data, sendResponse = _ref25.sendResponse;
              url = data.url, isNewTab = data.isNewTab;
              if (!isNewTab) {
                _context26.next = 6;
                break;
              }
              chrome.tabs.create({
                url: url
              });
              _context26.next = 10;
              break;
            case 6:
              _context26.next = 8;
              return getActiveTab();
            case 8:
              tab = _context26.sent;
              chrome.tabs.update(tab.id, {
                url: url
              });
            case 10:
              sendResponse(null);
            case 11:
            case "end":
              return _context26.stop();
          }
        }, _callee25);
      }));
      function navigate(_x19) {
        return _navigate.apply(this, arguments);
      }
      return navigate;
    }()
  }, {
    key: "getTopOffers",
    value: function () {
      var _getTopOffers = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee26() {
        var now, dateFilter, browser, device, response, _iterator2, _step2, header, data, banners, topOffers;
        return regenerator_default().wrap(function _callee26$(_context27) {
          while (1) switch (_context27.prev = _context27.next) {
            case 0:
              if (!isEmpty_default()(this.homepage)) {
                _context27.next = 3;
                break;
              }
              _context27.next = 3;
              return this.loadTopOffers();
            case 3:
              now = new Date();
              dateFilter = function dateFilter(_ref26) {
                var startDate = _ref26.startDate,
                  endDate = _ref26.endDate;
                return new Date(startDate) < now && now < new Date(endDate);
              };
              browser = getBrowser();
              device = getDevice();
              _context27.next = 9;
              return fetch("".concat(TOP_OFFERS_URL).concat(this.user.data && this.user.data.isPlus ? 'plus' : 'classic'), {
                headers: {
                  'If-Modified-Since': this.lastModifiedTopOffers,
                  'Toolbar-Version': VERSION,
                  'Toolbar-Fingerprint': this.settings.data.analyticsClientId,
                  'Browser-Type': "".concat(browser, "_").concat(device)
                }
              });
            case 9:
              response = _context27.sent;
              // eslint-disable-next-line no-restricted-syntax
              _iterator2 = app_createForOfIteratorHelper(response.headers.entries());
              _context27.prev = 11;
              _iterator2.s();
            case 13:
              if ((_step2 = _iterator2.n()).done) {
                _context27.next = 21;
                break;
              }
              header = _step2.value;
              if (!(header[0] === 'date')) {
                _context27.next = 19;
                break;
              }
              this.lastModifiedTopOffers = header[1];
              setStorageData({
                lastModifiedTopOffers: this.lastModifiedTopOffers
              });
              return _context27.abrupt("break", 21);
            case 19:
              _context27.next = 13;
              break;
            case 21:
              _context27.next = 26;
              break;
            case 23:
              _context27.prev = 23;
              _context27.t0 = _context27["catch"](11);
              _iterator2.e(_context27.t0);
            case 26:
              _context27.prev = 26;
              _iterator2.f();
              return _context27.finish(26);
            case 29:
              if (!(response.status === 304)) {
                _context27.next = 31;
                break;
              }
              return _context27.abrupt("return", this.homepage);
            case 31:
              if (!(!response.ok || response.status !== 200)) {
                _context27.next = 33;
                break;
              }
              return _context27.abrupt("return", this.homepage);
            case 33:
              _context27.next = 35;
              return response.json();
            case 35:
              data = _context27.sent;
              banners = data.CarouselItems.map(parseTopOffer).filter(dateFilter); // // add merchant name to topoffer
              // data.BestDeals.forEach((element) => {
              //   const id = parseInt((new URLSearchParams(element.ClickThroughUrl)).get('mpid'), 10);
              //   const merchant = this.merchants.data.find(s => s.id === id);
              //   // eslint-disable-next-line no-param-reassign
              //   element.name = merchant.name;
              // });
              topOffers = data.BestDeals.map(parseTopOffer).filter(dateFilter);
              setStorageData({
                homepage: {
                  banners: banners,
                  topOffers: topOffers
                }
              });
              return _context27.abrupt("return", {
                banners: banners,
                topOffers: topOffers
              });
            case 40:
            case "end":
              return _context27.stop();
          }
        }, _callee26, this, [[11, 23, 26, 29]]);
      }));
      function getTopOffers() {
        return _getTopOffers.apply(this, arguments);
      }
      return getTopOffers;
    }()
  }]);
  return App;
}(Cashback);

__webpack_require__.g.app = new App({
  activationPatterns: ACTIVATION_PATTERNS,
  suppressionPatterns: SUPPRESSION_PATTERNS,
  disableSuppressionPatterns: DISABLE_PATTERNS,
  googleSuppressionPatterns: GOOGLE_SUPPRESSION_PATTERNS
});

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
/******/ 		__webpack_require__.j = 372;
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
/******/ 			372: 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [216], () => (__webpack_require__(3301)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map