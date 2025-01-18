var OPERATOR_NAME = "Biblioglobus";
var showTopHotelsRating = true;
var OPERATOR_CURRENCY = "biblioglobus";
var DEFAULT_CURRENCY = "RUB";
window.injectionSelector = 'body';
function initializeSearchCriteria() {
    try {
        const x = getParameterByName('x');
        const prx = getParameterByName('prx');
        const concated = (prx + x).replace(/\D+/g, '');
        const key = crc32(concated);
        const option = window.localStorage.getItem(key) || sessionStorage.getItem(key);
        if ( option ) {
           sessionStorage.setItem(key, option)
           localStorage.removeItem(key);
           return JSON.parse(option);
        }

        return {};
    } catch(e) {

        return {};
    }
}

function getSearchButton() {
    return null
}

function injectData() {
    const priceCells = findPriceCells();
    const headTable = document.querySelector('table.head');
    let currencyElement = null;
    if ( priceCells.find(price => getText(price).match(/USD|EUR/) && getText(price).match(/RUR|RUB|р\./) ) ) {
        currencyElement = injectCurrencySelectionUtil("body", OPERATOR_CURRENCY, "color:black;", "", "display:inline-flex;") ||
            document.getElementById("#qq-currency");
    }
     priceCells.forEach(div => {
        if ( !div.querySelector(".qq") ) {
            let buttons = createQQContainer('');
            buttons.style.margin = '10px';
            div.append(buttons);
            currencyElement ? headTable.after(currencyElement) : null;
        }
    });
}

function createOption(img) {
    try {
        let accommodation = getHotelRowByImage(img);
        let totalInfoArray = querySelectorAll(accommodation, ".total-info").map(info => splitString(getText(info)).map(el => el.trim()));
        let tdsArray = querySelectorAll(accommodation, ".full-info-z").map(info => querySelectorAll(info, "tr:nth-child(2)>td"));
        let dates = [tdsArray[0][1], lastElement(tdsArray)[1]].map(date => getText(date).match(/\d{2}\.\d{2}\.\d{4}/g) ||
            $$('input', date).map(i => i.value).join('-').match(/\d{2}\.\d{2}\.\d{4}/g));
        let priceCell = img.closest('td');
        let rublePrice = getText(priceCell).match(/\d+\.*\d*\s*р\.|\d+\.*\d*\s*RUR/);
        let usdEurPrice = getText(priceCell).match(/\d+\.*\d*\s*EUR|\d+\.*\d*\s*USD/);
        let priceText = isPrefferedDefaultCurrencyUtil() ? rublePrice || usdEurPrice : usdEurPrice || rublePrice;
        let flight = getFlight();

        window.SEARCH_CRITERIA = window.SEARCH_CRITERIA || {};
        let option = {
            checkinDt: dates[0][0],
            nights: getDistance(dayMonthYearToDate(dates[0][0]), dayMonthYearToDate(dates[1][1])).toString(),
            href: window.location.href,
            country: getNodeProperty(($first('input[name="country"]')||[]).parentNode) || SEARCH_CRITERIA.country,
            region: reduceTextFromTotalInfoArray(totalInfoArray, 1),
            roomType: SEARCH_CRITERIA.roomType || reduceTdFromTdsArray(tdsArray, 3),
            boardType: SEARCH_CRITERIA.boardType || reduceTdFromTdsArray(tdsArray, 4),
            price: extractIntFromStr(priceText[0]),
            currency: mapCurrency(priceText[0].replace(/\d+|\.|\s+/g, "")),
            city_from: flight ? (flight.sectors[0].segments[0].departureAirport || flight.sectors[0].segments[0].departureAirportID) : SEARCH_CRITERIA.city_from,
            operator: OPERATOR_NAME,
            thumbnail: SEARCH_CRITERIA.thumbnail,
            occupancy: SEARCH_CRITERIA.occupancy,
            flight: flight
        };
        const hotels = totalInfoArray.map((t, i) => parseBgHotels(t,i, option));
        option.hotels = hotels;
        option.hotelName = hotels.length > 1 ? hotels.map(hotel => `${hotel.hotelName} (${hotel.nights} ноч.)`).join(' / ') : hotels[0].hotelName
        return option;
    } catch(e) {
        console.log(e)
        return {
            flight: getFlight()
        };
    }
}

