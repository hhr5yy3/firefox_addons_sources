var OPERATOR_NAME = "ruSPO";

//-------- Search Criteria ---------------------------

function initializeSearchCriteria() {
    var country = getCountry();
    if (!country) {
        return "";
    }
    return {
        "country": country.capitalizeFirstLetter(),
        "occupancy": getOccupancy()
    };
}

function getSearchButton() {
    return document.querySelector("#buttonSearch");
}

function getCountry() {
    return selectedOption(document.querySelector("#where"));
}

//--------- Rows ---------------------------------

function getCity(tds) {
    if (tds.getElementsByClassName("icon icon-not").length > 2) {
        return "";
    }
    return selectedOption(document.querySelector("#from"));
}

function injectData() {
    if ( !SEARCH_CRITERIA ) {
        return;
    }

    querySelectorAll(document, ".ruspo-results-table tr").forEach(function (tr) {
        var th = tr.querySelector("th");
        if ( th && th.textContent.trim() === "даты" && !th.parentNode.querySelector(".qq") ) {
            if ( th.parentNode.querySelectorAll("th").length < 7 ) {
                var clearTh = document.createElement("th");
                clearTh.className = "qq";
                clearTh.appendChild(document.createTextNode(" "));
                th.parentNode.appendChild(clearTh);
            }
            th.parentNode.appendChild(createHeadCell());
        }
        if ( !tr.querySelector(".qq") && (tr.hasAttribute("data-hotel-id") || tr.className === "unbord") ) {
            tr.appendChild(createCell());
        }
    });
}

function createHeadCell() {
    var newTh = document.createElement("th");
    newTh.className = "qq";
    newTh.appendChild(document.createTextNode("QQ"));
    return newTh;
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

function createOption(img) {
    var tr = img.parentNode.parentNode.parentNode;
    var tds = tr.querySelectorAll("td");
    var hotel = getHotel(tr);
    var option = {
        checkinDt: extractDate(tds[0].innerText),
        nights: extractNights(tds[0].innerText),
        hotelName: getHotelName(hotel),
        href: getURL(hotel),
        roomType: extractRoomAndBoard(tr.querySelector(".cap")),
        region: extractRegion(hotel),
        boardType: extractRoomAndBoard(tr.querySelector(".resfood")),
        price: extractIntFromStr(tr.querySelector(".price").textContent.replace(/\s+/g, "")),
        currency: mapCurrency(tr.querySelector(".price").parentNode),
        country: SEARCH_CRITERIA.country,
        city_from: getCity(tds[4]),
        operator: getOperator(tds[2]),
        occupancy: SEARCH_CRITERIA.occupancy,
        thumbnail : extractThumbnail(hotel)
    };
    return option;
}

function getHotel(tr) {
	if ( tr.className != "unbord" ) {
		while ( !tr.className || tr.className.indexOf("b2b__hotel-tours-container") < 0 ) {
			if ( tr.style.display === "table-row" ) {
			    break;
            }
		    tr = tr.parentNode;
		}
	}
	return tr.previousElementSibling;
}

function getHotelName(hotel) {
    var anchor = extractHotelNameAnchor(hotel);
    if ( anchor ) {
        return anchor.textContent;
    }
    var info = hotel.querySelector(".hinfo, .b2b__hotel-name, .cap.ib").textContent.replace(/\*\,/, "*");
    var span = hotel.querySelector(".hinfo span");
    return span ? info.replace(span.textContent, "") : info;
}

function getURL(hotel) {
    var anchor =  extractHotelNameAnchor(hotel);
    return anchor ? anchor.href : "";
}

function extractDate(dateAndDOW) {
    var matcher = dateAndDOW.match(/(\d\d)\.(\d\d)/);
    return appendYear(parseInt(matcher[1], 10), parseInt(matcher[2], 10));
}

function extractNights(nightsAndDays) {
    return nightsAndDays.match(/(\d+)\s+ноч/)[1];
}

function extractHotelNameAnchor(hotel) {
    return hotel.querySelector(".b2b__hotel-link");
}

function extractRegion(hotel) {
    return hotel.getElementsByTagName("span")[0].textContent;
}

function extractRoomAndBoard(tds) {
    if ( tds.tagName === "SPAN" ) {
        tds = tds.parentNode;
    }
    return tds.textContent.trim() + (tds.getAttribute("data-tip") ? ", " + tds.getAttribute("data-tip") : "");
}

function mapCurrency(td) {
	var text = td.textContent;
	
	var smallScreens = td.querySelector(".b2b__inline-operator-name_small-screens");
    if ( smallScreens ) {
    	text = text.replace(smallScreens.textContent, "");
    }

    switch ( text.replace(/[\d,.-.,\s]/g, "") ) {
        case "€": return "EUR";
        case "р": return "RUB";
        case "$": return "USD";
        case "руб": return "RUB";
        default: return text;
    }
}

function getOperator(td) {
    var a = td.querySelector("a, span");
    var oper = a && a.getAttribute("data-tip");
    return OPERATOR_NAME + (oper ? " / " + oper : "");
}

function getOccupancy() {
    var occupancy = {
        adultsCount: extractOccupancy("adults"),
        childrenCount: extractOccupancy("children"),
        childAges: null
    };

	if ( occupancy.adultsCount === null || occupancy.childrenCount === null ) {
		return null;
	}

    if (occupancy.childrenCount > 0) {
        var ages = [];
        for (var i = 1; i <= occupancy.childrenCount; i++) {
            var age = extractOptionalInt(selectedOption(document.querySelector("#child" + i)));
            if ( age === null ) {
                return null;
            }
            ages.push(age);
        }
        occupancy.childAges = ages.join(",");
    }

    return occupancy;
}

function extractOccupancy(paxType) {
    var ages = Array.fromList(document.querySelectorAll(".ruspo-section-people input[name=" + paxType + "]"))
    	.filter(function(input) { return input.checked; })
    	.map(function(input) { return input.value; });

    return ages.length == 1 ? extractOptionalInt(ages[0]) : null;
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function extractThumbnail(td) {
	var img = td.querySelector(".b2b__hotel-image-container img");
	return img && img.src ? img.src.replace("_i", "") : null;
}