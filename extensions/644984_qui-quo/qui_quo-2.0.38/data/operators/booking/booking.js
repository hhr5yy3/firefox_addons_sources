var OPERATOR_NAME = "Booking.com";
var showTopHotelsRating = false;

function initializeSearchCriteria() {
    var checkinDt = getDate( document.querySelector('[data-mode="checkin"] .sb-date-field__display'));
    var country = document.querySelector("#ss");
    var nights = getSearchNights();
    var occupancy = getOccupancy();
    if ( !nights || !checkinDt || !country ) {
        return null;
    }
    return {
        checkinDt: checkinDt,
        nights: nights,
        country: country.value,
        occupancy: occupancy
    };
}

function getSearchButton() {
    return document.querySelector(".sb-searchbox__button");
}

function injectData() {
     if ( !SEARCH_CRITERIA ) {
         return null;
     }
    querySelectorAll(document, ".sr_item:not(.sr_separator):not(.sr_item_car_rental)").forEach(function (div) {
        var photo = div.querySelector(".sr_item_photo");
        var qq = div.querySelector(".qq");
        if ( !qq && !div.querySelector(".sold_out_property") && !div.querySelector(".sold_out_msg") && photo ) {
            qq = photo.appendChild(qqBtns());
        }
        
        if ( qq && div.querySelector(".sold_out_property") ) {
            qq.remove();
        }
        if ( qq ) {
            var hotel = getHotelRowByImage(qq);
            if ( !hotel || (qq && !hotel.querySelector(".room_link")) ) {
                qq.remove();
            }
        }
    });
    querySelectorAll(document, "td.roomPrice.figure, td.hprt-table-cell-price").forEach(function (div) {
        if ( !div.querySelector(".qq") ) {
            div.appendChild(qqBtns({}, createTableOption));
        }
    });
}

