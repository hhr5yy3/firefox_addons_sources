/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL License
 *
 * Copyright (c) 2018 Diego Casorran
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/
 *
 * Contributor(s):
 *   Diego Casorran <dcasorran[a]gmail.com> (Original Author)
 *
 * ***** END LICENSE BLOCK ***** */

"use strict";

const man = browser.runtime.getManifest();
const appname = man.name + ' ' + man.version;
const actions = Object.create(null);

const addMenuItem = (id, title, options) => {
    browser.menus.create(Object.assign({
        id: id,
        title: title,
        contexts: ["browser_action"],
        icons: {
            "16": "icon-16.png",
            "32": "icon-32.png",
            "64": "icon-64.png"
        }
    }, options));

    actions[id] = 1;
};

const notify = message => {
    browser.notifications.create({
        "type": "basic",
        "title": appname,
        "message": message,
        "iconUrl": browser.extension.getURL("icon-64.png")
      });

    console.error(appname + ' notification shown:\n> ' + String(message).split('\n').join('\n> '));
};

const onError = e => notify('Something went wrong, sorry about that!\n\n' + e);

const executeScript = (action, tabId) => {
    browser.tabs.executeScript({file: '/content.js'})
        .then(_ => browser.tabs.sendMessage(tabId, {action: action}))
        .then(_ => {
            if (_.success !== action) {
                throw _.error;
            }
            else if (_.message) {
                notify(_.message);
            }
        })
        .catch(onError);
};

addMenuItem('area-to-printer', 'Capture Area to Printer (default)'); // former LMB
addMenuItem('whole-page-to-clipboard', 'Capture Whole Page to Clipboard.'); // former MMB
addMenuItem('visible-page-to-clipboard', 'Capture Visible Area to Clipboard.') // former RMB

browser.runtime.onMessage.addListener(cmd => {
    // console.log('Message from content script.', cmd);

    if (cmd.error) {
        onError(cmd.error);
    }
    else if (cmd.setImageData) {
        const reader = new FileReader();
        reader.onloadend = _ => {
            browser.clipboard.setImageData(reader.result, 'png')
                .then(notify.bind(null, 'Captured area is now on the clipboard.'))
                .catch(onError);
        };
        reader.readAsArrayBuffer(cmd.setImageData);
    }
    else if (cmd.print) {
        browser.tabs.printPreview()
            .then(_ => console.log(_))
            .catch(onError);
    }
    else {
        notify(cmd.message || cmd);
    }
});

browser.menus.onClicked.addListener((info, tab) => {
    actions[info.menuItemId] && executeScript(info.menuItemId, tab.id);
});

browser.browserAction.onClicked.addListener(_ => {
    browser.tabs.query({active:true,currentWindow:true}).then(tabs => executeScript('area-to-printer', tabs[0].id)).catch(onError);
});

browser.browserAction.setTitle({title: appname});
