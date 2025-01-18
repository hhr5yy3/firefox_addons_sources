var __OurStickys={
	isPullingData: false,
	isPullingDataShare: false,
	isPullingChannels: false,
	isPullingChannelsStickys: {},

	init: function (){
		isBackground=true;
		if(!__OurStickys.authenticated.get()){
			__storage.get('facebookAccessToken', function (facebookAccessToken){
				if(facebookAccessToken){
					authenticatedWith['facebook']=true;
					getFacebookInfo(facebookAccessToken, function (isLoggedIn){
						__OurStickys.authenticated.set(isLoggedIn);
						if(isLoggedIn){
							sendReloadNotes();
						}else{
							__storage.remove('facebookAccessToken', function (){
								authenticateFacebook({
									'callback': function (isLoggedIn){
										__OurStickys.authenticated.set(isLoggedIn);
										if(isLoggedIn){
											sendReloadNotes();
										}
									}
								});
								chrome.tabs.create({
									url: facebookAuthenticationURL
								});
							});
						}
					});
				}else{
					authenticateChrome({
						'interactive': false,
						'callback': function (isLoggedIn){
							if(__OurStickys.authenticated.get()!==isLoggedIn){
								__OurStickys.authenticated.set(isLoggedIn);
								authenticatedWith['google']=isLoggedIn;
								sendReloadNotes();
							}
						}
					});
				}
			});
		}

		chrome.browserAction.setIcon({
			path: '/img/icons/note128.png'
		});
		// Check whether new version is installed
		chrome.runtime.onInstalled.addListener(function (details){
			//only ping at install or at version change
			if(details.reason==="install"||(details.reason==="update"&&(chrome.runtime.getManifest().version!==details.previousVersion))){
				__database.pingServer(chrome.runtime.getManifest().version, details);
			}
		});
		chrome.windows.onRemoved.addListener(function (window_id){
			if(popupWindowId===window_id){
				popupWindowId=0;
			}
		});
		chrome.commands.onCommand.addListener(function (command){
			switch(command){
				case 'add-sticky':
					createStickyBackground();
					break;
				case 'open-list':
					__OurStickys.openPopupList();
					break;
			}
		});

		chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab){
			if(typeof changeInfo['status']!=='undefined'&&changeInfo['status']==='complete'){
				if(tab.url.indexOf(shareURL)===0){
					if(__OurStickys.authenticated.get()){
						//YEAH !!
						var params=tab.url.split('?')[1];
						var all_params=params.split('&')[0];
						var share_id=all_params.split('=')[1];
						__OurStickys.backgroundGetDataShare({
							force: true
						}, function (data){
							var note_found=false;
							var myNotes=JSON.parse(data);
							for(var i in myNotes){
								var note=myNotes[i];
								if(note.shared.id===share_id){
									note_found=true;
									chrome.tabs.update(tabId, {
										url: note.page
									});
								}
							}
							if(!note_found){
								//not your share.. log out and log back in
							}
						});
					}else{
						//BOOOOO....
					}
				}else{
					//send the loadNotes to the tab that has the URL changes
					sendTabsMessage(
							tabId,
							{
								action: 'loadNotes'
							},
							function (){}
					);
				}
			}
		});
		chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
			var url=(sender.tab&&sender.tab.url)?sender.tab.url:'*';
			switch(request.action){
				case 'setDefaultSettings':
					__storage.get('defaultSettings', function (tmp){
						if(!tmp||tmp===""){
							tmp="{}";
						}
						var settings=JSON.parse(tmp);
						settings[request.key]=request.value;
						__storage.set('defaultSettings', JSON.stringify(settings), function (){
							//TO DO AFTER THAT IS ALREADY STORED IN LOCAL STORAGE
							switch(request.key){
								case 'liveUpdatesEnabled':
									if(request.value){
										//start it
										__events.init();
									}else{
										//close the stream event if it was enabled
										__events.close();
									}
									break;
							}
						});
					});
					break;
				case 'getDefaultSettings':
					__storage.get('defaultSettings', function (tmp){
						if(!tmp||tmp===""){
							tmp="{}";
						}
						var settings=JSON.parse(tmp);
						var ret;
						if(request.key){
							if(settings[request.key]){
								ret=settings[request.key];
							}else if(request.default){
								ret=request.default;
							}
						}else{
							ret=settings;
						}
						sendResponse(ret);
					});
					return true;
					break;
				case 'get':
					//do not change - used in functions getData
					var options=request.options||{};
					__OurStickys.backgroundGetData(options, sendResponse);
					return true;
					break;
				case 'getShares':
					//do not change - used in functions getShares
					var options=request.options||{};
					__OurStickys.backgroundGetDataShare(options, sendResponse);
					return true;
					break;
				case 'getChannels':
					//do not change - used in functions getChannels
					var options=request.options||{};
					__OurStickys.backgroundGetChannels(options, sendResponse);
					return true;
					break;
				case 'getChannelStickys':
					//do not change - used in functions getChannelStickys
					var options=request.options||{};
					var channel_id=request.channel_id;
					__OurStickys.backgroundGetChannelsStickys(channel_id, options, sendResponse);
					return true;
					break;
				case 'checkStickyPassword':
					var sticky_id=request.sticky_id;
					var password=request.password;
					__database.checkStickyPassword(sticky_id, password, sendResponse);
					return true;
					break;
				case 'saveStickyPassword':
					var sticky_id=request.sticky_id;
					var password=request.password;
					var old_password=request.old_password;
					__database.saveStickyPassword(sticky_id, password, old_password, sendResponse);
					return true;
					break;
				case 'deleteStickyPassword':
					var sticky_id=request.sticky_id;
					var password=request.password;
					__database.deleteStickyPassword(sticky_id, password, sendResponse);
					return true;
					break;
				case 'reloadNote':
					var key_note=request.key;
					__tabs.reloadNote(key_note);
					break;
				case 'set':
					var key_note=request.key;
					var notes=JSON.parse(request.value);
					if(typeof notes[key_note]!=='undefined'){
						if(__OurStickys.authenticated.get()){
							__database.saveRecord(notes[key_note], function (response){
								if(response.id){
									notes[key_note].id=response.id;
								}
								loadedNotes.update(key_note, notes[key_note]);
								sendResponse(response);
							});
							return true;
						}else{
							loadedNotes.update(key_note, notes[key_note]);
							sendReloadNotes(true);
						}
					}
					break;
				case 'setAll':
					var notes=request.value;
					if(__OurStickys.authenticated.get()){
						__database.saveRecords(notes, function (newNotes){
							for(var key_note in newNotes){
								var response=newNotes[key_note];
								if(response.id){
									notes[key_note].id=response.id;
								}
								loadedNotes.updateBulk(notes);
							}
							sendResponse(response);
						});
						return true;
					}else{
						loadedNotes.updateBulk(notes);
						sendReloadNotes(true);
					}
					break;
				case 'setShare':
					if(__OurStickys.authenticated.get()){
						var share={
							'sticky_id': request.sticky_id,
							'to_email': request.to_email
						};
						var key_note=request.key;
						__database.saveShare(share, function (response){
							//let's update the current note in memory
							loadedNotes.get(function (notesJSON){
								var notes=JSON.parse(notesJSON);
								notes[key_note]['extras']['shares'].push({
									id: response.info.id,
									to_email: request.to_email
								});
								loadedNotes.update(key_note, notes[key_note]);
								sendReloadNotes(true);
								console.log(response);
								sendResponse(response);
							});
						});
						return true;
					}
					break;
				case 'setChannel':
					if(__OurStickys.authenticated.get()){
						var channel={
							'name': request.name
						};
						__database.saveChannel(channel, function (response){
							if(typeof response.info!=='undefined'){
								loadedChannels.update(response.info.id, response.info);
							}
							sendResponse(response);
						});
						return true;
					}
					break;
				case 'renameChannel':
					if(__OurStickys.authenticated.get()){
						var channel={
							id: request.id,
							name: request.name
						};
						__database.renameChannel(channel, function (response){
							if(typeof response.info!=='undefined'){
								loadedChannels.update(response.info.id, response.info);
							}
							sendResponse(response);
						});
						return true;
					}
					break;
				case 'setToChannel':
					var channel_id=request.channel_id;
					if(__OurStickys.authenticated.get()&&channel_id!==''){
						var sticky_id=request.sticky_id;
						var key_note=request.key;
						__database.saveToChannel(channel_id, sticky_id, function (response){
							//TO-DO: do something here
							//like reload notes or update the current note with+1 stickys in it
							//get channel_name
							loadedChannels.get(function (channelsJSON){
								var channels=JSON.parse(channelsJSON);
								var channel_name='';
								for(var i in channels){
									if(channels[i].id===channel_id){
										channel_name=channels[i].name;
									}
								}
								loadedNotes.get(function (notesJSON){
									var notes=JSON.parse(notesJSON);
									notes[key_note]['extras']['channels'].push({
										'id': channel_id,
										'name': channel_name
									});
									loadedNotes.update(key_note, notes[key_note]);
									//update the current channels: number of stickys
									loadedChannels.get(function (channelsJSON){
										var channels=JSON.parse(channelsJSON);
										var channel;
										for(var i in channels){
											if(channels[i].id===channel_id){
												channels[i].stickys=parseInt(channels[i].stickys, 10)+1;
												channel=channels[i];
												break;
											}
										}
										loadedChannels.update(channel.id, channel);
										sendReloadNotes(true);
										sendResponse(response);
									});
								});
							});
						});
						return true;
					}
					break;
				case 'setTag':
					var key_note=request.key;
					var updateNoteTag=function (response){
						loadedNotes.get(function (notesJSON){
							var notes=JSON.parse(notesJSON);
							if(typeof notes[key_note]['extras']==='undefined'){
								notes[key_note]['extras']={};
							}
							notes[key_note]['extras']['tags'].push({
								'id': response.info.id,
								'tag': request.tag
							});
							loadedNotes.update(key_note, notes[key_note]);
							sendReloadNotes(true);
							sendResponse(response);
						});
					};
					if(__OurStickys.authenticated.get()){
						var tag={
							'sticky_id': request.sticky_id,
							'tag': request.tag
						};
						__database.saveTag(tag, updateNoteTag);
						return true;
					}else{
						//fake a UUID and send it
						var response={
							info: {
								id: crc32(request.tag)
							},
							tag: request.tag
						};
						updateNoteTag(response);
						return true;
					}
					break;
				case 'deleteAllNote':
					loadedNotes.empty();
					if(__OurStickys.authenticated.get()){
						//send a request to delete the notes
						__database.deleteAllSticky(function (){
							sendReloadNotes(true);
						});
						return true;
					}else{
						sendReloadNotes(true);
					}
					break;
				case 'deleteNote':
					var key_note=request.key;
					var is_shared=request.isShared;
					if(is_shared){
						//delete a shared note
						if(__OurStickys.authenticated.get()){
							var options=request.options||{};
							__OurStickys.backgroundGetDataShare(options, function (data){
								var myNotes=JSON.parse(data);
								if(typeof myNotes[key_note]!=='undefined'){
									loadedNotes.remove(key_note);
									//send a request to delete the notes
									__database.deleteSharedRecord(myNotes[key_note]['shared'].id, function (){
										sendReloadNotes(true);
									});
									return true;
								}
							});
						}
					}else{
						var options=request.options||{};
						__OurStickys.backgroundGetData(options, function (data){
							var myNotes=JSON.parse(data);
							if(typeof myNotes[key_note]!=='undefined'){
								loadedNotes.remove(key_note);
								if(__OurStickys.authenticated.get()){
									//send a request to delete the notes
									if(myNotes[key_note].id){
										__database.deleteRecord(myNotes[key_note].id, function (){
											sendReloadNotes(true);
										});
										return true;
									}else{
										//no need to delete from the __database.. it was never stored there
										sendReloadNotes(true);
									}
								}else{
									sendReloadNotes(true);
								}
							}
						});
					}
					break;
				case 'deleteShare':
					//this delete a share for a note
					//very similar to deleteNote.is_shared="yes"
					//but it is called by the user that created the share to start with
					var share_id=request.share_id;
					var key_note=request.key;
					__database.deleteShareRecord(share_id, function (){
						//is a self shared one?
						loadedNotes.get(function (notesJSON){
							var notes=JSON.parse(notesJSON);
							if(notes[key_note]){
								//remove it from the notes
								var s=notes[key_note]['extras']['shares'];
								for(var i in s){
									if(s[i].id===share_id){
										s.splice(i, 1);
									}
								}
								notes[key_note]['extras']['shares']=s;
								loadedNotes.update(key_note, notes[key_note]);
							}
							loadedShares.remove(key_note);
							sendReloadNotes(true);
						});
					});
					break;
				case 'deleteChannel':
					var channel_id=request.channel_id;
					__database.deleteChannel(channel_id, function (){
						loadedChannels.remove(channel_id);
						loadedChannelStickys.delete(channel_id);
						//are there any notes using this channel?
						loadedNotes.get(function (notesJSON){
							var notes=JSON.parse(notesJSON);
							for(var key_note in notes){
								for(var i in notes[key_note]['extras']['channels']){
									if(notes[key_note]['extras']['channels'][i].id===channel_id){
										notes[key_note]['extras']['channels'].splice(i, 1);
									}
								}
								loadedNotes.update(key_note, notes[key_note]);
							}
							sendReloadNotes(true);
						});
					});
					break;
				case 'deleteFromChannel':
					var channel_id=request.channel_id;
					var sticky_id=request.sticky_id;
					var key_note=request.key;
					__database.deleteFromChannel(channel_id, sticky_id, function (){
						loadedNotes.get(function (notesJSON){
							var notes=JSON.parse(notesJSON);
							//remove it from the channels
							var s=notes[key_note]['extras']['channels'];
							for(var i in s){
								if(s[i].id===channel_id){
									s.splice(i, 1);
								}
							}
							notes[key_note]['extras']['channels']=s;
							loadedNotes.update(key_note, notes[key_note]);
							//update the current channels: number of stickys
							loadedChannels.get(function (channelsJSON){
								var channels=JSON.parse(channelsJSON);
								var channel;
								for(var i in channels){
									if(channels[i].id===channel_id){
										channels[i].stickys=parseInt(channels[i].stickys, 10)-1;
										channel=channels[i];
										break;
									}
								}
								loadedChannels.update(channel.id, channel);
								sendReloadNotes(true);
							});
						});
					});
					break;
				case 'deleteTag':
					//this delete a tag for a note
					//very similar to deleteShare
					var tag_id=request.tag_id;
					var key_note=request.key;
					var deleteNoteTag=function (){
						loadedNotes.get(function (notesJSON){
							var notes=JSON.parse(notesJSON);
							//remove it from the notes
							var s=notes[key_note]['extras']['tags'];
							for(var i in s){
								if(s[i].id==tag_id){
									s.splice(i, 1);
								}
							}
							notes[key_note]['extras']['tags']=s;
							loadedNotes.update(key_note, notes[key_note]);
							sendReloadNotes(true);
						});
					};
					if(__OurStickys.authenticated.get()){
						__database.deleteTagRecord(tag_id, deleteNoteTag);
					}else{
						deleteNoteTag();
					}
					return true;
					break;
				case 'searchChannel':
					var code=request.code;
					__database.searchChannel(code, function (channel){
						sendResponse(channel);
					});
					return true;
					break;
				case 'subscribeChannel':
					var channel_id=request.channel_id;
					__database.subscribeChannel(channel_id, function (response){
						var options={
							force: true
						};
						__OurStickys.backgroundGetChannels(options, function (channels){
							loadedChannels.set(channels);
						});
					});
					break;
				case 'unsubscribeChannel':
					var channel_id=request.channel_id;
					__database.unsubscribeChannel(channel_id, function (response){
						loadedChannels.remove(channel_id);
						loadedChannelStickys.delete(channel_id);
					});
					break;
				case 'isAuthenticated':
					sendResponse(__OurStickys.authenticated.get());
					break;
				case 'authenticatedWith':
					var ret='';
					if(authenticatedWith['facebook']){
						ret='Facebook';
					}else if(authenticatedWith['google']){
						ret='Google';
					}
					sendResponse(ret);
					break;
				case 'deAuthenticate':
					__OurStickys.authenticated.set(false);
					if(authenticatedWith['facebook']){
						authenticatedWith['facebook']=false;
						deAuthenticateFacebook(sendReloadNotes);
					}else if(authenticatedWith['google']){
						authenticatedWith['google']=false;
						deAuthenticateChrome(sendReloadNotes);
					}
					__OurStickys.clearLocalStorage();
					__events.close();
					break;
				case 'googleAuthenticate':
					authenticateChrome(
							{
								'interactive': true,
								'callback': function (isLoggedIn){
									if(__OurStickys.authenticated.get()!==isLoggedIn){
										__OurStickys.authenticated.set(isLoggedIn);
										sendReloadNotes();
									}
									if(__OurStickys.authenticated.get()){
										authenticatedWith['google']=true;
										saveNonAuthNotesToServer();
									}
								}
							}
					);
					break;
				case 'facebookAuthenticate':
					authenticateFacebook({
						'callback': function (isLoggedIn){
							if(__OurStickys.authenticated.get()!==isLoggedIn){
								__OurStickys.authenticated.set(isLoggedIn);
								sendReloadNotes();
							}
							if(__OurStickys.authenticated.get()){
								authenticatedWith['facebook']=true;
								saveNonAuthNotesToServer();
							}
						}
					});
					break;
				case 'copyToCurrentTab':
					var keyNote=request.key;
					chrome.tabs.query(
							{
								active: true,
								currentWindow: true
							},
							function (tabs){
								if(tabs[0]){
									sendTabsMessage(
											tabs[0].id,
											'is_active',
											function (response){
												if(response!==true){
													//can't write on tis page
													alert(i18n('errorRefreshPageRestricted'));
													sendResponse(false);
												}else{
													let params={
														action: 'move_to_page',
														key: keyNote,
													};
													sendTabsMessage(
															tabs[0].id,
															params,
															function (response){
																sendResponse(response);
															}
													);
												}
											}
									);
								}
							});
					return true;
					break;
				case 'setBadgeText':
					if(sender.tab&&sender.tab.id){
						chrome.browserAction.setBadgeText({
							text: request.value,
							tabId: sender.tab.id
						});
					}
					break;
				case 'getCurrentTab':
					chrome.tabs.query(
							{
								active: true,
								currentWindow: true
							},
							function (tab){
								sendResponse(tab[0]);
							}
					);
					return true;
					break;
				case 'hideShowAll':
					showingNotes=request.show;
					var message=showingNotes?'showAll':'hideAll';
					chrome.tabs.query({}, function (tabs){
						for(var i=0; i<tabs.length; ++i){
							sendTabsMessage(tabs[i].id, message, function (response){
								if(typeof callback==='function'){
									callback(response);
								}
							});
						}
					});
					break;
				case 'isShowingNotes':
					sendResponse(showingNotes);
					break;
				case 'setShowingChannels':
					__OurStickys.setShowingChannels(request.show);
					break;
				case 'getShowingChannels':
					__OurStickys.getShowingChannels(function (showingChannels){
						try{
							sendResponse(showingChannels);
						}catch(e){

						}
					});
					return true;
					break;
				case 'openPopup':
					__OurStickys.openPopupList(request.tab);
					break;
				case 'closePopup':
					if(popupWindowId>0){
						chrome.windows.remove(popupWindowId);
					}
					break;
			}
		});
		__OurStickys.createContextMenus();
