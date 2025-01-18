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

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/Hotstar/hotstar_browse_injected.js

function addNativePartyButton() {
    if (document.getElementById('native-party-button') != null) {
        return undefined;
    }
    const parentDiv = document.querySelector("#shimmerContainer");
    if (parentDiv == null) {
        return undefined;
    }
    const playButton = parentDiv.querySelector("div.w-full > a > button");
    if (playButton == null) {
        return undefined;
    }
    const nativePartyButton = document.createElement('button');
    nativePartyButton.setAttribute('style', 'font-family: var(--FONT-FAMILY); font-weight: var(--BUTTON2-SEMIBOLD-WEIGHT); background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); color: #fff; display: flex; align-items: center; justify-content: center; text-align: center; cursor: pointer; width: 100%; margin-top: 0.5rem; border-radius: 8px; min-height: 48px');
    nativePartyButton.style.height = playButton.offsetHeight + 'px';
    nativePartyButton.setAttribute('id', 'native-party-button');
    nativePartyButton.innerHTML = '<span>Start a Teleparty</span>';
    parentDiv.insertBefore(nativePartyButton, playButton.nextSibling);
    return [{ button: nativePartyButton, play: () => playButton.click() }];
}
addNativePartyHandler(addNativePartyButton);

/******/ })()
;