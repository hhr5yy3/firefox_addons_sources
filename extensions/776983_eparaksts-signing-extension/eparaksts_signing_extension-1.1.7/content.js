/*
 * Chrome token signing extension
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

var inuse = false;

// Forward the message from eparaksts-page.js to eparaksts-background.js
window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source !== window)
        return;

    // and forward to extension
    if (event.data.src && (event.data.src === "eparaksts-page.js")) {
        event.data["origin"] = location.origin;
        chrome.runtime.sendMessage(event.data, function(response) {});

        // Only add unload handler if extension has been used
        if (!inuse) {
            // close the native component if page unloads
            window.addEventListener("beforeunload", function(event) {
                chrome.runtime.sendMessage({src: "eparaksts-page.js", type: "DONE"});
            }, false);
            inuse = true;
        }
    }
}, false);

// post messages from extension to page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    window.postMessage(request, "*");
});

// inject content of eparaksts-page.js to the DOM of every page
// FIXME: maybe not ?
var s = document.createElement("script");
s.type = "text/javascript";
s.innerHTML=' \n\
/* \n\
 * Chrome token signing extension \n\
 * \n\
 * This library is free software; you can redistribute it and/or \n\
 * modify it under the terms of the GNU Lesser General Public \n\
 * License as published by the Free Software Foundation; either \n\
 * version 2.1 of the License, or (at your option) any later version. \n\
 * \n\
 * This library is distributed in the hope that it will be useful, \n\
 * but WITHOUT ANY WARRANTY; without even the implied warranty of \n\
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU \n\
 * Lesser General Public License for more details. \n\
 * \n\
 * You should have received a copy of the GNU Lesser General Public \n\
 * License along with this library; if not, write to the Free Software \n\
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA \n\
 */ \n\
 \n\
// Promises \n\
var _eid_promises = {}; \n\
// Turn the incoming message from extension \n\
// into pending Promise resolving \n\
window.addEventListener("message", function(event) { \n\
    if(event.source !== window) return; \n\
    if(event.data.src && (event.data.src === "eparaksts-background.js")) { \n\
        console.log("Page received: "); \n\
        console.log(event.data); \n\
        // Get the promise \n\
        if(event.data.nonce) { \n\
            var p = _eid_promises[event.data.nonce]; \n\
            // resolve \n\
            if(p !== undefined) { \n\
                if(event.data.result === "ok") { \n\
                    if(event.data.signature !== undefined) { \n\
                        p.resolve({hex: event.data.signature}); \n\
                    } else if(event.data.version !== undefined && event.data.extension !== undefined) { \n\
                        p.resolve(event.data.version + "/js" + event.data.extension); \n\
                    } else if(event.data.cert !== undefined) { \n\
                        p.resolve({hex: event.data.cert}); \n\
                    } else { \n\
                        console.log("No idea how to handle message"); \n\
                        console.log(event.data); \n\
                    } \n\
                } else { \n\
                    // reject \n\
                    p.reject(new Error(event.data.result)); \n\
                } \n\
            } else { \n\
            	console.log("Undefined promise"); \n\
            } \n\
            delete _eid_promises[event.data.nonce]; \n\
        } else { \n\
            console.log("No nonce in event msg"); \n\
        } \n\
    } \n\
}, false); \n\
 \n\
 \n\
function eParakstsTokenSigning() { \n\
    function nonce() { \n\
        var val = ""; \n\
        var hex = "abcdefghijklmnopqrstuvwxyz0123456789"; \n\
        for(var i = 0; i < 16; i++) val += hex.charAt(Math.floor(Math.random() * hex.length)); \n\
        return val; \n\
    } \n\
 \n\
    function messagePromise(msg) { \n\
        return new Promise(function(resolve, reject) { \n\
            // amend with necessary metadata \n\
            msg["nonce"] = nonce(); \n\
            msg["src"] = "eparaksts-page.js"; \n\
            // send message \n\
            window.postMessage(msg, "*"); \n\
            // and store promise callbacks \n\
            _eid_promises[msg.nonce] = { \n\
                resolve: resolve, \n\
                reject: reject \n\
            }; \n\
        }); \n\
    } \n\
    this.getCertificate = function(options) { \n\
        var msg = {type: "CERT", lang: options.lang, operation: options.operation}; \n\
        console.log("getCertificate()"); \n\
        return messagePromise(msg); \n\
    }; \n\
    this.sign = function(cert, hash, options) { \n\
        var msg = {type: "SIGN", cert: cert.hex, hash: hash.hex, hashtype: hash.type, lang: options.lang, operation: options.operation}; \n\
        console.log("sign()"); \n\
        return messagePromise(msg); \n\
    }; \n\
    this.getVersion = function() { \n\
        console.log("getVersion()"); \n\
        return messagePromise({ \n\
            type: "VERSION" \n\
        }); \n\
    }; \n\
} \n\
';

(document.head || document.documentElement).appendChild(s);
