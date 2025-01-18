import {pref, App} from './app.js';
import {ProgressBar} from './progress-bar.js';
import {ImportExport} from './import-export.js';
import {Pattern} from './pattern.js';
import './permissions.js';
import './i18n.js';

// ---------- User Preference ------------------------------
await App.getPref();

// ---------- Options --------------------------------------
class Options {

  static {
    document.querySelector('button[type="submit"]').addEventListener('click', () => this.check()); // submit button
    this.init();
  }

  static init(keys = Object.keys(pref)) {
    this.prefNode = document.querySelectorAll('#' + keys.join(',#')); // defaults to pref keys
    this.process();
  }

  static process(save) {

    // 'save' is only set when clicking the button to save options
    this.prefNode.forEach(node => {
      // value: 'select-one', 'textarea', 'text', 'number'
      const attr = node.type === 'checkbox' ? 'checked' : 'value';
      save ? pref[node.id] = node[attr] : node[attr] = pref[node.id];
    });

    save && !ProgressBar.show() && browser.storage.local.set(pref); // update saved pref
  }

  static check() {
    // --- rebuild data
    const data = [];
    const dup = [];
    // using for loop to be able to break early
    for (const item of document.querySelectorAll('div.row')) {
      const elem = item.children;
      elem[1].classList.remove('invalid');                  // reset
      const pattern = elem[1].value.trim();
      const replacement = elem[2].value;                    // no trim, can be space
      const dupString = pattern + ':' + replacement;        // duplicate test

      // --- check for empty pattern OR duplicate
      if (!pattern || dup.includes(dupString)) {
        item.remove();
        continue;
      }

      dup.push(dupString);

      // --- check patterns validity
      if (!Pattern.validate(pattern)) {
        elem[1].classList.add('invalid');
        elem[1].scrollIntoView({behavior: 'smooth'});
        elem[1].focus();
        return;
      }

      const obj = {
        title: elem[0].value.trim(),
        pattern,
        replacement,
        active: elem[3].checked,
      }
      data.push(obj);
    }

    // no errors, update pref.data
    pref.data = data;

    // --- save options
    this.process(true);
  }
}
// ---------- /Options -------------------------------------

// ---------- Custom ---------------------------------------
class Custom {

  static {
    this.docFrag = document.createDocumentFragment();
    this.customDiv = document.querySelector('div.custom');
    this.template = document.querySelector('.options template').content.firstElementChild;;

    // --- buttons
    document.querySelector('.options button[data-i18n="add"]').addEventListener('click', () => this.addRow({}));

    // --- select
    const select = document.querySelector('.options select');
    select.selectedIndex = 0;
    select.addEventListener('change', () => {
      const option = select.options[select.selectedIndex];
      const {pattern, replacement} = option.dataset;
      this.addRow({title: option.value, pattern, replacement});
      select.selectedIndex = 0;
    });

    this.process();
  }

 static process() {
    pref.data.forEach(item => {
      const row = this.makeRow(item);
      this.docFrag.append(row);
    });
    this.customDiv.appendChild(this.docFrag);
  }

  static makeRow({title = '', pattern = '', replacement = '', active = true}) {
    const row = this.template.cloneNode(true);
    row.children[0].value = title;
    row.children[1].value = pattern;
    row.children[2].value = replacement;
    row.children[3].checked = active;
    row.children[4].addEventListener('click', () => row.remove());
    return row;
  }

  static addRow(item) {
    const row = this.makeRow(item);
    this.customDiv.appendChild(row);
  }
}
// ---------- /Custom --------------------------------------

// ---------- Import/Export Preferences --------------------
ImportExport.init(pref, () => {
  Options.process();                                        // set options after the pref update
  Custom.process();                                         // update page display
});
// ---------- /Import/Export Preferences -------------------