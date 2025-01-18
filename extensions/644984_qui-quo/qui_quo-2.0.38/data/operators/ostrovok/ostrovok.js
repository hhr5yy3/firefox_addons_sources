var OPERATOR_NAME = "b2b.ostrovok.ru";
window.showTopHotelsRating = true;
window.AdaptedModule = importAdaptedModule();
//-------- Search Criteria ---------------------------
function initializeSearchCriteria() {
	return null;
}

function getSearchButton() {
	return null;
}

function injectData() {
    $$('a.button-view-primary').forEach(btn => {
        if ( btn.dataset.injected !== 'qq' ) {
            btn.dataset.injected = 'qq';
            btn.addEventListener('mousedown', () => {
                const tourCell = btn.closest('.zenroomspage-rates-table-row');
                const kebabBtn = $1('.zenroomspage-rates-table-cell-kebab', tourCell);
                if ( kebabBtn ) {
                    kebabBtn.click();
                }
                const tourInfo =  $1('.qq-btn-place').dataset.value;
                const tourHash = new URL(btn.href).pathname;
                localStorage.setItem('tourInfo_'+ tourHash, tourInfo);
            })
        }
    })

    if ( document.querySelector('.qq-btn-place') ) {
       return AdaptedModule.injectData();
    }

    querySelectorAll(document, ".zenroomspagerate").forEach(room => {
        if ( !room.querySelector(".qq") ) {
            room.appendChild(createRoomsCell(createOrderOption));
        }
    });

   querySelectorAll(document, ".hotel-metaroom-rate").forEach( div => {
       if ( !div.querySelector(".qq")) {
           div.appendChild(createOldCell(createOldOption));
           div.appendChild(createAfter());
       }
   });
    var dates =  getNodeProperty(document.querySelector(".zen-regioninfo-dates, .zenregioninfo-dates"));
    if ( !dates || dates === "Даты не выбраны" ) {
        return;
    }
    querySelectorAll(document, ".zen-hotelcard-wrapper .zen-hotelcard-nextstep").forEach(room => {
        if ( !room.querySelector(".qq") ) {
            room.appendChild(createHotelsCell(createOrderOption));
        }
    });

    querySelectorAll(document, ".qq-btn-place").forEach(btn => {
        if (!btn.querySelector(".qq")) {
            btn.append(qqBtns());
        }
    });
}

//--------------------------New module---------------------------//

function createRoomsCell() {
    let buttons = qqBtns({align: "qq-box"}, createOrderOption);
    buttons.style.marginBottom = "5px";
    buttons.style.marginLeft = "90%";
    return buttons;
}

function createHotelsCell() {
    let buttons = qqBtns({align: "qq-box"}, createOrderOption);
    buttons.style.marginLeft = "5px";
    return buttons;
}


function createOrderOption(img) {
    let hotel = getHotelRowByImage(img);
    let region = getNodeProperty(document.querySelector(".zen-regioninfo-region, .zenregioninfo-region"), "").split(",");
    let price = getPriceText(hotel);
    let option = {
			checkinDt : getDate(),
			nights : getNights(hotel),
			hotelName : getHotelName(hotel),
			href : getURL(hotel),
			roomType: getNodeProperty(hotel.querySelector(".zenroomspagerate-ust-info, .zen-hotelcard-rate-name"), "", "innerText").
                      replace(/оригинальное название: /i, ""),
			region : region[0],
			boardType : getNodeProperty(hotel.querySelector(".valueadds-item-meal .valueadds-item-title")),
			price : getPrice(price),
			currency : getCurrency(price),
			country:  region[1] || "",
			city_from: "",
			operator: OPERATOR_NAME,
			thumbnail: getNodeProperty(document.querySelector("img.zen-tablet-gallery-thumb-big-img"), null, "src")
                      ||
                       getNodeProperty(hotel.querySelector(".zenmobilegallery-photo-image img, img.zenimage-content"), null, "src"),
			occupancy : getOccupancy()
	};
	return option;
}

