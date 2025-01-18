browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
   console.log("Background....");
   performAction(request);
});

function performAction(request) {
   let handler = null;
   switch (request.site) {
      case "ca_iaa":
         handler = US_IAA;
         break;
      case "us_iaa":
         handler = US_IAA;
         break;
      case "us_copart":
         handler = US_COPART;
         break;
      case "ca_copart":
         handler = US_COPART;
         break;
      case "ca_icbc":
         handler = CA_ICBC;
         break;
      case "ca_progi":
         handler = CA_PROGI;
         break;
      default:
         break;
   }
   if (handler) {
      if (request.action === "login") {
         const { email, password } = request.data;
         // let storageData = {};
         if (request.site === "ca_iaa" || request.site === "us_iaa") {
            if (request.site === "ca_iaa") {
               handler.login(email, password, "ca_iaa");
            }
            if (request.site === "us_iaa") {
               handler.login(email, password, "us_iaa");
            }
         } else {
            handler.login(email, password);

         }
         fetchIPAddress();
      }
      // logout from extension
      if (request.action === "logoutFromExtension") {
         handler.logout();
      }

      //logout from site
      if (request.action === "logoutFromSite") {
         // let loggedInPrefix = "logged_in_" + request.site;
         // browser.storage.local.remove(loggedInPrefix).then(() => {});
         browser.storage.local.get({ storageData }, (data) => {
            let loggedInPrefix = "logged_in_" + request.site;
            const updatedStorageData = { ...data.storageData };
            updatedStorageData[loggedInPrefix] = false;
            browser.storage.local.set({ storageData: updatedStorageData }, () => {
               console.log(storageData, ` Logout from site: storageData`);
               console.log(request.site, ` Logout from site: request.site`);
            });
         });
      }
      if (request.action === "clearCookiesAndLogin") {
         handler.clearCookiesAndLogin();
      }
      // log event
      if (request.action === "logEvent") {
         // checkUserIdAndLogout(handler);
         // Retrieve user details from storage

         var ip_address = null;
         browser.storage.local.get("ip_address", function(result) {
            ip_address = result.ip_address;
         });
         console.log(request.data);
         browser.storage.local.get("userData", function(result) {
            const eventData = request.data;
            eventData.loginId = result.userData.credentials[request.site].id;
            eventData.userId = result.userData.userId;
            eventData.site = request.site ?? result.userData.site;
            eventData.timestamp = new Date().toISOString();
            eventData.ip_address = ip_address;
            eventData.metaData = JSON.stringify(eventData.metaData) + JSON.stringify(getDeviceInfo());

            sendEventToApi(eventData);
         });
      }
   }
}


function fetchIPAddress() {
   fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
         browser.storage.local.set({ ip_address: data.ip });
         browser.storage.local.get("ip_address", function(result) {
            console.log(result.ip_address);
         });
      })
      .catch((error) => {
         console.log("Error" + error);
      });
}

function checkUserIdAndLogout(handler) {
   browser.storage.local.get("loginId", function(result) {
      if (!result.loginId) {
         handler.logout();
      }
   });
}

function checkForSuccessfulLogin(tabId, changeInfo, tab) {
   const targetUrl = "https://ca.iaai.com/MyAuctionCenter/Dashboard";
   // Check if the updated tab's URL matches the target URL
   if (changeInfo.status === "complete" && tab.url === targetUrl) {
      browser.storage.local.get("userData", (result) => {
         let loginId = result?.userData?.userId; // @TODO change with loginId
         if (loginId) {
            browser.storage.local.set({ loginId: loginId }, function() {
               console.log("Credentials ID stored." + loginId);
            });
         }
      });
   }
}

// Listen for any updates to the tabs
browser.tabs.onUpdated.addListener(checkForSuccessfulLogin);
// setInterval(checkUserIdAndLogout, 10000); // Check every 10 seconds, adjust interval as needed
browser.webRequest.onBeforeRequest.addListener(
   function(details) {
      console.log("Redirecting from: ", details.url);
      // Construct a new URL object from the current URL
      const currentUrl = new URL(details.url);
      // Get the base URL dynamically
      const baseUrl = `${currentUrl.protocol}//${currentUrl.hostname}/`;

      // Redirect to the dynamically determined base URL
      return {
         redirectUrl: baseUrl
      };
   },
   // filters
   {
      urls: [
         "*://ca.iaai.com/MyAuctionCenter/MyProfile*",
         "*://www.iaai.com/User"
      ]
   },
   // extraInfoSpec
   ["blocking"]
);
let isCapturing = false;

async function captureScreenshot() {
   if (isCapturing) {
      return;  // Prevent capturing multiple screenshots at the same time
   }
   try {
      isCapturing = true;  // Mark capturing as active
      let ip_address = null;
      const imageUri = await browser.tabs.captureVisibleTab();
      let eventData = {};
      let request = {};
      fetchIPAddress();
      const ipResult = await browser.storage.local.get("ip_address");
      eventData.ip_address = ipResult.ip_address;
      const userResult = await browser.storage.local.get("userData");
      eventData.userId = userResult.userData.userId;
      eventData.username = userResult.userData.username;
      eventData.site = request.site ?? userResult.userData.site;
      eventData.timestamp = new Date().toISOString();
      eventData.ip_address = ip_address;

      await sendImageToPaperless(eventData, imageUri);

   } catch (error) {
      console.error("Failed to capture screenshot:", error);
   } finally {
      isCapturing = false;
   }
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
   if (message.command === "capture_screenshot") {
      captureScreenshot();
   }
});

function getDeviceInfo() {
   return {
      // Browser Info
      ExtensionVersion: browser.runtime.getManifest().version,
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages,
      platform: navigator.platform,
      vendor: navigator.vendor,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,

      // Screen & Window
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      screenColorDepth: window.screen.colorDepth,
      screenPixelRatio: window.devicePixelRatio,
      windowSize: `${window.innerWidth}x${window.innerHeight}`,

      // System & Hardware
      cpuCores: navigator.hardwareConcurrency,
      maxTouchPoints: navigator.maxTouchPoints,
      deviceMemory: navigator?.deviceMemory,

      // Connection
      connectionType: navigator?.connection?.effectiveType,
      connectionSpeed: navigator?.connection?.downlink,

      // Time & Location
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),

      // Browser Capabilities
      pdfViewerEnabled: navigator?.pdfViewerEnabled,
      webdriver: navigator.webdriver,
      javaEnabled: navigator?.javaEnabled?.(),

      // Storage
      localStorage: !!window.localStorage,
      sessionStorage: !!window.sessionStorage,

      // Media Capabilities
      audioSupport: !!document.createElement("audio").canPlayType,
      videoSupport: !!document.createElement("video").canPlayType,
      webGLSupport: !!document.createElement("canvas").getContext("webgl")
   };
}