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

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/Paramount/paramount_browse_injected.js

function setNativePartyButtonStyle(nativePartyButton) {
    const leftMargin = window.innerWidth < 370 ? '0px' : '10px';
    const topMargin = window.innerWidth < 370 ? '10px' : '0px';
    nativePartyButton.setAttribute('style', `background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); border-color: #e50914; color: #fff; margin-left: ${leftMargin}; margin-top: ${topMargin};`);
}
function addNativePartyButton() {
    if (document.getElementById('native-party-button') != null) {
        return undefined;
    }
    const playButton = document.querySelector('.button.playIcon');
    if (playButton == null || !playButton.getAttribute('aa-link')) {
        return undefined;
    }
    const parentDiv = playButton.parentElement;
    const nativePartyButton = document.createElement('button');
    nativePartyButton.setAttribute('class', playButton.getAttribute('class'));
    setNativePartyButtonStyle(nativePartyButton);
    nativePartyButton.setAttribute('id', 'native-party-button');
    nativePartyButton.innerHTML = '<div class="button__text">Start a Teleparty</div>';
    parentDiv.insertBefore(nativePartyButton, playButton.nextSibling);
    window.addEventListener('resize', () => setNativePartyButtonStyle(nativePartyButton));
    return [{ button: nativePartyButton, play: () => playButton.click() }];
}
addNativePartyHandler(addNativePartyButton);

/******/ })()
;