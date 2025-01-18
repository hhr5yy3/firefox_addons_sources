var OPERATOR_NAME = "Pegas";
var OPERATOR_SLETAT_ID = 3;
var OPERATOR_BOOKABLE_VIA_SLETAT = true;
var showTopHotelsRating = true;
function getCountry() {
	var select = selectedOption(document.querySelector("#DestinationCountries"));
	if ( !select ) {
		return null;
	}
	switch (select) {
	case "Доминиканская республика": return "Доминикана";
	default: return select;
	}
}

function getCity() {
    return selectedOption(document.querySelector("#DepartureLocations")) || "";
}

function getOccupancy() {
	var occupancy = {
			adultsCount: 0,
			childrenCount: 0,
			childAges: null
		};

    var s = selectedOption(document.querySelector("#Adults"));
    if ( !s )
    	return null;
    occupancy.adultsCount = extractIntFromStr(s);

    var s = selectedOption(document.querySelector("#Children"));
    if ( !s )
    	return null;
    occupancy.childrenCount = extractIntFromStr(s);

    if ( occupancy.childrenCount > 0 ) {
    	var ages = [];
    	var inputs = document.querySelectorAll("#child-ages input");

    	if ( inputs.length != occupancy.childrenCount ) {
			return null;
		}

    	for ( var i = 0; i < occupancy.childrenCount; ++i ) {
    		if ( !inputs[i].value.match(/\d/) ) {
    			return null;
    		}
			ages.push(extractIntFromStr(inputs[i].value));
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
    if ( !occupancy ) {
    	return null;
    }

    return { "country" : country,
    		 "city" : city,
    		 "occupancy" : occupancy
	 };
}

function getSearchButton() {
    return document.querySelector("#search-button");
}


var errorCount = 0;
function injectData() {
	var trs = document.querySelectorAll("#search-result .search-result-table>tbody>tr");
	if ( !SEARCH_CRITERIA && trs.length > 0 ) {
		errorCount++;
    	if ( errorCount == 5 ) {
    		var childDiv = document.querySelectorAll(".children");
    		setTimeout(function() {
                logError("no child-ages", null, childDiv ? childDiv.innerHTML : "");
            }, 10);
	    }
		return;
	}
	// var head = document.querySelector("#search-result .search-result-table>thead>tr");
	// if ( head != null && head .querySelector("th.qq") == null ) {
	// 	document.querySelector("#search-result .search-result-table").setAttribute("style", "width: 97%;")
	// 	var th = document.createElement("th");
	// 	th.className = "qq";
	// 	th.setAttribute("style", "text-align:center; width:24px;");
	// 	th.appendChild(document.createTextNode("QQ"));
	// 	head.appendChild(th);
	//
	// 	// adjust table size
	// 	var nds = document.querySelectorAll("#search-result, #search-result .table-container");
	// 	for ( var i = 0; i < nds.length; i++) {
	// 		nds[i].setAttribute("style", "width:940px;");
	// 	}
	// }

	for ( var i = 0; i < trs.length; i++) {
		if ( !trs[i].querySelector(".qq") && getChildElementsByTagName(trs[i], "td").length > 8 ) {

			var btns = qqBtns({ asyncFunc: getAsyncInfo, align: 'qq-horizontal' });
			var edtBtn = btns.querySelector(".qq-edit-btn");
			const priceTd = trs[i].querySelector('.price-column');
			if (priceTd)  {
			    priceTd.appendChild(btns);
			    btns.style.minWidth = '72px';
            } else {
                var td = document.createElement("td");
                td.className = "qq";
                td.appendChild(btns);
                btns.style.position = "absolute";
                trs[i].appendChild(td);
            }
			if ( window !== top ) {
                edtBtn.setAttribute("popupStick", true);
            }
		}
	}
}

function getHotelRowByImage(img) {
	return img.parentNode.parentNode.parentNode;
}

function extractRoomType(td) {
	var  inner = td.querySelector(".inner");
	if ( inner ) {
		return inner.textContent;
	}

	var spans = td.querySelectorAll("span");
	return spans[0].textContent + ", " + spans[1].textContent;
}

function extractTourUrl(row) {
	var a = row.querySelector(".price-column .button");
	return a ? a.href : null;
}

function createOption(img) {
	var row = getHotelRowByImage(img);
	var multiRows = collectMultirows(row);
	var priceAndCurrency = row.querySelector(".price-column .button").textContent
		.split(/\s+/).join("").match(/(\d+)([^\d]*)/);
    const flight = JSON.parse(row.getAttribute("flight-tour-info") || null);
    const nights = row.querySelector(".duration-column").querySelector(".duration").textContent;
	var option = {
            checkinDt : row.querySelector(".departure-date-column").textContent.match(/(\d+\.\d+\.\d+)/)[1],
            nights,
            extra_nights: extractExtraNights(nights, flight),
			hotelName : multiRows.map(tr => getText(tr.querySelector(".hotel-column a")) + getNodeProperty(tr.querySelector(".room span.no-wrap"), "")).join(" / "),
			href : getNodeProperty(row.querySelector(".hotel-column a"), null, "href"),
		    region :  multiRows.map(tr => getText(tr.querySelector(".hotel-column .hotel-location-description"))).join(" / "),
            roomType :   multiRows.map(tr => extractRoomType(tr.querySelector(".room"))).join(" / "),
            boardType :  multiRows.map(tr => getText(tr.querySelector(".meal"))).join(" / "),
            price : extractIntFromStr(priceAndCurrency[1]),
            currency : mapCurrency(priceAndCurrency[2]),
            country: SEARCH_CRITERIA.country,
            city_from: SEARCH_CRITERIA.city,
            occupancy: SEARCH_CRITERIA.occupancy,
            tour_url: extractTourUrl(row),
            flight: JSON.parse(row.getAttribute("flight-tour-info") || null)
        };
    return option;
}

function extractExtraNights(nights, flight) {
    if ( !flight ) {
        return null;
    }
    const startDate = flight.sectors[0].segments[0].departureDate;
    const endDate = lastElement(lastElement(flight.sectors).segments).arrivalDate;
    const fullNights = getDistance(dayMonthYearToDate(startDate), dayMonthYearToDate(endDate));
    return (fullNights - nights).toString();
}

function collectMultirows(row) {
    var rows = [];
    var currentRow = row.nextElementSibling;
    rows.push(row);
     while (currentRow) {
        if ( currentRow.querySelectorAll("td").length !== 3 ) {
            break;
        }
        rows.push(currentRow);
        currentRow = currentRow.nextElementSibling;
    }
    return rows;
}

function mapCurrency(c) {
	switch(c.toLowerCase()) {
	case "$": return "USD";
	case "€": return "EUR";
	case "с": return "KGS";
	case "р.": return "RUB";
    case "₸": return "KZT";
    }
	return mapCurrencyUtil(c);
}

async function getAsyncInfo(img) {
    if ( !canGetFlightInfo(img) ) {
        return null;
    }
    var tr = img.parentNode.parentNode.parentNode;
    try {
        var tourInfo = await getInfoWithFetch(tr.querySelector(".tour-structure input").value);
        var flightsAndHotels = [...tourInfo['FlightServiceDescriptions'], ... tourInfo['HotelServiceDescriptions']];
        var sectorsArray = extractSectors(flightsAndHotels);
        tr.setAttribute("flight-tour-info", JSON.stringify(convertSectors(sectorsArray)));
        tr.setAttribute("hotels-tour-info", JSON.stringify(tourInfo['HotelServiceDescriptions']));
    } catch (e) {
        return img;
    }
    return img;
}

function getInfoWithFetch(id) {
    return fetchTimeout(10000, fetch(`${window.location.origin}/PackageCalculation/GetDetailedSearchResultItem`, {
        "credentials": "include",
        "headers": {
            "accept": "*/*",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/json; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrer": window.location.origin,
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": `{'SearchResultItemId':'${id}'}`,
        "method": "POST",
        "mode": "cors"
    })).then(resp => resp.json()).catch(e => {
        return null
    })
}

function extractSectors(flightsAndHotels) {
    flightsAndHotels.sort(compareSortIndex); //Сортируем по SortIndex, так как в полученном массиве сегменты случайном порядке
    var sectorsArray = [];
    var tempArray = [];
    flightsAndHotels.forEach(segment => {
        if ( segment['HotelId'] ) {   //делим сегменты на сектора, в случае если "встретился" отель
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
            return {segments: sector.map(segment => createSegment(segment)) };
        })
    }
}

function createSegment(segment) {
    var [start, end] = [...segment['SegmentDescription'].split("–")].map(point => point.split(","));
    const arrivalTime = end[0].match(/\d{2}:\d{2}/);
    var parsedSegment = {
        flightNumber: start[0],
        airline: end[3].trim(),
        departureDate: dateObjToString(segment['StartDate']),
        departureTime: timeObjToString(segment['StartDateTimeOfDay']),
        departureCity: start[1].replace(/\(.+/, "").trim(),
        departureAirport: null,
        departureAirportID: (start[1].match(/\((.+?)\)/) || "")[1],
        departureTerminal: null,
        serviceClass: (segment['FlightClass'] || '')['Name'],
        arrivalDate: dateObjToString(segment['EndDate']),
        arrivalTime: arrivalTime ? arrivalTime[0] : timeObjToString(segment['EndDateTimeOfDay']),
        arrivalCity:  end[0].replace(/\(.+/, "").trim(),
        arrivalAirport: null,
        arrivalAirportID: (end[0].match(/\((.+?)\)/) || "")[1],
        arrivalTerminal: null,
        travelTime:null,
        plane: end[2].trim()
    };
    return parsedSegment;
}

function dateObjToString(date) {
    return  dayMonthYearToString(date['Day'], Number(date['Month'])+1, date['Year']);
}

function timeObjToString(time) {
    return (time['Hour']+"").padStart(2,0) + ":" + (time['Minute']+"").padStart(2,0);
}

function compareSortIndex(indexA, indexB) {
    return indexA.SortIndex - indexB.SortIndex;
}

function getFlight() {
    return true;
}
