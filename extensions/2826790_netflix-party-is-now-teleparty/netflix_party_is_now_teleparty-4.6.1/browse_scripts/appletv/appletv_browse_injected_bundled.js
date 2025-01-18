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

;// CONCATENATED MODULE: ./src/Teleparty/BrowseScripts/AppleTV/appletv_browse_injected.js

function getStartEpisodeButton() {
    const controlButtons = document.querySelectorAll(".video-data-services-button");
    for (const button of controlButtons) {
        const buttonData = JSON.parse(button.getAttribute("data-metrics-location") || "");
        if ((buttonData === null || buttonData === void 0 ? void 0 : buttonData.actionType) == "Play") {
            return button;
        }
    }
    return undefined;
}
function addNativePartyButton() {
    if (document.getElementById('native-party-button') != null) {
        return undefined;
    }
    const playButton = getStartEpisodeButton();
    console.log(playButton);
    if (playButton == null) {
        return undefined;
    }
    const nativePartyButton = document.createElement('button');
    nativePartyButton.setAttribute('class', playButton.getAttribute('class'));
    nativePartyButton.setAttribute('style', 'background: linear-gradient(273.58deg, #9E55A0 0%, #EF3E3A 100%); color: #fff; cursor: pointer; margin-top: 0.75em;');
    nativePartyButton.setAttribute('id', 'native-party-button');
    nativePartyButton.innerHTML = '<span style="cursor: pointer;">Start a Teleparty</span>';
    playButton.parentElement.appendChild(nativePartyButton);
    return [{ button: nativePartyButton, play: () => playButton.click() }];
}
addNativePartyHandler(addNativePartyButton);

/******/ })()
;