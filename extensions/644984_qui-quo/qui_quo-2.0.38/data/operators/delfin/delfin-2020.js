window.OPERATOR_NAME = "Delfin";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    querySelectorAll(document, ".offers__col_price").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });

    const cruiseBron = document.querySelector('.cabin-order .cabin-order__price-total');
    if ( cruiseBron &&  !cruiseBron.querySelector(".qq") ) {
        const btns = qqBtns({align: "qq-horizontal"}, createCruiseOption);
        btns.style.marginRight = '5px';
        cruiseBron.prepend(btns);
    }
    $$(".cruise-tours .cruise-tour .col__price").filter(div => $first('.price', div)).forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-box", cssText: `width: 100%;justify-content: end;`}, createCruiseOption2022));
        }
    });

    $$('.v-card > .v-card > .pa-2 > .caption:not(.mt-2)').forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-box"}, createCruiseOptionCabin));
        }
    })
}

function createOption(img) {
    const tour = getHotelRowByImage(img, "offers__row");
    const hotel = getHotelRowByImage(tour);
    const breadcrumbs =  querySelectorAll(document, 'a.v-breadcrumbs__item').map(item => getText(item));
    const regionCaption =  hotel ? getNodeProperty($1('.heading', hotel).nextElementSibling, '') : null;
    const regionPoints = regionCaption ? regionCaption.split(", ") : breadcrumbs;
    const price = getText(tour.querySelector('.price .sum'));
    const excursionRoute = getExcursionRoute();
    const bodyTwo = querySelectorAll(tour, '.body-2');
    const nights = $$('.offers__col_to, .offers__col_from').map(col => getText(col)).find( col => col.match(/\d+.*?ноч/));
    const hotelName = getHotelName(tour, hotel);
    let option = {
        checkinDt: getText(tour.querySelector('.offers__col_from')).match(/\d{2}\.\d{2}\.\d{4}/)[0],
        nights: nights.match(/(\d+).*?ноч/)[1],
        hotelName,
        hotel_desc: getNodeProperty(document.querySelector('#ppt-base')) || lastElement($$('[itemprop="description"]', hotel).extractNodesText()),
        href: hotel ? getNodeProperty(hotel.querySelector('a.list-item__link') || window.location.href, null, 'src') : window.location.href,
        country: regionPoints.shift(),
        region: regionPoints.filter(p => !p.includes(hotelName)).join(', ') || excursionRoute,
        roomType: getNodeProperty(tour.querySelector('.room')) ||
                  getNodeProperty(findItem(bodyTwo, /Номер/i), '').replace(/для:/i, ''),
        boardType: getText(findItem(bodyTwo, /питание/i)),
        price: extractIntFromStr(price.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g, '')),
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: hotel ? $$('.v-image__image--cover', hotel).map(getBackgroundImageUrl).find(url => !!url) :
                           getBackgroundImageUrl(document.querySelector('.gallery .v-image__image--cover')),
        occupancy: getOccupancy(tour),
        excursion:  hotel ? isExcursion(hotel) : !!excursionRoute
    };

    if ( option.excursion ) {
        option.hotelName = `${option.hotelName}, Отель: ${getNodeData('.tariff', tour)}`;
    }
    return option;
}

function isExcursion(hotel) {
    return !!querySelectorAll(hotel, ".caption my-1").find(tab => getText(tab).match(/экскурси/));
}

function getHotelName(tour, hotel) {
    if ( !hotel ) {
        return getText(document.querySelector('section .display-1').childNodes[0]);
    }
    const caption = getText(hotel.querySelector('.heading'));
    const stars = querySelectorAll(hotel, '.v-rating button.primary--text').length;
    return `${caption}${stars > 0 ? " "+stars+"*" : "" }`
}

function getExcursionRoute() {
   const pArray = querySelectorAll(document, '#ppt-base p');
   const route = pArray.find( p => getText(p).match(/Маршрут тура/i));
   return getNodeProperty(route, '').replace(/Маршрут тура:/i, '');
}

function getOccupancy(tour) {
    return {
        adultsCount: querySelectorAll(tour, '.beds .adult').length,
        childrenCount: querySelectorAll(tour, '.beds .child').length,
        childAges: null
    };
}

