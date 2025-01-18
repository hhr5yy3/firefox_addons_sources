function injectQuickReservationData(selInsert, func) {
    const tables = querySelectorAll(document, "[data-basket='touristas'] .tour-basket__data__item .tour-basket__data__col-1");
    tables.forEach((table) => {
        if ( !table.querySelector(selInsert) ) {
            table.append(func({
                addTag: "div",
                legendStyle: 'font-size: 12px;margin-bottom:3px;',
                style: "margin-bottom: -40px; margin-top:10px"
            }));
        }
    });
}

function pasteOrderData(touristNode, data, passport, errors) {
    const sex = mapSex(data.sex);
    if ( sex ) {
        const sexNode = touristNode.querySelector(`[data-value="${sex}"]`);
        if ( sexNode ) {
            sexNode.click();
        }
    } else {
        errors.push("Пол")
    }
    setInputValues(touristNode, [
            "input[data-basket-pitem='surname']", passport.surname,
            "input[data-basket-pitem='name']", passport.name,
            "input[data-basket-pitem='serie']", passport.serial,
            "input[data-basket-pitem='number']", passport.number,
            "input[data-basket-pitem='birthday']", customDateToFullString(data.birthday),
            "input[data-basket-pitem='dateTake']", customDateToFullString(passport.issueDate),
            "input[data-basket-pitem='dateIssue']", customDateToFullString(passport.expire),
            "input[data-basket-pitem='tekan']", passport.authority
        ], errors, ["blur"]
    );
}

function getPassengerRowBySelect(select) {
    let elem = select.parentNode;
    while (elem) {
        if ( elem.classList.contains("tour-basket__data__item") ) {
            break;
        }
        elem = elem.parentNode;
    }
    return elem;
}

function mapSex(sex) {
    if ( !sex ) {
        return null;
    }
    switch (sex.value) {
        case "1" :
            return "man";
        case "2" :
            return "woman";
        default  :
            return null;
    }
}
