
var Ext = {
	        'Bfn': function(){},
			'Bd': function(){},
			'Handler': function(){},
	        'serviceUrl': ['https://onlinezakladki.ru', 'https://bk.tools'],
			'extensionUrl': chrome.runtime.getURL('/'),
            'Response': [],
			'DetectNewBackgroundTab': false, 
			'ActiveTab': {},
			'newTabOpened': false,
			'BrowserBackUpWebsitesIntervalID': false,
			'BrowserBackUpWriteAccess': true,
			'requestErrorMessage': 'browser API returned an Error!',
			'optionsList': [
                'isAllowedDataExchange',
                'isOpenInNewTab', 
	            'isOpenLocalLink', 
	            'isCreateBookmarkInBg', 
	            'isCreateScreenWithExt', 
	            'isCreateBackUpWithExt',
	            'isAllowedSendErrorToWeb'
	                ],
			 'availableTranslate': [
			     'en'
			     ]
             };

   /***********
	  Ext.Bfn.sIncrease - sotr Array from minPosition to maxPosition
   ***********/

 Ext.Bfn.sIncrease = function(i, ii) {
	 return (i.index - ii.index); 
      };
	  
  /***********
	  Ext.Bfn.ObjLength - Object length
   ***********/
	  
 Ext.Bfn.ObjLength = function(obj) { 
     var c = 0; for(var el in obj) { if(obj.hasOwnProperty(el)) c++; } 
      return c;  
	   };
	   
  /************
       Ext.Bfn.getUniqueValuesFromBgWebsites
	***********/
	   
 Ext.Bfn.getUniqueValuesFromBgWebsites = function (arr) {
    var current, prev = false, length = arr.length, unique = [];
     for(var i = 0; i < length; i++) {
		  current = arr[i]; 
            if (!prev || (prev.url != current.url && prev.id != current.id && prev.exp_time != current.exp_time)) {
				   prev = current;
                    unique.push(current);
                       }
             }
    return unique;
  };
	   
  /***********
	  Ext.Bfn.timestampToDateh - Timestamp to String Date
   ***********/

  Ext.Bfn.timestampToDate = function(timestamp, base) {
    var d = (!timestamp) ? new Date() : new Date((Number(timestamp)*1000)), pre = function(t) { return ('0' + String(t)).slice(-2); };
	  if(base) {
		  return pre(d.getDate()) + '.' + pre(d.getMonth()+1) + '.' + d.getFullYear();
	          } else {
          return pre(d.getDate()) + '.' + pre(d.getMonth()+1) + '.' + d.getFullYear() + ' ' +  pre(d.getHours()) + ':' + pre(d.getMinutes());
			 }
         };
		 
   /***********
	  Ext.Bfn.timestampToDateh - String Date To Timestamp (02.12.2019 to 1575244800)
   ***********/
		 
   Ext.Bfn.DateToTimestamp = function(stringDate){
	   var stringDate = stringDate.split('.');
	   var date = new Date(stringDate[2], Number(stringDate[1])-1, stringDate[0]);
	     return Number(date.getTime())/1000;
      };

  /***********
	  setCookie - Set browser cookies (used to restore the local data)
	   setCookie("foo", "bar", "Mon, 01-Jan-2001 00:00:00 GMT", "/");
   ***********/

 Ext.Bfn.setCookie = function(name, value, expires, path, domain, secure) { 
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
  };
  
  /***********
	  getCookie - Get browser cookies (used for storing local data)
   ***********/
  
 Ext.Bfn.getCookie = function(name) { // getCookie("uid");
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = false;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	 }
	return(setStr);
  };
  
   /***********
	  logged - Logging function for the analysis capabilities
   ***********/
  
 Ext.Bfn.logged = function() { 
   var m = '', a = arguments; 
       for(var i=0; i<a.length; i++) { 
	     m += (m.length == 0) ? a[i] : ", "+a[i]; 
		   }  
		   
	 if(Ext.Bfn.IsNewTabPage(window.location.href, 'extension service')){ 
	        if(window.location.href.split('/').pop() == 'background.html'){
				 Ext.Handler.prepareExternalRequestToProcess({task: 'RewriteLog', data: m});
			        } else {
				 Ext.Bd.RewriteLog('<extInfo>EXT</extInfo>: '+m);
					} 
		    }
	 };
 
   /***********
	  PrintMsg - Function to display error and messages
   ***********/
 
 Ext.Bfn.PrintMsg = function (r) {
	 
	r.title = r.title || '';
	r.iconUrl = 'icons/icon_48.png';
	r.type = 'basic';
	
	 if(Ext.browser.name == 'Firefox') {
		  chrome.notifications.create('', r);
	            } else {
		  new Notification(r.title, {icon: r.iconUrl, body: r.message});	
		    }
	 };
	
   /***********
	  getExtensionPage - Output extension page (used in the process of creating a site screenshot)
   ***********/
	
 Ext.Bfn.getExtensionPage = function(page) { 
    var ext = String(page); ext = page.split('.'); 
	   return (ext.length>1) ? ext[ext.length - 1] : false; 
	 }; 
 
   /***********
	  isFile - Check page. It downloads? (used in the process of creating a site screenshot)
   ***********/

 Ext.Bfn.isFile = function(url) { 
 
   var ext = Ext.Bfn.getExtensionPage(url);
     if(!ext) return false;
 
   var IssetIcons = ['AC3', 'AVI', 'BAT', 'BIN', 'CSS', 'DAT', 'DIV', 'DLL', 'DOC', 'DOCX', 'EXE', 'INI', 'ISO', 'JAVA', 'LOG', 'M4A', 'MID', 'MOV', 'MP2', 'MP3', 'MP4',
					 'MPEG', 'MPG', 'PDF', 'PPT', 'PPTX', 'PSD', 'RAR', 'RTF', 'TTF', 'TXT', 'WAV', 'WMA', 'XLS', 'XLSX', 'ZIP'];
       ext = ext.toUpperCase();
 
   for(var i=0, count=IssetIcons.length; i<count; i++) {
	  if(ext == IssetIcons[i]) return 'icons/file-icons/'+ext+'.jpg';
     } return false;
  };
  
  /***********
	  isFrame - Check, the page is loaded in a frame or not
   ***********/
  
  Ext.Bfn.isFrame = function() {
  
    var isFrame = false;
       try { 
	     isFrame = window != window.top || document != top.document || self.location != top.location; 
		  } catch (e) { 
		    isFrame = true;
		};
	 return isFrame;
   };
  
   /***********
	  randomNumber - Generation of the random number
   ***********/
  
  Ext.Bfn.randomNumber = function() { 
     var m = 0, n = 10000; 
	    return Math.floor( Math.random() * (n - m + 1) ) + m;
		  };
	 
   /***********
	  IsNewTabPage - Check url page (replace function CheckUrl)
   ***********/
   
  Ext.Bfn.IsNewTabPage = function(page, action) { 
    var actList = action.split(' '); 
	  if(actList.length > 1){
		  return actList.some(function(r){
			  return Ext.Bfn.IsNewTabPage(page, r);						
			     });
	       }
	 var page = page.split('#', 1).shift(), pageLength = page.length, pageIndex;
     var newTabPages = ["about:newtab", "about:blank", "//newtab/", "//startpage/", "//startpageshared/"];
      switch(action) {
		case 'browser' :
		   return newTabPages.some(function(item){
			  return ((pageIndex = page.indexOf(item)) != -1 && pageLength == pageIndex+item.length) ? true : false;						
			     });
		 break;
		case 'extension' : 
		     return (page.indexOf(Ext.extensionUrl) != -1) ? true : false;
		 break;
		case 'service':
		    return Ext.serviceUrl.some(function(item){
			   return (page.indexOf(item) != -1) ? true : false;
			    });
		 break;
	       }	
		return false;
     };
	
   /***********
	  IsOnlineZakladkiPage  - detect website onlinezakladki.ru
    ***********/
	 
   Ext.Bfn.IsOnlineZakladkiPage = function(page) { 
		 return Ext.Bfn.IsNewTabPage(page, 'service');
           };

    /***********
	  getUrlForNewTabPage  - This method is used to navigate to the set new tab page.
    ***********/
	 
   Ext.Bfn.getUrlForNewTabPage = function(S, newTabUrl, defaultTabUrl) {
	   var defaultTab = defaultTabUrl || chrome.extension.getURL('options.html');
	   var newTab = newTabUrl || Ext.serviceUrl[0];
	   var response = (S.isAllowedDataExchange == 'no' || S.isOpenInNewTab == 'no') ? defaultTab : newTab;
	  return response;
  };	  	
		   
		   
   /***********
	  CheckMenu - Check menu item
   ***********/

   Ext.Bfn.CheckMenu = function(id) { 
     return (id.indexOf("OnlinezakladkiItem") == 0) ? true : false; 
	  };
	
   /***********
	  browser - Detect browser
   ***********/
	
  Ext.Bfn.browser = function() { /* DETECT Browser */
  
     var D = [ 'YaBrowser', 'Trident', 'OPR', 'MSIE', 'Edge', 'Edg', 'PaleMoon', 'Firefox', 'MxNitro', 'Maxthon', 'Chrome', 'Safari' ];
	 var uA = navigator.userAgent, dt = {name:'Over', version:'Over' }; 
	    for ( var i = 0; i<D.length; i++) { 
			  if ( uA.indexOf(D[i]) != -1) { 
			         dt.name = D[i]; 
					 dt.version = parseInt(uA.substr(uA.indexOf(D[i])+D[i].length+1, 3)); 
				    break;
				   }
	           } 
		 dt.name = (dt.name == 'Edg') ? 'Edge' : dt.name;
	     
	 return dt; 
     }
	 
  /***************
     clickInsideElement - detect element with needed CSS selector (added 27.04.2017)
   **************/
	 
  Ext.Bfn.clickInsideElement = function(e, className) {
    var el = e.srcElement || e.target, r; className = className.split(','); 
		while(className.length>0) {
		   var c = className.shift(); c = c.trim();
			  if((r = el.closest(c)) !== null) return r;
		           }
     return null;
      };
	  
