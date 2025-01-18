window.OPERATOR_NAME = "Vedi";

function injectQuickReservationData(selInsert, func) {
    const pastedRows = Object.keys(saveTrsStates);
    querySelectorAll(document, "#tourist_data_list .wblock").forEach((tr, index) => {
        if ( !tr.querySelector(selInsert) && !tr.querySelector(".qq-caption") ) {
            tr.rowIndex = index;
            tr.append(func({
                addTag: "div",
                legendStyle: "font-size: 12px;"
            }));
        }
        const warning = tr.querySelector('.qq-warning');
        const qqSelect = tr.querySelector(".qq-select select");
        if ( warning && warning.hidden && pastedRows.length > 0 && saveTrsStates[index] && qqSelect ) {
            qqSelect.selectedIndex = saveTrsStates[index].index;
            showWarning(saveTrsStates[index].errors, tr, `Данные заполнены. Проверьте все поля.`, "black");
        }
    });
}

function getPassengerRowBySelect(select) {
    let elem = select.parentNode;
    while (elem) {
        if ( elem.classList.contains("wblock") ) {
            break;
        }
        elem = elem.parentNode;
    }
    return elem;
}