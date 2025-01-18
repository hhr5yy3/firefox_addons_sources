window.OPERATOR_NAME = "Trip";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function getCurrentDate (key) {
    return getParameterByName(key).split('-').reverse().join('.');
}

function getCheckinDtAndNights () {
    const checkinDt = getCurrentDate('checkIn');
    const checkOut = getCurrentDate('checkOut');
    return {
        checkinDt,
        nights: getDistance(checkinDt, checkOut).toString()
    }
}

function getCountryAndRegion () {
    const address = getText($1('span[class*=headInit_headInit-address_text]')).split(', ');
    return {
        country: address[address.length - 1],
        region: address[address.length - 2].split(' ')[1]
    }
}

function getBoardType (tour) {
    const boardIcon = $1('i.u-icon-ic_new_breakfast', tour)
        || $1('i.u-icon-ic_new_nonbreakfast', tour);
    return boardIcon ? getText(boardIcon.parentElement) : "Без питания"
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const room = tour.parentElement.parentElement.parentElement;
    const {checkinDt, nights} = getCheckinDtAndNights();
    const {country, region} = getCountryAndRegion();
    const {price, currency}
        = getPriceAndCurrency(tour, nights, false, $1('div[class*=priceInfo_saleRoomItemBox-priceBox-displayPrice]', tour));
    let option = {
        checkinDt,
        nights,
        hotelName: getText($1('h1[class*=headInit_headInit-title_name]')),
        hotel_desc: getNodeProperty($1('span[class*=headInit_headInit-address_detail]')),
        href: "",
        country,
        region,
        roomType: getText($1('span[class*=commonRoomCard_commonRoomCard-title]', room)),
        boardType: getBoardType (tour),
        price,
        currency,
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: $1('img[class*=baseRoom_baseRoom-singleRoomImgBox]', room)?.src,
        occupancy: getOccupancy(),
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('div[class*="saleRoom_saleRoomItemBox"]').parentElement;
}