function getPriceText(hotel) {
   var priceNode = hotel.querySelector(".zen-hotelcard-rate-price-markup, " +
       "                                .zenroomspagerate-price-value-commission," +
       "                                .zenroomspagerate-price-gross-info," +
       "                                .zen-hotelcard-rate-price-net");  //.zenroomspagerate-price-value
   priceNode = priceNode && priceNode.firstChild ? priceNode.firstChild : hotel.querySelector(".zenroomspagerate-price-value, .zen-hotelcard-rate-price-value");
   if ( !priceNode ) {
       throw new QuiQuoError('priceNode id null', 'Отсутствует цена. Пожалуйста, авторизуйтесь на сайте.');
   }
   return getText(priceNode);
}

function getDate() {
	let dates = document.querySelector(".zen-regioninfo-dates, .zenregioninfo-dates, .zenbreadcrumbs-item-dates");
	let matcherDt = dates.textContent.split("—")[0].trim();
	let day = matcherDt.match(/\d+/)[0];
	let month = matcherDt.replace(day, "").trim();
	return appendYear(day, monthNameToNumber(month));
}

function getNights(hotel) {
    let nightsNode =  hotel.querySelector(".zen-roomspagerate-price-notice-indent, .zen-roomspagerate-price-notice, .zen-hotelcard-rate-price-notice");
    const text  = nightsNode.textContent;
    let matcher = text.match(/(\d+)\s*ноч/) || text.match(/(\d+)\s*night/);
    return matcher ? matcher[1] : "1"
}

function getHotelName(hotel) {
    let name = getNodeProperty(document.querySelector(".zen-roomspage-title-name")) ||
               getNodeProperty(hotel.querySelector(".zen-hotelcard-name"));
    let stars = querySelectorAll(document, ".zen-roomspage-title .zen-ui-stars-star").length ||
                querySelectorAll(hotel, ".zen-ui-stars-star").length;
	return  stars > 0 ? name + " " + stars +"*" : name;
}

function getURL(hotel) {
	let href = getNodeProperty(hotel.querySelector(".zen-hotelcard-name-link"), null, "href");
    href = (href || window.location.href).match(/(.+)\?/);
	return href ? href[1].replace("b2b.","") : null;
}

function getPrice(price) {
	if ( price.match(/млн/i) ) {
	    let matcher = price.match(/(\d+),(\d+)/);
	    if (matcher && matcher.length === 3 ) {
	        let millions = +matcher[1]* 1000000;
	        let hundreds = +(matcher[2].padEnd(6, "0"));
            return millions + hundreds;
        }
    } else {
        return extractIntFromStr(price.replace(/\D+/g,''));
    }
}

function getCurrency(price) {
    let text = price.replace(/млн|\?|\d+|,|\s* —.*/ig, "").trim();
    switch (text) {
        case "€":
            return "EUR";
        case "руб.":
            return "RUB";
        case "₽":
            return "RUB";
        case "$":
            return "USD";
        case "грн.":
            return "UAH";
        default:
            return text;
    }
}

function getOccupancy() {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    let adults = window.location.href.match(/guests=(\d+)/);
    if ( !adults ) {
        return;
    }
    let ages = window.location.href.match(/(guests=.+?and(.+?)&)/);
    ages = ( ages && ages.length > 2 ) ? ages[2].match(/\d+/g) : null;
    occupancy.adultsCount = extractOptionalInt(adults[1]);
    occupancy.childrenCount = ages ? ages.length : 0;
    occupancy.childAges = occupancy.childrenCount > 0 ? ages.join(",") : null;
    return occupancy;
}

function getHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.classList.contains("zenroomspagerate") || div.classList.contains("zen-hotelcard")  || div.classList.contains("qq-btn-place")) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

//--------------------------End new module---------------------------//

//--------------------------Old module------------------------------//


function createOldCell(createOldOption) {
    let newDiv = document.createElement("div");
    newDiv.appendChild(createAddButton(createOldOption));
    newDiv.appendChild(createEditButton(createOldOption));
    let newTd = document.createElement("td");
    newTd.className = "hotel-metaroom-rate-after qq";
    newTd.appendChild(newDiv);
    return newTd;
}

function createAfter() {
    let newTd = document.createElement("td");
    newTd.className = "hotel-metaroom-rate-after";
    return newTd;
}

