window.OPERATOR_NAME = "Itaka";    //https://www.itaka.pl/wczasy
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}, order page`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$('[class*="styles_price-summary-container"]').forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotelName = $1('div.fresnel-container.fresnel-greaterThanOrEqual-lg h1');
    const regionText = getNodeData('.fresnel-container.fresnel-greaterThanOrEqual-lg h4');
    const [country, region] = regionText.split(/\s*,\s*/);
    const stars = $$('[data-testid="rating-stars"] .icon-shape-star', hotelName.parentNode.parentNode.parentNode);
    const booking = $1('[name="booking"]');
    const buttons = $$('button', booking)
    const dates = getDates(buttons);
    const getTextFromButton = (text)=> getText($1('[class*="styles_c__value"]',buttons.find(btn => getText(btn).match(text))))
    const price = getNodeData('[class*="styles_price-summary-container"] strong');
    let option = {
        checkinDt: dates.dateStart,
        nights: String(getDistance(dates.dateStart, dates.dateEnd)),
        hotelName: `${getText(hotelName)} ${stars.length}*`,
        href: location.href,
        country,
        region,
        accommodation: getTextFromButton(/Osoby/i),
        roomType: getTextFromButton(/Pokój/i),
        boardType: getTextFromButton(/Wyżywienie/i),
        price: extractIntFromStr(price.replace(/\D+/g, '')),
        currency: mapCurrencyUtil((price.split(/\d+\s+/).reverse()[0])),
        city_from: getTextFromButton(/Wylot/i),
        thumbnail: getNodeData('[data-testid="gallery-img"]', tour, 'src'),
    };
    return option;
}

function getDates(buttons) {
    const datesButton = buttons.find(btn => getText(btn).match(/Termin/i));
    const datesText = getText($1('[class*="styles_c__value"]', datesButton));

    const datesArray = datesText.split(/\s*-\s*/).map(date => date.split(/\s+/));
    const yearEnd = datesArray[1][2];
    const yearStart = Number(datesArray[0][1]) > Number(datesArray[1][1]) ? yearEnd-1 : yearEnd;

   return {
        dateStart: dateFromDayAndMonthName(datesArray[0][0], datesArray[0][1], yearStart, 'pl'),
        dateEnd: dateFromDayAndMonthName(datesArray[1][0], datesArray[1][1], yearEnd, 'pl')
   }
}

function getHotelRowByImage(img) {
    return img.closest('.container');
}
