import {pref, App, Redirect} from './app.js';
import {zones} from './zones.js';
import './i18n.js';

// ----------------- Options -------------------------------
class Options {

  constructor(keys = Object.keys(pref)) {
    this.prefNode = document.querySelectorAll('#' + keys.join(',#')); // defaults to pref keys
    document.querySelector('button[type="submit"]').addEventListener('click', () => this.check()); // submit button
    this.pBar = document.querySelector('.progressBar');

    document.querySelector('#restore').addEventListener('click', () => this.restore);

    this.pageSettings = document.querySelector('#pageSettings');
    this.keys = keys;
  }

  process(save) {
    // 'save' is only set when clicking the button to save options
    this.prefNode.forEach(node => {
      // value: 'select-one', 'textarea', 'text', 'number'
      const attr = node.type === 'checkbox' ? 'checked' : 'value';
      save ? pref[node.id] = node[attr] : node[attr] = pref[node.id];
    });

    //save && !this.progressBar() && browser.storage.local.set(pref); // update saved pref
  }

  progressBar() {
    this.pBar.classList.toggle('on');
    setTimeout(() => this.pBar.classList.toggle('on'), 2000);
  }

  check() {
    // --- check pageSettings
    this.pageSettings.classList.remove('invalid');
    this.pageSettings.value = this.pageSettings.value.trim();
    if (this.pageSettings.value && !App.JSONparse(pageSettings.value)) {
      this.pageSettings.classList.add('invalid');
      App.notify(browser.i18n.getMessage('jsonError'));
      return;
    }

    // --- save options
    this.process(true);

    const data = {};
    this.keys.forEach(item => data[item] = pref[item]);

    this.progressBar();
    browser.storage.local.set(data);                        // update saved pref
  }

  restore() {
    pref = JSON.parse(JSON.stringify(App.defaultPref));
    options.process();
    dateClock.process();
    browser.contextualIdentities && container.process();
    menus.process();
    theme.process();
  }
}
const options = new Options(['tabCounter', 'perWindow', 'altIcon', 'badgeBGColor', 'badgeTextColor', 'maxTabs',
    'customCopy', 'customReload', 'cleanUrl', 'showFlag', 'pageSettings']);
// ----------------- /Options ------------------------------

// ----------------- Tab Counter Badge live update ---------
class Badge {

  constructor() {
    this.badgeBGColor = document.getElementById('badgeBGColor');
    this.badgeBGColor.addEventListener('change', this.setBadge);
    this.badgeTextColor = document.getElementById('badgeTextColor');
    this.badgeTextColor.addEventListener('change', this.setBadge);

    // --- reset bin
    this.badgeBGColor.nextElementSibling.addEventListener('click', this.setBadge);
    this.badgeTextColor.nextElementSibling.addEventListener('click', this.setBadge);
  }

  setBadge(e) {
    const node = e.target.value ? this : this.previousElementSibling;

    // --- reset bin
    if (!e.target.value) {
      if (node.value === node.defaultValue) { return; }     // no change
      node.value = node.defaultValue;                       // reset to default
    }

    switch (node.id) {
      case 'badgeBGColor':
        browser.browserAction.setBadgeBackgroundColor({color: node.value});
        break;

      case 'badgeTextColor':
        browser.browserAction.setBadgeTextColor({color: node.value});
        break;
    }
  }
}
new Badge();
// ----------------- /Tab Counter Badge live update --------

// ----------------- Date & Clock --------------------------
class DateClock {

