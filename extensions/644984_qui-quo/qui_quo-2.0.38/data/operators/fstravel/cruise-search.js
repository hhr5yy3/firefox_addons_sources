window.OPERATOR_NAME = "FUN&SUN";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return {
        occupancy: getOccupancyFromInput()
    };
}

function getSearchButton() {
    return $1('[class*="FormFilter_cont-btn_"] > div > [class*="Button_btn_"]')
}

function injectData() {
    let changeCellHeight = false;
    $$('[class*="SearchTour_right_"]').forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});
            div.append(btns);
        }
    });
    $$('[class*="Cabins_td_"]:not([class*="Cabins_disabled_"]) [class*="TooltipInfo_ico_"]').forEach(icon => {
        const div = icon.closest('[class*="Cabins_td_"]')
        if ( !div.querySelector(".qq") ) {
            const btns = qqBtns({align: "qq-horizontal"});

            div.append(btns);

            changeCellHeight = true;
        }
    });

    if(changeCellHeight) {
        $$('[class*="Cabins_td_"]').forEach(td => td.style.setProperty('height', '90px'))
    }
}

function getHotelRowByImage(img) {
    return img.closest('[class*="SearchTour_wrapper_"], [class*="Cabins_td_"]');
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);

    const region = await getRegion(tour);
    const boardType = await getFood(tour);
    const roomType = await getRoom(tour);
    const {price, currency} = getPriceAndCurr(tour)

    let option = {
        checkinDt: getCheckidDt(tour),
        nights: getNights(tour),
        hotelName: getName(tour),
        href: getHref(tour),
        occupancy: getOccupancy(tour),
        city_from: getNodeData('[class*="SearchTour_item_"] > span:nth-child(2)', tour),
        thumbnail: getThumbnail(tour),
        operator: OPERATOR_NAME,
        hotel_desc: "",
        country: "",
        region,
        roomType,
        boardType,
        price,
        currency,
    };

    return option;
}

function getCheckidDt(tour) {
    const rightMenu = $1('[class*="CruiseInfo_right_"]');
    const date =
        rightMenu && getNodeData('[class*="CruiseInfo_item-desc_"]:nth-child(5) > span:nth-child(2)', rightMenu).split(' - ')[0] ||
        getNodeData('[class*="SearchTour_date_"] > span:nth-child(2)', tour);
    
    return date;
}

function getNights(tour) {
    const rightMenu = $1('[class*="CruiseInfo_right_"]');
    const nights =
        rightMenu && getNodeData('[class*="CruiseInfo_item-desc_"]:nth-child(4) > span:nth-child(2)', rightMenu) ||
        getNodeData('[class*="SearchTour_right_"] [class*="SearchTour_item_"]', tour);
    
    return nights.match(/(\d+)\sноч|nigh/)[1];
}

function getName(tour) {
    const rightMenu = $1('[class*="CruiseInfo_right_"]');
    const name =
        rightMenu && getNodeData('[class*="CruiseInfo_item-desc_"]:nth-child(6)', rightMenu) ||
        getNodeData('[class*="SearchTour_text_"] > div:nth-child(5)', tour);
    
    return name.replace('Лайнер', 'Лайнер: ');
}

function getHref(tour) {
    const href =
        getNodeData('[class*="SearchTour_title_"] > a', tour, 'href') ||
        location.href;
    
    return href;
}

async function getRegion(tour) {
    const rightMenu = $1('[class*="CruiseInfo_right_"]');
    const regionFromPopup = await getRegionFromPopup(tour);
    const region = rightMenu && getNodeData('[class*="CruiseInfo_item-desc_"]:nth-child(3) > span:nth-child(2)', rightMenu);

    const res = region || regionFromPopup;
    
    return res.split(' - ').filter((port, index, array) => port !== array[index - 1]).join(' - ');
}

async function getRoom(tour) {
    const roomType = getRoomTypeByTC(tour.closest('[class*="Cabins_tc_"]'));
    const cabin = getNodeData('span', tour);

    const isCabinEqualRoom = !roomType || roomType === cabin

    if(cabin && isCabinEqualRoom && tour.className.match('Cabins_td_')) return cabin;
    
    return roomType && cabin && (cabin + ': ' + roomType);
}

async function getFood(tour) {
    const foodFromPopup = await getFoodFromPopup(tour);
    const food = getFoodFromList($1('[class*="CruiseIncludedInfo_ul_"]'));
    const res = food || foodFromPopup;
    
    return res && res.replace('• ', '');
}

function getPriceAndCurr(tour) {
    const priceText =
        getNodeData('[class*="SearchTour_right_"] div > button > span[class*="SearchTour_bold_"]', tour) ||
        getNodeData('span + [class*="Cabins_bold_"]', tour);
    
    return {
        price: priceText.replace(/[^,\d]/g, '').replace(/,.+/g, ''),
        currency: mapCurrencyUtil(priceText.replace(/[\d\s]/g, '')),
    }
}

