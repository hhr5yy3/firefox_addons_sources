var OPERATOR_NAME = "ТурБокс.ру";

function getTable() {
    return document.querySelector("table#tours");
}

// -------- Search Criteria ---------------------------

function getCountry() {
    return selectedOption(
    		document.querySelector("div#tour_search__direction select"));
}

function getCityFrom() {
    return selectedOption(
    		document.querySelector("div#tour_search__location select"));
}

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
	return document.querySelector("div#tour_search__new_search button");
}

// --------- Rows ---------------------------------

function extractDate(td) {
    return makeYear4Digits(td.textContent.match(/\d\d\.\d\d\.\d\d/)[0]);
}

function extractNights(td) {
    return td.textContent.trim();
}

function extractHotelName(td1, td2) {
	return td1.textContent.trim() + " " + td2.textContent.trim() + "*";
}

function extractHotelUrl(td) {
    var anchor = td.querySelector("a");
    return anchor ? anchor.href : "";
}

function extractRoomType(td1, td2) {
    return td1.textContent.trim() + " / " + td2.textContent.trim();
}

function extractRegion(td) {
	return td.textContent.trim();
}

function extractBoardType(td) {
    return td.textContent.trim();
}

function extractPrice(td) {
    var text = td.textContent.replace(/[^\d]/g, "");
    return extractIntFromStr(text);
}

function extractCurrency(td) {
    if ( td.querySelector("i.icon-rub") )
        return "RUB";
    if ( td.querySelector("i.icon-euro") )
        return "EUR";
    if ( td.querySelector("i.icon-usd") )
        return "USD";

    throw "Неизвестная валюта!";
}

function extractComment(td12, td13) {
    var comment = "";

    var price = extractPrice(td12);
    if ( price > 0 ) {
        comment += "Топливо: " + price.toString() + " " + extractCurrency(td12) + "\n";
    }

    price = extractPrice(td13);
    if ( price > 0 ) {
        comment += "Виза: " + price.toString() + " " + extractCurrency(td13) + "\n";
    }
    return comment;
}

function createOption(img) {
    var tr = img.parentNode.parentNode.parentNode;
    var tds = getChildElementsByTagName(tr, "td");

    var option = {
        checkinDt : extractDate(tds[0]),
        nights : extractNights(tds[10]),
        hotelName : extractHotelName(tds[6], tds[5]),
        href : extractHotelUrl(tds[6]),
        roomType: extractRoomType(tds[7], tds[8]),
        region : extractRegion(tds[3]),
        boardType : extractBoardType(tds[9]),
        price : extractPrice(tds[11]),
        currency : extractCurrency(tds[11]),
        comment : extractComment(tds[12], tds[13]),
        country: getCountry(),
        city_from: getCityFrom(),
        operator: OPERATOR_NAME + " / " + tds[1].getAttribute("title")
    };

    return option;
}

function createHeaderCell() {
    var th = document.createElement("th");
    th.className = "title qq";
    th.width = "38";
    th.appendChild(document.createTextNode("QQ"));
    return th;
}

function createButtons() {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());

    var td = document.createElement("td");
    td.className = "qq";
    td.appendChild(nobr);
    
    return td;
}

function injectData() {
	var table = getTable();

	if ( !table ) {
		return;
	}

    var trs = table.querySelectorAll("thead > tr");

    if ( trs.length > 0 && trs[0].querySelector("th.qq") == null) {
        trs[0].appendChild(createHeaderCell());
    }

    trs = table.querySelectorAll("tbody > tr");

    for ( var i = 0; i < trs.length; i++ ) {
        if ( trs[i].querySelector("td.qq") == null && /ng-scope/i.test(trs[i].getAttribute("class")) ) {
            var tds = getChildElementsByTagName(trs[i], "td");
            if ( tds.length > 13 ) {
                trs[i].appendChild(createButtons());
            }
        }
    }
}