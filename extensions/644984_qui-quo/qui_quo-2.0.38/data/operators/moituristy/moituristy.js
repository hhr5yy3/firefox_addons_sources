window.OPERATOR_NAME = "moituristy";
window.showTopHotelsRating = true;

function initializeSearchCriteria() {
    var fields = querySelectorAll(document, ".field");
    var country = document.querySelector("select.os-tourscanner-to, [name='country'], [data-element='ts-countries-list']") || fields.find(div => getText(div).match(/куда|куди/i));
    var city = document.querySelector("select.os-tourscanner-from") || fields.find(div => getText(div).match(/откуда|зв.дки/i));

    if ( !country || !city ) {
        return null;
    }

    city = selectedOption(city) || getNodeProperty(city.querySelector("div.text, .active.selected.item"));
    country = selectedOption(country) || getNodeProperty(country.querySelector("div.text, .active.selected.item"));

    return {
        country: country,
        city: city,
        occupancy: getOccupancy() || getNewSearchOccupancy(fields)
    };
}

function getSearchButton() {
    return document.querySelector("button.os-tourscanner-button, .ui.primary.button[type='submit']");
}

function injectData() {
    if ( !SEARCH_CRITERIA ) {
        return;
    }
    querySelectorAll(document, '.os-tourscanner-item-container').forEach(hotel => {
        if ( hotel && !hotel.querySelector(".qq") ) {
            hotel.style.position = "relative";
            hotel.append(createCell(createOption));
        }
        if ( hotel && hotel.querySelector(".qq") ) {
            checkAndRestoreEvents(hotel, createOption);
        }
    });
    querySelectorAll(document, 'div.ui.six.column.grid').forEach(hotel => {
        if ( hotel && !hotel.querySelector(".qq") ) {
            hotel.style.position = "relative";
            hotel.append(createCell(createNewSearchOption));
        }
        if ( hotel && hotel.querySelector(".qq") ) {
            checkAndRestoreEvents(hotel, createNewSearchOption);
        }
    });
    querySelectorAll(document, '.os-modal-wrap .os-tourscanner-offer-info-price').forEach(hotel => {
        if ( hotel && !hotel.querySelector(".qq") ) {
            hotel.style.position = "relative";
            hotel.append( qqBtns({align: "qq-box"}, createModalOption));
        }
        if ( hotel && hotel.querySelector(".qq") ) {
            checkAndRestoreEvents(hotel, createModalOption);
        }
    });

}

function createCell(action) {
    var newDiv = qqBtns({align: "qq-box", hideFlight: false}, action);
   // querySelectorAll(newDiv, '.qq-add-btn, .qq-edit-btn').forEach(btn => btn.setAttribute('get-flight', 'true'));
    newDiv.style.cssText = `position: absolute;
    left: 495px;
    top: 0px;
    padding: initial !important;`;
    return newDiv;
}

async function createOption(img) {
    var hotel = getHotelRowByImage(img);
    var row = img.parentNode.parentNode;
    const modalPopupBtn = row.querySelector(".os-tourscanner-item-price-sum");
    const href = await getHref(hotel, img);
    var option = {
        checkinDt: getDate(row.querySelector(".os-tourscanner-item-date-from-date")),
        nights: getNodeText(row, ".os-tourscanner-item-length").match(/\d+/)[0],
        extra_nights: getExtraNights(row),
        hotelName: getNodeText(hotel, ".os-tourscanner-item-hotel-title"),
        href: href,
        hrefUpdated: !!href,
        roomType: getNodeText(row, ".os-tourscanner-item-food-room"),
        region: getNodeText(hotel, ".os-tourscanner-item-hotel-city"),
        boardType: getNodeText(row, ".os-tourscanner-item-food-type"),
        price: extractIntFromStr(getNodeText(row, ".os-tourscanner-item-price-sum").replace(/\D+/g, "")),
        currency: getCurrency(getNodeText(row, ".os-tourscanner-item-price-sum")),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        operator: getNodeText(row, ".os-tourscanner-item-price-tf", true),
        excursion: false,
        thumbnail: getThumbnail(hotel),
        occupancy: SEARCH_CRITERIA.occupancy,
        hotel_desc: getNodeProperty(hotel.querySelector('p[itemprop="description"]'))
    };

    if ( modalPopupBtn && !img.classList.contains('qq-rating-btn') ) {
        const flightBtn = row.querySelector('.qq-fly-btn input');
        if ( flightBtn && flightBtn.checked ) {
            img.setAttribute('get-flight', 'true');
        }
        modalPopupBtn.click();
        const modalPopup = row.parentNode.querySelector('.os-tourscanner-offer-info-wrap.os-modal-wrap');
        const closeBtn = modalPopup.querySelector('.os-tourscanner-offer-info-close.os-modal-close');
        option.flight = getFlight(modalPopup);
        closeBtn ? closeBtn.click() : null;
    }
    return option;
}

