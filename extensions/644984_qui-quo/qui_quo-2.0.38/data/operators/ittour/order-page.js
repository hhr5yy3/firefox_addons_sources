var OPERATOR_NAME = "ITTOUR";
var showTopHotelsRating = true;
window.currentDoc = document;
window.injectionSelector = 'body';

function injectData() {
    if ( (typeof AGENCY_ID === "undefined") || (AGENCY_ID.length == 0) ) {
        return;
    }
    var option = document.querySelector(".three-block-info .option-costs");
    if ( option && !option.querySelector(".qq") ) {
        option.appendChild(createQQContainer('', getAsyncInfo));
    }

    const headCell = document.querySelector('.applications-result .applications-tab tr:not(.odd)');
    if ( headCell && !headCell.querySelector('.qq') ) {
        headCell.append(createHeadCell());
    }

    $$('.applications-result .applications-tab tr.odd').forEach(tr => {
        if ( !tr.querySelector(".qq") ) {
            tr.append(createCell());
        }
    });
}

function createCell() {
    const td = document.createElement('td');
    td.classList.add('qq', 'dxgv');
    const container = createQQContainer();
    const logo = container.querySelector('img');
    const qqBtns = container.querySelector('.qq-box');
    const exportBtn = container.querySelector('.qq-export-button');
    if ( exportBtn ) {
        exportBtn.style.maxWidth = '100px';
        exportBtn.style.minWidth = '100px';
        exportBtn.style.transform = 'scale(0.9)';
        exportBtn.dataset.isOrdersPage = 'true';
    }
    container.style.maxWidth = '100px';
    td.style.maxWidth = '100px';
    logo.remove();
    qqBtns.style.display = 'none';
    td.append(container);
    return td;
}

