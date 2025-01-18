//Заполнение паспортных данных
window.OPERATOR_NAME = "Agentskiy";

function injectQuickReservationData(selInsert, func) {
    $$('section.js-checkout-customer').forEach((panel) => {
        if (!panel.querySelector(selInsert)) {
            panel.append(func({
                style: "margin-top: 15px;"
            }));
        }
    });
}

async function pasteOrderData(panel, data, passport, errors) {
    setInputValues(panel, [
            ".js-passInfo__passenger__label_birthDate input", customDateToFullString(data.birthday),
            ".js-passInfo__passenger__label_docExpiryDate input", customDateToFullString(passport.expire),
            ".js-passInfo__passenger__label_lastName input", passport.surname,
            ".js-passInfo__passenger__label_firstName input", passport.name,
            ".js-passInfo__passenger__label_docNumber input", { value: passport.serial.value + passport.number.value, caption: 'Серия и номер'},
            ".js-passInfo__passenger__label_email input", data.email
        ], errors, ['keyup'], ['focus'], true
    );
    const nationalityContainer = panel.querySelector('.js-passInfo__passenger__label_nationality');
    const dropdownNatElement = nationalityContainer.querySelector('a.chosen-single');
    if (dropdownNatElement ) {
        simulateMouseEvent(dropdownNatElement, ['mousedown', 'mouseup']);
        await waitingFor(()=>null, 50, 3);
        const nationality = $$('.js-passInfo__passenger__label_nationality .chosen-results li', panel).find(li => {
            return getText(li).match(new RegExp(data.nationality.value, 'i'))
        });
        await waitingFor(() => null, 50, 3);
        if (nationality) {
            simulateMouseEvent(nationality, ['mouseup', 'click'])
        } else {
            errors.push('Гражданство')
        }
    }

    const gender = $$('.js-passInfo__passenger__label_gender div.nemo-checkout-customer__field_switch__block__option', panel);
    data.sex.value === '1' && gender.length > 1 ? gender[0].click() : null;
    data.sex.value === '2' && gender.length > 1 ? gender[1].click() : null;

}

function getPassengerRowBySelect(select) {
   return select.closest('section')
}
