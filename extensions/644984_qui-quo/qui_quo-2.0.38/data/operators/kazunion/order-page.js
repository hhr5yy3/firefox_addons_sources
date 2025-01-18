window.OPERATOR_NAME = "Kazunion";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
  const form = document.querySelector('form[action*="heck"]');
  if ( form && !form.querySelector('.qq') ) {
      const container = createQQContainer('position: fixed; top: 15%;left:10%;max-width:200px;');
      form.append(container);
  }
}

async function createOption(img) {
    const form = getHotelRowByImage(img);
    const tour = form.querySelector('table#example');
    const tourId = $first('#removePackagePriceid');
    let storedOption = {};
    if ( tourId && tourId.value ) {
        let tours = localStorage.getItem('tours');
        if ( tours ) {
            tours = JSON.parse(tours);
            storedOption = tours.find(t => t.id === tourId.value) || {};
        }
    }
    if ( !storedOption.country ) {
        storedOption.country = prompt('Введите, пожалуйста, страну', 'ОАЭ');
    }
    if ( !storedOption.country ) {
        storedOption.region = prompt('Введите, пожалуйста, регион', 'Шарм эль Шейх');
    }
    const dateNode = getElementByXpath('.//span[contains(@data-i18n, "stayPeriod")]/following-sibling::span', tour);
    const hotelNode = getElementByXpath('.//span[@data-i18n="pages.searchresult.hotelName"]/following-sibling::span', tour);
    let hotelName = getText(hotelNode);
    const starsNode = $first('.five-stars', tour);


    if ( starsNode && starsNode.style.width ) {
        hotelName = hotelName + ' ' + (parseInt(starsNode.style.width) / 20).toString() + '*';
    }

    const [checkinDt, checkoutDt] = getText(dateNode).split(/\s*-\s*/);
    const price = $first('.totalPrice1');
    const flight = getFlight();

    let option = {
        checkinDt,
        nights: String(getDistance(checkinDt, checkoutDt)),
        hotelName,
        href: null,
        accommodation: getText(getElementByXpath('.//span[@data-i18n="pages.search.placement"]/following-sibling::span', tour)),
        roomType: getText(getElementByXpath('.//span[@data-i18n="pages.partial.category"]/following-sibling::span', tour)),
        boardType: getText(getElementByXpath('.//span[@data-i18n="pages.partial.meal"]/following-sibling::span', tour)),
        price: extractIntFromStr(price.dataset.price),
        currency: price.dataset.currency,
        flight,
        city_from: flight ? flight.sectors[0].segments[0].departureAirportID : ''
    };
    Object.assign(option, storedOption);
    return option;
}

function getFlight() {
    try {
        const sectors = getNodeProperty(getElementByXpath('.//span[@data-i18n="pages.flightTickets.route"]/following-sibling::span'), null, 'innerText')
            .split(/\n+/)
            .map(parseSectors);
        return {sectors};

    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseSectors(text) {
    let segments = text.split(/\s*➡\s*/).map ( segment => {
        const [flightNumber, departureAirportID,
            departureDate, departureTime,
            arrivalAirportID, arrivalTime] = text.split(/\s+|\s*-\s*/).filter(s => s && !s.match(/\+/));
       return new FlightSegment({
                flightNumber,
                departureDate: appendYear(...departureDate.split('.')),
                departureTime,
                departureAirportID,
                arrivalTime,
                arrivalAirportID
            })
    });

    return {segments};
}

function getHotelRowByImage(img) {
    return img.closest('form');
}

function injectQuickReservationData(selInsert, func) {
    $$( ".row.tourist-item").forEach((panel) => {
        if ( !panel.querySelector(selInsert) ) {
            panel.append(func({
                legendStyle: "font-size: 14px",
            }));
        }
    });
}

async function pasteOrderData(panel, data, passport, errors) {
    setInputValues(panel, [
            'input[name="FirstName"]', data.nationalPassport.name,
            'input[name="LastName"]', data.nationalPassport.surname,
            'input[name*="BirthDate"]', customDateToFullString(data.birthday),
            'input[name="PassportNumber"]', {value: passport.serial.value + passport.number.value, caption: "Паспорт"},
            'input[name*="ExpiryDate"]', customDateToFullString(passport.expire),
            'input[name="Note"]', data.inn
        ], errors
    );
    setSelectIndex(panel, ['select[name*="CountryID"]', data.nationalityEng,
                                               'select[name*="Sex"]', {value: mapSex(data.sex.value), caption: 'Пол'}], errors);
}

function mapSex(sex) {
    if ( sex === '1' ) {
        return 'Mr.';
    }
    if ( sex === '2' ) {
        return 'Mrs.';
    }
    return null;
}

function getPassengerRowBySelect(select) {
    return select.closest('.row.tourist-item');
}

async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);

    const transfers = $$('[data-i18n="pages.partial.transfersTitle"]').map(() => parseService('tbody [data-i18n="pages.partial.stayPeriod"]'));

    const insurance = $$('[data-i18n="pages.partial.InsuranceTitle"]').
    map(()=>parseService('tbody [data-i18n="pages.partial.InsurancePeriod"]'));

    const other = [];

    const prices = new Prices();

    const services = {
        insurance,
        transfers,
        other,
        tourOptions,
        prices
    };
    return services;
}

function parsePassengers() {
    return $$(".row.tourist-item").map( tourist => {
       const passenger = new Passenger(getInputsValues(tourist, {
            firstName: 'input[name="FirstName"]',
            lastName: 'input[name="LastName"]',
            birthday:'input[name*="BirthDate"]',
            expire:'input[name*="ExpiryDate"]'
        }))

       passenger.inn = getNodeData('input[name="Note"]', tourist, 'value');
       passenger.nationality = getNodeData('input[name="Note"]', tourist, 'value');
       passenger.setDocNumber(getNodeData('input[name="PassportNumber"]', tourist, 'value'), 'internationalPassport');
       const sex = selectedOption($1('select[name*="Sex"]'), tourist);
       passenger.sex = sex.match(/mrs/i) ? "2" : "1";
       return passenger;
    });

}


function parseService(selector) {
    const dateIntlSpan = selector ? $1(selector) : null;
    if ( dateIntlSpan ) {
        const dates = getText(dateIntlSpan.nextElementSibling).split(/\s*-\s*/);
        return new quickBookingValue({
            dateStart: dates[0],
            dateEnd: dates[1]
        })
    }

}
