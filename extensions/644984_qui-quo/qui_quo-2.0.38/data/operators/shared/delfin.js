function getDoc() {
    var frame = document.querySelector("iframe[src*='delfin-tour']");
    return frame ? frame.contentWindow.document : document;
}


function getTable() {
    var table = getDoc().querySelector("table#SearchRes");
    return table;
}


//-------- Search Criteria ---------------------------

function getCountry() {
    var s = getDoc().querySelector(".search-country");
    if ( s == null ) {
        console.log("country selector is not found");
        return null;
    }
    
    if ( s.value == null ) {
        console.log("country is not selected");
        return null;
    }
    
    switch (s.value) {
	    case "3229": return "Абхазия";
	    case "3256": return "Азербайджан";
	    case "3259": return "Армения";
	    case "3239": return "Беларусь";
	    case "3240": return "Россия";
	    case "3224": return "";
	    case "1006": return "";
	    case "1004": return "Россия";
	    case "20": return "Россия";
	    case "999": return "Россия";
	    case "1": return "Россия";
	    case "3252": return "Киргизия";
	    case "1003": return "Россия";
	    case "3221": return "Россия";
	    case "3248": return "Латвия";
	    case "3250": return "Литва";
	    case "1001": return "Россия";
	    case "95": return "Россия";
	    case "3235": return "Россия";
	    case "1002": return "Россия";
	    case "5": return "Украина";
	    case "3249": return "Эстония";
	}

	console.log("unexpected country id: " + s.value);
	return selectedOption(s);
}

function initializeSearchCriteria() {
	var country = getCountry();
	if ( !country )
		return null;
	 
	return { "country" : country };
}

function getSearchButton() {
    return getDoc().querySelector('input[value="Искать"]');
}


// --------- Rows ---------------------------------

function extractPrice(tds) {
    return parseInt(tds[7].textContent.match(/(\d+)/)[1]);
}

function extractNights(tds) {
    var nts = tds[6].textContent.match(/(\d+)/);
    if ( nts )
    	return nts[1];
    else
    	return 1;
}

function extractHref(tds) {
	var anchor = tds[2].querySelector("a");
	return anchor == null ? "" :  anchor.href;
}

function extractRegion(tds) {
	return tds[1].textContent.trim();
}

function extractHotelName(tds) {
	return tds[2].textContent.trim();
}

function extractRoomType(tds) {
    var result = [];
    result.push(tds[3].textContent.trim());
    var a = tds[4].querySelectorAll("span[class*=A]");
    var b = tds[4].querySelectorAll("span[class*=B]");
    result.push(a.length + "+" + b.length);

	return result.join(", ");
}

function createOption(img) {
    var tds = img.parentNode.parentNode.parentNode.querySelectorAll("td");

    var option = {
        region : extractRegion(tds),
        hotelName : extractHotelName(tds),
        roomType : extractRoomType(tds),
        boardType : tds[5].textContent.trim(),
        checkinDt : tds[0].textContent.trim(),
        nights : extractNights(tds),
        price : extractPrice(tds),
        currency : "RUB",
        href : extractHref(tds),
        country: SEARCH_CRITERIA ?  SEARCH_CRITERIA.country : "",
        city_from: ""
    };

    return option;
}

function createCell() {
    var nobr = getDoc().createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());
    
    var newTd = getDoc().createElement("td");
    newTd.className = "qq";
    newTd.appendChild(nobr);
    
    return newTd;
}


function injectData() {
    var tbl = getTable();
    if ( tbl == null ) {
        return;
    }

    var header = getDoc().querySelector('table#SearchRes thead tr');

    if ( header && header.querySelector("th.qq") == null && getChildElementsByTagName(header, "th").length > 7) {
        var newTh = getDoc().createElement("th");
        newTh.className = "qq";
        newTh.setAttribute("style", "background-image:none;padding-right:5px");
        var newContent = getDoc().createTextNode("QQ");
        newTh.appendChild(newContent);
        header.appendChild(newTh);
    }

    var trs = getDoc().querySelectorAll('table#SearchRes tr[class*="row"]');

    for (var i = 0; i < trs.length; ++i) {
        if ( trs[i].querySelector("td.qq") == null && getChildElementsByTagName(trs[i], "td").length > 7 ) {
            trs[i].appendChild(createCell())
        }
    }
}
