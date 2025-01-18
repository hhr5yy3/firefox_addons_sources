window.OPERATOR_NAME = "Туроператор Русь";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".order-tour-tour-item1").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});
            
            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'flex-end');
            
            div.append(btns);
        }
    });

    $$(".reviews_right > .booking:nth-child(2)").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'center');
            
            div.append(btns);
        }
    });
}

function getDate(tour) {
    const dateRaw =
        getNodeData('.tour-dates, .ship-dates-wrapper', tour) ||
        getText($1('.calc-date', tour).selectedOptions[0]);
    const dateStr = trim(dateRaw).split(/,\s/)[0];
    const dateStartEnd = dateStr.split('-').map(s => trim(s));

    let [dayStart, monthStart] = dateStartEnd[0].split(/\s/);
    let [dayEnd, monthEnd] = dateStartEnd[dateStartEnd.length - 1].split(/\s/);

    if(!monthStart) monthStart = monthEnd;
    if(!monthEnd) monthEnd = monthStart;

    return {
        dateStart: appendYear(dayStart, monthNameToNumber(monthStart)),
        dateEnd: appendYear(dayEnd, monthNameToNumber(monthEnd))
    }
}

function getThumbnail(tour) {
    const imageElem = $1('.image_block > a, .image_tour', tour);
    const background = getComputedStyle(imageElem)['background-image'];

    return {
        thumbnail: background.match(/url\("(.+)"\)/)?.[1] || '',
        href: imageElem.href ?? location.href
    }
}

function getPrice(tour) {
    const ship = getNodeData('.ship-name-horizon', tour);
    const priceAndCurr = getNodeData('.price.price-tour-item-1', tour);
    const tourCardCurrency = (priceAndCurr && (ship ? priceAndCurr.slice(-3, -2) : priceAndCurr.slice(-1)));
    const [_, price, currency] = $$('.calc-form > label > span').map(i => getText(i));

    return {
        price: (priceAndCurr || price).replace(/\D+/g, ''),
        currency: mapCurrencyUtil(tourCardCurrency ? tourCardCurrency : currency)
    }
}

function getOccupancy(tour) {
    const occupancyElem = $1('.calc-people-count', tour);
    const occupancyNum = occupancyElem ? getText(occupancyElem.selectedOptions[0]) : 1;

    return {
        adultsCount: Number(occupancyNum),
        childrenCount: 0,
        childAges: null
    }
}

function getMeal(tour) {
    const mealElem = $1('.calc-meal_plan', tour);
    return mealElem ? getText(mealElem.selectedOptions[0]) : '';
}

function getRegion(tour) {
    const region =
        getNodeData('.content_block > div > a > span', tour) ||
        getElementShallowText($1('.descr[itemprop="description"]', tour))
    return region;
}

function getName(tour) {
    const ship = getNodeData('.ship-name-horizon', tour);
    const title = getNodeData('.tour-cities, #tour_name_top', tour);
    return ship ? ship : title
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const { dateStart, dateEnd } = getDate(tour);
    const { thumbnail, href } = getThumbnail(tour);
    const { price, currency } = getPrice(tour);
    let option = {
        checkinDt: dateStart,
        nights: getDistance(dateStart, dateEnd),
        hotelName: getName(tour),
        region: getRegion(tour),
        boardType: getMeal(tour),
        occupancy: getOccupancy(tour),
        hotel_desc: "",
        country: "",
        roomType: "",
        city_from: "",
        price,
        currency,
        href,
        thumbnail,
        operator: OPERATOR_NAME,
    };

    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.tours-list > div, .cruise-list > div, #cont2.cont');
}