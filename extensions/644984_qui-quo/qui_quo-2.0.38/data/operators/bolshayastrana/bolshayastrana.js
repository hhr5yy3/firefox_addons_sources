window.OPERATOR_NAME = "Bolshayastrana";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$(".tour-preview__more").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('width', '100%');
            btns.style.setProperty('height', '100%');
            btns.style.setProperty('justify-content', 'flex-end');
            btns.style.setProperty('align-items', 'center');

            div.before(btns);
        }
    });

    $$(".sidebar-resume__no-payment").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('top', '12px');
            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'center');

            div.after(btns);
        }
    });

    $$(".tour-dates-variant").forEach(div => {
        if ( !div.querySelector(".qq")) {
            const btns = qqBtns({align: "qq-horizontal"}, createOptionWithDocument);

            btns.style.setProperty('z-index', '2')

            div.append(btns);
        }
    });

    $$(".variants-list__items > button > .is-justify-space-between > .variants-list-item__price").forEach(div => {
        if ( !div.querySelector(".qq") && window.presavedQQOptions ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('top', '3px');

            div.append(btns);
        }
    });
}

function parseBSDate(str) {
    return str.split(/\D/).reverse().join('.')
}

function parseYoutravelmeDate(text, separator) {
    let dateArr = text.split(separator);

    if(dateArr.length === 1) dateArr.push(dateArr[0]);

    dateArr = dateArr.map(i => i.trim().split(/\s/));

    if(dateArr[1].length === 2) dateArr[1].push(String((new Date()).getFullYear()));
    if(dateArr[0].length === 1) dateArr[0].push(...[dateArr[1][1], dateArr[1][2]]);
    if(dateArr[0].length === 2) dateArr[0].push(dateArr[1][2]);

    dateArr = dateArr.map(i => i.join(' '));

    return dateArr.map(i => {
        const [day, month, year] = i.trim().split(/\s/);
        return `${day.padStart(2, 0)}.${String(monthNameToNumber(month)).padStart(2, 0)}.${year.slice(-2)}`;
    })
}

function getTextWithoutInnerElements(selector, el = document.documentElement) {
    if(!el) return null;
    const parentDiv = el.querySelector(selector);
    if(!parentDiv) return null;
    const clonedDiv = parentDiv.cloneNode(true);

    clonedDiv.querySelectorAll('*').forEach(el => el.remove());

    return clonedDiv.textContent.trim();
}

function getOptionData(img) {
    const tour = getHotelRowByImage(img);

    const checkinDt = parseBSDate(getNodeData('[itemprop="startDate"]', tour, 'content'));
    const checkoutDt = parseBSDate(getNodeData('[itemprop="endDate"]', tour, 'content'));
    const thumbnail = getNodeData('[itemprop="image"]', tour, 'content');
    const href = getNodeData('[itemprop="url"]', tour, 'content');
    const hotelName = getNodeData('.tour-preview__title[itemprop="name"], .tour-header__title[itemprop="name"]', tour);
    const hotelDesc = getNodeData('[itemprop="description"], .tour-main-info__description', tour);
    const region = getNodeData('[itemprop="addressRegion"]', tour, 'content');
    const priceText = getNodeData('.sidebar-resume__price-value');
    const price = $1('.tour-preview__details-group > div > [itemprop="price"]', tour)?.getAttribute('content') ||
                  priceText.replace(/\D+/g, '');
    const currency = getNodeData('.tour-preview__details-group > div > [itemprop="priceCurrency"]', tour, 'content') ||
                     priceText.trim().slice(-1);
    const cityFrom = getTextWithoutInnerElements('.sidebar-gathering')?.split(/\s\s\s/).pop()?.trim();

    let option = {
        checkinDt,
        nights: getDistance(checkinDt, checkoutDt),
        hotelName,
        hotel_desc: hotelDesc,
        href: location.origin + href,
        country: "Россия",
        region,
        roomType: "",
        boardType: "",
        price,
        currency: mapCurrencyUtil(currency),
        city_from: cityFrom ?? "",
        operator: OPERATOR_NAME,
        thumbnail,
        occupancy: {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null
        },
    };

    return option;
}

function createOption(img) {
    const tour = getHotelRowByImage(img);

    if(tour.classList?.contains('variants-list-item')) {
        const dataText = getNodeData('.variants-list-item__date', tour);
        const [checkinDt, checkoutDt] = parseYoutravelmeDate(dataText, '—');
        const priceText = getTextWithoutInnerElements('.variants-list-item__price', tour);


        const option = Object.assign(structuredClone(window.presavedQQOptions), {
            checkinDt,
            nights: getDistance(checkinDt, checkoutDt),
            price: priceText.replace(/\D+/g, ''),
            currency: mapCurrencyUtil(priceText.trim().slice(-1)),
        })

        return option;
    }

    let option = getOptionData(img)

    return option;
}

function createOptionWithDocument(img) {
    const tour = getHotelRowByImage(img);

    const dateText = getTextWithoutInnerElements('.tour-dates-variant__description-col', tour).replace('В период', '').trim();
    const [checkinDt, checkoutDt] = parseYoutravelmeDate(dateText, '—');
    const priceText = getNodeData('.tour-dates-variant__price-value', tour);

    const option = Object.assign(getOptionData($1('div')), {
        checkinDt,
        nights: getDistance(checkinDt, checkoutDt),
        price: priceText.replace(/\D+/g, ''),
        currency: mapCurrencyUtil(priceText.trim().slice(-1)),
    })

    return option;
}

function getHotelRowByImage(img) {
    return img?.closest('.tour-preview[itemscope="itemscope"], .variants-list-item, .tour-dates__item') ?? document;
}

document.querySelectorAll('.tour-preview__variants-button, .sidebar-dates__button, .tour-dates__pagination-button').forEach(button => {
    button.addEventListener('click', () => {
        window.presavedQQOptions = getOptionData(button.closest('.tour-preview[itemscope="itemscope"]'));
    })
})