const platform = "slub";
const cookieSettings = {
  portalName: "slub",
  domain: "slub-dresden.de"
};
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/login/common.js"));
  class SlubLogin extends common.Login {
    constructor() {
      super(platform, cookieSettings);
    }
    async additionalFunctionsPreCheck() {
    }
    async additionalFunctionsPostCheck() {
    }
    async findCredentialsError() {
      return document.getElementsByClassName("form-error")[0];
    }
    async loginFieldsAvailable() {
      return {
        usernameField: document.getElementById("username"),
        passwordField: document.getElementById("password"),
        submitButton: document.querySelector('input[type="submit"]')
      };
    }
    async findLogoutButtons() {
      return document.querySelectorAll('a[href^="https://www.slub-dresden.de/Shibboleth.sso/Logout"]');
    }
  }
  await new SlubLogin().start();
})();