  constructor() {
    this.template = document.querySelector('section.dateClock template').content.firstElementChild;
    this.dt = new Date();

    this.weekday = document.getElementById('weekday');
    this.month = document.getElementById('month');
    this.date = document.querySelector('.date ul');
    this.clock = document.querySelector('.clock ul');
    this.hour12 = document.getElementById('hour12');

    // --- live update display
    this.weekday.addEventListener('change', () => {
      pref.weekday = this.weekday.value;
      [...this.date.children].forEach(li => {
        const locale = li.dataset.pref;
        li.children[1].textContent = App.dateTimeFormat(locale, this.dt);
      });
    });

    this.month.addEventListener('change', () => {
      pref.month = this.month.value;
      [...this.date.children].forEach(li => {
        const locale = li.dataset.pref;
        li.children[1].textContent = App.dateTimeFormat(locale, this.dt);
      });
    });

    this.hour12.addEventListener('change', () => {
      pref.hour12 = this.hour12.checked;
      [...this.clock.children].forEach(li => {
        const [locale, timeZone] = li.dataset.pref.split(',');
        li.children[2].textContent = new Intl.DateTimeFormat(locale,
                    {hour: '2-digit', minute: '2-digit', hour12: pref.hour12, timeZone }).format(this.dt);
      });
    });

    // --- add buttons
    const dateLocale = document.querySelector('#dateLocale');
    document.querySelector('.date .selector button').addEventListener('click', () => {
      this.addDate(dateLocale.value);
    });

    const clockLocale = document.querySelector('#clockLocale');
    const timeZone = document.querySelector('#timeZone');
    document.querySelector('.clock .selector button').addEventListener('click', () => {
      this.addClock([clockLocale.value, timeZone.value]);
    });

    // --- submit button
    document.querySelector('section.dateClock button[type="submit"]').addEventListener('click', () => this.check());
  }

  process() {
    // --- reset
    this.date.textContent = '';
    this.clock.textContent = '';
    this.weekday.value = pref.weekday;
    this.month.value = pref.month;
    this.hour12.checked = pref.hour12;

    pref.date.forEach(item => this.addDate(item));
    pref.clock.forEach(item => this.addClock(item));
  }

  check() {
    const data = {
      weekday: this.weekday.value,
      month: this.month.value,
      date: [...this.date.children].map(item => item.dataset.pref),
      clock: [...this.clock.children].map(item => item.dataset.pref.split(',')),
      hour12: this.hour12.checked,
    };
    options.progressBar();
    browser.storage.local.set(data);                        // update saved pref
  }

  addDate(locale) {
    const li = this.template.cloneNode(true);
    li.dataset.pref = locale;
    li.children[0].textContent = App.getFlag(locale.slice(-2)) || '\u{1f5fa}';
    li.children[1].textContent = App.dateTimeFormat(locale, this.dt);

    li.children[3].addEventListener('click', this.upDown);
    li.children[4].addEventListener('click', this.upDown);
    li.children[5].addEventListener('click', () => li.remove());  // bin

    this.date.appendChild(li);
  }

  addClock([locale, timeZone]) {
    const li = this.template.cloneNode(true);
    li.dataset.pref = [locale, timeZone];
    li.children[0].textContent = App.getFlag(zones[timeZone]) || '\u{1f5fa}';
    li.children[1].textContent = timeZone.split('/').reverse()[0].replace('_', ' ');
    li.children[2].textContent = new Intl.DateTimeFormat(locale,
                  {hour: '2-digit', minute: '2-digit', hour12: pref.hour12, timeZone }).format(this.dt);

    li.children[3].addEventListener('click', this.upDown);
    li.children[4].addEventListener('click', this.upDown);
    li.children[5].addEventListener('click', () => li.remove());  // bin

   this.clock.appendChild(li);
  }

  upDown(e) {
    const li = this.parentNode;
    const previous = li.previousElementSibling;
    const next = li.nextElementSibling;

    if (this.classList.contains('up')) {
      previous &&  previous.before(li);
    }
    else {
      next && next.after(li);
    }
  }
}
const dateClock =  new DateClock();
// ----------------- /Date & Clock -------------------------

// ----------------- Context Menu --------------------------
class ContextMenu {

