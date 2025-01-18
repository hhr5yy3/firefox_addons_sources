'use strict'

const listenForClicks = () => {
	document.addEventListener('click', (e) => {
		extensionApi.tabs.query({
			currentWindow: true,
			active: true
		}, (tabs) => {
			const testServiceId = e.target.id
			const tabUrl = new URL(tabs[0].url).hostname
			openTestServiceInTab(testServiceId, tabUrl)
			close();
		})
	})
}

listenForClicks()
