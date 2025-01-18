window.OPERATOR_NAME = window.location.host.match(/coral/i) ? "Coral" : "Sunmar";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const mainPrice = $1('.main-price');
    if (!mainPrice) {
        return
    }
    if (!$1(".qq", mainPrice)) {
        mainPrice.prepend(qqBtns({align: "qq-horizontal"}));
    }
}

function getDataTour (data) {
    return $$('span, div').find(span => span.textContent.trim() === `${data}`)?.nextElementSibling ?? null;
}

function getCheckinDtAndNights () {
    const checkinDtAndNightsElement = getDataTour('Даты проживания');
    const checkinDtAndNightsElementArray = $$('div', checkinDtAndNightsElement).map(div => getText(div));
    return {
        checkinDt: checkinDtAndNightsElementArray[0],
        nights: getDistance(checkinDtAndNightsElementArray[0], checkinDtAndNightsElementArray[1]).toString()
    }
}

function getHotelNameCountryAndRegion () {
    const hotelNameElement = $1('#HotelName');
    const countryAndRegion = getText(hotelNameElement.previousElementSibling)
    const hotelName = getText($1('#HotelName'));
    const country = countryAndRegion.split(', ')[0];
    const region = countryAndRegion.split(', ').slice(1).join(', ')
    return {
        hotelName,
        country,
        region
    }
}

function getRoomTypeAndBoardType () {
    const roomTypeAndBoardTypeElement = getDataTour('Тип номера и Тип питания');
    const roomTypeAndBoardTypeArray = getText(roomTypeAndBoardTypeElement).split(' - ');
    const roomType = roomTypeAndBoardTypeArray[0];
    const boardType = roomTypeAndBoardTypeArray[1];
    return {
        roomType,
        boardType
    }
}

function getPriceAndCurrency () {
    const priceAndCurrency = getText($1('.main-price').lastChild).replace(/\s+/g, '')
        .match(/([\d,]+)\s*([^\d\s]+)/);
    const price = parseInt(priceAndCurrency[1]);
    const currency = mapCurrencyUtil(priceAndCurrency[2]);
    return {
        price,
        currency
    }
}

async function waitForAndClick(purpose) {
    try {
        const details = $$('.details');
        purpose === 'flight' ? details[1].click() : details[0].click();

        return await new Promise(resolve => {
            const interval = setInterval(() => {
                const element = $1('.ant-modal-body');
                if (element && purpose === 'thumbnail') {
                    clearInterval(interval);
                    resolve($1('img', element).src);
                    $1('.ant-modal-close').click();
                }
                if (element && purpose === 'flight') {
                    clearInterval(interval);
                    resolve(element);
                }
            }, 100);
        });
    } catch (e) {
        console.log(e);
        return null;
    }
}

async function createOption(img) {
    const {checkinDt, nights} = getCheckinDtAndNights();
    const {hotelName, country, region} = getHotelNameCountryAndRegion();
    const {roomType, boardType} = getRoomTypeAndBoardType();
    const {price, currency} = getPriceAndCurrency ();
    let option = {
        checkinDt,
        nights,
        hotelName,
        hotel_desc: null,
        href: null,
        country,
        region,
        roomType,
        boardType,
        price,
        currency,
        city_from: '',
        operator: window.OPERATOR_NAME,
        thumbnail: img.classList.contains('qq-rating-btn') ? null : await waitForAndClick('thumbnail'),
        occupancy: getOccupancy(),
        flight: img.classList.contains('qq-rating-btn') ? null : await getFlight()
    };
    return option;
}

function getOccupancy () {
    const occupancyArray = $$('div', getDataTour('Туристы')).map(item => getText(item));
    const adultsCount = parseInt(occupancyArray[0].split(' ')[1]);
    const childrenCount = parseInt(occupancyArray[1].split(' ')[1]);
    return {
        adultsCount: !isNaN(adultsCount) ? adultsCount : null,
        childrenCount: !isNaN(childrenCount) ? childrenCount : null,
        childAges: null
    }
}

async function getFlight () {
    try {
        const modalBody = await waitForAndClick('flight');
        const departureAndArrivalElement = $$('.flight-detail-modal-content', modalBody);

        const departureSector = {
            segments: createSegment(departureAndArrivalElement[0])
        }

        const arrivalSector = {
            segments: createSegment(departureAndArrivalElement[1])
        }

        $1('.ant-modal-close').click();

        return {
            sectors: [departureSector, arrivalSector]
        };
    } catch (e) {
        console.log(e);
        return null;
    }
}
