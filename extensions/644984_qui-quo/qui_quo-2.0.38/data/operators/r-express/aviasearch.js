window.OPERATOR_NAME = "Онлайн Экспресс";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);
window.FLIGHT_RESULTS = null;
window.FLIGHT_SEARCH_ACTIVE = false;
checkLocalStorage();

function checkLocalStorage() {
    try {
        localStorage.setItem("test", "Hello World!");
        localStorage.removeItem("test");
        localStorage.clear();
    } catch (e) {
        localStorage.clear();
    }
}

function initializeSearchCriteria() {
    getSearchResult()
    return true;
}

function getSearchButton() {
    return $1('.btn.btn-search.btn-red')
}

function injectData() {
    $$(".avia-flight .avia-flight_side").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const buttonsDiv = qqBtns({align: "qq-horizontal"});
            const bronButton = $1('.avia-flight_booking',div)
            if ( bronButton ) {
                const tourId = getNodeData('a', bronButton, 'href').split(/\?|&/).find(str => str.match('recommendationId')).replace(/.+?=/, '');
                bronButton.addEventListener('click', () => {
                    const crcId = crc32(tourId)
                    localStorage.setItem(crcId, location.href)
                })
                buttonsDiv.dataset.searchId = location.href;
            }
            if ( !window.FLIGHT_RESULTS ) {
                $$('.qq-add-btn, .qq-edit-btn', buttonsDiv).forEach(btn => btn.classList.add('qq-loading', 'qq-not-active'))
            }
            div.append(buttonsDiv);
        }
    });

    if ( window.FLIGHT_RESULTS ) {
        $$('.qq-loading').forEach(elem => {
            createOption(elem);
            elem.classList.remove('qq-loading', 'qq-not-active');

        })
    }
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const tourId = getNodeData('.avia-flight_booking a', tour, 'href').split(/\?|&/).find(str => str.match('recommendationId')).replace(/.+?=/, '');
    const flightList = window.FLIGHT_RESULTS;
    const flightItem = flightList.find(item => item.recommendationId === tourId)
    const flight = getFlight(flightItem);
    const option = createOptionFromFlight(flight);
    const price = getNodeData(".avia-flight_price-tourist", tour);
    option.price = extractIntFromStr(price.replace(/\D+/g, ''));
    option.currency = mapCurrencyUtil(price.replace(/\d+|\s+/g, ''));
    const crcId = crc32(tourId);

    localStorage.setItem(crcId+'_flight', JSON.stringify(option))
    return option;
}
