var OPERATOR_NAME = "New Travelers";
var DEFAULT_CURRENCY = "RUB";
var OPERATOR_SLETAT_ID = 269;

function initializeSearchCriteria() {
    var country = getCountry();
    if ( !country )
        return null;
    
    var city = getCity();
    if ( !city ) {
    	return null;
    }
    
    return { "country" : country,
        "city": city,
        "occupancy": getOccupancy()};
}

function getSearchButton() {
	return document.querySelector('#tBBuscar button');
}

function getCountry() {
	var c = document.querySelector('#tPaisesCIR div');
	return c ? c.textContent.trim() : null;
}

function getCity() {
	var c = document.querySelector('#tCiudadSalida div');
	if ( !c ) {
		return null;
	}
	var city = c.textContent.trim();
	var m = city.match("[^\(]+");
	return m ? m[0].trim() : city;
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function extractOptionalIntFromDiv(e) {
	var div = e.querySelector("div");
	return div ? extractOptionalInt(div.textContent) : null;
}

function getOccupancy() {
	var tds = document.querySelectorAll('#tLineasReserva .growa:last-child .gtd');
	if ( tds.length < 5 ) {
		return null;
	}
	
    var occupancy = {
            adultsCount: extractOptionalIntFromDiv(tds[1]),
            childrenCount: extractOptionalIntFromDiv(tds[2]),
            childAges: null 
        };
    
   	if ( occupancy.adultsCount === null || occupancy.childrenCount === null ) {
   		return null;
   	}
   	
   	var ages = [];
   	for (var i = 0; i < occupancy.childrenCount; i++) {
		var age = extractOptionalIntFromDiv(tds[3+i]);
		if ( age === null ) {
			return null;
		}
   		ages.push(age);
	}
   	occupancy.childAges = ages.join(",");

    return occupancy;     
}

function injectData() {
	if ( !SEARCH_CRITERIA ) {
		return;
	}
	
	Array.fromList(document.querySelectorAll("#tResults .priceHTL")).forEach(function(price) {
		if ( price.querySelector(".qq") ) {
			checkAndRestoreEvents(price, createOption);
		} else {
			var nobr = document.createElement("nobr");
			nobr.className = "qq";
			nobr.style = "padding-left:8px";
			nobr.appendChild(createAddButton(createOption));			
			nobr.appendChild(createEditButton(createOption));
			price.appendChild(nobr);
		}
	});
	
	injectCurrencySelection();
}

function createOption(img) {
	var row = getHotelRowByImage(img);
	var cols = row.querySelectorAll(".gtd");
	var hotel = cols[4].querySelectorAll(".fieldc tr");
	var price = img.parentNode.parentNode;
	var roomIdx = getRoomIdx(row, price);
	
    var option = {
   		thumbnail: extractThumbnail(cols[3]),
   		hotelName : extractHotelName(hotel),
		href : "",
		checkinDt : extractCheckin(hotel),
		nights : extractNights(hotel),
        region : extractRegion(hotel),
        roomType : cols[6].querySelectorAll("tr")[roomIdx].textContent,
        boardType : cols[7].querySelectorAll("tr")[roomIdx].textContent,
        price : extractPrice(price),
        currency : extractCurrency(price),
		city_from: SEARCH_CRITERIA.city,
		country: SEARCH_CRITERIA.country,
		occupancy : SEARCH_CRITERIA.occupancy
    }
    return option;
}

function getHotelRowByImage(img) {
	while ( img ) {
		if ( img.className == "growa" || img.className == "growb" ) {
			return img;
		}
		img = img.parentNode;
	}
}

function extractThumbnail(col) {
	var img = col.querySelector("img[src]");
	return img && img.src ? img.src : null;
}

function extractHotelName(hotel) {
	var name = hotel[0].querySelector(".contentHTL").textContent.trim();
	
	var stars = Array.fromList(hotel[1].querySelectorAll("img[src]"))
		.filter(function(img) { return img.src.indexOf("star-enabled") > 0; })
		.length;
	
	return name + (stars > 0 ? " " + stars + "*" : "");
}

function extractCheckin(hotel) {
	var m = hotel[2].textContent.match(/(\d+)\/(\d+)\/(\d+)/);
	return m[1] + "." + m[2] + "." + m[3];
}

function extractNights(hotel) {
	return extractIntFromStr(hotel[3].textContent).toString();
}

function extractRegion(hotel) {
	var text = hotel[4].textContent;
	var m = text.match(/([^,]+),\s*\d+\s+ноч/);
	return m ? m[1].trim() : text;
}

function getPriceElement(price) {
	var e = price.nextElementSibling;
	return e && e.tagName == "LABEL" && !isPrefferedDefaultCurrency() ? e : price;
}

function extractPrice(price) {
    price = getPriceElement(price);
    var s = price.textContent.split(/[\.,]/);
    if (s[s.length - 1].match(/\d+/)[0].length <= 2) {
        s.splice(s.length - 1, 1);
    }
    return parseInt(s.join("").match(/(\d+)/)[1], 10);
}

function extractCurrency(price) {
	price = getPriceElement(price);
	return price.textContent.match(/[\d\.,]+\s+([\wА-Яа-я]*)/)[1];
}

function getRoomIdx(row, price) {
	return Array.fromList(row
			.querySelectorAll(".priceHTL"))
			.map(function(it, idx) { return it == price ? idx : -1})
			.filter(function(it) { return it >= 0 })
			[0];
}

function injectCurrencySelection() {
	if( document.querySelector("#qq-currency") ) {
		return;
	}
	var info = document.querySelector("#tResults");
	if ( !info ) {
		return;
	}
	addCurrencySelection(info);
	addAddonMessageListener(OPERATOR_NAME + " currency", function(currency) {
		document.querySelector("#qq-currency select").value = currency ? currency : DEFAULT_CURRENCY;
		document.querySelector("#qq-currency").setAttribute("style", "padding-bottom:10px;");
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
	
	info.insertBefore(div, info.firstChild);
}

function isPrefferedDefaultCurrency() {
	var sel = document.querySelector("#qq-currency select");
	return sel && sel.value != DEFAULT_CURRENCY;
}

