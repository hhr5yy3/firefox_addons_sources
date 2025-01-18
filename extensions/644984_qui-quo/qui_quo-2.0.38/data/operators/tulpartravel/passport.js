//Заполнение паспортных данных
window.OPERATOR_NAME = "tulpartravel";
console.log('Loaded quick reservation')

function injectQuickReservationData(selInsert, func) {
    $$( "[id*='belge']").forEach((tourist) => {
        const elem = tourist.closest('.form_element');
        if ( !elem.nextElementSibling.classList.contains('qq-select') && !elem.nextElementSibling.classList.contains('qq-guide') ) {
            elem.after(func({
                addTag: "div",
                style: 'font-size:12px;margin-left: 14px;',
                tagStyle: 'font-size:12px;margin-left: 14px;',
                legendStyle: 'font-size:12px'
            }));
        }
    });
}

function pasteOrderData(select, data, passport, errors) {
    const selects = $$('.qq-select select');
    const inputsIndex = selects.indexOf(select) + 1;
    setInputValues(select,[
        $first(`[id*="frmname${inputsIndex}"]`), passport.name,
        $first(`[id*="frmsname${inputsIndex}"]`), passport.surname,
        $first(`[id*="belge${inputsIndex}"]`), {value: passport.serial.value + passport.number.value, caption: "Номер паспорта"}
        ], errors, "blur", "focus", true)

}

function getPassengerRowBySelect(select) {
    return  select.closest('select');
}
