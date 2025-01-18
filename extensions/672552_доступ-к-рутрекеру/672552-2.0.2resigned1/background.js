
(function() {

    var version = browser.runtime.getManifest().version;
    var proxyScriptURL = 'pac.js';
    var actualVersion = version;
    var isControllableSettings = false;
    var isEnabled = true;
    var validateDelay = 20000; //TODO: decrease after isControllableProxySettings() implementation
    var validateInterval;

    // Default proxy
    var proxy = {
        protocol: 'https',
        host: 'rtk1.pass.xzvpn.net',
        port: 443
    };

    function processPlugin(forceReload) {
        if (isEnabled) {
            var isControllableSettingsRuntime = isControllableProxySettings();

            if (forceReload || isControllableSettingsRuntime !== isControllableSettings) {
                isControllableSettings = isControllableSettingsRuntime;
                validatePopupIfOpened();
                processIcon();

                if (isControllableSettings) {
                    processProxy();
                }
            }
        }
        else {
            processIcon();
            clearProxy();
        }
    }

    function processProxy() {
        // Download remote configuration
        XHR({
            url: "https://rtk.rmcontrol.net",
            timeout: 2000,
            data: {
                api_version: 2,
                browser_name: "firefox",
                plugin_version: version
            },
            onSuccess: function(response) {
                if (!response.error && response.protocol && response.host && response.port) {
                    proxy.protocol = response.protocol;
                    proxy.host = response.host;
                    proxy.port = response.port;
                    actualVersion = response.actual_plugin_version;
                    validatePopupIfOpened();
                    processIcon();
                }
            },
            onFail: function() {
                console.log('Failed to load remote configuration');
            },
            onComplete: function() {
                applyProxy(proxy);
            }
        });
    }

    function processIcon() {
        if (!isEnabled) {
            setInactiveIcon();
        }
        else if (!isControllableSettings) {
            setProblemIcon();
        }
        else if (isAvailableUpdate(version, actualVersion)) {
            setProblemIcon();
        }
        else {
            setDefaultIcon();
        }
    }

    function validatePopupIfOpened() {
        var popup = browser.extension.getViews({type:"popup"})[0];

        if (popup) {
            popup.validateView(isEnabled);
            console.log('Popup has been validated');
        }
    }

    // Register popup messages listener
    browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        /* getters */
        if ('is_enabled_proxy' === request.get) {
            sendResponse({
                is_enabled_proxy: isEnabled
            });
        }

        if ('current_state' === request.get) {
            sendResponse({
                is_enabled_proxy: isEnabled,
                is_available_update: isAvailableUpdate(version, actualVersion),
                is_controllable_settings: isControllableSettings
            });
        }

        /* setters */
        if ('is_enabled_proxy' === request.set) {
            // if changed
            if (request.value !== isEnabled) {
                isEnabled = request.value;
                Options.setOption('is_enabled_proxy', isEnabled);

                clearInterval(validateInterval);
                processPlugin(true);

                if (isEnabled) {
                    validateInterval = setInterval(processPlugin, validateDelay);
                }
            }
        }

        //pac script
        if (browser.extension.getURL(proxyScriptURL) === sender.url) {
            if ('enabled' === request.action) {
                console.log('Proxy has been set');
                clearCacheAndReloadCurrentTab(request.proxyHosts);
            }

            if ('disabled' === request.action) {
                console.log('Proxy has been cleared');
            }
        }
    });

    // Listen for proxy script errors
    browser.proxy.onProxyError.addListener(function (error) {
        console.error('PAC ERROR: ' + error.message);
    });

    initOptionsIfNecessary();
    browser.proxy.register(proxyScriptURL);
    isEnabled = Options.getOption('is_enabled_proxy');
    processPlugin();

    if (isEnabled) {
        validateInterval = setInterval(processPlugin, validateDelay);
    }

})();
