// САМО-тур online бронирование

var OPERATOR_NAME = "JoinUP";

function getSearchButton() {
    var doc = typeof getDoc == 'function' ? getDoc() : document;
    return doc.querySelector("button.load") || doc.querySelector("input.load");
}