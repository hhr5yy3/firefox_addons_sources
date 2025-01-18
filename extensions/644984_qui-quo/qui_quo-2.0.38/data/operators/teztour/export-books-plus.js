window.OPERATOR_NAME = "Tez";
window.showTopHotelsRating = "Tez";
window.injectionSelector = '#container.reservations, .item-row';
function initializeSearchCriteria() {
    return null;
}

function getSearchButton() {
    return null
}

function injectData() {
    if ( !initParams || initParams.hideQuickBookingTutorial === true ) {
        return '';
    }
    const reservations = document.querySelector('#container.reservations');
    if ( reservations ) {
        const head1 = lastElement($$('th.head1', reservations));
        const head2 = lastElement($$('th.head2', reservations));
        if ( head1 && !head1.parentNode.querySelector('.qq') ) {
            const headTr = head1.parentNode;
            const newTh = document.createElement('th');
            const container = createQQContainer();
            const image = container.querySelector('img');
            image.classList.add('qq');
            image.style.height = '18px';
            newTh.append(image);
            newTh.classList.add('qq');
            headTr.append(newTh);
        }

        if ( head2 && !head2.parentNode.querySelector('.qq') ) {
            const headTr = head2.parentNode;
            const newTh = document.createElement('th');
            newTh.classList.add('qq');
            newTh.textContent = 'БЫСТРАЯ ЗАЯВКА В CRM';
            headTr.append(newTh);
        }

        $$(".item-row", reservations).forEach(tr => {
            if ( !tr.querySelector(".qq") ) {
                const container = createQQContainer();
                const qqBtns = container.querySelector('.qq-box');
                const exportButton = container.querySelector('.qq-export-button');
                const newTd = document.createElement('td');
                const image = container.querySelector('img');
                newTd.classList.add('qq');
                image.remove();
                container.style.flexDirection = 'column';
                container.style.maxWidth = '100px';
                container.style.minWidth = '100px';
                container.style.marginTop = '5px';
                exportButton.style.minWidth = '100px';
                exportButton.classList.add('blue_btn', 'orange');
                exportButton.textContent = 'Экспорт';
                exportButton.dataset.qqCaption = 'Экспорт';
                exportButton.style.fontSize = '12px';
                qqBtns.style.display = 'none';
                newTd.append(container);
                tr.append(newTd);
            }
        });
        return;
    }

    $$('.reservations h4').forEach( head =>  {
        if ( !head.parentNode.querySelector('.qq') ) {
            const {container, buttons, exportButton} = createQuickBookingContainer();
            container.style.width = '250px';
            if (buttons ) {
                buttons.style.display = 'none';
            }
            exportButton.classList.add('blue_btn', 'orange');
            head.after(container);
        }
    });
}

