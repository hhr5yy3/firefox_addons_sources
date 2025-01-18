window.OPERATOR_NAME = "RZD";
window.showTopHotelsRating = false;
console.log("Loaded RZD order page")

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".passenger-info__ticket-price").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = $first('.trail-segment__container');
    const priceCell = getHotelRowByImage(img);
    const passengerCard = priceCell.closest('rzd-train-ticket');

    const [dateStart, dateEnd] = $$('.timeline__datetime', tour).map(extractDateCell);

    const hotelName = getRegion(tour, dateStart, dateEnd)
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        region: "Поезд: " + getNodeData('.header__transport-name', tour),
        href: "",
        hotelName,
        roomType: getNodeData('rzd-train-ticket-place-info', passengerCard),
        boardType: "",
        price: extractIntFromStr(getNodeData({node: $first('.price__lg', priceCell)}).replace(/\s+/g, '')),
        currency: "RUB",
        city_from: $$('.route-timeline__point--origin, .route-timeline__point--destination', tour).map(getText)[0],
        operator: window.OPERATOR_NAME,
        thumbnail: "",
        occupancy: {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null
        },
        excursion: false,
        product_type: 'Train'
    };
    return option;
}

function getRegion(tour, dateStart, dateEnd) {
    const [timeStart, timeEnd] = $$('.timeline__time', tour).map(getText);
    const [stationStart, stationEnd] = $$('.route-timeline__point--origin, .route-timeline__point--destination', tour).map(getText);
    return `Ж/Д: ${stationStart} (${dateStart} ${timeStart}) → ${stationEnd} (${dateEnd} ${timeEnd})`;
}

function extractDateCell(cell) {
    const dateDiv = $first('.timeline__date', cell)
    const date = getNodeData({node: dateDiv}).split(/\s+|\s*,\s*/);
    return dateFromDayAndMonthName(date[0], date[1]);

}

function getHotelRowByImage(img) {
    return img.closest('.passenger-info__ticket-price');
}
