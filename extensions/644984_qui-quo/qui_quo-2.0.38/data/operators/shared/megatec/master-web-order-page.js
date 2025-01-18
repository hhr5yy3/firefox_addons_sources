window.OPERATOR_NAME = window.OPERATOR_NAME || "Megatec";
window.OPERATOR_CURRENCY = window.OPERATOR_NAME;
window.DEFAULT_CURRENCY = "RUB";
window.showTopHotelsRating = false;
function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$("#aspnetForm").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const panel = $first('[id*="ctl00_generalContent_UpdatePanel"]', div);
            if ( panel ) {
                panel.append(createOrderCell(panel));
            } else {
                div.prepend(createOrderCell());
            }
            injectCurrencySelectionUtil('.qq-box', OPERATOR_CURRENCY, 'width:100%;', "font-size:12px", "display:flex;flex-direction: column;width:100%;")
        }
    });
}


function createOrderCell(panel) {
    const wrapper = document.createElement('div');
    const container = createQQContainer();
    if ( !panel ) {
        wrapper.style.cssText = 'display:flex;position:fixed;top:25%;left:5%;';
    }
    container.style.backgroundColor = "#f3f4f6";
    container.style.padding = "5px";
    container.style.border = "1px solid black";
    container.style.width = "185px";
    wrapper.classList.add('qq');
    wrapper.append(container);
    return wrapper;
}

function createOption(img) {
    const cart = getHotelRowByImage(img);
    const structureCart = document.querySelector('#ctl00_generalContent_ShoppingCart')
    let dates = getNodeProperty(cart.querySelector('[id*="TourDatesLabel"]'), '').match(getRegexPatterns().date);
    const hotelNode = cart.querySelector('[id*="HotelNameLabel"]');
    const priceOne = getNodeProperty(document.querySelector('#ctl00_generalContent_lblOrderPriceAlternative'), '');
    const priceTwo = getNodeProperty(document.querySelector('#ctl00_generalContent_lbOrderPrice'), '');
    const price = !isPrefferedDefaultCurrencyUtil() ? priceTwo || priceOne : priceOne || priceTwo;
    if ( !price ) {
        throw new QuiQuoError('Невозможно добавить тур, отсутствует "Цена к оплате"');
    }
    const currencyTwo = getNodeProperty(document.querySelector('#ctl00_generalContent_lbRate'));
    const currencyOne = priceOne.replace(/[^А-яA-z$]/gi, '');


    const priceArray = [[parseInt(priceOne.replace(/\s+|\(|\)/g, '')), mapCurrencyUtil(currencyOne || '')],
                              [parseInt(priceTwo.replace(/\s+|\(|\)/g, '')), mapCurrencyUtil(currencyTwo || '')]];

    let resultPrice = priceArray.find(a => !isPrefferedDefaultCurrencyUtil() ? a[1] && a[1].match(/USD|EUR/) : a[1] && !a[1].match(/USD|EUR/))
    if ( !resultPrice ) {
        resultPrice = priceArray.find(a => a[0] && a[1]) ;
    }
    const flight = getFlight(dates);
    let dateStart;
    let dateEnd;
    let nights = String(getDistance(dates[0], dates[1]));
    let extra_nights = '0';
    if ( flight && flight.sectors && flight.sectors.length  > 1 ) {
        [dateStart, dateEnd] = [lastElement(flight.sectors[0].segments).arrivalDate, lastElement(flight.sectors).segments[0].departureDate]
        extra_nights = String(parseInt(nights) - getDistance(dateStart, dateEnd))
        nights = String(getDistance(dateStart, dateEnd));
    }

    let option = {
        checkinDt: dates[0],
        dateStart,
        dateEnd,
        nights,
        extra_nights,
        hotelName: getText(hotelNode),
        href: getNodeProperty(hotelNode.querySelector('a'), null, 'href'),
        country: getNodeProperty(cart.querySelector('[id*="TourCountryLabel"]')),
        roomType: getNodeProperty(structureCart.querySelector('#ctl00_generalContent_ShoppingCart_ctl02_LbAcc')),
        boardType: getNodeProperty(cart.querySelector('#ctl00_generalContent_PansionNameLabel')),
        price: resultPrice[0],
        currency: resultPrice[1],
        city_from: flight ? optionalChaining(flight, ['sectors', '0', 'segments', '0', 'departureAirportID']) || optionalChaining(flight, ['sectors', '0', 'segments', '0', 'departureCity']): 'Нет данных',
        operator: window.OPERATOR_NAME,
        occupancy: "",
        flight
    };
    return option;
}


