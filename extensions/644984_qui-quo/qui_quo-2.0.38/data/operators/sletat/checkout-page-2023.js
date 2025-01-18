window.OPERATOR_NAME = "sletat.ru";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

window.CURRENCY_HASHES = {
    904313980: "EUR",
    860766566: "USD",
    2262136020: "RUB",
    2357539539: "BYN",
    2766178904: "KZT"
}

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const priceTag = $1("[class*='PriceTag_tagPrice']");
    const priceBody = $1("[class*='PriceWithCurrency_priceWithCurrency']");
    if ( priceTag && priceBody && !document.querySelector(".qq") ) {
        priceTag.after(qqBtns({align: "qq-box"}));
    }
}

async function createOption(img) {
    const [checkinDt, checkoutDt] = $$('[class*="InfoBlock_durationBlock_"] [class*="Duration_date_"]')
        .extractNodesText()
        .map(getDateFromText);
    const locationArray = $$('a[class*="HotelLocation_locationLink"]').extractNodesText();
    const priceData = getNodeData('[class*="PriceTag_container_"] [class*="PriceWithCurrency_priceWithCurrency_"]').replace(/\D+/g, '');
    const currencySVG = $1('[class*="PriceTag_container_"] [class*="PriceWithCurrency_priceWithCurrency_"] svg path');
    const currencyPath = currencySVG ? currencySVG.getAttribute('d') : null;
    const flight = await getFlight();
    const operator = getNodeData('[class*="TourOperator_tourOperator"] p, [class*="descriptionOperatorLink"]')
    let option = {
        checkinDt,
        nights: String(getDistance(checkinDt, checkoutDt)),
        hotelName: getHotelName(),
        href: getNodeData('[class*="HotelName_hotelNameLink_"]', document, 'href'),
        country: locationArray.shift().replace(/,+/, ''),
        region: locationArray.join(', ').replace(/,+/, ','),
        roomType: $$('[class*="InfoBlock_itemCenter"] [class*="Room_room_"] p').extractNodesText().join(', '),
        boardType: $$('[class*="InfoBlock_itemCenter"] [class*="Meal_meal_"] p').extractNodesText().join(', '),
        price: extractIntFromStr(priceData),
        currency: currencyPath ? window.CURRENCY_HASHES[crc32(currencyPath)] || 'RUB' : 'RUB',
        city_from: "",
        operator: window.OPERATOR_NAME + ' / ' + operator,
        thumbnail: getNodeData('.swiper-slide-active img[class*="SliderItem_sliderPhoto_"]', document, 'src'),
        flight,
        occupancy: getOccupancy()
    };
    return option;
}

function getDateFromText(text) {
   return dateFromDayAndMonthName(...text.split(/\s+/).slice(0,2))
}

async function getFlight() {
    try {
        const flightElement = $1('[class*="FlightsItem_selected"]');
        if ( flightElement ) {
            const sectors = await $$('[class*="FlightsItem_ticketBody_"]', flightElement).asyncMap(parseSector);
            return {sectors}
        }
    } catch (e) {
        console.log(e);
        return null;
    }
}

async function parseSector(sector) {
    let segment = parseSegment(sector);
    const stopsButton = $1('button[class*="Route_transferBtn_"]', sector);
    const stopsCount = Number(getNodeProperty(stopsButton, '').replace(/\D+/g, ''));
    const routeItems = $$('[class*="Route_route_"] [class*="RouteItem_routeItem_"]', sector).extractNodesText();
    if ( stopsCount > 0 ) {
        stopsButton.click();
        const tooltip = await waitingFor(() => $1('[class*="FlightTooltip_flightItem_"]', stopsButton.parentNode), 100, 4)
        const stops = $$('[class*="FlightTooltip_flightInfoContainer_"]', tooltip).map(parseStopSegment);
        const resultSegments = new Array(stops.length+1);
        resultSegments[0] = Object.assign({...segment[0]}, {...stops[0][1]});
        resultSegments[0].departureAirportID = routeItems[0];
        resultSegments[resultSegments.length-1] = Object.assign({...stops[stops.length-1][0]}, {...segment[1]});
        resultSegments[resultSegments.length-1].arrivalAirportID = routeItems[routeItems.length-1];
        return {segments: resultSegments}
    }
    segment[0].departureAirportID = routeItems[0];
    segment[1].arrivalAirportID = routeItems[routeItems.length - 1];
    return {segments: [Object.assign(segment[0], segment[1])]};
}

function parseSegment(segmentNode) {
    const [departureNode, arrivalNode] = $$('[class*="FlightsPackageDirection_timeContainer_"]', segmentNode);
    return [{
        flightNumber: getNodeData('[class*="AirCompany_raceNumber"]', segmentNode, 'textContent', '').replace(/\s*Рейс\s*№\s*/, ''),
        airline: getNodeData('[class*="AirCompany_logosLabelsContainer_"]', segmentNode),
        departureDate: getDateFromText(getNodeData('[class*="DateInfo_date_"]', departureNode)),
        departureTime: getNodeData('[class*="FlightsDateDirection_time_"]', departureNode),
        departureCity: getNodeData('[class*="FlightsDateDirection_caption_"]', departureNode),
        serviceClass: getNodeData('[class*="AirCompany_classType_"]', segmentNode),
    }, {
        arrivalDate: getDateFromText(getNodeData('[class*="DateInfo_date_"]', arrivalNode)),
        arrivalTime: getNodeData('[class*="FlightsDateDirection_time_"]', arrivalNode),
        arrivalCity: getNodeData('[class*="FlightsDateDirection_caption_"]', arrivalNode)
    }]
}

function parseStopSegment(segmentNode) {
    const [arrivalNode, departureNode] = $$('[class*="FlightInfo_flightInfo_"]', segmentNode);
    return [{
        departureDate: getDateFromText(getNodeData('[class*="FlightInfo_date_"]', departureNode)),
        departureTime: getNodeData('[class*="FlightInfo_time_"]', departureNode),
        departureAirportID: getNodeData('[class*="RouteItem_routeItem_"]', departureNode),
    },{
        arrivalDate: getDateFromText(getNodeData('[class*="FlightInfo_date_"]', arrivalNode)),
        arrivalTime: getNodeData('[class*="FlightInfo_time_"]', arrivalNode),
        arrivalAirportID: getNodeData('[class*="RouteItem_routeItem_"]', arrivalNode)
    }]
}

function getHotelName() {
    const stars = getNodeData('[class*="HotelName_star"]');
    const hotelName = getText($1('[class*="HotelName_hotelNameLink"]').lastChild);
    return `${hotelName} ${stars ? stars+'*' : ''}`.trim()
}

function getOccupancy() {
    const routeNode = $$('[class*="DetailsItem_wrapper"]').find(n => $1('[class*="TourParams_direction"]'));
    if ( routeNode ) {
        const occupancyText =getText(routeNode);
        if (!occupancyText) {
            return null;
        }
        const occupancy = {
            adultsCount: 0,
            childrenCount: 0,
            childAges: null
        };
        const adults = occupancyText.match(/(\d+)\s*взр/);
        const children = occupancyText.match(/(\d+)\s*[детрб]/);
        occupancy.adultsCount = adults ? Number(adults[1]) : null;
        occupancy.childrenCount = children ? Number(children[1]) : null;
        return occupancy;
    }
}

function getHotelRowByImage(img) {
    return document;
}
