window.OPERATOR_NAME = "АКАДЕМСЕРВИС";
window.showTopHotelsRating = true;
window.SEARCH_TEXT = [];

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$("table tbody").forEach(div => {
        $$('.button.grad, .button.orange',div).forEach((bookButton, index) => {
            if ( bookButton && !bookButton.parentNode.querySelector(".qq") ) {
                bookButton.after(qqBtns({align: "qq-horizontal"}));
                if ( index === 0 ) {
                    window.SEARCH_TEXT = $$('div').filter(d=> d.classList.length === 0).reverse().find(d => getText(d).match(/:\s*найден/))
                }
            }
        });

    });
}

function createOption(img) {
    const row = img.closest('tr');
    const offerNode = findHotelNode(row, (offerNode) => $1('td.info>a[href*="hotel"], .hotelName a', offerNode)) || document;
    let hotelName = getNodeData('td.info>a[href*="hotel"], .hotelName a, .container > div', offerNode);
    const datesContainer = getNodeData('.dates_input__container');
    let [dateStart, dateEnd] =[]
    let {country, region} = {};
    if ( !datesContainer ) {
        const locationText =  getText(window.SEARCH_TEXT.parentNode.firstElementChild).split(/\s*,\s*|\s*•\s*|\s*:\s*/).filter(t => !t.match(/найден/i));
        const dateText = getText(window.SEARCH_TEXT.parentNode.lastElementChild).split(/\s*,\s*|\s*•\s*|\s*:\s*/);
        [dateStart, dateEnd] = dateText[0].match(getRegexPatterns().date);
        country = lastElement(locationText)
        region = locationText[locationText.length - 2];
        hotelName = lastElement($$('a[href*="hotel"]', offerNode).extractNodesText());

    } else {
        [dateStart, dateEnd] = datesContainer.match(getRegexPatterns().date);
        [country, region] = getLocation(hotelName);
    }

    const tds = $$('td', row)
    const priceNode = $1('[src="images/icon_warning.png"]', row).parentNode;
    const prevTable = row.closest('table').previousElementSibling;
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName,
        hotel_desc: "",
        href: getNodeData('div a[href*="hotel"], .hotelName a', offerNode, 'href'),
        country,
        region,
        roomType: getNodeData('.roomName', prevTable),
        boardType: tds.length === 2 ? getText(tds[0].lastElementChild) : getText(tds[1]),
        price: extractIntFromStr(getText(priceNode).replace(/\s+/g, '')),
        currency: "RUB",
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('img[src*="images.acase.ru"]', offerNode, 'src'),
        occupancy: getOccupancy()
    };
    return option;
}

function findHotelNode(row, callback) {
    let offerNode = row.closest('table');
    while ( offerNode ) {
        const trueTable = callback(offerNode);
        if ( trueTable ) {
            return offerNode;
        }
        offerNode = offerNode.previousElementSibling;
    }
 return null;
}


function getOccupancy() {
    try {
        let occupancy = {
            adultsCount: 0,
            childrenCount: 0,
            childAges: null
        };

        const text = getNodeData('.guests input', document, 'value') || $$('label').extractNodesText().find(lb => (lb).match(/взросл/));
        occupancy.adultsCount = extractOptionalInt(text.match(/(\d+).+взр.+/)[1]);
        occupancy.childrenCount = text.match(/(\d+).+дет.+/) || text.match(/(\d+).+реб.+/) ? extractOptionalInt((text.match(/(\d+).+дет.+/) || text.match(/(\d+).+реб.+/) || [])[1]) : 0;
        if (text.match(/без\s*дете/)) {
            occupancy.childrenCount = 0;
        }
        return occupancy;
    } catch (e) {
        return null;
    }
}

function getLocation(hotelName) {
    try {
        const location = getText($1('[id*="live-region"]').parentNode.querySelector('.react-select__single-value'))
            .split(/\s*,\s*/).filter(text => !text.match(hotelName));
        const uniq = [...new Set(location)]
        return [uniq.pop(),  uniq.join(', ')]
    } catch (e) {

        return []
    }

}

function findPrevNode(row, className) {
    if ( !row ) {
        return null;
    }
    let tr = row.previousElementSibling;
    if ( !tr ) {
        return null;
    }

    if ( tr.className.match(className) ) {
        return tr;
    }
    return findPrevNode(tr, className);
}

function getHotelRowByImage(img) {
    return img.closest('tbody');
}
