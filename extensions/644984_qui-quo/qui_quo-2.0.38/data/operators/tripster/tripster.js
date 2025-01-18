window.OPERATOR_NAME = "Tripster";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".price").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") && !div.parentNode.classList.contains('cell-day') ) {
            const btns = qqBtns({align: "qq-horizontal"});
            div.after(btns);
        }
    });

    $$(".pricing__content").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            btns.style.setProperty('width', '100%')
            btns.style.setProperty('justify-content', 'center')

            div.append(btns);
        }
    });
}

function parseTripsterDate(str) {
    const [year, month, day] = str.split('T')[0].split('-');
    return `${day}.${month}.${year}`;
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const buttonName = $1('.title', tour);
    const sidePanel = $1('.pricing__content');

    let data = JSON.parse(getNodeData('div > script', tour) ?? getNodeData('div > script', $1('#experience-page')));
    
    if(sidePanel && !buttonName) data = data[0];
    else if(sidePanel && buttonName) data = data.find(item => trim(item.name).match(trim(getText(buttonName))));

    const {
        name,
        description,
        startDate,
        endDate,
        location,
        image,
        url
    } = data;

    const priceText = getNodeData('.price-current, .pricing-discount__price', tour);

    let option = {
        checkinDt: parseTripsterDate(startDate),
        nights: getDistance(parseTripsterDate(startDate), parseTripsterDate(endDate)),
        hotelName: name,
        hotel_desc: description,
        href: url,
        country: location[0].address[0].addressCountry[0].name ?? getNodeData('[data-test="experiences-crumb-country"]'),
        region: location[0].address[0].addressLocality ?? getNodeData('[data-test="experiences-crumb-city"'),
        roomType: "",
        boardType: "",
        price: priceText.replace(/\D+/g, ''),
        currency: mapCurrencyUtil(priceText.replace(/\d+/g, '')),
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: image ?? getNodeData('img', tour, 'src'),
        occupancy: {
            adultsCount: 1,
            childrenCount: 0,
            childAges: null
        },
    };

    return option;
}

function getHotelRowByImage(img) {
    return img.closest('div:not(.qq-add-btn, .qq)');
}