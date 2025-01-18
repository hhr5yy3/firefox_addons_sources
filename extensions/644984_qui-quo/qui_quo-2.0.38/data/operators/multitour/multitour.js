var OPERATOR_NAME = "МУЛЬТИТУР";


function initializeSearchCriteria() {
	return {
		"city": getCity() || "",
		"occupancy" : getOccupancy()
	};
}

function getSearchButton() {
	return document.querySelector(".btn.btn-primary");
}

function injectData() {
    append(".avk-turs-list-line-booking", createOption);
    appendIntoVueTable(".vue-list-panel .vue-table-body .vue-price", createVueTableOption);
    append(".avk-excurs-list-line-booking", createOptionExcursion);
    append(".avk-hotel-price-item-booking", createOptionOneTour);

    function append(sel, action) {
    	var btns = document.querySelectorAll(sel);
        for (var i = 0; i < btns.length; i++ ) {
            var btn = qqBtns({},action);
            if ( !btns[i].parentNode.querySelector(".qq") ) {
                btns[i].parentNode.appendChild(btn);
            }
        }
    }
}

function appendIntoVueTable(sel, action) {
    querySelectorAll(document, sel).forEach( elem => {
        if ( !elem.querySelector('.qq')  ) {
            elem.style.position = 'relative';
            var btn = qqBtns({}, action);
            btn.style.position = 'absolute';
            btn.style.right = '75px';
            btn.style.top = '0';
            btn.style.zIndex = '100';
           // btn.style.transform = 'scale(0.9)'; С этим бы смотрелось симпатичнее
            elem.append(btn );
        }
    })
}



function createOption(img) {
	var hotel = getHotelRowByImage(img);
	if ( hotel.classList.contains("turs-list-hotel-mini") ) {
	    return createToursListOption(hotel, img);
    }
	var selector = ".avk-turs-list-line";
	var items = querySelectorAll(hotel, selector+"-comment, .avk-turs-list-line-microcopy, .avk-turs-list-line-room-microcopy");
    var board = getNodeProperty(hotel.querySelector(".avk-turs-list-line-comment-big"), "").split(",");
	var comments = hotel.querySelectorAll(selector+"-comment");
    const regionArray = getNodeData('a.avk-turs-list-line-map', hotel, 'textContent', '').split(/\s*,\s*/).filter(text => !text.match(/ул\.|д\./));
	var option = {
		checkinDt : String(findItem(items, "дата заезда").match(getRegexPatterns().date)),
		nights : getText(items.find(item => getText(item).match(/ноч/))).replace(/\d+\s+дн/,"").replace(/\D+/g,""),
		hotelName : getHotelName(hotel, selector, null),
		href : getURL(hotel, selector),
		roomType: getListRoomType(hotel, board),
		region : regionArray.slice(1).join(', ') || comments[0].textContent,
		boardType: board[1],
		price : getPrice(hotel, selector),
		currency : getCurrency(hotel, selector),
		country: regionArray[0] || getCountry(),
		city_from: SEARCH_CRITERIA.city,
		operator: OPERATOR_NAME,
		excursion: false,
		thumbnail: getImg(hotel),
		occupancy : SEARCH_CRITERIA.occupancy
	};
    console.log(option)
	return option;
}

function getDate(hotel, sel) {
	return makeYear4Digits(hotel.querySelector(sel+"-come span").textContent);
}

function getListRoomType(hotel, board) {
    return  [getNodeProperty(hotel.querySelector(".avk-turs-list-line-room-name")), board[0]].filter( element => element).join(", ")
}

function getNights(hotel, sel) {
	return hotel.querySelector(sel+"-days span").textContent.split("/")[1].trim();
}

function getHotelName(hotel, sel, comment) {
	var hotelType = comment ?  ", " + comment.textContent : "";
    return hotel.querySelector(sel+"-title").textContent + hotelType;
}