  constructor() {
    this.menuList = document.querySelector('.contextMenu ul');
    this.liTemplate = document.querySelector('.contextMenu template').content.firstElementChild;
    this.menusCache = {};                                   // cache the starting menu

    // --- up down delete buttons
    document.querySelectorAll('.contextMenu .up, .contextMenu .down').forEach(item =>
      item.addEventListener('click', (e) => this.upDown(e)));
    document.querySelector('.contextMenu .clear').addEventListener('click', () =>
      this.menuList.querySelectorAll('.on').forEach(item => item.classList.remove('on')));

    // --- submit button
    document.querySelector('section.contextMenu button[type="submit"]').addEventListener('click', () => this.check());
  }

  process() {
    this.menuList.textContent = '';                         // reset
    const docfrag = document.createDocumentFragment();
    let cache = {};

    pref.menus.forEach(item => {
      const li = this.liTemplate.cloneNode(true);
      li.id = item.id || '';
      li.dataset.parentId = item.parentId || '';            // check parent
      li.dataset.icons = item?.icons?.['16'] || '';
      li.dataset.type = item.type || '';
      li.dataset.level = !item.parentId ? 1 : cache[item.parentId] + 1; // check menu level
      li.addEventListener('click', (e) => this.selection(e));

      // ----- cache to use for the next entry
      li.id && (cache[li.id] = li.dataset.level*1);

      const label = li.children[0];
      const checkbox = label.children[0];

      checkbox.checked = !item.disabled;
      checkbox.addEventListener('change', () => this.updateSubMenus(li, checkbox.checked));
      item.id ? label.append(browser.i18n.getMessage(item.id)) : li.classList.add('separator');

      this.menusCache[li.id] = item;                               // cache each menu item, temporary ID
      docfrag.appendChild(li);
    });

    this.menuList.appendChild(docfrag);
  }

  check() {
    const menus = [...this.menuList.children].map(li => {
      // sort parent
      switch (true) {
        case li.dataset.level === '1':
          li.dataset.parentId = '';
          break;

        case li.previousElementSibling.dataset.level === li.dataset.level:
          li.dataset.parentId = li.previousElementSibling.dataset.parentId;
          break

        default:
          li.dataset.parentId = li.previousElementSibling.id;
      }

      const obj = {
        parentId: li.dataset.parentId,
        id: li.id,
        icons: li.dataset.icons && {16: li.dataset.icons},
        type: li.dataset.type,
        disabled: !li.children[0].children[0].checked
      };
      // clean-up
      Object.entries(obj).forEach(([key, value]) => !value && delete obj[key]);
      return obj;
    });

    options.progressBar();
    browser.storage.local.set({menus});                     // update saved pref
  }

  selection(e) {
    const li = e.target;
    li.classList.toggle('on');
    const on = li.classList.contains('on');

    // select/deselect sub-menus if any
    let next = li.nextElementSibling;
    while(next && next.dataset.level > li.dataset.level) {
      next.classList.toggle('on', on);
      next = next.nextElementSibling;
    }
  }

  upDown(e) {
    const selection = [...this.menuList.querySelectorAll('.on')];
    const li = selection[0];
    let target, levelChange;

    // up
    if (e.target.classList.contains('up')) {
      target = li.previousElementSibling;
      if (!target) { return; }                              // already at top
      levelChange = target.dataset.level - li.dataset.level;
      levelChange && selection.forEach(item => item.dataset.level = item.dataset.level*1 + levelChange);
      levelChange <= 0 && target.before(...selection);
      return;
    }

    // down
    target = selection[selection.length-1].nextElementSibling;
    if (!target) {                                          // already at bottom
      if (li.dataset.level !== '1') {
        levelChange = -1;
        selection.forEach(item => item.dataset.level = item.dataset.level*1 + levelChange);
      }
      return;
    }

    levelChange = target.dataset.level - li.dataset.level;
    target.nextElementSibling?.dataset.level > target.dataset.level && levelChange++; // move to next level
    levelChange && selection.forEach(item => item.dataset.level = item.dataset.level*1 + levelChange);
    target.after(...selection);
  }

