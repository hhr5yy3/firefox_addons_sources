window.OPERATOR_NAME = "Otpusk.pro";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return {
        occupancy: getOccupancy(location.pathname)
    };
}

function getSearchButton() {
    return $1('.nemo-flights-form__searchButton')
}

function injectData() {
    $$('.nemo-flights-results__flightsListGroup__buyButtonCnt__inner').forEach(div => {
        if (div.querySelector(".qq") || !getPriceAndCurr(getHotelRowByImage(div)).price.match(/\d/)) return;

        const btns = qqBtns({align: "qq-horizontal"});
        
        btns.style.setProperty('width', '100%');
        btns.style.setProperty('justify-content', 'center');

        btns.classList.add('qq-one-btn');

        div.append(btns);
    });

    $$('.nemo-checkout-order-details__priceBlock').forEach(div => {
        if (div.parentNode.querySelector(".qq") || !getPriceAndCurr(getHotelRowByImage(div.parentNode)).price.match(/\d/)) return;

        const btns = qqBtns({align: "qq-horizontal"});
        
        btns.style.setProperty('width', '100%');
        btns.style.setProperty('justify-content', 'center');

        btns.classList.add('qq-not-one-btn-type-2');

        div.parentNode.append(btns);
    });

    $$('.nemo-flights-results__flightsGroup__footer__buyButtonContainer').forEach(div => {
        if (div.parentNode.querySelector(".qq") || (getHotelRowByImage(div) && !getPriceAndCurr(getHotelRowByImage(div))?.price.match(/\d/))) return;

        const btns = qqBtns({align: "qq-horizontal"});
        
        btns.style.setProperty('width', '100%');
        btns.style.setProperty('padding', '6px');
        btns.style.setProperty('justify-content', 'flex-end');

        btns.classList.add('qq-not-one-btn');

        div.before(btns);
    });

    $$('.nemo-flights-results__couplingTable__groups__buyGroup__item').forEach(div => {
        if(div.querySelector(".qq") || !getPriceAndCurr(getHotelRowByImage(div.lastElementChild )).price.match(/\d/)) return;
        const btns = qqBtns({align: "qq-vertical"});
    
        div.style.setProperty('display', 'flex');
        div.style.setProperty('flex-direction', 'row');
        btns.style.setProperty('margin-left', '6px');
        btns.style.setProperty('top', '-4px');
        if(div.className.match('nemo-flights-results__couplingTable__groups__buyGroup__item_inactive')) {
            btns.style.setProperty('display', 'none');
        }
        div.closest('.nemo-flights-results__couplingTable').addEventListener('click', hideUnavailibleCouples)

        btns.classList.add('qq-not-one-btn');

        div.append(btns);
    });
}

function hideUnavailibleCouples() {
    $$('.nemo-flights-results__couplingTable__groups__buyGroup__item .qq-vertical').forEach(btn => {
        if(btn.closest('.nemo-flights-results__couplingTable__groups__buyGroup__item_inactive')) {
            btn.style.setProperty('display', 'none');
        }else {
            btn.style.setProperty('display', 'flex');
        }
    })
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const {price, currency} = getPriceAndCurr(tour);
    let flight;

    if($1('.qq-vertical', tour) && !$1('.nemo-flights-results__flightsListGroup__buyButtonCnt > .qq-horizontal', tour)) {
        const idx = getElementIndex(tour);
        flight = await getFlight1(tour.closest('.nemo-flights-results__couplingTable'), idx);
    } else if(img.closest('.qq-one-btn')) {
        flight = await getFlight(tour);
    } else if(img.closest('.qq-not-one-btn, .qq-not-one-btn-type-2')) {
        flight = await getFlight1(tour);
    }


    let option = createOptionFromFlight(flight);

    return Object.assign({
        occupancy: SEARCH_CRITERIA.occupancy,
        price,
        currency,
        operator: OPERATOR_NAME
    }, option);
}

function getHotelRowByImage(img) {
    return img.closest('.nemo-flights-results__groupList__item, .nemo-flights-results__showcase__item, .nemo-flights-results__flightsGroup_carriersMismatch, .nemo-flights-results__flightsGroup_bestCompanies, .nemo-checkout-order-details, .nemo-flights-results__couplingTable__groups__buyGroup__item');
}

