/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 1114:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.common.prod.js
var vue_common_prod = __webpack_require__(1317);
var vue_common_prod_default = /*#__PURE__*/__webpack_require__.n(vue_common_prod);
// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__(14);
// EXTERNAL MODULE: ./node_modules/vuebar/vuebar.js
var vuebar = __webpack_require__(3585);
var vuebar_default = /*#__PURE__*/__webpack_require__.n(vuebar);
// EXTERNAL MODULE: ./node_modules/@fortawesome/vue-fontawesome/index.es.js
var index_es = __webpack_require__(7810);
// EXTERNAL MODULE: ./node_modules/rollbar/dist/rollbar.umd.min.js
var rollbar_umd_min = __webpack_require__(7662);
var rollbar_umd_min_default = /*#__PURE__*/__webpack_require__.n(rollbar_umd_min);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 1 modules
var slicedToArray = __webpack_require__(9439);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(5861);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(4687);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
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
var DISABLE_PATTERNS = (/* unused pure expression or super */ null && (['compare-broadband.topcashback']));
var SUPPRESSION_PATTERNS = (/* unused pure expression or super */ null && (['www.expedia.com/amex', 'px.owneriq.net', /(?<!login\.)dotomi\.com/, 'eden-park.fr/fr_fr/?utm_campaign=', 'www.1-2-3.fr', 'cm_mmc=Linkshare', 'PartnerID=LINKSHARE', 'action.metaffiliation.com', 'track.webgains.com', 'track.effiliation.com', 'clk.tradedoubler.com', 'www.jacadi.fr/?utm_source=', 'ftjcfx.com', 'commission-junction.com', 'rover.ebay.com', 'partners.hotwire.com', 'www.pjtra.com', '.7eer.', 'clickserver.com', '.r.bat.bing.com', 'www.pntrs.com', 'partners.wantable.co', 'cc-dt.com', '.ojrq.net', 'goto.orientaltrading.com', 'www.dpbolvw.net', 'goto.target.com', 'www.pntra.com', '.evyy.net', 'www.anrdoezrs.net', 'www.tkqlhce.com', 'linksynergy.walmart.com', 'www.anrdoezrs.net', 'emjcd.com', 'partners.jawbone.com', 'shareasale.com', 'www.awin1.com', 'linksynergy.walmart.com', 'gan.doubleclick.net', 'tracking.groupon.com', 'www.pepperjamnetwork.com', 'rcm-ca.amazon.ca', 'www.shareasale.com', 'www.jdoqocy.com', 'alitems.com', 'www.kqzyfj.com', 'goto.orientaltrading.com', 'affiliates.babiesrus.com', 'lduhtrp.net', 'ad.admitad.com', 'prf.hn', '.r.msn.com', 'apmebf.com', 'goto.target.com', 'www.intactearnings.com', 'click.linksynergy.com', 'partners.hostgator.com', '.avantlink.com', 'tqlkg.com', 'partners.wantable.co', 'go.redirectingat.com', 'www.pntrac.com', /(?<!tags\.rd\.)linksynergy.com/, 'www.qksrv.net', 'www.gopjn.com', 'affiliates.abebooks.com', 'www.pjatr.com', 'afscr=1', 'afsrc=1', 'affsrc=1', 'riffrid=mdp.hcom.US', 'riffrid=sem.hcom.us', 'rffrid=aff.hcom.us', 'riffrid=eml.hcom.US', 'riffrid=eml.hcom.CA', 'riffrid=eml.hcom.CF', 'riffrid=eml.hcom.U2', 'ranEAID', 'ranSiteID', /.*ebay\..*\/?(mkevt|mkcid|campid).*/, 'magicfreebiesuk.co.uk', 'itsadoddle.co.uk', /shepherdsfriendly\.co\.uk.*utm_medium=km/, /www\.quidco\.com\/visit\/.*\/.*\/cashback/]));
var GOOGLE_SUPPRESSION_PATTERNS = (/* unused pure expression or super */ null && ([/aclk\?sa=/, 'ohost=www.google.com', /(?<!td\.)(?<!fls\.)doubleclick\.net/
// 'cp=\\d+-[\\w-]+',
// 'gclid=[\\w-]+',
// 'gclsrc=aw\\.ds',
// 'kwd=\\d+-\\d+',
]));

var AVIOS_MERCHANTS = ['tkmaxx.com'];
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
var getStorageData = promiseWrapper(chrome.storage.local, 'get');
var setStorageData = promiseWrapper(chrome.storage.local, 'set');
var createTab = promiseWrapper(chrome.tabs, 'create');
var updateTab = promiseWrapper(chrome.tabs, 'update');
var asyncTimeout = /*#__PURE__*/function () {
  var _ref = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee(t) {
    return regenerator_default().wrap(function _callee$(_context) {
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
}();

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
var checkPrivateMode = /*#__PURE__*/function () {
  var _ref9 = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee4() {
    var browser, tab;
    return regenerator_default().wrap(function _callee4$(_context4) {
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
}();
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
;// CONCATENATED MODULE: ./source/popup/store.js




/* harmony default export */ const store = ({
  state: {
    status: null,
    privateMode: false,
    user: null,
    merchant: null,
    merchants: null,
    currentTab: null,
    settings: null,
    offers: null,
    flagRedirect: false,
    recentStores: [],
    topOffers: [],
    banners: [],
    device: null
  },
  mutations: {
    set: function set(state, data) {
      Object.assign(state, data);
    }
  },
  actions: {
    init: function init(_ref) {
      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var commit, privateMode, _yield$getActiveTab, url, _yield$sendContentMes, device, deviceModel, _yield$sendContentMes2, user, merchants, banners, topOffers, merchant, recentStores, flagRedirect, currentTab, loggedIn;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              commit = _ref.commit;
              _context.next = 3;
              return checkPrivateMode();
            case 3:
              privateMode = _context.sent;
              _context.next = 6;
              return utils_getActiveTab();
            case 6:
              _yield$getActiveTab = _context.sent;
              url = _yield$getActiveTab.url;
              _context.next = 10;
              return sendContentMessage({
                action: 'getDeviceInfo'
              });
            case 10:
              _yield$sendContentMes = _context.sent;
              device = _yield$sendContentMes.device;
              deviceModel = _yield$sendContentMes.deviceModel;
              commit('set', {
                device: device,
                deviceModel: deviceModel
              });
              _context.next = 16;
              return sendContentMessage({
                action: 'getStorePopupInfo',
                data: {
                  device: device,
                  url: url
                }
              });
            case 16:
              _yield$sendContentMes2 = _context.sent;
              user = _yield$sendContentMes2.user;
              merchants = _yield$sendContentMes2.merchants;
              banners = _yield$sendContentMes2.banners;
              topOffers = _yield$sendContentMes2.topOffers;
              merchant = _yield$sendContentMes2.merchant;
              recentStores = _yield$sendContentMes2.recentStores;
              flagRedirect = _yield$sendContentMes2.flagRedirect;
              currentTab = merchant ? 'store' : 'offers';
              _context.next = 27;
              return checkUserLogin();
            case 27:
              loggedIn = _context.sent;
              commit('set', {
                privateMode: privateMode,
                topOffers: topOffers,
                banners: banners,
                merchants: merchants,
                merchant: merchant,
                user: user,
                currentTab: currentTab,
                loggedIn: loggedIn,
                recentStores: recentStores,
                flagRedirect: flagRedirect
              });
              commit('set', {
                status: 'ready'
              });
            case 30:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    }
  }
});
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/app.vue?vue&type=template&id=38ea541a&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    "class": ['tcb-extension', _vm.device === 'mobile' && 'tcb-extension--mobile', "tcb-extension--".concat(this.$store.state.deviceModel)]
  }, [_vm.device === 'mobile' ? _c('div', {
    staticClass: "popup popup--mobile"
  }, [_c('img', {
    staticClass: "popup__header-logo",
    attrs: {
      "src": __webpack_require__(6922)
    }
  }), _vm._v(" "), _vm.privateMode ? [_c('WelcomeMobile', {
    attrs: {
      "privateMode": _vm.privateMode
    }
  })] : _vm.status === 'ready' ? [_vm.merchant ? _c('div', {
    staticClass: "popup__content"
  }, [_c('MerchantContentMobile', {
    attrs: {
      "merchant": _vm.merchant,
      "loggedIn": _vm.loggedIn,
      "user": _vm.user
    }
  })], 1) : _vm.loggedIn ? [_c('div', {
    staticClass: "popup__tab-name"
  }, [_vm._v(_vm._s(_vm.$i18next.t('popup.app.offers_title')))]), _vm._v(" "), _c('div', {
    staticClass: "popup__content"
  }, [_vm.topOffers.length ? _c('div', {
    staticClass: "stores-list stores-list--mobile"
  }, _vm._l(_vm.topOffers, function (offer, index) {
    return _c('storeListItemMobile', {
      key: index,
      attrs: {
        "merchant": offer,
        "infoType": 'offer'
      }
    });
  }), 1) : _vm._e()])] : _c('WelcomeMobile')] : _c('div', {
    staticClass: "loader"
  })], 2) : _c('div', {
    staticClass: "popup"
  }, [_vm.privateMode ? _c('div', [_c('Welcome', {
    attrs: {
      "privateMode": _vm.privateMode
    }
  })], 1) : _c('div', [_vm.status === 'ready' && _vm.loggedIn ? _c('div', {
    staticClass: "app"
  }, [_c('VHeader', {
    attrs: {
      "merchant": _vm.merchant,
      "cashback": {
        available: '$0.00',
        pending: '$0.00'
      },
      "user": _vm.user
    }
  }), _vm._v(" "), _c('Navigation', {
    attrs: {
      "tabs": _vm.tabs,
      "transition": _vm.transition
    },
    on: {
      "update:transition": function updateTransition($event) {
        _vm.transition = $event;
      }
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "bar",
      rawName: "v-bar"
    }]
  }, [_c('div', [_c('keep-alive', [_c('transition', {
    attrs: {
      "name": "tab-slide--transition-".concat(_vm.transition)
    }
  }, [_vm.status === 'ready' ? _c("".concat(_vm.currentTab, "Tab"), {
    tag: "component"
  }) : _vm._e()], 1)], 1)], 1)])], 1) : _vm.status === 'ready' ? _c('Welcome') : _vm._e(), _vm._v(" "), _vm.status === 'ready' ? _c('VFooter', {
    attrs: {
      "loggedIn": _vm.loggedIn
    }
  }) : _vm._e(), _vm._v(" "), _vm.status !== 'ready' ? _c('div', {
    staticClass: "loader"
  }) : _vm._e()], 1)])]);
};
var staticRenderFns = [];

;// CONCATENATED MODULE: ./source/popup/app.vue?vue&type=template&id=38ea541a&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(4942);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/header.vue?vue&type=template&id=01b8fd26&
var headervue_type_template_id_01b8fd26_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    "class": ['header', _vm.merchant && 'header_merchant']
  }, [_c('div', {
    staticClass: "header__logo",
    style: _vm.merchant && {
      backgroundImage: "url(".concat(_vm.merchant.logo, ")")
    },
    on: {
      "click": function click($event) {
        return _vm.openPage(_vm.homePage);
      }
    }
  }), _vm._v(" "), _vm.merchant ? _c('div', {
    staticClass: "header__section"
  }, [_vm.merchant.activated ? _c('div', {
    staticClass: "header__title"
  }, [_vm._v("\n      " + _vm._s(_vm.$i18next.t('popup.components.header.title', {
    promotedText: _vm.promotedText
  })) + "\n    ")]) : _c('div', {
    staticClass: "cta cta_medium",
    on: {
      "click": _vm.activate
    }
  }, [_vm._v(_vm._s(_vm.buttonLabel))])]) : _vm._e()]);
};
var headervue_type_template_id_01b8fd26_staticRenderFns = [];

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
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/header.vue?vue&type=script&lang=js&







/* harmony default export */ const headervue_type_script_lang_js_ = ({
  props: {
    cashback: Object,
    merchant: Object,
    user: Object
  },
  data: function data() {
    return {
      homePage: HOME_PAGE
    };
  },
  computed: {
    isRequiresBacs: function isRequiresBacs() {
      return !this.user.hasBacs && this.user.isLoggedIn && this.merchant.isRequiresBacs;
    },
    buttonLabel: function buttonLabel() {
      return this.isRequiresBacs ? this.$i18next.t('popup.components.header.bacs_required') : this.$i18next.t('popup.components.header.activate', {
        reward: this.merchant.reward,
        promotedText: this.promotedText
      });
    },
    promotedText: function promotedText() {
      var _this = this;
      var text = "".concat(i18n.t('popup.components.header.cashback'));
      if (!AVIOS_MERCHANTS.length) return text;
      AVIOS_MERCHANTS.forEach(function (merchant) {
        if (_this.merchant.domain.includes(merchant)) {
          text = 'avios';
        }
      });
      return text;
    },
    flagRedirect: function flagRedirect() {
      return this.$store.state.flagRedirect;
    }
  },
  methods: {
    activate: function activate() {
      var _this2 = this;
      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var _this2$merchant, activationUrl, name, id, isRequiresBacs, tab;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this2$merchant = _this2.merchant, activationUrl = _this2$merchant.activationUrl, name = _this2$merchant.name, id = _this2$merchant.id, isRequiresBacs = _this2$merchant.isRequiresBacs;
              _context.next = 3;
              return utils_getActiveTab();
            case 3:
              tab = _context.sent;
              brodcastChannel.postMessage({
                type: 'analytics',
                dataGA: {
                  ec: 'Popup',
                  ea: 'Activation',
                  el: name
                }
              });
              brodcastChannel.postMessage({
                type: 'activate',
                dataActivate: {
                  activationUrl: activationUrl,
                  deeplink: tab.url,
                  newTab: openNewTabCashback(_this2.flagRedirect, isRequiresBacs, _this2.user.hasBacs),
                  merchantId: id
                },
                sender: {
                  tab: tab
                }
              });
              if (!_this2.isAutomationTest()) window.close();
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    openPage: function openPage(url) {
      this.$store.dispatch('analytics', {
        dataGA: {
          ec: 'Popup',
          ea: 'Logo click'
        }
      });

      // broadcastChannel.postMessage({
      //   type: 'analytics',
      //   dataGA: {
      //     ec: 'Popup',
      //     ea: 'Logo click',
      //   },
      // });

      chrome.tabs.create({
        url: url
      });
      if (!this.isAutomationTest()) window.close();
    },
    isAutomationTest: function isAutomationTest() {
      return window.location.href.includes('automation_testing=true') && IS_TEST_VERSION;
    }
  }
});
;// CONCATENATED MODULE: ./source/popup/components/header.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_headervue_type_script_lang_js_ = (headervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/header.vue?vue&type=style&index=0&id=01b8fd26&prod&lang=less&
var headervue_type_style_index_0_id_01b8fd26_prod_lang_less_ = __webpack_require__(404);
;// CONCATENATED MODULE: ./source/popup/components/header.vue?vue&type=style&index=0&id=01b8fd26&prod&lang=less&

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1900);
;// CONCATENATED MODULE: ./source/popup/components/header.vue



;


/* normalize component */

var component = (0,componentNormalizer/* default */.Z)(
  components_headervue_type_script_lang_js_,
  headervue_type_template_id_01b8fd26_render,
  headervue_type_template_id_01b8fd26_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const header = (component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/navigation.vue?vue&type=template&id=7140d4d4&
var navigationvue_type_template_id_7140d4d4_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "navigation"
  }, [_vm._l(_vm.tabs, function (text, name) {
    return _c('div', {
      key: name,
      "class": ['navigation__item', "navigation__item_".concat(name), name === _vm.currentTab && 'navigation__item_active'],
      on: {
        "click": function click($event) {
          return _vm.openTab(name);
        }
      }
    }, [_vm._v(_vm._s(text))]);
  }), _vm._v(" "), _c('div', {
    staticClass: "navigation__progress"
  }, [_c('div', {
    staticClass: "navigation__line",
    style: {
      width: "".concat(_vm.lineWidth, "%"),
      marginLeft: "".concat(_vm.linePosition, "%")
    }
  })])], 2);
};
var navigationvue_type_template_id_7140d4d4_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/navigation.vue?vue&type=script&lang=js&

