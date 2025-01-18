import {App} from './app.js';
import {Pattern} from './pattern.js';

// ---------- Context Menu ---------------------------------
export class Text {

  static {
    // defaults
    this.data = [];
    this.spacial = null;
  }

  static init(data) {
    // find special pattern
    this.spacial = data.find(i => i.active && i.pattern === '(linkUrl)(linkText)');

    // convert pattern to RegExp
    this.data = data.filter(i => i.active && i.pattern !== '(linkUrl)(linkText)').map(i =>
      ({pattern: Pattern.convertPattern(i.pattern), replacement: i.replacement}));
  }

  static process(info) {
    switch (info.menuItemId) {
      case 'copyPlainText':
        this.processCopy(info);
        break;

      case 'pastePlainText':
        this.processPaste();
        break;
    }
  }

  static async processCopy(info) {
    // check for special pattern
    let text = this.getSpecial(info);
    if (typeof text === 'string') {
      this.copy(text);
      return;
    }

    text = await this.getText(info);
    text &&= this.prepareText(text);
    text &&= this.custom(text);
    text && this.copy(text);
  }

  static async processPaste() {
    let text = await navigator.clipboard.readText();
    text &&= this.prepareText(text);
    text &&= this.custom(text);
    text && this.paste(text);
  }

  static getSpecial(info) {
    // special pattern linkText - linkUrl
    if (info.linkUrl && this.spacial) {
      return `${info.linkUrl} ${info.linkText}`.replace(/(\S+) (.+)/, this.spacial.replacement);
    }
  }

  static async getText(info) {
    // https://searchfox.org/mozilla-central/source/toolkit/modules/SelectionUtils.sys.mjs135
    // Pass up to 16K through unmolested. If an add-on needs more, they will
    // have to use a content script.
    if (info.selectionText?.length < 16384) {               // not available from onCommand
      return info.selectionText;
    }

    // get text from page content
    const code =
`(() => {
  const node = document.activeElement;
  return ['TEXTAREA', 'INPUT'].includes(node?.nodeName) ?
    node.value.slice(node.selectionStart, node.selectionEnd) :
    window.getSelection().toString();
})();`;

    // https://bugzilla.mozilla.org/show_bug.cgi?id=1841483
    // tabs.executeScript with activeTab fails to inject in a nested iframe
    // <all_urls> permission needed as a workaround
    // also bug 1838753, 1653408
    return browser.tabs.executeScript({code, allFrames: true})
    .then((result = []) => {
      const text = result.join('');
      if (text) {
        return text;
      }
      this.notify('Selection');
    })
    .catch(error => this.notify('Selection', error));
  }

  static prepareText(text) {
    return text.trim()
                .replace(/[\r\n]+/g, '\n')
                .replace(/[ \t\f\v]+/g, ' ');
  }

  static custom(text) {
    this.data.forEach(({pattern, replacement}) =>
      text = text.replace(pattern, replacement));
    return text;
  }

  static copy(text) {
    navigator.clipboard.writeText(text)
    .catch(error => this.notify('Clipboard', error));
  }

  static paste(text) {
    const code = `(() => document.execCommand('paste'))();`;

    // re-write the text back to clipboard
    navigator.clipboard.writeText(text)
    .then(() => browser.tabs.executeScript({code, allFrames: true}))
    .catch(error => this.notify('Paste', error));
  }

  static notify(ref, error = '') {
    error &&= '\n' + error;
    App.notify(ref + ': ' + browser.i18n.getMessage('error') + error);
  }
}