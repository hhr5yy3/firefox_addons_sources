var OPERATOR_NAME = "Tez";
var showTopHotelsRating = true;
function getTable() {
	return document.querySelector("#st-result-table");
}


//-------- Search Criteria ---------------------------

function getCountry() {
	var s = document.querySelector("#st-to-country>select, #countries");
	if ( s == null ) {
		return null;
	}
	return selectedOption(s);
}

function mapCurrency(c) {
	c = c.trim().toUpperCase();
	switch ( c ) {
	case "5561": return "USD";
	case "8390": return "RUB";
	case "18864": return "EUR";
	case "46688": return "UAH";
	case "122196": return "KZT";
	case "132329": return "BYR";
	case "533067": return "BYN";
    case "141410": return "BGN";
	case "$": return "USD";
	case "Р": return "RUB";
	case "EUR": return "EUR";
	case "ГРН": return "UAH";
	case "TENGE": return "KZT";
	case "BYR": return "BYR";
	case "BYN": return "BYN";
    case "ЛВ": return "BGN";
	}

	console.log("unexpected currency id: " + c);
	return null;
}

function getCurrency() {
	var s = document.querySelector("#st-currency>select, #st-currency-select");
	if ( s == null ) {
		console.log("currency selector is not found");
		return null;
	}

	if ( s.value == null ) {
		console.log("currency is not selected");
		return null;
	}

	return mapCurrency(s.value);    
}


function getCity() {
	var type = selectedOption(document.querySelector("#kindSpo"));
	if ( type && !type.match(/полный пакет|перел.т/i)) {
		return "";
	}
	return selectedOption(document.querySelector("#st-from select"));
}

function matchAndCheck(str, regExp, defaultCount) {
	var match = str.match(regExp);
	if ( match ) {
		return /\d/.test(match[0]) ? extractIntFromStr(match[0]) : defaultCount;
	}
	return 0;
}

function getAdultsCount(str) {
	var count = 0;

	count += matchAndCheck(str, /TRPL/i, 3);

	count += matchAndCheck(str, /DBL/i, 2);

	count += matchAndCheck(str, /\d*\s?ВЗРОС|\d*\s?PAX/i, 1);

	count += matchAndCheck(str, /\d*\s?EXB/i, 1);

	return count;
}

function getChildrenCount(str) {
	return matchAndCheck(str, /\d*\s?ДЕТ|\d*\s?CHD|\d*\s?РЕБ/i, 1);
}

function getOccupancy() {
	var occupancy = {
			adultsCount: 0,
			childrenCount: 0,
			childAges: null 
	};

	var s = selectedOption(document.querySelector("select#accommodation"));
	if ( !s )
		return null;

	occupancy.adultsCount = getAdultsCount(s);

	occupancy.childrenCount = getChildrenCount(s);

    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = querySelectorAll(document, "select[id*='st-child-age-']:not([disabled])")
                              .map(select => selectedOption(select)).join();
    }

	return occupancy;     
}

function initializeSearchCriteria() {    
	var country = getCountry();
	if ( !country )
		return null;

	return { "country" : country,
		"currency" : getCurrency(),
		"city": getCity(),
		"occupancy": getOccupancy()};
}


function getSearchButton() {
	return document.querySelector("input[value=Найти], .gStatTourSearch, input[title=Найти]");
}

//--------- Rows ---------------------------------

function extractNights(nightsAndDays) {
	return nightsAndDays.match(/(\d+)/)[1];
}

function extractDate(dateAndDoW) {    
	return dateAndDoW.match(/(\d+\.\d+\.\d+)/)[1];
}

function extractHotelUrl(td) {
	var anchor = td.querySelector("td>a");
	return anchor == null ? "" :  anchor.href;
}

function extractRoomType(tds) {
	var room = tds[2].innerText || tds[2].textContent;
	var occ = tds[7].innerText || tds[7].textContent;
	return room.split("\n")[1] + ", " + occ.split("\n").join(", ");
}

function extractCurrency(td) {
    var currency = td.textContent.replace(/\d/g, "");
	return mapCurrency(currency) || SEARCH_CRITERIA.currency || currency;
}

function createOption(img) {
	var tds = img.parentNode.parentNode.parentNode.querySelectorAll("td");

	insertBeforeBR(tds[2], "\n");
	insertBeforeBR(tds[3], "\n");
	insertBeforeBR(tds[6], "\n");

	var option = {
			checkinDt : extractDate(tds[0].textContent),
			nights : extractNights(tds[1].textContent),
			hotelName : tds[2].textContent.split("\n")[0],
			href : extractHotelUrl(tds[2]),
			roomType: extractRoomType(tds),
			region : tds[3].textContent.split("\n")[0],
			boardType : tds[6].textContent,
			price : extractIntFromStr(tds[8].textContent.split("&" + "nbsp;").join("").split(/\s+/).join("").trim()),
			currency : extractCurrency(tds[8].querySelector(".cardprice") || tds[8]),
			country: SEARCH_CRITERIA.country,
			city_from: SEARCH_CRITERIA.city,
			occupancy: SEARCH_CRITERIA.occupancy,
			thumbnail : extractThumbnail(tds[2])
	};

	return option;

}

function extractThumbnail(td) {
	var img = td.querySelector("[img]");
	return img && img.rel ? img.rel : null;
}

function createCell(isEven) {
    // var nobr = document.createElement("nobr");
    // nobr.appendChild(createAddButton());
    // nobr.appendChild(createEditButton());

    var newTd = document.createElement("td");
    newTd.className = "qq st-" + (isEven ? "even" : "odd");
    newTd.appendChild(qqBtns(
        { align: "box" }
    ));
    return newTd;
}

function injectData() {
	if ( !SEARCH_CRITERIA )
		return;

	var tbl = getTable();
	if ( tbl == null ) {
		return;
	}

	var trs = tbl.querySelectorAll("#st-result-table>thead>tr, #st-result-table>tbody>tr");
	if ( trs.length == 0 ) {
		return;
	}

	if ( trs.length > 0 && trs[0].querySelector("th.qq") == null) {    
		var newTh = document.createElement("th");
		newTh.className = "qq";
		var newContent = document.createTextNode("QQ");
		newTh.appendChild(newContent);
		var ths = trs[0].getElementsByTagName("th");
		newTh.setAttribute("rowspan", ths[8].getAttribute("rowspan"));
		trs[0].insertBefore(newTh, ths[9]);
	}

	for (var i = 0; i < trs.length; ++i) {  
		if ( trs[i].querySelector(".qq") == null ) {
			if ( trs[i].className !== null && trs[i].className.indexOf("st-result-row") >=0 ) {
				var tds = getChildElementsByTagName(trs[i], "td");
				if ( tds.length >= 9 ) {
					var even = tds[0].className !== null && tds[0].className.indexOf("even") >= 0;
					var cell = createCell(even);
					if ( /border-bottom-none/.test(trs[i].getAttribute("class")) ) {
						cell.setAttribute("rowspan", "2");
					}
					trs[i].insertBefore(cell, tds[9]);
				}
			}
		}
	}
}