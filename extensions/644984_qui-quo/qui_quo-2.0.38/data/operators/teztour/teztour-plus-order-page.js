var OPERATOR_NAME = "Tez";
var showTopHotelsRating = true;
var OPERATOR_CURRENCY = "Tez";
var DEFAULT_CURRENCY = "National";
var CURRENCY_SELECTION_STYLE = "font-size:12px;color:white;";
window.injectionSelector = 'body';

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    injectCurrencySelectionUtil(".importantNotesBlock", OPERATOR_CURRENCY, CURRENCY_SELECTION_STYLE, "font-size:12px", "display:flex;margin:5px;");
    const totalBox = $$(".total-choised-box");
    totalBox.forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const action = $1(".hotel_point .room-box") ? createOption : createFlightOption;
            let container = createQQContainer('', null, action);
            const qqBtns = container.querySelector('.qq-box');
            qqBtns.style.filter = 'invert(1)';
            const button = container.querySelector("button");
            if ( button ) {
                 button.style.color = "black";
                button.style.fontSize = "12px";
            }
            div.append(container);
        }
    });


}

function createFlightOption() {
    const flight = getOrderPageFlight()
    const option = createOptionFromFlight(flight);
    let prices = querySelectorAll(document, ".form-container .price, .form-container .yellow-row .prices");
    let priceText = (isPrefferedDefaultCurrencyUtil() ? getNodeProperty(prices.find(price => price.textContent.match(/₽|RUB|UAH|₴|BYN/))) :
            getNodeProperty(prices.find(price => price.textContent.match(/EUR|USD|€|\$/)))) ||
        getText(document.querySelector(".cost .price.new"));
    const prs = getPrices(prices);
    option.price = extractIntFromStr(priceText.replace(/\s+/g, ""));
    option.currency = mapCurrency(priceText.replace(/\d+|\./g, "").trim());
    option.prices = prs;
    return option;
}

function getOrderPageFlight() {
    const sectors = $$('.flight_field').map(parseOrderPageSector);
    return {sectors}
}
function parseOrderPageSector(sector) {
    const segments = $$('.flight_content', sector).map(parseOrderPageSegment);
    return {segments}
}

function parseOrderPageSegment(segmentNode) {
    const segment = parseSegment(segmentNode, segmentNode);
    segment.flightNumber = getNodeData('.number', segmentNode);
    segment.serviceClass = getNodeData(".class-type", segmentNode, 'textContent','').replace(/класс:\s+/i, '')
    return segment;
}

async function createOption(img) {
    let roomBox = document.querySelector(".room-box");
    if ( !roomBox ) {
        return createFlightOption();
    }
    let tour = roomBox.closest(".include-item");
    let items = querySelectorAll(roomBox, ".flex-item");
    let lineItems = querySelectorAll(document,".choised-border-block .line");
    let region = getText(tour.querySelector(".side-has-rating .h7, .hotel_point .h7")).split(",");
    let prices = querySelectorAll(document, ".form-container .price, .form-container .yellow-row .prices");
    let priceText = (isPrefferedDefaultCurrencyUtil() ? getNodeProperty(prices.find( price =>  price.textContent.match(/₽|RUB|UAH|₴|BYN|₸/) )) :
                                                        getNodeProperty(prices.find( price =>  price.textContent.match(/EUR|USD|€|\$/)) )) ||
                                                        getText(document.querySelector(".cost .price.new"));
    const flight = getFlight();
    const prs = getPrices(prices);

    let option = {
        checkinDt: getItemText(getItemByTitle(items, /Заезд|Дата|Заїзд|Väljalend|Check-in|Atvykimas/i)).match(/\d{2}\.\d{2}\.\d{4}/)[0],
        nights: (getItemText(getItemByTitle(items, /Продолжительность|длительность|Тривалість|Kestus|Trukmė/i)).match(/(\d+)\s*ноч|(\d+)\s*ööd|(\d+)\s*n/) || ["0","0"]).filter(s=>s)[1],
        hotelName: getText(tour.querySelector("h5.hotel-name, .hotel_point h5")).replace(/Проживание в|Тур в|KELIONĖ Į/i, "").trim(),
        href: null,
        region: region.pop().trim(),
        country: region.join(),
        roomType: getItemText(getItemByTitle(items, /Тип номера|начало и место встречи|Тип номеру|Toatüüp|Kambario tipas/i)),
        accommodation: trim(getNodeProperty(getItemByTitle(items, /Гости|Гості|Reisijad|Svečiai/i), '')).replace(/Гости|Дорослих|Svečiai\s*:\s*|Reisijad\s*:\s*/, ''),
        boardType: getItemText(getItemByTitle(items, /Питание|Харчування|Toiduplaan|Maitinimas/i)),
        price: extractIntFromStr(priceText.replace(/\s+/g, "")),
        totalPrice: parseFloat(priceText.replace(/\s+/g, "")),
        prices: prs,
        currency: mapCurrency(priceText.replace(/\d+|\./g, "").trim()),
        city_from: getNodeProperty(getItemByTitle(lineItems, /Вылет|Виліт|Lähtepunkt|Skrydis/i), "").replace(/Вылет.+?:|Lähtepunkt.+?:|Виліт.+?:|Skrydis+?:/i, "").split(",")[0].trim() ||
                   flight ? flight.sectors[0].segments[0].departureCity : "",
        operator: OPERATOR_NAME,
        thumbnail: await getThumbnail(),
        occupancy: getOccupancy(),
        excursion: !!tour.querySelector(".include-item-ico.ico-5"),
        flight: getFlight()
    };

    return option;
}