function parseBgHotels(totalInfoArray, index, option) {
    const [dateStart, dateEnd] = totalInfoArray[0].split('-');
    if ( index === 0 ) {
        const [roomType, accommodation] = option.roomType.split(/\s*\/\s*/);
        return {
            dateStart,
            dateEnd,
            nights: getDistance(dateStart, dateEnd),
            hotelName: totalInfoArray.find(s => s.match('\\*')) || totalInfoArray[2],
            region: option.region,
            roomType,
            accommodation,
            boardType: option.boardType,
            country: option.country
        }
    }
    return {
        dateStart,
        dateEnd,
        nights: getDistance(dateStart, dateEnd),
        hotelName: totalInfoArray.find(s => s.match('\\*')) || totalInfoArray[2],
        region: totalInfoArray[1],
        roomType: totalInfoArray[3],
        country: getNodeProperty(($first('input[name="country"]') || []).parentNode)
    }
}

function splitString(str) {
    let result = [];
    let currentChunk = '';
    let bracketCount = 0;

    for ( let i = 0; i < str.length; i++ ) {
        if ( str[i] === '(' ) {
            bracketCount++;
        } else if ( str[i] === ')' ) {
            bracketCount--;
        }

        if ( str[i] === '/' && bracketCount === 0 ) {
            result.push(currentChunk.trim());
            currentChunk = '';
        } else {
            currentChunk += str[i];
        }
    }

    if ( currentChunk.length > 0 ) {
        result.push(currentChunk.trim());
    }

    return result;
}

function findPriceCells() {
    let priceIdxs = querySelectorAll(document, "table.head .linehead .line")
                     .map((line, index) => getText(line).match(/Стоимость тура|К оплате/i) ? index : null )
                    .filter(line => line !== null);
    return querySelectorAll(document, "table.head .line > .line").filter( (cell, index) => priceIdxs.includes(index) );
}

function getFlight() {
    try {
        let transport = document.querySelector(".form-block.transport .block-info-z");
        let flightsTrs = querySelectorAll(transport, ".full-info-z tr");
        let totalInfo = transport.querySelector(".total-info");
        let dates = querySelectorAll(totalInfo, ".date");
        let datesTextArray = dates.map(node => getText(node));
        let totalInfoDivs = dates.map(date => date.parentNode);
        let dateRegExp = new RegExp(`${datesTextArray.join("|")}`);
        let sectorsArray = extractSectorsTr(flightsTrs, dateRegExp);
        let segments = sectorsArray.map((sector, index) => extractSectors(sector, totalInfoDivs[index]));
        return { sectors:  parseSectorsFromSegments(segments) }
    } catch(e) {
        console.log(e);
        return null;
    }
}

// Так как строки перелета туда/обратно выводятся в различных порядках в зависимости от типа тура,
// а также каждому пассажиру соответствует своя строка перелета, был вынужден написать данную функцию по поиску уникальных строк перелета
// Принцип работы прост: берем даты из шапки перелета, и ищем по ним нужные TR, так как пассажиров много, получается много
// (почти)идентичных строк(реплейсы решают проблему текстовой неидентичности, там информация о порядковом номере пассажира).
// По текстовому содержанию и отсекаем дубликаты, а так как текст строк нам больше не нужен, в конце возвращаем массив только с нодами TR
function extractSectorsTr(flightsTrs, dateRegExp) {
    return deduplicateCollectionByField(flightsTrs
        .filter(tr => !!querySelectorAll(tr, "td")
            .find(td => getText(td).match(dateRegExp)))
        .map(tr => {
            return {text: getText(tr.querySelector('td'), "innerText").replace(/\s+/g, " ").replace(/surname.*/gi, "").trim(), node: tr}
        }), "text").map( obj => obj.node );
}

