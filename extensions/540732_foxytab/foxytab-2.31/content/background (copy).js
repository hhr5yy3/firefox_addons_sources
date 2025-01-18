import {pref, App, Redirect} from './app.js';
import {Geo} from '../geo/geo.js';

// ----------------- Process Preference --------------------
class ProcessPref {

  async process() {
    await Migrate.run();

    browser.storage.onChanged.addListener((changes, area) => { // Change Listener
      Object.keys(changes).forEach(item => pref[item] = changes[item].newValue); // update pref with the saved version
      this.processPrefUpdate(changes);                      // apply changes
    });

    menus.init();
    tabCounter.init();
    tabIP.init();
    Redirect.init();
    Container.init();
    pref.theme && browser.theme.update(pref.theme);

    // --- Alt Icon
    pref.altIcon && browser.browserAction.setIcon({path: {16: '/image/icon-alt.svg'}});

    // --- toolbar title
    const date = new Date();
    const title = pref.date.map(locale =>
       (App.getFlag(locale.slice(-2)) || '\u{1f5fa}') + '  ' + App.dateTimeFormat(locale, date));

    // --- set title
    title[0] && browser.browserAction.setTitle({title: title.join('\n')});
  }

  hasChanged(changes, item) {
    return changes[item] && changes[item].newValue !== changes[item].oldValue;
  }

  processPrefUpdate(changes) {
    if (this.hasChanged(changes, 'tabCounter')) {
      tabCounter.init();
    }
    else if (this.hasChanged(changes, 'perWindow')) {
      tabCounter.countAll();
    }

    this.hasChanged(changes, 'showFlag') && tabIP.init();
    this.hasChanged(changes, 'redirect') && Redirect.init();
    this.hasChanged(changes, 'container') && Container.init();
    this.hasChanged(changes, 'menus') && browser.menus.removeAll().then(() => menus.init()); // remove and recreate

    this.hasChanged(changes, 'altIcon') &&
      browser.browserAction.setIcon({path: pref.altIcon ? {16: '/image/icon-alt.svg'} : null});
  }
}
const processPref = new ProcessPref();
// ----------------- /Process Preference -------------------

// ----------------- Context Menu --------------------------
/*
  Pin Tab: Firefox 4
  https://bugzilla.mozilla.org/show_bug.cgi?id=574487
  Mute Tab: Firefox 43
  https://bugzilla.mozilla.org/show_bug.cgi?id=1197569
  Duplicate Tab: Firefox 57
  https://bugzilla.mozilla.org/show_bug.cgi?id=455722
  Reload Tab: Firefox 68
  https://bugzilla.mozilla.org/show_bug.cgi?id=1523763
  Close Tabs to Left: Firefox 88
  https://bugzilla.mozilla.org/show_bug.cgi?id=1009728
  https://bugzilla.mozilla.org/show_bug.cgi?id=1703398
*/

class ContextMenu {

  constructor() {
    this.process = this.process.bind(this);
    this.reloadCache = {};
    browser.tabs.onUpdated.addListener((...p) => this.tabsOnUpdated(...p)); // needed to mark tabs on reload

    // --- Public Suffix List
    this.PSL = [];
    fetch('/lib/public_suffix_list.dat')
    .then(response => response.text())
    .then(text => this.PSL = text.split(/\n+/))
    .catch(console.error);
  }

  tabsOnUpdated(tabId, changeInfo, tab) {
    if (changeInfo.status !== 'complete') { return; }
    if (!this.reloadCache[tabId]) { return; }

    const code = this.reloadCache[tabId].code;
    browser.tabs.executeScript(tab.id, {code});              // mark the reload tab title
  }

