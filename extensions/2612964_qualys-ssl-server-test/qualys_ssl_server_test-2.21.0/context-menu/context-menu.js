'use strict'

extensionApi.contextMenus.create({
	id: 'all',
	title: 'Scan with All Test Services',
	contexts: ['link']
})

testServices.forEach((testService) => {
	extensionApi.contextMenus.create({
		id: testService.id,
		title: testService.title,
		contexts: ['link']
	})
})

extensionApi.contextMenus.onClicked.addListener((info, tab) => {
	const testServiceId = info.menuItemId
	const linkUrl = new URL(info.linkUrl).hostname
	openTestServiceInTab(testServiceId, linkUrl)
})
