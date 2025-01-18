import {isFirefox, getBrowserNetRequestPermissions as getBrowserPermissions} from "./firefoxCheck.js";
const rules = [{
  id: 69,
  action: {
    type: "modifyHeaders",
    responseHeaders: [{
      header: "content-disposition",
      value: "inline",
      operation: "set"
    }]
  },
  condition: {
    urlFilter: "downloadering",
    requestDomains: ["bildungsportal.sachsen.de"],
    resourceTypes: ["main_frame"]
  }
}, {
  id: 420,
  action: {
    type: "modifyHeaders",
    responseHeaders: [{
      header: "content-disposition",
      value: "inline",
      operation: "set"
    }]
  },
  condition: {
    urlFilter: ".pdf|",
    requestDomains: ["bildungsportal.sachsen.de"],
    resourceTypes: ["main_frame"]
  }
}];
export async function permissionsGrantedWebRequest() {
  return await chrome.permissions.contains({permissions: getBrowserPermissions()});
}
export async function enableOpalInline() {
  const granted = await chrome.permissions.request({permissions: getBrowserPermissions()});
  if (!granted) {
    alert("TUfast braucht diese Berechtigung, um Dateien ohne Download zu öffnen. Bitte drücke auf 'Erlauben'.");
    disableOpalInline();
    return false;
  }
  await chrome.storage.local.set({pdfInInline: true});
  enableOpalHeaderListener();
  return true;
}
export async function disableOpalInline() {
  await chrome.storage.local.set({pdfInInline: false, pdfInNewTab: false});
  if (chrome.webRequest)
    chrome.webRequest.onHeadersReceived.removeListener(headerListenerFunc);
  if (chrome.declarativeNetRequest)
    await chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: rules.map((r) => r.id)});
  await chrome.permissions.remove({permissions: getBrowserPermissions()}).catch(() => {
  });
}
export async function enableOpalHeaderListener() {
  const granted = await chrome.permissions.contains({permissions: getBrowserPermissions()});
  if (!granted)
    return;
  if (isFirefox()) {
    chrome.webRequest.onHeadersReceived.addListener(headerListenerFunc, {
      urls: [
        "https://bildungsportal.sachsen.de/opal/downloadering*",
        "https://bildungsportal.sachsen.de/opal/*.pdf"
      ]
    }, ["blocking", "responseHeaders"]);
  } else {
    await chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: rules.map((r) => r.id)});
    await chrome.declarativeNetRequest.updateDynamicRules({addRules: rules});
  }
}
export async function disableOpalHeaderListener() {
  if (isFirefox()) {
    if (chrome.webRequest)
      chrome.webRequest.onHeadersReceived.removeListener(headerListenerFunc);
  } else {
    if (chrome.declarativeNetRequest)
      await chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: rules.map((r) => r.id)});
  }
}
export async function enableOpalFileNewTab() {
  await chrome.storage.local.set({pdfInNewTab: true});
  return true;
}
export async function disableOpalFileNewTab() {
  await chrome.storage.local.set({pdfInNewTab: false});
}
export async function checkOpalFileStatus() {
  const {pdfInInline, pdfInNewTab} = await chrome.storage.local.get(["pdfInNewTab", "pdfInInline"]);
  return {inline: !!pdfInInline, newtab: !!pdfInNewTab};
}
function headerListenerFunc(details) {
  if (!details.responseHeaders)
    return;
  const header = details.responseHeaders.find((e) => e.name.toLowerCase() === "content-disposition");
  if (!header)
    return;
  header.value = "inline";
  return {responseHeaders: details.responseHeaders};
}
