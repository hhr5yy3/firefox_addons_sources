window.OPERATOR_NAME = 'Online Cip-Service';
window.showTopHotelsRating = true;

function initializeSearchCriteria () {
    const childAges = $$('#ctl00_ContentPlaceHolder_pnlChild .displayBlock.inputs').map(item => item.value).join(', ');
    return {
        childAges,
    };
}

function getSearchButton () {
    return $1('#ctl00_ContentPlaceHolder_btnSearch');
}

function injectData () {
    $$('.TotalPriceAll.dxgv').slice(1).forEach(div => {
        if (!div.querySelector('.qq')) {
            div.append(qqBtns({align: 'qq-horizontal'}))
        }
    })
}

function getRoomType (tour) {
    const room = getNodeData('.OtelOda', tour);
    const roomType = getNodeData('.OtelOTip', tour);
    return `${room}, ${roomType}`
}

function createOption (img) {
    const tour = getHotelRowByImage(img);
    let option = {
        checkinDt: getText($1('.CInDate', tour)),
        nights: getText($1('.Night', tour)),
        hotelName: getText($1('.HotelName', tour)),
        href: tour.querySelector('.HotelName').firstElementChild.href,
        country: 'TURKEY',
        region: getNodeData('.RegionName', tour),
        roomType: getRoomType(tour),
        boardType: getNodeData('.OtelPans', tour),
        price: Number(getNodeData('.TotalPriceAll', tour).replace(/\s/, '').replace(',', '.')),
        currency: mapCurrencyUtil(getNodeData('.Curr', tour)),
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: null,
        occupancy: getOccupancy(tour),
    };
    return option;
}

function getOccupancy (tour) {
    const adultsCount = Number(getNodeData('.Adl', tour));
    const childrenCount = Number(getNodeData('.Chd', tour));

    return {
        adultsCount,
        childrenCount,
        childAges: SEARCH_CRITERIA.childAges,
    }
}

function getHotelRowByImage (img) {
    return img.closest('.dxgvDataRow_Glass')
}
