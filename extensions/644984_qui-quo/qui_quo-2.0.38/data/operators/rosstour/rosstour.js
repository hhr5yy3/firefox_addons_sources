var OPERATOR_NAME = "РоссТур";

// -------- Find Action ---------------------------

function getCountry() {    
	var c = document.querySelector("[for=gde-dst] .gde-firstelem");
	return c ? c.textContent : "";
}

function getCity() {    
	var c = document.querySelector("[for=gde-src] .gde-firstelem");
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
    return document.querySelector("#getSearch");
}

// --------- Rows ---------------------------------

function extractPrice(td) {
	return parseInt(td.querySelector("span").textContent, 10);
}

function extractDate(s) {
	return makeYear4Digits(s.match(/(\d\d\.\d\d\.\d\d)/)[1]);
}

function extractNights(s) {
	return s.match(/(\d+)\s+ноч/)[1];
}

function extractRegion(td) {
	var p = td.querySelector("p.shrt");
	var region = p.nextElementSibling.nextElementSibling;
	return region ? trim(region.textContent) : "";
}

function extractBoardType(td) {
	var ps = td.querySelectorAll("p");
	for ( var i=0; i<ps.length; i++ ) {
		if (ps[i].textContent.indexOf("Питание")>=0 ) {
			var m = ps[i].textContent.match(/: (.+)/);
			if ( m ) {
				return m[1];
			}
		}
	}
	return "";	
}

function extractRoomType(td2, td3) {
	var room = "";

	var ps = td2.querySelectorAll("p");
	for ( var i=0; i<ps.length; i++ ) {
		if ( ps[i].textContent.indexOf("Тип номера")>=0 )
			room += ps[i].textContent;
	}

	ps = td3.querySelectorAll("p");
	for ( var i=0; i<ps.length; i++ ) {
		if ( ps[i].textContent.indexOf("Размещение")>=0 )
			room += " " + ps[i].textContent;
		if ( ps[i].textContent.indexOf("Тип комнаты")>=0 )
			room += " " + ps[i].textContent;
	}
	
	return room;	
}

function extractHref(td) {
	var a = td.querySelector("p.shrt a");
	return a ? a.href : "";
}

function extractCurrency() {
	var s = document.querySelector("#gde-valute");
	var v = s.options[s.selectedIndex].textContent;
	switch (v) {
		case "РУБ": return "RUB";
	}
	return v;
}

function extractCountry() {
	var s = document.querySelector("#gde-dst");
	var c = s.options[s.selectedIndex].textContent;
	return c;
}

function extractHotelName(td) {
	var h = td.querySelector("p.shrt");
	return h ? h.title : "";
}

function extractOperator(td) {
	var img = td.querySelector("img");	
	return img == null ? OPERATOR_NAME : OPERATOR_NAME + " / " + img.getAttribute("title");
}
function createOption(img) {
	var tr = img.parentNode.parentNode.parentNode.parentNode;
    var tds = tr.querySelectorAll("td");

    var option = {
        checkinDt : extractDate(tds[0].textContent),
        nights : extractNights(tds[0].textContent),
        region : extractRegion(tds[2]),
        boardType : extractBoardType(tds[3]),
        href : extractHref(tds[2]),
        currency : extractCurrency(),
        country: extractCountry(),
        roomType: extractRoomType(tds[2], tds[3]),
        hotelName : extractHotelName(tds[2]),
        price : extractPrice(tds[5]),
        operator : extractOperator(tds[6]),
        city_from: SEARCH_CRITERIA.city,
    };

//    console.log(option);
    
    return option
}

function applyStyle(img, style) {
	img.setAttribute("style", img.getAttribute("style") + ";" + style);
	return img;
}

function createCell() {
    var nobr = document.createElement("nobr");
    nobr.appendChild(applyStyle(createAddButton(), "margin-top: 3px"));    
    nobr.appendChild(createEditButton());   
    
    var newTd = document.createElement("p");
    newTd.className = "qq";
    applyStyle(newTd, "margin-bottom: 4px");
    newTd.appendChild(nobr);
    
    return newTd;
}

function injectData() {
    var trs = document.querySelectorAll(".gde-resultTable .rcof5");
    for (var i = 0; i < trs.length; ++i) {
    	if ( !trs[i].querySelector("p.qq") )
    		trs[i].insertBefore(createCell(), trs[i].lastChild);
    }
}

// --------- Logs ---------------------------------

function getHotelRowByImage(img) {
	return img.parentNode.parentNode.parentNode.parentNode;
}