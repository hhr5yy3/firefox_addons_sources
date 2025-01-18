var OPERATOR_NAME = "Tourvisor";

// -------- Find Action ---------------------------

function getCity() {
	return selectedOption(document.querySelector("#s_flyfrom"));
}

function getCountry() {    
	return selectedOption(document.getElementById("s_country"));
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    var adults = document.querySelector("#s_adults");
    var kids = document.querySelector("#s_child");
    if ( !adults || !kids ) {
        return null;
    }

    occupancy.adultsCount = extractIntFromStr(selectedOption(adults));
    occupancy.childrenCount = extractIntFromStr(selectedOption(kids));

    if ( occupancy.childrenCount > 0 ) {
         occupancy.childAges = querySelectorAll(document, "select[id*=child_age_]").slice(0, occupancy.childrenCount).map( select => {
             return selectedOption(select).replace(/\D+/g,"");
         }).join();
    }

    return occupancy;
}

function initializeSearchCriteria() {    
    var country = getCountry();
    if ( !country ) {
        return null;
    }
    var city = getCity();
    if ( !city ) {
        return null;
    }

    return { "country" : country,
    		 "city" : city,
             "occupancy" : getOccupancy()};
}

function getSearchButton() {
    return Array.fromList(document.querySelectorAll("#b_search"));
}

// --------- Rows ---------------------------------

function extractPrice(tds) {
	var td = isOperatorShown(tds) ? tds[7] : tds[6];
	var price = td.querySelector("a").textContent;
	return parseInt(price.split(/\s+/).join(""), 10);
}

function extractDate(s) {
	var m = s.match(/(\d\d)\s+([^\s]+)/);
	return dateFromDayAndMonthName(m[1], m[2]);
}

function extractCurrency(tds) {
	var td = isOperatorShown(tds) ? tds[7] : tds[6];
	var s = trim(td.querySelector("a").nextSibling.textContent);
	return s == "руб." ? "RUB" : s;
}

function extractOperator(tds) {
	var result = OPERATOR_NAME;
	
	if ( isOperatorShown(tds) ) {
		var oper = tds[6].querySelector("img").title;
	
		var prefix = "Туроператор ";
		if ( oper.indexOf(prefix) == 0 ) 
			oper = oper.substring(prefix.length);
			
		result += " / " + oper;
	}
	
	return result;
}

function extractHotelName(div) {
	return trim(div.querySelector(".ts_hotel_name").textContent) + " " + trim(div.querySelector(".ts_srch_star_style").textContent);	
}

function extractHref(div) {
	var a = div.querySelector("a.ts_hotel_name");
	return a ? a.href : "";
}

function extractRegion(div) {
	var s = div.querySelector(".ts_region_label").textContent;
	return s[s.length-1] == "," ? s.substring(0, s.length-1) : s;
}

function isOperatorShown(tds) {
	var tbody = tds[0].parentNode.parentNode;
	var ths = tbody.querySelectorAll(".ts_detail_header > td");
	for ( var i=0; i<ths.length; ++i ) {
		if ( ths[i].textContent.indexOf("Оператор") >= 0 )
			return true;
	}
	return false;
}

function createOption(img) {
	var tr = img.parentNode.parentNode.parentNode;
    var tds = tr.querySelectorAll("td");

    var hotelDiv = tr.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.previousElementSibling;    
    
    var option = {
        checkinDt : extractDate(tds[1].textContent),
        nights : tds[2].textContent,
        region : extractRegion(hotelDiv),
        boardType : tds[5].textContent,
        href : extractHref(hotelDiv),
        currency : extractCurrency(tds),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        roomType: tds[3].textContent + ", " + tds[4].textContent,
        hotelName : extractHotelName(hotelDiv),
        price : extractPrice(tds),
        operator : extractOperator(tds),
        thumbnail : extractThumbnail(hotelDiv),
        occupancy : SEARCH_CRITERIA.occupancy
    }        

    return option

}

function extractThumbnail(hotel) {
	var img = hotel.querySelector(".ts_srch_pictd_style img");
	return img && img.src ? img.src : null;
}

function createCell() {
    var nobr = document.createElement("nobr")
    nobr.appendChild(createAddButton())    
    nobr.appendChild(createEditButton())   
    
    var newTd = document.createElement("td");
    newTd.className = "qq text_center"
    newTd.appendChild(nobr)
    
    return newTd
}

function createHeader() {
    var newTh = document.createElement("td");
    newTh.className = "qq";
    newTh.setAttribute("style", "padding: 5px;");
    newTh.setAttribute("align", "center");
    var newContent = document.createTextNode("QQ");
    newTh.appendChild(newContent);
    return newTh;
}

function injectData() {
    var trs = document.querySelectorAll(".ts_tours_table > tbody > tr");

    for (var i = 0; i < trs.length; ++i) {
    	var tr = trs[i];
    	if ( tr.querySelector("td.qq") != null )
    		continue;
    	var td = tr.className.indexOf("ts_detail_header") >= 0 ? createHeader() : createCell();
    	tr.appendChild(td);
    }
}
