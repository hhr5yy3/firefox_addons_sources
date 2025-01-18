import {App} from './app.js';

export class Pattern {

  static validate(str) {
    try {
      new RegExp(str);
      return true;
    }
    catch(error) {
      App.notify(browser.i18n.getMessage('regexError') + '\n\n' + error);
    }
  }

  static convertPattern(str) {
    // --- Regex string
    const[, pattern, flag = ''] = str.match(/^\/(.+)\/([dgimsuy]*)$/) || [];
    if (pattern) {
      return new RegExp(pattern, flag);
    }

    // --- normal string
    const regexSpChar = /[-\/\\^$*+?.()|[\]{}]/g;           // Regular Expression Special Characters
    return new RegExp(str.replace(regexSpChar, '\\$&'), 'gi');
  }
}