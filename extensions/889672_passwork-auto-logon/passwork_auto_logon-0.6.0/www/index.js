;(function () {
    let _browser;
    if(chrome) {
        _browser = chrome;
    } else {
        _browser = browser;
    }
    var query = { active: true, currentWindow: true };
    _browser.tabs.query(query, requestOpen); //opens iFrame on ext icon click

    setTimeout(function () {
        window.close();
    });
    function requestOpen(tabs) {
        _browser.runtime.sendMessage({action: 'pw_popupButtonClicked', tabId: tabs[0].id});
    }
})();