import { b as browser, l as logger, e as errorCapture } from "./urlAccess-93f11c64.js";
function receiveMessages(type, fn) {
  receiveMessage(type, async (s, m) => {
    for (let it = fn(s, m), el = await it.next(); !el.done || el.value !== void 0; el = await it.next()) {
      if (el.value)
        sendMessage(s.tab.id, el.value);
    }
  });
}
const receiveMessageHandlers = {};
function receiveMessage(type, fn) {
  receiveMessageHandlers[type] = fn;
}
function sendMessage(tabId, message) {
  logger.debug(`Send [${tabId}${message ? `|${message.type}]` : ""}]`, {
    payload: "payload" in message ? message.payload : void 0
  });
  if (tabId && tabId >= 0) {
    browser.tabs.sendMessage(tabId, message);
  } else {
    browser.runtime.sendMessage(message);
  }
}
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  logger.debug(`Receive [${sender.tab?.id || "NO_TAB"}${message ? `|${message.type}]` : ""}]`, {
    payload: message && message.payload
  });
  sender?.origin || (sender.url ? new URL(sender.url).origin : null);
  sender.tab = sender?.tab || {
    id: -1,
    active: true,
    attention: false,
    audible: false,
    autoDiscardable: false,
    height: -1,
    width: -1,
    mutedInfo: {},
    status: "complete",
    url: sender.origin
  };
  if (message && typeof message.type === "string") {
    try {
      const fn = receiveMessageHandlers[message.type];
      if (!fn)
        return;
      return fn(sender, message.payload, message).then((result) => {
        if (result && typeof result.type === "string") {
          sendResponse(result);
          sendMessage(sender?.tab?.id, result);
        }
      }).catch((e) => {
        errorCapture(e);
        logger.error(`receiveMessage<${message.type}> error: ${e.message}`);
        logger.error("Exception:", e);
      });
    } catch (e) {
      errorCapture(e);
      logger.error(`receiveMessage<${message.type}> error: ${e?.message}`);
      logger.error("Exception:", e);
    }
  }
});
export {
  receiveMessages as a,
  receiveMessage as r,
  sendMessage as s
};
