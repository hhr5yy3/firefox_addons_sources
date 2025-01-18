window.OPERATOR_NAME = "Sanatory.ru";
window.showTopHotelsRating = false;
loadInlineScript();
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    if(!$1('.sticky-outer-wrapper')) return null;
    const data = getRoomSearchData();
    if(data.checkinDt === null || data.checkoutDt === null || data.occupancy === null) return null;
    return data;
}

function getSearchButton() {
    const input = $1('input:not(.sticky-outer-wrapper input)');
    const container = input.parentNode.parentNode.parentNode.parentNode;
    return $1('button', container)
}

function addBtns(div) {
    if ( !div.querySelector(".qq") ) {
        const btns = qqBtns({align: "qq-horizontal"});
        
        btns.style.setProperty('width', '100%');
        btns.style.setProperty('justify-content', 'flex-end');

        div.append(btns);
    }
}

function injectData() {
    let flag = false;
    getRoomSelector() && $$(getRoomSelector()).forEach(div => {
        if(Array.from(div.childNodes).some(e => e.tagName === 'svg')) return;
        addBtns(div)
    })

    getSubmitSelector() && $$(getSubmitSelector()).forEach(div => {
        if ( div.querySelector(".qq") ) return;

        const container = createQQContainer();
        
        container.style.setProperty('width', '100%');
        container.style.setProperty('display', 'flex');
        container.style.setProperty('flex-direction', 'column');
        container.style.setProperty('align-items', 'center');
        container.style.setProperty('padding-top', 'inherit');

        div.append(container);
    })

    $$(".ReactVirtualized__Grid__innerScrollContainer > div > div > div > div > div:nth-child(2)").forEach(div => {
        if ( !div.querySelector(".qq") ) flag = true;
        addBtns(div)
    });

    if(flag) loadInlineScript();
}

function loadInlineScript() {
    window.qscript = document.createElement("script");
    window.qscript.src = chrome.runtime.getURL('data/operators/sanatory/inline_script.js');
    document.head.appendChild(window.qscript);
    window.qscript.remove();
}

function _parseInputDate(s) {
    if(!s) return {checkinDt: null, checkoutDt: null};
    
    const [start, end] = s.split(/\s.\s/g).map(date => date.split(/\s/g));

    return {
        checkinDt: appendYear(start[0], monthNameToNumber(start[1])),
        checkoutDt: appendYear(end[0], monthNameToNumber(end[1]))
    }
}

function getSearchData() {
    const [_, datesElem, occupancyElem] = $$('[aria-current="page"] ~ div > div > div input');
    const { checkinDt, checkoutDt } = _parseInputDate(datesElem.value);
    const occupancy = getOccupancy(occupancyElem);

    return { checkinDt, checkoutDt, occupancy }
}

function getOccupancy(elem) {
    const isOpen = Boolean($1('div:nth-child(2)', elem.parentNode.parentNode))
    if(elem && !isOpen) elem.click();

    const dataElem = $1('div:nth-child(2)', elem.parentNode.parentNode);
    if(!dataElem) return null;
    const [adults, children, ages] = dataElem.childNodes;
    const adultsNum = _findUniqueElement($$('.items > div', adults));
    const childAges = ages ? $$('input', ages).map(e => e.value) : null;

    if(!isOpen) elem.click();

    return {
        adultsCount: Number(getText(adultsNum)),
        childrenCount: childAges ? childAges.length : 0,
        childAges: childAges && childAges.join(',')
    };
}

function getPrice(container) {
    const priceElem = container.firstElementChild.lastElementChild.firstElementChild.firstElementChild;
    const priceText = getText(priceElem);

    return {
        currency: mapCurrencyUtil(priceText.slice(-1)),
        price: priceText.replace(/\D+/g, '')
    }
}

function parseLeftPart(leftPart) {
    const data = leftPart.childNodes;
    let stars, name, main;

    if(data.length === 5) {
        [starsContainer, name, rateAndRegion, main] = leftPart.childNodes;
        stars = $$('svg', starsContainer).length;
    }else if(data.length === 4) {
        [name, rateAndRegion, main] = leftPart.childNodes;
        stars = 0;
    }

    return {
        hotelName: getText(name) + (stars ? ` ${stars}*` : ''),
        thumbnail: getNodeData('img', main, 'src')
    }
}

