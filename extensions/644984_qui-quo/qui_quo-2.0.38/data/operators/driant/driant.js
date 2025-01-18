// Система подбра туров "Megatec Мастер-WEB"

var OPERATOR_NAME = "Дриант";
var OPERATOR_SLETAT_ID = 297;

function mapCurrency(s) {
    var c = trim(s).toUpperCase();
    switch (c) {
    	case "EU": return "EUR";
    	case "EV": return "EUR";
        case "РБ": return "BYN";
        case "BR": return "BYN";
        case "БР": return "BYN";
        case "РУБ.": return "RUB";
        case "ГР": return "гр";
        case "$": return "USD";
        case "€": return "EUR";
    }
    return c;
}