var OPERATOR_NAME = "sletat.ru";
var OPERATOR_SLETAT_ID = -1;
var showTopHotelsRating = true;
function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

// --------- Rows ---------------------------------

function mapCurrency(s) {
    var c = trim(s);
    switch (c.toUpperCase()) {
        case "€": return "EUR";
        case "$": return "USD";
        case "Р": return "RUB";
        case "BR": return "BYN";
    }

    return c;
}

function extractDate(body) {
    var match = body.querySelector(".tour-dates").textContent.match(/(\d{2})([^\d]+)(\d{4})/);
    return dateFromDayAndMonthName(match[1], match[2].trim().replace(/a/g, "а"), match[3]);
}

function extractHotelName(body) {
    var starsElement = body.querySelector(".raiting");
    var starsMatch = starsElement.getAttribute("class").match(/star-(\d)/);
    var a = body.querySelector(".hotel a");
    return (a ? a.textContent.trim() : body.querySelector(".hotel").textContent.trim()) + (starsMatch ? " " + starsMatch[1] + "*" : " 1*");
}

function extractHotelUrl(body) {
    var a = body.querySelector(".hotel a");
    return a ? a.href : "";
}

function extractRegion(text) {
    return text;
}

function extractRoomType(body) {
    return body.querySelector(".info dd").textContent.trim() + " / " + body.querySelector(".tour-humans").textContent.trim();
}

function extractPrice(body) {
    return extractIntFromStr(body.querySelector(".tour-price-value").textContent.replace(/[^\d,]/g, ""));
}

function extractCurrency(body) {
    return mapCurrency(body.querySelector(".tour-price-value").textContent.replace(/[\d,]/g, ""));
}

function extractNights(body) {
    return body.querySelector(".tour-dates").textContent.match(/(\d+)\s*НОЧ/i)[1];
}

function extractBoardType(body) {
    return body.querySelector(".tour-meals").textContent;
}

function getCountry(text) {
    return text;
}

function getCity(body, text) {
	if ( /БЕЗ\sПЕРЕЛ(Е|Ё)ТА/i.test(body.querySelector(".tourpage-info-fly").textContent) )
		return "";
    return text;
}

function getOperator() {
    return OPERATOR_NAME + " / " + document.querySelector(".tour-operator-logo a").getAttribute("ng-href").trim().match(/[^\/]*$/)[0];
}

function createOption(img) {
    var body = img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var match = body.querySelector("h2").textContent.replace(/\n/g, "").match(/([^—]*)—([^,]*),\s?(\S*)/);

    var option = {
        checkinDt : extractDate( body ),
        hotelName : extractHotelName( body ),
        href : extractHotelUrl( body ),
        region : extractRegion( match[3] ),
        roomType: extractRoomType( body ),
        boardType : extractBoardType( body ),
        price : extractPrice( body ),
        currency : extractCurrency( body ),
        nights : extractNights( body ),
        country : getCountry( match[2] ),
        city_from : getCity( body, match[1] ),
        operator :  getOperator(),
        operatorSletatId : parseInt(getParameterByName("sourceId")),
        thumbnail : getBackgroundImageUrl(body.querySelector(".main-hotel-img"))
    };

    return option;
}

function createCell() {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());

    var div = document.createElement("div");
    div.className = "qq";
    div.setAttribute("style", "margin-left: 32px;");
    div.appendChild(nobr);

    return div;
}

function createNewViewCell() {
    var nobr = document.createElement("nobr");
    nobr.className = "qq";
    nobr.setAttribute("style", "padding-left: 8px;");
    nobr.appendChild(createAddButton(createOptionNewView));
    nobr.appendChild(createEditButton(createOptionNewView));
    return nobr;
}

function injectData() {
    var div = document.querySelector('.tour-price');
    var date = document.querySelector(".tour-dates");
    if ( div && !div.querySelector(".qq") && date && date.textContent.match(/(\d{2})([^\d]+)(\d{4})/) ) {
        div.appendChild(createCell());
    } else {
        div = document.querySelector('.tour-page-basic-info__price , .tour-head-price-info__price');
        if ( div && !div.parentNode.querySelector(".qq") && !div.querySelector(".tour-page-currency_sold")) {
            const container = qqBtns({align: 'qq-vertical'}, createOptionNewView);
            container.style.position = 'fixed';
            container.style.left = '60%';
            div.prepend(container);
        }
    }
}


