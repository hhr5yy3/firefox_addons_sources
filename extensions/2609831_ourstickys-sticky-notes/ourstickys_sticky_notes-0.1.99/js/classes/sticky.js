'use strict';
class __sticky {
	constructor(options){
		this._set_defaults();
		this.set_options(options);
		if(typeof options.key_note==='undefined'){
			this.set_options({
				newlyCreated: true
			});
		}
	}

	charCount(){
		var str=this._options['text'];
		// returns the byte length of an utf8 string
		var b=str.match(/[^\x00-\xff]/g);
		return (str.length+(!b?0: b.length));
	}
	clearFromPage(){
		__settings.hide();
		let obj=this.option('object');
		if(obj){
			obj.remove();
			deleteNotePointer(this.option('key_note'));
		}
	}
	create(){
		let ret=false;
		let container=$("__myNote_"+this._options['key_note']);
		if(!container){
			ret=true;
			let shadowClass=this._options['shadow'];
			if(typeof this._options['show_shadow']==='undefined'||!this._options['show_shadow']||isFirefox){
				shadowClass='';
			}
			container=createElement('div', {
				id: "__myNote_"+this._options['key_note'],
				className: "__myNoteWrapper "+shadowClass,
				dataset: {
					keyNote: this._options['key_note'],
					isShare: 0,
					isChannel: 0
				}
			});
			this.set_options({
				object: container
			});
			let content=createElement('div', {
				className: "__myNoteContent"
			});
			let textarea=createElement("textarea", {
				id: "__myNoteText_"+this._options['key_note'],
				className: "__myNoteText",
				dataset: {
					stickyId: this._options['sticky_id'],
					keyNote: this._options['key_note'],
					info_id: this._options['info']['id'],
					info_class: this._options['info']['class'],
					info_html: this._options['info']['html'],
					dateAdded: this._options['date_added'],
					isShare: 0,
					isChannel: 0,
					typing: 0
				},
				style: {
					display: 'none'
				}
			});
			let para=createElement('span', {
				id: "__myNotePreview_"+this._options['key_note'],
				className: "__myNotePreview",
				dataset: {
					keyNote: this._options['key_note']
				}
			});
			let imageIcon=createElement("img", {
				src: chrome.extension.getURL("/img/icons/note16.png"),
				className: "__myNoteIcon",
				ondragstart: function (){
					return false;
				}
			});
			let imagePinned=createElement("img", {
				id: "__myNotePinned_"+this._options['key_note'],
				title: i18n('noteNotPinned'),
				src: chrome.extension.getURL("/img/pin-black.png"),
				className: "__myNotePinnedIcon",
				ondragstart: function (){
					return false;
				},
				dataset: {
					keyNote: this._options['key_note'],
					status: '0'
				},
				onclick: function (e){
					stopEvent(e);
					var key_note=this.dataset.keyNote;
					pinNote(key_note);
					readyToSave(key_note, 500);
					adjustNotePointer(key_note);
				}
			});
			let imageMinMax=createElement("img", {
				id: "__myNoteMinMax_"+this._options['key_note'],
				title: i18n('noteMinimize'),
				src: chrome.extension.getURL("/img/minimize.png"),
				className: "__myNoteMinMaxIcon",
				ondragstart: function (){
					return false;
				},
				dataset: {
					keyNote: this._options['key_note'],
					status: 'expanded'
				},
				onclick: function (e){
					stopEvent(e);
					var key_note=this.dataset.keyNote;
					minimizeNote(key_note);
					readyToSave(key_note, 500);
				}
			});
			let imageDelete=createElement("img", {
				id: "__myNoteDelete_"+this._options['key_note'],
				title: i18n('noteDelete'),
				src: chrome.extension.getURL('/img/delete.gif'),
				className: "__myNoteDeleteIcon",
				ondragstart: function (){
					return false;
				},
				dataset: {
					keyNote: this._options['key_note'],
					isShare: 0
				},
				onclick: function (e){
					stopEvent(e);
					var key_note=this.dataset.keyNote;
					var is_shared=(parseInt(this.dataset.isShare, 10)===1);
					__confirm(
							i18n(is_shared?"questionDeleteSharedNote":"questionDeleteNote"),
							function (){
								__stickys.remove(key_note);
							}
					);
				}
			});
			let imageSettings=createElement("img", {
				id: "__myNoteSettings_"+this._options['key_note'],
				title: i18n('noteSettings'),
				src: chrome.extension.getURL("/img/settings.png"),
				className: "__myNoteSettingsIcon",
				ondragstart: function (){
					return false;
				},
				dataset: {
					keyNote: this._options['key_note']
				},
				onclick: function (e){
					stopEvent(e);
					var key_note=this.dataset.keyNote;
					__settings.create(key_note);
				}
			});
			let header=createElement("span", {
				id: "__myNoteHeader_"+this._options['key_note'],
				className: "__myNoteHeader",
				dataset: {
					keyNote: this._options['key_note']
				}
			});
			let resizer=createElement('img', {
				id: "__myNoteResizer_"+this._options['key_note'],
				src: chrome.extension.getURL('/img/resizeCorner.gif'),
				title: i18n('noteResize'),
				className: "__myNoteResizerIcon",
				dataset: {
					keyNote: this._options['key_note']
				}
			});
			let tags=createElement('div', {
				id: "__myNoteTags_"+this._options['key_note'],
				className: "__myNoteTagsContainer",
				dataset: {
					keyNote: this._options['key_note']
				}
			});
			let imageTags=createElement('img', {
				id: "__myNoteOpenTags_"+this._options['key_note'],
				title: i18n('settingsTagButton'),
				src: chrome.extension.getURL("/img/tag.png"),
				className: "__myNoteTagIcon",
				ondragstart: function (){
					return false;
				},
				dataset: {
					keyNote: this._options['key_note']
				},
				onclick: function (e){
					stopEvent(e);
					var key_note=this.dataset.keyNote;
					__settings.create(key_note, 'tags');
				}
			});
			container.appendChildren([
				content,
				resizer
			]);
			content.appendChildren([
				header,
				textarea,
				para,
				tags
			]);
			header.appendChildren([
				imageDelete,
				imageSettings,
				imageIcon,
				imageMinMax,
				imagePinned
			]);
//			para.appendChild(document.createTextNode(""));
			tags.appendChild(imageTags);
			__mainWrapper.get().appendChild(container);
			if(this._options['is_share']){
				var imageShared=createElement("img", {
					id: "__myNoteSharedIcon_"+this._options['key_note'],
					title: i18n('noteShared', this._options['shared']['from']),
					src: chrome.extension.getURL("/img/shared.png"),
					className: "__myNoteSharedIcon"
				});
				header.appendChild(imageShared);
				imageDelete.dataset.isShare=1;
				container.dataset.isShare=1;
				textarea.attr({
					dataset: {
						isShare: 1,
						shareId: this._options['shared']['id'],
						shareFrom: this._options['shared']['from']
					}
				});
			}else if(this._options['is_channel']){
				imageDelete.remove();
				textarea.dataset.isChannel=1;
				container.dataset.isChannel=1;
			}
			__resizable.start({
				handle: resizer,
				object: container,
				resize: function (){
					var key_note=$(this).data('keyNote');
					stopSaving(key_note);
				},
				resizing: function (){
//					__settings.reposition(); // ???
				},
				resized: function (){
					var key_note=$(this).data('keyNote');
					__stickys.getSticky(key_note).refresh_options();
					readyToSave(key_note, 500);
				}
			});
			__draggable.start({
				handle: header,
				object: container,
				drag: function (){
					var key_note=$(this).data('keyNote');
					stopSaving(key_note);
				},
				dragging: function (){
					__settings.reposition();
				},
				dragged: function (){
					var key_note=$(this).data('keyNote');
					__stickys.getSticky(key_note).refresh_options();
					readyToSave(key_note, 500);
				}
			});
			if(!this._options['is_share']&&!this._options['is_channel']){
				var show_text_event=function (e){
					stopEvent(e);
					var key_note=$(this).data('keyNote');
					var textarea=$("__myNoteText_"+key_note);
					//is this a password field?
					var has_password=parseInt(textarea.data('hasPassword'), 10)===1;
					var unlocked=textarea.data('unlocked');
					if(has_password&&(typeof unlocked==='undefined'||!!unlocked!==true)){
						let sticky_id=textarea.data('stickyId');
						let user_password=prompt(i18n('notePasswordPrompt'));
						checkStickyPassword(sticky_id, user_password, function (response){
							if(typeof response.status!=='undefined'&&response.status==='success'&&typeof response.text!=='undefined'){
								//all good...
								textarea.data({
									unlocked: true,
									password: user_password
								});
								$("__myNoteText_"+key_note).value=response.text;
								$("__myNotePreview_"+key_note).click();
								__settings.hide();
							}else{
								alert(i18n('notePasswordWrong'));
							}
						});
					}else{
						this.style.display="none";
						$("__myNote_"+key_note).style.zIndex=defaultZIndexFocus;
						var textarea=$("__myNoteText_"+key_note);
						textarea.style.display="block";
						textarea.focus();
					}
				};
				para.onclick=show_text_event;
				para.ondragenter=show_text_event;
				para.ondragover=show_text_event;
//				para.ondrop=show_text_event;
				textarea.attr({
					onkeydown: function (e){
						stopEvent(e);
					},
					onkeypress: function (e){
						stopEvent(e);
					},
					onkeyup: function (e){
						//max 5000 chars
						var key_note=this.dataset.keyNote;
						var thisSticky=__stickys.getSticky(key_note);
						var max_chars=5000;
						var curr_chars=thisSticky.charCount();
						var curr_val=this.value;
						var modified=false;
						if(curr_chars>max_chars){
							curr_val=curr_val.substring(0, max_chars);
							modified=true;
						}
						//and now let's remove the possible extra chars for UTF8 encoding
						while(max_chars<curr_chars){
							var diff=curr_chars-max_chars;
							curr_val=curr_val.substring(0, curr_val.length-Math.ceil(diff/2));
							curr_chars=thisSticky.charCount();
							modified=true
						}
						if(modified){
							this.value=curr_val;
						}
						thisSticky.set_options('text', curr_val);
						readyToSave(key_note, 1500);
						//update the char and word count
						updateWordsAndChars(key_note);
						//as long as typing == true, then I won't modify the text
						is_typing(key_note, true);
						stopEvent(e);
						e.preventDefault();
					},
					ondragenter: function (e){
						this.selectionStart=this.selectionEnd;
					},
					ondrop: function (e){
						var key_note=this.dataset.keyNote;
						readyToSave(key_note, 500);
						is_typing(key_note, true);
					},
					onchange: function (){
						var key_note=this.dataset.keyNote;
						readyToSave(key_note, 500);
						is_typing(key_note, true);
					},
					onfocus: function (){
						var key_note=this.dataset.keyNote;
						var container=$("__myNote_"+key_note);
						container.classList.add("__myNoteWrapperActive");
						is_typing(key_note, true);
					},
					onblur: function (){
						this.style.display="none";
						this.nextSibling.style.display="block";
						var key_note=this.dataset.keyNote;
						var container=$("__myNote_"+key_note);
						container.style.zIndex=defaultZIndex;
						container.classList.remove("__myNoteWrapperActive");
						updatePreview(key_note);
					}
				});
			}else{
				textarea.onchange=function (){};
			}
			createNotePointer(this._options['key_note']);
		}
		if(!container.classList.contains('__myNoteSaving')){
			let para=$("__myNotePreview_"+this._options['key_note']);
			let textarea=$("__myNoteText_"+this._options['key_note']);
			let imageShared=document.createElement("__myNoteSharedIcon_"+this._options['key_note']);
			container.classList.add('__myNoteWrapperUpdating');
			if(!is_typing(this._options['key_note'])){
				//the user is not typing in this note
				if(this._options['text']===''&&this._options['password']){
					textarea.value=i18n('notePasswordProtected');
				}else{
					textarea.value=this._options['text'];
				}
			}else{
				//the user is typing in this note... let's not update the text
			}

			//let's update it
			var obj_coordinates=this._options['coordinates'].obj;
			var page_coordinates=this._options['coordinates'].page;
			textarea.attr({
				dataset: {
					coord_o_x: obj_coordinates.x,
					coord_o_y: obj_coordinates.y,
					coord_p_x: page_coordinates.x,
					coord_p_y: page_coordinates.y,
					expires: this._options['expires'],
					fontSize: this._options['font_size'],
					hasPassword: this._options['password']?"1":"0",
					minimized: "0",
					pinned: "0",
					showShadow: this._options['show_shadow']?"1":"0",
					stickyLevel: this._options['sticky_level'],
					stickyType: this._options['sticky_type'],
					theme: this._options['theme'],
					todos: this._options['todos'],
					xpath: this._options['xpath']
				}
			});
			container.className=container.className.replace(/\b\s*__myNoteTheme_\d\d\b/, '')+" __myNoteTheme_"+this._options['theme'];
			if(this._options['is_share']){
				container.className+=" __myNoteWrapperShared";
				imageShared.title=i18n('noteShared', this._options['shared']['from']);
				container.dataset.shares=JSON.stringify([]);
			}else{
				container.dataset.shares=JSON.stringify(this._options['shares']);
			}
			//position on the page
//			if(use_page_coordinates){
			var mxy=[parseInt(page_coordinates.x, 10), parseInt(page_coordinates.y, 10)];
			var coords={
				'x': (mxy[0]),
				'y': (mxy[1])
			};
//			}else{
//				var txy=getPageXY(element);
//				var mxy=[parseInt(obj_coordinates.x, 10), parseInt(obj_coordinates.y, 10)];
//				var coords={
//					'x': (mxy[0]+txy[0]),
//					'y': (mxy[1]+txy[1])
//				};
//			}
			if(coords.y<0){
				coords.y=0;
			}
			if(coords.x<0){
				coords.x=0;
			}
			if(this._options.size.x<minDimensions.width){
				this._options.size.x=minDimensions.width
			}
			if(this._options.size.y<minDimensions.height){
				this._options.size.y=minDimensions.height
			}

			container.attr({
				dataset: {
					channels: JSON.stringify(this._options['channels']),
					tags: JSON.stringify(this._options['tags'])
				},
				style: {
					top: (coords.y)+"px",
					left: (coords.x)+"px",
					width: this._options.size.x+"px",
					height: this._options.size.y+"px"
				}
			});
			//font-size needs to be given as "important" or it might be overwritten
			textarea.style.setProperty('font-size', this._options['font_size']+"px", 'important');
			para.style.setProperty('font-size', this._options['font_size']+"px", 'important');
			if(this._options['minimized']){
				var old_style=container.style.display;
				container.style.display='none';
				minimizeNote(this._options.key_note);
				container.style.display=old_style;
			}
			if(this._options['pinned']){
				//the pinning will automatically remove the scrolling, so we are going to double it for now
				container.style.top=(parseInt(container.style.top, 10)+window.pageYOffset)+"px";
				container.style.left=(parseInt(container.style.left, 10)+window.pageXOffset)+"px";
				pinNote(this._options.key_note);
				if(parseInt(container.style.top, 10)>(window.innerHeight-30)){
					container.style.top=(window.innerHeight-container.offsetHeight-5)+"px";
				}
				if(parseInt(container.style.left, 10)>(window.innerWidth-30)){
					container.style.left=(window.innerWidth-container.offsetWidth-5)+"px";
				}
			}
			adjustNotePointer(this._options.key_note);
			updatePreview(this._options.key_note);
			updateTagsOnNote(this._options.key_note);
			if(!this._options.is_share&&!this._options.is_channel&&this._options.newlyCreated){
				readyToSave(this._options.key_note);
				para.click();
			}
			setTimeout(function (){
				container.classList.remove('__myNoteWrapperUpdating');
			}, 250);
		}
		this.set_options({
			newlyCreated: false
		});
		return ret;
	}
	delete(callback){
		var key_note=this._options['key_note'];
		$("__myNote_"+key_note).attr({
			style: {
				webkitTransition: '-webkit-transform 0.5s ease-in, opacity 0.5s ease-in',
				opacity: '0'
			}
		});
		//close settings if they were open for this note
		__settings.hide(key_note);
		//delete the pointer as well
		deleteNotePointer(key_note);
		var removeElement=function (){
			var elem=$("__myNote_"+key_note);
			elem.offsetTop; // Force style recalc
			setTimeout(function (){
				$(elem).remove();
				if(typeof callback==='function'){
					callback();
				}
			}, 1000);
		};
		if(this._options['is_share']){
			__background.deleteShared(this._options['key_note'], removeElement);
		}else{
			__background.deleteSticky(this._options['key_note'], removeElement);
		}
		return this;
	}
	option(key){
		return this._options[key];
	}
	refresh(){
		//TO-DO: I should check if anything has changed before executing this;
		this.delete().create();
		return this;
	}
	refresh_options(){
		var key_note=this._options['key_note'];
		//get all the options from the sticky DOM
		var container=$('__myNote_'+key_note);
		if(container){
			var elemWidth=parseInt(container.offsetWidth, 10);
			var elemHeight=parseInt(container.offsetHeight, 10);
			var textarea=$('__myNoteText_'+key_note);
			if(parseInt(textarea.dataset.minimized, 10)===1){
				let minMax=$('__myNoteMinMax_'+key_note);
				elemWidth=parseInt(minMax.dataset.width, 10);
				elemHeight=parseInt(minMax.dataset.height, 10);
				if(elemWidth<minDimensions.width){
					elemWidth=minDimensions.width
				}
				if(elemHeight<minDimensions.height){
					elemWidth=minDimensions.height
				}
			}
			var options={
				channels: JSON.parse(container.dataset.channels),
				coordinates: {
					'obj': {
						'x': parseInt(textarea.dataset.coord_o_x, 10),
						'y': parseInt(textarea.dataset.coord_o_y, 10)
					},
					'page': {
						'x': parseInt(textarea.dataset.coord_p_x, 10),
						'y': parseInt(textarea.dataset.coord_p_y, 10)
					}
				},
				expires: parseInt(textarea.dataset.expires, 10),
				font_size: parseInt(textarea.dataset.fontSize, 10),
				info: {
					id: parseInt(textarea.dataset.info_id, 10),
					class: parseInt(textarea.dataset.info_class, 10),
					html: parseInt(textarea.dataset.info_html, 10)
				},
				id: typeof textarea.dataset.stickyId==='undefined'?undefined:textarea.dataset.stickyId,
				is_share: false,
				is_channel: false,
				minimized: false,
				page: window.location.href,
				password: false,
				pinned: false,
				shares: JSON.parse(container.dataset.shares),
				shared: false,
				show_shadow: textarea.dataset.showShadow,
				size: {
					'x': elemWidth,
					'y': elemHeight
				},
				sticky_level: 'query',
				sticky_type: 'normal',
				tags: JSON.parse(container.dataset.tags),
				text: textarea.value,
				theme: textarea.dataset.theme,
				todos: '',
				xpath: textarea.dataset.xpath
			};
			if(textarea.dataset.stickyLevel!=='query'){
				options['sticky_level']=textarea.dataset.stickyLevel;
			}
			if(parseInt(textarea.dataset.minimized, 10)===1){
				options['minimized']=true;
			}
			if(parseInt(textarea.dataset.pinned, 10)===1){
				options['pinned']=1;
			}
			if(textarea.dataset.stickyType!=='normal'){
				options['sticky_type']=textarea.dataset.stickyType;
				if(textarea.dataset.todos.trim()!==''){
					options['todos']=textarea.dataset.todos;
				}
			}
			if(parseInt(textarea.dataset.isShare, 10)===1){
				options['is_share']=true;
				options['shared']={
					'id': textarea.dataset.shareId,
					'from': textarea.dataset.shareFrom
				};
			}
			if(parseInt(textarea.dataset.isChannel, 10)===1){
				options['is_channel']=true;
			}
			var has_password=parseInt(textarea.data('hasPassword'), 10)===1;
			var unlocked=textarea.data('unlocked');

			this.set_options(options);
		}
	}
	set_options(key, value){
		if(typeof key==='object'){
			for(var k in key){
				if(key[k]!==undefined){
					this._options[k]=key[k];
				}
			}
		}else if(value!==undefined){
			this._options[key]=value;
		}
		return this;
	}
	wordCount(){
		var str=this._options['text'];
		function extractSubstr(str, regexp){
			return str.replace(/[^\w\s]|_/g, '')
					.replace(/\s+/g, ' ')
					.toLowerCase().match(regexp)||[];
		}
		return extractSubstr(str, /\S+/g).length;
	}

