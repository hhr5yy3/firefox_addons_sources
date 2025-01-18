
async function createOption(img) {
    const {primaryInfo, modalPopupCloseButton, secondaryInfo, groups} = await openModal(img)

    const hotels = groups.filter( g => g.type === 'hotel' ).map(g => parseHotel(g.fields, secondaryInfo.fields))

    const prices = getPrices(primaryInfo);


    let option = {
        hotels,
        prices,
        tourOperatorReference: getContentByTitle(/Заказ №/, primaryInfo.fields,  'content')
    };
    const hotelGroup = groups.find(g => g.type === 'hotel');
    if ( hotelGroup ) {
        const guests = getContentByTitle(/гость/i, hotelGroup.fields, 'node');
        const expandBtn = $1('.prtnr-orders-order-field-list-expand', guests);
        if ( expandBtn ) {
            expandBtn.click();
        }
        option.passengers = $$('.prtnr-orders-order-field-string', guests).map(p => {
            const [firstName, lastName] = getText(p).split(/\s+/);
            return new Passenger({
                lastName,
                firstName,
            });
        })
    }
    modalPopupCloseButton.click();
    return {tourOptions: option, ...option};
}

function parseHotel(fields, secondaryFields) {
    return {
        dateStart: dateFromDayAndMonthName(...getContentByTitle(/Заезд/i, secondaryFields).split(/\s+/)),
        dateEnd: dateFromDayAndMonthName(...getContentByTitle(/Выезд/i, secondaryFields).split(/\s+/)),
        nights: getContentByTitle(/ночи/i, secondaryFields),
        hotelName: getContentByTitle(/отель/i, fields),
        href: getContentByTitle(/отель/i, fields, 'link'),
        country: getContentByTitle(/страна/i, fields),
        region: getContentByTitle(/город/i, fields),
        roomType: getContentByTitle(/Тип номера/i, fields)
    };
}

function parseHotels(tourOptions) {
    if ( tourOptions.hotels ) {
        return tourOptions.hotels;
    }
    return parseHotelsUtil(tourOptions);
}

async function createQuickBookingOption(button) {
   const {hotels, prices, other, transfers, insurance, passengers , tourOperatorReference, tourOptions} = await createOption(button);

    return {
        tourOperatorReference,
        tourOptions,
        insurance,
        transfers,
        other,
        hotels,
        prices,
        cachedPassengers: passengers
    };
}

function parsePassengers(_, cachedPassengers) {
    return cachedPassengers;
}

function getHotelRowByImage(img) {
    return img.closest('.prtnr-orders-order-container');
}
