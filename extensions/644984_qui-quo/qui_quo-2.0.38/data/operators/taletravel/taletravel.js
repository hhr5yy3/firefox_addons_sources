window.OPERATOR_NAME = "TaleTravel";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$(".js-price-breakdown ").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function checkNeededIFrame(tour) {
    const iframesArray = $$('iframe');
    const tidInTour = tour.getAttribute('data-tid');
    const arrayOfTids = iframesArray.map(iframe => {
        const form = $1('#form1', iframe.contentDocument);
        if (form) {
            return form.getAttribute('action').match(/[?&]tid=([^&]+)/)[1].replace(/%23/g, '#');
        }
    })
    let numberSelectedIFrameInIframesArrayVariable;
    if (!arrayOfTids.includes(undefined)) {
        numberSelectedIFrameInIframesArrayVariable = arrayOfTids.map(tid => tid.includes(tidInTour)).indexOf(true);
        return {
            iframesArray,
            numberSelectedIFrameInIframesArrayVariable,
        };
    }
    return false
}

function openLoadAndCloseIFrame(tour) {
    $1('.js-price-breakdown', tour).firstElementChild.click();
    return new Promise((resolve, reject) => {
        const timer = setTimeout(reject, 5000);
        const interval = setInterval(() => {
            if (checkNeededIFrame(tour)) {
                clearTimeout(timer);
                clearInterval(interval);
                document.dispatchEvent(new KeyboardEvent("keydown", {key: "Escape", keyCode: 27}));
                resolve();
            }
        }, 100);
    })
}

function getCheckinDtAndNights(neededIFrame) {
    const checkinDtAndNightsString = getNodeProperty($1('#ucRoomsPrices_lblHeadMess', neededIFrame));
    if ( !checkinDtAndNightsString ) {
        throw new QuiQuoError('We are sorry but this price option is no longer available, please select a different one from the search results, or another hotel.', 'Недоступна информация о дате!')
    }
    const checkinDt = checkinDtAndNightsString.split(' ')[2].replaceAll('/', '.');
    const nights = checkinDtAndNightsString.split(' ')[4];
    return {
        checkinDt,
        nights,
    }
}

function getCountryAndRegion(neededIFrame) {
    const countryAndRegionString = getText($1('#ucRoomsPrices_lblLocation', neededIFrame));
    const country = countryAndRegionString.split(', ')[1];
    const region = countryAndRegionString.split(', ')[0];
    return {
        country,
        region,
    }
}

function getPriceAndCurrency(tour) {
    const priceAndCurrencyArray = getText($1('.js-price-breakdown ', tour).firstElementChild).split(' ');
    const price = parseFloat(priceAndCurrencyArray[0].replace(/,/g, ""));
    const currency = priceAndCurrencyArray[1];
    return {
        price,
        currency,
    }
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const selectedHotel = tour.closest('.hotel-wrapper');
    await openLoadAndCloseIFrame(tour, selectedHotel);
    const {
        iframesArray,
        numberSelectedIFrameInIframesArrayVariable
    } = checkNeededIFrame(tour);
    const neededIFrame = iframesArray[numberSelectedIFrameInIframesArrayVariable].contentDocument;
    const hotelNameElement = $1('.hotel-info', selectedHotel);

    let option = {
        checkinDt: getCheckinDtAndNights(neededIFrame).checkinDt,
        nights: getCheckinDtAndNights(neededIFrame).nights,
        hotelName: getText(hotelNameElement),
        hotel_desc: getText($1('.content', selectedHotel)),
        href: hotelNameElement.href,
        country: getCountryAndRegion(neededIFrame).country,
        region: getCountryAndRegion(neededIFrame).region,
        roomType: $$('.js-quoteRoomType', tour).map(item => getText(item)).join(' & '),
        boardType: $$('.meal', tour).map(item => getText(item)).join(' & '),
        price: getPriceAndCurrency(tour).price,
        currency: getPriceAndCurrency(tour).currency,
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: $1('.hotel-image', selectedHotel).src,
        occupancy: getOccupancy(neededIFrame),
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.room-wrapper');
}

function getOccupancy(neededIFrame) {
    const adultsAndChildrenString = getText($1('#ucRoomsPrices_lblRoomAsk', neededIFrame)).split(' ');
    let adultsCount = 0;
    adultsAndChildrenString.map(item => {
        if (item.toLowerCase() === 'adults' || item.toLowerCase() === 'adult') {
            adultsCount += Number(adultsAndChildrenString[adultsAndChildrenString.indexOf(item) - 1]);
        }
    })
    let childrenCount = 0;
    const childAges = [];
    adultsAndChildrenString.map(item => {
        if (item.toLowerCase() === 'children' || item.toLowerCase() === 'child') {
            childrenCount += Number(adultsAndChildrenString[adultsAndChildrenString.indexOf(item) - 1]);
            const ages = adultsAndChildrenString[adultsAndChildrenString.indexOf(item) + 1];
            ages.match(/\d+/g).forEach(item => childAges.push(item));
        }
    })

    return {
        adultsCount,
        childrenCount,
        childAges
    }
}
