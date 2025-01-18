var LaunchColorChange, setColoredIcon, setGreyIcon, updateIconColor, window;

window = self;

// When an URL changes

// Check if email addresses are available for the current domain and update the
// color of the browser icon

LaunchColorChange = function() {
  return browser.tabs.query({
    currentWindow: true,
    active: true
  }, function(tabArray) {
    var e, hostname;
    if (tabArray[0]["url"] !== window.currentDomain) {
      try {
        hostname = new URL(tabArray[0]['url']);
        return Utilities.findRelevantDomain(hostname.host, function(domain) {
          window.currentDomain = domain;
          return updateIconColor();
        });
      } catch (error) {
        e = error;
        // The tab is not a valid URL
        return setGreyIcon();
      }
    }
  });
};

// API call to check if there is at least one email address
// We use a special API call for this task to minimize the ressources.

// Endpoint: https://extension-api.hunter.io/data-for-domain?domain=site.com

updateIconColor = function() {
  if (window.currentDomain.indexOf(".") === -1) {
    return setGreyIcon();
  } else {
    return Utilities.dataFoundForDomain(window.currentDomain, function(results) {
      if (results) {
        return setColoredIcon();
      } else {
        return setGreyIcon();
      }
    });
  }
};

setGreyIcon = function() {
  browser.action.setIcon({
    path: {
      "19": browser.runtime.getURL("../img/icon19_grey.png"),
      "38": browser.runtime.getURL("../img/icon38_grey.png")
    }
  });
};

setColoredIcon = function() {
  browser.action.setIcon({
    path: {
      "19": browser.runtime.getURL("../img/icon19.png"),
      "38": browser.runtime.getURL("../img/icon38.png")
    }
  });
};

// When an URL change
browser.tabs.onUpdated.addListener(function(tabid, changeinfo, tab) {
  if (tab !== void 0) {
    if (tab.url !== void 0 && changeinfo.status === "complete") {
      return LaunchColorChange();
    }
  }
});

// When the active tab changes
browser.tabs.onActivated.addListener(function() {
  return LaunchColorChange();
});

// Open a tab when it's installed

browser.runtime.onInstalled.addListener(function(object) {
  if (object.reason === "install") {
    browser.tabs.create({
      url: "https://hunter.io/users/sign_up?from=firefox_addon&utm_source=firefox_addon&utm_medium=firefox_addon&utm_campaign=extension&utm_content=new_install"
    });
  }
});

// Open another tab when it's uninstalled

browser.runtime.setUninstallURL("https://hunter.io/firefox/uninstall?from=firefox_addon&utm_source=firefox_addon&utm_medium=firefox_addon&utm_campaign=extension&utm_content=uninstall");
