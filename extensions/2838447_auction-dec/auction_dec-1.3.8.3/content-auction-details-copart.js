
// (async () => {
//   const initialPath = window.location.pathname;

//   // Function to check if the current path is a lot detail page
//   function isLotDetailPage(pathname) {
//     return pathname.startsWith('/lot/');
//   }

//   // Ensure the script runs only on paths that start with /lot/
//   if (!isLotDetailPage(initialPath)) {
//     return;
//   }

//   function isLoggedIn() {
//     return new Promise((resolve) => {
//       browser.storage.local.get("storageData", (data) => {
//         resolve(data?.storageData?.logged_in_us_copart);
//       });
//     });
//   }

//   const { showLoader, hideLoader, createLoader } = await import(
//     browser.runtime.getURL("loader.js")
//   );

//   const {
//     loadLocalFile,
//     injectCss,
//     injectHtmlAfterElement,
//     generateCalculatorHtml,
//     printErrorMessage,
//     clearErrorMessage,
//     showCalculatorNoResult,
//     limitMaxBid,
//     sendPostRequest,
//     sendGetRequest
//   } = await import(browser.runtime.getURL("helpers.js"));

//   const localHtmlPath = "./auctionDetails/auction-details.html"; // Path to the local HTML file in the extension
//   const localCssPath = "./styles/auction-details.css"; // Path to the local CSS file in the extension
//   const targetId = "sale-light-tour-step5"; // ID of the target element where the HTML should be injected after
//   const maxBidSelector = "#your-max-bid";
//   const btnPlaceBid = ".bidnow-button";
//   const targetErrorContainer = "#adec-location-error";

//   function debounce(func, wait) {
//     let timeout;
//     return function (...args) {
//       const later = () => {
//         clearTimeout(timeout);
//         func(...args);
//       };
//       clearTimeout(timeout);
//       timeout = setTimeout(later, wait);
//     };
//   }

//   function checkLoginStatusAndUpdateCalculator() {
//     browser.storage.local.get("storageData", (data) => {
//       console.log(data, "storageData");
//       if (data?.storageData?.logged_in_us_copart) {
//         setTimeout(() => {
//           addCalculator();
//         }, 3000);
//       } else {
//         hideCalculator();
//       }
//     });
//   }

//   // Function to add the calculator
//   function addCalculator() {
//     if (document.querySelector("#auctionDec")) {
//       // If the calculator is already present, do nothing
//       return;
//     }

//     createLoader("body");
//     showLoader();

//     // Load and inject CSS
//     loadLocalFile(localCssPath)
//       .then((cssContent) => injectCss(cssContent))
//       .catch((error) => {
//         console.error("Error during CSS injection:", error);
//       })
//       .finally(() => {
//         // Load and inject HTML
//         loadLocalFile(localHtmlPath)
//           .then((htmlContent) => {
//             injectHtmlAfterElement(
//               targetId,
//               htmlContent,
//               hideLoader,
//               fetchTransportInfo
//             );
//           })
//           .catch((error) => {
//             console.error("Error during HTML injection:", error);
//           })
//           .finally(() => {
//             console.log("FINALLY");
//             setTimeout(() => {
//               hideLoader();
//             }, 500);
//           });
//       });
//   }

//   // Function to hide the calculator
//   function hideCalculator() {
//     const calculatorElement = document.querySelector("#auctionDec"); // Use the actual ID of your calculator element
//     if (calculatorElement) {
//       calculatorElement.remove();
//     }
//   }

//   async function fetchTransportInfo(locationValue) {
//     const locationText = $("#sale-information-block")
//       .find(".panel-content")
//       .find(".lot-details-desc")
//       .find('[data-uname="lotdetailSaleinformationlocationvalue"]')
//       .text();

//     browser.storage.local.get("userData", async (userData) => {
//       const userId = userData?.userId;
//       const ownerId = userData?.credentials?.us_copart?.owner_id;

//       if (locationText.length > 0) {
//         let location = locationText.split(" - ")[0];

//         if (locationValue) {
//           location = locationValue;
//         }
//         const data = {
//           location,
//           userId,
//           ownerId,
//           site: "copart_us",
//         };
//         showLoader();

//         const response = await sendPostRequest(
//           "https://dec.autosrealm.com/api/estimate",
//           data
//         );

//         if (response.status === "success" && response.data) {
//           const data = response.data;

//           const html = generateCalculatorHtml(data);

//           $("#adec-calc-content").html("");

//           $("#adec-calc-content").append(html);

//           $(".accordion-content").hide();
//           $(".accordion-header").addClass("collapsed");

//           $(".accordion-header").click(function () {
//             // Toggle visibility of accordion content
//             $(this).next(".accordion-content").slideToggle();

