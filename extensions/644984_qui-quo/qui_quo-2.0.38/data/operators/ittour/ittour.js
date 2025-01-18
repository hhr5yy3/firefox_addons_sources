var OPERATOR_NAME = "ITTOUR";
var showTopHotelsRating = true;

function getCountryFromNewField() {
	const countries = $$("#countryControl .select-country .checked");
	if ( countries.length > 1 || countries.length === 0 ) {
	    return '';
    }
	return  countries[0].closest("li").title;
}

function getCountry() {
	var c = selectedOption(document.querySelector("#countryControl .select-country")) || getCountryFromNewField();

	if ( c == null ) {
		return null;
	}

	switch (c) {
	case "Шри Ланка": return "Шри-Ланка";
	case "Мьянма": return "Мьянма (Бирма)";
	case "Сейшельские о.": return "Сейшелы";
	default: return c;
	}

	return null;
}

function initializeSearchCriteria() {
    var country = getCountry();

    return { "country" : country };
}

function getSearchButton() {
	return document.querySelector("#online_search_button");
}

var TBL_HEADER = "#result_search .results #result_table_header";
var TBL_ROWS = "#result_search .results>tbody>tr";

function injectData() {

	var header = document.querySelector(TBL_HEADER);
    var trs = document.querySelectorAll(TBL_ROWS);


    if ( header && header.querySelector("th.qq") == null ) {
        var th = document.createElement("th");
        th.className = "qq";
        th.setAttribute("style", "text-align:center; display: table-cell !important; visibility: visible !important; left: auto !important; top: auto !important;");
        th.appendChild(document.createTextNode("QQ"));
        header.appendChild(th);
    }

    for ( var i = 0; i < trs.length; i++ ) {
        if ( trs[i].querySelector("td.qq") == null ) {
            var tds = getChildElementsByTagName(trs[i], "td");
            if ( tds.length > 11 ) {

                var nobr = document.createElement("nobr");
                if ( trs[i].className.indexOf("group_main_row") < 0 ) {
                    nobr.appendChild(qqBtns({align: "qq-horizontal", asyncFunc: getAsyncInfo}));
                }

                var td = document.createElement("td");
                td.className = "qq";
                td.setAttribute("rowspan", tds[0].getAttribute("rowspan"));
                td.setAttribute("style", "padding-left:2px; display: table-cell !important; visibility: visible !important; left: auto !important;  top: auto !important;");
                td.appendChild(nobr);

                trs[i].appendChild(td);
            }
        }
    }
}

function col(tds, aliases) {
	tds = tds.filter(function(td) {
		if ( td == null ) {
			return false;
		}
		var s = getComputedStyle(td);
		return s ? s.display != 'none' : true; });
	var ths = getChildElementsByTagName(document.querySelector(TBL_HEADER), "th");
	for ( var i = 0; i < ths.length; i++) {
		if ( isMatched(ths[i].textContent, aliases) ) {
			return getCell(tds, i);
		}

		var img = ths[i].querySelector("img");
		if ( img != null && isMatched(img.alt, aliases) ) {
			return getCell(tds, i);
		}
	}
	return null;
}