function getFlight(dates) {
    try {
        if ( typeof getAlternateFlight !== 'undefined') {
            const flight = getAlternateFlight();
            if ( flight )  {
                return flight;
            }
        }
        const days = $$('#ctl00_generalContent_DgFlights span[id*="LbDay"]')
        const sectors = $$('select[name*="DgFlights"]')
            .map(select => selectedOption(select))
            .map((option, index) => parseSector(option, dates, getText(days[index])));
        return {sectors}
    } catch (e) {
        console.log(e);
    }
}

function parseSector(option, dates, day) {
    const text = option;
    const fullDates = getDatesArrayBetweenTwoDates(dates[0], dates[1])
    const date = fullDates[day - 1];
    const array = text.split(/\s*-\s*|\s*,\s*/);
    const departureTime = array[2].replace('.', ':');
    const arrivalTime = array[3].replace('.', ':');
    return {
        segments: [new FlightSegment({
            flightNumber: (array[0].match(/\b([A-Z]{2}|[A-Z]\d|\d[A-Z])\s?\d{3,4}\b/) || [])[0],
            departureDate: date,
            departureTime,
            departureAirportID: array[4],
            //serviceClass: array[1],
            arrivalTime,
            arrivalAirportID: array[5],
            arrivalDate: compareTime(departureTime, arrivalTime) ? addDaysToStringDate(date, 1) : date,
        })]
    }
}

function getHotelRowByImage() {
    return document.querySelector('.frontPanel') || document;
}


//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = createOption(button)
    const allServices = getText(document.querySelector('#ctl00_generalContent_PriceIncludeLabel')).split(/\s*,\s*/);
    const transfers = allServices.filter( elem => elem.match(/трансфер/i) ).flatMap(txt => [new quickBookingValue({description: txt,
        dateStart: tourOptions.dateStart
    }), new quickBookingValue({
        description: txt,
        dateStart: tourOptions.dateEnd
    })])
    const insurance = allServices.filter(elem => elem.match(/Страховка/i)).map(txt => new quickBookingValue({description: txt, dateStart: tourOptions.dateStart, dateEnd: tourOptions.dateEnd}))
    const supplements = window['ctl00_generalContent_lbTourPriceChangedText'] ? [...ctl00_generalContent_lbTourPriceChangedText.childNodes]
        .filter(node => node.nodeName === '#text')
        .map(node => getText(node))
        .filter(txt => txt.match('Доп. услуги'))
        : [];
    const other = [...supplements, ...allServices.filter(elem => !elem.match(/Страховка|трансфер|Отель|Авиаперелет/i))]
        .map(txt => new quickBookingValue({description: txt}));


    let price = getNodeProperty(document.querySelector('#ctl00_generalContent_lbOrderPrice'), '');
    const priceTwo = getNodeProperty(document.querySelector('#ctl00_generalContent_lblOrderPriceAlternative'), '');

    const currency = getNodeProperty(document.querySelector('#ctl00_generalContent_lbRate'), '');
    const currencyTwo = priceTwo.replace(/[^А-яA-z$]/gi, '');

    const nettPrice = parseFloat(getNodeProperty(document.querySelector('#ctl00_generalContent_LbToPay'), '0').replace(/\s+/, '').replace(/,/, '.'));
    const nettPriceCurrency = mapCurrencyUtil(getNodeProperty(document.querySelector('#ctl00_generalContent_LbRateToPay')));

    const nettPriceTwo = (getNodeProperty(document.querySelector('#ctl00_generalContent_lblToPayAlternative'), '0').replace(/\s|[()]+/gi, ''));
    const nettPriceCurrencyTwo = mapCurrencyUtil(nettPriceTwo.replace(/[^А-яA-z$]/gi, ''));

    const prices = new Prices();
    const grossPriceTypeOne = mapPriceType(mapCurrencyUtil(currency));
    const nettPriceTypeOne = mapPriceType(nettPriceCurrency);

    prices[`${grossPriceTypeOne}`].gross = parseFloat(price.split(/\s*=\s*/).reverse()[0].replace(/\s+/, '').replace(/,/, '.'));
    prices[`${grossPriceTypeOne}`].currency = mapCurrencyUtil(currency);

    prices[`${nettPriceTypeOne}`].nett = nettPrice;
    prices[`${nettPriceTypeOne}`].currency = nettPriceCurrency;

    if (priceTwo ) {
        const grossPriceTypeTwo = mapPriceType(mapCurrencyUtil(currencyTwo));
        const nettPriceTypeTwo = mapPriceType(nettPriceCurrencyTwo);

        prices[`${grossPriceTypeTwo}`].gross = priceTwo ? parseFloat(priceTwo.replace(/\s|[()]+/gi, '').replace(/,/, '.')) : null;
        prices[`${grossPriceTypeTwo}`].currency = mapCurrencyUtil(currencyTwo);

        prices[`${nettPriceTypeTwo}`].nett = nettPriceTwo ? parseFloat(nettPriceTwo.replace(/,/, '.')) : null;
        prices[`${nettPriceTypeTwo}`].currency = nettPriceCurrencyTwo;
    }


    const flightType = document.querySelector('#fightsTable') ? 'Scheduled' : 'Charter';
    const services = {
        insurance,
        flightType,
        transfers,
        other,
        prices,
        nettPrice: extractIntFromStr(getNodeProperty(document.querySelector('#ctl00_generalContent_LbToPay'), '0').replace(/\s+/, '')),
        nettPriceCurrency: mapCurrencyUtil(getNodeProperty(document.querySelector('#ctl00_generalContent_LbRateToPay')))
    };
    return services;
}