function createOptionNewView(img) {
    var items = querySelectorAll(document, ".tour-details__paragraph");
    var inAndOutDates = getDateNewView(items[1]);
    var tourDep = document.querySelector(".tour-departure");
    var nights = getNightsNewView(tourDep, inAndOutDates);
    var boardAndroom =  getRoomTypeNewView(items[2]);
    var region = getRegion().split(",").map(elem=>elem.trim());
    const flight = getFlight();
	var option = {
			checkinDt : inAndOutDates[0],
			nights : nights,
            extra_nights : extractExtraNight(inAndOutDates, nights),
			hotelName : getHotelNameNewView(),
            hotel_desc: getNodeProperty(document.querySelector(".hotel-description"), null, "innerText"),
			href : window.location.href,
			roomType: boardAndroom[0],
            country:  region.shift(),
			region : region.join(", "),
			boardType : boardAndroom[1],
			price : getPriceNewView(),
			currency : getCurrencyNewView(),
            city_from: flight ? flight.sectors[0].segments[0].departureCity : getCityNewView(tourDep, document.querySelector(".additional-services__paragraph")),
			operator: getOperatorNewView(),
			thumbnail: getImgNewView(),
            flight
	};
	return option;
}

function getDateNewView(item) {
    var checkin = item.textContent.match(/(\d+)\s+(\S+)\s+(\d{4})/);
    var checkOut = item.textContent.match(/[—-]\s+(\d+)\s+(\S+).+(\d{4})/);
    return [dateFromDayAndMonthName(checkin[1], checkin[2], checkin[3]),
            dateFromDayAndMonthName(checkOut[1], checkOut[2], checkOut[3])];
}

function getNightsNewView(item, dates) {
    var nights =  item ? item.textContent.match(/(\d+)\s+ноч/) : null;
    if ( nights ) {
        return nights[1];
    }
    return getDistance(dayMonthYearToDate(dates[0]), dayMonthYearToDate(dates[1])).toString();
}

function extractExtraNight(dates, nights) {
    if ( !dates[1] ) {
        return "0";
    }
    return (getDistance(dayMonthYearToDate(dates[0]), dayMonthYearToDate(dates[1])) - nights).toString();
}

function getRegion() {
    var region = document.querySelector(".basic-info__tour-title").textContent.trim();
    var tooltip = document.querySelector(".wrong-resort-tooltip");
    if ( tooltip ) {
        return region.replace(tooltip.textContent, "");
    }
    return region;
}

function getRoomTypeNewView(item) {
    var room = document.querySelector(".hotel-details-room-type__text");
    var board = document.querySelector(".hotel-details-meal__text");
    board = board ? board.textContent.trim() : "";
    var acc = item.textContent.replace(board, "").trim();
    return [room ? room.textContent.trim() + ", " + acc : acc, board];
}

function getHotelNameNewView() {
    var stars = document.querySelector(".hotel-category");
    var name = document.querySelector(".hotel-name, .hotel-details-title");
    stars = stars ? stars.textContent : null;
    return stars ?  name.textContent.replace(stars, "") + " " + stars + "*" : name.textContent;
}

function getPriceNewView() {
   return extractIntFromStr(document.querySelector(".tour-page-currency").textContent.replace(/\s+/g,""));
}

function getCurrencyNewView() {
	return mapCurrency(document.querySelector(".tour-page-currency").textContent.replace(/[\d,\.]/g,""));
}

function getCityNewView(item, included) {
    if ( !included ) {
        return null;
    }
    if ( /авиаперелёт/i.test(included.textContent) ) {
    	return item.textContent.split(/,\s+\d+/)[0].replace(/Из/i, "");
    }
	return "";
}

function getOperatorNewView() {
  return OPERATOR_NAME + " / " + (getNodeProperty(document.querySelector(".operator-info__image"), "", "title" ) ||
                                  getNodeProperty(document.querySelector(".operator-info"), "" ));
}

function getImgNewView() {
   var image = document.querySelector(".uikit-carousel__slide_tour-page img, .tour-page__gallery img");
   return image ? image.src : null
}

function getFlight() {
    try {
        return parseSegments(parseSectors(findFlightSection()));
    } catch (e) {
        console.log(e);
        return null;
    }
}

function findFlightSection() {
    var partOfFlightNode = document.querySelector("section[class*='selected'] .direction-end-point") || document.querySelector(".direction-end-point");
    if ( !partOfFlightNode ) {
        return null;
    }
    var elem = partOfFlightNode.parentNode;
    while (partOfFlightNode) {
        if ( elem.tagName === "SECTION" ) {
            return elem;
        }
        elem = elem.parentNode;
    }
    return null;
}