function createHeadCell() {
    const td = document.createElement('th');
    td.classList.add('qq', 'dxgvHeader_Coral');
    td.style.maxWidth = '100px';
    const container = createQQContainer();
    const logo = container.querySelector('img');
    logo.style.height = "16px";
    td.append(logo);
    td.style.cssText = 'border-left-width:0px;border-top-width:0px;cursor:default;';
    td.style.textAlign = 'center';
    container.remove();
    return td;
}

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function createOption(img) {
    var [mainRow, liArray] = getMainRowAndLiArray(img);
    const hotelLi = getTextFromLiArray(liArray, /Отель:|Готель/i, false);
    var option = {
        region: getTextFromLiArray(liArray, /Регион|Регіон/i),
        hotelName: trim(getText(hotelLi.querySelector('a') || hotelLi).replace(/\s+/g, " ") + " " + getTextFromLiArray(liArray, /Класс отеля:|Клас готелю/)),
        hotel_desc: mainRow.getAttribute("hotel_desc"),
        href: getHref(liArray),
        roomType: [getTextFromLiArray(liArray, "Номер:"), getTextFromLiArray(liArray, "Размещение:|Розміщення")].filter( elem => elem ).join(", "),
        boardType:  getTextFromLiArray(liArray, /Питание:|Харчування/i),
        checkinDt:  getDate(getTextFromLiArray(liArray, /Дата заезда:|Дата заїзду|Дата/i)),
        nights: getTextFromLiArray(liArray, "Ночей:"),
        price: +getNodeProperty(mainRow.querySelector("#option-price")).replace(/\D+/g, ""),
        currency: mapCurrency(getNodeProperty(mainRow.querySelector("#checked_currency, #option-price")).replace(/\d+/g, "").trim()),
        country: getTextFromLiArray(liArray, /Страна|Країна/i),
        city_from: getTextFromLiArray(liArray, /Вылет из:|Виліт з/i),
        operator: [OPERATOR_NAME, getTextFromLiArray(liArray, /Оператор:/).replace(/\(.+/g,"").trim()].filter( name => name ).join(" / "),
        flight: getFlight(),
        thumbnail: mainRow.getAttribute("thumbnail"),
        occupancy: { adultsCount: +getTextFromLiArray(liArray, /Взрослых:|Дорослих/),
                     childrenCount: +getTextFromLiArray(liArray, /Детей:|Дітей:/),
                     childAges: getTextFromLiArray(liArray, /Возраст:|Вік:/)
        }
    };
    return option;
}


function mapCurrency(s) {
    var c = trim(s).toUpperCase();
    switch ( c ) {
        case "₽":
            return "RUB";
        case "$":
            return "USD";
        case "€":
            return "EUR";
    }
    return c.slice(0,3);
}

function getHref(liArray) {
        var hotel = getTextFromLiArray(liArray, /Отель:|Готель:/, false);
        var a = hotel ? hotel.querySelector("a") : null;
        return a ? a.href : null;
}

function getFlight() {
    var findCallback = (tr)=>  { var radio = tr.querySelector('input[type="radio"]'); return !radio || (radio && radio.checked)  };
    var forward = querySelectorAll(window.currentDoc, ".flight-to").find(findCallback) || window.currentDoc.querySelector(".flight-to");
    var reverse = querySelectorAll(window.currentDoc, ".flight-back").find(findCallback) || window.currentDoc.querySelector(".flight-back");
    return createFlightInfo(forward, reverse);
}

function createFlightInfo(forward, reverse) {
    if ( !forward && !reverse ) {
        return null;
    }
    return {
        sectors: [createSegment(forward),createSegment(reverse)].filter( seg => seg )
    }
}

function getFlightDate(elem) {
    if ( !elem ) {
        return null;
    }
    var date = elem.textContent.match(/\d{2}.\d{2}.\d{2}/);
    return date ? makeYear4Digits(date[0]) : null;
}

function createSegment(dest) {
    if ( !dest ) {
        return null;
    }
    var date = getFlightDate(dest.querySelector(".flight_date"));
    var departAirport = getNodeProperty(dest.querySelector(".from_airport"), "");
    var arrivalAirport = dest.querySelector(".to_airport");
    var arrivalDate =  getFlightDate(arrivalAirport.nextElementSibling);
    var service = dest.querySelector("input[type='hidden']");

    var segment = {
        flightNumber: getNodeProperty(dest.querySelector(".code")),
        airline:  getNodeProperty(dest.querySelector(".air_company")),
        departureDate: date,
        departureTime: getNodeProperty(dest.querySelector(".flight_time")),
        departureCity: departAirport.replace(/\(.+\)/,"").trim(),
        departureAirport: null,
        departureAirportID: (departAirport.match(/\((.+)\)/) || "")[1],
        departureTerminal: null,
        serviceClass: getNodeProperty(service ? service.parentNode : "").trim(),
        arrivalDate: arrivalDate,
        arrivalTime: getNodeProperty(arrivalAirport.nextElementSibling.nextElementSibling),
        arrivalCity: getNodeProperty(arrivalAirport).replace(/\(.+\)/,"").trim(),
        arrivalAirport: null,
        arrivalAirportID: (getNodeProperty(arrivalAirport).match(/\((.+)\)/) || "")[1],
        arrivalTerminal: null,
        travelTime: getNodeProperty(dest.querySelector(".flight_time").nextElementSibling),
        plane:getNodeProperty(dest.querySelector(".air_company").nextElementSibling)
    };

    return { segments: [segment] };
}

function getTextFromLiArray(array, text, textContent = true) {
    var liElem = array.find( li => {
        return li.textContent.match(text);
    });
    if ( liElem ) {
        return textContent ? getNodeProperty(liElem.querySelector("span"), "") : liElem;
    }
    return "";
}

function getDate(elem) {
    var date = elem.match(/\d{2}.\d{2}.\d{2}/);
    return makeYear4Digits(date[0]);
}

function getHotelRowByImage(img) {
    return img.closest('.three-block-info');
}

async function getAsyncInfo(img) {
    var [mainRow, liArray] = getMainRowAndLiArray(img);
    if ( mainRow.getAttribute("hotel_desc") && mainRow.getAttribute("thumbnail") ) {
        return img;
    }
    var href = getHref(liArray);
    if (!href ) {
        return img;
    }
    var htmlPage = await getPageWithFetch(href);
    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlPage, "text/html");
    if ( !doc ) {
        return img;
    }
    var image = doc.querySelector(".rg-gallery .es-carousel img[data-large]");
    var desc = getNodeProperty(doc.querySelector("#mainTabs .desc"));
    if ( image ) {
        mainRow.setAttribute("thumbnail", "http://www.ittour.com.ua/" + image.dataset.large);
    }
    if ( desc ) {
        mainRow.setAttribute("hotel_desc", desc);
    }
    return img;
}

function getPageWithFetch(href) {
    return fetchTimeout(10000, fetch(href)).then(response => response.text()).catch(e => {
        return null
    });
}

function getMainRowAndLiArray(img) {
    var mainRow = getHotelRowByImage(img);
    return [mainRow, querySelectorAll(mainRow, "li")]
}

function createBookingOption(img) {
    const option = createOption(img);
    option.flight = getBookingFlight();
    return option;
}

function getBookingFlight() {
    const table = window.currentDoc.querySelector('.more-trip');
    const sectors = querySelectorAll(table, ".even, .odd").map(parseBookingSector);
    return {sectors};
}

