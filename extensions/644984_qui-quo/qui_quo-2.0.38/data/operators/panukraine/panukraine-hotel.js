var OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || "panukraine" : "panukraine";

function initializeSearchCriteria() {
    var occupancy = getOccupancy();
    if ( !occupancy ) {
        return null;
    }
    return {
        occupancy : occupancy
    };
}

function getSearchButton() {
    return document.querySelector(".submit-button");
}

function injectData() {
    var divs = querySelectorAll(document, ".price-details .row .nw");
    divs.forEach(function (div) {
        if (!div.querySelector(".qq")  ) {
            div.appendChild(qqBtns());
        }
    });
}

function createOption(img) {
    var hotel = getHotelRowByImage(img);
    var row = img.parentNode.parentNode.parentNode;
    var divs = row.querySelectorAll("div");
    const currencyText = getNodeData(".price", row).replace(/\d+|\s+|\./g, '');
    var option = {
        checkinDt: getDate(hotel),
        nights: getNights(hotel),
        hotelName: getHotelName(hotel),
        href: hotel.querySelector("span[itemprop='name']").parentNode.href,
        roomType: divs[0].querySelector("b").textContent.trim(),
        region:  getRegion(hotel),
        boardType:  divs[0].querySelector("div").textContent.trim(),
        price: extractIntFromStr(row.querySelector(".price b").textContent),
        currency: mapCurrencyUtil(currencyText),
        country: getCountry(),
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: getImg(hotel),
        occupancy: getOccupancy()
    };
    return option;
}

function getDate(hotel) {
    var dateText = getNodeData(".col-md-2.small", hotel) || getText(hotel).match(getRegexPatterns().date).join('—');
    return dateText.split("—")[0].trim();
}

function getNights(hotel) {
    var dateText = getNodeData(".col-md-2.small", hotel) || getText(hotel).match(getRegexPatterns().date).join('—');
    var chDate =  dateText.split("—")[0].trim();
    var outDate =  dateText.split("—")[1].trim();
    return getDistance(dayMonthYearToDate(chDate), dayMonthYearToDate(outDate)).toString();
}

function getHotelName(hotel) {
    var stars = hotel.querySelector(".hotel-stars");
    if ( !stars ) {
        return hotel.querySelector("span[itemprop='name']").textContent;
    }
    return stars.previousElementSibling.textContent + " " + stars.querySelectorAll(".fa-star").length + "*";
}

function getImg(hotel) {
    var url = hotel.querySelector(".hotel-image img");
    return url ? url.src : null;
}

function getCountry() {
    var country = document.querySelector(".navbar-header .title a");
    return country ? country.textContent.trim() : "";
}

function getRegion(hotel) {
    var region = document.querySelector(".navbar-header .small");
    var address =  hotel.querySelector(".address");
    return region ? region.textContent.trim() : (address ? address.textContent.trim() : "");
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (div) {
        if ( div.classList.contains("result") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 2,
        childrenCount: 0,
        childAges: null
    };

    occupancy.adultsCount = extractOptionalInt(selectedOption(document.querySelector("#adts")));
    occupancy.childrenCount = extractOptionalInt(selectedOption(document.querySelector("#kds")));
    if (occupancy.childrenCount > 0) {
        var age = querySelectorAll(document, "#child_ages_1, #child_ages_2, #child_ages_3, #child_ages_4, #child_ages_5, #child_ages_6")
            .filter(function (div) {
                return div.style.display !== "none";
            })
            .map(function (select) {
                return extractOptionalInt(selectedOption(select));
            })
            .filter(function (val) {
                return val !== null;
            });
        occupancy.childAges = age.join(",");
    }
    return occupancy;
}
