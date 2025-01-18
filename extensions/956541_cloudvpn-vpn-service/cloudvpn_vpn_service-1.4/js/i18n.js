document.addEventListener("DOMContentLoaded", function(){
	var elems = document.querySelectorAll("*[data-i18n]");
	for(var i = 0, len = elems.length; i < len; i++)
	{
		var el = elems[i];
		el.innerText = chrome.i18n.getMessage(el.dataset.i18n);
	}
	
	var elems = document.querySelectorAll("*[data-i18n-attr]");
	for(var i = 0, len = elems.length; i < len; i++)
	{
		var el = elems[i];
		if(el.dataset.i18nAttr.indexOf(":") >-1){
			var i18n = el.dataset.i18nAttr.split(":");
			el.setAttribute(i18n[0], chrome.i18n.getMessage(i18n[1]));
		}
	}
});
