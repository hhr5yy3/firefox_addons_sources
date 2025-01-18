const platform = "zih";
const cookieSettings = {
  portalName: "jexam",
  domain: "jexam.inf.tu-dresden.de"
};
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/login/common.js"));
  class JExamLogin extends common.Login {
    constructor() {
      super(platform, cookieSettings);
    }
    async additionalFunctionsPreCheck() {
    }
    async additionalFunctionsPostCheck() {
    }
    async findCredentialsError() {
      const params = new URLSearchParams(window.location.search);
      return params.get("error") !== null && params.get("error") !== "";
    }
    async loginFieldsAvailable() {
      return {
        usernameField: document.getElementById("username"),
        passwordField: document.getElementById("password"),
        submitButton: document.querySelector('input[type="submit"]')
      };
    }
    async findLogoutButtons() {
      return document.querySelectorAll('a[href$="/logout"]');
    }
  }
  await new JExamLogin().start();
})();
