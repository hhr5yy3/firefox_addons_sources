window.OPERATOR_NAME = "Russeas";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

async function initializeSearchCriteria() {
    const occupancy = await getOccupancy()
    return {
        country: $1('#mantine-r0')?.value,
        date: parseDateFromSearch(),
        occupancy
    };
}

function getSearchButton() {
    return document.querySelector('div[class*="SearchBooking-module__search-"]');
}

async function addPresavedData() {
    window.presavedQQOptions = await createOption(this);
}

function injectData() {
    let updateBtnsWidth = false;

    $$(".bo-item__footer").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") && getNodeData('.h-price', div.closest('.bo-item'))?.match(/\d+/g) ) {
            const btns = qqBtns({align: "qq-horizontal"});
            const bookBtn = $1('button', div)

            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'flex-end');
            btns.style.setProperty('height', 'auto');
            btns.style.setProperty('padding', '0 15px 15px 15px');

            bookBtn.addEventListener('click', addPresavedData);

            div.after(btns);
        }
    });

    $$('[class*="HotelList-module__item-"]').forEach(div => {
        const footer = $1('footer', div);
        if ( footer && !footer.querySelector(".qq") && getNodeData('[class*="TourCard-module__price-"]', div)?.match(/\d+/g) ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('margin-right', '5px');
            $1('div:not(.qq)', footer).style.setProperty('margin-left', '0');
            footer.style.setProperty('justify-content', 'flex-end')

            footer.prepend(btns);
        }
    });

    $$('[class*="RoomOffer-module__block-"]').forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.classList.add('qq-chose-rooms');
            btns.style.setProperty('margin', 'auto');
            btns.style.setProperty('justify-content', 'flex-end');

            div.append(btns);

            updateBtnsWidth = true;
        }
    });

    $$(".mantine-Modal-modal > div:nth-child(2) > div:nth-child(3) > div > div:nth-child(2)").forEach(div => {
        const isPriceReady = getNodeData('[class*="PriceCalendar-modules__footerPriceAmount-"], [class*="PriceCalendar-modules__footerPriceAmountWithQuota-"]', $1('.mantine-Modal-modal'))?.match(/\d+/g)
        if ( !div.querySelector(".qq") && window.presavedQQOptions && isPriceReady ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('margin-left', '4px');

            div.append(btns);
        }
    });

    $$('aside').forEach(div => {
        if( !div.querySelector(".qq") && div.className.match('OrderPage-module__sidebar-') ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'center');
            btns.style.setProperty('top', '8px');

            $1('div > div', div).append(btns);
        }
    })

    if(updateBtnsWidth) fixMediaRequest();
}

async function getOccupancy() {
    const scroll = window.scrollY;
    const btn = $1('#mantine-r5-target');

    if(!btn) return null;
    
    btn.click();

    const container = await waitForElem('#mantine-r5-dropdown');

    const adultsCount = $1('div > div:nth-child(1) > div:nth-child(2) > div > div > input', $1(container));
    
    const childrenAges = $$({sel: 'label', searchString: /Возраст ребенка/}, $1(container)).map(i => {
        const container = i.closest('div');
        return $1('input[type="hidden"]', container).value;
    })

    if(!adultsCount) return null;
    
    $1('.mantine-Button-root', $1('#mantine-r5-dropdown')).click();

    window.scrollTo(0, scroll)

    return {
        adultsCount: Number(adultsCount.value),
        childrenCount: childrenAges.length,
        childAges: childrenAges.join(',')
    }
}

function getTextWithoutInnerElements(elem) {
    if(!elem) return null;
    
    const clonedDiv = elem.cloneNode(true);

    clonedDiv.querySelectorAll('*').forEach(el => el.remove());

    return clonedDiv.textContent.trim();
}

function parseRusseasDate(date) {
    if(!date) return null;

    const [day, month] = date?.split(/\s/g);

    return appendYear(day, monthNameToNumber(month));
}

