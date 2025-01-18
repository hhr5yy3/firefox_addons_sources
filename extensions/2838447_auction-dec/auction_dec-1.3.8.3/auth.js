const URI = {
   iaaiLoginPage: "https://login.iaai.com/Identity/Account/Login",
   caIaaiLoginPage: "https://ca.iaai.com/Account/ExternalLogin",
   progiLoginPage: "https://progi.com/progipix/recycler/bid",
   icbcLoginPage: "https://onlinebusiness.icbc.com/salvage/auth/Form-login.jsp",
   copartLoginPage: "https://www.copart.com/login",
   caCopartLoginPage: "https://www.copart.com/login",
   iaaiDashboard: "https://www.iaai.com/Dashboard/Default"
};

const templateAuthUrl = browser.runtime.getURL("template/popUpAuthError.html");

const auctionHosts = ["*://www.copart.com/*", "*://www.copart.ca/*", "*://progi.com/progipix/*"];
let isClearCookies = {
   copart: false
};

async function clearCookiesForClosedAuctions() {
   // Iterate through each auction type in isClearCookies
   for (const auction in isClearCookies) {
      // Get tabs related to the current auction
      const auctionTabs = await getAuctionTabs({ auction });

      // If there are active tabs for the auction, skip cookie clearing
      if (auctionTabs.length) {
         isClearCookies[auction] = false; // Ensure cookies are not cleared
         continue; // Move to the next auction
      }

      // Mark this auction for cookie clearing
      isClearCookies[auction] = true;

      // Set a timeout to clear cookies after a delay
      setTimeout(() => {
         // Check if the auction is still marked for cookie clearing
         if (!isClearCookies[auction]) return;

         // Perform logout operation for the auction
         accountLogOut(auction);
         isClearCookies[auction] = false; // Reset the flag
      }, 5000); // 5000 milliseconds = 5 seconds
   }
}

async function setXsrfToken(tabId) {
   const scriptData = {
      url: browser.runtime.getURL("utils/copartXsrf.js")
   };

   try {
      await browser.tabs.sendMessage(tabId, {
         action: "include",
         data: scriptData
      });
   } catch (error) {
      console.error("Message send error:", error);
   }
}

async function updateTab(url) {
   const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
   if (tab?.id) {
      await browser.tabs.update(tab.id, { url: url });
   }
}

async function sendMessageFromBackground(tabId, message) {
   return new Promise((resolve) => {
      // Send a message to the specified tab
      browser.tabs.sendMessage(tabId, message, () => {
         resolve(true); // Resolve the promise with 'true' when the message is sent
      });
   });
}

async function clearStorage() {
   await new Promise((resolve) => {
      browser.storage.local.clear(() => {
         if (browser.runtime.lastError) {
            console.error(browser.runtime.lastError);
         }
         resolve(true);
      });
   });
}

const setLocalStorage = async (data) => {
   return new Promise((resolve) => {
      browser.storage.local.set(data, () => {
         resolve(true);
      });
   });
};

const getLocalStorage = async (key) => {
   return new Promise((resolve) => {
      browser.storage.local.get([key], (result) => {
         resolve(result[key]);
      });
   });
};

async function sleep(e) {
   await new Promise((t) => setTimeout(t, e));
   return true;
}

async function getAllAuctionsActiveTabs() {
   return new Promise((resolve, reject) => {
      browser.tabs.query({ url: auctionHosts, active: true }, (tabs) => {
         if (tabs && tabs.length > 0) {
            resolve(tabs);
         } else {
            console.warn("No matching active auction tabs found.");
            reject("No matching active tabs.");
         }
      });
   });
}

async function updateAuthLoginStatus(loggedInPrefix) {
   const storageData = await getLocalStorage("storageData");
   const updatedStorageData = { ...storageData };
   updatedStorageData[loggedInPrefix] = true;
   return updatedStorageData;
}

