window.OPERATOR_NAME = "Portbilet";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);
addEventListener("popstate", (event) => sendMessageToAddon("reinject content-scripts"));

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const headTable = $1('.sln-orders-list-table thead tr');
    if ( headTable && !$1('.qq', headTable) ) {
       const newTh = document.createElement('th');
       newTh.classList.add('qq');
       newTh.textContent = 'Qui-Quo';
       headTable.append(newTh)
    }
    $$('.sln-orders-list-table tbody tr').forEach(div => {
        if (!div.querySelector(".qq")) {
            const {container, buttons, exportButton, logo} = createQuickBookingContainer();
            if ( !exportButton || !exportButton.style ) {
                return;
            }
            buttons.style.display = 'none';
            logo.style.display = 'none';
            exportButton.style.minHeight = '18px';
            exportButton.style.minWidth = '64px';
            exportButton.textContent = 'БЗ в CRM';
            exportButton.dataset.qqCaption = 'БЗ в CRM'
            div.append(container);
        }
    });
}

async function createOption(img) {
    const bookRow = getHotelRowByImage(img);
    const bookNumber = getNodeData('[data-sln-uid="orderNumber"]', bookRow);
    const {result} = await fetch(`https://${location.host}/vip-b2b/cabinet/order/orderWithFormSettings?orderNumber=${bookNumber}`).then(r => r.json())

    const {order} = result;
    let option = {
        order,
        tourOperatorReference: bookNumber
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const order = tourOptions.order;
    const {services, passengers} = order;
    const flights = services.filter(svc => svc.productType && svc.productType.uid === 'AVIA').map(parseFlight);
    const railways = services.filter(svc => svc.train).map(parseTrain);
    const cachedPassengers = parsePassengers(null, passengers);

    tourOptions.flights = [flights[0]];
    const priceInfo = order.servicePricesInfo;
    const prices = new Prices();
    const currency = priceInfo.currency.uid;
    const priceType = mapPriceType(currency)

    prices[`${priceType}`].gross = priceInfo.servicePrices && priceInfo.servicePrices.length > 0 ? priceInfo.servicePrices.reduce((init, sp) => Number(sp.price) + init, 0) : null;
    prices[`${priceType}`].nett = priceInfo.servicePrices && priceInfo.servicePrices.length > 0  ? priceInfo.servicePrices.reduce((init, sp) => Number(sp.cost) + (Number(sp.toSystem) || 0) + init, 0) : null;
    prices[`${priceType}`].currency = currency;
    return {
        tourOptions,
        railways,
        prices,
        cachedPassengers,
        tourOperatorReference: tourOptions.tourOperatorReference
    }
}

function parseTrain(svc) {
    const segments = svc.train.segments;
    return new quickBookingValue({
        dateStart: formatDatePortbilet(segments[0].departureDateInfo.moscowDate || segments[0].departureDateInfo.localDate),
        dateEnd: formatDatePortbilet( lastElement(segments).arrivalDateInfo.localDate),
        description: svc.displayName
    })
}

function parseFlight(service) {
    const flightType = service.tariffType && service.tariffType.uid;
    return {sectors: service.legs.map(parseSector), type: flightType === 'REGULAR' ? 'Scheduled' : 'Charter'};
}

function parseSector(leg) {
    const segments = leg.segments.map(parseSegment)
    return {segments};
}

function parseSegment(data) {
    return new FlightSegment({
        flightNumber: `${data.marketingAirline.uid} ${data.flightNumber}`,
        airline: data.marketingAirline.caption,
        travelTime: convertMinToHours(data.durationInMinutes),
        plane: data.aircraft ? data.aircraft.caption : '',
        departureDate: formatDatePortbilet(data.departureDateTime),
        departureTime: formatTimePortbilet(data.departureDateTime),
        departureCity: data.departureLocation.cityName,
        departureAirport: data.departureLocation.caption,
        departureAirportID: data.departureLocation.displayCode,
        departureTerminal: data.departureTerminal,
        serviceClass: data.classOfService.caption,
        arrivalDate: formatDatePortbilet(data.arrivalDateTime),
        arrivalTime: formatTimePortbilet(data.arrivalDateTime),
        arrivalCity: data.arrivalLocation.cityName,
        arrivalAirport: data.arrivalLocation.caption,
        arrivalAirportID: data.arrivalLocation.displayCode,
        arrivalTerminal: data.arrivalTerminal,
        baggage: data.luggageInfos.reduce((init, now) =>  now.description + init+';'  , '')
    })
}

function getPrices(claimDocument) {
}

function parseService(svc) {
    return new quickBookingValue({})
}

function parsePassengers(btn, passengers) {
    if ( btn )  {
        return passengers;
    }
    return passengers.map(extractPassengerInfo);
}

function extractPassengerInfo(obj) {
    const {passport} = obj;
    const passenger = new Passenger({
        docType: mapDoc(passport.type.uid),
        sex: mapSex(passport.gender.uid),
        birthday: formatDatePortbilet(passport.birthDate),
        expire: passport.expirationDate ? formatDatePortbilet(passport.expirationDate) : null,
        lastName: passport.lastName,
        firstName: passport.firstName,
        nationality: passport.citizenship.caption,
        number: passport.number,
    });
    return passenger;
}

function mapDoc(str) {
    if (str === 'INTERNAL') {
        return 'nationalPassport'
    }
    if (str === 'FOREIGN') {
        return 'internationalPassport'
    }
    return '';
}

function mapSex(str) {
    if (str === 'MALE') {
        return '1'
    }
    if (str === 'FEMALE') {
        return '2'
    }
    return '';
}


function formatDatePortbilet(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru');
}

function formatTimePortbilet(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'});
}
