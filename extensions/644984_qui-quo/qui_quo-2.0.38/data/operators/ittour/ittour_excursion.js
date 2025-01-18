var OPERATOR_NAME = "ITTOUR";

// -------- Search Criteria ---------------------------

function initializeSearchCriteria() {
    return null;
}


function getSearchButton() {
    return null;
}


// --------- Rows ---------------------------------

function findChosedOption(name) {
	var pattern = new RegExp(name +  ": (.*)");
	var nl = document.querySelectorAll(".choosed-options li div");
	for ( var i=0; i<nl.length; ++i ) {
		var m = nl[i].textContent.match(pattern);
		if ( m )
			return trim(m[1]);
	}
	return null;
}

function getCountry() {
	var c = findChosedOption("Страна");
	return c ? c : "";
}

function getCity() {
	var c = findChosedOption("Выезд из");
	return c ? c : "";
}

function extractDate(tr) {
	var m = tr.querySelector(".tour-date").textContent.match(/\d{2}\.\d{2}\.\d{2}/);
    return makeYear4Digits(m[0]);
}

function extractHotelName() {
    return trim(document.querySelector(".content-search-excursion .new-search").textContent);
}

function extractHotelHref() {
    var a = document.querySelector(".content-search-excursion .new-search a");
    return a ? a.href : null;
}

function extractRegion() {
	var r = findChosedOption("Города на маршруте");
	return r ? r : "";
}

function extractRoomType(img) {
	var td = img.parentNode.parentNode.parentNode;
	var tr = td.parentNode;
	
	var roomType = [];
	var idx = getChildElementsByTagName(tr, "td").indexOf(td);
	if ( idx >= 0 ) {
		var table = tr.parentNode.parentNode;
		var trs = table.querySelectorAll("tr");
		var ths0 = trs[0].querySelectorAll("th");
		var ths1 = trs[1].querySelectorAll("th");
		roomType.push(ths1[idx - ths0.length + 1].textContent);
	}
	
	var t = findChosedOption("Транспорт");
	if ( t )
		roomType.push("Транспорт: " + t);
	t = findChosedOption("Ночных переездов");
	if ( t )
		roomType.push("Ночных переездов: " + t);
    
	return roomType.join(", ");
}

function extractBoardType(tr) {
	return trim(getChildElementsByTagName(tr, "td")[3].textContent);
}

function extractPrice(img) {
	var spans = img.parentNode.parentNode.parentNode.querySelectorAll(".tour-price span");
	for ( var i=0; i<spans.length; i++ ) {
		if ( spans[i].offsetParent )
			return extractIntFromStr(spans[i].textContent);
	}
	throw "cannot find price";
}

function extractCurrency() {
	return document.querySelector("#current_currency").textContent.trim();
}

function extractNights() {
	var n = findChosedOption("Ночей");
	if ( n )
		return n;
	else
		throw "cannot find Nights";
}

function createOption(img) {
	var tr = img.parentNode.parentNode.parentNode.parentNode;
	
    var option = {
        checkinDt : extractDate(tr),
        hotelName : extractHotelName(),
        href : extractHotelHref(),
        region : extractRegion(),
        roomType: extractRoomType(img),
        boardType : extractBoardType(tr),
        price : extractPrice(img),
        currency : extractCurrency(),
        nights : extractNights(),
        country: getCountry(),
        city_from : getCity(),
        occupancy : {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null 
        }
    };

    return option;
}

function createCell() {
    var nobr = document.createElement("nobr")
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());
    
    var div = document.createElement("div");
    div.appendChild(nobr);
    div.className = "qq";
    
    return div;
}
    
function injectData() {
    var table = document.querySelector(".results.proposition");
    if ( !table )
        return;

    var anchors = table.querySelectorAll("a.tour-price");
    for ( var i = 0; i < anchors.length; ++i ) {
    	var td = anchors[i].parentNode;
    	if ( td.querySelector(".qq") )
    		continue;
    	var spans = anchors[i].querySelectorAll("span");
    	for ( j = 0; j < spans.length; ++j ) {
    		var s = spans[j];
    		if ( !s.offsetParent )
    			continue;
    		if ( !/\d+/.test(s.textContent) )
    			continue;
    		td.appendChild(createCell());
    	}
    }
}

