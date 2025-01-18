"use strict";

(function() {
    chrome.runtime.onConnect.addListener(
        contentPort => {
            console.log("(Background) content connected.");

            let nativePort = chrome.runtime.connectNative("minsait.dig_sig_webext_app");

            // Native wrapper to background comms.
            nativePort.onMessage.addListener(
                res => {
                    console.log("(Background) received msg from native wrapper and sending it to content:");
                    console.log(res);

                    contentPort.postMessage(res);
                }
            );

            // If native wrapper disconnects.
            nativePort.onDisconnect.addListener(
                () => {
                    nativePort = undefined;

                    contentPort.disconnect();
                    contentPort = undefined;

                    console.error("(Background) native wrapper disconnected:");
                    console.error(chrome.runtime.lastError.message); 
                }
            );

            // Listen to content msgs.
            contentPort.onMessage.addListener(
                req => {
                    console.log("(Background) received msg from content and sending it to native wrapper:");
                    console.log(req);

                    // Send request to native wrapper.
                    nativePort.postMessage(req);
                });

            // If content disconnects.
            contentPort.onDisconnect.addListener(
                () => {
                    contentPort = undefined;

                    nativePort.disconnect();
                    nativePort = undefined;

                    console.log("(Background) content disconnected.");
                }
            );
        });
})();