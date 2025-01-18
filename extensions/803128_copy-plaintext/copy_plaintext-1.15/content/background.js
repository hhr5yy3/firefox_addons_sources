import {pref, App} from './app.js';
import {Migrate} from './migrate.js';
import {Text} from './text.js';
import './menus.js'

// ---------- User Preference ------------------------------
await App.getPref();

// ---------- Process Preference ---------------------------
class ProcessPref {

  static {
    this.process();
  }

  static async process() {
    // migrate storage database
    await Migrate.init(pref);

    Text.init(pref.data);

    // storage change listener (after migrate)
    browser.storage.onChanged.addListener((...e) => this.onChanged(...e));

    // browserAction
    browser.browserAction.onClicked.addListener(() => browser.runtime.openOptionsPage());
  }

  static onChanged(changes, area) {
    switch (true) {
      case area === 'local':
        // update data
        changes.data && Text.init(changes.data.newValue);
        break;

      case area === 'sync':
        break;
    }
  }
}