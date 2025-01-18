window.OPERATOR_NAME = "Magput";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".price").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns());
        }
    });
}

function getCountryAndRegion (tour) {
    const countryAndRegionArray = getText($1('.my-2', tour));
    return {
        country: countryAndRegionArray.split(',')[0],
        region: countryAndRegionArray.split(',').slice(1).join(),
    }
}

function getRoomAndBoardType (room) {
    const  roomAndBoardTypeArray = $$('.body-2', room).slice(1);
    return {
        roomType: getText($$('span', roomAndBoardTypeArray[0])[1]),
        boardType: getText(roomAndBoardTypeArray[1]).split(': ')[1],
    }
}

function getPriceAndCurrency (room) {
    const priceAndCurrency = getText($1('.sum', room));
    return {
        price: parseInt(priceAndCurrency.replace(/\D/g, '')),
        currency: mapCurrencyUtil(priceAndCurrency.replace(/[0-9\s]/g, '')),
    }
}

async function createOption(img) {
    const room = getHotelRowByImage(img);
    const tour = room.closest(".hotel-card");
    const {country, region} = getCountryAndRegion(tour);
    const {roomType, boardType} = getRoomAndBoardType(room);
    const {price, currency} = getPriceAndCurrency(room);
    let option = {
        checkinDt: getElementShallowText($1('.offers__col_from', room)),
        nights: getElementShallowText($1('.offers__col_to', room)).split(' ')[0],
        hotelName: getText($1('.heading.my-3', tour)),
        hotel_desc: "",
        href: $1('a.list-item__link', tour)?.href,
        country,
        region,
        roomType,
        boardType,
        price,
        currency,
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: $1('.v-image__image', tour)?.style.backgroundImage.slice(5, -2),
        occupancy: await getOccupancy(),
    };
    return option;
}

function getAdultsElem () {
    return $1('.adults input');
}

async function getOccupancy () {
    $1('.search-form-guests input').click();
    const adults = await waitingFor(getAdultsElem, 100, 10);
    const children = $$('.pb-2 p');
    const childAges = children.length > 0
        ? children.map(item => getText(item).replace(/\D/g, ''))
        : null;
    $1('.search-form-guests input').click();
    return {
        adultsCount: adults ? parseInt(adults?.value) : "",
        childrenCount: children?.length,
        childAges:  childAges && childAges.length > 1 ? childAges.join(', ') : childAges,
    }
}

function getHotelRowByImage(img) {
    return img.closest('.offers__row');
}