function getAuctionAllowInfo(url) {
   const auctionInfo = {
      auction: "",
      allowed: false
   };

   if (url.includes("copart.com")) {
      auctionInfo.auction = "copart";
   }

   auctionInfo.allowed = Boolean(parseInt(appConfigFields[`${auctionInfo.auction}_on`]));

   return auctionInfo;
}

async function saveGuestUserCredentials(e) {
   await setLocalStorage({
      currentGuestDTO: e
   });
}

async function getAppInfo() {
   // await getUserLimits();
   const userData = await getLocalStorage("userData");
   const credentials = userData?.credentials;
   return credentials;
}

async function logIn() {
   // Execute the auction login function
   await loginAuction();

   // Return success status
   return {
      success: true,
      data: {}
   };
}

async function showLoaderInActiveTab(tabId) {
   return await sendTabMessage(tabId, "setLoader");
}

async function sendTabMessage(tabId, message) {
   try {
      // Send message to the specified tab with the provided message type
      await browser.tabs.sendMessage(tabId, { get: message });
      console.log(`Message sent to tab ${tabId}: ${message}`);
   } catch (error) {
      console.error(`Failed to send message to tab ${tabId}:`, error);
   }
}

// Retrieves tabs that match the auction host URL pattern for a specific auction
async function getAuctionTabs({ auction }) {
   return new Promise((resolve) => {
      browser.tabs.query({ url: auctionHosts }, (tabs) => {
         // Filter tabs based on auction hostname match
         const auctionTabs = tabs.filter((tab) => {
            if (!tab.url) return false; // Skip if URL is missing

            const hostname = new URL(tab.url).hostname;
            return hostname.includes(auction);
         });

         resolve(auctionTabs);
      });
   });
}

// Show authentication error if detected for a specific auction
async function showAuthError(event) {
   const auctionId = event.auction;

   // Get all tabs associated with the auction
   const auctionTabs = await getAuctionTabs({ auction: auctionId });

   if (auctionTabs.length === 0) return;

   // Check if there's an authentication error for the auction
   // const hasAuthError = await isAuctionAuthError({ auction: auctionId });
   const hasAuthError = true;
   if (hasAuthError) {
      // Send an error message to each relevant tab
      auctionTabs.forEach((tab) => {
         browser.tabs.sendMessage(tab.id, {
            action: "showAuthError",
            data: { auction: auctionId }
         });
      });
   }
}

// Set the authentication status for a specific auction
async function setAuthSuccess(event) {
   const authErrorKey = `auction_auth_error_${event.auction}`;
   const authStatus = { [authErrorKey]: event.status || "" };
   await setLocalStorage(authStatus);
}

// Check if there's an authentication error for a specific auction
async function isAuctionAuthError(event) {
   const authErrorKey = `auction_auth_error_${event.auction}`;
   return Boolean(await getLocalStorage(authErrorKey));
}

async function loginAuction(auctionData = null) {
   // Attempt to log in to the auction
   const loginResult = await auctionsLogIn(auctionData);

   console.log(loginResult, "----------------loginResult------------------");
   // If there's no result, exit the function early
   if (!loginResult.result) {
      return {
         success: false,
         message: loginResult.message
      };
   }

   // // Display any authentication error messages
   showAuthError({
      auction: "Copart"
   });

   // // Return the result of the login attempt
   return {
      success: loginResult?.result
   };
}

async function logOutFromAuction(tabId, auctionUrl) {
   return new Promise((resolve) => {
      browser.tabs.executeScript(
         tabId,
         {
            code: `
           window.location.href = "${auctionUrl}"; 
         `
         },
         () => {
            resolve(true);
         }
      );
   });
}

