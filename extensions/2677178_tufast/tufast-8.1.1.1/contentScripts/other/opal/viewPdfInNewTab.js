function reloadInNewTab() {
  if (!window.location.pathname.includes("downloadering") || window.history.length < 2)
    return;
  window.open(window.location.href, "_blank");
  window.history.back();
}
(async () => {
  const {pdfInNewTab} = await chrome.storage.local.get(["pdfInNewTab"]);
  if (!pdfInNewTab)
    return;
  reloadInNewTab();
})();
