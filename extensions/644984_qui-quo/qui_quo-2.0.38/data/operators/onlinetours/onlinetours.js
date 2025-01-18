window.OPERATOR_NAME = "onlinetours";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);
inlineScript();

function inlineScript() {
    window.qscript = document.createElement("script");
    window.qscript.src = chrome.runtime.getURL('data/operators/onlinetours/inline_script.js');
    document.head.appendChild(window.qscript);
    window.qscript.remove();
}

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    let flag = false;

    $$('section > .grid > div:not(.relative)').forEach(div => {
        if ( !div.querySelector(".qq") && getText(div.parentNode).match(/\d+/) ) {
            const btns = qqBtns({align: "qq-horizontal"});
            
            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'center');
            btns.style.setProperty('margin-bottom', '8px');
            
            div.append(btns);

            flag = true;
        }
    });

    $$('#search > div:not([class]) > div:not([class]) > div[class]').forEach(container => {
        const div = $$({sel: 'a', searchString: '₽'}, container)[0]?.parentNode;
        if ( div && !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});
            
            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'center');
            btns.style.setProperty('margin-bottom', '8px');
            
            div.append(btns);

            flag = true;
        }
    });

    $$({sel: 'div > a', searchString: 'Выбрать тур'}).forEach(div => {
        if ( !div.parentNode.querySelector(".qq") && !div.closest('[data-react-class="Footer"] ~ div') ) {
            const btns = qqBtns({align: "qq-vertical"});
            
            div.parentNode.append(btns);

            flag = true;
        }
    });

    if(flag) inlineScript();
}

