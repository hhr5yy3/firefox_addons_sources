const CA_PROGI = {
    login: async function (username, password) {
        const loginUrl = 'https://progi.com/progipix/recycler/bid/';
        const successLoginUrl = 'https://progi.com/progipix/recycler/bid/';
        const mainDomain = 'progi.com'; // Main domain to match
        let storageData = {};
        await this.clearCookiesAndData();
        // Remember all tabs from the same site
        const tabs = await browser.tabs.query({});
        const originalTabs = tabs.filter(tab => {
            const tabUrl = new URL(tab.url);
            return tabUrl.hostname === mainDomain;
        }).map(tab => ({ id: tab.id, url: tab.url }));

        // Get the current active tab
        const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true });

        // Update the current tab to the login URL
        await browser.tabs.update(activeTab.id, { url: loginUrl });


        browser.tabs.create({url: loginUrl}, function (tab) {
            // Wait for the tab to be fully loaded before injecting the script
            browser.tabs.onUpdated.addListener(function onUpdated(tabId, info) {
                if (info.status === 'complete' && tabId === tab.id) {
                    // Remove the listener after the script is injected
                    browser.tabs.onUpdated.removeListener(onUpdated);

                    browser.scripting.executeScript({
                        target: {tabId: tab.id},
                        files: ['content_progi.js']
                    }, () => {
                        browser.storage.local.get({storageData}, (data) => {
                            let loggedInPrefix = "logged_in_" + 'ca_progi';
                            const updatedStorageData = {...data.storageData};
                            updatedStorageData[loggedInPrefix] = true;
                            browser.storage.local.set({storageData: updatedStorageData}, () => {
                                console.log(storageData, ` storageData after update`);
                            });
                        });
                        browser.tabs.sendMessage(tab.id, {
                            action: "performLogin",
                            username: username,
                            password: password,
                            site: 'ca_progi'
                        });
                    });
                }
            });
        });

    },

    logout: async function () {
        // await this.clearCookiesAndData();
        // Redirect to the logout URL
        window.location.href = 'https://progi.com/progipix/recycler/bid/?action=fermer';
    },
    clearCookiesAndLogin: async function() {
        // do nothing
    },
    clearCookiesAndData: async function () {
        const domain = 'progi.com';

        // Clear cookies
        if (browser.cookies && browser.cookies.getAll && browser.cookies.remove) {
            const cookies = await browser.cookies.getAll({domain: domain});
            for (let cookie of cookies) {
                let url = `http${cookie.secure ? 's' : ''}://${cookie.domain}${cookie.path}`;
                await browser.cookies.remove({url: url, name: cookie.name});
            }
        } else {
            console.warn('browser.cookies API is not available');
        }

        // Clear history
        if (browser.history && browser.history.deleteUrl) {
            await browser.history.deleteUrl({url: `https://${domain}`});
            await browser.history.deleteUrl({url: `http://${domain}`});
        } else {
            console.warn('browser.history API is not available');
        }

        // Clear local storage and other site data
        if (browser.browsingData && browser.browsingData.remove) {
            await browser.browsingData.remove({
                origins: [`https://${domain}`, `http://${domain}`]
            }, {
                cache: true,
                cookies: true,
                localStorage: true,
                indexedDB: true,
                history: true,
                formData: true,
                passwords: true,
                serviceWorkers: true,
                webSQL: true
            });
        } else {
            console.warn('browser.browsingData API is not available');
        }
    }
}
