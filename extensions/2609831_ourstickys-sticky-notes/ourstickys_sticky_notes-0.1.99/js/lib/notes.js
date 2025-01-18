function saveNote(key_note, callback){
	var container=$("__myNote_"+key_note);
	if(container){
		var minMax=$("__myNoteMinMax_"+key_note);
		var elemWidth=parseInt(container.offsetWidth, 10);
		var elemHeight=parseInt(container.offsetHeight, 10);
		var textarea=$("__myNoteText_"+key_note);
		if(parseInt(textarea.dataset.minimized, 10)===1){
			elemWidth=parseInt(minMax.dataset.width, 10);
			elemHeight=parseInt(minMax.dataset.height, 10);
		}
		var note={
			'key': key_note,
			'page': window.location.href,
			'xpath': textarea.dataset.xpath,
			'extras': {
				'theme': textarea.dataset.theme,
				'date_added': parseInt(textarea.dataset.dateAdded, 10),
				'font_size': parseInt(textarea.dataset.fontSize, 10),
				'expires': parseInt(textarea.dataset.expires, 10),
				'channels': JSON.parse(container.dataset.channels),
				'shares': JSON.parse(container.dataset.shares),
				'tags': JSON.parse(container.dataset.tags),
				'show_shadow': parseInt(textarea.dataset.showShadow, 10),
			},
			'coord': {
				'obj': {
					'x': parseInt(textarea.dataset.coord_o_x, 10),
					'y': parseInt(textarea.dataset.coord_o_y, 10)
				},
				'page': {
					'x': parseInt(textarea.dataset.coord_p_x, 10),
					'y': parseInt(textarea.dataset.coord_p_y, 10)
				}
			},
			'size': {
				'x': elemWidth, //+2,
				'y': elemHeight//+2
			},
			'info': {
				'id': parseInt(textarea.dataset.info_id, 10),
				'class': parseInt(textarea.dataset.info_class, 10),
				'html': parseInt(textarea.dataset.info_html, 10)
			},
			'text': textarea.value
		};
		if(textarea.dataset.stickyLevel!=='query'){
			note.extras['sticky_level']=textarea.dataset.stickyLevel;
		}
		if(parseInt(textarea.dataset.minimized, 10)===1){
			note.extras['minimized']=1;
		}
		if(parseInt(textarea.dataset.pinned, 10)===1){
			note.extras['pinned']=1;
		}
		if(textarea.dataset.stickyType!=="normal"){
			note.extras['sticky_type']=textarea.dataset.stickyType;
			if(textarea.dataset.todos.trim()!==""){
				note.extras['todos']=textarea.dataset.todos;
			}
		}
		var is_shared=(parseInt(textarea.dataset.isShare, 10)===1);
		var is_channel=(parseInt(textarea.dataset.isChannel, 10)===1);
		var has_password=parseInt(textarea.data('hasPassword'), 10)===1;
		var unlocked=textarea.data('unlocked');
		//password required before you can save the sticky
		if((!has_password||(typeof unlocked!=='undefined'&&!!unlocked===true))&&!is_shared&&!is_channel){
			getData({
				'keyNote': note['key']
			}, function (data){
				var myNotes=JSON.parse(data);
				var key_note=note['key'];
				if(!myNotes||myNotes.length===0){
					myNotes={};
				}else if(typeof myNotes[key_note]!=='undefined'){
					note['id']=myNotes[key_note]['id'];
				}
				myNotes[key_note]=note;
				__background.saveSticky(key_note, JSON.stringify(myNotes), function (response){
					var text=$('__myNoteText_'+key_note);
					if(text&&text.dataset.stickyId===''&&response&&response.id){
						$('__myNoteText_'+key_note).dataset.stickyId=response.id;
					}
					sendReloadNote(key_note);
					if(typeof callback==='function'){
						callback(response);
					}
				});
			});
		}else{
			console.log('Cannot save password protected or shares/channels !!');
		}
	}else{
		console.log('Note container not found ??');
	}
}
function loadNotes(key_note, force_url){
	__stickys.updateBadgeText();
	//Load all the notes on the page
	//Load the channels first
	//Load what channels are visible
	//Load personal stickys
	//	if a sticky is inside a channel that is not visible, do not generate it
	//Load Shared Stickys (should not be affected by hidden channels)
	//Load stickys in channels

	//channels
	var options={};
	var key_note_done=false;	//this will be set to true if the passed key_note has been rendered already. useful if a sticky is in channels as well as shares and/or owned by this user
	getChannels(options, function (data){
		var channels=JSON.parse(data);
		sendMessage({
			'action': 'getShowingChannels'
		}, function (selectedChannels){
			//user created stickys
			var options={};
			getData(options, function (data){
				var myNotes=JSON.parse(data);
				if(myNotes&&Object.keys(myNotes).length>0){
					for(var i in myNotes){
						var myNote=myNotes[i];
						var this_key_note=myNote.key;
						if(typeof key_note==='undefined'||(key_note===this_key_note&&!key_note_done)){
							key_note_done=true;
							var page=myNote.page;
							if(typeof force_url!=='undefined'){
								page=force_url;
							}
							var elem=myNote.xpath;
							var info=myNote.info;
							var coord=myNote.coord;
							var size_note=myNote.size;
							var text=myNote.text;
							var extras=(myNote.extras==undefined)?{}:myNote.extras;
							var sticky_id=myNote.id;
							if(shouldShowByChannel(extras['channels'], selectedChannels)&&is_this_same_page(page, extras)){
								if(typeof key_note!=='undefined'||!__stickys.exists(this_key_note)){
									__stickys.createNote(text, elem, coord, info, size_note, extras, this_key_note, sticky_id);
								}
							}else if(__stickys.exists(this_key_note)){
								//not needed on this page
								__stickys.clearFromPage(this_key_note);
							}
						}
					}
				}
				//shared stickys
				var options={};
				getShares(options, function (data){
					var myNotes=JSON.parse(data);
					if(myNotes&&Object.keys(myNotes).length>0){
						for(var i in myNotes){
							var myNote=myNotes[i];
							var this_key_note=myNote.key;
							if(typeof key_note==='undefined'||(key_note===this_key_note&&!key_note_done)){
								key_note_done=true;
								var page=myNote.page;
								var elem=myNote.xpath;
								var info=myNote.info;
								var coord=myNote.coord;
								var size_note=myNote.size;
								var text=myNote.text;
								var extras=(myNote.extras==='undefined')?{}:myNote.extras;
								extras['shared']=myNote.shared?myNote.shared:false;
								if(is_this_same_page(page, extras)){
									if(typeof key_note!=='undefined'||!__stickys.exists(this_key_note)){
										__stickys.createNote(text, elem, coord, info, size_note, extras, this_key_note);
										delete(key_note);
									}
								}else if(__stickys.exists(this_key_note)){
									//not needed here
									__stickys.clearFromPage(this_key_note);
								}
							}
						}
					}
					//channels stickys
					if(channels.length>0){
						for(var k in channels){
							var channel_id=channels[k].id;
							if((typeof selectedChannels[channel_id]==='undefined'||selectedChannels[channel_id]===true)){
								//load the stickys for this channel
								var options={};
								getChannelStickys(channel_id, options, function (data){
									var myNotes=JSON.parse(data);
									if(myNotes&&Object.keys(myNotes).length>0){
										for(var i in myNotes){
											var myNote=myNotes[i];
											var this_key_note=myNote.key;
											if(typeof key_note==='undefined'||(key_note===this_key_note&&!key_note_done)){
												key_note_done=true;
												var page=myNote.page;
												var elem=myNote.xpath;
												var info=myNote.info;
												var coord=myNote.coord;
												var size_note=myNote.size;
												var text=myNote.text;
												var extras=(typeof myNote.extras==='undefined')?{}:myNote.extras;
												extras['is_channel']=true;
												if(is_this_same_page(page, extras)){
													if(typeof key_note!=='undefined'||!__stickys.exists(this_key_note)){
														__stickys.createNote(text, elem, coord, info, size_note, extras, this_key_note);
														delete(key_note);
													}
												}else if(__stickys.exists(this_key_note)){
													//not needed here
													__stickys.clearFromPage(this_key_note);
												}
											}
										}
									}
								});
							}
						}
					}
				});
			});
		});
	});
}
/*
 this creates a small "pointer" on the right of the page (near the scrolling bar) to thow
 where a note might be
 when clicked it will scroll the page to that point and mazimize the note
 */
