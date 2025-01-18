var OPERATOR_NAME = "BSI Group";

//-------- Search Criteria ---------------------------

function getCountry() {
    var s = document.querySelectorAll(".breadcrumb a");
	return s.length > 2 ? s[2].textContent : null;
}

function getCity() {
    var match = document.querySelector(".tourpage-summary ul").textContent.match(/перелет\s([^-–]*)/i);
    return match ? match[1] : "";
}

function initializeSearchCriteria() {
	return null;
}

function getSearchButton() {
    return null;
}


// --------- Rows ---------------------------------

function mapCurrency(s) {
    var c = trim(s);
    switch (c.toUpperCase()) {
        case "£": return "GBP";
        case "Р.": return "RUB";
        case "€": return "EUR";
        case "$": return "USD";
        case "CHF": return "CHF";
        case "CAD": return "CAD";
    }

    return c;
}

function extractDate() {
    return makeYear4Digits(document.querySelector("[name='DATE']").value);
}

function extractHotelName(element) {
    var tourNameDiv = document.querySelector(".h1-big.mb1");
    return (tourNameDiv ? tourNameDiv.textContent.trim().replace(/\(.*\)/, "").split(",")[0] + ", " : "") + element.querySelectorAll(".fleft span.dash4")[0].textContent.trim();
}

function extractRegion(element) {
    return element.querySelector(".underline").textContent;
}

function extractRoomType(element) {
    var spans = element.querySelectorAll(".sm-count");
    var split = element.querySelector(".tour-room-name").textContent.split(/Питание:/i);
    return split[0].trim() + ( spans.length > 2 ? " / " + (spans[1].textContent.trim() + " AD" + ( spans[2].textContent != "0" ? ", " + spans[2].textContent.trim() + " CH" : "" )) : "" );
}

function extractPrice(element) {
    return extractIntFromStr(element.querySelector("#select2-chosen-41").textContent.replace(/[^\d]/g, ""));
}

function extractCurrency(element) {
    return mapCurrency(element.querySelector("#select2-chosen-41").textContent.replace(/[\d]/g, ""));
}

function extractNights() {
    return document.querySelector("#select2-chosen-43").textContent;
}

function extractBoardType(element) {
    return element.textContent.split(/Питание:/i)[1];
}

function createOption(img) {
    var element = img.parentNode.parentNode.parentNode;
    var hotelInfo = document.querySelector(".btn-option.selected").parentNode.parentNode.parentNode.parentNode;
    var roomLine = hotelInfo.querySelector(".mix-line");

    var option = {
        checkinDt : extractDate(),
        hotelName : extractHotelName( hotelInfo ),
        href : window.location.href,
        region : extractRegion( hotelInfo ),
        roomType: extractRoomType( roomLine ),
        boardType : extractBoardType( roomLine ),
        price : extractPrice( element ),
        currency : extractCurrency( element ),
        nights: extractNights(),
        country: getCountry(),
        city_from: getCity(),
        excursion: true,
        occupancy: null
    };

    return option;
}

function createCell() {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());   
    
    var div = document.createElement("div");
    div.className = "qq";
    div.setAttribute("style", "margin-left: 5px;");
    div.appendChild(nobr);
    
    return div;
}

    
function injectData() {
    var div = document.querySelector(".float-cont.tourpage-panel-pad");
    if ( div && !div.querySelector("div.qq") && div.querySelector("#tour_card_total_price") && document.querySelector(".hotels-items") ) {
        div.setAttribute("style", "display: inline-flex;");
        div.appendChild(createCell());
    }
}