async function auctionsLogIn(auctionTab = null) {
   return new Promise(async (resolve) => {
      // Step 1: Get the auction tab, retry until found
      let auctionTabs = auctionTab ? [auctionTab] : [];

      if (!auctionTab) {
         return resolve({
            result: false,
            message: "Auction tab not found",
            auction: null
         });
      }

      while (auctionTabs && !auctionTabs.length) {
         try {
            auctionTabs = await getAllAuctionsActiveTabs();
         } catch (error) {
            console.log(error, "--------error------------");
         }
         await sleep(1000);
      }

      const tabId = auctionTabs && auctionTabs[0].id;
      const tabUrl = auctionTabs && auctionTabs[0].url;

      const result = {
         result: false,
         message: "Auction tab not found",
         auction: null
      };

      if (!tabUrl) return resolve(result);

      // Step 2: Get auction info
      // const auctionInfo = getAuctionAllowInfo(tabUrl);
      // result.auction = auctionInfo.auction;

      const userData = await getLocalStorage("userData");

      const credentials = userData?.credentials;

      // Step 3: Determine which domain is active and log in accordingly
      if (tabUrl.includes("copart.com")) {
         console.log("Logging into copart.com");
         if (credentials?.us_copart) {
            await handleUsCopartLogin(tabId, result, resolve);
         }
      } else if (tabUrl.includes("copart.ca")) {
         console.log("Logging into copart.ca");
         if (credentials?.ca_copart) {
            await handleCaCopartLogin(tabId, result, resolve);
         }
      } else if (tabUrl.includes("progi.com/progipix/")) {
         console.log("Logging into progipix");
         if (credentials?.ca_progi) {
            await handleProgiLogin(credentials.ca_progi, tabId, result, resolve);
         }
      } else {
         return resolve(result); // If neither domain is active, exit
      }
   });
}

//// Handle login for progi auctions

async function handleProgiLogin(userCredentials, tabId) {
   // await showLoaderInActiveTab(tabId);

   browser.tabs.update({ url: URI.progiLoginPage }, function (tab) {
      // Wait for the tab to be fully loaded before injecting the script
      browser.tabs.onUpdated.addListener(function onUpdated(newTabId, info) {
         if (info.status === "complete" && newTabId === tab.id) {
            // Remove the listener after the script is injected
            browser.tabs.onUpdated.removeListener(onUpdated);

            browser.scripting.executeScript(
               {
                  target: {
                     tabId: tabId
                  },
                  files: ["content_progi.js"]
               },
               async () => {
                  let loggedInPrefix = "logged_in_" + "ca_progi";
                  const updatedStorageData = await updateAuthLoginStatus(loggedInPrefix);

                  console.log(updatedStorageData, "updatedStorageData ca_progi");
                  await setLocalStorage({
                     storageData: updatedStorageData
                  });

                  console.log("Send Message....");
                  browser.tabs.sendMessage(tabId, {
                     action: "performLogin",
                     username: userCredentials.email,
                     password: userCredentials.password,
                     site: "ca_progi"
                  });
               }
            );
         }
      });
   });
}

async function handleICBCLogin(userCredentials, tabId, result, resolve) {
   // await showLoaderInActiveTab(tabId);

   browser.tabs.update({ url: URI.icbcLoginPage }, function (tab) {
      browser.tabs.onUpdated.addListener(function onUpdated(newTabId, info) {
         if (info.status === "complete" && newTabId === tab.id) {
            // Remove the listener after the script is injected
            browser.tabs.onUpdated.removeListener(onUpdated);

            browser.scripting.executeScript(
               {
                  target: {
                     tabId: tabId
                  },
                  files: ["content_icbc.js"]
               },
               async () => {
                  let loggedInPrefix = "logged_in_" + "ca_icbc";
                  const updatedStorageData = await updateAuthLoginStatus(loggedInPrefix);
                  await setLocalStorage({
                     storageData: updatedStorageData
                  });

                  browser.tabs.sendMessage(tabId, {
                     action: "performLogin",
                     username: userCredentials.email,
                     password: userCredentials.password,
                     site: "ca_icbc"
                  });
               }
            );
         }
      });
   });
}

//// Handle login for Copart auctions

