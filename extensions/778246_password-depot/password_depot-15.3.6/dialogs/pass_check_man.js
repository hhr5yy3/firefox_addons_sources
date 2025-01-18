var password_checker_manager = {
  PC_SPEED: 3000000000,
  patterns: [
    "^(?=.*[a-z])",
    "^(?=.*[A-Z])",
    "^(?=.*[0-9])",
    /^(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])/,
  ],
  calculateEntropy: function (password) {
    let length = password.length;
    if (length === 0) {
      return 0;
    }
    let strength = this.calculateStrength(password);
    return length * Math.log2(strength);
  },
  calculateStrength: function (password) {
    let strength = 0;
    for (let i = 0; i < this.patterns.length; i++) {
      let regEx = new RegExp(this.patterns[i]);
      if (regEx.test(password)) {
        switch (i) {
          case 0:
            strength += 26;
            break;
          case 1:
            strength += 26;
            break;
          case 2:
            strength += 10;
            break;
          case 3:
            strength += 32;
            break;
          default:
            strength += 0;
        }
      }
    }
    return strength;
  },
  getBrokeTime: function (password) {
    let length = password.length;
    let strength = this.calculateStrength(password);
    let time = Math.pow(strength, length) / this.PC_SPEED;
    return time;
  },
  getStrengthLabel: function (password) {
    let entropy = this.calculateEntropy(password);
    if (entropy > 75) return chrome.i18n.getMessage("pd_pass_check_strong");
    if (entropy > 50) return chrome.i18n.getMessage("pd_pass_check_fair");
    if (entropy > 30) return chrome.i18n.getMessage("pd_pass_check_medium");
    return chrome.i18n.getMessage("pd_pass_check_weak");
  },
  getBrokeTimeLabel: function (password) {
    let time = this.getBrokeTime(password);
    if (time < 1)
      return chrome.i18n.getMessage("pd_pass_check_less_than_second");
    if (time < 60)
      return Math.ceil(time) + chrome.i18n.getMessage("pd_pass_check_seconds");
    if (time < 3600)
      return (
        Math.ceil(time / 60) + chrome.i18n.getMessage("pd_pass_check_mins")
      );
    if (time < 86400)
      return (
        Math.ceil(time / 3600) + chrome.i18n.getMessage("pd_pass_check_hours")
      );
    if (time < 2592000)
      return (
        Math.ceil(time / 86400) + chrome.i18n.getMessage("pd_pass_check_days")
      );
    if (time < 31104000)
      return (
        Math.ceil(time / 2592000) +
        chrome.i18n.getMessage("pd_pass_check_months")
      );
    if (time < 31104000000)
      return (
        Math.ceil(time / 31104000) +
        chrome.i18n.getMessage("pd_pass_check_years")
      );
    return chrome.i18n.getMessage("pd_pass_check_never");
  },
  hasLower: function (password) {
    let regEx = new RegExp(this.patterns[0]);
    return regEx.test(password);
  },
  hasUpper: function (password) {
    let regEx = new RegExp(this.patterns[1]);
    return regEx.test(password);
  },
  hasNumber: function (password) {
    let regEx = new RegExp(this.patterns[2]);
    return regEx.test(password);
  },
  hasSymbol: function (password) {
    let regEx = new RegExp(this.patterns[3]);
    return regEx.test(password);
  },
};
