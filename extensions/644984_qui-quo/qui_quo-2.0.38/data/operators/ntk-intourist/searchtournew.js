var OPERATOR_NAME = "Ntk Intourist";
var OPERATOR_SLETAT_ID = 9;
var DEFAULT_CURRENCY = "RUB";
var OPERATOR_CURRENCY = "tkintourist";
var OPERATOR_BOOKABLE_VIA_SLETAT = true;

// -------- Search Criteria ---------------------------

function initializeSearchCriteria() {
	return null;
}

function getSearchButton() {
	return null;
}

//--------- Rows ---------------------------------

function createColumnHeader() {
    var th = document.createElement("th");
    th.className = "qq";
    th.scope = "col";
    th.appendChild(document.createTextNode("QQ"));    
    return th;
}

function createCell(isStop) {
    var td = document.createElement("td");
    td.className = "qq";
    if (!isStop) {
        var nobr = document.createElement("nobr");
        nobr.appendChild(createAddButton());    
        nobr.appendChild(createEditButton()); 
    	td.appendChild(nobr);
    }
    return td;
}

function processRows(tbl, selector) {
	var trs = tbl.querySelectorAll(selector);
    for (var i = 0; i < trs.length; ++i) {  
        if ( trs[i].querySelector("td.qq") == null  ) {
        	var isStop = trs[i].getElementsByClassName("isStop").length > 0;
        	trs[i].appendChild(createCell(isStop));
        }	
    }
}

function injectData() {
	injectCurrencySelection();
	var tbl = document.querySelector("table#gvResult");
	if ( tbl == null ) {
		return;
	}
	
	var thead = tbl.querySelector("tr.gvhr");
	if ( thead != null && thead.querySelector("th.qq") == null ) {
		thead.appendChild(createColumnHeader());
	}
	
	processRows(tbl, "tr.gvgr");
	processRows(tbl, "tr.gvar");
}

//--------- Option ---------------------------------

function getCountry() {
	var lbl = document.querySelector("#DestinationLabel");
	if ( lbl ) {
		var m = lbl.textContent.match(/(.+)\s+\(.+\)/);
		return m ? m[1] : lbl.textContent; 
	}
	
	var s = document.querySelector("select#mDdlDestination");
    if ( s == null ) {
        console.log("country selector is not found");
        return null;
    }
    
    if ( s.value == null ) {
    	console.log("country is not selected");
        return null;
    }
    
    return s.options[s.options.selectedIndex].text;
}

function getCity(tr) {
	if ( tr.querySelector(".no_fly") ) {
		return "";
	}
	return selectedOption(document.querySelector("#mDdlStartPoint"));
}

function trim(s) {
    if ( s == null ) {       
        return s;
    }
    return s.split("&" + "nbsp;").join(" ").split(/\s+/).join(" ").trim();
}

function extractHotelUrl(td) {
    var anchor = td.querySelector("a");
    return anchor == null ? "" :  anchor.href;
}

