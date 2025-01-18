var OPERATOR_NAME = "Путевкамаркет";

function injectData() {
    querySelectorAll(document, ".hotel_prices .tours tr").forEach( tr => {
        if ( !tr.querySelector(".qq") && !tr.querySelector("th") ) {
            tr.append(createCell());
        }
        if ( !tr.querySelector(".qq") && tr.querySelector("th") ) {
            tr.append(createHeader());
        }
    });
}


function createCell() {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());

    var newTd = document.createElement("td");
    newTd.className = "qq text_center";
    newTd.appendChild(nobr);

    return newTd
}

function createHeader() {
    var newTh = document.createElement("th");
    newTh.className = "qq";
    newTh.setAttribute("style", "padding: 5px;");
    newTh.setAttribute("align", "center");
    newTh.textContent = "QQ";
    return newTh;
}


function getCity() {
    return selectedOption(document.getElementById("tv_departure"));
}

function getCountry() {
    return selectedOption(document.getElementById("TV_COUNTRIES"));
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    var adults = document.querySelector("#tv_adults");
    var kids = document.querySelector("#tv_adults");
    if ( !adults || !kids ) {
        return null;
    }

    occupancy.adultsCount = extractIntFromStr(selectedOption(adults));
    occupancy.childrenCount = extractIntFromStr(selectedOption(kids));

    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = querySelectorAll(document, "select[id*=tv_childage]").slice(0, occupancy.childrenCount).map( select => {
            return selectedOption(select).replace(/\D+/g,"");
        }).join();
    }

    return occupancy;
}

function initializeSearchCriteria() {
    var country = getCountry();
    if ( !country ) {
        return null;
    }
    var city = getCity();
    if ( !city ) {
        return null;
    }

    return { "country" : country,
        "city" : city,
        "occupancy" : getOccupancy()};
}

function getSearchButton() {
    return Array.fromList(document.querySelectorAll("#tv_run_search"));
}

// --------- Rows ---------------------------------

function extractPrice(tds, tr) {
    var td = isOperatorShown(tr) ? tds[6] : tds[5];
    return +td.textContent.replace(/\D+/g, "");
}

function extractDate(s) {
    var m = s.match(/(\d\d)\s+([^\s]+)/);
    return dateFromDayAndMonthName(m[1], m[2]);
}

function extractCurrency(tds,tr) {
    var td = isOperatorShown(tr) ? tds[6] : tds[5];
    return td.textContent.replace(/\d+|\s+/g, "");
}

function extractHotelName(div) {
    return trim(div.querySelector(".hotel_name").textContent) + " " + trim(div.querySelector(".hotel_stars").textContent);
}

function extractHref(div) {
    var a = div.querySelector("a.ts_hotel_name");
    return a ? a.href : null;
}

function createOption(img) {
    var tr = getHotelRowByImage(img);
    var tds = querySelectorAll(tr, "td");
    var hotelDiv = tr.parentNode.parentNode.parentNode.previousElementSibling;

    var option = {
        checkinDt : tds[0].textContent,
        nights : tds[1].textContent,
        region : hotelDiv.querySelector(".region_info").textContent.replace(SEARCH_CRITERIA.country, "").trim(),
        boardType : tds[4].textContent,
        href : extractHref(hotelDiv),
        currency : extractCurrency(tds, tr),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        roomType: tds[2].textContent + ", " + tds[3].textContent,
        hotelName : extractHotelName(hotelDiv),
        price : extractPrice(tds, tr),
        operator : extractOperator(tds, tr),
        thumbnail : getNodeProperty(hotelDiv.querySelector(".tv_detail_hotel img"), null, "src"),
        occupancy : SEARCH_CRITERIA.occupancy
    };
    return option
}

function extractOperator(tds, tr) {
    var result = OPERATOR_NAME;

    if (isOperatorShown(tr)) {
        var oper =tr.querySelector(".operator img").title.replace(/Переход на сайт/, "").trim();
        result += " / " + oper;
    }
    return result;
}

function isOperatorShown(tr) {
    return !!tr.querySelector(".operator");
}

function getHotelRowByImage(img) {
    var elem = img.parentNode;
    while (elem) {
        if ( elem.tagName === "TR" ) {
            break;
        }
        elem = elem.parentNode;
    }
    return elem;
}