  updateSubMenus(li, checked) {
    const level = li.dataset.level;
    let next = li.nextElementSibling;
    while(next && next.dataset.level > level) {
      next.children[0].children[0].checked = checked;
      next = next.nextElementSibling;
    }
  }
}
const menus = new ContextMenu();
// ----------------- /Context Menu -------------------------

// ----------------- Container -----------------------------
class Container {

  constructor() {
    this.textarea = document.querySelector('.container textarea');
    this.siteIsolation = document.querySelector('.container #siteIsolation');
    // --- submit button
    document.querySelector('section.container button[type="submit"]').addEventListener('click', () => this.check());
  }

  process() {
    browser.contextualIdentities.query({})
    .then(contexts => this.makeContainer(contexts))
    .catch(console.error);
  }

  check() {
    if (this.checkPattern()) { return; }

    options.progressBar();
    browser.storage.local.set({container: pref.container}); // update saved pref
  }

  makeContainer(contexts) {
    if (!contexts[0]) {
      this.textarea.disabled = true;
      return;
    }

    const docfrag = document.createDocumentFragment();
    const temp = document.createElement('li');
    const ul = document.querySelector('.container ul');

    contexts.forEach(item => {
      const li = temp.cloneNode();
      li.id = item.cookieStoreId;
      li.style.backgroundImage = `url(${item.iconUrl})`;
      li.style.color = item.colorCode;
      li.textContent = item.name;
      li.dataset.name = item.name;
      li.addEventListener('click', (e) => this.showContainer(e));
      docfrag.appendChild(li);
    });

    ul.appendChild(docfrag);
    const li = ul.children[0];
    li.classList.add('on');
    this.setData(li.id, li.dataset.name);
  }

  showContainer(e) {
    if (this.checkPattern()) { return; }

    const li = e.target;
    [...li.parentNode.children].forEach(item => item.classList.remove('on')); // deselect
    li.classList.add('on');
    this.setData(li.id, li.dataset.name);
  }

  setData(id, name) {
    this.textarea.dataset.id = id;
    this.textarea.dataset.name = name;
    this.textarea.previousElementSibling.textContent = pref.container[id]?.name || name;
    this.textarea.value = pref.container[id]?.pattern.join('\n') || '';
    this.siteIsolation.checked = !!pref.container[id]?.siteIsolation;
  }

  checkPattern() {
    const pattern = [...new Set(this.textarea.value.trim().split(/\s+/))]; // ES6 new Set() to create unique array
    pattern.sort();
    this.textarea.value = pattern.join('\n');               // tidy up original

    let error = pattern.filter(p => /[/:@]/.test(p) || p.substring(1).includes('*') || p[0] === '.');
    if (error[0]) {
      this.textarea.classList.add('invalid');
      App.notify(browser.i18n.getMessage('errorPattern') + '\n\n' + error.join('\n'));
      return error;
    }

    const id = this.textarea.dataset.id;

    // --- look for duplicate
    const otherPattern = [];
    Object.entries(pref.container).forEach(([key, value]) =>
      key !== id && otherPattern.push(...value.pattern));

    error = pattern.filter(p => otherPattern.includes(p));
    if (error[0]) {
      this.textarea.classList.add('invalid');
      App.notify(browser.i18n.getMessage('errorDuplicatePattern') + '\n\n' + error.join('\n'));
      return error;
    }

    this.textarea.classList.remove('invalid');

    // cache the values
    pref.container[id] || (pref.container[id] = {});
    pref.container[id].name = this.textarea.dataset.name;   // update name with current name
    pref.container[id].pattern = pattern;
    pref.container[id].siteIsolation = this.siteIsolation.checked;
  }
}
const container = new Container();
// ----------------- /Container ----------------------------

// ----------------- Themes --------------------------------
class Theme {

