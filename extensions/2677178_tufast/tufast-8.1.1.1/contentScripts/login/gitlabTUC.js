const platform = "zih";
const cookieSettings = {
  portalName: "gitlabTUC",
  domain: "gitlab.hrz.tu-chemnitz.de"
};
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/login/common.js"));
  class GlTUC extends common.Login {
    constructor() {
      super(platform, cookieSettings);
    }
    async additionalFunctionsPreCheck() {
    }
    async additionalFunctionsPostCheck() {
      document.getElementById("remember_me").checked = true;
      document.getElementById("oauth-login-shibboleth").click();
    }
    async loginFieldsAvailable() {
      return false;
    }
    async findLogoutButtons() {
      return document.querySelectorAll("a.sign-out-link");
    }
  }
  await new GlTUC().start();
})();