async function handleUsCopartLogin(tabId, result, resolve) {
   browser.tabs.sendMessage(tabId, { get: "logInUsCopart" }, (response) => {
      result.success = response;
      result.message = response ? "Login successful" : "Error during Copart authentication";

      console.log(result, "result");

      //   if (response) {
      //     sendAuctionLoginEvent("copart");
      //   }

      resolve(result);
   });
}

async function handleCaCopartLogin(tabId, result, resolve) {
   browser.tabs.sendMessage(tabId, { get: "logInCaCopart" }, (response) => {
      result.success = response;
      result.message = response ? "Login successful" : "Error during Copart authentication";

      console.log(result, "result");

      //   if (response) {
      //     sendAuctionLoginEvent("copart");
      //   }

      resolve(result);
   });
}

async function reloadAll() {
   const activeTabs = await getAllAuctionsActiveTabs();
   if (activeTabs) {
      for (const tab of activeTabs) {
         browser.tabs.reload(tab.id);
      }
   }
}

// Generic function to check if the user is logged in by examining cookies for a specific domain
async function checkLoginStatus(domain) {
   console.log(`Checking login status for ${domain}...`);

   // Get all cookies for the specified domain
   const cookies = await browser.cookies.getAll({ domain });

   // Filter cookies that match the authentication cookies
   const loggedInCookies = cookies.filter(
      (cookie) => cookie.domain.includes("progi.com") || cookie.domain.endsWith(".copart.com") || cookie.domain.endsWith(".copart.ca")
   );

   if (loggedInCookies.length > 0) {
      // console.log(`User is logged in on ${domain}`);
      for (const cookie of loggedInCookies) {
         clearCookie(cookie);
      }
   } else {
      console.log(`User is NOT logged in on ${domain}`);
   }

   return loggedInCookies > 0 ? true : false;
}

// Function to log out from an auction domain and clear cookies
async function accountLogOut(auctionDomain) {
   console.log(`Logging out from ${auctionDomain}...`);

   const cookies = await browser.cookies.getAll({});

   for (const cookie of cookies) {
      if (cookie.domain.includes("progi.com") || cookie.domain.endsWith(".copart.com") || cookie.domain.endsWith(".copart.ca")) {
         clearCookie(cookie);
      }
   }

   return true;
}

// Function to clear a cookie for any domain
async function clearCookie(cookie) {
   const cookieUrl = `http${cookie.secure ? "s" : ""}://${cookie.domain.startsWith(".") ? cookie.domain.slice(1) : cookie.domain}${cookie.path}`;

   // Attempt to remove the cookie
   try {
      const result = await browser.cookies.remove({
         url: cookieUrl,
         name: cookie.name
      });
      // console.log(`Cookie removed: ${result ? result.name : "Failed to remove"}`);
   } catch (error) {
      // console.error(`Error removing cookie ${cookie.name}:`, error);
   }
}

async function accountsLogOut() {
   return Promise.allSettled([accountLogOut("progi.com"), accountLogOut("copart.com"), accountLogOut("copart.ca")]);
}

async function logOut() {
   console.log("logout....");
   // await clearStorage();
   await accountsLogOut();
   await sleep(1000);
   await reloadAll();
   return true;
}

async function reInitAccountUsCopart(eventData) {
   console.log("-------------------------reInitAccountUsCopart-------------------------");

   return new Promise(async (resolve) => {
      try {
         const activeTabs = await getAllAuctionsActiveTabs();
         console.log(activeTabs, "activeTabs");
         const activeTab = activeTabs[0];

         if (activeTab?.url) {
            browser.tabs.sendMessage(activeTab.id, { get: "reInitAccountUsCopart", data: eventData }, (response) => resolve(response));
         } else {
            resolve(false);
         }
      } catch (error) {
         console.log(error);
      }
   });
}

