window.OPERATOR_NAME = 'Asialuxe';
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

/* Examples

https://b2b.asialuxe.uz/hotels/81703?type=hotel&begin_date=2024-06-15&end_date=2024-06-22&adult=2&child_age=&location_id=329939&product_id=2&lang=ru&currency=USD&referal_loc_type=city&transfer=gr#map
*/

function initializeSearchCriteria() {
    return {};
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$('.hotel-card .el-button--primary').forEach((btn) => {
        const div = btn.parentElement;
        if (!div.querySelector('.qq')) {
            div.append(qqBtns({ align: 'qq-horizontal' }));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const stars = $$('.hotel-wrap .el-icon.is-active').length;
    const boardElement = _getElementAfterIcon('.fa-utensils', tour);
    let option = {
        checkinDt: getText(_getElementAfterIcon('.fa-calendar-days', tour)).match(/[\d.]+/)[0],
        nights: getText(_getElementAfterIcon('.fa-moon', tour)),
        hotelName: getText($1('.hotel-wrap h2')) + (stars ? ' ' + stars + '*' : ''),
        // hotel_desc: '',
        // href: '',
        // country: '',
        region: getText(
            getElementByXpath("//*[contains(@class, 'card-title') and text()='Расположение']/following-sibling::*")
        ).match(/[^,]+/)[0],
        roomType: getText(_getElementAfterIcon('.fa-bed', tour)),
        boardType: boardElement ? getText(boardElement) : '',
        price: extractIntFromStr(getText($1('.price', tour)).replace(/\s+/g, '')),
        currency: mapCurrencyUtil(getText($1('.price', tour))),
        // city_from: '',
        operator: OPERATOR_NAME,
        thumbnail: getNodeData('.hotel-wrap .el-image img', undefined, 'src'),
        occupancy: getOccupancy()
        // excursion: ''
    };
    return option;
}

function getHotelRowByImage(img) {
    return _getParentElement(img, 7);
}

/**
 * @param {HTMLElement} element
 * @param {number} parentCount
 * @returns {HTMLElement | null}
 */
function _getParentElement(element, parentCount = 1) {
    while (parentCount > 0) {
        element = element.parentElement;
        if (!element) {
            return null;
        }
        parentCount--;
    }
    return element;
}

/**
 * @param {string} iconSelector
 * @param {HTMLElement} target
 * @returns {HTMLElement | null}
 */
function _getElementAfterIcon(iconSelector, target = document) {
    const icon = $1(iconSelector, target);
    return icon ? icon.nextSibling : null;
}

function getOccupancy() {
    const searchParams = new URL(window.location).searchParams;
    const childAges = searchParams.get('child_age');
    return {
        adultsCount: +searchParams.get('adult'),
        childrenCount: childAges.split(',').length,
        childAges: childAges || null
    };
}
