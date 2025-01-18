function createThemes(key_note){
	__settings.hideSubs();
	if(__settings.getWindow()!==null&&__settings.getWindow().style.display!=='none'&&__settings.getWindow().dataset.keyNote===key_note){
		var thisWindow=$('__myNotesSettingThemes');
		if(!thisWindow){
			//let's ceate the necessary div :-)
			//window
			thisWindow=document.createElement('div');
			thisWindow.id="__myNotesSettingThemes";
			thisWindow.className='__myNotesSettingSub __myNoteSettingSubWrapper';
			thisWindow.style.width=__settings.getWindow().style.width;
			thisWindow.style.height=(parseInt(__settings.getWindow().style.height, 10)-15)+"px";
			//title
			var para=document.createElement("p");
			var node=document.createTextNode(i18n("themeTitle"));
			para.appendChild(node);
			para.className='__myNotesSettingSubTitle';
			thisWindow.appendChild(para);
			//other
			var themesContainer=document.createElement('div');
			themesContainer.id="__myNoteThemesContainer";
			thisWindow.appendChild(themesContainer);
			//themes
			for(var i=1; i<=numThemes; i++){
				var theme=document.createElement('div');
				var theme_num=((100+i).toString().substr(1, 2));
				theme.className='__myNoteThemePreview __myNoteThemePreview_'+theme_num;
				theme.id="__myNoteThemePreview_"+theme_num;
				theme.dataset.theme=theme_num;
				theme.onclick=function (e){
					var key_note=__settings.getWindow().dataset.keyNote;
					var theme_num=this.dataset.theme;
					var note=$("__myNote_"+key_note);
					var text=$("__myNoteText_"+key_note);
					text.dataset.theme=theme_num;
					note.className=note.className.replace(/\b\s*__myNoteTheme_\d\d\b/, "");
					note.classList.add("__myNoteTheme_"+theme_num);
					//update the selected one
					var elem=document.getElementsByClassName("__myNoteThemePreviewActive");
					for(var i=0; i<elem.length; i++){
						elem[i].classList.remove('__myNoteThemePreviewActive');
					}
					this.classList.add('__myNoteThemePreviewActive');
					//let's save it
					readyToSave(key_note);
				};
				themesContainer.appendChild(theme);
			}
			//Show Shadow
			var showShadows=createElement('input', {
				id: 'showShadows',
				className: '__myNoteshowShadows',
				onclick: function (e){
					var val_to_set=!!(this.checked);
					var key_note=__settings.getWindow().dataset.keyNote;
					var theme_num=this.dataset.theme;
					var note=$("__myNote_"+key_note);
					var text=$("__myNoteText_"+key_note);
					text.dataset.showShadow=val_to_set?1:0;
					note.className=note.className.replace(/\b\s*__myNoteShadow\d\d\b/, "");
					if(val_to_set){
						note.classList.add('__myNoteShadow'+(Math.floor(Math.random()*(106-101)+101).toString().substr(1, 2)));
					}
					//let's save it
					readyToSave(key_note);
				},
				type: 'checkbox'
			})
			thisWindow.appendChild(createElement('label', {
				innerHTML: i18n('showShadowLabel'),
				className: '__myNoteShowShadowsLabel',
				appendChild: showShadows
			}));
			if(isChrome){
				showShadows.style.display = 'none';
			}

			__settings.getWindow().appendChild(thisWindow);
		}
		//show what is selected ?
		thisWindow.style.display="block";
		//unset previously set elements
		var elem=document.getElementsByClassName("__myNoteThemePreviewActive");
		for(var i=0; i<elem.length; i++){
			elem[i].classList.remove('__myNoteThemePreviewActive');
		}
		var text=$("__myNoteText_"+key_note);
		$("__myNoteThemePreview_"+text.dataset.theme).classList.add('__myNoteThemePreviewActive');
		$('showShadows').checked=parseInt(text.dataset.showShadow, 10)==1;
	}
}