if (typeof browser === "undefined") {
    var browser = chrome;
}

$(function() {
    $("#openSettings").on("click", function(event) {
        var settingsUrl = browser.runtime.getURL("settings.html");
        browser.tabs.query({
            url: settingsUrl
        }, function(tabs) {
            tabs.length ? browser.tabs.update(tabs[0].id, {
                active: true
            }) : browser.tabs.create({
                url: settingsUrl
            })
        }), event.preventDefault()
    })
});
class Popup {
    constructor() {
        this.openSettings = $(".settings-button");
        this.run();
    }
    run() {
        this.initializeGoogleTranslateIframe();
        this.initializeListeners();
    }
    initializeGoogleTranslateIframe() {
        const loaderAnimation = document.querySelector(".loader-animation");
        const iframe = this.initializeIframe(loaderAnimation);
        setTimeout(() => {
            loaderAnimation.insertAdjacentElement("afterend", iframe);
        }, 100);
    }
    initializeListeners() {
        this.initializeDOMListeners();
    }
    initializeDOMListeners() {
        this.openSettings.on("click", this.handleSettingsClick);
    }
    initializeIframe(loaderAnimation) {
        const iframeElement = document.createElement("iframe");
        iframeElement.className = "translator-hidden";
        iframeElement.src = "https://translate.google.com/";
        iframeElement.addEventListener("load", () => {
            this.hideElement(loaderAnimation);
            this.showElement(iframeElement);
        });
        return iframeElement;
    }
    showElement(element) {
        element.classList.remove("translator-hidden");
    }
    hideElement(element) {
        element.classList.add("translator-hidden");
    }
    handleSettingsClick() {
        const settingsPageUrl = browser.runtime.getURL("settings.html");
        browser.tabs.create({
            url: settingsPageUrl
        });
    }
}
// const popup = new Popup;
// browser.windows.create({
//     url: "https://translate.google.com",
//     type: "popup"
// });
function showSettingsPage() {
    const settingsPageUrl = browser.runtime.getURL("settings.html");
    browser.tabs.query({
        currentWindow: true
    }, tabs => {
        let isPageOpen = false,
            pageTabId = null;
        tabs.forEach(tab => {
            if(tab.url === settingsPageUrl) {
                isPageOpen = true; 
                pageTabId = tab.id;
            }
        });
        isPageOpen ? browser.tabs.update(pageTabId, {highlighted: true}) : browser.tabs.create({url: settingsPageUrl});
    });
}
showSettingsPage();
