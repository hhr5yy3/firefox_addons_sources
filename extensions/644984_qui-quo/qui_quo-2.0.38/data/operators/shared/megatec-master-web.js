window.showTopHotelsRating = true;
function getTable() {
    return document.querySelector("[id$='ynamicOffersTable_DgPrices']");
}

//-------- Search Criteria ---------------------------

function getOccupancy() {
	var occupancy = {
			adultsCount: 0,
			childrenCount: 0,
			childAges: null
		};

    var s = document.querySelector("input[id$='_txtAdults']");
    if ( !s || !s.value.match(/(\d+)/) )
    	return null;
    occupancy.adultsCount = extractIntFromStr(s.value);

    s = document.querySelector("input[id$='_txtChilds']");
    if ( !s  || !s.value.match(/(\d+)/) )
    	return null;
    occupancy.childrenCount = extractIntFromStr(s.value);

    if ( occupancy.childrenCount > 0 ) {
    	var ages = [];

    	for ( var i=0; i<occupancy.childrenCount; ++i ) {
    		var input = document.querySelector("input[id$='_txtChild" + (i+1) + "']");
        	ages.push(input && input.value.trim() ? extractIntFromStr(input.value) : 2);
    	}

    	occupancy.childAges = ages.join(",");
    }

    return occupancy;
}

function initializeSearchCriteria() {
	var occupancy = getOccupancy();
	if ( !occupancy )
		return null;

	return {
		occupancy : occupancy
	};
}

function getSearchButton() {
	return document.querySelector("[id$='_btnSearch']");
}

// --------- Rows ---------------------------------

function getCountry() {
    var s = document.querySelector("[id$='ynamicOffersFilter_ddlCountry'], [id$='_remoteSearchFilter_lstCountry']");

    if ( s == null ) {
        console.log("country selector is not found");
        return null;
    }

    if ( s.value == null ) {
    	console.log("country is not selected");
        return null;
    }

    if ( typeof mapCountryCode == 'function' ) {
        var country = mapCountryCode(s.value);
        if ( country != null ) {
        	return country;
        }
    }

    var idx = s.options.selectedIndex;
    if ( idx >= 0 ) {
    	return s.options[idx].text;
    }

    return null;
}

function getCity(tdArray) {
    var city = selectedOption(document.querySelector("[id$='ynamicOffersFilter_ddlDepartFrom'], [id$='_remoteSearchFilter_lstDepartFrom']"));
    if ( /БЕЗ\s+ПЕРЕЛЕТА/i.test(city) )
        return "";
    else
        return city;
}

function mapCurrency(s) {
    var c = trim(s);
    switch (c.toUpperCase()) {
    	case "EU": return "EUR";
    	case "EV": return "EUR";
        case "РБ": return "RUB";
        case "РУБ.": return "RUB";
        case "ГР": return "гр";
        case "$": return "USD";
        case "€": return "EUR";
        case "TG": return "KZT";
        case "БР": return "BYN";
        case "BR": return "GBP";
        case "GB": return "GBP";
    }
    return c;
}

function getRowspan(td) {
	var rowspan = td.getAttribute("rowspan");
	return rowspan == null ? 1 : parseInt(rowspan, 10);
}

function tdToArray(trs) {
    var result = [];
    for ( var i = 0; i < trs.length; ++i ) {
        var tds = getChildElementsByTagName(trs[i], "td");

        var els = [];
        for ( var j = 0; j < tds.length; ++j ) {
            els.push(tds[j]);
        }
        result.push(els);
    }

    return result;
}

function getSpanRegexp(id) {
	return new RegExp("_lb\\w*" + id, "ig");
}

function getARegexp(id) {
	return new RegExp("_hl" + id, "i");
}

function getElementsByTagNameAndRegexp(tdArray, tagName, regexp) {
    var result = [];
    for ( var i = 0; i < tdArray.length; ++i ) {
        for ( var j = 0; j < tdArray[i].length; ++j ) {
            var tags = tdArray[i][j].querySelectorAll(tagName);
            for ( var k = 0; k < tags.length; ++k ) {
                if ( tags[k].id.match(regexp) ) {
                    result.push(tags[k]);
                }
            }
        }
    }
    return result;
}

function getTdByClass(tdArray, className) {
    var result = [];
    var regexp =  new RegExp(className);
    for ( var i = 0; i < tdArray.length; ++i ) {
        for ( var j = 0; j < tdArray[i].length; ++j ) {
            if (regexp.test(tdArray[i][j].className))
                result.push(tdArray[i][j]);
        }
    }

    return result;
}

