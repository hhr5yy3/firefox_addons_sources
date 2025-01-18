var OPERATOR_NAME = "PAC GROUP";
var showTopHotelsRating = false;

function initializeSearchCriteria() {
    var checkin = getNodeProperty(document.querySelector("#lbCheckin"));
    var checkout = getNodeProperty(document.querySelector("#lbCheckout"));
    var region = getNodeProperty(document.querySelector("#SearchForm_LocationName"), "", "value");
    var country = lastElement(region.split(","));
    if ( !checkin || !checkout ) {
        return null;
    }

    return {
        checkin: checkin,
        checkout: checkout,
        country: country,
        region: region.replace(country, "").replace(/,$/, "")
    };
}

function getSearchButton() {
    return document.querySelector("#accommodationResultSearchSubmit");
}

function injectData() {
    if ( !SEARCH_CRITERIA ) {
        return null;
    }
    querySelectorAll(document, ".offer-variant").forEach(tr => {
        if ( !tr.querySelector(".qq") ) {
            createCell(tr);
        }
    });
    querySelectorAll(document, ".offer-variants tbody th").forEach( th => {
        var tr = th.parentNode;
        if (!tr.querySelector(".qq") ) {
            createHeadCell(tr);
        }
    })
}

function createCell(tr) {
    var newTd = document.createElement("td");
    newTd.classList.add("qq");
    newTd.append(qqBtns({align: "qq-box"}));
    newTd.style.verticalAlign = "middle";
    tr.append(newTd);
}

function createHeadCell(tr) {
    var newTh = document.createElement("th");
    newTh.classList.add("qq");
    newTh.textContent = "QQ";
    newTh.style.textAlign = "center";
    tr.append(newTh);
}

function createOption(img) {
    var hotel = getHotelRowByImage(img);
    var tr = img.parentNode.parentNode.parentNode;
    var tds = querySelectorAll(tr, "td");
    var priceNode = tr.querySelector(".price:not(.netto-price) .js-money");
    var option = {
        checkinDt: SEARCH_CRITERIA.checkin,
        nights: getDistance(dayMonthYearToDate(SEARCH_CRITERIA.checkin), dayMonthYearToDate(SEARCH_CRITERIA.checkout)) + "",
        hotelName: getText(hotel.querySelector(".hotel .name")),
        href: getNodeProperty(hotel.querySelector(".hotel .name a"), null, "href"),
        country: SEARCH_CRITERIA.country,
        region: SEARCH_CRITERIA.region,
        roomType: getText(tds[1]),
        boardType: getText(tds[2]),
        price: extractIntFromStr(getText(priceNode).replace(/\s+/g, "")),
        currency: priceNode.dataset.moneyCurrent,
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(hotel.querySelector(".photo img"), null, "src"),
        occupancy: getOccupancy(tr.parentNode.parentNode.previousElementSibling)
    };
    return option;
}

function getOccupancy(node) {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
   var paramsText = getNodeProperty(node);
   if ( !paramsText ) {
       return null;
   }
    occupancy.adultsCount = extractIntFromStr((paramsText.match(/(\d+)\s*взр/) || "00")[1]);
    occupancy.childrenCount = extractIntFromStr((paramsText.match(/(\d+)\s*реб/) || "00")[1]);;
    if ( !occupancy.adultsCount  ) {
        return null;
    }

    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = paramsText.match(/\(.+\)/);
        if ( occupancy.childAges ) {
            occupancy.childAges = occupancy.childAges[0].match(/\d+/g);
            occupancy.childAges ? occupancy.childAges = occupancy.childAges.join(",") : null;
        }
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (div) {
        if ( div.classList && div.classList.contains("offer") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}