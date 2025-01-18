browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "performLogin") {
        function tryLogin() {
            const usernameField = document.getElementById('login'); // Selector for the username field
            const passwordField = document.getElementById('password'); // Selector for the username field
            const loginButton = document.getElementById('submit'); // Selector for the username field
            const form = document.querySelector('form'); // Get the form by its name

            if (usernameField && passwordField && loginButton) {
                usernameField.value = request.username;
                passwordField.value = request.password;
                usernameField.setAttribute('autocomplete', 'off');
                passwordField.setAttribute('autocomplete', 'new-password');
                form.submit();

                setTimeout(() => {
                    usernameField.value = '';
                    passwordField.value = '';
                }, 5);

                // Redirect to the desired URL after a short delay to allow the form submission to complete
                setTimeout(() => {
                    window.location.href = 'https://onlinebusiness.icbc.com/salvage/webServlet/Search?form=VehicleList';
                }, 3000); // Adjust the delay as necessary

                // Send a response back to the background script indicating success
                sendResponse({success: true});
            } else {
                // If the page is not fully loaded, try again after a short delay
                setTimeout(tryLogin, 500);
            }
        }

        tryLogin();
        return true; // Keep the message channel open for the sendResponse callback
    }
});
$(document).ready(function () {
    let requestInProgress = false;

    function attachEventListeners(observer) {
        $('button#btn_quickbid_save').on('click', function (e) {
            handleModalPreBid($(this));
        });
        $('input#bid-submit').off('click').on('click', function (e) {
            handlePreBidFromDetailsPage();
        });
    }

    attachEventListeners();

    function handlePreBidFromDetailsPage() {
        isLoggedIn();
        if (requestInProgress) {
            console.log('Request already in progress, skipping new request.');
            return;
        }
        requestInProgress = true;
        const bidAmount = $('input#bid').val()
        const headingTag = $('h2.visually-hidden');
        const makeModel = headingTag.prev('h1.mb-2.mb-md-1').text();
        const progiPixSpan = $('.vehinfo_filedetails span:contains("description")').filter(function () {
            return $(this).text().trim().length > 0;
        });
        const stockNumber = progiPixSpan[1].nextSibling.data.trim() ?? 'N/A';
        const $vinSpan = $('.vf-vehicle-vin');
        const $vinStrong = $vinSpan.find('strong');
        const vin = $vinStrong.text().trim();
        const priorBid = $('#soumission').text();
        if (priorBid) {
            let priorBidAmount = priorBid.replace(/[\$,]/g, '');
            priorBidAmount = parseFloat(priorBidAmount);
            if (priorBidAmount > bidAmount) {
                requestInProgress = false;
                // alert('Your bid must exceed your prior bid')
                // return;
            }
        }
        const split = makeModel.split(' ', makeModel.length);
        const metaData = {
            make: split[1] ?? 'N/A',
            model: split[2] ?? 'N/A',
            year: split[0] ?? 'N/A',
            stockNumber: stockNumber ?? 'N/A',
            vin: vin ?? 'N/A'
        };
        logEvent(makeModel, metaData, bidAmount);
    }

    function handleModalPreBid() {
        if (requestInProgress) {
            console.log('Request already in progress, skipping new request.');
            return;
        }
        requestInProgress = true;
        const title = $('h2.modal-title')[1].innerText.trim();
        const split = title.split('-', title.length);
        const firstTitle = split[0].split(' ', split[0].length);

        const stockNumber = split.pop();
        const bidAmount = $('input#quickbid').val().trim();
        if (firstTitle.length < 2) {
            // If there are fewer than 2 elements, return the array as a joined string
            return firstTitle.join(' ');
        }

        // Swap the first and second elements
        [firstTitle[0], firstTitle[1]] = [firstTitle[1], firstTitle[0]];
        const formattedTitle = firstTitle.join(' ');
        const metaData = {
            make: firstTitle[1] ?? 'N/A',
            model: firstTitle[2] ?? 'N/A',
            year: firstTitle[0] ?? 'N/A',
            stockNumber: stockNumber ?? 'N/A',
            vin: 'N/A'
        };
        logEvent(formattedTitle, metaData, bidAmount);

    }

    function logEvent(makeModel, metaData, bidAmount) {
        browser.runtime.sendMessage({
            action: 'logEvent',
            data: {
                eventType: 'preBid',
                tabTitle: makeModel ?? document.title,
                details: JSON.stringify(metaData),
                metaData: JSON.stringify(metaData),
                amount: bidAmount
            },
            site: 'ca_progi'
        }).then(() => {
            requestInProgress = false;
        }).catch((error) => {
            requestInProgress = false;
            console.error('Error sending message:', error);
        });
    }

    const observer = new MutationObserver(function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                attachEventListeners(observer)
            }
        }
    });
    observer.observe(document.body, {childList: true, subtree: true});

});
async function isLoggedIn() {
    const isLoggedOut = await browser.storage.local.get('loggedOut');
    browser.storage.local.get('userData').then((result) => {
        if (!result.userData || Object.keys(result.userData).length === 0) {
            browser.runtime.sendMessage({action: "logoutFromExtension", site: 'ca_progi'}).catch(console.error);
        } else {
            console.log('user is logged in');
        }
    }).catch(console.error);
}