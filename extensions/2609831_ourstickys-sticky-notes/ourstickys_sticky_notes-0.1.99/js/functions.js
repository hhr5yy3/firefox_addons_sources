//CRC32: http://jsbin.com/pubiyasijo/edit?html,js,console
//ObjectCompare: https://gist.github.com/nicbell/6081098
//coords: http://stackoverflow.com/questions/442404/retrieve-the-position-x-y-of-an-html-element


var refresh_page_error_install_in_locale=i18n('errorRefreshPage');
var refresh_page_error_updated_in_locale=i18n('errorRefreshPageUpdated');
var refresh_page_error_restricted_in_locale=i18n('errorRefreshPageRestricted');

function getElementInfo(element){
	var info={};
	info['id']=0;
	info['class']=0;
	info['html']=0;
	if(element){
		if(element.id&&element.id!==''){
			info['id']=parseInt(crc32(element.id), 10);
		}else if(element.name&&element.name!==''){
			info['id']=parseInt(crc32(element.name), 10);
		}
		if(element.className&&element.className!==''){
			info['class']=parseInt(crc32(element.className), 10);
		}
		if(element.src&&element.src!==''){
			info['html']=parseInt(crc32(element.src), 10);
		}else if(element.innerHTML&&element.innerHTML!==''){
			info['html']=parseInt(crc32(element.innerHTML), 10);
		}
	}
	return info;
}
var a_crc32_table="00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
var b_crc32_table=a_crc32_table.split(' ').map(function (s){
	return parseInt(s, 16);
});
function crc32(str){
	var crc=0;
	var x=0;
	var y=0;
	crc=crc^(-1);
	for(var i=0, iTop=str.length; i<iTop; i++){
		y=(crc^str.charCodeAt(i))&0xFF;
		crc=(crc>>>8)^b_crc32_table[y];
	}

	return (crc^(-1))>>>0;
}
function findElement(xPath, elemInfo){
	var ret=false;
	var element=getElementByXpath(xPath);
	if(element){
		var this_info=getElementInfo(element);
		//if the content is the same.. great, else the other two parameters needs to be the same
		//I should probably check for the positioning as well
		if(this_info.html===elemInfo.html||(this_info.id===elemInfo.id&&this_info.class===elemInfo.class)){
//		if(Object.compare(this_info, elemInfo)){
			ret=element;
		}
	}
	return ret;
}

