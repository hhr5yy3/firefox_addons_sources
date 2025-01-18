const CA_IAA = {
    login: function (username, password) {
        const loginUrl = 'https://ca.iaai.com/Account/ExternalLogin'
        let storageData = {};
        browser.tabs.create({url: loginUrl}, function (tab) {
            // Wait for the tab to be fully loaded before injecting the script
            browser.tabs.onUpdated.addListener(function onUpdated(tabId, info) {
                if (info.status === 'complete' && tabId === tab.id) {
                    // Remove the listener after the script is injected
                    browser.tabs.onUpdated.removeListener(onUpdated);

                    browser.scripting.executeScript({
                        target: {tabId: tab.id}, files: ['content.js']
                    }, () => {
                        browser.storage.local.get({ storageData }, (data) => {
                            let loggedInPrefix = "logged_in_" + 'ca_iaa';
                            const updatedStorageData = { ...data.storageData };
                            updatedStorageData[loggedInPrefix] = true;
                            browser.storage.local.set({ storageData: updatedStorageData }, () => {
                              console.log(storageData, ` storageData after update`);
                            });
                          });
                        browser.tabs.sendMessage(tab.id, {
                            action: "performLogin", username: username, password: password, site: 'ca_iaa'
                        })
                    });
                }
            });
        });
    },
    logout: function () {
        const logoutUrl = 'https://ca.iaai.com/Account/LogOff';
        browser.tabs.query({url: '*://*.iaai.com/*'}).then(tabs => {
            if (tabs.length > 0) {
                browser.tabs.update(tabs[0].id, {url: logoutUrl});
            } else {
                browser.tabs.create({url: logoutUrl});
            }
        });
        browser.tabs.query({url: "https://portal.auctionnow.iaai.com/*"}).then(tabs => {
            // Loop through all matching tabs and close them
            tabs.forEach(tab => {
                browser.tabs.remove(tab.id);
            });
        }).catch(err => console.error('Error closing tabs:', err));
    },
    checkForSuccessfulLogin: function (tabId, changeInfo, tab) {
        const targetUrl = 'https://ca.iaai.com/MyAuctionCenter/Dashboard';
        // Check if the updated tab's URL matches the target URL
        if (changeInfo.status === 'complete' && tab.url === targetUrl) {
            browser.storage.local.get('userData', (result) => {
                let loginId = result.userData.userId; // @TODO change with loginId
                if (loginId) {
                    browser.storage.local.set({loginId: loginId}, function () {
                        console.log('Credentials ID stored.' + loginId);
                    });
                }
            });
        }
    },
    clearCookiesAndLogin: function () {
        const domain = 'ca.iaai.com';
        browser.cookies.getAll({domain: domain}, function (cookies) {
            for (let cookie of cookies) {
                var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
                browser.cookies.remove({url: url, name: cookie.name});
            }
        });
    },
}
