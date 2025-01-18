const defaultHost = 'https://passwork.me/';
let settingsId = 'passwordManager_extensionSettings';

document.addEventListener('DOMContentLoaded', function () {
    el('btnClose').addEventListener("click", closeIFrame);
    el('btnSave').addEventListener("click", saveSettings);
    getSettings(function (settings) {
        loadSettingsToForm(settings);
    });

    setLangText('hostName');
    setLangText('btnSave');
    setLangText('language');
    setLangText('settings');
});

function getSettings(cb) {
    _browser.storage.local.get(settingsId, function(result) {
        let settings = null;
        if (result && result[settingsId]) {
            settings = JSON.parse(result[settingsId]);
        }
        if (!settings) {
            settings = {
                host: defaultHost
            };
        }
        cb(settings)
    });
}

function loadSettingsToForm(settings) {
    el('settingsHost').value = settings.host;
    el('settingsLanguage').value = settings.language?settings.language:'en';
}

function saveSettings() {
    let settings = {};
    let host = el('settingsHost').value;
    if(host.indexOf('://') === -1) host = 'https://' + host;
    if(host.substr(-1,1) !== '/') host += '/';

    try {
        let urlVerify = host + 'extension/verify';
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", urlVerify);
        xmlHttp.send(null);
		xmlHttp.onerror = function (e) {
			alert('Host not resolved');
		};
        xmlHttp.onload = function (e) {
            let response = e.target.response;
            if (response.substr(0,8).toLowerCase() !== 'passwork') {
                alert(_browser.i18n.getMessage('notPasswork'));
            } else {
                settings.host = host;
                settings.language = el('settingsLanguage').value;
                let s = {};
                s[settingsId] = JSON.stringify(settings);
                _browser.storage.local.set(s, function() {
                    if(inIframe()) {
                        top.postMessage({action: "pw_saveSettings", data: settings}, '*');
                    } else {
                        window.close(); //not working in FF by default because security! //about:config -> dom.allow_scripts_to_close_windows -> true
                    }
                });
            }
        };

    } catch (err) {
        alert('Host not resolved');
    }
}