window.OPERATOR_NAME = "ВодоходЪ";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".price-block-room__block").forEach(div => {
        if ( !div.querySelector(".qq") && getNodeData('.text-selection-conteyner', div,'textContent', '').match(/\d+/) ) {
            div.append(qqBtns({align: "qq-horizontal", cssText: 'transform: scale(0.9)'}));
        }
    });
}

function createOption(img) {
    const roomTable = getHotelRowByImage(img);
    const roomCell = img.closest('.price-block-room__block');
    const roomRow = roomCell.closest('.price-block-room');
    const slide = img.closest('.swiper-slide');
    const {roomType, accommodation} = getRoom(roomRow, slide, roomCell, roomTable);
    const dates = getDates();


    const price = getNodeData('.text-selection-conteyner', roomCell);

    const headSlidesText = $$('.price-block-item__header .swiper-slide', roomTable).map(s => getText(s, 'innerText'));
    const roomSlides = $$('.swiper-slide', roomRow);
    const slideIndex = roomSlides.indexOf(slide);



    const descriptionItems = $$('.description__content .description__item');
    const findDescriptionItem = (text)=> descriptionItems.find( item => getNodeData('.description__item-title', item).match(text) )

    let option = {
        checkinDt: dates.dateStart,
        nights: String(getDistance(dates.dateStart, dates.dateEnd)),
        hotelName: [getNodeData('.hero__title'), getShipName()].join(', Теплоход: '),
        hotel_desc: getNodeData('[data-tab-body="d-p_description"] .b-desc__text.vdrop__content', document, 'innerHTML'),
        href: window.location.href,
        country: "Россия",
        region: $$('span', lastElement($$('.booking__i-value.booking__i-value--route'))).extractNodesText().join(' → '),
        accommodation,
        roomType,
        boardType: headSlidesText[slideIndex],
        price: extractIntFromStr(price.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g, '')),
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('.price-block-room__thumb img', roomRow, 'src')
    };

    return option;
}

function getDates() {
   const [dateStart, dateEnd] = getNodeData('.booking__i-value--dates').split(/\s*—\s*/).map( str => dateFromDayAndMonthName(...str.split(/\s+/)) );
   return {dateStart, dateEnd}
}

function getShipName() {
    return getNodeData('.booking__left-ship .booking__i-value');
}

function getRoom(roomRow, slide, roomCell, roomTable) {
    const blocksInSlide = $$('.price-block-room__block', slide);
    const blockIndex = blocksInSlide.indexOf(roomCell);
    const tooltips = $$('.price-block-room__tooltip', roomRow).map(node => getText(node));
    const roomType = getNodeData('.price-block-item__header .price-block-item__name', roomTable);
    return {roomType, accommodation: tooltips[blockIndex]}
}

function getHotelRowByImage(img) {
    return img.closest('.price-block-item');
}
