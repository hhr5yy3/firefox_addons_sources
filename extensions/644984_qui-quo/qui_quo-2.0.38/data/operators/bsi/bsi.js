var OPERATOR_NAME = "BSI Group";

function getSearchButton() {
    return querySelectorAll(document, ".FL_SEARCH_BUT");
}

function initializeSearchCriteria() {
    return null;
}

function injectData() {
    var headTr = document.querySelector("tr.agency-results__head-row");
    if ( headTr && !headTr.querySelector(".qq") ) {
        headTr.append(createHeadCell());
    }
    querySelectorAll(document, "tr.agency-results__row").forEach(tr => {
        if ( !tr.querySelector(".qq") ) {
            tr.append(createCell());
        }
    });
}

function createCell() {
    var newTd = document.createElement("td");
    newTd.className = "qq agency-results__item";
    newTd.append(createAddButton());
    newTd.append(createEditButton());
    return newTd;
}

function createHeadCell() {
    var newTh = document.createElement("th");
    newTh.className = "qq agency-results__head-item agency-results__head-item_info";
    newTh.appendChild(document.createTextNode("QQ"));
    newTh.setAttribute("rowspan", "2");
    return newTh;
}

function createOption(img) {
    var tr = getHotelRowByImage(img);
    var headTr = document.querySelector("tr.agency-results__head-row");
    var ths = querySelectorAll(headTr, "th");
    var tds = querySelectorAll(tr, "td");
    var option = {
        checkinDt: getDate(tds[findIndex(ths, /Даты/i)].textContent),
        nights: tds[findIndex(ths, /Ночи/i)].textContent,
        hotelName: prepareData(tds, ths, [/Отель/i, /Кат/i], " "),
        href: getUrl(tds[findIndex(ths, /Отель/i)]),
        roomType: prepareData(tds, ths, [/типномера/i, /категория/i, /размещение/i], ", "),
        region: prepareData(tds, ths, [/город/i], ""),
        boardType: prepareData(tds, ths, [/питание/i], ""),
        price: getPrice(tds[findIndex(ths, /цена/i)]),
        currency: tds[findIndex(ths, /вал/i)].textContent.trim(),
        country: getSelectOption("#FL_COUNTRY"),
        city_from: getSelectOption("#FL_CITY_FROM"),
        operator: OPERATOR_NAME,
        occupancy: getOccupancy(),
        comment: prepareData(tds, ths, [/описание программы/i], "")
    };
    return option;
}

function getDate(text) {
    var shortDate = text.match(/\d{2}/g);
    return appendYear(+shortDate[0], +shortDate[1]);

}

function getUrl(td) {
    var a = td.querySelector("a");
    return a ? a.href : null;
}

function getPrice(td) {
    var price = td.dataset.order;
    price = price.replace(/\s+/g, "");
    return Math.floor(price);
}

function getSelectOption(sel) {
    var option = document.querySelector(sel);
    if ( option.selectedIndex === -1 ) {
        return "";
    }
    return option.options[option.selectedIndex].textContent;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: extractIntFromStr(getSelectOption("#FL_ADULTS")),
        childrenCount: extractIntFromStr(getSelectOption("#FL_CHILDREN")),
        childAges: null
    };

    if ( occupancy.childrenCount > 0 ) {
        var ages = [];
        for (var i = 0; i < occupancy.childrenCount; ++i) {
            var input = selectOptionalInt("#FL_CHILD" + (i + 1));
            if ( input === null )
                return null;
            ages.push(input);
        }

        occupancy.childAges = ages.join(",");
    }

    return occupancy;
}

function selectOptionalInt(sel) {
    var s = document.querySelector(sel);
    return s ? extractOptionalInt(s.tagName == "SPAN" ? s.textContent : s.value) : null;
}

function prepareData(tds, ths, captions, delimiter) {
    return captions.map((caption) => {
        var td = tds[findIndex(ths, caption)];
        return td ? td.textContent.trim() : null;
    }).filter(elem => {
        return elem !== null;
    }).join(delimiter);
}

function findIndex(ths, caption) {
    return ths.findIndex(function (th) {
        if ( th.textContent.match(caption) ) {
            return true;
        }
        return false;
    });
}

function getHotelRowByImage(img) {
    var tr = img.parentNode;
    while (true) {
        if ( tr.className.match("agency-results__row") ) {
            break;
        }
        tr = tr.parentNode;
    }
    ;
    return tr;
}