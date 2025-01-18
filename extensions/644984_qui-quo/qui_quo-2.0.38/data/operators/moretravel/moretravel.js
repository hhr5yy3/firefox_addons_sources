var OPERATOR_NAME = "Море Трэвел";

function getTable() {
    return document.querySelector("div#search_res table");
}

// -------- Search Criteria ---------------------------

function getSearchOption() {
    var panel = document.querySelectorAll("div#center div.tabs_bar.tabs_bar2  a.tab");
    for ( var i = 0; i < panel.length; ++i ) {
        if ( /tab_cur/i.test(panel[i].getAttribute("class")) ) return panel[i].getAttribute("id");
    };
}

function getSelectedItem(name) {
    var selects = document.querySelectorAll("select[name='" + name + "']");
    for ( var i = 0; i < selects.length; ++i ) {
        if ( selects[i].parentNode.offsetParent != null ) {
            var text = selects[i].parentNode.querySelector("span.face").textContent.trim().toLowerCase();
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
    };
    return null;
}

function getCountry() {
	return getSelectedItem("country");
}

function getCityFrom() {
    return getSelectedItem("dep_city");
}

function initializeSearchCriteria() {
    return {
        country: getCountry(),
        cityFrom: getCityFrom()
    };
}

function getSearchButton() {
    var temp = document.querySelectorAll("div.tab_form button.bt1");
    var buttons = [];
    for ( var i = 0; i < temp.length; ++i ) {
        buttons.push(temp[i]);
    };

    return buttons;
}

// --------- Rows ---------------------------------

function getMtText(td) {
    insertBeforeBR(td, "\n");
    return getNodeProperty(td);
}

function extractDate(td) {
    var match = td.textContent.match(/(\d\d\.\d\d\.)(\d\d)/);
    return match[1] + "20" + match[2];
}

function extractNights(td) {
    var nArray = getMtText(td).split("\n");
    var result = 0;
    for( var i = 0; i < nArray.length; ++i ) {
        result += parseInt(nArray[i], 10);
    }
    return result.toString();
}

function extractHotelName(td1, td2, td3) {
    if ( /ЭКСКУРСИОНН/.test(td1.textContent) ) {
    	return td2.textContent.split("::")[1] ? td2.textContent.split("::")[1].trim() : td2.textContent;
    } else {
        if ( /combi/i.test(getSearchOption()) ) {
            var hArray = getMtText(td2).split("\n");
            var nArray = getMtText(td3).split("\n");

            for ( var i = 0; i < hArray.length; ++i ) {
                hArray[i] = hArray[i].trim() + " " + nArray[i].trim() + "н";
            };

            return hArray.join(", ");
        } else {
            return td2.textContent.trim();
        }
    }
}

function extractHotelUrl(td) {
    var anchor = td.querySelector("a")

    return anchor ? anchor.href : ""
}

function extractRoomType(td) {
    if ( !td ) {
        return null;
    }
    return getMtText(td).split("\n").join(", ");
}

function extractRegion(td1, td2) {
    if ( /ЭКСКУРСИОННЫЕ\sТУРЫ/.test(td1.textContent) ) {
    	return td2.textContent.split("::")[1] ?  td2.textContent.split("::")[0].trim() : getMtText(td1).split("\n").join(", ");
    } else {
        return getMtText(td1).split("\n").join(", ");
    }
}

function extractBoardType(td) {
    if (!td) {
        return null;
    }
    return getMtText(td).split("\n").join(", ");
}

function extractPrice(td) {
    var text = td.textContent.replace(/[^\d]/g, "");
    return extractIntFromStr(text);
}

function extractCurrency(ths) {
    var c = ths[findTableTdIndex(ths, /цена/i)].textContent.split(",")[1].trim();
    switch (c.toUpperCase()) {
        case "$" : return "USD";
        case "EU" : return "EUR";
        case "РБ" : return "RUB";
        default : return c;
    }
}

function getCountryBySearchOption(ths, tds) {
    if (/price/i.test(getSearchOption())) {
        var c = tds[findTableTdIndex(ths, /Курорт/i)].textContent.trim().toLowerCase();
        return c.charAt(0).toUpperCase() + c.slice(1);
    }

    return SEARCH_CRITERIA.country;
}

function getCityFromBySearchOption() {
    if (/hotel|child|cruises/i.test(getSearchOption())) {
        return "";
    }

    return SEARCH_CRITERIA.cityFrom;
}

function createOption(img) {
    var tr = img.parentNode.parentNode.parentNode;
    var tds = getChildElementsByTagName(tr, "td");
    var ths = querySelectorAll(getTable(), "tbody > tr > th");

    var option = {
        checkinDt : extractDate( tds[findTableTdIndex(ths, /Вылет|Отправление/i)] ),
        nights : extractNights( tds[findTableTdIndex(ths, /Ночей/i)] ),
        hotelName : extractHotelName( tds[findTableTdIndex(ths, /Курорт|Маршрут/i)], tds[findTableTdIndex(ths, /Отель|Теплоход|Лайнер/i)], tds[findTableTdIndex(ths, /Ночей/i)] ),
        href : extractHotelUrl( tds[findTableTdIndex(ths, /Отель|Маршрут/i)] ),
        roomType: [extractRoomType( tds[findTableTdIndex(ths, /Номер|Размещение|Тип каюты/i)]),
                  extractRoomType(tds[findTableTdIndex(ths, /Номер каюты/i)]),
                  extractRoomType(tds[findTableTdIndex(ths, /Кол-во человек/i)])].filter(s=>s).join(', '),
        region : extractRegion( tds[findTableTdIndex(ths, /Курорт|Маршрут/i)], tds[findTableTdIndex(ths, /Отель|Теплоход/i)]),
        boardType : extractBoardType( tds[findTableTdIndex(ths, /Питание|Палуба/i)] ),
        price : extractPrice( tds[findTableTdIndex(ths, /Цена/i)] ),
        currency : extractCurrency( ths ),
        country : getCountryBySearchOption(ths, tds),
        city_from : getCityFromBySearchOption()
    };

    return option;
}

function createHeaderCell() {
    var span = document.createElement("span");
    span.className = "title qq";
    span.appendChild(document.createTextNode("QQ"));
    return span;
}

function createButtons() {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton());
    nobr.appendChild(createEditButton());

    var td = document.createElement("td");
    td.className = "qq";
    td.appendChild(nobr);

    return td;
}

function injectData() {
	var table = getTable();

	if ( !table || /avia/i.test(getSearchOption()) || /avia/i.test(getSearchOption()) ) {
		return;
	}

    var trs = table.querySelectorAll("tbody > tr");
	if ( trs[0] && !trs[0].textContent.match(/Вылет|Отправление/i) ) {
	    return;
    }

    if ( trs.length > 0 && trs[0].querySelector(".qq") == null) {
        const div = document.querySelector('#center');
        if ( div ) {
            div.style.width = 'fit-content';
        }
        const lastTh = trs[0].querySelector('th:last-child');
        if ( !getText(lastTh) ) {
            trs[0].querySelector('th:last-child').appendChild(createHeaderCell());
        } else {
            trs[0].insertAdjacentHTML('beforeend', `<th class="qq">${createHeaderCell().innerHTML}<th>`);
        }
    }

    trs = table.querySelectorAll("tbody > tr");

    for ( var i = 0; i < trs.length; ++i ) {
        if ( trs[i].querySelector("td.qq") == null ) {
            var tds = getChildElementsByTagName(trs[i], "td");
            if ( tds.length > 6 ) {
                trs[i].appendChild(createButtons());
            }
        }
    }
}