function parseSectors(flightSection) {
    var mainDiv =  flightSection.querySelector("div:not([class*='selected'])");
    return [...mainDiv.firstElementChild.children]
        .map(node => {
            var airline = node.querySelector('img[src*=avia]');
            var directions = querySelectorAll(node, ".direction-end-point")
                .map(point => insertAirline(point.innerText.split(/\n/), airline));
            if ( directions.length !== 2 ) {
                throw "Directions length != 2"; //всегда два элемента, начало и конец;
            }
            var stops = getStops(node); //Получаем остановки(пересадки)
            return [directions[0], ...stops, directions[1]];
        });
}

function getStops(node) {
    var stop = findNodeByText(querySelectorAll(node, "span"), /\d+\s+пересад/i);

    if ( stop ) {
        var stopTooltip = stop.nextElementSibling;
        stopTooltip = stopTooltip ? stopTooltip.querySelector(".flights-tooltip") : null;
        if ( stopTooltip ) {
            var tooltipText = stopTooltip.innerText.split(/\n/);
            var stopsArray = new Array(+stop.textContent.match(/\d+/)[0]).fill(null).map(elem => ["", "", "", ""]);
            return stopsArray.map((arr, index) => {
                if ( tooltipText.length > 0 ) {

                    return  {
                        city: tooltipText[0].split(/\s*\(/)[0],
                        id: String(tooltipText[0].match(/[A-Z]{3}/)),
                        depDate: getFlightDateTime(tooltipText[2]),
                        arrDate: getFlightDateTime(tooltipText[1])

                    };
                }
                return arr;
            });
        }
        return new Array(+stop.textContent.match(/\d+/)[0]).fill(["", "", "", ""]);
    }
    return [];
}

function insertAirline(array, airline) {
    if ( array && Array.isArray(array) ) {
        array.splice(3, 0, (getNodeProperty(airline, null, "alt")));
        return array ;
    }
    return null;
}
function parseSegments(sectorsArray) {
    return {
        sectors: sectorsArray.map(sector => {
            var segments = [];
            for ( var n = 0; n < sector.length-1; n++ ) {
                segments.push(createSegment(sector[n],  sector[n+1], sector));
            }
            return {
                segments: segments
            }
        })
    }
}

function getFlightDateTime(text) {
    var matcher = text.match(/(\d{2}\:\d{2}),*\s*(\d+)\s+([А-я]+),*/) || null;
    if ( !matcher ) {
        return {
            time: null,
            date: null
        }
    }
    return {
        time: matcher[1],
        date: appendYear(+matcher[2], monthNameToNumber(matcher[3]))
    }

}

function findNodeByText(nodes, text) {
    return nodes.find(node => node.textContent.match(text));
}

function createSegment(dep, arr, segments) {
    const isDepArray = Array.isArray(dep);
    const isArrArray = Array.isArray(arr);
    var dateTimeDep = isDepArray ? getFlightDateTime(dep[2]) : dep.depDate;
    var dateTimeArr = isArrArray ? getFlightDateTime(arr[2]) : arr.arrDate;
    return {
            flightNumber: isDepArray ? (dep[1].match(/Рейс\s*(.+?)\./) || "")[1] : (arr[1].match(/Рейс\s*(.+?)\./) || "")[1],
            airline: dep[3] || arr[3],
            departureDate: dateTimeDep.date,
            departureTime: dateTimeDep.time,
            departureCity: !isDepArray ? dep.city  : lastElement(dep[1].split(". Рейс")[0].split(",")).trim(),
            departureAirport: !isDepArray ? null : dep[1].split(",")[0].replace(/Рейс.+/g, "").trim() || dep[0],
            departureAirportID: !isDepArray ? dep.id : dep[0],
            departureTerminal: null,
            serviceClass: null,
            arrivalDate: dateTimeArr.date,
            arrivalTime: dateTimeArr.time,
            arrivalCity: !isArrArray ? arr.city : lastElement(arr[1].split(". Рейс")[0].split(",")).trim(),
            arrivalAirport: !isArrArray ? null : arr[1].split(",")[0].replace(/Рейс.+/g, "").trim() || arr[0],
            arrivalAirportID: !isArrArray ? arr.id : arr[0],
            arrivalTerminal: null,
            travelTime: null,
            plane: null
        }
}

function getHotelRowByImage(img) {
	var div = img.parentNode;
	while (true) {
		if ( div.className == "tour-page") {
		    break;
		}
		div = div.parentNode;
	}
	return div;
}
