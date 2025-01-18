var OPERATOR_NAME = "Аккорд Тур";

// -------- Search Criteria ---------------------------

function initializeSearchCriteria() {
    return null;
}


function getSearchButton() {
    return null;
}


// --------- Rows ---------------------------------

function mapCurrency(c) {
    c = trim(c);
    switch(c.toLowerCase()) {
        case "$": return "USD";
        case "€": return "EUR";
        case "грн.": return "UAH";
    }
    return c;
}

function extractDate(td) {
    var match = td.textContent.match(/\d{2}\.\d{2}\.\d{2}/);
    if ( match ) {
        return makeYear4Digits(match[0]);
    }
    match = td.textContent.match(/(\d{2})\.(\d{2})/);
    if ( match ) {
    	return appendYear(extractIntFromStr(match[1]), extractIntFromStr(match[2]));
    }
    
    var start = document.querySelector("#start_date_sel");
    match = (start ? start.value : "").match(/\d{2}\.\d{2}\.\d{4}/)
    if ( match  ) {
    	return match[0];
    } 
    
    var month = document.querySelector("#month_sel");
    match = (month ? month.value : "").match(/(\d{4})-(\d{2})/);
    if ( match ) {
    	return "01." + match[2] + "."  + match[1];
    }
    
    return "01.01.2001";
}

function extractHotelName(td) {
    return trim(td.querySelector("a").textContent) + " Аккорд-Тур";
}

function extractHotelHref(td) {
    return td.querySelector("a").href;
}

function extractRegion(td) {
	var s = td.querySelector("span");
    return s ? s.textContent : "";
}

function extractPrice(td) {
    var spans = td.querySelectorAll(".currency_price_span");
    for ( var i = 0; i < spans.length; ++i ) {
        if ( spans[i].offsetParent ) {
            return extractIntFromStr(spans[i].textContent);
        }
    };
}

function extractCurrency(td) {
    var spans = td.querySelectorAll(".currency_price_span");
    for ( var i = 0; i < spans.length; ++i ) {
        if ( spans[i].offsetParent ) {
            return spans[i].getAttribute("rel");
        }
    };
}

function extractNights(td) {
	if ( !td.textContent.match(/\d/) ) {
		return "0";
	}
    return (extractIntFromStr(td.textContent) - 1).toString();
}

function getHotelRowByImage(img) {
    var tr = img.parentNode;
    while (true) {
        if ( tr.tagName == "TR" ) {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}

function createOption(img) {
    var tr = getHotelRowByImage(img);
    var tds = getChildElementsByTagName(tr, "td");

    var option = {
        checkinDt : extractDate(tds[3]),
        hotelName : extractHotelName(tds[0]),
        href : extractHotelHref(tds[0]),
        region : extractRegion(tds[0]),
        roomType: tds[2].textContent,
        boardType : tds[3].textContent.match(/\d{2}\.\d{2}/) ? "" : tds[3].textContent,
        price : extractPrice(tds[4]),
        currency : extractCurrency(tds[4]),
        nights : extractNights(tds[1]),
        country: "",
        excursion: true,
        occupancy : {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null 
        }
    };

    return option;
}

function createCell() {
    var nobr = document.createElement("nobr")
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());
    
    var div = document.createElement("div")
    div.appendChild(nobr);
    div.className = "qq";

    return div;
}
    
function injectData() {
    var table = document.querySelector("#tour_tbl");

    if ( !table ) {
        return null;
    }

    var bodyTrs = getChildElementsByTagName(table.querySelector("tbody"), "tr");

    for ( var i = 0; i < bodyTrs.length; ++i ) {
        var tds = getChildElementsByTagName(bodyTrs[i], "td");
        if ( bodyTrs[i].querySelector(".qq") == null && /\d/i.test(tds[4].textContent) ) {
            var div = tds[5].querySelector("[rel='order_tbl_div_inner']");
            tds[5].insertBefore(createCell(), div);
        }
    }
}

