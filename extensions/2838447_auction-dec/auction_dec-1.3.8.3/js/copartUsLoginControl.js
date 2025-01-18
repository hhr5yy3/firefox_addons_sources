(async () => {
   const currentHost = window.location.host;

   // Proceed only if on Copart site
   if (!isCopartSite()) return;

   const copartURLs = {
      loginUrl: "https://www.copart.com/processLogin",
      loginError: "https://www.copart.com/public/loginAuthFailure",
      loginInternalError: "https://www.copart.com/public/loginInternalServerError",
      loginSuccess: ["https://www.copart.com/public/loginAccountSuspended", "https://www.copart.com/loginSuccess.html"],
      login: "https://www.copart.com/login"
   };

   let isLoggedInCopart = false; // Global or higher scoped variable

   // Copart login URLs and responses

   let appInfo = await getAppInfo();

   if (appInfo && !appInfo?.us_copart) return;

   const isUserLoggedIn = await checkIfUserLoggedIn();

   if (appInfo && appInfo?.us_copart) {
      let reloadRequired = null;
      if (!isUserLoggedIn) {
         showLoadingOverlay();
         await attemptLogin();
         reloadRequired = true;
      }

      if (reloadRequired) await reloadPage();
   }

   /* ----- Utility Functions ----- */

   async function reloadPage() {
      window.location.reload();
   }

   function isCopartSite() {
      return currentHost.includes("copart.com");
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

   async function checkIfUserLoggedIn() {
      // Try finding the desktop or mobile element

      const elementIdentifier = "logged-in-user-link";
      // const mobileElementId = "loginLink";
      let element = null;
      try {
         element = await waitForElement(`.${elementIdentifier}`);
         console.log("Element found!");
      } catch (error) {
         console.error(error.message);
      }

      let isLoggedIn = false;
      let retryCount = 0;

      if (!element) return isLoggedIn;

      while (true) {
         retryCount++;
         const desktopElement = document.getElementsByClassName(elementIdentifier);
         // Check if either element exists to determine login status
         if (desktopElement) {
            isLoggedIn = true; // User is logged out if login element is present
         }

         if (isLoggedIn || retryCount > 2) break;
         await delay(1000);
      }

      return isLoggedIn;
   }

   function sendMessageToBackground(message) {
      return new Promise((resolve) => {
         const auction = message.auction;
         const errorMsg = message.error;
         browser.runtime.sendMessage(
            {
               get: "showAuthError",
               data: { auction, errorMsg }
            },
            resolve
         );
      });
   }

   async function getAppInfo() {
      const appInfo = await browser.runtime.sendMessage({ get: "getAppInfo" });
      return appInfo;
   }

   async function updateAuthLoginStatus(loggedInPrefix) {
      return new Promise((resolve) => {
         browser.runtime.sendMessage({ get: "updateAuthLoginStatus", data: loggedInPrefix }, resolve);
      });
   }

   function showLoadingOverlay() {
      const overlayContainer = document.createElement("div");
      overlayContainer.innerHTML = `
         <div class="auth-loader">
            <div id="load_cover" >
            <div class="loaderInner">
               <div class="loader"></div>
               <div class="loader-logo">
               </div>
            </div>
            </div>
         </div>
      `;
      document.body.append(overlayContainer);
   }

   // Function to remove the loading overlay from the page
   function hideLoadingOverlay() {
      document.querySelector(".auth-loader")?.remove();
   }

   async function attemptLogin() {
      let credentials = await getAppInfo();
      const email = credentials?.us_copart?.email;
      const password = credentials?.us_copart?.password;
      if (!email || !password) return false;

      const body = JSON.stringify({
         accountType: 0,
         accountTypeValue: 0,
         rememberme: 0,
         username: email,
         password: password
      });

      let errorMessage = "";
      for (let tries = 2; tries > 0; tries--) {
         const xsrfToken = extractXsrfToken();
         // const xsrfToken = null;

         if (!xsrfToken) {
            console.error("XSRF token not found.");
            await sendMessageToBackground({
               auction: "copart",
               errorMsg: "Something went wrong... Please refresh and try again"
            });
            hideLoadingOverlay();

            break;
         }

         const loginResponse = await fetch(copartURLs.loginUrl, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "X-XSRF-TOKEN": xsrfToken,
               accept: "application/json, text/plain, */*",
               "accept-language": "en;q=0.9",
               "access-control-allow-headers": "Content-Type, X-XSRF-TOKEN",
               "cache-control": "no-cache",
               "content-type": "application/json;charset=UTF-8",
               pragma: "no-cache",
               "sec-fetch-dest": "empty",
               "sec-fetch-mode": "cors",
               "sec-fetch-site": "same-origin",
               "x-requested-with": "XMLHttpRequest"
            },
            mode: "cors",
            credentials: "include",
            referrer: "https://www.copart.com/login/",
            referrerPolicy: "no-referrer-when-downgrade",
            body
         });

         hideLoadingOverlay();

         if (copartURLs.loginSuccess.includes(loginResponse.url) && loginResponse.status === 200) {
            if (!isLoggedInCopart) {
               isLoggedInCopart = true; // Set the flag
               const loggedInPrefix = "logged_in_us_copart";
               await updateAuthLoginStatus(loggedInPrefix);
               hideLoadingOverlay();
               return true; // Login successful
            }
         } else if (loginResponse.status === 401) {
            errorMessage = `${loginResponse.status} Unauthorized: Invalid credentials.`;
            break; // Stop trying if credentials are invalid
         } else if (copartURLs.loginInternalError.includes(loginResponse.url) && loginResponse.status === 200) {
            await sendMessageToBackground({
               auction: "copart",
               errorMsg: "Something went wrong... Please refresh and try again"
            });
            break;
         } else {
            const errorData = await loginResponse.text();
            errorMessage = `${errorData}`;
            console.error("Login failed with error response:", errorData); // Log failed attempts
         }
      }

      hideLoadingOverlay();
      return errorMessage; // Login failed
   }

   function extractXsrfToken() {
      const tokenMatch = document.head.textContent.match(/csrfToken:.*?"(?<token>.*?)"/);
      return tokenMatch ? tokenMatch.groups.token : "";
   }

   // Add any additional functionality here (e.g., checking session validity)

   browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      try {
         switch (message.get) {
            case "logInUsCopart":
               showLoadingOverlay();
               attemptLogin()
                  .then((loginSuccess) => {
                     if (loginSuccess) {
                        window.location.reload();
                     } else {
                        sendResponse(false); // Ensure a response is sent if login fails
                     }
                     hideLoadingOverlay();
                  })
                  .catch((error) => {
                     hideLoadingOverlay();
                  });
               return true;

            case "reInitAccountUsCopart":
               attemptLogin()
                  .then((loginSuccess) => {
                     if (loginSuccess) {
                        window.location.reload();
                     } else {
                        sendResponse(false); // Ensure a response is sent if login fails
                     }
                     hideLoadingOverlay();
                  })
                  .catch((error) => {
                     hideLoadingOverlay();
                  });
               return true;

            default:
               sendResponse(false); // Handle unknown actions
               return true;
         }
      } catch (error) {
         console.log("ERROR in message listener:", error);
         hideLoadingOverlay();
         sendResponse(false); // Send response in case of errors
         return true;
      }
   });
})();
