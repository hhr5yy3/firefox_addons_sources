var OPERATOR_NAME = "Горячие Туры";

// -------- Find Action ---------------------------

function getCountry() {
    return selectedOption(document.querySelector("#ddlCountry"));
}

function getCity() {
    return selectedOption(document.querySelector("#ddlCityFrom"));
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
    return document.querySelector("#btnSearch_input");
}

// --------- Rows ---------------------------------

function extractPrice(td) {
	var price = td.textContent.match(/(\d+).*/)[1];
	return parseInt(price, 10);
}

function extractDate(s) {
    var m = s.match(/\d\d\.\d\d\.\d{4}/);
    return m[0];
}

function extractNights(s) {
    var m = s.match(/(\d+)\sНОЧ/i);
    return m[1];
}

function extractHotelName(s) {
    var sp = s.split(/<br>/i);
    return sp[0];
}

function extractRegion(s) {
    var sp = s.split(/<br>/i);
    return sp[1];
}

function extractCurrency(td) {
	var s = td.textContent.match(/\d+\s+(.+)/)[1];
	switch (s) {
        case "руб": return "RUB";
        case "p.": return "RUB";
		case "€": return "EUR";
	}
	return s;
}

function createOption(img) {
	var tr = img.parentNode.parentNode.parentNode;
    var tds = tr.querySelectorAll("td");

    var option = {
        checkinDt : extractDate(tds[0].textContent),
        nights : extractNights(tds[0].innerHTML),
        region : extractRegion(tds[1].innerHTML),
        boardType : tds[3].textContent,
        href : "",
        currency : extractCurrency(tds[5]),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        roomType: tds[2].textContent,
        hotelName : extractHotelName(tds[1].innerHTML),
        price : extractPrice(tds[5]),
        operator : OPERATOR_NAME + " / " + tds[4].textContent
    }        

    return option
}

function createCell() {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());    
    nobr.appendChild(createEditButton());   
    
    var newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.appendChild(nobr);
    
    return newTd;
}

function createHeader() {
    var newTh = document.createElement("th");
    newTh.className = "qq rgHeader";
    newTh.setAttribute("align", "center");
    var newContent = document.createTextNode("QQ");
    newTh.appendChild(newContent);
    return newTh;
}

function injectData() {
    var trs = document.querySelectorAll(".rgMasterTable > thead > tr");
    if ( trs.length > 0 && !trs[1].querySelector("th.qq") )
    	trs[1].appendChild(createHeader());
    
    var trs = document.querySelectorAll(".rgMasterTable > tbody tr");
    for (var i = 0; i < trs.length; ++i) {
    	if ( !trs[i].querySelector("td.qq") && trs[i].querySelectorAll("td").length > 4 )
    		trs[i].appendChild(createCell());
    }
}
