"use strict";

const tstId = "treestyletab@piro.sakura.ne.jp";
const mthId = "multipletab@piro.sakura.ne.jp";

let lastActiveTabId = -1;
let lastActiveTabTime = 0;
let hasMTHSelection = false;

async function registerToTST() {
  const self = await browser.management.getSelf();
  await browser.runtime.sendMessage(tstId, {
    type: "register-self",
    name: self.id,
    icons: browser.runtime.getManifest().icons,
    listeningTypes: ["tab-mousedown", "tab-clicked", "ready"],
  });
}
registerToTST();

browser.runtime.onMessageExternal.addListener((aMessage, aSender) => {
  if (aSender.id === tstId) {
    switch (aMessage.type) {
      case "tab-mousedown":
        onMouseDown(aMessage);
        break;

      case "tab-clicked":
        // ignore close button and twisty clicks
        if (aMessage.closebox === false && aMessage.twisty === false) {
          return onMouseUp(aMessage);
        }
        break;

      case "ready":
        registerToTST();
        break;
    }
  }
});

browser.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-feature") {
    const activeWindowTabs = await browser.tabs.query({ currentWindow: true });
    activatePreviousTab(activeWindowTabs);
  }
});

function onMouseDown(event) {
  if (event.tab.active === true) {
    lastActiveTabId = event.tab.id;
    lastActiveTabTime = Date.now();
  } else {
    lastActiveTabId = -1;
  }
}

async function onMouseUp(event) {
  if (hasMTHSelection === true) {
    hasMTHSelection = false;
    return;
  }
  updatehasMTHselection();
  if (
    event.tab.id !== lastActiveTabId ||
    // if Multiple Tab Handler menu appear
    Date.now() - lastActiveTabTime > 500 ||
    event.button !== 0 ||
    event.ctrlKey === true ||
    event.shiftKey === true ||
    event.metaKey === true
  ) {
    return;
  }

  const windowTabs = await browser.tabs.query({ currentWindow: true });
  if (
    windowTabs.length >= 2 &&
    windowTabs.some((elem) => elem.id === event.tab.id && elem.active === true)
  ) {
    activatePreviousTab(windowTabs);
    return Promise.resolve(true); // cancel TST's default action
  }
}

async function updatehasMTHselection() {
  try {
    const selection = (
      await browser.runtime.sendMessage(mthId, {
        type: "get-tab-selection",
      })
    ).selected;
    hasMTHSelection = selection.length > 0;
    // if Multiple Tab Handler is not installed
  } catch (error) {}
}

function activatePreviousTab(tabs) {
  tabs.sort((a, b) => b.lastAccessed - a.lastAccessed);
  browser.runtime.sendMessage(tstId, {
    type: "focus",
    tab: tabs[1].id,
  });
}
