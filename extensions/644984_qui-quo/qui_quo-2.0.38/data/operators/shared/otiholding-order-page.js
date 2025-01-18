window.OPERATOR_NAME = window.location.href.indexOf('coral') > 0 ? 'Coral' : 'Sunmar';
window.showTopHotelsRating = true;
window.injectionSelector = '#resTable';
window.countriesList = {
    "1": "Турция", "3": "Россия", "5": "Армения", "6": "Австрия", "7": "Азербайджан", "8": "Беларусь",
    "10": "Болгария", "12": "Египет", "18": "Италия", "31": "ОАЭ", "33": "Таиланд", "34": "Тунис",
    "35": "Мальдивы", "36": "Доминиканская Республика", "38": "Индонезия", "39": "Сейшелы", "40": "Шри-Ланка",
    "41": "Вьетнам", "42": "Испания", "43": "Греция", "45": "Марокко", "46": "Израиль", "48": "Куба",
    "51": "Катар", "52": "Индия", "58": "Иордания", "60": "Танзания", "63": "Маврикий", "72": "Андорра",
    "80": "Черногория", "98": "Мексика", "108": "Хорватия", "137": "Кения", "216": "Кипр", "278": "Абхазия",
    "282": "Бахрейн"
};

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const table = document.querySelector('#resTable');
    if ( table && !document.querySelector(".qq") ) {
        table.before(createCell());
    }
}

function createCell() {
    const wrapper = document.createElement('div');
    const container = createQQContainer();
    wrapper.style.cssText = 'display:flex;position:sticky;top:0;margin-left:101%;';
    container.style.backgroundColor = "#f3f4f6";
    container.style.padding = "5px";
    container.style.border = "1px solid black";
    container.style.width = "185px";
    wrapper.append(container);
    return wrapper;
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotelTable = tour.querySelector('#trPackageHotel');
    const dates = getDates(hotelTable);
    const flight = getFlight();
    let option = {
        checkinDt: flight && flight.sectors.length > 0 && flight.sectors[0].checkinDt ? flight.sectors[0].checkinDt : dates.checkinDt,
        nights: dates.nights,
        extra_nights: getExtraNights(dates.nights, flight),
        hotelName: getText(hotelTable.querySelector('#divHotel')),
        href: extractHref(),
        country: getCountry(),
        region: getNodeProperty(tour.querySelector('#divArrival')),
        roomType: [getNodeProperty(hotelTable.querySelector('#divRoomType')), getNodeProperty(hotelTable.querySelector('#divAccomodation'))].join(", "),
        boardType: getNodeProperty(hotelTable.querySelector('#divMeal')),
        price: extractIntFromStr(getNodeProperty(document.querySelector('#packageNewPrice')) ||
                                    getText(document.querySelector('#packagePrice'))),
        currency: mapCurrencyUtil(getText(document.querySelector('#packagePriceCurrency'))),
        city_from: getNodeProperty(tour.querySelector('#divDeparture'), ""),
        operator: OPERATOR_NAME,
        thumbnail: null,
        occupancy: null,
        excursion: false,
        flight: getFlight()
    };
    return option;
}

function getDates(hotelTable) {
    const dateText = getText(hotelTable.querySelector('#divHotelDate'));
    const dates = dateText.split('-').map(dayMonthYearToDate);
    const checkinDt = dates[0].toLocaleDateString('ru');
    const nights = getDistance(dates[0], dates[1]);
    return {
        checkinDt,
        nights: nights.toString()
    }
}

function getExtraNights(nights, flight) {
    try {
        if (flight && flight.sectors.length > 0) {
            const lastFlightDate = checkDate(lastElement(lastElement(flight.sectors).segments).departureDate);
            const difference = getDistance(dayMonthYearToDate(checkDate(flight.sectors[0].checkinDt)), dayMonthYearToDate(lastFlightDate));
            return (Number(difference) - Number(nights)).toString();
        }
        return "0";
    } catch (e) {
        return "0";
    }
}

function extractHref() {
    const hotelId = getParameterByName('hotelID');
    const ruHost = window.location.host.match(/coral\.ru|sunmar\.ru/);
    if ( ruHost ) {
        return `https://${ruHost[0]}/hotellist/detail/${hotelId}`
    }
    return null;
}

