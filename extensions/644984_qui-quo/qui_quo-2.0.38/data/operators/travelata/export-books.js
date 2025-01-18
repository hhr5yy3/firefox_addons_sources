window.OPERATOR_NAME = "Travelata";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".orders-list__item").forEach(div => {
        if (!div.querySelector(".qq")) {
            const {container, buttons, exportButton} = createQuickBookingContainer();
            exportButton.style.background = '#ec933d'
            exportButton.style.borderRadius = '4px'
            exportButton.style.color = 'white'
            exportButton.style.minHeight = '32px'
            buttons.style.display = 'none';
            div.append(container);
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const orderId = lastElement(getNodeData('.orders-list__item-number-value a', tour, 'href').split('/'));
    const {data: orderInfo} = await fetch(`https://agency.travadm.org/api/book/getSingleOrder?orderUuid=${orderId}`).then(response => response.json());
    const product = orderInfo.tourProduct;
    const hotel = product.hotel;
    const [dateStart, dateEnd] = [new Date(product.checkInDate).toLocaleDateString('ru'), new Date(product.checkOutDate).toLocaleDateString('ru')]
    const finance = orderInfo.finance;
    const prices = new Prices({
        nationalGrossPrice: finance.totalPrice,
        nationalNettPrice: finance.surcharge + finance.paidAmount,
        nationalCurrency: "RUB"
    })
   const flight = getFlight(orderInfo.currentRoute);
    const transfers = orderInfo.transfers.map(t => parseTransfer(t, flight))
    const cachedPassengers = orderInfo.touristDocuments.map(extractPassengerInfo);
    let option = {
        dateStart,
        dateEnd,
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: hotel.name,
        href: null,
        country: product.country.name,
        region: product.resort.name,
        roomType: product.room.roomName,
        boardType: product.meal.name,
        price: finance.totalPrice,
        currency: "RUB",
        prices,
        flight,
        transfers,
        cachedPassengers
    };
    return option;
}

function getFlight(route) {
    try {
       const sectors = [route.there, route.back].filter(Boolean).map(parseSector);
       return {sectors}
    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseSector(sector) {
    const segments = sector.legs.map(parseSegment);
    return {segments};
}

function parseSegment(segment) {
    const arrivalDateTime = new Date(segment.arrivalDate);
    const departureDateTime = new Date(segment.departureDate);
    return new FlightSegment({
        flightNumber: segment.flightNumber,
        airline: segment.airline.name,
        plane: segment.airplane,
        departureDate: departureDateTime.toLocaleString('ru'),
        departureTime: departureDateTime.toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'}),
        departureCity: segment.airportDeparture.cityName,
        departureAirport: segment.airportDeparture.name,
        departureAirportID: segment.airportDeparture.iata,
        serviceClass: segment.business ? "Бизнес" : "Эконом",
        arrivalDate: arrivalDateTime.toLocaleString('ru'),
        arrivalTime: arrivalDateTime.toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'}),
        arrivalCity: segment.airportArrival.cityName,
        arrivalAirport: segment.airportArrival.name,
        arrivalAirportID: segment.airportArrival.iata
    })
}

function getHotelRowByImage(img) {
    return img.closest('.orders-list__item');
}

function parseTransfer(transfer, flight) {
    const segments = flight.sectors[transfer.direction === 'there'? 0 : 1].segments;
    return new quickBookingValue({
        description: transfer.transfer.description,
        dateStart: lastElement(segments).departureDate,
        dateEnd: lastElement(segments).departureDate
    })
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);

    return {tourOptions, transfers: tourOptions.transfers, cachedPassengers: tourOptions.cachedPassengers};
}

function parsePassengers(_, passengers) {
    return passengers;
}

function extractPassengerInfo(doc) {
    const passenger = new Passenger({
        birthday: new Date(doc.birthday).toLocaleDateString('ru'),
        issueDate: new Date(doc.issueDate).toLocaleDateString('ru'),
        lastName: doc.lastName,
        firstName: doc.firstName,
        secondName: doc.middleName,
        sex: String(doc.sex),
        number: doc.serialNumber,
        docType: mapType(doc.type)
    });
    return passenger;
}

function mapType(type) {
    switch (type) {
        case 'TouristInternalRussianPassport':
            return 'nationalPassport';
        case 'BirthCertificate':
            return 'birthdayCertificate';
        default:
            return 'internationalPassport';
    }
}
