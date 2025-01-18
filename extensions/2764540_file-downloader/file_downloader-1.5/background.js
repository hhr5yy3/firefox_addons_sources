const dialogOpen = "message_from_background_open_dialog";
const message_from_background = "message_from_background";

var downloadRequestedTabId = [];
var downloadItemsInfo = [];
function init() {
    //Listen message from the content_script
    //request.downloadInitiate should be true to start download..
	chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
		//check if message is from content script
		if(sender.tab) {
			//message is from the content script
			if(request.downloadInitiate){
				console.log('message received from content script to download');
				getCurrentTabId((tabId)=>{
					downloadRequestedTabId.push(tabId);
					beginDownload(request.selected, request.path);
					listenForFileDownloadItemState();
				});
			}
		}
	});

	//listen for active tab changes
	chrome.tabs.onActivated.addListener(function(activeInfo) {
		getCurrentTabId((tabId)=>{
			const matchedTabId = downloadRequestedTabId.find(id=> id === tabId);
			if(matchedTabId && tabId === matchedTabId){
				let records = [...downloadItemsInfo].filter(x=> x.fileName !== undefined);
				chrome.tabs.sendMessage(tabId, {msg: message_from_background, items: records}); 
			}
		});
	});
}

function listenForFileDownloadItemState(){
	getCurrentTabId((tabId)=>{

		// Send message to open dialog
		chrome.tabs.sendMessage(tabId, {msg: dialogOpen, open:true});  
	});

	

	downloadItemsInfo = [];
	// This is to listen for download changes..
	chrome.downloads.onChanged.addListener(function(data){
		const alreadyExistsItem = downloadItemsInfo.find(item=> item.id === data.id);
		if(!alreadyExistsItem){
			downloadItemsInfo.push({id: data.id, fileName: '', progress: 0});
		}
		
		getProgress(data.id, (progress)=>{
			const index = downloadItemsInfo.findIndex(x => x.id === data.id);
			downloadItemsInfo[index].progress = progress;
			sendMessageToContentScript(downloadItemsInfo);
		});
	});
}

// Query the proportion of the already downloaded part of the file
// Passes a ratio between 0 and 1 (or -1 if unknown) to the callback
function getProgress(downloadId, callback) {
	chrome.downloads.search({id: downloadId}, function(item) {
		const downloadItem = item[0];
		const index = downloadItemsInfo.findIndex(x => x.id === downloadId);
		downloadItemsInfo[index].fileName = downloadItem.filename;
	  if(downloadItem.totalBytes > 0) {
		callback(downloadItem.bytesReceived / downloadItem.totalBytes);
	  } else {
		callback(-1);
	  }
	});
  }

  function sendMessageToContentScript(items){
	getCurrentTabId((tabId)=>{
		const matchedTabId = downloadRequestedTabId.find(id=> id === tabId);
		if(matchedTabId && tabId === matchedTabId){
			chrome.tabs.sendMessage(tabId, {msg: message_from_background, items: items});  
		}
		
	});
	
  }

  function getCurrentTabId(cb) {
    var query = {active: true, currentWindow: true};
    chrome.tabs.query(query, function (tabArray) {
        if(tabArray.length>0 ) cb(tabArray[0].id);
    });
}

function beginDownload(data, path){
	chrome.storage.sync.get(['folder'], (settingFromStorage)=>{
		const folderName = settingFromStorage.folder;
		if(folderName) path = folderName;
		if(data){
			//add the slash to the end of the path if it exists
			path = (path == undefined ? "" : (path.endsWith('/') ? path : path + "/"));
	
			for(i=0;i<data.length;i++) {
				//save this file
				d=data[i];
				const fileName = `${path}${d.download}`;
				chrome.downloads.download({"url":d.href,"filename": fileName,"conflictAction":"uniquify"});
			}
		}
	});	
}


init();

chrome.runtime.onInstalled.addListener(function(){
	chrome.tabs.query({currentWindow: true}, function(tabs) {
		for(let tab of tabs){
			if(tab.url?.includes('studiocdn-web')){
				chrome.tabs.update(tab.id, {url: tab.url});
			}
		}
        
    });
});