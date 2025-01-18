var OPERATOR_NAME = "sletat.ru";
var showTopHotelsRating = false;
function getSearchResultsDoc() {
	return getDoc(".search-result__hotel-short-description_ungroup, .tours-list__item");
}

function getButtonDoc() {
	return getDoc("form.module-form a.button");
}

function initializeSearchCriteria() {
	var doc = getSearchResultsDoc();
	if ( !doc ) {
		return null;
	}
    var city = getCity(doc);
    if ( !city ) {
    	return null;
    }
    var occupancy = getOccupancy();
    if ( !occupancy ) {
    	return null;
    }
    return { "city": city,
             "occupancy": occupancy};
}

function getDoc(selector = ".search-result__hotel-short-description_ungroup, .tours-list__item") {
    var frame = querySelectorAll(document, "iframe").find(function (sel) {
        try {
            if ( sel.contentDocument.querySelector(selector) ) {
                return true;
            }
        } catch (e) {
            return false;
        }
    });
    return frame ? frame.contentDocument : document;
}

function getSearchButton() {
	var doc = getSearchResultsDoc();
	var btns = [];
    var btn_accept = doc.querySelector("#additional-filter .additional-filter__control .btn");
    var btn_search = doc.querySelector("form.module-form_result-page a.button");
    var btn_SearchFrame =  getButtonDoc().querySelector("form.module-form a.button");
    btns.push(btn_accept);
    btns.push(btn_search);
    btns.push(btn_SearchFrame);
	return btns;
}

function injectData() {
	var doc = getSearchResultsDoc();
	injectDataNewView(doc, createOptionUngroup, ".search-result__hotel-short-description_ungroup");
	injectDataNewView(doc, createOptionByHotel, ".tours-list__item");
}

function injectDataNewView(doc,action, sel) {
	var items = querySelectorAll(doc, sel);
    if ( items.length > 0 ) {
        injectStyleSheet(getSearchResultsDoc());
    }
    items.forEach(function(item) {
			if ( item.querySelector(".qq") ) {
				checkAndRestoreEvents(item, action, {asyncInfo: loadAsyncInfo});
			} else {
                var price = item.querySelector(".hotel-price");
                if ( price ) {
                    price.appendChild(qqBtns({asyncInfo: loadAsyncInfo}, action));
                }
			}			
		});
}


function createOptionUngroup(img) {
	var line = getHotelRowByImage(img);
	var hotel = line;
	var selectors = {
		    checkinDt : ".search-result__fly-info-date_ungroup",
	        nights : ".search-result__fly-info-interval_ungroup", 
	        hotelName : ".search-result__title",
	        roomType: ".tours-list-description__item_room",
	        region : ".search-result__location",
	        boardType : ".tours-list-description__item_meals",
	        price : ".hotel-price__price-per-tour",	
	        thumbnail: ".search-result__tour-image_ungroup span"

	};
	return createOption(line, hotel, selectors);
}

function createOptionByHotel(img) {
	var line = getHotelRowByImage(img);
	var hotel = getHotelRowByLine(line).querySelector(".search-result__hotel-short-description");		
	var selectors = {
		    checkinDt : ".tours-list-description__title",
	        nights : ".tours-list-description__item_fly dl dd", 
	        hotelName : ".search-result__title",
	        roomType: ".tours-list-description__item_room dl",
	        region : ".search-result__location",
	        boardType : ".tours-list-description__item_meals dl",	
	        thumbnail: ".search-result__tour-image span",

	};
	return createOption(line, hotel, selectors);
}



function createOption(line, hotel, selectors) {
	var priceSelectors = {
			perTour: ".hotel-price__price-per-tour",
			noDiscount: ".hotel-price__number_no-discount"
	};
	var option = {
		    checkinDt :getDate(line, selectors.checkinDt),
	        nights : getNights(line, selectors.nights), 
	        hotelName : getHotelName(hotel, selectors.hotelName),
	        href : line.getAttribute("book-tour-url"),
	        roomType: getRoomType(line, selectors.roomType),
	        region : getRegion(hotel, selectors.region),
	        boardType : getBoardType(line, selectors.boardType),
	        price : extractIntFromStr(getPriceAndCurrency(line, priceSelectors).textContent.replace(/\s+/g,"")),
	        currency : mapCurrency(getPriceAndCurrency(line, priceSelectors)),
	        country:  getCountry(hotel, selectors.region),
	        city_from: SEARCH_CRITERIA.city, 
	        operator: OPERATOR_NAME,	
	        excursion: false,
	        thumbnail: getImg(hotel, selectors.thumbnail),
	        occupancy : SEARCH_CRITERIA.occupancy,
	        book_tour_url : line.getAttribute("book-tour-url")
	};
	return option;	
}

function getDate(line, sel) {
	var date = line.querySelector(sel).textContent.match(/(\d+)\s(\S+)/);
	var month = monthNameToNumber(date[2]);	
	return  appendYear(date[1], month);

}

function getNights(line, sel) {
	var nights = line.querySelector(sel).textContent;
	return nights.match(/\d+/)[0].toString();
}

