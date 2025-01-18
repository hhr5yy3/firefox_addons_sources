const OPERATOR_NAME = "Well/Putevkamarket";
const showTopHotelsRating = true;

function initializeSearchCriteria() {
    const country = document.querySelector(".wts-form-control-country input");
    const cityFrom = document.querySelector(".wts-form-control-departure input");
    return {
        country: country ? country.value : "",
        cityFrom: cityFrom ? cityFrom.value : "",
        occupancy: getOccupancy()
    };
}

function getSearchButton() {
    return querySelectorAll(document, ".wts-form-submit, .wts-submit-clever, .wts-button-main");
}

function injectData() {
    querySelectorAll(document, ".wts-result .wts-result-hotel .wts-result-tour").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-box"}));
        }
    });
}

function createOption(img) {
    const hotel = getHotelRowByImage(img);
    const tour = img.closest(".wts-result-tour");
    return {
        checkinDt: getText(tour.querySelector(".wts-result-tour-flydate")),
        nights: getText(tour.querySelector(".wts-result-tour-dates .wts-small")).replace(/\D+/g, ""),
        hotelName: getHotelName(hotel),
        hotel_desc: getNodeProperty(hotel.querySelector(".wts-result-hotel-desc")),
        href: null,
        country: SEARCH_CRITERIA.country,
        region: getText(hotel.querySelector(".wts-small")),
        roomType: [getText(tour.querySelector(".wts-result-tour-room")), getText(tour.querySelector(".wts-result-tour-tourists"))].join(", "),
        boardType: getText(tour.querySelector(".wts-result-tour-meal")),
        price: extractIntFromStr(getText(tour.querySelector(".wts-price")).replace(/\D+/g, "")),
        currency: mapCurrencyUtil(getText(tour.querySelector(".wts-price .wts-small"))),
        city_from: SEARCH_CRITERIA.cityFrom,
        operator: getNodeProperty(tour.querySelector("a:not(.qq-rating-btn)")),
        thumbnail: getNodeProperty(hotel.querySelector(".wts-result-hotel-thumb img"), null, "src"),
        occupancy: SEARCH_CRITERIA.occupancy
    };
}

function getHotelName(hotel) {
    const caption = getText(hotel.querySelector(".wts-result-hotel-title"));
    const rate = querySelectorAll(hotel,".wts-result-hotel-rate .wts-star:not(.wts-star-unchecked)");
    return `${caption} ${rate.length > 0 ? rate.length+"*" : ""}`.trim();
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    try {
        const touristsLabel = querySelectorAll(document, ".wts-form-control-tourists .wts-tourist-calc-value");
        const adults = getNodeProperty(touristsLabel.find(value => getNodeProperty(value.parentNode.parentNode).match(/взрослых/i)));
        const kids = getNodeProperty(touristsLabel.find(value => getNodeProperty(value.parentNode.parentNode).match(/детей/i)));
        if ( !adults ) {
            return null;
        }
        occupancy.adultsCount = extractIntFromStr(adults);
        occupancy.childrenCount = kids ? extractIntFromStr(kids) : 0;
        if ( occupancy.childrenCount > 0 ) {
            occupancy.childAges = querySelectorAll(document, "select.wts-child-select").map(select => selectedOption(select).replace(/\s+/g, "")).join();
        }
        return occupancy;
    } catch (e) {
        return null;
    }
}

function getHotelRowByImage(img) {
    return img.closest(".wts-result-hotel");
}
