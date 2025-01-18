var OPERATOR_NAME = "Меридиан";

// -------- Find Action ---------------------------

function getCountry() {
	var c = selectedOption(document.getElementById("tour-country"));
	return c == "Тайланд" ? "Таиланд" : c;
}

function getCity() {
	return selectedOption(document.querySelector("#arr_town"));
}


function getCurrency() {
    var s = document.querySelector("select[name='type_of_money']");
    if ( s == null ) {
        console.log("currency selector is not found");
        return null;
    }
    
    if ( s.value == null ) {
        console.log("currency is not selected");
        return null;
    }
    
    switch (s.value) {
        case "rur": return "RUB";
        case "usd": return "USD";
        case "eur": return "EUR";
    }
    
    console.log("unexpected currency id: " + s.value);
    return selectedOption(s);
}



function initializeSearchCriteria() {    
    var country = getCountry();
    if ( !country )
        return null;
        
    var currency = getCurrency();
    if ( !currency )
        return null;

    var city = getCity();
    if ( !city )
        return null;

    return { "country" : country,
    		 "city" : city,
             "currency" : currency };
}


function getSearchButton() {
    return document.querySelector(".submit_button_width");
}

// --------- Rows ---------------------------------

function extractPrice(price) {
	return parseInt(price.split(/\s+/).join(""), 10);
}

function extractDate(s) {    
    var re = s.match(/(\d+)-(\d+)-(\d+)/);
    return re[3] + "." + re[2] + "." + re[1];
}

function extractHotelName(td) {
	var h = td.textContent;
	var i = h.indexOf("Состав тура");
	return i > 0 ? h.substring(0, i) : h;
}

function createOption(img) {
	var tr = img.parentNode.parentNode.parentNode;
    var tds = tr.querySelectorAll("td");
    
    var option = {
        checkinDt : extractDate(tds[0].textContent),
        nights : tds[1].textContent,
        region : tds[2].textContent.replace(/\(БЕЗ\s[АВИА]?ПЕРЕЛЕТА\)/i, ""),
        boardType : tds[5].textContent,
        href : "",
        currency : getCurrency(),
        country: getCountry(),
        roomType: tds[4].textContent,
        hotelName : extractHotelName(tds[3]),
        price : extractPrice(tds[6].textContent),
        city_from: tds[2].textContent.match(/БЕЗ\s[АВИА]?ПЕРЕЛЕТА/i) ? "" : SEARCH_CRITERIA.city,
    }        

    return option

}

function createCell() {
    var nobr = document.createElement("nobr")
    nobr.appendChild(createAddButton())    
    nobr.appendChild(createEditButton())   
    
    var newTd = document.createElement("td");
    newTd.className = "qq text_center"
    newTd.appendChild(nobr)
    
    return newTd
}
    
function injectData() {
    var trs = document.querySelectorAll(".table_summary > tbody > tr");

    if ( trs.length > 0 && trs[0].querySelector("td.qq") == null) {
        var newTh = document.createElement("td");
        newTh.className = "qq text_center"
        var newContent = document.createTextNode("QQ");
        newTh.appendChild(newContent);
        trs[0].appendChild(newTh);
    }

    for (var i = 1; i < trs.length; ++i) {  
        if ( trs[i].querySelector("td.qq") == null ) {
            trs[i].appendChild(createCell())
        }
    }
}
