const platform = "zih";
const cookieSettings = {
  portalName: "owa",
  domain: "msx.tu-dresden.de"
};
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/login/common.js"));
  class OWALogin extends common.Login {
    constructor() {
      super(platform, cookieSettings);
    }
    async additionalFunctionsPreCheck() {
    }
    async additionalFunctionsPostCheck() {
    }
    async findCredentialsError() {
      return document.getElementById("signInErrorDiv");
    }
    async loginFieldsAvailable() {
      const submit = document.querySelector("div.signInEnter div");
      return {
        usernameField: document.getElementById("username"),
        passwordField: document.getElementById("password"),
        submitButton: submit || void 0
      };
    }
    async findLogoutButtons() {
      return [document.getElementById("lo")];
    }
  }
  const login = new OWALogin();
  await login.start();
  const observer = new MutationObserver((_records, _observer) => {
    const oldBtn = document.querySelector('[aria-label="Abmelden"]');
    const allNewBtns = document.querySelectorAll("div[role=menu] button");
    const newBtns = Array.from(allNewBtns).filter((btn) => btn.innerText === "Abmelden" || btn.innerText === "Logout");
    login.registerLogoutButtonsListener([...newBtns, oldBtn]);
  });
  observer.observe(document.body, {subtree: true, childList: true});
})();
