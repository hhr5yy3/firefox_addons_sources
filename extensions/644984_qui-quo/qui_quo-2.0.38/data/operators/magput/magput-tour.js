window.OPERATOR_NAME = "Magput";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function parseMagputDate(text) {
    if(!text) return null;
    const [day, month, year, week] = trim(text).split(/\s/);
    return `${day}.${String(monthNameToNumber(month)).padStart(2, 0)}.${year.slice(-2)}`;
}

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$(".tcart__in").forEach(div => {
        if ( !div.querySelector(".qq") && isDateGiven(div) ) {
            const btns = qqBtns({align: "qq-horizontal"});
            btns.style.setProperty('justify-content', 'end')
            btns.style.setProperty('width', '100%')
            btns.style.setProperty('margin', '4px 0 0 4px')
            div.querySelector('.tcart__item').after(btns);
        }
    });

    $$(".singlePriceRow > .price").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") && isDateGiven(div) ) {
            const btns = qqBtns({align: "qq-horizontal"});
            $1('.programPricesTable').style.setProperty('padding', '4.4rem 3.8rem');
            div.closest('.prices').classList.replace('col-3', 'col-4');
            $1('.time', div.closest('.priceRow')).classList.replace('col-2', 'col-1');
            div.after(btns);
        }
    });

    $$(".programPreviewData").forEach(div => {
        if ( !div.querySelector(".qq") && isDateGiven(div) ) {
            const btns = qqBtns({align: "qq-horizontal"});
            btns.style.setProperty('justify-content', 'end')
            btns.style.setProperty('width', '100%')
            btns.style.setProperty('margin', '4px 0 0 4px')
            div.append(btns);
        }
    });
}

function isDateGiven(div) {
    return $1('.singleDayColor:not(.red-date', div) ||
    $1('.priceRow > .places > span') ||
    $1('.availableDay > .day') ||
    null;
}

function getDate(tour, data) {
    const canBookDate = $1('.singleDayColor:not(.red-date', data);
    const inlineDateArr = $$('.priceRow').filter(item => getNodeData('.places > span', item) !== 'Нет');
    const inlineDateWithClass = getNodeData('.availableDay > .day');
    const inlineDateType3 = tour.closest('.priceRow') && getNodeData('.data', tour.closest('.priceRow'));

    const date = getNodeData('.dayTitle', canBookDate?.closest('a'))?.slice(0, -4) ||
    parseMagputDate(inlineDateType3) ||
    inlineDateArr[0] && parseMagputDate(getNodeData('.data', inlineDateArr[0])) ||
    inlineDateArr[0] && parseMagputDate(getNodeData('.monthAndDay > div', inlineDateArr[0])) ||
    inlineDateWithClass && parseMagputDate(inlineDateWithClass.split(', ')[1]);

    return date || null;
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const data = tour.closest('.tcart__item') ?? tour.querySelector('.tcart__item') ?? document;

    const checkinDt = getDate(tour, data);
    const nights = (getNodeData('.tcart__time > span', data)?.match?.(/\d+\sдн/)?.[0]?.replace?.(/\D+/g, '') ?? 1) ||
                   (getNodeData('.programPreviewDataLine.dataTime', data)?.match?.(/\d+\sдн/)?.[0]?.replace?.(/\D+/g, '') ?? 1);
    const hotelName = getNodeData('.tcart__head > a', data) ||
                      getNodeData('.viewprog__title', data) + " " + getNodeData('.subTitle', data);
    const hotel_desc = getNodeData('.tcart__text_full', data) ||
                       getNodeData('.program_small-description', data);
    const thumbnail = getNodeData('.tcart__img > a > img', data, 'src') ||
                      getNodeData('.swiper-slide > a > img', data, 'src');
    const hotelNamesReal = $1('a', tour)?.dataset?.originalTitle?.match(/а:.+<b>/)?.[0]?.slice?.(3,-4);
    const priceText = getNodeData('.tcart__from-money > span:first-child > span:not(.strike)', data) ||
                      getNodeData('.tcart__from-money > span:first-child', data) ||
                      getNodeData('.price, .dataPrice', tour).replace(/\D+/g, '');
    const currencyText = getNodeData('.tcart__from-money > span:last-child', data) ||
                         getNodeData('.price, .dataPrice', tour).slice(-2, -1);
    const country = getNodeData('.topicAndBuyersCount > a', data) ?? '(a)';
    const regions = $$('.tcart__direction > a, .routePoints > li > a', data).map(i => i.textContent).join(' → ');
    const href = getNodeData('.tcart__head > a', data, 'href') ?? '';
    const cityFrom = getNodeData('.dataPlace', data) ?? '';
    const occupancy = getNodeData('.title', tour) ?? null;

    let option = {
        checkinDt,
        nights: nights - 1,
        hotelName,
        hotel_desc: hotelNamesReal ? `Отель(и): ${hotelNamesReal}. ${hotel_desc}` : hotel_desc,
        thumbnail,
        country: country.match(/орпоратив/) ? null : country.match(/\(/) ? country.replace(/\(([^()]*)\)(?!.*\([^()]*\))/g, '') : 'Несколько стран',
        region: regions,
        price: priceText,
        currency: mapCurrencyUtil(currencyText),
        occupancy: occupancy ? {
            adultsCount: occupancy.match('взрослый') ? 1 : 0,
            childrenCount: occupancy.match('детский') ? 1 : 0,
            childAges: null
        } : {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null
        },
        operator: window.OPERATOR_NAME,
        href: location.href.match('viewprog') ? location.href : href,
        city_from: cityFrom.replace(/(Место сбора: |\(схема\))/g, ''),
        boardType: "",
        roomType: "",
    };

    return option;
}

function getHotelRowByImage(img) {
    if(img.parentNode.parentNode.classList.contains('tcart__in')) return img.closest('.tcart__in');
    return img.closest('.bigDayWrap, .singlePriceRow, .programPreview');
}