async function reInitAccountCaCopart(eventData) {
   console.log("-------------------------reInitAccountCaCopart-------------------------");

   return new Promise(async (resolve) => {
      try {
         const activeTabs = await getAllAuctionsActiveTabs();
         console.log(activeTabs, "activeTabs");
         const activeTab = activeTabs[0];

         if (activeTab?.url) {
            browser.tabs.sendMessage(activeTab.id, { get: "reInitAccountCaCopart", data: eventData }, (response) => resolve(response));
         } else {
            resolve(false);
         }
      } catch (error) {
         console.log(error);
      }
   });
}

// Helper functions
async function isUserLoggedInExtenstion(loggedInPrefix) {
   const storageData = await getLocalStorage("storageData");
   return storageData[loggedInPrefix];
}

async function checkExtensionLoginStatus() {
   const loggedInExtension = getLocalStorage("userData");
   return loggedInExtension;
}

async function checkLoginOnDomainChange(tabUrl, credentials, tabId) {
   const result = {
      result: false,
      message: "Auction tab not found",
      auction: null
   };

   if (tabUrl.includes("copart.com")) {
      let loggedInPrefix = "logged_in_" + "us_copart";
      const isLoggedIn = await isUserLoggedInExtenstion(loggedInPrefix);
      if (!isLoggedIn && credentials?.us_copart) {
         await setXsrfToken(tabId);
         try {
            browser.tabs.sendMessage(tabId, { get: "logInUsCopart" });
         } catch (error) {
            console.log("ERORRRRR", error);
         }
      }
   } else if (tabUrl.includes("copart.ca")) {
      let loggedInPrefix = "logged_in_" + "ca_copart";
      const isLoggedIn = await isUserLoggedInExtenstion(loggedInPrefix);
      if (!isLoggedIn && credentials?.ca_copart) {
         await setXsrfToken(tabId);
         try {
            browser.tabs.sendMessage(tabId, { get: "logInCaCopart" });
         } catch (error) {
            console.log("ERORRRRR", error);
         }
      }
   } else if (tabUrl.includes("progi.com/progipix")) {
      let loggedInPrefix = "logged_in_" + "ca_progi";
      const isLoggedIn = await isUserLoggedInExtenstion(loggedInPrefix);

      if (!isLoggedIn && credentials?.ca_progi) {
         //logged_in_ca_progi:false
         console.log("Switched to progi.com");
         await handleProgiLogin(credentials?.ca_progi, tabId); // Login with iaai.com credentials
      } else {
         console.log("Already logged in progi.com or doesn't have permissions");
      }
   }
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
   const action = message.get;
   switch (action) {
      case "logIn":
         logIn(message.data, sender).then((response) => sendResponse(response));
         return true; // Keeps the channel open for async response

      case "loginAuction":
         if (!sender?.tab?.active) return false;
         loginAuction(sender?.tab).then((result) => sendResponse(result));
         return true;

      case "logOut":
         logOut().then(() => sendResponse(true));
         return true;

      case "reloadAll":
         sendResponse(reloadAll());
         break;

      case "reInitAccountUsCopart":
         // console.log("---------------reInitAccountUsCopart--------------------");
         reInitAccountUsCopart(message.data).then((response) => sendResponse(response));
         return true;

      case "reInitAccountCaCopart":
         // console.log("---------------reInitAccountUsCopart--------------------");
         reInitAccountCaCopart(message.data).then((response) => sendResponse(response));
         return true;

      case "showAuthError":
         showAuthError(message.data).then((response) => sendResponse(response));
         return true;

      case "setAuthSuccess":
         setAuthSuccess(message.data).then((response) => sendResponse(response));
         return true;

      case "isAuctionAuthError":
         isAuctionAuthError(message.data).then((response) => sendResponse(response));
         return true;

      case "isIaaiAuthTab":
         sendResponse(isIaaiAuthTab(sender?.tab?.id));
         break;

      case "clearAllIaaiCookies":
         // Uncomment and add response handling if needed
         accountLogOut("iaai").then(sendResponse);
         return true;

      case "iaaiLoginComplete":
         console.log("--------------iaaiLoginComplete------------------");
         sendResponse(iaaiLoginComplete(message.data.result));
         break;

      case "saveGuestUserCredentials":
         saveGuestUserCredentials(message.data).then((response) => sendResponse(response));
         return true;

      case "getAppInfo":
         getAppInfo().then((appInfo) => {
            sendResponse(appInfo); // Send the appInfo object as a response
         });
         return true;

      case "updateAuthLoginStatus":
         updateAuthLoginStatus(message.data).then(async (updatedStorageData) => {
            await setLocalStorage({ storageData: updatedStorageData });
            sendResponse(updatedStorageData);
         });

         return true;

      case "updateTab":
         updateTab(message.data).then((tabUpdated) => {
            sendResponse({ success: tabUpdated }); // Send the appInfo object as a response
         });
         return true;

      case "ping":
         // sendResponse(true);
         sendResponse({ active: true });
         return true;
      default:
         console.warn(`Unknown action: ${action}`);
         // sendResponse({ error: "Unknown action" });
         return true;
   }
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
   const handleTabUpdate = async () => {
      if (!tab.url) return;

      //  const allowedDomains = ["copart.com",  "progi.com", "onlinebusiness.icbc.com"];
      const allowedDomains = ["copart.com", "copart.ca", "progi.com"];

      if (!allowedDomains.some((domain) => tab.url.includes(domain))) {
         return;
      }

      if (changeInfo.status === "complete" && tab.url) {
         const tabUrl = tab.url;

         try {
            const userData = await getLocalStorage("userData");

            if (!userData) return; // Early return if userData is not found

            const credentials = userData?.credentials;

            // Call the function to check login
            checkLoginOnDomainChange(tabUrl, credentials, tabId);
         } catch (error) {
            console.error("Error retrieving user data:", error);
         }
      }
   };

   handleTabUpdate(); // Call the async function
});