function parseBookingSector(sector) {
    const ths = $$('th', sector.closest('tbody'));
    ths.filter(th => getText(th).match(/время|Час/i)).forEach((th,index) => th.textContent = th.textContent+index ) ;
    const tds = $$('td', sector);
    const textTds = tds.map(td => getText(td, 'innerText'));
    const extractCity = (text) => text ? (text.match(/\((.+?)\)$/) || text.match(/^\(.+?\)\s+(.+)/) || [])[1] : null;
    const extractAirportId = (text) => text ? (text.match(/[A-Z][A-Z0-9]{2,3}/) || [])[0] : null;
    const extractTerminal  = (text) => text ? (text.match(/[A-Z][A-Z0-9]{2,3}-([A-Z0-9])/) || [])[1] : null;
    const findTd = (caption) => textTds[findTableTdIndex(ths, caption)];
    const segments = [{
        flightNumber: findTd(/Рейс/i),
        airline: findTd(/A.к/i),
        departureDate: findTd(/Вылет$|Виліт$/i).slice(0,10),
        departureTime: findTd(/Время0|Час0/i),
        departureCity: extractCity(findTd(/п\s*вылета|вильоту/i)),
        departureAirportID: extractAirportId(findTd(/п\s*вылета|вильоту/i)),
        departureTerminal: extractTerminal(findTd(/п\s*вылета|вильоту/i)),
        serviceClass: findTd(/Класс|Клас/i),
        arrivalDate: findTd(/Прилет$|Приліт$/i),
        arrivalTime: findTd(/Время1/i),
        arrivalCity: extractCity(findTd(/п\s*прилета|прильоту/i)),
        arrivalAirportID: extractAirportId(findTd(/п\s*прилета|прильоту/i)),
        arrivalTerminal: extractTerminal(findTd(/п\s*прилета|прильоту/i)),
        travelTime: findTd(/В\s*пути|В\s+дорозі/i)
    }];
    return {segments};
}

async function createQuickBookingOption(button) {
    button.textContent = 'Загрузка...';
    let virtualExportButton = null;
    let optionObject = {};
    let tourOperatorReference = (window.location.search.match(/order_id=(\d+)/) || [])[1];
    window.currentDoc = document;
    if ( button.dataset.isOrdersPage === 'true' ) {
        const tr = button.closest("tr");
        const a = tr.querySelector('.first a.id');
        const href = getNodeProperty(a, null, 'href');
        tourOperatorReference = getNodeProperty(a, null, );
        const pageResult = await fetchTimeout(10000, fetch(href)).then(resp => resp.text());
        const parser = new DOMParser();
        const virtualDoc = parser.parseFromString(pageResult, "text/html");
        if ( !virtualDoc ) {
            return null;
        }
        window.currentDoc = virtualDoc;
        const option = virtualDoc.querySelector(".three-block-info .option-costs");
        if ( option && !option.querySelector(".qq") ) {
            const container = option.appendChild(createQQContainer());
            virtualExportButton = container.querySelector(".qq-export-button");
        }
    }
    if ( virtualExportButton ) {
        optionObject.tourOptions = createBookingOption(virtualExportButton);
    }
    const [_, liArray] = getMainRowAndLiArray(virtualExportButton || button);
    const moreInfo = window.currentDoc.querySelector('table.more-info');
    const services = moreInfo ? $$('tbody tr input[name*="description"]', moreInfo).map(extractServiceInfo) : [];
    const transfers = services.filter( svc => svc.caption.match(/трансфер|Transfer/i) );
    const insurance = services.filter( svc => svc.caption.match(/Медицинская|Medical/i) );
    const other = services.filter( svc => !svc.caption.match(/трансфер|Медицинская|Проживание|Medical/i) );
    const notes = getNodeProperty(window.currentDoc.querySelector('.comment-save textarea'), null, 'value');
    const nettPriceNode = $$('.price .additional', window.currentDoc).find(li => getText(li).match(/к\s+оплате|до сплати/i));
    const nettPrice = nettPriceNode ? parseFloat(getNodeProperty(nettPriceNode.querySelector('.number'))) : null;
    const nettPriceCurrency = nettPriceNode ? mapCurrencyUtil(getNodeProperty(nettPriceNode.querySelector('.unit')) || getNodeProperty(nettPriceNode.querySelector('.signe-unit'))) : null;
    const { price, currency } = createOption(virtualExportButton || button);
    const prices = new Prices();
    const nettPriceType = mapPriceType(nettPriceCurrency);
    const grossPriceType = mapPriceType(currency);
    prices[`${nettPriceType}`].nett = nettPrice;
    prices[`${nettPriceType}`].currency = nettPriceCurrency;

    prices[`${grossPriceType}`].gross = price;
    prices[`${grossPriceType}`].currency = currency;

    Object.assign(optionObject, {
            insurance,
            transfers: transfers.length > 0 ? transfers : parseServices(liArray, /Трансфер/i),
            other,
            notes,
            nettPrice,
            prices,
            nettPriceCurrency: nettPriceCurrency ? nettPriceCurrency.slice(0, 3) : null,
            tourOperatorReference
        }
    );
    button.textContent = 'Быстрая Заявка в CRM';
    return optionObject;
}

