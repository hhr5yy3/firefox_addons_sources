window.OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || window.OPERATOR_NAME : window.OPERATOR_NAME || 'Sedna';
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return {
        dateStart: getNodeData('#StartDate', document, 'value'),
        dateEnd: getNodeData('#EndDate', document, 'value'),
        occupancy: {
            adultsCount: Number(selectedOption($1('#roomFilterContainer0 [id*=_PaxCount]'))),
            childrenCount: Number(selectedOption($1('#roomFilterContainer0 [id*=_ChildCount]'))),
            childAges: $$('#roomFilterContainer0 [id*=_ChildAge]').filter(s => s.clientHeight > 0).map(s => selectedOption(s)).join()
        }
    };
}

function getSearchButton() {
    return $1('#btnSearch');
}

function injectData() {
    $$("tr[data-hotel-id]").forEach(tr => {
        if ( !tr.querySelector(".qq") ) {
            const td = document.createElement("td");
            td.classList.add('qq');
            td.append(qqBtns({align: "qq-horizontal"}))
            tr.append(td);
            const table = tr.closest("table");
            const headRow = lastElement($$('thead tr', table));
            if ( headRow && !$1('.qq', headRow) ) {
                const th = document.createElement('th');
                th.classList.add('qq');
                th.textContent = 'QQ';
                headRow.append(th);
            }

        }
    });
}

function createOption(img) {
    const tourRow = getHotelRowByImage(img);
    const {dateStart, dateEnd} = SEARCH_CRITERIA;
    const hotelId = tourRow.dataset.hotelId;
    const hotelMainRow = $1(`tr.accordion-group[data-hotel-id="${hotelId}"]`);


    const hotelThRow = lastElement($$('thead tr', hotelMainRow.closest('table')));
    const hotelThs = $$('th', hotelThRow);
    const hotelTds = $$('td', hotelMainRow);



    const tourRowThRow = $$('tr' , tourRow.closest('table')).find(tr => $$('th', tr).find( th =>  String(getNodeProperty(th)).match(/total/i)));
    const tourRowThs = $$('th', tourRowThRow);
    const tourRowTds = $$('td', tourRow);

    let option = {
        checkinDt: dateStart || getNodeData('#StartDate'),
        nights: String(getDistance(dateStart, dateEnd || getNodeData('#EndDate'))),
        hotelName: [getText(hotelTds[findTableTdIndex(hotelThs, /Hotel Name/i)]), getText(hotelTds[findTableTdIndex(hotelThs, /Star/i)])].join(' '),
        href: null,
        country: "Turkey",
        region: getText(hotelTds[findTableTdIndex(hotelThs, /Region/i)]),
        roomType: getText(tourRowTds[findTableTdIndex(tourRowThs, /Room Type/i)]),
        boardType: getText(tourRowTds[findTableTdIndex(tourRowThs, /Board/i)]),
        price: extractIntFromStr(getText(tourRowTds[findTableTdIndex(tourRowThs, /Total/i)]).replace(/\s+|,/g, '')),
        currency: getText(tourRowTds[findTableTdIndex(tourRowThs, /Total/i)]).replace(/\d+|\.+|\s+|,/g, ''),
        city_from: "",
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}
