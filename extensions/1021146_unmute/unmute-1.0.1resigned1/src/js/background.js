// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";
/**Constants**/
const MUTE_CURRENT_TAB = "mute_current_tab",
    AUTO_MUTE = "auto_mute",
    AUTO_RECENT = "auto_recent",
    MUTE_ALL_TABS = "mute_all_tabs",
    TOGGLE_ALL_TABS = "toggle_all_tabs";
/**variable**/
let state_all_tabs_mute,
    state_auto_mute,
    state_auto_recent,
    state_current_mute,
    id_recent_audible;


/**initialise**/
browser.runtime.onInstalled.addListener(initFunc);
browser.runtime.onStartup.addListener(initFunc);

/**Listener**/
browser.browserAction.onClicked.addListener(function (tab) {
  if (tab.audible) {
    state_current_mute = !tab.mutedInfo.muted;
    browser.tabs.update(tab.id, {muted: !tab.mutedInfo.muted});
  }
});

browser.tabs.onUpdated.addListener(function (tabId) {
  loadVariable();
  setTimeout(function () {
    browser.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      if (tabs[0]) {
        if (tabs[0].id === tabId) {
          checkCurrentTab(tabs[0]);
        }
      }
    });

    if (state_auto_mute) {
      console.log("|--autoMute:onUpdated---|");
      autoMute();
    }
  }, 100);
});

browser.tabs.onActivated.addListener(function (activeInfo) {
  loadVariable();
  setTimeout(function () {
    browser.tabs.get(activeInfo.tabId, function (tab) {
      checkCurrentTab(tab);
    });

    if (state_auto_mute) {
      console.log("|-autoMute:onActivated--|");
      state_current_mute = false;
      autoMute();
    }
  }, 100);
});

browser.windows.onFocusChanged.addListener(function () {
  loadVariable();
  setTimeout(function () {
    browser.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      if (tabs[0]) {
        checkCurrentTab(tabs[0]);
      }
    });

    if (state_auto_mute) {
      console.log("|autoMute:onFocusChanged|");
      state_current_mute = false;
      autoMute();
    }
  }, 100);
});

browser.tabs.onRemoved.addListener(function (tabId) {
  if (tabId === id_recent_audible) {
    id_recent_audible = null;
    browser.storage.sync.set({
      ID_RECENT_AUDIBLE: id_recent_audible
    });
  }
});

browser.contextMenus.onClicked.addListener(function (info) {
  switch (info.menuItemId) {
  case MUTE_CURRENT_TAB:
    toggleCurrentTab();
    break;
  case "auto_on":
    toggleAutoMute(true);
    break;
  case "auto_off":
    toggleAutoMute(false);
    break;
  case MUTE_ALL_TABS:
    muteAllTabs(!state_all_tabs_mute);
    break;
  case TOGGLE_ALL_TABS:
    toggleAllTabs();
    break;
  }
});

browser.commands.onCommand.addListener(function (command) {
  switch (command) {
  case MUTE_CURRENT_TAB:
    toggleCurrentTab();
    break;
  case AUTO_MUTE:
    toggleAutoMute(!state_auto_mute);
    break;
  case AUTO_RECENT:
    changeAutoMode(!state_auto_recent);
    break;
  case MUTE_ALL_TABS:
    if (!state_auto_mute) muteAllTabs(!state_all_tabs_mute);
    break;
  case TOGGLE_ALL_TABS:
    if (!state_auto_mute) toggleAllTabs();
    break;
  default:
  }
});


/**function**/
/**
 * load Variables
 */
function loadVariable() {
  browser.storage.sync.get({
    AUTO_MUTE: false,
    AUTO_RECENT: false,
    MUTE_ALL_TABS: false,
    ID_RECENT_AUDIBLE: null
  }, function (items) {
    state_auto_mute = items.AUTO_MUTE;
    state_auto_recent = items.AUTO_RECENT;
    state_all_tabs_mute = items.MUTE_ALL_TABS;
    id_recent_audible = items.ID_RECENT_AUDIBLE;
    // console.log("loaded");
  });
}

/**
 * initialise Variables, Mute State and ContextMenus
 */
