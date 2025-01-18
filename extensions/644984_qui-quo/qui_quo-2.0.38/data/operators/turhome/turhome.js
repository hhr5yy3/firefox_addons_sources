var OPERATOR_NAME = "Turhome";

function initializeSearchCriteria() {
    var board = getBoardType();
    if ( !board ) {
        return null;
    }

    var occupancy_prices = getOccupancy()[0];
    var occupancy_promo = getOccupancy()[1];
    if ( !occupancy_prices || !occupancy_promo) {
        return null;
    }
    return {
        "board" : board,
        "occupancy_prices" : occupancy_prices,
        "occupancy_promo" : occupancy_promo
    };
}

function getSearchButton() {
    return Array.fromList(document.querySelectorAll(".srch-btn"));
}

function injectData() {
    trsInject( document.querySelectorAll("#tprices_result .wizTable tbody tr"));
    trsInject(document.querySelectorAll("#bundles_result .wizTable tbody tr"));
    function trsInject(trs) {
        for ( var i = 1; i < trs.length; i++) {
            if ( !trs[i].querySelector(".qq") ) {
                trs[i].appendChild(createCell());
            }
        }
        if ( trs[0] && !trs[0].querySelector(".qq") ) {
            trs[0].appendChild(createHeaderCell());
        }
    }
   var promo =  document.querySelector(".h-detail-r .editComand");
    if ( promo && !promo.querySelector(".qq") ) {
        promo.appendChild(createCellPromo());
    }
}

function createCell() {
    var newTd = document.createElement("td");
    newTd.appendChild(createAddButton());
    newTd.appendChild(createEditButton());
    newTd.className = "qq";
    return newTd;
}


function createCellPromo() {
    var newDiv = document.createElement("div");
    newDiv.appendChild(createAddButton(createOptionPromo));
    newDiv.appendChild(createEditButton(createOptionPromo));
    newDiv.className = "qq";
    newDiv.style = 'text-align:right; float:right';
    return newDiv;
}

function createHeaderCell() {
    var newTh = document.createElement("th");
    newTh.appendChild(document.createTextNode("QQ"));
    newTh.className = "qq";
    return newTh;
}

function createOption(img) {
    var tr = getHotelRowByImage(img);
    var tds = tr.querySelectorAll("td");
    var option = {
        checkinDt :getDate(tds[0].textContent, tds[1].textContent),
        nights : getNights(tds[2].textContent),
        extra_nights: extractExtraNights(tds[0].textContent,tds[1].textContent),
        hotelName : getHotelName(),
        href : window.location.href,
        roomType: getRoomType(tds[3]),
        region : getRegion(),
        boardType : document.querySelector("#tprices-tab").className !== "active" ? "Нет данных" : SEARCH_CRITERIA.board,
        price : getPrice(tds[4]),
        currency : getCurrency(tds[4]),
        country:  getCountry(),
        city_from: getCity(tds[0], tr),
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getImg(),
        occupancy : document.querySelector("#tprices-tab").className !== "active" ? SEARCH_CRITERIA.occupancy_promo : SEARCH_CRITERIA.occupancy_prices
    };
    return option;
}

function getDate(td0, td1) {
    if ( !td0 || td0 === "") {
        return td1.match(/\d{2}.\d{2}.\d{4}/)[0];
    }
    return td0.match(/\d{2}.\d{2}.\d{4}/)[0];
}

function getNights(td) {
    return td.trim();
}

function extractExtraNights(td0, td1) {
    if ( ! td0 || td0 === "" ) {
        return "0";
    }
    var date = dayMonthYearToDate(td1.match(/\d{2}.\d{2}.\d{4}/)[0]);
    var date_dep = dayMonthYearToDate(td0.match(/\d{2}.\d{2}.\d{4}/)[0]);
    return getDistance(date_dep, date).toString();
}

