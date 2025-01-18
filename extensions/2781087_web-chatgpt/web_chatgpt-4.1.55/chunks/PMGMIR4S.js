import {
  require_browser_polyfill
} from "./XOBJISN3.js";
import {
  __toESM
} from "./ERZ5UWI7.js";

// src/utils/imageHelper.ts
var import_webextension_polyfill = __toESM(require_browser_polyfill());
var getChromeExtensionAssetsURL = (path) => {
  return import_webextension_polyfill.default.runtime.getURL(`/assets${path[0] === "/" ? path : "/" + path}`);
};

export {
  getChromeExtensionAssetsURL
};