function getURL(hotel, sel) {
	return hotel.querySelector(sel+"-title").href;
}

function getRoomType(hotel, sel) {
	var acc = hotel.querySelector(sel+"-acc");
    return hotel.querySelector(sel+"-room").textContent +  (acc ? ", " + acc.textContent : "");
}

function getPrice(hotel, sel) {
	return extractIntFromStr(hotel.querySelector(sel+"-price").textContent.replace(/\D+/g,""));
}

function getCurrency(hotel, sel) {
    var node = hotel.querySelector(sel+"-price");
	var text = node.textContent.match(/([\d\s]+)([^\s]*)/)[2];
	switch (text) {
	case "€": return "EUR";
	case "руб.": return "RUB";
	case "$": return "USD";
	default: return node.querySelector(".avk-turs-list-line-price-ruble") ? "RUB" : text;
	}
}

function getCountry() {
	return (selectedOption(document.querySelector("[name='countryId']"))||"").split(" ")[0];
}

function getCity() {
	var select = selectedOption(document.querySelector("select[name='cityfromid']")) || getNodeData('input#aviaName', document, 'value', '');
	return select === "-Без перелета-" ? "" : select;
}

function getImg(hotel) {
	var image = hotel ? hotel.querySelector(".img-responsive, img") : null;
	return image ? image.src : null;

}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var adults = document.querySelector("select[name='adult']");
    var kids =  querySelectorAll(document, "select[name*='ages']");
    if ( !adults || !adults.offsetHeight) {
    	return null;
	}
    occupancy.adultsCount = extractIntFromStr(selectedOption(adults) || "2");
    occupancy.childrenCount = kids.length;
    if ( occupancy.childrenCount > 0 ) {
        occupancy.childAges = kids.reduce( (prev, curr) => {
            var selected= selectedOption(curr);
            selected ? prev.push(selected) : null;
            return prev;
        }, []).join();
    }
    return occupancy;
}

function createToursListOption(hotel, img) {
    var tr = img.parentNode.parentNode.parentNode;
    var items = querySelectorAll(hotel, ".avk-turs-list-line-room-microcopy");
    var board = getText(hotel.querySelector(".avk-turs-list-line-comment-big")).split(",");
    var option = {
        checkinDt : String(findItem(items, "дата заезда").match(getRegexPatterns().date)),
        nights : getText(items.find(item => getText(item).match(/ноч/))).replace(/\D+/g,""),
        hotelName : getText(hotel.querySelector(".avk-turs-list-line-title")),
        href : getNodeProperty(hotel.querySelector(".avk-turs-list-line-title"), null, "href"),
        roomType: getListRoomType(tr, board),
        region : getText(hotel.querySelector("a.avk-turs-list-line-map__tour-list")),
        boardType: board[1],
        price : getPrice(tr, ".avk-turs-list-line"),
        currency : getCurrency(tr, ".avk-turs-list-line"),
        country:  getCountry(),
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        excursion: !!window.location.href.match(/selectorexcurs/),
        thumbnail: getImg(hotel),
        occupancy : SEARCH_CRITERIA.occupancy
    };
    return option;
}

function createVueTableOption(img) {
    var option = createOption(img);
    var tr = img.parentNode.parentNode.parentNode;
    option.checkinDt = getText(tr.querySelector('.vue-date')).match(/\d{2}.\d{2}.\d{4}/)[0];
    option.nights = getText(tr.querySelector('.vue-night'));
    option.roomType = [getNodeProperty(tr.querySelector('.vue-room .vue-text')),
                       getNodeProperty(tr.querySelector('.vue-accomodation .vue-text'))].filter( elem => elem).join(", ");
    option.boardType = getText(tr.querySelector('.vue-pansion .vue-text'));
    option.price = extractIntFromStr(getText(tr.querySelector('.vue-price .vue-text')).replace(/\D+/g,""));
    return option;
}

