window.OPERATOR_NAME = "Volgadream";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".n22-pu-cont-bot-row > .btn-row > .btn.special-btn, .btn-row > .btn.special-btn.js-send-form").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            div.style.setProperty('flex-direction', 'column');

            div.append(btns);
        }
    });

    $$(".n22-tpc-hover-btns > .btn-row, .order-count-person-thumbs > .btn-row").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('width', 'calc(50% - 8px)');
            btns.style.setProperty('height', '34px');
            btns.style.setProperty('padding-top', '6px');
            btns.style.setProperty('margin', '5px');
            btns.style.setProperty('background', 'white');
            btns.style.setProperty('justify-content', 'center');
            btns.style.setProperty('align-items', 'flex-start');
            div.style.setProperty('flex-direction', 'column');

            div.append(btns);
        }
    });
}

function parseVolgadreamFullDate(date) {
    const [start, end] = date.split(' - ');
    return [parseVolgadreamPartiallDate(start), parseVolgadreamPartiallDate(end)]
}

function parseVolgadreamPartiallDate(date) {
    const [day, month, year] = date.split(' ');
    return appendYear(day, monthNameToNumber(month))
}

function getTextWithoutInnerElements(selector, el = document.documentElement) {
    if(!el) return null;
    const parentDiv = el.querySelector(selector);
    if(!parentDiv) return null;
    const clonedDiv = parentDiv.cloneNode(true);

    clonedDiv.querySelectorAll('*').forEach(el => el.remove());

    return clonedDiv.textContent.trim();
}

function createOption(img) {
    const tour = getHotelRowByImage(img);

    const counter = getNodeData('.n22-tp-car-slide-counter', $1('[aria-hidden="false"]'))?.match(/(Шаг)\s./)?.[0]?.slice(-1)

    const hotelName = getNodeData('h3', tour) ||
                      getNodeData('h1.n22-mbt-title');
    const hotelDesc = getNodeData('.n22-text-panel', tour) ||
                      getNodeData('.text-panel.fade-in-0-3');
    const region = getNodeData('.n22-pu-cities-row', tour) ||
                   $$('.route-thumbs__name').map(i => getText(i)).join(' → ');
    const href = getNodeData('.btn.special-btn', tour, 'href');
    const dateText = getNodeData('.cruis-item-date-box__item, .n22-tpc-date-info-val:not([id])', tour) ||
                     $$('#date_start, #data_end').map(i => getText(i)).join(' - ');
    const dateArr = parseVolgadreamFullDate(dateText);
    const price = getNodeData('.n22-pu-price > span, .order-count-person-thumbs__top__price > span', tour) ||
                  getTextWithoutInnerElements('.n22-tpc-date-price-block, .n22-tdp-price', tour) ||
                  getNodeData('.n22-total-room-price-val > span');
    const thumbnail = getNodeData('picture.slick-current > img', tour, 'src') ||
                      getNodeData('picture > img', tour, 'src') ||
                      getNodeData('.n22-main-bn-pic > img', document, 'src');
    const roomType = getNodeData('.n22-tdp-name', tour) ||
                     (counter > 2 && getNodeData('#form-razm')) || '';


    let option = {
        checkinDt: dateArr[0],
        nights: getDistance(dateArr[0], dateArr[1]),
        hotelName,
        hotel_desc: hotelDesc,
        href: href ?? location.href,
        country: "Россия",
        region: region.replace(/\n\s*/g, ' → '),
        roomType: roomType ?? '',
        boardType: "",
        price: price.replace(/\D+/g, ''),
        currency: "RUB",
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail,
        occupancy: counter > 2 ? getOccupancy(getNodeData('.order-count-person-thumbs__top__title', tour)) : {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null
        },
    };

    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.n22-prices-unit, .n22-tp-car-date-unit, .n22-tp-car-slide-d-list-unit, .order-count-person-item, .n22-tp-car-slide[aria-hidden="false"]');
}

function getOccupancy(text) {
    const occupancyText = (text ?? getNodeData('#form-occupancy')?.replace('до 14 лет', ''))?.toLowerCase();

    if(!occupancyText) return null;

    const numMap = {
        'взрослый': 1,
        'взрослых': 1,
        'один': 1,
        'двое': 2,
        'трое': 3,
        'четверо': 4,
    }
    let children = 0;
    let adults = 0;

    const adultsArr = occupancyText.split(/(взрослый|взрослых)/);
    const childrenArr = (adultsArr[1] ?? occupancyText).split(/(ребенок|детей)/);

    let childrenMatch = occupancyText.match(/(реб|дет)/i);
    if (childrenMatch) {
        if(trim(childrenArr[0]) === 'и') children = 1;
        else children = numMap[trim(childrenArr[0])];
    }

    let adultsMatch = occupancyText.match(/(взр)/i);
    if (adultsMatch) {
        if(!trim(adultsArr[0])) adults = 1;
        else adults = numMap[trim(adultsArr[0])];
    }

    return {
        adultsCount: adults,
        childrenCount: children,
        childAges: null
    };
}