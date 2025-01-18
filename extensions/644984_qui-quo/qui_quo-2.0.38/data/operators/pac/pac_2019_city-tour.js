function getHotelName() {
    var hotel = document.querySelector(".js-header").textContent;
    var matcher = hotel.match(/ОТЕЛЬ(.+\*)/i);
    if ( matcher ) {
        return matcher[1];
    }
    return hotel;
}

function isExcursion(tour) {
    var desc = tour.querySelector(".hotel-tour-description");
    if ( !desc ) {
        return false;
    }
    var exc = desc.textContent.match(/Экскурсион/i);
    if ( exc ) {
        return true;
    }
    return false;
}

function getThumbnail() {
   return getNodeProperty(document.querySelector("img.tour-slider__img"), null, "src");
}


async function createOption(img) {
    var hotel = getHotelRowByImage(img, ".js-tour-page-hotel") || getHotelRowByImage(img, "tour-page__placement-output-block");
    var tour = getHotelRowByImage(img, "tour-page__placement__output-item");
    const place = getCountry(document);
    const href = getNodeProperty(hotel.querySelector(".js-placement-hotel-title"), null, "href")
    var price = tour.querySelector(".tour-page__placement-type-price .js-money");
    var option = {
        checkinDt: getDate(tour),
        nights: getNights(tour),
        hotelName: getHotelName(hotel),
        href,
        roomType: getRoomType(tour),
        country: place.country,
        region: place.region,
        boardType: getNodeProperty(tour.querySelector(".tour-page__placement__meal, .tour-page__placement-type-text-wrap .tour-page__placement-type-text-2")),
        price: extractIntFromStr(price.textContent.replace(/\D+/g, "")),
        currency: price.dataset.moneyCurrent,
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        thumbnail: getThumbnail(tour),
        occupancy: SEARCH_CRITERIA.occupancy,
        excursion: typeof (isExcursion) !== "undefined" ? isExcursion(tour) : false
    };
    return option;
}
