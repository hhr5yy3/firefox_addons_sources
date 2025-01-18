window.OPERATOR_NAME = "Travelline";

function injectQuickReservationData(selInsert, func) {
    const elements = $$("#guestForm");
    elements.forEach((element) => {
        if ( !element.querySelector(selInsert) ) {
            const div = document.createElement("div");
            div.classList.add('qq');
            div.style.marginLeft = '16px';
            div.append(func({
                addTag: "div",
            }));
            element.prepend(div);
        }
    });
}

async function pasteOrderData(div, data, passport, errors) {
    fillInputs(div, data, passport, errors);
  //  await fillSelects(div, data, passport, errors)
    // await fillSelects(div, data, passport, errors);

}

function fillInputs(div, data, passport, errors) {
    setInputValues(div, [
            'input[name="surname"]', passport.surname,
            'input[name="givenName"]', passport.name,
            'input[name="middleName"]', passport.secondName,
            '[name="birthdate"] input', customDateToFullString(data.birthday),
            'input[name="email_0"]', data.email,
            'input[name="phone_0"]', data.phones.mobile,
        ], errors, ['input', 'change', 'blur'],['focus', 'click'],
    );

}

async function fillSelects(div, data, passport, errors) {
    const dataAndSelectors = [{data: data.nationality,selector: '[name="country"] x-button'}]
    const select = $1(dataAndSelectors[0].selector);
    //console.log(select);
    const allEvents = Object.keys(window).map(key => {
        if ( /^on/.test(key) ) {
            return key.slice(2);
        }
    }).filter(e=>e);
    simulateMouseEvent(select, ['mousedown'])
}


function mapSex(sex) {
    switch ( sex.value ) {
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
    return select.closest('#guestForm')
}
