window.OPERATOR_NAME = "Гагра";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return {occupancy: getOccupancy()};
}

function getSearchButton() {
    return $$('[name*="btnSearch"]');
}

function injectData() {
    $$(".ggr__masterweb__qd__search-result-block .row.ggr__masterweb__qd__search-result-item__second").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-box", cssText: 'height:100%;'}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const objectCell = $first('.ggr__masterweb__qd__search-result-item__column--object', tour);
    const region = getNodeData('span', objectCell).split('->');
    const tourTypeSpans = $$('.ggr__masterweb__qd__search-result-item__column--tour-type span', tour).map(c => getText(c));
    const dateCell = $first('.ggr__masterweb__qd__search-result-item__column--date', tour);
    let option = {
        checkinDt: appendYear(...getNodeData('strong', dateCell).split(/\D+/).filter(s=>s)),
        nights: getText(lastElement($$('span', dateCell))).replace(/\D+/g, ''),
        hotelName: getNodeData('a', objectCell),
        href: getNodeData('a', objectCell, 'href').replace(/http.+?https/, 'https:'),
        country: region[0],
        region: region[1],
        accommodation: tourTypeSpans[0],
        roomType: getNodeData('.ggr__masterweb__qd__search-result-item__column--room', tour),
        boardType: tourTypeSpans[1],
        price: extractIntFromStr(getNodeData('.ggr__masterweb__qd__search-result-item__name__price', tour).replace(/\D+/g,'')),
        currency: "RUB",
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('.ggr__masterweb__qd__search-result-item__column--photo img', tour, 'src'),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getOccupancy() {
    const occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    occupancy.adultsCount = Number(getNodeData('input[name*="txtAdults"]', document, 'value'));
    occupancy.childrenCount = Number(getNodeData('input[name*="txtChilds"]', document, 'value'));
    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges =  $$('input[name*="txtChild"]:not([name*="txtChilds"])').filter(i => i.clientHeight > 0).map(i => i.value).join();
    }
    return occupancy;
}

function getHotelRowByImage(img) {
    return img.closest('.row');
}
