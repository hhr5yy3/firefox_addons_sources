window.OPERATOR_NAME = window.location.hostname === 'agency.sunmar.ru' ? "Sunmar" : "Coral";
window.showTopHotelsRating = false;

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
    $$(".reservation-list div[data-voucher]").forEach(div => {
        const chat = div.querySelector('#tab-content-5');
        if ( chat && chat.classList.contains('active') && chat.clientHeight > 0 ) {
            const container = div.querySelector('.qq-container');
            container ? container.remove() : null;
            return;
        }
        if ( !div.querySelector(".qq")) {
            createCell(div);
        }
    });


}

function createCell(div) {
    const container = createQQContainer();
    const qqBtns = container.querySelector('.qq-box');
    const btn = container.querySelector('.qq-export-button');
    container.style.justifyContent = 'center';
    container.style.maxWidth = "200px";
  //  container.style.position = "absolute";
    container.style.right = "0";
    container.style.bottom = "0.5rem";
    container.style.transform = "scale(0.75)";
    qqBtns.style.display = 'none';
    btn.classList.add('btn');
    const img = container.querySelector('img');
    const span = document.createElement('span');
    span.innerHTML = `<span style="
            font-weight: bold;
            padding: 0px;
            color: black;
            margin-left: 16px;
            cursor: pointer;
            ">✖ </span>`;
    img.after(span);
    span.onclick = () => container.style.display = 'none';
    div.append(container);
}

async function createOption(img) {
    const bookElem = getHotelRowByImage(img);
    const bookNumber = bookElem.dataset.voucher;
    const hostnameParts = window.location.hostname.split('.');
    const apiHostname = hostnameParts.length === 3 ? `agencyapi.${hostnameParts[1]}.${hostnameParts[2]}` : `agencyapi.${hostnameParts[0]}.${hostnameParts[1]}`;
    const baseUrl = `https://${apiHostname}/api/Reservation/`;
    const hotelDetailsUrl = baseUrl + 'GetVoucherHotelDetailList?voucher='+ bookNumber;
    const flightDetailsUrl = baseUrl+'GetVoucherFlightDetailList?voucher=' + bookNumber;
    const serviceDetailsUrl = baseUrl + 'GetVoucherAdditionalServiceList?voucher=' + bookNumber;
    const touristListUrl = baseUrl + 'GetReservationTouristList?voucher=' + bookNumber;
    const priceDetailsUrls = baseUrl + 'GetAgencyPaymentInfo?VoucherId=' + bookNumber;

    const [hotelDetails, flightDetails, serviceDetails, touristList, priceDetails] = await Promise.all([
        fetchCoralBook(hotelDetailsUrl),
        fetchCoralBook(flightDetailsUrl),
        fetchCoralBook(serviceDetailsUrl),
        fetchCoralBook(touristListUrl),
        fetchCoralBook(priceDetailsUrls)]);

    img.removeAttribute('disabled');
    img.textContent = 'Быстрая Заявка в CRM';
    img.setAttribute('passengers', JSON.stringify(touristList || []));

    let hotels = (hotelDetails||[{}]).map(extractHotel);
    const insurance = serviceDetails
        ? serviceDetails
              .filter((svc) => svc.serviceType === 'I' || svc.name.match(/страховка/i))
              .map(parseService)
              .filter((s) => s != null)
        : [];
    const transfers = serviceDetails
        ? serviceDetails
              .filter((svc) => svc.serviceType === 'T' || svc.name.match(/Transfer| трансфер/i))
              .map(parseService)
              .filter((s) => s != null)
        : [];

    const other = serviceDetails
        ? serviceDetails
              .filter(
                  (svc) =>
                      svc.serviceType !== 'T' &&
                      !svc.name.match(/Transfer| трансфер/i) &&
                      svc.serviceType !== 'I' &&
                      !svc.name.match(/страховка/i)
              )
              .map(parseService)
              .filter((s) => s != null)
        : [];

    const nettPrice = priceDetails.toPayAmount || 0;
    const price = priceDetails.totalPrice || 0;
    const currency = priceDetails.currency.name || 'EUR';
    const flight = { sectors: flightDetails.map(s => parseSegment(s.flightDetail)) };

    const prices = new Prices();

    const companyPriceType = mapPriceType(priceDetails.companyCurrency.name);
    const priceType = mapPriceType(priceDetails.currency.name);

    prices[`${companyPriceType}`].gross = priceDetails.totalPriceCompany;
    prices[`${companyPriceType}`].nett = priceDetails.toPayAmountCompany;
    prices[`${companyPriceType}`].currency = priceDetails.companyCurrency.name;


    prices[`${priceType}`].gross = priceDetails.totalPrice;
    prices[`${priceType}`].nett = priceDetails.toPayAmount;
    prices[`${priceType}`].currency = priceDetails.currency.name;
    if (priceDetails.payments ) {
        priceDetails.payments.forEach(pay => {
            const foreignObj = {
                date: pay.paymentDate ? new Date(pay.paymentDate).toLocaleDateString('ru') : null,
                amount: pay.paymentAmount
            }
            const nationalObj = {
                date: foreignObj.date,
                amount: pay.paymentAmountCompany
            }
            prices.addNationalPayment(nationalObj);
            prices.addForeignPayment(foreignObj);

        })
    }

    if (priceDetails.paymentPlans) {
        priceDetails.paymentPlans.forEach(pay => {
            const foreignObj = {
                date: pay.paymentDate ? new Date(pay.paymentDate).toLocaleDateString('ru') : null,
                amount: pay.paymentAmount
            }
            const nationalObj = {
                date: foreignObj.date,
                amount: pay.paymentAmountCompany
            }
            prices.addNationalPaymentToSchedule(nationalObj);
            prices.addForeignPaymentToSchedule(foreignObj);

        })
    }

    if (priceDetails.totalDebt && priceDetails.totalDebt > 0 && priceDetails.toPayAmount > 0) {
        prices.paidStatus = window.PAID_STASTUSES.outstanding;
    }

    if (priceDetails.totalDebt === 0 && priceDetails.toPayAmount > 0 ) {
        prices.paidStatus = window.PAID_STASTUSES.paid;
    }

    let option = {
        hotels,
        insurance,
        transfers,
        other,
        dateStart: hotels.length > 0 ? hotels[0].dateStart : null,
        dateEnd: hotels.length > 0 ? hotels[0].dateEnd : null,
        nights: hotels.length > 0 ? hotels[0].nights : null,
        prices,
        price,
        nettPrice,
        nettPriceCurrency: currency,
        currency: currency,
        operator: window.OPERATOR_NAME,
        tourOperatorReference: bookNumber,
        flight
    };
    return option;
}

