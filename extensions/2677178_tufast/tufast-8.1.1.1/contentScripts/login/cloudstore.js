const platform = "zih";
const cookieSettings = {
  portalName: "cloudstore",
  domain: "cloudstore.zih.tu-dresden.de"
};
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/login/common.js"));
  class CloudstoreLogin extends common.Login {
    constructor() {
      super(platform, cookieSettings);
    }
    async additionalFunctionsPreCheck() {
    }
    async additionalFunctionsPostCheck() {
    }
    async findCredentialsError() {
      return document.getElementsByClassName("wrongPasswordMsg")[0];
    }
    async loginFieldsAvailable() {
      return {
        usernameField: document.getElementById("user"),
        passwordField: document.getElementById("password"),
        submitButton: document.getElementById("submit-form")
      };
    }
    async findLogoutButtons() {
      return [document.querySelector('[data-id="logout"] > a')];
    }
  }
  await new CloudstoreLogin().start();
})();
