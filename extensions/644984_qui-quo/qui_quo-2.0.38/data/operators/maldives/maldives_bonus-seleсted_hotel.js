window.OPERATOR_NAME = "Maldives Bonus";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    $$("#total-price").forEach(div => {
        if (!div.querySelector(".qq")) {
            div.prepend(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function getCheckinDtAndNights() {
    const dataForm = $1('.well').querySelectorAll('.col-xs-6');
    return {
        checkinDt: getNodeData('.hotel-book-form-name', dataForm[0]),
        nights: getText(dataForm[1].lastElementChild).split(' ')[0],
        dataForm,
    }
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const {checkinDt, nights, dataForm} = getCheckinDtAndNights();

    let option = {
        checkinDt,
        nights,
        hotelName: getNodeData('.hotel-item-title-link'),
        hotel_desc: getText($1('.hotel-details-text')),
        href: $1('a', $1('.hotel-item-location')).href,
        country: getNodeData(':nth-child(2)', $1('.hotel-breadcrumbs')),
        region: getNodeData(':nth-child(3)', $1('.hotel-breadcrumbs')),
        roomType: getNodeData('.room-title', tour.parentNode.parentNode),
        boardType: getNodeData('.meal-wrapper', tour).match(/(.*)\((.*?)\)(.*)/)[0],
        price: parseFloat(getNodeData('#total-price')),
        currency: getNodeData('.total-price--currency', tour),
        city_from: getNodeProperty(getElementByXpath('tbody/tr[6]/td[1]/div[2]', $1('.order-table')), '').split('-')[0],
        operator: OPERATOR_NAME,
        thumbnail: $1('.img').src,
        occupancy: getOccupancy(dataForm),
    };
    return option;
}

function getOccupancy(dataForm) {
    const occupancyDataArray = $$('span', dataForm[2]);
    const adultsCount = parseInt(getText(occupancyDataArray[0]).match(/\d+/));
    if (occupancyDataArray.length > 3) {
        return {
            adultsCount,
            childrenCount: parseInt(getText(occupancyDataArray[1]).match(/детей (\d+)/)[1]),
            childAges: getText(occupancyDataArray[1]).match(/\((\d+) \+ (\d+)\)/).slice(1).join(', '),
        }
    }
    return {
        adultsCount,
        childrenCount: 0,
        childAges: null,
    }

}

function getHotelRowByImage(img) {
    return img.closest('.row');
}
