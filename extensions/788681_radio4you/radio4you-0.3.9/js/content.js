/**
 * Создание дива с id chrome-ext-the-radio-ru и вставка опций,
 * которые сохранены внутри плагина.
 *
 * @type {string}
 */


if (document.documentElement.lang.length > 0) {
    let browser = (typeof chrome === 'object') ? chrome : browser;

    let el = 'chrome-ext-the-radio-ru';
    let ext = document.createElement("div");
	ext.setAttribute('id', el);

    // Загружаем все настройки в div
    browser.storage.local.get(null, (value) => {
        if (value && value.opt) {
            for (let p in value.opt) {
                if (value.opt[p])
                    ext.setAttribute('data-' + p, value.opt[p]);
            }
        }
    });


	// Вставляем Div в дом дерево
	document.body.appendChild(ext);


	/**
	 * Делаем инъекцию скрипта inject.js
	 * @type {Element}
	 */
    let s = document.createElement('script');
	s.src = browser.extension.getURL('js/inject.js');
	s.onload = function() {
        this.remove();
    };
	(document.head || document.documentElement).appendChild(s);



	/**
	 * Подсчет количества потоков у DIV
	 * @type {MutationObserver}
	 */
// ---------------------------------------------------------------------------------------------
   /* let observer = new MutationObserver((mutations) => {
		mutations.forEach(() => {
            let count = parseInt(target.getAttribute('stream-count'));
			browser.extension.sendMessage({streamsCount: count});
		});
	});

    let target = document.getElementById(el);
	observer.observe(target, { attributes : true, attributeFilter : ['stream-count'] });*/
// ---------------------------------------------------------------------------------------------

}