function getHotelName(hotel, sel) {
    var stars = hotel.querySelector(".search-result__hotel-raiting") || "";
    if ( stars ) {
        stars = (stars.className.match(/star-(\d)/) || "")[1];
        stars = stars ? " " + stars + "*" : "";
    }
    return hotel.querySelector(sel).textContent + stars;
}

function getRoomType(line, sel) {
   return line.querySelector(sel).title;
}

function getRegion(hotel, sel) {
   return hotel.querySelector(sel).textContent.split(",")[0];

}

function getBoardType(line, sel) {
   return line.querySelector(sel).title;
}

function getPriceAndCurrency(line, priceSelectors) {  
   var priceAndCurrency = line.querySelector(priceSelectors.perTour);
	 if ( !priceAndCurrency )
	     priceAndCurrency = line.querySelector(priceSelectors.noDiscount);  
   return  priceAndCurrency;
}

function mapCurrency(priceAndCurrency) {
	var currency = priceAndCurrency.textContent.replace(/[\d\s\,\.]/g,"").trim();
	switch (currency) {
	case "₸": return "KZT";
	case "€": return "EUR";
	case "$": return "USD";
	case "Р": return "RUB";
	}
	return currency;
}

function getCountry(hotel, sel) {
	return hotel.querySelector(sel).textContent.split(",")[1];   
}

function getCity(doc) {
   var city = doc.querySelector(".field-from__city.js-value-container");
   city = city ? city : getButtonDoc().querySelector(".field-from__city.js-value-container");
   return city ? city.textContent : null;
}

function getImg(hotel, sel) {
   var span = hotel.querySelector(sel);
   var url = span ? span.style.backgroundImage : null;
   var match = url ? url.match(/(hotels.sletat.ru\S+)"/) : null;
   if ( !match && url) {
	   match =   url.match(/(static.sletat.ru\S+)"/);
   }
   return match ? "http://" + match[1] : null;
}

function getOccupancy() {
    var occupancy = {
            adultsCount: 0,
            childrenCount: 0,
            childAges: null 
        };
   var menu = getSearchResultsDoc().querySelector("#additional-filter-list");
   menu = menu ? menu : getButtonDoc();
   occupancy.adultsCount = menu.querySelectorAll(".human-list__item.human-list__item_grown-man.human-list__item_selected").length;
   occupancy.childrenCount =  menu.querySelectorAll(".human-list__item.human-list__item_child.human-list__item_selected").length;
	if ( occupancy.adultsCount === 0 ) {
		return null;
	}
	if ( occupancy.childrenCount > 0 ) {
		var ageInputs = menu.querySelectorAll(".human-list__year");
		var ages = [];
		for (var i = 0; i < ageInputs.length; i++) {
			var age = extractOptionalInt(ageInputs[i].textContent);
			if ( age === null ) {
				continue;
			}
			ages.push(age);
		}
		if ( ages.length ===  occupancy.childrenCount) {
			occupancy.childAges = ages.join(",");
		}
	}
	return occupancy;
}



function getHotelRowByImage(img) {
	var div = img.parentNode;
	while (div) {
		if ( div.classList.contains("tours-list-description_group") || div.classList.contains("search-result__item") ) {
		    break;
		}
		div = div.parentNode;
	}
	return div;
}

function getHotelRowByLine(line) {
	var div = line.parentNode;
	while (true) {
		if ( div.classList.contains("search-result__item_all-tours-list-is-opened") ) {
		    break;
		}
		div = div.parentNode;
	}
	return div;
}

function loadAsyncInfo(img) {
    var priceSelectors = {
        perTour: ".hotel-price__price-per-tour",
        noDiscount: ".hotel-price__number_no-discount"
    };
    var oldUrl = window.location.href;
    var func = img.onclick;
    img.onclick = function(event) {
        if ( img.classList.contains("added") ) {
            img.onclick = func;
            img.onclick(event);
            return img;
        }
        var hotel = getHotelRowByImage(img);
        triggerEvent(getPriceAndCurrency(hotel, priceSelectors), 'click');

        var count = 0;
        var intervalId = setInterval(function() {
            var frame = document.querySelector("#sletat-tour-card-iframe");
            if ( window.location.href !== oldUrl ) {
                hotel.setAttribute("book-tour-url" , window.location.href);
            }

            if ((frame && frame.contentDocument.querySelector(".card__close .button-style-clear")) && ( ++count >= 40 ||  hotel.getAttribute("book-tour-url")) ) {
                img.onclick = func;
                clearInterval(intervalId);
                triggerEvent(frame.contentDocument.querySelector(".card__close .button-style-clear"), 'click');
                img.onclick(event);
                return;
            }
        }, 50);
    };
    return img;
}

function triggerEvent(target, eventName) {
    if ( !target ) {
        return;
    }
    var rect = target.getBoundingClientRect();
    var event = document.createEvent("MouseEvents");
    var wnd = typeof unsafeWindow == "undefined" ? window : unsafeWindow;
    event.initMouseEvent(eventName, true, true, wnd, 0, 0, 0, rect.left, rect.top, false, false, false, false, 0, target);
    target.dispatchEvent(event);
}