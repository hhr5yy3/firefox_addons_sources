// САМО-тур online бронирование

var OPERATOR_NAME = "Pegas";
var OPERATOR_SLETAT_ID = 3;
var showTopHotelsRating = true;
function makePageWider() {
	var container = document.querySelector("div#container");
	if ( container ) {
		container.setAttribute("style","width:1010px;");
		var content = document.querySelector("div#content");
		if ( content ) {
			content.setAttribute("style","padding-left:1px;padding-right:1px;");
		}
	}
}

makePageWider();