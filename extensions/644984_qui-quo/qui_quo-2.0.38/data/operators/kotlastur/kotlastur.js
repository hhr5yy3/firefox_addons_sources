window.OPERATOR_NAME = "Kotlastur";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".tour-col-link.btn.btn-pink").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") && getNodeData('.tour-col-date > .date > span', div.closest('.tour-col')) ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'flex-end');
            div.parentNode.style.setProperty('flex-direction', 'column');

            div.after(btns);
        }
    });

    $$(".block-tourPrices-table .table-col.table-col-4 > .table-col-block").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-vertical"});

            btns.style.setProperty('margin', '4px');

            div.append(btns);
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);

    const name =
        getNodeData('.tour-col-title', tour) ||
        getNodeData('.header-bottom-center > h1');
    const region =
        getNodeData('.tour-col-route', tour) ||
        getTextWithoutInnerElements('.header-bottom-description');
    const image =
        getNodeData('.tour-col-img > img', tour, 'src') ||
        getNodeData('.block-tourProgram-img > img, .block-gallery-col-img > img', document, 'src');
    const priceText =
        getNodeData('.tour-col-price', tour)?.split('/')[0] ||
        getNodeData('.table-col.table-col-2 > div:nth-child(2)', tour).split('/')[0];
    const href =
        getNodeData('.tour-col-title', tour, 'href') ||
        location.href;
    const [day, month] =
        (getNodeData('.tour-col-date > .date > span', tour)?.split('.') ||
        getNodeData('.table-col.table-col-1', tour).split('-')[0].split('.').map(i => i.replace(/\D+/g, '')))
    const foodElem = $$({sel: '.block-tourInfo-content li', searchString: /Питание|завтрак|обед|ужин/})?.[0];
    const roomElem = $$({sel: '.block-tourInfo-content li', searchString: /Гостини|гост|отел|номер|комнат/})?.[0];

    let option = {
        checkinDt: appendYear(day, month),
        nights: name.match(/(\d+)\sноч/)?.[1] ?? '0',
        hotelName: name,
        hotel_desc: getNodeData('#block-tourContent') ?? '',
        href,
        country: "Россия",
        region,
        roomType: (roomElem && getText(roomElem)) ?? '',
        boardType: (foodElem && getText(foodElem).replace('Входные билеты в объекты показа по программе, ', '')) ?? '',
        price: priceText.replace(/\D+/g, ''),
        currency: mapCurrencyUtil(priceText.replace('от', '').replace(/[^а-яА-Яa-zA-Z]/g, '') || 'RUB'),
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: image,
        occupancy: {
            adultsCount: 1,
            childrenCount: 0,
            childAges: 0
        },
        excursion: true
    };

    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.tour-col, tr');
}

function getTextWithoutInnerElements(sel, searchElem = document.documentElement) {
    let res;

    if(typeof sel === 'string') res = searchElem?.querySelector(sel);
    else res = sel;

    if(!res) return null

    const clonedDiv = res.cloneNode(true);

    clonedDiv.querySelectorAll('*').forEach(el => el.remove());

    return clonedDiv.textContent.trim();
}
