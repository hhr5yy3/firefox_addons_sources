window.OPERATOR_NAME = "";
window.showTopHotelsRating = false;
loadInlineScript();
console.log(`Loaded ${window.OPERATOR_NAME}`);

async function initializeSearchCriteria() {
    const [dateStart, dateEnd] = getDate();

    if(!dateStart || !dateEnd) return null;

    return {
        checkinDt: dateStart,
        nights: getDistance(dateStart, dateEnd),
        occupancy: await getOccupancy()
    };
}

function getSearchButton() {
    const offer = $1('#rooms > div:nth-child(2) > div:nth-child(1) > button');
    const hotel = $1('#__next > div > div > div:nth-child(2) > div > button');
    return offer || hotel;
}

function injectData() {
    let flag = false;

    $$(
        '[itemtype="https://schema.org/Hotel"] > div:nth-child(2) > div:nth-child(2), ' + 
        '[itemtype="https://schema.org/Offer"] > div > div:nth-child(2)'
    ).forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});
            
            btns.style.setProperty('width', '100%');
            btns.style.setProperty('justify-content', 'center');
            
            div.append(btns);
            flag = true
        }
    });

    if(flag) loadInlineScript();
}

function loadInlineScript() {
    window.qscript = document.createElement("script");
    window.qscript.src = chrome.runtime.getURL('data/operators/sanatory/inline_script.js');
    document.head.appendChild(window.qscript);
    window.qscript.remove();
}

function getDate() {
    const dateInput = getNodeData('[placeholder="Курорт или город"]', document, 'value');

    if(!dateInput) return [null, null];

    const dateArr = dateInput.split(',')[0].split(' — ');
    
    return dateArr.map(date => {
        const [day, month] = date.split(' ');
        return appendYear(day, monthNameToNumber(month));
    });;
}

async function getOccupancy() {
    const occupancyContainer = $1('[placeholder="Гости"]').closest('[data-active]').parentNode;

    if($1('[data-active="false"]')) $1('[data-active]', occupancyContainer).click();

    await waitForElem('[data-active="true"]');

    const occupancyInputs = $$('input', occupancyContainer);
    occupancyInputs.shift();

    if(occupancyInputs.length === 0) return null;

    const childAges = occupancyInputs.filter(i => i.id.length > 0).map(i => getText(i.previousElementSibling).replace(/\D+/g, ''));

    $1('[data-active]', occupancyContainer).click();

    return {
        adultsCount: Number(occupancyInputs[0].value.replace(/\D+/g, '')),
        childrenCount: childAges.length,
        childAges: childAges.join(',')
    };
}

async function getHotelOption(tour) {
    
    const reactData = JSON.parse(getNodeData('meta[name=reactData]', tour, 'content'));
    const specializationList = reactData.specializations.map(i => i.name);
    const specializationListText = "<b>Профили лечения:</b><br><ul>" + specializationList.map(i => `<li>${i}</li>`).join('') + "</ul>";
    

    const s = await SEARCH_CRITERIA;

    let option = {
        checkinDt: s.checkinDt,
        nights: s.nights,
        hotelName: reactData.name + " " + reactData.star + "*",
        hotel_desc: specializationList.length ? specializationListText : '',
        href: getNodeData('[itemtype="https://schema.org/Hotel"] > div:nth-child(2) > div:nth-child(2) > div:not(class) > a', tour, 'href'),
        country: reactData.address.country,
        region: reactData.address.region,
        roomType: "",
        boardType: reactData.meal_options.pop().name,
        price: reactData.pricing.discount_price.min,
        currency: "RUB",
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: getNodeData('.image-gallery-image', tour, 'src'),
        occupancy: s.occupancy,
    };

    return option;

}

function getSpecializationList() {
    const activeMenu = _findUniqueElement($$('#specialization > div'));

    $1('#specialization > div:nth-child(3)').click();

    const specializationList = getNodeData('#specialization ~ div').split(/(?<=[а-яё])(?=[А-ЯЁ])/);

    activeMenu.click();

    return specializationList;
}

async function getOfferOption(tour) {

    const nameElem = $1('h1[itemprop="name"]');
    const hotelStars = $$('svg', nameElem.parentNode).length;

    const address = getNodeData('p[itemprop=address] ~ div').split(', ');

    const roomTypeElem = tour.closest('[data-id=roomType]')
    const roomType = roomTypeElem.dataset.roomtypeName;
    const category = getNodeData('[itemprop=category]', tour);
    const boardType = getNodeData('[itemprop=category] ~ div > div > div > div > div > div:nth-child(2)', tour);
    const thumbnail = getNodeData('picture > img', roomTypeElem, 'src');

    const specializationList = getSpecializationList();

    const s = await SEARCH_CRITERIA;

    let option = {
        checkinDt: s.checkinDt,
        nights: s.nights,
        hotelName: getText(nameElem).replace(/\s\d\*/, '') + " " + hotelStars + "* " + category,
        hotel_desc: "<b>Профили лечения:</b><br><ul>" + specializationList.map(i => `<li>${i}</li>`).join('') + "</ul>",
        href: location.href,
        country: address.shift(),
        region: address.join(', '),
        roomType: roomType,
        boardType: boardType,
        price: getNodeData('[itemprop=price]', tour, 'content'),
        currency: getNodeData('[itemprop=priceCurrency]', tour, 'content'),
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: thumbnail,
        occupancy: s.occupancy,
    };

    return option;

}

async function createOption(img) {

    const tour = getHotelRowByImage(img);

    if(tour.getAttribute('itemtype') === 'https://schema.org/Offer') {
        return getOfferOption(tour);
    }else {
        return getHotelOption(tour);
    }

}

function getHotelRowByImage(img) {
    const offer = img.closest('[itemtype="https://schema.org/Offer"]');
    const hotel = img.closest('[itemtype="https://schema.org/Hotel"]');
    return offer || hotel.parentNode;
}

function waitForElem(selector, options = {}) {
    const { timeout = 150, mode = 'appear', contentMatch = false, styleMatch = {} } = options;
    return new Promise(resolve => {
        const observer = new MutationObserver(check);
        check();
        observer.observe(document.body, OBSERVER_OPTIONS);
        function check() {
            const elemList = $$(selector);
            const exist = elemList.length > 0;
            const matchTextArr = contentMatch && elemList.filter(item => getText(item).match(contentMatch));
            const matchText = !contentMatch || matchTextArr.length > 0;
            const matchStylesArr = Object.keys(styleMatch).length > 0 && matchTextArr.filter(compareStyles)
            const matchStyles = Object.keys(styleMatch).length === 0 || matchStylesArr.length > 0;
    
            if (matchText && matchStyles && mode === 'appear') resolveElem(selector);
            else if (!exist && mode === 'disappear') resolveElem(true);
        }
        function compareStyles(item) {
            for(let style in styleMatch) {
                if(getComputedStyle(item)[style] !== styleMatch[style]) return false;
            }
            return true;
        }
        function resolveElem(rtrn) {
            if(observer) observer.disconnect();
            return resolve(rtrn);
        }
        setTimeout(() => {resolveElem(null)}, timeout);
    });
}

function _findUniqueElement(elements) {
    const classMap = {};
  
    for (const el of elements) {
        const key = el.className; 
        classMap[key] = (classMap[key] || 0) + 1;
    }
  
    return elements.find(el => classMap[el.className] === 1) || null;
}