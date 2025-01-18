var OPERATOR_NAME = "TUI";
var OPERATOR_SLETAT_ID = 229;


function getDigits(str) {
	return str.replace(/[^\d]/g, "");
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function selectOptionalInt(sel) {
    var s = document.querySelector(sel);
    return s ? extractOptionalInt( s.tagName == "INPUT" ? s.value : s.textContent ) : null;
}

function getChildrenAges() {
    return Array.fromList(document.querySelectorAll("div.children [data-filter='ChildrenAges'] input"))
        .map(function(input) { return extractOptionalInt(input.value);})
        .filter(function(number) { return number != null; });
}

function getOccupancy() {
    var occupancy = {
            adultsCount: selectOptionalInt("div.adult input"),
            childrenCount: selectOptionalInt("div.children span.active"),
            childAges: null 
        };

    if ( occupancy.adultsCount === null || occupancy.childrenCount === null ) {
        return null;
    }

    if ( occupancy.childrenCount > 0 ) {        
        var ages = getChildrenAges();
        if ( ages.length != occupancy.childrenCount ) {
            return null;
        }
        occupancy.childAges = ages.join(",");
    }
    return occupancy;     
}

function initializeSearchCriteria() {
    return { occupancy : getOccupancy() };
}

function getSearchButton() {
    return [document.querySelector("button#searchButton"), document.querySelector("button#sliderSearchButton")];
}

function injectData() {
	var trs = document.querySelectorAll("table.searchResultTable.byTours tr");
	if ( trs.length > 0 && trs[0] != null && trs[0].querySelector("th.qq") == null ) { 
		var th = document.createElement("th");
		th.className = "qq";
		th.appendChild(document.createTextNode("QQ"));
		trs[0].appendChild(th);
	}

	for ( var i = 1, firstLine=true; i < trs.length; i++ ) {
		if ( trs[i].querySelector("td.qq") == null ) {
			var td = document.createElement("td");
			td.className = "qq";

			if ( firstLine ) {
				var nobr = document.createElement("nobr");
				nobr.appendChild(createAddButton());
				nobr.appendChild(createEditButton());
				td.appendChild(nobr);
			}
			
			trs[i].appendChild(td);
		}
		
		firstLine = trs[i].getAttribute("ng-repeat-end") != null;
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
	case "грн": return "UAH";
	case "р": return "RUB";
	}
	return c;
}

function extractDate(tr) {
	var date = tr.querySelector(".departureDate").textContent.trim().split(/\s/);
	return dateFromDayAndMonthName(date[0], date[1]);
}

function extractNights(tr) {
	return tr.querySelector("div.night span").textContent;
}

function extractRegion(tr) {
	return tr.querySelector("div.resortName").textContent.split(/»/g).map(function(e){return e.trim()}).join(" , ");
}

function extractHotelName(mainTr, otherTrs) {
	var hotels = [mainTr].concat(otherTrs).map(function(tr) {
		var stars = tr.querySelector(".hotelCategory");
		return tr.querySelector(".hotelName").textContent + (stars ? " " + stars.textContent.trim() + "*" : "");
	});
	return hotels.join(" / ");
}

function extractHotelHref(tr) {
	var a = tr.querySelector(".hotelName").parentNode;
	return a.tagName.toUpperCase() == "A" ? a.href : "";
}

function getOtherRowsOfTheTour(tr) {
	var trs = [];
	while ( true ) {
		tr = tr.nextElementSibling;
		if ( tr == null || tr.getAttribute("ng-repeat-end") != null )
			break;
		if ( tr.querySelector(".hotelName") )
			trs.push(tr);
	}
	return trs;
}

function extractBoardType(mainTr, otherTrs){
	var boards = [mainTr].concat(otherTrs).map(function(tr) {
		return tr.querySelector("[data-bo-text$='PansionName']").textContent;
	});
	return boards.join(" / ");	
}

function extractRoomType(mainTr, otherTrs){
	var rooms = [mainTr].concat(otherTrs).map(function(tr) {
		var cat = tr.querySelector("[data-bo-text$='RoomCategoryName']").textContent.trim();
		var accom = tr.querySelector("[data-bo-text$='AccommodationType']").textContent.trim();
		return cat + ", " + accom; 
	});
	return rooms.join(" / ");	
}

function extractTourUrl(tr) {
	var a = tr.querySelector("a.priceLink");
	return a ? a.href : null;
}

function createOption(img) {
	var tr = getHotelRowByImage(img);
	var otherTrs = getOtherRowsOfTheTour(tr);
	var option = {
            checkinDt : extractDate(tr),
            nights : extractNights(tr),
            region : extractRegion(tr),
			hotelName : extractHotelName(tr, otherTrs),
			href : extractHotelHref(tr),
            boardType : extractBoardType(tr, otherTrs),
            roomType :  extractRoomType(tr, otherTrs),
            price : extractIntFromStr(tr.querySelector("[data-bo-text^='i.Price']").textContent.replace(/[^\d]/g, "")),
            currency : mapCurrency(tr.querySelector("[data-bo-text^='Currency']").textContent),
            country: tr.querySelector("td.countryName").textContent,
            city_from: tr.querySelector("div.departureAirport").textContent,
            occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null,
            tour_url: extractTourUrl(tr)
        };

    return option;
}
