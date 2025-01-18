window.mega = window.mega || {};
window.mega.ui = window.mega.ui || {};
window.mega.ui.pm = window.mega.ui.pm || {
    send: message => {
        'use strict';

        // Extension may get updated or deleted lets skip.
        if (!chrome.runtime.id) {
            return false;
        }

        return chrome.runtime.sendMessage({type: 'alive'}).then(() => chrome.runtime.sendMessage(message)).catch(nop);
    }
};

var treatedInputs = new Set();
var specialWebsite = null;
var iconClasses = 'mega-pm-icon sprite-pm-ext-theme icon-pwm-extension';
var sid = false;
var idSelector = '[type="email"], [autocomplete="username"], [name*="email"], [name*="username"]';
idSelector = `${idSelector}, [name*="identifier"], [autocomplete="email"], [id="username"]`;
var passwordSelector = '[type="password"], [autocomplete="current-password"], [autocomplete="new-password"]';
passwordSelector += ', [placeholder="Password"], #password, [name="password"], [mega-pass-type="password"]';
var settings = {};
var font = new FontFace("pm-ext-mono", `url('${chrome.runtime.getURL('images/sprites/pm-ext-mono.woff2')}')`);
document.fonts.add(font);
var isIframe = window.top !== window.self && makeUUID();
/**
 * Initializes the extension by loading specific data and setting up observers when the window loads.
 */
var bootDone = async() => {
    "use strict";

    const fetchURL = chrome.runtime.getURL('autofill-website.json');

    const [, autofillData] = await Promise.all([
        mega.ui.pm.send({type: 'tldl'}).then((ptlds => {
            window.publicTLDs = new Set(ptlds);
        })),
        fetch(fetchURL).then(response => response.json())
    ]);

    specialWebsite = autofillData[location.hostname] || null;

    if (autofillData[location.hostname] === undefined) {
        const shortDomain = domainFromURL(location.hostname);
        const shortDomainWithTLD = domainFromURL(location.hostname, true);

        if (autofillData[shortDomain] && autofillData[shortDomain].wildcard) {
            specialWebsite = autofillData[shortDomain];
        }
        else if (autofillData[shortDomainWithTLD] && autofillData[shortDomainWithTLD].wildcard === 'sub') {
            for (const subdomain in autofillData[shortDomainWithTLD].subdomains) {
                if (location.origin.endsWith(`${subdomain}.${shortDomainWithTLD}`)) {
                    specialWebsite = autofillData[shortDomainWithTLD].subdomains[subdomain];
                    break;
                }
            }
        }
    }

    if ((!document.body || !document.body.offsetHeight && !document.body.offsetWidth) &&
        !(isIframe && specialWebsite && specialWebsite.crossdomainLoginFor)) {
        return;
    }

    // if it is manually registered selector using it instead of default
    if (specialWebsite) {
        if (specialWebsite.idSelector) {
            idSelector = specialWebsite.idSelector;
        }
        if (specialWebsite.passwordSelector) {
            passwordSelector = specialWebsite.passwordSelector;
        }
    }

    mBroadcaster.sendMessage('boot_done');

    await loadStorage;

    if (sid) {
        iconClasses = 'mega-pm-icon sprite-pm-ext-theme icon-pwm-extension';

        let delay = 1000;

        if (specialWebsite && specialWebsite.checkDelay) {
            ({checkDelay: delay} = specialWebsite);
        }

        setTimeout(() => {
            checkForPasswordField();
        }, delay);
    }

    if (specialWebsite) {
        if (specialWebsite.observerRequired) {
            observeNode(document.body);
        }
        if (specialWebsite.observerInitiator) {
            watchClick(specialWebsite.observerInitiator, specialWebsite.observerInitiatorWatcher);
        }
        if (specialWebsite.watchAllTime && typeof specialWebsite.watchAllTime === 'string') {
            observeNode(document.querySelector(specialWebsite.watchAllTime));
        }
        if (specialWebsite.watchEnterSubmit) {
            watchEnterSubmit();
        }
    }
};

// this is iframe, no load event
if (isIframe) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        bootDone();
    }
    else {
        document.addEventListener('DOMContentLoaded', bootDone);
    }
}
else {
    window.addEventListener('load', bootDone);
}

window.addEventListener('message', event => {

    "use strict";

    if (event.data && event.data.type === 'check_mega_pass_extension_installed') {
        window.postMessage({type: 'mega_pass_extension_installed', installed: true}, '*');
    }
});