function getOccupancy(url) {
    const match = url.match(/ADT(\d+)?|CLD(\d+)?|INF(\d+)?|INS(\d+)?/g) || [];
    const
      adults = Number(match.find(m => m.startsWith('ADT'))?.slice(3) || 0),
      children = Number(match.find(m => m.startsWith('CLD'))?.slice(3) || 0),
      infant = Number(match.find(m => m.startsWith('INF'))?.slice(3) || 0),
      infantSeat = Number(match.find(m => m.startsWith('INS'))?.slice(3) || 0)
    
    return {
        adultsCount: adults,
        childrenCount: children + infant + infantSeat,
        childAges: null
    };
  }

function getPriceAndCurr(tour) {
    const priceElem = $1('money', tour);
    return priceElem && {
        price: priceElem.getAttribute('amount'),
        currency: priceElem.getAttribute('currency')
    }
}

function parseTravelataDate(date) {
    const [day, month] = date.slice(0, -4).split(' ')
    return appendYear(day, monthNameToNumber(month));
}

async function getFlight(tour) {
    try {
        const openBtn = $1('.nemo-flights-results__flightsListGroup__fullDetails', tour);

        if(!openBtn) return null;

        openBtn.click();

        const modal = $$('.ui-dialog__wrapper').find(item => getComputedStyle(item).display !== 'none');
        const closeBtn = $1('.ui-dialog-titlebar-close', modal);

        let sectors = [];
        for (const sector of $$('.nemo-flights-flightInfo__leg', modal)) {
            const tempSector = await parseSectors(sector);
            sectors.push(tempSector)
        }

        closeBtn.click();

        return {sectors: sectors.flatMap(s => s)};
    } catch (e) {
        console.log(e);
        return null;
    }
}

async function openAndCloseDetails(getData) {
    await waitForElem('.ui-dialog__wrapper', {
        contentMatch: /Информация о перелете|Детали перелета/,
        styleMatch: { display: 'block' }
    });

    const modals = $$('.ui-dialog__wrapper').filter(item => getComputedStyle(item).display !== 'none' && getText(item).match(/Информация о перелете|Детали перелета/));
    const modal = modals.pop();
    const closeBtn = $1('.nemo-ui-button.ui-dialog-titlebar-close, .ui-dialog-titlebar-close', modal);
    const res = $$('.nemo-flights-flightInfo__leg, .new-flightRoute__leg', modal).map(leg => (leg.cloneNode(true)));

    closeBtn.click();

    if(getData) return res;
}

async function createFlightLegsELem(btnList, idx) {
    const pseudoContainer = document.createElement('div');
    
    for (const button of btnList) {
        button.click(); 

        const legList = await openAndCloseDetails(true);

        legList.forEach(leg => pseudoContainer.append(leg));

        if(typeof idx === 'number') await openAndCloseDetails();
    }

    return pseudoContainer; 
}