async function getThumbnail() {
    try {
        const url = $1('[data-searchurl]').dataset.searchurl;
        const result = await fetchTimeout(500, fetch(url)).then(response => response.json());
        const data = result.data;
        const imageUrlArray = data[0].find(item => Array.isArray(item) && item.some(str => (typeof str === 'string') && (str.match(/\.jpg/i) || str.match(/\.png/i))));
        return imageUrlArray.find(str => (typeof str === 'string') && (str.match(/\.jpg/i) || str.match(/\.png/i)))
    } catch (e) {
        console.log(e);
        return null;
    }

}

function getPrices(prices) {
    const prs = new Prices();

    const nationalPrice = getNodeProperty(prices.find(price => price.textContent.match(/₽|RUB|UAH|₴|BYN/)), '') || getText(document.querySelector(".cost .price.new"));
    const foreignPrice = getNodeProperty(prices.find(price => price.textContent.match(/EUR|USD|\$|€/)), '0');

    const nettPriceObj = getNettPrice();
    prs.nationalGrossPrice = parseFloat(nationalPrice.replace(/\s+/g, ""));
    prs.nationalCurrency = mapCurrency(nationalPrice.replace(/\d+|\./g, "").trim());
    prs.nationalNettPrice = nettPriceObj.nationalNettPrice;

    prs.foreignGrossPrice = parseFloat(foreignPrice.replace(/\D+/g, ""));
    prs.foreignCurrency = mapCurrency(foreignPrice.replace(/\d+|\./g, "").trim());
    prs.foreignNettPrice = nettPriceObj.foreignNettPrice;
    prs.paidStatus = window.PAID_STASTUSES.outstanding;
    return prs;
}

function getOccupancy() {
    let basketButton = document.querySelector(".basket-button");
    let basketButtonData = basketButton ? JSON.parse(basketButton.dataset.favdata) : null;
    if ( !basketButtonData || !basketButtonData.searchparams || !basketButtonData.searchparams.adultsCount ) {
        return null;
    }
    return  {
        adultsCount: +basketButtonData.searchparams.adultsCount,
        childrenCount: (+basketButtonData.searchparams.childrenCount + basketButtonData.searchparams.infantsCount) || null,
        childAges: basketButtonData.searchparams.ages
    }
}

function getItemByTitle(items, title) {
    return items.find(item => getText(item).match(title));
}

function getItemText(item) {
    return getText(item.querySelector(".type"));
}

function mapCurrency(c) {
    c = c.trim().toUpperCase();
    switch (c) {
        case "5561":
            return "USD";
        case "8390":
            return "RUB";
        case "18864":
            return "EUR";
        case "ГРН":
            return "UAH";
        case "46688":
            return "UAH";
        case "122196":
            return "KZT";
        case "132329":
            return "BYR";
        case "533067":
            return "BYN";
        case "$":
            return "USD";
        case "₽":
            return "RUB";
        case "€":
            return "EUR";
        case "₸":
            return "KZT";
    }
    return c;
}

function getFlight() {
    try {
        const miniSectors = $$('.basket-flight-field-row, .mobile-flight-top-info');
        let sectors = querySelectorAll(document, ".flight_field").map((sector, index) => {

            return createSegments(querySelectorAll(sector, ".flight_content"), miniSectors[index]);
        }).filter(sec => sec.segments.length > 0);
        console.log({sectors})
        return sectors.length > 0 ? {sectors: sectors} : null;
    } catch (e) {
        console.log(e)
        return null;
    }
}

function createSegments(segmentsArray, miniSector) {
    return {
        segments: segmentsArray.map(segment => {
            return parseSegment(segment, miniSector);
        }).filter(Boolean)
    }
}