function initFunc() {
  browser.contextMenus.removeAll();
  loadVariable();

  browser.contextMenus.create({
    id: MUTE_CURRENT_TAB,
    title: browser.i18n.getMessage("contextMenu_" + MUTE_CURRENT_TAB),
    contexts: ["page", "video", "audio", "browser_action"],
    visible: false
  });
  browser.contextMenus.create({
    id: AUTO_MUTE,
    title: browser.i18n.getMessage("contextMenu_" + AUTO_MUTE),
    contexts: ["page", "video", "audio", "browser_action"]
  });
  browser.contextMenus.create({
    id: "auto_on",
    parentId: AUTO_MUTE,
    title: browser.i18n.getMessage("contextMenu_auto_on"),
    contexts: ["page", "video", "audio", "browser_action"],
    type: "radio"
  });
  browser.contextMenus.create({
    id: "auto_off",
    parentId: AUTO_MUTE,
    title: browser.i18n.getMessage("contextMenu_auto_off"),
    contexts: ["page", "video", "audio", "browser_action"],
    type: "radio",
    checked: !state_auto_mute
  });
  browser.contextMenus.create({
    id: MUTE_ALL_TABS,
    title: browser.i18n.getMessage("contextMenu_" + MUTE_ALL_TABS),
    contexts: ["page", "video", "audio", "browser_action"],
    visible: true
  });
  browser.contextMenus.create({
    id: TOGGLE_ALL_TABS,
    title: browser.i18n.getMessage("contextMenu_" + TOGGLE_ALL_TABS),
    contexts: ["page", "video", "audio", "browser_action"],
    visible: true
  });

  setTimeout(function () {
    muteAllTabs(state_all_tabs_mute);
    if (state_auto_mute) {
      console.log("|----autoMute:initFunc-----|");
      autoMute();
      setTimeout(function () {
        browser.contextMenus.update("auto_on", {checked: state_auto_mute});
        browser.contextMenus.update(MUTE_ALL_TABS, {visible: false});
        browser.contextMenus.update(TOGGLE_ALL_TABS, {visible: false});
      }, 100);
    }
  }, 500);
}

/**
 * toggle Current Tab's Mute State
 */
function toggleCurrentTab() {
  browser.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (tabs[0].audible || tabs[0].mutedInfo.muted) {
      state_current_mute = !tabs[0].mutedInfo.muted;
      browser.tabs.update(tabs[0].id, {muted: state_current_mute});
    }
  });
}

/**
 * Mute/unMute All Tab by state
 *
 * @param state A state of All Tabs Mute
 */
function muteAllTabs(state) {
  state_all_tabs_mute = state;
  browser.storage.sync.set({
    MUTE_ALL_TABS: state_all_tabs_mute
  });

  browser.tabs.query({
    muted: !state_all_tabs_mute
  }, function (tabs) {
    for (let i = 0; i < tabs.length; i++) {
      if ((state_all_tabs_mute && tabs[i].audible) || !state_all_tabs_mute) {
        browser.tabs.update(tabs[i].id, {muted: state_all_tabs_mute});
      }
    }
  });

  let temp;
  if (state_all_tabs_mute) {
    temp = browser.i18n.getMessage("contextMenu_un" + MUTE_ALL_TABS);
  } else {
    temp = browser.i18n.getMessage("contextMenu_" + MUTE_ALL_TABS);
  }
  browser.contextMenus.update(MUTE_ALL_TABS, {visible: true, title: temp});
}

/**
 * toggle All Tabs' Mute State
 */
function toggleAllTabs() {
  browser.tabs.query({
    audible: true
  }, function (tabs) {
    for (let i = 0; i < tabs.length; i++) {
      browser.tabs.update(tabs[i].id, {muted: !tabs[i].mutedInfo.muted});
    }
  });
  browser.tabs.query({
    muted: true
  }, function (tabs) {
    for (let i = 0; i < tabs.length; i++) {
      browser.tabs.update(tabs[i].id, {muted: !tabs[i].mutedInfo.muted});
    }
  });
}

/**
 * Mute All Tabs Except Current/Recent-Audible Tab
 */
