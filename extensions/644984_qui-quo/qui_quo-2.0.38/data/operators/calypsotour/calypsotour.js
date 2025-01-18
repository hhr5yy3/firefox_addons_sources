// САМО-тур online бронирование

var OPERATOR_NAME = "Calypso Tour";
var OPERATOR_SLETAT_ID = 313;


function mapNationality(nationality, nationalityEng) {
    nationality.value = nationalityEng.value;
}

function createCell() {
    var newTd = getDoc().createElement("td");
    newTd.className = "qq";
    newTd.appendChild(qqBtns());
    return newTd;
}