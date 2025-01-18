
/*****
   Internationalisation -> var text = chrome.i18n.getMessage("add_bookmark");
  ********/ 


/******
  ChangeIcon - A function that changes the icon
******/

function ChangeIcon(icon) {
	chrome.browserAction.setIcon({ path : icon});
}

/******
  OpenService - Function, which, depending on the settings add-ons, opens onlinezakladki.ru service 
   with the parameters to create a bookmark or  creates bookmark a site in the background.
******/

function OpenService(tab, sender){ 

  var sender = sender || 'button';
  var url = (Ext.browser.name == 'YaBrowser' && sender == 'button') ? Ext.serviceUrl[0] : Ext.serviceUrl[0]+"/?url="+encodeURIComponent(tab.url)+"&title="+encodeURIComponent(tab.title);
  
    Ext.Bd.GetSetting(function(S) {
	   
	  if(S.isAllowedDataExchange == 'no' || 
	     S.isCreateBookmarkInBg == 'no' || 
		(Ext.browser.name == 'YaBrowser' && sender == 'button')) {
			 
	     chrome.tabs.create({"url": url});
		
		       } else {
		
		  Ext.Bd.AddTaskToMakeScreen({id: Ext.Bfn.randomNumber(), type: 'bg', url: tab.url, title: tab.title});
				 
		   }	 
     });
}

/******
   Open service in New tab for different browsers
******/

  switch(Ext.browser.name){
	  
	  case 'OPR':

        chrome.tabs.onCreated.addListener(function(tab) { 
		
	      var newUrl = (!tab.pendingUrl) ? tab.url : tab.pendingUrl;   
		         console.log('BK -> '+Ext.browser.name+' created tab: ', newUrl.substr(0, 25), ((newUrl.length > 25) ? '...' : ''));
     				 
             if(Ext.Bfn.IsNewTabPage(newUrl, 'browser')) { 	    
			       console.log('BK -> IsNewTabPage, BK service will be opened');
				   
		          Ext.Bd.GetSetting(function(S){
	                  var url = Ext.Bfn.getUrlForNewTabPage(S, chrome.extension.getURL('newChromiumTab.html')); 
					        chrome.tabs.remove(tab.id, function(){ 
				               chrome.tabs.create({"url": url, "windowId": tab.windowId }); 
				                 });
                           });  
                     }
               });
			   
	    break;
		
  } // end switch		
  
  /******
     On the add-on page, opens a link in the background tab if the user pressed a combination of the left mouse button + Ctrl 
	   or the middle mouse button (by default the browser opens links in the new active tab) (added 27.04.2017)
   ******/
	 
    // Remember active Tab
  chrome.tabs.onActivated.addListener(function(r) {
	  Ext.ActiveTab[r.windowId] = r.tabId; 
        });
  
    // Delete from memory removed Tab
  chrome.windows.onRemoved.addListener(function(windowId) {
       delete Ext.ActiveTab[windowId];
          });
  
     // Open the link in the background tab if necessary
  chrome.tabs.onCreated.addListener(function(tab) { 
	 if (Ext.DetectNewBackgroundTab) {
		  Ext.DetectNewBackgroundTab = false;
		  
		  if (!tab.active && !tab.selected) {
             return;
	          }
		  
		    var tabID = Ext.ActiveTab[tab.windowId];
              if (!tabID || tabID == tab.id) {
                    return;
			          }
		       chrome.tabs.update(tabID, {active: true});
	            }
        });

/******
  Create a menu item and hang handler create a bookmark if the following conditions are satisfied.
******/

  chrome.contextMenus.removeAll(function() {
     chrome.contextMenus.create({
		      title: 'Добавить страницу в Онлайн Закладки', 
			  contexts: ['page'], 
			  id: 'OnlinezakladkiItem'
			    });
        });  
  
  chrome.contextMenus.onClicked.addListener(function(info, tab) {	
	if (Ext.Bfn.CheckMenu(info.menuItemId) && !Ext.Bfn.IsNewTabPage(tab.url, 'browser extension service')) {
		  OpenService(tab, 'contextMenu');
	           }
       });

/******
  Create a button and hang handler create a bookmark if the following conditions are satisfied. 
   Also make animation "click" on the button
******/

  chrome.browserAction.onClicked.addListener(function(tab) { 
	if (!Ext.Bfn.IsNewTabPage(tab.url, 'browser extension service')) {
		  OpenService(tab, 'button');
	        }
	 ChangeIcon("icons/clicked_icon_18.png");
	  setTimeout(function(){ ChangeIcon("icons/icon_18.png"); }, 150);
  });

/******
  Handler action during installation, start-up, update addons
******/

chrome.runtime.onInstalled.addListener(function(Details) { 
												
   /******
  Overwriting settings, in particular, update version of addon for display on the site onlinezakladki.ru
    ******/
												
  switch(Details.reason) {
     case 'install':
     case 'update':
     case 'chrome_update':
         Ext.Bd.GetSetting(function(S) {
		   Ext.Bd.SetDefaultSetting(S, function(){
			 if(Ext.browser.name == 'YaBrowser' && Details.reason == 'install') {
			      chrome.tabs.create({"url": chrome.extension.getURL('options.html')});
			             } else
			  if(Ext.browser.name != 'YaBrowser' && Details.reason == 'install') {
				  chrome.management.getSelf(function(r){
	               var request = '?browser='+Ext.browser.name+'&version='+r.version+'&locale='+Ext.locale+'&ext_id='+r.id;
				       chrome.tabs.create({"url": 'https://service.onlinezakladki.ru/bookmarks-installed-sussefully.html'+request});
	                         });
			             }
		           });  
	          });
     break;
    }
});

