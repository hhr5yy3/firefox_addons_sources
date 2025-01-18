// копия этого кода лежит в начале файла anex.js
// при любых изменениях в этом файле надо обязательно копировать в anex.js !!!!
window.showTopHotelsRating = true;
function getDoc() {
    var frame = document.getElementById("samo");
    return frame ? (frame.contentDocument ? frame.contentDocument : document) : document;
}

function getTable() {
    return getDoc().querySelector("div.resultset table.res");
}

// -------- Find Action ---------------------------


function getCountry() {
    var s = getDoc().querySelector("select.STATEINC");
    if ( s == null ) {
        return null;
    }

    if ( s.value == null ) {
        console.log("country is not selected");
        return null;
    }

    var idx = s.options.selectedIndex;
    if ( idx >= 0 ) {
    	return mapCountry(s.options[idx].text);
    }

    return null;
}

function getCity() {
	if ( /search_hotel/i.test(document.location.href) ) {
		return "";
	}

	var table = document.querySelector(".programm_filter.panel");
	if ( table != null ) {
		var labels = table.querySelectorAll("label");
		for ( var i = 0; i < labels.length; i++ ) {
			var l = labels[i];
			var radio = l.querySelector("input[type='radio']");
			if ( !radio ) {
				radio = l.previousElementSibling && l.previousElementSibling.type === 'radio' ? l.previousElementSibling : null;
			}
			if ( /ТОЛЬКО\sПРОЖИВАНИЕ/i.test(l.textContent) && radio && radio.checked )
				return "";

		};
	}
	return selectedOption(getDoc().querySelector("select.TOWNFROMINC"));
}

function getCityFrom(tr, city) {
	var type_price = tr.querySelector(".type_price");
	if ( type_price && /БЕЗ АВИА/i.test(type_price.textContent) )
		return "";
	return city || SEARCH_CRITERIA.city_from;
}

function mapCountry(text) {
	var map = [
	           ["шри ланка", "Шри-Ланка"],
	           ["доминиканская республика", "Доминикана"],
	           ["тайланд", "Таиланд"],
	           ["antigua and barbuda", "Антигуа и Барбуда"],
	           ["aruba", "Аруба"],
	           ["australia", "Австралия"],
	           ["austria", "Австрия"],
	           ["bahamas", "Багамы"],
	           ["bahrain", "Бахрейн"],
	           ["barbados", "Барбадос"],
	           ["bulgaria", "Болгария"],
	           ["czehia", "Чехия"],
	           ["china", "Китай"],
	           ["costa rica", "Коста-Рика"],
	           ["cuba", "Куба"],
	           ["cyprus", "Кипр"],
	           ["dominican republic", "Доминикана"],
	           ["dominikana", "Доминикана"],
	           ["egypt", "Египет"],
	           ["france", "Франция"],
	           ["greece", "Греция"],
	           ["indonesia", "Индонезия"],
	           ["india", "Индия"],
	           ["israel", "Израиль"],
	           ["italy", "Италия"],
	           ["jamaica", "Ямайка"],
	           ["japan", "Япония"],
	           ["jordan", "Иордания"],
	           ["lebanon", "Ливан"],
	           ["malaysia", "Малайзия"],
	           ["maldives", "Мальдивы"],
	           ["mariana islands", "Марианские о-ва"],
	           ["mauritius", "Маврикий"],
	           ["mexico", "Мексика"],
	           ["morocco", "Морокко"],
	           ["montenegro", "Черногория"],
	           ["oman", "Оман"],
	           ["qatar", "Катар"],
	           ["saint barthelemy", "Сен-Бартелеми"],
	           ["saint lucia", "Сент-Люсия"],
	           ["seychelles", "Сейшелы"],
	           ["singapore", "Сингапур"],
	           ["spain", "Испания"],
	           ["sri lanka", "Шри-Ланка"],
	           ["thailand", "Таиланд"],
	           ["turkey", "Турция"],
	           ["turks & caicos", "Теркс и Кайкос"],
	           ["tunisia", "Тунис"],
	           ["uae", "ОАЭ"],
	           ["vietnam", "Вьетнам"],
	           ];
	var t = text.toLowerCase();
	for ( var i = 0; i < map.length; i++) {
		if ( t == map[i][0] ) {
			return map[i][1];
		}
	}
	return text;
}

