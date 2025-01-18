document.addEventListener('DOMContentLoaded', function () {
// Прописываем текстов и подписей на кнопках
	(function (chrome) {
		document.getElementsByTagName('title')[0].textContent = chrome.i18n.getMessage('popup_title');
		document.getElementsByTagName('h1')[0].textContent = chrome.i18n.getMessage('popup_h1');
		document.getElementById('enru_form_torus').value = chrome.i18n.getMessage('action_en_ru');
		document.getElementById('enru_form_tolat').value = chrome.i18n.getMessage('action_ru_en');
		document.getElementById('options_link').textContent = chrome.i18n.getMessage('options_link');
		document.getElementById('options_link').title = chrome.i18n.getMessage('options_link_title');
		document.getElementById('footer_link').title = chrome.i18n.getMessage('footer_link_title');
		document.getElementById('footer_link').textContent = chrome.i18n.getMessage('footer_link');
	})(chrome);
	
	(function() {
		document.getElementById('enru_form_torus').addEventListener('click', function(event) {
			document.getElementById('rus_eng_err_text').value = to_rus(document.getElementById('rus_eng_err_text').value);
			//copy2clipboard('rus_eng_err_text');
			return false;
		});

		document.getElementById('enru_form_tolat').addEventListener('click', function(event) {
			document.getElementById('rus_eng_err_text').value = to_lat(document.getElementById('rus_eng_err_text').value);
			//copy2clipboard('rus_eng_err_text');
			return false;
		});
	})();
	
// Копирование выделенного на текущей вкладке текста в textarea из локального хранилища
	(function() {
		if(localStorage['selection_text']) {
			document.getElementById('rus_eng_err_text').value = localStorage['selection_text'];
			if(localStorage['no_save_last'] == 'on') {
				localStorage['selection_text'] = "";
			}
			if(localStorage['menuItemId'] == "gs_contextId_ru") {
				document.getElementById('enru_form_torus').click();
			} else if(localStorage['menuItemId'] == "gs_contextId_en") {
				document.getElementById('enru_form_tolat').click();
			}
		}
	})();
	
// Выделение текста в textarea
	(function() {
		document.getElementById('rus_eng_err_text').select();
		document.getElementById('rus_eng_err_text').addEventListener('focus', function() {
			this.select();
		});
	})();

// Рабочие ссылки в popup.html
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
		};
	})();
	
});