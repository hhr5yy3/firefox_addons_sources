window.OPERATOR_NAME = "Magput";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function parseMagputDate(text) {
    const [day, month, year] = trim(text).split(/\s/);
    return `${day.padStart(2, 0)}.${String(monthNameToNumber(month)).padStart(2, 0)}.${year.slice(-2)}`;
}

function injectData() {
    $$(".searcher-item__more").forEach(div => {
        if ( !div.querySelector(".qq") && getNodeData('.searcher-item__price-from', div.closest('.searcher-item__ship')).match(/\d/)) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });

    $$(".cruise-checkout-bottom__btns").forEach(div => {
        if ( !div.querySelector(".qq")) {
            const btns = qqBtns({align: "qq-horizontal"});

            div.style.setProperty('display', 'flex')
            div.style.setProperty('flex-direction', 'column-reverse')
            div.style.setProperty('align-items', 'flex-end')
            btns.style.setProperty('margin-bottom', '8px')

            div.append(btns);
        }
    });
}

function getTextWithoutInnerElements(elem) {
    if(!elem) return null;
    const clonedDiv = elem.cloneNode(true);

    clonedDiv.querySelectorAll('*').forEach(el => el.remove());

    return clonedDiv.textContent.trim();
}

function createOption(img) {
    const tour = getHotelRowByImage(img);

    const [
        name,
        roomNumber,
        roomType,
        occupancy,
        price,
        date,
        route
    ] = $$('.cruise-checkout__info-item', tour).map(i => {
        const [name, spanData] = $$('span', i);
        if(!spanData) {
            return getTextWithoutInnerElements(i);
        }
        return spanData.textContent;
    })

    const datesArr = date?.split(' - ') ?? [null, null];

    const checkinDt = datesArr[0] || getNodeData('.searcher-item__dates > .searcher-item__dates-item:first-child > .searcher-item__dates-date', tour);
    const checkoutDt = datesArr[1] || getNodeData('.searcher-item__dates > .searcher-item__dates-item:last-child > .searcher-item__dates-date', tour);
    const hotelName = getTextWithoutInnerElements($1('.searcher-item__title', tour));
    const region = route || getNodeData('.searcher-item__description', tour);
    const priceText = price || getNodeData('.searcher-item__price-from', tour);
    const currencyText = price || getNodeData('.searcher-item__price-type', tour).trim().slice(0, 1);
    const thumbnail = getNodeData('.slick-track > img, .cruise__image', tour, 'src');
    const adultsCount = Number(occupancy?.split(/\s/g)?.[1]);
    const childrenCount = Number(occupancy?.split(/\s/g)?.[3]);

    let option = {
        checkinDt: parseMagputDate(checkinDt),
        nights: getDistance(parseMagputDate(checkinDt), parseMagputDate(checkoutDt)),
        hotelName: name ? `${name} (Каюта ${roomNumber})` : hotelName,
        hotel_desc: "",
        href: "",
        country: "",
        region,
        roomType: roomType ?? "",
        boardType: "",
        price: priceText?.replace?.(/\D+/g, ''),
        currency: mapCurrencyUtil(currencyText ?? ''),
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail,
        occupancy: {
            adultsCount: isNaN(adultsCount) ? 1 : adultsCount,
            childrenCount: isNaN(childrenCount) ? 0 : childrenCount,
            childAges: null
        }
    };
    
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.searcher-item__ship, .cruise');
}