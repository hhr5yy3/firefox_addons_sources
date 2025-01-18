var OPERATOR_NAME = "sletat.ru";
var OPERATOR_SLETAT_ID = -1;
var showTopHotelsRating = true;

//-------- Search Criteria ---------------------------

function getDoc() {
	var frame = document.querySelector("iframe#search-iframe");
	return frame ? frame.contentDocument : document;
}

function getCountry(doc) {
	var countryCaption = doc.querySelector("#fs_country_obj div.select-caption");
	if ( countryCaption == null ) {
		countryCaption = doc.querySelector("#fs_country_obj .ui-s-caption");
	}
	if ( countryCaption != null ) {
		return countryCaption.textContent;
	}
	countryCaption = doc.querySelector("#ui-select-country-to");
	if ( countryCaption != null ) {
		return countryCaption.value;
	}
    countryCaption = doc.querySelector(".directions__field-substrate_common");
    if ( countryCaption != null ) {
        return countryCaption.textContent.replace(/.+,/,"").trim();
    }
    countryCaption = doc.querySelector('input[name="direction-input-field"]');
    if ( countryCaption != null ) {
        return countryCaption.value;
    }
	return null;
}

function getCity(doc) {
	var c = doc.querySelector("#fs_city_obj .ui-s-caption");
	if ( c == null ) {
		c = doc.querySelector("#fs_city_obj div.select-caption");
	}
	if ( c == null ) {
		c = doc.querySelector('#ui-select-departure, input[name="departure-city-input-field"], input[placeholder="Выберите город вылета"]');
		if ( c ) {
		return c.value;
		}
	}
	if ( c === null ) {
		c = doc.querySelector("#main-page-h1");
		return getNodeProperty(c.parentNode.querySelector('.dashed-selector'), "");
	}

	return c == null ? null : c.textContent;
}

function extractOptionalInt(text) {
    return text && text.match(/(\d+)/) ? extractIntFromStr(text) : null;
}

function getOccupancy() {
    var occupancy = {
            adultsCount: 0,
            childrenCount: 0,
            childAges: null
        };

    var btns = document.querySelectorAll(".uis-item_tourists .uis-item__button-group-item_active, .uis-item_tourists .uis-item__tourists-control-count");
    if ( btns.length == 2 ) {
    	occupancy.adultsCount = extractOptionalInt(btns[0].textContent);
    	occupancy.childrenCount = extractOptionalInt(btns[1].textContent);
    	if ( occupancy.adultsCount === null || occupancy.childrenCount === null ) {
    		return null;
    	}
    	if ( occupancy.childrenCount > 0 ) {
    		var ageInputs = document.querySelectorAll(".uis-text_children-age, .uikit-text__input_children-age");
    		if ( ageInputs.length < occupancy.childrenCount ) {
    			return null;
    		}
    		var ages = [];
    		for (var i = 0; i < occupancy.childrenCount; i++) {
    			var age = extractOptionalInt(ageInputs[i].value);
    			if ( age === null ) {
    				return null;
    			}
    			ages.push(age);
			}
    		occupancy.childAges = ages.join(",");
    	}
    } else {
        var s = document.querySelector(".fs_adults_block .ui-s-elements.kids .ui-s-line.on");
        if ( !s )
            return null;
        occupancy.adultsCount = extractIntFromStr(s.textContent);

        s = document.querySelector(".fs_kids_block .ui-s-elements.kids .ui-s-line.on");
        if ( !s )
            return null;
        occupancy.childrenCount = extractIntFromStr(s.textContent);

        if ( occupancy.childrenCount > 0 ) {
            var ages = [];
            for ( var i = 0; i < occupancy.childrenCount; ++i ) {
                s = document.querySelector("#fs_kid" + (i+1) + "_obj .ui-s-caption span");
                ages.push( s ? s.textContent : "10");
            }

            occupancy.childAges = ages.join(",");
        }
    }

    return occupancy;
}

function initializeSearchCriteria() {
	var doc = getDoc();
    var country = getCountry(doc);
    if ( !country )
        return null;

    var city = getCity(doc);

    var occupancy = getOccupancy();

    return { "country" : country,
             "city": city,
             "occupancy": occupancy};
}

function getSearchButton() {
	return $$("a.fs_link_start_search, .b-uikit-button.b-uikit-button_search, .search-form-for-tourists__find-btn, .slsf-controls__button-find, .slsf-controls__button-search, .slsf-controls__buttons-wrapper button",getDoc())
}

