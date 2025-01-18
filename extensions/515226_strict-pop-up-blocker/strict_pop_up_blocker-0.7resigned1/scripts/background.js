function setIconTitle(allowed) {
  //console.log("popups allowed? " + allowed);
  if (allowed) {
    if (typeof browser.browserAction.setIcon === "function")
      browser.browserAction.setIcon({path: "icons/popupallowed.png"});
    browser.browserAction.setTitle({title: "Strict pop-up blocker (off)"});
  } else {
    if (typeof browser.browserAction.setIcon === "function")
      browser.browserAction.setIcon({path: "icons/popupblocked.png"});
    browser.browserAction.setTitle({title: "Strict pop-up blocker (on)"});
  }
}

function setInitialIconTitle() {
  function set(current) {
    setIconTitle(current.value);
  }
  browser.browserSettings.allowPopupsForUserEvents.get({}).then(set);
}

function togglePopupBlocker() {
  function toggle(current) {
    browser.browserSettings.allowPopupsForUserEvents.set({value: !current.value});
    setIconTitle(!current.value);
  }
  browser.browserSettings.allowPopupsForUserEvents.get({}).then(toggle);
}

setInitialIconTitle();

browser.browserAction.onClicked.addListener(() => {
  togglePopupBlocker();
});
