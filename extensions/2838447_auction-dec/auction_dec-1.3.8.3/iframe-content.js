// manifest.json remains the same

// content.js
const interceptEvents = ["click", "submit"];

interceptEvents.forEach(eventType => {
   document.addEventListener(eventType, function(event) {
      const target = event.target;
      const details = {
         type: eventType,
         timestamp: new Date().toISOString(),
         frameId: window.frameElement ? window.frameElement.id : "main",
         elementInfo: {
            tagName: target.tagName,
            id: target.id,
            className: target.className,
            type: target.type,
            name: target.name,
            value: target.value,
            href: target.href || null,
            innerText: target.innerText?.substring(0, 100)
         },
         coordinates: {
            x: event.clientX,
            y: event.clientY
         }
      };

      if (eventType === "submit" && target.tagName === "FORM") {
         details.formData = Array.from(new FormData(target)).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
         }, {});
      }
      browser.runtime.sendMessage({ command: "capture_screenshot" });
   }, true);
});


// Add mutation observer for dynamically added elements
const observer = new MutationObserver(mutations => {
   mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
         if (node.nodeType === 1) { // Element node
            attachEventListeners(node);
         }
      });
   });
});

observer.observe(document.body, {
   childList: true,
   subtree: true
});

// Helper function to attach listeners to dynamic elements
function attachEventListeners(element) {
   if (element.tagName === "BUTTON" || element.tagName === "A" || element.tagName === "FORM") {
      interceptEvents.forEach(eventType => {
         element.addEventListener(eventType, event => {
            // Prevent default only for testing if needed
            // event.preventDefault();
         });
      });
   }
}

function logAutoBid(futureLotArea) {
   // Pass element as parameter to avoid undefined reference
   const bidAmount = futureLotArea.querySelector(".ui-g input[data-uname='futureLotBidAmount']")?.value;

   // Using exact class structure from HTML
   const lotDetails = futureLotArea.querySelector("future-lot-details");
   const titleElement = lotDetails?.querySelector("p.txtlbl.ellipsis[title]");
   const [year, make, ...modelParts] = titleElement?.title?.split(" ") || [];
   const model = modelParts.join(" ");

   // Using more specific selectors based on HTML
   const lotNumber = lotDetails?.querySelector("a[href*='/lot/']")?.textContent?.trim();
   const itemNumber = lotDetails?.querySelector(".not-expanded-position span[style*='font-weight: bold']")?.textContent?.trim();

   browser.runtime.sendMessage({
      action: "logEvent",
      data: {
         eventType: "autoBid",
         tabTitle: `${year} ${make} ${model} - ${lotNumber}` + getBrowserType(),
         amount: bidAmount?.replace(/[^0-9.]/g, ""),
         details: JSON.stringify({
            title: titleElement?.title,
            year,
            make,
            model,
            lotNumber,
            itemNumber,
            amount: bidAmount?.replace(/[^0-9.]/g, "")
         }),
         metaData: JSON.stringify({
            timestamp: new Date().toISOString(),
            buttonClicked: "Max Bid",
            url: window.location.href
         })
      },
      site: getCopartEnvironment(window.location.hostname),
   });

   browser.runtime.sendMessage({ command: "capture_screenshot" });
}

document.addEventListener("click", function(event) {
   const element = event.target;

   if (element.tagName === "BUTTON" ||
      (element.tagName === "INPUT" && ["button", "submit", "reset"].includes(element.type)) ||
      element.tagName === "A") {

      // Skip Join/Re-Join buttons
      if (element.tagName === "BUTTON") {
         const buttonText = element.innerText?.trim().replace(/\s+/g, " ");
         if (buttonText === "Join" || buttonText === "Re-Join") {
            return;
         }
      }
      const isMaxBid = element.tagName === "BUTTON" && element.innerText.trim() === "Max Bid";
      const isMinusBtn = element.classList.contains("btn-minus") && element.dataset.uname === "getPrevBidValue";
      const isPlusBtn = element.classList.contains("btn-plus") && element.dataset.uname === "getNextBidValue";

      // Check if element if it's AutoBid
      if (isMaxBid || isMinusBtn || isPlusBtn) {
         const futureLotArea = element.closest("future-lot-area");
         if (futureLotArea) {
            return logAutoBid(futureLotArea);
         } else {
            browser.runtime.sendMessage({ command: "capture_screenshot" });
         }
      }

      // Find closest gridster-item
      const gridsterItem = element.closest("gridster-item");
      if (!gridsterItem) return;

      // Extract details from closest container
      const titleDiv = gridsterItem.querySelector("div.titlelbl[title]");
      const [year, make, ...modelParts] = titleDiv?.title?.split(" ") || [];
      const model = modelParts.join(" "); // Handle multi-word models

      const lotNumber = gridsterItem.querySelector("a[data-uname=\"lot-details-value\"]")?.textContent;
      const itemNumber = gridsterItem.querySelector("span[data-uname=\"lot-details-value\"]")?.textContent;
      const bidAmountInput = gridsterItem.querySelector("input[data-uname=\"bidAmount\"]");

      let bidAmount;
      const bidForm = element.closest("form");
      if (bidForm) {
         bidAmount = bidForm.querySelector("input[aria-label=\"bid Amount\"], input[aria-label=\"bid amount\"]")?.value?.replace(/[^0-9.]/g, "");
      }
      // Fallback to general bid amount if not found in form
      if (!bidAmount) {
         bidAmount = gridsterItem.querySelector("input[data-uname=\"bidAmount\"]")?.value?.replace(/[^0-9.]/g, "");
      }

      const vehicleDetails = {
         title: titleDiv?.title,
         year,
         make,
         model,
         lotNumber,
         itemNumber,
         amount: bidAmount
      };

      if (element.tagName === "BUTTON") {
         browser.runtime.sendMessage({
            action: "logEvent",
            data: {
               eventType: "liveBid",
               tabTitle: `${year} ${make} ${model} - ${lotNumber}` + getBrowserType(),
               amount: vehicleDetails.amount,
               details: JSON.stringify(vehicleDetails),
               metaData: JSON.stringify({
                  timestamp: new Date().toISOString(),
                  buttonClicked: element.innerText,
                  url: window.location.href
               })
            },
            site: getCopartEnvironment(window.location.hostname)
         });
      }

      browser.runtime.sendMessage({ command: "capture_screenshot" });
   }
});

function extractText(selector) {
   return document.querySelector(selector)?.textContent?.trim() || null;
}

function getCopartEnvironment(hostname) {
   switch (hostname) {
      case 'g2auction.copart.com':
         return 'us_copart';
      case 'g2auction.copart.ca':
         return 'ca_copart';
      default:
         return null; // or you could return a default value
   }
}

function getBrowserType() {
   return isMobileDevice() ? " - [Mobile]" : " - [Web]";
}

function isMobileDevice() {
   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function findClosestVehicleDetails(element) {
   return element.closest("[data-uname=\"vehicleDetails\"]");
}