//--------- Rows ---------------------------------

function injectData() {
	if ( !SEARCH_CRITERIA ) {
		return;
	}

	var doc = getDoc();
	var min = doc.querySelector("#data-table>div.result-minimal>table");
	if ( min != null ) {
		injectTable(min);
	}

	var std = doc.querySelector("#data-table>div.result-standart>table");
	if ( std != null ) {
		injectTable(std);
	}

	var full = querySelectorAll(doc, "#data-table>div.result-full>ul");
	if ( full.length > 0 ) {
        full.forEach(full => {
            injectFull(full);
        });
    }
	injectDataNewView(doc, createGroupOptionNewView, ".search-result__grouped-price");
	injectDataNewView(doc, createFullOptionNewView, ".search-result__list-item_full .search-result__full-price");
	injectDataNewView(doc, createShortOptionNewView, ".search-result__short-price");
}

function createHeaderCell() {
  var doc = getDoc();
  var td = doc.createElement("td");
  td.className = "qq";
  td.setAttribute("style", "width: 50px;");
  td.appendChild(doc.createTextNode("QQ"));
  return td;
}

function createDataCell(action) {
  var td = getDoc().createElement("td");
  td.className = "qq";
 	td.appendChild(qqBtns({}, action));
  return td;
}

function injectTable(tbl) {
	var thead = tbl.querySelector("table>thead>tr");
	if ( thead != null && thead.querySelector("td.qq") == null ) {
		thead.appendChild(createHeaderCell());
		// give more space for advert
		Array.fromList(document.getElementsByClassName("main-advertising"))
			.forEach(function(a){
				var colspan = a.parentNode.colSpan;
				if ( colspan ) {
					a.parentNode.colSpan = colspan + 1;
				}
			});
	}

	var rows = tbl.querySelectorAll("table>tbody>tr");
	for (var i = 0; i < rows.length; i++) {
		if ( ( ( rows[i].id != null && rows[i].id.indexOf("resultLine") == 0 ) ||
			   ( rows[i].className && rows[i].className.indexOf("resultTr") == 0 ) ) &&
			   rows[i].querySelector("td.qq") == null &&
			   rows[i].querySelector("div.tourName") ) {
			rows[i].appendChild(createDataCell(createTableOption));
		} else if ( rows[i].querySelector("td.qq") != null ) {
			checkAndRestoreEvents(rows[i], createTableOption);
		}
	}
}

function createFullDataCell(action) {
  var td = getDoc().createElement("td");
  td.className = "qq";
	td.setAttribute("style", "padding-top: 20px; vertical-align:top;background-color:#FFF;border-right: 1px solid #DCDCDC; !important");
	td.setAttribute("width", "25px");
 	td.appendChild(qqBtns({}, action));
  return td;
}

function injectFull(ul) {
	var items = getChildElementsByTagName(ul, "li");
	for (var i = 0; i < items.length; i++) {
		if ( items[i].getAttribute("data-sourceid") || items[i].getAttribute("id")) {
			var tr = items[i].querySelector("table>tbody>tr");
			if ( tr != null && tr.querySelector("td.qq") == null ) {
				tr.appendChild(createFullDataCell(createFullOption));
			} else if ( tr != null && tr.querySelector("td.qq") != null ) {
				checkAndRestoreEvents(tr, createFullOption);
			}
		}
	}
}

//--------- Option ---------------------------------

function extractTableDate(dateAndMonth) {
    var m = dateAndMonth.match(/(\d\d)\.(\d\d)/);
    return appendYear(parseInt(m[1], 10), parseInt(m[2], 10));
}

function extractTablePrice(priceAndCurrency) {
	return extractIntFromStr(priceAndCurrency.split(/\s+/).join(""));
}

function extractTablePriceAndCurrency(td) {
	var a = td.querySelector(".priceLink");
	return a ? a.textContent : td.textContent;
}

function extractTableCurrency(priceAndCurrency) {
	var c = priceAndCurrency.split(/\s+/).join("").match(/([^\d]+)/)[1];
	switch (c) {
	case "€": return "EUR";
	case "р.": return "RUB";
	case "$": return "USD";
	}
	return c;
}


function extractTableRoomType(td) {
	var span = td.querySelectorAll("span");
	return span.length < 1 ? "" : span[span.length - 1].textContent;
}

