// Система подбра туров "Megatec Мастер-WEB"

var OPERATOR_NAME = "adriahit";

function getCountry() {
    var country = document.querySelector("[id*='destinationFilter'] div");
    return country ? country.textContent : null;
}