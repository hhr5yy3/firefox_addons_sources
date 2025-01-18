/*
* browser.proxy.settings.get как и browser.proxy.settings.set не будет работать в firefox
*/

var extensionBrowser = chrome || browser;

function proxyRequest (data) {
  const settingsString = localStorage['proxy-settings-get'];
  if (settingsString) {
    const settings = JSON.parse(localStorage['proxy-settings-get']);

    const { hostname } = new URL(data.url);

    const isLocal = hostname.match(/(^localhost$)|(^127\.)|(^192\.168\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^::1$)|(^[fF][cCdD])/);

    if (isLocal) {
      return { type: 'direct' }
    }

    if (settings.value.mode !== 'direct') {
      const proxySetting = JSON.parse(localStorage.proxySetting);

      return {
        type: 'http',
        host: proxySetting.http_host,
        port: proxySetting.http_port,
        username: proxySetting.auth?.user || null,
        password: proxySetting.auth?.pass || null,
      }
    }
  }

  return { type: 'direct' }
}

function proxy_settings_get ({ /* ??? */ }, cb) {
  localStorage['proxy-settings-get'] && cb(
    JSON.parse(localStorage['proxy-settings-get'])
  )
}

function proxy_settings_set (settings, cb) {
  const isChrome = !window.navigator.userAgent.match(/firefox/i)

  localStorage['proxy-settings-get'] = JSON.stringify(settings)

  if (isChrome) {
    extensionBrowser.proxy.settings.set(settings, cb)
  } else {
    //if (extensionBrowser.proxy.onRequest.hasListener(proxyRequest)) {
    //  extensionBrowser.proxy.onRequest.removeListener(proxyRequest)
    //}

    extensionBrowser.proxy.onRequest.addListener(proxyRequest, { urls: ["<all_urls>"] })
  }
}

function updateLocalization() {

    var elements = document.querySelectorAll('[data-resource]');
    elements.forEach(function(el) {
        let message = extensionBrowser.i18n.getMessage(el.getAttribute('data-resource'))
        if (el.getAttribute('data-resource').indexOf("placeholder") != -1) {
            el.placeholder = extensionBrowser.i18n.getMessage(el.getAttribute('data-resource'))
        } else if (el.getAttribute('data-resource').indexOf("title") != -1) {
            el.title = extensionBrowser.i18n.getMessage(el.getAttribute('data-resource'))
        } else {
            el.innerText = extensionBrowser.i18n.getMessage(el.getAttribute('data-resource'))
        }
    })

    var elements = document.querySelectorAll('[data-href]');
    elements.forEach(function(el) {
        let message = extensionBrowser.i18n.getMessage(el.getAttribute('data-href'))
        el.href = extensionBrowser.i18n.getMessage(el.getAttribute('data-href'))
    })
}

function validateIP(data) {
    var regex = /^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/;
    return regex.test(data);
}

function onProxy() {
    var proxySetting = JSON.parse(localStorage.proxySetting);

    var proxy = {
        type: 'http',
        host: proxySetting['http_host'],
        port: proxySetting['http_port']
    };

    var config = {
        mode: 'fixed_servers',
        pacScript: {},
        rules: {
            bypassList: [""]
        },
    };

    var rule = "singleProxy";

    var whiteList = localStorage.whiteList.split(',');

    config.rules.bypassList = uniqueArray(whiteList);

    config["rules"][rule] = {
        scheme: proxy.type,
        host: proxy.host,
        port: parseInt(proxy.port)
    };

    proxy_settings_set({
        value: config,
        scope: 'regular'
    }, function () {
    });

    localStorage.proxySetting = JSON.stringify(proxySetting);

    return proxy;
}

function offProxy() {
    var config = {
        mode: 'direct',
    };

    proxy_settings_set({
        value: config,
        scope: 'regular'
    }, function () {
    });
}

function iconSet(str) {

    var icon = {
        path: 'icons/on.png',
    }
    if (str == 'off') {
        icon['path'] = 'icons/off.png';
    }
    extensionBrowser.browserAction.setIcon(icon);
}

function setProxy(proxy) {

    var config = {
        mode: 'fixed_servers',
        pacScript: {},
        rules: {
            bypassList: [""]
        },
    };

    var rule = "singleProxy";

    var whiteList = localStorage.whiteList.split(',');

    config.rules.bypassList = uniqueArray(whiteList);

    config["rules"][rule] = {
        scheme: proxy.type,
        host: proxy.host,
        port: parseInt(proxy.port)
    };

    proxy_settings_set({
        value: config,
        scope: 'regular'
    }, function () {
    });

    var notification = new Notification(extensionBrowser.i18n.getMessage("notification_1") + " - " + proxy.host , {
        body: extensionBrowser.i18n.getMessage("notification_hit"),
        dir: 'auto',
        icon: 'icon.png'
    });

    iconSet("on");
}

function syncProxy(proxy) {
    var proxySetting = JSON.parse(localStorage.proxySetting);

    proxySetting['http_host'] = proxy.host;
    proxySetting['http_port'] = proxy.port;
    proxySetting['auth']['enable'] = "";
    proxySetting['auth']['user'] = proxy.user;
    proxySetting['auth']['pass'] = proxy.password;

    localStorage.proxySetting = JSON.stringify(proxySetting);

    var mainProxiesList = JSON.parse(localStorage.mainProxiesList);

    mainProxiesList.push(proxySetting);

    localStorage.mainProxiesList = JSON.stringify(mainProxiesList);
}

function uniqueArray(ar) {
    var j = {};

    ar.forEach(function (v) {
        j[v + '::' + typeof v] = v;
    });

    return Object.keys(j).map(function (v) {
        return j[v];
    });
}