function parseServices(liArray, text) {
    const description = getTextFromLiArray(liArray, text);
    if ( !description ) {
        return [];
    }
    return [new quickBookingValue({
        description,
        caption: text
    })];
}

function extractServiceInfo(input) {
    const td = input.parentNode;
    return new quickBookingValue({
        caption: getNodeProperty(td.querySelector('[name*="name"]'), '', 'value'),
        description: getNodeProperty(td.querySelector('[name*="description"]'), '', 'value'),
        dateStart:  new Date(getNodeProperty(td.querySelector('[name*="date_begin"]'), null, 'value')).toLocaleDateString('ru'),
        dateEnd:  new Date(getNodeProperty(td.querySelector('[name*="date_end"]'), null, 'value')).toLocaleDateString('ru')
    })
}

function parsePassengers() {
    const passengers = $$('tr[id*="tourist"]', window.currentDoc).map(parsePassenger);
    if ( passengers.length === 0 ) {
        return $$('table.tourist-input tbody tr.odd, table.tourist-input tbody tr.even', window.currentDoc)
               .filter(tr => tr.querySelector('.first'))
               .map(parseBookingPassenger);
    }
    return passengers;
}

function parsePassenger(tr) {
    const passenger = new Passenger(
        getInputsValues(tr, {
            firstName: 'input[id*="first_name"]',
            lastName: 'input[id*="last_name"]',
            birthday: 'input[id*="birthday"]',
            serial: 'input[name*="p_serial"]',
            number: 'input[name*="p_number"]',
            expire: 'input[name*="passport_date"]',
            authority: 'input[name*="issued"]',
            docType: 'internationalPassport'
        }), tr);
    passenger.nationality = selectedOption(tr.querySelector('select[name*="nationality"]'));
    passenger.type = getPassengerType(tr);
    return passenger;
}

function getPassengerType(tr) {
    let prevTr = tr.previousElementSibling;
    while (prevTr) {
        const tit = getNodeProperty(prevTr.querySelector('.tit'));
        if ( tit ) {
            if ( tit.match(/Взрослые/i) ) {
                return 'adult';
            }
            if ( tit.match(/Дети/i) ) {
                return 'child';
            }
            return 'adult';
        }
        prevTr = prevTr.previousElementSibling;
    }
    return 'adult';
}

function parseBookingPassenger(tr) {
    const ths = $$('th', tr.closest('tbody'));
    const tds = $$('td', tr);
    const textTds = tds.map(td => getText(td, 'innerText'));
    const findTd = (caption) =>  textTds[findTableTdIndex(ths, caption)];
    const [firstName, lastName] = findTd(/Фамилия|Прізвище /i).split(/\s+/);
    const [serial, number] = findTd(/Серия|Серія/i).split('-');
    const passenger = new Passenger({
        firstName,
        lastName,
        birthday: findTd(/Дата\s+рождения/i),
        serial,
        number,
        expire: findTd(/Действует\s*до|Діє до/i),
        authority: findTd(/выдан|виданий/i),
        docType: 'internationalPassport',
        nationality:  findTd(/Гражданство|Громадянство/i),
    }, tr);
    return passenger;
}

function parseClient() {
    const [lastName, firstName, secondName] = getNodeProperty(window.currentDoc.querySelector('#contract_fio'), '', 'value').split(/\s+/);
    const client = new Passenger(getInputsValues(window.currentDoc, {
        serial: '#contract_passport_series',
        number: '#contract_passport_number',
        email: '#contract_aditional_phones',
        issueDate: '#contract_passport_date',
        authority: '#contract_passport_issued',
        inn: '#contract_inn_number'
    }), window.currentDoc);
    client.phone = getNodeProperty(window.currentDoc.querySelector('#contract_phones'), '', "value").replace(/[-\s+]/g, '').split(',')[0];
    client.lastName = lastName;
    client.firstName = firstName;
    client.secondName = secondName;
    client.isClient = true;
    if ( !client.phone && !client.email ) {
        return null;
    }
    return client;
}
