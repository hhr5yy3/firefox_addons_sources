window.OPERATOR_NAME = "YOUR GUIDE VORONEZH";

function createCell(tds) {
    var nobr = qqBtns({align: 'qq-box'})

    var newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.appendChild(nobr);
    newTd.setAttribute("rowspan", tds[0].getAttribute("rowspan"));

    return newTd
}
