var OPERATOR_NAME = "Anex";

function getDoc() {
    var frame = document.querySelector("iframe[src*='anexshop']");
    return frame ? frame.contentWindow.document : document;
}

function getTable() {
    return getDoc().querySelector("table.result");
}

function getCountry() {
	var c = selectedOption(getDoc().querySelector("select#STATEINC"));
    return c ? mapCountry(c) : null;
}

function getCity() {
	return selectedOption(getDoc().querySelector("select#TOWNFROMINC"));
}

function getHeaderRow() {
    var tbl = getTable()
    return tbl ? tbl.querySelector("tbody>tr.table_head") : null
}

function col(tds, aliases) {
	var ths = getChildElementsByTagName(getHeaderRow(), "td");
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

function cutStars(text) {
    return text.replace(/[*]+/, "*").replace(/\s/g, "");
}

function getStars(fullElem) {
    var starsSpan = fullElem.querySelector("div.samo_star_category span");
    var spanTitle = starsSpan.getAttribute("title");
    
    return spanTitle ? cutStars(spanTitle) : cutStars(starsSpan.textContent);
}

function extractHotelName(td, stars) {
    var anchor = td.querySelector("td>a");
    if ( anchor != null ) {
        return anchor.textContent + stars;
    }
    
    var m = td.textContent.match(REGION_PATTERN);
    if ( m != null ) {
        return m[1] + stars;
    }
  
    return td.textContent + stars;
}

function getTdsAndStars(img) {
    var fullElem;
    if ( /show_hide_full_result/i.test(img.parentNode.parentNode.parentNode.parentNode.className) ) {
        var fullElem = img.parentNode.parentNode.parentNode.parentNode.nextSibling;
        while ( !/show_hide_short_result/i.test(fullElem.className) ) {
            fullElem = fullElem.nextSibling;
        }
        return [getChildElementsByTagName(fullElem, "td"), img.parentNode.parentNode.parentNode.parentNode];
    } else {
        fullElem = img.parentNode.parentNode.parentNode;
        while ( !/show_hide_full_result/i.test(fullElem.className) ) {
            fullElem = fullElem.previousSibling;
        }
        return [getChildElementsByTagName(img.parentNode.parentNode.parentNode, "td"), fullElem];
    }
}

function createOption(img) {
    var tas = getTdsAndStars(img);
	var tds = tas[0];

    var hotel = col(tds, COL_HOTEL);
    var price = colText(tds, [/цена/, /стоимость/]);

    var option = {
        checkinDt : extractDate(colText(tds, [/заезд/, /дата/, /вылет/]))[1],
        region : extractRegion(tds, hotel),
        nights : extractNights(tds),
        hotelName : trim(extractHotelName(hotel, getStars(tas[1]))),
        boardType : colText(tds, [/питание/]),
        roomType : getRoomType(tds),
        price : extractPrice(price),
        currency : extractCurrency(price),
        href : extractHotelUrl(hotel),
        country : SEARCH_CRITERIA.country,
        city_from : SEARCH_CRITERIA.city_from,
    };

    return option;
}

function injectData() {
    newInjectData();

	injectTitle();
	makeTableWider();
	
    var tbl = getTable();
    if ( tbl == null )
        return;
        
    var trs = getDoc().querySelectorAll("table.result>tbody>tr");
    for (var i = 0; i < trs.length; ++i) {
    	
    	// special check to hide buttons inside hidden area
    	var tdDate = trs[i].querySelector("td");
    	if ( tdDate != null && extractDate(tdDate.textContent) == null ) {
    		continue;
    	}
    	
        if ( trs[i].querySelector("td.qq") == null ){
            trs[i].appendChild(createCell())}
    }
}

function createButtons() {
    var nobr = getDoc().createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());

    var div = getDoc().createElement("div");
    div.className = "qq";
    div.setAttribute("style", "padding-bottom: 14px");
    div.appendChild(nobr);

    return div;
}

function newInjectData() {
    var trs = getDoc().querySelectorAll("table.result>tbody>tr.show_hide_full_result");
    for (var i = 0; i < trs.length; ++i) {
    	
    	var tds = getChildElementsByTagName(trs[i], "td");
    	
        if ( trs[i].querySelector("div.qq") == null && tds.length > 5 )
            tds[5].insertBefore(createButtons(), tds[5].querySelector(".samo_bron"));
    }
}