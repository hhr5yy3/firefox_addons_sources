window.OPERATOR_NAME = 'Asialuxe';
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

/* Examples

https://b2b.asialuxe.uz/hotel?location_id=329939&begin_date=2024-06-15&end_date=2024-06-22&loc_type=city&search=%D0%91%D0%BE%D0%B4%D1%80%D1%83%D0%BC&transfer=gr&adult=2&child_age=&category=5&night_min=50.72&night_max=4346.55&price_range_min=441&price_range_max=30707&sort=price_asc&page=1
*/

function initializeSearchCriteria() {
    return {};
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$('.hotel-wrap .el-button.el-button--primary').forEach((btn) => {
        const div = btn.parentElement;
        if (!div.querySelector('.qq')) {
            div.append(qqBtns({ align: 'qq-horizontal' }));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const stars = $$('.hotel-wrap .el-icon.is-active', tour).length;
    const boardElement = _getElementAfterIcon('.fa-utensils', tour);
    const priceElement = img.parentElement.parentElement.querySelector('b');
    const priceText = priceElement ? getText(priceElement).replace(/\s+/g, '') : '';
    let option = {
        checkinDt: _getCheckin(tour),
        nights: getText(_getElementAfterIcon('.fa-moon', tour)),
        hotelName: getText($1('.hotel-name', tour)) + (stars ? ' ' + stars + '*' : ''),
        // hotel_desc: '',
        // href: '',
        // country: '',
        region: getText(_getElementAfterIcon('.fa-location-dot', tour)).match(/[^,]+/)[0],
        roomType: getText(_getElementAfterIcon('.fa-bed-front', tour)),
        boardType: boardElement ? getText(boardElement) : '',
        price: priceText ? extractIntFromStr(priceText) : '',
        currency: priceText ? mapCurrencyUtil(priceText) : '',
        // city_from: '',
        operator: OPERATOR_NAME,
        thumbnail: getNodeData('.img-wrapper img', tour, 'src'),
        occupancy: getOccupancy()
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('.hotel-wrap').parentElement;
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

/**
 * @param {HTMLElement} tour
 * @returns {string}
 */
function _getCheckin(tour) {
    const path = $1(
        'path[d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64m0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64m192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64m0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64m192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64m0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64"]',
        tour
    );
    if (!path) return '';
    const icon = path.closest('.el-icon');
    if (!icon) return '';
    console.log((icon))
    return getNodeProperty(icon.nextElementSibling, 'value').match(/[\d.]+/)[0] || '';
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
