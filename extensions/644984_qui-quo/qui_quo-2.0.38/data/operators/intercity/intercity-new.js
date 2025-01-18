var OPERATOR_NAME = "ИНТЕРСИТИ";
var OPERATOR_SLETAT_ID = 122;
var OPERATOR_CURRENCY = "Intercity";
var DEFAULT_CURRENCY = "BYN";

function initializeSearchCriteria() {
    var country = document.querySelector("#f-country_name-text");
    if ( !country ) {
        return null;
    }
    var city = document.querySelector("#filter-depart_from");
    if ( !city ) {
        return null;
    }
    var occupancy = getOccupancy();
    if ( !occupancy ) {
        return null;
    }
    return {
        country : country.textContent,
        city : selectedOption(city),
        occupancy : occupancy
    };
}

function getSearchButton() {
    return querySelectorAll(document, "#filter-button_submit, .area_link.filter-state_change");
}

function injectData() {
    injectCurrencySelection();
    injectDataShort();
    injectDataFull();
}

function injectDataShort() {
    var table = document.querySelector("#catalog-table_result");
    var head = table ? table.querySelector("thead tr") :null;
    if (head !== null && head.querySelector(".qq") === null) {
        head.appendChild(createHeaderCell());
    }

    querySelectorAll(table, "#catalog-offers_list tr").forEach(function (tr) {
        if (tr !== null && tr.querySelector(".qq") === null ) {
            tr.appendChild(createCellShort());
        }
    });
}

function injectDataFull() {
    var offers = document.querySelector("#catalog-offers_list");
    if ( !offers ) {
        return null;
    }
    querySelectorAll(offers, ".pseudo_cell.offers_additional_col").forEach(function (div) {
        if ( div.querySelector(".qq") === null ) {
            var emptyDiv = document.createElement("div");
            emptyDiv.style = "height: 20px";
            emptyDiv.className = "qq";
            div.appendChild(emptyDiv);
            div.appendChild(createCellFull());
        }
    });
}

function createHeaderCell() {
    var th = document.createElement("th");
    th.className = "qq";
    th.appendChild(document.createTextNode("QQ"));
    return th;
}

function createCellShort() {
    var newTd = document.createElement("td");
    newTd.appendChild(createAddButton(createOptionShort));
    newTd.appendChild(createEditButton(createOptionShort));
    newTd.style = "width: 60px";
    newTd.className = "qq";
    return newTd;
}

function createCellFull() {
    var newDiv = document.createElement("div");
    newDiv.appendChild(createAddButton(createOptionFull));
    newDiv.appendChild(createEditButton(createOptionFull));
    newDiv.className = "qq";
    return newDiv;
}

