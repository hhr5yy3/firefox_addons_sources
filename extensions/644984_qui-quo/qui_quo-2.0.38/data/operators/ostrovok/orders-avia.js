
async function createOption(img) {
    const {primaryInfo, modalPopupCloseButton, popupWrapper} = await openModal(img)
    const prices = getPrices(primaryInfo)

    const flight = getFlight(popupWrapper);
    const passengers = $$('.prtnr-orders-avia-passenger', popupWrapper).map(parsePassenger)

    let option = {
        prices,
        flight,
        passengers,
        tourOperatorReference: getContentByTitle(/Заказ №/, primaryInfo.fields, 'content')
    };

    modalPopupCloseButton.click();
    return {tourOptions: option, ...option};
}

function parsePassenger(passengerNode) {
    const docTypeText = getNodeData('.prtnr-orders-order-field-document .prtnr-orders-order-field-content', passengerNode, 'textContent', '')
    const docType = mapDocType(docTypeText);
    const number = getNodeData('.prtnr-orders-order-field-series_and_number .prtnr-orders-order-field-content', passengerNode)
    const sexText = getNodeData('.prtnr-orders-order-field-gender .prtnr-orders-order-field-content', passengerNode)

    const passenger =  new Passenger({
        docType,
        sex: sexText.match(/женский/) ? '2' : '1',
        birthday: dateFromDayAndMonthNameString(getNodeData('.prtnr-orders-order-field-birth_date .prtnr-orders-order-field-content', passengerNode)),
        firstName: getNodeData('.prtnr-orders-order-field-first_name .prtnr-orders-order-field-content', passengerNode),
        lastName: getNodeData('.prtnr-orders-order-field-last_name .prtnr-orders-order-field-content', passengerNode),
        expire: dateFromDayAndMonthNameString(getNodeData('.prtnr-orders-order-field-good_until .prtnr-orders-order-field-content', passengerNode)),
        nationality: getNodeData('.prtnr-orders-order-field-citizenship .prtnr-orders-order-field-content', passengerNode),
      //  email: getNodeData('.prtnr-orders-order-field-email .prtnr-orders-order-field-content', passengerNode),
        phone: getNodeData('prtnr-orders-order-field-phone .prtnr-orders-order-field-content', passengerNode),
    })
    passenger.setDocNumber(number)
    return passenger;
}

function mapDocType(docTypeText) {
    if ( docTypeText.match(/Паспорт РФ/) ) {
        return 'nationalPassport';
    }
    if (docTypeText.match(/Заграничный паспорт РФ/)) {
        return 'internationalPassport';
    }
    if (docTypeText.match(/свидетельство/)) {
        return 'birthdayCertificate';
    }
    return '';
}

function getFlight(popupWrapper) {
    const sectors = $$('.prtnr-orders-avia-waybill', popupWrapper).map(parseSectors);
    return {sectors};
}

function parseSectors(sector) {
    const segments = $$('.prtnr-orders-avia-segment', sector).map(parseSegments)
    return {segments};
}

function parseSegments(segment) {
    const travelTime = getNodeData('.prtnr-order-avia-segment-line-road_time', segment, 'textContent', '').match(/(\d{1,2}).+?(\d{1,2})/);

    const departure =  $1('.prtnr-order-avia-segment-departure', segment);
    const departureAirport = getNodeProperty($1('.prtnr-order-avia-segment-airport', departure).lastChild, '').split(/\s*,\s*/);

    const arrival = $1('.prtnr-order-avia-segment-arrival', segment)
    const arrivalAirport = getNodeProperty($1('.prtnr-order-avia-segment-airport', arrival).lastChild, '').split(/\s*,\s*/);

    return new FlightSegment({
        flightNumber: getNodeData('.prtnr-order-avia-segment-line-flight_number', segment, 'textContent', '').replace(/\s*Номер\s*рейса\s*/i, ''),
        travelTime: travelTime ? [travelTime[1], travelTime[2]].join(':') : null,
        plane: getNodeData('.prtnr-order-avia-segment-line-aircraft', segment),
        departureDate: dateFromDayAndMonthNameString(getNodeData('.prtnr-order-avia-segment-full-date', departure)),
        departureTime: getNodeData('.prtnr-order-avia-segment-time', departure),
        departureCity: getNodeData('.prtnr-order-avia-segment-city-name', departure),
        departureAirport: departureAirport[0],
        departureAirportID: getNodeData('.prtnr-order-avia-segment-airport-code', departure),
        departureTerminal: departureAirport[1],
        arrivalDate: dateFromDayAndMonthNameString(getNodeData('.prtnr-order-avia-segment-full-date', arrival)),
        arrivalTime: getNodeData('.prtnr-order-avia-segment-time', arrival),
        arrivalCity: getNodeData('.prtnr-order-avia-segment-city-name', arrival),
        arrivalAirport: arrivalAirport[0],
        arrivalAirportID: getNodeData('.prtnr-order-avia-segment-airport-code', arrival),
        arrivalTerminal: arrivalAirport[1]
    })
}

async function createQuickBookingOption(button) {
    const {
        prices,
        other,
        passengers,
        tourOperatorReference,
        tourOptions
    } = await createOption(button);

    const services = {
        tourOperatorReference,
        tourOptions,
        other,
        prices,
        cachedPassengers: passengers
    }
    return services;
}

function parsePassengers(_, cachedPassengers) {
    return cachedPassengers;
}

function getHotelRowByImage(img) {
    return img.closest('.prtnr-orders-order-container');
}
