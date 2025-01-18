var OPERATOR_NAME = "tourbo.travel";
var OPERATOR_CURRENCY = "tourbo.travel";
var DEFAULT_CURRENCY = "RUB";
window.showTopHotelsRating = true;
//-------- Search Criteria ---------------------------
function initializeSearchCriteria() {
	var div = document.querySelector("div[data-role='search-filter']");
	if ( !div ) {
		return null;
	}
	var scrt = JSON.parse(div.getAttribute("data-value"));
	if ( !scrt || !scrt.country || !scrt.country.name || !scrt.departCity || !scrt.departCity.name ) {
		return null;
	}
	return {
		"country": scrt.country.name,
		"city": scrt.departCity.name,
		"occupancy": getOccupancy(scrt)
	};
}

function getSearchButton() {
	return document.querySelector("[data-role='submit-button']");

}

function injectData() {
	injectCurrencySelection();
	var divs = document.querySelectorAll("div[data-role='offer']");
	for ( var i = 0; i < divs.length; i++ ) {
		if ( !divs[i].querySelector(".qq") ) {
			const btns = qqBtns({asyncFunc: getFlight});
			btns.style.marginTop = '48px';
			btns.style.marginRight = '24px';
			btns.style.maxHeight = '24px';
			divs[i].appendChild(btns);
		}
	}
}

function createOption(img) {
	var jsonArrayOffer = JSON.parse(img.parentNode.parentNode.getAttribute("data-value"));
	var hotel = img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	var hotelData = hotel.querySelector("div[data-role='hotel']");
	var jsonArrayHotel = JSON.parse(hotelData.getAttribute("data-value"));
	var option = {
			checkinDt :getDate(jsonArrayOffer.startDate),
			nights : jsonArrayOffer.duration.toString(),
			hotelName : jsonArrayHotel.nameWithStars,
            hotel_desc: getNodeProperty(hotelData.parentNode.nextElementSibling, "", "innerText"),
			href : jsonArrayHotel.link ? 'https://' + jsonArrayHotel.link.replace(/^\/+/, "") : getNodeData('[href*="//www.onlinetours.ru/oteli"]', hotel, 'href'),
			roomType: jsonArrayOffer.roomType,
			region : jsonArrayHotel.regionName,
			boardType : jsonArrayOffer.mealType,
			price : getPriceAndCurrency(jsonArrayOffer)[0],
			currency : getPriceAndCurrency(jsonArrayOffer)[1],
			country:  SEARCH_CRITERIA.country,
			city_from: SEARCH_CRITERIA.city,
			operator: OPERATOR_NAME + " / " + jsonArrayOffer.operator,
			thumbnail: jsonArrayHotel.mainPhoto.photo,
			occupancy : SEARCH_CRITERIA.occupancy,
		    flight: getFlightSync(img)
	};
	return option;
}

function getDate(startDate) {
	var date = new Date(startDate);
	return dayMonthYearToString(date.getDate(),1+date.getMonth(),date.getFullYear());
}

function getPriceAndCurrency(jsonArrayOffer) {
	 var v = ( isPrefferedDefaultCurrency() || jsonArrayOffer.originalPrice.currency === null ) ? jsonArrayOffer : jsonArrayOffer.originalPrice;
	 return  [Math.floor(v.price), mapCurrency(v.currency)];
}

function mapCurrency(text) {
	switch (text.toUpperCase()) {
	case "EUR": return "EUR";
	case "RUR": return "RUB";
	case "USD": return "USD";
	default: return text;
	}
}

function getOccupancy(scrt) {
	var occupancy = {
			adultsCount: scrt.adults,
			childrenCount: scrt.kids,
			childAges: scrt.kidsAges
	};
	if ( occupancy.childAges.length === 0 ) {
		occupancy.childAges = null;
	}
	return occupancy;
}

function injectCurrencySelection() {
    if( document.querySelector("#qq-currency") ) {
        return;
    }
    var submit = document.querySelector("[data-role='submit-button']");
    if ( !submit ) {
        return;
    }
    addCurrencySelection(submit);
    addAddonMessageListener("tourbo.travel currency", function(currency) {
        document.querySelector("#qq-currency select").value = currency ? currency : DEFAULT_CURRENCY;
        document.querySelector("#qq-currency").setAttribute("style", "display: block;height: 22px;");
    });
    sendMessageToAddon("get operator currency", OPERATOR_CURRENCY);
}

