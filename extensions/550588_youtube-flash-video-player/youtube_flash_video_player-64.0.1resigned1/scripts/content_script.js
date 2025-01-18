
var YouTubeFlashVideoPlayer = {
	quality:null,
	size:null,
	requestChange:function(player_type){	
		if(!player_type) YouTubeFlashVideoPlayer.askPlayerType();
		else{
			YouTubeFlashVideoPlayer.change(player_type);
			//YouTubeFlashVideoPlayer.changeVideoQuality(document);
		}
	},
	change:function(player_type){
		//YouTubeFlashVideoPlayer.changeVideoQuality(document,o['player_type']);
		//YouTubeFlashVideoPlayer.changeVideoSize(document,o['video_size']);
		//window.postMessage({ type: "FROM_CONTENT_SCRIPT_SET_VQ", text: quality }, "*");			
		//window.postMessage({ type: "FROM_CONTENT_SCRIPT_SET_VS", text: size }, "*");			
		window.postMessage({ type: "FROM_CONTENT_SCRIPT_SET_PLAYER_TYPE", text: player_type }, "*");			
		window.postMessage({ type: "FROM_CONTENT_SCRIPT_REQUEST_CHANGE_PLAYER", text:"NULL" }, "*");			
	},
	askPlayerType:function () {
		chrome.runtime.sendMessage({'action' : 'playertype_ask'}, 
			function(o) {
				YouTubeFlashVideoPlayer.change(o['player_type']);
			}
		);
	},	
	
	changeVideoQuality:function(doc,quality){

		try {
			var domain=doc.domain;
		} catch (err) {
			return;
		}
		if (!domain) {
			return;
		}
		
		if (domain.search(/youtube.com$/) != -1) {
				
			var dc = document;
			var player = dc.getElementById("movie_player");
			var channel= dc.getElementById("playnav-player");
			
			if(quality) YouTubeFlashVideoPlayer.quality=quality;//for channel event listener
		
			if(channel){
				
				//need to remove listener here else it will create an infinite loop.
				channel.removeEventListener('DOMNodeInserted',YouTubeFlashVideoPlayer.handleChannelChange,true);

			}
			
			if (player) {

				var currentvideoquality = quality ? quality : YouTubeFlashVideoPlayer.quality;//for channel listener

				var flashvars = player.getAttribute("flashvars");

				function changeFlashvars(flashvars, option, value) 
				{
					var delimit = "&" + option;
					if (flashvars.indexOf(delimit) == -1 ) {
						flashvars += delimit + "=" + value;
					}
					else {
						var splitarray = flashvars.split(delimit);
						var result = splitarray[1].indexOf("&");
						if (result != -1) {
							flashvars = splitarray[0] + delimit + "=" + value + splitarray[1].substr(result);
						}
						else {
							flashvars = splitarray[0] + delimit + "=" + value;
						}
					}
					return flashvars;
				}				

				player.setAttribute("flashvars", changeFlashvars(flashvars,"vq",currentvideoquality ));
			
				var oldplayer=player;
				var playerparentnode=oldplayer.parentNode;
				var playernextsibling=oldplayer.nextSibling; 
				playerparentnode.removeChild(oldplayer); 
				var playerclone=oldplayer.cloneNode(true); 
				playerparentnode.insertBefore(playerclone,playernextsibling);	
				
				if(channel){
					channel.addEventListener('DOMNodeInserted',YouTubeFlashVideoPlayer.handleChannelChange,true);					
				}				
				
			}
			
		}
			
	},
	handleChannelChange:function(event){

		if(event.target.nodeName=='EMBED') { 
		
			var doc = event.target.ownerDocument;

			window.setTimeout(function () { 

				YouTubeFlashVideoPlayer.changeVideoQuality(doc);
					
			},1); 
		
		}
		
	},
	changeVideoSize:function(doc,size){

		var dc = doc;
		if(size) YouTubeFlashVideoPlayer.size=size;
		var channel= dc.getElementById("playnav-player");
		if(channel) return;//do not let channels have a size because they cant

		var currentvideosize = size ? size : YouTubeFlashVideoPlayer.size;

		if((currentvideosize=="expand")) {
			dc.getElementById("watch7-container").classList.add('watch-wide');
			//dc.getElementById("watch7-container").classList.add('watch-medium');
			dc.getElementById("player").classList.add('watch-playlist-collapsed');
			dc.getElementById("player").classList.add('watch-medium');			
		
			//dc.getElementById("watch-video").classList.add("wide");
			//dc.getElementById("content").classList.add("watch-wide");
			//chrome.cookies.set({"url": ".youtube.com", "name": "wide", "value": 1});          
		}
		else {
			dc.getElementById("watch7-container").classList.remove('watch-wide');
			//dc.getElementById("watch7-container").classList.remove('watch-medium');
			dc.getElementById("player").classList.remove('watch-playlist-collapsed');
			dc.getElementById("player").classList.remove('watch-medium');
						
			//dc.getElementById("content").classList.remove("watch-wide");
			//dc.getElementById("watch-video").classList.remove("wide");
			//chrome.cookies.set({"url": ".youtube.com", "name": "wide", "value": 0});
		}
				
	},		
	decodeFlashvars : function (passedFlashvar) {
		var flashVars = {};
		var flashVarsArray = passedFlashvar.split('&');
		for ( i=0;i<flashVarsArray.length;i++ ) {
			var a = flashVarsArray[i].split('=');
			flashVars[a[0]] = decodeURIComponent(a[1]).replace(/\+/g," ");//?------------------ replace may create problems
		}
		return flashVars;
	},
	encodeFlashvars : function (passedFlashvar) {
		var newFlashVars="";
		for (var prop in passedFlashvar) {
			if(!/^(?:ad|ctb|rec)_/i.test(prop)) {
				newFlashVars += "&" + prop + "=" + encodeURIComponent(passedFlashvar[prop]);
			}
		}
		return newFlashVars;
	},		
	addStyle: function(css){
		if(document.getElementById("youtubeflashvideoplayer-stylesheet")==null){
			var link=document.createElement("link");
			link.setAttribute("type","text/css");
			link.setAttribute("rel","stylesheet");
			link.setAttribute("id","youtubeflashvideoplayer-stylesheet");					
			link.setAttribute("href",css);	
			document.getElementsByTagName("head")[0].appendChild(link);
			//document.getElementById("page").classList.add('watch-wide');
			//document.getElementById("watch-video").classList.add('medium');	
		}
		else{
			document.getElementById("youtubeflashvideoplayer-stylesheet").parentNode.removeChild(document.getElementById("youtubeflashvideoplayer-stylesheet"));
		}
	}
};
/*
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == 'player_type_change') {
		try{
			YouTubeFlashVideoPlayer.changeVideoQuality(document,request.quality);
			YouTubeFlashVideoPlayer.changeVideoSize(document,request.size);
		}catch(e){console.log(e)}
	}
});

window.addEventListener("load",YouTubeFlashVideoPlayer.requestChange,false);
*/

var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('scripts/yfvp.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);

YouTubeFlashVideoPlayer.requestChange();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action == 'player_type_change') {
		try{
			//YouTubeFlashVideoPlayer.requestChange(request.player_type);
			if(confirm("YouTube Video Player changed successfully.\nWould you like to reload the page to let the changes take effect?")) {
				document.defaultView.location.reload();
			}
		}catch(e){console.log(e);}
	}
});

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    //console.log("Content script received: " + event.data.text);
    //port.postMessage(event.data.text);
	
	//window.postMessage({ type: "FROM_CONTENT_SCRIPT", text: "Hello from the content page!" }, "*");
  }
}, false);