/* harmony default export */ const navigationvue_type_script_lang_js_ = ({
  props: ['tabs', 'transition'],
  data: function data() {
    return {
      icons: {}
    };
  },
  computed: {
    storeStatus: function storeStatus() {
      return this.$store.state.status;
    },
    currentTab: function currentTab() {
      return this.$store.state.currentTab;
    },
    lineWidth: function lineWidth() {
      return Math.floor(100 / Object.keys(this.tabs).length);
    },
    linePosition: function linePosition() {
      var index = Object.keys(this.tabs).indexOf(this.currentTab);
      return index * this.lineWidth;
    }
  },
  methods: {
    openTab: function openTab(name) {
      this.setTransition(name);
      brodcastChannel.postMessage({
        type: 'analytics',
        dataGA: {
          ec: 'Popup',
          ea: 'Open Tab',
          el: name
        }
      });
      this.$store.commit('set', {
        currentTab: name
      });
    },
    setTransition: function setTransition(name) {
      var names = Object.keys(this.tabs);
      var currentIndex = names.indexOf(this.currentTab);
      var nextIndex = names.indexOf(name);
      var transition = currentIndex > nextIndex ? 'left' : 'right';
      this.$emit('update:transition', transition);
    }
  }
});
;// CONCATENATED MODULE: ./source/popup/components/navigation.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_navigationvue_type_script_lang_js_ = (navigationvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/navigation.vue?vue&type=style&index=0&id=7140d4d4&prod&lang=less&
var navigationvue_type_style_index_0_id_7140d4d4_prod_lang_less_ = __webpack_require__(429);
;// CONCATENATED MODULE: ./source/popup/components/navigation.vue?vue&type=style&index=0&id=7140d4d4&prod&lang=less&

;// CONCATENATED MODULE: ./source/popup/components/navigation.vue



;


/* normalize component */

var navigation_component = (0,componentNormalizer/* default */.Z)(
  components_navigationvue_type_script_lang_js_,
  navigationvue_type_template_id_7140d4d4_render,
  navigationvue_type_template_id_7140d4d4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const navigation = (navigation_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/offersTab/offersTab.vue?vue&type=template&id=7e619ed3&
var offersTabvue_type_template_id_7e619ed3_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "tab"
  }, [_c('Search', {
    attrs: {
      "merchants": _vm.merchants
    }
  }), _vm._v(" "), _c('carousel', {
    staticClass: "offers-carousel",
    attrs: {
      "perPage": 1,
      "navigationEnabled": false,
      "paginationEnabled": false,
      "autoplay": true,
      "loop": true,
      "autoplayTimeout": 5000,
      "autoplayHoverPause": false
    }
  }, _vm._l(_vm.banners, function (offer, index) {
    return _c('slide', {
      key: index
    }, [_c('offer-banner', {
      attrs: {
        "offer": offer
      }
    })], 1);
  }), 1), _vm._v(" "), _vm.topOffers.length ? _c('div', {
    staticClass: "stores-list"
  }, _vm._l(_vm.topOffers, function (offer, index) {
    return _c('storeListItem', {
      key: index,
      attrs: {
        "merchant": offer,
        "infoType": 'offer'
      }
    });
  }), 1) : _vm._e()], 1);
};
var offersTabvue_type_template_id_7e619ed3_staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/vue-carousel/dist/vue-carousel.min.js
var vue_carousel_min = __webpack_require__(7409);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/storeListItem.vue?vue&type=template&id=19969900&
var storeListItemvue_type_template_id_19969900_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    "class": ['store'],
    on: {
      "click": _vm.activate,
      "mouseover": function mouseover($event) {
        _vm.hover = true;
      },
      "mouseleave": function mouseleave($event) {
        _vm.hover = false;
      }
    }
  }, [_c('div', [_c('p', {
    staticClass: "store__name"
  }, [_vm._v(_vm._s(!_vm.merchant.name ? _vm.getMerchant.name : _vm.merchant.name))]), _vm._v(" "), _c('p', {
    staticClass: "store__reward"
  }, [_vm._v("\n      " + _vm._s(_vm.merchant.reward) + " " + _vm._s(this.infoType != 'offer' ? _vm.$i18next.t('general.cashback') : '') + "\n      "), _vm.getMerchant.couponsAmount > 0 ? _c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.topDealsCoupons)
    }
  }) : _vm._e()])]), _vm._v(" "), _c('img', {
    staticClass: "store__img",
    attrs: {
      "src": _vm.merchant.logo
    }
  })]);
};
var storeListItemvue_type_template_id_19969900_staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/dompurify/dist/purify.js
var purify = __webpack_require__(7856);
;// CONCATENATED MODULE: ./source/filters/reward.js


// eslint-disable-next-line func-names
/* harmony default export */ function reward(str) {
  var includesDecimals = /\d/.test(str);
  return includesDecimals ? "".concat(str, " ").concat(i18n.t('general.cashback')) : str;
}
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/storeListItem.vue?vue&type=script&lang=js&








/* harmony default export */ const storeListItemvue_type_script_lang_js_ = ({
  props: ['merchant', 'infoType'],
  filters: {
    reward: reward
  },
  data: function data() {
    return {
      hover: false
    };
  },
  computed: {
    getMerchant: function getMerchant() {
      var id = new URLSearchParams(this.merchant.activationUrl).get('mpid');
      var merchant = this.$store.state.merchants.find(function (s) {
        return "".concat(s.id) === id;
      });
      return merchant;
    },
    topDealsCoupons: function topDealsCoupons() {
      return purify.sanitize(i18n.t('popup.components.store_tab.best_deals_vouchers', {
        count: this.getMerchant.couponsAmount
      }));
    }
  },
  methods: {
    activate: function activate() {
      var _this = this;
      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var activationUrl, tab;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              activationUrl = _this.merchant.activationUrl;
              _context.next = 3;
              return utils_getActiveTab();
            case 3:
              tab = _context.sent;
              brodcastChannel.postMessage({
                type: 'analytics',
                dataGA: {
                  ec: 'Popup',
                  ea: _this.infoType === 'offer' ? 'Best Deal Activation' : 'Recently Visited Store Activation',
                  el: _this.merchant.name
                }
              });
              brodcastChannel.postMessage({
                type: 'activate',
                dataActivate: {
                  activationUrl: activationUrl
                },
                sender: {
                  tab: tab
                }
              });
              if (!_this.isAutomationTest()) window.close();
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    isAutomationTest: function isAutomationTest() {
      return window.location.href.includes('automation_testing=true') && IS_TEST_VERSION;
    }
  }
});
;// CONCATENATED MODULE: ./source/popup/components/storeListItem.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_storeListItemvue_type_script_lang_js_ = (storeListItemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/storeListItem.vue?vue&type=style&index=0&id=19969900&prod&lang=less&
var storeListItemvue_type_style_index_0_id_19969900_prod_lang_less_ = __webpack_require__(7919);
;// CONCATENATED MODULE: ./source/popup/components/storeListItem.vue?vue&type=style&index=0&id=19969900&prod&lang=less&

;// CONCATENATED MODULE: ./source/popup/components/storeListItem.vue



;


/* normalize component */

var storeListItem_component = (0,componentNormalizer/* default */.Z)(
  components_storeListItemvue_type_script_lang_js_,
  storeListItemvue_type_template_id_19969900_render,
  storeListItemvue_type_template_id_19969900_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const storeListItem = (storeListItem_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/search.vue?vue&type=template&id=0ec8f9d0&
var searchvue_type_template_id_0ec8f9d0_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    "class": ['search', _vm.query && 'search_with-results']
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.query,
      expression: "query"
    }],
    "class": "search__input",
    attrs: {
      "type": "text",
      "placeholder": _vm.placeholder,
      "tabindex": "-1"
    },
    domProps: {
      "value": _vm.query
    },
    on: {
      "keydown": [function ($event) {
        if (!$event.type.indexOf('key') && $event.keyCode !== 38 && $event.keyCode !== 40) return null;
        $event.preventDefault();
        return _vm.select.apply(null, arguments);
      }, function ($event) {
        if (!$event.type.indexOf('key') && $event.keyCode !== 13) return null;
        return _vm.openResult(_vm.results[_vm.selectIndex]);
      }],
      "input": [function ($event) {
        if ($event.target.composing) return;
        _vm.query = $event.target.value;
      }, function ($event) {
        _vm.query && _vm.find(_vm.query.toLowerCase());
      }]
    }
  }), _vm._v(" "), _c('div', {
    "class": "search__icon"
  }), _vm._v(" "), _vm.query && _vm.results.length ? _c('div', {
    "class": "search__results"
  }, _vm._l(_vm.results, function (merchant, index) {
    return _c('div', {
      key: index,
      "class": ["search__result", index === _vm.selectIndex && "search__result_selected"],
      on: {
        "mouseenter": function mouseenter($event) {
          _vm.selectIndex = index;
        },
        "mouseleave": function mouseleave($event) {
          _vm.selectIndex = null;
        },
        "click": function click($event) {
          return _vm.openResult(_vm.results[_vm.selectIndex]);
        }
      }
    }, [_c('span', {
      domProps: {
        "innerHTML": _vm._s(_vm.bold(merchant.name))
      }
    }), _vm._v(" "), _c('span', {
      "class": "search__cashback"
    }, [_vm._v(_vm._s(_vm.promotedText(merchant)))])]);
  }), 0) : _vm._e(), _vm._v(" "), _vm.query && !_vm.results.length ? _c('div', {
    "class": "search__results"
  }, [_c('div', {
    "class": "search__result"
  }, [_c('span', {
    staticClass: "bold"
  }, [_vm._v("– " + _vm._s(_vm.$i18next.t('popup.components.search.no_matches')) + " –")])])]) : _vm._e(), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade"
    }
  }, [_vm.query ? _c('div', {
    "class": "search__background",
    on: {
      "click": function click($event) {
        _vm.query = '';
      }
    }
  }) : _vm._e()])], 1);
};
var searchvue_type_template_id_0ec8f9d0_staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/lodash/slice.js
var slice = __webpack_require__(2571);
var slice_default = /*#__PURE__*/__webpack_require__.n(slice);
// EXTERNAL MODULE: ./node_modules/lodash/filter.js
var filter = __webpack_require__(3105);
var filter_default = /*#__PURE__*/__webpack_require__.n(filter);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/search.vue?vue&type=script&lang=js&






// import reward from '../../filters/reward';



/* harmony default export */ const searchvue_type_script_lang_js_ = ({
  props: ['merchants'],
  data: function data() {
    return {
      query: '',
      results: [],
      selectIndex: -1,
      placeholder: this.$i18next.t('popup.components.search.search')
    };
  },
  // filters: {
  //   reward,
  // },
  methods: {
    bold: function bold(value) {
      var rx = new RegExp("(.+|)(".concat(this.query, ")(.+|)"), 'i');
      return purify.sanitize(value.replace(rx, '$1<span class="bold">$2</span>$3'));
    },
    select: function select(_ref) {
      var key = _ref.key;
      var index = this.selectIndex;
      var length = this.results.length;
      if (key === 'ArrowUp') {
        this.selectIndex = index <= 0 ? length - 1 : index - 1;
      } else {
        this.selectIndex = index === length - 1 ? 0 : index + 1;
      }
      this.query = this.results[this.selectIndex].name;
    },
    find: function find(query) {
      var filtered = filter_default()(this.merchants, function (merchant) {
        var name = merchant.name.toLowerCase();
        return name.indexOf(query) > -1;
      });
      filtered.sort(function (a, b) {
        var aName = a.name.toLowerCase();
        var bName = b.name.toLowerCase();
        var high = (bName.indexOf(query) === 0) - (aName.indexOf(query) === 0);
        var low = (bName.indexOf(query) > -1) - (aName.indexOf(query) > -1);
        return high || low;
      });
      this.results = slice_default()(filtered, 0, 10);
    },
    openResult: function openResult() {
      var _this = this;
      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var _this$results$_this$s, activationUrl, name, tab;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this$results$_this$s = _this.results[_this.selectIndex], activationUrl = _this$results$_this$s.activationUrl, name = _this$results$_this$s.name;
              _context.next = 3;
              return utils_getActiveTab();
            case 3:
              tab = _context.sent;
              brodcastChannel.postMessage({
                type: 'analytics',
                dataGA: {
                  ec: 'Popup',
                  ea: 'Search Result',
                  el: name
                }
              });
              brodcastChannel.postMessage({
                type: 'activate',
                dataActivate: {
                  activationUrl: activationUrl
                },
                sender: {
                  tab: tab
                }
              });
              if (_this.isAutomationTest() === false) window.close();
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    promotedText: function promotedText(merchant) {
      var includesDecimals = /\d/.test(merchant.reward);
      if (!includesDecimals) return merchant.reward;
      var text = "".concat(i18n.t('popup.components.search.cashback'));
      if (REGION === 'de') {
        if (merchant.reward.includes('Bis zu')) text = text.toLowerCase();
      }
      if (!AVIOS_MERCHANTS.length) return "".concat(merchant.reward, " ").concat(text);
      AVIOS_MERCHANTS.forEach(function (avMerchant) {
        if (merchant.domain.includes(avMerchant)) {
          text = 'Avios';
        }
      });
      return "".concat(merchant.reward, " ").concat(text);
    },
    isAutomationTest: function isAutomationTest() {
      return window.location.href.includes('automation_testing=true') && IS_TEST_VERSION;
    }
  }
});
;// CONCATENATED MODULE: ./source/popup/components/search.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_searchvue_type_script_lang_js_ = (searchvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/search.vue?vue&type=style&index=0&id=0ec8f9d0&prod&lang=less&
var searchvue_type_style_index_0_id_0ec8f9d0_prod_lang_less_ = __webpack_require__(1815);
;// CONCATENATED MODULE: ./source/popup/components/search.vue?vue&type=style&index=0&id=0ec8f9d0&prod&lang=less&

;// CONCATENATED MODULE: ./source/popup/components/search.vue



;


/* normalize component */

var search_component = (0,componentNormalizer/* default */.Z)(
  components_searchvue_type_script_lang_js_,
  searchvue_type_template_id_0ec8f9d0_render,
  searchvue_type_template_id_0ec8f9d0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const search = (search_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/offerBanner.vue?vue&type=template&id=7299c62d&
var offerBannervue_type_template_id_7299c62d_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "offer-banner",
    style: {
      backgroundImage: "url(".concat(_vm.offer.banner, ")")
    },
    on: {
      "click": _vm.activate
    }
  });
};
var offerBannervue_type_template_id_7299c62d_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/offerBanner.vue?vue&type=script&lang=js&