function createNotePointer(key_note){
	var body=document.body, html=document.documentElement;
	var pageHeight=Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
	var visibleHeight=window.innerHeight||html.clientHeight||body.clientHeight||0;
	var container=$("__myNote_"+key_note);
	var note_top=parseInt(container.style.top, 10);
	var note_pointer_top=((((note_top*100)/pageHeight)*visibleHeight)/100)-8; //8 is half the height of the element itself

	var note_pointer_wrapper=document.createElement('div');
	note_pointer_wrapper.title=i18n('notePointerHover');
	note_pointer_wrapper.dataset.keyNote=key_note;
	note_pointer_wrapper.className='__myNotePointerWrapper';
	note_pointer_wrapper.id='__myNotePointerWrapper_'+key_note;
	note_pointer_wrapper.style.top=note_pointer_top+"px";
	note_pointer_wrapper.dataset.noteTop=note_top;
	note_pointer_wrapper.onclick=function (e){
		var key_note=this.dataset.keyNote;
		$("__myNote_"+key_note).scrollIntoView();
		//let's maximize it only if it was minimized to start with
		var text=$("__myNoteText_"+key_note);
		if(parseInt(text.dataset.minimized, 10)===1){
			$("__myNoteMinMax_"+key_note).onclick();
		}
		showNotes(key_note);
	};
	var note_pointer=document.createElement('div');
	note_pointer.dataset.keyNote=key_note;
	note_pointer.className='__myNotePointerArrow';
	note_pointer_wrapper.appendChild(note_pointer);
	var note_preview=document.createElement('div');
	note_preview.dataset.keyNote=key_note;
	note_preview.className='__myNotePointerPreview';
	note_preview.id='__myNotePointerPreview_'+key_note;
	note_preview.appendChild(document.createTextNode(""));
	note_pointer_wrapper.appendChild(note_preview);
	var imageIcon=document.createElement("img");
	imageIcon.dataset.keyNote=key_note;
	imageIcon.src=chrome.extension.getURL("/img/icons/note16.png");
	imageIcon.className="__myNotePointerIcon";
	note_pointer_wrapper.appendChild(imageIcon);
	var imageHiddenIcon=document.createElement("img");
	imageHiddenIcon.dataset.keyNote=key_note;
	imageHiddenIcon.src=chrome.extension.getURL("/img/hide.png");
	imageHiddenIcon.className="__myNotePointerHiddenIcon";
	imageHiddenIcon.id="__myNotePointerHiddenIcon_"+key_note;
	note_pointer_wrapper.appendChild(imageHiddenIcon);
	__mainWrapper.get().appendChild(note_pointer_wrapper);
}
function deleteNotePointer(key_note){
	$('__myNotePointerWrapper_'+key_note).remove();
}
function adjustNotePointer(key_note){
//adjust the high when the note is moved of when the page is resized
	var note_pointer_wrapper=$('__myNotePointerWrapper_'+key_note);
	if(note_pointer_wrapper){
		var body=document.body, html=document.documentElement;
		var pageHeight=Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
		var visibleHeight=window.innerHeight||html.clientHeight||body.clientHeight||0;
		var text=$("__myNoteText_"+key_note);
		if(parseInt(text.dataset.pinned, 10)===1){
			note_pointer_wrapper.style.display="none";
		}else{
			var container=$("__myNote_"+key_note);
			var note_top=parseInt(container.style.top, 10);
			var note_pointer_top=((((note_top*100)/pageHeight)*visibleHeight)/100); //8 is half the height of the element itself
			note_pointer_wrapper.style.top=note_pointer_top+"px";
			note_pointer_wrapper.dataset.noteTop=note_top;
			note_pointer_wrapper.style.display="block";
			//is the note hidden ? if so, show the icon overlapped
			var hidden_icon=$("__myNotePointerHiddenIcon_"+key_note);
			if(container.classList.contains("__myNoteWrapperHidden")){
				hidden_icon.style.display="block";
			}else{
				hidden_icon.style.display="none";
			}
			var text=$("__myNoteText_"+key_note);
			$('__myNotePointerPreview_'+key_note).childNodes[0].nodeValue=truncateString(text.value, 45);
		}
	}
}
function adjustNotePointers(){
	var elem=document.getElementsByClassName('__myNoteWrapper');
	var elength=elem.length;
	for(var i=0; i<elength; i++){
		var key_note=elem[i].dataset.keyNote;
		adjustNotePointer(key_note);
	}
}
//end pointer
function minimizeNote(key_note){
	var container=$("__myNote_"+key_note);
	var minMaxBtn=$("__myNoteMinMax_"+key_note);
	var text=$("__myNoteText_"+key_note);
	console.trace();
	if(parseInt(text.dataset.minimized, 10)===1){
		minMaxBtn.attr({
			src: chrome.extension.getURL("/img/minimize.png"),
			title: i18n('noteMinimize')
		});
		text.dataset.minimized='0';
		container.classList.remove('__myNoteWrapperMinimized');
	}else{
		minMaxBtn.attr({
			dataset: {
				width: parseInt(container.offsetWidth, 10),
				height: parseInt(container.offsetHeight, 10)
			},
			src: chrome.extension.getURL("/img/maximize.png"),
			title: i18n('noteMaximize')
		});
		text.dataset.minimized='1';
		container.classList.add('__myNoteWrapperMinimized');
	}
	__settings.hide(key_note);
}
function pinNote(key_note){
	//add a class to it
	//make it FIXES
	//the TOP should be:
	// - SETTING AS PIN: current position - scrolling
	// - REMOVING PIN: current position + scrolling
	var container=$("__myNote_"+key_note);
	var pinnedBtn=$("__myNotePinned_"+key_note);
	var text=$("__myNoteText_"+key_note);
	var is_pinned=parseInt(text.dataset.pinned, 10)===1;
	if(!is_pinned){
		//pin the note
		container.style.top=(parseInt(container.style.top, 10)-window.pageYOffset)+"px";
		container.style.left=(parseInt(container.style.left, 10)-window.pageXOffset)+"px";
		container.style.position="fixed";
		pinnedBtn.src=chrome.extension.getURL("/img/pin-red.png");
		pinnedBtn.title=i18n('notePinned');
		text.dataset.pinned="1";
		container.className+=' __myNoteWrapperPinned';
	}else{
		//remove pin
		container.style.top=(parseInt(container.style.top, 10)+window.pageYOffset)+"px";
		container.style.left=(parseInt(container.style.left, 10)+window.pageXOffset)+"px";
		container.style.position="absolute";
		pinnedBtn.src=chrome.extension.getURL("/img/pin-black.png");
		pinnedBtn.title=i18n('noteNotPinned');
		text.dataset.pinned="0";
		container.className=container.className.replace(/\b\s*__myNoteWrapperPinned\b/g, '');
	}
	__settings.reposition();
}
function readyToSave(key_note, save_when){
	if(typeof save_when==='undefined'){
		save_when=1000;
	}else if(save_when===true){
		save_when=1;
	}
	startSaving(key_note, save_when);
}
function isSaving(key_note){
	let ret=false;
	if(typeof saveTimeout[key_note]!=='undefined'&&saveTimeout[key_note]){
		ret=true;
	}else{
		var tmp=$("__myNote_"+key_note);
		if(tmp&&tmp.classList.contains('__myNoteSaving')){
			ret=true;
		}
	}
	return ret;
}
function startSaving(key_note, saveDelay, callback){
	//if it was already saving.. stop it
	$("__myNote_"+key_note).classList.add('__myNoteSaving');
	stopSaving(key_note);
	//after X seconds of inactivity, autosave
	//lock this note so that any incoming changes won't change the current note (weird behaviour..)
	saveTimeout[key_note]=setTimeout(function (){
		delete(saveTimeout[key_note]);
		saveNote(key_note);
		var lockFor=3000;//how long to wait before applying new upcoming changes
		if(saveDelay===0){
			lockFor=0;
		}
		if(typeof lockTimeout[key_note]!=='undefined'&&lockTimeout[key_note]){
			clearTimeout(lockTimeout[key_note]);
		}
		lockTimeout[key_note]=setTimeout(function (){
			delete(lockTimeout[key_note]);
			var tmp=$("__myNote_"+key_note);
			if(tmp&&tmp.classList){
				tmp.classList.remove('__myNoteSaving');
			}
			if(typeof callback==='function'){
				callback(key_note);
			}
		}, lockFor);
	}, saveDelay);
}
function stopSaving(key_note){
	if(typeof saveTimeout[key_note]!=='undefined'&&saveTimeout[key_note]){
		clearTimeout(saveTimeout[key_note]);
	}
}
function hideNotesByChannels(){
	//if a note has no channels, always show it
	//if the channels' notes are ALL hidden, the hide this note too
	sendMessage({
		'action': 'getShowingChannels'
	}, function (selectedChannels){
		//for every note in this page
		//grab the channels and check if they are hidden
		var elem=document.getElementsByClassName('__myNoteWrapper');
		var elength=elem.length;
		var elem_to_remove=[];
		for(var i=0; i<elength; i++){
			var e=elem[i];
			var isShare=parseInt(e.dataset.isShare, 10);
			//shares should not be hidden, no matter the channels that they are in
			if(isShare===0){
				if(!shouldShowByChannel(JSON.parse(e.dataset.channels), selectedChannels)){
					elem_to_remove.push(e);
				}
			}
		}
		for(var i in elem_to_remove){
			__stickys.clearFromPage(elem_to_remove[i].dataset.keyNote);
		}
	});
}
function shouldShowByChannel(note_channels, selectedChannels){
	//only remove if the note has at least one channel
	var remove=false;
	if(note_channels&&note_channels.length>0){
		remove=true;//assume that we should remove it
		for(var k in note_channels){
			var channel_id=note_channels[k].id;
			var visible=(typeof selectedChannels[channel_id]!=='undefined'&&selectedChannels[channel_id]===true);
			if(visible){
				remove=false;
				break;
			}
		}
	}
	return !remove;
}
function hideNotes(key_note){
	var elem=document.getElementsByClassName('__myNoteWrapper');
	var elength=elem.length;
	for(var i=0; i<elength; i++){
		var e=elem[i], this_key_note=e.dataset.keyNote;
		if(typeof key_note==='undefined'||this_key_note===key_note){
			e.classList.add("__myNoteWrapperHidden");
		}
	}
	//let's fix the pointers
	if(typeof key_note==='undefined'){
		adjustNotePointers();
	}else{
		adjustNotePointer(key_note);
	}
}
function showNotes(key_note){
	var elem=document.getElementsByClassName('__myNoteWrapper');
	var elength=elem.length;
	for(var i=0; i<elength; i++){
		var e=elem[i], this_key_note=e.dataset.keyNote;
		if(typeof key_note==='undefined'||this_key_note===key_note){
			e.classList.remove("__myNoteWrapperHidden");
		}
	}
//let's fix the pointers
	if(typeof key_note==='undefined'){
		adjustNotePointers();
	}else{
		adjustNotePointer(key_note);
	}
}
function updatePreview(key_note){
	var para=$("__myNotePreview_"+key_note);
	var text=$("__myNoteText_"+key_note);
	var elem=text.value.split(/[\r\n]+/);
	var elength=elem.length;
	//empty the previously loaded shares
	var sticky_type=text.dataset.stickyType;
	if(typeof sticky_type==='undefined'&&sticky_type!=='todo'&&sticky_type!=='json'||(text.data('hasPassword')==='1'&&(typeof text.data('unlocked')==='undefined'||!text.data('unlocked')))){
		sticky_type='normal';
	}
	switch(sticky_type){
		case "todo":
			//this is a TO-DO
			para.empty();
			var is_shared=(parseInt(text.dataset.isShare, 10)===1);
			var todos=text.dataset.todos;
			if(todos.length<elength){
				//add extra checks
				todos=todos+(new Array(elength-todos.length+1).join("0"));
			}else if(todos.length>elength){
				//remove the extra checks ?
				//let's leave them for now
			}
			text.dataset.todos=todos;
			var checks=todos.split('');
			for(var i=0; i<elength; i++){
				var e=elem[i];
				if(e.trim()!==''){
					var wrapper=createElement('label', {
						className: "__myNotePreviewCheckboxWrapper",
						id: "__myNotePreviewCheckboxWrapper_"+i,
						onclick: function (evt){
							stopEvent(evt);
						}
					});
					var cbox=createElement('input', {
						type: "checkbox",
						className: "__myNotePreviewCheckbox",
						data: {
							idx: i,
							keyNote: key_note
						}
					});
					if((parseInt(checks[i], 10)===1)){
						wrapper.style.textDecoration="line-through";
						cbox.checked=true;
					}
					if(is_shared){
						cbox.setAttribute('disabled', true);
					}else{
						cbox.onclick=function (evt){
							stopEvent(evt);
							var i=this.dataset.idx;
							var key_note=this.dataset.keyNote;
							var text=$("__myNoteText_"+key_note);
							var checks=text.dataset.todos.split("");
							var elem=$(this).parent();
							if(this.checked){
								elem.style.textDecoration="line-through";
								checks[i]="1";
							}else{
								elem.style.textDecoration="none";
								checks[i]="0";
							}
							text.dataset.todos=checks.join("");
							readyToSave(key_note, true);
						};
					}
					wrapper.appendChild(cbox);
					wrapper.appendChild(document.createTextNode(e));
					para.appendChild(wrapper);
				}
			}
			para.data({
				oldInnerHTML: ''
			});
			break;
		case 'json':
			para.empty();
			var value=text.value;
			var error=false;
			try{
				value=JSON.stringify(JSON.parse(value), null, "\t");
			}catch(e){
				//can't parse it as JSON
				value="JSON ERROR !!\n"+value;
				error=true;
			}
			if(!error){
				text.value=value;
			}
			para.appendChild(document.createTextNode(value));
			para.data({
				oldInnerHTML: ''
			});
			break;
		case 'video':
			var value=validateYouTubeUrl(text.value);
			if(value!==false){
				value=i18n('noteVideoEditInstructions')+'<br /><div class="__myNoteVideoContainer"><iframe width="853" height="480" src="'+value+'" frameborder="0" allowfullscreen></iframe></div>';
				//only update if old content is different than current content
				//else it stops the playback
				if(para.data('oldInnerHTML')!==value){
					para.attr({
						innerHTML: value,
						data: {
							oldInnerHTML: value
						}
					});
				}
			}else{
				para.empty();
				value="VIDEO ERROR !!\n"+text.value;
				para.appendChild(document.createTextNode(value));
			}
			break;
		default:
			var preview=htmlEntities(text.value);
			var value=urlize(preview, true);
			if(para.data('oldInnerHTML')!==value){
				para.empty();
				para.attr({
					innerHTML: value,
					data: {
						oldInnerHTML: value
					}
				});
				var lst=para.getElementsByTagName('a');
				for(var i=0; i<lst.length; ++i){
					lst[i].onclick=function (e){
						if(!e.ctrlKey){
							e.preventDefault();
						}
						return e.ctrlKey;
					};
					lst[i].title=i18n('previewLinkMouseOver');
				}
			}
	}
}
function updateTagsOnNote(key_note){
	var container=$('__myNote_'+key_note);
	var list=$('__myNoteTagsList_'+key_note);
	if(!list){
		var elem=$('__myNoteTags_'+key_note);
		var list=createElement('span', {
			id: '__myNoteTagsList_'+key_note,
			className: '__myNoteTagsList'
		});
		elem.appendChild(list);
	}else{
		//empty the list
		list.empty();
	}
	var tags=JSON.parse(container.dataset.tags);
	if(Object.keys(tags).length>0){
		var final_tags=[];
		for(var i in tags){
			final_tags.push(tags[i].tag);
		}
		list.appendChild(document.createTextNode(final_tags.join(', ')));
	}
}
function is_typing(key_note, set){
	var textarea=$('__myNoteText_'+key_note);
	if(typeof set==='undefined'){
		return (textarea.dataset.typing>0);
	}else{
		if(textarea.dataset.typing){
			clearTimeout(textarea.dataset.typing);
		}
		textarea.dataset.typing=setTimeout(function (){}, 3000);
	}
}