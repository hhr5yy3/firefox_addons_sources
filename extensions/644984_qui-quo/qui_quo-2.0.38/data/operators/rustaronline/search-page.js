window.OPERATOR_NAME = "Rustaronline";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    const occupancy = getOccupancy();
    if ( !occupancy ) {
        return null;
    }
    return {occupancy};
}

function getSearchButton() {
    return $1('#SearchButton');
}

function injectData() {
    $$(".room-list.hotel .action-section").forEach(div => {

        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotelNode = getHotelRowByImage(img, '.hotel-list.hotel');
    const [dateStart, dateEnd] = getNodeData('.amenities', hotelNode).match(getRegexPatterns().date);
    const hotelsNameNode = $1('h3.box-title', hotelNode).firstChild
    const spans = $$('span[id]', tour).extractNodesText();
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getText(hotelsNameNode),
        href: null,
        country: getNodeData('button.topcountrybtnactive'),
        region: getNodeData('h3.box-title small', hotelNode),
        roomType: spans[0],
        boardType: spans[1],
        price: extractIntFromStr(getNodeData('h3 span.label-success, h3 span.label-warning', tour).replace(/\s+/g, '')),
        currency: "USD",
        city_from: "",
        thumbnail: getNodeData('.hotel figure img', hotelNode, 'src'),
        occupancy: SEARCH_CRITERIA && SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getOccupancy() {
    try {
        let occupancy = {
            adultsCount: extractIntFromStr(selectedOption($1('select#Adults'))),
            childrenCount: extractIntFromStr(selectedOption($1('select#Children'))),
            childAges: null
        };

        return occupancy
    } catch (e) {
        console.log(e);
        return null;
    }
}

function getHotelRowByImage(img, selector = '.row') {
    let div = img.parentNode;
    while (div) {
        if ( $1(selector, div) ) {
            return div;
        }
        div = div.parentNode;
    }
}
