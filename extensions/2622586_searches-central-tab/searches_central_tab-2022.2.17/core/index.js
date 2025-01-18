browser.runtime.onInstalled.addListener(async ({reason}) => {
    if (reason === 'install') {
        await browser.storage.local.set({showOptIn: true});
        await browser.storage.sync.set({ uc: new Date().toISOString().split('T')[0].replace(/-/g, '') });
        browser.tabs.create({ url:`https://hsearchescentral.com/firefox/thankyou`, active:false });
    }
    const {uc} = await browser.storage.sync.get();
    await browser.runtime.setUninstallURL(`https://hsearchescentral.com/uninstall?uc=${uc || '17000101'}`);
});

browser.tabs.onUpdated.addListener(async (tabId, { url }) => {
    if (typeof url !== 'undefined') {
        const { showOptIn } = await browser.storage.local.get('showOptIn');
        if (showOptIn && url.includes(browser.runtime.getURL(''))) {
            await browser.storage.local.set({ showOptIn: false });
            await browser.tabs.update(tabId, { url: `/prompt/index.html` });
        }
    }
});