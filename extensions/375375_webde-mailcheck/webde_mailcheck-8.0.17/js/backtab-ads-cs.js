(() => {
 "use strict";
 var __webpack_modules__ = {
  3853: module => {
   module.exports = JSON.parse('{"storeExtensionUrlPrefix":"https://addons.mozilla.org/en-US/firefox/addon/","brand":{"aib":{"pingURL":"https://wa.web.de/metric/ca.gif?portal=webde&browser=ff&_c=0","uninstallURL":"https://go.web.de/tb/mff_uninstall_runonce?portal=webde&browser=ff&_c=0"},"aib2":{"pingURL":"https://tgw.web.de/events"},"cm":{"searchURL":"https://go.web.de/tb/mff_labelsearch?q="},"faviconURL":"https://img.ui-portal.de/webde/favicon.ico","login":{"name":"WEB.DE","provider":"webde","createAccountURLWeb":"https://go.web.de/tb/mff_signup","forgotPasswordURL":"https://go.web.de/tb/mff_help_password"},"netid":{"feedURL":"https://go.web.de/tb/netidfeed"},"searchReferrer":"https://suche.web.de/","cancelContractURL":"https://go.web.de/tb/mff_cancelcontract","environmentURL":"https://go.web.de/tb/newtab/mff_environment","feedbackURL":"https://go.web.de/tb/mff_feedback","firstrunURL":"https://go.web.de/tb/mff_runonce","helpURL":"https://go.web.de/tb/mff_help","homepageURL":"https://go.web.de/tb/mff_home","jugendschutzURL":"https://go.web.de/tb/mff_jugendschutz","lastTabURL":"https://go.web.de/tb/mff_lasttab","legalURL":"https://go.web.de/tb/newtab/mff_imprint","newtabURL":"https://go.web.de/tb/mff_newtab","notFoundURL":"https://go.web.de/tb/mff_search_404","privacyDetailsURL":"https://go.web.de/tb/mff_usage_data","privacyURLMoz":"https://addons.mozilla.org/de/firefox/addon/webde-mailcheck/privacy/","privacyURL":"https://go.web.de/tb/login/mff_datenschutz","product0URL":"https://go.web.de/tb/mff_settings2","product2URL":"https://go.web.de/tb/mff_settings3","ratingURL":"https://go.web.de/tb/mff_star_","redirectSearchURL":"https://go.web.de/tb/mff_websearch","searchOnLogoutURL":"https://go.web.de/tb/mff_logout","searchPAURL":"https://go.web.de/tb/mff_searchicon","startpageHomepageURL":"https://go.web.de/tb/mff_startpage_homepage","startpageURL":"https://go.web.de/tb/mff_startpage","telemetryInfoURL":"https://go.web.de/tb/mff_telemetry_info","termsURL":"https://go.web.de/tb/newtab/mff_terms","upgradeURL":"https://go.web.de/tb/mff_addon","versionURL":"https://go.web.de/tb/mff_version"}}');
  }
 }, __webpack_module_cache__ = {};
 function __webpack_require__(moduleId) {
  var cachedModule = __webpack_module_cache__[moduleId];
  if (void 0 !== cachedModule) return cachedModule.exports;
  var module = __webpack_module_cache__[moduleId] = {
   exports: {}
  };
  return __webpack_modules__[moduleId](module, module.exports, __webpack_require__), 
  module.exports;
 }
 (() => {
  const _data = __webpack_require__(3853), {brand, storeExtensionUrlPrefix} = _data;
  document.addEventListener("click", (function(event) {
   if (document.referrer !== brand.searchReferrer) return !0;
   let anchor = event.target.closest("a");
   return null != anchor ? (event.preventDefault(), chrome.runtime.sendMessage({
    id: "bta-open-tab",
    target: anchor.href
   }), !1) : void 0;
  }), !0);
 })();
})();