  init() {
    // --- Tab Contextmenu
    const menus = JSON.parse(JSON.stringify(pref.menus));   // deep clone to prevent changes to the original
    menus.forEach(item => {
      if (item.disabled) { return; }                        // skip to next
      delete item.disabled;
      if (item.id) {
        !item.title && (item.title = browser.i18n.getMessage(item.id)); // always use the same ID for i18n
        item.onclick = this.process;

        // auto-add icons, if not set
        switch (true) {
          case !!item.icons: break;
          case item.id.endsWith('All'): item.icons = {16: 'image/left-right.svg'}; break;
          case item.id.endsWith('Left'): item.icons = {16: 'image/left.svg'}; break;
          case item.id.endsWith('Right'): item.icons = {16: 'image/right.svg'}; break;
          case item.id.endsWith('Asc'): item.icons = {16: 'image/sort-asc.svg'}; break;
          case item.id.endsWith('Desc'): item.icons = {16: 'image/sort-desc.svg'}; break;
        }
      }
      item.contexts = ['tab'];
      browser.menus.create(item);
    });

    // --- browserAction Contextmenu
    const contextMenus = [
      {id: 'options', icons: {16: 'image/gear.svg'}},
      {id: 'selectMatch', icons: {16: 'image/regex.svg'}},
      {id: 'closeDuplicate-2', icons: {16: 'image/close.svg'}},

      {id: 'sort-2', icons: {16: 'image/sort-asc.svg'}},
        {parentId: 'sort-2', id: 'sortURLAsc-2'},
        {parentId: 'sort-2', id: 'sortURLDesc-2'},
        {parentId: 'sort-2', type: 'separator' },

        {parentId: 'sort-2', id: 'sortTitleAsc-2'},
        {parentId: 'sort-2', id: 'sortTitleDesc-2'},
        {parentId: 'sort-2', type: 'separator' },

        {parentId: 'sort-2', id: 'sortLastAccAsc-2'},
        {parentId: 'sort-2', id: 'sortLastAccDesc-2'},
        {parentId: 'sort-2', type: 'separator'},

        {parentId: 'sort-2', id: 'sortDomAsc-2'},
        {parentId: 'sort-2', id: 'sortDomDesc-2'},
        {parentId: 'sort-2', type: 'separator'},

        {parentId: 'sort-2', id: 'sortReverse-2'},

      {id: 'window-2', icons: {16: 'image/new-window.svg'} },
        {parentId: 'window-2', id: 'mergeWindows-2', icons: {16: 'image/new-window.svg'}},
        {parentId: 'window-2', id: 'closeOtherWindows-2', icons: {16: 'image/close.svg'}},
    ];

   contextMenus.forEach(item => {
      if (item.id) {
        // removing -2 added for duplicate item IDs
        !item.title && (item.title = browser.i18n.getMessage(item.id.replace('-2', '')));  // always use the same ID for i18n
        item.onclick = this.process;

        // auto-add icons, if not set
        switch (true) {
          case !!item.icons: break;
          case item.id.endsWith('Asc-2'): item.icons = {16: 'image/sort-asc.svg'}; break;
          case item.id.endsWith('Desc-2'): item.icons = {16: 'image/sort-desc.svg'}; break;
        }
      }
      item.contexts = ['browser_action'];
      browser.menus.create(item);
    });


    // ----------------- keyboard shortcuts ----------------
    browser.commands.onCommand.addListener(menuItemId => this.process({menuItemId}));

    // ----------------- Message Listener ------------------
    browser.runtime.onMessage.addListener((message, sender) => {
      message.id = 'selectMatch' && this.process({menuItemId: message.id});
    });
  }

