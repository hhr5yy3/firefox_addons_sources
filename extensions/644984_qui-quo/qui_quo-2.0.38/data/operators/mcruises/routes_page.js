window.OPERATOR_NAME = "mcruises.ru";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    // const header = $first('.js--step-2-selection-header');
    // if ( header && !$first('.qq', header) ) {
    //     header.append(createHeadCell())
    // }

    $$(".js--step-2-selection-body-tr .step-2-selection-body-td-inner")
        .filter(div => getText(div).replace(/\D+/g, '').length > 0)
        .forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.prepend(qqBtns({align: "qq-horizontal", cssText: 'width: 100%;justify-content: center;'}));
        }
    });
}

function createHeadCell() {
    const div = document.createElement('div');
    div.classList.add('qq', 'step-2-selection-header-td');
    div.textContent = 'QQ';
    div.style.paddingLeft = '5px';
    div.style.paddingRight = '6px';
    return div;
}

async function createOption(img) {
    const row = getHotelRowByImage(img);
    const tour = img.closest('.step-2-selection-body-td-inner');
    const date = getNodeData('.step-2-selection-body-td--date', row, 'innerText').split(/\s+/);
    const cruiseHeader = trim(getNodeData('.step-content__title__heading')).split(/\s*,\s*/);
    const cabinCaptions = $$('.step-2-selection-header-inner-cabins .step-2-selection-header-inner-cabin');
    const cabinIndex = $$(".js--step-2-selection-body-tr .step-2-selection-body-td-inner", row).indexOf(tour);
    const price = getText(lastElement($$('[data-currency="NAT"]', tour)));
    const ship = getNodeData('[data-ship-id]');
    let option = {
        checkinDt: dateFromDayAndMonthName(date[1], date[0], date[2]),
        nights: cruiseHeader[1].replace(/\D+/g, ''),
        hotelName: `${ship} (${cruiseHeader[0]})`,
        hotel_desc: getNodeData('.step-2-review__about', document, 'innerHTML'),
        href: getNodeData('.step-2-selection-body-td--date a', row, 'href'),
        region: getNodeData('.step-content__title__desc'),
        roomType: getText(cabinCaptions[cabinIndex]),
        boardType: ($first('[data-pansionname]', row) || { dataset: {} }).dataset.pansionname,
        price: extractIntFromStr(price.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g, '')),
        city_from: '',
        operator: OPERATOR_NAME,
        thumbnail: getNodeData('.step-2-slider__item img', document, 'src'),
        occupancy: null,
        excursion: false,
        comment: $$('.step-2-schedule_table-body .step-2-schedule_table-row')
            .map((s) => trim(getText(s)))
            .join('\n')
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.js--step-2-selection-body-tr');
}