async function createOption(button) {
    button.textContent = 'Загрузка...';
    let doc = document;
    let tourOperatorReference = null;
    if ( !button.closest('.reservation-head, .reservations h4, .confirmation.reservations') ) {
        const row = getHotelRowByImage(button);
        const a = row.querySelector('.tdBookNo a');
        const bookingUrl = getNodeProperty(a, null, 'href');
        tourOperatorReference = getText(a);
        button.classList.add('disabled');
        const page = await fetchTimeout(15000, fetch(bookingUrl)).then(resp => resp.text());
        button.classList.remove('disabled');

        const parser = new DOMParser();
        doc = parser.parseFromString(page, "text/html");
    }

    const bookTables = $$('.table-book-item, .styled-table-box, .styled-table', doc).map(createTableObj);
    const findTable = (regexp) => bookTables.find( tableObj => tableObj.caption.match(regexp)) || {trs: []};
    const [mainTable,
        tourTable, flightTable,
        transfersTable, otherTable,
        insuranceTable, financialTable] = [findTable(/Общая информация|Загальна інформація|Bendroji informacija/i),
        findTable(/Тур$|Тур[^А-я]|Kelionė/i),
        findTable(/Авиабилеты|Авіаквитки|Flight tickets|Lėktuvo bilietai/i),
        findTable(/Трансфер|Трансфери|Pervežimas|Pervežimai/i),
        findTable(/Дополнительные|Додаткові|Доп\. услуги|Papildomos\s*paslaugos/i),
        findTable(/Страхование|Страхування|Страховки|Draudimas/i),
        findTable(/Pасчеты|Взаєморозрахунки|Dokumentai/i)];


    const country =  getCell(mainTable.ths, mainTable.trs[0], /Страна|Країна|Šalis/i);
    const hotels =  tourTable.trs.map(tr => parseHotel(tr, tourTable.ths, country));
    const transfers = transfersTable.trs.map( tr => parseTransfers(tr, transfersTable.ths) );
    const insurance = insuranceTable.trs.map( tr => parseInsurance(tr, insuranceTable.ths) );
    const other = otherTable.trs.map( tr => parseOther(tr, otherTable.ths) );
    const segments = flightTable.trs.map(tr => parseSegments(tr, flightTable.ths));
    const sectors = splitSegmentsToSectors(segments);
    const flight = {sectors};
    const price = getNodeProperty(getCell(mainTable.ths, mainTable.trs[0], /Стоимость|Вартість|Kaina/i), '0');
    const nettPrice = getNodeProperty(getCell(financialTable.ths, financialTable.trs[0], /Начислено|Нараховано|Agentūra/i), '0');
    const notes = $$('.comment-list .full', doc).map(comment => getText(comment));

    const currency = mapCurrencyUtil(price.replace(/\d+|\s+|\./g, ''));
    const nettPriceCurrency = mapCurrencyUtil(nettPrice.replace(/\d+|\s+|\./g, ''));

    const nettPriceType = mapPriceType(nettPriceCurrency);
    const priceType = mapPriceType(currency);
    const prices = new Prices();
    prices[`${nettPriceType}`].nett = parseFloat(nettPrice.replace(/[^0-9.]/g, '')) || 0;
    prices[`${nettPriceType}`].currency = nettPriceCurrency;


    prices[`${priceType}`].gross = parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
    prices[`${priceType}`].currency = currency;

    const parsePassengers = () => {
        const passengerTable = createTableObj(doc.querySelector('.guest-box table, .guest-block table'));
        return passengerTable.trs.asyncMap( async tourist => await extractPassengerInfo(tourist, passengerTable.ths, doc));
    };

    // const parseClient = () => {
    //     const clientEditBtn = $1('[onclick*="Booking.Guest.Buyer.edit"]');
    //     if ( clientEditBtn ) {
    //         const clientBox = clientEditBtn.closest('.guest-box,.guest-block');
    //         if (clientBox) {
    //             const clientTable = createTableObj(clientBox.querySelector('table'));
    //             console.log(clientTable)
    //             return extractClientInfo(clientTable.trs[0], clientTable.ths, doc)
    //         }
    //     }
    //
    // }
    window.parsePassengers = parsePassengers;
    // window.parseClient = parseClient;

    let option = {
        hotels,
        flight,
        transfers,
        insurance,
        other,
        notes,
        dateStart: getText(getCell(mainTable.ths, mainTable.trs[0], /^С$|^З$|^Nuo$/i)),
        dateEnd : getNodeProperty(getCell(mainTable.ths, mainTable.trs[0], /^По$|^Iki$/i)),
        nights: hotels.reduce((a, b) => a + parseInt(b.nights), 0),
        country: getNodeProperty(country),
        region: hotels[0] ? hotels[0].region : null,
        prices,
        price: extractIntFromStr(price),
        currency: mapCurrencyUtil(price.replace(/\d+|\s+|\./g, '')),
        nettPrice: extractIntFromStr(nettPrice),
        nettPriceCurrency: mapCurrencyUtil(nettPrice.replace(/\d+|\s+|\./g, '')),
        city_from: flight && flight.sectors[0] && flight.sectors[0].segments[0] ? flight.sectors[0].segments[0].departureCity : 'Нет данных',
        operator: window.OPERATOR_NAME,
        tourOperatorReference: tourOperatorReference || getNodeProperty($$('.title.cab-title')[0].firstChild, '').replace(/\D+/g, '')
    };
    button.textContent = 'Экспорт';
    return option;
}
   ////*[@id="content"]/div[2]/div/div/div/div[1]/text()
