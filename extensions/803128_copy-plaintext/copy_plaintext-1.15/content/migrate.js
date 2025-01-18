// ---------- Migrate --------------------------------------
export class Migrate {

  static async init(pref) {
    // --- 1.14 (2023-07-10)
    if (!pref.hasOwnProperty('noIndent')) { return; }

    // convert data format
    pref.data = [];
    pref.custom.forEach(([pattern, replacement]) =>
      pref.data.push({title: '', pattern, replacement, active: true})
    );
    delete pref.custom;

    // convert no-indent
    pref.noIndent &&
      pref.data.push({title: browser.i18n.getMessage('removeLeadingSpaces'),
        pattern: '/\n\s+/g', replacement: '\n', active: true});
    delete pref.noIndent;

    // update database
    await browser.storage.local.clear();
    await browser.storage.local.set(pref);
  }
}