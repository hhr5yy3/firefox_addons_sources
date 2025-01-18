/******************************************************************************
 *
 * Loads and updates options automatically
 *
 * @require {Object} scrapbook
 * @extends scrapbook
 * @public {Promise} scrapbook.loadOptionsAuto
 *****************************************************************************/

(function (global, factory) {
  // Browser globals
  if (global.hasOwnProperty('loadOptionsAuto')) { return; }
  global.loadOptionsAuto = factory(
    global.isDebug,
    global.scrapbook,
  );
}(this, function (isDebug, scrapbook) {

  'use strict';

  scrapbook.loadOptionsAuto = scrapbook.loadOptions();

  browser.storage.onChanged.addListener((changes, areaName) => {
    // Config keys are stored in storage.sync and fallbacks to storage.local;
    // cache keys are stored in storage.local and are valid JSON format.
    // We only update when a config key is changed.
    if (areaName !== "sync") {
      try {
        for (let key in changes) { JSON.parse(key); }
        return;
      } catch(ex) {}
    }
    for (let key in changes) {
      scrapbook.options[key] = 'newValue' in changes[key] ? changes[key].newValue : scrapbook.DEFAULT_OPTIONS[key];
    }
  });

  return scrapbook.loadOptionsAuto;

}));