function createTableObj(table) {
    const ths = $$('th', table);
    return {
        table,
        caption: getElementShallowText(table.closest('.spaced-block').querySelector('.gray-panel')),
        ths,
        trs: $$('tbody tr', table)
            .filter(tr => !tr.querySelector('th, .cancel') && ($$('td' ,tr).length === ths.length || tr.classList.contains('service-items')))
            .map(tr => $$('td', tr))
    }
}

function parseTransfers(tr, ths) {
     try {
         const text = getText(getCell(ths, tr, /Маршрут|Maršrutas/i)).split(/,\s*/);
         return new quickBookingValue({
             description: text[0],
             dateStart: text[1]
         })
     } catch (e) {
       return null;
     }
}

function parseInsurance(tr, ths) {
     try {
         const dates = trim(getNodeProperty(getCell(ths, tr, /Дата|Data/i), '')).match(getRegexPatterns().date) || [];
         return new quickBookingValue({
             description:  trim(getNodeProperty(getCell(ths, tr, /Страховая компания|Страхова компанія|Страховка|Название|Pavadinimas/i)), 'Страховка'),
             dateStart: trim(getNodeProperty(getCell(ths, tr, /^С$|^З$/i)), '') || dates[0],
             dateEnd: getNodeProperty(getCell(ths, tr, /^По$/i), '') || dates[1]
         })
     } catch (e) {
       return null;
     }
}

function parseOther(tr, ths) {
     try {
         return new quickBookingValue({
             description:  trim(getText(getCell(ths, tr, /Тип услуги|Тип послуги/i), 'outerHTML')),
             dateStart: trim(getText(getCell(ths, tr, /^Дата$/i)))
         })
     } catch (e) {
       return null;
     }
}

function parseSegments(tr, ths) {
     try {
         const depDate = getText(getCell(ths, tr, /Вылет|Виліт|Išvykimas/i)).split(/\s+/);
         const arrDate = getText(getCell(ths, tr, /Прибытие|^Прибуття|Atvykimas/i)).split(/\s+/);
         const [departureCity, departureAirportID, departureTerminal] = getText(getCell(ths, tr, /вылета|вильоту|Išvykimo /i)).split(/\s*\(|\/|\)/);
         const [arrivalCity, arrivalAirportID, arrivalTerminal] = getText(getCell(ths, tr, /прибытия|прибуття|Atvykimo/i)).split(/\s*\(|\/|\)/);
         return new FlightSegment({

                 flightNumber: getNodeProperty(getCell(ths, tr, /Рейс|Пак|Reisas/i)),
                 baggage: getNodeProperty(getCell(ths, tr, /Норма багажа|Норма багажу|Bagažas/i)),
                 departureDate: depDate[0],
                 departureTime: depDate[1],
                 departureCity,
                 departureAirportID,
                 departureTerminal,
                 serviceClass: getNodeProperty(getCell(ths, tr, /Места|Місця|Vietos/i)),
                 arrivalDate: arrDate[0],
                 arrivalTime: arrDate[1],
                 arrivalCity,
                 arrivalAirportID,
                 arrivalTerminal
         })
     } catch (e) {
       return null;
     }
}

function parseHotel(tr, ths, country) {
    try {
        const hotel = getText(getCell(ths, tr, /Отель|Готель|Viešbutis/i), 'innerText').split(/\n|\s{2,}/);
        const nights = getText(getCell(ths, tr, /Ночи|Ночі|Naktys/i));
        const dateStart = dateFromDayAndMonthName(...getText(getCell(ths, tr, /Прибытие|Прибуття|Atvykimas/i)).match(/(\d+)\s+(.+?),\s*(\d{4})+/).slice(-3));
        const dateEnd = dateFromDayAndMonthName(...getText(getCell(ths, tr, /Вылет|Виліт|Išvykimas/i)).match(/(\d+)\s+(.+?),\s*(\d{4})+/).slice(-3));
        return {
            dateStart,
            dateEnd,
            nights,
            hotelName: hotel[0],
            roomType: getText(getCell(ths, tr, /Тип номера|Kambario tipas/i)),
            boardType: getText(getCell(ths, tr, /Питание|Харчування|Maitinimas/i)),
            country: getText(country),
            region: hotel[1]

        }
    } catch(e) {
        console.log(e)
        return null;
    }
}

