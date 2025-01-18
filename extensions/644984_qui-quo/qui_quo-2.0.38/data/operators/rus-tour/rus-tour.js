// САМО-тур online бронирование

var OPERATOR_NAME = "Русь Тур";

function createCell() {

    var nobr = getDoc().createElement("nobr");
    var edtBtn = createEditButton();
    if ( window !== top ) {
        edtBtn.setAttribute("popupStick", true);
    }
    var addBtn = createAddButton();
    edtBtn.style.maxWidth = "";
    addBtn.style.maxWidth = "";
    nobr.appendChild(addBtn);
    nobr.appendChild(edtBtn);

    var newTd = getDoc().createElement("td");
    newTd.className = "qq";
    newTd.appendChild(nobr);

    return newTd;
}