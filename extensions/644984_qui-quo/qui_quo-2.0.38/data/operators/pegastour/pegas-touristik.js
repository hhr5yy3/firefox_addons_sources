window.OPERATOR_NAME = "Pegas Touristik";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$('[data-qa="continue-button"]').forEach(div => {
        if (!div.parentNode.querySelector(".qq") && !div.parentNode.classList.contains('tours-results-wrapper__search-on-map')) {
            div.after(qqBtns({align: "qq-horizontal"}));
        }
    });
    $$('.changeable-price__price-total').forEach(div => {
        if (!div.querySelector(".qq")) {
            div.prepend(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function getCheckinDtAndNights(tour, hasMainHotel, tourHeader) {
    const checkinDtAndNightsArray = hasMainHotel
        ? $$('.icon-text-ex__text', tourHeader)
        : $$('.tours-results-header__info-item');
    const date = getText(checkinDtAndNightsArray[0]).split(/\s*-\s*/)[0];
    return {
        checkinDt: appendYear(...date.split('.')),
        nights: getText(checkinDtAndNightsArray[1]).split(' ')[0]
    }
}

let tourFromModal;
document.addEventListener('click', function (e) {
    if (e.target.closest('.card__accommodation-list')) {
        const element = e.target.closest('.card__accommodation-list');
        tourFromModal = element.closest('.card');
    }
    if (e.target.closest('a.additional-font .icon-text-ex__text')) {
        const element = e.target.closest('.icon-text-ex__text');
        tourFromModal = element.closest('.card');
    }
    if (e.target.closest('.group__container')) {
        const element = e.target.closest('.group__container');
        tourFromModal = $1('.group__header', element);
    }
});

function checkedModalOpen() {
    if ( !$1('.change-accommodation') ) {
        return null;
    }
    const modalWindow = getComputedStyle($1('.change-accommodation'));
    return modalWindow.display !== 'none';
}

function getRoomTypeAndBoardType(tour, accommodation, hasMainHotel) {
    if (checkedModalOpen()) {
        const changedRoom = $$('.accommodation-item', accommodation)
            .find(room => room.classList
                .contains('accommodation-item--current-selected'));
        const boardTypeChangedLine = $1('input[name="room-options"]:checked', changedRoom)
            .closest('.accommodation-item__option');

        return {
            roomType: getText($1('.accommodation-item__hotel-name', changedRoom)),
            boardType: getText($1('.accommodation-item__meal', boardTypeChangedLine))
        }
    }

    const roomTypeAndBoardTypeArray = hasMainHotel
        ? $$('.card__row-info-text', tour || tourFromModal.nextElementSibling)
        : $$('.card__row-info-text', tour || tourFromModal);
    return {
        roomType: getText(roomTypeAndBoardTypeArray[0]),
        boardType: getText(roomTypeAndBoardTypeArray[1])
    }
}

function convertPriceAndCurrency(priceAndCurrencyString) {
    return {
        price: parseInt(priceAndCurrencyString.replace(/\D/g, '')),
        currency: mapCurrencyUtil(priceAndCurrencyString.split(' ').slice(-1)[0])
    }
}

function getPriceAndCurrency(tour, accommodation, hasMainHotel) {
    let priceAndCurrencyString;
    if (checkedModalOpen()) {
        priceAndCurrencyString = getText($1('.changeable-price__price-total', accommodation));
    } else if (hasMainHotel) {
        priceAndCurrencyString = getText($1('[data-qa="continue-button"]', tour || tourFromModal.nextElementSibling));
    } else {
        priceAndCurrencyString = getText($1('[data-qa="continue-button"]', tour || tourFromModal));
    }
    const {price, currency} = convertPriceAndCurrency(priceAndCurrencyString);
    return {
        price,
        currency
    }
}

function findAdultsElemInModal() {
    $1('[data-qa="search__guests-input"]').click();
    return $1('.tourists-selector__adults');
}

waitingForElement('[data-qa="search__guests-input"]', findOccupancy, true);
waitingForElement('.tourist-selector-dialog .base-button:nth-child(2)', findOccupancy, false);

function getHotelNameAndHref(tour, hasMainHotel) {
    const hotelInfoElement = hasMainHotel
        ? $1('.main-hotel__title a, a.hotel-card-header__hotel-name')
        : ($1('.hotel-card-header__hotel-name', tour || tourFromModal)) ||
          $1('.main-hotel__title a, a.hotel-card-header__hotel-name');
    return {
        hotelName: getText(hotelInfoElement),
        href: hotelInfoElement?.href
    }
}

function getCountryAndRegion(tour, hasMainHotel) {
    const locationInfoElement = hasMainHotel
        ? $1('.main-hotel__location, .hotel-card-header__location')
        : $1('.hotel-card-header__location', tour || tourFromModal);
    const locationInfoArray = getText(locationInfoElement).split(', ');
    return {
        country: locationInfoArray[locationInfoArray.length - 1],
        region: locationInfoArray.slice(0, -1).join(', ')
    }
}

function getThumbnail(tour, hasMainHotel) {
    return hasMainHotel
        ? $1('.gallery__image-main')?.src || getBackgroundImageUrl($1('.card-photo__image-bg'))
        : getBackgroundImageUrl($1('.card-photo__image-bg', tour || tourFromModal))
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const tourHeader = $1('.group__header', tour?.closest('.group__container')) || tourFromModal;
    const hasMainHotel = !!$1('.main-hotel');
    const {checkinDt, nights} = getCheckinDtAndNights(tour, hasMainHotel, tourHeader);
    const {hotelName, href} = getHotelNameAndHref(tour, hasMainHotel);
    const {country, region} = getCountryAndRegion(tour, hasMainHotel);
    const accommodation = $1('.change-accommodation');
    const {roomType, boardType} = getRoomTypeAndBoardType(tour, accommodation, hasMainHotel);
    const {price, currency} = getPriceAndCurrency(tour, accommodation, hasMainHotel);
    let option = {
        checkinDt,
        nights,
        hotelName,
        hotel_desc: hasMainHotel ? getNodeProperty($1('.main-hotel__description')) : "",
        href,
        country,
        region,
        roomType,
        boardType,
        price,
        currency,
        city_from: getText($1('[data-qa="departure__input"]'), 'value'),
        operator: window.OPERATOR_NAME,
        thumbnail: getThumbnail(tour, hasMainHotel),
        occupancy: collectOccupancy(),
        flight: await getFlight(tour, tourFromModal, tourHeader, hasMainHotel)
    };
    return option;
}

function timeDifference(start, end) {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    let endTotalMinutes = endHours * 60 + endMinutes;
    if (endTotalMinutes < startTotalMinutes) {
        endTotalMinutes += 24 * 60;
    }
    const diffMinutes = endTotalMinutes - startTotalMinutes;
    return diffMinutes / 60;
}

function createSegment(item) {
    const departureDateElement = $1('.package-details__item-right-side', item);
    if (!departureDateElement || !getNodeProperty(departureDateElement.firstElementChild)) {
        return null
    }
    const departureDate = getNodeProperty(departureDateElement.firstElementChild).split(', ')[0];
    const flightServiceSegments = $$('.flight-service-segment-info', item);
    let arrivalDate = departureDate;
    const nextDayElement = getNodeProperty(flightServiceSegments[2].lastElementChild);
    if (nextDayElement && nextDayElement === 'на следующий день') {
        arrivalDate = addDaysToStringDate(departureDate, 1)
    }
    const departureDateAndTimeArray = getNodeProperty(flightServiceSegments[1].firstElementChild).split(' ');
    const departureAirportData = getNodeProperty(flightServiceSegments[1].lastElementChild);
    const arrivalDateAndTimeArray = getNodeProperty(flightServiceSegments[3].firstElementChild).split(' ');
    const arrivalAirportData = getNodeProperty(flightServiceSegments[3].lastElementChild);
    const departureTime = departureDateAndTimeArray[3];
    const arrivalTime = arrivalDateAndTimeArray[3];
    return {
        airline: getNodeProperty($1('.airline-name', item)),
        baggage: getNodeProperty($1('.flight-service-fare-description', item)),
        departureDate,
        departureTime,
        departureCity: departureDateAndTimeArray[0],
        departureAirport: departureAirportData,
        arrivalDate,
        arrivalTime,
        arrivalCity: arrivalDateAndTimeArray[0],
        arrivalAirport: arrivalAirportData,
        travelTime: parseInt(timeDifference(departureTime, arrivalTime))
    }
}

function getDepartureAndArrivalElements(allDetailsElements) {
    const allowedTexts = ["Перелет", "Доп. перелет", "Отель"];
    const flightAndHotelElements = allDetailsElements.filter(item => {
        const text = getNodeData('.package-details__item-left-side', item);
        return text ? allowedTexts.some(allowedText => text.includes(allowedText)) : null;
    });
    const hotelElement = flightAndHotelElements.find(item => item.classList.contains('hotel-service'));
    const hotelElementIndex = flightAndHotelElements.indexOf(hotelElement);
    const departureElements = flightAndHotelElements.slice(0, hotelElementIndex);
    const arrivalElements = flightAndHotelElements.slice(hotelElementIndex + 1);
    return {
        departureElements,
        arrivalElements
    }
}

function openFlightModal(tourHeader, sideBlock, hasMainHotel) {
    hasMainHotel
        ? $1('.group__header-block a', tourHeader).click()
        : $1('.additional-font', sideBlock).click();
}

function checkLoadedPackageFlight() {
    const packageFlight = $1('[data-qa="package-dialog"]');
    return $$('.package-details__item', packageFlight);
}

async function getFlight(tour, tourFromModal, tourHeader, hasMainHotel) {
    try {
        const sideBlock = $1('.card__right-side-block', tour || tourFromModal);
        openFlightModal(tourHeader, sideBlock, hasMainHotel);
        const allDetailsElements = await waitingFor(checkLoadedPackageFlight, 100, 5);
        const {departureElements, arrivalElements} = getDepartureAndArrivalElements(allDetailsElements);
        const departureSegments = departureElements.map(item => createSegment(item));
        const arrivalSegments = arrivalElements.map(item => createSegment(item));
        const departureSector = {
            segments: departureSegments
        }
        const arrivalSector = {
            segments: arrivalSegments
        }
        const packageFlight = $1('[data-qa="package-dialog"]');
        $1('.modal__close-button', packageFlight).click();
        return {
            sectors: [departureSector, arrivalSector]
        }
    } catch (e) {
        return null
    }
}

function getHotelRowByImage(img) {
    return img.closest('.card') || img.closest('.group__item');
}
