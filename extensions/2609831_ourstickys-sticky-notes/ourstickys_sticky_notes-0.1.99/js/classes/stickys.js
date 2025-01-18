/*
 * this class will keep track of the stickys currently visible on the page
 */
'use strict';
var __stickys={
	stickys: {},
	currentTabId: 0,
	length: 0,
	add: function (options){
		let sticky=new __sticky(options);
		let key_note='';
		if(sticky.create()){
			this.length++;
			__stickys.updateBadgeText();
			key_note=sticky.option('key_note');
			this.stickys[key_note]=sticky;
		}else{
			key_note=sticky.option('key_note');
		}
		return key_note;
	},
	clearFromPage: function (key_note){
		//clear notes from the page without deleting them
		if(typeof key_note==='undefined'){
			//clear them all
			for(var i in this.stickys){
				this.stickys[i].clearFromPage();
				delete(this.stickys[i]);
			}
			this.length=0;
		}else if(this.exists(key_note)){
			this.stickys[key_note].clearFromPage();
			delete(this.stickys[key_note]);
			this.length--;
		}
		this.updateBadgeText();
	},
	createNote: function (text, xpath, coordinates, info, size, extras, key_note, sticky_id){
		var options={
			channels: extras['channels'],
			coordinates: coordinates,
			date_added: extras['date_added'],
			expires: extras['expires'],
			font_size: extras['font_size'],
			info: info,
			is_share: (typeof extras['shared']!=='undefined'),
			is_channel: (typeof extras['is_channel']!=='undefined'&&extras['is_channel']===true),
			key_note: key_note,
			minimized: extras['minimized'],
			password: extras['password'],
			pinned: extras['pinned'],
			shares: extras['shares'],
			shared: (typeof extras['shared']==='undefined')?false:extras['shared'],
			shadow: '__myNoteShadow'+(Math.floor(Math.random()*(106-101)+101).toString().substr(1, 2)),
			show_shadow: typeof extras['show_shadow']==='undefined'||!!extras['show_shadow'],
			size: size,
			sticky_id: sticky_id,
			sticky_level: extras['sticky_level'],
			sticky_type: extras['sticky_type'],
			tags: extras['tags'],
			text: text,
			theme: extras['theme'],
			todos: extras['todos'],
			xpath: xpath
		};
		if(!__stickys.exists(key_note)){
			__stickys.add(options);
		}else{
			__stickys.update(key_note, options);
		}
	},
	empty: function (){
		for(var i in this.stickys){
			this.stickys[i].delete();
			delete(this.stickys[i]);
		}
		this.length=0;
		this.updateBadgeText();
		return this;
	},
	clearPage: function(){
		for(var i in this.stickys){
			delete(this.stickys[i]);
		}
		this.length=0;
		return this;
	},
	exists: function (key_note){
		return (this.stickys[key_note]!==undefined);
	},
	getSticky: function (key_note){
		let ret;
		if(this.exists(key_note)){
			ret=this.stickys[key_note];
		}else{
			ret=null;
		}
		return ret;
	},
	refresh: function (key_note){
		if(this.exists(key_note)){
			this.stickys[key_note].refresh();
		}
		return this;
	},
	refresh_all: function (){
		for(var i in this.stickys){
			this.stickys[i].refresh();
		}
		return this;
	},
	remove: function (key_note){
		if(this.exists(key_note)){
			this.stickys[key_note].delete(function (){
				__stickys.updateBadgeText();
			});
			delete(this.stickys[key_note]);
			this.length--;
		}else{
			this.updateBadgeText();
		}
		return this;
	},
	update: function (key_note, options){
		if(this.exists(key_note)){
			this.stickys[key_note].set_options(options).create();
		}
		return this;
	},
	updateBadgeText: function (){
		sendMessage(
				{
					action: 'setBadgeText',
					value: (this.length>0?this.length:"").toString(),
					url: document.location.href
				},
				function (response){
				});
	}
};