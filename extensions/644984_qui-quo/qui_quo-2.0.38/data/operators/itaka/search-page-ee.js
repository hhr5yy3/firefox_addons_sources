window.OPERATOR_NAME = "Itaka";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {

    const offerDetail = $1('.offerDetail .packageName');
    if ( offerDetail && !offerDetail.getAttribute('mutant') ) {
        addMutationObserver(offerDetail);
        offerDetail.setAttribute('mutant', 'true');
    }
    $$(".moreOffersItem .price").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const container = qqBtns({align: "qq-box", cssText: 'right:13em;bottom:2em;zoom: 0.85;position:absolute'});
            div.append(container);
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotelNode = $1('.offerItem.current');
    const [dateStart, dateEnd] = $$('.date span', tour)
        .extractNodesText()
        .map(str => str.match(getRegexPatterns().date)[0]);
    const region = getNodeData('.direction > li', hotelNode).split(/\s*\/\s*/)
    const priceNode = $1('.qq', tour).previousSibling;

    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getNodeData('.package .offerPresentation', hotelNode),
        href: null,
        country: region[0],
        region: region[1],
        accommodation: getNodeData('.room', tour),
        price: extractIntFromStr(getText(priceNode).replace(/\D+/g, '')),
        currency: getNodeData('#menu .menuBorder').split(/\s*\|\s*/)[1],
        city_from: getNodeData('[aria-colindex="2"]', tour),
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('.offerItem__picture img', hotelNode, 'src')
    };
    if ( img.classList.contains('qq-rating-btn') ) {
        return option;
    }

    const boardNode = $1('[aria-colindex="3"] span', tour)
    simulateMouseEvent(boardNode, 'mouseover');
    await waiting(200);
    const boardText = getNodeData('#tooltip');
    await waiting(100);
    simulateMouseEvent(boardNode, 'mouseout');
    await waiting(200);
    const roomNode = $1('.room', tour)
    simulateMouseEvent(roomNode, 'mouseover');
    await waiting(200);
    const roomText = getNodeData('#tooltip');
    simulateMouseEvent(roomNode, 'mouseout');
    option.roomType = roomText;
    option.boardType = boardText;
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.moreOffersItem');
}

function addMutationObserver(targetNode) {

    const config = {attributes: true, characterData: true, subtree: true};
    const callback = function () {
        $$('.qq-box').forEach(w => w.remove());
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}
