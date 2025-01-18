const url = 'https://chat.openai.com/?model=gpt-4';

browser.storage.sync.set({
  url,
});

browser.browserAction.onClicked.addListener(() => {
  browser.sidebarAction.toggle();
});
