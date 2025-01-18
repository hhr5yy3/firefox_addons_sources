window.OPERATOR_NAME = window.operators
    ? window.operators[window.location.hostname] || 'ito.tour-platform.ru'
    : 'ito.tour-platform.ru';
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return {};
}

function getSearchButton() {
    return $1('.tp-filter-search-button');
}

function injectData() {
    const table = $1('[class="wmd-view"] .tp-search-table');
    if (!table) return;
    if (!table.querySelector('th[data-qq-th]')) {
        const th = document.createElement('th');
        th.dataset.qqTh = '';
        th.classList.add('tp-search-result-cell', 'MuiTableCell-root');
        $1('thead tr', table).appendChild(th);
    }
    $$('tbody tr', table).forEach((tr) => {
        if (tr.cells.length >= 10 && !tr.querySelector('td[data-qq-td]')) {
            const td = document.createElement('td');
            td.dataset.qqTd = '';
            td.classList.add('MuiTableCell-root');
            tr.appendChild(td);
            td.appendChild(qqBtns({ align: 'qq-vertical' }));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const option = {
        checkinDt: _getCheckinDate(tour),
        nights: getText(tour.cells.item(6)),
        hotelName: getNodeData('a', tour.cells.item(2)),
        pageUrl: getNodeData('a', tour.cells.item(2), 'href'),
        hotel_desc: null,
        href: null,
        country: (_findInputsMatchedLabel(/страна/i)[0] || {}).value || '',
        region: getNodeData('.subtext', tour.cells.item(2)),
        roomType: [...tour.cells.item(3).childNodes].map(getText).join('. '),
        boardType: [...tour.cells.item(5).childNodes].map(getText).join('. '),
        price: extractIntFromStr(getText(tour.cells.item(10)).replace(/\s/g, '')),
        currency: mapCurrencyUtil(getText(tour.cells.item(10)).toLocaleLowerCase()),
        city_from: _getCityFrom(),
        thumbnail: null,
        occupancy: getOccupancy()
    };

    return option;
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}

/**
 * @param {RegEx} reLabel
 * @return {HTMLInputElement[]}
 */
function _findInputsMatchedLabel(reLabel) {
    /** @type {HTMLElement | null} */
    const label = $$('label').find((l) => l.textContent.match(reLabel));
    return label ? $$('input', label.parentElement) : [];
}

function getOccupancy() {
    const adultsCount = parseInt((_findInputsMatchedLabel(/взрослые/i)[0] || {}).value) || 0;
    const childrenCount = parseInt((_findInputsMatchedLabel(/дети/i)[0] || {}).value) || 0;
    let childAges =
        childrenCount > 0
            ? _findInputsMatchedLabel(/возраст детей/i)
                  .slice(0, childrenCount)
                  .map((i) => i.value)
                  .join(',') || null
            : null;
    return {
        adultsCount,
        childrenCount,
        childAges
    };
}

/**
 * @param {HTMLTableRowElement} tour
 * @returns {string}
 */
function _getCheckinDate(tour) {
    const match = getText(tour.cells.item(1)).match(/(\d+)\D+(\d+)/);
    return match ? appendYear(+match[1], +match[2]) : '';
}

function _getCityFrom() {
    const cityFromInput = _findInputsMatchedLabel(/откуда/i)[0];
    return (cityFromInput && !cityFromInput.disabled ? cityFromInput.value : '') || 'Без перелета';
}