function extractSectors(sector, infoDiv) {
    let tds = querySelectorAll(sector, "td");
    let infoText = [...infoDiv.childNodes].flatMap(t => getText(t).split(/\/|\n/)).filter(Boolean)
    let airports = infoText[1].split("—");
    let dates = getText(tds[0]).match(/\d{2}\.\d{2}\.\d{4}|\d{2}:\d{2}/g);
    let ids = getText(tds[2]).split("-");
    return new FlightSegment({
        flightNumber: getText(tds[1]).split("/")[0],
        departureDate: dates[0],
        departureTime: dates[1],
        departureAirport: airports[0].replace(/\(.+/, ""),
        departureAirportID: ids[0],
        serviceClass: infoText[2],
        arrivalDate: dates[2],
        arrivalTime: dates[3],
        arrivalAirport: airports[1].replace(/\(.+/, ""),
        arrivalAirportID: ids[1]
    })
}

function mapCurrency(text) {
    switch (text.toUpperCase().slice(0,3)) {
        case "Р" :
            return "RUB";
        case "RUR" :
            return "RUB";
        case "USD" :
            return "USD";
        case "EUR":
            return "EUR";
    }
    return text;
}

function parseSectorsFromSegments(segments) {
    let realSectors = [];
    let tempSectors = [];
    for ( let i = 0; i < segments.length; i++ ) {
        if ( i === segments.length - 1 ) {
            tempSectors.push(segments[i]);
            realSectors.push(tempSectors);
            break;
        }
        let currentSegment = segments[i];
        let nextSegment = segments[i + 1];

        if ( !currentSegment.arrivalDate ) {
            tempSectors.push(currentSegment);
            realSectors.push(tempSectors);
            tempSectors = [];
            continue;
        }

        let currentSegmentDate = new Date(dayMonthYearToDate(currentSegment.arrivalDate).setHours(parseInt(currentSegment.arrivalTime)));
        let nextSegmentDate = new Date(dayMonthYearToDate(nextSegment.departureDate).setHours(parseInt(nextSegment.departureTime)));

        if ( (nextSegmentDate - currentSegmentDate) < 16 * 60 * 60 * 1000 ) { //hh*min*sec*ms
            tempSectors.push(currentSegment);
        } else {
            tempSectors.push(currentSegment);
            realSectors.push(tempSectors);
            tempSectors = [];

        }

    }
    return realSectors.map(sector => {
        return {segments: sector}
    });
}
function reduceTextFromTotalInfoArray(totalInfoArray, index, searchStr = null) {
    return totalInfoArray.reduce((prev, textArr) => {
        if ( searchStr ) {
            index = textArr.findIndex(text =>text.match(searchStr)) || index;
        }
        textArr[index] ? prev.push(textArr[index]) : null;
        return prev;
    }, []).join(" / ")
}

function reduceTdFromTdsArray(tdsArray, index) {
    return tdsArray.reduce((prev, tds) => {
        let text = getText(tds[index]);
        text ? prev.push(text) : null;
        return prev;
    }, []).join(" / ")
}

function getHotelRowByImage() {
     return document.querySelector(".form-block.accommodation, .details.transport");
}

function createQuickBookingOption(button) {
    const insurance = querySelectorAll(document, '.form-block.details.insurance .total-info>div')
        .map(parseService).filter(sup => !!sup.description);
    const transfers = querySelectorAll(document, '.form-block.details.transfer .total-info>div')
        .map(parseService).filter(sup => !!sup.description);
    const tourOptions = createOption(button);
    const priceCells = findPriceCells().map(td => getText(td.querySelector('b')));
    tourOptions.totalPrice = extractIntFromStr(priceCells[0]);
    tourOptions.currency =  mapCurrency(priceCells[0].replace(/\d+|\s+|\.|,/g, ""));
    const nettPrice = extractIntFromStr(priceCells[1]);
    const nettPriceCurrency = mapCurrency(priceCells[1].replace(/\d+|\s+|\.|,/g, ""));

    const grossPriceType = mapPriceType(tourOptions.currency);
    const nettPriceType = mapPriceType(nettPriceCurrency);

    const prices = new Prices();
    prices[`${grossPriceType}`].gross = tourOptions.totalPrice;
    prices[`${grossPriceType}`].currency = tourOptions.totalPrice;
    prices[`${nettPriceType}`].nett = nettPrice;
    prices[`${nettPriceType}`].currency = nettPriceCurrency;

    const services = {
        insurance,
        transfers,
        nettPrice,
        nettPriceCurrency,
        tourOptions,
        prices,
        tourOperatorReference: getNodeProperty(document.querySelector('.claim_no'))
    };
    return services;
}

function parseService(div) {
    const date = getNodeProperty(div.querySelector('.date'), '');
    const [dateStart, dateEnd] = date.split('-');
    const description = getNodeProperty(div, '').replace(date, '').trim();
    return new quickBookingValue({
        dateStart, dateEnd, description
    })
}

async function parsePassengers() {
    const tourId = getUrlSearchParameters('idTour');
    if ( tourId ) {
        const tourDataResponse = await fetch(`https://www.bgoperator.ru/rservice?idTour=${tourId}&task=tourInfo&dataType=json`);
        if ( tourDataResponse.ok ) {
            const tourJSON = await tourDataResponse.json().catch(_ => null);
            if ( tourJSON && tourJSON.tourists ) {
                const tourists = tourJSON.tourists.map(parseJsonTourists)
                return tourists;
            }
        }

    }

    const panels = querySelectorAll(document, ".passengers table").filter(panel => panel.offsetHeight > 0);
    if ( panels.length > 0 ) {
        return panels.map(extractPassengerInfo)
    }
    const trs =  $$('.full-info-z tr', getHotelRowByImage());
    const headTr = trs.find( tr => tr.querySelector('th') );
    const touristIndex = $$('th', headTr).findIndex( th => getText(th).match(/Туристы/i));
    const tourists = trs.filter( tr => tr.querySelector('td')).map( tr => getNodeProperty($$('td', tr)[touristIndex])).filter(tr => tr);
    return tourists.map(parseTextPassengers)
}

function parseJsonTourists(touristObject) {
    const passenger =  new Passenger({
        sex: touristObject.sex.match(/муж/) ? '1' : '2',
        birthday: touristObject.birthDate,
        expire: touristObject.passportEndDate,
        lastName: touristObject.lastname,
        firstName: touristObject.firstname,
        nationality: touristObject.citizenship.name,
        docType: touristObject.passportEndDate ? 'internationalPassport' : 'nationalPassport'
    })
    passenger.setDocNumber(touristObject.passport);
    return passenger;
}

function parseTextPassengers(text, index) {
    try {
        const array = text.split(/\s/);
        if ( !window.location.href.match(/tozaya/) ) {
            return parseTextPassengersNewBook(array)
        }

        const touristsContactTable = document.querySelector('#contacts');
        if ( touristsContactTable ) {
            const contactTr = $$('tbody tr', touristsContactTable)[index+1];
            const contactTds = $$('td', contactTr).map(td => getText(td));
        }
        return new Passenger({
            birthday: array[3],
            firstName: array[2],
            lastName: array[1],
            expire: array[6],
            serial: array[4].split('#')[0],
            number: (array[4].split('#')[1] || '').replace(/\D+/g, ''),
            type: getPassengerType(null, array[0])
        })
    } catch(e) {
        return {};
    }
}

function parseTextPassengersNewBook(array) {
    if ( array[1] === 'Name') {
        return {};
    }
    return new Passenger({
        birthday: array[2],
        firstName: array[1],
        lastName: array[0],
        // email,
        // phone,
        expire: array[5],
        serial: array[3].split('#')[0],
        number: (array[3].split('#')[1] || '').replace(/\D+/g, '')
    })
}

function extractPassengerInfo(panel) {
    const labels = querySelectorAll(panel, "label");
    const sex = selectedOption($1('select.sex'));
    return new Passenger({
            sex: sex.match(/муж/) ? '1' : '2',
            birthday: getNodeProperty( searchDiv(labels, /Дата рождения/i),null, 'value'),
            firstName:  getNodeProperty( searchDiv(labels, /имя/i),null, 'value'),
            lastName:  getNodeProperty( searchDiv(labels, /Фамилия/i),null, 'value'),
            secondName:  getNodeProperty( searchDiv(labels, /Отчество/i),null, 'value'),
            issueDate:  getNodeProperty( searchDiv(labels, /Дата выдачи/i),null, 'value'),
            expire: getNodeProperty( searchDiv(labels, /Действителен/i),null, 'value'),
            serial:  getNodeProperty( searchDiv(labels, /Серия/i),null, 'value'),
            number:  getNodeProperty( searchDiv(labels, /№/i),null, 'value'),
            phone:  getNodeProperty( searchDiv(labels, /телефон/i),null, 'value'),
            email:  getNodeProperty( searchDiv(labels, /E-mail/i),null, 'value'),
           nationality: selectedOption(searchDiv(labels, /Гражданство/i)),
            type: getPassengerType(panel)
        }, panel)
}

function getPassengerType(panel, textType) {
    const text = textType ? textType : selectedOption(panel.querySelector('select[id*="titul"]'));
    switch (text) {
        case 'Mr':
            return 'adult';
        case 'Mrs':
            return 'adult';
        case 'Chld':
            return 'child';
        case 'inf':
            return 'adult';
        default:
            return 'adult';
    }
}

function searchDiv(labels, caption) {
    let label = labels.find(label => {
        return label.textContent.match(caption);
    });
    return label ? label.nextElementSibling : null;
}

function parseHotels(tourOptions) {
    if ( tourOptions.hotels ) {
        return tourOptions.hotels;
    }
    let parsedOptions = parseHotelsUtil(tourOptions);
    return parsedOptions.map(option => {
        const [roomType, accommodation] = (option.roomType || '').split(/\s*\[/);
        option.roomType = roomType;
        option.accommodation = accommodation ? accommodation.replace(']', '') : null;
        return option;
    });
}

function parsePassengersCountModule(passengers, tourOptions) {
    try {
        const passengersCount = {
            adults: 0,
            children: 0,
            infants: 0,
            count: 1
        };

        const selects = $$('[id*="titul"]').map(s => selectedOption(s));
        if ( selects.length === 0 ) {
            return parsePassengersCount(passengers)
        }

        passengersCount.adults = selects.filter(v => v === 'Mr' || v === 'Mrs').length;
        passengersCount.children = selects.filter(v => v === 'Chld').length;
        passengersCount.infants = selects.filter(v => v === 'Inf').length;
        passengersCount.count = passengersCount.adults + passengersCount.children + passengersCount.infants;
        return passengersCount;
    } catch (e) {
        return null;
    }
}