function getThumbnail(tour) {
    const thumbnail =
        getNodeData('.swiper-slide.swiper-slide-active > img', document.documentElement, 'src') ||
        getNodeData('[class*="SearchTour_img_"] > img', tour, 'src') 
    
    return thumbnail;
}

function getOccupancy() {
    const occupancy =
        SEARCH_CRITERIA.occupancy ||
        {
            adultsCount: 1,
            childrenCount: 0,
            childAges: 0
        }
    
    return occupancy;
}

function getOccupancyFromInput() {
    const input = $1('[class*="FormFilter_cont_"] [class*="Input_wrapper_"]:nth-child(2) [class*="Input_input_"]');

    if(!input) return null;

    input.click();

    const numbers = $$('[class*="Input_counter-option_"] [class*="Counter_wrapper_"] [class*="Counter_num_"]').map(i => getText(i));

    if(numbers.length < 2) return null;

    input.click();

    return {
        adultsCount: Number(numbers[0]),
        childrenCount: Number(numbers[1]),
        childAges: numbers.slice(2).join(',') || null
    }
}

function getRoomTypeByTC(tc) {
    const idx = getElementIndex(tc);
    const theadTitles = $$('[class*="Cabins_table_"] > [class*="Cabins_thead_"] > [class*="Cabins_tr_"] > [class*="Cabins_tc_"] > [class*="Cabins_title_"]');
    return theadTitles.map(title => getText(title))[idx];
}

function getFoodFromList(ul) {
    const food = /питание|завтрак|обед|ужин|пансион|вкючено/;
    return $$({sel: 'li', searchString: food}, ul).map(i => getText(i))?.[0];
}

async function getFoodFromPopup(tour) {
    const openBtn = $1('[class*="SearchTour_icons_"] > [class*="SearchTour_icon_"]:nth-child(2)', tour);
    const selector = '[class*="CruiseIncludedInfo_ul_"]';
    const f = function(sel) {return getFoodFromList($1(sel))};

    return await getDataFromPopup(openBtn, selector, f);
}

async function getRegionFromPopup(tour) {
    const openBtn = $1('[class*="SearchTour_icons_"] > [class*="SearchTour_icon_"]:nth-child(1)', tour);
    const selector = '[class*="RouteInfo_table_"]';
    const f = function(sel) {return getRegionFromTable($1(sel))};

    return await getDataFromPopup(openBtn, selector, f);
}

function getRegionFromTable(table) {
    const route = [];

    const rows = table.tBodies[0].rows;
    
    for (let row of rows) {
        const country = getText(row.cells[1]) || '';
        const port = getText(row.cells[2]) || '';

        route.push(`${port} (${country})`);
    }

    return route.join(' - ');
}

async function getDataFromPopup(openBtn, selector, f) {
    if(!openBtn) return null;

    await setPopupState(false);
    
    openBtn.click();

    $1('body').style.setProperty('overflow-y', 'auto', 'important');
    $1('body').classList.remove('is-open-popup');

    const sel = await waitForElem(selector, 100);

    if(!sel) {
        await setPopupState(true);
        return null;
    }

    const res = f(sel);

    await setPopupState(true);
    await closeDoubleOpenPopup();
    
    return res;
}

async function setPopupState(flag) {
    const container = $1('[class*="PopupContainer_container_"]');
    const properties = ['display', '-webkit-transition', '-moz-transition', '-o-transition', 'transition'];

    if(flag) {
        $1('[class*="Popup_close_"]').click();
        await waitForElem('[class*="Popup_popup_"]', 100, 'disappear');
    }

    for(let property of properties) {
        if(flag) container.style.removeProperty(property);
        else container.style.setProperty(property, 'none', 'important');
    }
}

async function closeDoubleOpenPopup() {
    clearClassList($1('[class*="PopupContainer_container_"]'), 'PopupContainer_container_');

    await waitForElem('[class*="PopupContainer_open_"]', 100);

    clearClassList($1('[class*="PopupContainer_container_"]'), 'PopupContainer_container_');
}

function waitForElem(selector, timeout = 2500, mode = 'appear') {
    return new Promise(resolve => {
        if (document.querySelector(selector) && mode === 'appear') {
            return resolve(selector);
        }
        else if (!document.querySelector(selector) && mode === 'disappear') {
            return resolve(true);
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector) && mode === 'appear') {
                observer.disconnect();
                resolve(selector);
            }
            else if (!document.querySelector(selector) && mode === 'disappear') {
                observer.disconnect();
                resolve(true);
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

function getElementIndex(element) {
    if (!element || !element.parentNode) return -1;
    const siblings = Array.from(element.parentNode.children);
    return siblings.indexOf(element);
}

function clearClassList(element, uniquePart) {
    Array.from(element.classList).forEach(cls => {
        if (!cls.match(uniquePart)) {
            element.classList.remove(cls);
        }
    });
}