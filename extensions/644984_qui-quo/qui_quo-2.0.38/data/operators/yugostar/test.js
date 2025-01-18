window.OPERATOR_NAME = "";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".TVTourResultItem").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotelDiv = tour.closest('.TVTourResultItemDate');

    let option = {
        checkinDt: dateFromDayAndMonthName(tour.querySelector(".TVTourResultItemDate").textContent.trim()),
        nights: "",
        hotelName: tour.querySelector('.TVResultItemTitle').textContent,
        hotel_desc: "",
        href: "",
        country: "",
        region: "",
        roomType: "",
        boardType: "",
        price: "",
        currency: "",
        city_from: "",
        thumbnail: "",
        occupancy: ""
    };

    return option;
}


function getHotelRowByImage(img) {
    return img.closest('.TVTourResultItem');
}
