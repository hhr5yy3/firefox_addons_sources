$(document).ready(function () {
    document.addEventListener('click', function (event) {
        const element = event.target;
        if (isMobileDevice()) {
            if (
                element.tagName === 'BUTTON' &&
                element.type === 'button' &&
                element.textContent.trim() === 'Submit Bid' &&
                element.getAttribute('data-bind')
            ) {
                extractVehicleInfoMobile(element);
            }
        } else {
            if (element.tagName === 'BUTTON') {
                logPreBids()
            }
        }
    });

    function logPreBids() {
        const vehicleElements = document.querySelectorAll('.table-row-border');

        vehicleElements.forEach(vehicle => {
            // Extract relevant information
            const stockNumber = vehicle.querySelector('[id^="4"]')?.id || 'N/A';
            const vinElement = vehicle.querySelector('[id^="W"], [id^="J"], [id^="Z"]');
            const vin = vinElement ? vinElement.id : 'N/A';
            const titleElement = vehicle.querySelector('.heading-7 a');
            const title = titleElement ? titleElement.textContent.trim() : 'N/A';
            const maxBidInput = vehicle.querySelector('input[placeholder^="$"]');
            const amount = maxBidInput ? (maxBidInput.value) : null;

            // Prepare the message data
            const messageData = {
                action: 'logEvent',
                data: {
                    eventType: 'preBid',
                    tabTitle: stockNumber + ' ' + vin + ' ' + title + ' - [Web]',
                    details: JSON.stringify({
                        stockNumber,
                        vin,
                        title
                    }),
                    metaData: JSON.stringify(window.location.href),
                    amount: amount
                },
                site: 'us_iaa'
            };
            // Send the message
            browser.runtime.sendMessage(messageData)
                .then(() => {
                    console.log(`Message sent for ${stockNumber}`);
                })
                .catch((error) => {
                    console.error(`Error sending message for ${stockNumber}:`, error);
                });
        });
    }

    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    const processedRequests = new Set();

    function extractVehicleInfoMobile(clickedElement) {
        // Find the closest modal to the clicked element
        const modal = clickedElement.closest('.modal');
        if (!modal) {
            console.error('No modal found');
            return null;
        }

        // Extract vehicle details
        const titleElement = modal.querySelector('h5');
        const title = titleElement ? titleElement.textContent.trim() : 'N/A';

        const stockNumber = modal.querySelector('.data-list__value[data-bind*="StockNumber"]');
        const stockNumberValue = stockNumber ? stockNumber.textContent.trim() : 'N/A';
        const branch = modal.querySelector('.data-list__value[data-bind*="BranchLink"]');

        const currentBidElement = modal.querySelector('.data-list__value[data-bind*="HighBidAmount"]');
        const currentBid = currentBidElement ? currentBidElement.textContent.trim() : 'N/A';

        const maxBidElement = modal.querySelector('.data-list__value[data-bind*="MyMax"]');
        const maxBid = maxBidElement ? maxBidElement.textContent.trim() : 'N/A';

        const prebidClosesElement = modal.querySelector('.data-list__value[data-bind*="PrebidCloses"]');
        const prebidCloses = prebidClosesElement ? prebidClosesElement.textContent.trim() : 'N/A';


        const userInputElement = modal.querySelector('input.form-control.form-control-md');
        const userInputValue = userInputElement ? userInputElement.value.trim() : '';

        const requestId = `${stockNumberValue}-${userInputValue || maxBid}`;

        // Check if this exact request has been processed already
        if (processedRequests.has(requestId)) {
            console.log(`Request for ${stockNumberValue} with bid ${userInputValue || maxBid} already processed. Skipping.`);
            return null;
        }
        // Prepare the message data
        const messageData = {
            action: 'logEvent',
            data: {
                eventType: 'preBid',
                tabTitle: title + ' ' + stockNumberValue + ' - [Mobile]',
                details: JSON.stringify({
                    title,
                    stockNumber: stockNumber ? stockNumber.textContent.trim() : 'N/A',
                    branch: branch ? branch.textContent.trim() : 'N/A',
                    currentBid,
                    maxBid,
                    prebidCloses
                }),
                metaData: JSON.stringify(window.location.href),
                amount: userInputValue || maxBid
            },
            site: 'us_iaa'
        };

        // Send the message
        if (typeof browser !== 'undefined' && browser.runtime) {
            browser.runtime.sendMessage(messageData)
                .then(() => {
                    console.log(`Message sent for ${title}`);
                })
                .catch((error) => {
                    console.error(`Error sending message for ${title}:`, error);
                });
        } else if (typeof browser !== 'undefined' && browser.runtime) {
            browser.runtime.sendMessage(messageData, (response) => {
                if (browser.runtime.lastError) {
                    console.error(`Error sending message for ${title}:`, browser.runtime.lastError);
                } else {
                    console.log(`Message sent for ${title}`);
                }
            });
        } else {
            console.error('Neither browser nor browser runtime found');
        }

        return messageData;
    }

// Usage example:
// Attach this function to the click event of the button that opens the modal
    document.querySelectorAll('.btn-open-modal').forEach(button => {
        button.addEventListener('click', function () {
            extractVehicleInfo(this);
        });
    });
});
