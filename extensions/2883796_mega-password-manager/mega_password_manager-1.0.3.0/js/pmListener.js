/**
 * Listens for message from the popup and communicates
 * with the background scripts.
 *
 * @param {Object} request
 * @param {Object} sender
 * @param {Function} sendResponse
 *
 * @returns {Boolean | void}
 */
chrome.runtime.onConnect.addListener(async port => {
    'use strict';

    if (port.name === 'popup-opened' || port.name === 'settings-opened') {

        if (port.name === 'popup-opened') {
            popupOpen = true;
        }

        if (port.name === 'settings-opened') {
            settingsOpen = true;
        }

        // Immediately start with popup?
        if (!mega.pm.started) {
            await mega.pm.start();
        }

        if (u_attr) {
            await mega.pm.checkActiveSubscription();
        }

        M.onPmInit(() => {
            if (!waitsc.kas && !getsc.locked) {
                getsc(true);
            }
        });

        port.onDisconnect.addListener(() => {
            // we need to remove the sid from the local storage for when the popup is closed during
            // account suspension email verification flow
            chrome.storage.local.get('is_account_suspended').then(result => {
                if (result.is_account_suspended) {
                    chrome.storage.local.remove(['sid', 'is_account_suspended']);
                    u_sid = undefined;
                }
            });

            if (port.name === 'popup-opened') {
                popupOpen = false;

                if (!mega.pm.activePlan && validateUserStatus(true)) {
                    // fallback if the user closes the popup without clicking either buttons in
                    // the Free trial/standalone plan dialogs
                    u_logout(true);

                    // drop the db
                    if (pmdb && !pmdb.dropping) {
                        pmdb.dropping = true;
                        // drop the db
                        pmdb.drop();
                    }
                }
            }

            if (port.name === 'settings-opened') {
                settingsOpen = false;
            }

            if (!popupOpen && !settingsOpen) {
                getsc.stop(2);
            }
        });

        chrome.runtime.sendMessage({type: 'u_attr', u_attr});
        chrome.runtime.sendMessage({type: 'u_checked', u_checked});
    }
});

// DO NOT DEPRECIATED THIS, it is different from navigator.onLine,
// this is using for avoid double handling of online/offline
var isOffline = !navigator.onLine;
var successfulLoginRedirect = {};

