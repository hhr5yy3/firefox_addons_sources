import {Text} from './text.js';

// ---------- Context Menu (Side Effect) -------------------
class Menus {

  static {
    // menus not supported on Android
    browser.menus && this.init();
  }

  static init() {
    const contextMenus = [
      {id: 'copyPlainText',  contexts: ['selection'], title: browser.i18n.getMessage('extensionName')},
      {id: 'pastePlainText', contexts: ['editable']}
    ];

    contextMenus.forEach(item => {
      if (item.id) {
        // always use the same ID for i18n
        !item.title && (item.title = browser.i18n.getMessage(item.id));
      }
      browser.menus.create(item);
    });

    // prepare for manifest v3
    browser.menus.onClicked.addListener(this.process);

    // ---------- keyboard shortcuts ---------------------------
    browser.commands.onCommand.addListener(command =>
      this.process({menuItemId: command}));
  }

  static process(info, tab) {
    Text.process(info);
  }
}