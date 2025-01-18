"use strict";

function configure(){
    chrome.tabs.create(
        {url:chrome.runtime.getURL("configure.html")}
    );
}

function rateExtension(){
    chrome.tabs.create(
        {
        active: true,
        url: "https://addons.mozilla.org/en-US/firefox/addon/safe-web/"
        }
    );
}

document.getElementById("configureButton").addEventListener("click",configure);

var rateLink = document.getElementById("rateTxt");
if (rateLink) {
    document.getElementById("rateTxt").addEventListener("click",rateExtension);
}