function getCell(tds, index) {
	var ind = 0;
	for ( var i = 0; i < tds.length; i++) {
		if ( ind == index ) {
			return tds[i];
		}
		var colspan = tds[i].getAttribute("colspan");
		ind += colspan ? extractIntFromStr(colspan) : 1;
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

function colText(tds, aliases) {
	var td = col(tds, aliases);
	console.log('Region TD');
	console.log(td);
	return td == null ? null : td.textContent.trim();
}


function getHotelRowByImage(img) {
	return img.parentNode.parentNode.parentNode.parentNode;
}

function extractHotelName(tds) {
	var td = col(tds, [/отель|Готель/i]).querySelector(".hotel_name");
	if ( td == null ) {
		td = col(tds, [/отель|Готель/i]).nextElementSibling.querySelector(".hotel_name");
		if ( td == null ) {
			td = col(tds, [/отель|Готель/i]).previousElementSibling.querySelector(".hotel_name");
		}
	}

	var rating = " " + col(tds, [/рейтинг/i]).textContent.trim();
	if ( rating.indexOf("*") < 0 ) {
		rating += "*";
	}

	var a = td.querySelector("a");
	if ( a == null ) {
		return td.textContent + rating;
	}

	if ( a.title != null && a.title.indexOf("Подробнее о ") == 0 ) {
		return a.title.substring(12) + rating;
	}

	return a.textContent + rating;
}

function extractRoomType(tds) {
	var td = col(tds, [/номер/]);
	if ( td ) {
	    const title = td.querySelector('.room-name');
		return title ? title.dataset.title : td.textContent;
	}

	td = col(tds, [/отель/]);
	if ( td.title != null && td.title != "" ) {
		return td.title;
	}
	return td.querySelector(".main_hidden").textContent;
}

function getItemRows(row, tds) {
	var rows = [tds];
	var count = extractIntFromStr(tds[0].getAttribute("rowspan"));
	for ( var i = 1; i < count; i++) {
		row = row.nextElementSibling;
		tds = getChildElementsByTagName(row, "td");
		for ( var j = 0; j < 4; j++) {
			if ( rows[0][j].getAttribute("rowspan") ) {
				tds.unshift(document.createElement("td"));
			}
		}
		rows.push(tds);
	}
	return rows.filter(r => r.length > 10);
}

function joinItems(f, rows) {
	var items = [];
	for ( var i = 0; i < rows.length; i++) {
		var v = f(rows[i]).trim();
		if ( items.indexOf(v) < 0 ) {
			items.push(v);
		}
	}
	return items.join(" + ");
}

function extractDate(tds) {
	var dt = col(tds,[/дата/]).querySelector(".main_hidden").textContent.match(/(\d+)\.(\d+)/);
	return appendYear(extractIntFromStr(dt[1]), extractIntFromStr(dt[2]));
}

function extractCityFrom(tds) {
	var td = col(tds,[/отправление|Відправлення/i]);
	if ( td ) {
		var a = td.querySelector(".city-name a");
		return a ? a.textContent : "";
	}
	return "";
}

function getPrice(tds) {
	var td = col(tds,[/usd/, /uah/, /eur/]);
	var price = td.querySelector(".main_hidden .currency_code[style='display: inline;']");
	if ( !price ) {
		price = td.querySelector(".main_hidden .currency_code[style='display: block;']");
		if ( !price ) {
			price = td.querySelector(".main_hidden .currency_code:not([style])")
			if ( !price ) {
				price = td.querySelector(".main_hidden .currency_code");
			}
		}
	}
	return price;
}

function extractHrefAndRow(mainRow) {
	var rowWithLink = mainRow;

	if ( mainRow.className.indexOf("group_sub_row") >= 0 ) {
		// у этой строки имя отеля не ссылка. ищем главную строку выше, там имя должно быть ссылкой
		do {
			rowWithLink = rowWithLink.previousElementSibling;
            if ( !rowWithLink ) {
                return {};
            }
		} while ( rowWithLink.tagName === "TR" && rowWithLink.className.indexOf("group_main_row") == -1 );
		if ( rowWithLink.tagName !== "TR" )
			return {};
	}

	var tds = getChildElementsByTagName(rowWithLink, "td");
	var c = col(tds, [/отель|Готель/]);
	if ( !c ) {
		return null;
	}
	var a = c.querySelector(".hotel_name a");
    return a ? {
        href: (a.href.length > 0 ? a.href : a.getAttribute("value")),
        groupRow: rowWithLink
    } : {};
}

function createOption(img) {
    var option = optionFromAttr(img);
    if ( option ) {
        return option;
    }
	var [mainRow, hrefAndRow]= getMainRowAndGroupRowHref(img);
	var tds = getChildElementsByTagName(mainRow, "td");
	console.log(tds);
	var rows = getItemRows(mainRow, tds);
	console.log(rows);
	var price = getPrice(tds);
	option = {
		    region : joinItems((tds)=> {
				const td = col(tds, [/регион|Регіон/i]);
				return getNodeProperty(td.querySelector('[title]'), colText(tds, [/регион|Регіон/i]))
			}, rows),
			hotelName : joinItems(extractHotelName, rows),
            hotel_desc : hrefAndRow.groupRow ?  hrefAndRow.groupRow.getAttribute("hotel_desc") : null,
			href : hrefAndRow.href,
            roomType :  joinItems(extractRoomType, rows),
            boardType : joinItems(function(tds) {
                       var meal = col(tds,[/питания|харчування/]).querySelector(".main_hidden")
                       var title = meal.parentNode.title;
                       return [...new Set([getText(meal), title])].filter(it=>it).join(", ");
                }, rows),
            checkinDt : extractDate(tds),
            nights : extractNights(tds),
            price : extractIntFromStr(price.textContent),
            currency : price.className.substring(price.className.length - 3),
            country: SEARCH_CRITERIA.country,
            city_from: extractCityFrom(tds),
            operator : OPERATOR_NAME + " / " + col(tds,[/оператор/]).querySelector(".main_hidden").textContent.trim(),
            thumbnail : hrefAndRow.groupRow ?  hrefAndRow.groupRow.getAttribute("thumbnail") : null
        };
    setOptionAttr(img, option);
    return option;
}

function extractNights(tds) {
	return col(tds,[/ночей/]).querySelector(".main_hidden").textContent;
}

function getMainRowAndGroupRowHref(img) {
    var mainRow = getHotelRowByImage(img);
    var hrefAndRow = extractHrefAndRow(mainRow);
    return [mainRow, hrefAndRow];
}

async function getAsyncInfo(img) {
    var option = optionFromAttr(img) || createOption(img);
    var hrefAndRow = getMainRowAndGroupRowHref(img)[1];
    if ( !hrefAndRow.href || !hrefAndRow.groupRow ) {
        return img;
    }
    if ( hrefAndRow.groupRow.getAttribute("hotel_desc") && hrefAndRow.groupRow.getAttribute("thumbnail") ) {
        return img;
    }
    var htmlPage = await getPageWithFetch(hrefAndRow.href);
    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlPage, "text/html");
    if ( !doc ) {
        return;
    }
    var image = doc.querySelector(".rg-gallery .es-carousel img[data-large]");
    var desc = getNodeProperty(doc.querySelector("#mainTabs .desc"));
    if ( image ) {
        option.thumbnail =  "http://www.ittour.com.ua/" + image.dataset.large;
        hrefAndRow.groupRow.setAttribute("thumbnail", "http://www.ittour.com.ua/" + image.dataset.large);
    }
    if ( desc ) {
        option.hotel_desc = desc;
        hrefAndRow.groupRow.setAttribute("hotel_desc", desc);
    }
    setOptionAttr(img, option);
    return img;
}

function getPageWithFetch(href) {
    return fetchTimeout(10000, fetch(href)).then(response => response.text()).catch(e => {
        return null
    });
}
