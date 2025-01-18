window.OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || window.location.hostname : window.location.hostname;
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    const region = getNodeData('#main-filters input[placeholder="Куда"]', document, 'value');
    return {region};
}

function getSearchButton() {
  return [...$$('#main-filters .base-button'), ...$$('[data-text="Подобрать тур"]').filter(b => getText(b).match(/поиск/i))];
}

function injectData() {
    $$('.buy-list .buy-item-group').forEach((div) => {
        if (!div.querySelector('.qq')) {
            const container = qqBtns({ align: 'qq-horizontal' });
            container.style.cssText = `
                margin-left: 12px;
                margin-top: -12px;
                filter: invert(1);
            `;
            div.append(container);
        }
    });
    $$('.tour-program-item').forEach((div) => {
        if (!div.querySelector('.qq') && div.closest('.card-wrap')) {
            const room = $first('.grey-text-small', div);
            const container = qqBtns(
                { align: 'qq-horizontal', cssText: 'margin-left:8px;margin-bottom:4px' },
                createListOption
            );
            room ? room.after(container) : div.prepend(container);
        }
    });
    $$('.qui-quo-block').forEach(
        (div) =>
            !div.querySelector('.qq') &&
            div.append(
                qqBtns({ align: 'qq-horizontal', cssText: 'margin-left:8px;margin-bottom:4px' }, createListOption)
            )
    );
    $$('.more-hotels').forEach((a) => a.click());
}

async function createListOption(img) {
    const tour = getHotelRowByImage(img);
    const hotelCard = tour.closest('.card-wrap');
    let [dateStart, dateEnd] = getNodeData('.date', hotelCard)
        .match(/\d{2}.\d{2}/g)
        .map((dt) => appendYear(...dt.split('/')));
    if ( !dateStart || !dateEnd || dateStart.match(/[А-яA-z]/)) {
        [dateStart, dateEnd] = getNodeData('.date', hotelCard)
            .match(getRegexPatterns().date)
    }

    const hotelNameNode = $first('.hotel-name', hotelCard);
    const { region, country, hotel_desc } = await getHotelInfo(hotelNameNode);
    const price = getNodeData('.tour-program-list-btn', tour);
    const flight = await getFlight(hotelCard);
    let option = {
        checkinDt: dateStart,
        nights: String(getDistance(dateStart, dateEnd)),
        hotelName: [getText(hotelNameNode), String($$('.hotel-stars>div', hotelNameNode).length + '*')]
            .filter((t) => t !== '0*')
            .join(' '),
        href: null,
        hotel_desc,
        country,
        region: region || getText($1('.map-info', hotelCard)),
        roomType: getNodeData('.standard-text-small', tour),
        boardType: getNodeData('.grey-text-small', tour),
        price: Number(price.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g, '')),
        city_from: flight ? flight.sectors[0].segments[0].departureCity : '',
        operator: window.OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl(
            hotelCard.querySelector('.tour-result-list-image, .slider-wrap .slide') ||
                hotelCard.querySelector('.slider .slide')
        ),
        flight,
        occupancy: getOccupancy()
    };
    if (!option.checkinDt || option.checkinDt.match(/[А-яA-z]/)) {
        throw new QuiQuoError(
            `Дата: ${option.checkinDt}`,
            'Нет конкретной даты! Попробуйте добавить дату вручную, нажав "карандашик", или дойдите до корзины и нажмите на галочку там.'
        );
    }
    const baseButton = $first('.buy-btn-wrap .base-button', hotelCard);
    if (baseButton) {
        baseButton.click();
    }

    return option;
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const hotelCard = tour.closest('.card');
    const additional = hotelCard.querySelector('.additional-info');
    const ps = $$('p', additional).map((p) => getText(p));
    const price = getText(tour.querySelector('.buy-list-price'));
    const hotelNameNode = hotelCard.querySelector('.hotel-name');
    const { region, country, hotel_desc } = await getHotelInfo(hotelNameNode);
    const flight = await getFlight(hotelCard);
    let option = {
        checkinDt: ps[0].split(/\s*–\s*/)[0],
        nights: ps[1].match(/(\d+)\s*ноч/)[1],
        hotelName: [getText(hotelNameNode), String($$('.hotel-stars>div', hotelCard).length + '*')]
            .filter((t) => t !== '0*')
            .join(' '),
        hotel_desc,
        href: null,
        country,
        region,
        roomType: getText(tour.querySelector('.buy-item .yellow-text-small')),
        boardType: getText(tour.querySelector('.buy-item .yellow-text-small').nextSibling),
        price: Number(price.replace(/\D+/g, '')),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+/g, '')),
        city_from: flight ? flight.sectors[0].segments[0].departureCity : '',
        operator: window.OPERATOR_NAME,
        thumbnail: getBackgroundImageUrl(hotelCard.querySelector('.card-body .slider .slide')),
        flight,
        occupancy: getOccupancy()
    };
    if (!option.checkinDt || option.checkinDt.match(/[А-яA-z]/)) {
        throw new QuiQuoError(
            `Дата: ${option.checkinDt}`,
            'Нет конкретной даты! Попробуйте добавить дату вручную, нажав "карандашик", или дойдите до корзины и нажмите на галочку там.'
        );
    }
    return option;
}