  constructor() {
    this.defaultTheme = {
      'name': '',
      'description': '',
      'version': '',
      'homepage_url': '',
      'author': '',

      'theme': {
        'images': {
         'theme_frame': '',
         'additional_backgrounds': []                         // experimental
        },
        'properties': {                                       // Optional
          'additional_backgrounds_alignment': [],
          'additional_backgrounds_tiling': []
        },
        'colors': {                                           // Mandatory
          'frame': '',
          'bookmark_text': '',                                // alias of toolbar_text
          'button_background_active': '',
          'button_background_hover': '',
          'frame_inactive': '',
          'icons': '',
          'icons_attention': '',
          'ntp_background': '',
          'ntp_text': '',
          'popup': '',
          'popup_border': '',
          'popup_highlight': '',
          'popup_highlight_text': '',
          'popup_text': '',
          'sidebar': '',
          'sidebar_border': '',
          'sidebar_highlight': '',
          'sidebar_highlight_text': '',
          'sidebar_text': '',
//          'tab_background_separator': '', // removd FF89
          'tab_background_text': '',
          'tab_line': '',
          'tab_loading': '',
          'tab_selected': '',
          'tab_text': '',
          'toolbar': '',
          'toolbar_bottom_separator': '',
          'toolbar_field': '',
          'toolbar_field_border': '',
          'toolbar_field_border_focus': '',
          'toolbar_field_focus': '',
          'toolbar_field_highlight': '',
          'toolbar_field_highlight_text': '',
//          'toolbar_field_separator': '', // removd FF89
          'toolbar_field_text': '',
          'toolbar_field_text_focus': '',
          'toolbar_text': '',
          'toolbar_top_separator': '',
          'toolbar_vertical_separator': ''
        }
      }
    };

    this.select = document.querySelector('section.theme select');
    this.select.selectedIndex = 0;
    this.select.addEventListener('change', e => this.setTheme(e));

    this.inputs = document.querySelectorAll('section.theme input');
    this.inputs.forEach(item => item.addEventListener('change', this.processInput));

    document.querySelectorAll('section.theme div button').forEach(item =>
      item.addEventListener('click', e => this.processButtons(e)));

    // --- Import/Export
    document.getElementById('themeFile').addEventListener('change', this.fileSelect);
    document.getElementById('themeExport').addEventListener('click', () => this.exportData(this.getTheme()));

    // --- submit button
    document.querySelector('section.theme button[type="submit"]').addEventListener('click', () => this.check());
  }

  process() {
    // --- reset
    this.clearTheme();

    // --- set saved themes
    pref.themes.forEach(item => this.select.appendChild(new Option(item.name)));
  }

  check() {
    options.progressBar();
    browser.storage.local.set({themes: pref.themes});       // update saved pref
  }


  processInput(e) {
    if (!this.validity.valid) { return; }

    switch (this.type) {
      case 'text':
        this.value = this.value.trim();
        this.nextElementSibling &&
          (this.nextElementSibling.value = this.value || this.nextElementSibling.defaultValue);
        break;

      case 'color':
        this.previousElementSibling.value = this.value;
        break;
    }
  }

  setTheme(e) {
    const select = e.target;
    const tm = pref.themes[select.selectedIndex -1];
    this.inputs[0].closest('div').scrollTop = 0;

    // properties removed in FF70
    tm.theme.images.headerURL && (tm.theme.images.theme_frame = tm.theme.images.headerURL);
    tm.theme.colors.accentcolor && (tm.theme.colors.frame = tm.theme.colors.accentcolor);
    tm.theme.colors.textcolor && (tm.theme.colors.tab_text = tm.theme.colors.textcolor);

    tm.theme.images.theme_frame &&
      (select.parentNode.lastElementChild.style.background = `url(${tm.theme.images.theme_frame}) no-repeat top right/100% 100%`);

    this.inputs.forEach(item => {
      if (item.type == 'color') { return; }
      // reset
      item.value = '';
      const id = item.id;
      switch (true) {
        case tm.hasOwnProperty(id): item.value = tm[id]; break;
        case tm.theme.images.hasOwnProperty(id): item.value = tm.theme.images[id]; break;
        case tm.theme.properties.hasOwnProperty(id): item.value = tm.theme.properties[id]; break;
        case tm.theme.colors.hasOwnProperty(id):
          item.value = tm.theme.colors[id];
          break;
      }

      item.nextElementSibling && (item.nextElementSibling.value = item.value || item.nextElementSibling.defaultValue);
    });
  }

