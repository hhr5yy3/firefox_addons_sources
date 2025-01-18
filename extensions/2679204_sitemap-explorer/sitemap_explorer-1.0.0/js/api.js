navigator.sayswho = (function(){
	var ua = navigator.userAgent, tem,
	M = ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*/i) || [];
	if(/trident/i.test(M[1])){
	  tem =  /\brv[ :]+(\d+)/g.exec(ua) || [];
	  return 'IE';
	}
	if(M[1] === 'Chrome'){
	  tem = ua.match(/\b(OPR|Edge?)\//);
	  if(tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera').replace('Edg ', 'Edge ');            
	}
	return M.slice(1);
})();

let browser_name = navigator.sayswho;

window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

let browser_locale = window.browser.i18n.getUILanguage().substring(0,2);

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
}, false);

$(document).ready(function() {
	$("#cancel").on("click",function(){
		window.close();
	});
});