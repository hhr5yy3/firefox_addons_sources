window.OPERATOR_NAME = "Амиго-С";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$("#aspnetForm .fui-js-price-panel").forEach(div => {
        if (!document.querySelector(".qq")) {
            div.after(createCell());
        }
    });
}

function createCell() {
    const wrapper = document.createElement('div');
    const container = createQQContainer();
    const button = container.querySelector('.qq-export-button');
    if ( button ) {
        button.style.minWidth = 'initial';
    }
    wrapper.style.cssText = 'display:flex;position:sticky;top:0;';
    container.style.backgroundColor = "#f3f4f6";
    container.style.padding = "5px";
    container.style.border = "1px solid black";
    container.style.width = "276px";
    container.style.minWidth = 'initial';
    wrapper.append(container);
    return wrapper;
}

function createOption(img) {
    const svcTable = getHotelRowByImage(img);
    const basket = document.querySelector('.adv_basket_controller, .fui-basket-tour-info-table');
    const dateStart = getNodeProperty(basket.querySelector('#ctl00_generalContent_BasketController_MultiDatePicker_TxtMultiDatepicker'), null, 'value')
        || getNodeProperty(document.querySelector('[id*="TourDateStart"]'));
    const dateEnd = getNodeProperty(document.querySelector('[id*="TourDateEnd"]'));
    const trs = $$('tr', svcTable);
    const hotels = trs.filter(tr => tr.querySelector('[src="images/sv3.gif"]')).map(extractHotelOptions);
    const price = getText($1('[data-mprice-id="ctl00_generalContent_BasketPrice_LbFullPrice"] [data-price-basecur]') || $1('[data-mprice-id="ctl00_generalContent_BasketPrice_LbForPayPrice"] [data-price-basecur]'));

    const flight = getFlight();
    let option = {
        checkinDt: dateStart,
        dateStart,
        dateEnd,
        nights: (Number(getNodeProperty(basket.querySelector('#ctl00_generalContent_BasketController_TxtDuration, #ctl00_generalContent_BasketController_ddlDuration'), 0, 'value')) - 1).toString(),
        hotelName: hotels.map(h => h.hotelName).join(' / '),
        href: getNodeProperty(document.querySelector('#ctl00_generalContent_BasketController_HlPriceNew'), null, 'href'),
        country: hotels.map(h => h.country).join(' / '),
        region: hotels.map(h => h.region).join(' / '),
        roomType: hotels.map(h => [h.roomType, h.accommodation].join(', ')).join(' / '),
        boardType: hotels.map(h => h.boardType).join(' / '),
        price: extractIntFromStr(price.replace(/\s+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g, '')),
        city_from: flight ? flight.sectors[0].segments[0].departureCity : '',
        operator: window.OPERATOR_NAME,
        occupancy: null,
        flight,
        hotels
    };
    return option;
}

