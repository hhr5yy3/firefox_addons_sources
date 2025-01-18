var OPERATOR_NAME = "First Travel Service";

// -------- Search Criteria ---------------------------

function getCountry() {
    var s = document.getElementById("ctl00_ContentPlaceHolder1_ddUlke");
    if ( s == null ) {
        console.log("country selector is not found");
        return null;
    }
    
    var c = selectedOption(s);
    if ( s.value == null ) {
        console.log("country is not selected");
        return null;
    }
    
    switch (c) {
    	case "Turkey": return "Турция";
    }
    
    console.log("unexpected country id: " + c);
    return c;    
}

function getOccupancy() {
    var occupancy = {
            adultsCount: extractIntFromStr(selectedOption(document.getElementById("ctl00_ContentPlaceHolder1_ddAdl"))),
            childrenCount: extractIntFromStr(selectedOption(document.getElementById("ctl00_ContentPlaceHolder1_ddChd"))),
            childAges: null 
        };

    if ( occupancy.adultsCount === null || occupancy.childrenCount === null )
        return null;

    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        for ( var i = 0; i < occupancy.childrenCount; ++i ) {
            ages.push(extractIntFromStr(selectedOption(document.getElementById("ctl00_ContentPlaceHolder1_ddAge" + (i + 1)))));
        }

        occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function getRegion() {
    var s = document.getElementById("ctl00_ContentPlaceHolder1_ddSehir");
    if ( s == null ) {
        console.log("region selector is not found");
        return "";
    }
    
    var c = selectedOption(s);
    if ( s.value == null ) {
        console.log("region is not selected");
        return null;
    }
    
    switch (c) {
    	case "Afyon": return "Афьон";
    	case "Antalya": return "Анталия";
    	case "Bodrum": return "Бодрум";
    	case "Istanbul": return "Стамбул";
    	case "Mugla": return "Мугла";
    	case "Все": return "";
    }
    
    console.log("unexpected region: " + c);
    return c;    
}

function initializeSearchCriteria() {    
    var country = getCountry();
    if ( !country )
        return null;
        
    return { country : country,
    		 region : getRegion(),
             occupancy : getOccupancy() };
}


function getSearchButton() {
    return document.querySelector("#ctl00_ContentPlaceHolder1_btnAra");
}


// --------- Rows ---------------------------------

function extractDate() {
	var el = document.getElementById("ctl00_ContentPlaceHolder1_lblGridTitle");
	var checkinDtStr = el.textContent.match(/(.+)\s-\s(.+)/)[1];
	var m = checkinDtStr.match(/(\d+)\s(\S{3})\S+\s(\d+)/);
	return dateFromDayAndMonthName(m[1], m[2], m[3]);
}

function extractNights() {
	function getDt(s) {
		var m = s.match(/(\d+)\s(\S{3})\S+\s(\d+)/);
		return new Date(extractIntFromStr(m[3]), monthNameToNumber(m[2]) - 1, extractIntFromStr(m[1]));
	}
	
	var el = document.getElementById("ctl00_ContentPlaceHolder1_lblGridTitle");
	var m = el.textContent.match(/(.+)\s-\s(.+)/);
	var checkinDt = getDt(m[1]);
	var checkoutDt = getDt(m[2]);
	return getDistance(checkinDt, checkoutDt).toString();
}

function extractPrice(td) {
    var price = td.textContent.trim();
    return extractIntFromStr(price.match(/\d+/)[0]);    
}

function extractCurrency(td) {
    var price = td.textContent.trim();
    return price.match(/\d+\s+(\w+)/)[1];
}

function extractHotelName(tdName, tdRating) {
	return tdName.textContent.trim() + " " + tdRating.textContent.trim();
}

function extractBoardType(td) {
    return td.textContent.trim();
}

function extractRoomType(td1, td2) {
    return td1.textContent.trim() + " / " + td2.textContent.trim();
}

function createOption(img) {
    var tds = img.parentNode.parentNode.parentNode.querySelectorAll("td");

    var option = {
        checkinDt : extractDate(),
        hotelName : extractHotelName(tds[1], tds[2]),
        href : "",
        region : SEARCH_CRITERIA.region,
        roomType: extractRoomType(tds[4], tds[5]),
        boardType : extractBoardType(tds[3]),
        price : extractPrice(tds[7]),
        currency : extractCurrency(tds[7]),
        nights : extractNights(),
        country: SEARCH_CRITERIA.country,
        city_from: "",
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
    newTd.appendChild(nobr)
    
    return newTd
}

function injectData() {
    var trs = document.querySelectorAll("#ctl00_ContentPlaceHolder1_GridView1 > tbody > tr:not(.pgr)");

    if ( trs.length > 0 && trs[0].querySelector("th.qq") == null) {    
        var newTh = document.createElement("th");
        newTh.className = "qq"
        var newContent = document.createTextNode("QQ");
        newTh.appendChild(newContent);
        trs[0].appendChild(newTh);
    }

    for ( var i = 1; i < trs.length; ++i ) {  
        if ( trs[i].querySelector("td.qq") == null ) {
            trs[i].appendChild(createCell());
        }
    }
}

