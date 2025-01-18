var altOptionEnabled = false;
var recreateDefaults = false;

var imagesearchoptions = {
	//adds an individual item to the context menu and gives it the index passed into the function
	makeMenuItem: function(item, icon, index, useIcon){
		if(useIcon){
			chrome.contextMenus.create({
				id: index.toString(),
				title: item.toString(),
				contexts: ["image", "video"],
				icons: {"16": icon.toString()}
			})
		}else{
			//icons not supported, or undesirable. leave them out
			chrome.contextMenus.create({
				id: index.toString(),
				title: item.toString(),
				contexts: ["image", "video"]
			})
		}
	},
	
	//adds all URLs to the function from local storage, using indices 0 - urlList.length-1 as their IDs
	//this ID scheme is identical to that used for the storage of the menus and for their display in the options page
	makeMenuItems: function(browserInfo){
		var useIcons=true;
		if(parseInt(browserInfo.version, 10) < 56){ //not sure when icon support was added, but it existed in 56 and does not exist in 52
			useIcons=false;
		}
		
		chrome.contextMenus.removeAll();
		var urls = chrome.storage.local.get(["hideUseAlt", "urlList", "showSearchAll"], function(result){
			if (!result.urlList || (result.urlList.length == 0)){
				imagesearchoptions.restoreDefaults()
			}else{
				for (var i = 0; i < result.urlList.length; i++){
					if (result.urlList[i][3]){
						imagesearchoptions.makeMenuItem(result.urlList[i][1],result.urlList[i][2], i, useIcons);
					}
				}
				if (result.showSearchAll){
					imagesearchoptions.makeMenuItem("Search all", "", result.urlList.length,false);
				}
				if(result.hideUseAlt !== true) {
					chrome.contextMenus.create({
						type: "checkbox",
						id: "altOption",
						title: "Use Alternate",
						checked: altOptionEnabled,
						contexts: ["image"]

					})	
				}
			}
		})
	},
	
	//gets browser info and passes it to makeMenuItems to determine if things like icons are supported
	makeMenu: function(){
		var gettingBrowserInfo = browser.runtime.getBrowserInfo();
		gettingBrowserInfo.then(imagesearchoptions.makeMenuItems);
	},

	restoreDefaults: function(){
		var urls = chrome.storage.local.get(["urlList", "oldDefs"], function(result){
			var newDefaults =	[
									[1,"SauceNAO","icons/saucenao.ico",true,true,"https://saucenao.com/search.php","url=::$URL::","?","&",false,false,"http://saucenao.com/search.php","url=::$URL::","?","&",false,true],
									[2,"IQDB","icons/iqdb.ico",true,true,"https://iqdb.org/","url=::$URL::","?","&",false,false,"https://iqdb.org/","url=::$URL::","?","&",false,true],
									[3,"Google","icons/google.ico",true,true,"http://www.google.com/searchbyimage","image_url=::$URL::","?","&",false,false,"http://www.google.com/searchbyimage/upload","encoded_image=::$IMGDATA::","?","&",true,false],
									[4,"Ascii2D","icons/ascii2d.ico",true,true,"https://www.ascii2d.net/imagesearch/search/","uri=::$URL::","?","&",true,false,"https://www.ascii2d.net/imagesearch/search/","upload[file]=::$IMGDATA::","?","&",true,false],
									[5,"WhatAnime","icons/whatanime.ico",true,true,"https://trace.moe/","url=::$URL::","?","&",false,false,"https://trace.moe/","url=::$URL::","?","&",false,true],
									[6,"TinEye","icons/tineye.ico",true,true,"https://www.tineye.com/search","url=::$URL::","?","&",false,false,"https://www.tineye.com/search","image=::$IMGDATA::","?","&",true,false],
									[7,"Bing","icons/bing.ico",true,true,"https://www.bing.com/images/searchbyimage","cbir=sbi\nimgurl=::$URL::","?","&",false,false,"https://www.bing.com/images/searchbyimage","cbir=sbi\nimgurl=::$URL::","?","&",false,true],
									[8,"Baidu","icons/baidu.ico",true,true,"https://image.baidu.com/n/pc_search","queryImageUrl=::$URL::","?","&",false,false,"https://image.baidu.com/n/pc_search","queryImageUrl=::$URL::","?","&",false,true],
									[9,"Yandex","icons/yandex.ico",true,true,"https://yandex.com/images/search","url=::$URL::\nrpt=imageview","?","&",false,false,"https://yandex.com/images/search","url=::$URL::\nrpt=imageview","?","&",false,true],
									[10,"KarmaDecay","icons/karmadecay.ico",true,true,"https://karmadecay.com","image=::$IMGDATA::","?","&",true,false,"http://karmadecay.com","image=::$IMGDATA::","?","&",true,false],
									[11,"ImgOps","icons/imgops.ico",true,true,"https://www.imgops.com/","::$RAWURL::","","",false,false,"https://www.imgops.com/","::$RAWURL::","","",false,true]
								]
			
			if (!result.urlList || (result.urlList.length == 0)){
				//no prefs set, start from scratch
				var userPrefs = newDefaults
			}else{
				var oldDefaults = result.oldDefs
				var userPrefs = result.urlList
				
				//loop thru and update any unchanged portions of user prefs and find any which exist in newDefaults
				for (var i = 0; i < newDefaults.length; i++){
					for (var j = 0; j < userPrefs.length; j++){
						if(userPrefs[j][0] == newDefaults[i][0]){
							//fix whatanime url if still old setting - settings update code was broken when it changed, so long term ext users may have desynced.
							if((userPrefs[j][0] == 5) && (userPrefs[j][5] == "https://whatanime.ga/")){
								userPrefs[j][5] = "https://trace.moe/";
								userPrefs[j][11] = "https://trace.moe/";
							}
							
							//find old default which matches this item, if default not found in old set, ignore it.
							for (var k = 0; k < oldDefaults.length; k++){
								if(userPrefs[j][0] == oldDefaults[k][0]){
									//loop through all options in this user pref and compare to old defaults. if unchanged, update to new defaults.
									for (var l = 0; l < userPrefs[j].length; l++){
										if(userPrefs[j][l] == oldDefaults[k][l]){
											userPrefs[j][l] = newDefaults[i][l]
										}
									}
								}
								break; //default match found, no need to keep looking
							}
							break; //default match found, no need to keep looking
						}
					}
				}
				
				//loop thru and add any totally new defaults to user prefs
				var defaultFound = false
				for (var i = 0; i < newDefaults.length; i++){
					defaultFound = false
					for (var j = 0; j < oldDefaults.length; j++){
						if(oldDefaults[j][0] == newDefaults[i][0]){
							defaultFound = true
							break; //default match found, no need to keep looking
						}
					}
					if(!defaultFound){
						userPrefs.push(newDefaults[i])
					}
				}
				//recreate defaults if requested
				if(recreateDefaults){
					recreateDefaults = false;
					for (var i = 0; i < newDefaults.length; i++){
						defaultFound = false
						for (var j = 0; j < userPrefs.length; j++){
							if(userPrefs[j][0] == newDefaults[i][0]){
								defaultFound = true
								break; //default match found, no need to keep looking
							}
						}
						if(!defaultFound){
							userPrefs.push(newDefaults[i])
						}
					}
				}
			}
			//store the prefs and generate menu
			chrome.storage.local.set({urlList: userPrefs, oldDefs: newDefaults}, function() {
				chrome.runtime.sendMessage({type: "refreshPreferences"})
			})
			imagesearchoptions.makeMenu();
		});
	},

	firstRun: function(details){
		if (details.reason === 'install' || details.reason === 'update') {
			//set up pref variables, or update unchanged portions to match new defaults
			imagesearchoptions.restoreDefaults()
		}
	},
	
	dataURItoBlob: function(dataURI){
		//from https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
		//convert base64/URLEncoded data component to raw binary data held in a string
		var byteString;
		if (dataURI.split(',')[0].indexOf('base64') >= 0)
			byteString = atob(dataURI.split(',')[1]);
		else
			byteString = unescape(dataURI.split(',')[1]);
		
		// separate out the mime component
		var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
		
		// write the bytes of the string to a typed array
		var ia = new Uint8Array(byteString.length);
		for (var i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		return new Blob([ia], {type:mimeString});
	},
	
	prepareImageData: function(searchSet,imageData,imageURL,urlAvailable,intermediaryRequested,allUseImageData,altOffset,tabTypeOverride){
		//add response to form data like so: fd.append("file", blob);
		if(imageURL.startsWith("data:")){
			imageData = imagesearchoptions.dataURItoBlob(imageURL);
			imagesearchoptions.prepareAndProcessSearchOptions(searchSet,imageData,imageURL,urlAvailable,intermediaryRequested,allUseImageData,altOffset,tabTypeOverride);
		}else{
			var oReq = new XMLHttpRequest();
			oReq.open("GET", imageURL, true);
			oReq.responseType = "blob";
			oReq.send();
			oReq.onload = function(oEvent) {
				imageData = oReq.response;
				imagesearchoptions.prepareAndProcessSearchOptions(searchSet,imageData,imageURL,urlAvailable,intermediaryRequested,allUseImageData,altOffset,tabTypeOverride);
			};
		}
		
	},
	
	prepareFrameData: function(searchSet,videoURL,urlAvailable,intermediaryRequested,allUseImageData,altOffset,tabTypeOverride){
		var video = document.createElement("video");
		video.setAttribute('crossOrigin', 'anonymous');
		video.onloadeddata = function () {
			var canvas = document.createElement("canvas");
			canvas.width = this.videoWidth;
			canvas.height = this.videoHeight;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
			canvas.toBlob(function(imageData){
				imagesearchoptions.prepareAndProcessSearchOptions(searchSet,imageData,videoURL,urlAvailable,intermediaryRequested,allUseImageData,altOffset,tabTypeOverride);
			})
		};
		video.src = videoURL;		
	},
	
	prepareAndProcessSearchOptions: function(searchSet,imageData,imageURL,urlAvailable,intermediaryRequested,allUseImageData,altOffset,tabTypeOverride){
		if(intermediaryRequested || (!allUseImageData && !urlAvailable)){
			var oReq = new XMLHttpRequest();
			var fd  = new FormData();
			fd.append("file",imageData,"Image");
			oReq.open("POST", "https://tmp.saucenao.com");
			oReq.send(fd);
			blob = oReq.response;
			oReq.onload = function(oEvent){
				//parse response
				try{
					var data = JSON.parse(oReq.responseText);
				}catch(e){
					console.log("Unable to Parse JSON Intermediary Host Response... - " + oReq.responseText);
				}
				if(data['url']){
					imagesearchoptions.processSearchOptions(searchSet,imageData,imageURL,urlAvailable,intermediaryRequested,allUseImageData,altOffset,tabTypeOverride,data['url'])
				}else{
					console.log("Intermediary Host Did Not Return a URL... - " + oReq.responseText);
					imagesearchoptions.processSearchOptions(searchSet,imageData,imageURL,urlAvailable,intermediaryRequested,allUseImageData,altOffset,tabTypeOverride,"")
				}	
			};
		}else{
			imagesearchoptions.processSearchOptions(searchSet,imageData,imageURL,urlAvailable,intermediaryRequested,allUseImageData,altOffset,tabTypeOverride,"")
		}
	},
	
	processSearchOptions: function(searchSet,imageData,imageURL,urlAvailable,intermediaryRequested,allUseImageData,altOffset,tabTypeOverride,intermediaryURL){
		//if any need IMGDATA to URL intermediary host, prepare that URL. (publish spec and make intermediary host configurable in future)
		//for each, build get query string or post formdata object, and load into tab as desired.
		for (var i = 0; i < searchSet.length; i++){
			if(searchSet[i][10+altOffset] || !urlAvailable){
				imageURL = intermediaryURL;
			}
			
			var variableArray = searchSet[i][6+altOffset].split(/[\r\n]+/);
			
			if(searchSet[i][9+altOffset]){
				imagesearchoptions.processSearchOptionsPOST(searchSet,imageData,imageURL,altOffset,tabTypeOverride,variableArray,i)
			}else{
				//get
				var tabURL = searchSet[i][5+altOffset];
				for (j = 0; j < variableArray.length; j++){
					var varSeperator = searchSet[i][8+altOffset];
					if(j == 0){
						varSeperator = searchSet[i][7+altOffset];
					}
					if (variableArray[j].includes("::$URL::")){
						var key = variableArray[j].split("=");
						if(!key[0].includes("::$URL::")){
							tabURL = tabURL + varSeperator + key[0] + "=" + encodeURIComponent(imageURL);
						}else{
							tabURL = tabURL + varSeperator + encodeURIComponent(imageURL);
						}
					}else if (variableArray[j].includes("::$RAWURL::")){
						var key = variableArray[j].split("=");
						if(!key[0].includes("::$RAWURL::")){
							tabURL = tabURL + varSeperator + key[0] + "=" + imageURL;
						}else{
							tabURL = tabURL + varSeperator + imageURL;
						}
					}else{
						tabURL = tabURL + varSeperator + variableArray[j];
					}
				}

				imagesearchoptions.openTab(tabURL,tabTypeOverride);
			}
		}
	},
	
	processSearchOptionsPOST: function(searchSet,imageData,imageURL,altOffset,tabTypeOverride,variableArray,i){
		//post - compatibility could be improved by using generated form in a tab for non-file post requests.
		var oReq = new XMLHttpRequest();
		var fd = new FormData();
		for (j = 0; j < variableArray.length; j++){
			var key = variableArray[j].split("=");
			if (variableArray[j].includes("::$IMGDATA::")){
				fd.append(key[0], imageData, "Image");
			}else if (variableArray[j].includes("::$URL::")){
				fd.append(key[0], imageURL);
			}else{
				fd.append(key[0], key[1])
			}
		}
		oReq.open('POST', searchSet[i][5+altOffset]);
		oReq.send(fd);
		oReq.onload = function(){
			imagesearchoptions.openTab(oReq.responseURL,tabTypeOverride);
		}
	},
	
	openTab: function(tabURL, tabType){
		switch (tabType){
			case "0": //new active tab
				chrome.tabs.create({
					url: tabURL,
					active: true
				})
				break;
			case "1": //current tab
				chrome.tabs.update({
					url: tabURL
				});
				break;
			case "2": //new window
				chrome.windows.create({
					url: tabURL
				})
				break;
			case "3": //new background tab
				chrome.tabs.create({
					url: tabURL,
					active: false
				})
				break;
			case "4": //new private window
				chrome.windows.create({
					url: tabURL,
					incognito: true
				})
				break;
			case "5": //new tab next to current
				chrome.tabs.query({
					active: true
				}, tabs => {
					let index = tabs[0].index;
					chrome.tabs.create({
						url: tabURL,
						active: true,
						index: index + 1
					});
				});
				break;
			case "6": //new bg tab next to current
				chrome.tabs.query({
					active: true
				}, tabs => {
					let index = tabs[0].index;
					chrome.tabs.create({
						url: tabURL,
						active: false,
						index: index + 1
					});
				});
				break;
			default:
				//same as for case 0
				chrome.tabs.create({
					url: tabURL,
					active: true
				})
				break;
		}
	}
}

browser.runtime.onInstalled.addListener(imagesearchoptions.firstRun);
imagesearchoptions.makeMenu();
//create the browser header button for drag and drop/screen cropping stuff in future
//chrome.browserAction.onClicked.addListener(someFunction);

//listen to requests from options page to do specific things
browser.runtime.onMessage.addListener(function(message){
    if(message){
		switch (message.type){
			case "rebuildMenu":	
				imagesearchoptions.makeMenu();
				break;
			case "restoreDefaults":
				recreateDefaults = true;
				imagesearchoptions.restoreDefaults();
				break;
			default:
				break;
		}
	}
});

//perform the requested action on menu click
chrome.contextMenus.onClicked.addListener(function(info, tab){
	if (info.menuItemId == "altOption") {
		//handle alt option toggle
		altOptionEnabled = !altOptionEnabled;
	}else{
		//search requested, get prefs and build list of items to search (one or multiple)
		//if multiple, override new tab type if set to current
		chrome.storage.local.get(["urlList", "tabType"], function(result){
			var tabTypeOverride = result.tabType;
			var searchSet = [];
			var altOffset = 0;
			if(altOptionEnabled){
				var altOffset = 6;
			}
			
			if(info.menuItemId == result.urlList.length){
				//last menuItemId is multisearch, cycle through all options and select ones with multi enabled
				var totalSelected = 0;
				for (var i = 0; i < result.urlList.length; i++){
					if (result.urlList[i][4]){
						//if multisearch is enabled, add it to search set
						searchSet.push(result.urlList[i]);
						totalSelected++;
					}
				}
				if((totalSelected > 1) && (tabTypeOverride == 1)){
					//too many options selected, override current tab pref
					tabTypeOverride=0;
				}
			}else{
				//single item selected
				searchSet.push(result.urlList[info.menuItemId]);
			}
			//run thru enabled options and determine if imgdata is needed by any
			var imgDataRequested = false;
			var allUseImageData = true;
			var intermediaryRequested = false;
			for (var i = 0; i < searchSet.length; i++) {
				if(searchSet[i][6+altOffset].includes("::$IMGDATA::")){
					imgDataRequested=true;
				}else{
					allUseImageData = false;
				}
				if(searchSet[i][10+altOffset]){
					intermediaryRequested = true;
				}
			}
			
			//if datauri image, or video is chosen, extract image data, or first frame and mark as no url available. (need to force intermediary mode if option does not use imagedata - make this configurabel in future)
			//if any options need imagedata, extract it, but leave url marked as available
			//video support disabled for now
			var urlAvailable = true;
			var imageData;
			var imageURL = info.srcUrl;
			if (info.mediaType == "video"){
				urlAvailable = false;
				imagesearchoptions.prepareFrameData(searchSet,imageURL,urlAvailable,intermediaryRequested,allUseImageData,altOffset,tabTypeOverride);
			}else if(info.srcUrl.startsWith("data:")){
				urlAvailable = false;
				imagesearchoptions.prepareImageData(searchSet,imageData,imageURL,urlAvailable,intermediaryRequested,allUseImageData,altOffset,tabTypeOverride);
			}else if(imgDataRequested || intermediaryRequested){
				imagesearchoptions.prepareImageData(searchSet,imageData,imageURL,urlAvailable,intermediaryRequested,allUseImageData,altOffset,tabTypeOverride);
			}else{
				imagesearchoptions.prepareAndProcessSearchOptions(searchSet,imageData,imageURL,urlAvailable,intermediaryRequested,allUseImageData,altOffset,tabTypeOverride);
			}
			
		});
	}
})