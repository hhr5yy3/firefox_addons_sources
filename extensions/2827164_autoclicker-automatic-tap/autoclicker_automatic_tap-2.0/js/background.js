browser.runtime.onInstalled.addListener(function () {
  browser.tabs.create({ url: 'https://autoclicker.io' });
});
browser.runtime.setUninstallURL('https://autoclicker.io/support/');
