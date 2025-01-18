var OPERATOR_NAME = "Sunmar";
var OPERATOR_SLETAT_ID = 54;

//-------- Search Criteria ---------------------------

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function selectOptionalInt(sel) {
    var s = document.querySelector(sel);
    return s ? extractOptionalInt( s.textContent ) : null;
}

function getOccupancy() {
    var occupancy = {
            adultsCount: selectOptionalInt("div#adult_chzn span"),
            childrenCount: selectOptionalInt("div#child_chzn span"),
            childAges: null 
        };

    if ( occupancy.adultsCount === null || occupancy.childrenCount === null )
        return null;

    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        for ( var i = 0; i < occupancy.childrenCount; ++i ) {
            var input = selectOptionalInt("div#child" + (i + 1) + "Age_chzn span");
            if ( input === null )
                return null;
            ages.push(input);
        }

        occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function initializeSearchCriteria() {    
    var country = getCountry();
    if ( !country )
        return null;
        
    var city = getCity();
    if ( !city ) {
    	return null;
    }

    return { country : country,
             city : city,
         	 occupancy: getOccupancy() };
}


function getCity() {
	var c = document.querySelector("#fromArea_chzn a span");
	return c == null ? null : c.textContent;
}

function getCountry() {
	var a = document.querySelector("#toCountry_chzn>a");
	if ( a == null ) { 
		return null;
	}

	var country = a.textContent.trim();
	switch (country) {
    	case "": return null;
    	case "Доминиканская Республика": return "Доминикана";
	}
	return country;
}

function getSearchButton() {
	return document.querySelector("#btn");
}


//--------- Rows ---------------------------------

function injectData() {
	var rows = document.querySelectorAll("div.___priceList");
	for (var i = 0; i < rows.length; ++i) {
		if ( rows[i].querySelector("div.qq") == null ) {
			addButtons(rows[i]);
		}
	}
}

function addButtons(row) {
	var hotel = row.querySelector("div.___hotelDetail");
	if ( hotel == null ) {
		return;
	}
	
	var name = hotel.querySelector("div.___hotelName");
	if ( name != null ) {
		name.setAttribute("style", "max-width: 420px");
	}
   
    hotel.appendChild(createButtons());
}

function createButtons() {
	var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());    
    
    var newDiv = document.createElement("div");
    newDiv.className = "qq";    
    newDiv.setAttribute("style", "float:right;margin:15px 30px 0 0");
    newDiv.appendChild(nobr);
    return newDiv;
}


//--------- Option ---------------------------------

function text(parent, selector) {
	var node = parent.querySelector(selector);
	if ( node != null && node.textContent != null) {
		return node.textContent;
	}
	return "";
}

function attr(node, name) {
	if ( node != null ) {
		var value = node.getAttribute(name);
		if ( value != null ) {
			return value;
		}
	}
	return "";
}

function mapCurrency(curr) {
	switch (curr.toLowerCase()) {
	case "рублей": return "RUB";
	default: return curr;
	}
}

function mapBoard(board) {
	switch (board.toLowerCase()) {
	case "only bed": return "RO";
	case "bed&breakfast": return "BB";
	case "half board": return "HB";
	case "full board": return "FB";
	case "all inclusive": return "AI";
	case "ultra all inclusive": return "UAI";
	default: return board;
	}
}

function getHotelRowByImage(img) {
	return img.parentNode.parentNode.parentNode.parentNode.parentNode;
}

function extractHref(row) {
	var a = row.querySelector(".___hotelName>a");
	return a && a.href ? a.href : "";
}

function createOption(img) {
	var row = getHotelRowByImage(img);
	
    return {
            region : text(row, ".___area"),
            hotelName : text(row, ".___hotelName") + " " + text(row, ".___hotelStar"),
            roomType : text(row, ".___room") + " / " + text(row, ".___acc"),
            boardType : mapBoard(text(row, ".___meal")),
            nights : text(row, ".___night").match(/(\d+)/)[1],
            checkinDt : dateFromDayAndMonthName(text(row, ".___day"), text(row, ".___month")),
            price : extractIntFromStr(text(row, ".___total").split(/\s+/).join("")),
            currency : mapCurrency(text(row, ".___currency")),
            href : extractHref(row),
            country: SEARCH_CRITERIA.country,
            city_from: SEARCH_CRITERIA.city,
        	occupancy : SEARCH_CRITERIA.occupancy,
        	thumbnail : getBackgroundImageUrl(row.querySelector(".___picMain"))
    	   };
}