function extractDate(tdArray) {
    var span = getElementsByTagNameAndRegexp(tdArray, "span", getSpanRegexp("Date"))[0];
    var matcher = span.textContent.match(/(\d\d)\.(\d\d)/);
    return appendYear(parseInt(matcher[1], 10), parseInt(matcher[2], 10));
}

function extractHotelName(tdArray) {
    var result = [];
    var nameA = getElementsByTagNameAndRegexp(tdArray, "a", getARegexp("Hotel"));
    if ( nameA.length < 1 ) {
    	nameA = getElementsByTagNameAndRegexp(tdArray, "span", getSpanRegexp("Hotel$"));
    }
    var categorySpan = getElementsByTagNameAndRegexp(tdArray, "span", getSpanRegexp("HotelCategory"));
    var nightsSpan = getElementsByTagNameAndRegexp(tdArray, "span", getSpanRegexp("Nights"));
    if ( nameA.length < 1 ) {
        var nameTds = getTdByClass(tdArray, "hotel");
        for (var i = 0; i < nameTds.length; i++) {
            result.push(nameTds[i].textContent.trim() + ( categorySpan[i] != undefined ? " " + categorySpan[i].textContent.trim() : "") +
                (nameTds.length > 1 ? " " + nightsSpan[i].textContent.trim() + "н" : ""));
        };
    } else {
        for ( var i = 0; i < nameA.length; ++i ) {
            result.push(nameA[i].textContent.trim() + ( categorySpan[i] != undefined ? " " + categorySpan[i].textContent.trim() : "" ) +
                (nameA.length > 1 ? " " + nightsSpan[i].textContent.trim() + "н" : ""));
        };
    }
    if ( result.length < 1 ) {
    	var expr = /Отель/i;
    	var index = findCol(expr);
    	if ( index !== -1 ) {
    	categorySpan =  getNodeProperty(tdArray[0][index].parentNode.querySelector('[id*="HotelCategory"]'));
    	nameA = getText(tdArray[0][index]).replace(categorySpan, "").trim();
            result.push(nameA + ( categorySpan ? " " + categorySpan : "" ));
    	}
    }

    return result.join(" / ");
}

function extractHotelUrl(tdArray) {
    var anchor = getElementsByTagNameAndRegexp(tdArray, "a", getARegexp("Hotel"));
    return anchor.length < 1 ? null :  anchor[0].href;
}

function extractRegion(tdArray) {
    var result = [];
    var regionSpan = getElementsByTagNameAndRegexp(tdArray, "span", getSpanRegexp("City"));
    for ( var i = 0; i < regionSpan.length; ++i ) {
        result.push(regionSpan[i].textContent.trim());
    };
    return result.join(" / ");
}

function extractRoomType(tdArray) {
    var result = [];

    var roomSpan = getElementsByTagNameAndRegexp(tdArray, "span", getSpanRegexp("Room$"));
    var roomCategorySpan = getElementsByTagNameAndRegexp(tdArray, "span", getSpanRegexp("RoomCategory"));
    var accomodationSpan = getElementsByTagNameAndRegexp(tdArray, "span", getSpanRegexp("Accomodation"));

    for ( var i = 0; i < tdArray.length; ++i ) {
        var roomType = [];
        if ( roomSpan[i] != null )
            roomType.push( roomSpan[i].textContent.trim() );
        if ( roomCategorySpan[i] !== null )
            roomType.push( roomCategorySpan[i].textContent.trim() );
        if ( accomodationSpan[i] !== null )
            roomType.push( accomodationSpan[i].textContent.trim() );
        result.push(roomType.join(" "));
    };

    return result.join(" / ");
}

function findCol(regexp) {
	var headerTr = document.querySelector("[id$='ynamicOffersTable_DgPrices'] > tbody > tr");
    var headerTds = headerTr.querySelectorAll("td, th");
    for ( var i = 0; i < headerTds.length; ++i ) {
        if ( regexp.test(headerTds[i].textContent) ) {
            return i;
        }
    }
    return -1;
}

function getPriceAndCurrency(tdArray) {
	var idx = findCol(/ЦЕНА|Ціна/ig);
	if ( idx < 0 ) {
		idx = findCol(/КУПИТЬ/ig);
	}
    return tdArray[0][idx].textContent.split("&" + "nbsp;").join("").split(/\s+/).join("");
}

function extractPrice(tdArray) {
    return extractIntFromStr(getPriceAndCurrency(tdArray).match(/\d+/)[0]);
}

function extractCurrency(tdArray) {
	var spans = getElementsByTagNameAndRegexp(tdArray, "span", getSpanRegexp("Rate"));
	if ( spans.length > 0 ) {
		return mapCurrency(spans[0].textContent.match(/[^\d\s]+/g)[0]);
	}

	return mapCurrency(getPriceAndCurrency(tdArray).match(/[\d\.,]+\s*([\wА-Яа-я]*)/)[1]);
}

