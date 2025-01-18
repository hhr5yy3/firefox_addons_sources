// Система подбра туров "Megatec Мастер-WEB"

var OPERATOR_NAME = "Space Travel";
var OPERATOR_SLETAT_ID = 129;

// map only countries with non-matching name
function mapCountryCode(code){
    switch (code) {
    	case "37551": return "Мальдивы";
    	case "248": return "Сейшелы";    
    	case "941": return "Шри-Ланка";    
    }

	return null;
}


