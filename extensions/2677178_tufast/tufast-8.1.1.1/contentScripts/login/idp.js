const platform = "zih";
const cookieSettings = {
  portalName: "idp",
  domain: "idp.tu-dresden.de"
};
(async () => {
  const common = await import(chrome.runtime.getURL("contentScripts/login/common.js"));
  class IdpLogin extends common.Login {
    constructor() {
      super(platform, cookieSettings);
    }
    async additionalFunctionsPreCheck() {
    }
    async additionalFunctionsPostCheck() {
      this.confirmData();
      this.outdatedRequest();
      this.selectOTPType();
    }
    confirmData() {
      if (!document.getElementById("generalConsentDiv"))
        return;
      const button = document.querySelector('input[type="submit"][name="_eventId_proceed"]');
      button?.click();
    }
    outdatedRequest() {
    }
    selectOTPType() {
      if (!document.getElementById("fudis_selected_token_ids_input"))
        return;
      const button = document.querySelector('button[type="submit"][name="_eventId_proceed"]');
      button?.click();
    }
    async findCredentialsError() {
      return document.querySelector(".output--error") ?? document.querySelector('.content p font[color="red"]');
    }
    async loginFieldsAvailable() {
      const fields = {
        usernameField: document.getElementById("username"),
        passwordField: document.getElementById("password"),
        submitButton: document.querySelector('button[name="_eventId_proceed"][type="submit"]')
      };
      const otpInput = document.getElementById("fudis_otp_input");
      if (otpInput) {
        const indexesText = otpInput.parentElement?.parentElement?.parentElement?.querySelector("div:first-of-type")?.textContent?.trim();
        const indexes = indexesText?.match(/(\d+) & (\d+)/)?.slice(1, 3).map((x) => Number.parseInt(x, 10) - 1);
        fields.otpSettings = {
          input: otpInput,
          submitButton: document.querySelector('button[name="_eventId_proceed"][type="submit"]'),
          type: indexesText?.toLocaleLowerCase().includes("totp") ? "totp" : "iotp",
          indexes: indexes && indexes.length > 0 ? indexes : void 0
        };
        console.log(fields);
      }
      return fields;
    }
    async findLogoutButtons() {
      return null;
    }
  }
  await new IdpLogin().start();
})();
