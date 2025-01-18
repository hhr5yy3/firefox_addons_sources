function createShares(key_note){
	__settings.hideSubs();
	if(__settings.getWindow()!==null&&__settings.getWindow().style.display!=='none'&&__settings.getWindow().dataset.keyNote===key_note){
		var thisWindow=$('__myNotesSettingShares');
		if(!thisWindow){
			//let's ceate the necessary div :-)
			//window
			thisWindow=document.createElement('div');
			thisWindow.id="__myNotesSettingShares";
			thisWindow.className='__myNotesSettingSub __myNoteSettingSubWrapper';
			thisWindow.style.width=__settings.getWindow().style.width;
			thisWindow.style.height=(parseInt(__settings.getWindow().style.height, 10)-15)+"px";
			//title
			var para=document.createElement("p");
			var node=document.createTextNode(i18n("shareTitle"));
			para.appendChild(node);
			para.className='__myNotesSettingSubTitle';
			thisWindow.appendChild(para);
			//other
			var sharesContainer=document.createElement('div');
			sharesContainer.id="__myNoteSharesContainer";
			thisWindow.appendChild(sharesContainer);
			//add share button at the bottom
			//this should be an INPUT BOX with the `share` button under it(enter should do it too)
			var addItem=document.createElement('input');
			addItem.className='__myNoteSharesItemAdd';
			addItem.id='__myNoteSharesItemAdd';
			addItem.type="email";
			addItem.name="share_email_address";
			addItem.placeholder=i18n("shareInputPlaceholder");
			addItem.onkeyup=function (e){
				stopEvent(e);
				var addItemButton=$('__myNoteSharesItemAddButton');
				this.className=this.className.replace(/\b\s*__myNoteSharesItemAddError\b/g, '');
				if(!validateEmail(this.value)){
					this.className=this.className+" __myNoteSharesItemAddError";
					addItemButton.style.display='none';
				}else{
					addItemButton.style.display='block';
					var code=parseInt(e.keyCode||e.which, 10);
					if(code===13){ //Enter keycode
						//Do something
						addItemButton.onclick();
					}
				}
			};
			thisWindow.appendChild(addItem);
			var addItemButton=document.createElement('div');
			addItemButton.className='__myNoteSharesItemAddButton';
			addItemButton.id='__myNoteSharesItemAddButton';
			addItemButton.appendChild(document.createTextNode('+'));
			addItemButton.style.display='none';
			addItemButton.onclick=function (e){
				stopEvent(e);
				var key_note=this.dataset.keyNote;
				var addItem=$('__myNoteSharesItemAdd');
				if(validateEmail(addItem.value)){
					var text=$("__myNoteText_"+key_note);
					var share={
						sticky_id: text.dataset.stickyId,
						to_email: addItem.value,
						key: key_note
					};
					__background.saveShare(share, function (response){
						//add to database then
						//if the share already exists I should not add it back
						var share_id=response.info.id;
						var e=$('__myNoteSharesItem_'+share_id);
						var addItem=$('__myNoteSharesItemAdd');
						if(!e){
							var share={
								id: share_id,
								to_email: addItem.value
							};
							var item=createShareItem(share, key_note);
							sharesContainer.appendChild(item);
							sharesContainer.scrollTop=sharesContainer.scrollHeight;
							//let's add it to the share list
							var container=$("__myNote_"+key_note);
							var shares=JSON.parse(container.dataset.shares);
							shares.push(share);
							container.dataset.shares=JSON.stringify(shares);
						}
						addItem.value="";
						addItem.focus();
					});
					this.style.display='none';
				}
			};
			thisWindow.appendChild(addItemButton);
			__settings.getWindow().appendChild(thisWindow);
		}
		var container=$("__myNote_"+key_note);
		var shares=JSON.parse(container.dataset.shares);
		var sharesContainer=$("__myNoteSharesContainer");
		//empty the previously loaded shares
		sharesContainer.empty();
		//load shares here
		for(var i in shares){
			var item=createShareItem(shares[i], key_note);
			sharesContainer.appendChild(item);
		}
		thisWindow.style.display="block";
		var addItemButton=$('__myNoteSharesItemAddButton');
		var addItem=$('__myNoteSharesItemAdd');
		//if this is a share, I should not allow removing nor adding of the tags
		var is_share=(parseInt($("__myNoteText_"+key_note).dataset.isShare, 10)===1);
		if(!is_share){
			addItem.style.display="inline";
			addItemButton.dataset.keyNote=key_note;
			addItem.focus();
		}else{
			addItem.style.display="none";
		}
	}
}
function createShareItem(share, key_note){
	var item=document.createElement('div');
	item.appendChild(document.createTextNode(truncateString(share.to_email, 25)));
	item.className='__myNoteSharesItem';
	item.id='__myNoteSharesItem_'+share.id;

	var removeItem=document.createElement('img');
	removeItem.dataset.keyNote=key_note;
	removeItem.dataset.shareId=share.id;
	removeItem.dataset.shareEmail=share.to_email;
	removeItem.className='__myNoteSharesItemRemove';
	removeItem.id='__myNoteSharesItemRemove_'+share.id;
	removeItem.src=chrome.extension.getURL('/img/delete.gif');
	removeItem.onclick=function (e){
		stopEvent(e);
//		alert('removing '+this.dataset.shareEmail+'(id:'+this.dataset.shareId+')');
		var share_id=this.dataset.shareId;
		var elemItem=$('__myNoteSharesItem_'+share_id);
		var elemRemoveItem=$('__myNoteSharesItemRemove_'+share_id);
		this.style.webkitTransition='-webkit-transform 0.5s ease-in, opacity 0.5s ease-in';
		this.offsetTop; // Force style recalc
		this.style.opacity='0';
		setTimeout(function (){
			$(elemItem).remove();
			$(elemRemoveItem).remove();
		}, 500);
		var key_note=this.dataset.keyNote;
		__background.deleteShare({
			id: this.dataset.shareId,
			key: key_note
		}, function (){});
		var container=$("__myNote_"+key_note);
		var shares=JSON.parse(container.dataset.shares);
		for(var i in shares){
			if(shares[i]['id']===this.dataset.shareId){
				shares.splice(i, 1);
				break;
			}
		}
		container.dataset.shares=JSON.stringify(shares);
	};
	item.appendChild(removeItem);
	return item;
}