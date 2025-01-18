window.OPERATOR_NAME = "Travelleader";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function createElementIterator(selector, document) {
    const elements = document.querySelectorAll(selector);
    let index = 0;

    return function() {
        if (index < elements.length) {
            return elements[index++];
        } else {
            return null; 
        }
    };
}

async function getDatesHTML() {
    if(location.href.match('/book.aspx?')) return;

    const searchStr = document.querySelector('#current-page-url').value;
    const search = new URLSearchParams(searchStr);

    let response;
    if(!search.get('airListView')) {
        const viewTypeElem = await waitForElem('#airListView > [selected]');
        const viewTypeRawText = document.querySelector(viewTypeElem).textContent;
        const viewType = viewTypeRawText.match(/(абли|abl)/) ? 'Table' : 'List';

        if(viewType !== 'Table') response = await fetch('https://my.travelleader.ru' + searchStr + '&airListView=Table');
        else return;
    }else if(searchStr.match('=List&')){
        await waitForElem('.flight');

        response = await fetch('https://my.travelleader.ru' + searchStr.replace('=List&', '=Table&'))
    }
    
    if (response.ok) {
        const HTML = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(HTML, "text/html");

        document.querySelectorAll('.recommendation').forEach(div => {
            const id = div.id;
            const getDate = createElementIterator(`#${id} > .segm > div > table > tbody > tr:not(.stop)`, doc.getElementById(id));

            document.getElementById(id).querySelectorAll('.flightWrap').forEach(noDates => {
                noDates.querySelectorAll('[data-qq-type="startDate"], [data-qq-type="endDate"]').forEach(i => i.remove())
                const dates = getDate();

                const startDate = doc.createElement('meta');
                startDate.dataset.qqType = 'startDate';
                startDate.content = dates.querySelector('.departureCell > label').textContent;

                const endDate = doc.createElement('meta');
                endDate.dataset.qqType = 'endDate';
                endDate.content = dates.querySelector('.arrivalCell > label').textContent;

                noDates.prepend(endDate);
                noDates.prepend(startDate);
            })
            
        })
    }
}

getDatesHTML();

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$('.priceBlock').forEach(div => {
        if (div.parentNode.querySelector(".qq")) return;

        const btns = qqBtns({align: "qq-horizontal"});
        btns.style.setProperty('margin-right', '8px');
        btns.style.setProperty('margin-top', '-4px');
        
        div.before(btns);
    });
}

async function getGroups() {
    window.qscript = document.createElement("script");
    window.qscript.src = chrome.runtime.getURL('data/operators/travelleader/inline_script.js');
    document.head.append(window.qscript);

    return new Promise((resolve) => {
        const timeout = setTimeout(() => {
            document.removeEventListener('qqSendInlineVar', handler);
            
            resolve(null);
        }, 1000);

        document.addEventListener('qqSendInlineVar', handler);

        function handler(e) {
            const variableValue = e.detail;

            document.removeEventListener('qqSendInlineVar', handler);

            clearTimeout(timeout);
            resolve(variableValue);
        }
    });
}

async function createOption(img) {
    const isBookPage = Boolean(location.href.match('/book.aspx?'));
    const tour = getHotelRowByImage(img);
    const priceText = getNodeData('.priceText', tour);
    const flight = await getFlight(tour);

    let href;
    if(isBookPage) {
        href = location.origin + $1('#current-page-url').value;
    }else {
        const groups = await getGroups();
        href = groups ? location.origin + '/' + groups[Number(tour.id.replace(/\D+/g, ''))] : '';
    }

    let option = createOptionFromFlight(flight);

    return Object.assign(option, {
        href,
        price: priceText.replace(/\D+/g, ''),
        currency: mapCurrencyUtil(priceText.replace(/\d+/g, '')),
        operator: OPERATOR_NAME,
        occupancy: getOccupancy()
    });
}

function getHotelRowByImage(img) {
    return img.closest('.recommendation');
}

function parseTravelataDate(date) {
    const [day, month] = date.slice(0, -4).split(' ')
    return appendYear(day, monthNameToNumber(month));
}

function getOccupancy(isBookPage) {
    const searchParams = getSearchParams();
    const adultsCount = searchParams.get('adult');
    const children1Count = searchParams.get('children');
    const children2Count = searchParams.get('infant');
    const isNull = [adultsCount, children1Count, children2Count].some(i => i === null);

    if(isNull) return null;

    return {
        adultsCount: Number(adultsCount),
        childrenCount: Number(children1Count) + Number(children2Count),
        childAges: null
    }
}

