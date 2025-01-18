export {pref, App, Redirect};

// ----------------- Default Preference --------------------
let pref = {
  menus: [
    {id: 'closeDuplicate', icons: {16: 'image/close.svg'}},
    {id: 'saveAsPDF', icons: {16: 'image/pdf.svg'}},
    {id: 'capture', icons: {16: 'image/camera.svg'}},
    {id: 'print', icons: {16: 'image/print.svg'}},
    {type: 'separator'},

    {id: 'copy', icons: {16: 'image/copy.svg'}},
      {parentId: 'copy', id: 'copyTitle', icons: {16: 'image/title.svg'}},
      {parentId: 'copy', id: 'copyIP', icons: {16: 'image/ip.svg'}},
      {parentId: 'copy', type: 'separator'},

      {parentId: 'copy', id: 'copyUrl'},
      {parentId: 'copy', id: 'copyUrlAll'},
      {parentId: 'copy', id: 'copyUrlLeft'},
      {parentId: 'copy', id: 'copyUrlRight'},
      {parentId: 'copy', type: 'separator'},

      {parentId: 'copy', id: 'copyTitleUrl'},
      {parentId: 'copy', id: 'copyTitleUrlAll'},
      {parentId: 'copy', id: 'copyTitleUrlLeft'},
      {parentId: 'copy', id: 'copyTitleUrlRight'},
      {parentId: 'copy', type: 'separator'},

      {parentId: 'copy', id: 'customCopy'},
      {parentId: 'copy', id: 'customAll'},
      {parentId: 'copy', id: 'customLeft'},
      {parentId: 'copy', id: 'customRight'},

    {id: 'bookmark', icons: {16: 'image/library.svg'}},
      {parentId: 'bookmark', id: 'bookmarkAll'},
      {parentId: 'bookmark', id: 'bookmarkLeft'},
      {parentId: 'bookmark', id: 'bookmarkRight'},

    {id: 'closeBookmarked', icons: {16: 'image/removed-bookmark.svg'}},
      {parentId: 'closeBookmarked', id: 'closeBookmarkedAll'},
      {parentId: 'closeBookmarked', id: 'closeBookmarkedLeft'},
      {parentId: 'closeBookmarked', id: 'closeBookmarkedRight'},

    {id: 'host', icons: {16: 'image/host.svg'}},
      {parentId: 'host', id: 'hostKeep', icons: {16: 'image/check.svg'}},
      {parentId: 'host', id: 'hostClose', icons: {16: 'image/close.svg'}},
      {parentId: 'host', id: 'hostCloseOther'},
      {parentId: 'host', id: 'hostMoveNewWin', icons: {16: 'image/move.svg'}},
      {parentId: 'host', id: 'hostMoveThisWin', icons: {16: 'image/move.svg'}},
      {parentId: 'host', id: 'hostReload', icons: {16: 'image/reload.svg'}},

    {id: 'sort', icons: {16: 'image/sort-asc.svg'}},
      {parentId: 'sort', id: 'sortURLAsc'},
      {parentId: 'sort', id: 'sortURLDesc'},
      {parentId: 'sort', type: 'separator'},

      {parentId: 'sort', id: 'sortTitleAsc'},
      {parentId: 'sort', id: 'sortTitleDesc'},
      {parentId: 'sort', type: 'separator'},

      {parentId: 'sort', id: 'sortLastAccAsc'},
      {parentId: 'sort', id: 'sortLastAccDesc'},
      {parentId: 'sort', type: 'separator'},

      {parentId: 'sort', id: 'sortDomAsc'},
      {parentId: 'sort', id: 'sortDomDesc'},
      {parentId: 'sort', type: 'separator'},

      {parentId: 'sort', id: 'sortReverse'},

    {id: 'move', icons: {16: 'image/move.svg'}},
      {parentId: 'move', id: 'moveNewWinLeft'},
      {parentId: 'move', id: 'moveNewWinRight'},
      {parentId: 'move', type: 'separator'},

      {parentId: 'move', id: 'movePrivate', icons: {16: 'image/privateBrowsing.svg'}},
      {parentId: 'move', id: 'movePrivateLeft'},
      {parentId: 'move', id: 'movePrivateRight'},

    {id: 'discard', icons: {16: 'image/sleep.svg'}},
      {parentId: 'discard', id: 'discardTab'},
      {parentId: 'discard', id: 'discardAll'},
      {parentId: 'discard', id: 'discardLeft'},
      {parentId: 'discard', id: 'discardRight'},

    {id: 'hide', icons: {16: 'image/hide.svg'}},
      {parentId: 'hide', id: 'hideTab'},
      {parentId: 'hide', id: 'hideAll'},
      {parentId: 'hide', id: 'hideLeft'},
      {parentId: 'hide', id: 'hideRight'},

    {id: 'show', icons: {16: 'image/show.svg'}},
      {parentId: 'show', id: 'showAll'},
      {parentId: 'show', id: 'showLeft'},
      {parentId: 'show', id: 'showRight'},

    {id: 'pin', icons: {16: 'image/pin.svg'}},
      {parentId: 'pin', id: 'pinAll'},
      {parentId: 'pin', id: 'pinLeft'},
      {parentId: 'pin', id: 'pinRight'},

    {id: 'unpin', icons: {16: 'image/unpin.svg'}},
      {parentId: 'unpin', id: 'unpinAll'},
      {parentId: 'unpin', id: 'unpinLeft'},
      {parentId: 'unpin', id: 'unpinRight'},

    {id: 'createShortcut', icons: {16: 'image/shortcut.svg'}},
      {parentId: 'createShortcut', id: 'createShortcutTab'},
      {parentId: 'createShortcut', id: 'createShortcutAll'},
      {parentId: 'createShortcut', id: 'createShortcutLeft'},
      {parentId: 'createShortcut', id: 'createShortcutRight'},

    {id: 'window', icons: {16: 'image/new-window.svg'}},
      {parentId: 'window', id: 'mergeWindows', icons: {16: 'image/new-window.svg'}},
      {parentId: 'window', id: 'closeOtherWindows', icons: {16: 'image/close.svg'}},

    {id: 'reload', icons: {16: 'image/reload.svg'}},
      {parentId: 'reload', id: 'reloadAll'},
      {parentId: 'reload', id: 'reloadLeft'},
      {parentId: 'reload', id: 'reloadRight'},
      {parentId: 'reload', type: 'separator'},

      {parentId: 'reload', id: 'reload1'},
      {parentId: 'reload', id: 'reload2'},
      {parentId: 'reload', id: 'reload3'},
      {parentId: 'reload', id: 'reload4'},
      {parentId: 'reload', id: 'reload5'},
      {parentId: 'reload', id: 'customReload'},

      {parentId: 'reload', id: 'reloadStop', icons: {16: 'image/disable.svg'}},
  ],

  tabCounter: true,
  perWindow: true,
  altIcon: false,
  badgeBGColor: '#ff7700',
  badgeTextColor: '#ffffff',
  maxTabs: 0,
  customCopy: '',
  customReload: 10,
  cleanUrl: false,
  showFlag: true,
  pageSettings: '',
  date: [],
  clock: [],
  hour12: false,
  weekday: 'long',
  month: 'long',
  menuChanged: false,
  container: {},
  theme: null,
  themes: [],
  redirect: '',
};
// ----------------- /Default Preference -------------------

