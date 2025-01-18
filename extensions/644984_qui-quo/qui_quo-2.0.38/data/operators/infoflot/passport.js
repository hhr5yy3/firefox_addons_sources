
function injectQuickReservationData(selInsert, func) {
   $$('[name*="last_name"]')
        .map( input => input.closest('tbody, fieldset') )
        .forEach((table) => {
        if ( table && !table.querySelector(selInsert) ) {
            const tr = document.createElement('tr');
            tr.classList.add('qq');
            tr.style.height = '64px';
            const container = tr.appendChild(func({
                legendStyle: 'font-size: 10px;margin-bottom:3px;',
                selectStyle: 'width:100%'
            }));
            table.appendChild(tr);
        }
    });
}

function pasteOrderData(touristNode, data, passport, errors) {
    setInputValues(touristNode, [
        'input[name*="last_name"]', passport.surname,
        'input[name*="first_name"]' , passport.name,
        'input[name*="middle_name"]', passport.secondName,
        'input[name*="passport_series"]', passport.serial,
        'input[name*="passport_number"]', passport.number,
        'input[name*="passport_issued_date"]', customDateToFullString(passport.issueDate),
        'input[name*="passport_issued]"]', passport.authority,
        'input[name*="birthday"]', customDateToFullString(data.birthday),
        'input[name*="contact_email]"]', data.email,
        'input[name*="contact_phone]"]', data.phones.mobile,
        ], errors, ["change", "blur"], ['focus', 'input'] , true
    );

    setSelectIndex(touristNode, [
        'select[name*="citizenship"]', data.nationality
    ], errors)
    const sexInput = $first(`input[name*="gender"][value="${mapSex(data.sex)}"]`, touristNode);
    if ( sexInput ) {
        sexInput.click();
    }
}

function getPassengerRowBySelect(select) {
    return select.closest('tbody, fieldset');
}

function mapSex(sex) {
    if ( !sex ) {
        return null;
    }
    switch ( sex.value ) {
        case "1" :
            return 1;
        case "2" :
            return 0;
        default  :
            return null;
    }
}
