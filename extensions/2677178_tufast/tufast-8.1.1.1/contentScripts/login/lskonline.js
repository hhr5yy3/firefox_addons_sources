const platform = "zih";
const cookieSettings = {
  portalName: "lskonline",
  domain: "lskonline.tu-dresden.de"
};
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/login/common.js"));
  class LSKLogin extends common.Login {
    constructor() {
      super(platform, cookieSettings);
    }
    async additionalFunctionsPreCheck() {
    }
    async additionalFunctionsPostCheck() {
      this.clickLogin();
    }
    clickLogin() {
      const link = Array.from(document.getElementsByTagName("a")).find((link2) => link2?.innerText === "Login");
      if (link && !link.id.includes("selected"))
        link.click();
    }
    async loginFieldsAvailable() {
      return {
        usernameField: document.querySelector('input[name="j_username"]'),
        passwordField: document.querySelector('input[name="j_password"]'),
        submitButton: document.querySelector('input[type="submit"]')
      };
    }
    async findLogoutButtons() {
      return Array.from(document.getElementsByTagName("a")).filter((link) => link?.innerText === "Logout");
    }
  }
  await new LSKLogin().start();
})();
