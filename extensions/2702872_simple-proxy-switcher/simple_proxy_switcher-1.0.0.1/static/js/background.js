chrome.runtime.onStartup.addListener(function () {
    //
});

window.addEventListener('DOMContentLoaded', () => {
    let cp = Proxy.get_current_proxy();
    if (cp && cp.user && cp.pass) {
        Proxy.set_proxy(cp.ip, cp.port, cp.user, cp.pass);
    }
});

let browserCode = getBrowserCode();
if (browserCode === 'firefox') {
    browser.proxy.onRequest.addListener(handleProxyRequest, {urls: ["<all_urls>"]});

    function handleProxyRequest(requestInfo) {
        let cp = Proxy.get_current_proxy();
        if (cp) {
            //const url = new URL(requestInfo.url);
            //console.log(`Proxying: ${url.hostname}`);
            return {'type': "http", 'host': cp.ip, 'port': parseInt(cp.port, 10),};
        }

        return {'type': "direct"};
    }

    browser.proxy.onError.addListener(error => {
        console.error(`Proxy error: ${error.message}`);
    });
}

chrome.webRequest.onAuthRequired.addListener(function (details) {
    let cp = Proxy.get_current_proxy();
    if (details.isProxy && cp && cp.user && cp.pass) {
        return {'authCredentials': {'username': cp.user, 'password': cp.pass,},};
    }

    return {};
}, {'urls': ['<all_urls>']}, ['blocking']);