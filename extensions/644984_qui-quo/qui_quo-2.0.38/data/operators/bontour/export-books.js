window.OPERATOR_NAME = "БОНТУР";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".docs_div").forEach(div => {
        const tr = div.closest('tr');
        if ( !tr.querySelector(".qq") ) {
            const {buttons, container, logo, exportButton} = createQuickBookingContainer({align: "qq-horizontal"});
            buttons.style.display = "none";
            logo.style.height = '12px';
            exportButton.style.cssText = ``;
            exportButton.textContent = 'БЗ в CRM';
            container.style.width = '128px';
            container.style.minWidth =  '128px';
            container.style.margin = '4px';
            div.append(container);
        }
    });
}

function createOption(img) {
    const tds = $$('td', getHotelRowByImage(img)).extractNodesText();
    const prices = new Prices();
    const grossPrice = parseNumber(tds[4])+ parseNumber(tds[5])+ parseNumber(tds[6]);
    const nettPrice = grossPrice-parseNumber(tds[4]);
    prices.nationalGrossPrice = grossPrice;
    prices.nationalNettPrice = nettPrice;
    prices.nationalCurrency = "RUB";

    let option = {
        checkinDt: "",
        nights: "",
        hotelName: "Отель: По программе",
        country: "",
        region: "",
        roomType: "Номер: По программе",
        boardType: "Питание: По программе",
        price: "",
        currency: "",
        prices
    };
    return option;
}

function getHotelRowByImage(img) {
    return img.closest('tr');
}

function parseNumber(str) {
    return Number(str.replace(/\D+/g, ''));
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourOptions = createOption(button);
    const tour = getHotelRowByImage(button);
    const tourLink = $1('[href*="/tours"]', tour)

    const tourInfo = await fetch(`https://bontour.ru/tours/?tour=${tourLink.href.replace(/\D+/g, '')}`).then(response => response.text());
    const doc = getDocumentFromString(tourInfo);
    const tourName = getNodeData('#hero h1', doc);
    const dateStart = getText(tourLink.closest('td').lastChild).match(getRegexPatterns().date)[0];
    const days = tourName.match(/(\d+)\s*дн/i);
    tourOptions.checkinDt = dateStart;
    tourOptions.nights = String(days[1] - 1)
    const services = {
        other:[new quickBookingValue({
             description: `Тур: «${tourLink.title}»`,
             dateStart,
             dateEnd: days ? addDaysToStringDate(dateStart, days[1]-1) : null,
        })],
        tourOptions
    };
    return services;
}

function parsePassengers(button) {
    const tds = $$('td', getHotelRowByImage(button));
    const passengers = tds[2].title.split(/\s*,\s*/)
    return passengers.map(extractPassengerInfo);
}

function extractPassengerInfo(passengerText) {
    const [lastName, firstName, secondName] = passengerText.trim().split(/\s+/);
    return new Passenger({
        lastName,
        firstName,
        secondName

    });
}
