function createInfo(key_note){
	__settings.hideSubs();
	if(__settings.getWindow()!==null&&__settings.getWindow().style.display!=='none'&&__settings.getWindow().dataset.keyNote===key_note){
		var thisWindow=$('__myNotesSettingInfo');
		if(!thisWindow){
			//let's ceate the necessary div :-)
			//window
			thisWindow=createElement('div', {
				id: "__myNotesSettingInfo",
				className: '__myNotesSettingSub __myNoteSettingSubWrapper',
				style: {
					width: __settings.getWindow().style.width,
					height: (parseInt(__settings.getWindow().style.height, 10)-15)+"px"
				}
			});
			//title
			var para=createElement("p", {
				className: '__myNotesSettingSubTitle',
				appendChild: document.createTextNode(i18n("infoTitle"))
			});
			thisWindow.appendChild(para);
			//other
			var infoContainer=createElement('div', {
				id: "__myNoteInfoContainer"
			});
			thisWindow.appendChild(infoContainer);

			//shared
			var shared_label=createElement("label", {
				id: '__myNoteSettingsSharedLabel',
				className: '__myNoteSettingsSharedLabel',
				appendChild: document.createTextNode("share")
			});
			infoContainer.appendChild(shared_label);

			//date added
			var para=createElement("div", {
				id: '__myNoteSettingsDate',
				className: '__myNoteSettingsDate',
				appendChild: document.createTextNode("date")
			});
			infoContainer.appendChild(para);

			//word count
			var para=createElement("div", {
				id: '__myNoteSettingsWords',
				className: '__myNoteSettingsWords',
				appendChild: document.createTextNode(i18n('settingsWords', "0"))
			});
			infoContainer.appendChild(para);

			//chars count
			var para=createElement("div", {
				id: '__myNoteSettingsChars',
				className: '__myNoteSettingsChars',
				appendChild: document.createTextNode(i18n('settingsChars', "0"))
			});
			infoContainer.appendChild(para);

			//font size:
			var font_size_label=createElement("label", {
				innerHTML: i18n('settingsFontSizeLabel'),
				className: '__myNoteSettingsFontSizeLabel'
			});
			var font_size=createElement("select", {
				id: '__myNoteSettingsFontSize',
				className: '__myNoteSettingsFontSize',
				onchange: function (e){
					var key_note=__settings.getWindow().dataset.keyNote;
					var para=$("__myNotePreview_"+key_note);
					var text=$("__myNoteText_"+key_note);
					para.style.fontSize=this.value+"px";
					text.style.fontSize=this.value+"px";
					text.dataset.fontSize=this.value;
					readyToSave(key_note);
				},
				addOptions: [
					{
						value: "12",
						text: i18n('settingsFontSizeSmall')
					}, {
						value: "14",
						text: i18n('settingsFontSizeMedium')
					}, {
						value: "16",
						text: i18n('settingsFontSizeLarge')
					}, {
						value: "18",
						text: i18n('settingsFontSizeXLarge')
					}
				]
			});

			font_size_label.appendChild(font_size);
			infoContainer.appendChild(font_size_label);

			//sticky level:
			var sticky_level_label=createElement("label", {
				innerHTML: i18n('settingsStickToLabel'),
				className: '__myNoteSettingsStickyLevelLabel'
			});
			var sticky_level=createElement("select", {
				id: '__myNoteSettingsStickyLevel',
				className: '__myNoteSettingsStickyLevel',
				onchange: function (e){
					var key_note=__settings.getWindow().dataset.keyNote;
					var text=$("__myNoteText_"+key_note);
					text.dataset.stickyLevel=this.value;
					readyToSave(key_note);
				},
				addOptions: [
					{
						value: "query",
						text: i18n('settingsStickToPageExact')
					}, {
						value: "queryFuzzy",
						text: i18n('settingsStickToPageFuzzy')
					}, {
						value: "path",
						text: i18n('settingsStickToPath')
					}, {
						value: "domain",
						text: i18n('settingsStickToDomain')
					}, {
						value: "everyTab",
						text: i18n('settingsStickToEveryTab')
					}

				]
			});

			sticky_level_label.appendChild(sticky_level);
			infoContainer.appendChild(sticky_level_label);

			//sticky type:
			var sticky_type_label=createElement("label", {
				innerHTML: i18n('settingsStickTypeLabel'),
				className: '__myNoteSettingsStickyTypeLabel'
			});
			var sticky_type=createElement("select", {
				id: '__myNoteSettingsStickyType',
				className: '__myNoteSettingsStickyType',
				onchange: function (e){
					var key_note=__settings.getWindow().dataset.keyNote;
					var text=$("__myNoteText_"+key_note);
					text.dataset.stickyType=this.value;
					readyToSave(key_note);
					updatePreview(key_note);
				},
				addOptions: [
					{
						value: "normal",
						text: i18n('settingsStickTypeNormal')
					}, {
						value: "todo",
						text: i18n('settingsStickTypeToDo')
					}, {
						//JSON, only if extra settings are enabled
						id: "settingsStickTypeJSON",
						value: "json",
						text: i18n('settingsStickTypeJSON')
					}, {
						//JSON, only if extra settings are enabled
						id: "settingsStickTypeVideo",
						value: "video",
						text: i18n('settingsStickTypeVideo')
					}
				]
			});
			sticky_type_label.appendChild(sticky_type);
			infoContainer.appendChild(sticky_type_label);

			//Expires in:
			var expires_label=createElement("label", {
				id: '__myNoteSettingsExpiresLabel',
				className: '__myNoteSettingsExpiresLabel',
				innerHTML: i18n('settingsExpiresLabel')
			});
			var expires=createElement("select", {
				id: '__myNoteSettingsExpires',
				className: '__myNoteSettingsExpires',
				onchange: function (e){
					var key_note=__settings.getWindow().dataset.keyNote;
					var text=$("__myNoteText_"+key_note);
					text.dataset.expires=this.value;
					readyToSave(key_note);
				},
				addOptions: [
					{
						value: "0",
						text: i18n('settingsExpiresNever')
					}, {
						value: "1",
						title: i18n('settingsExpires1Day')
					}, {
						value: "7",
						title: i18n('settingsExpires7Days')
					}, {
						value: "30",
						title: i18n('settingsExpires30Days')
					}
				]
			});

			expires_label.appendChild(expires);
			infoContainer.appendChild(expires_label);

			__settings.getWindow().appendChild(thisWindow);
		}
		thisWindow.style.display="block";
		var text=$("__myNoteText_"+key_note);
		var is_share=(parseInt(text.dataset.isShare, 10)===1);
		var is_channel=(parseInt(text.dataset.isChannel, 10)===1);

		//shared
		if(is_share){
			var t=$("__myNoteSettingsSharedLabel");
			t.style.display='block';
			t.childNodes[0].nodeValue=i18n('settingsShared', truncateString(text.dataset.shareFrom, 30));
		}else{
			var t=$("__myNoteSettingsSharedLabel");
			t.style.display='none';
			t.childNodes[0].nodeValue='';
		}

		//font size
		var fontSize=parseInt(text.dataset.fontSize, 10);
		$("__myNoteSettingsFontSize").value=fontSize;

		//sticky level
		var stickyLevel=text.dataset.stickyLevel;
		var stickyLevelElem=$("__myNoteSettingsStickyLevel");
		stickyLevelElem.value=stickyLevel;
		if(is_share||is_channel){
			stickyLevelElem.setAttribute('disabled', true);
		}else{
			stickyLevelElem.removeAttribute('disabled');
		}

		//sticky type
		var stickyType=text.dataset.stickyType;
		var stickyTypeElem=$("__myNoteSettingsStickyType");
		stickyTypeElem.value=stickyType;
		if(is_share||is_channel){
			stickyTypeElem.setAttribute('disabled', true);
		}else{
			stickyTypeElem.removeAttribute('disabled');
		}

		//expires
		var expires=text.dataset.expires;
		var expiresElem=$("__myNoteSettingsExpires");
		expiresElem.value=expires;
		if(is_share||is_channel){
			expiresElem.setAttribute('disabled', true);
		}else{
			expiresElem.removeAttribute('disabled');
		}
		//date
		var dateAdded=parseInt(text.dataset.dateAdded, 10);
		var dateAddedElem=$("__myNoteSettingsDate");
		if(dateAdded>0){
			var d=new Date(dateAdded);
			dateAddedElem.childNodes[0].nodeValue=i18n('settingsCreatedDate', d.toLocaleDateString());
			var now=Date.now();
			//update the expiration dates
			var t=new Date(dateAdded);
			t.setDate(t.getDate()+parseInt(expiresElem.options[1].value, 10));
			expiresElem.options[1].text=t.toLocaleDateString();
			if(now<=t.getTime()){
				expiresElem.options[1].style.display="block";
			}else{
				expiresElem.options[1].style.display="none";
			}
			var t=new Date(dateAdded);
			t.setDate(t.getDate()+parseInt(expiresElem.options[2].value, 10));
			expiresElem.options[2].text=t.toLocaleDateString();
			if(now<=t.getTime()){
				expiresElem.options[2].style.display="block";
			}else{
				expiresElem.options[2].style.display="none";
			}
			var t=new Date(dateAdded);
			t.setDate(t.getDate()+parseInt(expiresElem.options[3].value, 10));
			expiresElem.options[3].text=t.toLocaleDateString();
			if(now<=t.getTime()){
				expiresElem.options[3].style.display="block";
				$('__myNoteSettingsExpiresLabel').style.display="block";
			}else{
				expiresElem.options[3].style.display="none";
				$('__myNoteSettingsExpiresLabel').style.display="none";
			}
		}else{
			$('__myNoteSettingsExpiresLabel').style.display="block";
			expiresElem.options[1].text=expiresElem.options[1].title;
			expiresElem.options[2].text=expiresElem.options[2].title;
			expiresElem.options[3].text=expiresElem.options[3].title;
			expiresElem.options[1].style.display="block";
			expiresElem.options[2].style.display="block";
			expiresElem.options[3].style.display="block";
			dateAddedElem.childNodes[0].nodeValue='';
		}
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
						$('settingsStickTypeJSON').style.display="block";
//						$('settingsStickTypeVideo').style.display="block";
					}else{
						//disabled
						$('settingsStickTypeJSON').style.display="none";
//						$('settingsStickTypeVideo').style.display="none";
					}
				}
		);

		updateWordsAndChars(key_note);
	}
}
function updateWordsAndChars(key_note){
	if(__settings.getWindow()!==null&&__settings.getWindow().style.display!=='none'&&__settings.getWindow().dataset.keyNote===key_note){
		var thisSticky = __stickys.getSticky(key_note);
		//words
		var wordsElem=$("__myNoteSettingsWords");
		if(wordsElem){
			wordsElem.childNodes[0].nodeValue=i18n('settingsWords', thisSticky.wordCount().toString());
		}

		//chars
		var charsElem=$("__myNoteSettingsChars");
		if(charsElem){
			charsElem.childNodes[0].nodeValue=i18n('settingsChars', thisSticky.charCount().toString());
		}
	}
}