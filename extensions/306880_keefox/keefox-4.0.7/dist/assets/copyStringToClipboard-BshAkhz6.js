import { K as KeeLog } from "./ConfigManager-DadTRJhU.js";
import { i as isChrome, a as isExtensionContext } from "./index-D6ogrY8Q.js";
async function copyStringToClipboard(value) {
  if (isChrome && isExtensionContext) {
    try {
      await mv3ClipboardWorkaround(value);
      return;
    } catch (e) {
      KeeLog.error("Failed to write to clipboard using MV3 offscreen workaround");
    }
  }
  try {
    await navigator.clipboard.writeText(value);
  } catch (e) {
    try {
      const copyFrom = document.createElement("textarea");
      copyFrom.textContent = value;
      const body = document.getElementsByTagName("body")[0];
      body.appendChild(copyFrom);
      copyFrom.select();
      document.execCommand("copy");
      body.removeChild(copyFrom);
      KeeLog.info("Failed to write to clipboard using modern API so used the fallback hack");
    } catch (e2) {
      KeeLog.error("Failed to write to clipboard using modern API and fallback hack");
    }
  }
}
async function mv3ClipboardWorkaround(value) {
  await chrome.offscreen.createDocument({
    url: chrome.runtime.getURL("lib/copyToClipboard.html"),
    reasons: [chrome.offscreen.Reason.CLIPBOARD],
    justification: "Required by Chromium to copy text."
  });
  chrome.runtime.sendMessage({
    type: "copy-data-to-clipboard",
    target: "offscreen-doc",
    data: value
  });
}
export {
  copyStringToClipboard as c
};
//# sourceMappingURL=copyStringToClipboard-BshAkhz6.js.map
