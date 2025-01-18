window.OPERATOR_NAME = "Toursales";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    const occupancy = getOccupancy();
    const city_from = $1('.fa-plane-departure') ?  getText($1('.fa-plane-departure').nextElementSibling) : '';
    return {
        occupancy,
        city_from
    };
}

function getSearchButton() {
    return $1('#btnMtSearch');
}

function injectData() {
    $$(".tour-new__bb").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
    $$(".price-block").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function getCheckinDt (sortBy, elem, tour) {
    if (sortBy) {
        const checkinDtArrayWithoutYear = getText(elem[0]).split('.');
        return appendYear(checkinDtArrayWithoutYear[0], checkinDtArrayWithoutYear[1])
    }
    return getText($1('.tour-new__col--date', tour)).replace(/[a-zA-Zа-яА-Я]/g, '');
}

function getNights (sortBy, elem, tour) {
    return sortBy ?
        getText(elem[1]).split(' ')[0] :
        getText($1('.tour-new__col--nights', tour)).split(' ')[0]
}

function getHotelNameAndHref() {
    const hotelNameAndHrefElement = $1('.js-go-hotel-info');
    return {
        hotelName: getText(hotelNameAndHrefElement.firstElementChild),
        href: hotelNameAndHrefElement.href
    }
}

function getCountry () {
    const country = $$('.breadcrumbs__link')
        .map(item => getText(item))
        .find(item => item.toLowerCase().includes('туры'));
    return country.replace(/Туры (на|в)|Туры/gi, '');
}

function getRoomTypeAndBoardType (sortBy, tour, elem) {
    if (sortBy) {
        return {
            roomType: getText(elem[4]),
            boardType: getText(elem[3])
        }
    }
    return {
        roomType: getText($1('.tour-new__room', tour)),
        boardType: getText($1('.tour-new__col--eat b', tour))
    }
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const sortByOperatorBoolean = isSortingEnabled('операторам');
    const allTdInTour = sortByOperatorBoolean ? $$('td', tour) : null;
    const checkinDtNightsRoomTypeBoardTypeElements = sortByOperatorBoolean ? $$('span', allTdInTour[3]) : null;
    const {hotelName, href} = getHotelNameAndHref();
    const {roomType, boardType} =
        getRoomTypeAndBoardType(sortByOperatorBoolean, tour, checkinDtNightsRoomTypeBoardTypeElements);
    const priceAndCurrencyString = sortByOperatorBoolean ?
        getText($1('.price-block a', tour)) :
        getText($1('.tour-new__price', tour));
    const {price, currency} = getPriceAndCurrency(priceAndCurrencyString);
    let option = {
        checkinDt: getCheckinDt(sortByOperatorBoolean, checkinDtNightsRoomTypeBoardTypeElements, tour),
        nights: getNights(sortByOperatorBoolean, checkinDtNightsRoomTypeBoardTypeElements, tour),
        hotelName,
        hotel_desc: "",
        href,
        country: getCountry(),
        region: getText($1('.topline-hotel__location').firstElementChild),
        roomType,
        boardType,
        price,
        currency,
        city_from: SEARCH_CRITERIA.city_from,
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('.topline-hotel__img img', document, "src"),
        occupancy: SEARCH_CRITERIA.occupancy,
    };
    return option;
}

function getHotelRowByImage(img) {
    const tours = $1('.tours-new')
    return img.closest('.tour-new') || img.closest('tr', tours);
}
