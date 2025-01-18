window.OPERATOR_NAME = "Онлайн Экспресс";

function injectData() {

    $$( ".accomodations__table-body .accomodations__row.accomodations__row--hover").forEach(row => {
        if ( !row.querySelector(".qq") ) {
            row.append(createCell(createHotelOption));
        }
    });
    $$( ".accomodations__table-head .accomodations__row").forEach(headRow => {
        if ( headRow && !headRow.querySelector(".qq") ) {
            headRow.append(createHeadCell());
        }
    });

    let iframe = document.querySelector("iframe#qq-adjust-price-frame");
    iframe ? iframe.style.height = "509px" : null;

}

function createCell(action) {
    let btn = qqBtns({align: "qq-horizontal"}, action);
    btn.style.position = "absolute";
    btn.style.right = "15px";
    return btn;
}

function createHeadCell() {
    let newDiv = document.createElement("div");
    newDiv.classList.add("qq");
    newDiv.textContent = "QQ";
    newDiv.style.position = "absolute";
    newDiv.style.right = "30px";
    return newDiv;
}

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function getHotelName(row) {
    return getText(row.querySelector(".tour-block__row .tour-block__elem .ex-title__text, .hotel-name__name, .content-item__accommodation .ex-title__text")).trim() +
        (" " + querySelectorAll(row, ".icon-star-filled, .hotel-name__stars__item, .icon-star-filled").length + "*").replace(/0\*/, "");
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.classList.contains("accomodations__block")) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

//-------------Hotel SEARCH-----------------------------------------------//
function createHotelOption(img) {
    let hotel = document.querySelector(".hotel-page__header");
    let room = getHotelRowByImage(img);
    let tr = img.parentNode.parentNode;
    let option =  {
        checkinDt: getParameterByName("checkInDate"),
        nights: getHotelViewNights().toString(),
        hotelName: getHotelName(hotel),
        href: window.location.href,
        roomType: [getNodeProperty(room.querySelector(".hotel-name__name"), "","innerText").replace(/\n/, " / "),
                   getNodeProperty(tr.querySelector(".accomodations__cell--name"), "","innerText").replace(/\n/, " / ")].filter(elem=>elem).join(),
        region: getText(hotel.querySelector(".hotel-page__address span")),
        boardType: getText(tr.querySelector(".accomodations__cell--meal"), "innerText").replace(/\n/, " / "),
        price: +getNodeProperty(tr.querySelector(".accomodation__main-price"), "0").replace(/\D+/g,""),
        currency: getNodeProperty(tr.querySelector(".accomodation__currency"), ""),
        country: "",
        city_from: "",
        excursion: false,
        thumbnail: getHotelViewImage(room),
        occupancy: getHotelViewOccupancy()
    };
    return option;
}

function getHotelViewNights() {
    return getDistance(dayMonthYearToDate(getParameterByName("checkInDate")),
                       dayMonthYearToDate(getParameterByName("checkOutDate")));
}

function getHotelViewImage(room) {
    let image = getNodeProperty(room.querySelector(".accomodations__image img"), null, "src");
    if ( image && !image.match(/empty\.jpg/) ) {
        return image;
    }
    return getNodeProperty(document.querySelector(".swiper-wrapper img"), null, "src");
}

function getHotelViewOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    let icon = document.querySelector(".icon-people");
    let textPeople = getText(icon.parentNode.parentNode);
    let adulds = textPeople.match(/(\d+)\s*взр/);
    if ( !adulds ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(adulds[1]);
    let childs = textPeople.match(/(\d+)\s*реб/);
    occupancy.childrenCount = childs ? extractIntFromStr(childs[1]) : 0;
    return occupancy;
}
