window.OPERATOR_NAME = "Triumf-Kolomna";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$(".tour__adultprice, .tour__childprice").forEach(div => {
        if (!div.querySelector(".qq") && div.closest('.tour__card_vertical').querySelector('.tour__time > span')) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('justify-content', 'center');
            btns.style.setProperty('flex-basis', '75%');
            div.querySelector('img').style.setProperty('flex-basis', '50%');
            div.querySelector('span').style.setProperty('flex-basis', '50%');
            div.style.setProperty('flex-wrap', 'wrap');

            div.append(btns);
        }
    });

    $$(".adultprice, .childprice").forEach(div => {
        if (!div.querySelector(".qq")) {
            const btns = qqBtns({align: "qq-horizontal"});

            div.style.setProperty('flex-direction', 'column');
            btns.style.setProperty('margin-right', '45px');

            div.append(btns);
        }
    });
}

function parseKolomnaDate(date) {
    const day = date.match(/\d+/)[0];
    const month = date.match(/\D+/)[0];
    return appendYear(day, monthNameToNumber(month));
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const data = tour.closest('.tour__card_vertical') ?? document;

    const type = (tour.classList.contains('tour__adultprice') || tour.classList.contains('adultprice')) ? 'adult' : 'child'

    const checkinDt = getNodeData('.tour_date', data) ||
                      parseKolomnaDate(getNodeData('.single-tour__date'));
    const nights = getNodeData('.tour__time, .time', data).replace(/\D+/g, '');
    const hotelName = getNodeData('.tour__name, .single-tour__heading', data);
    const hotel_desc = getNodeData('.tour__shortdescription, .annotation', data);
    const region = getNodeData('.tour__location, .location', data);
    const priceText = getNodeData('span, p', tour);
    const price = priceText.replace(/\D+/g, '');
    const currency = mapCurrencyUtil(priceText.slice(-1));
    const thumbnail = getNodeData('.tour__card_img > img, .main__photo > img', data, 'src');
    const href = getNodeData('.tour__name > a', data, 'href') ?? location.href;

    let option = {
        checkinDt,
        nights,
        hotelName,
        hotel_desc,
        href,
        country: "Россия",
        region,
        roomType: "",
        boardType: "",
        price,
        currency,
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail,
        occupancy: {
            adultsCount: type === 'adult' ? 1 : 0,
            childrenCount:  type === 'child' ? 1 : 0,
            childAges: null
        },
    };

    return option;
}

function getHotelRowByImage(img) {
    return img.closest('div:not(.qq-add-btn, .qq)');
}
