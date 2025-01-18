var __background={
	checkStickyPassword: function (sticky_id, password, callback){
		try{
			sendMessage(
					{
						action: 'checkStickyPassword',
						sticky_id: sticky_id,
						password: password,
						url: document.location.href
					},
					function (response){
						if(typeof callback==='function'){
							callback(response);
						}
					},
					function (response){
						alert(refresh_page_error_updated_in_locale);
					}
			);
		}catch(e){
			console.log('checkStickyPassword', e);
			alert(refresh_page_error_updated_in_locale);
		}
	},

	deleteFromChannel: function (channel, callback){
		try{
			sendMessage(
					{
						action: 'deleteFromChannel',
						key: channel.key,
						sticky_id: channel.sticky_id,
						channel_id: channel.channel_id,
						url: document.location.href
					},
					function (response){
						if(typeof callback==='function'){
							callback(response);
						}
					},
					function (response){
						alert(refresh_page_error_updated_in_locale);
					}
			);
		}catch(e){
			console.log('deleteFromChannel', e);
			alert(refresh_page_error_updated_in_locale);
		}
	},
	deleteTag: function (tag, callback){
		try{
			sendMessage(
					{
						action: 'deleteTag',
						key: tag.key,
						tag_id: tag.id,
						url: document.location.href
					},
					function (response){
						if(typeof callback==='function'){
							callback(response);
						}
					},
					function (response){
						alert(refresh_page_error_updated_in_locale);
					}
			);
		}catch(e){
			console.log('deleteTag', e);
			alert(refresh_page_error_updated_in_locale);
		}
	},
	deleteShare: function (share, callback){
		try{
			sendMessage(
					{
						action: 'deleteShare',
						key: share.key,
						share_id: share.id,
						url: document.location.href,
						isShared: true
					},
					function (response){
						if(typeof callback==='function'){
							callback(response);
						}
					},
					function (response){
						alert(refresh_page_error_updated_in_locale);
					}
			);
		}catch(e){
			console.log('deleteShare', e);
			alert(refresh_page_error_updated_in_locale);
		}
	},
	deleteShared: function (data_key, callback){
		try{
			sendMessage(
					{
						action: 'deleteNote',
						key: data_key,
						url: document.location.href,
						isShared: true
					},
					function (response){
						if(typeof callback==='function'){
							callback(response);
						}
					},
					function (response){
						alert(refresh_page_error_updated_in_locale);
					}
			);
		}catch(e){
			console.log('deleteShared', e);
			alert(refresh_page_error_updated_in_locale);
		}
	},
	deleteAllSticky: function (callback){
		try{
			sendMessage(
					{
						action: 'deleteAllNote',
						url: document.location.href
					},
					function (response){
						if(typeof callback==='function'){
							callback(response);
						}
					},
					function (response){
						alert(refresh_page_error_updated_in_locale);
					}
			);
		}catch(e){
			console.log('deleteAllSticky', e);
			alert(refresh_page_error_updated_in_locale);
		}
	},
	deleteSticky: function (data_key, callback, wait){
		if(typeof wait==='undefined'){
			wait=true;
		}
		if(wait&&typeof isSaving==='function'&&isSaving(data_key)){
			setTimeout(function (){
				__background.deleteSticky(data_key, callback, false);
			}, 1000);
		}else{
			try{
				sendMessage(
						{
							action: 'deleteNote',
							key: data_key,
							url: document.location.href,
							isShared: false
						},
						function (response){
							if(typeof callback==='function'){
								callback(response);
							}
						},
						function (response){
							alert(refresh_page_error_updated_in_locale);
						}
				);
			}catch(e){
				console.log('deleteData', e);
				alert(refresh_page_error_updated_in_locale);
			}
		}
	},
	deleteStickyPassword: function (sticky_id, password, callback){
		try{
			sendMessage(
					{
						action: 'deleteStickyPassword',
						sticky_id: sticky_id,
						password: password,
						url: document.location.href
					},
					function (response){
						if(typeof callback==='function'){
							callback(response);
						}
					},
					function (response){
						alert(refresh_page_error_updated_in_locale);
					}
			);
		}catch(e){
			console.log('deleteStickyPassword', e);
			alert(refresh_page_error_updated_in_locale);
		}
	},

	getChannels: function (options, callback){
		if(isBackground){
			__OurStickys.backgroundGetChannels(options, function (response){
				callback(response?response:'{}');
			});
		}else{
			try{
				sendMessage(
						{
							action: 'getChannels',
							options: options,
							url: document.location.href
						},
						function (response){
							callback(response?response:'{}');
						},
						function (response){
							alert(refresh_page_error_updated_in_locale);
						}
				);
			}catch(e){
				console.log('getChannels', e);
				alert(refresh_page_error_updated_in_locale);
			}
		}
	},
	getChannelStickys: function (channel_id, options, callback){
		if(isBackground){
			__OurStickys.backgroundGetChannelsStickys(channel_id, options, function (response){
				callback(response?response:'{}');
			});
		}else{
			try{
				sendMessage(
						{
							action: 'getChannelStickys',
							channel_id: channel_id,
							options: options,
							url: document.location.href
						},
						function (response){
							callback(response?response:'{}');
						},
						function (response){
							alert(refresh_page_error_updated_in_locale);
						}
				);
			}catch(e){
				console.log('getChannelStickys', e);
				alert(refresh_page_error_updated_in_locale);
			}
		}
	},
	getShares: function (options, callback){
		if(isBackground){
			__OurStickys.backgroundGetDataShare(options, function (response){
				callback(response?response:'{}');
			});
		}else{
			try{
				sendMessage(
						{
							action: 'getShares',
							options: options,
							url: document.location.href
						},
						function (response){
							callback(response?response:'{}');
						},
						function (response){
							alert(refresh_page_error_updated_in_locale);
						}
				);
			}catch(e){
				console.log('getShares', e);
				alert(refresh_page_error_updated_in_locale);
			}
		}
	},
	getStickys: function (options, callback){
		if(isBackground){
			__OurStickys.backgroundGetData(options, function (response){
				callback(response?response:'{}');
			});
		}else{
			try{
				sendMessage(
						{
							action: 'get',
							options: options,
							url: document.location.href
						},
						function (response){
							callback(response?response:'{}');
						},
						function (response){
							alert(refresh_page_error_updated_in_locale);
						}
				);
			}catch(e){
				console.log('getData', e);
				alert(refresh_page_error_updated_in_locale);
			}
		}
	},

	reloadNote: function (key_note){
		sendMessage(
				{
					action: 'reloadNote',
					key: key_note
				},
				function (){ },
				function (response){
					alert(refresh_page_error_updated_in_locale);
				}
		);
	},
	reloadNotes: function (skipActive, options, callback){
		if(typeof options==='undefined'){
			options={};
		}
		//loadChannels
		getChannels(options, function (channels){
			//load shares.. if any
			getShares(options, function (shared_data){
				//load anyting else
				getData(options, function (data){
					//now update the tabs with the newly updated data
					chrome.tabs.query({}, function (tabs){
						var message='reloadNotes';
						if(typeof skipActive==='undefined'){
							skipActive=false;
						}
						//refresh all the tabs except the active one
						//I should load the data once first and the reload them all
						//so that the load event only happen once
						//don't cate what happen with the data at this point.. it is cached for future calls
						for(var i=0; i<tabs.length; ++i){
							if(!skipActive||!tabs[i].active){
								sendTabsMessage(tabs[i].id, message, null, function (){});
							}
						}
					});
					if(typeof callback==='function'){
						callback();
					}
				});
			});
		});
	},
	renameChannel: function (channel, callback){
		try{
			sendMessage(
					{
						action: 'renameChannel',
						id: channel.id,
						code: channel.code,
						name: channel.name
					},
					function (response){
						if(typeof callback==='function'){
							callback(response);
						}
					},
					function (response){
						alert(refresh_page_error_updated_in_locale);
					}
			);
		}catch(e){
			console.log('renameChannel', e);
			alert(refresh_page_error_updated_in_locale);
		}
	},

	saveChannel: function (channel, callback){
		try{
			sendMessage(
					{
						action: 'setChannel',
						name: channel.name
					},
					function (response){
						if(typeof callback==='function'){
							callback(response);
						}
					},
					function (response){
						alert(refresh_page_error_updated_in_locale);
					}
			);
		}catch(e){
			console.log('saveChannel', e);
			alert(refresh_page_error_updated_in_locale);
		}
	},
	saveShare: function (share, callback){
		try{
			sendMessage(
					{
						action: 'setShare',
						key: share.key,
						sticky_id: share.sticky_id,
						to_email: share.to_email,
						url: document.location.href
					},
					function (response){
						if(typeof callback==='function'){
							callback(response);
						}
					},
					function (response){
						alert(refresh_page_error_updated_in_locale);
					}
			);
		}catch(e){
			console.log('saveShare', e);
			alert(refresh_page_error_updated_in_locale);
		}
	},
	saveSticky: function (data_key, data_value, callback){
		try{
			sendMessage(
					{
						action: 'set',
						key: data_key,
						value: data_value,
						url: document.location.href
					},
					function (response){
						if(typeof callback==='function'){
							callback(response);
						}
					},
					function (response){
						alert(refresh_page_error_updated_in_locale);
					}
			);
		}catch(e){
			console.log('saveSticky', e);
			alert(refresh_page_error_updated_in_locale);
		}
	},
	saveStickys: function (stickys, callback){
		try{
			sendMessage(
					{
						action: 'setAll',
						value: stickys,
						url: document.location.href
					},
					function (response){
						if(typeof callback==='function'){
							callback(response);
						}
					},
					function (response){
						alert(refresh_page_error_updated_in_locale);
					}
			);
		}catch(e){
			console.log('saveSticky', e);
			alert(refresh_page_error_updated_in_locale);
		}
	},
	saveStickyPassword: function (sticky_id, password, old_password, callback){
		try{
			sendMessage(
					{
						action: 'saveStickyPassword',
						sticky_id: sticky_id,
						password: password,
						old_password: old_password,
						url: document.location.href
					},
					function (response){
						if(typeof callback==='function'){
							callback(response);
						}
					},
					function (response){
						alert(refresh_page_error_updated_in_locale);
					}
			);
		}catch(e){
			console.log('saveStickyPassword', e);
			alert(refresh_page_error_updated_in_locale);
		}
	},
	saveTag: function (tag, callback){
		try{
			sendMessage(
					{
						action: 'setTag',
						key: tag.key,
						sticky_id: tag.sticky_id,
						tag: tag.tag,
						url: document.location.href
					},
					function (response){
						if(typeof callback==='function'){
							callback(response);
						}
					},
					function (response){
						alert(refresh_page_error_updated_in_locale);
					}
			);
		}catch(e){
			console.log('saveTag', e);
			alert(refresh_page_error_updated_in_locale);
		}
	},
	saveToChannel: function (channel, callback){
		try{
			sendMessage(
					{
						action: 'setToChannel',
						key: channel.key,
						sticky_id: channel.sticky_id,
						channel_id: channel.channel_id,
						url: document.location.href
					},
					function (response){
						if(typeof callback==='function'){
							callback(response);
						}
					},
					function (response){
						alert(refresh_page_error_updated_in_locale);
					}
			);
		}catch(e){
			console.log('saveToChannel', e);
			alert(refresh_page_error_updated_in_locale);
		}
	}
};
var __tabs={
	createNote: function (tab_id, url){
		sendTabsMessage(
				tab_id,
				'createNote',
				function (response){
					if(typeof response==='undefined'){
						if(
								(
										url.indexOf('http://')!==0&&
										url.indexOf('https://')!==0
										)||
								url.indexOf('https://chrome.google.com/')===0
								){
							alert(refresh_page_error_restricted_in_locale);
						}else{
							alert(refresh_page_error_install_in_locale);
						}
					}
				},
				function (response){
					alert(refresh_page_error_updated_in_locale);
				}
		);
	},
	hideNotesByChannels: function (){
		chrome.tabs.query({}, function (tabs){
			var message={
				action: 'hideByChannels'
			};
			//refresh all the tabs except the active one
			//I should load the data once first and the reload them all
			//so that the load event only happen once
			for(var i=0; i<tabs.length; ++i){
				sendTabsMessage(tabs[i].id, message);
			}
		});

	},
	loadNotes: function (){
		chrome.tabs.query({}, function (tabs){
			var message={
				action: 'loadNotes'
			};
			//refresh all the tabs except the active one
			//I should load the data once first and the reload them all
			//so that the load event only happen once
			for(var i=0; i<tabs.length; ++i){
				sendTabsMessage(tabs[i].id, message);
			}
		});
	},
	reloadNote: function (key_note){
		chrome.tabs.query({}, function (tabs){
			var message={
				action: 'reloadNote',
				key: key_note
			};
			//I should load the data once first and then reload them all
			//so that the load event only happen once
			for(var i=0; i<tabs.length; ++i){
				sendTabsMessage(tabs[i].id, message);
			}
		});
	}
};