/***************
     Ext.Bfn.isCorrectHttpLink - Checking the correctness of the HTTP link for the current browser (added 03.03.2020)
   **************/
	  
  Ext.Bfn.isCorrectHttpLink = function(url){
	  return (url.search(/(http|https|ftp):\/\//i) !== 0) ? false : true;
         };
	  
 /***************
     Ext.Bfn.isCorrectLocalLink - Checking the correctness of the local link for the current browser (added 03.03.2020)
   **************/
	  
  Ext.Bfn.isCorrectLocalLink = function(url, browserName){
	  
	 var browserName = browserName || Ext.browser.name; 
	  if(browserName == 'FullList'){
		  var browserList = ['YaBrowser', 'OPR', 'Firefox', 'Chrome'];
		   return browserList.some(function(r){ 
			  return Ext.Bfn.isCorrectLocalLink(url, r);						
			     });
	       }
		   
	 if(url.search(/file:\/\//i) === 0 || url.search(/[A-Za-z]:(\/|\\)/i) === 0) {
		   return true;
	          }
	  
	 switch(browserName){
		   case 'Edge':
		      return (url.search(/edge:\/\//i) === 0 || url.search(/chrome:\/\//i) === 0);
		    break;
		 
		   case 'YaBrowser':
		      return (url.search(/browser:\/\//i) === 0 || url.search(/chrome:\/\//i) === 0);
		    break;
		   
		   case 'OPR':
		      return (url.search(/(opera|chrome):\/\//i) === 0 || url.search(/chrome:\/\//i) === 0);
		    break;
		   
		   case 'Firefox':
		      return (url.search(/about:/i) === 0);
		    break;
		   
		   case 'Chrome':
		      return (url.search(/chrome:\/\//i) === 0);
		    break; 
	     }
	   return false;
    };
	  
  /***************
     MutationObserver - Interface Monitor, Track Changes  (added 03.03.2020)
   **************/
	  
  Ext.Bfn.MutationObserver = function() {
	 if(typeof MutationObserver != 'undefined') {
		 
       return (new MutationObserver(function(mutations) {
         mutations.forEach(function(mutation) { 
		  var node, classList; 
		   if(mutation.addedNodes.length > 0 && (node = mutation.addedNodes[0])) { 
				 if((classList = node.classList) && 
				    (classList.contains('BkmkTab') || classList.contains('MySyze') || 
					 classList.contains('bkmkPanel') || classList.contains('bkmkChildPanel') || classList.contains('panelElement'))){
					    Ext.Bfn.checkLocalLinks(node);
				             }
		                }
                   });    
               })).observe(document,  {childList: true, subtree: true});
          } return false;  
     };
	 
  /***************
     Ext.Bfn.checkLocalLinks - Checking the DOM-tree of not HTTP links  (added 03.03.2020)
   **************/
	 
  Ext.Bfn.checkLocalLinks = function(node){
	       
    var list = node.querySelectorAll('a');
	     if(list.length > 0) {
	          for (var elem of list) {
				if (!Ext.Bfn.isCorrectHttpLink(elem.href)) {
					     elem.removeEventListener("click", Ext.Bfn.sendToLocalLinksHandler);
						 elem.addEventListener("click", Ext.Bfn.sendToLocalLinksHandler);
                             }
	                 }	
		     }					 
      };
	  
  /***************
     Ext.Bfn.sendToLocalLinksHandler - Sending a local link for processing to the background  (added 03.03.2020)
   **************/
	  
  Ext.Bfn.sendToLocalLinksHandler = function(e){
	e.preventDefault();  
	 var resource = {
			href: e.target.href, 
			target: e.target.target,
			button: e.button,
			ctrlKey: e.ctrlKey,
			window: '_top'
				};
	   Ext.Bd.SendInBG({task : 'BgDetectClickToLocalResource', status : 1, data : resource });  
          };
		  
   /***************
     Ext.Bfn.localLinksHandler - Processing local link in background  (added 03.03.2020)
   **************/
   
  Ext.Bfn.localLinksHandler = function(a){
	  return Ext.Bfn.openLinksHandler(a, 'local');
            }
			
  /***************
     Ext.Bfn.privateLinksHandler - Processing private link in background  (added 03.03.2020)
   **************/
   
  Ext.Bfn.privateLinksHandler = function(a){
	  return Ext.Bfn.openLinksHandler(a, 'private');
            }
			
   /***************
     Ext.Bfn.openLinksHandler - Processing opened link in background  (added 03.03.2020)
   **************/
	  
  Ext.Bfn.openLinksHandler = function(a, action){
	  
	a.href = a.href.trim();
	action = action || 'local';
	
	switch(action){
		
		case 'local':
		
		  if(!Ext.Bfn.isCorrectLocalLink(a.href)){ 
		       var error = {
			      title:'Локальная ссылка не определена', 
				  message: 'Невозможно открыть данную ссылку в текущем браузере ('+Ext.browser.name+')'
				    }; 
			 Ext.Bfn.PrintMsg(error);
		  return false;
	            }

           if(Ext.browser.name == 'Firefox' && a.window == '_blank'){ 
		       var error = {
			      title:'Не удалось открыть Ссылку', 
				  message: 'Невозможно открыть данную ссылку в текущем браузере ('+Ext.browser.name+')'
				    }; 
			 Ext.Bfn.PrintMsg(error);
		  return false;
	            }				
		  break;
		  
		case 'private':
		
		  if(!Ext.Bfn.isCorrectHttpLink(a.href) && !Ext.Bfn.isCorrectLocalLink(a.href)){ 
		       var error = {
			      title:'Ссылка не определена', 
				  message: 'Невозможно открыть данную ссылку в текущем браузере ('+Ext.browser.name+')'
				    }; 
			 Ext.Bfn.PrintMsg(error);
		  return false;
	            } 
		  break;
	    }
				
	switch(a.window){
		
		case '_top':
				
	     if((a.button == 0 && a.ctrlKey) || a.button == 1){
		       a.target = '_blank';
	              }
				
	      switch(a.target) {
		     case '_top':
		        chrome.tabs.update(null, {url: a.href}, function(tab){
				 if(chrome.runtime.lastError) {
		             Ext.Bd.SetErrorInLog({message: 'Ext.Bfn.openLinksHandler >> '+chrome.runtime.lastError.message, filename: '#', lineno: '0'}); 
				        var message = {
						        title: 'Не удалось открыть Ссылку', 
						        message: 'Проверьте разрешение "Открывать локальные ссылки" в Настройках браузера для выполнения данной операции.'
						         };
				     Ext.Bfn.PrintMsg(message);
			            }					
				 });
		      break;
		   
		     case '_blank':
		        chrome.tabs.create({url: a.href}, function(tab){
				  if(chrome.runtime.lastError) {
		             Ext.Bd.SetErrorInLog({message: 'Ext.Bfn.openLinksHandler >> '+chrome.runtime.lastError.message, filename: '#', lineno: '0'}); 
				        var message = {
						        title: 'Не удалось открыть Ссылку', 
						        message: 'Проверьте разрешение "Открывать локальные ссылки" в Настройках браузера для выполнения данной операции.'
						         };
				     Ext.Bfn.PrintMsg(message);
			            }					
				});
		      break;
	         }
			 
		  break;
		  
		case '_blank':
		case '_private':
		  var newWindow = {url: a.href, state: 'maximized', incognito: (a.window == '_private' ? true : false)};		  
            chrome.windows.create(newWindow, function(createdWin) { 
			   if(chrome.runtime.lastError) {
		             Ext.Bd.SetErrorInLog({message: 'Ext.Bfn.openLinksHandler >> '+chrome.runtime.lastError.message, filename: '#', lineno: '0'}); 
				        var message = {
						        title: 'Не удалось открыть Новое окно', 
						        message: 'Проверьте разрешение "Запуск в приватных окнах" в Настройках браузера для выполнения данной операции.'
						         };
				     Ext.Bfn.PrintMsg(message);
			            } else {
		           console.log('New '+(a.window == '_private' ? 'private' : '')+' window opened: '+a.href);	
				   }
		       });   
		  break;
	       }
		return true;
      };
	  
  /**** Ext.Bfn.localizeHtmlPage
       Translate HTML Page to current language 
	 **********/

 Ext.Bfn.localizeHtmlPage = function(page){	 
 
  var locale = Ext.locale;
 
   if(locale.indexOf('-') != -1){
	    locale = locale.split('-').shift();
            } else 
	if(locale.indexOf('_') != -1){
		 locale = locale.split('_').shift();
	     }
  
   console.log('Translates Locale =>> '+Ext.locale, locale);
   
  // Пропускаем к переводу только языки, для которых созданы языковые файлы
  // Остальным загружаем русскоязычный интерфейс
  
  if(Ext.availableTranslate.indexOf(locale) == -1){
		       return false;
	       } 

   var replace_i18n = function (obj, tag) {
       var msg = tag.replace(/__MSG_(\w+)__/g, function(match, v1) { return v1 ? chrome.i18n.getMessage(v1) : '';  });
        if(msg != tag) {
			obj.innerHTML = msg;
		     }
        };
		
   // Localize using data tags
   
    var data = document.querySelectorAll('[data-language]');

     for (var i in data) {
	   if (data.hasOwnProperty(i)) {
             var obj = data[i];
             var tag = obj.getAttribute('data-language').toString();
			 var msg = chrome.i18n.getMessage(tag);
       if(msg != tag) {
		   obj.innerHTML = msg;
		       } else {
		   console.log("BK.Tools => Translation for key {"+tag+"} not found!");
			   }
           }
	   }

   // Localize everything, replacing all __MSG_***__ tags
   /**
    var page = document.getElementsByTagName('html');

     for (var i = 0; i < page.length; i++) {
            var obj = page[i];
            var tag = obj.innerHTML.toString();
          replace_i18n(obj, tag);
           } **/
     };
	 
  /**** Ext.Bfn.localizeHtmlPage
       Translate JS variable to current language 
	 **********/

 Ext.Bfn.translate = function(key, data){
   var response = (Ext.locale == 'ru') ? data : chrome.i18n.getMessage(key);
        return (response != key) ? response : data;
   };
	  
 if(!String.prototype.trim) {
    (function() {
       String.prototype.trim = function() {
           return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
               };
       })();
}
	  
  Ext.browser = Ext.Bfn.browser(); 
  Ext.locale = chrome.i18n.getMessage("@@ui_locale"); 
