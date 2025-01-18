window.OPERATOR_NAME = 'Profkurort';
window.showTopHotelsRating = false;

setStorageDataAsync({
    'hotelName': getText(getElementByXpath('span', $1('.entry-title'))),
    'hotel_desc': getText(getElementByXpath('p[2]', $1('.long-description'))),
    'href': getElementByXpath('a', $1('.entry-title')).href,
    'region': getText(getElementByXpath('p', $1('.col-md-8'))).split(' ')[1].slice(0, -1),
    'thumbnail': $1('.rsMainSlideImage').src,
});

function initializeSearchCriteria () {
    return null;
}

function getSearchButton () {
    return null;
}

function injectData () {
    $$('.ih-step2CategoryPriceButton').forEach(div => {
        if (!div.querySelector('.qq')) {
            div.append(qqBtns({align: 'qq-horizontal'}))
        }
    })
}

function getBoardType () {
    try {
        const description = getNodeData('[ng-bind-html="model.program.pricelistnot"]');
        if ( description &&  description.match(/без питания/) )  {
            return 'Без питания';
        }

        const boardTypeString = getText($1('.ih-text').firstElementChild).split(',')[1].trim();
        if (
            boardTypeString.match(/завтрак/) !== null
            || boardTypeString.match(/обед/) !== null
            || boardTypeString.match(/ужин/) !== null
            || boardTypeString.match(/питание/) !== null ) {
            return boardTypeString
        }
        return null
    } catch (e) {
        console.log(e);
        return null;
    }

}

async function createOption (img) {
    const tour = getHotelRowByImage(img)
    const {hotelName, hotel_desc, href, region, thumbnail} = await getStorageDataAsync();
    let option = {
        checkinDt: $1('#dateIn2').value,
        nights: getText($1('.ih-step2SearchPanelTotalNights')).match(/\d+/)[0],
        hotelName : getNodeData('[ng-bind="model.hotel.objnam"]') || hotelName,
        hotel_desc: getNodeData('[ng-bind-html="model.hotel.objnot"]', document, 'innerHTML') || hotel_desc,
        href,
        country: 'Россия',
        region: getNodeData('[ng-click="openMap(model.hotel)"]', document, 'textContent', '').split(/\s*,\s*/).join(', ') || region,
        roomType: getText($1('.ih-step2CategoryName', tour)),
        boardType: getBoardType(),
        price: parseFloat(getText($1('.ih-step2CategoryCountPriceSumm', tour)).split(' ').slice(-3, -1).join('')),
        currency: getText($1('.ih-step2CategoryCountPriceSumm', tour)).split(' ').slice(-1).join(),
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('img.obj-gallery-main-img', document, 'src') || thumbnail,
        occupancy: null
    }
    return option;
}

function getHotelRowByImage (img) {
    return img.closest('.ih-step2OnlineCategory');
}
