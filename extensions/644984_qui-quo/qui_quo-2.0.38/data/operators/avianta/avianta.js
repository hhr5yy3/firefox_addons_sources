var OPERATOR_NAME = "Avianta";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
   var city = document.querySelector(".simple-search__control_from .simple-search__control-current-value");
   return {
       city: city ? city.textContent : null
   }
}

function getSearchButton() {
    return $$(".expanded-search__start-search-button, .simple-search__search-button");
}

function injectData() {
    querySelectorAll(document, ".hotel__main-section-wrapper, .hotel__tours-wrapper .tourlist__list .b-tour").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createCell());
        }
    });

    querySelectorAll(document, ".b-aside-tour.js-aside-tour, .tourlist__list .b-tour").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({},  createOrderOption));
        }
    });
}

function createCell() {
    var newDiv = document.createElement("div");
    newDiv.className = "qq";
    newDiv.style.setProperty("display", "flex");
    newDiv.style.setProperty("flex-direction", "column");
    newDiv.style.setProperty("justify-content", "center");
    newDiv.append(qqBtns());
    return newDiv;
}

function createOption(img) {
    var hotel = getHotelRowByImage(img);
    var tour =  getHotelRowByImage(img, "b-tour");
    tour = tour ? tour : getHotelRowByImage(img, "hotel__hotel-wrapper");
    var price = tour.querySelector(".tour__price, .hotel__price ").textContent;
    const region = (getNodeProperty(hotel.querySelector(".hotel__place")) || getNodeProperty(document.querySelector(".hotel-page-card-header__place"))).split(/\s*,\s*/);
    var option = {
        checkinDt: getDate(tour),
        nights: tour.querySelector(".hotel__tour-duration, .tour__nights").textContent.replace(/\D+/g, ""),
        hotelName: getHotelName(hotel)[0],
        href: getHotelName(hotel)[1],
        roomType: getRoomType(tour),
        region: region.slice(1).join(', '),
        boardType: getBoardType(tour),
        price: extractIntFromStr(price.replace(/\D+/,"")),
        currency: mapCurrency(price),
        country: region[0],
        city_from: getCityFrom(tour),
        operator: getNodeProperty(tour.querySelector(".hotel__tour-operator-logo, .tour__operator-logo"), OPERATOR_NAME, "title"),
        excursion: false,
        thumbnail: getNodeProperty(hotel.querySelector(".hotel__photo"), null, "src")
    };
    return option;
}

function getDate(tour) {
    return appendYear(...tour.querySelector(".hotel__tour-startdate, .tour__from_date").textContent
        .match(/(\d{2})\.(\d{2})/).slice(1));
}

function getHotelName(hotel) {
    if ( !hotel.querySelector(".hotel__name-section") && hotel.dataset.name ) {
        return [hotel.dataset.name, window.location.href];
    }
    var name = hotel.querySelector(".hotel__name-section");
    var href = name.querySelector("a");
    var stars = hotel.querySelectorAll(".b-hotel-stars .hotel-star.b-icon ").length;
    return [stars > 0 ? name.textContent.trim() + " " + stars + "*" : name.textContent.trim(), href ? href.href : null];
}

function getRoomType(tour) {
    var room = tour.querySelector(".hotel__tour-accommodation, .tour__accommodation, .tour__accommodation_");
    var title = room.dataset ? room.dataset.tooltip : null;
    return [room.textContent.trim(), title].filter( e => e ).join(", ");
}

function getBoardType(tour) {
    var board = tour.querySelector(".hotel__tour-food, .tour__food");
    var title = board ? board.dataset.tooltip : null;
    return [board ? board.textContent.replace(/,+/ig,"").trim() : null, title].filter((elem, index, self) => { return elem && index === self.indexOf(elem); }).join(", ");
}

function mapCurrency(price) {
    price = price.replace(/\d+|\s+/g,"");
    switch(price) {
        case "$": return "USD";
        case "€": return "EUR";
        case "₽": return "RUB";
    }
    return price;
}

function getCityFrom(tour) {
    var c = tour.querySelector(".availability__item_notickets");
    if ( c ) {
        return "";
    }
    return SEARCH_CRITERIA.city;
}

function createOrderOption(img) {
    const hotel = document.querySelector(".tourpage__tour");
    let tour = img.closest(".tourpage__aside");
    const price = getText(tour.querySelector(".aside-tour__price"));
    const tourItems = querySelectorAll(hotel, ".tourpage__tour-info-item .tourpage__tour-info-item-value");
    const dateAndNights = tourItems[0].title.match(/(\d{2})\.(\d{2})-\d{2}\.\d{2}.+?(\d+)\s+ноч/);
    const countries = querySelectorAll(document, '.tourpage__tour-country').map(item => getText(item));
    const option = {
        checkinDt: appendYear(dateAndNights[1], dateAndNights[2]),
        nights:  dateAndNights[3],
        hotelName: getOrderHotelName(hotel),
        href: getNodeProperty(hotel.querySelector(".tourpage__hotel a"), null, 'href'),
        roomType: tourItems[1].title,
        region: getNodeProperty(document.querySelector(".tourpage__tour-resort")),
        boardType: tourItems[2].title,
        price: extractIntFromStr(price.replace(/\D+/,"")),
        currency: mapCurrency(price),
        country: countries[1],
        city_from: countries[0],
        operator: [getNodeProperty(tour.querySelector("img.aside-tour__operator-logo"), '', 'title'), OPERATOR_NAME].join(' / '),
        excursion: false,
        thumbnail: getNodeProperty(hotel.querySelector(".slider-gallery__main-image"), null, "src"),
        occupancy: getOccupancy(tourItems[3].title)
    };
    return option;
}

function getOrderHotelName(hotel) {
    const caption = getText(hotel.querySelector(".tourpage__hotel a") || hotel.querySelector(".tourpage__hotel"));
    const stars = querySelectorAll(hotel, '.tourpage__hotel-stars .tourpage__hotel-star');
    return `${caption}${stars.length > 0 ?  ' '+ stars.length+'*' : ''}`;
}

function getOccupancy(text) {
    try {
        return {
            adultsCount: +text.match(/(\d+)\s*взр/)[1],
            childrenCount: +(text.match(/(\d+)\s*реб/) || '00')[1],
            childAges: null
        };
    } catch(e) {
        return null;
    }
}

function getHotelRowByImage(img, sel="b-hotel") {
    var div = img;
    while (div) {
        div = div.parentNode;
        if ( div && div.classList && div.classList.contains(sel) ) {
            break;
        }
    }
    return div ? div : null;
}