function getOccupancy() {
	var occupancy = {
			adultsCount: 0,
			childrenCount: 0,
			childAges: null
		};

    var s = selectedOption(getDoc().querySelector("select.ADULT"));
    if ( !s || !s.match(/(\d+)/) ) {
    	return null;
    }
    occupancy.adultsCount = extractIntFromStr(s);

    s = selectedOption(getDoc().querySelector("select.CHILD"));
    if ( !s || !s.match(/(\d+)/) ) {
    	return null;
    }
    occupancy.childrenCount = extractIntFromStr(s);

    if ( occupancy.childrenCount > 0 ) {
    	var ages = [];
    	for ( var i=0; i<occupancy.childrenCount; ++i ) {
    		var id = "age_" + (i+1);
            var el = getDoc().querySelector(`#${id}, .${id}`);
    		if ( el && /\d+/.test(el.value) )
    			ages.push(extractIntFromStr(el.value));
    		else
    			ages.push(2);
    	}
    	occupancy.childAges = ages.join(",");
    }

    return occupancy;
}

function initializeSearchCriteria() {
	 var country = getCountry();
	 if ( !country )
		 return null;

	 return { "country" : country,
		 	  "city_from" : getCity(),
		 	  "occupancy" : getOccupancy()
		 	  };
}

function getSearchButton() {
    return getDoc().querySelector("button.load");
}

// -------- Title ---------------------------

function getHeaderRow() {
    var tbl = getTable()
    return tbl ? tbl.querySelector("thead>tr") : null
}

function needInjectTitle() {
    var th = getHeaderRow()
    return th != null && th.querySelector("th.qq") == null
}

function addTitle() {
    var newTh = getDoc().createElement("th");
    newTh.className = "qq"
    var newContent = getDoc().createTextNode("QQ");
    newTh.appendChild(newContent);
    getHeaderRow().appendChild(newTh);
}

function injectTitle() {
    if ( needInjectTitle() )
        addTitle()
}

// --------- Rows ---------------------------------

function extractPrice(priceAndCurrency) {
    return parseInt(priceAndCurrency.match(/(\d+)/)[1], 10)
}

function extractCurrency(priceAndCurrency) {
	var m = priceAndCurrency.match(/\d+\s+(.+)\s*/);
    return m ? m[1] : "";
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
   	var regionAndOffer = col(tds, [/^тур$/, /тур\s+\/\s+тип\s+программы/]);
	var regionAndOfferText = getText(regionAndOffer.firstChild);
    var idx = regionAndOfferText.indexOf("Раннее бронирование");

    if ( idx < 0 ) {
    	idx = regionAndOfferText.indexOf("Early Booking");
    }
    if ( idx < 0 ) {
    	idx = regionAndOfferText.indexOf("(СПО)");
    }
    return idx > 0 ? regionAndOfferText.substring(0, idx-1) : regionAndOfferText;
}

