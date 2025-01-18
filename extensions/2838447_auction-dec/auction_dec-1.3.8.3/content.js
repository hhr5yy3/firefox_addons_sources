browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "performLogin") {
        function tryLogin() {
            const emailField = document.querySelector("#Email"); // Update the selector
            const passwordField = document.querySelector("#Password"); // Update the selector
            const loginButton = document.querySelector(".login-form__submit .btn-primary"); // Updated selector
            const form = document.getElementById("account"); // Get the form by its ID
            if (emailField && passwordField && loginButton) {
                emailField.value = request.username;
                passwordField.value = request.password;
                emailField.setAttribute("autocomplete", "off");
                passwordField.setAttribute("autocomplete", "new-123123");
                form.submit();
                clearInterval(intervalId);
                // setTimeout(() => {
                emailField.value = "";
                passwordField.value = "";
                // }, 5);
            } else {
                // If the page is not fully loaded, try again after a short delay
                // setTimeout(tryLogin, 500);
            }
        }

        const intervalId = setInterval(() => {
            tryLogin();
        }, 200);
    }
});

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

let preBidsContainer = document.getElementById("divdialog");
if (isMobileDevice()) {
    preBidsContainer = document.getElementById("auctionRunlist-container");
}

function getBrowserType() {
    return isMobileDevice() ? " - [Mobile]" : " - [Web]";
}

// let preBidsContainer = document.getElementById('divVehicleDetails');
// let htmlDivElement = document.getElementById('bpPageTest');
let htmlDivElement = document.getElementById("vddetails");
let liveBidHost = document.getElementById("Host");
const btnBuyNow = document.getElementById("buynow");
if (liveBidHost) {
    const liveBidObserver = new MutationObserver((mutations, obs) => {
        let innerHTML = "";
        let innerText = "";
        obs.disconnect();
        liveBidHost.addEventListener("click", function (event) {
            const clickedElementBid = event.target;
            const actionName2 = clickedElementBid.getAttribute("data-actionname");
            if (actionName2 === "PlaceBid") {
                const bidDetails =
                    clickedElementBid.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerText;
                const lines = bidDetails.split("\n");
                const regex = /^(\d{4})\s(\w+)\s(.+)/;
                let output = "";
                for (let line of lines) {
                    const match = line.match(regex);
                    if (match) {
                        const year = match[1];
                        const make = match[2];
                        const model = match[3];
                        output = `${year} ${make} ${model}`;
                        break;
                    }
                }
                const currentHighBidString = lines.find((line) => line.startsWith("CURRENT HIGH BID"));
                let currentHighBidAmount = "";

                if (currentHighBidString) {
                    const match = currentHighBidString.match(/\$([\d,]+)/);
                    if (match) {
                        currentHighBidAmount = match[1]; // match[1] contains the first capturing group, excluding the dollar sign
                    }
                }
                browser.runtime.sendMessage({
                    action: "logEvent",
                    data: {
                        eventType: "liveBid",
                        tabTitle: output + getBrowserType(),
                        amount: currentHighBidAmount ?? null,
                        details: JSON.stringify(lines),
                        metaData: JSON.stringify(lines)
                    },
                    site: "ca_iaa"
                });
            }
        });

        liveBidHost.addEventListener("click", function (event) {
            var bidInput = document.querySelector("input.js-detail-autoBid");
            const clickedElement = event.target;
            if (clickedElement.tagName === "BUTTON") {
                const actionName = clickedElement.getAttribute("data-actionname");
                if (actionName === "PlaceAutoBidFromDetail") {
                    let html = clickedElement.parentElement.parentElement.parentElement;
                    innerHTML = html.innerHTML;
                    innerText = html.innerText;
                }
                if (actionName === "ModifyAutoBidFromDetail") {
                    let html = clickedElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    innerHTML = html.innerHTML;
                    innerText = html.innerText;
                }

                const parser = new DOMParser();
                const doc = parser.parseFromString(innerHTML, "text/html");
                const yearSpan = doc.querySelector(".vehicle-name__year");
                const makeSpan = doc.querySelector(".vehicle-name__make");
                const modelSpan = doc.querySelector(".vehicle-name__model");
                const formattedStr = innerText.replace(/\\n/g, "\n");
                const lines = formattedStr.split("\n");
                const thirdLine = lines[2];
                if (actionName === "AutoBidConfirmationPlaceBid" || actionName === "AutoBidConfirmationModifyBid") {
                    const bidAreaDiv = document.querySelector("div.bid-area.bid-area--autobid");
                    if (bidAreaDiv) {
                        bidInput = bidAreaDiv.querySelector('input[type="text"]');
                    }
                    browser.runtime.sendMessage({
                        action: "logEvent",
                        data: {
                            eventType: "autoPreBid",
                            tabTitle: yearSpan.innerText + " " + makeSpan.innerText + " " + modelSpan.innerText + getBrowserType(),
                            amount: parseFloat(bidInput.value.replace(/,/g, ".")),
                            details: formattedStr,
                            metaData: JSON.stringify(lines)
                        },
                        site: "ca_iaa"
                    });
                }
            }
        });
    });
    liveBidObserver.observe(liveBidHost, {
        childList: true,
        subtree: true
    });
}

