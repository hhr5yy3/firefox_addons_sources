var OPERATOR_NAME = "haverest.com.ua";
var OPERATOR_CURRENCY = "Otpusk";
var DEFAULT_CURRENCY = "UAH";

function initializeSearchCriteria() {
    var occupancy = getOccupancy();
    if ( !occupancy ) {
        return null;
    }
    var city = getTableCity();
    if ( !city ) {
        return null;
    }
    return {
        "occupancy": occupancy,
        "city" : city
    };
}

function getSearchButton() {
    return document.querySelector(".os-form-submit_button");
}

function injectData() {
    var tour = document.querySelector(".os-tour-price");
    if (tour && !tour.querySelector(".qq") && window.location.href.match(/page=tour/)) {
        tour.appendChild(createCell());
    } else {
        injectCurrencySelection();
        querySelectorAll(document, ".os-offer-price").forEach(function (a) {
            if (!a.parentNode.querySelector(".qq")) {
                a.parentNode.appendChild(createTableCell());
            }
        });
    }
}

function createCell() {
    var newDiv = document.createElement("div");
    newDiv.appendChild(createAddButton(createOption));
    newDiv.appendChild(createEditButton(createOption));
    newDiv.className = "qq";
    newDiv.style = "float: right";
    return newDiv;
}

function createTableCell() {
    var newSpan = document.createElement("div");
    newSpan.appendChild(createAddButton(createTableOption));
    newSpan.appendChild(createEditButton(createTableOption));
    newSpan.className = "qq";
    return newSpan;
}

