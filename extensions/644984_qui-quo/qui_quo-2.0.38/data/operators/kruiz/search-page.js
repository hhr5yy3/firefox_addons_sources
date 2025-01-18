window.OPERATOR_NAME = "Круиз.Онлайн";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$('[class*="desktopResult_list"] [class*="card_footer_"]').forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const [dateStart, dateEnd] = getNodeData('[class*="traveltime_dates"]', tour).split(/\s*-\s*/).map(dt => dateFromDayAndMonthName(...dt.split(/\s+/)));
    const price = getNodeData('[class*="card_price"]', tour);
    let option = {
        checkinDt: dateStart,
        dateEnd,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getNodeData('header[class*="card_header"]', tour),
        href: getNodeData('a[class*="card_btn_"]', tour, 'href'),
        country: "",
        region: getNodeData('[class*="card_body"] p', tour),
        roomType: "",
        boardType: "",
        price: Number(price.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(lastElement(price.split(/\d+\s*/))),
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('[class*="card_pic"] img', tour, 'src'),
        occupancy: getOccupancy()
    };
    return option;
}

function getOccupancy() {
    try {
        let occupancy = {
            adultsCount: 0,
            childrenCount: 0,
            childAges: null
        };

        const filter = JSON.parse(localStorage.getItem('filter'));
        if ( !filter || !filter.passengers ) {
            return null;
        }

        occupancy.adultsCount = filter.passengers.adults;
        occupancy.childrenCount = filter.passengers.children;
        occupancy.childAges = filter.passengers.years.join();
        return occupancy;
    } catch (e) {
        console.log(e);
        return null;
    }
}

function getHotelRowByImage(img) {
    return img.closest('[class*="card_wrapper"]');
}
