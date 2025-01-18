"use strict";

(function() {
    // Append DOM elem for event comms.
    let webExtCommNode = document.createElement("span");
    webExtCommNode.id = "digsign-webext-comm-node";
    webExtCommNode.style = "display: none;";
    document.body.appendChild(webExtCommNode);
    console.log("(Content) webExtCommNode appended");
	
    // Connect to background script.
    let bgPort = chrome.runtime.connect();

    // Webpage to content script comms.
    webExtCommNode.addEventListener("msgFromWebpage", 
        event => {
            let req = event.detail;

            if (req.webExtContentOp == "loadDigSignWebExtClassJS") {
                console.log("(Content) received msg from webpage:");
                console.log(req);

                console.log("(Content) injecting eSignatureWebExt.js in webpage");
                let s = document.createElement("script");
                s.src = chrome.extension.getURL("eSignatureWebExt.js");
				//alert("getURL: " + chrome.extension.getURL("eSignatureWebExt.js"));
				console.log("getURL: " + chrome.extension.getURL("eSignatureWebExt.js"));
                document.body.appendChild(s);
            } else {
                console.log("(Content) received msg from webpage and sending it to background:");
                console.log(req);

                bgPort.postMessage(req);
            }
        });

    // Listen to background msgs.
    bgPort.onMessage.addListener(
        res => {
            console.log("(Content) received msg from background and sending it to webpage:");
            console.log(res);
            
            // Firefox fix for passing objects created in another context.
            if (typeof(cloneInto) != "undefined")
                res = cloneInto(res, window);

            webExtCommNode.dispatchEvent(
                new CustomEvent("msgToWebpage", {
                    detail: res
                })
            );
        });

    // If background disconnects.
    bgPort.onDisconnect.addListener(
        () => {
			console.error("(Content) webExt background script disconnected!");
			//console.log("(Content) onDisconnect removing webExtCommNode:" + webExtCommNode);
			webExtCommNode.remove();
			//console.log("(Content) onDisconnect webExtCommNode removed:" + webExtCommNode);
			
			// Append DOM elem. Para poder controlar si la app nativa está bien instalada.
			let webExtDisconnectedNode = document.createElement("span");
			webExtDisconnectedNode.id = "webExtdisconnected";
			webExtDisconnectedNode.style = "display: none;";
			document.body.appendChild(webExtDisconnectedNode);
			
			// Se controla la excepción, ya que lastError suele ser null.
			try {
				console.error(chrome.runtime.lastError.message); 
			} catch(err) {
				console.log("(Content) onDisconnect() chrome.runtime.lastError == null");
            }
        }
    );
})();