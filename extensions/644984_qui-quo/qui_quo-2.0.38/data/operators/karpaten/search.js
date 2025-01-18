window.OPERATOR_NAME = "Karpaten";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$("tr[id-rezervare] .price").forEach(div => {
        const td = div.closest('td');
        if ( !td.querySelector(".qq") ) {
            div.after(qqBtns({align: "qq-horizontal"}));
            td.style.textAlign = 'center';
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const tds = $$('td', tour);
    const tdsText = tds.extractNodesText();
    const [dateStart, dateEnd] = tdsText[4].match(getRegexPatterns().date);
    const [city_from, country] = $$('h5 > span b', tds[3]).extractNodesText();

    const reservationId = tour.getAttribute('id-rezervare');
    const tourEditPage = await fetch(`https://erp.karpaten.ro/rezervare_detalii/?id=${reservationId}`).then(resp => resp.text());
    const tourDocument = getDocumentFromString(tourEditPage);
    const infoRow = $1('[data-date-necesare-furnizor]', tourDocument);
    const dataRow = JSON.parse(infoRow.dataset.dateNecesareFurnizor);

    const price =  getNodeData('.price', tour)
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: [dataRow['HotelName'], dataRow['Category']].filter(Boolean).join(' ') || infoRow.dataset.numePrestator,
        href: null,
        country,
        region: dataRow['RegionName'],
        accommodation: dataRow['Room'],
        roomType: dataRow['RoomTypeName'] || dataRow['room_name'],
        boardType: dataRow['BoardName'] || dataRow['meal_name'],
        price: extractIntFromStr(price),
        currency: mapCurrencyUtil(price.replace(/\d+|,|\./g, '')),
        city_from,
        operator: OPERATOR_NAME,
        thumbnail: null
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}
