
  /***********
	  FromUrlToScreen - Encodes the image at the specified path in the base64 format
   ***********/

function FromUrlToScreen(url, path, callback) {
	var canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
		canvas.width = 300;
        canvas.height = 225;
		ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFFFFF";
		ctx.fill();
		    var img = document.createElement('img');
		        img.addEventListener('load', function() { 
                  ctx.drawImage(img, 0, 0, img.width, img.height); 
				    data = canvas.toDataURL('image/jpeg');
		         if (typeof callback === 'function') callback(data);
			});
		  img.src = path;
}

  /***********
	  FailLoadingHandler - It gives the image in base64 format for the websites not found
   ***********/

function FailLoadingHandler(url, callback) {
	      FromUrlToScreen(url, 'icons/screenshots/not_available.jpg', function(data) {
		     if (typeof callback === 'function') callback(data);									   
	        });				
}

  /***********
	  captureQueue - Websites queue handler to create bookmarks and bookmarks screenshots  
   ***********/

var captureQueue = function() {
	
  var WAITE_TIMEOUT = 1000 * 8 * 1,
	  defaultZoom = 1,
	  ScHeight = window.screen.height,
	  ScWidth = (((ScHeight-200)*1.25 > window.screen.width) ? window.screen.width : Math.round((ScHeight-200)*1.25)),
	  ScKoef = ((1/(1350/ScWidth) > 1) ? 1 : parseFloat((1/(1350/ScWidth)).toFixed(2))),
      mainQueue = [],
      waitTimeoutEndId,
      checkLoadingEndId,
	  queueItem,
      captureBegining = false,
	  createdWindow = false,
	  createdTab = false,
      exemplar = {};

  publicInterface();
	 
	/***************
	
	****************/
	 
	 function handleTabsUpdated(tabId, changeInfo) {
		 if(createdWindow && createdTab && createdTab.id == tabId) {
			 if(changeInfo.hasOwnProperty('status') && changeInfo.status == 'complete') {
				   startScreenProcess();
			             }
		          } 
           }
  
   /***********
	  waitTimeoutEnd - if expired timeout page load, to complete the process of creating a screenshot
     ***********/
											  
     function waitTimeoutEnd() { // console.log('Сработал таймаут ожидания загрузки страницы');
	   if(createdWindow && createdTab) {
		   startScreenProcess();
	         } 
	   };
  
  /***********
	  closeOpenedWindow - Close the window at the end of the captures
     ***********/
	
	function closeOpenedWindow(isControl) {
		
		 if(createdWindow) {
			  if(chrome.tabs.onUpdated.hasListener(handleTabsUpdated)){
				   chrome.tabs.onUpdated.removeListener(handleTabsUpdated);  
			           }
	          chrome.windows.remove(createdWindow.id, function() {
				 createdWindow = false;
	             createdTab = false;
		         captureBegining = false;
                if(!isControl) {
			        queueItem.status = 'captureFinish'; 
			         Ext.Bd.SetData({'CaptureStatus': queueItem}); 
		                       } 
                        });  
	            }
	    };
		
	function startScreenProcess(){
		clearTimeout(waitTimeoutEndId);
		 chrome.tabs.getZoom(createdTab.id, function(zoom) { 
			defaultZoom = zoom;
		   chrome.tabs.setZoom(createdTab.id, ScKoef, function() {
			   Ext.Bfn.logged('makeTabCapture: Zoom => '+(ScKoef*100)+'%');
			    if(chrome.runtime.lastError) {
		            Ext.Bd.SetErrorInLog({message: 'makeTabCapture >> '+chrome.runtime.lastError.message, filename: '#', lineno: '0'}); 
			              queueItem.status = 'captureEnd'; 
					      queueItem.screenshot = false;
				            Ext.Bd.SetData({'CaptureStatus': queueItem});
					        Ext.Bfn.logged('makeTabCapture: Screen failed ('+queueItem.url+')');
                           closeOpenedWindow(true);							
			              return false;
	                        }
			  chrome.windows.update(createdWindow.id, {width: ScWidth, height: ScHeight}, function(){
				 Ext.Bfn.logged('makeTabCapture: Window Width => '+ScWidth+', Window Height => '+ScHeight);
				   setTimeout(function() {
				       makeTabCapture(createdTab, function(data) { 
				          queueItem.status = 'captureEnd'; 
					      queueItem.screenshot = data;
				            Ext.Bd.SetData({'CaptureStatus': queueItem});
					        Ext.Bfn.logged('makeTabCapture: Screen '+(!data ? 'failed' : 'created')+' ('+queueItem.url+')');
					  chrome.tabs.setZoom(createdTab.id, defaultZoom, function() {
						 Ext.Bfn.logged('makeTabCapture: Zoom => '+(defaultZoom*100)+'%');
						  setTimeout(function() {
			                 closeOpenedWindow(true);
									   }, 500);
			                    }); // chrome.tabs.setZoom
                        }); // makeTabCapture
		            }, 1000);														   
							
							}); // chrome.windows.update
					 }); // chrome.tabs.setZoom
			  }); // chrome.tabs.getZoom
		}
  
   /***********
	  run - Launch the process of creating a screenshot 
   ***********/

   function run() { 
	  
     queueItem = mainQueue.shift();
	 captureBegining = true;
	 
	  Ext.Bd.SetData({'CaptureStatus': queueItem});
	
    var newWindow = {
            url: queueItem.url,
            left: 10000,
            top: 10000,
            width: ScWidth,
            height: ScHeight
              };
	
	if(Ext.browser.name != 'Firefox') {
		newWindow.focused = false;
		newWindow.width = 1;
		newWindow.height = 1;
	      }

    chrome.windows.create(newWindow, function(createdWin) { 
											  
		createdWindow = createdWin;
		 chrome.tabs.onUpdated.addListener(handleTabsUpdated);
		  waitTimeoutEndId = setTimeout(waitTimeoutEnd, WAITE_TIMEOUT); 
		
		  chrome.tabs.query({'windowId': createdWindow.id}, function(foundTab) {
											 
            if(foundTab.length === 0) {  // console.log('В открытом окне нет ни одной вкладки, что-то не то');	
			     clearTimeout(waitTimeoutEndId);
                  closeOpenedWindow();
				return false;
                   }
	  
               createdTab = foundTab[0]; 
                  });
		 });
  }
  
   /***********
	  publicInterface - Add commands for queue handler 
    ***********/

  function publicInterface() {
    exemplar.get = function() { 
	  return mainQueue; 
	     };
    exemplar.add = function(item) { 
	 mainQueue.push(item); 
	  if(!captureBegining && !createdWindow && !createdTab)  {
		       run();
	             }
	     };
    exemplar.next = function() {
      if(mainQueue.length !== 0){
		 if(!captureBegining && !createdWindow && !createdTab) {
		       run(); 
	            } else {
			 setTimeout(exemplar.next, 3000);
			         }
	           }
	     };
  }
  
  return exemplar;
}();

   /***********
	  makeTabCapture - The immediate creation of a screenshot of the page 
    ***********/

