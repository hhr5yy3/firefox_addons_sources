window.OPERATOR_NAME = "Youtravel";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function parseYoutravelmeDate(text) {
    const [day, month, year] = trim(text).split(/\s/);
    return `${day.padStart(2, 0)}.${String(monthNameToNumber(month)).padStart(2, 0)}.${year.slice(-2)}`;
}

function injectData() {
    $$(".serp-grid-item__content").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'end');
            btns.style.setProperty('top', '4px');

            div.append(btns);
        }
    });

    $$(".booking-popup__wrapper-container, .booking-popup-mobile__wrapper-container").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'end');
            btns.style.setProperty('top', '16px');

            div.append(btns);
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img) ?? document;

    let dateArr = getNodeData('.serp-grid-item__dates > div > span > div > .text-truncate, .booking-popup-fieldset__title', tour).split(/\s.\s/);
    if(dateArr.length === 1) dateArr.push(dateArr[0]);
    dateArr = dateArr.map(i => i.split(/\s/))
    if(dateArr[1].length === 2) dateArr[1].push(String((new Date()).getFullYear()));
    if(dateArr[0].length === 1) dateArr[0].push(...[dateArr[1][1], dateArr[1][2]]);
    if(dateArr[0].length === 2) dateArr[0].push(dateArr[1][2]);
    dateArr = dateArr.map(i => i.join(' '));
    const [checkinDt, checkoutDt] = dateArr.map(i => parseYoutravelmeDate(i));
    const hotelName = getNodeData('.serp-grid-item__title, .serp-detail__h1', tour);
    const hotelDesc = getNodeData('.serp-grid-item__description, .extension-cropped__body-container > div', tour);
    const priceText = getNodeData('.serp-grid-item__price-current, .booking-popup__prices-result, .booking-popup-mobile__prices-result', tour);
    const currencyText = priceText.slice(0, 1);
    const place = getNodeData('.text-truncate > span.cl-dark-grey-primary:last-child', tour)?.split(', ') ||
                  getNodeData('.tour-arrival__text', tour)?.split(', ').reverse();
    const thumbnail = getNodeData('img.tour-gallery-grid__img, img.tour-gallery-slider__img, img.img-cover', tour, 'src');
    const href = tour?.closest?.('a').getAttribute('href') || location.href;

    if($1('.tour-arrival__text', tour) && place.length === 1) place.unshift('')

    let option = {
        checkinDt,
        nights: getDistance(checkinDt, checkoutDt),
        hotelName,
        hotel_desc: hotelDesc,
        href,
        country: place[0].replace(/[^а-яА-Я-]+/g, ''),
        region: place?.[1] ?? "",
        roomType: "",
        boardType: "",
        price: priceText.replace(/[^0-9,]+/g, '').replace(',', '.'),
        currency: mapCurrencyUtil(currencyText ?? ''),
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail,
        occupancy: {
            adultsCount: Number(getNodeData('.counter__value') ?? 1),
            childrenCount: 0,
            childAges: null
        },
    };
    
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.serp-grid-item');
}