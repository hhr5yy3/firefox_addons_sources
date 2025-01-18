var OPERATOR_NAME = window.location.hostname;
//-------- Search Criteria ---------------------------

function getDoc(form = "searchFrame") {
    var frames = querySelectorAll(document, "iframe");
    var collectedFrames = {};
    collectedFrames["searchFrame"] = frames.find(frame => {
        return frame.contentDocument && frame.contentDocument.querySelector(".search-form");
    });
    collectedFrames["resultFrames"] = frames.find(frame => {
        return frame.contentDocument && frame.contentDocument.querySelector(".search-results");
    });
    if ( frames.length === 0 ) {
        return document.querySelector(".lstcjs_module_container") ? document : null;
    }
    return collectedFrames[form] ? collectedFrames[form].contentDocument : document;
}

function getCountry(doc) {
    var s = doc.querySelector("div[data-scrap-filter-name='country']");
    if ( !s ) {
        return null;
    }
    if ( !s.querySelector("select") ) {
        return s.querySelector("input").value;
    }
    return selectedOption(s.querySelector("select"));
}

function getCity(doc) {
    var city = doc.querySelector("div[data-scrap-filter-name='city']");
    if ( !city ) {
        return null;
    }
    if ( !city.querySelector("select") ) {
        return city.querySelector("input").value;
    }
    return selectedOption(city.querySelector("select"));
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function parseSelectedOption(sel,doc) {
	return extractOptionalInt(selectedOption(doc.querySelector(sel)));
}

function getOccupancy(doc) {
    var occupancy = {
            adultsCount: parseSelectedOption("select[name=tc_adults]",doc),
            childrenCount: parseSelectedOption("select[name=tc_children]",doc),
            childAges: null 
        };
    
    if ( occupancy.adultsCount === null || occupancy.childrenCount === null )
        return null;
    
    if ( occupancy.childrenCount > 0 ) {	
        var ages = [];
        for (var i = 0; i < occupancy.childrenCount; i++) {
			var age = parseSelectedOption(".child-" + i + "-select",doc);
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
	var doc = getDoc("searchFrame");
	if ( !doc ) {
		return null;
	}
	var country = getCountry(doc);
    var city = getCity(doc);
    if ( !country || !city ) {
        return null;
    }
    return { "country" : country,
             "city": city,
             "occupancy": getOccupancy(doc)};
}

function getSearchButton() {
    var doc = getDoc("searchFrame");
	return doc ? doc.querySelector(".tc-go-search") : null;
}

//--------- Rows ---------------------------------

function injectData() {
    var doc = getDoc("resultFrames");
    if (!doc || !SEARCH_CRITERIA) {
    	return null;
    }
    injectStyleSheet(doc);
    var trs = doc.querySelectorAll(".search-results tr .search-results-main-td:last-child, .search-results-tr .search-results-main-td:last-child");
    for (var i = 0; i < trs.length; i++) {
    	if ( !trs[i].querySelector(".qq") ) {
    		trs[i].appendChild(createCell("div", "margin-top:5px", false,doc));    		
    	}
	}  
    
    trs = doc.querySelectorAll(".search-results-seemore-table tr, .search-results-more-table tr");
    for (var i = 0; i < trs.length; i++) {
    	if ( !trs[i].querySelector(".qq") ) {
    		trs[i].appendChild(createCell("td", "", true,doc));    		
    	}
	}
}

function createCell(type, style, more, doc) {
    var div = doc.createElement(type);
    var qq = qqBtns({align: "horizontal"});
    div.setAttribute("style", style);
    if ( qq.querySelector(".qq-rating-btn.qq-off") ) {
         div.style.width = "48px";
    }
    div.className = "qq";
    div.setAttribute("more", more);
    if ( more ) {
         div.classList.add("search-results-more-td");
    }
    div.appendChild(qq);
    return div;
}

function isMore(img) {
	return img.parentNode.parentNode.getAttribute("more") === "true";
}

function getHotelRowByImage(img) {
	return isMore(img) ? img.parentNode.parentNode.parentNode : img.parentNode.parentNode.parentNode.parentNode;
}

function createOption(img) {
	if ( isMore(img) ) {
		return createMoreOption(img);
	}
	
    var row = getHotelRowByImage(img);

    var option = {
        checkinDt : extractDate(row.querySelector(".search-results-date")),
        nights: extractNights(row.querySelector(".search-results-nights")),
        hotelName : extractHotelName( row ),
        href : extractHotelUrl( row ),
        book_tour_url: extractBooklUrl( row ),
        region : extractRegion( row ),
        roomType: extractRoomType( row ),
        boardType : extractBoardType( row ),
        
        price : extractPrice(extractPriceAndCurrency(row)),
        currency : extractCurrency(extractPriceAndCurrency(row),row),
        
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        thumbnail: getImg( row ),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function extractDate(td) {
    var m = td.textContent.match(/(\d+)\s([\wа-яё]+)\s(\d\d)/i);
    return dateFromDayAndMonthName(m[1], m[2]);
}

function extractNights(td) {
    return td.textContent.match(/(\d+)/)[1];
}

function extractHotelName(row) {
	var stars = row.querySelectorAll(".search-results-star").length;
	return row.querySelector(".search-results-title-name").textContent + 
		(stars ? " " + stars + "*" : "");
}

function extractHotelUrl(row) {
	return row.querySelector(".search-results-title-name").href || "";
}

function extractBooklUrl(row) {
    return typeof AGENCY_WEBSITE != 'undefined' ? getNodeProperty(row.querySelector("a.order-link"), null, "href" ) : null;
}

function extractRegion( row ) {
	return row.querySelector(".search-results-place").textContent;	
}

function extractRoomType(row) {
    var types =  querySelectorAll(row, ".search-results-number").map( e => {
        return e.textContent.trim().replace(/\s+/g, " ");
    });
    types.splice(-1);
    return types.join(", ");
}

function extractBoardType(row) {
    return  querySelectorAll(row, ".search-results-number").map( e => {
        return e.textContent.trim().replace(/\s+/g, " ");
    }).slice(-1).join(", ");
}

function extractPriceAndCurrency(row) {
	return row.querySelector(".search-results-prices-new").firstChild.textContent.trim();
}

function extractPrice(text) {
    return extractIntFromStr(text.replace(/[^\d]/g, ""));
}

function extractCurrency(text, row) {
	var c = text.replace(/[\s\d]/g, "").trim();
	if ( c.length === 0 ) {
		c =  row.querySelector(".search-results-prices-new span").textContent.trim();	
	}
	switch (c.toUpperCase()) {
	  case "₴": return "UAH";
	  case "$": return "USD";
	  case "€": return "EUR";
      case "I": return "RUB";
      case "Р": return "RUB";
      case "Б": return "BYN";
      case "A": return "KZT";
	}
	return c;
}

function getImg(row) {
    return getNodeProperty(row.querySelector(".search-results-pic img"), null, "src") ||
           getBackgroundImageUrl(row.querySelector(".allocation-link.big-photo, .search-results-pic.allocation-link"));
}

function createMoreOption(img) {
    var row = getHotelRowByImage(img);
    var mainRow = getMainRow(row);
    var tds = querySelectorAll(row, "td").filter( td => {
        return td.textContent.trim() !== "";
    });
    var option = {
        hotelName : extractHotelName( mainRow ),
        href : extractHotelUrl( mainRow ),
        book_tour_url: extractBooklUrl( mainRow ),
        region : extractRegion( mainRow ),

        checkinDt : extractDate(tds[0]),
        nights: extractNights(tds[1]),
        roomType: tds[2].textContent + " / " + tds[3].textContent,
        boardType : tds[4].textContent,
        
        price : extractPrice( row.querySelector(".order-link:not(.second-price)").textContent ),
        currency : extractCurrency(  row.querySelector(".order-link:not(.second-price)").textContent ),
        thumbnail: getImg( mainRow ),
        
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getMainRow(row) {
	var mainRow = row.parentNode;
	while ( mainRow ) {
		if ( mainRow.classList.contains("search-results-tbl") || mainRow.classList.contains("search-results")  )  {
		    break;
        }
	    mainRow = mainRow.parentNode;
	}
	return mainRow.querySelector(".search-results-main-td").parentNode;
}

