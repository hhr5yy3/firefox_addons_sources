if (document.documentElement.lang.length > 0) {

    let browser = (typeof chrome === 'object') ? chrome : browser;

    let version = '0.3.6';
	let themeInstalled = false;  // Установлена ли какая либо тема
    let webtheme = localStorage.getItem('ext-theme');

	// Если тема установлена в настройках, то инсталируем ее
	if (webtheme && webtheme.length) {
		themeInstalled = installTheme(webtheme);  // Установка темы из настроек
	}


    browser.storage.local.get('opt', (result) => {
        if (result && result.opt && result.opt.theme && result.opt.theme.length && result.opt.theme !== 'null') {
            localStorage.setItem('ext-theme', result.opt.theme);

            if (!themeInstalled)
                themeInstalled = installTheme(result.opt.theme);
        }
        else {
            localStorage.removeItem('ext-theme');
            uninstallTheme();
            themeInstalled = false;
        }
    });


	/**
	 * Установить тему оформления
	 *
	 * @param name
	 * @returns {boolean}
	 */
	function installTheme(name) {
        let style = document.createElement('link');
		style.id = 'ext-theme-radio';
		style.rel = 'stylesheet';
		style.type = 'text/css';
		style.href = chrome.extension.getURL('themes/' + name + '/theme.css?v=' + version);
		(document.head || document.documentElement).appendChild(style);
		return true;
	}


	/**
	 * Удалить тему
	 */
	function uninstallTheme() {
        let elem = document.getElementById('ext-theme-radio');
		if (elem) {
			elem.remove();
		}
	}
}

