browser.tabs.onCreated.addListener(async ({id, openerTabId}) => {
    if (typeof openerTabId !== 'undefined') {
        const {url} = await browser.tabs.get(openerTabId);
        if (!/search.yahoo.com\/yhs.*param3=searchmanager_/i.test(url)) return;
        const {width, height, top, left} = await browser.windows.getCurrent()
            , widthUsed = Math.ceil(width * 0.52)
            , leftUsed = left + Math.abs(Math.ceil(width * 0.48))
            , heightUsed = Math.ceil(height);

        await browser.windows.create({
            tabId: id,
            height: heightUsed,
            width: widthUsed,
            top: top,
            left: leftUsed,
            type: 'normal'
        });
    }
});

browser.webRequest.onBeforeRequest.addListener(async details => {
    const {uc} = await browser.storage.sync.get();
    return typeof uc === 'undefined' ? {} : {redirectUrl: details.url.replace('&param1=17000101&', `&param1=${uc || '17000101'}&`)};
}, {urls: ['*://search.yahoo.com/yhs/search*&param1=17000101&*']}, ["blocking"]);