function createOldOption(img) {
    let hotel = getOldHotelRowByImage(img);
    let info = document.querySelector(".headerregion-info");
    let option = {
        checkinDt : getOldDate(),
        nights : getOldNights(hotel),
        hotelName : getOldHotelName(),
        href : getOldURL(),
        roomType: getOldRoomType(hotel),
        region : document.querySelector(".headerregion-name").textContent,
        boardType : getOldBoardType(hotel),
        price : getOldPrice(hotel),
        currency : getOldCurrency(hotel),
        country:  "",
        city_from: "",
        operator: OPERATOR_NAME,
        thumbnail: getOldImg(),
        occupancy : getOccupancy()
    }
    return option;
}


function getOldDate() {
    let info = document.querySelector(".headerregion-info");
    let matcherDt = info.textContent.split("—")[0].trim();
    let day = matcherDt.match(/\d+/)[0];
    let month = matcherDt.replace(day, "").trim();
    return appendYear(day, monthNameToNumber(month));
}

function getOldNights(hotel) {
    return hotel.querySelector(".hotel-metaroom-rate-pricenights").textContent.match(/\d+/)[0];
}

function getOldHotelName() {
    return document.querySelector(".hotel-header-title").textContent;
}

function getOldURL() {
    let href = window.location.href.match(/(.+)\?q/);
    return href ? href[1].replace("b2b.","") : null;
}

function getOldBoardType(hotel) {
    let food = hotel.querySelector(".hotel-metaroom-rate-food");
    return food ? food.textContent : "Без питания";
}

function getOldRoomType(hotel) {
    return querySelectorAll(hotel, ".hotel-metaroom-rate-name-orig, .hotel-metaroom-rate-room-name, .hotel-metaroom-rate-nametext").filter(e => {
        return e;
    }).map(e => {
        return e.textContent.trim();
    }).join(", ");
}

function getOldPrice(hotel) {
    let price =  hotel.querySelector(".hotel-metaroom-rate-recommendedprice");
    price = price ? price.textContent : hotel.querySelector(".hotel-metaroom-rate-pricevalue").textContent;
    let currency =  hotel.querySelector(".hotel-metaroom-rate-pricecurrency").textContent.trim();
    if ( currency.match(/млн/i) ) {
        let matcher = price.match(/(\d+),(\d+)/);
        if ( matcher.length === 3 ) {
            let millions = +matcher[1]* 1000000;
            let hundreds = +(matcher[2].padEnd(6, "0"));
            return millions + hundreds;
        }
    } else {
        return extractIntFromStr(price.replace(/\D+/g,''));
    }
}

function getOldCurrency(hotel) {
    let text = hotel.querySelector(".hotel-metaroom-rate-pricecurrency").textContent.replace(/млн/i, "").trim();
    switch (text) {
        case "€": return "EUR";
        case "руб.": return "RUB";
        case "$": return "USD";
        case "грн.": return "UAH";
        default: return text;
    }
}

function getOldImg() {
    let thumb = document.querySelector(".hotel-gallery-blurimage");
    return thumb ? thumb.src : null;
}

function getOldHotelRowByImage(img) {
    let div = img.parentNode;
    while (div) {
        if ( div.tagName === "TR") {
            break;
        }
        div = div.parentNode;
    };
    return div;
}

//-----------------------------------------------quickBooking Export---------------------------------//

function injectQuickReservationData(selInsert, func) {
    $$('[class*="BookingPassenger_grid"]').forEach((form) => {
        if (!form.querySelector(selInsert)) {
            form.append(
                func({
                    style: 'margin: 6px 8px;'
                })
            );
        }
    });
}

function pasteOrderData(form, data, passport, errors) {
    const shieldText = {
        caption: 'Текст на табличке',
        value: [passport.surname, passport.name]
            .map((m) => (m && m.value ? m.value : undefined))
            .filter((s) => !!s)
            .join(' ')
    };

    const dataArr = [
        $1('[name="last_name"]', form),
        passport.surname,
        $1('[name="first_name"]', form),
        passport.name,
        $1('[name="shield_text"]', form),
        shieldText,
        $1('[name="phone"]', form),
        data.phone && data.phone.mobile ? data.phone.mobile : { caption: 'Телефон' }
    ];
    setInputValues(form, dataArr, errors, 'blur', 'focus', true);
}

function getPassengerRowBySelect(select) {
    return select.closest('[class*="BookingPassenger_grid"]');
}