function extractDate(dateAndDoW) {
    return dateAndDoW.match(/(\d+\.\d+\.\d+)/);
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

function extractHotelUrl(td, td2) {
    var anchor = td.querySelector('td>a, a');
    if (anchor) return getRedirectedHrefIfKompass(anchor.href);
    anchor = td2.querySelector('td>a');
    return anchor ? getRedirectedHrefIfKompass(anchor.href) : null;

    function getRedirectedHrefIfKompass(href) {
        if (document.location.hostname === 'online.kompastour.kz') {
            try {
                const url = new URL(href);
                const [hostname, redirect_url] = [url.hostname, url.searchParams.get('redirect_url')];
                if (hostname === 'kompastour.com' && redirect_url && redirect_url[0] === '/') {
                    return url.origin + '/kz/rus/country' + redirect_url;
                }
                return href;
            } catch (e) {
                console.error(e);
                return href;
            }
        }
        return href;
    }
}

function getRoomType(tds) {
	var arr = [];
	var cols = [[/номер\s*\/\s*размещение/], [/^номер$/], [/^размещение$/], [/номер\s*\/\s*розміщення/], [/room\s*\/\s*accommodation/]];
	for ( var i = 0; i < cols.length; i++) {
		var text = colText(tds, cols[i]);
		if ( text != null && text != "" ) {
            var script = getNodeProperty(col(tds, cols[i]).querySelector("script"));
			arr.push(text.replace(script,""));
		}
	}
	return arr.join(" / ");
}

function splitHotelName(hotelName, region) {
	var m = hotelName.match(REGION_PATTERN);
	if ( m == null ) {
		return [region, hotelName];
	}
	return [m[2], m[1]];
}

function col(tds, aliases, notMatch) {
	var ths = getChildElementsByTagName(getHeaderRow(), "th");
	for ( var i = 0; i < ths.length; i++) {
		if ( isMatched(ths[i].textContent, aliases) && !isMatched(ths[i].textContent, notMatch) ) {
			return tds[i];
		}

		var img = ths[i].querySelector("img");
		if ( img != null && isMatched(img.alt, aliases) && !isMatched(img.alt, notMatch) ) {
			return tds[i];
		}

		var italic = ths[i].querySelector("i");
		if ( italic != null && isMatched(italic.title, aliases) && !isMatched(italic.title, notMatch) ) {
			return tds[i];
		}
	}
	return null;
}

function colText(tds, aliases) {
	var td = col(tds, aliases);
	return td == null ? null : td.textContent.trim();
}

function isMatched(text, aliases) {
	if ( !text || !aliases ) {
		return false;
	}
	text = text.trim().toLowerCase();
	for ( var i = 0; i < aliases.length; i++) {
		if ( text.match(aliases[i]) ) {
			return true;
		}
	}
	return false;
}

var COL_NIGHTS = [/ноч/, /nights/i];

function extractNights(tr,tds) {
    var nights = tr.getAttribute("data-nights");
	var hnights = tr.getAttribute("data-hnights");
	if ( hnights ){
		return hnights.toString();
	}
	if ( nights ){
		return nights.toString();
	}
	var td = col(tds, COL_NIGHTS);
	var add = td.querySelector(".price-additional-nights");
	if ( add ) {
		add.parentNode.insertBefore(getDoc().createTextNode(" "),add);
	}
	return extractIntFromStr(td.textContent) + "";
}

function extractExtraNights(tr) {
    var nights = tr.getAttribute("data-nights");
	var hnights = tr.getAttribute("data-hnights");
	if ( nights && hnights && isANumber(nights) && isANumber(hnights) ){
	var extra_nights = nights - hnights;
	   if ( extra_nights > 0 ) {
		   return extra_nights.toString();
	   }
	}
   return null;
}

function extractBoardType(tds) {
    var aliases = [/питание/, /meal/, /харчування/, /пит\./];
    var board = colText(tds, aliases);
    if ( !board ) {
        if ( typeof isBoardTypeOptional != 'undefined' && isBoardTypeOptional == true ) {
            return "";
        } else {
            return null;
        }
    }
    var script = board ? getNodeProperty(col(tds, aliases).querySelector("script")) : null;
    var boardType = script ? script.match(/<p>(.+?)<br/) : null;
    return trim(board.replace(script, "")) + (boardType ? ", " + boardType[1] : "");
}


function extractBoardCode(tds) {
    var td = col(tds, [/питание/, /meal/, /харчування/]);
    if ( !td ) {
        return null;
    } else {
        var fullBoard = td.querySelector("script");
        return td.textContent.replace(fullBoard ? fullBoard.textContent : "", "").trim();
    }
}


var COL_HOTEL = [/гостиница/,/отель/, /hotel/i];
var COL_sURL = [/тур/, /Tour/i];
function createOption(img) {
	var td =  img.parentNode.parentNode;
	var tr = td.parentNode;
	var tds = getChildElementsByTagName(tr, "td");
    var hotel = col(tds, COL_HOTEL, COL_NIGHTS);
    var price = colText(tds, [/цена/, /ціна/, /price/]);
    var sURL = col(tds, COL_sURL);
    var myDocsNode = tr.querySelector("mdtblock.hotelItem_mdt_prefix");
    if ( myDocsNode ) {
        var myDocsParent = myDocsNode.parentNode;
        myDocsParent.removeChild(myDocsNode);
	}

	const searchAttributes = {
		country: td.dataset.searchCountry,
		city: td.dataset.searchCity,
		occupancy: td.dataset.searchOccupancy
	}
    var option = {
        checkinDt : extractDate(colText(tds, [/заезд/, /дата/, /вылет/, /Departure from/i, /Заїзд/i]))[1],
        region : extractRegion(tds, hotel),
        nights : extractNights(tr,tds),
        extra_nights: extractExtraNights(tr),
        hotelName : extractHotelName(hotel),
        boardType : extractBoardType(tds),
		boardCode : extractBoardCode(tds),
        roomType : getRoomType(tds),
        price : extractPrice(price),
        currency : extractCurrency(price),
        href : extractHotelUrl(hotel, sURL),
        country : searchAttributes.country || SEARCH_CRITERIA.country,
        city_from : getCityFrom(tr, searchAttributes.city),
        occupancy : searchAttributes.occupancy ? JSON.parse(searchAttributes.occupancy) : SEARCH_CRITERIA.occupancy,
        thumbnail : extractThumbnail(img, tds, hotel, price)
    };
    if ( myDocsParent && myDocsNode ) {
        myDocsParent.appendChild(myDocsNode);
    }
    return option;
}

function extractThumbnail(img, tds, hotel, price) {
	return null;
}

function createCell(sc = {}) {
    var newTd = getDoc().createElement("td");
    newTd.className = "qq";
    newTd.appendChild(qqBtns(
        { align: "horizontal" }
    ));
	newTd.dataset.searchCountry = sc.country || "";
	newTd.dataset.searchCity = sc.city || "";
	newTd.dataset.searchOccupancy = JSON.stringify(sc.occupancy) || "";
    return newTd;
}

function makeTableWider() {
    var doc = getDoc();
    if ( doc != null ) {
        var div = doc.querySelector("div.resultset");
        if ( div != null ) {
            div.setAttribute('style', 'padding-left: 1px !important;padding-right: 1px !important');
        }
    }
}

function wrapTransportCell(tr) {
    // add isTransportColToShrink = true to operator-specific file if required
    if (  typeof isTransportColToShrink != 'undefined' && isTransportColToShrink == true ) {
    	var div = tr.querySelector(".transport-short");
		var obIcon = tr.querySelector(".transport-short > .fr_place_r");
		if ( obIcon ) {
			 div.insertBefore(getDoc().createElement("br"), obIcon);
			 div.setAttribute("style", "width:auto;");
		}
    }
}

function wrapAttributesCell(tr) {
	var attrs = tr.querySelector(".attributes");
	if ( !attrs )
		return;
	var spans = getChildElementsByTagName(attrs, "span");
	if ( spans.length > 3 )
		 attrs.insertBefore(getDoc().createElement("br"), spans[3]);
	if ( spans.length > 6 )
		 attrs.insertBefore(getDoc().createElement("br"), spans[6]);
}

function makeTransportColSmaller() {
    // add isTransportColToShrink = true to operator-specific file if required
    if (  typeof isTransportColToShrink != 'undefined' && isTransportColToShrink == true ) {
    	var tr = getHeaderRow();
    	if ( tr ) {
	    	var th = tr.querySelector(".transport-short");
	    	if ( th )
	    		th.setAttribute("style", "width:auto;");
    	}
    }
}

var EMPTY_ARR=["","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];

function injectData() {
	if ( /page=freight_changes/i.test(document.location.href) ) {
		return;
	}

	if ( location.href.indexOf("freight_monitor") > 0 || location.href.indexOf("page=cl_refer") > 0 || location.href.indexOf("page=hotels") > 0 ) {
		return null;
	}

	// special check to hide buttons inside hidden area
    if ( getHeaderRow() != null && col(EMPTY_ARR, COL_HOTEL) == null ) {
    	return;
    }

	injectTitle();
	makeTableWider();
	makeTransportColSmaller();

    var tbl = getTable()
    if ( tbl == null )
        return

    var trs = getDoc().querySelectorAll("div.resultset table.res>tbody>tr");

	const country = getCountry();
	const city = getCity();
	const occupancy = getOccupancy();

    for (var i = 0; i < trs.length; ++i) {

    	// special check to hide buttons inside hidden area
    	var tds = trs[i].querySelectorAll("td");
    	if ( tds.length == 0 )
    		continue;
    	var dateAndDoW = colText(tds, [/заезд/, /дата/, /вылет/, /Departure from/i, /Заїзд/i]);
    	if ( !dateAndDoW )
    		continue;
    	if ( !extractDate(dateAndDoW) )
    		continue;

        if ( trs[i].querySelector("td.qq") == null && tds.length > 6 ) {
            trs[i].appendChild(createCell({country, city, occupancy}));
            wrapTransportCell(trs[i]);
            wrapAttributesCell(trs[i]);
        }
    }
}
