(() => {
	const displayErrorPac = () => {
		browser.runtime.onMessage.addListener(request => {
			if (request?.error) {
				const elements = {
					span1: document.querySelector('.span1'),
					span2: document.querySelector('.span2'),
					flicker: document.querySelector('.text-flicker'),
					color: document.querySelector('.color')
				}
				const {span1, span2, flicker, color} = elements;
				span1.style.display = 'none';
				span2.style.display = 'initial';
				span2.innerText = 'Внимание! Ошибка! Список прокси не загружен!';
				flicker.style.animation = 'none';
				flicker.innerText = 'Обратитесь в техподдержку: support@fastproxy.online';
				color.style.animation = 'none';
			}
		})
	}
	displayErrorPac();
})()