const defaultLogoutDuration = 5;
export class Login {
  constructor(platform, cookieSettings, savedClickCount = 1) {
    this.platform = platform || "zih";
    this.cookieSettings = cookieSettings;
    this.savedClickCount = savedClickCount;
  }
  async login(userData, loginFields) {
    if (!loginFields || !loginFields.usernameField || !loginFields.passwordField)
      return;
    this.fakeInput(loginFields.usernameField, userData.user);
    this.fakeInput(loginFields.passwordField, userData.pass);
    loginFields.submitButton?.click();
  }
  async findCredentialsError() {
    return false;
  }
  async start() {
    await this.additionalFunctionsPreCheck().catch(() => {
    });
    const userData = await this.loginCheckAndData();
    if (!userData)
      return;
    await this.additionalFunctionsPostCheck(userData).catch(() => {
    });
    await this.tryLogin(userData);
    const buttons = await this.findLogoutButtons();
    this.registerLogoutButtonsListener(buttons);
  }
  registerLogoutButtonsListener(buttons) {
    if (buttons) {
      for (const button of buttons) {
        if (button)
          button.addEventListener("click", this.setLoggedOutCookie.bind(this));
      }
    }
  }
  async loginCheckAndData() {
    if (this.isLoggedOutCookie())
      return false;
    const {isEnabled} = await chrome.storage.local.get("isEnabled");
    if (!isEnabled)
      return false;
    const userData = await chrome.runtime.sendMessage({cmd: "get_user_data", platform: this.platform});
    if (!userData || !userData.user || !userData.pass)
      return false;
    else
      return userData;
  }
  isLoggedOutCookie() {
    return document.cookie.includes(`tuFast_${this.cookieSettings.portalName}_loggedOut`);
  }
  setLoggedOutCookie() {
    if (!this.cookieSettings.domain)
      return;
    const logoutDuration = this.cookieSettings.logoutDuration || defaultLogoutDuration || 5;
    const date = new Date();
    date.setMinutes(date.getMinutes() + logoutDuration);
    const domain = this.cookieSettings.domain.startsWith(".") ? this.cookieSettings.domain : `.${this.cookieSettings.domain}`;
    document.cookie = `tuFast_${this.cookieSettings.portalName}_loggedOut=true; expires=${date.toUTCString()}; path=/; domain=${domain}; secure`;
    if (this.cookieSettings.usesIdp)
      chrome.runtime.sendMessage({cmd: "logout_idp", logoutDuration});
  }
  async onLogin() {
    await chrome.runtime.sendMessage({cmd: "save_clicks", clickCount: this.savedClickCount});
  }
  async tryLogin(userData) {
    const errorDialog = await this.findCredentialsError();
    if (errorDialog)
      return;
    let loginFields;
    const avail = await this.loginFieldsAvailable().catch(() => {
    });
    if (typeof avail === "boolean" && !avail)
      return;
    if (typeof avail === "object")
      loginFields = avail;
    if (loginFields?.otpSettings && await this.fillOtp(loginFields.otpSettings))
      return;
    await this.onLogin();
    await this.login(userData, loginFields);
  }
  async fillOtp(otpSettings) {
    if (!otpSettings.input)
      return false;
    let otp;
    if (otpSettings.type === "totp") {
      otp = await chrome.runtime.sendMessage({cmd: "get_totp", platform: this.platform});
    } else if (otpSettings.type === "iotp") {
      otp = await chrome.runtime.sendMessage({cmd: "get_iotp", platform: this.platform, indexes: otpSettings.indexes});
    }
    if (!otp || otp.length === 0)
      return false;
    this.fakeInput(otpSettings.input, otp);
    otpSettings.submitButton?.click();
    return !!otpSettings.submitButton;
  }
  fakeInput(input, value) {
    input.getBoundingClientRect();
    input.click();
    input.focus();
    const sendEmptyPresses = () => {
      input.dispatchEvent(new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: false,
        charCode: 0,
        keyCode: 0,
        which: 0
      }));
      input.dispatchEvent(new KeyboardEvent("keypress", {
        bubbles: true,
        cancelable: false,
        charCode: 0,
        keyCode: 0,
        which: 0
      }));
      input.dispatchEvent(new KeyboardEvent("keyup", {
        bubbles: true,
        cancelable: false,
        charCode: 0,
        keyCode: 0,
        which: 0
      }));
    };
    sendEmptyPresses();
    input.value = value;
    input.click();
    sendEmptyPresses();
    input.dispatchEvent(new Event("input", {bubbles: true, cancelable: true}));
    input.dispatchEvent(new Event("change", {bubbles: true, cancelable: true}));
    input.blur();
    input.value = value;
  }
}
