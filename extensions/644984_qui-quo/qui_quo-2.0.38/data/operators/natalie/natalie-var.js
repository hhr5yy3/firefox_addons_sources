var OPERATOR_NAME = "New Travelers";
var DEFAULT_CURRENCY = "RUB";

function initializeSearchCriteria() {
	return null;
}

function getSearchButton() {
	return null;
}

function injectData() {
	injectCurrencySelection();
	
	var fixedTotal = document.querySelector("#tablePrecioTotalFixed");
	if ( fixedTotal && !fixedTotal.querySelector(".qq") ) {
		var div = document.createElement("div");
		div.appendChild(createAddButton());
		div.appendChild(createEditButton());
		div.className = "qq";
		div.setAttribute("style", "padding-bottom:8px;");
		
		insertAfter(div, document.querySelector("#tPrecioTotalFixed"));
	}
}

function insertAfter(elem, refElem) {
	var parent = refElem.parentNode;
	var next = refElem.nextSibling;
	if (next) {
		return parent.insertBefore(elem, next);
	} else {
		return parent.appendChild(elem);
	}
}

function createHotelName(hotels) {
	if ( hotels.length == 1 ) {
		return hotels[0].hotelName;
	}
	
	return hotels.map(function(h) {
		return h.hotelName + " " + h.nights  + "н";
	}).join(" / ");
}