function extractNights(tdArray) {
    var result = 0;
    var nightsSpan = getElementsByTagNameAndRegexp(tdArray, "span", getSpanRegexp("Nights"));
    for ( var i = 0; i < nightsSpan.length; ++i ) {
        result += extractIntFromStr(nightsSpan[i].textContent.trim());
    };

    return result.toString();
}

function extractBoardType(tdArray) {
    var result = [];
    var boardTypeSpan = getElementsByTagNameAndRegexp(tdArray, "span", getSpanRegexp("Board"));
    for ( var i = 0; i < boardTypeSpan.length; ++i ) {
        result.push(boardTypeSpan[i].textContent.trim());
    };

    return result.join(" / ");
}

function getRows(img) {
    var tds = img.parentNode.parentNode.parentNode.querySelectorAll("td");

    var rows = [];
    var count = getRowspan(tds[0]);

    var row = tds[0].parentElement;
    for (var i = 0; i < count; i++ ) {
        rows.push(row);
        row = row.nextElementSibling;
    }

    return rows;
}

function createOption(img) {
    var trs = getRows(img);
    var tdArray = tdToArray(trs);
    var option = {
        checkinDt : extractDate( tdArray ),
        hotelName : extractHotelName( tdArray ),
        href : extractHotelUrl( tdArray ),
        region : extractRegion( tdArray ),
        roomType: extractRoomType( tdArray ),
        boardType : extractBoardType( tdArray ),
        price : extractPrice( tdArray ),
        currency : extractCurrency( tdArray ),
        nights: extractNights( tdArray ),
        extra_nights: extractExtraNights( tdArray ),
        country: getCountry(),
        city_from: getCity( tdArray ),
        occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null,
        comment : typeof getComment != 'undefined' ?  getComment( tdArray ) : null
    };
    return option;
}

function createCell(tds) {
    var nobr = qqBtns({align: 'qq-vertical'})

    var newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.appendChild(nobr);
    newTd.setAttribute("rowspan", tds[0].getAttribute("rowspan"));

    return newTd
}

function createTh() {
    var newTh = document.createElement("td");
    newTh.className = "qq"
    var newContent = document.createTextNode("QQ");
    newTh.appendChild(newContent);
    return newTh;
}

function injectData() {
    if ( typeof injectCurrencySelection != 'undefined' ) {
    	injectCurrencySelection();
    }

	var tbl = getTable()
    if ( tbl == null ) {
        return
    }

    var trs = tbl.querySelectorAll("[id$='ynamicOffersTable_DgPrices'] > tbody > tr");

    if ( trs.length > 0 && trs[0].querySelector("td.qq") == null) {
        trs[0].appendChild(createTh());
    }

    var colsCount = typeof MIN_COLS_COUNT == 'undefined' ? 12 : MIN_COLS_COUNT;

    for (var i = 1; i < trs.length; ++i) {
        if ( trs[i].querySelector("td.qq") == null ) {
            var tds = trs[i].getElementsByTagName("td");
            if ( tds.length > colsCount ) {
                trs[i].appendChild(createCell(tds));
            }
        }
    }
}
function extractExtraNights( tdArray ) {
   var span = getElementsByTagNameAndRegexp(tdArray, "span", getSpanRegexp("Date"));
   if ( span.length === 2 ) {
       var matcherCheckinDt =  span[0].textContent.match(/(\d\d)\.(\d\d).(\d\d\d\d)/);
       var matcherCheckoutDt = span[1].textContent.match(/(\d\d)\.(\d\d).(\d\d\d\d)/);
       var date1 = matcherCheckinDt ?  getDate(matcherCheckinDt[0]) : null;
       var date2 = matcherCheckoutDt ? getDate(matcherCheckoutDt[0]) : null;
   } else {
         var matcher = span[0].textContent.match(/(\d\d)/g);
            if ( matcher && matcher.length === 4 ) {
               var date1 =  getDate(appendYear(extractIntFromStr(matcher[0]),extractIntFromStr(matcher[1])));
               var date2 =  getDate(appendYear(extractIntFromStr(matcher[2]),extractIntFromStr(matcher[3])));
             }
       }
   if ( date1 && date2 ){
       var nights =  getDistance(date1, date2);
       var hnights = extractIntFromStr(extractNights( tdArray ));
       var extra_nights = nights - hnights;
       if ( extra_nights > 0 ) {
          return extra_nights.toString();
    	}
    }
    return null;
}

function getDate(text) {
	var m = text.match(/(\d{2})\.(\d{2})\.(\d{4})/);
	return new Date(extractIntFromStr(m[3]), extractIntFromStr(m[2]) - 1, extractIntFromStr(m[1]));
}
