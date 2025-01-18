(async () => {
  if (location.href.includes("exam"))
    return;
  const common = await import(chrome.runtime.getURL("contentScripts/forward/searchEngines/common.js"));
  common.forward("opal");
})();
