var __loadedSkeleton={
	notesTimeout: 3600, //in seconds
	localStorageVar: {
		expires: '',
		notes: ''
	},
	_timeout: function (){
		return parseInt(new Date().getTime()/1000, 10);
	},
	_get: function (suffix, callback){
		var thisObj=this;
		__storage.get(this.localStorageVar.expires+suffix, function (tmp_expires){
			var expires=0;
			if(tmp_expires===null){
				//never set to start with
				expires=thisObj._timeout()+100;
			}else{
				expires=parseInt(tmp_expires, 10);
			}
			var isLogged=__OurStickys.authenticated.get();
			var notes=false;
			if(isLogged&&(isNaN(expires)||expires===0||expires<thisObj._timeout())){
				notes=false;
				if(typeof callback=='function'){
					callback(notes);
				}
			}else{
				__storage.get(thisObj.localStorageVar.notes+suffix, function (notes){
					if(notes===null){
						notes=false;
					}
					if(typeof callback=='function'){
						callback(notes);
					}
				});
			}
		});
		return this;
	},
	_set: function (suffix, notes){
		var expires=0;
		if(notes!==''){
			expires=this._timeout()+this.notesTimeout;
		}
		__storage.set(this.localStorageVar.notes+suffix, notes);
		__storage.set(this.localStorageVar.expires+suffix, expires);
		return this;
	},
	_update: function (suffix, note_key, note, callback){
		var thisObj=this;
		this._get(suffix, function (notes){
			var udpated=false;
			if(notes===false){
				notes='{}';
			}
			var t=JSON.parse(notes);
			if(typeof t[note_key]==='undefined'||!Object.compare(t[note_key], note)){
				//only update if they are different
				t[note_key]=note;
				thisObj._set(suffix, JSON.stringify(t));
				udpated=true;
			}
			if(typeof callback=='function'){
				callback(udpated);
			}
		});
		return this;
	},
	_updateBulk: function (suffix, notes, callback){
		var thisObj=this;
		this._get(suffix, function (oldNotes){
			var udpated=false;
			if(notes===false){
				notes='{}';
			}
			var t=JSON.parse(oldNotes);
			for(var note_key in notes){
				var note=notes[note_key];
				if(typeof t[note_key]==='undefined'||!Object.compare(t[note_key], note)){
					//only update if they are different
					t[note_key]=note;
					udpated=true;
				}
				if(udpated){
					thisObj._set(suffix, JSON.stringify(t));
				}
			}
			if(typeof callback=='function'){
				callback(udpated);
			}
		});
		return this;
	},
	_remove: function (suffix, note_key, callback){
		var thisObj=this;
		this._get(suffix, function (notes){
			var udpated=false;
			if(notes!==false){
				//can't do much if the notes in memory are expired
				//but it should not happen
				var t=JSON.parse(notes);
				if(typeof t[note_key]!=='undefined'){
					delete(t[note_key]);
					thisObj._set(suffix, JSON.stringify(t));
					udpated=true;
				}
			}
			if(typeof callback=='function'){
				callback(udpated);
			}
		});
		return this;
	},
	_empty: function (suffix){
		if(typeof suffix==='undefined'){
			var thisObj=this;
			__storage.getKeys(function (elems){
				for(var k in elems){
					if(elems[k].indexOf(thisObj.localStorageVar.notes)===0){
						//found it, let's get the suffix
						suffix=elems[k].substring(thisObj.localStorageVar.notes.length);
						thisObj._empty(suffix);
					}
				}
			});
		}else{
			//empty them all
			this._set(suffix, '');
		}
		return this;
	},
	_delete: function (suffix){
		if(typeof suffix==='undefined'){
			//delete them all
			var thisObj=this;
			__storage.getKeys(function (elems){
				for(var k in elems){
					if(elems[k].indexOf(thisObj.localStorageVar.notes)===0){
						//found it, let's get the channel_id
						suffix=elems[k].substring(thisObj.localStorageVar.notes.length);
						thisObj._delete(suffix);
					}
				}
			});
		}else{
			__storage.remove(this.localStorageVar.notes+suffix);
			__storage.remove(this.localStorageVar.expires+suffix);
		}
		return this;
	},
	get: function (callback){
		return this._get('', callback);
	},
	set: function (notes){
		return this._set('', notes);
	},
	update: function (note_key, note, callback){
		return this._update('', note_key, note, callback);
	},
	updateBulk: function (note, callback){
		return this._updateBulk('', note, callback);
	},
	remove: function (note_key, note, callback){
		return this._remove('', note_key, note, callback);
	},
	empty: function (){
		return this._empty('');
	},
	delete: function (){
		return this._delete('');
	}
};

