window.OPERATOR_NAME = "Putevka";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return {};
}

function getSearchButton() {
    return $1("#main_search_btn");
}

function injectData() {
    $$(".room-price-block").forEach(div => {
        if (div.querySelector(".qq")) return;

        const bigBlock = $1('.tariff-block', div);
        bigBlock.classList.replace('col-lg-5', 'col-lg-4');

        div.append(createCell());
    });
}

function createCell() {
    const container = document.createElement('div');
    container.classList.add('col-12', 'col-lg-1', 'qq');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.padding = '10px';
    container.append(qqBtns({align: "qq-horizontal"}));

    return container;
}


const foodString = [
    'пита', 'все включено', 'стол'
]

function findFood(arr) {
    const res = arr.find(tariff_data_item => 
        foodString.some(food => 
            tariff_data_item.toLowerCase().includes(food)
        )
    );
    return res ? res : 'Без питания';
}

function createOption(img) {
    const priceBlock = getHotelRowByImage(img);
    const tour = priceBlock.closest('.room-view');

    const roomDescriptionElem = $1('.product-list', tour);
    const tariffText = $1('.tariff-description', tour)?.dataset?.originalTitle?.replaceAll('\n', '');
    const roomDescriptionText = roomDescriptionElem ? (getText(roomDescriptionElem)?.replaceAll('\n', '') ?? '') : '';
    const placeText = getNodeData('.cites-this__place-position').split(', ');
    const priceText = getNodeData('.room-price>span', priceBlock).replaceAll(' ', '');
    const nightsText = getNodeData('div.filter-option>div>div.filter-option-inner-inner');
    const price = extractIntFromStr(priceText);
    const modTariffText = tariffText ? ' В стоимость входит: ' + tariffText : '';

    let option = {
        checkinDt: getNodeData('#dateFrom', document.documentElement, 'value'),
        nights: extractIntFromStr(nightsText),
        hotelName: getNodeData('.cites-this__title'),
        hotel_desc: (roomDescriptionText + modTariffText).replace(' Подробное описание номера', ''),
        href: location.href,
        country: placeText.splice(0, 1)[0],
        region: placeText.splice(0, 1)[0],
        roomType: getNodeData('.room-name', tour),
        boardType: tariffText ? findFood(tariffText.split(', ')) : '',
        price,
        currency: mapCurrencyUtil(priceText.replace(String(price), '').toLowerCase()),
        city_from: '',
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('picture>img', tour, 'src') ?? '',
        occupancy: getOccupancy(),
    };

    return option;
}

function getOccupancy() {
    const occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    
    const childAgesList = [];
    $$("li.child")?.forEach(elem => {
        occupancy.childrenCount++
        childAgesList.push(extractIntFromStr(getNodeData('input', elem, 'value')));
    });

    if(childAgesList.length !== 0) {
        occupancy.childAges = childAgesList.join(',');
    }

    const adultsContainer = $1('.count-people-block');
    if(!adultsContainer) {
        return null;
    }

    const adultsText = getNodeData('.js-people', adultsContainer);
    if(!adultsText) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adultsText) - occupancy.childrenCount;

    return occupancy;
}

function getHotelRowByImage(img) {
    return img.closest('div.room-price-block');
}