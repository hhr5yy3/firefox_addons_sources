var OPERATOR_NAME = "Дельфин";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    querySelectorAll(document, "#Riverlines-Tour-Places-Table tbody tr").forEach(tr => {
        if ( !tr.querySelector(".qq") ) {
            tr.append(createCell());
        }
    });

    querySelectorAll(document, "#Riverlines-Tour-Places-Table thead tr").forEach(tr => {
        if ( !tr.querySelector(".qq") ) {
            tr.append(createHeadCell());
        }
    });
}

function createHeadCell() {
    var th = document.createElement("th");
    th.className = "ui-state-default qq";
    th.append(document.createTextNode("QQ"));
    th.style.textAlign = "center";
    return th;
}

function createCell() {
    var td = document.createElement("td");
    var nobr =document.createElement("nobr");
    nobr.append(loadAsyncInfo(createAddButton()));
    nobr.append(loadAsyncInfo(createEditButton()));
    td.append(nobr);
    td.className = "ui-widget-content qq";
    td.style.background = "none";
    return td;
}

function createOption(img) {
    var tr = getHotelRowByImage(img);
    var ths = querySelectorAll(tr.parentNode.parentNode, "th");
    var tds = querySelectorAll(tr, "td");
    var date = getDate(/Дата начала круиза/i);
    var option = {
        checkinDt: date,
        nights: getNights(date).toString(),
        hotelName: getNextElementText(containsText(/Теплоход/i)),
        href: window.location.href,
        roomType: getRoom(ths, tds),
        region: getNextElementText(containsText(/Маршрут/i)),
        boardType: "",
        price: extractIntFromStr(tds[findTableTdIndex(ths, /Цена основного/i)].textContent),
        currency: "RUB",
        country: "",
        city_from: "",
        operator: OPERATOR_NAME,
        excursion: true,
        comment: tr.getAttribute("comment"),
        thumbnail: tr.getAttribute("thumb")
    };
    return option;
}

function getDate(regexp) {
    return dateFromText(getNextElementText(containsText(regexp)), /(\d+)\s+([А-я]+)\s+(\d+)/i);
}

function getNights(date) {
    var endDate =  dayMonthYearToDate(getDate(/Дата окончания круиза/i));
   return getDistance(dayMonthYearToDate(date), endDate );
}

function getRoom(ths, tds) {
    var deck = tds[findTableTdIndex(ths, /Палуба/i)].textContent;
    var room = tds[findTableTdIndex(ths, /каюты/i)].textContent;
    var category =  tds[findTableTdIndex(ths, /Категория/i)].textContent;
    return [ deck ? "Палуба: " + deck : "",
      room ? "Номер каюты: " + room : "",
      category ? "Категория: " + category : ""].join(", ");


}

function dateFromText(text, regexp) {     // return "dd.mm.yyyy"
    var matcher = text.match(regexp);
    return dayMonthYearToString(+matcher[1], monthNameToNumber(matcher[2]), +matcher[3]);
}

function getNextElementText(elem) {
    return elem.nextElementSibling.textContent.trim();
}

function containsText( regexp ) {
    return querySelectorAll(document, "#Riverlines-Tour-Data tr td").find( td => {
        return td.textContent.match(regexp)
    });
}

function getHotelRowByImage(img) {
    var node = img.parentNode;
    while (node) {
        if ( node.tagName === "TR") {
            break;
        }
        node = node.parentNode;
    }
    return node;
}

function loadAsyncInfo(img) {
    var func = img.onclick;
    img.onclick = function (event) {
        var tr = getHotelRowByImage(img);
        if ( tr.getAttribute("thumb") && tr.getAttribute("comment") ) {
            img.onclick = func;
            img.onclick(event);
            return;
        }
        simulateMouseEvent(tr.querySelector(".Riverlines-CabinGroup"), "click");
        var count = 0;
        var intervalId = setInterval(function () {
            if ( ++count >= 50 || ( tr.getAttribute("thumb") && tr.getAttribute("comment")) ) {
                img.onclick = func;
                clearInterval(intervalId);
                simulateMouseEvent(document.querySelector("#Riverlines-Dialog-Theme button"), "click");
                img.onclick(event);
                return;
            }
            var iframe = document.querySelector("#Riverlines-Dialog");
            if ( !iframe ) {
                return;
            }
            var imgage = iframe.querySelector("li img");
            var text = iframe.textContent.trim();
            if ( text ) {
                tr.setAttribute("comment", text);
            }
            if ( imgage ) {
                var src = imgage.src;
                tr.setAttribute("thumb", src);
            }
        }, 50);
    };
    return img;
}