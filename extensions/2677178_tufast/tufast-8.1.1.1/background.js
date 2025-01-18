"use strict";
import * as credentials from "./modules/credentials.js";
import * as otp from "./modules/otp.js";
import * as owaFetch from "./modules/owaFetch.js";
import * as opalInline from "./modules/opalInline.js";
import {isFirefox} from "./modules/firefoxCheck.js";
import rockets from "./freshContent/rockets.json.proxy.js";
chrome.runtime.onInstalled.addListener(async (details) => {
  const reason = details.reason;
  switch (reason) {
    case "install":
      console.log("TUfast installed");
      await chrome.storage.local.set({
        dashboardDisplay: "favoriten",
        fwdEnabled: true,
        encryptionLevel: 4,
        availableRockets: ["default"],
        selectedRocketIcon: JSON.stringify(rockets.default),
        theme: "system",
        studiengang: "general",
        hisqisPimpedTable: true,
        bannersShown: ["mv3UpdateNotice"],
        improveSelma: true
      });
      await openSettingsPage("first_visit");
      break;
    case "update": {
      const currentSettings = await chrome.storage.local.get([
        "dashboardDisplay",
        "fwdEnabled",
        "encryptionLevel",
        "encryption_level",
        "availableRockets",
        "selectedRocketIcon",
        "theme",
        "studiengang",
        "hisqisPimpedTable",
        "improveSelma",
        "savedClickCounter",
        "saved_click_counter",
        "Rocket",
        "foundEasteregg",
        "bannersShown",
        "showedUnreadMailCounterBanner",
        "removedUnlockRocketsBanner",
        "showedOpalCustomizeBanner",
        "removedReviewBanner",
        "showedKeyboardBanner2",
        "pdfInInline",
        "pdfInNewTab"
      ]);
      const updateObj = {};
      if (typeof currentSettings.dashboardDisplay === "undefined")
        updateObj.dashboardDisplay = "favoriten";
      if (typeof currentSettings.fwdEnabled === "undefined")
        updateObj.fwdEnabled = true;
      if (typeof currentSettings.hisqisPimpedTable === "undefined")
        updateObj.hisqisPimpedTable = true;
      if (typeof currentSettings.improveSelma === "undefined")
        updateObj.improveSelma = true;
      if (typeof currentSettings.theme === "undefined")
        updateObj.theme = "system";
      if (typeof currentSettings.studiengang === "undefined")
        updateObj.studiengang = "general";
      if (typeof currentSettings.selectedRocketIcon === "undefined")
        updateObj.selectedRocketIcon = JSON.stringify(rockets.default);
      if (typeof currentSettings.encryption_level !== "undefined") {
        updateObj.encryptionLevel = currentSettings.encryptionLevel ?? currentSettings.encryption_level;
        currentSettings.encryptionLevel = currentSettings.encryptionLevel ?? currentSettings.encryption_level;
        await chrome.storage.local.remove(["encryption_level"]);
      }
      updateObj.encryptionLevel = await credentials.upgradeUserData(currentSettings.encryptionLevel);
      const savedClicks = currentSettings.savedClickCounter || currentSettings.saved_click_counter;
      if (typeof currentSettings.savedClickCounter === "undefined" && typeof currentSettings.saved_click_counter !== "undefined") {
        updateObj.savedClickCounter = savedClicks;
        await chrome.storage.local.remove(["saved_click_counter"]);
      }
      let avRockets = currentSettings.availableRockets || ["default"];
      avRockets = avRockets.map((rocket) => {
        switch (rocket) {
          case "RI_default":
            return "default";
          case "RI1":
            return "whatsapp";
          case "RI2":
            return "email";
          case "RI3":
            return "easteregg";
          case "RI4":
            return "250clicks";
          case "RI5":
            return "2500clicks";
          case "RI6":
            return "webstore";
          default:
            return rocket;
        }
      });
      avRockets = avRockets.filter((value, index, array) => array.indexOf(value) === index);
      if (savedClicks >= 250 && !avRockets.includes("250clicks"))
        avRockets.push("250clicks");
      if (savedClicks >= 2500 && !avRockets.includes("2500clicks"))
        avRockets.push("2500clicks");
      if (currentSettings.Rocket === "colorful") {
        if (!currentSettings.foundEasteregg)
          updateObj.foundEasteregg = true;
        if (!avRockets.includes("easteregg"))
          avRockets.push("easteregg");
        updateObj.selectedRocketIcon = JSON.stringify(rockets.easteregg);
        await chrome.action.setIcon({path: rockets.easteregg.iconPathUnlocked});
        await chrome.storage.local.remove(["Rocket"]);
      }
      updateObj.availableRockets = avRockets;
      const bannersShown = currentSettings.bannersShown || [];
      if (currentSettings.showedUnreadMailCounterBanner && !bannersShown.includes("mailCount"))
        bannersShown.push("mailCount");
      if (currentSettings.removedUnlockRocketsBanner && !bannersShown.includes("customizeRockets"))
        bannersShown.push("customizeRockets");
      if (currentSettings.showedOpalCustomizeBanner && !bannersShown.includes("customizeOpal"))
        bannersShown.push("customizeOpal");
      if (currentSettings.removedReviewBanner && !bannersShown.includes("submitReview"))
        bannersShown.push("submitReview");
      if (currentSettings.showedKeyboardBanner2 && !bannersShown.includes("keyboardShortcuts"))
        bannersShown.push("keyboardShortcuts");
      updateObj.bannersShown = bannersShown;
      if (currentSettings.pdfInInline && !await opalInline.permissionsGrantedWebRequest()) {
        await opalInline.disableOpalInline();
      }
      await chrome.storage.local.set(updateObj);
      break;
    }
  }
});
chrome.commands.onCommand.addListener(async (command) => {
  console.log("Detected command: " + command);
  switch (command) {
    case "open_opal_hotkey":
      await chrome.tabs.update({url: "https://bildungsportal.sachsen.de/opal/home/"});
      await saveClicks(2);
      break;
    case "open_owa_hotkey":
      await chrome.tabs.update({url: "https://msx.tu-dresden.de/owa/"});
      await saveClicks(2);
      break;
    case "open_jexam_hotkey":
      await chrome.tabs.update({url: "https://jexam.inf.tu-dresden.de/"});
      await saveClicks(2);
      break;
  }
});
chrome.storage.local.get(["selectedRocketIcon"], async (resp) => {
  try {
    const r = JSON.parse(resp.selectedRocketIcon);
    if (!r.iconPathUnlocked)
      console.warn('Rocket icon has no attribute "iconPathUnlocked", fallback to default icon.');
    await chrome.action.setIcon({path: r.iconPathUnlocked || rockets.default.iconPathUnlocked});
  } catch (e) {
    console.log(`Cannot parse rocket icon: ${JSON.stringify(resp.selectedRocketIcon)}`);
    await chrome.action.setIcon({path: rockets.default.iconPathUnlocked});
  }
});
chrome.storage.local.get(["enabledOWAFetch", "numberOfUnreadMails", "additionalNotificationOnNewMail"], async (result) => {
  if (await credentials.userDataExists("zih") && result.enabledOWAFetch) {
    await owaFetch.enableOWAAlarm();
  }
  if (!result.additionalNotificationOnNewMail)
    return;
  const notificationAccess = await chrome.permissions.contains({permissions: ["notifications"]});
  if (notificationAccess)
    owaFetch.registerNotificationClickListener();
});
chrome.storage.local.get(["pdfInInline"], async (result) => {
  if (result.pdfInInline) {
    await opalInline.enableOpalHeaderListener();
  }
});
const d = new Date(new Date().getFullYear(), 10, 20);
if (d.getTime() - Date.now() < 0)
  d.setFullYear(d.getFullYear() + 1);
