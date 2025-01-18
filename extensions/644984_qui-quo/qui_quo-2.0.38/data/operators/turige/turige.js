var OPERATOR_NAME = "turi.ge";

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
        case "€": return "EUR";
        case "$": return "USD";
        case "Л": return "GEL";
    }

    return c;
}

// --------- Table ---------------------------------

function extractDate() {
    var match = document.querySelector("table tr").textContent.match(/(\d{2})([^\d]+)(\d{4})/)
    return dateFromDayAndMonthName(match[1], match[2].trim(), match[3]);
}

function extractHotelName(element) {
    var stars = element.querySelector("img").src.match(/\d+/)[0];
    console.log(stars % 2)
    if ( stars % 2 ) {
        stars--;
    }
    return element.textContent.trim() + " " + (stars / 2) + "*";
}

function extractHotelUrl(element) {
    var a = element.querySelector("a");
    return a ? a.href : "";
}

function extractRegion(element) {
    var split = element.textContent.split("I");
    return split[0];
}

function extractRoomType(element) {
    var match = trim(document.querySelector("table tr").textContent).match(/Распределение:(.+)/i);
    return element.textContent.trim() + (match ? " / " + match[1] : "");
}

function extractPrice(tr) {
    return extractIntFromStr(tr.querySelector(".price").textContent.replace(/[^\d]/g, ""));
}

function extractCurrency(tr) {
    return mapCurrency(tr.querySelector(".price").textContent.replace(/[\d]/g, ""));
}

function extractNights() {
    return document.querySelector("table tr").textContent.match(/(\d+)\s*НОЧ/i)[1];
}

function extractBoardType(element) {
    return element.textContent;
}

function getCountry(aPanel, airp) {
    return getDataByCode(airp[2], "country", aPanel.textContent);
}

function getCity(aPanel, airp) {
    if ( /plane/i.test(aPanel.innerHTML) ) {
        return getDataByCode(airp[1], "region", aPanel.textContent);
    }

    return "";
}

function getOccupancy() {
    var occupancy = {
            adultsCount: null,
            childrenCount: 0,
            childAges: []
        };
    
    var trText = document.querySelector("tr").textContent;
    
    occupancy.adultsCount = extractIntFromStr(trText.match(/(\d+)\sВЗРОС/i)[1]);
    var nfnt = trText.match(/МЛАДЕНЕЦ/i);
    if ( nfnt ) {
        occupancy.childrenCount++;
        occupancy.childAges.push("0");
    }
    var chld = trText.match(/\d+\sГОД/ig);
    if ( chld )
        for ( var i = 0; i < chld.length; ++i ) {
            occupancy.childrenCount++;
            occupancy.childAges.push(chld[i].match(/\d+/)[0]);
        }

    occupancy.childAges = occupancy.childAges.join(",");

    return occupancy;
}

function createOption(img) {
    var tr = img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var tds = tr.querySelectorAll("td");
    var aPanel = document.querySelector("td.fltdlast");
    var airp = aPanel.textContent.match(/(\S{3})\s-\s(\S{3})/);

    var option = {
        checkinDt : extractDate(),
        hotelName : extractHotelName( tds[4] ),
        href : extractHotelUrl( tds[4] ),
        region : extractRegion( tds[7] ),
        roomType: extractRoomType( tds[8] ),
        boardType : extractBoardType( tds[9] ),
        price : extractPrice( tr ),
        currency : extractCurrency( tr ),
        nights : extractNights(),
        country : getCountry( aPanel, airp ),
        city_from : getCity( aPanel, airp ),
        occupancy : getOccupancy()
    };

    return option;
}

// --------- Details ---------------------------------

function extractHotelNameDetails(tr) {
    var stars = tr.parentNode.querySelector(".hotelname img").src.match(/\d+/)[0];
    if ( stars % 2 ) {
        stars--;
    }
    return tr.parentNode.querySelector(".hotelname").textContent.trim() + " " + (stars / 2) + "*";
}

function extractHotelUrlDetails(tr) {
    var a = tr.querySelector(".hotelname a");
    return a ? a.href : "";
}

function extractRegionDetails(tr) {
    var split = tr.parentNode.querySelector(".mxare").textContent.split("I");
    return split[0];
}

function extractRoomTypeDetails(tr) {
    var match = trim(document.querySelector("table tr").textContent).match(/Распределение:(.+)/i);
    return tr.querySelector(".foodtype").textContent.trim() + (match ? " / " + match[1] : "");
}

function extractCurrencyDetails(tr) {
    return mapCurrency(tr.querySelector(".price").textContent.replace(/[\d]/g, ""));
}

function extractBoardTypeDetails(tr) {
    return tr.querySelector(".foodtype").textContent;
}

function createOptionDetails(img) {
    var tr = img.parentNode.parentNode.parentNode.parentNode;
    var aPanel = document.querySelector("td.fltdlast");
    var airp = aPanel.textContent.match(/(\S{3})\s-\s(\S{3})/);

    var option = {
        checkinDt : extractDate(),
        hotelName : extractHotelNameDetails( tr ),
        href : extractHotelUrlDetails( tr ),
        region : extractRegionDetails( tr ),
        roomType: extractRoomTypeDetails( tr ),
        boardType : extractBoardTypeDetails( tr ),
        price : extractPrice( tr ),
        currency : extractCurrency( tr ),
        nights : extractNights(),
        country : getCountry( aPanel, airp ),
        city_from : getCity( aPanel, airp ),
        occupancy : getOccupancy()
    };

    return option;
}

// --------- Inject ---------------------------------

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

function createCellDetails() {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton(createOptionDetails));
    nobr.appendChild(createEditButton(createOptionDetails));   
    
    var div = document.createElement("div");
    div.className = "qq";
    div.setAttribute("style", "margin-left: 5px;");
    div.appendChild(nobr);
    
    return div;
}

    
function injectData() {
    var tds = document.querySelectorAll('#infos');

    for ( var i = 0; i < tds.length; ++i ) {  
        if ( !tds[i].parentNode.querySelector(".qq") ) {
            tds[i].parentNode.appendChild(createCell());
        }
    }

    tds = document.querySelectorAll(".pasi");

    for ( var i = 0; i < tds.length; ++i ) {  
        if ( !tds[i].querySelector(".qq") ) {
            tds[i].setAttribute("style", "display: inline-flex; justify-content: flex-end;");
            tds[i].insertBefore(createCellDetails(), tds[i].querySelector(".price"));
        }
    }
}
