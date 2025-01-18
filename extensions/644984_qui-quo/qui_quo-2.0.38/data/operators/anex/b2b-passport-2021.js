window.OPERATOR_NAME = "Anex";

function injectQuickReservationData(selInsert, func) {
   $$("fieldset [data-testid$='born'], [name='people__buyer__nameru'], input[name='people__buyer__pserie']").filter(panel => panel.offsetHeight > 0).map(input => input.closest('fieldset').parentNode)
       .forEach(section =>{
           if ( !section.querySelector(selInsert) ) {
               section.append(func({
                   style: "margin-right: 40px;font-size:1.6rem;",
                   addTag: "div",
                   tagStyle: "float: left;padding-left: 1.2rem;",
                   selectStyle: "float:left"
               }));
           }
       });
}

function pasteOrderData(section, data, passport, errors) {
    const dateInputs = $$('input[data-testid="born"], input[data-testid="pgiven"], input[data-testid="pexpire"]' ,section)
        .map(inp => inp && inp.closest('li') ? inp.closest('li').querySelector('button') : null)

    setInputValues(section, [
            'input[data-testid="born"]', customDateToFullString(data.birthday),
            'input[data-testid="pgiven"]', customDateToFullString(passport.issueDate),
            'input[data-testid="pexpire"]', customDateToFullString(passport.expire),
            'input[name="lnamelat"]', data.internationalPassport.surname,
            'input[name="namelat"]', data.internationalPassport.name,
            'input[name="lnameru"], [name="people__buyer__lnameru"], [name="people__buyer__lastname_name"]', data.nationalPassport.surname,
            'input[name="nameru"], [name="people__buyer__nameru"], [name="people__buyer__firstname_name"]', data.nationalPassport.name,
            'input[name="patronameru"], [name="people__buyer__patronameru"], [name="people__buyer__patronymic_name"]', data.nationalPassport.secondName,
            'input[name="pserie"], [name="people__buyer__pserie"]', passport.serial,
            'input[name="pnumber"], [name="people__buyer__pnumber"]', passport.number,
            'input[name="email"], [name="people__buyer__email"]', data.email,
            'input[name="mobile"], [name="people__buyer__mobile"]', data.phones.mobile,
            'input[name="people__buyer__address"]', data.address
        ], errors, ['change','input', 'click', 'blur'], ['focus'], true
    );
    dateInputs.forEach(b => b ? b.click() : null);
    errors.push('Гражданство');
    errors.push('Тип документа');
    const sexSel = section.querySelector(mapSex(data.sex));
    if ( sexSel ) {
        sexSel.click();
    }
}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return 'input[value="MALE"]';
        case "2" :
            return 'input[value="FEMALE"]';
        default  :
            return "WRONG";
    }
}


function getPassengerRowBySelect(select) {
   return select.closest('div:not(.qq-select)');
}
