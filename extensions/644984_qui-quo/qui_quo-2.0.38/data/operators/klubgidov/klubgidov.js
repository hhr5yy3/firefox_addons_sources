window.OPERATOR_NAME = "Klubgidov";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$(".tile-list__col, .related-tours__col, .tour-dates-variant__info").forEach(div => {
        if ( !div.querySelector(".qq") && !div.querySelector(".tour-collection-card-wt") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('margin-top', '8px');

            div.append(btns);
        }
    });

    $$("#aside-booking-form").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('top', '12px');
            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'center');

            div.after(btns);
        }
    });

    $$(".tour-variants-list-item__price").forEach(div => {
        if ( !div.querySelector(".qq") && window.presavedQQOptions ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('top', '3px');
            btns.style.setProperty('margin-left', '8px');

            div.append(btns);
        }
    });
}

function parseBSDate(str) {
    if(!str) return null;
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
    const data = tour.classList?.contains('tour-dates-variant__info') ? tour.closest('.tour-page__container') : tour;
    const extraData = $1('.tour-schema')

    const metaCheckinDt = parseBSDate(getNodeData('[itemprop="startDate"]', tour, 'content'));
    const metaCheckoutDt = parseBSDate(getNodeData('[itemprop="endDate"]', tour, 'content'));
    const dateText = getTextWithoutInnerElements('.tour-dates-variant__description-col, .as-input-v1__content > .as-select__text-body', tour);

    const [checkinDt, checkoutDt] = dateText ? parseYoutravelmeDate(dateText, '–') : [metaCheckinDt, metaCheckoutDt]
    const thumbnail = getNodeData('[itemprop="image"]', data, 'content') ||
                      getNodeData('[itemprop="image"]', extraData, 'content') ||
                      getNodeData('.as-tile-picture > img', data, 'src');
    const href = getNodeData('[itemprop="url"]', data, 'content') ||
                 getNodeData('[itemprop="url"]', extraData, 'content');
    const hotelName = getNodeData('.tour-tile-card__title[itemprop="name"], .tour-resume__title', data) ||
                      getNodeData('[itemprop="name"]', data, 'content');
    const hotelDesc = getNodeData('[itemprop="description"]', data, 'content') ||
                      getNodeData('[itemprop="description"]', data);
    const country = getNodeData('[itemprop="addressCountry"], [itemprop="location"] > [itemprop="name"]', data, 'content') ||
                    getNodeData('[itemprop="addressCountry"], [itemprop="location"] > [itemprop="name"]', extraData, 'content');
    const region = getNodeData('[itemprop="addressRegion"]', data, 'content') ||
                   getNodeData('[itemprop="addressRegion"]', (extraData ?? $1('meta')), 'content');
    const priceText = getNodeData('.display-price, .sidebar-resume__price-value', tour);
    const price = priceText.replace(/\D+/g, '');
    const currency = priceText.trim().slice(-1);
    const cityFrom = getNodeData('.tour-booking-form__hint', data);

    let option = {
        checkinDt,
        nights: getDistance(checkinDt, checkoutDt),
        hotelName,
        hotel_desc: hotelDesc,
        href: href ? location.origin + href : location.href,
        country,
        region: region === country ? '' : region,
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

    if(tour.classList?.contains('tour-variants-list-item')) {
        const dataText = getTextWithoutInnerElements('.tour-variants-list-item__heading', tour);
        const [checkinDt, checkoutDt] = parseYoutravelmeDate(dataText, '–');
        const priceText = getNodeData('.tour-variants-list-item__price > span', tour);


        const option = Object.assign(structuredClone(window.presavedQQOptions), {
            checkinDt,
            nights: getDistance(checkinDt, checkoutDt),
            price: priceText.replace(/\D+/g, ''),
            currency: mapCurrencyUtil(priceText.trim().slice(-1)),
        })

        console.log(option);

        return option;
    }

    let option = getOptionData(img);

    console.log(option);

    return option;
}

function getHotelRowByImage(img) {
    return img?.closest('.tile-list__col, .related-tours__col, .tour-variants-list-item, .tour-dates-variant__info, .tour-page__container') ?? document;
}

document.querySelectorAll('.tour-tile-card__action--show-variants, .tour-dates__variants-button').forEach(button => {
    button.addEventListener('click', () => {
        window.presavedQQOptions = getOptionData(button.closest('.tile-list__col, .related-tours__col') ?? null);
    })
})