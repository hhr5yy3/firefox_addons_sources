browser.runtime.onInstalled.addListener(async ({reason}) => {
    if (reason === 'install') {
        await browser.storage.local.set({ showOptIn: true, optedOut: false });
        await browser.storage.sync.set({ uc: new Date().toISOString().split('T')[0].replace(/-/g, '') });
        await browser.tabs.create({ url: `https://hp.customsearchtool.com/firefox/thankyou`, active: false });
    }
    const {uc} = await browser.storage.sync.get();
    await browser.runtime.setUninstallURL(`https://hp.customsearchtool.com/uninstall?uc=${uc || '17000101'}`);
});