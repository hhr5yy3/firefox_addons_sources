window.OPERATOR_NAME = "FUN&SUN";
window.showTopHotelsRating = true;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    const searchInputs = $$('#departure-label').map(label => {
        return {
            label: getText(label),
            value: getNodeData('input', label.parentNode, 'value')
        }
    });
    const city_from = searchInputs.find(inp => inp.label.match(/город отправления/i));
    const country  = searchInputs.find(inp => inp.label.match(/Страна/i));
    const occupancy = getOccupancy();
    if ( !country ) {
        return null;
    }
    return {city_from: city_from ? city_from.value : "", occupancy, country: country.value};
}

function getSearchButton() {
    return $$('.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary').filter(btn => getText(btn).match(/искать/i))
}

function injectData() {
    const headRow = $1('.result.header');
    if ( headRow && !$1('.qq', headRow) ) {
        const div = document.createElement('div');
        div.classList.add('qq');
        div.textContent = 'QQ';
        headRow.append(div);
    }
    $$(".result.item").forEach(div => {
        if (!div.querySelector(".qq")) {
            const container = qqBtns({align: "qq-box"});
            const [add, edit] = $$('.qq-add-btn, .qq-edit-btn', container);
            add.style.margin = '0';
            edit.style.margin = '0';
            div.append(container);
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const price = getNodeData('.price', tour);
    let option = {
        checkinDt: getNodeData('.date', tour).match(getRegexPatterns().date)[0],
        nights: getNodeData('.nights', tour),
        hotelName: getNodeData('.hotel-name', tour),
        href: getNodeData('.hotel-name', tour, 'a'),
        country: SEARCH_CRITERIA.country,
        region: getNodeData('.hotel', tour, 'textContent', '').match(/\((.+?)\)/)[1],
        roomType: getNodeData('.room', tour),
        boardType: getNodeData('.meal', tour),
        price: extractIntFromStr(lastElement(price.match(/\d+/g))),
        currency: mapCurrencyUtil(price),
        city_from: SEARCH_CRITERIA.city_from,
        thumbnail: null,
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getOccupancy() {
    try {
        let occupancy = {
            adultsCount: 0,
            childrenCount: 0,
            childAges: null
        };

        const searchInputs = $$('#demo-simple-select-outlined-label').map(label => {
            return {
                label: getText(label),
                value: getNodeData('input', label.parentNode, 'value')
            }
        });
        occupancy.adultsCount = extractIntFromStr(searchInputs.find(inp => inp.label.match(/Взрослых/i)).value)
        occupancy.childrenCount = extractIntFromStr(searchInputs.find(inp => inp.label.match(/Детей/i)).value)
        return occupancy;
    } catch (e) {
        return null;
    }
}

function getHotelRowByImage(img) {
    return img.closest('.result');
}
