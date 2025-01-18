var OPERATOR_NAME = "PAC GROUP";
var OPERATOR_SLETAT_ID = 14;

// -------- Search Criteria ---------------------------

function getOccupancy() {
	var occupancy = {
			adultsCount: 0,
			childrenCount: 0,
			childAges: null	
		};
	
    var s = document.querySelector("input[id$='_txtAdults']");
    if ( !s || !s.value.match(/(\d+)/) )
    	return null;
    occupancy.adultsCount = extractIntFromStr(s.value);
    
    s = document.querySelector("input[id$='_txtChilds']");
    if ( !s || !s.value.match(/(\d+)/) )
    	return null;
    occupancy.childrenCount = extractIntFromStr(s.value);
    
    if ( occupancy.childrenCount > 0 ) {
    	var ages = [];
    	
    	for ( var i=0; i<occupancy.childrenCount; ++i ) {
    		var input = i==0 ? document.querySelector("input[id$='_txtFirstChildAge']") 
    				  : i==1 ? document.querySelector("input[id$='_txtSecondChildAge']")
    						  : null;
        	ages.push(input && input.value.trim() ? extractIntFromStr(input.value) : 2);
    	}

    	occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function initializeSearchCriteria() {
	 return getOccupancy();
}

function getSearchButton() {
	return document.querySelector("[id$='_btnSearchEx']");
}

// --------- Rows ---------------------------------

function extractPrice(img) {
	var td = img.parentNode.parentNode.previousSibling;
	var price = td.textContent.trim();
	return parseInt(price.match(/(\d+)/)[1], 10);
}

function extractCurrency(tds) {
	var td = tds[tds.length-4];
    var c = trim(td.textContent).toUpperCase();
    switch (c) {
        case "E": return "EUR";
        case "РБ": return "RUB";
    }
    return c;
}

function extractDate(td) {
    var matcher = td.textContent.match(/(\d\d)\.(\d\d)/);
	return appendYear(parseInt(matcher[1], 10), parseInt(matcher[2], 10));
}

function extractHotelUrl(td) {
	var anchor = td.querySelector("a")
	if (anchor != null)
		return anchor.href
	return null
}

function extractNights(img) {
	var priceTd = img.parentNode.parentNode.previousSibling;
	var tds = getChildElementsByTagName(img.parentNode.parentNode.parentNode,"td");
	var idx = 0;
	for (var i=0; i<tds.length; ++i) {
		if ( tds[i] == priceTd ) {
			idx = i;
			break;
		}
	}
	
	var header = document.querySelectorAll("#ctl00_generalContent_DynamicOffers3Table_DgPrices > tbody > tr")[0];
	var headerTds = header.querySelectorAll("td");
	return headerTds[idx].textContent.match(/\d+\/(\d+)/)[1];
}

function getCountry() {
    var s = document.getElementById("ctl00_generalContent_DynamicOffers3Filter_ddlCountry");
    var idx = s.options.selectedIndex;
    if ( idx >= 0 )
    	return s.options[idx].text;
    return null;    
}

function textContent(node) {
	var tds = node.querySelectorAll("table.splitCellTable td");
	if ( tds.length == 0 ) {
		return node.textContent.trim();
	}
	
	var arr = [];
	for ( var i = 0; i < tds.length; i++) {
		var txt = tds[i].textContent.trim();
		if ( txt.length > 0 ) {
			arr.push(txt);
		}
	}
	
	for ( var i = 1; i < arr.length; i++) {
		if ( arr[0] != arr[i] ) {
			return arr.join(" / ");
		}
	}
	
	return arr.length == 0 ? "" : arr[0];
}

function getCity() {
	return selectedOption(document.getElementById("ctl00_generalContent_DynamicOffers3Filter_ddlDepartFrom"));
}

function createHotelOption(img) {
	var tds = getChildElementsByTagName(img.parentNode.parentNode.parentNode, "td");

	var offset = 0;
	if ( document.querySelector("#ctl00_generalContent_DynamicOffers3Table_DgPrices > tbody > tr > td:nth-child(2)").textContent == "Регион" )
		offset = 1;

	var option = {
		checkinDt : extractDate(tds[8+offset]),
		hotelName : textContent(tds[2+offset]) + " " + textContent(tds[3+offset]),
		href : extractHotelUrl(tds[2+offset]),
		region : tds[1+offset].textContent,
		roomType : textContent(tds[5+offset]) + (textContent(tds[6+offset]).length > 0 ? ", " + textContent(tds[6+offset]) : "") + ", " + textContent(tds[7+offset]),
		boardType : textContent(tds[4+offset]),
		currency : extractCurrency(tds),
		price : extractPrice(img),
		nights : extractNights(img),
		country : getCountry(),
		city_from: getCity(),
		occupancy: SEARCH_CRITERIA
	}

	return option
}

function createCruiseOption(img) {
	var tds = getChildElementsByTagName(img.parentNode.parentNode.parentNode, "td");

	var option = {
		checkinDt : extractDate(tds[4]),
		hotelName : tds[10].textContent,
		href : extractHotelUrl(tds[10]),
		region : tds[9].textContent,
		roomType : tds[1].textContent.trim() + ", " + tds[2].textContent.trim() + ", " + tds[3].textContent.trim(),
		boardType : "",
		currency : extractCurrency(tds),
		price : extractPrice(img),
		nights : extractNights(img),
		country : getCountry(),
		city_from: getCity(),
		occupancy: SEARCH_CRITERIA
	}

	return option
}

function createOption(img) {
	if ( document.querySelector("#ctl00_generalContent_DynamicOffers3Table_DgPrices > tbody > tr > td:nth-last-child(1)").textContent == "Лайнер" )
		return createCruiseOption(img);
	else
		return createHotelOption(img);
}

function injectHeader(tr) {
	var tds = tr.querySelectorAll("td");
	for ( var i=0; i < tds.length; ++i ) {
		if ( ! /^\d+\/\d+$/.test(tds[i].textContent) )
			continue;
		if ( tds[i+1].className.indexOf("qq") >= 0 )
			continue;
		
		var newTd = document.createElement("td");
		newTd.className = "qq"
		var newContent = document.createTextNode("QQ");
		newTd.appendChild(newContent);
		tr.insertBefore(newTd, tds[i+1]);
	}	
}

function injectCells(headerTr, tr) {
	var headerTds = headerTr.querySelectorAll("td");
	for ( var i=0; i < headerTds.length; ++i ) {
		if ( ! /^\d+\/\d+$/.test(headerTds[i].textContent) )
			continue;
		var tds = getChildElementsByTagName(tr, "td");
		if ( tds[i+1].className.indexOf("qq") >= 0 )
			continue;

		var newTd = document.createElement("td");
		newTd.className = "qq";

		if ( tds[i].className.indexOf("quote") >= 0 ) {
			var nobr = document.createElement("nobr")
			nobr.appendChild(createAddButton())
			nobr.appendChild(createEditButton())
	
			newTd.setAttribute("align", "center");
			newTd.appendChild(nobr)
		}

		tr.insertBefore(newTd, tds[i+1]);
	}	
}

function injectData() {
	var trs = document.querySelectorAll("#ctl00_generalContent_DynamicOffers3Table_DgPrices > tbody > tr");

	if (trs.length > 0)
		injectHeader(trs[0]);

	for ( var i = 1; i < trs.length; ++i)
		injectCells(trs[0], trs[i]);
}