async function getDataFromCalendar(tour) {
    if(!window.presavedQQOptions) {
        $1('.mantine-Modal-close').click();
        return;
    }

    const dataDate = getNodeData('[class*="PriceCalendar-modules__tourInfo-"]', tour);
    const [date, nightsText] = dataDate.split('(').map(part => part.trim().match(/\d.+/g)[0]);
    const nights = nightsText.match(/\d+/)[0];
    const priceElem = $1('[class*="PriceCalendar-modules__footerPriceAmount-"], [class*="PriceCalendar-modules__footerPriceAmountWithQuota-"]', tour);
    const [roomType, boardType] = getNodeData('[class*="PriceCalendar-modules__nses-"] input:not([type="hidden"])', tour, 'value').split(' - ');
    const occupancy = getNodeData('[class*="PriceCalendar-modules__tourists-"] div > div > button', tour)

    const option = Object.assign(structuredClone(window.presavedQQOptions), {
        checkinDt: parseRusseasDate(date),
        nights,
        roomType,
        boardType,
        price: getNodeData('span', priceElem).replace(/\D+/g, ''),
        currency: mapCurrencyUtil(getNodeData('span:nth-child(2)', priceElem)),
        occupancy: {
            adultsCount: Number(occupancy.replace(/\D+/g, '')),
            childrenCount: 0,
            childAges: null
        }
    })

    return option;
}

function parseDateFromSearch() {
    const date = getTextWithoutInnerElements($1('[class*="SearchDates-module__button-"]'))?.split('.')?.[0];
    return parseRusseasDate(date)
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const tourClassArr = Array.from(tour.classList);

    if(tourClassArr.some(i => i.match('PriceCalendar-modules__modal-'))) return await getDataFromCalendar(tour);

    const checkinDt = await getCheckinDt(tour);
    const country = await getCountry();
    const {price, currency} = getPriceAndCurr(tour);
    const occupancy = await getOptionOccupancy(tour);

    let option = {
        checkinDt,
        nights: getNights(tour),
        hotelName: getHotelName(tour),
        hotel_desc: getHotelDesc(tour),
        href: getHref(tour),
        country,
        region: getRegion(tour),
        roomType: getRoomType(tour),
        boardType: getBoardType(tour),
        price,
        currency,
        operator: OPERATOR_NAME,
        thumbnail: getThumbnail(tour),
        occupancy,
        city_from: "",
    };

    return option;
}

async function getCheckinDt(tour) {
    const checkinDt = 
        getNodeData('.bo-item__date', tour) || 
        getNodeData('[class*="RoomFilter-module__dates-"]')?.split(' —')?.[0] || 
        getNodeData('[class*="SearchBlockInfo-module__dates-"]')?.split(' —')?.[0] || 
        getNodeData('[class*="OrderRoomBlock-module__checkDate-"]', tour);

    if(checkinDt) return parseRusseasDate(checkinDt);

    const {date} = await SEARCH_CRITERIA;
    return date;
}

function getNights(tour) {
    const nights = 
        getNodeData('[class*="OrderCheckBlock-module__priceLabelInfo-"]', tour)?.split(', ')?.[0] || 
        getTextWithoutInnerElements($1('[class*="RoomOffer-module__priceBlock-"] > span', tour)) || 
        getTextWithoutInnerElements($1('[class*="TourCard-module__nightsCut-"]', tour)) || 
        getNodeData('.bo-item__info > span', tour);

    return nights.replace(/\D+/g, '');
}

function getHotelName(tour) {
    const stars = 
        $$('.hotel-stars__item', tour).length ||
        $$('[class*="TourCard-module__stars-"] > svg', tour).length ||
        $$('[class*="OrderRoomBlock-module__stars-"] > svg').length ||
        $$('.hotel-stars__item', $1('.hp-title')).length;

    const hotelName = 
        getNodeData('[class*="OrderRoomBlock-module__hotelName-"]', tour) ||
        getNodeData('div.hp-title > h1') ||
        getNodeData('header > a', tour) || 
        getNodeData('.bo-item__title', tour);

    return hotelName + (stars ? ` ${stars}*` : '');
}

function getHotelDesc(tour) {
    const hotelDesc = getNodeData('.hp-desc__text') || '';

    return hotelDesc;
}

function getHref(tour) {
    const hotelDesc = 
        getNodeData('header > a', tour, 'href') ||
        getNodeData('.bo-item__title-block', tour, 'href') ||
        location.href

    return hotelDesc;
}

async function getCountry() {
    const {country} = await SEARCH_CRITERIA;

    return country ?? '';
}

