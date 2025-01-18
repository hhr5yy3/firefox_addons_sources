var OPERATOR_NAME = "Mouzenidis";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return document.querySelector(".agents-search-footer-right .button.alternative");
}

function getCity() {
    var select = querySelectorAll(document, ".multiselect, [data-tag='select']").find(div => {
        var label = getNodeProperty(div.querySelector(".multiselect-label, .multiselect-label label, .Select-value-label"), "") ;
        var parent = div.parentNode;
        parent = parent ? getNodeProperty(parent.querySelector("label"), "") : "";
        return label.match(/Откуда|Звідки|From/i) || parent.match(/Откуда|Звідки|From/i) || div.closest('#ms-from-city');
    });
    var spanLabel = select ? select.querySelector(".Select-value-label") : null;
    if ( spanLabel ) {
        return getText(spanLabel);
    }
    return getNodeProperty(select, "");
}

function injectData() {
    querySelectorAll(document, ".agents-search-results-item-room").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            div.setAttribute("style", "flex: 0 0 10%;");
        }
    });
    querySelectorAll(document, ".agents-search-results-item .agents-search-results-item-quotas").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            div.after(createCell(createAgencyOption));
        }
    });

    querySelectorAll(document, ".agents-search-results-group .react-hotel-quotes").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            div.setAttribute("style", "flex: 0 0 11%;");
            div.after(createCell(createAgencyGroupedOption));
        }
    });
    querySelectorAll(document, ".react-hotel-quotes").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            div.setAttribute("style", "flex: 0 0 16%;");
            div.after(createCell(createOption));
        }
    });

}

function createCell(action) {
    var newDiv = document.createElement("div");
    newDiv.appendChild(createAddButton(action));
    newDiv.appendChild(createEditButton(action));
    newDiv.setAttribute("style", "flex: 0 0 2%;");
    newDiv.className = "qq";
    newDiv.style.display = "flex";
    return newDiv;
}


function createOption(img) {
    var hotelRow = getHotelRowByImage(img);
    var dateAndNights = getDateAndNights(hotelRow);
    var option = {
        checkinDt: dateAndNights.date,
        nights: dateAndNights.nights,
        hotelName: getHotelName(),
        href: window.location.href,
        roomType: getRoomType(hotelRow),
        region: getRegion(),
        boardType: hotelRow.querySelector(".react-hotel-meals div:not(.small)").textContent.trim(),
        price: getPrice(hotelRow),
        currency: getCurrency(hotelRow),
        country: getCountry(),
        city_from: getNodeProperty(document.querySelector(".hotel-page-search-depart-from span, .search-tours-from-city-container div"), ''),
        thumbnail: getNodeProperty(document.querySelector("img.rsMainSlideImage"), null, "src"),
        excursion: checkExcursion(hotelRow),
        comment: getComment(),
        hotel_desc: getComment()
    };
    return option;
}

function getDateAndNights(hotel) {
    var matcher = hotel.querySelector(".react-hotel-dates span, .agents-search-results-item-dates").textContent.match(/(\d+\.\d+).+?(\d+\.\d+)/);
    var [[dayIn, monthIn], [dayOut, monthOut]] = [matcher[1].split("."), matcher[2].split(".")];
    var checkIn = appendYear(+dayIn, +monthIn);
    var checkOut = appendYear(+dayOut, +monthOut);
    var nights = getDistance( dayMonthYearToDate(checkIn), dayMonthYearToDate(checkOut));
    return { date: checkIn, nights: nights.toString() }
}

function getHotelName() {
    var hotelName = getNodeProperty(document.querySelector("h1.name"));
    if ( hotelName ) {
        var stars = document.querySelector(".stars");
        var calcStars = stars ? stars.className.match(/s(\d+)/) : null;
        stars = calcStars ? " " + Math.floor(calcStars[1] / 2) + "*" : "";
        return hotelName + stars;
    }
    return document.querySelector(".block-heading .breadcrumb-item.active").textContent;
}

function getRoomType(hotelRow) {
    var div = hotelRow.parentNode;
    while (div) {
        if ( div.className === "hotel-tour-result-grouped" ) {
            break;
        }
        div = div.parentNode;
    }
    return div.querySelector(".hotel-room-type .title").textContent.trim();
}

function getRegion() {
    return querySelectorAll(document, ".hotel-general-info-list li").reduce((prVal, cur) => {
        var matcher = cur.textContent.match(/Регион|Город/i);
        if ( matcher ) {
            prVal.push(cur.textContent.replace(/Регион|Город/i, "").trim());
        }
        return prVal;
    }, []).join(", ");
}

function getPrice(hotel) {
    return extractIntFromStr(hotel.querySelector(".react-hotel-basket-link, .agents-search-results-item-price-button a").textContent.trim().replace(/\D+/g,""));
}

