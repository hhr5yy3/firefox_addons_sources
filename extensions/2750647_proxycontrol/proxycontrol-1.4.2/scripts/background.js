var extensionBrowser = chrome || browser;

// extensionBrowser.commands.onCommand.addListener(function (command) {
//     console.log(command);
//     switch (command) {
//         case "options":
//             window.open("options.html");
//             break;
//         case "onProxy":
//             proxy = onProxy();

//             iconSet("on");

//             var notification = new Notification(extensionBrowser.i18n.getMessage("notification_1") + " - " + proxy.host , {
//                 body: extensionBrowser.i18n.getMessage("notification_hit"),
//                 dir: 'auto',
//                 icon: 'icon.png'
//             });
//             break;
//         case "offProxy":
//             offProxy();

//             iconSet("off");

//             var notification = new Notification(extensionBrowser.i18n.getMessage("notification_2"), {
//                 dir: 'auto',
//                 icon: 'icon.png'
//             });
//             break;
//         default:
//             alert("I love you :)");
//     }

// });

function proxyRequest (data) {
    const settingsString = localStorage['proxy-settings-get'];
    if (settingsString) {
      const settings = JSON.parse(localStorage['proxy-settings-get']);
  
      const { hostname } = new URL(data.url);
  
    //   const isLocal = hostname.match(/(^localhost$)|(^127\.)|(^192\.168\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^::1$)|(^[fF][cCdD])/);
  
    //   if (isLocal) {
    //     return { type: 'direct' }
    //   }
  
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

// --- registering persistent listener
// https://bugzilla.mozilla.org/show_bug.cgi?id=1359693 ...Resolution: --- ? WONTFIX
extensionBrowser.webRequest.onAuthRequired.addListener(callbackFn, {urls: ['*://*/*']}, ['blocking']);
extensionBrowser.webRequest.onCompleted.addListener(clearPending, {urls: ['*://*/*']});
extensionBrowser.webRequest.onErrorOccurred.addListener(clearPending, {urls: ['*://*/*']});
extensionBrowser.proxy.onRequest.addListener(proxyRequest, { urls: ["<all_urls>"] });

function clearPending(request) {
    return;
}

extensionBrowser.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {

        var proxySetting = {
            'http_host': '',
            'http_port': '',
            'proxy_rule': 'singleProxy',
            'auth': {
                'enable': '',
                'user': '',
                'pass': ''
            }
        }

        localStorage.proxySetting = JSON.stringify(proxySetting);
        localStorage.mainProxiesList = JSON.stringify([]);
        localStorage.ID = -1;
        localStorage.whiteList = '<local>,192.168.0.0/16,172.16.0.0/12,169.254.0.0/16,10.0.0.0/8'
    }
});

function callbackFn(details) {

    var proxySetting = JSON.parse(localStorage.proxySetting);

    if (proxySetting) {
        var auth = proxySetting['auth'];
        var username = auth['user'];
        var password = auth['pass'];
    }

    if (proxySetting['auth']['user'] == '' &&
        proxySetting['auth']['pass'] == '')
        return {};

    return details.isProxy === !0 ? {
        authCredentials: {
            username: username,
            password: password
        }
    } : {}
}

// extensionBrowser.webRequest.onAuthRequired.addListener(
//     callbackFn, {
//         urls: ["<all_urls>"]
//     },
//     ['blocking']);
