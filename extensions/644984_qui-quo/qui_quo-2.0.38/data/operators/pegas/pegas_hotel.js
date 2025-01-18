window.OPERATOR_NAME = "Pegas";
window.OPERATOR_SLETAT_ID = undefined;
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    const checkinDt = document.querySelector("#check-in-date");
    const checkoutDt = document.querySelector("#check-out-date");

    if ( !checkinDt || !checkoutDt ) {
        return null;
    }

    const nights = getDistance(dayMonthYearToDate(checkinDt.value), dayMonthYearToDate(checkoutDt.value));
    const occupancy = getOccupancy();

    return {
        "occupancy": occupancy,
        "date": checkinDt.value,
        "nights" : nights.toString()
    };
}

function getSearchButton() {
    return document.querySelector("#search-button");
}

function injectData() {
    querySelectorAll(document, ".price-div").forEach( div => {
       if ( !div.parentNode.querySelector(".qq") ) {
           const btns = qqBtns({align: "qq-box"});
           const ratingBtn = btns.querySelector('.qq-rating-btn');
           if ( ratingBtn ) {
               ratingBtn.style.cssText = `
               background: none;
               border: none;
               padding: 0;
               width: 48px;
               height: 24px;
               font-weight: bold;
               text-align: center;
               font-size: 14px;
               cursor: pointer;
               line-height: 2em;
               text-decoration: underline;`
           }
           div.append(btns);
       }
    });
}

function createOption(img) {
    const hotel = getHotelRowByImage(img);
    const region =  getText(hotel.querySelector(".location")).split(",");
    const option = {
        checkinDt: SEARCH_CRITERIA.date,
        nights: SEARCH_CRITERIA.nights,
        hotelName: getText(hotel.querySelector(".hotel-link")),
        href: getNodeProperty(hotel.querySelector("a.hotel-link"), null, "href"),
        roomType:  getText(hotel.querySelector(".room-category-name")),
        region: lastElement(region).trim(),
        boardType:  getText(hotel.querySelector(".meal-name")),
        price: extractIntFromStr(getText(hotel.querySelector(".price")).replace(/\D+/g, "")),
        currency: mapCurrency(getText(hotel.querySelector(".symbol"))),
        country: region[0].trim(),
        city_from: "",
        thumbnail: getNodeProperty(hotel.querySelector(".main-image img"), null, "src"),
        occupancy: SEARCH_CRITERIA.occupancy,
        comment: getNodeProperty(hotel.querySelector(".hotel-info"), "").replace(/\s+/g, " ")
    }
    return option;
}

function getOccupancy() {
    const occupancyForms = querySelectorAll(document, "#hotel-accommodation-editor .hotel-accommodation-list-item:not(.hotel-accommodation-list-item--add-room)");
    if ( occupancyForms.length === 0 ) {
        return null;
    }
      return occupancyForms.reduce(parseOccupancyForm, null);
}

function parseOccupancyForm(initialObj, form) {
    if ( !initialObj ) {
        initialObj = {
            adultsCount: 0,
            childrenCount: 0,
            childAges: null
        }
    }
    const accRows = querySelectorAll(form, '.hotel-accommodation-list-item__row');
    const [adults] = searchAccommodation(accRows, '.hotel-accommodation-list-item__age-label--adult');
    if ( !adults || !adults.match(/\d/) ) {
        return initialObj;
    }
    initialObj.adultsCount = initialObj.adultsCount + extractIntFromStr(adults);

    const [kids] = searchAccommodation(accRows, '.hotel-accommodation-list-item__age-label--child');

    if ( kids && kids.match(/\d/) ) {
        const kidsCount = extractIntFromStr(kids);
        initialObj.childrenCount = initialObj.childrenCount + kidsCount;
        if ( kidsCount > 0 ) {
            const ages = querySelectorAll(form, ".hotel-accommodation-list-item__age").map(age => age.value).join();
            initialObj.childAges = initialObj.childAges ? [initialObj.childAges, ages].join() : ages;
        }
    }
    return initialObj;
}

function searchAccommodation(accRows, selector) {
    return accRows.filter( row => row.querySelector(selector))
                  .map(row => getNodeProperty(row.querySelector(".selectBox-label")));
}

function mapCurrency(c) {
    switch (c.toLowerCase()) {
        case "$":
            return "USD";
        case "€":
            return "EUR";
        case "р.":
            return "RUB";
    }
    return c;
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (true) {
        if (div.classList.contains("search-result-hotel-row") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}