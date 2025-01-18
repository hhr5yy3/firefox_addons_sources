var OPERATOR_NAME = "Sunrise";

function getTables() {
    return document.querySelectorAll("div.hotels.container_hotels_result table.hotel");
}

// -------- Search Criteria ---------------------------

function getCountry() {
     var s = document.querySelector("div.filter_country div.text");
    if ( s == null ) {
        console.log("country selector is not found");
        return null;
    }
    
    return s.textContent.trim();
}

function getCity() {
	var c = document.querySelector("div.filter_city div.text");

    if ( c == null ) {
        console.log("city selector is not found");
        return null;
    }

    return c.textContent.trim();
}

function initializeSearchCriteria() {
    var country = getCountry();
    var city = getCity();
    if ( !country || !city ) {
        return null;
    }
    return { "country" : country,
             "city": city};
}


function getSearchButton() {
    return document.querySelector("button.send_search_form_button");
}


// --------- Rows ---------------------------------

function mapCurrency(s) {
    var c = trim(s).toUpperCase();
    switch (c) {
        case "Р.": return "RUB";
    }
    return c;
}

function extractPrice(td) {
    var price = td.querySelector("div.price").textContent.trim();
    return extractIntFromStr(price.replace(/[^\d]/g, ""));    
}

function extractCurrency(td) {
    var currency = td.querySelector("div.price").textContent.trim();
    return mapCurrency(currency.replace(/[^\W]/g, ""));
}

function extractDate(td) {
	return td.querySelector("div.dep-date").textContent.trim();
}

function extractHotelName(td) {
    var stars = td.querySelector("span[class*='stars']");
    if ( !stars ) {
        stars = ""
    } else {
        var match = stars.getAttribute("class").match(/\d+/);
        stars = match ? parseInt(match[0], 10) : 0;
        stars = stars > 0 ?  " " + stars + "*" : "";
    }
    
	var a = td.querySelector("div.hotel__title a");
    return a ? a.textContent + stars : td.querySelector("div.hotel__title").textContent + stars;
}

function extractHotelUrl(td) {
    var a = td.querySelector("div.hotel__title a");
	if ( a != null ) {
		return a.href;
    }
	return null;
}

function extractBoardType(td) {
    return td.querySelector("div.food").textContent.trim();
}

function extractRegion(td) {
	return td.querySelector("div.hotel__region").textContent.trim();
}

function extractRoomType(td) {
    var people = td.querySelector("div.people");
	var room = td.querySelector("div.room");
	var result = [];
	if ( people )
		result.push(people.textContent.trim());
	if ( room )
		result.push(room.textContent.trim());
	return result.join("/");
}

function extractNights(td) {
    return td.querySelector("div.dep-date").textContent.trim().match(/(\d+)\s*НОЧ/i)[1];
}

function createOption(img) {
    var tds = img.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll("td");

    var option = {
        checkinDt : extractDate(tds[0]),
        hotelName : extractHotelName(tds[0]),
        href : extractHotelUrl(tds[0]),
        region : extractRegion(tds[0]),
        roomType: extractRoomType(tds[0]),
        boardType : extractBoardType(tds[0]),
        price : extractPrice(tds[1]),
        currency : extractCurrency(tds[1]),
        nights : extractNights(tds[0]),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
    };

    return option;
}

function createCell() {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());
    
    var newDiv = document.createElement("div");
    newDiv.className = "qq";
    newDiv.setAttribute("align", "center");
    newDiv.setAttribute("style", "padding-bottom: 10px");
    newDiv.appendChild(nobr);
    
    return newDiv;
}
    
function injectData() {
    var tables = getTables();

    if ( !tables ) {
        return;
    }
    var trs = document.querySelectorAll("div.hotels.container_hotels_result table.hotel tbody tr");

    for ( var i = 0; i < trs.length; ++i ) {
        if ( trs[i].querySelector("div.qq") == null ) {
            var tds = trs[i].querySelectorAll("td");
            if ( tds.length > 1) {
                tds[1].querySelector("div.price").style.setProperty("padding-bottom", "29px");
                tds[1].querySelector("div").insertBefore(createCell(), tds[1].querySelector("div.btn_more"));
            }
        }
    }
}

