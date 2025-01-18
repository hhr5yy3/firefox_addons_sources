var __useChromeStorage=!!(chrome&&chrome.storage);
var __storage={
	storage: chrome?chrome.storage.local:false,
	get: function (key, callback){
		//I always need to use localstorage for back compatibility
		//if found, I need to remove it and convert it to set
		var ret=localStorage.getItem(key);
		if(!__useChromeStorage){
			if(typeof callback=='function'){
				callback(ret);
			}
		}else if(ret){
			localStorage.removeItem(key);
			this.set(key, ret, function (){
				callback(ret);
			});
		}else{
			this.storage.get(key, function (ret){
				if(typeof ret[key]=='undefined'){
					ret[key]=null;
				}
				callback(ret[key]);
			});
		}
		return this;
	},
	set: function (k, value, callback){
		if(!__useChromeStorage){
			localStorage.setItem(k, value);
			if(typeof callback=='function'){
				callback();
			}
		}else{
			var obj={};
			obj[k]=value;
			this.storage.set(obj, callback);
		}
		return this;
	},
	remove: function (key, callback){
		if(!__useChromeStorage){
			localStorage.removeItem(key);
			if(typeof callback=='function'){
				callback();
			}
		}else{
			this.storage.remove(key, callback);
		}
		return this;
	},
	size: function (callback){
		if(!__useChromeStorage){
			if(typeof callback=='function'){
				callback();
			}
		}else{
			this.storage.getBytesInUse(callback);
		}
		return this;
	},
	empty: function (callback){
		this.storage.clear(callback);
	},
	getKeys: function (callback){
		if(!__useChromeStorage){
			callback(Object.keys(localStorage));
		}else{
			this.storage.get(null, function (elems){
				if(elems==null){
					elems={};
				}
				callback(Object.keys(elems));
			});
		}
	}
};