//             // Toggle the collapsed class on the header
//             $(this).toggleClass("collapsed");
//           });
//         } else if (response.status === "not_found") {
//           const targetId = "#adec-location-error";
//           const message = response?.message;
//           clearErrorMessage(targetErrorContainer);
//           printErrorMessage(targetId, message);
//           showCalculatorNoResult();
//         }
//         hideLoader();
//       } else {
//         const targetId = "#adec-location-error";
//         const message = "Cannot find cost estimate for the given location";

//         printErrorMessage(targetId, message);
//         showCalculatorNoResult();
//       }
//     });
//   }

//   function addEventListeners() {
//     $(document).on("click", "#adec-request-location-button", function () {
//       const locationValue = $("#adec-location").val();
//       if (locationValue.trim().length > 0) {
//         clearErrorMessage(targetErrorContainer);
//         fetchTransportInfo(locationValue);
//       }
//     });

//     const targetId = "#your-max-bid";
//     const maxBidInput = "#max-bid";
//     const message = 'Your bid is bigger than your max bid';

//     async function getMaxBidValue() {
//       return new Promise((resolve) => {
//         browser.storage.local.get("userData", async (data) => {
//           // const userId = data.userData?.userId;
//           const userId = 2
//           console.log(userId, "userId")
//           if (userId) {
//             const url = `https://dec.autosrealm.com/api/bids/${userId}/max`;
//             const response = await sendGetRequest(url);
//             if (response.success) {
//               resolve(response);
//             } else {
//               resolve(null);
//             }
//           } else {
//             resolve(null);
//           }
//         });
//       });
//     }

//     async function fetchAndStoreMaxBid() {
//       const responseMaxBid = await getMaxBidValue();
//       if (responseMaxBid?.maxBid) {
//         const maxBidValue = parseFloat(responseMaxBid.maxBid);
//         browser.storage.local.set({ maxBidValue });
//         return maxBidValue;
//       }
//     }

//     // async function retrieveMaxBidValue() {
//     //   return new Promise((resolve) => {
//     //     browser.storage.local.get("maxBidValue", (result) => {
//     //       console.log(result, "resultresultresult")
//     //       resolve(result.maxBidValue);
//     //     });
//     //   });
//     // }

//     if($(maxBidSelector).length > 0) {

//       $(maxBidSelector).on("keyup", async function (e) {
//         console.log('on Change');

//         const value = e.target.value;

//         if(value.trim().length > 0) {
//           console.log(value, "Value > 0");
//           let maxBidValue = await fetchAndStoreMaxBid();
//           if(maxBidValue) {
//             limitMaxBid(maxBidValue, this, btnPlaceBid, targetId, message, true);
//           }
//         }
//       });
//     }

//     if ($(maxBidInput).length > 0) {

//       $(maxBidInput).on("keyup", async function (e) {
//         console.log('max bid on Change');

//        const value = e.target.value;

//         if(value.trim().length > 0) {
//           console.log(value, "maxBidInput Value > 0");
//           let maxBidValue = await fetchAndStoreMaxBid();
//           if(maxBidValue) {
//             limitMaxBid(maxBidValue, this, btnPlaceBid, targetId, message, true);
//           }
//         }
//       });
//     }
//   }

//   // Initial check when the document is ready
//   function init() {
//     checkLoginStatusAndUpdateCalculator();

//     // Listen for storage changes to detect login/logout events
//     browser.storage.onChanged.addListener((changes, area) => {
//       if (area === "local" && changes.storageData) {
//         checkLoginStatusAndUpdateCalculator();
//       }
//     });

//     addEventListeners();
//   }

//   // Call the init function when the document is ready
//   $(document).ready(function () {
//     init();


//   });

//   // Function to observe DOM changes and re-apply the calculator logic
//   function observeDOMChanges() {
//     const observer = new MutationObserver(debounce(async (mutations) => {
//       const loggedIn = await isLoggedIn();
//       // Check if the calculator is already present
//       if (isLotDetailPage(window.location.pathname) && !document.querySelector("#auctionDec") && loggedIn) {
//         console.log('DOM change detected, re-initializing...');
//         init();
//       }
//     }, 1000));

//     // Start observing the document for changes
//     observer.observe(document, {
//       childList: true,
//       subtree: true,
//     });

//     // Check for URL changes using popstate event
//     window.addEventListener('popstate', async () => {
//       const loggedIn = await isLoggedIn();
//       if (isLotDetailPage(window.location.pathname) && loggedIn) {
//         console.log('URL change detected, re-initializing...');
//         init();
//       }
//     });
//   }

