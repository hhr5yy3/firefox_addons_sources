(() => {
	try {document.addEventListener('contextmenu', e => e.preventDefault())} catch{};
	const getElement = elem => document.getElementById(elem);
	const toggle = getElement('on_off_switcher'),
		  pulse = getElement('pulse1');
	const create = url => {browser.tabs.create({url: url})};
    const setIcon = (path, title) => {
		browser.browserAction.setIcon({path: path});
		browser.browserAction.setTitle({title: title});
	}	
	const currentState = () => {
		const storage = browser.storage.local.get(['isEnabled', 'pac']);
		storage.then(value => {
			browser.runtime.sendMessage({a : 'err'}, res => {
				if (!value.pac) {
					browser.storage.local.set({isEnabled: false}),
					toggle.checked = false,
					browser.browserAction.setBadgeText({text: 'err'}),
					browser.browserAction.setBadgeBackgroundColor({color: '#f21a1a'}),
					getElement('control').style.display = 'none',
					getElement('share').style.display = 'none',
					getElement('noControl').style.display = 'block',
					getElement('noControl').innerHTML = '🔥 <b>ОШИБКА</b> 🔥<br> Список для проксирования сайтов не был загружен!<br><br> Обратитесь в техподдержку: support@fastproxy.online',
					getElement('noControl').title = ''
				}
				else if (!res.incog) {
					getElement('on_off_switcher').disabled = true;
					getElement('control').style.display = 'none';
					getElement('noPrivate').style.display = 'block';
					browser.browserAction.setBadgeText({text: 'err'});
					browser.browserAction.setBadgeBackgroundColor({color: '#f21a1a'});
					setIcon('../icon-disabled.png', 'Ошибка');
				}
				else if (res.ext == 'controlled_by_other_extensions' && value.isEnabled) {
					browser.browserAction.getBadgeText({}, text => {
						if (text === 'err' || text == '') {
							getElement('on_off_switcher').disabled = true;
							getElement('control').style.display = 'none';
							getElement('share').style.display = 'none';
							getElement('noControl').style.display = 'block';
							setIcon('../icon-disabled.png', 'Ошибка');
						}
					})
				}
				else {
					getElement('on_off_switcher').disabled = false;
					getElement('noPrivate').style.display = 'none';
					getElement('noControl').style.display = 'none';
					getElement('control').style.display = 'block';
				}
			})
			value.isEnabled ? (
				toggle.checked = true,
				pulse.style['animation'] = '',
				pulse.style['box-shadow'] = 'inset 0px 0px 15px 10px rgb(34, 29, 136)'
			) : (
				toggle.checked = false,
				pulse.style['animation'] = 'stop',
				pulse.style['box-shadow'] = 'none'
			)
		})
	}
	const switcher = () => {
		const storage = browser.storage.local.get('pac');
		storage.then(value => {
			toggle.addEventListener('change', () => {
				browser.storage.local.set({isEnabled: toggle.checked});
				value.pac || (
					browser.storage.local.set({isEnabled: false}),
					toggle.checked = false,
					browser.browserAction.setBadgeText({text: 'err'}),
					browser.browserAction.setBadgeBackgroundColor({color: '#f21a1a'}),
					getElement('control').style.display = 'none',
					getElement('share').style.display = 'none',
					getElement('noControl').style.display = 'block',
					getElement('noControl').innerHTML = '🔥 <b>ОШИБКА</b> 🔥<br> Список для проксирования сайтов не был загружен!<br><br> Обратитесь в техподдержку: support@fastproxy.online',
					getElement('noControl').title = ''
				)
				browser.browserAction.setBadgeText({text: ''});
				currentState();
				browser.runtime.sendMessage({a : 'e'});
			})
		})
	}
	const click = () => {
		getElement('vk').onclick = vkShare;
		getElement('ok').onclick = okShare;
		getElement('fb').onclick = fbShare;
		getElement('settings').onclick = () => {
			getElement('main').style.display = 'none';
			getElement('opt').style.display = 'block';
		}
		getElement('support').onclick = support;
		getElement('support_email').onclick = () => {
			getElement('e_mail_address').style.display = 'table';
		}
		getElement('p_email').onclick = () => {
			getElement('e_mail_address').style.display = 'table';
		}
		getElement('support_vk').onclick = () => create('https://vk.com/fastproxy');
		getElement('p_vk').onclick = () => create('https://vk.com/fastproxy');
	}
	const support = () => {
		const bottom_open = getElement('bottom_open').style,
			e_mail_address = getElement('e_mail_address').style;
		bottom_open.display === 'table'	? (bottom_open.display = e_mail_address.display = 'none') : ((bottom_open.display = 'table'), (e_mail_address.display = 'none'));
	}
	const vkShare = () => {
		window.open(`https://vk.com/share.php?url=https://fastproxy.online/?utm_source=from_vk&title=FastProxy - обход блокировки сайтов&description=Расширение позволяет обходить блокировки вашего провайдера в России и Украине. С помощью FastProxy Вы получите доступ ко всем заблокированным сайтам. Легко установить, просто использовать!`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
	}
	const okShare = () => {
		window.open(`https://connect.ok.ru/offer?url=https://fastproxy.online/?utm_source=from_ok&title=FastProxy - обход блокировки сайтов&description=Расширение позволяет обходить блокировки вашего провайдера в России и Украине. С помощью FastProxy Вы получите доступ ко всем заблокированным сайтам. Легко установить, просто использовать!`, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
	}	
	const fbShare = () => {
		window.open(`https://www.facebook.com/sharer.php?u=https://fastproxy.online/?utm_source=from_facebook&title=FastProxy - обход блокировки сайтов в России и Украине`, '', 'menubar=no,sharer,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
	}
	const run = () => {
		currentState();
		switcher();
		click();
	}
	run();	
})()