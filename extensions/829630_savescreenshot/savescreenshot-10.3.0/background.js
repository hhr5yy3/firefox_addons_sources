/*
    Firefox addon "Save Screenshot"
    Copyright (C) 2022  Manuel Reimer <manuel.reimer@gmx.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

// Fired if one of our context menu entries is clicked.
function ContextMenuClicked(aInfo) {
  SendMessage(aInfo.menuItemId);
}

// Fired if toolbar button is clicked
function ToolbarButtonClicked() {
  SendMessage("{}");
}

// Fired if shortcut is pressed
function CommandPressed(aName) {
  const info = aName.split("-");
  SendMessage('{"format": "' + info[1] + '", "region": "' + info[0] + '"}');
}

// Triggers UI update (toolbar button popup and context menu)
async function UpdateUI() {
  // Get menu list
  const menus = await GetMenuList();

  //
  // Update toolbar button popup
  //

  if (menus.length)
    browser.browserAction.setPopup({popup: "popup/choose_format.html"});
  else
    browser.browserAction.setPopup({popup: ""});

  //
  // Update context menu
  //

  if (browser.contextMenus !== undefined) { // If not on Android
    await browser.contextMenus.removeAll();

    const prefs = await Storage.get();

    if (prefs.show_contextmenu) {
      const topmenu = browser.contextMenus.create({
        id: "{}",
        title: browser.i18n.getMessage("extensionName"),
        contexts: ["page"]
      });

      menus.forEach((entry) => {
        browser.contextMenus.create({
          id: entry.data,
          title: entry.label,
          contexts: ["page"],
          parentId: topmenu
        });
      });
    }
  }
}

// Register event listener to receive option update notifications and
// content script requests
browser.runtime.onMessage.addListener((data, sender) => {
  // An option change with request for redraw happened
  if (data.type == "OptionsChanged" && data.redraw)
    UpdateUI();

  // The content script requests us to take a screenshot
  if (data.type == "TakeScreenshot")
    TakeScreenshot(data, sender.tab);
});


const DOWNLOAD_CACHE = {};
async function TakeScreenshot(data, tab) {
  const prefs = await Storage.get();

  const formats = {png: "png", jpg: "jpeg", copy: "png"};
  let content = await browser.tabs.captureTab(tab.id, {
    format: formats[data.format],
    quality: prefs.jpegquality,
    rect: {
      x: data.left,
      y: data.top,
      width: data.width,
      height: data.height
    }
  });

  // Handle copy to clipboard
  if (data.format == "copy") {
    const buffer = new DataURLParser(content).arrayBuffer();
    await browser.clipboard.setImageData(buffer, "png");
    if (prefs.copynotification)
      browser.notifications.create("info-notification", {
        "type": "basic",
        "title": browser.i18n.getMessage("extensionName"),
        "message": browser.i18n.getMessage("info_screenshot_copied")
      });
  }

  // All other data formats have to be handled as downloads
  else {
    // Add image comment if we are allowed to
    if (prefs.image_comment)
      content = await ApplyImageComment(content, tab.title, tab.url);

    const filename = GetDefaultFileName("saved_page", tab, prefs.filenameformat) + "." + data.format;

    // The method "open" requires a temporary <a> hyperlink whose creation and
    // handling has to be offloaded to our content script
    if (prefs.savemethod == "open") {
      await browser.tabs.sendMessage(tab.id, {
        type: "TriggerOpen",
        content: content,
        filename: filename
      });
    }
    // All other download types are handled with the "browser.downloads" API
    else {
      const blob = new DataURLParser(content).blob();
      const options = {
        filename: prefs.targetdir ? prefs.targetdir + "/" + filename: filename,
        url: URL.createObjectURL(blob),
        saveAs: (prefs.savemethod == "saveas")
      };
      // Trigger download
      const id = await browser.downloads.download(options);
      // Store download options for usage in "onChanged".
      DOWNLOAD_CACHE[id] = options;
    }
  }
}


// Download change listener.
// Used to create a notification in the "non prompting" mode, so the user knows
// that his screenshot has been created. Also handles cleanup after download.
browser.downloads.onChanged.addListener(async (delta) => {
  if (delta.id in DOWNLOAD_CACHE) { // Was the download triggered by us?
    if (delta.state && delta.state.current === "complete") { // Is it done?
      const options = DOWNLOAD_CACHE[delta.id];

      // When saving without prompting, then trigger notification
      const prefs = await Storage.get();
      if (!options.saveAs && prefs.savenotification)
        browser.notifications.create("info-notification", {
          "type": "basic",
          "title": browser.i18n.getMessage("extensionName"),
          "message": browser.i18n.getMessage("info_screenshot_saved") + "\n" + options.filename
        });

      // Free memory used for our "blob URL"
      URL.revokeObjectURL(options.url);
      // Remove data for this download from our cache
      delete DOWNLOAD_CACHE[delta.id];
    }
  }
});


// Gets the default file name, used for saving the screenshot
function GetDefaultFileName(aDefaultFileName, tab, aFilenameFormat) {
  //prioritize formatted variant
  const formatted = SanitizeFileName(ApplyFilenameFormat(aFilenameFormat, tab));
  if (formatted)
    return formatted;

  // If possible, base the file name on document title
  if (tab.title) {
    const title = SanitizeFileName(tab.title);
    if (title)
      return title;
  }

  // Otherwise try to use the actual HTML filename
  const url = new URL(tab.url)
  const path = url.pathname;
  if (path) {
    const filename = SanitizeFileName(path.substring(path.lastIndexOf('/')+1));
    if (filename)
      return filename;
  }

  // Finally use the provided default name
  return aDefaultFileName;
}

// Replaces format character sequences with the actual values
function ApplyFilenameFormat(aFormat, tab) {
  const now = new Date();
  aFormat = aFormat.replace(/%Y/,now.getFullYear());
  aFormat = aFormat.replace(/%y/,now.getFullYear().toString().substring(2));
  aFormat = aFormat.replace(/%m/,(now.getMonth()+1).toString().padStart(2, '0'));
  aFormat = aFormat.replace(/%d/,now.getDate().toString().padStart(2, '0'));
  aFormat = aFormat.replace(/%H/,now.getHours().toString().padStart(2, '0'));
  aFormat = aFormat.replace(/%M/,now.getMinutes().toString().padStart(2, '0'));
  aFormat = aFormat.replace(/%S/,now.getSeconds().toString().padStart(2, '0'));
  aFormat = aFormat.replace(/%t/,tab.title || "");
  aFormat = aFormat.replace(/%u/,tab.url.replace(/:/g, ".").replace(/[\/\?]/g, "-"));
  aFormat = aFormat.replace(/%h/,(new URL(tab.url)).hostname);
  return aFormat;
}

// "Sanitizes" given string to be used as file name.
function SanitizeFileName(aFileName) {
  // http://www.mtu.edu/umc/services/digital/writing/characters-avoid/
  aFileName = aFileName.replace(/[<\{]+/g, "(");
  aFileName = aFileName.replace(/[>\}]+/g, ")");
  aFileName = aFileName.replace(/[#$%!&*\'?\"\/:\\@|]/g, "");
  // Remove leading spaces, "." and "-"
  aFileName = aFileName.replace(/^[\s-.]+/, "");
  // Remove trailing spaces and "."
  aFileName = aFileName.replace(/[\s.]+$/, "");
  // Replace all groups of spaces with just one space character
  aFileName = aFileName.replace(/\s+/g, " ");
  return aFileName;
}


// Migrates old "only one possible" preferences to new "multi select" model
async function MigrateSettings() {
  const prefs = await Storage.get();
  const newprefs = {};
  if ("region" in prefs) {
    if (prefs.region == "manual")
      newprefs.regions = ["full", "viewport", "selection"];
    else
      newprefs.regions = [prefs.region];
    await Storage.remove("region");
  }
  if ("format" in prefs) {
    if (prefs.format == "manual")
      newprefs.formats = ["png", "jpg", "copy"];
    else
      newprefs.formats = [prefs.format];
    await Storage.remove("format");
  }
  await Storage.set(newprefs);
}

async function Startup() {
  await MigrateSettings();

  // Android: Change defaults to reflect supported options on Android
  if ((await browser.runtime.getPlatformInfo()).os === "android") {
    const prefs = await Storage.get();

    // Only save method "open" supported (downloads API behaves ugly)
    prefs["savemethod"] = "open";

    // "browser.contextMenus" is undefined on Android
    prefs["show_contextmenu"] = false;

    // No image copy to clipboard supported
    const copyindex = prefs["formats"].indexOf("copy");
    if (copyindex !== -1)
      prefs["formats"].splice(copyindex, 1);

    await Storage.set(prefs);
  }

  await UpdateUI();
}

// Register event listeners
if (browser.contextMenus !== undefined) // If not on Android
  browser.contextMenus.onClicked.addListener(ContextMenuClicked);
browser.browserAction.onClicked.addListener(ToolbarButtonClicked);
if (browser.commands !== undefined) // If not on Android
  browser.commands.onCommand.addListener(CommandPressed);

Startup();

IconUpdater.Init("icons/savescreenshot.svg");
