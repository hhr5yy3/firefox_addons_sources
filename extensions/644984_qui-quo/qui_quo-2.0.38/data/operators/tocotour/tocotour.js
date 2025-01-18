window.OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || "Unknown" : "Unknown";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    let country = getCountry();
    if (!country) {
        return null;
    }
    let occupancy = getOccupancy();
    if (!occupancy) {
        return null;
    }

    return {
        "country": country,
        "occupancy": occupancy
    };
}

function getSearchButton() {
    return document.querySelector("#start_search");
}

function injectData() {
    let table = document.querySelector("#resultsTable");
    let head = table ? table.querySelector("thead tr") :null;
    if (head !== null && head.querySelector(".qq") === null) {
        head.appendChild(createHeaderCell());
    }
    querySelectorAll(table, "tbody tr").forEach(function (tr) {
        if (tr !== null && tr.querySelector(".qq") === null && !tr.className.match(/hotel-stop-sale/) && !tr.querySelector(".dataTables_empty")) {
            tr.appendChild(createCell(createOption));
        }
    });
}

function createCell() {
    let newTd = document.createElement("td");
    newTd.appendChild(qqBtns());
    newTd.className = "qq";
    newTd.setAttribute("align","center");
    newTd.style = "width:50px !important";
    return newTd;
}

function createHeaderCell() {
    let newTh = document.createElement("th");
    newTh.appendChild(document.createTextNode("QQ"));
    newTh.className = "qq";
    return newTh;
}

function createOption(img) {
    let tr = getHotelRowByImage(img);
    let tds = tr.querySelectorAll("td");
    const ths = $$("#resultsTable thead tr th");
    let option = {
        checkinDt: tr.querySelector(".date").textContent.match(/\d\d\.\d\d\.\d\d\d\d/)[0],
        nights: tr.querySelector(".nights").textContent,
        hotelName: tr.querySelector(".hotel-name").textContent + " " + tr.querySelector(".hotel-category").textContent,
        href: null,
        roomType: tr.querySelector(".room-name").textContent + ", " + tr.querySelector(".placement-name").textContent,
        region: tr.querySelector(".hotel-place").textContent,
        boardType: getBoardType(tr) ,
        price: getPrice(tr)[0],
        currency: getPrice(tr)[1],
        country: SEARCH_CRITERIA.country,
        city_from: getCity(),
        operator: OPERATOR_NAME,
        excursion: false,
        occupancy: SEARCH_CRITERIA.occupancy,
        flight: getFlight(tds, ths)
    };
    return option;
}

function getFlight(tds, ths) {
    try {
        const fwd = tds[findTableTdIndex(ths, /Вылет из/)];
        const bwd = tds[findTableTdIndex(ths, /Вылет в/)];
        const sectors = [fwd, bwd].map(parseSectors);
        return {sectors}
    }
    catch(e) {
        return null;
    }
}

function parseSectors(s) {
    const patterns = getRegexPatterns();
    const segments = [s].map(segment => {
        const dateAndTime = segment.querySelector('.flight-date');
        const depDateAndTime = getText(dateAndTime);
        const arrDateAndTime = getNodeProperty(dateAndTime, '', 'title');
        const airports = getText(segment.querySelector('.city-airports'), 'innerText').split(/\n/);
        return new FlightSegment({
            flightNumber: getText(segment.querySelector('.way-name-from, .way-name-to')),
            departureDate: (depDateAndTime.match(patterns.date))[0],
            departureTime: (depDateAndTime.match(patterns.time))[0],
            departureCity: "",
            departureAirport: airports[0],
            arrivalDate: (arrDateAndTime.match(patterns.date))[0],
            arrivalTime: (arrDateAndTime.match(patterns.time))[0],
            arrivalAirport: airports[1]
        })
    })
    return {segments}
}

function getBoardType(tr) {
    let food = tr.querySelector(".food-name");
    return food.textContent + ", " + food.parentNode.getAttribute("title");
}

function getPrice(tr) {
    let price = tr.querySelector(".price");
    let priceNoTickets = tr.querySelector(".price1");
    let currency = tr.querySelector(".currency");
    return [price ?  extractIntFromStr(price.textContent) : extractIntFromStr(priceNoTickets.textContent),
            currency ? currency.textContent : priceNoTickets.textContent.replace(/\d+/,"").trim()];
}

function getCountry() {
    let country = document.querySelector(".group-country .filter-option");
    return country ? country.textContent : null;
}

function getCity() {
    let ths = $$("#resultsTable thead tr th");
    const th = findTableTdIndex(ths, /Вылет из/)
    let city = getNodeProperty(ths[th], '').replace("Вылет из", "");
    return city.trim();
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 2,
        childrenCount: 0,
        childAges: null
    };
    let adultsSel = document.querySelector(".group-adults .filter-option");
    let childSel = document.querySelector(".group-children .filter-option");
    if ( !adultsSel || !childSel ) {
        return null;
    }
    occupancy.adultsCount = extractOptionalInt(adultsSel.textContent);
    occupancy.childrenCount = extractOptionalInt(childSel.textContent);

    if ( occupancy.childrenCount > 0 ) {
        let ages = [];
        querySelectorAll(document, ".children-age:not(.hidden) .filter-option").forEach(function (span) {
            ages.push(span.textContent);
        });
        occupancy.childAges = ages.join(",");

    }

    return occupancy;
}

function getHotelRowByImage(img) {
    let tr = img.parentNode;
    while (true) {
        if (tr.tagName === "TR") {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}
