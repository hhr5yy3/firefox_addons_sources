export async function loadLocalFile(filePath) {
  const response = await fetch(browser.runtime.getURL(filePath));
  if (!response.ok) {
    throw new Error("Failed to fetch CSS content");
  }
  return await response.text();
}

export function injectCss(cssContent) {
  const style = document.createElement("style");
  style.textContent = cssContent;
  document.head.appendChild(style);
}

export function injectHtmlAfterElement(
  targetId,
  htmlContent,
  hideLoader,
  callbackFn
) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.insertAdjacentHTML("afterend", htmlContent);
    if (callbackFn) {
      callbackFn();
    }
  } else {
    hideLoader();
    console.error("Target element not found for injection");
  }
}

export function generateCalculatorHtml(data) {
  const cheapestTotalPrice =
    +data.cheapest_price +
    (+data.service_fee || 0) +
    (+data.ocean_transport || 0);

  let html = `
        <div>
            <div class="adec-calc-multiblock">
              <div class="adec-calc-block">
                <div class="adec-calc-block_label">
                  Location:
                  <span id="adec_location" class="bold"
                    >${data.auction_location}</span
                  >
                </div>
              </div>
              <div class="adec-calc-block">
                <div class="adec-calc-block_label">
                  City:
                  <span id="adec-city" class="bold">${data.city}</span>
                </div>
              </div>
              <div class="adec-calc-block">
                <div class="adec-calc-block_label">
                  State:
                  <span id="adec-state" class="bold">${data.state}</span>
                </div>
              </div>
              <div class="adec-calc-block">
                <div class="adec-calc-block_label">
                  Cheapest price:
                  <span id="adec-price" class="bold">$${
                    data.cheapest_price
                  }</span>
                </div>
              </div>
              <div class="adec-calc-block">
                <div class="adec-calc-block_label">
                  Terminal:
                  <span id="adec-terminal" class="bold"
                    >${data.cheapest_terminal}</span
                  >
                </div>
              </div>
              <div class="adec-calc-block">
                <div class="adec-calc-block_label">
                  Service fee:
                  <span id="adec-service-fee" class="bold"
                    >$${data.service_fee ? data.service_fee : ""}</span
                  >
                </div>
              </div>
              <div class="adec-calc-block">
                <div class="adec-calc-block_label">
                  Ocean transport:
                  <span id="adec-ocean-transport" class="bold"
                    >$${data.ocean_transport ? data.ocean_transport : ""}</span
                  >
                </div>
              </div>
            </div>
            <div class="adec-calc-block">
              <div class="adec-calc-block_label total-price">
                Total:
                <span class="bold">$${cheapestTotalPrice}</span>
              </div>
            </div>
          </div>
  `;

  html += `<div class="prices-accordion">`;
  data.prices.slice(1).forEach((price) => {
    // Calculate total price for each price item
    const totalPrice = (
      +price.price +
      (+price.service_fee || 0) +
      (+price.ocean_transport || 0)
    ).toFixed(2);

    html += `
          <div class="accordion-item panel-bidder-eligibilty">
            <div class="accordion-header learn-more">
              <span class="accordion-toggle"
                >Terminal: ${price.terminal}</span
              >
              <span class="icon icon-arrow"></span>
            </div>
            <div class="accordion-content">
              <div class="grid-2">
                <div class="adec-calc-block">
                  <div class="adec-calc-block_label">
                    Price:
                    <span class="bold">$${price.price}</span>
                  </div>
                </div>
                <div class="adec-calc-block">
                  <div class="adec-calc-block_label">
                    Service fee:
                    <span class="bold"
                      >$${price.service_fee ? price.service_fee : ""}</span
                    >
                  </div>
                </div>
                <div class="adec-calc-block">
                  <div class="adec-calc-block_label">
                    Ocean transport:
                    <span class="bold"
                      >$${
                        price.ocean_transport ? price.ocean_transport : ""
                      }</span
                    >
                  </div>
                </div>
              </div>
              <div class="adec-calc-block">
                <div class="adec-calc-block_label total-price">
                  Total Price:
                  <span class="bold">$${totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
      `;
  });
  html += `</div>`;

  return html;
}

export async function sendPostRequest(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST", // Specify the request method
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify(data), // Convert the data to a JSON string
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    // Parse the JSON response
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export async function sendGetRequest(url, params = {}) {
  try {
    // Construct query string from params object
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const response = await fetch(fullUrl, {
      method: "GET", // Specify the request method
      headers: {
        "Content-Type": "application/json", // Specify the content type
      }
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    // Parse the JSON response
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}


export function printErrorMessage(targetElement, message, appendAfterParent = false, appendAfterElement = false) {
  const errorMessageSpan = $(`<span class="adec-errors">${message}</span>`);
  if(appendAfterParent) {
    $(targetElement).parent().after(errorMessageSpan);  
  } else if(appendAfterElement) {
    $(targetElement).after(errorMessageSpan);
  }else {
    $(targetElement).append(errorMessageSpan);
  }
}

export function clearErrorMessage(targetElement, clearAfterParent = false, clearAfterElement = false) {
  if(clearAfterParent )  {
    $(targetElement).parent().next('.adec-errors').html("");
  }else if(clearAfterElement) {
    $(targetElement).next('.adec-errors').remove();
  }else{
    $(targetElement).empty();
  }
}

export function showCalculatorNoResult() {
  const calculatorNoResult = $("#adec-calc-no-result");
  if (calculatorNoResult.hasClass("hidden")) {
    calculatorNoResult.removeClass("hidden");
  }
}

export function limitMaxBid(maxBidLimit, maxBidInput, maxBidBtn, targetErrorElement, message, appendParentAfter, afterElement) {
  const maxBidValue = $(maxBidInput)?.val();
  clearErrorMessage(targetErrorElement, appendParentAfter, afterElement);
  if(maxBidValue && parseFloat(maxBidValue) > maxBidLimit) { 
    $(maxBidBtn).addClass('hidden');
    printErrorMessage(targetErrorElement, message, appendParentAfter, afterElement)
  } else if($(maxBidBtn).hasClass('hidden')) {
    $(maxBidBtn).removeClass('hidden')
    clearErrorMessage(targetErrorElement, appendParentAfter, afterElement);
  }
}