//------------------------------------------------------Excursions-----------------------------------------
function createOptionExcursion(img) {
	var hotel = getHotelRowByImage(img);
	var selector = ".avk-excurs-list-line";
	var items = querySelectorAll(hotel, selector+"-comment");
	var comments = hotel.querySelectorAll(selector+"-comment");
	var option = {
		checkinDt :getDate(hotel, selector),
		nights : getNights(hotel, selector),
		hotelName : getHotelName(hotel, selector, null)+ ", Отель: " + findItem(items, "Отель: "),
		href : getURL(hotel, selector),
		roomType: getRoomType(hotel, selector),
		region : comments[0].textContent,
		boardType : getBoardTypeExc(findItem(items, "Питание:")),
		price : getPrice(hotel, selector),
		currency : getCurrency(hotel, selector),
		country:  getCountry(),
		city_from: SEARCH_CRITERIA.city,
		operator: OPERATOR_NAME,
		excursion: true,
		thumbnail: getImg(hotel)
	};
	return option;
}

function getBoardTypeExc(board) {
	return board ? board : "Без питания";
}

function createOptionOneTour(img) {
    var hotel = getHotelRowByImage(img);
    var tr = img.closest(".row");
    var excursion = !!window.location.href.match(/excursiontour/);
    const regionArray = getNodeData("section div div, .avk-turs-list-line-map", document, 'textContent', '').split(/\s*,\s*/).filter(text => !text.match(/ул\.|д\./));
    var option = {
        checkinDt : hotel.querySelector(".avk-hotel-price-item-date span").textContent,
        nights : getOneTourNights(hotel),
        hotelName : document.querySelector("h1").textContent,
        href : window.location.href,
        roomType: excursion ? getText(tr.querySelector(".avk-hotel-price-item-pansion"))  : hotel.querySelector(".avk-hotel-price-item-room").textContent,
        region : excursion ? getOneTourRegion() : regionArray.slice(1).join(', '),
        boardType : excursion ? getText(tr.querySelector(".avk-hotel-price-item-tarif")) : getText(tr.querySelector(".avk-hotel-price-item-pansion")),
        price : getPrice(tr, ".avk-hotel-price-item"),
        currency : getCurrency(tr, ".avk-hotel-price-item"),
        country: excursion ? getOneTourCountry()  : regionArray[0],
        city_from: SEARCH_CRITERIA.city,
        operator: OPERATOR_NAME,
        excursion: excursion,
        thumbnail: getImg(document.querySelector(".avk-hotel-image-container, .avk-hotel-image-icon")),
		occupancy : SEARCH_CRITERIA ? SEARCH_CRITERIA.occupancy : null
    };
    return option;
}

function getOneTourNights(hotel) {
	var nights = hotel.querySelector(".avk-hotel-price-item-night");
	if ( nights ) {
		return extractIntFromStr(nights.textContent).toString();
	}
	return  hotel.querySelectorAll(".avk-hotel-price-item-date")[1].textContent.split("/")[2].trim();
}

function getOneTourRegion() {
   return  document.querySelector("#excurs-program").nextElementSibling.nextElementSibling.textContent.split(/\n/)[0];
}

function getOneTourCountry() {
    return  document.querySelectorAll("li[itemprop='itemListElement']")[2].textContent.replace(/Экскурсии/i,"").trim();
}

function findItem(items, title) {
	var desc = items.find(function (item){
		if ( item && item.textContent.match(title)) {
			return true;
		}
		return false;
	});
	return desc ? desc.textContent.replace(title,"").trim() : null;
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (div) {
        if( div.classList.contains("avk-turs-list-line")   ||
            div.classList.contains("avk-excurs-list-line") ||
            div.classList.contains("avk-turs-list-hotel")  ||
            div.classList.contains("avk-hotel-price-item") ||
            div.classList.contains("turs-list-hotel-mini")
        ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}
