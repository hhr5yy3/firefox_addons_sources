var password_manager = {
  length: 15,
  isEasyRead: false,
  isUpper: true,
  isLower: true,
  isNumber: true,
  isSymbol: true,
  chars: [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "0123456789",
    "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~",
  ],
  easyReadChars: [
    "ABCDEFGHIJKLMNPQRSTUVWXYZ",
    "abcdefghijkmnpqrstuvwxyz",
    "23456789",
    "!\"#$%&'()*+,-./:;<=>?@[]^_`{}~",
  ],
  getRandomInt: function (range) {
    return Math.floor(Math.random() * Math.floor(range));
  },
  getRandomChar: function (chars) {
    let index = this.getRandomInt(chars.length);
    return chars[index];
  },
  generate: function () {
    var password = "";
    while (password.length != this.length) {
      let group_index = this.getRandomInt(4);
      if (group_index === 0 && this.isUpper) {
        password += this.getRandomChar(
          this.isEasyRead ? this.easyReadChars[0] : this.chars[0]
        );
      } else if (group_index === 1 && this.isLower) {
        password += this.getRandomChar(
          this.isEasyRead ? this.easyReadChars[1] : this.chars[1]
        );
      } else if (group_index === 2 && this.isNumber) {
        password += this.getRandomChar(
          this.isEasyRead ? this.easyReadChars[2] : this.chars[2]
        );
      } else if (group_index === 3 && this.isSymbol) {
        password += this.getRandomChar(
          this.isEasyRead ? this.easyReadChars[3] : this.chars[3]
        );
      }
    }
    return password;
  },
  calculateEntropy: function (password) {
    let length = password_manager.length;
    if (length === 0) {
      return 0;
    }
    let strength = this.calculateStrength(password);
    return length * Math.log2(strength);
  },
  calculateStrength: function (password) {
    let strength = 0;
    let patterns = [
      "^(?=.*[a-z])",
      "^(?=.*[A-Z])",
      "^(?=.*[0-9])",
      /^(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])/,
    ];
    for (let i = 0; i < patterns.length; i++) {
      let regEx = new RegExp(patterns[i]);
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
};
