// САМО-тур online бронирование

var OPERATOR_NAME = "Вилар Турс";
var OPERATOR_SLETAT_ID = 49;

function addTitle() { 
    var newTh = getDoc().createElement("th");
    newTh.className = "qq"
    newTh.style.padding = "0px 16px"
    var newContent = getDoc().createTextNode("QQ");
    newTh.appendChild(newContent);
    hRow = getHeaderRow();
    hRow.appendChild(newTh);
}

var isTransportColToShrink = true;
