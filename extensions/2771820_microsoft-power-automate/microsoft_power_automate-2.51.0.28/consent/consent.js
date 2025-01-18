async function onAcceptClicked() {
    await chrome.storage.local.set({
        padConsentAccepted: !0
    }), window.close();
}

async function onDenyClicked() {
    await chrome.storage.local.set({
        padConsentAccepted: !1
    }), uninstall();
}

function uninstall() {
    confirm(chrome.i18n.getMessage("consentUninstall")) && chrome.management.uninstallSelf();
}

addEventListener("DOMContentLoaded", (ev => {
    const header = chrome.i18n.getMessage("consentHeader");
    document.title = header, document.getElementById("header").innerText = header, document.getElementById("question").innerText = chrome.i18n.getMessage("consentQuestion"), 
    document.getElementById("collectedData1").innerText = chrome.i18n.getMessage("consentCollectedData1"), 
    document.getElementById("paragraph1").innerText = chrome.i18n.getMessage("consentParagraph1");
    const privacyLink = document.getElementById("privacyLink");
    privacyLink.innerText = chrome.i18n.getMessage("consentPrivacyLink");
    const paragraph2 = document.getElementById("paragraph2");
    paragraph2.innerText = chrome.i18n.getMessage("consentParagraph2"), paragraph2.appendChild(privacyLink);
    const accept = document.getElementById("accept");
    accept.addEventListener("click", (async () => await onAcceptClicked())), accept.innerText = chrome.i18n.getMessage("consentAccept");
    const deny = document.getElementById("decline");
    deny.addEventListener("click", (() => onDenyClicked())), deny.innerText = chrome.i18n.getMessage("consentDecline");
}));