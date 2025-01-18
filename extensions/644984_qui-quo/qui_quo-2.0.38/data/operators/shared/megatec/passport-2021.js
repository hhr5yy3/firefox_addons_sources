//Заполнение паспортных данных
window.OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || window.OPERATOR_NAME : window.OPERATOR_NAME;

function injectQuickReservationData(selInsert, func) {
    $$( ".treveler-data-block .treveler-form-wrap").forEach((panel) => {
        if (!panel.querySelector(selInsert)) {
            panel.append(func({
                tagStyle: "float: left",
                selectStyle: "float:left",
                legendStyle: "font-size:initial;"
            }));
        }
    });
}

function pasteOrderData(form, data, passport, errors) {
    setInputValues(form, [
            (findInput(form, /Фамилия/i)), passport.surname,
            (findInput(form, /Имя/i)), passport.name,
            (findInput(form, /Дата рождения/i)), customDateToFullString(data.birthday),
            (findInput(form, /Паспорт/i)), passport.serial,
            (findInput(form, /Паспорт/i)).closest('.form-input').querySelector('.input-2 input'), passport.number,
            (findInput(form, /Действителен до/i)), customDateToFullString(passport.expire),
            (findInput(form, /телефон/i)), data.phones.mobile,
            (findInput(form, /e-mail/i)), data.email,
            (findInput(form, /ИНН/i)), data.inn
        ], errors, ["change", "blur", "focus", "input"]
    );
    const nationality = $$('div.item', findInput(form, /Гражданство/i).closest('.form-auto-complete'))
        .find(n => getText(n).match(new RegExp(data.nationality.value, 'i')));
    if (nationality) {
        nationality.click();
    } else {
        errors.push('Национальность')
    }

    const sex = $$('div.item', findInput(form, /пол/i).closest('.form-auto-complete'))
        .find(n => getText(n).match(new RegExp(mapSex(data.sex.value), 'i')));
    if (sex) {
        sex.click();
    } else {
        errors.push('Пол')
    }
}

function findInput(div, labelString) {
    const label = $$( ".input-label", div).find(label => {
        return label.textContent.match(labelString);
    });
    if ( !label ) {
        return null;
    }
    return label.closest('.form-input, .form-auto-complete').querySelector('input');
}

function mapSex(sex) {
    switch (sex) {
        case "1" :
            return 'М';
        case "2" :
            return 'Ж';
    }
    return "none";
}

function getPassengerRowBySelect(select) {
    return select.closest(".treveler-form-wrap");
}

function parsePassengers() {
    try {
        const tourists = $$('.treveler-data-block .treveler-form-wrap');
        return tourists.map(form => {
            return new Passenger({
                lastName: getNodeProperty((findInput(form, /Фамилия/i)), null, 'value'),
                firstName: getNodeProperty((findInput(form, /Имя/i)), null, 'value'),
                birthday: getNodeProperty((findInput(form, /Дата рождения/i)), null, 'value'),
                expire: getNodeProperty((findInput(form, /Действителен до/i)), null, 'value'),
                serial: getNodeProperty((findInput(form, /Паспорт/i)), null, 'value'),
                number: getNodeProperty((findInput(form, /Паспорт/i)).closest('.form-input').querySelector('.input-2 input'), null, 'value'),
                email: getNodeProperty((findInput(form, /e-mail/i)), null, 'value'),
                phone: getNodeProperty((findInput(form, /телефон/i)), null, 'value'),
                inn: getNodeProperty((findInput(form, /ИНН/i)), null, 'value')
            }, form)
        })
    } catch (e) {
        return [];
    }

}
