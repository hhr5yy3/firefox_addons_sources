window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);
window.ALIASES = {
    meal: /питание|meal|харчування|Maistas|Tip de masa/i,
    room: /номер\s*\/\s*размещение|^номер$|^размещение$|номер\s*\/\s*розміщення|room\s*\/\s*accommodation|Camera|Room/i,
    accommodation: /\/\s*размещение|^размещение$/i,
    region: /Город|city/i,
    hotel: /гостиница|отель|hotel|Гостиница/i,
    price: /цена|ціна|price|Pret/i
}

function initializeSearchCriteria() {
    return {occupancy: getOccupancy()};
}

function getSearchButton() {
    return $1('button.load')
}

function injectData() {
    const headRow = $1('.resultset thead tr');
    if ( headRow && !$1('.qq') ) {
        headRow.insertAdjacentHTML('beforeend', `<th class="qq">QQ</th>`)
    }

    $$("tr.price_info").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createCell())
        }
    });
}

function createCell() {
    const newTd = document.createElement('td');
    newTd.classList.add('qq')
    newTd.append(qqBtns({align: "qq-horizontal"}));
    return newTd;
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const dataset = tour.dataset;
    const dtStr = dataset.checkin;
    const ths = $$('.resultset thead tr th');
    const tds = $$('td', tour);
    const findCell = (alias) => tds[findSamoTableTdIndex(ths, alias)]
    const getCellText = (alias)=> getNodeProperty(findCell(alias), '', 'innerText')
    const hotelText = getCellText(ALIASES.hotel);
    const region = hotelText.split(/\s*\(/)[1] ||  getCellText(ALIASES.region)
    const price = getNodeData('.price.price_button', tour) || getCellText(ALIASES.price);

    const tourNights = dataset.nights;
    const hotelNights = dataset.hnights;
    const nightsDifference = (Number(tourNights) - Number(hotelNights));
    const tourName = getNodeData('.tour', tour, 'innerText', '');
    const isEarlyBooking = checkEarlyBooking(nightsDifference, tourName);
    let option = {
        checkinDt: `${dtStr.slice(6, 8)}.${dtStr.slice(4, 6)}.${dtStr.slice(0,4)}`,
        nights: isEarlyBooking ? Number(dataset.hnights)+(nightsDifference) : dataset.hnights,
        extra_nights: isEarlyBooking ? '0' : String(nightsDifference),
        comment: isEarlyBooking ? tourName : null,
        hotelName: hotelText.split(/\s*\(/)[0],
        href: getNodeData('a', findCell(ALIASES.hotel), 'href' ),
        country: getSelectOptionTextByValue('[name="STATEINC"]', dataset.state),
        region: region.replace(/\)/g, ''),
        roomType: getCellText(ALIASES.room),
        accommodation: getCellText(ALIASES.room) === getCellText(ALIASES.accommodation) ? null : getCellText(ALIASES.accommodation),
        boardType: getCellText( ALIASES.meal),
        price: extractIntFromStr(price.replace(/\s+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+|\.|,/g, '')),
        city_from: getSelectOptionTextByValue('[name="TOWNFROMINC"]', dataset.townfrom) || '',
        operator: window.OPERATOR_NAME || location.hostname,
        occupancy: SEARCH_CRITERIA.occupancy
    };

    return option;
}

function findSamoTableTdIndex(ths, caption) {
    return ths.findIndex(function (th) {
        if ( getText(th).match(caption) ) {
            return true;
        }
        const i = $1('[title]', th) ;
        return !!(i && i.title.match(caption));

    });
}

function checkEarlyBooking(nightsDifference, tourName) {
    return !!(nightsDifference < 0 && tourName.match(/ранним|раннее/));
}

function mapSelectOptions(selector) {
    const options = $$(`${selector} option`).map( option => {
        return [option.value, getText(option)]
    })
    return Object.fromEntries(options)
}

function getSelectOptionTextByValue(selector, value) {
    return mapSelectOptions(selector)[value]
}

function getOccupancy() {
    const occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    const adultSelectValue = selectedOption($1("select.ADULT"));
    if ( !adultSelectValue || !adultSelectValue.match(/(\d+)/) ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adultSelectValue);

    const kidsSelectValue = selectedOption($1("select.CHILD"));
    if ( !kidsSelectValue || !kidsSelectValue.match(/(\d+)/) ) {
        return null;
    }
    occupancy.childrenCount = extractIntFromStr(kidsSelectValue);

    if ( occupancy.childrenCount > 0 ) {
        const ages = [];
        for ( let i = 0; i < occupancy.childrenCount; ++i ) {
            const id = "age_" + (i + 1);
            const el = $1(`#${id}, .${id}`);
            if ( el && /\d+/.test(el.value) )
                ages.push(extractIntFromStr(el.value));
            else
                ages.push(2);
        }
        occupancy.childAges = ages.join(",");
    }

    return occupancy;
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}
