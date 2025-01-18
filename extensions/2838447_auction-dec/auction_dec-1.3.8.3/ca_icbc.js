const CA_ICBC = {
    login: async function (username, password) {
        const loginUrl = 'https://onlinebusiness.icbc.com/salvage/auth/Form-login.jsp';
        const successLoginUrl = 'https://onlinebusiness.icbc.com/salvage/webServlet/Search?form=VehicleList';
        const sitePattern = 'https://onlinebusiness.icbc.com';
        let storageData = {};
        await this.clearCookiesAndData();
        browser.tabs.create({url: loginUrl}, function (tab) {
            // Wait for the tab to be fully loaded before injecting the script
            browser.tabs.onUpdated.addListener(function onUpdated(tabId, info) {
                if (info.status === 'complete' && tabId === tab.id) {
                    // Remove the listener after the script is injected
                    browser.tabs.onUpdated.removeListener(onUpdated);

                    browser.scripting.executeScript({
                        target: {tabId: tab.id},
                        files: ['content_icbc.js']
                    }, () => {
                        browser.storage.local.get({storageData}, (data) => {
                            let loggedInPrefix = "logged_in_" + 'ca_icbc';
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
                            site: 'ca_icbc'
                        });
                    });
                }
            });
        });

    },

    logout: async function () {
        await this.clearCookiesAndData();
        //@TODO find way to logout from the site lol :D
    },
    clearCookiesAndLogin: async function() {
        // do nothing
    },

    clearCookiesAndData: async function () {
        const domain = 'onlinebusiness.icbc.com';

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