	_set_defaults(){
		this._options={
			channels: [],
			coordinates: [],
			date_added: Date.now(),
			expires: 0,
			font_size: 12,
			info: {
				id: 0,
				class: 0,
				html: 0
			},
			is_share: false,
			is_channel: false,
			key_note: this._generateUUID(),
			minimized: false,
			newlyCreated: false,
			password: false,
			pinned: false,
			shares: [],
			shared: false,
			shadow: '__myNoteShadow'+(Math.floor(Math.random()*(106-101)+101).toString().substr(1, 2)),
			show_shadow: true,
			size: {
				x: 0,
				y: 0
			},
			sticky_id: '',
			sticky_level: 'query',
			sticky_type: 'normal',
			tags: [],
			text: '',
			theme: (Math.floor(Math.random()*(100+numThemes-101)+101).toString().substr(1, 2)),
			todos: '',
			xpath: ''
		};
		//let's set the size
		//let's check the screen size
		let width=parseInt(window.innerWidth
				||document.documentElement.clientWidth
				||document.body.clientWidth, 10);

		let height=parseInt(window.innerHeight
				||document.documentElement.clientHeight
				||document.body.clientHeight, 10);
		let x=Math.floor(width/7);
		let y=Math.floor(height/5);

		this._options.size={
			x: x>200?x:200,
			y: y>200?y:200
		};
		if(this._options.size.x<minDimensions['width']){
			this._options.size.x=minDimensions['width'];
		}
		if(this._options.size.y<minDimensions['height']){
			this._options.size.y=minDimensions['height'];
		}
	}
	_generateUUID(){
		var d=new Date().getTime();
		if(window.performance&&typeof window.performance.now==="function"){
			d+=performance.now(); //use high-precision timer if available
		}
		var uuid='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c){
			var r=(d+Math.random()*16)%16|0;
			d=Math.floor(d/16);
			return (c==='x'?r: (r&0x3|0x8)).toString(16);
		});
		return uuid;
	}
}