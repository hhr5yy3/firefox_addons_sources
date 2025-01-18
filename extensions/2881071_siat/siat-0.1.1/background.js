let messages;

if (!browser.i18n?.getMessage) {
    browser.i18n = browser.i18n || {};
    browser.i18n.getMessage = (key, args) => {
        const messages = {
            'View_in_store': 'View in store',
            'Save_as': args?.[0] ? `Save as ${args[0]}` : key
        };
        return messages[key] || key;
    };
}

function download(url, filename) {
    browser.downloads.download({ url, filename, saveAs: true }, downloadId => {
        if (!downloadId) {
            let msg = browser.i18n.getMessage('errorOnSaving');
            if (browser.runtime.lastError) {
                msg += `: \n${browser.runtime.lastError.message}`;
            }
            notify(msg);
        }
    });
}

async function fetchAsDataURL(src, callback) {
    if (src.startsWith('data:')) {
        callback(null, src);
        return;
    }
    try {
        const res = await fetch(src);
        const blob = await res.blob();
        if (!blob.size) throw 'Fetch failed of 0 size';
        const reader = new FileReader();
        reader.onload = evt => callback(null, evt.target.result);
        reader.readAsDataURL(blob);
    } catch (error) {
        callback(error.message || error);
    }
}

function getSuggestedFilename(src, type) {
    if (/googleusercontent\.com\/[0-9a-zA-Z]{30,}/.test(src)) return `screenshot.${type}`;
    if (src.startsWith('blob:') || src.startsWith('data:')) return `Untitled.${type}`;
    let filename = decodeURIComponent(src.replace(/[?#].*/, '').replace(/.*[\/]/, '').replace(/\+/g, ' '));
    filename = filename.replace(/[\x00-\x7f]+/g, s => s.replace(/[^\w\-\.\,@ ]+/g, ''))
        .replace(/\.[^0-9a-z]*\./g, '.')
        .replace(/\s\s+/g, ' ')
        .trim()
        .replace(/\.(jpe?g|png|gif|webp|svg)$/gi, '')
        .trim();
    if (filename.length > 32) filename = filename.substr(0, 32);
    filename = filename.replace(/[^0-9a-z]+$/i, '').trim();
    return (filename || 'image') + `.${type}`;
}

function notify(msg) {
    if (msg.error) {
        msg = `${browser.i18n.getMessage(msg.error) || msg.error}\n${msg.srcUrl || msg.src}`;
    }
}

function loadMessages() {
    if (!messages) {
        messages = {};
        ['errorOnSaving', 'errorOnLoading'].forEach(key => {
            messages[key] = browser.i18n.getMessage(key);
        });
    }
    return messages;
}

async function hasOffscreenDocument(path) {
    const offscreenUrl = browser.runtime.getURL(path);
    const matchedClients = await clients.matchAll();
    return matchedClients.some(client => client.url === offscreenUrl);
}

browser.runtime.onInstalled.addListener(() => {
    loadMessages();
    ['JPG', 'PNG', 'WebP'].forEach(type => {
        browser.contextMenus.create({
            id: `save_as_${type.toLowerCase()}`,
            title: browser.i18n.getMessage("Save_as", [type]),
            type: "normal",
            contexts: ["image"],
        });
    });
    browser.contextMenus.create({ id: "sep_1", type: "separator", contexts: ["image"] });
    browser.contextMenus.create({
        id: "view_in_store",
        title: browser.i18n.getMessage("View_in_store"),
        type: "normal",
        contexts: ["image"],
    });
});

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { target, op } = message || {};
    if (target === 'background' && op) {
        if (op === 'download') {
            const { url, filename } = message;
            download(url, filename);
        } else if (op === 'notify') {
            const msg = message.message;
            if (msg && msg.error) {
                let msg2 = browser.i18n.getMessage(msg.error) || msg.error;
                if (msg.src) msg2 += `\n${msg.src}`;
                notify(msg2);
            } else {
                notify(message);
            }
        } else {
            console.warn(`unknown op: ${op}`);
        }
    }
});

browser.contextMenus.onClicked.addListener(async (info, tab) => {
    const { menuItemId, mediaType, srcUrl } = info;
    const connectTab = () => browser.tabs.connect(tab.id, { name: 'convertType', frameId: info.frameId });

    if (menuItemId.startsWith('save_as_')) {
        if (mediaType === 'image' && srcUrl) {
            const type = menuItemId.replace('save_as_', '');
            const filename = getSuggestedFilename(srcUrl, type);
            loadMessages();
            const noChange = srcUrl.startsWith(`data:image/${type === 'jpg' ? 'jpeg' : type};`);
            if (!browser.offscreen) {
                const frameIds = info.frameId ? [] : void 0;
                await browser.scripting.executeScript({
                    target: { tabId: tab.id, frameIds },
                    files: ["offscreen.js"],
                });
            }
            fetchAsDataURL(srcUrl, async (error, dataurl) => {
                if (error) {
                    notify({ error, srcUrl });
                    return;
                }
                if (!browser.offscreen) {
                    const port = connectTab();
                    await port.postMessage({ op: noChange ? 'download' : 'convertType', target: 'content', src: dataurl, type, filename });
                    return;
                }
                if (noChange) {
                    download(dataurl, filename);
                    return;
                }
                const offscreenSrc = 'offscreen.html';
                if (!(await hasOffscreenDocument(offscreenSrc))) {
                    await browser.offscreen.createDocument({
                        url: browser.runtime.getURL(offscreenSrc),
                        reasons: ['DOM_SCRAPING'],
                        justification: 'Download an image for user',
                    });
                }
                await browser.runtime.sendMessage({ op: 'convertType', target: 'offscreen', src: dataurl, type, filename });
            });
        } else {
            notify(browser.i18n.getMessage("errorIsNotImage"));
        }
    } else if (menuItemId === 'view_in_store') {
        const url = `https://addons.mozilla.org/firefox/addon/siat/`;
        browser.tabs.create({ url, index: tab.index + 1 });
    }
});