function createOption(img) {
    var tour = getHotelRowByImage(img);
    var items = querySelectorAll(tour, ".os-tour-info-food_item");
    var option = {
        checkinDt: getDate(tour, ".os-tour-info-dates-from_value"),
        nights: extractIntFromStr(tour.querySelector(".os-tour-info-dates_total").textContent).toString(),
        hotelName: window.location.href.match(/hnm=(.+)&oid/)[1].toUpperCase().replace(/_/g," "),
        href: window.location.href.replace("page=tour", "page=hotelInfo"),
        roomType: findItem(items, /Номер:/i),
        region: getRegion(tour, ".os-tour-geo_locale"),
        boardType: findItem(items, /Питание:/i),
        price: extractIntFromStr(tour.querySelector(".os-tour-price_value").textContent.replace(/\s+/g,"")),
        currency: mapCurrency(tour.querySelector(".os-tour-price_value .currency").textContent),
        country: getCountry(tour, ".os-tour-geo_locale"),
        city_from: getCity(tour),
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getImg(tour, ".os-tour_pict img"),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function createTableOption(img) {
    var tour = getHotelRowByImage(img);
    var cell = img.parentNode.parentNode;
    var table = cell.parentNode;
    var href = cell.querySelector(".os-offer-price").href;
    var option = {
        checkinDt: getDate(cell, ".os-offer-price_date"),
        nights: (extractIntFromStr(href.match(/ol=(\d+)/)[1]) - 1).toString(),
        hotelName: tour.querySelector(".os-result-title_link").textContent,
        href: href.replace("page=tour", "page=hotelInfo"),
        roomType: tour.querySelector(".os-result_pricetitle").textContent,
        region: getRegion(tour, ".os-result-geo_locale"),
        boardType: table.querySelector(".food-symbol").parentNode.innerText.trim(),
        price: getPriceAndCurrency(cell)[0],
        currency: getPriceAndCurrency(cell)[1],
        country: getCountry(tour, ".os-result-geo_locale"),
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getImg(tour, ".os-result_pict_url img"),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}


function getDate(tour, sel) {
    var date = tour.querySelector(sel).textContent.match(/\d+\s\D+/)[0].split(",")[0];
    var month = date.replace(/\d+/, "").trim();
    var day = date.match(/\d+/)[0];
    return appendYear(day, monthNameToNumber(month));
}

function getRegion(tour, sel) {
    return tour.querySelector(sel).textContent.split(",")[1].trim();
}

function getPriceAndCurrency(cell) {
    var fprice = extractIntFromStr(cell.querySelector(".os-offer-price_value_fcurrency").textContent.replace(/\s+/g, ""));
    var orig_price = extractIntFromStr(cell.querySelector(".os-offer-price_value").textContent.replace(/\s+/g, ""));
    var fcurrency = cell.querySelector(".os-offer-price_value_fcurrency .currency").textContent;
    var orig_currency= cell.querySelector(".os-offer-price_value .currency").textContent;
    if ( isPrefferedDefaultCurrency() ) {
       return [orig_price, mapCurrency(orig_currency)];
    }
    return  [fprice, mapCurrency(fcurrency)];
}


function mapCurrency(text) {
    switch (text.toUpperCase()) {
        case "€": return "EUR";
        case "ГРН": return "UAH";
        case "$": return "USD";
        default: return text;
    }
}

function getCountry(tour, sel) {
   return tour.querySelector(sel).textContent.split(",")[0].trim();
}

function getCity(tour) {
    var sel = tour.querySelector(".os-tour-info-dates-from_info");
    return sel ? sel.textContent.split("—")[0].trim() : "";
}

function getTableCity() {
    return selectedOption(document.querySelector(".os-point-from select"));
}

function getImg(tour, sel) {
   var image = tour.querySelector(sel);
   return image ? image.src : null;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var adults = document.querySelector(".people select");
    var children = document.querySelector(".children select");
    if ( !adults || !children ) {
        return null;
    }
    occupancy.adultsCount =  extractOptionalInt(selectedOption(adults));
    occupancy.childrenCount = extractOptionalInt(selectedOption(children));
    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        querySelectorAll(document, ".cnt[style='display: inline-block;'] input").forEach(function (input) {
            ages.push(input.value);
        });
        occupancy.childAges = ages.join(",");

    }
    return occupancy;
}


function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (true) {
        if (div.className === "os-tour" || div.className === "os-result") {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

function findItem(items, title) {
    var desc = items.find(function (item){
        if ( item.textContent.match(title)) {
            return true;
        }
        return false;
    });
    return desc ? desc.querySelector(".os-tour-info-food_value").textContent : null;
}

function injectCurrencySelection() {
    if( document.querySelector("#qq-currency") ) {
        return;
    }
    var submit = document.querySelector(".os-form-submit_button");
    if ( !submit ) {
        return;
    }
    addCurrencySelection(submit);
    addAddonMessageListener("haverest.com.ua currency", function(currency) {
        document.querySelector("#qq-currency select").value = currency ? currency : DEFAULT_CURRENCY;
        document.querySelector("#qq-currency").setAttribute("style", "display: block;");
    });
    sendMessageToAddon("get operator currency", OPERATOR_CURRENCY);
}

function addCurrencySelection(submit) {
    var div = document.createElement("div");
    div.id = "qq-currency";
    div.setAttribute("style", "display: none;");
    div.className = "container";


    var legend = document.createElement("legend");
    legend.className = "os-block_label";
    legend.innerHTML = "Выберите предпочитаемую валюту для <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo:";
    div.appendChild(legend);

    var select = document.createElement("select");
    select.className = "os-block_select";
    select.onchange = function () {
        sendMessageToAddon("set operator currency", {operator: OPERATOR_CURRENCY, currency: select.value});
    };

    var defaultCurr = document.createElement("option");
    defaultCurr.value = DEFAULT_CURRENCY;
    defaultCurr.textContent = DEFAULT_CURRENCY;
    select.appendChild(defaultCurr);

    var foreign = document.createElement("option");
    foreign.value = "USDEUR";
    foreign.textContent = "USD / EUR";
    select.appendChild(foreign);

    div.appendChild(select);

    submit.parentNode.parentNode.appendChild(div, submit);
}

function isPrefferedDefaultCurrency() {
    var sel = document.querySelector("#qq-currency select");
    return !sel || sel.value !== "USDEUR";
}