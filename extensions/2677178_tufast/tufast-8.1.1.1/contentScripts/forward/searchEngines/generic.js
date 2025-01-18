const params = new URLSearchParams(window.location.search);
const keyword = decodeURI(params.get("q") || "") || decodeURI(params.get("query") || "");
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/forward/searchEngines/common.js"));
  common.forward(keyword);
})();
