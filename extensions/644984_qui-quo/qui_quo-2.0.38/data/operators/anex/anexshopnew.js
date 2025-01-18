var OPERATOR_NAME = "Anex";
var OPERATOR_SLETAT_ID = 19;

//-------- Search Criteria ---------------------------

function getCountry() {
    return selectedOption(document.querySelector("select#ddlCountries"));
}

function getCity() {
    return selectedOption(document.querySelector("select#ddlDepCities"));
}

function getOccupancy() {
    var occupancy = {
            adultsCount: 0,
            childrenCount: 0,
            childAges: null 
        };
    
    var s = document.querySelector("select#ddlAdults");
    if ( !s )
        return null;
    occupancy.adultsCount = extractIntFromStr(selectedOption(s));
    
    s = document.querySelector("select#ddlChilds");
    if ( !s )
        return null;
    occupancy.childrenCount = extractIntFromStr(selectedOption(s));

    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        
        for ( var i = 0; i < occupancy.childrenCount; ++i ) {
            var input = document.querySelector("select#ddlChildAge" + (i+1));
            input = input.options[input.selectedIndex] ? input.options[input.selectedIndex].text : "1";
            ages.push(input);
        }

        occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function initializeSearchCriteria() {
    var country = getCountry();
    var city = getCity();
    var occupancy = getOccupancy();
    if ( !country || !city || !occupancy ) {
        return null;
    }
    return {
        country: country,
        city: city,
        occupancy: occupancy
    }
}

function getSearchButton() {
    return [document.querySelector("a#lnkSearch"), document.querySelector("div.ax-b2c-select")];
}

// --------- Rows ---------------------------------

function mapCurrency(s) {
    var c = trim(s).toUpperCase();
    switch (c) {
        case "DOLLAR": return "USD";
    }

    return c;
}

function extractDate(tr) {
    return tr.querySelector("td span").textContent;
}

function extractHotelName(element) {
    var hotelDiv = element.querySelector("div.searchResult-hotelname");
    var hotelStars = hotelDiv.querySelector("i").className.match(/star(\d)/i)
    return hotelDiv.textContent.trim() + (hotelStars ? " " + hotelStars[1] + "*" : "");
}

function extractHotelUrl(element) {
    var a = element.querySelector("div.searchResult-hotelname a");
    return a ? a.href : "";
}

function extractRegion(element) {
    return element.querySelector("div.searchResult-destination").textContent.replace(new RegExp(SEARCH_CRITERIA.country + ",", "i"), "");
}

function extractRoomType(trs) {
    var r = trim(trs[1].querySelector("td").textContent.match(/НОМЕР:\s*(.*)/i)[1]);
    var pA = trim(trs[2].querySelectorAll("td")[1].textContent);
    var pC = trim(trs[3].querySelectorAll("td")[1].textContent);
    return r + " / " + pA + (parseInt(pC.replace(/[^\d]/, "")) > 0 ? ", " + pC : "");
}

function extractPrice(element) {
    return extractIntFromStr(element.querySelector("p").textContent.replace(/[^\d]/g, ""));
}

function extractCurrency(element) {
    return mapCurrency(element.querySelector("span").className.match(/fa-(\S*)/i)[1]);
}

function extractNights(tr) {
    return tr.querySelectorAll("td")[1].textContent.replace(/[^\d]/g, "");
}

function extractBoardType(tr) {
    return tr.querySelector("td").textContent.match(/ПИТАНИЕ:\s*(.*)/i)[1];
}

function createOption(img) {
    var currentDiv = img.parentNode.parentNode.parentNode;
    var trs = currentDiv.querySelectorAll("table tbody tr");
    var pac = currentDiv.querySelector("div.searchResult-price");

    var option = {
        checkinDt : extractDate( trs[3] ),
        hotelName : extractHotelName(currentDiv),
        href : extractHotelUrl(currentDiv),
        region : extractRegion(currentDiv),
        roomType: extractRoomType( trs ),
        boardType : extractBoardType( trs[2] ),
        price : extractPrice( pac ),
        currency : extractCurrency( pac ),
        nights : extractNights( trs[2] ),
        country : SEARCH_CRITERIA.country,
        city_from : SEARCH_CRITERIA.city,
        occupancy : SEARCH_CRITERIA.occupancy,
        thumbnail : extractThumbnail(currentDiv)
    };

    return option;
}

function extractThumbnail(div) {
	var img = div.querySelector(".search-thumb");
	return img && img.src ? img.src : null;
}

function createCell(rowspan) {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());
    nobr.className = "qq";
    nobr.setAttribute("style", "position: relative; left: 35%; top: 3px;");
    
    return nobr;
}

function injectData() {
    var priceDivs = document.querySelectorAll("div.ax-b2c-searchResult > div.ax-b2c-searchResult-list > div.searchResult-item > div.searchResult-price");

    for (var i = 0; i < priceDivs.length; i++) {
        if ( !priceDivs[i].querySelector("nobr.qq") ) {
            priceDivs[i].appendChild(createCell());
        }
    };
    
}

