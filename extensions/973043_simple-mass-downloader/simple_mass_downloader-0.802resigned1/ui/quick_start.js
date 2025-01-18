let rtype = window.location.hash.slice(1);
let sheet = (function() {/*davidwalsh*/
	var style = document.createElement("style");
	style.appendChild(document.createTextNode(""));
	document.head.appendChild(style);
	return style.sheet;
})();

if(rtype !== "multi") {
    sheet.insertRule("#extensions { display: none; padding:0!important;}");
    sheet.insertRule("#content { height: 100px!important; }");
    sheet.insertRule("#content { width: 300px!important; }");
}