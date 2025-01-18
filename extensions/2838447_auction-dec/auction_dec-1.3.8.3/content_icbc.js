browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "performLogin") {
        function tryLogin() {
            const usernameField = document.querySelector('input[name="j_username"]'); // Selector for the username field
            const passwordField = document.querySelector('input[name="j_password"]'); // Selector for the password field
            const loginButton = document.querySelector('input[name="submit"]'); // Selector for the submit button
            const form = document.querySelector('form[name="dataform"]'); // Get the form by its name

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
    isLoggedIn();
    // Check the current URL and redirect if it matches the specified pattern
    if (window.location.href === 'https://onlinebusiness.icbc.com/salvage/auth/') {
        window.location.href = 'https://onlinebusiness.icbc.com/salvage/webServlet/Search?form=VehicleSales';
        return; // Exit the script to prevent further execution
    }
    $('form[name="bidform"]').on('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        const bidAmount = parseFloat($('input[name="ba"]').val());

        const make = $('td:contains("Make:")').next('.detailTxtBold').text().trim();
        const model = $('td:contains("Model/Sub:")').next('.detailTxtBold').text().trim();
        const year = $('td:contains("Vehicle Year:")').next('.detailTxtBold').text().trim();
        const lotNumber = $('td:contains("Lot #:")').next('.detailTxtBold').text().trim();
        const vin = $('td:contains("Serial Number:")').next('.detailTxtBold').text().trim();

        const metaData = {
            make: make,
            model: model,
            year: year,
            stockNumber: lotNumber,
            vin: vin
        };
        const priorBidText = $(this).closest('table').find('td.detailTxtBold').first().text();
        const priorBidAmount = parseFloat(priorBidText.replace(',', '').replace('$', '').trim());

        if (isNaN(bidAmount) || bidAmount <= 0 || bidAmount <= priorBidAmount) {
            alert('Your bid should be higher than your prior bid and a positive number.');
            return false; // Prevent the form submission
        }
        browser.runtime.sendMessage({
            action: 'logEvent',
            data: {
                eventType: 'preBid',
                tabTitle: year + ' ' + make + ' ' + model ?? document.title,
                details: JSON.stringify(metaData),
                metaData: JSON.stringify(metaData),
                amount: bidAmount
            },
            site: 'ca_icbc'
        }).catch((error) => {
            console.error('Error sending message:', error);
        });
        this.submit();
    });
});

async function isLoggedIn() {
    const isLoggedOut = await browser.storage.local.get('loggedOut');
    browser.storage.local.get('userData').then((result) => {
        if (!result.userData || Object.keys(result.userData).length === 0) {
            browser.runtime.sendMessage({action: "logoutFromExtension", site: 'ca_icbc'}).catch(console.error);
        } else {
            console.log('user is logged in');
        }
    }).catch(console.error);
}