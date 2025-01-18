var M = new MegaData();
var pmdb = fmdb = currsn = false;
var $ = jQuery = {};
M.d = Object.create(null);
M.c = Object.create(null);
M.ciInflight = Object.create(null);

var u_type, u_storage, u_checked;
var login_next = false;
var loggedout = false;
var pminitialized = false;
var pmReady = false;
var pwmh = false;
var popupOpen = false;
var settingsOpen = false;
var avatars = Object.create(null);

// Promise.catch helper
function tell(ex) {
    'use strict';
    if (d) {
        console.error(ex);
    }

    chrome.runtime.sendMessage({type: 'tell', error: ex < 0 ? api_strerror(ex) : ex}).catch(nop);
}

lazy(mega, 'offscreen', () => {
    "use strict";

    return (async() => {

        if (!chrome.offscreen) {
            return false;
        }
        const offscreenUrl = chrome.runtime.getURL('/offscreen.html');
        const existingContexts = (await clients.matchAll()).some(context => context.url === offscreenUrl);

        if (existingContexts) {
            return true;
        }

        await chrome.offscreen.createDocument({
            url: offscreenUrl,
            reasons: ['WORKERS', 'CLIPBOARD'],
            justification: 'Create worker to process node decryption, handle clipboard ' +
                'and using match media to get browser theme'
        });

        return true;
    })();
});

/**
 * Generate a hash for site transfer from Extension to mega.io
 * @returns string - The hash for site transfer
 */
function siteTransferHash() {
    'use strict';

    return btoa(JSON.stringify([
        u_k, u_sid, 'propay_pwm', false
    ]));
}
