const platform = "zih";
const cookieSettings = {
  portalName: "gitlabMn",
  domain: "gitlab.mn.tu-dresden.de"
};
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/login/common.js"));
  class GlMnLogin extends common.Login {
    constructor() {
      super(platform, cookieSettings);
    }
    async additionalFunctionsPreCheck() {
      document.querySelector('a[data-qa-selector="ldap_tab"][role="tab"]')?.click();
    }
    async additionalFunctionsPostCheck() {
    }
    async findCredentialsError() {
      return document.querySelector('.flash-alert[data-testid="alert-danger"]');
    }
    async loginFieldsAvailable() {
      return {
        usernameField: document.getElementById("username"),
        passwordField: document.getElementById("password"),
        submitButton: document.querySelector('input[type="submit"]')
      };
    }
    async findLogoutButtons() {
      return document.querySelectorAll("a.sign-out-link");
    }
    async login(userData, loginFields) {
      if (!loginFields)
        return;
      this.fakeInput(loginFields.usernameField, userData.user);
      this.fakeInput(loginFields.passwordField, userData.pass);
      document.getElementById("remember_me").checked = true;
      loginFields.submitButton?.click();
    }
  }
  await new GlMnLogin().start();
})();
