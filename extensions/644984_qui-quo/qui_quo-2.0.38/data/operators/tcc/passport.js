window.OPERATOR_NAME = 'Tourist Club';
function injectQuickReservationData(selInsert, func) {
    const tables = querySelectorAll(document, 'section.order-form .uk-grid');
    tables.forEach((table) => {
        if ( !table.querySelector(selInsert) && table.querySelector("input[placeholder='IVANOV'], input[placeholder='ИВАНОВ']")) {
            table.append(func({
                addTag: "div",
                style: "font-size:14px",
                legendStyle: "font-size:14px"
            }));
        }
    });
}

async function pasteOrderData(touristNode, data, passport, errors) {
    const sex = mapSex(data.sex);
    if ( sex ) {
        const sexNode = touristNode.parentNode.querySelector(`input[value="${sex}"]`);
        if ( sexNode ) {
            sexNode.click();
        }
    } else {
        errors.push("Пол")
    }

    setInputValues(touristNode, [
            "input[placeholder='IVANOV'], input[placeholder='ИВАНОВ']", passport.surname,
            "input[placeholder='IVAN'], input[placeholder='ИВАН']", passport.name,
            "input[placeholder='FK00001']", {value: passport.serial.value + passport.number.value, caption: "Паспорт"},
            "input[placeholder='УКРАИНА']", data.nationality
        ], errors, ["focus", "input", "change", "keyup","blur"]
    );
    let birthday = touristNode.querySelector('label[for="birthday"]');
    let expire = touristNode.querySelector('label[for="validTill"]');
    if ( birthday && expire ) {
        await datepickerSetValue(passport.expire.value, expire.parentNode.querySelector('input'), errors, "Действителен до")
        setInputValues(touristNode, [
                birthday.parentNode.querySelector('input'), customDateToFullString(data.birthday)
                ], errors, ["input", "change", "keyup","blur"], ["focus"]
        );
    } else {
        setInputValues(touristNode, [
                "input[placeholder='IVANOV'], input[placeholder='ИВАНОВ']", passport.surname,
                "input[placeholder='IVAN'], input[placeholder='ИВАН']", passport.name,
                "input[name='date']", customDateToFullString(data.birthday),
                "input[placeholder='УКРАИНА']", data.nationality,
                "input[placeholder='+380000000001']", data.phones.mobile,
                "input[placeholder='MAIL@EXAMPLE.COM']", data.email,
                "input[placeholder='СЕЧЕВЫХ СТРЕЛЬЦОВ, 84А, КВ. 2']", data.address
            ], errors, ["focus", "input", "blur"]
        );
    }

    await setNationality(touristNode)
}

async function setNationality(node) {
    createQuickLoginPopup(null, null, "alert", "Заполняем данные!");
    await waitingFor(()=>null, 600, 2)
    const popover = node.querySelector(".select-destination__popper-left");
    simulateEvent(popover, "click");
    simulateEvent(popover, "blur");
    const iframe = document.querySelector('iframe.qq-popup-user-salt-block');
    if ( iframe ) {
        iframe.remove();
    }
}

async function datepickerSetValue({day, month, year}, input, errors, caption) {
    try {
        input.click();
        await waitingFor(() => input.closest('.el-form-item') && input.closest('.el-form-item').querySelector('.mx-datepicker-body'), 100, 20)
        const calendar = input.closest('.el-form-item').querySelector('.mx-datepicker-body');
        $first(`[data-month="${parseInt(month) - 1}"]`, calendar).click();
        $first(`[data-day="${parseInt(day)}"]`, calendar).click();
    } catch (e) {
        errors.push(caption);
    }
}

function getPassengerRowBySelect(select) {
    let elem = select.parentNode;
    while (elem) {
        if ( elem.classList.contains("uk-grid") ) {
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
            return "male";
        case "2" :
            return "female";
        default  :
            return null;
    }
}
