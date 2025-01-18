var OPERATOR_NAME = "Pegas";
var OPERATOR_SLETAT_ID = 3;
var showTopHotelsRating = true;
var QQ_CELL_WIDTH = 46;

function getCountry() {
	return selectedOption(document.querySelector("form select.toCountry"));
}

function getCity() {    
	return selectedOption(document.querySelector("form select.fromLocation"));
}

function getOccupancy() {
    var occupancy = {
			adultsCount: 0,
			childrenCount: 0,
			childAges: null	
		};
    var s = selectedOption(document.querySelector("form select.adults"));
    if ( !s )
    	return null;
    occupancy.adultsCount = extractIntFromStr(s);
    
    s = selectedOption(document.querySelector("form select.childs, .children"));
    if ( !s )
    	return null;
    occupancy.childrenCount = extractIntFromStr(s);
    
    if ( occupancy.childrenCount > 0 ) {
    	var ages = [];
    	var inputs = document.querySelectorAll("form input.childAge, .age-container input");

    	for ( var i=0; i<occupancy.childrenCount; ++i ) {
			ages.push(extractIntFromStr(parseInt((inputs[i].value)) ? inputs[i].value : "10"));
    	}
    	occupancy.childAges = ages.join(",");
    }
        
    return occupancy;     
}

function initializeSearchCriteria() {    
    var country = getCountry();
    if ( !country )
        return null;
        
    var city = getCity();
    if ( !city )
        return null;

    var occupancy = getOccupancy();
    
    return { "country" : country,
    		 "city" : city,
    		 "occupancy" : occupancy
    		 };
}

function getSearchButton() {
    return document.querySelector("input.main-button.pegasys_search_button");
}

function injectData() {
	var trs = document.querySelectorAll(".pegasys_search_results > .row");

	if ( trs.length > 0 && trs[0].querySelector("div.qq") == null ) {
		var div = document.createElement("div");
		div.className = "qq";
		div.appendChild(document.createTextNode("QQ"));
		trs[0].appendChild(div);
		trs[0].querySelector(".price").setAttribute("style", "right: -42px;");
	}

	for ( var i = 1; i < trs.length; i++) {
		if ( trs[i].querySelector("div.qq") == null && getChildElementsByTagName(trs[i], "div").length > 6 ) {
			var td = document.createElement("div");
            td.appendChild(qqBtns({ asyncFunc: getAsyncInfo, align: 'qq-vertical' }));
            var bElement = trs[i].querySelector(".price");
			if ( trs[i].querySelector(".price-warning") ) {
				trs[i].insertBefore(td, bElement);
			} else {
                bElement.after(td);
			}
			trs[i].querySelector(".price").setAttribute("style", "right: -42px;");
		}
	}
}

function extractHotelName(row) {
	var nodes = row.querySelectorAll(".hotellist .hotel-node");
	var rooms = row.querySelectorAll(".room-type__result .room-type__result-text");
	var hotels = [];
	for (var i=0; i<nodes.length; i++) {
		var a = nodes[i].querySelector("a.hotelname");
		var name = a ? a.textContent : nodes[i].textContent.trim();
		var nts = rooms[i].textContent.match(/(\d+) ноч/);
		if ( nts )
			name += " " + nts[1] + "н.";
		hotels.push(name);
	}
	return hotels.join(" / ");
}

function extractRegion(row) {
	var nodes = row.querySelectorAll(".hotel-node .location-info");
	var ar = [];
	for (var i=0; i<nodes.length; i++)
		ar.push(nodes[i].textContent.trim());
	return ar.join(" / ");
}

function extractNights(row) {
	var div = row.querySelector(".duration") || row.querySelector(".duration_result");
	return div.textContent.trim().match(/^(\d+)/)[1];
}

function extractRoomType(row) {
	var nodes = row.querySelectorAll(".room-type__result-text");
    var rooms = [];
    for (var i=0; i<nodes.length; i++) {
        var divs = nodes[i].querySelectorAll("div");
        var ar = [];
        for (var j=0; j<divs.length; j++) {
        	if (!(/\d+ ноч/.test(divs[j].textContent)))
        		ar.push(divs[j].textContent.trim());
        }
        rooms.push(ar.join(", "));
    }
    return rooms.join(" / ");
}

function getHotelRowByImage(img) {
	return img.parentNode.parentNode.parentNode;
}

function extractHref(row) {
	var a = row.querySelector(".hotel-node a.hotelname");
	return a ? a.href : "";
}

function extractBoardType(row) {
    var nodes = row.querySelectorAll(".mealdata .meal_code");
    var ar = [];
    var code = [];
    for (var i = 0; i < nodes.length; i++) {
        var t = nodes[i].getAttribute("title");
        if ( t && t.trim().length > 0 ) {
        	code.push(t.trim());
        	ar.push(t.trim() + ", " + nodes[i].textContent.trim());
        } else {
            ar.push(nodes[i].textContent.trim());
        }
    }
    return [ar.join(" / "), code.join(",")];
}

function extractTourUrl(row) {
	var a = row.querySelector(".price a");
	return a ? a.href : null;
}

