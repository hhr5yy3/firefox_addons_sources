window.OPERATOR_NAME = "Travelhub";
console.log('Loaded passport', OPERATOR_NAME)

function injectQuickReservationData(selInsert, func) {
    const elements = $$("#kt_form_edit_client");
    elements.forEach((element) => {
        if (!element.querySelector(selInsert)) {
            const div = document.createElement("div");
            div.append(func({
                addTag: "div",
                legendStyle: "font-size:14px"
            }));
            div.style.marginBottom = '6px';
            element.prepend(div);
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    const sexSelect = $1('select#client-sex');
    if (sexSelect) {
        if (data.sex.value === '1') {
            sexSelect.value = "male";
        }
        if (data.sex.value === '2') {
            sexSelect.value = "female";
        }
        simulateEvent(sexSelect, 'change')
    }

    setSelectIndex(div, ['select#client-nationality', data.nationality], errors);

    await waitingFor(()=>null, 100, 5)

    const plusButton = $1('#client-docs .js-input-plus');
    if (plusButton) {
        plusButton.click()
    }

    setSelectIndex(div, ['select[name*="[kind]"]', getDocType(div, passport)], errors);

    await waitingFor(() => null, 100, 5)

    setInputValues(div, [
            'input#client-birthday', customDateToFullString(data.birthday),
            'input#client-phone', data.phones.mobile,
            "input#client-lastname", data.nationalPassport.surname,
            "input#client-firstname", data.nationalPassport.name,
            "input#client-patronymicname", data.nationalPassport.secondName,
            "input#client-lastnameen", data.internationalPassport.surname,
            "input#client-firstnameen", data.internationalPassport.name,
            "input#client-tin", data.inn,
            "input#client-tin", data.inn,
            "input#client-email", data.email,
            "input#client-address", data.address,
            'input[id*="client-docs"][name*="[number]"]', {
                caption: "Номер документа",
                value: passport.serial.value + passport.number.value
            },
            'input[id*="client-docs"][name*="[issuedAt]"]', customDateToFullString(passport.issueDate),
            'input[id*="client-docs"][name*="[expireAt]"]', customDateToFullString(passport.expire),
        'input[id*="client-docs"][name*="[issuedBy]"]', passport.authority,
        ], errors, [],[], true
    );

}

function getDocType(form, passport) {
    var select = form.querySelector(".qq-select select");
    var value = select.options[select.selectedIndex].parentNode.label;
    switch (value) {
        case "Внутренний паспорт" :
            if (passport.docType === "birthday_certificate") {
                value = "Свидетельство о рождении"
            }
            if (passport.docType === "passport") {
                value = "Паспорт";
            }
            break;
        case "Заграничный паспорт" :
            value = "Заграничный паспорт";
            break;
    }
    return {
        value: value,
        caption: "Тип документа"
    };
}


function getPassengerRowBySelect(select) {
    return select.closest('#kt_form_edit_client')
}
