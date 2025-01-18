var OPERATOR_NAME = "Echip-99";

// -------- Search Criteria ---------------------------

function getCountry() {
	return selectedOption(document.querySelector("#country"));
}

function getOccupancy() {
	var occupancy = {
			adultsCount: 0,
			childrenCount: 0,
			childAges: null	
		};
	
    var s = document.querySelector("select#adult");
    if ( !s )
    	return null;
    occupancy.adultsCount = extractIntFromStr(selectedOption(s));
    
    s = document.querySelector("select#chd");
    if ( !s )
    	return null;
    occupancy.childrenCount = extractIntFromStr(selectedOption(s));
    
    if ( occupancy.childrenCount > 0 ) {
    	var ages = [];
    	
    	for ( var i = 0; i < occupancy.childrenCount; ++i ) {
    		var o = selectedOption(document.querySelector("select#chd" + (i+1)));
    		if ( o ) {
    			if ( o === "<1" )
    				ages.push(0);
    			else
    				ages.push(extractIntFromStr(o));
    		} else {
    			ages.push("9");
    		}
    	}

    	occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function initializeSearchCriteria() {
	var country = getCountry();
	var occupancy = getOccupancy();

	if ( !country || !occupancy) {
		return null;
	}

	return { country: country, occupancy : occupancy };
}

function getSearchButton() {
	return document.querySelector("div.div_search_button > button");
}

//--------- Rows ---------------------------------

function injectData() {
	var tbl = document.querySelector("table#resulttable");
	if ( tbl == null ) {
		return;
	}
	
	var thead = tbl.querySelector("tr.result_head");
	if ( thead != null && thead.querySelector("th.qq") == null ) {
	    var th = document.createElement("th");
	    th.className = "result_head_item qq";
	    th.appendChild(document.createTextNode("QQ"));    
		thead.appendChild(th);
	}

	var trs = tbl.querySelectorAll("tr.result_row");
    for (var i = 0; i < trs.length; ++i) {  
        if ( trs[i].querySelector("td.qq") == null ) {
            var nobr = document.createElement("nobr");
            nobr.appendChild(createAddButton());    
            nobr.appendChild(createEditButton());   
            
            var td = document.createElement("td");
            td.className = "result_item qq";
            td.appendChild(nobr);    
            
            trs[i].appendChild(td);
        }
    }	
}

//--------- Option ---------------------------------

function getCity(td) {
	var div = td.querySelector("div");
	if ( div ) {
		var m = div.textContent.match(/(\w\w\w)-\w\w\w/);
		return m ? m[1] : "";
	} else {
		return "";
	}
	
}

function extractHotelUrl(td) {
    var anchor = td.querySelector("a");
    return anchor == null ? "" :  anchor.href;
}

function extractCurrency(td) {
	var m  = td.textContent.match(/[^\d]+/);
	return trim(m[0]).toUpperCase();
}

function extractPrice(td) {
	return extractIntFromStr(td.textContent);
}

function extractCheckinDate(td) {
	var m = td.textContent.match(/(\d\d)\.(\d\d)/);
	return appendYear(extractIntFromStr(m[1]), extractIntFromStr(m[2]));
}

function createOption(img) {
	var tds = getChildElementsByTagName(img.parentNode.parentNode.parentNode, "td");
	
    var option = {
        hotelName : tds[4].textContent,
        href : extractHotelUrl(tds[4]),
        region : tds[3].textContent,
        roomType: trim(tds[6].textContent) + ", " + trim(tds[7].textContent),
        checkinDt : extractCheckinDate(tds[0]),
        nights : trim(tds[2].textContent),
        boardType : trim(tds[5].textContent),
        price : extractPrice(tds[9]),
        currency : extractCurrency(tds[9]),
        country: SEARCH_CRITERIA.country,
        city_from: getCity(tds[0]),
        occupancy: SEARCH_CRITERIA.occupancy
    };

    return option;
}
