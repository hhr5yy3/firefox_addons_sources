window.OPERATOR_NAME = "Алина Тур";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return {occupancy: getOccupancy()};
}

function getSearchButton() {
    return document.querySelector("#alnAll_searchBtnRun")
}

function injectData() {
    $$( ".alnFull_tourListGroupTable tr").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            if ( div.classList.contains("alnFull_tourListGroupHead")) {
                const newTh = document.createElement('th');
                newTh.classList.add('qq');
                newTh.textContent = 'QQ';
                div.appendChild(newTh);
                return;
            }
            const newTd = document.createElement('td');
            newTd.classList.add('qq');
            newTd.appendChild(qqBtns());
            div.appendChild(newTd);
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const table = tour.closest('.alnFull_tourGroup')
    const hotel = table.previousElementSibling;
    const getTd = (selector) => tour.querySelector(selector);
    const getTdProp = (selector, prop = 'textContent') => getNodeProperty(getTd(selector), null, prop);
    const priceText = getTdProp('.alnFull_mtdPrice span');
    let option = {
        checkinDt: getText(getTd('.alnFull_gtdDate').childNodes[0]),
        nights: getText(getTd('.alnFull_gtdNight').childNodes[0]),
        hotelName: getText(hotel.querySelector('.td .alnFull_tourHotel.alnGoHotel')),
        href: window.location.href,
        country: getText(hotel.querySelector('.countryTd')),
        region: getText(hotel.querySelector('.td .resortTd'), 'innerText'),
        roomType: [getTdProp('.alnFull_gtdNumber', 'innerText'), getTdProp('.alnFull_gtdPlace', 'innerText')].join(', '),
        boardType: getTdProp('.alnFull_gtdMeals', 'innerText'),
        price: extractIntFromStr(priceText.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(priceText.replace(/\d+|\s+/g, '')),
        city_from: getTdProp('.cityName'),
        operator: OPERATOR_NAME,
        thumbnail: null,
        occupancy: SEARCH_CRITERIA.occupancy,
    };
    return option;
}

function getOccupancy() {
    return {
        adultsCount: +selectedOption(document.querySelector('#alnFull_selectAdult select.alnFull_selectSel')),
        childrenCount: +selectedOption(document.querySelector('#alnFull_selectKids select.alnFull_selectSel')),
        childAges: $$('#alnFull_selectAge .alnFull_selectAgeSelData:not(.alnFull_selectAgeDisable) select.alnFull_selectSel').map( s => selectedOption(s) ).join()
    };
}

function getHotelRowByImage(img) {
    return img.closest('tr')
}
