window.OPERATOR_NAME = "Booking.com";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);


function injectData() {
    $$("td.roomPrice.figure, td.hprt-table-cell-price").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}));
        }
    });
}

function createOption(img) {
    const cell = img.parentNode.parentNode.parentNode;
    const [dateStart, dateEnd] = getDates();
    const cellAttr = cell.getAttribute("data-block-id") ? cell.getAttribute("data-block-id").split("_")[0] : null;
    const id = cell.id ? cell.id.split("_")[0] : cellAttr;
    let room = id ? getRoomClassByCellId(id) : null;
    if ( !room ) {
        room = searchRoomCell(cell);
    }
    const option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getTableHotelName(),
        href: window.location.href,
        roomType: getTableRoomType(room),
        region: getNodeData('[data-google-track*="city"] a'),
        boardType: getTableBoardType(cell),
        price: getPrice(cell),
        currency: getCurrency(cell),
        country: getNodeData('[data-google-track*="country"] a'),
        city_from: "",
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getBackgroundImageUrl($1('a[data-thumb-url]')),
        occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null
    };
    return option;
}



function getRoomClassByCellId(id) {
    return querySelectorAll(document, ".roomType, td.-first").find(function (td) {
        const first = td.parentNode.getAttribute("data-block-id");
        if ( td.className.match(id) || (first && first.match(id)) )
            return true;
    });
}

function getTableHotelName() {
    const name = document.querySelector("#hp_hotel_name");
    const stars = document.querySelector(".hp__hotel-title svg");
    const span = getNodeProperty(name.querySelector("span"), "");
    if ( stars ) {
        const nStars = stars.className.baseVal.match(/\d/);
        return name.textContent.trim().replace(span, "") + " " + (nStars ? nStars + "*" : "");
    }
    return name.textContent.trim().replace(span, "");
}

function getPriceAndCurrency(hotel) {
    const totalPrice = hotel.querySelector(".sr_gs_price_total, .totalPrice, .wholesalers_table__price__number");
    if ( totalPrice ) {
        const splittedText = totalPrice.textContent.replace(/\s+|,/g, "").split(":");
        return splittedText.length > 1 ? splittedText[1] : splittedText[0];
    }
    const price = getPriceSelector(hotel);
    if ( price ) {
        return price.textContent.replace(/\s+|,/g, "");
    }
    return null;
}

function getPrice(hotel) {
    return extractIntFromStr(getPriceAndCurrency(hotel).replace(/\s+/g, "").replace(/\D+/, ""));
}

function getCurrency(hotel) {
    const price = getPriceAndCurrency(hotel);
    const text = price.match(/(руб|€|US\$)/);
    if ( !text ) {
        return price.replace(/\d+/g, "");
    }
    switch ( text[1] ) {
        case "€":
            return "EUR";
        case "руб":
            return "RUB";
        case "US$":
            return "USD";
        default:
            return text[0];
    }
}

function getTableRoomType(room) {
    let roomType = room.querySelector(".js-track-hp-rt-room-name, .wholesalers_table__bed_options__text, .wholesalers_table__roomname__text");
    roomType = roomType ? roomType.textContent.trim() : getNodeProperty(room.querySelector(".hprt-roomtype-link"));
    let bed = room.querySelector(".rt-bed-type-select input:checked");
    if ( bed ) {
        return roomType + ", " + bed.parentNode.parentNode.textContent.trim();
    } else {
        bed = querySelectorAll(room, ".room-config, .rt-bed-type").find(function (a) {
            return a;
        });
    }
    return roomType + (bed ? ", " + bed.innerText.trim() : "");
}

function getTableBoardType(cell) {
    const board = cell.querySelector(".bicon-coffee, .bicon-platefork, .bicon-forkknife, .bicon-allinclusive");
    return board ? board.parentNode.textContent.trim() : "";
}

function getPriceSelector(hotel) {
    return querySelectorAll(hotel, "strong[data-price-without-addons], .sr_gs_price_total, .price, .hprt-price-price-standard, .hprt-price-price-actual, .bui-price-display__value, .tpi_price_label")
        .find(function (sel) {
            if ( sel && sel.offsetHeight > 0 ) {
                return true;
            }
        });
}

function getHotelRowByImage(img) {
    return img.closest('td.roomPrice.figure, td.hprt-table-cell-price');
}
