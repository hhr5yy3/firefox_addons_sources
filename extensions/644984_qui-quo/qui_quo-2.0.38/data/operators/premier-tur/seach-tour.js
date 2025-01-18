window.OPERATOR_NAME = "Премьер Тур";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".dates_list .__rowprice").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal", cssText: 'width: 96%; justify-content: end;'}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const roomRow = tour.closest('[class*="hotel"]').previousElementSibling;
    const td = tour.closest('td').closest('table');
    const dates = getText(tour).match(getRegexPatterns().date);
    const price = getNodeData('.__price', tour);

    let option = {
        checkinDt: dates[0],
        nights: String(getDistance(...dates)),
        hotelName: getNodeData('.page-header li.active'),
        hotel_desc: getDescription(),
        href: location.href,
        comment: getNodeData('th', td),
        country: "Россия",
        region: ($$('.page-header .breadcrumb li:not(.active)').splice(2)).map(li => getText(li)).join(', '),
        roomType: getNodeData('.media-heading', roomRow),
        boardType: getNodeData('.ticket_desc', tour, 'innerText'),
        price: extractIntFromStr(price.replace(/\D+/, '')),
        currency: "RUB",
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl($first('.swiper-wrapper .swiper-slide-active')),
        occupancy: "",
        excursion: "",
    };
    return option;
}

function getDescription() {
    let descElements = $$('[itemprop="articleBody"] div>p, [itemprop="articleBody"] div>div');
    const sliceIndex = descElements.findIndex( elem => getText(elem).match(/Инфраструктура|Лечение/i) );
    if ( sliceIndex !== -1 ) {
        descElements = descElements.slice(1, sliceIndex)
    }
    return descElements.map(el => el.innerHTML).join(' ');
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}
