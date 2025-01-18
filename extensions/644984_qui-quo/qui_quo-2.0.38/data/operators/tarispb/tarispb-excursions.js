var OPERATOR_NAME = "Тари Тур";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    querySelectorAll(document, ".row-tour-cost").forEach(div => {
        var tourDiv = div.closest("div.row");
        if ( tourDiv && !tourDiv.querySelector(".qq") ) {
            tourDiv.append(createCell("col m12 qq"));
        }
    });
    querySelectorAll(document, ".event_card .card").forEach(div => {
        div.style.paddingBottom = "50px";
        var buyBtn = div.querySelector(".bottom_card_row .booking-div");
        if ( !buyBtn.querySelector(".qq") ) {
            buyBtn.append(createCell("qq"));
        }
    });
}

function createCell(className) {
    var newDiv = document.createElement("div");
    newDiv.className = className;
    newDiv.style = "text-align:right";
    newDiv.append(createAddButton());
    newDiv.append(createEditButton());
    return newDiv;
}

function createOption(img) {
    var excursionsDay = getHotelRowByImage(img);
    excursionsDay = excursionsDay ? excursionsDay : document;
    var excursion = getExcCard(img);
    excursion = excursion ? excursion : img.parentNode.parentNode
    var tourName =  excursion.querySelector(".row-tour-name");
    var option = {
        checkinDt: getDate(excursionsDay),
        nights: getNights(excursion),
        hotelName: tourName.textContent.trim(),
        href: tourName.tagName === "A" ? tourName.href : null,
        roomType: getLocationFromTo(excursion),
        region: "Санкт-Петербург",
        boardType: "",
        price: extractIntFromStr(excursion.querySelector(".row-tour-cost,.event_price").textContent.trim()),
        currency: mapCurrency(excursion.querySelector(".row-tour-cost, .event_price")),
        country: "Россия",
        city_from: "",
        operator: OPERATOR_NAME,
        excursion: true,
        thumbnail: getThumbnail(excursion),
        occupancy: null
    };
    return option;
}

function getDate(exc) {
   var date = exc.querySelector(".ev_day_text").textContent.match(/(\d+)(.+)/);
   var day = date[1];
   var month = date[2].trim();
   return appendYear(day, monthNameToNumber(month));
}

function  getNights(excursion) {
    var duration =  excursion.querySelector(".event_duration_row");
    duration = duration ? duration.textContent.match(/\((\d+)\s*(д|н).+\)/) : null;
    return duration ? duration[1] : "1";
}

function  getLocationFromTo(excursion) {
    var text = excursion.querySelector(".event_duration_row, .row-tour-name").parentNode.innerText.trim();
    var from = text.match(/Место отправления:.+/);
    var to = text.match(/Место окончания:.+/);
    var result = [ from ? from[0] : ""];
    result.push(to ? to[0] : '');
    result = result.filter( elem => { return elem });
    if ( result.length === 0 ) {
        from = excursion.querySelector(".event_card_place_start");
        result.push(from ? "Место отправления: " + from.textContent.replace('place', "") : "");
    }
    return result.filter( elem => { return elem }).join(", ");
}

function mapCurrency(price) {
    var priceText = price.textContent.replace(/\d+|\s+|,/g,"");
    switch (priceText) {
        case "€" : return "EUR";
        case "$" : return "USD";
        case "руб" : return "RUB";
        default : return priceText;
    }
}

function getThumbnail(excursion) {
    var image = excursion.querySelector(".responsive-img, .event_image");
    return image ? image.src : null;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (div) {
        if ( div.className === "ev_day_excursions" ) {
            break;
        }
        div = div.parentNode
    }
    return div;
}

function getExcCard(img) {
    var div = img.parentNode;
    while (div) {
        if (div.className && div.className.match(/event_card/) ) {
            return div;
        }
        div = div.parentNode
    }
    return null;
}