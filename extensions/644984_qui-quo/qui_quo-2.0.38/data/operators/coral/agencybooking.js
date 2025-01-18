window.OPERATOR_NAME = window.location.host.match(/coral/i) ? "Coral" : "Sunmar";

window.isQuickLoginAsyncFormAction = true;
window.showTopHotelsRating = false;

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$("#group-list .btn-buy-flight").forEach(div => {
        window.showTopHotelsRating = false;
        if ( !div.parentNode.querySelector(".qq") ) {
            div.after(qqBtns({align: "qq-horizontal"}));
        }
    });
    $$(".room-show .table-price-text").forEach(div => {
        window.showTopHotelsRating = true;
        if ( !div.querySelector(".qq") ) {
            div.append(qqBtns({align: "qq-horizontal"}, createHotelOption));
        }
    });
}

async function createOption(img) {
    const tour = getHotelRowByImage(img);
    $$('.group-flight-item-inner', tour)
        // -- ПроверялосЬ, что слово "выбран" имеет высоту, но на мобильном это слово всегда display: none
        // .filter(item => $1('.span-selected', item) && $1('.span-selected', item).offsetHeight > 0)
        .filter((item) => $1('.fa.fa-check', item) && $1('.fa.fa-check', item).offsetHeight > 0)
        .map((item) => $1('.btn-group-flight-item-detail', item))
        .forEach((item) => item.click());
    const option = await waitingFor(() => getFlightWithOptions(tour), 200, 100);
    option.price = extractIntFromStr($1('.total-price', tour) ?
        $1('.total-price', tour).dataset.amount :
        getNodeData('.group-price strong',tour, 'textContent', '').replace(/\D+/g, ''));
    option.currency = ($1('span[class*="price-"]').className.match(/price-(.{3})/) || ['', 'RUB'])[1]
    return option;
}

function getFlightWithOptions(tour) {
    try {
        const flight = getFlight(tour);
        return createOptionFromFlight(flight);
    } catch(e) {
        return null;
    }

}

function getFlight(tour) {
    const baggage = getNodeData('.baggage-text', tour);
    const sectors = $$('.group-flight .selected ',tour).map(s => parseSector(s, baggage));
    return {sectors}
}

function parseSector(sectorNode, baggage) {
    const segments = $$('.segment-item', sectorNode).map(s => parseSegment(s, baggage));
    return {segments}
}

function parseSegment(segmentNode, baggage) {
    const [companyDivs, flightInfoDivs, departureDivs, connectionDivs, arrivalDivs] = $$('.segment-item > div', segmentNode).map(div => div.children)
    const [departureAirportID, departureAirport, departureRegion] = $$('.fv2-dialog-content strong', departureDivs[0]).map(strong => getText(strong));
    const [arrivalAirportID, arrivalAirport, arrivalRegion] = $$('.fv2-dialog-content strong', arrivalDivs[0]).map(strong => getText(strong));
    return new FlightSegment({
        flightNumber: getNodeProperty(flightInfoDivs[0]),
        airline: "",
        travelTime: "",
        plane: getNodeData('.fv2-dialog-click',flightInfoDivs[1]),
        departureDate: getNodeProperty(departureDivs[3]),
        departureTime: getNodeProperty(departureDivs[2]),
        departureCity: departureRegion.split(/\s*,\s*/)[0],
        departureCountry: departureRegion.split(/\s*,\s*/)[1] || null,
        departureAirport,
        departureAirportID,
        baggage,
        serviceClass: getNodeProperty(flightInfoDivs[2]),
        arrivalDate: getNodeProperty(arrivalDivs[3]),
        arrivalTime: getNodeProperty(arrivalDivs[2]),
        arrivalCity: arrivalRegion.split(/\s*,\s*/)[0],
        arrivalCountry: arrivalRegion.split(/\s*,\s*/)[1] || null,
        arrivalAirport,
        arrivalAirportID
    })
}

function createHotelOption(img) {
    const tour = getHotelRowByImage(img);
    const tds = $$('td',tour);
    const searchInfo = $$('.search-summary .summary-box').map(s => ({caption: getNodeData('strong', s), value: getNodeData('span', s)}));
    const checkinDt = searchInfo.find(s => s.caption.match(/Дата заезда/i)).value;
    const dateEnd = searchInfo.find(s => s.caption.match(/Дата выезда/i)).value;
    const region = searchInfo.find(s => s.caption.match(/Размещение/i)).value
    let option = {
        checkinDt,
        nights: String(getDistance(checkinDt, dateEnd)),
        hotelName: getHotelName(),
        hotel_desc: getNodeData('#AnchorAbout .panel-body'),
        href: window.location.href,
        country: lastElement(region.split(/\s*,\s*/)) !== region.split(/\s*,\s*/)[0] ? lastElement(region.split(/\s*,\s*/)) : null,
        region: region.split(/\s*,\s*/)[0],
        roomType: getText(tds[0], 'innerText'),
        boardType: getText(tds[1], 'innerText'),
        price: extractIntFromStr(getNodeData('.table-price-text', tour).replace(/\D+/g, '')),
        currency: ($1('span[class*="price-"]').className.match(/price-(.{3})/) || ['', 'RUB'])[1],
        city_from: "",
        operator: window.OPERATOR_NAME,
        thumbnail: getNodeData('.photo-gallery-box img', document, 'src'),
        occupancy: getOccupancy(searchInfo)
    };
    return option;
}

function getOccupancy(searchInfo) {
    let occupancy = {
        adultsCount: 0,
        childrenCount: 0,
        childAges: null
    };
    const text = searchInfo.find(s => s.caption.match(/Количество туристов/i)).value;
    occupancy.adultsCount = extractOptionalInt((text.match(/(\d+)\s*взр/i) || [])[1]);
    occupancy.childrenCount = extractOptionalInt((text.match(/(\d+)\s*реб/i) || [])[1]);
    return occupancy;
}

function getHotelName() {
    const caption = getNodeData('.hotel-title');
    let stars =  $1('.hotel-category .fa');
    if ( stars ) {
        stars = String(stars.className.match(/\d/) || '');
    }
    return `${caption} ${stars ? stars+'*' : ''}`
}


function getHotelRowByImage(img) {
    return img.closest('.group-list-item, .room-show');
}



function injectAutoLoginSelect(logins, manager, opts) {
    const form = document.querySelector('#LoginForm, #signInForm');
    if (!form || form.querySelector(".qq-quick-login-btn")) {
        return;
    }
    const {button, wrapper, select, label} = createAutoLoginWrapper(logins, manager, opts);

    form.append(wrapper);
    button.classList.add('btn', 'btn-primary', 'btn-block', 'btn-lg', 'green', 'small');
    select.before(label);
}

function getElementsForQuickLoginAction() {
    const form = document.querySelector('#LoginForm, #signInForm');
    const usernameInp = form.querySelector('input#txtUsername');
    const passwordInp = document.createElement('option');
    const loginBtn = form.querySelector('#btnLogin, #signInSubmit');

    $1('#txtPassword').before(passwordInp);
    passwordInp.id = 'txtPassword';
    passwordInp.style.display = 'none';


    return {usernameInp, passwordInp: passwordInp, loginBtn, isReact: false}
}
