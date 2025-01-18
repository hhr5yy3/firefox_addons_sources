function openPage() {
  browser.tabs.create({
    url: "https://yandex.ru"
  });
}

browser.browserAction.onClicked.addListener(openPage);