function getCell(ths, tds, regexp) {
    try {
        const index = findTableTdIndex(ths, regexp);
        return index !== -1 ? tds[index] : null;
    } catch(e) {
        return null;
    }
}

function getHotelRowByImage(img) {
    return img.closest('.item-row');
}

async function createQuickBookingOption(button) {
    const tourOptions = await createOption(button);
    const services = {
        insurance: tourOptions.insurance,
        transfers: tourOptions.transfers,
        other: tourOptions.other,
        notes: tourOptions.notes,
        nettPrice: tourOptions.nettPrice,
        nettPriceCurrency: tourOptions.nettPriceCurrency,
        tourOptions,
        tourOperatorReference: tourOptions.tourOperatorReference
    };
    return services;
}

function parseHotels(tourOptions) {
    return tourOptions.hotels;
}

async function extractPassengerInfo(tourist, ths, doc) {
    const passportNumber = getNodeProperty(getCell(ths, tourist, /Серия, номер паспорта|Серія, номер паспорта|Paso serija, numeris/i), '').split(/\s+/);
    const name = getNodeProperty(getCell(ths, tourist, /Турист|Turistas/i), '').split(/\s+/);
    const passenger = new Passenger(
        {
            title: getNodeProperty(tourist[0]),
            birthday: getNodeProperty(getCell(ths, tourist, /Дата рождения|Дата народження|Gimimo data/i)),
            expire: getNodeProperty(getCell(ths, tourist, /Действителен|закінчення|Galioja iki/i)),
            issueDate: getNodeProperty(getCell(ths, tourist, /выдачи|видачі/i)),
            nationality: getNodeProperty(getCell(ths, tourist, /Громадянство|гражданство|Pilietybė/i)),
            lastName: name[0],
            firstName: name[1],
            serial: passportNumber[0],
            number: passportNumber[1],
            inn: getNodeProperty(getCell(ths, tourist, /Персональный код/i))
        })
    if ( window.document === doc ) {
        const editLi = $$('[onclick*="Booking.Guest.edit"]', doc).find(li => getText(li).match(/Контактные данные/i));
        if ( editLi ) {
            let rows = window.cachedRows;
            if ( !rows ) {
                editLi.click();
                const editModal = await waitingFor(() => $1('#modal-content .guest-edit', doc), 50, 100);
                const closeBtn = $1('#modal-close', doc);
                rows = $$('tr', editModal).map(tr => $$('td', tr).map(td => getText(td) || getNodeData('input', td, 'value')).filter(t => t));
                if ( closeBtn ) {
                    closeBtn.click();
                }
            }
            window.cachedRows = rows;
            const row = rows.find(tds => tds[1] === passenger.lastName && tds[2] === passenger.firstName);
            if ( row ) {
               // passenger.phone = row[3]

            }
        }
    }
    return passenger;
}

// function extractClientInfo(tourist, ths, doc) {
//     const [lastName, firstName, secondName] = getNodeProperty(getCell(ths, tourist, /Имя\s+Фамилия/i), '').split(/\s+/);
//     const passportNumber = getNodeProperty(getCell(ths, tourist, /Номер/i), '').split(/\s+/);
//     const passenger = new Passenger(
//         {
//             birthday: getNodeProperty(getCell(ths, tourist, /Дата рождения|Дата народження/i)),
//             expire: getNodeProperty(getCell(ths, tourist, /Действителен|закінчення/i)),
//             issueDate: getNodeProperty(getCell(ths, tourist, /выдачи|видачі/i)),
//             lastName,
//             firstName,
//             secondName,
//             serial: passportNumber[0],
//             number: passportNumber[1],
//         })
// }
