var OPERATOR_NAME = "Роза Хутор";

function initializeSearchCriteria() {
    return {
        occupancy: getOccupancy()
    };
}

function getSearchButton() {
    return document.querySelector("#sendFilter");
}

function injectData() {
    querySelectorAll(document, ".mainTable .price-block").forEach(span => {
        var td = span.parentNode;
        if ( !td.querySelector(".qq") ) {
            td.append(createCell());
        }
    });
}

function createCell() {
    var newDiv = document.createElement("div");
    newDiv.append(createAddButton());
    newDiv.append(createEditButton());
    newDiv.className = "qq";
    return newDiv;
}

function createOption(img) {
    var hotel = getHotelRowByImage(img);
    var mainTr = findTr(hotel, ".roomName");
    var tariffTr =  findTr(hotel, ".tariffInfo");
    var price = img.parentNode.parentNode.querySelector(".price-block").textContent.replace(/\s+/g,"");
    var option = {
        checkinDt :document.querySelector("#filterDateFrom").value,
        nights : getNights().toString(),
        hotelName : document.querySelector(".hotelTitle, h1").textContent.trim(),
        href : window.location.href,
        roomType: getRoomType(mainTr),
        region : "Роза Хутор",
        boardType : containsText(tariffTr, ".tariffInfo li", /Без питания|Завтрак|Полупансион|Полный|Все включено|All inclusive/i ).textContent.trim(),
        price : extractIntFromStr(price),
        currency : "RUB",
        country:  "Россия",
        city_from: "",
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getImg(mainTr),
        occupancy : SEARCH_CRITERIA.occupancy,
        comment: getComment(mainTr)
    };
    return option;
}

function getNights() {
    var startDate = document.querySelector("#filterDateFrom").value;
    var endDate = document.querySelector("#filterDateTo").value;
    return getDistance(dayMonthYearToDate(startDate),dayMonthYearToDate(endDate));
}

function getRoomType(hotel) {
    var image = hotel.querySelector("img.previewImg");
    if ( image && image.alt ) {
        return image.alt;
    }
    return hotel.querySelector(".roomName").textContent.trim();
}

function getImg(main) {
    var roomImage = main.querySelector("img.previewImg");
    var hotelImage = document.querySelector(".gallery_frames img")
    return roomImage ? roomImage.src : (hotelImage ? hotelImage.src : null);
}

function getComment(hotel) {
    var comment = hotel.querySelector(".services");
    return comment ? comment.textContent : null;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    occupancy.adultsCount = extractOptionalInt(selectedOption(document.querySelector("select#filterAdultCount")));
    var kids = extractOptionalInt(selectedOption(document.querySelector("select#filterChildCount")));
    kids = kids ? kids : 0;
    if ( !occupancy.adultsCount ) {
        return null;
    }
    if ( kids > 0 ) {
        occupancy.childAges = querySelectorAll(document, "select[id*='filterChildAge']").map(select => {
            return extractOptionalInt(selectedOption(select)).toString();
        }).join();
    }
    occupancy.childrenCount = kids;
    return occupancy;
}


function findTr(hotel, sel) {
    var tr = hotel;
    while (tr) {
        if ( tr.querySelector(sel) ) {
            break;
        }
        tr = tr.previousElementSibling;
    }
    return tr;
}

function containsText(node, sel, regexp ) {
    return querySelectorAll(node, sel).find( td => {
        return td.textContent.match(regexp)
    });
}

function getHotelRowByImage(img) {
    var elem = img.parentNode;
    while (elem) {
        if ( elem.className.match(/mainTable/i) ) {
            break;
        }
        elem = elem.parentNode;
    }
    return elem;
}