/* harmony default export */ const offerBannervue_type_script_lang_js_ = ({
  props: ['offer'],
  methods: {
    activate: function activate() {
      var _this = this;
      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var activationUrl, tab;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              activationUrl = _this.offer.activationUrl;
              _context.next = 3;
              return utils_getActiveTab();
            case 3:
              tab = _context.sent;
              brodcastChannel.postMessage({
                type: 'analytics',
                dataGA: {
                  ec: 'Popup',
                  ea: 'Carousel Activation',
                  el: activationUrl
                }
              });
              brodcastChannel.postMessage({
                type: 'activate',
                dataActivate: {
                  activationUrl: activationUrl
                },
                sender: {
                  tab: tab
                }
              });
              if (!_this.isAutomationTest()) window.close();
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    isAutomationTest: function isAutomationTest() {
      return window.location.href.includes('automation_testing=true') && IS_TEST_VERSION;
    }
  }
});
;// CONCATENATED MODULE: ./source/popup/components/offerBanner.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_offerBannervue_type_script_lang_js_ = (offerBannervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/offerBanner.vue?vue&type=style&index=0&id=7299c62d&prod&lang=less&
var offerBannervue_type_style_index_0_id_7299c62d_prod_lang_less_ = __webpack_require__(5192);
;// CONCATENATED MODULE: ./source/popup/components/offerBanner.vue?vue&type=style&index=0&id=7299c62d&prod&lang=less&

;// CONCATENATED MODULE: ./source/popup/components/offerBanner.vue



;


/* normalize component */

var offerBanner_component = (0,componentNormalizer/* default */.Z)(
  components_offerBannervue_type_script_lang_js_,
  offerBannervue_type_template_id_7299c62d_render,
  offerBannervue_type_template_id_7299c62d_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const offerBanner = (offerBanner_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/offersTab/offersTab.vue?vue&type=script&lang=js&




/* harmony default export */ const offersTabvue_type_script_lang_js_ = ({
  components: {
    storeListItem: storeListItem,
    Search: search,
    Carousel: vue_carousel_min.Carousel,
    Slide: vue_carousel_min.Slide,
    OfferBanner: offerBanner
  },
  computed: {
    recentlyVisited: function recentlyVisited() {
      return this.$store.getters.recentlyVisited;
    },
    merchants: function merchants() {
      return this.$store.state.merchants;
    },
    topOffers: function topOffers() {
      return this.$store.state.topOffers;
    },
    banners: function banners() {
      return this.$store.state.banners;
    }
  }
});
;// CONCATENATED MODULE: ./source/popup/components/offersTab/offersTab.vue?vue&type=script&lang=js&
 /* harmony default export */ const offersTab_offersTabvue_type_script_lang_js_ = (offersTabvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/offersTab/offersTab.vue?vue&type=style&index=0&id=7e619ed3&prod&lang=less&
var offersTabvue_type_style_index_0_id_7e619ed3_prod_lang_less_ = __webpack_require__(4025);
;// CONCATENATED MODULE: ./source/popup/components/offersTab/offersTab.vue?vue&type=style&index=0&id=7e619ed3&prod&lang=less&

;// CONCATENATED MODULE: ./source/popup/components/offersTab/offersTab.vue



;


/* normalize component */

var offersTab_component = (0,componentNormalizer/* default */.Z)(
  offersTab_offersTabvue_type_script_lang_js_,
  offersTabvue_type_template_id_7e619ed3_render,
  offersTabvue_type_template_id_7e619ed3_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const offersTab = (offersTab_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/recentTab/recentTab.vue?vue&type=template&id=0a0de55b&
var recentTabvue_type_template_id_0a0de55b_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "tab"
  }, [_c('Search', {
    attrs: {
      "merchants": _vm.merchants
    }
  }), _vm._v(" "), _vm.recentlyVisited.length ? _c('div', {
    staticClass: "stores-list stores-list--recently-visited"
  }, _vm._l(_vm.recentlyVisited, function (merchant, index) {
    return _c('storeListItem', {
      key: index,
      attrs: {
        "merchant": merchant
      }
    });
  }), 1) : _c('p', {
    staticClass: "no-recently-visited"
  }, [_vm._v("\n    " + _vm._s(_vm.$i18next.t('popup.components.recent_tab.no_recently_visited')) + "\n  ")])], 1);
};
var recentTabvue_type_template_id_0a0de55b_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/recentTab/recentTab.vue?vue&type=script&lang=js&


/* harmony default export */ const recentTabvue_type_script_lang_js_ = ({
  components: {
    StoreListItem: storeListItem,
    Search: search
  },
  computed: {
    recentlyVisited: function recentlyVisited() {
      return this.$store.state.recentStores;
    },
    merchants: function merchants() {
      return this.$store.state.merchants;
    }
  }
});
;// CONCATENATED MODULE: ./source/popup/components/recentTab/recentTab.vue?vue&type=script&lang=js&
 /* harmony default export */ const recentTab_recentTabvue_type_script_lang_js_ = (recentTabvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/recentTab/recentTab.vue?vue&type=style&index=0&id=0a0de55b&prod&lang=less&
var recentTabvue_type_style_index_0_id_0a0de55b_prod_lang_less_ = __webpack_require__(109);
;// CONCATENATED MODULE: ./source/popup/components/recentTab/recentTab.vue?vue&type=style&index=0&id=0a0de55b&prod&lang=less&

;// CONCATENATED MODULE: ./source/popup/components/recentTab/recentTab.vue



;


/* normalize component */

var recentTab_component = (0,componentNormalizer/* default */.Z)(
  recentTab_recentTabvue_type_script_lang_js_,
  recentTabvue_type_template_id_0a0de55b_render,
  recentTabvue_type_template_id_0a0de55b_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const recentTab = (recentTab_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/storeTab/storeTab.vue?vue&type=template&id=987cd0a8&
var storeTabvue_type_template_id_987cd0a8_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "tab"
  }, [_c('store-info', {
    attrs: {
      "merchant": _vm.merchant,
      "merchantOffers": _vm.merchantOffers,
      "parentComponent": "popup"
    }
  }), _vm._v(" "), _c('store-terms', {
    attrs: {
      "important": _vm.region == 'us' ? _vm.important : null,
      "exclusions": _vm.region == 'us' ? _vm.exclusions : null,
      "topCashbackUrl": _vm.merchant.topCashbackUrl
    }
  })], 1);
};
var storeTabvue_type_template_id_987cd0a8_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/storeInfo.vue?vue&type=template&id=6e21ffd7&scoped=true&
var storeInfovue_type_template_id_6e21ffd7_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "store-info"
  }, [_vm.merchant.offers_length > 0 ? _c('Tiers', {
    attrs: {
      "tiers": _vm.merchantTiers,
      "numberTiers": _vm.merchant.offers_length,
      "merchantName": _vm.merchant.name
    }
  }) : _vm._e(), _vm._v(" "), _vm.merchantOffers.length ? _c('OffersList', {
    attrs: {
      "merchant": _vm.merchant,
      "merchantOffers": _vm.merchantOffers,
      "parentComponent": _vm.parentComponent
    }
  }) : _vm._e()], 1);
};
var storeInfovue_type_template_id_6e21ffd7_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/tiers.vue?vue&type=template&id=39341912&scoped=true&
var tiersvue_type_template_id_39341912_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    "class": ["tiers"]
  }, [_c('div', {
    "class": ["tiers__list"]
  }, _vm._l(_vm.showedTiers, function (items) {
    return _c('div', {
      key: items['name']
    }, [_c('p'), _vm._v(" "), _c('p', {
      staticClass: "tiers__category",
      domProps: {
        "innerHTML": _vm._s(_vm.showCategory(items))
      }
    }), _vm._v(" "), _vm._l(items['rates'], function (tier, index) {
      return _c('tier', {
        key: index,
        attrs: {
          "tier": tier
        }
      });
    })], 2);
  }), 0), _vm._v(" "), _vm.tiers && _vm.numberTiers > 5 ? _c('div', {
    "class": ["tiers__show-more", _vm.showAll && "tiers__show-more_hidden"],
    on: {
      "click": _vm.showMore
    }
  }, [_vm._v("\n    " + _vm._s(_vm.$i18next.t('shared_components.tiers.show_more')) + "\n  ")]) : _vm._e()]);
};
var tiersvue_type_template_id_39341912_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/tier.vue?vue&type=template&id=59284818&scoped=true&
var tiervue_type_template_id_59284818_scoped_true_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    "class": ["tier"]
  }, [_c('div', {
    ref: "tierName",
    staticClass: "tier__name",
    "class": {
      'tier__name_matched': _vm.matchHeight
    }
  }, [_vm._v("\n        " + _vm._s(_vm.tier.name) + "\n    ")]), _vm._v(" "), _c('div', {
    "class": ["tier__reward"]
  }, [_vm._v(_vm._s(_vm.tier.reward))])]);
};
var tiervue_type_template_id_59284818_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/tier.vue?vue&type=script&lang=js&
/* harmony default export */ const tiervue_type_script_lang_js_ = ({
  props: {
    tier: {
      type: Object,
      "default": function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      matchHeight: false
    };
  },
  mounted: function mounted() {
    this.checkHeight();
  },
  methods: {
    checkHeight: function checkHeight() {
      if (!this.$refs.tierName) {
        return;
      }
      var height = this.$refs.tierName.clientHeight;
      this.matchHeight = height > 49;
    }
  }
});
;// CONCATENATED MODULE: ./source/shared_components/tier.vue?vue&type=script&lang=js&
 /* harmony default export */ const shared_components_tiervue_type_script_lang_js_ = (tiervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/tier.vue?vue&type=style&index=0&id=59284818&prod&lang=less&scoped=true&
var tiervue_type_style_index_0_id_59284818_prod_lang_less_scoped_true_ = __webpack_require__(7341);
;// CONCATENATED MODULE: ./source/shared_components/tier.vue?vue&type=style&index=0&id=59284818&prod&lang=less&scoped=true&

;// CONCATENATED MODULE: ./source/shared_components/tier.vue



;


/* normalize component */

var tier_component = (0,componentNormalizer/* default */.Z)(
  shared_components_tiervue_type_script_lang_js_,
  tiervue_type_template_id_59284818_scoped_true_render,
  tiervue_type_template_id_59284818_scoped_true_staticRenderFns,
  false,
  null,
  "59284818",
  null
  
)

/* harmony default export */ const tier = (tier_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/tiers.vue?vue&type=script&lang=js&




/* harmony default export */ const tiersvue_type_script_lang_js_ = ({
  props: {
    tiers: Array,
    merchantName: String,
    numberTiers: Number
  },
  components: {
    Tier: tier
  },
  data: function data() {
    return {
      showAll: false,
      paintedTiers: []
    };
  },
  computed: {
    limitedTiers: function limitedTiers() {
      return sliceByValues(this.tiers, 5);
    },
    showedTiers: function showedTiers() {
      return this.showAll ? this.tiers : this.limitedTiers;
    }
  },
  methods: {
    showMore: function showMore() {
      this.showAll = true;
    },
    showCategory: function showCategory(items) {
      return purify.sanitize(i18n.t("general.".concat(items.rates['0'].labelType), {
        merchantName: this.merchantName,
        category: items.name
      }));
    }
  }
});
;// CONCATENATED MODULE: ./source/shared_components/tiers.vue?vue&type=script&lang=js&
 /* harmony default export */ const shared_components_tiersvue_type_script_lang_js_ = (tiersvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/tiers.vue?vue&type=style&index=0&id=39341912&prod&lang=less&scoped=true&
var tiersvue_type_style_index_0_id_39341912_prod_lang_less_scoped_true_ = __webpack_require__(6816);
;// CONCATENATED MODULE: ./source/shared_components/tiers.vue?vue&type=style&index=0&id=39341912&prod&lang=less&scoped=true&

;// CONCATENATED MODULE: ./source/shared_components/tiers.vue



;


/* normalize component */

var tiers_component = (0,componentNormalizer/* default */.Z)(
  shared_components_tiersvue_type_script_lang_js_,
  tiersvue_type_template_id_39341912_scoped_true_render,
  tiersvue_type_template_id_39341912_scoped_true_staticRenderFns,
  false,
  null,
  "39341912",
  null
  
)

/* harmony default export */ const tiers = (tiers_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/offersList.vue?vue&type=template&id=3ba8c40d&scoped=true&v-if=merchantOffers.length&
var offersListvue_type_template_id_3ba8c40d_scoped_true_v_if_merchantOffers_length_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "offers-list"
  }, [_c('p', {
    staticClass: "offers-list__title"
  }, [_vm._v(_vm._s(_vm.$i18next.t('general.coupon', {
    count: 0
  })))]), _vm._v(" "), _c('div', {
    staticClass: "offers-list__offers"
  }, _vm._l(_vm.merchantOffers, function (offer, index) {
    return _c('Offer', {
      key: index,
      attrs: {
        "offer": offer,
        "merchant": _vm.merchant,
        "parentComponent": _vm.parentComponent
      }
    });
  }), 1)]);
};
var offersListvue_type_template_id_3ba8c40d_scoped_true_v_if_merchantOffers_length_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/offer.vue?vue&type=template&id=6a90b44e&
var offervue_type_template_id_6a90b44e_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "offer"
  }, [_c('p', {
    staticClass: "offer__description"
  }, [_vm._v("\n    " + _vm._s(_vm.offer.description) + "\n    "), _c('br'), _vm._v(" "), _c('span', {
    staticClass: "offer__merchant-reward"
  }, [_vm._v("\n      " + _vm._s(this.merchant.reward) + " " + _vm._s(_vm.$i18next.t('general.cashback')) + "\n    ")])]), _vm._v(" "), _vm.isValidCode ? _c('div', {
    staticClass: "offer__coupon"
  }, [_c('p', {
    staticClass: "coupon__btn",
    on: {
      "click": _vm.activate
    }
  }, [_vm._v("\n      " + _vm._s(_vm.offer.code) + "\n      "), _c('font-awesome-icon', {
    attrs: {
      "icon": ['fas', 'copy']
    }
  })], 1), _vm._v(" "), _vm.showAnimation ? _c('p', {
    staticClass: "coupon__feedback"
  }, [_vm._v("\n      " + _vm._s(_vm.ctaText) + "\n    ")]) : _vm._e()]) : _vm._e()]);
};
var offervue_type_template_id_6a90b44e_staticRenderFns = [];

;// CONCATENATED MODULE: ./source/filters/expire.js



// eslint-disable-next-line func-names
/* harmony default export */ function expire(date) {
  var now = Date.now();
  var expire = new Date(date);
  var days = Math.floor(Math.ceil(expire - now) / 86400000);
  /* eslint-disable */
  if (days > 0 && days < 1) {
    return i18n.t('filters.expire.today');
  } else if (days >= 1 && days < 2) {
    return i18n.t('filters.expire.tomorrow');
  } else if (days >= 2 && days <= 5) {
    return i18n.t('filters.expire.days_left', {
      number_days: days
    });
  } else if (days > 365) {
    return i18n.t('filters.expire.no_date');
  }
  return i18n.t('filters.expire.msg', {
    date: new Date(date).toLocaleDateString(EXPIRE_FORMAT)
  });
  /* eslint-enable */
}
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/offer.vue?vue&type=script&lang=js&







