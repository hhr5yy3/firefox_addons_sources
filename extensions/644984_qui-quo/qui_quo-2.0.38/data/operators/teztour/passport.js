//Заполнение паспортных данных
var OPERATOR_NAME = "tez-tour";

function injectQuickReservationData(selInsert, func) {
    var tables = querySelectorAll(document, ".touristTable");
    tables.forEach((table) => {
        if ( !table.querySelector(selInsert) ) {
            table.tBodies[0].append(func({
                addTag: "tr",
                style: "float: right;position: relative;margin-right: 10px; width: 40%"
            }));
        }
    });
    const clientTable = searchClientTable();
    if ( clientTable && !clientTable.querySelector(selInsert) ) {
        clientTable.classList.add('qq-tourist-table');
        clientTable.tBodies[0].append(func({
            addTag: "tr"
        }));
    }

}

function searchClientTable() {
    const tables = $$('.tez-dop-table');
    return  tables.find(table => {
        const text = getText(table);
        return text.match(/Фамилия/i) && text.match(/Имя/i) && text.match(/Номер/i)})
}

function pasteOrderData(tr, data, passport, errors) {
    if ( tr.classList.contains('qq-tourist-table') )  {
        return pasteClientData(tr, data, passport, errors);
    }
    setInputValues(tr, [
            "table > tbody > tr:nth-child(2) > td:nth-child(6) > input", data.inn,
            "table > tbody > tr:nth-child(2) > td:nth-child(4) > input", customDateToFullString(data.birthday),
            "table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(4) > input", customDateToFullString(passport.issueDate),
            "table > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(5) > input", customDateToFullString(passport.expire),
            ".tFamily", passport.surname,
            ".tName", passport.name,
            ".tpSer", passport.serial,
            ".tpNo", passport.number,
            ".tPhone", data.phones.mobile
        ], errors
    );
    setSelectIndex(tr, [tr.querySelector(`[value='1104']`).parentNode, mapNationality(data.nationalityEng),
        tr.querySelector(`[value='2688']`).parentNode, {
            value: mapTATitle(data.title.value),
            caption: data.title.caption
        }], errors
    );
}

function pasteClientData(table, data, passport, errors) {
    const inputs = new Map();
    $$('tr', table).forEach(tr => {
        inputs.set(getNodeProperty($1('td', tr), 'NULL'), $1('input, select', tr))
    })
    const passportNumber = {value: passport.serial.value + passport.number.value, caption: 'Номер'}
    setInputValues(table, [
            inputs.get('Дата выдачи*'), customDateToFullString(passport.issueDate),
            inputs.get('Фамилия*'), passport.surname,
            inputs.get('Имя*'), passport.name,
            inputs.get('Отчество*'), passport.secondName,
            inputs.get('Номер*'), passportNumber,
            inputs.get('Мобильный телефон (пример: +375-29-123-45-67)*'), data.phones.mobile,
            inputs.get('Электронная почта*'), data.email,
            inputs.get('Адрес*'), data.address
        ], errors
    );

    setSelectIndex(table, [inputs.get('Страна покупателя*'), mapNationality(data.nationalityEng)], errors
    );
    if ( inputs.get('Вид на жительство Беларусь*') ) {
        errors.push('Вид на жительство Беларусь*');
    }
}

function getPassengerRowBySelect(select) {
    return select.closest('.touristTable, .qq-tourist-table')
}

function mapTATitle(title) {
    switch(title) {
        case "Mr" : return "MR.";
        case "Mrs" : return "MRS.";
        case "Miss" : return "Miss";
        case "Child" : return "Child";
        case "Infant" : return "Infant";
        default  : return null;
    }
}

function mapNationality(nationality) {
    switch (nationality.value) {
        case "Azerbaijan" :
            nationality.value = "AZERBAIDJAN";
            break;
        case "Armenia" :
            nationality.value = "ARMENIA";
            break;
        case "Belarus" :
            nationality.value = "BELARUS";
            break;
        case "Kazakhstan" :
            nationality.value = "KAZAKHSTAN";
            break;
        case "Kyrgyzstan" :
            nationality.value = "KIRGIZIA";
            break;
        case "Moldova" :
            nationality.value = "MOLDOVA";
            break;
        case "Russia" :
            nationality.value = "RUSSIA";
            break;
        case "Tajikistan" :
            nationality.value = "TAJIKISTAN";
            break;
        case "Uzbekistan" :
            nationality.value = "UZBEKISTAN";
            break;
        case "Turkmenistan" :
            nationality.value = "TURKMENISTAN";
            break;
        case "Ukraine" :
            nationality.value = "UKRAINE";
            break;
        case "Georgia" :
            nationality.value = "GEORGIA";
            break;
    }
    return nationality;
}
