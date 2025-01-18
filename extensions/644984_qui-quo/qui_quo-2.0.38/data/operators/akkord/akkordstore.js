

function getCountry(td) {
    var c = [];
    var flags = td.querySelectorAll("img[alt]");
    for (var i = 0; i < flags.length; i++) {
        c.push(trim(flags[i].getAttribute("alt").match(/^[^-]+/)[0]));
    };
    if ( flags.length == 0 ) {
    	Array.fromList(td.querySelectorAll("div[title]"))
    		.map(function(div) { return div.getAttribute("title").match(/^[^-]+/); })
    		.filter(function(m) { return m; })
    		.forEach(function(m) { c.push(trim(m[0])); });
    }
    return c.join(", ");
}

function getCity(td) {
    var span = td.querySelector("span");
    if ( !span ) {
        return null;
    }
    var match = span.textContent.match(/([^–-]+)(–|-)/);
    return match ? match[1] : "";
}


function extractDate(td) {
    var match = td.textContent.match(/(\d{4})\.(\d{2})\.(\d{2})/);
    if ( match ) {
        return match[3] + "." + match[2] + "." + match[1];
    }
    var match = td.textContent.match(/\d{2}\.\d{2}\.\d{4}/);
    if ( match ) {
        return match[0];
    }
    var match = td.textContent.match(/(\d{2})\.(\d{2})/);
    return appendYear(extractIntFromStr(match[1]), extractIntFromStr(match[2]));
}

function extractRegion(td) {
    var newTd = td.cloneNode(true);
    var h3 = newTd.querySelector("h3");
    var table = newTd.querySelector("table");
    if ( h3 )
        newTd.removeChild(h3);
    if ( table )
        newTd.removeChild(table);
    return newTd.textContent;
}

function extractBoardType(td) {
    var result = [];
    var divs = getChildElementsByTagName(td.querySelector(".tour_date_div_inner"), "div");
    for ( var i = 0; i < divs.length; ++i ) {
        var spans = getChildElementsByTagName(divs[i], "span");
        for ( var j = 0; j < spans.length; ++j ) {
            if ( spans[j].textContent && /\d/.test(spans[j].textContent) ) {
                result.push(spans[j].textContent);
                continue;
            }
            if ( /\d/.test(spans[j].nextSibling.textContent) ) {
                var y = spans[j].getAttribute("rel_year");
                result.push(spans[j].nextSibling.textContent.trim() + ( y != new Date().getFullYear() ? "." + y : ""));
            }
        };
    };
    result.shift();
    var resultStr = result.join(", ");

    if ( resultStr != "" ) {
        return "Альтернативные даты выездов: " + resultStr;
    }
    var text = td.textContent.replace(/[^\d\.-\s]/g, "");
    var match = text.match(/\d{2}\.\d{2}\.\d{2}[^\d]*\d{2}\.\d{2}\.\d{2}/g);
    if ( !match ) {
        match = text.match(/\d{2}\.\d{2}\.\d{4}\s.\s\d{2}\.\d{2}\.\d{4}/g);
    }
    if ( !match ) {
        match = text.match(/\d{2}\.\d{2}.\d{4}/g);
    }
    if ( !match ) {
        match = text.match(/[^\d]*(\d{2}\.\d{2})[^\d]*/g);
    }
    if ( !match ) {
        match = text.match(/\d{4}.\d{2}.\d{2}/g);
    }
    if ( !match ) {
        return "";
    }
    match.shift();
    var result = match.join(", ");
    if ( result )
        result = "Альтернативные даты выездов: " + result;
    return result;
}

function createOption(img) {
    var tr = img.parentNode;
    while (true) {
        if ( tr.tagName == "TR" ) {
            break;
        }
        tr = tr.parentNode;
    }
    var tds = getChildElementsByTagName(tr, "td");

    var option = {
        checkinDt : extractDate(tds[3]),
        hotelName : extractHotelName(tds[1]),
        href : extractHotelHref(tds[1]),
        region : extractRegion(tds[1]),
        roomType: "",
        boardType : extractBoardType(tds[3]),
        price : extractPrice(tds[4]),
        currency : extractCurrency(tds[4]),
        nights : extractNights(tds[2]),
        country: getCountry(tds[0]),
        city_from : getCity(tds[1]),
        occupancy : {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null 
        }
    };

    return option;
}
    
function injectData() {
    var table = document.querySelector("#tour_tbl");

    if ( !table ) {
        return null;
    }

    var tbodys = getChildElementsByTagName(table, "tbody");

    for (var j = 0; j < tbodys.length; j++) {
        var bodyTrs = getChildElementsByTagName(tbodys[j], "tr");
        if ( bodyTrs.length > 1 ) {
            for ( var i = j == 0 && /СПЕЦПРЕДЛОЖЕНИЯ/i.test(bodyTrs[1].textContent) ? 2 : 0; i < bodyTrs.length; ++i ) {
                var tds = getChildElementsByTagName(bodyTrs[i], "td");
                if ( bodyTrs[i].querySelector(".qq") == null && tds.length > 4 && /\d/i.test(tds[3].textContent) ) {
                    var div = tds[4].querySelector("[rel='order_tbl_div_inner']");
                    tds[4].insertBefore(createCell(), div);
                }
            }
        }
    };
}

