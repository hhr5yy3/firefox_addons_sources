window.OPERATOR_NAME = "6tour";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    const occupancy = getOccupancy();
    if (!occupancy ) {
        return null;
    }
    return {occupancy};
}

function getSearchButton() {
    return $$('.accommodationSearchButton')
}

function injectData() {
    $$("tr.result-row td:last-child").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotel = tour.closest('.accommodation-result-block');
    const dates = getNodeData('thead th span', hotel).match(getRegexPatterns().date).map(dt => dt.replace(/\//g, '.'))
    const regionTextParts = getNodeData('.info-city', hotel).split(/\s+|\(|\s*,\s*|\)/).filter(Boolean);
    const price = getNodeData('.main-price', tour)
    let option = {
        checkinDt: dates[0],
        nights: String(getDistance(dates[0], dates[1])),
        hotelName: getNodeData('.info-name', hotel),
        hotel_desc: getNodeData('.hotel-desc-text', hotel),
        href: getNodeData('.info-name a', hotel, 'href'),
        country: lastElement(regionTextParts),
        region: regionTextParts.slice(0, -1).join(', '),
        roomType: getNodeData('.room-desc', tour),
        boardType: getNodeProperty($1('.room-desc', tour).closest('div').nextElementSibling),
        price: extractIntFromStr(price.split(/\s*,\s*/)[0]),
        currency: mapCurrencyUtil(price),
        city_from: "",
        thumbnail: getNodeData('img.info-img', hotel, 'src'),
        occupancy: SEARCH_CRITERIA && SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    occupancy.adultsCount = +document.querySelector("select.occupancy-adults-select")?.value;
    occupancy.childrenCount = +document.querySelector("select.occupancy-children-select")?.value;
    return occupancy;
}

function getHotelRowByImage(img) {
    return img.closest('.result-row');
}
