function _browser() {
    if (typeof window.browser !== 'undefined') {
        return window.browser;
    } else {
        return window.chrome;
    }
};

function yesClickHandler() {
    _browser().storage.local.get({usageCounter: 0, used: [], permittedToShowBanner: -1}, s => {
        s.permittedToShowBanner = 1;
        _browser().storage.local.set(s, () => {
            window.location = 'index.html';
        });
    });
}

function noClickHandler() {
    _browser().storage.local.get({usageCounter: 0, used: [], permittedToShowBanner: -1}, s => {
        s.permittedToShowBanner = 0;
        _browser().storage.local.set(s, () => {
            window.location = 'index.html';
        });
    });
}

document.getElementById('yesButton').addEventListener('click', target => {
    yesClickHandler();
});

document.getElementById('noButton').addEventListener('click', target => {
    noClickHandler();
});