function getFlight() {
    try {
        const segments = $$('.aviaRadioButtonList .quoteYes, [class*="without-radio-holder"]').map(parseSegment);
        if ( segments.length === 0) {
            return null;
        }
        return {sectors: splitSegmentsToSectors(segments)}
    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseSegment(sector) {
    let text1 = getText(sector.querySelector('.fui-services-table-2__info-text')).replace(/\s+/g, ' ')
        .trim()
        .split(/\s*,\s*/);
    let text2 = getText(sector.querySelector('.fui-services-table-2__tariff'));
    const parentTr = sector.parentNode.closest('tr');
    const route = getText(parentTr.querySelector('.fui-flight-route')).replace(':', '').split(/\s+/);
    const departureDate = getText(parentTr.querySelector('span[id*="LbBeginDate"]'));
    const [departureTime, arrivalTime] = text1[2].match(/\d{2}:\d{2}/g) || []
    return new FlightSegment({
        flightNumber: text1[0],
        departureDate: departureDate,
        departureTime,
        departureCity: route[0],
        departureAirportID: text1[1].split('-')[0],
        serviceClass: text2[2],
        arrivalDate: compareTime(departureTime, arrivalTime) ? addDaysToStringDate(departureDate, 1) : departureDate,
        arrivalTime,
        arrivalAirportID: text1[1].split('-')[1],
        arrivalCity: route[1]
    })
}

function compareTime(time1, time2) {
     return new Date(`2000-01-01T${time1}:00.000Z`) > new Date(`2000-01-01T${time2}:00.000Z`)
}

function extractHotelOptions(tr) {
    const [region, hotelName, nights, roomType, accommodation, boardType] = $$('.advBasketService', tr)
        .map(svc => selectedOption(svc) || getNodeProperty(svc)).join('/')
        .split(/\/|,/).filter(t => t)
        .map(txt => lastElement(txt.split('::')));

    const dateStart = getNodeProperty(tr.querySelector('[id*=_LbBeginDate]'));
    const country = getNodeProperty(document.querySelector('#input_place1'), '', 'value').split(', ')[1] || findCountry(region)
    return {region, hotelName, nights, roomType, accommodation, boardType, dateStart, country};
}

function parseHotels(tourOptions) {
    return tourOptions.hotels;
}

function getHotelRowByImage() {
    return document.querySelector('#ctl00_generalContent_BasketServices_DgBasketServices');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const svcTable = getHotelRowByImage();
    const trs = $$('tr', svcTable);
    const hotels = trs.filter(tr => tr.querySelector('[src="images/sv3.gif"]')).map(extractHotelOptions);
    const insurance = deduplicateCollectionByField(trs.filter(tr => tr.querySelector('[src="images/sv6.gif"]')).map(svc => extractSvcOptions(svc, true)), 'description');
    const other = trs.filter(tr => tr.querySelector('[src*="images/"]')).filter(tr => {
        return !tr.querySelector('[src="images/sv6.gif"]') &&
            !tr.querySelector('[src="images/sv3.gif"]') &&
            !tr.querySelector('[src="images/sv1.gif"]') &&
            !tr.querySelector('[src="images/sv1b.gif"]')
    }).map(extractSvcOptions);
    const excurs = $$('.fui-excurs-list__item-name').filter(l => l.closest('td').querySelector('input').checked).map(l => new quickBookingValue({description: l.closest('label').dataset.label.trim()}));
    const transfers = $$('[for*="ctl00_generalContent_BasketOptional_ChblOptional"]')
        .filter(l => (l.dataset.label || '').match(/трансфер/i))
        .filter(l => l.closest('.dop_other_row').querySelector('input').checked).map(l => new quickBookingValue({description: getText(l)}))

    const prices = new Prices();
    const nettPrice = getNodeData('[data-mprice-id="ctl00_generalContent_BasketPrice_LbForPayPrice"] [data-price-basecur]');
    const grossPrice = getNodeData('[data-mprice-id="ctl00_generalContent_BasketPrice_LbBruttoBase"] [data-price-basecur]');

    const nettPriceType = mapPriceType(mapCurrencyUtil(nettPrice.replace(/\d+|\s+/g, '')));
    const grossPriceType = mapPriceType(mapCurrencyUtil(grossPrice.replace(/\d+|\s+/g, '')));


    prices[`${nettPriceType}`].nett = extractIntFromStr(nettPrice.replace(/\s+/g, ''));
    prices[`${nettPriceType}`].currency = (mapCurrencyUtil(nettPrice.replace(/\d+|\s+/g, '')));

    prices[`${grossPriceType}`].gross = extractIntFromStr(grossPrice.replace(/\s+/g, ''));
    prices[`${grossPriceType}`].currency = (mapCurrencyUtil(nettPrice.replace(/\d+|\s+/g, '')));


    const services = {
        insurance,
        transfers,
        other: [...other, ...excurs],
        hotels,
        prices
    }
    return services;
}

function extractSvcOptions(tr, isInsurance) {
    const days = parseInt(getNodeData('.fui-duration'))-1;
    const dateStart = getNodeProperty(tr.querySelector('[id*=_LbBeginDate]'))
    const svc = new quickBookingValue({
        description: $$('.advBasketService', tr)
            .map(svc => selectedOption(svc) || getNodeProperty(svc)).join('/'),
        dateStart,
        dateEnd: addDaysToStringDate(dateStart, days)
    })
    if ( isInsurance ) {
        svc.description = svc.description.replace(/i.+?\//, '')
    }
    console.log(svc)
    return svc
}

function parsePassengers() {
    return $$("#tourist_data_list .fui-tourists-form", document).map(extractPassengerInfo);
}


function extractPassengerInfo(panel) {
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
        }), citizen);
    passenger.birthday = zipDateParts(panel, ["[name*='BirthDate$txtDay']", "[name*='BirthDate$txtMonth']", "[name*='BirthDate$txtYear']"]);
    passenger.expire = zipDateParts(panel, ["[name*='PassportDateEnd$txtDay']", "[name*='PassportDateEnd$txtMonth']", "[name*='PassportDateEnd$txtYear']"]);
    passenger.issueDate = zipDateParts(panel, ["[name*='PassportDate$txtDay']", "[name*='PassportDate$txtMonth']", "[name*='PassportDate$txtYear']"]);

    passenger.sex = selectedOption(panel.querySelector("select[id*='ddlSex']"));
    passenger.nationality = citizen;
    return passenger;
}

function zipDateParts(panel, selectors) {
    const valuesObj = getInputsValues(panel, selectors);
    return valuesObj.filter(s => s).join('.') || null;
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
        passengersCount.children = (roomType.match(/\d+\s*CH|\d+\s*дет|\d+\s*реб/gi) || [0]).map(str => parseInt(str)).reduce((partialSum, a) => partialSum + a, 0);
        passengersCount.infants = Number((roomType.match(/(\d+)\s*in/i) || roomType.match(/(\d+)\s*мл/i) || [0, 0])[1]);
        passengersCount.count = passengersCount.adults + passengersCount.children + passengersCount.infants;
        return passengersCount;
    } catch (e) {
        return null;
    }
}
