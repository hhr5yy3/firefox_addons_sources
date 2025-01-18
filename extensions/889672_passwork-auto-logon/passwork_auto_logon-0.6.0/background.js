;(function () {
    let __debug = true;
    const settingsId = 'passwordManager_extensionSettings';
    const defaultHost = 'https://passwork.me/';
	let autoLoginTabId = null;
	let autoLoginPassword = null;
    let _browser = chrome?chrome:browser;
    let log;

    if(!__debug) {
        log = function () {};
    } else {
        if(_browser.extension) {
            log = _browser.extension.getBackgroundPage().console.log;
        } else {
            log = console.log;
        }
    }

    _browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status === 'loading') {
            iconDisabled(tabId);
            return;
        }
        if (changeInfo.status === 'complete') {
            isOwnDomain(tab.url, function (own) {
                if(!own) {
                    _browser.tabs.executeScript(tab.id, {file: "content.js", allFrames: true}, function () {
                        let req = {action: 'pw_onUpdated'};
                        if(autoLoginPassword && autoLoginTabId == tab.id){
                            req.data = autoLoginPassword;
                            autoLoginTabId = null;
                            autoLoginPassword = null;
                        }

                        _browser.tabs.sendMessage(tab.id, req);
                        if(_browser.runtime.lastError) {
                            log('new tab workaround');
                        }
                    });
                } else {
                    _browser.tabs.executeScript(tab.id, { file: "own.js", allFrames: true}, function() {});
                }
            });
        }
    });

    function iconEnabled(tabId) {
        _browser.browserAction.setIcon({
            path: "icon.png",
            tabId: tabId
        });
    }

    function iconDisabled(tabId) {
        _browser.browserAction.setIcon({
            path: "icon-disabled.png",
            tabId: tabId
        });
    }

    _browser.tabs.onCreated.addListener(function (tab) {
        iconDisabled(tab.id);
        isOwnDomain(tab.url, function (own) {
            if(!own) {
                _browser.tabs.executeScript(tab.id, { file: "content.js", allFrames: true}, function() {
                    _browser.tabs.sendMessage(tab.id, {action: 'pw_onCreated'});
                    if(_browser.runtime.lastError) {
                        log('new tab workaround');
                    }
                });
            } else {
                _browser.tabs.executeScript(tab.id, { file: "own.js", allFrames: true}, function() {});
            }
        });

    });

    _browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if(request.action === 'pw_popupButtonClicked'){
            _browser.tabs.sendMessage(request.tabId, {action: request.action});
            sendResponse({response: true});
        }
    });

    _browser.runtime.onInstalled.addListener(function (details) {
        log(details);
        _browser.tabs.query({}, function(tabs) {
            tabs.map(function (tab) {
                iconDisabled(tab.id);
                log(tab);
                if(tab.url.indexOf('chrome://') === 0) return;
                isOwnDomain(tab.url, function (own) {
                    if(!own) {
                        _browser.tabs.executeScript(tab.id, {file: "content.js", allFrames: true}, function () {
                            _browser.tabs.sendMessage(tab.id, {action: 'pw_onInstalled'}, function (response) {
                            });
                        });
                    } else {
                        _browser.tabs.executeScript(tab.id, { file: "own.js", allFrames: true}, function() {});
                    }
                });
            });
        });
    });

	function deleteCookies(domain, cb){
		_browser.cookies.getAll({domain: domain}, function(cookies) {
			for(let i = 0; i < cookies.length; i++) {
				_browser.cookies.remove({url: "http://" + domain + '/' + cookies[i].path, name: cookies[i].name});
				_browser.cookies.remove({url: "https://" + domain + '/' + cookies[i].path, name: cookies[i].name});
			}

			cb && cb();
		});
	}

    function getFullDomain(url) {
        if(!url) return false;
        let _url;
        try {
            _url = new URL(url);
        } catch (e)
        {
            return false;
        }

        let hostname = _url.hostname;
        return hostname;
    }

    function isOwnDomain(url, callback) {
        _browser.storage.local.get(settingsId, function(result) {
            let settings= {};
            if(result && result[settingsId]){
                settings = JSON.parse(result[settingsId]);
            }
            let settingsDomain = getFullDomain(settings.host);
            let thisDomain = getFullDomain(url);
            callback(settingsDomain === thisDomain);
        });
    }

    function isFF() {
        return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    }
    
    let pageContext = ["page", "editable"];
	if(isFF()) {
	    pageContext.push('password');
    }
    _browser.contextMenus.create({
        title: lang('getPasswords'),
        contexts: pageContext,
        onclick: function (info, tab) {
            _browser.tabs.sendMessage(tab.id, {action: 'pw_contextMenuExec'});
        },
    });


    _browser.contextMenus.create({
        title: lang('settings'),
        contexts:["browser_action"],
        onclick: function (info, tab) {
            log('settings');
            _browser.tabs.sendMessage(tab.id, {action: 'pw_showSettings'});
            isOwnDomain(tab.url, function (own) {
                if(own) {
                    showSettingsTab();
                }
            });
            _browser.tabs.query({
                active: true,
                lastFocusedWindow: true
            }, function(tabs) {
                let tab = tabs[0];
                if(tab.url.substr(0,4) !== 'http') {
                    showSettingsTab();
                }
            });
        },
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

    function checkAuth(cb) {
        getSettings(function (settings) {
            let url = settings.host + 'extension/isAuthorized';
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url);
            xmlHttp.send(null);
            xmlHttp.onload = function (e) {
                let response = e.target.response;
                log('isauth', response);
                cb(response === "true")
            };
        });
    }


    function showSettingsTab() {
        let newURL = _browser.runtime.getURL('www/settings.html');
        _browser.tabs.create({ url: newURL });
    }

    function updateLogonContextMenu() {
        checkAuth(function (isAuth) {
            _browser.contextMenus.update('login-menu-item', {
                title: isAuth? lang('btnLogout'): lang('login')
            });
        });
    }

    checkAuth(function (isAuth) {
        _browser.contextMenus.create({
            id: 'login-menu-item',
            title: isAuth? lang('btnLogout'): lang('login'),
            contexts:["browser_action"],
            onclick: function (info, tab) {
                log('logout');
                _browser.tabs.sendMessage(tab.id, {action: 'pw_logout'});
            },
        });
    });


    _browser.contextMenus.create({
        title: lang('lock'),
        contexts:["browser_action"],
        onclick: function (info, tab) {
            log('lock');
            _browser.tabs.sendMessage(tab.id, {action: 'pw_lock'});
        },
    });


    function getHost(url) {
        return url.split( '/' )[2];
    }

    try { //firefox is not working without this
        chrome.extension.onMessage.addListener(listener);
    } catch (e) {}
    try {
        browser.runtime.onMessage.addListener(listener);
    } catch (e) {}

    function listener(request, sender, sendResponse){
        if(request.action === 'pw_contentLoaded') {
            if(sender && sender.tab) iconEnabled(sender.tab.id);
            return;
        }
        if(request.action === 'pw_deleteCookies'){
            deleteCookies(request.domain, sendResponse);
            return;
        }
        if(request.action === 'pw_autoLogin'){
            autoLoginPassword = request.password;
            autoLoginTabId = sender.tab.id;
            return;
        }
        if(request.action === 'pw_processUrl'){
            deleteCookies(getHost(request.url), function () {
                _browser.tabs.create({ url: request.url }, function (tab) {
                    delete request.action;
                    autoLoginPassword = request;
                    autoLoginTabId = tab.id;
                });
            });
        }
        if(request.action === 'pw_updateMenu') {
            updateLogonContextMenu();
        }
        if(sender && sender.tab) {
            _browser.tabs.sendMessage(sender.tab.id, request);
        }
    }

    function lang(code) {
        return _browser.i18n.getMessage(code);
    }
})();