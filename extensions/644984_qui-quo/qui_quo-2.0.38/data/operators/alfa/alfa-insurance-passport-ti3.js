//Заполнение паспортных данных
window.OPERATOR_NAME = 'Alfa';

function injectQuickReservationData(selInsert, func) {
    const cards = $$('form .card')
        .filter(panel => getNodeProperty(panel.querySelector('.card-header'), '').match(/Страхователь/i))

    cards.forEach((panel) => {
        if ( !panel.querySelector(selInsert) ) {
            const wrapper = func({legendStyle: 'font-size:1rem'});
            wrapper.style.cssText = `margin:8px;`;
            panel.append(wrapper);
        }
    });

    const cardsModal = $$('#insuredform')
    cardsModal.forEach((panel) => {
        if ( !panel.querySelector(selInsert) ) {
            const wrapper = func({legendStyle: 'font-size:1rem'});
            wrapper.style.cssText = `margin:8px;`;
            panel.append(wrapper);
        }
    });

}

function pasteOrderData(panel, data, passport, errors) {
    const touristPhone = data.phones.mobile.value.replace(/\D+/g, '').slice(-10);
    const select = panel.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    setDocType(panel, value, errors);
    setInputValues(panel,
        [
            'input[name="ST_FIO"]', {
            value: data.internationalPassport.name.value + ' ' + data.internationalPassport.surname.value + ' ' + data.internationalPassport.secondName.value,
            caption: 'ФИО'
        },
            'input[name="ST_FIO_RUS"]', {
            value: data.nationalPassport.name.value + ' ' + data.nationalPassport.surname.value + ' ' + data.nationalPassport.secondName.value,
            caption: 'ФИО'
        },
            'input[name="insurant_name"]', {
            value: passport.name.value + ' ' + passport.surname.value + ' ' + passport.secondName.value,
            caption: 'ФИО'
        },
            'input[name="ST_DR"], input[name="insurant_bd"]', customDateToFullString(data.birthday),
            'input[name="ST_Address"]', data.address,
            'input[name="ST_Mail"], input[name="insurant_email"]', data.email,
            'input[name="ST_Citizenship"]', data.nationality,
            'input[name="ST_DocSer"], input[name="insurant_series"]', passport.serial,
            'input[name="ST_DocNum"], input[name="insurant_number"]', passport.number,
            'input[name="ST_DocDate"]', customDateToFullString(passport.issueDate),
            'input[name="ST_DocIssuer"]', (passport.authority),
            'input[name="ST_Phone"], input[name="insurant_phone"]', {value: touristPhone, caption: 'Телефон'},
        ], errors, ['input', 'change', 'keydown', 'keyup', 'blur'], ['focus']);

    setSelectIndex(panel, [
            'select[name="ST_Gender"], select[name="insurant_sex"]', {
                value: mapSex(data.sex.value),
                caption: data.sex.caption
            }
        ], errors
    );
}

function setDocType(panel, type, errors) {

    if ( !type ) {
        errors.push('Документ ТИП');
        return;
    }
    const input = panel.querySelector('select[name="ST_Doc"], select[name="insurant_doc"]');
    setSelectIndex(panel, [input,
        {value: mapType(type, panel), caption: 'Тип документа'}], errors)
}

function mapType(type, panel) {
    if ( type === 'Заграничный паспорт' ) {
        return panel.getAttribute('id') !== 'insuredform' ? 'Иные документы' : 'Загранпаспорт гражданина РФ';
    }
    if ( type === 'Внутренний паспорт' ) {
        return panel.getAttribute('id')!== 'insuredform' ? 'Паспорт гражданина Российской Федерации' : 'Паспорт гражданина РФ' ;
    }

    if ( type === 'Свидетельство о рождении' ) {
        return 'Иные документы';
    }
    return 'Нет данных';
}

function mapSex(sex) {
    if ( sex === '1' ) {
        return 'Муж.';
    }
    if ( sex === '2' ) {
        return 'Жен.';
    }
    return null;
}

function getPassengerRowBySelect(select) {
    return select.closest('.card, #insuredform');
}
