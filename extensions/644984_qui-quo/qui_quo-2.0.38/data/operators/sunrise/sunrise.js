var OPERATOR_NAME = "Sunrise";
var OPERATOR_SLETAT_ID = 159;

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
    	case "1": return "Россия";
    	case "8": return "Турция";
    	case "237": return "Австрия";
    	case "249": return "Италия";
        case "298": return "Индия";
        case "591": return "Кипр";
        case "590": return "Греция";
        case "934": return "Таиланд";
        case "588": return "Куба";
    }

    setTimeout(function() {
        logError("unexpected country id", null, s.value + ", " + selectedOption(s));           
    }, 10);
    
    console.log("unexpected country id: " + s.value);
    return selectedOption(s);    
}

function getCity() {
	return selectedOption(document.getElementById("ddlSearchDeparture"));
}

function initializeSearchCriteria() {    
    var country = getCountry();
    if ( !country )
        return null;
        
    var city = getCity();
    if ( !city ) {
    	return null;
    }

    return { "country" : country,
             "city": city,};
}


function getSearchButton() {
    return document.querySelector("div#searchbutton4>input");
}


// --------- Rows ---------------------------------

function extractPrice(td) {
    var price = td.querySelector("div>a").textContent.trim();
    return parseInt(price.match(/(\d+)/)[1], 10);    
}

function extractCurrency(td) {
    var price = td.querySelector("div>a").textContent.trim();
    return price.match(/\d+,\d\d\s+(\w+)/)[1];
}

function extractDate(td) {
	return td.textContent.match(/(\d+\.\d+\.\d+)/)[1];
}

function extractHotelName(td) {
	var anchor = td.querySelector("td>div>div>a");
	if ( anchor != null )
		return anchor.textContent;
	return td.querySelector("td>div>div").firstChild.textContent;
}

function extractHotelUrl(td) {
    var anchor = td.querySelector("td>div>div>a")
	if ( anchor != null )
		return anchor.href
	return null
}

function extractBoardType(td) {
    return td.querySelector("div.smallText").textContent.trim()
}

function extractRegion(td) {
	return td.firstChild.textContent.trim() + ", " + td.querySelector("div").textContent.trim()
}

function extractRoomType(td) {
	return td.querySelector("div").firstChild.textContent.trim() + ", " + td.querySelector("div.smallText").textContent.trim()
}

function extractNights(td) {
    return td.firstChild.textContent.trim().match(/(\d+)/)[1]
}

function createOption(img) {
    var tds = img.parentNode.parentNode.parentNode.querySelectorAll("td");

    var option = {
        checkinDt : extractDate(tds[0]),
        hotelName : extractHotelName(tds[4]),
        href : extractHotelUrl(tds[4]),
        region : extractRegion(tds[2]),
        roomType: extractRoomType(tds[5]),
        boardType : extractBoardType(tds[4]),
        price : extractPrice(tds[7]),
        currency : extractCurrency(tds[7]),
        nights : extractNights(tds[1]),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
    }

    return option
}

function createCell() {
    var nobr = document.createElement("nobr")
    nobr.appendChild(createAddButton())    
    nobr.appendChild(createEditButton())
    
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

    for (var i = 2; i < trs.length; ++i) {  
        if ( trs[i].querySelector("td.qq") == null ) {
            trs[i].appendChild(createCell())
        }
    }
}

