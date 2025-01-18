window.OPERATOR_NAME = "САНАТА ТРЕВЕЛ";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$(".itog-price.min-price.value").forEach(div => {
        if (!div.parentNode.querySelector(".qq")) {
            const btns = qqBtns({align: "qq-horizontal"});
            btns.style.margin = '5px';
            div.after(btns);
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const date = document.querySelector('.dates-booking-object input.date-from').value;
    const price = getText(tour.querySelector('.itog-price.min-price.value')).replace(/\D+/g, '');
    const board = $$('.control-label', tour).filter( label => getText(label).match(/питание/i) ).map( lb => getText(lb.parentNode).replace(/питание:/i, '') )
    let option = {
        checkinDt: new Date(date).toLocaleDateString('ru'),
        nights: (+selectedOption(document.querySelector('.dates-booking-object select.days'))-1).toString(),
        hotelName: getText(document.querySelector('.price-object-block h4')),
        href: window.location.href,
        country: "Россия",
        region: getText(document.querySelector('.price-object-block address'), 'innerText').replace(/\s*Показать на карте/, ''),
        roomType: getText(tour.querySelector('.title-room')),
        boardType: board.length > 0 ? board[0] : null,
        price: isNaN(price) || !price ? 0 : extractIntFromStr(price),
        currency: "RUB",
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(document.querySelector('#module-poisk .img-thumbnail.img-small-head'), null, 'src'),
        occupancy: getOccupancy(tour)
    };
    return option;
}

function getOccupancy(tour) {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    occupancy.adultsCount = $$('select.main-place', tour).map( sel => selectedOption(sel) ).reduce( (cur, sum) => +cur+ +sum  ,0);
    return occupancy;
}

function getHotelRowByImage(img) {
    return img.closest('.price-room-block');
}
