var __database={
	_options: {
		mainURL: apiPath,
		type: '',
		email: '',
		secret: '',
		auth: '',
		retry: {
			loadShares: 0,
			loadRecords: 0,
			loadChannels: 0,
			loadChannelStickys: 0
		}
	},
	setCredentials: function (type, email, secret){
		this._options['type']=type;
		this._options['email']=email;
		this._options['secret']=secret;
		this.setAuth('');
		return this;
	},
	setAuth: function (auth){
		this._options['auth']=auth;
		if(auth!==''){
			this._options['type']='';
			this._options['email']='';
			this._options['secret']='';
		}
		return this;
	},
	getAuth: function (){
		return this._options['auth'];
	},
	checkStickyPassword: function (sticky_id, password, callback){
		var params={
			password: password
		};
		var url=__database._options['mainURL']+'stickys/'+sticky_id+'/password';
		__ajax
				.method('POST')
				.params(params)
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				})
				;
	},
	loadShares: function (callback){
		var ret={};
		var url=__database._options['mainURL']+'shares?received';
		__ajax
				.method('GET')
				.headers(
						{
							'Authorization': 'bearer='+__database.getAuth(),
							"Pragma": "no-cache",
							"Cache-Control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
							"Expires": 0,
							"Last-Modified": new Date(0).toString().split('(')[0], // January 1, 1970
							"If-Modified-Since": new Date(0).toString().split('(')[0]
						}
				)
				.open(url, function (response, t){
					if(response&&typeof response.shares!=='undefined'){
						var ret={};
						for(var s in response.shares){
							//there is only one sticky per share..
							//there might be a better way to do this
							//I just don't know it :D
							for(var i in response.shares[s].sticky){
								var t=response.shares[s].sticky[i];
								t['id']=i;
								var note=__database.convertDataIntoNote(t);
								note['shared']={
									'id': response.shares[s]['id'],
									'from': response.shares[s]['from']['email']
								};
								ret[note.key]=note;
							}
						}
						//let's order by key
						var keys=Object.keys(ret), len=keys.length, result={};
						keys.sort();

						for(var c=0; c<len; c++){
							var k=keys[c];
							result[k]=ret[k];
						}
						callback(JSON.stringify(result));
						__database._options['retry']['loadShares']=0;
					}else{
						if(__database._options['retry']['loadShares']==3){
							callback('error');
							__database._options['retry']['loadShares']=0;
						}else{
							setTimeout(function (){
								__database.loadChannels(callback)
							}, 3000);
							__database._options['retry']['loadShares']++;
						}
					}
				})
				;
		return ret;
	},
	loadRecords: function (callback){
		var ret={};
		var url=__database._options['mainURL']+'stickys?include=all';
		__ajax
				.method('GET')
				.headers(
						{
							'Authorization': 'bearer='+__database.getAuth(),
							"Pragma": "no-cache",
							"Cache-Control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
							"Expires": 0,
							"Last-Modified": new Date(0).toString().split('(')[0], // January 1, 1970
							"If-Modified-Since": new Date(0).toString().split('(')[0]
						}
				)
				.open(url, function (response, t){
					if(response&&typeof response.stickys!=='undefined'){
						var ret={};
						for(var i in response.stickys){
							var t=response.stickys[i];
							t['id']=i;
							var note=__database.convertDataIntoNote(t);
							ret[note.key]=note;
						}
						//let's order by key
						var keys=Object.keys(ret), len=keys.length, result={};
						keys.sort();

						for(var c=0; c<len; c++){
							var k=keys[c];
							result[k]=ret[k];
						}
						callback(JSON.stringify(result));
						__database._options['retry']['loadRecords']=0;
					}else{
						if(__database._options['retry']['loadRecords']==3){
							callback('error');
							__database._options['retry']['loadRecords']=0;
						}else{
							setTimeout(function (){
								__database.loadChannels(callback)
							}, 3000);
							__database._options['retry']['loadRecords']++;
						}
					}
				})
				;
		return ret;
	},
	loadChannels: function (callback){
		var ret={};
		var url=__database._options['mainURL']+'channels?include=all';
		__ajax
				.method('GET')
				.headers(
						{
							'Authorization': 'bearer='+__database.getAuth(),
							"Pragma": "no-cache",
							"Cache-Control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
							"Expires": 0,
							"Last-Modified": new Date(0).toString().split('(')[0], // January 1, 1970
							"If-Modified-Since": new Date(0).toString().split('(')[0]
						}
				)
				.open(url, function (response, t){
					if(response&&typeof response.channels!=='undefined'){
						var result=response.channels;
						callback(JSON.stringify(result));
						__database._options['retry']['loadChannels']=0;
					}else{
						if(__database._options['retry']['loadChannels']==3){
							callback('error');
							__database._options['retry']['loadChannels']=0;
						}else{
							setTimeout(function (){
								__database.loadChannels(callback)
							}, 3000);
							__database._options['retry']['loadChannels']++;
						}
					}
				})
				;
		return ret;
	},
	loadChannelStickys: function (channel_id, callback){
		var ret={};
		var url=__database._options['mainURL']+'channels/'+channel_id+'/stickys?include=all';
		__ajax
				.method('GET')
				.headers(
						{
							'Authorization': 'bearer='+__database.getAuth(),
							"Pragma": "no-cache",
							"Cache-Control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
							"Expires": 0,
							"Last-Modified": new Date(0).toString().split('(')[0], // January 1, 1970
							"If-Modified-Since": new Date(0).toString().split('(')[0]
						}
				)
				.open(url, function (response, t){
					if(response&&typeof response.stickys!=='undefined'){
						for(var i in response.stickys){
							var t=response.stickys[i];
							t['id']=i;
							var note=__database.convertDataIntoNote(t);
							ret[note.key]=note;
						}
						//let's order by key
						var keys=Object.keys(ret), len=keys.length, result={};
						keys.sort();

						for(var c=0; c<len; c++){
							var k=keys[c];
							result[k]=ret[k];
						}
						callback(JSON.stringify(result));
						__database._options['retry']['loadChannelStickys']=0;
					}else{
						if(__database._options['retry']['loadChannelStickys']==3){
							callback('error');
							__database._options['retry']['loadChannelStickys']=0;
						}else{
							setTimeout(function (){
								__database.loadChannels(callback)
							}, 3000);
							__database._options['retry']['loadChannelStickys']++;
						}

					}
				})
				;
		return ret;
	},
	saveStickyPassword: function (sticky_id, password, old_password, callback){
		var params={
			password: password,
			old_password: old_password
		};
		var url=__database._options['mainURL']+'stickys/'+sticky_id+'/password';
		__ajax
				.method('PUT')
				.params(params)
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				})
				;
	},
	saveRecord: function (note, callback){
		var params={
			"fields": {
				"key": note['key'],
				"page": note['page'],
				"pagePositionX": note.coord.page['x'],
				"pagePositionY": note.coord.page['y'],
				"objPositionX": note.coord.obj['x'],
				"objPositionY": note.coord.obj['y'],
				"text": note['text'],
				"xpath": note['xpath'],
				"dimensionsH": note.size['x'],
				"dimensionsW": note.size['y'],
				"theme": note.extras['theme'],
				"fontSize": note.extras['font_size'],
				"dateAdded": parseInt(note.extras['date_added']/1000, 10),
				'expires': parseInt(note.extras['expires'], 10),
				"extras": {}
			}
		};
		if(note.extras['sticky_level']!=='query'){
			params['fields']['extras']['stickyLevel']=note.extras['sticky_level'];
		}
		if(parseInt(note.extras['minimized'], 10)===1){
			params['fields']['extras']['minimized']=1;
		}
		if(parseInt(note.extras['pinned'], 10)===1){
			params['fields']['extras']['pinned']=1;
		}
		if(typeof note.extras['sticky_type']!=='undefined'&&note.extras['sticky_type']!=="normal"){
			params['fields']['extras']['stickyType']=note.extras['sticky_type'];
			if(typeof note.extras['todos']!=='undefined'&&note.extras['todos'].trim()!==""){
				params['fields']['extras']['todos']=note.extras['todos'].trim();
			}
		}
		if(typeof note.extras['show_shadow']!=='undefined'&&!note.extras['show_shadow']){
			params['fields']['extras']['showShadow']=note.extras['show_shadow'];
		}
		params['fields']['extras']=JSON.stringify(params['fields']['extras']);
		var url=__database._options['mainURL']+'stickys';
		if(typeof note['id']!=='undefined'){
			//update
			url+='/'+note['id'];
			__ajax.method('PUT');
		}else{
			//insert
			__ajax.method('POST');
		}
		__ajax
				.params(params)
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				})
				;
	},
	saveRecords: function (notes, callback){
		var finalParams={};
		for(var i in notes){
			note=notes[i];
			var params={
				"fields": {
					"key": note['key'],
					"page": note['page'],
					"pagePositionX": note.coord.page['x'],
					"pagePositionY": note.coord.page['y'],
					"objPositionX": note.coord.obj['x'],
					"objPositionY": note.coord.obj['y'],
					"text": note['text'],
					"xpath": note['xpath'],
					"dimensionsH": note.size['x'],
					"dimensionsW": note.size['y'],
					"theme": note.extras['theme'],
					"fontSize": note.extras['font_size'],
					"dateAdded": parseInt(note.extras['date_added']/1000, 10),
					'expires': parseInt(note.extras['expires'], 10),
					"extras": {}
				}
			};
			if(note.extras['sticky_level']!=='query'){
				params['fields']['extras']['stickyLevel']=note.extras['sticky_level'];
			}
			if(parseInt(note.extras['minimized'], 10)===1){
				params['fields']['extras']['minimized']=1;
			}
			if(parseInt(note.extras['pinned'], 10)===1){
				params['fields']['extras']['pinned']=1;
			}
			if(typeof note.extras['sticky_type']!=='undefined'&&note.extras['sticky_type']!=="normal"){
				params['fields']['extras']['stickyType']=note.extras['sticky_type'];
				if(typeof note.extras['todos']!=='undefined'&&note.extras['todos'].trim()!==""){
					params['fields']['extras']['todos']=note.extras['todos'].trim();
				}
			}
			if(typeof note.extras['show_shadow']!=='undefined'&&!note.extras['show_shadow']){
				params['fields']['extras']['showShadow']=note.extras['show_shadow'];
			}
			params['fields']['extras']=JSON.stringify(params['fields']['extras']);
			finalParams[i]=params;
		}
		var url=__database._options['mainURL']+'stickys?bulk=true';
		__ajax
				.method('POST')
				.params(finalParams)
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				})
				;
	},
	saveShare: function (share, callback){
		var params={
			"sticky_id": share['sticky_id'],
			"to_email": share['to_email']
		};
		var url=__database._options['mainURL']+'shares';
		__ajax
				.params(params)
				.method('POST')
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						console.log('response', response);
						callback(response);
					}
				})
				;
	},
	saveChannel: function (channel, callback){
		var params={
			"name": channel['name']
		};
		var url=__database._options['mainURL']+'channels';
		__ajax
				.params(params)
				.method('POST')
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				})
				;
	},
	renameChannel: function (channel, callback){
		var params={
			id: channel['id'],
			name: channel['name']
		};
		var url=__database._options['mainURL']+'channels/'+channel['id'];
		__ajax
				.params(params)
				.method('PUT')
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				})
				;
	},
	saveToChannel: function (channel_id, sticky_id, callback){
		var params={
			sticky_id: sticky_id
		};
		var url=__database._options['mainURL']+'channels/'+channel_id+'/stickys';
		__ajax
				.params(params)
				.method('POST')
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				})
				;
	},
	saveTag: function (tag, callback){
		var params={
			"sticky_id": tag['sticky_id'],
			"tag": tag['tag']
		};
		var url=__database._options['mainURL']+'tags';
		__ajax
				.params(params)
				.method('POST')
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				})
				;

	},
	deleteStickyPassword: function (sticky_id, password, callback){
		var params={
			password: password
		};
		var url=__database._options['mainURL']+'stickys/'+sticky_id+'/password';
		__ajax
				.method('DELETE')
				.params(params)
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				})
				;

	},
	deleteShareRecord: function (share_id, callback){
		var url=__database._options['mainURL']+'shares/'+share_id;
		__ajax
				.method('DELETE')
				.params({})
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				})
				;
	},
	deleteSharedRecord: function (share_id, callback){
		var url=__database._options['mainURL']+'shares/'+share_id+'?received';
		__ajax
				.method('DELETE')
				.params({})
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				})
				;
	},
	deleteTagRecord: function (tag_id, callback){
		var url=__database._options['mainURL']+'tags/'+tag_id;
		__ajax
				.method('DELETE')
				.params({})
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				})
				;
	},
	deleteAllSticky: function (callback){
		var url=__database._options['mainURL']+'stickys';
		__ajax
				.method('DELETE')
				.params({})
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				});
	},
	deleteRecord: function (sticky_id, callback){
		var url=__database._options['mainURL']+'stickys/'+sticky_id;
		__ajax
				.method('DELETE')
				.params({})
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				});
	},
	deleteChannel: function (channel_id, callback){
		var url=__database._options['mainURL']+'channels/'+channel_id;
		__ajax
				.method('DELETE')
				.params({})
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				});
	},
	deleteFromChannel: function (channel_id, sticky_id, callback){
		var url=__database._options['mainURL']+'channels/'+channel_id+'/stickys/'+sticky_id;
		__ajax
				.method('DELETE')
				.params({})
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				});
	},
	searchChannel: function (code, callback){
		//no callback? no need to even run the function
		if(typeof callback==='function'){
			var url=__database._options['mainURL']+'channels?code='+code;
			__ajax
					.method('GET')
					.params({})
					.headers({
						Authorization: 'bearer='+__database.getAuth()
					})
					.open(url, function (response, t){
						callback(response);
					});
		}
	},
	subscribeChannel: function (channel_id, callback){
		var url=__database._options['mainURL']+'channels/'+channel_id+'/users';
		var params={

		};
		__ajax
				.method('POST')
				.params(params)
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				});
	},
	unsubscribeChannel: function (channel_id, callback){
		var url=__database._options['mainURL']+'channels/'+channel_id+'/users';
		var params={

		};
		__ajax
				.method('DELETE')
				.params(params)
				.headers({
					Authorization: 'bearer='+__database.getAuth()
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				});
	},
	pingServer: function (version, details, callback){
		var url=__database._options['mainURL']+'ping?v='+version;
		let auth=__database.getAuth();
		console.log(auth);
		if(auth!=''){
			__ajax.headers({
				Authorization: 'bearer='+auth
			});
		}
		__ajax
				.method('POST')
				.params({
					d: JSON.stringify(details)
				})
				.open(url, function (response, t){
					if(typeof callback==='function'){
						callback(response);
					}
				})
				;

	},
	authenticate: function (callback){
		this._getToken(function (){
			if(typeof callback==='function'){
				callback();
			}
		});
	},
	_getToken: function (callback){
		var url=this._options['mainURL']+'users';
		if(this.getAuth()===''){
			__ajax
					.method('POST')
					.params({
						'type': this._options['type'],
						'email': this._options['email'],
						'secret': this._options['secret'],
						'lang': chrome.i18n.getUILanguage(),
						'v': chrome.runtime.getManifest().version
					})
					.open(url, function (response, t){
						if(response&&typeof response.info!=='undefined'){
							__database.setAuth(response.info['auth']);
							callback();
						}
					})
					;
		}else{
			callback();
		}
	},
	convertDataIntoNote: function (data){
		var extras=data.extras!==''?JSON.parse(data.extras):{};
		var note={
			'id': data['id'],
			'key': data['key'],
			'page': data['page'],
			'xpath': data['xpath'],
			'extras': {
				'theme': (100+parseInt(data['theme'], 10)).toString().substr(1, 2),
				'date_added': data['dateAdded']*1000,
				'font_size': data['fontSize']
			},
			'coord': {
				'obj': {
					'x': parseInt(data['objPositionX'], 10),
					'y': parseInt(data['objPositionY'], 10)
				},
				'page': {
					'x': parseInt(data['pagePositionX'], 10),
					'y': parseInt(data['pagePositionY'], 10)
				}
			},
			'size': {
				'x': parseInt(data['dimensionsH'], 10),
				'y': parseInt(data['dimensionsW'], 10)
			},
			'info': {
				'id': 0,
				'class': 0,
				'html': 0
			},
			'text': data['text']
		};
		if(typeof extras['minimized']!=='undefined'){
			note['extras']['minimized']=extras['minimized'];
		}
		if(typeof extras['stickyLevel']!=='undefined'){
			note['extras']['sticky_level']=extras['stickyLevel'];
		}
		if(typeof extras['pinned']!=='undefined'){
			note['extras']['pinned']=extras['pinned'];
		}
		if(typeof extras['showShadow']!=='undefined'){
			note['extras']['show_shadow']=extras['showShadow'];
		}
		if(typeof data['channels']!=='undefined'){
			note['extras']['channels']=data['channels'];
		}
		if(typeof data['shares']!=='undefined'){
			note['extras']['shares']=data['shares'];
		}
		if(typeof data['tags']!=='undefined'){
			note['extras']['tags']=data['tags'];
		}
		if(typeof extras['stickyType']!=='undefined'){
			note['extras']['sticky_type']=extras['stickyType'];
			if(typeof extras['todos']!=='undefined'){
				note['extras']['todos']=extras['todos'];
			}
		}
		if(typeof data['expires']!=='undefined'){
			note['extras']['expires']=data['expires'];
		}
		if(typeof data['password']!=='undefined'){
			note['extras']['password']=data['password'];
		}
		return note;
	}
};