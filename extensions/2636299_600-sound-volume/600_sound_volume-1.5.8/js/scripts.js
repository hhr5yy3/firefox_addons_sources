japp = document.createElement('script');
japp.src = resolveExtensionUrl() + 'js/app.js';
japp.type = 'text/javascript';
document.body.appendChild(japp);

window.localSoundVolume = 100;

function resolveExtensionUrl() {
    if (typeof browser !== 'undefined' && browser.extension && browser.extension.getURL) {
        return browser.extension.getURL('');
    } else {
        return 'chrome-extension://' + chrome.runtime.id + '/';
    }
}

setInterval(function () {
    const media = [...document.querySelectorAll('video, audio')];
    for (let i = 0; i < media.length; i++) {
        const target = media[i];
        target.setAttribute('crossorigin', 'anonymous');
        target.crossOrigin = 'anonymous';
    }
    if (window.localSoundVolume !== 100) {
        changeSoundVolume(document);
    }
}, 200)

function getStorageSyncData(key) {
    return new Promise((resolve, reject) => {
        _browser().storage.local.get(key, (items) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(items);
        });
    });
}

function setStorageSyncData(key) {
    return new Promise((resolve, reject) => {
        _browser().storage.local.set(key, (items) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(items);
        });
    });
}

function _browser() {
    if (typeof browser !== 'undefined') {
        return browser;
    } else {
        return chrome;
    }
}

function sendToBackground(action, onResponse) {
    const data = {};
    data.soundVolume = localSoundVolume;
    try {
        _browser().runtime.sendMessage({'action': action, data: data},
            response => {
                let err = _browser().runtime.lastError;
                if (err && !err) {
                    console.warn(err);
                }
                if (onResponse) {
                    onResponse(response);
                }
            });
    } catch (e) {
        window.console.warn(e);
    }
}

function isMediaActive(media) {
    for (let i = 0; i < media.length; i++) {
        const target = media[i];
        if (!target.paused) {
            return true;
        }
    }
    return false;
}

function changeSoundVolume(document) {

    const media = [...document.querySelectorAll('video, audio')];

    for (let i = 0; i < media.length; i++) {
        const target = media[i];
        let src = target.src || target.currentSrc;
        if (src) {
            if (!target.audiocontext) {
                if (!target.crossOrigin) {
                    target.setAttribute('crossorigin', 'anonymous');
                    target.crossOrigin = 'anonymous';
                    if (src && src.indexOf('https://') === -1 && location.href && location.href.indexOf('https://') === 0) {
                        src = src.replace('http://', 'https://');
                    }
                    if (src.substring(0, 5) !== "blob:") {
                        const play = !target.paused;
                        target.src = src + '';
                        if (play) {
                            target.play();
                        }
                    }
                }
                target.audiocontext = new AudioContext();
                target.creategain = target.audiocontext.createGain();
                target.source = target.audiocontext.createMediaElementSource(target);
                target.source.connect(target.creategain);
                target.creategain.connect(target.audiocontext.destination);
            }
            const newVolume = window.localSoundVolume / 100;
            if (newVolume !== target.creategain.gain.value) {
                target.creategain.gain.value = newVolume;
            }
        }
    }
}

function locationContains(searches) {
    if (!searches) {
        return false;
    }
    const searchesArray = searches.split(',');
    for (let i = 0; i < searchesArray.length; i++) {
        const s = searchesArray[i].trim();
        if (window.location.href.indexOf('.' + s) > -1 ||
            window.location.href.indexOf('//' + s) > -1) {
            return true;
        }
    }
    return false;
}

function prepareBanner(adLocations) {
    if (window.top === window) {
        const banner = document.createElement('iframe');
        banner.id = "banner600percentContainer";
        banner.style.width = '0';
        banner.style.height = '0';
        banner.style.border = '0';
        if (locationContains(adLocations)) {
            document.body.appendChild(banner);
            const evt = new CustomEvent('bannerElement', {'detail': 'https://ad.resourcefulman.net/banner/?ref=' + encodeURIComponent(window.location)});
            setTimeout((evt) => {
                document.body.dispatchEvent(evt);
            }, 500, evt);
            return true;
        }
    }
    return false;
}

function showBanner() {
    const banner = document.getElementById('banner600percentContainer');
    if (banner) {
        banner.style.width = '100%';
        banner.style.height = '80px';
    }
}

function hideBanner() {
    const banner = document.getElementById('banner600percentContainer');
    if (banner) {
        banner.style.width = '0';
        banner.style.height = '0';
    }
}

_browser().runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'changeSoundVolume') {
        if (request.data.soundVolume !== undefined) {
            window.localSoundVolume = Number(request.data.soundVolume);
            changeSoundVolume(window.document);
        }
        sendResponse({soundVolume: window.localSoundVolume});
    } else if (request.action === 'getSoundVolume') {
        sendResponse({soundVolume: window.localSoundVolume});
    }
});

async function init() {
    let adLocations = 'aliexpress.';
    let adLocationsData = await getStorageSyncData(['adLocations', 'adLocationsTime']);
    const now = new Date().getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    if (adLocationsData && adLocationsData.adLocations && adLocationsData.adLocationsTime > now - oneDay) {
        adLocations = adLocationsData.adLocations;
    } else {
        try {
            adLocations = await fetch("https://ad.resourcefulman.net/banner/ad-locations.txt", {
                "credentials": "omit",
                "method": "GET",
                "mode": "cors"
            }).then(resp => resp.text());
        } catch (e) {
            console.warn(e);
        }
        await setStorageSyncData({adLocations: adLocations, adLocationsTime: now});
    }

    if (prepareBanner(adLocations)) {
        _browser().storage.local.get({permittedToShowBanner: -1}, s => {
            if (s.permittedToShowBanner === 1) {
                // Don't show the banner for Chrome users
                showBanner();
            } else {
                hideBanner();
            }
        });
    }
}

if (window.top === window) {
    init();
}
