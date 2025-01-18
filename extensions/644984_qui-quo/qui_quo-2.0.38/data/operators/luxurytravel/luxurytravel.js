window.OPERATOR_NAME = "Luxury Travel DMC";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    const checkinDt = getCheckinDt();
    if ( !checkinDt) {
        return null;
    }
    return {
        checkinDt,
        nights: getNights(),
        occupancy: getOccupancy()

    };
}

function getSearchButton() {
    return $1('[onclick="startSearch()"]')
}
function injectData() {
    $$('[id^="package_"]').forEach(div => {
        if (!div.children[6].querySelector(".qq")) {
            div.children[6].append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function getCheckinDt () {
    const node = $1('[name="date_checkin"]')
    return node ? node.value.replace(/-/g, '.') : null;
}

function getNights () {
    return getText($1('a.nr_nights').firstElementChild);
}

function getPriceAndCurrency (selectedRoom) {
    const priceAndCurrencyArray = getText(selectedRoom.children[6]).split(' ');
    return {
        price: parseInt(priceAndCurrencyArray[0]),
        currency: priceAndCurrencyArray[1]
    }
}

function createOption(img) {
    const selectedRoom = getHotelRowByImage(img)
    const tour = selectedRoom.closest('[id^="hotel_"]');
    const {price, currency} = getPriceAndCurrency(selectedRoom);
    let option = {
        checkinDt: SEARCH_CRITERIA.checkinDt,
        nights: SEARCH_CRITERIA.nights,
        hotelName: getText($1('.hotel_title_name', tour)),
        hotel_desc: getText($1('.line-clamp', tour)),
        href: null,
        country: null,
        region: getText($1('.hotel_details_title', tour).nextElementSibling),
        roomType: getText($1('.rooms_name', selectedRoom)),
        boardType: getText($1('.room_type', selectedRoom)),
        price,
        currency,
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: $1('.hotel_image', tour).src,
        occupancy: SEARCH_CRITERIA.occupancy,
    };
    return option;
}

function findNumberOfPassengers (selector, container, findClass) {
    const count = $$(selector, container);
    if (findClass === 'selected') {
        return parseInt(getText(count.find(div => div.classList.contains(findClass))));
    } else {
        return count.filter(div => !div.classList.contains(findClass)).map(div => getText(div));
    }
}

function getOccupancy () {
    const adultsContainer = $1('.container_no_adults');
    const adultsCount = findNumberOfPassengers('.clickablesquare', adultsContainer, 'selected');

    const childrenContainer = $1('.container_no_children');
    const childrenCount = findNumberOfPassengers('.clickablesquare', childrenContainer, 'selected');
    const checkingZero = childrenCount.toString() === "0";

    const childAgesContainer = $1('.container_children_ages');
    const childAges = findNumberOfPassengers('.childage', childAgesContainer, 'empty');

    return {
        adultsCount,
        childrenCount: checkingZero ? null : childrenCount,
        childAges: checkingZero ? null : childAges.join(', '),
    };
}

function getHotelRowByImage(img) {
    return img.closest('[id^="package_"]');
}