function makeTabCapture(tab, callback) { 

  if(Ext.Bfn.isFile(tab.url)) { // Check page. It downloads?
	  FromUrlToScreen(tab.url, Ext.Bfn.isFile(tab.url), function(data) {
		   if (typeof callback === 'function') callback(data);									   
	          });
	   return true;
     }
  

  var thumbnailQuality = (window.screen.height > 1000) ? 2 : 1,
      img = document.createElement('img'), 
	  imgOptions = {format: 'jpeg', quality: 100},
	  canvas = document.createElement('canvas'), 
	  ctx = canvas.getContext('2d');
  
     chrome.tabs.captureVisibleTab(tab.windowId, imgOptions, function(capImage) { 
	 
	   if(chrome.runtime.lastError) {
		       Ext.Bd.SetErrorInLog({message: 'makeTabCapture >> '+chrome.runtime.lastError.message, filename: '#', lineno: '0'}); 
			    if (typeof callback === 'function') {
				      callback(false);
			            }			 
			 return false;
	             }
																	  
	   img.addEventListener('load', function() {   
				
		   canvas.width = img.width / thumbnailQuality;
           canvas.height = img.height / thumbnailQuality;
		   
		    ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#FFFFFF";
		    ctx.fill();
			ctx.drawImage(img, 0, 0, img.width-20, img.height, 0, 0, canvas.width, canvas.height); 
			
			   if (typeof callback === 'function') {
				     callback(canvas.toDataURL('image/jpeg'));
			           }
			    });
		 img.src = capImage;
	       });
}