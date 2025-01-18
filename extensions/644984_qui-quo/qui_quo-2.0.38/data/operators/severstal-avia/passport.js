window.OPERATOR_NAME = "Severstal Avia";
console.log('Loaded Severstal Avia');

function injectQuickReservationData(selInsert, func) {
    const elements = $$('.passengerForm__js .passengerInfo tbody, .customerForm__js tbody');
    elements.forEach((element) => {
        if (!element.querySelector(selInsert)) {
            const row = document.createElement("tr");
            const td = func({
                addTag: "td"
            })
            td.setAttribute('colspan', '4');
            row.append(td);
            element.append(row);
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    const docTypeSelect = $1('[ng-model="passenger.documentType"]', div)
    if (docTypeSelect) {
        $1('.selectize-input', docTypeSelect).click();
        await waiting(100);
        const docType = getDocType(div, passport);
        const gender = $$('[role="option"]', docTypeSelect).find(o => getText(o).match(new RegExp(docType.value, 'i')))
        if (gender) {
            gender.click();
        }
    }
    await waiting(100);
    setInputValues(div, [
            'input[name="lastName"]', passport.surname,
            'input[name="firstName"]', passport.name,
            'input[name="dateOfBirth"]', customDateToFullString(data.birthday),
            'input[name="documentNumber"]', passport.fullNumber,
            'input[name="documentDate"]', customDateToFullString(passport.expire),
            'input[name="email"]', data.email,
        ], errors, ['change', 'blur'], ['click', 'focus', 'input'], true
    );
    setInputValues(div, [
        'input[name="phone"]', data.phones.mobile,
        ], errors, ['change', 'blur'], []
    );

    const genderSelect = $1('[ng-model="passenger.gender"]', div)
    if (genderSelect) {
        $1('.selectize-input', genderSelect).click();
        await waiting(100);
        const sex = mapSex(data.sex);
        const gender = $$('[role="option"]', genderSelect).find(o => getText(o).match(new RegExp(sex.value, 'i')))
        if (gender) {
            gender.click();
        }
    }
}

function getDocType(div, passport) {
    var select = div.querySelector(".qq-select select");
    var value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт" :
            if (passport.docType === "birthday_certificate") {
                value = "Свидетельство о рождении"
            }
            if (passport.docType === "other_passport") {
                value = "Национальный паспорт"
            }

            if (passport.docType === "passport") {
                value = "Паспорт гражданина РФ";
            }
            break;
        case "Заграничный паспорт" :
            value = "Заграничный паспорт гражданина РФ";
            break;
    }
    return {
        value: value,
        caption: "Тип документа"
    };
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            sex.value = "мужской";
            break;
        case "2" :
            sex.value = "женский";
            break;
    }
    return sex;
}

function getPassengerRowBySelect(select) {
    return select.closest('.passengerInfo, .customerForm__js')
}
