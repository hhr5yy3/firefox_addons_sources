function getQuery() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("q"))
    return false;
  else
    return params.get("q") || false;
}
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/forward/searchEngines/common.js"));
  if (!await common.fwdEnabled())
    return;
  new MutationObserver(async (_mutations) => {
    const query = getQuery();
    if (query)
      await common.forward(query);
  }).observe(document, {subtree: true, childList: true});
})();
