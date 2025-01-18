"use strict";

const Flagfox = browser.extension.getBackgroundPage();  // NOTE: This fetches access to the global object for the background scripts (all praise the sync access!!!)

//BEGIN LOADING/UNLOADING *****************************************************
//{{{

window.addEventListener("load", function() {
    assert(!!parent, "Missing parent document. This page can only be loaded as a subdocument of the main config.html page.");

    // Populate the translator credits box
    let translatorCreditsBox = document.getElementById("translatorCreditsBox");
    let translatorCreditTemplate = document.getElementById("translatorCreditTemplate");
    let translatorsList = window.document.createElement("div");
    translatorsList.setAttribute("style", "padding: 1px 5px;");
    translatorsList.setAttribute("class", "autoexpand-x");
    Flagfox.lazyLoadPropertiesFile(["countrynames"]).then(() => {  // For sync string fetches
        function getByDataID(item,id) { return item.querySelector("[data-id=\""+id+"\"]"); }
        let localesListed = new Set();
        for (let [code, name] of translator_credits) {
            let flag = language_flags[code];
            let newLine = document.importNode(translatorCreditTemplate.content, true).firstElementChild;  // This is a "span" element
            let newFlag = getByDataID(newLine, "flag");
            newFlag.setAttribute("src", Flagfox.iconPath("flags/" + flag));
            newFlag.setAttribute("title", Flagfox.getLoadedString(flag.toUpperCase()));
            let newName = getByDataID(newLine, "name");
            newName.textContent = name;
            let newLocale = getByDataID(newLine, "locale");
            newLocale.textContent = native_language_names[code] + " [" + code + "]";
            if (localesListed.has(code)) {
                newFlag.style.visibility = "hidden";  // One icon per locale, but add in the element invisibly to let the names align properly
                newLocale.style.display = "none";     // Only one language name per locale; hide if already shown
            }
            translatorsList.appendChild(newLine);
            localesListed.add(code);
        }
        translatorCreditsBox.appendChild(translatorsList);  // Add all at once to only redraw the window the one time for this
        startScrolling();
    })
    .then(() => Flagfox.loadPageI18N(document))
    .then(() => {
        // Set the version numbers (must be done after I18N load and before resizing)
        document.getElementById("version").textContent += " " + Flagfox.getFullVersionsString();
    })
    .then(parent.onLightboxLoaded);

    disableContextMenu();

    addElementEventListener("header",      "click", (() => document.getElementById("link-flagfox-blog").click()));
    addElementEventListener("closeButton", "click", parent.closeLightbox);
});

//}}}
//BEGIN AUTOSCROLLING *********************************************************
//{{{

function startScrolling() {  // Set credits box to auto-scroll (1px/10ms == 100px/s)
    const startDelay = 1000;
    const scrollTick = 10;
    const scrollStep = 1;
    let lastPos = 0;
    let scrollInterval;
    const cancelScrolling = (() => clearInterval(scrollInterval));
    setTimeout(() => {
        scrollInterval = setInterval(() => {
            if ((translatorCreditsBox.scrollTop += scrollStep) !== (lastPos += scrollStep))
                cancelScrolling();  // Stop when done or user moves scroll bar manually
        }, scrollTick);
        window.addEventListener("click",    cancelScrolling, {once:true});  // Stop on any click
        window.addEventListener("keypress", cancelScrolling, {once:true});  // Stop on any keypress  // FIXME: iframe window not getting keyboard focus
    }, startDelay);
}

//}}}
