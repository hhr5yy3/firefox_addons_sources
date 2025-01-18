window.OPERATOR_NAME = "Алеан";
window.showTopHotelsRating = false;
window.injectionSelector = '.cabinetOrderbookList-lineContentMessage';

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    if ( !initParams || initParams.hideQuickBookingTutorial === true ) {
        return '';
    }
    querySelectorAll(document, ".cabinetOrderbookList-lineContentMessage").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            const container = createQQContainer();
            const qqBtns = container.querySelector('.qq-box');
            container.style.minWidth = '50px';
            container.style.width = '50px';
            container.style.transform = 'scale(0.8)';
            container.style.justifyContent = 'center';
            qqBtns.style.display = 'none';
            div.append(container);
        }
    });
}

async function createOption(img) {
    const booking = getHotelRowByImage(img);

    const bookNumber = getText(booking.querySelector('.cabinetOrderbookList-lineContentTextNumber'));
    img.setAttribute('disabled', 'disabled');
    img.textContent = 'Загрузка...';
    const baseUrl = `${window.location.protocol}//${window.location.hostname}/ksb-gate/agency/cabinet`;
    const [bookInfo, bookDetails] = await Promise.all([fetchAleanBook(`${baseUrl}/invoice/get-list/`, bookNumber),
                                                               fetchAleanBook(`${baseUrl}/orderbook/get-detail/`, bookNumber)]);
    img.removeAttribute('disabled');
    img.textContent = 'Быстрая Заявка в CRM';
    const services = bookInfo.list;
    const detailedOrders = bookDetails.OrderList;

    let price = 0;
    let nettPrice = 0;
    let currency = 'RUB';
    let orders = [];
    let paymentSchedule = [];
    let payment = {};
    let paid = false;
    for ( const service of Object.values(services) ) {
         orders.push(...service.OrderList);
         price = price + service.touristTotal;
         nettPrice = nettPrice + service.payValue;
         currency = service.currencyISOCode === 'руб.' ? 'RUB' : service.currencyISOCode;
         paymentSchedule = service.PaymentSchedule || [];
         payment = {date: service.PayDate ? new Date(service.PayDate).toLocaleDateString('ru') : null, amount: service.PayValue};
         paid = service.DocumentStatus === "FIXEDPAID" ? window.PAID_STASTUSES.paid : window.PAID_STASTUSES.outstanding;
    }
    price = Number(price.toFixed(2));
    nettPrice = Number(nettPrice.toFixed(2));
    orders = zip([orders, detailedOrders]).map( arr => Object.assign(...arr, {currency}) );

    img.setAttribute('passengers', JSON.stringify(bookDetails.TouristList || []));
    const hotels = orders.filter( order => order.OrderKind && order.OrderKind.match(/ABODE/i) )
        .map(o => extractHotel(o, bookDetails));
    const flights = orders.filter( order => order.OrderKind && order.OrderKind.match(/TRANSP/i))
        .map(extractFlight);
    const transfers = orders.filter( order => order.OrderKind && order.OrderKind.match(/TRANSFER/i))
        .map(parseTransfer);
    const insurance = orders.filter( order => order.OrderKind && order.OrderKind.match(/INSURANCE/i))
        .map(parseBookingValue);
    const other =  orders.filter( order => order.OrderKind && !order.OrderKind.match(/ABODE|TRANSP|TRANSFER|INSURANCE/i))
        .map(parseBookingValue);
    const prices = new Prices();
    prices.nationalNettPrice = nettPrice;
    prices.nationalGrossPrice = price;
    prices.nationalCurrency = currency;
    prices.paidStatus = paid;
    paymentSchedule.forEach( payment => {
        const [date, time] = payment.Date.split(/\s+/);
        const percent = payment.PrepayPercent;
        const amount = payment.sum;
        prices.addNationalPaymentToSchedule({date, time, percent, amount})
    });

    prices.addNationalPayment(payment);

    let option = {
        hotels,
        flights,
        transfers,
        insurance,
        other,
        dateStart: new Date(bookDetails.BeginDate).toLocaleDateString('ru'),
        dateEnd:new Date( bookDetails.EndDate).toLocaleDateString('ru'),
        nights: hotels.reduce((a, b) => a + parseInt(b.nights), 0).toString(),
        price,
        nettPrice,
        prices,
        nettPriceCurrency: currency,
        currency,
        operator: "Алеан",
        city_from: flights && flights.length > 0  ? flights[0]?.sectors[0]?.segments[0]?.departureCity : '',
        tourOperatorReference: bookNumber
    };
    return option;
}

