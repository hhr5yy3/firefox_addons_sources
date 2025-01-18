var OPERATOR_NAME = "AeroLing";
const showTopHotelsRating = true;

function initializeSearchCriteria() {
    return {
        city: selectedOption(document.querySelector("select.TOWNFROMINC")),
        country: selectedOption(document.querySelector("select.STATEINC")),
        occupancy: getOccupancy(),
    };
}

function getSearchButton() {
    return querySelectorAll(document, ".search-btn");
}

function injectData() {
    querySelectorAll(document, "#resultset .tour .tour-price").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            div.after(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const helpers = querySelectorAll(tour, ".field-helper");
    const findField = (caption) => helpers.find( helper => getText(helper).match(caption) );
    const getFieldNodeOrText = (caption, isText = true) => {
        const field =  findField(caption);
        const tourInfoDiv = field.parentNode;
        const fieldText =  getText(field);
        const tourInfoDivText = getText(tourInfoDiv);
        return isText ? tourInfoDivText.replace(fieldText, "") : tourInfoDiv;
    };
    let option = {
        checkinDt: getFieldNodeOrText("Вылет").match(/\d{2}\.\d{2}\.\d{4}/)[0],
        nights: getText(findField("Ночей").nextSibling),
        extra_nights: getNodeProperty(tour.querySelector(".price-additional-nights"), "0"),
        hotelName:  getFieldNodeOrText("Отель"),
        href: getNodeProperty(getFieldNodeOrText("Отель", false).querySelector("a"), null, "href"),
        country: SEARCH_CRITERIA.country,
        region:  getFieldNodeOrText("Город"),
        roomType:  getFieldNodeOrText("Номер"),
        boardType:  getFieldNodeOrText("Питание"),
        price: extractIntFromStr(getFieldNodeOrText("Цена").replace(/\D+/g,"")),
        currency: mapCurrencyUtil(getFieldNodeOrText("Цена").replace(/\d+/g,"").trim()),
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        thumbnail: null,
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const adultNode = document.querySelector("select.ADULT");
    const childsNode = document.querySelector("select.CHILD");
    if ( !adultNode ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(selectedOption(adultNode));
    occupancy.childrenCount = childsNode ?  extractIntFromStr(selectedOption(childsNode)) : 0;
    if ( occupancy.childrenCount > 0) {
        occupancy.childAges = querySelectorAll(document, ".child_ages select.age")
                              .map( age => (selectedOption(age) || "").replace(/\D+/, "") )
                              .splice(0, occupancy.childrenCount)
                              .join();
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.classList.contains("tour") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}