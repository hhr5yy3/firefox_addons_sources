var OPERATOR_NAME = "Fiji-travel";

function initializeSearchCriteria() {
        return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    querySelectorAll(document, ".ResInfoTable tbody tr").forEach(tr => {
        if ( tr && tr.clientHeight !== 0  && !tr.querySelector(".qq") ) {
            var btn = tr.querySelector(".ResInfoButon");
            btn.closest("td").before(createCell());
            btn.style.marginTop = "0px";
        }
    });

    querySelectorAll(document, ".ResInfoTable thead tr").forEach(tr => {
        if ( tr && !tr.querySelector(".qq") ) {
            var price = tr.querySelector(".Price");
            price.after(createHeadCell());
        }
    });
}

function createCell() {
    var newTd = document.createElement("td");
    var nobr = document.createElement("nobr");
    newTd.className = "qq";
    nobr.append(createAddButton());
    nobr.append(createEditButton());
    newTd.append(nobr);
    return newTd;
}

function createHeadCell() {
    var newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.append(document.createTextNode("QQ"));
    newTd.style.width = "auto";
    return newTd;
}

function createOption(img) {
    var tr = getHotelRowByImage(img);
    var ths = querySelectorAll(tr.parentNode.parentNode, "thead tr td");
    var tds =querySelectorAll(tr, "td");
    var hotel = tr.parentNode.parentNode.parentNode.parentNode;
    var option = {
        checkinDt: getDate(tds[findIndex(ths, /Datums/i)]),
        nights: tds[findIndex(ths, /Naktis/i)].textContent.trim(),
        hotelName: getHotelName(hotel),
        href: hotel.querySelector(".HotelTitle  a").href,
        roomType: getRoomType(tds, ths),
        region: hotel.querySelector(".HotelTitle div").textContent.trim(),
        boardType: hotel.querySelector(".HotelTitle h2").textContent.trim(),
        price: extractIntFromStr(tds[findIndex(ths, /Cena/i)].textContent.trim()),
        currency: getCurrency(tds[findIndex(ths, /Cena/i)].textContent.trim()),
        country: '',
        city_from: 'Нет данных',
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getThumbnail(hotel),
        occupancy: ''
    };
    return option;
}

function getDate(td) {
   var date = td.textContent.match(/(\d{4})\.(\d{2})\.(\d{2})/);
   return [date[3], date[2], date[1]].join(".");
}

function getHotelName(hotel) {
    var title = hotel.querySelector(".HotelTitle  a");
    var name = title.textContent.trim();
    var star = title.querySelector(".HotelStar img");
    return star ? name + " " + star.alt : name;
}

function getRoomType(tds, ths) {
    var room = tds[findIndex(ths, /Numurs/i)].textContent.trim();
    var acc = tds[findIndex(ths, /Izmitināšana/i)].textContent.trim();
    return room + ", " + acc;
}

function getCurrency(price) {
    var curr = price.match(/EUR|USD|RUB/i);
    return curr ? curr[0] : curr.replace(/\d+|\s+|no/g, "");
}

function getThumbnail(hotel) {
    var image = hotel.querySelector(".Picture img");
    return image ? image.src : null;
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

function getHotelRowByImage(img) {
    var elem = img.parentNode;
    while (elem) {
        if ( elem.tagName === "TR" ) {
            break;
        }
        elem = elem.parentNode
    }
    return elem;
}
