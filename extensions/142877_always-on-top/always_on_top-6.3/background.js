//-----------------------------------------------------------------------------------------------

var setPinned = new Set();

function isChrome() {
	return (typeof(browser) == "undefined");
}

function getApp() {
	if (isChrome())
		return chrome;
	return browser;
}

//-----------------------------------------------------------------------------------------------

function updateTabIcon(idTab, idWnd) {
	//console.log("updateTabIcon " + idTab + " " + idWnd + " " + setPinned.has(idWnd));	
	
	getApp().browserAction.setIcon({
		path: setPinned.has(idWnd) ? {
				16: "icons/aot_pinned_16.png",
				19: "icons/aot_pinned_19.png",
				32: "icons/aot_pinned_32.png",
				38: "icons/aot_pinned_38.png"
			} : {
				16: "icons/aot_unpinned_16.png",
				19: "icons/aot_unpinned_19.png",
				32: "icons/aot_unpinned_32.png",
				38: "icons/aot_unpinned_38.png"
			},
		tabId: idTab
	});
}

function onIterateError(error) {
	console.log("AOT iterate error " + error.toString());
}

function updateCurTabIconsProcessor(tabInfo) {
	updateTabIcon(tabInfo.id, tabInfo.windowId);
}

function updateCurWndIconsProcessor(windowInfo) {
	for (tabInfo of windowInfo.tabs) {
		updateTabIcon(tabInfo.id, tabInfo.windowId);
	}
}

function toogleCurWndProcessor(windowInfo) {
	if (setPinned.has(windowInfo.id)) {
		setPinned.delete(windowInfo.id);
	}
	else {
		setPinned.add(windowInfo.id);
	}
	
	updateCurWndIconsProcessor(windowInfo);
}

function updateAllIconsProcessor(windowInfoArray) {
	for (windowInfo of windowInfoArray) {
		updateCurWndIconsProcessor(windowInfo);
	}
}

function updateCurWndIcons() {
	if (isChrome()) {
		getApp().windows.getCurrent({populate: true}, updateCurWndIconsProcessor);
	}
	else{
		var getting = getApp().windows.getCurrent({populate: true});
		getting.then(updateCurWndIconsProcessor, onIterateError);
	}
}

function toogleCurWnd() {
	if (isChrome()) {
		getApp().windows.getCurrent({populate: true}, toogleCurWndProcessor);
	}
	else{	
		var getting = getApp().windows.getCurrent({populate: true});
		getting.then(toogleCurWndProcessor, onIterateError);
	}
}

function updateAllIcons() {
	if (isChrome()) {
		getApp().windows.getAll({ populate: true }, updateAllIconsProcessor);
	}
	else{		
		var getting = getApp().windows.getAll({ populate: true });
		getting.then(updateAllIconsProcessor, onIterateError);
	}
}

//-----------------------------------------------------------------------------------------------

function onResponse(response) {
}

function onError(error) {
	doResponse((error == "Error: An unexpected error occurred") || (error == "Error: undefined"));
}

function onChromeResponse(response) {
	doResponse(getApp().runtime.lastError.message == "Error when communicating with the native messaging host.");
}

function doResponse(bSuccess) {
	
	if (!bSuccess) {
		getApp().tabs.create({"url": "https://vm-devr.github.io/aot/"});
	}
	else {
		toogleCurWnd();
	}
}

function toggleAOT() {
	try{
		if (isChrome()) {
			getApp().runtime.sendNativeMessage("always_on_top", { text: "" }, onChromeResponse);
		}
		else {			
			var sending = getApp().runtime.sendNativeMessage("always_on_top", "");
			sending.then(onResponse, onError);
		}		
	}
	catch (ex) {
		console.log("AOT error " + ex.toString());
	}
}

function handleTabAttached(tabId, attachInfo) {
	updateTabIcon(tabId, attachInfo.newWindowId);
}

function handleTabCreated(tabId, changeInfo, tabInfo) {
	updateTabIcon(tabInfo.id, tabInfo.windowId);
}

function handleWndRemoved(windowId) {
	if (setPinned.has(windowId)) {
		setPinned.delete(windowId);
	}
}

function handleWndCreated(windowInfo) {
	updateCurWndIcons();
}

//-----------------------------------------------------------------------------------------------

getApp().browserAction.onClicked.addListener(toggleAOT);
getApp().commands.onCommand.addListener(toggleAOT);

getApp().tabs.onAttached.addListener(handleTabAttached);
getApp().tabs.onUpdated.addListener(handleTabCreated);

getApp().windows.onCreated.addListener(handleWndCreated);
getApp().windows.onRemoved.addListener(handleWndRemoved);

updateAllIcons();

//-----------------------------------------------------------------------------------------------