function checkDate(dateStr) {
    return dateStr.split('.').map(num => num.padStart(2, "0")).join('.');
}

function getCountry() {
    const countryId = getParameterByName('toCountry');
    const country = window.countriesList[countryId];
    if ( country ) {
        return country;
    }
    return getNodeProperty(document.querySelector('#divCountryNews'));

}

function getHotelRowByImage(img) {
    return document.querySelector('#resTable');
}

function getFlight() {
    try {
        const sectors = querySelectorAll(document, '#FlightGoingRowEE, #FlightReturnRowEE')
            .map(parseSegments);
        return {sectors}
    } catch (e) {
        console.log(e);
    }
}

function parseSegments(segment) {
    const select = segment.querySelector('select[name*="Flight_SEL"]');
    if ( !select ) {
        return parseTextSegments(segment);
    }
    const selectOption = selectedOption(segment.querySelector('select[name*="Flight_SEL"]'));
    const [ ,flightNumber, plane, route] = selectOption.match(/([A-Z0-9]{2}\s*\d{3,4})\.*\s*\((.*?)\)\s*\((.*)\)/);
    const departureTime = (route.match(/\[(\d{2}:\d{2})\]/) || '')[1];
    const cleanRoute = route.replace(/\(.+?\)|\[.+?]/g, '').trim();
    const departureAirport = (cleanRoute.match(/(.+?):/) || '')[1];
    const arrivalAirport = (cleanRoute.split('').reverse().join('').match(/:(.+?)-/) || '  ')[1].split('').reverse().join('').trim();
    const segments = [new FlightSegment({
        flightNumber,
        plane,
        departureDate: getText(segment.querySelector('#flightArrivalDate, #flightDepartureDate')),
        departureTime,
        departureAirport,
        departureCity: departureAirport,
        arrivalAirport,
        arrivalCity: arrivalAirport,
        serviceClass: selectedOption(segment.querySelector('#cbArrivalSeatClass select')),
        baggage: getNodeProperty(segment.querySelector('#flightBaggageCapacity'))
    })]
    return {
        segments,
        checkinDt: segments[0].departureDate
    }
}

function parseTextSegments(segment) {
    const pattern = getRegexPatterns();
    let [serviceClass, segmentsText, dates, ...info] = querySelectorAll(segment, 'td').map( seg => getNodeProperty(seg, '', 'innerText') );
    const segmentsArray = segmentsText.split(/\n/);
    dates = dates.split(/\n/).map( date => date.trim() );
    const segments = segmentsArray.filter( seg => seg.match(pattern.flightNumber)).map( (seg, index) => {
        const [plane, other] = (seg.match(/\(.+?\)/g) || ['','']).map(txt => txt.replace(/\(|\)/g, ''));
        const [departureTime, arrivalTime] = other.match(pattern.time);
        const [departureAirport, arrivalAirport] = seg.split(/.+\]\s*|:\)|:-|:/).filter(port => port && port.trim());
        return new FlightSegment({
            flightNumber: seg.match(pattern.flightNumber)[0],
            plane,
            departureDate: dates[index],
            departureTime,
            departureAirport,
            arrivalAirport,
            arrivalTime,
            serviceClass,
            baggage: (info.find( txt => txt.match(/Норма багажа/)) || "").replace('Норма багажа', '')
        })
    });
    return {segments,
           checkinDt: segments[0].departureDate,
           sectorTravelTime: (info.find( txt => txt.match(/Продолжительность полета:/)) || "").replace('Продолжительность полета:', '')}
}


