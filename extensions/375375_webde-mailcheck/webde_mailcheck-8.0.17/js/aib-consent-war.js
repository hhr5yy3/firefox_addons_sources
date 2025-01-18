(() => {
 const api = window.TcfApi;
 if (api && api.getPermissionFeature) {
  const allow = api.getPermissionFeature("fullConsent");
  window.postMessage({
   key: "fullConsent",
   value: allow
  });
 }
})();