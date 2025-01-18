window.OPERATOR_NAME = "Nevaseasons";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".card__content").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'center');

            div.append(btns);
        }
    });

    $$('.offer').forEach(div => {
        const text = getNodeData('.price > .text-primary', div);

        if ( !div.querySelector(".qq") && text && !text.match(/\+/g) ) {
            const btns = qqBtns({align: "qq-vertical"});

            btns.style.setProperty('grid-column', '6');
            btns.classList.add('qq-dynamic-display')

            div.append(btns);

            fixMediaRequest();
        }
    });

    $$('.offer > div:nth-child(2)').forEach(div => {
        const text = getNodeData('.price > .text-primary', div.parentNode);

        if ( !div.querySelector(".qq") && text && !text.match(/\+/g) ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'flex-end');
            btns.classList.add('qq-dynamic-display')

            div.append(btns);

            fixMediaRequest();
        }
    });

    $$('.side-form').forEach(div => {
        const text = getNodeData('.price > .text-primary', $1('.offer'));

        if ( !div.querySelector(".qq") && text && text.match(/\+/g) ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'center');

            div.append(btns);
        }
    })
}

function getDataFromRow(row) {
    return {
        roomType: getNodeData('div > div > b', row),
        nights: getNodeData('div:nth-child(2) > span:nth-child(4)', row) ?? null,
        hotelName: getNodeData('div.d-flex.align-items-center.gap-2 > div', row),
        hotelStars: $$('div.d-flex.align-items-center.gap-2 > div > div > svg', row).length,
        price: getNodeData('.offers-price > div, .price', row),
    }
}

async function getDataFromTourPage(tour, type) {
    let rowData;
    let hotelName;
    let roomType = '';

    if(type === 1) {
        rowData = getDataFromRow(tour);
        hotelName = `. Отель: ${rowData.hotelName} ${rowData.hotelStars ? rowData.hotelStars + '*' : ''}`;
        roomType = rowData.roomType;
    }else if(type === 2) {
        const hotels = $$({sel: '.accordion-title', searchString: /(Шаг)\s\d(Выберите размещ)/g})
        const chosenHotels = $$('.button-primary.button-primary--dark');

        if(chosenHotels.length < hotels.length) {
            hotels.forEach(async name => {
                const hotelsList = name.closest('.accordion-item');

                if(hotelsList.querySelector('.button-primary.button-primary--dark')) return;

                const unclickedBtn = hotelsList.querySelector('.button.button-secondary');
                unclickedBtn.click();
                chosenHotels.push(unclickedBtn)
            })
        }

        hotelName = '. Отели: '

        chosenHotels.forEach((item, idx) => {
            const row = getHotelRowByImage(item);
            const data = getDataFromRow(row);

            hotelName += `${idx + 1}) ${data.hotelName} ${data.hotelStars ? data.hotelStars + '*' : ''}, `;
            roomType += `${idx + 1}) ${data.roomType}; `
        })

        hotelName = hotelName.slice(0, -2);
        roomType = roomType.slice(0, -2);

        await waitForElem('.offers-price > .text-nowrap');
    }

    const data1 = $1('.side-form');
    const data2 = $1('.content-block.options');

    const regionContainer = $$({sel: '.common-title', searchString: /(Направление:)/g})?.[0]?.parentNode;
    const regionSpans = $$('div > div > span', regionContainer);
    const price = rowData?.price ?? getNodeData('.offers-price > .text-nowrap', data1);
    const tourDesc = getNodeData('.content-block > .description.season-content');
    const nights = rowData?.nights ?? getNodeData('div > div > div:nth-child(2) > span', data2)?.replace(/\D+/g, '');
    const occupancyText = $$('.people-picker-handler__item', data1).map(i => getText(i)).join(' + ');

    return {
        checkinDt: getNodeData('.tours-dates', data1, 'value'),
        nights: nights,
        region: regionSpans.map(i => getText(i)).join(', '),
        hotelName: getNodeData('.form-bg__title') + hotelName,
        hotel_desc: tourDesc,
        href: location.href,
        roomType: `${roomType}, ${occupancyText}`,
        price: price.replace(/\D+/g, ''),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g, '')),
        occupancy: getOccupancy(),
        thumbnail: location.origin + getNodeData('.swiper-wrapper > div > div > img, .main-info-img > img', document, 'srcset'),
        operator: OPERATOR_NAME,
        country: $1('head > meta[name="keywords"]').content.match(/Россия|Беларусь/g)[0] ?? '',

        boardType: "",
        city_from: "",
        excursion: true
    }
}

