window.OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || "Unknown" : "Unknown";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    const searchForm = document.querySelector('.search_background');
    if ( !searchForm ) {
        return null;
    }
    const city = selectedOption(document.querySelector("#terminal_id"));
    const country = selectedOption(document.querySelector("#states"));
    if ( !country ) {
        return null;
    }

    return {
        "city": city,
        "country": country
    }
}

function getSearchButton() {
    return document.querySelector(".btn.btn-success.btn-large.get_tours, .get_tours_btn, .get_tours_button");
}

function injectData() {
    querySelectorAll(document, ".interval_tour_row").forEach(tr => {
        if ( !tr.querySelector(".qq") ) {
            tr.prepend(createCell());
        }
    });
    const thead = document.querySelector("#dataTable thead tr");
    if ( thead && !thead.querySelector(".qq") ) {
        thead.prepend(createHeaderCell());
    }
    const iframe = document.querySelector(".row_excursion_desc iframe");
    if ( iframe &&  iframe.contentDocument && iframe.contentDocument.body && iframe.contentDocument.body.dataset.searchCriteia !== JSON.stringify(SEARCH_CRITERIA)) {
        iframe.contentDocument.body.dataset.searchCriteia = JSON.stringify(SEARCH_CRITERIA);
    }

    $$('.price.bron.price_button, .hotel_desc').forEach(f => {
        f.onclick = () => setTimeout(()=> sendMessageToAddon("reinject content-scripts"), 1500 );
    })
}

function createCell() {
    const newTd = document.createElement("td");
    newTd.append(qqBtns());
    newTd.className = "qq";
    return newTd;
}

function createHeaderCell() {
    const th = document.createElement("th");
    th.className = "qq";
    th.style.width = '10px';
    th.append(document.createTextNode("QQ"));
    return th;
}

function createOption(img) {
    const tr = getHotelRowByImage(img);
    const ths = querySelectorAll(document, "#dataTable thead tr th");
    const tds = tr.querySelectorAll("td");
    const iframeSearchCriteria = document.body.dataset.searchCriteia;

    const checkinDt = getNodeProperty(tr.querySelector('.date_in_td'), '') || tds[findIndex(ths, /Дата\s+заезда/i)].textContent.trim()
    const checkoutDt = getNodeProperty(tr.querySelector('.date_out_td'), '') || tds[findIndex(ths, /Дата\s+выезда/i)].textContent.trim()
    const nights = getNodeProperty(tr.querySelector('.night_td'), '') || getNodeProperty(tds[findIndex(ths, /Ночи/i)]) || (iframeSearchCriteria ? tds[2].textContent.trim() : tds[3].textContent.trim())
    const city_from = SEARCH_CRITERIA ? SEARCH_CRITERIA.city : JSON.parse(iframeSearchCriteria).city;
    const transportTd = getNodeData('.transport_td', tr);
    let dateStart = null;
    if ( transportTd ) {
        const dates = transportTd.match(getRegexPatterns().date);
        if (dates && dates.length > 1 ) {
            dateStart = makeYear4Digits(dates[0]);
        }
    }
    const option = {
        checkinDt: dateStart || checkinDt,
        nights: nights || String(getDistance(checkinDt, checkoutDt)),
        extra_nights: dateStart ? String(getDistance(dateStart, checkoutDt)  - parseInt(nights)) : "0",
        hotelName: getHotelName(tr),
        href: null,
        roomType: getNodeProperty(tr.querySelector('.type_room_td'), '') ||tds[findIndex(ths, /Тип номера/i)].textContent.replace(/\s+|↵/g, " ").trim(),
        region: getNodeProperty(tr.querySelector('.region_td > div'), '') || getNodeProperty(tds[findIndex(ths, /Регион/i)].querySelector("div")),
        boardType: getNodeProperty(tr.querySelector('.type_food_td'), '') || getNodeProperty(tds[findIndex(ths, /Тип питания/i)]),
        price: getPrice(tr, ths, tds),
        currency: mapCurrencyUtil(getCurrency(tr, ths, tds)),
        country: SEARCH_CRITERIA ? SEARCH_CRITERIA.country : JSON.parse(iframeSearchCriteria).country,
        city_from: city_from && city_from.match(/[A-zА-я]/) ? getDataByCode(city_from, "region") || city_from : "",
        thumbnail: getNodeProperty(tr.querySelector('.hotel_icon'), null, 'src'),
        occupancy: getOccupancy(),
        flight: getFlight(tr, checkinDt)
    }
    return option;
}

