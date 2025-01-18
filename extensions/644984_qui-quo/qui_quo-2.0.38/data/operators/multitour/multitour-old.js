var OPERATOR_NAME = "МУЛЬТИТУР";

//-------- Search Criteria ---------------------------

function getCity() {
	return selectedOption(document.querySelector("#cityfromid"));
}

function getOccupancy() {
	var occupancy = {
			adultsCount: 0,
			childrenCount: 0,
			childAges: null	
		};
	
	var s = selectedOption(document.querySelector("#adult"));
    if ( !s )
    	return null;
    occupancy.adultsCount = extractIntFromStr(s);
    
    s = selectedOption(document.querySelector("#child"));
    if ( !s )
    	return null;
    occupancy.childrenCount = extractIntFromStr(s);
    
    if ( occupancy.childrenCount > 0 ) {
    	var ages = [];
    	
    	for ( var i=0; i<occupancy.childrenCount; ++i ) {
    		s = selectedOption(document.querySelector("#agechild" + (i+1) + "val"));
        	ages.push(s ? extractIntFromStr(s) : 2);
    	}

    	occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function initializeSearchCriteria() {
	var city = getCity();
	var occupancy = getOccupancy();
	
	return (!city || !occupancy ) ? null : { city : city, occupancy : occupancy };
		
}

function getSearchButton() {
	return document.querySelector("#submitbutton");
}

//--------- Rows ---------------------------------

function getRows() {
	return document.querySelectorAll("#content>table>tbody>tr");
}

function injectData() {
	var rows = getRows();
	if ( rows.length == 0 ) {
		return;
	}
	
	injectTitle(rows[0]);
	
	for (var i = 1; i < rows.length; i++) {
		injectRow(rows[i]);
	}
}

function injectTitle(row) {
	if ( row.querySelector("th.qq") != null ) {
		return;
	}
	
    var td = document.createElement("th");
    td.className = "qq";
    td.appendChild(document.createTextNode("QQ"));
    row.appendChild(td);
}

function injectRow(row) {
	if ( row.querySelector("td.qq") != null ) {
		return;
	}
	
	var nobr = document.createElement("nobr");
	nobr.appendChild(createAddButton());
	nobr.appendChild(createEditButton());   

    var td = document.createElement("td");
    td.className = "qq tury";
   	td.appendChild(nobr);
   	
   	row.appendChild(td);
}

//--------- Option ---------------------------------

function createOption(img) {
	return document.URL.indexOf("selectorexcurs") > 0 ?
			createExcursOption(img) : createTourOption(img);
}

//--------- TOURS ---------------------------------

function createTourOption(img) {
	var tds = getChildElementsByTagName(img.parentNode.parentNode.parentNode, "td");
    var option = {
    	hotelName : tds[1].querySelector(".a-hotel").textContent,
    	href : tds[1].querySelector(".a-hotel").href,
    	region : tds[2].textContent,
    	country : getCountry(tds[2]),
    	roomType :  extractRoomType(tds[3]),
    	boardType : mapBoardType(tds[4].textContent),
        checkinDt : extractDate(tds[5].textContent),
        nights : extractNights(tds[6].textContent),
        price : extractIntFromStr(tds[7].textContent),
        currency : getCurrency(7),
        city_from: SEARCH_CRITERIA.city,
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function mapBoardType(boardType) {
    switch (boardType) {
    case "Без питания": return "RO";
    case "Завтрак": return "BB";
    case "2-х разовое": return "HB";
    case "3-х разовое": return "FB";
    }
	return boardType;	
}

function extractRoomType(td) {
	var items = [];
	var nodes = td.childNodes;
	for ( var i = 0; i < nodes.length; i++) {
		if ( nodes[i].textContent != "" ) {
			items.push(nodes[i].textContent);
		}
	}
	return items.join(" / ");
}

function extractDate(s) {
	var m = s.match(/(\d\d)\.(\d\d)\.(\d\d)/);
	return m[1] +"." + m[2] +".20" + m[3];
}

function extractNights(s) {
	return s.match(/(\d+)\s*\/\s*(\d+)/)[2];
}


function getCurrency(col) {
	var tds = getChildElementsByTagName(getRows()[0], "th");
	var c = tds[col].textContent.split("Цена,").join("").trim();
	switch (c) {
	case "руб.": return "RUB";	
	}
	return c;
}


function getCountry(td) {
	var a = td.querySelector("a");
	if ( a == null || a.href == null ) {
		return "";
	}
	
	var m = a.href.match(/\/tur\/([^\/]+)/);
	if ( m == null ) {
		return "";
	}
	
    switch (m[1]) {
    
    case "litva": return "Литва";
    case "abhaziya": return "Абхазия";
    case "rossiya": return "Россия";
    case "estoniya": return "Эстония";
    case "belarus": return "Беларусь";
    case "ukraina": return "Украина";
    
    case "Подмосковье": return "Россия";
    case "Геленджик": return "Россия";    
    case "krasnodar": return "Россия";
    case "Сочи": return "Россия";
    
    case "ukraina-karpati": return "Украина";
    case "ukraina-odessa": return "Украина";
    }
	
	return "";
	
}

//--------- EXCURS ---------------------------------

function createExcursOption(img) {
	var tds = getChildElementsByTagName(img.parentNode.parentNode.parentNode, "td");
    var option = {
    	hotelName : tds[0].querySelector('a').textContent,
    	href : tds[0].querySelector('a').href,
    	region : 'отель ' + tds[1].textContent,
    	roomType :  tds[2].textContent + " / " + extractRoomType(tds[3]),
    	boardType : "-",
        checkinDt : extractDate(tds[4].textContent),
        nights : extractNights(tds[5].textContent),
        price : extractIntFromStr(tds[6].textContent),
        currency : getCurrency(6),
       	country : getExcursCountry(),
       	city_from: ""
    };
    return option;
}



function getExcursCountry() {
    var s = location.search.match(/countryId=(\d+)/);
    if ( s == null ) {
        console.log("unable to extract country code from url");
        return "";
    }
    
    switch (s[1]) {
	case "6263": return "Абхазия";
	case "6276": return "Абхазия";
	case "6275": return "Армения";
	case "6236": return "Беларусь";
	case "6269": return "Беларусь";
	case "6271": return "Латвия";
	case "6272": return "Литва";
	case "6274": return "Прибалтика";
	case "6243": return "Россия";
	case "6228": return "Россия";
	case "6254": return "Россия";
	case "6277": return "Узбекистан";
	case "6258": return "Украина";
	case "5": return "Украина Крым";
	case "6255": return "Украина";
	case "6273": return "Эстония";
    }
    
    console.log("unexpected country id: " + s.value);
    return "";    
}