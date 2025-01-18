window.OPERATOR_NAME = "RZD";
window.showTopHotelsRating = false;
console.log("Loaded RZD search page")

function initializeSearchCriteria() {
    return {
        checkinDt: getNodeData('[controlname="fromDate"] input', document, 'value')
    };
}

function getSearchButton() {
    return $$('.route-search__submit-button')
}

function injectData() {
    $$(".item__price, .card-class__price").forEach((div, index) => {
        if ( !div.parentNode.querySelector(".qq") ) {
            div.after(qqBtns({align: "qq-horizontal"}));
            if (  index === 0 ) {
                SEARCH_CRITERIA = initializeSearchCriteria();
            }
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const priceCell = $1('.card-class__price, .item__price', img.closest("rzd-card-class, .card__class-item--radio"));
    const seatItem = priceCell.closest('rzd-card-class, .card__class-item');
    const mainRow = $first('.card-route__main-row, .row.card__timeline', tour);
    const [dateStart, dateEnd] = $$('.card-route__date-time, .date', mainRow).map(extractDateCell);


    const hotelName = getRegion(mainRow, tour, dateStart, dateEnd)
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        region: "Поезд: " + getNodeData('.card-header__title', tour)+ ', ' + $$('.card-header__carrier', tour).map(s => getText(s)).join(''),
        href: "",
        hotelName,
        roomType: getNodeData('.card-class__name, .item__name', seatItem),
        boardType: "",
        price: extractIntFromStr((getNodeData('.item__sum', priceCell) || getNodeData('span', priceCell)).replace(/\s+/g, '')),
        currency: "RUB",
        city_from: $$('.card-route__station', tour).map(getText)[0],
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

function getRegion(mainRow, tour, dateStart, dateEnd) {
    const [timeStart, timeEnd] = $$('.card-route__date-time .card-route__time, .time', mainRow).map(getText);
    const [stationStart, stationEnd] = $$('.card-route__station, .station', tour).map(getText);
    return `Ж/Д: ${stationStart} (${dateStart} ${timeStart}) → ${stationEnd} (${dateEnd} ${timeEnd})`;
}

function extractDateCell(cell) {
    const dateDiv = $first('.card-route__date, .date', cell)
    const dateStr = dateDiv ? getNodeData({node: dateDiv}) : getNodeData('.route-search__from-date .input__text, .route-search__from-date .ui-kit-input-side-text-container');
    const date = dateStr ? dateStr.split(/\s+|\s*,\s*/) : SEARCH_CRITERIA.checkinDt.split(/\s+|\s*,\s*/)
    return dateFromDayAndMonthName(date[0], date[1]);

}

function getHotelRowByImage(img) {
    return img.closest('.card__body');
}
