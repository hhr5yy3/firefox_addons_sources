window.OPERATOR_NAME = "TUTU";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return {};
}

function getSearchButton() {
    return null
}

function injectData() {
    $$('[data-ti="offer-card"] > div > div:last-child').forEach(div => {
        if (div.querySelector(".qq")) return;

        const buttons = qqBtns({align: "qq-horizontal"});
        buttons.style.marginTop = '4px';
        buttons.style.width = '100%';
        buttons.style.justifyContent = 'flex-end';
        div.style.paddingBottom = '16px';
        div.append(buttons);
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const priceText = getNodeData('[data-ti="price"]', tour);
    const flight = await getFlight(tour);

    let option = createOptionFromFlight(flight);

    return Object.assign({
        price: priceText.replace(/\D+/g, ''),
        currency: mapCurrencyUtil(priceText.slice(-1)),
        operator: OPERATOR_NAME
    }, option);
}

function getHotelRowByImage(img) {
    return img.closest('[data-ti="offer-card"] > div');
}

function parseTravelataDate(date) {
    const [day, month] = date.slice(0, -4).split(' ')
    return appendYear(day, monthNameToNumber(month));
}

async function getFlight(flightNode) {
    try {
        $1('[data-ti="order-button-outer"] > button', flightNode).click();

        const closeButton = await waitForElem(".od-modal > .od-modal-modal > .o-panel > .o-popper-header > div:nth-child(2) > div");
        const elemToParse = $1(closeButton).closest('[data-portal-origin="order"]');
        elemToParse.style.display = 'none';

        let sectors = [];
        for (const sector of $$('[data-ti="card"]', elemToParse)) {
            const tempSector = await parseSectors(sector);
            sectors.push(tempSector)
        }

        tryToClick(closeButton);

        return {sectors: sectors.flatMap(s => s)};
    } catch (e) {
        console.log(e);
        return null;
    }
}

async function parseSectors(sector) {
    let segments = [];
    for (const segment of $$('[data-ti="collapse-item"] > div > div:last-child > div', sector)) {
        const tempSegment = await parseSegments(segment);
        segments.push(tempSegment);
    }
    return {segments: segments.flatMap(s => s)};
}

async function parseSegments(segment) {
    const serviceClassArr = getNodeData('[data-ti="info"]').split(' • ');

    const flightData = $1('[data-ti="carrier_badge"]', segment).parentNode;
    const [departure, arrival] = $$('[data-ti="time"]', segment).map(timeElem => timeElem.parentNode.parentNode);
    const airportNameDep = getNodeData('[data-ti="airport"]', departure).split(', ');
    const airportNameArr = getNodeData('[data-ti="airport"]', arrival).split(', ');
    const travelTime = getNodeProperty($1('[data-ti="flight_duration"]', flightData)) || getNodeProperty($1('[data-ti="summary-info"] > span:last-child', segment.closest('[data-ti="card"] > div')))
    const segments = [new FlightSegment({
        airline: getNodeProperty($1('[data-ti="name"]', flightData)),
        flightNumber: getNodeProperty($1('[data-ti="voyage_number"]', flightData)),
        plane: getNodeProperty($1('[data-ti="plane_name"]', flightData)) ?? '',
        travelTime: clearFlightTime(travelTime.replace(/ч|д/, ':').replace(/[^0-9:]/gi, '')),
        departureDate: parseTravelataDate(getNodeProperty($1('[data-ti="date"]', departure))),
        departureTime: getNodeProperty($1('[data-ti="time"]', departure)),
        departureCity: getNodeProperty($1('[data-ti="city"]', departure)),
        departureAirport: airportNameDep[0],
        departureAirportID: airportNameDep[1],
        arrivalDate: parseTravelataDate(getNodeProperty($1('[data-ti="date"]', arrival))),
        arrivalTime: getNodeProperty($1('[data-ti="time"]', arrival)),
        arrivalCity: getNodeProperty($1('[data-ti="city"]', arrival)),
        arrivalAirport: airportNameArr[0],
        arrivalAirportID: airportNameArr[1],
        serviceClass: serviceClassArr[serviceClassArr.length - 1]
    })]
    return segments;
}

function waitForElem(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(selector);
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(selector);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function tryToClick(selector) {
    const i = setInterval(() => {
        const item = document.querySelector(selector);
        if(item) item.click();
        else clearInterval(i)
    }, 100)
}

