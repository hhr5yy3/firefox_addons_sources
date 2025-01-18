window.OPERATOR_NAME = window.location.href.indexOf('coral') > 0 ? 'Coral' : 'Sunmar';
window.injectionSelector = 'tr[id*="ReservationSearch"]:not([id*="detailRow"])';

const resIconOffsets = {
    'flight': '0',
    'hotel': '-24',
    'insurance': '-48',
    'transfer': '-384',
    'other': '-528'
};

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    if ( !initParams || initParams.hideQuickBookingTutorial === true ) {
        return;
    }
    const headCell = document.querySelector('.dxgvHeader_Coral, .dxgvHeader_Sunmar');
    if ( headCell && !headCell.parentNode.querySelector('.qq') ) {
        headCell.parentNode.prepend(createHeadCell()) ;
    }

    $$('tr[id*="ReservationSearch"]:not([id*="detailRow"])').forEach( tr => {
        if ( !tr.querySelector('.qq') ) {
            tr.prepend(createCell());
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
    }
    container.style.maxWidth = '100px';
    td.style.maxWidth = '100px';
    logo.remove();
    qqBtns.style.display = 'none';
    td.append(container);
    return td;
}

function createHeadCell() {
    const td = document.createElement('td');
    td.classList.add('qq', 'dxgvHeader_Coral', 'dxgvHeader_Sunmar');
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

async function createOption(button) {
    button.textContent = 'Загрузка...';
    const parentRow = getHotelRowByImage(button);
    const id = parentRow.dataset.id;
    const detailedRow = parentRow.parentNode.querySelector(`[id*="ReservationSearch_${id}_detailRow"]`);
    let tableDetailedRows = $$('tr[id*="ReservationServiceList"]', detailedRow);
    if ( tableDetailedRows.length === 0 ) {
        const expandBtn = parentRow.querySelector('[onclick*="ReservationSearch_ExpandNode"]');
        if ( expandBtn ) {
            expandBtn.click();
        }
        tableDetailedRows = await waitingFor(() => {
            const rows = $$('tr[id*="ReservationServiceList"]', detailedRow);
            if ( rows.length > 0 ) {
                return rows;
            }
            return null;
        }, 100, 30);
    }
    const sectors = tableDetailedRows.filter((tr) => filterServiceCallback(tr, 'flight'));
    const flight = getFlight(sectors);

    const country = getText(parentRow.querySelector('td[id*="col_toCountry"]'));
    const region = flight && flight.sectors[0] ? lastElement(flight.sectors[0].segments).arrivalCity : '';


    const hotels = tableDetailedRows.filter((tr) => filterServiceCallback(tr, 'hotel')).map(tr => parseHotelCoral(tr, country, region));

    const transfers = tableDetailedRows.filter((tr) => filterServiceCallback(tr, 'transfer')).map(parseService);
    const insurance = tableDetailedRows.filter((tr) => filterServiceCallback(tr, 'insurance')).map(parseService);
    const other = tableDetailedRows.filter((tr) => filterServiceCallback(tr, 'other')).map(parseService);

    const [dateStart, dateEnd] = getNodeProperty(parentRow.querySelector('[data-columnname="beginDate"]')).match(/\d{1,2}.\d{1,2}.\d{2,4}/g);

    let option = {
        hotels,
        flight,
        transfers,
        insurance,
        other,
        dateStart,
        dateEnd,
        nights: hotels.reduce((a, b) => a + parseInt(hotels[0].nights), 0),
        country: insurance.length > 0 ? (insurance[0].description.match(/.+\((.+?)\)$/) || [])[1] : null,
        region,
        city_from: flight && flight.sectors[0] ? flight.sectors[0].segments[0].departureCity : 'Нет данных',
        operator: window.OPERATOR_NAME,
        tourOperatorReference: id
    };
    const priceDetailsBtn = parentRow.querySelector('[data-columnname="paymentStatusID"] a');
    if ( priceDetailsBtn ) {
        priceDetailsBtn.click();
        const popupWindow = await waitingFor(getPopupWindow, 200, 50);
        if ( popupWindow ) {
            const closeBtn = document.querySelector('#eaglePopupWindow-close');
            const [totalPriceNodeSale, totalPriceNodeLocal] = [$first('#col_salePriceP_1', popupWindow), $first('#col_localPrice_1', popupWindow)];
            const [nettPriceNodeSale, nettPriceNodeLocal] = [$first('#col_salePriceP_2', popupWindow), $first('#col_localPrice_2', popupWindow)];
            const [debtPriceNodeSale, debtPriceNodeLocal] = [$first('#col_salePriceP_3', popupWindow), $first('#col_localPrice_3', popupWindow)];

            const [priceSale, currencySale] = totalPriceNodeSale ?  $$('span', totalPriceNodeSale).map(pr => getText(pr).replace(',', '.')) : [null, null];
            const [priceLocal, currencyLocal] = totalPriceNodeLocal ? $$('span', totalPriceNodeLocal).map(pr => getText(pr).replace(',', '.')) : [null, null];

            let [nettPriceSale, nettPriceCurrencySale] = nettPriceNodeSale ? $$('span', nettPriceNodeSale).map(pr => getText(pr).replace(',', '.')) : [null, null];
            let [nettPriceLocal, nettPriceCurrencyLocal] = nettPriceNodeLocal ? $$('span', nettPriceNodeLocal).map(pr => getText(pr).replace(',', '.')) : [null, null];

            const [debtPriceSale, _] = debtPriceNodeSale ? $$('span', debtPriceNodeSale).map(pr => getText(pr).replace(',', '.')) : [null, null];
            const [debtPriceLocal, _1] = debtPriceNodeLocal ? $$('span', debtPriceNodeLocal).map(pr => getText(pr).replace(',', '.')) : [null, null];
            const prices = new Prices();
            const nettPriceSaleSum = (parseFloat(nettPriceSale) || 0) + (parseFloat(debtPriceSale) || 0);
            const nettPriceLocalSum = (parseFloat(nettPriceLocal) || 0) + (parseFloat(debtPriceLocal) || 0);
            const grossPriceTypeLocal = mapPriceType(currencyLocal);
            const nettPriceTypeLocal = mapPriceType(nettPriceCurrencyLocal);

            const grossPriceTypeSale = mapPriceType(currencySale);
            const nettPriceTypeSale = mapPriceType(nettPriceCurrencySale);

            prices[`${grossPriceTypeLocal}`].gross = parseFloat(priceLocal) || 0;
            prices[`${grossPriceTypeLocal}`].currency = currencyLocal || nettPriceCurrencyLocal;

            prices[`${nettPriceTypeLocal}`].nett = nettPriceLocalSum;
            prices[`${nettPriceTypeLocal}`].currency = nettPriceCurrencyLocal || currencyLocal;

            prices[`${grossPriceTypeSale}`].gross = parseFloat(priceSale) || 0;
            prices[`${grossPriceTypeSale}`].currency = currencySale || nettPriceCurrencySale;
            prices[`${nettPriceTypeSale}`].nett = nettPriceSaleSum;
            prices[`${nettPriceTypeSale}`].currency = nettPriceCurrencySale || currencySale;

            Object.assign(option, {
                prices
            });
            closeBtn ? closeBtn.click() : null;
        }

    }
    button.textContent = 'Быстрая Заявка в CRM';
    return option;
}

function getPopupWindow() {
    const iframe = document.querySelector('#eaglePopupWindowFrame');
    if ( iframe && iframe.contentDocument && iframe.contentDocument.querySelector('#col_salePriceP_1, #col_localPrice_1') ) {
        return iframe.contentDocument;
    }
    return null;
}

function parseService(tr) {
    const text = getText(tr);
    const description = getNodeProperty(tr.querySelector('td[data-columnname="name"]'));
    const pax = (getNodeProperty(tr.querySelector('[data-columnname="pax"]'), '').match(/\d/g) || []).reduce((init, cur) => +init+ +cur,0);
    const [dateStart, dateEnd] = text.match(getRegexPatterns().date) || '';
    return new quickBookingValue({
        description: description || text.replace(/\d{2}.\d{2}.\d{4}.+?\d{2}.\d{2}.\d{4}/, '').replace(/-\s*:/, ''),
        dateStart,
        dateEnd,
        count: pax
    })
}

function getFlight(sectors) {
    try {
        const parsedSectors = sectors.map(parseSectors);
        return {sectors: parsedSectors}
    } catch (e) {
        return null;
    }
}

function parseSectors(sector) {
    const [departure, arrival] = getText(sector).split(/\s*-->\s*/);
    let [, flightNumber, departureDate, departureTime , arrivalTime,
        departureCity, departureAirportName] = departure
        .match(/([A-Z0-9]{2,3}\s*\d{3,4}).*\s*(\d{2}\.\d{2}\.\d{4})\s*(\d{2}:\d{2})-(\d{2}:\d{2})\s*\+*\d*\s*(.+?)\((.+?)\)/);
    let [, arrivalCity, arrivalAirportName, serviceClass] = arrival.match(/(.+?)\((.+?)\)\s*(.+)/);
    const [departureAirportID, departureAirport, departureTerminal] = extractAirportDate(departureAirportName);
    const [arrivalAirportID, arrivalAirport, arrivalTerminal] = extractAirportDate(arrivalAirportName);
    const additionalDay = departure.match(/\+(\d)/);
    const arrivalDate = additionalDay ?  addDaysToStringDate(departureDate, additionalDay[1]) : departureDate;
    return {segments: [new FlightSegment(
        {
            flightNumber,
            departureDate,
            departureTime,
            departureCity,
            departureAirport,
            departureAirportID,
            departureTerminal,
            serviceClass,
            arrivalDate,
            arrivalTime,
            arrivalCity,
            arrivalAirport,
            arrivalAirportID,
            arrivalTerminal
        })]}
}

function extractAirportDate(airport) {
    const id = airport.match(/[A-Z][A-Z0-9]{2,3}/) || '';
    const name = id ? null : airport.replace(/-[A-Z0-9]$/, '');
    const terminal = airport.match(/[A-Z0-9]$/) || '';
    return [id[0], name, terminal[0]];
}

function parseHotelCoral(tr, country, region) {
    const text = getText(tr.querySelector('[data-columnname="name"]') || tr);
    const [checkinDt, checkoutDt] = text.match(getRegexPatterns().date);
    const [hotelName, ...other] = text.split(getRegexPatterns().date).map(trim);
    const roomAndBoard = lastElement(other);
    const split = roomAndBoard.split(/\d*\s*ADL|CHD|INF|ЕХВ|ВО/g);
    const roomType = split[0].trim();
    const boardType = (split.length > 0 ? lastElement(split).trim() : '');
    const accommodation = roomAndBoard.replace(roomType, '').replace(boardType, '').trim();
    return {
        checkinDt,
        dateStart: checkinDt,
        dateEnd: checkoutDt,
        nights: getDistance(dayMonthYearToDate(checkinDt), dayMonthYearToDate(checkoutDt)).toString(),
        hotelName,
        roomType,
        accommodation,
        boardType,
        country,
        region
    }

}

function filterServiceCallback(tr, type) {
    const img = tr.querySelector('img[style*="images\/Coral\/grid\/resIconSet.png"], img[style*="images\/Sunmar\/grid\/resIconSet.png"]');
    return img && (img.getAttribute('style').match(/background.+?(-*\d+)px;$/) || [])[1] === resIconOffsets[type];
}

function getHotelRowByImage(img) {
    return img.closest('.dxgvDataRow_Coral, .dxgvDataRow_Sunmar');
}

async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const services = {
        insurance: tourOptions.insurance,
        transfers: tourOptions.transfers,
        other: tourOptions.other,
        nettPrice: tourOptions.nettPrice,
        nettPriceCurrency: tourOptions.nettPriceCurrency,
        tourOptions,
        tourOperatorReference: tourOptions.tourOperatorReference
    };
    return services;
}

function parseHotels(tourOptions) {
    return tourOptions.hotels;
}

function parsePassengers(button) {
    const parentRow = getHotelRowByImage(button);
    const id = parentRow.dataset.id;
    const detailedRow = parentRow.parentNode.querySelector(`[id*="ReservationSearch_${id}_detailRow"]`);
    const tourists = querySelectorAll(detailedRow, 'tr[id*="ReservationTouristList"]').filter(quickBookingsFilterCallback);
    return tourists.map(extractPassengerInfo)
}

function extractPassengerInfo(tourist) {
    const passportNumber = getNodeProperty(tourist.querySelector('[data-columnname="passportNumber"]'), '').split(/\s*-\s*/);
    const name = getNodeProperty(tourist.querySelector('[data-columnname="name"]'), '').split(/\s+/);
    return new Passenger(
        {
            birthday: getNodeProperty(tourist.querySelector('[data-columnname="birthDate"]')),
            expire: getNodeProperty(tourist.querySelector('[data-columnname="passportValidThru"]')),
            lastName: name[0],
            firstName: name[1],
            serial: passportNumber[0],
            number: passportNumber[1]
        })
}

function quickBookingsFilterCallback(tr) {
    return tr.clientHeight > 0;
}
