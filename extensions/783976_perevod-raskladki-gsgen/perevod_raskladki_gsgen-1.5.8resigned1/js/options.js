document.addEventListener('DOMContentLoaded', function () {

// Прописывание текстов и подписей на кнопках
	(function (chrome) {
		document.getElementsByTagName('title')[0].textContent = chrome.i18n.getMessage('options_title');
		document.getElementsByTagName('h1')[0].textContent = chrome.i18n.getMessage('options_h1');
		document.getElementById('options_param_1').value = chrome.i18n.getMessage('options_param_1');
		document.getElementById('options_param_2').value = chrome.i18n.getMessage('options_param_2');
		document.getElementById('save_options').textContent = chrome.i18n.getMessage('options_save_btn');
		document.getElementById('footer_link').title = chrome.i18n.getMessage('footer_link_title');
		document.getElementById('footer_link').textContent = chrome.i18n.getMessage('footer_link');
	})(chrome);

// Определяем значения параметров
	document.getElementsByClassName('status')[0].textContent = '';
	if(localStorage['no_alert'] == 'on') document.getElementById('no_alert').checked = true;
	if(localStorage['no_save_last'] == 'on') document.getElementById('no_save_last').checked = true;

//Обновление настроек расширения
	var page_form = document.getElementsByClassName('app_form');
	page_form = page_form[0];
	page_form.addEventListener('submit', function(event) {
		document.getElementsByClassName('status')[0].textContent = '';
		localStorage['no_alert'] = document.getElementById('no_alert').checked ? 'on' : 'off';
		localStorage['no_save_last'] = document.getElementById('no_save_last').checked ? 'on' : 'off';
		document.getElementsByClassName('status')[0].textContent = 'Сохранено!';
		return false;
	});

// Рабочие ссылки на options.html
/*
	(function() {
		var links = document.getElementsByTagName('a');
		for (var i = 0; i < links.length; i++) {
			(function () {
				var ln = links[i];
				var location = ln.href;
				ln.onclick = function () {
					chrome.tabs.create({active: true, url: location});
					return false;
				};
			})();
		}
	})();
*/
	
});