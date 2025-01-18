function injectQuickReservationData(selInsert, func) {
    var divs = querySelectorAll(document, ".b-tour__tourists .b-field-list");
    divs.forEach((div) => {
        if ( !div.querySelector(selInsert) ) {
            div.append(func({
                addTag: "div",
                style: "color:black;font-size:12px",
                selectStyle: "color:black;font-size:12px"
            }));
        }
    });
}

function pasteOrderData(div, data, passport, errors) {
    setInputValues(div, [
            "input[id*='lnamec']", data.surname,
            "input[id*='fnamec']", data.name,
            'input[id*="patrc"]', data.secondName,
            "input[id*='lnamel']", passport.surname,
            "input[id*='fnamel']", passport.name,
            "input[id*='pasps']", passport.serial,
            "input[id*='paspn']", passport.number,
            "input[id*='birth']", customDateToFullString(data.birthday),
            "input[id*='paspd']", customDateToFullString(passport.expire)
        ], errors
    );

    setSex(div, data.sex, errors);
}

function getPassengerRowBySelect(select) {
    var elem = select.parentNode;
    while (elem) {
        if ( elem.classList.contains("b-field-list") ) {
            break;
        }
        elem = elem.parentNode;
    }
    return elem;
}

function setSex(div, sex, errors) {
    if ( sex.value === "0") {
        errors.push(sex.caption);
        return;
    }
    if ( sex.value=== "1" ) {
        var  male = div.querySelector("[value='M']");
        male ? male.click() : null;
        return;
    }
    if ( sex.value=== "2" ) {
        var female = div.querySelector("[value='F']");
        female ? female.click() : null;
        return;
    }
}