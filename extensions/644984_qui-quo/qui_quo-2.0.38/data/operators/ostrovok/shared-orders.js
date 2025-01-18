window.OPERATOR_NAME = "Ostrovok";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".prtnr-orders-order-container .prtnr-orderfields-group").forEach(div => {
        if (!div.querySelector(".qq")) {
            const container = createQQContainer();
            const qqBtns = $1('.qq-box', container);
            qqBtns.style.display = "none";
            div.append(container);
        }
    });
}


async function openModal(img) {
    const tour = getHotelRowByImage(img);
    const expandButton = $1('.prtnrfont-order-expand', tour);
    expandButton.click();
    await waitingFor(() => null, 100, 2);
    const modalPopupCloseButton = $1('.prtnr-modalpopup-close-icon');
    const popupWrapper = modalPopupCloseButton.closest('.zen-fullscreenpopup-wrapper');
    const groups = $$('.prtnr-orderfields-group', popupWrapper).map(group => {
        const fields = $$('.prtnr-orderfields-field', group).map(field => {
            return {
                title: getNodeData('.prtnr-orders-order-field-name', field),
                content: getNodeData('.prtnr-orders-order-field-content, .prtnr-orders-order-field-link', field),
                node: field,
                link: getNodeData('.prtnr-orders-order-field-content, .prtnr-orders-order-field-link', field, 'href')
            }
        })
        return {
            fields,
            type: parseFieldType(fields)
        }

    });

    const primaryInfo = groups.find(g => g.type === 'primary information');
    const secondaryInfo = groups.find(g => g.type === 'secondary information');
    return  {primaryInfo, modalPopupCloseButton, secondaryInfo, groups, popupWrapper}
}

function getPrices(primaryInfo) {
    const prices = new Prices();
    const nettPrice = getContentByTitle(/К оплате, всего/i, primaryInfo.fields) ||  getContentByTitle(/Цена для агента, без доп. услуг/i, primaryInfo.fields);
    const grossPrice = getContentByTitle(/Цена для клиента, всего/i, primaryInfo.fields) || getContentByTitle(/Цена для клиента/i, primaryInfo.fields);
    const paymentSchedule = getContentByTitle(/Осталось оплатить, всего/i, primaryInfo.fields) ||  getContentByTitle(/Осталось оплатить, всего/i, primaryInfo.fields);

    const nettPriceType = nettPrice ? mapPriceType(mapCurrencyUtil(nettPrice.replace(/\d+|\s+/g, ''))) : "unknown";
    const grossPriceType = grossPrice ? mapPriceType(mapCurrencyUtil(grossPrice.replace(/\d+|\s+/g, ''))) : "unknown";

    if (nettPriceType !== 'unknown') {
        prices[`${nettPriceType}`].nett = extractIntFromStr(nettPrice.replace(/\s+/g, ''));
        prices[`${nettPriceType}`].currency = (mapCurrencyUtil(nettPrice.replace(/\d+|\s+|,/g, '')));
    }

    if (grossPrice && grossPriceType !== 'unknown') {
        prices[`${grossPriceType}`].gross = extractIntFromStr(grossPrice.replace(/\s+/g, ''));
        prices[`${grossPriceType}`].currency = (mapCurrencyUtil(grossPrice.replace(/\d+|\s+|,/g, '')));
    }

    prices.paidStatus = paymentSchedule.replace(/\D+/g, '') === '0' ? window.PAID_STASTUSES.paid : window.PAID_STASTUSES.outstanding;
    return prices;
}

function getContentByTitle(title, fields, type = 'content') {
    const field = fields.find(f => f.title.match(title));
    return field && field[type] !== '—' ? field[type] : null;
}

function parseFieldType(fields) {
    if (fields.find(f => f.title.match(/Заказ №/i))) {
        return 'primary information';
    }
    if (fields.find(f => f.title.match(/Средняя стоимость ночи/i))) {
        return 'secondary information';
    }

    if (fields.find(f => f.title.match(/Отель/i))) {
        return 'hotel';
    }
    return 'other'
}
