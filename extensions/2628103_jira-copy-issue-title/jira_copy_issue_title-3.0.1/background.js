function handleClick() {
  browser.runtime.openOptionsPage();
}

browser.browserAction.onClicked.addListener(handleClick);

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    browser.tabs.create({
      url: "/pages/options/index.html",
    });
  }
});

async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await browser.tabs.query(queryOptions);
  return tab;
}

const copyToClipboardMsg = async () => {
  const currentTab = await getCurrentTab();
  if (currentTab)
    browser.tabs.sendMessage(currentTab.id, {
      message: "jira_copy_to_clipboard",
    });
};

browser.commands.onCommand.addListener((command) => {
  if (command === "copy-to-clipboard") {
    copyToClipboardMsg();
  }
});
