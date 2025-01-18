window.OPERATOR_NAME = "Euroins";

function injectQuickReservationData(selInsert, func) {
    const elements = $$('[ui-view="insurantNaturalPerson"], [ng-repeat="item in vzrParams.insuredPersons"]');
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

function pasteOrderData(div, data, passport, errors) {
    setInputValues(div, [
            'input[ng-model="vzrParams.insurant.full_name"]', {
                value: passport.surname.value + ' ' + passport.name.value,
                caption: "ФИО"
            },
            'input[name="insurant_birth_date"]', customDateToFullString(data.birthday),
            'input[ng-model="vzrParams.insurant.passport.series"]', passport.serial,
            'input[ng-model="vzrParams.insurant.passport.number"]', passport.number,
            'input[name="insurant_phone"]', {value: data.phones.mobile.value.replace(/^7/, ''), caption: 'Телефон'},
            'input[ng-model="vzrParams.insurant.address_registration.address_query"]', data.address
        ], errors, ['click', 'focus', 'input'], ['change', 'blur'], true
    );
    const nationalityItems = $$('[ng-model="vzrParams.insurant.citizenship"] .item', div);
    if ( nationalityItems.length > 0 ) {
        const foundItem = nationalityItems.find((item) =>{
            return item.dataset.value.match(new RegExp(data.nationality.value, 'i'))
        })
        if ( foundItem ) {
            foundItem.click();
        } else {
            errors.push("Гражданство");
        }
    }

    setInputValues(div, [
            'input[ng-model="item.last_name"]', passport.surname,
            'input[ng-model="item.first_name"]', passport.name,
            'input[name="insured_birth_date"]', customDateToFullString(data.birthday),
            'input[name="insured_international_passport_series_number"]', passport.fullNumber
        ], errors, ['click', 'focus', 'input'], ['change', 'blur'], true
    );
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
    return select.closest('[ui-view="insurantNaturalPerson"], [ng-repeat="item in vzrParams.insuredPersons"]')
}
