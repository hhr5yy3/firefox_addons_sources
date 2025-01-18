function createChannels(key_note){
	__settings.hideSubs();
	if(__settings.getWindow()!==null&&__settings.getWindow().style.display!=='none'&&__settings.getWindow().dataset.keyNote===key_note){
		var thisWindow=$('__myNotesSettingChannels');
		if(!thisWindow){
			//let's ceate the necessary div :-)
			//window
			thisWindow=createElement('div', {
				id: "__myNotesSettingChannels",
				className: '__myNotesSettingSub __myNoteSettingSubWrapper',
				style: {
					width: __settings.getWindow().style.width,
					height: (parseInt(__settings.getWindow().style.height, 10)-15)+"px"
				},
				appendChildren: [
					//title
					createElement('p', {
						appendChild: document.createTextNode(i18n("channelTitle")),
						className: '__myNotesSettingSubTitle'
					}),
					//other
					createElement('div', {
						id: "__myNoteChannelsContainer"
					}),
					createElement('div', {
						id: '__myNoteChannelsAddContainer',
						appendChildren: [
							//add channel button at the bottom
							//this should be a SELECT BOX with the channel list in it
							createElement(
									'select',
									{
										className: '__myNoteChannelsItemAdd',
										id: '__myNoteChannelsItemAdd',
										name: "channel_code"
									}
							),
							createElement('div', {
								className: '__myNoteChannelsItemAddButton',
								id: '__myNoteChannelsItemAddButton',
								appendChild: document.createTextNode('+'),
								onclick: function (e){
									stopEvent(e);
									var key_note=this.dataset.keyNote;
									var addItem=$('__myNoteChannelsItemAdd');
									var channel={
										sticky_id: $("__myNoteText_"+key_note).dataset.stickyId,
										key: key_note,
										channel_id: addItem.value
									};
									saveToChannel(channel, function (response){
										var channel_id=$('__myNoteChannelsItemAdd').value;
										var e=$('__myNoteChannelsItem_'+channel_id);
										var addItem=$('__myNoteChannelsItemAdd');
										if(!e){
											var channel={
												id: channel_id,
												name: addItem.options[addItem.selectedIndex].text
											};
											var channelsContainer=$("__myNoteChannelsContainer");
											channelsContainer.appendChild(createChannelItem(channel, key_note));
											channelsContainer.scrollTop=channelsContainer.scrollHeight;
											//let's add it to the channel list
											var container=$("__myNote_"+key_note);
											var channels=JSON.parse(container.dataset.channels);
											channels.push(channel);
											container.dataset.channels=JSON.stringify(channels);
										}
										addItem.focus();
									});
								}
							})
						]
					})
				]
			});
			__settings.getWindow().appendChild(thisWindow);
		}
		thisWindow.style.display="block";

		var is_share=(parseInt($("__myNoteText_"+key_note).dataset.isShare, 10)===1);
		var is_channel=(parseInt($("__myNoteText_"+key_note).dataset.isChannel, 10)===1);
		var addContainer=$('__myNoteChannelsAddContainer');
		//if this is a share, I should not allow removing nor adding of the tags
		if(!is_share&&!is_channel){
			addContainer.style.display="block";
			$('__myNoteChannelsItemAddButton').dataset.keyNote=key_note;
			$('__myNoteChannelsItemAdd').focus();
		}else{
			addContainer.style.display="none";
		}
		//load channels
		var options={};
		getChannels(options, function (data){
			var user_channels=JSON.parse(data);
			var channelsContainer=$("__myNoteChannelsContainer").empty();
			var valid_channels={};
			if(user_channels.length>0){
				//populate channel dropdown
				var channelsItemAdd=$('__myNoteChannelsItemAdd').empty();
				for(var i in user_channels){
					var channel=user_channels[i];
					valid_channels[channel.id]=true;
					if(channel.owner){
						channelsItemAdd
								.addOption(
										{
											value: channel.id,
											text: channel.name
										}
								);
					}
				}
				var channels=JSON.parse($("__myNote_"+key_note).dataset.channels);
				//load channels here
				for(var i in channels){
					if(valid_channels[channels[i].id]){
						var item=createChannelItem(channels[i], key_note);
						channelsContainer.appendChild(item);
						if(is_share||is_channel){
							//do not show the remove button
							$('__myNoteChannelsItemRemove_'+channels[i].id).remove();
						}
					}
				}
			}else{
				channelsContainer.appendChild(createElement('div', {
					innerHTML: i18n('channelEmptyGoCreate'),
					onclick: function (){
						sendMessage({
							action: 'openPopup',
							tab: 'Channels'
						}, function (){});
						//close settings
						__settings.hide();
					}
				}));
				$('__myNoteChannelsAddContainer').style.display="none";
			}
		});
	}
}
function createChannelItem(channel, key_note){
	var item=createElement('div', {
		className: '__myNoteChannelsItem',
		id: '__myNoteChannelsItem_'+channel.id,
		appendChildren: [
			//text itself
			document.createTextNode(truncateString(channel.name, 25)),
			//delete icon
			createElement('img', {
				dataset: {
					keyNote: key_note,
					channel_id: channel.id
				},
				className: '__myNoteChannelsItemRemove',
				id: '__myNoteChannelsItemRemove_'+channel.id,
				src: chrome.extension.getURL('/img/delete.gif'),
				onclick: function (e){
					stopEvent(e);
					var channel_id=this.dataset.channel_id;
					var elemItem=$('__myNoteChannelsItem_'+channel_id);
					var elemRemoveItem=$('__myNoteChannelsItemRemove_'+channel_id);
					this.style.webkitTransition='-webkit-transform 0.5s ease-in, opacity 0.5s ease-in';
					this.offsetTop; // Force style recalc
					this.style.opacity='0';
					setTimeout(function (){
						$(elemItem).remove();
						$(elemRemoveItem).remove();
					}, 500);
					var key_note=this.dataset.keyNote;
					deleteFromChannel({
						channel_id: channel_id,
						sticky_id: $("__myNoteText_"+key_note).dataset.stickyId,
						key: key_note
					}, function (){});
					var container=$("__myNote_"+key_note);
					var channels=JSON.parse(container.dataset.channels);
					for(var i in channels){
						if(channels[i]['id']===channel_id){
							channels.splice(i, 1);
							break;
						}
					}
					container.dataset.channels=JSON.stringify(channels);
				}
			})
		]
	});
	return item;
}