(async () => {
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
    sendGetRequest,
    isMobileDevice
  } = await import(browser.runtime.getURL("helpers.js"));

  const localHtmlPath = "./auctionDetails/auction-details.html"; // Path to the local HTML file in the extension
  const localCssPath = "./styles/auction-details.css"; // Path to the local CSS file in the extension
  const targetId = "vdActionInfo"; // ID of the target element where the HTML should be injected after
  const targetErrorContainer = "#adec-location-error";
  const maxBidSelector = "#MaxBid";
  const btnPlaceBid = "#btnPlaceBid"

  function checkLoginStatusAndUpdateCalculator() {
    console.log('CHECK?')
  
    browser.storage.local.get("storageData", (data) => {
      console.log(data, "storageData")
      if (data?.storageData?.logged_in_us_iaa) {
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

  function showFallbackLocationInput(response) {
    const targetId = "#adec-location-error";
    const message = response?.message || "Cannot find cost estimate for the given location";
    printErrorMessage(targetId, message);
    showCalculatorNoResult();
  }

  async function fetchTransportInfo(locationValue) {
    const locationTextMobile = $('#js-waypoint-trigger').find(".data-list__item").eq(1).find('.data-list__value').text();
    
    const locationTextDesktop = $(".data-container")
    .find(".tile.tile--data:first")
    .find(".tile-body")
    .find(".data-list.data-list--details")
    .find(".data-list__item")
    .eq(1)
    .find(".data-list__value")
    .text();

    console.log(locationTextMobile, "locationTextMobile")

    const locationText = isMobileDevice() ?  locationTextMobile: locationTextDesktop

    browser.storage.local.get("userData", async (userData) => {
      const userId = userData.userData.userId;
      const ownerId = userData.userData?.credentials?.us_iaa?.owner_id;
      if (locationText.length > 0) {
        let location = locationText.split(" ")[0];

        if (locationValue) {
          location = locationValue;
        }

        const data = {
          location,
          userId,
          ownerId,
          site: "iaai_us",
        };
        showLoader();

        const response = await sendPostRequest(
          "https://dec.autosrealm.com/api/estimate",
          data
        );

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
          // const targetId = "#adec-location-error";
          // const message = response?.message;
          // printErrorMessage(targetId, message);
          // showCalculatorNoResult();

          showFallbackLocationInput(response);
        }
        hideLoader();
      } else {
        // showCalculatorNoResult();
        console.log('Fallback')
        showFallbackLocationInput()
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

    const targetId = "#outbidamtneededlabel";
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
    
    $(maxBidSelector).on("keyup", async function() {
      console.log('on Change')

      let maxBidValue = await fetchAndStoreMaxBid();
      console.log(maxBidValue, "maxBidValue");
      if(maxBidValue) {
        limitMaxBid(maxBidValue, this, btnPlaceBid, targetId, message); 
      }
    });
  }

  // Initial check when the document is ready
  $(document).ready(function () {
    checkLoginStatusAndUpdateCalculator();

    // Listen for storage changes to detect login/logout events
    browser.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.storageData) {
        checkLoginStatusAndUpdateCalculator();
      }
    });

    addEventListeners();
  });
})();
