var focusTab=false;
var refreshStickyTimeout=false;
if(window.location.hash){
	//this is called by the extension itself
	focusTab=window.location.hash.substr(3);
}else{
	sendMessage({
		action: 'closePopup'
	}, function (){});
}
var listRestrictedBySearch=false;	//this is used to avoid the "flashing" effect while typing in the search bar
document.addEventListener('DOMContentLoaded', function (){
	var refresh_page=$("refresh_page");
	refresh_page.onclick=function (){
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function (arrayOfTabs){
			chrome.tabs.reload(arrayOfTabs[0].id);
			window.close();
		});
	};
	$('extensionVersion').empty().appendChild(document.createTextNode('v.'+chrome.runtime.getManifest().version));

	$('tag_search_input').oninput=function (e){
		var val=this.value.toLowerCase();
		var opts=$('tag_search_list').childNodes;
		if(val===''){
			if(listRestrictedBySearch){
				listRestrictedBySearch=false;
				loadStickys(false);		//no shared
				loadStickys(true);		//shared
			}
		}else{
			var found=false;
			for(var i=0; i<opts.length; i++){
				if(opts[i].value===val){
					found=true;
					listRestrictedBySearch=true;
					// An item was selected from the list!
					//hide all the tags that do not have a key_note in the selected collectedTags[tag].keyNotes
					loadStickys(false, collectedTags[val].keyNotes);	//no shared
					loadStickys(true, collectedTags[val].keyNotes);		//shared
					break;
				}
			}
			if(!found&&listRestrictedBySearch){
				listRestrictedBySearch=false;
				loadStickys(false);	//no shared
				loadStickys(true);	//shared
			}
		}
	};
	$('expand').onclick=function (e){
		sendMessage({
			action: 'openPopup',
			tab: 'MyNotes'
		}, function (){});
		window.close();
	};
	if(focusTab!==false){
		//do not display the message if I am not in the top right popup
		refresh_page.style.display="none";
		$('authenticatedLogout').style.display="none";
//		$('add_new').style.display="none";
		$('expand').style.display="none";
	}else{
		chrome.tabs.query(
				{
					active: true,
					currentWindow: true
				},
				function (tabs){
					sendTabsMessage(
							tabs[0].id,
							'is_active',
							function (response){
								if(response!==true){
									refresh_page.style.display="block";
								}else{
									refresh_page.style.display="none";
								}
							}
					);
				});
	}
	sendMessage(
			{
				action: 'isAuthenticated'
			},
			function (authenticated){
				var noAuth=$("no_authenticated");
				var auth=$("authenticated");
				var popupTabSharedNotes=$("popupTabSharedNotes");
				var popupTabChannels=$("popupTabChannels");
				if(authenticated){
					noAuth.style.display="none";
					auth.style.display="block";
					popupTabSharedNotes.style.display="block";
					popupTabChannels.style.display="block";
					sendMessage(
							{
								action: 'authenticatedWith'
							},
							function (response){
								$('authenticatedWith').empty().appendChild(document.createTextNode(i18n('popupAuthenticatedWith', response)));
							}
					);
					$("authenticatedLogout").onclick=function (){
						sendMessage(
								{
									action: 'deAuthenticate'
								},
								function (response){ }
						);
						window.close();
					};
					$('liveUpdatesEnabledWrapper').style.display='show';
					$('forceRefreshData').style.display='show';
					$('deleteAllStickys').style.display='show';
				}else{
					noAuth.style.display="block";
					auth.style.display="none";
					popupTabSharedNotes.style.display="none";
					popupTabChannels.style.display="none";
					var gElem=$("google_authenticate");
					gElem.onclick=function (e){
						sendMessage(
								{
									action: 'googleAuthenticate'
								},
								function (response){ }
						);
						window.close();
					};
					var fElem=$("facebook_authenticate");
					fElem.setAttribute('href', facebookAuthenticationURL);
					fElem.onclick=function (e){
						chrome.runtime.sendMessage(
								{
									action: 'facebookAuthenticate'
								},
								function (response){ }
						);
						setTimeout(function (){
							window.close();
						}, 250);
					};
					$('liveUpdatesEnabledWrapper').style.display='none';
					$('forceRefreshData').style.display='none';
					$('deleteAllStickys').style.display='none';
				}
			}
	);
	makeTabs();
	createToolbar();
	populateDefaultSettings();
	reloadStickys();
	//last thig to call
	translatePage();

	//let's focus to the correct tab
	if(focusTab!==false){
		let el=$('popupTab'+focusTab+'Link');
		if(!el){
			el=$('popupTabMyNotesLink');
		}
		if(el){
			el.click();
		}
	}

	//attach events to export and import
	$('exportStickys').onclick=function (e){
		getData({}, function (data){
			var stickys=JSON.parse(data);
			var finalStickys={};
			for(var i in stickys){
				var sticky=stickys[i];
				delete(sticky.id);
				if(sticky.extras){
					if(sticky.extras.channels){
						delete(sticky.extras.channels);
					}
					if(sticky.extras.shares){
						delete(sticky.extras.shares);
					}
				}
				finalStickys[i]=sticky;
			}
			var finalData={
				'v': chrome.runtime.getManifest().version,
				'stickys': finalStickys
			};
			saveAsFile(finalData, 'OurStickys.json');
		});
	};
	$('importStickys').onclick=function (e){
		// creating input on-the-fly
		var input=createElement('input', {
			type: 'file',
			accept: '.json'
		});
		input.onchange=function (evt){
			var files=evt.target.files; // FileList object
			// use the 1st file from the list
			var f=files[0];
			var reader=new FileReader();
			// Closure to capture the file information.
			reader.onload=(function (theFile){
				return function (e){
					try{
						var impData=JSON.parse(e.target.result);
						if(impData&&impData.v&&impData.stickys){
							__background.saveStickys(impData.stickys, function (){
								reloadStickys();
								sendReloadNotes();
							});
						}else{
							alert(i18n('popupCannotImportWrongFile'));
						}
					}catch(err){
						alert(i18n('popupCannotImportWrongFile'));
					}
				};
			})(f);

			// Read in the image file as a data URL.
			reader.readAsText(f);
		};
		// add onchange handler if you wish to get the file :)
		input.click(); // opening dialog
		return false; // avoiding navigation
	};
	$('deleteAllStickys').onclick=function (e){
		__confirm(
				i18n('popupSettingDeleteAllStickysQuestion'),
				function (){
					__background.deleteAllSticky(function (){
						sendReloadNotes(false, {
							force: true
						}, reloadStickys);
					});
				}
		);
	};
});
function reloadStickys(){
	loadStickys(false);	//no shared
	loadStickys(true);	//shared
	populateChannels();
}
function loadStickys(loadShared, keyNotes){
	//set variables
	var getFunction, ulId, found_notes_id, no_found_notes_id, tab_header_id;
	if(!loadShared){
		ulId='notes';
		getFunction=getData;
		found_notes_id='found_notes';
		no_found_notes_id='no_found_notes';
		tab_header_id='popupTabMyNotesLink';
	}else{
		ulId='shared_notes';
		getFunction=getShares;
		found_notes_id='found_shared_notes';
		no_found_notes_id='no_found_shared_notes';
		tab_header_id='popupTabSharedNotesLink';
	}
	//if I need to load shares, then I will need to load also the channels stickys and use those
	populateStickyList(loadShared, keyNotes, ulId, getFunction, found_notes_id, no_found_notes_id, tab_header_id);
}
function populateStickyList(loadShared, keyNotes, ulId, getFunction, found_notes_id, no_found_notes_id, tab_header_id){
	sendMessage({
		'action': 'getShowingChannels'
	}, function (selectedChannels){
		//selectedChannels:
		// false:  all selected
		// channel_id: non existent:  selected
		// channel_id: boolean
		var extras={
			selectedChannels: selectedChannels
		};
		var root_ul=$(ulId).empty();
		getFunction({}, function (data){
			var myNotes=JSON.parse(data);
			$(tab_header_id)
					.data({
						'cnt': Object.keys(myNotes).length
					})
					.empty()
					.appendChild(document.createTextNode(i18n($(tab_header_id).dataset.langmessage, Object.keys(myNotes).length.toString())));
			if(myNotes&&Object.keys(myNotes).length>0){
				//let's hide all the notes that are part of a hidden channel
				var t=myNotes;
				for(var i in t){
					if(myNotes[i].extras.channels&&myNotes[i].extras.channels.length>0){
						var channels=myNotes[i].extras.channels;
						var show=false;
						for(var k in channels){
							if(typeof extras['selectedChannels']==='undefined'||typeof extras['selectedChannels'][channels[k].id]==='undefined'||extras['selectedChannels'][channels[k].id]===true){
								show=true;
								break;
							}
						}
						if(!show){
							delete(myNotes[i]);
						}
					}
				}
				//let's sort them by page
				myNotes=sortStickys(myNotes, keyNotes);
				$(found_notes_id).style.display="block";
				$(no_found_notes_id).style.display="none";
				var pages=Object.keys(myNotes);
				pages.sort();
				for(var p in pages){
					var toAppend=[];
					for(var i in myNotes[pages[p]]){
						let myNote=myNotes[pages[p]][i];
						let text=myNote.text;
						let key_note=myNote.key;
						let toAppendWrapper=[];
						//delete image
						let imageDelete=createElement("img", {
							id: "__myNoteDelete_"+key_note,
							title: i18n('noteDelete'),
							src: chrome.extension.getURL('/img/delete.gif'),
							className: "__myNoteDeleteIcon",
							ondragstart: function (){
								return false;
							},
							dataset: {
								keyNote: key_note,
								isShare: loadShared?1:0
							},
							onclick: function (e){
								stopEvent(e);
								var key_note=this.dataset.keyNote;
								var is_shared=(parseInt(this.dataset.isShare, 10)===1);
								__confirm(
										i18n(is_shared?"questionDeleteSharedNote":"questionDeleteNote"),
										function (){
											if(is_shared){
												__background.deleteShared(key_note, function (){});
											}else{
												__background.deleteSticky(key_note, function (){});
											}
											let tab_header_id=$('__MyNote'+key_note).data('tab_header_id');
											$('__MyNote'+key_note).remove();
											sendReloadNotes();
											let old_cnt=parseInt($(tab_header_id).data('cnt'), 10);
											let content=i18n($(tab_header_id).dataset.langmessage, (old_cnt-1).toString());
											$(tab_header_id).empty().appendChild(document.createTextNode(content));
//											reloadStickys();
										});
							}
						});
						toAppendWrapper.push(imageDelete);
						//copy to current tab image
						if(!loadShared){
							let imageCopyToPage=createElement("img", {
								id: "__myNoteToThisPage_"+key_note,
								title: i18n('popupMyStickyToThisPage'),
								src: chrome.extension.getURL("/img/download.gif"),
								className: "__myNoteToThisPage",
								ondragstart: function (){
									return false;
								},
								dataset: {
									keyNote: key_note,
									isShare: loadShared?1:0
								},
								onclick: function (e){
									stopEvent(e);
									var key_note=this.dataset.keyNote;
									sendMessage(
											{
												action: 'copyToCurrentTab',
												key: key_note
											},
											function (response){
												if(response){
													reloadStickys();
												}
											}
									);

								}
							});
							toAppendWrapper.push(imageCopyToPage);
						}
						//title
						var title=createElement('span', {
							appendChild: document.createTextNode(truncateString(text, 40)),
							className: 'title'
						});
						//date
						if(myNote.extras['date_added']){
							var d=new Date(parseInt(myNote.extras['date_added'], 10));
							title.appendChild(createElement('span', {
								appendChild: document.createTextNode(d.toLocaleDateString()),
								className: 'date'
							}));
						}
						toAppendWrapper.push(title);
						//channels
						if(myNote.extras.channels&&myNote.extras.channels.length>0){
							//there are channels, let's display them
							var channel_text=[];
							for(var k in myNote.extras.channels){
								channel_text.push(myNote.extras.channels[k].name);
							}
							toAppendWrapper.push(createElement('span', {
								appendChildren: [
									createElement('img', {
										src: '/img/channel.png',
										className: 'sticky_channel_icon'
									}),
									document.createTextNode(truncateString(channel_text.join(', '), 40))
								],
								className: 'sticky_channel_list'
							}));
						}
						toAppend.push(createElement('span', {
							id: '__MyNote'+key_note,
							dataset: {
								tab_header_id: tab_header_id
							},
							appendChildren: toAppendWrapper
						}));
						collectTags(myNote.extras.tags, key_note);
					}
					//url
					toAppend.push(createElement('span', {
						appendChild: document.createTextNode(truncateString(pages[p], 55, 'middle')),
						className: 'url'
					}));
					root_ul.appendChild(createElement('li', {
						dataset: {
							url: pages[p]
						},
						appendChildren: toAppend,
						onclick: function (e){
							//find if this URL is already open, and if it is, just focus to it
							var clicked_li=this;
							chrome.tabs.query(
									{
										url: this.dataset.url.split('#')[0]	//without the # sign
									},
									function (tabs){
										var found=false;
										if(tabs.length>0){
											//found something
											for(var i in tabs){
												//is the URL correct? have to check the hash sign for it
												if(tabs[i].url===clicked_li.dataset.url){
													found=tabs[i];
													break;
												}
											}
										}
										if(found===false){
											chrome.tabs.create({
												url: clicked_li.dataset.url
											});
										}else{
											var windowId=found.windowId;
											var tabId=found.id;
											chrome.tabs.update(tabId, {
												active: true
											}, function (){
												chrome.windows.update(windowId, {
													focused: true
												});
											});
										}
										if(!focusTab){
											window.close();
										}
									}
							);
						}
					}));
				}
				updateTags();
			}else{
				$(found_notes_id).style.display="none";
				$(no_found_notes_id).style.display="block";
			}
		});
	});
}
function makeTabs(){
	var selector='.tabs';
	var tab_lists_anchors=document.querySelectorAll(selector+" ul:first-child li a");
	var divs=document.querySelector(selector).getElementsByClassName('tab-content');// .getElementsByTagName("div");
	for(var i=0; i<tab_lists_anchors.length; i++){
		if(tab_lists_anchors[i].classList.contains('active')){
			divs[i].style.display="block";
		}
	}
	for(i=0; i<tab_lists_anchors.length; i++){
		document.querySelectorAll(".tabs ul:first-child li a")[i].addEventListener('click', function (e){
			for(i=0; i<divs.length; i++){
				divs[i].style.display="none";
			}
			for(i=0; i<tab_lists_anchors.length; i++){
				tab_lists_anchors[i].classList.remove("active");
			}
			var clicked_tab=e.target||e.srcElement;
			clicked_tab.classList.add('active');
			var div_to_show=clicked_tab.getAttribute('href');
			document.querySelector(div_to_show).style.display="block";
		});
	}
}
function translatePage(){
	var objects=document.getElementsByTagName('*'), i;
	for(i=0; i<objects.length; i++){
		if(objects[i].dataset&&objects[i].dataset.langmessage){
			$(objects[i]).empty().appendChild(document.createTextNode(i18n(objects[i].dataset.langmessage)));
		}
	}
}
function createToolbar(){
	var hide_all=$('hide_all').attr({
		title: i18n('popupHideAllNotes'),
		onclick: function (){
			var show_all=$('show_all');
			show_all.style.display="inline";
			this.style.display="none";
			sendMessage(
					{
						action: 'hideShowAll',
						show: false
					},
					function (response){
					}
			);
		}
	});
	var show_all=$('show_all').attr({
		title: i18n('popupShowAllNotes'),
		onclick: function (){
			var hide_all=$('hide_all');
			hide_all.style.display="inline";
			this.style.display="none";
			sendMessage(
					{
						action: 'hideShowAll',
						show: true
					},
					function (response){
					}
			);
		}
	});
	$('add_new').attr({
		title: i18n('popupAddNote'),
		onclick: function (){
			createStickyBackground(function (){
				if(focusTab){
					//refresh the stickys
					if(refreshStickyTimeout){
						clearTimeout(refreshStickyTimeout);
					}
					refreshStickyTimeout=setTimeout(function (){
						loadStickys(false);
					}, 1000);
				}else{
					window.close();
				}
			});
		}
	});

	sendMessage(
			{
				action: 'isShowingNotes'
			},
			function (isShowingNotes){
				if(isShowingNotes){
					show_all.style.display='none';
				}else{
					hide_all.style.display='none';
				}
			}
	);

}
function _sendMessageToTabs(message, callback){
	chrome.tabs.query({}, function (tabs){
		for(var i=0; i<tabs.length; ++i){
			sendTabsMessage(tabs[i].id, message, function (response){
				if(typeof callback==='function'){
					callback(response);
				}
			});
		}
	});
}
//sorting by page displayed
function sortStickys(stickys, keyNotes){
	if(typeof keyNotes==='undefined'){
		keyNotes=false;
	}
	var ret={};
	for(var i in stickys){
		var sticky=stickys[i];
		var page=sticky.page;
		var key_note=sticky.key;
		if(keyNotes===false||keyNotes.indexOf(key_note)>-1){
			if(typeof ret[page]==='undefined'){
				ret[page]={};
			}
			ret[page][i]=sticky;
		}
	}
	return ret;
}
function populateDefaultSettings(){
	//theme
	var theme_wrapper=$('__myNoteThemesContainer');
	for(var i=1; i<=numThemes; i++){
		var theme_num=((100+i).toString().substr(1, 2));
		theme_wrapper.appendChild(createElement('div', {
			className: "__myNoteThemePreview __myNoteThemePreview_"+theme_num,
			id: "__myNoteThemePreview_"+theme_num,
			dataset: {
				theme: theme_num
			},
			onclick: function (e){
				var val_to_set=this.dataset.theme;
				var elem=document.getElementsByClassName("__myNoteThemePreviewActive");
				if(this.classList.contains("__myNoteThemePreviewActive")){
					val_to_set="";
				}
				for(var i=0; i<elem.length; i++){
					elem[i].className=elem[i].className.replace(/\b\s*__myNoteThemePreviewActive\b/g, '');
				}
				if(val_to_set!==''){
					this.className+=" __myNoteThemePreviewActive";
				}
				sendMessage(
						{
							action: 'setDefaultSettings',
							key: 'theme',
							value: val_to_set,
							url: document.location.href
						},
						function (ret){
						}
				);
			}
		}));
	}

	var info_wrapper=$('__myNoteInfoContainer');

	//Show Shadow
	var showShadows=createElement('input', {
		id: 'showShadows',
		className: '__myNoteshowShadows',
		onclick: function (e){
			var val_to_set=!!(this.checked);
			sendMessage(
					{
						action: 'setDefaultSettings',
						key: 'showShadows',
						value: val_to_set,
						url: document.location.href
					},
					function (ret){
					}
			);
		},
		type: 'checkbox'
	})
	info_wrapper.appendChild(createElement('label', {
		innerHTML: i18n('popupSettingShowShadow'),
		className: '__myNoteShowShadowsLabel',
		appendChild: showShadows
	}));

	//font-size
	var font_size=createElement('select', {
		id: '__myNoteSettingsFontSize',
		className: '__myNoteSettingsFontSize',
		onchange: function (e){
			sendMessage(
					{
						action: 'setDefaultSettings',
						key: 'fontSize',
						value: this.value,
						url: document.location.href
					},
					function (ret){
					}
			);
		}
	})
			.addOption({
				value: 12,
				text: i18n('settingsFontSizeSmall')
			})
			.addOption({
				value: 14,
				text: i18n('settingsFontSizeMedium')
			})
			.addOption({
				value: 16,
				text: i18n('settingsFontSizeLarge')
			})
			.addOption({
				value: 18,
				text: i18n('settingsFontSizeXLarge')
			});
	info_wrapper.appendChild(createElement('label', {
		innerHTML: i18n('settingsFontSizeLabel'),
		className: '__myNoteSettingsFontSizeLabel',
		appendChild: font_size
	}));

	//sticky level:
	var sticky_level=createElement('select', {
		id: '__myNoteSettingsStickyLevel',
		className: '__myNoteSettingsStickyLevel',
		onchange: function (e){
			sendMessage(
					{
						action: 'setDefaultSettings',
						key: 'stickyLevel',
						value: this.value,
						url: document.location.href
					},
					function (ret){
					}
			);
		}
	})
			.addOption({
				value: "query",
				text: i18n('settingsStickToPageExact')
			})
			.addOption({
				value: "queryFuzzy",
				text: i18n('settingsStickToPageFuzzy')
			})
			.addOption({
				value: "path",
				text: i18n('settingsStickToPath')
			})
			.addOption({
				value: "domain",
				text: i18n('settingsStickToDomain')
			})
			.addOption({
				value: "everyTab",
				text: i18n('settingsStickToEveryTab')
			});

	info_wrapper.appendChild(createElement('label', {
		innerHTML: i18n('settingsStickToLabel'),
		className: '__myNoteSettingsStickyLevelLabel',
		appendChild: sticky_level
	}));

	//Expires in:
	var expires=createElement('select', {
		id: '__myNoteSettingsExpires',
		className: '__myNoteSettingsExpires',
		onchange: function (e){
			sendMessage(
					{
						action: 'setDefaultSettings',
						key: 'expires',
						value: this.value,
						url: document.location.href
					},
					function (ret){
					}
			);
		}
	})
			.addOption({
				value: "0",
				text: i18n('settingsExpiresNever')
			})
			.addOption({
				value: "1",
				text: i18n('settingsExpires1Day')
			})
			.addOption({
				value: "7",
				text: i18n('settingsExpires7Days')
			})
			.addOption({
				value: "30",
				text: i18n('settingsExpires30Days')
			});

	info_wrapper.appendChild(createElement('label', {
		innerHTML: i18n('settingsExpiresLabel'),
		className: '__myNoteSettingsExpiresLabel',
		appendChild: expires
	}));

	//Advanced Featured
	$('advancedFeaturedEnabled').onclick=function (e){
		var val_to_set=!!(this.checked);
		sendMessage(
				{
					action: 'setDefaultSettings',
					key: 'advancedFeaturedEnabled',
					value: val_to_set,
					url: document.location.href
				},
				function (ret){
				}
		);
	};
	//Live Updates
	$('liveUpdatesEnabled').onclick=function (e){
		var val_to_set=!!(this.checked);
		sendMessage(
				{
					action: 'setDefaultSettings',
					key: 'liveUpdatesEnabled',
					value: val_to_set,
					url: document.location.href
				},
				function (ret){
				}
		);
	};
	$('forceRefreshData').onclick=function (e){
		sendReloadNotes(false, {
			force: true
		}, reloadStickys);
	};


	sendMessage(
			{
				action: 'getDefaultSettings',
				url: document.location.href
			},
			function (ret){
				//theme
				if(ret.theme){
					$("__myNoteThemePreview_"+ret.theme).className+=" __myNoteThemePreviewActive";
				}
				//font-size
				if(!ret.fontSize){
					ret.fontSize="12";
				}
				$("__myNoteSettingsFontSize").value=ret.fontSize.toString();
				//sticky Level
				if(!ret.stickyLevel){
					ret.stickyLevel="query";
				}
				$("__myNoteSettingsStickyLevel").value=ret.stickyLevel.toString();
				//Expires
				if(!ret.expires){
					ret.expires="0";
				}
				$("__myNoteSettingsExpires").value=ret.expires.toString();
				//Show Shadow
				$("showShadows").checked=typeof ret.showShadows==='undefined'|!!ret.showShadows;
				//Advanced Featured
				$("advancedFeaturedEnabled").checked=!!ret.advancedFeaturedEnabled;
				//Live Events
				//enabled by default
				//$("liveUpdatesEnabled").checked=typeof ret.liveUpdatesEnabled==='undefined'||ret.liveUpdatesEnabled;
				//disabled by default
				$("liveUpdatesEnabled").checked=ret.liveUpdatesEnabled;
			}
	);

}
var collectedTags={};
function collectTags(tags, key_note){
	for(var i in tags){
		var tag=tags[i];
		tag.tag=tag.tag.toLowerCase();
		if(!collectedTags[tag.tag]){
			collectedTags[tag.tag]={
				id: tag.id,
				keyNotes: [key_note]
			};
		}else{
			collectedTags[tag.tag].keyNotes.push(key_note);
		}
	}
}
function updateTags(){
	//maybe sort the elements before showing them
	var elem=$('tag_search_list');
	for(var tag in collectedTags){
		var id='tag_'+collectedTags[tag].id;
		var k=$(id);
		if(!k){
			elem.appendChild(createElement('option', {
				id: id,
				value: tag.toLowerCase(),
				innerHTML: collectedTags[tag].keyNotes.length
			}));
		}
	}
}
function populateChannels(){
	$('channels_open_create').onclick=function (e){
		var e=$('channels_create');
		if(e.style.display!=='block'){
			e.style.display='block';
			$('channels_create_input').focus();
			$('channels_subscribe').style.display='none';
			$('channels_rename').style.display='none';
		}else if(e.style.display==='block'){
			e.style.display='none';
		}
	};
	$('channels_open_subscribe').onclick=function (e){
		var e=$('channels_subscribe');
		if(e.style.display!=='block'){
			e.style.display='block';
			$('channels_subscribe_input').focus();
			$('channels_create').style.display='none';
			$('channels_rename').style.display='none';
		}else if(e.style.display==='block'){
			e.style.display='none';
		}
	};
	//CREATE NEW
	$('channels_create_button').onclick=function (){
		var name=$('channels_create_input').value;
		if(name.trim()!==''){
			var channel={
				name: name.trim()
			};
			saveChannel(channel, function (response){
				if(typeof response.info!=='undefined'){
					$('channels_create_input').value='';
					$('channels_create').style.display='none';
					loadChannels({
						force: true
					});
				}else{
					alert(i18n('popupChannelsCreateNameError'));
				}
			});
		}
	};

	//RENAME
	$('channels_rename_input').onkeyup=function (e){
		$('channels_rename_button').disabled=($('channels_rename').dataset.value===this.value);
	};
	$('channels_rename_button').onclick=function (e){
		var name=$('channels_rename_input').value;
		if(name.trim()!==''){
			var channel={
				id: $('channels_rename').dataset.id,
				code: $('channels_rename').dataset.code,
				name: name.trim()
			};
			renameChannel(channel, function (response){
				if(typeof response.status!=='undefined'&&response.status==='success'){
					$('channels_rename_input').value='';
					$('channels_rename').style.display='none';
					loadChannels({
						force: true
					});
				}else{
					alert(i18n('popupChannelsCreateNameError'));
				}
			});
		}
	};

	//SUBSCRIBE
	$('channels_subscribe_button').onclick=function (){
		var code=$('channels_subscribe_input').value;
		var patt=/^[0-9a-z]{5,}$/ig;
		if(code.trim()!==''&&patt.test(code.trim())){
			sendMessage(
					{
						action: 'searchChannel',
						code: code.trim()
					},
					function (response){
						if(typeof response.channel==='undefined'){
							alert(i18n('popupChannelsNotFound'));
						}else{
							$('channels_subscribe_input').value='';
							$('channels_subscribe').style.display='none';
							sendMessage(
									{
										action: 'subscribeChannel',
										channel_id: response.channel.id
									},
									function (t){
										//update the show/hide part
										updateShowingChannel(response.channel.id, true, function (){
											//load the channel if it wasn't already loaded
											sendMessage({
												action: 'getChannelStickys',
												channel_id: response.channel.id
											}, function (t){
												sendLoadNotes();
											});
											loadChannels({
												force: true
											});
										});
									}
							);
						}
					}
			);
		}else{
			alert(i18n('popupChannelsNotFound'));
		}
	};
	loadChannels();
}
function loadChannels(options){
	var root_ul=$('channels_list').empty();
	if(typeof options==='undefined'){
		options={};
	}
	getChannels(options, function (data){
		var channels=JSON.parse(data);
		if(channels.length){
			root_ul.dataset.channelsLength=channels.length;
			let content=i18n($('popupTabChannelsLink').dataset.langmessage, channels.length.toString());
			$('popupTabChannelsLink').empty().appendChild(document.createTextNode(content));
			if(channels.length>0){
				sendMessage({
					'action': 'getShowingChannels'
				}, function (selectedChannels){
					//selectedChannels:
					// false:  all selected
					// channel_id: non existent:  selected
					// channel_id: boolean
					for(var i in channels){
						var channel=channels[i];
						var toAppendLi=[];
						//title
						var toAppendTitle=[];
						//checkbox - inside title
						selectedChannels[channel.id]=(typeof selectedChannels[channel.id]==='undefined'||selectedChannels[channel.id]===true);
						toAppendTitle.push(createElement('input', {
							checked: selectedChannels[channel.id],
							dataset: {
								channelId: channel.id
							},
							type: "checkbox",
							onclick: function (e){
								var channel_id=this.dataset.channelId;
								var isChecked=this.checked;
								updateShowingChannel(channel_id, isChecked, function (){
									loadStickys(false);
									loadStickys(true);
									if(isChecked){
										//load the channel if it wasn't already loaded
										sendMessage({
											action: 'getChannelStickys',
											channel_id: channel_id
										}, function (t){
											sendLoadNotes();
										});
									}else{
										sendHideNotesByChannels();
									}
								});
							}
						}));
						//text itself
						toAppendTitle.push(document.createTextNode(truncateString(channel.name, 40)));
						//ability to delete the channel
						toAppendTitle.push(createElement('img', {
							id: "__myChannelDelete_"+channel.id,
							title: i18n('popupChannelDelete'),
							src: chrome.extension.getURL('/img/delete.gif'),
							className: "deleteChannelIcon",
							ondragstart: function (){
								return false;
							},
							dataset: {
								owner: channel.owner?'1':'0',
								channelId: channel.id
							},
							onclick: function (e){
								stopEvent(e);
								// e.preventDefault();
								var isOwner=(parseInt(this.dataset.owner, 10)===1);
								__confirm(
										i18n(isOwner?"popupChannelsOwnerDeleteQuestion":"popupChannelsDeleteQuestion"),
										function (){
											var channel_id=this.dataset.channelId;
											//update the show/hide part
											updateShowingChannel(channel_id, undefined, function (){
												if(isOwner){
													//delete the channel
													sendMessage({
														action: 'deleteChannel',
														channel_id: channel_id
													}, function (response){
														//if I am the owner of the channel I should show all the notes
														sendReloadNotes();
													});
												}else{
													//unsubscribe
													sendMessage({
														action: 'unsubscribeChannel',
														channel_id: channel_id
													}, function (response){
														sendHideNotesByChannels();
													});
												}
											});
											//delete the channel from the list
											$('channel-'+channel_id).remove();
											$('channels_list').dataset.channelsLength=parseInt($('channels_list').dataset.channelsLength, 10)-1;
											let content=i18n($('popupTabChannelsLink').dataset.langmessage, $('channels_list').dataset.channelsLength);
											$('popupTabChannelsLink').empty().appendChild(document.createTextNode(content));
										}
								);
							}
						}));
						//is this the owner
						if(channel.owner){
							toAppendTitle.push(createElement('img', {
								src: "/img/edit.png",
								className: "editChannelIcon",
								dataset: {
									id: channel.id,
									code: channel.code,
									name: channel.name
								},
								onclick: function (e){
									e.preventDefault();
									var e=$('channels_rename');
									if(e.style.display!=='block'||e.dataset.code!==this.dataset.code){
										e.attr({
											dataset: {
												id: this.dataset.id,
												code: this.dataset.code,
												value: this.dataset.name
											},
											style: {
												display: 'block'
											}
										}).focus();
										$('channels_rename_input').value=this.dataset.name;
										$('channels_rename_button').disabled=true;
										$('channels_subscribe').style.display='none';
										$('channels_create').style.display='none';
									}else if(e.style.display==='block'){
										e.style.display='none';
									}
								}
							}));
							toAppendTitle.push(createElement('img', {
								src: "/img/owner.png",
								className: "channelOwnerIcon"
							}));
						}
						toAppendLi.push(createElement('label', {
							className: 'title',
							appendChildren: toAppendTitle
						}));

						//user and stickys
						var txt='';
						if(channel.users===1){
							txt+=i18n('popupChannelsUser');
						}else{
							txt+=i18n('popupChannelsUsers', channel.users.toString());
						}
						txt+=', ';
						if(channel.stickys===1){
							txt+=i18n('popupChannelsSticky');
						}else{
							txt+=i18n('popupChannelsStickys', channel.stickys.toString());
						}
						toAppendLi.push(createElement('span', {
							className: 'user_sticky',
							appendChildren: [
								//test first
								document.createTextNode(txt),
								//code
								createElement('span', {
									appendChild: document.createTextNode(i18n('popupChannelsCode', channel.code)),
									className: 'code',
									dataset: {
										code: channel.code
									},
									title: i18n('popupChannelsCodeClickToCopy'),
									onclick: function (e){
										stopEvent(e);
										copyTextToClipboard(this.dataset.code);
										alert(i18n('popupChannelsCodeCopiedClipboard', this.dataset.code));
									}
								})
							]
						}));

						root_ul.appendChild(createElement('li', {
							id: 'channel-'+channel.id,
							dataset: {
								channelId: channel.id
							},
							appendChildren: toAppendLi
						}));
					}
					sendMessage({
						action: 'setShowingChannels',
						show: selectedChannels
					}, function (){ });
				});
			}
		}else{
			let content=i18n($('popupTabChannelsLink').dataset.langmessage, '0');
			$('popupTabChannelsLink').empty().appendChild(document.createTextNode(content));

		}
	});
}
function updateShowingChannel(channel_id, visible, callback){
	sendMessage({
		action: 'getShowingChannels'
	}, function (selectedChannels){
		selectedChannels[channel_id]=visible;
		if(typeof visible==='undefined'){
			delete(selectedChannels[channel_id])
		}
		sendMessage({
			action: 'setShowingChannels',
			show: selectedChannels
		}, function (){
			callback();
		});
	});
}