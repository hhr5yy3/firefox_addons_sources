
function makePageWider() {
	var iframe = document.querySelector("iframe[name=onlineframe]");
	if ( iframe ) {
		iframe.setAttribute("width", "110%")
	}
}

makePageWider();