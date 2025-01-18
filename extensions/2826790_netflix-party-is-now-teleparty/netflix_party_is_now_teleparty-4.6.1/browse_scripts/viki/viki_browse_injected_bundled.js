/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/NativePartyHandler.ts
const addNativePartyHandler = (tryAddButton) => {
    setInterval(() => {
        try {
            const buttons = tryAddButton();
            if (buttons) {
                for (const button of buttons) {
                    button.button.addEventListener('click', () => {
                        localStorage.setItem("nativeParty", JSON.stringify({ shouldStart: true, expiry: Date.now() + 1000 * 60 * 2, randomId: Math.random().toString() }));
                        button.play();
                        // Clear the click event listener
                        button.button.removeEventListener('click', () => {
                            //
                        });
                    });
                }
            }
        }
        catch (error) {
            // silent catch
        }
    }, 500);
};

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/Viki/viki_browse_injected.js

function addNativePartyButton() {
    var _a;
    if (document.getElementById('native-party-button') != null) {
        return undefined;
    }
    const playIcon = document.querySelector('.icon-play');
    if (playIcon == null) {
        return undefined;
    }
    const playButton = playIcon.parentElement;
    if (playButton == null) {
        return undefined;
    }
    const parentDiv = (_a = playButton.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    if (parentDiv == null) {
        return undefined;
    }
    const nativePartyButton = document.createElement('button');
    nativePartyButton.setAttribute('class', playButton.classList.toString());
    nativePartyButton.setAttribute('style', 'background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); border-color: #e50914; color: #fff;');
    nativePartyButton.setAttribute('id', 'native-party-button');
    nativePartyButton.innerHTML = '<span>Start a Teleparty</span>';
    parentDiv.insertBefore(nativePartyButton, playButton.nextSibling);
    return [{ button: nativePartyButton, play: () => playButton.click() }];
}
addNativePartyHandler(addNativePartyButton);

/******/ })()
;