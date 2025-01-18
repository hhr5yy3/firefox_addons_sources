	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.action == 'request_show_modal_from_content_script_to_messagejs') {
				window.postMessage({ type: "request_show_modal_from_messagejs", modalId: request.modalId }, "*");
				//var o={}
				//sendResponse(o);
			}			
		}
	);

	if(document.location.pathname.search(/\/extension\/.*\/options.html/)!=-1){
		var s = document.createElement('script');
		// TODO: add "script.js" to web_accessible_resources in manifest.json
		s.src = chrome.runtime.getURL('settings/message.js');
		s.onload = function() {
			this.parentNode.removeChild(this);
		};
		(document.head||document.documentElement).appendChild(s);
	}
	
	document.addEventListener("DOMContentLoaded",function(){		
		if(document.location.pathname.search(/\/extension\/.*\/options.html/)!=-1){
			chrome.runtime.sendMessage({'action' : 'request_stiframe_validation_from_backgroundjs','pathname':document.location.pathname},
				function (response) {
					if(response){
						var iframe=document.createElement("iframe");
						iframe.setAttribute("src",chrome.runtime.getURL('settings/settings.html')+'?on=true');
						iframe.setAttribute("style","border:0px;width:100%;height:600px;");
						if(document.getElementById("stfrm")) document.getElementById("stfrm").appendChild(iframe);							
					}
					
				}
			);		
		}
	},false)