var OPERATOR_NAME = "New Travelers";
var DEFAULT_CURRENCY = "RUB";

function getDoc() {
	var doc = document.querySelector("#HTL_SEARCHER");	
	return doc ? doc.contentDocument : document;
}

function getSearchDate(sel) {	
	var input = getDoc().querySelector(sel);
	if ( !input ) {	
		return null;
	}
	var s = input.value;
	return s && s.match(/(\d+)\/(\d+)\/(\d+)/) ? s.replace(/\//g, ".") : null;
}


function getNights(checkin) {
	var checkout = getSearchDate("#tSalida input");
	if ( !checkout ) {
		return;
	}
	
	function toDate(s) {
		var m = s.match(/(\d+)\.(\d+)\.(\d+)/);
		return new Date(extractIntFromStr(m[3]), extractIntFromStr(m[2]) - 1, extractIntFromStr(m[1]));
	}
	return getDistance(toDate(checkin), toDate(checkout)).toString();
} 

function getRoomNo() {
	var lines = getDoc().querySelectorAll("#tLineasReserva .growa, #tLineasReserva .growb").length;
	return lines > 2 ? lines - 1 : 1;	
}

function initializeSearchCriteria() {
	
	var checkin = getSearchDate("#tEntrada input");
	if ( !checkin ) {
		return null;
	}
	
	var nights = getNights(checkin);
	if ( !nights ) {
		return null;
	}
	
	return {
		 checkinDt : checkin,
	     nights : nights,
	     roomNo : getRoomNo()
	};
}

function getSearchButton() {
	return getDoc().querySelector("#tBBuscar");
}

function injectData() {
	if ( !SEARCH_CRITERIA ) {
		return;
	}
	
	injectCurrencySelection();
	
	Array.fromList(getDoc().querySelectorAll("#tResults .growa, #tResults .growb")).forEach(function(line) {
		var cols = getChildElementsByTagName(line, "td");
		if ( cols.length < 19 ) {
			return;
		} 
		Array.fromList(cols[cols.length-1].querySelectorAll("td")).forEach(function(td, idx) {
			if ( td.querySelector(".qq") ) {
				return;
			}
			
		    var nobr = getDoc().createElement("nobr");
		    nobr.className = "qq";
		    nobr.setAttribute("idx", idx);
		    nobr.appendChild(createAddButton());
		    nobr.appendChild(createEditButton());
		    
		    td.appendChild(nobr);
		});
	});
}

function extractCurrency(priceAndCurrency) {
	var c = priceAndCurrency.replace(/[\d,]+/g, "");
	return c.length > 3 ? c.substring(0,3) : c;
}

function extractPriceAndCurrency(tr) {
	var span = isPrefferedDefaultCurrency() ? tr.querySelector("tr > td > span") : tr.querySelector("tr > td > b");
	return span ?  span.textContent.replace(/[\s\.]+/g, "") : tr.querySelector("tr > td > b").textContent.replace(/[\s\.]+/g, "");
}

function createOption(img) {
	var idx = img.parentNode.getAttribute("idx");
	var line = getHotelRowByImage(img);
	var cols = getChildElementsByTagName(line, "td");

	var priceAndCurrency = extractPriceAndCurrency(cols[cols.length-1].querySelectorAll("tr")[idx]);
    var option = {
        hotelName : extractHotelName(cols[9]),
        region : extractRegion(cols[9]),
        price : extractIntFromStr(priceAndCurrency),
        currency : extractCurrency(priceAndCurrency),

        roomType: getMultiRoomValue(cols[13], idx, SEARCH_CRITERIA.roomNo),
        boardType : getMultiRoomValue(cols[14], idx, SEARCH_CRITERIA.roomNo),

        checkinDt : SEARCH_CRITERIA.checkinDt,
        nights : SEARCH_CRITERIA.nights,
        href : "",
        country: "",
        city_from: "",
        thumbnail : extractThumbnail(cols[8])
    };

    return option
}

function extractThumbnail(td) {
	var img = td.querySelector("img");
	return img && img.src ? img.src : null;
}


function getHotelRowByImage(img) {
	var parent = img.parentNode;
	while ( parent.className != "gtd" ) {
		parent = parent.parentNode;
	}
	return parent.parentNode;
}

function extractHotelName(col) {
	var stars = col.querySelectorAll(".fieldc img[src*='enabled']").length;
	return col.querySelector(".fieldcc").textContent + 
	      (stars > 0 ? " " + stars + "*" : ""); 
}

function extractRegion(col) {
	var br = col.querySelector(".fieldc br:nth-of-type(2)");
	return br && br.nextSibling ? br.nextSibling.textContent.trim() : "";
}

function getMultiRoomValue(col, idx, roomNo) {
	var trs = col.querySelectorAll("tr");
	var arr = [];
	for (var i = 0; i < roomNo; i++) {
		arr.push(trs[idx*roomNo + i].textContent);
	}
	return arr.join(" / ");
}

function injectCurrencySelection() {
	if( getDoc().querySelector("#qq-currency") ) {
		return;
	}
	var info = getDoc().querySelector("#tablaFilter .content2");
	if ( !info ) {
		return;
	}
	addCurrencySelection(info);
	addAddonMessageListener(OPERATOR_NAME + " currency", function(currency) {
		getDoc().querySelector("#qq-currency select").value = currency ? currency : DEFAULT_CURRENCY;
		getDoc().querySelector("#qq-currency").setAttribute("style", "padding-top:20px");
	});
    sendMessageToAddon("get operator currency", OPERATOR_NAME);
}

function addCurrencySelection(info) {
	var div = document.createElement("div");
	div.id = "qq-currency";
	div.setAttribute("style", "display: none;");
	
	var legend = document.createElement("legend");
	legend.setAttribute("style", "width:auto;float:left;margin-right:6px;");
	legend.innerHTML = "Выберите предпочитаемую валюту для <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo:";
	div.appendChild(legend);
	
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
	
	info.parentNode.appendChild(div);
}

function isPrefferedDefaultCurrency() {
	var sel = getDoc().querySelector("#qq-currency select");
	return !(sel && sel.value != DEFAULT_CURRENCY);
}
