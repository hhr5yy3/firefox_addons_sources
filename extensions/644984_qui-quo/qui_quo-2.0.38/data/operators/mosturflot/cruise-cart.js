window.OPERATOR_NAME = "Мостурфлот";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$('.chosen-seat__info:not(.chosen-seat__pay-bottom)').forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const divs = $$('div', tour);
    const tourDivs = divs.filter( div => $$('span', div).length === 2 || $$('span', div).length === 3);
    const tourCells = tourDivs.map(div => {
        const spans = $$('span', div).extractNodesText()
        return {
            key: spans[0],
            value: lastElement(spans)
        }
    })

    const [checkinDt, checkoutDt] = getNodeData('.basket_date_interval').split(/\s*-\s*/).map(str => dateFromDayAndMonthName(...str.split(/\s+/)))

    const findValue = (key) => ((tourCells.find(cell => cell['key'].match(key) ? cell['value'] : null)) || {}).value
    const strongElements = $$('strong').extractNodesText();
    const includedService = (strongElements.find(str => str.match(/стоимость путевки включено/i)) || '');
    const includedParts = includedService.split(/:|\s*,\s*|\(/)

    const price = getPrice() || findValue('Цена')

    let option = {
        checkinDt,
        nights: String(getDistance(checkinDt, checkoutDt)),
        hotelName: getNodeData('section .detail__card .card-title'),
        hotel_desc: includedService,
        href: location.href,
        country: "Россия",
        region: $$('section .detail__card .card__text li').extractNodesText().join(' → '),
        roomType: `Каюта: ${findValue('Выбранные каюты')}, Категория: ${findValue('Категория')}, ${findValue('Палуба')}`,
        boardType: includedParts.find( p => p.match(/питание|завтрак|обед/)),
        price: extractIntFromStr(price.replace(/\D+/, '')),
        currency: "RUB",
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('[data-swiper-slide-index="0"] img', document, 'src')
    };
    return option;
}

function getPrice() {
    try {
     return getText($$('.chosen-seat__pay-bottom div.text-none').find(div => getText(div).match(/стоимость/)).nextElementSibling)
    } catch (e) {
        console.log(e);
        return null;
    }
}

function getHotelRowByImage(img) {
    return img.closest('.chosen-seat__info');
}
