//Заполнение паспортных данных
window.OPERATOR_NAME = 'Alfa';

function injectQuickReservationData(selInsert, func) {
    $$('.x-panel.x-box-item')
        .filter(panel => getNodeProperty(panel.querySelector('.x-panel-header-text'), '').match(/Сведения о Страхователе/i))
        .forEach((panel) => {
            if (!panel.querySelector(selInsert)) {
                const body = panel.querySelector('.x-panel-body');
                const wrapper = func({});
                wrapper.style.cssText = `position: absolute;bottom: 4px;right: 10px;max-width:270px;z-index: 99999;background-color: rgb(255 255 255);`;
                body.prepend(wrapper);
            }
        });

    $$('.x-window')
        .filter(window => getNodeProperty(window.querySelector('.x-window-header-text'), '').match(/Добавить застрахованного/i))
        .forEach((window) => {
            if (!window.querySelector(selInsert)) {
                const body = window.querySelector('.x-panel-body');
                const wrapper = func({});
                wrapper.style.cssText = `position: absolute;bottom: 20px;max-width:400px;z-index: 99999;background-color: rgb(255 255 255);`;
                body.prepend(wrapper);
            }
        });
}

function pasteOrderData(panel, data, passport, errors) {
     const touristPhone = data.phones.mobile.value.replace(/\D+/g, '').slice(-10);
    setInputValues(panel,
        [
            'input[name*="insname"]', {
                                        value: passport.name.value + ' ' + passport.surname.value + ' ' + passport.secondName.value,
                                        caption: 'ФИО'},
            'input[name="p_insname_rus"]', {
                                        value: passport.name.value + ' ' + passport.surname.value + ' ' + passport.secondName.value,
                                        caption: 'ФИО'
                                                     },
            'input[name="p_insbd"]', customDateToFullString(data.birthday),
            'input[name="p_insaddr"]', data.address,
            'input[name="p_email"]', data.email,
            'input[name="st_mail"]', data.email,
            'input[name="st_citizenship"]', data.nationality,
            'input[name="p_insdocser"]', passport.serial,
            'input[name="p_insdocnum"]', passport.number,
            'input[name="p_insdocdate"]', customDateToFullString(passport.issueDate),
            'input[name="st_who"]', (passport.authority),
            'input[name="p_sms"]', { value: touristPhone, caption: 'Телефон' },
            'input[name="st_phone"]', {value: touristPhone, caption: 'Телефон'}
        ], errors, ['input','change', 'keydown', 'keyup','blur'], ['focus']);

    setGender(panel, data.sex.value, errors);
    const select = panel.querySelector(".qq-select select");
    let value = select.options[select.selectedIndex].parentNode.label;
    setDocType(panel, value, errors);
    const tourDataNode = $$('.x-panel.x-box-item')
                         .find(panel => getNodeProperty($first('.x-panel-header-text', panel), '').match(/Сведения о поездке/i));
    if ( tourDataNode ) {
        setInputValues(tourDataNode,[
                'input[name="p_start"]', customDateToFullString(data.tourStartDate),
                'input[name="p_finish"]', customDateToFullString(data.tourEndDate),
                'input[name="p_days"]', {value: 1+getDistance(customDateToFullString(data.tourStartDate).value, customDateToFullString(data.tourEndDate).value), caption: 'Дней'}
            ], errors);
    }
}

function setGender(panel, sex, errors) {
    if (!sex) {
        errors.push('Пол');
        return;
    }
    const input = panel.querySelector('input[name="p_gender"], input[name="str_gender"]');
    setSelectValue(input, mapSex(sex))
}

function setDocType(panel, type, errors) {
    if (!type) {
        errors.push('Документ ТИП');
        return;
    }
    const input = panel.querySelector('input[name="p_insdoc"]');
    setSelectValue(input, mapType(type))
}

function mapType(type) {

    if (type === 'Заграничный паспорт') {
        return 'Загранпаспорт гражданина Российской Федерации';
    }
    if (type === 'Внутренний паспорт') {
        return 'Паспорт гражданина Российской Федерации';
    }

    if (type === 'Свидетельство о рождении') {
        return 'Иные документы';
    }
    return 'Нет данных';
}

function setSelectValue(input, text) {
    if (input) {
        const tr = input.closest('tr');
        if (tr) {
            const triggerBtn = tr.querySelector('.x-trigger-cell div');
            triggerBtn.click();
            const genderUl = $$('li.x-boundlist-item').filter(n => n.clientHeight > 0).find(n => {
                return getText(n) === text;
            });
            if (genderUl) {
                genderUl.click();
            }
        }
    }
}

function mapSex(sex) {
    if ( sex === '1') {
        return 'Муж.';
    }
    if (sex === '2') {
        return 'Жен.';
    }
    return null;
}

function getPassengerRowBySelect(select) {
    return select.closest('.x-box-item, .x-window');
}
