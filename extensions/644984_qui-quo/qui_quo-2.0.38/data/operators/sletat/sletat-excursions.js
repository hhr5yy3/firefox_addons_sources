var OPERATOR_NAME = "sletat.ru";
var OPERATOR_SLETAT_ID = -1;
//-------- Search Criteria ---------------------------

function initializeSearchCriteria() {
	return null;
}

function getSearchButton() {
    return null;
}

function getCountry() {
	return null;
}


//--------- Rows ---------------------------------

function injectData() {
	var check_trs = document.querySelectorAll(".item_sale-of-tours");
	for (var i = 0; i < check_trs.length; i++) {
	    var tr = check_trs[i].querySelector(".content div.block-right");
	    if ( tr && tr.querySelector(".qq") == null ) {
	        var check = check_trs[i].querySelector("img");
	        check = check ? check.src : null;
	        if ( check == "http://sletat.ru/images/sale-tours-excursion.png") {
	            tr.appendChild(createCell());
	        }
	    }
	}
}

function createCell() {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());

    var div = document.createElement("div")
    div.appendChild(nobr);
    div.className = "qq";

    return div;
}

function createOption(img) {
	var tr = getHotelRowByImage(img);
	var dates = tr.querySelectorAll(".direction__date");
	var option = {
        checkinDt: extractDate(dates),
        nights: extractNights(tr),
        hotelName: extractHotelName(tr),
        href: extractHotelHref(tr),
        roomType: extractRoomType(tr),
        region: "",
        boardType: extracBoardType(tr, dates),
        price: extractPrice(tr),
        currency: mapCurrency(tr),
        country: extractCountry(tr),
        city_from: cityFrom(tr),
        operator: "",
        occupancy : {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null 
        	}
	};
    return option;
}

function extractDate(dates) {
    	return dates[0].textContent.match(/\d\d.\d\d.\d{4}/)[0];
}

function extractDates(dates) {
   var var_dates =  Array.fromList(dates).slice(1).map(function(a) {
	  return a.textContent + " "  	   
   } ).join();
return var_dates ? "\nВозможные даты вылета: " + var_dates : "";
}

function extractNights(tr) {
	var nights = extractIntFromStr(tr.querySelector(".excursion .excursion__item:nth-child(2)").textContent) -1;
	return nights.toString();
}

function extractHotelName(tr) {
	return tr.querySelector("a").textContent;
}

function extractHotelHref(tr) {
	 return tr.querySelector("a").href;
}

function extractCountry(tr) {
	var cities = Array.fromList(tr.querySelector(".direction").getElementsByTagName("strong")).map(function(city) { return city.textContent; }).join();
	return cities;
}

function extractRoomType(tr) {
	return tr.querySelector(".excursion__item").textContent;
}

function extracBoardType(tr, dates) {
	return tr.querySelector(".advert").textContent + extractDates(dates);
}

function extractPrice(tr) {
    var price = tr.querySelector(".price").textContent.replace(/\D+/g, "");
    return extractIntFromStr(price);
}

function mapCurrency(tr) {
	var text = tr.querySelector(".price").textContent.replace("от", "").replace(/(\s*\d*)/g, "");
    switch (text) {
        case "€": return "EUR";
        case "р.": return "RUB";
        case "$": return "USD";
        default: return text;
    }
}

function cityFrom(tr) {
	var city = tr.querySelector(".direction strong");
	return city ? city.textContent : "";
}

function getHotelRowByImage(img) {
	var tr = img.parentNode;
	while (true) {
		if ( tr.className == "content") {
		    break;
		}
		tr = tr.parentNode;
	};
	return tr;
}