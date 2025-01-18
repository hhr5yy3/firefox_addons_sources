//Заполнение паспортных данных
window.OPERATOR_NAME = "Кандагар";

function injectQuickReservationData(selInsert, func) {
    $$(".tourist_list .tourist_block").forEach((panel) => {
        if ( !panel.querySelector(selInsert) ) {
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
        'input.t_fio', passport.surname,
        'input.t_name', passport.name,
        'input.t_otchestvo', passport.secondName,
        'input.t_pasposrt, input.t_passport', {value: passport.serial.value+passport.number.value, caption: 'Паспорт'},
        'input.t_birthday', customDateToFullString(data.birthday),
        'input.t_nationality', data.nationality,
        'input.t_get_pasport, input.t_get_passport', customDateToFullString(passport.issueDate),
        'input.t_who_publish_pasport', passport.authority

    ])


    const sex = $$('[data-gender]', form)
        .find(n => getText(n).match(new RegExp(mapSex(data.sex.value), 'i')));
    if ( sex ) {
        sex.click();
    } else {
        errors.push('Пол')
    }
}


function mapSex(sex) {
    switch ( sex ) {
        case "1" :
            return 'М';
        case "2" :
            return 'Ж';
    }
    return "none";
}

function getPassengerRowBySelect(select) {
    return select.closest(".tourist_block");
}
