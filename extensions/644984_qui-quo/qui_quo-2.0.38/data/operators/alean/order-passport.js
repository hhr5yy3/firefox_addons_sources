window.OPERATOR_NAME = "Алеан";

function injectQuickReservationData(selInsert, func) {
  $$( '[ng-repeat="tourist in vm.form_data"]').forEach((div) => {
      if (!div.nextElementSibling.closest(selInsert)) {
          div.after(func({
              addTag: "tr",
              style: "padding-left: 20px;",
              selectStyle: "",
              legendStyle: "font-size: 12px;margin-bottom:5px"
          }));
      }
  });
}

function pasteOrderData(row, data, passport, errors) {
    setInputValues(row, [
            '[ng-model="tourist.birthDate"]', customDateToFullString(data.birthday),
            '[ng-model="tourist.TouristName"]', {
                value: [passport.surname.value, passport.name.value, passport.secondName.value].filter(s=>s).join(' '),
                caption: passport.surname.caption
            },
            '[ng-model="tourist.PassportData"]', {
                value: passport.serial.value + passport.number.value,
                caption: "Серия и номер документа"
            },
        ], errors, "change", "focus", true
    );

}

function getPassengerRowBySelect(select) {
    return select.closest('tr').previousElementSibling;
}
