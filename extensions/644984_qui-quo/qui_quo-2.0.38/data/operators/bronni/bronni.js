var OPERATOR_NAME = "Bronni.ru";
var getHotelRowByImage;

//-------- Search Criteria ---------------------------

function getCountry() {
	var countryCaption = document.querySelector("#bronni-search-form div#country_id div.text");
	if ( countryCaption != null ) {
		return countryCaption.textContent;
	}
	return null;
}

function getCity() {
	var c = document.querySelector("#city_id .text");
	return c == null ? null : c.textContent;
}

function getOccupancy() {
	var occupancy = {
			adultsCount: 0,
			childrenCount: 0,
			childAges: null	
		};
	
    var s = document.querySelector("div.count-select.adult i.s");
    if ( !s )
    	return null;
    occupancy.adultsCount = extractIntFromStr(s.textContent);
    
    s = document.querySelector("div.count-select.children i.s");
    if ( !s )
    	return null;
    occupancy.childrenCount = extractIntFromStr(s.textContent);

    if ( occupancy.childrenCount > 0 ) {
    	var ages = [];
    	
    	for ( var i = 0; i < occupancy.childrenCount; ++i ) {
    		var input = extractIntFromStr(selectedOption(document.querySelector("select.br-ages-child" + (i + 1) + "-combobox.select")));
        	ages.push(input);
    	}

    	occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function initializeSearchCriteria() {    
    var country = getCountry();
    var city = getCity();
    var occupancy = getOccupancy();

    if ( !country || !city || !occupancy )
        return null;

    return { country : country,
    		 city : city,
    		 occupancy : occupancy };
}

function getSearchButton() {
	injectHistorySearchEvent();
	return document.querySelector("#bronni-search-form input[type=submit]");
}

function injectHistorySearchEvent() {
	var items = document.querySelectorAll("#sticker div.br-history-item div.description");
	for ( var i = 0; i < items.length; i++) {
		if ( items[i].getAttribute("injected") != null ) {
			continue;
		}
		items[i].setAttribute("injected", "true");
		items[i].addEventListener("click", function(e) {
			var t = e.target;
			if ( t.nodeName == "SPAN" ) {
				t = t.parentNode;
			}
			var country = t.querySelector("span");
			var city = t.firstChild.textContent.match(/(.*?)\s*\/\s*/);
			
			SEARCH_CRITERIA = {
					country : (country != null ? country.textContent : null),
					city : (city != null ? city[1] : null) };
			console.log("!!!test country: " + JSON.stringify(SEARCH_CRITERIA));
	    });
	}
}

//--------- Common ---------------------------------

function injectData() {
	injectShortData();
	injectFullData();
	injectGroupedData();
}

function resetImgStyles(img){
	img.setAttribute("style", "margin:0;padding:0;display:inline;cursor:pointer;");
	return img;
}

//--------- Short -----------------------------------

function injectShortData() {
	var header = document.querySelector("div.results-head div.top");
	if ( header != null && header.querySelector("div.qq") == null ) {
		resizeRow(header);
		header.appendChild(createQQ());
	}
	
	var items = document.querySelectorAll("div.results-head div.head-result-block div.bot:not(.br-template)");
	for ( var i = 0; i < items.length; i++) {
		var className = items[i].className;
		if ( className.indexOf("template") >= 0 || className.indexOf("banner") >= 0 ) {
			continue;
		}
		
		if ( items[i].querySelector("div.qq") == null ) {
			resizeRow(items[i]);
			items[i].appendChild(createShortButtons(createShortOption));
		}
		
	}
}

function createQQ() {
	var qq = document.createElement("div");
	qq.className = "qq";
	qq.setAttribute("style", "text-align:center;width:50px;");
	qq.appendChild(document.createTextNode("QQ"));	
	return qq;
}

function resizeRow(row) {
	var items = getChildElementsByTagName(row, "div");
	if ( items.length >= 12 ) {
		items[0].setAttribute("style", "width:55px;");
		items[1].setAttribute("style", "width:20px;");
		items[4].setAttribute("style", "width:20px;");
		items[11].setAttribute("style", "width:36px;");
	}
}

function createShortButtons(action) {
    var div = document.createElement("div");
    div.className = "qq";
    div.setAttribute("style", "width:50px;");
    div.appendChild(resetImgStyles(createAddButton(action)));    
    div.appendChild(resetImgStyles(createEditButton(action)));
    return div;
}

function createShortOption(img) {
	getHotelRowByImage = function(e) {
		return e.parentNode.parentNode;
	};
	var tds = getChildElementsByTagName(getHotelRowByImage(img), "div");
    var option = {
            checkinDt : extractShortDate(tds[0].textContent),
            nights : tds[1].textContent,
            region : tds[2].textContent,
            hotelName : tds[3].textContent + " " + tds[4].textContent,
            href : extractShortURL(tds[3]),
            roomType :  tds[5].textContent,
            boardType : tds[6].textContent,
            price : extractShortPrice(tds[8].textContent),
            currency : extractShortCurrency(tds[8].textContent),
            country : SEARCH_CRITERIA != null ? SEARCH_CRITERIA.country : getCountry(),
            city_from : SEARCH_CRITERIA != null ? SEARCH_CRITERIA.city : getCity(),
            occupancy : SEARCH_CRITERIA != null ? SEARCH_CRITERIA.occupancy : getOccupancy(),
            operator : OPERATOR_NAME + " / " + tds[10].textContent.trim()
        };
    return option;
}

function extractShortDate(dateAndMonth) {
    var m = dateAndMonth.match(/(\d\d)\.(\d\d)/);
	return appendYear(parseInt(m[1], 10), parseInt(m[2], 10));	
}

function extractShortURL(td) {
	var anchor = td.querySelector("a");
	return anchor != null ? anchor.href : "";
}

function extractShortPrice(priceAndCurrency) {
	return extractIntFromStr(priceAndCurrency.split(/\s+/).join(""));
}

function extractShortCurrency(priceAndCurrency) {
	var c = priceAndCurrency.split(/\s+/).join("").match(/([^\d]+)/)[1];
	switch (c) {
	case "€": return "EUR";
	case "р.": return "RUB";
	case "$": return "USD";
	}
	return c;
}


//--------- Full -----------------------------------

function createFullButtons(action) {
    var nobr = document.createElement("nobr");
    nobr.className = "qq";
    nobr.setAttribute("style", "margin-left:5px;padding:0;display:inline;");
    nobr.appendChild(resetImgStyles(createAddButton(action)));    
    nobr.appendChild(resetImgStyles(createEditButton(action)));
    return nobr;
}

function injectFullData() {
	var items = document.querySelectorAll("#results-block div.item:not(.br-template):not(.br-tour-template) div.col5 div.price");
	for ( var i = 0; i < items.length; i++) {
		if ( items[i].querySelector("nobr.qq") == null ) {
			items[i].appendChild(createFullButtons(createFullOption));
		}
	}	
}

function createFullOption(img) {
	getHotelRowByImage = function(e) {
		return e.parentNode.parentNode.parentNode.parentNode;
	};
	var row = getHotelRowByImage(img);
	
	var option = {
			checkinDt : extractShortDate(row.querySelector(".period .br-checkin-date").textContent),
			nights : row.querySelector(".period .br-duration").textContent.match(/\d+/)[0],
			region : row.querySelector(".title .city").textContent,
			hotelName : getFullHotelName(row),
			href : extractFullHotelRef(row),
			roomType :  getFullRoomType(row),
			boardType : row.querySelector(".br-hotel-info-block .br-meal").textContent,
			price : extractShortPrice(row.querySelector(".price").textContent),
			currency : extractShortCurrency(row.querySelector(".price").textContent),
            country : SEARCH_CRITERIA != null ? SEARCH_CRITERIA.country : getCountry(),
            city_from : SEARCH_CRITERIA != null ? SEARCH_CRITERIA.city : getCity(),
            occupancy : SEARCH_CRITERIA != null ? SEARCH_CRITERIA.occupancy : getOccupancy(),
			operator : OPERATOR_NAME + " / " + row.querySelector(".operator-logo a").title
	};
	return option;
}

function extractFullHotelRef(row) {
	return extractShortURL(row.querySelector(".title .hotel"))
}


function getFullHotelName(row) {
	var name = row.querySelector(".title .hotel").textContent;
	var stars = row.querySelectorAll(".rating-stars .br-star");
	if ( stars.length > 0 ) {
		name += " " + stars.length + "*";
	}
	return name;
}

function getFullRoomType(row) {
	var arr = [];
	
	var rt = row.querySelector(".br-hotel-info-block .br-room-type");
	if ( rt != null && rt.textContent.length > 0 ) {
		arr.push(rt.textContent);
	}
	
	var c = row.querySelector(".br-hotel-info-block .br-room-category");
	if ( c != null && c.textContent.length > 0 ) {
		arr.push(c.textContent);
	}

	var acc = row.querySelector(".br-hotel-info-block .br-accomodation");
	if ( acc != null && acc.textContent.length > 0 ) {
		arr.push(acc.textContent);
	}
	
	return arr.join(", ");
}

//--------- Grouped -----------------------------

function injectGroupedData() {
	var tables = document.querySelectorAll("#results-block div.item table.expanded-hotel");
	for (var i = 0; i < tables.length; i++) {
		var trs = tables[i].querySelectorAll("table.expanded-hotel>tbody>tr:not(.tour-template)");
		
		if ( trs.length > 0 && trs[0].querySelector("th.qq") == null ) {
			var ths = getChildElementsByTagName(trs[0], "th");
			if ( ths.length > 5 ) {
				trs[0].insertBefore(createHeaderCell(), ths[ths.length-1]);
			}
		}
		
		for ( var j = 1; j < trs.length; j++) {
			if ( trs[j].querySelector("td.qq") == null ) {
				var tds = getChildElementsByTagName(trs[j], "td");
				if ( tds.length > 5 ) {
					trs[j].insertBefore(createGroupedButtons(createGroupedOption), tds[tds.length-1]);
				}
			}
		}
	}
}

function createHeaderCell() {
    var td = document.createElement("th");
    td.className = "qq";
    td.appendChild(document.createTextNode("QQ"));
    return td;
}

function createGroupedButtons(action) {
    var td = document.createElement("td");
    td.className = "qq";
    td.appendChild(createAddButton(action));
    td.appendChild(createEditButton(action));   
    return td;
}

function createGroupedOption(img) {
	getHotelRowByImage = function (e) {
		return e.parentNode.parentNode;
	};
	var tr = getHotelRowByImage(img);
	var tds = getChildElementsByTagName(tr, "td");
	var row = tr.parentNode.parentNode.parentNode;
	
	var option = {
			hotelName : getFullHotelName(row),
			href : extractFullHotelRef(row),
			region : tds[0].textContent,
			checkinDt : extractShortDate(tds[1].textContent),
			nights : tds[2].textContent,
			roomType :  tds[3].textContent + ", " + tds[4].textContent,
			boardType : tds[5].textContent,
			price : extractShortPrice(tds[8].textContent),
			currency : extractShortCurrency(tds[8].textContent),
            country : SEARCH_CRITERIA != null ? SEARCH_CRITERIA.country : getCountry(),
            city_from : SEARCH_CRITERIA != null ? SEARCH_CRITERIA.city : getCity(),
            occupancy : SEARCH_CRITERIA != null ? SEARCH_CRITERIA.occupancy : getOccupancy(),
			operator : OPERATOR_NAME + " / " + tds[7].querySelector(".operator-logo a").title
	};
	return option;
}