/* harmony default export */ const offervue_type_script_lang_js_ = ({
  props: ['offer', 'merchant', 'parentComponent'],
  data: function data() {
    return {
      copied: false,
      showAnimation: false
    };
  },
  computed: {
    device: function device() {
      return this.$store.state.device;
    },
    isValidCode: function isValidCode() {
      var code = this.offer.code;
      return code && !NO_CODE_PATTERNS.find(function (pattern) {
        return code.includes(pattern);
      });
    },
    ctaText: function ctaText() {
      if (!this.isValidCode) {
        return this.$i18next.t('shared_components.offer.get_deal');
      }
      return !this.copied ? '' : this.$i18next.t('shared_components.offer.copied', {
        coupon: this.$i18next.t('general.coupon', {
          count: 1
        })
      });
    },
    user: function user() {
      return this.$store.state.user;
    },
    flagRedirect: function flagRedirect() {
      return this.$store.state.flagRedirect;
    }
  },
  filters: {
    expire: expire
  },
  methods: {
    hideAnimationAfterDuration: function hideAnimationAfterDuration(duration) {
      var _this = this;
      setTimeout(function () {
        _this.showAnimation = false;
      }, duration);
    },
    activate: function activate() {
      var _this2 = this;
      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var activationUrl, hasBacs, isRequiresBacs;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (_this2.isValidCode) {
                copyToClipBoard(_this2.offer.code);
                _this2.copied = true;
                _this2.showAnimation = true;
                _this2.hideAnimationAfterDuration(COUPON_COPIED_ANIMATION_TIMER);
              }
              activationUrl = _this2.offer.activationUrl;
              hasBacs = _this2.user.hasBacs;
              isRequiresBacs = _this2.merchant.isRequiresBacs;
              if (!_this2.merchant.activated) {
                sendContentMessage({
                  action: 'activate',
                  data: {
                    activationUrl: activationUrl,
                    deeplink: __webpack_require__.g.location.href,
                    newTab: openNewTabCashback(_this2.flagRedirect, isRequiresBacs, hasBacs),
                    merchantId: _this2.merchant.id
                  }
                });
                if (_this2.parentComponent === 'notification') {
                  _this2.$store.dispatch('sendGA', {
                    ec: 'Notification Slider',
                    ea: 'Coupon Activation',
                    el: _this2.merchant.name
                  });
                } else {
                  brodcastChannel.postMessage({
                    type: 'analytics',
                    dataGA: {
                      ec: 'Popup',
                      ea: 'Coupon Activation',
                      el: _this2.merchant.name
                    }
                  });
                }
              }
              if (!(_this2.device === 'desktop')) {
                _context.next = 9;
                break;
              }
              _context.next = 8;
              return asyncTimeout(1000);
            case 8:
              window.close();
            case 9:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    }
  }
});
;// CONCATENATED MODULE: ./source/shared_components/offer.vue?vue&type=script&lang=js&
 /* harmony default export */ const shared_components_offervue_type_script_lang_js_ = (offervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/offer.vue?vue&type=style&index=0&id=6a90b44e&prod&lang=less&
var offervue_type_style_index_0_id_6a90b44e_prod_lang_less_ = __webpack_require__(9504);
;// CONCATENATED MODULE: ./source/shared_components/offer.vue?vue&type=style&index=0&id=6a90b44e&prod&lang=less&

;// CONCATENATED MODULE: ./source/shared_components/offer.vue



;


/* normalize component */

var offer_component = (0,componentNormalizer/* default */.Z)(
  shared_components_offervue_type_script_lang_js_,
  offervue_type_template_id_6a90b44e_render,
  offervue_type_template_id_6a90b44e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const offer = (offer_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/offersList.vue?vue&type=script&lang=js&

/* harmony default export */ const offersListvue_type_script_lang_js_ = ({
  props: ['merchant', 'merchantOffers', 'parentComponent'],
  components: {
    Offer: offer
  }
});
;// CONCATENATED MODULE: ./source/shared_components/offersList.vue?vue&type=script&lang=js&
 /* harmony default export */ const shared_components_offersListvue_type_script_lang_js_ = (offersListvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/offersList.vue?vue&type=style&index=0&id=3ba8c40d&prod&lang=less&scoped=true&
var offersListvue_type_style_index_0_id_3ba8c40d_prod_lang_less_scoped_true_ = __webpack_require__(9341);
;// CONCATENATED MODULE: ./source/shared_components/offersList.vue?vue&type=style&index=0&id=3ba8c40d&prod&lang=less&scoped=true&

;// CONCATENATED MODULE: ./source/shared_components/offersList.vue



;


/* normalize component */

var offersList_component = (0,componentNormalizer/* default */.Z)(
  shared_components_offersListvue_type_script_lang_js_,
  offersListvue_type_template_id_3ba8c40d_scoped_true_v_if_merchantOffers_length_render,
  offersListvue_type_template_id_3ba8c40d_scoped_true_v_if_merchantOffers_length_staticRenderFns,
  false,
  null,
  "3ba8c40d",
  null
  
)

/* harmony default export */ const offersList = (offersList_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/storeInfo.vue?vue&type=script&lang=js&


/* harmony default export */ const storeInfovue_type_script_lang_js_ = ({
  props: ['merchant', 'merchantOffers', 'parentComponent'],
  components: {
    Tiers: tiers,
    OffersList: offersList
  },
  computed: {
    merchantTiers: function merchantTiers() {
      return this.merchant.tiers;
    },
    showMerchant: function showMerchant() {
      return 0;
    }
  }
});
;// CONCATENATED MODULE: ./source/shared_components/storeInfo.vue?vue&type=script&lang=js&
 /* harmony default export */ const shared_components_storeInfovue_type_script_lang_js_ = (storeInfovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/shared_components/storeInfo.vue?vue&type=style&index=0&id=6e21ffd7&prod&lang=less&scoped=true&
var storeInfovue_type_style_index_0_id_6e21ffd7_prod_lang_less_scoped_true_ = __webpack_require__(1544);
;// CONCATENATED MODULE: ./source/shared_components/storeInfo.vue?vue&type=style&index=0&id=6e21ffd7&prod&lang=less&scoped=true&

;// CONCATENATED MODULE: ./source/shared_components/storeInfo.vue



;


/* normalize component */

var storeInfo_component = (0,componentNormalizer/* default */.Z)(
  shared_components_storeInfovue_type_script_lang_js_,
  storeInfovue_type_template_id_6e21ffd7_scoped_true_render,
  storeInfovue_type_template_id_6e21ffd7_scoped_true_staticRenderFns,
  false,
  null,
  "6e21ffd7",
  null
  
)

/* harmony default export */ const storeInfo = (storeInfo_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/storeTerms.vue?vue&type=template&id=0e32f650&
var storeTermsvue_type_template_id_0e32f650_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "store-terms"
  }, [_vm.region == 'us' && (_vm.important || _vm.exclusions) ? [_vm.important ? _c('div', {
    staticClass: "store-terms__text"
  }, [_c('span', [_vm._v(_vm._s(_vm.$i18next.t('popup.components.store_terms.important')) + " ")]), _vm._v(_vm._s(_vm.important) + "\n    ")]) : _vm._e(), _vm._v(" "), _vm.exclusions ? _c('div', {
    staticClass: "store-terms__text",
    "class": _vm.important ? 'store-terms__text_last' : ''
  }, [_vm._v("\n      " + _vm._s(_vm.$i18next.t('popup.components.store_terms.exclusions')) + _vm._s(_vm.exclusions) + "\n    ")]) : _vm._e(), _vm._v(" "), _vm.topCashbackUrl ? _c('div', {
    staticClass: "store-terms__more",
    on: {
      "click": _vm.openStore
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$i18next.t('popup.components.store_terms.more_details_simple')) + "\n    ")]) : _vm._e()] : _c('div', {
    staticClass: "store-terms__text"
  }, [_c('span', [_vm._v("\n      " + _vm._s(_vm.$i18next.t('content.components.store_terms.text.part1')) + "\n    ")]), _vm._v(" "), _vm.topCashbackUrl ? _c('span', {
    staticClass: "store-terms__more",
    on: {
      "click": _vm.openStore
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$i18next.t('content.components.store_terms.text.link')) + "\n    ")]) : _c('span', [_vm._v("\n      " + _vm._s(_vm.$i18next.t('content.components.store_terms.text.link')) + "\n    ")]), _vm._v(" "), _c('span', [_vm._v("\n      " + _vm._s(_vm.$i18next.t('content.components.store_terms.text.part2')) + "\n    ")])])], 2);
};
var storeTermsvue_type_template_id_0e32f650_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/storeTerms.vue?vue&type=script&lang=js&

/* harmony default export */ const storeTermsvue_type_script_lang_js_ = ({
  props: ['important', 'exclusions', 'topCashbackUrl'],
  data: function data() {
    return {
      region: REGION
    };
  },
  methods: {
    openStore: function openStore() {
      window.open(this.topCashbackUrl, '_blank');
    }
  }
});
;// CONCATENATED MODULE: ./source/popup/components/storeTerms.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_storeTermsvue_type_script_lang_js_ = (storeTermsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/storeTerms.vue?vue&type=style&index=0&id=0e32f650&prod&lang=less&
var storeTermsvue_type_style_index_0_id_0e32f650_prod_lang_less_ = __webpack_require__(9054);
;// CONCATENATED MODULE: ./source/popup/components/storeTerms.vue?vue&type=style&index=0&id=0e32f650&prod&lang=less&

;// CONCATENATED MODULE: ./source/popup/components/storeTerms.vue



;


/* normalize component */

var storeTerms_component = (0,componentNormalizer/* default */.Z)(
  components_storeTermsvue_type_script_lang_js_,
  storeTermsvue_type_template_id_0e32f650_render,
  storeTermsvue_type_template_id_0e32f650_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const storeTerms = (storeTerms_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/storeTab/storeTab.vue?vue&type=script&lang=js&



/* harmony default export */ const storeTabvue_type_script_lang_js_ = ({
  components: {
    StoreInfo: storeInfo,
    StoreTerms: storeTerms
  },
  data: function data() {
    return {
      region: REGION
    };
  },
  computed: {
    merchant: function merchant() {
      return this.$store.state.merchant;
    },
    merchantOffers: function merchantOffers() {
      var offers = this.merchant.offers;
      if (!offers) {
        return [];
      }
      offers.sort(function (a, b) {
        var aCode = !!(a.code && !NO_CODE_PATTERNS.find(function (pattern) {
          return a.code.includes(pattern);
        }));
        var bCode = !!(b.code && !NO_CODE_PATTERNS.find(function (pattern) {
          return b.code.includes(pattern);
        }));
        return bCode - aCode;
      });
      return offers;
    },
    important: function important() {
      return this.merchant.info && this.merchant.info.important;
    },
    exclusions: function exclusions() {
      return this.merchant.info && this.merchant.info.exclusions;
    }
  }
});
;// CONCATENATED MODULE: ./source/popup/components/storeTab/storeTab.vue?vue&type=script&lang=js&
 /* harmony default export */ const storeTab_storeTabvue_type_script_lang_js_ = (storeTabvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./source/popup/components/storeTab/storeTab.vue





/* normalize component */
;
var storeTab_component = (0,componentNormalizer/* default */.Z)(
  storeTab_storeTabvue_type_script_lang_js_,
  storeTabvue_type_template_id_987cd0a8_render,
  storeTabvue_type_template_id_987cd0a8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const storeTab = (storeTab_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/footer.vue?vue&type=template&id=c3a53a12&
var footervue_type_template_id_c3a53a12_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    "class": ['footer', !_vm.loggedIn && 'footer--notLoggedIn']
  }, [_c('div', {
    staticClass: "footer__item footer__item__left",
    on: {
      "click": function click($event) {
        return _vm.openPage('account');
      }
    }
  }, [_vm._v("\n    " + _vm._s(_vm.$i18next.t('popup.components.footer.my_account')) + "\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "footer__item",
    on: {
      "click": function click($event) {
        return _vm.openOptions();
      }
    }
  }, [_vm._v("\n    " + _vm._s(_vm.$i18next.t('popup.components.footer.settings')) + "\n  ")])]);
};
var footervue_type_template_id_c3a53a12_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/footer.vue?vue&type=script&lang=js&


/* harmony default export */ const footervue_type_script_lang_js_ = ({
  props: {
    loggedIn: Boolean
  },
  data: function data() {
    return {
      ACCOUNT_PAGE_URL: ACCOUNT_PAGE_URL,
      TELL_A_FRIEND_PAGE_URL: TELL_A_FRIEND_PAGE_URL
    };
  },
  methods: {
    openPage: function openPage(name) {
      var urls = {
        account: ACCOUNT_PAGE_URL
      };
      brodcastChannel.postMessage({
        type: 'analytics',
        dataGA: {
          ec: 'Popup',
          ea: 'Open URL',
          el: urls[name]
        }
      });
      chrome.tabs.create({
        url: urls[name]
      });
      if (!this.isAutomationTest()) window.close();
    },
    isAutomationTest: function isAutomationTest() {
      return window.location.href.includes('automation_testing=true') && IS_TEST_VERSION;
    },
    openOptions: function openOptions() {
      chrome.runtime.openOptionsPage();
      brodcastChannel.postMessage({
        type: 'analytics',
        dataGA: {
          ec: 'Popup',
          ea: 'Open Settings'
        }
      });
      if (!this.isAutomationTest()) window.close();
    }
  }
});
;// CONCATENATED MODULE: ./source/popup/components/footer.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_footervue_type_script_lang_js_ = (footervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/footer.vue?vue&type=style&index=0&id=c3a53a12&prod&lang=less&
var footervue_type_style_index_0_id_c3a53a12_prod_lang_less_ = __webpack_require__(366);
;// CONCATENATED MODULE: ./source/popup/components/footer.vue?vue&type=style&index=0&id=c3a53a12&prod&lang=less&

;// CONCATENATED MODULE: ./source/popup/components/footer.vue



;


/* normalize component */

var footer_component = (0,componentNormalizer/* default */.Z)(
  components_footervue_type_script_lang_js_,
  footervue_type_template_id_c3a53a12_render,
  footervue_type_template_id_c3a53a12_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const footer = (footer_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/welcome.vue?vue&type=template&id=f458a826&
var welcomevue_type_template_id_f458a826_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "welcome"
  }, [_c('div', {
    staticClass: "welcome__header"
  }, [_c('div', {
    staticClass: "welcome__tcb-logo"
  }), _vm._v(" "), _c('div', {
    staticClass: "welcome__text"
  }, [_vm._v(" " + _vm._s(_vm.$i18next.t('popup.components.welcome.text')))])]), _vm._v(" "), _vm.privateMode ? _c('div', {
    staticClass: "welcome__button--private"
  }, [_vm._v(_vm._s(_vm.$i18next.t('popup.components.welcome.private_mode')))]) : _c('div', {
    staticClass: "cta welcome__button",
    on: {
      "click": function click($event) {
        return _vm.openPage();
      }
    }
  }, [_vm._v(_vm._s(_vm.$i18next.t('popup.components.welcome.button')))])]);
};
var welcomevue_type_template_id_f458a826_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/welcome.vue?vue&type=script&lang=js&


/* harmony default export */ const welcomevue_type_script_lang_js_ = ({
  props: ['privateMode'],
  data: function data() {
    return {
      joinUrl: JOIN_PAGE_URL
    };
  },
  methods: {
    openPage: function openPage() {
      brodcastChannel.postMessage({
        type: 'analytics',
        dataGA: {
          ec: 'Popup',
          ea: 'Open URL',
          el: this.joinUrl
        }
      });
      chrome.tabs.create({
        url: this.joinUrl
      });
      if (!this.isAutomationTest()) window.close();
    },
    isAutomationTest: function isAutomationTest() {
      return window.location.href.includes('automation_testing=true') && IS_TEST_VERSION;
    }
  }
});
;// CONCATENATED MODULE: ./source/popup/components/welcome.vue?vue&type=script&lang=js&
 /* harmony default export */ const components_welcomevue_type_script_lang_js_ = (welcomevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/welcome.vue?vue&type=style&index=0&id=f458a826&prod&lang=less&
var welcomevue_type_style_index_0_id_f458a826_prod_lang_less_ = __webpack_require__(2277);
;// CONCATENATED MODULE: ./source/popup/components/welcome.vue?vue&type=style&index=0&id=f458a826&prod&lang=less&

;// CONCATENATED MODULE: ./source/popup/components/welcome.vue



;


/* normalize component */

var welcome_component = (0,componentNormalizer/* default */.Z)(
  components_welcomevue_type_script_lang_js_,
  welcomevue_type_template_id_f458a826_render,
  welcomevue_type_template_id_f458a826_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const welcome = (welcome_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/mobile/welcomeMobile.vue?vue&type=template&id=0735fd9a&
var welcomeMobilevue_type_template_id_0735fd9a_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "welcome welcome--mobile popup__content"
  }, [_c('div', {
    staticClass: "welcome__text"
  }, [_vm._v(" " + _vm._s(_vm.$i18next.t('popup.components.welcome.text')))]), _vm._v(" "), _vm.privateMode ? _c('div', {
    staticClass: "welcome__button--private"
  }, [_vm._v(_vm._s(_vm.$i18next.t('popup.components.welcome.private_mode')))]) : _c('div', {
    staticClass: "cta welcome__button",
    on: {
      "click": function click($event) {
        return _vm.openPage();
      }
    }
  }, [_vm._v(_vm._s(_vm.$i18next.t('popup.components.welcome.button')))])]);
};
var welcomeMobilevue_type_template_id_0735fd9a_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/mobile/welcomeMobile.vue?vue&type=script&lang=js&


/* harmony default export */ const welcomeMobilevue_type_script_lang_js_ = ({
  props: ['privateMode'],
  data: function data() {
    return {
      joinUrl: JOIN_PAGE_URL
    };
  },
  methods: {
    openPage: function openPage() {
      brodcastChannel.postMessage({
        type: 'analytics',
        dataGA: {
          ec: 'Popup',
          ea: 'Open URL',
          el: this.joinUrl
        }
      });
      chrome.tabs.create({
        url: this.joinUrl
      });
      window.close();
    }
  }
});
;// CONCATENATED MODULE: ./source/popup/components/mobile/welcomeMobile.vue?vue&type=script&lang=js&
 /* harmony default export */ const mobile_welcomeMobilevue_type_script_lang_js_ = (welcomeMobilevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/mobile/welcomeMobile.vue?vue&type=style&index=0&id=0735fd9a&prod&lang=less&
var welcomeMobilevue_type_style_index_0_id_0735fd9a_prod_lang_less_ = __webpack_require__(2516);
;// CONCATENATED MODULE: ./source/popup/components/mobile/welcomeMobile.vue?vue&type=style&index=0&id=0735fd9a&prod&lang=less&

;// CONCATENATED MODULE: ./source/popup/components/mobile/welcomeMobile.vue



;


/* normalize component */

var welcomeMobile_component = (0,componentNormalizer/* default */.Z)(
  mobile_welcomeMobilevue_type_script_lang_js_,
  welcomeMobilevue_type_template_id_0735fd9a_render,
  welcomeMobilevue_type_template_id_0735fd9a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const welcomeMobile = (welcomeMobile_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/mobile/merchantContentMobile.vue?vue&type=template&id=1be77e94&
var merchantContentMobilevue_type_template_id_1be77e94_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "tcb-merchant-content-mobile"
  }, [_c('img', {
    staticClass: "tcb-merchant-content-mobile__logo",
    attrs: {
      "src": _vm.merchant.logo
    }
  }), _vm._v(" "), _c('div', {
    "class": ['tcb-merchant-content-mobile__content']
  }, [_c('h4', {
    staticClass: "merchant-content-mobile__name"
  }, [_vm._v(_vm._s(_vm.merchant.name))]), _vm._v(" "), _vm.loggedIn ? [_vm.merchant.activated ? _c('h4', {
    staticClass: "merchant-content-mobile__cashback-activated"
  }, [_vm._v("\n        " + _vm._s(_vm.$i18next.t('content.components.notification.title_activated', {
    reward: _vm.merchant.reward,
    promotedText: _vm.promotedText
  })) + "\n      ")]) : _c('div', {
    staticClass: "cta merchant-content-mobile__button",
    on: {
      "click": _vm.activate
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$i18next.t('popup.components.header.activate', {
    reward: _vm.merchant.reward,
    promotedText: _vm.promotedText
  })) + "\n      ")])] : [_c('p', {
    staticClass: "merchant-content-mobile__description"
  }, [_vm._v(_vm._s(_vm.$i18next.t('content.components.notification.button_title', {
    reward: _vm.merchant.reward.toLowerCase(),
    promotedText: _vm.promotedText
  })))]), _vm._v(" "), _c('div', {
    staticClass: "cta merchant-content-mobile__button",
    on: {
      "click": function click($event) {
        return _vm.openPage();
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$i18next.t('popup.components.welcome.button')) + "\n      ")])]], 2), _vm._v(" "), _c('div', {
    "class": ['tcb-merchant-content-mobile__details']
  }, [_c('div', {
    staticClass: "tcb-merchant-details__show-btn",
    on: {
      "click": function click($event) {
        _vm.showDetails = !_vm.showDetails;
      }
    }
  }, [_c('img', {
    staticClass: "show-btn__arrow",
    "class": {
      rotate: _vm.showDetails
    },
    attrs: {
      "src": __webpack_require__(2338)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "show-btn__text"
  }, [_vm._v(_vm._s(_vm.$i18next.t('content.components.notification.more_details')))])]), _vm._v(" "), _c('div', {
    staticClass: "tcb-merchant-details__content",
    "class": {
      'tcb-merchant-details__content--expanded': _vm.showDetails
    }
  }, [_c('store-info', {
    attrs: {
      "merchant": _vm.merchant,
      "merchantOffers": _vm.merchantOffers
    }
  }), _vm._v(" "), _c('store-terms-mobile', {
    attrs: {
      "important": _vm.region == 'us' ? _vm.important : null,
      "exclusions": _vm.region == 'us' ? _vm.exclusions : null,
      "topCashbackUrl": _vm.merchant.topCashbackUrl
    }
  })], 1)])]);
};
var merchantContentMobilevue_type_template_id_1be77e94_staticRenderFns = [];

;// CONCATENATED MODULE: ./source/popup/components/mobile/merchantContentMobile.vue?vue&type=template&id=1be77e94&

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/mobile/storeTermsMobile.vue?vue&type=template&id=3e2c0113&
var storeTermsMobilevue_type_template_id_3e2c0113_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "store-terms store-terms--mobile"
  }, [_vm.region == 'us' && (_vm.important || _vm.exclusions) ? [_vm.important ? _c('div', {
    staticClass: "store-terms__text"
  }, [_c('span', [_vm._v(_vm._s(_vm.$i18next.t('popup.components.store_terms.important')) + " ")]), _vm._v(_vm._s(_vm.important) + "\n    ")]) : _vm._e(), _vm._v(" "), _vm.exclusions ? _c('div', {
    staticClass: "store-terms__text",
    "class": _vm.important ? 'store-terms__text_last' : ''
  }, [_vm._v("\n      " + _vm._s(_vm.$i18next.t('popup.components.store_terms.exclusions')) + _vm._s(_vm.exclusions) + "\n    ")]) : _vm._e(), _vm._v(" "), _vm.topCashbackUrl ? _c('div', {
    staticClass: "store-terms__more",
    on: {
      "click": _vm.openStore
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$i18next.t('popup.components.store_terms.more_details_simple')) + "\n    ")]) : _vm._e()] : _c('div', {
    staticClass: "store-terms__text"
  }, [_c('span', [_vm._v("\n      " + _vm._s(_vm.$i18next.t('content.components.store_terms.text.part1')) + "\n    ")]), _vm._v(" "), _vm.topCashbackUrl ? _c('span', {
    staticClass: "store-terms__more",
    on: {
      "click": _vm.openStore
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$i18next.t('content.components.store_terms.text.link')) + "\n    ")]) : _c('span', [_vm._v("\n      " + _vm._s(_vm.$i18next.t('content.components.store_terms.text.link')) + "\n    ")]), _vm._v(" "), _c('span', [_vm._v("\n      " + _vm._s(_vm.$i18next.t('content.components.store_terms.text.part2')) + "\n    ")])])], 2);
};
var storeTermsMobilevue_type_template_id_3e2c0113_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/mobile/storeTermsMobile.vue?vue&type=script&lang=js&

