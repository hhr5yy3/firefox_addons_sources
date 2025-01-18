window.OPERATOR_NAME = "Aviasales";
window.showTopHotelsRating = false;
console.log('Loaded: ', OPERATOR_NAME);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    if(location.origin !== 'https://travel.magput.ru') return;

    $$('.ticket-action-proposals-item').forEach(div => {
        if (div.querySelector(".qq")) return;

        const buttons = qqBtns({align: "qq-horizontal"});
        const flightSwitch = $1('.qq-fly-btn', buttons);
        const container = div.closest('ul');

        flightSwitch.style.setProperty('position', 'absolute');
        container.style.setProperty('height', 'auto');
        buttons.style.setProperty('width', '100%');
        buttons.style.setProperty('justify-content', 'flex-end');

        div.append(buttons);
    });

    $$('.ticket-action-button-price_and_proposal').forEach(div => {
        if (div.querySelector(".qq")) return;

        const buttons = qqBtns({align: "qq-horizontal"});
        const flightSwitch = $1('.qq-fly-btn', buttons);

        $1('ul', div.closest('.ticket-action')).style.setProperty('margin-top', '5px');
        flightSwitch.style.setProperty('position', 'absolute');
        buttons.style.setProperty('justify-content', 'center');
        buttons.style.setProperty('margin-right', '-2px');
        buttons.style.setProperty('width', '100%');
        buttons.classList.add('qq-non-mobile-magput')

        div.append(buttons);
    });

    $$('.ticket').forEach(div => {
        if (div.querySelector(".ticket-scroll-container > .qq")) return;
        div = div.querySelector('.ticket-scroll-container')

        const buttons = qqBtns({align: "qq-horizontal"});
        const flightSwitch = $1('.qq-fly-btn', buttons);

        flightSwitch.style.setProperty('position', 'absolute');
        buttons.style.setProperty('justify-content', 'end');
        buttons.style.setProperty('margin-right', '-2px');
        buttons.style.setProperty('width', '100%');
        buttons.classList.add('qq-mobile-magput');
        
        div.append(buttons);
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const priceText = getNodeData('.currency_font', tour);
    const flight = await getFlight(tour);

    let option = createOptionFromFlight(flight);

    return Object.assign(option, {
        price: priceText.replace(/\D+/g, ''),
        currency: 'RUB',
        operator: getNodeData('.ticket-action__main_proposal, .ticket-action-proposals-item-link__gate', tour)
    });
}

function getHotelRowByImage(img) {
    if(img.parentNode.classList.contains('qq-mobile-magput')) return $1('.ticket-action-button', img.closest('.ticket'));
    return img.closest('.ticket-action-proposals-item, .ticket-action-button');
}

function parseMagputDate(text) {
    const [day, month] = text.split(/\s/);
    return appendYear(day, monthNameToNumber(month));
}

async function getFlight(flightNode) {
    try {
        const ticket = flightNode.closest('.ticket');

        let sectors = [];
        for (const sector of $$('.flight', ticket)) {
            const tempSector = await parseSectors(sector);
            sectors.push(tempSector)
        }

        return {sectors: sectors.flatMap(s => s)};
    } catch (e) {
        console.log(e);
        return null;
    }
}

async function parseSectors(sector) {
    let segments = [];
    const pcSegments = $$('.flight-details-leg', sector);
    const mobileSegments = $$('.flight-details-leg--mobile', sector);
    for (let id = 0; id < pcSegments.length; id++) {
        const tempSegment = await parseSegments(pcSegments[id], mobileSegments[id]);
        segments.push(tempSegment);
    }
    return {segments: segments.flatMap(s => s)};
}

async function parseSegments(segment, mobileSegment) {
    const serviceClass = getNodeData('.mewtwo-flights-trip_class__class');

    const travelTime = getNodeProperty($1('.flight-details-leg__duration', segment));
    const [departureDate, arrivalDate] = $$('.leg-details__time-date', mobileSegment).map(i => parseMagputDate(i.textContent));
    const [departureTime, arrivalTime] = getNodeData('.flight-details-leg-time', segment).split(/\s.\s/).map(i => i.slice(0,5));

    const planeData = getNodeData('.flight-details-leg__flight_details', segment).split(/\s.\s/);
    const [airportDep, airportArr] = getNodeData('.flight-details-leg__direction', segment).split('→←');
    const [departureCity, arrivalCity] = $$('.leg-details__airport > div', mobileSegment).map(i => i.textContent);
    const aircodeDep = airportDep.slice(0, 3);
    const aircodeArr = airportArr.slice(0, 3);
    const segments = [new FlightSegment({
        airline: planeData[1],
        flightNumber: planeData[0],
        plane: planeData[2].replace('Ночной перелёт', ''),
        travelTime: clearFlightTime(travelTime.replace(/ч|д/, ':').replace(/[^0-9:]/gi, '')),
        departureDate, 
        departureTime, 
        departureCity,
        departureAirport: airportDep.slice(4),
        departureAirportID: aircodeDep,
        arrivalDate, 
        arrivalTime, 
        arrivalCity,
        arrivalAirport: airportArr.slice(4),
        arrivalAirportID: aircodeArr,
        serviceClass: serviceClass
    })];

    return segments;
}

function fixMediaRequest() {
    if(location.origin !== 'https://travel.magput.ru') return;
    
    if(window.matchMedia('(max-width: 660px)').matches) {
        document.querySelectorAll('.qq-non-mobile-magput').forEach(item => {
            item.style.setProperty('display', 'none');
        })
        document.querySelectorAll('.qq-mobile-magput').forEach(item => {
            item.style.setProperty('display', 'inline-flex');
        })
    }else{
        document.querySelectorAll('.qq-mobile-magput').forEach(item => {
            item.style.setProperty('display', 'none');
        })
        document.querySelectorAll('.qq-non-mobile-magput').forEach(item => {
            item.style.setProperty('display', 'inline-flex');
        })
    }
}

window.addEventListener('resize', function(e) {
    fixMediaRequest();
})

fixMediaRequest();