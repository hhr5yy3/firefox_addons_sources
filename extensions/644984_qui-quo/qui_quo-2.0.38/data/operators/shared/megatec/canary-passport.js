
function injectQuickReservationData(selInsert, func) {
    const forms = $$( ".treveler-form-wrap, .traveler-form-wrap");
    forms.forEach((form) => {
        if ( !form.querySelector(selInsert) ) {
            form.append(func({
                legendStyle: 'font-size: 12px;margin-top:3px;',
                style: 'margin-top: 6px;'
            }));
        }
    });
}

async function pasteOrderData(touristNode, data, passport, errors) {
    const fields = $$('.form-input, .form-auto-complete', touristNode);
    const findInputByCaption = (caption)=> {
        const filed = fields.find(f => {
            const labelText = getNodeData('.input-label', f);
             return labelText ? labelText.match(caption) : null;
        })
        if ( filed ) {
            return $first('input', filed);
        }

    }

    const nationalityInput = findInputByCaption(/Гражданство/i);
    simulateEvent(nationalityInput, ['focus', 'input', 'click']);
    setSelect(data.nationality.value, nationalityInput, errors);
    const sexInput = findInputByCaption(/Пол/i);
    simulateEvent(sexInput, ['focus', 'input', 'click']);
    setSelect(mapSex(data.sex.value), sexInput, errors);

    const passportInput = findInputByCaption(/Паспорт/i);
    const [serial, number] = passportInput ? $$('input', passportInput.closest('.form-input')) : [] ;

    setInputValues(touristNode, [
        findInputByCaption(/Фамилия/i), passport.surname,
        findInputByCaption(/Имя/i), passport.name,
        findInputByCaption(/Отчество/i), data.secondName,
        findInputByCaption(/Дата рождения/i), customDateToFullString(data.birthday),
        findInputByCaption(/Действителен/i), customDateToFullString(passport.expire),
        findInputByCaption(/выдан/i), passport.authority,
        findInputByCaption(/E-mail/i), data.email,
        serial, passport.serial,
        number, passport.number,
        findInputByCaption(/Телефон/i), data.phones.mobile

    ], errors, "blur", 'focus', true);
    await waiting(150)
    setInputValues(touristNode, [
        number, passport.number,

    ], errors, "blur", 'focus', true);



}

function setSelect(value, input, errors) {
    if ( value && value.match(/Росс/i) ) {
        value = 'Российская федерация'
    }
    if ( !input ) {
        return;
    }
    const divs = $$('div .list .item',input.closest('.field-wrap'));
    const div = divs.find(div => getText(div).match(new RegExp(value, 'i')));
    if ( div ) {
        div.click();
        return;
    }
    errors.push('Гражданство')
}

function getPassengerRowBySelect(select) {
    return select.closest('.treveler-form-wrap, .traveler-form-wrap');
}

function mapSex(sex) {
    if ( !sex ) {
        return null;
    }
    switch ( sex ) {
        case "1" :
            return 'М';
        case "2" :
            return 'Ж';
        default  :
            return null;
    }
}
