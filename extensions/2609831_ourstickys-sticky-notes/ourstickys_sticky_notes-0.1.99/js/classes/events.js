var __events={
	_options: {
		url: apiPath+'events.php?include=all',
		auth: '',
		source: null
	},
	init: function (options){
		__storage.get('defaultSettings', function (tmp){
			if(!tmp||tmp===''){
				tmp='{}';
			}
			var settings=JSON.parse(tmp);
			//enabled by default
			//if(typeof settings['liveUpdatesEnabled']==='undefined'||settings['liveUpdatesEnabled']){
			//disabled by default
			if(settings['liveUpdatesEnabled']){
				if(typeof options==='undefined'){
					options={
						skipClose: false
					};
				}
				options['skipClose']=typeof options['skipClose']==='undefined'?false:options['skipClose'];
				if(!options['skipClose']){
					__events.close();	//just in case
				}
				if(!__events.isConnected()){
					__events
							.setAuth(__database.getAuth())
							.connect()
							.onmessage(function (){
								//nothing to do right now
								//console.log('initial', e.data);
							})
							.addEventListener('initial', function (e){
								//nothing to do right now
								//console.log('initial', e.data);
							})
							.addEventListener('list_channels', function (e){
								var t=JSON.parse(e.data);
								//save it in memory
								//check against the ones that are "checked"
								//pull the data for those stickys for future use
								__OurStickys.getShowingChannels(function (selectedChannels){
									for(var i in t.channels){
										var channel_id=t.channels[i].id;
										selectedChannels[channel_id]=(typeof selectedChannels[channel_id]==='undefined'||selectedChannels[channel_id]===true);
										if(selectedChannels[channel_id]){
											//just load them in memory for later retrieval
											__OurStickys.backgroundGetChannelsStickys(channel_id, {
												force: true
											}, function (t){});
										}
									}
									//just in case a channel was added on a different computer, let's save the channels to display
									__OurStickys.setShowingChannels(selectedChannels);
								});
							})
							.addEventListener('modified', function (e){
								//new stickys coming in
								var t=JSON.parse(e.data);
								for(var i in t.stickys){
									t.stickys[i]['id']=i;
									var note=__database.convertDataIntoNote(t.stickys[i]);
									sendReloadNote(note.key);
									loadedNotes.update(note.key, note, function (updated){
										if(updated){
											//the notes were updates, send it to all the other tabs as well
											//this should happen only if the note has incoming data and not if it was modified by this user
											sendReloadNotes(true);
										}
									});
								}
							})
							.addEventListener('modified_shares', function (e){
								//new stickys coming in
								var t=JSON.parse(e.data);
								for(var i in t.stickys.sticky){
									t.stickys.sticky[i]['id']=i;
									var note=__database.convertDataIntoNote(t.stickys.sticky[i]);
									note['shared']={
										'id': t.stickys['id'],
										'from': t.stickys['from']['email']
									};
									sendReloadNote(note.key);
									loadedShares.update(note.key, note, function (updated){
										if(updated){
											sendReloadNotes(true);
										}
									});
								}
								//no stickys means that something has been deleted so pull the full refresh
								//need to build this !!!
							})
							.addEventListener('modified_channels', function (e){
								var t=JSON.parse(e.data);
								//save it in memory
								//check against the ones that are "checked"
								//pull the data for those stickys for future use
								__OurStickys.getShowingChannels(function (selectedChannels){
									for(var i in t.channels){
										var channel_id=t.channels[i].id;
										selectedChannels[channel_id]=(typeof selectedChannels[channel_id]==='undefined'||selectedChannels[channel_id]===true);
										if(selectedChannels[channel_id]){
											__OurStickys.backgroundGetChannelsStickys(channel_id, {
												force: true
											}, function (data){
												var myNotes=JSON.parse(data);
												if(myNotes&&Object.keys(myNotes).length>0){
													for(var i in myNotes){
														sendReloadNote(myNotes[i].key);
													}
												}
											});
										}
									}
									//just in case a channel was added on a different computer, let's save the channels to display
									__OurStickys.setShowingChannels(selectedChannels);
								});
							})
							.onerror(function (e){
								setTimeout(function (e){
									__events.init({
										skipClose: true
									});
								}, 10000);
							})
							;
				}
			}
		});
		return this;
	},
	setAuth: function (auth){
		this._options['auth']=auth;
		return this;
	},
	getAuth: function (){
		return this._options['auth'];
	},
	connect: function (){
		if(this._options['source']!==null){
			//does this really clear memory ?
			delete(this._options['source']);
		}
		this._options['source']=new EventSource(this._options['url']+'&auth='+this._options['auth']);
		return this;
	},
	close: function (){
		if(this.isConnected()){
			this._options['source'].close();
		}
		return this;
	},
	onmessage: function (callback){
		this._options['source'].onmessage=callback;
		return this;
	},
	addEventListener: function (event, callback){
		this._options['source'].addEventListener(event, callback, false);
		return this;
	},
	onerror: function (callback){
		this._options['source'].onerror=function (e){
			callback(e);
		};
		return this;
	},
	isConnected: function (){
		return (this._options['source']!==null&&this._options['source'].readyState<=1);
	}
};