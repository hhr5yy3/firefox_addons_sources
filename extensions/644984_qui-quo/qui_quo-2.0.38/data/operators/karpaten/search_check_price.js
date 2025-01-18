window.OPERATOR_NAME = "Karpaten";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return {
        city_from: selectedOption($1('#localitate_plecare'))
    };
}

function getSearchButton() {
    return $$('[name="check_price"]')
}

function injectData() {
    const headPachet = $1('#head_pachet');
    if ( headPachet && !$1('.qq', headPachet) ) {
        const newTh = document.createElement('th');
        newTh.classList.add('text-center', 'qq');
        newTh.textContent = 'QQ';
        headPachet.append(newTh);
    }

    $$("tr.search-tr-cam[data-hotel-currency]").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const td = document.createElement('td');
            td.append(qqBtns({align: "qq-box"}));
            div.append(td);
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    const dataset = tour.dataset;
    const region = getNodeData('small', tour).split(/\s*,\s*/);
    const dateStart = getNodeData('[name="data_start"]', tour, 'value').split('-').reverse().join('.')
    const tourInfo = await fetch(location.href+'&room_info=1', {method: 'POST'}).then(r => r.json()).catch(_ => null)
    const flight = getFlight(tourInfo);
    let option = {
        checkinDt: dateStart,
        nights: getNodeData('[name="nr_nopti"]', tour, 'value'),
        hotelName: dataset.filterName,
        href: null,
        country: region[0],
        region: dataset.filterCity,
        roomType: getNodeData('[name="nume_voucher_camera"]', tour, 'value'),
        boardType: dataset.filterMeal,
        price: extractIntFromStr(dataset.sort_price_eur),
        currency: dataset.hotelCurrency,
        city_from: SEARCH_CRITERIA.city_from || "",
        operator: window.OPERATOR_NAME,
        flight
    };
    return option;
}

function getFlight(tourInfo) {
    try {
      const sectors = tourInfo.detalii_transport.map(parseSector)
      return {sectors};
    } catch (e) {
        console.log(e);
        return null;
    }
}

function parseSector(sector) {
    const depPort = sector.aeroport_plecare.split(/\s*,\s*/)
    const arrPort = sector.aeroport_sosire.split(/\s*,\s*/)
    const segments = [new FlightSegment({
        flightNumber: `${sector.iata}${sector.nr_zbor}`,
        airline: sector.companie,
        departureDate: sector.d_st_a,
        departureTime: sector.ora_plecare,
        departureCity: depPort[1],
        departureAirport: depPort[0],
        departureAirportID: sector.iata_plecare,
        arrivalDate: sector.arrival_date_ro,
        arrivalTime: sector.ora_sosire,
        arrivalCity: arrPort[1],
        arrivalAirport: arrPort[0],
        arrivalAirportID: sector.iata_sosire,
    })]
    return {segments}
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}