  async process(info, tab) {
    const id = info.menuItemId.replace('-2', '');           // removing -2 added for duplicate item IDs

    // --- no tabs action
    switch (id) {
      // --- browserAction Contextmenu
      case 'options':
        return browser.runtime.openOptionsPage();

      case 'closeOtherWindows':
        return browser.windows.getAll({windowTypes: ['normal']}).then(windows =>
          windows.forEach(win => !win.focused && browser.windows.remove(win.id))
        );

      case 'capture':
        return browser.tabs.captureTab(tab?.id || null)     // no tab from commands
        .then(dataURL => this.copy(dataURL))
        .catch(App.notify);

      case 'print':                                         // prints the contents of the active tab
        return browser.tabs.print();

      case 'saveAsPDF':                                     // save the currently active tab as a PD
        return browser.tabs.saveAsPDF(App.JSONparse(pref.pageSettings) || {})
        .then(App.notify)
        .catch(App.notify);
    }

    // --- no tab from commands
    if (!tab) {
      tab = (await browser.tabs.query({currentWindow: true, active: true}))[0];
    }

    switch (id) {
      case 'mergeWindows':
        return this.moveToThisWindow({info, tab});

      case 'hostMoveThisWin':
        return this.moveToThisWindow({info, tab, id});
    }

    // --- Modifiers
    const query = {currentWindow: true};

    localStorage.getItem('pinned') !== 'true' && (query.pinned = false); // ignore pinned
    localStorage.getItem('hidden') !== 'true' && (query.hidden = false); // ignore hidden
    localStorage.getItem('container') === 'true' && (query.cookieStoreId = tab.cookieStoreId); // limit to container
    const duplicateToPrivate = localStorage.getItem('duplicateToPrivate') === 'true';

    // --- overrides
    id.startsWith('show') && (query.hidden = true, query.pinned = false);
    id.startsWith('hide') && (query.hidden = false, query.pinned = false);
    id.startsWith('pin') && (query.pinned = false);
    id.startsWith('unpin') && (query.pinned = true);


    // --- need all tabs
    let tabs = await browser.tabs.query(query);

    // --- limit target tabs
    switch (true) {
      // all tabs actions
      case id.startsWith('sortDom'):
        this.sortDomain(tabs);
        break;

      case id === 'closeDuplicate':
      case id === 'selectMatch':
      case id.startsWith('host'):
      case id.startsWith('sort'):
      case id.endsWith('All'):
        break;

      case id.endsWith('Left'):
        tabs = tabs.filter(item => item.index < tab.index);
        break;

      case id.endsWith('Right'):
        tabs = tabs.filter(item => item.index > tab.index);
        break;

      default:
        tabs = tabs.filter(item => item.highlighted);       // find highlighted tabs
        !tabs[1] && (tabs = [tab]);                         // only one selected tab, use clicked tab
    }

    if (!tabs[0]) { return; }

    const data = {info, tab, tabs};
    let host;

    // ----- all tabs action
    switch (id) {
      case 'closeDuplicate':
        const keep = [], rem = [];
        tabs.forEach(item => {
          const url = item.url.replace(/#.+/, '');          // disregard location.hash
          keep.includes(url) ? rem.push(item.id) : keep.push(url);
        });
        rem[0] && browser.tabs.remove(rem);
        break;

      // --- Host
      case 'hostKeep':
      case 'hostClose':
      case 'hostCloseOther':
        this.processHost(data);
        break;

     case 'hostMoveNewWin':
        host = this.getHost(info.pageUrl);
        if (!host) { return; }
        this.move(tabs.filter(tab => this.getHost(tab.url) === host));
        break;

      case 'hostReload':
        host = this.getHost(info.pageUrl);
        if (!host) { return; }
        tabs.forEach(tab => this.getHost(tab.url) === host && browser.tabs.reload(tab.id));
        break;

      // --- Sort (doesn't apply to hidden)
      case 'sortURLAsc':
      case 'sortURLDesc':
      case 'sortTitleAsc':
      case 'sortTitleDesc':
      case 'sortLastAccAsc':
      case 'sortLastAccDesc':
      case 'sortDomAsc':
      case 'sortDomDesc':
      case 'sortReverse':
        const {pinned, unpinned, hidden} = this.sortType(tabs);
        pinned[0] && this.sortGroup({id, grp: pinned, index: 0}); // handle pinned
        unpinned[0] && this.sortGroup({id, grp: unpinned, index: pinned.length || -1}); // handle unpinned
        break;

      case 'createShortcutTab':
      case 'createShortcutAll':
      case 'createShortcutLeft':
      case 'createShortcutRight':
        const saveAs = tabs.length < 2;                     // true for one
        tabs.forEach(tab => this.createShortcut(tab, saveAs));
        break;

      // --- Copy
      case 'copyTitle':
        this.copy(tabs.map(tab => tab.title));
        break;

      case 'copyIP':
        this.copy(tabs.map(tab => tabIP.tabCache?.[tab.id]?.ip || '-.-.-.-'));
        break;

      case 'copyUrl':
      case 'copyUrlAll':
      case 'copyUrlLeft':
      case 'copyUrlRight':
        this.copy(tabs.map(tab => CleanUrl.get(tab.url)));
        break;

      case 'copyTitleUrl':
      case 'copyTitleUrlAll':
      case 'copyTitleUrlLeft':
      case 'copyTitleUrlRight':
        this.copy(tabs.map(tab => `${tab.title}\n${CleanUrl.get(tab.url)}\n`));
        break;

      case 'customCopy':
      case 'customAll':
      case 'customLeft':
      case 'customRight':
        const cstm = this.getCustom();
        this.copy(tabs.map(tab => `${this.customTab(tab, cstm)}\n`));
        break;

      // --- Bookmark
      case 'bookmarkAll':
      case 'bookmarkLeft':
      case 'bookmarkRight':
        tabs.forEach(tab => browser.bookmarks.create({title: tab.title, url: tab.url}));
        break;

      // --- Close Bookmarked Tabs
      case 'closeBookmarkedAll':
      case 'closeBookmarkedLeft':
      case 'closeBookmarkedRight':
        const urlId = {};
        tabs.forEach(tab => urlId[tab.url] = tab.id);
        const cbUrl = Object.keys(urlId);
        browser.bookmarks.search({})
        .then(bm => {
          const rem = [];
          bm.forEach(item => cbUrl.includes(item.url) && rem.push(urlId[item.url]));
          rem[0] && browser.tabs.remove(rem);
        });
        break;

      // --- Move
      case 'moveNewWinLeft':
      case 'moveNewWinRight':
        this.move(tabs);
        break;

      case 'movePrivate':
      case 'movePrivateLeft':
      case 'movePrivateRight':
        const url = tabs.map(tab => tab.url);
        !duplicateToPrivate && browser.tabs.remove(tabs.map(tab => tab.id)); // delete without prompt
        browser.windows.create({incognito: true, url});       // create new tabs in new Private Window
        break;

      // --- Discard
      case 'discardTab':
      case 'discardAll':
      case 'discardLeft':
      case 'discardRight':
        browser.tabs.discard(tabs.map(tab => tab.id));
        break;

      // --- Hide
      case 'hideTab':
      case 'hideAll':
      case 'hideLeft':
      case 'hideRight':
        browser.tabs.hide(tabs.map(tab => tab.id));
        break;

      // --- Show
      case 'showAll':
      case 'showLeft':
      case 'showRight':
        browser.tabs.show(tabs.map(tab => tab.id));
        break;

      // --- Pin
      case 'pinAll':
      case 'pinLeft':
      case 'pinRight':
        tabs.forEach(tab => browser.tabs.update(tab.id, {pinned: true}));
        break;

      // --- Unpin
      case 'unpinAll':
      case 'unpinLeft':
      case 'unpinRight':
        tabs.reverse().forEach(tab => browser.tabs.update(tab.id, {pinned: false}));
        break;

      // --- Reload
      case 'reloadAll':
      case 'reloadLeft':
      case 'reloadRight':
        tabs.forEach(tab => browser.tabs.reload(tab.id));
        break;

      case 'reload1':
      case 'reload2':
      case 'reload3':
      case 'reload4':
      case 'reload5':
      case 'customReload':
        this.reloadStop(tab.id);                            // stop previously running reload process on this tab if any
        const m = id === 'customReload' ? pref.customReload : id.substring(6);
        const code = `document.title = '${m} \u23f3 ' + document.title;`;
        tabs.forEach(tab => {
          browser.tabs.executeScript(tab.id, {code});       // mark the title
          this.reloadCache[tab.id] = {
              code,
              id: setInterval(() =>
                    browser.tabs.reload(tab.id).catch(() => this.reloadStop(tab.id)), m*60000)
          };
        });
        return;

      case 'reloadStop':
        tabs.forEach(tab => this.reloadStop(tab.id));
        break;

      case 'selectMatch':
        this.selectTabs(tabs);
        break;
    }
  }

  reloadStop(tabId) {
    clearInterval(this.reloadCache[tabId]?.id);
    delete this.reloadCache[tabId];
  }

  getCustom() {
    const dt = new Date();
    const dStr = dt.toString();                             // Tue Aug 19 1975 23:15:30 GMT+0200 (CEST)
    return {
      '{date}':     dStr.substring(0, 15),                  // Tue Aug 19 1975
      '{time}':     dStr.substring(16, 24),                 // 23:15:30
      '{yyyy}':     dStr.substring(11, 15),                 // 1975
      '{mm}':       dt.toISOString().substring(5, 7),       // 03 e.g. 2021-03-20T06:43:15.806Z
      '{dd}':       dStr.substring(8, 10),                  // 19
    };
  }

  customTab(tab, custom) {
    custom =  {
      ...custom,
      '{title}':    tab.title,
      '{url}':      CleanUrl.get(tab.url),
      '{hostname}': new URL(tab.url).hostname,
      '{ip}':       tabIP.tabCache?.[tab.id]?.ip || '-.-.-.-'
    };

    let text = pref.customCopy;
    Object.keys(custom).forEach(item => text = text.split(item).join(custom[item]));
    return text;
  }

  sortDomain(tabs) {
    tabs.forEach(tab => {
      const u = new URL(tab.url);
      const p = u.hostname.split('.');

      switch(true) {
        case !u.hostname:
        case ['about:', 'chrome:', 'file:', 'moz-extension:', 'resource:', 'view-source:'].includes(u.protocol):
          tab.domPath = tab.url;
          break;

        default:
          tab.domPath = [...p.slice(-2), ...p.slice(0, -2)].join('.') + u.pathname; // default
          let n = p.length - (p[0] === 'www' ? 1 : 0);      // disregard www.
          while (n > 2) {
            if (this.PSL.includes(p.slice(-n+1).join('.'))) {
              tab.domPath = [...p.slice(-n), ...p.slice(0, -n)].join('.') + u.pathname;
              break;
            }
            n--;
          }
      }
    });
  }

  sortType(tabs) {
    // sort pinned & unpinned & hidden
    const sorted = {
      pinned: [],
      unpinned: [],
      hidden: [],
    };
    tabs.forEach(tab => {
      switch (true) {
        case tab.pinned:    sorted.pinned.push(tab); break;
        case tab.hidden:    sorted.hidden.push(tab); break;
        default:            sorted.unpinned.push(tab);
      }
    });

    return sorted;
  }

  sortGroup({id, grp, index}) {
    switch (id) {
      case 'sortURLAsc':      grp.sort((a, b) => a.url.localeCompare(b.url)); break;
      case 'sortURLDesc':     grp.sort((b, a) => a.url.localeCompare(b.url)); break;
      case 'sortTitleAsc':    grp.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'sortTitleDesc':   grp.sort((b, a) => a.title.localeCompare(b.title)); break;
      case 'sortLastAccAsc':  grp.sort((a, b) => a.lastAccessed > b.lastAccessed); break;
      case 'sortLastAccDesc': grp.sort((b, a) => a.lastAccessed > b.lastAccessed); break;
      case 'sortDomAsc':      grp.sort((a, b) => a.domPath.localeCompare(b.domPath)); break;
      case 'sortDomDesc':     grp.sort((b, a) => a.domPath.localeCompare(b.domPath)); break;
      case 'sortReverse':     grp.reverse(); break;
    }

    const ids = grp.map(tab => tab.id);
    browser.tabs.move(ids, {index});
  }

  getHost(str) {
    const url = new URL(str);
    // blank on: (about: view-source: file: chrome: resource:), use protocol
    return url && (url.hostname || url.protocol);
  }

  processHost({info, tab, tabs}) {                          // host based tab action
    const host = this.getHost(tab.url);
    if (!host) { return; }

    const rem = [];
    tabs.forEach(item => {
      if (info.menuItemId === 'hostCloseOther' && item.id === tab.id) { return; } // Close Host other Tabs but keep this one
      const aHost = this.getHost(item.url);
      if (!aHost) { return; }
      (info.menuItemId === 'hostKeep' ? aHost !== host : aHost === host) && rem.push(item.id);
    });

    rem[0] && browser.tabs.remove(rem);
  }

  moveToThisWindow({info, tab, id}) {
    const windowId = tab.windowId;
    browser.tabs.query({currentWindow: false})
    .then(tabs => {
      // filter same type
      tabs = tabs.filter(item => item.incognito === tab.incognito);
      if (id === 'hostMoveThisWin') {
        const host = this.getHost(tab.url);
        // filter same host
        tabs = tabs.filter(item => this.getHost(item.url) === host);
      }

      const {pinned, unpinned, hidden} = this.sortType(tabs);

      // handle pinned
      if (pinned[0]) {
        // worksround for https://bugzilla.mozilla.org/show_bug.cgi?id=1766159
        const ids = [pinned.shift(), ...pinned.reverse()].map(tab => tab.id);
        browser.tabs.move(ids, {windowId, index: 0});
      }

      // handle unpinned
      if (unpinned[0]) {
        browser.tabs.move(unpinned.map(tab => tab.id), {windowId, index: -1});
      }
    });
  }

  createShortcut(tab, saveAs = true) {
    const data =
`<html>
  <head>
    <meta http-equiv="refresh" content="0; url=${CleanUrl.get(tab.url)}">
  </head>
  <body> </body>
</html>`;

    const filename = tab.title.replace(/[<>:"/\\|?*]/g, '') + '.html'; // removing disallowed characters
    App.saveFile({data, filename, saveAs, type: 'text/html'});
  }

  move(tabs) {
    const ids = tabs.map(tab => tab.id);
    browser.windows.create({tabId: ids[0]})
    .then(win => {
      ids.shift();
      browser.tabs.move(ids, {windowId: win.id, index: 1});
    });
  }

  copy(a) {
    const text = Array.isArray(a) ? a.join('\n') : a;
    navigator.clipboard.writeText(text)                     // FF63+
    .catch(error => App.notify(browser.i18n.getMessage('clipboardError') + '\n' + error)); // failed copy notification
  }

  selectTabs(tabs) {
    const selectMatch = localStorage.getItem('selectMatch');
    if (!selectMatch) { return; }

    const regex = new RegExp(selectMatch, 'i');
    let activeId;
    tabs.forEach(tab =>
      regex.test(tab.url) ? !tab.active && browser.tabs.update(tab.id, {highlighted: true}) :
        tab.active ? activeId = tab.id : tab.highlighted && browser.tabs.update(tab.id, {highlighted: false})
    );
    activeId && browser.tabs.update(activeId, {active: false, highlighted: false}); // deactivate
  }
}
const menus = new ContextMenu();
// ----------------- /Context Menu -------------------------

// ----------------- OnBeforeRequest Shared ----------------
class OnBeforeRequest {

  constructor() {
    // Only requests made using HTTP or HTTPS will trigger events,
    // other protocols (such as data: and file:) supported by pattern matching do not trigger events.
    // view-source: requests may be matched based on its inner URL.
    browser.webRequest.onBeforeRequest.addListener(this.process, {
        urls: ['*://*/*'],
        types: ['main_frame']
      },
      ['blocking']
    );
  }

  process(e) {
    // --- Clean Url & Redirect
    let redirectUrl = CleanUrl.process(e.url);
    redirectUrl = Redirect.process(redirectUrl);
    if (redirectUrl !== e.url) { console.log(e.url + '\n' + redirectUrl); // temporary feedback logging
      return {redirectUrl};
    }

    // --- Container
    return Container.process(e);
  }
}
new OnBeforeRequest();
// ----------------- /OnBeforeRequest Shared ---------------

// ----------------- Clean URL -----------------------------
class CleanUrl {

  static process(url) {
    return pref.cleanUrl ? this.get(url) : url;
  }

  static get(url) {
    if (!url.startsWith('http')) { return url; }

    const u = new URL(url);
    const params = Object.fromEntries(u.search.substring(1).split('&').map(p => p.split('=')));

    switch (u.hostname) {
      // --- get redirect URL
      case 'l.facebook.com':
      case 'lm.facebook.com':
      case 'l.instagram.com':
        if (params['u']) {
          return decodeURIComponent(params['u']);
        }
        break;

      case 'www.google.com':
        if (u.pathname.startsWith('/url') && params['u']) {
          return decodeURIComponent(params['u']);
        }
        break;

      case 'www.youtube.com':
        if (u.pathname.startsWith('/redirect') && params['q']) {
          return decodeURIComponent(params['q']);
        }
        break;

      case 'outgoing.prod.mozaws.net':
        const [, temp] = u.pathname.split('http');
        if (temp) {
          return decodeURIComponent('http' + temp);
        }
        break;

      // --- clean searchParams (params.delete() alters URL)
      case 'www.facebook.com':
        params['ref']?.startsWith['notif'] && delete params['ref']; // ref=notif
        params['notif_id'] && delete params['notif_id'];
        params['notif_t'] && delete params['notif_t'];
        break;

      case 'www.imdb.com':
        params['ref_'] && delete params['ref_'];
        break;
    }

    // facebook|instagram utm_* | Google psig=
    // https://www.instagram.com/reel/CcZxfHj.../?igshid=YmMyMTA2M2Y=
    const p = [
      'fbclid', 'ftag', 'igshid', 'ncid', 'psig', 'redir_token', 'stzid',
      'utm_campaign', 'utm_cid', 'utm_content', 'utm_medium', 'utm_name', 'utm_reader', 'utm_source', 'utm_term',
    ];
    p.forEach(item => delete params[item]);
    u.search = Object.entries(params).map(([key, value]) => value ? `${key}=${value}` : key).join('&');
    return u.href;
  }
}
// ----------------- /Clean URL ----------------------------

// ----------------- Container -----------------------------
class Container {

  static init() {
    this.option = null;                                     // reset

    if (!Object.entries(pref.container).some(([key, value]) => value.pattern[0])) {
      return;                                               // no pattern
    }

    // convert to RegExp
    this.option = {};
    Object.entries(pref.container).forEach(([key, value]) =>
      this.option[key] = {
        pattern: value.pattern.map(item => new RegExp(`^${item.replace(/\./g, '\\.').replace(/\*\\./, '(.*\\.|)')}$`, 'i')),
        siteIsolation: value.siteIsolation,
      }
    );
  }

  static process(e) {
    if (!this.option) { return; }                           // no patterns
    if (e.tabId === -1) { return; }                         // Set to -1 if the request isn't related to a tab
    if (e.incognito) { return; }                            // keep incognito tab as is

    const [, host] = e.url.split(/[:/]+/);
    if (!host) { return; }

    const opt = this.option;
    const id = Object.keys(opt).find(key => opt[key].pattern.some(item => item.test(host)));
    if (!id && !opt[e.cookieStoreId]?.siteIsolation) { return; }

    const cookieStoreId = id || 'firefox-default';

    // cookieStoreId: Only present if the extension has the "cookies" permission.
    if (e.cookieStoreId === cookieStoreId) { return; }      // keep same container tab as is

    browser.tabs.get(e.tabId)                               // need to get original active state
    .then(tab => {
      browser.tabs.create({url: e.url, active: tab.active, index: tab.index, cookieStoreId})
      // Error: No cookie store exists with ID firefox-container-5
      .catch(() => browser.tabs.create({url: e.url, active: tab.active, index: tab.index}));
      browser.tabs.remove(e.tabId);
    });

    return {cancel: true};
  }
}
// ----------------- /Container ----------------------------

// ----------------- Tab Counter ---------------------------
class TabCounter {

  constructor() {
    this.process = this.process.bind(this);
  }

  init() {
    const listeners = ['onCreated', 'onRemoved', 'onAttached', 'onDetached'];
    if (!pref.tabCounter) {
      listeners.forEach(item => browser.tabs[item].removeListener(this.process));
      this.resetBadges();
      return;
    }

    browser.browserAction.setBadgeBackgroundColor({color: pref.badgeBGColor});
    browser.browserAction.setBadgeTextColor({color: pref.badgeTextColor});
    listeners.forEach(item => browser.tabs[item].addListener(this.process));

    // count all windows
    this.countAll();
  }

  async resetBadges() {
    // reset window-specific badges
    const windows = await browser.windows.getAll();
    windows.forEach(async item => {
      await browser.browserAction.setBadgeText({windowId: item.id, text: null});
    });
    // reset global badge
    await browser.browserAction.setBadgeText({text: null});
  }

  async countAll(tab = {}, info = {}) {
    if (!pref.tabCounter) { return; }

    const tabs = await browser.tabs.query({});
    if (this.maxTabs(tab, tabs)) { return; }

    // sort windows
    const win = {};
    tabs.forEach(tab => {
      win[tab.windowId] || (win[tab.windowId] = []);
      win[tab.windowId].push(tab);
    });

    // onRemoved fires before removing
    const onRemoved = info.windowId && !info.isWindowClosing ? 1 : 0;

    Object.keys(win).forEach(id => {
      const text = (pref.perWindow ? win[id].length : tabs.length) - onRemoved + '';
      browser.browserAction.setBadgeText({windowId: id*1, text});
    });
  }

/*
  onCreated     tab {}  {}
  onRemoved     tabId   {windowId, isWindowClosing}
  onAttached    tabId   {newWindowId, newPosition}
  onDetached    tabId   {oldWindowId, oldPosition}
*/
  async process(tab, info = {}) {
    if (!pref.perWindow) {
      this.countAll(tab, info);
      return;
    }

    // fires once for each tab in the closing window
    if (info.isWindowClosing) { return; }

    // -- per window badge
    const windowId = info.windowId || info.oldWindowId || info.newWindowId || tab.windowId;
    const tabs = await browser.tabs.query({windowId});
    if (this.maxTabs(tab, tabs)) { return; }

    // onRemoved fires before removing
    const onRemoved = info.windowId && !info.isWindowClosing ? 1 : 0;

    const n = tabs.length - onRemoved;
    n && browser.browserAction.setBadgeText({windowId, text: n + ''});
  }

  maxTabs(tab, tabs) {
    // --- Max Tabs (only on onCreated)
    const max = pref.maxTabs *1;
    if (tab.windowId && max && tabs.length > max) {
      browser.tabs.remove(tab.id);
      App.notify(browser.i18n.getMessage('maxTabsError'));
      return true;
    }
  }
}
const tabCounter = new TabCounter();
// ----------------- /Tab Counter --------------------------

// ----------------- Tab IP --------------------------------
class TabIP {

  constructor() {
    this.tabCache = {};
    this.cacheTab = this.cacheTab.bind(this);
    this.checkPageAction = this.checkPageAction.bind(this);
    this.clearCache = this.clearCache.bind(this);

    // --- prepare IP database
    this.geo = new Geo();
  }

  init() {
    if (pref.showFlag) {
      browser.webRequest.onResponseStarted.addListener(this.cacheTab, {urls: ['<all_urls>'], types: ['main_frame']});
      browser.tabs.onUpdated.addListener(this.checkPageAction); // needed for JavaScript Tab updates and when webRequest doesn't fire
      browser.tabs.onRemoved.addListener(this.clearCache);    // clear Tab from tabCache
    }
    else {
      this.tabCache = {};
      browser.webRequest.onResponseStarted.removeListener(this.cacheTab);
      browser.tabs.onUpdated.removeListener(this.checkPageAction);
      browser.tabs.onRemoved.removeListener(this.clearCache);
    }
  }

  clearCache(tabId) {
    delete this.tabCache[tabId];
  }

  cacheTab(e) {
    const {tabId, ip, proxyInfo} = e;
    if (!ip) {
      this.tabCache[tabId] = {code: 'cache'};
      return;
    }

    if (this.tabCache?.[tabId]?.ip === ip) {                // same tab, same ip
      return;
    }

    const sameIP = Object.keys(this.tabCache).find(item => this.tabCache[item].ip === ip);
    if (sameIP) {                                           // different tab, same ip
      this.tabCache[tabId] = {...this.tabCache[sameIP]};
      return;
    }

    // Check for ProxyInfo https://bugzilla.mozilla.org/show_bug.cgi?id=1432388
    this.tabCache[tabId] = {ip, code: this.geo.getCC(ip), proxy: !!proxyInfo};
  }

  checkPageAction(tabId, changeInfo, tab) {                 // tabs.onUpdated only
    const {url} = tab;
    if (url === 'about:blank' || url === 'about:newtab' || changeInfo.status !== 'complete') { return; }

    switch (true) {
      // ----- webRequest doesn't fire on these
      case url.startsWith('about:'):
      case url.startsWith('view-source:'):
      case url.startsWith('moz-extension://'):
      case url.startsWith('chrome://'):
      case url.startsWith('resource://'):
        this.tabCache[tabId] = {code: 'firefox'};
        break;

      case url.startsWith('file://'):
        this.tabCache[tabId] = {code: 'private'};
        break;

      // ----- webRequest doesn't fire on some domains https://bugzilla.mozilla.org/show_bug.cgi?id=1430479
      // discourse.mozilla.org chat.mozilla.org
      case !this.tabCache[tabId]:
        this.tabCache[tabId] = {code: 'cache'};
        break;
    }
    this.tabCache[tabId] && this.showPageAction(tabId);
  }

  showPageAction(tabId) {
    const {ip, code = 'unknown', proxy} = this.tabCache[tabId];
    const db = this.geo.getCountry(code);
    const path = '/geo/image/' + code + '.png';
    let title = [];
    proxy && title.push(`\u{1f4bb} ${browser.i18n.getMessage('proxy')}`);
    ip && title.push(`\u{1f4cd}  ${ip}`);
    title.push(`${App.getFlag(code) || '\u{1f3f4}'}  ${db.country}`);
    db.continent  && title.push(`\u{1f30e}  ${db.continent}`);
    title = title.join('\n');

    browser.pageAction.setIcon({tabId, path});
    browser.pageAction.setTitle({tabId, title});
    browser.pageAction.show(tabId);
  }
}
const tabIP = new TabIP();
// ----------------- /Tab IP -------------------------------

// ----------------- Migrate -------------------------------
class Migrate {

  static async run() {
    const m = 2.27;
    if (localStorage.getItem('migrate')*1 >= m) { return; }

    // --- menus
    // 2.27 2022-05-09
    // 2.23 2022-04-22
    // 2.16 2022-04-11
    if (pref.menus.length !== App.defaultPref.menus.length) {
      const menus = JSON.parse(JSON.stringify(App.defaultPref.menus)); // deep clone to prevent changes to the original
      // --- find disabled menus
      const disabled = [];
      pref.menus.forEach(item => item.id && item.disabled && disabled.push(item.id));
      menus.forEach(item => item.id && disabled.includes(item.id) && (item.disabled = true));
      pref.menus = menus;
    }

    // --- 2.23 2022-04-22
    pref.cleanUrl = false;

    // --- 2.16 2022-04-11
    // container
    Array.isArray(pref.container) &&
      await browser.contextualIdentities.query({})
      .then(contexts => {
        const obj = {};
        contexts.forEach((item, index) => {
          obj[item.cookieStoreId] = {
            name: item.name,
            pattern: pref.container[index] ? pref.container[index].split(/\s+/) : [],
            siteIsolation: false,
          };
        });
        pref.container = obj;
      });

    // customCopy
    if (pref.customCopy.includes('\\n') || pref.customCopy.includes('\\t')) {
      pref.customCopy = pref.customCopy.split('\\n').join('\n').split('\\t').join('\t');
    }

    // indexedDB to storage
    IDB.init((hasStore) => {
      hasStore && IDB.getAll((result = []) => result[0] && (pref.themes = result));
      IDB.deleteDatabase();
    });

    // --- update database
    await browser.storage.local.set(pref);
    localStorage.setItem('migrate', m);                     // store migrate version locally
  }
}
// ----------------- /Migrate ------------------------------

// ----------------- IDB -----------------------------------
class IDB {                                                 // used for migrate

  static init(callback) {
    this.id = 'FoxyTab';
    this.store = 'themes';

    // ----- open DB
    const request = indexedDB.open(this.id, 1);
    request.onerror = () => App.notify(request.errorCode);
    request.onsuccess = () => {
      this.db = request.result;
      callback(this.db.objectStoreNames.contains(this.store));
    }
  }

  static getStore(mode = 'readonly') {                      // mode  "readonly", "readwrite", "versionchange"
    return this.db.transaction(this.store, mode).objectStore(this.store);
  }

  static getAll(callback) {
    this.getStore().getAll().onsuccess = e => callback(e.target.result);
  }

  static deleteDatabase() {
    indexedDB.deleteDatabase(this.id);
  }
}
// ----------------- /IDB ----------------------------------

// ----------------- User Preference -----------------------
App.getPref().then(() => processPref.process());

// ----------------- /User Preference ----------------------
