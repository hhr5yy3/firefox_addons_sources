window.OPERATOR_NAME = "Донинтурфлот";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".cruise-booking_footer .catalog-element-purchase").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const dates = getNodeData('.cruise-properties-dates');
    const [dateStart, dateEnd] = dates.match(getRegexPatterns().date);
    const price = getNodeData('.cruise-booking_price-total', tour)
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getNodeData('.catalog-element-information-teplohod'),
        hotel_desc: getNodeData('.catalog-element-information-part .catalog-element-section-description'),
        href: location.href,
        country: "Россия",
        region: getNodeData('.intec-ui-mark-text.catalog-element-description'),
        roomType: [$$('.catalog-element-offers-property button[data-state="selected"]').extractNodesText().join(', '), getNodeData('.cruise-booking_button-place[title][data-state="selected"]', document, 'title')].join(', '),
        boardType: getNodeData('.card-food-text').split(/\n/)[0],
        price: extractIntFromStr(price.replace(/\s+/g, '')),
        currency: "RUB",
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('#card-ship .catalog-element-gallery-picture img', document, 'src')
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.cruise-booking_footer');
}
