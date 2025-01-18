// Движок TourManagerPro от компании TravelSoft http://travelsoft.ru/tourmanagerpro/about

var OPERATOR_CURRENCY = "tourmanager";
var DEFAULT_CURRENCY = "RUB";

function getCountry() {
	var c = document.querySelector("[name=countryId] span.ng-scope");
	return c ? c.textContent : "";
}

function getCity() {
	var c = document.querySelector("[name=departureCityId] span.ng-scope");
	return c ? c.textContent : "";
}

function initializeSearchCriteria() {
    var country = getCountry();
    if ( !country )
        return null;
        
    var city = getCity();
    if ( !city )
        return null;

    return { "country" : country,
    		 "city" : city };
}

function getSearchButton() {
	return document.querySelector("#filterSubmitButton");
}

function injectData() {
	injectCurrencySelection();
	
	if ( !SEARCH_CRITERIA )
		return;
	
	var head = document.querySelector("#ls-tm_Offers>thead>tr");
	if ( head && head.querySelector("th.qq") == null ) {
		var th = document.createElement("th");
		th.className = "qq";
		th.appendChild(document.createTextNode("QQ"));
		head.appendChild(th);
	}
	
	var trs = document.querySelectorAll("#ls-tm_Offers>tbody>tr.t-offer");
	for ( var i = 0; i < trs.length; i++) {
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

function extractDate(td) {
	return td.textContent.match(/(\d+\.\d+\.\d+)/)[1];
}

function extractNights(td) {
	var extra = td.querySelector("span[title='Дни в дороге']");
	if ( extra ) {
		var ex_nights = extractIntFromStr(extra.textContent);
		var nights = extractIntFromStr(td.textContent.match(/(\d+)/)[1]) - ex_nights;
		return {nights : nights.toString(), extra_nights: ex_nights.toString()};
	}
	return {nights : td.textContent.match(/(\d+)/)[1], extra_nights: "0"};
}

function extractRegion(td) {
	var div = td.querySelector(".hotelAdditional");
	return div ? div.textContent : "";
}

function extractHotelName(td, fad = "") {
	var div = td.querySelector(".hotelLink");
    var nights = "";
    if ( fad !== "" ) {
       nights =  td.querySelector(".additional");
       nights = nights ? " " + nights.textContent : "";
    }
	return div ? div.textContent + nights : td.textContent + nights;
}

function extractBoardType(td) {
	return td.textContent;
}

function extractRoomType(td) {
	var divs = td.querySelectorAll("div");
	if ( divs.length > 0 ) {
		var room = "";
		for ( var i=0; i<divs.length; i++)
			room += divs[i].textContent + (i<divs.length-1 ? ", " : "");
		return room;
	} else {
		return td.textContent;
	}
}

function extractPriceAndCurrency(td) {
	return td.querySelector(isPrefferedDefaultCurrency() ? ".cross-total" : ".price-total");
}

function extractPrice(td) {
	var s = td.querySelector(".price-value").textContent;
	s = s.trim().split(/\s+/).join("");
    return parseInt(s.match(/(\d+)/)[1], 10);
}

function extractCurrency(td) {
	var c = td.querySelector(".price-currency");
	c = c ? c.textContent : td.textContent.split(/[\d\.\s]+/).join("");
    switch (c.trim().toUpperCase()) {
		case "EU": return "EUR";
		case "€": return "EUR";
	    case "$": return "USD";
	    case "РУБ": return "RUB";
	}
    return c;
}

function extractHotelUrl(td) {
	var a = td.querySelector("a");
	return a ? a.href : null;
}

function extractCity(td) {
	return td.className.indexOf("without-sa") >= 0 ? "" : SEARCH_CRITERIA.city;
}

function createOption(img) {
    var tr = img.parentNode.parentNode.parentNode;
    var tds = getChildElementsByTagName(tr, "td");
    var fad = "";
    var additionalTds =  getAddTrs(tr);
    var excursion = additionalTds[1];
    additionalTds = additionalTds[0].reduce( (prev, td) => {
        fad = " / ";
        prev.hotelName.push(extractHotelName(td.hotelName, true));
        prev.room.push(extractRoomType(td.room));
        prev.meal.push(extractBoardType(td.meal));
        prev.region.push(extractRegion(td.hotelName));
        return prev;

    },{ hotelName: [],  room: [], meal: [], region: []});

    var shift = tds[0].className.indexOf("tdDates") >= 0 ? -1 : 0;
    var shift2 = document.querySelector("#ls-tm_Offers").querySelector('thead th[title="Доступность услуги"]') ? 0 : -1;
    
    var option = {
        checkinDt : extractDate(tds[1+shift]),
        nights : extractNights(tds[2+shift]).nights,
        extra_nights:extractNights(tds[2+shift]).extra_nights,
        region : extractRegion(tds[3+shift])  + fad + additionalTds.region.join(" / "),
        hotelName : extractHotelName(tds[3+shift], fad)+ fad + additionalTds.hotelName.join(" / "),
        boardType : extractBoardType(tds[5+shift]) + fad+ additionalTds.meal.join(" / "),
        roomType : extractRoomType(tds[4+shift])+ fad + additionalTds.room.join(" / "),
        price : extractPrice(tr),
        currency : extractCurrency(tr),
        href : extractHotelUrl(tds[3+shift]),
        country: SEARCH_CRITERIA.country,
        city_from: extractCity(tds[7+shift+shift2]),
    };
    if ( excursion.length > 0 ) {
        option.region = excursion.map( ex => ex.nextElementSibling.textContent.trim()).join(" / ");
        option.excursion = true;
        option.hotelName = excursion.map( ex => ex.textContent.trim()).join(" / ") + "("+option.hotelName+")";
        option.href = getNodeProperty(excursion[0].querySelector("a"), null, "href");
    }
    return option;
}

function injectCurrencySelection() {
    if( document.querySelector("#qq-currency") ) {
        return;
    }
    
	var stour = document.querySelector(".stour-tbl>tbody");
    if( !stour ) {
        return;
    }
    
    addCurrencySelection(stour);
    addAddonMessageListener(OPERATOR_CURRENCY + " currency", function(currency) {
        document.querySelector("#qq-currency select").value = currency ? currency : DEFAULT_CURRENCY;
        document.querySelector("#qq-currency").setAttribute("style", "padding-top:10px;padding-bottom:10px");
    });
    sendMessageToAddon("get operator currency", OPERATOR_CURRENCY);
}

function isPrefferedDefaultCurrency() {
    var sel = document.querySelector("#qq-currency select");
    return !sel || sel.value != "USDEUR";
}

function addCurrencySelection(stour) {
    var td = document.createElement("td");
    td.id = "qq-currency";
    
    var legend = document.createElement("legend");
    legend.setAttribute("style", "width:auto;float:left;margin-right:6px;");
    legend.innerHTML = "Выберите предпочитаемую валюту для <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo:";
    td.appendChild(legend);
    
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

    td.appendChild(select);

    var tr = document.createElement("tr");
    tr.appendChild(td);
    stour.appendChild(tr);
}

function getAddTrs(tr) {
    var nextTr = tr.nextElementSibling;
    var array = [];
    var excursion = [];
    while (nextTr) {
        if ( nextTr.querySelectorAll("td").length < 6 && !nextTr.id ) {
            var tds = {
                hotelName: nextTr.querySelector(".t-allocation"),
                room: nextTr.querySelector(".room"),
                meal: nextTr.querySelector(".meal")
            };
            var ex = nextTr.querySelector(".t-excursion");
            if ( tds.hotelName && tds.room && tds.meal ) {
                array.push(tds)
            }
            if ( ex ) {
                excursion.push(ex);
            }
        } else {
            break;
        }
        nextTr = nextTr.nextElementSibling;
    }
    return [array, excursion];
}
