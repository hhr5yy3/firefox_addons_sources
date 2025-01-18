window.OPERATOR_NAME = "sletat.ru";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$("[class*='BuyProvider_providerContainer_']").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            const container = createQQContainer('margin-top: 8px;');
            const qrBtn = $first('.qq-export-button', container);
            if (qrBtn ) {
                qrBtn.remove();
            }
            div.append(container);
        }
    });

}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const details = $$('[class*="BuyProvider_pointContainerNote"]', tour);

    const findDetailDiv = (text) => {
        return details.find(div => {
            const header = getNodeData('[class*="BuyProvider_subTitleNote"]', div, 'textContent', '')
            return !!header.match(text);
        })
    }
    const getDetailDivNode = (text) => {
        const div = findDetailDiv(text);
        if ( div ) {
            return $first('[class*="BuyProvider_text"][class*="selected"]', div) || $first('[class*="BuyProvider_text"]', div)
        }
    }
    const dates = getNodeData('#dates p') || getNodeData('[class*="_selected"] [class*="TourDate_dateItem"], [class*="TourDate_date"] [class*="TourDate_dateItem"]');
    if ( !dates ) {
        throw new QuiQuoError('Невозможно добавить тур. Не выбрана дата.')
    }
    const [dateStart, dateEnd] = dates.match(getRegexPatterns().date);

    const includedBlockTitle = $$('[class*="IncludedBlock_listTitle"]').find( title => getText(title).match(/включено/i) );
    const includedBlockItems = includedBlockTitle ? $$('[class*="IncludedBlock_listItem"]', includedBlockTitle.parentNode).extractNodesText() : [];

    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getNodeData('[class*="BuyProvider_title"]', tour),
        href: location.href,
        comment: getNodeData('[class*="Description_container"]', document, 'innerText'),
        hotel_desc: $$('#program details').map(parseDetails).join(''),
        country: getNodeData('[class*="Intro_breadCrumbs"]'),
        region: getNodeProperty(getDetailDivNode(/Пункт сбора/i)),
        boardType: includedBlockItems.find(text => text.match(/завтрак|обед|ужин|питание/i)),
        roomType: includedBlockItems.find(text => text.match(/проживание/i)),
        price: extractIntFromStr(getText(($1('[class*="TotalPrice_container"] [class*="TotalPrice_price"] span'))).replace(/\D+/g, '')),
        currency: "RUB",
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail:getNodeData('[class*="Gallery_mainPhoto"] img', document, 'src'),
        occupancy: {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null
        },
        excursion: true,
    };
    return option;
}

function parseDetails(node) {
     const summary = getNodeData('summary', node, 'innerText').replace('\n', ': ');
     const text = getNodeData('[class*="ProgramDetails_detailsText"]', node, 'innerHTML');
     return `<h3>${summary}</h3><div>${text}</div>  `


}


function getHotelRowByImage(img) {
    return img.closest("[class*='BuyProvider_providerContainer_']");
}
