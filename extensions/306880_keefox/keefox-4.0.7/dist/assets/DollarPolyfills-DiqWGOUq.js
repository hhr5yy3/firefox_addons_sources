(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function $(selector, el) {
  if (!el)
    el = document;
  return el.querySelector(selector);
}
function $$(selector, el) {
  if (!el)
    el = document;
  return el.querySelectorAll(selector);
}
function $STR(str) {
  const msg = chrome.i18n.getMessage(str);
  return msg || str;
}
function $STRF(str, subs) {
  const msg = chrome.i18n.getMessage(str, subs);
  return msg || str;
}
export {
  $$ as $,
  $STR as a,
  $ as b,
  $STRF as c
};
//# sourceMappingURL=DollarPolyfills-DiqWGOUq.js.map
