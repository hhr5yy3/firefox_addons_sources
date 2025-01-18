window.OPERATOR_NAME = "b2b.ostrovok.ru";
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$('a.button-view-primary').forEach(btn => {
        if ( btn.dataset.injected !== 'qq' ) {
            btn.dataset.injected = 'qq';
            btn.addEventListener('mousedown', () => {
                console.log('MOUSEDOWN')
                const tourCell = btn.closest('.zenroomspage-rates-table-row');
                const kebabBtn = $1('.zenroomspage-rates-table-cell-kebab', tourCell);
                if ( kebabBtn ) {
                    kebabBtn.click();
                }
                const tourInfo = $1('.qq-btn-place').dataset.value;
                const tourHash = crc32(btn.href);
                localStorage.setItem('tourInfo_' + tourHash, tourInfo);
            })
        }
    })
    $$(".prtnr-booking-check-rooms").forEach(div => {
        if ( !document.querySelector(".qq") ) {
            const container = createQQContainer(`
             padding: 8px 24px 16px;
             display: flex;
             min-width: 185px;
             width: auto;
             flex-wrap: wrap;
             align-items: center;
             height: 64px;
             justify-content: end;`);
            container.classList.add('prtnr-payment-form-line-inner');
             div.after(container);
        }
    });
}

function createOption(img) {
    const tour = getHotelRowByImage(img);
    const [dateStart, dateEnd] = $$('.prtnr-booking-check-dates-date', tour).map(dt => dateFromDayAndMonthNameLocal(getText(dt)));
    const mealNode = $1('.prtnr-booking-check-amenity-meal', tour);
    const price = getNodeData('.prtnr-booking-check-price-recommended-total-value', tour) || getNodeData('.prtnr-booking-check-price-sum-value', tour);
    const region = getNodeData('.prtnr-check-hotel-address', tour).split(/\s*,\s*/);
    let tourInfo = localStorage.getItem('tourInfo_' + location.pathname);
    tourInfo = tourInfo ? JSON.parse(tourInfo) : null;
    const prices = new Prices();
    const nettPrice = getNodeData('.prtnr-booking-check-price-sum-value', tour);
    const grossPrice = getNodeData('.prtnr-booking-check-price-recommended-total-value', tour);

    const nettPriceType = nettPrice ? mapPriceType(mapCurrencyUtil(nettPrice.replace(/\d+|\s+|,|\./g, ''))) : "unknown";
    const grossPriceType = grossPrice ? mapPriceType(mapCurrencyUtil(grossPrice.replace(/\d+|\s+|,|\./g, ''))) : "unknown";


    if ( nettPriceType !== 'unknown' ) {
        prices[`${nettPriceType}`].nett = convertToNumber(nettPrice);
        prices[`${nettPriceType}`].currency = (mapCurrencyUtil(nettPrice.replace(/\d+|\s+|,|\./g, '')));
    }

    if ( grossPriceType !== 'unknown' ) {
        prices[`${grossPriceType}`].gross = convertToNumber(grossPrice);
        prices[`${grossPriceType}`].currency = (mapCurrencyUtil(grossPrice.replace(/\d+|\s+|,|\./g, '')));
    }

    let option = {
        checkinDt: dateStart,
        dateStart,
        dateEnd,
        prices,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: getHotelName(tour),
        href: tourInfo ? tourInfo.href : location.href,
        country: tourInfo ? tourInfo.country : null,
        region: tourInfo ? tourInfo.region : lastElement(region),
        accommodation: getNodeData('.prtnr-booking-check-room-guests', tour),
        roomType: getNodeData('.prtnr-booking-check-room-name', tour),
        boardType: mealNode ? getText(mealNode.closest('li')) : null,
        price: parseInt(convertToNumber(price)),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+|,|\./g, '')),
        city_from: "",
        thumbnail: tourInfo ? tourInfo.thumbnail : null,
        occupancy: tourInfo ? tourInfo.occupancy : null,
    };
    return option;
}

function convertToNumber(str) {
    if ( str.match(/\./) ) {
        return parseFloat(str.replace(/₽|€|$/g, '').replace(',', ''))
    }
    return parseFloat(str.replace(/\s|₽|€|$/g, '').replace(',', '.'));
}

function dateFromDayAndMonthNameLocal(date) {
    const variantOne = date.split(/\s*,\s*/);
    if ( variantOne.length > 1 ) {
        return dateFromDayAndMonthName(...variantOne.reverse())
    }
    return dateFromDayAndMonthName(...date.split(/\s+/))
}

function getHotelName(tour) {
    const hotelNode = $1('.prtnr-check-hotel-info', tour);
    const caption = getNodeData('.prtnr-check-hotel-name', hotelNode);
    const stars = $$('.prtnr-check-hotel-stars .prtnr-check-hotel-star' ,hotelNode);
    return stars && stars.length > 0 ? `${caption} ${stars.length}*` : caption;
}

function getHotelRowByImage(img) {
    return img.closest('.prtnr-booking-check');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);

    const services = {
        tourOptions
    };
    return services;
}


function parsePassengers() {
    const panels = $$(".prtnr-booking-room-guest").filter(panel => panel.offsetHeight > 0);
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    const [firstName, lastName] =$$('input.prtnr-suggest-input', panel).map(i => i.value);
    return new Passenger({
        lastName,
        firstName,
    });
}

function injectQuickReservationData(selInsert, func) {
    $$( ".prtnr-booking-room-guest").forEach((form) => {
        if ( !form.querySelector(selInsert) ) {
            form.append(func({
                style: "margin-left: 24px;"
            }));
        }
    });

}


function pasteOrderData(form, data, passport, errors) {
    const lastName = $1('[data-testid^="guest_lastname"] input.prtnr-suggest-input', form);
    const firstName = $1('[data-testid^="guest_name"] input.prtnr-suggest-input', form);
    setInputValues(form, [
        firstName, passport.name,
        lastName, passport.surname
    ], errors, "blur", "focus", true)

}


function getPassengerRowBySelect(select) {
   return select.closest(".prtnr-booking-room-guest");
}

function parsePassengersCountModule(passengers, tourOptions) {
    try {
        const passengersCount = {
            adults: 0,
            children: 0,
            infants: 0,
            count: 1
        };

        const {accommodation} = tourOptions;
        console.log(accommodation)

        passengersCount.adults = Number((accommodation.match(/(\d+)\s*AD/i) || accommodation.match(/(\d+)\s*взр/i) || [0, 0])[1]);
        passengersCount.children = Number((accommodation.match(/(\d+)\s*дет/i) || accommodation.match(/(\d+)\s*реб/i) || [0, 0])[1]);
        passengersCount.infants = Number((accommodation.match(/(\d+)\s*in/i) || accommodation.match(/(\d+)\s*мл/i) || [0, 0])[1]);
        passengersCount.count = passengersCount.adults + passengersCount.children + passengersCount.infants;
        return passengersCount;
    } catch (e) {
        return null;
    }
}
