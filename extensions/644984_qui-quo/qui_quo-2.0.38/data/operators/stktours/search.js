window.OPERATOR_NAME = "Сибирская Туристическая Компания";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    const occupancy = {
        adultsCount: Number(selectedOption($1('#adults_count'))),
        childrenCount: Number(selectedOption($1('#childs_count'))),
        childAges: $$('#agediv input').filter(i => i.clientHeight > 0).map(i => i.value).join()
    }

    const city_from = $1('#city_src') && $1('#city_src').clientHeight > 0 ? selectedOption($1('#city_src')) : "";
    return {occupancy, city_from};
}

function getSearchButton() {
    return $1('#btn_search')
}

function injectData() {
    $$("#search_results_table tr.tr_even .roundright, #search_results_table tr.tr_odd .roundright").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const ths = $$('#search_results_table tr th');
    const tds = $$('td', tour).extractNodesText();
    let option = {
        checkinDt: tds[findTableTdIndex(ths, /Заезд/i)],
        nights: tds[findTableTdIndex(ths, /Ночей/i)],
        hotelName: tds[findTableTdIndex(ths, /Гостиница/i)],
        href: getNodeData('td.borderup a', tour, 'href'),
        country: "Россия",
        region: "",
        roomType: tds[findTableTdIndex(ths, /Номер/i)],
        boardType: tds[findTableTdIndex(ths, /Питание/i)],
        price: getNodeData('.specialprice',tour) || Number(tds[findTableTdIndex(ths, /Цена/i)].replace(/\D+/g, '')),
        currency: "RUB",
        city_from: SEARCH_CRITERIA ? SEARCH_CRITERIA.city_from : "",
        operator: window.OPERATOR_NAME,
        thumbnail: await getThumbnail(tour),
        occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null
    };
    return option;
}

async function getThumbnail(tour) {
    try {
        const hotelHref = getNodeData('td.borderup a', tour, 'href');
        const reqId = Date.now() + Math.floor(Math.random() * Math.floor(1000000));
        sendMessageToAddon('fetch request', {url: hotelHref, reqId});
        const result = await waitingFor(() => getBackgroundFetchResponse(reqId), 200, 100);
        const hotelDoc = getDocumentFromString(result);
        const imageLink = getNodeData('a.fancy[rel="gallery"]', hotelDoc, 'href')
        return imageLink;
    } catch (e) {
        console.log(e);
        return null;
    }


}

function getHotelRowByImage(img) {
    return img.closest('tr');
}
