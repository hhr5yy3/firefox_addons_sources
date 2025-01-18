var OPERATOR_NAME = "Кандагар";

//-------- Search Criteria ---------------------------

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

// --------- Rows ---------------------------------

function getCountry(rac) {
    return rac[1].textContent;
}

function mapCurrency(s) {
    var c = trim(s).toUpperCase();
    switch (c) {
        case "РУБ": return "RUB";
        case "ГРН": return "UAH";
        case "$": return "USD";
        case "EU": return "EUR";
    }

    return c;
}

function extractDate() {
    var dateDiv = document.querySelector("div.offers_desc");
    var match = dateDiv.textContent.match(/\d+.\d+.\d{4}/);
    return match ? match[0] : dateDiv.textContent;
}

function extractHotelName() {
    var hotelH1 = document.querySelector("td.center-area h1");
    var match = hotelH1.textContent.match(/"(.+)".+(\d)/);
    return match ? match[1] + " " + match[2] + "*" : hotelH1.textContent;
}

function extractHotelUrl() {
    return document.querySelector("li#tab1 a").textContent;
}

function extractRegion(rac) {
    return rac[3] ? rac[3].textContent : rac[2].textContent;
}

function extractRoomType(div) {
    return trim(div.querySelector("div.room_info header").textContent) + " / " + trim(div.querySelector("div.numb_guests").textContent.match(/.*:(.*)/)[1]);
}

function extractPrice(div) {
    return extractIntFromStr(div.querySelector("span.ck-price").textContent.replace(/[^\d]/g, ""));
}

function extractCurrency(div) {
    return mapCurrency(div.querySelector("span.ck-currency").textContent.replace(/[\s\d]/g, ""));
}

function extractNights(div) {
    return div.querySelector("div.offer_info").textContent.match(/(\d+)\s+НОЧ.*/i)[1];
}

function extractBoardType(div) {
    return trim(div.querySelector("div.pansion").textContent);
}

function createOption(img) {
    var currentDiv = img.parentNode.parentNode.parentNode;
    var rac = document.querySelectorAll("td.breadcrumbs a");

    var option = {
        checkinDt : extractDate(),
        hotelName : extractHotelName(),
        href : extractHotelUrl(),
        region : extractRegion( rac ),
        roomType: extractRoomType( currentDiv ),
        boardType : extractBoardType( currentDiv ),
        price : extractPrice( currentDiv ),
        currency : extractCurrency( currentDiv ),
        nights : extractNights( currentDiv ),
        country : getCountry( rac ),
        city_from : "",
    };

    return option;
}

function createCell(rowspan) {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());
    nobr.className = "qq";
    nobr.setAttribute("style", "position: relative; left: 85%; top: 3px;");
    
    return nobr;
}

function injectData() {
    var priceDivs = document.querySelectorAll("div.room_short");

    for (var i = 0; i < priceDivs.length; i++) {
        if ( !priceDivs[i].querySelector("nobr.qq") && !/Уточнить\sцену/i.test(priceDivs[i].textContent) ) {
            priceDivs[i].appendChild(createCell());
        }
    };
    
}

