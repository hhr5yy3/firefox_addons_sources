window.OPERATOR_NAME = "Vedi";

window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$("#aspnetForm").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.prepend(createCell());
        }
    });
}


function createCell() {
    const wrapper = document.createElement('div');
    const container = createQQContainer();
    wrapper.style.cssText = 'display:flex;position:sticky;top:50px;z-index:9999;';
    container.style.backgroundColor = "#f3f4f6";
    container.style.padding = "5px";
    container.style.border = "1px solid black";
    container.style.width = "185px";
    wrapper.append(container);
    return wrapper;
}

function createOption(img) {
    const svcTable = getHotelRowByImage(img);
    const basket = document.querySelector('.adv_basket_controller');
    const dateStart = getNodeProperty(basket.querySelector('#ctl00_generalContent_BasketController_MultiDatePicker_TxtMultiDatepicker'), null, 'value')
                   || getNodeProperty(document.querySelector('[id*="TourDateStart"]'));
    const dateEnd = getNodeProperty(document.querySelector('[id*="TourDateEnd"]'));
    const trs = $$('tr', svcTable);
    const hotels = trs.filter(tr => tr.querySelector('[src="images/sv3.gif"]')).map(extractHotelOptions);
    const price = getText(document.querySelector('#ctl00_generalContent_BasketPrice_LbForPayPrice'));

    const flight = getFlight();

    let option = {
        checkinDt: dateStart,
        dateStart,
        dateEnd,
        nights: (Number(getNodeProperty(basket.querySelector('#ctl00_generalContent_BasketController_TxtDuration, #ctl00_generalContent_BasketController_ddlDuration'), 0, 'value')) - 1).toString(),
        hotelName: hotels.map(h => h.hotelName).join(' / '),
        href: getNodeProperty(document.querySelector('#ctl00_generalContent_BasketController_HlPriceNew'), null, 'href'),
        country: getNodeProperty(document.querySelector('#input_place1'), '', 'value').split(', ')[1],
        region: hotels.map(h => h.region).join(' / '),
        roomType: hotels.map(h => [h.roomType, h.accommodation].join(', ')).join(' / '),
        boardType: hotels.map(h => h.boardType).join(' / '),
        price: extractIntFromStr(price),
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
        const flightTable = document.querySelector('#fightsTable');
        if ( !flightTable ) {
            return null;
        }
        const sectors = $$('.fl.to, .fl.back', flightTable).map(parseSector);
        if (sectors.length === 0 ) {
            return null;
        }
        return {sectors}
    } catch (e) {
        return null;
    }
}

function parseSector(sector) {
    const segments = [parseSegment(sector)]
    return {segments}
}

function parseSegment(sector) {
    const dates = $$('.fl_date', sector).map(t=>getText(t));
    return new FlightSegment({
        flightNumber: getNodeProperty(sector.querySelector('.fl_number'), null, 'innerText'),
        airline: getNodeProperty(sector.querySelector('.fl_company')),
        departureDate: dates[0],
        departureTime: getNodeProperty(sector.querySelector('.time_start')),
        departureCity: getNodeProperty(sector.querySelector('.fl_from .fl_city'), '').replace(/\s*–\s*/, ''),
        departureAirport: getNodeProperty(sector.querySelector('.fl_from .fl_city_info')),
        serviceClass: getNodeProperty(sector.querySelector('.fl_class')),
        arrivalDate: dates[1],
        arrivalTime: getNodeProperty(sector.querySelector('.time_end')),
        arrivalCity: getNodeProperty(sector.querySelector('.fl_to .fl_city'), '').replace(/\s*–\s*/, ''),
        arrivalAirport: getNodeProperty(sector.querySelector('.fl_to .fl_city_info'))
    })
}

function extractHotelOptions(tr) {
    const [region, hotelName, nights, roomType, accommodation, boardType] = $$('.advBasketService', tr)
        .map( svc => selectedOption(svc) || getNodeProperty(svc)).join('/')
        .split(/\/|,/).filter(t=>t)
        .map(txt=> lastElement(txt.split('::'))) ;

    const dateStart = getNodeProperty(tr.querySelector('[id*=_LbBeginDate]'));
    const country = getNodeProperty(document.querySelector('#input_place1'), '', 'value').split(', ')[1]
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
    const insurance = trs.filter(tr => tr.querySelector('[src="images/sv6.gif"]')).map(extractSvcOptions);
    const other = trs.filter(tr => tr.querySelector('[src*="images/"]')).filter(tr => {
        return !tr.querySelector('[src="images/sv6.gif"]') &&
            !tr.querySelector('[src="images/sv3.gif"]') &&
            !tr.querySelector('[src="images/sv1.gif"]') &&
            !tr.querySelector('[src="images/sv1b.gif"]')
    }).map(extractSvcOptions);

    const transfers = $$('[for*=AdvBasketOptWithoutExcur]')
        .filter(l => getText(l).match(/трансфер/i))
        .filter(l => l.closest('span').querySelector('input').checked).map(l => new quickBookingValue({description: getText(l)}))

    const prices = new Prices();
    const nettPrice = getNodeProperty(document.querySelector('#ctl00_generalContent_BasketPrice_LbForPayPrice'));
    const grossPrice = lastElement(getNodeProperty(document.querySelector('#ctl00_generalContent_BasketPrice_LbFullPrice'), '').split(/\D+/).filter(p => p));

    const nettPriceType = mapPriceType(mapCurrencyUtil(nettPrice.replace(/\d+|\s+/g, '')));
    const grossPriceType = mapPriceType(mapCurrencyUtil(nettPrice.replace(/\d+|\s+/g, '')));


    prices[`${nettPriceType}`].nett = extractIntFromStr(nettPrice);
    prices[`${nettPriceType}`].currency = (mapCurrencyUtil(nettPrice.replace(/\d+|\s+/g, '')));

    prices[`${grossPriceType}`].gross = extractIntFromStr(grossPrice);
    prices[`${grossPriceType}`].currency = (mapCurrencyUtil(nettPrice.replace(/\d+|\s+/g, '')));

    const services = {
        insurance,
        transfers,
        other,
        hotels,
        prices
    }
    return services;
}

function extractSvcOptions(tr) {
    return new quickBookingValue({
        description: $$('.advBasketService', tr)
            .map(svc => selectedOption(svc) || getNodeProperty(svc)).join('/'),
        dateStart: getNodeProperty(tr.querySelector('[id*=_LbBeginDate]'))
    })
}

function parsePassengers() {
    return $$("#tourist_data_list .js-tourist-item", document).map(extractPassengerInfo);
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
        }), panel);
    passenger.birthday = zipDateParts(panel, ["[name*='BirthDate$txtDay']", "[name*='BirthDate$txtMonth']", "[name*='BirthDate$txtYear']"]);
    passenger.expire = zipDateParts(panel, ["[name*='PassportDateEnd$txtDay']", "[name*='PassportDateEnd$txtMonth']", "[name*='PassportDateEnd$txtYear']"]);
    passenger.issueDate = zipDateParts(panel, ["[name*='PassportDate$txtDay']", "[name*='PassportDate$txtMonth']", "[name*='PassportDate$txtYear']"]);

    passenger.sex =  selectedOption(panel.querySelector("select[id*='ddlSex']"));
    passenger.nationality = citizen;
    return passenger;
}

function zipDateParts(panel, selectors) {
    const valuesObj = getInputsValues(panel, selectors);
    return valuesObj.filter(s => s).join('.') || null;
}

