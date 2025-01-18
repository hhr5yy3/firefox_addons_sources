window.OPERATOR_NAME = "Тари Тур";

function injectQuickReservationData(selInsert, func) {
    $$('[class*="order-pers-in-room"]').forEach(person => {
        if ( person && !person.querySelector(selInsert) ) {
            person.prepend(func({
                addTag: "div",
                style: "font-size:12px;",
                legendStyle: "font-size:12px;",
                selectStyle: "width: 60%"
            }));
        }
    });
}

function pasteOrderData(div, data, passport, errors) {
   setInputValues(div, [
        'input[name*="\[Name\]"]', {value: [passport.surname.value, passport.name.value, passport.secondName.value].join(' '), caption: 'Фамилия Имя Отчество'},
        'input[name*="\[Birthday\]"]', customDateToFullString(data.birthday),
   ], errors)

}

function getPassengerRowBySelect(select) {
    return select.closest('[class*="order-pers-in-room"]')
}
