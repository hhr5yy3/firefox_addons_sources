function createPassword(key_note){
	__settings.hideSubs();
	if(__settings.getWindow()!==null&&__settings.getWindow().style.display!=='none'&&__settings.getWindow().dataset.keyNote===key_note){
		var thisWindow=$('__myNotesSettingPassword');
		if(!thisWindow){
			//let's ceate the necessary div :-)
			//window
			thisWindow=createElement('div', {
				id: "__myNotesSettingPassword",
				className: '__myNotesSettingSub __myNoteSettingSubWrapper',
				style: {
					width: __settings.getWindow().style.width,
					height: (parseInt(__settings.getWindow().style.height, 10)-15)+"px"
				}
			});
			//title
			var para=createElement("p", {
				className: '__myNotesSettingSubTitle',
				appendChild: document.createTextNode(i18n("passwordTitle"))
			});
			thisWindow.appendChild(para);
			//other
			var passwordContainer=createElement('div', {
				id: "__myNotePasswordContainer"
			});
			thisWindow.appendChild(passwordContainer);

			//is this password protected ?
			//if so, simple show a "delete password" button
			//else show an input box with a [+] in it
			thisWindow.appendChild(createElement('p', {
				className: '__myNotePasswordInstructions __myNotePasswordInstructionsTop',
				appendChild: document.createTextNode(i18n("passwordInstructionsTop"))
			}));
			thisWindow.appendChild(createElement('input', {
				className: '__myNotePasswordAdd',
				id: '__myNotePasswordAdd',
				type: "text",
				placeholder: i18n("passwordInputPlaceholder"),
				onkeyup: function (e){
					stopEvent(e);
					var addItemButton=$('__myNotePasswordAddButton');
					this.classList.remove('__myNotePasswordAddError');
					if(this.value.trim().length<5){
						this.classList.add('__myNotePasswordAddError');
						addItemButton.style.display='none';
					}else{
						addItemButton.style.display='block';
						var code=parseInt(e.keyCode||e.which, 10);
						if(code===13){
							addItemButton.onclick();
						}
					}
				}
			}));
			thisWindow.appendChild(createElement('div', {
				className: '__myNotePasswordAddButton',
				id: '__myNotePasswordAddButton',
				appendChild: document.createTextNode('+'),
				style: {
					display: 'none'
				},
				onclick: function (e){
					stopEvent(e);
					var key_note=this.dataset.keyNote;
					var addItem=$('__myNotePasswordAdd');
					if(addItem.value.trim().length>=5){
						//if there is a password
						let textarea=$("__myNoteText_"+key_note);
						let sticky_id=textarea.data('stickyId');
						let password=addItem.value.trim();
						let old_password=textarea.dataset.password;
						saveStickyPassword(sticky_id, password, old_password);
						$('__myNotePasswordAdd').attr({
							disabled: true
						});
						this.style.display='none';
						$('__myNotePasswordRemoveButton').style.display='block';
						$('__myNotePasswordInstructionsBottom').style.display='block';
					}
				}
			}));
			thisWindow.appendChild(createElement('div', {
				className: '__myNotePasswordRemoveButton',
				id: '__myNotePasswordRemoveButton',
				appendChild: document.createTextNode('-'),
				style: {
					display: 'none'
				},
				onclick: function (e){
					stopEvent(e);
					var key_note=this.dataset.keyNote;
					var addItem=$('__myNotePasswordAdd');
					if(addItem.value.trim().length>=5){
						//if there is a password
						let textarea=$("__myNoteText_"+key_note);
						let sticky_id=textarea.data('stickyId');
						let password=addItem.value.trim();
						deleteStickyPassword(sticky_id, password);
						$('__myNotePasswordAdd').attr({
							value: '',
							disabled: false
						});
						this.style.display='none';
						$('__myNotePasswordInstructionsBottom').style.display='none';
					}
				}
			}));
			thisWindow.appendChild(createElement('p', {
				id: '__myNotePasswordInstructionsBottom',
				className: '__myNotePasswordInstructions __myNotePasswordInstructionsBottom',
				appendChild: document.createTextNode(i18n("passwordInstructionsBottom")),
				style: {
					display: 'none'
				}
			}));

			__settings.getWindow().appendChild(thisWindow);
		}
		//show what is selected ?
		var textarea=$("__myNoteText_"+key_note);
		$('__myNotePasswordAddButton').attr({
			dataset: {
				keyNote: key_note
			}
		});
		$('__myNotePasswordRemoveButton').attr({
			dataset: {
				keyNote: key_note
			}
		});
		$('__myNotePasswordAdd').attr({
			dataset: {
				keyNote: key_note
			}
		});
		if(textarea.dataset.password){
			$('__myNotePasswordAdd').attr({
				value: textarea.dataset.password,
				disabled: true
			});
			$('__myNotePasswordAddButton').style.display='none';
			$('__myNotePasswordRemoveButton').style.display='block';
			$('__myNotePasswordInstructionsBottom').style.display='block';
		}else{
			$('__myNotePasswordAdd').attr({
				value: '',
				disabled: false
			});
			$('__myNotePasswordAddButton').style.display='none';
			$('__myNotePasswordRemoveButton').style.display='none';
			$('__myNotePasswordInstructionsBottom').style.display='none';
		}
		thisWindow.style.display="block";
	}
}