window.OPERATOR_NAME = "HBpro";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    const checkinDt = getCheckinDt();
    return checkinDt ? {checkinDt} : null;
}


function getSearchButton() {
    return $1('.hotel-page-search-form__button');
}

function injectData() {
    $$(".offer-detail__price").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.prepend(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function getCheckinDt() {
    const checkinDtElement = $1('#mat-input-1', $1('.hotel-page-search-form'));
    if (checkinDtElement !== null) {
        const checkinDtArray = checkinDtElement.value.split(' ');
        checkinDtArray[1] = String(monthNameToNumber(checkinDtArray[1].replace(/\./, ''))).padStart(2, '0');
        return checkinDtArray.join('.');
    }
    return null
}
function getElementShallowText (element) {
    return Array.from(element.childNodes)
        .reduce((text, node) => node.nodeType === 3 ? text + node.textContent : text, '');
}

function getPriceAndCurrency (tour) {
    const priceAndCurrencyString = getElementShallowText($1('.offer-detail__price', tour));
    return {
        price: parseInt(priceAndCurrencyString.replace(/\D/g, "")),
        currency: mapCurrencyUtil(priceAndCurrencyString.replace(/[0-9\s]/g, "")),
    }
}

function getNightsAndOccupancy (tour) {
    const nightsAndOccupancyArray = getNodeData('.offer-detail__guests', tour).match((/\d+/g), 10);
    return {
        nights: nightsAndOccupancyArray[0],
        occupancy: {adultsCount: Number(nightsAndOccupancyArray[1]), childrenCount: 0, childAges: null}
    }
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotelAboutAddress = $1('.hotel-about__address-text');
    const hotelAboutAddressHref = $1('.ng-star-inserted', hotelAboutAddress);
    const {price, currency} = getPriceAndCurrency(tour);
    const {nights, occupancy} = getNightsAndOccupancy(tour);
    const searchId = lastElement(location.href.split('/'));
    const token = document.cookie.replace('token=', '');

    const rooms = await fetch(`https://hbpro.expert/api/v1/ru/hotel/query_hotels/${searchId}`, {
        "headers": {
            "authorization": `Bearer ${token}`
        }}).then(resp => resp.json()).catch(e => {});
    const {checkIn, checkOut, cities} = rooms;


    let option = {
        checkinDt: checkIn ? new Date(checkIn).toLocaleDateString('ru') : SEARCH_CRITERIA.checkinDt,
        nights: checkIn && checkOut ? String(getDistance(new Date(checkIn), new Date(checkOut))) : nights,
        hotelName: $1('.hotel-about__title').title,
        hotel_desc: getNodeData('.hotel-description__text'),
        href: hotelAboutAddressHref ? hotelAboutAddressHref.lastElementChild.href : null,
        country: cities && cities.length === 1 ? cities[0].country.name : '',
        region: cities && cities.length === 1 ? cities[0].name : getElementShallowText(hotelAboutAddress),
        roomType: getNodeData('.room-offer-card-header__title', tour),
        boardType: getNodeData('.room-detail__title', tour),
        price,
        currency,
        city_from: '',
        operator: OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl($1('.hotel-photo-gallerie__photo')),
        occupancy,

    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.room-offer-list__item');
}
