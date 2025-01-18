"use strict";
/**Constants**/
const AUTO_MUTE = "auto_mute",
    AUTO_RECENT = "auto_recent",
    BACKGROUND = browser.extension.getBackgroundPage();

/**
 * Saves Options to browser.storage
 *
 * @param element A element is clicked
 */
function save_options(element) {
  if (element.target.id === AUTO_MUTE) {
    BACKGROUND.toggleAutoMute(document.getElementById(AUTO_MUTE).checked);
  } else if (element.target.id === AUTO_RECENT) {
    let temp = document.getElementById(AUTO_RECENT).checked;
    BACKGROUND.changeAutoMode(temp);
    if (temp) {
      document.getElementById(AUTO_MUTE+"_label").innerText = browser.i18n.getMessage("option_auto_mute",[browser.i18n.getMessage("option_recent_tab")]);
    } else {
      document.getElementById(AUTO_MUTE+"_label").innerText = browser.i18n.getMessage("option_auto_mute",[browser.i18n.getMessage("option_current_tab")]);
    }
  } else if (element.target.id === "reset") {
    BACKGROUND.toggleAutoMute(false);
    BACKGROUND.muteAllTabs(false);
    document.getElementById(AUTO_MUTE).checked = false;
    document.getElementById(AUTO_RECENT).checked = false;
    document.getElementById(AUTO_MUTE+"_label").innerText = browser.i18n.getMessage("option_auto_mute",[browser.i18n.getMessage("option_current_tab")]);
    BACKGROUND.initFunc();
  }
}

/**
 * Load from browser.storage
 */
function load_options() {
  browser.storage.sync.get({
    AUTO_MUTE: false,
    AUTO_RECENT: false
  }, function (items) {
    document.getElementById(AUTO_MUTE).checked = items.AUTO_MUTE;
    document.getElementById(AUTO_RECENT).checked = items.AUTO_RECENT;

    if (items.AUTO_RECENT) {
      document.getElementById(AUTO_MUTE+"_label").innerText = browser.i18n.getMessage("option_auto_mute",[browser.i18n.getMessage("option_recent_tab")]);
    } else {
      document.getElementById(AUTO_MUTE+"_label").innerText = browser.i18n.getMessage("option_auto_mute",[browser.i18n.getMessage("option_current_tab")]);
    }
    document.getElementById(AUTO_RECENT+"_label").innerText = browser.i18n.getMessage("option_auto_recent");
    document.getElementById("reset").innerText = browser.i18n.getMessage("option_reset");
  });
}

/**
 * Listener for Detecting Click Elements
 */
document.addEventListener("DOMContentLoaded", load_options);
document.addEventListener("click", function (element) {
  save_options(element);
});