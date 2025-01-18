var OPERATOR_NAME = "Кандагар";

//-------- Search Criteria ---------------------------

function getCountry() {
	var c = document.querySelector("div.selectBox-dropdown.country_select span.selectBox-label");
	c = c ? trim(c.textContent) : "";
	return /ВСЕ\sСТРАНЫ/i.test(c) ? "" : c;
}

function initializeSearchCriteria() {
    return {country: getCountry()};
}

function getSearchButton() {
    return document.querySelector("span.search_submit a.btn");
}

// --------- Rows ---------------------------------

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
    return document.querySelector("span.from.mark").textContent.trim();
}

function extractHotelName(element) {
    var hotelH3 = element.querySelector("h3.object_name");
    return trim(hotelH3.textContent);
}

function extractHotelUrl(element) {
    var a = element.querySelector("h3.object_name a");
    return a ? a.href : "";
}

function extractRegion(element) {
    return trim(element.querySelector("span.place").textContent);
}

function extractRoomType(element) {
    return trim(element.querySelector("div.room_name").textContent) + " / " + trim(element.querySelector("div.numb_guests").textContent.match(/.*:(.*)/)[1]);
}

function extractPrice(element) {
    return extractIntFromStr(element.querySelector("span.ck-price").textContent.replace(/[^\d]/g, ""));
}

function extractCurrency(element) {
    return mapCurrency(element.querySelector("span.ck-currency").textContent.replace(/[\s\d]/g, ""));
}

function extractNights(element) {
    return element.querySelector("span.period").textContent.match(/(\d+)\sНОЧ.*/i)[1];
}

function extractBoardType(element) {
    return trim(element.querySelector("div.pansion").textContent);
}

function createOption(img) {
    var allSelection = img.parentNode.parentNode.parentNode.parentNode.parentNode;
    var detailSelection = img.parentNode.parentNode.parentNode;

    var option = {
        checkinDt : extractDate(),
        hotelName : extractHotelName( allSelection ),
        href : extractHotelUrl( allSelection ),
        region : extractRegion( allSelection ),
        roomType: extractRoomType( detailSelection ),
        boardType : extractBoardType( detailSelection ),
        price : extractPrice( detailSelection ),
        currency : extractCurrency( detailSelection ),
        nights : extractNights( allSelection ),
        country : SEARCH_CRITERIA.country,
        city_from : "",
    };

    return option;
}

function createCell(rowspan) {
    var addButton = createAddButton();
    var editButton = createEditButton();
    addButton.setAttribute("style" , addButton.getAttribute("style") + " ;width: 22px; display: inline");
    editButton.setAttribute("style", editButton.getAttribute("style") + " ;width: 24px; display: inline");


    var nobr = document.createElement("nobr");
    nobr.appendChild(addButton);
    nobr.appendChild(editButton);
    nobr.className = "qq";
    nobr.setAttribute("style", "position: relative; top: 3px; left: 35%;");

    return nobr;
}

function injectData() {
    var priceDivs = document.querySelectorAll("div.book_info");

    for ( var i = 0; i < priceDivs.length; ++i ) {
        if ( !priceDivs[i].querySelector("nobr.qq") ) {
            priceDivs[i].appendChild(createCell());
            priceDivs[i].style.setProperty("border-bottom-left-radius", "22px");
        }
    };
    
}

