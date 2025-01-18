window.OPERATOR_NAME = "ICS";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    querySelectorAll(document, "#form_id_main").forEach(div => {
        if ( !document.querySelector(".qq") ) {
            div.before(createCell());
        }
    });
}


function createCell() {
    const container = document.createElement("div");
    const btns = createQQContainer({align: "qq-box"});
    btns.style.marginRight = "5px";
    container.append(btns);
    container.classList.add("qq");
    container.style.display = "flex";
    container.style.position = "sticky";
    container.style.top = "24px";
    container.style.marginLeft = "101%";
    container.style.marginBottom = "-48px";
    container.style.width = "45%";
    return container;
}


async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const parsedHotelRows = querySelectorAll(tour, 'tr')
        .filter(tr => tr.querySelector('[title="проживание"]'))
        .map(row => {
          const tds = querySelectorAll(row, "td");
          return {
              tds: tds,
              chDate: dayMonthYearToDate(makeYear4Digits(getText(tds[2]))),
              outDate: dayMonthYearToDate(makeYear4Digits(getText(tds[3]))),
              inc: getText(tds[4])
          }
        });
    const parsedInc = parsedHotelRows.map(obj => {
        const split = obj.inc.split(',');
        return {
            country: split[0]?.trim(),
            region: split[1]?.trim(),
            hotelName: split[2]?.trim(),
            roomType: [split[3]?.trim(), split[5]?.trim()].filter(elem => elem).join(', ' ),
            boardType: split[4]?.trim()
        }
    })
    const extractParsedInc = (key) => parsedInc.map(parsed => parsed[key]).join(', ');
    const priceText = document.querySelector('#tourPrice');
    const flight = await getFlight();
    const flightType = parseFlightType();
    const cityFrom  = $1('[id*="avia_variant"]:checked');
    const cityFromRow = cityFrom ? getNodeProperty(cityFrom.closest('tr').cells[5], '') : null
    let option = {
        checkinDt: parsedHotelRows[0].chDate.toLocaleDateString('ru'),
        nights: getDistance(parsedHotelRows[0].chDate, lastElement(parsedHotelRows).outDate).toString(),
        hotelName: extractParsedInc("hotelName"),
        href: window.location.href,
        country: parsedInc[0].country,
        region: extractParsedInc("region"),
        roomType: extractParsedInc("roomType"),
        boardType: extractParsedInc("boardType"),
        price: extractIntFromStr(getNodeProperty(priceText, '0')),
        currency: priceText ? mapCurrencyUtil(getNodeProperty(priceText.parentNode).replace(/\d+|\s+/g, '')) : 'RUB',
        city_from: flight ? flight.sectors[0].segments[0].departureAirport : cityFromRow,
        operator: window.OPERATOR_NAME,
        flight: flight ? flight : null,
        flightType
    };
    return option;
}
function getNights() {

}

function parseFlightType() {
    const titles = $$('.tourTitle');

    const isReg = titles.find(title => getText(title).match(/регулярн/i));
    const isCharter = titles.find(title => getText(title).match(/чартер/i));
    if ( isReg ) {
        return 'Scheduled'
    }
    if ( isCharter ) {
        return 'Charter'
    }
    return null;
}

async function getFlight() {
    try {
        window.qscript = document.createElement("script");
        window.qscript.src = chrome.runtime.getURL('data/operators/ics/inline_script.js');
        document.head.append(window.qscript);
        await waiting(150)


        const formMain = document.querySelector("#form_id_main");
        const flightTitle = querySelectorAll(formMain, '.title').find(div => getText(div).match(/Выбор рейса/i));
        if ( !flightTitle ) {
            return null;
        }
        const savedItems = sessionStorage.getItem('SFLIGHTS')
        const flightItems = savedItems && savedItems !== 'undefined' ? JSON.parse(sessionStorage.getItem('SFLIGHTS')) : [];
        const flightTable = flightTitle.parentNode.querySelector('table');
        const flightRadio = flightTable.querySelector('input[name="fl"]:checked');
        const flightFirsTr = flightRadio.closest('tr');
        const grp = flightFirsTr.dataset.grp;
        const flightItem = flightItems.find(item => item.gr === grp );
        const sectors = flightItem.routes.map((route) => parseSectors(route, flightItem));
        window.qscript.remove();
        return {sectors};
    } catch (e) {
        console.log(e);
    }
}

function parseSectors(sector, flightItem) {
    const segments = sector.map((sec) => parseSegment(sec, flightItem))
    return {segments}
}