function addCurrencySelection(submit) {
    var div = document.createElement("div");
    div.id = "qq-currency";
    div.setAttribute("style", "display: none;");
    div.className = "container";


    var legend = document.createElement("legend");
    legend.setAttribute("style", "width:auto;float:left;margin-right:6px;margin-left: 6px;font-size: 14px;font-family: PF DinText Pro;margin-top: 2px;");
    legend.innerHTML = "Выберите предпочитаемую валюту для <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo:";
    div.appendChild(legend);

    var select = document.createElement("select");
    select.setAttribute("style", "margin-top:-3px;");
    select.onchange = function () {
        sendMessageToAddon("set operator currency", {operator: OPERATOR_CURRENCY, currency: select.value});
    };

    var defaultCurr = document.createElement("option");
    defaultCurr.value = DEFAULT_CURRENCY;
    defaultCurr.textContent = DEFAULT_CURRENCY;
    select.appendChild(defaultCurr);

    var foreign = document.createElement("option");
    foreign.value = "USDEUR";
    foreign.textContent = "USD / EUR";
    select.appendChild(foreign);

    div.appendChild(select);

    submit.parentElement.parentElement.parentElement.appendChild(div, submit);
}

async function getFlight(img) {
	try {
		if (!canGetFlightInfo(img)) {
			return null;
		}
		const card = img.parentNode.parentNode;
		let flightHeader = loadFlightData(img);
		if (!flightHeader) {
			const flightBtn = card.querySelector('a [fill="#ff9d00"]');
			if (flightBtn) {
				flightBtn.parentNode.click();
			}
		}
		await waitingFor(() => loadFlightData(img), 150, 30);
	} catch (e) {
		console.log(e);
	}
}

function parseSector(sector) {
	const [head, ...segments] = querySelectorAll(sector,'p');
	const info = getNodeProperty(head.querySelector('span'), '').split(/,\s*/);
	const date = getNodeProperty(head, '').match(/^(\d{1,2})\s+([А-я]+)/);
	const parsedSegments = segments.map( segment => {
		const segmentText = getText(segment);
		const flightNumber = (segmentText.match(/[A-Z0-9]{2}\s*\d{3,4}/) || [''])[0].trim();
		const [departureTime, arrivalTime] = segmentText.match(/\d{2}:\d{2}/g);
		const [departureCity, departureAirport, arrivalCity, arrivalAirport] = segmentText.split('→')
			     .flatMap( side =>  side.replace(/\d{2}:\d{2}|[A-Z0-9]{2}\s*\d{3,4}/g, '').trim()
				                                  .split(/,\s*/));
              return new FlightSegment({
                  flightNumber,
                  airline: info[1],
                  departureDate: dateFromDayAndMonthName(date[1], date[2]),
                  departureTime,
                  departureCity,
                  departureAirport,
                  serviceClass: info[0],
                  arrivalTime,
                  arrivalCity,
                  arrivalAirport
              })
	});
	return {segments: parsedSegments}
}

function getFlightSync(img) {
	try {
		if (!canGetFlightInfo(img)) {
			return null;
		}
		let flightHeader = loadFlightData(img);
		const sectors = querySelectorAll(flightHeader.nextElementSibling, 'p')
			.map(p => p.parentNode)
			.filter((p, index, arr) => index === 0 ? true : p !== arr[index - 1])
			.map(parseSector);
		return {sectors}
	} catch(e) {
		return null;
	}
}

function loadFlightData(img) {
	const card = img.parentNode.parentNode;
	const flightDiv = querySelectorAll(card, 'div[class]')
		              .find( elem => elem.textContent.trim() === 'Возможные рейсы и доплаты за них' );
    return flightDiv || null;
}

function isPrefferedDefaultCurrency() {
    var sel = document.querySelector("#qq-currency select");
    return !sel || sel.value != "USDEUR";
}
