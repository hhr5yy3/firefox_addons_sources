window.OPERATOR_NAME = "Премьера тур"

function createCell() {
    var container = qqBtns();
    var edtBtn = container.querySelector('.qq-edit-btn');
    if ( window !== top ) {
        edtBtn.setAttribute("popupStick", true);
    }
    var newTd = getDoc().createElement("td");
    newTd.className = "qq";
    newTd.appendChild(container);
    return newTd;
}
