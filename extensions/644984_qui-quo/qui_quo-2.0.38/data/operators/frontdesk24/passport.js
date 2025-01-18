window.OPERATOR_NAME = "frontdesk24";

function injectQuickReservationData(selInsert, func) {
    const table = $first('#ASPxGridViewGuests_DXEditingRow');
    if ( table && !table.querySelector(selInsert) ) {
        const div = table.querySelector('.dxgvEditFormTable')
        div.after(func({
            addTag: "div",
            style: "color:#413184;font-size: 14px;",
            legendStyle: "font-size: 14px;margin-bottom: 0px;border-bottom: none;"
        }))
    }
}

async function pasteOrderData(form, data, passport, errors) {
    const age = ageFromDate(customDateToFullString(data.birthday).value, new Date().toLocaleDateString('ru'));
    setInputValues(form, [
        '[name$="TextBoxSurname"]', passport.surname,
        '[name$="DXEditor6"]', passport.name,
        '[name$="DXEditor8"]', passport.secondName,
        '[name$="TextBoxEmail"]', data.email,
        '[name$="ASPxTextBoxPhone"]', data.phones.mobile,
        '[name$="DXEditor15"]', getDocType(form),
        '[name$="DXEditor0"]', passport.serial,
        '[name$="DXEditor1"]', passport.number,
        '[name$="DXEditor22"]', {value: age, caption: 'Возраст'},
        '[name$="ClientPassportGetByCode"]', passport.authorityCode
    ], errors, ['change'], ['click', 'input'])
    setInputValues(form, [
        '[name$="ClientPassportGetBy"]', passport.authority
    ], errors, ['change', 'blur', 'click'], ['focus', 'input', 'keydown'])

    const sexInput = form.querySelector(`input[name$="rblSomeRBL"][value="${mapSex(data.sex)}"]`);
    if ( sexInput ) {
        sexInput.click();
    }


    const birthInput = form.querySelector('[name$="DXEditor5"]');
    if ( birthInput ) {
        birthInput.value = customDateToFullString(data.birthday).value;
        await waitingFor(() => null, 150, 1)
        birthInput.focus();
    }

    await waitingFor(()=>null, 150, 1)
    const issueInput = form.querySelector('[name$="DXEditor16"]');
    if ( issueInput ) {
        issueInput.value = customDateToFullString(passport.issueDate).value;
        await waitingFor(() => null, 150, 1)
        issueInput.focus();
    }
}

function getDocType(form) {
    const select = form.querySelector(".qq-select select");
    const value = select.options[select.selectedIndex].parentNode.label;
    return {
        value: value,
        caption: "Тип документа"
    };
}

function getPassengerRowBySelect(select) {
    return select.closest('#ASPxGridViewGuests_DXEditingRow');
}

function mapSex(sex) {
    switch ( sex.value ) {
        case "1" :
            return "1";
        case "2" :
            return "0";
        default  :
            return "WRONG";
    }
}
