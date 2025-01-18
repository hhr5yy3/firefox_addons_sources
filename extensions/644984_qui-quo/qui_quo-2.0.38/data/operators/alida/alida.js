var OPERATOR_NAME = "alida";

function getSearchButton() {
    return document.querySelector("#searchb");
}

function initializeSearchCriteria() {
    return null;
}

function injectData() {
    var searchWindow = document.querySelector(".searchr");
    if ( searchWindow && !searchWindow.querySelector(".qq") ) {
        searchWindow.style.width = "1055px";
    }
    querySelectorAll(document, "tr.odd, tr.even").forEach(tr => {
        if ( !tr.querySelector(".qq") ) {
            tr.append(qqBtns());
        }
    });
    var headTr = document.querySelector(".searchr tbody .data_h");
    headTr = headTr ? headTr.parentNode : null;
    if ( headTr && !headTr.querySelector(".qq") ) {
        var d11 = headTr.querySelector(".d11_h");
        if ( d11 ) {
            d11.className = "data_h d11";
        }
        headTr.append(createHeadCell());
    }
}

function createHeadCell() {
    var newTd = document.createElement("td");
    newTd.className = "data_h d10 qq";
    newTd.append(document.createTextNode("QQ"));
    newTd.setAttribute("align","center");
    newTd.setAttribute("valign","middle");
    newTd.style.width = "48px";
    return newTd;
}

function createOption(img) {
    var tr = getHotelRowByImage(img);
    var tds = querySelectorAll(tr, "td.data_d");
    if ( tds.length < 13 ) {
        var additionaltds = querySelectorAll(getMainTr(tr), "td.data_d").slice(0, 3);
        tds = additionaltds.concat(tds);
    }
    var ths = querySelectorAll(document, ".searchr tbody td.data_h");
    var option = {
        checkinDt: getDate(tds[findIndex(ths, /Дата вылета|Izlidošanas datums|Izlidošana|Вылет/i)]),
        nights: tds[findIndex(ths, /ночей|Naktis/i)].textContent.trim(),
        extra_nights: getExtraNights(ths, tds),
        hotelName: tds[findIndex(ths, /Отель|Viesnīca/i)].innerText.replace(/\n/, " ").trim(),
        href: getUrl(tds[findIndex(ths, /Отель|Viesnīca/i)]),
        roomType: tds[findIndex(ths, /Тип номера|Numura tips/i)].textContent.trim(),
        region: getRegion(tds[findIndex(ths, /Регион|Reģions/i)]),
        boardType: tds[findIndex(ths, /Питание|Ēdināšana/i)].textContent.trim(),
        price: extractIntFromStr(tds[findIndex(ths, /Цена за тур|Ceļazīmes/i)].textContent.trim()),
        currency: getCurrency(tds[findIndex(ths, /Цена за тур|Ceļazīmes/i)]),
        country: "",
        city_from: 'Нет данных',
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getImg(tds[findIndex(ths, /Фото|Foto/i)]),
        occupancy: null
    };

    return option;
}

function getDate(td) {
    var dataMatch = td.textContent.match(/(\d{2})\/(\d{2})/);
    var day = dataMatch[1];
    var month = dataMatch[2];
    return appendYear(+day, +month);
}

function getExtraNights(ths, tds) {
    var chDate = getDate(tds[findIndex(ths, /Дата вылета|Izlidošanas datums|Izlidošana|вылет/i)]);
    var endDate = getDate(tds[findIndex(ths, /Дата прилета|Ielidošanas datums|Atgriešanās|Возврат/i)]);
    var distance = getDistance(dayMonthYearToDate(chDate), dayMonthYearToDate(endDate));
    var nights = tds[findIndex(ths, /ночей|Naktis/i)].textContent.trim();
    return (distance - nights).toString();
}

function getUrl(hotel) {
    var href = hotel.querySelector("a");
    return href ? href.href : null;
}

function getRegion(td) {
    var town = td.querySelector(".town");
    return town ? town.textContent.trim() : td.textContent.trim();
}

function getCurrency(td) {
    var priceText = td.querySelector("b").textContent.replace(/\d+|\s+/g,"");
    switch (priceText) {
        case ",EUR" : return "EUR";
        case ",USD" : return "USD";
        default : return priceText.replace(",","");
    }
}

function getImg(td) {
    var image = td.querySelector("img");
    return image ? image.src : null;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while ( div ) {
        if ( div.className === "odd" || div.className === "even") {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

function getMainTr(tr) {
    var mainTr = tr.previousElementSibling;
    while ( mainTr ) {
        if ( mainTr.querySelectorAll("td").length > 12 ) {
            break;
        }
        mainTr = mainTr.parentNode;
    }
    return mainTr;
}

function findIndex(ths, caption) {
    var index = ths.findIndex(function (th) {
        if (th.textContent.match(caption)) {
            return true;
        }
        return false;
    });
    return index;
}
