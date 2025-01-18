window.OPERATOR_NAME = "Airarabia";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    const {checkinDt, nights} = getCheckinDtAndNights();
    const city = $1('.tt-input', $1('input[name="destId"]').nextElementSibling).value;
    const city_from = $1('.tt-input', $1('input[name="exCityId"]').nextElementSibling).value;
    return {
        checkinDt,
        nights,
        city,
        city_from,
    };
}

function getSearchButton() {
    return $1('.trpSrchAct');
}

function injectData() {
    $$(".prcD").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal", cssText: 'margin-left:6px'}));
        }
    });
}

function getCheckinDtAndNights() {
    const dateStart = $1('input[name="travelDate"]').value.split(' ');
    dateStart[1] = monthNameToNumber(dateStart[1]);
    const dateEnd = $1('input[name="travelEndDate"]').value.split(' ');
    dateEnd[1] = monthNameToNumber(dateEnd[1]);
    return {
        checkinDt: dateStart.join('.'),
        nights: getDistance(dateStart.join('.'), dateEnd.join('.')),
    }
}

function getPriceAndCurrency(tour) {
    const priceAndCurrency = getNodeData('.prcD', tour).split(' ');
    return {
        price: parseInt(priceAndCurrency[1].replace(/[,\s]/g, '')),
        currency: priceAndCurrency[0] === 'US$' ? 'USD' : priceAndCurrency[0],
    }
}

function getRegionAndCountry(hatOfTour) {
    const destinationElement = $1('input[name="destination"]');
    let allPossibleDestinations = $$('.arptACItm');
    if (allPossibleDestinations.length === 0 ) {
        destinationElement.focus();
        destinationElement.blur();
        allPossibleDestinations = $$('.arptACItm');
    }

    const city = SEARCH_CRITERIA.city;
    const countryPositionInArray = allPossibleDestinations.map(item => getNodeData('.ttl', item)).findIndex(item => item === city);
    const areaInCity = getNodeData('.sub', hatOfTour);
    return {
        region: city + ', ' + areaInCity,
        country: getNodeData('.sub', allPossibleDestinations[countryPositionInArray]),
    }
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hatOfTour = $1('.trp-dtl-ctr', getHatOfTour(tour));
    const {price, currency} = getPriceAndCurrency(tour);
    const {country, region} = getRegionAndCountry(hatOfTour);
    let option = {
        checkinDt: SEARCH_CRITERIA.checkinDt,
        nights: SEARCH_CRITERIA.nights,
        hotelName: getNodeData('.name', hatOfTour),
        hotel_desc: getNodeData('.trp--dsc', hatOfTour),
        href: $1('.ui-button-sec', tour).href,
        country,
        region,
        roomType: getNodeData('.name', tour),
        boardType: getNodeData('.rm--mp', tour),
        price,
        currency,
        city_from: SEARCH_CRITERIA.city_from,
        operator: OPERATOR_NAME,
        thumbnail: $1('.trp-pic', hatOfTour).firstElementChild.src,
        occupancy: getOccupancy(),
    };
    return option;
}


function getOccupancy() {
    const queryParams = new URLSearchParams(window.location.search);
    const roomsObject = JSON.parse(queryParams.get("roomspax")).rooms[0];
    return {
        adultsCount: roomsObject.ad,
        childrenCount: roomsObject.ch,
        childAges: roomsObject.chAge ? roomsObject.chAge.join(', ') : null,
    }
}

function getHotelRowByImage(img) {
    return img.closest('.trp-sub-itm');
}


function getHatOfTour(tour) {
    return tour.parentElement.parentElement;
}
