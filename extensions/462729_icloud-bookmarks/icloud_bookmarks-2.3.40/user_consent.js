/*
 * (C) Copyright 2012-2014 Apple Inc
 */

function onLoad() {
    let element = document.getElementById("divMessageBoardTitle");
    if (element) {
        element.innerHTML = browser.i18n.getMessage('userConsentTitle');
    }

    element = document.getElementById("allowConsentButton");
    if (element) {
        element.innerHTML = browser.i18n.getMessage('userConsentAllowButton');
    }

    element = document.getElementById("denyConsentButton");
    if (element) {
        element.innerHTML = browser.i18n.getMessage('userConsentDenyButton');
    }

    document.getElementById("allowConsentButton").onclick = function (event) {
        let bgPage = browser.extension.getBackgroundPage();
        bgPage.userAgreedToDataCollection();
        window.close();
    }

    document.getElementById("denyConsentButton").onclick = function (event) {
        showUninstallMessage();
    }

    element = document.getElementById("uninstallButton");
    if (element) {
        element.innerHTML = browser.i18n.getMessage('uninstallButton');
    }

    element = document.getElementById("displayConsentButton");
    if (element) {
        element.innerHTML = browser.i18n.getMessage('displayConsentButton');
    }

    document.getElementById("uninstallButton").onclick = function (event) {
        browser.management.uninstallSelf();
    }

    document.getElementById("displayConsentButton").onclick = function (event) {
        showConsentMessage();
    }

    let messageBoard = document.getElementById("divMessageBoard");
    messageBoard.style.display = "block";
    messageBoard.classList.add("logo-is-present");

    showConsentMessage()
}

function showConsentMessage() {
    let element = document.getElementById("divMessageBoardMessage");
    if (element) {
        element.innerHTML = browser.i18n.getMessage('userConsentMessage');
    }

    element = document.getElementById("divUninstallButtons");
    if (element) {
        element.style.display = "none";
    }

    element = document.getElementById("divConsentButtons");
    if (element) {
        element.style.display = "block";
    }
}

function showUninstallMessage() {
    let element = document.getElementById("divMessageBoardMessage");
    if (element) {
        element.innerHTML = browser.i18n.getMessage('uninstallMessage');
    }

    element = document.getElementById("divConsentButtons");
    if (element) {
        element.style.display = "none";
    }

    element = document.getElementById("divUninstallButtons");
    if (element) {
        element.style.display = "block";
    }
}

window.addEventListener('load', function () { onLoad(); });
