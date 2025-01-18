'use strict';
var __settings={
	window: null,
	subs: {},
	getWindow: function (){
		return this.window;
	},
	create: function (key_note, tab){
		if(this.window===null){
			//settings
			this.window=createElement('div', {
				className: '__myNoteSettingsWrapper',
				style: {
					width: '200px',
					height: '250px'
				}
			});

			this._createToolBar();
			__mainWrapper.get().appendChild(this.window);
		}
		this.window.attr({
			data: {
				keyNote: key_note
			},
			style: {
				display: 'block'
			}
		});

		//select the settings for this note
		var text=$("__myNoteText_"+key_note);
		var is_share=(parseInt(text.dataset.isShare, 10)===1);
		var is_channel=(parseInt(text.dataset.isChannel, 10)===1);

		$('__myNoteSettingsToolbar').data({
			keyNote: key_note
		});
		//settings up icons
		$("__myNoteSettingsInfoButton").style.background='url("'+chrome.extension.getURL('/img/info.png')+'") no-repeat center';
		$("__myNoteSettingsTagButton").style.background='url("'+chrome.extension.getURL('/img/tag.png')+'") no-repeat center';
		$("__myNoteSettingsThemeButton").style.background='url("'+chrome.extension.getURL('/img/themes.png')+'") no-repeat center';
		$("__myNoteSettingsCloseButton").style.background='url("'+chrome.extension.getURL('/img/close.png')+'") no-repeat center';
		$("__myNoteSettingsShareButton").style.background='url("'+chrome.extension.getURL('/img/share.png')+'") no-repeat center';
		$("__myNoteSettingsChannelButton").style.background='url("'+chrome.extension.getURL('/img/channel.png')+'") no-repeat center';
		$("__myNoteSettingsPasswordButton").style.background='url("'+chrome.extension.getURL('/img/lock.png')+'") no-repeat center';

		var has_password=parseInt(text.data('hasPassword'), 10)===1;
		var unlocked=text.data('unlocked');
		if(is_share||is_channel||(has_password&&(typeof unlocked==='undefined'||!!unlocked!==true))){
			$("__myNoteSettingsShareButton").style.display='none';
			$("__myNoteSettingsChannelButton").style.display='none';
			$("__myNoteSettingsPasswordButton").style.display='none';
		}else{
			sendMessage(
					{
						action: 'isAuthenticated',
						url: document.location.href
					},
					function (response){
						if(response){
							$("__myNoteSettingsShareButton").style.display='block';
							$("__myNoteSettingsChannelButton").style.display='block';
							//hide the advance features
							sendMessage(
									{
										action: 'getDefaultSettings',
										url: document.location.href
									},
									function (ret){
										//Advanced Featured
										if(!!ret.advancedFeaturedEnabled){
											//enabled
											$("__myNoteSettingsPasswordButton").style.display='block';
										}else{
											//disabled
											$("__myNoteSettingsPasswordButton").style.display='none';
										}
									}
							);
						}else{
							$("__myNoteSettingsShareButton").style.display='none';
							$("__myNoteSettingsChannelButton").style.display='none';
							$("__myNoteSettingsPasswordButton").style.display='none';
						}
					}
			);
		}
		//position the div
		this.reposition();
		if(typeof tab==='undefined'){
			tab='info';
		}
		switch(tab){
			case 'info':
				createInfo(key_note);
				break;
			case 'tags':
				createTags(key_note);
				break;
		}
	},
	hide: function (key_note){
		var force_hide=(typeof key_note==='undefined');
		var ret=false;
		if(this.window!==null&&(force_hide||key_note===this.window.data('keyNote'))){
			this.window.attr({
				data: {
					keyNote: ''
				},
				style: {
					display: 'none'
				}
			});
			ret=true;
		}
		return ret;
	},
	reposition: function (){
		if(this.window!==null&&this.window.style.display!=='none'&&this.window.dataset.keyNote!==""){
			var note=$("__myNote_"+this.window.dataset.keyNote);
			this.window.style.top=parseInt(note.style.top, 10)+'px';
			var window_width=parseInt(this.window.style.width, 10);
			var note_left=parseInt(note.style.left, 10);
			if(note_left-window_width>0){
				this.window.style.left=(note_left-window_width)+'px';
			}else{
				var note_width=parseInt(note.style.width, 10);
				this.window.style.left=(note_left+note_width)+'px';
			}
			this.window.style.zIndex=note.style.zIndex;
			var text=$("__myNoteText_"+this.window.dataset.keyNote);
			var is_pinned=parseInt(text.dataset.pinned, 10)===1;
			this.window.style.position=is_pinned?'fixed':'absolute';
		}
		return this;
	},
	hideSubs: function (){
		//to rewrite with the subs array
		var elem=document.getElementsByClassName('__myNotesSettingSub');
		var elength=elem.length;
		for(var i=0; i<elength; i++){
			elem[i].style.display="none";
		}
		return this;
	},
	_createToolBar: function (){
		var toAppend=[];
		//toolbar

		//info
		toAppend.push(createElement('div', {
			title: i18n('settingsInfoButton'),
			className: '__myNoteSettingsInfoButton',
			id: '__myNoteSettingsInfoButton',
			onclick: function (e){
				var key_note=$('__myNoteSettingsToolbar').dataset.keyNote;
				createInfo(key_note);
			}
		}));

		//channels
		toAppend.push(createElement('div', {
			title: i18n('settingsChannelButton'),
			className: '__myNoteSettingsChannelButton',
			id: '__myNoteSettingsChannelButton',
			onclick: function (e){
				var key_note=$('__myNoteSettingsToolbar').dataset.keyNote;
				createChannels(key_note);
			}
		}));

		//sharing
		toAppend.push(createElement('div', {
			title: i18n('settingsShareButton'),
			className: '__myNoteSettingsShareButton',
			id: '__myNoteSettingsShareButton',
			onclick: function (e){
				var key_note=$('__myNoteSettingsToolbar').dataset.keyNote;
				createShares(key_note);
			}
		}));

		//tagging
		toAppend.push(createElement('div', {
			title: i18n('settingsTagButton'),
			className: '__myNoteSettingsTagButton',
			id: '__myNoteSettingsTagButton',
			onclick: function (e){
				var key_note=$('__myNoteSettingsToolbar').dataset.keyNote;
				createTags(key_note);
			}
		}));

		//themes
		toAppend.push(createElement('div', {
			title: i18n('settingsThemeButton'),
			className: '__myNoteSettingsThemeButton',
			id: '__myNoteSettingsThemeButton',
			onclick: function (e){
				var key_note=$('__myNoteSettingsToolbar').dataset.keyNote;
				createThemes(key_note);
			}
		}));

		//password
		toAppend.push(createElement('div', {
			title: i18n('settingsPasswordButton'),
			className: '__myNoteSettingsPasswordButton',
			id: '__myNoteSettingsPasswordButton',
			onclick: function (e){
				var key_note=$('__myNoteSettingsToolbar').dataset.keyNote;
				createPassword(key_note);
			}
		}));

		//close
		toAppend.push(createElement('div', {
			title: i18n('settingsCloseButton'),
			className: '__myNoteSettingsCloseButton',
			id: '__myNoteSettingsCloseButton',
			onclick: function (e){
				var key_note=$('__myNoteSettingsToolbar').dataset.keyNote;
				__settings.hide(key_note);
			}
		}));

		this.window.appendChild(createElement('div', {
			id: '__myNoteSettingsToolbar',
			className: '__myNoteSettingsToolbar',
			appendChildren: toAppend
		}));
	}
};