var _check = () => {
    "use strict";

    if (!document.body || !document.body.offsetHeight) {
        return;
    }

    treatedInputs.clear();

    loadStorage.then(() => {
        if (specialWebsite && specialWebsite.observerRequired) {
            observeNode(document.body);
        }
    });
};
addPwmEvent(window, 'popstate', _check);
addPwmEvent(window, 'hashchange', _check);
addPwmEvent(window, 'pageshow', _check);

// if offscreen is not available, add some event listeners to help some features
mega.ui.pm.send({type: 'offscreen-available'}).then(res => {

    "use strict";

    // Seems like offscreen is not available.
    if (!res) {
        addPwmEvent(window, 'online', () => {
            mega.ui.pm.send({type: 'connection-on'});
        });

        addPwmEvent(window, 'offline', () => {
            mega.ui.pm.send({type: 'connection-off'});
        });
    }
});

query = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

if (query.addEventListener) {
    addPwmEvent(query, 'change', (e) => {
        "use strict";

        mega.ui.pm.send({type: 'change-icon-theme', theme: e.matches ? 'dark' : 'light'});
    });
}

chrome.runtime.onMessage.addListener((message, sender) => {
    "use strict";

    if (sender.id !== chrome.runtime.id || message.domain !== domainFromURL(location.origin, true)) {
        return;
    }

    if (message.type === 'tab-updated') {
        loadStorage.then(() => {
            checkForPasswordField();
        });
    }
    else {
        checkForPasswordField();
    }
});

function checkSavedCredentials() {
    "use strict";

    setTimeout(() => {
        checkForPasswordField();
    }, 1000);

    if (sid) {
        iconClasses = 'mega-pm-icon sprite-pm-ext-theme icon-pwm-extension';

        if (!settings.autosave) {
            return;
        }

        const msg = {type: 'check-saved-credentials'};

        if (specialWebsite && specialWebsite.crossdomainLogin) {
            msg.crossdomainLogin = specialWebsite.crossdomainLogin;
        }

        mega.ui.pm.send(msg).then(result => {
            const {
                id,
                password,
                pageTitle,
                pageUrl,
                updated,
                existingList
            } = result;

            // TODO: Need another think about that, as some website will reload sign-in page on submit
            /* if (!password || pageUrl.startsWith(`${location.origin}${location.pathname}`)) {
                mega.ui.pm.send({type: 'clear-saved-credentials'}).then(() => {
                    return false;
                });
                return false; // Most likely failed logged in
            }*/

            if ((id || password) && pageTitle && !window.frameElement) {
                renderSaveDialog(
                    {id, password},
                    {pageTitle, pageUrl},
                    updated,
                    existingList
                );
            }
        });
    }
}
lazy(window, 'loadStorage', () => {
    'use strict';
    return chrome.storage.local.get(['sid', 'settings']).then(result => {
        ({settings} = result);
        sid = !!result.sid;
        if (!isIframe) {
            if (lang_loaded) {
                checkSavedCredentials();
            }
            else {
                mBroadcaster.addListener('lang_loaded', () => {
                    checkSavedCredentials();
                });
            }
        }
    }).catch(nop);
});

function injectScriptToShadow(shadow) {

    "use strict";

    const styles = [
        'css/vars/theme.css',
        'css/sprites/pm-ext-mono@mono.css',
        'css/sprites/pm-ext-theme@dark.css',
        'css/sprites/pm-ext-theme@light.css',
        'css/fonts.css',
        'css/mega-inputs.css',
        'css/interactable.css',
        'css/general.css',
        'css/tabs.css',
        'css/spinners.css',
        'content/css/content.css',
        'webclient-subtree/css/vars/mobile-theme.css',
        'webclient-subtree/css/vars/mobile-theme-auto.css',
        'webclient-subtree/css/perfect-scrollbar.css'
    ];

    if (specialWebsite && specialWebsite.insertRawCSS) {
        // read css files from styles array and put it as style tag
        styles.forEach(css => {
            fetch(chrome.runtime.getURL(css)).then(response => response.text()).then(text => {

                const link = document.createElement('style');
                text = text.replace(/url\(("|')?\.\.\/\.\.\//g, `url($1${chrome.runtime.getURL('')}`);
                link.textContent += text;
                shadow.appendChild(link);
            });
        });

    }
    else {
        if (!window.assetHTML) {

            const _getlink = url => `<link rel="stylesheet" type="text/css" href="${chrome.runtime.getURL(url)}">`;
            window.assetHTML = '';
            styles.forEach(css => {
                window.assetHTML += _getlink(css);
            });
        }

        shadow.append(parseHTML(window.assetHTML));
    }
}