function getOccupancy() {
    try {
        const occupancy = {
            adultsCount: Number(getParameterByName('adultCount')),
            childrenCount: 0,
            childAges: getParameterByName('childAges')
        };

        occupancy.childrenCount = occupancy.childAges ? occupancy.childAges.split(',').length : null;
        return occupancy;
    } catch (e) {
        console.log(e);
        return null;
    }
}

async function getFlight(hotelCard) {
    try {
        const flightIcon = hotelCard.querySelector(
            'path[d="M6.5 19.5H8.5L13.5 11.5H19C19.83 11.5 20.5 10.83 20.5 10C20.5 9.17 19.83 8.5 19 8.5H13.5L8.5 0.5L6.5 0.5L9 8.5L3.5 8.5L2 6.5H0.5L1.5 10L0.5 13.5H2L3.5 11.5L9 11.5L6.5 19.5Z"]'
        );
        flightIcon.closest('.base-button').click();
        await waitingFor(() => null, 30, 5);
        const flightInfo = document.querySelector('.right-modal-wrap .avia-flight');
        const modalWrap = flightInfo.closest('.right-modal-wrap');
        const sectors = $$('.avia-flight-card', flightInfo).map(parseSector);
        const background = modalWrap.querySelector('.bg-effect');
        background.click();
        return { sectors };
    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseSector(card) {
    const segments = [parseSegment(card)];
    return { segments };
}

function parseSegment(card) {
    const [airline, serviceClass, flightNumber] = getText(card.querySelector('.avia-info-text .grey-text-small'))
        .split(/\s*•\s*|-/)
        .filter((s) => s);
    const [departureTime, departureAirportID, departureCity, arrivalTime, arrivalAirportID, arrivalCity] = $$(
        '.avia-time-info-content span',
        card
    ).map((p) => p.textContent);
    const [day, month] = getText(card.querySelector('.card-headline h3')).split(/\s+/);
    return new FlightSegment({
        flightNumber,
        airline,
        departureDate: dateFromDayAndMonthName(day, month),
        departureTime,
        departureCity,
        departureAirportID,
        serviceClass,
        arrivalTime,
        arrivalCity,
        arrivalAirportID
    });
}

async function getHotelInfo(hotelNameNode) {
    const anchor = hotelNameNode.querySelector('a');
    if ( !anchor.getAttribute('href') ) {
        return {country: SEARCH_CRITERIA.region}
    }
    anchor.click();
    await waitingFor(() => null, 30, 5);
    const hotelInfo = document.querySelector('.tour-hotel-info');
    if ( !hotelInfo ) {
        return {country: SEARCH_CRITERIA.region}
    }
    const modalWrap = hotelInfo.closest('.right-modal-wrap');
    const hotelName = getText(hotelInfo.querySelector('.hotel-name'));
    if ( hotelName.toUpperCase() !== getText(hotelNameNode).toUpperCase() ) {
        return {country: SEARCH_CRITERIA.region}
    }

    const place = getText(hotelInfo.querySelector('.place .ligth-grey-text-small')).split(/\s*,\s*/);
    const [region, country] = [place[0], lastElement(place)];
    const hotel_desc = getNodeProperty(hotelInfo.querySelector('.htldsk'));
    const background = modalWrap.querySelector('.bg-effect');
    background.click();
    return {
        region, country, hotel_desc
    }
}

function getHotelRowByImage(img) {
    return img.closest('.buy-item-group, .tour-program-item-group');
}
