window.OPERATOR_NAME = "Desertadventures";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".nwHotRoom").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotel = tour.closest('.Fright');

    const [dateStart, dateEnd] = getNodeData('#seachSummary .head8').split(/\s*-\s*/).map(str => {
        const [_, date] = str.split(/\s*,\s*/);
        return dateFromDayAndMonthName(...date.split(/\s+/), 'en')
    })
    const locTab = $$('.tab_item', hotel).find(node => getText(node).match(/Location/i))
    if ( locTab ) {
        locTab.click();
    }
    const regionNode = await waitingFor(()=> $1('address', hotel), 100, 50);
    const hotelName = getHotelName(hotel);
    const hotelHideNode = $1('strong', regionNode);
    hotelHideNode.style.display = 'none';
    const region = getText(regionNode, 'innerText');
    hotelHideNode.style.display = '';
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName,
        hotel_desc: getNodeData('#details', tour),
        href: null,
        country: '',
        region,
        roomType: getNodeData('.roomTp', tour),
        boardType: getNodeData('.roomMp', tour),
        price: extractIntFromStr(getNodeData('[id*="selectprice_"]', hotel)),
        currency: "USD",
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('.detilwrap img.required', hotel, 'src'),
        occupancy: getOccupancy(tour)
    };
    return option;
}

function getOccupancy(tour) {
     const occupancyText = getNodeData('.roomOcc', tour);
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    occupancy.adultsCount = (occupancyText.match(/(\d+)\s*Adults/) || [0,0])[1]
    occupancy.childrenCount = (occupancyText.match(/(\d+)\s*Infants|Child/) || [0, 0])[1]
    return occupancy;
}

function getHotelName(hotel) {
    const caption = getNodeData('.namepriceCol .head1', hotel);
    const stars = getNodeData('.StarRate img', hotel, 'src', '').match(/(\d)\.\dstar/);
    return `${caption} ${stars ? ' '+stars[1]+'*' : ''}`;

}

function getHotelRowByImage(img) {
    return img.closest('.nwHotRoom ');
}
