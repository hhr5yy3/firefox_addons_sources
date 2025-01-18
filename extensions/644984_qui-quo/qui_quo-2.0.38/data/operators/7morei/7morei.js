const OPERATOR_NAME = "7 Морей";
const showTopHotelsRating = true;

function initializeSearchCriteria() {
    const occupancy = getOccupancy(".new_f-container ");
    const city = getNodeProperty(document.querySelector("#new_os-from .new_f-dropdown-btn-text"), null);
    return {
        "occupancy": occupancy,
        "city": city
    }
}

function getSearchButton() {
    return document.querySelector(".new_f-form-submit");
}

function injectData() {
    const details = document.querySelector(".new_t-container .new_t-acc-body");
    if ( details && !details.querySelector(".qq") ) {
        details.append(createOrderCell());
    }
    querySelectorAll(document, ".new_t-offers .new_t-tour-item .new_t-price").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createTableCell());
        }
    });
}

function createTableCell() {
    const buttons = qqBtns({},createTableOption);
    buttons.style.width = "100%";
    buttons.style.justifyContent = "center";
    return buttons;
}

function createOrderCell() {
    const buttons = qqBtns({},createTableOption);
    const detailsRow = document.createElement("div");
    const rightCol = document.createElement("div");
    const leftCol = document.createElement("div");
    detailsRow.classList.add("new_t-details-row", "qq");

    rightCol.classList.add("new_t-details-col");
    rightCol.style = "padding:0px 0px 0px 17px;";
    rightCol.append(buttons);

    leftCol.classList.add("new_t-details-col", "qq");
    leftCol.innerHTML =  '<span style="color:red;">Q</span>ui-<span style="color:red;">Q</span>uo:';

    buttons.style.width = "100%";
    buttons.style.justifyContent = "left";

    detailsRow.append(leftCol, rightCol);

    return detailsRow;
}

function createTableOption(img) {
    const tour = getHotelRowByImage(img);
    const price = tour.querySelector(".new_price");
    const initialCurrency = tour.querySelector(".new_t-bonuses .currency");
    let region = getText(document.querySelector(".new_t-hotel-geo")).split(",");
    let option = {
        checkinDt:  getDate(tour.querySelector(".new_t-details-date")),
        nights: getText(tour.querySelector(".new_t-duration")).match(/(\d+)\s*н/)[1],
        hotelName: document.querySelector(".new_t-hotel-name").title,
        hotel_desc: getNodeProperty(document.querySelector(".new_t-hotel-short-desc")),
        href: window.location.href,
        country: region.pop().trim(),
        region: region.join(),
        roomType: getText(tour.querySelector(".new_t-room")),
        boardType: getText(tour.querySelector(".new_t-food")),
        price: extractIntFromStr(getText(price).replace(/\s+/g,"")),
        initial_price: initialCurrency ?  parseInt(getNodeProperty(initialCurrency.previousSibling, "").replace(/\s+/g,"")) : null,
        currency: mapCurrencyUtil(getText(price.querySelector(".currency"))),
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME + " / " + getNodeProperty(tour.querySelector(".new_t-bonuses div, .new_t-operator"), ""),
        thumbnail: getImg(),
        occupancy: SEARCH_CRITERIA.occupancy,
        flight: getFlight(tour)
    };
    return option;
}

function getDate(node) {
    const date = getText(node).split(" ");
    return dateFromDayAndMonthName(date[0], date[1], parseInt(date[2]));
}

function getImg() {
    const image = document.querySelector(".active .new_r-item-img");
    return image ? image.dataset.original : null;
}

function getFlight(tour) {
    try {
        const sectorsElements = querySelectorAll(tour, ".new_t-details-date")
            .map(date => date.parentNode)
            .filter(sector => sector.querySelector(".new_t-details-ports") && sector.querySelector(".new_t-details-fly"));
        if ( sectorsElements.length !== 2 ) {
            return null;
        }
        const sectors = sectorsElements.map(element => {
            return { segments: createSegments(element)};
        });
        return {sectors: sectors};
    } catch (e) {
        return null;
    }
}

function createSegments(sector) {
    const date = getDate(sector.querySelector(".new_t-details-date"));
    const ports = getText(sector.querySelector(".new_t-details-ports")).split("→");
    const details = getText(sector.querySelector(".new_t-details-fly"));
    const time = details.match(/\d{2}:\d{2}:\d{2}/)[0];
    const flightNumber = details.replace(time, "").trim().split("/");
    const stops = flightNumber.length;
    const segments = createVoidSegments(stops);
    segments[0].flightNumber = flightNumber[0];
    segments[0].departureDate = date;
    segments[0].departureTime = time ? time.match(/\d{2}:\d{2}/)[0] : null;
    segments[0].departureAirportID = ports[0].split("-")[0].trim().match(/[A-Z][A-Z0-9]{2,3}/)[0];
    segments[0].departureTerminal = (ports[0].split("-")[1]||"").trim();

    lastElement(segments).arrivalAirportID = ports[1].split("-")[0].trim().match(/[A-Z][A-Z0-9]{2,3}/)[0];
    lastElement(segments).arrivalTerminal = ports[1].split("-")[1].trim();

    return segments;
}

function createVoidSegments(stops) {
    let segments = [];
    for (let i = 0; i < stops; i++) {
        segments.push(new FlightSegment())
    }
    return segments;
}

function getOccupancy(form) {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const adults = document.querySelector(form + ".new_f-people-item.people-2.active");
    const children = querySelectorAll(document.querySelector(form), ".new_f-container .new_f-children-list-item");
    if ( !adults ) {
        return null;
    }
    occupancy.adultsCount = extractOptionalInt(adults.dataset.value);
    occupancy.childrenCount = children.length;
    if ( occupancy.childrenCount > 0 ) {
        let ages = [];
        children.forEach(div =>  {
            ages.push(div.dataset.value);
        });
        occupancy.childAges = ages.join(",");
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.classList.contains("new_t-tour-item") || div.classList.contains("new_t-acc-body") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}