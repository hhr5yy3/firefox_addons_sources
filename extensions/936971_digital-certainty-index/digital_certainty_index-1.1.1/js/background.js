(function () {
'use strict';

var baseUrl = "https://my2.siteimprove.com";
// const baseUrl = "https://pfg.siteimprove.com";

var values = {
  close: "/connectors/webextension/close",
  closeUrl: baseUrl + "/Connectors/WebExtension/close",
  dciUrl: baseUrl + "/Connectors/WebExtension/WebExtensionPage?url=",
  websitesList: baseUrl + "/connectors/webextension/WebExtensionSites",
  loginWindow: {
    height: 750,
    width: 580
  },
  checkLoginUrl: function checkLoginUrl(responseUrl) {
    return responseUrl.toLowerCase().includes(values.close);
  }
};

var GET = function GET(url, callback) {
  var req = new XMLHttpRequest();
  req.open("GET", url);
  req.onreadystatechange = function () {
    if (req.readyState == 4) {
      callback(req);
    }
  };
  req.withCredentials = true;
  req.setRequestHeader("Accept", "application/json");
  req.send();
};

var api = {
  getDCI: function getDCI(url) {
    return new Promise(function (resolve) {
      GET(values.dciUrl + url, function (res) {
        // return {sites: [], mainDCI: int}
        if (res.readyState === XMLHttpRequest.DONE && res.status === 200) {
          resolve(JSON.parse(res.response));
        }
      });
    });
  },
  checkLogin: function checkLogin() {
    return new Promise(function (resolve, reject) {
      GET(values.closeUrl, function (req) {
        if (req.status === 200 && values.checkLoginUrl(req.responseURL)) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  },
  getWebsiteList: function getWebsiteList() {
    return new Promise(function (resolve, reject) {
      GET(values.websitesList, function (res) {
        if (res.readyState === XMLHttpRequest.DONE && res.status === 200) {
          resolve(JSON.parse(res.response));
        }
      });
    });
  }
};

var storage = {
  set: function set(obj) {
    browser.storage.local.set(obj);
  },
  get: function get() {
    return browser.storage.local.get();
  },
  clean: function clean() {
    browser.storage.local.clean();
  }
};

var core = {
  loginWindowId: null,
  loginWindowIsOpen: false,
  handleLoginWindow: function handleLoginWindow(window) {
    if (core.loginWindowIsOpen) {
      setTimeout(function () {
        auth.check().then(function (resolved) {
          api.getWebsiteList().then(function (dciObj) {
            storage.set(dciObj);
          });
          core.loginWindowIsOpen = false;
          browser.windows.remove(window.id);
        }, function (rejected) {
          core.isOpen();
          core.handleLoginWindow(window);
        });
      }, 500);
    }
  },
  isOpen: function isOpen() {
    browser.windows.getAll({ windowTypes: ["popup"] }).then(function (popupWindows) {
      if (popupWindows.length < 1) {
        core.loginWindowIsOpen = false;
      } else {
        popupWindows.forEach(function (popupWindow) {
          core.loginWindowIsOpen = popupWindow.id === core.loginWindowId ? true : false;
        });
      }
    });
  },
  showLoginWindow: function showLoginWindow() {
    var creating = browser.windows.create({
      url: values.closeUrl,
      type: "popup",
      height: values.loginWindow.height,
      width: values.loginWindow.width
    });
    creating.then(function (windowInfo) {
      core.loginWindowId = windowInfo.id;
      core.loginWindowIsOpen = true;
      core.handleLoginWindow(windowInfo);
    });
  },
  getCurrentTabId: function getCurrentTabId() {
    return browser.tabs.query({
      active: true,
      currentWindow: true
    });
  }
};

var badgeColor = {
  error: "#F30F48",
  default: "#3D495e"
};

var icons = {
  active: "/img/active.png",
  deactive: "/img/deactive.png",
  error: "/img/active.png"
};

var dciIcons = {
  30: "./img/30.png",
  40: "./img/40.png",
  50: "./img/50.png",
  60: "./img/60.png",
  65: "./img/65.png",
  70: "./img/70.png",
  75: "./img/75.png",
  80: "./img/80.png",
  85: "./img/85.png",
  90: "./img/90.png",
  95: "./img/95.png",
  100: "./img/100.png"
};

var closest = function closest(dci) {
  var iconsKey = Object.keys(dciIcons);
  var curr = iconsKey[0];
  var diff = Math.abs(dci - curr);
  for (var i = 0; i < iconsKey.length; i++) {
    var newDiff = Math.abs(dci - iconsKey[i]);
    if (newDiff < diff) {
      diff = newDiff;
      curr = iconsKey[i];
    }
  }
  return curr;
};

var find = function find(dci) {
  if (dci > 0 && dci < 100) {
    return dciIcons[closest(dci)];
  } else {
    return icons.active;
  }
};

var iconCtrl = {
  set: function set(state) {
    browser.browserAction.setIcon({
      path: icons[state]
    });
  },
  setIconBadge: function setIconBadge(dciScore, tabId) {
    var icon = find(dciScore);
    browser.browserAction.setIcon({
      path: icon,
      tabId: tabId
    });
    browser.browserAction.setBadgeBackgroundColor({
      color: dciScore ? badgeColor.default : badgeColor.error,
      tabId: tabId
    });
    browser.browserAction.setBadgeText({
      text: dciScore ? dciScore.toString() : "⨉",
      tabId: tabId
    });
  },
  getBadgeText: function getBadgeText() {
    return new Promise(function (resolve) {
      core.getCurrentTabId().then(function (tab) {
        return tab[0];
      }).then(function (currentTab) {
        browser.browserAction.getBadgeText({
          tabId: currentTab.id
        }).then(function (badgeText) {
          resolve(badgeText);
        });
      });
    });
  }
};

var popupCtrl = {
  set: function set() {
    browser.browserAction.setPopup({ popup: "../popup.html" });
  },
  remove: function remove() {
    browser.browserAction.setPopup({ popup: "" });
  },
  get: function get() {
    return browser.browserAction.getPopup({});
  }
};

var auth = {
  check: function check() {
    return new Promise(function (resolve, reject) {
      api.checkLogin().then(function () {
        iconCtrl.getBadgeText().then(function (badgeText) {
          if (!badgeText) {
            iconCtrl.set("active");
          }
        });
        popupCtrl.set();
        resolve(true);
      }, function () {
        iconCtrl.set("deactive");
        popupCtrl.remove();
        reject(false);
      });
    });
  }
};

var cleanUrl = url => {
  var clean = url
    .toLowerCase()
    .replace("https://", "")
    .replace("http://", "");
  if (clean.endsWith("/")) {
    return clean.slice(0, -1);
  } else {
    return clean;
  }
};

var isCachedSite = (url, sites) => {
  return sites.some(site => url.startsWith(site));
};

const dciCtrl = {
  setDci: (mainDCI, tabId) => {
    if (mainDCI) {
      iconCtrl.setDci(mainDCI, tabId);
    }
  },
  checkDci: (rawUrl, sites, tabId) => {
    var cleanedUrl = cleanUrl(rawUrl);
    if (isCachedSite(cleanedUrl, sites)) {
      api.getDCI(rawUrl).then(dciValues => {
        iconCtrl.setIconBadge(dciValues.mainDCI, tabId);
      });
    }
  }
};

// browser start
auth.check().then(function () {
  api.getWebsiteList().then(function (dciObj) {
    if (dciObj) {
      storage.set(dciObj);
    }
  });
}, function () {
  storage.clean();
});

// EventListeners
var listeners = {
  dciClick: function dciClick(tab) {
    auth.check().then(function () {
      popupCtrl.set();
    }, function () {
      popupCtrl.remove();
      core.showLoginWindow();
    });
  },
  connection: function connection(port) {
    port.onDisconnect.addListener(function () {
      auth.check();
    });
  },
  tabActivated: function tabActivated(tabs) {
    auth.check();
  },
  tabUpdated: function tabUpdated(tabId, changeInfo, tabInfo) {
    if (tabInfo.status === "complete") {
      storage.get().then(function (storageObj) {
        dciCtrl.checkDci(tabInfo.url, storageObj.sites, tabId);
      });
    }
  },
  headerDetected: function headerDetected(info) {
    var headers = info.responseHeaders;
    for (var i = headers.length - 1; i >= 0; --i) {
      var header = headers[i].name.toLowerCase();
      if (header == 'x-frame-options' || header == 'frame-options') {
        headers.splice(i, 1); // Remove header
      }
    }
    return { responseHeaders: headers };
  }
};

browser.webRequest.onHeadersReceived.addListener(listeners.headerDetected, {
  urls: ['*://*.siteimprove.com/*'], // Pattern to match all http(s) pages
  types: ['sub_frame']
}, ['blocking', 'responseHeaders']);

browser.tabs.onActivated.addListener(listeners.tabActivated);

browser.tabs.onUpdated.addListener(listeners.tabUpdated);

browser.browserAction.onClicked.addListener(listeners.dciClick);

browser.runtime.onConnect.addListener(listeners.connection);

}());

//# sourceMappingURL=background.js.map