chrome.alarms.create("resetGOpalBanner", {when: d.getTime()});
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "resetGOpalBanner") {
    await chrome.storage.local.set({closedMsg1: false});
  }
});
chrome.storage.local.get(["openSettingsOnReload"], async (resp) => {
  if (resp.openSettingsOnReload)
    await openSettingsPage();
  await chrome.storage.local.set({openSettingsOnReload: false});
});
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  switch (request.cmd) {
    case "save_clicks":
      saveClicks(request.click_count || request.clickCount);
      break;
    case "get_user_data":
      credentials.getUserData(request.platform || "zih").then(sendResponse);
      return true;
    case "set_user_data":
      credentials.setUserData(request.userData, request.platform || "zih").then(() => sendResponse(true));
      return true;
    case "check_user_data":
      Promise.all([
        credentials.userDataExists(request.platform),
        credentials.userDataExists(request.platform + "-totp"),
        credentials.userDataExists(request.platform + "-iotp")
      ]).then(([loginExists, totpExists, iotpExists]) => {
        sendResponse(loginExists || totpExists || iotpExists);
      });
      return true;
    case "delete_user_data":
      credentials.deleteUserData(request.platform).then(sendResponse);
      return true;
    case "get_totp":
      otp.getTOTP(request.platform).then(sendResponse);
      return true;
    case "get_iotp":
      if (!request.indexes)
        return sendResponse(void 0);
      otp.getIOTP(request.platform, ...request.indexes).then(sendResponse);
      return true;
    case "set_otp":
      switch (request.otpType) {
        case "totp":
          if (!request.secret)
            return sendResponse(false);
          credentials.setUserData({user: "totp", pass: request.secret}, (request.platform ?? "zih") + "-totp").then(() => {
            credentials.deleteUserData((request.platform ?? "zih") + "-iotp").then(() => sendResponse(true));
          });
          return true;
        case "iotp":
          if (!request.secret)
            return sendResponse(false);
          credentials.setUserData({user: "iotp", pass: request.secret}, (request.platform ?? "zih") + "-iotp").then(() => {
            credentials.deleteUserData((request.platform ?? "zih") + "-totp").then(() => sendResponse(true));
          });
          return true;
        default:
          return sendResponse(false);
      }
    case "delete_otp":
      credentials.deleteUserData((request.platform ?? "zih") + "-totp").then(() => credentials.deleteUserData((request.platform ?? "zih") + "-iotp")).then(() => sendResponse(true));
      return true;
    case "enable_owa_fetch":
      owaFetch.enableOWAFetch().then(sendResponse);
      return true;
    case "disable_owa_fetch":
      owaFetch.disableOWAFetch().then(sendResponse);
      return true;
    case "enable_owa_notification":
      owaFetch.enableOWANotifications().then(() => sendResponse(true));
      return true;
    case "disable_owa_notification":
      owaFetch.disableOWANotifications().then(() => sendResponse(true));
      return true;
    case "check_owa_status":
      owaFetch.checkOWAStatus().then(sendResponse);
      return true;
    case "enable_opalpdf_inline":
      opalInline.enableOpalInline().then(sendResponse);
      return true;
    case "disable_opalpdf_inline":
      opalInline.disableOpalInline().then(() => sendResponse(true));
      return true;
    case "enable_opalpdf_newtab":
      opalInline.enableOpalFileNewTab().then(sendResponse);
      return true;
    case "disable_opalpdf_newtab":
      opalInline.disableOpalFileNewTab().then(() => sendResponse(true));
      return true;
    case "check_opalpdf_status":
      opalInline.checkOpalFileStatus().then(sendResponse);
      return true;
    case "enable_se_redirect":
      chrome.storage.local.set({fwdEnabled: true}, () => sendResponse(true));
      return true;
    case "disable_se_redirect":
      chrome.storage.local.set({fwdEnabled: false}, () => sendResponse(true));
      return true;
    case "check_se_status":
      chrome.storage.local.get(["fwdEnabled"], (result) => sendResponse({redirect: result.fwdEnabled}));
      return true;
    case "set_rocket_icon":
      setRocketIcon(request.rocketId || "default").then(() => sendResponse(true));
      return true;
    case "unlock_rocket_icon":
      unlockRocketIcon(request.rocketId || "default").then(() => sendResponse(true));
      return true;
    case "check_rocket_status":
      chrome.storage.local.get(["selectedRocketIcon", "availableRockets"], (result) => sendResponse({selected: result.selectedRocketIcon, available: result.availableRockets}));
      return true;
    case "read_mail_owa":
      owaFetch.readMailOWA(request.nrOfUnreadMail || 0);
      break;
    case "reload_extension":
      chrome.runtime.reload();
      break;
    case "open_settings_page":
      openSettingsPage(request.params).then(() => sendResponse(true));
      return true;
    case "open_share_page":
      openSharePage();
      break;
    case "open_shortcut_settings": {
      if (isFirefox()) {
        chrome.tabs.create({url: "https://support.mozilla.org/de/kb/tastenkombinationen-fur-erweiterungen-verwalten"});
      } else {
        chrome.tabs.create({url: "chrome://extensions/shortcuts"});
      }
      break;
    }
    case "update_rocket_logo_easteregg":
      chrome.action.setIcon({path: "assets/icons/RocketIcons/3_120px.png"});
      break;
    case "logout_idp":
      logoutIdp(request.logoutDuration);
      break;
    case "easteregg_found":
      eastereggFound();
      break;
    default:
      console.log(`Cmd not found "${request.cmd}"!`);
      break;
  }
  return false;
});
async function openSettingsPage(params) {
  if (params) {
    await chrome.storage.local.set({openSettingsPageParam: params});
  }
  await chrome.runtime.openOptionsPage();
}
async function openSharePage() {
  await chrome.tabs.create({url: "share.html"});
}
async function saveClicks(counter) {
  const result = await chrome.storage.local.get(["savedClickCounter"]);
  const savedClickCounter = typeof result.savedClickCounter === "undefined" ? counter : result.savedClickCounter + counter;
  await chrome.storage.local.set({savedClickCounter});
  console.log("Saved " + counter + " clicks!");
  const {availableRockets} = await chrome.storage.local.get(["availableRockets"]);
  if (savedClickCounter >= 250 && !availableRockets.includes("250clicks"))
    availableRockets.push("250clicks");
  if (savedClickCounter >= 2500 && !availableRockets.includes("2500clicks"))
    availableRockets.push("2500clicks");
  await chrome.storage.local.set({availableRockets});
}
async function logoutIdp(logoutDuration = 5) {
  const granted = await chrome.permissions.request({permissions: ["cookies"]});
  if (!granted)
    return;
  const date = new Date();
  date.setMinutes(date.getMinutes() + logoutDuration);
  await chrome.cookies.set({
    url: "https://idp.tu-dresden.de",
    name: "tuFast_idp_loggedOut",
    value: "true",
    secure: true,
    expirationDate: date.getTime() / 1e3
  });
  const {idpLogoutEnabled} = await chrome.storage.local.get(["idpLogoutEnabled"]);
  if (!idpLogoutEnabled)
    return;
  const sessionCookie = await chrome.cookies.get({
    url: "https://idp.tu-dresden.de",
    name: "JSESSIONID"
  });
  if (!sessionCookie)
    return;
  const redirect = await fetch("https://idp.tu-dresden.de/idp/profile/Logout", {
    headers: {
      Cookie: `JSESSIONID=${sessionCookie.value}`
    }
  });
  await fetch(redirect.url, {
    headers: {
      Cookie: `JSESSIONID=${sessionCookie.value}`
    },
    method: "POST"
  });
}
async function eastereggFound() {
  await unlockRocketIcon("easteregg");
  await setRocketIcon("easteregg");
  await chrome.storage.local.set({foundEasteregg: true});
}
async function setRocketIcon(rocketId) {
  const rocket = rockets[rocketId] || rockets.default;
  await chrome.storage.local.set({selectedRocketIcon: JSON.stringify(rocket)});
  await chrome.action.setIcon({path: rocket.iconPathUnlocked});
}
async function unlockRocketIcon(rocketId) {
  const {availableRockets} = await chrome.storage.local.get(["availableRockets"]);
  if (!availableRockets.includes(rocketId))
    availableRockets.push(rocketId);
  const update = {availableRockets};
  if (rocketId === "webstore")
    update.mostLikelySubmittedReview = true;
  await chrome.storage.local.set(update);
}