//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption() {
    const transfers = querySelectorAll(document, '[name="TransferID"]')
        .filter(span => span.querySelector('input:checked'))
                    .map(span => parseTransfer(getNodeProperty(span)));
    const tourInsurance = new quickBookingValue({
        description: getNodeProperty(document.querySelector('#divMedicalInsurance'), ''),
        dateStart: getNodeProperty(document.querySelector('#divMedicalDate'), '').split(/\s*-\s*/)[0],
        dateEnd: getNodeProperty(document.querySelector('#divMedicalDate'), '').split(/\s*-\s*/)[1]
    });
    const additionalInsurance = querySelectorAll(document, '#trInsurance .dxgvDataRow_Coral')
                     .map(tr => parseAdditionalServices(tr));
    const other = querySelectorAll(document, '[id*="cbpExtraList_result"] tr.dxgvDataRow_Coral')
                     .map(tr => parseAdditionalServices(tr));
    const noteInput = document.querySelector('input#txtParameter');
    const notes = `${selectedOption(document.querySelector('#cbReservationNote_SEL'))}${noteInput && noteInput.value ? " :" + noteInput.value : ''}`;
    const price = await extractFullPrices();
    const prices = new Prices();
    const domPrice = extractIntFromStr(getNodeProperty(document.querySelector('#packageNewPrice')) ||
        getText(document.querySelector('#packagePrice')));
    const domCurrency = mapCurrencyUtil(getText(document.querySelector('#packagePriceCurrency')));

    const priceType = mapPriceType(prices.nettPriceCurrency || domCurrency);
    prices[`${priceType}`].gross = parseFloat(price.fullPrice || domPrice);
    prices[`${priceType}`].nett = parseFloat(price.nettPrice);
    prices[`${priceType}`].currency = price.nettPriceCurrency || domCurrency;

    const services = {
        insurance: [tourInsurance, ...additionalInsurance],
        transfers,
        other,
        notes,
        prices,
        commission: price.commission,
        commissionCurrency: price.nettPriceCurrency,
        nettPrice: price.nettPrice,
        nettPriceCurrency: price.nettPriceCurrency
    };
    return services;
}

async function extractFullPrices() {
    try {
        let commissionCell = document.querySelector('.dxgvDataRow_Coral [data-columnname="commissionPrice"]');
        if ( !commissionCell ) {
            const getCommissionBtn = document.querySelector('[onclick*="PackageRes.ShowCommission"]');
            getCommissionBtn.click();
            commissionCell = await waitingFor(() => document.querySelector('.dxgvDataRow_Coral [data-columnname="commissionPrice"]'), 200, 10)
        }
            const commissionTable = commissionCell.closest('table');
            const commission = Number(getText(commissionCell).replace(/\D/, '.'));
            const fullPrice = Number(getText(commissionTable.querySelector('[data-columnname="price"]')).replace(/\D/, '.'));
            return {
                commission,
                nettPrice: fullPrice - commission,
                fullPrice,
                nettPriceCurrency: getText(commissionTable.querySelector('[data-columnname="currency"]'))
        }
    } catch
        (e) {
        return {}
    }

}

function parseTransfer(transferText) {
    const [ ,price, currency] = (transferText.match(/price\((.+?)\)\s*(.+)/i) || ['','', '']);
    return  new quickBookingValue({
               description: transferText.split('-')[0],
               price,
               currency

    })
}

function parseAdditionalServices(row) {
    let description = `${getNodeProperty(row.querySelector('[data-columnname="name"]'))}; Tourists: ${getNodeProperty(row.querySelector('[data-columnname="touristName"]'))}`;
    const price = getNodeProperty(row.querySelector('[data-columnname="salePrice"] span'));
    return new quickBookingValue({
        description,
        dateStart: getNodeProperty(row.querySelector('[data-columnname="beginDate"]')),
        date: getNodeProperty(row.querySelector('[data-columnname="extraServiceDate"]')),
        dateEnd:  getNodeProperty(row.querySelector('[data-columnname="endDate"]')),
        price: price,
        currency:  getNodeProperty(row.querySelector('[data-columnname="salePrice"]')).replace(/\d+|,|\s+/g, '')
    })

}

function parsePassengers() {
    const panels = querySelectorAll(document, ".resTouristAdultTable > table, .resTouristChildTable > table").filter(panel => panel.offsetHeight > 0);
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const sex = panel.querySelector('input[id*="gender"]:checked');
    const passenger = new Passenger(
        getInputsValues(panel, {
            birthday: "[name*='_birthday']",
            issueDate: "[name*='passportBeginDate']",
            expire: "[name*='passportExpiryDate']",
            lastName: "[name*='_surname']",
            firstName: "[name*='_name']",
            serial: "[name*='passportSerialNumber']",
            number: "[name*='passportNo']",
            address: "[name*='addressInfo']",
            authority: "[name*='passportGivenBy']",
            inn: "[name*='identityNumber']",
            email: "[name*='InvoiceMail']"
        }), panel);
    if ( passenger.email ) {
        passenger.isClient = true;
    }
    passenger.sex = sex ? getNodeProperty(sex.parentNode) : null;
    return passenger;
}
