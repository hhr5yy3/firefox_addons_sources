window.OPERATOR_NAME = "Teddykam";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return {
        checkinDt: $1('#dpCheckIn').value.replace(/\//g, '.'),
        nights: $1('#txtNight').value,
        roomsDataElements: $$('[id^="content"]')
    };
}

function getSearchButton() {
    return $1('#btnSearch') && $$('a[id^="tab"], #btnSearch');
}

function injectData() {
    $$("h3.hotel-price").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.prepend(qqBtns({align: "qq-horizontal"}));
        }
    });
    const trsInHead = $$('thead tr[role="row"]');
    const trsInBody = $$('tbody tr[role="row"]');
    trsInHead.forEach(trInHead => {
        if (!$1('.qq', trInHead)) {
            const newThInHead = document.createElement('th');
            newThInHead.setAttribute('class', 'sorting qq');
            newThInHead.textContent = 'QQ';
            trInHead.appendChild(newThInHead);
        }
    })
    trsInBody.forEach(trInBody => {
        if (!$1('.qq', trInBody)) {
            const newThInBody = document.createElement('td');
            newThInBody.setAttribute('class', 'qq');
            newThInBody.style.display = 'flex';
            newThInBody.append(createAddButton(createOption));
            newThInBody.append(createEditButton(createOption));
            trInBody.appendChild(newThInBody);
        }
    })
}

function getHotelNameAndDesc(tour) {
    const hotelNameAndDescElem = $1('h4.filename a', tour);
    return {
        hotelName: getText(hotelNameAndDescElem.firstElementChild),
        href: hotelNameAndDescElem?.href
    }
}

function hasRoomSelected(img) {
    const room = img.closest('tbody [role="row"]');
    if (room) {
        return {
            room,
            boolean: true
        }
    }
    return {boolean: false};
}

function getRoomTypeBoardTypePriceAndCurrency(Boolean, tour, img) {
    if (Boolean) {
        const tdsInTour = $$('td', hasRoomSelected(img).room);
        return {
            roomType: getText(tdsInTour[1]),
            boardType: getText(tdsInTour[2]),
            price: parseInt(getText(tdsInTour[5])),
            currency: getText(tdsInTour[6])
        }
    }
    const roomAndBoardTypeInTourArray = getText($1('.rooms-row', tour)).split(' - ');
    const priceAndCurrencyInTourElem = $1('.hotel-price', tour);
    return {
        roomType: roomAndBoardTypeInTourArray[0],
        boardType: roomAndBoardTypeInTourArray[2],
        price: parseInt(getElementShallowText(priceAndCurrencyInTourElem)),
        currency: getText(priceAndCurrencyInTourElem.lastElementChild)
    }
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    let hasRoomSelectedBoolean = hasRoomSelected(img).boolean;
    const {hotelName, href} = getHotelNameAndDesc(tour);
    const {
        roomType,
        boardType,
        price,
        currency
    } = getRoomTypeBoardTypePriceAndCurrency(hasRoomSelectedBoolean, tour, img);
    let option = {
        checkinDt: SEARCH_CRITERIA.checkinDt,
        nights: SEARCH_CRITERIA.nights,
        hotelName,
        hotel_desc: getNodeProperty($1('.hotel-description-text', tour)),
        href,
        country: 'Bulgaria',
        region: getText($1('.location', tour)),
        roomType,
        boardType,
        price,
        currency,
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: $1('.img-responsive', tour)?.src,
        occupancy: getOccupancy(),
    };
    return option;
}

function getOccupancy() {
    const allRoomsElements = $$('a[id^="tab"]');
    const roomsDataElements = SEARCH_CRITERIA.roomsDataElements;
    const changedRoom = allRoomsElements?.findIndex(item => item.parentElement.classList.contains('active'));
    const changedRoomData = changedRoom >= 0 ? roomsDataElements[changedRoom] : null;
    const adultsCount = parseInt($1('[id^="txtAdultCountRoom"]', changedRoomData)?.value);
    const childrenCount = parseInt($1('[id^="txtChildCountRoom"]', changedRoomData)?.value);
    let childAges = "";
    if (childrenCount) {
        childAges = $$('[id^="txtChildAge"]', changedRoomData)
            .slice(0, childrenCount)
            .map(item => item.value)
            .join(', ')
    }
    return {
        adultsCount,
        childrenCount,
        childAges
    }
}

function getHotelRowByImage(img) {
    return img.closest('.row.pricerow');
}
