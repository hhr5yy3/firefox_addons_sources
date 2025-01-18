window.OPERATOR_NAME = "AquaTravelgroup";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$("#site-body-content [id*='GrdlblToplamFiyatSat']").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            div.after(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const [dateStart, dateEnd] = [getNodeData('[id*="GrdlblOtGirTar"]', tour), getNodeData('[id*="GrdlblOtCikTar"]', tour)];
    const tds = $$('td', tour);
    const price = getNodeData("[id*='GrdlblToplamFiyatSat']", tour);
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getNodeData('[id*="GrdHyperHotelName"]', tour),
        href: getNodeData('[id*="GrdHyperHotelName"]', tour, 'href'),
        country: selectedOption($first('select[id*="ddUlke"]')),
        region: selectedOption($first('select[id*="ddSehir"]')),
        roomType: [getNodeProperty(tds[4]), getNodeProperty(tds[5])].join(', '),
        boardType: getNodeProperty(tds[3]),
        price: extractIntFromStr(price),
        currency: mapCurrencyUtil(price.replace(/\d+|,/g, '')),
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('img[id*="ImageHotel"]', tour, 'src', '').replace(/&w.+/, '') || null,
        occupancy: getOccupancy()
    };
    console.log(option.thumbnail)
    return option;
}

function getOccupancy() {
    return {
        adultsCount: Number(selectedOption($1('select[id*="ddAdl"]'))),
        childrenCount: Number(selectedOption($1('select[id*="ddChd"]'))),
        childAges: $$('select[id*="ddAge"]').map(s => selectedOption(s)).join()
    };
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}
