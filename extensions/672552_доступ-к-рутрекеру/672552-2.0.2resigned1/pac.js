
var proxyHosts = [
    'rutracker.org',
    '*.rutracker.org',
    '*.rutracker.cc',
    '*.t-ru.org'
];
var proxy;
var isEnabled = false;

if ('undefined' === typeof shExpMatch) {
    var proxyHostsRegexs = buildRegexProxyHosts();

    shExpMatch = function (host, shexp) {
        return host.match(proxyHostsRegexs[shexp]);
    }
}

function isProxyRequired(host) {
    for (var i = 0; i < proxyHosts.length; i++) {
        if (shExpMatch(host, proxyHosts[i])) {
            return true;
        }
    }

    return false;
}

function buildRegexProxyHosts() {
    var res = {};

    proxyHosts.forEach(function (shexp) {
        res[shexp] = convertShExpToRegEx(shexp);
    });

    return res;
}

function convertShExpToRegEx(shexp) {
    return new RegExp('^' + shexp.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
}

function buildProxyAddress(server) {
    var protocol = ('http' === server.protocol)
        ? 'PROXY'
        : server.protocol.toUpperCase() ;

    var host = server.host;
    var port = parseInt(server.port, 10);

    return protocol + ' ' + host + ':' + port;
}

browser.runtime.onMessage.addListener(function(request) {
    if ('enable' === request.action) {
        proxy = buildProxyAddress(request.proxy);
        isEnabled = true;
        browser.runtime.sendMessage({action: 'enabled', proxyHosts: proxyHosts});
    }

    if ('disable' === request.action) {
        isEnabled = false;
        browser.runtime.sendMessage({action: 'disabled'});
    }
});

function FindProxyForURL(url, host) {
    if (isEnabled && isProxyRequired(host)) {
        return proxy;
    }
    return 'DIRECT';
}
