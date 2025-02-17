(() => {
 "use strict";
 var __webpack_modules__ = {
  9402: module => {
   module.exports = JSON.parse('{"storeExtensionUrlPrefix":"https://addons.mozilla.org/en-US/firefox/addon/","brand":{"aib":{"pingURL":"https://wa.gmx.net/metric/ca.gif?portal=gmxnet&browser=ff&_c=0","uninstallURL":"https://go.gmx.net/tb/mff_uninstall_runonce?portal=gmxnet&browser=ff&_c=0"},"aib2":{"pingURL":"https://tgw.gmx.net/events"},"cm":{"searchURL":"https://go.gmx.net/tb/mff_labelsearch?q="},"faviconURL":"https://img.ui-portal.de/gmx/favicon.ico","hotnews":{"feedURL":"https://dl.gmx.net/backend/firefox/hotnewsfeed-%LOCALE%.xml"},"login":{"name":"GMX","provider":"gmx","createAccountURLWeb":"https://go.gmx.net/tb/mff_signup","forgotPasswordURL":"https://go.gmx.net/tb/mff_help_password"},"netid":{"feedURL":"https://go.gmx.net/tb/netidfeed"},"searchReferrer":"https://suche.gmx.net/","cancelContractURL":"https://go.gmx.net/tb/mff_cancelcontract","environmentURL":"https://go.gmx.net/tb/newtab/mff_environment","feedbackURL":"https://go.gmx.net/tb/mff_feedback","firstrunURL":"https://go.gmx.net/tb/mff_runonce","helpURL":"https://go.gmx.net/tb/mff_help","homepageURL":"https://go.gmx.net/tb/mff_home","jugendschutzURL":"https://go.gmx.net/tb/mff_jugendschutz","lastTabURL":"https://go.gmx.net/tb/mff_lasttab","legalURL":"https://go.gmx.net/tb/newtab/mff_imprint","AttachmentURL":"https://go.gmx.net/tb/mff_attachmentview","newtabURL":"https://go.gmx.net/tb/mff_newtab","notFoundURL":"https://go.gmx.net/tb/mff_search_404","privacyDetailsURL":"https://go.gmx.net/tb/mff_usage_data","privacyURLMoz":"https://addons.mozilla.org/de/firefox/addon/gmx-mailcheck/privacy/","privacyURL":"https://go.gmx.net/tb/login/mff_datenschutz","product0URL":"https://go.gmx.net/tb/mff_settings2","product2URL":"https://go.gmx.net/tb/mff_settings3","ratingURL":"https://go.gmx.net/tb/mff_star_","redirectSearchURL":"https://go.gmx.net/tb/mff_websearch","searchOnLogoutURL":"https://go.gmx.net/tb/mff_logout","searchPAURL":"https://go.gmx.net/tb/mff_searchicon","startpageHomepageURL":"https://go.gmx.net/tb/mff_startpage_homepage","startpageURL":"https://go.gmx.net/tb/mff_startpage","telemetryInfoURL":"https://go.gmx.net/tb/mff_telemetry_info","termsURL":"https://go.gmx.net/tb/newtab/mff_terms","upgradeURL":"https://go.gmx.net/tb/mff_addon","versionURL":"https://go.gmx.net/tb/mff_version"}}');
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
  const _data = __webpack_require__(9402), {brand, storeExtensionUrlPrefix} = _data;
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