// eslint-disable-next-line complexity
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    'use strict';

    // Reject all messages not coming from the extension
    if (sender.id !== chrome.runtime.id) {
        return false;
    }

    // Service worker seems killed or crashed, restarting
    if (!mega.pm.started || !u_attr) {
        mega.pm.start().then(() => {
            if (u_attr) {
                mega.pm.checkActiveSubscription();
            }
        });
    }

    // Function to make sure service worker is loaded when needed, for cover edge cases
    const _loadPM = async(cb) => {
        if (!waitsc.kas && !getsc.locked) {
            if (!currsn) {
                currsn = localStorage.sn;
            }

            getsc(true);
        }

        // popup is opened but service worker is not inited
        if (pminitialized) {
            cb();
        }
        else {
            M.onPmReady(() => mega.pm.loadVault().then(cb));
        }
    };

    if (request.type === 'login') {

        security.login.checkLoginMethod(
            request.email,
            request.password,
            request.twoFactorPin,
            request.rememberMe,
            signin.old.startLogin,
            signin.new.startLogin
        ).then(async result => {
            if (result >= 0) {
                // need to call this to setup pmdb on logout/login
                await mega.pm.start();
            }

            if (u_attr) {
                const res = await mega.pm.checkActiveSubscription();

                if (res === false) {
                    result = res;
                }
            }

            sendResponse(result);

            chrome.runtime.sendMessage({type: 'logged-in'}).catch(nop);
        });

        return true;
    }
    else if (request.type === 'load-vault') {
        M.onPmReady(() => mega.pm.loadVault().then(sendResponse));

        return true;
    }
    else if (request.type === 'create-item') {
        _loadPM(() => mega.pm.createItem(request[0], request[1], request[2])
            .then(sendResponse).catch(sendResponse));

        return true;
    }
    else if (request.type === 'update-item') {
        _loadPM(() =>
            mega.pm.updateItem(request[0], request[1])
                .then(sendResponse).catch(sendResponse));

        return true;
    }
    else if (request.type === 'delete-item') {
        _loadPM(() => mega.pm.deleteItem([request.handle])
            .then(sendResponse)
            .catch(ex => sendResponse(api_strerror(ex))));

        return true;
    }
    else if (request.type === 'delete-all') {
        _loadPM(() => mega.pm.deleteItem(Object.keys(M.c[pwmh] || []))
            .then(sendResponse)
            .catch(ex => sendResponse(api_strerror(ex))));

        return true;
    }
    else if (request.type === 'get-node-by-handle') {
        _loadPM(() => {
            sendResponse(M.getNodeByHandle(request.handle));
        });

        return true;
    }
    else if (request.type === 'get-node-by-url') {
        _loadPM(() => {
            sendResponse(Object.values(M.d).filter(item =>
                item.pwm && item.pwm.url && domainFromURL(item.pwm.url, true) === domainFromURL(sender.origin, true)
            ));
        });
        return true;
    }
    else if (request.type === 'save-credentials') {
        const domain = domainFromURL(sender.origin);
        const fullDomain = domainFromURL(sender.origin, true);

        const savedCredentials = localStorage.getItem('savedCredentials') || {};
        let currentDomainCredentials = savedCredentials[fullDomain] || {};
        currentDomainCredentials = {...currentDomainCredentials, ...request.payload};

        if (currentDomainCredentials.password && request.payload.submitted && request.payload.submitted === true) {
            _loadPM(() => {
                const pageTitle = domain.charAt(0).toUpperCase() + domain.slice(1);
                currentDomainCredentials.pageTitle = getDeduplicateName(pageTitle);
                currentDomainCredentials.pageUrl = sender.url;
                currentDomainCredentials.tabId = sender.tab.id;
                savedCredentials[fullDomain] = currentDomainCredentials;
                localStorage.setItem('savedCredentials', savedCredentials);
            });
        }
        else {
            if (currentDomainCredentials.submitted) {
                delete currentDomainCredentials.submitted;
            }
            if (!currentDomainCredentials.tabId) {
                currentDomainCredentials.tabId = sender.tab.id;
            }
            savedCredentials[fullDomain] = currentDomainCredentials;
            localStorage.setItem('savedCredentials', savedCredentials);
        }
    }
    else if (request.type === 'check-saved-credentials') {
        let domain = domainFromURL(sender.origin, true);

        if (request.crossdomainLogin) {
            domain = domainFromURL(request.crossdomainLogin, true);
        }

        const savedCredentials = localStorage.getItem('savedCredentials') || {};
        const selectedHandle = localStorage.getItem('selectedHandle') || {};

        // No need to continue if we don't have saved credentials for visited website
        if (!domain || !savedCredentials[domain]) {
            sendResponse({});
            return false;
        }

        // Return empty if not in the same tab as the one which saved the credentials
        if (!savedCredentials[domain].tabId || sender.tab.id !== savedCredentials[domain].tabId) {
            sendResponse({});
            return false;
        }

        // it seems like login redirection check is required, if it redirect to correct page, lets make submit true
        if (successfulLoginRedirect[sender.tab.id]) {
            if (successfulLoginRedirect[sender.tab.id].includes(getHostname(sender.origin))) {
                savedCredentials[domain].submitted = true;
            }

            delete successfulLoginRedirect[sender.tab.id];
        }

        const {id, password, submitted} = savedCredentials[domain];

        // Return empty if the data has just been capture, but submit button haven't been pressed
        if (!submitted) {
            sendResponse({});
            return false;
        }

        if (selectedHandle[sender.tab.id]) {
            _loadPM(() => {
                const node = Object.values(M.d).find(item => item.h === selectedHandle[sender.tab.id].h);
                const {u: oldId, pwd: oldPassword} = node.pwm;

                if (oldId === id && password === oldPassword) {
                    delete savedCredentials[domain];
                    delete selectedHandle[sender.tab.id];
                    localStorage.setItem('savedCredentials', savedCredentials);
                    localStorage.setItem('selectedHandle', selectedHandle);
                    sendResponse({});
                }

                if (oldId !== id) {
                    const existingList = Object.values(M.d).filter(item =>
                        item.pwm && item.pwm.url && domainFromURL(item.pwm.url, true) === domain
                    );
                    sendResponse({...savedCredentials[domain], existingList});
                    return true;
                }

                if (oldPassword !== password) {
                    const updated = Object.values(M.d).find(item =>
                        item.pwm && domainFromURL(item.pwm.url, true) === domain &&
                        item.h === selectedHandle[sender.tab.id].h &&
                        item.pwm.u === id && item.pwm.pwd !== password
                    ) || false;
                    sendResponse({...savedCredentials[domain], pageTitle: updated.name, updated});
                    return true;
                }
            });
        }

        if (savedCredentials[domain] && !savedCredentials[domain].pageTitle) {
            _loadPM(() => {
                const pageTitle = domain.charAt(0).toUpperCase() + domain.slice(1);
                savedCredentials[domain].pageTitle = getDeduplicateName(pageTitle);
                savedCredentials[domain].pageUrl = sender.url;
                savedCredentials[domain].tabId = sender.tab.id;

                sendResponse(savedCredentials[domain]);
            });

            return true;
        }

        sendResponse(savedCredentials[domain]);
    }
    else if (request.type === 'clear-saved-credentials') {
        let domain = domainFromURL(sender.origin, true);

        if (request.crossdomainLogin) {
            domain = domainFromURL(request.crossdomainLogin, true);
        }

        const savedCredentials = localStorage.getItem('savedCredentials') || {};
        const selectedHandle = localStorage.getItem('selectedHandle') || {};
        delete savedCredentials[domain];
        delete selectedHandle[sender.tab.id];
        localStorage.setItem('savedCredentials', savedCredentials);
        localStorage.setItem('selectedHandle', selectedHandle);
    }
    else if (request.type === 'check-login-redirect') {
        successfulLoginRedirect[sender.tab.id] = request.target;
    }
    else if (request.type === 'name-already-exist') {
        const selectedHandle = localStorage.getItem('selectedHandle') || {};
        let handle = selectedHandle[sender.tab.id] && selectedHandle[sender.tab.id].h;
        if (request.updated) {
            handle = request.updated.h;
        }
        const node = Object.values(M.d).find(item => item.name === request.name);

        if (node && handle !== node.h) {
            sendResponse(EEXIST);
            return false;
        }
    }
    else if (request.type === 'save-item-credentials') {
        const domain = domainFromURL(sender.origin, true);
        const savedCredentials = localStorage.getItem('savedCredentials') || {};
        const selectedHandle = localStorage.getItem('selectedHandle') || {};
        const {pwmh: target} = localStorage;
        let {pwd, u, url, name, updated} = request.formData;

        if (!pwd || !name) {
            return false;
        }

        name = getSafeName(name);

        _loadPM(() => {
            if (!updated) {
                const node = Object.values(M.d).find(item => item.name === name);
                if (node) {
                    sendResponse(EEXIST);
                    return false;
                }
            }

            if (updated && selectedHandle[sender.tab.id]) {
                const node = Object.values(M.d).find(item => item.name === name);

                if (node && updated.h !== node.h) {
                    sendResponse(EEXIST);
                    return false;
                }

                const n = {name, pwd, u, n: updated.pwm.n, url};

                mega.pm.updateItem(n, updated.h)
                    .then(() => {
                        delete selectedHandle[sender.tab.id];
                        delete savedCredentials[domain];
                        localStorage.setItem('selectedHandle', selectedHandle);
                        localStorage.setItem('savedCredentials', savedCredentials);
                        sendResponse();
                    }).catch(sendResponse);
            }
            else {
                const n = {name, pwm: {pwd, u, n: '', url}};

                mega.pm.createItem(n, name, target).then(() => {
                    delete savedCredentials[domain];
                    localStorage.setItem('savedCredentials', savedCredentials);
                    sendResponse();
                }).catch(sendResponse);
            }
        });

        return true;
    }
    else if (request.type === 'import') {
        _loadPM(() => {
            const {pwmh} = localStorage;
            const results = [];

            for (const entry of request.data) {
                entry.name = getDeduplicateName(entry.name);
                results.push(mega.pm.createItem(entry, entry.name, pwmh));
            }

            Promise.all(results).then(() => {
                sendResponse({status: 'done'});
            }).catch(sendResponse);
        });
        return true;
    }
    else if (request.type === 'export') {
        _loadPM(() => {

            const result = [];

            Object.keys(M.c[pwmh] || {}).forEach(handle => {
                const item = M.d[handle];

                if (item.pwm) {
                    result.push([item.name, item.pwm.url, item.pwm.u, item.pwm.pwd, item.pwm.n]);
                }
            });

            sendResponse(result);
        });
        return true;
    }
    else if (request.type === 'autocomplete-select') {
        const selectedHandle = localStorage.getItem('selectedHandle') || {};
        selectedHandle[sender.tab.id] = {origin: sender.origin, h: request.handle};
        localStorage.setItem('selectedHandle', selectedHandle);
    }
    else if (request.type === 'logout') {
        u_logout(1);
        chrome.runtime.sendMessage({type: 'logged-out'});
    }
    else if (request.type === 'connection-on' && isOffline) {
        isOffline = false;
        mBroadcaster.sendMessage('online');
        api.retry();
    }
    else if (request.type === 'connection-off' && !isOffline) {
        isOffline = true;
        mBroadcaster.sendMessage('offline');
    }
    else if (request.type === 'account-suspension-email-verification') {
        api.req({a: 'era'}).then(sendResponse).catch(sendResponse);
        return true;
    }
    else if (request.type === 'event-log') {
        api.req(request.req).catch(dump);
    }
    else if (request.type === 'get-user-avatar') {
        if (typeof u_handle === 'undefined') {
            return false;
        }

        Promise.resolve(useravatar.loadAvatar(u_handle)).catch(nop).finally(() =>
            sendResponse(generateAvatarMeta(u_handle)));
        return true;
    }
    else if (request.type === 'get-recovery-key') {
        sendResponse(a32_to_base64(u_k || ''));
    }
    else if (request.type === 'password-reminder') {
        // Derive the keys from the password
        security.getDerivedEncryptionKey(request.password)
            .then(derivedKey => sendResponse(checkMyPassword(derivedKey)))
            .catch(sendResponse);

        return true;
    }
    else if (request.type === 'change-icon-theme') {
        mega.pm.iconTheme = request.theme;
        mega.pm.setIcon();
    }
    else if (request.type === 'offscreen-available') {
        sendResponse(!!chrome.offscreen);
        return true;
    }
    else if (request.type === 'pm-reload') {
        M.reload();
    }
    else if (request.type === 'site-transfer-hash') {
        sendResponse(siteTransferHash());

        return true;
    }
    else if (request.type === 'tldl') {
        mega.pm.loadTLDs.then(() => sendResponse(Array.from(publicTLDs)));

        return true;
    }
    // Firefox clipbard handling
    else if (request.type === 'clipboard' && !chrome.offscreen && typeof document !== 'undefined') {
        if (typeof request.data !== 'string') {
            sendResponse({error: `Value provided must be a 'string', got '${typeof request.data}'.`});
        }

        navigator.clipboard.writeText(request.data);

        if (localStorage.settings.clipboard) {
            setTimeout(() => {
                navigator.clipboard.writeText('');
            }, localStorage.settings.clipboard * 1000);
        }

        sendResponse({success: true});
    }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    "use strict";

    if (namespace === 'local' && changes.sid) {
        mega.pm.setIcon();
    }
});