//chrome.tabs.onCreated.addListener(function (tab){});
//chrome.tabs.onActivated.addListener(function (activeInfo){});
//chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab){}); //to replace the URL check ?
//chrome.tabs.onHighlighted.addListener(function (highlightInfo){});
//chrome.tabs.onReplaced.addListener(function (addedTabId, removedTabId){});
	},
	authenticated: {
		val: false,
		set: function (value){
			this.val=value;
			return this;
		},
		get: function (){
			return this.val;
		}
	},
	openPopupList: function (request_tab){
		var tab=request_tab?('t:'+request_tab):'';
		if(popupWindowId===0){
			chrome.windows.create({
				url: 'popup/popup.html#'+tab,
				type: 'popup',
				width: 430,
				height: 590
			}, function (window){
				popupWindowId=window.id;
			});
		}else{
			chrome.windows.update(popupWindowId, {
				focused: true,
				width: 430,
				height: 590
			}, function (window){});
		}
	},
	backgroundGetData: function (options, callback){
		if(__OurStickys.isPullingData!==false){
			setTimeout(function (){
				__OurStickys.backgroundGetData(options, callback);
			}, 250);
		}else{
			__OurStickys.isPullingData=true;
			if(__OurStickys.authenticated.get()){
				var process_notes=function (notes){
					if(notes!==false){
						//if I am trying to save a specific note
						//I need to make sure that I have the share_id
						var key_note=options.keyNote||false;
						//still cached.. is this note ok?
						if(key_note!==false){
							var t=JSON.parse(notes);
							if(typeof t[key_note]==='undefined'||typeof t[key_note]['id']==='undefined'){
								loadedNotes.empty();
								notes=false;
							}
						}
					}
					if(notes===false){
						__database.loadRecords(function (notes){
							__OurStickys.isPullingData=false;
							if(notes==='error'){
								alert('Error loading the Stickys.  ');
							}else{
								loadedNotes.set(notes);
								try{
									callback(notes);
								}catch(e){

								}
							}
						});
					}else{
						__OurStickys.isPullingData=false;
						try{
							callback(notes);
						}catch(e){

						}
					}
				};
				var notes;
				if(options.force===true){
					notes=false;
					process_notes(notes);
				}else{
					loadedNotes.get(process_notes);
				}
			}else{
				loadedNotes.get(function (data){
					__OurStickys.isPullingData=false;
					callback(data);
				});
			}
		}
	},
	backgroundGetDataShare: function (options, callback){
		if(__OurStickys.isPullingDataShare!==false){
			setTimeout(function (){
				__OurStickys.backgroundGetDataShare(options, callback);
			}, 250);
		}else{
			__OurStickys.isPullingDataShare=true;
			if(__OurStickys.authenticated.get()){
				var processNotes=function (notes){
					if(notes===false){
						__database.loadShares(function (notes){
							__OurStickys.isPullingDataShare=false;
							if(notes==='error'){
								alert('Error loading the Shared Stickys.  ');
							}else{
								loadedShares.set(notes);
								callback(notes);
							}
						});
					}else{
						__OurStickys.isPullingDataShare=false;
						callback(notes);
					}
				};
				var notes;
				if(options.force===true){
					notes=false;
					processNotes(notes);
				}else{
					loadedShares.get(processNotes);
				}
			}else{
				//only for non authenticated users
				__OurStickys.isPullingDataShare=false;
				callback('{}');
			}
		}
	},
	backgroundGetChannels: function (options, callback){
		if(__OurStickys.isPullingChannels!==false){
			setTimeout(function (){
				__OurStickys.backgroundGetChannels(options, callback);
			}, 250);
		}else{
			__OurStickys.isPullingChannels=true;
			if(__OurStickys.authenticated.get()){
				var processChannels=function (channels){
					if(channels===false){
						__database.loadChannels(function (channels){
							__OurStickys.isPullingChannels=false;
							if(channels==='error'){
								alert('Error loading the channels.  ');
							}else{
								loadedChannels.set(channels);
								callback(channels);
							}
						});
					}else{
						__OurStickys.isPullingChannels=false;
						callback(channels);
					}
				};
				if(options.force===true){
					processChannels(false);
				}else{
					loadedChannels.get(processChannels);
				}
			}else{
				//only for non authenticated users
				__OurStickys.isPullingChannels=false;
				callback('{}');
			}
		}
	},
	backgroundGetChannelsStickys: function (channel_id, options, callback){
		__OurStickys.isPullingChannelsStickys[channel_id]=(typeof __OurStickys.isPullingChannelsStickys[channel_id]!=='undefined'&&__OurStickys.isPullingChannelsStickys[channel_id]===true);
		if(__OurStickys.isPullingChannelsStickys[channel_id]!==false){
			setTimeout(function (){
				__OurStickys.backgroundGetChannelsStickys(channel_id, options, callback);
			}, 250);
		}else{
			__OurStickys.isPullingChannelsStickys[channel_id]=true;
			if(__OurStickys.authenticated.get()){
				var processChannelStickys=function (channelStickys){
					if(channelStickys===false){
						__database.loadChannelStickys(channel_id, function (channelStickys){
							__OurStickys.isPullingChannelsStickys[channel_id]=false;
							if(channelStickys==='error'){
								alert('Error loading the channelsStickys.  ');
							}else{
								loadedChannelStickys.set(channel_id, channelStickys);
								callback(channelStickys);
							}
						});
					}else{
						__OurStickys.isPullingChannelsStickys[channel_id]=false;
						callback(channelStickys);
					}
				};
				if(options.force===true){
					processChannelStickys(false);
				}else{
					loadedChannelStickys.get(channel_id, processChannelStickys);
				}
			}else{
				//only for non authenticated users
				__OurStickys.isPullingChannelsStickys[channel_id]=false;
				callback('{}');
			}
		}
	},
	clearLocalStorage: function (){
		loadedNotes.delete();
		loadedShares.delete();
		loadedChannels.delete();
		loadedChannelStickys.delete();
		__storage.remove('showChannels');
	},
	createContextMenus: function (){
		//create a context menu:
		chrome.contextMenus.removeAll();
		chrome.contextMenus.create({
			'title': i18n("cxtMenu"),
			'contexts': ['all'],
			'id': 'ourStickyMainMenu',
			'onclick': function (info, tab){
				if(tab.id===-1){
					//I am in a plugin (PDF viewer)
					//let's select the active tab
					chrome.tabs.query(
							{
								active: true,
								currentWindow: true
							},
							function (tab){
								sendCreateNote(tab[0].id, tab[0].url);
							}
					);
				}else{
					sendCreateNote(tab.id, tab.url);
				}
			}
		});
	},
	getShowingChannels: function (callback){
		__storage.get('showChannels', function (ret){
			if(ret){
				ret=JSON.parse(ret);
			}else{
				ret={};
			}
			callback(ret);
		});
	},
	setShowingChannels: function (show){
		__storage.set('showChannels', JSON.stringify(show));
	}
};
__OurStickys.init();