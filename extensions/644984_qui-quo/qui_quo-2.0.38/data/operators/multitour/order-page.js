window.OPERATOR_NAME = "МУЛЬТИТУР";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const form = $first('.infobron');
    if ( form && !form.querySelector('.qq') ) {
        form.querySelector('.stat-price').after(createQQContainer(`width:185px;`))
    }
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotelNode = $first('.title-page-hotel') || $first('.title-h.mt-8.mb-4');
    const [country, ...region] = getNodeProperty($first('.region-hotel', hotelNode), '').split(/\s*,\s*/).filter(text => !text.match(/ул\.|д\./));;
    const paragraphs = $$('p' ,tour);
    const trs = $$('#table_uslugi > tbody > tr').filter(tr => !tr.querySelector('th')).map(tr => {
        const tds = $$('td', tr);
        const allTds = tds.map(td => td.closest('tr>td'));
        const serviceTd = tds.find(td => td.querySelector('table'));
        const serviceTds = $$('td', serviceTd);
        return {serviceTds, allTds}
    })

    const dates = searchParagraph(paragraphs, /Даты тура/i).split(/\s*—\s*/);
    const nights = searchParagraph(paragraphs, /Продолжительность/i).match(/(\d+)\s*ноч/);
    const isExcursion = !!country.match(/экскурси/i);
    let option = {
        checkinDt: dates[0],
        nights: nights[1],
        hotelName: getText($first('h1', hotelNode) || $first('span', hotelNode)),
        href: null,
        country: getCountry(country),
        region: region.join(', '),
        roomType: getNodeProperty(trs[0].serviceTds[1]),
        boardType: getNodeProperty(trs[0].serviceTds[2]),
        price: extractIntFromStr(getText($first('#price_f')).replace(/\s+/g, '')),
        currency: "RUB",
        city_from: "",
        comment: isExcursion ? trs.map( tr => getNodeProperty(tr.serviceTds[0])).join(', ') : null,
        operator: OPERATOR_NAME,
        occupancy: "",
        excursion: isExcursion,
        servicesTrs: trs
    };
    return option;
}

function getCountry(country) {
    const regionCountry = country.replace(/\s*экскурс[а-я]+\s*/i, '');
    if ( regionCountry.match(/россия|беларусь|абхазия/i) ) {
        return regionCountry;
    }

    return 'Россия';
}

function searchParagraph(paragraphs, str, text = true) {
    const result = paragraphs.find(p => {
        const strong = $first('strong', p);
        return !!getNodeProperty(strong, '').match(str);
    });
    return result ? getNodeProperty(result.lastChild, '') : null;
}

function getHotelRowByImage(img) {
    return img.closest('form, .infobron');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const nationalNettPrice = extractIntFromStr(getText($first('#pricebrutto_f')).replace(/\s+/g, ''));
    const nationalGrossPrice = extractIntFromStr(getText($first('#price_f')).replace(/\s+/g, ''));
    const nationalCurrency = "RUB";


    const prices = new Prices({
        nationalGrossPrice, nationalCurrency, nationalNettPrice
    });

    const tourOptions = createOption(button);

    const {servicesTrs} = tourOptions;
    tourOptions.hotels = servicesTrs.filter(tr => tr.serviceTds.length > 2).flatMap(tr => {
        const hotel = {};
        hotel.hotelName = getNodeProperty(tr.serviceTds[0]);
        hotel.roomType = getNodeProperty(tr.serviceTds[1].querySelector('p') || tr.serviceTds[1]);
        hotel.boardType = getNodeProperty(tr.serviceTds[2].querySelector('p') || tr.serviceTds[2]);
        hotel.dateStart = getNodeProperty(tr.allTds[0]);
        hotel.nights = getNodeProperty(tr.allTds[1], '').split(/\s*\/\s*/)[1];
        hotel.country = tourOptions.country;
        hotel.region = tourOptions.region;
        return parseHotelsUtil(hotel);
    })

    const services = {
        tourOptions,
        prices
    };
    return services;
}

function parseHotels(tourOptions) {
    return tourOptions.hotels;
}

function getPrices(claimDocument) {
}

function parseService(svc) {
    return new quickBookingValue({})
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
        passengersCount.children = (roomType.match(/\d+\D+реб/gi) || [0]).map(str => parseInt(str)).reduce((partialSum, a) => partialSum + a, 0);
        passengersCount.infants = (roomType.match(/\d+\D+инф/i) || [0, 0]).map(str => parseInt(str)).reduce((partialSum, a) => partialSum + a, 0);
        passengersCount.count = passengersCount.adults + passengersCount.children + passengersCount.infants;
        return passengersCount;
    } catch (e) {
        return null;
    }
}

function parsePassengers() {
    return $$('input[name*="surname"]').filter(input => input.type !== 'hidden').map(input => extractPassengerInfo(input.closest('tr')));
}

function extractPassengerInfo(panel) {
    const passenger = new Passenger(getInputsValues(panel, {
        birthday: 'input[name*="birthday"]',
        expire: 'input[name*="passportdate"]',
        lastName: 'input[name*="surname"]',
        firstName: 'input[name*="firstname"]',
        secondName: 'input[name*="middlename"]',
        nationality: 'input[name*="surname"]',
        serial: 'input[name*="passports"]',
        number: 'input[name*="passportn"]',
        phone: 'input[name*="tel"]'
    }));
    passenger.nationality = selectedOption(panel.querySelector('select[name*="citizen"]'));
    passenger.sex = selectedOption(panel.querySelector('select[name*="sex"]'));
    return passenger;
}
