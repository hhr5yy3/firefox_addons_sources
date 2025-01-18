window.OPERATOR_NAME = "PAC GROUP";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    var cityName = document.querySelector("[name='City']");
    var city = cityName ? getNodeProperty(cityName.parentNode.querySelector(".filter-select-current")) : null;
    return {
        city: city ? (city !== "Без перелета" ? city : "") : null,
        occupancy: getOccupancy()
    };
}

function getSearchButton() {
    return document.querySelector(".js-m-filter-submit");
}

function injectData() {
    querySelectorAll(document, ".js-tour-page-hotel.js-tour-table-block").forEach( div => {
        if ( !div.querySelector(".qq") ) {
            const node =  div.querySelector(".js-basket-preloader, .tour-page__placement-type-price");
            if ( node ) {
                const priceNode = div.querySelector(".tour-page__placement-type-price .js-money");
                if ( !priceNode ) {
                    return;
                }
                node.after(createCell());
            }
        }
    });
}

function createCell() {
    return qqBtns({align: 'qq-horizontal'});
}

async function createOption(img) {
    var hotel = getHotelRowByImage(img, "tour-page__placement__output-group") || getHotelRowByImage(img, "tour-page__placement-output-block");
    var tour = getHotelRowByImage(img, "tour-page__placement__output-item");
    var place = getPlace(hotel);
    const href = getNodeProperty(hotel.querySelector(".js-placement-hotel-title"), null, "href")
    let country = hotel.dataset.country;
    let region = hotel.dataset.region;
    let thumbnail = hotel.dataset.thumbnail || getThumbnail(hotel);
    if ( !country )  {
        const place = await getHotelCountry(href)
        country = place.country;
        region = place.region;
        thumbnail = place.img || thumbnail;
        hotel.dataset.country = country;
        hotel.dataset.region = region;
        hotel.dataset.thumbnail = thumbnail;
    }
    var price = tour.querySelector(".tour-page__placement-type-price .js-money");
    var option = {
        checkinDt: getDate(tour),
        nights: getNights(tour),
        hotelName: getHotelName(hotel).toUpperCase(),
        href,
        roomType: getRoomType(tour),
        country: place.country  || country,
        region: region || place.region,
        boardType: getNodeProperty(tour.querySelector(".tour-page__placement__meal, .tour-page__placement-type-text-wrap .tour-page__placement-type-text-2")),
        price: extractIntFromStr(price.textContent.replace(/\D+/g, "")),
        currency: price.dataset.moneyCurrent,
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        thumbnail,
        occupancy: SEARCH_CRITERIA.occupancy,
        excursion: typeof (isExcursion) !== "undefined" ? isExcursion(tour) : false
    };
    return option;
}

async function getHotelCountry(href) {
    try {
        if ( !href ) {
            return {};
        }
        const text = await fetch(href).then(resp => resp.text())
        const doc = getDocumentFromString(text);
        const place = getCountry(doc);
        place.img = getThumbnail(doc)
        return place;
    } catch (e) {
        console.log(e);
        return {};
    }
}

function getCountry(doc = document) {
    let title = $$( ".tour-info__title", doc).find(elem => {
        return elem.textContent.match(/Страна:/i);
    });
    if ( title ) {
        title = title.parentNode.textContent.replace(/Страна:/i, "").trim().match(/[А-я]+/g);
        const region = title.slice(1).join(", ");
        const country = title[0];
        return {country: country, region: region};
    }
    return {country: "", region: ""};
}

function getDate(tour) {
    var date = getNodeProperty(tour.querySelector(".tour-page__placement__dates"));
    return date.match(/\d{2}.\d{2}.\d{4}/)[0];
}

function getNights(tour) {
    return getNodeProperty(tour.querySelector(".tour-page__placement__dates")).match(/(\d+)\s*ноч/)[1];
}

function getHotelName(tour) {
    var hotel = tour.querySelector(".js-placement-hotel-title");
    var stars = hotel.querySelectorAll(".star-wrap ._golden-star");
    stars =  stars.length > 0 ? " " + stars.length + "*" : null;
    hotel = hotel.textContent;
    if ( stars ) {
        hotel = hotel.replace(/\d+\*/,"");
    }
    return [ hotel.trim(), stars].join("");
}

function getRoomType(tour) {
   var acc = getNodeProperty(tour.querySelector(".tour-page__placement-type-people"));
   var room = getNodeProperty(tour.querySelector(".tour-page__placement-type-text-wrap .tour-page__placement-type-text-1"));
   return [acc,room].filter( elem => elem ).join(", ");
}

function getPlace(tour) {
    const port = document.querySelector('.tour-page__placement__output-group-title-port');
   if ( port ) {
       const place = $$('.tour-info__text').find(node => getText(node).match(/Города стоянок:/));
       return {country: "", region: getText(place)};
   }
   var place = getNodeProperty(tour.querySelector(".hotel-tour-description, .hotel-tour-address"), '');
   var rusAddress = place.match(/[А-я]+/g);
   if ( !rusAddress ) {
       return { country: "", region: place };
   }
   rusAddress = deleteArrayDuplicates(rusAddress); //т.к. иногда сайт выдает адрес вида "Мюнхен, Германия, Мюнхен, Германия"
   var region = rusAddress.slice(1).join(", ");
   var country = rusAddress[0];
   return { country: country, region: region };
}

function getThumbnail(tour) {
    var imageNode = tour.querySelector("img.tour-page__placement-hotel-img, .tour-page__placement-img-wrap img, img.tour-slider__img") || document.querySelector("img.tour-slider__img");
    return getNodeProperty(imageNode, null, "src");
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    occupancy.adultsCount = +querySelectorAll(document, ".filter-person.js-filter-man._active").length;
    var kids = querySelectorAll(document, ".filter-person.js-filter-child._active");
    if ( occupancy.adultsCount === 0 ) {
        return null;
    }
    if ( kids.length > 0 ) {
        occupancy.childAges = kids.reduce( (array, kid) => {
            var age = kid.querySelector(".filter-person-num.js-filter-person-num");
            age ? array.push(age.textContent) : array;
            return array;
            }, []).join();
    }
    occupancy.childrenCount = kids.length;
    return occupancy;
}

function getHotelRowByImage(img, sel = "js-tours-output-table") {
    var div = img.parentNode;
    while (div) {
        if (div.classList && div.classList.contains(sel)) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}