function extractTableHotelName(td) {
	var anchor = td.querySelector("a");
	if ( anchor )
		return anchor.textContent;

	return td.querySelector("div").textContent.replace(extractTableRoomType(td), "");
}

function createTableOption(img) {
	const tour = img.parentNode.parentNode.parentNode
	var tds = getChildElementsByTagName(tour, "td");
	var checkOut =  tds[1].querySelector("span");
    var inAndOutDates = [extractTableDate(tds[0].querySelector("div.tourName").nextSibling.textContent),
                     checkOut ? extractTableDate(checkOut.textContent) : null];
    var nights = tds[1].querySelector("div.days").textContent;
  var option = {
          checkinDt : inAndOutDates[0],
          nights : nights,
          extra_nights : extractExtraNight(inAndOutDates, nights),
          region : tds[2].textContent,
          hotelName : extractTableHotelName(tds[3]) + " " + tds[4].textContent + "*",
          boardType : tds[6].textContent,
          roomType :  extractTableRoomType(tds[3]) + " / " + tds[7].textContent,
          price : extractTablePrice(extractTablePriceAndCurrency(tds[14])),
          currency : extractTableCurrency(extractTablePriceAndCurrency(tds[14])),
          href : getURL(tds[3].querySelector("a")),
          country: SEARCH_CRITERIA.country,
          city_from: tds[13].querySelector("span.hasTicked_3") ? "" : SEARCH_CRITERIA.city,
          operator : OPERATOR_NAME + " / " + tds[8].textContent,
          operatorSletatId : parseInt(tour.getAttribute("data-sourceid")),
          occupancy : SEARCH_CRITERIA.occupancy,
          thumbnail : extractThumbnail(tds[0])
      };
  return option;
}

function getURL(anchor) {
	return anchor && anchor.getAttribute("href") ? anchor.href : "";
}

function extractFullCurrency(td) {
	if ( td.querySelector(".rubico") ) {
		return "RUB";
	}
	if ( td.querySelector(".usdico") ) {
		return "USD";
	}
	if ( td.querySelector(".eurico") ) {
		return "EUR";
	}

	return extractTableCurrency(extractFullPrice(td));
}

function extractFullPrice(td) {
	var price = td.querySelector(".priceval");
	if ( price == null ) {
		price = td.querySelector(".price");
	}
	return price.textContent;
}

function extractFullOperatorName(td) {
	var div = td.querySelector(".logocontainer");
	if ( div && div.title ) {
		var m = div.title.match(/Этот тур предоставлен туроператором (.*)/);
		if ( m )
			return OPERATOR_NAME + " / " + m[1];
	}
	return OPERATOR_NAME;
}

function extractFullHotelName(td) {
	var name = td.querySelector(".title-hot-name .title").textContent;
	var stars = td.querySelectorAll(".s1");
	return name + ( stars.length > 0 ? " " + stars.length + "*" : "" );
}

function extractFullRoomType(tds) {
	var span = tds[2].querySelector("span");
	return tds[1].querySelectorAll("p.ellipsis")[1].querySelector("span:last-child").textContent.trim() +
          			 ", " + tds[2].querySelector("div.ellipsis").textContent.trim() +
          			 (span ? ", " + span.textContent : "");
}

function extractFullBoardType(td) {
	var div = td.querySelectorAll("div.ellipsis")[1];
	var span = td.querySelectorAll("span");
	return [div.textContent + ( span.length > 1 ? " — " + span[1].textContent : ""), div.textContent];
}

