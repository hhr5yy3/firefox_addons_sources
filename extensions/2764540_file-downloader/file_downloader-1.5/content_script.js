const dialogOpen = "message_from_background_open_dialog";
const message_from_background = "message_from_background";

function init() {
    //Create a mutation observer which observe the changes in the document
    // If any element is added and removed callback function will be triggered.
    // In our case if an element having id='mfd-downloader-initiate-section' is added to the document
    // Extension will know that download has started..
	let observer = new MutationObserver(mutations => {
		for(let mutation of mutations) {
			 for(let addedNode of mutation.addedNodes) {
				if (addedNode.id === "mfd-downloader-initiate-section") {
					console.log('Download started...');
					retrieveDownloadInfoAndInformToServiceWorker();
				}
				if (addedNode.id === "mfd-downloader-detect-extension-id") {
					const inputCheck = document.getElementById('mfd-downloader-detect-extension-id');
					inputCheck?.setAttribute('value','extension_detected');
					inputCheck?.click();
				}
			  }
		 }
	 });
	 observer.observe(document, { childList: true, subtree: true });
	 
	 chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {

			if(request.msg === dialogOpen){
				if(request.open){
					// Sends message to open dialog to the webapp.
					const inputCheck = document.getElementById('mfd-downloader-detect-extension-id');
					inputCheck?.setAttribute('open', request.open);
					inputCheck?.click();
				}
			}

			if (request.msg === message_from_background) {
				// This is the place where we sent data to the webapp.
				const inputCheck = document.getElementById('mfd-downloader-detect-extension-id');
				inputCheck?.removeAttribute("open");
				inputCheck?.setAttribute('value','extension_detected');
				inputCheck?.setAttribute('data', JSON.stringify(request.items));
				inputCheck?.click();

        	}
        }
    );
}


function retrieveDownloadInfoAndInformToServiceWorker(){
	let downloaderInitiateTag = document.querySelector("div[id='mfd-downloader-initiate-section']");
	
	// presence of download tag will indicate download has started..
	if(downloaderInitiateTag){
		let selectedFiles = [];

		let downloaderSelectTags = document.querySelectorAll("input[mfd-downloader-select-href][mfd-downloader-select-download]");
	
		// presence of watch tag will indicate a call to downloader watch
		if(downloaderSelectTags && downloaderSelectTags.length){

			let i, selectTag;

			for(i=0;i<downloaderSelectTags.length;i++) {
				selectTag = downloaderSelectTags[i];
				selectedFiles.push({
					"href":absolutePath(selectTag.getAttribute("mfd-downloader-select-href")),
					"download":fileName(selectTag.getAttribute("mfd-downloader-select-download"))
				});
			}
			
			let path = downloaderInitiateTag.getAttribute("mfd-downloader-path");
            
            // After getting selected files send message to service worker with selectedFiles details and 
            // upload path Send message to background service worker..to download..
			chrome.runtime.sendMessage({downloadInitiate: true, selected: selectedFiles, path: path});
		}

        // Download info already sent to service worker so remove the downloadInitiate tag.. 
		downloaderInitiateTag.remove();

	}
}

function absolutePath(href) {
	var a=document.createElement("a");
	a.href=href;
	return a.href;
}

function fileName(path) {
	var i=path.lastIndexOf("/");
	var j=path.lastIndexOf("\\");
	i=(i>j?i:j);
	return (i>-1?path.substr(i+1):path);
}

function getFileName(fileName){
	let result = [];
	if(fileName.includes("\\")){
		result = fileName.split("\\");
	}else if(fileName.includes("/")){
		result = fileName.split("/");
	}
	return result;
}


init();