var loadedNotes=__cloneObject(__loadedSkeleton);
loadedNotes.localStorageVar={
	expires: 'loadedNotesExpires',
	notes: 'loadedNotes'
};
loadedNotes.get=function (callback){
	return this._get('', function (notes){
		if(notes==false){
			__storage.get('myNotes', function (notes){
				if(notes===null){
					notes=false;
				}else{
					//old key found.... removed on 2017-01-20
					//found old notes.. let's convert them to the new system
					loadedNotes.set(notes);
					__storage.remove('myNotes')
				}
				callback(notes);
			});
		}else{
			callback(notes);
		}
	});
};

var loadedShares=__cloneObject(__loadedSkeleton);
loadedShares.localStorageVar={
	expires: 'loadedSharedNotesExpires',
	notes: 'loadedSharedNotes'
};

var loadedChannels=__cloneObject(__loadedSkeleton);
loadedChannels.localStorageVar={
	expires: 'loadedChannelsExpires',
	notes: 'loadedChannels'
};
loadedChannels.remove=function (channel_id, callback){
	return this.get(function (channels){
		var udpated=false;
		if(channels!==false){
			//can't do much if the channels in memory are expired
			//but it should not happen
			var t=JSON.parse(channels);
			for(var i in t){
				var c=t[i];
				if(c.channel_id){
					c.id=c.channel_id;
				}
				if(c.id===channel_id){
					t.splice(i, 1);
					loadedChannels.set(JSON.stringify(t));
					udpated=true;
					break;
				}
			}
		}
		if(typeof callback=='function'){
			callback(udpated);
		}
	});
};
loadedChannels.update=function (channel_id, channel, callback){
	var udpated=false;
	return this.get(function (channels){
		if(channels===false){
			channels='{}';
		}
		var t=JSON.parse(channels);
		var found=false;
		for(var i in t){
			if(t[i].id===channel_id){
				t[i]=channel;
				found=true;
				break;
			}
		}
		if(found===false){
			t.push(channel);
		}
		loadedChannels.set(JSON.stringify(t));
		udpated=true;
		if(typeof callback=='function'){
			callback(udpated);
		}
	});
};

var loadedChannelStickys=__cloneObject(__loadedSkeleton);
loadedChannelStickys.localStorageVar={
	expires: 'loadedChannelStickysExpires_',
	notes: 'loadedChannelStickys_'
};
loadedChannelStickys.get=function (channel_id, callback){
	return this._get(channel_id, callback);
};
loadedChannelStickys.set=function (channel_id, notes){
	//if any of the sticky_ids is already in loadNotes then I won't need to store it here
	loadedNotes.get(function (loaded){
		if(loaded&&notes){
			let new_notes=JSON.parse(notes);
			let new_loaded=JSON.parse(loaded);
			let final_notes={};
			for(var i in new_notes){
				if(!new_loaded[i]){
					final_notes[i]=new_notes[i];
				}
			}
			notes=JSON.stringify(final_notes);
		}
		loadedChannelStickys._set(channel_id, notes);
	});
	return this
};
loadedChannelStickys.update=function (channel_id, note_key, note, callback){
	return this._update(channel_id, note_key, note, callback);
};
loadedChannelStickys.empty=function (channel_id){
	return this._empty(channel_id);
};
loadedChannelStickys.delete=function (channel_id){
	return this._delete(channel_id);
};
loadedChannelStickys.remove=function (channel_id, note_key, callback){
	return this._remove(channel_id, note_key, callback);
};


function __cloneObject(from, to){
	//http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
	if(from==null||typeof from!="object"){
		return from;
	}
	if(from.constructor!=Object&&from.constructor!=Array){
		return from;
	}
	if(from.constructor==Date||from.constructor==RegExp||from.constructor==Function||
			from.constructor==String||from.constructor==Number||from.constructor==Boolean){
		return new from.constructor(from);
	}

	to=to||new from.constructor();

	for(var name in from){
		to[name]=typeof to[name]=="undefined"?__cloneObject(from[name], null):to[name];
	}
	return to;
}