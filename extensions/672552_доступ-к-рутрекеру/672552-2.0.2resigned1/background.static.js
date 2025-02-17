
var Options = {
    isSetOptions: function() {
        return "undefined" !== typeof localStorage.options;
    },
    initOptions: function() {
        localStorage.options = JSON.stringify({});
    },
    getOption: function(name) {
        return JSON.parse(localStorage.options)[ name ];
    },
    setOption: function(name, value) {
        var options = JSON.parse(localStorage.options);
        options[ name ] = value;
        localStorage.options = JSON.stringify(options);
    }
};

function initOptionsIfNecessary() {
    if (!Options.isSetOptions()) {
        Options.initOptions();
    }

    if ("undefined" === typeof Options.getOption('is_enabled_proxy')) {
        Options.setOption('is_enabled_proxy', true);
    }
}

function XHR(options) {

    var xhr = new XMLHttpRequest();

    var buildQueryString = function(obj, prefix) {
        var params = [];

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                var key = prefix ? prefix + "[" + prop + "]" : prop;
                var value = obj[prop];
                params.push(
                    typeof value === "object"
                        ? buildQueryString(value, key)
                        : encodeURIComponent(key) + "=" + encodeURIComponent(value)
                );
            }
        }

        return params
            .filter(function(el) {
                return !!el;
            })
            .join("&");
    };

    var onSuccess = function() {
        if (options.onSuccess) {
            var response;

            try {
                response = JSON.parse(xhr.responseText);
            }
            catch (error) {
                response = {
                    response: xhr.responseText,
                    error: error
                };
            }

            options.onSuccess(response);
        }

        if (options.onComplete)
            options.onComplete();
    };

    var onFail = function() {
        if (options.onFail)
            options.onFail(xhr);

        if (options.onComplete)
            options.onComplete();
    };

    xhr.addEventListener("load", onSuccess, false);
    xhr.addEventListener("error", onFail, false);
    xhr.addEventListener("abort", onFail, false);
    xhr.addEventListener("timeout", onFail, false);

    xhr.open(
        options.method || "POST",
        options.url,
        true
    );

    xhr.timeout = options.timeout;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(buildQueryString(options.data));
}

function isControllableProxySettings() {
    //TODO: implement
    return true;
}

function clearProxy() {
    browser.runtime.sendMessage(
        {action: 'disable'},
        {toProxyScript: true}
    );
}

function applyProxy(proxy) {
    browser.runtime.sendMessage(
        {
            action: 'enable',
            proxy: proxy
        },
        {toProxyScript: true}
    );
}

function clearCacheAndReloadCurrentTab(proxyHosts) {
    browser.browsingData.removeCache({since:getOneDayAgoTimestamp()}, function() {
        console.log('Cache has been cleared');
        reloadCurrentTabIfMatch(proxyHosts);
    });
}

function reloadCurrentTabIfMatch(proxyHosts) {
    browser.tabs.query({currentWindow: true, active: true}, function(tabs) {
        tabs.forEach(function(tab) {
            if (tab.url && isProxyHost(tab.url, proxyHosts)) {
                browser.tabs.reload(tab.id);
                console.log('Active tab has been reloaded');
            }
        });
    });
}

function isAvailableUpdate(current_v, actual_v) {
    return ('string' === typeof current_v && 'string' === typeof actual_v && current_v && actual_v && current_v < actual_v);
}

function setProblemIcon() {
    browser.browserAction.setBadgeText({"text":"?"});
    browser.browserAction.setIcon({
        path: {
            19: "images/rutracker19.png",
            38: "images/rutracker38.png"
        }
    });
}

function setInactiveIcon() {
    browser.browserAction.setBadgeText({"text":""});
    browser.browserAction.setIcon({
        path: {
            19: "images/rutracker-inactive19.png",
            38: "images/rutracker-inactive38.png"
        }
    });
}

function setDefaultIcon() {
    browser.browserAction.setBadgeText({"text":""});
    browser.browserAction.setIcon({
        path: {
            19: "images/rutracker19.png",
            38: "images/rutracker38.png"
        }
    });
}

function getOneDayAgoTimestamp() {
    return (new Date()).getTime() - (1000 * 60 * 60 * 24 * 1);
}


function getHost(url) {
    //do not cut the port
    return url && url.match(/^https?:\/\//)
        ? url.replace(/^https?:\/\//, '').split(/[/?#]/)[0]
        : false;
}

function isProxyHost(url, proxyHosts) {
    var host = getHost(url);

    return host
        ? host.match(buildRegex(proxyHosts))
        : false;
}

function buildRegex(hosts) {
    var regex = [];

    hosts.forEach(function(host) {
        regex.push(host.replace(/^\*\./, '\\w+\\.'));
    });

    return new RegExp('^(?:' + regex.join('|') + ')$');
}