/* harmony default export */ const storeTermsMobilevue_type_script_lang_js_ = ({
  props: ['important', 'exclusions', 'topCashbackUrl'],
  data: function data() {
    return {
      region: REGION
    };
  },
  methods: {
    openStore: function openStore() {
      window.open(this.topCashbackUrl, '_blank');
    }
  }
});
;// CONCATENATED MODULE: ./source/popup/components/mobile/storeTermsMobile.vue?vue&type=script&lang=js&
 /* harmony default export */ const mobile_storeTermsMobilevue_type_script_lang_js_ = (storeTermsMobilevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/mobile/storeTermsMobile.vue?vue&type=style&index=0&id=3e2c0113&prod&lang=less&
var storeTermsMobilevue_type_style_index_0_id_3e2c0113_prod_lang_less_ = __webpack_require__(964);
;// CONCATENATED MODULE: ./source/popup/components/mobile/storeTermsMobile.vue?vue&type=style&index=0&id=3e2c0113&prod&lang=less&

;// CONCATENATED MODULE: ./source/popup/components/mobile/storeTermsMobile.vue



;


/* normalize component */

var storeTermsMobile_component = (0,componentNormalizer/* default */.Z)(
  mobile_storeTermsMobilevue_type_script_lang_js_,
  storeTermsMobilevue_type_template_id_3e2c0113_render,
  storeTermsMobilevue_type_template_id_3e2c0113_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const storeTermsMobile = (storeTermsMobile_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/mobile/merchantContentMobile.vue?vue&type=script&lang=js&









/* harmony default export */ const merchantContentMobilevue_type_script_lang_js_ = ({
  props: ['merchant', 'loggedIn', 'user'],
  data: function data() {
    return {
      joinUrl: JOIN_PAGE_URL,
      showDetails: true,
      region: REGION
    };
  },
  components: {
    StoreInfo: storeInfo,
    StoreTermsMobile: storeTermsMobile
  },
  methods: {
    openPage: function openPage() {
      brodcastChannel.postMessage({
        type: 'analytics',
        dataGA: {
          ec: 'Popup',
          ea: 'Open URL',
          el: this.joinUrl
        }
      });
      chrome.tabs.create({
        url: this.joinUrl
      });
      window.close();
    },
    activate: function activate() {
      var _this = this;
      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var _this$merchant, activationUrl, name, id, isRequiresBacs, tab;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this$merchant = _this.merchant, activationUrl = _this$merchant.activationUrl, name = _this$merchant.name, id = _this$merchant.id, isRequiresBacs = _this$merchant.isRequiresBacs;
              _context.next = 3;
              return utils_getActiveTab();
            case 3:
              tab = _context.sent;
              brodcastChannel.postMessage({
                type: 'analytics',
                dataGA: {
                  ec: 'Popup',
                  ea: 'Activation',
                  el: name
                }
              });
              brodcastChannel.postMessage({
                type: 'activate',
                dataActivate: {
                  activationUrl: activationUrl,
                  deeplink: tab.url,
                  newTab: openNewTabCashback(_this.flagRedirect, isRequiresBacs, _this.user.hasBacs),
                  merchantId: id
                },
                sender: {
                  tab: tab
                }
              });
              window.close();
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    }
  },
  computed: {
    promotedText: function promotedText() {
      var _this2 = this;
      var text = "".concat(i18n.t('content.components.notification.promoted_text'));
      if (!AVIOS_MERCHANTS.length) return text;
      AVIOS_MERCHANTS.forEach(function (merchant) {
        if (_this2.merchant.domain.includes(merchant)) {
          text = 'avios';
        }
      });
      return text;
    },
    merchantOffers: function merchantOffers() {
      var offers = this.merchant.offers;
      offers.sort(function (a, b) {
        var aCode = !!(a.code && !NO_CODE_PATTERNS.find(function (pattern) {
          return a.code.includes(pattern);
        }));
        var bCode = !!(b.code && !NO_CODE_PATTERNS.find(function (pattern) {
          return b.code.includes(pattern);
        }));
        return bCode - aCode;
      });
      return offers;
    },
    flagRedirect: function flagRedirect() {
      return this.$store.state.flagRedirect;
    }
  }
});
;// CONCATENATED MODULE: ./source/popup/components/mobile/merchantContentMobile.vue?vue&type=script&lang=js&
 /* harmony default export */ const mobile_merchantContentMobilevue_type_script_lang_js_ = (merchantContentMobilevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/mobile/merchantContentMobile.vue?vue&type=style&index=0&id=1be77e94&prod&lang=less&
var merchantContentMobilevue_type_style_index_0_id_1be77e94_prod_lang_less_ = __webpack_require__(2532);
;// CONCATENATED MODULE: ./source/popup/components/mobile/merchantContentMobile.vue?vue&type=style&index=0&id=1be77e94&prod&lang=less&

;// CONCATENATED MODULE: ./source/popup/components/mobile/merchantContentMobile.vue



;


/* normalize component */

var merchantContentMobile_component = (0,componentNormalizer/* default */.Z)(
  mobile_merchantContentMobilevue_type_script_lang_js_,
  merchantContentMobilevue_type_template_id_1be77e94_render,
  merchantContentMobilevue_type_template_id_1be77e94_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const merchantContentMobile = (merchantContentMobile_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/mobile/storeListItemMobile.vue?vue&type=template&id=4ec8a10f&
var storeListItemMobilevue_type_template_id_4ec8a10f_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    "class": ['store_mobile'],
    on: {
      "click": _vm.activate,
      "mouseover": function mouseover($event) {
        _vm.hover = true;
      },
      "mouseleave": function mouseleave($event) {
        _vm.hover = false;
      }
    }
  }, [_c('div', [_c('p', {
    staticClass: "store__name"
  }, [_vm._v(_vm._s(_vm.merchant.name))]), _vm._v(" "), _c('p', {
    staticClass: "store__reward"
  }, [_vm._v(_vm._s(_vm.merchant.reward) + "\n      "), _vm.getMerchant.couponsAmount > 0 ? _c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.topDealsCoupons)
    }
  }) : _vm._e()])]), _vm._v(" "), _c('img', {
    staticClass: "store__img",
    attrs: {
      "src": _vm.merchant.logo
    }
  })]);
};
var storeListItemMobilevue_type_template_id_4ec8a10f_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/mobile/storeListItemMobile.vue?vue&type=script&lang=js&







