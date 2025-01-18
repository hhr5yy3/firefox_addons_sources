window.OPERATOR_NAME = "sletat.ru";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$("[class*='TourList_container'] [class*='TourCard_pricesContainer']").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const [_, dates] = $$('[class*="TourCard_tourDates"] div', tour).map(div => getText(div));
    const [dateStart, dateEnd] = dates.split(/\.*\s*-\s*|\.*\s*–\s*/).map(dt => dateFromDayAndMonthName(...dt.split(/\s+/)))

    const [country, region] = getNodeData('[class*="SliderItem_placeText"]', tour).split(/\s*,\s*/);
    let imageUrl = null;
    const swiperElement = $first('.swiper-slide-active [class*="SliderItem_container"] div.swiper-lazy', tour);
   if ( swiperElement ) {
       imageUrl = window.getComputedStyle(swiperElement).backgroundImage
   }
    if ( imageUrl ) {
        imageUrl = imageUrl.match(/url\("(.+?)"\)/);
    }
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getNodeData('[class*="TourCard_tourName"]', tour),
        href: getNodeData('a[class*="TourCard_tourNameLink"]', tour, 'href'),
        hotel_desc: getNodeData('[class*="TourCard_tourDescription"]', tour),
        country,
        region,
        roomType: "",
        boardType: "",
        price: extractIntFromStr(getNodeData('[class*="TourCard_price_"]', tour).replace(/\D+/g, '')),
        currency: "RUB",
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: imageUrl ? imageUrl[1] : null,
        occupancy: {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null
        },
        excursion: true,
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest("[class*='TourCard_container']");
}