function muteAllExceptCurrentTab() {
  browser.tabs.query({
    audible: true,
    active: false,
    currentWindow: true
  }, function (tabs) {
    for (let i = 0; i < tabs.length; i++) {
      if (!state_auto_recent) {
        browser.tabs.update(tabs[i].id, {muted: true});
      } else if (tabs[i].id !== id_recent_audible) {
        browser.tabs.update(tabs[i].id, {muted: true});
      }
    }
  });
  browser.tabs.query({
    muted: true,
    active: false,
    currentWindow: true
  }, function (tabs) {
    for (let i = 0; i < tabs.length; i++) {
      if (!state_auto_recent) {
        browser.tabs.update(tabs[i].id, {muted: true});
      } else if (tabs[i].id !== id_recent_audible) {
        browser.tabs.update(tabs[i].id, {muted: true});
      }
    }
  });

  browser.tabs.query({
    audible: true,
    currentWindow: false
  }, function (tabs) {
    for (let i = 0; i < tabs.length; i++) {
      if (!state_auto_recent) {
        browser.tabs.update(tabs[i].id, {muted: true});
      } else if (tabs[i].id !== id_recent_audible) {
        browser.tabs.update(tabs[i].id, {muted: true});
      }
    }
  });
  browser.tabs.query({
    muted: true,
    currentWindow: false
  }, function (tabs) {
    for (let i = 0; i < tabs.length; i++) {
      if (!state_auto_recent) {
        browser.tabs.update(tabs[i].id, {muted: true});
      } else if (tabs[i].id !== id_recent_audible) {
        browser.tabs.update(tabs[i].id, {muted: true});
      }
    }
  });
}

/**
 * Automate Mute All Tabs Except Current/Recent-Audible Tab
 */
function autoMute() {
  browser.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    console.log("|---------Start---------|");
    muteAllExceptCurrentTab();

    if (tabs[0]) {
      console.log(tabs[0].id, id_recent_audible);
      if (state_auto_recent && id_recent_audible != null) {
        console.log(id_recent_audible);
        browser.tabs.update(id_recent_audible, {muted: state_current_mute});
      } else if (tabs[0].audible || tabs[0].mutedInfo.muted) {
        console.log(tabs[0].id);
        browser.tabs.update(tabs[0].id, {muted: state_current_mute});
      }
    }
  });
}

/**
 * Check Current Tab Audible then Change UI
 *
 * @param tab A tab for checking
 */
function checkCurrentTab(tab) {
  if (tab.audible || tab.mutedInfo.muted) {
    id_recent_audible = tab.id;
    browser.storage.sync.set({
      ID_RECENT_AUDIBLE: id_recent_audible
    });

    browser.browserAction.enable(tab.id);
    let temp;
    if (tab.mutedInfo.muted) {
      temp = browser.i18n.getMessage("contextMenu_un" + MUTE_CURRENT_TAB);
    } else {
      temp = browser.i18n.getMessage("contextMenu_" + MUTE_CURRENT_TAB);
    }
    browser.contextMenus.update(MUTE_CURRENT_TAB, {visible: true, title: temp});
  } else {
    browser.browserAction.disable(tab.id);
    browser.contextMenus.update(MUTE_CURRENT_TAB, {visible: false});
  }
}

/**
 * Toggle Auto Mute by state and Do autoMute
 *
 * @param state A state of Auto Mute
 */
function toggleAutoMute(state) {
  state_auto_mute = state;
  browser.storage.sync.set({
    AUTO_MUTE: state_auto_mute
  });

  if (state_auto_mute) {
    console.log("|autoMute:toggleAutoMute|");
    autoMute();
  }

  browser.contextMenus.update("auto_on", {checked: state_auto_mute});
  browser.contextMenus.update(MUTE_ALL_TABS, {visible: !state_auto_mute});
  browser.contextMenus.update(TOGGLE_ALL_TABS, {visible: !state_auto_mute});
}

/**
 * Change Auto Mute Mode
 *
 * @param state A state of Auto Mute's Recent Tab Mode
 */
function changeAutoMode(state) {
  state_auto_recent = state;
  browser.storage.sync.set({
    AUTO_RECENT: state_auto_recent
  });

  if (state_auto_mute) {
    console.log("|autoMute:changeAutoMode|");
    autoMute();
  }
}