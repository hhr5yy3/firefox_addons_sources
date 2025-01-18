window.OPERATOR_NAME = "";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".order-params").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const {container} = createQuickBookingContainer();
            div.append(container);
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    let option = {
        checkinDt: "",
        nights: "",
        hotelName: "",
        hotel_desc: "",
        href: "",
        country: "",
        region: "",
        roomType: "",
        boardType: "",
        price: "",
        currency: "",
        city_from: "",
        operator: "",
        thumbnail: "",
        occupancy: "",
        excursion: "",
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const services = {
        tourOptions
    };
    return services;
}

function getPrices(claimDocument) {
}

function parseService(svc) {
    return new quickBookingValue({})
}

function parsePassengers() {
    const panels = $$("").filter(panel => panel.offsetHeight > 0);
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const passenger = new Passenger(getInputsValues(panel, {
        birthday: '',
        issueDate: '',
        expire: '',
        lastName: '',
        firstName: '',
        nationality: '',
        serial: '',
        number: '',
        email: ''
    }));
    return passenger;
}
