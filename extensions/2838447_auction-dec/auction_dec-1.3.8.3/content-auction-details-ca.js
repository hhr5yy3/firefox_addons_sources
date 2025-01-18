(async () => {

  // // Ensure the script runs only on paths that start with /lot/
  // if (!isDetailsPage()) {
  //   return;
  // }

 // Helper function to check if the current URL matches the desired pattern
 function isDetailsPage() {
  return window.location.pathname.startsWith('/Vehicles/VehicleDetails');
}
  const { showLoader, hideLoader, createLoader } = await import(
    browser.runtime.getURL("loader.js")
  );

  const {
    loadLocalFile,
    injectCss,
    injectHtmlAfterElement,
    generateCalculatorHtml,
    printErrorMessage,
    clearErrorMessage,
    showCalculatorNoResult,
    limitMaxBid,
    sendPostRequest,
    sendGetRequest
  } = await import(browser.runtime.getURL("helpers.js"));

  const localHtmlPath = "./auctionDetails/auction-details.html"; // Path to the local HTML file in the extension
  const localCssPath = "./styles/auction-details.css"; // Path to the local CSS file in the extension
  const targetId = "divVINInfo"; // ID of the target element where the HTML should be injected after
  const targetErrorContainer = "#adec-location-error";
  const maxBidSelector = "#PreBidAmount";
  const btnPlaceBid = 'input[data-bind*="click: openPrebidConfirm"]'

  function checkLoginStatusAndUpdateCalculator() {
    browser.storage.local.get("storageData", (data) => {
      console.log(data, "storageData")
      if (data?.storageData?.logged_in_ca_iaa) {
        addCalculator();
      } else {
        hideCalculator();
      }
    });
  }

  // Function to add the calculator
  function addCalculator() {
    createLoader("body");
    showLoader();

    // Load and inject CSS
    loadLocalFile(localCssPath)
      .then((cssContent) => injectCss(cssContent))
      .catch((error) => {
        console.error("Error during CSS injection:", error);
      })
      .finally(() => {
        // Load and inject HTML
        loadLocalFile(localHtmlPath)
          .then((htmlContent) => {
            injectHtmlAfterElement(
              targetId,
              htmlContent,
              hideLoader,
              fetchTransportInfo
            );
          })
          .catch((error) => {
            console.error("Error during HTML injection:", error);
          })
          .finally(() => {
            console.log("FINALLY");
            setTimeout(() => {
              hideLoader();
            }, 500);
          });
      });
  }

  // Function to hide the calculator
  function hideCalculator() {
    const calculatorElement = document.querySelector("#auctionDec"); // Use the actual ID of your calculator element
    if (calculatorElement) {
      calculatorElement.remove();
    }
  }

  function extractTown(input) {
    console.log(input, "INPUT")
    let match;
  
    // Case 1: Matches strings with optional leading spaces and "- IAA " or "- " prefix and captures the town name after it
    match = input.match(/^\s*-\s*(?:IAA\s+)?([^,]+)/);
    if (match && match[1]) {
      return match[1].trim();
    }
  
    // Case 2: Matches strings without "- IAA " prefix and captures the first name before the second comma
    match = input.match(/^[^-]*,\s*([^,]+)/);
    if (match && match[1]) {
      return match[1].trim();
    }
  
    return null; // If no match found, return null
  }


  async function fetchTransportInfo(locationValue) {
    const locationText = $("#AuctionDays")
      .find(".preBidData:last")
      .text();



    browser.storage.local.get("userData", async (userData) => {
      console.log(userData, "userDatauserDatauserDatauserData")
      const userId = userData.userId;
      const ownerId = userData?.credentials?.ca_iaa?.owner_id;

      if (locationText.length > 0) {
        let location = extractTown(locationText);

        console.log(location, "Location")

        if (locationValue) {
          location = locationValue;
        }

        const data = {
          location,
          userId,
          ownerId,
          site: "iaai_ca",
        };
        showLoader();

        const response = await sendPostRequest(
          "https://dec.autosrealm.com/api/estimate",
          data
        );

        console.log(response, "response")

        if (response.status === "success" && response.data) {
          const data = response.data;

          const html = generateCalculatorHtml(data);

          $("#adec-calc-content").html("");

          $("#adec-calc-content").append(html);

          $(".accordion-content").hide();
          $(".accordion-header").addClass("collapsed");

          $(".accordion-header").click(function () {
            // Toggle visibility of accordion content
            $(this).next(".accordion-content").slideToggle();

            // Toggle the collapsed class on the header
            $(this).toggleClass("collapsed");
          });
        } else if (response.status === "not_found") {
          const targetId = "#adec-location-error";
          const message = response?.message;
          printErrorMessage(targetId, message);
          showCalculatorNoResult();
        }
        hideLoader();
      }
    });
  }

  function addEventListeners() {
    $(document).on("click", "#adec-request-location-button", function () {
      const locationValue = $("#adec-location").val();
      if (locationValue.trim().length > 0) {
        clearErrorMessage(targetErrorContainer);
        fetchTransportInfo(locationValue);
      }
    });

    const targetId = "#PreBidAmount";
    const message = 'Your bid is bigger than your max bid';
    
    
    async function getMaxBidValue() {
      return new Promise((resolve) => {
        browser.storage.local.get("userData", async (data) => {
          const userId = data.userData?.userId;
          // const userId = 2
          console.log(userId, "userId")
          if (userId) {
            const url = `https://dec.autosrealm.com/api/bids/${userId}/max`;
            const response = await sendGetRequest(url);
            if (response.success) {
              resolve(response);
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        });
      });
    }

    async function fetchAndStoreMaxBid() {
      const responseMaxBid = await getMaxBidValue();
      if (responseMaxBid?.maxBid) {
        const maxBidValue = parseFloat(responseMaxBid.maxBid);
        browser.storage.local.set({ maxBidValue });
        return maxBidValue;
      }
      return undefined
    }

    // async function retrieveMaxBidValue() {
    //   return new Promise((resolve) => {
    //     browser.storage.local.get("maxBidValue", (result) => {
    //       console.log(result, "resultresultresult")
    //       resolve(result.maxBidValue);
    //     });
    //   });
    // }



    $(maxBidSelector).on("keyup", async function() {
      console.log('on Change');
      // let maxBidValue = await retrieveMaxBidValue();
      // if (!maxBidValue) {
      let maxBidValue = await fetchAndStoreMaxBid();
      // }
      console.log(maxBidValue, "maxBidValue");
      if(maxBidValue) {
        limitMaxBid(maxBidValue, this, btnPlaceBid, targetId, message, false, true);
      }
    });
  }

  function init() {
    console.log('Initializing...');
    checkLoginStatusAndUpdateCalculator();

    // Listen for storage changes to detect login/logout events
    browser.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.storageData) {
        checkLoginStatusAndUpdateCalculator();
      }
    });

    addEventListeners();
  }

  $(document).ready(function () {
    if (isDetailsPage()) {
      init();
    }
    observeURLChanges();
  });
  
 
  
  // Function to observe URL changes
  function observeURLChanges() {
    let lastPathname = window.location.pathname;
  
    // Function to check the URL and reinitialize if needed
    const checkURL = () => {
      const currentPathname = window.location.pathname;
      if (currentPathname !== lastPathname) {
        lastPathname = currentPathname;
        if (isDetailsPage()) {
          console.log('URL change detected, re-initializing...');
          init();
        }
      }
    };
  
    // Periodic check in case the URL changes due to user interaction or other reasons
    setInterval(checkURL, 1000);
  }

})();