async function getFlight(tour) {
    try {
        let sectors = [];
        for (const sector of $$('.segm > .selected', tour)) {
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
    for (const segment of $$('tr:not(.stop)', sector)) {
        const tempSegment = await parseSegmentsTable(segment);
        segments.push(tempSegment);
    }
    for (const segment of $$('.flightWrap', sector)) {
        const tempSegment = await parseSegmentsList(segment, sector);
        segments.push(tempSegment);
    }
    return {segments: segments.flatMap(s => s)};
}

async function parseSegmentsTable(segment) {
    const isBookPage = Boolean(location.href.match('/book.aspx?'));
    const searchParams = getSearchParams();
    const serviceClassSP = {
        all: null,
        business: 'Бизнес',
        economy: 'Эконом',
        economyPremium: 'Эконом Премиум',
        first: 'Первый',
    }[searchParams.get('flightClass') ?? 'all']
    const serviceClassElem = getNodeData('.brand.selected > .flight > .hdr > .flightclass', (isBookPage ? document : segment.closest('.recommendation')))?.match(/[а-яА-Я]+/g)[0];

    const flightData = $1('.infoCell', segment);
    const travelTime = getNodeProperty($1('.durationCell', segment))
    const departure = $1('.departureCell', segment);
    const arrival = $1('.arrivalCell', segment);
    const depLabel = $$('label', departure);
    const arrLabel = $$('label', arrival);
    const plane = getNodeProperty($1('span', flightData)).replace(/\(|\)/g, '');

    const segments = [new FlightSegment({
        airline: '',
        flightNumber: getNodeProperty($1('b', flightData)),
        plane: (plane && plane !== '0') ? plane : '',
        travelTime: clearFlightTime(travelTime.replace(/ч|д/, ':').replace(/[^0-9:]/gi, '')),
        departureDate: getNodeProperty(depLabel[0]),
        departureTime: getNodeProperty($1('b', departure)),
        departureCity: getNodeProperty(depLabel[1]),
        departureAirport: getNodeProperty($1('span', departure)),
        departureAirportID: '',
        arrivalDate: getNodeProperty(arrLabel[0]),
        arrivalTime: getNodeProperty($1('b', arrival)),
        arrivalCity: getNodeProperty(arrLabel[1]),
        arrivalAirport: getNodeProperty($1('span', arrival)),
        arrivalAirportID: '',
        baggage: $$('.baggageCell > div', segment).map(i => getText(i)).join(', '),
        serviceClass: serviceClassSP || serviceClassElem || ''
    })]
    return segments;
}

async function parseSegmentsList(segment, sector) {
    const prevCityElem = segment.previousElementSibling;
    const nextCityElem = segment.nextElementSibling;

    const [
        departureAirportNTime,
        arrivalAirportNTime,
        travelTime,
        serviceClass,
        flightNumber,
        plane
    ] = $$('.popup > div > span', segment).map(i => getText(i));
    const [departureAirport, departureTime] = departureAirportNTime.split(' - ');
    const [arrivalAirport, arrivalTime] = arrivalAirportNTime.split(' - ');

    const segments = [new FlightSegment({
        airline: '',
        flightNumber,
        plane: (plane && plane !== '0') ? plane : '',
        travelTime: clearFlightTime(travelTime.replace(/ч|д/, ':').replace(/[^0-9:]/gi, '')),
        departureDate: getNodeData('[data-qq-type="startDate"]', segment, 'content'),
        departureTime,
        departureCity: prevCityElem && getNodeData('.city', prevCityElem) || getNodeData('.depcity', segment),
        departureAirport,
        departureAirportID: '',
        arrivalDate: getNodeData('[data-qq-type="endDate"]', segment, 'content'),
        arrivalTime,
        arrivalCity: nextCityElem && getNodeData('.city', nextCityElem) || getNodeData('.arrcity', segment),
        arrivalAirport,
        arrivalAirportID: '',
        baggage: $$('.baggage > div > div > div', sector).map(i => getText(i)).join(', '),
        serviceClass: serviceClass
    })]
    return segments;
}

function getSearchParams() {
    const searchText = document.querySelector("#back-url").value || document.querySelector("#current-page-url").value;
    const decodedUrl = decodeURIComponent(searchText.replaceAll('&amp;', '&'));
    
    return new URLSearchParams(decodedUrl)
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