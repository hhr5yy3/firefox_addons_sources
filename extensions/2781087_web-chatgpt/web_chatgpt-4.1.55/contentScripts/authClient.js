import {
  syncAuthClientLogin
} from "../chunks/QVVA4RGO.js";
import {
  ContentScriptConnectionV2
} from "../chunks/KFVZFM6T.js";
import "../chunks/4NOIXOKC.js";
import "../chunks/XVTLOGGR.js";
import "../chunks/XOBJISN3.js";
import "../chunks/ERZ5UWI7.js";

// src/contentScripts/authClient.ts
var port = new ContentScriptConnectionV2({
  runtime: "client"
});
var lastPathname = location.pathname;
async function syncIsLogin() {
  const data = syncAuthClientLogin();
  if (data == null ? void 0 : data.refreshToken) {
    const result = await port.postMessage({
      event: "Client_updateUseChatGPTAuthInfo",
      data
    });
    if (result.success) {
      port.postMessage({
        event: "Client_authDone",
        data: result
      });
    }
  } else {
    lastPathname = "";
  }
}
syncIsLogin();
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (lastPathname !== location.pathname) {
      lastPathname = location.pathname;
      syncIsLogin();
    }
  });
});
observer.observe(document.querySelector("body"), {
  attributes: true,
  childList: true,
  subtree: true
});
