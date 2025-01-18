window.OPERATOR_NAME = "Toursales";
window.showTopHotelsRating = false;


function initializeSearchCriteria() {
    const country = getText($1('#lsfcountry .bth__inp'));
    const city_from = getText($1('.lsfw-order__city .bth__inp'));
    const occupancy = getOccupancy();
    return {
        country,
        city_from,
        occupancy
    };
}

function getSearchButton() {
    return $1('#btnMtSearch');
}

function injectData() {
    $$(".tours__price").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
    $$(".tours-min-prices__price").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function getCheckinDt (sortBy, room) {
    return sortBy ?
        getText($1('.tours__date', room)).split(' ')[0] :
        getText($1('.tours-min-prices__dates', room)).replace(/[a-zA-Zа-яА-Я]/g, '').split('-')[0];
}

function getNights (sortBy, room) {
    return sortBy ?
        getText($1('.tours__nights', room)).split(' ')[0] :
        getText($1('.tours-min-prices__nights', room)).split(' ')[0];
}

function getHotelNameAndHref (sortBy, room, tour, hotelInfo) {
    if (sortBy) {
        const hotelNameElement = $1('.hotel__name', tour);
        return {
            hotelName: getText(hotelNameElement.firstElementChild),
            href: hotelNameElement.href
        }
    }
    return {
        hotelName: getText(hotelInfo.firstElementChild),
        href: hotelInfo.href
    }
}

function getRegion (sortBy, tour, hotelInfo) {
    return sortBy ?
        getText($1('.hotel__location', tour)).split(' • ')[0] :
        getText(hotelInfo[1])
}

function getHotelInfoIfSelectSortMinPrice (room, sortByHotelBoolean) {
    if (!sortByHotelBoolean) {
        const hotelInfoIfSelectSortMinPrice = $1('.tours-min-prices__hotel', room);
        return {
            hotelInfoIfSelectSortMinPrice,
            hotelInfoParentElementAllDivs: $$('div', hotelInfoIfSelectSortMinPrice.parentElement)
        }
    }
    return {
        hotelInfoIfSelectSortMinPrice: null,
        hotelInfoParentElementAllDivs: null
    }
}

function getRoomTypeAndBoardType (sortBy, room, hotelInfo) {
    if (sortBy) {
        return {
            roomType: getText($1('.tours__cut', room)),
            boardType: getText($1('.tours__eat', room))
        }
    }
    const roomTypeAndBoardTypeArray = $$('a', hotelInfo[2]);
    return {
        roomType: getText(roomTypeAndBoardTypeArray[0]),
        boardType: getText(roomTypeAndBoardTypeArray[3])
    }
}

function getThumbnail (sortBy, tour) {
    if (sortBy) {
        const imgElement = $1('.hotel__img-link img', tour);
        return imgElement ? imgElement.src : "";
    }
    return "";
}

function createOption(img) {
    const room = getHotelRowByImage(img);
    const tour = room.closest('.hotel');
    const sortByHotelBoolean = isSortingEnabled('отелям');
    const {hotelInfoIfSelectSortMinPrice,
        hotelInfoParentElementAllDivs} = getHotelInfoIfSelectSortMinPrice(room, sortByHotelBoolean);
    const {hotelName, href} = getHotelNameAndHref (sortByHotelBoolean, room, tour, hotelInfoIfSelectSortMinPrice);
    const {roomType, boardType} = getRoomTypeAndBoardType(sortByHotelBoolean, room, hotelInfoParentElementAllDivs);
    const priceAndCurrencyString = sortByHotelBoolean ?
        getText($1('.tours__price', room)) :
        getText($1('.tours-min-prices__price', room))
    const {price, currency} = getPriceAndCurrency(priceAndCurrencyString);
    let option = {
        checkinDt: getCheckinDt(sortByHotelBoolean, room),
        nights: getNights(sortByHotelBoolean, room),
        hotelName,
        hotel_desc: "",
        href,
        country: SEARCH_CRITERIA.country,
        region: getRegion (sortByHotelBoolean, tour, hotelInfoParentElementAllDivs),
        roomType,
        boardType,
        price,
        currency,
        city_from: SEARCH_CRITERIA.city_from,
        operator: window.OPERATOR_NAME,
        thumbnail: getThumbnail(sortByHotelBoolean, tour),
        occupancy: SEARCH_CRITERIA.occupancy,
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.tours') || img.closest('.tours-min-prices');
}
