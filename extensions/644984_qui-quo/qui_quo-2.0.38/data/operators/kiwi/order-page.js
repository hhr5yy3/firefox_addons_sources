window.OPERATOR_NAME = "Kiwi";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    const order = $1(".order-summary");
    if (order && !$1('.qq', order)) {
        const {container, buttons} = createQuickBookingContainer()
        buttons.style.display = 'none';
        order.append(container)
    }
}

function createOption(img) {
    let option = {
        checkinDt: "",
        nights: "",
        hotelName: "",
        hotel_desc: "",
        href: "",
        country: "",
        region: "",
        roomType: "",
        boardType: "",
        price: "",
        currency: "",
        city_from: "",
        operator: "",
        thumbnail: "",
        occupancy: "",
        excursion: "",
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = createOption(button);
    const transfers = getTransfersInfo();
    const prices = new Prices();
    prices.nationalGrossPrice = parseInt(getNodeData('.kw-summary-price-item .kw-summary-price-item__value').replace(/\s+/, ''));
    prices.nationalNettPrice = parseInt(getNodeData('.kw-summary-footer__additional:not(._commission) .kw-summary-price-item__value').replace(/\s+/, ''));
    prices.nationalCurrency = 'RUB';

    return {
        transfers,
        tourOptions,
        prices,
    };
}

function parsePassengers() {
    const panels = new Array(parseInt(getNodeData('.passengers-select input', document, 'value')))
    return panels.map(extractPassengerInfo);
}

function getTransfersInfo() {
    return $$('.transfer-data').map(parseTransfer);
}

function parseTransfer(section) {
   const groups = getGroups(section);
   const dateGroup = groups.find(g => g.label.match(/Дата и время/i)).node
   const dateStart = getNodeData('input', dateGroup, 'value');
   return new quickBookingValue({
       dateStart,
       description: [...$1('.route.h3', section).childNodes].map(t => t.textContent.trim()).filter(Boolean).join(' -> ')
   })
}

function extractPassengerInfo(panel) {
    const passenger = {}
    return passenger;
}

function parseClient() {
    const name = getNodeData('input[placeholder="Ivan Fedorov"]', document, 'value', '')
    if (!name) {
        return null;
    }
    return new Passenger({
        lastName: name.split(/\s+/)[1],
        firstName: name.split(/\s+/)[0]
    })
}

function getGroups(section) {
    return $$('.kw-form-group', section).map(row => {
        return {
            label: getNodeData('.kw-label', row) || '',
            node: row
        }
    })
}