// Immediately start the background process when the extension is installed or browser is started.
chrome.runtime.onInstalled.addListener(mega.pm.start);
chrome.runtime.onStartup.addListener(mega.pm.start);

chrome.tabs.onRemoved.addListener((tabId) => {
    "use strict";

    chrome.storage.local.get('savedCredentials', ({savedCredentials}) => {
        for (const domain in savedCredentials) {
            if (savedCredentials[domain].tabId === tabId) {
                delete savedCredentials[domain];
                chrome.storage.local.set({savedCredentials});
            }
        }
    });

    chrome.storage.local.get('selectedHandle', ({selectedHandle}) => {
        if (selectedHandle && selectedHandle[tabId]) {
            delete selectedHandle[tabId];
            chrome.storage.local.set({selectedHandle});
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    "use strict";

    if (!changeInfo.status || changeInfo.status !== 'complete') {
        return;
    }

    const findObjectByTabId = (savedCredentials, tabId) => {
        for (const [domain, obj] of Object.entries(savedCredentials)) {
            if (obj.tabId === tabId) {
                return domain;
            }
        }
        return null;
    };

    chrome.storage.local.get('savedCredentials', savedCredentials => {
        if (savedCredentials) {
            const domain = findObjectByTabId(savedCredentials, tabId);
            if (domain) {
                // Send a message to the content script if tabId is found
                chrome.tabs.sendMessage(tabId, {type: "tab-updated", domain});
            }
        }
    });
});

chrome.runtime.onInstalled.addListener(() => {
    "use strict";

    chrome.storage.local.get('settings').then(({settings}) => {
        if (typeof settings !== 'object') {
            settings = {};
        }

        if (typeof settings.autofill !== 'boolean') {
            settings.autofill = true;
        }

        if (typeof settings.autosave !== 'boolean') {
            settings.autosave = true;
        }

        if (typeof settings.clipboard !== 'string') {
            settings.clipboard = '30';
        }

        chrome.storage.local.set({settings});
    });
});
