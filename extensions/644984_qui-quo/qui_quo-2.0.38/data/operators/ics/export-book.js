window.OPERATOR_NAME = "ICS";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const hotelApprovalLink = $first('.hotel_approval_block');
    if ( hotelApprovalLink && !  $first('.qq', hotelApprovalLink)) {
        hotelApprovalLink.style.height = '60px';
        $$(".hotel_approval_block .itm_btns").forEach(div => {
                const container = createQQContainer();
                const btns = $first('.qq-box', container);
                const logo = $first('img[src*="logo"]', container);
                btns.style.display = 'none';
                logo.style.height = '16px';
                container.style.display = 'inline-flex';
                div.append(container);
        });
    }
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const groupedRows = groupRows(tour);
    const hotelData = parseHotels({groupedRows});
    const flight = getFlight(groupedRows.find(row => row.caption === 'Авиаперелет'));

    const prices = parsePrices(groupedRows);

    const option = {
        groupedRows,
        tourOperatorReference: getNodeData('.hotel_order_title .itm .red'),
        prices,
        flight,
        operator: window.OPERATOR_NAME,
        price: prices.inForeignCurrency.gross,
        currency: prices.inForeignCurrency.currency
    };
    return Object.assign(option, hotelData[0]);
}

function parsePrices(groupedRows) {
    const priceRow = groupedRows.find(row => row.caption.match(/ДАННЫЕ ПО ОПЛАТЕ/i));

    const prices = new Prices();

    const grossPriceRow = priceRow.rows.find(r => r.supportText.match(/Базовая стоимость/i));
    const nettPriceRow = priceRow.rows.find(r => r.supportText.match(/К оплате/i));
    const payed = priceRow.rows.find(r => r.supportText.match(/Оплачено/i));


    const grossPriceCurrency = mapCurrencyUtil(grossPriceRow.supportText.split(/\s*,\s*/).slice(-1)[0]);
    const nettPriceCurrency = mapCurrencyUtil(nettPriceRow.supportText.split(/\s*,\s*/).slice(-1)[0]);

    const grossPriceValue = parseFloat(grossPriceRow.mainText);
    const nettPriceValue = parseFloat(nettPriceRow.mainText);

    if ( parseFloat(payed.mainText) === nettPriceValue)  {
        prices.paidStatus = window.PAID_STASTUSES.paid
    }

    const grossPriceType = mapPriceType(grossPriceCurrency);
    const nettPriceType = mapPriceType(nettPriceCurrency);

    prices[`${grossPriceType}`].gross = grossPriceValue;
    prices[`${grossPriceType}`].currency = grossPriceCurrency;

    prices[`${nettPriceType}`].nett = nettPriceValue;
    prices[`${nettPriceType}`].currency = nettPriceCurrency;
    return prices;
}

function getHotelRowByImage(img) {
    return $first('#hotel_order_services');
}

function groupRows(tour) {
    const rows = $$('tr', tour);
    const captionRows = rows.filter(row => $first('.single_service_name', row));
    let groupedRows = [];
    for ( let idx = 0; idx < captionRows.length; idx++ ) {
        const startRow = captionRows[idx];
        const endRow = captionRows[idx + 1];

        const startIndex = rows.indexOf(startRow) + 1;
        const endIndex = rows.indexOf(endRow) - 1;
        const sliceObj = {caption: getText(startRow.firstElementChild), rows: []}
        if ( endIndex < 0 ) {
            const slicedRows = rows.slice(startIndex, rows.length - 1).map(r => new RowElement(r));
            sliceObj.rows.push(...slicedRows);
        } else {
            const slicedRows = rows.slice(startIndex, endIndex).map(r => new RowElement(r));
            sliceObj.rows.push(...slicedRows);
        }

        groupedRows.push(sliceObj)
    }
    return groupedRows;
}