function getRegion(tour) {
    const region = 
        getNodeData('[class*="BadgeLocation-module__block-"]', tour) ||
        getNodeData('div.badge.badge_location') ||
        getNodeData('[class*="BadgeLocation-module__block-"]', tour) ||
        getNodeData('.bo-item__city', tour)

    return region;
}

function getRoomType(tour) {
    const offers = 
        $1('[class*="RoomOfferOptions-module__col-"]', tour) ||
        $1('[class*="TourCard-module__offers-"]', tour);

    const region = 
        offers && getTextWithoutInnerElements($1('div:nth-child(1)', offers)) ||
        offers && getNodeData('div:nth-child(1) > div > span', offers) ||
        ''

    return region;
}

function getBoardType(tour) {
    const offers = 
        $1('[class*="RoomOfferOptions-module__col-"]', tour) ||
        $1('[class*="TourCard-module__offers-"]', tour);

    const region = 
        offers && getTextWithoutInnerElements($1('div:nth-child(2)', offers)) ||
        offers && getNodeData('div:nth-child(2) > div > span', offers) ||
        ''

    return region;
}

function getPriceAndCurr(tour) {
    const priceText =
        getNodeData('[class*="OrderCheckBlock-module__totalBlockPrice-"]', tour) ||
        getNodeData('[class*="RoomOffer-module__price-"]', tour) ||
        getNodeData('[class*="TourCard-module__price-"]', tour) ||
        getTextWithoutInnerElements($1('.h-price', tour));

    return {
        price: priceText.replace(/\D+/g, ''),
        currency: mapCurrencyUtil(priceText.replace(/\d+|\s+|[а-яА-Я]/g, '')),
    };
}

function getThumbnail(tour) {
    const container = $1('[class*="OrderRoomBlock-module__image-"]', tour);
    const thumbnail = 
        container && getNodeData('img', container, 'src') ||
        getNodeData('div > div > img[class*="RoomCard-module__image-"]', tour.parentNode.parentNode.parentNode, 'src') ||
        getNodeData('.bo-item__header > img', tour, 'src') ||
        getNodeData('img', tour, 'src');

    return thumbnail;
}

async function getOptionOccupancy(tour) {
    const inlineData = getNodeData('[class*="OrderCheckBlock-module__priceLabelInfo-"]', tour);
    const inlineData2 = getNodeData('[class*="SearchBlockInfo-module__tourists-"]');

    if(inlineData || inlineData2) {
        const [nights, adults, children] = (inlineData ?? ' , ' + inlineData2)?.split(', ');
        const ages = $$('div > div > h4').map(item => getText(item).match(/\(\d+.+\)/g)?.[0]?.replace(/\D+/g, '')).filter(item => item).join(',');
    
        if(adults) return {
            adultsCount: Number(adults.replace(/\D+/g, '')),
            childrenCount: (children && Number(children.replace(/\D+/g, ''))) ?? 0,
            childAges: (inlineData && ages) ?? null
        };
    }
    
    const adults = getNodeData('[class*="RoomCard-module__headTitle-"] > span', tour.parentNode.parentNode.parentNode);

    if(adults) return {
        adultsCount: Number(adults.replace(/\D+/g, '')),
        childrenCount: 0,
        childAges: null
    }

    const {occupancy} = await SEARCH_CRITERIA;

    if(occupancy) return occupancy;

    return await getOccupancy();
}

function getHotelRowByImage(img) {
    return img.closest('.bo-item, [class*="HotelList-module__item-"], .mantine-Modal-modal, [class*="OrderPage-module__page-"]') || img.closest('div:not(.qq, .qq-add-btn)');
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
    if(window.matchMedia('(max-width: 768px)').matches) {
        document.querySelectorAll('.qq-horizontal.qq-chose-rooms').forEach(item => {
            item.style.setProperty('width', '100%');
            item.style.setProperty('margin', '0');
        })
    }else{
        document.querySelectorAll('.qq-horizontal.qq-chose-rooms').forEach(item => {
            item.style.setProperty('width', 'auto');
            item.style.setProperty('margin', 'auto 0');
        })
    }
}

window.addEventListener('resize', function(e) {
    fixMediaRequest();
})

fixMediaRequest();