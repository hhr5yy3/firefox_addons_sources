
function createContextMenus(enable) {
	var gm = n => browser.i18n.getMessage(n);
	browser.contextMenus.removeAll();
	if(enable) {
		var top_id = 'top-menu', rot_id = 'rotation';
		browser.contextMenus.create({id: top_id, contexts: ['all'], 
		  title: gm('cmTopMenu')
		});
		browser.contextMenus.create({id: 'zoom-in', parentId: top_id, contexts: ['all'], 
		  title: gm('cmZoomIn')
		});
		browser.contextMenus.create({id: 'zoom-out', parentId: top_id, contexts: ['all'], 
		  title: gm('cmZoomOut')
		});
		// del:2021/1/14
		//browser.contextMenus.create({id: rot_id, parentId: top_id, contexts: ['all'], 
		//  title: gm('cmRot')
		//});
		browser.contextMenus.create({id: 'r90', parentId: top_id, contexts: ['all'], 
		  title: gm('cmR90')
		});
		browser.contextMenus.create({id: 'l90', parentId: top_id, contexts: ['all'], 
		  title: gm('cmL90')
		});
		browser.contextMenus.create({id: '180', parentId: top_id, contexts: ['all'], 
		  title: gm('cmRot180')
		});
		browser.contextMenus.create({id: 'fit-win', parentId: top_id, contexts: ['all'], 
		  title: gm('cmFitWin')
		});
		browser.contextMenus.create({id: 'fit', parentId: top_id, contexts: ['all'], 
		  title: gm('cmFit')
		});
		browser.contextMenus.create({id: 'separator-1', parentId: top_id, type: 'separator', contexts: ['all']});
		browser.contextMenus.create({id: 'setting', parentId: top_id, contexts: ['all'], 
		  title: gm('cmSetting')
		});
	}
}

function checkStorageData() {
	browser.storage.local.get('setting', (d) => {
		if(!d.setting) 
			browser.storage.local.set({'setting': DEFAULT_SETTING});
	});
}

function getSettingData() {
	browser.storage.local.get('setting', (d) => {
		sendMessage({id: 'set-setting', data: d.setting});
	});
}

function sendMessage(data) {
    browser.tabs.query({active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, data);
    });
}

browser.contextMenus.onClicked.addListener((info, tab) => {
	if(info.menuItemId === 'setting')
		browser.runtime.openOptionsPage();
	else
		sendMessage({id: info.menuItemId});
});

browser.runtime.onInstalled.addListener((details) => {
	if(details.reason == 'update') {
		browser.tabs.create({url: 'http://crossblade.her.jp/addon/ff_zoomimage/index.php'});
	}
});

browser.runtime.onMessage.addListener((msg) => {
	switch (msg.id) {
	case 'get-setting':
		getSettingData();
		break;
	case 'set-context':
		createContextMenus(msg.data);
		break;
	}
});

checkStorageData();