// ----------------- App -----------------------------------
class App {

  // ----------------- User Preference -----------------------
  static getPref() {
    // update pref with the saved version
    return browser.storage.local.get().then(result => {
      Object.keys(result).forEach(item => pref[item] = result[item]);
    });
  }

  static importExport(callback) {
    this.callback = callback;
    document.getElementById('file').addEventListener('change', this.import);
    document.getElementById('export').addEventListener('click', this.export);
  }

  static import(e) {
    const file = e.target.files[0];
    switch (true) {
      case !file: App.notify(browser.i18n.getMessage('error')); return;
      case !['text/plain', 'application/json'].includes(file.type): // check file MIME type
        App.notify(browser.i18n.getMessage('fileTypeError'));
        return;
    }

    const reader  = new FileReader();
    reader.onloadend = () => App.readData(reader.result);
    reader.onerror = () => App.notify(browser.i18n.getMessage('fileReadError'));
    reader.readAsText(file);
  }

  static readData(data) {
    try { data = JSON.parse(data); }
    catch(e) {
      App.notify(browser.i18n.getMessage('fileParseError')); // display the error
      return;
    }

    // update pref with the saved version
    Object.keys(pref).forEach(item => data.hasOwnProperty(item) && (pref[item] = data[item]));

    this.callback();                                        // successful import
  }

