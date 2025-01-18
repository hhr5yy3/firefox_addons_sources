window.OPERATOR_NAME = window.operators ? window.operators[window.location.hostname] || "Unknown" : "Unknown";

function injectQuickReservationData(selInsert, func) {
    const elements = $$('tr.responsive-tr[class*="client"]');
    elements.forEach((element) => {
        if (element.nextElementSibling && !element.nextElementSibling.closest(selInsert)) {
            const row = document.createElement('tr');
            row.classList.add(selInsert.replace(".", ""));
            const td = func({
                addTag: "td"
            })
            td.setAttribute('colspan', '4');
            row.append(td);
            element.after(row);

        }
    });
}

function pasteOrderData(div, data, passport, errors) {
    setInputValues(div, [
         'input[name="passenger[][surname]"]', passport.surname,
        'input[name="passenger[][name]"]', passport.name,
        'input[name="passenger[][birth_date]"]', customDateToFullString(data.birthday),
        'input[name="passenger[][passport_nr]"]', passport.fullNumber,
        'input[name="passenger[][passport_expiration_date]"]', customDateToFullString(passport.expire),
        'input[name="passenger[][idn]"]', data.inn,
        'select[name="passenger[][category_client_id]"]',data.sex

        ], errors
    );

    setSelectIndex(div, [
        'select[name="passenger[][nationality]"]',data.nationalityEng
    ], errors)
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            sex.value = "1";
            break;
        case "2" :
            sex.value = "2";
            break;
    }
    return sex;
}

function getPassengerRowBySelect(select) {
    return select.closest('tr').previousElementSibling;
}