function getOptionFromCard(tour) {
    const [leftPart, rightPart] = tour.lastElementChild.firstElementChild.firstElementChild.childNodes;
    const { occupancy, checkinDt, checkoutDt } = getSearchData();
    const { price, currency } = getPrice(rightPart);
    const { hotelName, thumbnail } = parseLeftPart(leftPart);
    const [region, country] = getNodeData('meta[name="address"]', tour, 'content').split(', ');
    const specializationList = tour.querySelector('meta[name="specialization"]').content.split('::');

    let option = {
        checkinDt,
        nights: getDistance(checkinDt, checkoutDt),
        hotelName,
        hotel_desc: "<b>Профили лечения:</b><br><ul>" + specializationList.map(i => `<li>${i}</li>`).join('') + "</ul>",
        href: "",
        country,
        region,
        roomType: "",
        boardType: "",
        price,
        currency,
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail,
        occupancy,
    };

    return option;
}

function getOptionFromRoom(tour, isRoomCard) {
    let data;

    if(isRoomCard) {
        const { roomType, price, currency } = getRoomData(tour);
        const { checkinDt, checkoutDt, occupancy } = SEARCH_CRITERIA;
        const { boardType } = getDataFromStickyOuterWrapper();

        data = { roomType, price, currency, checkinDt, checkoutDt, occupancy, boardType }
    }else {
        const { boardType, roomType, checkinDt, checkoutDt, occupancy } = getDataFromStickyOuterWrapper();
        const { price, currency } = getSubmitData(tour);

        data = { roomType, price, currency, checkinDt, checkoutDt, occupancy, boardType }
    }
    const { price, currency, roomType, boardType, occupancy, checkinDt, checkoutDt } = data;
    const { thumbnail, hotelName, region, country } = getHotelDataFromThumbnail();
    const specializationList = JSON.parse(document.querySelector('meta[name="specialization"]').content).specialization;

    let option = {
        checkinDt,
        nights: getDistance(checkinDt, checkoutDt),
        hotelName,
        hotel_desc: "<b>Профили лечения:</b><br><ul>" + specializationList.map(i => `<li>${i}</li>`).join('') + "</ul>",
        href: location.href,
        country,
        region,
        roomType: roomType.replace('Скрыть недоступные тарифы', ''),
        boardType,
        price,
        currency,
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail,
        occupancy,
    };

    return option;
}

function getRoomData(tour) {
    const priceText = getText(tour).match(/Цена\sтуристамот\s(.+)Комиссия/)[1];
    const roomTypeElem = tour.closest(getRoomSelector().match(/(.+)\s>\sdiv:nth/)[1]).firstElementChild;

    return { 
        roomType: getText(roomTypeElem),
        currency: mapCurrencyUtil(priceText.slice(-1)),
        price: priceText.replace(/\D+/g, '')
    }
}

function getRoomSearchData() {
    const [dateInput, occupancyInput] = $$('input:not(.sticky-outer-wrapper input');
    const { checkinDt, checkoutDt } = _parseInputDate(dateInput.value);
    const occupancy = getOccupancy(occupancyInput);

    return { checkinDt, checkoutDt, occupancy }
}

function getHotelDataFromThumbnail() {
    const container = $1('.sticky-outer-wrapper').parentNode;
    const thumbnailElem = container.firstElementChild.firstElementChild;
    const [hotelName, address] = thumbnailElem.lastElementChild.childNodes;
    const countryAndRegionArr = getText(address).split(', ');

    return {
        thumbnail: getNodeData('img', thumbnailElem, 'src'),
        hotelName: getText(hotelName),
        region: countryAndRegionArr.slice(1).join(', '),
        country: countryAndRegionArr[0]
    }
}

function getDataFromStickyOuterWrapper() {
    const [upperBlock, lowerBlock] = $1('.sticky-inner-wrapper > div').childNodes;

    return Object.assign({}, parseUpperWrapper(upperBlock), parseLowerWrapper(lowerBlock))
}

function parseUpperWrapper(div) {
    const [roomTypeElem, mainElem] = div.firstElementChild.childNodes;
    const textData = Array.from(mainElem.firstElementChild.childNodes).map(e => getText(e));

    return {
        roomType: getText(roomTypeElem.firstElementChild.firstElementChild),
        boardType: textData.find(t => t.match('Питание'))?.match(/Питание(.+)/)?.[1] || 0
    }
}

