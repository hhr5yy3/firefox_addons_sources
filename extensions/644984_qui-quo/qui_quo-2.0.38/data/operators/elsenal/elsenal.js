var OPERATOR_NAME = "Elsenal Travel";

// -------- Search Criteria ---------------------------

function getCountry() {
    var s = document.getElementById("ddlSearchCountry");
    if ( s == null ) {
        console.log("country selector is not found");
        return null;
    }
    
    if ( s.value == null ) {
        console.log("country is not selected");
        return null;
    }
    
    switch (s.value) {
    	case "3": return "Турция";
    }
    
    console.log("unexpected country id: " + s.value);

    var idx = s.options.selectedIndex;
    if ( idx >= 0 ) {
    	return s.options[idx].text;
    }

    return null;    
}

function getCity() {
	return selectedOption(document.getElementById("ddlSearchDeparture"));
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function selectOptionalInt(sel) {
    var s = document.querySelector(sel);
    return s ? extractOptionalInt( s.tagName == "INPUT" ? s.value : selectedOption(s) ) : null;
}

function getOccupancy() {
    var occupancy = {
            adultsCount: selectOptionalInt("select#ddlSearchAdult"),
            childrenCount: selectOptionalInt("select#ddlSearchChild"),
            childAges: null 
        };

    if ( occupancy.adultsCount === null || occupancy.childrenCount === null )
        return null;

    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        for ( var i = 0; i < occupancy.childrenCount; ++i ) {
            var input = selectOptionalInt("input#txtChdAge" + (i + 1));
            if ( input === null )
                continue;
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
             occupancy : getOccupancy() };
}


function getSearchButton() {
    return document.querySelector("div#searchbutton4>input");
}


// --------- Rows ---------------------------------
function insertBeforeDiv(td, text) {
    var divs = td.querySelectorAll("div")
    for (var i = 0; i < divs.length; ++i) {  
        divs[i].parentNode.insertBefore(document.createTextNode(text), divs[i])        
    }
}

function extractDate(td) {
    var date = td.textContent.match(/(\d+)\s(\S+)/);
    return dateFromDayAndMonthName(date[1], date[2]);
}

function extractPrice(td) {
    var price = td.textContent.trim();
    return extractIntFromStr(price.match(/\d+/)[0]);    
}

function extractCurrency(td) {
    var price = td.textContent.trim();
    return price.match(/\d+,\d\d\s+(\w+)/)[1];
}

function extractHotelName(td) {
	return td.textContent.trim().split(/\n/)[0] + "*";
}

function extractHotelUrl(td) {
    var anchor = td.querySelector("a")
	if ( anchor != null )
		return anchor.href;
	return "";
}

function extractBoardType(td) {
    return td.querySelector("div > div").textContent.trim();
}

function extractRegion(td) {
	return td.firstChild.textContent.trim() + ", " + td.querySelector("div").textContent.trim()
}

function extractRoomType(td) {
    var room = td.textContent.trim().split(/\n/);
	return room[0] + ( room.length > 1 ? " / " + room[1] : "" );
}

function extractNights(td) {
    return td.firstChild.textContent.trim().match(/(\d+)/)[1];
}

function createOption(img) {
    var tds = img.parentNode.parentNode.parentNode.querySelectorAll("td");

    var option = {
        checkinDt : extractDate(tds[1]),
        hotelName : extractHotelName(tds[4]),
        href : extractHotelUrl(tds[4]),
        region : extractRegion(tds[3]),
        roomType: extractRoomType(tds[6]),
        boardType : extractBoardType(tds[4]),
        price : extractPrice(tds[8]),
        currency : extractCurrency(tds[8]),
        nights : extractNights(tds[2]),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        occupancy : SEARCH_CRITERIA.occupancy
    };

    return option
}

function createCell() {
    var nobr = document.createElement("nobr")
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());
    
    var newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.setAttribute("align", "center");
    newTd.appendChild(nobr)
    
    return newTd
}

function createEmptyCell() {
    var nobr = document.createElement("nobr")
    var newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.setAttribute("align", "center");
    newTd.appendChild(nobr)
    
    return newTd
}
    
function injectData() {
    var trs = document.querySelectorAll("table.results>tbody>tr");

    if ( trs.length > 0 && trs[0].querySelector("th.qq") == null) {    
        var newTh = document.createElement("th");
        newTh.className = "qq"
        var newContent = document.createTextNode("QQ");
        newTh.appendChild(newContent);
        newTh.setAttribute("rowspan", "2");
        trs[0].appendChild(newTh);
    }

    for ( var i = 2; i < trs.length; ++i ) {  
        if ( trs[i].querySelector("td.qq") == null ) {
            var tds = trs[i].querySelectorAll("td");
            insertBeforeDiv(tds[1], "\n");
            if ( !/\d+,\d\d\s+(\w+)/.test(tds[8].textContent) ) {
                trs[i].appendChild(createEmptyCell());
                continue;
            }
            trs[i].appendChild(createCell());
        }
    }
}

