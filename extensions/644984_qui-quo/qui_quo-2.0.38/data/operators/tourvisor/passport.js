//Заполнение паспортных данных
window.OPERATOR_NAME = "Tourvisor";

function injectQuickReservationData(selInsert, func) {
    $$(".TVTourTouristAdult, .TVTourTouristChild, .TVTourBuyUserFormControl, .TVTourBuyCustomerContactsForm").forEach((tourist) => {
        if (!tourist.querySelector(selInsert)) {
            tourist.append(func({
                addTag: "div",
                style: 'font-size:12px;',
                legendStyle: 'font-size:12px'
            }));
        }
    });
}

function pasteOrderData(div, data, passport, errors) {
    if (div.classList.contains('TVTourBuyUserFormControl') || div.classList.contains('TVTourBuyCustomerContactsForm')) {
        setInputValues(div, [
                "[placeholder*='Введите Ваше имя полностью'], .TVCustomerContactsName input", {
                    value: getFullName(data),
                    caption: 'ФИО'
                },
                "[placeholder*='Телефон'], .TVInputPhoneControl input", data.phones.mobile,
                "[placeholder*='E-Mail'], .TVCustomerContactsEmail input", data.email,
                "[placeholder*='Адрес'], .TVCustomerContactsAddress input", data.address,
                ".TVCustomerContactsPassportNumber input", passport.fullNumber,
                ".TVCustomerContactsBirthday input", customDateToFullString(data.birthday),
                ".TVCustomerContactsPassportAuthorityCode input", passport.authorityCode,
                ".TVCustomerContactsPassportIssue input", customDateToFullString(passport.issueDate),
                ".TVCustomerContactsPassportAuthority input", passport.authority

            ], errors
        );
    } else {
        const sexText = mapSex(data.sex);
        const sexLabel = querySelectorAll(div, '.TVTourTouristType .TVInputRadioLabel').find(label => getText(label) === sexText);
        if (sexLabel) {
            sexLabel.click();
        } else {
            errors.push("Пол");
        }
        setInputValues(div, [
                ".TVTouristSurname input", passport.surname,
                ".TVTouristName input", passport.name,
                ".TVTouristBirthday input", customDateToFullString(data.birthday),
                ".TVPassportIssue input", customDateToFullString(passport.issueDate),
                ".TVPassportExpiry input", customDateToFullString(passport.expire),
                ".TVPassportSeries input", passport.serial,
                ".TVPassportNumber input", passport.number,
                ".TVPassportAuthority input", passport.authority,
                ".TVTouristNationality input", data.nationality
            ], errors
        );
    }
}

function getPassengerRowBySelect(select) {
    return select.closest('.TVTourTouristAdult, .TVTourTouristChild, .TVTourBuyUserFormControl, .TVTourBuyCustomerContactsForm');
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return "Муж";
        case "2" :
            return "Жен";
        default  :
            return "WRONG";
    }
}
