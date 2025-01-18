let noRedirectToken = 'zctf420otaqimwn9lx8m';
let redirectListener = null;
let error404Listener = null;

// <executed_on_extension_enabled>
chrome.storage.sync.get(['preferred_thumbnail_file'], function (storage) {

    setupThumbnailRedirectListeners(storage.preferred_thumbnail_file);

    chrome.tabs.query({url: '*://www.youtube.com/*'}, function (tabs) {
        tabs.forEach(function (tab) {
            chrome.tabs.executeScript(tab.id, {file: 'js/youtube.js'}, function () {
                chrome.tabs.sendMessage(tab.id, {
                    'preferred_thumbnail_file': {
                        newValue: storage.preferred_thumbnail_file
                    }
                });
            });
        })
    });
});
// </executed_on_extension_enabled>

chrome.runtime.onInstalled.addListener(function ({reason}) {
    if (reason === 'install') {
        // default values
        chrome.storage.sync.set({
            preferred_thumbnail_file: 'hq1',
            video_title_format: 'capitalize_first_letter'
        })
    }
});

chrome.storage.onChanged.addListener(function (changes) {
    if (changes.preferred_thumbnail_file !== undefined) {
        removeThumbnailRedirectListeners();
        setupThumbnailRedirectListeners(changes.preferred_thumbnail_file.newValue);
    }

    chrome.tabs.query({url: '*://www.youtube.com/*'}, function (tabs) {
        tabs.forEach(function (tab) {
            chrome.tabs.sendMessage(tab.id, changes);
        })
    });
});

function setupThumbnailRedirectListeners(preferredThumbnailFile) {
    if (preferredThumbnailFile !== 'hqdefault') {
        chrome.webRequest.onBeforeRequest.addListener(
            redirectListener = function (details) {
                if (!details.url.includes(`&noRedirectToken=${noRedirectToken}`)) {
                    if (details.url.startsWith('https://i.ytimg.com/vi/')) {
                        return {redirectUrl: details.url.replace(/(default|hqdefault|mqdefault|sddefault|hq720).jpg/, `${preferredThumbnailFile}.jpg`)};
                    } else if (details.url.startsWith('https://i.ytimg.com/vi_webp/')) {
                        return {
                            redirectUrl: details.url.replace(/(default|hqdefault|mqdefault|sddefault).webp.*/, `${preferredThumbnailFile}.jpg`)
                                .replace('/vi_webp/', '/vi/')
                        };
                    }
                }
            },
            {
                urls: [
                    'https://i.ytimg.com/vi/*/default.jpg*',
                    'https://i.ytimg.com/vi/*/hqdefault.jpg*',
                    'https://i.ytimg.com/vi/*/mqdefault.jpg*',
                    'https://i.ytimg.com/vi/*/sddefault.jpg*',
                    'https://i.ytimg.com/vi/*/hq720.jpg*',
                    'https://i.ytimg.com/vi_webp/*/default.webp*',
                    'https://i.ytimg.com/vi_webp/*/hqdefault.webp*',
                    'https://i.ytimg.com/vi_webp/*/mqdefault.webp*',
                    'https://i.ytimg.com/vi_webp/*/sddefault.webp*'
                ],
                types: ['image']
            },
            ['blocking']
        );

        chrome.webRequest.onHeadersReceived.addListener(
            error404Listener = function (details) {
                if (details.statusCode === 404) {
                    if (details.url.startsWith('https://i.ytimg.com/vi/')) {
                        return {redirectUrl: details.url.replace(`${preferredThumbnailFile}.jpg`, 'hqdefault.jpg') + `&noRedirectToken=${noRedirectToken}`};
                    } else if (details.url.startsWith('https://i.ytimg.com/vi_webp/')) {
                        return {redirectUrl: details.url.replace(`${preferredThumbnailFile}.webp`, 'sddefault.webp') + `&noRedirectToken=${noRedirectToken}`};
                    }
                }
            },
            {
                urls: [
                    `https://i.ytimg.com/vi/*/${preferredThumbnailFile}.jpg*`,
                    `https://i.ytimg.com/vi_webp/*/${preferredThumbnailFile}.webp*`
                ],
                types: ['image']
            },
            ['blocking']
        );
    }
}

function removeThumbnailRedirectListeners() {
    if (redirectListener !== null) {
        chrome.webRequest.onBeforeRequest.removeListener(redirectListener);
    }
    if (error404Listener !== null) {
        chrome.webRequest.onHeadersReceived.removeListener(error404Listener);
    }
}