function getCurrency(hotel) {
    var icon = hotel.querySelector("#react-select-2--value-item, .agents-search-results-item-price-button a, .react-hotel-basket-link a").textContent;
    switch (icon.replace(/\d+/g,"").trim()) {
        case "euro-sign-custom": return "EUR";
        case "ruble-sign-custom": return "RUB";
        case "dollar-sign-custom": return "USD";
        case "EUR": return "EUR";
        case "RUR": return "RUB";
        case "USD": return "USD";
        case "KZT": return "KZT";
        case "UAH": return "UAH";
        default: return icon.replace(/\d+/g,"").trim();
    }
}

function checkExcursion(hotelRow) {
    var type = hotelRow.querySelector(".react-hotel-tourtype");
    if ( type && type.textContent.match("Экскурсионные туры") ) {
        return true;
    }
    return false;
}

function getCountry() {
    var flag = document.querySelector(".header-info .flag-icon");
    return flag ? flag.nextSibling.wholeText.trim() : "";
}

function getComment() {
    var desc = document.querySelector("#description");
    if ( !desc ) {
        return null;
    }
    return desc.textContent.trim().split("ОПЛАЧИВАЕТСЯ ДОПОЛНИТЕЛЬНО")[0].replace(/\n+/, "\n");
}

function createAgencyGroupedOption(img) {
    var hotelRow = getHotelRowByImage(img);
    var hotelItem = getHotelAgencyByImage(img);
    var dateAndNights = getDateAndNights(hotelRow);
    var regionAndCity = getAgencyGroupedRegion(hotelItem);
    var option = {
        checkinDt: dateAndNights.date,
        nights: dateAndNights.nights,
        hotelName: getAgencyGroupedHotelName(hotelItem),
        href: window.location.href,
        roomType: hotelRow.querySelector(".react-hotel-tourtype").lastElementChild.textContent.trim(),
        region: regionAndCity.region,
        boardType: hotelRow.querySelector(".react-hotel-meals div:not(.small)").textContent.trim(),
        price: getPrice(hotelRow),
        currency: getCurrency(hotelRow),
        country:  getAgencyCountry(hotelItem),
        city_from: regionAndCity.city,
    };
    return option;
}

function getAgencyGroupedHotelName(hotel) {
    var hotelName = hotel.querySelector(".agents-search-results-item-hotel-title a").textContent.trim();
    var stars = hotel.querySelector(".stars-container");
    stars = stars ? " " +stars.title : "";
    return hotelName + stars;
}

function getAgencyGroupedRegion(hotelItem) {
    var region = hotelItem.querySelector(".agents-search-results-item-location-name").textContent.trim();
    var city =  hotelItem.querySelector(".departure-city");
    city = city ? city.textContent : "";
    return { region:  city ? region.replace(city, "") : region, city: city ? city.split(" — ")[0].trim() : getCity()}
}

function createAgencyOption(img) {
    var hotelRow = getHotelRowByImage(img);
    var hotels = querySelectorAll(hotelRow, ".agents-search-results-item-details");
    var dates = hotels.map(getDateAndNights);
    var nights = dates.reduce( (sum, date) =>  {  sum += parseInt(date.nights); return sum }, 0);
    var option = {
        checkinDt: dates[0].date,
        nights: nights.toString(),
        hotelName: hotels.map(getAgencyGroupedHotelName).join(" / "),
        href: window.location.href,
        roomType: hotels.map(h=>getText(h.querySelector(".agents-search-results-item-room"), "innerText")).join(" / "),
        boardType: hotels.map(h=>getText(h.querySelector(".agents-search-results-item-meals"))).join(" / "),
        region: hotels.map(h=>getText(h.querySelector(".agents-search-results-item-location"))).join(" / "),
        price: getPrice(hotelRow),
        currency: getCurrency(hotelRow),
        country: getAgencyCountry(hotelRow),
        city_from: getAgencyCity(hotelRow),
    };
    return option;
}

function getAgencyCity(row) {
    var planeIcon = row.querySelector('.agents-search-results-item-additional-info-message [data-icon="plane-departure"]');
    if ( planeIcon ) {
        return planeIcon.parentNode.textContent.split(/\s-\s/)[0].trim();
    }
    return getCity();
}

function getAgencyCountry(row) {
    var flag = row.querySelector(".agents-search-results-item-hotel .icon");
    return flag ? flag.title : "";
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (div) {
        if ( div.classList.contains("hotel-tours-result") || div.classList.contains("agents-search-results-item")) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

function getHotelAgencyByImage(img) {
    var div = img.parentNode;
    while (div) {
        if ( div.classList.contains("agents-search-results-item") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}
