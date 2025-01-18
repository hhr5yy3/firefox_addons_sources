//Заполнение паспортных данных

function injectQuickReservationData(selInsert, func) {
    $$('[id*="frow"][id*="person"]').forEach((panel) => {
        if (!panel.nextElementSibling.querySelector(selInsert)) {
            panel.after(func({
                addTag: 'tr',
                style: ""
            }));
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    setInputValues(div, [
        'input[id^="name"]', passport.name,
        'input[id^="sname"]', passport.surname,
        'input[id^="pserial"]', passport.serial,
        'input[id^="pno"]', passport.number
    ], errors)

    setSelectIndex(div, [
        'select[id^="day"]', {value: String(parseInt(data.birthday.value.day)), caption: 'День рождения'},
        'select[id^="month"]', {value: data.birthday.value.month, caption: 'Месяц рождения'},
        'select[id^="year"]', {value: data.birthday.value.year, caption: 'Год рождения'},
        'select[id^="gender"]', {value: data.sex.value === "1" ? 'E' : "K", caption: 'Пол'}
    ], errors, null, true)

    const passengerIndex = (div.id.match(/person(\d+)/) || [])[1];
    if ( passengerIndex !== undefined ) {
        setSelectIndex(document, [
            `select[id^="pcitizencountry${passengerIndex}"]`, data.nationalityEng,
        ], errors)
        setSelectIndex(document, [
            `select[id^="peday${passengerIndex}"]`, {
                value: String(parseInt(passport.expire.value.day)), caption: 'Паспорт дата'
            },
            `select[id^="pemonth${passengerIndex}"]`, {
                value: String(parseInt(passport.expire.value.month)), caption: 'Паспорт дата'
            },
            `select[id^="peyear${passengerIndex}"]`, {value: passport.expire.value.year, caption: 'Паспорт дата'},
        ], errors, null, true)
    }
}

function getPassengerRowBySelect(select) {
    return select.closest('tr.qq-select').previousElementSibling
}
