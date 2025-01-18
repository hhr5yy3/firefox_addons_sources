let pr;

if(0) {}
else if(location.href.includes('dailymotion.com') ) pr = new DMProvider();
else if(location.href.includes('facebook.com')    ) pr = new FBProvider();
else if(location.href.includes('instagram.com')   ) pr = new INProvider();
else if(location.href.includes('youtube.com')     ) pr = new YTProvider();
else if(location.href.includes('twitter.com')     ) pr = new TWProvider();
else if(location.href.includes('vk.com')          ) pr = new VKProvider();
else if(location.href.includes('vimeo.com')       ) pr = new VMProvider();
else {
    setInterval(() => chrome.runtime.sendMessage({msg: 'setBadgeForDefaultSchema'}), 1000);
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg['action'] === 'getVideo') {
        const videos = pr.videos.map(v => v.data);
        sendResponse(videos);

    } else if(msg['action'] === 'detectYtDownloader') {
        sendResponse(sessionStorage.getItem('mtz-yt-downloader-exist'));
    }
});