/* harmony default export */ const storeListItemMobilevue_type_script_lang_js_ = ({
  props: ['merchant', 'infoType'],
  filters: {
    reward: reward
  },
  data: function data() {
    return {
      hover: false
    };
  },
  computed: {
    getMerchant: function getMerchant() {
      var id = new URLSearchParams(this.merchant.activationUrl).get('mpid');
      var merchant = this.$store.state.merchants.find(function (s) {
        return "".concat(s.id) === id;
      });
      return merchant;
    },
    topDealsCoupons: function topDealsCoupons() {
      return purify.sanitize(i18n.t('popup.components.store_tab.best_deals_vouchers', {
        count: this.getMerchant.couponsAmount
      }));
    }
  },
  methods: {
    activate: function activate() {
      var _this = this;
      return (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var activationUrl, tab;
        return regenerator_default().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              activationUrl = _this.merchant.activationUrl;
              _context.next = 3;
              return utils_getActiveTab();
            case 3:
              tab = _context.sent;
              brodcastChannel.postMessage({
                type: 'analytics',
                dataGA: {
                  ec: 'Popup',
                  ea: _this.infoType === 'offer' ? 'Best Deal Activation' : 'Recently Visited Store Activation',
                  el: _this.merchant.name
                }
              });
              brodcastChannel.postMessage({
                type: 'activate',
                dataActivate: {
                  activationUrl: activationUrl
                },
                sender: {
                  tab: tab
                }
              });
              window.close();
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    }
  }
});
;// CONCATENATED MODULE: ./source/popup/components/mobile/storeListItemMobile.vue?vue&type=script&lang=js&
 /* harmony default export */ const mobile_storeListItemMobilevue_type_script_lang_js_ = (storeListItemMobilevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/components/mobile/storeListItemMobile.vue?vue&type=style&index=0&id=4ec8a10f&prod&lang=less&
var storeListItemMobilevue_type_style_index_0_id_4ec8a10f_prod_lang_less_ = __webpack_require__(275);
;// CONCATENATED MODULE: ./source/popup/components/mobile/storeListItemMobile.vue?vue&type=style&index=0&id=4ec8a10f&prod&lang=less&

;// CONCATENATED MODULE: ./source/popup/components/mobile/storeListItemMobile.vue



;


/* normalize component */

var storeListItemMobile_component = (0,componentNormalizer/* default */.Z)(
  mobile_storeListItemMobilevue_type_script_lang_js_,
  storeListItemMobilevue_type_template_id_4ec8a10f_render,
  storeListItemMobilevue_type_template_id_4ec8a10f_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const storeListItemMobile = (storeListItemMobile_component.exports);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/app.vue?vue&type=script&lang=js&

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,defineProperty/* default */.Z)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }












/* harmony default export */ const appvue_type_script_lang_js_ = ({
  components: {
    Welcome: welcome,
    VHeader: header,
    Navigation: navigation,
    offersTab: offersTab,
    recentTab: recentTab,
    storeTab: storeTab,
    VFooter: footer,
    WelcomeMobile: welcomeMobile,
    MerchantContentMobile: merchantContentMobile,
    StoreListItemMobile: storeListItemMobile
  },
  data: function data() {
    return {
      transition: null
    };
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex_esm/* mapState */.rn)({
    status: function status(state) {
      return state.status;
    },
    currentTab: function currentTab(state) {
      return state.currentTab;
    },
    merchants: function merchants(state) {
      return state.merchants;
    },
    merchant: function merchant(state) {
      return state.merchant;
    },
    privateMode: function privateMode(state) {
      return state.privateMode;
    },
    loggedIn: function loggedIn(state) {
      return state.loggedIn;
    },
    user: function user(state) {
      return state.user;
    }
  })), {}, {
    device: function device() {
      return this.$store.state.device;
    },
    tabs: function tabs() {
      return this.merchant ? {
        store: "".concat(i18n.t('popup.app.store_title')),
        offers: "".concat(i18n.t('popup.app.offers_title'))
      } : {
        offers: "".concat(i18n.t('popup.app.offers_title')),
        recent: "".concat(i18n.t('popup.app.recent_title'))
      };
    },
    topOffers: function topOffers() {
      return this.$store.state.topOffers;
    }
  })
});
;// CONCATENATED MODULE: ./source/popup/app.vue?vue&type=script&lang=js&
 /* harmony default export */ const popup_appvue_type_script_lang_js_ = (appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/less-loader/dist/cjs.js!./node_modules/vue-loader/lib/index.js??vue-loader-options!./source/popup/app.vue?vue&type=style&index=0&id=38ea541a&prod&lang=less&
var appvue_type_style_index_0_id_38ea541a_prod_lang_less_ = __webpack_require__(1930);
;// CONCATENATED MODULE: ./source/popup/app.vue?vue&type=style&index=0&id=38ea541a&prod&lang=less&

;// CONCATENATED MODULE: ./source/popup/app.vue



;


/* normalize component */

var app_component = (0,componentNormalizer/* default */.Z)(
  popup_appvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ const app = (app_component.exports);
// EXTERNAL MODULE: ./node_modules/@fortawesome/fontawesome-svg-core/index.mjs
var fontawesome_svg_core = __webpack_require__(3636);
// EXTERNAL MODULE: ./node_modules/@fortawesome/free-solid-svg-icons/index.mjs
var free_solid_svg_icons = __webpack_require__(9417);
// EXTERNAL MODULE: ./node_modules/@fortawesome/free-regular-svg-icons/index.mjs
var free_regular_svg_icons = __webpack_require__(4288);
;// CONCATENATED MODULE: ./source/fontAwesomeIcons.js
/* eslint-disable import/no-extraneous-dependencies */



/* harmony default export */ const fontAwesomeIcons = ({
  init: function init() {
    fontawesome_svg_core/* library */.vI.add(free_solid_svg_icons/* faCopy */.kZ_, free_regular_svg_icons/* faCircleCheck */.fV7);
  }
});
;// CONCATENATED MODULE: ./source/popup/app.js



// eslint-disable-next-line import/no-extraneous-dependencies

// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies








// import { getStorageData } from '../utils';

fontAwesomeIcons.init();
vue_common_prod_default().component('font-awesome-icon', index_es/* FontAwesomeIcon */.GN);
vue_common_prod_default().use(vuex_esm/* default */.ZP);
vue_common_prod_default().use((vuebar_default()));
(vue_common_prod_default()).prototype.$i18next = i18n;
// Vue.prototype.$device = await getStorageData('device');

document.addEventListener('DOMContentLoaded', function () {
  /* eslint-disable */

  // eslint-disable-next-line no-underscore-dangle
  if (ROLLBAR_ACTIVE) {
    rollbar_umd_min_default().init(rollbarConfig(ROLLBAR_KEY_POPUP, 'popup'));
  }
  sendContentMessage({
    action: 'sendAnalytics',
    data: {
      ec: 'Popup',
      ea: 'Open'
    }
  });
  new (vue_common_prod_default())({
    el: document.querySelector('#app'),
    store: new vuex_esm/* default.Store */.ZP.Store(store),
    created: function created() {
      this.$store.dispatch('init');
    },
    render: function render(h) {
      return h(app);
    }
  });
  /* eslint-enable */
});

/***/ }),

/***/ 6538:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 3355:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 5564:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 4198:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 4554:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 67:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1034:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1654:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 8408:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 8268:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 7339:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 4932:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 5455:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1706:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 9097:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 5193:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 6682:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 2517:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 6044:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 5819:
/***/ (() => {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 1930:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6538);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("929152dc", content, true, {});

/***/ }),

/***/ 366:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3355);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("1d927932", content, true, {});

/***/ }),

/***/ 404:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5564);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("50b236f6", content, true, {});

/***/ }),

/***/ 2532:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4198);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("396ba074", content, true, {});

/***/ }),

/***/ 275:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4554);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("2fd05768", content, true, {});

/***/ }),

/***/ 964:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(67);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("450851f2", content, true, {});

/***/ }),

/***/ 2516:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1034);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("70269645", content, true, {});

/***/ }),

/***/ 429:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1654);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("3656e8d4", content, true, {});

/***/ }),

/***/ 5192:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8408);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("230acaca", content, true, {});

/***/ }),

/***/ 4025:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8268);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("cdba3aac", content, true, {});

/***/ }),

/***/ 109:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7339);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("75d385e4", content, true, {});

/***/ }),

/***/ 1815:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4932);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("ae900e6a", content, true, {});

/***/ }),

/***/ 7919:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5455);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("ae6b6ae2", content, true, {});

/***/ }),

/***/ 9054:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1706);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("0da4575e", content, true, {});

/***/ }),

/***/ 2277:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9097);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("549e3a96", content, true, {});

/***/ }),

/***/ 9504:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5193);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("456bad52", content, true, {});

/***/ }),

/***/ 9341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6682);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("279b85ac", content, true, {});

/***/ }),

/***/ 1544:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2517);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("060984d4", content, true, {});

/***/ }),

/***/ 7341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6044);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("c1379618", content, true, {});

/***/ }),

/***/ 6816:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5819);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(7913)/* ["default"] */ .Z)
var update = add("bcaa75aa", content, true, {});

/***/ }),

/***/ 2338:
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNiIgdmlld0JveD0iMCAwIDEwIDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik05Ljg1MTc1IDEuNTM1NzVDMTAuMDUwOCAxLjM0Njc1IDEwLjA1MDggMS4wMzk3NSA5Ljg1MTc1IDAuODUxNzVMOS4xMzQ3NSAwLjE2ODc1QzguOTM3NzUgLTAuMDIxMjUgOC42MTY3NSAtMC4wMjEyNSA4LjQxOTc1IDAuMTY4NzVMNS4wMTU3NSAzLjQ2Mzc1TDEuNTgxNzUgMC4xNDE3NUMxLjM4Mjc1IC0wLjA0NzI1IDEuMDYxNzUgLTAuMDQ3MjUgMC44NjQ3NSAwLjE0MTc1TDAuMTQ3NzUgMC44MjQ3NUMtMC4wNDkyNSAxLjAxMjc1IC0wLjA0OTI1IDEuMzE4NzUgMC4xNDc3NSAxLjUwODc1TDQuNjU1NzUgNS44NTg3NUM0Ljg1NDc1IDYuMDQ2NzUgNS4xNzU3NSA2LjA0Njc1IDUuMzcyNzUgNS44NTg3NUw5Ljg1MTc1IDEuNTM1NzVaIiBmaWxsPSIjQTBBMEEwIi8+Cjwvc3ZnPgo=";

/***/ }),