function createOption(img) {
    var hotel = getHotelRowByImage(img);
    var option = {
        checkinDt: SEARCH_CRITERIA.checkinDt,
        nights: getNights(hotel),
        hotelName: getHotelName(hotel),
        href: getURL(hotel),
        roomType: getRoomType(hotel),
        region: getRegion(hotel),
        boardType: getBoardType(hotel),
        price: getPrice(hotel),
        currency: getCurrency(hotel),
        country: getCountry(),
        city_from: "",
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getImg(hotel),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function createTableOption(img) {
    var cell = img.parentNode.parentNode.parentNode;
    var cellAttr = cell.getAttribute("data-block-id") ? cell.getAttribute("data-block-id").split("_")[0] : null;
    var id = cell.id ? cell.id.split("_")[0] : cellAttr;
    var room = id ? getRoomClassByCellId(id) : null;
    if ( !room ) {
        room = searchRoomCell(cell);
    }
    var option = {
        checkinDt: SEARCH_CRITERIA.checkinDt,
        nights: getTableNights(),
        hotelName: getTableHotelName(),
        href: window.location.href,
        roomType: getTableRoomType(room),
        region: getRegion(cell),
        boardType: getTableBoardType(cell),
        price: getPrice(cell),
        currency: getCurrency(cell),
        country: getCountry(),
        city_from: "",
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getTableImg(),
        occupancy: SEARCH_CRITERIA.occupancy
    };
    return option;
}

function getTableNights() {
  const datesElems =  querySelectorAll(document, ".av-summary-length-of-stay, .multiple_nights, th.hprt-table-header-price, .av-summary-content")
                     .map(elem => getText(elem));
  const nights = datesElems.find( elem => elem.match(/(\d+)\s*(ноч|ніч|Nächt|-night)/i));
  if ( nights ) {
      return nights.match(/(\d+)\s*(ноч|ніч|Nächt|-night)/i)[1];
  }
  return SEARCH_CRITERIA.nights;
}

function getDate(sel) {
    if ( !sel ) {
        return null;
    }
    var date = sel.textContent.trim();
    return parseDt(date);
}

function getNights(hotel) {
    var nightsVar1 = hotel.querySelector(".price_for_x_nights_format");
    if ( nightsVar1 ) {
        return nightsVar1.textContent.match(/\d+/)[0];
    }
    return SEARCH_CRITERIA.nights;
}

function getSearchNights() {
    var checkinDt = toDate(getDate(document.querySelector('[data-mode="checkin"] .sb-date-field__display')));
    var checkoutDt = toDate(getDate(document.querySelector('[data-mode="checkout"] .sb-date-field__display')));

    if ( !checkinDt || !checkoutDt ) {
        return null;
    }
    return getDistance(checkinDt, checkoutDt).toString();
}

function toDate(text) {
    if ( !text || !/\d\d\.\d\d\.\d\d\d\d/.test(text)) {
        return null;
    }
    return dayMonthYearToDate(text);
}

function getHotelName(hotel) {
    var stars = hotel.querySelector(".sr-hotel__title  svg");
    var nStars;
    if ( stars ) {
        nStars = stars.className.baseVal.match(/\d/);
    }
    return hotel.querySelector(".sr-hotel__name").textContent.trim() + ( nStars ? " " + nStars[0] + "*" : "" );
}

function getTableHotelName() {
    var name = document.querySelector("#hp_hotel_name");
    var stars = document.querySelector(".hp__hotel-title svg");
    var span = getNodeProperty(name.querySelector("span"), "");
    var nStars;
    if ( stars ) {
        nStars = stars.className.baseVal.match(/\d/);
        return name.textContent.trim().replace(span,"") + " " + (nStars ? nStars + "*" : "");
    }
    return name.textContent.trim().replace(span,"");
}

function getURL(hotel) {
    var a = hotel.querySelector(".hotel_name_link.url");
    return a ? a.href : null;
}

function getRoomType(hotel) {
    return getNodeProperty(hotel.querySelector(".room_link"), '').replace(/\n+/, ", ");
}

function getTableRoomType(room) {
    var roomType = room.querySelector(".js-track-hp-rt-room-name, .wholesalers_table__bed_options__text, .wholesalers_table__roomname__text");
    roomType = roomType ? roomType.textContent.trim() : getNodeProperty(room.querySelector(".hprt-roomtype-link"));
    var bed = room.querySelector(".rt-bed-type-select input:checked");
    if ( bed ) {
        return roomType + ", " + bed.parentNode.parentNode.textContent.trim();
    } else {
        bed = querySelectorAll(room, ".room-config, .rt-bed-type").find(function (a) {
            return a;
        });
    }
    return roomType + (bed ? ", " + bed.innerText.trim() : "");
}

function getRegion(hotel) {
    var region = findGeoName("/region/");
    var city = findGeoName("/city/");
    var cityFromHotel = hotel.querySelector(".address");
    var total = [];
    if ( region ) {
        total.push(region.textContent.trim());
    }
    if ( city ) {
        total.push(city.textContent.trim());
    } else if ( cityFromHotel ) {
        total.push(cityFromHotel.textContent.split("–")[0].trim());
    }
    return total.join(", ");
}

function getBoardType(hotel) {
    var board = hotel.querySelector(".add-red-tag__amount");
    return board ? board.textContent.trim() : "";
}

function getTableBoardType(cell) {
    var board = cell.querySelector(".bicon-coffee, .bicon-platefork, .bicon-forkknife, .bicon-allinclusive");
    return board ? board.parentNode.textContent.trim() : "";
}

function getPriceAndCurrency(hotel) {
    var totalPrice = hotel.querySelector(".sr_gs_price_total, .totalPrice, .wholesalers_table__price__number");
    if ( totalPrice ) {
        var splittedText =  totalPrice.textContent.replace(/\s+|,/g, "").split(":");
        return splittedText.length > 1 ? splittedText[1] : splittedText[0];
    }
    var price = getPriceSelector(hotel);
    if ( price ) {
        return price.textContent.replace(/\s+|,/g, "");
    }
    return null;
}

function getPrice(hotel) {
    return extractIntFromStr(getPriceAndCurrency(hotel).replace(/\s+/g, "").replace(/\D+/,""));
}

function getCurrency(hotel) {
    var price = getPriceAndCurrency(hotel);
    var  text = price.match(/(руб|€|US\$)/);
    if ( !text ) {
        return price.replace(/\d+/g, "");
    }
    switch (text[1]) {
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

function getPriceSelector(hotel) {
    return querySelectorAll(hotel, "strong[data-price-without-addons], .sr_gs_price_total, .price, .hprt-price-price-standard, .hprt-price-price-actual, .bui-price-display__value, .tpi_price_label")
        .find(function (sel) {
        if ( sel &&  sel.offsetHeight > 0) {
            return true;
        }
    });
}

function getCountry() {
    var country = findGeoName("/country/");
    return country ? country.textContent : SEARCH_CRITERIA.country;
}

function getImg(hotel) {
    var image = hotel.querySelector(".hotel_image");
    return image ? image.src : null;
}

function getTableImg() {
    var image = document.querySelector(".slick-slide img");
    return image ? image.src : null;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    occupancy.adultsCount = extractOptionalInt(selectedOption(document.querySelector("#group_adults")));
    occupancy.childrenCount = extractOptionalInt(selectedOption(document.querySelector("#group_children")));
    if ( occupancy.adultsCount === null ||  occupancy.childrenCount) {
        return null;
    }

    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = querySelectorAll(document, "select[name='age']").map(function (age) {
            return selectedOption(age);
        }).join(",");
    }
    return occupancy;
}

function findGeoName(name) {
    return querySelectorAll(document, '[property="itemListElement"] a').find(function (a) {
        if ( a.href.match(name) ) {
            return true;
        }
    });
}

function getRoomClassByCellId(id) {
    var first;
    return querySelectorAll(document, ".roomType, td.-first").find(function (td) {
        first = td.parentNode.getAttribute("data-block-id");
        if ( td.className.match(id)  || ( first && first.match(id)) )
            return true;
    });
}

function parseDt(text) {
    var splitted = text.split(" ");
    if ( splitted.length < 3 ) {
        return null;
    }
    var month;
    try {
        month = monthNameToNumber(splitted[2]);
    } catch (e) {
        return null;
    }
    var year = splitted[3];
    if ( !year ) {
        return appendYear(splitted[1],  month);
    }
    return dayMonthYearToString(splitted[1],  month, splitted[3]);
}


function getHotelRowByImage(img) {
   return img.closest(".sr_item");
}

function searchRoomCell(cell) {
    var tempCell = cell;
    while ( tempCell ) {
        if ( tempCell.className.match(/maintr/i) || tempCell.classList.contains(".tpi_room_block__rt")) {
            return tempCell.querySelector("td.roomType");
        }
        tempCell = tempCell.previousElementSibling;
    }
    return cell.querySelector("td.hprt-table-cell-roomtype");
}