function createCruiseOption(img) {
    const dates = querySelectorAll(document, '.tour-info__right .mb-2');
    const dateFrom = extractDate(findItem(dates, /Отправление/i));
    const dateTo = extractDate(findItem(dates, /Прибытие/i));
    const breadcrumb = querySelectorAll(document, '.container a.breadcrumbs__item');
    const ship = breadcrumb.find( item => getNodeProperty(item, '', 'href').match(/ships/i));
    const infoItems = querySelectorAll(document, '.cabin-order .cabin-order__info-item');
    const price = getText(document.querySelector('.cabin-order__price-total'));
    let option = {
        checkinDt: dateFrom,
        nights: `${getDistance(dayMonthYearToDate(dateFrom), dayMonthYearToDate(dateTo))}`,
        hotelName: getText(ship),
        hotel_desc: getNodeProperty(document.querySelector('.tour-info__title-row')),
        href: ship.href,
        country: "",
        region: getNodeProperty(document.querySelector('.tour-info__title')),
        roomType: getCabinInfo(infoItems),
        boardType: getNodeProperty(findItem(infoItems, /палуба/i)),
        price: extractIntFromStr(price.replace(/\D+/g, '')),
        currency: "RUB",
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(document.querySelector('.tour-info__img'), null, 'src'),
        occupancy: null
    };
    return option;
}

function extractDate(dateNode) {
    const dateText = getText(dateNode);
    const dateMatched =  dateText.match(/(\d{2})\s([а-я]+)\s(\d{4})/);
    return dateFromDayAndMonthName(dateMatched[1],dateMatched[2],dateMatched[3]);
}

function getCabinInfo(items) {
    const number = getNodeProperty(findItem(items, /Номер каюты/i));
    const category = getNodeProperty(findItem(items, /Категория каюты/i));
    return [number, category].join(', ');
}

function findItem(items, caption) {
    return items.find( item => getText(item).match(caption));
}

function getHotelRowByImage(img, selector = "list-item") {
    let div = img.parentNode;
    while (div) {
        if ( !div || !div.classList ) {
            return null;
        }
        if ( div.classList.contains(selector) ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

function createCruiseOption2022(img) {
    const tour = img.closest('.cruise-tour');
    const [date, days] = $$('.col__date, .col__days', tour).map(div => getText([...div.childNodes].find(node => node.nodeName === '#text')));
    const priceNode = getNodeData('.price', tour);
    let option = {
        checkinDt: dateFromDayAndMonthName(...date.split(/\s+/)),
        nights: String((parseInt(days) - 1)),
        hotelName: getNodeData('.col__ship a', tour) || getNodeData('.page-cruise-ship .surface .display-1'),
        href: getNodeData('.col__ship a', tour, 'href', null),
        region: getNodeData('.col__info .caption', tour),
        roomType: getNodeData('.col__ship .caption', tour),
        boardType: "",
        price: parseInt(priceNode.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(priceNode.replace(/\s+|\d+|от/g, '')),
        city_from: "",
        occupancy: null,
        skipRatingSearch: true,
        thumbnail: getBackgroundImageUrl($1('.v-image__image--cover'))
    };
    return option;
}

function createCruiseOptionCabin(img) {
    const shipData = $1('.page-cruise-tour > .surface > .container > .row');
    const cabinData = img.closest('.v-card:not(.ma-3)');

    const [route, start, end] = $$('.body-2 > .v-card > .v-card__text > div', shipData);
    const [checkinDt, checkoutDt] = [start, end].map(date => extractDate(date));

    const [_1, _2, shipNameElem] = $$('div:not(.body-2) > .v-card > .v-card__text > div > .flex-grow-1 > div', shipData);

    const [cabinNum, cabinType] = getNodeData('.prew', cabinData).split(' / ');
    const priceText = getElementShallowText($1('.caption:not(.mt-2)', cabinData)).replace(' за место', '');


    return {
        checkinDt: checkinDt,
        nights: getDistance(checkinDt, checkoutDt),
        hotelName: getText(shipNameElem) + ' Каюта №' + cabinNum,
        href: location.href,
        region: getNodeData('span', route),
        roomType: cabinType,
        boardType: "",
        price: priceText.replace(/\D+/g, ''),
        currency: mapCurrencyUtil(priceText.slice(-1)),
        city_from: "",
        occupancy: {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null
        },
        thumbnail: getComputedStyle($1('.v-image__image', cabinData)).backgroundImage.match(/url\("(.+)"\)/)?.[1]
    };
}