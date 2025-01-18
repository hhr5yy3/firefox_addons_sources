// JavaScript Document
 
/**********
  Message Handler from background.js
**********/
   
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){ 
												  
	Ext.Bd.GetSetting(function(r) { 
		      
	  if(r.ext_id != sender.id ) {	
	      request.status = 'EXT '+request.task+': Undefined SENDER!';
	      request.task = 'Bg'+request.task;
	     Ext.Bd.SendInBG(request);
		return;
		 }
												 
	switch(request.task) {
	  
	  /**********
	     messaging with Website And Extension for Firefox (response)
	   **********/
	  
	   case 'returnJobFromExternalRequestHandler':
	      var resp = {
			      ID: request.data.ID,
				  task: request.data.task,
				  browser: request.data.browser,
				  status: request.data.status,
				  data: request.data.data,
		           };
				request.data = resp; 
		    window.postMessage(request, window.location.origin); 
	    break;
		
		case 'returnJobFromInternalRequestHandler':
		
		 var dt = request.data;
		
		  switch(dt.task){
			  case 'RewriteLog':
			     Ext.Bfn.logged(dt.data);
				break; 
			  case 'errorInExtPage': 
			    console.log('EXT ERROR -> '+ dt.data.message + ' (' + dt.data.filename + ': ' + dt.data.lineno + ')');
				 Ext.Bd.RewriteLog('<error>EXTENSION ERROR</error>: ' + dt.data.message + ' (' + dt.data.filename + ': ' + dt.data.lineno + ')');
			   break;				  
		    }
	    break;
	  
	  default:
	    console.log('EXT', 'onlinezakladki.js', 'onMessage.addListener', 'isBadRequest', request.task);
	  break;
		
	         }	
	  });
 });
   
   /***********
	  Content script for websites
   ***********/ 
   
    /** START: RUN script on service pages **/
	
	 if(Ext.Bfn.IsNewTabPage(window.location.href, 'service') && (window.location.pathname == '/' || window.location.pathname == '/impExp.php')) {
		 
		var messages = { localSetting: 'not loaded', localWebsites: 'not loaded' };
		
		    sessionStorage.setItem("browserExtensionIsInstalled", "yes");
			sessionStorage.setItem("checkBkmkInBrowserExt", "load");
		
		/** START: Получение данных из хранилища дополнения **/
		   
		 Ext.Bd.GetData(null, function(dt) {
			 
			/** START: Проверка данных из хранилища дополнения **/
				
			if(dt && Ext.Bfn.ObjLength(dt) > 0){ 
			  
			    var ExtSetting = !dt.ExtSetting ? {} : dt.ExtSetting;
					
			 /** Обработка настроек и дальнейшие действия */
			  
			    if(!ExtSetting.hasOwnProperty('isAllowedDataExchange') || ExtSetting.isAllowedDataExchange == 'no') {
					     sessionStorage.setItem("checkBkmkInBrowserExt", "failure");
					   return false;
				           }
			 
		     /** START: Check load option from Extension Storage */	
		
		         Ext.Bfn.logged('|--------------------------------------------------|'); 
			     Ext.Bfn.logged('Ext.Bd.Init => locationPathName: '+window.location.hostname+window.location.pathname); 
           			
             // Если существует решение пользователя и согласие на работу из хранилища дополнения, работаем в штатном режиме	
			 
				 if(ExtSetting.hasOwnProperty('isCreateBackUpWithExt') && ExtSetting.isCreateBackUpWithExt == 'yes') {
					  
					    if(localStorage.AuthWebsites) {
							
				              Ext.Bfn.logged('Ext.Bd.Init => storageMethod: Online, Exit ... ');  
							   sessionStorage.setItem("checkBkmkInBrowserExt", "failure");
							  
			                       } else {
									   
						      Ext.Bfn.logged('Ext.Bd.Init => S.isCreateBackUpWithExt == "yes" check loading from Extension Storage'); 
						  
							   if(dt.hasOwnProperty('Setting')) {
					                localStorage.setItem("Setting", dt.Setting); messages.localSetting = 'loaded';
					                  }  Ext.Bfn.logged('Ext.Bd.Init => localSetting '+messages.localSetting);
						   
					           if(dt.hasOwnProperty('Websites')) {
					                localStorage.setItem("Websites", dt.Websites); messages.localWebsites = 'loaded';
					                   } Ext.Bfn.logged('Ext.Bd.Init => localWebsites '+messages.localWebsites);								   
									  
						      sessionStorage.setItem("needAddWebsitesInExtensionStorage", (messages.localWebsites == 'loaded' ? 'no' : 'yes')); 
				              sessionStorage.setItem("needAddSettingInExtensionStorage", (messages.localSetting == 'loaded' ? 'no' : 'yes'));   

                             var response = (messages.localWebsites == 'loaded' && messages.localSetting == 'loaded') ? 'success' : 'failure';						
							     sessionStorage.setItem("checkBkmkInBrowserExt", response);							  
					               
								   }
						  
						  // Если в настройках отказ, не вмешиваемся в работу сайта
						  
					          } else {
								  
						     Ext.Bfn.logged('Ext.Bd.Init => S.isCreateBackUpWithExt == "no" loading from Extension Storage failed');
							  
						       sessionStorage.setItem("needAddWebsitesInExtensionStorage", 'no'); 
				               sessionStorage.setItem("needAddSettingInExtensionStorage", 'no');
							   sessionStorage.setItem("checkBkmkInBrowserExt", "failure");
							   
							  }	


             /** START: Check BgSavedWebsites **/
			 
			  var Websites = !dt.hasOwnProperty('BgSavedWebsites') ? [] : dt.BgSavedWebsites, WebsitesLength = Websites.length;
			    if(WebsitesLength > 0) {
				   var UniqueWebsites = Ext.Bfn.getUniqueValuesFromBgWebsites(Websites);
					 storage.remove(['BgSavedWebsites']);
					  /** Если есть дубли значит надо завершить какой-то процесс **/
						if(WebsitesLength != UniqueWebsites.length) {
						    Ext.Bfn.logged('Ext.Bfn.getUniqueValuesFromBgWebsites => WebsitesLength('+WebsitesLength+'), UniqueWebsitesLength('+UniqueWebsites.length+')');
							    }
					var BgSavedWebsites = localStorage.BgSavedWebsites;
	                    if(!BgSavedWebsites || !(BgSavedWebsites = Ext.Bd.parseStorageData(BgSavedWebsites))) { 
		                      BgSavedWebsites = []; 
		                          } 
			            for(var i in UniqueWebsites) {
				              BgSavedWebsites.push(UniqueWebsites[i]); 
			                       }
				    localStorage.setItem("BgSavedWebsites", JSON.stringify(BgSavedWebsites));			   
				             }  /** END: Check BgSavedWebsites **/
							 
			    delete dt; delete Websites; delete BgSavedWebsites;
					  
		     /** Проверяем просроченные элементы браузерных/локальных бэкапов **/
			     Ext.Bd.checkLocalBackUpList(dt);
			     Ext.Bd.checkBrowserBackUpList();
		 
		 	 /** Entry in error log	**/	
			     window.addEventListener("error", Ext.Bd.SetErrorInLog); 
			
             /** Interface Monitor, Track Changes **/			
			     Ext.Bfn.MutationObserver();
			
			
		     /** START: Check click for open link in background Tab (added 27.04.2017) **/
					
			    document.addEventListener("mouseup", function(e) { 
			      var a = null;
	               if ((a = Ext.Bfn.clickInsideElement(e, 'a')) && ((e.button == 0 && e.ctrlKey) || e.button == 1)) {
					      Ext.Bd.SendInBG({task : 'BgDetectNewBackgroundTab', status : 1, data : a.getAttribute('href') });
			                 } 
	                      }, true);
  
		     /** END: Check click for open link in background Tab **/	
		   
		   
		     /** START: OnMessage for Firefox (added 26.10.2017) **/
		   
		        window.addEventListener("message", function(event) { 
															
				  var request, isCorrectRequest = Ext.serviceUrl.some(function(url) {
			                   return (event.origin.indexOf(url) == 0) ? true : false;
			                       });
	 
	                      if(!isCorrectRequest) {
		                         return false;
	                               }
								   
				  if(event.source == window && (request = event.data) && request.sender == 'websiteAPI'){
					     switch(request.task) {
							  case 'BgSendJobToExternalRequestHandler':
							     Ext.Bd.SendInBG(request);
							   break;
							   
							  default:
							      console.log('EXT postMessage Handler: undefined Task');
							    break;
					                       }
                                   }
								   
                              });  /** END: OnMessage for Firefox **/ 
						 
						}  /** END: Проверка данных из хранилища дополнения **/
						 
			      }); /** END: Получение данных из хранилища дополнения **/
				  
		   } /** END: RUN script on service pages **/