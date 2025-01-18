(async () => {
   const currentHost = window.location.host;

   // Early exit if any of these checks return true
   if (!isProgi()) {
      return;
   }

   // if (isLoginPage()) return;

   // Retrieve authentication status and auction information
   let appInfo = await getAppInfo();

   //ca_progi
   if (appInfo && !appInfo?.ca_progi) return;

   // Fetch additional session and auction information

   const isUserLoggedIn = await checkIfUserLoggedIn();
   if (appInfo && appInfo?.ca_progi) {
      let reloadRequired = null;
      if (!isUserLoggedIn) {
         await loginToAuction();
         reloadRequired = true;
      }

      if (reloadRequired) await reloadPage();
   }

   async function getAppInfo() {
      return new Promise((resolve) => {
         browser.runtime.sendMessage({ get: "getAppInfo" }, (response) => resolve(response));
      });
   }

   async function checkAuctionAuthError() {
      return new Promise((resolve) => {
         browser.runtime.sendMessage({ get: "isAuctionAuthError", data: { auction: "ca_progi" } }, (response) => resolve(response));
      });
   }

   function isProgi() {
      return currentHost.includes("progi.com");
   }

   function isLoginPage() {
      return currentHost.toLowerCase().includes("login.iaai");
   }

   async function waitForElement(selector, timeout = 2000) {
      // 10 seconds default timeout
      return new Promise((resolve, reject) => {
         const intervalTime = 1000;
         let elapsedTime = 0;

         const interval = setInterval(() => {
            const element = document.querySelector(selector);
            elapsedTime += intervalTime;

            if (element) {
               clearInterval(interval);
               resolve(true);
            } else if (elapsedTime >= timeout) {
               clearInterval(interval);
               reject(new Error(`Element with selector "${selector}" not found within timeout period.`));
            }
         }, intervalTime);
      });
   }

   async function loginToAuction() {
      return await loginToService({ auction: "ca_progi" });
   }

   async function loginToService(data, url = null) {
      return new Promise((resolve) => {
         browser.runtime.sendMessage({ get: "loginAuction", data, url }, (response) => resolve(response));
      });
   }

   async function logout() {
      // Clear cookies and logout
      document.cookie.split(";").forEach((cookie) => {
         document.cookie = `${cookie.trim().split("=")[0]}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      });
      await fetch("/login/gbplogout", { method: "GET" });

      await new Promise((resolve) => {
         browser.runtime.sendMessage({ get: "clearAllIaaiCookies" }, () => resolve());
      }).catch(() => {});

      window.location.reload();
   }

   async function reloadPage() {
      window.location.reload();
   }

   async function checkIfUserLoggedIn() {
      // Try finding the desktop or mobile element

      const desktopElementId = "session-user-external";
      // const mobileElementId = "loginLink";
      let element = null;
      try {
         element = await waitForElement(`#${desktopElementId}`);
         console.log("Element found!");
      } catch (error) {
         console.error(error.message);
      }

      let isLoggedIn = false;
      let retryCount = 0;

      if (!element) return isLoggedIn;

      while (true) {
         retryCount++;
         const desktopElement = document.getElementById(desktopElementId);
         // const mobileElement = document.getElementById(mobileElementId);

         // Check if either element exists to determine login status
         if (desktopElement) {
            isLoggedIn = true; // User is logged out if login element is present
         }

         if (isLoggedIn || retryCount > 3) break;
         await delay(1000);
      }

      return isLoggedIn;
   }

   async function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
   }

   browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.get === "logIn") {
         loginToAuction().then((result) => sendResponse(result));
      } else if (message.get === "reload") {
         reloadPage();
         sendResponse(true);
      } else if (message.get === "logOut") {
         console.log("logOUT!!!!");
         logout()
            .then(() => sendResponse(true))
            .catch(() => sendResponse(false));
      } else if (message.get === "reInitAccountProgi") {
         // Handle reInitAccountProgi message, if required
         // For example:
         // logout().then(() => {
         //    loginToService(message.data).then(result => {
         //       sendResponse(result?.success);
         //       if (result?.success) navigateToDashboard();
         //    });
         // });
      }
      return true; // Keep the listener alive for async sendResponse
   });
})();
