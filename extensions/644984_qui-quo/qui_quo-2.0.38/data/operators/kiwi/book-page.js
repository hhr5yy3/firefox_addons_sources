window.OPERATOR_NAME = "Kiwi";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
   const order =  $1(".OrderSummary");
   if ( order && !$1('.qq', order) ) {
       const {container, buttons} = createQuickBookingContainer()
       buttons.style.display = 'none';
       order.append(container)
   }
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    let option = {
        checkinDt: "",
        nights: "",
        hotelName: "",
        hotel_desc: "",
        href: "",
        country: "",
        region: "",
        roomType: "",
        boardType: "",
        price: "",
        currency: "",
        city_from: "",
        operator: "",
        thumbnail: "",
        occupancy: "",
        excursion: "",
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = createOption(button);
    const transfer = getTransferInfo();
    const prices = new Prices();
    prices.nationalNettPrice = parseFloat(getNodeData('.kw-summary-price-item__value'));
    prices.nationalCurrency = 'RUB';

    const services = {
         transfers: [transfer],
         tourOptions,
         prices,
    };
    return services;
}

function parsePassengers() {
    const trs = getTrs();
    const panels = new Array(Number(trs.find(tr => tr.label.match(/Пассажиры/i)).value))
    return panels.map(extractPassengerInfo);
}

function getTransferInfo() {
    const trs = getTrs();
    const dateStart = trs.find( tr => tr.label.match(/Дата и время/i)).value;
    const placeOut = trs.find(tr => tr.label.match(/Место отправления/i));
    const placeIn = trs.find(tr => tr.label.match(/Место назначени/i));
    const route = $$('.kw-summary-route__list .kw-summary-property__title').extractNodesText()
    if ( placeOut ) {
        route[0] = `${route[0]}, ${placeOut.value}`
    }
    if ( placeIn ) {
        route[1] = `${route[1]}, ${placeIn.value}`
    }

    return new quickBookingValue({
        dateStart: dateStart.match(getRegexPatterns().date)[0],
        caption: getNodeData('h2[slot="header"]', document, 'innerText'),
        route: route.join(' — '),
        description: route.join(' — ')
    })
}

function extractPassengerInfo(panel) {
    const passenger = {}
    return passenger;
}

function parseClient() {
    const trs = getTrs();
    const clientNode = trs.find(tr => tr.label.match(/Контакты клиента/i)).node;
    const [name, ...phones] = $$('div', clientNode).extractNodesText()
    return new Passenger({
        lastName: name.split(/\s+/)[0],
        firstName: name.split(/\s+/)[1],
        phone: phones[0]
    })
}

function getTrs() {
    return  $$('tr').map(row => {
        return {
            label: getNodeData('th', row) || '',
            value: getNodeData('td', row) || '',
            node: $1('td', row)
        }
    })
}