function findClosestDiv(element) {
    return element.closest(".current-vehicle");
}

async function isLoggedIn() {
    const isLoggedOut = await browser.storage.local.get('loggedOut');
    browser.storage.local.get('userData').then((result) => {
        if (!result.userData || Object.keys(result.userData).length === 0) {
            browser.runtime.sendMessage({action: "logoutFromExtension", site: 'ca_iaa'}).catch(console.error);
        } else {
            console.log('user is logged in');
        }
    }).catch(console.error);
}

if (htmlDivElement) {
    isLoggedIn();
    const observer = new MutationObserver((mutations, obs) => {
        const submitButton = document.querySelector('input[data-bind*="SubmitPreBidDialog"]');
        const preBidAmountElement = document.querySelector('span[data-bind*="PreBidAmountVal"]');
        const submitByNowDialog = document.querySelector('input[data-bind*="click: SubmitBuyNowDialog"]');
        const btnBuyNow = document.getElementById("buynow");
        const timedAuctionBtn = document.querySelector('.taBidArea input[data-bind*="click: taPlaceBidClick"]');
        if (timedAuctionBtn) {
            isLoggedIn();
            timedAuctionBtn.addEventListener('click', function () {
                const bidSpan = document.querySelector('span.highestBid[data-bind*="taBidConfirmationAmount"]');
                const rawValue = bidSpan.textContent;  // Gets "$1.00 CAD"
                const amount = parseFloat(rawValue.replace(/[^0-9.]/g, '')) || 'N/A';
                // Find the common parent #taAuctionDetails and then navigate to the bid input
                browser.runtime.sendMessage({
                    action: 'logEvent',
                    data: {
                        eventType: 'preBid',
                        tabTitle: '[Timed Auction] ' + document.title + getBrowserType(),
                        details: JSON.stringify(window.location.href),
                        metaData: JSON.stringify(window.location.href),
                        amount: amount
                    },
                    site: 'ca_iaa'
                }).then(() => {
                    console.log('Message sent with amount:', amount);
                }).catch((error) => {
                    console.error('Error sending message:', error);
                });
            });

        }
        observer.disconnect();
        if (submitButton && preBidAmountElement) {
            submitButton.addEventListener("click", () => {
                let preBidAmount = preBidAmountElement.textContent.trim();
                preBidAmount = extractAndConvertToNumber(preBidAmount);
                // CA IAA requires to be >25 CAD
                if (preBidAmount >= 1) {
                    browser.runtime
                        .sendMessage({
                            action: "logEvent",
                            data: {
                                eventType: "preBid",
                                tabTitle: document.title + getBrowserType(),
                                details: null,
                                metaData: null,
                                amount: preBidAmount
                            },
                            site: "ca_iaa"
                        })
                        .then(() => {
                        })
                        .catch((error) => {
                            console.error("Error sending message:", error);
                        });
                }
            });
        }
        if (submitByNowDialog) {
            submitByNowDialog.addEventListener("click", function () {
                browser.runtime
                    .sendMessage({
                        action: "logEvent",
                        data: {
                            eventType: "buyNow",
                            tabTitle: document.title + getBrowserType(),
                            details: JSON.stringify(window.location.href),
                            metaData: JSON.stringify(window.location.href),
                            amount: null
                        },
                        site: "ca_iaa"
                    })
                    .then(() => {
                    })
                    .catch((error) => {
                        console.error("Error sending message:", error);
                    });
            });
        }
    });
    observer.observe(htmlDivElement, {
        childList: true,
        subtree: true
    });
}

