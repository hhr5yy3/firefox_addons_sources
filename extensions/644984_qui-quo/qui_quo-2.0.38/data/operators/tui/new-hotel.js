window.OPERATOR_NAME = "TUI";
window.OPERATOR_SLETAT_ID = 229;
window.showTopHotelsRating = true;
window.cities = {
  "1": "Без перелётов",
  "244574": "Калининград",
  "244707": "Санкт-Петербург",
  "265062": "Казань",
  "274286": "Москва",
  "287358": "Владикавказ",
  "319474": "Адлер",
  "338248": "Челябинск",
  "341043": "Петропавловск-Камчатский",
  "350884": "Новосибирск",
  "350894": "Пермь",
  "350903": "Уфа",
  "350906": "Минеральные Воды",
  "352138": "Ростов-на-Дону",
  "352541": "Краснодар",
  "353556": "Екатеринбург",
  "353559": "Самара",
  "355698": "Грозный",
  "355802": "Южно-Сахалинск",
  "362363": "Воронеж",
  "363784": "Хабаровск",
  "367400": "Сочи",
  "382452": "Красноярск",
  "398976": "Нижневартовск",
  "398977": "Сургут",
  "424885": "Нижний Новгород",
  "439285": "Нижнекамск",
  "439287": "Белгород",
  "439780": "Тюмень",
  "440272": "Брянск",
  "449675": "Иркутск",
  "526606": "Владивосток",
  "539312": "Саратов",
  "539329": "Волгоград",
  "539345": "Махачкала",
  "684368": "Барнаул",
  "702765": "Благовещенск",
  "703117": "Чита",
  "708762": "Томск",
  "708858": "Архангельск",
  "708860": "Астрахань",
  "708866": "Кемерово",
  "708868": "Мурманск",
  "708870": "Магнитогорск",
  "708872": "Омск",
  "708875": "Сыктывкар",
  "708878": "Ульяновск",
  "710470": "Новокузнецк",
  "710647": "Оренбург",
  "759793": "Саранск",
  "1001627": "Череповец",
  "352203": "Rīga",
  "387442": "Tallinn",
  "209595": "Ужгород",
  "212497": "Львов",
  "222509": "Днепр",
  "233630": "Одесса",
  "235144": "Киев",
  "235186": "Харьков",
  "235268": "Херсон",
  "355577": "Луцк",
  "356249": "Черновцы",
  "356304": "Запорожье",
  "698221": "Ивано-Франковск",
};

function initializeSearchCriteria() {
    return true;
}

function getSearchButton() {
    return document.querySelector(".search-tours-btn");
}

function getCurrentCityFrom() {
    const cityLabel =  querySelectorAll(document, ".search-params-items .labeled-input").find( label => {
        const cityFly = label.querySelector("label");
        return cityFly ? cityFly.textContent.match(/Город вылета|Izlidošana|Väljalend/i) : null;
    });
    if ( cityLabel ) {
        const cityCode = getParameterByName('directionFrom');
        return window.cities[cityCode];
    }
    return null;
}

function injectData() {
    querySelectorAll(document, ".search-result-hotel").forEach(div => {
        if ( !div.classList.contains("qq-check-mutation") ) {
            div.classList.toggle("qq-check-mutation");
            addMutationObserver(div);
        }
        var priceBtn = div.querySelector(".price-button");
        if ( !priceBtn.querySelector(".qq") ) {
            priceBtn.append(qqBtns());
        }
    });
}

function createOption(img) {
    var hotel = getHotelRowByImage(img);
    var option = {
        checkinDt: getDate(hotel.querySelector(".result-date")),
        nights: hotel.querySelector(".result-nights-count .bigger-text").textContent.trim(),
        hotelName: getHotelName(),
        href: window.location.href,
        roomType: hotel.querySelector(".result-room-type").textContent.trim(),
        region: getRegion().slice(1).join(", "),
        boardType:  hotel.querySelector(".result-meal-type").textContent.trim(),
        boardCode: getBoardCode(hotel.querySelector(".result-meal-type").textContent),
        price: getPrice(hotel),
        currency: mapCurrency(hotel),
        country: getRegion()[0],
        city_from: getCurrentCityFrom(),
        operator: "TUI",
        thumbnail: getThumbnail(),
        occupancy: getOccupancy()
    };
    return option;
}

function getDate(dateCell) {
    var matcher = dateCell.textContent.match(/(\d{2})\.(\d{2})\s*[вылет,Izlidošana,Väljalend]/);
    var day = matcher[1];
    var month = matcher[2];
    return appendYear(+day, +month);
}

function getHotelName() {
    var name = document.querySelector(".view-location");
    var tooltip = name.querySelector(".tooltip");
    var stars = name.querySelectorAll(".star").length;
    return (stars > 0 ? name.textContent.trim() + " " + stars + "*" : name.textContent.trim()).replace(getNodeProperty(tooltip, ""), "")
}

function getRegion() {
    var breadcrumbs = querySelectorAll(document, ".breadcrumbs .breadcrumbs__item");
    var hotelName = (document.querySelector(".view-location h1") || document.querySelector(".view-location")).textContent.trim().replace(/\*|\+/g, "");
    var matcher = new RegExp('главная|страны|Avaleht|Riigid|Galvenā|Valstis|'+hotelName+'', "i");
    return breadcrumbs.filter( a => {
        return !a.textContent.match(matcher) && a.textContent !== hotelName
    }).map( elem => {
        return elem.textContent.trim();
    });
}

function getBoardCode(board) {
    var board = board.replace(/and/i, "").match(/[A-z]+/g);
    return board ? board.map(string => {
        return string[0]
    }).join("") : "";
}

function getPrice(hotel) {
    var priceCell = hotel.querySelector(".price-value");
    var oldPrice = priceCell.querySelector(".oldPrice");
    oldPrice = oldPrice ? oldPrice.textContent : "";
    return priceCell.textContent.replace(oldPrice, "").replace(/\D+/g, "").trim();
}

function mapCurrency(hotel) {
    var text = hotel.querySelector(".currency").textContent.trim();
    switch ( text ) {
        case "€" :
            return "EUR";
        case "$" :
            return "USD";
        case "₽" :
            return "RUB";
        default :
            return text;
    }
}

function getThumbnail() {
    var sliderImage = document.querySelector(".slick-track [data-index='0'] img")
    return sliderImage ? sliderImage.src : null;
}

function getOccupancy() {
    const occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const adults = getParameterByName('adults');
    if ( !adults ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adults);
    const kids = window.location.search.match(/childrenAges=\d+/g);
    occupancy.childrenCount = kids ? kids.length : 0;

    if ( occupancy.childrenCount > 0 ) {
       occupancy.childAges = kids.map( kid => kid.replace(/\D+/g, '') ).join();
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    var elem = img.parentNode;
    while (elem) {
        if ( elem.classList.contains("search-result-hotel") ) {
            break;
        }
        elem = elem.parentNode;
    }
    return elem;
}

function addMutationObserver(targetNode) {
    var config = {attributes: false, characterData: true, subtree: true};
    var callback = function (mutationsList) {
        var mainQqElem = targetNode.querySelector("[id*='qq-hash']");
        for (var mutation of mutationsList) {
            if ( mutation.type === 'characterData' && mainQqElem ) {
                mainQqElem.querySelectorAll(".qq .added").forEach(btn => {
                    btn.classList.toggle("added");
                });
                mainQqElem.id = "";
                return;
            }
        }
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}