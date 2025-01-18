window.OPERATOR_NAME = "Asialuxe";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);


function initializeSearchCriteria() {
    const selects = $$('.search .el-select__selected-item.el-select__placeholder').extractNodesText()
    const city = selects[0]
    return {city};
}

function getSearchButton() {
    return $$('.search-btn');
}

function injectData() {
    $$(".card-wrapper .hotel-wrap .items-end").filter(p => $1('.el-button', p)).forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const region = getText($1('.fa-light.fa-location-dot', tour).parentNode)
    const stars = $$('.el-icon.el-rate__icon.is-active', tour).length;

    const descriptionSpans = $$('p', tour).extractNodesText();
    const dates = descriptionSpans
        .find(str => str.match(getRegexPatterns().date))
        .match(getRegexPatterns().date)
        .map(date => makeYear4Digits(date))
    const price = getText($1('.items-end b', tour).lastChild);
    let option = {
        checkinDt: dates[0],
        nights: String(getDistance(dates[0], dates[1])),
        hotelName: (getNodeData('.hotel-name', tour)) + (stars ? ' '+stars+'*' : ''),
        country: SEARCH_CRITERIA && SEARCH_CRITERIA.country,
        region,
        roomType: getNodeProperty($1('.fa-bed-front', tour)?.parentNode),
        boardType: getNodeProperty($1('.fa-utensils', tour)?.parentNode),
        price: extractIntFromStr(price.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g, '')),
        city_from: (SEARCH_CRITERIA && SEARCH_CRITERIA.city) || "",
        operator: OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl($1('.img-wrapper .bg-cover', tour))
    };
    return option;
}
function getHotelRowByImage(img) {
    return img.closest('.card-wrapper');
}