  static export() {
    const data = JSON.stringify(pref, null, 2);
    const filename = `${browser.i18n.getMessage('extensionName')}_${new Date().toISOString().substring(0, 10)}.json`;
    App.saveFile({data, filename});
  }

  static saveFile({data, filename, saveAs = true, type = 'text/plain'}) {
    if (!browser.downloads) {
      const a = document.createElement('a');
      a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(data);
      a.setAttribute('download', filename);
      a.dispatchEvent(new MouseEvent('click'));
      return;
    }

    const blob = new Blob([data], {type});
    browser.downloads.download({
      url: URL.createObjectURL(blob),
      filename,
      saveAs,
      conflictAction: 'uniquify'
    });
  }

  // ----------------- Helper functions ----------------------
  static notify(message, title = browser.i18n.getMessage('extensionName'), id = '') {
    browser.notifications.create(id, {
      type: 'basic',
      iconUrl: '/image/icon.svg',
      title,
      message
    });
  }

  static JSONparse(str) {
    try { return JSON.parse(str); } catch (e) { return null; }
  }

  static getFlag(cc) {
    cc = /^[A-Z]{2}$/i.test(cc) && cc.toUpperCase();
    return cc ? String.fromCodePoint(...[...cc].map(c => c.charCodeAt() + 127397)) : '\u{1f5fa}';
  }

  static dateTimeFormat(locale, date) {
    let text = new Intl.DateTimeFormat(locale,
                  {weekday: pref.weekday, year: 'numeric', month: pref.month, day: 'numeric'}).format(date);

    // --- fix poor text display
    switch (locale) {
      case 'fa-IR': text = text.split(/[\s,]+/).reverse(). join(' '); break;
    }
    return text;
  }
}
App.android = navigator.userAgent.includes('Android');
App.defaultPref = JSON.parse(JSON.stringify(pref));
// ----------------- /App ----------------------------------

// ----------------- Redirect ------------------------------
class Redirect {

  static init() {
    this.option = null;                                     // reset

    if (!pref.redirect) {
      return;                                               // no pattern
    }

    // convert to RegExp
    this.option = pref.redirect.split(/[\r\n]+/)
                                .map(i => i.split(/\s+/))
                                .map(i => [this.convert(i[0]), i[1], i[2] && this.convert(i[2])]);
  }

  static convert(item) {
    return item.includes('\\') ? new RegExp(`^${item}$`, 'i') :
      new RegExp('^' + item.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&')
                            .replace(/\*/g, '(.*)')
                            .replace(/:\\\/\\\/\.\*\\./, '://(.+\\.)?') + '$', 'i');
  }

  static process(url) {
    return this.option ? this.get(url) : url;
  }

  static get(url) {
    this.option.forEach(([inc, rep, excl]) =>
      url = excl && excl.test(url) ? url : url.replace(inc, rep));

    return url;
  }
}
// ----------------- Redirect ------------------------------