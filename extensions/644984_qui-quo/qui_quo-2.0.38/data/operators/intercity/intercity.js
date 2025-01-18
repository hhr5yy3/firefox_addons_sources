// Система подбра туров "Megatec Мастер-WEB"

var OPERATOR_NAME = "ИНТЕРСИТИ";
var OPERATOR_SLETAT_ID = 122;

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

function getNights(tour) {
    var dateFrom = getText(querySelectorAll(tour, '[data-bind*=FromDateShown]')[0]);
    var dateTo = getText(lastElement(querySelectorAll(tour, '[data-bind*=ToDateShown]')));
    return getDistance(dayMonthYearToDate(dateFrom), dayMonthYearToDate(dateTo)).toString() ;
}