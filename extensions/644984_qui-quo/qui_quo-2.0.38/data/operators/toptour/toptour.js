// Система подбра туров "Megatec Мастер-WEB"

var OPERATOR_NAME = "ТОП-ТУР";
var OPERATOR_SLETAT_ID = 294;

function mapCurrency(s) {
    var c = trim(s);
    switch (c.toUpperCase()) {
    	case "EU": return "EUR";
    	case "EV": return "EUR";
        case "РБ": return "BYN"; // !!!!
        case "$": return "USD";
        case "€": return "EUR";
    }
    return c;
}