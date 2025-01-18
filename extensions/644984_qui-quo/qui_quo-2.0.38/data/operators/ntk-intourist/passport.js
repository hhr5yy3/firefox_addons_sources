function injectQuickReservationData(selInsert, func) {
    const divsWithSep = querySelectorAll(document, ".tourist-form .sep");
    divsWithSep.forEach((div) => {
        if ( !div.parentNode.querySelector(selInsert) ) {
            div.before(func({
                addTag: "div",
                selectStyle: "width: auto;"
            }));
        }
    });
    const divs = querySelectorAll(document, ".tourist-form, app-customer");
    divs.forEach((div) => {
        if ( !div.querySelector(selInsert) ) {
            div.append(func({
                addTag: "div",
                selectStyle: "width: auto;"
            }));
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    const docType = getDocType(div, passport);
    const labels = $$('label', div);
    if (!setCustomSelectOptions(div, '[formcontrolname="personalDocumentType"]', docType, errors)) {
        setCustomSelectOptions(div, findSelectByLabel(labels, /тип документа/i), docType, errors)
    }
    await waitingFor(waitingForLoad, 100, 100);

    setInputValues(div, [
            "input[formcontrolname='personalDocumentValidTill']", {
                value: customDateToFullString(passport.expire).value,
                caption: "Действителен до"
            },
        ], errors, ["click", "focus", "input", "change", "blur", "afterKeydown"]
    );
    await waitingFor(waitingForLoad, 100, 100);

    setInputValues(div, [
            "input[formcontrolname='lastName']", passport.surname,
            "input[formcontrolname='firstName']", passport.name,
            "input[formcontrolname='patronymic']", data.secondName,
            "input[name='fullName']", passport.fio,
             'input[name="registrationAddress"]', data.address,
            "input[formcontrolname='birthDate']", {
                value: customDateToFullString(data.birthday).value,
                caption: "Дата рождения"
            },
            "input[formcontrolname='email'], input[name='email']", data.email,
            "input[formcontrolname='phoneNumber'], input[name='phoneNumber']", {value: "+" + data.phones.mobile.value, caption: "Телефон"},
        ], errors, ["click", "focus", "input", "change", "blur", "afterKeydown"]
    );
    await waitingFor(waitingForLoad, 100, 100);

    setInputValues(div, [
            "input[formcontrolname='personalDocumentSeries']", passport.serial,
            "input[formcontrolname='personalDocumentNumber']", passport.number,
            findSelectByLabel(labels, /серия/i), passport.serial,
            findSelectByLabel(labels, /номер/i), passport.number,
            "input[formcontrolname='personalDocumentValidTill']", {
                value: customDateToFullString(passport.expire).value,
                caption: "Действителен до"
            },
        ], errors, ["click", "focus", "input", "change", "blur", "afterKeydown"]
    );

    // await waitingFor(waitingForLoad, 100, 100);
    // setInputValues(div, [
    //         "input[formcontrolname='birthDate']", {
    //             value: customDateToFullString(data.birthday).value,
    //             caption: "Дата рождения"
    //         }
    //     ], errors, ["click", "focus", "input", "change", "blur", "afterKeydown"]
    // );
    await waitingFor(waitingForLoad, 100, 100);
    await waitingFor(()=>null, 100, 10);
    const sex = mapSex(data.sex);
    setCustomSelectOptions(div, '[formcontrolname="genderType"]', sex, errors);
    setCustomSelectOptions(div, findSelectByLabel(labels, /гражданство/i), data.nationality, errors)

}

function waitingForLoad() {
    const overlay = document.querySelector('.cdk-overlay-pane');
    return overlay ? !(overlay.clientHeight > 0) || null:  true
}

function setCustomSelectOptions(div, selector, key, errors) {
    const docSelect = typeof selector === 'string'  ? div.querySelector(selector) : selector;
    if ( !docSelect || !key || !key.value ) {
       return;
    }
    docSelect.click();
    const selectPanel = document.querySelector(".mat-select-panel");
    const panelDocOption = querySelectorAll(selectPanel, ".mat-option").find(option => getText(option).toUpperCase().match(key.value.toUpperCase()));
    panelDocOption ? panelDocOption.click() : errors.push(key.caption);
    return true;
}

function findSelectByLabel(labels, caption) {
    const label = labels.find(label => {
        return label.textContent.match(caption);
    });
    return label ? $1('mat-select', label.parentNode) || $1('input', label.parentNode) : null;
}

function getDocType(form, passport) {
    var select = form.querySelector(".qq-select select");
    var value = select.options[select.selectedIndex].parentNode.label;
    switch ( value ) {
        case "Внутренний паспорт" :
            value = "Паспорт РФ";
            break;
        case "Заграничный паспорт" :
            value = "Загран паспорт РФ";
            break;
    }
    if ( passport.docType === "birthday_certificate" ) {
        value = "Свидетельство о рождении";
    }
    return {
        value: value,
        caption: "Тип документа"
    };
}

function getPassengerRowBySelect(select) {
    let div = select.parentNode;
    while (div) {
        if ( div.classList.contains("tourist-form") || div.tagName === 'APP-CUSTOMER' ) {
            break;
        }
        div = div.parentNode;
    }
    return div;
}

function mapSex(sex){
    switch (sex.value) {
        case "1" :
            sex.value = "М";
            break;
        case "2" :
            sex.value = "Ж";
            break;
    }
    return sex;
}