browser.runtime.onSuspend.addListener(() => {
   // Clear local storage when the extension is unloaded

   async function onSuspend() {
      await clearStorage();
      await logOut();
   }
   onSuspend();
});

// Polling function to check if the user is still logged in and log them out

setInterval(async () => {
   const extenstionLoginStatus = await checkExtensionLoginStatus();

   if (!extenstionLoginStatus) {
      const domains = [
         {
            domain: "copart.com",
            logoutUrl: "https://www.copart.com/doLogout.html"
         },
         {
            domain: "copart.ca",
            logoutUrl: "https://www.copart.ca/doLogout.html"
         },
         {
            domain: "progi.com",
            logoutUrl: "https://progi.com/progipix/recycler/bid/?action=fermer"
         }
      ];

      // Dynamically check login status for each domain
      for (const domainInfo of domains) {
         const isLoggedIn = await checkLoginStatus(domainInfo?.domain);
         if (isLoggedIn) {
            console.log(`User is still logged in on ${domainInfo.domain}, logging out...`);
            accountLogOut(domainInfo.domain);
         } else {
            console.log(`User is logged out from ${domainInfo.domain}`);
         }
      }
   }
}, 25 * 1000);

function checkRedirect({ responseHeaders, auction }) {
   // Check if the responseHeaders array is present and has elements
   if (!responseHeaders?.length) return false;

   // If auction site is 'copart', look for 'location' header indicating successful login redirect
   console.log("COPART");
   if (auction === "copart") {
      return responseHeaders.find(({ name }) => name.toLowerCase() === "location")?.value.includes("/loginSuccess.html");
   }
}

// // Define the listener function for webRequest onHeadersReceived event
function onHeadersReceivedListener(details) {
   // Check the redirect status based on headers and auction site
   if (checkRedirect(details)) {
      console.log("--------------------Redirect Success------------------");
      //   handleSuccessfulLogin(); // Call the function to handle a successful login
   }
}

// Add listener for webRequest headers received event for specific URLs
browser.webRequest.onHeadersReceived.addListener(
   onHeadersReceivedListener,
   {
      urls: ["https://www.copart.com/processLogin/*"]
   },
   ["responseHeaders"]
);