function getDataFromCard(tour) {
    const rawDate =
        getNodeData('div.card__info > div:nth-child(1) > div:nth-child(1) > div > span', tour) ||
        getNodeData('div > div.card__info.gap-2 > div.d-flex.flex-column > div > div > div > span', tour);
    const checkinDtArr = rawDate?.split('.');
    const rawNights =
        getNodeData('.card__info > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > span', tour) ||
        getNodeData('div > div.card__info.gap-2 > div.d-flex.justify-content-between > div.d-flex.gap-2 > div:nth-child(2) > span', tour) ||
        getNodeData('.card__duration', tour);
    const nights = rawNights?.match(/\d+/g, '')?.[0];
    const hotelDesc =
        getNodeData('.text-default', $1('.card__title', tour)?.parentNode) ||
        getNodeData('.text-default', $1('.button.button-secondary.card__button', tour)?.parentNode);
    const price1 = getNodeData('.offers-price > div', tour);
    const price = getNodeData('.price > .price__value', tour);
    const currency = getNodeData('.price > .price__currency', tour);

    return {
        checkinDt: appendYear(checkinDtArr[0], checkinDtArr[1]),
        nights: nights,
        region: $$('.badge-left-bottom > div > span', tour).map(i => getText(i)).join(', '),
        hotelName: getNodeData('.card__title', tour),
        hotel_desc: hotelDesc,
        href: getNodeData('.card__title', tour, 'href') || getNodeData('.card__title > a', tour, 'href'),
        price: (price1 ?? price).replace(/\D+/g, ''),
        currency: mapCurrencyUtil(currency?.slice(0, 3) ?? price1.slice(-2)),
        occupancy: {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null
        },
        thumbnail: location.origin + getNodeData('.card-medium__img, .card-big__img', tour, 'srcset'),
        operator: OPERATOR_NAME,

        country: "",
        roomType: "",
        boardType: "",
        city_from: "",
        excursion: true,
    }
}

function getParseType(hotelRow) {
    if(hotelRow.classList.contains('offer')) return 1;
    if(hotelRow.classList.contains('side-form')) return 2;
    return 0;
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const type = getParseType(tour);

    if(type === 0) return getDataFromCard(tour);
    return await getDataFromTourPage(tour, type);
}

function getHotelRowByImage(img) {
    return img.closest('.card, .offer, .side-form');
}

function getOccupancy() {
    const elems = $$('.text-black', $1('.category-picker')).map(i => getText(i));

    if(!elems) return null;

    const adults = elems.find(elem => elem.match(/взр/g));
    const children = elems.filter(elem => elem.match(/реб/g));

    if(!adults) return null;

    return {
        adultsCount: Number(adults.replace(/\D+/g, '')),
        childrenCount: children.length,
        childAges: children.map(item => item.replace(/\D+/g, '')).join(',')
    }
}

function waitForElem(selector, timeout = 2500) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(selector);
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(selector);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        setTimeout(() => {
            observer.disconnect();
            resolve(null);
        }, timeout);
    });
}

function fixMediaRequest() {
    if(window.matchMedia('(max-width: 1200px)').matches) {
        document.querySelectorAll('.qq-vertical.qq-dynamic-display').forEach(item => {
            item.style.setProperty('display', 'none');
        })
        document.querySelectorAll('.qq-horizontal.qq-dynamic-display').forEach(item => {
            item.style.setProperty('display', 'inline-flex');
        })
    }else{
        document.querySelectorAll('.qq-horizontal.qq-dynamic-display').forEach(item => {
            item.style.setProperty('display', 'none');
        })
        document.querySelectorAll('.qq-vertical.qq-dynamic-display').forEach(item => {
            item.style.setProperty('display', 'inline-flex');
        })
    }
}

window.addEventListener('resize', function(e) {
    fixMediaRequest();
})

fixMediaRequest();
