window.OPERATOR_NAME = "Тур Этно";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return {
        occupancy: getOccupancy(),
    };
}

function getSearchButton() {
    return $$('.submit')
}

function injectData() {
    const headRow = $1('#restable thead tr');
    if (headRow && !$1('.qq', headRow) ) {
        const th = document.createElement('th');
        th.textContent = 'QQ';
        th.classList.add('qq');
        headRow.append(th)
    }
    $$("#restable tbody tr").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const td = document.createElement('td');
            td.classList.add('qq');
            td.append(qqBtns())
            div.append(td);
        }
    });
}
function createOption(img) {
    const tour = getHotelRowByImage(img);
    const tds = $$('td', tour);
    const textedTds = tds.extractNodesText();
    const ths = $$('#restable thead tr th')
    const getTdVal = (caption) => textedTds[findTableTdIndex(ths, caption)];
    const hotelNode = $1('a', tds[findTableTdIndex(ths, /отель/i)])
    let option = {
        checkinDt: getTdVal(/дата/i),
        nights: getTdVal(/ночей/i),
        hotelName: getText(hotelNode),
        href: getText(hotelNode, 'href'),
        country: 'Россия',
        region: [...new Set([getTdVal(/Регион/i), getTdVal(/курорт/i)])].join(', '),
        accommodation: getTdVal(/Размещение/i),
        roomType: getTdVal(/Номер/i),
        boardType: getTdVal(/Питание /i),
        price: extractIntFromStr(getTdVal(/стоимость/i)),
        currency: "RUB",
        city_from: "",
        thumbnail: null,
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getOccupancy() {
    try {
        let occupancy = {
            adultsCount: Number(selectedOption($1('#nmen'))),
            childrenCount: Number(selectedOption($1('#count_children'))),
            childAges: null
        };
        if ( occupancy.childrenCount > 0 ) {
            occupancy.childAges = $$('[id*="age_child"]').filter(sel => sel.clientHeight > 0).map(sel => selectedOption(sel)).join(',')
        }

        return occupancy;
    } catch (e) {
        console.log(e);
        return null;
    }
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}
