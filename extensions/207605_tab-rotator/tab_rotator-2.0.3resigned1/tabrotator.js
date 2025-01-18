var delay = 5;
var active = false;
var isWaiting = false;
var startAutomatically = false;
var reloadTabs = false;
var delay_user = 1;
var windowId = -1; 

function setRotate() {
	
	if(active){
		active = false;
		browser.browserAction.setIcon({path: "icons/tabrotator_48_deactive.png"});
		browser.browserAction.setTitle({title: browser.i18n.getMessage("startRotating")});
	}else{
		active = true;
		browser.browserAction.setIcon({path: "icons/tabrotator_48.png"});
		browser.browserAction.setTitle({title: browser.i18n.getMessage("stopRotating")});
		
		if(!isWaiting){
			startTimer();
			chrome.tabs.query({ currentWindow: true
				}, (tabs) => {
					activeTab = 0;
					for (var i = 0; i<tabs.length; i++) {
						tab = tabs[i];
						if(tab.active==true){
							activeTab = i;
						}
						
					};
					
					windowId = tabs[activeTab].windowId;
					
				});
		}
	}
}

function startTimer(){
	var gettingItem = browser.storage.sync.get('rotationBehavior');
	gettingItem.then((res) => {
			
		querySettings = {windowId: windowId};
		if(windowId==-1 || res.rotationBehavior=="current"){
			querySettings = {currentWindow: true};
		}
		chrome.tabs.query(querySettings, (tabs) => {
			activeTab = 0;
			for (var i = 0; i<tabs.length; i++) {
				tab = tabs[i];
				if(tab.active==true){
					activeTab = i;
				}
				
			};
			var timeSettings;
			var gettingItem = browser.storage.sync.get('delay');
			gettingItem.then((res) => {
				timeSettings = res.delay || delay;
			
				timeSegments = timeSettings.split(";");
				
				delay_user = timeSegments[0];
				if(timeSegments.length > activeTab){
					delay_user = timeSegments[activeTab];
				}
				
				delay_user = parseInt(delay_user,10);
				if(!isNaN(delay_user) && delay_user>=1){
					delay = delay_user
				}
				isWaiting = true;
				setTimeout(nextTab, delay*1000);
			});
		});	
	
	});
}

function nextTab(){
	isWaiting = false;
	
	if(active){	
		var gettingRotationBehavior = browser.storage.sync.get('rotationBehavior');
		gettingRotationBehavior.then((res) => {
			
			if(res.rotationBehavior == "all"){
				var getting = browser.windows.getAll({
					populate: true,
					windowTypes: ["normal"]
				});
				getting.then((windowInfoArray) => {
					for (windowInfo of windowInfoArray) {
						switchTab(windowInfo.tabs);
					}
				});
			}else{
				querySettings = {windowId: windowId};
				if(windowId==-1 || res.rotationBehavior == "current"){
					querySettings = {currentWindow: true};
				}
				chrome.tabs.query(querySettings, (tabs) => {
					switchTab(tabs);
				});
			}
	
			startTimer();
		});
	}
}

function switchTab(tabs){
	activeTab = 0;
	for (var i = 0; i<tabs.length; i++) {
		tab = tabs[i];
		if(tab.active==true){
			activeTab = i;
		}
		
	};
	
	gettingReloadTabs = browser.storage.sync.get('reloadTabs');
	gettingReloadTabs.then((res) => {
		reloadTabs = res.reloadTabs || false;
	});
	
	if(reloadTabs){
		browser.tabs.reload(tabs[activeTab].id);
	}
	
	chrome.tabs.update(tabs[(activeTab+1)%tabs.length].id, {
		active: true
	});
}

browser.browserAction.onClicked.addListener(setRotate); 


browser.browserAction.onClicked.addListener((tab) => {

});


gettingItem = browser.storage.sync.get('startAutomatically');
gettingItem.then((res) => {
	startAutomatically = res.startAutomatically;
	if(startAutomatically){
		setRotate();
	}
});
