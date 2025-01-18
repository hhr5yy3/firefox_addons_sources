/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
if (!window.kwExtensionInstalled) {
    window.kwExtensionInstalled = true;
    chrome.runtime.onConnect.addListener((port) => {
        if (port.sender?.id !== chrome.runtime.id) {
            return;
        }
        if (!port.name) {
            return;
        }
        const onWindowMessage = (e) => {
            if (e.origin !== location.origin) {
                return;
            }
            if (e.source !== window) {
                return;
            }
            const data = e?.data;
            if (data?.kwConnect === 'response') {
                delete data.kwConnect;
                port.postMessage(e.data);
            }
        };
        window.addEventListener('message', onWindowMessage);
        port.onDisconnect.addListener(() => {
            window.removeEventListener('message', onWindowMessage);
        });
        port.onMessage.addListener((msg) => {
            msg.kwConnect = 'request';
            window.postMessage(msg, window.location.origin);
        });
    });
}

})();

/******/ })()
;