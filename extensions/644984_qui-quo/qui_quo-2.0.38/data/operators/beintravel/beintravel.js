// Система подбра туров "Megatec Мастер-WEB"

var OPERATOR_NAME = "BE IN TRAVEL";

function mapCurrency(s) {
    var c = trim(s).toUpperCase();
    switch (c) {
    	case "EU": return "EUR";
    	case "EV": return "EUR";
        case "РБ": return "BYN";
        case "РУБ.": return "RUB";
        case "ГР": return "гр";
        case "$": return "USD";
        case "€": return "EUR";
    }
    return c;
}