function parseSegment(segmentNode, miniSector) {
    if ( !miniSector ) {
        return null;
    }
    let [depRow, arrRow] = querySelectorAll(segmentNode,".row");
    const baggage = getNodeProperty((segmentNode.closest('.flight_field') || segmentNode.parentNode.parentNode).querySelector('.type .place.green'));
    let departureCity = getNodeProperty(depRow.querySelector(".title").nextSibling, "");
    let arrivalCity = getNodeProperty(arrRow.querySelector(".title").nextSibling, "");
    let departurePort = getNodeProperty(depRow.querySelector(".title"), "");
    let arrivalPort = getNodeProperty(arrRow.querySelector(".title"), "");
    return new FlightSegment({
        flightNumber: getNodeProperty( miniSector.querySelector('.flight-number')),
        airline: getNodeProperty( miniSector.querySelector('.aircraft-name'), "").replace(/Рейс выполняется -/, "").trim(),
        travelTime: getNodeProperty( segmentNode.querySelector(".route_time")),
        plane: getNodeProperty( segmentNode.querySelector(".plane")),
        departureDate: (getNodeProperty( depRow.querySelector(".date"), "").match(/\d{2}\.\d{2}\.\d{4}/) || "")[0],
        departureTime: getNodeProperty(depRow.querySelector(".time")),
        departureCity: parseFlightCity(departureCity),
        departureAirport: (departurePort.match(/(.+?),/) || "")[1] || departurePort.split(/\s*\(/)[0],
        departureAirportID: (departurePort.match(/\((.+)\)/) || departurePort.match(/^([A-Z]{3})$/) || [])[1],
        departureTerminal: "",
        serviceClass: getNodeProperty(miniSector.querySelector(".class-type, .class-i"), '').replace(/класс:\s+/i, ''),
        arrivalDate:  (getNodeProperty( arrRow.querySelector(".date"), "").match(/\d{2}\.\d{2}\.\d{4}/) || "")[0],
        arrivalTime: getNodeProperty( arrRow.querySelector(".time")),
        arrivalCity: parseFlightCity(arrivalCity),
        arrivalAirport: (arrivalPort.match(/(.+?),/) || [])[1] || arrivalPort.split(/\s*\(/)[0],
        arrivalAirportID: (arrivalPort.match(/\((.+)\)/) || arrivalPort.match(/^([A-Z]{3})$/) || [])[1],
        arrivalTerminal: "",
        baggage
    });
}

function parseFlightCity(text) {
    return text.split(/\s*,\s*/)[0];
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return "Mr";
        case "2" :
            return "Mrs";
        default  :
            return "Не выбран";
    }
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.classList.contains("js-tour-table-block") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

//---------------------Quick Booking--------------------------------/

function createQuickBookingOption(button) {
    const insurance =  parseInsurance(querySelectorAll(document, '.white-field-bg').find(i => i.textContent.match(/страховка/i)))
    const additionalInsurance = $$('[onchange*="Basket.Tour.Services.Insurance"]').map(select => {
        return new quickBookingValue({description: selectedOption(select), addDates: true})
    }).filter(obj => obj.description && !obj.description.match(/без страх]/) )

    insurance.push(...additionalInsurance)
    const transfers = querySelectorAll(document, '.basket-transfer-field .details-bx')
                    .map(parseTransfer);
    let notes = querySelectorAll(document, 'li.search-choice')
                  .map( li => getNodeProperty(li) );
    const specialRequest = getNodeProperty(document.querySelector('textarea[name="specialrequest"]'),  "", 'value');
    const commissionNode = document.querySelector('.tour-booking-info .agent-commission');
    const commissionText = getNodeProperty(commissionNode, '');
    const commission = (commissionText.match(/\((.+)\)/) || ['0','0'])[1].replace(/[^0-9.]/g, '');
    const commissionCurrency = mapCurrency((commissionText.match(/\((.+)\)/) || ['0', '0'])[1].replace(/[0-9. ]/g, ''));
    const services = {
        transfers,
        notes: [...notes, specialRequest].join('; '),
        insurance,
        commission,
        commissionCurrency,
        flightType: $1('[onclick*="Basket.Flight.getFareFamilies"]') ? 'Scheduled' : 'Charter'
    };
    return services;
}

function getNettPrice() {
    try {
        const nettPriceArray = $$('.importantNotesBlock .option-box')
            .filter(box => getText(box).match(/Оплата по счету/))
            .map(box => [...box.querySelectorAll('b')]
                .reduce((acc, value) => {
                    const text = getText(value);
                    const digits = parseFloat(text.replace(/\s+|EUR|USD|\$|€/g, ""));
                    const currency = mapCurrency(text.replace(/\d+|\./g, "").trim());
                    const prev = parseFloat(acc);
                    return `${(prev + digits)}${currency}`
                }, 0));

        const nettPriceFromDiscountTable = getNettPriceFromDiscountTable();
        if ( nettPriceArray.length === 0  ) {
            return nettPriceFromDiscountTable;
        }

        const nationalPrice = nettPriceArray.find(price => price.match(/₽|RUB|UAH|₴|BYN/)) || "0 RUB";
        const foreignPrice = nettPriceArray.find(price => price.match(/EUR|USD|\$|€/)) || "0 EUR";
        const nettPrice = isPrefferedDefaultCurrencyUtil() ? nationalPrice :
             foreignPrice;

        return {
            nettPrice: parseFloat(nettPrice.replace(/\s+/g, "")),
            nettPriceCurrency: mapCurrency(nettPrice.replace(/\d+|\./g, "").trim()),

            nationalNettPrice: nettPriceFromDiscountTable && nettPriceFromDiscountTable.nationalNettPrice ? nettPriceFromDiscountTable.nationalNettPrice : parseFloat(nationalPrice.replace(/\s+/g, "")),
            nationalNettPriceCurrency: mapCurrency(nationalPrice.replace(/\d+|\./g, "").trim()),
            foreignNettPrice: nettPriceFromDiscountTable && nettPriceFromDiscountTable.foreignNettPrice ? nettPriceFromDiscountTable.foreignNettPrice : parseFloat(foreignPrice.replace(/\s+/g, "")),
            foreignNettPriceCurrency: mapCurrency(foreignPrice.replace(/\d+|\./g, "").trim()),
        }
    } catch(e) {
        console.log(e)
        return {};
    }
}

function getNettPriceFromDiscountTable() {
    try {
        const ths = $$('tr.th td');
        const tds = $$('tr.dc-indicators td');
        const nettPrice = [getText(tds[findTableTdIndex(ths, /Платить/i)])]
        const nationalPrice = nettPrice.find(price => price.match(/₽|RUB|UAH|₴|BYN/)) || "0 RUB";
        const foreignPrice = nettPrice.find(price => price.match(/EUR|USD|\$|€/)) || "0 EUR";
        return {

            nationalNettPrice: parseFloat(nationalPrice.replace(/\s+/g, "")),
            nationalNettPriceCurrency: mapCurrency(nationalPrice.replace(/\d+|\./g, "").trim()),

            foreignNettPrice: parseFloat(foreignPrice.replace(/\D+/g, "")),
            foreignNettPriceCurrency: mapCurrency(foreignPrice.replace(/\d+|\./g, "").trim()),
        }
    } catch (e) {
        return {};
    }
}

function parseTransfer(div) {
    const date = getNodeProperty(div.querySelector('.title'), '').match(getRegexPatterns().date);
    let description = getNodeProperty(div.querySelector('.type'), '');
    let info = div.closest('.merge-items');
    if ( info ) {
        const count = getNodeProperty(info.querySelector('.traveler'), "");
        const baggage = getNodeProperty(info.querySelector('.place'), "");
        description = [description, count, baggage].filter(item=> item).join("; ");
    }
    return new quickBookingValue({date: date ? date.toString() : null, description: description});
}

function parseInsurance(item) {
    const description = item ? trim(item.outerHTML) : '';
    return description ? [new quickBookingValue({description, addDates: true})] : null;
}

function parsePassengers() {
    const panels = querySelectorAll(document, ".guest-items .guest-data-box .white-field-bg").filter(panel => panel.offsetHeight > 0);
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const passenger = new Passenger(
        getInputsValues(panel, {
            birthday: '[name*="birthdate"]',
            issueDate: ".p-issue",
            expire:  ".p-expiries",
            lastName: "input.input-lastname",
            firstName: "input.input-name",
            serial: ".p-series",
            number: ".p-number",
            phone: ".tPhone"
        }), panel);

    passenger.nationality =  selectedOption(panel.querySelector('select[name*="id_citizenship"]'));
    passenger.sex =  selectedOption(panel.querySelector('select[name*="prefix"]'));
    passenger.type = getNodeProperty(panel.querySelector('.guest-title'), '').match(/ДИТИН|РЕБЕНОК /i) ? 'child' : 'adult';
    return passenger;
}

function parseClient() {
    const client = new Passenger(
        getInputsValues(document, {
            email: ".guest-data-box [name='email']",
            phone: ".guest-data-box [name='phone']",
            isClient: true
        }));
    return client.email || client.phone ? client : null;
}
