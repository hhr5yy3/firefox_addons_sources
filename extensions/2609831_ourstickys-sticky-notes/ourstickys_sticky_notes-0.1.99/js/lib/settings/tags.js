function createTags(key_note){
	__settings.hideSubs();
	if(__settings.getWindow()!==null&&__settings.getWindow().style.display!=='none'&&__settings.getWindow().dataset.keyNote===key_note){
		var thisWindow=$('__myNotesSettingTags');
		if(!thisWindow){
			//let's ceate the necessary div :-)
			//window
			thisWindow=createElement('div', {
				id: "__myNotesSettingTags",
				className: '__myNotesSettingSub __myNoteSettingSubWrapper',
				style: {
					width: __settings.getWindow().style.width,
					height: (parseInt(__settings.getWindow().style.height, 10)-15)+"px"
				}
			});
			//title
			thisWindow.appendChild(createElement('p', {
				className: '__myNotesSettingSubTitle',
				appendChild: document.createTextNode(i18n("tagTitle"))
			}));
			//other
			thisWindow.appendChild(createElement('div', {
				id: "__myNoteTagsContainer"
			}));
			//add container
			var addContainer=createElement('div', {
				id: "__myNoteAddContainer"
			});
			thisWindow.appendChild(addContainer);
			//add tag button at the bottom
			//this should be an INPUT BOX with the `tag` button under it(enter should do it too)
			var addItem=createElement('input', {
				className: '__myNoteTagsItemAdd',
				id: '__myNoteTagsItemAdd',
				type: "text",
				name: "tag_address",
				placeholder: i18n("tagInputPlaceholder"),
				onkeyup: function (e){
					stopEvent(e);
					var addItemButton=$('__myNoteTagsItemAddButton');
					this.className=this.className.replace(/\b\s*__myNoteTagsItemAddError\b/g, '');
					if(this.value.trim().length<3){
						this.className=this.className+" __myNoteTagsItemAddError";
						addItemButton.style.display='none';
					}else{
						addItemButton.style.display='block';
						var code=parseInt(e.keyCode||e.which, 10);
						if(code===13){
							addItemButton.onclick();
						}
					}
				}
			});
			addContainer.appendChild(addItem);
			var addItemButton=createElement('div', {
				className: '__myNoteTagsItemAddButton',
				id: '__myNoteTagsItemAddButton',
				appendChild: document.createTextNode('+'),
				style: {
					display: 'none'
				},
				onclick: function (e){
					stopEvent(e);
					var key_note=this.dataset.keyNote;
					var addItem=$('__myNoteTagsItemAdd');
					if(addItem.value.trim().length>=3){
						var text=$("__myNoteText_"+key_note);
						var tag={
							sticky_id: text.dataset.stickyId,
							tag: addItem.value,
							key: key_note
						};
						__background.saveTag(tag, function (response){
							//add to database then
							//if the tag already exists I should not add it back
							var tag_id=response.info.id;
							var e=$('__myNoteTagsItem_'+tag_id);
							var addItem=$('__myNoteTagsItemAdd');
							if(!e){
								var tag={
									id: tag_id,
									tag: addItem.value
								};
								var item=createTagItem(tag, key_note);
								tagsContainer.appendChild(item);
								tagsContainer.scrollTop=tagsContainer.scrollHeight;
								//let's add it to the tag list
								var container=$("__myNote_"+key_note);
								var tags=JSON.parse(container.dataset.tags);
								tags.push(tag);
								container.dataset.tags=JSON.stringify(tags);
								updateTagsOnNote(key_note);
							}
							addItem.value="";
							addItem.focus();
						});
						this.style.display='none';
					}
				}
			});
			addContainer.appendChild(addItemButton);
			__settings.getWindow().appendChild(thisWindow);
		}
		thisWindow.style.display="block";
		var container=$("__myNote_"+key_note);
		var tags=JSON.parse(container.dataset.tags);
		var tagsContainer=$("__myNoteTagsContainer").empty();
		var text=$("__myNoteText_"+key_note);
		var is_share=(parseInt(text.dataset.isShare, 10)===1);
		var is_channel=(parseInt(text.dataset.isChannel, 10)===1);
		//load tags here
		for(var i in tags){
			var item=createTagItem(tags[i], key_note);
			tagsContainer.appendChild(item);
			if(is_share||is_channel){
				//do not show the remove button
				$('__myNoteTagsItemRemove_'+tags[i].id).remove();
			}
		}
		var addContainer=$('__myNoteAddContainer');
		//if this is a share, I should not allow removing nor adding of the tags
		var has_password=parseInt(text.data('hasPassword'), 10)===1;
		var unlocked=text.data('unlocked');
		if(!is_share&&!is_channel&&!(has_password&&(typeof unlocked==='undefined'||!!unlocked!==true))){
			addContainer.style.display="block";
			$('__myNoteTagsItemAddButton').dataset.keyNote=key_note;
			$('__myNoteTagsItemAdd').focus();
		}else{
			addContainer.style.display="none";
		}
	}
}
function createTagItem(tag, key_note){
	var item=createElement('div', {
		className: '__myNoteTagsItem',
		id: '__myNoteTagsItem_'+tag.id,
		appendChildren: [
			//text itself
			document.createTextNode(truncateString(tag.tag, 25)),
			//delete icon
			createElement('img', {
				dataset: {
					keyNote: key_note,
					tagId: tag.id,
					tag: tag.tag
				},
				className: '__myNoteTagsItemRemove',
				id: '__myNoteTagsItemRemove_'+tag.id,
				src: chrome.extension.getURL('/img/delete.gif'),
				onclick: function (e){
					stopEvent(e);
					var tag_id=this.dataset.tagId;
					var elemItem=$('__myNoteTagsItem_'+tag_id);
					var elemRemoveItem=$('__myNoteTagsItemRemove_'+tag_id);
					this.style.webkitTransition='-webkit-transform 0.5s ease-in, opacity 0.5s ease-in';
					this.offsetTop; // Force style recalc
					this.style.opacity='0';
					var key_note=this.dataset.keyNote;
					setTimeout(function (){
						$(elemItem).remove();
						$(elemRemoveItem).remove();
					}, 500);
					var tag={
						id: this.dataset.tagId,
						key: key_note
					};
					deleteTag(tag, function (){});
					var container=$("__myNote_"+key_note);
					var tags=JSON.parse(container.dataset.tags);
					for(var i in tags){
						if(tags[i]['id']==this.dataset.tagId){
							tags.splice(i, 1);
							break;
						}
					}
					container.dataset.tags=JSON.stringify(tags);
					updateTagsOnNote(key_note);
				}
			})
		]
	});
	return item;
}