function parsePassengersCountModule(passengers, tourOptions) {
    try {
        const passengersCount = {
            adults: 0,
            children: 0,
            infants: 0,
            count: 1
        };

        const {roomType} = tourOptions;

        passengersCount.adults = Number((roomType.match(/(\d+)\s*AD/i) || roomType.match(/(\d+)\s*взр/i) || [0, 0])[1]);
        passengersCount.children = Number((roomType.match(/(\d+)\s*Ch/i) || roomType.match(/(\d+)\s*реб/i) ||  [0, 0])[1]);
        passengersCount.infants = Number((roomType.match(/(\d+)\s*in/i) || roomType.match(/(\d+)\s*мл/i) || [0, 0])[1]);
        passengersCount.count = passengersCount.adults + passengersCount.children + passengersCount.infants;
        return passengersCount;
    } catch (e) {
        return null;
    }
}

function parsePassengers() {
    const panels = $$("#ctl00_generalContent_BasketTourists_touristData_dgTourists tr, #ctl00_generalContent_touristData_dgTourists tr", document);
    return panels.filter(panel => !panel.classList.contains('h1') && $1('[id*="ddlSex"]', panel)).map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const sex = panel.querySelector('input[id*="gender"]:checked');
    const citizen = selectedOption(panel.querySelector("select[id*='ddlCitizenship']"));
    const passenger = new Passenger(
        getInputsValues(panel, {
            lastName: "[id*='txtLastName']",
            firstName: "[id*='txtFirstName']",
            serial: "[name*='txtPassportSeries']",
            number: "[name*='txtPassportNumber']",
            address: "[name*='addressInfo']",
            authority: "[name*='txtPassportByWhom']",
            phone: "[name*='txtPhone']",
            email: "[name*='txtEmail']",
            inn: "[name*='txtBirthPlace']"
        }), panel);
    passenger.birthday = zipDateParts(panel, ["[name*='BirthDate$txtDay']", "[name*='BirthDate$txtMonth']", "[name*='BirthDate$txtYear']"]);
    passenger.expire = zipDateParts(panel, ["[name*='PassportDateEnd$txtDay']", "[name*='PassportDateEnd$txtMonth']", "[name*='PassportDateEnd$txtYear']"]);
    passenger.issueDate = zipDateParts(panel, ["[name*='PassportDate$txtDay']", "[name*='PassportDate$txtMonth']", "[name*='PassportDate$txtYear']"]);

    passenger.sex = sex ? selectedOption(panel.querySelector("select[id*='ddlSex']")) : null;
    passenger.nationality = citizen;
    return passenger;
}

function zipDateParts(panel, selectors) {
    const valuesObj = getInputsValues(panel, selectors);
    return valuesObj.filter(s=>s).join('.') || null;
}
