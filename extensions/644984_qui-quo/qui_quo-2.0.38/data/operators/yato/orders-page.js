window.OPERATOR_NAME = "Я туроператор";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".order_card .order_right").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const container = createQQContainer('float:right;margin-top: 12px;');
            div.append(container);
            const qqBtns = container.querySelector('.qq-box');
            qqBtns.style.display = 'none';
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);

    const orderUrl = getNodeData('.show_details a', tour, 'href');
    const htmlOrderPage = await fetch(orderUrl).then(r => r.text());
    const parser = new DOMParser();
    const orderPage = parser.parseFromString(htmlOrderPage, "text/html");
    if ( !orderPage ) {
        throw new QuiQuoError('Order page is not found!');
    }
    const tourUrl = getNodeData('.order_details a', tour, 'href');
    const htmlTourPage = await fetch(tourUrl).then(r => r.text());
    const tourPage = parser.parseFromString(htmlTourPage, "text/html");
    const mockImg = $first('.closest-table tr .tar', tourPage);
    let option = {};
    const dates = getNodeData('.v_tourname', orderPage).match(getRegexPatterns().date);
    const price = getNodeData('.v_price .v_cost', orderPage).replace(/\D+/g, '')
    option.checkinDt = dates[0];
    option.nights = String(getDistance(...dates));
    option.href = getNodeData('.v_tourname a', orderPage, 'href');
    option.price = extractIntFromStr(price);
    option.currency = "RUB";
    const includes = getNodeData('.v_included .i_list', orderPage);
    option.others = includes.split(/\s*,\s*/).map(text => new quickBookingValue({description: text}));
    window.passengers = $$(".v_body .vt_name", orderPage).filter(div => !div.closest('.addServLst'));
    if ( mockImg ) {
        return Object.assign(createYaToOption(mockImg, tourPage), option);
    }

    option.hotelName = getNodeData('.order_details a', tour);


    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.order_card');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);

    const prices = new Prices();
    prices.nationalGrossPrice = tourOptions.price;
    prices.nationalCurrency = tourOptions.currency;

    const services = {
        tourOptions,
        other: tourOptions.others,
        prices
    };
    return services;
}


function parsePassengers(button) {
    const row = button.closest('.order_card')
    const panels = window.passengers.map(v => v.closest('.v_line'));
    return panels.map(panel => extractPassengerInfo(panel, row));
}

function extractPassengerInfo(panel, row) {
    const orderDetailsText = getNodeData('.order_details', row);
    const name = getNodeData('.vt_name', panel);
    const [lastName, firstName, secondName] = name.split(/\s+/);
    const isClient = !!orderDetailsText.match(new RegExp(name, 'i'));
    const [_, serial, number] = getNodeData('.vt_passport', panel, 'textContent', '').replace(/\D+/g, '').match(/(\d{4})(\d+)/) || [];
    const passenger = new Passenger({
        birthday: getNodeData('.vt_born', panel),
        lastName,
        firstName,
        secondName,
        serial,
        number,
        isClient
    });
    return passenger;
}
