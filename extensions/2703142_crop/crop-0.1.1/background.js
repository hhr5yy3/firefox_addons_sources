browser.contextMenus.create({
	id: 'crop-image-in-new-tab',
	title: 'Crop image in new tab',
	contexts: ['image'],
	icons: {
		'16': './icons/crop.svg',
		'32': './icons/crop.svg',
		'48': './icons/crop.svg',
		'64': './icons/crop.svg',
	}
});

browser.contextMenus.onClicked.addListener((info) => {
	if (info.menuItemId !== 'crop-image-in-new-tab') {
		return
	}

	browser.tabs.create({
		url: `https://avatar.innocenzi.dev/?url=${info.srcUrl}`
	})
});
