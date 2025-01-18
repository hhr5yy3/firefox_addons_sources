browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "performLogin") {
        function tryLogin() {
            const emailField = document.querySelector('#Email');
            const passwordField = document.querySelector('#Password');
            const loginButton = document.querySelector('.login-form__submit .btn-primary');
            const form = document.getElementById('account');

            // Get the siteType parameter from URL
            const urlParams = new URLSearchParams(window.location.search);
            const siteType = urlParams.get('siteType');

            if (emailField && passwordField && loginButton) {
                emailField.value = request.username;
                passwordField.value = request.password;
                emailField.setAttribute('autocomplete', 'off');
                passwordField.setAttribute('autocomplete', 'new-123123');

                // If siteType is ca_iaa, modify form action or handle redirect
                if (siteType === 'ca_iaa') {
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const formData = new FormData(form);
                        fetch(form.action, {
                            method: 'POST',
                            body: formData
                        })
                           .then(response => {
                               if (response.ok) {
                                   window.location.href = 'https://ca.iaai.com/Account/Login';
                               }
                           });
                    });
                }

                form.submit();
                setTimeout(() => {
                    emailField.value = '';
                    passwordField.value = '';
                }, 5);

                sendResponse({success: true});
            } else {
                setTimeout(tryLogin, 500);
            }
        }

        tryLogin();
        return true;
    }
});


async function isLoggedIn() {
    const isLoggedOut = await browser.storage.local.get('loggedOut');
    browser.storage.local.get('userData').then((result) => {
        if (!result.userData || Object.keys(result.userData).length === 0) {
            browser.runtime.sendMessage({action: "logoutFromExtension", site: 'us_iaa'}).catch(console.error);
        } else {
            console.log('user is logged in');
        }
    }).catch(console.error);
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

let preBidsContainer = document.getElementById('divdialog');
// let preBidsContainer = document.getElementById('divVehicleDetails');
// let htmlDivElement = document.getElementById('bpPageTest');
let htmlDivElement = document.getElementById('vddetails');
let liveBidHost = document.getElementById('Host');

const btnPreBidModal = document.getElementById('btnPreBidModal');
const btnBuyNowModal = document.getElementById('btnIbuyfastModal');
const timedAuctionPlaceBidBtn = document.getElementById('btnPlaceBid');
if (timedAuctionPlaceBidBtn) {
    timedAuctionPlaceBidBtn.addEventListener('click', function () {
        isLoggedIn();
        const btnConfirmPreBid = document.getElementById('btnConfirmPreBid');
        const maxBid = document.getElementById('MaxBid');
        const amount = extractAndConvertToNumber(maxBid.value)
        browser.runtime.sendMessage({
            action: 'logEvent',
            data: {
                eventType: 'preBid',
                tabTitle: '[Timed Auction] ' + document.title + getBrowserType(),
                details: JSON.stringify(window.location.href),
                metaData: JSON.stringify(window.location.href),
                amount: amount
            },
            site: 'us_iaa'
        }).then(() => {
        }).catch((error) => {
            console.error('Error sending message:', error);
        })
    });

}
if (btnPreBidModal) {
    btnPreBidModal.addEventListener('click', function () {
        isLoggedIn();
        const btnConfirmPreBid = document.getElementById('btnConfirmPreBid');
        console.log(btnConfirmPreBid, "#############btnConfirmPreBid##############")
        if (btnConfirmPreBid) {
            btnConfirmPreBid.addEventListener('click', function () {
                const maxBid = document.getElementById('MaxBid');
                const amount = extractAndConvertToNumber(maxBid.value)
                browser.runtime.sendMessage({
                    action: 'logEvent',
                    data: {
                        eventType: 'preBid',
                        tabTitle: document.title + getBrowserType(),
                        details: JSON.stringify(window.location.href),
                        metaData: JSON.stringify(window.location.href),
                        amount: amount
                    },
                    site: 'us_iaa'
                }).then(() => {
                }).catch((error) => {
                    console.error('Error sending message:', error);
                })

            })
        }
    });
}

function getBrowserType() {
    return isMobileDevice() ? ' - [Mobile]' : ' - [Web]';
}

// Buy Now event
if (btnBuyNowModal) {
    btnBuyNowModal.addEventListener('click', function () {
        isLoggedIn();
        const buyNowBtn = document.getElementById('buynowbutton');
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', function () {
                browser.runtime.sendMessage({
                    action: 'logEvent',
                    data: {
                        eventType: 'buyNow',
                        tabTitle: document.title + getBrowserType(),
                        details: JSON.stringify(window.location.href),
                        metaData: JSON.stringify(window.location.href),
                        amount: null
                    },
                    site: 'us_iaa'
                }).then(() => {
                }).catch((error) => {
                    console.error('Error sending message:', error);
                })
            })
        }
    });
}

