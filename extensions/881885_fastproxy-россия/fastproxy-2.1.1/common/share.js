(() => {
	const getElement = elem => document.getElementById(elem);	
	const ask = () => {
		const show = getElement('show'),
			  ask = getElement('ask'),
			  mail = getElement('mail'),
			  good = getElement('good'),
			  bad = getElement('bad');
		show.style.display = 'none';
		good.onclick = (e) => {
			e.preventDefault(),
			ask.style.display = 'none',
			show.style.display = 'block';
		}
		bad.onclick = (e) => {
			e.preventDefault(),
			ask.style.display = 'none',
			mail.style.display = 'block';
		}
		ws.onclick = () => {
			window.open('https://addons.mozilla.org/ru/firefox/addon/fastproxy-%D1%80%D0%BE%D1%81%D1%81%D0%B8%D1%8F/');
		}
		vk.onclick = () => {
			window.open('https://vk.com/share.php?url=https://fastproxy.online'+'&title='+ 'FastProxy - Украина'+'&description='+'Обход блокировки сайтов в Украине. Доступ к ВКонтакте, Одноклассники, Mail, Яндекс и другим сайтам.', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
		}
		ok.onclick = () => {
			window.open('https://connect.ok.ru/offer?url=https://fastproxy.online'+'&title='+ 'FastProxy - Украина'+'&description='+'Обход блокировки сайтов в Украине. Доступ к ВКонтакте, Одноклассники, Mail, Яндекс и другим сайтам.', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
		}
		fb.onclick = () => {
			window.open('https://www.facebook.com/sharer.php?u=https://fastproxy.online'+'title=FastProxy - Украина','','menubar=no,sharer,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600')
		}
	}
	ask();
})()