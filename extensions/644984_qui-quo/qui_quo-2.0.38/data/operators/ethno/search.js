window.OPERATOR_NAME = "Тур Этно";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return {
        region: getNodeData('.into [placeholder="Введите регион, отель или курорт"]', document, 'value'),
    };
}

function getSearchButton() {
    return $$('.submit')
}

function injectData() {
    $$(".hotels-list .block.extended .price-txt").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            div.after(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const room = tour.closest('.var-block');
    const hotel = room.closest('.extended')
    const dates = getNodeData('.dates', hotel).match(getRegexPatterns().date)
    let  option = {
        checkinDt: dates[0],
        nights: getDistance(dates[0], dates[1]),
        hotelName: getNodeData('.title', hotel),
        href: getNodeData('.title a', hotel),
        country: "Россия",
        region: SEARCH_CRITERIA.region,
        roomType: getNodeData('.title', room),
        accommodation: getNodeData('.accmd', tour),
        boardType: getNodeData('.c2 ', tour),
        price: extractIntFromStr(getNodeData('.price-txt', tour).replace(/\D+/g, '')),
        currency: "RUB",
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl($1('.carousel-item.active .bgphoto', hotel)),
        occupancy: null
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.row');
}
