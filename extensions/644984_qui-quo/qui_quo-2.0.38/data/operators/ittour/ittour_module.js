const OPERATOR_NAME = "ITTOUR";
const showTopHotelsRating = true;

function initializeSearchCriteria() {
    return {
        occupancy: getOccupancy()
    };
}

function getSearchButton() {
    return querySelectorAll(document, ".fd-find")
}

function injectData() {
    querySelectorAll(document, ".fd-result_item__price").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-box"});
            div.append(btns);
            btns.style.marginLeft = "35%";
            div.style.height ="120px";
        }
    });

}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const departure = querySelectorAll(tour,".fd-result_item__departure span");
    const location = getText(tour.querySelector(".fd-result_item__loc")).split(",");
    const board = tour.querySelector(".fd-result_item__food");
    const price = getText(tour.querySelector(".fd-result_item__cash"));
    const air = tour.querySelector(".fd-transport_airplane");
    let option = {
        checkinDt: getText(departure[0]),
        nights: getText(departure[1]).replace(/\D+/g, ""),
        hotelName: getText(tour.querySelector(".fd-result_item__name")),
        href: window.location.href,
        country: location[1],
        region: location[0],
        roomType: getText(tour.querySelector(".fd-result_item__room")),
        boardType: [getText(board), getNodeProperty(board, "", "title")].join(),
        price: extractIntFromStr(price.replace(/\D+/g,"")),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g,"")),
        city_from: air ? getText(air.parentNode) : "",
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(tour.querySelector(".fd-result_item__img img"), null, "src"),
        occupancy: getOccupancy()
    };
    return option;
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const adults = document.querySelector("#popupScrollRoot .fd-detail .fd-icon_adults");
    if ( adults ) {
        occupancy.adultsCount = extractIntFromStr(getNodeProperty(adults.parentNode, "0"))
    }
    const childs = querySelectorAll(document, "#popupScrollRoot .fd-detail .age-item select");
    occupancy.childrenCount = childs.length;
    if ( occupancy.childrenCount > 0 ){
        occupancy.childAges = childs.map( child => selectedOption(child) ).join();
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.classList.contains("fd-result_item") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}