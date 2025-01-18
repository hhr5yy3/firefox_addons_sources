window.OPERATOR_NAME = "TUTU";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

const placeCache = {};

async function getPlace(place) {
    const params = new URLSearchParams(document.location.search);
    const region = place || params.get('geo_name');
    const cached = placeCache[region];

    if(cached) return cached;

    const response = await fetch(`https://hotels-geo-suggest.tutu.ru/api/v1/suggest?query=${region}&limit=1`);
    
    if(response.ok) {
        const data = await response.json();
        const placeData = data.items[0].parents;

        let res = {region, country: ''};
        
        if(placeData.length === 1) {
            res = {
                region: region,
                country: placeData[0].name,
            }
        }else if(placeData.length === 2){
            res = {
                region: placeData[0].name,
                country: placeData[1].name,
            }
        }

        placeCache[region] = res;
        return res;
    }
    return {region, country: ''};
}

const svgClick = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window
});

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    const priceNode = $1('[data-ti="order-price"]') ||
                      $1('[data-ti="min-price"]');
    if(!priceNode || (priceNode && getText(priceNode).match(/\d/) === null)) return;

    $$('[data-ti="offer-card"] > div:last-child').forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const buttons = qqBtns({align: "qq-horizontal"});
            buttons.style.marginTop = '4px';
            buttons.style.width = '100%';
            buttons.style.justifyContent = 'flex-end';
            div.style.paddingBottom = '5px';
            div.append(buttons);
        }
    });

    $$('[data-ti="room-offer"]').map(i => $1('[data-ti="order-button-outer"]', i).parentNode).forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });

    $$('[data-ti="proceed-block"]').forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const buttons = qqBtns({align: "qq-horizontal"});
            buttons.style.setProperty('width', '100%')
            buttons.style.setProperty('justify-content', 'flex-end')
            buttons.style.setProperty('margin-top', '4px')
            div.append(buttons);
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const data = tour.closest('[data-ti="order-panel"]') ?? document;
    
    const checkinDtText = getNodeData('[data-ti="info"]') || getNodeData('[data-ti="date-input"]', document, 'value') ||
                          getNodeData('[data-ti="checkin-date"]')
    const checkinDtArr = checkinDtText.split('-')[0].split(' ');
    const nightsText = getNodeData('[data-ti="price-for-guest"] > span:nth-child(2)', tour) ||
                       getNodeData('[data-ti="guests-and-nights-count"]', tour) ||
                       getNodeData('[data-ti="hotel-info"]');
    const nights = nightsText.match(/\d+\sноч/)[0].replace(/\D+/, '');
    const hotelName = getNodeData('[data-ti="hotel-name"]', tour) ||
                      getNodeData('[data-ti="hotel-name"]')
    const hotelDesc = getNodeProperty($1('div:nth-child(3)', $1('[data-ti="hotel-name"]', tour)?.parentNode ?? null)) || '';
    const roomType = getNodeData('div:nth-child(2) > div:last-child > div:not([class]) > span', tour) ||
                     getNodeData('[data-ti="title"]', data) ||
                     getNodeData('span', $1('[data-ti="hotel-info"]').parentNode);
    const boardType = getNodeData('[data-type="meal"]', tour);
    const priceText = getNodeData('[data-ti="order-price"]', tour) ||
                      getNodeData('[data-ti="min-price"]', tour) || 
                      getNodeData('[data-ti="order-price"]');
    const thumbnailElemOffers = $1('[data-ti="image_container"]', tour);
    const thumbnailDetails = getNodeProperty($1('img', $1('.swiper-slide', data)), null, 'src');
    const thumbnailCheckout = getNodeData('img[data-ti="hotel-image"]', document, 'src');
    const place = getNodeData('[data-ti="summary-location"') ?? '';

    const { country, region } = await getPlace(place);
    let option = {
        checkinDt: appendYear(checkinDtArr[0], monthNameToNumber(checkinDtArr[1])),
        nights,
        hotelName,
        hotel_desc: hotelDesc,
        country,
        region,
        roomType,
        boardType: boardType ?? 'Питание не включено',
        price: priceText.replace(/\D+/g, ''),
        currency: mapCurrencyUtil(priceText.slice(-1)),
        operator: window.OPERATOR_NAME,
        thumbnail: thumbnailElemOffers ? thumbnailElemOffers.style.backgroundImage.replace('url(\"', '').replace('")', '') :
                   thumbnailDetails ? thumbnailDetails :
                   thumbnailCheckout,
        occupancy: await getOccupancy('Offers') ?? (await getOccupancy('Details') ?? null),
        city_from: "",
        extra_nights: "0",
        href: "",
    };

    return option;
}

function getHotelRowByImage(img) {
    return img.closest('[data-ti="offer-card"]') ||
           img.closest('[data-ti="room-offer"]') ||
           $1('[data-ti="hotel-card"]');
}

async function getOccupancy(type) {
    if(type === 'Offers') return getOccupancyOffers();
    if(type === 'Details') return await getOccupancyDetails();
}

function getOccupancyOffers() {
    const occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };

    const bothElement = getNodeData('[data-ti="collapse-item"] > div > div > [data-ti="hotel-info"]');

    if(!bothElement) return null;

    const adults = bothElement.match(/(\d+)\s*взр/);
    const children = bothElement.match(/(\d+)\s+(дет|реб|млад)/);
    occupancy.adultsCount = adults ? Number(adults[1]) : null;
    occupancy.childrenCount = children ? Number(children[1]) : null;

    if(!occupancy.adultsCount) return null;

    return occupancy;
}

async function getOccupancyDetails() {
    const openSearchButton = $1('[data-ti="searchPanel"] > [data-ti="icon"]');
    let closeSearchPanel = false;

    if(openSearchButton) {
        closeSearchPanel = true;
        openSearchButton.click();
    }

    const button = await waitForElem('[data-ti="guests"] > div > div > div > input');

    if(!button) return null;
    
    $1(button).click();

    const popup = await waitForElem('[data-ti="order-popper-container"]');

    if(!popup) return null;

    $1(popup).style.setProperty('display', 'none')

    return getOccupancyDetailsData(closeSearchPanel);
}

function getOccupancyDetailsData(closeSearchPanel) {
    const [adults, children] = $$('[data-ti="hotels-guest');

    if(!adults || !children) return detailsClosePopup(closeSearchPanel);

    const adultsCount = $1('div > div > div > span.o-text-inline.o-text-paragraphMedium', adults);
    const childrenCount = $1('div > div > div > span.o-text-inline.o-text-paragraphMedium', children);

    if(!adultsCount || !childrenCount) return detailsClosePopup(closeSearchPanel);

    const ages = $$('[data-ti="hotels-range"] > div > div > span.o-text-secondary').map(i => getText(i)?.replace?.(/\D+/g, ''))?.join?.(',');

    const occupancy = {
        adultsCount: Number(getText(adultsCount) ?? 0),
        childrenCount: Number(getText(childrenCount) ?? 0),
        childAges: ages
    }

    return detailsClosePopup(closeSearchPanel, occupancy);
}

function detailsClosePopup(closeSearchPanel, r = null) {
    $1('[data-ti="guests"] > div > div > div > input, [data-ti="hotels-guest-bottom-button"]').click();

    const closeSearchButton = $1('[data-ti="order-icon-actions-cross"]');

    if(closeSearchButton && closeSearchPanel) closeSearchButton.dispatchEvent(svgClick);

    return r;
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