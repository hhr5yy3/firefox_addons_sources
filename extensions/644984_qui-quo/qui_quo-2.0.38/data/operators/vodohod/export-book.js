window.OPERATOR_NAME = "ВодоходЪ";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".detail-widget__total").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const {exportButton, container, buttons}  = createQuickBookingContainer();
            buttons.style.display = "none";
            container.style.marginTop = '12px';
            exportButton.style.cssText = `      background-color: #9a243d;
                                                color: #eef3f8;
                                                margin-top: 6px;
                                                cursor: pointer;
                                                font-size: 16px;
                                                font-weight: 600;
                                                height: 40px;
                                                padding: 11px 23px;
                                                text-align: center;
                                                text-transform: uppercase;
                                                width: 224px;`
            div.append(container);
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);

    return {
        tourOperatorReference: getParameterByName('booking_id')
    };
}

function getHotelRowByImage(img) {
    return null;
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const cookieString = document.cookie.split(/\s*;\s*/).find(row => row.startsWith('user_token'));
    const userToken = cookieString ? cookieString.split('=')[1] : null;
    const details = await fetch(`https://api-crs.vodohod.com/ru/orders/${getParameterByName('booking_id')}/details`, {
        headers: {
            'authorization': `Bearer ${userToken}`
        }
    }).then(res => res.json());

    const passengers = details.rooms.flatMap(room => room.places.map(place => place.passenger));
    const dtPattern = getRegexPatterns().date;
    const prices = new Prices();
    prices.nationalGrossPrice = details.price/100;
    prices.nationalNettPrice = details.amount_paid / 100;
    prices.nationalCurrency = "RUB";
    if ( details.processed_payments && details.processed_payments.length >0 ) {
        for ( const payment of details.processed_payments ) {
            const [date, time] = payment.transaction_date.split(/\s+/);
            prices.addNationalPayment({date, time, amount: payment.amount/100 })
        }
    }

    const services = {
        cruises: [{
            name: details.cruise.name,
            ship: `Теплоход: ${details.cruise.motorship.name}, Каюты: [${getRooms(details)}]`,
            dateStart: details.cruise.date_start_str.match(dtPattern)[0],
            dateEnd: details.cruise.date_end_str.match(dtPattern)[0],
            route: details.cruise.route.map(route => route.city.city_name).join(' — '),
        }],
        tourOptions,
        cachedPassengers: passengers,
        prices,
    };
    return services;
}


function getRooms(details) {
    try {
        console.log(details.rooms)
       return details.rooms.map(details => {
           return `Тип: ${details.room.room_class.name}, Палуба: ${details.room.deck.name}, Борт: ${details.room.side.name}`
       }).join('; ')
    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseService(svc) {
    return new quickBookingValue({})
}

function parsePassengers(button, passengers) {
    return passengers.map(extractPassengerInfo);
}

function extractPassengerInfo(passenger) {
    return new Passenger({
        birthday: passenger.birth_date,
        issueDate: passenger.document.issue_date,
        expire: passenger.document.expire_date,
        lastName: passenger.last_name,
        firstName: passenger.first_name,
        secondName: passenger.patronymic_name,
        nationality: passenger.nationality === "1" ? 'Россия' : null,
        sex: passenger.sex === 0 ? '2' : "1",
        serial: passenger.document.series,
        number: passenger.document.number,
    });
}
