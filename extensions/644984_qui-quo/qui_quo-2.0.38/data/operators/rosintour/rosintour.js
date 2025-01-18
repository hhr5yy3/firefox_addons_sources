//Система подбра туров "Megatec Мастер-WEB"

var OPERATOR_NAME = "РОСИНТУР";


function extractHotelName(tdArray) {
    var result = [];
    var nameA = tdArray.map(function(arr, idx) { return arr[idx == 0 ? 1 : 0].querySelector("a"); });
    
    var categorySpan = getElementsByTagNameAndRegexp(tdArray, "span", getSpanRegexp("HotelCategory"));
    var nightsSpan = getElementsByTagNameAndRegexp(tdArray, "span", getSpanRegexp("Nights"));
    if ( nameA.length < 1 ) {
        var nameTds = getTdByClass(tdArray, "hotel");
        for (var i = 0; i < nameTds.length; i++) {
            result.push(nameTds[i].textContent.trim() + ( categorySpan[i] != undefined ? " " + categorySpan[i].textContent.trim() : "") +
                (nameTds.length > 1 ? " " + nightsSpan[i].textContent.trim() + "н" : ""));
        };
    } else {
        for ( var i = 0; i < nameA.length; ++i ) {
            result.push(nameA[i].textContent.trim() + ( categorySpan[i] != undefined ? " " + categorySpan[i].textContent.trim() : "" ) +
                (nameA.length > 1 ? " " + nightsSpan[i].textContent.trim() + "н" : ""));
        };
    }

    return result.join(" / ");
}

function getComment(tdArray) {
    var links = getElementsByTagNameAndRegexp(tdArray, ".inner_tbl a", {test: function() { return true; }});
	return links.length > 0 ? links[0].textContent.trim() : null;
}