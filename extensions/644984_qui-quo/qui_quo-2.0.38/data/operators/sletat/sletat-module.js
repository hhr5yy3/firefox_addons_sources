var OPERATOR_NAME = "Слетать.ру";
var showTopHotelsRating = true;
var getHotelRowByImage;

//-------- Search Criteria ---------------------------

function getSearchFrame() {
	var frame = document.querySelector("#sletat-search-1");
	return frame != null ? frame.contentDocument : document;
}

function getCountry() {
	var countryCaption = getSearchFrame().querySelector("#countries-decor .selectmenu-text");
	if ( countryCaption && countryCaption.textContent ) {
		// иногда в ФФ нет страны. вот такой селект всех внутренностей почему-то помогает
		if ( /globus-tour/i.test(window.location.href) ) {
			var allElements = countryCaption.getElementsByTagName("*");
		}
		return countryCaption.textContent;
	}
	return null;
}

function getCity() {
	return selectedOption(getSearchFrame().querySelector("#cities"));
}

function initializeSearchCriteria() {    
    var country = getCountry();
    if ( !country )
        return null;
        
    return { "country" : country,
    		 "city" : getCity(),
    		 "occupancy": getOccupancy()};
}


function getSearchButton() {
	return getSearchFrame().querySelector("button#submit");
}

function parseSelectedOption(sel) {
	return extractOptionalInt(selectedOption(getSearchFrame().querySelector(sel)));
	
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function getOccupancy() {
    var occupancy = {
            adultsCount: parseSelectedOption("#adults"),
            childrenCount: parseSelectedOption("#kids"),
            childAges: null 
        };
    
    if ( occupancy.adultsCount === null || occupancy.childrenCount === null )
        return null;
    
    if ( occupancy.childrenCount > 0 ) {	
        var ages = [];
        for (var i = 1; i <= occupancy.childrenCount; i++) {
			var input = selectedOption(getSearchFrame().querySelector("#kid" + i));
			var age = input && extractOptionalInt(input);
			if ( age === null ) {
				 age = 0;
			}
			ages.push(age);
		}
        occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

//--------- Common ---------------------------------

function getDoc() {
	var frame = document.querySelector("#sletat-frame-2, #sletat-popup-2");
	return frame != null ? frame.contentDocument : document;
}

function injectData() {
	var doc = getDoc();
    injectStyleSheet(doc);
	var short = doc.querySelector("table.result.result-short");
	if ( short != null ) {
		injectShortData(doc, short);
	}
	
	var full = doc.querySelectorAll("div.result-item");
	if ( full.length > 0 ) {
		injectFullData(doc, full);
	}
	
	var group = doc.querySelectorAll("div.tours-found-data>table");
	if ( group.length > 0 ) {
		for ( var i = 0; i < group.length; i++) {
			injectGroupData(doc, group[i]);
		}
	}
}

function createHeaderCell(doc) {
    var td = doc.createElement("th");
    td.className = "qq";
    td.appendChild(document.createTextNode("QQ"));
    return td;
}

//--------- Short ------------

function injectShortData(doc, tbl) {
	var thead = tbl.querySelector("table>thead>tr.result-head");
	if ( thead != null && thead.querySelector("th.qq") == null ) {
		thead.appendChild(createHeaderCell(doc));
	}
	
	var rows = tbl.querySelectorAll("table>tbody>tr.result-item");
	for (var i = 0; i < rows.length; i++) {
		if ( rows[i].querySelector("td.qq") == null ) {
			rows[i].appendChild(createShortDataButtons(createShortOption));			
		}
	}
}

function createShortDataButtons(action) {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton(action));
    nobr.appendChild(createEditButton(action));   

    var td = document.createElement("td");
    td.className = "qq";
   	td.appendChild(nobr);
    return td;
}

function extractShortDate(dateAndMonth) {
    var m = dateAndMonth.match(/(\d\d)\.(\d\d)/);
	return appendYear(parseInt(m[1], 10), parseInt(m[2], 10));	
}

function extractShortStars(td) {
	var s = td.querySelector("td span.stars");
	if ( s == null ) {
		return null;
	}
	return s.textContent + "*";
}

function extractShortHotelName(td) {
	var a = td.querySelector("td a");
	if ( a == null ) {
		return td.textContent;
	}
	
	var name = a.textContent;
	
	var s = extractShortStars(td);
	if ( s != null && name.indexOf(s) < 0 ) {
		name = name + " " + s;
	}
	
	return name;	
}

function extractShortHotelUrl(td) {
	var a = td.querySelector("td a");
	if ( a != null && a.getAttribute("data-link") != null) {
		return a.getAttribute("data-link");
	}
	return "";
}

function extractShortPrice(priceAndCurrency) {
	return extractIntFromStr(priceAndCurrency.split(/\s+/).join("").match(/([^\d]*)(\d+)([^\d]*)/)[2]);
}

function extractShortCurrency(priceAndCurrency) {
	var arr = priceAndCurrency.split(/\s+/).join("").match(/([^\d]*)(\d+)([^\d]*)/);
	
	var c = (arr[1] + arr[3]).trim();
	switch (c) {
	case "€": return "EUR";
	case "руб.": return "RUB";
	case "$": return "USD";
    case "₸": return "KZT";
	}
	return c;
}

function createShortOption(img) {
	getHotelRowByImage = function(e) {
		return e.parentNode.parentNode.parentNode;
	};
	var tds = getChildElementsByTagName(getHotelRowByImage(img), "td");
    var option = {
            checkinDt : extractShortDate(tds[0].textContent),
            nights : tds[1].textContent.match(/(\d+)\s*\(\d\d\.\d\d\)/)[1],
            region : tds[2].textContent,
            hotelName : extractShortHotelName(tds[3]),
            boardType : tds[5].textContent,
            roomType :  tds[6].textContent,
            price : extractShortPrice(tds[7].textContent),
            currency : extractShortCurrency(tds[7].textContent),
            href : extractShortHotelUrl(tds[3]),
            country : SEARCH_CRITERIA.country,
            city_from : SEARCH_CRITERIA.city,
            operator : OPERATOR_NAME,
            occupancy : SEARCH_CRITERIA.occupancy
        };
    return option;
}

//--------- Full ------------

function injectFullData(doc, rows) {
	for (var i = 0; i < rows.length; i++) {
		if ( rows[i].querySelector(".qq") == null ) {
			var price = rows[i].querySelector("div.rating");
			if ( price != null ) {
				var btns = createFullDataButtons(createFullOption);
				if ( price.nextSibling ) {
					price.parentNode.insertBefore(btns, price.nextSibling);
				} else {
					price.parentNode.appendChild(btns);
				}
			}
		}
	}
}

function createFullDataButtons(action) {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton(action));
    nobr.appendChild(createEditButton(action));
    nobr.className = "qq";
    nobr.setAttribute("style", "clear:both;float:right;margin-right:35px;");
    return nobr;
}

function extractFullHotelUrl(div) {
	var a = div.querySelector("a.hotel-link");
	if ( a != null && a.getAttribute("data-link") != null ) {
		return a.getAttribute("data-link");
	}
	return "";
}

function extractFullStars(div) {
	var stars = div.querySelector("div.stars");
	if ( stars == null || stars.getAttribute("class") == null ) {
		return null;
	}
	
	var m = stars.getAttribute("class").match("star([^\s]+)");
	if ( m != null ) {
		return m[1];
	}
	return null;
}

function extractFullHotelName(div) {
	var a = div.querySelector("div.hotel-info a.hotel-link");
	if ( a == null ) {
		return div.querySelector("div.hotel-info").textContent;
	}
	
	var name = a.textContent;
	
	var s = extractFullStars(div);
	if ( s != null && name.indexOf(s) < 0 ) {
		name = name + " " + s;
	}
	
	return name;	
	
}

function extractFullRegion(div) {
	return div.querySelector("div.health").textContent;
}

function mkRoom(room, alloc) {
	if ( room == alloc ) {
		return room;
	}
	return room + " / " + alloc;
}

function extractCode(text) {
	var m = text.match(/\(([^\)]+(?:\(\s*\d+\s*-\s*\d+\s*\))*[^\)]*)\)$/);
	if ( m != null ) {
		return m[1];
	}
	return text;
}

