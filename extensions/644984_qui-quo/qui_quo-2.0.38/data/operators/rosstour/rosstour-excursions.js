var OPERATOR_NAME = "РоссТур";


function getSearchButton() {
    return document.querySelector("#div_btnb a");
}

function initializeSearchCriteria() {
    var country = getCountry();
    if (!country)
        return null;

    var region = getRegion();
    if (!region)
        return null;

    var occupancy = getOccupancy();
    if (!occupancy)
        return null;

    return {
        "country": country,
        "region": region,
        "occupancy": occupancy
    };
}

function getCountry() {
    var c = document.querySelector(".selectric-rt_spo_box_header_country_select_ex p");
    return c ? c.textContent : "";
}

function getRegion() {
    var c = document.querySelector(".selectric-rt_spo_box_header_city_select p");
    return c ? c.textContent : "";
}


function injectData() {
    var trs = querySelectorAll(document, ".trs_item_info_price");
    trs.forEach(function (tr) {
        if (!tr.parentNode.querySelector(".qq")) {
            tr.parentNode.appendChild(createCell());
        }
    });
}

function createCell() {
    var newSpan = document.createElement("span");
    newSpan.appendChild(createAddButton());
    newSpan.appendChild(createEditButton());
    newSpan.className = "qq";
    newSpan.style = "display: inherit";
    return newSpan;
}


function createOption(img) {
    var tour_page = getHotelRowByImage(img);
    var items = querySelectorAll(tour_page, ".trs_item_info_list div");
    var option = {
        checkinDt: getDate(tour_page),
        hotelName: tour_page.querySelector(".trs_item_name a").textContent,
        href: "",
        region: SEARCH_CRITERIA.region,
        roomType: getRoomType(items),
        boardType: findItem(items, /вид/i).textContent,
        price: getPrice(tour_page),
        currency: mapCurrency(),
        nights: getNights(findItem(items, /продолжительность/i)),
        country: SEARCH_CRITERIA.country,
        city_from: "",
        thumbnail: getThumbnail(tour_page),
        excursion: true,
        occupancy: SEARCH_CRITERIA.occupancy
    };

    return option;
}

function getDate(tp) {
    return tp.querySelector(".days_of_the_day").textContent.match(/\d{2}.\d{2}.\d{4}/)[0];
}

function getNights(text) {
    if (text.textContent.match(/ч\./)) {
        return "1";
    }
    else {
        return extractIntFromStr(text.textContent).toString();
    }
}

function getRoomType(items) {
   var type =  findItem(items, /тип/i).textContent.replace(/тип:/i, "").trim() === "" ? "" : findItem(items, /тип:/i).textContent;
   var place =  findItem(items, /Место встречи:/i).textContent.replace(/Место встречи:/i, "").trim() === "" ? "" : ", " + findItem(items, /Место встречи:/i).textContent;
   var duration = findItem(items, /Продолжительность:/i).textContent.replace(/Продолжительность:/i, "").trim() === "" ? "" : ", " + findItem(items, /Продолжительность:/i).textContent;
   return type + place + duration;
}

function getPrice(tp) {
    var code = document.querySelector(".form_currency .active").getAttribute("code");
    return extractIntFromStr(tp.querySelector("span[code='"+ code +"']").textContent);
}

function mapCurrency() {
    var text = document.querySelector(".form_currency .active").getAttribute("code");
    switch (text.toUpperCase()) {
        case "EUR":
            return "EUR";
        case "RUR":
            return "RUB";
        case "USD":
            return "USD";
        default:
            return text;
    }
}

function getThumbnail(tr) {
    var image = tr.querySelector(".imslider img");
    return image ? image.src : null;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    occupancy.adultsCount = extractOptionalInt(document.querySelector(".selectric-rt_spo_box_body_other_select_adult p").textContent);
    occupancy.childrenCount = extractOptionalInt(document.querySelector(".selectric-rt_spo_box_body_other_select_child p").textContent);
    if (occupancy.childrenCount && occupancy.childrenCount > 0) {
        var ages = [];
        for (var i = 0; i < occupancy.childrenCount; i++) {
            ages.push(selectedOption(document.querySelector("select[name='childages[" + i + "]']")));
        }
        occupancy.childAges = ages.join(",");
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    var tr = img.parentNode;
    while (true) {
        if (tr.className === "trs_items") {
            break;
        }
        tr = tr.parentNode;
    }
    return tr;
}

function findItem(items, title) {
    var desc = items.find(function (item) {
        if (item.textContent.match(title)) {
            return true;
        }
        return false;
    });
    return desc ? desc : null;
}