Object.compare=function (obj1, obj2){
	//Loop through properties in object 1
	for(var p in obj1){
		//Check property exists on both objects
		if(obj1.hasOwnProperty(p)!==obj2.hasOwnProperty(p))
			return false;
		switch(typeof (obj1[p])){
			//Deep compare objects
			case 'object':
				if(!Object.compare(obj1[p], obj2[p]))
					return false;
				break;
				//Compare function code
			case 'function':
				if(typeof (obj2[p])=='undefined'||(p!='compare'&&obj1[p].toString()!=obj2[p].toString()))
					return false;
				break;
				//Compare values
			default:
				if(obj1[p]!=obj2[p])
					return false;
		}
	}
	//Check object 2 for any extra properties
	for(var p in obj2){
		if(typeof (obj1[p])==='undefined')
			return false;
	}
	return true;
};
function getPageXY(element){
	var x=0, y=0;
	while(element){
		x+=element.offsetLeft;
		y+=element.offsetTop;
		element=element.offsetParent;
	}
	return [x, y];
}
function is_this_same_page(uri, extras){
	var sticky_level=(typeof extras['sticky_level']==='undefined')?'query':extras['sticky_level'];
	var ret=(this_uri===uri||sticky_level==='everyTab')?1:0;
	if(!ret){
		var this_uri=window.location.href;
		var this_page=parseUri(this_uri);
		var page=parseUri(uri);
		if(page.host===this_page.host){
			if(sticky_level==='domain'){
				ret=1;
			}else{
				page.path=normalize_page(page.path);
				this_page.path=normalize_page(this_page.path);
				if(page.path===this_page.path){
					//is the same page.. let's see if maybe the parameters are similar enough
					if(sticky_level==='path'){
						ret=1;
					}else{
						//Fuzzy will:
						// - not consider anchors
						// - as long as the parameters from the note are included in the page, it will show
						//continue only if there is the same anchors or if the level is fuzzy
						if(sticky_level==='query'){
							if(page.anchor===this_page.anchor){
								//and now let's check that all the parameters are the same for both
								if(Object.keys(page.queryKey).length===Object.keys(this_page.queryKey).length){
									ret=1;
									for(var i in page.queryKey){
										//the values needs to be presend and be the same
										if(typeof this_page.queryKey[i]==='undefined'||page.queryKey[i]!==this_page.queryKey[i]){
											ret=0;
											break;
										}
									}
								}
							}
						}else if(sticky_level==='queryFuzzy'){
							//let's check that the parameter of the note are included in this page
							if(Object.keys(page.queryKey).length>=Object.keys(this_page.queryKey).length){
								ret=1;
								for(var i in page.queryKey){
									//the values needs to be presend and be the same
									if(typeof this_page.queryKey[i]==='undefined'||page.queryKey[i]!==this_page.queryKey[i]){
										ret=0;
										break;
									}
								}
							}
						}
						/*
						 if(page.anchor===this_page.anchor||sticky_level==='queryFuzzy'){
						 if(page.query!==""&&this_page.query!==""){
						 //if all of one page's parameters are included in the other page's parameters
						 var min_qry=Object.keys(page.queryKey).length>Object.keys(this_page.queryKey).length?this_page.queryKey:page.queryKey;
						 var max_qry=Object.keys(page.queryKey).length<Object.keys(this_page.queryKey).length?this_page.queryKey:page.queryKey;
						 for(var k in min_qry){
						 //if the params in the page are included in this page
						 //then I can try to assume that this is the correct page.. let's hope so
						 if(typeof max_qry[k]==='undefined'){
						 ret=2;
						 }
						 }
						 if(ret===1&&sticky_level==='query'){
						 //only when the URLs are exactly the same
						 for(var k in max_qry){
						 //if the params in the page are included in this page
						 //then I can try to assume that this is the correct page.. let's hope so
						 if(typeof min_qry[k]==='undefined'){
						 ret=0;
						 }
						 }
						 }
						 }
						 }
						 */
					}
				}
			}
		}
	}
	return ret;
}
function normalize_page(page){
	//this function tries to find possible home pages and normalize them into 1
	var home_pages=['/home', '/index', '/homepage'];
	var extensions=['html', 'php', 'cf', 'asp', 'htm'];
	var found=false;
	for(var i=0; (i<home_pages.length)&&!found; i++){
		for(var ii=0; (ii<extensions.length)&&!found; ii++){
			var path=home_pages[i]+'.'+extensions[ii];
			var regEx=new RegExp(path+'$', 'gi');
			if(page.match(regEx)){
				page=page.replace(regEx, '')+'/';
				found=true;
			}
		}
	}
	return page;
}
function checkStickyPassword(sticky_id, password, callback){
	__background.checkStickyPassword(sticky_id, password, callback);
}
function saveStickyPassword(sticky_id, password, old_password, callback){
	__background.saveStickyPassword(sticky_id, password, old_password, callback);
}
function deleteStickyPassword(sticky_id, password, callback){
	__background.deleteStickyPassword(sticky_id, password, callback);
}
function getData(options, callback){
	__background.getStickys(options, callback);
}
function getShares(options, callback){
	__background.getShares(options, callback);
}
function getChannels(options, callback){
	__background.getChannels(options, callback);
}
function getChannelStickys(channel_id, options, callback){
	__background.getChannelStickys(channel_id, options, callback);
}
function saveChannel(channel, callback){
	__background.saveChannel(channel, callback);
}
function renameChannel(channel, callback){
	__background.renameChannel(channel, callback);
}
function saveToChannel(channel, callback){
	__background.saveToChannel(channel, callback);
}
function deleteData(data_key, callback){
	__background.deleteSticky(data_key, callback);
}
function deleteShared(data_key, callback){
	__background.deleteShare(data_key, callback);
}
function deleteShare(share, callback){
	__background.deleteShare(share, callback);
}
function deleteTag(tag, callback){
	__background.deleteTag(tag, callback);
}
function deleteFromChannel(channel, callback){
	__background.deleteFromChannel(channel, callback);
}
function stopEvent(e){
	if(e===undefined){
		e=window.event;
	}
	if(e){
		e.cancelBubble=true;
		if(e.stopPropagation){
			e.stopPropagation();
		}
	}
//	e.preventDefault();
}
function createStickyBackground(callback){
	var currentWindowId=0;
	var realCreateSticky=function (){
		var options={
			active: true
		};
		if(currentWindowId>0){
			options['windowId']=currentWindowId;
		}else{
			options['currentWindow']=true;
		}
		chrome.tabs.query(
				options,
				function (tabs){
					if(tabs.length>0){
						sendCreateNote(tabs[0].id, tabs[0].url);
						if(typeof callback=='function'){
							callback();
						}
					}
				}
		);
	}
	chrome.windows.getLastFocused({
		windowTypes: ['normal']
	}, function (w){
		currentWindowId=w.id;
		realCreateSticky();
	});
}
function truncateString(str, length, from){
	var str1, str2, len1, len2, ret;
	if(str.length<=length){
		ret=str.toString();
	}else{
		var ellipsis='...';
		switch(from){
			case 'left':
				str2=str.slice(str.length-length);
				ret=ellipsis+str2;
				break;
			case 'middle':
				len1=Math.ceil(length/2);
				len2=Math.floor(length/2);
				str1=str.slice(0, len1);
				str2=str.slice(str.length-len2);
				ret=str1+ellipsis+str2;
				break;
			default:
				str1=str.slice(0, length);
				ret=str1+ellipsis;
				break;
		}
	}
	return ret;
}
function validateEmail(email){
	var re=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
function captureMyNotesClick(event){
	if(event===undefined){
		event=window.event;                     // IE hack
	}
	var uxy=[0, 0], exy=[0, 0];
	var path='', elemInfo=[];
	if(event){
		var target='target' in event?event.target:event.srcElement; // another IE hack
		//Stop Propagation
		stopEvent(event);
		uxy=[event.pageX, event.pageY];
		exy=getPageXY(target);
		path=getPathTo(target);
		elemInfo=getElementInfo(target);
	}else{
		//choose two rancom numbers between 0 and half the width and half the height of the screen
		var docBody=document.body;
		var focElem=document.documentElement;
		var pxy=[docBody.scrollLeft||focElem.scrollLeft, docBody.scrollTop||focElem.scrollTop];
		uxy=[
			pxy[0]+getRandomInt(0, Math.floor(document.documentElement.clientWidth/2)),
			pxy[1]+getRandomInt(0, Math.floor(document.documentElement.clientHeight/2))
		]
	}
	var coords={
		'obj': {
			'x': (uxy[0]-exy[0]),
			'y': (uxy[1]-exy[1])
		},
		'page': {
			'x': (uxy[0]),
			'y': (uxy[1])
		}
	};
	sendMessage(
			{
				action: 'getDefaultSettings',
				url: document.location.href
			},
			function (ret){
				var extras={};
				if(ret.theme){
					extras['theme']=ret.theme;
				}
				//showShadows
				if(typeof ret.showShadows!=='undefined'){
					extras['show_shadow']=!!ret.showShadows;
				}
				//font-size
				if(ret.fontSize){
					extras['font_size']=ret.fontSize;
				}
				//sticky_level
				if(ret.stickyLevel){
					extras['sticky_level']=ret.stickyLevel;
				}
				//expires
				if(ret.expires){
					extras['expires']=ret.expires;
				}
				__stickys.createNote('', path, coords, elemInfo, undefined, extras);
			}
	);
}
function authenticateChrome(options){
	var identityOption={
		'interactive': options.interactive,
		'scopes': ['email']
	};
	if(typeof options.callback!=='function'){
		options.callback=function (t){};
	}
	var retry=true;
	getTokenAndXhr();
	function getTokenAndXhr(){
		chrome.identity.getAuthToken(
				identityOption,
				function (access_token){
					if(chrome.runtime.lastError){
						__events.close();
						options.callback(false);
					}else{
						var xhr=new XMLHttpRequest();
						xhr.open('GET', 'https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=');
						xhr.setRequestHeader('Authorization', 'Bearer '+access_token);

						xhr.onload=function (){
							if(this.status===401&&retry){
								// This status may indicate that the cached
								// access token was invalid. Retry once with
								// a fresh token.
								retry=false;
								chrome.identity.removeCachedAuthToken(
										{
											'token': access_token
										},
										getTokenAndXhr);
								__events.close();
								options.callback(false);
								return;
							}else if(this.status==200){
								var info=JSON.parse(this.response);
								var email=info.email, secret=info.id;
								if(email!=''&&secret!=''){
									__database
											.setCredentials('google', email, secret)
											.authenticate(
													function (){
														__events.init();
														options.callback(true);
													}
											);
								}
							}
						};
						xhr.send();
					}
					return;
				}
		);
	}
}
function deAuthenticateChrome(callback){
	__events.close();
	chrome.identity.getAuthToken(
			{
				'interactive': false,
				'scopes': ['email']
			},
			function (current_token){
				if(!chrome.runtime.lastError){

					// @corecode_begin removeAndRevokeAuthToken
					// @corecode_begin removeCachedAuthToken
					// Remove the local cached token
					chrome.identity.removeCachedAuthToken(
							{
								token: current_token
							},
							function (){}
					);
					// @corecode_end removeCachedAuthToken

					// Make a request to revoke token in the server
					var xhr=new XMLHttpRequest();
					xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token='+current_token);
					xhr.send();
					// @corecode_end removeAndRevokeAuthToken
					callback();
				}
			}
	);
}
function authenticateFacebook(options){
	var onFacebookLogin=function (tabId, changeInfo, tab){
		if(tab.url.indexOf(facebookSuccessURL)===0){
			__storage.get('facebookAccessToken', function (facebookAccessToken){
				if(!facebookAccessToken){
					var params=tab.url.split('#')[1];
					var facebookFullAccessToken=params.split('&')[0];
					var facebookAccessToken=facebookFullAccessToken.split('=')[1];
					__storage.set('facebookAccessToken', facebookAccessToken);
					chrome.tabs.onUpdated.removeListener(onFacebookLogin);
					getFacebookInfo(facebookAccessToken, function (isLoggedIn){
						if(!isLoggedIn){
							__storage.remove('facebookAccessToken');
						}
						if(typeof options.callback==='function'){
							options.callback(isLoggedIn);
						}
						chrome.tabs.remove(tabId, function (){ });
					});
					return;
				}
			});
		}
	};
	chrome.tabs.onUpdated.addListener(onFacebookLogin);
}
function deAuthenticateFacebook(callback){
	__storage.remove('facebookAccessToken', callback);
}
function getFacebookInfo(facebookAccessToken, callback){
	var url='https://graph.facebook.com/v2.8/me?&fields=id%2Cemail&format=json&access_token='+facebookAccessToken;
	__ajax
			.method('GET')
			.open(url, function (response, t){
				if(response.id){
					var email=response.email;
					var secret=response.id;
					__database
							.setCredentials('facebook', email, secret)
							.authenticate(
									function (){
										__events.init();
										callback(true);
									}
							);
				}else{
					__events.close();
					callback(false);
				}
			})
			;
}
function sendReloadNotes(skipActive, options, callback){
	__background.reloadNotes(skipActive, options, callback);
}
function sendReloadNote(key_note){
	if(isBackground){
		__tabs.reloadNote(key_note);
	}else{
		__background.reloadNote(key_note);
	}
}
function sendLoadNotes(){
	__tabs.loadNotes();
}
function sendHideNotesByChannels(){
	__tabs.hideNotesByChannels();
}
//http://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
var observeDOM=(function (){
	var MutationObserver=window.MutationObserver||window.WebKitMutationObserver,
			eventListenerSupported=window.addEventListener;

	return function (obj, callback, disconnect){
		if(MutationObserver){
			// define a new observer
			var obs=new MutationObserver(function (mutations, observer){
				if(mutations[0].addedNodes.length||mutations[0].removedNodes.length)
					callback();
			});
			// have the observer observe foo for changes in children
			// other possible values:
			//  - childList: boolean
			//  - attributes: boolean
			//  - characterData : boolean
			//  - attributeFilter : ['style', 'id'],
			//  - attributeOldValue : boolean
			//
			obs.observe(obj, {
				childList: true,
				subtree: true
			});
			if(disconnect&&disconnect===true){
				obs.disconnect();
			}
		}else if(eventListenerSupported){
			obj.addEventListener('DOMNodeInserted', callback, false);
			obj.addEventListener('DOMNodeRemoved', callback, false);
		}
	}
})();
function htmlEntities(str){
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function sendCreateNote(tab_id, url){
	__tabs.createNote(tab_id, url)
}
function getRandomInt(min, max){
	min=Math.ceil(min);
	max=Math.floor(max);
	return Math.floor(Math.random()*(max-min+1))+min;
}

function copyTextToClipboard(text){
	var textArea=document.createElement("textarea");

	//
	// *** This styling is an extra step which is likely not required. ***
	//
	// Why is it here? To ensure:
	// 1. the element is able to have focus and selection.
	// 2. if element was to flash render it has minimal visual impact.
	// 3. less flakyness with selection and copying which **might** occur if
	//    the textarea element is not visible.
	//
	// The likelihood is the element won't even render, not even a flash,
	// so some of these are just precautions. However in IE the element
	// is visible whilst the popup box asking the user for permission for
	// the web page to copy to the clipboard.
	//

	// Place in top-left corner of screen regardless of scroll position.
	textArea.style.position='fixed';
	textArea.style.top=0;
	textArea.style.left=0;

	// Ensure it has a small width and height. Setting to 1px / 1em
	// doesn't work as this gives a negative w/h on some browsers.
	textArea.style.width='2em';
	textArea.style.height='2em';

	// We don't need padding, reducing the size if it does flash render.
	textArea.style.padding=0;

	// Clean up any borders.
	textArea.style.border='none';
	textArea.style.outline='none';
	textArea.style.boxShadow='none';

	// Avoid flash of white box if rendered for any reason.
	textArea.style.background='transparent';


	textArea.value=text;

	__mainWrapper.get().appendChild(textArea);

	textArea.select();

	try{
		var successful=document.execCommand('copy');
		if(!successful){
			window.prompt(i18n('copyToClipboard'), text);
		}
	}catch(err){
		window.prompt(i18n('copyToClipboard'), text);
	}
	__mainWrapper.get().removeChild(textArea);
}
function saveNonAuthNotesToServer(){
	loadedNotes.get(function (data){
		if(data){
			//move anything stored in the localstorage into the database
			var t_notes=JSON.parse(data);
			for(var i in t_notes){
				__database.saveRecord(t_notes[i], function (response){
					//let's save the tags for this note
					if(typeof t_notes[i]['extras']!=='undefined'&&typeof t_notes[i]['extras']['tags']!=='undefined'){
						var sticky_id=response.id;
						for(var k in t_notes[i]['extras']['tags']){
							var t_tag=t_notes[i]['extras']['tags'][k];
							var tag={
								sticky_id: sticky_id,
								tag: t_tag['tag']
							};
							__database.saveTag(tag);
						}
					}
				});
			}
			__OurStickys.clearLocalStorage();
			sendReloadNotes(false, {
				force: true
			});
		}
	});
}
function validateYouTubeUrl(url){
	var ret=false;
	if(url!==undefined||url!==''){
		var regExp=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
		var match=url.match(regExp);
		if(match&&match[2].length===11){
			// Do anything for being valid
			// if need to change the url to embed url then use below line
			ret='https://www.youtube.com/embed/'+match[2]+'?autoplay=0';
		}else{
			// Do anything for not being valid
		}
	}
	return ret;
}
function __confirm(message, callbackTrue, callbackFalse){
	var start=Number(new Date());
	var result=confirm(message);
	var end=Number(new Date());
	if(end<(start+10)||result==true){
		if(typeof callbackTrue==='function'){
			callbackTrue();
		}
	}else if(typeof callbackFalse==='function'){
		callbackFalse();
	}
}
function saveAsFile(data, filename){
	if(!data){
		console.error('No data to save')
		return;
	}

	if(!filename){
		filename='export.json'
	}
	if(typeof data==='object'){
		data=JSON.stringify(data, undefined, false);
	}

	var blob=new Blob([data], {
		type: 'text/json'
	}),
			e=document.createEvent('MouseEvents'),
			a=document.createElement('a')

	a.download=filename
	a.href=window.URL.createObjectURL(blob)
	a.dataset.downloadurl=['text/json', a.download, a.href].join(':')
	e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
	a.dispatchEvent(e)
}
function sendMessage(options, callbackSuccess, callbackError){
	try{
		if(isChrome){
			chrome.runtime.sendMessage(options, callbackSuccess);
		}else{
			browser.runtime.sendMessage(options).then(callbackSuccess);
		}
	}catch(e){
		if(typeof callbackError=='function'){
			callbackError(chrome.runtime.lastError);
		}else{
			console.log('sendMessage', options, e);
		}
	}
}
function sendTabsMessage(tabId, options, callbackSuccess, callbackError){
	chrome.tabs.sendMessage(
			tabId,
			options,
			function (result){
				if(chrome.runtime.lastError){
					if(typeof callbackError=='function'){
						callbackError(chrome.runtime.lastError);
					}else{
						console.log('sendTabsMessage', tabId, options, chrome.runtime.lastError);
					}
				}else if(typeof callbackSuccess=='function'){
					callbackSuccess(result);
				}
			}
	);
}
if(!chrome.identity||typeof chrome.identity.getAuthToken!=='function'){
	//https://github.com/mdn/webextensions-examples/blob/master/google-userinfo/background/authorize.js
	if(!chrome.identity){
		chrome.identity={};
	}
	chrome.identity.getAuthToken=function (options, callback){
		const SCOPES=options.scopes;
		const REDIRECT_URL=browser.identity.getRedirectURL();
		const CLIENT_ID='248703760046-1pjdt520rdaid656thej9oa8oesk79k0.apps.googleusercontent.com';
		const AUTH_URL=`https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URL)}&scope=${encodeURIComponent(SCOPES.join(' '))}`;
		const VALIDATION_BASE_URL="https://www.googleapis.com/oauth2/v3/tokeninfo";

		delete(options.scopes);
		/**
		 Validate the token contained in redirectURL.
		 This follows essentially the process here:
		 https://developers.google.com/identity/protocols/OAuth2UserAgent#tokeninfo-validation
		 - make a GET request to the validation URL, including the access token
		 - if the response is 200, and contains an "aud" property, and that property
		 matches the clientID, then the response is valid
		 - otherwise it is not valid
		 Note that the Google page talks about an "audience" property, but in fact
		 it seems to be "aud".
		 */
		function validate(redirectURL){
			const accessToken=extractAccessToken(redirectURL);
			if(!accessToken){
				throw "Authorization failure";
			}
			const validationURL=`${VALIDATION_BASE_URL}?access_token=${accessToken}`;
			const validationRequest=new Request(validationURL, {
				method: "GET"
			});

			function checkResponse(response){
				return new Promise((resolve, reject) => {
					if(response.status!=200){
						reject("Token validation error");
					}
					response.json().then((json) => {
						if(json.aud&&(json.aud===CLIENT_ID)){
							resolve(accessToken);
						}else{
							reject("Token validation error");
						}
					});
				});
			}

			return fetch(validationRequest).then(checkResponse);
		}

		/**
		 Authenticate and authorize using browser.identity.launchWebAuthFlow().
		 If successful, this resolves with a redirectURL string that contains
		 an access token.
		 */
		function authorize(){
			if(!options.url){
				options.url=AUTH_URL;
			}
			return browser.identity.launchWebAuthFlow(options);
		}
		function extractAccessToken(redirectUri){
			let m=redirectUri.match(/[#?](.*)/);
			if(!m||m.length<1)
				return null;
			let params=new URLSearchParams(m[1].split("#")[0]);
			return params.get("access_token");
		}

		function getAccessToken(){
			return authorize().then(validate);
		}
		getAccessToken()
				.then(function (auth_token){
					callback(auth_token);
				})
				.catch(function (error){
					console.error(`Error: ${error}`);
				});
	};
}
if(typeof chrome.identity.removeCachedAuthToken!=='function'){
	chrome.identity.removeCachedAuthToken=function (options, callback){};
}
