const interval = setInterval(inputAndSubmit, 500);

function inputAndSubmit() {
    const quickBooking = sessionStorage.getItem('quickBooking');
    if (!quickBooking) {
        sendMessageToAddon('get quick booking');
        return;
    }
    const input = document.querySelector('input#json');
    if (input) {
        const form = input.closest('form');
        input.value = quickBooking;
        form.submit();
    }
    clearInterval(interval);
}

addAddonMessageListener('quick booking info', (data) => {
    if ( data && data.quickBookingInfo ) {
        sessionStorage.setItem('quickBooking', JSON.stringify(data.quickBookingInfo));
    }
    if (data && data.booking) {
        sessionStorage.setItem('quickBooking', JSON.stringify(data));
    }
});
