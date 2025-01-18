function onExtensionInstalled(details) {
  console.log("onExtensionInstalled:", details);
  //chrome.tabs.create({'url': "https://example.org?installed=true"});
}

browser.runtime.onInstalled.addListener(onExtensionInstalled);


function onSetUninstallURL() {
  console.log("set uninstall URL");
}

/*
var settingUninstallUrl = browser.runtime.setUninstallURL("https://example.org?uninstalled=true");
settingUninstallUrl.then(onSetUninstallURL);
*/