window.OPERATOR_NAME = "goglobal";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$('[ng-click*="makeBooking"]').forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            div.after(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotel = tour.closest('tr');
    const dateStart = getNodeData('#ctl00_BodyContent_LabelCheckIn').split('/');
    const price = getNodeData('.price', tour) || getNodeData('.price-search ', hotel);
    let option = {
        checkinDt: dateStart.join('.'),
        nights: getNodeData('#ctl00_BodyContent_LabelNights'),
        hotelName: getNodeData('.hotel-name', hotel),
        href: null,
        country: null,
        region: getNodeData('#ctl00_BodyContent_LabelCity'),
        roomType: getNodeData('.room-category', tour),
        boardType: getText($1('.fa-cutlery', tour).closest('.row')),
        price: extractIntFromStr(price),
        currency: mapCurrencyUtil(price),
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: getNodeData('#HotelImage, .img-thumbnail', hotel, 'src'),
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.height26, .middle-wrapper');
}
