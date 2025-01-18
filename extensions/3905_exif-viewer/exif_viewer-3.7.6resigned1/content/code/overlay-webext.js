;(function () {
	var winId, imageUrl, basic = false, table = false,
		DEBUG = false,
		RESTRICTED = true,		// character set for localisation keys
		windowData = {
			//incognito: true,
			type: 'popup',
			//focused: false,	// window won't open at all!
			url: undefined,
			width: 50,//720,
			height: 50//720
		},
		updateData = {
			titlePreface: 'xxx'
		},
		menuType = 'normal',	// 'radio'
		menuSimple = true,		// one item vs separate all/basic and list/table items
		isMozilla = (window.browser ? true : false),
		isChrome = (window.chrome  &&  !isMozilla),
		bc = (window.chrome  ||  window.browser);	// FF defines both, Chrome only chrome

	function onCreatedMenu() {
		if (bc.runtime.lastError) {
			window.console.log('Error: ${bc.runtime.lastError}');
		} else {
			if (DEBUG) { window.console.log('Context menu item created successfully'); }
			//bc.windows.update(winId, updateData);
		}
	}	// onCreatedMenu()
	
	function onCreatedWindow(winfo) {
		if (bc.runtime.lastError) {
			window.console.log('Error: ${bc.runtime.lastError}');
		} else {
			if (isMozilla  &&  winfo) { winId = winfo.id; }
			if (DEBUG) { window.console.log('Window created successfully:', winId); }
			//bc.windows.get(winfo.id).then(function (w) {
				//evWindow = w;
			//});
			//var gettingAll = bc.windows.getAll(
				//{windowTypes: ['panel']}
			//);
			//gettingAll.then(function (windowInfoArray) {
				//console.log(windowInfoArray);
			//}, onError);
		}
	}	// onCreatedWindow()

	function onRemovedMenu() {
		if (bc.runtime.lastError) {
			window.console.log('Error: ${bc.runtime.lastError}');
		} else {
			if (DEBUG) { window.console.log('Context menu item removed successfully'); }
		}
	}	// onRemovedMenu()

	function onRemovedWindow() {
		if (bc.runtime.lastError) {
			window.console.log('Error: ${bc.runtime.lastError}');
		} else {
			if (DEBUG) { window.console.log('Window closed successfully'); }
		}
	}	// onRemovedWindow()

	function onError(error) {
		window.console.log('Error: ${error}');
	}	// onError()

	function getPStringWebExt(key) {	// duplicate of function in mozutils.js
		var value;
		
		key = '' + key;
		if (RESTRICTED) { key = key.replace(/[^a-zA-Z0-9_@]/g, '_'); }
		try {
			value = bc.i18n.getMessage(key);
			
			if (value !== '') {
				return value;
			} else {
				return key;
			}
		} catch (e) {
			window.console.log(key, e);
			return key;
		}
	}	// getPStringWebExt()
	
	function handleExifImagePicked(url) {
		if (winId) {
			try {
				bc.windows.get(winId, function () {
					if (isMozilla) {
						browser.windows.remove(winId).then(onRemovedWindow, onError);
					} else if (isChrome) {
						chrome.windows.remove(winId, onRemovedWindow);
					}
				});
			} catch (e) {
				window.console.log('handleExifImagePicked()', 'windows.remove error');
			}
			winId = undefined;
		}
		windowData.url = 'content/exif.html?basic=' + basic + '&table=' + table + 
							'&url=' + window.encodeURIComponent(imageUrl);
		if (isMozilla) {
			browser.windows.create(windowData).then(onCreatedWindow, onError);
		} else if (isChrome) {
			winId = chrome.windows.create(windowData, onCreatedWindow);
		}
	}	// handleExifImagePicked()

	// create context (popup) menu items
	if (menuSimple) {
		bc.contextMenus.create({
			id: 'exif-viewer-asr0',
			title: 'Exif Viewer',
			type: menuType,
	//		checked: true,
			contexts: ['image']
		}, onCreatedMenu);
	} else {
		bc.contextMenus.create({
			id: 'exif-viewer-asr',
			title: getPStringWebExt('contextAllList'),	//'View image EXIF data',
			type: menuType,
	//		checked: true,
			contexts: ['image']
		}, onCreatedMenu);
		bc.contextMenus.create({
			id: 'exif-viewer-asr-basic',
			title: getPStringWebExt('contextBasicList'),	//'View image EXIF data (basic)',
			type: menuType,
	//		checked: false,
			contexts: ['image']
		}, onCreatedMenu);
		bc.contextMenus.create({
			id: 'separator-1',
			type: 'separator',
			contexts: ['image']
		}, onCreatedMenu);
		bc.contextMenus.create({
			id: 'exif-viewer-asr-table',
			title: getPStringWebExt('contextAllTable'),	//'View image EXIF data (table)',
			type: menuType,
	//		checked: false,
			contexts: ['image']
		}, onCreatedMenu);
		bc.contextMenus.create({
			id: 'exif-viewer-asr-basic-table',
			title: getPStringWebExt('contextBasicTable'),	//'View image EXIF data (basic, table)',
			type: menuType,
	//		checked: false,
			contexts: ['image']
		}, onCreatedMenu);
	}

	bc.contextMenus.onClicked.addListener((info, tab) => {
		if (DEBUG) { window.console.log(info, tab); }

		switch (info.menuItemId) {
		case 'exif-viewer-asr0': 
			imageUrl = info.srcUrl;
			basic = 'null';
			table = 'null';
			if (DEBUG) { window.console.log(info.menuItemId, info.srcUrl); }
			handleExifImagePicked(imageUrl);
			break;
		case 'exif-viewer-asr':
			imageUrl = info.srcUrl;
			basic = false;
			table = false;
			if (DEBUG) { window.console.log(info.menuItemId, info.srcUrl); }
			handleExifImagePicked(imageUrl);
			break;
		case 'exif-viewer-asr-basic':
			imageUrl = info.srcUrl;
			basic = true;
			table = false;
			if (DEBUG) { window.console.log(info.menuItemId, info.srcUrl); }
			handleExifImagePicked(imageUrl);
			break;
		case 'exif-viewer-asr-table':
			imageUrl = info.srcUrl;
			basic = false;
			table = true;
			if (DEBUG) { window.console.log(info.menuItemId, info.srcUrl); }
			handleExifImagePicked(imageUrl);
			break;
		case 'exif-viewer-asr-basic-table':
			imageUrl = info.srcUrl;
			basic = true;
			table = true;
			if (DEBUG) { window.console.log(info.menuItemId, info.srcUrl); }
			handleExifImagePicked(imageUrl);
			break;
		}
		//bc.contextMenus.remove(info.menuItemId).then(onRemovedMenu, onError);
	});
	
	return {
		//window: evWindow,
		//basic: basic
	};
})();
