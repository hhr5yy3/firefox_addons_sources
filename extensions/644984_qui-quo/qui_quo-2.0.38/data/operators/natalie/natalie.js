var OPERATOR_NAME = "New Travelers";
var OPERATOR_SLETAT_ID = 269;

function getHotelRowByImage(img) {
    return document.querySelector("[action='/toursearchNew/']");
}

function getTable() {
    var th = document.querySelector("table>tbody>tr.fs-searchTableHeaderRow");
    return th == null ? null : th.parentElement.parentElement;
}


//-------- Search Criteria ---------------------------

function initializeSearchCriteria() {
	return null;
}

function getSearchButton() {
	return null;
}


function getCountry() {
    return selectedOption(document.querySelector("#hCntry"));
}

// --------- Rows ---------------------------------

function extractPrice(priceAndCurrency) {
    return parseInt(priceAndCurrency.match(/(\d+)/)[1], 10)
}

function extractNights(nightsAndDays) {
    var match = nightsAndDays.match(/(\d+)/);
    if ( match )
        return match[1];

    var min = getParamValue("durMin");
    var max = getParamValue("durMax");
    if ( min && max && min != max ) {
        throw "[natalie-tours] minNights != maxNights";
    }
    if ( min || max ) {
        return min ? min : max;
    }
    throw "[natalie-tours] minNights && maxNights is null";
}

function extractCurrency(priceAndCurrency) {
    return priceAndCurrency.match(/[\d\.,]+\s+(\w*)/)[1]
}

function findColumnByName(tr, colName) {
	colName = colName.toUpperCase();
	var tds = tr.querySelectorAll("td");
    for (var i = 0; i < tds.length; ++i) {
        if ( tds[i].textContent.toUpperCase().indexOf(colName) >= 0 ) {
            return i;
        }
    }
    return -1;
}

function getColumnIndex(colName) {
    if ( colName == null ) {
        return null;
    }
    
    var trs = getTable().querySelectorAll("table>tbody>tr");
    if (trs.length < 2 )
        return null;

    var i = findColumnByName(trs[0], colName);
    if ( i >= 0 ) 
        return i + trs[1].querySelectorAll("td").length - 1;

    i = findColumnByName(trs[1], colName);
    if ( i >= 0 )
        return i;

    return null;
}

function getParamValue(name) {
    if ( name == null ) {
        return null;
    }
    
    var m = location.search.match("[\\?&]" + name + "=([\\d\\.]+)");
    if ( m == null ) {
        return null;
    }
    return m[1];
}

function getOptionText(selectId, value) {    
    var s = document.getElementById(selectId);
    if ( s != null ) {
    	var opts = s.options;
    	if ( opts != null ) {
	        for (var i = 0; i < opts.length; ++i) {
	            if ( value == opts[i].value ) {
	                return opts[i].text;
	            }
	        }
    	} else {
    		var f = s.parentNode.querySelector(".fs-fix-value");
    		if ( f != null )
    			return f.textContent;
    	}
    }
    return null;
}

function extractValue(tds, colName, selectId) {
    var idx = getColumnIndex(colName);
    if ( idx != null ) {
        return tds[idx].textContent;
    }
    
    var value = getParamValue(selectId);
    if ( value != null ) {
        var text = getOptionText(selectId, value);
        if ( text != null ) {
            return text;
        }
    }
    return "";
}

function extractDate(tds) {
    var text = null;
    
    var idx = getColumnIndex("Дата предоставления");    
    if ( idx != null ) {
        text = tds[idx].textContent;
    } else {
        text = getParamValue("gD");
    }
        
    return text.match(/(\d+\.\d+\.\d+)/)[1]
}

function extractHref(tds) {
    var idx = getColumnIndex("Отель");    
    if ( idx != null ) {
        var anchor = tds[idx].querySelector("a");
        return anchor == null ? "" :  anchor.href;
    }
    return "";
}

function extractRegion(tds) {
    var cityId = getParamValue("hCty");
    if ( cityId != null ) {
        var cityName = getOptionText("hCty", cityId);
        if ( cityName != null ) {
            return extractValue(tds, "Регион", "hRgn") + ", " + cityName;
        }
    }

    var region = extractValue(tds, "Регион", "hRgn")
    return region ? region : extractValue(tds, "Описание, [город вылета]", "hRgn").replace(/,\s\[[^\]]+\]/, "");
}

function extractHotelName(tds) {
    var name = extractValue(tds, "Отель", "hHtl");
    var rating = extractValue(tds, null, "hCtgry");
    if ( rating != null && name.indexOf(rating) < 0 ) {
        return name + " " + rating;
    }
    return name;
}

function extractCity(tds) {
	var desc = extractValue(tds, "Описание", "depCtyId");
	if ( desc == null ) {
		return null;
	}
	var m = desc.match(/\[([^\]]+)\]/);
	return m ? m[1] : "";
}

function getOccupancy() {
	var occupancy = {
			adultsCount: (getParamValue("hAcA") ? extractIntFromStr(getParamValue("hAcA")) : 0),
			childrenCount: (getParamValue("hAcC") ? extractIntFromStr(getParamValue("hAcC")) : 0),
			childAges: null	
		};

	if ( occupancy.childrenCount > 0 ) {
    	var ages = [];
    	for ( var i=0; i<occupancy.childrenCount; ++i ) {
    		var age = getParamValue("hCa" + (i+1));
    		ages.push(age ? age : 2);
    	}
    	occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function createOption(img) {
    var tds = img.parentNode.parentNode.parentNode.querySelectorAll("td");

    var option = {
        region : extractRegion(tds),
        hotelName : extractHotelName(tds),
        roomType : extractValue(tds, "Тип номера", "hRmTp") + ", " + extractValue(tds, "Размещение", null),
        boardType : extractValue(tds, "Питание", "brd"),
        checkinDt : extractDate(tds),
        nights : extractNights(extractValue(tds, "ночей", "durMin")),
        price : extractPrice(extractValue(tds, "Стоимость", null)),
        currency : extractCurrency(extractValue(tds, "Стоимость", null)),
        href : extractHref(tds),
        country: getCountry(),
        city_from: extractCity(tds),
        occupancy: getOccupancy()
    }
    return option
}

function createCell() {
    var nobr = document.createElement("nobr")
    nobr.appendChild(createAddButton())    
    nobr.appendChild(createEditButton())   
    
    var newTd = document.createElement("td");
    newTd.className = "qq res_cell";
    newTd.appendChild(nobr)
    
    return newTd
}

    
function injectData() {
    var tbl = getTable()
    if ( tbl == null ) {
        return
    }
    
	if ( location.href.indexOf("/avia/") > 0 ) {
		return null;
	}

    var trs = tbl.querySelectorAll("table>tbody>tr");

    if ( trs.length > 0 && trs[0].querySelector("td.qq") == null) {
        var newTh = document.createElement("td");
        newTh.className = "qq res_cell"
        newTh.setAttribute("rowspan", "2");
        var newContent = document.createTextNode("QQ");
        newTh.appendChild(newContent);
        trs[0].appendChild(newTh);
    }

    for (var i = 2; i < trs.length; ++i) {  
        if ( trs[i].querySelector("td.qq") == null ) {
            trs[i].appendChild(createCell())
        }
    }
}
