window.OPERATOR_NAME = "FUN&SUN";

console.log('Loaded passport')

function injectQuickReservationData(selInsert, func) {
    const elements = $$(".members-form .info");
    elements.forEach((element) => {
        if (!element.querySelector(selInsert)) {
            const div = document.createElement("div");
            div.append(func({
                addTag: "div"
            }));
            element.append(div);
        }
    });
}

function getInput(caption, div) {
    const fields = $$('fieldset', div);
    const field = fields.find(f => getText(f).match(caption));
    if (field) {
        return $1('input', field.closest('div'))
    }
    return null;
}

function pasteOrderData(div, data, passport, errors) {
    setInputValues(div, [
        getInput(/Фамилия по-латински/i, div), data.internationalPassport.surname,
        getInput(/Имя по-латински/i, div), data.internationalPassport.name,
        getInput(/Фамилия по-русски/i, div), data.nationalPassport.surname,
        getInput(/Имя по-русски/i, div), data.nationalPassport.name,
        getInput(/Отчество по-русски/i, div), data.nationalPassport.secondName,
        getInput(/Дата рождения/i, div), customDateToFullString(data.birthday),
        getInput(/Телефон/i, div), {
            value: (data.phones.mobile.value || '').replace(/\D+/g, ''),
            caption: data.phones.mobile.caption
        },
        getInput(/E-Mail/i, div), data.email,
        getInput(/Серия документа/i, div), passport.serial,
        getInput(/Номер документа/i, div), passport.number,
        getInput(/Действителен до/i, div), customDateToFullString(passport.expire),
        ], errors, ['blur'], ['focus'], true
    );

    errors.push('Пол', "Гражданство", "Тип документы")
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            sex.value = "Мужской";
            break;
        case "2" :
            sex.value = "Женский";
            break;
    }
    return sex;
}

function getPassengerRowBySelect(select) {
    return select.closest('.members-form')
}
