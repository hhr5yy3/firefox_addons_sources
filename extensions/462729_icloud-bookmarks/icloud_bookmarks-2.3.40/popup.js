/*
 * (C) Copyright 2012-2014 Apple Inc
 */

function updatePopup() {
    var bgPage = browser.extension.getBackgroundPage();
    var downloadPage = document.getElementById('downloadPage');
    var signinPage = document.getElementById('signinPage');
    let userConsentPage = document.getElementById('userConsentPage');

    if (bgPage.needUserConsent) {
        if (signinPage) {
            signinPage.style.display = 'none';
        }
        if (downloadPage) {
            downloadPage.style.display = 'none';
        }
        if (userConsentPage) {
            userConsentPage.style.display = 'block';
        }
        return;
    }

    userConsentPage.style.display = 'none';

    switch (bgPage.iCPState) {
        case 0: // Not installed.
            if (signinPage)
                signinPage.style.display = 'none';
            if (downloadPage)
                downloadPage.style.display = 'block';
            break;

        case 1: // Installed but not logged in.
            if (downloadPage)
                downloadPage.style.display = 'none';
            if (signinPage) {
                signinPage.style.display = 'block';
                var message = document.getElementById('signinMessage');
                if (message) {
                    message.textContent = chrome.i18n.getMessage('enableBookmarksMessage');
                }
            }
            break;

        case 2: // Logged in.
        default:
            if (downloadPage)
                downloadPage.style.display = 'none';
            if (signinPage) {
                signinPage.style.display = 'block';
                var message = document.getElementById('signinMessage');
                if (message)
                    message.textContent = browser.i18n.getMessage('syncedMessage');
            }
            break;
    }
}

function loadPopup() {
    var bgPage = browser.extension.getBackgroundPage();
    var downloadPage = document.getElementById('downloadPage');
    var signinPage = document.getElementById('signinPage');
    let userConsentPage = document.getElementById('userConsentPage');

    if (downloadPage) {
        var message = document.getElementById('downloadMessage');
        if (message)
            message.textContent = browser.i18n.getMessage('downloadMessage');

        var button = document.getElementById('downloadButton');
        if (button) {
            button.textContent = browser.i18n.getMessage('downloadButton');
            button.addEventListener("click", function (_event) {
                var href = this.href;
                browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    if (tabs && tabs[0])
                        browser.tabs.update(tabs[0].id, { url: href });
                    window.close();
                });
            });
        }
    }
    if (signinPage) {
        var message = document.getElementById('signinMessage');
        if (message)
            message.textContent = browser.i18n.getMessage('signinMessage');

        var button = document.getElementById('signinButton');
        if (button) {
            var port = bgPage.port;
            button.textContent = browser.i18n.getMessage('signinButton');
            button.addEventListener("click", function (_event) {
                try {
                    var cmd = { cmd: bgPage.CmdLaunchiCP };
                    port.postMessage(cmd);
                }
                catch (e) {
                }
                window.close();
            });
        }
    }

    if (userConsentPage) {
        let element = document.getElementById("showUserConsentMessage");
        if (element) {
            element.textContent = browser.i18n.getMessage('showUserConsentMessage');
        }

        element = document.getElementById("showUserConsentButton");
        if (element) {
            element.textContent = browser.i18n.getMessage('showUserConsentButton');

            element.addEventListener("click", function (_event) {
                var href = this.href;
                browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    if (tabs && tabs[0])
                        browser.tabs.update(tabs[0].id, { url: href });
                    window.close();
                });
            });
        }
    }

    var dismissButton = document.getElementById('dismiss');
    if (dismissButton)
        dismissButton.addEventListener("click", function () { window.close(); });

    updatePopup();
    document.body.classList.remove("loading");
}

window.addEventListener('load', function () { loadPopup(); });