if (liveBidHost) {
    const liveBidObserver = new MutationObserver((mutations, obs) => {
        let innerHTML = '';
        let innerText = '';
        obs.disconnect();
        liveBidHost.addEventListener('click', function (event) {
            const clickedElementBid = event.target;
            const actionName2 = clickedElementBid.getAttribute('data-actionname');
            if (actionName2 === 'PlaceBid') {
                const bidDetails = clickedElementBid.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerText;
                const lines = bidDetails.split('\n');
                const regex = /^(\d{4})\s(\w+)\s(.+)/;
                let output = '';
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
                const currentHighBidString = lines.find(line => line.startsWith("CURRENT HIGH BID"));
                let currentHighBidAmount = "";

                if (currentHighBidString) {
                    const match = currentHighBidString.match(/\$([\d,]+)/);
                    if (match) {
                        currentHighBidAmount = match[1];  // match[1] contains the first capturing group, excluding the dollar sign
                    }
                }
                browser.runtime.sendMessage({
                    action: 'logEvent',
                    data: {
                        eventType: 'liveBid',
                        tabTitle: output + getBrowserType(),
                        amount: currentHighBidAmount ?? null,
                        details: JSON.stringify(lines),
                        metaData: JSON.stringify(lines),
                    },
                    site: 'us_iaa'
                });
            }
        })

        liveBidHost.addEventListener('click', function (event) {
            var bidInput = document.querySelector('input.js-detail-autoBid');
            const clickedElement = event.target;
            console.log(clickedElement.tagName, "clickedElement.tagName")
            if (clickedElement.tagName === 'BUTTON') {
                const actionName = clickedElement.getAttribute('data-actionname');
                if (actionName === 'PlaceAutoBidFromDetail') {
                    let html = clickedElement.parentElement.parentElement.parentElement;
                    innerHTML = html.innerHTML;
                    innerText = html.innerText;
                }
                if (actionName === 'ModifyAutoBidFromDetail') {
                    let html = clickedElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    innerHTML = html.innerHTML;
                    innerText = html.innerText;
                }
                const parser = new DOMParser();
                const doc = parser.parseFromString(innerHTML, 'text/html');
                const yearSpan = doc.querySelector('.vehicle-name__year');
                const makeSpan = doc.querySelector('.vehicle-name__make');
                const modelSpan = doc.querySelector('.vehicle-name__model');
                const formattedStr = innerText.replace(/\\n/g, '\n');
                const lines = formattedStr.split('\n');
                const thirdLine = lines[2];
                if (actionName === 'AutoBidConfirmationPlaceBid' || actionName === 'AutoBidConfirmationModifyBid') {
                    const bidAreaDiv = document.querySelector('div.bid-area.bid-area--autobid');
                    if (bidAreaDiv) {
                        bidInput = bidAreaDiv.querySelector('input[type="text"]');
                    }
                    browser.runtime.sendMessage({
                        action: 'logEvent',
                        data: {
                            eventType: 'autoPreBid',
                            tabTitle: yearSpan.innerText + ' ' + makeSpan.innerText + ' ' + modelSpan.innerText + getBrowserType(),
                            amount: parseFloat(bidInput.value.replace(/,/g, '.')),
                            details: formattedStr,
                            metaData: JSON.stringify(lines),
                        },
                        site: 'us_iaa'
                    });
                }
            }
        })

    });
    liveBidObserver.observe(liveBidHost, {
        childList: true, subtree: true
    });
}

