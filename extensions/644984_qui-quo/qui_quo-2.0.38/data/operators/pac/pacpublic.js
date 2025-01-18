var OPERATOR_NAME = "PAC GROUP";

function getTable() {
    return document.querySelector("table.tse_results_table");
}

// -------- Search Criteria ---------------------------

function getCountry() {
    return selectedOption(document.querySelector("select#tse_country"));
}

function getCityFrom() {
    return selectedOption(document.querySelector("select#tse_dpt_city"));
}

function initializeSearchCriteria() {
    return {
        "country" : getCountry(),
        "cityFrom" : getCityFrom()
    };
}

function getSearchButton() {
	return document.querySelector("div#tse_search_button");
}

// --------- Rows ---------------------------------

function extractDate(td) {
    return td.textContent.trim();
}

function extractNights(td) {
    return td.textContent.split("/")[1].trim();
}

function extractHotelName(tds, rowspan) {
    return tds[3].querySelector("span").textContent.trim() + " " +
                    tds[4].textContent.trim() + (rowspan ? " " + extractNights(tds[7]) + "н" : "");
}

function extractRoomType(tds) {
    var split = trim(tds[6].textContent).match(/(\S*\s[^\d]*)\s*(.*)/);
    return split[1] + " / " + split[2];
}

function extractRegion(tds) {
    return tds[3].querySelector("small").textContent.trim();
}

function extractBoardType(tds) {
    return tds[5].textContent.trim();
}

function extractPrice(tds) {
    return extractIntFromStr(tds.textContent.replace(/[^\d]/g, ""));
}

function extractCurrency(tds) {
    var text = tds.textContent.replace(/\s*\d*/g, "").toUpperCase();
    switch ( text ) {
        case "E": return "EUR";
        case "S": return "USD";
        case "ГРН.": return "UAH";
        case "РУБ.": return "RUB";
    }
    return text;
}

function eachAccom(tr, rowspan, fun) {
    if ( !rowspan ) {
        return fun(getChildElementsByTagName(tr, "td"));
    }

    var result = [];
    for ( var i = 1; i < rowspan; ++i ) {
        tr = tr.nextSibling;
        var tds = getChildElementsByTagName(tr, "td");
        tds.unshift(null, null);
        result.push(fun(tds, rowspan));
    }
    return result.join(", ");
}

function createOption(img) {
    var tr = img.parentNode.parentNode.parentNode;
    var tds = getChildElementsByTagName(tr, "td");
    var rowspan = tds[0].getAttribute("rowspan");
    var colspan = tds[2].getAttribute("colspan");
    colspan = colspan ? colspan - 1 : 0;

    var option = {
        checkinDt : extractDate(tds[1]),
        nights : extractNights(tds[7 - colspan]),
        hotelName : eachAccom(tr, rowspan, extractHotelName),
        href : "",
        roomType: eachAccom(tr, rowspan, extractRoomType),
        region : eachAccom(tr, rowspan, extractRegion),
        boardType : eachAccom(tr, rowspan, extractBoardType),
        price : extractPrice(tds[8 - colspan]),
        currency : extractCurrency(tds[8 - colspan]),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.cityFrom
    };

    return option
}

function createHeaderCell() {
    var th = document.createElement("th");
    th.className = "title qq";
    th.appendChild(document.createTextNode("QQ"));
    return th;
}

function createButtons(rowspan) {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());

    var td = document.createElement("td");
    td.className = "qq";
    td.setAttribute("rowspan", rowspan);
    td.appendChild(nobr);
    
    return td;
}

function injectData() {
	var table = getTable();

	if ( !table ) {
		return;
	}

    var trs = table.querySelectorAll("tbody tr");

    if ( trs.length > 1 && trs[1].querySelector("th.qq") == null ) {
    	trs[0].appendChild(document.createElement("th"));
        trs[1].appendChild(createHeaderCell());
        trs[trs.length - 1].appendChild(document.createElement("th"));
    }

    for ( var i = 2; i < trs.length; i++ ) {
        if ( trs[i].querySelector("td.qq") == null ) {
            var tdsend_orderCell = trs[i].querySelector(".send_order");
            if ( tdsend_orderCell ) {
                trs[i].appendChild(createButtons(tdsend_orderCell.getAttribute("rowspan")));
            }
        }
    }
}