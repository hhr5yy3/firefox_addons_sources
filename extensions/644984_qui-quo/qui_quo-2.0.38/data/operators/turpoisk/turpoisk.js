var OPERATOR_NAME = "TurPoisk";
//-------- Search Criteria ---------------------------

function initializeSearchCriteria() {
	return null;
}

function getCountry(h1) {
	var c = h1.querySelectorAll(".ng-binding")[1];
    return c ? c.textContent : null;
}

function getCity(h1) {
	var city = h1.querySelectorAll(".ng-binding")[0];
	return city ? city.textContent : null;
}

function getOccupancy(h1) {
    var occupancy = {
            adultsCount: 0,
            childrenCount: 0,
            childAges: null 
        };
    var pax =  h1.querySelectorAll(".ng-binding")[2];
    var adults = pax.textContent.match(/\d+/) ? pax.textContent.match(/\d+/)[0] : null;
    var children = pax.textContent.match(/\двумя|тремя|ребенком/) ? pax.textContent.match(/\двумя|тремя|ребенком/)[0] : null;
    occupancy.adultsCount = extractOptionalInt(adults); 
	if (  children ) {
		occupancy.childrenCount =extractOptionalInt( mapChildren(children) );
	}
	if ( occupancy.childrenCount > 0 ) {
		var ageInputs = [];
		var ages = [];
		for ( var i = 1; i <= occupancy.childrenCount; i++ ) {
			ageInputs =  document.getElementsByName("ch" + i)[0];
			var age = extractOptionalInt(ageInputs.options[ageInputs.selectedIndex].text);
			if ( age === null ) {
				age =  0;
			}
			ages.push(age); 
			}
		occupancy.childAges = ages.join(","); 
	}
	return occupancy;
}
		
function mapChildren(children) {
	switch (children) {
    case "ребенком": return "1";
    case "двумя": return "2";
    case "тремя": return "3";
	}
	return null;
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function getSearchButton() {
	 return null;
}
//--------- Rows ---------------------------------

function injectData() {
	var tables = document.querySelector("table.search-results-table");
	if ( tables === null ) {
		return;
	}
		var trs = tables.querySelectorAll("tbody>tr.tour-row");
		injectTitle(tables.querySelector("tr#search-results-tr-static"));
		for ( var j = 0; j < trs.length; j++) {
			injectRow(trs[j]);		
	}
}

function injectTitle(tr) {
	if ( tr.querySelector("th.qq") !== null ) {
		return;
	}
	var th = document.createElement("th");
	th.className = "qq search-results-table-th search-results-table-td-center";
	th.appendChild(document.createTextNode("QQ"));
  
	tr.appendChild(th);
}

function injectRow(tr) {	
	if ( tr.querySelector("td.qq") !== null || getChildElementsByTagName(tr, "td").length < 3 ) {
		return;
	}
	var td = document.createElement("td");
	td.className = "qq search-results-table-td search-results-table-td-center search-results-table-td-valign";
	td.appendChild(createAddButton());
	td.appendChild(document.createElement("br"));
    td.appendChild(createEditButton());   
  
	tr.appendChild(td);
	
}

function createOption(img) {
	var h1 = document.querySelector(".page-ttl-h1-tp.page-ttl-h1-tp-r20.black");
	var tr = img.parentNode.parentNode;
    var option = {
        checkinDt : extractDate(tr),
        nights : extractNights(tr),
        hotelName : getHotelName(tr),
        href : getHref(tr),
        roomType: extractRoomType(tr),
        region : getRegion(tr),
        boardType : extractBoardType(tr),
        price : getPrice(tr),
        currency : mapCurrency(tr),
        country:  getCountry(h1),
        city_from: getCity(h1),
        excursion: false,
        occupancy : getOccupancy(h1),
    };

    return option;
}

function getHref(tr) {
	var url = tr.getAttribute("surl");
	if ( url.startsWith("//") )
		url = "http:" + url;
	return url;
}

function getPrice(tr) {
	var priceShort =  tr.querySelector(".search-results-table-b16price>a>span:nth-child(1)");
	var priceFull = tr.querySelector(".search-results-table-b16price a");
	if ( priceShort ) {
		return extractIntFromStr(priceShort.textContent.replace(/\s+/,""));
	}
	if ( priceFull ) {
		return extractIntFromStr(priceFull.textContent.replace(/\s+/,""));
	}
}

function mapCurrency(tr) {
	var priceShort = tr.querySelector(".search-results-table-b16price>a>span:nth-child(2)");
	var priceFull = tr.querySelector(".search-results-table-b16price a");
	var code = priceShort ? priceShort.textContent : priceFull.textContent.replace(/\s+/g, "").match(/\D+/g)[0];
	switch (code.toUpperCase()) {
    case "$": return "USD";
    case "€": return "EUR";
    case "РУБ": return "RUB";
    case "ГРН": return "UAH";
    case "Р": return "RUB";
	}
	return code;
}

function extractDate(tr) {
    var date = tr.querySelector("span.search-results-table-b16");
    if ( !date ) {
        date = tr.querySelector(".search-results-table-b12");
    }
    var match = date.textContent.match(/(\d+)\.(\d+)/);
    if ( match ) {
        return appendYear(extractIntFromStr(match[1]),extractIntFromStr(match[2]));
    }
    match = date.textContent.match(/(\d+)\s+([^\s]+)/);
    return dateFromDayAndMonthName(match[1], match[2]);
}

function extractNights(tr) {
	var nights = tr.querySelector(".search-results-table-link-b16");
	if ( nights ) {
	 return nights.textContent.match(/\d+/)[0];
	}
	 return tr.querySelector(".search-results-nights-wrap").textContent.match(/\d+/g)[0];
}

function getHotelName(tr) {
	var hotel = tr.querySelector(".search-results-table-b13");
	return hotel ? hotel.textContent.replace(/\s+/g, " ") : tr.querySelector("a.search-results-table-b16").textContent.replace(/\s+/g, " ");	
}

function extractNameAndDescription(tr, nameSel, descTagSel, descTitleSel) {
	var name = tr.querySelector(nameSel).textContent;
	var desc = tr.querySelector(descTagSel) ? tr.querySelector(descTagSel).textContent 
			: tr.querySelector(descTitleSel) ? tr.querySelector(descTitleSel).title : null;
	return name + (desc ? ": " + desc : "");
}

function extractRoomType(tr) {
	var type = extractNameAndDescription(tr, "[ng-bind='tour.roomType.name']", "[ng-bind='tour.roomType.description']", "[ng-bind='tour.roomType.name']");
	var view = extractNameAndDescription(tr, "[ng-bind='tour.roomView.name']", "[ng-bind='tour.roomView.description']", "[ng-bind='tour.roomView.name']");
	var size = extractNameAndDescription(tr, "[ng-bind='tour.roomSize.name']", "[ng-bind='tour.roomSize.description']", "[ng-bind='tour.roomSize.name']");
	return [type, view, size].join(", ");	
}

function extractBoardType(tr) {
	return extractNameAndDescription(tr, "[ng-bind='tour.meal.name']", "[ng-bind='tour.meal.description']", "[bo-title='tour.meal.description']");
}

function getRegion(tr) {
	var result = [];
	if ( tr.querySelector("[ng-bind='tour.resort.name']") )
		result.push(tr.querySelector("[ng-bind='tour.resort.name']").textContent);
	if ( tr.querySelector("[ng-bind='tour.resortPlace.name']") )
		result.push(tr.querySelector("[ng-bind='tour.resortPlace.name']").textContent);
	return result.join(", ");
}