function createFullOption(img) {
	var tds = img.parentNode.parentNode.parentNode.querySelectorAll("table>tbody>tr>td");
	var option = {
          hotelName : extractFullHotelName(tds[1]),
          region : tds[1].querySelectorAll("p.ellipsis")[0].textContent,
          roomType : extractFullRoomType(tds),
          boardType : extractFullBoardType(tds[2])[0],
		  boardCode :  extractFullBoardType(tds[2])[1],
          checkinDt : extractTableDate(tds[2].querySelector("div.vilet>span").textContent),
          nights : extractIntFromStr(tds[2].querySelector("div.vilet>span").nextSibling.textContent) + "",
          price : extractTablePrice(extractFullPrice(tds[4])),
          currency : extractFullCurrency(tds[4]),
          href : getURL(tds[1].querySelector(".title-hot-name .title a")),
          country: SEARCH_CRITERIA.country,
          city_from: tds[3].querySelector("span.hasTicked_3") ? "" : SEARCH_CRITERIA.city,
          operator : extractFullOperatorName(tds[4]),
          operatorSletatId : parseInt(img.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-sourceid")),
          occupancy : SEARCH_CRITERIA.occupancy,
          thumbnail : extractThumbnail(tds[0])
      };
  return option;
}

function extractThumbnail(td) {
	var img = getImageNode(td);
	if ( img ) {
		var url = img.getAttribute("data-qui-quo-img");
		if ( url.startsWith("//") ) {
		    url = "http:" + url;
		}
		return url ? url : null;
	}

	img = td.querySelector(".img-box img");
	return img && img.src ? img.src : null;
}

// ***********************************************************************

// http://module.sletat.ru/main.svc/GetTourOperators
// don't forget to update also in main.js
var SLETAT_TO_CODES = [
  [51, "Ambotis Holidays"],[171, "Amigo S"],[205, "Amigo Tours"],[19, "Anex"],[384, "Anex (UA)"],[7, "Biblio Globus"],
  [313, "CALYPSO TOUR"],[162, "China Travel"],[415, "ClickVoyage"],[6, "Coral Travel"],[165, "De Visu"],[431, "Elite Travel"],
  [199, "Evroport"],[112, "Express Tours"],[304, "Good Time Travel"],[113, "Grand"],[20, "ICS Travel Group"],
  [394, "Intensive SPA Tour"],[123, "ITM Group"],[257, "Join UP! (UA)"],[260, "KANDAGAR"],[218, "KazTour (KZ)"],
  [322, "KAZUNION (KZ)"],[194, "Kompas (KZ)"],[142, "More Travel"],[213, "Mouzenidis Travel"],[14, "PAC GROUP"],
  [3, "Pegas Touristik"],[348, "PlanTravel LetsFly"],[323, "PROTOUR (KZ)"],[301, "Robinson Tours"],[418, "RTS TOUR"],
  [191, "SANAT TOUR"],[382, "Selfie Travel (KZ)"],[381, "Solemare"],[158, "SOLVEX"],[430, "Summer Tour"],[54, "Sunmar"],
  [4, "TEZ TOUR"],[395, "Time Voyage"],[340, "TOUR A VENT"],[380, "TUI"],[350, "TUI (UA)"],[78, "UNEX"],[432, "UNICORN"],
  [49, "Vilar Tours"],[65, "Zeus Travel"],[252, "Алеан"],[131, "Арт-Тревел"],[83, "АРТ-ТУР"],[293, "АэроБелСервис"],
  [392, "АэроТур"],[345, "Ванд"],[144, "ВЕДИ ГРУПП УРАЛ"],[87, "ВЕДИ ТУРГРУПП"],[296, "ВОЯЖТУР"],[246, "Глобус Тур"],
  [108, "Дельта"],[153, "Дельфин"],[289, "Звёзды путешествий"],[274, "ИННА ТУР"],[184, "Интерюнион"],[9, "Интурист"],
  [355, "КРИПТОН"],[214, "Меркурий"],[231, "МУЛЬТИТУР"],[429, "Онлайн Экспресс"],[125, "Пакс"],[344, "Пантеон Тревел"],
  [282, "Петрополитана тур"],[182, "Питертур"],[343, "Планета Travel"],[306, "Ривьера Сочи"],[145, "Роза Ветров"],
  [292, "Ростинг"],[38, "Русский Экспресс"],[238, "Русь-Тур"],[361, "Спейс Тревел"],[81, "Спектрум"],[244, "Тари Тур"],
  // операторы ниже добавлены вручную! GetTourOperators их не возвращает
  [46, "Тройка Холдинг"],
  [53, "INTRAVEL Stoleshniki"]
];


function decodeSletatOperator(code) {
	for ( var i = 0; i < SLETAT_TO_CODES.length; i++) {
		if ( SLETAT_TO_CODES[i][0] == code ) {
			return SLETAT_TO_CODES[i][1];
		}
	}
	return null;
}

function injectDataNewView(doc, action, sel) {
    querySelectorAll(doc, "[data-pricehash]").forEach(hotel => {
        if ( !hotel.classList.contains("qq-check-mutation") ) {
            hotel.classList.toggle("qq-check-mutation");
            addMutationObserver(hotel);
        }
    });
	Array.fromList(doc.querySelectorAll(sel))
		.forEach(function(item) {
			if ( item.querySelector(".qq") ) {
				checkAndRestoreEvents(item, action);
			} else {
				var tooltip = item.querySelector(".search-result__price-tooltip-container");
				if ( tooltip ) {
					tooltip.setAttribute("style", "margin-right:24px;");
				}

				var div = doc.createElement("div");
				div.className = "qq";
                if ( action.name === "createFullOptionNewView" ) {
                    div.style.position = "absolute";
                    div.style.top = "0px";
                    div.style.left = "35%";
                } else {
                    div.style.marginLeft = "33px";
                }
				div.appendChild(qqBtns({align: "horizontal"}, action));

				item.prepend(div);
			}
		});
}

function createOptionNewView(hotel, line, dates, roomAndBoard) {
	var operatorId = getOperatorIdNewView(line);
	var inAndOutDates = extractDatesNewView(dates);
	var nights = extractNightsNewView(dates);
	var option = {
			hotelName : extractHotelNameNewView(hotel),
			href : extractHotelUrlNewView(hotel),
			region : extractHotelRegionNewView(hotel),
			checkinDt : inAndOutDates[0],
			nights : nights,
            extra_nights : extractExtraNight(inAndOutDates, nights),
			roomType : extractRoomTypeNewView(roomAndBoard),
			boardType : extractBoardTypeNewView(roomAndBoard)[0],
		    boardCode : extractBoardTypeNewView(roomAndBoard)[1],
			price : extractPriceNewView(line),
			currency : extractCurrencyNewView(line),
			city_from: extractCityFromNewView(line),
			country: SEARCH_CRITERIA.country,
			occupancy : SEARCH_CRITERIA.occupancy,
			operator : getOperatorNameNewView(operatorId, line),
			operatorSletatId : operatorId,
			thumbnail: extractThumbnailNewView(line)
	};
	return option;
}

function extractThumbnailNewView(line) {
    var img = getImageNode(line);
    if ( img ) {
        var url = img.getAttribute("data-qui-quo-img");
        if ( url.startsWith("//") ) {
            url = "http:" + url;
        }
        return url ? url : null;
    }

    img = line.querySelector(".search-result__hotel-photo, .search-result__resort-logo");
    return img && img.src ? img.src : null;
}

function createGroupOptionNewView(img) {
	var line = img.parentNode.parentNode.parentNode.parentNode;
	var hotel = findParentByClass(img, /search-result__item_opened-group|search-result__list-item_opened-group/i)
	var dates = line.querySelector(".search-result__grouped-dates");
	var roomAndBoard = line.querySelector(".search-result__grouped-accomodation");

	return createOptionNewView(hotel, line, dates, roomAndBoard);
}

function createFullOptionNewView(img) {
	var line = findParentByClass(img, /search-result__item-info|search-result__list-item/i);
	var dates = line.querySelector(".search-result__full-dates");
	var roomAndBoard = line.querySelector(".search-result__full-simple-block_double-size");
	var operatorId = getOperatorIdNewView(line);

	return createOptionNewView(line, line, dates, roomAndBoard);
}

function createShortOptionNewView(img) {
	var line = findParentByClass(img, /search-result__item_short|search-result__list-item/i);
	var dates = line.querySelector(".search-result__short-dates");
	var roomAndBoard = line.querySelector(".search-result__short-accomodation");
	var operatorId = getOperatorIdNewView(line);

	return createOptionNewView(line, line, dates, roomAndBoard);
}

function findParentByClass(parent, clazz) {
    while ( parent && (!parent.className || !parent.className.match(clazz)) ) {
	    parent = parent.parentNode;
	}
	return parent;
}

function extractHotelNameNewView(hotel) {
	var name = hotel.querySelector(".search-result-text_hotel").textContent;
	var stars = hotel.querySelector(".search-result-rating, .search-result-category");
	if ( stars && stars.className ) {
		var m = stars.className.match(/stars-(\d+)/);
		name += m && m[1] != "0" ? " " + m[1] + "*" : "";
	}
	return name;
}

function extractHotelUrlNewView(hotel) {
	var a = hotel.querySelector(".search-result-text_hotel");
	return a.href ? a.href : "";
}

function extractHotelRegionNewView(hotel) {
	var s = hotel.querySelector('[class*="destination"], .search-result__list-item-info .search-result-text_grey');
	var region = s ? s.textContent : "";
	return region.startsWith(SEARCH_CRITERIA.country) ?
		region.substring(SEARCH_CRITERIA.country.length + 1).trim() : region;
}

function extractDatesNewView(dates) {
	var date = dates.querySelector(".search-result-text_dates");
	var checkIn = date.textContent.match(/(\d+)\s+([^\s]+)/);
    var checkOut = date.textContent.match(/[—-]\s+(\d+)\s+([^\s]+)/);
	return [appendYear(extractIntFromStr(checkIn[1]), monthNameToNumber(checkIn[2])),
            checkOut ? appendYear(extractIntFromStr(checkOut[1]), monthNameToNumber(checkOut[2])) : null];
}

function extractNightsNewView(dates) {
	return extractIntFromStr(dates.querySelector(".search-result-text_grey").textContent).toString();
}

function extractExtraNight(dates, nights) {
	if ( !dates[1] ) {
		return "0";
	}
    return (getDistance(dayMonthYearToDate(dates[0]), dayMonthYearToDate(dates[1])) - nights).toString();
}

function extractBoardTypeNewView(roomAndBoard) {
	var board = roomAndBoard.querySelector("div.search-result-text");
	var boardCode = board.querySelector(".search-result-text_bold");
	var title = board.getAttribute("title");
	return [board.textContent + (title ? " — " + title : ""), boardCode ? boardCode.textContent : board.textContent];
}

function extractRoomTypeNewView(roomAndBoard) {
	var room = roomAndBoard.querySelectorAll(".search-result-text.search-result-text_bold")[1];
	var tooltip = roomAndBoard.querySelector(".search-result__special-tooltip_room-info");
	return tooltip ? room.textContent + " — " + tooltip.textContent : room.textContent;
}

function extractPriceNewView(line) {
	var span = line.querySelector(".search-result-text__standart-price span");
	if ( !span )
		span = line.querySelector(".search-result-text__standart-price"); // TODO когда Слетать задеплоят, не делать попытку выше
	return extractIntFromStr(span.textContent.split(/\s+/).join(""))
}

function extractCurrencyNewView(line) {
	var span = line.querySelector(".search-result-text__standart-price span");
	if ( !span )
		span = line.querySelector(".search-result-text__standart-price"); // TODO когда Слетать задеплоят, не делать попытку выше
	return span.className.match(/currency-(\w+)/)[1].toUpperCase();
}

function extractCityFromNewView(line) {
	var icons = line.querySelectorAll(".search-result-availability .search-result-availability__item");
	return icons.length > 3 && icons[1].className && icons[1].className.indexOf("not-included") < 0 &&
			icons[2].className && icons[2].className.indexOf("not-included") < 0 ? SEARCH_CRITERIA.city : "";
}

function getOperatorIdNewView(line) {
	var logo = line.querySelector(".search-result-operator-logo");
	if ( logo && logo.src ) {
		var m = logo.src.match(/to\/(\d+)\./);
		if ( m ) {
			return extractIntFromStr(m[1]);
		}
	}
	return line.closest('[data-sourceid]') ? Number(line.closest('[data-sourceid]').getAttribute('data-sourceid')) : -1;
}

function getOperatorNameNewView(operatorId, hotel) {
    var operator = decodeSletatOperator(operatorId) || getNodeProperty(hotel.querySelector(".search-result__full-operator-name, .search-result__operator-name "), "");
	return OPERATOR_NAME + (operator == null ? "" : " / "  + operator);
}

function getImageNode(node) {
    var div = node;
    while (true) {
        if ( div === null || div === document ) {
            return null;
        }

        if ( div.getAttribute("data-qui-quo-img") ) {
            return div;
        }
        if ( div.className.match(/search-result__item_opened-group|search-result__list-item_opened-group/) || div.className === "search-item") {
            var img = div.querySelector(".search-result__hotel-photo, .img-box img");
            if ( img ) {
                img.setAttribute("data-qui-quo-img", img.src ? img.src : "");
                return img;
            }
        }
        div = div.parentNode;
    }
}

function addMutationObserver(targetNode) {
    var config = {attributes: true, childList: false, subtree: false};
    var callback = function (mutationsList) {
        var mainQqElem = targetNode.querySelector("div.qq");
        for (var mutation of mutationsList) {
            if ( mutation.type === 'attributes' && mutation.attributeName === "data-pricehash" && mainQqElem ) {
                (mainQqElem.closest("td.qq") || mainQqElem).remove();
            }
        }
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}
