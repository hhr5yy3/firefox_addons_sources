var OPERATOR_NAME = "Tourindex";

function initializeSearchCriteria() {
    if ( !document.querySelector(".chooser-block.search-result") ) {
    	return null;
    }
	var occupancy = getOccupancy();
	return {
		"occupancy": occupancy
	};
}

function getSearchButton() {
    return null;
}

function injectData() {
	console.log('try to injectData tourindex');
	var tables = document.querySelectorAll("table.sr-table");
	if ( tables === null ) {
		return;
	}

	for ( var i = 0; i < tables.length; i++) {
		var trs = tables[i].querySelectorAll("tbody>tr");
		if ( trs.length === 0 ) {
			continue;
		}
		injectTitle(tables[i].querySelector("thead>tr"));

		for ( var j = 0; j < trs.length; j++) {
			injectRow(trs[j]);
		}
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
	td.appendChild(qqBtns({align:"vertical", asyncFunc:getAsyncInfo}));

	tr.appendChild(td);

}

function extractDate(tr) {
    var date = tr.querySelector(".sr-departure-day");
    if ( !date ) {
        date = tr.querySelector(".sr-flights");
    }
    var match = date.textContent.match(/(\d+)\.(\d+)/);
    if ( match ) {
        return appendYear(extractIntFromStr(match[1]),extractIntFromStr(match[2]));
    }
    match = date.textContent.match(/(\d+)\s+([^\s]+)/);
    return dateFromDayAndMonthName(match[1], match[2]);
}

function extractNights(tr) {
	return tr.querySelector(".sr-nights").textContent.match(/\d+/)[0];
}

function extractRoomType(rs) {
	var roomType = rs.querySelector('[bo-text="item.roomType.name"]');
	roomType = roomType ? roomType.innerText : rs.querySelector(".sr-roomtype").innerText;
	var roomView = rs.querySelector(".sr-roomview");
	roomView = roomView ? roomView.innerText.trim() : "";
	return roomType + (roomView ? ", " + roomView : "");
}

function extractBoardType(tr) {
    var meal = tr.querySelector(".sr-meal");
    return meal.title ?  meal.textContent + ": " + meal.title : meal.textContent;
}

function extractPriceAndCurrency(rs) {
    var match = rs.querySelector(".sr-price-rub").textContent.split(/\s+/).join("").match(/(\d+)([^\d]+)/);
    return [match[1], mapCurrency(match[2])];
}

function extractURL(rs) {
	var a = rs.querySelector(".sr-hotel-name");
	return a && a.href ? a.href : "";
}

function qs(rs, selector) {
	var r = rs.querySelector(selector);
	return r !== null ? r : rs.querySelector(selector.split("item.").join("subitem."));
}

function extractHotelName(rs) {
	var s = rs.querySelector(".sr-hotel-name span");
	return s ? s.textContent : rs.querySelector(".sr-hotel-name").textContent;
}

function createOption(img) {
	var rs = img.parentNode.parentNode.parentNode;
	var priceAndCurrency = extractPriceAndCurrency(rs);
	var operator = qs(rs,"[bo-text*='item.operator.name']");

	var option = {
            checkinDt : extractDate(rs),
            nights : extractNights(rs),
            region : rs.querySelector(".sr-resort-name").textContent,
            hotelName : extractHotelName(rs),
            boardType : extractBoardType(rs),
            roomType :  extractRoomType(rs),
            price : extractIntFromStr(priceAndCurrency[0]),
            currency : priceAndCurrency[1],
            href : extractURL(rs),
            country : document.querySelector("[sly-show=\"country.id\"]").textContent.split("—")[1].trim(),
            city_from: document.querySelector("[sly-show=\"country.id\"]").textContent.split("—")[0].trim(),
            operator : OPERATOR_NAME + ( operator === null ? "" : " / " + operator.textContent),
            occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : getOccupancy(),
            flight: JSON.parse(rs.getAttribute("flight-info") || null)
        };
    return option;
}

function mapCurrency(code) {
	switch (code) {
    case "$": return "USD";
    case "€": return "EUR";
    case "р.": return "RUB";
    case "грн.": return "UAH";
	}
	return code;
}

function getOccupancy() {
	var occupancy = {
			adultsCount: 0,
			childrenCount: 0,
			childAges: null
	};
	var pax =  document.querySelector("roomsizetitle");
	if ( !pax ) {
		return null;
	}
	var adults = pax.textContent.match(/\d+/) ? pax.textContent.split("(")[1].match(/\d+/)[0] : null;
	var children = pax.textContent.match(/\двумя|тремя|ребенком/) ? pax.textContent.match(/\двумя|тремя|ребенком/)[0] : null;
	occupancy.adultsCount = extractOptionalInt(adults);
	if (  children ) {
		occupancy.childrenCount = extractOptionalInt( mapChildren(children) );
	}
	if ( occupancy.childrenCount > 0 ) {
		var ageInputs = [];
		var ages = [];
		var temp = document.querySelectorAll("roomsize")[1] ? document.querySelectorAll("roomsize")[1] : document.querySelectorAll("roomsize")[0];
		if ( document.querySelector(".chooser-block.search-result") ) {
			var temp_sel = document.querySelectorAll("roomsize")[0].querySelector(".chooser-filter-select .chooser-filter-select-txt");
			if ( !temp_sel ) {
				return null;
			}
			temp = temp_sel.textContent.match(/\d+/g);
			if ( occupancy.childrenCount  !== temp.length ) {
				return null;
			}
			for ( var i = 0; i < temp.length; i++ ) {
				var age = extractOptionalInt(temp[i]);
				if ( age === null ) {
					age =  0;
				}
				ages.push(age);
			}
		} else {
            var inputsAll = temp.querySelectorAll(".sr-filter-select");
            if ( inputsAll.length === 0 ) {
            	return null;
			}
			for ( var i = 2; i <= occupancy.childrenCount+1; i++ ) {
				if ( !inputsAll[i] ) {
					return null;
				}
				var input= inputsAll[i].querySelector(".chosen-single");
				if ( !input ) {
					return null;
				}
				ageInputs =  input.textContent;
				var age = extractOptionalInt(ageInputs);
				if ( age === null ) {
					age =  0;
				}
				ages.push(age);
			}
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

async function getAsyncInfo(img) {
    if ( !canGetFlightInfo(img) ) {
        return null;
    }
    var tour = img.parentNode.parentNode.parentNode;
    if ( tour && !tour.getAttribute("flight-info") ) {
        var tourId = tour.querySelector('[data-tour-id]').getAttribute("data-tour-id");
        var htmlInfo = await getInfoWithFetch(tourId);
        if ( htmlInfo ) {
            var tempNode = document.createElement("div");
            tempNode.insertAdjacentHTML("afterBegin", sanitize(htmlInfo));
            tour.setAttribute("flight-info", JSON.stringify(createFlightInfo(tempNode)));
        }
    }
}

function createFlightInfo(node) {
    var sectors = querySelectorAll(node, "tr").filter(tr => tr.querySelector(".ico_right_arrow, .ico_left_arrow"))
        .map(tr => {
                return {
                    date: getText(tr.querySelector(".date")),
                    flightText: getText(querySelectorAll(tr, "td").find(td => getText(td).match(/А_П::/)))
                }
            });
    return { sectors: sectors.map( sector => parseSector(sector) ) }
}

function parseSector(sector) {
    var textSegments = sector.flightText.split(/\/|::|,/);
    var time = textSegments[5].trim().split(/-/);
    var portIds = textSegments[4].trim().split(/-/);
    return {
        segments: [new FlightSegment( {
            flightNumber: textSegments[3],
            departureDate: sector.date,
            departureTime: time[0],
            departureCity: textSegments[1],
            departureAirportID: portIds[0],
            arrivalCity: textSegments[2],
            arrivalTime: time[1],
            arrivalAirportID: portIds[1]
        } )]
    }
}

function getInfoWithFetch(tourId) {
    return fetchTimeout(10000, fetch(`https://tourindex.ru/tour/get_check_offer?id=${tourId}`, {
        "credentials": "include",
        "headers": {"accept":"application/json, text/plain, */*","accept-language":"ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7","x-requested-with":"XMLHttpRequest"},
        "referrer": "https://tourindex.ru/search/result?",
        "referrerPolicy": "no-referrer-when-downgrade",
        "method": "GET",
        "mode": "cors"
    })).then( response => response.json() ).then( json => json.ajaxdata.services ).catch( e => null )
}

function getFlight() {
    return true;
}
