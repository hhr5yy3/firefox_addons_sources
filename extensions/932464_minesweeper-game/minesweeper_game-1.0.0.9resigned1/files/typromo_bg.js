var uiLang = chrome.i18n.getUILanguage();

function checkPositionCookie() {
	return new Promise(function(resolve, reject) {
		var acceptable_positions = ["unset", "fixed", "sticky", "absolute", "relative", "inherit", "initial", "static"];
		var result = "unset";
		if (chrome && chrome.cookies)
		{
			chrome.cookies.getAll({domain: 'thank-you-page.com'}, function(cookies){
				for (var cookiesIter = 0; cookiesIter < cookies.length; cookiesIter++)
				{
					if (cookies[cookiesIter]["name"] === "of_tyh_pos") 
					{
						result = cookies[cookiesIter]["value"];
						break;
					}
				}
				result = acceptable_positions.indexOf(result) !== -1 ? result : "unset";
				resolve(result);
			});
		}
		else
		{
			resolve(result);
		}
	});
}

chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason == "install" && !localStorage.landing && !localStorage['first_date_installation_tyoffer'])
	{
		localStorage['first_date_installation_tyoffer'] = new Date().getTime();
		chrome.management.getSelf(function(info) {
			var ext_name = info.name;

			var lang = /^ru|uk|by|kk/.test(uiLang) ? "ru" : "en";
			var text = {
				'ru' : ['Спасибо, что установили ' + JSON.stringify(ext_name) + '!',
						'Возможно вас заинтересует:'],
				'en' : ['Thank you for installing the ' + JSON.stringify(ext_name) + '!',
						'By the way, please, take a look at our sponsored offer below:']
			};
			var pageLoadedTimeout = null;
			var openedTabId = null;
			chrome.tabs.onUpdated.addListener(function onUpdated(tabId, changeInfo, tab) {
				if (openedTabId == tabId && (changeInfo["title"] !== undefined || changeInfo["isArticle"] !== undefined))
				{
					var isPossibleTemporary = changeInfo["title"] === undefined;
					checkPositionCookie().then(function(position) {
						chrome.tabs.executeScript(openedTabId, {
							code: "if (" + (isPossibleTemporary ? "document.title && " : "") + "!document.getElementById('thank_you_head_section')) {\
									var section_dom = document.createElement('section');\
									section_dom.id = 'thank_you_head_section';\
									section_dom.setAttribute('style', 'padding-top: 34px;padding-bottom: 34px;text-align: center;line-height: 1.3;font-weight: 300;font-family:Arial;font-size: 19px;position:" + position + ";width:100%;z-index:999999;background:white;top:0;');\
									var h2_dom = document.createElement('h2');\
									h2_dom.setAttribute('style', 'margin: 0 0 16px 0;line-height: inherit;color: #1f395c;font-size: 32px; font-family: Arial;font-weight: 400;');\
									h2_dom.textContent = '" + text[lang][0] + "';\
									var p_dom = document.createElement('p');\
									p_dom.setAttribute('style', 'margin-bottom: 16px;color: #ea4335;');\
									p_dom.textContent = '" + text[lang][1] + "';\
									var close_btn = document.createElement('img');\
									close_btn.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEpSURBVGhD7dk9CsJAEIbheABb7fUkHkKPY2krnskz2HoLO0Fn1A+WEEJ2szs/Mi98qKl80E2TLoqi6G9a0I609eeTbnva7vs2P0a8aDeaJuZAe9IetC1fyI2/PCM0MUDwdzjxhdI0MdUQSANTHYEkMc0QSALTHIFaYsQQqAVGHIFqYtQQqAZGHYHmYMwgUAnGHALlYMwi0BSMeQQaw7hBoCGMOwRKMXeaSwRiDCMYwLvQXJb+nXj9M+OiFHGm9c+Mi4YOdnpmXGDG7k5uMFNuseYxUxDILCYHgcxhShDIDGYOAqljaiCQGqYmAoljWiCQGKYlAjXHSCBQM4wkAlXHaCBQNYwmAvUxK1p2/MyOH3dpIRAwV9qSL5S0+b1qx79EMSKKoshaXfcGi/zGyoPvvCcAAAAASUVORK5CYII=';\
									close_btn.setAttribute('style', 'position: absolute;right: 10px;top: 10px;width: 30px;height: 30px;cursor:pointer');\
									close_btn.onclick = function() {section_dom.remove()};\
									section_dom.appendChild(h2_dom);\
									section_dom.appendChild(p_dom);\
									section_dom.appendChild(close_btn);\
									document.body.insertBefore(section_dom, document.body.firstChild);}"
						}, function() {var rt_error = chrome.runtime.lastError});
						if (isPossibleTemporary)
						{
							pageLoadedTimeout && clearTimeout(pageLoadedTimeout);
							pageLoadedTimeout = setTimeout(function() {
								chrome.tabs.onUpdated.removeListener(onUpdated);
							}, 4000);
						}
						else
						{
							chrome.tabs.onUpdated.removeListener(onUpdated);
						}
					});
				}
			});
			chrome.tabs.create({
				url: "http://thank-you-page.com/?lang=" + uiLang
			}, function (tab) {
				openedTabId = tab.id;
			});
		});
	}
});

chrome.management.getSelf(function(info) {
	var ext_name = encodeURIComponent(info.name);
	chrome.runtime.setUninstallURL('http://thank-you-page.com/?source_type=uninstall&lang='+ uiLang + '&ext=' + ext_name);
});
