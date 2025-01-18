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

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/Max/max_browse_injected.js

function addNativePartyButton() {
    if (document.getElementById('native-party-button') != null) {
        return undefined;
    }
    const playButton = document.querySelector('button[data-testid="play_button"]');
    if (playButton == null) {
        return undefined;
    }
    const parentDiv = playButton.parentElement;
    const nativePartyButton = document.createElement('button');
    nativePartyButton.setAttribute('class', playButton.getAttribute('class'));
    nativePartyButton.setAttribute('style', 'background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); color: #fff; border: none;');
    const playButtonTextElement = playButton.querySelector('span');
    const nativePartyButtonText = document.createElement('span');
    nativePartyButtonText.innerHTML = 'Start a Teleparty';
    nativePartyButtonText.setAttribute('class', playButtonTextElement.getAttribute('class'));
    nativePartyButton.appendChild(nativePartyButtonText);
    nativePartyButton.setAttribute('id', 'native-party-button');
    parentDiv.insertBefore(nativePartyButton, playButton.nextSibling);
    return [{ button: nativePartyButton, play: () => playButton.click() }];
}
addNativePartyHandler(addNativePartyButton);

/******/ })()
;