function createOption(img) {
    var row = getHotelRowByImage(img);
    var priceAndCurrency = row.querySelector(".price .button").textContent.split(/\s/).join("").match(/(\d+)([^\d]*)/);
    var multiHotels = JSON.parse(row.getAttribute("multihotels") || null);
    var showMoreBtn = row.querySelector("a.show-more");
    var option = {
        checkinDt: row.querySelector(".start").textContent.match(/(\d+\.\d+\.\d+)/)[1],
        nights: extractNights(row),
        extra_nights: extractExtraNights(row),
        hotelName: extractHotelName(row),
        href: extractHref(row),
        region: extractRegion(row),
        roomType: extractRoomType(row),
        boardType: extractBoardType(row)[0],
        boardCode: extractBoardType(row)[1],
        price: extractIntFromStr(priceAndCurrency[1]),
        currency: mapCurrency(priceAndCurrency[2]),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        occupancy: SEARCH_CRITERIA.occupancy,
        tour_url: extractTourUrl(row),
        flight: JSON.parse(row.getAttribute("flight-tour-info") || null)
    };

    if ( showMoreBtn && getText(showMoreBtn).match(/отел/i) ) {
        option.skipRatingSearch = true;
    }
    if ( multiHotels ) {
        option.skipRatingSearch = false;
        Object.assign(option, multiHotels);
    }
    return option;
}

function mapCurrency(c) {
	switch(c.toLowerCase()) {
		case "$": return "USD";
		case "€": return "EUR";	
		case "р.": return "RUB";
	}
	return c;
}

function extractExtraNights(row) {
	   var sel = row.querySelector(".computedNights_right");
	   var d = sel ? sel.textContent.match(/\d+/) : null;
	   return d ? d[0] : null;  
}

async function getAsyncInfo(img) {
    var tr = img.parentNode.parentNode.parentNode;

    if ( !tr.getAttribute("flight-tour-info") && canGetFlightInfo(img) ) {
        await openPopup();
    }

    if ( !tr.getAttribute("multihotels") ) {
        await getMultiHotels();
    }

    async function openPopup() {
        var openPopupBtn = tr.querySelector('.show-extended-info');
        simulateEvent(openPopupBtn, 'click');
        await waitingFor(getPopupInfo, 50, 200).then(result => {
            tr.setAttribute("flight-tour-info", result);
            var closeBtn = document.querySelector(".popup_wrapper i.cross");
            closeBtn ? closeBtn.click() : null;
        });

        function getPopupInfo() {
            var ext = document.querySelector(".tour_extended_information");
            var rows = querySelectorAll(ext, ".row").filter( row => row.querySelector('.default-hotel, .default-flight'));
             if ( ext && rows.length > 0 ) {
                 var sectorsArray = extractSectors(rows);
                 return JSON.stringify(convertSectors(sectorsArray));
             }
            return null;
        }
    }

    async function getMultiHotels() {
            var showMoreBtn = tr.querySelector("a.show-more");
            if ( showMoreBtn && getText(showMoreBtn).match(/отел/i)) {
                showMoreBtn.click();
                await waitingFor(getMultiHotelsInfo, 50, 50).then(result => {
                    tr.setAttribute("multihotels", result);
                    var closeBtn = tr.querySelector("a.show-more");
                    closeBtn && getText(closeBtn).match(/свернут/i) ? closeBtn.click() : null;
                });
        }

        function getMultiHotelsInfo() {
            var hotels = querySelectorAll(tr, ".hotel-node");
            if ( hotels.length < 2 ) {
                return null;
            }
            var multihotels = {
                hotelName: extractHotelName(tr),
                region: extractRegion(tr),
                roomType: extractRoomType(tr),
                boardType: extractBoardType(tr)[0],
                boardCode: extractBoardType(tr)[1],
            };
            return JSON.stringify(multihotels);
        }
    }

}

function extractSectors(flightsAndHotels) {
    var sectorsArray = [];
    var tempArray = [];
    flightsAndHotels.forEach(segment => {
        if ( segment.querySelector(".default-hotel") ) {   //делим сегменты на сектора, в случае если "встретился" отель
            tempArray.length > 0 ? sectorsArray.push(tempArray) : null;
            tempArray = [];
        } else {
            tempArray.push(segment)
        }
    });

    if ( tempArray.length > 0 ) {
        sectorsArray.push(tempArray);
    }
    if ( sectorsArray.length === 0 ) {
        return null;
    }
    return sectorsArray;
}

function convertSectors(sectors) {
    return {
        sectors: sectors.map( sector => {
            return {segments: sector.map(row => createSegment(row)) };
        })
    }
}

function createSegment(row) {
    var segment = row.innerText.split(/,|—|\n/);
    var startData = segment[0].trim().split(/\s+/);
    var endData = segment[1].trim().split(/\s+/);
    var parsedSegment = {
        flightNumber: segment[2],
        airline: segment[7].trim(),
        departureDate: startData[0],
        departureTime: startData[1],
        departureCity: segment[3].replace(/\(.+/, "").trim(),
        departureAirport: null,
        departureAirportID: (segment[3].match(/\((.+)\)/) || "")[1],
        departureTerminal: null,
        serviceClass: segment[5],
        arrivalDate: endData[0],
        arrivalTime: endData[1],
        arrivalCity:  segment[4].replace(/\(.+/, "").trim(),
        arrivalAirport: null,
        arrivalAirportID: (segment[4].match(/\((.+)\)/) || "")[1],
        arrivalTerminal: null,
        travelTime: null,
        plane: segment[6],
    };
    return parsedSegment;
}

function getFlight() {
    return true;
}
