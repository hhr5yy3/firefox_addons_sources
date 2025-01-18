window.OPERATOR_NAME = "Vand";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".search-results__row .sr-pr-row .sr-details").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-box", cssText: "margin:6px"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const dateStart = $1('[data-start]', tour);
    const hotelData = $1('[data-hotel]', tour) ? $1('[data-hotel]', tour).dataset : {};
    const roomData = $1('[data-room]', tour).dataset;
    const price = getNodeData('a.sr-price', tour);
    let option = {
        checkinDt: dateStart.dataset.start,
        nights: getNodeData('.sr-td-duration .nights', tour),
        hotelName: hotelData.hotel || getNodeData('.hotel-link',tour),
        href: null,
        country: getNodeData('[name="country"]', document, 'value', '').replace(/\s*\(.+/, ''),
        region: hotelData.region || getNodeProperty($1('.sr-td-hotel').lastElementChild),
        accommodation: roomData.acc,
        roomType: roomData.room,
        boardType: getNodeData('.meal', tour),
        price: parseInt(price.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g, '')),
        city_from: getNodeData('[name="city_from"]', document, 'value'),
        operator: window.OPERATOR_NAME,
        occupancy: ""
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}
