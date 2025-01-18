// Система подбра туров "Megatec Мастер-WEB"

var OPERATOR_NAME = "Brisco";
var OPERATOR_SLETAT_ID = 79;

function createTh() {
    var newTh = document.createElement("td");
    newTh.className = "qq"
    newTh.style.width = "60px"
    var newContent = document.createTextNode("QQ");
    newTh.appendChild(newContent);
    return newTh;
}