  getTheme() {
    const theme = {
      name: '',
      theme: {
        images: {},
        properties: {},
        colors: {}
      }
    };

    this.inputs.forEach(item => {
      if (!item.value || item.type == 'color') { return; }

      item.value = item.value.trim();
      const id = item.id;
      switch (true) {
        case this.defaultTheme.hasOwnProperty(id): theme[id] = item.value; break;
        case this.defaultTheme.theme.images.hasOwnProperty(id): theme.theme.images[id] = item.value; break;
        case this.defaultTheme.theme.properties.hasOwnProperty(id): theme.theme.properties[id] = item.value; break;
        case this.defaultTheme.theme.colors.hasOwnProperty(id): theme.theme.colors[id] = item.value; break;
      }
    });

    if (!theme.name) {
      App.notify(browser.i18n.getMessage('noNameError'));
      return;
    }

    return theme;
  }

  processButtons(e) {
    const name = this.select.value;
    let theme;

    switch (e.target.dataset.i18n) {
      case 'addTheme':
        theme = this.getTheme();
        pref.themes.push(theme);
        this.select.appendChild(new Option(theme.name));
        this.select.value = theme.name;
        break;

      case 'updateTheme':
        if(!name) { break; }
        theme = this.getTheme();
        const index = pref.themes.findIndex(item => item.name === name);
        index !== -1 ? pref.themes[index] = theme : pref.themes.push(theme);
        // update name
        theme.name !== name && (this.select[this.select.selectedIndex].textContent = theme.name);
        break;

      case 'deleteTheme':
        if(!name) { break; }
        pref.themes = pref.themes.filter(item => item.name !== name);
        this.select.remove(this.select.selectedIndex);
        this.clearTheme();
        break;

      case 'clearTheme':
        this.clearTheme();
        break;

      case 'applyTheme':
        theme = this.getTheme();
        pref.theme = theme.theme;
        browser.theme.update(theme.theme);
        break;

      case 'resetTheme':
        browser.theme.reset();
        pref.theme = null;
        break;
    }
  }

  clearTheme() {
    this.inputs.forEach(item => item.type === 'text' ? item.value = '': item.value = item.defaultValue);
    this.select.selectedIndex = 0;
    this.inputs[0].scrollIntoView();
  }

  processThemeData(theme) {
    this.themeNodes.forEach(item => {
      // reset
      item.value = '';
      switch (true) {

        case theme.hasOwnProperty(item.id): item.value = theme[item.id]; break;
        case theme.theme.images.hasOwnProperty(item.id): item.value = theme.theme.images[item.id]; break;
        case theme.theme.properties.hasOwnProperty(item.id): item.value = theme.theme.properties[item.id]; break;
        case theme.theme.colors.hasOwnProperty(item.id):
          item.nextElementSibling.value = theme.theme.colors[item.id];
          item.value = theme.theme.colors[item.id];
          break;
      }
      this.setOpacity.call(item);
    });
  }

  fileSelect(e) {
    const file = e.target.files[0];

    if (!file) {
      App.notify(browser.i18n.getMessage('error'));
      return;
    }

    let kb = 300;
    switch (true) {
      case file.type === 'application/json': kb = 500; break;
      case file.type.startsWith('image/'): kb = 300; break;
      default:
        App.notify(browser.i18n.getMessage('errorType'));
        return;
    }

    if (file.size > 1024*kb) {                              // set maximum file size
      App.notify(browser.i18n.getMessage('errorSize', kb));
      return;
    }

    const reader  = new FileReader();
    reader.onloadend = () => this.readThemeData(reader.result);
    reader.onerror = () => App.notify(browser.i18n.getMessage('errorRead'));
    file.type === 'application/json' ? reader.readAsText(file) : reader.readAsDataURL(file);
  }

