document.getElementById('lex-link-close').addEventListener('click', () => {
    window.close();
});

browser.storage.sync.get({
    "rulesAccepted": false
}, function (obj) {
    if (!obj.rulesAccepted) {
        for (var el of document.getElementsByTagName('button')) {
            el.setAttribute('disabled', 'disabled');
        }
    }
});