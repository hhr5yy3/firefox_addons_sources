// Система подбра туров "Megatec Мастер-WEB"

var OPERATOR_NAME = "DE VISU";
var OPERATOR_SLETAT_ID = 165;

function injectData() {
    querySelectorAll(document, "#SearchResListControl_itemsDivList .js-result-compare .b-results-item__right, #SearchResListControl_itemsDivList .js-result-compare .b-results-item-compact__col--price").forEach( div => {
        if ( !div.querySelector(".qq") ) {
            div.append(createDevisuCell());
        }
    });
}

function createDevisuCell() {
    var newDiv = document.createElement("div");
    var addBtn = createAddButton(createDevisuOption);
    var editBtn = createEditButton(createDevisuOption);
    addBtn.style.verticalAlign = "none";
    editBtn.style.verticalAlign = "none";
    newDiv.append(addBtn);
    newDiv.append(editBtn);
    newDiv.className = "qq";
    newDiv.style.textAlign = "right";
    newDiv.style.paddingBottom = "5px";
    newDiv.style.paddingTop = "5px";
    return newDiv;
}

function createDevisuOption(img) {
    var hotel = getHotelRowByImage(img);
    var option = {
        checkinDt : getDate(hotel).inDate,
        hotelName : getHotel(hotel),
        href : getUrl(hotel),
        region : hotel.querySelector("[id*='lbCity']").textContent.trim(),
        roomType: getRoomType(hotel),
        boardType :  hotel.querySelector("[id*='lbBoard']").textContent.trim(),
        price : extractIntFromStr(hotel.querySelector("[id*='hlPrice']").textContent),
        currency : mapCurrency(hotel.querySelector("[id*='LbRate']").textContent),
        nights: getNights(hotel),
        extra_nights: getExtraNights(hotel),
        country: getCountry(),
        city_from: getCity(),
        thumbnail: getThumbnail(hotel),
        occupancy: SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null
    };
    return option;
}

function getDate(hotel) {
   var dates = hotel.querySelector("[id*='TurDate']").textContent.match(/(\d{2})\.(\d{2})-(\d{2})\.(\d{2})/);
   var inDate = appendYear(+dates[1], +dates[2]);
   var outDate = appendYear(+dates[3], +dates[4]);
   return {
       inDate: inDate,
       outDate: outDate
   }
}

function getHotel(hotel) {
    var hotelName = hotel.querySelector("[id*='hlHotel']").textContent.trim();
    var stars = hotel.querySelector("[id*='lbHotelCategory']");
    return stars ? hotelName + " " + stars.textContent.trim() : hotelName;
}

function getUrl(hotel) {
    var anchor = hotel.querySelector("a[id*='hlHotel']");
    return anchor ? anchor.href : null;
}

function getRoomType(hotel) {
    var acc =  hotel.querySelector("[id*='lbAccomodation']");
    var room = hotel.querySelector("[id*='lbRoom']:not([id*='lbRoomCategory'])");
    var category = hotel.querySelector("[id*='lbRoomCategory']");
    return [acc, room, category].filter( opt => {  return opt }).map( opt => { return opt.textContent }).join(", ")
}

function getNights(hotel) {
   var nights =  hotel.querySelector("[id*='lbNights']");
   if ( !nights ) {
       var dates = getDate(hotel);
       var distance = getDistance(dayMonthYearToDate(dates.inDate), dayMonthYearToDate(dates.outDate));
       return distance.toString();
   }
   return nights.textContent;
}

function getExtraNights(hotel) {
    var dates = getDate(hotel);
    var distance = getDistance(dayMonthYearToDate(dates.inDate), dayMonthYearToDate(dates.outDate));
    var nights = getNights(hotel);
    return (distance - nights).toString();
}

function getThumbnail(hotel) {
    var image = hotel.querySelector("[class*='image_holder'] img");
    return image ? image.src : null;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (div) {
        if ( div.parentNode.querySelector(".js-result-compare") ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}