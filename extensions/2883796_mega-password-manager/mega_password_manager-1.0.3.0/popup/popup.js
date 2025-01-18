// cache mainlayout
window.mainlayout = window.mainlayout || document.getElementById('.mainlayout');

var POPUP_WIDTH = window.innerWidth;
var POPUP_HEIGHT = window.innerHeight;
var POPUP_SIDE_MARGIN = 24;
var POPUP_TOP_MARGIN = 24;
var dlID = false;

/**
 * Set the user session id retrived from the chrome local storage.
 */
chrome.storage.local.get(['sid', 'settings']).then(result => {
    'use strict';
    window.u_sid = result.sid;
    window.settings = result.settings;
    mBroadcaster.sendMessage('boot_done');
});

// Set System default theme
mega.ui.setTheme();

mega.controller = new MegaController();

mBroadcaster.addListener('lang_loaded', async() => {
    "use strict";

    MegaHeader.init();
    MegaBanner.init();

    const _online = () => {
        mega.ui.alerts.hideSlots();

        // If offscreen is not available, online states should rely on popups/contents
        if (!chrome.offscreen) {
            mega.ui.pm.send({type: 'connection-on'});
        }
    };

    const _offline = () => {
        mega.ui.banner.show('', l.no_internet, '', 'error', false, true, true);

        // If offscreen is not available, online states should rely on popups/contents
        if (!chrome.offscreen) {
            mega.ui.pm.send({type: 'connection-off'});
        }
    };

    if (navigator.onLine) {
        _online();
    }
    else {
        _offline();
    }

    window.addEventListener('online', _online);
    window.addEventListener('offline', _offline);

    publicTLDs = new Set(await mega.ui.pm.send({type: 'tldl'}));

    if (u_sid) {
        pushHistoryState('list');
        return;
    }

    pushHistoryState('login');
    mega.ui.pm.send({type: 'detect-icon-theme'});
});

/**
 * Listens for any changes to the storage area.
 */
chrome.storage.onChanged.addListener(changes => {
    "use strict";

    // if an action packet is received, then reload the list
    if (changes.addedNode && changes.addedNode.newValue
        || changes.updatedNode && changes.updatedNode.newValue
        || changes.deletedNode && changes.deletedNode.newValue) {
        delay('loadList', () => {
            mega.ui.pm.list.loadList();
        }, 200);

        // TODO: use handles[] value to optimise list update instead of full list refresh
        chrome.storage.local.remove(['addedNode', 'updatedNode', 'deletedNode']);
    }
    else if (changes.sid) {
        if (changes.sid.newValue) {
            u_sid = changes.sid.newValue;
        }
        else {
            u_sid = undefined;
        }
    }
});

chrome.downloads.onChanged.addListener(delta => {
    'use strict';

    if (delta.state && delta.state.current === "complete"
        && delta.id === dlID) {
        mBroadcaster.sendMessage('download_complete');
        dlID = false;
    }
});

function tell(ex) {
    'use strict';
    if (d) {
        console.error(ex);
    }

    msgDialog('warninga', l.unsuccessful_action, l.request_failed,
              `${l.error_code}: ${ex}`);
}

var keepAliveInterval;

mBroadcaster.once('boot_done', () => {
    "use strict";
    // Send message to the service worker to keep it alive every 10 seconds.
    keepAliveInterval = setInterval(() => {
        mega.ui.pm.send('keep_alive');
    }, 10000);
});

// When popup is closed, clear the interval.
window.addEventListener('unload', () => {
    'use strict';

    if (keepAliveInterval) {
        clearInterval(keepAliveInterval);
    }
    mega.ui.pm.send({type: 'popup-close'});

    chrome.storage.local.get('is_account_suspended').then(result => {
        if (result.is_account_suspended) {
            chrome.storage.local.remove(['sid', 'is_account_suspended']);
            u_sid = undefined;
        }
    });
});
