window.OPERATOR_NAME = "Отдохни с нами";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    if ( location.hostname !== 'bigtrip.by' ) {
        return;
    }
    $$("article.tripCard .tripCard-priceBlock").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-box", cssText: 'position:absolute;right: 2rem;'}));
        }
    });
}

async function createOption(img) {
    const trip = getHotelRowByImage(img);
    const tripImage = $1('a.tripCard-thumb', trip);
    const price =  getNodeData('.tripCard-price', trip);
    const text = await fetchTimeout(5000, fetch(tripImage.href)).then(resp => resp.text());
    const popup = getDocumentFromString(text)
    const tourProgramNode = $1('.tripAgenda-days', popup);
    const tourProgramText = tourProgramNode ? getNodeProperty(tourProgramNode, null, 'innerHTML') : null;
    const transport = getNodeData('.transport i', popup, 'title');
    const dls = $$('dl', popup).map( dl => ({ dt: getNodeData('dt', dl), dd: getNodeData('dd', dl) }) );
    const city_from = dls.find(dl => dl.dt.match(/Выезд/i))
    let option = {
        checkinDt: new Date(getNodeData('.tripCard-depart time', trip, 'dateTime')).toLocaleDateString('ru'),
        nights: String(parseInt(getNodeData('.tripCard-duration time', trip))-1),
        hotelName: getNodeData('.tripCard-info h2', trip),
        hotel_desc: tourProgramText ? `<h2>Программа тура</h2>`+ tourProgramText : null,
        href: getNodeProperty(tripImage, null, 'href'),
        country: "",
        region: getNodeData('.tripCard-route', trip),
        roomType: "",
        boardType: "",
        price: extractIntFromStr(price.replace(/\D+/g, '')),
        currency: "BYN",
        city_from: city_from ? `${city_from.dd} (${transport})` : '',
        operator: window.OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl(tripImage),
        occupancy: null
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.tripCard');
}
