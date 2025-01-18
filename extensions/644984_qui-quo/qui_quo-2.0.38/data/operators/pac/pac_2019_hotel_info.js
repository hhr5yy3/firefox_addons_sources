window.OPERATOR_NAME = "PAC GROUP";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    const checkinDt = getNodeProperty($first('[data-action="\/hotel\/variants/"] input[data-name="filter_date_from"]'), null, 'value');
    const nights = getNodeProperty($first('[data-action="\/hotel\/variants/"] input[name="Nights"]'), null, 'value');
    if ( !checkinDt || !nights ) {
        return null;
    }
    return {
        checkinDt, occupancy: getOccupancy(), nights
    };
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".js-hotel_item-without-tour").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-vertical", cssText: 'margin-left: 8px'}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const tourInfoText = $$('.tour-info__text').map(node => {
        const title = getNodeData('.tour-info__title', node);
        return {
            title,
            text: getText(node).replace(title, ''),
            node

        }
    });
    const findByTitle = (title) => tourInfoText.find(obj => obj.title.match(title))
    const [country, region] = findByTitle(/Страна/i).text.split(/\s,\s/);
    const price = $first('.hotel-page__output-item-block-price [data-money-amount]', tour);
    let option = {
        checkinDt: SEARCH_CRITERIA.checkinDt,
        nights: SEARCH_CRITERIA.nights,
        hotelName: getNodeData('.js-header').replace(/бронирование отеля/i, '').trim(),
        hotel_desc: "",
        href: location.href,
        country,
        region,
        roomType: getNodeData('.js-hotel-room-type', tour),
        boardType: getNodeData('.board', tour),
        price: extractIntFromStr(price.textContent.replace(/\s+/g, "")),
        currency: price.dataset.moneyCurrent,
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('img.tour-slider__img', document, 'src'),
        occupancy: SEARCH_CRITERIA.occupancy,
    };
    return option;
}

function getOccupancy() {
    const occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    occupancy.adultsCount = $$('[data-action="\/hotel\/variants/"] .filter-person.js-filter-man._active').length;
    const kids = $$('[data-action="\/hotel\/variants/"] .filter-person.js-filter-child._active');
    if ( occupancy.adultsCount === 0 ) {
        return null;
    }
    if ( kids.length > 0 ) {
        occupancy.childAges = kids.reduce((array, kid) => {
            let age = kid.querySelector(".filter-person-num.js-filter-person-num");
            age ? array.push(age.textContent) : array;
            return array;
        }, []).join();
    }
    occupancy.childrenCount = kids.length;
    return occupancy;
}

function getHotelRowByImage(img) {
    return img.closest('.js-hotel_item-without-tour');
}
