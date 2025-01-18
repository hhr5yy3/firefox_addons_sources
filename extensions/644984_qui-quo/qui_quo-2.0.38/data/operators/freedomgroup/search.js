window.OPERATOR_NAME = "Maldiviana";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".hotel-price").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.style.position = 'relative';
            const container = qqBtns({align: "qq-horizontal"});
            container.style.cssText = `    position: absolute; right: 24px;top: 24px;`;
            div.append(container);
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotel = tour.closest('.samo-hotel');
    const titleParts = getNodeData('#samo-form-modal-title-hotel').split(',')
    const [dateStart, dateEnd] = titleParts[1].match(getRegexPatterns().date)
    const price = getNodeData('.price', tour).replace(/\s+/, '')
    const thumbnail = null;
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: [getNodeData('.media-heading b', hotel), getNodeData('.media-heading span b', hotel)].filter(Boolean).join(' '),
        href: null,
        country: "Maldives",
        region: titleParts[0],
        roomType: getNodeData('.type-room', tour),
        boardType: getNodeData('.radio label > b', tour),
        price: extractIntFromStr(price),
        currency: mapCurrencyUtil(price),
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: thumbnail
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.hotel-other-price');
}
