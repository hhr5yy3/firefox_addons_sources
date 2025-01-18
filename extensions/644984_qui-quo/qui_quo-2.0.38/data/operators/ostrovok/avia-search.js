window.OPERATOR_NAME = "b2b.ostrovok.ru";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$('[class*="Fare_priceWrapper"]').forEach(div => {
        const priceCol = $1('[class*="FarePrice_priceCol"]', div)
        if ( priceCol && !div.querySelector(".qq") ) {
            priceCol.after(qqBtns({align: "qq-horizontal", cssText: 'margin: 8px'}));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const priceContainer = img.closest('[class*="Fare_priceWrapper"]')
    const flight = await getFlight(tour);
    const option = createOptionFromFlight(flight)
    const price = getNodeData('[class*="FarePrice_price"] [class*="Text_text"]', priceContainer) || getNodeData('[class*="FarePrice_price"]', priceContainer)
    option.price = extractIntFromStr(getNodeData('[class*="LanguageWidget_value"]').match(/русс/i) ? price.replace(/\s/g, '') :  price.replace(/,|\s/g, ''))
    option.currency = mapCurrencyUtil(price.replace(/\s+|\d+|\./g, ''))

    return option;
}

async function getFlight(tour) {
    const sectors = await $$('[class*="Route_route_checked"]', tour).asyncMap(parseSector);
    return {sectors};
}

async function parseSector(node) {
    let detailWrapper = $1('[class*="Route_routeDetails"]', node.parentNode);
    if ( !detailWrapper ) {
        const collapseButton = $1('button[class*="Route_collapseButton"]', node);
        await waiting(50);
        collapseButton.click();
        await waiting(50);
        detailWrapper = $1('[class*="Route_routeDetails"]', node.parentNode);
    }
    const segments = $$('[class*="RouteDetailsSegment_container"]', detailWrapper).map(parseSegment);
    return {segments}
}

function parseSegment(segmentNode) {
    const departureRow = $1('[class*="segmentRow_start"]', segmentNode);
    const arrivalRow = $1('[class*="segmentRow_end"]', segmentNode);
    const [flightNumber, plane, serviceClass] =
        $$('[class*="RouteDetailsSegment_info"]', segmentNode).extractNodesText().join('・').split('・')
    return new FlightSegment({
        flightNumber,
        plane,
        departureDate: prepareDate(getNodeData('[data-testid="departure_date"]', departureRow)),
        departureTime: getNodeData('[data-testid="departure_time"]', departureRow),
        departureCity: getNodeData('[data-testid="departure_cityName"]', departureRow),
        departureAirport: getNodeData('[data-testid="departure_airportName"]', departureRow),
        departureAirportID: getNodeData('[data-testid="departure_airportCode"]', departureRow),
        departureTerminal: getNodeData('[data-testid="departure_terminal"]', departureRow),
        serviceClass,
        arrivalDate: prepareDate(getNodeData('[data-testid="arrival_date"]', arrivalRow)),
        arrivalTime: getNodeData('[data-testid="arrival_time"]', arrivalRow),
        arrivalCity: getNodeData('[data-testid="arrival_cityName"]', arrivalRow),
        arrivalAirport: getNodeData('[data-testid="arrival_airportName"]', arrivalRow),
        arrivalAirportID: getNodeData('[data-testid="arrival_airportCode"]', arrivalRow),
        arrivalTerminal: getNodeData('[data-testid="arrival_terminal"]', arrivalRow),
    })
}


function prepareDate(date) {
  const parts =  date.split(/,*\s+,*/);
  const year = parts.find(part => part.match(/^\d{4}$/));
  const month = parts.find(part => part.match(/^\D+$/));
  const day = parts.find(part => part.match(/^\d{1,2}$/));
  return dateFromDayAndMonthName(day, month, year);
}
function getHotelRowByImage(img) {
    return img.closest('[data-testid="offersPack"]');
}
