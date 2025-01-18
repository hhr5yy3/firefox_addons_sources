window.OPERATOR_NAME = "Aviasales";
window.showTopHotelsRating = false;
window.qscript = document.createElement("script");
window.qscript.src = chrome.runtime.getURL('data/operators/aviasales/inline_script.js');
document.head.appendChild(window.qscript);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$('[data-test-id="search-results-items-list"] [data-test-id="ticket-preview"] [data-test-id="button"]').forEach(div => {
        const container = div.closest('[data-test-id="ticket-preview"]')
        if (!container.querySelector(".qq")) {
            const buttons = qqBtns({align: "qq-horizontal"});
            const p = document.createElement('p');
            // p.textContent = 'Qui-Quo: Проверяйте добавленный перелет.';
            // p.classList.add('qq');
            div.after(buttons);
            buttons.before(p)
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const ticketNode = $first('.ticket-desktop', tour) || tour;
    const ticketSign = createTicketSignFromNode(ticketNode);
    let savedSearchResult = getNodeData('#qdata') || sessionStorage.getItem('savedSearchResults');

    if ( !savedSearchResult || savedSearchResult === '{}') {
        throw new QuiQuoError('Ошибка', 'Результаты поиска устарели, пожалуйста, обновите страницу');
    }
    const flight = await getFlight([JSON.parse(savedSearchResult)], ticketSign);
    const option = createOptionFromFlight(flight);
    let price = getNodeData('[data-test-id="price"]', tour) || $$('[data-test-id="text"]', tour).extractNodesText().find(t => trim(t).replace(/\d+|\s+|\.|/g, '') !== mapCurrencyUtil(t.replace(/\d+|\s+|,|млн/g, '')));

    if ( price.match('млн') ) {
        price = (parseFloat(price.replace(/,/g, '.')) * 1_000_000) + ' RUB'
    }
    option.price = extractIntFromStr(price.replace(/\D+/g, ''));
    option.currency = mapCurrencyUtil(price.replace(/\d+|\s+/g, ''));
    return option;
}

function createTicketSignFromNode(ticketNode) {
    const timeArray = $$('[data-test-id="text"]', ticketNode).extractNodesText().filter(t => t.match(getRegexPatterns().time));
    return [...timeArray].join('')
}

function createTicketSignFromSectors(sectors, proposal) {
    const price = String(proposal.price.value);
    const timeArray = sectors.map(s => [s.segments[0].departureTime, lastElement(s.segments).arrivalTime].join(''));
    return [...timeArray].join('')
}

async function getFlight(searchResults, ticketSign) {
      const result = searchResults.filter(r => Array.isArray(r)).find(result => {
        return !!result
    }).find(result => result['chunk_id'] === "results")

    const tickets = [...result.tickets, ...(result.soft_tickets ? result.soft_tickets.tickets : [])];
    const flightLegs = result.flight_legs;
    const allSectors = {};

    for ( const ticket of tickets ) {
        const sectors = ticket.segments.map(sector => parseSector(sector, flightLegs, result))
        const sign = createTicketSignFromSectors(sectors, ticket.proposals[0]);
        allSectors[sign] = sectors
    }
    return {sectors: allSectors[ticketSign]};
}

function parseSector(sector, flightLegs, result) {
    const segments = sector.flights.map(flight => flightLegs[flight]).map(seg => parseSegment(seg, result));
    return {segments}
}


function parseSegment(segment, result) {
    const departureDate = new Date(segment.local_departure_date_time);
    const arrivalDate = new Date(segment.local_arrival_date_time);

    const departurePlace = result.places.airports[segment['origin']]
    const departureAirport = departurePlace['name']['ru']['default']
    const departureCityCode = departurePlace['city_code'];
    const departureCity = result.places.cities[departureCityCode]['name']['ru']['default']

    const arrivalPlace = result.places.airports[segment['destination']]
    const arrivalAirport = arrivalPlace['name']['ru']['default']
    const arrivalCityCode = arrivalPlace['city_code'];
    const arrivalCity = result.places.cities[arrivalCityCode]['name']['ru']['default']

    return new FlightSegment({
        flightNumber: `${segment.operating_carrier_designator.carrier}${segment.operating_carrier_designator.number}`,
        plane: segment['equipment'].name,
        departureDate: departureDate.toLocaleDateString('ru'),
        departureTime: departureDate.toLocaleTimeString('ru'),
        departureCity,
        departureAirport,
        departureAirportID: segment['origin'],
        arrivalDate: arrivalDate.toLocaleDateString('ru'),
        arrivalTime: arrivalDate.toLocaleTimeString('ru'),
        arrivalCity,
        arrivalAirport,
        arrivalAirportID: segment['destination'],
    })
}

function getHotelRowByImage(img) {
    return img.closest('[data-test-id="ticket-preview"]');
}
