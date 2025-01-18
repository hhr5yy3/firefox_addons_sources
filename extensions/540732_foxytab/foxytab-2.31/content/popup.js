import {pref, App} from './app.js';
import {zones} from './zones.js';
import './i18n.js';

// ----------------- Popup ---------------------------------
class Popup {

  constructor() {
    document.querySelectorAll('button').forEach(item => item.addEventListener('click', this.processButtons));
    const selectMatch = document.querySelector('#selectMatch');
    selectMatch.value = localStorage.getItem('selectMatch') || '';
    selectMatch.addEventListener('change', e => {
      const str = e.target.value;
      try { new RegExp(str); }
      catch(error) {
        App.notify(browser.i18n.getMessage('selectMatch') + '\n\n' + error);
        return;
      }
      localStorage.setItem('selectMatch', str);
    });

    const checkbox = document.querySelectorAll('input[type="checkbox"]');
    checkbox.forEach(item => {
      item.checked = localStorage.getItem(item.id) === 'true';
      item.addEventListener('change', e => localStorage.setItem(e.target.id, e.target.checked));
    });
  }

  processButtons() {
    switch (this.dataset.i18n) {
      case 'options':
        browser.runtime.openOptionsPage();
        break;

      case 'help':
        localStorage.setItem('nav', 'help');
        browser.runtime.openOptionsPage();
        break;

      default:
        this.id === 'run' && this.previousElementSibling.value && browser.runtime.sendMessage({id: 'selectMatch'});
        break;
    }
    window.close();
  }

  process() {
    const date = new Date();

    // --- Zodiac u2678 - u2653 | 9800 - 9811
    const zodiac = {
      '1': 'Aries',
      '2': 'Taurus',
      '3': 'Gemini',
      '4': 'Cancer',
      '5': 'Leo',
      '6': 'Virgo',
      '7': 'Libra',
      '8': 'Scorpio',
      '9': 'Sagittarius',
      '10': 'Capricorn',
      '11': 'Aquarius',
      '12': 'Pisces'
    };

    const sp = document.querySelectorAll('h3 span');

    const month = new Intl.DateTimeFormat('en-u-ca-persian', {month: 'numeric'}).format(date);
    sp[2].textContent = String.fromCharCode(9799 + month*1);
    sp[2].title = zodiac[month];

    // --- add tab count
    browser.tabs.query({currentWindow: true}).then(tabs => sp[1].append(tabs.length));

    if (!pref.date[0] && !pref.clock[0]) { return; }        // end execution if not found

    const liTemplate = document.querySelector('template').content.firstElementChild;
    const ul = document.querySelector('ul');
    const docfrag = document.createDocumentFragment();

    // --- set date in toolbar title & pop-up display
    const title = pref.date.map(locale => {
      const li = liTemplate.cloneNode(true);
      const text = App.dateTimeFormat(locale, date);
      li.children[0].textContent = App.getFlag(locale.slice(-2)) || '\u{1f5fa}';
      li.children[1].textContent = text;

      docfrag.appendChild(li);
      return li.children[0].textContent + '  ' + text;
    });

    // --- update title
    title[0] && browser.browserAction.setTitle({title: title.join('\n')});

    // --- clock
    pref.clock.forEach(item => {
      const [locale, timeZone] = item;
      const li = liTemplate.cloneNode(true);
      li.classList.add('clock');
      li.children[0].textContent = App.getFlag(zones[timeZone]) || '\u{1f5fa}';
      li.children[1].textContent = timeZone.split('/').reverse()[0].replace('_', ' ');
      li.children[2].textContent = new Intl.DateTimeFormat(locale,
                    {hour: '2-digit', minute: '2-digit', hour12: pref.hour12, timeZone }).format(date);
      docfrag.appendChild(li);
    });

    ul.appendChild(docfrag);
  }
}
const popup = new Popup();
// ----------------- /Popup --------------------------------

// ----------------- User Preference -----------------------
App.getPref().then(() => popup.process());

// ----------------- /User Preference ----------------------