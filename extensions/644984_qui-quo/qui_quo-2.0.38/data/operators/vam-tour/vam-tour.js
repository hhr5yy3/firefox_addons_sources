const OPERATOR_NAME = "V.A.M Tour";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    let trTitle = document.querySelector(".tr_title");
    if( !trTitle ) {
        return;
    }

    if( !trTitle.querySelector(".qq") ) {
        trTitle.append(createCell(true));
    }

    querySelectorAll(trTitle.parentNode, "tr:not(.tr_title)").forEach(tr => {
        if( !tr.querySelector(".qq") ) {
            tr.append(createCell(false));
        }
    });
}

function createCell(head = false) {
    let newTd = document.createElement("td");
    newTd.classList.add("qq");
    newTd.classList.add("tdleft");
    if ( head === false ) {
        newTd.append(qqBtns({align: "horizontal"}));
    } else {
        newTd.textContent = "QQ";
    }
    return newTd;
}

function createOption(img) {
    let row = getHotelRowByImage(img);
    let tds = querySelectorAll(row, "td");
    let trTitle = document.querySelector(".tr_title");
    let ths = querySelectorAll(trTitle, "td");
    let dest = document.querySelector(".selected_dest");
    let roomAndBoard = getNodeProperty(tds[findIndex(ths, /Размещение/i)]);
    let board = roomAndBoard.match(/([A-Z]\/[A-Z]\+?)\s+\(/) || "";
    let option = {
        checkinDt: makeYear4Digits(getNodeProperty(tds[findIndex(ths, /Дата\s+вылета/i)]).match(/\d{2}.\d{2}.\d{2}/)[0]),
        nights: getNodeProperty(tds[findIndex(ths, /Ночей/i)]),
        hotelName: getNodeProperty(tds[findIndex(ths, /Отель|Программа/i)]),
        href: getNodeProperty(tds[findIndex(ths, /Отель|Программа/i)].querySelector("a"), null, "href"),
        roomType: roomAndBoard.replace((board[1] || ""), "").replace(/\s+/g, " "),
        region: getNodeProperty(tds[findIndex(ths, /Регион/i)]),
        boardType: board[1] || "",
        price: getNodeProperty(tds[findIndex(ths, /Итого/i)], "").replace(/\D+/g, ""),
        currency: mapCurrency(ths[findIndex(ths, /Итого/i)]),
        country: dest.childNodes[3].textContent,
        city_from: dest.childNodes[5].textContent.replace(/\d{2}.\d{2}.\d{4}/, "").trim(),
        operator: OPERATOR_NAME,
        excursion: dest.childNodes[3].textContent.match(/Экск. тур/i) ? true : false,
        thumbnail: null,
        occupancy: getOccupancy(dest)
    };
    return option;
}

function mapCurrency(currency) {
    if ( currency.textContent.match(/Руб/i) ) {
        return "RUB"
    }
    return currency.textContent.split(",") > 0 ? [1] : currency.textContent;
}

function getOccupancy(dest) {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    let formText = getNodeProperty(dest, ``);
    let adults = formText.match(/взрослых:\s+(\d+)/i);
    let kids = formText.match(/детей:\s+(\d+)/i);
    let ages = formText.match(/детей:\s+\d+\s+\((.+)\)/i);
    occupancy.adultsCount = adults ? +adults[1] : null;
    occupancy.childrenCount = kids ? +kids[1] : 0;
    occupancy.childAges = ages ? ages[1].replace(/лет|\s+/ig,"") : null;
    if ( !occupancy.adultsCount ) {
        return null;
    }
    return occupancy;
}

function findIndex(ths, caption) {
    return ths.findIndex(function (th) {
        if ( th.innerText.match(caption) ) {
            return true;
        }
        return false;
    });
}

function getHotelRowByImage(img) {
    let elem = img.parentNode;
    while (elem) {
        if (elem.tagName === "TR") {
            break;
        }
        elem = elem.parentNode;
    }
    return elem;
}