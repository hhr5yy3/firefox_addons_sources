const platform = "zih";
const cookieSettings = {
  portalName: "hisqis",
  domain: "qis.dez.tu-dresden.de"
};
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/login/common.js"));
  class HisqisLogin extends common.Login {
    constructor() {
      super(platform, cookieSettings);
    }
    async additionalFunctionsPreCheck() {
      this.acceptConditions();
    }
    acceptConditions() {
      const link = Array.from(document.querySelectorAll("a")).find((element) => element.innerText.includes(">>>"));
      if (link) {
        link.click();
      }
    }
    async additionalFunctionsPostCheck() {
    }
    async findCredentialsError() {
      return document.getElementsByClassName("newSessionMsg")[0];
    }
    async loginFieldsAvailable() {
      return {
        usernameField: document.getElementById("asdf"),
        passwordField: document.getElementById("fdsa"),
        submitButton: document.querySelector('input[type="submit"]')
      };
    }
    async findLogoutButtons() {
      return [document.querySelector('a[title="Abmelden"]'), document.querySelector('a[title="Logout"]')];
    }
  }
  await new HisqisLogin().start();
})();
