function openPage() {
  browser.tabs.create({
    url: "https://vk.com"
  });
}

browser.browserAction.onClicked.addListener(openPage);