var OPERATOR_NAME = "TUI";
var OPERATOR_SLETAT_ID = 229;


function getCity(tds, colId) {
	var c = document.querySelector("div.item.tsf-city-from span.choise");
	if ( !c )
		return null;
	return tds[colId].textContent == "" && tds[colId + 1].textContent == "" ? "" : c.textContent;
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function selectOptionalInt(sel) {
    var s = document.querySelector(sel);
    return s ? extractOptionalInt( s.tagName == "INPUT" ? s.value : selectedOption(s) ) : null;
}

function getOccupancy() {
    var occupancy = {
            adultsCount:  selectOptionalInt("select#tsp_adults"),
            childrenCount:  selectOptionalInt("select#tsp_children"),
            childAges: null 
        };

    if ( occupancy.adultsCount === null || occupancy.childrenCount === null ) {
        return null;
    }

    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        for ( var i = 0; i < occupancy.childrenCount; ++i ) {
        	var age = selectOptionalInt("input#tsp_child_age_" + (i + 1));
        	if ( !age ) {
        		return null;
        	}
            ages.push(age);
        }

        occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
	var trs = document.querySelectorAll("table.price-list tr");
	if ( trs.length > 0 && trs[0] != null && trs[0].querySelector("th.qq") == null ) { 
		var th = document.createElement("th");
		th.className = "qq";
		th.appendChild(document.createTextNode("QQ"));
		trs[0].appendChild(th);
	}

	for ( var i = 1; i < trs.length; ++i ) {
		if ( trs[i].querySelector("td.qq") == null ) {
			var nobr = document.createElement("nobr");
			nobr.appendChild(createAddButton());
			nobr.appendChild(createEditButton());

			var td = document.createElement("td");
			td.className = "qq";
			td.appendChild(nobr);
			
			trs[i].appendChild(td);
		}		
	}
}

function getHotelRowByImage(img) {
	return img.parentNode.parentNode.parentNode;
}

function mapCurrency(c) {
	switch(c.toLowerCase()) {
	case "$": return "USD";
	case "€": return "EUR";
	case "₴": return "UAH";
	case "грн.": return "UAH";
	}
	return c;
}

function extractRegion(element) {
	var match = element.textContent.match(/[^,]*,(.*)/);
	return match ? match[1] : element.textContent;
}

function extractCountry(element) {
	var match = element.textContent.match(/[^,]*/);
	return match ? match[0] : element.textContent;
}

function extractHotelName(element, colId, tds) {
	if ( colId ) {
		return tds[colId].textContent;
	}
	var stars = document.querySelectorAll("div.stars-holder img");
	var name = element.previousSibling.textContent.trim();
	return /\d\*/.test(name) ? name : name + " " + stars.length + "*";
}

function extractHotelHref(colId, tds) {
	if ( colId ) {
		var a = tds[colId].querySelector("a");
		return a ? a.href : "";
	}
	var match = window.location.href.match(/(.*)#\/h-/i);
	return !match ? null : match[1];
}

function extractRoomType(td) {
	return trim(td.textContent).replace(/\s+/, " / ");
}

function extractCurrency(colId) {
	var tds = document.querySelectorAll("table.price-list tr th");
	return mapCurrency(tds[colId].textContent.match(/\(([^)]*)\)/)[1]);
}

function getColId(titleRegexp, ths) {
	for ( var i = 0; i < ths.length; ++i ) {
		if ( titleRegexp.test(ths[i].textContent) ) {
			return i;
		}
	};
	return null;
}

function createOption(img) {
	var ths = document.querySelectorAll("table.price-list th");
	var tds = getChildElementsByTagName(getHotelRowByImage(img), "td");
	var place = document.querySelector("span.page-header-append");
	var hotelColId = getColId(/ОТЕЛЬ/i, ths);
	var option = {
            checkinDt : tds[0].textContent.match(/(\d+\.\d+\.\d+)/)[1],
            nights : tds[getColId(/НОЧЕЙ/i, ths)].textContent.match(/\d+/)[0],
            region : extractRegion(place),
			hotelName : extractHotelName(place, hotelColId, tds),
			href : extractHotelHref(hotelColId, tds),
            boardType : tds[getColId(/ПИТАНИЕ/i, ths)].textContent,
            roomType :  extractRoomType(tds[getColId(/ТИП\sНОМЕРА/i, ths)]),
            price : extractIntFromStr(tds[getColId(/ЦЕНА/i, ths)].textContent.replace(/[^\d]/g, "")),
            currency : extractCurrency(getColId(/ЦЕНА/i, ths)),
            country : extractCountry(place),
            city_from : getCity(tds, getColId(/МЕСТТУДА/i, ths)),
            occupancy : getOccupancy()
        };

    return option;
}
