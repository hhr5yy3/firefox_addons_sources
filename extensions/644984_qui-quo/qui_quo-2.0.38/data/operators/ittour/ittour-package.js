var OPERATOR_NAME = "ITTOUR";
//-------- Search Criteria ---------------------------
function initializeSearchCriteria() {    
	return null;
}

function getSearchButton() {
	return document.querySelector(".itt_button_search_tour button");
}

function injectData() {
	var borders = document.querySelectorAll(".itt_price_block");
	for ( var i = 0; i < borders.length; i++ )
		if ( !borders[i].querySelector(".qq") ) {
			borders[i].appendChild(createCell());
		}
}


function createCell() {
	var newUl = document.createElement("ul");
	newUl.appendChild(createAddButton());
	newUl.appendChild(createEditButton());
	newUl.className = "qq";
	newUl.style = "text-align:end";
	return newUl;
}

function createOption(img) {
	var tab = getHotelRowByImage(img); 
	var trs = tab.querySelectorAll(".itt_info_tour_media_block table tbody tr");  
	var option = {
			checkinDt :getDateAndDistance(trs)[0],
			nights : getDateAndDistance(trs)[1], 
			hotelName : getHotelName(tab),
			href : getURL(tab),
			roomType: getRoomType(trs),
			region : getRegion(tab),
			boardType : getBoardType(trs),
			price : getPrice(tab),
			currency : getCurrency(tab),
			country:  getCountry(),
			city_from: getCity(trs), 
			operator: getOperator(),	
			thumbnail: getImg(tab),
			occupancy : getOccupancy(trs)
	}
	return option;
}

function getDateAndDistance(trs) {
	var dates = trs[0].querySelector(".itt_id_tour_dates").textContent.match(/\d+.\d+.\d{4}/g);
	var chDate = dayMonthYearToDate(dates[0]);
	var outDate = dayMonthYearToDate(dates[1]);
	var nights = getDistance(chDate, outDate);
	return [dates[0],nights.toString()];
}

function getHotelName(tab) {
	return tab.querySelector(".itt_hotel_name").textContent + document.querySelector(".itt_hotel_star").textContent;
}

function getURL(tab) {
	var  url = tab.querySelector(".itt_tab_head_cont .itt a");
	return url ? url.href : null;
}

function getRoomType(trs) {
	return trs[1].textContent.replace("Номер:","").trim();
}

function getRegion(tab) {
	return tab.querySelector(".itt_location_tour_view").textContent.split(",")[1].trim();
}

function getBoardType(trs) {
	return trs[5].textContent.replace("Питание:","").trim();
}

function getPrice(tab) {
	return extractIntFromStr(tab.querySelector(".itt_price_tour_view_user").textContent);
}

function getCurrency(tab) {
	var current = selectedOption(tab.querySelector(".itt_currency_tour_selector"));
	switch (current) {
	case "€": return "EUR";
	case "грн": return "UAH";
	case "$": return "USD";  
	default: return current;
	}
}

function getCountry() {
	return document.querySelector(".itt-country-name-result").textContent.trim();
}

function getCity(trs) {
	var check = trs[4].textContent.replace("Авиаперелет:","").trim();
	if ( check !== "включен" ) {
		return "";
	}
	return trs[3].textContent.replace("Вылет:","").match(/из(.+)на/)[1].trim();
}

function getOperator() {
	return window.location.hostname;
}

function getImg(tab) {
	var sel = tab.querySelector(".itt_hotel_big_photo img");
	return sel ? sel.src : null;
}

function getOccupancy(trs) {
	var occupancy = {
			adultsCount: 0,
			childrenCount: 0,
			childAges: null 
	};
	var text = trs[2].textContent.trim();
	occupancy.adultsCount = extractOptionalInt(text.match(/(\d+).+взр.+/)[1]);
	occupancy.childrenCount =text.match(/(\d+).+реб.+/) ?  extractOptionalInt(text.match(/(\d+).+реб.+/)[1]) : 0;
	if ( occupancy.childrenCount > 0 ) {
		var ages = text.match(/-(\d+)/g);
		if ( ages.length !== occupancy.childrenCount ) {
			return null;
		}
		var age = ages.map(function(a) {
			return a.replace("-","");
		}).join(",");
		occupancy.childAges = age; 
	}
	return occupancy;
}

function getHotelRowByImage(img) {
	var div = img.parentNode;
	while (true) {
		if ( div.className === "itt_issuing_search_tabs_head_cont") {
			break;
		}
		div = div.parentNode;
	};
	return div;
}