function getHotelName() {
    var title = document.querySelector(".page-title");
    var stars = querySelectorAll(title, "li img").filter( function (star) {
        return star.src === "http://miramar.turhome.com/img/rating-b.png";
                                                         }).length;
    return title.textContent.trim() + " " + stars +"*";
}

function getRoomType(td) {
    return td.textContent.trim();
}

function getRegion() {
    return document.querySelector(".titleInfo").textContent.split(",")[1].trim();
}

function getBoardType() {
    return selectedOption(document.querySelector("select[name='ht_fltr_8']"));
}

function getPrice(td) {
    return extractIntFromStr(td.textContent.replace(/s+/g,""));
}

function getCurrency(td) {
    return td.textContent.replace(/\d+/g,"").trim();
}


function getCountry() {
    return document.querySelector(".titleInfo").textContent.split(",")[0].trim();
}

function getCity(td, tr) {
    if ( td.textContent === "" ) {
        return "";
    }
    return tr.parentNode.querySelector("tr").querySelector("th").textContent.replace("Выезд","").trim();
}

function getImg() {
    var image = document.querySelector(".tab-gallery-big img");
    return image ? image.src : null;
}


function createOptionPromo(img) {
    var items = querySelectorAll(document, ".comandInfo li");
    var option = {
        checkinDt :getDate(findItem(items, "Дата выезда из"), findItem(items, "Дата заезда в отель")),
        nights : getNights(findItem(items, "Ночей:")),
        extra_nights: extractExtraNights(findItem(items, "Дата выезда из"), findItem(items, "Дата заезда в отель")),
        hotelName : getHotelName(),
        href : window.location.href,
        roomType: findItem(items, "Тип номера:"),
        region : getRegion(),
        boardType : findItem(items, "Питание:"),
        price : getPrice(document.querySelector(".priceInfo b")),
        currency : getCurrency(document.querySelector(".priceInfo b")),
        country:  getCountry(),
        city_from: findItem(items, "Дата выезда из") ? findItem(items, "Дата выезда из").split(":")[0] : "",
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getImg(),
        occupancy : getOccupancyPromo(findItem(items, "Размещение:"))
    };
    return option;
}



function getOccupancy() {
    var occupancy_prices = computeOccupancy("#tprices_search_form","#child_box");
    var occupancy_promo = computeOccupancy("#bundles_search_form","#child_box_1");

    function computeOccupancy(selCounts,selChild) {
        var occupancy = {
            adultsCount: 0,
            childrenCount: 0,
            childAges: null
        };
        occupancy.adultsCount = extractOptionalInt(selectedOption(document.querySelector(selCounts + " select[name='ht_fltr_10']")));
        occupancy.childrenCount = extractOptionalInt(selectedOption(document.querySelector(selCounts + " select[name='ht_fltr_11']")));
        if ( !occupancy.childrenCount ) {
            occupancy.childrenCount = 0;
        }
        if ( occupancy.childrenCount > 0 ) {
            var ageInputs = document.querySelectorAll(selChild+ " select");
            var ages = [];
            for (var i = 0; i < occupancy.childrenCount; i++) {
                var age = selectedOption(ageInputs[i]);
                if ( age === null ) {
                    return;
                }
                ages.push(age);
            }
            occupancy.childAges = ages.join(",");
        }
        return occupancy;
    }

    return [occupancy_prices , occupancy_promo];
}


function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (true) {
        if ( div.tagName === "TR") {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

function getOccupancyPromo(text) {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    occupancy.adultsCount = extractIntFromStr(text.match(/(\d+)\s+взр/)[1]);
    occupancy.childrenCount = text.match(/(\d+)\s+реб/) ? extractIntFromStr(text.match(/(\d+)\s+ht,/)[1]) : 0;
    return occupancy;
}

function findItem(items, title) {
    var desc = items.find(function (item){
        if ( item && item.textContent.match(title)) {
            return true;
        }
        return false;
    });
    return desc ? desc.textContent.replace(title,"").trim() : null;
}