window.OPERATOR_NAME = "Инфофлот";
window.showTopHotelsRating = false;
console.log(`Loaded ${window.OPERATOR_NAME}`);

function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    $$(".request-handler td.request-actions").forEach(div => {
        if ( !div.querySelector(".qq") ) {
            const container = createQQContainer();
            const btns = $1('.qq-box', container);
            const qbutton = $1('.qq-export-button', container);
            if ( !container ) {
                return null;
            }
            btns.style.display = 'none';
            container.style.zoom = '0.7';
            qbutton.style.fontSize = '16px';
            qbutton.style.fontWeight = 'bold';
            div.append(container);
        }
    });
}

function createOption(img) {
    const tourTable = getHotelRowByImage(img);
    return {
        tourOperatorReference: getNodeData('.request-info strong', tourTable)
    };
}

function getHotelRowByImage(img) {
    return img.closest('.request-handler');
}

//-----------------------------------------------quickBooking Export---------------------------------//
async function createQuickBookingOption(button) {
    const tourTable = getHotelRowByImage(button);
    const btnShow = $1('.request-show-details', tourTable);
    btnShow.click();
    const tables = $$('table.table-bordered', tourTable);
    const cruisesTables = tables.filter( table =>  {
        const ths = $$('th', table).extractNodesText()
        return ths.find( th => th.match(/теплоход|маршрут/i) )
    })
    const cruises = cruisesTables.map(createCruise);
    const prices = new Prices();
    const priceText = getNodeData('.request-actions strong', tourTable);
    prices.nationalNettPrice = parseFloat(priceText.replace(/\s+/g, '').replace(',', '.'));
    prices.nationalCurrency = 'RUB';
    const services = {
        cruises,
        prices
    };
    return services;
}

function createCruise(table) {
    const tds = $$('td', table).extractNodesText();
    const dates = tds[2].split(/\s*\n\s*/).map(txt => dateFromDayAndMonthName(...txt.split(/\s+/)))
    return {
        dateStart: dates[0],
        dateEnd: dates[1],
        route: tds[3],
        ship: trim(tds[1])
    }
}


function parsePassengers(button) {
    const tourTable = getHotelRowByImage(button);
    const panels = $$(".passenger-handler", tourTable).filter(panel => panel.offsetHeight > 0);
    return panels.map(extractPassengerInfo);
}

function extractPassengerInfo(panel) {
    try {
        const [lastName, firstName, secondName] = getNodeData('.passenger-name', panel).split(/\s+/);
        const [serial, number] = getNodeData('.passenger-passport', panel).split(/\s+/);
        const passenger = new Passenger({
            birthday: getNodeData('.passenger-birthday', panel),
            lastName,
            firstName,
            secondName,
            serial,
            number,
        });
        return passenger;
    } catch(e) {
        return e;
    }
}
