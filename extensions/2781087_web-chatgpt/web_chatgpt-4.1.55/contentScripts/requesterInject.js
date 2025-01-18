import {
  setupProxyExecutor
} from "../chunks/U2LMMUIH.js";
import {
  createClientMessageListener
} from "../chunks/RBTIXGC2.js";
import "../chunks/AMCWABVH.js";
import "../chunks/QVVA4RGO.js";
import {
  ContentScriptConnectionV2
} from "../chunks/KFVZFM6T.js";
import "../chunks/4NOIXOKC.js";
import "../chunks/XVTLOGGR.js";
import "../chunks/XOBJISN3.js";
import "../chunks/2RTBHBIC.js";
import "../chunks/ERZ5UWI7.js";

// src/contentScripts/requesterInject.ts
var port = new ContentScriptConnectionV2();
async function main() {
  createClientMessageListener(async (event) => {
    if (event === "Requester_checkTabReady") {
      return {
        success: true,
        data: location.href
      };
    }
    return void 0;
  });
  port.postMessage({
    event: "Requester_proxyTabReady"
  });
}
setupProxyExecutor();
main().catch(console.error);