if (preBidsContainer) {
    isLoggedIn();
    const observer = new MutationObserver((mutations) => {
        const submitButton = document.querySelector('input[data-bind*="SubmitPreBidDialog"]');
        let preBidAmountElement = document.querySelector('span[data-bind*="PreBidAmountVal"]');
        let preBidAmountElementMobile = document.getElementById("PreBidAmount");
        const submitByNowDialog = document.querySelector('input[data-bind*="click: SubmitBuyNowDialog"]');
        const preBidConfirmMobile = document.querySelector('input[data-bind*="click: openPrebidConfirm"]');
        const btnBuyNow = document.getElementById("buynow");
        const timedAuctionBtn = document.querySelector('.taBidArea input[data-bind*="click: taPlaceBidClick"]');
        if (timedAuctionBtn) {
            isLoggedIn();
            timedAuctionBtn.addEventListener('click', function () {
                const bidSpan = document.querySelector('span.highestBid[data-bind*="taBidConfirmationAmount"]');
                const rawValue = bidSpan.textContent;  // Gets "$1.00 CAD"
                const amount = parseFloat(rawValue.replace(/[^0-9.]/g, ''));
                // Find the common parent #taAuctionDetails and then navigate to the bid input
                browser.runtime.sendMessage({
                    action: 'logEvent',
                    data: {
                        eventType: 'preBid',
                        tabTitle: '[Timed Auction] ' + document.title + getBrowserType(),
                        details: JSON.stringify(window.location.href),
                        metaData: JSON.stringify(window.location.href),
                        amount: amount
                    },
                    site: 'ca_iaa'
                }).then(() => {
                    console.log('Message sent with amount:', amount);
                }).catch((error) => {
                    console.error('Error sending message:', error);
                });
            });

        }

        if (submitButton) {
            if (preBidAmountElementMobile) {
                preBidConfirmMobile.addEventListener("click", function () {
                    browser.runtime
                        .sendMessage({
                            action: "logEvent",
                            data: {
                                eventType: "preBid",
                                tabTitle: document.title,
                                details: JSON.stringify(window.location.href) || null,
                                metaData: JSON.stringify(window.location.href) || null,
                                amount: preBidAmount
                            },
                            site: "ca_iaa"
                        })
                        .catch((error) => {
                            console.error("Error sending message:", error);
                        });
                });
            }
        }

        if (submitButton && (preBidAmountElement || preBidAmountElementMobile) && !submitButton.hasAttribute("data-listener-attached")) {
            submitButton.setAttribute("data-listener-attached", "true");
            submitButton.addEventListener("click", () => {
                let preBidAmount = preBidAmountElement.textContent.trim();
                // Assuming extractAndConvertToNumber is a function that extracts the number
                preBidAmount = extractAndConvertToNumber(preBidAmount);
                if (preBidAmount >= 1) {
                    // Assuming this is your condition
                    browser.runtime
                        .sendMessage({
                            action: "logEvent",
                            data: {
                                eventType: "preBid",
                                tabTitle: document.title + getBrowserType(),
                                details: JSON.stringify(window.location.href) || null,
                                metaData: JSON.stringify(window.location.href) || null,
                                amount: preBidAmount
                            },
                            site: "ca_iaa"
                        })
                        .catch((error) => {
                            console.error("Error sending message:", error);
                        });
                }
            });
        }
        if (submitByNowDialog && !submitByNowDialog.hasAttribute("data-listener-attached")) {
            submitByNowDialog.setAttribute("data-listener-attached", "true");
            submitByNowDialog.addEventListener("click", function () {
                browser.runtime
                    .sendMessage({
                        action: "logEvent",
                        data: {
                            eventType: "buyNow",
                            tabTitle: document.title + getBrowserType(),
                            details: JSON.stringify(window.location.href),
                            metaData: JSON.stringify(window.location.href),
                            amount: null
                        },
                        site: "ca_iaa"
                    })
                    .then(() => {
                    })
                    .catch((error) => {
                        console.error("Error sending message:", error);
                    });
            });
        }
    });

    observer.observe(preBidsContainer, {
        childList: true,
        subtree: true
    });
}

const contentObserver = new MutationObserver((mutations, obs) => {
    const button = document.querySelector('a[href="/Account/LogOff"]');
    if (button) {
        button.addEventListener("click", function () {
            browser.runtime.sendMessage({action: "logoutFromSite", site: "ca_iaa"});
            // Handle the button click event
        });
        obs.disconnect(); // Stop watching for changes after the button is found
    }
});

contentObserver.observe(document, {
    childList: true,
    subtree: true
});

function extractAndConvertToNumber(str) {
    // Use a regular expression to remove all non-numeric characters except the decimal point
    const numericString = str.replace(/[^\d.]/g, "");
    // Convert the numeric string to a float
    return parseFloat(numericString);
}

$(document).ready(function () {
    if ($("#loginRow").length > 0) {
        browser.runtime.sendMessage({action: "logoutFromSite", site: "ca_iaa"});
    }
    // mobile
    var loginLink = $("#mobileLoginbtnSection span #loginLink");
    if (loginLink.length > 0) {
        browser.runtime.sendMessage({action: "logoutFromSite", site: "ca_iaa"});
    }
});
