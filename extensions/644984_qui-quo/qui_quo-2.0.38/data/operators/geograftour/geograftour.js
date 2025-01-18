var OPERATOR_NAME = "География";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return document.querySelector("#search_button");
}

function injectData() {
    var divs = document.querySelectorAll(".tour__price-wrap");
    for ( var i = 0; i < divs.length; i++ ) {
        if ( !divs[i].querySelector(".qq") ) {
            divs[i].appendChild(qqBtns({align: "qq-horizontal"}));
        }
    }
}

function createOption(img) {
    var tour = getHotelRowByImage(img);
    var dataset = tour.parentNode.dataset.tourData;
    dataset = dataset ? dataset.replace(/%2C/g,",") : null;
    var option = {
        checkinDt :getDate(tour),
        nights : getNights(tour),
        hotelName : getHotelName(tour),
        href : getURL(tour),
        roomType: getRoomType(tour),
        region : getRegion(tour),
        boardType : getBoardType(tour),
        price : getPrice(tour),
        currency : getCurrency(tour),
        country:  getCountry(tour),
        city_from: getCity(tour),
        operator: getOperator(dataset),
        excursion: false,
        thumbnail: getImg(tour),
        occupancy : getOccupancy(dataset)
    };
    return option;
}

function getDate(tour) {
    var date = tour.querySelector(".depart.arrive").textContent.match(/(\d{2}).(\d{2})/);
    return appendYear(extractIntFromStr(date[1]),extractIntFromStr(date[2]));
}

function getNights(tour) {
    return tour.querySelector(".depart.arrive").textContent.match(/(\d+)\sночей/)[1];
}

function getHotelName(tour) {
    var stars = tour.querySelectorAll(".fa-star");
    if ( stars.length < 1 ) {
        stars = tour.parentNode.querySelectorAll(".fa-star");
    }
    var hotel = tour.querySelector(".hotel-name");
    hotel = hotel ? hotel : tour.parentNode.querySelector(".tour__title");
    return (hotel.textContent.trim().replace(/^\d\*\s*/, '')) + (stars.length > 0 ? " " + stars.length + "*" : "");
}

function getURL(tour) {
    var url = tour.parentNode.querySelector(".hotel-name a");
    return url ? url.href : null;
}

function getRoomType(tour) {
    const tourInfo = tour.querySelector(".icon-info--room");
    return tourInfo ? tour.querySelector(".icon-info--room").parentNode.textContent.trim().replace(/\s+/," ") : null;
}


function getRegion(tour) {
    return tour.querySelector(".city h2").textContent.split(",")[1].trim();
}

function getBoardType(tour) {
    return tour.querySelector(".icon-info--meal").parentNode.textContent.trim().replace(/\s+/,", ");
}

function getPrice(tour) {
    return extractIntFromStr(tour.querySelector(".buy-price, .tour__buy-btn.break-price.mini.btn--pink").textContent.replace(/\s+/g, ""));
}

function getCurrency(tour) {
    var priceNode = tour.querySelector(".buy-price i, .tour__buy-btn.break-price.mini.btn--pink i");
    if ( priceNode ) {
        var className = priceNode.className;
        switch (className) {
            case "tour__price-rub fa fa-eur":
                return "EUR";
            case "tour__price-rub fa fa-rub":
                return "RUB";
            case "tour__price-rub fa fa-usd":
                return "USD";
            case "tour__price-rub fa fa-kzt":
                return "KZT";
            default:
                return className;
        }
    }
    return mapCurrencyUtil(getNodeProperty(tour.querySelector(".buy-price i, .tour__buy-btn.break-price.mini.btn--pink"), "").replace(/\d+|\s+|[А-я]+/g,""));
}

function getCountry(tour) {
    return tour.querySelector(".city h2").textContent.split(",")[0].trim();
}

function getCity(tour) {
    return tour.querySelector(".depart-city").textContent.replace(/вылет\s+из/i,"").trim();
}

function getOperator(data) {
    var operator = data ? data.match(/oper_name=(.+)&price/) : null;
    return operator ? OPERATOR_NAME + " / " + operator[1] : OPERATOR_NAME;
}

function getImg(tour) {
    var image = tour.querySelector(".tour__image img");
    return image ? image.src : null;
}

function getOccupancy(data) {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    if ( !data ) {
        return null;
    }
    var adults = data.match(/adult=(\d+)/);
    var kids = data.match(/child=(\d+)/);
    if( !adults || !kids ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adults[1]);
    occupancy.childrenCount = extractIntFromStr(kids[1]);
    if( occupancy.adultsCount === 0 ) {
        return null;
    }
    if( occupancy.childrenCount > 0 ) {
        var ages = data.match(/ages=(.+)&oper_id/);
        occupancy.childAges = ages ? ages[1] : null;
    }
    return occupancy;
}


function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (true) {
        if ( div.className === "b-tour b-tour--square" || div.className === "tour__body" ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}
