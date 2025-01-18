
var storage = chrome.storage.local;

 /***********
	  Ext.Bd.checkLocalBackUpList - checks backups from local storage and deletes expired
   ***********/

  Ext.Bd.checkLocalBackUpList = function(dt){
	var WebList = [], WebListMsg = '', todayDate = 'Unknown';
	  
	 if(dt.hasOwnProperty('ExtSetting') && dt.ExtSetting.hasOwnProperty('todayDate')){
		   todayDate = dt.ExtSetting.todayDate; 
			  }
						 
	 for(var el in dt) { 
	   if(dt.hasOwnProperty(el) && el.indexOf('Websites_') !== -1){
			WebList.push({name: el, created: Ext.Bfn.DateToTimestamp(el.split('_').pop()) });
			WebListMsg += (WebListMsg == '') ? el : ', '+el;
						    }
				 }
		 Ext.Bfn.logged('Ext.Bd.checkLocalBackUpList => lastChangeDate: '+todayDate+', localBackUpList: '+WebListMsg); 
					
			if(WebList.length > 3) {
				 WebList.sort(function(a, b) { return (b.created - a.created); });
				 WebList.forEach(function(el, i) {
					if(i > 2) {
						Ext.Bd.RemoveData(el.name, function(){
						Ext.Bfn.logged('Ext.Bd.checkLocalBackUpList => localBackUp '+el.name+' was removed!'); 
								    });
								}
					     });
			       }
           };
	
 /***********
	  Ext.Bd.checkBrowserBackUpList - checks backups from browser bookmarks and deletes expired
   ***********/

  Ext.Bd.checkBrowserBackUpList = function(){
	   var resource = {
			task: 'checkBrowserBackUpList', 
			  };
	    Ext.Bd.SendInBG({task : 'BgSendJobToExternalRequestHandler', status : 1, data : resource });  
    };
	   
  /***********
	  Ext.Bd.prepareBookmarksStructure - prepare service bookmark structure for insert in browser bookmarks
   ***********/

   Ext.Bd.prepareBookmarksStructure = function(data) {
	          return {
				       parentId: String(data.parent),
					   index: parseInt(data.position),
					   url: (data.url.indexOf('://') != -1) ? data.url : null,
					   title: (data.title != '') ? data.title : ((data.url.indexOf('://') != -1) ? data.url : ''),
					   children: data.children || null
					    }; 
         };
		 
 /***********
	  Ext.Bd.prepareTreeStructure - prepare service Tree structure for insert in browser bookmarks
   ***********/
		 
   Ext.Bd.prepareTreeStructure = function(data, type, parent) { 
	 var t = (!type) ? 'visual_' : type, parent = (typeof parent == 'undefined') ? 'all' : parent, response = [];
	 var allowedTypes = ['visual_website', 'visual_folder', 'panel_website', 'panel_folder'];
	     data.forEach(function(w){
		    if(typeof w !== 'object' || (t != 'full' && w.type.indexOf(t) == -1) || (parent != 'all' && parent != w.parent)) {
			      return false;
		                } 
			  if(w.type.indexOf('_folder') != -1) {
				if(w.hasOwnProperty('folder_password')) {
					 return false;
				        }
				  w.children = Ext.Bd.prepareTreeStructure(data, t, w.id);
			       }
			  if(w.type.indexOf('_website') != -1 && !Ext.Bfn.isCorrectHttpLink(w.url)){
				   return false;
			         }
			  if(allowedTypes.indexOf(w.type) != -1) {
				   response.push(Ext.Bd.prepareBookmarksStructure(w));
			     }
			 });
		  return response.sort(Ext.Bfn.sIncrease);
      };
	  
   /***********
	  Ext.Bd.addBookmarksTree - add prepared Tree in browser bookmarks
   ***********/
	  
	Ext.Bd.addBookmarksTree = function(Tree, parent, needIDs, handler) { 
		   var stat = [parent], insertedIDs = {};
		   var addBookmarksTree = function(Tree, parent, needIDs, handler) {
			   if(Tree.length == 0) { 
			      stat = stat.filter(function(el) { return el != parent; });
				   if(stat.length == 0) { 
					   if(typeof handler == 'function') {
						    handler((needIDs ? insertedIDs : true));
					          } 
				         }
				 return false;
			      }
			   var TreeNode = Tree.shift();
			   var addElem = {
				       parentId: parent,
					   url: TreeNode.url || null,
					   title: TreeNode.title || ''
					    }; 
			     chrome.bookmarks.create(addElem, function(r){  
					   if(needIDs) insertedIDs[r.title] = r.id; 
						 if(TreeNode.hasOwnProperty('children') && TreeNode.children !== null) {  
							  stat.push(r.id); 
							   addBookmarksTree(TreeNode.children, r.id, needIDs, handler);
						         } 
						  addBookmarksTree(Tree, r.parentId, needIDs, handler);  
						    });
		             };
		 addBookmarksTree(Tree, parent, needIDs, handler);
	  };
	  
    /***********
	  Ext.Bd.getBookmarkFolderId - search and return IDS for main browser BackUp folders
   ***********/
	  
	Ext.Bd.getBookmarkFolderId = function(todayDate, handler) {
		
		var allowedFolders = ['Visual.Bookmarks', 'Panel.Bookmarks'], bookmarkFoldersIDs = {}, children = [];
		var rootFolderName = 'Bookmarks.BackUp [' + todayDate + ']';
		var trashFolderNames = ['Bin', 'Trash', 'Корзина'];
		
          chrome.bookmarks.getTree(function(Tree) {
		      var TreeNodes = Tree[0].children, lastParentFolder = TreeNodes[TreeNodes.length-1];
			  
			  /* Поиск Корзины и удаление мусорных элементов */
			     TreeNodes.forEach(function(item){
					if(trashFolderNames.indexOf(item.title) != -1) { 
							  var trashFolder = item;
					              trashFolder.children.forEach(function(f){
							         if(f.title.indexOf('Bookmarks.BackUp') != -1) {
							                chrome.bookmarks.removeTree(f.id, function() {});
					                                 }						  
							                 });
					               }								 
					});
			  
			  /* Поиск РУТ папки */ 
		         lastParentFolder.children.forEach(function(item){
					 if(item.title == rootFolderName) {
						   bookmarkFoldersIDs[item.title] = item.id;
					          }
				      });
				 
			     allowedFolders.forEach(function(name) {
				      children.push({title: name});							 
							});
			        var newBkmkFolder = [{ 
									      'title': rootFolderName, 
									      'children': children
									     }];
				   
				if(Ext.Bfn.ObjLength(bookmarkFoldersIDs) == 0) {
					
					      Ext.Bd.addBookmarksTree(newBkmkFolder, lastParentFolder.id, true, function(r){
								  return handler({status:1, data: r});											   
									 });
						  
				             } else { 
						 
						  chrome.bookmarks.removeTree(bookmarkFoldersIDs[rootFolderName], function() { 
							  Ext.Bd.addBookmarksTree(newBkmkFolder, lastParentFolder.id, true, function(r){ 
								  return handler({status:1, data: r});											   
									 });																	  												  
							  });
				       }
	           });
	     };
		 
    /***********
	  Ext.Bd.getBookmarkBackUpList - search and return LIST browser BackUp folders
   ***********/
	  
	Ext.Bd.getBookmarkBackUpList = function(handler) {
		
		var rootFolderName = 'Bookmarks.BackUp', bookmarkBackUpList = [];
		var calculateElementsCount = function(data, count){
			  var count = count || 0;
			    if(data.children) {
			        data.children.forEach(function(children) {
					  count = calculateElementsCount(children, count);						   
					    });
				    } count++;
				 return count;
		       };
		
          chrome.bookmarks.getTree(function(Tree) {
		      var TreeNodes = Tree[0].children, lastParentFolder = TreeNodes[TreeNodes.length-1];
			  
			     lastParentFolder.children.forEach(function(item){
					if(item.title.indexOf(rootFolderName) == 0) {
						 let created_at = item.title.match(/Bookmarks.BackUp \[(.*)\]/);
					      bookmarkBackUpList.push({'id': item.id, 
						                           'created_at': ((created_at != null) ? created_at[1] : '1970.01.01'), 
												   'elementsCount': calculateElementsCount(item)
						                            });
					              }								 
					    });
				     handler(bookmarkBackUpList);
			    });
	    };
		
	 /***********
	  Ext.Bd.GetAvailableBrowserBackUpList - return TEMPLATE with browser BackUps
   ***********/
		
    Ext.Bd.GetAvailableBrowserBackUpList = function(r, handle) {
		
	    var isCreatedAt = Ext.Bfn.timestampToDate(false, true);
	  
		     r.status = 1;
		     r.data = '';
			 
		/* Browser BackUp List */
	  
	     Ext.Bd.getBookmarkBackUpList(function(backUpList) {
				
		    var KeyCombination = {
			                   'Chrome' : 'Ctrl+Shift+O', 
		                       'OPR' : 'Ctrl+Shift+B', 
							   'YaBrowser' : 'Ctrl+Shift+O', 
							   'Firefox' : 'Ctrl+Shift+B'
							      };
		
		     r.data += '<p>Таблица ниже содержит Бэкапы, сохранённые непосредственно в Браузере/Дополнении. Восстановлению подлежат только закладки. ';
		     r.data += 'Для полноценной возможности восстановления используйте сервис в Авторизованном виде (будьте авторизованы на сайте).</p>';
		
		     r.data += '<table class="backup_list"><tbody><tr><td>№</td><td>Папка браузера</td><td>Дата создания</td><td>Элементов</td><td>Операции</td></tr>';
			 
		    var offset = (backUpList.length > 3) ? (backUpList.length - 3) : 0;
		
		     for(var i=0; i<3; i++) {
				 
			       var b = (backUpList[(i+offset)]) ? backUpList[(i+offset)] : {id: (i+1)};
			       var isCurrent = (b.created_at && b.created_at == isCreatedAt) ? true : false;
			   
			    r.data += (!isCurrent) ? '<tr data-id="'+b.id+'">' : '<tr data-id="'+b.id+'" class="active">';
				r.data += '<td>'+(i+1)+'</td>';
				    if(b.created_at) {
						r.data += '<td>Bookmarks.BackUp ['+b.created_at+']</td>';
				        r.data += '<td title="Дата создания">'+b.created_at+'</td>';
				        r.data += '<td>'+(((b.elementsCount-3) < 0) ? 0 : b.elementsCount-3)+'</td>';
				        r.data += (!isCurrent) ? '<td><div class="delete" title="Удалить Бэкап" onclick="Bd.DeleteBackUp(\''+b.id+'\')"></div>' : '<td>';
		                r.data += '<div class="download" title="Восстановить закладки из этого Бэкапа" onclick="Bd.DownloadSelectedBackUp(\''+b.id+'\')"></div></td>';
				             } else {
					  for(let i=0; i<4; i++) {
					    r.data += '<td></td>';
					         }				 
						 }
				r.data += '</tr>';			  
		          }
				  
		    r.data += '</tbody></table>';
		
		    r.data += '<p>Для просмотра Содержимого Бэкапов нажмите комбинацию клавиш '+KeyCombination[r.browser]+'. ';
		    r.data += 'Откроется Диспетчер закладок, в нём найдите Бэкап, который представляет собой папку с названием, обозначенным в таблице. ';
		    r.data += 'В этой папке будут находится все закладки, доступные для восстановления.</p>';
			
		 /* Local BackUp List */
		 
		     Ext.Bd.GetData(null, function(dt) {
			  var dt = (dt && Ext.Bfn.ObjLength(dt) > 0) ? dt : {};
			      backUpList = [];
						 
	           for(var el in dt) { 
	            if(dt.hasOwnProperty(el) && el.indexOf('Websites_') !== -1){
					 var websites = Ext.Bd.parseStorageData(dt[el]);
					 var created = Ext.Bfn.DateToTimestamp(el.split('_').pop()), timestamp = created;
					   if(websites && websites.length > 1){
						    websites.sort(function(a, b) { return (b.up_date - a.up_date); });
							timestamp = websites[0]['up_date'];
					            }
			         backUpList.push({
						       name: el, 
							   created: Ext.Bfn.DateToTimestamp(el.split('_').pop()), 
							   timestamp: timestamp,
							   elementsCount: Ext.Bd.parseStorageData(dt[el]).length 
							    });
						   }
				     } 
					 
				if(backUpList.length > 1){
					backUpList.sort(function(a, b) { return (a.created - b.created); });
				      }
				 
			    r.data += '<table class="backup_list"><tbody><tr><td>№</td><td>Локальное хранилище</td><td>Последнее изменение</td><td>Элементов</td><td>Операции</td></tr>';
			 
		         var offset = (backUpList.length > 3) ? (backUpList.length - 3) : 0;
		
		          for(var i=0; i<3; i++) {
			        var b = (backUpList[(i+offset)]) ? backUpList[(i+offset)] : {name: (i+1)};
					var created = (b && b.created) ? b.name.split('_').pop() : false;
			        var isCurrent = (created && created == isCreatedAt) ? true : false;
			   
			        r.data += (!isCurrent) ? '<tr data-id="'+b.name+'">' : '<tr data-id="'+b.name+'" class="active">';
				    r.data += '<td>'+(i+1)+'</td>';
				      if(b.created) {
						r.data += '<td>Local.BackUp ['+created+']</td>';
				        r.data += '<td title="Дата создания">'+Ext.Bfn.timestampToDate(b.timestamp)+'</td>';
				        r.data += '<td>'+b.elementsCount+'</td>';
				        r.data += (!isCurrent) ? '<td><div class="delete" title="Удалить Бэкап" onclick="Bd.DeleteExtensionBackUp(\''+b.name+'\')"></div>' : '<td>';
		                r.data += '<div class="download" title="Восстановить закладки из этого Бэкапа" onclick="Bd.DownloadSelectedExtensionBackUp(\''+b.name+'\')"></div></td>';
				             } else {
					  for(let i=0; i<4; i++) {
					    r.data += '<td></td>';
					         }				 
						 }
				r.data += '</tr>';			  
		          }
				  
		    r.data += '</tbody></table>';			
			r.data += '<p>Бэкапы Локального хранилища дублируют браузерные бэкапы, они предпочтительнее, так как в них сохранены все скриншоты.</p>';
			
		    handle(r);
			    });
	       });
	  }; 
	  
  /***********
	  Ext.Bd.DeleteBrowserBackUp - delete current backUp folder from browser bookmarks
   ***********/
	  
    Ext.Bd.DeleteBrowserBackUp = function(r, handle){
		chrome.bookmarks.removeTree(r.data.id, function() { 
		          r.status = 1;	
				  r.data = 'backUp deleted!';
				handle(r);
		    });	
	  };
	  
   /***********
	  Ext.Bd.DeleteLocalBackUp - delete current backUp item from extension Storage
   ***********/
	  
    Ext.Bd.DeleteLocalBackUp = function(r, handle){
		Ext.Bd.RemoveData(r.data.name, function(){
			  r.status = 1;	
			  r.data = 'local backUp deleted!';
		   handle(r);
			});
	  };
	  
  /***********
	  Ext.Bd.DownloadBrowserBackUp - download current backUp folder from browser bookmarks to service
   ***********/
	  
	Ext.Bd.DownloadBrowserBackUp = function(r, handle){
		
	  Ext.Bd.GetSetting(function(ExtSetting) {
		  
		  if(!ExtSetting.hasOwnProperty('isCreateBackUpWithExt') || ExtSetting.isCreateBackUpWithExt == 'no') {
			    r.status = 0;
		        r.data = 'Проверьте настройки дополнения! Отсутствует разрешение на работу с бэкапами из браузерного дополнения';
			   handle(r);
			  return false;
			  }
		
	    Ext.Bd.getBrowserBackupData(r.data.id, function(dt){ 
													   
			if(dt.status == 1) {
				 Ext.Bd.SetData({'Websites' : JSON.stringify(dt.data.localWebsites)}, function(){ 
				     r.status = 1;
					 r.data = {
						 message: 'Ext.Bd.DownloadBrowserBackUp => ID >>'+r.data.id+'<< Downloaded!',
						 websites: JSON.stringify(dt.data.localWebsites)
					       };
					     handle(r);
					        });
			             } else {
					 r.status = dt.status;
		             r.data = dt.data;
					     handle(r);
						   }
				  });
	        });
	  };
	  
   /***********
	  Ext.Bd.DownloadBrowserBackUp - download current backUp folder from browser bookmarks to service
   ***********/
	  
	Ext.Bd.DownloadLocalBackUp = function(r, handle){
		 
		Ext.Bd.GetData(null, function(dt) {
		  
		  var ExtSetting = dt.ExtSetting || {};
		  
		  if(!ExtSetting.hasOwnProperty('isCreateBackUpWithExt') || ExtSetting.isCreateBackUpWithExt == 'no') {
			    r.status = 0;
		        r.data = 'Проверьте настройки дополнения! Отсутствует разрешение на работу с бэкапами из браузерного дополнения';
			   handle(r);
			  return false;
			  }
		 
		  if(dt.hasOwnProperty(r.data.name) && Ext.Bd.parseStorageData(dt[r.data.name])){
				 Ext.Bd.SetData({'Websites' : dt[r.data.name]}, function(){ 
				     r.status = 1;
		             r.data = {
						 message: 'Ext.Bd.DownloadLocalBackUp => Name >>'+r.data.name+'<< Downloaded!',
						 websites: dt[r.data.name]
					       };
					    handle(r);
					        });
			             } else {
					 r.status = 0;
		             r.data = 'Data not Found!';
					    handle(r);
						 }
				 });
	   };
	  
   /***********
	  Ext.Bd.getBrowserBackupData - recieve backUp Data from browser bookmarks
   ***********/
	  
   Ext.Bd.getBrowserBackupData = function(backupID, handler) {
	   
	   var allowedFolders = ['Visual.Bookmarks', 'Panel.Bookmarks'],  bookmarkFolders = {}, intervalGetSubTree = null;
	   
         chrome.bookmarks.getSubTree(backupID, function(Tree) { 
														
		   var TreeNodes = Tree[0].children; 
		       TreeNodes.forEach(function(item){
				  if(allowedFolders.indexOf(item.title) != -1) {
						 bookmarkFolders[item.title] = item.id;
					             }
				          }); 
				   
	  var bookmarkFoldersLength = Ext.Bfn.ObjLength(bookmarkFolders), TreeLength = 0;
		
		 if(bookmarkFoldersLength == 0) {
			 
			   handler({status: 0, data: 'Sorry, BackUp not found'});
			   
		           } else {
			  
			     for(var name in bookmarkFolders) { 
				    if(bookmarkFolders.hasOwnProperty(name)) {
						chrome.bookmarks.getSubTree(bookmarkFolders[name], function(r) {
						    bookmarkFolders[r[0].title] = r[0].children || []; 
							bookmarkFolders[r[0].title] = Ext.Bd.parseBrowserBackupData(r[0].title, r[0].id, bookmarkFolders[r[0].title]);
							 TreeLength++;
								    });
						      } 
	                   }
					   
			    intervalGetSubTree = setInterval(function(){
				  if(bookmarkFoldersLength == TreeLength) {
					   clearInterval(intervalGetSubTree);	
					      allowedFolders.forEach(function(n) {
							   bookmarkFolders[n] = (bookmarkFolders[n]) ? bookmarkFolders[n] : [];						  
							       }); 
					      var localWebsites = bookmarkFolders['Visual.Bookmarks'].concat(bookmarkFolders['Panel.Bookmarks']);  
		                    if(localWebsites.length > 0) {
								   handler({status: 1, data: {'localWebsites': localWebsites}});
			                        } else {
					               handler({status: 0, data: 'Sorry, BackUp found, but hi is empty'});
									  }
				                }
				       }, 50);
				 }
		   });
     };
	 
   /***********
	  Ext.Bd.prepareBrowserBackUpIDs - prepare bookmarks ID from numeric/string to numeric
   ***********/
	 
	Ext.Bd.prepareBrowserBackUpID = function(id){
		
		var response = '';
		var str = String(id);
            str = str.toLowerCase();
			str = str.slice();
		
		var strList = [
				 '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q',
				 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '_', '-'
	                 ];
		
		   for(var i in str) {
			    var index = strList.indexOf(str[i]);
				    index = (index != -1) ? String(index) : String(1);
				  response += index;
		            }
					
		 var strLength = response.length; 
		 var data = Number(response);
			 
		    if(strLength > 12) {
				 var degree = strLength-12, divider = Math.pow(10, degree);
				   data = Math.floor(data/divider);
			          }
		 return data;
	  };
	 
   /***********
	  Ext.Bd.parseBrowserBackupData - parse recieved backUp Data from browser bookmarks for insert in service bookmarks
   ***********/
	 
   Ext.Bd.parseBrowserBackupData = function(type, mainParent, data, response, f) {
	var response = response || [];
	     data.forEach(function(w) { 
			var bkmk = {};
				bkmk.id = Ext.Bd.prepareBrowserBackUpID(w.id);
				bkmk.url = (!w.url) ? 'browserFolder_'+w.id : w.url;
				bkmk.title = w.title;
				bkmk.position = parseInt(w.index)+1;
				bkmk.personal = 1;
				bkmk.parent = (w.parentId == mainParent) ? 0 : Ext.Bd.prepareBrowserBackUpID(w.parentId);
				bkmk.up_date = parseInt(w.dateAdded);
				bkmk.type = (type == 'Visual.Bookmarks') ? 'visual_' : 'panel_'; 
				   if(w.children) {
						bkmk.type += 'folder';
						bkmk.folder_color = 'yellow';
						Ext.Bd.parseBrowserBackupData(type, mainParent, w.children, response, true);
							} else {
						bkmk.type += 'website';
						  if(bkmk.type == 'visual_website') {
							  bkmk.website_pictureType = 'thumb_color';
						        }
							} 
					response.push(bkmk);
		         });
	     if(typeof f == 'undefined') {
		      return response;
	            }
        };			 

  /***********
	  Ext.Bd.parseStorageData - parse data form String to Object
   ***********/

   Ext.Bd.parseStorageData = function(data) {
		  try {
			return !(data = JSON.parse(data)) ? false : data;
			  } catch (e) {
            return false;
              } 
	    };

  /***********
	  Ext.Bd.SetData - Writing data to local storage
   ***********/

    Ext.Bd.SetData = function(Data, handle) {	   
	   storage.set(Data, function(r) { 
           if(handle) handle(r);
             });
		};
		
    /***********
	  Ext.Bd.GetData - Reading data from the local storage
   ***********/		
		
	Ext.Bd.GetData = function(Data, handle) { 
	   storage.get(Data, function(rsp) { 
		 if(handle) handle(rsp);
           });
		};
		
   /***********
	  Ext.Bd.GetSetting - Reading extension settings from the local storage
   ***********/
		
	Ext.Bd.GetSetting = function(handle) {
	  Ext.Bd.GetData({'ExtSetting': false}, function(dt) {										  
		  var ExtSetting = !dt.ExtSetting ? {} : dt.ExtSetting;
		   if(handle) handle(ExtSetting); 
		 });
	 };
	 
	 /***********
	  Ext.Bd.SetDefaultSetting 
   ***********/
	 
	 Ext.Bd.SetDefaultSetting = function(S, handle) { 
	  /** 
	   ** Outdated settings  [restore, screenshot, bgsave]
	   ** New settings [isCreateBackUpWithExt, isCreateScreenWithExt, isCreateBookmarkInBg] 
	   **/
		  var Today = new Date(), S = S || {};
		   chrome.management.getSelf(function(r){
			  S.BkStorageMethod = !S.BkStorageMethod ? 'local' : S.BkStorageMethod;
			  S.LastChanges = !S.LastChanges ? 1 : S.LastChanges;
			  S.ExtLastActivity = !S.ExtLastActivity  ? Math.ceil(Today.getTime()/1000) : S.ExtLastActivity;
		      S.version = r.version;
			  S.ext_id = r.id;
			  
			   Ext.optionsList.forEach(function(item, i){
				 S[item] = !S.hasOwnProperty(item) ? 'no' : S[item];
				 S[item] = (item == 'isCreateBackUpWithExt') ? 'yes' : S[item];
			         });
				   
			  Ext.Bd.SetData({'ExtSetting': S}, function() { 
               if(handle) handle(r);
			    }); 
		  });
	 };
	 
   /***********
	  Ext.Bd.RemoveData - Remove data from the local storage
	    1.0 Ext.Bd.RemoveData("Websites", function(){    }); 
		1.1 Ext.Bd.RemoveData(["Websites", "Setting"], function(){    });
		2.0 Ext.Bd.RemoveData(function(){    }); 
   ***********/
	 
	Ext.Bd.RemoveData = function(a, b) { 
	  
	 if(typeof a !== 'function') { // variant 1
		  
		storage.remove(a, function() { 
		   if(typeof b === 'function') { b(); }
		        });
		  
	      } else { // variant 2
			  
	    storage.clear(function() {
		    if(typeof a === 'function') { a(); }
               });	    
		   }
       };
	 
	/***********
	  Ext.Bd.SendInBG - Send message in background.js
   ***********/
	
	Ext.Bd.SendInBG = function(command){
	  if(command) { 
	      chrome.runtime.sendMessage(command);  
	        } 
     };
	 
   /***********
	  Ext.Bd.GetLog - Read Log data from the external local storage (onlinezakladki.ru)
   ***********/
	 
	Ext.Bd.GetLog = function() {
	 var LOG = localStorage.ServiceLog;
	     if(!LOG) { 
		   LOG = new Array(); 
		     } else {  
		   try {
		    LOG = JSON.parse(LOG);
               } catch (err) {
            LOG = new Array();
         }
       } return LOG;		
	};
	
   /***********
	  Ext.Bd.ResetLog - Reset Log data in the external local storage (onlinezakladki.ru)
   ***********/
	
	Ext.Bd.ResetLog = function(full) {
	   if(full) { localStorage.removeItem('ServiceLog'); return; }
	    var LOG = Ext.Bd.GetLog();
	     if(LOG.length > 1000) {
			LOG.splice(1000, (LOG.length-1000));
			 localStorage.setItem("ServiceLog", JSON.stringify(LOG));
		 }
	};
	
  /***********
	  Ext.Bd.RewriteLog - Rewrite Log data in the external local storage (onlinezakladki.ru)
   ***********/
	
	Ext.Bd.RewriteLog = function(msg) { 
	
	 var date = new Date(); 
	     date = date.toLocaleString();
	 var mg =  date + ' =>> ' + msg + ' =>> ' + '[ 1 ]';
	
	   Ext.Bd.GetSetting(function(S) {
		   
		if(S.isAllowedDataExchange == 'yes' && S.isAllowedSendErrorToWeb == 'yes'){
	
	      try {
			  
	        var LOG = Ext.Bd.GetLog(); 
			var response = function(LOG) { 
			      localStorage.setItem("ServiceLog", JSON.stringify(LOG));
				 return false;
     				};
					  
			if(LOG.length == 0){
				   LOG.unshift(mg);
				  return response(LOG);
			        }
			
            var frst = LOG[0]; 
			    frst = frst.split(' =>> ');	

            if(frst[1] != msg){			
			        LOG.unshift(mg);
				 return response(LOG);
			       }
	  
	        var count = frst[2].replace('[ ', '').replace(' ]', '');
		        count = parseInt(count);
			    count++;
	            LOG[0] = frst[0] + ' =>> ' + frst[1] + ' =>> ' + '[ '+count+' ]';
	            response(LOG);       
               
		          } catch (e) {  
				  
			  Ext.Bd.ResetLog('full'); 

			       }
			  
		     } else {
				 
		 console.log(mg);		 
				 
			 }
	    });
	};
	
  /***********
	  Ext.Bd.SetErrorInLog - Set Javascript Error In Log data in the external local storage (onlinezakladki.ru)
   ***********/
	
	Ext.Bd.SetErrorInLog = function(e) { 
	 if(Ext.Bfn.IsNewTabPage(window.location.href, 'extension service')){ 
	        if(window.location.href.split('/').pop() == 'background.html'){
				e.filename = window.location.href;
			     Ext.Handler.prepareExternalRequestToProcess({task: 'errorInExtPage', data: e }); 
		             } else {
				 Ext.Bd.RewriteLog('<error>EXTENSION ERROR</error>: ' + e.message + ' (' + e.filename + ': ' + e.lineno + ')');
	               }
		      console.log('EXT ERROR -> '+ e.message + ' (' + e.filename + ': ' + e.lineno + ')');
	           }
	       };
	
   /***********
	  Ext.Bd.AddTaskToMakeScreen - Add Task To Make Screen in hand mode or in background
   ***********/
 
	Ext.Bd.AddTaskToMakeScreen = function(data, handle) {
	 Ext.Bd.GetData({'CaptureStatus': false }, function(dt) { 
	    var dt = (!dt.CaptureStatus) ? {} : dt.CaptureStatus;
		var Today = new Date(), Now = Math.ceil(Today.getTime()/1000);

		 switch(data.type){
			 
			 case 'hand':
				  if(!dt.status || (dt.status && dt.status == 'captureFinish') || (dt.exp_time && dt.exp_time < (Now-30))) {
					  
					  dt = {
						    id : data.id,
					        type : 'hand',
							browser : data.browser,
							fromTab : data.fromTab,
							status : 'captureBegin',
							url : data.url,
							title : '',
							screenshot : '',
							exp_time : Now
						};
				     
				    } else {
						
					dt = {
							status : 'captureBusy',
							url : data.url,
						};
						
					} 
			 break;
			 
			 case 'bg':
			 
			            dt = {
						    id : data.id,
					        type : 'bg',
							status : 'captureBegin',
							url : data.url,
							title : data.title,
							screenshot : '',
							exp_time : Now
						};
						
					captureQueue.add(dt);
			 
			 break;
		    }
			
		  if(typeof handle === 'function') handle(dt);
			
		});		
	};