function parseHotels(tourOptions) {
    return tourOptions.hotels;
}

function parseSegment(segment) {
    const baggage = `Ручная кладь: ${segment.cabinBaggage}  ${segment.baggageUnit}, Багаж: ${segment.adultBaggage} ${segment.baggageUnit}`
    return {segments: [
          new FlightSegment(
              {
                  flightNumber: segment.flightCode,
                  airline: segment.supplier,
                  travelTime: segment.duration,
                  departureDate: new Date(segment.flightDate).toLocaleDateString('ru'),
                  departureTime: segment.departureTime,
                  departureAirportID: segment.depAirport,
                  departureTerminal: "",
                  serviceClass: segment.seatClass,
                  arrivalDate: new Date(segment.arrivalDate).toLocaleDateString('ru'),
                  arrivalTime: segment.arrivalTime,
                  arrivalAirportID: segment.arrAirport,
                  baggage
              }
          )
        ]}
}

function parseService(svc) {
    try {
        const dates = svc.name.match(getRegexPatterns().date);
        const pCount = svc.adultCount + svc.childCount + svc.infantCount;
        return new quickBookingValue({
            description: svc.name,
            dateStart: dates[0],
            dateEnd: dates[1],
            totalPrice: svc.priceDestination,
            totalPriceCurrency: svc.currencyNameDestination,
            passengers: {
                adults: svc.adultCount || 0,
                children: svc.childCount || 0,
                infants: svc.infantCount || 0,
                count: pCount
            }
        });
    } catch (e) {
        console.error(e, svc);
        return null;
    }
}

async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const services = {
        insurance: tourOptions.insurance,
        transfers: tourOptions.transfers,
        flight: tourOptions.flight,
        other: tourOptions.other,
        nettPrice: tourOptions.nettPrice,
        nettPriceCurrency: tourOptions.nettPriceCurrency,
        tourOptions,
        tourOperatorReference: tourOptions.tourOperatorReference,
        notes: ''
    };
    return services;
}

function extractHotel(hotel) {
    const details = hotel.hotelDetail;
    const [country, ...region] = details.region.split(/\s*,\s*/);
    const accommodation = [(hotel.adultCount ? hotel.adultCount + " ADL" : ""),
                           (hotel.childCount ? hotel.childCount + " CHLD" : ""),
                           (hotel.infantCount ? hotel.infantCount + " INF" : "")].filter(s=>s).join(' ')
    return {
        dateStart: new Date(details.checkInDate).toLocaleDateString('ru'),
        dateEnd: new Date(details.checkOutDate).toLocaleDateString('ru'),
        nights: details.nights,
        hotelName: [details.hotel, details.category].join(' '),
        roomType: details.room,
        accommodation,
        boardType: details.meal,
        region: region.join(', '),
        country
    }
}

function mapCurrency(code) {
    const currencies = {
        2: 'USD',
        3: 'EUR',
        4: 'RUB'
    }
    return currencies[code];
}

function parsePassengers(button) {
    try {
        const tourists = Object.values(JSON.parse(button.getAttribute('passengers')));
        return tourists.map(tourist => {
            const [firstName, lastName, secondName] = tourist.name.trim().split(/\s/);
            const serial = tourist.passportSerie ? tourist.passportSerie : null;
            const number = tourist.passportNumber ? tourist.passportNumber : null;
            const birthday = tourist.birthDate ? new Date(tourist.birthDate).toLocaleDateString('ru') : null;
            return new Passenger({
                lastName,
                firstName,
                secondName,
                expire: new Date(tourist.passportValidThru).toLocaleDateString('ru'),
              //  issueDate: new Date(tourist.passportGivenDate).toLocaleDateString('ru'), //TODO Поправить, когда корал начнет возвращать дату
                serial,
                number,
                birthday,
                docType: tourist.documentType === 'Загранпаспорт' ? "internationalPassport" : "nationalPassport"
            })
        })
    } catch (e) {
        console.log(e);
        return [];
    }

}

async function fetchCoralBook(url) {
    const userToken = (document.cookie.match(/ApiToken=(.+?);/) || document.cookie.match(/ApiToken=(.+)$/))[1];
    return await fetchTimeout(20000, fetch(url, {
        "headers": {
            "authorization": "Bearer " + userToken,
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json;charset=UTF-8"
        },
        "method": "GET"
    })).then(resp => resp.json()).catch(console.log);
}


function getHotelRowByImage(img) {
    return img.closest('[data-voucher]');
}
