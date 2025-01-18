window.OPERATOR_NAME = "АКАДЕМСЕРВИС";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    if ( !$1('.qq') ) {
        const totalPriceNode = $1('.total.clickable');
        if ( totalPriceNode ) {
            const wrapper = createQQContainer();
            totalPriceNode.after(wrapper)
        }

    }
}

function createOption() {
    const nodes = $$('.container>div>div')
    const textNodes = nodes.extractNodesText();
    const [country, ...region] = textNodes[1].split(/\s*,\s*/);
    const [dateStart, dateEnd] = textNodes[2].match(getRegexPatterns().date)

    const mealIndex = textNodes.findIndex(str => str.match(/питание/i));
    const mealNode = nodes[mealIndex];
    const mealRows = $$('div', mealNode).filter(div => {
        return getText(div) === 'Включено в тариф'
    }).map(svg => svg.parentNode.parentNode).map(div => $1('div>div:last-child div', div));
    const mealRowsAdditional = $$('svg', mealNode).filter(svg => {
        const use = $1('use', svg);
        if ( use && use.getAttribute('xlink:href') && use.getAttribute('xlink:href').match(/icon__small_cross/i) ) {
            return true;
        }
    }).map(svg => svg.parentNode.parentNode.parentNode.parentNode).map(div => $1('div>div', div));
    const resultMealRows = [...mealRows, ...mealRowsAdditional].extractNodesText()

    const prices = new Prices();
    prices.nationalGrossPrice = Number(getNodeData('.total.clickable').split(/\s*,\s*/)[0].replace(/\D+/g, ''))
    prices.nationalCurrency = 'RUB';
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: textNodes[0],
        href: null,
        country,
        region: region.join(', '),
        roomType: getNodeData('div>div', nodes[3], 'innerText'),
        boardType: resultMealRows.join(', '),
        price: prices.nationalNettPrice,
        currency: prices.nationalCurrency,
        city_from: "",
        operator: window.OPERATOR_NAME,
        prices
    };
    return option;
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = createOption(button);

    const services = {
        tourOptions,
        prices: tourOptions.prices
    };
    return services;
}


function parsePassengers() {
    const panels = $$("input[name*='LastName']").map(input => input.closest('div'));
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const passenger = new Passenger(getInputsValues(panel, {
        lastName: "input[name*='LastName']",
        firstName: "input[name*='FirstName']",
    }));
    passenger.type = getPassengerType(panel);
    passenger.title = getPassengerTitle(panel)
    return passenger;
}

function getPassengerType(panel) {
    const title = getNodeProperty($1('[class*="select_container__category"]', panel));
    if ( title.match(/ребёнок/i) ) {
        return 'child';
    }
    if ( title.match(/младенец/i) ) {
        return 'infant';
    }
    return 'adult';
}

function getPassengerTitle(panel) {
    const title = getNodeProperty($1('[class*="select_container__category"]', panel));
    if ( title.match(/ребёнок/i) ) {
        return 'Child';
    }
    if ( title.match(/младенец/i) ) {
        return 'Child';
    }
    if ( title.match(/господин/i) ) {
        return 'Mr';
    }
    if ( title.match(/госпожа/i) ) {
        return 'Mrs';
    }
}