function parseSegment(segment) {
    const [departureAirport, arrivalAirport] = segment.ap;
    const [departureAirportID, arrivalAirportID] = segment.iata;
    const [departureCity, arrivalCity] = segment.city;
    const [departureDate, arrivalDate] = segment.date.map( dt => new Date(dt).toLocaleDateString('ru') );
    const [departureTime, arrivalTime] = segment.time;
    const serviceClass = AVIA_BOOKING_CLASS_CODES ? AVIA_BOOKING_CLASS_CODES[segment.class] || segment.class : segment.class

    const testDiv = document.createElement('div');
    testDiv.innerHTML = segment.bag_text || `<span>${segment.baggage_weight && segment.baggage_weight.ALL ? segment.baggage_weight.ALL.join(' ') : 'Неизвестно' }</span>`;
    return new FlightSegment({
        flightNumber: segment.flight.replace(/\s+/g, ''),
        airline: segment.ac,
        baggage: getText(testDiv),
        travelTime: segment.elapsed,
        serviceClass,
        departureDate,
        departureTime,
        departureAirport,
        departureAirportID,
        departureCity,
        arrivalDate,
        arrivalTime,
        arrivalAirport,
        arrivalAirportID,
        arrivalCity
    })
}

function getHotelRowByImage(img) {
    const formMain = document.querySelector("#form_id_main");
    const tourTitle = querySelectorAll(formMain, '.title').find( div => getText(div).match(/состав тура/i) );
    return tourTitle.parentNode.querySelector('table');
}


//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const tabs = $$('.fullTab');
    const tourTable = tabs.find(tab => getNodeData('.title', tab).match(/Состав тура/));
    const tourTrs = $$('tbody tr', tourTable).map(tr => $$('td', tr));
    const insurance = tourTrs.filter( tds => getNodeProperty(tds[1], '').match(/страховка/)).map(parseService);
    const transfersMain = tourTrs.filter(tds => getNodeProperty(tds[1], '').match(/трансфер/)).map(parseService);
    const transfers = $$('#tblExtra tr')
        .map(tr => $$('td', tr))
        .filter(tds => getNodeProperty(tds[0], '').match(/трансфер/) && $first('[type="checkbox"]', tds[1]) && $first('[type="checkbox"]', tds[1]).checked)
        .map(parseTransfer);
    const prices = new Prices();

    const grossPriceNode = $first('#tourPrice');
    const nettPriceNode = $first('#tourItogo');

    const grossPriceType = mapPriceType(getNodeProperty(grossPriceNode.nextSibling, ''));
    const nettPriceType = mapPriceType(getNodeProperty(nettPriceNode.nextSibling, ''));


    prices[`${nettPriceType}`].nett = parseFloat(getNodeData('#tourWC'));
    prices[`${nettPriceType}`].currency = getNodeProperty(nettPriceNode.nextSibling, '');

    prices[`${grossPriceType}`].gross = parseFloat(getNodeData('#tourPrice'));
    prices[`${grossPriceType}`].currency = getNodeProperty(grossPriceNode.nextSibling, '');

    const services = {
        insurance,
        flightType: tourOptions.flightType,
        transfers: [...transfers, ...transfersMain],
        tourOptions,
        prices
    };
    return services;
}

function getPrices(claimDocument) {
}

function parseService(tds) {
    return new quickBookingValue({
        description: getNodeProperty($1('span',tds[4]) || tds[4], '', 'innerText'),
        dateStart: makeYear4Digits(getNodeProperty(tds[2], '', 'innerText')),
        dateEnd: makeYear4Digits(getNodeProperty(tds[3], '', 'innerText'))
    })
}

function parseTransfer(tds) {
    return new quickBookingValue({
        description: getNodeProperty(tds[0], '', 'innerText'),
        dateStart: makeYear4Digits(getNodeProperty(tds[2], '', 'innerText')),
        dateEnd: makeYear4Digits(getNodeProperty(tds[3], '', 'innerText'))
    })
}

function parsePassengers() {
   const panels = $$(".halfTab table[id*='tt']").filter(panel => panel.offsetHeight > 0);
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const passenger = new Passenger(getInputsValues(panel, {
        birthday: "[name*='bdate']",
        issueDate: "[name*='pass_begins']",
        expire: "[name*='pass_ends']",
        lastName: "[name*='l_name']",
        firstName: "[name^='name']",
        secondName: "[name^='m_name']",
        nationality: "[name*='citizenship']",
        serial: "[name^='passport']",
        number: "[name*='num_passport']",
    }));
    passenger.type = getPassengerType(panel);
    return passenger;
}

function getPassengerType(panel) {
    const title = getNodeProperty($1('.title', panel.parentNode));
    if ( title.match(/Ребенок/i) ) {
        return 'child';
    }
    if ( title.match(/инфант/i) ) {
        return 'infant';
    }
    return 'adult';
}
