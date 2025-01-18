const platform = "zih";
const cookieSettings = {
  portalName: "tex",
  domain: "tex.zih.tu-dresden.de",
  usesIdp: true
};
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/login/common.js"));
  class TexLogin extends common.Login {
    constructor() {
      super(platform, cookieSettings);
    }
    async additionalFunctionsPreCheck() {
    }
    async additionalFunctionsPostCheck() {
      this.clickLogin();
    }
    clickLogin() {
      document.querySelector('a[href="/saml/login/go"]')?.click();
    }
    async loginFieldsAvailable() {
      return false;
    }
    async findLogoutButtons() {
      return [document.querySelector('form[action="/logout"] button')];
    }
    async login(_userData, _loginFields) {
    }
  }
  await new TexLogin().start();
})();