function createOptionShort(img) {
    var tr = getHotelRowByImage(img);
    var tds = tr.querySelectorAll("td");
    var option = {
        checkinDt: tr.querySelector(".offers_date.tour_variant_offers_date").textContent,
        nights: tr.querySelector(".offers_departure").textContent.match(/\d+/)[0],
        hotelName: tr.querySelector(".offers_hotel").textContent,
        href: tr.querySelector(".offers_hotel a").href,
        roomType: getRoomType(tr)[0],
        region: getCountry(tr, ".offers_resort")[1],
        boardType: getRoomType(tr)[1],
        price: getPrice(tr)[0],
        currency: getPrice(tr)[1],
        country: getCountry(tr, ".offers_resort")[0],
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getImgShort(tr),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}


function createOptionFull(img) {
    var hotel = getHotelRowByImage(img);
    var option = {
        checkinDt: getDate(hotel),
        nights: (hotel.querySelector(".offers_term").textContent.match(/\d+/)[0]-1).toString(),
        hotelName: hotel.querySelector(".offers_name").textContent,
        href: hotel.querySelector(".offers_name_link").href,
        roomType: hotel.querySelector('.offers_detail').innerText.split("\n")[1],
        region: getCountry(hotel, ".offers_descr .gray_link.offers_descr_link")[1],
        boardType: hotel.querySelector('.offers_detail').innerText.split("\n")[0],
        price: getPrice(hotel)[0],
        currency: getPrice(hotel)[1],
        country: getCountry(hotel, ".offers_descr .gray_link.offers_descr_link")[0],
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getImg(hotel),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getDate(hotel) {
    var date = hotel.querySelector(".offers_date").textContent.match(/(\d\d)\.(\d\d)/);
    return appendYear(extractIntFromStr(date[1]), extractIntFromStr(date[2]));
}

function getRoomType(tr) {
    var splitter = tr.querySelector(".offers_room").textContent.split(",");
    var room = [];
    var board = [];
    splitter.forEach(function (word, index) {
        if ( index < 2 ) {
            room.push(word.trim());
        }
        if ( index > 1 ) {
            board.push(word.trim());
        }
    });
    return [room.join(", "), board.join(", ")];
}

function getCountry(tr, sel) {
    var resort = tr.querySelectorAll(sel);
    return [resort.length > 0 ? resort[0].textContent.trim() : SEARCH_CRITERIA.country,
            resort.length > 1 ? resort[1].textContent.trim() : ""];
}

function getPrice(tr) {
    var selected = document.querySelector("#qq-currency select");
    var currency = new RegExp('\\' + selected.value + '\\s+(\\d+)');
    var price = ( isPrefferedDefaultCurrency() ) ? tr.querySelector(".price.offers_price").textContent
                                                 : tr.querySelector(".foreign_price").textContent.match(currency)[1];
    return [extractIntFromStr(price.replace(/\s+/g,"")), selectedOption(selected)];
}

function getImgShort(tr) {
    var a = tr.querySelector(".offers_hotel a");
    if ( !a ) {
        return null;
    }
    var temp = document.createElement("div");
    temp.innerHTML = a.getAttribute("data-content");
    var image = temp.querySelector(".img_box img");
    var src =  image ? image.src : null;
    temp.remove();
    return src;
}

function getImg(hotel) {
    var image = hotel.querySelector(".img_box img");
    return image ? image.src : null;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var adults = querySelectorAll(document, '[name="adults"]').find(function (adult) {
        return adult.checked;
    });
    var children = querySelectorAll(document, '[name="children"]').find(function (adult) {
        return adult.checked;
    });
    if ( !adults || !children || adults.value === 0 ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adults.value);
    occupancy.childrenCount = extractIntFromStr(children.value);
    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = document.querySelector('[name="children_ages"]').getAttribute("data-children_ages");
    }
    return occupancy;

}

function getHotelRowByImage(img) {
    var tr = img.parentNode;
    while (true) {
        if (tr.tagName === "TR" || tr.className === "pseudo_table offers_inner") {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}

function injectCurrencySelection() {
    if( document.querySelector("#qq-currency") ) {
        return;
    }
    addCurrencySelection();
    addAddonMessageListener("Intercity currency", function(currency) {
        document.querySelector("#qq-currency select").value = currency ? currency : DEFAULT_CURRENCY;
        document.querySelector("#qq-currency").setAttribute("style", "display: block;height: 22px;");
    });
    sendMessageToAddon("get operator currency", OPERATOR_CURRENCY);
}

function addCurrencySelection() {
    var div = document.createElement("div");
    div.id = "qq-currency";
    div.className = "polar_transp_back";


    var legend = document.createElement("legend");
    legend.setAttribute("style", "width:auto;float:left;margin-right:6px;margin-left: 6px;font-size: 14px;font-family: PF DinText Pro;margin-top: 2px;color: white;");
    legend.innerHTML = "Выберите предпочитаемую валюту для <span style=\"color:red;\">Q</span>ui-<span style=\"color:red;\">Q</span>uo:";
    div.appendChild(legend);

    var select = document.createElement("select");
    select.setAttribute("style", "margin-top:-3px;");
    select.onchange = function () {
        sendMessageToAddon("set operator currency", {operator: OPERATOR_CURRENCY, currency: select.value});
    };

    var defaultCurr = document.createElement("option");
    defaultCurr.value = DEFAULT_CURRENCY;
    defaultCurr.textContent = DEFAULT_CURRENCY;
    select.appendChild(defaultCurr);

    var foreign = document.createElement("option");
    foreign.value = "$";
    foreign.textContent = "USD";
    select.appendChild(foreign);
    foreign = document.createElement("option");
    foreign.value = "€";
    foreign.textContent = "EUR";
    select.appendChild(foreign);

    div.appendChild(select);
    var offset = document.querySelector("#catalog-table_result, #catalog-offers_list");
    offset ? offset.before(div) : null;
}

function isPrefferedDefaultCurrency() {
    var sel = document.querySelector("#qq-currency select");
    return !sel || (sel.value !== "$" && sel.value !== "€");
}