function findClosestDiv(element) {
    return element.closest('.current-vehicle');
}

if (htmlDivElement) {
    const observer = new MutationObserver((mutations, obs) => {
        const submitButton = document.querySelector('input[data-bind*="SubmitPreBidDialog"]');
        const preBidAmountElement = document.querySelector('span[data-bind*="PreBidAmountVal"]');
        observer.disconnect();
        if (submitButton && preBidAmountElement) {
            submitButton.addEventListener('click', () => {
                let preBidAmount = preBidAmountElement.textContent.trim();
                preBidAmount = extractAndConvertToNumber(preBidAmount);
                // CA IAA requires to be >25 CAD
                if (preBidAmount >= 1) {
                    browser.runtime.sendMessage({
                        action: 'logEvent',
                        data: {
                            eventType: 'preBid',
                            tabTitle: document.title + getBrowserType(),
                            details: null,
                            metaData: null,
                            amount: preBidAmount
                        },
                        site: 'us_iaa'
                    }).then(() => {
                    }).catch((error) => {
                        console.error('Error sending message:', error);
                    })
                }
            });
        }
    });
    observer.observe(htmlDivElement, {
        childList: true, subtree: true
    });
}

if (preBidsContainer) {
    const observer = new MutationObserver((mutations) => {
        const submitButton = document.querySelector('input[data-bind*="SubmitPreBidDialog"]');
        const preBidAmountElement = document.querySelector('span[data-bind*="PreBidAmountVal"]');

        // Check if both elements are found and not yet marked
        if (submitButton && preBidAmountElement && !submitButton.hasAttribute('data-listener-attached')) {
            // Mark the submitButton to indicate the event listener is attached
            submitButton.setAttribute('data-listener-attached', 'true');

            submitButton.addEventListener('click', () => {
                let preBidAmount = preBidAmountElement.textContent.trim();
                // Assuming extractAndConvertToNumber is a function that extracts the number
                preBidAmount = extractAndConvertToNumber(preBidAmount);

                if (preBidAmount >= 1) { // Assuming this is your condition
                    browser.runtime.sendMessage({
                        action: 'logEvent',
                        data: {
                            eventType: 'preBid',
                            tabTitle: document.title + getBrowserType(),
                            details: null,
                            metaData: null,
                            amount: preBidAmount
                        },
                        site: 'us_iaa'
                    }).catch((error) => {
                        console.error('Error sending message:', error);
                    });
                }
            });
        }
    });

    observer.observe(preBidsContainer, {
        childList: true,
        subtree: true
    });
}


const contentObserver = new MutationObserver((mutations, obs) => {
    const button = document.querySelector('a[href="/login/gbplogout"]');
    if (button) {
        button.addEventListener('click', function () {
            browser.runtime.sendMessage({action: 'logoutFromSite', site: 'us_iaa'});
            // Handle the button click event
        });
        obs.disconnect(); // Stop watching for changes after the button is found
    }
});

contentObserver.observe(document, {
    childList: true, subtree: true
});

function extractAndConvertToNumber(str) {
    // Use a regular expression to remove all non-numeric characters except the decimal point
    const numericString = str.replace(/[^\d.]/g, '');
    // Convert the numeric string to a float
    return parseFloat(numericString);
}

$(document).ready(function () {
    if ($('#loginRow').length > 0) {
        browser.runtime.sendMessage({action: 'logoutFromSite', site: 'us_iaa'});
    }
    // mobile
    var loginLink = $('a.dropdown-item[aria-label="Log In"]');
    if (loginLink.length > 0) {
        browser.runtime.sendMessage({action: 'logoutFromSite', site: 'us_iaa'});
    }
});