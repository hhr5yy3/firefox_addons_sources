// САМО-тур online бронирование

var OPERATOR_NAME = "ПИТЕРТУР";

function getCity() {
	
	var table = document.querySelector(".programm_filter.panel");
	if ( table != null ) {
		var labels = table.querySelectorAll("label");
		for ( var i = 0; i < labels.length; i++ ) {
			var radio = labels[i].querySelector("input[type='radio']");
			if ( /ТОЛЬКО\sПРОЖИВАНИЕ/i.test(labels[i].textContent) && radio && radio.checked )
				return "";
			
		};
	}

	var s = getDoc().querySelector("select.TOWNFROMINC");

	return s ? selectedOption(s) : "";
}