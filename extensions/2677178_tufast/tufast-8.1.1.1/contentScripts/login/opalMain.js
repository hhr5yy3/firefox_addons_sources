const platform = "zih";
const cookieSettings = {
  portalName: "opal",
  domain: "bildungsportal.sachsen.de"
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
      this.selectTU();
    }
    selectTU() {
      const select = document.querySelector('select[name="wayfselection"]');
      if (!select)
        return;
      const value = Array.from(select.options).find((option) => option.innerText === "TU Dresden" || option.innerText === "Technische Universität Dresden")?.value;
      if (value) {
        select.value = value;
        document.querySelector('button[name="shibLogin"]')?.click();
      }
    }
    async loginFieldsAvailable() {
      return false;
    }
    async findLogoutButtons() {
      return [document.getElementById("logOut_btn")];
    }
    async login(_userData, _loginFields) {
    }
  }
  await new OpalLogin().start();
})();
