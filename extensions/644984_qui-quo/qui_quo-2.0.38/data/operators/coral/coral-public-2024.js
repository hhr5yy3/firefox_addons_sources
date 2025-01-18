window.OPERATOR_NAME = window.location.host.match(/coral/i) ? "Coral" : "Sunmar";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    const city_from = getNodeData('#QuickSearchPackageTourDepartureSelect .ant-select-selection-item');
    return {
        city_from
    };
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".hotel-card-price").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function getNightsAndExtra (priceCardText) {
    const nightsAndExtraArray = priceCardText.match(/\d+\s*н/g).map(item => item.replace(/\D/g, ''));
    return {
        nights: nightsAndExtraArray[0],
        extra_nights: nightsAndExtraArray.length > 1 ? nightsAndExtraArray[1] : null
    }
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const priceCard = $1('.hotel-card-price', tour);
    const person =
        $1('.person-count', priceCard) ||
        $1('path[d*="2C2.47369 2 2.9628 1.5625 2.9628 1C2.9628 0.453125 2.47369 0 1.88338 0C1.27621"], path[d*="M1.875 2.5C2.55859 2.5 3.125 1.95312 3.125 1.25C3.125 0.566406 2.55859"]', tour)
            .parentNode;
    let priceCardDivs = [...person.parentNode.parentNode.parentNode.parentNode.childNodes];
    const dateNode = priceCardDivs.find((d) => getText(d, 'innerText').match(/\d+\s*н/))
    const checkinDt = getText(dateNode).match(/\d{2}\.\d{2}\.\d{4}/)[0];
    const [roomType,boardType] = getText(person.parentNode.parentNode.parentNode.nextElementSibling).split(/-\s+/);
    const [country, ...region] = getNodeData('.location', tour).split(/\s*,\s*/);
    const priceNodes = $$({sel: 'div', searchString: (/Цена от/i)}, priceCard).find(div => !$1('div', div));

    const priceText = getText(priceNodes.parentNode.lastElementChild);
    const {nights, extra_nights} = getNightsAndExtra(getText([...dateNode.childNodes].find(n => n.textContent.match(/\d+\s*н/))));
    let option = {
        checkinDt,
        nights,
        extra_nights,
        hotelName: getNodeData('.hotel-name', tour),
        href: getNodeData('.hotel-card-name-link', tour, 'href'),
        country,
        region: region.join(', '),
        roomType,
        boardType,
        price: extractIntFromStr(priceText.replace(/\s+/g, '')),
        currency: mapCurrencyUtil(priceText),
        city_from: SEARCH_CRITERIA.city_from || '',
        thumbnail: getNodeData('.ant-carousel .slick-current img', tour, 'src'),
        occupancy: {}
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.hotel-list-item');
}
