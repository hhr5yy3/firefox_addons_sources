window.OPERATOR_NAME = "Тари Тур";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$('#tourList [data-title="Цена:"]').forEach(td => {
        if (!$1('.qq', td)) {
            td.append(qqBtns({align: 'qq-box'}));
        }
    })
    $$('.tp-pricelist-row span').forEach(span => {
        if (getText(span).match(/Цена за тур/i)  && !$1('.qq', span.parentNode)) {
            span.parentNode.style.position = 'relative';
            span.parentNode.append(qqBtns({align: 'qq-horizontal', cssText: 'position: absolute; right: -6px'}, createTourOption));
        }
    })

}


async function createOption(img) {
    const td = img.closest('td');
    const tr = td.closest('tr');

    const option = {
        checkinDt: getNodeData('[data-title="Заезд:"]', tr),
        nights: getNodeData('[data-title="Ночей:"]', tr),
        hotelName: `Тур: ${getNodeData('[data-title="Тур:"]', tr)}, Гостиница: ${getNodeData('[data-title="Гостиница:"]', tr)}`,
        href: getNodeData('[data-title="Тур:"] a', tr, 'href') || location.href,
        roomType: getNodeData('[data-title="Номер:"]', tr),
        region: "Санкт-Петербург",
        boardType: null,
        price: extractIntFromStr(getNodeData('[data-title="Цена:"]', tr).replace(/\D+/g, '')),
        currency: "RUB",
        country: "Россия",
        city_from: "",
        operator: OPERATOR_NAME,
        excursion: true,
        thumbnail: null,
        occupancy: null,
        comment: null
    };

    const text = await fetch(option.href).then(r => r.text()).catch(_=> null);
    if (text) {
        const doc = getDocumentFromString(text);
        if (doc) {
            option.thumbnail = getNodeData('#tourInfo .fotorama img', doc, 'src')
        }
    }
    return option;
}

function createTourOption(img) {
    const hotel = img.closest('.tp-pricelist-item');
    const room = img.closest('.tp-pricelist-row ');
    const dates = getTourDates();
    const starsNode = $1('[class*="star-category_"]', hotel);
    let stars = '';
    if (starsNode) {
        stars = starsNode.className.match(/star-category_(\d)/) && starsNode.className.match(/star-category_(\d)/)[1];
    }
    const option = {
        checkinDt: dates[0],
        nights: getDistance(dates[0], dates[1]),
        hotelName: `Тур: ${getNodeData('h1[itemprop="name"]')}, Гостиница: ${getNodeData('h6', hotel)} ${
            stars && ' ' + stars + '*'
        }`,
        hotel_desc: getNodeData('#productInfo', document, 'innerHTML'),
        href: location.href,
        roomType: getNodeData('[data-map-hrname]', room),
        region: getRegion(),
        boardType: $$('.d-flex span', room)
            .find((elem) => getText(elem) === 'Завтрак:')
            .parentNode.innerText.trim(),
        price: extractIntFromStr(getText(img.parentNode.parentNode).replace(/\D+/g, '')),
        currency: 'RUB',
        country: 'Россия',
        city_from: '',
        operator: OPERATOR_NAME,
        excursion: true,
        thumbnail: getNodeData('img', hotel, 'src'),
        occupancy: null,
        comment: null
    };

    return option;
}

function getTourDates() {
    const chips = $$('.chip.active');
    const datesChip = chips.find((chip) => chip.textContent.match(/\d{2}\.\d{2}/));
    if (datesChip) return datesChip.textContent.match(/\d{2}\.\d{2}/g).map((it) => appendYear(...it.split('.')));
    return [$1('input#formControlDateFrom'), $1('input#formControlDateTill')]
        .map((i) => (i ? i.value : undefined))
        .filter((d) => !!d);
}

function getRegion() {
    const breadcrumbMain = getText($1('.bg-page-header #breadcrumb [itemprop="item"]'));
    if (breadcrumbMain.match(/москв[ауе]\b/i)) return 'Москва';
    if (breadcrumbMain.match(/санкт-петербург[уе]?\b/i)) return 'Санкт-Петербург';
    return getText($1('.bg-page-header #breadcrumb li:last-child'));
}