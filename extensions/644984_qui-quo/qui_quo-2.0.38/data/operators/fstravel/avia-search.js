window.OPERATOR_NAME = "FUN&SUN";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".nemo-flights-results__flightsListGroup__buyButtonCnt__inner, .nemo-flights-results__flightsGroup__footer__buyButtonContainer").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const flight = await getFlight(tour);
    let option = createOptionFromFlight(flight);

    const priceNode = $first('money[data-bind*="getTotalPrice"], money', tour);
    option.price = priceNode.getAttribute('amount');
    option.currency = priceNode.getAttribute('currency');
    return option;
}

async function getFlight(tour) {
    const detailButtons = $$('.nemo-flights-results__flightsListGroup__fullDetails, .nemo-flights-results__flightsGroup__leg__selector__footer__detailsLink span', tour);
    const sectors = [];
    for ( const btn of detailButtons ) {
        btn.click();
        const wrapper = $$('.ui-dialog__wrapper').find(d => d.clientHeight > 0);
        const closeBtn = $first('button.ui-dialog-titlebar-close', wrapper);
        await waitingFor(() => console.log(new Date().getSeconds()) || null, 200, 1);
        const legs = $$('.nemo-flights-flightInfo__leg', wrapper).map(parseSector);
        sectors.push(...legs);
        closeBtn.click();
    }
    return {sectors};
}

function parseSector(leg) {
    const legSelector = 'nemo-flights-flightInfo__leg__segment';
    const segmentsNode = $first(`.nemo-flights-flightInfo__leg__segments`, leg);
    const segments = $$(`.${legSelector}`, segmentsNode).map(parseSegment);


    function parseSegment(segmentNode) {
        const [departureCity, departureCountry] = getNodeData(`.${legSelector}__city_departure`, segmentNode).split(/\(|\)/);
        const [arrivalCity, arrivalCountry] = getNodeData(`.${legSelector}__city_arrival`, segmentNode).split(/\(|\)/);
        const addItemSelector = `${legSelector}__additional__item`;
        return new FlightSegment({
            flightNumber: getNodeData(`.${addItemSelector}_flightNumber .${addItemSelector}__value`, segmentNode),
            airline: getNodeData(`.${addItemSelector}_carrier .${addItemSelector}__value`, segmentNode),
            travelTime: getNodeData(`.${addItemSelector}_timeEnRoute .${addItemSelector}__value`, segmentNode),
            plane: getNodeData(`.${addItemSelector}_aircraft .${addItemSelector}__value`, segmentNode),
            departureDate: parseDateFstravel(getNodeData(`.${legSelector}__date.${legSelector}___departure`, segmentNode)),
            departureTime: getNodeData(`.${legSelector}__time_departure`, segmentNode),
            departureCity,
            departureCountry,
            departureAirport: getNodeData(`.${legSelector}__airport_departure .${legSelector}__airport__value`, segmentNode).split(/,\s*/)[0],
            departureTerminal: getNodeData(`.${legSelector}__terminal_departure .${legSelector}__terminal__value`, segmentNode),
            serviceClass: getNodeData(`[data-bind*="nemo-flights-farerules__dialogContent"]`, segmentNode),
            arrivalDate: parseDateFstravel(getNodeData(`.${legSelector}__date_arrival`, segmentNode)),
            arrivalTime: getNodeData(`.${legSelector}__time_arrival`, segmentNode),
            arrivalCity,
            arrivalCountry,
            arrivalAirport: getNodeData(`.${legSelector}__airport_arrival .${legSelector}__airport__value`, segmentNode).split(/,\s*/)[0],
            arrivalTerminal: getNodeData(`.${legSelector}__terminal_arrival .${legSelector}__terminal__value`, segmentNode),
            baggage: getNodeData(`[data-bind*="nemo-flights-results__fareFamilies__features__baggage__feature__hint"]`, segmentNode)
        })
    }

    return {segments};

}

function parseDateFstravel(str) {
    return dateFromDayAndMonthName(...str.replace(',', '').split(/\s+/))
}

function getHotelRowByImage(img) {
    return img.closest('.nemo-flights-results__groupList__item');
}
