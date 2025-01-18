window.OPERATOR_NAME = "Круиз.Онлайн";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".your-order.section").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const container = createQQContainer({align: "qq-horizontal"});
            const exportButton = container.querySelector('.qq-export-button');
            exportButton.style.display = 'none';
            div.append(container);
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const information = $$('.your-order__information-text', tour)
        .map( info => ({caption: getNodeData('.your-order__information-text-about', info), text: getNodeData('.your-order__information-text-general', info)}));
    const informationObj = new Map();
    information.forEach( info => {
        informationObj.set(trim(info.caption), info.text);
    })

    console.log(informationObj)
    let option = {
        checkinDt: informationObj.get('Отправление:'),
        nights: String(getDistance(informationObj.get('Отправление:'), informationObj.get('Прибытие:'))),
        hotelName: informationObj.get('Круиз на теплоходе:'),
        href: null,
        region: informationObj.get('Маршрут:'),
        roomType: [getNodeData('.your-order__cabin', tour), getNodeData('.your-order__seating', tour)].join(', '),
        boardType: getNodeData('.your-order__place-text', tour),
        price: Number(getNodeData('.your-order__total-number').replace(/\D+/g, '')),
        currency: "RUB",
        city_from: "",
        operator: window.OPERATOR_NAME,
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.your-order.section');
}
