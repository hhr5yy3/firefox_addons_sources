// САМО-тур online бронирование

var OPERATOR_NAME = "voiaj.md";


function extractRegion(tds, hotel) {
	var region = colText(tds, [/город/,/курорт/]);
	if ( region != null ) {
		return region;
	}
	
	var m = hotel.textContent.trim().match(REGION_PATTERN);
	if ( m != null ) {
		return m[2];
	}
	
   	var regionAndOffer = colText(tds, [/^тур$/, /тур\s+\/\s+тип\s+программы/]);

    var idx = regionAndOffer.indexOf("<p>");
    if ( idx < 0 ) {
    	idx = regionAndOffer.indexOf("Раннее бронирование");
    }
    if ( idx < 0 ) {
    	idx = regionAndOffer.indexOf("Early Booking");
    }
    if ( idx < 0 ) {
    	idx = regionAndOffer.indexOf("(СПО)");
    }
    return idx > 0 ? regionAndOffer.substring(0, idx-1) : regionAndOffer;   
}