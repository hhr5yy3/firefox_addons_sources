var OPERATOR_NAME = "vseformy.org";

function injectQuickReservationData(selInsert, func) {
    var title = querySelectorAll(document, ".grp .grptitle").find((p) => {
         return p.textContent === "Персональная информация";
    });
    var div = title ? title.parentNode : null;
    if ( div && !document.querySelector(selInsert) ) {
        div.before(func({
            addTag: "div",
        }));
    }
}

function pasteOrderData(doc, data, passport, errors) {
    setInputValues(doc, [
            "#MainContent_eDateBirth", customDateToFullString(data.birthday),
            "#MainContent_eSurname", passport.surname,
            "#MainContent_eName", passport.name,
            "#MainContent_eSecondName", data.secondName,


            "#MainContent_ePasspSerie", data.nationalPassport.serial,
            "#MainContent_ePasspNumber", data.nationalPassport.number,
            "#MainContent_ePasspDate", customDateToFullString(data.nationalPassport.issueDate),
            "#MainContent_ePasspIssuedBy", data.nationalPassport.authority,

            "#MainContent_eZagranSerie", data.internationalPassport.serial,
            "#MainContent_eZagranNumber", data.internationalPassport.number,
            "#MainContent_eZagranDate", customDateToFullString(data.internationalPassport.issueDate),
            "#MainContent_eZagranIssuedBy", data.internationalPassport.authority,

            "#MainContent_eNationality", data.nationality,
            "#MainContent_eAdress", data.addressLiving,

            "#MainContent_ePhone", data.phones.mobile,
            "#MainContent_eEmail", data.email
        ], errors
    );
    var sexInput = document.querySelector("#MainContent_rblSex_"+ mapSex(data.sex));
    if ( !sexInput ) {
       errors.push("Пол");
    } else {
        simulateEvent(sexInput.parentNode.querySelector("ins"), "click");
    }

}

function mapSex(sex) {
    switch (sex.value) {
        case "1" :
            return "0";
        case "2" :
            return "1";
        default  :
            return "WRONG";
    }
}

function getPassengerRowBySelect(select) {
    return document;
}