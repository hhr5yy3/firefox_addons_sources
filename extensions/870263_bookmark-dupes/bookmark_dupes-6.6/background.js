/* Copyright (C) 2017-2022 Martin Väth <martin@mvath.de>
 * This project is under the GNU public license 2.0
*/

"use strict";

// For documentation on the tab API see e.g.
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs

const compatible = (typeof(browser) != "undefined"
    && Object.getPrototypeOf(browser) === Object.prototype) ? {
  browser: browser
} : {
  browser: chrome
};

((typeof(compatible.browser.action) != "undefined")
  ? compatible.browser.action : compatible.browser.browserAction )
.onClicked.addListener(function () {
  compatible.browser.tabs.create({
    url: compatible.browser.runtime.getURL("data/tab/index.html"),
    active: true
  });
});
