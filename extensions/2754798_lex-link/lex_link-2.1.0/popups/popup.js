'use strict';

var currentPage;
var automaticScan;
var tabId;

document.getElementById('analyze-page').addEventListener('click', () => {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'link' }, function (response) { });
    });

    window.close();
});

document.getElementById('show-content').addEventListener('click', () => {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, { from: 'popup', subject: 'get-content' }, function (response) {
            let textarea = document.getElementById('data-to-send');
            textarea.innerHTML = response.content;
        });
    });

    toggleVisibility(document.getElementById('data-to-send'));
});

document.getElementById('toggle-rules-view').addEventListener('click', () => {
    const url = "https://pomoc.wolterskluwer.pl/regulamin-lex-link/";
    browser.tabs.create({ url: url });
}); 

document.getElementById('accept-rules').addEventListener('change', (event) => {
    UpdateRulesAccepted(event.target.checked);
});

function UpdateRulesAccepted(accepted) {
    let button = document.getElementById('analyze-page');
    if (accepted) {
        button.removeAttribute('disabled');
        document.getElementById('add-to-automatic-scan').removeAttribute('disabled');
    }
    else {
        button.setAttribute('disabled', 'disabled');
        document.getElementById('add-to-automatic-scan').setAttribute('disabled', 'disabled');
    }

    browser.storage.sync.set({ "rulesAccepted": accepted });

    browser.contextMenus.update(
        'LexLinkSearchForLinks',
        { 'enabled': accepted }
    );
}

document.getElementById('add-to-automatic-scan').addEventListener('change', (event) => {
    if (event.target.checked) {
        if (!automaticScan.includes(currentPage)) {
            automaticScan = automaticScan + ';' + currentPage;
        }
    }
    else {
        automaticScan = automaticScan.replace(currentPage, '').replace(';;', ';');
    }

    browser.storage.sync.set({
        automaticScan: automaticScan
    });
});

browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentTab = tabs[0];
    let url = currentTab.url;
    var arr = url.split('/');
    url = arr[0] + '//' + arr[2];
    currentPage = url;
    tabId = currentTab.id;
});

function toggleVisibility(element) {
    if (element.style.display === 'block') {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
}

function read (name, deflt) {
    return browser.storage.sync.get([name])
        .then(result => {
            if (browser.runtime.lastError) { // assuming this exists
                throw new Error(browser.runtime.lastError);
            }

            return result[name] || deflt
        })
}

read('rulesAccepted', false).then(function (result) {
    let checkbox = document.getElementById('accept-rules');
    checkbox.checked = result;
    UpdateRulesAccepted(result);
});

read('automaticScan', '').then(function (automaticScanOption) {
    let automaticScanCheckbox = document.getElementById('add-to-automatic-scan');
    if (currentPage.startsWith('browser')) {
        automaticScanCheckbox.setAttribute('disabled', 'disabled');
    } else {
        automaticScanCheckbox.checked = automaticScanOption.includes(currentPage);
    }

    automaticScan = automaticScanOption;
});