if(chrome.runtime.setUninstallURL) {
	chrome.management.getSelf(function(r){
	  var request = '?browser='+Ext.browser.name+'&version='+r.version+'&locale='+Ext.locale+'&ext_id='+r.id;
          chrome.runtime.setUninstallURL('https://service.onlinezakladki.ru/bookmarks-reviews.html'+request);
	          });
        }

/******
  Message handler of the "content script" for later transmission to site onlinezakladki.ru
******/

  chrome.runtime.onMessage.addListener(function(r){ 
	
	switch(r.task) {
		
	  case 'BgSendJobToExternalRequestHandler':
	    Ext.Handler.prepareExternalRequestToProcess(r.data); 
		   // (added 26.10.2017)
	   break;
	  
	  case 'BgDetectNewBackgroundTab':
	    Ext.DetectNewBackgroundTab = true;
		  // (added 27.04.2017)
	  break;
	  
	  case 'BgDetectClickToLocalResource':
	     Ext.Bd.GetSetting(function(S){ 
		 
	      if(S.isAllowedDataExchange == 'no' || S.isOpenLocalLink == 'no'){
		   
		    var message = {
			     title: 'Не удалось открыть Ссылку', 
				 message: 'Проверьте разрешение "Открывать локальные ссылки" в Настройках сервиса для выполнения данной операции.'
						  };
			      Ext.Bfn.PrintMsg(message);
		  
	            } else {
					
	          Ext.Bfn.localLinksHandler(r.data);
			  
			    }
		  });
	      // (added 03.03.2020)
	   break;
	  
	  default:
	    console.log('EXT: file => background.js,  onMessage.addListener => isBadRequest');
		console.log(r);
	   break;
	     }
     });

/******
  Handler Overwrite local storage. 
   Used to build the process of creating websites screenshots in the hand mode or in the background.
******/

 chrome.storage.onChanged.addListener(function(changes, areaName) {	 
											   
	 if(areaName == 'local' && 'CaptureStatus' in changes && typeof changes.CaptureStatus.newValue !== "undefined") {
		 
		var el = changes.CaptureStatus.newValue;  // console.log('BKMK -> EXT CaptureStatus: '+el.status+', URL => '+el.url);
		
		 switch(el.status) {
		  
		  case 'captureEnd':
		  
		    if(el.type == 'hand') {
				   el.ID = el.id;
				   el.status = 1;
				   el.data = el.screenshot;
					 Ext.Handler.completeProcessExternalRequest(el); 
			     }
			
			if(el.type == 'bg') {
				Ext.Bd.GetData({'BgSavedWebsites': false}, function(dt) {										  
		         var Websites = !dt.BgSavedWebsites ? [] : dt.BgSavedWebsites;
		             Websites.push(el); console.log(Websites);
					  Ext.Bd.SetData({'BgSavedWebsites': Websites});
		               });
			  }
			
			 el.status = 'captureFinish';
			Ext.Bd.SetData({'CaptureStatus': el});
		  
		  break;
		  
		  case 'captureFinish':
		  
		      captureQueue.next();
		  
		  break;
		}
	 }
	 
/******
  Handler Overwrite local storage. 
   Used to create backUp in browser bookmarks.
******/

   var todayDate = Ext.Bfn.timestampToDate(false, true); 
	 
	 if(areaName == 'local' && 'Websites_'+todayDate in changes && typeof changes['Websites_'+todayDate].newValue !== "undefined") {
		 
		 var w = changes['Websites_'+todayDate].newValue, s; 
		 
		   if(w.length > 0 && (w = Ext.Bd.parseStorageData(w))) {
			     
			   clearInterval(Ext.BrowserBackUpWebsitesIntervalID); 
		        Ext.BrowserBackUpWebsitesIntervalID = setInterval(function() {
				  if(!Ext.BrowserBackUpWriteAccess) {
					     return false; 
				            } 	
				   clearInterval(Ext.BrowserBackUpWebsitesIntervalID);
				     Ext.BrowserBackUpWriteAccess = false;  
                       Ext.Bd.getBookmarkFolderId(todayDate, function(r) { 
			             Ext.Bd.addBookmarksTree(Ext.Bd.prepareTreeStructure(w, 'visual_', 0), r.data['Visual.Bookmarks'], false, function(){	
			               Ext.Bd.addBookmarksTree(Ext.Bd.prepareTreeStructure(w, 'panel_', 0), r.data['Panel.Bookmarks'], false, function() {
						     Ext.BrowserBackUpWriteAccess = true; 
							   Ext.Bfn.logged('In browser bookmarks added backUp from '+todayDate); 							
				                            });
						               });
				                  });
					         }, 3000);
			            }
	              }
           });