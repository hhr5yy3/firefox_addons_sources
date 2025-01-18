mBroadcaster.once('boot_done', () => {
    M.reset();

    mega.offscreen.then(res => {

        if (mega.pm.iconTheme) {
            mega.pm.setIcon();
        }
        else if (typeof document !== 'undefined') {
            var matchMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mega.pm.iconTheme = matchMediaQuery.matches ? 'dark' : 'light';
            mega.pm.setIcon();
        }
        else if (res) {
            chrome.runtime.sendMessage({type: 'clipboard-time', value: localStorage.settings.clipboard});
            chrome.runtime.sendMessage({type: 'detect-icon-theme'});
        }
    });
});

var bootDone = async() => {

    this.pwmh = localStorage.pwmh;
    this.u_sid = localStorage.sid;
    this.d = localStorage.d;
    this.apipath = localStorage.apipath || 'https://g.api.mega.co.nz/';

    if (mega.getRandomValues.strong) {
        if (d > 1) {
            console.log("Initially seeding PRNG with strong random values");
        }
        asmCrypto.random.seed(mega.getRandomValues(384));
    }

    // If this restarting is due to reloading account, try fetch account data immidiately
    if (localStorage.reloaded) {
        delete localStorage.reloaded;

        await M.onPmReady(() => mega.pm.loadVault());

        // Lets return to settings page
        chrome.tabs.create({url: chrome.runtime.getURL('settings/settings.html')});
    }

    mBroadcaster.sendMessage('boot_done');
};

if (storageReady) {
    bootDone();
}
else {
    mBroadcaster.addListener('storageReady', bootDone);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    // Reject all messages not coming from the extension
    if (sender.id !== chrome.runtime.id) {
        return false;
    }

    if (message.type === 'alive') {

        if (storageReady) {
            return;
        }

        mBroadcaster.addListener('boot_done', sendResponse);

        return true;
    }
});
