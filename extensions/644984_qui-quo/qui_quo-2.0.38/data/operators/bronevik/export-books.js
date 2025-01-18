window.OPERATOR_NAME = "Bronevik";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$("#client_cabinet tr[class*='line_']").forEach(tr => {
        if ( !tr.querySelector(".qq") ) {
            const firstColumn = tr.cells[0];
            const {container, exportButton, logo, buttons} = createQuickBookingContainer();
            logo.style.zoom = '0.7';
            container.style.zoom = '0.9';
            exportButton.style.minHeight = '12px';
            exportButton.style.minWidth = '12px';
            buttons.style.display = 'none';
            firstColumn.append(container);
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const tourId = getNodeData('.claim-link', tour);
    const response = await fetch(`https://bronevik.com/ru/client/json/get-claim-view-data.json.php?serviceId=${tourId}`).then(response => response.json());
    const dateStart = new Date(response.startDateTime.date).toLocaleDateString('ru');
    const dateEnd = new Date(response.endDateTime.date).toLocaleDateString('ru');
    const {pricing} = response.wishGrossSettings;
    const prices = new Prices();
    prices.nationalGrossPrice = pricing.gross;
    prices.nationalNettPrice = pricing.net;
    prices.nationalCurrency = pricing.currency;

    const cachedPassengers = response.persons.map(person => {
        const [lastName, firstName] = person.split(' ');
        return {
            lastName,
            firstName,
        }
    });

    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: response.hotelName,
        href: response.hotelUrl,
        country: mapCountry(response.hotelUrl),
        region: response.cityName,
        accommodation: response.hotelRoomType,
        roomType: response.hotelRoomName,
        boardType: (response.meals || []).map(meal => meal.name).join(', '),
        price: pricing.gross,
        currency: pricing.currency,
        city_from: "",
        notes: response.comment,
        cachedPassengers,
        prices,
        tourOperatorReference: tourId
    };
    return option;
}

function mapCountry(href) {
    if ( href.includes('hotel/russia') ) {
        return "Россия";
    }
    if ( href.includes('hotel/belarus') ) {
        return "Беларусь";
    }
    if ( href.includes('hotel/armenia') ) {
        return "Армения";
    }
    if ( href.includes('hotel/kazakhstan') ) {
        return "Казахстан";
    }
    if ( href.includes('hotel/uzbekistan') ) {
        return "Узбекистан";
    }
    if ( href.includes('hotel/tajikistan') ) {
        return "Таджикистан";
    }
    if ( href.includes('hotel/kyrgyzstan') ) {
        return "Кыргызстан";
    }
    if ( href.includes('hotel/turkmenistan') ) {
        return "Туркменистан";
    }
    if ( href.includes('hotel/georgia') ) {
        return "Грузия";
    }
    if ( href.includes('hotel/azerbaijan') ) {
        return "Азербайджан";
    }
    if ( href.includes('hotel/abkhazia') ) {
        return "Абхазия";
    }
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const {cachedPassengers, prices, tourOperatorReference}  = tourOptions;
    const services = {
        tourOptions,
        tourOperatorReference,
        cachedPassengers, prices
    };
    return services;
}

function parsePassengers(button, cachedPassengers) {
    return  cachedPassengers
}
