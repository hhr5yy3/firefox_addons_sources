browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
   if (request.action === "performLogin") {
      function tryLogin() {
         const url = "https://www.copart.ca/processLogin";
         const payload = {
            username: request.username,
            password: request.password,
            rememberme: false
         };
         // Sending the POST request
         fetch(url, {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
         })
            .then((response) => response.json())
            .then((result) => {
               // Checking the return code
               if (result.data.result === "success") {
                  // fire event and store data in browser storage
                  let storageData = {};
                  let loggedInPrefix = "logged_in_ca_copart";
                  storageData[loggedInPrefix] = true;
                  browser.storage.local.set(storageData, () => {
                     console.log(`${loggedInPrefix} content has been set to true`);
                  });
                  // Proceed with login
                  window.location.href = "/dashboard"; // Redirect to the dashboard or desired page
               } else {
                  console.log("Login failed: " + result.data.error);
                  // Handle login failure
               }
            })
            .catch((error) => {
               console.error("Error:", error);
            });
      }

      tryLogin();
   }
});

$(document).ready(function () {
   function injectScriptIntoIframe(iframe) {
      const script = document.createElement("script");
      script.src = browser.runtime.getURL("iframe-content.js");
      script.onload = function () {
         this.remove();
      };
      (iframe.contentDocument || iframe.contentWindow.document).head.appendChild(script);
   }

   // Function to send a message to the iframe
   function sendMessageToIframe(iframe, message) {
      iframe.contentWindow.postMessage(message, "https://g2auction.copart.ca/g2/auctions.html?siteLanguage=en&appId=g2");
      console.log("Message sent");
   }

   // Function to listen for messages from the iframe
   window.addEventListener("message", function (event) {
      if (event.origin === "https://g2auction.copart.ca/g2/auctions.html?siteLanguage=en&appId=g2") {
         console.log("Message received from iframe:", event.data);
         // Handle messages received from the iframe
      }
   });

   // MutationObserver to watch for the iframe element
   const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
         mutation.addedNodes.forEach(function (node) {
            if (node.tagName === "IFRAME" && node.id === "iAuction5") {
               const iframe = node;

               const checkIframeInterval = setInterval(function () {
                  try {
                     if (iframe.contentDocument && iframe.contentDocument.readyState === "caplete") {
                        injectScriptIntoIframe(iframe);
                        sendMessageToIframe(iframe, { action: "checkButton" });
                        clearInterval(checkIframeInterval); // Stop checking once the iframe is loaded and script is injected
                     }
                  } catch (e) {
                     console.error("Error accessing iframe:", e);
                     clearInterval(checkIframeInterval);
                  }
               }, 500); // Check every 500ms

               // Stop observing further changes
               observer.disconnect();
            }
         });
      });
   });

   // Configuration of the observer:
   const config = { childList: true, subtree: true };

   // Start observing the target node for configured mutations
   observer.observe(document.body, config);

   // Also, immediately check if the iframe is already present and loaded
   const iframeImmediateCheckInterval = setInterval(function () {
      const iframe = document.getElementById("iAuction5");
      if (iframe) {
         try {
            if (iframe.contentDocument && iframe.contentDocument.readyState === "caplete") {
               injectScriptIntoIframe(iframe);
               sendMessageToIframe(iframe, { action: "checkButton" });
               clearInterval(iframeImmediateCheckInterval); // Stop checking once the iframe is loaded and script is injected
            }
         } catch (e) {
            console.error("Error accessing iframe:", e);
            clearInterval(iframeImmediateCheckInterval);
         }
      }
   }, 500); // Check every 500ms

   function checkTableAndFetchData() {
      // Check if the table body exists and has rows
      const tableBody = $("tbody.p-datatable-tbody");
      if (tableBody.length && tableBody.find("tr").length) {
         // Clear the interval once the table is found
         clearInterval(tableCheckInterval);
         // Step 1: Check if the current page is the specified URL
         if (window.location.href === "https://www.copart.ca/member-payments/unpaid-invoices") {
            // Step 2: Retrieve the user ID from local storage
            const userId = 16; // @todo fix and get from browser storage

            // Step 3: Fetch data from the API with the modified payload
            fetch("https://dec.autosrealm.ca/api/bids", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json"
               },
               body: JSON.stringify({
                  userId: userId,
                  site: "ca_copart"
               })
            })
               .then((response) => response.json())
               .then((data) => {
                  // Check if the response status is success
                  if (data.status === "success") {
                     const bids = data.bids.lots;
                     const lotNumbers = Object.values(bids);

                     // Step 4: Loop through the response and check against the table
                     tableBody.find("tr").each(function () {
                        const lotNumberElement = $(this).find("td:nth-child(4) a");
                        const lotNumber = lotNumberElement.text().trim();

                        // If the lot number is not in the response, hide the row
                        if (!lotNumbers.includes(lotNumber)) {
                           $(this).hide();
                        }
                     });
                  }
               })
               .catch((error) => console.error("Error fetching bids:", error));
         }
      }
   }

   const tableCheckInterval = setInterval(checkTableAndFetchData, 250);
   // Event handler using delegation for button click with ng-click attribute
   $(document).on("click", '[ng-click="doLogout()"]', function (e) {
      browser.runtime.sendMessage({ action: "logoutFromSite", site: "ca_copart" });
   });
   $(document).on("click", 'button[ng-click="openPrelimBidModal()"]', function (e) {
      // Get the value from the input field with id "max-bid"
      var maxBidValue = $("#max-bid").val();
      // Get the text content of the span with class "dynamic-bid-inc"
      var startingBidText = $(".dynamic-bid-inc").text();
      // Use a regular expression to extract the numerical value
      var startingBidValue = startingBidText.match(/\$([\d,.]+)/)[1];
      var startingBidAmount = parseFloat(startingBidValue.replace(/,/g, ""));
      // For example, prevent default if maxBidValue is higher than a specified value
      processPreBid(maxBidValue);
   });

   $(document).on("click", 'button[ng-click="openIncreaseBidModal()"]', function (e) {
      var maxBidValue = $("#your-max-bid").val();
      processPreBid(maxBidValue);
   });

   function processPreBid(maxBidValue) {
      const name = $(".title-and-highlights .title").text();
      const lotNumber = $("#LotNumber").text().trim();
      const vin = $('div[ng-if="!ukVinNumber"] .lot-details-desc').text().trim();
      const details = {
         vin: vin,
         lotNumber: lotNumber,
         name: name
      };
      const title = name + " | " + lotNumber + " | " + vin;
      browser.runtime
         .sendMessage({
            action: "logEvent",
            data: {
               eventType: "preBid",
               tabTitle: title,
               details: JSON.stringify(details),
               metaData: JSON.stringify(details),
               amount: maxBidValue,
               site: "ca_copart"
            },
            site: "ca_copart"
         })
         .catch((error) => {
            console.error("Error sending message:", error);
         });
   }
});