function _parseDate(str) {
    const date = new Date(str);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

function getPageData() {
    return JSON.parse($1('[data-react-class="App"]').dataset.reactProps);
}

function _parseOccupancy(travellers) {
    return {
        adultsCount: travellers.adults,
        childrenCount: travellers.kids_ages ? travellers.kids_ages.length : 0,
        childAges: (travellers.kids_ages || []).join(",")
    }
}

function parseHotelType1(pageData, tour) {
    const metaData = JSON.parse(getNodeData('meta[name="hotelData"]', tour, 'content'));
    const searchParams = pageData?.layout_data?.search_params;
    const stars = metaData.stars;

    let option = {
        checkinDt: _parseDate(metaData.offer.startFrom),
        nights: metaData.offer.nights,
        hotelName: metaData.hotelName + (typeof stars === 'number' ? ` ${stars}*` : ''),
        hotel_desc: "",
        href: 'https:' + metaData.url,
        country: searchParams?.destination?.name,
        region: metaData.location.join(', '),
        roomType: "",
        boardType: "",
        price: metaData.offer.cost,
        currency: "RUB",
        city_from: searchParams?.departure_city?.name,
        operator: OPERATOR_NAME,
        thumbnail: metaData.images[0],
        occupancy: _parseOccupancy(searchParams.travellers),
    };

    return option;
}

function parseHotelType2(pageData, tour) {
    const metaData = JSON.parse(getNodeData('meta[name="hotelData"]', tour, 'content'));
    const hotelData = pageData.layout_data.hotel;
    const searchData = pageData.layout_data.search_params;
    const { depart_cities } = pageData.session;

    let option = {
        checkinDt: _parseDate(metaData.startDate),
        nights: metaData.duration,
        hotelName: hotelData.full_name + (typeof hotelData.stars === 'number' ? ` ${hotelData.stars}*` : ''),
        hotel_desc: "",
        href: location.origin + metaData.url,
        country: hotelData.country.name,
        region: hotelData.location_name?.split(', ')?.[0],
        roomType: metaData.roomType,
        boardType: metaData.mealType,
        price: metaData.price,
        currency: "RUB",
        city_from: depart_cities.find(city => city.id === searchData.depart_city_id)?.name || '',
        operator: OPERATOR_NAME + ' / ' + metaData.operatorNames[0],
        thumbnail: hotelData.gallery?.[0]?.full?.url,
        occupancy: _parseOccupancy(searchData),
    };

    return option;
}

async function parseHotelType3(img) {
    const pageData = JSON.parse($1('#root').dataset.qqReactData).page;
    const tour = img.closest('div:not([class])');
    const isFlight = !( getText(tour).match('Рейс не конкретизирован') );
    const priceContainer = img.closest('div:not(.qq, .qq-add-btn)');
    const extraOperator = $1('img', img.closest('div:not(.qq, .qq-add-btn)').parentNode).alt;
    const flight = isFlight ? await getFlight(img) : {};
    const cityFromElem = tour?.firstElementChild?.childNodes?.[1]?.lastElementChild?.firstElementChild?.firstElementChild?.firstElementChild;
    const cityFrom = (cityFromElem && getText(cityFromElem)) || '';

    function parseDate(str) {
        const [year, month, day] = str.split('-');
        return `${day}.${month}.${year}`;
    }

    const flightOption = flight && isFlight && createOptionFromFlight(flight);

    let option = {
        checkinDt: parseDate(pageData.startDate),
        nights: pageData.duration,
        hotelName: pageData.hotel.name + (typeof pageData?.hotel?.stars === 'number' ? ` ${pageData.hotel.stars}*` : ''),
        hotel_desc: "",
        city_from: cityFrom,
        href: location.href,
        country: pageData.country.name,
        region: pageData.region.nameRuCases[0],
        roomType: pageData.roomType.name,
        boardType: pageData.mealType,
        price: getText(priceContainer).replace(/\D+/g, ''),
        currency: "RUB",
        operator: OPERATOR_NAME + ' / ' + extraOperator,
        thumbnail: pageData.hotelPhotos?.[0]?.source,
        occupancy: _parseOccupancy(pageData),
    };

    const res = Object.assign((flightOption || {}), option);

    if(res.product_type) delete res.product_type

    return res;
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const pageData = getPageData();

    if(pageData.page_name === 'search') {
        return parseHotelType1(pageData, tour);
    }else if(pageData.page_name === 'hotel') {
        return parseHotelType2(pageData, tour);
    }else if(pageData.page_name === 'offers_group') {
        if($$('.qq-loading').length > 1) return null;
        return await parseHotelType3(img);
    }
}

function getHotelRowByImage(img) {
    return img.closest('section > .grid > div:not(.relative), #search > div:not([class]) > div:not([class]) > div[class]');
}

async function getFlight(btn) {
    const flightCard = btn.closest('div:not([class])');
    const dataBtn = $$({sel: 'button', searchString: 'Детали тура'}, flightCard)[0];

    if(!dataBtn) return null;

    dataBtn.click();

    await waitForElem('.fixed.left-0.top-0.w-full.h-full');

    const modalSelector = '[aria-label="Закрыть по области"]';

    $$(modalSelector + `, ${modalSelector} + div`).forEach(modal => modal.style.setProperty('display', 'none'));
    document.body.style.removeProperty('overflow');

    inlineScript();

    const flightData = await waitForEvent('QQ_FLIGHT_GETTED');
    const closeBtn = $1('.fixed.left-0.top-0.w-full.h-full button[aria-label="Закрыть"]');

    const sectors = [];

    for (const sector of Object.values(flightData)) {
        const tempSector = await parseSectors(sector);
        sectors.push(tempSector)
    }

    if(closeBtn) closeBtn.click();

    return {sectors: sectors.flatMap(s => s)};
}

async function parseSectors(sector) {
    let segments = [];
    for (const segment of sector) {
        const tempSegment = await parseSegments(segment);
        segments.push(tempSegment);
    }
    return {segments: segments.flatMap(s => s)};
}

async function parseSegments(segment) {
    const { flightNumber, duration, departureTime, arrivalTime, departureCity, arrivalCity } = segment;
    const depAirport = _parseAirportName(segment.departureAirport);
    const arrAirport = _parseAirportName(segment.arrivalAirport);
    const segments = [new FlightSegment({
        airline: segment.aircompanyName,
        flightNumber,
        travelTime: clearFlightTime(duration.replace(/ч|д/, ':').replace(/[^0-9:]/gi, '')),
        departureDate: _parseDayMonth(segment.departureDate),
        departureTime,
        departureCity,
        departureAirport: depAirport[0],
        departureAirportID: depAirport[1],
        arrivalDate: _parseDayMonth(segment.arrivalDate),
        arrivalTime,
        arrivalCity,
        arrivalAirport: arrAirport[0],
        arrivalAirportID: arrAirport[1],
        serviceClass: segment.serviceClass.name
    })];

    return segments;
}

function _parseDayMonth(date) {
    const [day, month] = date.split(/\s/);
    return appendYear(day, monthNameToNumber(month));
}

function _parseAirportName(airport) {
    const arr = airport.match(/(.+)\s.\s([A-Z]{3})/);
    return [arr[1], arr[2]];
}

function waitForEvent(eventType, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const onEvent = (event) => {
            window.removeEventListener(eventType, onEvent);
            clearTimeout(timeoutId);
            resolve(event.detail);
        };

        window.addEventListener(eventType, onEvent);

        let timeoutId;
        if (timeout) {
            timeoutId = setTimeout(() => {
                window.removeEventListener(eventType, onEvent);
                resolve(null);
            }, timeout);
        }
    });
}

function waitForElem(selector, options = {}) {
    const { timeout = 150, mode = 'appear', contentMatch = false, styleMatch = {} } = options;
    return new Promise(resolve => {
        const observer = new MutationObserver(check);
        check();
        observer.observe(document.body, OBSERVER_OPTIONS);
        function check() {
            const elemList = $$(selector);
            const exist = elemList.length > 0;
            const matchTextArr = contentMatch && elemList.filter(item => getText(item).match(contentMatch));
            const matchText = !contentMatch || matchTextArr.length > 0;
            const matchStylesArr = Object.keys(styleMatch).length > 0 && matchTextArr.filter(compareStyles)
            const matchStyles = Object.keys(styleMatch).length === 0 || matchStylesArr.length > 0;
    
            if (matchText && matchStyles && mode === 'appear') resolveElem(selector);
            else if (!exist && mode === 'disappear') resolveElem(true);
        }
        function compareStyles(item) {
            for(let style in styleMatch) {
                if(getComputedStyle(item)[style] !== styleMatch[style]) return false;
            }
            return true;
        }
        function resolveElem(rtrn) {
            if(observer) observer.disconnect();
            return resolve(rtrn);
        }
        setTimeout(() => {resolveElem(null)}, timeout);
    });
}