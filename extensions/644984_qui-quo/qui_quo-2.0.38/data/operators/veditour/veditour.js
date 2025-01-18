// Система подбра туров "Megatec Мастер-WEB"

window.OPERATOR_NAME = "Vedi";
var OPERATOR_SLETAT_ID = 87;

// map only countries with non-matching name
function mapCountryCode(code){
	switch (code) {
	    case "6254": return "Доминикана";
	    case "53": return "Таиланд";
	}
	return null;
}
