window.OPERATOR_NAME = "Bigtrip";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

async function injectData() {
    const tripsTable = $1('.u-divide');
    if ( tripsTable && !$1('.qq-currency-container') )  {
       await createCurrencySelector(tripsTable)
    }

    $$(".trips-table .trip").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const url = getNodeData('.trip-info a', tour, 'href');
    const text = await fetchTimeout(5000, fetch(url)).then(resp => resp.text());
    const tripPage = getDocumentFromString(text);

    const dts = $$('.tripHeader-legend dt', tripPage).extractNodesText();

    const dds = $$('.tripHeader-legend dd', tripPage);
    const ddsWText = dds.extractNodesText();

    const getContentByCaption = (caption, withText = true)=> {
        const index = dts.findIndex(dt => dt.match(caption));
        return withText ? ddsWText[index] : dds[index]
    }

    const priceNode = getText(getContentByCaption(/Цена/i,  false));
    const [nationalPrice, foreignPrice] = priceNode.split(/\s*\/\s*/);
    const resultPrice = isPrefferedDefaultCurrencyUtil() ? nationalPrice : foreignPrice || nationalPrice;

    const city_from = getContentByCaption(/Выезд/i);
    const transport = getContentByCaption(/транспорт/i);
    const image = $1('.tripHeader-img', tripPage);
    document.body.append(image)
    let option = {
        checkinDt: getContentByCaption(/даты/i).match(getRegexPatterns().date)[0],
        nights: String(parseInt(getContentByCaption(/Длительность/i)) - 1),
        hotelName: getNodeData('.tripHeader .tripHeader-name h1', tripPage),
        hotel_desc: getTourProgramText(tripPage),
        href: url,
        country: "",
        region: getNodeData('.trip-route', tour),
        roomType: "",
        boardType: "",
        price: extractIntFromStr(resultPrice.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(resultPrice.replace(getRegexPatterns().cleanCurrency, '')),
        city_from: city_from ? `${city_from} (${transport})` : '',
        operator: window.OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl(image),
        occupancy: null,
        excursion: true
    };
    image ? image.remove() : null;
    return option;
}

function getTourProgramText(page) {
    const tourProgramNode = $1('.tripAgenda-days', page);
    const tourProgramText = tourProgramNode ? getNodeProperty(tourProgramNode, null, 'innerHTML') : null;
    return tourProgramText ? `<h2>Программа тура</h2>` + tourProgramText : null
}

function getHotelRowByImage(img) {
    return img.closest('.trip');
}