  readThemeData(data) {
    if (data.startsWith('data:image/')) {                     // image selected
      const theme_frame = document.getElementById('theme_frame');
      const additional_backgrounds = document.getElementById('additional_backgrounds');

      switch (true) {
        case !theme_frame.value.trim():
          theme_frame.value = data;
          break;
        case !additional_backgrounds.value.trim():
          additional_backgrounds.value = data
          break;
        default:
          additional_backgrounds.value += ',' + data;
      }

      return;
    }

    let theme;
    try { theme = JSON.parse(data); }                    // Parse JSON
    catch(e) {
      App.notify(browser.i18n.getMessage('errorParse'));           // display the error
      return;
    }

    if (!theme.name) {
      App.notify(browser.i18n.getMessage('noNameError'));
      return;
    }

   pref.themes.push(theme);
   this.select.appendChild(new Option(theme.name));
  }


  exportData(data) {
    const name = data.name + (data.version ? '.' + data.version : '');
    const filename = name.replace(/[<>:"/\\|?*]/g, '') + '_' + new Date().toISOString().substring(0, 10) + '.json';
    App.saveFile({data: JSON.stringify(data, null, 2), filename});
  }
}
const theme = new Theme();
// ----------------- /Themes -------------------------------

// ----------------- Redirect ------------------------------
class RedirectOption {

  constructor() {
    this.textarea = document.querySelector('.redirect textarea');
    this.input = document.querySelector('.redirect input');
    this.input.value = '';
    this.input.addEventListener('change', e => this.processInput(e))
    this.result = document.querySelector('.redirect .redirectResult');

    // --- submit button
    document.querySelector('section.redirect button[type="submit"]').addEventListener('click', () => this.check());
  }

  process() {
    this.textarea.value = pref.redirect;
  }

  check() {
    if (this.checkPattern()) { return; }

    options.progressBar();
    browser.storage.local.set({redirect: this.textarea.value}); // update saved pref
  }

  processInput(e) {
    if (this.checkPattern()) { return; }

    pref.redirect = this.textarea.value;
    Redirect.init();
    const url = Redirect.get(this.input.value);
    this.result.textContent = url;
    this.result.classList.remove('pass', 'fail');
    this.result.classList.add(url !== this.input.value ? 'pass' : 'fail');
  }

  checkPattern() {
    this.textarea.classList.remove('invalid');
    this.input.value = this.input.value.trim();
    const pattern = this.textarea.value.split(/[\r\n]+/).map(i => i.split(/\s+/));
    const error = pattern.find(item => item.length < 2);
    if (error) {
      this.textarea.classList.add('invalid');
      App.notify(browser.i18n.getMessage('errorPattern') + '\n\n' + error.join(' '));
      return error;
    }
  }
}
const redirectOption = new RedirectOption();

// ----------------- /Redirect ------------------------------

// ----------------- Navigation ----------------------------
class Nav {

  constructor() {
    // --- from browser pop-up & contextmenu (not in Private Window)
    window.addEventListener('storage', this.process);
  }

  process(e = {}) {
    const nav = e.key === 'nav' ? e.newValue : localStorage.getItem('nav');
    localStorage.removeItem('nav');
    if (!nav) { return; }                                   // end execution if not found

    switch (nav) {
      case 'help':
        document.getElementById('nav1').checked = true;
        break;
    }
  }
}
const nav = new Nav();
// ----------------- /Navigation ---------------------------

// ----------------- Import/Export Preferences -------------
App.importExport(() => {
  // --- set options after the pref update
  options.process();
  dateClock.process();
  browser.contextualIdentities && container.process();
  menus.process();
  theme.process();
  redirectOption.process();
});
// ----------------- /Import/Export Preferences ------------

// ----------------- User Preference -----------------------
App.getPref().then(() => {
  options.process();
  dateClock.process();
  browser.contextualIdentities && container.process();
  menus.process();
  theme.process();
  redirectOption.process();
  nav.process();
});
// ----------------- /User Preference ----------------------