function createFullOption(img) {
	getHotelRowByImage = function(e) {
		return e.parentNode.parentNode.parentNode.parentNode;
	};
	var div = getHotelRowByImage(img);
	var dateAndNights = div.querySelector("div.date-start").textContent.match(/(\d\d.\d\d.\d\d\d\d)[^\d]+(\d+)/);
    var option = {
            checkinDt : dateAndNights[1],
            nights : dateAndNights[2],
            region : extractFullRegion(div),
            boardType : extractCode(div.querySelector("div.meals").textContent),
            roomType :  mkRoom(div.querySelector("div.room").getAttribute("data-original"),
            			extractCode(div.querySelector("div.placing").textContent)),
            price : extractShortPrice(div.querySelector("div.price dd").textContent),
            currency : extractShortCurrency(div.querySelector("div.price dd").textContent),
            hotelName : extractFullHotelName(div),
            href : extractFullHotelUrl(div),
            country : SEARCH_CRITERIA.country,
            city_from : SEARCH_CRITERIA.city,            
            operator : OPERATOR_NAME,
            thumbnail : extractThumbnail(div),
            occupancy : SEARCH_CRITERIA.occupancy
        };
    return option;
}

function extractThumbnail(div) {
	return getBackgroundImageUrl(div.querySelector(".image div"));
}


//--------- Group ------------

function injectGroupData(doc, tbl) {
	var rows = tbl.querySelectorAll("table>tbody>tr");
	if ( rows.length > 0 ) {
		if ( rows[0].querySelector("th.qq") == null ) {
			rows[0].appendChild(createHeaderCell(doc));			
		}
	}
	for ( var i = 1; i < rows.length; i++) {
		if ( rows[i].querySelector("td.qq") == null ) {
			rows[i].appendChild(createShortDataButtons(createGroupOption));			
		}
	}
}

function extractGroupText(td) {
	var a = td.querySelector("a");
	if ( a != null && a.lastChild != null ) {
		return a.lastChild.textContent;
	}
	return td.getAttribute("data-original");
}

function createGroupOption(img) {
	getHotelRowByImage = function(e) {
		return e.parentNode.parentNode.parentNode;
	};
	var tr = getHotelRowByImage(img);
	var addons = tr.parentNode.parentNode.parentNode.parentNode.parentNode;
	var hotelDiv = addons.previousSibling;
	var tds = getChildElementsByTagName(tr, "td");
	
	 var option = {
	            checkinDt : tds[0].textContent,
	            nights : tds[1].textContent,
	            boardType : extractGroupText(tds[2]),
	            roomType : mkRoom(tds[3].textContent, 
	            			extractGroupText(tds[4])),
	            price : extractShortPrice(tds[5].textContent),
	            currency : extractShortCurrency(tds[5].textContent),
	            hotelName : extractFullHotelName(hotelDiv),
	            href : extractFullHotelUrl(hotelDiv),
	            region : extractFullRegion(hotelDiv),
	            country : SEARCH_CRITERIA.country,
	            city_from : SEARCH_CRITERIA.city,	            
	            operator : OPERATOR_NAME,
	            thumbnail : extractThumbnail(hotelDiv)
	        };
	 return option;
}
