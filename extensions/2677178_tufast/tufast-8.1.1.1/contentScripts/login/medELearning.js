const platform = "zih";
const cookieSettings = {
  portalName: "elearningMed",
  domain: "elearning.med.tu-dresden.de",
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
      this.chooseZIHLogin();
    }
    chooseZIHLogin() {
      if (window.location.pathname !== "/moodle/login/index.php")
        return;
      document.querySelector('a[href*="auth/shibboleth"]')?.click();
    }
    async loginFieldsAvailable() {
      return false;
    }
    async findLogoutButtons() {
      return document.querySelectorAll('a[href*="moodle/login/logout.php"]');
    }
    async login(_userData, _loginFields) {
    }
  }
  await new MedLogin().start();
})();