function getHotelName(tr) {
    let name =
        getNodeData('.get_desc_hotel_btn', tr, 'innerText') ||
        getNodeData('.hotel_desc', tr, 'innerText') ||
        getNodeData('.hotel_td', tr, 'innerText');
    name = trim(name.replace(/(поставщик|prețul\s+furnizorului).+/i, ''));
    return name.replace(/\((\d+)\*?\)/, '$1*');
}

function getFlight(tr, checkinDt) {
    if ($1('img[src*="/airlines/"][src$=".png"]')) {
        try {
            const flightCell = $1('.transport_td', tr);
            const sectors = $$('img[src*="available_depart"],img[src*="available_return"]', flightCell).map(
                parseSector
            );
            sectors[0].segments[0].arrivalDate = checkinDt;
            return { sectors };
        } catch (e) {
            console.log(e);
            return null;
        }
    }
    return null;
}

function parseSector(img) {
    let [flightMatch, airline, departureAirportID, arrivalAirportID, flightNumber] = [];
    try {
        [flightMatch, airline, departureAirportID, arrivalAirportID, flightNumber] = /^\p{L}{1,2}\s*(.*)\s+([^-\s]+)-([^-\s]+)\s+(.*)$/gu.exec(img.title || '') || [];
        if (!flightMatch)
            [flightMatch, airline, departureAirportID, arrivalAirportID, flightNumber] = /(.*)\s+([^-\s]*)-([^-\s]\s+(.*))$/g.exec(img.title || '') || [];
    } catch (e) {
        console.error(e);
        [flightMatch, airline, departureAirportID, arrivalAirportID, flightNumber] = /(.*)\s+([^-\s]*)-([^-\s]\s+(.*))$/g.exec(img.title || '') || [];
    }
    const [timeMatch, day, month, year, departureTime] =
        /(\d{2})\.(\d{2})\.(\d{2}).*(\d{2}:\d{2})/g.exec((getText(img.parentElement) || '').replace(/\n/g, ' ')) || [];
    const departureDate = dayMonthYearToString(day, month, year);
    if (flightMatch && timeMatch) {
        return {
            segments: [
                new FlightSegment({
                    airline: airline ? airline.replace(/#/g, '') : '',
                    flightNumber,
                    departureDate,
                    departureTime,
                    departureAirportID,
                    arrivalAirportID,
                    arrivalDate: departureDate
                })
            ]
        };
    }
}

function getPrice(tr, ths, tds) {
    let btn = tr.querySelector(".price.bron, .btn_price_in, .price_td");
    if ( !btn ) {
        btn = tds[findIndex(ths, /Цена/i)];
    }
    return extractIntFromStr(btn.textContent);
}

function getCurrency(tr, ths, tds) {
    let btn = tr.querySelector(".price.bron, .btn_price_in, .price_td");
    if ( !btn ) {
        btn = tds[findIndex(ths, /Цена/i)];
    }
    const text = btn.textContent.replace(/\d+|\.|[А-я]+/g, "").trim();
    switch ( text ) {
        case "USD":
            return "USD";
        case "EUR":
            return "EUR";
        default :
            return text;
    }
}

function getOccupancy() {
    const occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const adults = document.querySelector("#adults");
    const childs = document.querySelector("#childs");
    if ( !adults || !childs ) {
        return null;
    }
    occupancy.adultsCount = +adults.value;
    occupancy.childrenCount = +childs.value;

    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = querySelectorAll(document, "#children_items input").map(input => {
            return input.value;
        }).join();
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while ( true ) {
        if ( div.className.match("interval_tour_row") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

function findIndex(ths, caption) {
    return ths.findIndex(function (th) {
        return !!(th.textContent.match(caption) || th.title.match(caption) || getNodeData('[title]', th, 'title', '').match(caption) );

    });
}
