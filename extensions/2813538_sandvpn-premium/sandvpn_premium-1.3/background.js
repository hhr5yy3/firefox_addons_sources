var proxy = {
    enabled: true,
    type: '',
    host: '',
    port: ''
};


browser.runtime.onInstalled.addListener(function (object) {
    let externalUrl = "https://sandvpn.com/install";
    if (object.reason === browser.runtime.OnInstalledReason.INSTALL) {
        browser.tabs.create({ url: externalUrl }, function (tab) {
        });
    }
});

browser.storage.sync.get('info', (res) => {
    if (res && res['info'] && res['info']['isActive']) {

        var proxyDetails = {
            ...res['info'],
            isActive: 'start'
        };

        browser.storage.sync.set({ info: proxyDetails });
    };
});

async function disconnectProxy() {
    browser.storage.sync.remove('auth');

    browser.proxy.onRequest.hasListener(proxyRequest)
        && browser.proxy.onRequest.removeListener(proxyRequest);

    browser.browserAction.setIcon({ path: 'logo192.png' });

    browser.privacy.websites.resistFingerprinting.set({ value: false });
    browser.privacy.network.webRTCIPHandlingPolicy.set({ value: 'default' });
    browser.privacy.websites.trackingProtectionMode.set({ value: "never" });
    browser.privacy.network.peerConnectionEnabled.set({ value: true });

    // let proxyDetails = (await browser.storage.sync.get("info"))?.info;
    // browser.storage.sync.set({ info: { ...proxyDetails, isActive: false } });
};


const proxyRequest = (details) => {
    if (/^https:\/\/api\.sandvpn\.com\/(?!get_my_ip\b).*$/i.test(details.url)) {
        return;
    };
    var proxyInfo = proxy;
    return proxyInfo;
}

const setProxy = async (proxyInfo) => {
    if (proxyInfo.isActive) {
        browser.proxy.onRequest.hasListener(proxyRequest)
            && browser.proxy.onRequest.removeListener(proxyRequest);
        browser.proxy.onRequest.addListener(
            proxyRequest,
            { urls: ["<all_urls>"] }
        );

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            browser.browserAction.setIcon({ path: "logoFlag/active-light.png" });
        }
        else {
            browser.browserAction.setIcon({ path: "logoFlag/active-dark.png" });
        };

        browser.storage.sync.get(['webrtc', 'tracking', 'fingerprinting', 'peerConnectionEnabled'],
            async function (res) {
                if (res.webrtc) browser.privacy.network.webRTCIPHandlingPolicy.set({ value: 'proxy_only' });
                if (res.tracking) browser.privacy.websites.trackingProtectionMode.set({ value: "always" });
                if (res.fingerprinting) browser.privacy.websites.resistFingerprinting.set({ value: true });
                if (!res.peerConnectionEnabled) browser.privacy.websites.resistFingerprinting.set({ value: false });
            }
        );

    }
    else {
        disconnectProxy();
    };
};

browser.webRequest.onAuthRequired.addListener(
    async function () {
        const auth = (await browser.storage.sync.get("auth")).auth;

        if (!auth) {
            disconnectProxy();
            return;
        };

        return { authCredentials: auth };
    },
    { urls: ["<all_urls>"] },
    ['blocking']
);

browser.runtime.onMessage.addListener(async function (message) {
    if ("isActive" in message) {
        if (message.isActive) {
            proxy = message.proxy;
        };
        setProxy(message);
    };
});
