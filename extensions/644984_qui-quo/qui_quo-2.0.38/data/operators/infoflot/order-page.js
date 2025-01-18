window.OPERATOR_NAME = "Инфофлот";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".right_summary").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createQQContainer());
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const cruiseDetails = $1('.cruise-details');
    const cruiseRows = $$('tr', cruiseDetails).map(tr => {
        const tds = $$('td', tr).extractNodesText();
        return {
            caption: tds[0],
            text: tds[1]
        }
    })
    const getRowElement = (caption) => cruiseRows.find( row => row.caption.match(caption) )
    const dateStart = dateFromDayAndMonthName(...getRowElement(/Начало круиза/i).text.split(/\s+/));
    const dateEnd = dateFromDayAndMonthName(...getRowElement(/Окончание круиза/i).text.split(/\s+/));
    const cabins = $$('.cabin .cabinCaption').extractNodesText().join(', ');
    const lies = $$('.right_summary li').extractNodesText()

    const prices = new Prices();
    const priceText = getNodeData('.right_summary .summaryTotal');
    prices.nationalNettPrice = parseFloat(priceText.replace(/\s+/g, '').replace(',', '.'));
    prices.nationalCurrency = 'RUB';

    let option = {
        checkinDt: dateStart,
        dateStart,
        dateEnd,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getRowElement(/Теплоход|Лайнер/i).text,
        region: getRowElement(/Маршрут/i).text,
        roomType: `Каюты: ${cabins}`,
        accommodation: getNodeData('.countPassengers'),
        boardType: lies.find(li => li.match(/питание/i)),
        price: extractIntFromStr(getNodeData('.right_summary .summaryTotal').replace(/\s+/g, '')),
        currency: "RUB",
        city_from: "",
        occupancy: "",
        prices
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.right_summary');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const cruises = [{
        dateStart: tourOptions.dateStart,
        dateEnd: tourOptions.dateEnd,
        roomType: tourOptions.roomType,
        route: tourOptions.region,
        boardType: tourOptions.boardType,
        ship: tourOptions.hotelName
    }]
    const services = {
        cruises,
        prices: tourOptions.prices
    };
    console.log(tourOptions)
    return services;
}

function parseHotels() {
   return [];
}


function parsePassengers() {
    const panels = $$('.one-cabin [name*="last_name"]').filter(panel => panel.offsetHeight > 0).map(input => input.closest('tbody, fieldset'));
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const passenger = new Passenger(getInputsValues(panel, {
        birthday: 'input[name*="birthday"]',
        issueDate: 'input[name*="passport_issued_date"]',
        lastName: 'input[name*="last_name"]',
        firstName: 'input[name*="first_name"]',
        secondName: 'input[name*="middle_name"]',
        serial: 'input[name*="passport_series"]',
        number: 'input[name*="passport_number"]',
        email: 'input[name*="contact_email]"]',
        phone: 'input[name*="contact_phone]"]'
    }));
    const genderInput = $1('input[name*="gender]"]:checked');
    passenger.sex = genderInput.value;
    return passenger;
}
