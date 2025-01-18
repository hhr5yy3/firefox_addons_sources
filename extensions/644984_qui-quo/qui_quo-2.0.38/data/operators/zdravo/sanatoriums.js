var OPERATOR_NAME = "Zdravo";
var showTopHotelsRating = false;
function initializeSearchCriteria() {
    var date = getParameterByName("date_start");
    if ( !date ) {
        var form = document.querySelector("#sanatoriiSearch");
        var searchBtnSingle = form ? querySelectorAll(form,"span").find(span => span.textContent.match(/ПОИСК/i) ) : null;
        searchBtnSingle ? searchBtnSingle.click() : null;
    }
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    querySelectorAll(document, "#sanatoriiResult .sanatorii .sanatoriiCostView").forEach(div => {
        let sanatorii = div.closest(".sanatoriiCostView");
        if ( !sanatorii || !sanatorii.querySelector(".sanatoriiCostValue") ) {
            return;
        }
        if ( !div.querySelector(".qq") ) {
            div.append(createCellList());
        }
    });
    querySelectorAll(document, ".tariffTotal .sendBronRoomBtn").forEach(div => {
        if ( !div.parentNode.querySelector(".qq") ) {
            div.after(createCellSingle());
        }
    });
}

function createCellSingle() {
    var btns = qqBtns({}, createSingleOption);
    btns.style.width = "100%";
    btns.style.justifyContent = "flex-end";
    return btns;
}

function createCellList() {
    var btns = qqBtns({align: "qq-vertical"}, createListOption);
    btns.style.position = "absolute";
    btns.style.bottom = "0";
    btns.style.left = "-1.75em";
    return btns;
}

//-----------------------------------------------single sanatorium----------------------------------------------------//

function createSingleOption(img) {
    var tour = getHotelRowByImage(img);
    var checkinDt = getParameterByName("date_start");
    var hotelNameNode = document.querySelector("#sanatoriiName");
    var option = {
        checkinDt: checkinDt,
        nights: getNightsSingle(checkinDt).toString(),
        hotelName: getText(hotelNameNode.querySelector("[itemprop='name']")),
        hotel_desc: getNodeProperty(document.querySelector("#sanatoriiAbout")),
        href: window.location.href,
        country: "",
        region: getText(hotelNameNode.querySelector("[itemprop='address']")),
        roomType: getRoomTypeSingle(tour),
        boardType: deleteArrayDuplicates(querySelectorAll(tour, ".roomSitingTariffCheckName").map( div => getText(div.firstChild))).join("/"),
        price: +getText(tour.querySelector(".tariffTotal [itemprop='priceRange']")).replace(/\D/g, ""),
        currency: "RUB",
        city_from: "",
        comment: getComment(tour),
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(document.querySelector("#sanatoriiGalery img"), null, "src"),
        occupancy: getOccupancy(),
        excursion: false
    };
    return option;
}

function getNightsSingle(checkinDt) {
    var checkoutDt = getParameterByName("date_end");
    return getDistance(dayMonthYearToDate(checkinDt), dayMonthYearToDate(checkoutDt));
}

function getRoomTypeSingle(tour) {
    var room =  getText(tour.querySelector(".sanRoomListInfoName").firstChild)
    var beds = querySelectorAll(tour, ".roomSiting").map( div => getText(div.firstChild) ).join("/");
    return beds.length > 0 ? `${room}(${beds})` : room;
}

function getComment(tour) {
    var rooms = querySelectorAll(tour, ".roomSiting");
    return  deleteArrayDuplicates(rooms.map( room => room.dataset.tariff ))
        .reduce( (prev, tariff) => {
            var popup = document.querySelector(`#tariff${tariff}`);
            if ( popup ) {
                popup.style.display = "block";
            }
            var text = getNodeProperty(document.querySelector(`#tariff${tariff}`), null, "innerText");
            popup.style.display = "none";
            text ? prev.push(text.replace(/×\s+|×/, "")) : null;
            return prev;
        }, []).join("\n");


}

function getOccupancy() {
    var occupancy = {
        adultsCount: +getParameterByName("adult"),
        childrenCount: +getParameterByName("child"),
        childAges: null
    };

    if ( occupancy.childrenCount > 0 ) {
        let ages = [];
        let decodedUrl =  decodeURIComponent(window.location.href);
        for ( let i = 0; i < 6; i++ ) {
            ages.push( getUrlSearchParameters(`childage[${i}]`, decodedUrl) ||
                       getParameterByName(`childage\\[${i}\\]`, decodedUrl));
        }
        occupancy.childAges = ages.filter(age => age).splice(0,occupancy.childrenCount).join();
    }
    return occupancy;
}

//---------------------------------------------list of sanatoriums----------------------------------------------------//
function createListOption(img) {
    var tour = getHotelRowByImage(img);
    var checkinDt = getParameterByName("date_start");
    var hotelNameNode = tour.querySelector(".sanatoriiContentName");
    var option = {
        checkinDt: checkinDt,
        nights: getNightsSingle(checkinDt).toString(),
        hotelName: getText(hotelNameNode),
        hotel_desc: "",
        href: getNodeProperty(hotelNameNode.querySelector("a"), null, "href"),
        country: "",
        region: getText(tour.querySelector(".sanatoriiContentAdres")),
        roomType: querySelectorAll(tour, ".sanatoriiFilterImage").map( div => getText(div) ).join(", "),
        boardType: "",
        price: +getText(tour.querySelector(".sanatoriiCostValue")).replace(/\D/g, ""),
        currency: "RUB",
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: getNodeProperty(tour.querySelector(".afterLoading img"), null, "src"),
        occupancy: getOccupancy(),
        excursion: false,
    };
    return option;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (div) {
        if ( div.classList.contains("sanRoomList") || div.classList.contains("sanatorii") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}