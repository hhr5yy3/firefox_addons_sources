globalThis.chrome = globalThis.browser;

import '../npm/@ghostery/adblocker/dist/esm/data-view.js';
import '../npm/@ghostery/adblocker/dist/esm/fetch.js';
import '../npm/@ghostery/adblocker/dist/esm/filters/cosmetic.js';
import '../npm/@ghostery/adblocker/dist/esm/lists.js';
import '../npm/@ghostery/adblocker/dist/esm/request.js';
import '../npm/@remusao/small/dist/esm/index.js';
import '../npm/@ghostery/adblocker/dist/esm/filters/network.js';
import '../npm/@ghostery/adblocker/dist/esm/preprocessor.js';
import '../utils/trackerdb.js';
import '../utils/engines.js';

let exceptions = {};
chrome.storage.local.get(["exceptions"]).then(({ exceptions: value }) => {
  exceptions = value || {};
});
chrome.storage.onChanged.addListener((records) => {
  if (records.exceptions) {
    exceptions = records.exceptions.newValue || {};
  }
});
function getException(id) {
  return exceptions[id];
}

export { getException };
