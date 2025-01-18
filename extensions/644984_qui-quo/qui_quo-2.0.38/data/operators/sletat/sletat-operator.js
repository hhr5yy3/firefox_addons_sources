var OPERATOR_NAME = "sletat.ru";
var showTopHotelsRating = true;
//-------- Search Criteria ---------------------------

function getCountry() {
	return selectedOption(document.querySelector("select[name=STATEINC]"));    
}

function getCity() {
	return location.href.indexOf("search_hotel") >= 0 ? "" :
		selectedOption(document.querySelector("select[name=TOWNFROMINC]"));
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function parseSelectedOption(sel) {
	return extractOptionalInt(selectedOption(document.querySelector(sel)));
}

function getOccupancy() {
    var occupancy = {
            adultsCount: parseSelectedOption("select[name=ADULT]"),
            childrenCount: parseSelectedOption("select[name=CHILD]"),
            childAges: null 
        };
    
    if ( occupancy.adultsCount === null || occupancy.childrenCount === null )
        return null;
    
    if ( occupancy.childrenCount > 0 ) {	
        var ages = [];
        for (var i = 1; i <= occupancy.childrenCount; i++) {
			var input = document.querySelector("#age_" + i)
			var age = input && extractOptionalInt(input.value);
			if ( age === null ) {
				return null;
			}
			ages.push(age);
		}
        occupancy.childAges = ages.join(",");
    }

    return occupancy;     
}

function initializeSearchCriteria() {    
    var country = getCountry();
    var city = getCity();
    if ( !country || city === null )
        return null;
    
    return { "country" : country,
             "city": city,
             "occupancy": getOccupancy()};
}

function getSearchButton() {
    return document.querySelector(".footer_search button");
}

//--------- Rows ---------------------------------

function getHeaderRow() {
	return document.querySelector("table.res thead tr");
}

function injectData() {
    if ( !SEARCH_CRITERIA ) {
        return;
    }
    
    var th = getHeaderRow();
    if ( th && !th.querySelector(".qq") ) {
    	addTableHeader(th);
    }
    
    var trs = document.querySelectorAll("table.res tbody tr");
    for (var i = 0; i < trs.length; i++) {
    	if ( !trs[i].querySelector(".qq") ) {
    		trs[i].appendChild(createCell());    		
    	}
	}
}

function addTableHeader(header) {
    var th = document.createElement("th");
    th.className = "uis-table__th qq";
    th.appendChild(document.createTextNode("QQ"));
    header.appendChild(th);
}

function createCell() {
    var td = document.createElement("td");
    td.className = "uis-table__td qq";
    td.appendChild(createAddButton());
    td.appendChild(createEditButton());
    return td;
}

var COL_HOTEL = [/гостиница/,/отель/];

function createOption(img) {
	var tr = getHotelRowByImage(img);
	var tds = getChildElementsByTagName(tr, "td");
	
    var hotel = col(tds, COL_HOTEL);
    var price = colText(tds, [/цена/]);
	
	var option = {
	        checkinDt : extractDate(colText(tds, [/заезд/, /дата/]))[1],
	        region : extractRegion(tds, hotel),
	        nights : extractNights(tds),
	        hotelName : extractHotelName(hotel),
	        boardType : extractBoardType(tds),
	        roomType : getRoomType(tds),
	        price : extractPrice(price),
	        currency : extractCurrency(price),
	        href : extractHotelUrl(hotel),
	        country : SEARCH_CRITERIA.country,
	        city_from : SEARCH_CRITERIA.city,
	        occupancy : SEARCH_CRITERIA.occupancy
	    };
	return option;
}

function extractDate(dateAndDoW) {
    return dateAndDoW.match(/(\d+\.\d+\.\d+)/)
}

var REGION_PATTERN = /^(.+?)\(([^()]+(?:\([^)]+\))?)\)\s*$/;

function extractRegion(tds, hotel) {
	var region = colText(tds, [/город/,/курорт/]);
	if ( region != null ) {
		return region;
	}
	
	var m = hotel.textContent.trim().match(REGION_PATTERN);
	if ( m != null ) {
		return m[2];
	}
	
   	var regionAndOffer = colText(tds, [/^тур$/, /тур\s+\/\s+тип\s+программы/]);

    var idx = regionAndOffer.indexOf("Раннее бронирование");
    if ( idx < 0 ) {
    	idx = regionAndOffer.indexOf("Early Booking");
    }
    if ( idx < 0 ) {
    	idx = regionAndOffer.indexOf("(СПО)");
    }
    return idx > 0 ? regionAndOffer.substring(0, idx-1) : regionAndOffer;   
}


function col(tds, aliases) {
	var ths = getChildElementsByTagName(getHeaderRow(), "th");
	for ( var i = 0; i < ths.length; i++) {
		if ( isMatched(ths[i].textContent, aliases) ) {
			return tds[i];
		}
		
		var img = ths[i].querySelector("img");
		if ( img != null && isMatched(img.alt, aliases) ) {
			return tds[i];
		}
	}	
	return null;
}

function isMatched(text, aliases) {
	if ( text == null ) {
		return null;
	}
	text = text.trim().toLowerCase();
	for ( var i = 0; i < aliases.length; i++) {
		if ( text.match(aliases[i]) ) {
			return true;
		}
	}	
	return false;
}

function extractNights(tds) {	
	return extractIntFromStr(colText(tds, [/ноч/, /ночей/])) + "";
}

function extractBoardType(tds) {
	var board = colText(tds, [/питание/, /meal/]);
	if ( !board )
		throw new Error("Не найдена информация про питание");
	return trim(board);
}

function extractPrice(priceAndCurrency) {
    return parseInt(priceAndCurrency.match(/(\d+)/)[1], 10)
}

function extractCurrency(priceAndCurrency) {
	var m = priceAndCurrency.match(/\d+\s+(.+)\s*/);
    return m ? m[1] : "";
}

function extractHotelName(td) {
    var anchor = td.querySelector("td>a");
    if ( anchor != null ) {
    	return anchor.textContent;
    }
    
	var m = td.textContent.trim().match(REGION_PATTERN);
	if ( m != null ) {
		return m[1];
	}
  
    return td.textContent;
}

function extractHotelUrl(td) {
    var anchor = td.querySelector("td>a")
    return anchor ? anchor.href : null
}

function getRoomType(tds) {
	var arr = [];
	var cols = [[/номер\s*\/\s*размещение/], [/^номер$/], [/^размещение$/]];
	for ( var i = 0; i < cols.length; i++) {
		var text = colText(tds, cols[i]);
		if ( text != null && text != "" ) {
			arr.push(text);
		}
	}
	return arr.join(" / ");
}

function colText(tds, aliases) {
	var td = col(tds, aliases);
	return td == null ? null : td.textContent.trim();
}

function getHotelRowByImage(img) {
	return img.parentNode.parentNode;
}