/***/ 6922:
/***/ ((module) => {

"use strict";
module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjM4Ljk1IDcwLjI3Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojMDE1OTQyO30uYntmaWxsOiNlZDFiNWI7fS5je2ZpbGw6IzFkZmM1MTt9LmR7ZmlsbDp1cmwoI2EpO30uZXtmaWxsOnVybCgjYik7fS5me2ZpbGw6dXJsKCNjKTt9LmcsLmgsLmksLmssLmwsLm17b3BhY2l0eTowLjM7fS5nLC5oLC5pLC5rLC5sLC5tLC5wLC5xe2lzb2xhdGlvbjppc29sYXRlO30uZ3tmaWxsOnVybCgjZCk7fS5oe2ZpbGw6dXJsKCNlKTt9Lml7ZmlsbDp1cmwoI2YpO30uantmaWxsOnVybCgjZyk7fS5re2ZpbGw6dXJsKCNoKTt9Lmx7ZmlsbDp1cmwoI2kpO30ubXtmaWxsOnVybCgjaik7fS5ue2ZpbGw6dXJsKCNrKTt9Lm97ZmlsbDojZmZmO30ucCwucXtvcGFjaXR5OjAuODt9LnB7ZmlsbDp1cmwoI2wpO30ucXtmaWxsOnVybCgjbSk7fS5ye2ZpbGw6dXJsKCNuKTt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIyNDAzLjc0IiB5MT0iMzUzLjUiIHgyPSIyNDE5Ljc4IiB5Mj0iMzkxLjg3IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAuOTgsIDAuMTksIC0wLjE5LCAwLjk4LCAtMjI2MS41NSwgLTc2MS44MykiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxZGZjNTEiLz48c3RvcCBvZmZzZXQ9IjAuMiIgc3RvcC1jb2xvcj0iIzI1ZDI0ZSIvPjxzdG9wIG9mZnNldD0iMC41NCIgc3RvcC1jb2xvcj0iIzMzODE0OCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAxNTk0MiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iLTM2ODMiIHkxPSI5NTAuMzkiIHgyPSItMzY1OC40NiIgeTI9IjkyNy41IiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KC0xLCAwLCAwLCAxLCAtMzY0MS4yMSwgLTkyNy45NCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNlODNhOTUiLz48c3RvcCBvZmZzZXQ9IjAuMDgiIHN0b3AtY29sb3I9IiNlZDY0YWMiLz48c3RvcCBvZmZzZXQ9IjAuMjUiIHN0b3AtY29sb3I9IiNmOWNlZTUiLz48c3RvcCBvZmZzZXQ9IjAuMzMiIHN0b3AtY29sb3I9IiNmZmYiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYyIgeDE9Ii0zNjgyLjk0IiB5MT0iOTUwLjQ2IiB4Mj0iLTM2NTguMzkiIHkyPSI5MjcuNTciIHhsaW5rOmhyZWY9IiNiIi8+PGxpbmVhckdyYWRpZW50IGlkPSJkIiB4MT0iMTcuNDQiIHkxPSI5MzYuODIiIHgyPSIxMy40OSIgeTI9Ijk0OS40MSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIC05MjcuOTQpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwLjQ5IiBzdG9wLWNvbG9yPSIjMWRmYzUxIi8+PHN0b3Agb2Zmc2V0PSIwLjYzIiBzdG9wLWNvbG9yPSIjMTZkMjRkIi8+PHN0b3Agb2Zmc2V0PSIwLjkzIiBzdG9wLWNvbG9yPSIjMDQ2ODQ0Ii8+PHN0b3Agb2Zmc2V0PSIwLjk3IiBzdG9wLWNvbG9yPSIjMDE1OTQyIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImUiIHgxPSIyMi4wOSIgeTE9IjkzOS4wMyIgeDI9IjEyLjk0IiB5Mj0iOTQ4LjcxIiB4bGluazpocmVmPSIjZCIvPjxsaW5lYXJHcmFkaWVudCBpZD0iZiIgeDE9IjE5Ljc3IiB5MT0iOTQxLjQ4IiB4Mj0iMTIuMDkiIHkyPSI5NDkuNjEiIHhsaW5rOmhyZWY9IiNkIi8+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMjkuODQiIHkxPSI5NDUuOTEiIHgyPSIzNi4xOSIgeTI9Ijk5NC40OCIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIC05MjcuOTQpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDE1OTQyIi8+PHN0b3Agb2Zmc2V0PSIwLjI2IiBzdG9wLWNvbG9yPSIjMDE0NjJkIi8+PHN0b3Agb2Zmc2V0PSIwLjgxIiBzdG9wLWNvbG9yPSIjMDAyMTAzIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImgiIHgxPSIxMC40MiIgeTE9Ijk1MS45MyIgeDI9IjIzLjM4IiB5Mj0iOTM2LjE2IiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTkyNy45NCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMTU5NDIiLz48c3RvcCBvZmZzZXQ9IjAuMjgiIHN0b3AtY29sb3I9IiMzNzkxNDUiLz48c3RvcCBvZmZzZXQ9IjAuNTEiIHN0b3AtY29sb3I9IiM2MGJiNDciLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iaSIgeDE9IjEwLjQyIiB5MT0iOTUxLjkzIiB4Mj0iMjMuMzgiIHkyPSI5MzYuMTYiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtOTI3Ljk0KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzAxNTk0MiIvPjxzdG9wIG9mZnNldD0iMC4wNCIgc3RvcC1jb2xvcj0iIzA0Njg0NCIvPjxzdG9wIG9mZnNldD0iMC4zNyIgc3RvcC1jb2xvcj0iIzE2ZDI0ZCIvPjxzdG9wIG9mZnNldD0iMC41MSIgc3RvcC1jb2xvcj0iIzFkZmM1MSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJqIiB4MT0iMTIuODEiIHkxPSI5NDkuMDMiIHgyPSIyMy4xIiB5Mj0iOTM2LjQ5IiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTkyNy45NCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMTU5NDIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM2MGJiNDciIHN0b3Atb3BhY2l0eT0iMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJrIiB4MT0iNTIuMzEiIHkxPSI5MTEuNDciIHgyPSI0NC40IiB5Mj0iOTQ5LjY4IiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTkyNy45NCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM2MGJiNDciLz48c3RvcCBvZmZzZXQ9IjAuNDUiIHN0b3AtY29sb3I9IiMzNzkxNDUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMTU5NDIiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0ibCIgeDE9IjI2IiB5MT0iOTI3Ljk3IiB4Mj0iMjYiIHkyPSI5NTUuMDEiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtOTI3Ljk0KSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzFkZmM1MSIvPjxzdG9wIG9mZnNldD0iMC4xOSIgc3RvcC1jb2xvcj0iIzE2ZDI0ZCIvPjxzdG9wIG9mZnNldD0iMC42MyIgc3RvcC1jb2xvcj0iIzA0Njg0NCIvPjxzdG9wIG9mZnNldD0iMC42OCIgc3RvcC1jb2xvcj0iIzAxNTk0MiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJtIiB4MT0iMjYiIHkxPSI5MjUuNDgiIHgyPSIyNiIgeTI9Ijk1Mi41MiIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIC05MjcuOTQpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMWRmYzUxIi8+PHN0b3Agb2Zmc2V0PSIwLjI4IiBzdG9wLWNvbG9yPSIjMTZkMjRkIi8+PHN0b3Agb2Zmc2V0PSIwLjkyIiBzdG9wLWNvbG9yPSIjMDQ2ODQ0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDE1OTQyIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Im4iIHgxPSI0My41OSIgeTE9Ijk2NC41NyIgeDI9IjI1LjgxIiB5Mj0iOTgxLjA4IiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTkyNy45NCkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMTU5NDIiLz48c3RvcCBvZmZzZXQ9IjAuMDgiIHN0b3AtY29sb3I9IiMwNDY4NDQiLz48c3RvcCBvZmZzZXQ9IjAuNzIiIHN0b3AtY29sb3I9IiMxNmQyNGQiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxZGZjNTEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48dGl0bGU+bG9nby1uZXc8L3RpdGxlPjxwYXRoIGNsYXNzPSJhIiBkPSJNNTMuOCw0MS42SDQ3LjZhMTUsMTUsMCwwLDEtLjItMi4yLDE0LjkyLDE0LjkyLDAsMCwxLC4yLTIuMUg2NWExNC45MiwxNC45MiwwLDAsMSwuMiwyLjEsMTUsMTUsMCwwLDEtLjIsMi4ySDU4LjhWNjIuMWMtLjQsMC0uOC4xLTEuMi4xcy0uOC4xLTEuMi4xSDU1LjFjLS40LDAtLjktLjEtMS40LS4xVjQxLjZaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIC0wLjAzKSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNNzEuNSw2Mi41YTkuMiw5LjIsMCwwLDEtMy44LS43LDcuNjIsNy42MiwwLDAsMS0yLjctMiw5LDksMCwwLDEtMS42LTIuOSwxMC40NiwxMC40NiwwLDAsMS0uNS0zLjYsMTUsMTUsMCwwLDEsLjUtMy43LDEwLjgxLDEwLjgxLDAsMCwxLDEuNi0zLDcuOTQsNy45NCwwLDAsMSwyLjctMiw4LjksOC45LDAsMCwxLDMuOC0uNyw5LjIsOS4yLDAsMCwxLDMuOC43LDYuODMsNi44MywwLDAsMSwyLjcsMiw4LjU3LDguNTcsMCwwLDEsMS42LDMsMTQuMzgsMTQuMzgsMCwwLDEsLjUsMy43LDEzLjYxLDEzLjYxLDAsMCwxLS41LDMuNiwxMC44MSwxMC44MSwwLDAsMS0xLjYsMyw3Ljk0LDcuOTQsMCwwLDEtMi43LDJBMTAuODIsMTAuODIsMCwwLDEsNzEuNSw2Mi41Wm0wLTMuN2EzLjEyLDMuMTIsMCwwLDAsMi44LTEuNCw3Ljg3LDcuODcsMCwwLDAsLjgtNC4xLDguNzMsOC43MywwLDAsMC0uOC00LjEsMi45MywyLjkzLDAsMCwwLTIuOC0xLjQsMi44NSwyLjg1LDAsMCwwLTIuNywxLjQsNy44Nyw3Ljg3LDAsMCwwLS44LDQuMSw4LjczLDguNzMsMCwwLDAsLjgsNC4xQTMsMywwLDAsMCw3MS41LDU4LjhaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIC0wLjAzKSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNODIuMSw0NC4zYTIuNzcsMi43NywwLDAsMSwuOS0uMWgxLjFhMTUsMTUsMCwwLDEsMiwuMmMuMS4xLjEuMy4yLjVzLjEuNS4yLjdhMiwyLDAsMCwxLC4xLjdjMCwuMi4xLjQuMS42YTcuNjMsNy42MywwLDAsMSwuOC0xLjEsMy4xMywzLjEzLDAsMCwxLDEuMS0uOSw2LjExLDYuMTEsMCwwLDEsMS40LS43LDQuODQsNC44NCwwLDAsMSwxLjgtLjMsOC42OCw4LjY4LDAsMCwxLDIuOC41LDYuMjcsNi4yNywwLDAsMSwyLjMsMS43LDkuMjQsOS4yNCwwLDAsMSwxLjUsMi44LDEyLjE2LDEyLjE2LDAsMCwxLC41LDQsMTAuMTksMTAuMTksMCwwLDEtLjcsNCw4LjExLDguMTEsMCwwLDEtNC45LDQuOSwxMi41NCwxMi41NCwwLDAsMS00LjEuNyw0Ljg3LDQuODcsMCwwLDEtMS4yLS4xYy0uNCwwLS43LS4xLS45LS4xdjcuOWE1LjcsNS43LDAsMCwxLTEuMy4xSDgzLjRjLS40LDAtLjgtLjEtMS4zLS4xVjQ0LjNabTQuOSwxNGE2LjY1LDYuNjUsMCwwLDAsMi4xLjMsNC4yMiw0LjIyLDAsMCwwLDMuMy0xLjRjLjgtLjksMS4xLTIuMywxLjEtNC4yYTEyLjMxLDEyLjMxLDAsMCwwLS4yLTIsNC40Miw0LjQyLDAsMCwwLS42LTEuNiwzLjE4LDMuMTgsMCwwLDAtMS0xLDIuNTQsMi41NCwwLDAsMC0xLjYtLjQsMy4zNCwzLjM0LDAsMCwwLTEuNS4zLDIuODQsMi44NCwwLDAsMC0xLC45LDUuMTcsNS4xNywwLDAsMC0uNiwxLjMsNy43Nyw3Ljc3LDAsMCwwLS4yLDEuNmwuMiw2LjJaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIC0wLjAzKSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTE3LjYsNTcuNGExMS43NiwxMS43NiwwLDAsMSwuNywyLDE3LjY2LDE3LjY2LDAsMCwxLC40LDIsMzIuOTEsMzIuOTEsMCwwLDEtMy4yLjksMzAuMjgsMzAuMjgsMCwwLDEtMy4xLjIsMTMuMjgsMTMuMjgsMCwwLDEtNS4xLS45LDkuMTIsOS4xMiwwLDAsMS0zLjctMi43LDExLjMzLDExLjMzLDAsMCwxLTIuMy00LDE2LjY2LDE2LjY2LDAsMCwxLDAtMTAuMiwxMS43OCwxMS43OCwwLDAsMSwyLjMtNC4xLDExLjQzLDExLjQzLDAsMCwxLDMuNy0yLjcsMTMuMSwxMy4xLDAsMCwxLDUtMSwyNi42MSwyNi42MSwwLDAsMSwzLC4yLDEwLDEwLDAsMCwxLDMsLjksNi40Nyw2LjQ3LDAsMCwxLS40LDIsMTYuNjcsMTYuNjcsMCwwLDEtLjgsMiwxMS41MiwxMS41MiwwLDAsMC0yLjEtLjYsMTMuNzksMTMuNzksMCwwLDAtMi4yLS4yLDYuMzUsNi4zNSwwLDAsMC01LjEsMi4xYy0xLjIsMS40LTEuOCwzLjYtMS44LDYuNCwwLDUuNiwyLjQsOC40LDcuMSw4LjRhMTMuNzksMTMuNzksMCwwLDAsMi4yLS4yQTYuODcsNi44NywwLDAsMCwxMTcuNiw1Ny40WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMiAtMC4wMykiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTEyOS42LDUwLjRhMi41LDIuNSwwLDAsMC0uMy0xLjMsMiwyLDAsMCwwLS44LS44LDMuMzcsMy4zNywwLDAsMC0xLjItLjQsOC4wOCw4LjA4LDAsMCwwLTEuNi0uMSwxMi4wNSwxMi4wNSwwLDAsMC00LC43LDcuNjYsNy42NiwwLDAsMS0uNy0xLjcsNS41NSw1LjU1LDAsMCwxLS4yLTEuOWMxLS4zLDItLjYsMy0uOGExMy42OCwxMy42OCwwLDAsMSwyLjgtLjIsOC41MSw4LjUxLDAsMCwxLDUuNiwxLjdjMS4zLDEuMSwyLDMsMiw1LjVWNjEuNGExNy42NSwxNy42NSwwLDAsMS0yLjkuNywyMi4wOSwyMi4wOSwwLDAsMS0zLjkuMywxNS44MiwxNS44MiwwLDAsMS0zLjItLjMsOC4xNiw4LjE2LDAsMCwxLTIuNS0xLDQuOTQsNC45NCwwLDAsMS0xLjYtMS45LDYuMDksNi4wOSwwLDAsMS0uNi0yLjgsNS4wNyw1LjA3LDAsMCwxLC43LTIuOCw3LjY5LDcuNjksMCwwLDEsMS44LTEuOCw2LjkxLDYuOTEsMCwwLDEsMi41LTEsMTIuNjUsMTIuNjUsMCwwLDEsMi44LS4zLDE3LDE3LDAsMCwxLDIuMi4xbC4xLS4yWm0wLDMuNmMtLjMsMC0uNi0uMS0uOS0uMXMtLjYtLjEtLjktLjFhNS40LDUuNCwwLDAsMC0yLjcuNiwyLjA2LDIuMDYsMCwwLDAtMSwxLjksMiwyLDAsMCwwLC40LDEuNCwyLjc2LDIuNzYsMCwwLDAsLjkuNyw0LjUxLDQuNTEsMCwwLDAsMS4xLjNjLjQsMCwuOC4xLDEuMS4xYTMuNCwzLjQsMCwwLDAsMS0uMWMuMy0uMS42LS4xLjktLjJsLjEtNC41WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMiAtMC4wMykiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTE0MS4xLDU0LjRhNy4xLDcuMSwwLDAsMS0zLTEuNiw0LjUyLDQuNTIsMCwwLDEtMS4xLTMuMyw0Ljg5LDQuODksMCwwLDEsMS45LTQuMSw4LjE0LDguMTQsMCwwLDEsNS4xLTEuNSwyMS4xMSwyMS4xMSwwLDAsMSwyLjYuMiwyNi44MSwyNi44MSwwLDAsMSwyLjcuNywxNC44MSwxNC44MSwwLDAsMS0uMywxLjksOC42NSw4LjY1LDAsMCwxLS43LDEuN2wtMS44LS42YTcuNjEsNy42MSwwLDAsMC0yLjEtLjMsMywzLDAsMCwwLTEuOC40LDEuMzksMS4zOSwwLDAsMC0uNywxLjIsMS4yOSwxLjI5LDAsMCwwLC41LDEuMSw4LjEsOC4xLDAsMCwwLDEuMy42bDIsLjZhOC42NSw4LjY1LDAsMCwxLDEuNy43LDQuNDksNC40OSwwLDAsMSwxLjMsMSw0LjE5LDQuMTksMCwwLDEsLjksMS40LDYuMjMsNi4yMywwLDAsMSwuMywyLjEsNi44Nyw2Ljg3LDAsMCwxLS41LDIuNCw1LjgxLDUuODEsMCwwLDEtMS42LDEuOSw4LjQyLDguNDIsMCwwLDEtMi41LDEuMywxMS40MiwxMS40MiwwLDAsMS0zLjMuNSw2LjYyLDYuNjIsMCwwLDEtMS41LS4xLDUuMDcsNS4wNywwLDAsMS0xLjMtLjJjLS40LS4xLS44LS4yLTEuMy0uM3MtLjktLjMtMS4zLS40YTE0LjgxLDE0LjgxLDAsMCwxLC4zLTEuOSwxMy4zNSwxMy4zNSwwLDAsMSwuNy0xLjhjLjguMywxLjUuNSwyLjEuN2ExNC45MiwxNC45MiwwLDAsMCwyLjEuMiwzLjQsMy40LDAsMCwwLDEtLjFsMS4xLS4zYTIuNDEsMi40MSwwLDAsMCwuOC0uNiwxLjQsMS40LDAsMCwwLC4zLS45LDEuNjYsMS42NiwwLDAsMC0uNS0xLjIsMy42NywzLjY3LDAsMCwwLTEuNC0uNloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDIgLTAuMDMpIi8+PHBhdGggY2xhc3M9ImEiIGQ9Ik0xNTEuOSwzNi45YTQuODcsNC44NywwLDAsMSwxLjItLjFoMi40Yy40LDAsLjguMSwxLjIuMXY5LjVjLjItLjIuNC0uNS42LS43YTMuOTIsMy45MiwwLDAsMSwxLS44Yy40LS4yLjktLjUsMS40LS43YTUuODIsNS44MiwwLDAsMSwxLjktLjMsNS40Nyw1LjQ3LDAsMCwxLDQuNSwxLjdjMSwxLjEsMS41LDIuOCwxLjUsNS4yVjYyLjJhNC44Nyw0Ljg3LDAsMCwxLTEuMi4xSDE2NGMtLjQsMC0uOC0uMS0xLjItLjFWNTIuMWE2LDYsMCwwLDAtLjYtMi45LDIuMTIsMi4xMiwwLDAsMC0yLTEsNSw1LDAsMCwwLTEuMi4yLDEuOSwxLjksMCwwLDAtMS4xLjcsMy42OSwzLjY5LDAsMCwwLS44LDEuNCw3LjU1LDcuNTUsMCwwLDAtLjMsMi4zdjkuNGE0Ljg3LDQuODcsMCwwLDEtMS4yLjFoLTIuNGMtLjQsMC0uOC0uMS0xLjItLjFsLS4xLTI1LjNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIC0wLjAzKSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMTcwLjYsMzYuOWExNC41LDE0LjUsMCwwLDEsNC44LDBWNDZhMy42MywzLjYzLDAsMCwxLDEuNy0xLjUsNi4wOSw2LjA5LDAsMCwxLDIuOC0uNiw5LjI5LDkuMjksMCwwLDEsMi45LjUsNi4yNyw2LjI3LDAsMCwxLDIuMywxLjcsOS4yNCw5LjI0LDAsMCwxLDEuNSwyLjgsMTIsMTIsMCwwLDEsLjYsNCwxMC4xOSwxMC4xOSwwLDAsMS0uNyw0LDcuOTEsNy45MSwwLDAsMS0yLDMsOC41Miw4LjUyLDAsMCwxLTMuMiwxLjksMTQuMzQsMTQuMzQsMCwwLDEtNC4zLjcsOS4xNSw5LjE1LDAsMCwxLTEuNi0uMSw5Ljg1LDkuODUsMCwwLDEtMS43LS4yYy0uNi0uMS0xLjEtLjItMS42LS4zcy0xLS4zLTEuNC0uNGwtLjEtMjQuNlptNC44LDIxLjRjLjMuMS42LjEuOS4yaC45YTQuNDYsNC40NiwwLDAsMCwzLjUtMS4zLDUuOTEsNS45MSwwLDAsMCwxLjMtNC4xLDcuNjgsNy42OCwwLDAsMC0uOC0zLjgsMi43OSwyLjc5LDAsMCwwLTIuNy0xLjMsMy4xNywzLjE3LDAsMCwwLTIuMy45LDQsNCwwLDAsMC0uOSwyLjlsLjEsNi41WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMiAtMC4wMykiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTE5OC44LDUwLjRhMi41LDIuNSwwLDAsMC0uMy0xLjMsMiwyLDAsMCwwLS44LS44LDMuMzcsMy4zNywwLDAsMC0xLjItLjQsOC4wOCw4LjA4LDAsMCwwLTEuNi0uMSwxMi4wNSwxMi4wNSwwLDAsMC00LC43LDcuNjYsNy42NiwwLDAsMS0uNy0xLjcsNS41NSw1LjU1LDAsMCwxLS4yLTEuOWMxLS4zLDItLjYsMy0uOGExMy42OCwxMy42OCwwLDAsMSwyLjgtLjIsOC41MSw4LjUxLDAsMCwxLDUuNiwxLjdjMS4zLDEuMSwyLDMsMiw1LjVWNjEuNGExNy42NSwxNy42NSwwLDAsMS0yLjkuNywyMi4wOSwyMi4wOSwwLDAsMS0zLjkuMywxNS44MiwxNS44MiwwLDAsMS0zLjItLjMsOC4xNiw4LjE2LDAsMCwxLTIuNS0xLDQuMzEsNC4zMSwwLDAsMS0xLjYtMS45LDYuMDksNi4wOSwwLDAsMS0uNi0yLjgsNS4wNyw1LjA3LDAsMCwxLC43LTIuOCw3LjY5LDcuNjksMCwwLDEsMS44LTEuOCw5LjM0LDkuMzQsMCwwLDEsMi41LTEsMTIuNjUsMTIuNjUsMCwwLDEsMi44LS4zLDE3LDE3LDAsMCwxLDIuMi4xbC4xLS4yWm0wLDMuNmMtLjMsMC0uNi0uMS0uOS0uMXMtLjYtLjEtLjktLjFhNS40LDUuNCwwLDAsMC0yLjcuNiwyLjA2LDIuMDYsMCwwLDAtMSwxLjksMiwyLDAsMCwwLC40LDEuNCwyLjc2LDIuNzYsMCwwLDAsLjkuNyw0LjUxLDQuNTEsMCwwLDAsMS4xLjNjLjQsMCwuOC4xLDEsLjFhMy40LDMuNCwwLDAsMCwxLS4xYy4zLS4xLjYtLjEuOS0uMmwuMi00LjVaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIC0wLjAzKSIvPjxwYXRoIGNsYXNzPSJhIiBkPSJNMjE4LjgsNTcuOWE3Ljc0LDcuNzQsMCwwLDEsLjcsMS42LDYuODcsNi44NywwLDAsMSwuMywyLjIsOS4xOSw5LjE5LDAsMCwxLTIuNi43LDE5LjQ4LDE5LjQ4LDAsMCwxLTIuNS4yLDkuMzcsOS4zNywwLDAsMS0zLjktLjcsNy43Miw3LjcyLDAsMCwxLTIuNy0xLjksNy40OCw3LjQ4LDAsMCwxLTEuNi0yLjksMTEsMTEsMCwwLDEtLjYtMy43LDE1LDE1LDAsMCwxLC41LTMuNywxMC44MSwxMC44MSwwLDAsMSwxLjYtMyw2LjgzLDYuODMsMCwwLDEsMi43LTIsOC45LDguOSwwLDAsMSwzLjgtLjdoMS40Yy40LDAsLjguMSwxLjIuMWwxLjIuM2MuNC4xLjguMywxLjMuNGExNC4wNSwxNC4wNSwwLDAsMS0uMiwxLjgsNi4xOSw2LjE5LDAsMCwxLS43LDEuOWMtLjctLjItMS4zLS40LTEuOC0uNWE5LjcyLDkuNzIsMCwwLDAtMS44LS4xLDMuODgsMy44OCwwLDAsMC0zLjIsMS40LDYuNTYsNi41NiwwLDAsMC0xLjEsNCw1LjkxLDUuOTEsMCwwLDAsMS4yLDQuMSw0LjI4LDQuMjgsMCwwLDAsMy4yLDEuM2guOWEyLDIsMCwwLDAsLjgtLjEsMS44OCwxLjg4LDAsMCwwLC44LS4yQzIxOC4xLDU4LjIsMjE4LjQsNTguMSwyMTguOCw1Ny45WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMiAtMC4wMykiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTIyMS45LDM2LjlhMTQuNSwxNC41LDAsMCwxLDQuOCwwVjYyLjFhMTQuNSwxNC41LDAsMCwxLTQuOCwwWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMiAtMC4wMykiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTIzMy42LDYyLjVhLjguOCwwLDAsMS0uOC0uNGwtNi45LTguNGEuNzUuNzUsMCwwLDEtLjEtLjVoMGMwLS4yLjEtLjMuMS0uNSwwLDAsNS41LTYuNiw2LjktOC40YS44LjgsMCwwLDEsLjgtLjRoNS4xYy4xLDAsLjQuMi4xLjUtMS42LDEuOS02LjksOC4zLTYuOSw4LjNhLjc1Ljc1LDAsMCwwLS4xLjVjMCwuMi4xLjMuMS41LDAsMCw1LjMsNi40LDYuOSw4LjMuMy4zLDAsLjUtLjEuNVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDIgLTAuMDMpIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik0yOS43LDMxLjFsLjMtMS4yYTQuODgsNC44OCwwLDAsMCwuMy0uN2M4LTEwLjQsMTkuMS0xMC41LDMxLjItOC4yYTU4LjI4LDU4LjI4LDAsMCwxLDEyLjgsNC4xYy4yLjEuMi42LS4yLjUtMTAuOS0zLjUtMTkuMy0yLjEtMjUuNS41YTI1Ljg5LDI1Ljg5LDAsMCwwLTEwLjUsNy42QzMzLjgsMzUuNiwyOS42LDM0LDI5LjcsMzEuMVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDIgLTAuMDMpIi8+PHBhdGggY2xhc3M9ImMiIGQ9Ik0xNS43LjhDMTUuNSwwLDE2LjktLjQsMTguMS43LDI0LjUsNi4xLDMwLjUsMTguOSwzNiwxNi45Yy0xLjQsMS4yLTIuOCwyLTQuMywxLjctMy4zLS45LTgtMy40LTEzLTYuMUE4OC40OSw4OC40OSwwLDAsMSwxNS43LjhaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIC0wLjAzKSIvPjxwYXRoIGNsYXNzPSJkIiBkPSJNMzEuNiw2Mi4xYy02LjMtNy42LTktMTcuOC00LjItMjguNWEyNC43MywyNC43MywwLDAsMC0xLjEsMy42Yy0xLjYsOC4zLDUuMiwxNi41LDExLjIsMTguMi4zLjEuMy40LDAsLjZhNyw3LDAsMCwwLTQuOCw0LjgsNC44Nyw0Ljg3LDAsMCwwLS4xLDEuMkMzMi42LDYyLjUsMzIsNjIuNiwzMS42LDYyLjFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIC0wLjAzKSIvPjxwYXRoIGNsYXNzPSJlIiBkPSJNMzAsMjkuOGwuMy0uNmM4LTEwLjUsMTkuMS0xMC42LDMxLjItOC4yLjMuMS43LjEsMSwuMnMuNS4xLjguMmgwYy0xMC4zLTEuMi0yMy42LDEtMjguNywxMy4xQzMxLjMsMzQuNSwyOC45LDMyLjUsMzAsMjkuOFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDIgLTAuMDMpIi8+PHBhdGggY2xhc3M9ImYiIGQ9Ik0yOS44LDI5LjljLjEtLjIuNC0uNS40LS43LDgtMTAuNSwxOS4xLTEwLjYsMzEuMi04LjIuMy4xLjcuMSwxLC4ycy41LjEuOC4yaDBjLTEwLjMtMS4yLTIzLjYsMS0yOC43LDEzLjFDMzEuMywzNC41LDI4LjcsMzIuNiwyOS44LDI5LjlaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIC0wLjAzKSIvPjxwYXRoIGNsYXNzPSJnIiBkPSJNMjYuMiwzMi42Yy0zLjUtMi0xNC05LTI1LjgtMjYuNUM1LjMsOCwzNC4xLDIxLjgsMjcuNSwzMy4zaC0uM2EuMS4xLDAsMCwxLS4xLS4xSDI3YS4xLjEsMCwwLDEtLjEtLjFoMGMtLjEtLjEtLjItLjEtLjMtLjJoMGMtLjItLjItLjMtLjItLjQtLjNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIC0wLjAzKSIvPjxwYXRoIGNsYXNzPSJoIiBkPSJNMjYuMiwzMi42Yy0zLjUtMi0xNC05LTI1LjgtMjYuNUM1LjMsOCwzNC4xLDIxLjgsMjcuNSwzMy4zaC0uM2EuMS4xLDAsMCwxLS4xLS4xSDI3YS4xLjEsMCwwLDEtLjEtLjFoMGMtLjEtLjEtLjItLjEtLjMtLjJoMGMtLjItLjItLjMtLjItLjQtLjNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIC0wLjAzKSIvPjxwYXRoIGNsYXNzPSJpIiBkPSJNMjYuMiwzMi42Yy0zLjUtMi0xNC05LTI1LjgtMjYuNUM1LjMsOCwzNC4xLDIxLjgsMjcuNSwzMy4zaC0uM2EuMS4xLDAsMCwxLS4xLS4xSDI3YS4xLjEsMCwwLDEtLjEtLjFoMGMtLjEtLjEtLjItLjEtLjMtLjJoMGMtLjItLjItLjMtLjItLjQtLjNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIC0wLjAzKSIvPjxwYXRoIGNsYXNzPSJqIiBkPSJNMzIuOSw1M2gwYy0uMS0uMS0uMi0uMi0uMy0uMnMtLjItLjEtLjItLjItLjItLjItLjMtLjItLjItLjEtLjItLjJsLS4zLS4zLS4zLS4zLS40LS40Yy0uMS0uMS0uMS0uMi0uMi0uMmwtLjMtLjNjLS4xLS4xLS4xLS4yLS4yLS4zcy0uMi0uMi0uMi0uMy0uMS0uMi0uMi0uMy0uMS0uMi0uMi0uMy0uMS0uMi0uMi0uMy0uMS0uMi0uMi0uMy0uMS0uMi0uMi0uMy0uMS0uMi0uMi0uMy0uMS0uMi0uMi0uMy0uMS0uMi0uMi0uMy0uMS0uMi0uMi0uMy0uMS0uMi0uMi0uMy0uMS0uMi0uMi0uM2EuMzcuMzcsMCwwLDEtLjEtLjNjLS4xLS4xLS4xLS4yLS4yLS40cy0uMS0uMi0uMS0uMy0uMS0uMy0uMi0uNGEuMzUuMzUsMCwwLDAtLjEtLjIsOC44LDguOCwwLDAsMS0uNS0xLjUuMzcuMzcsMCwwLDAtLjEtLjNjMC0uMS0uMS0uMy0uMS0uNGEuMzcuMzcsMCwwLDAtLjEtLjNjMC0uMS0uMS0uMy0uMS0uNGEuMzcuMzcsMCwwLDAtLjEtLjMuNi42LDAsMCwwLS4xLS40VjM5LjVhMTgsMTgsMCwwLDEsLjItMi4yLDIwLjE0LDIwLjE0LDAsMCwxLDEtMy41Yy4xLS4xLjEtLjMuMi0uNFMxNC43LDI3LjcuMSw1LjljLS42LTEsMS4yLTEuNCwyLjEtMS4xQzExLDcuMSwyNC41LDE2LjcsMzEuNywxOC41LDM4LjIsMjAuMiw0MS45LjEsNTYuMywxNi44Yy43LjgsMS4yLDEuNCwxLjcsMS45cy4yLjYtLjMuNUEzMy4wOCwzMy4wOCwwLDAsMCw1MS44LDE4aDBjLS40LDAtLjQtLjEtLjUtLjRhMi4zNCwyLjM0LDAsMCwwLTIuMi0xLDIuNDYsMi40NiwwLDAsMC0yLjIsMWMtLjEuMy0uMi4zLS40LjQtNi4yLjUtMTMsMy4zLTE2LjUsMTEuOC0xLjUsMy42LDMuNiw1LjUsOC45LDIuOWgwQTI2LjQzLDI2LjQzLDAsMCwwLDMzLjQsNDNhMTYuMTUsMTYuMTUsMCwwLDAtLjYsMy4zLDI2LjQyLDI2LjQyLDAsMCwwLS4yLDIuOUEyMy40LDIzLjQsMCwwLDAsMzIuOSw1M1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDIgLTAuMDMpIi8+PHBhdGggY2xhc3M9ImsiIGQ9Ik0yNi4yLDMyLjZjLTMuNS0yLTE0LTktMjUuOC0yNi41QzUuMyw4LDM0LjEsMjEuOCwyNy41LDMzLjNoLS4zYS4xLjEsMCwwLDEtLjEtLjFIMjdhLjEuMSwwLDAsMS0uMS0uMWgwYy0uMS0uMS0uMi0uMS0uMy0uMmgwYy0uMi0uMi0uMy0uMi0uNC0uM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDIgLTAuMDMpIi8+PHBhdGggY2xhc3M9ImwiIGQ9Ik0yNi4yLDMyLjZjLTMuNS0yLTE0LTktMjUuOC0yNi41QzUuMyw4LDM0LjEsMjEuOCwyNy41LDMzLjNoLS4zYS4xLjEsMCwwLDEtLjEtLjFIMjdhLjEuMSwwLDAsMS0uMS0uMWgwYy0uMS0uMS0uMi0uMS0uMy0uMmgwYy0uMi0uMi0uMy0uMi0uNC0uM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDIgLTAuMDMpIi8+PHBhdGggY2xhc3M9Im0iIGQ9Ik0yNi4yLDMyLjZjLTMuNS0yLTE0LTktMjUuOC0yNi41QzUuMyw4LDMwLjYsMjQuNiwyNy41LDMzLjNoLS4zYS4xLjEsMCwwLDEtLjEtLjFIMjdhLjEuMSwwLDAsMS0uMS0uMWgwYy0uMS0uMS0uMi0uMS0uMy0uMmgwYy0uMi0uMi0uMy0uMi0uNC0uM1oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDIgLTAuMDMpIi8+PHBhdGggY2xhc3M9Im4iIGQ9Ik0zMi4xLDE4LjZabS4xLDBabS0uNCwwWm0yNi4yLjJjLS41LS41LTEuMS0xLjItMS44LTEuOS0xMC4yLTEyLTE1LTUuMi0xOS4zLS45bC0uMy4zYTguOTQsOC45NCwwLDAsMS0yLjgsMi4xaDBhLjEuMSwwLDAsMC0uMS4xaDBjLS4xLDAtLjEsMC0uMi4xSDMxLjljNi4zLjcsMTAuMi0xNC4yLDI1LjUuNmguM0M1OC4zLDE5LjMsNTguMywxOS4xLDU4LDE4LjhabS0yNS44LS4yWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMiAtMC4wMykiLz48cGF0aCBjbGFzcz0ibyIgZD0iTTU3LjgsMTkuM2gwYTQuMTcsNC4xNywwLDAsMS0uNi0uMkg1N2EyNi4xNywyNi4xNywwLDAsMC01LjQtMWgwYy0uNSwwLS4zLS4xLS41LS40YTIuMzQsMi4zNCwwLDAsMC0yLjItMSwyLjU4LDIuNTgsMCwwLDAtMi4yLDFjLS4xLjMtLjIuMy0uNC40LTYuMS41LTEyLjcsMy4yLTE2LjIsMTEuMiw4LTEwLjQsMTkuMS0xMC41LDMxLjItOC4yLjguMiwxLjcuNCwyLjguNloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDIgLTAuMDMpIi8+PHBhdGggY2xhc3M9InAiIGQ9Ik0xNi4xLDMuMWMwLS4zLS4xLS42LS4xLS44LDEwLjEsOC4xLDEzLjIsMTkuMSwyMCwxNC42LTEuNCwxLjItMi43LDItNC4zLDEuNi0zLjMtLjktOC0zLjQtMTMtNi4xQTg0LjY1LDg0LjY1LDAsMCwxLDE2LjEsMy4xWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMiAtMC4wMykiLz48cGF0aCBjbGFzcz0icSIgZD0iTTE2LjEsMy4xYzAtLjMtLjEtLjYtLjEtLjgsMTAuMSw4LjEsMTMuMiwxOS4xLDIwLDE0LjYtMS40LDEuMi0yLjcsMi00LjMsMS42LTMuMy0uOS04LTMuNC0xMy02LjFBODQuNjUsODQuNjUsMCwwLDEsMTYuMSwzLjFaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAyIC0wLjAzKSIvPjxwYXRoIGNsYXNzPSJyIiBkPSJNMzcuNCw1NmE3Ljc4LDcuNzgsMCwwLDAtNC4xLDMuMUEyNS45LDI1LjksMCwwLDEsMjYsMzkuM2gwYy0uMyw3LjYsNS45LDE0LjYsMTEuNSwxNi4xQzM3LjgsNTUuNSwzNy44LDU1LjgsMzcuNCw1NloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDIgLTAuMDMpIi8+PC9zdmc+";

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
/******/ 		__webpack_require__.j = 42;
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
/******/ 			42: 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [216], () => (__webpack_require__(1114)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map