function getCityFrom() {
	var direction = document.querySelector("#segment .fieldc");
	if ( !direction ) {
		return "";
	}
	var m = direction.textContent.match(/(?:.+?,)?([^\[]+)/);
	return m ? m[1].trim() : null;  
}

function extractPrice() {
	var prices = document.querySelectorAll("#tPrecioTotalFixed > div");
	var price = prices.length > 1 && !isPrefferedDefaultCurrency() ? prices[1] : prices[0]; 
	return price.textContent.replace(/[\s\.]+/g, ""); 	
}

function createOption(img) {
	var trs = document.querySelectorAll("#tTableHoteles>table>tr.growa");
	var hotels = [];
	if ( trs.length > 0 )
		hotels = parseHotels(trs);
	trs = document.querySelectorAll("#tTableCircuits>table>tr.growa");
	var excursions = [];	
	if ( trs.length > 0 )
		excursions = parseExcursions(trs);
    var items = hotels.concat(excursions);
    items.sort(function(a, b) {return parseDate(a.checkinDt) < parseDate(b.checkinDt) ? -1 : 1});
	
    var price = extractPrice();
    
    var option = {
        checkinDt : items[0].checkinDt,
        nights : items.map(function(h) { return h.nights})
        			.reduce(function(a,b) { return a+b; }, 0).toString(),
        hotelName : createHotelName(items),
        href : "",
        roomType: items.map(function(h) { return h.roomType}).join(" / "),
        region : items.map(function(h) { return h.region}).join(" / "),
        boardType : items.map(function(h) { return h.boardType}).join(" / "),
        price : extractIntFromStr(price),
        currency : price.replace(/[\d,]+/g, ""),
        country: '',
        city_from: getCityFrom(),
        excursion: items[0].excursion,
        thumbnail : items[0].thumbnail
    };
    return option
}

function extractDates(tr) {    
	return tr.querySelectorAll("td.gtd")[1]
		.textContent
		.replace(/\//g, ".")
		.match(/(\d+\.\d+\.\d+)\s+(\d+\.\d+\.\d+)/);
}

function parseDate(s) {
	var m = s.match(/(\d+)\.(\d+)\.(\d+)/);
	return new Date(extractIntFromStr(m[3]), extractIntFromStr(m[2]) - 1, extractIntFromStr(m[1]));
}

function calcNights(start, end) {
	return getDistance(parseDate(start), parseDate(end));
}

function findById(node, sel, id) {
	return Array.fromList(node.querySelectorAll(sel))
		.filter(function(td) { 
			return td.id && td.id.startsWith(id); 
		})[0];
}

function extractMultiRoomValue(item) {
	return Array.fromList(item.querySelectorAll("tr")).map(function(row) { 
		return row.textContent
	}).join(", ");
}

function parseHotels(trs) {
	return Array.fromList(trs).map(function(tr) {
		var dates = extractDates(tr);
		var hotel = getChildElementsByTagName(findById(tr, "td.fieldc", "tronehotel"), "div");
		return {			
	        checkinDt : dates[1],
	        nights : calcNights(dates[1], dates[2]),
	        hotelName : hotel[0].textContent + " " + hotel[1].textContent + "*",
	        region: hotel[2].textContent,
	        roomType: extractMultiRoomValue(findById(tr, "td", "tdFRoom")),
	        boardType : extractMultiRoomValue(findById(tr, "td", "tdFBoard")),
	        excursion: false,
	        thumbnail : extractThumbnail(tr)
		};
	});
}

function parseExcursions(trs) {
	return Array.fromList(trs).map(function(tr) {
		var dates = extractDates(tr);
		var hotel = findById(tr, "td.fieldc", "tdName");
		return {			
	        checkinDt : dates[1],
	        nights : calcNights(dates[1], dates[2]),
	        hotelName : hotel.querySelector("div.fieldcc").textContent,
	        region: hotel.querySelector("div.fieldc").textContent, // findById(tr, "td", "tdZone").textContent,
	        roomType: "-",
	        boardType : "-",
	        excursion: true,
	        thumbnail : extractExcursionImage(tr)
		};
	});
}

function extractExcursionImage(tr) {
	var img = tr.querySelector('td[id^="tdImg"] > img');
	return img && img.src ? img.src : null;
}

function extractThumbnail(tr) {
	var tds = Array.fromList(tr.querySelectorAll("td"))
		.filter(function(td) { 
			return td.id && td.id.startsWith("tronehotel_colimg_"); 
		});
	
	if ( tds.length > 0 ) {
		var img = tds[0].querySelector("img");
		return img && img.src ? img.src : null;
	}

	return null;
}

function injectCurrencySelection() {
	if( document.querySelector("#qq-currency") ) {
		return;
	}
	var info = document.querySelector("#basicInfo");
	if ( !info ) {
		return;
	}
	addCurrencySelection(info);
	addAddonMessageListener(OPERATOR_NAME + " currency", function(currency) {
		document.querySelector("#qq-currency select").value = currency ? currency : DEFAULT_CURRENCY;
		document.querySelector("#qq-currency").setAttribute("style", "");
	});
    sendMessageToAddon("get operator currency", OPERATOR_NAME);
}

function addCurrencySelection(info) {
	var div = document.createElement("div");
	div.id = "qq-currency";
	div.setAttribute("style", "display: none;");
	
	var span = document.createElement("span");
	span.innerHTML = "Выберите предпочитаемую валюту для <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo: ";
	div.appendChild(span);
	
	var select = document.createElement("select");
	select.setAttribute("style", "margin-top:-3px;");
	select.onchange = function () {
        sendMessageToAddon("set operator currency", {operator: OPERATOR_NAME, currency: select.value});
	};
	
	var defaultCurr = document.createElement("option");
	defaultCurr.value = DEFAULT_CURRENCY;
	defaultCurr.textContent = "Нац. валюта";
	select.appendChild(defaultCurr);
	
	var foreign = document.createElement("option");
	foreign.value = "USDEUR";
	foreign.textContent = "USD / EUR";
	select.appendChild(foreign);
	
	div.appendChild(select);
	
	var td = document.createElement("td");
	td.style = "padding-bottom:10px;";
	
	var tr = document.createElement("tr");
	tr.appendChild(td).appendChild(div);
	
	var basicInfoTr = info.parentNode.parentNode;
	basicInfoTr.parentNode.insertBefore(tr, basicInfoTr.nextElementSibling);
}

function isPrefferedDefaultCurrency() {
	var sel = document.querySelector("#qq-currency select");
	return sel && sel.value != DEFAULT_CURRENCY;
}