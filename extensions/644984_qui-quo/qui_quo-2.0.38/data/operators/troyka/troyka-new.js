
var OPERATOR_NAME = "Troyka";

function getTable() {
    return document.querySelector(".resultTable");
}

// -------- Find Action ---------------------------


function initializeSearchCriteria() {
    var country = getCountry();
    if ( !country )
        return null;

    var city_from = selectedOption(document.getElementById("depTownSelector"));
    if ( !city_from ) {
    	city_from = "";
    }

    return {
        "country": country,
        "altCurrency": getAltCurrency(),
        "city_from": city_from,
        "occupancy": getOccupancy()
    };
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const adults = document.querySelector('[name="adultsCount"]');
    if ( !adults ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(selectedOption(adults));
    const kids = document.querySelector('[name="childCount"]');
    if ( kids ) {
        occupancy.childrenCount = extractIntFromStr(selectedOption(kids));
    }
    if ( occupancy.childrenCount > 0) {
        occupancy.childAges = querySelectorAll(document,'select[name*="ChildAge"]:not(:disabled)').map( age => selectedOption(age) ).join();
    }
    return occupancy;
}

function getCountry() {
	var s = document.querySelector("select#countrySelector");
    if ( s == null ) {
        console.log("country selector is not found");
        return null;
    }

    if ( s.value == null ) {
        console.log("country is not selected");
        return null;
    }
    return selectedOption(s);
}


function getSearchButton() {
    return document.querySelector("#searchBtn");
}

function getAltCurrency() {
	var options = document.querySelectorAll("#currencySelector>option");
	if ( options.length == 0 ) {
		return null;
	}

	var arr = [];
	for ( var i = 0; i < options.length; i++) {
		if ( options[i].value != "RUR" && options[i].value != "RUB" ) {
			arr.push(options[i].value);
		}
	}

	if ( arr.length == 1 ) {
		return arr[0];
	}

	return "";
}

// -------- Title ---------------------------

function getHeaderTable() {
    return document.querySelector("table#headerResultTable");
}

function getHeaderRow() {
	var tbl = getHeaderTable();
	return tbl == null ? null : tbl.querySelector("tbody>tr");
}

function needInjectTitle() {
    var th = getHeaderRow();
    return th != null && th.querySelector("th.qq") == null
}

function addColGroup(tbl) {
	var group = tbl.querySelector("colgroup");
	if ( group == null || group.querySelector("col.qq") != null ) {
		return;
	}

    var col = document.createElement("col");
    col.className = "qq"
    col.setAttribute("width", "50px");
    group.appendChild(col);
}

function addTitle() {
	addColGroup(getHeaderTable());

    var newTh = document.createElement("th");
    newTh.className = "qq";
    newTh.setAttribute("rowspan", "2");
    var newContent = document.createTextNode("QQ");
    newTh.appendChild(newContent);
    getHeaderRow().appendChild(newTh);

    // make table wider
    var scroll = document.querySelector("#scrollingTable");
    if ( scroll ) {
    	scroll.setAttribute("style", "overflow:visible;width:1130px;");
	   	getHeaderTable().setAttribute("style", "width:1132px;");
    }
}

function injectTitle() {
    if ( needInjectTitle() )
        addTitle()
}

// --------- Rows ---------------------------------

function getFirstVisibleAnchor(td) {
	var as = td.querySelectorAll("a");
	for (var i = 0; i < as.length; ++i) {
		if ( as[i].style.display.indexOf("none") === -1 )
			return as[i];
	}
	return null;
}

function extractPrice(td) {
	var as = getFirstVisibleAnchor(td);
    return as == null ? 0 : parseInt(as.textContent.split(/\s+/).join("").trim().match(/(\d*)/)[1], 10);
}

function extractCurrency(td, altCurrency) {
	var a = getFirstVisibleAnchor(td);
	if ( a != null && a.getAttribute("class") != null ) {
		if ( a.getAttribute("class").indexOf("RUR") >= 0 ||
				a.getAttribute("class").indexOf("RUB") >= 0 ) {
			return "RUB";
		}
		return altCurrency;
	}

	return "";
}

function extractDate(dateAndDoW) {
    var matcher = dateAndDoW.match(/(\d\d)\.(\d\d)/);
	return appendYear(parseInt(matcher[1], 10), parseInt(matcher[2], 10));
}

function extractHotelUrl(td) {
	return td.querySelector("a").href;
}

function extractHotelName(td) {
	var href = td.querySelector("a");
	if ( href )
		return href.textContent;
	else
		return td.textContent;
}

function buildRoomType(td5, td7) {
	var rt = td5.textContent;
	return rt ? rt + " / " + td7.textContent : td7.textContent;
}

function extractRegion(hotel, city) {
	var br = hotel.querySelector("td>br");
	if ( br != null && br.nextSibling != null ) {
		return br.nextSibling.textContent;
	}
	var ths = document.querySelectorAll("table#headerResultTable th");
	if ( ths[1].textContent === "Город" ) {
           return city.textContent;
    }
	return "";
}

function createOption(img) {
	var tr = img.parentNode.parentNode.parentNode;
    var tds = tr.querySelectorAll("td");

    var commodDataTds;
    var offset;
    if ( tds.length > 8 ) {
    	commodDataTds = tds;
    	offset = 0;
    } else {
    	// this is a multiple rooms search, user clicked on a button located not in the first row.
    	// need to find the first one as it contains cells with data which are common for all the rooms
    	do {
    		tr = tr.previousElementSibling;
    		commodDataTds = tr.querySelectorAll("td");
    	} while ( commodDataTds.length <= 8 );
    	offset = -7;
    }
    var option = {
        checkinDt : extractDate(commodDataTds[0].textContent),
        region : extractRegion(commodDataTds[4], commodDataTds[1]),
        nights : commodDataTds[3].textContent,
        hotelName : extractHotelName(commodDataTds[4]),
        boardType : commodDataTds[6].textContent,
        roomType : buildRoomType(commodDataTds[5], tds[7+offset]),
        price : extractPrice(tds[8+offset]),
        currency : extractCurrency(tds[8+offset], SEARCH_CRITERIA.altCurrency),
        href : extractHotelUrl(commodDataTds[4]),
        country : SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city_from,
        occupancy: SEARCH_CRITERIA.occupancy
    }
    return option;
}

function createCell() {

    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());

    var newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.appendChild(nobr);

    return newTd;
}

function injectData() {
	injectTitle();

    var tbl = getTable();
    if ( tbl == null ) {
        return;
    }
    tbl.style.width = "100%";
  	addColGroup(tbl);

    var trs = tbl.querySelectorAll("tbody > tr");
    for (var i = 0; i < trs.length; ++i) {
        if ( trs[i].querySelector("td.qq") === null && trs[i].id.indexOf("resultPageNumber") === -1 )
            trs[i].appendChild(createCell())
    }
}
