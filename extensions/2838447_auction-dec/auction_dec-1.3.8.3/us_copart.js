const US_COPART = {
   login: async function (username, password) {
      const loginUrl = "https://www.copart.com/login/";
      const successLoginUrl = "https://www.copart.com/dashboard/";
      const sitePattern = "https://www.copart.com";
      let storageData = {};
      // Step 1: Remember all tabs from the same site
      const tabs = await browser.tabs.query({});
      const originalTabs = tabs.filter((tab) => tab.url.includes(sitePattern)).map((tab) => tab.id);
      // Step 2: Get the current active tab
      const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true });
      const originalUrl = activeTab.url;

      // Step 3: Update the active tab to the login URL
      browser.tabs.update(activeTab.id, { url: loginUrl }).then(() => {
         function onUpdated(tabId, info, tab) {
            // Check if the tab we're interested in has finished loading
            if (tabId === activeTab.id && info.status === "complete") {
               // Inject content script to handle form submission
               browser.scripting
                  .executeScript({
                     target: { tabId: tabId },
                     files: ["content_us_copart.js", "utils/copartXsrf.js"]
                  })
                  .then(() => {
                     browser.storage.local.get({ storageData }, (data) => {
                        let loggedInPrefix = "logged_in_" + "us_copart";
                        const updatedStorageData = { ...data.storageData };
                        updatedStorageData[loggedInPrefix] = true;
                        browser.storage.local.set({ storageData: updatedStorageData }, () => {
                           console.log(storageData, ` storageData after update`);
                        });
                     });

                     // Send a message to content script to perform form submission
                     browser.tabs.sendMessage(tabId, {
                        action: "performLogin",
                        username: username,
                        password: password,
                        site: "us_copart"
                     });
                  });

               // Listener to monitor URL changes post-login attempt
               browser.tabs.onUpdated.addListener(function onUrlChange(tabId, changeInfo, updatedTab) {
                  // Ensure we're still looking at the same tab and that the URL has changed
                  if (tabId === activeTab.id && changeInfo.url && changeInfo.url.includes(successLoginUrl)) {
                     // Step 4: Perform actions after successful login
                     // Update all other tabs from the same domain
                     originalTabs.forEach((tabId) => {
                        browser.tabs.reload(tabId);
                     });

                     // Redirect the active tab back to the original URL
                     browser.tabs.update(activeTab.id, { url: originalUrl });

                     // Cleanup: remove this listener to prevent future triggers
                     browser.tabs.onUpdated.removeListener(onUrlChange);
                  }
               });
               browser.tabs.onUpdated.removeListener(onUpdated);
            }
         }

         // Add the initial listener to monitor the tab update
         browser.tabs.onUpdated.addListener(onUpdated);
      });
   },
   logout: async function () {
      // Remove all cookies for copart.com domain
      const removeCookies = await browser.cookies
         .getAll({
            domain: ".copart.com"
         })
         .then((cookies) => {
            return Promise.all(
               cookies.map((cookie) =>
                  browser.cookies.remove({
                     url: `https://${cookie.domain}${cookie.path}`,
                     name: cookie.name
                  })
               )
            );
         });
      const clearStorageScript = `
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear any other site-specific storage
        if (window.indexedDB) {
            indexedDB.deleteDatabase('copart');
        }
        
        // Clear cache by reloading without cache
        window.location.reload(true);
    `;
      await browser.tabs.query({ url: "*://*.copart.com/*" }).then((tabs) => {
         return Promise.all(
            tabs.map((tab) =>
               browser.tabs
                  .executeScript(tab.id, {
                     code: clearStorageScript
                  })
                  .then(() => {
                     // Reload the tab after clearing storage
                     return browser.tabs.reload(tab.id, { bypassCache: true });
                  })
            )
         );
      });
   },
   extractXsrfToken: function () {
      const tokenMatch = document.head.textContent.match(/csrfToken:.*?"(?<token>.*?)"/);
      return tokenMatch ? tokenMatch.groups.token : "";
   },
   clearCookiesAndLogin: function () {
      const domain = "copart.com";
      browser.cookies.getAll({ domain: domain }, function (cookies) {
         for (let cookie of cookies) {
            var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
            browser.cookies.remove({ url: url, name: cookie.name });
         }
      });
   },
   checkLoginOnDomainChange: async function (tabUrl, credentials, tabId) {
      const result = {
         result: false,
         message: "Auction tab not found",
         auction: null
      };

      if (tabUrl.includes("copart.com")) {
         console.log("COPART??????");
         let loggedInPrefix = "logged_in_" + "us_copart";
         const isLoggedIn = await isUserLoggedInExtenstion(loggedInPrefix);

         if (!isLoggedIn && credentials?.us_copart) {
            await setXsrfToken(tabId);

            // await handleCopartLogin()

            browser.tabs.sendMessage(tabId, { get: "logInUsCopart" });
         }
      }
   }
};
