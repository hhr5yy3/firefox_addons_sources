var OPERATOR_NAME = "GoldTravel";
var OPERATOR_SLETAT_ID = 163;


function getCountry() {
	return selectedOption(document.getElementById("countryID"));
}

function getCity() {
	return selectedOption(document.getElementById("departureTownID"));
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
    return document.querySelector("#btn_2 td");
}

//--------- Rows ---------------------------------

function injectData() {
	var trsHead = document.querySelectorAll("div#toursearch-results table>thead>tr");

	if ( trsHead.length > 0 ) {
		injectTitle(trsHead[0]);
	}

	var trs = document.querySelectorAll("div#toursearch-results table>tbody>tr");


	for ( var j = 0; j < trs.length; j++) {
		injectRow(trs[j]);
	}
}

function injectTitle(tr) {
	if ( tr.querySelector("th.qq") != null ) {
		return;
	}

	var th = document.createElement("th");
	th.className = "qq";
	th.setAttribute("rowspan", "2");
	th.appendChild(document.createTextNode("QQ"));

	tr.appendChild(th);
}

function injectRow(tr) {

	if ( tr.querySelector("td.qq") != null ) {
		return;
	}

	var td = document.createElement("td");
	td.className = "qq";
	td.appendChild(createAddButton());
	td.appendChild(document.createElement("br"));
    td.appendChild(createEditButton());

	tr.appendChild(td);
}

//--------- Data ---------------------------------



function createOption(img) {
	var tds = getChildElementsByTagName(img.parentNode.parentNode, "td");
	var nameAndRoomType = extractNameAndRoomType(tds[0]);
	var operator = tds[2].textContent.trim();
	var rating= tds[3].textContent.trim();
	var priceAndCurrency = extractPriceAndCurrency(tds[8]);
	var option = {
			hotelName : nameAndRoomType[0].indexOf(rating) >= 0 ? nameAndRoomType[0] : nameAndRoomType[0] + " " + rating,
			href : extractHotelURL(tds[0]),
		    region : tds[1].textContent,
            operator : OPERATOR_NAME + ( operator == "" ? "" : " / " + operator),
            nights : tds[4].textContent,
            roomType :  nameAndRoomType[1] + " / " + tds[5].textContent.trim(),
            boardType : tds[6].textContent,
            checkinDt : extractDate(tds[7]),
            price : extractIntFromStr(priceAndCurrency[0]),
            currency : mapCurrency(priceAndCurrency[1]),
            country : SEARCH_CRITERIA ? SEARCH_CRITERIA.country : "",
            city_from: SEARCH_CRITERIA ? SEARCH_CRITERIA.city : 'Нет данных',
        };
	//console.log("option: " + JSON.stringify(option));
    return option;
}

function extractNameAndRoomType(td) {
	return td.textContent
		.split("\n")
		.filter(function(s) { return s.trim() != ""; });
}

function extractHotelURL(td) {
	var a = td.querySelector("a");
	return a == null ? "" : a.href;
}

function extractDate(td) {
	var m = td.textContent.match(/(\d+)\.(\d+)/);
	return appendYear(extractIntFromStr(m[1]),extractIntFromStr(m[2]));
}

function extractPriceAndCurrency(td) {
	var div = getVisibleDiv(td);
	var s = div.textContent.trim().split(/\s+/).join("");
	var m = s.match(/(\d+)([^\d]+)/);
	return [m[1],m[2]];
}

function getVisibleDiv(td) {
	var divs = td.querySelectorAll("div");
	for ( var i = 0; i < divs.length; i++) {
		var s = divs[i].getAttribute("style");
		if ( s == null || s.indexOf("none") < 0 )
			return divs[i];
	}
	return null;
}

function mapCurrency(c) {
	switch(c.toLowerCase()) {
	case "р.": return "RUB";
	}
	return c;
}