async function getHref(hotel, img, option) {
    try {
        if ( !img.classList.contains('qq-rating-btn') ) {
            const result = await fetchTimeout(4000, fetch(`https://${window.location.host}/tf/tourscanner/get_tours_page_template?name=tours`));
            const {data} = await result.json();
            const onsiteBaseUrl = data.onsiteBaseUrl;
            if ( !onsiteBaseUrl ) {
                return null;
            }
            const hotelId = hotel.querySelector('a[href*="www.turpravda.ua"]').href.match(/h(\d+)\./)[1];
            const offerId = hotel.querySelector('.qq-box').dataset.offetId;
            const resultUrl = onsiteBaseUrl + "#!hid=" + hotelId + "&page=tour&oid=" + offerId;
            return resultUrl;
        }
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
}

function getDate(div) {
   var date = div.textContent;
   var day = date.match(/\d+/)[0];
   var month = date.match(/\D+/)[0].trim();
   month = monthNameToNumber(month);
   return appendYear(day, month);
}

function getExtraNights(row) {
    var chDate = getDate(row.querySelector(".os-tourscanner-item-date-from-date"));
    var endDate = getDate(row.querySelector(".os-tourscanner-item-date-to-date"));
    var distance = getDistance(dayMonthYearToDate(chDate), dayMonthYearToDate(endDate));
    var nights = getNodeText(row, ".os-tourscanner-item-length").match(/\d+/)[0];
    return (distance - nights).toString();
}

function getCurrency(price) {
    var c = price.replace(/\d+/g, "").trim().toUpperCase();
    switch ( c ) {
        case "ГРН":
            return "UAH";
        case "$":
            return "USD";
        case "€":
            return "EUR";
    }
    return c;
}

function getNodeText(row, sel, IsNoRequired = false ) {
    var node = row.querySelector(sel);
    return  !IsNoRequired ? node.textContent.trim() : (node ? node.textContent.trim() : null);
}

function getThumbnail(row) {
    var image = row.querySelector(".os-tourscanner-item-hotel-image img, [class*='components-hotel-HotelPreview-styles__preview'] img");
    return image ? image.src.replace("2/30x30", "3/730x0") : null;
}

function getOccupancy() {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var adults = document.querySelector(".os-tourscanner-adult");
    var kids = querySelectorAll(document, ".os-tourscanner-child-item");
    if ( !adults || !selectedOption(adults) ) {
        return null;
    }
    occupancy.adultsCount = extractIntFromStr(selectedOption(adults).replace(/\D+/g, ""));
    occupancy.childrenCount = kids.length;
    if ( kids.length > 0 ) {
        occupancy.childAges = kids.map(kid => {
            return extractIntFromStr(kid.textContent.replace(/\D+/g, ""));
        }).join();
    }
    return occupancy;
}

async function createNewSearchOption(img) {
    var hotel = getHotelRowByImage(img);
    var row = img.parentNode.parentNode;
    var columns = querySelectorAll(row, "div.column");
    const priceNode = columns[4].querySelector("strong");
    var price = getText(priceNode);
    const flight = getFlightModern(img, priceNode);
    const href = await getHref(hotel, img);
    var option = {
        checkinDt: getDate(columns[0]),
        nights: getText(columns[2]).match(/\d+/)[0],
        extra_nights: getNewSearchExtraNights(columns),
        hotelName: getText(hotel.querySelector("[class*='components-hotel-HotelPreview-styles__hotelName']")),
        href: href,
        hrefUpdated: !!href,
        roomType: getText(columns[3].querySelector('div[title]')),
        region: getText(hotel.querySelector('[class*="components-hotel-HotelPreview-styles__hotelInfo"] div[title]')),
        boardType: getText(columns[3].querySelector('div')),
        price: extractIntFromStr(price.replace(/\D+/g, "")),
        currency: getCurrency(price),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        operator: getNodeProperty(columns[4].querySelector("div>span") || columns[4].lastElementChild),
        excursion: false,
        thumbnail: getThumbnail(hotel),
        occupancy: SEARCH_CRITERIA.occupancy,
        hotel_desc: getNodeProperty(hotel.querySelector('[class*="components-hotel-Description-styles__description"]')),
        flight
    };
    return option;
}

function getNewSearchExtraNights(columns) {
    var chDate = getDate(columns[0]);
    var endDate = getDate(columns[1]);
    var distance = getDistance(dayMonthYearToDate(chDate), dayMonthYearToDate(endDate));
    var nights = getText(columns[2]).match(/\d+/)[0];
    return (distance - nights).toString();
}

function getNewSearchOccupancy(fields) {
    var occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    var mainField = fields.find(div => getText(div).match(/Взрослые и дети/i));
    if ( !mainField ) {
        return null;
    }
    var adultsText = mainField.querySelector("div.text:not(.default)");
    if ( !adultsText ) {
        return null;
    }
    var kids = querySelectorAll(mainField, "input[type='text']").filter(field => getNodeProperty(field, "", "value").match(/реб/));

    occupancy.adultsCount = extractIntFromStr(getText(adultsText));
    occupancy.childrenCount = kids.length;
    occupancy.childAges = kids.map(age => extractIntFromStr(getNodeProperty(age, "", "value"), "0"))
        .filter(age => age > 0).join();
    return occupancy;
}

function createModalOption(img) {
    const hotel = getHotelRowByImage(img);
    const from = hotel.querySelector('.os-tourscanner-offer-info-ticket-from');
    const to = hotel.querySelector('.os-tourscanner-offer-info-ticket-to');

    const checkinDt = parseModalDate(from);
    const checkoutDt = parseModalDate(to);

    const nights =  getText(to.querySelector('.os-tourscanner-offer-info-text')).match(/(\d+)\s+н.ч/)[1];
    const fullNights = getDistance(dayMonthYearToDate(checkinDt), dayMonthYearToDate(checkoutDt));
    const price = getText(hotel.querySelector('.os-tourscanner-offer-info-price-usd'));
    const flight = getFlight(hotel);

    var option = {
        checkinDt,
        nights,
        extra_nights: (fullNights - nights).toString(),
        hotelName: getText(hotel.querySelector(".os-modal-title").firstChild),
        href: getNodeProperty(hotel.querySelector('.os-tourscanner-item-hotel-reviews a'), null, "href"),
        roomType: getText(hotel.querySelector('.os-tourscanner-offer-info-place .os-tourscanner-offer-info-text')),
        region: getText(hotel.querySelector('.os-tourscanner-offer-info-city')),
        boardType: getText(hotel.querySelector('.os-tourscanner-offer-info-place .os-tourscanner-offer-info-label')).replace(/\s*питание\s*/gi, ''),
        price: extractIntFromStr(price.replace(/\D+/g, "")),
        currency: getCurrency(price),
        country: SEARCH_CRITERIA.country,
        city_from: SEARCH_CRITERIA.city,
        operator: getText(hotel.querySelector('.os-tourscanner-offer-info-percent .os-tourscanner-offer-info-label')),
        excursion: false,
        thumbnail: getNodeProperty(hotel.querySelector('.os-tourscanner-offer-info-image img'), null, 'src'),
        occupancy: SEARCH_CRITERIA.occupancy,
        flight
    };
    return option;
}

function parseModalDate(direction, text = null) {
    const dateSplit = (text || getText(direction.querySelector('.os-tourscanner-offer-info-text'))).split(/\s+/);
    const date =  dateFromDayAndMonthName(dateSplit[0], dateSplit[1]);
    return date;
}

function getFlight(hotel) {
    try {
        const from = hotel.querySelector('.os-tourscanner-offer-info-ticket-from');
        const to = hotel.querySelector('.os-tourscanner-offer-info-ticket-to');
        const sectors = [from, to].map(parseSector);
        return {sectors}
    } catch (e) {
        return null;
    }
}

function getFlightModern(img, priceNode) {
    try {
        if ( !img.classList.contains('qq-rating-btn') ) {
            priceNode.click();
            const closeBtn = document.querySelector(".modal .close.icon");
            const sectors = $$('[class*="FlightsWithCheckbox-styles__modalRow"]')
                .map(sec => getText(sec, 'innerText').split(/\n+/))
                .map(parseModernSector) ;
            const tourCode = getNodeProperty($first('.src-components-offer-Details-styles__code'), '').replace(/\D+/g, '');
            const qqBox = img.closest('.qq-box');
            if ( tourCode && qqBox ) {
                qqBox.dataset.offetId= tourCode;
            }
            closeBtn.click();
            return {sectors};
        }
    } catch (e) {
        const closeBtn = document.querySelector(".modal .close.icon");
        closeBtn ? closeBtn.click() : null;
        return null;
    }
}

function parseSector(sector) {
    const dt = parseModalDate(sector);
    const label = getText(sector.querySelector(".os-tourscanner-offer-info-label"))
                  .match(/(\d{2}:\d{2})\s+([A-Z][A-Z0-9\-]{2,4}).+?(\d{2}:\d{2})\s+([A-Z][A-Z0-9\-]{2,4})(.*?)([A-Z0-9]{2}\s*\d+)/);
    return {segments: [new FlightSegment({
        flightNumber: label[6],
        airline: label[5].trim(),
        departureDate: sector.classList.contains('os-tourscanner-offer-info-ticket-from') ? dt : null,
        departureTime: label[1],
        departureAirportID: (label[2].match(/[A-Z]{3}/) || "")[0],
        departureTerminal: (label[2].match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1],
        arrivalDate: sector.classList.contains('os-tourscanner-offer-info-ticket-to') ? dt : null,
        arrivalTime: (label[3].match(/[A-Z]{3}/) || "")[0],
        arrivalTerminal: (label[3].match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1],
        arrivalAirportID: label[4]
    })]};
}

function parseModernSector(array) {
    const dt = parseModalDate(null, array[0]);
    const main = array[1].match(/(\d{2}:\d{2})\s+([A-Z][A-Z0-9\-]{2,4}).+?(\d{2}:\d{2})\s+([A-Z][A-Z0-9\-]{2,4}).*?-\s*(.*)/);
    const label = array[1]
        .match(/(\d{2}:\d{2})\s+([A-Z][A-Z0-9\-]{2,4}).+?(\d{2}:\d{2})\s+([A-Z][A-Z0-9\-]{2,4}).*?-\s*(.*?)([A-Z0-9]{2}\s*\d+)/) || '';
    return {
        segments: [new FlightSegment({
            flightNumber: label[6],
            airline: label ? (label[5] || '').trim() : (main[5] || "").trim(),
            departureDate: dt,
            departureTime: main[1],
            departureAirportID: (main[2].match(/[A-Z]{3}/) || "")[0],
            departureTerminal: (main[2].match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1],
            arrivalTime: (main[3].match(/[A-Z]{3}/) || "")[0],
            arrivalTerminal: (main[3].match(/[A-Z]{3}.*([\d+|[A-z])/) || "")[1],
            arrivalAirportID: main[4]
        })]
    };
}

function getHotelRowByImage(img) {
    var div = img.parentNode;
    while (div) {
        if ( (div.dataset && div.dataset.id) ||
              div.className.match("components-results-Hotel-styles__root")||
              div.className.match("os-modal-body")) {
            break;
        }
        div = div.parentNode
    }
    return div;
}
