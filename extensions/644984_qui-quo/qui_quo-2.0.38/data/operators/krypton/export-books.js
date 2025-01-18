window.OPERATOR_NAME = "Krypton";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const topContainer = $1('.topContainer');
    if (topContainer && !$1(' .qq',topContainer) ) {
        const {container} = createQuickBookingContainer()
        container.style.position = 'fixed';
        container.style.top = '10em';
        container.style.left = '10em';
        topContainer.append(container)
    }
}

function createOption(img) {
    const hotels = $$('.cart-section-leftCol').filter(s => getText(s).match(/отель/i))
        .map(d => d.closest('.container '))
        .map(parseHotel)

    const prices = new Prices();

    prices.nationalCurrency = "RUB";
    prices.nationalGrossPrice = parseFloat(getTextFromTd(/Полная стоимость тура/i));
    prices.nationalNettPrice = parseFloat(getTextFromTd(/СТОИМОСТЬ ДЛЯ АГЕНТА/i));

    let option = {
       ...hotels[0],
        prices,
        hotels
    };

    option.checkinDt = hotels[0].dateStart;
    option.hotels = hotels;
    return option;
}

function parseHotel(hotelTable) {
    const tds = $$('td', hotelTable).extractNodesText();
    const ths = $$('th', hotelTable);
    const dateString = tds[findTableTdIndex(ths, /Даты/i)];
    const [dateStart] = dateString.match(getRegexPatterns().date).map(makeYear4Digits);
    const nights = dateString.match(/\s+(\d+)\s+ноч/)[1]
    const regionName = getTextFromTd(/Страна/i);
    const [country, ...region] = regionName.split(/\s+/)
    return {
        nights, dateStart,
        hotelName: getNodeData('.hotel-link'),
        roomType: trim(tds[findTableTdIndex(ths, /Категория/i)]),
        accommodation: tds[findTableTdIndex(ths, /Размещение/i)],
        boardType: tds[findTableTdIndex(ths, /Питание/i)],
        region: region.join(' '),
        country
    }
}

function collectServices() {
    const all = $$('.cart-section')
        .filter(tr => tr.clientHeight > 0).map(section => {
            const rows = $$('tr', section);
            rows.shift();
            return {
                title: getNodeData('.cart-section-title', section),
                rows
            }
        });
    const additional = all.find(elem => elem.title.match(/Доп. услуги/i))
    const transfers = (all.find(elem => elem.title.match(/Трансфер/i)) || {rows: []}).rows.map(parseService);
    const transfersAdditional = (additional ? additional.rows.filter(tr => tr.clientHeight > 0 && getText(tr).match(/Трансфер/i)) : []).map(parseTransfers);
    const insurance = (all.find(elem => elem.title.match(/Страховка/i)) || {rows: []}).rows.map(parseService);
    return {
        transfers: [...transfers, ...transfersAdditional],
        insurance
    }
}

function parseService(row) {
    const dates = getNodeData('[data-bind*="text:moment"]', row, 'textContent', '').split(/\s*-\s*/);
    const [dateStart, dateEnd] = dates.map(dt => makeYear4Digits(dt));
    return new quickBookingValue({
        description: getNodeData('[data-bind="text:Data.Data.name"]', row),
        dateStart,
        dateEnd
    })
}

function getTextFromTd(caption) {
    const allTd = $$('td');
    const searchedTd = allTd.find(td => getText(td).match(caption))
    return searchedTd ? trim(getText(searchedTd.nextElementSibling)) : null;

}

function parseTransfers(tr) {
    const description = trim(getText(tr.querySelector('td')));
    const dateStart = description.match(/\d{2}\.\d{2}/) ? appendYear(description.match(/(\d{2})\.(\d{2})/)[1], description.match(/(\d{2})\.(\d{2})/)[2]) : null;
    return new quickBookingValue({
        description: description.replace(/\d{2}\.\d{2}/, ''),
        dateStart
    })
}

function getHotelRowByImage(img) {
    return document.body;
}

//-----------------------------------------------quickBooking Export---------------------------------//
function createQuickBookingOption(button) {
    const tourOptions = createOption(button);
    const {insurance, transfers, other} = collectServices()
    const services = {
        insurance,
        transfers,
        other,
        tourOptions,
        prices: tourOptions.prices,
        hotels: tourOptions.hotels
    };
    return services;
}

function getPrices(claimDocument) {
}


function parsePassengers() {
    const passengerTable = $$('.cart-section-leftCol').find(s => getText(s).match(/Туристы/i)).closest('.container')
    const panels = $$(".cart-section-rightCol tr", passengerTable).slice(1).filter(panel => panel.offsetHeight > 0);
    return panels.map(panel => extractPassengerInfo(panel, $$('th', passengerTable)));
}

function extractPassengerInfo(panel, ths) {
    const tds = $$('td', panel);
    const fio = getText(tds[findTableTdIndex(ths, /Турист/i)])
    const [lastName, firstName, secondName] = fio.split(/\(|\)/)[1].split(/\s+/);
    const passenger = new Passenger( {
        sex:  getNodeData('.custom-label-sex.active', panel) === "Ж" ? "2" : "1",
        birthday: getText(tds[findTableTdIndex(ths, /Дата рождения/i)]),
        issueDate: getText(tds[findTableTdIndex(ths, /Дата документа/i)]),
        lastName,
        firstName,
        secondName,
        number: getText(tds[findTableTdIndex(ths, /Номер документа/i)])
    });
    return passenger;
}
