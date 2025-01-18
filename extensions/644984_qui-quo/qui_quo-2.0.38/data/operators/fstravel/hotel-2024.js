window.OPERATOR_NAME = "Fstravel";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    const city_from =getNodeData('.v-departure__pinput__input', document.documentElement, 'value');
    if ( !city_from ) {
        return null
    }
    return {city_from};
}

function getSearchButton() {
    return $$('.v-search-button');
}

function injectData() {
    $$(".hotelRoomPricing .offer").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal", cssText: 'position:absolute;left: 60%;'}));
        }
    });
}

function getCheckinDt (tour) {
    const [dateStart, dateEnd] = getNodeData('.hotel-room-type__dates', tour).split(/\s*-\s*/);
    const checkinDt = dateFromDayAndMonthName(...dateStart.split(/\s+/));
    const nights = dateEnd.match(/(\d+)\s+ноч/)[1]
    return {checkinDt, nights};
}


function getPriceAndCurrency (room) {
    const priceAndCurrencyElem = getNodeData('.offer-priceAndBtn h3', room) || getNodeData('.offer-priceAndBtn h2', room);
    return {
        price: parseInt((priceAndCurrencyElem).replace(/\s/g, '')),
        currency: mapCurrencyUtil((priceAndCurrencyElem.replace(/\d+|\s+/g, '')))
    }
}

function getUrlParams () {
    const currentUrl = window.location.href;
    const url = new URL (currentUrl);
    const params = {};
    url.searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params
}

function createOption(img) {
    const room =  getHotelRowByImage(img);
    const tour = room.closest('.hotel-card__list');
    const {price, currency} = getPriceAndCurrency (room);
    const {checkinDt, nights} = getCheckinDt(tour);
    let option = {
        checkinDt,
        nights,
        hotel_desc: getText($1(".description-text")),
        hotelName: getNodeProperty($1('.hotelInfoHead h1')),
        href: location.href,
        country: getNodeData('[href*="searchtour/country"]'),
        region: $$('[href*="searchtour/resort"], [href*="searchtour/city"]').extractNodesText().filter(Boolean).join(', '),
        roomType: getNodeData('.hotel-room-type__name',tour),
        boardType: getNodeData('.hotel-room-type__meal', tour),
        price,
        currency,
        city_from: getNodeData('.offer-flightTypeName', room).match(/рейс/) ? SEARCH_CRITERIA?.city_from : '',
        operator: window.OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl($1('.hotelInfoPhotos .main, .hotelInfoPhotos .box-photos__bottom')) ,
        occupancy: getOccupancy(),
    };

    return option;
}

function getOccupancy () {
    const urlParams = getUrlParams();
    const adultsCount = parseInt(urlParams.adults);
    let childrenCount = null;
    const childAges = urlParams.children;
    if (childAges) {
         childrenCount = childAges.split(',').length;
    }
    return {
        adultsCount,
        childrenCount,
        childAges
    }
}

function getHotelRowByImage(img) {
    return img.closest('.offer');
}
