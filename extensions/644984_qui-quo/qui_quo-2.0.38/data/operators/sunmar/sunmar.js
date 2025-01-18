// OTI Holding

var OPERATOR_NAME = "Sunmar";
var OPERATOR_SLETAT_ID = 54;
var showTopHotelsRating = true;
//map only countries with non-matching name
function mapCountryCode(code){
    switch (code) {
    	case "36_5_12_2_": return "Доминикана";
    }
	return null;
}

function extractThumbnail(img, tds) {
	var href = extractHotelUrl(tds[2]);
	if ( href ) {
		var m = href.match(/-(\d+).aspx/);
		if ( m ) {
			return "http://library.sunmar.ru/resources/hotelImages/original/" + m[1] + "/1.jpg";
		}
	}
	return null;
}

