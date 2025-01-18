// JavaScript Document

  Ext.Handler.prepareExternalRequestToProcess = function(request){ 
	 chrome.tabs.query({active:true}, function(tabs){  
			   request.fromTab = tabs[0];
			    Ext.Handler.processExternalRequest(request.fromTab, request);
                    });
     };
	 
  Ext.Handler.completeProcessExternalRequest = function(req) {
		   var request = {
			       task: 'returnJobFromExternalRequestHandler',
				   sender: 'browserExtension', 
				   data: req
		       };
		  chrome.tabs.sendMessage(req.fromTab.id, request); 
    };
	
  Ext.Handler.completeProcessInternalRequest = function(req) { 
		   var request = {
			       task: 'returnJobFromInternalRequestHandler',
				   sender: 'browserExtension', 
				   data: req
		       };
		  chrome.tabs.sendMessage(req.fromTab.id, request, function(){
			 if(chrome.runtime.lastError) {
		          console.log('EXT ERROR -> Ext.Handler.completeProcessInternalRequest >> '+chrome.runtime.lastError.message); 
	                   }
		     });
    };
 
  Ext.Handler.processExternalRequest = function(fromTab, request) {

  /* Создаём копию запроса, чтобы избежать связи по ссылке */
  
	var req = {};
	 for(var key in request) {
		  if(request.hasOwnProperty(key)) {
			   req[key] = request[key];
		            }
	      }
		 
	switch(req.task){
			  
    /***********
	  Synchronizes data between the website localStorage and extension localStorage
	***********/
	  
	  case 'ChangeLocalData':
	   
	      switch(req.data.name) {
			  
			 case 'Websites':
			 case 'Setting':
			   
			  var d = req.data.newValue, now = Ext.Bfn.timestampToDate(false, true);
			 
			   if(d.length > 0 && Ext.Bd.parseStorageData(d)) { // Если данные целые
			   
			   /* Проверка для данных сайтов */
			   
			     if(req.data.name == 'Websites') {
				   
				    Ext.Bd.GetSetting(function(S) { 
					
					 /* Если нет бэкапа за текущий день, создаём его */
		              if(!S.hasOwnProperty('todayDate') || (S.hasOwnProperty('todayDate') && S.todayDate != now)) {
						  
					      S.todayDate = now;
						  
					         Ext.Bd.SetData({'ExtSetting': S}, function(callback) {
			                  if(chrome.runtime.lastError) {
							      Ext.Bd.SetErrorInLog({message: 'Ext.Bd.SetExtSetting => KEY: todayDate >> '+chrome.runtime.lastError.message, filename: '#', lineno: '0'});
					                 } else {
							  var newDayWebsites = {};
							      newDayWebsites['Websites_'+S.todayDate] = d; 
							  Ext.Bd.SetData(newDayWebsites, function(callback){ 
				               if(chrome.runtime.lastError) {
								    Ext.Bd.SetErrorInLog({message: 'Ext.Bd.SetWebsites => KEY: Websites_'+S.todayDate+' >> '+chrome.runtime.lastError.message, filename: '#', lineno: '0'}); 
									  delete S.todayDate;
									Ext.Bd.SetData({'ExtSetting': S}, function(callback) {});
					                            } else {
									Ext.Bfn.logged('Ext.Bd.SetWebsites => KEY: Websites_'+S.todayDate+' >> sussefully created!');
							                       } delete d; delete newDayWebsites;
					                         });
					                    }												 
			                      });
						      
							  } else 
								  
					   /* Если есть бэкап за текущий день, обновляем его при ряде условий */		  
						if(S.hasOwnProperty('todayDate') && S.todayDate == now){
							
							var currentBackUp = {};
							    currentBackUp['Websites_'+S.todayDate] = false;
							
							 Ext.Bd.GetData(currentBackUp, function(dt) { 
	                           var backUpObj = Ext.Bd.parseStorageData(dt['Websites_'+S.todayDate]);
							       backUpObj = (!backUpObj) ? [] : backUpObj;
							   var currentObj = Ext.Bd.parseStorageData(d);
							   var backUpLength = backUpObj.length, currentLength = currentObj.length;
							   
							     if(backUpLength == 0 || (backUpLength <= currentLength && currentLength/backUpLength <= 2)){
									 currentBackUp['Websites_'+S.todayDate] = d; 
							          Ext.Bd.SetData(currentBackUp, function(callback){ 
				                       if(chrome.runtime.lastError) {
								            Ext.Bd.SetErrorInLog({message: 'Ext.Bd.SetWebsites => KEY: Websites_'+S.todayDate+' >> '+chrome.runtime.lastError.message, filename: '#', lineno: '0'}); 
									         delete S.todayDate;
									           Ext.Bd.SetData({'ExtSetting': S}, function(callback) {});
					                             } else {
											   Ext.Bfn.logged('Ext.Bd.SetWebsites => KEY: Websites_'+S.todayDate+' >> sussefully rewrited!');
							                       } delete d; delete currentBackUp; delete backUpObj; delete currentObj;
					                         });
								        }
							      });
						      }  
			            });	
				    }
					
			  /* Общая перезапись данных для сайтов/настроек  */			 
							 
					var resource = {};
                        resource[req.data.name] = req.data.newValue;
							 
					Ext.Bd.SetData(resource, function(callback){ 
				      if(chrome.runtime.lastError) {
					      req.status = 0;
		                  req.data = 'Ext.Bd.SetData => ERROR! KEY: '+req.data.name+' >> '+chrome.runtime.lastError.message;
					           } else {
				          req.status = 1;
		                  req.data = 'Ext.Bd.SetData => SUCCESS! KEY: '+req.data.name+' >> Rewrited!';
							     }
							Ext.Handler.completeProcessExternalRequest(req);
					          });
				            
							} else {  // Если данные повреждены
								
                          req.status = 0;
		                  req.data = 'Ext.Bd.SetData => ERROR! KEY: '+req.data.name+' >> Damagged!';
					         Ext.Handler.completeProcessExternalRequest(req);
					   } 
			   break;
			   
			 default:
		       req.data = 'Ext.Bd.SetData => Undefined Data in Task >> ChangeLocalData <<';
			    Ext.Handler.completeProcessExternalRequest(req);
			  break;
		     } 

	  break;
	  
	/***********
	  Removal of local data on request
	***********/
	  
	  case 'RemoveLocalData':
	  
	     Ext.Bd.RemoveData(["Setting", "Websites"], function(){
			req.status = 1;
		    req.data = 'Ext.Bd.RemoveData => '+req.task+': DATA removed!';
		   Ext.Handler.completeProcessExternalRequest(req);
			});
			
	  break;
	  
	/***********
	  Set Extension setting on request from the website onlinezakladki.ru
	***********/
	  
	  case 'SetExtSetting':
	  
	    var settingNames = '';
	     Ext.Bd.GetSetting(function(S) {
		  for(var el in req.data) { 
		       if(req.data.hasOwnProperty(el)) {
				   S[el] = req.data[el];
				      settingNames += (settingNames.length == 0) ? el : ', '+el;
			            }
			    }
	       Ext.Bd.SetData({'ExtSetting': S}, function(callback) {
			   if(chrome.runtime.lastError) {
					req.status = 0;
		            req.data = 'Ext.Bd.SetData => ERROR! KEY: ['+settingNames+'] >> '+chrome.runtime.lastError.message;
					   } else {
			        req.status = 1;
		            req.data = 'Ext.Bd.SetData => SUCCESS! KEY: ['+settingNames+'] >> sussefully saved!';
					  }
			   Ext.Handler.completeProcessExternalRequest(req);												 
			      });
		 });
	  
	  break;
	  
	 /***********
	    Get html template with all possible settings for the transmission to the website onlinezakladki.ru
	  ***********/
	  
	  case 'GetExtInfo':
	   
	     Ext.Bd.GetSetting(function(S) { 
								   
		  var version = !S.version ? '' : '(<a href="/extentionPage/" target="_blank">версия '+S.version+')</a>', checkedList = {};
		  
		  Ext.optionsList.forEach(function(item, i){
		    if(item != 'isAllowedDataExchange'){
		         checkedList[item] = (S.hasOwnProperty(item) && S[item] == 'yes') ? 'checked="checked"' : '';
			            }
		         });
		  
           req.status = 1;
		   req.data = '<h2>Настройки браузерного дополнения '+version+'</h2>';
		   
		  if(['YaBrowser'].indexOf(Ext.browser.name) == -1){
		   
		   req.data += '<div class="checkbox ext_checkbox">';
		   req.data += '<input id="isOpenInNewTab" type="checkbox" name="isOpenInNewTab" onclick="Interface.Settings(\'isOpenInNewTab\')" '+checkedList['isOpenInNewTab']+'>';
           req.data += '<label for="isOpenInNewTab">Открывать Онлайн Закладки в новой вкладке</label>';
		   req.data += '</div>';
		   
		       } 
		   
		  if(S.BkStorageMethod && S.BkStorageMethod == 'local') {
		   
		   req.data += '<div class="checkbox ext_checkbox">';
		   req.data += '<input id="isCreateBackUpWithExt" type="checkbox" name="isCreateBackUpWithExt" onclick="Interface.Settings(\'isCreateBackUpWithExt\')" '+checkedList['isCreateBackUpWithExt']+'>';
           req.data += '<label for="isCreateBackUpWithExt">Создавать бэкапы закладок с помощью дополнения</label>';
		   req.data += '</div>';
		   
		       }
		   
		   req.data += '<div class="checkbox ext_checkbox">';
		   req.data += '<input id="isCreateScreenWithExt" type="checkbox" name="isCreateScreenWithExt" onclick="Interface.Settings(\'isCreateScreenWithExt\')" '+checkedList['isCreateScreenWithExt']+'>';
           req.data += '<label for="isCreateScreenWithExt">Создавать скриншоты сайтов с помощью дополнения</label>';
		   req.data += '</div>';
		   
		   req.data += '<div class="checkbox ext_checkbox">';
		   req.data += '<input id="isCreateBookmarkInBg" type="checkbox" name="isCreateBookmarkInBg" onclick="Interface.Settings(\'isCreateBookmarkInBg\')" '+checkedList['isCreateBookmarkInBg']+'>';
           req.data += '<label for="isCreateBookmarkInBg">Сохранять добавляемые закладки в фоновом режиме</label>';
		   req.data += '</div>';
		   
		 if(['Firefox'].indexOf(Ext.browser.name) == -1){
		   
		   req.data += '<div class="checkbox ext_checkbox">';
		   req.data += '<input id="isOpenLocalLink" type="checkbox" name="isOpenLocalLink" onclick="Interface.Settings(\'isOpenLocalLink\')" '+checkedList['isOpenLocalLink']+'>';
           req.data += '<label for="isOpenLocalLink">Разрешить открывать локальные ссылки</label>';
		   req.data += '</div>';
		   
		      }
			  
		   req.data += '<div class="checkbox ext_checkbox">';
		   req.data += '<input id="isAllowedSendErrorToWeb" type="checkbox" name="isAllowedSendErrorToWeb" onclick="Interface.Settings(\'isAllowedSendErrorToWeb\')" '+checkedList['isAllowedSendErrorToWeb']+'>';
           req.data += '<label for="isAllowedSendErrorToWeb">Сохранять Логи дополнения в localStorage браузера</label>';
		   req.data += '</div>';
		   
		   req.data += '<p>Подробное описание данных настроек всегда доступно на <a href="/extentionPage/Description/" target="_blank">Веб-версии страницы дополнения</a>. Приятной работы!</p>';
		   
		  Ext.Handler.completeProcessExternalRequest(req);
			  });
			
	  break;
	  
     /***********
	    Try to make a screenshot of the site by means of the browser (if successful) 
		 or means onlinezakladki.ru server (in case of failure)
	  ***********/
	  
	 case 'GetDataScreen': 
	 
	  req.url = req.url.trim();
	   
	   Ext.Bd.GetSetting(function(S) {
	   
	    if(S.isAllowedDataExchange == 'no' || 
		   S.isCreateScreenWithExt == 'no' || 
		  (req.bkmkCreationMethod && req.bkmkCreationMethod == 'thumb')) {
			
		     req.status = 2; 
		     req.data = {title:'Отказ Скриншотера', message: 'Не активен Чекбокс в Настройках.'};
		  
		      Ext.Bfn.logged('CaptureStatus: captureRefusing, URL => '+req.url);
		      Ext.Handler.completeProcessExternalRequest(req);
		  
		        } else {
					
		   if(Ext.Bfn.isCorrectLocalLink(req.url, 'FullList')){
		        req.status = 0;
			    req.data = {title:'Неподдерживаемая ссылка', message: 'Операция передана на серверный скриншотер.'};
				  Ext.Bfn.PrintMsg(req.data);
	              Ext.Handler.completeProcessExternalRequest(req);
			  return false;
	            }
	
	       if(!Ext.Bfn.isCorrectHttpLink(req.url)){
		        req.url = 'http://'+req.url;
	                 }
		
		     req.type = 'hand';
			 req.id = req.ID;
			 
	          Ext.Bd.AddTaskToMakeScreen(req, function(dt) {
																								 
			     if(dt.status != 'captureBegin') {
				 
				     req.status = 0;
			         req.data = {title:'Скриншотер браузера занят', message: 'Операция передана на серверный скриншотер.'};
				       Ext.Bfn.PrintMsg(req.data);
	                   Ext.Handler.completeProcessExternalRequest(req);
					
			               } else {
						  
				      captureQueue.add(dt); 
				   
				        }
			
			   Ext.Bfn.logged('CaptureStatus: '+dt.status+', URL => '+dt.url);
			  
		         });
		    }
	  });
	  
	  break;
	  
     /***********
	    Task List for browser backup actions
	  ***********/
	  
	  case 'GetAvailableBrowserBackUpList':
	  case 'DeleteBrowserBackUp':
	  case 'DownloadBrowserBackUp':
	  
	       Ext.Bd[req.task](req, function(dt) {
			 dt.ID = req.ID;
			 Ext.Handler.completeProcessExternalRequest(dt);
			   // (added 25.08.2017)
			  });
	  
	   break;
	   
    /***********
	    Task List for local backup actions
	  ***********/
	  
	  case 'DeleteLocalBackUp':
	  case 'DownloadLocalBackUp':
	  
	       Ext.Bd[req.task](req, function(dt) {
			 dt.ID = req.ID;
			 Ext.Handler.completeProcessExternalRequest(dt);
			   // (added 17.03.2020)
			  });
	  
	   break;
	   
    /***********
	    Send error message to website handler
	  ***********/
	   
	   case 'errorInExtPage':
				  
		   req.ID = Ext.Bfn.randomNumber();
		   req.browser = Ext.browser;
		   req.status = 1;
		   Ext.Handler.completeProcessInternalRequest(req);
	   // (added 02.03.2020)
	  
	   break;
	   
    /***********
	    Send log message to website handler
	  ***********/
	   
	   case 'RewriteLog':
				  
		   req.ID = Ext.Bfn.randomNumber();
		   req.browser = Ext.browser;
		   req.status = 1;
	       Ext.Handler.completeProcessInternalRequest(req); 
	     // (added 02.03.2020)
	  
	   break;
	   
	/*************
	  openPrivateLink
	 **********/
	 
	  case 'openPrivateLink':
	  
	     if(Ext.Bfn.privateLinksHandler(req.data)){
			  req.status = 1;
		      req.data = 'EXT '+req.task+': '+req.data.href+', request sussefully processed!';
		          } else {
			  req.status = 1;
		      req.data = 'EXT '+req.task+': '+req.data.href+', request rejected!';
			     }
		   Ext.Handler.completeProcessExternalRequest(req);
	  
	    break;
	   
	/*************
	  openLocalLink
	 **********/
	 
	  case 'openLocalLink':
	  
	   Ext.Bd.GetSetting(function(S){ 
			
	    if(S.isAllowedDataExchange == 'no' || S.isOpenLocalLink == 'no'){
			
		   req.status = 1;
		   req.data = 'EXT '+req.task+': '+req.data.href+', request rejected!';
		   
		   var message = {
			     title: 'Не удалось открыть Ссылку', 
				 message: 'Проверьте разрешение "Открывать локальные ссылки" в Настройках сервиса для выполнения данной операции.'
						  };
			   Ext.Bfn.PrintMsg(message);
		  
	         } else {
	  
	     if(Ext.Bfn.localLinksHandler(req.data)){
			  req.status = 1;
		      req.data = 'EXT '+req.task+': '+req.data.href+', request sussefully processed!';
		          } else {
			  req.status = 1;
		      req.data = 'EXT '+req.task+': '+req.data.href+', request rejected!';
			           }
				  }	
           Ext.Handler.completeProcessExternalRequest(req);				 
           });
	  
	    break;
		
	/****************
	   checkBrowserBackUpList - checks backups from browser bookmarks and deletes expired
	 ************/
		
	  case 'checkBrowserBackUpList':
	  
	    Ext.Bd.getBookmarkBackUpList(function(backUpList) {
			 
		  if(backUpList.length > 3) {
			  
			  backUpList.forEach(function(el, i) {
				  backUpList[i].created_at = Ext.Bfn.DateToTimestamp(el.created_at.split(' ').shift());
					   });
			  backUpList.sort(function(a, b) { return (b.created_at - a.created_at); });	  
			  backUpList.forEach(function(el, i) {
					if(i > 2) {
						chrome.bookmarks.removeTree(el.id, function() {
							
						     req.ID = Ext.Bfn.randomNumber();
							 req.task = 'RewriteLog';
		                     req.browser = Ext.browser;
			                 req.data = 'Ext.Bd.checkBrowserBackUpList => browserBackUp '+(Ext.Bfn.timestampToDate(el.created_at, true))+' was removed!';
		                     req.status = 1;
	       
		                 Ext.Handler.completeProcessInternalRequest(req);
						               });
								}
					     });
		           }
		     });  
	  
	    break;
	   
	  default:
	     req.status = 2;
		 req.data = 'EXT '+req.task+': Undefined Task!';
	    Ext.Handler.completeProcessExternalRequest(req); 
	  break;
		 
		  }
	  };