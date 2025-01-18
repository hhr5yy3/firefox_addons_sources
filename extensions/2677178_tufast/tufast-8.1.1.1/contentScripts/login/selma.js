const platform = "zih";
const cookieSettings = {
  portalName: "selma",
  domain: "selma.tu-dresden.de"
};
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/login/common.js"));
  class SelmaLogin extends common.Login {
    constructor() {
      super(platform, cookieSettings);
    }
    async additionalFunctionsPreCheck() {
    }
    async additionalFunctionsPostCheck() {
    }
    async findCredentialsError() {
      const header = document.getElementsByTagName("h1")[0];
      if (!header)
        return false;
      const ger = header.innerText === "Benutzername oder Passwort falsch";
      const eng = header.innerText === "Username or password is wrong";
      return ger || eng;
    }
    async loginFieldsAvailable() {
      return {
        usernameField: document.getElementById("field_user"),
        passwordField: document.getElementById("field_pass"),
        submitButton: document.getElementById("logIn_btn")
      };
    }
    async findLogoutButtons() {
      return [document.getElementById("logOut_btn")];
    }
  }
  await new SelmaLogin().start();
})();
