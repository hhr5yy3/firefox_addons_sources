var OPERATOR_NAME = window.location.hostname;
window.showTopHotelsRating = true;
window.AdaptedModule = importAdaptedModule();

function initializeSearchCriteria() {
    return AdaptedModule.initializeSearchCriteria();
}

function getSearchButton() {
    return AdaptedModule.getSearchButton();
}

function injectData() {
    return AdaptedModule.injectData();
}

function createOption(img) {
    return AdaptedModule.createOption(img);
}

function createQuickBookingOption(img) {
    return AdaptedModule.createQuickBookingOption(img);
}

function getHotelRowByImage(img) {
    return AdaptedModule.getHotelRowByImage(img);
}

function getFlight() {
}

function importAdaptedModule() {
    class AdaptedModule {
        constructor() {
            this.getHotelRowByImage = getHotelRowByImage;
        }

        initializeSearchCriteria() {
            return null;
        }

        getSearchButton() {
            return null;
        }

        injectData() {
            const buttons = $$(".qq-btn-place");
            buttons.forEach(btn => {
                if ( !btn.querySelector(".qq") ) {
                    btn.append(qqBtns({align: 'qq-box'}, this.createOption));
                }
            });
            const quickBookingButtons = $$(".qq-quick-booking-container");
            quickBookingButtons.forEach(btn => {
                if ( !btn.querySelector(".qq") ) {
                    const {container, buttons} = createQuickBookingContainer();
                    buttons.style.display = "none";
                    btn.append(container);
                }
            });
        }

        createOption(img) {
            var qqBtnPlace = getHotelRowByImage(img);
            var jsonArrayOffer = JSON.parse(trim(qqBtnPlace.dataset.value));
            var option = {
                checkinDt: checkDate(jsonArrayOffer.checkinDt),
                nights: jsonArrayOffer.nights.toString(),
                hotel_desc: checkString(jsonArrayOffer.hotel_desc),
                extra_nights: checkString(jsonArrayOffer.extra_nights),
                hotelName: jsonArrayOffer.hotelName,
                href: parseHotelHref(jsonArrayOffer.href),
                book_tour_url: checkString(jsonArrayOffer.book_tour_url),
                roomType: jsonArrayOffer.roomType,
                region: jsonArrayOffer.region,
                boardType: jsonArrayOffer.boardType,
                price: checkNumber(jsonArrayOffer.price),
                currency: mapCurrencyUtil(jsonArrayOffer.currency),
                country: jsonArrayOffer.country,
                city_from: jsonArrayOffer.city_from ? jsonArrayOffer.city_from : "",
                operator: jsonArrayOffer.operator ? jsonArrayOffer.operator : OPERATOR_NAME,
                comment: checkString(jsonArrayOffer.comment),
                excursion: jsonArrayOffer.excursion,
                thumbnail: checkString(jsonArrayOffer.thumbnail),
                occupancy: checkOccupancy(jsonArrayOffer.occupancy),
                flight: getFlight(jsonArrayOffer),
                product_type: jsonArrayOffer.product_type
            };
            return option;
        }

        createQuickBookingOption(button) {
            const container = button.closest(".qq-quick-booking-container");
            const booking = container.dataset.booking;
            const bookingData = JSON.parse(localStorage.getItem(`qq_qb_${booking}`) ||
                sessionStorage.getItem(`qq_qb_${booking}`) ||
                localStorage.getItem(`${booking}`) ||
                sessionStorage.getItem(`${booking}`));
            bookingData.isAdapted = true;
            return bookingData;
        }
    }

    function parseHotelHref(originalHref) {
        try {
            return new URL(originalHref).href
        } catch(e) {
             return originalHref ? window.location.origin + checkString(originalHref).replace(window.location.origin, '') : null;
        }
    }

    function getFlight(json) {
        return json.flight;
    }

    function checkDate(date) {
        const dateRu = date.match(/\d{2}\.\d{2}\.\d{4}/);
        if ( dateRu ) {
            return  dateRu.toString()
        }
        const [yyyy, mm, dd] = date.split('-');
        if ( !dd ) {
            const [dd, mm]  = date.split('.');
            return appendYear(dd, mm)
        }
        return `${dd}.${mm}.${yyyy}`

    }

    function checkString(value) {
        return value ? value.toString() : null;
    }

    function checkNumber(value) {
        return typeof (value) === "number" ? value : extractIntFromStr(value);
    }

    function checkOccupancy(occupancy) {
        try {
            occupancy.adultsCount = checkNumber(occupancy.adultsCount);
            occupancy.childrenCount = checkNumber(occupancy.childrenCount);
            if (occupancy.childrenCount > 0 && occupancy.childAges) {
                occupancy.childAges = occupancy.childAges.toString();
            }
            return occupancy;
        } catch (e) {
            return null;
        }
    }

    function getHotelRowByImage(img) {
        var div = img.parentNode;
        while (div ) {
            if (div && div.className && div.className.match("qq-btn-place") ) {
                break;
            }
            div = div.parentNode;
        }
        return div;
    }

    return new AdaptedModule();
}
