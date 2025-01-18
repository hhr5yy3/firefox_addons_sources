var OPERATOR_NAME = "Роза Хутор";

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null;
}

function injectData() {
    var buyBtn = document.querySelector('[id*="buyFormParentBloc"] [id*="sendButton"]');
    if ( buyBtn && !buyBtn.querySelector(".qq") ) {
        buyBtn.append(qqBtns());
    }
}

function createOption(img) {
    var tour = getHotelRowByImage(img);
    var option = {
        checkinDt :getDate(tour),
        nights : getNights(tour).toString(),
        hotelName : getHotelName(tour),
        href : null,
        roomType: getRoomType(tour),
        region : "Роза Хутор",
        boardType : getBoardType(),
        price : extractIntFromStr(tour.querySelector('[id*="totalSumm"]').textContent.replace(/\s+/g,"")),
        currency : "RUB",
        country:  "Россия",
        city_from: "",
        operator: OPERATOR_NAME,
        excursion: false,
        thumbnail: getImg(),
        occupancy : null,
        comment: getComment()
    };
    return option;
}

function getBoardType() {
	var s = containsText(".block_article .table_for_text li", /питание/i );
	return s == null ? "" : s.textContent.trim();
}

function getDate(tour) {
    return querySelectorAll(tour, "[id*='chooseDateFrom']").find( input => {
       return input.clientHeight > 0;
    }).value;
}

function getNights(tour) {
    return extractIntFromStr(selectedOption(tour.querySelector("select[name='filterDuration']")))-1;
}

function getHotelName(tour) {
   return getText(tour.querySelector('input.filterHotel:checked').parentNode);
}

function getRoomType(tour) {
    return selectedOption(tour.querySelector("select[name='filterRoom']"));
}

function getImg() {
    var image = document.querySelector(".gallery_frames img");
    return image ? image.src : null;
}

function getComment() {
    var header = document.querySelector("h1.flath");
    return header ? header.textContent : null;
}

function containsText(sel, regexp ) {
    return querySelectorAll(document, sel).find( td => {
        return td.textContent.match(regexp)
    });
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (div) {
        if ( div.id.match(/buyFormParentBlock/i) ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}