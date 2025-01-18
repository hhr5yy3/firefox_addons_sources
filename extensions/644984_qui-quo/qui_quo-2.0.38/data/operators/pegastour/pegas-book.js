window.OPERATOR_NAME = "Pegas Touristik";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$('[data-qa="holiday-price"]').forEach(div => {
        if (!div.querySelector(".qq")) {
            div.prepend(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function getHotelNameAndHref (tour) {
    const hotelNameAndHrefElement =
        $1('.hotel-card-header__hotel-name', tour) ||
        $1('.hotel-panel-title > h2 > a', tour);
    return {
        hotelName: getText(hotelNameAndHrefElement),
        href: hotelNameAndHrefElement.href
    }
}

function getCountryRegionAndCityFrom (tour) {
    const countryRegionAndCityFromArray = [
        $$('.ticket-flight__item', tour),
        $$('.ticket-flight > div:not(.ticket-flight__content)')
    ].filter(arr => arr.length > 0)[0];
    const countryAndRegionArray = getText(countryRegionAndCityFromArray[1]).split(', ');
    return {
        country: countryAndRegionArray[1],
        region: countryAndRegionArray[0],
        city_from: getText(countryRegionAndCityFromArray[0]).split(', ')[0]
    }
}

function getRoomTypeAndBoardType (tour) {
    const roomTypeAndBoardTypeElement = $$('.hotel-panel-info__icon-content .icon-text-ex__text', tour).slice(0, -1);
    return {
        roomType: getElementShallowText(roomTypeAndBoardTypeElement[0]),
        boardType: getText(roomTypeAndBoardTypeElement[1])
    }
}

function getPriceAndCurrency (tour) {
    const priceAndCurrencyArray = getText($1('[data-qa="holiday-price"]', tour));
    return {
        price: parseInt(priceAndCurrencyArray.replace(/\D/g, '')),
        currency: mapCurrencyUtil(priceAndCurrencyArray.split(' ').slice(-1)[0])
    }
}

function getThumbnail() {
    try {
        const thumbnail = $1('.hotel-panel__img')?.src;
        const thumbnailMobile = $1('.card-photo__image-bg')?.style.getPropertyValue('background-image');

        return thumbnail ? thumbnail : thumbnailMobile.match(/url\("(.+)"\)/)?.[1];
    } catch (e) {
        console.log(e);
        return null;
    }
}

function getPlatform(btns) {
    return Boolean(btns.closest('[data-qa="holiday-price"]:not(.tour-header-price__item-content)'));
}

function findAdultsElemInModal () {
    $1('.tour-header__change-passengers, .flights__edit-button-text').click();
    return $1('.tourists-selector__adults');
}

waitingForElement('.flights__edit-button-text', findOccupancy, true);
waitingForElement('.tourist-selector-dialog .base-button:nth-child(2)', findOccupancy, false);

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const isMobile = getPlatform(img);
    const {hotelName, href} = getHotelNameAndHref(tour);
    const {country, region, city_from} = getCountryRegionAndCityFrom(tour);
    const {roomType, boardType} = getRoomTypeAndBoardType(tour);
    const {price, currency} = getPriceAndCurrency(tour);
    let option = {
        checkinDt: getText($1('.hotel-panel-info__period-date-time').firstElementChild).replace(/,/g, ""),
        nights: getText($1('.hotel-panel-info__period-nights')),
        hotelName,
        hotel_desc: "",
        href,
        country,
        region,
        roomType,
        boardType,
        price,
        currency,
        city_from,
        operator: window.OPERATOR_NAME,
        thumbnail: getThumbnail(),
        occupancy: collectOccupancy(),
        flight: getFlight(isMobile)
    };
    console.log(option.flight.sectors[0].segments[0])
    return option;
}

function getBaggage (item) {
    const baggageElementsArray = $$('.flight-panel-details__item .icon-text-ex__text', item)?.slice(0, -1);
    return  baggageElementsArray?.map(elem => getNodeProperty(elem)).join('; ')
}

function getDepartureOrArrivalCityAndAirport (elem, isDeparture) {
    const [city, airport] = getNodeProperty(elem)?.split(', ');
    return isDeparture
        ? { departureCity: city, departureAirport: airport }
        : { arrivalCity: city, arrivalAirport: airport };
}

function getCityAndAirportMobile (elem) {
    const city = getElementShallowText(elem);
    const airport = getNodeData('span', elem);

    return [city, airport];
}

function getArrivalDate (item, departureDate) {
    const nextDayBoolean = getNodeProperty($1('.flight-panel-route__warning', item)) === 'на следующий день';
    return nextDayBoolean ? addDaysToStringDate(departureDate, 1) : departureDate
}

function createSegment (item) {
    const departureCityAndAirportElement = $1('.flight-panel-route__location-departure', item);
    const arrivalCityAndAirportElement = $1('.flight-panel-route__location-destination', item);
    const {departureCity, departureAirport} = getDepartureOrArrivalCityAndAirport(departureCityAndAirportElement, true);
    const {arrivalCity, arrivalAirport} = getDepartureOrArrivalCityAndAirport(arrivalCityAndAirportElement);
    const departureDate = getNodeProperty($1('.flight-panel-route__departure-date', item)).split(', ')[0];
    return {
        airline: getNodeProperty($1('.flight-panel-details__airline', item)),
        serviceClass: getNodeProperty($1('.flight-class-name', item)),
        baggage: getBaggage(item),
        departureDate,
        departureTime: getNodeProperty($1('.flight-panel-route__from .flight-panel-route__time', item)),
        departureCity,
        departureAirportID: getNodeProperty($1('.flight-panel-route__from .flight-panel-route__airport', item)),
        departureAirport,
        arrivalDate: getArrivalDate(item, departureDate),
        arrivalTime: getNodeProperty($1('.flight-panel-route__to .flight-panel-route__time', item)),
        arrivalCity,
        arrivalAirportID:getNodeProperty($1('.flight-panel-route__to .flight-panel-route__airport', item)),
        arrivalAirport,
        travelTime: getNodeProperty($1('.flight-panel-route__duration-time', item))
            .match(/(\d+)ч (\d+)м/)
            .slice(1)
            .join(':')
    }
}

function createSegmentMobile (item) {
    const getCityAndAirport = direction => getCityAndAirportMobile($1('.flight-panel-route__name', direction))
    const depArr = $$('.step', item);
    const [departureTime, arrivalTime] = depArr.map(direction => getNodeData('.flight-panel-route__time', direction))
    const [departureCityAndAirport, arrivalCityAndAirport] = depArr.map(getCityAndAirport)
    const departureDate = getNodeData('.flight-panel-route__date', item);
    const segment = {
        airline: getNodeProperty($1('.airline-name', item)),
        serviceClass: getNodeProperty($1('.flight-class-name', item)),
        baggage: getBaggage(item),
        departureDate,
        departureTime,
        departureCity: departureCityAndAirport[0],
        departureAirportID: '',
        departureAirport: departureCityAndAirport[1],
        arrivalDate: getArrivalDate(item, departureDate),
        arrivalTime,
        arrivalCity: arrivalCityAndAirport[0],
        arrivalAirportID: '',
        arrivalAirport: arrivalCityAndAirport[1],
        travelTime: getNodeProperty($1('.flight-panel__travel-time', item))
            .match(/(\d+)ч (\d+)м/)
            .slice(1)
            .map(d => d.padStart(2, '0'))
            .join(':')
    }

    return segment;
}

function getFlight (isMobile) {
    try {
        const sectors = isMobile
            ? $$('.flights-panel > .panel--mobile').map(s => parseSector(s, isMobile))
            : $$('.panel.flight').map(s => parseSector(s, isMobile));
        return { sectors }
    } catch (e) {
        return null
    }
}

function parseSector (sector, isMobile) {
    const segments = isMobile
        ? $$('.tour-flight-services__item', sector).map(createSegmentMobile)
        : $$('.flight__item', sector).map(createSegment);
    return { segments }
}

function getHotelRowByImage(img) {
    return img.closest('.page');
}
