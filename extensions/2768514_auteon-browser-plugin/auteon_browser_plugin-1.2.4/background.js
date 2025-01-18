import { c as config } from './chunks/config-93ca10ad.js';
import { e as eventBus } from './chunks/event-bus-eb77ec2c.js';

// Use chrome context as default.
let context = chrome;
try {
    // @ts-ignore
    // Try to get browser context.
    if (browser)
        context = browser;
}
catch (error) {
    // Do nothing.
}
context.runtime.onInstalled.addListener(async (details) => {
    // Get current and latest version.
    const currentVersion = context.runtime.getManifest().version;
    let latestVersion = await new Promise((resolve) => {
        context.storage.local.get(['latestVersion'], async (items) => {
            return resolve(items?.latestVersion || '0.0.0');
        });
    });
    // Hook into install and update event.
    if (details.reason === context.runtime.OnInstalledReason.INSTALL ||
        details.reason === context.runtime.OnInstalledReason.UPDATE) {
        // Update latest version to storage.
        await context.storage.local.set({ latestVersion: currentVersion });
        console.log(`Reload all supported urls on update`);
        const tabs = await context.tabs.query({});
        const frontendUrl = String("https://portal.auteon.com");
        const whitelistRegex = [
            ...config.productDetail.flatMap((config) => config.whitelistRegex),
            ...config.cart.flatMap((config) => config.whitelistRegex),
            new RegExp(frontendUrl, 'i'),
        ];
        tabLoop: for (const tab of tabs) {
            if (!tab?.id || !tab?.url)
                continue;
            for (const regex of whitelistRegex) {
                if (regex.test(tab.url || '')) {
                    await context.tabs.reload(tab.id);
                    continue tabLoop;
                }
            }
        }
    }
    // Hook into install event.
    if (details.reason === context.runtime.OnInstalledReason.INSTALL) {
        console.log(`Showing options page on install`);
        return await context.tabs.create({ url: context.runtime.getURL('options/index.html'), active: true });
    }
    // Hook into update event only for specific version to show changelog page.
    if (details.reason === context.runtime.OnInstalledReason.UPDATE &&
        ['0.0.0', '1.0.10'].includes(latestVersion) &&
        currentVersion !== latestVersion) {
        console.log(`Showing changelog page on version update`);
        return await context.tabs.create({ url: context.runtime.getURL('/changelog/index.html'), active: true });
    }
});
context.commands.onCommand.addListener(async (command) => {
    console.log(`Command: ${command}`);
    const [tab] = await context.tabs.query({ active: true, lastFocusedWindow: true });
    if (tab?.id)
        await context.tabs.sendMessage(tab.id, { command });
});
eventBus.silentlyRequestPluginConfiguration();
context.runtime.onMessage.addListener(eventBus.handleServiceWorkerEvents);
