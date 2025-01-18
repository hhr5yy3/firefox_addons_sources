// САМО-тур online бронирование

var OPERATOR_NAME = "Жемчужная Река";

function createCell() {

    var nobr = getDoc().createElement("nobr");
    var edtBtn = createEditButton();
    if ( window !== top ) {
        edtBtn.setAttribute("popupStick", true);
    }
    nobr.appendChild(createAddButton());
    nobr.appendChild(edtBtn);

    var newTd = getDoc().createElement("td");
    newTd.className = "qq";
    newTd.appendChild(nobr);

    return newTd
}