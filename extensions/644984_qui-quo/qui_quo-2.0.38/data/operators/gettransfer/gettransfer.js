window.OPERATOR_NAME = "GETTRANSFER";
window.showTopHotelsRating = false;
window.iconsDescriptions = {
    "common/icons/wifi.svg": 'Бесплатный Wi-Fi',
    "common/icons/charger.svg": 'Зарядное устройство для телефона',
    "common/icons/refreshments.svg": 'Прохладительные напитки',
    "common/icons/using_state.svg": 'Водитель показывает свои координаты'
};
function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".offer.q-card > .q-card__section").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.append(qqBtns({align: "qq-horizontal"}, createOption, `position: absolute;right: 5px;top: 5px;`));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const items = $$('.q-card__section--vert .items-center', tour).filter(t => getText(t));
    const itemsBold = $$('.q-card__section--vert div.text-bold', tour);
    const price = getText(itemsBold[1]);
    const transferNumber = window.location.href.match(/transfers\/(\d+)$/) || window.location.href.match(/transfers\/(\d+)\?/);
    const {data} = await fetch(`https://gettransfer.com/api/transfers/${transferNumber[1]}?role=partner`, {
        "headers": {
            "accept": "application/json, text/plain, */*"
        },
        "method": "GET"
    }).then(r => r.json());
    const transfer = data.transfer;
    const [checkinDt, checkoutDt] = [new Date(transfer.date_to_local), new Date(transfer.date_return_local ||transfer.date_end_local)];
    let option = {
        checkinDt: checkinDt.toLocaleDateString('ru'),
        nights: String(getDistance(checkinDt, checkoutDt)),
        hotelName: getText(items[0]),
        href: window.location.href,
        region: [transfer.from, transfer.to].filter(s=>s).map(t => t.name).join(' -> '),
        boardType: getDescription(transfer, tour, checkinDt),
        roomType: [parseCarType(itemsBold[0]), parseCapacity(tour)].join(', '),
        price: extractIntFromStr(price.replace(/\s+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+|,|\s+/g, '')),
        city_from: "Без перелёта",
        operator: window.OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl(tour.querySelector('.offer-photo'))
    };
    return option;
}

function getDescription(transfer, tour, checkinDt) {
    const distance = transfer.distance ? transfer.distance + 'км' : '';
    const travelHours = Math.trunc(transfer.time/60);
    const travelMinutes = Math.trunc(transfer.time%60);
    const routeDesc = distance ? `расстояние: ${distance} (~${travelHours}ч ${travelMinutes}мин)` : '';
    const serviceDesc = $$('img', tour).map( img => window.iconsDescriptions[img.getAttribute('src')]).filter(s=>s).join(', ');
    return [`Выезд: ${checkinDt.getHours()}:${checkinDt.getMinutes()}`, routeDesc, serviceDesc].filter(s => s).join(', ');
}

function parseCapacity(tour) {
    const images = $$('img' , tour);
    images.forEach(img => {
        if ( img.src.match(/person/) ) {
            img.textContent = 'пассажиров '
        }
        if ( img.src.match(/baggage/) ) {
            img.textContent = ', багаж '
        }
    });

    const getCapacity = (text) => {
        const image = images.find( img => img.src.match(text) );
        if ( image ) {
            return getText(image.nextElementSibling.nextSibling);
        }
        return null;
    }
    const result = `Вместимость: пассажиров x${getCapacity(/person/)}, багаж x${getCapacity(/baggage/)} `;
    images.forEach(img => img.textContent = '');
    return result;
}

function parseCarType(node) {
    return getNodeProperty(node, '').replace(/s*\d+.+?/, '').replace(/\s*×.+/, '');
}

function getHotelRowByImage(img) {
    return img.closest('.q-card');
}
