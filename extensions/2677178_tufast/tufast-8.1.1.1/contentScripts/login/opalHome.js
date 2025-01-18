const platform = "zih";
const cookieSettings = {
  portalName: "opal",
  domain: "bildungsportal.sachsen.de",
  usesIdp: true
};
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/login/common.js"));
  class OpalLogin extends common.Login {
    constructor() {
      super(platform, cookieSettings);
    }
    async additionalFunctionsPreCheck() {
    }
    async additionalFunctionsPostCheck() {
      const observer = new MutationObserver(this.selectTU.bind(this));
      observer.observe(document.body, {subtree: true, childList: true});
      this.clickLogin();
    }
    selectTU(_records, observer) {
      const select = document.querySelector('select[name="content:container:login:shibAuthForm:wayfselection"]');
      if (!select)
        return;
      const value = Array.from(select.options).find((option) => option.innerText === "TU Dresden" || option.innerText === "Technische Universität Dresden")?.value;
      if (value) {
        observer.disconnect();
        select.value = value;
        document.querySelector('button[name="content:container:login:shibAuthForm:shibLogin"]')?.click();
      }
    }
    clickLogin() {
      document.querySelector('a[title="Login"]')?.click();
    }
    async loginFieldsAvailable() {
      return false;
    }
    async findLogoutButtons() {
      return [document.querySelector('a[title="Abmelden"]'), document.querySelector('a[title="Logout"]')];
    }
    async login(_userData, _loginFields) {
    }
  }
  await new OpalLogin().start();
})();
