window.OPERATOR_NAME = "Тари Тур";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    const  region = selectedOption(document.querySelector("#hotel_city, #formControlDirectionsId"));
    return {
        dateStart: getNodeData('#hotel_df, #formControlDateFrom', document, 'value'),
        dateEnd: getNodeData('#hotel_dt, #formControlDateTill', document, 'value'),
        accommodation: selectedOption(document.querySelector("#formControlCapacity")),
        region
    };
}

function getSearchButton() {
    return $$('#hotel_form_search [onclick*="search_hotels()"], #sidebarFormSearch .btn-primary')
}

function injectData() {
    $$("#searchresult tr[data-hotel-id]").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createCell());
        }
    });
    const head = $1("#searchresult thead tr");
    if ( head && !head.querySelector(".qq") ) {
        head.append(createHeadCell())
    }

    $$("#hotelList .card-product .card-footer").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal"}, createNewHotelOption));
        }
    });

    $$("#hotelList li.list-group-item .list-group-item").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.children[0].after(qqBtns({align: "qq-horizontal", cssText: 'margin-right:4px'}, createNewHotelRoomOption));
        }
    });
}

function createCell() {
    const newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.append(qqBtns({align: "qq-box"}));
    return newTd;
}

function createHeadCell() {
    const newTh = document.createElement("th");
    newTh.className = "qq";
    newTh.append(document.createTextNode("QQ"));
    return newTh;
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotelId = tour.dataset.hotelId;
    const hotelRow = $1(` tr[data-hotel-id="${hotelId}"].result-hotel-name`);
    const dateStart = SEARCH_CRITERIA && SEARCH_CRITERIA.dateStart ? SEARCH_CRITERIA.dateStart : getNodeData('#hotel_df');
    const dateEnd = SEARCH_CRITERIA && SEARCH_CRITERIA.dateEnd ? SEARCH_CRITERIA.dateEnd : getNodeData('#hotel_dt');
    const tds = $$('td', tour).extractNodesText();
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getHotelName(hotelRow),
        href: getNodeData('[href*="/hotels/hotel/"]', hotelRow, 'href'),
        country: "Россия",
        region: SEARCH_CRITERIA.region,
        roomType: tds[1],
        boardType: tds[2],
        price: extractIntFromStr(tds[4]),
        currency: mapCurrencyUtil(tds[4].replace(/\d+|\s+|\./g, "")),
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('img.hImg', hotelRow, 'src'),
        occupancy: null,
        excursion: false,
    };
    return option;
}

function getHotelName(hotelRow) {
    const caption = getNodeData('[href*="/hotels/hotel/"]', hotelRow);
    const stars = $1('.use_sprites_stars', hotelRow);
    return `${caption} ${stars ? stars.className.replace(/\D+/g, '')+'*' : ''}`.trim()
}

function createNewHotelOption(img) {
    const tour = getHotelRowByImage(img);
    const dateStart = SEARCH_CRITERIA && SEARCH_CRITERIA.dateStart ? SEARCH_CRITERIA.dateStart : getNodeData('#hotel_df');
    const dateEnd = SEARCH_CRITERIA && SEARCH_CRITERIA.dateEnd ? SEARCH_CRITERIA.dateEnd : getNodeData('#hotel_dt');
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getNodeData('.card-product-title', tour) + getStars(tour),
        href: getNodeData('[href*="/hotels/hotel/"]', tour, 'href'),
        country: "Россия",
        region: SEARCH_CRITERIA.region,
        accommodation: SEARCH_CRITERIA.accommodation,
        roomType: '',
        boardType: '',
        price: extractIntFromStr(getNodeData('.card-footer .text-black .fw-semibold', tour)),
        currency: 'RUB',
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('img.card-img-top', tour, 'src'),
        occupancy: null,
        excursion: false,
    };
    return option;
}

function createNewHotelRoomOption(img) {
    const tour = img.closest('.list-group-item');
    const hotelNode = img.closest('li').previousElementSibling;
    const dateStart = SEARCH_CRITERIA.dateStart;
    const dateEnd =  SEARCH_CRITERIA.dateEnd;

    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getNodeData('.card-product-title', hotelNode) + getStars(hotelNode),
        href: getNodeData('[href*="/hotels/hotel/"]', hotelNode, 'href'),
        country: "Россия",
        region: SEARCH_CRITERIA.region,
        accommodation: SEARCH_CRITERIA.accommodation,
        roomType: getNodeData('.me-2:not(.text-black)', tour),
        boardType: '',
        price: extractIntFromStr(getNodeData('.text-black', tour)),
        currency: 'RUB',
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('img', hotelNode, 'src'),
        occupancy: null,
        excursion: false,
    };
    return option;
}

function getStars(node) {
    const starsNode = $1('[class*="star-category_"]', node);
    let stars = '';
    if (starsNode) {
        stars = starsNode.className.match(/star-category_(\d)/) && starsNode.className.match(/star-category_(\d)/)[1]
        return ` ${stars}*`;
    }
    return '';
}


function getHotelRowByImage(img) {
    return img.closest('tr, .card');
}
