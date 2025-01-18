// Solemare

var OPERATOR_NAME = "Solemare";
var OPERATOR_SLETAT_ID = undefined;

function createCell(tds) {
    var nobr = document.createElement("nobr");
    nobr.appendChild(createAddButton(createSolemareOption));
    nobr.appendChild(createEditButton(createSolemareOption));

    var newTd = document.createElement("td");
    newTd.className = "qq";
    newTd.appendChild(nobr);
    newTd.setAttribute("rowspan", tds[0].getAttribute("rowspan"));

    return newTd
}

function createSolemareOption(img) {
    var trs = getRows(img);
    var option = createOption(img);
    var priceAndCurrency = getText(trs[0].querySelector(".elementPrice.elementActive") || trs[0].querySelector(".elementPrice"));
    option.price =  extractIntFromStr(priceAndCurrency);
    option.currency = mapCurrency(priceAndCurrency.replace(/\d+|,/g, "").trim());
    return option;
}
