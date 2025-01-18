window.OPERATOR_NAME = "Мой Агент";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const headRow = $1('.OrdersListPage__Main .AgentAviaOrdersList__Main .griddle-table-heading tr');
    if (headRow && !$1('.qq', headRow)) {
        const th = document.createElement("th");
        th.innerHTML = `<span style="color:red;">Q</span>ui-<span style="color:red;">Q</span>uo`;
        th.classList.add("qq");
        th.style.fontWeight = "bold";
        headRow.prepend(th);
    }
    $$(".OrdersListPage__Main .AgentAviaOrdersList__Main .griddle-table-body tr").forEach(div => {
        if (!div.querySelector(".qq")) {
            const td = document.createElement("td");
            td.classList.add("qq");
            const {container, buttons, exportButton, logo} = createQuickBookingContainer()
            logo.style.display = "none";
            buttons.style.display = "none";
            exportButton.style.minWidth = "auto";
            exportButton.style.minHeight = "auto";
            exportButton.textContent = "БЗ в CRM";
            exportButton.dataset.qqCaption = "БЗ в CRM";
            td.append(container);
            div.prepend(td);
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const bookNumber = $1('a.AviaOrdersColumnsTicket__Locator', tour)
    const book = await fetch(`https://myagent.online/api/avia/booking-info?billing_number=${getText(bookNumber)}&lang=ru`,
        {
            "headers": {
                "accept": "application/json",
                "authorization": `Bearer ${localStorage.getItem('auth_token').replace(/"/g, '')}`,
            }})
        .then(res => res.json());
    const bookData = book.data;
    const flight = getFlight(bookData);
    let option = {
        tourOperatorReference: getText(bookNumber),
        flight,
        bookData
    };
    return option;
}

function getFlight(bookData) {
    const segments = bookData.avia_service.tickets.flatMap(t => t.flights).map(parseSegment);
    return {sectors: splitSegmentsToSectors(segments)}
}

function parseSegment(seg) {
    const departure = seg.departure_location;
    const arrival = seg.arrival_location;
    return new FlightSegment({
     flightNumber: `${seg.operating_carrier.code}${seg.flight_number}`,
     airline: seg.operating_carrier.title,
     travelTime: "",
     plane: seg.aircraft.title,
     departureDate: getDate(seg.departure_datetime),
     departureTime: getTime(seg.departure_datetime),
     departureCity: departure.city.title,
     departureAirport: departure.airport.title,
     departureAirportID: departure.airport.code,
     arrivalDate: getDate(seg.arrival_datetime),
     arrivalTime: getTime(seg.arrival_datetime),
     arrivalCity: arrival.city.title,
     arrivalAirport: arrival.airport.title,
     arrivalAirportID: arrival.airport.code,
    });
}

function getDate(dateStr) {
     return dateStr.split(/\s+/)[0];
}

function getTime(dateStr) {
    const timeStr = dateStr.split(/\s+/)[1];
    const [hour, minute] = timeStr.split(':');
    return `${hour}:${minute}`;
}


function getHotelRowByImage(img) {
    return img.closest('tr');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const cachedPassengers = parsePassengers(tourOptions.bookData);
    const prices = new Prices();
    const priceDetails = tourOptions.bookData.price_details;
    prices.addPriceAuto(priceDetails.total_amount_for_active_agent_mode, priceDetails.total_order_price, priceDetails.currency)
    const services = {
        tourOptions,
        cachedPassengers,
        prices,
        tourOperatorReference: tourOptions.tourOperatorReference
    };
    return services;
}

function parsePassengers(bookData, cachedPassengers) {
    if ( cachedPassengers ) {
        return cachedPassengers;
    }
    const panels = bookData.passengers;
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(passenger) {
    return  new Passenger({
        birthday: passenger.birthday,
        number: passenger.document.number,
        expire: passenger.document.expiration_date,
        lastName: passenger.last_name,
        firstName: passenger.first_name,
        nationality: passenger.citizenship,
       // phone: passenger.phone,
        sex: passenger.gender_code === "M" ? '1' : "2",
       // email: passenger.email,
        docType: passenger.document.type_code === 'P'? 'internationalPassport' : 'nationalPassport',
    });
}