async function getFlight1(tour, idx) {
    try {
        const detailsButtonSelector = 
            '.nemo-flights-results__flightsGroup__leg__selector__footer__detailsLink > .nemo-ui-pseudoLink' + ', ' +
            '.nemo-checkout-order-details__flight__segmentGroup__moreDetailsButton';

        let tableGroups = $$('.nemo-flights-results__couplingTable__groups__group .nemo-flights-results__couplingTable__groups__group__item__button_selected', tour)
        if(tableGroups.length) {
            const selectedGroups = tableGroups.slice(0, -1);
            selectedGroups.push(Array.from($$('.nemo-flights-results__couplingTable__groups__group', tour).slice(-1)[0].children)[idx + 1])
            tableGroups = selectedGroups.map(button => $1('.nemo-ui-pseudoLink', button));
        }

        const buttonList = [$$(detailsButtonSelector, tour), tableGroups].find(i => i.length > 0);

        const pseudoContainer = await createFlightLegsELem(buttonList, idx);

        let sectors = [];
        for (const sector of $$('.nemo-flights-flightInfo__leg, .new-flightRoute__leg', pseudoContainer)) {
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
    for (const segment of $$('.nemo-flights-flightInfo__leg__segment', sector)) {
        const tempSegment = await parseSegments(segment);
        segments.push(tempSegment);
    }
    for (const segment of $$('.new-flightRoute__leg__segment', sector)) {
        const tempSegment = await parseSegmentsType2(segment);
        segments.push(tempSegment);
    }
    return {segments: segments.flatMap(s => s)};
}

async function parseSegments(segment) {
    const placeRegex = /^(.+?)\s\((.+?)\)$/;

    const [departure, arrival, addition] = Array.from(segment.children);
    const additionArr = Array.from(addition.children).map(i => getText($1('div:nth-child(2)', i)));
    let airline,
        travelTime,
        flightNumber,
        serviceClass,
        plane

    if(additionArr.length === 5) {
        [airline, travelTime, flightNumber, serviceClass, plane] = additionArr;
    }else if(additionArr.length === 4) {
        [airline, flightNumber, serviceClass, plane] = additionArr;
        travelTime = getNodeData('.nemo-flights-flightInfo__leg__footer__item_timeEnRoute > span:nth-child(2)', segment.closest('.nemo-flights-flightInfo__leg'));
    }

    const [_1, departureCity, departureCountry] = getNodeData('.nemo-flights-flightInfo__leg__segment__city', departure).match(placeRegex);
    const [_2, arrivalCity, arrivalCountry] = getNodeData('.nemo-flights-flightInfo__leg__segment__city', arrival).match(placeRegex);

    const segments = [new FlightSegment({
        airline,
        flightNumber,
        plane,
        travelTime: clearFlightTime(travelTime.replace(/ч|д/, ':').replace(/[^0-9:]/gi, '')),
        departureDate: parseTravelataDate(getNodeData('.nemo-flights-flightInfo__leg__segment__date', departure)),
        departureTime: getNodeData('.nemo-flights-flightInfo__leg__segment__time', departure),
        departureCity,
        departureCountry,
        departureAirport: getNodeData('.nemo-flights-flightInfo__leg__segment__airport__value', departure),
        departureAirportID: '',
        arrivalDate: parseTravelataDate(getNodeData('.nemo-flights-flightInfo__leg__segment__date', arrival)),
        arrivalTime: getNodeData('.nemo-flights-flightInfo__leg__segment__time', arrival),
        arrivalCity,
        arrivalCountry,
        arrivalAirport: getNodeData('.nemo-flights-flightInfo__leg__segment__airport__value', arrival),
        arrivalAirportID: '',
        serviceClass
    })]
    return segments;
}

async function parseSegmentsType2(segment) {
    const placeRegex = /^(.+?)\s\((.+?)\)$/;

    const [departure, arrival, main] = Array.from(segment.children);
    const addition = $1('.new-flightRoute__leg__segment__addInfo', segment)
    const [
        airline,
        flightNumber,
        plane
    ] = Array.from(main.children).map(i => getText($1('span:nth-child(2)', i)));
    const travelTime = getNodeData('.new-flightRoute__leg__segment__addInfo__item_timeEnRoute > span:nth-child(2)', addition);

    const [_1, departureCity, departureCountry] = getNodeData('.new-flightRoute__leg__segment__departure__city', departure).match(placeRegex);
    const [_2, arrivalCity, arrivalCountry] = getNodeData('.new-flightRoute__leg__segment__arrival__city', arrival).match(placeRegex);

    const segments = [new FlightSegment({
        airline,
        flightNumber,
        plane,
        travelTime: clearFlightTime(travelTime.replace(/ч|д/, ':').replace(/[^0-9:]/gi, '')),
        departureDate: parseTravelataDate(getNodeData('.new-flightRoute__leg__segment__departure__date', departure)),
        departureTime: getNodeData('.new-flightRoute__leg__segment__departure__time', departure),
        departureCity,
        departureCountry,
        departureAirport: '',
        departureAirportID:  $1('.new-flightRoute__leg__segment__departure__city', departure).getAttribute('href').match(/iata=([A-Z]{3})/)?.[1],
        arrivalDate: parseTravelataDate(getNodeData('.new-flightRoute__leg__segment__arrival__date', arrival)),
        arrivalTime: getNodeData('.new-flightRoute__leg__segment__arrival__time', arrival),
        arrivalCity,
        arrivalCountry,
        arrivalAirport: '',
        arrivalAirportID: $1('.new-flightRoute__leg__segment__arrival__city', arrival).getAttribute('href').match(/iata=([A-Z]{3})/)?.[1],
        serviceClass: getNodeData('.new-flightRoute__leg__segment__addInfo__item_class > span:nth-child(2)', addition),
        baggage: getNodeData('.new-flightRoute__leg__segment__addInfo__item_baggage > span:nth-child(2)', addition)
    })]
    return segments;
}

const OBSERVER_OPTIONS = {
    childList: true,
    subtree: true
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

function getElementIndex(element) {
    if (!element || !element.parentNode) return -1;
    const siblings = Array.from(element.parentNode.children);
    return siblings.indexOf(element);
}