const platform = "zih";
const cookieSettings = {
  portalName: "matrix",
  domain: "matrix.tu-dresden.de"
};
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/login/common.js"));
  class MatrixLogin extends common.Login {
    constructor() {
      super(platform, cookieSettings);
    }
    async additionalFunctionsPreCheck() {
    }
    async additionalFunctionsPostCheck() {
      this.clickLogin();
    }
    clickLogin() {
      document.querySelector('a[href="#/login"]')?.click();
    }
    async findCredentialsError() {
      return document.getElementsByClassName("mx_Login_error")[0];
    }
    async loginFieldsAvailable() {
      const hash = window.location.hash;
      if (hash !== "#/login")
        return false;
      return {
        usernameField: document.getElementById("mx_LoginForm_username"),
        passwordField: document.getElementById("mx_LoginForm_password"),
        submitButton: document.querySelector('input.mx_Login_submit[type="submit"]')
      };
    }
    async findLogoutButtons() {
      return [document.getElementsByClassName("mx_UserMenu_iconSignOut")[0]?.parentElement];
    }
    async login(userData, loginFields) {
      if (!loginFields || !loginFields.submitButton)
        return;
      this.fakeInput(loginFields.usernameField, userData.user);
      this.fakeInput(loginFields.passwordField, userData.pass);
      loginFields.submitButton.click();
    }
  }
  const login = new MatrixLogin();
  const oberserver = new MutationObserver(async (_records, _observer) => {
    await login.start();
  });
  oberserver.observe(document.body, {subtree: true, childList: true});
})();
