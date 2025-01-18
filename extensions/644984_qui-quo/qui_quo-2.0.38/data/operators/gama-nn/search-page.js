window.OPERATOR_NAME = "ГАМА";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".pj-s-tbl .in-actual").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-vertical", cssText: 'margin-left:4px;'}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);

    let option = {
        checkinDt: getText($first('.in-dt', tour)),
        nights: String(Number(getText($first('.in-days', tour)).replace(/\D+/g, ''))-1),
        hotelName: getNodeProperty($first('.in-ship-txt', tour)) || getNodeProperty($first('section h1')),
        href: getNodeProperty($first('.in-ship-txt a', tour), null, 'href'),
        country: "Россия",
        region: getText($first('.in-way-text', tour)),
        roomType: "",
        boardType: "",
        price: extractIntFromStr(getText($first('.in-min-price', tour)).replace(/\D+/g, '')),
        currency: "RUB",
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeProperty($first('.in-ship img', tour), null, 'src'),
        occupancy: ""
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.in-actual');
}