function extractHotel(hotel, b) {
    const dateStart = new Date(hotel.AbodeOrder.BeginDateTime);
    const dateEnd = new Date(hotel.AbodeOrder.EndDateTime);    //OrderList[0].AbodeOrder.RoomList[0].PlaceList[0].PlacePacketList[0].PacketService[0].ServiceName
    const boardType = optionalChaining(hotel.AbodeOrder,
        ['RoomList', '0', 'PlaceList', '0', 'PlacePacketList', '0', 'PacketService'], []).find(s => s.ServiceTypeName === 'Питание') || {};
    return {
        dateStart: dateStart.toLocaleDateString('ru'),
        dateEnd: dateEnd.toLocaleDateString('ru'),
        nights: getDistance(dateStart, dateEnd).toString(),
        hotelName: hotel.AbodeOrder.HotelShortName,
        roomType: hotel.AbodeOrder.RoomTypeName,
        accommodation:  hotel.AbodeOrder.RoomCategoryName,
        boardType: hotel.ServiceList[0].Abode ? hotel.ServiceList[0].Abode.PacketName : boardType.ServiceName,
        region:  [hotel.AbodeOrder.RegionName, hotel.AbodeOrder.TownName].filter(s=>s).join(', '),
        country: hotel.AbodeOrder.CountryName,
        nettPrice:  Number(hotel.Total),
        nettCurrency: hotel.currency,
        price: Number(hotel.Sum),
        currency: hotel.currency,
        totalPrice:  Number(hotel.Sum),
        totalCurrency: hotel.currency
    }
}

function extractFlight(flight) {
    try {
        const orderInfo = flight['TranspOrder'];
        const sectors = [orderInfo, orderInfo['BackTranspOrder']].filter(s=>s).map(segment => {
            const dateStart = new Date(segment.BeginDateTime);
            const dateEnd = new Date(segment.EndDateTime);
            return {
                segments: [new FlightSegment({
                    flightNumber: segment.TripNumber,
                    airline: segment.CarrierName,
                    departureDate: dateStart.toLocaleDateString('ru'),
                    departureTime: dateStart.toLocaleTimeString(),
                    departureCity: segment.DepartureTownName,
                    departureAirport: segment.DeparturePortName,
                    serviceClass: segment.TransportClassName,
                    arrivalDate: dateEnd.toLocaleDateString('ru'),
                    arrivalTime: dateEnd.toLocaleTimeString(),
                    arrivalCity: segment.ArrivalTownName,
                    arrivalAirport: segment.ArrivalPortName,
                })]
            }
        });
        return {sectors}
    } catch(e) {
        console.log(e);
        return null;
    }
}

function parseBookingValue(order) {
    return new quickBookingValue({
        description: optionalChaining(order, ['ServiceList', '0', 'AddService', 'ServiceName']) ||  order.TourPointName,
        dateStart: new Date(order.BeginDate).toLocaleDateString('ru'),
        dateEnd: new Date(order.EndDate).toLocaleDateString('ru'),
        nettPrice: Number(order.Total),
        nettCurrency: order.currency,
        price: Number(order.Sum),
        currency: order.currency,
        totalPrice: Number(order.Sum),
        totalCurrency: order.currency
    });
}

function parseTransfer(order) {
    const orderKey = Object.keys(order).find(key => key.match(/TransferOrder/i));
    const orderInfo = order[orderKey];
    return new quickBookingValue({
        description: `${orderInfo.TransferName}, ${orderInfo.DeparturePortName || orderInfo.DepartureHotelName || orderInfo.DepartureTownName} -> ${orderInfo.ArrivalHotelName || orderInfo.ArrivalPortName || orderInfo.ArrivalTownName}`,
        dateStart: new Date(orderInfo.DepartureDateTime).toLocaleDateString('ru'),
        nettPrice:  Number(orderInfo.Total),
        nettCurrency: order.currency,
        price: Number(order.Sum),
        currency: order.currency,
        totalPrice:  Number(order.Sum),
        totalCurrency: order.currency,
        count: (orderInfo.TouristList || []).length
    });
}

async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const services = {
        insurance: tourOptions.insurance,
        transfers: tourOptions.transfers,
        other: tourOptions.other,
        nettPrice: tourOptions.nettPrice,
        nettPriceCurrency: tourOptions.nettPriceCurrency,
        tourOptions,
        prices: tourOptions.prices,
        tourOperatorReference: tourOptions.tourOperatorReference,
        notes: ''
    };
    return services;
}

function parseHotels(tourOptions) {
     return tourOptions.hotels;
}

function parsePassengers(button) {
    try {
        const tourists = Object.values(JSON.parse(button.getAttribute('passengers')));
        return tourists.map( tourist => {
            const [lastName, firstName, secondName] = tourist.TouristName.split(/\s/);
            const serial = tourist.PassportData ? tourist.PassportData.slice(0,4) : null;
            const number = tourist.PassportData ? tourist.PassportData.slice(4) : null;
            const birthday = tourist.BirthDate ? new Date(tourist.BirthDate).toLocaleDateString('ru') : null;
            return new Passenger({lastName, firstName, secondName,serial, number, birthday, docType:"nationalPassport"})
        })
    } catch(e) {
        console.log(e);
        return [];
    }

}

function getHotelRowByImage(img) {
    return img.closest('.cabinetOrderbookList-line');
}

async function fetchAleanBook(url, bookNumber) {
    return await fetchTimeout(20000, fetch(url, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json;charset=UTF-8"
        },
        "body": `{"orderbookId": "${bookNumber}"}`,
        "method": "POST"
    })).then(resp => resp.json()).catch(console.log);
}
