window.OPERATOR_NAME = "АКАДЕМСЕРВИС";

function injectQuickReservationData(selInsert, func) {
    const elements = $$("input[name*='LastName']").map(input => input.closest('div'));
    elements.forEach((element, index) => {

        if ( !element.nextElementSibling || !element.nextElementSibling.closest(selInsert) ) {
            element.classList.add('qq-pas-row-'+ String(index))
            element.after(func({
                style: 'margin-bottom:6px;zoom:0.9',
                tagStyle: 'margin-bottom:6px;zoom:0.8',
                selectIndex: index
            }));
        }
    });
}

function pasteOrderData(div, data, passport, errors) {
    setInputValues(div, [
            "input[name*='LastName']", passport.surname,
            "input[name*='FirstName']", passport.name,
        ], errors, 'blur', ['focus', 'change'], true
    );
    const nationality = data.nationality.value;
    if ( nationality ) {
        const nationalitySelect = $1('[class*="select_container__citizenship"] input', div);
        simulateEvent(nationalitySelect, ['mousedown', 'focus'])
        const nationalityOptions = $$('.react-select__option', div);
        const foundOption = nationalityOptions.find(option => getText(option).match(new RegExp(nationality, 'i')));
        if ( foundOption ) {
            simulateEvent(foundOption, ['mousedown', 'mouseup', 'click'])
        } else {
            errors.push('Гражданство');
        }
    }

    const title = mapTitle(data.title.value);
    if ( title ) {
        const nationalitySelect = $1('[class*="select_container__category"] input', div);
        simulateEvent(nationalitySelect, ['mousedown', 'focus'])
        const nationalityOptions = $$('.react-select__option', div);
        const foundOption = nationalityOptions.find(option => getText(option).match(new RegExp(title, 'i')));
        if ( foundOption ) {
            simulateEvent(foundOption, ['mousedown', 'mouseup', 'click'])
        } else {
            errors.push('Обращение');
        }
    }

}

function mapTitle(title) {
    switch ( title ) {
        case "Mr" :
            return "господин";
        case "Mrs" :
            return "госпожа";
        case "Child" :
            return "ребёнок";
        case "Infant" :
            return "младенец";
    }
    return title;
}

function getPassengerRowBySelect(select) {
    return document.querySelector(`.qq-pas-row-${select.dataset.selectIndex}`)
}
