/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
const NODE_ENV = "production";
window.addEventListener('load', () => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', NODE_ENV === 'production' ? chrome.runtime.getURL('./index.html') : 'http://localhost:3334');
    document.body.appendChild(iframe);
    window.addEventListener('message', ({ data }) => {
        chrome.runtime.sendMessage(data);
    });
    chrome.runtime.onMessage.addListener((message) => { var _a; return (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(message, '*'); });
});


/******/ })()
;