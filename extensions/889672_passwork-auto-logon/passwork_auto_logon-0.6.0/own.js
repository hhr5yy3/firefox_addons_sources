;(function () {
    let _browser = chrome?chrome:browser;

    if(!window.passworkOwnScriptLoaded) {
        let id = _browser.runtime.id;
        window.addEventListener('message', function (e) {
            if(e.data.action && e.data.action.substr(0,3) === 'pw_'){
                if(e.data.action === 'pw_passworkLoaded') {
                    window.postMessage({action: 'pw_ownLoaded'}, location.origin);
                } else {
                    _browser.runtime.sendMessage(id, e.data);
                }
            }
        });
    }

    window.passworkOwnScriptLoaded = true;
})();