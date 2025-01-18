function shouldAct() {
  const params = new URLSearchParams(window.location.search);
  const hasQuery = params.has("q") || params.has("query");
  return !hasQuery;
}
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/forward/searchEngines/common.js"));
  if (!shouldAct() || !await common.fwdEnabled())
    return;
  const sb = document.querySelector('form[action="/sp/search"] input[name="query"]');
  if (!sb)
    return;
  if (await common.forward(sb.value))
    return;
  const sf = document.querySelector('form[action="/sp/search"]');
  const onSubmit = (e) => {
    e.preventDefault();
    common.forward(sb.value).then((forwarded) => {
      if (!forwarded) {
        e.target?.removeEventListener("submit", onSubmit);
        e.target.submit();
      }
    });
  };
  sf.addEventListener("submit", onSubmit);
})();
