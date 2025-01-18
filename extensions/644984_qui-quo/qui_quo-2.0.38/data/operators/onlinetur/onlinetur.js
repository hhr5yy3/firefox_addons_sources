var OPERATOR_NAME = "OnlineTur.ru";
//-------- Search Criteria ---------------------------
function initializeSearchCriteria() {    
	var city = getCity();
	if ( !city ){
		return null;
	}
	var country = getCountry();
	if ( !country ){
		return null;
	}
	var occupancy = getOccupancy();
	if ( !occupancy ) {
		return null;
	}

	return { "city": city,
		"occupancy": occupancy,
		"country": country
	};
}

function getSearchButton() {
	return document.querySelector("#doOrderAdv");
}

function injectData() {
	var head = document.querySelector("#searchResults .thead th");;
	if ( head && !head.parentNode.querySelector(".qq") ) {
		head.parentNode.appendChild(createHeaderCell());
	}
	var trs = document.querySelectorAll("#searchResults tr:not(.thead)");
	for ( var i=0; i<trs.length; i++ ){
		if ( !trs[i].querySelector(".qq") ) {
			trs[i].appendChild(createCell());
		}
	}
}


function createCell() {
	var newTd = document.createElement("td");
	newTd.appendChild(loadAsyncInfo(createAddButton())); 
	newTd.appendChild(loadAsyncInfo(createEditButton()));
	newTd.setAttribute("style", "position: relative;");
	newTd.className = "qq"; 
	newTd.align = "center";
	return newTd;
}

function createHeaderCell() {
	var newTh = document.createElement("th");
	newTh.className = "qq";
	newTh.appendChild(document.createTextNode("QQ"));
	return newTh;
}

function createOption(img) {
	var tr = getHotelRowByImage(img);
	var tds = tr.querySelectorAll("td");
	var option = {
			checkinDt :getDate(tds[0]),
			nights : tds[1].textContent, 
			hotelName : getHotelName(tds[3]),
			href :getUrl(tds[2]),
			roomType: tr.querySelector(".rmtp").textContent,
			region : tr.querySelector(".plc").textContent,
			boardType : tr.querySelector(".pns").textContent,
			price : extractIntFromStr(tr.querySelector(".price_val").textContent.replace(/\s+/g, "")),
			currency : mapCurrency(tr.querySelector(".price_crncy").textContent),
			country:  SEARCH_CRITERIA.country,
			city_from: SEARCH_CRITERIA.city, 
			operator: OPERATOR_NAME,
			thumbnail : tr.getAttribute("thumb"),
			occupancy : getOccupancy()
	}
	return option;
}

function getDate(td) {
	var s = td.textContent.match(/(\d\d).(\d\d)/);
	return appendYear(extractIntFromStr(s[1]),extractIntFromStr(s[2]));

}

function getHotelName(td) {
	return hotel = td.querySelector(".hotelname, .hotelname_") ? td.querySelector(".hotelname, .hotelname_").textContent : td.textContent;
}

function getUrl(td) {
	return td.querySelector("a.hotelname") ? td.querySelector("a.hotelname").href : null;
}

function mapCurrency(cur) {
	switch (cur.trim().toUpperCase()) {
	case "EUR": return "EUR";
	case "РУБ": return "RUB";
	case "USD": return "USD"
	case "BYN": return "BYN"
	return cur.trim();
	}
}

function getCity() {
	return selectedOption(document.querySelector("#flightFromList"));
}

function getCountry() {
	return selectedOption(document.querySelector("#countrySelect"));	
}

function getOccupancy() {
	var occupancy = {
			adultsCount: 0,
			childrenCount: 0,
			childAges: null 
	};
	var menu = selectedOption(document.querySelector("#accom"));
	occupancy.adultsCount = mapAdults(menu);
	occupancy.childrenCount = mapChildren(menu);
	if ( !occupancy.adultsCount ) {
		return null;
	}
	if ( occupancy.childrenCount > 0 ) {
		var ages = [];
		for ( var i = 1; i <= occupancy.childrenCount; i++ ) {
			var age = selectedOption(document.querySelector("#child"+i));
			if ( age === null ) {
				age = selectedOption(document.querySelector("#child"+i+" select"));
			}
			ages.push(age);
		}
		occupancy.childAges = ages.join(",");
	}
	return occupancy;
}

function mapAdults(menu) {
	switch (menu) {
	case "DBL (двое взр.)": return 2;
	case "SGL (один взр.)": return 1;
	case "DBL+EXB (трое взр.)": return 3
	case "SGL+CHD (+ребенок)": return 1;
	case "SGL+2CHD": return 1;
	case "DBL+CHD": return 2;
	case "DBL+2CHD": return 2;
	case "DBL+EXB+CHD": return 3;
	case "TRPL+2CHD": return 3;
	case "4PAX": return 4;
	case "4PAX+CHD": return 4;	
	return null;
	}	
}

function mapChildren(menu) {
	switch (menu) {
	case "SGL+CHD (+ребенок)": return 1;
	case "SGL+2CHD": return 2;
	case "DBL+CHD": return 1;
	case "DBL+2CHD": return 2;
	case "DBL+EXB+CHD": return 1;
	case "TRPL+2CHD": return 2;
	return 0;
	}	
}
	
function getHotelRowByImage(img) {
	var tr = img.parentNode;
	while (true) {
		if ( tr.tagName === "TR" ) {
			break;
		}
		tr = tr.parentNode;
	};
	return tr;
}

function loadAsyncInfo(img) {
	var func = img.onclick;
	img.onclick = function(event) {
		tr = getHotelRowByImage(img);
		tr.querySelector(".hotelname, .hotelname_").dispatchEvent(new MouseEvent('mouseover'));
		var iframe = tr.querySelector("#ifrm_tltip iframe");
		var count = 0;
		var intervalId = setInterval(function() {
			if (!iframe ) {
				return;
			}
			var iframeDoc = iframe.contentWindow.document;
			if ( iframeDoc.querySelector("body img")) {
				var src = iframeDoc.querySelector("body img").src.replace("thumb_", "");
				tr.setAttribute("thumb", src);
			}
			if ( ++count >= 40 || ( tr.getAttribute("thumb") )) {
				img.onclick = func;
				clearInterval(intervalId);
				tr.querySelector(".hotelname, .hotelname_").dispatchEvent(new MouseEvent('mouseout'));
				img.onclick(event);
				return;
			}
		},50);	
	}
	return img
}
