const US_IAA = {
    login: async function(username, password,siteType = 'us_iaa') {
        const loginUrl = 'https://login.iaai.com/Identity/Account/Login?siteType=' + siteType;
        const successLoginUrl = 'https://www.iaai.com/MyDashboard/Default';
        const redirectUrl = 'https://www.iaai.com/Dashboard/Default';
        const caRedirectUrl = 'https://ca.iaai.com/Account/Login';
        const mainDomain = 'iaai.com';

        const tabs = await browser.tabs.query({});
        const iaaiTab = tabs.find(tab => tab.url.includes(mainDomain));
        const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true });

        const targetTab = iaaiTab || activeTab;
        await browser.tabs.update(targetTab.id, { url: loginUrl });

        const onUpdated = (tabId, info, tab) => {
            if (tabId === targetTab.id && info.status === 'complete') {
                browser.scripting.executeScript({
                    target: { tabId },
                    files: ['content_us.js']
                })
                   .then(() => {
                       browser.tabs.sendMessage(tabId, {
                           action: "performLogin",
                           username,
                           password,
                           site: 'us_iaa'
                       }).then(response => {
                           if (response?.success) {
                               const onUrlChange = async (tabId, changeInfo, updatedTab) => {
                                   if (tabId === targetTab.id && changeInfo.url?.includes(successLoginUrl)) {
                                       browser.storage.local.get('storageData', (data) => {
                                           const storageData = data.storageData || {};
                                           storageData.logged_in_us_iaa = true;
                                           browser.storage.local.set({ storageData });

                                           // Check if user is from ca_iaa
                                           if (siteType === 'ca_iaa') {
                                               browser.tabs.update(tabId, { url: caRedirectUrl });
                                           } else {
                                               browser.tabs.update(tabId, { url: redirectUrl });
                                           }
                                       });
                                       browser.tabs.onUpdated.removeListener(onUrlChange);
                                   }
                               };
                               browser.tabs.onUpdated.addListener(onUrlChange);
                               browser.tabs.onUpdated.removeListener(onUpdated);
                           }
                       });
                   });
            }
        };

        browser.tabs.onUpdated.addListener(onUpdated);
        window.close();
    },

    logout: async function() {

       return this.accountLogOut('www.iaai.com');
        const logoutUrl = 'https://iaai.com/login/gbplogout';
        const mainDomain = 'iaai.com';

        try {
            const tabs = await browser.tabs.query({});
            const iaaiTab = tabs.find(tab => tab.url.includes(mainDomain));
            const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true });

            const targetTab = iaaiTab || activeTab;
            browser.tabs.update(targetTab.id, { url: logoutUrl });

            setTimeout(() => {
                browser.storage.local.get('storageData', (data) => {
                    const storageData = data.storageData || {};
                    storageData.logged_in_us_iaa = false;
                    browser.storage.local.set({ storageData });
                });
            }, 500);

        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            window.close();
        }
    },
    accountLogOut: async function(auctionDomain) {
        console.log(`Logging out from ${auctionDomain}...`);

        const cookies = await browser.cookies.getAll({});

        for (const cookie of cookies) {
            if (cookie.domain.includes("iaai.com") || cookie.domain.endsWith(".iaai.com")) {
                this.clearCookie(cookie);
            }
        }

        return true;
    },
    clearCookie: async function(cookie) {
        const cookieUrl = `http${cookie.secure ? "s" : ""}://${
           cookie.domain.startsWith(".") ? cookie.domain.slice(1) : cookie.domain
        }${cookie.path}`;

        // Attempt to remove the cookie
        try {
            const result = await browser.cookies.remove({
                url: cookieUrl,
                name: cookie.name,
            });
            // console.log(`Cookie removed: ${result ? result.name : "Failed to remove"}`);
        } catch (error) {
            // console.error(`Error removing cookie ${cookie.name}:`, error);
        }
    }
};