function extractRoom(hotelName, type) {
	var m = hotelName.match(/[\*\+]+([^\[]+)\[?/);
	return m != null ? m[1] + " / " + type : type;
}

function extractPriceAndCurrency(td) {
	if (td.querySelectorAll("span").length > 1) {
	 var priceTdText = isPrefferedDefaultCurrency() ? td.querySelectorAll("span")[0].textContent : td.querySelectorAll("span")[1].textContent;
	 return { price : extractIntFromStr(priceTdText.replace(/\s+/g, "")), currency : mapCurrency(priceTdText.replace(/[\d,.-]/g, "")) }; 
		} else {
				return { price : "0" , currency : "" };	
			}
}

function splitNameRoomRegion(text) {
	var region = "";
	
	var m = text.match(/(.*)\[([^\]]+)\]/);
	if ( m != null ) {
		text = m[1];
		region = m[2];
	}
	
	var patterns = [/(.*\d\s*[Kk]eys?)(.*)/,
	                /(.*\d\s*[Кк]лючей)(.*)/,
	                /(.*\d\s*[Кк]люча)(.*)/,
	                /(.*\d\s*[\*\+]+)(.*)/];
	for ( var i = 0; i < patterns.length; i++) {
		m = text.match(patterns[i]);
		if ( m != null ) {
			return {"name": m[1], "room": m[2], "region": region};
		}
	}
	
	return {"name": text, "room": "", "region": region};	
}

function selectedOptionValue(element) {
    var s = selectedOption(element);
    if ( !s )
        return null;
    if ( !/\d/.test(s) )
        return element.options[element.selectedIndex].value;
    return s;
}

function getOccupancy() {
	var occupancy = {
			adultsCount: 0,
			childrenCount: 0,
			childAges: null	
		};
	
    var element = document.getElementById("adultcnt");
    var s = null;
    if ( !(s = selectedOptionValue(element)) )
    	return null;
    occupancy.adultsCount = extractIntFromStr(s);
    
    element = document.getElementById("ddlChildSelect");
    if ( !(s = selectedOptionValue(element)) )
        return null;
    occupancy.childrenCount = extractIntFromStr(s);
    
    if ( occupancy.childrenCount > 0 ) {
    	var ages = [];
    	var selects = document.querySelectorAll(".child-age");
    	for ( var i=0; i<occupancy.childrenCount; ++i ) {
    		var age = extractIntFromStr(selectedOption(selects[i]));
    		ages.push(age > 0 ? age : 2);
    	}
    	occupancy.childAges = ages.join(",");
    }
        
    return occupancy;     
}

function extractTourUrl(td) {
	var a = td.querySelector("a");
	return a ? a.href : null;
}

function createOption(img) {
	var tr = img.parentNode.parentNode.parentNode;
	var tds = getChildElementsByTagName(tr, "td");
	var nrr = splitNameRoomRegion(trim(tds[3].textContent)); //5
	var priceAndCurrency = extractPriceAndCurrency(tds[6]);//8
	var acc = trim(tds[5].textContent); //7
    var option = {
        hotelName : nrr.name,
        href : extractHotelUrl(tds[3]), //5
        region : nrr.region,
        roomType: nrr.room.length == 0 ? acc : nrr.room + " / " +  acc,
        checkinDt : trim(tds[0].textContent), //9
        nights : trim(tds[1].textContent),//10
        boardType : trim(tds[4].textContent),//6
        price : priceAndCurrency.price,
        currency : priceAndCurrency.currency,
        country: getCountry(),
        city_from: getCity(tr),
        occupancy: getOccupancy(),
        tour_url: extractTourUrl(tds[6])
    };

    return option;
}

   
function getTable() {
	var tbls = document.querySelectorAll("html>body>table>tbody>tr>td>table>tbody>tr>td>table>tbody");
	if ( tbls.length > 0 ) {
		return tbls[tbls.length-1];
	}
	return null;
}

function injectCurrencySelection() {
    if( document.querySelector("#qq-currency") ) {
        return;
    }
    var submit = document.querySelector("div#mPnResult");
    if ( !submit ) {
        return;
    }
    addCurrencySelection(submit);
    addAddonMessageListener(OPERATOR_CURRENCY + " currency", function(currency) {
        document.querySelector("#qq-currency select").value = currency ? currency : DEFAULT_CURRENCY;
        document.querySelector("#qq-currency").setAttribute("style", "margin-top:10px;");
    });
    sendMessageToAddon("get operator currency", OPERATOR_CURRENCY);
}

function mapCurrency(s) {
    var c = trim(s).toUpperCase();
    switch (c) {
    	case "РУБ": return "RUB";
    	case "РБ": return "RUB";
        case "$": return "USD";
        case "€": return "EUR";
    }

    return c;
}

function isPrefferedDefaultCurrency() {
    var sel = document.querySelector("#qq-currency select");
    return !sel || sel.value != "USDEUR";
}

function addCurrencySelection(submit) {
    var div = document.createElement("div");
    div.id = "qq-currency";
    div.className = "b-pfs3";
    div.setAttribute("style", "display: block;");
    
    var legend = document.createElement("legend");
    legend.setAttribute("style", "width:auto;float:left;margin-right:6px;");
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
    
    submit.parentElement.insertBefore(div, submit);
}