//   // Call the function to observe DOM changes
//   observeDOMChanges();
// })();



(async () => {
  const initialPath = window.location.pathname;

  function isLotDetailPage(pathname) {
    return pathname.startsWith('/lot/');
  }

  if (!isLotDetailPage(initialPath)) {
    return;
  }

  function isLoggedIn() {
    return new Promise((resolve) => {
      browser.storage.local.get("storageData", (data) => {
        resolve(data?.storageData?.logged_in_us_copart);
      });
    });
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

  const localHtmlPath = "./auctionDetails/auction-details.html"; 
  const localCssPath = "./styles/auction-details.css"; 
  const targetId = "sale-light-tour-step5"; 
  const maxBidSelector = "#your-max-bid";
  const btnPlaceBid = ".bidnow-button";
  const targetErrorContainer = "#adec-location-error";

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function checkLoginStatusAndUpdateCalculator() {
    browser.storage.local.get("storageData", (data) => {
      console.log(data, "storageData");
      if (data?.storageData?.logged_in_us_copart) {
        setTimeout(() => {
          addCalculator();
        }, 3000);
      } else {
        // hideCalculator();
      }
    });
  }

  function addCalculator() {
    if (document.querySelector("#auctionDec")) {
      return;
    }

    createLoader("body");
    showLoader();

    loadLocalFile(localCssPath)
      .then((cssContent) => injectCss(cssContent))
      .catch((error) => {
        console.error("Error during CSS injection:", error);
      })
      .finally(() => {
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

  function hideCalculator() {
    const calculatorElement = document.querySelector("#auctionDec");
    if (calculatorElement) {
      calculatorElement.remove();
    }
  }

  async function fetchTransportInfo(locationValue) {
    const locationText = $("#sale-information-block")
      .find(".panel-content")
      .find(".lot-details-desc")
      .find('[data-uname="lotdetailSaleinformationlocationvalue"]')
      .text();

    browser.storage.local.get("userData", async (userData) => {
      const userId = userData.userData?.userId;
      const ownerId = userData.userData?.credentials?.us_copart?.owner_id;

      if (locationText.length > 0) {
        let location = locationText.split(" - ")[0];

        if (locationValue) {
          location = locationValue;
        }
        const data = {
          location,
          userId,
          ownerId,
          site: "copart_us",
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
            $(this).next(".accordion-content").slideToggle();
            $(this).toggleClass("collapsed");
          });
        } else if (response.status === "not_found") {
          const targetId = "#adec-location-error";
          const message = response?.message;
          clearErrorMessage(targetErrorContainer);
          printErrorMessage(targetId, message);
          showCalculatorNoResult();
        }
        hideLoader();
      } else {
        const targetId = "#adec-location-error";
        const message = "Cannot find cost estimate for the given location";

        printErrorMessage(targetId, message);
        showCalculatorNoResult();
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

    $(document).on("keyup", maxBidSelector, async function (e) {
      console.log('on Change');
      let maxBidValue = await fetchAndStoreMaxBid();
      if(maxBidValue) {
        limitMaxBid(maxBidValue, this, btnPlaceBid, maxBidSelector, 'Your bid is bigger than your max bid', true);
      }
    });

    $(document).on("keyup", "#max-bid", async function (e) {
      console.log('max bid on Change');
      let maxBidValue = await fetchAndStoreMaxBid();
      if(maxBidValue) {
        limitMaxBid(maxBidValue, this, btnPlaceBid, "#max-bid", 'Your bid is bigger than your max bid', true);
      }
    });
  }

  async function getMaxBidValue() {
    return new Promise((resolve) => {
      browser.storage.local.get("userData", async (data) => {
        // const userId = data.userData?.userId;
        const userId = 2;
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
  }

  function init() {
    checkLoginStatusAndUpdateCalculator();
    browser.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes.storageData) {
        checkLoginStatusAndUpdateCalculator();
      }
    });
    addEventListeners();
  }

  $(document).ready(function () {
    init();
  });

  function observeDOMChanges() {
    const observer = new MutationObserver(debounce(async (mutations) => {
      const loggedIn = await isLoggedIn();
      if (isLotDetailPage(window.location.pathname) && !document.querySelector("#auctionDec") && loggedIn) {
        console.log('DOM change detected, re-initializing...');
        init();
      }
    }, 1000));

    observer.observe(document, {
      childList: true,
      subtree: true,
    });

    window.addEventListener('popstate', async () => {
      const loggedIn = await isLoggedIn();
      if (isLotDetailPage(window.location.pathname) && loggedIn) {
        console.log('URL change detected, re-initializing...');
        init();
      }
    });
  }

  observeDOMChanges();
})();
