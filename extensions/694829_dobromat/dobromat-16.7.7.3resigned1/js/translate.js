/*
simple translator for html pages
- include attribute "data-translate" in html element to translate its content
- include attribute "data-translateattribute" to not translate content, but element's attribute
*/

$(function() {

	$("*[data-translate]").each(function(){

		var el = $(this);

		var t = el.data("translate");
		var attr = el.data("translateattribute");
		
		if (t) {
			if (attr) {
				el.attr(attr, chrome.i18n.getMessage(t));
			} else {
				el.html(chrome.i18n.getMessage(t));			
			}		
		} else {
			console.warn("missing value for data-translate for");
			console.log(el);
		}

	});
	
});