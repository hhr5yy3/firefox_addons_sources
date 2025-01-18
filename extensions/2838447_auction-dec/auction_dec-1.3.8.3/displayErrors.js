(async () => {
   const authErrorPopupId = "adAuthErrorPopUp";
   const site = detectSite();
   if (!site) return;

   // const templateAuthUrl = browser.runtime.getURL("template/popUpAuthError.html");
   // const logoUrl = browser.runtime.getURL("./images/logos/logo.webp");
   const getAuthErrorHtml = () => {
      return `<div id="adAuthErrorPopUp">
                  <div id="adcAuthError" class="adAuthError">
                     <div class="popUpBody">
                        <div class="pupup__header">
                           <div class="pupup__block-title">
                              <h2 class="pupup__title">Auction Dec</h2>
                           </div>
                        </div>
                        <div class="pupup__content">
                           <p>
                              Authorization to the auction account is not possible<br />
                              Something went wrong.<br />
                              Please try again
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            `;
   };
   setupMessageListener();
   startAuthErrorCheck();

   // Main function to continually check for auth errors
   async function startAuthErrorCheck() {
      while (true) {
         await wait(500);
         if (isAuthErrorPopupVisible()) continue;

         const authErrorView = await loadAuthErrorView();
         if (!authErrorView) continue;

         // showAuthError(authErrorView);
         handlePopupClose(authErrorView);
      }
   }

   // Listen for messages from background scripts or other parts of the extension
   async function setupMessageListener() {
      browser.runtime.onMessage.addListener((message) => {
         if (message.action === "showAuthError") {
            showAuthErrorFromMessage(message.data);
         }
      });
   }

   // Displays the error popup when an auth error occurs
   async function showAuthErrorFromMessage({ auction }) {
      const authErrorView = await findOrCreateAuthErrorPopup();
      activatePopup(authErrorView);
   }

   // Activate the error popup when displayed
   function activatePopup(viewBlock) {
      viewBlock.classList.add("active");
   }

   // Checks if the auth error popup is visible on the page
   function isAuthErrorPopupVisible() {
      return document.querySelector(`#${authErrorPopupId}`);
   }

   // Loads and inserts the HTML content for the auth error view
   async function loadAuthErrorView() {
      // const errorPopup =

      // const errorUrl = await getAuthErrorUrl();
      // const response = await fetch(templateAuthUrl);
      // const htmlContent = await response.text();
      const div = document.createElement("div");
      div.innerHTML = getAuthErrorHtml();
      document.body.appendChild(div);

      return div.querySelector(`#${authErrorPopupId}`);
   }

   // Handles closing the popup when clicked outside
   function handlePopupClose(viewBlock) {
      viewBlock.addEventListener("click", (event) => {
         if (!event.target.closest("#adAuthError")) viewBlock.classList.remove("active");
      });
   }

   // Finds or waits until the popup is created on the page
   function findOrCreateAuthErrorPopup() {
      return new Promise((resolve) => {
         const intervalId = setInterval(() => {
            const popup = document.querySelector(`#${authErrorPopupId}`);
            if (popup) {
               clearInterval(intervalId);
               resolve(popup);
            }
         }, 100);
      });
   }

   // Utility function to wait a specified number of milliseconds
   async function wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
   }

   function detectSite() {
      const host = new URL(window.location.href).host.toLowerCase();
      if (host.includes("copart.com")) return "copart";
      return null;
   }

   // Retrieves the URL for the auth error message
   // function getAuthErrorUrl() {
   //    return new Promise((resolve) => {
   //       browser.runtime.sendMessage({ get: "getErrorAuthUrl" }, (url) => resolve(url));
   //    });
   // }
})();