function parseLowerWrapper(div) {
    const text = getText(div)
    const dates = text.match(/\d{2}.\d{2}.\d{4}\s.\s\d{2}.\d{2}.\d{4}/)[0].split(' - ');
    const occupancy = text.match(/(\d+)\sгост/)[1];

    return {
        checkinDt: dates[0],
        checkoutDt: dates[1],
        occupancy: {
            adultsCount: Number(occupancy),
            childrenCount: 0,
            childAges: null
        }
    }
}

function getSubmitData(tour) {
    const priceText = getText(tour).match(/Цена\sтуристам(.+)Комиссия/)[1];

    return { 
        currency: mapCurrencyUtil(priceText.slice(-1)),
        price: priceText.replace(/\D+/g, '')
    }
}

function createOption(img) {
    const tour = getHotelRowByImage(img);

    if(tour.closest('.ReactVirtualized__Grid__innerScrollContainer')) {
        return getOptionFromCard(tour);
    }else if(tour.closest(getRoomSelector())) {
        return getOptionFromRoom(tour, true);
    }else if(tour.closest(getSubmitSelector())) {
        return getOptionFromRoom(tour, false);
    }
    
}

async function createQuickBookingOption(img) { 
    loadInlineScript();
    const passengerData = await waitForEvent('_QQ_PASSENGER_DATA');
    const { net_price, gross_price } = passengerData.reduce(
        (sums, { net_price, gross_price }) => ({
          net_price: sums.net_price + net_price,
          gross_price: sums.gross_price + gross_price
        }),
        { net_price: 0, gross_price: 0 }
    );

    const prices = new Prices({
        nationalCurrency: 'RUB',
        nationalGrossPrice: gross_price,
        nationalNettPrice: net_price
    });

    const services = {
        nettPrice: net_price,
        nettPriceCurrency: 'RUB',
        commission: gross_price - net_price,
        commissionPercent: parseFloat(((gross_price - net_price) / gross_price * 100).toFixed(2)),
        prices
    };
    
    return services;
}

async function parsePassengers() {
    loadInlineScript();
    const passengerData = await waitForEvent('_QQ_PASSENGER_DATA');
    const passengerList = passengerData.map(i => {
        return new Passenger({
            firstName: i.traveller.first_name,
            middleName: i.traveller.middle_name,
            lastName: i.traveller.last_name,
            type: i.traveller.age_group,
            sex: i.traveller.gender === 'male' ? '1' : '2',
            birthday: _parseBirthDay(i.traveller.date_of_birth)
        })
    });
    console.log(passengerList);
    return passengerList;
}

function _parseBirthDay(str) {
    const [year, month, day] = str.split('-');
    return `${day}.${month}.${year}`;
}

function getHotelRowByImage(img) {
    const room = getRoomSelector();
    const submit = getSubmitSelector();
    
    return img.closest('.ReactVirtualized__Grid__innerScrollContainer > div' + _appendSelector(room) + _appendSelector(submit));
}

function _appendSelector(sel) {
    return sel ? ', ' + sel : '';
}

let _qqRoomsSelector = '';
function getRoomSelector() {
    if(_qqRoomsSelector) return _qqRoomsSelector;
    if($1('.sticky-outer-wrapper')) {
        const roomsContainer = $1('.sticky-outer-wrapper').parentNode.firstElementChild.lastElementChild;
        _qqRoomsSelector = Array.from(roomsContainer.classList)
            .map(className => `.${className}`)
            .join('');
        _qqRoomsSelector += ' > div > div:nth-child(2) > div'
    }
    return _qqRoomsSelector;
}

let _qqSubmitSelector = '';
function getSubmitSelector() {
    if(_qqSubmitSelector) return _qqSubmitSelector;
    if($1('.sticky-outer-wrapper button[type="submit"]')) {
        const roomsContainer = $1('.sticky-outer-wrapper button[type="submit"]').parentNode;
        _qqSubmitSelector = Array.from(roomsContainer.classList)
            .map(className => `.${className}`)
            .join('');
    }
    return _qqSubmitSelector;
}

function _findUniqueElement(elements) {
    const classMap = {};
  
    for (const el of elements) {
        const key = el.className; 
        classMap[key] = (classMap[key] || 0) + 1;
    }
  
    return elements.find(el => classMap[el.className] === 1) || null;
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