const platform = "zih";
const cookieSettings = {
  portalName: "videocampus",
  domain: "videocampus.sachsen.de",
  usesIdp: true
};
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/login/common.js"));
  class VideocampusLogin extends common.Login {
    constructor() {
      super(platform, cookieSettings);
    }
    async additionalFunctionsPreCheck() {
    }
    async additionalFunctionsPostCheck() {
      this.selectIdpAndClick();
    }
    selectIdpAndClick() {
      const [select] = document.getElementsByName("idp");
      if (!select)
        return;
      const optionsArr = Array.from(select.options);
      const idpValue = optionsArr.find((option) => option.innerText === "TU Dresden" || option.innerText === "Technische Universität Dresden")?.value;
      if (typeof idpValue === "undefined")
        return;
      select.value = idpValue;
      select.dispatchEvent(new Event("change"));
      document.getElementById("samlLogin")?.click();
    }
    async loginFieldsAvailable() {
      return false;
    }
    async findLogoutButtons() {
      return [document.querySelector('a.dropdown-item[href="/logout"]')];
    }
    async login(_userData, _loginFields) {
    }
  }
  await new VideocampusLogin().start();
})();
