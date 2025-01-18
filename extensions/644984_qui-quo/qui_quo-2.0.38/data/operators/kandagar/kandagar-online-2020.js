const OPERATOR_NAME = "Кандагар";
const showTopHotelsRating = true;
function initializeSearchCriteria() {
    return {
        country: selectedOption($1('#CountryId'))
    };
}

function getSearchButton() {
    return $1('#search_tours__btn')
}

function injectData() {
    const header = document.querySelector("#SearchResult .table_request_result thead tr");
    if ( header && !header.querySelector(".qq") ) {
        header.insertAdjacentHTML('beforeend', '<th class="qq">QQ</th>');
    }
    querySelectorAll(document, "#SearchResult .table_request_result tbody tr").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createCell());
        }
    });
}

function createCell() {
    const newTd = document.createElement("td");
    newTd.classList.add("qq");
    newTd.append(qqBtns({align: "qq-box"}));
    return newTd;
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    let option = {
        checkinDt: appendYear(...getText(tour.querySelector( ".table_date")).split(".")),
        nights:  getText(tour.querySelector(".table_nights")),
        hotelName: getText(tour.querySelector(".table_hotel")),
        href:  getNodeProperty(tour.querySelector(".table_hotel a"), null, "href"),
        country: SEARCH_CRITERIA ? SEARCH_CRITERIA.country : selectedOption($1('#CountryId')),
        region: getText(tour.querySelector(".table_region")),
        roomType: [getText(tour.querySelector(".table_room_type")),
                   getText(tour.querySelector( ".table_room_category")),
                   getText(tour.querySelector(".table_accommodation "))].join(", "),
        boardType: getText(tour.querySelector(".table_food")),
        price:  extractIntFromStr(getText(tour.querySelector(".table_price")).replace(/\s+/g, "")),
        currency: mapCurrency(getText(tour.querySelector(".table_price")).replace(/\s+|\d+|,/g, "")),
        city_from: document.querySelector(".with_air.active") ? 'Нет данных' : "",
        operator: OPERATOR_NAME,
        thumbnail: null,
        occupancy: getOccupancy(),
        excursion: false
    };
    return option;
}

function mapCurrency(s) {
    switch (s) {
        case "рб": return "RUB";
        case "EU": return "EUR";
        default: return mapCurrencyUtil(s);
    }
}

function getOccupancy() {
    const occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const adultsCount = getParameterByName("Adult");
    if ( !adultsCount ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adultsCount);
    const kids = window.location.href.match(/Child\d=\d+/g);
    if ( kids ) {
        occupancy.childrenCount = kids.length;
        occupancy.childAges = kids.map( text => text.replace(/.+?=/,"") ).join();
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.tagName === "TR" ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}
