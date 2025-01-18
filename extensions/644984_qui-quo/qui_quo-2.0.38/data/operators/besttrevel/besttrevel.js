window.OPERATOR_NAME = "Besttrevel";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$(".wp-block-table > table tr").forEach(row => {
        
        let priceCell = row.cells[2]
        let isPriceCell = getText(priceCell).match(/\d{3,}/g);

        if(!isPriceCell) {
            priceCell = row.cells[3]
            isPriceCell = getText(priceCell).match(/\d{3,}/g);
        }

        if ( !row.querySelector(".qq") && isPriceCell ) {
            const btns = qqBtns({align: "qq-horizontal"});
            
            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'center');

            priceCell.append(btns)
        }
    });
}

function getMeal() {
    const mealRegex = /дегустац|завтрак|обед|ужин|банкет|перекус|питание|ланч|кофе|чай|напитки|закуски|пикник/i
    const costIncludes = $$({sel: 'figure.wp-block-table ~ p', searchString: /в стоимост/i}).map(i => getText(i))[0]

    return costIncludes && costIncludes.split(', ').filter(s => s.match(mealRegex)).join(', ')
}

function _parseCells(tour) {
    const cells = Array.from(tour.cells).map((i, idx) => idx > 1 ? getText(i) : i);

    let name, excursion, occupancy, price, dateStart, nights, region;

    if(cells.length === 5) {
        [ name, occupancy, price, dateStart, region] = cells;
    }else if(cells.length === 6) {
        [ name, occupancy, price, dateStart, nights, region] = cells;
    }else if(cells.length === 7) {
        [ name, excursion, occupancy, price, dateStart, nights, region] = cells;
    }

    if(price.match('/')) price = Number(price.split('/')[0])

    return {
        name,
        excursion,
        price,
        dateStart,
        nights,
        region
    }
}

function getDate() {
    const datesTable = $1('.datepick-inline');

    if(!datesTable) return null;

    const firstAvailable = getNodeData('.datepick-inline .date_available a', datesTable);
    const [month, year] = getNodeData('.datepick-header', datesTable).split(/\s/);

    return `${firstAvailable}.${monthNameToNumber(month)}.${year}`
}

function getNights(str) {
    const nights = str?.match(/(\d+)\sно/)?.[1];
    const days = str?.match(/(\d+)\sдн/)?.[1];

    return (nights && Number(nights)) || (days && Number(days - 1)) || 0;
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const {
        name,
        excursion,
        price,
        dateStart,
        nights,
        region
    } = _parseCells(tour);
    const desc = $$('p, ul', $1('.entry-content')).map(i => getText(i)).join('<br><br>');

    let option = {
        checkinDt: getDate() || dateStart.match(/\d{2}\.\d{2}\.\d{2,}/)[0],
        nights: getNights(nights),
        hotelName: getNodeData('.entry-title'),
        hotel_desc: (excursion ? `<strong>${getText(name)}</strong><br><br>${excursion.innerHTML}<br><br>` : '') + desc,
        href: location.href,
        country: "Россия",
        region,
        roomType: "",
        boardType: getMeal(),
        price,
        currency: "RUB",
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: getNodeData('.entry-thumbnail > img', document, 'src'),
        occupancy: {
          adultsCount: 0,
          childrenCount: 1,
          childAges: null
        },
    };

    return option;
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}