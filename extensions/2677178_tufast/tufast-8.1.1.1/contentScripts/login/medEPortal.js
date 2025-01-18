const platform = "zih";
const cookieSettings = {
  portalName: "eportalMed",
  domain: "eportal.med.tu-dresden.de",
  usesIdp: true
};
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/login/common.js"));
  class MedLogin extends common.Login {
    constructor() {
      super(platform, cookieSettings);
    }
    async additionalFunctionsPreCheck() {
    }
    async additionalFunctionsPostCheck() {
      this.clickLogin();
    }
    clickLogin() {
      document.getElementById("personaltools-login")?.click();
    }
    async loginFieldsAvailable() {
      return false;
    }
    async findLogoutButtons() {
      return [document.getElementById("personaltools-logout")];
    }
    async login(_userData, _loginFields) {
    }
  }
  await new MedLogin().start();
})();