function getFlight(flightRows) {
    try {
        const rows = flightRows.rows.filter(row => !!getText(row.tds[2])).map(row => row.mainText);
        const segments = rows.map(row => parseSector(row));
        const sectors = splitSegmentsToSectors(segments)
        return {sectors};
    } catch(e) {
        return null;
    }
}

function parseSector(sectorRow) {
    const [cities, flightNumber, serviceClass, departureAirport, departureTime, arrivalAirport, arrivalTime] = sectorRow.split(/\s*,\s*|\s*;\s*/);
    const [departureCity, arrivalCity] = cities.replace(getRegexPatterns().dateStrict, '').trim().split(/\s*-\s*/);
    const dates = sectorRow.match(getRegexPatterns().dateStrict)
    return new FlightSegment({
        flightNumber,
        departureDate: dates[0],
        departureTime: departureTime.match(getRegexPatterns().time)[0],
        departureCity,
        departureAirport: departureAirport.replace(/вылет:\s*/i, ''),
        departureAirportID: "",
        departureTerminal: "",
        serviceClass,
        arrivalDate: dates[1] || dates[0],
        arrivalTime: arrivalTime.match(getRegexPatterns().time)[0],
        arrivalCity,
        arrivalAirport: arrivalAirport.replace(/вылет:\s*/i, ''),
        arrivalTerminal: ""
    })
}

class RowElement {
    constructor(tr) {
        this.tr = tr;
        this.tds = $$('td', tr);
        this.supportText = getNodeProperty(this.tds[0], '');
        this.mainText = getNodeProperty(this.tds[1], '');
    }
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const {prices, groupedRows} = tourOptions;
    const insurance = (groupedRows.find(row => row.caption.match(/СТРАХОВАНИЕ/i)) || {rows: []}).rows.map(s => parseService(s.mainText, 'Страхование'));
    const transfers = (groupedRows.find(row => row.caption.match(/ТРАНСФЕР/i)) || {rows: []}).rows.map(s => parseService(s.mainText, 'Трансфер'));
    const services = {
        insurance,
        transfers,
        tourOptions,
        prices
    };
    return services;
}

function parseHotels(tourOptions) {
    const hotelsRows = tourOptions.groupedRows.find(row => row.caption === 'Проживание');
    const hotels = hotelsRows.rows.map(row => {
        const [dates, country, region, hotelName, roomType, accommodation, boardType] = row.mainText.replace(/(\(.+?\))/g, '').split(/\s*,\s*/);
        const [dateStart, dateEnd] = dates.split(/\s*-\s*/);

        return {
            checkinDt: dateStart, dateStart, dateEnd, nights: String(getDistance(dateStart, dateEnd)), country, region,
            hotelName,
            roomType, accommodation, boardType
        }
    })

    return hotels;
}

function parseService(text, caption) {
    const [dateStart, dateEnd] = text.match(getRegexPatterns().date)
    return new quickBookingValue({
        caption,
        dateStart,
        dateEnd,
        description: text
    })
}

function parsePassengers() {
    const panels = $$("#tourists_list .one_tourist").filter(panel => panel.offsetHeight > 0);
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const rows = $$('tr', panel).map(tr =>  {
        const [caption, value] = $$('td', tr).map(n => getText(n));
        return {caption, value}
    });
    const findRow = (caption)=> {
       const row =  rows.find( row => row.caption.match(caption));
       return row ? row.value : '';
    }
    const [lastName, firstName] = findRow(/Имя/i).split(/\s+/);
    const [serial, number] = findRow(/Номер/i).split(/\D+/);
    const sex = findRow(/Пол/i)
    const passenger = new Passenger( {
        sex: sex.match(/MRS/) ? '2' : '1',
        birthday: findRow(/Дата рождения/i),
        issueDate: findRow(/Выдан/i),
        expire: findRow(/Действителен/i),
        lastName,
        firstName,
        nationality: findRow(/Гражданство/i),
        serial,
        number
    });
    return passenger;
}
